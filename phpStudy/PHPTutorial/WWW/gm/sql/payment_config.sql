-- Bảng cấu hình thanh toán PayPal + công tắc bật/tắt bắt buộc trả tiền thật.
-- Chạy file này 1 lần trên từng DB "actors" của mỗi server (khớp $quarr trong gm/config.php).
-- Mỗi dòng ứng với 1 serverid (srvid trong $quarr).

CREATE TABLE IF NOT EXISTS `payment_config` (
	`serverid` INT NOT NULL,
	`paypal_mode` VARCHAR(16) NOT NULL DEFAULT 'sandbox',        -- 'sandbox' hoặc 'live'
	`paypal_client_id` VARCHAR(255) NOT NULL DEFAULT '',
	`paypal_secret` VARCHAR(255) NOT NULL DEFAULT '',
	`paypal_receiver_email` VARCHAR(255) NOT NULL DEFAULT '',    -- chỉ để hiển thị/đối soát, PayPal không cần field này để thu tiền
	`paypal_webhook_id` VARCHAR(255) NOT NULL DEFAULT '',        -- lấy từ PayPal Developer Dashboard sau khi đăng ký webhook
	`vip_require_payment` TINYINT(1) NOT NULL DEFAULT 1,         -- 1 = bắt buộc trả tiền thật cho gói VIP/thẻ tháng, 0 = miễn phí
	`yuanbao_require_payment` TINYINT(1) NOT NULL DEFAULT 1,     -- 1 = bắt buộc trả tiền thật khi nạp nguyên bảo thường, 0 = miễn phí
	`usd_conversion_rate` DECIMAL(10,4) NOT NULL DEFAULT 1.0000, -- 1 đơn vị "amount" client gửi lên = bao nhiêu USD (CẦN admin tự chỉnh đúng giá thật trước khi mở live)
	`updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`serverid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng chống cộng trùng: mỗi order PayPal chỉ được cộng tiền đúng 1 lần
-- (dùng cho cả luồng PayPal thật lẫn luồng "miễn phí" mô phỏng, khoá theo order_id).
CREATE TABLE IF NOT EXISTS `payment_orders` (
	`order_id` VARCHAR(191) NOT NULL,
	`serverid` INT NOT NULL,
	`account` VARCHAR(191) NOT NULL,
	`actor_id` VARCHAR(64) NOT NULL DEFAULT '',
	`yuanbao_amount` INT NOT NULL,
	`is_free_mode` TINYINT(1) NOT NULL DEFAULT 0,
	`status` VARCHAR(32) NOT NULL DEFAULT 'created',             -- created | pending_confirm | credited | failed
	`created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`credited_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dòng mặc định cho server 1 (đổi paypal_client_id/paypal_secret khi có, hoặc điền qua GM tool).
INSERT INTO `payment_config` (`serverid`, `vip_require_payment`, `yuanbao_require_payment`)
VALUES (1, 1, 1)
ON DUPLICATE KEY UPDATE `serverid` = `serverid`;
