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
  .tabnav{
    display:flex;
    gap:8px;
    flex-wrap:wrap;
  }
  .tabnav button{
    border:none;
    background:#fff;
    color:#555;
    padding:10px 16px;
    border-radius:8px;
    font-size:13px;
    font-weight:600;
    cursor:pointer;
    border:1px solid var(--border);
  }
  .tabnav button.active{
    background:var(--primary);
    color:#fff;
    border-color:var(--primary);
  }
  .tabpanel{display:none;flex-direction:column;gap:16px}
  .tabpanel.active{display:flex}
  .picker{position:relative}
  .picker-input{width:100%;max-width:420px}
  .picker-results{
    max-width:420px;
    max-height:260px;
    overflow-y:auto;
    border:1px solid var(--border);
    border-radius:6px;
    margin-top:6px;
    background:#fff;
    display:none;
  }
  .picker-results.show{display:block}
  .picker-row{
    display:flex;
    align-items:center;
    gap:10px;
    padding:8px 10px;
    cursor:pointer;
    border-bottom:1px solid #f0f2f5;
  }
  .picker-row:last-child{border-bottom:none}
  .picker-row:hover{background:#f5f7fa}
  .picker-row img{
    width:32px;
    height:32px;
    border-radius:4px;
    background:#f0f2f5;
    object-fit:contain;
  }
  .picker-row .noicon{
    width:32px;
    height:32px;
    border-radius:4px;
    background:#e2e5ea;
    color:#8a8f98;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:10px;
  }
  .selected-box{
    display:flex;
    align-items:center;
    gap:12px;
    padding:10px;
    border:1px solid var(--border);
    border-radius:8px;
    background:#f8f9fb;
    margin-bottom:12px;
  }
  .selected-box img{
    width:40px;
    height:40px;
    border-radius:6px;
    object-fit:contain;
    background:#fff;
    border:1px solid var(--border);
  }
  .selected-box .noicon{
    width:40px;
    height:40px;
    border-radius:6px;
    background:#e2e5ea;
    color:#8a8f98;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:10px;
    flex-shrink:0;
  }
  .selected-box .name{font-weight:600;font-size:13px}
  .selected-box .sub{font-size:11.5px;color:var(--muted)}
  @media (max-width:520px){
    .field label{min-width:100%;}
    .field input[type=text],
    .field input[type=password],
    .field select{max-width:100%;}
    .picker-input,.picker-results{max-width:100%;}
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
    <h2>Khu & tài khoản đang thao tác</h2>
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
    <div class="note">Tài khoản ở đây dùng cho các thao tác nhập tay (cấm chat, thêm VIP...). Ở tab "Gửi quà / Nạp VIP" có thể chọn tài khoản trực tiếp từ danh sách mà không cần gõ tay.</div>
  </div>

  <div class="tabnav">
    <button type="button" class="tab-btn active" data-tab="tab-account">Quản lý tài khoản</button>
    <button type="button" class="tab-btn" data-tab="tab-gift">Gửi quà / Nạp VIP</button>
    <button type="button" class="tab-btn" data-tab="tab-payment">Quản lý Payment</button>
    <button type="button" class="tab-btn" data-tab="tab-task">Nhiệm vụ</button>
  </div>

  <!-- TAB: Quản lý tài khoản -->
  <div class="tabpanel active" id="tab-account">

    <div class="card">
      <h2>Quyền & kiểm duyệt</h2>
      <div class="field">
        <label>Mã quyền người chơi:</label>
        <input type="text" value="" id="pswd">
        <input type="button" class="btn" value="Thêm VIP" id="addvipbtn">
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

  </div>

  <!-- TAB: Gửi quà / Nạp VIP -->
  <div class="tabpanel" id="tab-gift">

    <div class="card">
      <h2>Nạp tiền (nguyên bảo)</h2>
      <div class="field">
        <label>Tài khoản/nhân vật:</label>
        <input type="text" value="" id="chargeuid" placeholder="Nhập hoặc chọn ở dưới">
      </div>
      <div class="field">
        <label>Số nguyên bảo:</label>
        <input type="text" value="" placeholder="Nhập số nguyên bảo" id="chargenum">
        <input type="button" class="btn" value="Nạp tiền" id="chargebtn">
      </div>
    </div>

    <div class="card">
      <h2>Chọn tài khoản nhận quà</h2>
      <div class="picker">
        <input type="text" class="picker-input" id="giftaccsearch" placeholder="Gõ để tìm tài khoản hoặc tên nhân vật...">
        <div class="picker-results" id="giftaccresults"></div>
      </div>
      <div class="selected-box" id="giftaccselected" style="display:none;margin-top:12px">
        <div class="noicon">ACC</div>
        <div>
          <div class="name" id="giftaccselname"></div>
          <div class="sub" id="giftaccselsub"></div>
        </div>
      </div>
      <div class="note">Không cần gõ tay tên nhân vật — gõ vài ký tự ở trên rồi bấm chọn tài khoản trong danh sách kết quả.</div>
    </div>

    <div class="card">
      <h2>Gửi thư quà tặng <span class="badge">Có thể gửi nhiều vật phẩm + tiền tệ trong 1 thư, tiêu đề/nội dung tùy chỉnh</span></h2>

      <div class="field">
        <label>Tiêu đề thư:</label>
        <input type="text" id="mailhead" placeholder="Để trống = &quot;Túy Võ Hiệp GM Mail&quot;">
      </div>
      <div class="field">
        <label>Nội dung thư:</label>
        <input type="text" id="mailcontext" placeholder="Để trống = &quot;Túy Võ Hiệp GM Mail&quot;">
      </div>

      <hr class="sep">

      <div class="field">
        <label>Đồng (Gold):</label>
        <input type="text" id="mailgold" placeholder="Số lượng Đồng, để trống nếu không gửi">
      </div>
      <div class="field">
        <label>Nguyên Bảo (Yuanbao):</label>
        <input type="text" id="mailyuanbao" placeholder="Số lượng Nguyên Bảo, để trống nếu không gửi">
      </div>
      <div class="note">Loại tiền tệ được suy luận từ dữ liệu cấu hình game (chưa có xác nhận 100% từ mã nguồn gốc engine) - nếu người chơi nhận sai loại tiền, báo lại để điều chỉnh.</div>

      <hr class="sep">

      <div id="mailitemrows"></div>
      <div class="btn-row">
        <input type="button" class="btn secondary" value="+ Thêm dòng vật phẩm" id="mailadditembtn">
      </div>

      <div class="btn-row" style="margin-top:14px">
        <input type="button" class="btn" value="Gửi thư" id="mailbtn">
      </div>
    </div>

  </div>

  <template id="mailitemrowtpl">
    <div class="card mail-item-row" style="background:#f8f9fb">
      <div class="picker">
        <input type="text" class="picker-input mail-item-search" placeholder="Gõ tên hoặc ID vật phẩm...">
        <div class="picker-results mail-item-results"></div>
      </div>
      <input type="hidden" class="mail-item-id" value="0">
      <div class="selected-box mail-item-selected" style="margin-top:12px">
        <div class="noicon">?</div>
        <div>
          <div class="name">Chưa chọn vật phẩm</div>
          <div class="sub">Vui lòng tìm và chọn vật phẩm ở trên</div>
        </div>
      </div>
      <div class="field">
        <label>Số lượng vật phẩm:</label>
        <input type="text" class="mail-item-num" placeholder="Nhập số lượng phát">
      </div>
      <div class="btn-row">
        <input type="button" class="btn danger mail-item-remove" value="Xoá dòng này">
      </div>
    </div>
  </template>

  <!-- TAB: Quản lý Payment -->
  <div class="tabpanel" id="tab-payment">
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

  <!-- TAB: Nhiệm vụ -->
  <div class="tabpanel" id="tab-task">

    <div class="card" style="border-color:#e5484d;background:#fff5f5">
      <h2 style="color:#e5484d;border-bottom-color:#f3c6c6">⚠ Lưu ý quan trọng trước khi sửa nhiệm vụ</h2>
      <div style="color:#c9383d;font-size:12.5px;line-height:1.6">
        Lưu ở đây sẽ ghi <b>trực tiếp</b> xuống file cấu hình gốc (.config) trên cả 2 server <b>s1</b> và <b>s99</b> (tự động backup file cũ trước khi ghi vào thư mục <code>backup_gmtool</code> cùng cấp).
        Thay đổi <b>KHÔNG</b> áp dụng ngay cho người chơi đang online — bắt buộc phải tự <b>khởi động lại (restart) tiến trình gameworld</b> thì mới có hiệu lực trong game. Vui lòng kiểm tra kỹ số liệu trước khi lưu.
      </div>
    </div>

    <div class="card">
      <h2>Danh sách nhiệm vụ</h2>
      <div class="field">
        <label>Loại nhiệm vụ:</label>
        <select id="taskdefselect"></select>
      </div>
      <div class="field">
        <label>Tìm kiếm:</label>
        <input type="text" id="tasksearch" placeholder="Tìm theo tên, mô tả, ID...">
        <input type="button" class="btn secondary" value="Tìm" id="tasksearchbtn">
      </div>
      <div style="overflow-x:auto">
        <table id="tasktable" style="width:100%;border-collapse:collapse;font-size:12.5px;margin-top:8px">
          <thead>
            <tr style="text-align:left;border-bottom:1px solid #e2e5ea;color:#8a8f98">
              <th style="padding:6px 8px">ID</th>
              <th style="padding:6px 8px">Tên</th>
              <th style="padding:6px 8px">Mô tả</th>
              <th style="padding:6px 8px">Điều kiện</th>
              <th style="padding:6px 8px">Thưởng</th>
              <th style="padding:6px 8px">Thao tác</th>
            </tr>
          </thead>
          <tbody id="taskbody"></tbody>
        </table>
      </div>
      <div class="btn-row" style="align-items:center">
        <input type="button" class="btn secondary" value="Trang trước" id="taskprevbtn">
        <span id="taskpageinfo" style="font-size:12.5px;color:#8a8f98"></span>
        <input type="button" class="btn secondary" value="Trang sau" id="tasknextbtn">
      </div>
      <div id="taskmsg" class="status-msg"></div>
    </div>

    <div class="card" id="taskeditcard" style="display:none">
      <h2>Sửa nhiệm vụ #<span id="taskeditid"></span> <span class="badge" id="taskeditname"></span></h2>
      <div id="taskeditfields"></div>
      <div id="taskeditawardsection" style="display:none">
        <hr class="sep">
        <div class="field"><label>Phần thưởng (reward):</label></div>
        <div id="taskeditawardrows"></div>
        <div class="btn-row">
          <input type="button" class="btn secondary" value="+ Thêm dòng thưởng" id="taskadditembtn">
        </div>
      </div>
      <div class="btn-row" style="margin-top:14px">
        <input type="button" class="btn" value="Lưu thay đổi (ghi xuống s1 + s99)" id="tasksavebtn">
        <input type="button" class="btn secondary" value="Huỷ" id="taskcancelbtn">
      </div>
      <div id="taskeditmsg" class="status-msg"></div>
    </div>

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
	  loadPlayerList(1);
  });

  $('.tab-btn').click(function(){
	  var target=$(this).data('tab');
	  $('.tab-btn').removeClass('active');
	  $(this).addClass('active');
	  $('.tabpanel').removeClass('active');
	  $('#'+target).addClass('active');
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
	  var chargeuid=$.trim($('#chargeuid').val());
	  if(chargeuid==''){
		  alert('Tài khoản/nhân vật không được để trống.');
		  return false;
	  }
	  var chargenum=$('#chargenum').val();
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'charge',uid:chargeuid,num:chargenum,qu:qu},
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
	  var mailuid=$.trim($('#chargeuid').val());
	  if(mailuid==''){
		  alert('Vui lòng chọn tài khoản nhận quà ở trên.');
		  return false;
	  }
	  var items=[];
	  var gold=$.trim($('#mailgold').val());
	  if(gold!==''){
		  if(isNaN(gold) || gold<1){ alert('Số lượng Đồng không hợp lệ.'); return false; }
		  items.push({type:0,id:1,count:parseInt(gold,10)});
	  }
	  var yb=$.trim($('#mailyuanbao').val());
	  if(yb!==''){
		  if(isNaN(yb) || yb<1){ alert('Số lượng Nguyên Bảo không hợp lệ.'); return false; }
		  items.push({type:0,id:2,count:parseInt(yb,10)});
	  }
	  var rowsOk=true;
	  $('#mailitemrows .mail-item-row').each(function(){
		  var row=$(this);
		  var itemid=row.find('.mail-item-id').val();
		  var num=$.trim(row.find('.mail-item-num').val());
		  if(itemid=='' || itemid=='0'){
			  if(num!==''){ alert('Có dòng vật phẩm chưa chọn vật phẩm.'); rowsOk=false; }
			  return;
		  }
		  if(num=='' || isNaN(num) || num<1){
			  alert('Số lượng của 1 dòng vật phẩm không hợp lệ.');
			  rowsOk=false;
			  return;
		  }
		  items.push({type:1,id:parseInt(itemid,10),count:parseInt(num,10)});
	  });
	  if(!rowsOk){ return false; }
	  if(items.length==0){
		  alert('Vui lòng nhập ít nhất 1 vật phẩm hoặc số lượng tiền tệ.');
		  return false;
	  }
	  $.ajax({
		  url:'gmquery.php',
		  type:'post',
		  'data':{type:'mail',uid:mailuid,items:JSON.stringify(items),head:$('#mailhead').val(),context:$('#mailcontext').val(),qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
			  if(data.errcode==0){
				  $('#mailgold').val('');
				  $('#mailyuanbao').val('');
				  $('#mailitemrows').html('');
				  addMailItemRow();
			  }
		  },
		  error:function(){
			  alert('Thao tác thất bại');
		  }
	  });
  });

  // ---- Picker nhiều dòng vật phẩm dùng chung (thư quà tặng + sửa thưởng nhiệm vụ) ----
  function wireItemRowPicker(containerSel, addBtnSel, tplSel){
	  function addRow(){
		  var row=$($(tplSel).html());
		  $(containerSel).append(row);
		  return row;
	  }
	  $(addBtnSel).click(function(){ addRow(); });
	  $(containerSel).on('click','.mail-item-remove',function(){
		  $(this).closest('.mail-item-row').remove();
		  if($(containerSel+' .mail-item-row').length==0){ addRow(); }
	  });
	  var timer=null;
	  $(containerSel).on('input focus','.mail-item-search',function(){
		  var input=$(this);
		  var row=input.closest('.mail-item-row');
		  var keyword=$.trim(input.val());
		  clearTimeout(timer);
		  timer=setTimeout(function(){
			  $.ajax({
				  url:'itemquery.php',
				  type:'post',
				  'data':{keyword:keyword},
		          'cache':false,
		          'dataType':'json',
				  success:function(data){
					  var rows='';
					  var list=(data||[]).filter(function(it){ return it.key!=0; });
					  if(list.length==0){
						  rows='<div class="picker-row" style="cursor:default;color:#8a8f98">Không tìm thấy vật phẩm.</div>';
					  }else{
						  list=list.slice(0,50);
						  for(var i=0;i<list.length;i++){
							  var it=list[i];
							  rows+='<div class="picker-row" data-id="'+escHtml(it.key)+'" data-name="'+escHtml(it.val)+'" data-icon="'+escHtml(it.icon)+'">'
								  +iconOrPlaceholder(it.icon,'')
								  +'<div><div style="font-size:12.5px">'+escHtml(it.val)+'</div><div style="font-size:11px;color:#8a8f98">ID: '+escHtml(it.key)+'</div></div>'
								  +'</div>';
						  }
					  }
					  row.find('.mail-item-results').html(rows).addClass('show');
				  },
				  error:function(){
					  row.find('.mail-item-results').html('<div class="picker-row" style="cursor:default;color:#e5484d">Tìm vật phẩm thất bại.</div>').addClass('show');
				  }
			  });
		  },250);
	  });
	  $(containerSel).on('click','.mail-item-results .picker-row[data-id]',function(){
		  var row=$(this).closest('.mail-item-row');
		  var id=$(this).data('id');
		  var name=$(this).data('name');
		  var icon=$(this).data('icon');
		  row.find('.mail-item-id').val(id);
		  var box=row.find('.mail-item-selected');
		  box.find('img,.noicon').remove();
		  box.prepend(iconOrPlaceholder(icon,''));
		  box.find('.name').text(name);
		  box.find('.sub').text('ID: '+id);
		  row.find('.mail-item-results').removeClass('show').html('');
		  row.find('.mail-item-search').val(name);
	  });
	  return addRow;
  }
  $(document).on('click',function(e){
	  if(!$(e.target).closest('.mail-item-search,.mail-item-results').length){
		  $('.mail-item-results').removeClass('show');
	  }
  });
  var addMailItemRow=wireItemRowPicker('#mailitemrows','#mailadditembtn','#mailitemrowtpl');
  var addTaskAwardRow=wireItemRowPicker('#taskeditawardrows','#taskadditembtn','#mailitemrowtpl');

  function escHtml(s){
	  return String(s==null?'':s).replace(/[&<>"']/g,function(c){
		  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
	  });
  }
  function iconOrPlaceholder(iconUrl, cssClass){
	  if(iconUrl){
		  return '<img src="'+escHtml(iconUrl)+'" class="'+cssClass+'">';
	  }
	  return '<div class="noicon">?</div>';
  }

  $(document).on('click',function(e){
	  if(!$(e.target).closest('#giftaccsearch,#giftaccresults').length){
		  $('#giftaccresults').removeClass('show');
	  }
  });

  // ---- Account picker (cho tab Gửi quà) ----
  var giftAccTimer=null;
  $('#giftaccsearch').on('input focus',function(){
	  var keyword=$.trim($(this).val());
	  clearTimeout(giftAccTimer);
	  giftAccTimer=setTimeout(function(){
		  $.ajax({
			  url:'gmquery.php',
			  type:'post',
			  'data':{type:'playerlist',uid:'-',qu:qu,keyword:keyword,page:1},
	          'cache':false,
	          'dataType':'json',
			  success:function(data){
				  var rows='';
				  if(data.errcode!=0 || !data.list || data.list.length==0){
					  rows='<div class="picker-row" style="cursor:default;color:#8a8f98">Không tìm thấy tài khoản.</div>';
				  }else{
					  for(var i=0;i<data.list.length;i++){
						  var p=data.list[i];
						  rows+='<div class="picker-row" data-account="'+escHtml(p.accountname)+'" data-actorname="'+escHtml(p.actorname)+'" data-level="'+escHtml(p.level)+'" data-vip="'+escHtml(p.vip_level)+'">'
							  +'<div class="noicon" style="width:32px;height:32px;font-size:9px">ACC</div>'
							  +'<div><div style="font-size:12.5px">'+escHtml(p.accountname)+'</div><div style="font-size:11px;color:#8a8f98">'+escHtml(p.actorname)+' - Cấp '+escHtml(p.level)+' - VIP '+escHtml(p.vip_level)+'</div></div>'
							  +'</div>';
					  }
				  }
				  $('#giftaccresults').html(rows).addClass('show');
			  },
			  error:function(){
				  $('#giftaccresults').html('<div class="picker-row" style="cursor:default;color:#e5484d">Tìm tài khoản thất bại.</div>').addClass('show');
			  }
		  });
	  },250);
  });
  $('#giftaccresults').on('click','.picker-row[data-account]',function(){
	  var account=$(this).data('account');
	  var actorname=$(this).data('actorname');
	  var level=$(this).data('level');
	  var vip=$(this).data('vip');
	  $('#chargeuid').val(account);
	  $('#giftaccselected').show();
	  $('#giftaccselname').text(account);
	  $('#giftaccselsub').text(actorname+' - Cấp '+level+' - VIP '+vip);
	  $('#giftaccresults').removeClass('show').html('');
	  $('#giftaccsearch').val(account);
  });

  // ---- Danh sách người chơi ----
  var plistPage=1;
  var plistPageSize=20;
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
					  +'<a href="#" class="plist-select" style="color:#1a9e5c;margin-right:10px">Chọn</a>'
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
  $('#plistbody').on('click','.plist-select',function(e){
	  e.preventDefault();
	  var tr=$(this).closest('tr');
	  var account=tr.data('account');
	  uid=String(account);
	  $('#uid').val(uid);
	  $('#plistmsg').text('Đã chọn tài khoản "'+uid+'" cho các thao tác ở khối "Khu & tài khoản".');
  });
  $('#plistbody').on('click','.plist-gift',function(e){
	  e.preventDefault();
	  var tr=$(this).closest('tr');
	  var account=String(tr.data('account'));
	  var actorname=tr.find('td').eq(1).text();
	  var level=tr.find('td').eq(2).text();
	  var vip=tr.find('td').eq(3).text();
	  $('#chargeuid').val(account);
	  $('#giftaccselected').show();
	  $('#giftaccselname').text(account);
	  $('#giftaccselsub').text(actorname+' - Cấp '+level+' - VIP '+vip);
	  $('#giftaccsearch').val(account);
	  $('.tab-btn[data-tab=tab-gift]').click();
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

  // ---- PayPal config ----
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

  // ---- Nhiệm vụ (view + edit) ----
  var taskDefs=[];
  var taskCurrentDef=null;
  var taskPage=1;
  var taskPageSize=30;
  var taskEditingRow=null;
  var taskEditableFields=[];

  var FIELD_LABELS={
	  target:'Mục tiêu (target)', param:'Tham số (param)', trainExp:'Kinh nghiệm rèn luyện (trainExp)',
	  score:'Điểm thành tựu (score)', valueLimit:'Ngưỡng độ hoạt náo (valueLimit)',
	  mail_head:'Tiêu đề thư hết hạn', mail_context:'Nội dung thư hết hạn'
  };

  function loadTaskDefs(){
	  $.ajax({
		  url:'gmquery.php', type:'post', data:{type:'taskdefs',uid:'-',qu:qu}, cache:false, dataType:'json',
		  success:function(data){
			  if(data.errcode!=0){ return; }
			  taskDefs=data.list;
			  var opts='';
			  for(var i=0;i<taskDefs.length;i++){
				  opts+='<option value="'+taskDefs[i].key+'">'+escHtml(taskDefs[i].label)+'</option>';
			  }
			  $('#taskdefselect').html(opts);
			  loadTaskList(1);
		  }
	  });
  }

  function awardSummary(list){
	  if(!list || list.length==0){ return '(không có)'; }
	  var parts=[];
	  for(var i=0;i<list.length;i++){
		  var it=list[i];
		  if(it.type==0){
			  parts.push((it.id==1?'Đồng':(it.id==2?'Nguyên Bảo':'Tiền(id='+it.id+')'))+' ×'+it.count);
		  }else{
			  parts.push('VP#'+it.id+' ×'+it.count);
		  }
	  }
	  return parts.join(', ');
  }

  function conditionSummary(row){
	  var parts=[];
	  if(row.target!==undefined){ parts.push('target='+row.target); }
	  if(row.param!==undefined){ parts.push('param='+row.param); }
	  if(row.type!==undefined){ parts.push('type='+row.type); }
	  if(row.time!==undefined){ parts.push('time='+row.time+'s'); }
	  if(row.valueLimit!==undefined){ parts.push('valueLimit='+row.valueLimit); }
	  return parts.join(', ');
  }

  function loadTaskList(page){
	  taskPage=page;
	  var keyword=$.trim($('#tasksearch').val());
	  $('#taskmsg').text('Đang tải...');
	  $.ajax({
		  url:'gmquery.php', type:'post',
		  data:{type:'tasklist',uid:'-',qu:qu,taskdef:$('#taskdefselect').val(),keyword:keyword,page:taskPage},
		  cache:false, dataType:'json',
		  success:function(data){
			  if(data.errcode!=0){ $('#taskmsg').text(data.info); $('#taskbody').html(''); return; }
			  taskPageSize=data.pageSize;
			  taskEditableFields=data.editable;
			  var rows='';
			  if(data.list.length==0){
				  rows='<tr><td colspan="6" style="padding:10px 8px;color:#8a8f98">Không có dữ liệu.</td></tr>';
			  }
			  for(var i=0;i<data.list.length;i++){
				  var r=data.list[i];
				  rows+='<tr style="border-bottom:1px solid #f0f2f5">'
					  +'<td style="padding:6px 8px">'+r.blockKey+'</td>'
					  +'<td style="padding:6px 8px">'+escHtml(r.name||'')+'</td>'
					  +'<td style="padding:6px 8px;max-width:220px">'+escHtml(r.desc||'')+'</td>'
					  +'<td style="padding:6px 8px">'+escHtml(conditionSummary(r))+'</td>'
					  +'<td style="padding:6px 8px">'+escHtml(awardSummary(r.awardList))+'</td>'
					  +'<td style="padding:6px 8px"><a href="#" class="task-edit-btn" style="color:#2f6fed">Sửa</a></td>'
					  +'</tr>';
			  }
			  $('#taskbody').html(rows);
			  $('#taskbody tr').each(function(idx){
				  if(data.list[idx]){ $(this).data('rowobj', data.list[idx]); }
			  });
			  var totalPages=Math.max(1,Math.ceil(data.total/taskPageSize));
			  $('#taskpageinfo').text('Trang '+data.page+'/'+totalPages+' ('+data.total+' nhiệm vụ)');
			  $('#taskmsg').text('');
		  },
		  error:function(){ $('#taskmsg').text('Tải danh sách thất bại.'); }
	  });
  }

  $('#taskdefselect').change(function(){ loadTaskList(1); });
  $('#tasksearchbtn').click(function(){ loadTaskList(1); });
  $('#tasksearch').on('keypress',function(e){ if(e.which==13){ loadTaskList(1); } });
  $('#taskprevbtn').click(function(){ if(taskPage>1){ loadTaskList(taskPage-1); } });
  $('#tasknextbtn').click(function(){ loadTaskList(taskPage+1); });

  $('#taskbody').on('click','.task-edit-btn',function(e){
	  e.preventDefault();
	  var row=$(this).closest('tr').data('rowobj');
	  openTaskEdit(row);
  });

  function openTaskEdit(row){
	  taskEditingRow=row;
	  $('#taskeditid').text(row.blockKey);
	  $('#taskeditname').text(row.name||'');
	  var editable=taskEditableFields||[];
	  var fieldsHtml='';
	  for(var i=0;i<editable.length;i++){
		  var f=editable[i];
		  if(f=='awardList'){ continue; }
		  var val=(row[f]!=null)?row[f]:(f.indexOf('mail_')==0?'':0);
		  if(f=='mail_head' || f=='mail_context'){
			  fieldsHtml+='<div class="field"><label>'+(FIELD_LABELS[f]||f)+':</label><input type="text" class="taskfield" data-field="'+f+'" value="'+escHtml(val)+'" style="max-width:520px"></div>';
		  }else{
			  fieldsHtml+='<div class="field"><label>'+(FIELD_LABELS[f]||f)+':</label><input type="text" class="taskfield" data-field="'+f+'" value="'+escHtml(val)+'"></div>';
		  }
	  }
	  $('#taskeditfields').html(fieldsHtml);

	  if(editable.indexOf('awardList')>=0){
		  $('#taskeditawardsection').show();
		  $('#taskeditawardrows').html('');
		  $('#taskeditfields').append('<div class="field"><label>Đồng (Gold):</label><input type="text" id="taskawardgold"></div>'
			  +'<div class="field"><label>Nguyên Bảo (Yuanbao):</label><input type="text" id="taskawardyuanbao"></div>');
		  var gold=0, yb=0, itemAwards=[];
		  var list=row.awardList||[];
		  for(var i=0;i<list.length;i++){
			  var it=list[i];
			  if(it.type==0 && it.id==1){ gold=it.count; }
			  else if(it.type==0 && it.id==2){ yb=it.count; }
			  else if(it.type==0){ console.warn('Loại tiền tệ id không xác định, không hiển thị được trong form (giữ nguyên nếu không sửa phần thưởng):', it); }
			  else { itemAwards.push(it); }
		  }
		  $('#taskawardgold').val(gold||'');
		  $('#taskawardyuanbao').val(yb||'');
		  if(itemAwards.length==0){
			  addTaskAwardRow();
		  }else{
			  for(var i=0;i<itemAwards.length;i++){
				  var newRow=addTaskAwardRow();
				  (function(newRow, it){
					  newRow.find('.mail-item-id').val(it.id);
					  newRow.find('.mail-item-search').val('ID '+it.id+' (đang tải tên...)');
					  newRow.find('.mail-item-num').val(it.count);
					  $.ajax({
						  url:'itemquery.php', type:'post', data:{keyword:it.id}, cache:false, dataType:'json',
						  success:function(data){
							  var match=null;
							  for(var k=0;k<data.length;k++){ if(String(data[k].key)==String(it.id)){ match=data[k]; break; } }
							  if(match){
								  var box=newRow.find('.mail-item-selected');
								  box.find('img,.noicon').remove();
								  box.prepend(iconOrPlaceholder(match.icon,''));
								  box.find('.name').text(match.val);
								  box.find('.sub').text('ID: '+match.key);
								  newRow.find('.mail-item-search').val(match.val);
							  }
						  }
					  });
				  })(newRow, it);
			  }
		  }
	  }else{
		  $('#taskeditawardsection').hide();
	  }

	  $('#taskeditmsg').text('');
	  $('#taskeditcard').show();
	  $('html, body').animate({scrollTop: $('#taskeditcard').offset().top - 20}, 200);
  }

  $('#taskcancelbtn').click(function(){ $('#taskeditcard').hide(); });

  $('#tasksavebtn').click(function(){
	  if(!taskEditingRow){ return; }
	  var updates={};
	  $('#taskeditfields .taskfield').each(function(){
		  updates[$(this).data('field')]=$(this).val();
	  });
	  if(taskEditableFields.indexOf('awardList')>=0){
		  var items=[];
		  var gold=$.trim($('#taskawardgold').val());
		  if(gold!==''){
			  if(isNaN(gold)||gold<0){ alert('Số Đồng không hợp lệ.'); return; }
			  if(gold>0){ items.push({type:0,id:1,count:parseInt(gold,10)}); }
		  }
		  var yb=$.trim($('#taskawardyuanbao').val());
		  if(yb!==''){
			  if(isNaN(yb)||yb<0){ alert('Số Nguyên Bảo không hợp lệ.'); return; }
			  if(yb>0){ items.push({type:0,id:2,count:parseInt(yb,10)}); }
		  }
		  var rowsOk=true;
		  $('#taskeditawardrows .mail-item-row').each(function(){
			  var r=$(this);
			  var itemid=r.find('.mail-item-id').val();
			  var num=$.trim(r.find('.mail-item-num').val());
			  if(itemid=='' || itemid=='0'){
				  if(num!==''){ alert('Có dòng thưởng chưa chọn vật phẩm.'); rowsOk=false; }
				  return;
			  }
			  if(num=='' || isNaN(num) || num<1){ alert('Số lượng 1 dòng thưởng không hợp lệ.'); rowsOk=false; return; }
			  items.push({type:1,id:parseInt(itemid,10),count:parseInt(num,10)});
		  });
		  if(!rowsOk){ return; }
		  if(items.length==0){ alert('Phần thưởng phải có ít nhất 1 dòng.'); return; }
		  updates.awardList=items;
	  }
	  if(!confirm('Xác nhận lưu thay đổi xuống file .config trên CẢ s1 và s99? (Đã tự động backup file cũ, nhưng CHƯA áp dụng cho tới khi restart gameworld)')){ return; }
	  $.ajax({
		  url:'gmquery.php', type:'post',
		  data:{type:'tasksave',uid:'-',qu:qu,taskdef:$('#taskdefselect').val(),blockkey:taskEditingRow.blockKey,updates:JSON.stringify(updates)},
		  cache:false, dataType:'json',
		  success:function(data){
			  $('#taskeditmsg').text(data.info);
			  if(data.errcode==0){
				  alert(data.info);
				  $('#taskeditcard').hide();
				  loadTaskList(taskPage);
			  }
		  },
		  error:function(){ $('#taskeditmsg').text('Lưu thất bại.'); }
	  });
  });

  loadPlayerList(1);
  addMailItemRow();
  loadTaskDefs();
</script>
</body>
</html>
