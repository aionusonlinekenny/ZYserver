<?php 
$t = time();
?>
<!doctype html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta content="width=device-width, initial-scale=1,maximum-scale=1.0,user-scalable=no" name="viewport"/>
  <meta content="yes" name="apple-mobile-web-app-capable" />
  <meta content="black" name="apple-mobile-web-app-status-bar-style" />
  <meta content="telephone=no" name="format-detection" />
  <meta http-equiv="Cache-Control" content="max-age=3600" />
  <title>Túy Võ Hiệp H5</title>
  <link rel="stylesheet" type="text/css" href="user/css/sdk.css">  
  <script src="layer/jquery-1.8.3.min.js" type="text/javascript"></script>
  <script src="layer/layer.js"></script>
</head>		
<body>
  <div id="frmLogin">
    <!--Ảnh nền tạm thời-->
    <img src="user/img/bg_page.jpg" style="width:100%; height:100%; z-index:1;">
    <div class="content_box">
      <p class="con_tit">
	  <b>Đăng nhập / Đăng ký</b></p>
      <ul>
        <li> <span class="user"></span>
          <p>
            <input type="text" id="username" name="username" class="input_1" value="" placeholder="Vui lòng nhập tên đăng nhập">
          </p>
        </li>
        <li> <span class="password"></span>
          <p>
            <input type="text" id="passwd" name="passwd" class="input_1" value="" placeholder="Vui lòng nhập 6-15 ký tự chữ hoặc số">
          </p>
        </li>		
      </ul>
      <p class="tishi"><span></span></p>
      <p class="button" id="p_login">	 
		<a href="javascript:;" id="btnreg1" class="RG">Đăng ký</a>
        <a href="javascript:;" id="btnlogin" class="LG" style="float: right">Đăng nhập</a>
      </p>
      <p class="button" id="p_reg" style="display: none;">
	    <a href="#" class="SW" id="btnback" style="display: inline-block;">Quay lại đăng nhập</a>
		<a href="#" class="LG" style="visibility:hidden;"></a>
        <a href="#" class="LG" id="btnreg">Đăng ký & Đăng nhập</a>
      </p>
    </div>
  </div>
  <script src="user/js/app.js?v=<?php echo $t;?>"></script>
</body>
</html>