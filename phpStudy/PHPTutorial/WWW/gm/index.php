<?php
error_reporting(0);
header("Content-type: text/html; charset=utf-8"); 
?>
<html>
<head>
<title>醉武侠H5</title>
<style>
  *{padding:0;margin:0}
  body{padding-left:20px;padding-top:20px}
  span{height;24px;line-height:24px;font-size:12px;min-width:100px;display:inline-block;text-align:justify;text-align-last:justify;margin-bottom:12px}
  select,input,button{height:24px;line-height:24px;font-size:12px;width:150px;display:inline-block}
  #maildesc{text-align:none;color:#ff0000;}
</style>
</head>
<body>
<div>
  <!--[if IE]>
  <div><font color='red'>本工具不支持IE,请更换其他浏览器</font></div>
  <![endif]-->
  <div><span>选区: </span><select id='qu'><option value='1'>1区</option><!--<option value='2'>2区</option><option value='3'>3区</option>--></select></div>
  <div><span>游戏账号: </span><input type='text' value='abc_' id='uid' placeholder='请输入游戏账号'></div>
  <div><span>充值: </span><input type="text" class="form-control" value='充值' id="chargenum" ><input type='button' value='充值' id='chargebtn'></div> 
  <hr/><br>
  <div><span>温馨提示: </span><span id='maildesc'>充值2800激活元宝月卡 8800激活特权月卡</span></div>
  <div><span>物品搜索: </span><input type='text' value='' id='searchipt' placeholder='物品搜索'></div>
  <div><span>物品选择: </span><select id='mailid'><option value='0' data-desc='请选择'>请选择</option>
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
  </select></div>
  <div><span>物品描述: </span><span id='maildesc'>请选择</span></div>
  <div><span>物品数量: </span><input type='text' value='' id='mailnum' placeholder='请输入发放数量'></div>
  <div><input type='button' value='发送邮件' id='mailbtn'></div>
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
  $('#chargebtn').click(function(){
	  if(uid==''){
		  alert('角色名不能为空。');
		  return false;
	  }
	  var chargenum=$('#chargenum').val();
	  $.ajax({
		  url:'playerquery.php',
		  type:'post',
		  'data':{type:'charge',uid:uid,num:chargenum,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('操作失败');
		  }
	  });
  });
  $('#mailbtn').click(function(){
	  if(uid==''){
		  alert('角色名不能为空。');
		  return false;
	  }
	  var itemid=$('#mailid').val();
	  if(itemid=='' || itemid=='0'){
		  alert('请选择物品。');
		  return false;
	  }
	  var mailnum=$('#mailnum').val();
	  if(mailnum=='' || isNaN(mailnum)){
		  alert('数量不能为空。');
		  return false;
	  }
	  if(mailnum<1 || mailnum>999999){
		  alert('数量范围:1-999999。');
		  return false;
	  }
	  $.ajax({
		  url:'playerquery.php',
		  type:'post',
		  'data':{type:'mail',uid:uid,item:itemid,num:mailnum,qu:qu},
          'cache':false,
          'dataType':'json',
		  success:function(data){
			  console.log('data',data);
			  alert(data.info);
		  },
		  error:function(){
			  alert('操作失败');
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
				  $('#mailid').html('<option value="0" data-desc="未找到">未找到</option>');
			  }
			  $('#maildesc').html('请选择');
		  },
		  error:function(){
			  alert('操作失败');
		  }
	  });
  });
  $('#mailid').live('change',function(){
	  console.log('test');
	  var desc=$('#mailid option:selected').data('desc');
	  $('#maildesc').html(desc);
  });
</script>
</body>
</html>