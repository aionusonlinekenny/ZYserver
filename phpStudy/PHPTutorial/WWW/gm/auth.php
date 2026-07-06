<?php
if(session_status() !== PHP_SESSION_ACTIVE){
	session_start();
}

define('GM_ADMIN_USER', 'admingame');
define('GM_ADMIN_PASS', 'eban150892');

function gm_is_logged_in(){
	return !empty($_SESSION['gm_logged_in']);
}

function gm_require_login_or_redirect(){
	if(!gm_is_logged_in()){
		header('Location: login.php');
		exit;
	}
}

function gm_require_login_or_json(){
	if(!gm_is_logged_in()){
		header("Content-type: text/html; charset=utf-8");
		echo json_encode(array(
			'errcode'=>1,
			'info'=>'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
		));
		exit;
	}
}
