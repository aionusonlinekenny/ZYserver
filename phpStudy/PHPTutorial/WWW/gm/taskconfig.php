<?php
// Đọc/ghi các file .config nhiệm vụ (cú pháp bảng Lua) + JSON hiển thị phía client,
// dùng chung cho trang quản lý "Nhiệm vụ" trong GM tool.
//
// Nguyên tắc an toàn: bộ ghi (tc_update_entry_text) chỉ thay thế đúng vùng byte của
// giá trị field đã đổi, giữ nguyên 100% phần còn lại của file (comment, thụt lề,
// các entry khác, dấu phẩy cuối dòng...). Không có generic Lua serializer nào được
// dùng để viết lại toàn bộ file.

// ---------- Định nghĩa danh sách file config nhiệm vụ ----------
function tc_get_config_defs($clientConfigDir) {
	return array(
		'daily' => array(
			'label' => 'Nhiệm vụ hàng ngày',
			'file' => 'task/daily.config',
			'clientFile' => $clientConfigDir.'config6.json',
			'clientKey' => 'ConfigDaily',
			'editable' => array('target', 'param', 'trainExp', 'awardList'),
		),
		'achievement' => array(
			'label' => 'Nhiệm vụ thành tựu',
			'file' => 'task/achievementtask.config',
			'clientFile' => $clientConfigDir.'config6.json',
			'clientKey' => 'ConfigAchievementTask',
			'editable' => array('target', 'param', 'score', 'awardList'),
		),
		'dailyaward' => array(
			'label' => 'Thưởng độ hoạt náo (activeValue)',
			'file' => 'task/dailyaward.config',
			'clientFile' => $clientConfigDir.'config4.json',
			'clientKey' => 'ConfigDailyAward',
			'editable' => array('valueLimit', 'awardList'),
		),
		'limittimetask' => array(
			'label' => 'Nhiệm vụ giới hạn thời gian',
			'file' => 'task/limittimetask.config',
			'clientFile' => $clientConfigDir.'config2.json',
			'clientKey' => 'ConfigLimitTimeTask',
			'editable' => array('target', 'param', 'awardList'),
		),
		'limittime' => array(
			'label' => 'Đợt nhiệm vụ giới hạn thời gian',
			'file' => 'task/limittime.config',
			'clientFile' => null,
			'clientKey' => null,
			'editable' => array('mail_head', 'mail_context'),
		),
		'mailtemplate' => array(
			'label' => 'Thư tự động (level-up, chào mừng, v.v.)',
			'file' => 'mail/mail.config',
			'clientFile' => null,
			'clientKey' => null,
			'editable' => array('title', 'content', 'attachment'),
		),
		'firsttier' => array(
			'label' => 'Nạp thẻ lần đầu - mốc x4 Nguyên Bảo',
			'file' => 'recharge/firstrechargeconfig.config',
			'clientFile' => $clientConfigDir.'config6.json',
			'clientKey' => 'ConfigFirstRecharge',
			// Chỉ cho sửa payReturn (số Nguyên Bảo trả về) - KHÔNG cho sửa pay/payType/id vì
			// các giá trị này được đối chiếu trực tiếp với số tiền thanh toán thật đổ về từ
			// cổng thanh toán/SDK (getFirstChargeConfig trong dailyrecharge.lua khớp theo
			// đúng cặp pay+payType) - đổi sai sẽ làm mốc nạp không còn khớp được đơn hàng thật.
			'editable' => array('payReturn'),
		),
	);
}

// ---------- Bộ quét chuỗi/ngoặc dùng chung ----------
function tc_skip_string($text, $pos) {
	$len = strlen($text);
	$i = $pos + 1;
	while ($i < $len) {
		if ($text[$i] === '\\') { $i += 2; continue; }
		if ($text[$i] === '"') { return $i + 1; }
		$i++;
	}
	return $i;
}

