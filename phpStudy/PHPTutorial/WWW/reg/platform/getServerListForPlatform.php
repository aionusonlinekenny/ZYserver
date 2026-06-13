<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');

require_once 'lwdb.php';
require_once 'config.php';
require_once 'channel.php';
require_once 'Utils.php';

$page_num = 1;
$page_size = 500;

if(!isset($_POST['platform']) || !isset($_POST['time']) || !isset($_POST['sign']))
{
    exit("param error");
}

$platform = $_POST['platform'];
$time = $_POST['time'];
$sign = $_POST['sign'];

if(isset($_POST['page_num']))
{
    $page_num = intval($_POST['page_num']);
}
if(isset($_POST['page_size']))
{
    $page_size = intval($_POST['page_size']);
}

// $checkStr = "platform=$platform&time=$time&key=TW_PAY_KEY";
// $checkSign = md5($checkStr);
// if($sign != $checkSign)
// {
//     error_log("checkStr = ".$checkStr);
//     error_log("sign = ".$sign);
//     error_log("checkSign = ".$checkSign);
//     exit("sign is error");
// }

sql_connect($GLOBALS['p_db_host'], $GLOBALS['p_db_name'], $GLOBALS['p_db_user'], $GLOBALS['p_db_psd']);
$result = array('page_num'=>$page_num, 'page_size'=>$page_size);
$sql = "select count(*) from cfg_server where status=1 or status=2";
$total_cnt = sql_fetch_one_cell($sql);
$result['total'] = $total_cnt;
$page_total = ceil($total_cnt/$page_size);
$result['page_total'] = $page_total;

$dateStr = date('Y-m-d', time());
//$zerotime = strtotime($dateStr);
$sql = "select id as server_id, `name` as server_name, @game_id:=678 as game_id, substr(openTime, 1, 10) as open_date, substr(openTime, 12, 8) as open_time from cfg_server where openTime>='$dateStr' and (`status`=1 or `status`=2)";
error_log($sql);
$result['today_data'] = sql_fetch_rows($sql);

$start_idx = ($page_num - 1) * $page_size;
$sql = "select id as server_id, `name` as server_name, @game_id:=678 as game_id, substr(openTime, 1, 10) as open_date, substr(openTime, 12, 8) as open_time from cfg_server where `status`=1 or `status`=2 limit $start_idx, $page_size";
$result['data'] = sql_fetch_rows($sql);

echo json_encode($result);
