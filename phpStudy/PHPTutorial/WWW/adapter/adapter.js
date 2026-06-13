var adapter;
(function (adapter) {
    var platform = (function () {
        function platform() {
        }
        platform.adapter_init = function (channelid, agentid, cdn_url,uid) {
            this.channelid = channelid;
            this.agentid = agentid;
			this.cdn_url = cdn_url;
            this.uid = uid;
            this.platform_func_str = "platform_" + channelid;
            if (this.platform_func_str) {
                //platform.loadScript(cdn_url+"adapter/"+channelid+"/platform.js", platform.OnLoadScript, this);
            }
            this.is_init = true;
           
            console.log("[adapter] init channelid = " + this.channelid + " agentid = " + this.agentid);
        };
        platform.OnLoadScript = function () {
            platform.platform_handle = adapter[platform.platform_func_str];
            if (platform.platform_handle) {
                platform.platform_handle["init_platform"].call(platform.platform_handle);
                console.log("[adapter] Script fit success");
            }
        };
        platform.PostMessage = function (data_str) {
            if (platform.platform_handle) {
                var data = JSON.parse(data_str);
                //是否需要判断fun类型 避免出现调用其他函数 有问题到菜鸟阁提问 cainiaoge.com
                if (data.fun) {
                    var fun = platform.platform_handle[data.fun];
                    if (fun) {
                        fun.call(platform.platform_handle, data.arg);
                    }
                }
            }
        };
        platform.loadScript = function (script_url, callback, thisobj) {
            console.log("loadScript " + script_url);
            var s = document.createElement('script');
            s.async = false;
            s.src = script_url;
            var that = this;
            s.addEventListener('load', function () {
                s.parentNode.removeChild(s);
                // s.removeEventListener('load',arguments.callee ,false);
                callback.call(thisobj);
            }, false);
            document.body.appendChild(s);
        };
        platform.CALL_LOGIN = "call_login"; //登陆
        platform.CALL_LOGOUT = "call_logout"; //登出
        platform.CALL_PAY = "call_pay"; //支付
        platform.CALL_REPORT_ENTER_ZONE = "call_report_enter_zone"; //选服上报
        platform.CALL_REPORT_CREATE_ROLE = "call_report_create_role"; //创角上报
        platform.CALL_REPORT_LOGIN_ROLE = "call_report_login_role"; //进入游戏上报
        platform.CALL_REPORT_LOGOUT_ROLE = "call_report_logout_role"; //登出游戏上报
        platform.CALL_REPORT_LEVEL_UP = "call_report_level_up"; //升级上报
        platform.channelid = "";
        platform.agentid = "";
        platform.is_init = false;
		platform.cdn_url = "";
        platform.uid = "";
        return platform;
    })();
    adapter.platform = platform;
})(adapter || (adapter = {}));
