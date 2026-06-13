<?php
error_reporting(0);
header("Content-type: text/html; charset=utf8");
date_default_timezone_set('Asia/Shanghai');
//include 'config.php';
session_start();
/*$_SESSION = array(); //清除SESSION值,qcymw.com.
    if(isset($_COOKIE[session_name()])){  //判断客户端的cookie文件是否存在,存在的话将其设置为过期.
    setcookie(session_name(),'',time()-1,'/');
    }
    session_destroy();  //清除服务器的sesion文件
*/

	$_SESSION["vip"] = "";
	$_SESSION["quid"] = "";
	$_SESSION["uid"] = "";
	$_SESSION["upass"] = "";
	$_SESSION['expiretime'] = "";
echo "<script>location.href='../index.php';</script>";
exit;
?>