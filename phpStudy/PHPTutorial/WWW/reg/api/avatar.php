<?php
include 'config.php';

define('AVATAR_MAX_BYTES', 5242880);
define('AVATAR_MAX_SIDE', 4096);
define('AVATAR_OUTPUT_SIZE', 128);

function avatar_json($code, $msg, $extra = array()) {
 header('Content-Type: application/json; charset=utf-8');
 $data = array('code' => $code, 'msg' => $msg);
 foreach ($extra as $key => $value) {
  $data[$key] = $value;
 }
 exit(json_encode($data));
}

function avatar_int_param($source, $key) {
 if (!isset($source[$key]) || !preg_match('/^[0-9]+$/', (string)$source[$key])) {
  return 0;
 }
 return intval($source[$key]);
}

function avatar_ensure_table($conn) {
 $sql = "CREATE TABLE IF NOT EXISTS player_avatar ("
      . "server_id INT NOT NULL,"
      . "actor_id INT UNSIGNED NOT NULL,"
      . "account_name VARCHAR(64) NOT NULL,"
      . "file_name VARCHAR(160) NOT NULL,"
      . "version INT UNSIGNED NOT NULL,"
      . "updated_at INT UNSIGNED NOT NULL,"
      . "PRIMARY KEY (server_id, actor_id)"
      . ") ENGINE=InnoDB DEFAULT CHARSET=utf8";
 return mysql_query($sql, $conn) !== false;
}

function avatar_find($serverId, $actorId, $conn) {
 $sql = "SELECT file_name, version FROM player_avatar WHERE server_id=" . intval($serverId)
      . " AND actor_id=" . intval($actorId) . " LIMIT 1";
 $result = @mysql_query($sql, $conn);
 if (!$result) {
  return false;
 }
 return mysql_fetch_assoc($result);
}

function avatar_find_by_name($serverId, $actorName, $conn) {
 $name = mysql_real_escape_string($actorName, $conn);
 $sql = "SELECT p.actor_id, p.file_name, p.version FROM player_avatar p "
      . "INNER JOIN actors.actors a ON a.actorid=p.actor_id AND a.serverindex=p.server_id "
      . "WHERE p.server_id=" . intval($serverId) . " AND a.actorname='" . $name . "' LIMIT 1";
 $result = @mysql_query($sql, $conn);
 if (!$result) {
  return false;
 }
 return mysql_fetch_assoc($result);
}

function avatar_storage_dir($serverId) {
 $webRoot = dirname(dirname(dirname(__FILE__)));
 return $webRoot . DIRECTORY_SEPARATOR . 'avatar' . DIRECTORY_SEPARATOR . intval($serverId);
}

function avatar_public_url($serverId, $actorId, $version) {
 return '/reg/api/avatar.php?action=image&server_id=' . intval($serverId)
      . '&actor_id=' . intval($actorId) . '&v=' . intval($version);
}

function avatar_output_image($serverId, $actorId, $row) {
 if (!$row || !$row['file_name']) {
  http_response_code(404);
  exit;
 }
 $fileName = basename($row['file_name']);
 $filePath = avatar_storage_dir($serverId) . DIRECTORY_SEPARATOR . $fileName;
 if (!is_file($filePath)) {
  http_response_code(404);
  exit;
 }
 $etag = '"avatar-' . intval($serverId) . '-' . intval($actorId) . '-' . intval($row['version']) . '"';
 if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && $_SERVER['HTTP_IF_NONE_MATCH'] === $etag) {
  header('ETag: ' . $etag);
  http_response_code(304);
  exit;
 }
 header('Content-Type: image/jpeg');
 header('Content-Length: ' . filesize($filePath));
 header('Cache-Control: public, max-age=60');
 header('ETag: ' . $etag);
 readfile($filePath);
 exit;
}

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

if ($action === 'image') {
 $serverId = avatar_int_param($_GET, 'server_id');
 $actorId = avatar_int_param($_GET, 'actor_id');
 if ($serverId <= 0 || $actorId <= 0) {
  http_response_code(404);
  exit;
 }
 $row = avatar_find($serverId, $actorId, $conn);
 avatar_output_image($serverId, $actorId, $row);
}

