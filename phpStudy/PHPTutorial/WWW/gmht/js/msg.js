
  $('#chargebtn').click(function(){

	  var chargenum=$('#chargenum').val();
	  if(chargenum=='' || isNaN(chargenum)){
		  alert('数量不能为空。');
		  return false;
	  }
	  //if(chargenum<1 || chargenum>99999){
		//  alert('数量范围:1-99999。');
		//  return false;
	  //}

 
	  $.ajax({
		  url:'user/playerquery.php',
		  type:'post',
		  'data':{type:'charge',num:chargenum},
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
	  var itemid=$('#mailid').val();
/*	  if(itemid=='' || itemid=='0'){
		  alert('请选择物品。');
		  return false;
	  }*/
	  var mailnum=$('#mailnum').val();
	  if(mailnum=='' || isNaN(mailnum)){
		  alert('数量不能为空。');
		  return false;
	  }
	  //if(mailnum<1 || mailnum>999999){
	//	  alert('数量范围:1-999999。');
	//	  return false;
	 // }
	  $.ajax({
		  url:'user/playerquery.php',
		  type:'post',
		  'data':{type:'mail',item:itemid,num:mailnum},
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
		  url:'user/itemquery.php',
		  type:'post',
		  'data':{keyword:keyword,typea:'item_wj'},
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
  $('#mailid').live('change',function(){//手 游 源 码 网   w w w . s y y m w .c o m
	  console.log('test');
	  var desc=$('#mailid option:selected').data('desc');
	  $('#maildesc').html(desc);
  });