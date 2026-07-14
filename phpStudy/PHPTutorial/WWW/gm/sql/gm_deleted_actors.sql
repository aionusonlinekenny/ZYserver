-- Bảng lưu lại "ảnh chụp" (snapshot JSON) của nhân vật ngay trước khi bị GM tool xoá vật lý.
-- Không tự động phục hồi được (phải làm thủ công dựa vào snapshot nếu cần), nhưng giữ lại đủ
-- thông tin để tra cứu/khôi phục tay khi cần, vì thao tác xoá ở gmquery.php's case 'deleteplayer'
-- là XOÁ THẬT (DELETE nhiều bảng), không thể hoàn tác qua UI.
-- Chạy file này 1 lần trên từng DB "actors" của mỗi server (khớp $quarr trong gm/config.php).

CREATE TABLE IF NOT EXISTS `gm_deleted_actors` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`actorid` INT NOT NULL,
	`accountname` VARCHAR(80) NOT NULL DEFAULT '',
	`actorname` VARCHAR(32) NOT NULL DEFAULT '',
	`serverindex` INT NOT NULL DEFAULT 0,
	`actor_snapshot` MEDIUMTEXT NULL,   -- JSON toàn bộ dòng `actors` gốc trước khi xoá
	`deleted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`deleted_by` VARCHAR(64) NOT NULL DEFAULT '',  -- tài khoản GM đã bấm xoá (nếu có, hiện tại GM tool dùng chung 1 tài khoản admin)
	PRIMARY KEY (`id`),
	INDEX `idx_actorid` (`actorid`),
	INDEX `idx_actorname` (`actorname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