if ($action === 'image_by_name') {
 $serverId = avatar_int_param($_GET, 'server_id');
 $actorName = isset($_GET['actor_name']) ? trim((string)$_GET['actor_name']) : '';
 if ($serverId <= 0 || $actorName === '' || strlen($actorName) > 96) {
  http_response_code(404);
  exit;
 }
 $row = avatar_find_by_name($serverId, $actorName, $conn);
 if (!$row) {
  http_response_code(404);
  exit;
 }
 avatar_output_image($serverId, intval($row['actor_id']), $row);
}

if ($action !== 'upload' && $action !== 'check') {
 avatar_json(0, 'Thao tác không hợp lệ');
}

if (!isset($_SESSION['avatar_account']) || $_SESSION['avatar_account'] === '') {
 avatar_json(0, 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
}

if ($action === 'check') {
 $serverId = avatar_int_param($_GET, 'server_id');
 if ($serverId <= 0) {
  avatar_json(0, 'Server không hợp lệ');
 }

 $dir = avatar_storage_dir($serverId);
 $created = false;
 if (!is_dir($dir)) {
  if (!@mkdir($dir, 0775, true)) {
   avatar_json(0, 'Không thể tạo thư mục avatar', array(
    'server_id' => $serverId,
    'directory_ready' => false,
    'write_test' => false,
    'cleanup' => true
   ));
  }
  $created = true;
 }
 if (!is_dir($dir) || !is_writable($dir)) {
  avatar_json(0, 'Thư mục avatar không có quyền ghi', array(
   'server_id' => $serverId,
   'directory_ready' => is_dir($dir),
   'write_test' => false,
   'cleanup' => true
  ));
 }

 $testName = '.avatar_write_test_' . substr(md5(uniqid('', true)), 0, 12) . '.tmp';
 $testPath = $dir . DIRECTORY_SEPARATOR . $testName;
 $testData = 'avatar-write-test';
 $written = @file_put_contents($testPath, $testData);
 if ($written !== strlen($testData) || !is_file($testPath)) {
  if (is_file($testPath)) {
   @unlink($testPath);
  }
  avatar_json(0, 'Không thể ghi file vào thư mục avatar', array(
   'server_id' => $serverId,
   'directory_ready' => true,
   'write_test' => false,
   'cleanup' => !is_file($testPath)
  ));
 }

 $cleanup = @unlink($testPath);
 if (!$cleanup) {
  avatar_json(0, 'Ghi được nhưng không thể xóa file kiểm tra', array(
   'server_id' => $serverId,
   'directory_ready' => true,
   'write_test' => true,
   'cleanup' => false
  ));
 }

 avatar_json(1, 'Thư mục avatar có quyền ghi', array(
  'server_id' => $serverId,
  'directory_ready' => true,
  'directory_created' => $created,
  'write_test' => true,
  'cleanup' => true
 ));
}

$serverId = avatar_int_param($_POST, 'server_id');
$actorId = avatar_int_param($_POST, 'actor_id');
if ($serverId <= 0 || $actorId <= 0) {
 avatar_json(0, 'Nhân vật không hợp lệ');
}

$sessionAccount = $_SESSION['avatar_account'];
$account = mysql_real_escape_string($sessionAccount, $conn);
$gameAccount = mysql_real_escape_string('abc_' . $sessionAccount, $conn);
$ownerSql = "SELECT actorid FROM actors.actors WHERE actorid=" . intval($actorId)
          . " AND serverindex=" . intval($serverId)
          . " AND accountname IN ('" . $account . "','" . $gameAccount . "') LIMIT 1";
$ownerResult = @mysql_query($ownerSql, $conn);
$owner = $ownerResult ? mysql_fetch_assoc($ownerResult) : false;
if (!$owner) {
 avatar_json(0, 'Bạn không có quyền đổi avatar của nhân vật này');
}

if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
 avatar_json(0, 'Không nhận được ảnh tải lên');
}
$upload = $_FILES['avatar'];
if ($upload['size'] <= 0 || $upload['size'] > AVATAR_MAX_BYTES || !is_uploaded_file($upload['tmp_name'])) {
 avatar_json(0, 'Ảnh phải nhỏ hơn 5 MB');
}

