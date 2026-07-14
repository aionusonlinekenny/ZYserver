<?php
error_reporting(0);
header("Content-type: text/html; charset=utf-8");
ini_set('date.timezone','Asia/Shanghai');
if($_POST){
	require 'auth.php';
	gm_require_login_or_json();
	include 'config.php';
	include 'paypal_lib.php';
	include 'taskconfig.php';
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
			$head=trim($_POST['head']);
			$context=trim($_POST['context']);
			if($head===''){ $head='Túy Võ Hiệp GM Mail'; }
			if($context===''){ $context='Túy Võ Hiệp GM Mail'; }
			$itemsRaw=trim($_POST['items']);
			$itemsArr=$itemsRaw===''?null:json_decode($itemsRaw,true);
			if(!is_array($itemsArr) || count($itemsArr)==0){
				$return=array(
					'errcode'=>1,
					'info'=>'Chưa chọn vật phẩm/tiền tệ nào để gửi',
				);
				exit(json_encode($return));
			}
			$parts=array();
			foreach($itemsArr as $it){
				$t=isset($it['type'])?intval($it['type']):-1;
				$id=isset($it['id'])?intval($it['id']):-1;
				$cnt=isset($it['count'])?intval($it['count']):0;
				if(($t!==0 && $t!==1) || $cnt<=0){ continue; }
				$parts[]="{$t},{$id},{$cnt}";
			}
			if(count($parts)==0){
				$return=array(
					'errcode'=>1,
					'info'=>'Không có vật phẩm/tiền tệ hợp lệ (số lượng phải > 0)',
				);
				exit(json_encode($return));
			}
			if(count($parts)>20){
				$return=array(
					'errcode'=>1,
					'info'=>'Tối đa 20 dòng vật phẩm/tiền tệ mỗi lần gửi',
				);
				exit(json_encode($return));
			}
			$itemStr=implode(';',$parts);
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
			$actorid=$row['actorid'];
			$headEsc=mysqli_real_escape_string($conn,$head);
			$contextEsc=mysqli_real_escape_string($conn,$context);
			$itemStrEsc=mysqli_real_escape_string($conn,$itemStr);
			$sql="INSERT INTO gmcmd (serverid,cmdid,cmd,param1,param2,param3,param4,param5) VALUES ('{$srvid}','1','sendMail','{$headEsc}','{$contextEsc}','{$actorid}','{$itemStrEsc}','')";
            $obj = mysqli_query($conn,$sql);
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
			$obj=mysqli_query($conn,"SELECT * FROM actors WHERE actorid='{$actorid}' AND serverindex='{$srvid}'");
			$row=mysqli_fetch_assoc($obj);
			if(!$row){
				mysqli_close($conn);
				$return=array(
					'errcode'=>1,
					'info'=>'Không tìm thấy nhân vật.',
				);
				exit(json_encode($return));
			}
			$accountname=mysqli_real_escape_string($conn,$row['accountname']);
			$actorname=mysqli_real_escape_string($conn,$row['actorname']);
			// Stored procedure gốc của engine (clientdeletecharactor) không tồn tại trên DB thật
			// (đã xác nhận qua dump SQL thật của người dùng - không nằm trong đó, và 2 procedure
			// khác cùng chuỗi xoá nhân vật trong game - getactorssocial, delfightinfo - cũng vậy,
			// nghĩa là tính năng xoá nhân vật gốc trong game rất có thể cũng chưa từng hoạt động
			// trên server này, không phải lỗi riêng của GM tool).
			//
			// Bản đầu tiên của fix này dùng "xoá mềm" (tắt bit status&2) nhưng người dùng phát hiện
			// đúng: getactoridfromactorname/getcharactoridbyname (2 procedure THẬT vẫn đang dùng để
			// kiểm tra trùng tên khi tạo nhân vật mới) KHÔNG lọc theo status - nghĩa là tên/tài khoản
			// của nhân vật "xoá mềm" sẽ bị coi là đã tồn tại MÃI MÃI, chặn tạo lại nhân vật trùng tên.
			// Nên đổi sang XOÁ THẬT (DELETE nhiều bảng) dựa theo đúng schema thật actors.sql/actors9.sql
			// người dùng cung cấp - mọi bảng có cột actorid tham chiếu tới nhân vật, TRỪ các bảng lưu
			// trữ/đối soát tài chính cố tình GIỮ LẠI (feecallback, payment_orders - lịch sử nạp thẻ)
			// và các bảng chỉ mang tính lịch sử/thống kê không ảnh hưởng logic (guildstorelog, guildchat,
			// auction - để nguyên, tự hết hạn/không có tác dụng phụ khi actorid không còn tồn tại).
			//
			// An toàn: lưu snapshot JSON của dòng actors gốc vào gm_deleted_actors TRƯỚC khi xoá (xem
			// gm/sql/gm_deleted_actors.sql) - nếu chưa tạo bảng này, HUỶ thao tác thay vì xoá không có
			// backup. Xoá bảng con trước, bảng actors xoá SAU CÙNG - nếu có lỗi giữa chừng, nhân vật vẫn
			// còn tồn tại (hiện trong danh sách) thay vì biến mất mà dữ liệu con còn sót lại mồ côi.
			$snapshotJson=mysqli_real_escape_string($conn,json_encode($row));
			$backupOk=mysqli_query($conn,"INSERT INTO gm_deleted_actors (actorid,accountname,actorname,serverindex,actor_snapshot,deleted_by) VALUES ('{$actorid}','{$accountname}','{$actorname}','{$srvid}','{$snapshotJson}','admingame')");
			if(!$backupOk){
				mysqli_close($conn);
				$return=array(
					'errcode'=>1,
					'info'=>'Chưa tạo được bản backup trước khi xoá (bảng gm_deleted_actors có thể chưa tồn tại - chạy file gm/sql/gm_deleted_actors.sql trên DB này trước). Đã HUỶ thao tác xoá để đảm bảo an toàn.',
				);
				exit(json_encode($return));
			}
			$childTables=array('items','mails','offlinemails','roles','actorbinarydata','actorvariable','actorguild','sysvar','actormsg','actoroldname');
			foreach($childTables as $t){
				mysqli_query($conn,"DELETE FROM `{$t}` WHERE actorid='{$actorid}'");
			}
			mysqli_query($conn,"DELETE FROM friends WHERE actorid='{$actorid}' OR friendid='{$actorid}'");
			$ok=mysqli_query($conn,"DELETE FROM actors WHERE actorid='{$actorid}' AND serverindex='{$srvid}'");
			$affected=$ok?mysqli_affected_rows($conn):0;
			mysqli_close($conn);
			if($ok && $affected>0){
				$return=array(
					'errcode'=>0,
					'info'=>'Đã xoá nhân vật "'.$row['actorname'].'" (đã xoá vật lý vật phẩm/thư/bang hội/bạn bè liên quan). Đã lưu snapshot vào bảng gm_deleted_actors để tra cứu nếu cần. Tên nhân vật/tài khoản này giờ dùng lại được để tạo nhân vật mới.',
				);
			}else{
				$return=array(
					'errcode'=>1,
					'info'=>'Xoá nhân vật thất bại ở bước cuối (bảng actors) - dữ liệu con có thể đã bị xoá 1 phần, kiểm tra bảng gm_deleted_actors và các bảng liên quan.',
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
		case 'taskdefs':
			$defs=tc_get_config_defs($taskClientConfigDir);
			$out=array();
			foreach($defs as $k=>$d){
				$out[]=array('key'=>$k,'label'=>$d['label'],'editable'=>$d['editable']);
			}
			$return=array(
				'errcode'=>0,
				'info'=>'OK',
				'list'=>$out,
			);
			exit(json_encode($return));
			break;
		case 'tasklist':
			$defs=tc_get_config_defs($taskClientConfigDir);
			$taskdef=trim($_POST['taskdef']);
			if(!isset($defs[$taskdef])){
				$return=array('errcode'=>1,'info'=>'Loại nhiệm vụ không hợp lệ');
				exit(json_encode($return));
			}
			$allRows=tc_list_entries($taskConfigDirs['s1'],$taskdef,$defs);
			$keyword=mb_strtolower(trim($_POST['keyword']));
			if($keyword!==''){
				$allRows=array_values(array_filter($allRows,function($row) use ($keyword){
					$hay=mb_strtolower((isset($row['name'])?$row['name']:'').' '.(isset($row['desc'])?$row['desc']:'').' '.(isset($row['title'])?$row['title']:'').' '.(isset($row['content'])?$row['content']:'').' '.$row['blockKey'].' '.(isset($row['taskId'])?$row['taskId']:'').' '.(isset($row['id'])?$row['id']:''));
					return mb_strpos($hay,$keyword)!==false;
				}));
			}
			$page=max(1,intval($_POST['page']));
			$pageSize=30;
			$total=count($allRows);
			$pageRows=array_slice($allRows,($page-1)*$pageSize,$pageSize);
			$itemCatalog=tc_load_item_catalog($taskClientConfigDir.'config0.json');
			foreach($pageRows as &$row){
				if(isset($row['awardList'])){ $row['awardList']=tc_enrich_award_list($row['awardList'],$itemCatalog); }
				if(isset($row['attachment'])){ $row['attachment']=tc_enrich_award_list($row['attachment'],$itemCatalog); }
			}
			unset($row);
			$return=array(
				'errcode'=>0,
				'info'=>'OK',
				'list'=>$pageRows,
				'total'=>$total,
				'page'=>$page,
				'pageSize'=>$pageSize,
				'editable'=>$defs[$taskdef]['editable'],
			);
			exit(json_encode($return));
			break;
		case 'tasksave':
			$defs=tc_get_config_defs($taskClientConfigDir);
			$taskdef=trim($_POST['taskdef']);
			$blockKey=intval($_POST['blockkey']);
			if(!isset($defs[$taskdef])){
				$return=array('errcode'=>1,'info'=>'Loại nhiệm vụ không hợp lệ');
				exit(json_encode($return));
			}
			$updatesRaw=trim($_POST['updates']);
			$updates=$updatesRaw===''?null:json_decode($updatesRaw,true);
			if(!is_array($updates) || count($updates)==0){
				$return=array('errcode'=>1,'info'=>'Không có dữ liệu cập nhật');
				exit(json_encode($return));
			}
			// Chỉ nhận field nằm trong danh sách editable của loại nhiệm vụ này (chặn field lạ ngay từ đây)
			$editable=$defs[$taskdef]['editable'];
			$safeUpdates=array();
			foreach($updates as $f=>$v){
				if(!in_array($f,$editable,true)){ continue; }
				if($f==='awardList' || $f==='attachment'){
					if(!is_array($v)){ continue; }
					$cleaned=array();
					foreach($v as $it){
						$t=isset($it['type'])?intval($it['type']):-1;
						$id=isset($it['id'])?intval($it['id']):-1;
						$cnt=isset($it['count'])?intval($it['count']):0;
						if(($t!==0 && $t!==1) || $cnt<=0){ continue; }
						$cleaned[]=array('type'=>$t,'id'=>$id,'count'=>$cnt);
					}
					if(count($cleaned)>20){
						$return=array('errcode'=>1,'info'=>'Tối đa 20 dòng phần thưởng');
						exit(json_encode($return));
					}
					$safeUpdates[$f]=$cleaned;
				}elseif($f==='mail_head' || $f==='mail_context' || $f==='title'){
					$safeUpdates[$f]=mb_substr(trim((string)$v),0,500);
				}elseif($f==='content'){
					$safeUpdates[$f]=mb_substr(trim((string)$v),0,2000);
				}else{
					$safeUpdates[$f]=intval($v);
				}
			}
			if(count($safeUpdates)==0){
				$return=array('errcode'=>1,'info'=>'Không có field hợp lệ để lưu');
				exit(json_encode($return));
			}
			$result=tc_save_task_entry($taskConfigDirs,$taskdef,$blockKey,$safeUpdates,$defs);
			if(!$result['ok']){
				$return=array('errcode'=>1,'info'=>$result['error']);
				exit(json_encode($return));
			}
			$info='Đã lưu vào file .config trên cả s1 và s99. LƯU Ý: phải khởi động lại (restart) gameworld server để thay đổi có hiệu lực trong game.';
			if(!empty($result['skipped'])){
				$info.=' (Field(s) "'.implode(', ',$result['skipped']).'" KHÔNG lưu được vì entry gốc chưa có sẵn field này - bộ ghi chỉ sửa field đã tồn tại, chưa hỗ trợ thêm field mới.)';
			}
			$return=array(
				'errcode'=>0,
				'info'=>$info,
				'backups'=>$result['backups'],
			);
			exit(json_encode($return));
			break;
		case 'getfirstgift':
			$result=tc_read_first_recharge_gift($taskConfigDirs['s1']);
			if($result===null){
				$return=array('errcode'=>1,'info'=>'Không đọc được file recharge/base.config (kiểm tra lại đường dẫn $taskConfigDirs trong config.php)');
				exit(json_encode($return));
			}
			$itemCatalog=tc_load_item_catalog($taskClientConfigDir.'config0.json');
			$jobs=array();
			foreach($result['jobs'] as $job){
				$jobs[]=tc_enrich_award_list($job,$itemCatalog);
			}
			$return=array(
				'errcode'=>0,
				'info'=>'OK',
				'jobs'=>$jobs,
			);
			exit(json_encode($return));
			break;
		case 'savefirstgift':
			$jobsRaw=trim($_POST['jobs']);
			$jobsIn=$jobsRaw===''?null:json_decode($jobsRaw,true);
			if(!is_array($jobsIn) || count($jobsIn)!==3){
				$return=array('errcode'=>1,'info'=>'Dữ liệu không hợp lệ - cần đúng 3 hệ phái');
				exit(json_encode($return));
			}
			$safeJobs=array();
			foreach($jobsIn as $job){
				if(!is_array($job)){
					$return=array('errcode'=>1,'info'=>'Dữ liệu 1 hệ phái không hợp lệ');
					exit(json_encode($return));
				}
				$cleaned=array();
				foreach($job as $it){
					$t=isset($it['type'])?intval($it['type']):-1;
					$id=isset($it['id'])?intval($it['id']):-1;
					$cnt=isset($it['count'])?intval($it['count']):0;
					if(($t!==0 && $t!==1) || $cnt<=0){ continue; }
					$cleaned[]=array('type'=>$t,'id'=>$id,'count'=>$cnt);
				}
				if(count($cleaned)==0){
					$return=array('errcode'=>1,'info'=>'Mỗi hệ phái cần ít nhất 1 dòng phần thưởng hợp lệ');
					exit(json_encode($return));
				}
				if(count($cleaned)>20){
					$return=array('errcode'=>1,'info'=>'Tối đa 20 dòng phần thưởng mỗi hệ phái');
					exit(json_encode($return));
				}
				$safeJobs[]=$cleaned;
			}
			$result=tc_save_first_recharge_gift($taskConfigDirs,$safeJobs);
			if(!$result['ok']){
				$return=array('errcode'=>1,'info'=>$result['error']);
				exit(json_encode($return));
			}
			$return=array(
				'errcode'=>0,
				'info'=>'Đã lưu vào file .config trên cả s1 và s99. LƯU Ý: phải khởi động lại (restart) gameworld server để thay đổi có hiệu lực trong game.',
				'backups'=>$result['backups'],
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