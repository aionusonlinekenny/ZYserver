<?php
	$cdn = "http://71.31.97.241";  //Cấu hình địa chỉ tài nguyên
	$key = "4QrcOUm6WauVuBX8gPg";
	$account = $_REQUEST['uid'];
	$sign = $_REQUEST['sign'];
	if($account== ""){
	   header("location:".$cdn."/reg/");
	}
	if(md5($account.$key) != $sign){
	   exit("sign error");
	}
	$serverList = array();
	//1服
	$data = array(
			'id' 		=> 1,
			'name' 		=> "Túy Võ Hiệp - Server 1",
			'state'		=> 1,
			'mergeId'   => 1,
			'openTime'  => time(),
			'shutTime'  => time(),
			'ip'        => "71.31.97.241",
			'port'      => "9001",
	);
	$serverList[] = $data;	
	$data = array(
		'title' => "JYX2",
		'config' => array(
			'entryType' => "js",
			'agentId' => "abc",
			'clientIp' => "127.0.0.1",
            'adapterVer' => "412e1c48", 
			'adapterUrl' => $cdn, 
			'directUrl' =>  $cdn, 
			'gmReportUrl' =>  "", 
			'logReportUrl' => "", 
			'giftFetchUrl' => "", 
			'regForbitUrl'=> "", 
			'switch' => array(
				'useVersionList' => true, 
				'verifySize' => true
			)
		),
		'params' =>array(
			'plat' => "abc", 
			'agentid' => "abc", 
			'deviceid' =>  "", 
			'version' =>  "", 
			'devel'=> "", 
			'device' => "", 
			'account' => "{$account}", 
			'uid' => "{$account}", 
			'username' => "{$account}", 
			'time' => 1547000349, 
			'fromUid' => null, 
			'key' => "aeab97f1d688f7cfa7d5ecab6280d8bc"
			
		),
		'server' =>array(
			'recommend' => 1,
			'serverTime' => 1546952719,
			'serverList' => $serverList
		),
		'version' => "2555a478"
	);
	//exit(var_dump($data));
	$args = base64_encode(json_encode($data));
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>Túy Võ Hiệp H5</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="true" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="360-fullscreen" content="true" />
    <style>
        html, body {
            -ms-touch-action: none;
            background: #000000;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>
</head>
<body>
    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="auto"
         data-scale-mode="showAll"
         data-frame-rate="30"
         data-content-width="640"
         data-content-height="1136"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="true"
         data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
    </div>

<script>
    var ARGS = "<?php echo $args?>";
    var urlParam = {};
    var paraUrl = location.href;
    if(paraUrl){
         paramInit(paraUrl);
    }
    function paramInit(str) {
        var whIndex = str.indexOf("?");
        if (whIndex != -1) {
            var param = str.slice(whIndex + 1).split("&");
            var strArr;
            for (var i = 0; i < param.length; i++) {
                strArr = param[i].split("=");
                urlParam[strArr[0]] = strArr[1];
            }
        }
    }

    function showLoadProgress() {
    }

    function showGame() {
    }

    function stop() {
        return false;
    }
    function sdkInit(appid) {
    }

    function showRecharge(payItems) {
    }
    function showQrCode(use) {
    }

    function connectError() {
    }

    function closeSocket() {
        Main.closesocket();
    }

    function checkAWY() {

    }
    function reportSDK(str) {

    }
    function showQRCode() {

    }
    function isFocus() {

    }
    function isShare() {

    }
    function roleUp() {

    }
    function enterGame() {

    }
    function createRole() {

    }
    function getVipInfo() {

    }
    function isShowGameDesktop(){
    }
    function saveGameDesktop(){
    }
    function getLoadGame(callback){
        if(callback) callback(0);
    }


    var loadScript = function (list, callback) {
        var loaded = 0;
        var loadNext = function () {
            loadSingleScript(list[loaded], function () {
                loaded++;
                if (loaded >= list.length) {
                    callback();
                }
                else {
                    loadNext();
                }
            })
        };
        loadNext();
    };

    var loadSingleScript = function (src, callback) {
        var s = document.createElement('script');
        s.async = false;
        s.crossorigin = "anonymous"
        s.src = "./" + src;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', arguments.callee, false);
            callback();
        }, false);
        document.body.appendChild(s);
    };

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./manifest.json?v=9cb9125f", true);
    xhr.addEventListener("load", function () {
        var manifest = JSON.parse(xhr.response);
        var list = manifest.initial.concat(manifest.game);
        loadScript(list, function () {
            egret.runEgret({ renderMode: "webgl", audioType: 0, calculateCanvasScaleFactor:function(context) {
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
            }});
        });
    });
    xhr.send(null);
</script>
</body></html>
