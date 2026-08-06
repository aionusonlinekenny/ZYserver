<?php
include 'config.php';

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

function avatar_test_h($value) {
 return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

function avatar_test_status($ok) {
 return $ok ? '<span class="ok">OK</span>' : '<span class="bad">LỖI</span>';
}

$loggedIn = isset($_SESSION['avatar_account']) && $_SESSION['avatar_account'] !== '';
$serverId = isset($_GET['server_id']) && preg_match('/^[0-9]+$/', (string)$_GET['server_id'])
 ? intval($_GET['server_id']) : 1;
$account = $loggedIn ? $_SESSION['avatar_account'] : '';
$actors = array();
$actorQueryOk = false;
$sameServerCount = 0;
$avatarTableExists = false;

if ($loggedIn) {
 $accountEsc = mysql_real_escape_string($account, $conn);
 $sql = "SELECT actorid, accountname, actorname, serverindex FROM actors.actors "
      . "WHERE accountname='" . $accountEsc . "' ORDER BY serverindex ASC, actorid ASC";
 $result = @mysql_query($sql, $conn);
 if ($result) {
  $actorQueryOk = true;
  while ($row = mysql_fetch_assoc($result)) {
   $actors[] = $row;
   if (intval($row['serverindex']) === $serverId) {
    $sameServerCount++;
   }
  }
 }

 $tableResult = @mysql_query("SHOW TABLES FROM globaldata LIKE 'player_avatar'", $conn);
 $avatarTableExists = $tableResult && mysql_num_rows($tableResult) > 0;
}
?>
<!doctype html>
<html lang="vi">
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <title>Kiểm tra Avatar ZYserver</title>
 <style>
  body{font-family:Arial,sans-serif;background:#f4f6f8;color:#1f2937;margin:0;padding:20px}
  .box{max-width:900px;margin:0 auto;background:#fff;border-radius:10px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.08)}
  h1{font-size:24px;margin:0 0 18px}.row{padding:9px 0;border-bottom:1px solid #eee}.ok{color:#16803a;font-weight:bold}.bad{color:#c62828;font-weight:bold}
  table{width:100%;border-collapse:collapse;margin-top:14px}th,td{border:1px solid #d7dce1;padding:9px;text-align:left}th{background:#eef2f6}
  .note{margin-top:16px;padding:12px;background:#fff8dd;border-left:4px solid #e7ad22}
 </style>
</head>
<body>
 <div class="box">
  <h1>Kiểm tra hệ thống Avatar</h1>
  <div class="row">Session đăng nhập: <?php echo avatar_test_status($loggedIn); ?></div>
  <?php if (!$loggedIn) { ?>
   <div class="note">Chưa có session avatar. Hãy đăng nhập game lại trong trình duyệt này, sau đó mở lại trang test.</div>
  <?php } else { ?>
   <div class="row">Tài khoản session: <strong><?php echo avatar_test_h($account); ?></strong></div>
   <div class="row">Server đang kiểm tra: <strong><?php echo intval($serverId); ?></strong></div>
   <div class="row">Đọc bảng actors: <?php echo avatar_test_status($actorQueryOk); ?></div>
   <div class="row">Nhân vật thuộc tài khoản: <strong><?php echo count($actors); ?></strong></div>
   <div class="row">Nhân vật khớp server <?php echo intval($serverId); ?>: <strong><?php echo intval($sameServerCount); ?></strong></div>
   <div class="row">Bảng globaldata.player_avatar: <?php echo $avatarTableExists ? '<span class="ok">ĐÃ CÓ</span>' : '<span class="bad">CHƯA CÓ</span>'; ?></div>

   <?php if (!$actorQueryOk) { ?>
    <div class="note">Không đọc được bảng nhân vật. Hãy gửi ảnh trang này để mình kiểm tra tiếp; trang test không hiển thị chi tiết lỗi MySQL để tránh lộ thông tin nội bộ.</div>
   <?php } elseif (count($actors) === 0) { ?>
    <div class="note">Không tìm thấy nhân vật nào có accountname trùng với tài khoản session. Đây chính là lý do API hiện báo không có quyền đổi avatar.</div>
   <?php } else { ?>
    <table>
     <thead><tr><th>actorid</th><th>accountname</th><th>actorname</th><th>serverindex</th><th>Khớp server?</th></tr></thead>
     <tbody>
      <?php foreach ($actors as $row) { ?>
       <tr>
        <td><?php echo avatar_test_h($row['actorid']); ?></td>
        <td><?php echo avatar_test_h($row['accountname']); ?></td>
        <td><?php echo avatar_test_h($row['actorname']); ?></td>
        <td><?php echo avatar_test_h($row['serverindex']); ?></td>
        <td><?php echo intval($row['serverindex']) === $serverId ? '<span class="ok">CÓ</span>' : 'Không'; ?></td>
       </tr>
      <?php } ?>
     </tbody>
    </table>
    <?php if ($sameServerCount === 0) { ?>
     <div class="note">Có nhân vật cho tài khoản này nhưng không có nhân vật nào ở server <?php echo intval($serverId); ?>. Hãy gửi ảnh trang này để kiểm tra server_id.</div>
    <?php } ?>
   <?php } ?>

   <?php if (!$avatarTableExists) { ?>
    <div class="note">Bảng player_avatar chưa có không gây ra lỗi quyền hiện tại. API upload được thiết kế để tự tạo bảng này sau khi bước xác minh chủ nhân thành công.</div>
   <?php } ?>
  <?php } ?>
 </div>
</body>
</html>
