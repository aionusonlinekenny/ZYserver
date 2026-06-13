<?php
error_reporting(0);
header("Content-type: text/html; charset=utf-8");
ini_set('date.timezone','Asia/Shanghai');
session_start();
//==================================================
$key='// 版本 2024 Powered by 手游源码网 www.syymw.com';
//==================================================
//仅供本地学习娱乐使用
//仅供本地学习娱乐使用
//仅供本地学习娱乐使用
//==================================================

    $_SESSION['gmbt'] ='syymwCOM';
	$gmbt = '醉武侠H5';  //标题	
	$gmcodeb = 'syymw.com';  //GM码
	$gmkey="93b7a754c25e49fae91c00e594f61568";
	$sa="%2F%2F%20%E7%89%88%E6%9C%AC%202024%20Powered%20by%20%E6%89%8B%E6%B8%B8%E6%BA%90%E7%A0%81%E7%BD%91%20www.syymw.com";
	$xname="角色名称";// 界面显示的 比如说有的授权 角色名称 有的是授权 账号 这里方便统一
	$disables=array();
	$vip='yj_';
	$frefresh=5;//防刷新间隔 秒
	$paymax=999999;//充值 最大发送数量
	$mailmax=999999;//邮件 最大发送数量
    $title   = 'GM邮件';
    $content = 'GM给您发福利啦';
	$yzfvip=array(//自行修改VIP权限
	'1'=>'VIP1只充值',   
	'2'=>'VIP2充值+邮件',
	);		

			
	$quarr=array(
		'1'=>array(
			'name'=>'醉武一区',
			'qu_port'=>'abc',
			'db_ip'=>'127.0.0.1',
			'db_port'=>3306,
			'db_name'=>'actors',
			'db_user'=>'root',
			'db_pswd'=>'0987abc123',
            'hidde'=>false
		),
      	'2'=>array(
			'name'=>'乾坤二区',
			'qu_port'=>'10981',
			'db_ip'=>'127.0.0.1',
			'db_port'=>3306,
			'db_name'=>'el01_8002',
			'db_user'=>'root',
			'db_pswd'=>'root',
            'hidde'=>true
		),
      	'3'=>array(
			'name'=>'苍穹三区',
			'qu_port'=>'10982',	
			'db_ip'=>'127.0.0.1',
			'db_port'=>3306,
			'db_name'=>'mtlbbdb_19902',
			'db_user'=>'root',
			'db_pswd'=>'0987abc123',
            'hidde'=>true
		),
        '4'=>array(
			'name'=>'雄霸四区',
			'qu_port'=>'10983',	
			'db_ip'=>'127.0.0.1',
			'db_port'=>3306,
			'db_name'=>'mtlbbdb_19903',
			'db_user'=>'root',
			'db_pswd'=>'0987abc123',
            'hidde'=>true
		),
        '5'=>array(
			'name'=>'中秋五区',
			'qu_port'=>'10984',	
			'db_ip'=>'127.0.0.1',
			'db_port'=>3306,
			'db_name'=>'mtlbbdb_19904',
			'db_user'=>'root',
			'db_pswd'=>'0987abc123',
            'hidde'=>true
		),    
        '6'=>array(
			'name'=>'轩辕六区',
			'qu_port'=>'10985',	
			'db_ip'=>'127.0.0.1',
			'db_port'=>3306,
			'db_name'=>'mtlbbdb_19905',
			'db_user'=>'root',
			'db_pswd'=>'0987abc123',
            'hidde'=>true
		),      
	);

	

	
include_once 'conn.php';	