function tc_find_matching_brace($text, $openPos) {
	$len = strlen($text);
	$depth = 0;
	$i = $openPos;
	while ($i < $len) {
		$ch = $text[$i];
		if ($ch === '"') { $i = tc_skip_string($text, $i); continue; }
		if ($ch === '{') { $depth++; $i++; continue; }
		if ($ch === '}') { $depth--; if ($depth === 0) { return $i; } $i++; continue; }
		$i++;
	}
	return -1;
}

function tc_unescape_lua_string($rawWithQuotes) {
	$inner = substr($rawWithQuotes, 1, -1);
	return str_replace(array('\\"', '\\\\', '\\n', '\\t'), array('"', '\\', "\n", "\t"), $inner);
}

function tc_escape_lua_string($value) {
	$value = str_replace(array('\\', '"', "\n", "\t"), array('\\\\', '\\"', '\\n', '\\t'), (string)$value);
	return '"'.$value.'"';
}

// ---------- Parse giá trị dạng bảng { } ----------
function tc_parse_table_value($rawVal) {
	$inner = trim(substr($rawVal, 1, -1));
	if ($inner === '') { return array(); }
	if ($inner[0] === '{') {
		$result = array();
		$i = 0; $len = strlen($inner);
		while ($i < $len) {
			$ch = $inner[$i];
			if ($ch === ' ' || $ch === "\t" || $ch === "\n" || $ch === "\r" || $ch === ',') { $i++; continue; }
			if ($ch === '{') {
				$close = tc_find_matching_brace($inner, $i);
				if ($close < 0) { break; }
				$sub = substr($inner, $i + 1, $close - $i - 1);
				$subTrim = trim($sub);
				if ($subTrim !== '' && $subTrim[0] === '{') {
					// Phần tử lại là 1 mảng lồng nữa (VD firstRechargAward: mảng 3 phần tử,
					// mỗi phần tử là 1 awardList riêng cho 1 hệ phái) - đệ quy thay vì chỉ
					// hỗ trợ đúng 2 tầng lồng như trước.
					$result[] = tc_parse_table_value(substr($inner, $i, $close - $i + 1));
				} else {
					$item = array();
					foreach (explode(',', $sub) as $kv) {
						$kv = trim($kv);
						if ($kv === '') { continue; }
						$parts = explode('=', $kv, 2);
						if (count($parts) !== 2) { continue; }
						$k = trim($parts[0]);
						$v = trim($parts[1]);
						$item[$k] = (strpos($v, '.') !== false) ? floatval($v) : intval($v);
					}
					$result[] = $item;
				}
				$i = $close + 1;
			} else {
				$i++;
			}
		}
		return $result;
	}
	$parts = array_map('trim', explode(',', $inner));
	$result = array();
	foreach ($parts as $p) { if ($p !== '') { $result[] = intval($p); } }
	return $result;
}

// ---------- Parse các field key=value bên trong 1 entry ----------
function tc_parse_fields($text, $baseOffset) {
	$fields = array();
	$order = array();
	$len = strlen($text);
	$i = 0;
	while ($i < $len) {
		$ch = $text[$i];
		if ($ch === ' ' || $ch === "\t" || $ch === "\n" || $ch === "\r" || $ch === ',') { $i++; continue; }
		if ($ch === '-' && isset($text[$i + 1]) && $text[$i + 1] === '-') {
			$nl = strpos($text, "\n", $i);
			$i = ($nl === false) ? $len : $nl + 1;
			continue;
		}
		if (!preg_match('/\G[A-Za-z_][A-Za-z0-9_]*/', $text, $m, 0, $i)) { $i++; continue; }
		$key = $m[0];
		$i += strlen($key);
		while ($i < $len && $text[$i] !== '=') { $i++; }
		$i++;
		while ($i < $len && ($text[$i] === ' ' || $text[$i] === "\t")) { $i++; }
		if ($i >= $len) { break; }
		$valStart = $i;
		if ($text[$i] === '"') {
			$end = tc_skip_string($text, $i);
			$value = tc_unescape_lua_string(substr($text, $valStart, $end - $valStart));
			$i = $end;
		} elseif ($text[$i] === '{') {
			$close = tc_find_matching_brace($text, $i);
			if ($close < 0) { $close = $len - 1; }
			$value = tc_parse_table_value(substr($text, $valStart, $close - $valStart + 1));
			$i = $close + 1;
		} else {
			$j = $i;
			while ($j < $len && $text[$j] !== ',' && $text[$j] !== "\n" && $text[$j] !== '}') { $j++; }
			$rawVal = rtrim(substr($text, $valStart, $j - $valStart));
			$value = (strpos($rawVal, '.') !== false) ? floatval($rawVal) : intval($rawVal);
			$i = $j;
		}
		$fields[$key] = array(
			'value' => $value,
			'start' => $baseOffset + $valStart,
			'end' => $baseOffset + $i,
		);
		$order[] = $key;
	}
	return array('fields' => $fields, 'order' => $order);
}

