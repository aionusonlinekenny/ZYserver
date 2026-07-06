<?php
error_reporting(0);
header("Content-type: text/html; charset=utf-8");
ini_set('date.timezone','Asia/Shanghai');
if($_POST){
	require 'auth.php';
	gm_require_login_or_json();
	include 'config.php';
	include 'paypal_lib.php';
	$quid=trim($_POST['qu']);
	if($quid==''){
		$return=array(
			'errcode'=>1,
			'info'=>'Sai số khu',
		);
		exit(json_encode($return));
	}
	$qu=$quarr[$quid];
	if(!$qu['ip']){
		$return=array(
			'errcode'=>1,
			'info'=>'Chưa cấu hình khu này',
		);
		exit(json_encode($return));
	}
	$uid=trim($_POST['uid']);
	if($uid==''){
		$return=array(
			'errcode'=>1,
			'info'=>'Sai ID nhân vật',
		);
		exit(json_encode($return));
	}
	$srvid=$qu['srvid'];
	$act=$_POST['type'];
	switch($act){
		case 'charge':
			$num=intval($_POST['num']);
			if(!$num){
				$return=array(
					'errcode'=>1,
					'info'=>'Sai số lượng nạp',
				);
				exit(json_encode($return));
			}
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            # Kiểm tra kết nối thành công hay chưa
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            // Chọn cơ sở dữ liệu
            mysqli_select_db($conn,$qu['db']);
            // Chuẩn bị câu lệnh SQL
			$sql="SELECT actors.actorid FROM actors WHERE actors.accountname = '{$uid}'";
			
/* 			$sql="SELECT players.dbid FROM players WHERE players.account = '{$uid}'"; */
            $obj = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($obj);
            if(count($row)==0){
			mysqli_close($conn);
				$return=array(
					'errcode'=>0,
					'info'=>'Tài khoản không tồn tại!',
				);
				exit(json_encode($return));
            }else{
			$actorid = 	$row[actorid];	
			/* $uid=$row['actorid']; */
			$sql="insert into feecallback(serverid,openid,itemid,actor_id) values ('1','{$uid}','{$num}','{$actorid}')";
			
/* 			$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2) VALUES ('{$srvid}','Recharge','{$uid}','{$num}')"; */
            $obj = mysqli_query($conn,$sql);
			mysqli_close($conn);
			}
				$return=array(
					'errcode'=>0,
					'info'=>'Nạp tiền thành công!',
				);
				exit(json_encode($return));
			break;
		case 'mail':
			$itemid=intval($_POST['item']);
			$num=intval($_POST['num']);
			$type='1';
			if(!$num){
				$return=array(
					'errcode'=>1,
					'info'=>'Sai số lượng',
				);
				exit(json_encode($return));
			}
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            # Kiểm tra kết nối thành công hay chưa
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            // Chọn cơ sở dữ liệu
            mysqli_select_db($conn,$qu['db']);
            // Chuẩn bị câu lệnh SQL
			$sql="SELECT actors.actorid FROM actors WHERE actors.accountname = '{$uid}'";
			
			/* $sql="SELECT players.dbid FROM players WHERE players.account = '{$uid}'"; */
            $obj = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($obj);
            if(count($row)==0){
			mysqli_close($conn);
				$return=array(
					'errcode'=>0,
					'info'=>'Tài khoản không tồn tại!',
				);
				exit(json_encode($return));
            }else{
			$uid=$row['actorid'];
			$sql="INSERT INTO gmcmd (serverid,cmdid,cmd,param1,param2,param3,param4,param5) VALUES ('{$srvid}','1','sendMail','Túy Võ Hiệp GM Mail', 'Túy Võ Hiệp GM Mail','{$uid}','{$type},{$itemid},{$num}','')";
/* 			$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2,param3,param4) VALUES ('{$srvid}','mail','{$uid}','{$type}','{$itemid}','{$num}')"; */            $obj = mysqli_query($conn,$sql);
			mysqli_close($conn);
			}
				$return=array(
					'errcode'=>0,
					'info'=>'Gửi thành công!',
				);
				exit(json_encode($return));
			break;
			case 'zhfh':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            # Kiểm tra kết nối thành công hay chưa
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            // Chọn cơ sở dữ liệu
            mysqli_select_db($conn,$qu['db']);
            // Chuẩn bị câu lệnh SQL
			$sql="SELECT actors.actorid FROM actors WHERE actors.accountname = '{$uid}'";
            $obj = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($obj);
            if(count($row)==0){
			mysqli_close($conn);
				$return=array(
					'errcode'=>0,
					'info'=>'Tài khoản không tồn tại!',
				);
				exit(json_encode($return));
            }else{
			$dbid=$row['actorid'];
			$time='1608568913';
			$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2) VALUES ('{$srvid}','Sealed','{$dbid}','{$time}')";
            $obj = mysqli_query($conn,$sql);
			mysqli_close($conn);
			}
				$return=array(
					'errcode'=>0,
					'info'=>'Khóa tài khoản thành công!',
				);
				exit(json_encode($return));
			break;
		case 'fh':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            # Kiểm tra kết nối thành công hay chưa
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            // Chọn cơ sở dữ liệu
            mysqli_select_db($conn,$qu['db']);
            // Chuẩn bị câu lệnh SQL
			$sql="SELECT actors.actorid FROM actors WHERE actors.actorname = '{$uid}'";
            $obj = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($obj);
            if(count($row)==0){
			mysqli_close($conn);
				$return=array(
					'errcode'=>0,
					'info'=>'Tài khoản không tồn tại!',
				);
				exit(json_encode($return));
            }else{
			$dbid=$row['actorid'];
			$time='1608568913';
			$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2) VALUES ('{$srvid}','Sealed','{$dbid}','{$time}')";
            $obj = mysqli_query($conn,$sql);
			mysqli_close($conn);
			}
				$return=array(
					'errcode'=>0,
					'info'=>'Khóa tài khoản thành công!',
				);
				exit(json_encode($return));
			break;
		case 'zhjf':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            # Kiểm tra kết nối thành công hay chưa
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            // Chọn cơ sở dữ liệu
            mysqli_select_db($conn,$qu['db']);
            // Chuẩn bị câu lệnh SQL
			$sql="SELECT actors.actorid FROM actors WHERE actors.actorname = '{$uid}'";
            $obj = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($obj);
            if(count($row)==0){
			mysqli_close($conn);
				$return=array(
					'errcode'=>0,
					'info'=>'Tài khoản không tồn tại!',
				);
				exit(json_encode($return));
            }else{
			$dbid=$row['actorid'];
			$time='0';
			$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2) VALUES ('{$srvid}','Sealed','{$dbid}','{$time}')";
            $obj = mysqli_query($conn,$sql);
			mysqli_close($conn);
			}
				$return=array(
					'errcode'=>0,
					'info'=>'Mở khóa tài khoản thành công!',
				);
				exit(json_encode($return));
			break;
		case 'jf':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            # Kiểm tra kết nối thành công hay chưa
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            // Chọn cơ sở dữ liệu
            mysqli_select_db($conn,$qu['db']);
            // Chuẩn bị câu lệnh SQL
			$sql="SELECT actors.actorid FROM actors WHERE actors.actorname = '{$uid}'";
            $obj = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($obj);
            if(count($row)==0){
			mysqli_close($conn);
				$return=array(
					'errcode'=>0,
					'info'=>'Tài khoản không tồn tại!',
				);
				exit(json_encode($return));
            }else{
			$dbid=$row['actorid'];
			$time='0';
			$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2) VALUES ('{$srvid}','Sealed','{$dbid}','{$time}')";
            $obj = mysqli_query($conn,$sql);
			mysqli_close($conn);
			}
				$return=array(
					'errcode'=>0,
					'info'=>'Mở khóa tài khoản thành công!',
				);
				exit(json_encode($return));
			break;
		case 'jy':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            # Kiểm tra kết nối thành công hay chưa
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            // Chọn cơ sở dữ liệu
            mysqli_select_db($conn,$qu['db']);
            // Chuẩn bị câu lệnh SQL
			$sql="SELECT actors.actorid FROM actors WHERE actors.actorname = '{$uid}'";
            $obj = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($obj);
            if(count($row)==0){
			mysqli_close($conn);
				$return=array(
					'errcode'=>0,
					'info'=>'Tài khoản không tồn tại!',
				);
				exit(json_encode($return));
            }else{
			$dbid=$row['actorid'];
			$time='1608568913';
			$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2) VALUES ('{$srvid}','shutup','{$dbid}','{$time}')";
            $obj = mysqli_query($conn,$sql);
			mysqli_close($conn);
			}
				$return=array(
					'errcode'=>0,
					'info'=>'Cấm chat thành công!',
				);
				exit(json_encode($return));
			break;
		case 'jj':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            # Kiểm tra kết nối thành công hay chưa
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            // Chọn cơ sở dữ liệu
            mysqli_select_db($conn,$qu['db']);
            // Chuẩn bị câu lệnh SQL
			$sql="SELECT actors.actorid FROM actors WHERE actors.actorname = '{$uid}'";
            $obj = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($obj);
            if(count($row)==0){
			mysqli_close($conn);
				$return=array(
					'errcode'=>0,
					'info'=>'Tài khoản không tồn tại!',
				);
				exit(json_encode($return));
            }else{
			$dbid=$row['actorid'];
			$time='0';
			$sql="INSERT INTO gmcmd(serverid,cmd,param1,param2) VALUES ('{$srvid}','releaseshutup','{$dbid}','{$time}')";
            $obj = mysqli_query($conn,$sql);
			mysqli_close($conn);
			}
				$return=array(
					'errcode'=>0,
					'info'=>'Gỡ cấm chat thành công!',
				);
				exit(json_encode($return));
			break;
		case 'addvip':
				$vipfile='vip_'.$quid.'.json';
				$fp = fopen($vipfile,"a+");
				if(filesize($vipfile)>0){
					$str = fread($fp,filesize($vipfile));
					fclose($fp);
					$vipjson=json_decode($str);
					if($vipjson==null){
						$vipjson=array();
					}
				}else{
					$vipjson=array();
				}
				if(!in_array($uid,$vipjson)){
					array_push($vipjson,$uid);
					file_put_contents($vipfile,json_encode($vipjson));
					$return=array(
						'errcode'=>0,
						'info'=>'Thêm VIP thành công.'
					);
					exit(json_encode($return));
				}else{
					$return=array(
						'errcode'=>1,
						'info'=>'Nhân vật này đã là VIP rồi',
					);
					exit(json_encode($return));
				}
				break;
		case 'getpaymentconfig':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            mysqli_select_db($conn,$qu['db']);
			$cfg=pp_get_payment_config($conn,$srvid);
			mysqli_close($conn);
			// Không trả secret thật về client, tránh lộ khi F12/xem mã nguồn trang.
			$cfg['paypal_secret']='';
			$return=array(
				'errcode'=>0,
				'info'=>'OK',
				'config'=>$cfg,
			);
			exit(json_encode($return));
			break;
		case 'setpaymentconfig':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            mysqli_select_db($conn,$qu['db']);
			$ppmode=(trim($_POST['ppmode'])==='live')?'live':'sandbox';
			$ppclientid=mysqli_real_escape_string($conn,trim($_POST['ppclientid']));
			$ppemail=mysqli_real_escape_string($conn,trim($_POST['ppemail']));
			$ppwebhookid=mysqli_real_escape_string($conn,trim($_POST['ppwebhookid']));
			$ppusdrate=floatval($_POST['ppusdrate']);
			if($ppusdrate<=0){ $ppusdrate=1.0; }
			$vipreq=intval($_POST['vipreq'])?1:0;
			$ybreq=intval($_POST['ybreq'])?1:0;
			$ppsecretRaw=trim($_POST['ppsecret']);
			mysqli_query($conn,"INSERT INTO payment_config (serverid,paypal_mode,paypal_client_id,paypal_receiver_email,paypal_webhook_id,usd_conversion_rate,vip_require_payment,yuanbao_require_payment) VALUES ('{$srvid}','{$ppmode}','{$ppclientid}','{$ppemail}','{$ppwebhookid}','{$ppusdrate}','{$vipreq}','{$ybreq}') ON DUPLICATE KEY UPDATE paypal_mode='{$ppmode}',paypal_client_id='{$ppclientid}',paypal_receiver_email='{$ppemail}',paypal_webhook_id='{$ppwebhookid}',usd_conversion_rate='{$ppusdrate}',vip_require_payment='{$vipreq}',yuanbao_require_payment='{$ybreq}'");
			// Chỉ ghi đè secret khi GM thực sự nhập giá trị mới (bỏ trống nghĩa là giữ nguyên secret cũ).
			if($ppsecretRaw!==''){
				$ppsecret=mysqli_real_escape_string($conn,$ppsecretRaw);
				mysqli_query($conn,"UPDATE payment_config SET paypal_secret='{$ppsecret}' WHERE serverid='{$srvid}'");
			}
			mysqli_close($conn);
			$return=array(
				'errcode'=>0,
				'info'=>'Đã lưu cấu hình thanh toán.',
			);
			exit(json_encode($return));
			break;
		case 'playerlist':
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            mysqli_select_db($conn,$qu['db']);
			$keyword=mysqli_real_escape_string($conn,trim($_POST['keyword']));
			$page=max(1,intval($_POST['page']));
			$pageSize=20;
			$offset=($page-1)*$pageSize;
			$where="WHERE serverindex='{$srvid}'";
			if($keyword!==''){
				$where.=" AND (accountname LIKE '%{$keyword}%' OR actorname LIKE '%{$keyword}%')";
			}
			$countObj=mysqli_query($conn,"SELECT COUNT(*) AS cnt FROM actors {$where}");
			$countRow=mysqli_fetch_assoc($countObj);
			$total=intval($countRow['cnt']);
			$obj=mysqli_query($conn,"SELECT actorid,accountname,actorname,level,vip_level,totalpower FROM actors {$where} ORDER BY actorid DESC LIMIT {$pageSize} OFFSET {$offset}");
			$list=array();
			while($row=mysqli_fetch_assoc($obj)){
				$list[]=$row;
			}
			mysqli_close($conn);
			$return=array(
				'errcode'=>0,
				'info'=>'OK',
				'list'=>$list,
				'total'=>$total,
				'page'=>$page,
				'pageSize'=>$pageSize,
			);
			exit(json_encode($return));
			break;
		case 'deleteplayer':
			$actorid=intval($_POST['actorid']);
			if($actorid<=0){
				$return=array(
					'errcode'=>1,
					'info'=>'Thiếu ID nhân vật.',
				);
				exit(json_encode($return));
			}
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            mysqli_select_db($conn,$qu['db']);
			$obj=mysqli_query($conn,"SELECT accountname FROM actors WHERE actorid='{$actorid}' AND serverindex='{$srvid}'");
			$row=mysqli_fetch_assoc($obj);
			if(!$row){
				mysqli_close($conn);
				$return=array(
					'errcode'=>1,
					'info'=>'Không tìm thấy nhân vật.',
				);
				exit(json_encode($return));
			}
			$accountname=$row['accountname'];
			// Dùng stored procedure gốc của server để xoá đầy đủ dữ liệu liên quan (bang hội, vật phẩm, thư, bạn bè...)
			// thay vì tự DELETE FROM actors (sẽ để sót dữ liệu ở các bảng khác).
			$ok=mysqli_query($conn,"CALL clientdeletecharactor('{$actorid}','{$accountname}')");
			mysqli_close($conn);
			if($ok){
				$return=array(
					'errcode'=>0,
					'info'=>'Đã xoá nhân vật thành công.',
				);
			}else{
				$return=array(
					'errcode'=>1,
					'info'=>'Xoá nhân vật thất bại (stored procedure clientdeletecharactor có thể chưa tồn tại trên DB này).',
				);
			}
			exit(json_encode($return));
			break;
		case 'renameplayer':
			$actorid=intval($_POST['actorid']);
			$newname=trim($_POST['newname']);
			if($actorid<=0 || $newname===''){
				$return=array(
					'errcode'=>1,
					'info'=>'Thiếu ID nhân vật hoặc tên mới.',
				);
				exit(json_encode($return));
			}
			if(mb_strlen($newname)>16){
				$return=array(
					'errcode'=>1,
					'info'=>'Tên nhân vật quá dài (tối đa 16 ký tự).',
				);
				exit(json_encode($return));
			}
            $conn = mysqli_connect($qu['ip'],$qu['user'],$qu['pswd']);
            if(!$conn){
				$return=array(
					'errcode'=>1,
					'info'=>'Kết nối cơ sở dữ liệu thất bại!',
				);
				exit(json_encode($return));
            }
            mysqli_select_db($conn,$qu['db']);
			$newnameEsc=mysqli_real_escape_string($conn,$newname);
			$dupObj=mysqli_query($conn,"SELECT actorid FROM actors WHERE actorname='{$newnameEsc}' AND serverindex='{$srvid}'");
			if(mysqli_fetch_assoc($dupObj)){
				mysqli_close($conn);
				$return=array(
					'errcode'=>1,
					'info'=>'Tên nhân vật đã tồn tại.',
				);
				exit(json_encode($return));
			}
			mysqli_query($conn,"UPDATE actors SET actorname='{$newnameEsc}' WHERE actorid='{$actorid}' AND serverindex='{$srvid}'");
			// DBServer giữ 1 bản cache riêng của actor này trong bộ nhớ và tự autosave đè lại actorname
			// theo cache đó, nên chỉ UPDATE thẳng vào bảng actors là chưa đủ. Nếu nhân vật đang online,
			// gmcmd 'renameActor' (tự thêm ở gmdccmdhandler.lua) sẽ đổi tên qua đúng API game dùng
			// (LActor.setEntityName) - hiện ngay lập tức, autosave định kỳ sau đó tự ghi đúng tên mới.
			// 'setActorDataValid' gửi kèm để phòng trường hợp nhân vật đang offline nhưng vẫn còn bản
			// ghi trong cache đọc (cơ chế có sẵn của engine, dùng để "sửa lỗi người chơi không đăng
			// nhập được do cache").
			mysqli_query($conn,"INSERT INTO gmcmd(serverid,cmd,param1,param2) VALUES ('{$srvid}','renameActor','{$actorid}','{$newnameEsc}')");
			mysqli_query($conn,"INSERT INTO gmcmd(serverid,cmd,param1) VALUES ('{$srvid}','setActorDataValid','{$actorid}')");
			mysqli_close($conn);
			$return=array(
				'errcode'=>0,
				'info'=>'Đã đổi tên nhân vật. Nếu đang online sẽ đổi ngay; nếu offline có thể cần đăng nhập lại (và server đã áp dụng bản vá renameActor) để tên mới hiển thị đúng.',
			);
			exit(json_encode($return));
			break;
		default:
			$return=array(
				'errcode'=>1,
				'info'=>'Dữ liệu lỗi',
			);
			exit(json_encode($return));
			break;
	}
}else{
	$return=array(
		'errcode'=>1,
		'info'=>'Lỗi gửi yêu cầu',
	);
	exit(json_encode($return));
}