$info = @getimagesize($upload['tmp_name']);
if (!$info || ($info[2] !== IMAGETYPE_JPEG && $info[2] !== IMAGETYPE_PNG)) {
 avatar_json(0, 'Chỉ hỗ trợ ảnh JPG hoặc PNG');
}
if ($info[0] < 32 || $info[1] < 32 || $info[0] > AVATAR_MAX_SIDE || $info[1] > AVATAR_MAX_SIDE) {
 avatar_json(0, 'Kích thước ảnh không hợp lệ');
}

$raw = @file_get_contents($upload['tmp_name']);
$src = $raw !== false ? @imagecreatefromstring($raw) : false;
if (!$src) {
 avatar_json(0, 'Không thể đọc ảnh tải lên');
}
$srcW = imagesx($src);
$srcH = imagesy($src);
$side = min($srcW, $srcH);
$srcX = intval(($srcW - $side) / 2);
$srcY = intval(($srcH - $side) / 2);
$dst = imagecreatetruecolor(AVATAR_OUTPUT_SIZE, AVATAR_OUTPUT_SIZE);
if (!$dst || !imagecopyresampled($dst, $src, 0, 0, $srcX, $srcY, AVATAR_OUTPUT_SIZE, AVATAR_OUTPUT_SIZE, $side, $side)) {
 imagedestroy($src);
 avatar_json(0, 'Không thể xử lý ảnh tải lên');
}

if (!avatar_ensure_table($conn)) {
 imagedestroy($src);
 imagedestroy($dst);
 avatar_json(0, 'Không thể khởi tạo dữ liệu avatar');
}

$dir = avatar_storage_dir($serverId);
if (!is_dir($dir) && !@mkdir($dir, 0775, true)) {
 imagedestroy($src);
 imagedestroy($dst);
 avatar_json(0, 'Không thể tạo thư mục avatar');
}

$old = avatar_find($serverId, $actorId, $conn);
$version = time();
if ($old && intval($old['version']) >= $version) {
 $version = intval($old['version']) + 1;
}
$suffix = substr(md5(uniqid('', true)), 0, 10);
$fileName = $actorId . '_' . $version . '_' . $suffix . '.jpg';
$filePath = $dir . DIRECTORY_SEPARATOR . $fileName;
if (!@imagejpeg($dst, $filePath, 88)) {
 imagedestroy($src);
 imagedestroy($dst);
 avatar_json(0, 'Không thể lưu avatar');
}
imagedestroy($src);
imagedestroy($dst);

$fileEsc = mysql_real_escape_string($fileName, $conn);
$accountEsc = mysql_real_escape_string($_SESSION['avatar_account'], $conn);
$sql = "INSERT INTO player_avatar(server_id, actor_id, account_name, file_name, version, updated_at) VALUES ("
     . intval($serverId) . "," . intval($actorId) . ",'" . $accountEsc . "','" . $fileEsc . "',"
     . intval($version) . "," . intval($version) . ") ON DUPLICATE KEY UPDATE account_name=VALUES(account_name),"
     . "file_name=VALUES(file_name), version=VALUES(version), updated_at=VALUES(updated_at)";
if (!mysql_query($sql, $conn)) {
 @unlink($filePath);
 avatar_json(0, 'Không thể cập nhật dữ liệu avatar');
}

if ($old && $old['file_name']) {
 $oldPath = $dir . DIRECTORY_SEPARATOR . basename($old['file_name']);
 if ($oldPath !== $filePath && is_file($oldPath)) {
  @unlink($oldPath);
 }
}

avatar_json(1, 'Đổi avatar thành công', array(
 'server_id' => $serverId,
 'actor_id' => $actorId,
 'version' => $version,
 'url' => avatar_public_url($serverId, $actorId, $version)
));