// ---------- Parse toàn bộ file config ----------
function tc_parse_lua_config($text) {
	if (!preg_match('/([A-Za-z_][A-Za-z0-9_]*)\s*=\s*\{/', $text, $m, PREG_OFFSET_CAPTURE)) {
		return null;
	}
	$varName = $m[1][0];
	$matchEnd = $m[0][1] + strlen($m[0][0]);
	$tableOpen = $matchEnd - 1;
	$tableClose = tc_find_matching_brace($text, $tableOpen);
	if ($tableClose < 0) { return null; }

	$entries = array();
	$order = array();
	$len = strlen($text);
	$i = $tableOpen + 1;
	while ($i < $tableClose) {
		$ch = $text[$i];
		if ($ch === ' ' || $ch === "\t" || $ch === "\n" || $ch === "\r" || $ch === ',') { $i++; continue; }
		if ($ch === '-' && isset($text[$i + 1]) && $text[$i + 1] === '-') {
			$nl = strpos($text, "\n", $i);
			$i = ($nl === false) ? $tableClose : $nl + 1;
			continue;
		}
		if ($ch === '[') {
			$entryStart = $i;
			$closeBracket = strpos($text, ']', $i);
			$keyStr = trim(substr($text, $i + 1, $closeBracket - $i - 1));
			$blockKey = intval($keyStr);
			$eqPos = strpos($text, '=', $closeBracket);
			$bracePos = strpos($text, '{', $eqPos);
			$entryClose = tc_find_matching_brace($text, $bracePos);
			if ($entryClose < 0) { break; }
			$afterBrace = $entryClose + 1;
			$j = $afterBrace;
			while ($j < $len && ($text[$j] === ' ' || $text[$j] === "\t")) { $j++; }
			$hasComma = ($j < $len && $text[$j] === ',');
			$entryEnd = $hasComma ? $j + 1 : $afterBrace;

			$innerText = substr($text, $bracePos + 1, $entryClose - $bracePos - 1);
			$parsedFields = tc_parse_fields($innerText, $bracePos + 1);

			$entries[$blockKey] = array(
				'start' => $entryStart,
				'end' => $entryEnd,
				'fields' => $parsedFields['fields'],
				'fieldOrder' => $parsedFields['order'],
			);
			$order[] = $blockKey;
			$i = $entryEnd;
			continue;
		}
		$i++;
	}

	return array(
		'varName' => $varName,
		'tableOpen' => $tableOpen,
		'tableClose' => $tableClose,
		'entries' => $entries,
		'order' => $order,
	);
}

