<?php
error_reporting(0);
header("Content-type: text/html; charset=utf-8");
require 'auth.php';
gm_require_login_or_redirect();
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>Túy Võ Hiệp H5 - GM Tool</title>
<style>
  :root{
    --bg:#f0f2f5;
    --card-bg:#ffffff;
    --border:#e2e5ea;
    --text:#2c3038;
    --muted:#8a8f98;
    --primary:#2f6fed;
    --primary-dark:#2559c4;
    --danger:#e5484d;
    --danger-dark:#c9383d;
    --ok:#1a9e5c;
  }
  *{box-sizing:border-box}
  body{
    margin:0;
    padding:0;
    background:var(--bg);
    color:var(--text);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size:14px;
  }
  .topbar{
    background:linear-gradient(135deg,#1f2733,#33405a);
    color:#fff;
    padding:16px 20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    flex-wrap:wrap;
    gap:8px;
  }
  .topbar h1{
    margin:0;
    font-size:18px;
    font-weight:600;
  }
  .topbar p{
    margin:4px 0 0;
    font-size:12px;
    color:#b9c2d0;
  }
  .topbar .logout{
    color:#fff;
    text-decoration:none;
    font-size:13px;
    background:rgba(255,255,255,0.15);
    padding:8px 14px;
    border-radius:6px;
  }
  .topbar .logout:hover{background:rgba(255,255,255,0.25)}
  .ie-warning{
    background:#fff3cd;
    color:#8a6d1a;
    padding:10px 20px;
    font-size:13px;
  }
  .container{
    max-width:960px;
    margin:0 auto;
    padding:16px;
    display:flex;
    flex-direction:column;
    gap:16px;
  }
  .card{
    background:var(--card-bg);
    border:1px solid var(--border);
    border-radius:10px;
    padding:18px 20px;
    box-shadow:0 1px 2px rgba(20,20,30,0.04);
  }
  .card h2{
    margin:0 0 14px;
    font-size:15px;
    font-weight:600;
    padding-bottom:10px;
    border-bottom:1px solid var(--border);
  }
  .card h2 .badge{
    display:inline-block;
    margin-left:8px;
    font-size:11px;
    font-weight:500;
    color:var(--muted);
  }
  .field{
    display:flex;
    align-items:center;
    gap:10px;
    margin-bottom:12px;
    flex-wrap:wrap;
  }
  .field:last-child{margin-bottom:0}
  .field label{
    min-width:150px;
    color:#555;
    font-size:13px;
  }
  .field input[type=text],
  .field input[type=password],
  .field select{
    height:34px;
    line-height:34px;
    padding:0 10px;
    border:1px solid #d7dae0;
    border-radius:6px;
    font-size:13px;
    background:#fff;
    color:var(--text);
    min-width:180px;
    flex:1;
    max-width:320px;
  }
  .field input[type=checkbox]{
    width:16px;
    height:16px;
  }
  .btn{
    display:inline-block;
    height:34px;
    line-height:34px;
    padding:0 16px;
    border:none;
    border-radius:6px;
    background:var(--primary);
    color:#fff;
    font-size:13px;
    font-weight:500;
    cursor:pointer;
    white-space:nowrap;
  }
  .btn:hover{background:var(--primary-dark)}
  .btn.danger{background:var(--danger)}
  .btn.danger:hover{background:var(--danger-dark)}
  .btn.secondary{background:#5c6470}
  .btn.secondary:hover{background:#464c56}
  .btn-row{
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    margin-top:6px;
  }
  .hint{
    color:var(--danger);
    font-size:12px;
    margin-top:2px;
  }
  .note{
    color:var(--muted);
    font-size:11.5px;
    margin-top:10px;
    line-height:1.5;
  }
  .status-msg{
    color:var(--primary);
    font-size:12.5px;
    min-height:18px;
    margin-top:4px;
  }
  hr.sep{
    border:none;
    border-top:1px dashed var(--border);
    margin:16px 0;
  }
  @media (max-width:520px){
    .field label{min-width:100%;}
    .field input[type=text],
    .field input[type=password],
    .field select{max-width:100%;}
  }
</style>
</head>
<body>

<!--[if IE]>
<div class="ie-warning">Công cụ này không hỗ trợ IE, vui lòng đổi trình duyệt khác</div>
<![endif]-->

<div class="topbar">
  <div>
    <h1>Túy Võ Hiệp - GM Tool</h1>
    <p>Bảng điều khiển quản trị viên</p>
  </div>
  <a class="logout" href="logout.php">Đăng xuất</a>
</div>

<div class="container">

  <div class="card">
    <h2>Khu & tài khoản</h2>
    <div class="field">
      <label>Chọn khu:</label>
      <select id="qu">
        <option value="1">Khu 1</option>
        <!--<option value="2">Khu 2</option><option value="3">Khu 3</option>-->
      </select>
    </div>
    <div class="field">
      <label>Tài khoản game:</label>
      <input type="text" value="abc_" id="uid" placeholder="Nhập tài khoản game">
    </div>
    <div class="note">PS: Thao tác bên dưới vui lòng nhập tên nhân vật vào ô "Tài khoản game" ở trên.</div>
  </div>

  <div class="card">
    <h2>Quản lý nhân vật</h2>
    <div class="field">
      <label>Mã quyền người chơi:</label>
      <input type="text" value="" id="pswd">
      <input type="button" class="btn" value="Thêm VIP" id="addvipbtn">
    </div>
    <div class="field">
      <label>Nạp tiền (nguyên bảo):</label>
      <input type="text" value="" placeholder="Nhập số nguyên bảo" id="chargenum">
      <input type="button" class="btn" value="Nạp tiền" id="chargebtn">
    </div>
    <hr class="sep">
    <div class="btn-row">
      <input type="button" class="btn danger" value="Cấm chat" id="jybtn">
      <input type="button" class="btn secondary" value="Gỡ cấm chat" id="jjbtn">
    </div>
  </div>

  <div class="card">
    <h2>Danh sách người chơi</h2>
    <div class="field">
      <label>Tìm tài khoản/nhân vật:</label>
      <input type="text" value="" id="plistsearch" placeholder="Nhập tài khoản hoặc tên nhân vật">
      <input type="button" class="btn secondary" value="Tìm kiếm" id="plistsearchbtn">
    </div>
    <div style="overflow-x:auto">
      <table id="plisttable" style="width:100%;border-collapse:collapse;font-size:12.5px;margin-top:8px">
        <thead>
          <tr style="text-align:left;border-bottom:1px solid #e2e5ea;color:#8a8f98">
            <th style="padding:6px 8px">Tài khoản</th>
            <th style="padding:6px 8px">Tên nhân vật</th>
            <th style="padding:6px 8px">Cấp độ</th>
            <th style="padding:6px 8px">VIP</th>
            <th style="padding:6px 8px">Lực chiến</th>
            <th style="padding:6px 8px">Thao tác</th>
          </tr>
        </thead>
        <tbody id="plistbody"></tbody>
      </table>
    </div>
    <div class="btn-row" style="align-items:center">
      <input type="button" class="btn secondary" value="Trang trước" id="plistprevbtn">
      <span id="plistpageinfo" style="font-size:12.5px;color:#8a8f98"></span>
      <input type="button" class="btn secondary" value="Trang sau" id="plistnextbtn">
    </div>
    <div id="plistmsg" class="status-msg"></div>
  </div>

  <div class="card">
    <h2>Gửi vật phẩm qua thư <span class="badge">Nạp 2800 kích hoạt Thẻ tháng Nguyên Bảo, nạp 8800 kích hoạt Thẻ tháng Đặc Quyền</span></h2>
    <div class="field">
      <label>Tìm vật phẩm:</label>
      <input type="text" value="" id="searchipt" placeholder="Tìm vật phẩm">
    </div>
    <div class="field">
      <label>Chọn vật phẩm:</label>
      <select id="mailid">
        <option value="0" data-desc="Vui lòng chọn">Vui lòng chọn</option>
        <?php
          $file = fopen("item.txt", "r");
          while(!feof($file))
          {
            $line=fgets($file);
            $txts=explode(';',$line);
            echo '<option value="'.$txts[0].'">'.$txts[1].'</option>';
          }
          fclose($file);
        ?>
      </select>
    </div>
    <div class="field">
      <label>Mô tả vật phẩm:</label>
      <span id="maildesc" style="color:#e5484d;font-size:12px">Vui lòng chọn</span>
    </div>
    <div class="field">
      <label>Số lượng vật phẩm:</label>
      <input type="text" value="" id="mailnum" placeholder="Nhập số lượng phát">
    </div>
    <div class="btn-row">
      <input type="button" class="btn" value="Gửi thư" id="mailbtn">
    </div>
  </div>

  <div class="card">
    <h2>Cài đặt thanh toán PayPal</h2>
    <div class="field">
      <label>Chế độ:</label>
      <select id="ppmode">
        <option value="sandbox">sandbox (thử nghiệm)</option>
        <option value="live">live (thật)</option>
      </select>
    </div>
    <div class="field">
      <label>PayPal Client ID:</label>
      <input type="text" id="ppclientid" style="max-width:420px">
    </div>
    <div class="field">
      <label>PayPal Secret:</label>
      <input type="password" id="ppsecret" style="max-width:420px">
    </div>
    <div class="field">
      <label>Email nhận tiền:</label>
      <input type="text" id="ppemail" style="max-width:420px">
    </div>
    <div class="field">
      <label>Webhook ID:</label>
      <input type="text" id="ppwebhookid" style="max-width:420px">
    </div>
    <div class="field">
      <label>Tỉ giá quy đổi USD:</label>
      <input type="text" id="ppusdrate" value="1.0000" style="max-width:120px">
    </div>
    <hr class="sep">
    <div class="field">
      <label>Bắt buộc trả tiền - VIP/Thẻ tháng:</label>
      <input type="checkbox" id="vipreq">
    </div>
    <div class="field">
      <label>Bắt buộc trả tiền - Nạp Nguyên Bảo:</label>
      <input type="checkbox" id="ybreq">
    </div>
    <div class="btn-row">
      <input type="button" class="btn secondary" value="Tải cấu hình hiện tại" id="pploadbtn">
      <input type="button" class="btn" value="Lưu cấu hình" id="ppsavebtn">
    </div>
    <div id="ppstatus" class="status-msg"></div>
    <div class="note">Bỏ tick 2 công tắc trên = người chơi bấm mua/nạp là nhận ngay, không cần trả tiền thật (vẫn phải xác nhận popup ở client).</div>
  </div>

</div>

<script src='jquery-1.7.2.min.js'></script>
<script>
  var uid='';
  var qu=$('#qu').val();
  $('#uid').change(function(){
	  uid=$.trim($(this).val());
  });
  $('#qu').change(function(){
	  qu=$.trim($(this).val());
  });
  $('#addvipbtn').click(function(){
	  if(uid==''){
		  alert('Tên nhân vật không được để trống.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'addvip',uid:uid,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#zhfhbtn').click(function(){
	  if(uid==''){
		  alert('Tài khoản không được để trống.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'zhfh',uid:uid,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#fhbtn').click(function(){
	  if(uid==''){
		  alert('Tên nhân vật không được để trống.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'fh',uid:uid,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#zhjfbtn').click(function(){
	  if(uid==''){
		  alert('Tên nhân vật không được để trống.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'zhjf',uid:uid,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#jfbtn').click(function(){
	  if(uid==''){
		  alert('Tên nhân vật không được để trống.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'jf',uid:uid,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#jybtn').click(function(){
	  if(uid==''){
		  alert('Tên nhân vật không được để trống.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'jy',uid:uid,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#jjbtn').click(function(){
	  if(uid==''){
		  alert('Tên nhân vật không được để trống.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'jj',uid:uid,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#chargebtn').click(function(){
	  if(uid==''){
		  alert('Tên nhân vật không được để trống.');
		  return false;
	  }
	  var chargenum=$('#chargenum').val();
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'charge',uid:uid,num:chargenum,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#mailbtn').click(function(){
	  if(uid==''){
		  alert('Tên nhân vật không được để trống.');
		  return false;
	  }
	  var itemid=$('#mailid').val();
	  if(itemid=='' || itemid=='0'){
		  alert('Vui lòng chọn vật phẩm.');
		  return false;
	  }
	  var mailnum=$('#mailnum').val();
	  if(mailnum=='' || isNaN(mailnum)){
		  alert('Số lượng không được để trống.');
		  return false;
	  }
	  if(mailnum<1 || mailnum>9999999999){
		  alert('Phạm vi số lượng: 1-9999999999.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'mail',uid:uid,item:itemid,num:mailnum,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#searchipt').on('change',function(){
	  var keyword=$(this).val();
	  $.ajax({
		  url:'itemquery.php',
		  type:'post',
		  'data':{keyword:keyword},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  if(data){
				  $('#mailid').html('');
				for (var i in data){
				  $('#mailid').append('<option value="'+data[i].key+'" data-desc="'+data[i].desc+'">'+data[i].val+'</option>');
				}
			  }else{
				  $('#mailid').html('<option value="0" data-desc="Không tìm thấy">Không tìm thấy</option>');
			  }
			  $('#maildesc').html('Vui lòng chọn');
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#mailid').live('change',function(){
	  console.log('test');
	  var desc=$('#mailid option:selected').data('desc');
	  $('#maildesc').html(desc);
  });
  $('#pploadbtn').click(function(){
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'getpaymentconfig',uid:'-',qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  if(data.errcode!=0){
				  $('#ppstatus').text(data.info);
				  return;
			  }
			  var c=data.config;
			  $('#ppmode').val(c.paypal_mode);
			  $('#ppclientid').val(c.paypal_client_id);
			  $('#ppsecret').val('');
			  $('#ppemail').val(c.paypal_receiver_email);
			  $('#ppwebhookid').val(c.paypal_webhook_id);
			  $('#ppusdrate').val(c.usd_conversion_rate);
			  $('#vipreq').prop('checked', c.vip_require_payment=='1');
			  $('#ybreq').prop('checked', c.yuanbao_require_payment=='1');
			  $('#ppstatus').text('Đã tải cấu hình hiện tại (để trống ô Secret nghĩa là giữ nguyên secret cũ).');
		  },
		  error:function(){
			  $('#ppstatus').text('Tải cấu hình thất bại.');
		  }
	  });
  });
  $('#ppsavebtn').click(function(){
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{
			  type:'setpaymentconfig',uid:'-',qu:qu,
			  ppmode:$('#ppmode').val(),
			  ppclientid:$('#ppclientid').val(),
			  ppsecret:$('#ppsecret').val(),
			  ppemail:$('#ppemail').val(),
			  ppwebhookid:$('#ppwebhookid').val(),
			  ppusdrate:$('#ppusdrate').val(),
			  vipreq:$('#vipreq').is(':checked')?1:0,
			  ybreq:$('#ybreq').is(':checked')?1:0
		  },
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  $('#ppstatus').text(data.info);
		  },
		  error:function(){
			  $('#ppstatus').text('Lưu cấu hình thất bại.');
		  }
	  });
  });

  var plistPage=1;
  var plistPageSize=20;
  function escHtml(s){
	  return String(s==null?'':s).replace(/[&<>"']/g,function(c){
		  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
	  });
  }
  function loadPlayerList(page){
	  plistPage=page;
	  var keyword=$.trim($('#plistsearch').val());
	  $('#plistmsg').text('Đang tải...');
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'playerlist',uid:'-',qu:qu,keyword:keyword,page:plistPage},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  if(data.errcode!=0){
				  $('#plistmsg').text(data.info);
				  $('#plistbody').html('');
				  return;
			  }
			  plistPageSize=data.pageSize;
			  var rows='';
			  if(data.list.length==0){
				  rows='<tr><td colspan="6" style="padding:10px 8px;color:#8a8f98">Không có dữ liệu.</td></tr>';
			  }
			  for(var i=0;i<data.list.length;i++){
				  var p=data.list[i];
				  rows+='<tr style="border-bottom:1px solid #f0f2f5" data-actorid="'+p.actorid+'" data-account="'+escHtml(p.accountname)+'">'
					  +'<td style="padding:6px 8px">'+escHtml(p.accountname)+'</td>'
					  +'<td style="padding:6px 8px">'+escHtml(p.actorname)+'</td>'
					  +'<td style="padding:6px 8px">'+escHtml(p.level)+'</td>'
					  +'<td style="padding:6px 8px">'+escHtml(p.vip_level)+'</td>'
					  +'<td style="padding:6px 8px">'+escHtml(p.totalpower)+'</td>'
					  +'<td style="padding:6px 8px;white-space:nowrap">'
					  +'<a href="#" class="plist-gift" style="color:#2f6fed;margin-right:10px">Tặng quà</a>'
					  +'<a href="#" class="plist-rename" style="color:#5c6470;margin-right:10px">Đổi tên</a>'
					  +'<a href="#" class="plist-delete" style="color:#e5484d">Xoá</a>'
					  +'</td></tr>';
			  }
			  $('#plistbody').html(rows);
			  var totalPages=Math.max(1,Math.ceil(data.total/plistPageSize));
			  $('#plistpageinfo').text('Trang '+data.page+'/'+totalPages+' ('+data.total+' người chơi)');
			  $('#plistmsg').text('');
		  },
		  error:function(){
			  $('#plistmsg').text('Tải danh sách thất bại.');
		  }
	  });
  }
  $('#plistsearchbtn').click(function(){
	  loadPlayerList(1);
  });
  $('#plistsearch').on('keypress',function(e){
	  if(e.which==13){ loadPlayerList(1); }
  });
  $('#plistprevbtn').click(function(){
	  if(plistPage>1){ loadPlayerList(plistPage-1); }
  });
  $('#plistnextbtn').click(function(){
	  loadPlayerList(plistPage+1);
  });
  $('#plistbody').on('click','.plist-gift',function(e){
	  e.preventDefault();
	  var tr=$(this).closest('tr');
	  var account=tr.data('account');
	  uid=String(account);
	  $('#uid').val(uid);
	  $('#plistmsg').text('Đã chọn tài khoản "'+uid+'" - cuộn xuống mục "Gửi vật phẩm qua thư" để tặng quà.');
  });
  $('#plistbody').on('click','.plist-rename',function(e){
	  e.preventDefault();
	  var tr=$(this).closest('tr');
	  var actorid=tr.data('actorid');
	  var newname=prompt('Nhập tên nhân vật mới:');
	  if(newname==null || $.trim(newname)==''){ return; }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'renameplayer',uid:'-',qu:qu,actorid:actorid,newname:$.trim(newname)},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  alert(data.info);
			  if(data.errcode==0){ loadPlayerList(plistPage); }
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  $('#plistbody').on('click','.plist-delete',function(e){
	  e.preventDefault();
	  var tr=$(this).closest('tr');
	  var actorid=tr.data('actorid');
	  var account=tr.data('account');
	  if(!confirm('Xoá nhân vật của tài khoản "'+account+'"? Thao tác này không thể hoàn tác.')){ return; }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'deleteplayer',uid:'-',qu:qu,actorid:actorid},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  alert(data.info);
			  if(data.errcode==0){ loadPlayerList(plistPage); }
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });
  loadPlayerList(1);
</script>
</body>
</html>
