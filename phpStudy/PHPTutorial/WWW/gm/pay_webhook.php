<?php
/**
 * Webhook PayPal (server-to-server, không qua trình duyệt người chơi) - đăng ký URL này
 * (https://<domain>/gm/pay_webhook.php) trong PayPal Developer Dashboard cho từng App/server.
 * Đây là lớp bảo hiểm thứ 2: nếu người chơi đóng trình duyệt trước khi PayPal chuyển họ về
 * pay_capture.php, webhook này vẫn đảm bảo tiền được cộng (pp_credit_order chống cộng trùng
 * bằng payment_orders.status nên dù cả 2 nơi cùng gọi cũng chỉ cộng 1 lần).
 */
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');
include 'config.php';
include 'paypal_lib.php';

$rawBody = file_get_contents('php://input');
$event = json_decode($rawBody, true);
if (!is_array($event) || !isset($event['event_type'])) {
	http_response_code(400);
	exit(json_encode(array('ok' => false)));
}

// Chỉ xử lý khi tiền đã THỰC SỰ được PayPal xác nhận thu thành công.
if ($event['event_type'] !== 'PAYMENT.CAPTURE.COMPLETED') {
	exit(json_encode(array('ok' => true, 'ignored' => true)));
}

$resource = isset($event['resource']) ? $event['resource'] : array();
$orderId = isset($resource['custom_id']) ? trim($resource['custom_id']) : '';
if ($orderId === '') {
	exit(json_encode(array('ok' => false, 'reason' => 'missing custom_id')));
}
// orderID: ZoneID|channelid|agentid|RoleID|UserID|timestamp (xem SDkMsg.MakeOrderID phía client).
$parts = explode('|', $orderId);
$zoneId = $parts[0];

$conn = pp_get_zone_conn($quarr, $zoneId);
if (!$conn) {
	http_response_code(200); // trả 200 để PayPal không spam retry vô hạn, nhưng log lỗi để tự kiểm tra
	exit(json_encode(array('ok' => false, 'reason' => 'db connect failed')));
}

$cfg = pp_get_payment_config($conn, $zoneId);

$headers = array();
foreach (getallheaders() as $k => $v) {
	$headers[strtolower($k)] = $v;
}
$accessToken = pp_get_access_token($cfg['paypal_mode'], $cfg['paypal_client_id'], $cfg['paypal_secret']);
if (!$accessToken || !pp_verify_webhook_signature($cfg['paypal_mode'], $accessToken, $cfg['paypal_webhook_id'], $headers, $rawBody)) {
	mysqli_close($conn);
	http_response_code(400);
	exit(json_encode(array('ok' => false, 'reason' => 'signature verification failed')));
}

$orderIdEsc = mysqli_real_escape_string($conn, $orderId);
$res = mysqli_query($conn, "SELECT * FROM payment_orders WHERE order_id = '{$orderIdEsc}' LIMIT 1");
if (!$res || mysqli_num_rows($res) == 0) {
	mysqli_close($conn);
	exit(json_encode(array('ok' => false, 'reason' => 'order not found')));
}
$order = mysqli_fetch_assoc($res);
pp_credit_order($conn, $order['serverid'], $orderId, $order['account'], $order['actor_id'], $order['yuanbao_amount']);
mysqli_close($conn);
exit(json_encode(array('ok' => true)));