// ---------- Serialize giá trị field để ghi lại vào file ----------
function tc_serialize_value($fieldName, $value) {
	if (is_array($value)) {
		if (count($value) > 0 && is_array($value[0]) && isset($value[0]['type'])) {
			$parts = array();
			foreach ($value as $it) {
				$t = isset($it['type']) ? intval($it['type']) : 0;
				$id = isset($it['id']) ? intval($it['id']) : 0;
				$cnt = isset($it['count']) ? intval($it['count']) : 0;
				$parts[] = '{type='.$t.',id='.$id.',count='.$cnt.'}';
			}
			return '{'.implode(',', $parts).'}';
		}
		if (count($value) > 0 && is_array($value[0])) {
			// Mảng lồng (mỗi phần tử lại là 1 mảng, VD firstRechargAward: 1 awardList
			// riêng cho mỗi hệ phái) - đệ quy để giữ đúng cấu trúc nhiều tầng.
			$parts = array();
			foreach ($value as $sub) { $parts[] = tc_serialize_value($fieldName, $sub); }
			return '{'.implode(',', $parts).'}';
		}
		return '{'.implode(',', array_map('intval', $value)).'}';
	}
	if (is_string($value)) {
		return tc_escape_lua_string($value);
	}
	if (is_float($value) && floor($value) != $value) {
		return (string)$value;
	}
	return (string)intval($value);
}

// ---------- Đọc 1 file config (dùng bản s1 làm chuẩn để hiển thị) ----------
function tc_read_config($dirS1, $defKey, $defs) {
	if (!isset($defs[$defKey])) { return null; }
	$def = $defs[$defKey];
	$path = $dirS1.$def['file'];
	if (!file_exists($path)) { return null; }
	$text = file_get_contents($path);
	$parsed = tc_parse_lua_config($text);
	if ($parsed === null) { return null; }
	return array('def' => $def, 'text' => $text, 'parsed' => $parsed);
}

// ---------- Đọc dữ liệu hiển thị (name/desc) từ JSON client ----------
function tc_read_client_display($def) {
	$display = array();
	if (empty($def['clientFile']) || empty($def['clientKey'])) { return $display; }
	if (!file_exists($def['clientFile'])) { return $display; }
	$json = json_decode(file_get_contents($def['clientFile']), true);
	if (!isset($json[$def['clientKey']]) || !is_array($json[$def['clientKey']])) { return $display; }
	foreach ($json[$def['clientKey']] as $k => $v) {
		$display[intval($k)] = array(
			'name' => isset($v['name']) ? $v['name'] : (isset($v['paydesc']) ? $v['paydesc'] : ''),
			'desc' => isset($v['desc']) ? $v['desc'] : (isset($v['paydesc']) ? $v['paydesc'] : ''),
		);
	}
	return $display;
}

// ---------- Danh mục vật phẩm (id -> tên/icon) để gắn icon vào phần thưởng ----------
// Đọc thẳng ConfigItem trong config0.json (18k+ vật phẩm, đầy đủ hơn nhiều so với
// items_vi.json - danh sách nhỏ dùng riêng cho picker tìm vật phẩm khi gửi thư) - đây
// mới là bảng vật phẩm THẬT của game, có tên tiếng Việt + icon cho hầu hết mọi id
// xuất hiện trong awardList/attachment. File ~2.4MB nên chỉ đọc 1 lần/request (static cache),
// không gửi thẳng cho trình duyệt - server tự tra cứu rồi chỉ trả về đúng phần cần cho mỗi trang.
function tc_load_item_catalog($configItemPath) {
	static $cache = null;
	if ($cache !== null) { return $cache; }
	$cache = array();
	if (!file_exists($configItemPath)) { return $cache; }
	$json = json_decode(file_get_contents($configItemPath), true);
	if (!isset($json['ConfigItem']) || !is_array($json['ConfigItem'])) { return $cache; }
	foreach ($json['ConfigItem'] as $id => $it) {
		$iconId = isset($it['icon']) ? $it['icon'] : $id;
		$cache[intval($id)] = array(
			'name' => isset($it['name']) ? $it['name'] : '',
			'icon' => '../resource/icons/item/'.$iconId.'.png',
		);
	}
	return $cache;
}

