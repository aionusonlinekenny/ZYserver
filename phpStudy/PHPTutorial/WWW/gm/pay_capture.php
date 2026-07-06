<?php
/**
 * PayPal chuyển trình duyệt người chơi về đây sau khi họ bấm "Đồng ý thanh toán" (return_url)
 * hoặc "Huỷ" (cancel_url, có thêm &cancelled=1) trên trang PayPal.
 * Trang này hiện 1 màn hình HTML đơn giản (không phải JSON) vì đây là nơi trình duyệt
 * điều hướng tới, không phải API do JS gọi ngầm.
 */
error_reporting(0);
header('Content-Type: text/html; charset=utf-8');
include 'config.php';
include 'paypal_lib.php';

function pc_render($title, $message, $isError = false) {
	$color = $isError ? '#c0392b' : '#1e8449';
	echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>{$title}</title>";
	echo "<style>body{font-family:sans-serif;text-align:center;padding-top:60px;background:#0d1b2a;color:#eee}h2{color:{$color}}a{color:#4aa3ff}</style></head><body>";
	echo "<h2>{$title}</h2><p>{$message}</p><p><a href='../index.php'>Quay lại trò chơi</a></p></body></html>";
	exit;
}

$orderId = isset($_GET['orderId']) ? trim($_GET['orderId']) : '';
if ($orderId === '') {
	pc_render('Lỗi', 'Thiếu mã đơn hàng.', true);
}
// orderID được sinh bởi client theo dạng ZoneID|channelid|agentid|RoleID|UserID|timestamp (xem SDkMsg.MakeOrderID).
$parts = explode('|', $orderId);
$zoneId = $parts[0];

$conn = pp_get_zone_conn($quarr, $zoneId);
if (!$conn) {
	pc_render('Lỗi', 'Không kết nối được server game.', true);
}

$orderIdEsc = mysqli_real_escape_string($conn, $orderId);
$res = mysqli_query($conn, "SELECT * FROM payment_orders WHERE order_id = '{$orderIdEsc}' LIMIT 1");
if (!$res || mysqli_num_rows($res) == 0) {
	mysqli_close($conn);
	pc_render('Lỗi', 'Không tìm thấy đơn hàng.', true);
}
$order = mysqli_fetch_assoc($res);

if (isset($_GET['cancelled'])) {
	mysqli_query($conn, "UPDATE payment_orders SET status = 'failed' WHERE order_id = '{$orderIdEsc}' AND status != 'credited'");
	mysqli_close($conn);
	pc_render('Đã huỷ', 'Bạn đã huỷ giao dịch thanh toán.');
}

if ($order['status'] === 'credited') {
	mysqli_close($conn);
	pc_render('Thành công', 'Giao dịch đã được xử lý trước đó. ' . $order['yuanbao_amount'] . ' nguyên bảo đã được cộng vào tài khoản.');
}

$paypalToken = isset($_GET['token']) ? trim($_GET['token']) : '';
if ($paypalToken === '') {
	mysqli_close($conn);
	pc_render('Lỗi', 'Thiếu thông tin xác nhận từ PayPal.', true);
}

$cfg = pp_get_payment_config($conn, $order['serverid']);
$accessToken = pp_get_access_token($cfg['paypal_mode'], $cfg['paypal_client_id'], $cfg['paypal_secret']);
if (!$accessToken) {
	mysqli_close($conn);
	pc_render('Lỗi', 'Không kết nối được PayPal, vui lòng liên hệ hỗ trợ nếu tiền đã bị trừ.', true);
}

$capture = pp_capture_order($cfg['paypal_mode'], $accessToken, $paypalToken);
if (!$capture) {
	mysqli_close($conn);
	pc_render('Chưa hoàn tất', 'PayPal chưa xác nhận thanh toán thành công. Nếu tiền đã bị trừ, hệ thống sẽ tự động cộng nguyên bảo trong ít phút (qua webhook).', true);
}

pp_credit_order($conn, $order['serverid'], $orderId, $order['account'], $order['actor_id'], $order['yuanbao_amount']);
mysqli_close($conn);
pc_render('Thanh toán thành công', 'Đã cộng ' . $order['yuanbao_amount'] . ' nguyên bảo vào tài khoản. Hãy quay lại trò chơi.');
