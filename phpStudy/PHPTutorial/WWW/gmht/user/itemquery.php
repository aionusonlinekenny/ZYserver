<?php
if($_POST){
	$key=trim($_POST['keyword']);
	$typeb=trim($_POST['typea']);
	$return=array(array('key'=>0,'val'=>'请选择'));
//    $file = fopen("item.txt", "r");
    $file = fopen($typeb.".txt", "r");
	if($key==''){
		while(!feof($file))
		{
			$line=fgets($file);
			$txts=explode(';',$line);
			if(count($txts)==2){
				$tmp=array(
					'key'=>$txts[0],
					'val'=>$txts[1]
				);
				array_push($return,$tmp);
			}
		}
	}else{
		while(!feof($file))
		{
			$line=fgets($file);
			$pos=strpos($line,$key);
			if($pos){
				$txts=explode(';',$line);
				if(count($txts)==2){
					$tmp=array(
						'key'=>$txts[0],
						'val'=>$txts[1]
					);
					array_push($return,$tmp);
				}
			}
		}		
	}
    fclose($file);
	echo(json_encode($return));
}else{
	$return=array(array('key'=>0,'val'=>'请选择'));
	echo(json_encode($return));
}
























































































/*
下方彩蛋惊喜留给有缘人
\u60ca\u559c\u4e0d\u3001\u610f\u5916\u4e0d\u0020\u5f88\u65e0\u8bed\u0020\u5bf9\u5427\u0020\u66f4\u591a\u8d44\u6e90\u4e0b\u8f7d\u0020\u4e5d\u96f6\u4e00\u8d77\u73a9\u0020\u0077\u0077\u0077\u002e\u0039\u0030\u0031\u0037\u0035\u002e\u0063\u006f\u006d


*/