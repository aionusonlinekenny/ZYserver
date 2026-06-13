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
	$gmcode=trim($_POST['checknum']);
	if($gmcode!=$gmcodeb){exit_notice('GM码错误!!!',0);}
	if(md5($key)!=$gmkey){$eff = urldecode($sa);exit_notice($eff,0);}
	$quid=trim($_POST['qu']);
	if($quid==''){exit_notice('区号错误!!!',0);}
	$qu=$quarr[$quid];
	if(!$qu['db_ip']){exit_notice('区配置不存在!!!',0);}
//	$uid=trim($_POST['uid']);
	$uid=$_POST['uid'];
	if($uid==''){exit_notice($xname.'错误!!!',0);}

    //$act = trim($_POST['type']);
    $act=$_POST['type'];
    //$user_IP = ($_SERVER["HTTP_VIA"]) ? $_SERVER["HTTP_X_FORWARDED_FOR"] : $_SERVER["REMOTE_ADDR"];
    //$user_IP = ($user_IP) ? $user_IP : $_SERVER["REMOTE_ADDR"];	

	//\u4e5d\u96f6\u4e00\u8d77\u73a9\u0020\u0077\u0077\u0077\u002e\u0039\u0030\u0031\u0037\u0035\u002e\u0063\u006f\u006d
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

 		case 'charge2':
			$num=intval($_POST['num']);//类型
			if(!$num){
				$return=array(
					'errcode'=>1,
					'info'=>'修改类型无效',
				);
				exit(json_encode($return));
			}
			
			if($num=="11"){

			op_logs(other, $quport, $uid, "封号\t");
			exit_notice('封号成功',0);					
			}	
			if($num=="22"){

			op_logs(other, $quport, $uid, "解封\t");
			exit_notice('解封成功',0);					
			}					
		
			if($num=="33"){

			op_logs(other, $quport, $uid, "禁言\t");
			exit_notice('禁言成功',0);					
			}	

			if($num=="44"){

			op_logs(other, $quport, $uid, "取消禁言\t");
			exit_notice('取消禁言成功',0);					
			}	
			if($num=="55"){

			op_logs(other, $quport, $uid, "清包\t");
			exit_notice('清包成功',0);					
			}			
   break;	
			
		case 'addvip':
				$vipfile='vip_'.$quid.'.json';
				$fp = fopen($vipfile,"a+");
			    $upass=trim($_POST['upass']);//密码
			    $vip=trim($_POST['vip']);//权限
			    if(!$upass){
				$return=array(
					'errcode'=>1,
					'info'=>'请输入授权密码',
				   );
				exit(json_encode($return));
			     }
			    if(!$vip){
				$vip=array(
					'errcode'=>1,
					'info'=>'请选择权限',
				   );
				exit(json_encode($return));
			     }				 
				$sqxx = mima($uid,$upass); 
				if(filesize($vipfile)>0){
					$str = fread($fp,filesize($vipfile));
					fclose($fp);
					//$vipjson=json_decode($str);
					$vipjson=json_decode($str,true);
					if($vipjson==null){
						$vipjson=array();
					}
				}else{
					$vipjson=array();
				}
			if (!$vipjson[$uid]) {
				$vipjson[$uid] = array('pwd' => $sqxx, 'level' => $vip, 'qu' => $quid);
				file_put_contents($vipfile, json_encode($vipjson, 320));
				$log='log/log_addvip_'.date('Y-m-d').'.log';
				file_put_contents($log,$date."\t".$quid."区 \t"."玩家:".$uid."\t"."权限:".$vip."\t"."成功!!"."\t IP:".$user_IP.PHP_EOL,FILE_APPEND);
					$return=array(
						'errcode'=>1,
						'info'=>'加入VIP成功'.$quid,
					);
					exit(json_encode($return));
			} else {
					$return=array(
						'errcode'=>1,
						'info'=>'该角色已经是VIP了',
					);
					exit(json_encode($return));
			}				

	break;
				
		case 'editvip':
				$vipfile='vip_'.$quid.'.json';
				$fp = fopen($vipfile,"a+");
			    $vip=trim($_POST['vip']);//权限
			    if(!$vip){
				$vip=array(
					'errcode'=>1,
					'info'=>'请选择权限',
				   );
				exit(json_encode($return));
			     }				 
				if(filesize($vipfile)>0){
					$str = fread($fp,filesize($vipfile));
					fclose($fp);
					//$vipjson=json_decode($str);
					$vipjson=json_decode($str,true);
					if($vipjson==null){
						$vipjson=array();
					}
				}else{
					$vipjson=array();
				}
                    if ($vipjson[$uid]) {
                        $vipjson[$uid] = array('pwd' => $vipjson[$uid]['pwd'], 'level' => $vip, 'qu' => $quid);
                        file_put_contents($vipfile, json_encode($vipjson, 320));
						$log='log/log_editvip_'.date('Y-m-d').'.log';
						file_put_contents($log,$date."\t".$quid."区 修改"."\t"."玩家:".$uid."\t"."权限:".$vip."\t"."成功!!"."\t IP:".$user_IP.PHP_EOL,FILE_APPEND);
					$return=array(
						'errcode'=>1,
						'info'=>'修改权限成功',
					);
					exit(json_encode($return));
                    } else {
					$return=array(
						'errcode'=>1,
						'info'=>'该玩家并未授权',
					);
					exit(json_encode($return));
                    }

				break;
			
		case 'editpwd':
				$vipfile='vip_'.$quid.'.json';
				$fp = fopen($vipfile,"a+");
			    $upass=trim($_POST['upass']);//密码
			    if(!$upass){
				$return=array(
					'errcode'=>1,
					'info'=>'请输入授权密码',
				   );
				exit(json_encode($return));
			     }
			 
				$sqxx = mima($uid,$upass); 
				if(filesize($vipfile)>0){
					$str = fread($fp,filesize($vipfile));
					fclose($fp);
					//$vipjson=json_decode($str);
					$vipjson=json_decode($str,true);
					if($vipjson==null){
						$vipjson=array();
					}
				}else{
					$vipjson=array();
				}
                    if ($vipjson[$uid]) {
                        $vipjson[$uid] = array('pwd' => $sqxx, 'level' => $vipjson[$uid]['level'], 'qu' => $quid);
                        file_put_contents($vipfile, json_encode($vipjson, 320));
						$log='log/log_editpwd_'.date('Y-m-d').'.log';
						file_put_contents($log,$date."\t".$quid."区 修改"."\t"."玩家:".$uid."\t"."密码成功!!".$sqxx."\t IP:".$user_IP.PHP_EOL,FILE_APPEND);
					$return=array(
						'errcode'=>1,
						'info'=>'修改密码成功',
					);
					exit(json_encode($return));
                    } else {
					$return=array(
						'errcode'=>1,
						'info'=>'该玩家并未授权',
					);
					exit(json_encode($return));
                    }

		/*			
			if (!$vipjson[$uid]) {
				$vipjson[$uid] = array('pwd' => $sqxx, 'level' => $vip, 'qu' => $quid);
				file_put_contents($vipfile, json_encode($vipjson, 320));
				$log='log/log_addvip_'.date('Y-m-d').'.log';
				file_put_contents($log,$date."\t".$quid."区 \t"."玩家:".$uid."\t"."权限:".$vip."\t"."成功!!"."\t IP:".$user_IP.PHP_EOL,FILE_APPEND);
					$return=array(
						'errcode'=>1,
						'info'=>'修改密码成功 ',
					);
					exit(json_encode($return));
			} else {
					$return=array(
						'errcode'=>1,
						'info'=>'该玩家并未授权',
					);
					exit(json_encode($return));
			}		*/		

				break;
							
			
		case 'delvip':
				$vipfile='vip_'.$quid.'.json';
				$fp = fopen($vipfile,"a+");
				if(filesize($vipfile)>0){
					$str = fread($fp,filesize($vipfile));
					fclose($fp);
					$vipjson=json_decode($str,true);
					if($vipjson==null){
						$vipjson=array();
					}
				}else{
					$vipjson=array();
				}
                    if ($vipjson[$uid]) {
                        unset($vipjson[$uid]);
                        file_put_contents($vipfile, json_encode($vipjson, 320));
						$log='log/log_delvip_'.date('Y-m-d').'.log';
						file_put_contents($log,$date."\t".$quid."区 \t"."删除"."\t"."玩家:".$uid."\t"."权限成功!!"."\t IP:".$user_IP.PHP_EOL,FILE_APPEND);
					$return=array(
						'errcode'=>1,
						'info'=>'取消成功',
					);
					exit(json_encode($return));
                    } else {
					$return=array(
						'errcode'=>1,
						'info'=>'该玩家并未授权',
					);
					exit(json_encode($return));
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
	$return=array(
		'errcode'=>1,
		'info'=>'提交错误',
	);
	exit(json_encode($return));
}