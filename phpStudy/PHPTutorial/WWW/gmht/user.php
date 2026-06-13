<?php
include 'user/config.php';
//session_start();
if(empty($_SESSION["uid"])){
	echo "<script>alert('非法访问');history.go(-1)</script>";
	exit;
}
//if($_SESSION["vip"]!=1){
//	echo "<script>alert('VIP权限不足 ');history.go(-1)</script>";
//	exit;
//}
 if(isset($_SESSION['expiretime'])) {   
    if($_SESSION['expiretime'] < time()) {  
    unset($_SESSION['expiretime']);  
	header('Location: index.php?TIMEOUT'); // 登出  
	exit(0);  
	} else {  
	$_SESSION['expiretime'] = time() + 3600; // 刷新时间戳  
	}   
} 
$t=time();
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
					 <span class="login100-form-title"><?php echo $gmbt; ?>玩家后台[<?=$_SESSION["quid"]?>]区</span>										
      <div class="modal-body">
			<div class="form-group">
  <div><span></span><input type='name' disabled="disabled"   class="form-control" placeholder="<?=$_SESSION["uid"]?>" value='' id='name'></div>
 <hr/>
 <div><span></span>
 <input type='number' id='chargenum'class="form-control selectpicker"  placeholder='请输入数量'>

 <input type='button'class="btn btn-danger btn-block"  value='充值' id='chargebtn'></div> 
  <hr/>
 <div>
  <hr/>
 <div><span>充值提醒: </span><span style='color:red'>数量不宜过多,按需求使用，用完再发，发爆号概不负责！！！</span><td>
  <hr/>
 
 <?php if ($_SESSION["vip"]>1){?>
  <div>
  <input type='text' value='' id='searchipt' class="form-control" placeholder='物品搜索'>	 
  <select id="mailid" name="mailid" class="selectpicker show-tick form-control" data-live-search="true" data-size="5" title="选物品">
    <?php
		$file = fopen("user/item_wj.txt", "r");
		while(!feof($file))
		{
			$line=fgets($file);
			$txts=explode(';',$line);
			if(count($txts)==2){
				echo '<option value="'.$txts[0].'">'.$txts[1].'</option>';
			}
		}
		fclose($file);
    ?>
            </select></div>
        <div><span></span><input type='text' value='' id='mailnum' class="form-control"  placeholder='请输入发放数量'></div>
    <div><input type='button'  class="btn btn-primary btn-block"  value='发送物品' id='mailbtn'></div>
 <hr/>
<span>友情提醒: </span><span style='color:red'>发送后背包查看,按需求使用，用完再发，发爆号概不负责！！</span>	
</div>
 <?php }?>

 </div>
  <hr/>  
  <div><button class="btn btn-danger btn-block" onclick="window.location.href='user/exit.php'">退出</button></div> 
  <hr/> 
 <div>

</div>
<div class="txt1 text-center">
<span><?php echo $gmbt; ?> </span>
</div>
<script src='js/jquery-1.7.2.min.js'></script>
<script src="js/msg.js?v=<?php echo $t;?>"></script>
<script>

</script>
</body>
</html>