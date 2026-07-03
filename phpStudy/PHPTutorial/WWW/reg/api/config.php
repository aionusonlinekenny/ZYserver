<?php

// pdo mysql
//error_reporting ( 0 );
session_start ();
header("Content-Type: text/html;charset=utf-8");
header("Access-Control-Allow-Origin:*");
date_default_timezone_set('prc');
// mysql 连接
$conn = @mysql_connect ( '127.0.0.1', 'root', '0987abc123' ) or die ( "Kết nối cơ sở dữ liệu thất bại, vui lòng liên hệ quản trị viên!" );
mysql_select_db ( 'globaldata', $conn );
mysql_query ( "SET NAMES utf8" );
//==============
$clientip = 'http://71.31.97.241';
//==============
// 公共函数调用
function getstr($str) {
 if (isset ( $_GET [$str] )) {
  return $_GET [$str];
 }
 die ( '{"code":0,"msg":"Tham số không hợp lệ"}' );
}

function poststr($str) {
 if (isset ( $_POST [$str] )) {
  return $_POST [$str];
 }
 die ( '{"code":0,"msg":"Tham số không hợp lệ"}' );
}