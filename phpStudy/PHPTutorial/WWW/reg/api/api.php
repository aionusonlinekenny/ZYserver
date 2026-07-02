<?php
include 'config.php';
if ($_POST) {
 switch (poststr ('act')) {
  case 'login' :
   {
    $user = poststr ( 'username' );
    $pass = poststr ( 'passwd' );
    $sqlcx = "SELECT * FROM user WHERE account = '$user'";
    $result = mysql_query ( $sqlcx, $conn );
    $row = mysql_fetch_array ( $result );
    if ($row ['account'] == $user && $row ['passwd'] == $pass) {
     $data = array ('code' => '1','msg' => 'success','token' => $pass,'user' => $user );
    } else {
     $data = array ('code' => '0','msg' => 'Tài khoản hoặc mật khẩu không đúng!');
    }
    exit ( json_encode ( $data ) );
    break;
   }
  case 'reg' :
   {
    $user = poststr ( 'username' );
    $pass = poststr ( 'passwd' );
    if ($pass != '') {
     $sqlcx = "SELECT * FROM user WHERE account = '$user'";
     $result = mysql_query ( $sqlcx, $conn );
     $row = mysql_fetch_array ( $result );
     if ($row ['account'] == $user) {
      $data = array ('code' => '0','msg' => 'Tên đăng nhập đã được đăng ký!');
     } else {
      $datetime = date ( 'Y-m-d h:i:s' );
      $sqlcr = "INSERT INTO user(account, passwd, createtime, updatetime) VALUES ('$user', '$pass', '$datetime', '$datetime')";
      $result = mysql_query ( $sqlcr, $conn );
      if ($result) {	
       $data = array ('code' => '1','msg' => 'success','token' => $pass,'user' => $user);
      } else {
       $data = array ('code' => '0','msg' => 'Đăng ký tài khoản thất bại!');
      }
     }
    } else {
     $data = array ('code' => '0','msg' => 'Mật khẩu không được để trống!');
    }
    exit ( json_encode ( $data ) );
    break;
   }
 }
}













