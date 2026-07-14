<?php
include 'api/config.php';
$channel = 10000;
$appId = 'tw';
$logotype = 'dev';
$userId = getstr ( 'username' );
$passWord = getstr ( 'token' );
$time = time ();
$token = $passWord;
$key = '4QrcOUm6WauVuBX8gPg';
$sign = md5 ( $userId . $key );
$ext = '';
$r = 1;
header ( "Location: {$clientip}?uid={$userId}&sign={$sign}" );
?>