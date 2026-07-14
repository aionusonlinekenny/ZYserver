<?php
	function login_post($url, $cookie, $post){
	$ch = curl_init(); //初始化curl模块
	curl_setopt($ch, CURLOPT_URL, $url); //登录提交的地址
	curl_setopt($ch, CURLOPT_HEADER, 0); //是否显示头信息
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //是否自动显示返回的信息
	curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie); //设置cookie信息保存在指定的文件夹中
	curl_setopt($ch, CURLOPT_POST, 1); //以POST方式提交
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));//要执行的信息
	curl_exec($ch); //执行CURL
	curl_close($ch);
	}
	function mail_post($url, $cookie, $post){
	$ch = curl_init(); //初始化curl模块
	curl_setopt($ch, CURLOPT_URL, $url); //登录提交的地址
	curl_setopt($ch, CURLOPT_HEADER, 0); //是否显示头信息
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //是否自动显示返回的信息
	curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);//设置cookie信息保存在指定的文件夹中
	curl_setopt($ch, CURLOPT_POST, 1); //以POST方式提交
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));//要执行的信息
	curl_exec($ch); //执行CURL
	curl_close($ch);
	}
	$quarr=array(
		'1'=>array(
			'ip'=>'127.0.0.1',
			'user'=>'root',
			'pswd'=>'0987abc123',
			'db'=>'actors',
			'srvid'=>'1',
		)
	);
	// Thư mục "config" gốc trên từng server (cha chung của task/, mail/, v.v. - đường dẫn tới
	// từng file .config cụ thể được ghép thêm bởi taskconfig.php's tc_get_config_defs()).
	// Đường dẫn mặc định suy ra từ cấu trúc repo hiện tại - nếu server thật (production)
	// đặt ở đường dẫn khác thì SỬA TRỰC TIẾP 2 dòng dưới đây cho đúng.
	$taskConfigDirs=array(
		's1'=>__DIR__.'/../../../../server/bin/s1/gameworld/data/config/',
		's99'=>__DIR__.'/../../../../server/bin/s99/gameworld/data/config/',
	);
	$taskClientConfigDir=__DIR__.'/../resource/config1/';