// Gắn name/icon vào từng phần tử type=1 (vật phẩm) của 1 danh sách awardList/attachment.
// Tiền tệ (type=0) không cần vì đã có nhãn cố định Đồng/Nguyên Bảo phía JS.
function tc_enrich_award_list($list, $catalog) {
	if (!is_array($list)) { return $list; }
	foreach ($list as &$it) {
		if (isset($it['type']) && $it['type'] == 1 && isset($it['id']) && isset($catalog[$it['id']])) {
			$it['name'] = $catalog[$it['id']]['name'];
			$it['icon'] = $catalog[$it['id']]['icon'];
		}
	}
	unset($it);
	return $list;
}

// ---------- Danh sách entry đã gộp field + tên/mô tả hiển thị ----------
function tc_list_entries($dirS1, $defKey, $defs) {
	$loaded = tc_read_config($dirS1, $defKey, $defs);
	if ($loaded === null) { return array(); }
	$display = tc_read_client_display($loaded['def']);
	$list = array();
	foreach ($loaded['parsed']['order'] as $blockKey) {
		$entry = $loaded['parsed']['entries'][$blockKey];
		$row = array('blockKey' => $blockKey);
		foreach ($entry['fieldOrder'] as $fname) {
			if (!isset($row[$fname])) {
				$row[$fname] = $entry['fields'][$fname]['value'];
			}
		}
		$joinKey = isset($row['taskId']) ? intval($row['taskId']) : (isset($row['index']) ? intval($row['index']) : $blockKey);
		if (isset($display[$joinKey])) {
			$row['name'] = $display[$joinKey]['name'];
			$row['desc'] = $display[$joinKey]['desc'];
		} elseif (isset($display[$blockKey])) {
			$row['name'] = $display[$blockKey]['name'];
			$row['desc'] = $display[$blockKey]['desc'];
		}
		$list[] = $row;
	}
	return $list;
}

// ---------- Ghi đè 1 entry (áp dụng cho cả s1 + s99), có backup ----------
function tc_update_entry_text($text, $entry, $updates, $editableFields) {
	$edits = array();
	$skipped = array();
	foreach ($updates as $field => $newValue) {
		if (!in_array($field, $editableFields, true)) { continue; }
		if (!isset($entry['fields'][$field])) {
			// Field không tồn tại sẵn trong entry gốc (VD: mail chưa có "attachment") - bộ ghi
			// chỉ thay thế giá trị field ĐÃ CÓ, không tự thêm field mới, nên báo skip rõ ràng
			// thay vì âm thầm bỏ qua.
			$skipped[] = $field;
			continue;
		}
		$newRaw = tc_serialize_value($field, $newValue);
		$edits[] = array($entry['fields'][$field]['start'], $entry['fields'][$field]['end'], $newRaw);
	}
	if (count($edits) === 0) { return array('text' => $text, 'changed' => 0, 'skipped' => $skipped); }
	usort($edits, function ($a, $b) { return $b[0] - $a[0]; });
	foreach ($edits as $e) {
		list($s, $e2, $newText) = $e;
		$text = substr($text, 0, $s).$newText.substr($text, $e2);
	}
	return array('text' => $text, 'changed' => count($edits), 'skipped' => $skipped);
}

function tc_backup_file($path) {
	if (!file_exists($path)) { return null; }
	$bakDir = dirname($path).'/backup_gmtool';
	if (!is_dir($bakDir)) { @mkdir($bakDir, 0755, true); }
	$bakPath = $bakDir.'/'.basename($path).'.'.date('Ymd_His').'.bak';
	copy($path, $bakPath);
	return $bakPath;
}

