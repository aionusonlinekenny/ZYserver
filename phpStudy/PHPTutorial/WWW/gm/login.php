<?php
error_reporting(0);
header("Content-type: text/html; charset=utf-8");
require 'auth.php';

if(gm_is_logged_in()){
	header('Location: gm.php');
	exit;
}

$error='';
if($_SERVER['REQUEST_METHOD']==='POST'){
	$u=trim($_POST['username']);
	$p=trim($_POST['password']);
	if($u===GM_ADMIN_USER && $p===GM_ADMIN_PASS){
		$_SESSION['gm_logged_in']=true;
		header('Location: gm.php');
		exit;
	}else{
		$error='Sai tài khoản hoặc mật khẩu.';
	}
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>Đăng nhập GM Tool - Túy Võ Hiệp</title>
<style>
  *{box-sizing:border-box}
  body{
    margin:0;
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background:linear-gradient(135deg,#1f2733,#33405a);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }
  .login-card{
    background:#fff;
    border-radius:10px;
    padding:32px 28px;
    width:100%;
    max-width:340px;
    box-shadow:0 10px 30px rgba(0,0,0,0.25);
  }
  .login-card h1{
    margin:0 0 4px;
    font-size:18px;
    color:#2c3038;
  }
  .login-card p.sub{
    margin:0 0 20px;
    font-size:12px;
    color:#8a8f98;
  }
  .field{margin-bottom:14px}
  .field label{
    display:block;
    font-size:12.5px;
    color:#555;
    margin-bottom:6px;
  }
  .field input{
    width:100%;
    height:38px;
    padding:0 12px;
    border:1px solid #d7dae0;
    border-radius:6px;
    font-size:14px;
  }
  .btn{
    width:100%;
    height:40px;
    border:none;
    border-radius:6px;
    background:#2f6fed;
    color:#fff;
    font-size:14px;
    font-weight:600;
    cursor:pointer;
    margin-top:6px;
  }
  .btn:hover{background:#2559c4}
  .error{
    background:#fdeceb;
    color:#e5484d;
    font-size:12.5px;
    padding:8px 10px;
    border-radius:6px;
    margin-bottom:14px;
  }
</style>
</head>
<body>
  <form class="login-card" method="post">
    <h1>GM Tool</h1>
    <p class="sub">Túy Võ Hiệp - Đăng nhập quản trị</p>
    <?php if($error){ ?>
      <div class="error"><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></div>
    <?php } ?>
    <div class="field">
      <label>Tài khoản</label>
      <input type="text" name="username" autocomplete="username" required autofocus>
    </div>
    <div class="field">
      <label>Mật khẩu</label>
      <input type="password" name="password" autocomplete="current-password" required>
    </div>
    <button type="submit" class="btn">Đăng nhập</button>
  </form>
</body>
</html>
