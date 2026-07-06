<?php
/**
 * Endpoint mới THAY CHO "https://cls.ha02.youyantech.com/$channelid$/pay.php" mà client
 * (SDkMsg.PayMoneyByBrowser trong main.min.js) đang gọi. Nhận đúng 2 tham số GET client
 * đã gửi từ trước (data, params) để không phải đổi format phía client nhiều.
 *
 * Trả về JSON:
 *   {"mode":"paypal","approveUrl":"..."}                     -> client redirect sang PayPal
 *   {"mode":"free","orderId":"...","yuanbaoAmount":N,"message":"..."}  -> client tự hiện popup xác nhận,
 *                                                                          rồi gọi pay_free_finalize.php
 *   {"mode":"error","message":"..."}
 */
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');
include 'config.php';
include 'paypal_lib.php';
include 'recharge_tiers.php';

// Log tạm để chẩn đoán "bấm nạp không thấy gì" - xoá khối này (và các lời gọi pco_log bên dưới)
// sau khi xác nhận luồng thanh toán chạy đúng.
function pco_log($label, $data = null) {
	$line = '[' . date('Y-m-d H:i:s') . '] ' . $label;
	if ($data !== null) {
		$line .= ' ' . json_encode($data);
	}
	@file_put_contents(__DIR__ . '/pay_debug.log', $line . "\n", FILE_APPEND);
}

function pco_fail($msg) {
	pco_log('FAIL', $msg);
	exit(json_encode(array('mode' => 'error', 'message' => $msg)));
}

pco_log('REQUEST', $_GET);

$dataParam = isset($_GET['data']) ? $_GET['data'] : '';
if ($dataParam === '') {
	pco_fail('Thiếu dữ liệu đơn hàng');
}

$decoded = base64_decode($dataParam, true);
if ($decoded === false) {
	pco_fail('Dữ liệu đơn hàng không hợp lệ');
}
$jsonStr = urldecode($decoded);
$payload = json_decode($jsonStr, true);
if (!is_array($payload) || !isset($payload['userInfo'])) {
	pco_fail('Dữ liệu đơn hàng sai định dạng');
}

$userInfo = $payload['userInfo'];
$orderId = isset($payload['orderID']) ? trim($payload['orderID']) : '';
$cash = isset($payload['amount']) ? floatval($payload['amount']) : 0;
$zoneId = isset($userInfo['ZoneID']) ? trim($userInfo['ZoneID']) : '';
$account = isset($userInfo['UserID']) ? trim($userInfo['UserID']) : '';
$actorId = isset($userInfo['RoleID']) ? trim($userInfo['RoleID']) : '';

if ($orderId === '' || $zoneId === '' || $account === '' || $actorId === '') {
	pco_fail('Thiếu thông tin nhân vật/tài khoản');
}
if (!recharge_is_valid_cash($cash)) {
	pco_fail('Gói nạp không hợp lệ');
}

$conn = pp_get_zone_conn($quarr, $zoneId);
if (!$conn) {
	pco_fail('Không kết nối được server');
}

// Chặn tạo trùng đơn (client bấm nhiều lần / F5 lại trang).
$orderIdEsc = mysqli_real_escape_string($conn, $orderId);
$existing = mysqli_query($conn, "SELECT status FROM payment_orders WHERE order_id = '{$orderIdEsc}' LIMIT 1");
if ($existing && mysqli_num_rows($existing) > 0) {
	$row = mysqli_fetch_assoc($existing);
	if ($row['status'] === 'credited') {
		pco_fail('Đơn hàng này đã được xử lý rồi');
	}
}

$yuanbaoAmount = intval($cash) * RECHARGE_RATIO;
$isVipTier = recharge_is_vip_tier($yuanbaoAmount);
$cfg = pp_get_payment_config($conn, $zoneId);
$requirePayment = $isVipTier ? intval($cfg['vip_require_payment']) : intval($cfg['yuanbao_require_payment']);

$serveridEsc = intval($cfg['serverid']);
$accountEsc = mysqli_real_escape_string($conn, $account);
$actorIdEsc = mysqli_real_escape_string($conn, $actorId);

if (!$requirePayment) {
	// Chế độ MIỄN PHÍ: không tạo đơn PayPal, chỉ ghi nhận "chờ xác nhận" - client phải tự
	// hiện popup Đồng ý/Huỷ rồi gọi pay_free_finalize.php mới thực sự được cộng tiền.
	mysqli_query($conn, "INSERT INTO payment_orders(order_id,serverid,account,actor_id,yuanbao_amount,is_free_mode,status) VALUES ('{$orderIdEsc}','{$serveridEsc}','{$accountEsc}','{$actorIdEsc}','{$yuanbaoAmount}',1,'pending_confirm') ON DUPLICATE KEY UPDATE status='pending_confirm'");
	mysqli_close($conn);
	pco_log('FREE_MODE_OK', array('orderId' => $orderId, 'yuanbaoAmount' => $yuanbaoAmount));
	exit(json_encode(array(
		'mode' => 'free',
		'orderId' => $orderId,
		'yuanbaoAmount' => $yuanbaoAmount,
		'message' => 'Chức năng nạp đang ở chế độ miễn phí. Xác nhận để nhận ' . $yuanbaoAmount . ' nguyên bảo?',
	)));
}

// Chế độ THẬT: tạo đơn PayPal.
$accessToken = pp_get_access_token($cfg['paypal_mode'], $cfg['paypal_client_id'], $cfg['paypal_secret']);
if (!$accessToken) {
	mysqli_close($conn);
	pco_fail('Không kết nối được PayPal, vui lòng thử lại sau');
}

$usdAmount = number_format($cash * floatval($cfg['usd_conversion_rate']), 2, '.', '');
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$baseUrl = $scheme . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']);
$returnUrl = $baseUrl . '/pay_capture.php?orderId=' . urlencode($orderId);
$cancelUrl = $baseUrl . '/pay_capture.php?orderId=' . urlencode($orderId) . '&cancelled=1';

$order = pp_create_order($cfg['paypal_mode'], $accessToken, $orderId, $usdAmount, $returnUrl, $cancelUrl, $yuanbaoAmount . ' Nguyên Bảo');
if (!$order) {
	mysqli_close($conn);
	pco_fail('Tạo đơn PayPal thất bại, vui lòng thử lại sau');
}

mysqli_query($conn, "INSERT INTO payment_orders(order_id,serverid,account,actor_id,yuanbao_amount,is_free_mode,status) VALUES ('{$orderIdEsc}','{$serveridEsc}','{$accountEsc}','{$actorIdEsc}','{$yuanbaoAmount}',0,'created') ON DUPLICATE KEY UPDATE status='created'");
mysqli_close($conn);

pco_log('PAYPAL_MODE_OK', array('orderId' => $orderId, 'approveUrl' => $order['approveUrl']));
exit(json_encode(array('mode' => 'paypal', 'approveUrl' => $order['approveUrl'])));
