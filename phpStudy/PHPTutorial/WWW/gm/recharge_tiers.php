<?php
/**
 * Danh sách "cash" (đơn vị tiền client gửi lên, xem SDkMsg.PayMoney trong main.min.js)
 * hợp lệ - trích từ resource/config/config.json -> ConfigRechargeItems (field "cash").
 * Dùng để CHẶN việc client tự sửa tham số "amount" gửi lên thành số tuỳ ý (vì bản thân
 * PayMoneyByBrowser gốc không hề ký/băm payload trước khi gửi đi).
 *
 * 8800 không nằm trong ConfigRechargeItems (không phải 1 gói nạp thường) - đây là mức cash
 * riêng cho nút mua "Thẻ tháng Đặc Quyền" (FranchiseWindow trong main.min.js), cần cash*100
 * = 880000 để khớp priviMoney trong privilegeconfig.config. Xem thêm ghi chú sửa lỗi
 * "Recharge.ins().showReChargeInfo(88)" -> "...(8800)" trong claude.md mục 20.
 *
 * ĐÂY LÀ NƠI DUY NHẤT CẦN CẬP NHẬT nếu sau này thêm/đổi gói nạp trong config.json.
 */
$RECHARGE_VALID_CASH = array(6, 10, 12, 20, 25, 30, 50, 68, 100, 108, 128, 198, 200, 258, 328, 500, 518, 648, 1000, 1500, 2000, 3000, 8800);

/** Tỉ lệ quy đổi nguyên bảo: amount (yuanbao) = cash * RECHARGE_RATIO (khớp userInfo.Ratio="100" phía client). */
define('RECHARGE_RATIO', 100);

/**
 * Số nguyên bảo tương ứng với các gói được coi là "mua VIP" (thẻ tháng nguyên bảo / thẻ tháng đặc quyền)
 * - khớp server/bin/s1/gameworld/data/config/monthcard/monthcardconfig.config (monthCardMoney)
 * và server/bin/s1/gameworld/data/config/privilege/privilegeconfig.config (priviMoney).
 * Nếu sửa 2 giá trị đó bên Lua thì PHẢI sửa lại đây cho khớp.
 */
define('VIP_MONTHCARD_YUANBAO', 300000);
define('VIP_PRIVILEGE_YUANBAO', 880000);

function recharge_is_valid_cash($cash) {
	global $RECHARGE_VALID_CASH;
	return in_array(intval($cash), $RECHARGE_VALID_CASH, true);
}

function recharge_is_vip_tier($yuanbaoAmount) {
	$yuanbaoAmount = intval($yuanbaoAmount);
	return $yuanbaoAmount === VIP_MONTHCARD_YUANBAO || $yuanbaoAmount === VIP_PRIVILEGE_YUANBAO;
}
