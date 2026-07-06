<?php
/**
 * Bước 2 của chế độ MIỄN PHÍ: client gọi endpoint này SAU KHI người chơi đã bấm "Đồng ý"
 * trên popup xác nhận hiện ở client (không cộng tiền ngay ở pay_create_order.php để tránh
 * bị cộng nhầm khi client chỉ đang hỏi/preview, đúng yêu cầu "vẫn hiện popup xác nhận").
 */
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');
include 'config.php';
include 'paypal_lib.php';

$orderId = isset($_GET['orderId']) ? trim($_GET['orderId']) : '';
$zoneId = isset($_GET['zoneId']) ? trim($_GET['zoneId']) : '';
if ($orderId === '' || $zoneId === '') {
	exit(json_encode(array('success' => false, 'message' => 'Thiếu thông tin đơn hàng')));
}

$conn = pp_get_zone_conn($quarr, $zoneId);
if (!$conn) {
	exit(json_encode(array('success' => false, 'message' => 'Không kết nối được server')));
}

$orderIdEsc = mysqli_real_escape_string($conn, $orderId);
$res = mysqli_query($conn, "SELECT * FROM payment_orders WHERE order_id = '{$orderIdEsc}' LIMIT 1");
if (!$res || mysqli_num_rows($res) == 0) {
	mysqli_close($conn);
	exit(json_encode(array('success' => false, 'message' => 'Không tìm thấy đơn hàng')));
}
$order = mysqli_fetch_assoc($res);
if ($order['status'] === 'credited') {
	mysqli_close($conn);
	exit(json_encode(array('success' => false, 'message' => 'Đơn hàng này đã được nhận rồi')));
}
if (intval($order['is_free_mode']) !== 1) {
	mysqli_close($conn);
	exit(json_encode(array('success' => false, 'message' => 'Đơn hàng không ở chế độ miễn phí')));
}

// Kiểm tra lại công tắc còn đang TẮT tại thời điểm xác nhận (tránh trường hợp GM vừa bật lại
// giữa lúc popup đang hiện trên máy người chơi).
$cfg = pp_get_payment_config($conn, $order['serverid']);
$isVipTier = intval($order['yuanbao_amount']) === 300000 || intval($order['yuanbao_amount']) === 880000;
$requirePayment = $isVipTier ? intval($cfg['vip_require_payment']) : intval($cfg['yuanbao_require_payment']);
if ($requirePayment) {
	mysqli_close($conn);
	exit(json_encode(array('success' => false, 'message' => 'Chức năng này vừa được chuyển sang chế độ trả phí, vui lòng thử lại')));
}

$ok = pp_credit_order($conn, $order['serverid'], $orderId, $order['account'], $order['actor_id'], $order['yuanbao_amount']);
mysqli_close($conn);

if ($ok) {
	exit(json_encode(array('success' => true, 'message' => 'Đã nhận ' . $order['yuanbao_amount'] . ' nguyên bảo')));
}
exit(json_encode(array('success' => false, 'message' => 'Đơn hàng đã được xử lý trước đó')));
