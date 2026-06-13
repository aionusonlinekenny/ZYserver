<?php
include 'user/config.php';
//ini_set('date.timezone','Asia/Shanghai');
//date_default_timezone_set ( 'PRC' );//时区
//header("Content-type:text/html;charset=utf-8"); 
//session_start();
if(isset($_POST['sub'])) {	
$quid=trim($_POST['qu']);
$uid=$_POST['name'];
$upass=trim($_POST['pwd']);
if($quid==''){
		echo "<script>alert('区号错误 ');history.go(-1)</script>";exit;	
}
if ($uid == '') {
		echo "<script>alert('".$xname."错误');history.go(-1)</script>";exit;
		}	
if ($upass == '') {
		echo "<script>alert('请输入密码');history.go(-1)</script>";exit;	
		}
	
    $vipfile='user/vip_'.$quid.'.json';	
	$fp = fopen($vipfile, "a+");
	if (filesize($vipfile) > 0) {
		$str = fread($fp, filesize($vipfile));
		fclose($fp);
		$vipjson = json_decode($str, true);
		if ($vipjson == null) {
			$vipjson = array();
		}
	} else {
		$vipjson = array();
	}
	if (!$vipjson[$uid]) {
		echo "<script>alert('你还不是授权客户');history.go(-1)</script>";exit;
	} elseif ($vipjson[$uid]['pwd'] != mima($uid,$upass)) {
		echo "<script>alert('用户密码不匹配');history.go(-1)</script>";exit;
	}
	if ($vipjson[$uid]['qu'] != $quid) 
	{echo "<script>alert('授权用户与当前选择大区不匹配');history.go(-1)</script>";exit;
	}
	$viplevel=intval($vipjson[$uid]['level']);		
	$_SESSION["vip"] = $viplevel;
	$_SESSION["quid"] = $quid;
	$_SESSION["uid"] = $uid;
	$_SESSION["upass"] = $upass;
	$_SESSION['expiretime'] = time();
	header("Location:user.php");	
	exit;	
		
}

		
?>		
<!DOCTYPE html>		
<html lang="zh-CN">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1"
    />
	<title><?php echo $gmbt; ?>玩家后台</title>
	<meta name="keywords" content="<?php echo $gmbt; ?>玩家后台" />
	<meta name="description" content="<?php echo $gmbt; ?>玩家后台" /> 
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/material-design-iconic-font.min.css">
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>
	<div class="limiter">
		<div class="bg container-login100">
			<div class="wrap-login100">									
					 <span class="login100-form-title"><?php echo $gmbt; ?>玩家后台</span>										
      <div class="modal-body">
			<div class="form-group">
                <form id="form" name="form" method="post" action="">			
                <div class="form-group">
                    <div class="form-group">
                     <select id="qu" name="qu" class="form-control selectpicker" title="请选择区服">
						<?php
						foreach($quarr as $key=>$value){
							if($value['hidde']!=true){
								echo '<option value="'.$key.'">'.$value['name'].'</option>';
						}
						}
						?>
                        </select>
                    </div>
                </div>
				 <hr/>
  <div>
  <input type='text' value='' name="name" id='uid' class="form-control" placeholder='请输入账号'>  
  <input type='text' value='' name="pwd" id='upass' class="form-control" placeholder='请输入密码'>
  <hr/>
 <div>
 <input type='submit'class="btn btn-danger btn-block"  value='登陆'  name="sub"  id='chargebtn'>
	
 </div> 
  <hr/>


</form>
</div>
<hr/>  
</div>
<div class="txt1 text-center">
		<span><?php echo $gmbt; ?> </span>
</div>
<script src='js/jquery-1.7.2.min.js'></script>

</body>
</html>