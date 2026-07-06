<?php
header("Content-type: text/html; charset=utf-8");
require 'auth.php';
gm_require_login_or_json();

$items = json_decode(file_get_contents('items_vi.json'), true);
if(!$items){ $items = array(); }

$key = $_POST ? trim($_POST['keyword']) : '';
$return = array(array('key'=>0,'val'=>'Vui lòng chọn','icon'=>''));
foreach($items as $it){
	if($key!=='' && stripos($it['id'].' '.$it['name'], $key) === false){
		continue;
	}
	$return[] = array(
		'key'=>$it['id'],
		'val'=>$it['name'],
		'icon'=>$it['icon']!=='' ? '../resource/icons/item/'.$it['icon'].'.png' : '',
	);
}
echo json_encode($return);
