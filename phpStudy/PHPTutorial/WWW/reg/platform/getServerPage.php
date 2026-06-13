<?php
header('Cache-Control:no-cache,must-revalidate');
header('Pragma:no-cache');
header("Expires:0");

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');

require_once 'lwdb.php';
require_once 'config.php';
require_once 'channel.php';
require_once 'Utils.php';

if(!isset($_GET['start_index']) || !isset($_GET['end_index']))
{
    exit("param error.");
}

$start_index = intval($_GET['start_index'])-1;
$end_index = intval($_GET['end_index']);
if($start_index < 0)
{
    $start_index = 0;
}
if($end_index > 200000)
{
    $end_index = 200000;
}

$roleId = "";
if(isset($_GET['roleId']))
{
    $roleId = $_GET['roleId'];
}

$is_white_ip = false;       //用户是否在IP白名单中
$is_white_account = false;  //用户是否在账号白名单中

$ip_white_list = IP_WHITE_LIST_TW;
$ip = $_SERVER['REMOTE_ADDR'];
if(stripos($ip_white_list, $ip) != false)
{
    $is_white_ip = true;
}

if($roleId != "" && Utils::CheckWhileAccount($roleId, ACCOUNT_WHITE_LIST_TW) != false)
{
    $is_white_account = true;
}


sql_connect($GLOBALS['p_db_host'], $GLOBALS['p_db_name'], $GLOBALS['p_db_user'], $GLOBALS['p_db_psd']);
$count = $end_index-$start_index;
$sql = "select * from cfg_server where status<=2 and status>0 and now()>= openTime order by id asc limit $start_index, $count";
if($is_white_ip || $is_white_account)
{
    $sql = "select * from cfg_server order by id asc limit $start_index, $count";
}
$res = sql_fetch_rows($sql);
echo json_encode($res);

?>