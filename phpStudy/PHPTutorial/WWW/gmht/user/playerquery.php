<?php
include 'config.php';
//session_start();
//error_reporting(0);
//header("Content-type: text/html; charset=utf-8");
//ini_set('date.timezone','Asia/Shanghai');
$time=time();
if(abs($time-(int)$_SESSION['lasttime'])<$frefresh){exit_notice('刷太快了!!!',0);}
$_SESSION['lasttime']=$time;
if($_POST){
	//include 'config.php';
	$quid=$_SESSION["quid"];
	if($quid==''){exit_notice('区号错误!!!',0);}
	$qu=$quarr[$quid];
	if(!$qu['db_ip']){exit_notice('区配置不存在!!!',0);}

	$uid=$_SESSION["uid"];	
	if($uid==''){exit_notice($xname.'错误!!!',0);}
	$viplevel=$_SESSION["vip"];
	$act=$_POST['type'];
	$time=time();
    $date=date('Y-m-d H:i:s');
    $time=time();

    $conn = @mysqli_connect($qu['db_ip'], $qu['db_user'], $qu['db_pswd']);
	if(!$conn){exit_notice('数据库连接失败!!!',0);}//mysqli_connect_error()
	
	@mysqli_query("set names utf8");	
	mysqli_select_db($conn,$qu['db_name']);
	$sql="select * from `actors` where `actorname`='{$uid}' and `serverindex`='{$quid}' limit 1";
	$result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
	if($row['actorid']==''){
	    mysqli_close($conn);
		$return=array(
			'errcode'=>1,
			'info'=>$xname.'不存在'.$uid,
		);
		exit(json_encode($return));
	}
	$actorid = 	$row[actorid];
    $accname = 	$row[accountname];
    if (empty($actorid)){exit_notice('角色ID不能为空',0);}
    //if(!preg_match('/^[0-9]{6}$/', $actorid)) {exit_notice('角色ID只能是6位数字'.$actorid,0);}
	$quport=$qu['qu_port'];
	switch($act){
			case 'charge':
            $num = trim($_POST['num']);
            if (empty($num)) {exit_notice('数量不能为空',0);}
			if($num<1 || $num>$paymax){exit_notice('充值范围：1-'.$paymax,0);}
            if (!preg_match('/^[0-9]{1,9}$/', $num)) {exit_notice('数量只能是1-9位数字',0);}			
            $sql="insert into feecallback(serverid,openid,itemid,actor_id) values ('1','{$accname}','{$num}','{$actorid}')";
            $res=mysqli_query($conn,$sql );	
            mysqli_close($conn);
            if($res){
            op_logs(pay, $quid, $uid, "\t充值".$num."\t"."充值成功\t");			
            exit_notice('充值'.$itemnum.'成功',1);
            }else{
            exit_notice('充值失败',1);
            }

	break;

			
		case 'mail':
				if($viplevel<2){
					$return=array(
						'errcode'=>1,
						'info'=>'物品后台权限未开通.'
					);
					exit(json_encode($return));
				}		
				$itemid=intval($_POST['item']);
				$num = intval($_POST['num']);
				if($itemid == '0'){exit_notice('物品ID错误',0);}
				if(in_array($itemid,$disables)){exit_notice('此物品您无权发送',0);}
				if($num<1 || $num>$mailmax){exit_notice('数量范围：1-'.$mailmax,0);}
				$type='1';
				$sql="INSERT INTO gmcmd (serverid,cmdid,cmd,param1,param2,param3,param4,param5) VALUES ('{$quid}','1','sendMail','{$title}', '{$content}','{$actorid}','{$type},{$itemid},{$num}','')";
				//$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2,param3,param4) VALUES ('{$srvid}','mail','{$uid}','{$type}','{$itemid}','{$num}')"; */ 
				$res=mysqli_query($conn,$sql );	
				mysqli_close($conn);
				if($res){
				op_logs(item, $quid, $uid, "\t发送".$itemid."\t数量".$num."\t成功\t");		
				exit_notice('发送成功',1);
				}else{
				exit_notice('发送失败',1);
				}

				break;
				
		default:
			$return=array(
				'errcode'=>1,
				'info'=>'数据错误',
			);
			exit(json_encode($return));
			break;
	}
}else{
	$return=array(// 手 游 源 码 网 w w w . s y y m w .c o m
		'errcode'=>1,
		'info'=>'提交错误',
	);
	exit(json_encode($return));
}