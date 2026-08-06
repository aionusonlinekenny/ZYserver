-- ZYserver - bảng metadata avatar cá nhân
-- Có thể import lại an toàn: không xóa bảng hoặc dữ liệu đang có.

USE `globaldata`;

CREATE TABLE IF NOT EXISTS `player_avatar` (
  `server_id` INT NOT NULL,
  `actor_id` INT UNSIGNED NOT NULL,
  `account_name` VARCHAR(64) NOT NULL,
  `file_name` VARCHAR(160) NOT NULL,
  `version` INT UNSIGNED NOT NULL,
  `updated_at` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`server_id`, `actor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