// $serverDirs = array('s1' => '/path/.../task/', 's99' => '/path/.../task/')
function tc_save_task_entry($serverDirs, $defKey, $blockKey, $updates, $defs) {
	if (!isset($defs[$defKey])) {
		return array('ok' => false, 'error' => 'Loại nhiệm vụ không hợp lệ.');
	}
	$def = $defs[$defKey];
	$fileName = $def['file'];
	$backups = array();
	$writtenTo = array();
	$skipped = array();

	foreach ($serverDirs as $srvKey => $dir) {
		$path = $dir.$fileName;
		if (!file_exists($path)) {
			return array('ok' => false, 'error' => "Không tìm thấy file cấu hình trên {$srvKey}: {$path}");
		}
		$text = file_get_contents($path);
		$parsed = tc_parse_lua_config($text);
		if ($parsed === null || !isset($parsed['entries'][$blockKey])) {
			return array('ok' => false, 'error' => "Không tìm thấy nhiệm vụ id {$blockKey} trong file trên {$srvKey}.");
		}
		$result = tc_update_entry_text($text, $parsed['entries'][$blockKey], $updates, $def['editable']);
		if ($result['changed'] === 0) {
			$reason = count($result['skipped']) > 0
				? 'Field(s) "'.implode(', ', $result['skipped']).'" chưa tồn tại sẵn trong entry gốc này (bộ ghi chỉ sửa được field đã có, chưa hỗ trợ thêm field mới).'
				: 'Không có field hợp lệ nào được thay đổi.';
			return array('ok' => false, 'error' => $reason);
		}
		$bak = tc_backup_file($path);
		if ($bak) { $backups[] = $bak; }
		file_put_contents($path, $result['text']);
		$writtenTo[] = $path;
		$skipped = $result['skipped'];
	}

	return array('ok' => true, 'writtenTo' => $writtenTo, 'backups' => $backups, 'skipped' => $skipped);
}

// ---------- Quà nạp đầu tiên theo hệ phái (ChongZhiBaseConfig.firstRechargAward trong recharge/base.config) ----------
// File này là 1 bảng "phẳng" (key=value trực tiếp, không có [N]={...} như các file khác) và
// field firstRechargAward là mảng 3 phần tử (1 awardList riêng cho mỗi hệ phái/job 1-2-3) -
// khác cấu trúc với mọi def khác nên dùng hàm đọc/ghi riêng thay vì ép vào khung entry chung.
function tc_read_first_recharge_gift($dirS1) {
	$path = $dirS1.'recharge/base.config';
	if (!file_exists($path)) { return null; }
	$text = file_get_contents($path);
	if (!preg_match('/firstRechargAward\s*=\s*/', $text, $m, PREG_OFFSET_CAPTURE)) { return null; }
	$valStart = $m[0][1] + strlen($m[0][0]);
	$close = tc_find_matching_brace($text, $valStart);
	if ($close < 0) { return null; }
	$raw = substr($text, $valStart, $close - $valStart + 1);
	return array('jobs' => tc_parse_table_value($raw));
}

function tc_save_first_recharge_gift($serverDirs, $jobsData) {
	$backups = array();
	$writtenTo = array();
	foreach ($serverDirs as $srvKey => $dir) {
		$path = $dir.'recharge/base.config';
		if (!file_exists($path)) {
			return array('ok' => false, 'error' => "Không tìm thấy file cấu hình trên {$srvKey}: {$path}");
		}
		$text = file_get_contents($path);
		if (!preg_match('/firstRechargAward\s*=\s*/', $text, $m, PREG_OFFSET_CAPTURE)) {
			return array('ok' => false, 'error' => "Không tìm thấy field firstRechargAward trên {$srvKey}.");
		}
		$valStart = $m[0][1] + strlen($m[0][0]);
		$close = tc_find_matching_brace($text, $valStart);
		if ($close < 0) {
			return array('ok' => false, 'error' => "File cấu hình trên {$srvKey} có vẻ bị lỗi cú pháp.");
		}
		$newRaw = tc_serialize_value('firstRechargAward', $jobsData);
		$newText = substr($text, 0, $valStart).$newRaw.substr($text, $close + 1);
		$bak = tc_backup_file($path);
		if ($bak) { $backups[] = $bak; }
		file_put_contents($path, $newText);
		$writtenTo[] = $path;
	}
	return array('ok' => true, 'writtenTo' => $writtenTo, 'backups' => $backups);
}
