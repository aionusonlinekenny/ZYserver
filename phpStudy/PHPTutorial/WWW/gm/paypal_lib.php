<?php
/**
 * Thư viện dùng chung cho luồng thanh toán PayPal + chế độ "miễn phí" do GM bật/tắt.
 * Không tự chạy trực tiếp - include từ pay_create_order.php / pay_capture.php / pay_webhook.php.
 *
 * Quy ước bám theo gm/config.php / gm/gmquery.php đã có sẵn trong repo:
 *   - Kết nối DB bằng mysqli_connect thô, không PDO/ORM.
 *   - $quarr (định nghĩa trong config.php) map serverid -> thông tin kết nối DB actors.
 *   - "Thanh toán thành công" = insert 1 dòng vào bảng feecallback(serverid,openid,itemid,actor_id)
 *     (đúng cơ chế tool GM 'charge' đang dùng thật trong production).
 */

function pp_get_zone_conn($quarr, $quid) {
	if (!isset($quarr[$quid]) || !$quarr[$quid]['ip']) {
		return null;
	}
	$qu = $quarr[$quid];
	$conn = mysqli_connect($qu['ip'], $qu['user'], $qu['pswd']);
	if (!$conn) {
		return null;
	}
	mysqli_select_db($conn, $qu['db']);
	return $conn;
}

/** Đọc cấu hình thanh toán hiện tại của 1 server (PayPal keys + 2 công tắc bật/tắt). */
function pp_get_payment_config($conn, $serverid) {
	$serverid = intval($serverid);
	$sql = "SELECT * FROM payment_config WHERE serverid = '{$serverid}' LIMIT 1";
	$res = mysqli_query($conn, $sql);
	if (!$res || mysqli_num_rows($res) == 0) {
		// Chưa có dòng cấu hình cho server này -> mặc định AN TOÀN: bắt buộc trả tiền thật.
		return array(
			'serverid' => $serverid,
			'paypal_mode' => 'sandbox',
			'paypal_client_id' => '',
			'paypal_secret' => '',
			'paypal_webhook_id' => '',
			'vip_require_payment' => 1,
			'yuanbao_require_payment' => 1,
			'usd_conversion_rate' => 1.0,
		);
	}
	return mysqli_fetch_assoc($res);
}

function pp_api_base($mode) {
	return $mode === 'live'
		? 'https://api-m.paypal.com'
		: 'https://api-m.sandbox.paypal.com';
}

/** Lấy OAuth2 access token (client_credentials) từ PayPal. Trả về null nếu lỗi. */
function pp_get_access_token($mode, $client_id, $secret) {
	if ($client_id === '' || $secret === '') {
		return null;
	}
	$ch = curl_init(pp_api_base($mode) . '/v1/oauth2/token');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_USERPWD, $client_id . ':' . $secret);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Accept-Language: en_US'));
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	$resp = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if ($resp === false || $code >= 300) {
		return null;
	}
	$json = json_decode($resp, true);
	return isset($json['access_token']) ? $json['access_token'] : null;
}

/**
 * Tạo 1 đơn hàng PayPal (Orders v2 API).
 * $orderId: order id nội bộ của mình (dùng làm custom_id để đối soát khi webhook báo về).
 * $usdAmount: số tiền USD (chuỗi dạng "1.99").
 * Trả về mảng ['approveUrl' => ..., 'paypalOrderId' => ...] hoặc null nếu lỗi.
 */
function pp_create_order($mode, $accessToken, $orderId, $usdAmount, $returnUrl, $cancelUrl, $description) {
	$body = array(
		'intent' => 'CAPTURE',
		'purchase_units' => array(array(
			'reference_id' => $orderId,
			'custom_id' => $orderId,
			'description' => $description,
			'amount' => array(
				'currency_code' => 'USD',
				'value' => $usdAmount,
			),
		)),
		'application_context' => array(
			'return_url' => $returnUrl,
			'cancel_url' => $cancelUrl,
			'user_action' => 'PAY_NOW',
		),
	);
	$ch = curl_init(pp_api_base($mode) . '/v2/checkout/orders');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Authorization: Bearer ' . $accessToken,
	));
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	$resp = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if ($resp === false || $code >= 300) {
		return null;
	}
	$json = json_decode($resp, true);
	$approveUrl = null;
	if (isset($json['links']) && is_array($json['links'])) {
		foreach ($json['links'] as $link) {
			if ($link['rel'] === 'approve') {
				$approveUrl = $link['href'];
				break;
			}
		}
	}
	if (!$approveUrl || !isset($json['id'])) {
		return null;
	}
	return array('approveUrl' => $approveUrl, 'paypalOrderId' => $json['id']);
}

/** Xác nhận thu tiền (capture) 1 đơn PayPal đã được người dùng approve. */
function pp_capture_order($mode, $accessToken, $paypalOrderId) {
	$ch = curl_init(pp_api_base($mode) . '/v2/checkout/orders/' . urlencode($paypalOrderId) . '/capture');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, '{}');
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Authorization: Bearer ' . $accessToken,
	));
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	$resp = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if ($resp === false || $code >= 300) {
		return null;
	}
	$json = json_decode($resp, true);
	$status = isset($json['status']) ? $json['status'] : '';
	if ($status !== 'COMPLETED') {
		return null;
	}
	return $json;
}

/**
 * Xác minh chữ ký webhook PayPal gửi tới pay_webhook.php là thật (chống giả mạo request).
 * $headers: mảng header HTTP nhận được (đã lowercase key), $rawBody: nội dung JSON thô.
 */
function pp_verify_webhook_signature($mode, $accessToken, $webhookId, $headers, $rawBody) {
	if ($webhookId === '') {
		return false;
	}
	$body = array(
		'auth_algo' => isset($headers['paypal-auth-algo']) ? $headers['paypal-auth-algo'] : '',
		'cert_url' => isset($headers['paypal-cert-url']) ? $headers['paypal-cert-url'] : '',
		'transmission_id' => isset($headers['paypal-transmission-id']) ? $headers['paypal-transmission-id'] : '',
		'transmission_sig' => isset($headers['paypal-transmission-sig']) ? $headers['paypal-transmission-sig'] : '',
		'transmission_time' => isset($headers['paypal-transmission-time']) ? $headers['paypal-transmission-time'] : '',
		'webhook_id' => $webhookId,
		'webhook_event' => json_decode($rawBody, true),
	);
	$ch = curl_init(pp_api_base($mode) . '/v1/notifications/verify-webhook-signature');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Authorization: Bearer ' . $accessToken,
	));
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	$resp = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if ($resp === false || $code >= 300) {
		return false;
	}
	$json = json_decode($resp, true);
	return isset($json['verification_status']) && $json['verification_status'] === 'SUCCESS';
}

/**
 * "Cộng tiền thành công" - insert đúng 1 dòng vào feecallback, y hệt cơ chế tool GM
 * (gm/gmquery.php case 'charge') đang dùng thật cho production. Idempotent theo $orderId
 * qua bảng payment_orders (chỉ credit nếu order đó chưa từng được credit).
 * $yuanbaoAmount: số nguyên bảo sẽ được cộng (server Lua đọc field itemid trong feecallback làm số này).
 */
function pp_credit_order($conn, $serverid, $orderId, $account, $actorId, $yuanbaoAmount) {
	$orderIdEsc = mysqli_real_escape_string($conn, $orderId);
	$check = mysqli_query($conn, "SELECT status FROM payment_orders WHERE order_id = '{$orderIdEsc}' LIMIT 1");
	if ($check && mysqli_num_rows($check) > 0) {
		$row = mysqli_fetch_assoc($check);
		if ($row['status'] === 'credited') {
			return false; // đã cộng rồi, không cộng trùng
		}
	}
	$serverid = intval($serverid);
	$accountEsc = mysqli_real_escape_string($conn, $account);
	$actorIdEsc = mysqli_real_escape_string($conn, $actorId);
	$yuanbaoAmount = intval($yuanbaoAmount);
	mysqli_query($conn, "INSERT INTO feecallback(serverid,openid,itemid,actor_id) VALUES ('{$serverid}','{$accountEsc}','{$yuanbaoAmount}','{$actorIdEsc}')");
	mysqli_query($conn, "UPDATE payment_orders SET status = 'credited', credited_at = NOW() WHERE order_id = '{$orderIdEsc}'");
	return true;
}
