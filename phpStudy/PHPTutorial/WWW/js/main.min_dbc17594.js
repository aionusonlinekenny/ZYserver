function post(t,e,i){var s=i.value,n=t.constructor.name+MessageCenter.splite+e,o=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var i=s.call.apply(s,[this].concat(t));return("boolean"!=typeof i||i)&&MessageCenter.ins().dispatch(n,i),i};return o.funcallname=n,i.value=o,i}function callLater(t,e,i){var s=i.value,n="$"+e+"CL",o=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];delete this[n],s.call.apply(s,[this].concat(t))},a=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this[n]||(egret.callLater.apply(egret,[o,this].concat(t)),this[n]=!0)};return i.value=a,i}function callDelay(t){var e=function(e,i,s){var n=s.value,o="$isDelay"+i,a=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this[o]=!1,n.call.apply(n,[this].concat(t))},r=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];this[o]||(this[o]=!0,egret.setTimeout.apply(egret,[a,this,t].concat(e)))};return s.value=r,s};return e}function gm(t){var e=GameLogicManage.ins().getBytes(0);e.writeString(t),GameLogicManage.ins().sendToServer(e)}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))(function(n,o){function a(t){try{h(s.next(t))}catch(e){o(e)}}function r(t){try{h(s["throw"](t))}catch(e){o(e)}}function h(t){t.done?n(t.value):new i(function(e){e(t.value)}).then(a,r)}h((s=s.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return s([t,e])}}function s(i){if(n)throw new TypeError("Generator is already executing.");for(;h;)try{if(n=1,o&&(a=o[2&i[0]?"return":i[0]?"throw":"next"])&&!(a=a.call(o,i[1])).done)return a;switch(o=0,a&&(i=[0,a.value]),i[0]){case 0:case 1:a=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,o=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(a=h.trys,!(a=a.length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){h.label=i[1];break}if(6===i[0]&&h.label<a[1]){h.label=a[1],a=i;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(i);break}a[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(s){i=[6,s],o=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var n,o,a,r,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return r={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r},__decorate=this&&this.__decorate||function(t,e,i,s){var n,o=arguments.length,a=3>o?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(3>o?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a},ClassBase=function(){function t(){}return t.ins=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var i=this;if(window[this.prototype.__class__]=this,!i._instance){var s=t.length;0==s?i._instance=new i:1==s?i._instance=new i(t[0]):2==s?i._instance=new i(t[0],t[1]):3==s?i._instance=new i(t[0],t[1],t[2]):4==s?i._instance=new i(t[0],t[1],t[2],t[3]):5==s&&(i._instance=new i(t[0],t[1],t[2],t[3],t[4]))}return i._instance},t}();__reflect(ClassBase.prototype,"ClassBase");var BaseComponent=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.observe=function(t,e,i){void 0===i&&(i=void 0),MessageCenter.addListener(t,e,this,i)},e.prototype.removeObserve=function(){MessageCenter.ins().removeAll(this)},e.prototype.addTouchEvent=function(t,e){this.addEvent(egret.TouchEvent.TOUCH_TAP,t,e)},e.prototype.addTouchEndEvent=function(t,e){this.addEvent(egret.TouchEvent.TOUCH_END,t,e)},e.prototype.addChangeEvent=function(t,e){var i=this;t&&t instanceof eui.TabBar?this.addEvent(egret.TouchEvent.CHANGE,t,function(){for(var t=[],s=0;s<arguments.length;s++)t[s]=arguments[s];SoundUtil.ins().playEffectMC(SoundUtil.WINDOW),e.call.apply(e,[i].concat(t))}):this.addEvent(egret.TouchEvent.CHANGE,t,e)},e.prototype.addChangingEvent=function(t,e){this.addEvent(egret.TouchEvent.CHANGING,t,e)},e.prototype.addEvent=function(t,e,i){return e?void e.addEventListener(t,i,this):void console.error("ä¸å­˜åœ¨ç»‘å®šå¯¹è±¡")},e.prototype.removeEvent=function(t,e,i){return e?void e.removeEventListener(t,i,this):void console.error("ä¸å­˜åœ¨ç»‘å®šå¯¹è±¡")},e.prototype.removeTouchEvent=function(t,e){t&&t.removeEventListener(egret.TouchEvent.TOUCH_TAP,e,this)},e.prototype.$onClose=function(){var t=function(e){for(var i=0;i<e.numChildren;i++){var s=e.getChildAt(i);s instanceof BaseView?s.$onClose():s instanceof egret.DisplayObjectContainer&&t(s)}};t(this),this.removeObserve()},e.prototype.invalidateState=function(){t.prototype.invalidateState.call(this),TimerMgr.ins().doTimer(80,1,this.delayReloadPic,this)},e.prototype.delayReloadPic=function(){ResourceMgr.ins().reloadContainer(this)},e}(eui.Component);__reflect(BaseComponent.prototype,"BaseComponent"),window.BaseComponent=BaseComponent;var ItemRenderBase=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.dataChanged=function(){TimerMgr.ins().doTimer(50,1,this.delayChangedData,this)},e.prototype.delayChangedData=function(){},e}(eui.ItemRenderer);__reflect(ItemRenderBase.prototype,"ItemRenderBase");var MessageCenter=function(t){function e(e){var i=t.call(this)||this;return i.flag=0,i.type=e,i.dict={},i.eVec=[],0==i.type&&egret.startTick(i.run,i),i}return __extends(e,t),e.ins=function(){return t.ins.call(this,0)},e.prototype.clear=function(){this.dict={},this.eVec.splice(0)},e.prototype.addListener=function(t,e,i){var s=this.dict[t];s?0!=this.flag&&(this.dict[t]=s=s.concat()):this.dict[t]=s=[];for(var n=0,o=s;n<o.length;n++){var a=o[n];if(a[0]==e&&a[1]==i)return}s.push([e,i])},e.prototype.removeListener=function(t,e,i){var s=this.dict[t];if(s){0!=this.flag&&(this.dict[t]=s=s.concat());for(var n=s.length,o=0;n>o;o++)if(s[o][0]==e&&s[o][1]==i){s.splice(o,1);break}0==s.length&&(this.dict[t]=null,delete this.dict[t])}},e.prototype.removeAll=function(t){for(var e=Object.keys(this.dict),i=0,s=e;i<s.length;i++){var n=s[i],o=this.dict[n];0!=this.flag&&(this.dict[n]=o=o.concat());for(var a=o.length,r=a-1;r>=0;r--)o[r][1]==t&&o.splice(r,1);0==o.length&&(this.dict[n]=null,delete this.dict[n])}},e.prototype.dispatch=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];var s=ObjPool.pop("MessageVo");s.type=t,s.param=e,0==this.type?this.eVec.push(s):1==this.type?this.dealMsg(s):ErrLog.trace("MessageCenteræœªå®žçŽ°çš„ç±»åž‹")},e.prototype.run=function(t){for(var e=egret.getTimer();this.eVec.length>0&&(this.dealMsg(this.eVec.shift()),!(egret.getTimer()-e>5)););return!1},e.prototype.dealMsg=function(t){var e=this.dict[t.type];if(e){var i=e.length;if(0!=i){this.flag++;for(var s=0,n=e;s<n.length;s++){var o=n[s];o[0].apply(o[1],t.param)}this.flag--,t.dispose(),ObjPool.push(t)}}},e.setFunction=function(t,i,s,n){if(0==s.indexOf(n)&&"function"==typeof i[s]){var o=egret.getQualifiedClassName(i)+e.splite+s+e.msgIndex;e.msgIndex+=1;var a=i[s],r=function(){for(var i=[],s=0;s<arguments.length;s++)i[s]=arguments[s];var n;i.length;return n=t?a.call.apply(a,[this].concat(i)):a.apply(void 0,i),("boolean"!=typeof n||n)&&e.ins().dispatch(o,n),n};return r.funcallname=o,i[s]=r,!0}return!1},e.compile=function(t,i){if(void 0===i&&(i="post"),window[t.prototype.__class__]){window[t.prototype.__class__]}var s=t.prototype;for(var n in s)e.setFunction(!0,s,n,i)},e.addListener=function(t,i,s,n){return void 0===n&&(n=void 0),t.funcallname?(e.ins().addListener(t.funcallname,i,s),n&&t.call(n),!0):(debug.log("MessageCenter.addListener error:"+egret.getQualifiedClassName(s)),!1)},e.splite=".",e.msgIndex=1,e}(ClassBase);__reflect(MessageCenter.prototype,"MessageCenter");var MessageVo=function(){function t(){}return t.prototype.dispose=function(){this.type=null,this.param=null},t}();__reflect(MessageVo.prototype,"MessageVo"),window.MessageVo=MessageVo;var CharEnum;!function(t){t[t.NORTH=0]="NORTH",t[t.NORTH_EAST=1]="NORTH_EAST",t[t.EAST=2]="EAST",t[t.SOUTH_EAST=3]="SOUTH_EAST",t[t.SOUTH=4]="SOUTH",t[t.SOUTH_WEST=5]="SOUTH_WEST",t[t.WEST=6]="WEST",t[t.NORTH_WEST=7]="NORTH_WEST"}(CharEnum||(CharEnum={}));var CharMcOrder;!function(t){t[t.BODY=1]="BODY",t[t.WEAPON=2]="WEAPON",t[t.WING=3]="WING",t[t.FOUR=4]="FOUR",t[t.MEDAL=5]="MEDAL",t[t.HEIR=6]="HEIR",t[t.SOUL=7]="SOUL",t[t.ZHANLING=8]="ZHANLING",t[t.SWORDSHADOW=9]="SWORDSHADOW",t[t.ZhanQi=10]="ZhanQi",t[t.ZhanQiB=11]="ZhanQiB",t[t.GuangHuan=12]="GuangHuan"}(CharMcOrder||(CharMcOrder={}));var EffectModel=function(){function t(){this.dir=4,this.team=Team.NotAtk}return t}();__reflect(EffectModel.prototype,"EffectModel"),window.EffectModel=EffectModel;var ModuleAction=function(){function t(){}return t.ATTACK="a",t.CAST="c",t.STAND="s",t.RUN="r",t.DIE="d",t.HIT="h",t.ATTACKEff="af",t.JUMP="j",t}();__reflect(ModuleAction.prototype,"ModuleAction");var ConfigExRing0=function(){function t(){this.power=0}return t}();__reflect(ConfigExRing0.prototype,"ConfigExRing0");var ConfigActivityType1=function(){function t(){}return t}();__reflect(ConfigActivityType1.prototype,"ConfigActivityType1");var ConfigActivityType9=function(){function t(){}return t}();__reflect(ConfigActivityType9.prototype,"ConfigActivityType9");var GuildWarMemberHeadItemRender=function(t){function e(){var e=t.call(this)||this;return e.skinName="SkinMemberHead",e.clickEffc=new McAnimation,e.clickEffc.x=55.5,e.clickEffc.y=37,e}return __extends(e,t),e.prototype.dataChanged=function(){if(this.haveGuildName(!1),isNaN(this.data))this.data instanceof SelectInfoData&&(this.currentState="panel",this.num.textFlow=(new egret.HtmlTextParser).parser(this.data.num+"pháº§n"),this.roleName.textFlow=(new egret.HtmlTextParser).parser(this.data.data.name),this.roleHead.source="yuanhead"+this.data.data.job+"0");else{this.currentState="war";var t=EntityMgr.ins().getEntityByMasterhHandle(this.data);if(t){var e=t.infoModel,i=e.guildName?"\n<font color='#6495ed'>"+e.guildName+"</font>":"",s=DevildomSysBase.ins().isDevildomBattle&&i?e.name+i:e.getNameWithServer2();s.indexOf("\n")>-1&&this.haveGuildName(!0),this.roleName.textFlow=(new egret.HtmlTextParser).parser(s),this.roleHead.source="yuanhead"+e.job+"0",GuildBattle.ins().getModel().attHandle&&GuildBattle.ins().getModel().attHandle==this.data&&this.addAttEffect()}else this.roleName.textFlow=(new egret.HtmlTextParser).parser("ÄÃ£ cháº¿t")}},e.prototype.addAttEffect=function(){this.attEffect||(this.attEffect=new McAnimation,this.attEffect.x=55.5,this.attEffect.y=22),this.attEffect.playFile(ResDirMgr.RES_DIR_EFF+"zhandou",-1),this.addChild(this.attEffect)},e.prototype.removeAttEff=function(){this.attEffect&&(this.attEffect.stop(),this.attEffect.destroy(),this.attEffect=null)},e.prototype.showEff=function(){this.clickEffc.playFile(ResDirMgr.RES_DIR_EFF+"tapCircle",1),this.addChild(this.clickEffc)},e.prototype.clearEff=function(){DisplayUtils.removeFromParent(this.clickEffc),DisplayUtils.removeFromParent(this.attEffect)},e.prototype.haveGuildName=function(t){t?(this.namebg.height=45,this.height=110):(this.namebg.height=26,this.height=98)},e}(ItemRenderBase);__reflect(GuildWarMemberHeadItemRender.prototype,"GuildWarMemberHeadItemRender");var GuildWarMemberHeadRender2=function(t){function e(){var e=t.call(this)||this;return e.skinName="SkinMemberHead",e.roleName.y=97,e.roleName.textColor=e.num.textColor=6184,e.num.size=16,e.num.y=-1,e}return __extends(e,t),e}(GuildWarMemberHeadItemRender);__reflect(GuildWarMemberHeadRender2.prototype,"GuildWarMemberHeadRender2");var BaseView=function(t){function e(){var e=t.call(this)||this;return e.className="",e}return __extends(e,t),e.prototype.open=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},e.prototype.close=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},Object.defineProperty(e.prototype,"data",{get:function(){return this._data},set:function(t){this._data=t,eui.PropertyEvent.dispatchPropertyEvent(this,eui.PropertyEvent.PROPERTY_CHANGE,"data"),this.dataChanged&&this.dataChanged()},enumerable:!0,configurable:!0}),e.filterKeys=["data"],e.copyKeys=["open","close"],e}(BaseComponent);__reflect(BaseView.prototype,"BaseView"),window.BaseView=BaseView;var ItemBase=function(t){function e(){var e=t.call(this)||this;return e.showSpeicalDetail=!0,e.isOpenSelectImg=!1,e.isCurrency=!1,e.showName=!1,e.skinName="SkinItem",e.init(),e}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.selectFrame&&this.selectFrame.parent&&this.selectFrame.parent.removeChild(this.selectFrame)},e.prototype.init=function(){this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick_a94,this)},e.prototype.setSoul=function(t){this.itemIcon.setSoul(t)},e.prototype.setItemImg=function(t){this.itemIcon.setPicSource(t)},e.prototype.setItemHeirloomBgImg=function(t,e){e&&(this.itemIcon.imgheirloom.source=e+"_png"),this.itemIcon.setImgheirloom(t)},e.prototype.setDataByConfig=function(t,e){this.itemIcon&&"function"==typeof this.itemIcon.setData&&this.itemIcon.setData(t);var i=ConfigItem.getType(t);if(i!=ItemType.TYPE_0||248==t.descIndex||this.showName)this.setNameText_a94(e?e:t.name);else{var s=isNaN(t.zsLevel)?"Cáº¥p "+(t.level||1)+"":"Chuyá»ƒn "+t.zsLevel+"";this.setNameText_a94(s),-1!=UserBagSystem.fitleEquip.indexOf(t.id)&&this.setNameText_a94(e?e:t.name)}void 0!=this.num&&this.setCount(this.num+""),i==ItemType.TYPE_12&&(this.redPoint.visible=this.getGuildGift(t))},e.prototype.setNameText_a94=function(t){var e=this.nameTxt;e.wordWrap=!1,e.text=t;var i=e.width;if(i>0&&e.textWidth>i){var s=t;while(s.length>1){s=s.slice(0,-1),e.text=s+"..";if(e.textWidth<=i)break}}},e.prototype.dataChanged=function(){null==this.data&&this.clear(),this.count.text="",this.nameTxt.text="";var t=!1;if(this.redPoint.visible=!1,this.itemConfig=null,isNaN(this.data)){if(this.data instanceof ItemData){if(this.itemConfig=this.data.itemConfig,!this.itemConfig)return void this.clear();this.setDataByConfig(this.itemConfig),this.data.count>1?this.setCount(this.data.count+""):this.setCount(""),t=!0}else if(0==this.data.type){this.itemIcon.setJobSource(""),this.itemIcon.setPicSource(AwardsData.getResOfCurrency(this.data.id));var e=GlobalFun.getMoneyConstQualityById(this.data.id);this.isCurrency=!0,this.itemIcon.imgBg.source="quality"+e,this.setNameText_a94(AwardsData.getNameOfCurrency(this.data.id));var i=this.data.count;void 0!=i&&i>1?this.setCount(i+""):this.setCount("")}else if(1==this.data.type){if(this.itemConfig=GlobalConfig.ConfigItem[this.data.id],!this.itemConfig)return void this.clear();this.setDataByConfig(this.itemConfig);var i=this.data.count;i>1?this.setCount(i+""):this.setCount("")}else if(6==this.data.type){this.itemConfig=GlobalConfig.ConfigItem[this.data.id],this.setDataByConfig(this.itemConfig);var i=this.data.count;void 0!=i&&i>1?this.setCount(i+""):this.setCount("")}}else this.itemConfig=GlobalConfig.ConfigItem[this.data],this.setDataByConfig(this.itemConfig,this.runeName);if(this.redPoint.visible||(this.redPoint.visible=this.data.canbeUsed),this.showEquipEffect(),t&&this.itemConfig)if(ConfigItem.getType(this.itemConfig)==ItemType.TYPE_8){var s=!0;this.itemConfig.id==ItemConst.EXP_ITEM&&(s=Actor.level>=65),this.redPoint.visible=this.data&&this.data.count>0&&s,this.itemConfig.id==ItemConst.LEVELUP_ITEM&&(this.redPoint.visible=!0)}else if(ConfigItem.getType(this.itemConfig)==ItemType.TYPE_17)this.redPoint.visible=!0;else if(ConfigItem.getType(this.itemConfig)==ItemType.TYPE_20)this.redPoint.visible=this.data.canbeUsed;else if(ConfigItem.getType(this.itemConfig)==ItemType.TYPE_25)this.redPoint.visible=!0;else if(this.itemConfig.id==GlobalConfig.ConfigTeamFuBenBase.itemId)this.redPoint.visible=!0;else{var n=GlobalConfig.ConfigItemCompose[this.itemConfig.id];n&&n.srcCount<=this.data.count&&(this.redPoint.visible=!0)}this.setSelect(this.selected),this.dataChangeHandler()},e.prototype.dataChangeHandler=function(){},e.prototype.$onRemoveFromStage=function(){t.prototype.$onRemoveFromStage.call(this),this.clear()},e.prototype.clear=function(){this.itemConfig=null,this.itemIcon&&"function"==typeof this.itemIcon.setData&&this.itemIcon.setData(null),this.count.text="",this.nameTxt.text="",DisplayUtils.removeFromParent(this.EquipEffect)},e.prototype.destruct=function(){this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick_a94,this)},e.prototype.isShowJob=function(t){this.itemIcon.imgJob.visible=t},e.prototype.onClick_a94=function(){this.showCurrency(),this.showDetail()},e.prototype.getItemType=function(){return this.itemConfig?ConfigItem.getType(this.itemConfig):-1},e.prototype.showCurrency=function(){if(this.isCurrency)switch(this.data.id){case MoneyConst.yuanbao:case MoneyConst.feat:case MoneyConst.godweaponExp:ViewMgr.ins().open(ItemCurrenciesWin,this.data.id,this.data.count)}},e.prototype.showDetail=function(){if(this.itemConfig){if(this.itemConfig.id==GlobalConfig.ConfigTeamFuBenBase.itemId)return void ViewMgr.ins().open(FlowersUseTipsWin);switch(ConfigItem.getType(this.itemConfig)){case ItemType.TYPE_0:case ItemType.TYPE_4:this.openEquipsTips();break;case ItemType.TYPE_5:ViewMgr.ins().open(HejiTipsOfEquipWin,this.data,!1,!0);break;case ItemType.TYPE_1:this.data.handle&&GlobalConfig.ConfigItemCompose[this.itemConfig.id]?ViewMgr.ins().open(ItemUsesTipsWin,this.data):this.data.handle&&this.itemConfig.id==GlobalConfig.ConfigShenShou.battleCountItem?ViewMgr.ins().open(ShenshouDanUseView,this.itemConfig):this.data.handle&&this.itemConfig.id==DressesSystem.ins().getIdDressesId(this.itemConfig.id)?ViewMgr.ins().open(DressesTipsWin,this.itemConfig):ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id,this.data.count);break;case ItemType.TYPE_2:this.data.handle?ViewMgr.ins().open(ItemUsesTipsWin,this.data):this.data.count?ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id,this.data.count):ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id);break;case ItemType.TYPE_6:ViewMgr.ins().open(RunesTipsWin,0,this.itemConfig.id,this.desc,this.desc2);break;case ItemType.TYPE_9:ViewMgr.ins().open(IllustrationsTipsWin,this.itemConfig.id,0,this.data.handle);break;case ItemType.TYPE_10:this.data.handle?ViewMgr.ins().open(ItemUsesTipsWin,this.data):ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id);break;case ItemType.TYPE_8:case ItemType.TYPE_20:if(1==this.data.type)ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id,this.data.count);else{var t=+this.count.text;this.showSpeicalDetail=!1;for(var e=this.parent;e&&e.parent;)if(e=e.parent,e instanceof BagBaseWin){this.showSpeicalDetail=!0;break}this.showSpeicalDetail?ViewMgr.ins().open(ItemUsesTipsWin,{itemConfig:this.itemConfig,configID:this.itemConfig.id,count:t}):ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id,t)}break;case ItemType.TYPE_12:this.data.itemConfig&&this.getGuildGift(this.data)?ViewMgr.ins().open(ItemUsesTipsWin,this.data):ViewMgr.ins().open(ItemUsesTipsWin,{itemConfig:this.itemConfig,configID:this.itemConfig.id,count:this.data.count},!0);break;case ItemType.TYPE_11:for(var i in GlobalConfig.ConfigHeirloomEquipItem){var s=GlobalConfig.ConfigHeirloomEquipItem[i];if(s&&s.item==this.itemConfig.id){ViewMgr.ins().open(HeirloomEquipTipsWindow,null,s.pos-1);break}}break;case ItemType.TYPE_13:case ItemType.TYPE_14:this.data.type==ItemType.TYPE_1?ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id,this.data.count):ViewMgr.ins().open(ItemUsesTipsWin,{itemConfig:this.itemConfig,configID:this.itemConfig.id,count:this.data.count});break;case ItemType.TYPE_15:ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id,this.data?this.data.count:void 0);break;case ItemType.TYPE_16:var n=GlobalConfig.ConfigGodWingItem[this.itemConfig.id];ViewMgr.ins().open(GWingTipsWin,n);break;case ItemType.TYPE_17:this.showSpeicalDetail=!1;for(var o=this.parent;o&&o.parent;)if(o=o.parent,o instanceof BagBaseWin){this.showSpeicalDetail=!0;break}ViewMgr.ins().open(this.showSpeicalDetail?TreasureChuanshiGiftView:ItemDetailedlyWin,0,this.itemConfig.id,this.data.count);break;case ItemType.TYPE_19:ViewMgr.ins().open(WuJiEquipTipsWin,ConfigItem.getSubType(this.itemConfig));break;case ItemType.TYPE_21:ZhanLing.ins().ZhanLingItemTipsInfo(this.itemConfig.id);break;case ItemType.TYPE_22:ViewMgr.ins().open(ZhanlingZBTipView,this.itemConfig.id);break;case ItemType.TYPE_23:ViewMgr.ins().open(ShenshouEquipTipView,0,0,this.itemConfig.id);break;case ItemType.TYPE_24:ViewMgr.ins().open(HunguTipsWindow,!1,0,this.itemConfig.id);break;case ItemType.TYPE_25:ViewMgr.ins().open(ItemUsesTipsWin,this.data);break;default:ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id)}}},e.prototype.getGuildGift=function(t){var e=0;if(t instanceof ConfigItem)e=t.level;else if(t instanceof ItemData){var i=GlobalConfig.ConfigItem[t._configID];e=i.level}return Actor.level>=e&&0!=GuildData.ins().guildID?!0:!1},e.prototype.setCount=function(t){if(t.length>4){var e=Math.floor(Number(t)/1e3);t=e/10+"váº¡n"}this.count.text=t},e.prototype.openEquipsTips=function(){var t=ConfigItem.getSubType(this.itemConfig);t>=EquipPos.HAT&&t<=EquipPos.SHIELD?ViewMgr.ins().open(SamsaraEquipTipsView,this.itemConfig.id):ViewMgr.ins().open(EquipDetailedlyWin,1,this.data.handle,this.itemConfig.id,this.data)},e.prototype.isShowName=function(t){this.nameTxt.visible=t},e.prototype.getItemSoure=function(){var t="";return this.data?(null==this.itemConfig&&this.dataChanged(),t=0==this.data.type?AwardsData.getResOfCurrency(this.data.id):this.itemIcon.config.icon+"_png"):this.itemConfig&&(t=this.itemConfig.icon+"_png"),t},e.prototype.getText=function(){return this.nameTxt.text},e.prototype.getTextColor=function(){return this.nameTxt.textColor},e.prototype.setnameTxtColor=function(t){return this.nameTxt.textColor=t},e.prototype.getNameText=function(){return this.nameTxt},e.prototype.getCountText=function(){return this.count},e.prototype.setNameTextPosY=function(t){this.nameTxt.y=t},e.prototype.showEquipEffect=function(){var t=ConfigItem.getQuality(this.itemConfig);ConfigItem.getType(this.itemConfig);if((!this.itemConfig||3>=t)&&this.data.id!=MoneyConst.yuanbao)return void DisplayUtils.removeFromParent(this.EquipEffect);var e="";this.EquipEffect=this.EquipEffect||new McAnimation,this.EquipEffect.touchEnabled=!1,this.data.id==MoneyConst.yuanbao?(e="quaeff6",this.EquipEffect.x=44,this.EquipEffect.y=32,this.EquipEffect.scaleX=this.EquipEffect.scaleY=1,this.addChild(this.EquipEffect)):4==t?(e="quality_05",this.EquipEffect.x=this.itemIcon.width/2-1,this.EquipEffect.y=this.itemIcon.height/2-1,this.itemIcon.addChild(this.EquipEffect)):5==t&&(e="chuanqizbeff",this.EquipEffect.x=35,this.EquipEffect.y=36,this.addChild(this.EquipEffect),this.EquipEffect.scaleX=this.EquipEffect.scaleY=1),this.EquipEffect.playFile(ResDirMgr.RES_DIR_EFF+e,-1)},e.prototype.clearEffect=function(){DisplayUtils.removeFromParent(this.EquipEffect),this.EquipEffect=null},e.prototype.HideImgBg=function(){this.itemIcon.imgBg.visible=!1},e.prototype.showNum=function(t){this.count.visible=t},e.prototype.setImgBg=function(t){this.itemIcon.imgBg.source="quality"+t},e.prototype.getItemIcon=function(){return this.itemIcon},e.prototype.setSelect=function(t){this.isOpenSelectImg&&(this.selectFrame.visible=t,1==t?this.addChild(this.selectFrame):this.selectFrame&&this.selectFrame.parent&&this.selectFrame.parent.removeChild(this.selectFrame))},e.prototype.hideName=function(){this.nameTxt.visible=!1},e.prototype.setName=function(t){this.nameTxt.textFlow=TextFlowMaker.generateTextFlow1(t)},e.prototype.setImgBg1=function(t){this.itemIcon.setImgBg1(t)},e.QUALITY_COLOR_XIANWEN=[16777215,33836,11272413,15491092,14942208,16776960],e.QUALITY_COLOR=[16777215,33836,11272413,15491092,14942208,16776960],e.additionRange=15,e}(ItemRenderBase);__reflect(ItemBase.prototype,"ItemBase"),window.ItemBase=ItemBase;var EuiViewBase=function(t){function e(){var e=t.call(this)||this;return e._resources=null,e.isTopLevel=!1,e.exclusionWins=[],e._isInit=!1,e.percentHeight=100,e.percentWidth=100,e}return __extends(e,t),e.prototype.addExclusionWin=function(t){-1==this.exclusionWins.indexOf(t)&&this.exclusionWins.push(t)},e.prototype.isInit=function(){return this._isInit},e.prototype.isShow=function(){return null!=this.stage&&this.visible},e.prototype.addToParent=function(t){t.addChild(this),TimerMgr.ins().remove(this.destoryView_a94,this)},e.prototype.removeFromParent=function(){this.parent;DisplayUtils.removeFromParent(this),this.destoryView_a94()},e.prototype.initUI=function(){this._isInit=!0},e.prototype.initData=function(){},e.prototype.destroy=function(){},e.prototype.destoryView_a94=function(t){void 0===t&&(t=!0),TimerMgr.ins().removeAll(this),ViewMgr.ins().destroy(this.hashCode),t&&ResourceMgr.ins().destroyWin()},e.prototype.open=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},e.prototype.close=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},e.prototype.setNeedloadResource=function(t){this._resources=t},e.prototype.loadResource=function(t,e){this._resources&&this._resources.length>0?(ResourceUtils.ins().loadResource(this._resources,[],t,null,this),this.addEventListener(eui.UIEvent.CREATION_COMPLETE,e,this)):(t(),e())},e.prototype.setVisible=function(t){this.visible=t},e.openCheck=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return!0},e.prototype.playUIEffect=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.anigroup&&UIAnimationMgr.setUiAnimation(this.anigroup,UIAnimationMgr.ANITYPE_IN_SCALE_VER,{time:200})},e.prototype.closeEx=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var i=t[0];this.parent==LayerMgr.UI_Popup&&this.anigroup?UIAnimationMgr.setUiAnimation(this.anigroup,UIAnimationMgr.ANITYPE_OUT_SCALE_VER,{time:200,func:i,ease:egret.Ease.sineIn}):i()},e}(BaseComponent);__reflect(EuiViewBase.prototype,"EuiViewBase",["IViewBase"]);var CustomActorBase=function(t){function e(){var e=t.call(this)||this;return e.myHeight=EntityMgr.CHAR_DEFAULT_HEIGHT,e.typeface=EntityMgr.CHAR_DEFAULT_TYPEFACE,e._dir=4,e._state=ModuleAction.STAND,e.isLyJz=!1,e.isRole=!1,e.isJump=!1,e.isJumpFindTheWay=!1,e.isOnZhanQi=!1,e.roleRandomAttNum=1,e.playRoleRandomAttArr=[],e.roleRandomJumpNum=-1,e.skillBodyplayTime=0,e.hasDir=[CharMcOrder.BODY,CharMcOrder.WEAPON,CharMcOrder.WING,CharMcOrder.SOUL,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW,CharMcOrder.ZhanQi,CharMcOrder.ZhanQiB],e._disOrder={},e._mcFileName={},e._undergroundContainer=new egret.DisplayObjectContainer,e._bodyContainer=new egret.DisplayObjectContainer,e.addChild(e._bodyContainer),e._body=ObjPool.pop("McAnimation"),e._bodyContainer.addChild(e._body),e._disOrder[CharMcOrder.BODY]=e._body,e.titleCantainer=new egret.DisplayObjectContainer,e.titleCantainer.anchorOffsetY=e.myHeight,e.addChild(e.titleCantainer),e}return __extends(e,t),e.prototype.setBodyScale=function(t){this._bodyContainer.scaleX=this._bodyContainer.scaleY=t,this.myHeight=this.myHeight*t,this.typeface*=t,this.titleCantainer.anchorOffsetY=Math.floor(this.myHeight),this.updataMoveXY()},Object.defineProperty(e.prototype,"infoModel",{get:function(){return this._infoModel},set:function(t){this._infoModel=t},enumerable:!0,configurable:!0}),e.prototype.setConfig=function(t){var e=GlobalConfig.ConfigMonstershp[t];e?(this.myHeight=e.hp,this.typeface=e.hp):(this.myHeight=EntityMgr.CHAR_DEFAULT_HEIGHT,this.typeface=EntityMgr.CHAR_DEFAULT_TYPEFACE),this.titleCantainer.anchorOffsetY=Math.floor(this.myHeight),this.updataMoveXY()},e.prototype.updateModel=function(){},e.prototype.$onAddToStage=function(e,i){t.prototype.$onAddToStage.call(this,e,i),this.updateModel(),this.addShadow()},e.prototype.$onRemoveFromStage=function(){t.prototype.$onRemoveFromStage.call(this),this.removeShadow()},Object.defineProperty(e.prototype,"dir",{get:function(){return this._dir},set:function(t){this._dir!=t&&(this._dir=t,this.loadBody())},enumerable:!0,configurable:!0}),e.prototype.getResDir=function(t){var e=2*(this._dir-4);0>e&&(e=0);var i=GlobalFun.getDir(this._dir);return i},e.prototype.playAction=function(t,e){this._state=t,this.playComplete=e,this._body.clearComFun(),this.loadBody()},e.prototype.loadBody=function(){if(1==this.isRole);this._body.stop(),this._body.addEventListener(egret.Event.CHANGE,this.playBody,this),1==this.isRole&&(this.playRoleRandomAttArr=[],this.roleRandomAttNum>5&&(this.roleRandomAttNum=1),this.playRoleRandomAttArr.push(this.roleRandomAttNum,0),this.roleRandomAttNum+=1),this.hasDir.indexOf(CharMcOrder.BODY)>=0?(this.loadFile(this._body,this.getFileName(CharMcOrder.BODY),CharMcOrder.BODY),1!=this.isRole||this._state!=ModuleAction.ATTACK&&this._state!=ModuleAction.CAST||this.loadOther(CharMcOrder.SWORDSHADOW)):this.playFile(this._body,this.getFileName(CharMcOrder.BODY))},e.prototype.loadOther=function(t){var e=this.getMc(t);e&&(e.stop(),e.addEventListener(egret.Event.CHANGE,this.syncFrame,this),this.loadFile(e,this.getFileName(t),t))},e.prototype.loadNoDir=function(t){var e=this.getMc(t);this.playFile(e,this.getFileName(t))},e.prototype.getFileName=function(t){return this._mcFileName[t]},e.prototype.playFile=function(t,e){t.playFile(e,-1,null,!1,null)},e.prototype.loadFile=function(t,i,s){var n=GameLogicManage.ins().getShieldAllRole(),o=GameLogicManage.ins().getShieldMonster(),a=GameLogicManage.ins().getShieldOtherRole();if(this._bodyContainer.visible=!0,this._undergroundContainer.visible=!0,1==o&&(this.team==Team.Monster||this.team==Team.WillBoss))return this._bodyContainer.visible=!1,void(this._undergroundContainer.visible=!1);if(this.team==Team.WillEntity||this.team==Team.My){if(1==n)return this._bodyContainer.visible=!1,void(this._undergroundContainer.visible=!1);if(1==a&&this.team==Team.WillEntity)return this._bodyContainer.visible=!1,void(this._undergroundContainer.visible=!1)}if(i&&!(e.ACTION_ODER[s]&&e.ACTION_ODER[s].indexOf(this._state)<0)){var r=this.getResDir(s);t.scaleX=this._dir>4?-1:1;var h,l,c=[];if(s==CharMcOrder.WING)h=i+"_"+r+ModuleAction.STAND;else if(s==CharMcOrder.ZhanQi||s==CharMcOrder.ZhanQiB){var u=ResDirMgr.RES_DIR_ZHANGQI,p=parseInt(i.slice(u.length));if(s==CharMcOrder.ZhanQiB)if(this.checkZhanQiB(p)&&0==r)t.alpha=1,h=i+"_"+r+"f"+ModuleAction.STAND;else{if(!this.checkZhanQiBHaveDown(p)||4!=r)return void(t.alpha=0);t.alpha=1,h=i+"_"+r+"f"+ModuleAction.STAND}else h=p>=900?i+"_"+r+ModuleAction.STAND:i+"_"+ModuleAction.STAND}else s==CharMcOrder.ZHANLING?h=i:s==CharMcOrder.GuangHuan?h=i:s==CharMcOrder.SWORDSHADOW?1==this.isRole&&(l=this.getRolePlayEff(i,r,ModuleAction.ATTACKEff),h=l.s,c=l.nextNameArr):this._state==ModuleAction.CAST||this._state==ModuleAction.ATTACK?1==this.isRole?(l=this.getRolePlayEff(i,r,ModuleAction.ATTACK),h=l.s,c=l.nextNameArr):h=i+"_"+r+ModuleAction.ATTACK:h=this._state==ModuleAction.HIT?i+"_"+r+ModuleAction.STAND:this._state==ModuleAction.RUN&&1==this.isJump?1==this.isRole?-1!=this.roleRandomJumpNum&&this.roleRandomJumpNum>0?i+"_"+r+ModuleAction.JUMP+this.roleRandomJumpNum:i+"_"+r+ModuleAction.JUMP:i+"_"+r+ModuleAction.RUN:this._state==ModuleAction.RUN&&1==this.isOnZhanQi&&0==this.isJump?i+"_"+r+ModuleAction.STAND:1==this.isLyJz?i+"_"+r+"r":i+"_"+r+this._state;t.playFile(h,this.playCount(),t==this._body?this.playComplete:null,!1)}},e.prototype.checkZhanQiB=function(t){var e=!1;return t>=1e3&&(e=!0),e},e.prototype.checkZhanQiBHaveDown=function(t){var e=!1;return t>=2e3&&(e=!0),e},e.prototype.getRolePlayEff=function(t,e,i){var s,n=0,o="",a=[],r={};if(1==this.isRole)for(n=0;n<this.playRoleRandomAttArr.length;n++)0==n?o=1==this.playRoleRandomAttArr[n]?t+"_"+e+i:t+"_"+e+i+this.playRoleRandomAttArr[n]:1==this.playRoleRandomAttArr[n]?(s=t+"_"+e+i,a.push(s)):(s=t+"_"+e+i+this.playRoleRandomAttArr[n],a.push(s));return r.s=o,r.nextNameArr=a,r},e.prototype.playBody=function(t){var e=1;this._body.gotoAndPlay(e,this.playCount()),this.removeBodyEvent(this._body);for(var i in this._disOrder){var s=this._disOrder[i];
s!=this._body&&this.hasDir.indexOf(+i)>=0&&s instanceof McAnimation&&this.loadOther(+i)}this.sortEffect(),this.updataTitleCantainerY(),this.updataTitlePos()},e.prototype.updataTitleCantainerY=function(){},e.prototype.updataTitlePos=function(){},e.prototype.syncFrame=function(t){this.removeMcEvent(t.currentTarget),this._body&&this._body.movieClipData&&t.currentTarget&&t.currentTarget.frames&&t.currentTarget.movieClipData&&t.currentTarget.gotoAndPlay(this._body.currentFrame,this.playCount())},e.prototype.removeBodyEvent=function(t){t.removeEventListener(egret.Event.CHANGE,this.playBody,this)},e.prototype.removeMcEvent=function(t){t.removeEventListener(egret.Event.CHANGE,this.syncFrame,this)},e.prototype.onImgLoaded=function(t){var e=t.currentTarget;e.removeEventListener(egret.Event.COMPLETE,this.onImgLoaded,this),e.anchorOffsetX=e.width/2,e.anchorOffsetY=e.height/2},e.prototype.playCount=function(){return-1},e.prototype.addMc=function(t,e,i){if(void 0===i&&(i=0),this._mcFileName[t]!=e){this._mcFileName[t]=e;var s=this._disOrder[t];return s||(s=0==i?ObjPool.pop("McAnimation"):new eui.Image,t==CharMcOrder.ZhanQi?(this._undergroundContainer.addChild(s),null==this._undergroundContainer.parent&&this.addChildAt(this._undergroundContainer,0)):this._bodyContainer.addChild(s),this._disOrder[t]=s,t==CharMcOrder.GuangHuan?s.y=-80:s.y=0),s instanceof McAnimation?this.hasDir.indexOf(t)>=0?s==this._body?this.loadBody():this.loadOther(t):this.loadNoDir(t):(s.addEventListener(egret.Event.COMPLETE,this.onImgLoaded,this),s.source=e),this.sortEffect(),s}},e.prototype.removeMc=function(t){if(t!=CharMcOrder.BODY){var e=this._disOrder[t];e&&(e instanceof McAnimation?(this.removeMcEvent(e),e.destroy(),t==CharMcOrder.ZhanQi&&0==this._undergroundContainer.numChildren&&this._undergroundContainer.parent&&this._undergroundContainer.parent.removeChild(this._undergroundContainer)):DisplayUtils.removeFromParent(e),delete this._mcFileName[t],delete this._disOrder[t])}},e.prototype.getMc=function(t){return this._disOrder[t]},e.prototype.removeAll=function(){for(var t in this._disOrder){var e=this._disOrder[t];e!=this._body&&(e instanceof McAnimation?(this.removeMcEvent(e),e.destroy()):DisplayUtils.removeFromParent(e),delete this._mcFileName[t],delete this._disOrder[t])}this._body.dispose(),this.removeBodyEvent(this._body),delete this._mcFileName[CharMcOrder.BODY],this.removeShadow()},e.prototype.addShadow=function(){var t=ViewMgr.gamescene.map;this.shadow?this.parent&&null==this.shadow.parent&&t.addEntityShadow(this.shadow):(this.shadow=new eui.Image,this.shadow.source="yingzi",t.addEntityShadow(this.shadow),this.shadow.anchorOffsetX=28,this.shadow.anchorOffsetY=16)},e.prototype.removeShadow=function(){this.shadow&&this.shadow.parent&&this.shadow.parent.removeChild(this.shadow)},e.prototype.sortEffect=function(){var t=e.FRAME_ODER[this._dir];if(t)for(var i=t.length,s=0,n=0;i>n;n++){var o=t[n];o!=CharMcOrder.ZhanQi&&this._disOrder[o]&&this._disOrder[o].parent&&(this._bodyContainer.addChildAt(this._disOrder[o],s),s+=1)}},Object.defineProperty(e.prototype,"weight",{get:function(){return this.y},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"team",{get:function(){return this.infoModel.team},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this.removeAll()},Object.defineProperty(e.prototype,"boyPlayTime",{get:function(){return this._body.playTime},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"boyMc",{get:function(){return this._body},enumerable:!0,configurable:!0}),e.prototype.getSkillBodyPlayTime=function(){return(this._state==ModuleAction.CAST||this._state==ModuleAction.ATTACK)&&(this.skillBodyplayTime=this.boyPlayTime),0==this.skillBodyplayTime&&(this.skillBodyplayTime=500),this.skillBodyplayTime},e.prototype.setJump=function(t,e){void 0===e&&(e=null),this.isJump=t,e&&(this.jumpPos=e);var i=this.getMc(CharMcOrder.ZhanQi);1==t?(i&&(i.visible=!1),this.roleRandomJumpNum+=1,this.roleRandomJumpNum>2&&(this.roleRandomJumpNum=0),EntityMgr.ins().setJumpIndex(this.infoModel.handle,this.roleRandomJumpNum)):i&&(i.visible=!0),this.loadBody()},e.prototype.setJumpIndex=function(t){this.roleRandomJumpNum=t},Object.defineProperty(e.prototype,"jumpFactor",{get:function(){return 0},set:function(t){var e=this.jumpPos[0],i=this.jumpPos[1],s=this.jumpPos[2];this.x=(1-t)*(1-t)*e.x+2*t*(1-t)*i.x+t*t*s.x,this.y=(1-t)*(1-t)*e.y+2*t*(1-t)*i.y+t*t*s.y;var n=EntityMgr.ins().getNoDieRole();n&&n.infoModel.handle==this.infoModel.handle&&GameLogicManage.ins().postCameraMove(),this.updataMoveXY()},enumerable:!0,configurable:!0}),e.prototype.setIsJumpFindTheWay=function(t){this.isJumpFindTheWay=t},e.prototype.getIsJumpFindTheWay=function(){return this.isJumpFindTheWay},e.prototype.setISOnZhanQi=function(t){this.isOnZhanQi=t,1==this.isOnZhanQi?(this._bodyContainer.y=0,this.titleCantainer.y=this._bodyContainer.y):(this._bodyContainer.y=0,this.titleCantainer.y=this._bodyContainer.y)},e.prototype.updataMoveXY=function(){this.shadow&&(this.shadow.x=Math.floor(this.x),this.shadow.y=Math.floor(this.y))},e.FRAME_ODER=[[CharMcOrder.ZhanQi,CharMcOrder.WEAPON,CharMcOrder.SOUL,CharMcOrder.BODY,CharMcOrder.WING,CharMcOrder.ZhanQiB,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW],[CharMcOrder.ZhanQi,CharMcOrder.BODY,CharMcOrder.WEAPON,CharMcOrder.SOUL,CharMcOrder.WING,CharMcOrder.ZhanQiB,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW],[CharMcOrder.ZhanQi,CharMcOrder.WING,CharMcOrder.BODY,CharMcOrder.WEAPON,CharMcOrder.SOUL,CharMcOrder.ZhanQiB,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW],[CharMcOrder.ZhanQi,CharMcOrder.WING,CharMcOrder.BODY,CharMcOrder.WEAPON,CharMcOrder.SOUL,CharMcOrder.ZhanQiB,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW],[CharMcOrder.ZhanQi,CharMcOrder.WING,CharMcOrder.BODY,CharMcOrder.WEAPON,CharMcOrder.SOUL,CharMcOrder.ZhanQiB,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW],[CharMcOrder.ZhanQi,CharMcOrder.WING,CharMcOrder.BODY,CharMcOrder.WEAPON,CharMcOrder.SOUL,CharMcOrder.ZhanQiB,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW],[CharMcOrder.ZhanQi,CharMcOrder.WING,CharMcOrder.BODY,CharMcOrder.WEAPON,CharMcOrder.SOUL,CharMcOrder.ZhanQiB,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW],[CharMcOrder.ZhanQi,CharMcOrder.BODY,CharMcOrder.WEAPON,CharMcOrder.SOUL,CharMcOrder.WING,CharMcOrder.ZhanQiB,CharMcOrder.ZHANLING,CharMcOrder.SWORDSHADOW]],e.ACTION_ODER={8:[ModuleAction.STAND,ModuleAction.RUN,ModuleAction.ATTACK]},e}(egret.DisplayObjectContainer);__reflect(CustomActorBase.prototype,"CustomActorBase"),window.CustomActorBase=CustomActorBase;var EuiLayerBase=function(t){function e(){var e=t.call(this)||this;return e.isCanDoCreateChildren=!1,e.percentWidth=100,e.percentHeight=100,e.touchEnabled=!1,e}return __extends(e,t),e.prototype.updateDisplayList=function(e,i){if(t.prototype.updateDisplayList.call(this,e,i),1==this.isCanDoCreateChildren){var s=948/i,n=Math.floor(e*s),o=Math.floor(i*s);t.prototype.updateDisplayList.call(this,n,o),this.$setScaleX(.83),this.$setScaleY(.83),this.x=0}},e}(eui.Group);__reflect(EuiLayerBase.prototype,"EuiLayerBase");var NpcModel=function(t){function e(){var e=t.call(this)||this;return e.type=EntityType.Npc,e}return __extends(e,t),Object.defineProperty(e.prototype,"avatarString",{get:function(){var t=GlobalConfig.ConfigNpcBase[this.configID];return t?t.avatar:null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"avatarFileName",{get:function(){var t=this.npcConfig;return 1==t.actType?""+ResDirMgr.RES_DIR_BODY+t.avatar:""+ResDirMgr.RES_DIR_MONSTER+t.avatar},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"weaponFileName",{get:function(){var t=this.npcConfig;return t.weapon?""+ResDirMgr.RES_DIR_WEAPON+t.weapon:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"npcConfig",{get:function(){return GlobalConfig.ConfigNpcBase[this.configID]},enumerable:!0,configurable:!0}),e.prototype.clone=function(t){var e=egret.getQualifiedClassName(this);t=t||ObjPool.pop(e);for(var i in this)"function"!=typeof this[i]&&"__class__"!=i&&"__types__"!=i&&(t[i]=this[i]);return t},e}(EffectModel);__reflect(NpcModel.prototype,"NpcModel"),window.NpcModel=NpcModel;var ActivityBaseData=function(){function t(t){}return t.prototype.init=function(t,e){},t.prototype.update=function(t){},t.prototype.canAwards=function(){return!1},t.prototype.isActivitiesOpen=function(){return!1},Object.defineProperty(t.prototype,"awardsCondition",{get:function(){return 0},enumerable:!0,configurable:!0}),t.prototype.specialCondition=function(){return!0},t.prototype.getHideState=function(){return!1},t}();__reflect(ActivityBaseData.prototype,"ActivityBaseData");var TypeOfActivity;!function(t){t[t.Normal=0]="Normal",t[t.Personal=1]="Personal",t[t.Rank=4]="Rank",t[t.Nesting=2]="Nesting"}(TypeOfActivity||(TypeOfActivity={}));var SystemBase=function(t){function e(){var e=t.call(this)||this;return MessageCenter.compile(egret.getDefinitionByName(egret.getQualifiedClassName(e))),e.observe(GameloadMgr.ins().postLoginInit,e.initLogin),e.observe(GameloadMgr.ins().postZeroInit,e.initZero),e}return __extends(e,t),e.prototype.regNetMsg=function(t,e){GameSocket.ins().registerSTCFunc(this.sysId,t,e,this)},e.prototype.initLogin=function(){},e.prototype.initZero=function(){},e.prototype.getGameByteArray=function(){return GameSocket.ins().getBytes()},e.prototype.getBytes=function(t){var e=this.getGameByteArray();return e.writeCmd(this.sysId,t),e},e.prototype.sendBaseProto=function(t){var e=this.getGameByteArray();e.writeCmd(this.sysId,t),this.sendToServer(e)},e.prototype.sendToServer=function(t){GameSocket.ins().sendToServer(t)},e.prototype.observe=function(t,e){MessageCenter.addListener(t,e,this)},e.prototype.removeObserve=function(){MessageCenter.ins().removeAll(this)},e.prototype.associated=function(t){for(var e=this,i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];for(var n=!1,o=function(){n=!1,t.call(e)},a=function(){n||(n=!0,TimerMgr.ins().doTimer(60,1,o,e))},r=0,h=i;r<h.length;r++){var l=h[r];this.observe(l,a)}},e}(ClassBase);__reflect(SystemBase.prototype,"SystemBase"),window[this.__class__]=this,MessageCenter.compile(SystemBase);var ConfigPActivityBtn=function(){function t(){}return t}();__reflect(ConfigPActivityBtn.prototype,"ConfigPActivityBtn");var UTFMsg=function(){function t(){}return t.prototype.receive=function(t){var e=t.readUTF(),i=this.decode(e);i&&MessageCenter.ins().dispatch(i.key,i.body)},t.prototype.send=function(t,e){var i=this.encode(e);i&&(t.type=egret.WebSocket.TYPE_STRING,t.writeUTF(i))},t.prototype.decode=function(t){return ErrLog.trace("decodeéœ€è¦å­ç±»é‡å†™ï¼Œæ ¹æ®é¡¹ç›®çš„åè®®ç»“æž„è§£æž"),null},t.prototype.encode=function(t){return ErrLog.trace("encodeéœ€è¦å­ç±»é‡å†™ï¼Œæ ¹æ®é¡¹ç›®çš„åè®®ç»“æž„è§£æž"),null},t}();__reflect(UTFMsg.prototype,"UTFMsg",["BaseMsg"]);var ActorExRingCommon=function(){function t(){this.MaxOutNum=[],this.actImbaId=0}return t}();__reflect(ActorExRingCommon.prototype,"ActorExRingCommon");var AuctionItem=function(){function t(){}return t}();__reflect(AuctionItem.prototype,"AuctionItem");var ConfigActivityBtn=function(){function t(){}return t}();__reflect(ConfigActivityBtn.prototype,"ConfigActivityBtn");var ZhanLingPanel=function(t){function e(){var e=t.call(this)||this;return e.skinName="ZhanlingSkin",e.isTopLevel=!0,e}return __extends(e,t),e.prototype.childrenCreated=function(){},e.prototype.close=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.isAutoUp=!1,this.upBtn.label=this.isAutoUp?"Há»§y":"NÃ¢ng sao nhanh",TimerMgr.ins().remove(this.checkUpdate_a94,this),TimerMgr.ins().remove(this.autoUpStar_a94,this),this.removeObserve()},e.prototype.open=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.openView(t)},e.prototype.openView=function(t){this.addTouchEvent(this.detail,this.onEvent),this.addTouchEvent(this.suit,this.onEvent),this.addTouchEvent(this.huanxing,this.onEvent),this.addTouchEvent(this.upBtn,this.onEvent),this.addTouchEvent(this.upBtnEx,this.onEvent),this.addTouchEvent(this.skillIcon0,this.onEvent),this.addTouchEvent(this.huanhua,this.onEvent),this.addTouchEvent(this.closeBtn,this.onEvent),this.addTouchEvent(this.checkBoxs,this.updateCost_a94),this.addTouchEvent(this.icon,this.showIconTips_a94),this.addTouchEvent(this.help,this.onEvent),this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onSoulClick_a94,this),this.observe(UserBagSystem.ins().postItemAdd,this.timerUpdate_a94),this.observe(UserBagSystem.ins().postItemDel,this.timerUpdate_a94),this.observe(UserBagSystem.ins().postItemCountChange,this.timerUpdate_a94),this.observe(ZhanLing.ins().postZhanLingInfo,this.timerUpdate_a94),this.observe(ZhanLing.ins().postZhanLingUpExpInfo,this.timerUpdate_a94),this.observe(ZhanLing.ins().postZhanLingDrugInfo,this.timerUpdate_a94),this.observe(ZhanLing.ins().postZhanLingWearInfo,this.timerUpdate_a94),this.observe(ZhanLing.ins().postZhanLingSkinUpGradeInfo,this.timerUpdate_a94),this.observe(ZhanLing.ins().postZhangLingSkinChangeInfo,this.timerUpdate_a94),this.observe(ZhanLing.ins().postZhanLingUpgrade,this.stopUpGrade_a94),this.observe(ZhanLing.ins().postZhanLingTalentLvUpGrade,this.TanlentLvUpGrade_a94),this.list.itemRenderer=ZhanLingSkinItemRender,this.list.useVirtualLayout=!1,this.listData=new eui.ArrayCollection,this.list.dataProvider=this.listData,this.zlId=t[0]||0,this._tick=0,this.postEvent=Math.floor(150/GlobalConfig.ConfigZhanLing.unitTime);for(var e=0;e<GlobalConfig.ZhanLingBase[this.zlId].skill.length;e++)this.addTouchEvent(this["skillIcon"+(e+1)],this.onSkillEvent_a94);for(var i in GlobalConfig.ConfigZhanLing.upgradeInfo){var s=GlobalConfig.ConfigZhanLing.upgradeInfo[i].sort;this.addTouchEvent(this["up"+s],this.onDrugEvent_a94)}this.isAutoUp=!1,this.roleSelect.hideRole(),this.init(),TimerMgr.ins().doTimer(500,0,this.checkUpdate_a94,this)},e.prototype.checkUpdate_a94=function(){var t=this;this._tick&&this._tick<=this.postEvent&&(this._tick=0,TimerMgr.ins().doNext(function(){t.updateUI_a94()},this))},e.prototype.timerUpdate_a94=function(){var t=this;this._tick++,this._tick&&this._tick>this.postEvent&&(this._tick=0,TimerMgr.ins().doNext(function(){t.updateUI_a94()},this))},e.prototype.init=function(){this.updateUI_a94(!0)},e.prototype.updateState=function(){var t=ZhanLingModel.ins().getZhanLingDataById(this.zlId),e=t?t.level:0,i=CommonUtils.getObjectLength(GlobalConfig.ZhanLingLevel[this.zlId])-1;this.zlId?e>=i?this.currentState="skin_max":this.currentState="skin_up":e>=i?this.currentState="zl_max":this.currentState="zl_up",this.validateNow()},e.prototype.updateUI_a94=function(t){this.updateState(),this.updateTop_a94(t),this.updateItem_a94(),this.updateSkill_a94(),this.updateValue_a94(),this.updateDown_a94(),this.updateCost_a94(),this.updateRedPoint_a94()},e.prototype.updateTop_a94=function(t){if("skin_up"==this.currentState||"skin_max"==this.currentState){if(this.listData.replaceAll(ZhanLingModel.ins().showZLlist),this.list.validateNow(),this.zlId)for(var e=0;e<this.list.numElements;e++){var i=this.list.getVirtualElementAt(e),s=this.list.dataProvider.getItemAt(e);if(s.id==this.zlId){if(i.setSelect(!0),t){var n=0;e>3&&(this.listScroller.stopAnimation(),n=Math.floor((e+1)/4)*i.height),this.setStartPosition_a94(n)}break}}this.huanhua.visible=ZhanLingModel.ins().getZhanLingDataById(this.zlId)?!0:!1,this.huanhua.icon=ZhanLingModel.ins().ZhanLingSkinId==this.zlId?"zl_quxiao_btn":"zl_huanhua_btn"}var o=GlobalConfig.ConfigZhanLing;for(var a in o.upgradeInfo){var e=o.upgradeInfo[a].sort;this["up"+e]&&(this["up"+e].icon=GlobalConfig.ConfigItem[a].icon+"_png"),this["redPoint"+e]&&(this["redPoint"+e].visible=ZhanLingModel.ins().getZhanLingInfoByDrugUse(this.zlId,Number(a))),this["used"+e]&&(this["used"+e].text=ZhanLingModel.ins().getZhanLingDataByDrug(this.zlId,Number(a)))}var r=ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);this.lv.data=GlobalConfig.ZhanLingLevel[this.zlId][r].stageDesc,this.model||(this.model=new McAnimation),this.model.parent||this.zhanling.addChild(this.model),this.updateModel_a94()},e.prototype.updateModel_a94=function(){var t,e=ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);if(this.isAutoUp){ZhanLingModel.ins().getZhanLingInfoByStage(this.zlId);t=GlobalConfig.ZhanLingLevel[this.zlId][e],t?e=e:t=GlobalConfig.ZhanLingLevel[this.zlId][e]}else t=GlobalConfig.ZhanLingLevel[this.zlId][e];this.zhanlingName.source=GlobalConfig.ZhanLingLevel[this.zlId][e].zlName,this.model.name!=ResDirMgr.RES_DIR_SHOWFABAO+t.innerAppearance&&this.model.playFile(ResDirMgr.RES_DIR_SHOWFABAO+t.innerAppearance,-1)},e.prototype.updateItem_a94=function(){var t=UserBagSystem.ins().getBagGoodsByType(ItemType.TYPE_21);t&&t.sort(this.sort_a94);for(var e=1;e<=GlobalConfig.ConfigZhanLing.equipPosCount;e++){this["item"+e].name=e.toString();var i=ZhanLingModel.ins().getZhanLingInfoByItem(this.zlId,e);this["item"+e].data={zlId:this.zlId,id:i,equips:t}}},e.prototype.updateSkill_a94=function(){var t=GlobalConfig.ZhanLingBase[this.zlId];if(t){var e=t.talent,i=ZhanLingModel.ins().getZhanLingInfoByTalentLv(this.zlId),s=GlobalConfig.ZhanLingTalent[e][i];s||(s=GlobalConfig.ZhanLingTalent[e][1]),s.talentDesc&&s.talentDesc.icon?this.skillIcon0.source=s.talentDesc.icon:s.passive&&(this.skillIcon0.source=1e3*Math.floor(s.passive[0].id/1e3)+"_png");for(var n=0;n<GlobalConfig.ZhanLingBase[this.zlId].skill.length;n++){var o=GlobalConfig.ZhanLingBase[this.zlId].skill[n].id,a=GlobalConfig.ZhanLingSkill[o];a.desc&&a.desc.icon?this["skillIcon"+(n+1)].source=a.desc.icon:this["skillIcon"+(n+1)].source=1e3*Math.floor(a.passive/1e3)+"_png"}this.mijilock0.visible=i?!1:!0;for(var r=ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId),n=0;n<GlobalConfig.ZhanLingBase[this.zlId].skill.length;n++){var h=GlobalConfig.ZhanLingBase[this.zlId].skill[n];this["mijilock"+(n+1)].visible=h.open>r?!0:!1}}},e.prototype.updateValue_a94=function(){var t=ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId),e=GlobalConfig.ZhanLingLevel[this.zlId][t];if(e){var i=ZhanLingModel.ins().getAllPushZhanLingPower(this.zlId),s=i[0]?i[0]:0;this.powerPanel.setPower(s),i[1].length||(i[1]=this.getEmptyAttrs_a94(this.zlId)),i[2].length||(i[2]=this.getEmptyAttrs_a94(this.zlId,!0)),this.curAtt.textFlow=TextFlowMaker.generateTextFlow(AttributeData.getAttStr(i[1],0,1," ï¼š",!1,!0,null,"",16777215,16777215)+"\n"),this.nextAtt.textFlow=TextFlowMaker.generateTextFlow(AttributeData.getAttStr(i[2],0,1," ï¼š",!1,!0,null,"",16777215,65286)+"\n")}},e.prototype.getEmptyAttrs_a94=function(t,e){var i=[],s=GlobalConfig.ZhanLingLevel[t][0];if(i=ZhanLingModel.ins().addAttrs(i,s.attrs),!e)for(var n=0;n<i.length;n++)i[n].value=0;return i},e.prototype.updateDown_a94=function(t){if(void 0===t&&(t=0),this.zlId){var e=ZhanLingModel.ins().getZhanLingDataById(this.zlId);if(this.starGroup.visible=this.barGroup.visible=e?!0:!1,!e)return}this.starList||(this.starList=new StarList(10,0,55),this.starList.horizontalCenter=0),this.starList.parent||this.starGroup.addChild(this.starList);var i=ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId),s=Math.floor(i%10);if(i){var n=s;n||(s=10)}this.starList.setStarCount(s,t),this.barbc||(this.barbc=new ProgressBar,this.barbc.setWidth(500)),this.barbc.parent||this.barGroup.addChild(this.barbc);var o=ZhanLingModel.ins().getZhanLingDataByExp(this.zlId),a=GlobalConfig.ZhanLingLevel[this.zlId][i];a&&(this.barbc.reset(),this.barbc.setData(o,a.exp))},e.prototype.updateCost_a94=function(){var t=this.getCostValue_a94(),e=t[0],i=t[1],s=e>=i?65280:16711680;this.countLabel.textFlow=TextFlowMaker.generateTextFlow1("|C:"+s+"&T:"+e+"|/"+i),this.upBtn.visible=ZhanLingModel.ins().getZhanLingDataById(this.zlId)?!0:!1,this.upBtnEx.visible=!this.upBtn.visible,this.tongyongline.visible=!this.upBtn.visible},e.prototype.getCostValue_a94=function(){var t=ZhanLingModel.ins().getZhanLingDataById(this.zlId),e=GlobalConfig.ZhanLingBase[this.zlId];if(this.checkBoxs.visible=!0,this.costType=ItemType.TYPE_1,t||!e.mat){var i=0,s=0,n=ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId),o=GlobalConfig.ZhanLingLevel[this.zlId][n],a=GlobalConfig.ConfigItem[GlobalConfig.ConfigZhanLing.stageitemid];this.icon.source=a.icon+"_png";var r=UserBagSystem.ins().getBagItemById(GlobalConfig.ConfigZhanLing.stageitemid);return i=r?r.count:0,s=o.count,this.checkBoxs.selected&&s>i&&(i=Actor.yb,this.icon.source="szyuanbao",s=GlobalConfig.ConfigZhanLing.unitPrice*o.count,this.costType=MoneyConst.yuanbao),this.costCount=s,[i,s]}var h=GlobalConfig.ConfigItem[e.mat];this.icon.source=h.icon+"_png";var l=UserBagSystem.ins().getBagItemById(e.mat),c=l?l.count:0,u=GlobalConfig.ZhanLingTalent[this.zlId][1],p=u.costCount;return this.checkBoxs.visible=!1,this.costType=ItemType.TYPE_22,this.costCount=p,[c,p]},e.prototype.updateRedPoint_a94=function(){for(var t=0;5>t;t++)this["skillRedPoint"+t]&&(this["skillRedPoint"+t].visible=!1);if(this.hhRedPoint.visible=!1,this.upRedPoint.visible=ZhanLingModel.ins().isUpGradeByStar(this.zlId)||ZhanLingModel.ins().isHintNum(this.zlId),this.skillRedPoint0.visible=ZhanLingModel.ins().isCanUpGradeByTalent(this.zlId),this.hxRedPoint){for(var e=!1,t=0;t<ZhanLingModel.ins().showZLlist.length;t++){var i=ZhanLingModel.ins().showZLlist[t];if(i.id){var s=ZhanLingModel.ins().isUpGradeByStar(i.id)||ZhanLingModel.ins().isHintNum(i.id);if(s){e=!0;break}var n=ZhanLingModel.ins().isCanUpGradeByTalent(i.id);if(n){e=!0;break}}}this.hxRedPoint.visible=e}},e.prototype.onSoulClick_a94=function(t){if(t&&t.itemRenderer&&t.item)if("zl_up"==this.currentState||"zl_max"==this.currentState){var e=this.getIndexRule_a94();ViewMgr.ins().open(ZhanLingPanelExView,e)}else{var i=t.item;this.zlId=i.id,this.updateUI_a94()}},e.prototype.onSkillEvent_a94=function(t){for(var e=0;e<GlobalConfig.ZhanLingBase[this.zlId].skill.length;e++)if(t.currentTarget==this["skillIcon"+(e+1)]){var i=GlobalConfig.ZhanLingBase[this.zlId].skill[e];ViewMgr.ins().open(ZhanLingTipsView,this.zlId,i.id);break}},e.prototype.onDrugEvent_a94=function(t){for(var e in GlobalConfig.ConfigZhanLing.upgradeInfo){var i=GlobalConfig.ConfigZhanLing.upgradeInfo[e].sort;if(t.currentTarget==this["up"+i]){var s=this.getDrugItemByIndex_a94(i);this["redPoint"+i].visible?ZhanLing.ins().sendZhanLingDrug(this.zlId,s):ViewMgr.ins().open(ZhanLingItemTipsView,this.zlId,s)}}},e.prototype.onEvent=function(t){var e=this;switch(t.currentTarget){case this.closeBtn:ViewMgr.ins().close(this);break;case this.detail:break;case this.suit:ViewMgr.ins().open(ZhanLingSuitTipView,this.zlId);break;case this.huanxing:var i=this.getIndexRule_a94();ViewMgr.ins().open(ZhanLingPanelExView,i);break;case this.upBtn:this.sendUpGrade_a94();break;case this.upBtnEx:this.upRedPoint.visible?ZhanLing.ins().sendZhanLingSkinUpGrade(this.zlId):UserTips.ins().showTips("|C:0xff0000&T:KhÃ´ng Ä‘á»§ nguyÃªn liá»‡u");break;case this.skillIcon0:if(this.skillRedPoint0&&this.skillRedPoint0.visible){var s=ZhanLingModel.ins().getZhanLingDataByTalentId(this.zlId),n=ZhanLingModel.ins().getZhanLingInfoByTalentLv(this.zlId),o=GlobalConfig.ZhanLingTalent[s][n+1],a=GlobalConfig.ZhanLingBase[this.zlId],r=GlobalConfig.ConfigItem[a.mat],h=WarnView.show("CÃ³ muá»‘n tiÃªu hao|C:0x00ff00&T:"+r.name+" Da*"+o.costCount+"|nÃ¢ng cáº¥p thiÃªn phÃº?",function(){ZhanLing.ins().sendZhanLingSkinUpGrade(e.zlId)},this,null,null);h.setBtnLabel("Há»§y","XÃ¡c nháº­n")}else ViewMgr.ins().open(ZhanLingTipsView,this.zlId);break;case this.huanhua:if(!ZhanLingModel.ins().getZhanLingDataById(this.zlId))return void UserTips.ins().showTips("|C:0xff0000&T:Da chÆ°a kÃ­ch hoáº¡t");var l=this.zlId;ZhanLingModel.ins().ZhanLingSkinId==l&&(l=0),ZhanLing.ins().sendZhangLingSkinChange(l);break;case this.help:ViewMgr.ins().open(CommonHelpBaseWin,GlobalConfig.ConfigHelpInfo[35].text)}},e.prototype.sendUpGrade_a94=function(){if(this.isAutoUp=!this.isAutoUp,this.isAutoUp){if(!this.checkUpStar_a94())return void(this.isAutoUp=!1);TimerMgr.ins().doTimer(GlobalConfig.ConfigZhanLing.unitTime,0,this.autoUpStar_a94,this)}else TimerMgr.ins().remove(this.autoUpStar_a94,this);this.upBtn.label=this.isAutoUp?"Há»§y":"NÃ¢ng sao nhanh"},e.prototype.stopUpGrade_a94=function(){this.isAutoUp=!1,TimerMgr.ins().remove(this.autoUpStar_a94,this),this.upBtn.label=this.isAutoUp?"Há»§y":"NÃ¢ng sao nhanh",this.updateDown_a94(1);var t=ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId),e=GlobalConfig.ZhanLingLevel[this.zlId][t];e.activeLv&&this.isTopLevel},e.prototype.TanlentLvUpGrade_a94=function(){var t=ZhanLingModel.ins().getZhanLingInfoByTalentLv(this.zlId),e=ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId),i=GlobalConfig.ZhanLingLevel[this.zlId][e];i&&t&&1!=t&&this.isTopLevel},e.prototype.showIconTips_a94=function(){var t=MoneyConst.yuanbao;switch(this.costType){case MoneyConst.yuanbao:ViewMgr.ins().open(ItemCurrenciesWin,t,this.costCount);break;case ItemType.TYPE_1:t=GlobalConfig.ConfigZhanLing.stageitemid,ViewMgr.ins().open(ItemDetailedlyWin,0,t,this.costCount);break;case ItemType.TYPE_22:t=GlobalConfig.ZhanLingBase[this.zlId].mat,ViewMgr.ins().open(ZhanlingZBTipView,t)}},e.prototype.autoUpStar_a94=function(){if(this.isAutoUp){var t=this.checkBoxs.selected?1:0;if(!this._tick&&!this.checkUpStar_a94())return this.isAutoUp=!1,void TimerMgr.ins().remove(this.autoUpStar_a94,this);ZhanLing.ins().sendZhanLingUpExp(this.zlId,t)}},e.prototype.checkUpStar_a94=function(){if("skin_max"==this.currentState||"zl_max"==this.currentState)return UserTips.ins().showTips("|C:0xff0000&T:ÄÃ£ Ä‘áº¡t cáº¥p tá»‘i Ä‘a"),this.upBtn.label="NÃ¢ng sao nhanh",!1;if(!ZhanLingModel.ins().getZhanLingDataById(this.zlId))return UserTips.ins().showTips("|C:0xff0000&T:Da chÆ°a kÃ­ch hoáº¡t"),this.upBtn.label="NÃ¢ng sao nhanh",!1;var t=this.checkBoxs.selected?1:0,e=this.getCostValue_a94(),i=e[0],s=e[1];if(!i||s>i){if(!t)return UserTips.ins().showTips("|C:0xff0000&T:KhÃ´ng Ä‘á»§ PhÃ¡p Báº£o Tinh PhÃ¡ch, cÃ³ thá»ƒ chá»n tá»± Ä‘á»™ng mua Ä‘á»ƒ nÃ¢ng cáº¥p"),this.upBtn.label="NÃ¢ng sao nhanh",!1;if(i=Actor.yb,s=GlobalConfig.ConfigZhanLing.unitPrice*s,!i||s>i)return UserTips.ins().showTips("|C:0xff0000&T:KhÃ´ng Ä‘á»§ NguyÃªn Báº£o"),this.upBtn.label="NÃ¢ng sao nhanh",!1}return this.upBtn.label="Há»§y",!0},e.prototype.sort_a94=function(t,e){var i=GlobalConfig.ZhanLingEquip[t.configID],s=GlobalConfig.ZhanLingEquip[e.configID];return i.level>s.level?-1:1},e.prototype.getIndexRule_a94=function(){var t=0;ZhanLingModel.ins().updateShowZLlistInfo(),t=ZhanLingModel.ins().showZLlist[0].id;for(var e=0;e<ZhanLingModel.ins().showZLlist.length;e++){var i=ZhanLingModel.ins().isUpGradeByStar(ZhanLingModel.ins().showZLlist[e].id),s=ZhanLingModel.ins().isCanUpGradeByTalent(ZhanLingModel.ins().showZLlist[e].id);if(i||s){t=ZhanLingModel.ins().showZLlist[e].id;break}var n=ZhanLingModel.ins().getZhanLingDataByLevel(ZhanLingModel.ins().showZLlist[e].id);n||(ZhanLingModel.ins().getZhanLingDataById(GlobalConfig.ZhanLingBase[t].id)?t=ZhanLingModel.ins().showZLlist[e].id:GlobalConfig.ZhanLingBase[t].sort>GlobalConfig.ZhanLingBase[ZhanLingModel.ins().showZLlist[e].id].sort&&(t=ZhanLingModel.ins().showZLlist[e].id))}return t},e.prototype.onChange_a94=function(){},e.prototype.setStartPosition_a94=function(t){if(this.listScroller.height>=this.list.contentHeight)t=0;else{var e=this.list.contentHeight-this.listScroller.height;e=e>0?e:0,t>=e&&(t=e)}this.list.scrollV=t},e.prototype.getDrugItemByIndex_a94=function(t){var e=0,i=GlobalConfig.ConfigZhanLing;for(var s in i.upgradeInfo){var n=i.upgradeInfo[s].sort;if(n==t){e=Number(s);break}}return e},e}(EuiViewBase);__reflect(ZhanLingPanel.prototype,"ZhanLingPanel"),window.ZhanLingPanel=ZhanLingPanel;var ConfigActivityType10=function(){function t(){}return t}();__reflect(ConfigActivityType10.prototype,"ConfigActivityType10");var ConfigActivityType11_1=function(){function t(){}return t}();__reflect(ConfigActivityType11_1.prototype,"ConfigActivityType11_1");var ConfigActivityType11_2=function(){function t(){this.rate=1}return t}();__reflect(ConfigActivityType11_2.prototype,"ConfigActivityType11_2");var ConfigActivityType12=function(){function t(){}return t}();__reflect(ConfigActivityType12.prototype,"ConfigActivityType12");var ConfigActivityType19=function(){function t(){}return t}();__reflect(ConfigActivityType19.prototype,"ConfigActivityType19");var ConfigActivityType2=function(){function t(){}return t}();__reflect(ConfigActivityType2.prototype,"ConfigActivityType2");var ConfigActivityType20=function(){function t(){}return t}();__reflect(ConfigActivityType20.prototype,"ConfigActivityType20");var ConfigActivityType22_1=function(){function t(){}return t}();__reflect(ConfigActivityType22_1.prototype,"ConfigActivityType22_1");var ConfigActivityType22_3=function(){function t(){}return t}();__reflect(ConfigActivityType22_3.prototype,"ConfigActivityType22_3");var ConfigActivityType3=function(){function t(){this.day=1}return t}();__reflect(ConfigActivityType3.prototype,"ConfigActivityType3");var ConfigActivityType4=function(){function t(){}return t}();__reflect(ConfigActivityType4.prototype,"ConfigActivityType4");var ConfigActivityType5=function(){function t(){}return t}();__reflect(ConfigActivityType5.prototype,"ConfigActivityType5");var ConfigActivityType6=function(){function t(){}return t}();__reflect(ConfigActivityType6.prototype,"ConfigActivityType6");var ConfigActivityType7=function(){function t(){}return t}();__reflect(ConfigActivityType7.prototype,"ConfigActivityType7");var ConfigActivityType8=function(){function t(){}return t}();__reflect(ConfigActivityType8.prototype,"ConfigActivityType8");var SceneBase=function(){function t(){this._layers=new Array}return t.prototype.onEnter=function(){},t.prototype.onExit=function(){ViewMgr.ins().closeAll(),this.removeAllLayer()},t.prototype.addLayer=function(t){t instanceof SpriteLayerBase?(StageUtils.ins().getStage().addChild(t),this._layers.push(t)):t instanceof EuiLayerBase&&(StageUtils.ins().getUIStage().addChild(t),this._layers.push(t))},t.prototype.addLayerAt=function(t,e){t instanceof SpriteLayerBase?(StageUtils.ins().getStage().addChildAt(t,e),this._layers.push(t)):t instanceof EuiLayerBase&&(StageUtils.ins().getUIStage().addChildAt(t,e),this._layers.push(t))},t.prototype.removeLayer=function(t){t instanceof SpriteLayerBase?(StageUtils.ins().getStage().removeChild(t),this._layers.splice(this._layers.indexOf(t),1)):t instanceof EuiLayerBase&&(StageUtils.ins().getUIStage().removeChild(t),this._layers.splice(this._layers.indexOf(t),1))},t.prototype.layerRemoveAllChild=function(t){t instanceof SpriteLayerBase?t.removeChildren():t instanceof EuiLayerBase&&t.removeChildren()},t.prototype.removeAllLayer=function(){for(;this._layers.length;){var t=this._layers[0];this.layerRemoveAllChild(t),this.removeLayer(t)}},t}();__reflect(SceneBase.prototype,"SceneBase");var ConfigActorExRing=function(){function t(){this.id=0,this.openDay=0,this.openVip=0,this.openYb=0,this.name="",this.effid=0,this.explain="",this.mtCombat=0,this.needLevel=0,this.needZs=0,this.monsterId=0,this.order=0,this.icon="",this.avatarFileName=0,this.wexplain="",this.useYb=0,this.skillGridYb=0}return t}();__reflect(ConfigActorExRing.prototype,"ConfigActorExRing");var ConfigActorExRing2=function(){function t(){this.level=0,this.costItem=0,this.cost=0,this.upPower=0,this.addPower=0,this.bjRate=0,this.bjAddPower=0,this.attrAward=[],this.extAttrAward=[],this.judgeup=0,this.SpecialRingSkin=""}return t}();__reflect(ConfigActorExRing2.prototype,"ConfigActorExRing2");var ConfigActorExRing3=function(){function t(){this.level=0,this.costItem=0,this.cost=0,this.upPower=0,this.addPower=0,this.bjRate=0,this.bjAddPower=0,this.attrAward=[],this.extAttrAward=[],this.judgeup=0,this.SpecialRingSkin=""}return t}();__reflect(ConfigActorExRing3.prototype,"ConfigActorExRing3");var ConfigActorExRing4=function(){function t(){this.level=0,this.costItem=0,this.cost=0,this.upPower=0,this.addPower=0,this.bjRate=0,this.bjAddPower=0,this.attrAward=[],this.extAttrAward=[],this.judgeup=0,this.SpecialRingSkin=""}return t}();__reflect(ConfigActorExRing4.prototype,"ConfigActorExRing4");var ConfigActorExRing5=function(){function t(){this.level=0,this.costItem=0,this.cost=0,this.upPower=0,this.addPower=0,this.bjRate=0,this.bjAddPower=0,this.attrAward=[],this.extAttrAward=[],this.judgeup=0,this.SpecialRingSkin=""}return t}();__reflect(ConfigActorExRing5.prototype,"ConfigActorExRing5");var ConfigActorExRing6=function(){function t(){this.level=0,this.costItem=0,this.cost=0,this.upPower=0,this.addPower=0,this.bjRate=0,this.bjAddPower=0,this.attrAward=[],this.extAttrAward=[],this.judgeup=0,this.SpecialRingSkin=""
}return t}();__reflect(ConfigActorExRing6.prototype,"ConfigActorExRing6");var ConfigActorExRing7=function(){function t(){this.level=0,this.costItem=0,this.cost=0,this.upPower=0,this.addPower=0,this.bjRate=0,this.bjAddPower=0,this.attrAward=[],this.extAttrAward=[],this.judgeup=0,this.SpecialRingSkin="",this.summonerSkillId=0,this.summonerAttr=[]}return t}();__reflect(ConfigActorExRing7.prototype,"ConfigActorExRing7");var ConfigActorExRingAbility=function(){function t(){this.id=0,this.ringLv=0,this.abilityName="",this.abilityDesc="",this.abilityIcon=""}return t}();__reflect(ConfigActorExRingAbility.prototype,"ConfigActorExRingAbility");var ConfigActorExRingBook=function(){function t(){this.id=0,this.level=0,this.itemId=0,this.num=0,this.attr=[],this.bookAttrPer=[],this.skillName="",this.skillDesc="",this.skillIcon="",this.exPower=0}return t}();__reflect(ConfigActorExRingBook.prototype,"ConfigActorExRingBook");var ConfigActorExRingItem=function(){function t(){}return t}();__reflect(ConfigActorExRingItem.prototype,"ConfigActorExRingItem");var ConfigAttrPower=function(){function t(){}return t}();__reflect(ConfigAttrPower.prototype,"ConfigAttrPower");var ConfigAuction=function(){function t(){}return t}();__reflect(ConfigAuction.prototype,"ConfigAuction");var ConfigBagBase=function(){function t(){}return t}();__reflect(ConfigBagBase.prototype,"ConfigBagBase");var ConfigBagExpand=function(){function t(){}return t}();__reflect(ConfigBagExpand.prototype,"ConfigBagExpand");var ConfigBookList=function(){function t(){}return t}();__reflect(ConfigBookList.prototype,"ConfigBookList");var ConfigBossHome=function(){function t(){this.id=0,this.vip=0,this.boss=[],this.icon=[]}return t}();__reflect(ConfigBossHome.prototype,"ConfigBossHome");var ConfigBubble=function(){function t(){this.bubbleid=0,this.news="",this.type=0}return t}();__reflect(ConfigBubble.prototype,"ConfigBubble");var ConfigCampBattle=function(){function t(){}return t}();__reflect(ConfigCampBattle.prototype,"ConfigCampBattle");var ConfigCampBattlePersonalAward=function(){function t(){}return t}();__reflect(ConfigCampBattlePersonalAward.prototype,"ConfigCampBattlePersonalAward");var ConfigCampBattlePersonalRankAward=function(){function t(){}return t}();__reflect(ConfigCampBattlePersonalRankAward.prototype,"ConfigCampBattlePersonalRankAward");var ConfigCard=function(){function t(){}return t}();__reflect(ConfigCard.prototype,"ConfigCard");var ConfigChaptersReward=function(){function t(){}return t}();__reflect(ConfigChaptersReward.prototype,"ConfigChaptersReward");var ConfigClientGlobal=function(){function t(){}return t}();__reflect(ConfigClientGlobal.prototype,"ConfigClientGlobal");var ConfigDaily=function(){function t(){}return t}();__reflect(ConfigDaily.prototype,"ConfigDaily");var ConfigDailyAward=function(){function t(){}return t}();__reflect(ConfigDailyAward.prototype,"ConfigDailyAward");var ConfigDailyFuben=function(){function t(){this.ybRec=0,this.monthcard=0,this.privilege=0,this.specialCard=0,this.sweepLevel=0}return t}();__reflect(ConfigDailyFuben.prototype,"ConfigDailyFuben");var ConfigDeathgainWay=function(){function t(){}return t}();__reflect(ConfigDeathgainWay.prototype,"ConfigDeathgainWay");var ConfigDeathGuide=function(){function t(){}return t}();__reflect(ConfigDeathGuide.prototype,"ConfigDeathGuide");var ConfigDecompose=function(){function t(){}return t}();__reflect(ConfigDecompose.prototype,"ConfigDecompose");var ConfigEffect=function(){function t(){}return t}();__reflect(ConfigEffect.prototype,"ConfigEffect");var ConfigEffects=function(){function t(){}return t.isAddBuff=function(t){return t.type==SkillEffectType.AdditionalState||t.type==SkillEffectType.AdditionalDamage||t.type==SkillEffectType.AdditionalAttributes||t.type==SkillEffectType.Summon},t}();__reflect(ConfigEffects.prototype,"ConfigEffects");var ConfigEnhanceAttr=function(){function t(){}return t}();__reflect(ConfigEnhanceAttr.prototype,"ConfigEnhanceAttr");var ConfigEnhanceCost=function(){function t(){}return t}();__reflect(ConfigEnhanceCost.prototype,"ConfigEnhanceCost");var ConfigEquip=function(){function t(){this.stoneId=0,this.stoneNum=0,this.moneyNum=0,this.equipRate=0,this.moneyType=0,this.exPower=0}return t}();__reflect(ConfigEquip.prototype,"ConfigEquip");var ConfigEquipItem=function(){function t(){}return t}();__reflect(ConfigEquipItem.prototype,"ConfigEquipItem");var ConfigEquipPointConst=function(){function t(){}return t}();__reflect(ConfigEquipPointConst.prototype,"ConfigEquipPointConst");var ConfigEquipPointGrowUp=function(){function t(){}return t}();__reflect(ConfigEquipPointGrowUp.prototype,"ConfigEquipPointGrowUp");var ConfigEquipPointRank=function(){function t(){}return t}();__reflect(ConfigEquipPointRank.prototype,"ConfigEquipPointRank");var ConfigEquipWithEff=function(){function t(){}return t}();__reflect(ConfigEquipWithEff.prototype,"ConfigEquipWithEff");var ConfigExp=function(){function t(){}return t}();__reflect(ConfigExp.prototype,"ConfigExp");var ConfigExRing=function(){function t(){}return t}();__reflect(ConfigExRing.prototype,"ConfigExRing");var LayerMgr=function(){function t(){}return t.Game_Bg=new EuiLayerBase,t.Game_Main=new EuiLayerBase,t.Main_View=new EuiLayerBase,t.UI_Main=new EuiLayerBase,t.UI_Main2=new EuiLayerBase,t.UI_Popup=new EuiLayerBase,t.UI_Message=new EuiLayerBase,t.UI_Tips=new EuiLayerBase,t}();__reflect(LayerMgr.prototype,"LayerMgr");var ConfigExRing1=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e}(ConfigExRing0);__reflect(ConfigExRing1.prototype,"ConfigExRing1");var ConfigExRingAttr=function(){function t(){this.level=0,this.costItem=0,this.cost=0,this.attrAward=[],this.extAttrAward=[],this.upPower=0,this.addPower=0,this.judgeup=0,this.SpecialRingSkin=""}return t}();__reflect(ConfigExRingAttr.prototype,"ConfigExRingAttr");var ConfigFbChallenge=function(){function t(){this.id=0,this.group=0,this.layer=0,this.zsLevelLimit=0,this.levelLimit=0,this.fbId=0,this.describe="",this.showIcon=0,this.equipPos=0,this.clearReward=[],this.dayReward=[],this.lotteryCount=0}return t}();__reflect(ConfigFbChallenge.prototype,"ConfigFbChallenge");var ConfigFbChallengeBase=function(){function t(){}return t}();__reflect(ConfigFbChallengeBase.prototype,"ConfigFbChallengeBase");var ConfigFbChallengeLottery=function(){function t(){this.group=[]}return t}();__reflect(ConfigFbChallengeLottery.prototype,"ConfigFbChallengeLottery");var ConfigFbChName=function(){function t(){this.group=0,this.name=""}return t}();__reflect(ConfigFbChName.prototype,"ConfigFbChName");var ConfigFirstRecharge=function(){function t(){}return t}();__reflect(ConfigFirstRecharge.prototype,"ConfigFirstRecharge");var ConfigFirstRechargeClient=function(){function t(){}return t}();__reflect(ConfigFirstRechargeClient.prototype,"ConfigFirstRechargeClient");var ConfigFsFb=function(){function t(){}return t}();__reflect(ConfigFsFb.prototype,"ConfigFsFb");var ConfigFuwenTreasure=function(){function t(){this.huntOnce=500,this.huntTenth=4980}return t}();__reflect(ConfigFuwenTreasure.prototype,"ConfigFuwenTreasure");var ConfigFuwenTreasureLevel=function(){function t(){}return t}();__reflect(ConfigFuwenTreasureLevel.prototype,"ConfigFuwenTreasureLevel");var ConfigFuwenTreasureReward=function(){function t(){}return t}();__reflect(ConfigFuwenTreasureReward.prototype,"ConfigFuwenTreasureReward");var ConfigGainItem=function(){function t(){}return t}();__reflect(ConfigGainItem.prototype,"ConfigGainItem");var ConfigGodWingItem=function(){function t(){}return t}();__reflect(ConfigGodWingItem.prototype,"ConfigGodWingItem");var ConfigGodWingLevel=function(){function t(){}return t}();__reflect(ConfigGodWingLevel.prototype,"ConfigGodWingLevel");var ConfigGodWingSuit=function(){function t(){}return t}();__reflect(ConfigGodWingSuit.prototype,"ConfigGodWingSuit");var ConfigGuanYinAward=function(){function t(){this.level=0}return t}();__reflect(ConfigGuanYinAward.prototype,"ConfigGuanYinAward");var ConfigGuild=function(){function t(){}return t}();__reflect(ConfigGuild.prototype,"ConfigGuild");var ConfigGuildBoss=function(){function t(){this.dayTimes=0,this.notOpenDayOfWeek=0,this.effid=0,this.radisLv=0}return t}();__reflect(ConfigGuildBoss.prototype,"ConfigGuildBoss");var ConfigGuildBossHpAwards=function(){function t(){this.srank=0,this.erank=0,this.mail_head="",this.mail_content=""}return t}();__reflect(ConfigGuildBossHpAwards.prototype,"ConfigGuildBossHpAwards");var ConfigGuildBossInfo=function(){function t(){this.id=0,this.fbId=0,this.enterAwards=0}return t}();__reflect(ConfigGuildBossInfo.prototype,"ConfigGuildBossInfo");var ConfigGuildBossRank=function(){function t(){}return t}();__reflect(ConfigGuildBossRank.prototype,"ConfigGuildBossRank");var ConfigGuildCommonSkill=function(){function t(){}return t}();__reflect(ConfigGuildCommonSkill.prototype,"ConfigGuildCommonSkill");var ConfigGuildCreate=function(){function t(){}return t}();__reflect(ConfigGuildCreate.prototype,"ConfigGuildCreate");var ConfigGuildDonate=function(){function t(){}return t}();__reflect(ConfigGuildDonate.prototype,"ConfigGuildDonate");var ConfigGuildLevel=function(){function t(){}return t}();__reflect(ConfigGuildLevel.prototype,"ConfigGuildLevel");var ConfigGuildTask=function(){function t(){}return t}();__reflect(ConfigGuildTask.prototype,"ConfigGuildTask");var ConfigHeartMethod=function(){function t(){this.id=0}return t}();__reflect(ConfigHeartMethod.prototype,"ConfigHeartMethod");var ConfigHeartMethodBase=function(){function t(){this.serverDay=0,this.zsLv=0,this.starMax=0}return t}();__reflect(ConfigHeartMethodBase.prototype,"ConfigHeartMethodBase");var ConfigHeartMethodPos=function(){function t(){}return t}();__reflect(ConfigHeartMethodPos.prototype,"ConfigHeartMethodPos");var ConfigHeartMethodStar=function(){function t(){}return t}();__reflect(ConfigHeartMethodStar.prototype,"ConfigHeartMethodStar");var ConfigHeartMethodSuit=function(){function t(){}return t}();__reflect(ConfigHeartMethodSuit.prototype,"ConfigHeartMethodSuit");var ConfigHeirloomEquip=function(){function t(){}return t}();__reflect(ConfigHeirloomEquip.prototype,"ConfigHeirloomEquip");var ConfigHeirloomEquipFire=function(){function t(){}return t}();__reflect(ConfigHeirloomEquipFire.prototype,"ConfigHeirloomEquipFire");var ConfigHeirloomEquipItem=function(){function t(){}return t}();__reflect(ConfigHeirloomEquipItem.prototype,"ConfigHeirloomEquipItem");var ConfigHeirloomEquipSet=function(){function t(){}return t}();__reflect(ConfigHeirloomEquipSet.prototype,"ConfigHeirloomEquipSet");var ConfigHeirloomTreasure=function(){function t(){}return t}();__reflect(ConfigHeirloomTreasure.prototype,"ConfigHeirloomTreasure");var ConfigHeirloomTreasureReward=function(){function t(){}return t}();__reflect(ConfigHeirloomTreasureReward.prototype,"ConfigHeirloomTreasureReward");var ConfigHelpInfo=function(){function t(){}return t}();__reflect(ConfigHelpInfo.prototype,"ConfigHelpInfo");var ConfigInstanceBase=function(){function t(){}return t}();__reflect(ConfigInstanceBase.prototype,"ConfigInstanceBase");var ConfigItem=function(){function t(){this.bagType=0}return t.calculateBagItemScore=function(t){var e={hp:2,atk:4,def:5,res:6},i=GlobalConfig.ConfigEquip[t.itemConfig.id],s=GlobalConfig.ConfigAttrPower,n=0,o=t.att,a=0;if(o){for(var r in e)if(a=0,i[r]){for(var h=0;h<o.length;h++)if(o[h].type==e[r]){a=i[r]+o[h].value;break}n+=(void 0==a?0:a)*s[e[r]].power}}else for(var l in e)if(a=i[l]){var c=Role.getAttrTypeByName(l);n+=a*s[c].power}var u=0;return i.baseAttr1&&(u+=UserBagSystem.getAttrPower([i.baseAttr1])),i.baseAttr2&&(u+=UserBagSystem.getAttrPower([i.baseAttr2])),i.exPower&&(u+=i.exPower),Math.floor(n/100)+Math.floor(u)},t.pointCalNumber=function(e){var i=e.id;if(void 0!=t.itemPoints[i])return t.itemPoints[i];var s={hp:2,atk:4,def:5,res:6},n=GlobalConfig.ConfigEquip[i],o=GlobalConfig.ConfigAttrPower,a=0;for(var r in s){var h=s[r],l=n[r];if(l){var c=o[h];a+=(l+Math.floor(l*ItemBase.additionRange/100))*c.power}}return t.itemPoints[i]=Math.floor(a/100),t.itemPoints[i]},t.getBaseAttrData=function(t){var e=GlobalConfig.ConfigEquip[t.id],i={hp:2,atk:4,def:5,res:6},s=[AttributeType.atHolyDamege],n=[];for(var o in i)e[o]&&n.push(new AttributeData(i[o],e[o]));return e.baseAttr1&&s.indexOf(e.baseAttr1.type)>=0&&n.push(new AttributeData(e.baseAttr1.type,e.baseAttr1.value)),e.baseAttr2&&s.indexOf(e.baseAttr2.type)>=0&&n.push(new AttributeData(e.baseAttr2.type,e.baseAttr2.value)),n},t.calculateRelatePower=function(e,i){var s=0;if(!e||!i)return s;for(var n=0,o=e;n<o.length;n++){var a=o[n];s+=t.relatePower(a,i)}return s},t.relatePower=function(t,e){var i=0,s=GlobalConfig.ConfigAttrPower,n=s[t.type];if(n&&n.relate_type){var o=e.getAtt(n.relate_type),a=AttributeData.exRelate[n.relate_type];if(a){var r=e.getAtt(a);r&&(o=Math.floor(o/(1+r/1e4)))}i+=Math.floor(t.value*o*n.relate_power/100)}return i},t.getQuality=function(t){return t&&GlobalConfig.ConfigItemDesc[t.descIndex]?GlobalConfig.ConfigItemDesc[t.descIndex].quality:0},t.getQualityColor=function(t){return ItemBase.QUALITY_COLOR[this.getQuality(t)]},t.getQualityColor2=function(t){return ItemBase.QUALITY_COLOR_XIANWEN[this.getQuality(t)]},t.getType=function(t){return t&&GlobalConfig.ConfigItemDesc[t.descIndex]?GlobalConfig.ConfigItemDesc[t.descIndex].type:0},t.getSubType=function(t){return t&&GlobalConfig.ConfigItemDesc[t.descIndex]?GlobalConfig.ConfigItemDesc[t.descIndex].subType:0},t.getJob=function(t){return t&&GlobalConfig.ConfigItemDesc[t.descIndex]?GlobalConfig.ConfigItemDesc[t.descIndex].job:0},t.isEquip=function(t){var e=this.getType(t);switch(e){case ItemType.TYPE_0:case ItemType.TYPE_4:case ItemType.TYPE_11:return!0}return!1},t.itemPoints={},t}();__reflect(ConfigItem.prototype,"ConfigItem");var ConfigItemGift=function(){function t(){}return t}();__reflect(ConfigItemGift.prototype,"ConfigItemGift");var ConfigItemStore=function(){function t(){}return t.getStoreByItemID=function(t){var e=GlobalConfig.ConfigItemStore;for(var i in e){var s=e[i];if(s.itemId==t)return s}return null},t}();__reflect(ConfigItemStore.prototype,"ConfigItemStore");var ConfigJadePlateBase=function(){function t(){}return t}();__reflect(ConfigJadePlateBase.prototype,"ConfigJadePlateBase");var ConfigJadePlateLevel=function(){function t(){}return t}();__reflect(ConfigJadePlateLevel.prototype,"ConfigJadePlateLevel");var ConfigJingMaiCommon=function(){function t(){}return t}();__reflect(ConfigJingMaiCommon.prototype,"ConfigJingMaiCommon");var ConfigJingMaiLevel=function(){function t(){}return t}();__reflect(ConfigJingMaiLevel.prototype,"ConfigJingMaiLevel");var ConfigJingMaiStage=function(){function t(){}return t}();__reflect(ConfigJingMaiStage.prototype,"ConfigJingMaiStage");var ConfigKnighthood=function(){function t(){this.effid=0}return t}();__reflect(ConfigKnighthood.prototype,"ConfigKnighthood");var TaskIdConfig=function(){function t(){this.achieveId=0,this.taskId=0}return t}();__reflect(TaskIdConfig.prototype,"TaskIdConfig");var ConfigKnighthoodBasic=function(){function t(){this.perLevel=0,this.actImbaId=0}return t}();__reflect(ConfigKnighthoodBasic.prototype,"ConfigKnighthoodBasic");var ConfigLegendCompose=function(){function t(){}return t}();__reflect(ConfigLegendCompose.prototype,"ConfigLegendCompose");var ConfigLegendLevelup=function(){function t(){}return t}();__reflect(ConfigLegendLevelup.prototype,"ConfigLegendLevelup");var ConfigLimitTime=function(){function t(){this.id=0,this.time=0,this.openLevel=0,this.openZhuan=0}return t}();__reflect(ConfigLimitTime.prototype,"ConfigLimitTime");var ConfigLimitTimeTask=function(){function t(){this.id=0,this.name="",this.desc="",this.target=0,this.control=0}return t}();__reflect(ConfigLimitTimeTask.prototype,"ConfigLimitTimeTask");var ConfigLoginActivate=function(){function t(){}return t}();__reflect(ConfigLoginActivate.prototype,"ConfigLoginActivate");var ConfigLoginRewards=function(){function t(){}return t}();__reflect(ConfigLoginRewards.prototype,"ConfigLoginRewards");var ConfigLoongSoulBase=function(){function t(){this.openlv=0}return t}();__reflect(ConfigLoongSoulBase.prototype,"ConfigLoongSoulBase");var ConfigLoongSoulStage=function(){function t(){this.stage=0,this.icon="",this.normalCost=0,this.attr=[],this.normalCostTip=0,this.modelId=0}return t}();__reflect(ConfigLoongSoulStage.prototype,"ConfigLoongSoulStage");var ConfigMijiBase=function(){function t(){}return t}();__reflect(ConfigMijiBase.prototype,"ConfigMijiBase");var ConfigMiJiGrid=function(){function t(){}return t}();__reflect(ConfigMiJiGrid.prototype,"ConfigMiJiGrid");var ConfigMiJiSkill=function(){function t(){}return t.getSkillIDByItem=function(t){var e=GlobalConfig.ConfigMiJiSkill;for(var i in e)if(e[i].item==t)return e[i].id;return-1},t}();__reflect(ConfigMiJiSkill.prototype,"ConfigMiJiSkill");var ConfigMoney=function(){function t(){}return t}();__reflect(ConfigMoney.prototype,"ConfigMoney");var ConfigMonsters=function(){function t(){this.attrange=0,this.wanderrange=0,this.dirNum=2,this.showhp=2}return t}();__reflect(ConfigMonsters.prototype,"ConfigMonsters");var MonsterType;!function(t){t[t.Monster=0]="Monster",t[t.Boss=1]="Boss",t[t.Summon=3]="Summon",t[t.Ring=4]="Ring"}(MonsterType||(MonsterType={}));var ConfigMonthCard=function(){function t(){this.monthCardMoney=0,this.privilegeMoney=0,this.expFubenPrecent=0,this.neiGongGoldPrecent=0,this.sweepPrecent=0}return t}();__reflect(ConfigMonthCard.prototype,"ConfigMonthCard");var ConfigMonthSign=function(){function t(){this.month=0,this.day=0,this.rewards=null,this.dayLabel=0,this.vipLabel=0}return t}();__reflect(ConfigMonthSign.prototype,"ConfigMonthSign");var ConfigMonthSignDays=function(){function t(){this.days=0,this.rewards=null}return t}();__reflect(ConfigMonthSignDays.prototype,"ConfigMonthSignDays");var ConfigMonthSignVip=function(){function t(){this.vipLevel=0,this.complementTimes=0}return t}();__reflect(ConfigMonthSignVip.prototype,"ConfigMonthSignVip");var ConfigNeiGongBase=function(){function t(){this.openLevel=10,this.maxLevel=20,this.maxStage=0,this.levelPerStage=0,this.openGuanqia=10}return t}();__reflect(ConfigNeiGongBase.prototype,"ConfigNeiGongBase");var ConfigNeiGongStage=function(){function t(){this.stage=0,this.level=0,this.totalExp=0,this.costMoney=0,this.addExp=0,this.attribute=[],this.tips=0}return t}();__reflect(ConfigNeiGongStage.prototype,"ConfigNeiGongStage");var ConfigNewFuncNotice=function(){function t(){}return t}();__reflect(ConfigNewFuncNotice.prototype,"ConfigNewFuncNotice");var ConfigNewRole=function(){function t(){}return t}();__reflect(ConfigNewRole.prototype,"ConfigNewRole");var ConfigOpenSystem=function(){function t(){this.id=0,this.openzs=0,this.openlevel=0,this.opencheck=0}return t}();__reflect(ConfigOpenSystem.prototype,"ConfigOpenSystem");var ConfigOptionalGift=function(){function t(){}return t}();__reflect(ConfigOptionalGift.prototype,"ConfigOptionalGift");var ConfigOtherBoss1=function(){function t(){}return t}();__reflect(ConfigOtherBoss1.prototype,"ConfigOtherBoss1");var ConfigOtherBoss2=function(){function t(){}return t}();__reflect(ConfigOtherBoss2.prototype,"ConfigOtherBoss2");var ConfigPActivity2=function(){function t(){}return t}();__reflect(ConfigPActivity2.prototype,"ConfigPActivity2");var ConfigPActivity3=function(){function t(){this.day=1}return t}();__reflect(ConfigPActivity3.prototype,"ConfigPActivity3");var SoundBase=function(){function t(){this._cache={},this._loadingCache=new Array,this._soundArr=[],TimerMgr.ins().doTimer(6e4,0,this.dealSoundTimer,this)}return t.prototype.dealSoundTimer=function(){for(var t=egret.getTimer(),e=Object.keys(this._cache),i=0,s=e.length;s>i;i++){var n=e[i];this.checkCanClear(n)&&t-this._cache[n]>=SoundMgr.CLEAR_TIME&&this.deleteSound(n)}},t.prototype.deleteSound=function(t){delete this._cache[t];var e=this._loadingCache.indexOf(t);this._loadingCache.splice(e,1);var i=this._soundArr.splice(e,1);i[0].removeEventListener(egret.Event.COMPLETE,this.onLoadComplete,this),i[0].close(),i[0]=null,i=null},t.prototype.getSound=function(t){var e=ResOtherData.GetInstance().getUrl(t);""==e&&(e=t);var i=HttpProperty.directUrl,s=e.indexOf("resource");-1==s&&(e=e.replace("_mp3",".mp3"),e="resource/audio/"+e),s=e.indexOf(i);var n="";n=-1==s?HttpProperty.directUrl+e:e,s=this._loadingCache.indexOf(n);var o;return-1==s?(this._loadingCache.push(n),o=new egret.Sound,o.load(n),o.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this),this._soundArr.push(o),null):(o=this._soundArr[s],o.loaded?(this._cache[n]&&(this._cache[n]=egret.getTimer()),o):(this.deleteSound(n),this.getSound(t)))},t.prototype.onLoadComplete=function(t){var e=t.target;this.loadedPlay(e,t.target.url)},t.prototype.loadedPlay=function(t,e){},t.prototype.checkCanClear=function(t){return!0},t}();__reflect(SoundBase.prototype,"SoundBase");var ConfigPActivityType1=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e}(ConfigActivityType1);__reflect(ConfigPActivityType1.prototype,"ConfigPActivityType1");var ConfigPActivityType9=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e}(ConfigActivityType9);__reflect(ConfigPActivityType9.prototype,"ConfigPActivityType9");var ConfigPassionPoint=function(){function t(){}return t}();__reflect(ConfigPassionPoint.prototype,"ConfigPassionPoint");var ConfigPassionPointAward=function(){function t(){}return t}();__reflect(ConfigPassionPointAward.prototype,"ConfigPassionPointAward");var ConfigPlayFun=function(){function t(){this.pos=1,this.iconCls="eui.Button",this.iconSkin="SkinMainButton"}return t}();__reflect(ConfigPlayFun.prototype,"ConfigPlayFun");var ConfigPunchEquip=function(){function t(){}return t}();__reflect(ConfigPunchEquip.prototype,"ConfigPunchEquip");var ConfigPunchEquipMaster=function(){function t(){}return t}();__reflect(ConfigPunchEquipMaster.prototype,"ConfigPunchEquipMaster");var ConfigRefinesystemExp=function(){function t(){}return t}();__reflect(ConfigRefinesystemExp.prototype,"ConfigRefinesystemExp");var ConfigRole=function(){function t(){this.level=0,this.job=0,this.hp=0,this.mp=0,this.atk=0,this.def=0,this.res=0,this.crit=0,this.tough=0,this.as=0,this.ms=0,this.acrit=0}return t}();__reflect(ConfigRole.prototype,"ConfigRole");var ConfigRuneBase=function(){function t(){this.id=0,this.type=0,this.expend=0,this.gain=0,this.chip=0,this.attr=[],this.equipAttr=[],this.exAttr=[],this.specialAttr=[],this.specialDesc=null,this.power=0}return t}();__reflect(ConfigRuneBase.prototype,"ConfigRuneBase");var ConfigRuneCompose=function(){function t(){}return t}();__reflect(ConfigRuneCompose.prototype,"ConfigRuneCompose");var ConfigRuneConver=function(){function t(){this.id=0,this.checkpoint=0,this.conversion=0}return t}();__reflect(ConfigRuneConver.prototype,"ConfigRuneConver");var ConfigRuneLockPos=function(){function t(){this.pos=0,this.lockLv=0}return t}();__reflect(ConfigRuneLockPos.prototype,"ConfigRuneLockPos");var ConfigRuneName=function(){function t(){this.type=0,this.runeName=""}return t}();__reflect(ConfigRuneName.prototype,"ConfigRuneName");var ConfigRuneOther=function(){function t(){this.zsLevel=0,this.maxEquip=0,this.maxQuality=0,this.maxDecompose=5}return t}();__reflect(ConfigRuneOther.prototype,"ConfigRuneOther");var ConfigScenes=function(){function t(){this.turn=0,this.autoPunch=0}return t}();__reflect(ConfigScenes.prototype,"ConfigScenes");var ConfigShield=function(){function t(){}return t}();__reflect(ConfigShield.prototype,"ConfigShield");var ConfigShieldStage=function(){function t(){this.stage=0,this.icon="",this.normalCost=0,this.attr=[],this.normalCostTip=0,this.modelId=0}return t}();__reflect(ConfigShieldStage.prototype,"ConfigShieldStage");var ConfigSkillsOpen=function(){function t(){}return t}();__reflect(ConfigSkillsOpen.prototype,"ConfigSkillsOpen");var ConfigSkillsUpgrade=function(){function t(){}return t}();__reflect(ConfigSkillsUpgrade.prototype,"ConfigSkillsUpgrade");var ConfigSkirmishRank=function(){function t(){}return t}();__reflect(ConfigSkirmishRank.prototype,"ConfigSkirmishRank");var ConfigSkirmishReward=function(){function t(){}return t}();__reflect(ConfigSkirmishReward.prototype,"ConfigSkirmishReward");var ConfigSpecialEquips=function(){function t(){}return t}();__reflect(ConfigSpecialEquips.prototype,"ConfigSpecialEquips");var FitleStyle;!function(t){t[t.fj=1]="fj",t[t.hc=2]="hc"}(FitleStyle||(FitleStyle={}));var ConfigStoneLevel=function(){function t(){}return t}();__reflect(ConfigStoneLevel.prototype,"ConfigStoneLevel");var ConfigStoneLevelCost=function(){function t(){}return t}();__reflect(ConfigStoneLevelCost.prototype,"ConfigStoneLevelCost");var ConfigStoneOpen=function(){function t(){}return t}();__reflect(ConfigStoneOpen.prototype,"ConfigStoneOpen");var ConfigStoreCommon=function(){function t(){}return t}();__reflect(ConfigStoreCommon.prototype,"ConfigStoreCommon");var ConfigSuit=function(){function t(){}return t}();__reflect(ConfigSuit.prototype,"ConfigSuit");var ConfigTeamFuBen=function(){function t(){}return t}();__reflect(ConfigTeamFuBen.prototype,"ConfigTeamFuBen");var ConfigTeamFuBenBase=function(){function t(){}return t}();__reflect(ConfigTeamFuBenBase.prototype,"ConfigTeamFuBenBase");var ConfigTeamFuBenGuide=function(){function t(){}return t}();__reflect(ConfigTeamFuBenGuide.prototype,"ConfigTeamFuBenGuide");var ConfigTianTiConst=function(){function t(){}return t}();__reflect(ConfigTianTiConst.prototype,"ConfigTianTiConst");var ConfigTianTiDan=function(){function t(){}return t}();__reflect(ConfigTianTiDan.prototype,"ConfigTianTiDan");var ConfigTogetherHit=function(){function t(){this.level=0}return t}();__reflect(ConfigTogetherHit.prototype,"ConfigTogetherHit");var ConfigTogetherHitEquipExchange=function(){function t(){this.id=0,this.exchangeAmount=0,this.level=0,this.zsLevel=0}return t}();__reflect(ConfigTogetherHitEquipExchange.prototype,"ConfigTogetherHitEquipExchange");var ConfigTogetherHitEquipPage=function(){function t(){this.name=0,this.icon=""}return t}();__reflect(ConfigTogetherHitEquipPage.prototype,"ConfigTogetherHitEquipPage");var ConfigTogetherHitEquipQm=function(){function t(){this.num=0,this.lv=0,this.zslv=0,this.desc=""}return t}();__reflect(ConfigTogetherHitEquipQm.prototype,"ConfigTogetherHitEquipQm");var ConfigTrainBase=function(){function t(){}return t}();__reflect(ConfigTrainBase.prototype,"ConfigTrainBase");var ConfigTrainDayAward=function(){function t(){}return t}();__reflect(ConfigTrainDayAward.prototype,"ConfigTrainDayAward");var ConfigTrainLevel=function(){function t(){this.trainName="",this.img=""}return t}();__reflect(ConfigTrainLevel.prototype,"ConfigTrainLevel");var ConfigTrainLevelAward=function(){function t(){}return t}();__reflect(ConfigTrainLevelAward.prototype,"ConfigTrainLevelAward");var ConfigTreasureBox=function(){function t(){}return t}();__reflect(ConfigTreasureBox.prototype,"ConfigTreasureBox");var ConfigTreasureHunt=function(){function t(){}return t}();__reflect(ConfigTreasureHunt.prototype,"ConfigTreasureHunt");var ConfigTreasureHuntPool=function(){function t(){}return t}();__reflect(ConfigTreasureHuntPool.prototype,"ConfigTreasureHuntPool");var ConfigTreasureHuntPoolHefu=function(){function t(){}return t}();__reflect(ConfigTreasureHuntPoolHefu.prototype,"ConfigTreasureHuntPoolHefu");var ConfigUpdateRemind=function(){function t(){}return t}();__reflect(ConfigUpdateRemind.prototype,"ConfigUpdateRemind");var ConfigVip=function(){function t(){this.boss1buy=0,this.boss2buy=0}return t}();__reflect(ConfigVip.prototype,"ConfigVip");var ConfigVipGrid=function(){function t(){}return t}();__reflect(ConfigVipGrid.prototype,"ConfigVipGrid");var ConfigWeaponSoul=function(){function t(){this.id=1,this.name="",this.actcond=[],this.inside=[],this.outside=[],this.pic=[],this.icon=""}return t}();__reflect(ConfigWeaponSoul.prototype,"ConfigWeaponSoul");var ConfigWeaponSoulBase=function(){function t(){this.maxItemNum=0,this.itemid=0}return t}();__reflect(ConfigWeaponSoulBase.prototype,"ConfigWeaponSoulBase");var ConfigWeaponSoulPos=function(){function t(){this.id=0,this.level=0,this.costItem=0,this.costNum=0,this.showlv=0}return t}();__reflect(ConfigWeaponSoulPos.prototype,"ConfigWeaponSoulPos");var ConfigWingCommon=function(){function t(){}return t}();__reflect(ConfigWingCommon.prototype,"ConfigWingCommon");var ConfigWingLevel=function(){function t(){this.exp=0,this.pasSkillId=0}return t}();__reflect(ConfigWingLevel.prototype,"ConfigWingLevel");var ConfigWorldBoss=function(){function t(){this.zsLevel=0,this.level=0,this.fbid=0,this.bossId=0,this.shield=0,this.joinReward=0,this.shieldReward=0,this.belongReward=0,this.killReward=0,this.vip=0,this.samsaraLv=0}return t}();__reflect(ConfigWorldBoss.prototype,"ConfigWorldBoss");var ConfigWorldBossBase=function(){function t(){this.refreshHour=0,this.refreshMinute=0,this.levelUpTime=0,this.challengeCd=0,this.convertRate=0,this.maxGold=0,this.clearCdCost=[],this.lotteryTime=0,this.dayCount=[],this.buyCountPrice=[],this.rebornItem=0}return t}();__reflect(ConfigWorldBossBase.prototype,"ConfigWorldBossBase");var ConfigWorldBossKillMsg=function(){function t(){this.msg="",this.id=0}return t}();__reflect(ConfigWorldBossKillMsg.prototype,"ConfigWorldBossKillMsg");var ConfigWorldReward=function(){function t(){}return t}();__reflect(ConfigWorldReward.prototype,"ConfigWorldReward");var ConfigYouDang=function(){function t(){}return t}();__reflect(ConfigYouDang.prototype,"ConfigYouDang");var ConfigYuPei=function(){function t(){}return t}();__reflect(ConfigYuPei.prototype,"ConfigYuPei");var ConfigYuPeiBasic=function(){function t(){}return t}();__reflect(ConfigYuPeiBasic.prototype,"ConfigYuPeiBasic");var ConfigZhanLing=function(){function t(){}return t}();__reflect(ConfigZhanLing.prototype,"ConfigZhanLing");var ConfigZhuangBan=function(){function t(){}return t}();__reflect(ConfigZhuangBan.prototype,"ConfigZhuangBan");var ConfigZhuanSheng=function(){function t(){}return t}();__reflect(ConfigZhuanSheng.prototype,"ConfigZhuanSheng");var ConfigZhuanShengExp=function(){function t(){}return t}();__reflect(ConfigZhuanShengExp.prototype,"ConfigZhuanShengExp");var ConfigZhuanShengLevel=function(){function t(){}return t}();__reflect(ConfigZhuanShengLevel.prototype,"ConfigZhuanShengLevel");var ConfigZhulingAttr=function(){function t(){}return t}();__reflect(ConfigZhulingAttr.prototype,"ConfigZhulingAttr");var ConfigZhulingCost=function(){function t(){this.level=1,this.itemId=1,this.count=1}return t}();__reflect(ConfigZhulingCost.prototype,"ConfigZhulingCost");var DefineEff=function(){function t(){this.effid=0,this.souce=""}return t}();__reflect(DefineEff.prototype,"DefineEff");var FeatsStore=function(){function t(){}return t}();__reflect(FeatsStore.prototype,"FeatsStore");var FlameStamp=function(){function t(){}return t}();__reflect(FlameStamp.prototype,"FlameStamp");var FlameStampEffect=function(){function t(){this.reloadTime=0,this.exPower=0}return t}();__reflect(FlameStampEffect.prototype,"FlameStampEffect");var FlameStampLevel=function(){function t(){}return t}();__reflect(FlameStampLevel.prototype,"FlameStampLevel");var FlameStampMat=function(){function t(){}return t}();__reflect(FlameStampMat.prototype,"FlameStampMat");var FriendLimit=function(){function t(){this.sysLv=50,this.chatLv=50,this.friendListLen=50,this.chatsListLen=50,this.applyListLen=50,this.blacklistLen=50,this.contentLimit=50}return t}();__reflect(FriendLimit.prototype,"FriendLimit");var GGWWaveConf=function(){function t(){}return t}();__reflect(GGWWaveConf.prototype,"GGWWaveConf");var GuardGodWeaponConf=function(){function t(){}return t}();__reflect(GuardGodWeaponConf.prototype,"GuardGodWeaponConf");var GuildBattleConst=function(){function t(){}return t}();__reflect(GuildBattleConst.prototype,"GuildBattleConst");var GuildBattleDayAward=function(){function t(){}return t}();__reflect(GuildBattleDayAward.prototype,"GuildBattleDayAward");var GuildBattleDistributionAward=function(){function t(){}return t}();__reflect(GuildBattleDistributionAward.prototype,"GuildBattleDistributionAward");
var GuildBattleLevel=function(){function t(){}return t}();__reflect(GuildBattleLevel.prototype,"GuildBattleLevel");var GuildBattlePersonalAward=function(){function t(){}return t}();__reflect(GuildBattlePersonalAward.prototype,"GuildBattlePersonalAward");var GuildBattlePersonalRankAward=function(){function t(){}return t}();__reflect(GuildBattlePersonalRankAward.prototype,"GuildBattlePersonalRankAward");var HunGuConf=function(){function t(){this.openzhuanshenglv=0,this.openserverday=0,this.showzhuanshenglv=0,this.equipCount=0,this.hunyuCount=0}return t}();__reflect(HunGuConf.prototype,"HunGuConf");var HunGuEquip=function(){function t(){this.id=0,this.stage=0}return t}();__reflect(HunGuEquip.prototype,"HunGuEquip");var HunGuSuit=function(){function t(){this.id=0,this.count=0,this.stage=0,this.expower=0,this.specialAttrs=0}return t}();__reflect(HunGuSuit.prototype,"HunGuSuit");var HunYuEquip=function(){function t(){this.id=0,this.level=0}return t}();__reflect(HunYuEquip.prototype,"HunYuEquip");var ImbaConf=function(){function t(){}return t}();__reflect(ImbaConf.prototype,"ImbaConf");var ImbaJigsawConf=function(){function t(){}return t}();__reflect(ImbaJigsawConf.prototype,"ImbaJigsawConf");var IntegralStore=function(){function t(){}return t}();__reflect(IntegralStore.prototype,"IntegralStore");var PeakRaceCrossTime=function(){function t(){}return t}();__reflect(PeakRaceCrossTime.prototype,"PeakRaceCrossTime");var PeakRaceTime=function(){function t(){}return t}();__reflect(PeakRaceTime.prototype,"PeakRaceTime");var PrestigeBase=function(){function t(){}return t}();__reflect(PrestigeBase.prototype,"PrestigeBase");var PrestigeLevel=function(){function t(){}return t}();__reflect(PrestigeLevel.prototype,"PrestigeLevel");var PrivilegeData=function(){function t(){this.priviMoney=0,this.priviCardDays=0}return t}();__reflect(PrivilegeData.prototype,"PrivilegeData");var ReincarnateEquip=function(){function t(){}return t}();__reflect(ReincarnateEquip.prototype,"ReincarnateEquip");var ReincarnateEquipCompose=function(){function t(){}return t}();__reflect(ReincarnateEquipCompose.prototype,"ReincarnateEquipCompose");var ReincarnateSpirit=function(){function t(){}return t}();__reflect(ReincarnateSpirit.prototype,"ReincarnateSpirit");var ReincarnateSuit=function(){function t(){}return t}();__reflect(ReincarnateSuit.prototype,"ReincarnateSuit");var ReincarnationBase=function(){function t(){}return t}();__reflect(ReincarnationBase.prototype,"ReincarnationBase");var ReincarnationExchange=function(){function t(){}return t}();__reflect(ReincarnationExchange.prototype,"ReincarnationExchange");var ReincarnationLevel=function(){function t(){}return t}();__reflect(ReincarnationLevel.prototype,"ReincarnationLevel");var ServerTips=function(){function t(){}return t}();__reflect(ServerTips.prototype,"ServerTips");var ShenShouBase=function(){function t(){}return t}();__reflect(ShenShouBase.prototype,"ShenShouBase");var TitleConf=function(){function t(){}return t}();__reflect(TitleConf.prototype,"TitleConf");var WanBaGiftbagBasic=function(){function t(){}return t}();__reflect(WanBaGiftbagBasic.prototype,"WanBaGiftbagBasic");var WeaponSoulItemAttr=function(){function t(){this.id=0,this.attr=[]}return t}();__reflect(WeaponSoulItemAttr.prototype,"WeaponSoulItemAttr");var WeaponSoulSuit=function(){function t(){this.id=0,this.level=0,this.attr=[],this.ex_attr=[],this.skillname="",this.skillicon="",this.skilldesc=""}return t}();__reflect(WeaponSoulSuit.prototype,"WeaponSoulSuit");var ZhanLingBase=function(){function t(){}return t}();__reflect(ZhanLingBase.prototype,"ZhanLingBase");var ZhanLingEquip=function(){function t(){}return t}();__reflect(ZhanLingEquip.prototype,"ZhanLingEquip");var ZhanLingLevel=function(){function t(){}return t}();__reflect(ZhanLingLevel.prototype,"ZhanLingLevel");var ZhanLingSkill=function(){function t(){}return t}();__reflect(ZhanLingSkill.prototype,"ZhanLingSkill");var ZhanLingSuit=function(){function t(){}return t}();__reflect(ZhanLingSuit.prototype,"ZhanLingSuit");var ZhanLingTalent=function(){function t(){}return t}();__reflect(ZhanLingTalent.prototype,"ZhanLingTalent");var ZhiZunEquipLevel=function(){function t(){this.ex_power=0}return t}();__reflect(ZhiZunEquipLevel.prototype,"ZhiZunEquipLevel");var ZhiZunLinkLevel=function(){function t(){this.ex_power=0}return t}();__reflect(ZhiZunLinkLevel.prototype,"ZhiZunLinkLevel");var ZhuangBanId=function(){function t(){}return t}();__reflect(ZhuangBanId.prototype,"ZhuangBanId");var BagItemBase=function(t){function e(){var e=t.call(this)||this;return e.skinName="SkinItem2",e}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.getImg&&this.getImg.parent&&this.getImg.parent.removeChild(this.getImg),this.bless&&this.bless.parent&&this.bless.parent.removeChild(this.bless),this.selectFrame&&this.selectFrame.parent&&this.selectFrame.parent.removeChild(this.selectFrame)},e.prototype.setItemBaseWidht=function(t){this.nameTxt.x=0-(100-t.width)/2,this.nameTxt.width=100},e}(ItemBase);__reflect(BagItemBase.prototype,"BagItemBase"),window.BagItemBase=BagItemBase;var FilterUtil=function(){function t(){}return Object.defineProperty(t,"grayFilter",{get:function(){return new egret.ColorMatrixFilter([.3,.6,0,0,0,.3,.6,0,0,0,.3,.6,0,0,0,0,0,0,1,0])},enumerable:!0,configurable:!0}),Object.defineProperty(t,"grayFilter1",{get:function(){return new egret.ColorMatrixFilter([.33,.59,.11,0,0,.33,.59,.11,0,0,.33,.59,.11,0,0,0,0,0,1,0])},enumerable:!0,configurable:!0}),Object.defineProperty(t,"ARRAY_GRAY_FILTER",{get:function(){return[t.grayFilter1]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"greenFilter",{get:function(){return new egret.ColorMatrixFilter([1,0,0,0,0,0,1,0,0,100,0,0,1,0,0,0,0,0,1,0])},enumerable:!0,configurable:!0}),Object.defineProperty(t,"greenFilter1",{get:function(){return new egret.ColorMatrixFilter([.1,0,0,0,0,0,.80078125,0,0,20,0,0,-1,0,0,0,0,0,1,0])},enumerable:!0,configurable:!0}),Object.defineProperty(t,"ARRAY_GREEN_FILTER",{get:function(){return[t.greenFilter1]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"blurFilter",{get:function(){return new egret.BlurFilter(10,10,2)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"ARRAY_BLUR_FILTER",{get:function(){return[t.blurFilter]},enumerable:!0,configurable:!0}),t.SelectFilter=new egret.GlowFilter(16776960,1,6,6,4),t}();__reflect(FilterUtil.prototype,"FilterUtil");var PriceIcon=function(t){function e(){var e=t.call(this)||this;return e.skinName="SkinPriceIcon",e}return __extends(e,t),e.prototype.childrenCreated=function(){this.priceLabel.textColor=65280},e.prototype.getPrice=function(){return this._price},e.prototype.setPrice=function(t,e){if(void 0===e&&(e=-1),t!=this._price||-1!=e)if(this._price=t,e>=0){var i="";i=e>=t?"#00ff00":"#e40000";var s="#ffffff";this.priceLabel.textFlow=TextFlowMaker.generateTextFlow("<font color="+i+">"+e+"</font><font color="+s+">/"+t+"</font> ")}else this.priceLabel.text=""+this._price},e.prototype.setText=function(t){this.priceLabel.textFlow=(new egret.HtmlTextParser).parser(t)},e.prototype.setData=function(t){var e="";if(t){var i=t;if(0==i.type)switch(i.id){case MoneyConst.exp:e="exp_png";break;case MoneyConst.gold:e="szjinbi";break;case MoneyConst.yuanbao:e="szyuanbao";break;case MoneyConst.fame:e="fame";break;case MoneyConst.soul:e="soul";break;case MoneyConst.wing:e="yumao_png";break;case MoneyConst.piece:e="500008_png"}else if(1==i.type)switch(i.id){case 200001:e="yumao_png";break;case 200002:e="forge";break;case 200003:e="gem";break;case 200004:e="spirit";break;case 200005:e="vigor";break;case 200006:e="shield"}this._type=i.id,this.setPrice(i.count)}else if(t){var s=t;switch(s.itemConfig.id){case 200001:e="yumao_png";break;case 200002:e="szyuanbao";break;case 200003:e="szyuanbao";break;case 200004:e="szyuanbao";break;case 200005:e="szyuanbao";break;case 200006:e="szyuanbao"}this._type=s.itemConfig.id,this.setPrice(s.count)}this.iconImg.source=e},e.prototype.getType=function(){return this._type},e.prototype.setType=function(t){if(this._type!=t){this._type=t;var e="";switch(this._type){case MoneyConst.exp:e="exp";break;case MoneyConst.gold:e="szjinbi";break;case MoneyConst.yuanbao:e="szyuanbao";break;case MoneyConst.fame:e="fame";break;case MoneyConst.soul:e="soul";break;case MoneyConst.wing:e="yumao_png"}this.iconImg.source=e}},Object.defineProperty(e.prototype,"labelColor",{get:function(){return this._labelColor},set:function(t){this._labelColor!=t&&(this._labelColor=t,this.priceLabel.textColor=this._labelColor)},enumerable:!0,configurable:!0}),e}(BaseComponent);__reflect(PriceIcon.prototype,"PriceIcon"),window.PriceIcon=PriceIcon;var Actor=function(t){function e(){var e=t.call(this)||this;return e._power=0,e._gold=0,e._yb=0,e._feats=0,e._togeatter1=-1,e._togeatter2=-1,e._weiWang=0,e._chip=0,e.sysId=PackageID.Default,e.regNetMsg(1,e.postInit),e.regNetMsg(7,e.postExp),e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.postExp=function(t){var e=this._level;this._level=t.readInt(),this._exp=t.readInt();var i=t.readInt();if(e<this._level){this.postLevelChange(),SDkMsg.GetInstance().SendReportLevelUp();var s=EntityMgr.ins().getNoDieRole();if(!s)return;var n=new McAnimation;n.playFile(ResDirMgr.RES_DIR_EFF+"levelUpEffect",1),s.addChild(n)}return i},e.prototype.postInit=function(t){e.handle=t.readDouble(),e.actorID=t.readInt(),GameServer.serverID=t.readInt(),this.postNameChange(t.readUTFBytes(33)),this._level=t.readInt(),this._exp=t.readInt(),t.readDouble(),this.postGoldChange(t.readNumber()),this.postYbChange(t.readNumber()),UserVip.ins().lv=t.readInt(),this.postSoulChange(t.readNumber()),UserBagSystem.ins().bagNum=t.readInt(),this.postFeatsChange(t.readNumber()),e.runeShatter=t.readNumber(),e.runeExchange=t.readNumber(),this.postUpdateTogeatter(t.readNumber(),1),this.postUpdateTogeatter(t.readNumber(),2),this.postWeiWang(t.readInt()),SysSettingData.ins().init()},e.prototype.postNameChange=function(t){this._myName!=t&&(this._myName=t)},e.prototype.postGoldChange=function(t){if(this._gold!=t){if(this._gold>0){var e=t-this._gold;if(e>0){var i="|C:0xffd93f&T:Äá»“ng Tiá»n  +"+e+"|";UserTips.ins().showTips(i)}}this._gold=t}},e.prototype.postYbChange=function(t){if(this._yb!=t){if(this._yb>0){var e=t-this._yb;if(e>0){var i="|C:0xffd93f&T:NguyÃªn Báº£o  +"+e+"|";UserTips.ins().showTips(i)}}this._yb=t}},e.prototype.postFeatsChange=function(t){if(this._feats!=t){if(this._feats>0){var e=t-this._feats,i=parseInt(e.toString());if(i>0){var s="|C:0xffd93f&T:Nháº­n Ä‘Æ°á»£c "+i+" CÃ´ng HuÃ¢n|";UserTips.ins().showTips(s)}}this._feats=t}},e.prototype.postZsExpChange=function(t){var e="|C:0x00ff00&T:Tu Vi+"+t+"|";UserTips.ins().showTips(e)},e.prototype.postUpdateTogeatter=function(t,e){var i=0;if(i=1==e?this._togeatter1:this._togeatter2,i!=t){if(-1!=i){var s=t-i;if(s>0){var n=1==e?AwardsData.getNameOfCurrency(MoneyConst.punch1):AwardsData.getNameOfCurrency(MoneyConst.punch2),o="|C:0xffd93f&T:Nháº­n Ä‘Æ°á»£c"+s+n+"|";UserTips.ins().showTips(o)}}i=t}return 1==e?this._togeatter1=i:this._togeatter2=i,{value:t,type:e}},e.prototype.postLevelChange=function(){},e.prototype.postSoulChange=function(t){if(this._soul>0){var e=t-this._soul;if(e>0){var i="Nháº­n Ä‘Æ°á»£c|C:0xd242fb&T:Tinh Luyá»‡n Tháº¡ch x "+e+"|";UserTips.ins().showTips(i)}}this._soul=t},e.prototype.postPowerChange=function(t){this._power!=t&&(this._power<t&&this._power>0&&UserTips.ins().showBoostPower(t,this._power),this._power=t)},e.prototype.postWeiWang=function(t){this._weiWang>0&&t-this._weiWang>0&&UserTips.ins().showTips("|C:0xff00ff&T:Nháº­n Ä‘Æ°á»£c"+(t-this._weiWang)+AwardsData.getNameOfCurrency(MoneyConst.weiWang)+"|"),this._weiWang=t},e.prototype.postChip=function(t){this._chip>0&&t-this._chip>0&&UserTips.ins().showTips("|C:0xff00ff&T:Nháº­n Ä‘Æ°á»£c"+(t-this._chip)+AwardsData.getNameOfCurrency(MoneyConst.chip)+"|"),this._chip=t},e.canZhuanSheng=function(){return this.ins()._level>=this.zhuanShengLv},Object.defineProperty(e,"level",{get:function(){return this.ins()._level},enumerable:!0,configurable:!0}),Object.defineProperty(e,"exp",{get:function(){return this.ins()._exp},enumerable:!0,configurable:!0}),Object.defineProperty(e,"power",{get:function(){return this.ins()._power},enumerable:!0,configurable:!0}),Object.defineProperty(e,"myName",{get:function(){return this.ins()._myName},enumerable:!0,configurable:!0}),Object.defineProperty(e,"gold",{get:function(){return this.ins()._gold},enumerable:!0,configurable:!0}),Object.defineProperty(e,"yb",{get:function(){return this.ins()._yb},enumerable:!0,configurable:!0}),Object.defineProperty(e,"soul",{get:function(){return this.ins()._soul},enumerable:!0,configurable:!0}),Object.defineProperty(e,"feats",{get:function(){return this.ins()._feats},enumerable:!0,configurable:!0}),Object.defineProperty(e,"togeatter1",{get:function(){return this.ins()._togeatter1<0?0:this.ins()._togeatter1},enumerable:!0,configurable:!0}),Object.defineProperty(e,"togeatter2",{get:function(){return this.ins()._togeatter2<0?0:this.ins()._togeatter2},enumerable:!0,configurable:!0}),Object.defineProperty(e,"samsaraLv",{get:function(){var t=SamsaraModel.ins().samsaraInfo;return t?t.lv:0},enumerable:!0,configurable:!0}),Object.defineProperty(e,"weiWang",{get:function(){return this.ins()._weiWang},enumerable:!0,configurable:!0}),Object.defineProperty(e,"chip",{get:function(){return this.ins()._chip},enumerable:!0,configurable:!0}),e.zhuanShengLv=80,e.runeShatter=0,e.runeExchange=0,e}(SystemBase);__reflect(Actor.prototype,"Actor");var GameSystem;!function(t){t.actor=Actor.ins.bind(Actor)}(GameSystem||(GameSystem={}));var ViewMgr=function(t){function e(){var e=t.call(this)||this;return e.filters=["TipsView","UIView1_1","GameSceneView","ChatsMainUI","MainView"],e.closeTopFilters=[],e._regesterInfo={},e._views={},e._hCode2Key={},e._opens=[],e._constView=["GameSceneView","ChatsMainUI","UIDownView","TipsView","MainView"],e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.clear=function(){this.closeAll(),this._views={}},e.prototype.reg=function(t,e){if(null!=t){var i=egret.getQualifiedClassName(t);this._regesterInfo[i]||(this._regesterInfo[i]=[t,e])}},e.prototype.destroy=function(t){var e=this._hCode2Key[t];delete this._views[e],delete this._hCode2Key[t]},e.prototype.getKey=function(t){var e="";if("string"==typeof t)e=t;else if("function"==typeof t)e=egret.getQualifiedClassName(t);else if(t instanceof EuiViewBase)for(var i=Object.keys(this._views),s=0,n=i.length;n>s;s++){var o=i[s];if(this._views[o]==t){e=o;break}}else debug.log("Má»Ÿ giao diá»‡n chá»‰ há»— trá»£ tÃªn lá»›p vÃ  dáº¡ng chuá»—i tÃªn lá»›p, Ä‘Ã³ng giao diá»‡n chá»‰ há»— trá»£ tÃªn lá»›p, chuá»—i tÃªn lá»›p vÃ  thá»±c thá»ƒ lá»›p, mÃ£ lá»—i:"+t);return e},e.prototype.viewOpenCheck=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];if("RechargeFirstWin"==t||"RechargeTwoWin"==t||"ChargeFirstWinPanel"==t||"VipView"==t){if(0==SDkMsg.isShowRecharge)return!1;if(SDkMsg.isWXSmallGame&&1==SDkMsg.GetInstance().isIOSAuditVersion()){var s=WarnView.show(SDkMsg.kefu_qq,function(){},null,null,null,"sure");return s.setBtnLabel("XÃ¡c nháº­n"),!1}}var n=!0,o=this._regesterInfo[t];if(null!=o){var a=o[0],r=a.openCheck;null!=r&&(n=r.apply(void 0,e))}return n},e.prototype.open=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];var s=this.getKey(t);if(!this.viewOpenCheck.apply(this,[s].concat(e)))return null;var n=this.openEasy(s,e);return-1==this.filters.indexOf(s)&&debug.log("Báº¯t Ä‘áº§u má»Ÿ cá»­a sá»•:"+s),n&&(this.checkOpenView(n),this.setUIEff(s)),n},e.prototype.setUIEff=function(t){if(t){var e=this.getView(t);e&&e.playUIEffect()}},e.prototype.openEasy=function(t,e){void 0===e&&(e=null);var i=this.getKey(t),s=this._views[i],n=this._regesterInfo[i];if(!s){if(Assert(n,"ViewMgr.openEasy class "+i+" is null!!"))return;s=new n[0],this._views[i]=s,this._hCode2Key[s.hashCode]=i}if(null==s)return ErrLog.trace("UI_"+i+" khÃ´ng tá»“n táº¡i"),null;for(var o=0,a=s.exclusionWins;o<a.length;o++){var r=a[o];this.closeEasy(r)}s.isShow()||s.isInit()?(s.addToParent(n[1]),s.open.apply(s,e)):(DropLineLoading.ins(),s.loadResource(function(){s.addToParent(n[1]),s.setVisible(!1)}.bind(this),function(){s.initUI(),s.initData(),s.open.apply(s,e),s.setVisible(!0)}.bind(this)));var h=this._opens.indexOf(i);return h>=0&&this._opens.splice(h,1),this._opens.push(i),s},e.prototype.checkOpenView=function(t){t.isTopLevel&&t.parent!=LayerMgr.UI_Popup&&(SoundUtil.ins().playEffectMC(SoundUtil.WINDOW),GameLogicManage.ins().postViewOpen(1),this.closeEasy(ChatsMainUI),this.closeEasy(ChatsWin))},e.prototype.close=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];var s=this.getKey(t);this.closeEx(s,e)},e.prototype.closeEx=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];if(t){var s=this.getView(t);if(s){var n=this;s.closeEx(function(){var i=n.closeEasy(t,e);i&&n.checkCloseView()})}}},e.prototype.closeLastTopView=function(){for(var t=this._opens.length,i=t-1;i>=0;i--){var s=this.getView(this._opens[i]);if(s&&s.isTopLevel){var n=e.ins().getView(RoleWinPanel);s instanceof RoleWinPanel&&n.getWingPanelTips()?n.doOpenIndexWin(2):this.close(s);break}}},e.prototype.closeEasy=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];if(!this.isShow(t))return null;var s=this.getKey(t),n=this.getView(s);if(n){var o=this._opens.indexOf(s);o>=0&&this._opens.splice(o,1),n.close.apply(n,e),n.$onClose.apply(n),n.removeFromParent()}return n},e.prototype.checkCloseView=function(){for(var t=!1,e=0,i=this._opens;e<i.length;e++){var s=i[e],n=this.getView(s);if(n&&n.isTopLevel){t=!0;break}}t||(SoundUtil.WINDOW_OPEN=!1,GameLogicManage.ins().postViewOpen(0),SceneMgr.ins().getSceneName()==SceneMgr.MAIN&&(this.isShow(GameSceneView)||this.openEasy(GameSceneView),this.isShow(ChatsMainUI)||this.openEasy(ChatsMainUI)))},Object.defineProperty(e,"gamescene",{get:function(){return e.ins().getView(GameSceneView)},enumerable:!0,configurable:!0}),e.prototype.getView=function(t){var e=this.getKey(t);return this._views[e]},e.prototype.closeAll=function(){for(;this._opens.length;)this.closeEasy(this._opens[0],[]);this.destroyAllNotShowView(),this.checkCloseView()},e.prototype.closeTopLevel=function(){var t=this.closeTopFilters;this.closeTopFilters=[];for(var e=this._opens.length-1;e>=0;e--){var i=this._opens[e];if(!(t.indexOf(i)>=0)){var s=this.getView(i),n=1e6;isNaN(parseInt(i))||(n=parseInt(i)),s&&s.isTopLevel&&this.closeEasy(i,[])}}this.checkCloseView()},e.prototype.openNum=function(){return this._opens.length},e.prototype.isShow=function(t){return this._opens.indexOf(this.getKey(t))>=0},e.prototype.hasTopView=function(){for(var t=0,e=this._opens;t<e.length;t++){var i=e[t],s=this.getView(i);if(s&&s.isTopLevel)return!0}return!1},e.prototype.getAllOperWin=function(){return this._opens},e.prototype.destroyAllNotShowView=function(){for(var t in this._hCode2Key){var e=this._hCode2Key[t];if(-1==this._constView.indexOf(e)&&-1==this._opens.indexOf(e)){var i=this.getView(e);i&&i.destoryView_a94&&i.destoryView_a94(!1)}}},e}(ClassBase);__reflect(ViewMgr.prototype,"ViewMgr");var GuideViewBase=function(t){function e(){var e=t.call(this)||this;return e.clickCD=!0,e.otherMc=[],e.rect=new egret.Rectangle(1,1,1,1),e.infoGroup=new eui.Group,e.infoGroup.touchEnabled=!1,e.infoGroup.touchChildren=!1,e.addChild(e.infoGroup),e}return __extends(e,t),e.prototype.drawMask=function(){if(!this.shapeMasks){this.shapeMasks=[];for(var t=0;8>t;t++)this.shapeMasks[t]=new egret.Shape,this.shapeMasks[t].touchEnabled=!0}var e=this.rect,i=e.x,s=e.width,n=StageUtils.ins().getWidth()-e.right,o=e.y,a=e.height,r=StageUtils.ins().getHeight()-e.bottom;this.drawShape(this.shapeMasks[0],new egret.Rectangle(0,0,i,o)),this.drawShape(this.shapeMasks[1],new egret.Rectangle(e.x,0,s,o)),this.drawShape(this.shapeMasks[2],new egret.Rectangle(e.right,0,n,o)),this.drawShape(this.shapeMasks[3],new egret.Rectangle(0,e.topLeft.y,i,a)),this.drawShape(this.shapeMasks[4],new egret.Rectangle(e.bottomRight.x,e.topLeft.y,n,a)),this.drawShape(this.shapeMasks[5],new egret.Rectangle(0,e.bottomRight.y,i,r)),this.drawShape(this.shapeMasks[6],new egret.Rectangle(e.x,e.bottomRight.y,s,r)),this.drawShape(this.shapeMasks[7],new egret.Rectangle(e.right,e.bottomRight.y,n,r))},e.prototype.drawShape=function(t,e){t.graphics.clear(),t.graphics.beginFill(0,0),t.graphics.drawRect(e.x,e.y,e.width,e.height),t.graphics.endFill(),this.addChild(t)},e.prototype.onResize=function(){if(this.target){var t=this.target.localToGlobal();return(this.rect.x!=t.x||this.rect.y!=t.y||this.rect.width!=this.target.width||this.rect.height!=this.target.height)&&(this.refurbish(),this.drawMask()),!1}},e.prototype.onClick=function(t){var e=this;if(this.rect.contains(t.stageX,t.stageY)){this.clickCD&&(this.clickCD=!1,TimerMgr.ins().doNext(function(){e.dispatchEventWith(egret.Event.CHANGE)},this));for(var i=0;i<this.otherMc.length;i++)egret.Tween.removeTweens(this.otherMc[i]),DisplayUtils.removeFromParent(this.otherMc[i]);this.clicking=!1}else{if(GuideUtils.ins().clickOut(),this.clicking)return;this.clicking=!0,this.otherMc.length=2;for(var s=function(t){n.otherMc[t]||(n.otherMc[t]=new McAnimation),n.otherMc[t].parent||n.addChild(n.otherMc[t]),n.otherMc[t].scaleX=2,n.otherMc[t].scaleY=2,n.otherMc[t].x=n.infoGroup.x,n.otherMc[t].y=n.infoGroup.y;var e=egret.Tween.get(n.otherMc[t]),i=n;e.wait(240*t).call(function(){i.otherMc[t].playFile(ResDirMgr.RES_DIR_EFF+"guidecircle",1,function(){egret.Tween.removeTweens(i.otherMc[t]),DisplayUtils.removeFromParent(i.otherMc[t]),t==i.otherMc.length-1&&(i.clicking=!1)})})},n=this,i=0;i<this.otherMc.length;i++)s(i)}},e.prototype.refurbish=function(){this.show(this.target)},e.prototype.show=function(t){if(null!=t){this.target=t;var e=t.localToGlobal();this.rect.x=e.x,this.rect.y=e.y,this.rect.width=t.width?t.width:60,this.rect.height=t.height?t.height:60,this.drawMask(),this.addChild(this.infoGroup),this.infoGroup.x=e.x+(this.rect.width>>1),this.infoGroup.y=e.y+(this.rect.height>>1);var i=StageUtils.ins().getStage();i.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this,!0,0),egret.stopTick(this.onResize,this),egret.startTick(this.onResize,this)}},e.prototype.close=function(){this.target=null,this.rect.x=this.rect.y=this.rect.width=this.rect.height=1;var t=StageUtils.ins().getStage();t.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this,!0),egret.stopTick(this.onResize,this)},e}(egret.DisplayObjectContainer);__reflect(GuideViewBase.prototype,"GuideViewBase");var CustomActorMonster=function(t){function e(){var e=t.call(this)||this;return e.AI_STATE=AI_State.Stand,e.filterDic={},e.publicCD=0,e.nextPatrolTick=0,e.myKill=!1,e.isShowBody=!0,e.canMove=!1,e.isHardStraightNum=0,e.dieTime=0,e.serverAttackTime=0,e.serverAttackTargetHandle=-1,e.nowTime=0,e.moveRange=-1,e.moveLimTime=-1,e.moveMaxTime=-1,e.touchEnabled=!0,e.touchChildren=!1,e.buffList={},e.buffEff={},e.damageOverTimeList={},e.createTweenObj(),e.effs={},e.addShadow(),e._hpBar=new eui.ProgressBar,e._hpBar.skinName="SkinbloodBar",e._hpBar.anchorOffsetY=0,e._hpBar.visible=!1,e._hpBar.labelFunction=function(){return""},e._hpBar.anchorOffsetX=e._hpBar.width>>1,e._nameGroup=new eui.Group,e._nameGroup.touchEnabled=!1,e._nameGroup.height=30,e._nameGroup.width=260,e._nameGroup.anchorOffsetY=Math.floor(e._nameGroup.height+2),e._nameGroup.anchorOffsetX=Math.floor(e._nameGroup.width>>1),e._nameTxt=new eui.Label,e._nameTxt.textAlign="center",e._nameTxt.size=14,e._nameTxt.stroke=1,e._nameTxt.strokeColor=0,e._nameTxt.textColor=15589033,e._nameTxt.bottom=0,e._nameTxt.horizontalCenter=0,e._nameGroup.addChild(e._nameTxt),e._nameGroup.visible=!1,e.bodyTail=new ActorBodySyncTailEffect,e.bodyTail.setData(e,ViewMgr.gamescene.map.tailLayer),e}return __extends(e,t),e.prototype.$onRemoveFromStage=function(){t.prototype.$onRemoveFromStage.call(this),this._hpBar&&this._hpBar.parent&&this._hpBar.parent.removeChild(this._hpBar)},e.prototype.createTweenObj=function(){var t=this;this.dieTweenObj={set alpha(e){e?t.alpha=e:t.alpha=1},get alpha(){return t.alpha}},this.moveTweenObj={set x(e){t.x=e>>0},set y(e){t.y=e>>0},get x(){return t.x},get y(){return t.y}}},Object.defineProperty(e.prototype,"infoModel",{get:function(){return this._infoModel},set:function(t){this._infoModel=t,-1!=GlobalConfig.FlameStamp.monsterId.indexOf(t.configID)?(this.isLyJz=!0,this._lyMark||(this._lyMark=new LyMarkEffect(this._body,t))):this._lyMark&&this.clearLyMark()},enumerable:!0,configurable:!0}),e.prototype.setCharName=function(t){this._nameTxt.textFlow=TextFlowMaker.generateTextFlow(t)},e.prototype.setNameTxtColor=function(t){this._nameTxt.textColor=t},e.prototype.usedLyMarkSkill=function(){this._lyMark&&this._lyMark.usedLyMarkSkillOperate()},e.prototype.playAction=function(e,i){(this._state!=e||this.isAtkAction())&&(this.hasFilter(EntityFilter.hard)&&e!=ModuleAction.DIE||(e!=ModuleAction.HIT&&e!=ModuleAction.DIE||this.infoModel.type!=EntityType.Monster||!GlobalConfig.ConfigMonsters[this.infoModel.configID]||4!=GlobalConfig.ConfigMonsters[this.infoModel.configID].type)&&t.prototype.playAction.call(this,e,i))},e.prototype.playActionByNoCallBack=function(e){if(1==this.isMy){var i=egret.getTimer();this.nowTime=i}(this._state!=e||this.isAtkAction())&&(this.hasFilter(EntityFilter.hard)&&e!=ModuleAction.DIE||(e!=ModuleAction.HIT&&e!=ModuleAction.DIE||this.infoModel.type!=EntityType.Monster||!GlobalConfig.ConfigMonsters[this.infoModel.configID]||4!=GlobalConfig.ConfigMonsters[this.infoModel.configID].type)&&t.prototype.playAction.call(this,e))},e.prototype.stopMove=function(){0==this.isJump&&(this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.canMove=!1,egret.Tween.removeTweens(this.moveTweenObj),this.updataMoveXY())},Object.defineProperty(e.prototype,"dir",{get:function(){if(this.infoModel){var t=this.infoModel.getDir();return 0>t?this._dir:t}return this._dir},set:function(t){this._dir==t||this.hasFilter(EntityFilter.hard)||this._state!=ModuleAction.DIE&&(this._dir=t,this.loadBody())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"action",{get:function(){return this._state},set:function(t){this._state!=ModuleAction.DIE&&(this._state=t)},enumerable:!0,configurable:!0}),e.prototype.getResDir=function(t){var e=2*(this._dir-4);0>e&&(e=0);var i=(this._dir-e,GlobalFun.getDir(this._dir));return i},Object.defineProperty(e.prototype,"moveSpeed",{get:function(){return this.infoModel?this.infoModel.getAtt(AttributeType.atMoveSpeed)/1e3*GameMap.CELL_SIZE:0},enumerable:!0,configurable:!0}),e.prototype.hram=function(t){this.getHP()<=0||(this._hpBar.value=Math.min(this._hpBar.value-t,this.infoModel.getAtt(AttributeType.atMaxHp)),t>0&&t<this.infoModel.getAtt(AttributeType.atMaxHp)&&(this._hpBar.visible=!0,this.updataHpShow()))},e.prototype.getHP=function(){return this.infoModel.getAtt(AttributeType.atHp)},e.prototype.getRealHp=function(){return this.infoModel.getAtt(AttributeType.atHp)},e.prototype.reset=function(){egret.Tween.removeTweens(this),egret.Tween.removeTweens(this.dieTweenObj),egret.Tween.removeTweens(this.moveTweenObj),TimerMgr.ins().removeAll(this),this._state=ModuleAction.STAND,this.AI_STATE=AI_State.Stand,this.dir=4,this._hpBar.slideDuration=500,this.myKill=!1,this.isHardStraight=!1,this.isHardStraightNum=0,this.dieTime=0,this._hpBar.visible=this._nameGroup.visible=!1,this.updataHpShow(),this.removeAllFilters()},e.prototype.destruct=function(){TimerMgr.ins().removeAll(this),egret.Tween.removeTweens(this),egret.Tween.removeTweens(this.dieTweenObj),egret.Tween.removeTweens(this.moveTweenObj),this.destroy(),ObjPool.push(this)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.deadDelay(),egret.Tween.removeTweens(this),egret.Tween.removeTweens(this.dieTweenObj),egret.Tween.removeTweens(this.moveTweenObj),this.alpha=1,this.AI_STATE=AI_State.Stand,this._nameTxt.textColor=15589033,this.clearLyMark(),this.removeAllEffect(),this.removeAllFilters(),TimerMgr.ins().removeAll(this),this.stopMove(),DisplayUtils.removeFromParent(this),this.bodyTail.dispose()},e.prototype.deadDelay=function(){this._hpBar.slideDuration=0,this._hpBar.value=0,this.removeHardStraight();for(var t in this.damageOverTimeList){var e=this.damageOverTimeList[t];this.deleteDamageOverTimer(e)}this.removeAllBuff(),this.atking=!1,this.haloMc&&DisplayUtils.removeFromParent(this.haloMc)},e.prototype.clearLyMark=function(){this._lyMark&&(this._lyMark.destruct(),this._lyMark=null)},e.prototype.addHardStraight=function(t){this.isHardStraight=!0,this.isHardStraightNum=0,TimerMgr.ins().doTimer(t,1,this.removeHardStraight,this)},e.prototype.removeHardStraight=function(){this.isHardStraight=!1,this.isHardStraightNum=0},e.prototype.initBody=function(t){this.addMc(CharMcOrder.BODY,t),ResourceMgr.ins().reloadImg(this.shadow)},Object.defineProperty(e.prototype,"isPlaying",{get:function(){return this._body.isPlaying},enumerable:!0,configurable:!0}),e.prototype.isAtkAction=function(){return this._state==ModuleAction.ATTACK||this._state==ModuleAction.CAST},e.prototype.playBody=function(e){t.prototype.playBody.call(this,e)},e.prototype.loadBody=function(){this.isShowBody&&t.prototype.loadBody.call(this)},e.prototype.loadOther=function(e){this.isShowBody&&t.prototype.loadOther.call(this,e)},e.prototype.loadNoDir=function(e){this.isShowBody&&t.prototype.loadNoDir.call(this,e)},e.prototype.showBodyContainer=function(){if(!this.isShowBody){this.isShowBody=!0,this.addChildAt(this._bodyContainer,1),this.addChildAt(this._undergroundContainer,1),this.loadBody();for(var t in this._disOrder){var e=+t;this._disOrder[t]instanceof McAnimation&&this.hasDir.indexOf(e)<0&&this.loadNoDir(e)}this.updateTitle(),this._lyMark&&this._lyMark.showBall()}},e.prototype.hideBodyContainer=function(){this.isShowBody&&(this.isShowBody=!1,this._bodyContainer.$parent&&this.removeChild(this._bodyContainer),this._undergroundContainer.$parent&&this.removeChild(this._undergroundContainer),this.updateTitle(),this._lyMark&&this._lyMark.hideBall())},e.prototype.getIsShowBody=function(){return this.isShowBody},e.prototype.resetStand=function(){this.isAtkAction()&&this.playAction(ModuleAction.STAND)},e.prototype.hasEffById=function(t){return this.effs&&this.effs[t]?!0:!1},e.prototype.updateBlood=function(t){void 0===t&&(t=!1),this.infoModel&&(this._hpBar.maximum=this.infoModel.getAtt(AttributeType.atMaxHp),(t||!(EntityMgr.ins().getTeamCount(Team.WillEntity)>0&&0==GameMap.fubenID))&&(this._hpBar.value=this.infoModel.getAtt(AttributeType.atHp)))},e.prototype.updateTitle=function(){var t=this.infoModel,e=GlobalConfig.ConfigMonsters[t.configID],i=e&&e.titleId;if(this.removeTitle(),this.getIsShowBody()&&i&&i>0){var s=GlobalConfig.MonsterTitleConf[i];if(s)if(s.img)null==this._title&&(this._title=new eui.Image,this._title.anchorOffsetX=.5,this._title.x=-94,this.titleCantainer.addChild(this._title)),this._title&&this._title.texture&&this._title.texture.bitmapData?this._title.x=this._title.texture.bitmapData.width/2:this._title.x=-94,s.anchorOffsetY?this._title.anchorOffsetY=s.anchorOffsetY:this._title.anchorOffsetY=100,this._title.source&&(this._title.source=s.img);else if(s.eff){null==this._titleMc&&(this._titleMc=ObjPool.pop("McAnimation"),this._titleMc.anchorOffsetX=0,this.titleCantainer.addChild(this._titleMc));var n=ResDirMgr.RES_DIR_EFF+s.eff;this.playFile(this._titleMc,n),s.anchorOffsetY?this._titleMc.anchorOffsetY=s.anchorOffsetY:this._titleMc.anchorOffsetY=80}}},e.prototype.updataTitlePos=function(){this._title&&this._title.texture&&this._title.texture.bitmapData&&(this._title.x=-Math.floor(this._title.texture.bitmapData.width/2))},e.prototype.updataTitleCantainerY=function(){if(this.boyMc&&this.boyMc.movieClipData){var t=this.boyMc.currentFrame,e=this.boyMc.movieClipData.getKeyFrameData(t),i=this.boyMc.movieClipData.textureData[e.res],s=e.res.indexOf("stand");i&&-1!=s&&(this.titleCantainer.anchorOffsetY=Math.floor(i.h*this._bodyContainer.scaleX+10),this.updataMoveXY())}},e.prototype.removeTitle=function(){this._title&&(this._title.source=""),this._titleMc&&(this._titleMc.destroy(),this._titleMc=null)},e.prototype.onDead=function(t){var e=this;this.stopMove(),this.showBlood(!1),this.showName(!1),this.removeTitle();
var i;if(i=EntityMgr.ins().getNoDieRole()){var s=void 0;s=this.x-i.x>0?200+this.x:this.x-200;var n=void 0;n=this.y-i.y>0?160+this.y:this.y-160;var o=egret.Tween.get(this);t?o.to({x:s,y:n},180).call(function(){e.playAction(ModuleAction.DIE),TimerMgr.ins().doTimer(300,1,t,e),e.updataMoveXY()}):o.to({x:s,y:n},1e3).call(function(){e.playAction(ModuleAction.DIE),e.updataMoveXY()})}else t?(this.playAction(ModuleAction.DIE),TimerMgr.ins().doTimer(300,1,t,this)):this.playAction(ModuleAction.DIE)},Object.defineProperty(e.prototype,"isCanAddBlood",{get:function(){return this._hpBar.value/this._hpBar.maximum<.8},enumerable:!0,configurable:!0}),e.prototype.damageOverTime=function(t){var e=t instanceof egret.Timer?t:t.currentTarget;e.currentCount==e.repeatCount&&this.deleteDamageOverTimer(e)},e.prototype.deleteDamageOverTimer=function(t){for(var e in this.damageOverTimeList)this.damageOverTimeList[e]==t&&(delete this.damageOverTimeList[e],t.stop(),t.removeEventListener(egret.TimerEvent.TIMER,this.damageOverTime,this))},e.prototype.addEffect=function(t){var e=GlobalConfig.ConfigEffect[t];if(e){if(0==e.type){var i=new eui.Image;i.source=e.fileName,this.addChild(i);var s=egret.Tween.get(i);return i.x=i.x-23,void s.to({y:-100},2e3).call(function(){DisplayUtils.removeFromParent(i)})}var n=this.effs[t]||ObjPool.pop("McAnimation"),o=ResDirMgr.RES_DIR_SKILLEFF+e.fileName;this.playFile(n,o),this.addChild(n),this.effs[t]=n}},e.prototype.addHalo=function(t){this.haloMc=this.haloMc?this.haloMc:ObjPool.pop("McAnimation"),this.playFile(this.haloMc,ResDirMgr.RES_DIR_EFF+t),this.addChildAt(this.haloMc,0)},e.prototype.removeEffect=function(t){var e=GlobalConfig.ConfigEffect[t];if(e&&0!=e.type){var i=this.effs[t];i&&(i instanceof McAnimation&&i.destroy(),delete this.effs[t])}},e.prototype.removeAllEffect=function(){for(var t in this.effs){var e=this.effs[t];e&&e instanceof McAnimation&&e.destroy()}this.effs={}},e.prototype.hasBuff=function(t){return!!this.buffList[t]},e.prototype.addBuff=function(t){var e=t.effConfig,i=e.group,s=this.buffList[i];if(s){if(2==s.effConfig.overlayType){var n=s.multRate+1;n>s.effConfig.overMaxCount&&(n=s.effConfig.overMaxCount),t.multRate=n}this.removeBuff(s)}if(this.buffList[i]=t,e.effName){var o=this.buffEff[i]||ObjPool.pop("McAnimation"),a=ResDirMgr.RES_DIR_SKILLEFF+e.effName;this.playFile(o,a),this.addChild(o),this.buffEff[i]=o}if(e.effID&&this.addEffect(e.effID),t.effConfig.type==SkillEffectType.AdditionalState&&t.effConfig.args&&9==t.effConfig.args.i){var r=t.effConfig.duration;this.addHardStraight(r)}this.addGroup(i)},e.prototype.removeBuff=function(t){var e=t.effConfig,i=e.group;if(this.buffList[i]==t&&(t.dispose(),ObjPool.push(this.buffList[i]),delete this.buffList[i],this.buffEff[i]&&(DisplayUtils.removeFromParent(this.buffEff[i]),delete this.buffEff[i]),e.effID&&this.removeEffect(e.effID),e.unionBuff)){var s=this.buffList[e.unionBuff];s&&this.removeBuff(s)}this.removeGroup(i)},e.prototype.removeAllBuff=function(){for(var t in this.buffList)this.removeBuff(this.buffList[t])},e.prototype.addPaoPao=function(t){this.paoPao||(this.paoPao=new PaoPaoView,this.paoPao.open()),null==this.paoPao.parent&&this.addChildAt(this.paoPao,100),this.paoPao.anchorOffsetY=170,this.paoPao.anchorOffsetX=100;var e=this.infoModel.job;this.paoPao.setSpeak(t,e)},Object.defineProperty(e.prototype,"team",{get:function(){return this._infoModel.team},enumerable:!0,configurable:!0}),e.prototype.startPatrol=function(){if(TimerMgr.ins().getCurrTime()>this.nextPatrolTick){var t=this.getPointCanMove();t&&(GameMap.moveEntity(this,t.x,t.y),this.nextPatrolTick=TimerMgr.ins().getCurrTime()+MathUtils.limit(this.moveLimTime,this.moveMaxTime))}},e.prototype.setMoveAtt=function(t){this.moveRange=t[0],this.moveLimTime=t[1][0],this.moveMaxTime=t[1][1]},e.prototype.getPointCanMove=function(){for(var t,e=0,i=this.moveRange;100>e;){var s=MathUtils.limit(this.x-i>>0,this.x+i>>0),n=MathUtils.limit(this.y-i>>0,this.y+i>>0);if(GameMap.checkWalkableByPixel(s,n)){t=new egret.Point,t.x=s,t.y=n;break}e++}return t},e.prototype.playCount=function(){return this._state==ModuleAction.RUN||this._state==ModuleAction.STAND?-1:1},e.prototype.shakeIt=function(){},e.prototype.showName=function(t){this._nameGroup.visible=t,this.updataNameShow()},e.prototype.showBlood=function(t){return t&&this.infoModel&&"ç¥žå…½"==this.infoModel.name?void(this._hpBar.parent&&this._hpBar.parent.removeChild(this._hpBar)):(this._hpBar.visible=t,void this.updataHpShow())},Object.defineProperty(e.prototype,"isMy",{get:function(){return this.infoModel.isMy},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"weight",{get:function(){return this._infoModel&&this.team==Team.My&&this instanceof CustomActorRole?this.y+32:this.y},enumerable:!0,configurable:!0}),e.prototype.updateModel=function(){this.removeAll(),this.parseModel()},e.prototype.parseModel=function(){var t=this,e=this.infoModel;e.team!=Team.My&&(t.updateBlood(!0),t.setCharName(e.name)),t.initBody(ResDirMgr.RES_DIR_MONSTER+e.avatarFileName),t.setConfig(e.avatar+""),t.updateTitle(),e.avatarEffect&&""!=e.avatarEffect&&t.addHalo(e.avatarEffect),e.movePara&&t.setMoveAtt(e.movePara),t.setBodyScale(e.avatarScale)},e.prototype.addGroup=function(t){var e=EntityFilterUtil.getEntityFilter(t),i=GlobalFun.isOpenPoisoning();if((0!=i||e!=EntityFilter.poison)&&e){this.filterDic[e]=this.filterDic[e]||[];var s=this.filterDic[e].indexOf(t);-1==s&&(this.filterDic[e].push(t),this.updateFilter())}},e.prototype.removeGroup=function(t){var e=EntityFilterUtil.getEntityFilter(t);if(e){var i=this.filterDic[e];if(!i)return;var s=i.indexOf(t);s>=0&&(i.splice(s,1),this.updateFilter())}},e.prototype.updateFilter=function(){var t=EntityFilter.no;this.hasFilter(EntityFilter.hard)?t=EntityFilter.hard:this.hasFilter(EntityFilter.poison)&&(t=EntityFilter.poison),this.curFilter!=t&&this.setFilter(t)},e.prototype.hasFilter=function(t){return!(!this.filterDic[t]||!this.filterDic[t].length)},e.prototype.setFilter=function(t){this.curFilter=t,t?(this.setMcFilter(t),t==EntityFilter.hard?this.setMcFilterPlayOrStop(!1):this.setMcFilterPlayOrStop(!0)):(this.setMcFilter(t),this.setMcFilterPlayOrStop(!0))},e.prototype.setMcFilter=function(t){if("webgl"==egret.Capabilities.renderMode)for(var e in this._disOrder)if(+e!=CharMcOrder.ZHANLING){var i=this._disOrder[e];i.filters=t?EntityFilterUtil.buffFilter[t].filters:null}},e.prototype.setMcFilterPlayOrStop=function(t){for(var e=0,i=this.hasDir;e<i.length;e++){var s=i[e];if(s!=CharMcOrder.ZHANLING){var n=this.getMc(s);n&&(t?n.play():n.stop())}}},e.prototype.removeAllFilters=function(){this.filterDic={},this.curFilter=EntityFilter.no;for(var t in this._disOrder){var e=this._disOrder[t];e.filters=null}},e.prototype.playBodyTailEffect=function(){this.bodyTail.start()},e.prototype.stopBodyTailEffect=function(){this.bodyTail.stop()},Object.defineProperty(e.prototype,"alpha",{set:function(e){t.prototype.$setAlpha.call(this,e)},enumerable:!0,configurable:!0}),e.prototype.updataHpShow=function(){if(1==this._hpBar.visible)if(null==this._hpBar.parent&&this.parent){var t=ViewMgr.gamescene.map;t.addEntityHp(this._hpBar),this.updataMoveXY()}else null==this.parent&&this._hpBar.parent&&this._hpBar.parent.removeChild(this._hpBar);else this._hpBar.parent&&this._hpBar.parent.removeChild(this._hpBar);this.updataNameShow()},e.prototype.updataNameShow=function(){1==this._nameGroup.visible?null==this._nameGroup.parent&&this.titleCantainer.addChild(this._nameGroup):this._hpBar.parent?(this._nameGroup.visible=!0,this.titleCantainer.addChild(this._nameGroup)):this._nameGroup.parent&&this._nameGroup.parent.removeChild(this._nameGroup)},e.prototype.updataMoveXY=function(){t.prototype.updataMoveXY.call(this),this._hpBar&&this._hpBar.parent&&(this._hpBar.x=Math.floor(this.x),this._hpBar.y=Math.floor(this.y-this.titleCantainer.anchorOffsetY))},e}(CustomActorBase);__reflect(CustomActorMonster.prototype,"CustomActorMonster",["ICustomActor"]),window.CustomActorMonster=CustomActorMonster;var CustomActorNpc=function(t){function e(){var e=t.call(this)||this;return e.npcHead=new MineNpcHead,e.npcHead.anchorOffsetY=130,e.npcHead.anchorOffsetX=126,e.npcHead.currentState=e.npcHead.states[0],e.titleCantainer.addChild(e.npcHead),e.touchEnabled=!0,e.touchChildren=!1,e}return __extends(e,t),Object.defineProperty(e.prototype,"infoModel",{get:function(){return this._infoModel},set:function(t){this._infoModel=t},enumerable:!0,configurable:!0}),e.prototype.playCount=function(){return this._state==ModuleAction.RUN||this._state==ModuleAction.STAND?-1:1},e.prototype.updateModel=function(){var t=this.infoModel.npcConfig;this.npcHead.nameTxt.text=t.name,this.npcHead.updateModel(this.infoModel),this.x=this.infoModel.x,this.y=this.infoModel.y,this.setConfig(this.infoModel.avatarString),this.dir=this.infoModel.dir,this.playAction(t.action||ModuleAction.STAND),this.addMc(CharMcOrder.BODY,this.infoModel.avatarFileName),this.infoModel.weaponFileName&&this.addMc(CharMcOrder.WEAPON,this.infoModel.weaponFileName)},e}(CustomActorBase);__reflect(CustomActorNpc.prototype,"CustomActorNpc"),window.CustomActorNpc=CustomActorNpc;var GameByteArray=function(t){function e(){var e=t.call(this)||this;return e.endian=egret.Endian.LITTLE_ENDIAN,e}return __extends(e,t),e.prototype.readString=function(){var t=this.readUTF();return this.position+=1,t},e.prototype.readNumber=function(){var t=new uint64(this),e=t.toString();return+e},e.prototype.writeNumber=function(t){var e=uint64.stringToUint64(t.toString());this.writeInt64(e)},e.prototype.writeInt64=function(t){this.writeUnsignedInt(t._lowUint),this.writeUnsignedInt(t._highUint)},e.prototype.writeString=function(t){this.writeUTF(t),this.writeByte(0)},e.prototype.writeCmd=function(t,e){this.writeByte(t),this.writeByte(e)},e.prototype.readInts=function(t){for(var e=[],i=0;t>i;i++)e.push(this.readInt());return e},e.prototype.writeInts=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var i=0,s=t;i<s.length;i++){var n=s[i];this.writeInt(n)}},e}(egret.ByteArray);__reflect(GameByteArray.prototype,"GameByteArray"),window.GameByteArray=GameByteArray;var ByteArrayMsg=function(){function t(){this._msgBuffer=new egret.ByteArray}return t.prototype.receive=function(t){t.readBytes(this._msgBuffer);var e=this.decode(this._msgBuffer);e&&MessageCenter.ins().dispatch(e.key,e.body),0==this._msgBuffer.bytesAvailable&&this._msgBuffer.clear()},t.prototype.send=function(t,e){var i=this.encode(e);i&&(i.position=0,t.writeBytes(i,0,i.bytesAvailable))},t.prototype.decode=function(t){return ErrLog.trace("decodeéœ€è¦å­ç±»é‡å†™ï¼Œæ ¹æ®é¡¹ç›®çš„åè®®ç»“æž„è§£æž"),null},t.prototype.encode=function(t){return ErrLog.trace("encodeéœ€è¦å­ç±»é‡å†™ï¼Œæ ¹æ®é¡¹ç›®çš„åè®®ç»“æž„è§£æž"),null},t}();__reflect(ByteArrayMsg.prototype,"ByteArrayMsg",["BaseMsg"]);var enPropEntity;!function(t){t[t.P_ID=0]="P_ID",t[t.P_POS_X=1]="P_POS_X",t[t.P_POS_Y=2]="P_POS_Y",t[t.P_MODELID=3]="P_MODELID",t[t.P_ICON=4]="P_ICON",t[t.P_DIR=5]="P_DIR",t[t.P_MAX_ENTITY=6]="P_MAX_ENTITY"}(enPropEntity||(enPropEntity={}));var enPropAnimal;!function(t){t[t.P_LEVEL=6]="P_LEVEL",t[t.P_HP=7]="P_HP",t[t.P_MP=8]="P_MP",t[t.P_SPEED=9]="P_SPEED",t[t.P_MAXHP=10]="P_MAXHP",t[t.P_MAXMP=11]="P_MAXMP",t[t.P_OUT_ATTACK=12]="P_OUT_ATTACK",t[t.P_OUT_DEFENCE=13]="P_OUT_DEFENCE",t[t.P_DEFCRITICALSTRIKES=14]="P_DEFCRITICALSTRIKES",t[t.P_ALL_ATTACK=15]="P_ALL_ATTACK",t[t.P_SUB_DEF=16]="P_SUB_DEF",t[t.P_IN_ATTACK=17]="P_IN_ATTACK",t[t.P_IN_DEFENCE=18]="P_IN_DEFENCE",t[t.P_CRITICALSTRIKES=19]="P_CRITICALSTRIKES",t[t.P_DODGERATE=20]="P_DODGERATE",t[t.P_HITRATE=21]="P_HITRATE",t[t.P_ATTACK_ADD=22]="P_ATTACK_ADD",t[t.P_HP_RENEW=23]="P_HP_RENEW",t[t.P_MP_RENEW=24]="P_MP_RENEW",t[t.P_ATTACK_SPEED=25]="P_ATTACK_SPEED",t[t.P_IN_ATTACK_DAMAGE_ADD=26]="P_IN_ATTACK_DAMAGE_ADD",t[t.P_OUT_ATTACK_DAMAGE_ADD=27]="P_OUT_ATTACK_DAMAGE_ADD",t[t.P_THUNDER_ATTACK=28]="P_THUNDER_ATTACK",t[t.P_THUNDER_DEFENCE=29]="P_THUNDER_DEFENCE",t[t.P_POISON_ATTACK=30]="P_POISON_ATTACK",t[t.P_POISON_DEFENCE=31]="P_POISON_DEFENCE",t[t.P_ICE_ATTACK=32]="P_ICE_ATTACK",t[t.P_ICE_DEFENCE=33]="P_ICE_DEFENCE",t[t.P_FIRE_ATTACK=34]="P_FIRE_ATTACK",t[t.P_FIRE_DEFENCE=35]="P_FIRE_DEFENCE",t[t.P_STATE=36]="P_STATE",t[t.P_BASE_MAXHP=37]="P_BASE_MAXHP",t[t.P_BASE_MAXMP=38]="P_BASE_MAXMP",t[t.P_STAND_POINT=39]="P_STAND_POINT",t[t.P_MAX_ANIMAL=40]="P_MAX_ANIMAL"}(enPropAnimal||(enPropAnimal={}));var enPropActor;!function(t){t[t.P_WEAPON=40]="P_WEAPON",t[t.P_MOUNT=41]="P_MOUNT",t[t.P_DIZZY_RATE11=42]="P_DIZZY_RATE11",t[t.P_DIZZY_TIME1=43]="P_DIZZY_TIME1",t[t.P_HP_STORE=44]="P_HP_STORE",t[t.P_MP_STORE=45]="P_MP_STORE",t[t.P_SPIRIT=46]="P_SPIRIT",t[t.P_PK_MOD=47]="P_PK_MOD",t[t.P_STRONG_EFFECT=48]="P_STRONG_EFFECT",t[t.P_WING=49]="P_WING",t[t.P_STAGE_EFFECT=50]="P_STAGE_EFFECT",t[t.P_PET_HP_STORE=51]="P_PET_HP_STORE",t[t.PROP_ACTOR_XIUWEI_RENEW_RATE=52]="PROP_ACTOR_XIUWEI_RENEW_RATE",t[t.P_SEX=53]="P_SEX",t[t.P_VOCATION=54]="P_VOCATION",t[t.P_EXP=55]="P_EXP",t[t.P_PK_VALUE=57]="P_PK_VALUE",t[t.P_BAG_GRID=58]="P_BAG_GRID",t[t.P_WEEK_CHARM=59]="P_WEEK_CHARM",t[t.P_BIND_COIN=60]="P_BIND_COIN",t[t.P_COIN=61]="P_COIN",t[t.P_BIND_YB=62]="P_BIND_YB",t[t.P_YB=63]="P_YB",t[t.P_SHENGWANG=64]="P_SHENGWANG",t[t.P_CHARM=65]="P_CHARM",t[t.P_SPIRIT_SLOT=66]="P_SPIRIT_SLOT",t[t.P_RENOWN=67]="P_RENOWN",t[t.P_GUILD_ID=68]="P_GUILD_ID",t[t.P_TEAM_ID=69]="P_TEAM_ID",t[t.P_SOCIAL=70]="P_SOCIAL",t[t.P_GUILD_EXP=71]="P_GUILD_EXP",t[t.P_LUCKY=72]="P_LUCKY",t[t.P_SYS_OPEN=73]="P_SYS_OPEN",t[t.P_ROOT_EXP_POWER=74]="P_ROOT_EXP_POWER",t[t.P_CHANGE_MODEL=75]="P_CHANGE_MODEL",t[t.PROP_BANGBANGTANG_EXP=76]="PROP_BANGBANGTANG_EXP",t[t.P_GIVE_YB=77]="P_GIVE_YB",t[t.P_CRITICAL_STRIKE=78]="P_CRITICAL_STRIKE",t[t.P_EXP_RATE=79]="P_EXP_RATE",t[t.P_DEPOT_GRID=80]="P_DEPOT_GRID",t[t.P_ANGER=81]="P_ANGER",t[t.P_ROOT_EXP=82]="P_ROOT_EXP",t[t.P_ACHIEVEPOINT=83]="P_ACHIEVEPOINT",t[t.P_ZYCONT=84]="P_ZYCONT",t[t.P_QQ_VIP=85]="P_QQ_VIP",t[t.P_WING_ID=86]="P_WING_ID",t[t.P_WING_SCORE=87]="P_WING_SCORE",t[t.P_PET_SCORE=88]="P_PET_SCORE",t[t.PROP_ACTOR_VIPFLAG=89]="PROP_ACTOR_VIPFLAG",t[t.P_CAMP=90]="P_CAMP",t[t.P_PET_SLOT=91]="P_PET_SLOT",t[t.P_HONOR=92]="P_HONOR",t[t.P_QING_YUAN=93]="P_QING_YUAN",t[t.PROP_ACTOR_DUR_KILLTIMES=94]="PROP_ACTOR_DUR_KILLTIMES",t[t.PROP_ACTOR_BASE_FIGHT=95]="PROP_ACTOR_BASE_FIGHT",t[t.P_FIGHT_VALUE=96]="P_FIGHT_VALUE",t[t.P_MAX_RENOWN=97]="P_MAX_RENOWN",t[t.P_RECHARGE=98]="P_RECHARGE",t[t.P_VIP_LEVEL=99]="P_VIP_LEVEL",t[t.P_BEAST_LEVEL=100]="P_BEAST_LEVEL",t[t.P_FOOT_EFFECT=101]="P_FOOT_EFFECT",t[t.P_EQUIP_SCORE=102]="P_EQUIP_SCORE",t[t.P_HAIR_MODEL=103]="P_HAIR_MODEL",t[t.P_BUBBLE=104]="P_BUBBLE",t[t.P_ACTOR_STATE=105]="P_ACTOR_STATE",t[t.P_JINGJIE_TITLE=106]="P_JINGJIE_TITLE",t[t.P_ZHUMOBI=107]="P_ZHUMOBI",t[t.P_WARSPIRIT=108]="P_WARSPIRIT",t[t.P_GUILDFB_SCORE=109]="P_GUILDFB_SCORE",t[t.P_SYS_OPENEX=110]="P_SYS_OPENEX",t[t.P_MAX_ACTOR=111]="P_MAX_ACTOR"}(enPropActor||(enPropActor={}));var AttributeType;!function(t){t[t.atHp=0]="atHp",t[t.atMp=1]="atMp",t[t.atMaxHp=2]="atMaxHp",t[t.atMaxMp=3]="atMaxMp",t[t.atAttack=4]="atAttack",t[t.atDef=5]="atDef",t[t.atRes=6]="atRes",t[t.atCrit=7]="atCrit",t[t.atTough=8]="atTough",t[t.atMoveSpeed=9]="atMoveSpeed",t[t.atAttackSpeed=10]="atAttackSpeed",t[t.atHpEx=11]="atHpEx",t[t.atAtkEx=12]="atAtkEx",t[t.atStunPower=13]="atStunPower",t[t.atStunRes=14]="atStunRes",t[t.atStunTime=15]="atStunTime",t[t.atDamageReduction=16]="atDamageReduction",t[t.atCritHurt=17]="atCritHurt",t[t.atRegeneration=18]="atRegeneration",t[t.atCritEnhance=19]="atCritEnhance",t[t.atPenetrate=20]="atPenetrate",t[t.atRoleDamageEnhance=21]="atRoleDamageEnhance",t[t.atRoleDamageReduction=22]="atRoleDamageReduction",t[t.atDefEx=23]="atDefEx",t[t.atResEx=24]="atResEx",t[t.cruNeiGong=25]="cruNeiGong",t[t.maxNeiGong=26]="maxNeiGong",t[t.neigongAbsorbHurt=27]="neigongAbsorbHurt",t[t.atJob1HpEx=28]="atJob1HpEx",t[t.atJob2HpEx=29]="atJob2HpEx",t[t.atJob3HpEx=30]="atJob3HpEx",t[t.atNeiGongRestore=31]="atNeiGongRestore",t[t.atVamirePro=32]="atVamirePro",t[t.atVamirePen=33]="atVamirePen",t[t.atVamireCd=34]="atVamireCd",t[t.atCursePro=35]="atCursePro",t[t.atCurseCd=36]="atCurseCd",t[t.atAttAddDamPro=37]="atAttAddDamPro",t[t.atAttAddDamVal=38]="atAttAddDamVal",t[t.atBeAttAddHpPro=39]="atBeAttAddHpPro",t[t.atBeAttAddHpVal=40]="atBeAttAddHpVal",t[t.atAttMbAddDamPen=41]="atAttMbAddDamPen",t[t.atHpLtAddBuff=42]="atHpLtAddBuff",t[t.atAttHpLtPenAddDam=43]="atAttHpLtPenAddDam",t[t.atAttHpLtAddDamPen=44]="atAttHpLtAddDamPen",t[t.atJob1AtkEx=45]="atJob1AtkEx",t[t.atJob2AtkEx=46]="atJob2AtkEx",t[t.atJob3AtkEx=47]="atJob3AtkEx",t[t.atJob1DefEx=48]="atJob1DefEx",t[t.atJob2DefEx=49]="atJob2DefEx",t[t.atJob3DefEx=50]="atJob3DefEx",t[t.atJob1ResEx=51]="atJob1ResEx",t[t.atJob2ResEx=52]="atJob2ResEx",t[t.atJob3ResEx=53]="atJob3ResEx",t[t.atAttPerDamPan=54]="atAttPerDamPan",t[t.atYuPeiDeterDam=55]="atYuPeiDeterDam",t[t.atCritEnhanceResist=56]="atCritEnhanceResist",t[t.atHolyDamege=57]="atHolyDamege",t[t.atHolyMaster=58]="atHolyMaster",t[t.atHolyResist=59]="atHolyResist",t[t.atTogetherHolyDamege=60]="atTogetherHolyDamege",t[t.atTogetherHolyMaster=61]="atTogetherHolyMaster",t[t.atTogetherHolyResist=62]="atTogetherHolyResist",t[t.atZhuiMingPro=63]="atZhuiMingPro",t[t.atZhuiMingVal=64]="atZhuiMingVal",t[t.atHuiXinDamage=65]="atHuiXinDamage",t[t.atNeiGongEx=66]="atNeiGongEx",t[t.atDeadLyPro=67]="atDeadLyPro",t[t.atDeadLyMaster=68]="atDeadLyMaster",t[t.atDeadLyResist=69]="atDeadLyResist",t[t.atAddEnemyHp=70]="atAddEnemyHp",t[t.atHurtMyself=71]="atHurtMyself",t[t.atBladeMailPro=72]="atBladeMailPro",t[t.atBladeMailPer=73]="atBladeMailPer",t[t.atDefPen=74]="atDefPen",t[t.atResPen=75]="atResPen",t[t.atDeadLyHurt=76]="atDeadLyHurt",t[t.atDeadLyHurtResist=77]="atDeadLyHurtResist",t[t.atCritHurtResist=78]="atCritHurtResist",t[t.atHunGuPro=79]="atHunGuPro",t[t.atHunGuHurt=80]="atHunGuHurt",t[t.atHunGuCd=81]="atHunGuCd",t[t.atHearthDamege=82]="atHearthDamege",t[t.atHearthHurt=83]="atHearthHurt",t[t.atHearthCount=84]="atHearthCount",t[t.atCount=85]="atCount"}(AttributeType||(AttributeType={}));var ActivityType1Data=function(t){function e(e){var i=t.call(this,e)||this;return i.rewardsSum=[],i.hFTotalConsumption=0,i.readReawards(e),i}return __extends(e,t),e.prototype.update=function(e){t.prototype.update.call(this,e);e.readShort();this.record=e.readInt()},e.prototype.readReawards=function(t){this.record=t.readInt(),this.hFTotalConsumption=t.readInt();for(var e=t.readShort(),i=1;e>=i;i++)this.rewardsSum[i]=t.readShort()},e.prototype.canAwards=function(){return this.checkpointRed()},e.prototype.isActivitiesOpen=function(){var t=Math.floor((DateUtils.formatMiniDateTime(this.startTime)-GameServer.serverTime)/1e3),e=Math.floor((DateUtils.formatMiniDateTime(this.endTime)-GameServer.serverTime)/1e3);return 0>t&&e>0?!0:void 0},e.prototype.getConfigure=function(){var t;return t=this.activityType==TypeOfActivity.Personal?GlobalConfig.ConfigPActivityType1:GlobalConfig.ConfigActivityType1},e.prototype.getInstance=function(){var t;return t=this.activityType==TypeOfActivity.Personal?PActivity.ins():Activity.ins()},e.prototype.getAwardsStateById=function(t){var e=this.getConfigure()[this.id][t];switch(e.showType){case TypeShow.LEVEL:if(Actor.level<e.level||UserZsSystem.ins().lv<e.zslevel)return Activity.NotReached;break;case TypeShow.WING:if(WingsDataInfo.getWingAllLevel()<e.wingLv)return Activity.NotReached;break;case TypeShow.ZHUZAO:if(Role.getAllForgeLevelByType(PackageID.Zhuling)<e.zzLv)return Activity.NotReached;break;case TypeShow.LONGHUN:if(LongHunToData.getLongHunAllLevel()<e.lhLv)return Activity.NotReached;break;case TypeShow.BOOK:var i=IllustrationsSystem.ins().getIllustrationsPowerNumEx_a94();if(i<e.tjPower)return Activity.NotReached;break;case TypeShow.EQUIP:if(UserBagSystem.ins().getEquipsScoreByRolesOfBody()<e.equipPower)return Activity.NotReached;break;case TypeShow.XIAOFEI:var s=this.getInstance().getActivityDataById(e.Id);if(s.hFTotalConsumption<e.consumeYuanbao)return Activity.NotReached;break;case TypeShow.RING:var n=0,o=SpecialRingSystem.ins().getSpecialRingDataById(SpecialRingSystem.FIRE_RING_ID);if(o&&o.level&&(n=o.level),n<e.huoyanRingLv)return Activity.NotReached;break;case TypeShow.SAMSARA:if(Actor.samsaraLv<e.lunhLv)return Activity.NotReached;break;case TypeShow.ZHANLING:if(ZhanLingModel.ins().getZhanLingDataByLevel(0)<e.zhanlingLv)return Activity.NotReached}var a=Math.floor(this.record/Math.pow(2,e.index))%2;return a?Activity.Geted:Activity.CanGet},e.prototype.checkpointRed=function(){var t=this.getConfigure()[this.id];for(var e in t){var i=t[e],s=this.getAwardsStateById(i.index),n=this.rewardsSum[i.index],o=i.total?i.total-n:1;switch(s){case Activity.NotReached:break;case Activity.CanGet:if(o>0)return!0;break;case Activity.Geted:}}return!1},e.prototype.getHideState=function(){if(this.isHide)return this.isHide;var t=this.record>>1,e=this.getConfigure()[this.id],i=Object.keys(e);return t>=Math.pow(2,i.length)-1?(this.isHide=!0,this.isHide):(this.isHide=!1,this.isHide)},e}(ActivityBaseData);__reflect(ActivityType1Data.prototype,"ActivityType1Data");var TypeShow;!function(t){t[t.LEVEL=0]="LEVEL",t[t.WING=1]="WING",t[t.ZHUZAO=2]="ZHUZAO",t[t.LONGHUN=3]="LONGHUN",t[t.BOOK=5]="BOOK",t[t.EQUIP=6]="EQUIP",t[t.RING=7]="RING",t[t.SAMSARA=8]="SAMSARA",t[t.ZHANLING=9]="ZHANLING",t[t.XIAOFEI=100]="XIAOFEI"}(TypeShow||(TypeShow={}));var ActivityType9Data=function(t){function e(e){var i=t.call(this,e)||this;return i.update(e),i}return __extends(e,t),e.prototype.getInstance=function(){var t;return t=this.activityType==TypeOfActivity.Personal?PActivity.ins():Activity.ins()},e.prototype.update=function(t){this.record=t.readInt(),this.count=t.readInt();var e=t.readByte();this.indexs=[];for(var i=0;e>i;i++)this.indexs.push(t.readByte());e=t.readByte(),this.noticeArr=[];for(var i=0;e>i;i++)this.noticeArr.push({name:t.readString(),index:t.readByte()});this.noticeArr.reverse()},e.prototype.canAwards=function(){return this.checkpointRed()},e.prototype.isActivitiesOpen=function(){var t=Math.floor((DateUtils.formatMiniDateTime(this.startTime)-GameServer.serverTime)/1e3),e=Math.floor((DateUtils.formatMiniDateTime(this.endTime)-GameServer.serverTime)/1e3);return 0>t&&e>0?!0:!1},e.prototype.checkpointRed=function(){return this.getInstance().getType9RedPoint(this.id)},e.prototype.getRemainingTime=function(){var t,e=Math.floor((DateUtils.formatMiniDateTime(this.startTime)-GameServer.serverTime)/1e3),i=Math.floor((DateUtils.formatMiniDateTime(this.endTime)-GameServer.serverTime)/1e3);return t=e>=0?"Hoáº¡t Ä‘á»™ng chÆ°a má»Ÿ":0>=i?"Hoáº¡t Ä‘á»™ng Ä‘Ã£ káº¿t thÃºc":DateUtils.getFormatBySecond(i,DateUtils.TIME_FORMAT_5,3)},e.prototype.getEndTime=function(){var t=Math.floor((DateUtils.formatMiniDateTime(this.endTime)-GameServer.serverTime)/1e3),e=DateUtils.getFormatBySecond(t,DateUtils.TIME_FORMAT_5,3);return e},e.prototype.getConditionByIndex=function(t){var e=this.record>>t&1;return e},e}(ActivityBaseData);__reflect(ActivityType9Data.prototype,"ActivityType9Data");var ActivityPanel=function(t){function e(){var e=t.call(this)||this;return e._activityBtnType=-1,e.activityType=TypeOfActivity.Normal,e}return __extends(e,t),Object.defineProperty(e.prototype,"activityBtnType",{get:function(){return this._activityBtnType},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"activityID",{get:function(){return this._activityID},set:function(t){this._activityID=t;var e,i;this.activityType==TypeOfActivity.Normal?(e=GlobalConfig.ConfigActivity[t],i=GlobalConfig.ConfigActivityBtn[t]):this.activityType==TypeOfActivity.Personal&&(e=GlobalConfig.ConfigPActivity[t],i=GlobalConfig.ConfigPActivityBtn[t]),e&&e.tabName&&(this.name=e.tabName),this._activityBtnType=i.type},enumerable:!0,configurable:!0}),e.create=function(t,e){var i;if(i=e==TypeOfActivity.Normal?GlobalConfig.ConfigActivity[t]:GlobalConfig.ConfigPActivity[t],t>1e4){var s=ObjPool.pop("OSATarget0Panel");return s.activityType=e,s.activityID=t,s}var n;return 1==i.activityType?(n=ObjPool.pop("OSATarget"+i.activityType+"Panel",t),n.activityType=e,n.activityID=t):(n=ObjPool.pop("OSATarget"+i.activityType+"Panel"),n.activityType=e,n.activityID=t),n},e.prototype.updateData=function(){},e.getActivityTypeFromId=function(t){var e;return GlobalConfig.ConfigActivityBtn[t]?e=GlobalConfig.ConfigActivityBtn[t]:GlobalConfig.ConfigPActivityBtn[t]&&(e=GlobalConfig.ConfigPActivityBtn[t]),e?e.activityType:TypeOfActivity.Normal},e}(BaseComponent);__reflect(ActivityPanel.prototype,"ActivityPanel"),window.ActivityPanel=ActivityPanel;var OSATarget11Panel1=function(t){function e(e){var i=t.call(this)||this;return i.activityID=e,i.setCurSkin(),i}return __extends(e,t),e.prototype.setCurSkin=function(){var t=GlobalConfig.ConfigActivity[this.activityID];t.pageSkin?this.skinName=t.pageSkin:this.skinName=t.pageSkin},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.rewardList.itemRenderer=HighRewardItemRender,this.projectList.itemRenderer=HighProjectItemRender},e.prototype.open=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.setCurSkin();var i=GlobalConfig.ConfigActivity[this.activityID];this.actInfo1.text=i.desc,this.observe(Activity.ins().postActivityIsGetAwards,this.updateData),TimerMgr.ins().doTimer(1e3,0,this.setTime,this),this.updateData()},e.prototype.close=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.removeObserve(),TimerMgr.ins().removeAll(this)},e.prototype.updateData=function(){var t=Activity.ins().activityData[this.activityID];if(t){var e=Object.keys(GlobalConfig.ConfigActivityType11_1[this.activityID]).length,i=0,s=[];s.length=e;var n,o;for(o=1;e>=o;o++)n=GlobalConfig.ConfigActivityType11_1[this.activityID][o],i=t.awardsInfo>>o&1?2:t.hiMark>=n.score?1:0,s[o-1]={activityID:this.activityID,index:o,state:i,config:n};this._rewardCollect||(this._rewardCollect=new ArrayCollection,this.rewardList.dataProvider=this._rewardCollect),this._rewardCollect.source=s,e=Object.keys(GlobalConfig.ConfigActivityType11_2[this.activityID]).length;var a;s=[],s.length=e;var r=0;for(o=0;e>o;o++){var h=t.finishInfo[o];a=GlobalConfig.ConfigActivityType11_2[this.activityID][o+1],s[o]={config:a,times:h.times};var l=Math.floor(h.times/a.target),c=Math.floor(a.dayLimit/a.target);l>c&&(l=c),r+=a.score*l}this._achieveCollect||(this._achieveCollect=new ArrayCollection,this.projectList.dataProvider=this._achieveCollect),this._achieveCollect.source=s,this.totalScore.text="Äiá»ƒm Hi hiá»‡n táº¡i:"+r,this.setTime()}},e.prototype.setTime=function(){var t=Activity.ins().activityData[this.activityID];t&&(this.actTime1.text=t.getRemainingTime())},e}(BaseComponent);__reflect(OSATarget11Panel1.prototype,"OSATarget11Panel1"),window.OSATarget11Panel1=OSATarget11Panel1;var AuctionsSystem=function(t){function e(){var e=t.call(this)||this;return e.sysId=PackageID.Auction,e.regNetMsg(1,e.postDataList_a94),e.regNetMsg(2,e.onSuccessOpen_a94),e.regNetMsg(4,e.postAuctionsResult_a94),e.regNetMsg(5,e.postBuyItemResult_a94),e.regNetMsg(6,e.postRecordData_a94),e.regNetMsg(7,e.noLimitTips_a94),e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.initLogin=function(){this.sendListGet_a94(0),this.sendListGet_a94(1)},e.prototype.sendListGet_a94=function(t){var e=this.getBytes(1);e.writeByte(t),this.sendToServer(e)},e.prototype.postDataList_a94=function(t){for(var e=t.readByte(),i=t.readInt(),s=[],n=0;i>n;n++)s.push(new AuctionsVo(t));s.length>=2&&s.sort(this.sort_a94),0==e?this.auGuildDatas=s:this.auServerDatas=s},e.prototype.sort_a94=function(t,e){return t.putAwayTime>e.putAwayTime?-1:t.putAwayTime<e.putAwayTime?1:0},e.prototype.sortByAuctionsTime_a94=function(t,e){return t.time>e.time?-1:t.time<e.time?1:0},e.prototype.sendOpenAuctionsBox_a94=function(t){var e=this.getBytes(2);e.writeInt(t),this.sendToServer(e)},e.prototype.onSuccessOpen_a94=function(t){ViewMgr.ins().open(AuctionsItemChoiceWin,t.readInt(),t.readInt())},e.prototype.sendUseAuctionsBox_a94=function(t,e){var i=this.getBytes(3);i.writeByte(t),i.writeInt(e),this.sendToServer(i)},e.prototype.sendAUctions_a94=function(t,e,i){var s=this.getBytes(4);s.writeInt(t),s.writeByte(e),s.writeByte(i),this.sendToServer(s)},e.prototype.postAuctionsResult_a94=function(t){var e=t.readByte();switch(e){case 0:case 1:case 2:var i=new AuctionsVo(t),s=this.getAuctionsItemByID_a94(i.id);1==e?(this.deleteAuctionsVo_a94(s),UserTips.ins().showTips("Váº­t pháº©m khÃ´ng tá»“n táº¡i")):(this.dateChanged_a94(s,i),UserTips.ins().showTips(0==e?"Äáº¥u giÃ¡ thÃ nh cÃ´ng":"ThÃ´ng tin hÃ ng hÃ³a Ä‘Ã£ thay Ä‘á»•i"));break;case 3:UserTips.ins().showTips("Váº«n trong thá»i gian trÆ°ng bÃ y");break;case 4:UserTips.ins().showTips("KhÃ´ng Ä‘á»§ háº¡n má»©c hoáº¡t Ä‘á»™")}},e.prototype.deleteAuctionsVo_a94=function(t){if(this.auGuildDatas){var e=this.auGuildDatas.indexOf(t);if(e>=0)return void this.auGuildDatas.splice(e,1)}if(this.auServerDatas){var e=this.auServerDatas.indexOf(t);e>=0&&this.auServerDatas.splice(e,1)}},e.prototype.postUpdateAuctions_a94=function(){},e.prototype.getAuctionsItemByID_a94=function(t){return this.getAuctionsVo_a94(t,this.auGuildDatas)||this.getAuctionsVo_a94(t,this.auServerDatas)},e.prototype.getAuctionsVo_a94=function(t,e){if(!e||e.length<=0)return null;for(var i=e.length,s=0;i>s;s++)if(e[s].id==t)return e[s];return null},e.prototype.sendBuyItem_a94=function(t,e){var i=this.getBytes(5);i.writeInt(t),i.writeByte(e),this.sendToServer(i)},e.prototype.postBuyItemResult_a94=function(t){var e=t.readByte();switch(e){case 0:case 1:case 2:var i=new AuctionsVo(t),s=this.getAuctionsItemByID_a94(i.id);2!=e?(this.deleteAuctionsVo_a94(s),UserTips.ins().showTips(1==e?"Váº­t pháº©m khÃ´ng tá»“n táº¡i":"Mua thÃ nh cÃ´ng")):(this.dateChanged_a94(s,i),UserTips.ins().showTips("ThÃ´ng tin hÃ ng hÃ³a Ä‘Ã£ thay Ä‘á»•i"));break;case 3:UserTips.ins().showTips("Váº«n trong thá»i gian trÆ°ng bÃ y");break;case 4:UserTips.ins().showTips("KhÃ´ng Ä‘á»§ háº¡n má»©c hoáº¡t Ä‘á»™")}},e.prototype.dateChanged_a94=function(t,e){t.type!=e.type?(this.deleteAuctionsVo_a94(t),0==e.type?(this.auGuildDatas.push(e),this.auGuildDatas.length>=2&&this.auGuildDatas.sort(this.sort_a94)):(this.auServerDatas.push(e),this.auServerDatas.length>=2&&this.auServerDatas.sort(this.sort_a94))):(t.putAwayTime=e.putAwayTime,t.endTime=e.endTime,t.myAuPrice=e.myAuPrice,t.auctionTimes=e.auctionTimes,t.aID=e.aID)},e.prototype.getPageByTypeMax_a94=function(t,e){var i=t?this.auServerDatas:this.auGuildDatas;return i&&i.length?Math.ceil(i.length/e):1},e.prototype.getPageData_a94=function(t,e,i){var s=t?this.auServerDatas:this.auGuildDatas;if(!s||!s.length)return null;var n=(e-1)*i;return s.slice(n,n+i)},e.prototype.isAuctionsOpen_a94=function(){return UserZsSystem.ins().lv>=GlobalConfig.ConfigAuction.openzhuanshenglv&&GameServer.serverOpenDay+1>=GlobalConfig.ConfigAuction.openserverday},e.prototype.sendRecordData_a94=function(t){var e=this.getBytes(6);e.writeByte(t),this.sendToServer(e)},e.prototype.postRecordData_a94=function(t){for(var e,i=t.readByte(),s=t.readShort(),n=[],o=0;s>o;o++)e=new AuctionsRecordVo(t),e.type=i,n.push(e);return n.length>1&&n.sort(this.sortByAuctionsTime_a94),{type:i,list:n}},e.prototype.noLimitTips_a94=function(t){ViewMgr.ins().open(AuctionsQuotaTipWin,t.readInt(),t.readInt())},e.prototype.checkRedPoint_a94=function(){return this.checkRedPointByType_a94(0)||this.checkRedPointByType_a94(1)},e.prototype.checkRedPointByType_a94=function(t){var e=t?this.auServerDatas:this.auGuildDatas;return e&&e.length>0},e}(SystemBase);__reflect(AuctionsSystem.prototype,"AuctionsSystem");var GameSystem;!function(t){t.auction=AuctionsSystem.ins.bind(AuctionsSystem)}(GameSystem||(GameSystem={}));var SmeltEquipsItem=function(t){function e(){var e=t.call(this)||this;return e.skinName="SkinItem2",e.touchChildren=!1,e}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.mc=new McAnimation,this.mc.x=45,this.mc.y=40},e.prototype.dataChanged=function(){if(this.clear(),this.data instanceof ItemData){this.itemConfig=this.data.itemConfig,this.itemIcon.setData(this.itemConfig);var t=ConfigItem.getType(this.itemConfig),e=ConfigItem.getJob(this.itemConfig);if(4==t)this.nameTxt.text=this.itemConfig.name;else{var i=this.itemConfig?ConfigItem.getSubType(this.itemConfig):-1;i==ForgeConst.EQUIP_POS_TO_SUB[EquipPos.DZI]?this.nameTxt.text=this.itemConfig.name:this.nameTxt.text=isNaN(this.itemConfig.zsLevel)?"lv."+(this.itemConfig.level||1):"Chuyá»ƒn "+this.itemConfig.zsLevel+"",-1!=UserBagSystem.fitleEquip.indexOf(this.itemConfig.id)&&(this.nameTxt.text="KhÃ´ng cáº¥p báº­c")
}this.itemIcon.imgJob.source=(0==t||4==t)&&e&&this.itemIcon.imgJob.visible?"job"+e+"Item":""}},e.prototype.onClick_a94=function(){},e.prototype.playEffect_a94=function(){this.data&&(this.mc.playFile(ResDirMgr.RES_DIR_EFF+"litboom",1),this.addChild(this.mc),this.selectFrame.visible=!1)},e.prototype.clear=function(){t.prototype.clear.call(this),this.itemIcon.imgJob.source=null},e}(ItemBase);__reflect(SmeltEquipsItem.prototype,"SmeltEquipsItem");var IllustrationsSystem=function(t){function e(){var e=t.call(this)||this;return e.bookPower=0,e.score=-1,e.sysId=PackageID.Book,e.regNetMsg(1,e.postChangeData_a94),e.listBook={},e.itemBook={},e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.getSuitIdByIllustrationsId_a94=function(t){var e=GlobalConfig.ConfigCard[t][0];if(!e)return 0;for(var i in GlobalConfig.ConfigSuit)if(-1!=GlobalConfig.ConfigSuit[i][1].idList.indexOf(t))return Number(i);return 0},e.prototype.getNumOfSuit_a94=function(t){for(var e=GlobalConfig.ConfigSuit[t][1],i=0,s=0;s<e.idList.length;s++){var n=this.getIllustrationsById_a94(e.idList[s]);n.level>-1&&i++}return i},e.prototype.getLevelOfSuit_a94=function(t){for(var e=this.getNumOfSuit_a94(t),i=0,s=1;GlobalConfig.ConfigSuit[t][s];)GlobalConfig.ConfigSuit[t][s].count<=e&&(i=GlobalConfig.ConfigSuit[t][s].level),s++;return i},e.prototype.getIllustrationsRed_a94=function(){for(var t in GlobalConfig.ConfigBookList)for(var e=GlobalConfig.ConfigBookList[t].idList,i=0,s=e;i<s.length;i++)for(var n=s[i],o=GlobalConfig.ConfigSuit[n][1].idList,a=0,r=o;a<r.length;a++){var h=r[a];if(this.getIllustrationsById_a94(h).getIllustrationsState_a94()==BookState.canOpen)return!0}return!1},e.prototype.getIllustrationsUpRed_a94=function(){for(var t in GlobalConfig.ConfigBookList)for(var e=GlobalConfig.ConfigBookList[t].idList,i=0,s=e;i<s.length;i++){var n=s[i];if(this.getIllustrationsUpRedByListId_a94(n))return!0}return!1},e.prototype.getIllustrationsUpRedByListId_a94=function(t){for(var e=GlobalConfig.ConfigSuit[t][1].idList,i=0,s=e;i<s.length;i++){var n=s[i],o=this.getIllustrationsById_a94(n),a=o.getCostNextLevel_a94();if(a&&this.score>=a)return!0}},e.prototype.getIllustrationsRedById_a94=function(t){return this.getIllustrationsById_a94(t).getIllustrationsState_a94()==BookState.canOpen?!0:!1},e.prototype.getIllustrationsById_a94=function(t){if(!this.listBook[t]){var e=new IllustrationsData;this.listBook[t]=e,e.id=t}return this.listBook[t]},e.prototype.getIllustrationsByItemId_a94=function(t){return this.itemBook[t]||(this.itemBook[t]=[]),this.itemBook[t]},e.prototype.getIllustrationsPown_a94=function(){var t=GlobalConfig.ConfigCard,i=0;for(var s in this.listBook){var n=this.listBook[s];if(n.level>-1){var o=t[s][n.level];i+=Math.floor(UserBagSystem.getAttrPower(o.attrs))}}var a=[];for(var r in GlobalConfig.ConfigBookList){var h=GlobalConfig.ConfigBookList[r],l=e.ins().getNumOfSuit_a94(h.idList[0]);for(var c in GlobalConfig.ConfigSuit[h.idList[0]]){var u=GlobalConfig.ConfigSuit[h.idList[0]][c];if(!(l>=u.count)){i+=Math.floor(UserBagSystem.getAttrPower(a)),a=[];break}a=u.attrs}a.length>0&&(i+=Math.floor(UserBagSystem.getAttrPower(a)))}return i},e.prototype.getIllustrationsPowerNum_a94=function(t,i){var s=SubRoles.ins().subRolesLen;if(i)for(var n in GlobalConfig.ConfigSuit)if(-1!=e.jobs.indexOf(Number(n))&&-1!=GlobalConfig.ConfigSuit[n][1].idList.indexOf(i)){s=1;break}return t*s},e.prototype.getIllustrationsPowerNumEx_a94=function(){return this.bookPower},e.prototype.getDataOfUpChip_a94=function(t){var i=[],s=GlobalConfig.ConfigCard,n=s[t.id],o=0;for(var a in n)n[a].level>t.level&&(o+=n[a].cost);var r=GlobalConfig.ConfigDecompose,h=o-t.exp,l=0;for(var a in this.listBook){var c=s[a][1],u=UserBagSystem.ins().getBagGoodsCountById(0,c.itemId),p=r[t.id],d=this.listBook[a];if(d.level>-1&&u>0)for(var g=0;u>g&&!(l>h);g++)if(l+=p.value,i.push(+a),i.length>=12)return i}return i.sort(e.sort),i},e.sort=function(t,e){if(t==e)return 0;var i=GlobalConfig.ConfigDecompose[t],s=GlobalConfig.ConfigDecompose[e];return i.value>s.value?1:i.value<s.value?-1:0},e.prototype.getTitleNameById_a94=function(t){var e=GlobalConfig.ConfigBookList;for(var i in e)if(-1!=e[i].idList.indexOf(t))return e[i].name;return""},e.prototype.getListData=function(){return this.listBook},e.prototype.sendIllustrationsData_a94=function(){var t=this.getBytes(1);this.sendToServer(t)},e.prototype.postChangeData_a94=function(t){if(-1==this.score){var e=GlobalConfig.ConfigDecompose;for(var i in e){var s=this.getIllustrationsById_a94(+i);this.getIllustrationsByItemId_a94(e[i].itemId).push(s)}}for(var n=t.readInt(),o=0;n>o;o++){var i=t.readShort(),s=this.getIllustrationsById_a94(i);s.updateData_a94(t)}var a=t.readInt();if(this.score>-1){var r=a-this.score;r>0&&UserTips.ins().showTips("Nháº­n Ä‘Æ°á»£c|C:0xff700f&T:Kinh nghiá»‡m Äá»“ GiÃ¡m x "+r+"|")}this.score=a,this.bookPower=t.readDouble()},e.prototype.sendOpen_a94=function(t){var e=this.getBytes(2);e.writeShort(t),this.sendToServer(e)},e.prototype.sendDecompose_a94=function(t){var e=this.getBytes(3);e.writeInt(t.length);for(var i=0;i<t.length;i++)e.writeShort(t[i][0]),e.writeShort(t[i][1]);this.sendToServer(e)},e.prototype.sendUpLevel_a94=function(t){var e=this.getBytes(4);e.writeShort(t),this.sendToServer(e)},e.prototype.getDecomposeConfigByItemId_a94=function(t){var e=GlobalConfig.ConfigDecompose;if(!this.itemBook[t])return Assert(!1,"Dá»¯ liá»‡u Äá»“ GiÃ¡m chÆ°a khá»Ÿi táº¡o, id="+t+",itemBook keys length="+Object.keys(this.itemBook).length),null;if(this.itemBook[t][0]){var i=this.itemBook[t][0].id;return e[i]}return null},e.prototype.checkRedPointOfResolve_a94=function(){var t=UserBagSystem.ins().getBagGoodsByType(ItemType.TYPE_9);if(!t.length)return!1;var e=this.itemBook,i={};for(var s in e)for(var n=0,o=e[s];n<o.length;n++){var a=o[n];if(a.getIllustrationsState_a94()!=BookState.haveOpen){i[s]=!0;break}}for(var r=0,h=t;r<h.length;r++){var a=h[r];if(!i[a.configID])return!0}return!1},e.prototype.getRedPointOfSuit_a94=function(t){var i=this,s=GlobalConfig.ConfigSuit,n=UserBagSystem.ins().getBagGoodsByType(ItemType.TYPE_9);if(0==n.length)return!1;for(var o={},a=0,r=n;a<r.length;a++){var h=r[a];o[h.configID]=!0}var l=function(t){for(var n=s[t][1],a=n.idList,r=0,h=a;r<h.length;r++){var l=h[r];if(i.listBook[l]&&-1==i.listBook[l].level){var c=e.jobs.indexOf(n.id);if(-1==c){var u=GlobalConfig.ConfigDecompose[l];if(o[u.itemId])return!0}else{for(var p=!1,d=0;d<SubRoles.ins().subRolesLen;d++){var g=SubRoles.ins().getSubRoleByIndex(d);if(g.job==c+1){p=!0;break}}if(!p)continue;var f=GlobalConfig.ConfigCard[l][0];if(f&&o[f.itemId])return!0}}}return!1};if(0!=t)return l(t);for(var c in s)if(l(c))return!0;return!1},e.prototype.getHaveIllustrationsSuit_a94=function(t){var e=UserBagSystem.ins().getBagGoodsByType(ItemType.TYPE_9),i=GlobalConfig.ConfigSuit[t][1];return 0==e.length?{ishave:!1,cur:0,target:i.idList.length}:void 0},e.jobs=[6,7,8],e}(SystemBase);__reflect(IllustrationsSystem.prototype,"IllustrationsSystem");var GameSystem;!function(t){t.book=IllustrationsSystem.ins.bind(IllustrationsSystem)}(GameSystem||(GameSystem={}));var WorldBossesRanksItemData=function(){function t(){}return t.prototype.parser=function(t){this.id=t.readInt(),this.roleName=t.readString(),this.value=t.readDouble()},t.prototype.parser1=function(t){this.roleName=t.readString(),this.value=t.readInt()},Object.defineProperty(t.prototype,"name",{get:function(){var t=this.roleName+":"+CommonUtils.overLength(this.value);return t},enumerable:!0,configurable:!0}),t}();__reflect(WorldBossesRanksItemData.prototype,"WorldBossesRanksItemData");var WorldBossesHeadRender=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.isAddEff=!1,e}return __extends(e,t),e.prototype.dataChanged=function(){if(this.haveGuildName(!1),this.isAddEff=!1,this.data instanceof CustomActorMonster)this.currentState="war",this.updateChar_a94(this.data);else if(isNaN(this.data))this.data instanceof SelectInfoData&&(this.currentState="panel",this.num.textFlow=(new egret.HtmlTextParser).parser(this.data.num+"pháº§n"),this.roleName.textFlow=(new egret.HtmlTextParser).parser(this.data.data.name),this.roleHead.source="yuanhead"+this.data.data.job+"0");else if(this.currentState="war",this.data){var t=EntityMgr.ins().getEntityByHandle(this.data)||EntityMgr.ins().getEntityByMasterhHandle(this.data);if(t)this.updateChar_a94(t);else if(KFBossSys.ins().isKFBossBattle&&KFBossSys.ins().flagHandle==this.data){var e=GlobalConfig.ConfigMonsters[GlobalConfig.CrossBossBase.flagId];if(e&&this.checkMonsterHead_a94(e)){var i=KFBossSys.ins().flagCD-egret.getTimer(),s=DateUtils.getFormatBySecond(i/1e3);0>=i?(s="",this.haveGuildName(!1)):this.haveGuildName(!0);var n=e.name+"\n|C:"+ColorUtil.RED+"&T:"+s+"|";this.roleName.textFlow=TextFlowMaker.generateTextFlow1(n),this.roleHead.source="monhead"+e.head+"_png",this.addAttEffect()}}else if(KfArenaSys.ins().isKFArena&&KfArenaSys.ins().flagHandle==this.data){var e=GlobalConfig.ConfigMonsters[GlobalConfig.CrossArenaBase.flagBossId];if(e&&this.checkMonsterHead_a94(e)){var i=KfArenaSys.ins().flagCD-egret.getTimer(),s=DateUtils.getFormatBySecond(i/1e3);0>=i?(s="",this.haveGuildName(!1)):this.haveGuildName(!0);var n=e.name+"\n|C:"+ColorUtil.RED+"&T:"+s+"|";this.roleName.textFlow=TextFlowMaker.generateTextFlow1(n),this.roleHead.source="monhead"+e.head+"_png",this.addAttEffect()}}}else{var o=GlobalConfig.ConfigMonsters[UserBossesSystem.ins().monsterID];o&&this.checkMonsterHead_a94(o)&&(this.roleName.textFlow=(new egret.HtmlTextParser).parser(this.truncateRoleName_a94(o.name)),this.roleHead.source="monhead"+o.head+"_png",this.addAttEffect())}this.isAddEff||this.removeAttEff()},e.prototype.checkMonsterHead_a94=function(t){return Assert(t.head,"áº¢nh Ä‘áº¡i diá»‡n quÃ¡i váº­t khÃ´ng tá»“n táº¡i, id:"+t.id+",name:"+t.name)?!1:!0},e.prototype.truncateRoleName_a94=function(t){var e=this.roleName;e.wordWrap=!1;var i=e.width;if(!(i>0))return t;var s=t;e.text=s;while(e.textWidth>i&&s.length>1)s=s.slice(0,-1),e.text=s+"â€¦";return s.length<t.length?s+"â€¦":t},e.prototype.updateChar_a94=function(t){if(t instanceof CustomActorRole){var e=t.infoModel;if(GameMap.fbType==UserFb.FB_TYPE_GUIDEBOSS){var i=e.name;if(e.type==EntityType.LadderPlayer){var s=i.split("\n");i=s[1]?s[1]:s[0],i=StringUtils.replaceStr(i,"0xffffff",this.roleName.textColor+"")}this.roleName.textFlow=TextFlowMaker.generateTextFlow1(i)}else{var n=e.guildName?"\n<font color='#6495ed'>"+e.guildName+"</font>":"",o=DevildomSysBase.ins().isDevildomBattle&&n?e.name+n:e.getNameWithServer2();o.indexOf("\n")>-1&&this.haveGuildName(!0),this.roleName.textFlow=(new egret.HtmlTextParser).parser(o)}if(Assert(e.job,"Nghá» nhiá»‡m vá»¥ khÃ´ng tá»“n táº¡i, id:"+e.configID+",name:"+e.name))return;this.roleHead.source="yuanhead"+e.job+"0",this.checkIsNowAttack_a94(e.handle)&&this.addAttEffect()}else{var a=t;if(a.infoModel.type==EntityType.Monster||KFBossSys.ins().isKFBossBattle&&a.infoModel.type==EntityType.CollectionMonst){var r=GlobalConfig.ConfigMonsters[a.infoModel.configID];if(Assert(r,"KhÃ´ng tÃ¬m tháº¥y cáº¥u hÃ¬nh quÃ¡i váº­t id:"+a.infoModel.configID))return;if(!this.checkMonsterHead_a94(r))return;this.roleName.textFlow=(new egret.HtmlTextParser).parser(this.truncateRoleName_a94(r.name)),this.roleHead.source="monhead"+r.head+"_png",this.checkIsNowAttack_a94(a.infoModel.handle)&&this.addAttEffect()}}},e.prototype.checkIsNowAttack_a94=function(t){var e=EntityMgr.ins().getRootMasterHandle(GameLogicManage.ins().currAttackHandle);return e==EntityMgr.ins().getRootMasterHandle(t)},e.prototype.addAttEffect=function(){t.prototype.addAttEffect.call(this),this.isAddEff=!0},e}(GuildWarMemberHeadItemRender);__reflect(WorldBossesHeadRender.prototype,"WorldBossesHeadRender");var ChatsDataBase=function(){function t(){}return t}();__reflect(ChatsDataBase.prototype,"ChatsDataBase");var UserFb=function(t){function e(){var e=t.call(this)||this;return e.fbModel={},e._groupID=1,e._guanqiaID=-1,e.rewards=[],e.eliteRewards=[],e.maxLen=0,e.guanqiaReward=0,e.worldReward=0,e.worldGuanQias=[],e.worldGuanQiaHasReceive=[],e.currentEnergy=0,e.canChallengGuanQia=!0,e.encounterPos=[],e.expMonterCount=0,e.expMonterCountKill=0,e.isQuite=!0,e.guideBossKill=0,e.showAni=!0,e.showAutoPk=-1,e.showAutoPk2=-1,e.firstAutoGuilder=!1,e.fbExpTotal=0,e.tfRoomID=0,e.tfPassID=0,e._tfInviteTime=0,e.showTfRed=!0,e.fbRings={buyTime:0,challengeTime:0,canTakeAward:!1},e.guanqiaMonster=[],e.fbConfig={},e.mijingFingfen=4,e.mijingUseTime=0,e.pkGqboss=!1,e.exp=0,e.fbDataList=[],e.initPos=!0,e.sysId=PackageID.Guanqia,e.regNetMsg(4,e.doAllRoleDie),e.regNetMsg(10,e.postFbInfoInit),e.regNetMsg(11,e.postUpDataInfo),e.regNetMsg(13,e.postFbTimes),e.regNetMsg(14,e.doBossBoxCount),e.regNetMsg(16,e.postFbExpData),e.regNetMsg(17,e.postExpFbTotal),e.regNetMsg(18,e.doFbGuideAliveTime),e.regNetMsg(21,e.postRingFbInfo),e.regNetMsg(1,e.postGuanqiasInfo),e.regNetMsg(2,e.doWavesData_a94),e.regNetMsg(3,e.doBossResults_a94),e.regNetMsg(5,e.doGuanQiaRewards),e.regNetMsg(6,e.doWroldGuanqiaReward),e.regNetMsg(12,e.doOfflinesReward_a94),e.regNetMsg(24,e.postGuardLeftTime),e.regNetMsg(25,e.postGuardInfo),e.regNetMsg(27,e.postGuardUseSkill),e.regNetMsg(28,e.postGuardCopyInfo),e.regNetMsg(29,e.postBossDrop),e.regNetMsg(30,e.postSuccessCreateTFRoom),e.regNetMsg(31,e.postSuccessEnterTFRoom),e.regNetMsg(32,e.exitTFRoom),e.regNetMsg(33,e.postChangeFTRoom),e.regNetMsg(34,e.postPassFTRoomInfo),e.regNetMsg(35,e.doTeamFBEnd),e.regNetMsg(36,e.doTeamFBRelive),e.regNetMsg(37,e.postTeamFBRank),e.regNetMsg(38,e.postTeamFbFlowarRecord),e.regNetMsg(39,e.teamFbSysInviteData),e.regNetMsg(40,e.postGuardWeaponLogs),e.observe(GameLogicManage.ins().postEnterMap,e.onSceneChange),e.observe(GameLogicManage.ins().postHpChange,e.recordKill),e}return __extends(e,t),Object.defineProperty(e.prototype,"rCount",{get:function(){return this.fbConfig.rCount||0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"goldEff",{get:function(){return this.fbConfig.goldEff||0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"expEff",{get:function(){return this.fbConfig.expEff||0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"zyPos",{get:function(){return this.fbConfig.zyPos},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"energy",{get:function(){return this.fbConfig.energy||0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"waveEnergy",{get:function(){return this.fbConfig.waveEnergy||0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"waveMonsterCount",{get:function(){return this.fbConfig.waveMonsterCount||0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"waveMonsterId",{get:function(){return this.fbConfig.waveMonsterId||[]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"outPos",{get:function(){return this.fbConfig.outPos||{x:0,y:0,a:0}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"rPos",{get:function(){return this.fbConfig.rPos||[]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"eliteMonsterId",{get:function(){return this.fbConfig.eliteMonsterId||0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"wanderpercent",{get:function(){return void 0==this.fbConfig.wanderpercent?5e3:this.fbConfig.wanderpercent},enumerable:!0,configurable:!0}),e.prototype.getBossDrop=function(t,e){var i=this.getBytes(29);i.writeByte(t),i.writeDouble(e),this.sendToServer(i)},e.prototype.postBossDrop=function(t){for(var e=this,i=t.readByte(),s=t.readDouble(),n=t.readByte(),o=0;n>o;o++){var a=new AwardsData;a.type=t.readInt(),a.id=t.readInt(),a.count=t.readInt(),0==a.type&&1!=a.id&&2!=a.id&&a.id!=MoneyConst.rune||DorpAssist.addDrop([0!=DorpAssist.tempDropPoint.x?DorpAssist.tempDropPoint.x:Math.floor(EntityMgr.ins().getNoDieRole().x/GameMap.CELL_SIZE),0!=DorpAssist.tempDropPoint.y?DorpAssist.tempDropPoint.y:Math.floor(EntityMgr.ins().getNoDieRole().y/GameMap.CELL_SIZE),a])}DorpAssist.start(),TimerMgr.ins().doTimerDelay(500,100,1,function(){e.getBossDrop(i,s)},this)},e.prototype.postGuardLeftTime=function(t){GuardWeapon.ins().leftTime=t.readUnsignedInt()},e.prototype.challengeGuard=function(){var t=this.getBytes(24);this.sendToServer(t)},e.prototype.callGuardBoss=function(){var t=this.getBytes(26);this.sendToServer(t)},e.prototype.guardUseSkill=function(t){var e=this.getBytes(27);e.writeByte(t),this.sendToServer(e)},e.prototype.postGuardInfo=function(t){var e=t.readByte();GuardWeapon.ins().challengeTimes=e,GuardWeapon.ins().isShowSweep=1==t.readByte()},e.prototype.postGuardUseSkill=function(t){return t.readByte()},e.prototype.postGuardCopyInfo=function(t){var e=GuardWeapon.ins().guardCopyInfo||new GuardCInfo;e.parser(t.readByte(),t.readInt(),t.readByte(),t.readInt(),t.readByte(),t.readInt()),GuardWeapon.ins().guardCopyInfo=e},e.prototype.recordKill=function(t){var e=t[0],i=t[1];e instanceof CustomActorRole||0>=i&&(this.expMonterCountKill+=1)},e.prototype.initLogin=function(){if(GlobalConfig.ConfigDailyFuben){this.fbDataList.length=0;for(var t in GlobalConfig.ConfigDailyFuben){var e=GlobalConfig.ConfigDailyFuben[t];e.bossId||this.fbDataList.push(e.id)}}},e.ins=function(){return t.ins.call(this)},e.prototype.onSceneChange=function(){this.rewards=[],this.eliteRewards=[],this.expMonterCountKill=0,this.expMonterCount=0,this.tfRoomID||ViewMgr.ins().close(TeamFbApartWin),ViewMgr.ins().close(TeamFbResultedWin),GameMap.fbType==e.FB_TEAM?ViewMgr.ins().open(TeamFightWin):ViewMgr.ins().close(TeamFightWin)},e.prototype.getFbInfoById=function(t){return this.fbModel[t]},e.prototype.autoToPk=function(){return GameMap.sceneInMain()?EncounterData.ins().isEncounter()?void UserTips.ins().showTips("|C:0xf3311e&T:Äang thá»­ thÃ¡ch ngÆ°á»i xung quanh|"):void(EntityMgr.ins().getNoDieRole()&&(RoleMainAI.ins().stopAi(),RoleMainAI.ins().clearAIList(),this.postPlayingWarm(1),e.ins().sendBossPK(),e.ins().pkGqboss=!0)):void 0},e.prototype.postEnergyAdd=function(){this.currentEnergy+=Math.ceil(this.waveEnergy/this.waveMonsterCount),this.currentEnergy>e.ins().energy&&(this.currentEnergy=e.ins().energy)},e.prototype.postPlayingWarm=function(t){return t},e.prototype.hasCounts=function(){if(GlobalConfig.ConfigDailyFuben)for(var t in GlobalConfig.ConfigDailyFuben){var e=GlobalConfig.ConfigDailyFuben[t],i=this.fbModel[e.id];if(i&&!e.bossId){var s=this.fbDataList.indexOf(e.id);if(-1!=s){if(e.zsLevel>0){var n=UserZsSystem.ins().lv>=e.zsLevel;if(e.id==GlobalConfig.ConfigZhanLing.fbIndex&&(n=UserZsSystem.ins().lv>=e.zsLevel&&GameServer.serverOpenDay+1>=GlobalConfig.ConfigZhanLing.openserverday),0==n)continue}else if(Actor.level<e.levelLimit)continue;var o=this.fbModel[i.fbID].getCounts();if(o>0)return!0;if(DiedGuideSystem.ins().diedFbRedPoint(this.fbModel[i.fbID].getResetCounts(),e.id))return!0}}}return!1},e.prototype.doAllRoleDie=function(t){ResultMgr.ins().create(GameMap.fbType,0)},e.prototype.postFbInfoInit=function(t){for(var e,i=t.readShort(),s=0;i>s;s++)e=new FbDailyModel,e.parser(t),this.fbModel[e.fbID]=e},e.prototype.sendPlayCallBoss=function(t){var e=this.getBytes(12);e.writeInt(t),this.sendToServer(e)},e.prototype.sendThreate=function(t){var e=this.getBytes(10);e.writeInt(t),this.sendToServer(e)},e.prototype.postUpDataInfo=function(t){var e=t.readInt();t.position-=4,this.fbModel[e].parser(t)},e.prototype.sendAddCounts=function(t,e){void 0===e&&(e=0);var i=this.getBytes(11);i.writeInt(t),i.writeByte(e),this.sendToServer(i)},e.prototype.postFbTimes=function(t){return this.curFbID=t.readInt(),this.curFbLeftTime=t.readInt(),[this.curFbID,this.curFbLeftTime]},e.prototype.doBossBoxCount=function(t){this.bossCallNum=t.readShort()},e.prototype.postFbExpData=function(t){return this.fbExp=this.fbExp||{},this.fbExp.useTime=t.readByte(),this.fbExp.sdTime=t.readByte(),this.fbExp.cid=t.readByte(),this.fbExp.sid=t.readByte(),this.fbExp},e.prototype.postExpFbTotal=function(t){return this.fbExpTotal=t.readInt(),this.fbExpTotal},e.prototype.fbExpRedPoint=function(){return Actor.level>=GlobalConfig.ConfigExpFubenBase.openLv&&(this.fbExp.useTime<GlobalConfig.ConfigExpFubenBase.freeCount+(GlobalConfig.ConfigExpFubenBase.vipCount[UserVip.ins().lv]||0)||this.fbExp.cid||this.fbExp.sid)?!0:!1},e.prototype.sendIntoFbGuide=function(t){var e=this.getBytes(18);e.writeInt(t),this.sendToServer(e)},e.prototype.sendFbGuideAttacker=function(){this.sendBaseProto(19)},e.prototype.sendFbGuideAlive=function(){this.sendBaseProto(20)},e.prototype.doFbGuideAliveTime=function(t){UserBossesSystem.ins().postRemainingTime(t)},e.prototype.postRingFbInfo=function(t){this.fbRings.buyTime=t.readShort(),this.fbRings.challengeTime=t.readShort(),this.fbRings.canTakeAward=t.readBoolean()},e.prototype.sendSweepRing=function(t){var e=this.getBytes(41);e.writeShort(t),this.sendToServer(e)},e.prototype.sendShouHuSweep=function(t){var e=this.getBytes(42);e.writeByte(t),this.sendToServer(e)},e.prototype.parser=function(t){var i=t.readInt();this.guanqiaID=i,this.firstAutoGuilder&&this.guanqiaID==e.AUTO_GUANQIA&&(this.firstAutoGuilder=!1,e.ins().setAutoToPk2())},e.prototype.parser1=function(t){this.exp=t.readInt();for(var e=t.readInt(),i=0;e>i;i++){var s=new WavedDropData;s.parser(t),this.rewards.push(s)}},Object.defineProperty(e.prototype,"guanqiaID",{get:function(){return this._guanqiaID},set:function(t){if(this._guanqiaID!=t){this._guanqiaID=t,this.bossIsChallenged=!1;for(var e in GlobalConfig.ConfigWorldReward)if(this._guanqiaID<=GlobalConfig.ConfigWorldReward[e].needLevel){this._groupID=GlobalConfig.ConfigWorldReward[e].groupId;break}this.postChangeGuanKaId()}this.encounterPos=[];for(var i in this.zyPos)this.encounterPos.push(parseInt(i))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"groupID",{get:function(){return this._groupID},enumerable:!0,configurable:!0}),e.prototype.isCanReceiveBox=function(t){return-1!=this.worldGuanQias.indexOf(t)},e.prototype.isGotReceiveBox=function(t){return-1!=this.worldGuanQiaHasReceive.indexOf(t)},e.prototype.isCanBossPK=function(){return-1!=this.guanqiaID},e.prototype.getRewardPop=function(){return this.rewards},e.prototype.getNextMapReward=function(){for(var t=1;GlobalConfig.ConfigWorldReward[t];){if(!this.isGotReceiveBox(t)&&GlobalConfig.ConfigWorldReward[t].needLevel<e.ins().guanqiaID)return void this.sendWroldGuanqiaReward(t);t++}},e.prototype.getRewardCurrent=function(){for(var t=1;GlobalConfig.ConfigWorldReward[t];){var i=GlobalConfig.ConfigWorldReward[t];this.isGotReceiveBox(t),e.ins().guanqiaID;if(!this.isGotReceiveBox(t)&&e.ins().guanqiaID>i.needLevel)return i.rewards;t++}return null},e.prototype.getRewardNext=function(){for(var t=1;GlobalConfig.ConfigWorldReward[t];){var i=GlobalConfig.ConfigWorldReward[t];if(e.ins().guanqiaID<=i.needLevel)return i.rewards;t++}return null},e.prototype.getNextChapterNeed=function(){for(var t=1;GlobalConfig.ConfigWorldReward[t];){var i=GlobalConfig.ConfigWorldReward[t];if(e.ins().guanqiaID<=i.needLevel)return i.needLevel-e.ins().guanqiaID+1;t++}return 0},e.prototype.getDiffsChapter=function(){for(var t=1;GlobalConfig.ConfigWorldReward[t];){var i=GlobalConfig.ConfigWorldReward[t];if(e.ins().guanqiaID<=i.needLevel){var s=GlobalConfig.ConfigWorldReward[t-1];return i.needLevel-s.needLevel}t++}return 0},e.prototype.getNewChapterInfo=function(){for(var t=1;GlobalConfig.ConfigWorldReward[t];){var i=GlobalConfig.ConfigWorldReward[t];if(e.ins().guanqiaID<=i.needLevel){var s=t-1;return s=s?s:1,GlobalConfig.ConfigWorldReward[s]}t++}return null},e.prototype.getGuanQiaChip=function(){for(var t in GlobalConfig.ConfigWorldReward){var e=GlobalConfig.ConfigWorldReward[t];if(this.guanqiaID<=e.needLevel)return e.rewards[0].id}return 0},e.prototype.postGuanqiasInfo=function(t){var e=this.guanqiaID;this.parser(t),this.goldEffLast=t.readInt(),this.expEffLast=t.readInt(),this.fbConfig=JSON.parse(t.readString()),-1!=e&&this.guanqiaID!=e&&(this.currentEnergy=0,ViewMgr.ins().open(EffectivenessTips)),this.guanqiaMonster=JSON.parse(t.readString()),0==GameMap.fubenID&&GameLogicManage.ins().createGuanqiaMonster()},e.prototype.postChangeGuanKaId=function(){},e.prototype.sendGetRewards=function(t){var e=this.getBytes(1);e.writeByte(t?1:0),this.sendToServer(e)},e.prototype.sendBossPK=function(){var t=this,e=this.getBytes(2),i=EntityMgr.ins().getNoDieRole();TimerMgr.ins().doTimer(500,1,function(){e.writeInt(Math.floor(i.x)),e.writeInt(Math.floor(i.y)),t.sendToServer(e)},this)},e.prototype.doWavesData_a94=function(t){this.exp=t.readInt();for(var e=t.readInt(),i=[],s=0;e>s;s++){var n=new WavedDropData;n.parser(t),i.push(n)}var o=t.readByte();o>0?(this.eliteRewards.push(i),this.eliteRewards.length>5&&this.eliteRewards.shift(),GameLogicManage.ins().createGuanqiaMonster(!1,!0)):this.rewards=this.rewards.concat(i)},e.prototype.doBossResults_a94=function(t){for(var i,s=this,n=t.readBoolean(),o=t.readShort(),a=t.readShort(),r=[],h=0;a>h;h++)i=new AwardsData,i.parser(t),r.push(i);if(n){for(var l=SubRoles.ins().subRolesLen,c=void 0,u=0;l>u;u++)c=EntityMgr.ins().getMainRole(u),c&&c.resetStand();for(var p=0;p<r.length;p++)if(i=r[p],0==i.type&&1!=i.id&&2!=i.id&&i.id!=MoneyConst.rune||o==e.FB_TYPE_GUARD_WEAPON||DorpAssist.addDrop([0!=DorpAssist.tempDropPoint.x?DorpAssist.tempDropPoint.x:Math.floor(EntityMgr.ins().getNoDieRole().x/GameMap.CELL_SIZE),0!=DorpAssist.tempDropPoint.y?DorpAssist.tempDropPoint.y:Math.floor(EntityMgr.ins().getNoDieRole().y/GameMap.CELL_SIZE),i]),1==i.type){var d=GlobalConfig.ConfigItem[i.id],g=ConfigItem.getType(d);if(7==g){var f=new ItemData;f.configID=i.id,UserTips.ins().showGoodEquipTips(f)}}var v=function(){GameMap.fbType!=e.FB_TYPE_EXP&&s.sendGetBossRewards();var t=null;if((o==e.FB_TYPE_TIAOZHAN&&HaoTianLevelModel.ins().getIsNextOpen||GameMap.fbType==e.FB_TYPE_PERSONAL)&&(t=function(){e.ins().pkGqboss=!1,GameMap.fbType==e.FB_TYPE_PERSONAL?ViewMgr.ins().open(BossesWin,0):e.ins().isQuite&&ViewMgr.ins().open(FbDailyWin,2)}),o==e.FB_TYPE_GUIDEBOSS&&4e4==GameMap.fubenID){var i=e.ins().guideBossKill,n=void 0,a=void 0,h=void 0,l=void 0;i?(n=Actor.myName,a=SubRoles.ins().roles[0].job,h=SubRoles.ins().roles[0].sex):(n=e.ins().guideBossPlayerName,a=e.ins().guideBossPlayerJob,h=e.ins().guideBossPlayerSex),l="yuanhead"+a+"0",ResultMgr.ins().create(o,!0,r,"",null,[i,n,l])}else if(GameMap.fbType==e.FB_TYPE_EXP)TimerMgr.ins().doTimer(800,1,function(){ViewMgr.ins().open(FbExpResultWin)},s);else if(GameMap.fbType==e.FB_TYPE_LIEYAN)TimerMgr.ins().doTimer(800,1,function(){ViewMgr.ins().open(FireResultedWin)},s);else if(GameMap.fbType==e.FB_TYPE_MIJING||GameMap.fbType==e.FB_TYPE_LABA);else if(o!=e.FB_TYPE_GUANQIABOSS)r.length?TimerMgr.ins().doTimer(800,1,function(){ResultMgr.ins().create(o,1,r,"Nháº­n Ä‘Æ°á»£c pháº§n thÆ°á»Ÿng nhÆ° sauï¼š",t)},s):(e.ins().pkGqboss=!1,e.ins().sendFbExit());else if(s.outPos.x&&s.outPos.y){var c=s.outPos.x*GameMap.CELL_SIZE,u=s.outPos.y*GameMap.CELL_SIZE;s.outPos.hasOwnProperty("a")&&1==s.outPos.a&&GameLogicManage.ins().addOutEff(c,u);for(var p=SubRoles.ins().subRolesLen,d=void 0,g=0;p>g;g++)d=EntityMgr.ins().getMainRole(g),d&&GameMap.moveEntity(d,c,u);TimerMgr.ins().doTimer(1e3,0,s.tempFunc,s)}else s.initPos=!0,e.ins().pkGqboss=!1,e.ins().sendFbExit()};DorpAssist.addCompleteFunc(v,this),DorpAssist.start()}else e.ins().pkGqboss=!1,GameMap.fbType==e.FB_TYPE_GUANQIABOSS&&PlayFun.ins().closeAuto(),ResultMgr.ins().create(o,0);GameMap.fbType==e.FB_TYPE_GUANQIABOSS&&HintModule.ins().postKillBossEx(e.ins().guanqiaID)},e.prototype.tempFunc=function(){var t=EntityMgr.ins().getNoDieRole();if(!t)return void TimerMgr.ins().remove(this.tempFunc,this);var i=Math.floor(t.x/GameMap.CELL_SIZE),s=Math.floor(t.y/GameMap.CELL_SIZE),n=this.outPos.x,o=this.outPos.y;i==n&&s==o&&(TimerMgr.ins().remove(this.tempFunc,this),GameLogicManage.ins().removeOutEff(),this.initPos=!1,e.ins().pkGqboss=!1,e.ins().sendFbExit(),HintModule.ins().postSeceneIn())},e.prototype.sendGetBossRewards=function(){this.sendBaseProto(3)},e.prototype.sendFbExit=function(){var t=this.getBytes(4),e=0,i=0,s=EntityMgr.ins().getNoDieRole();s?(e=GameMap.point2Grip(s.x),i=GameMap.point2Grip(s.y)):(s=EntityMgr.ins().getRole(),s?(e=GameMap.point2Grip(s.x),i=GameMap.point2Grip(s.y)):(e=0,i=0)),t.writeInt(e),t.writeInt(i),this.sendToServer(t)},e.prototype.sendGetAward=function(){this.sendBaseProto(5)},e.prototype.doGuanQiaRewards=function(t){this.guanqiaReward=t.readShort()+1,this.postZJAwardChange(),this.postChangeGuanKaId(),this.postWroldGuanqiaReward()},e.prototype.postZJAwardChange=function(){},e.prototype.sendWroldGuanqiaReward=function(t){var e=this.getBytes(6);e.writeInt(t),this.sendToServer(e)},e.prototype.doWroldGuanqiaReward=function(t){var e=t.readInt(),i=0,s=0;this.worldGuanQias=[],this.worldGuanQiaHasReceive=[];for(var n=0;e>n;n++)i=t.readInt(),s=n+1,0==i?this.worldGuanQias.push(s):1==i&&this.worldGuanQiaHasReceive.push(s),(0==i||1==i)&&(this.worldReward=s);this.postWroldGuanqiaReward()},e.prototype.postWroldGuanqiaReward=function(){},e.prototype.doOfflinesReward_a94=function(t){var e=[];e[0]=t.readInt(),e[1]=t.readInt(),e[2]=t.readInt(),e[3]=t.readInt(),e[4]=t.readInt();for(var i=t.readInt(),s=[],n=0;i>n;n++){var o=new Object;o.type=t.readInt(),o.exp=t.readInt(),o.gold=t.readInt(),s.push(o)}e[5]=s,i=t.readByte();for(var a=[],n=0;i>n;n++){var r={};r.id=t.readByte(),r.count=t.readInt(),a.push(r)}ViewMgr.ins().open(OfflineRewardWindow,e,a)},e.prototype.getGuanQiaWorld=function(){return this.worldGuanQias.length>0?this.worldGuanQias[this.worldGuanQias.length-1]:0},e.prototype.getWorldGuanQiaBoxs=function(){var t=this.worldGuanQias.length;if(t>0)for(var i=void 0,s=0;t>s;s++)if(i=this.worldGuanQias[s],e.ins().isCanReceiveBox(i))return i;return this.worldReward+1},e.prototype.sendMonsterKill=function(t){var e=this.getBytes(13);e.writeInt(t),this.sendToServer(e)},e.prototype.sendExpChallengeFb=function(){this.sendBaseProto(14)},e.prototype.sendSaodang=function(){var t=this.getBytes(15);this.sendToServer(t)},e.prototype.sendMulGetAward=function(t,e){var i=this.getBytes(16);i.writeByte(t),i.writeByte(e),this.sendToServer(i)},e.prototype.sendThreateFbRing=function(){this.sendBaseProto(22)},e.prototype.sendFbTakeRingAward=function(t){var e=this.getBytes(23);e.writeShort(t),this.sendToServer(e)},e.prototype.checkShowGuanqiaIcon=function(){return OpenSystBase.ins().checkSysOpen(SystemType.CHALLENGE)},e.prototype.postFlyExp=function(t,e,i){return void 0===e&&(e=1),void 0===i&&(i=10),[t,e,i]},e.prototype.getExpFbId=function(){var t=GlobalConfig.ConfigExpFuben,e=Actor.level,i=0;for(var s in t){if(t[s].slv>e)break;i=+s}return i},e.prototype.checkInFBPlaying=function(){return GameMap.fbType==e.FB_TYPE_GUANQIABOSS||e.ins().pkGqboss?(UserTips.ins().showCenterTips("|C:0xf3311e&T:Äang trong lÃºc thá»­ thÃ¡ch quan áº£i|"),!0):0==GameMap.fubenID||CityCCSystem.ins().isCity?!1:(UserTips.ins().showCenterTips("|C:0xf3311e&T:Äang thá»­ thÃ¡ch phÃ³ báº£n, vui lÃ²ng thá»­ láº¡i sau|"),!0)},e.prototype.createMonsters=function(t){var i=this.guanqiaMonster[t],s=e.createModels(i);return s.name=i.name,s._avatar=i.avatar,s._scale=i.scale,s.wanderrange=i.wanderrange,s.wandertime=i.wandertime,s.effect=i.effect,s._dirNum=i.dirNum,s},e.createModels=function(t){var e=new EntityModel;return e.type=EntityType.Monster,e.configID=t.id,e.setAtt(AttributeType.atHp,t.hp),e.setAtt(AttributeType.atMaxHp,t.hp),e.setAtt(AttributeType.atAttack,t.atk),e.setAtt(AttributeType.atDef,t.def),e.setAtt(AttributeType.atRes,t.res),e.setAtt(AttributeType.atCrit,t.crit),e.setAtt(AttributeType.atTough,t.tough),e.setAtt(AttributeType.atMoveSpeed,t.ms||1e3),e.setAtt(AttributeType.atAttackSpeed,t.as||1e3),e.setAtt(AttributeType.atPenetrate,t.penetRate||0),e},e.getPersonalBossByFbIds=function(){var t=[];for(var e in GlobalConfig.ConfigDailyFuben){var i=GlobalConfig.ConfigDailyFuben[e];i&&i.bossId&&t.push(i)}return t},e.isCanThreate=function(){for(var t,i,s=this.getPersonalBossByFbIds(),n=s.length,o=0;n>o;o++)if(t=s[o],e.ins().getFbInfoById(t.id)&&(i=e.ins().getFbInfoById(t.id).getCounts(),i>0))if(t.monthcard){if(Recharge.ins().monthDay>0)return!0}else if(t.privilege){if(Recharge.ins().getIsForeve())return!0}else if(t.specialCard){if(Recharge.ins().franchise)return!0}else if(t.zsLevel>0){if(UserZsSystem.ins().lv>=t.zsLevel)return!0}else if(Actor.level>=t.levelLimit)return!0;return!1},e.prototype.setAutoToPk=function(){-1==this.showAutoPk&&(this.showAutoPk=0,this.postAutoToPk())},e.prototype.postAutoToPk=function(){},e.prototype.setAutoToPk2=function(){-1==this.showAutoPk2&&(this.showAutoPk2=0,this.postAutoToPk2())},e.prototype.postAutoToPk2=function(){},e.prototype.sendTFRoomCreate=function(){var t=this.getBytes(30);
this.sendToServer(t)},e.prototype.postSuccessCreateTFRoom=function(t){this.tfRoomID=t.readInt();var e=t.readInt();this.tfRoomID?ViewMgr.ins().open(TeamFbApartWin,1,e,this.tfRoomID):ViewMgr.ins().close(TeamFbApartWin)},e.prototype.sendTFRoomEnter=function(t){var e=this.getBytes(31);e.writeInt(t),this.sendToServer(e)},e.prototype.postSuccessEnterTFRoom=function(t){switch(t.readByte()){case 0:var e=t.readInt();this.tfRoomID=t.readInt(),ViewMgr.ins().open(TeamFbApartWin,1,e,this.tfRoomID);break;case 1:UserTips.ins().showTips("Má»—i tuáº§n"+DateUtils.WEEK_CN[GlobalConfig.ConfigTeamFuBenBase.closeTime[0]]+GlobalConfig.ConfigTeamFuBenBase.closeTime[1]+" sau khÃ´ng thá»ƒ thá»­ thÃ¡ch");break;case 2:UserTips.ins().showTips("Trong phÃ³ báº£n khÃ´ng thá»ƒ vÃ o");break;case 3:UserTips.ins().showTips("ÄÃ£ á»Ÿ trong phÃ²ng khÃ¡c");break;case 4:UserTips.ins().showTips("PhÃ²ng muá»‘n vÃ o khÃ´ng tá»“n táº¡i");break;case 5:UserTips.ins().showTips("Táº§ng vÆ°á»£t áº£i hiá»‡n táº¡i chÆ°a Ä‘á»§");break;case 6:UserTips.ins().showTips("Lá»—i cáº¥u hÃ¬nh, khÃ´ng tá»“n táº¡i cáº¥u hÃ¬nh phÃ²ng nÃ y");break;case 7:UserTips.ins().showTips("PhÃ²ng Ä‘Ã£ Ä‘áº§y ngÆ°á»i")}},e.prototype.sendTFRoomExit=function(){this.sendBaseProto(32)},e.prototype.exitTFRoom=function(t){switch(t.readByte()){case 1:break;case 2:UserTips.ins().showTips("Báº¡n Ä‘Ã£ bá»‹ Ä‘á»™i trÆ°á»Ÿng Ä‘Ã¡ khá»i phÃ²ng");break;case 3:UserTips.ins().showTips("Äá»™i trÆ°á»Ÿng Ä‘Ã£ giáº£i tÃ¡n phÃ²ng")}ViewMgr.ins().close(TeamFbApartWin),this.tfRoomID=0},e.prototype.sendTFBegin=function(){this.sendBaseProto(33)},e.prototype.postChangeFTRoom=function(t){this.tfRoomID=t.readInt();var e=t.readByte();this.tfMembers||(this.tfMembers=[]),this.tfMembers.length=e,this.isTFCaptain=!1;for(var i,s=0;e>s;s++)i=this.tfMembers[s],i||(i=new TeamFuBenRoleVo,this.tfMembers[s]=i),i.parse(t),i.roleID==Actor.actorID&&1==i.position&&(this.isTFCaptain=!0)},e.prototype.sendOutTFRoom=function(t){var e=this.getBytes(34);e.writeInt(t),this.sendToServer(e)},e.prototype.sendFbExitTF=function(t){var e=this.getBytes(35);e.writeByte(t),this.sendToServer(e)},e.prototype.postPassFTRoomInfo=function(t){this.tfPassID=t.readInt(),this._tfInviteTime=t.readInt()},e.prototype.getTfInviteCD=function(){return Math.floor((1e3*this._tfInviteTime+1e3*DateUtils.SECOND_2010-GameServer.serverTime)/1e3)},e.prototype.isTeamFBOpen=function(){return UserZsSystem.ins().lv>=GlobalConfig.ConfigTeamFuBenBase.needZsLv&&GameServer.serverOpenDay+1>=GlobalConfig.ConfigTeamFuBenBase.openDay},e.prototype.doTeamFBEnd=function(t){var e=t.readInt(),i=t.readByte(),s=t.readByte(),n=[];n.length=s;for(var o,a=0;s>a;a++)o=new TeamFuBenRoleVo,n[a]=o,o.roleID=t.readInt(),o.position=t.readByte(),o.roleName=t.readString(),o.job=t.readByte(),o.sex=t.readByte();ViewMgr.ins().open(TeamFbResultedWin,e,i,n)},e.prototype.doTeamFBRelive=function(t){UserBossesSystem.ins().killerHandler=t.readDouble(),UserBossesSystem.ins().reliveTime=t.readInt(),UserBossesSystem.ins().reliveTime>0?(UserBossesSystem.ins().clearWorldBossList(),ViewMgr.ins().open(WorldBossesBeKillWin)):ViewMgr.ins().close(WorldBossesBeKillWin)},e.prototype.sendTFRank=function(){this.sendBaseProto(36)},e.prototype.postTeamFBRank=function(t){this.tfPassRanks=[];for(var e,i,s=t.readByte(),n=0;s>n;n++){e={configID:t.readInt(),members:[]},i=t.readByte();for(var o=0;i>o;o++)e.members.push({position:t.readByte(),roleName:t.readString()});this.tfPassRanks.push(e)}},e.prototype.sendTFlower=function(t,e){var i=this.getBytes(37);i.writeInt(t),i.writeInt(e),this.sendToServer(i)},e.prototype.postTeamFbFlowarRecord=function(t){var e=t.readInt();this.tfFlowerRecords||(this.tfFlowerRecords=[]);for(var i=0;e>i;i++)this.tfFlowerRecords.push({roleName:t.readString(),count:t.readInt()});for(;this.tfFlowerRecords.length>10;)this.tfFlowerRecords.shift()},e.prototype.clearTfFlowerRecord=function(){this.tfFlowerRecords=[]},e.prototype.sendTfSysInvite=function(t){var e=this.getBytes(38);e.writeString(t),this.sendToServer(e)},e.prototype.teamFbSysInviteData=function(t){ChatsSystem.ins().postSysChatsMsg(new ChatsSystemData(3,t.readString()))},e.prototype.checkTFRed=function(){return this.isTeamFBOpen()?this.showTfRed:!1},e.prototype.postChangeShowRed=function(t){this.showTfRed=t},e.prototype.sendGuardWeaponLogs=function(){this.sendBaseProto(40)},e.prototype.postGuardWeaponLogs=function(t){for(var e=t.readByte(),i=[],s=0;e>s;s++){var n=t.readInt(),o=t.readString(),a=t.readString(),r=t.readString();i.push({noticeId:n,roleName:o,monsterName:a,itemName:r})}return i},e.FB_TYPE_GUANQIA=0,e.FB_TYPE_GUANQIABOSS=1,e.FB_TYPE_CITY=20,e.FB_TYPE_TIAOZHAN=9,e.FB_TYPE_ZHUANSHENGBOSS=10,e.FB_TYPE_ALLHUMENBOSS=7,e.FB_TYPE_PERSONAL=6,e.FB_TYPE_HOMEBOSS=17,e.FB_TYPE_MATERIAL=2,e.FB_TYPE_EXP=16,e.FB_TYPE_GUILD_BOSS=15,e.FB_TYPE_GUILD_WAR=14,e.FB_TYPE_MIJING=21,e.FB_ID_JINGYAN=3005,e.FB_ID_MINE=99999,e.FB_TYPE_GUIDEBOSS=18,e.FB_TYPE_NEW_WORLD_BOSS=19,e.FB_TYPE_LIEYAN=23,e.FB_TYPE_GOD_WEAPON=26,e.FB_TYPE_GOD_WEAPON_TOP=27,e.FB_TYPE_PEAKED=30,e.FB_TYPE_DARK_BOSS=36,e.FB_TYPE_HIDE_BOSS=37,e.FB_TYPE_HUN_SHOU=38,e.FB_TEAM=35,e.FB_TYPE_FIRE_RING=24,e.FB_TYPE_PEAK=30,e.FB_TYPE_GUARD_WEAPON=29,e.FB_TYPE_LABA=31,e.FB_TYPE_KF_BOSS=32,e.FB_TYPE_DEVILDOM_BOSS=39,e.FB_TYPE_KF_ARENA=40,e.AUTO_GUANQIA=20,e.TEAM_FB_WIN_REFLASH_PANEL="TEAM_FB_WIN_REFLASH_PANEL",e.TF_SIMLPE_HEIGHT=149,e.TF_EXPAND_HEIGHT=298,e}(SystemBase);__reflect(UserFb.prototype,"UserFb");var GameSystem;!function(t){t.userfb=UserFb.ins.bind(UserFb)}(GameSystem||(GameSystem={}));var EquipPos;!function(t){t[t.WEAPON=0]="WEAPON",t[t.HEAD=1]="HEAD",t[t.CLOTHES=2]="CLOTHES",t[t.NECKLACE=3]="NECKLACE",t[t.Wrist=4]="Wrist",t[t.BRACELET=5]="BRACELET",t[t.RING=6]="RING",t[t.SHOE=7]="SHOE",t[t.DZI=8]="DZI",t[t.HAT=9]="HAT",t[t.VIZARD=10]="VIZARD",t[t.CLOAK=11]="CLOAK",t[t.SHIELD=12]="SHIELD",t[t.MAX=13]="MAX"}(EquipPos||(EquipPos={}));var FuliActBtnRenderer=function(t){function e(){var e=t.call(this)||this;return e.skinName="SkinActBtn",DisplayUtils.removeFromParent(e.mc),e.mc=null,e}return __extends(e,t),e.prototype.dataChanged=function(){this.iconDisplay.source=this.data.icon;var t=!1;switch(this.data.type){case 1:t=DailyChecksIn.ins().showRedPoint();break;case 2:t=Activity.ins().getSevenDayStast();break;case 3:t=!1;break;case 4:t=Recharge.ins().franchise&&Recharge.ins().franchiseget?!0:!1;break;case 5:t=Activity.ins().checkNoticeRed();break;case 6:t=!1}t?(this.mc||(this.mc=new McAnimation,this.mc.setDelayToLoad(!0),this.mc.x=45,this.mc.y=53,this.mc.scaleX=1,this.mc.scaleY=.97),this.mc.playFile(ResDirMgr.RES_DIR_EFF+"hdzqeff",-1),this.addChild(this.mc)):(DisplayUtils.removeFromParent(this.mc),this.mc=null),this.redPoint.visible=t},e}(ItemRenderBase);__reflect(FuliActBtnRenderer.prototype,"FuliActBtnRenderer");var EntityModel=function(t){function e(){var e=t.call(this)||this;return e.isElite=!1,e.attributeData=[],e.attributeExData=[],e.killNum=0,e.isMy=!1,e.weaponsId=0,e.isWander=!1,e.lyMarkLv=0,e.lyMarkSkills=[],e.type=EntityType.Monster,e}return __extends(e,t),e.prototype.parser=function(t){if(this.parserBase(t),this.type!=EntityType.CollectionMonst){this.parserAtt(t);for(var e=t.readShort(),i=0;e>i;i++)t.readInt();this.parserLyMark(t)}},e.prototype.parserLyMark=function(t){this.lyMarkLv=t.readShort(),this.lyMarkSkills=[];var e=t.readByte();this.lyMarkSkills.length=e;for(var i=0;e>i;i++)this.lyMarkSkills[i]=t.readShort()},e.prototype.parserBase=function(t){this.type=t.readShort(),this.handle=t.readDouble(),this.configID=t.readInt(),this.masterHandle=t.readDouble(),this.x=t.readInt(),this.y=t.readInt(),this.isMy=this.checkHandleIsMy(this.masterHandle)},e.prototype.checkHandleIsMy=function(t){if(t==Actor.handle)return!0;for(var e=SubRoles.ins().roles,i=0,s=e;i<s.length;i++){var n=s[i];if(n.handle==t)return!0}return!1},e.prototype.parserAtt=function(t,e){void 0===e&&(e=!1);var i=t.readShort();if(e)for(var s=0;i>s;s++){var n=this.attributeData[s];this.attributeData[s]=t.readDouble();var o=this.attributeData[s]-n;if(n!=this.attributeData[s]&&-1==AttributeData.FILTER_BASE_DATA_ID.lastIndexOf(s)){if(0>=o)continue;if(2>s||s>6){var a=o>0?"35e62d":"f3311e",r=new AttributeData(s,o);if(!AttributeData.getAttrStrByType(r.type))continue;var h="|C:0x"+a+"&T:"+AttributeData.getAttStrByType(r,0,"+",!0,!0,16777215,2345507)+"|";GweaponCC.ins().gwshowTips||UserTips.ins().showTips(h);continue}UserTips.ins().showAttrTips(s,o)}}else for(var s=0;i>s;s++)this.attributeData[s]=t.readDouble()},e.prototype.parserExtAtt=function(t,e){void 0===e&&(e=!1);var i=t.readShort();if(e)for(var s=0;i>s;s++){var n=this.attributeExData[s];if(this.attributeExData[s]=t.readInt(),n!=this.attributeExData[s]&&-1==AttributeData.FILTER_EXTDATA_ID.lastIndexOf(s)){var o=this.attributeExData[s]-n;if(0>=o)continue;var a=o>0?"35e62d":"f3311e",r=new AttributeData(s,o),h="|C:0x"+a+"&T:"+AttributeData.getExtAttStrByType(r,0)+"|";UserTips.ins().showTips(h)}}else for(var s=0;i>s;s++)this.attributeData[s]=t.readInt()},e.prototype.parserHeirloom=function(){},e.prototype.getAtt=function(t){return this.attributeData[t]||0},e.prototype.setAtt=function(t,e){this.attributeData[t]=e},e.prototype.getExAtt=function(t){return this.attributeExData[t]||0},Object.defineProperty(e.prototype,"avatarFileName",{get:function(){return this.avatar.toString()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"weaponFileName",{get:function(){return""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"avatar",{get:function(){return this._avatar||GlobalConfig.ConfigMonsters[this.configID].avatar},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this._name||GlobalConfig.ConfigMonsters[this.configID].name},set:function(t){this._name=t},enumerable:!0,configurable:!0}),e.prototype.getNameWithServer=function(){return this._servId&&KFServerSys.ins().isKF?this.name+("S"+this._servId):this.name},e.prototype.getDir=function(){var t=GlobalConfig.ConfigMonsters[this.configID];if(!t)return-1;var e=GlobalConfig.ConfigMonsters[this.configID].dir;return isNaN(e)?-1:e},Object.defineProperty(e.prototype,"dirNum",{get:function(){var t=GlobalConfig.ConfigMonsters[this.configID];return t&&(this._dirNum=0/0,t.dirNum)?t.dirNum:this._dirNum?this._dirNum:2},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"avatarScale",{get:function(){var t=this._scale||GlobalConfig.ConfigMonsters[this.configID].scale;return t?t/100:1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"avatarEffect",{get:function(){return GlobalConfig.ConfigMonsters[this.configID]&&GlobalConfig.ConfigMonsters[this.configID].effect?GlobalConfig.ConfigEffect[GlobalConfig.ConfigMonsters[this.configID].effect].fileName:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"attRange",{get:function(){return GlobalConfig.ConfigMonsters[this.configID].attrange?GlobalConfig.ConfigMonsters[this.configID].attrange:0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"movePara",{get:function(){return GlobalConfig.ConfigYouDang[this.wandertime]&&this.wanderrange?[this.wanderrange,GlobalConfig.ConfigYouDang[this.wandertime].fileName]:null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"lv",{get:function(){return GlobalConfig.ConfigMonsters[this.configID].level},set:function(t){this._lv=t},enumerable:!0,configurable:!0}),e.prototype.setPos=function(t,e){this.x=t,this.y=e},e}(NpcModel);__reflect(EntityModel.prototype,"EntityModel"),window.EntityModel=EntityModel;var GweaponFubenView=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.childrenCreated=function(){this._ary=new eui.ArrayCollection,this.checkRank.touchEnabled=!0,this.checkRank.textFlow=(new egret.HtmlTextParser).parser("<u>Xem báº£ng xáº¿p háº¡ng</u>")},e.prototype.open=function(){this.addTouchEvent(this.checkRank,this.touchHandler_a94),this.addTouchEvent(this.challenge,this.touchHandler_a94),this.observe(GweaponCC.ins().postFubenInfo,this.updateShowView_a94),this.observe(GweaponCC.ins().postRankInfo,this.updateRankInfo_a94),this.observe(UserBagSystem.ins().postItemCountChange,this.useToItem_a94),this.list.dataProvider=this._ary,this.list.itemRenderer=GweaponFubenGridRender,this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onTouchList_a94,this),GweaponCC.ins().requestFubenInfo()},e.prototype.updateShowView_a94=function(){GweaponCC.ins().requestRanInfo(),this._ary.replaceAll(GweaponCC.ins().fubenInfoData.listData);var t=(GlobalConfig.ConfigGodWeaponBase.freeCount,GweaponCC.ins().fubenInfoData.hadChallengeNum);this.countText.text="Sá»‘ láº§n cÃ²n láº¡i hÃ´m nay: "+t,this.list.selectedIndex=0,this._selectData=this.list.selectedItem,GweaponCC.ins().fubenInfoData.hadChallengeNum>0?this.rpImg.visible=!0:this.rpImg.visible=!1},e.prototype.updateRankInfo_a94=function(){var t=GweaponCC.ins().rankInfoDataAry,e=t.length;0==e?this.rank.visible=!1:this.rank.visible=!0;for(var i,s=0;3>s;s++)i=t[s],i?(this.getRankImg_a94(s+1).visible=!0,this.getPlayName_a94(s+1).visible=!0,this.getPlayRank_a94(s+1).visible=!0,this.getPlayTime_a94(s+1).visible=!0,this.getPlayName_a94(s+1).text=i.nameStr,this.getPlayRank_a94(s+1).text=i.floorNum+"táº§ng",this.getPlayTime_a94(s+1).text=i.getgetTimeStr()):(this.getPlayName_a94(s+1).visible=!1,this.getPlayRank_a94(s+1).visible=!1,this.getPlayTime_a94(s+1).visible=!1,this.getRankImg_a94(s+1).visible=!1)},e.prototype.useToItem_a94=function(){this._isUser&&(this._isUser=!1,this._selectData&&GweaponCC.ins().joinFuben(this._selectData.gridNum))},e.prototype.getRankImg_a94=function(t){return this["rank"+t+"Img"]},e.prototype.getPlayName_a94=function(t){return this["player"+t+"Name"]},e.prototype.getPlayRank_a94=function(t){return this["player"+t+"Rank"]},e.prototype.getPlayTime_a94=function(t){return this["player"+t+"Time"]},e.prototype.close=function(){this._selectData=null,this.removeTouchEvent(this.checkRank,this.touchHandler_a94),this.removeTouchEvent(this.challenge,this.touchHandler_a94),this.removeObserve(),this.list.dataProvider=null},e.prototype.touchHandler_a94=function(t){if(t.target==this.challenge){if(!this.showTips_a94())return;this._selectData&&GweaponCC.ins().joinFuben(this._selectData.gridNum)}else t.target==this.checkRank&&ViewMgr.ins().open(GweaponMijingRankView)},e.prototype.onTouchList_a94=function(t){this._selectData=this.list.selectedItem},e.prototype.showTips_a94=function(){var t=GweaponCC.ins().fubenInfoData.hadChallengeNum;if(t>0)return!0;var e="",i=UserBagSystem.ins().getBagGoodsByTypeAndId(UserBagSystem.BAG_TYPE_OTHTER,GlobalConfig.ConfigGodWeaponBase.fubenItem);return i?(e="XÃ¡c nháº­n dÃ¹ng 1 <font color='#ec6014'>"+i.itemConfig.name+"</font> Ä‘á»ƒ tÄƒng lÆ°á»£t thá»­ thÃ¡ch?\n",WarnView.show(e,function(){this._isUser=!0,UserBagSystem.ins().sendUseItem(i.configID,1)},this)):UserTips.ins().showTips("|C:0xf3311e&T:Sá»‘ láº§n cÃ²n láº¡i hÃ´m nay khÃ´ng Ä‘á»§|"),!1},e}(BaseView);__reflect(GweaponFubenView.prototype,"GweaponFubenView");var GweaponFubenGridRender=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this._ary=new eui.ArrayCollection,this.list.dataProvider=this._ary,this.list.itemRenderer=MJItemBase},e.prototype.dataChanged=function(){if(t.prototype.dataChanged.call(this),this.data){this._thisData=this.data,this.storeyCount.text="thá»© "+this._thisData.gridNum+" táº§ng";var e=this._thisData.config.award[1].concat();e=e.concat(this._thisData.config.firstAward.concat());for(var i=[],s=0;s<e.length;s++){var n=new MJlistData;n.data=e[s],n.index=s+1,n.start=this._thisData.config.award[1].length,n.floorNum=this._thisData.gridNum,i.push(n)}this._ary.replaceAll(i),0!=this._thisData.curPoint?(this.rankImg.visible=!0,this.rankbg.visible=!0,this.rankImg.source="godweapon_rank"+this._thisData.curPoint+"_png"):(this.rankImg.visible=!1,this.rankbg.visible=!1),this.choose.visible=this.selected}},e.prototype.invalidateState=function(){t.prototype.invalidateState.call(this),this.choose.visible=this.selected},e}(ItemRenderBase);__reflect(GweaponFubenGridRender.prototype,"GweaponFubenGridRender");var MJItemBase=function(t){function e(){var e=t.call(this)||this;return e.init(),e}return __extends(e,t),e.prototype.init=function(){this.addEventListener(egret.TouchEvent.TOUCH_END,this.onClick,this)},e.prototype.dataChanged=function(){if(t.prototype.dataChanged.call(this),this.data)if(this._thisdata=this.data,this.itemIcon.imgJob.visible=!1,0==this._thisdata.data.type){this.itemIcon.imgIcon.source=AwardsData.getResOfCurrency(this._thisdata.data.id);var e=1;switch(this._thisdata.data.id){case MoneyConst.yuanbao:e=5;break;case MoneyConst.gold:e=0;break;case MoneyConst.soul:e=2;break;case MoneyConst.piece:e=2,this.itemIcon.imgIcon.source=AwardsData.CURRENCY_RES[this._thisdata.data.id];break;case MoneyConst.godweaponExp:e=2}var i=this._thisdata.data.count;if(void 0!=i&&i>1?this.setCount_a94(i+""):this.setCount_a94(""),this._thisdata.index<=this._thisdata.start)this.nameTxt.text=AwardsData.getNameOfCurrency(this._thisdata.data.id),this.itemIcon.imgBg.source="quality"+e,this.nameTxt.textColor=65286;else{this.nameTxt.text="ThÆ°á»Ÿng thÃ´ng quan láº§n Ä‘áº§u S";var s=GweaponCC.ins().fubenInfoData;this.getImg.visible=!1;for(var n=0;n<s.listData.length;n++)if(this._thisdata.floorNum==s.listData[n].gridNum){1==s.listData[n].curPoint&&(this.getImg.visible=!0);break}this._thisdata.floorNum<=10?(this.nameTxt.textColor=65286,this.itemIcon.imgBg.source="quality3"):(this.nameTxt.textColor=65286,this.itemIcon.imgBg.source="quality4")}}else{if(this.itemConfig=GlobalConfig.ConfigItem[this._thisdata.data.id],!this.itemConfig)return;var e=ConfigItem.getQuality(this.itemConfig);this.nameTxt.textColor=65286,this.itemIcon.imgBg.source="quality"+e;var i=this._thisdata.data.count;if(i>1?this.setCount_a94(i+""):this.setCount_a94(""),this.itemIcon.imgIcon.source=this.itemConfig.icon+"_png",this._thisdata.index<=this._thisdata.start)this.nameTxt.text=this.itemConfig.name;else{this.nameTxt.text="ThÆ°á»Ÿng thÃ´ng quan láº§n Ä‘áº§u S";var s=GweaponCC.ins().fubenInfoData;this.getImg.visible=!1;for(var n=0;n<s.listData.length;n++)if(this._thisdata.floorNum==s.listData[n].gridNum){1==s.listData[n].curPoint&&(this.getImg.visible=!0);break}}}},e.prototype.setCount_a94=function(t){if(t.length>4){var e=Math.floor(Number(t)/1e3);t=e/10+"váº¡n"}this.count.text=t},e.prototype.onClick=function(){this.showDet()},e.prototype.showDet=function(){0!=this._thisdata.data.type&&ViewMgr.ins().open(ItemDetailedlyWin,0,this.itemConfig.id,this._thisdata.data.count)},e}(ItemRenderBase);__reflect(MJItemBase.prototype,"MJItemBase"),window.GweaponFubenView=GweaponFubenView;var MJlistData=function(){function t(){}return t}();__reflect(MJlistData.prototype,"MJlistData");var SmallRedPointBase=function(t){function e(){var e=t.call(this)||this;return e.initTabs(),e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.initTabs=function(){this.isOpen=!1,this.redpoint=!1,this.tabs={},this.toTabs={},this.sumTabs={},this.observe(this.postRedPoint,this.postOpen)},e.prototype.registerTab=function(t){for(var e=this,i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];this.tabs[t]=!1,this.associated.apply(this,[function(){return e.updateTabRedPoint(t)}].concat(i))},e.prototype.registerSum=function(t,e){this.sumTabs[t]=e;for(var i=0,s=e;i<s.length;i++){var n=s[i];this.toTabs[n]?this.toTabs[n].push(t):this.toTabs[n]=[t]}},e.prototype.registerOpen=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.associated.apply(this,[this.postOpen].concat(t))},e.prototype.postOpen=function(){var t=this.isOpen;if(this.isOpen=this.getIsOpen(),this.isOpen&&t!=this.isOpen)for(var e=Object.keys(this.tabs),i=0;i<e.length;i++){var s=+e[i];this.updateTabRedPoint(s)}return this.isOpen!=t},e.prototype.postRedPoint=function(){if(!this.isOpen)return this.redpoint?(this.redpoint=!1,!0):!1;var t=this.redpoint;return this.redpoint=this.and(),this.redpoint!=t},e.prototype.postTabs=function(t){return t},e.prototype.getRedPoint=function(t){return this.tabs[t]},e.prototype.updateTabRedPoint=function(t){if(this.isOpen){var e=this.tabs[t];this.tabs[t]=this.getTabPoint(t),this.tabs[t]!=e&&this.sendTabs(t)}},e.prototype.sendTabs=function(t){this.postTabs(t);var e=this.toTabs[t];if(e)for(var i=0,s=e;i<s.length;i++){var n=s[i],o=this.tabs[n];this.tabs[n]=this.andTabs(this.sumTabs[n]),this.tabs[n]!=o&&this.postTabs(n)}this.postRedPoint()},e.prototype.and=function(){for(var t in this.tabs)if(this.tabs[t])return!0;return!1},e.prototype.andTabs=function(t){for(var e in t)if(this.getRedPoint(t[e]))return!0;return!1},e.prototype.andList=function(t){for(var e in t)if(t[e])return!0;return!1},e.prototype.getTabPoint=function(t){return!1},e.prototype.getIsOpen=function(){return!0},e}(SystemBase);__reflect(SmallRedPointBase.prototype,"SmallRedPointBase");var LoadingPanelView=function(t){function e(){var e=t.call(this)||this;return e.init(),e}return __extends(e,t),e.prototype.init=function(){this.text=new eui.Label,this.text.text="Äang táº£i tÃ i nguyÃªn...",this.addChild(this.text)},e.prototype.setProgress=function(t,e){this.text.text="Äang táº£i tÃ i nguyÃªn..."+t+"/"+e},e}(EuiViewBase);__reflect(LoadingPanelView.prototype,"LoadingPanelView");var RuleIconBase=function(t){function e(e,i){void 0===i&&(i=null);var s=t.call(this)||this;return s.isShow=!1,s.isDelayUpdateShow=!1,s.isDelayUpdate=!1,s.id=e,s.tar=i,s}return __extends(e,t),e.prototype.getTar=function(){return this.tar?this.tar:this.createTar()},e.prototype.createTar=function(){this.config=GlobalConfig.ConfigPlayFun[this.id];var t;if(t="eui.Button"==this.config.iconCls?new eui.Button:new eui.Component,this.config.iconSkin&&(t.skinName=this.config.iconSkin),this.config.icon&&(t.icon="",t.icon=this.config.icon),this.config.iconParam)for(var e in this.config.iconParam)t[e]=this.config.iconParam[e];return this.tar=t,t.redPoint&&t.redPoint.parent&&t.redPoint.parent.removeChild(t.redPoint),t},e.prototype.getConfig=function(){return GlobalConfig.ConfigPlayFun[this.id]},e.prototype.delayUpdateShow=function(){this.isDelayUpdateShow||(this.isDelayUpdateShow=!0,TimerMgr.ins().doTimer(100,1,this.updateShow,this))},e.prototype.updateShow=function(){this.isDelayUpdateShow=!1,e.updateShow(this)},e.prototype.delayUpdate=function(){this.isDelayUpdate||(this.isDelayUpdate=!0,TimerMgr.ins().doTimer(100,1,this.update,this))},e.prototype.update=function(){this.isDelayUpdate=!1,e.update(this)},e.prototype.checkShowIcon=function(){return!0},e.prototype.checkShowRedPoint=function(){return 0},e.prototype.getEffName=function(t){return null},e.prototype.tapExecute=function(){},e.prototype.addShowEvents=function(){if(this.showMessage)for(var t=0,e=this.showMessage;t<e.length;t++){var i=e[t];MessageCenter.addListener(i,this.delayUpdateShow,this)}},e.prototype.addRedEvents=function(){if(this.updateMessage){for(var t=0,e=this.updateMessage;t<e.length;t++){var i=e[t];MessageCenter.addListener(i,this.delayUpdate,this)}this.tar&&this.config.icon&&this.tar.icon&&(this.tar.icon="",this.tar.icon=this.config.icon)}},e.prototype.removeRedEvents=function(){if(this.updateMessage)for(var t=0,e=this.updateMessage;t<e.length;t++){var i=e[t];MessageCenter.ins().removeListener(i.funcallname,this.delayUpdate,this)}},e.prototype.removeEvents=function(){MessageCenter.ins().removeAll(this)},e}(egret.HashObject);__reflect(RuleIconBase.prototype,"RuleIconBase"),window.RuleIconBase=RuleIconBase;var WorshipBase=function(){function t(){}return t.prototype.parser=function(t,e){var i=this;e.forEach(function(e){i[e]=t[RankDataType.readFunc[e]]()})},t}();__reflect(WorshipBase.prototype,"WorshipBase");var ReincarnationDemonLevel=function(){function t(){}return t}();__reflect(ReincarnationDemonLevel.prototype,"ReincarnationDemonLevel");var ReincarnationLinkLevel=function(){function t(){}return t}();__reflect(ReincarnationLinkLevel.prototype,"ReincarnationLinkLevel");var ReincarnationSoulLevel=function(){function t(){}return t}();__reflect(ReincarnationSoulLevel.prototype,"ReincarnationSoulLevel");var ClientSet;!function(t){t[t.guidePart=0]="guidePart",t[t.guideStep=1]="guideStep",t[t.expFirst=2]="expFirst",t[t.headRed=3]="headRed",t[t.diedFirstTime=4]="diedFirstTime",t[t.recharge1=5]="recharge1",t[t.vip=6]="vip",t[t.role=7]="role",t[t.FB=8]="FB",t[t.recharge2=9]="recharge2",t[t.diedFirstTime2=10]="diedFirstTime2",t[t.mijiRedPoint=11]="mijiRedPoint",t[t.firstMonthCard=12]="firstMonthCard",t[t.firstrecharge1=13]="firstrecharge1",t[t.firstClickTreasure=14]="firstClickTreasure",t[t.autoHeji=15]="autoHeji",t[t.showRechargeTipsByLv5=16]="showRechargeTipsByLv5",t[t.showRechargeTipsByLv55=17]="showRechargeTipsByLv55",t[t.showRechargeTipsByLv80=18]="showRechargeTipsByLv80"}(ClientSet||(ClientSet={}));var Setting=function(t){function e(){var e=t.call(this)||this;return e.map={},e.sysId=PackageID.Default,e.regNetMsg(19,e.parser),e}return __extends(e,t),Object.defineProperty(e,"currPart",{get:function(){return e.ins().getValue(ClientSet.guidePart)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"currStep",{get:function(){return e.ins().getValue(ClientSet.guideStep)},enumerable:!0,configurable:!0}),e.ins=function(){return t.ins.call(this)},e.prototype.parser=function(t){for(var e=t.readShort(),i=0;e>i;i++)this.map[t.readInt()]=t.readInt();GuideUtils.ins().init(),this.postInitSetting()},e.prototype.postInitSetting=function(){return!0},e.prototype.sendSave_a94=function(t,e){var i=this.getBytes(19);i.writeInt(t),i.writeInt(e),this.sendToServer(i),this.map[t]=e},e.prototype.setValue=function(t,e){this.sendSave_a94(t,e)},e.prototype.getValue=function(t,e){return void 0===e&&(e=0),void 0==this.map[t]?e:this.map[t]},e}(SystemBase);__reflect(Setting.prototype,"Setting");var GameSystem;!function(t){t.setting=Setting.ins.bind(Setting)}(GameSystem||(GameSystem={}));var SevenDayItemRender=function(t){function e(){var e=t.call(this)||this;return e.skinName="SkinAct14item",e}return __extends(e,t),e.prototype.dataChanged=function(){var t=this.data,e=GlobalConfig.ConfigLoginRewards[t],i=(Activity.ins().dayNum,1==(Activity.ins().isAwards>>e.day&1));i?(this.select.visible=!1,this.checkedMask.visible=this.checked.visible=!0):this.checkedMask.visible=this.checked.visible=!1,this.item.data=e.rewards[0]},e.prototype.setSelectImg=function(t){this.select.visible=t},e}(ItemRenderBase);__reflect(SevenDayItemRender.prototype,"SevenDayItemRender"),window.SevenDayItemRender=SevenDayItemRender;var ShenshouEquipItem=function(t){function e(){var e=t.call(this)||this;return e.equipName=["","ThÃº Äan","ThÃº Huyáº¿t","ThÃº Kháº£i","ThÃº GiÃ¡c","ThÃº Tráº£o"],e.qualityName=["Tráº¯ng 1 sao","Tráº¯ng 1 sao","TÃ­m 1 sao","TÃ­m 1 sao","TÃ­m 1 sao","Cam 1 sao","Cam 1 sao","Cam 1 sao","Äá» 3 sao"],e.qualityObj=[0,0,2,2,2,3,3,3,4],e.touchChildren=!1,e.touchChildren=!1,e}return __extends(e,t),e.prototype.setPosData=function(t,e){var i=GlobalConfig.ShenShouBase[t].minLevel[e-1];this.imgBg.source="quality10",this.nameTxt.text=this.qualityName[i]+"\n"+this.equipName[e],this.nameTxt.textColor=ItemBase.QUALITY_COLOR[0],this.imgIcon.source="ss_equip"+(e-1),this.equipLv.text="",this.data=null},e.prototype.dataChanged=function(){if(!isNaN(this.data)&&this.data){this.itemConfig=GlobalConfig.ConfigItem[this.data],this.nameTxt.text=this.itemConfig.name,this.nameTxt.textColor=ConfigItem.getQualityColor(this.itemConfig),this.imgBg.source="quality"+ConfigItem.getQuality(this.itemConfig),this.imgIcon.source=this.itemConfig.icon+"_png";var t=ShenshouModel.ins().getEquipLvResult(this.itemConfig.id)-1;this.equipLv.text=t>0?"+"+t:""}},e}(ItemRenderBase);__reflect(ShenshouEquipItem.prototype,"ShenshouEquipItem"),window.ShenshouEquipItem=ShenshouEquipItem;var Shop=function(t){function e(){var e=t.call(this)||this;return e.shopData=new ShopData,e.sysId=PackageID.Shop,e.regNetMsg(1,e.postUpdateShopDataResult),e.regNetMsg(2,e.postBuyResultResult),e.regNetMsg(3,e.postBuyCountResult),e.regNetMsg(4,e.refreshGoodsSuccessResult),e.regNetMsg(5,e.postRefreshIntegrationSuccResult),e.regNetMsg(6,e.updateMedalMessageResult),e.regNetMsg(7,e.postUpdateBuyMedalResult),e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.sendBuyOperate=function(t,e){var i=this.getBytes(2);i.writeInt(t),i.writeInt(e.length),this.shopBuyArr=[];for(var s=0;s<e.length;s++){i.writeInt(e[s][0]),i.writeInt(e[s][1]);var n=GlobalConfig.ConfigItemStore[e[s][0]];if(n&&n.itemId==ItemConst.GOLD_BRICK){var o={id:ItemConst.GOLD_BRICK,count:e[s][1]};this.shopBuyArr.push(o)}}this.sendToServer(i)},e.prototype.sendRefreshShopOperate=function(){var t=this.getBytes(3);this.sendToServer(t)},e.prototype.postUpdateShopDataResult=function(t){e.ins().shopData.parser(t)},e.prototype.postBuyResultResult=function(t){var e=t.readInt();return e},e.prototype.postBuyCountResult=function(t){e.ins().shopData.parserBuyCount(t)},e.prototype.refreshGoodsSuccessResult=function(t){this.postRefreshGoodsSuccess(!0)},e.prototype.postRefreshGoodsSuccess=function(t){return t},e.prototype.postRefreshIntegrationSuccResult=function(t){var i=t.readBoolean();t.readInt();return[i,e.ins().shopData.point]},e.prototype.sendIntegrationShop=function(t){var e=this.getBytes(5);e.writeInt(t),this.sendToServer(e)},e.prototype.sendMedalMessageIOperate=function(){var t=this.getBytes(6);this.sendToServer(t)},e.prototype.updateMedalMessageResult=function(t){var i=t.readInt();this.medalData=new FeatsStoreData(i,t),e.ins().postRefresMedalMessage()},e.prototype.postRefresMedalMessage=function(){},e.prototype.sendBuyMedalOperate=function(t,e){var i=this.getBytes(7);i.writeInt(t),i.writeInt(e),this.sendToServer(i)},e.prototype.postUpdateBuyMedalResult=function(t){var e=t.readInt(),i=t.readInt();return[e,i]},e.openBuyGoldWin=function(t){void 0===t&&(t=!0);var i=e.ins().shopData.getGoodsIdByItemId(200164);return e.ins().shopData.checkBuyGoodsId(i,t)?(ViewMgr.ins().open(BuyView,i),!0):!1},e}(SystemBase);__reflect(Shop.prototype,"Shop");var ShopData=function(){function t(){this.shopEquipData=[],this.hadBuyCount=[]}return Object.defineProperty(t.prototype,"refushTime",{get:function(){return this._refushTime},set:function(t){this._refushTime=t,TimerMgr.ins().removeAll(this),t>0&&TimerMgr.ins().doTimer(1e3,t,this.flushTimeleft,this)},enumerable:!0,configurable:!0}),t.prototype.parser=function(t){this.shopEquipData.length=0,this.refushTime=t.readInt(),this.point=t.readInt(),this.times=t.readInt();for(var e=t.readInt(),i=0;e>i;i++){var s=new ShopEquipData;s.parser(t),this.shopEquipData.push(s)}},t.prototype.parserBuyCount=function(t){var e=t.readShort();this.hadBuyCount.length=0;for(var i=0;e>i;i++){var s=new ShopHadBuyData;s.parser(t),this.hadBuyCount.push(s)}},t.prototype.flushTimeleft=function(){this._refushTime<=0?this._refushTime=0:this._refushTime--},t.prototype.getHadBuyCountItem=function(t){for(var e=0,i=this.hadBuyCount;e<i.length;e++){var s=i[e];if(s.itemId==t)return s}return null},t.prototype.getHadBuyCount=function(t){var e=this.getHadBuyCountItem(t);return e?e.count:0},t.prototype.getBlackShopEquipDataLength=function(){var t=0;return null!=this.shopEquipData&&(t=this.shopEquipData.length),t},t.prototype.getBlackShopEquipDataByIndex=function(t){var e=null;return null!=this.shopEquipData&&t>=0&&t<this.shopEquipData.length&&(e=this.shopEquipData[t]),e},t.prototype.getShopEquipDataById=function(t){for(var e=0,i=this.shopEquipData;e<i.length;e++){var s=i[e];if(s.id==t)return s}return null},t.prototype.checkBuyGoodsId=function(t,e){void 0===e&&(e=!0);var i=GlobalConfig.ConfigItemStore[t];if(i){if(i.viplv&&UserVip.ins().lv<i.viplv)return e&&UserTips.ins().showTips("VIP "+i.viplv+" CÃ³ thá»ƒ mua"),!1;if(i.vipLimit){var s=i.vipLimit[UserVip.ins().lv],n=this.getHadBuyCount(i.itemId);if(n>=s)return e&&UserTips.ins().showTips("Sá»‘ láº§n mua hÃ´m nay Ä‘Ã£ dÃ¹ng háº¿t"),!1}}return!0},t.prototype.getGoodsIdByItemId=function(t){for(var e in GlobalConfig.ConfigItemStore)if(GlobalConfig.ConfigItemStore[e].itemId==t)return parseInt(e);return 0},t}();__reflect(ShopData.prototype,"ShopData");var ShopEquipData=function(){function t(){}return t.prototype.parser=function(t){this.id=t.readInt(),this.costType=t.readInt(),this.costNum=t.readInt(),this.discountType=t.readInt(),this.item=new ItemData,this.item.parser_a94(t)},t.discountDic={0:{discount:1,res:""},1:{discount:.8,res:"shangzk8"},2:{discount:.5,res:"shangzk5"}},t}();__reflect(ShopEquipData.prototype,"ShopEquipData");var ShopHadBuyData=function(){function t(){}return t.prototype.parser=function(t){this.itemId=t.readInt(),this.count=t.readInt()},t}();__reflect(ShopHadBuyData.prototype,"ShopHadBuyData");
var GameSystem;!function(t){t.shop=Shop.ins.bind(Shop)}(GameSystem||(GameSystem={}));var SpecialRingSystem=function(t){function e(){var e=t.call(this)||this;return e.mainHandler=[],e.ringList=[],e.loginDayCount=0,e.ringActiNum=0,e.specialRingHandler=[],e.ringsConfig=[],e.moneyOpenGrid=0,e.abilityIds=[],e.skillLvDic={},e.sysId=PackageID.Ring,e.regNetMsg(1,e.postRingUpdateResult),e.regNetMsg(2,e.postActiveRingResult),e.regNetMsg(3,e.postSpicelRingUpdateResult),e.regNetMsg(4,e.postGetSpicelRingInfo),e.regNetMsg(5,e.postSRStairUpResult),e.regNetMsg(6,e.postSRStairUpResult),e.regNetMsg(7,e.postUnLockResult),e.regNetMsg(8,e.postSkillInfoResult),e.regNetMsg(9,e.postRingAbilityResult_a94),e.observe(GameLogicManage.ins().postEnterMap,e.createRingAvatarDis_a94),e}return __extends(e,t),e.prototype.postRingAbilityResult_a94=function(t){for(var i=t.readShort(),s=0;i>s;s++){var n=t.readShort(),o=t.readShort();this.abilityIds[n]=o}if(0==GameMap.fbType){var a=this.getSpecialRingDataById(e.FIRE_RING_ID);if(a){var r=this.getRingStair(a.level);r>=2&&(this.specialRingHandler[e.FIRE_RING_ID]>0&&EntityMgr.ins().removeByHandle(this.specialRingHandler[e.FIRE_RING_ID]),e.ins().createRingMonster(e.FIRE_RING_ID))}}var h=GlobalConfig.ConfigActorExRingItem[e.FIRE_RING_ID];for(var n in h)if(h[n][1]){var l=UserBagSystem.ins().getBagItemById(h[n][1].itemId);l&&l.setCanbeUsed_a94()}UserBagSystem.ins().postHasItemCanUse()},e.prototype.createRingAvatarDis_a94=function(){if(0==GameMap.fbType){var t=this.getSpecialRingDataById(e.FIRE_RING_ID);if(t){var i=this.getRingStair(t.level);i>=2&&5e4!=GameMap.fubenID&&e.ins().createRingMonster(e.FIRE_RING_ID)}}},e.prototype.sendUpGradeOperate=function(t,e){var i=this.getBytes(1);i.writeShort(t),i.writeShort(e),this.sendToServer(i)},e.prototype.postRingUpdateResult=function(t){var e=t.readShort(),i=t.readShort(),s=t.readShort();return SubRoles.ins().getSubRoleByIndex(i).setExRingsData(e,s),!0},e.prototype.sendActiveRing=function(t,e){void 0===e&&(e=0);var i=this.getBytes(2);i.writeShort(t),i.writeByte(e),this.sendToServer(i)},e.prototype.postActiveRingResult=function(t){var i=t.readShort(),s=t.readShort(),n=t.readInt(),o=t.readByte(),a=this.getSpecialRingDataById(i);return a.level=s,a.exp=n,a.fight=o,this.ringActiNum++,i==e.FIRE_RING_ID&&this.updateGrid_a94(),[i,0]},e.prototype.postSRStairUpResult=function(t){var e=t.readShort(),i=t.readShort(),s=t.readInt(),n=t.readByte(),o=this.getSpecialRingDataById(e);return o.level=i,o.exp=s,o.fight=n,this.createRingAvatarDis_a94(),this.updateGrid_a94(),[e,0]},e.prototype.sendSpicelRingUpdate=function(t){var e=this.getBytes(3);e.writeShort(t),this.sendToServer(e)},e.prototype.postSpicelRingUpdateResult=function(t){var e=t.readShort(),i=t.readShort(),s=t.readInt(),n=this.getSpecialRingDataById(e),o=0;o=t.readByte();var a=t.readByte();return n.level=i,n.exp=s,n.fight=a,[e,o]},e.prototype.postGetSpicelRingInfo=function(t){this.loginDayCount=t.readInt();var e=t.readShort();this.ringList=[],this.ringActiNum=0;for(var i=0;e>i;i++){var s=new SpecialRingData;s.parser(t),this.ringList.push(s),s.level>0&&this.ringActiNum++}return 0==GameMap.fbType&&GameLogicManage.ins().postHookStateChange(GameLogicManage.HOOK_STATE_FIND_ENMENY),this.createRingAvatarDis_a94(),!0},e.prototype.isFireRing=function(t){return this.specialRingHandler[e.FIRE_RING_ID]==t},e.prototype.createRingMonster=function(t){if(this.ringList&&!(this.ringList.length<=0)){var i=GlobalConfig.ConfigActorExRing[t],s=this.getSpecialRingDataById(t);if(!(s.level<i.showMonsterLv)){var n=i.monsterId,o=this.getAbilityID();if(o){var a=GlobalConfig.ConfigActorExRingItem[e.FIRE_RING_ID][o][this.abilityIds[o]];a&&(n+=a.monId)}if(!EntityMgr.ins().getEntityByHandle(this.specialRingHandler[t])){var r=EntityMgr.ins().getNoDieRole();if(r){var h=UserFb.createModels(GlobalConfig.ConfigMonsters[n]);h.setAtt(AttributeType.atMoveSpeed,e.FIRE_RING_MOVING_SPEED),h.x=r.x,h.y=r.y,h.masterHandle=Actor.handle,this.specialRingHandler[t]=h.handle=egret.getTimer(),h.lyMarkLv=LyMarkSystem.ins().lyMarkLv,h.lyMarkSkills=LyMarkSystem.ins().skills;var l=GameLogicManage.ins().createEntityByModel(h,Team.My);l.AI_STATE=AI_State.Stand}}}}},e.prototype.sendRingLevelUp=function(t){var e=this.getBytes(5);e.writeShort(t),this.sendToServer(e)},e.prototype.sendRingFight=function(t,e){var i=this.getBytes(6);i.writeShort(t),i.writeByte(e),this.sendToServer(i)},e.prototype.checkOperation=function(){var t=this.checkHaveUpRing();return!t&&this.isFireRingFuse()&&(t=this.isCanStudySkill()||this.isCanUpgradeSkill()),t},e.prototype.checkHaveUpRing=function(){if(!e.ins().checkRingOpen())return!1;for(var t=this.ringList.length,i=0;t>i;i++){var s=this.ringList[i],n=this.checkRedPoint(s.id,s.level);if(n)return n}return!1},e.prototype.checkRingOpen=function(){var t=GlobalConfig.ActorExRingCommon.actImbaId;return ArtifactSystem.ins().getNewerArtifactBy_a94(ArtifactSystem.ins().getIndexByArtifactId_a94(t))?ArtifactSystem.ins().getNewerArtifactBy_a94(ArtifactSystem.ins().getIndexByArtifactId_a94(t)).open:!1},e.prototype.checkRedPoint=function(t,e){return e>0?this.checkCanUpdate(t,e):this.checkCanActive(t)},e.prototype.checkCanUpdate=function(t,i){var s=!1;if(t==e.FIRE_RING_ID&&this.isFireRingFuse()){GlobalConfig.ConfigActorExRing[t];if(this.getRingConfigById(t,i+1))if(i%11==0)s=!0;else{var n=this.getRingConfigById(t,i),o=UserBagSystem.ins().getBagGoodsCountById(0,n.costItem);s=n.cost<=o}}return s},e.prototype.checkCanActive=function(t){var i=GlobalConfig.ConfigActorExRing[t],s=!1;if(t==e.FIRE_RING_ID)this.isFireRingActivate()||(s=this.isFireRingCanActivate());else{var n=this.getSpecialRingDataById(t).level;0==n&&(s=e.ins().loginDayCount>=i.openDay&&i.openDay>=0||UserVip.ins().lv>=i.openVip&&i.openVip>=0&&Actor.yb>=i.openYb)}return s},e.prototype.canGradeupRing=function(t){for(var e,i=[!1,!1,!1],s=SubRoles.ins().subRolesLen,n=0,o=0,a=0,r=0;s>r;r++){var h=SubRoles.ins().getSubRoleByIndex(r);n=h.getExRingsData(t),e=GlobalConfig["ConfigExRing"+t][n],o=e.cost,o?(a=UserBagSystem.ins().getBagGoodsCountById(0,GlobalConfig.ConfigExRing[t].costItem),i[r]=a>=o):i[r]=!1}return i},e.prototype.getRingConfigById=function(t,e){return 0==this.ringsConfig.length&&this.initConfig(),this.ringsConfig[t]&&this.ringsConfig[t][e]?this.ringsConfig[t][e]:null},e.prototype.initConfig=function(){this.ringsConfig=[];var t=GlobalConfig.ConfigActorExRing;for(var e in t)this.ringsConfig[t[e].id]=GlobalConfig["ConfigActorExRing"+e]},e.prototype.getRingStair=function(t){var i=0;return i=Math.ceil(t/(e.perStar+1))},e.prototype.getRingStar=function(t){return 1>t?0:(t-1)%(e.perStar+1)},e.prototype.hasHanlder=function(t){for(var e=0;e<this.mainHandler.length;e++)if(t==this.mainHandler[e])return!0;return this.mainHandler.push(t),!1},e.prototype.delHanlder=function(t){for(var e=0;e<this.mainHandler.length;e++)if(t==this.mainHandler[e])return void this.mainHandler.splice(e,1)},e.prototype.getSpecialRingDataById=function(t){for(var e=0;e<this.ringList.length;e++)if(this.ringList[e].id==t)return this.ringList[e];return null},e.prototype.isFireRingFuse=function(){var t=!1,i=this.getSpecialRingDataById(e.FIRE_RING_ID);return i&&i.level>=1&&(t=!0),t},e.prototype.isFireRingActivate=function(){var t=!1,i=this.getSpecialRingDataById(e.FIRE_RING_ID);return i&&i.isUnLock&&(t=!0),t},e.prototype.isFireRingCanActivate=function(){var t=!1,i=GlobalConfig.ConfigActorExRing[e.FIRE_RING_ID];i.openDay;if(e.ins().loginDayCount>=i.openDay)for(var s=0;s<this.ringList.length;s++)if(t=!0,this.ringList[s].id!=e.FIRE_RING_ID&&0==this.ringList[s].level){t=!1;break}return t},e.prototype.requestDeblock=function(t){var e=this.getBytes(7);e.writeShort(t),this.sendToServer(e)},e.prototype.postUnLockResult=function(t){for(var e=t.readShort(),i=t.readShort(),s=t.readInt(),n=t.readByte(),o=t.readByte(),a=0;a<this.ringList.length;a++)if(this.ringList[a].id==e){this.ringList[a].level=i,this.ringList[a].exp=s,this.ringList[a].fight=n,this.ringList[a].isUnLock=o;break}return 1==o},e.prototype.requestOpenGrid=function(){var t=this.getBytes(8);this.sendToServer(t)},e.prototype.requestLearnSkill=function(t,e){var i=this.getBytes(9);i.writeShort(t),i.writeShort(e),this.sendToServer(i)},e.prototype.requestUpgradeSkill=function(t){var e=this.getBytes(10);e.writeShort(t),this.sendToServer(e)},e.prototype.postSkillInfoResult=function(t){this.initSkill_a94(),this.moneyOpenGrid=t.readShort(),this.updateGrid_a94();for(var e=t.readShort(),i=0;e>i;i++){var s=new RingSkillItemInfo;s.position=t.readShort(),s.skillId=t.readShort(),s.skillLvl=t.readShort(),this.updateSkillInfo_a94(s)}},e.prototype.updateGrid_a94=function(){var t=this.getSpecialRingDataById(e.FIRE_RING_ID),i=0;t.level>0&&(i=this.moneyOpenGrid+this.getRingConfigById(e.FIRE_RING_ID,t.level).freeSkillGrid),this.updateGridOpen_a94(i)},e.prototype.updateGridOpen_a94=function(t){for(var e=1;t>=e;e++){var i=this.skillInfo[e-1];i.isOpen=!0}},e.prototype.updateSkillInfo_a94=function(t){for(var e=this.skillInfo.length,i=0;e>i;i++){var s=this.skillInfo[i];s.position==t.position&&(s.skillId=t.skillId,s.skillLvl=t.skillLvl)}},e.prototype.initSkill_a94=function(){if(!this.skillInfo){this.skillInfo=[];for(var t=1;9>t;t++){var e=new RingSkillItemInfo;e.position=t,this.skillInfo.push(e)}}},e.prototype.getCanStudyBooks=function(){var t=[];if(!this.skillInfo)return t;for(var e=this.skillInfo.length,i=[],s=0;e>s;s++){var n=this.skillInfo[s];n.skillId>0&&i.push(n.skillId)}for(var o=this.getActorExRingBookConfigByLvl(1),a=o.length,r=0;a>r;r++){var h=o[r];if(i.indexOf(h.id)<0){var l=UserBagSystem.ins().getBagGoodsCountById(0,h.itemId);if(l>=h.num){var c=new AwardsData;c.id=h.itemId,c.count=l,c.type=1,t.push(c)}}}return t},e.prototype.isBookCanStudyByID=function(t){for(var e=this.skillInfo.length,i=[],s=0;e>s;s++){var n=this.skillInfo[s];n.skillId>0&&i.push(n.skillId)}for(var o=this.getActorExRingBookConfigByLvl(1),a=o.length,r=0;a>r;r++){var h=o[r];if(h.itemId==t&&i.indexOf(h.id)<0){var l=UserBagSystem.ins().getBagGoodsCountById(0,h.itemId);if(l>=h.num)return!0}}return!1},e.prototype.getCanStudyBook=function(){for(var t=[],e=this.getActorExRingBookConfigByLvl(1),i=e.length,s=0;i>s;s++){var n=e[s],o=UserBagSystem.ins().getBagGoodsCountById(0,n.itemId),a=new AwardsData;a.id=n.itemId,a.count=o,a.type=1,t.push(a)}return t},e.prototype.getFirstStudyBookIndex=function(){for(var t=this.getActorExRingBookConfigByLvl(1),e=t.length,i=0;e>i;i++){var s=t[i];if(this.isBookCanStudyByID(s.itemId))return i}return 0},e.prototype.isCanStudySkill=function(){var t=this.getCanStudyBooks(),e=!1;return void 0!=t&&t.length>0&&this.isHaveFreeGrid()&&(e=!0),e},e.prototype.isHaveFreeGrid=function(){for(var t=this.skillInfo.length,e=0;t>e;e++){var i=this.skillInfo[e];if(0==i.skillId&&i.isOpen)return!0}return!1},e.prototype.isCanUpgradeSkill=function(){if(!this.skillInfo)return!1;for(var t=this.skillInfo.length,e=0;t>e;e++){var i=this.skillInfo[e];if(i.skillId>0&&i.skillLvl<this.getSkillMaxLvl(i.skillId)){var s=this.getActorExRingBookConfig(i.skillId,i.skillLvl),n=UserBagSystem.ins().getBagGoodsCountById(0,s.itemId);if(n>=s.num)return!0}}return!1},e.prototype.fireRingRedPoint=function(){return UserFb.ins().fbRings.challengeTime>0||UserFb.ins().fbRings.canTakeAward},e.prototype.getActorExRingBookConfig=function(t,e){var i;for(var s in GlobalConfig.ConfigActorExRingBook)for(var n in GlobalConfig.ConfigActorExRingBook[s])if(s==t.toString()&&n==e.toString()){i=GlobalConfig.ConfigActorExRingBook[s][n];break}return i},e.prototype.getActorExRingBookConfigByLvl=function(t){var e=[],i=[];for(var s in GlobalConfig.ConfigActorExRingBook)for(var n in GlobalConfig.ConfigActorExRingBook[s])if(n==t.toString()){i.indexOf(GlobalConfig.ConfigActorExRingBook[s][n].itemId)<0&&(i.push(GlobalConfig.ConfigActorExRingBook[s][n].itemId),e.push(GlobalConfig.ConfigActorExRingBook[s][n]));break}return e},e.prototype.getSkillIdByItemId=function(t){var e;for(var i in GlobalConfig.ConfigActorExRingBook)for(var s in GlobalConfig.ConfigActorExRingBook[i])if(GlobalConfig.ConfigActorExRingBook[i][s].itemId==t)return e=parseInt(i);return 0},e.prototype.getSkillMaxLvl=function(t){var e=0;if(void 0!=this.skillLvDic[t])e=this.skillLvDic[t];else{for(var i in GlobalConfig.ConfigActorExRingBook)if(i==t.toString())for(var s in GlobalConfig.ConfigActorExRingBook[i])e++;this.skillLvDic[t]=e}return e},e.prototype.getNextStageSkillName=function(t){var e;for(var i in GlobalConfig.ConfigActorExRingAbility){var s=GlobalConfig.ConfigActorExRingAbility[i];if(s&&s.ringLv==t){e=s.abilityName;break}}return e},e.prototype.getUnLockStage=function(t){var e,i=GlobalConfig.ConfigActorExRingAbility[t],s=i.ringLv;switch(s){case 1:e="1";break;case 5:e="5";break;case 10:e="10";break;case 20:e="20";break;case 40:e="40";break;case 60:e="60";break;case 80:e="80"}return e},e.prototype.getRingSkill=function(){if(!this.skillInfo)return 0;for(var t=this.skillInfo.length,e=0,i=0;t>i;i++){var s=this.skillInfo[i];if(7==s.skillId){e=s.skillLvl;break}}var n=this.getSpecialRingDataById(7).level,o=this.getRingConfigById(7,n).summonerSkillId;if(e>0&&o){var a=o%10;a+=e,a>9&&(a=9);var r=Math.floor(o/10);o=10*r+a}return o},e.prototype.getCanUpgradeStars=function(t){for(var i=this.getSpecialRingDataById(e.FIRE_RING_ID).level,s=0;;){i++;var n=GlobalConfig.ConfigActorExRing7[i];if(!n)return s;if(t-=n.cost,!(t>=0))return s;s++}},e.prototype.getAbilityID=function(t){void 0===t&&(t=0);var e=0;for(var i in this.abilityIds){if(e==t)return+i;e++}return 0},e.prototype.getAbilityIdByItemId=function(t){var i=GlobalConfig.ConfigActorExRingItem[e.FIRE_RING_ID];for(var s in i)if(i[s][1].itemId=t)return+s;return 0},e.prototype.getMaxAbilityLvByItemId=function(t){var i=GlobalConfig.ConfigActorExRingItem[e.FIRE_RING_ID];for(var s in i)if(i[s][1].itemId=t)return CommonUtils.getObjectLength(i[s]);return 0},e.prototype.checkCanUseByItem=function(t){var e=this.getAbilityIdByItemId(t),i=this.getMaxAbilityLvByItemId(t);return e&&this.abilityIds[e]>=i?!1:!0},e.ins=function(){return t.ins.call(this)},e.perStar=10,e.FIRE_RING_ID=7,e.FIRE_RING_MOVING_SPEED=3750,e.GRID_OPEN_LEVEL=20,e}(SystemBase);__reflect(SpecialRingSystem.prototype,"SpecialRingSystem");var GameSystem;!function(t){t.specialRing=SpecialRingSystem.ins.bind(SpecialRingSystem)}(GameSystem||(GameSystem={}));var ItemRenderer=eui.ItemRenderer,FireRingSkillItemRender=function(t){function e(){var e=t.call(this)||this;return TimerMgr.ins().doNext(function(){var t=new egret.Shape;t.graphics.beginFill(65280),t.graphics.drawRoundRect(0,0,e.width,e.height,1,1),t.graphics.endFill(),t.alpha=0,e.addChild(t)},e),e}return __extends(e,t),e.prototype.dataChanged=function(){var t=this.data;t.isOpen?t.skillId?this.currentState="learn":this.currentState="unlearn":this.currentState="lock",TimerMgr.ins().doTimer(50,1,this.currentStateChangeOperate,this)},e.prototype.setSelect=function(t){this.select.visible=t},e.prototype.currentStateChangeOperate=function(){var t=this,e=this.data;if(e.isOpen)if(e.skillId){var i=SpecialRingSystem.ins().getActorExRingBookConfig(e.skillId,e.skillLvl);this.skillImg.source=i.skillIcon,this.skillLv.text="Lv"+e.skillLvl,this.skillName.text=i.skillName;var s=UserBagSystem.ins().getBagGoodsCountById(0,i.itemId);this.redpoint.visible=s>=i.num&&e.skillLvl<SpecialRingSystem.ins().getSkillMaxLvl(e.skillId)}else this.redpoint.visible=SpecialRingSystem.ins().isCanStudySkill();else{var n=SpecialRingSystem.ins().getSpecialRingDataById(SpecialRingSystem.FIRE_RING_ID).level,o=SpecialRingSystem.ins().getRingStair(n);if(o<SpecialRingSystem.GRID_OPEN_LEVEL)TimerMgr.ins().doNext(function(){t.skillName.text="Báº­c "+SpecialRingSystem.GRID_OPEN_LEVEL+" má»Ÿ khÃ³a"},this),this.price.visible=!1;else{this.price.visible=!0,TimerMgr.ins().doNext(function(){t.skillName.text="ChÆ°a má»Ÿ khÃ³a"},this);var a=GlobalConfig.ConfigActorExRing[SpecialRingSystem.FIRE_RING_ID];this.price.setPrice(a.skillGridYb),this.price.priceLabel.textColor=33836}}this.select.visible=this.selected},e}(ItemRenderBase);__reflect(FireRingSkillItemRender.prototype,"FireRingSkillItemRender");var SpecialRingItem=function(t){function e(){var e=t.call(this)||this;return e.skinName="Skinringtogglebtn",e}return __extends(e,t),e.prototype.dataChanged=function(){var t=GlobalConfig.ConfigActorExRing[this.data.id];t&&(this.addEvent(),this.ringNameTxt.text=t.name,this.textBg.visible=this.data.level>0,this.data.level>0?(this.levelTxt.text=SpecialRingSystem.ins().getRingStair(this.data.level)+"báº­c",this.openLv.text="",this.noopen.visible=!1,this.maskBg.visible=!1,this.ringicon.source=t.icon):(this.levelTxt.text="",this.noopen.visible=!0,this.maskBg.visible=!0,this.ringicon.source=t.icon,t.openDay>0&&t.openVip>0?this.openLv.text="NgÃ y "+t.openDay+" hoáº·c VIP "+t.openVip+" má»Ÿ":t.openDay>0?this.openLv.text="NgÃ y "+t.openDay+" má»Ÿ":t.openVip>0?this.openLv.text="VIP "+t.openVip+" má»Ÿ":t.openYb>0&&(this.openLv.text=t.openYb+" má»Ÿ báº±ng NguyÃªn Báº£o")),this.updateRedPoint_a94())},e.prototype.addEvent=function(){this.isAddEvent||(this.isAddEvent=!0,MessageCenter.addListener(UserBagSystem.ins().postItemAdd,this.updateRedPoint_a94,this),MessageCenter.addListener(UserBagSystem.ins().postItemDel,this.updateRedPoint_a94,this),MessageCenter.addListener(UserBagSystem.ins().postItemCountChange,this.updateRedPoint_a94,this),MessageCenter.addListener(UserVip.ins().postUpdateVipDataInfo,this.updateRedPoint_a94,this),MessageCenter.addListener(SpecialRingSystem.ins().postActiveRingResult,this.updateRedPoint_a94,this),this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove_a94,this))},e.prototype.onRemove_a94=function(){this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove_a94,this),this.destruct()},e.prototype.destruct=function(){MessageCenter.ins().removeAll(this),this.isAddEvent=!1},e.prototype.updateRedPoint_a94=function(){this.data.level>0?this.actTxt.visible=!1:this.data.id==SpecialRingSystem.FIRE_RING_ID?this.actTxt.visible=SpecialRingSystem.ins().isFireRingCanActivate():this.actTxt.visible=SpecialRingSystem.ins().checkCanActive(this.data.id),this.openLv.visible=!this.actTxt.visible,this.redPoint.visible=SpecialRingSystem.ins().checkRedPoint(this.data.id,this.data.level)},e}(ItemRenderBase);__reflect(SpecialRingItem.prototype,"SpecialRingItem");var TipsItemView=function(t){function e(){var e=t.call(this)||this;return e.index=0,e.skinName="SkinTips",e.lab.stroke=1,e.lab.strokeColor=0,e}return __extends(e,t),e.prototype.setIndex=function(t){this.index=t},Object.defineProperty(e.prototype,"labelTextInfo",{get:function(){return this._labelText},set:function(t){this._labelText=t,-1!=this._labelText.indexOf("Má»Ÿ")||-1!=this._labelText.indexOf("KhÃ´ng Ä‘á»§")||-1!=this._labelText.indexOf("CÃ³ thá»ƒ nháº­n")||-1!=this._labelText.indexOf("KhÃ´ng thá»ƒ")||-1!=this._labelText.indexOf("ChÆ°a")||-1!=this._labelText.indexOf("å¯é¢†å–")||-1!=this._labelText.indexOf("æ— æ³•")||-1!=this._labelText.indexOf("æ²¡æœ‰")?this.lab.textColor=14942208:this.lab.textColor=16777215,this.lab.textFlow=TextFlowMaker.generateTextFlow(this._labelText),this.bg.width=this.lab.width,this.bg.visible=!1,this.lab.alpha=1,this.bg.y=0,this.lab.verticalCenter=-1,this.addToEvent||(this.addToEvent=!0,TimerMgr.ins().doTimer(1200,1,this.removeFromParent,this))},enumerable:!0,configurable:!0}),e.prototype.removeFromParent=function(){this.addToEvent=!1,DisplayUtils.removeFromParent(this),egret.Tween.removeTweens(this),ObjPool.push(this)},e}(BaseComponent);__reflect(TipsItemView.prototype,"TipsItemView"),window.TipsItemView=TipsItemView;var GainGoodsItemRender=function(t){function e(){var e=t.call(this)||this;return e.constStarCount=3,e.skinName="SkinGainGoodsItem",e.graycolor=7239022,e}return __extends(e,t),e.prototype.dataChanged=function(){this.greencolor=this.desc.textColor,this.norcolor=this.desc2.textColor,this.desc.text=this.data[0]},e.prototype.gainData=function(t,e,i){if(this.isOpen=t,this.stars.visible=!0,t)for(var s=1;s<=this.constStarCount;s++)this["star"+s].visible=e>=s;else{if(this.desc.textColor=this.graycolor,this.desc2.textColor=this.graycolor,i){var n="";i.needZs&&(n+=i.needZs+"Chuyá»ƒn Sinh má»Ÿ"),i.needLv&&(n+="Cáº¥p "+i.needLv+" má»Ÿ"),i.guanka&&(n+=i.guanka+"Quan áº£i má»Ÿ"),this.desc2.text=n}this.dir.visible=!1;for(var s=1;s<=this.constStarCount;s++)this["star"+s].visible=!1}},e.prototype.invalidateState=function(){t.prototype.invalidateState.call(this),this.isOpen||(this.desc.textColor=this.graycolor,this.desc2.textColor=this.graycolor)},Object.defineProperty(e.prototype,"userData",{get:function(){return this.data},enumerable:!0,configurable:!0}),e}(ItemRenderBase);__reflect(GainGoodsItemRender.prototype,"GainGoodsItemRender");var WorldBossesItemMain=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.list.itemRenderer=WorldBossesItem,this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onTap_a94,this),this.listData=new eui.ArrayCollection,this.list.dataProvider=this.listData},e.prototype.onTap_a94=function(t){var e=this.listData.getItemAt(t.itemIndex);this.data.clickCall(e)},e.prototype.dataChanged=function(){t.prototype.dataChanged.call(this);var e=this.data;this.listData.source=e.arr,this.list.selectedIndex=e.selectIndex,e.type==UserBossesSystem.BOSS_SUBTYPE_WORLDBOSS?this.title.source="title_mijingboss":e.type==UserBossesSystem.BOSS_SUBTYPE_DARKBOSS&&(this.title.source="title_anzhimijingboss");var i=!1;UserBossesSystem.ins().worldBossLeftTime[e.type]&&(i=UserBossesSystem.ins().checkWorldBossesRedPoint(e.type)),this.redPoint.visible=i},e}(ItemRenderBase);__reflect(WorldBossesItemMain.prototype,"WorldBossesItemMain");var GlobalFun=function(){function t(){}return t.checkMoney=function(t,e,i,s){switch(void 0===e&&(e=MoneyConst.yuanbao),void 0===i&&(i=""),e){case MoneyConst.gold:if(Actor.gold>=t)return!0;""==i&&(i="KhÃ´ng Ä‘á»§ tiá»n Ä‘á»“ng"),UserTips.ins().showTips(i);break;case MoneyConst.yuanbao:if(Actor.yb>=t)return!0;if(""==i&&(i="KhÃ´ng Ä‘á»§ NguyÃªn Báº£o"),UserTips.ins().showTips(i),!KFServerSys.ins().isKF)if(0==SDkMsg.isShowRecharge){var n=WarnView.show("KhÃ´ng Ä‘á»§ NguyÃªn Báº£o",null,null,function(){});n.setBtnLabel("XÃ¡c nháº­n")}else if(1==SDkMsg.GetInstance().isIOSAuditVersion()){var n=WarnView.show(SDkMsg.kefu_qq,function(){},null,null,null,"sure");n.setBtnLabel("XÃ¡c nháº­n")}else{var n=WarnView.show("KhÃ´ng Ä‘á»§ NguyÃªn Báº£o, cÃ³ muá»‘n Ä‘áº¿n náº¡p tiá»n khÃ´ngï¼Ÿ",null,null,function(){var t=Recharge.ins().getRechargeData(0);t&&2==t.num?ViewMgr.ins().open(ChargeFirstWinPanel):ViewMgr.ins().open(RechargeFirstWin),s&&"function"==typeof s&&s()});n.setBtnLabel("Há»§y","Äi Ä‘áº¿n")}default:return debug.log("æ£€æŸ¥è´§å¸ç±»åž‹ä¸å¯¹ï¼Œè¯·æ£€æŸ¥=",e),!1}return!1},t.getDir=function(t){var e=0;switch(t){case 0:e=0;break;case 1:case 2:case 3:e=2;break;case 4:e=4;break;case 5:case 6:case 7:e=2}return e},t.isScaleXByDir=function(t){var e=0;switch(t){case 0:case 1:case 2:e=1;break;case 4:e=-1}return e},t.isOpenHit=function(){return!1},t.isOpenBacklash=function(){return!0},t.isOpenPoisoning=function(){return!1},t.getSexByJob=function(t){var e=0;switch(t){case 1:e=1;break;case 2:e=1;break;case 3:e=1}return e},t.makeTextByNum=function(t){return t.toString()},t.getMoneyConstQualityById=function(t){var e=0;switch(t){case MoneyConst.exp:case MoneyConst.gold:e=1;break;case MoneyConst.punch2:e=5;break;case MoneyConst.yuanbao:case MoneyConst.chongZhiYuanBao:e=4;break;default:e=2}return e},t.isOpenActivationWin=function(){return!1},t}();__reflect(GlobalFun.prototype,"GlobalFun");var ConfigRobberfb=function(){function t(){}return t}();__reflect(ConfigRobberfb.prototype,"ConfigRobberfb");var HttpProperty=function(){function t(){}return t.init=function(e){this.urlParam={};var i=window.paraUrl,s=(window.urlParam,window.ARGS);if(s){try{var n=egret.Base64Util.decode(s);s=StringUtils.ab1str(n)}catch(o){console.log("Base64 Error")}console.log("args_str:"+s);var a=JSON.parse(s),r=a.config;if(r){var h="",l="",c="",u="",p="",d="";r.logReportUrl&&(h=r.logReportUrl),r.gmReportUrl&&(l=r.gmReportUrl),r.giftFetchUrl&&(c=r.giftFetchUrl),r.updateUrl&&(u=r.updateUrl),r.updateUrl2&&(p=r.updateUrl2),r.directUrl&&(d=r.directUrl),r.is_audit_version&&(SDkMsg.is_audit_version=1==r.is_audit_version?!0:!1),r.is_audit_shortCut&&(SDkMsg.is_audit_shortCut=r.is_audit_shortCut),r.is_audit_share&&(SDkMsg.is_audit_share=r.is_audit_share),r.kefu_qq&&(SDkMsg.kefu_qq=r.kefu_qq),null!=r.isShowRecharge&&(SDkMsg.isShowRecharge=r.isShowRecharge),null!=r.is_audit_showCreateRole&&(SDkMsg.isShowCreateRole=r.is_audit_showCreateRole),null!=r.is_show_privilege_reward&&(SDkMsg.GetInstance().isGongZhongHao()||(SDkMsg.is_show_privilege_reward=r.is_show_privilege_reward)),null!=r.is_show_privilege_gift&&(SDkMsg.GetInstance().isGongZhongHao()||(SDkMsg.is_show_privilege_gift=r.is_show_privilege_gift)),null!=r.account_type&&SDkMsg.GetInstance().setAuthorityType(r.account_type),null!=r.isPayMoney&&(SDkMsg.isPayMoney=r.isPayMoney),SDkMsg.GetInstance().InitBasePlatInfo(r.clientIp,r.entryType,r.adapterUrl,r.agentId,r.adapterVer),ReportMessage.GetInstance().InitBaseData(h,l,c),this.setResourcesUrl(u,p,d);var g=a.version;g&&(this.versionText=g.version);var f=a.server;f&&SDkMsg.GetInstance().initServer(f);var v=a.params;v&&SDkMsg.GetInstance().InitSdk(v),ReportMessage.GetInstance().sendReport(ReportMessage.step_game_MySdk,1),ReportMessage.GetInstance().sendReport(ReportMessage.step_game_begin)}}else{if(i){var y=i.indexOf("?");if(-1!=y)for(var m=i.slice(y+1).split("&"),_=void 0,T=0;T<m.length;T++)_=m[T].split("="),this.urlParam[_[0]]=_[1]}1==SDkMsg.isWXSmallGame&&(t.srvid=150,t.serverIP="192.168.11.150",t.serverPort=9001,this.setResourcesUrl("http://192.168.11.150/h5client/","",""))}ResDirMgr.RES_RESOURCE+="/",ResDirMgr.RES_DIR+="/",ResDirMgr.MAP_DIR+="/",1==t.isLocation?this.isDebug=!0:this.isDebug=!1},t.setResourcesUrl=function(e,i,s){0==SDkMsg.isWXSmallGame&&this.isLocation||(ResDirMgr.updataUrl(e),t.directUrl=e)},t.staticWin=function(t){var e=t.stage.stageWidth,i=t.stage.stageHeight,s=document.documentElement.clientWidth,n=document.documentElement.clientHeight;i=Math.max(948,n),e=Math.max(600,s),1==SDkMsg.isWXSmallGame?t.stage.scaleMode=egret.StageScaleMode.FIXED_WIDTH:(t.stage.scaleMode=egret.StageScaleMode.FIXED_NARROW,t.stage.setContentSize(e,i))},t.isIphonex=function(){var t,e;return SDkMsg.isWXSmallGame?(t=window.wx.getSystemInfoSync().windowWidth,e=window.wx.getSystemInfoSync().windowHeight):(t=document.documentElement.clientWidth,e=document.documentElement.clientHeight),e/t>2.1?!0:!1},t.isWXIpad=function(){var t,e;return SDkMsg.isWXSmallGame?(t=window.wx.getSystemInfoSync().windowWidth,e=window.wx.getSystemInfoSync().windowHeight,t/e>.7&&1>t/e?!0:!1):!1},t.isWeb=function(){return!1},Object.defineProperty(t,"isDebug",{get:function(){return this.urlParam.debug?(console.log("111111111111"),"false"==this.urlParam.debug?(console.log("22222222222"),!1):(console.log("333333333"),!0)):(console.log("0000000000"),this.debug)},set:function(t){this.debug=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"openID",{get:function(){return this.urlParam.user},set:function(t){"dev_"!=t&&(this.urlParam.user=t)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"srvid",{get:function(){return parseInt(this.urlParam.srvid)},set:function(t){this.urlParam.srvid=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"serverIP",{get:function(){return this.urlParam.srvaddr},set:function(t){this.urlParam.srvaddr=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"serverPort",{get:function(){return this.urlParam.srvport||9001},set:function(t){this.urlParam.srvport=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"password",{get:function(){return this.urlParam.spverify||""},set:function(t){this.urlParam.spverify=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"openKey",{get:function(){return this.urlParam.openkey},enumerable:!0,configurable:!0}),Object.defineProperty(t,"mobileType",{get:function(){return this.urlParam.mobileType},enumerable:!0,configurable:!0}),Object.defineProperty(t,"appid",{get:function(){return this.urlParam.appid||""},enumerable:!0,configurable:!0}),Object.defineProperty(t,"nickName",{get:function(){var t=this.urlParam.nickName||"";try{return t.length?decodeURIComponent(t):t}catch(e){return t}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"callUrl",{get:function(){var t=this.urlParam.callUrl||"";return t.length?decodeURIComponent(t):t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"gifi",{get:function(){return this.urlParam.gifi},enumerable:!0,configurable:!0}),Object.defineProperty(t,"roleCount",{get:function(){return parseInt(this.urlParam.roleCount)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"isnew",{get:function(){return parseInt(this.urlParam.isnew)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"login_ip",{get:function(){return this.urlParam.login_ip},enumerable:!0,configurable:!0}),Object.defineProperty(t,"loadurl",{get:function(){return decodeURIComponent(this.urlParam.loadurl)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"pfid",{get:function(){return SDkMsg.GetInstance().channelid},enumerable:!0,configurable:!0}),Object.defineProperty(t,"pf",{get:function(){return SDkMsg.GetInstance().channelid},enumerable:!0,configurable:!0}),Object.defineProperty(t,"isWinServer",{get:function(){return!0},enumerable:!0,configurable:!0}),t.isCanLogin=function(){return null!=this.openID&&null!=this.password&&null!=this.srvid&&null!=this.serverIP&&null!=this.serverPort},Object.defineProperty(t,"isLocation",{get:function(){return location.href.indexOf("192.168")>=0||location.href.indexOf("127.0.0.1")>=0||location.href.indexOf("localhost")>=0},enumerable:!0,configurable:!0}),t.setLoadProgress=function(t,e){GameLoadingUI.GetInstance().setProgress(t,e)},t.setLoadProgress2=function(t,e,i){GameLoadingUI.GetInstance().setProgress2(t,e,i)},t.versionText="",t.directUrl="",t.debug=!1,t}();__reflect(HttpProperty.prototype,"HttpProperty");var ConfigRongLuLevel=function(){function t(){}return t}();__reflect(ConfigRongLuLevel.prototype,"ConfigRongLuLevel");var KeyboardUtils=function(t){function e(){var e=t.call(this)||this;if(e.key_ups=new Array,e.key_downs=new Array,DeviceUtils.IsHtml5&&HttpProperty.isLocation){var i=e;document.addEventListener("keyup",function(t){for(var e=0,s=i.key_ups.length;s>e;e++){var n=i.key_ups[e][0],o=i.key_ups[e][1];o?n.call(o,t.keyCode):n(t.keyCode)}}),document.addEventListener("keydown",function(t){for(var e=0,s=i.key_downs.length;s>e;e++){var n=i.key_downs[e][0],o=i.key_downs[e][1];o?n.call(o,t.keyCode):n(t.keyCode)}})}return e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.addKeyUp=function(t,e){this.key_ups.push([t,e])},e.prototype.addKeyDown=function(t,e){this.key_downs.push([t,e])},e.prototype.removeKeyUp=function(t,e){for(var i=0;i<this.key_ups.length;i++)this.key_ups[i][0]==t&&this.key_ups[i][1]==e&&(this.key_ups.splice(i,1),i--)},e.prototype.removeKeyDown=function(t,e){for(var i=0;i<this.key_downs.length;i++)this.key_downs[i][0]==t&&this.key_downs[i][1]==e&&(this.key_downs.splice(i,1),i--)},e}(ClassBase);__reflect(KeyboardUtils.prototype,"KeyboardUtils");var MathUtils=function(){function t(){}return t.getAngle=function(t){return 180*t/Math.PI},t.getRadian=function(t){return t/180*Math.PI},t.getRadian2=function(t,e,i,s){var n=i-t,o=s-e;return Math.atan2(o,n)},t.getDistance=function(t,e,i,s){var n=i-t,o=s-e,a=n*n+o*o;return Math.sqrt(a)},t.getDistanceByObject=function(t,e){return this.getDistance(t.x,t.y,e.x,e.y)},t.getDistanceX2ByObject=function(t,e){var i=t.x-e.x,s=t.y-e.y;return i*i+s*s},t.getDirMove=function(t,e,i,s){void 0===i&&(i=0),void 0===s&&(s=0);var n=this.getRadian(t),o={x:0,y:0};return o.x=Math.cos(n)*e+i,o.y=Math.sin(n)*e+s,o},t.limit=function(t,e){t=Math.min(t,e),e=Math.max(t,e);var i=e-t;return t+Math.random()*i},t.limitInteger=function(t,e){return Math.round(this.limit(t,e))},t.randomArray=function(t){var e=Math.floor(Math.random()*t.length);return t[e]},t.toInteger=function(t){return t>>0},t}();__reflect(MathUtils.prototype,"MathUtils");
var MD5=function(){function t(){this.hexcase=0,this.b64pad=""}return t.prototype.hex_md5=function(t){return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)))},t.prototype.b64_md5=function(t){return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)))},t.prototype.any_md5=function(t,e){return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)),e)},t.prototype.hex_hmac_md5=function(t,e){return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t),this.str2rstr_utf8(e)))},t.prototype.b64_hmac_md5=function(t,e){return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t),this.str2rstr_utf8(e)))},t.prototype.any_hmac_md5=function(t,e,i){return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t),this.str2rstr_utf8(e)),i)},t.prototype.md5_vm_test=function(){return"900150983cd24fb0d6963f7d28e17f72"==this.hex_md5("abc").toLowerCase()},t.prototype.rstr_md5=function(t){return this.binl2rstr(this.binl_md5(this.rstr2binl(t),8*t.length))},t.prototype.rstr_hmac_md5=function(t,e){var i=this.rstr2binl(t);i.length>16&&(i=this.binl_md5(i,8*t.length));for(var s=Array(16),n=Array(16),o=0;16>o;o++)s[o]=909522486^i[o],n[o]=1549556828^i[o];var a=this.binl_md5(s.concat(this.rstr2binl(e)),512+8*e.length);return this.binl2rstr(this.binl_md5(n.concat(a),640))},t.prototype.rstr2hex=function(t){try{this.hexcase}catch(e){this.hexcase=0}for(var i,s=this.hexcase?"0123456789ABCDEF":"0123456789abcdef",n="",o=0;o<t.length;o++)i=t.charCodeAt(o),n+=s.charAt(i>>>4&15)+s.charAt(15&i);return n},t.prototype.rstr2b64=function(t){try{this.b64pad}catch(e){this.b64pad=""}for(var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s="",n=t.length,o=0;n>o;o+=3)for(var a=t.charCodeAt(o)<<16|(n>o+1?t.charCodeAt(o+1)<<8:0)|(n>o+2?t.charCodeAt(o+2):0),r=0;4>r;r++)s+=8*o+6*r>8*t.length?this.b64pad:i.charAt(a>>>6*(3-r)&63);return s},t.prototype.rstr2any=function(t,e){var i,s,n,o,a,r=e.length,h=Array(Math.ceil(t.length/2));for(i=0;i<h.length;i++)h[i]=t.charCodeAt(2*i)<<8|t.charCodeAt(2*i+1);var l=Math.ceil(8*t.length/(Math.log(e.length)/Math.log(2))),c=Array(l);for(s=0;l>s;s++){for(a=Array(),o=0,i=0;i<h.length;i++)o=(o<<16)+h[i],n=Math.floor(o/r),o-=n*r,(a.length>0||n>0)&&(a[a.length]=n);c[s]=o,h=a}var u="";for(i=c.length-1;i>=0;i--)u+=e.charAt(c[i]);return u},t.prototype.str2rstr_utf8=function(t){for(var e,i,s="",n=-1;++n<t.length;)e=t.charCodeAt(n),i=n+1<t.length?t.charCodeAt(n+1):0,e>=55296&&56319>=e&&i>=56320&&57343>=i&&(e=65536+((1023&e)<<10)+(1023&i),n++),127>=e?s+=String.fromCharCode(e):2047>=e?s+=String.fromCharCode(192|e>>>6&31,128|63&e):65535>=e?s+=String.fromCharCode(224|e>>>12&15,128|e>>>6&63,128|63&e):2097151>=e&&(s+=String.fromCharCode(240|e>>>18&7,128|e>>>12&63,128|e>>>6&63,128|63&e));return s},t.prototype.str2rstr_utf16le=function(t){for(var e="",i=0;i<t.length;i++)e+=String.fromCharCode(255&t.charCodeAt(i),t.charCodeAt(i)>>>8&255);return e},t.prototype.str2rstr_utf16be=function(t){for(var e="",i=0;i<t.length;i++)e+=String.fromCharCode(t.charCodeAt(i)>>>8&255,255&t.charCodeAt(i));return e},t.prototype.rstr2binl=function(t){for(var e=Array(t.length>>2),i=0;i<e.length;i++)e[i]=0;for(var i=0;i<8*t.length;i+=8)e[i>>5]|=(255&t.charCodeAt(i/8))<<i%32;return e},t.prototype.binl2rstr=function(t){for(var e="",i=0;i<32*t.length;i+=8)e+=String.fromCharCode(t[i>>5]>>>i%32&255);return e},t.prototype.binl_md5=function(t,e){t[e>>5]|=128<<e%32,t[(e+64>>>9<<4)+14]=e;for(var i=1732584193,s=-271733879,n=-1732584194,o=271733878,a=0;a<t.length;a+=16){var r=i,h=s,l=n,c=o;i=this.md5_ff(i,s,n,o,t[a+0],7,-680876936),o=this.md5_ff(o,i,s,n,t[a+1],12,-389564586),n=this.md5_ff(n,o,i,s,t[a+2],17,606105819),s=this.md5_ff(s,n,o,i,t[a+3],22,-1044525330),i=this.md5_ff(i,s,n,o,t[a+4],7,-176418897),o=this.md5_ff(o,i,s,n,t[a+5],12,1200080426),n=this.md5_ff(n,o,i,s,t[a+6],17,-1473231341),s=this.md5_ff(s,n,o,i,t[a+7],22,-45705983),i=this.md5_ff(i,s,n,o,t[a+8],7,1770035416),o=this.md5_ff(o,i,s,n,t[a+9],12,-1958414417),n=this.md5_ff(n,o,i,s,t[a+10],17,-42063),s=this.md5_ff(s,n,o,i,t[a+11],22,-1990404162),i=this.md5_ff(i,s,n,o,t[a+12],7,1804603682),o=this.md5_ff(o,i,s,n,t[a+13],12,-40341101),n=this.md5_ff(n,o,i,s,t[a+14],17,-1502002290),s=this.md5_ff(s,n,o,i,t[a+15],22,1236535329),i=this.md5_gg(i,s,n,o,t[a+1],5,-165796510),o=this.md5_gg(o,i,s,n,t[a+6],9,-1069501632),n=this.md5_gg(n,o,i,s,t[a+11],14,643717713),s=this.md5_gg(s,n,o,i,t[a+0],20,-373897302),i=this.md5_gg(i,s,n,o,t[a+5],5,-701558691),o=this.md5_gg(o,i,s,n,t[a+10],9,38016083),n=this.md5_gg(n,o,i,s,t[a+15],14,-660478335),s=this.md5_gg(s,n,o,i,t[a+4],20,-405537848),i=this.md5_gg(i,s,n,o,t[a+9],5,568446438),o=this.md5_gg(o,i,s,n,t[a+14],9,-1019803690),n=this.md5_gg(n,o,i,s,t[a+3],14,-187363961),s=this.md5_gg(s,n,o,i,t[a+8],20,1163531501),i=this.md5_gg(i,s,n,o,t[a+13],5,-1444681467),o=this.md5_gg(o,i,s,n,t[a+2],9,-51403784),n=this.md5_gg(n,o,i,s,t[a+7],14,1735328473),s=this.md5_gg(s,n,o,i,t[a+12],20,-1926607734),i=this.md5_hh(i,s,n,o,t[a+5],4,-378558),o=this.md5_hh(o,i,s,n,t[a+8],11,-2022574463),n=this.md5_hh(n,o,i,s,t[a+11],16,1839030562),s=this.md5_hh(s,n,o,i,t[a+14],23,-35309556),i=this.md5_hh(i,s,n,o,t[a+1],4,-1530992060),o=this.md5_hh(o,i,s,n,t[a+4],11,1272893353),n=this.md5_hh(n,o,i,s,t[a+7],16,-155497632),s=this.md5_hh(s,n,o,i,t[a+10],23,-1094730640),i=this.md5_hh(i,s,n,o,t[a+13],4,681279174),o=this.md5_hh(o,i,s,n,t[a+0],11,-358537222),n=this.md5_hh(n,o,i,s,t[a+3],16,-722521979),s=this.md5_hh(s,n,o,i,t[a+6],23,76029189),i=this.md5_hh(i,s,n,o,t[a+9],4,-640364487),o=this.md5_hh(o,i,s,n,t[a+12],11,-421815835),n=this.md5_hh(n,o,i,s,t[a+15],16,530742520),s=this.md5_hh(s,n,o,i,t[a+2],23,-995338651),i=this.md5_ii(i,s,n,o,t[a+0],6,-198630844),o=this.md5_ii(o,i,s,n,t[a+7],10,1126891415),n=this.md5_ii(n,o,i,s,t[a+14],15,-1416354905),s=this.md5_ii(s,n,o,i,t[a+5],21,-57434055),i=this.md5_ii(i,s,n,o,t[a+12],6,1700485571),o=this.md5_ii(o,i,s,n,t[a+3],10,-1894986606),n=this.md5_ii(n,o,i,s,t[a+10],15,-1051523),s=this.md5_ii(s,n,o,i,t[a+1],21,-2054922799),i=this.md5_ii(i,s,n,o,t[a+8],6,1873313359),o=this.md5_ii(o,i,s,n,t[a+15],10,-30611744),n=this.md5_ii(n,o,i,s,t[a+6],15,-1560198380),s=this.md5_ii(s,n,o,i,t[a+13],21,1309151649),i=this.md5_ii(i,s,n,o,t[a+4],6,-145523070),o=this.md5_ii(o,i,s,n,t[a+11],10,-1120210379),n=this.md5_ii(n,o,i,s,t[a+2],15,718787259),s=this.md5_ii(s,n,o,i,t[a+9],21,-343485551),i=this.safe_add(i,r),s=this.safe_add(s,h),n=this.safe_add(n,l),o=this.safe_add(o,c)}return[i,s,n,o]},t.prototype.md5_cmn=function(t,e,i,s,n,o){return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(e,t),this.safe_add(s,o)),n),i)},t.prototype.md5_ff=function(t,e,i,s,n,o,a){return this.md5_cmn(e&i|~e&s,t,e,n,o,a)},t.prototype.md5_gg=function(t,e,i,s,n,o,a){return this.md5_cmn(e&s|i&~s,t,e,n,o,a)},t.prototype.md5_hh=function(t,e,i,s,n,o,a){return this.md5_cmn(e^i^s,t,e,n,o,a)},t.prototype.md5_ii=function(t,e,i,s,n,o,a){return this.md5_cmn(i^(e|~s),t,e,n,o,a)},t.prototype.safe_add=function(t,e){var i=(65535&t)+(65535&e),s=(t>>16)+(e>>16)+(i>>16);return s<<16|65535&i},t.prototype.bit_rol=function(t,e){return t<<e|t>>>32-e},t}();__reflect(MD5.prototype,"MD5");var PageArray=function(){function t(t,e){void 0===e&&(e=20),this.dataSource=t,this.size=e,this.currentPage=0,this.setPageData()}return Object.defineProperty(t.prototype,"length",{get:function(){return this.dataSource.length},enumerable:!0,configurable:!0}),t.prototype.setPageData=function(){this.pageData=[];for(var t=this.currentPage*this.size,e=(this.currentPage+1)*this.size,i=Math.min(this.length,e),s=t;i>s;s++)this.pageData.push(this.dataSource[s])},t.prototype.getDataSource=function(){return this.dataSource},Object.defineProperty(t.prototype,"totalPage",{get:function(){return Math.ceil(this.length/this.size)},enumerable:!0,configurable:!0}),t.prototype.havePre=function(){return 0!=this.currentPage},t.prototype.haveNext=function(){return this.currentPage<this.totalPage-1},t.prototype.prev=function(){this.currentPage--,this.setPageData()},t.prototype.next=function(){this.currentPage++,this.setPageData()},t.prototype.first=function(){this.currentPage=0,this.setPageData()},t.prototype.last=function(){this.currentPage=this.totalPage-1,this.setPageData()},t.prototype.gotoPage=function(t){this.totalPage<t||(this.currentPage=t-1,this.setPageData())},t}();__reflect(PageArray.prototype,"PageArray");var RegExpUtil=function(){function t(){}return t.LINE_BREAK=/\r+/g,t.BLANK_REG=/[\s\\]/g,t.ARGB_COLOR=/[a-fA-F0-9]{8}/,t.HTML=/<[^>]+>/g,t.DELETE_SPACE=/\s/g,t.REPLACE_STRING=/%s/g,t.NumericExp=/^\d+$/,t.NonNumericExp=/\D/,t.ActorNameExp=/^([\u4e00-\u9fa5]?\w?[^>|!@#$%&*\^\?]){1,48}$/,t}();__reflect(RegExpUtil.prototype,"RegExpUtil");var ResourceUtils=function(t){function e(){var e=t.call(this)||this;return e._groupIndex=0,e._configs=new Array,e._groups={},e._urlResorce={},RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,e.onResourceLoadComplete,e),RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,e.onResourceLoadProgress,e),RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,e.onResourceLoadError,e),e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.addConfig=function(t,e){this._configs.push([t,e])},e.prototype.loadConfig=function(t,e){this._onConfigComplete=t,this._onConfigCompleteTarget=e,this.loadNextConfig()},e.prototype.loadNextConfig=function(){if(0==this._configs.length)return this._onConfigComplete.call(this._onConfigCompleteTarget),this._onConfigComplete=null,void(this._onConfigCompleteTarget=null);var t=this._configs.shift();RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this),RES.loadConfig(t[0],t[1])},e.prototype.onConfigCompleteHandle=function(t){RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this),this.loadNextConfig()},e.prototype.loadGroup=function(t,e,i,s){this._groups[t]=[e,i,s],RES.loadGroup(t)},e.prototype.loadGroupAsync=function(t,e,i){return __awaiter(this,void 0,void 0,function(){var s=this;return __generator(this,function(n){return[2,new Promise(function(n,o){s._groups[t]=[function(){n(!0)},e,i],RES.loadGroup(t)})]})})},e.prototype.loadGroups=function(t,e,i,s,n){RES.createGroup(t,e,!0),this.loadGroup(t,i,s,n)},e.prototype.pilfererLoadGroup=function(t,e){void 0===e&&(e=null);var i="pilferer_"+t;e||(e=[t]),RES.createGroup(i,e,!0),RES.loadGroup(i,-1)},e.prototype.onResourceLoadComplete=function(t){var e=t.groupName;if(this._groups[e]){var i=void 0;this._groups[e][0]&&(i=this._groups[e][0]);var s=void 0;this._groups[e][2]&&(s=this._groups[e][2]),null!=i&&i.call(s),this._groups[e]=null,delete this._groups[e]}},e.prototype.onResourceLoadProgress=function(t){var e=t.groupName;if(this._groups[e]){var i=this._groups[e][1],s=this._groups[e][2];null!=i&&i.call(s,t.itemsLoaded,t.itemsTotal)}},e.prototype.onResourceLoadError=function(t){return ErrLog.trace(t.groupName+"NhÃ³m tÃ i nguyÃªn cÃ³ tÃ i nguyÃªn táº£i tháº¥t báº¡i"),console.log(t.groupName+"NhÃ³m tÃ i nguyÃªn cÃ³ tÃ i nguyÃªn táº£i tháº¥t báº¡i"),"preload"==t.groupName?(GameloadMgr.ins().preload_load_count+=1,1==GameloadMgr.ins().preload_load_count&&Assert(!1,t.groupName+" Táº£i tÃ i nguyÃªn tháº¥t báº¡i!! Sá»‘ láº§n tháº¥t báº¡i: "+GameloadMgr.ins().preload_load_count),void(GameloadMgr.ins().preload_load_count<3?RES.loadGroup(t.groupName):alert("Táº£i tÃ i nguyÃªn tháº¥t báº¡i, vui lÃ²ng kiá»ƒm tra máº¡ng vÃ  Ä‘Äƒng nháº­p láº¡i"))):void this.onResourceLoadComplete(t)},e.prototype.loadResource=function(t,e,i,s,n){void 0===t&&(t=[]),void 0===e&&(e=[]),void 0===i&&(i=null),void 0===s&&(s=null),void 0===n&&(n=null);var o=t.concat(e),a="loadGroup"+this._groupIndex++;RES.createGroup(a,o,!0),this._groups[a]=[i,s,n],RES.loadGroup(a)},e.prototype.loadUrlResource=function(t,e,i,s){var n=this;null==this._urlResorce[t]?(this._urlResorce[t]={data:null,compFun:i,thisObj:s},RES.getResByUrl(t,function(e){n._urlResorce[t].data=e,null!=i&&i.apply(n._urlResorce[t].thisObj)},this,e)):null!=i&&i.apply(s)},e.prototype.getUrlResource=function(t){return null==this._urlResorce[t]?(debug.log("èµ„æºæœªåŠ è½½"),null):this._urlResorce[t].data},e.prototype.loadFnt=function(t,e){var i=this;this.fontLoadingCtx||(this.fontLoadingCtx={});var s=RES.getRes(e);if(s)t.$setFont(s);else{var n=this.fontLoadingCtx[e];n?-1==n.labels.indexOf(s)&&n.labels.push(s):(n=this.fontLoadingCtx[e]={state:1,labels:[t]},RES.getResAsync(e,function(t){if(t){var s=i.fontLoadingCtx[e];if(s)for(var n=0,o=s.labels.length;o>n;n++);}delete i.fontLoadingCtx[e]},this))}},e}(ClassBase);__reflect(ResourceUtils.prototype,"ResourceUtils");var StageUtils=function(t){function e(){var i=t.call(this)||this;return null==e._uiStage&&(e._uiStage=new eui.UILayer,e._uiStage.touchEnabled=!1,e._uiStage.percentHeight=100,e._uiStage.percentWidth=100,i.getStage().addChild(e._uiStage)),i}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.getHeight=function(){return this.getStage().stageHeight},e.prototype.getWidth=function(){return this.getStage().stageWidth},e.prototype.setTouchChildren=function(t){this.getStage().touchChildren=t},e.prototype.setMaxTouches=function(t){this.getStage().maxTouches=t},e.prototype.setFrameRate=function(t){this.getStage().frameRate=t},e.prototype.setScaleMode=function(t){this.getStage().scaleMode=t},e.prototype.getStage=function(){return egret.MainContext.instance.stage},e.prototype.getUIStage=function(){return e._uiStage},e}(ClassBase);__reflect(StageUtils.prototype,"StageUtils");var StringUtils=function(){function t(){}return t.trimSpace=function(t){return t.replace(/^\s*(.*?)[\s\n]*$/g,"$1")},t.getStringLength=function(t){for(var e=t.split(""),i=0,s=0;s<e.length;s++){var n=e[s];i+=this.isChinese(n)?2:1}return i},t.isChinese=function(t){var e=/^[\u4E00-\u9FA5]+$/;return e.test(t)?!1:!0},t.strByteLen=function(t){for(var e=0,i=t.length,s=0;i>s;s++)e+=t.charCodeAt(s)>=127?3:1;return e},t.complementByChar=function(e,i,s,n){void 0===s&&(s=" "),void 0===n&&(n=!0);var o=this.strByteLen(n?e.replace(t.HTML,""):e);return e+this.repeatStr(s,i-o)},t.repeatStr=function(t,e){for(var i="",s=0;e>s;s++)i+=t;return e>0?i+t:i},t.addColor=function(t,e){var i;return"string"==typeof e?i=String(e):"number"==typeof e&&(i=Number(e).toString(10)),'<font color="'+i+'">'+t+"</font>"},t.addColor1=function(t,e){var i=new Object;return i.style=new Object,i.text=t,i.textColor=Number(e).toString(16),i},t.substitute=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];var s=RegExpUtil.REPLACE_STRING,n=t.match(s);if(n&&n.length)for(var o=n.length,a=0;o>a;a++)t=t.replace(n[a],e[a]);return t},t.replaceStr=function(t,e,i){if(-1==t.indexOf(e))return t;var s=t.split(e);return s[0]+i+s[1]},t.replaceStrColor=function(t,e){for(var i=t.indexOf("0x"),s=i,n="",o="";-1!=s;)n=t.substring(i,i+8),t=t.replace(n,e),i+=8,o=t.substring(i),s=o.indexOf("0x"),i+=s;return t},t.replace=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var s=0;s<e.length;s++)t=t.replace("%s",e[s]+"");return t},t.getStrByRegExp=function(t,e){void 0===e&&(e=/\d+/g);var i=[];t.replace(e,function(){return i.push(arguments[0]),"number"==typeof arguments[0]?arguments[0].toString():arguments[0]});return i},t.ChineseToNumber=function(e){for(var i=0,s=0,n=0,o=!1,a=e.split(""),r=0;r<a.length;r++){var h=t.chnNumCharCN[a[r]];if("undefined"!=typeof h)n=h,r===a.length-1&&(s+=n);else{var l=t.chnNameValueCN[a[r]].value;o=t.chnNameValueCN[a[r]].secUnit,o?(s=(s+n)*l,i+=s,s=0):s+=n*l,n=0}}return i+s},t.NumberToChinese=function(e){return e.toString()},t.SectionToChinese=function(e){for(var i="",s="",n=0,o=!0,a=t.chnNumChar,r=t.chnUnitChar;e>0;){var h=e%10;0===h?o||(o=!0,s=a[h]+s):(o=!1,i=a[h],i+=r[n],s=i+s),n++,e=Math.floor(e/10)}return s},t.ab1str=function(t){return String.fromCharCode.apply(null,new Uint8Array(t))},t.replaceByParam=function(e){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];return t.replaceByParamArray(e,i)},t.replaceByParamArray=function(t,e){var i=t.split(this.REPLACE_REG),s=i.length-1,n=[],o=0;for(o=0;s>o;o++)n.push(i[o],e[o]);return n.push(i[o]),n.join("")},t.str2ab=function(t){var e=new egret.ByteArray;return e.writeUTFBytes(t),e.buffer},t.HTML=/<[^>]+>/g,t.ENTER_REGEXP=/\r/g,t.REPLACE_REG=/\$[a-zA-Z0-9]+\$/,t.chnNumCharCN={"é›¶":0,"ä¸€":1,"äºŒ":2,"ä¸‰":3,"å››":4,"äº”":5,"å…­":6,"ä¸ƒ":7,"å…«":8,"ä¹":9},t.chnNameValueCN={"å":{value:10,secUnit:!1},"ç™¾":{value:100,secUnit:!1},"åƒ":{value:1e3,secUnit:!1},"váº¡n":{value:1e4,secUnit:!0},"trÄƒm triá»‡u":{value:1e8,secUnit:!0}},t.chnNumChar=["é›¶","ä¸€","äºŒ","ä¸‰","å››","äº”","å…­","ä¸ƒ","å…«","ä¹"],t.chnUnitSection=["","váº¡n","trÄƒm triá»‡u","ä¸‡äº¿","äº¿äº¿"],t.chnUnitChar=["","å","ç™¾","åƒ"],t}();__reflect(StringUtils.prototype,"StringUtils");var TextFlowMaker=function(){function t(){}return t.generateTextFlow=function(e){if(!e)return(new egret.HtmlTextParser).parser("");for(var i,s=e.split("|"),n="",o=0,a=s.length;a>o;o++)n+=t.getSingleTextFlow1(s[o]);try{i=(new egret.HtmlTextParser).parser(n)}catch(r){return console.log("Äáº§u vÃ o HTML lá»—i"),(new egret.HtmlTextParser).parser("")}return i},t.generateTextFlow1=function(e){if(!e)return(new egret.HtmlTextParser).parser("");for(var i=e.split("|"),s=[],n=0,o=i.length;o>n;n++){var a=t.getSingleTextFlow(i[n]);a.text&&""!=a.text&&s.push(a)}return s},t.getSingleTextFlow1=function(e){var i=e.split("&T:",2);if(2==i.length){for(var s="<font",n=i[0].split("&"),o=void 0,a=!1,r=0,h=n.length;h>r;r++)switch(o=n[r].split(":"),o[0]){case t.STYLE_SIZE:s+=' size="'+Math.floor(+o[1])+'"';break;case t.STYLE_COLOR:s+=' color="'+Math.floor(+o[1])+'"';break;case t.UNDERLINE_TEXT:a=!0}return s+=a?"><u>"+i[1]+"</u></font>":">"+i[1]+"</font>"}return"<font>"+e+"</font>"},t.parseHtml=function(t){return this._htmlParser||(this._htmlParser=new egret.HtmlTextParser),this._htmlParser.parse(t)},t.getSingleTextFlow=function(e){var i=e.split("&T:",2),s={style:{}};if(2==i.length){for(var n=(i[0],e.split("&")),o=void 0,a=0,r=n.length;r>a;a++)switch(o=n[a].split(":"),o[0]){case t.STYLE_SIZE:s.style.size=+o[1];break;case t.STYLE_COLOR:s.style.textColor=+o[1];break;case t.UNDERLINE_TEXT:s.style.underline=!0;break;case t.EVENT:s.style.href="event:"+o[1]}s.text=i[1]}else s.text=e;return s},t.getCStr=function(e){return t.numberList[e]?e+"":""},t.STYLE_COLOR="C",t.STYLE_SIZE="S",t.PROP_TEXT="T",t.UNDERLINE_TEXT="U",t.EVENT="E",t.numberList=["é›¶","ä¸€","äºŒ","ä¸‰","å››","äº”","å…­","ä¸ƒ","å…«","ä¹","å","åä¸€","åäºŒ","åä¸‰","åå››","åäº”","åå…­","åä¸ƒ","åå…«","åä¹","äºŒå"],t}();__reflect(TextFlowMaker.prototype,"TextFlowMaker");var ConfigSkirmishBase=function(){function t(){}return t}();__reflect(ConfigSkirmishBase.prototype,"ConfigSkirmishBase");var uint64=function(){function t(t){this._lowUint=0,this._highUint=0,this.value=t}return t.prototype.isEqual=function(t){return t?this._lowUint==t._lowUint&&this._highUint==t._highUint:!1},t.prototype.isGreaterThan=function(e){if(e instanceof t)return this._highUint>e._highUint||this._highUint==e._highUint&&this._lowUint>e._lowUint;var i=new t;return"string"==typeof e?(i.value=e,this.isGreaterThanOrEqual(i)):"number"==typeof e?(i.value=e.toString(),this.isGreaterThanOrEqual(i)):void 0},t.prototype.isGreaterThanOrEqual=function(e){if(e instanceof t)return this._highUint>e._highUint||this._highUint==e._highUint&&this._lowUint>=e._lowUint;var i=new t;return"string"==typeof e?(i.value=e,this.isGreaterThanOrEqual(i)):"number"==typeof e?(i.value=e.toString(),this.isGreaterThanOrEqual(i)):void 0},Object.defineProperty(t.prototype,"isZero",{get:function(){return 0==this._lowUint&&0==this._highUint},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isGreaterThanZero",{get:function(){return this._lowUint>0||this._highUint>0},enumerable:!0,configurable:!0}),t.prototype.writeByte=function(t){t.writeUnsignedInt(this._lowUint),t.writeUnsignedInt(this._highUint)},t.prototype.setValue=function(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this._lowUint=t,this._highUint=e},Object.defineProperty(t.prototype,"value",{set:function(e){e instanceof egret.ByteArray?(this._lowUint=e.readUnsignedInt(),this._highUint=e.readUnsignedInt()):"string"==typeof e&&t.stringToUint64(e,10,this)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"valueByString",{set:function(t){},enumerable:!0,configurable:!0}),t.prototype.leftMove=function(e,i){void 0===i&&(i=null),i=i||this;var s=t.LeftMoveMask[e],n=s&this._lowUint;n>>>=32-e,i._lowUint=this._lowUint<<e,i._highUint=this._highUint<<e,i._highUint=i._highUint|n},t.prototype.add=function(e,i){void 0===i&&(i=null),i=i||this;var s=this._lowUint+e._lowUint;i._highUint=this._highUint+e._highUint,s>=t.MaxLowUint?(i._highUint++,i._lowUint=s-t.MaxLowUint):i._lowUint=s},t.prototype.subtraction=function(e,i){void 0===i&&(i=null),i=i||this;var s=this._lowUint-e._lowUint;i._highUint=this._highUint-e._highUint,0>s?(i._highUint--,i._lowUint=s+t.MaxLowUint):i._lowUint=s},t.prototype.scale=function(e,i){void 0===i&&(i=null),i=i||this;var s=this._lowUint*e;i._highUint=this._highUint*e,i._highUint+=Math.floor(Math.abs(s/t.MaxLowUint)),i._lowUint=s%t.MaxLowUint},t.prototype.toString=function(e){void 0===e&&(e=10);for(var i,s,n,o="",a=this._lowUint,r=this._highUint;0!=r||0!=a;)i=r%e,n=i*t.MaxLowUint+a,s=n%e,o=s+o,r=(r-i)/e,a=(n-s)/e;return o.length?o:"0"},t.stringToUint64=function(e,i,s){void 0===i&&(i=10),void 0===s&&(s=null),s=s||new t;for(var n,o,a=0,r=0,h=e.length,l=0;h>l;l++)o=parseInt(e.charAt(l)),n=a*i+o,r=r*i+Math.floor(n/t.MaxLowUint),a=n%t.MaxLowUint;return s.setValue(a,r),s},t.LeftMoveMask=[0,2147483648,1073741824,536870912,268435456,134217728,67108864,33554432,16777216,8388608,4194304,2097152,1048576,524288,262144,131072,65536,32768,16384,8192,4096,2048,1024,512,256,128,64,32,16,8,4,2,1],t.MaxLowUint=4294967296,t}();__reflect(uint64.prototype,"uint64");var WatcherUtil=function(){function t(){}return t.removeFromArrayCollection=function(e){e&&e.source&&e.source.length&&t.removeFromArray(e.source)},t.removeFromArray=function(e){if(e)for(var i=0,s=e;i<s.length;i++){var n=s[i];t.removeFromObject(n)}},t.removeFromObject=function(t){if(t instanceof egret.EventDispatcher){var e=t.$getEventMap(),i=e[eui.PropertyEvent.PROPERTY_CHANGE];if(i)for(var s=i.length-1;s>=0;s--){var n=i[s];n.thisObject instanceof eui.Watcher&&(n.thisObject.unwatch(),i.splice(s,1))}}else{var o=t.__listeners__;if(o&&o.length)for(var a=0;a<o.length;a+=2){var r=o[a+1];r instanceof eui.Watcher&&(r.unwatch(),a-=2)}}},t}();__reflect(WatcherUtil.prototype,"WatcherUtil");var WXCGMsg=function(){function t(){}return t.GetInstance=function(){return null==t.Instance&&(t.Instance=new t),t.Instance},t.prototype.open=function(){},t.prototype.clearByMy=function(){this.onClear()},t.prototype.onClear=function(){SDkMsg.isWXSmallGame&&window.wx.triggerGC()},t}();__reflect(WXCGMsg.prototype,"WXCGMsg");var Main=function(t){function e(){var e=t.call(this)||this;return e.isConfigComplete=!1,e.isUserDataComplete=!1,e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(t){window.HttpPropertyload&&(this.visible=!1),this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this),this.initWXEuiClass(),this.stage.registerImplementation("eui.IAssetAdapter",new AssetAdapter),this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.stage.addEventListener(egret.Event.ACTIVATE,this.onActivate,this),this.stage.addEventListener(egret.Event.DEACTIVATE,this.onDeactivate,this),RES.setMaxLoadingThread(4),DeviceUtils.IsPC&&(StageUtils.ins().getStage().orientation=egret.OrientationMode.AUTO),-1!=navigator.userAgent.indexOf("iPad")&&(StageUtils.ins().getStage().orientation=egret.OrientationMode.AUTO),egret.ImageLoader.crossOrigin="anonymous",SoundMgr.ins().setEffectOn(SysSettingData.ins().getBool(SysSettingData.SOUND_EFFECT)),SoundMgr.ins().setBgOn(SysSettingData.ins().getBool(SysSettingData.SOUND_EFFECT)),FixUtil.fixAll(),window.callMessageBox=this.callMessageBox,window.wx&&!window.OPEN_DATA&&(SDkMsg.isWXSmallGame=!0),HttpProperty.staticWin(this),GameLoadingShowBg.GetInstance().show(this),this.loginLogics()},e.prototype.loginLogics=function(){return __awaiter(this,void 0,void 0,function(){var t,e,e;return __generator(this,function(i){switch(i.label){case 0:return console.log("enter loginLogicsFunction"),HttpProperty.init(this),GameLoadingUI.GetInstance().show(this),[4,this.initWXSDK()];case 1:return i.sent(),[4,this.loadResJson()];case 2:return i.sent(),[4,this.loadTheme()];case 3:if(i.sent(),!window.HttpPropertyload)return[3,7];console.log("wait asw call setServer"),i.label=4;case 4:return this.isUserDataComplete?[3,6]:[4,this.delay(30)];case 5:return i.sent(),[3,4];case 6:return console.log("after wait asw call setServer"),[3,9];case 7:return this.showServSelector(),this.isUserDataComplete?[3,9]:[4,this.waitMsgCenterEvent(GameLogin.SELECTEDSERVERED)];case 8:i.sent(),i.label=9;case 9:return this.isConfigComplete?[3,11]:[4,this.delay(30)];case 10:return i.sent(),[3,9];case 11:HttpProperty.setLoadProgress(50,"(Äang káº¿t ná»‘i server)"),t=1,i.label=12;case 12:return[4,this.connectSocket(HttpProperty.serverIP,HttpProperty.serverPort)];case 13:return i.sent()?[3,15]:[4,this.delay(2e3*t)];case 14:return i.sent(),t=Math.min(t,5e3),t++,5>t?(HttpProperty.setLoadProgress(50,"Káº¿t ná»‘i server tháº¥t báº¡i, Ä‘ang thá»­ láº§n thá»© "+t+" káº¿t ná»‘i"),[3,12]):(HttpProperty.setLoadProgress(100,"Káº¿t ná»‘i server tháº¥t báº¡i, vui lÃ²ng lÃ m má»›i game vÃ  vÃ o láº¡i"),[2]);case 15:return[4,this.connectServer()];case 16:return i.sent(),[4,this.waitMsgCenterEvent(GameLogin.CONNECTMSGSUCC)];case 17:return i.sent(),[3,20];case 18:return i.sent(),[4,this.waitMsgCenterEvent(GameLogin.ROLEREVICED)];case 19:return i.sent(),[3,22];case 20:return[4,this.waitMsgCenterEvent(GameLogin.ROLEREVICED)];case 21:i.sent(),i.label=22;case 22:return ReportMessage.GetInstance().sendReport(ReportMessage.get_game_config),e=egret.getTimer(),[4,GameloadMgr.ins().loadPrepareResAsync()];case 23:return i.sent(),console.log("load preloadGroupCost:"+(egret.getTimer()-e)),e=egret.getTimer(),[4,this.loadGameCFG()];case 24:return i.sent(),console.log("load cfg cost:"+(egret.getTimer()-e)),GameloadMgr.ins().configComplete_a94(),[2]}})})},e.prototype.loadGameCFG=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i,s,n,o,t;return __generator(this,function(a){switch(a.label){case 0:if(!SDkMsg.isWXSmallGame)return[3,5];t={},e=7,i=0,a.label=1;case 1:return 7>i?[4,this.loadResAsync("config"+i+"_json")]:[3,4];case 2:s=a.sent();for(n in s)t[n]=s[n];o=80+(i+1)/e*20,HttpProperty.setLoadProgress(o,"(Äang táº£i tÃ i nguyÃªn cáº§n thiáº¿t cá»§a game)"),a.label=3;case 3:return i++,[3,1];case 4:return[3,7];case 5:return[4,this.loadResAsync("config_json")];case 6:t=a.sent(),a.label=7;case 7:return GlobalConfig.init(t),[2]}})})},e.prototype.loadResAsync=function(t){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(i){return[2,new Promise(function(i,s){RES.getResAsync(t,function(e){e=RES.getRes(t),i(e)},e)})]})})},e.prototype.loadUrlResAsync=function(t,e,i){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(s){return[2,new Promise(function(s,n){RES.getResByUrl(t,function(t){s(t)},e,i)})]})})},e.prototype.waitMsgCenterEvent=function(t){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(i){return e=this,[2,new Promise(function(i,s){MessageCenter.ins().addListener(t,function n(s){MessageCenter.ins().removeListener(t,n,e),i(!0)},e)})]})})},e.prototype.delay=function(t){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(i){return[2,new Promise(function(i,s){egret.setTimeout(function(){i(t)},e,t)})]})})},e.prototype.initWXSDK=function(){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(e){return[2,new Promise(function(e,i){1==SDkMsg.isWXSmallGame?(window.wx.setKeepScreenOn({keepScreenOn:!0}),SDkMsg.GetInstance().setSdkEndCallBack(function(){e(!0)},t),SDkMsg.isAuthorizationByWX=!0,SDkMsg.GetInstance().setWeiXingCode()):(SDkMsg.isAuthorizationByWX=!0,e(!0))})]})})},e.prototype.loadResJson=function(){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(e){return[2,new Promise(function(e,i){1==SDkMsg.isWXSmallGame&&WXCGMsg.GetInstance().open();var s=new Date;1==SDkMsg.isWXSmallGame?ResourceUtils.ins().addConfig(ResDirMgr.RES_RESOURCE+"default.res4.json?"+s.getTime(),""+ResDirMgr.RES_RESOURCE):ResourceUtils.ins().addConfig(ResDirMgr.RES_RESOURCE+"default.res3.json?"+s.getTime(),""+ResDirMgr.RES_RESOURCE),ResourceUtils.ins().loadConfig(function(){e(!0)},t),t.loadVersion()})]})})},e.prototype.loadTheme=function(){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(e){return[2,new Promise(function(e,i){if(HttpProperty.setLoadProgress(40,"Láº§n Ä‘áº§u táº£i sáº½ hÆ¡i lÃ¢u, vui lÃ²ng kiÃªn nháº«n chá»..."),0==HttpProperty.isDebug||1==SDkMsg.isWXSmallGame)console.log("Báº£n phÃ¡t hÃ nh"),t.onThemeLoadComplete(),e(!0);else{var s=new eui.Theme(ResDirMgr.RES_RESOURCE+"default.thm.json",t.stage);s.addEventListener(eui.UIEvent.COMPLETE,function(){e(!0)},t)}})]})})},e.prototype.showServSelector=function(){"dev"==SDkMsg.GetInstance().channelid?window.HttpPropertyload||GameLoginPaneUi.GetInstance().show(this):window.ARGS?window.HttpPropertyload||(GameSelectServeUI.GetInstance().show(this),GameLoadingUI.GetInstance().setProgressPane(!1)):window.HttpPropertyload||GameLoginPaneUi.GetInstance().show(this)},e.prototype.connectSocket=function(t,e){return __awaiter(this,void 0,void 0,function(){var i=this;return __generator(this,function(s){return[2,new Promise(function(s,n){if(GameSocket.ins().getSocket().connected)s(!0);else{var o=i;GameSocket.ins().connect(t,e);var a=function(t){GameSocket.ins().getSocket().removeEventListener(egret.IOErrorEvent.IO_ERROR,a,o),GameSocket.ins().getSocket().removeEventListener(egret.IOErrorEvent.CONNECT,r,o),s(!1)},r=function h(t){GameSocket.ins().getSocket().removeEventListener(egret.IOErrorEvent.IO_ERROR,a,o),GameSocket.ins().getSocket().removeEventListener(egret.IOErrorEvent.CONNECT,h,o),s(!0)};GameSocket.ins().getSocket().addEventListener(egret.IOErrorEvent.IO_ERROR,a,o),GameSocket.ins().getSocket().addEventListener(egret.Event.CONNECT,r,o)}})]})})},e.prototype.connectServer=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return console.log("Tráº¡ng thÃ¡i: ",this.isConfigComplete,this.isUserDataComplete),RoleMgr.ins().connectServer(),GameLoadingUI.GetInstance().setProgressPane(!0),[2]})})},e.prototype.checkGameType=function(){SDkMsg.isWXSmallGame?(window.wx.setKeepScreenOn({keepScreenOn:!0}),SDkMsg.GetInstance().setSdkEndCallBack(this.startLoade,this),SDkMsg.isAuthorizationByWX=!0,SDkMsg.GetInstance().setWeiXingCode()):(SDkMsg.isAuthorizationByWX=!0,this.startLoade())},e.prototype.startLoade=function(){HttpProperty.init(this),GameLoadingUI.GetInstance().show(this),this.loadResVersionComplete(),HttpProperty.setLoadProgress(30,"(Láº§n Ä‘áº§u táº£i sáº½ hÆ¡i lÃ¢u, vui lÃ²ng kiÃªn nháº«n chá»...)"),RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onError,null)},e.prototype.loadResVersionComplete=function(){1==SDkMsg.isWXSmallGame&&WXCGMsg.GetInstance().open();var t=new Date;1==SDkMsg.isWXSmallGame?ResourceUtils.ins().addConfig(ResDirMgr.RES_RESOURCE+"default.res4.json?"+t.getTime(),""+ResDirMgr.RES_RESOURCE):ResourceUtils.ins().addConfig(ResDirMgr.RES_RESOURCE+"default.res3.json?"+t.getTime(),""+ResDirMgr.RES_RESOURCE),ResourceUtils.ins().loadConfig(this.onDefaultConfigComplete,this),this.loadVersion()},e.prototype.loadVersion=function(){var t=new Date;this.versionUrlreq=new egret.HttpRequest,this.versionUrlreq.responseType=egret.HttpResponseType.ARRAY_BUFFER;var e=ResDirMgr.RES_DIR+"version1.me?"+t.getTime();this.versionUrlreq.open(e,egret.HttpMethod.GET),this.versionUrlreq.addEventListener(egret.Event.COMPLETE,this.onVersionComplete,this),this.versionUrlreq.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onVersionError,this),this.versionUrlreq.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),this.versionUrlreq.send()},e.prototype.onVersionError=function(){this.versionUrlreq.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onVersionError,this),this.versionUrlreq.removeEventListener(egret.Event.COMPLETE,this.onVersionComplete,this),this.loadVersion()
},e.prototype.onVersionComplete=function(t){var e,i,s,n,o,a=t.currentTarget.response,r=new JSZip(a),h={};for(var l in r.files)if(n=l.indexOf("version.txt"),-1!=n){e=r.file(l).asText(),o=egret.getTimer(),e=e.slice(1,e.length-1),i=e.split(":");for(var c=0;c<i.length;c+=2)h[i[c]]=i[c+1];console.log("Thá»i gian tÃ¡ch version: ",egret.getTimer()-o)}else n=l.indexOf("default.res2.json"),-1!=n&&(s=JSON.parse(r.file(l).asText()));ResOtherData.GetInstance().setOtherData(s),ResOtherData.GetInstance().setVersionData(h),this.versionUrlreq.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onVersionError,this),this.versionUrlreq.removeEventListener(egret.Event.COMPLETE,this.onVersionComplete,this),this.versionUrlreq=null,console.log("ÄÃ£ táº£i xong sá»‘ phiÃªn báº£n tÃ i nguyÃªn"),this.isConfigComplete=!0,window.HttpPropertyload},e.prototype.onDefaultConfigComplete=function(){this.onConfigComplete()},e.prototype.onConfigComplete=function(){if(HttpProperty.setLoadProgress(40,"Láº§n Ä‘áº§u táº£i sáº½ hÆ¡i lÃ¢u, vui lÃ²ng kiÃªn nháº«n chá»..."),0==HttpProperty.isDebug||1==SDkMsg.isWXSmallGame)console.log("Báº£n phÃ¡t hÃ nh"),this.onThemeLoadComplete();else{var t=new eui.Theme(ResDirMgr.RES_RESOURCE+"default.thm.json",this.stage);t.addEventListener(eui.UIEvent.COMPLETE,this.onThemeLoadComplete,this)}},e.prototype.onThemeLoadComplete=function(){console.log("ÄÃ£ táº£i xong cáº¥u hÃ¬nh"),GameloadMgr.ins().load()},e.prototype.onError=function(t){console.log("Táº£i tháº¥t báº¡i: "+t.resItem.url)},e.prototype.initWXEuiClass=function(){window["eui.Button"]=eui.Button,window["eui.Component"]=eui.Component,window["eui.Image"]=eui.Image},e.prototype.onActivate=function(t){SoundMgr.ins().setLockScreen(!1)},e.prototype.onDeactivate=function(t){SoundMgr.ins().setLockScreen(!0)},e.prototype.callMessageBox=function(t,e){void 0===e&&(e=0),LayerMgr.UI_Popup&&LayerMgr.UI_Popup.parent?MsgBox.GetInstance().show(t,LayerMgr.UI_Popup,null,null,e):MsgBox.GetInstance().show(t,this,null,null,e)},e.prototype.setServer=function(t,e,i,s,n,o){console.log("ThÃ´ng tin chá»n server: ",t,e,i,s,n,o),this.visible=!0,this.isUserDataComplete=!0;var a=LoginData.GetInstance().GetUserVo();a=o,HttpProperty.openID=t,HttpProperty.password=e,HttpProperty.srvid=i,HttpProperty.serverIP=s,HttpProperty.serverPort=n;try{HttpProperty.setLoadProgress(30,"(Láº§n Ä‘áº§u táº£i sáº½ hÆ¡i lÃ¢u, vui lÃ²ng kiÃªn nháº«n chá»...)")}catch(r){console.warn("setServer HttpProperty.setLoadProgress:error"+r)}SDkMsg.GetInstance().setSdk()},e}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main"),window.gameWebMain=Main;var DelayOptipMgr=function(t){function e(){var e=t.call(this)||this;return e.TIME_THRESHOLD=2,e._delayOpts=[],egret.startTick(e.runCachedFun,e),e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.addDelayOptFunction=function(t,e,i,s,n){this._delayOpts.push({fun:e,funPara:i,thisObj:t,callBack:s,para:n})},e.prototype.clear=function(){this._delayOpts.length=0},e.prototype.runCachedFun=function(t){if(0==this._delayOpts.length)return!1;for(var e,i=egret.getTimer();this._delayOpts.length&&(e=this._delayOpts.shift(),e.funPara?e.fun.call(e.thisObj,e.funPara):e.fun.call(e.thisObj),e.callBack&&(void 0!=e.para?e.callBack.call(e.thisObj,e.para):e.callBack()),!(egret.getTimer()-i>this.TIME_THRESHOLD)););return!1},e}(ClassBase);__reflect(DelayOptipMgr.prototype,"DelayOptipMgr");var SDkMsg=function(){function t(){this.channelid="",this.sdkType="browser",this.jsSdkUrl="",this.jsVer="",this.agentid="",this.version="",this.mobileType="",this.authority_type=0,this.deviceid="",this.fcm_flag=0,this.login_url="",this.is_login=!1,this.pay_params="",this.is_sdkinit=!1,this.pay_url="",this.sever_open_day=9999,this.wanbaVipGiftMaxNum=3e3,this.getWanbaGiftState=0,this.wxOpenId="",this.isQueryBack=!1,this.isNeedInItGameByJsSdk=!1,this.isShortCutAWS=!1}return t.GetInstance=function(){return null==t.Instance&&(t.Instance=new t),t.Instance},t.prototype.InitBasePlatInfo=function(e,i,s,n,o){if(this.channelid=n,this.client_ip=e,this.sdkType=i,this.jsVer=o,this.jsSdkUrl=s,null==window.HttpPropertyload&&0==t.isWXSmallGame){var a=document.createElement("script");a.async=!1,a.crossorigin="anonymous",a.src=this.jsSdkUrl+"/adapter/adapter.js?"+this.jsVer,a.addEventListener("load",function(){t.GetInstance().InitJsSdk()},!1),document.body.appendChild(a)}},t.prototype.setSdkEndCallBack=function(t,e){this.weiXinSdkEndCallBack=t,this.weiXinSdkEndCallBackThisAny=e},t.prototype.setGetWXOpenIdCall=function(t,e){this.weiXinLoadCallBack=t,this.weiXinLoadCallBackThisAny=e},t.prototype.getWXOpenId=function(){var e=this;ReportMessage.GetInstance().sendReport(ReportMessage.step_game_register);var i=window.wxadapter;i?(platform.showShareMenu(),i.wxadapter_init(function(t){e.is_sdkinit=!0,ReportMessage.GetInstance().sendReport(ReportMessage.step_game_OtherSdk,1),console.log("wxadapter_init success=",t),e.wxLogin()},function(i){console.log("wxadapter_init failed=",i),ReportMessage.GetInstance().sendReport(ReportMessage.step_game_OtherSdk,0),e.is_sdkinit=!1,t.callWeiXingOtherSdkNum<10&&(t.callWeiXingOtherSdkNum+=1,e.getWXOpenId())}),window.wx.getSystemInfo({success:function(e){console.log("getSystemInfo ",e),t.Instance.mobileType=e.platform}}),window.wxadapter&&window.wxadapter.isShowRecharge&&i.isShowRecharge(function(e){t.isShowRecharge=1},function(e){t.isShowRecharge=0})):console.log("wxadapter_init fail======")},t.prototype.wxLogin=function(){var e=this,i=window.wxadapter;i&&i.wxadapter_openid(function(i){ReportMessage.GetInstance().sendReport(ReportMessage.step_game_register_end,1),t.GetInstance().setWeiXingOpenId(i),console.log("openid success=",i),null!=e.weiXinLoadCallBack&&e.weiXinLoadCallBack.call(e.weiXinLoadCallBackThisAny)},function(i){console.log("openid failed=",i),ReportMessage.GetInstance().sendReport(ReportMessage.step_game_register_end,0),t.callWeiXingOpenIdNum<10&&(t.callWeiXingOpenIdNum+=1,e.wxLogin())})},t.prototype.setWeiXingCode=function(){this.callWeiXingSdk()},t.prototype.setWeiXingOpenId=function(e){this.wxOpenId=e;var i=LoginData.GetInstance().GetUserVo();i.user_name=this.wxOpenId,i.uid=this.wxOpenId,HttpProperty.openID=t.GetInstance().channelid+"_"+i.uid},t.prototype.callWeiXingSdk=function(){this.isQueryBack=!1,TimerMgr.ins().doTimer(2e3,1,this.cheackQueryBack,this);var e=window.sdkChannelid;t.GetInstance().channelid=e;var i="https://cls.ha02.youyantech.com/$num$/query.php?plat=$num$&version=".replace("$num$",e).replace("$num$",e)+Version.VersionNum;console.log("YÃªu cáº§u WeChat SDK",i);var s=new egret.HttpRequest;s.responseType=egret.HttpResponseType.TEXT,s.open(i,egret.HttpMethod.GET),s.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),s.send(),s.addEventListener(egret.Event.COMPLETE,this.OnCallWeiXingSdkComplete,this),s.addEventListener(egret.IOErrorEvent.IO_ERROR,this.OnCallWeiXingSdkError,this)},t.prototype.cheackQueryBack=function(){0==this.isQueryBack&&this.OnCallWeiXingSdkError()},t.prototype.OnCallWeiXingSdkComplete=function(t){if(this.isQueryBack=!0,TimerMgr.ins().remove(this.cheackQueryBack,this),null==window.ARGS){var e=t.currentTarget;console.log("WeChat SDK thÃ nh cÃ´ng",e.response),window.ARGS=e.response,this.weiXinSdkEndCallBack&&this.weiXinSdkEndCallBack.call(this.weiXinSdkEndCallBackThisAny)}},t.prototype.OnCallWeiXingSdkError=function(){console.log("[CallWeiXingSdk] Lá»—i"),t.callWeiXingMySdkNum<10&&(t.callWeiXingMySdkNum+=1,this.callWeiXingSdk())},t.prototype.InitSdk=function(e){if("string"==typeof e&&(e=JSON.parse(e)),this.agentid=e.agentid,this.deviceid=e.deviceid,this.version=e.version,this.mobileType=e.mobileType,this.authority_type=e.account_type,!window.HttpPropertyload){if(console.log("InitAdapter",this.agentid,this.sdkType),this.IsBrowser()){this.fcm_flag=e.fcm_flag;var i=LoginData.GetInstance().GetUserVo();0==t.isWXSmallGame&&(e.account&&(i.user_name=e.account),e.account&&(i.uid=e.uid)),console.log("login_verify complete "+i.user_name),"js"===this.sdkType&&this.InitJsSdk()}else this.InitAndroidFunc();this.pay_params=egret.Base64Util.encode(StringUtils.str2ab(JSON.stringify(e))),console.log("channelid = "+this.channelid,"agentid = "+this.agentid,"deviceid = "+this.deviceid,"version = "+this.version,"authority_type = "+this.authority_type)}},t.prototype.InitJsSdk=function(){if("js"===this.sdkType){var e=window.adapter;if(e&&e.platform){var i=LoginData.GetInstance().GetUserVo();e.platform.adapter_init(this.channelid,this.agentid,this.jsSdkUrl,i.uid,this.jsVer)}window.NavigaCallBack=t.Instance.NavigaCallBack}},t.prototype.NavigaCallBack=function(e,i,s){void 0===s&&(s="false");var n=t.Instance;if(console.log("fun "+e,"arg "+i,"entryType "+n.sdkType,"is_need_login="+s),"client"==n.sdkType||"true"==s)switch(e){case t.CALL_LOGIN:n.OnVerifyLogin(i);break;case t.CALL_GET_MEM_INFO:t.Instance.OnMemoryInfoBack(i);break;case t.CALL_SHAREMSG:"true"==i&&PfActivitySysBase.ins().sendWeiXinInviteGift(1),console.log("Káº¿t quáº£ chia sáº»",i);default:break;case t.CALL_SHORTCUT:"true"==i&&PfActivitySysBase.ins().sendCollection(1),console.log("Káº¿t quáº£ lÆ°u",i);break;case t.CALL_ATTENTION:"true"==i&&PfActivitySysBase.ins().sendGuanZhuGift(2),console.log("Káº¿t quáº£ theo dÃµi",i);break;case t.CALL_GIFTNUMBER:n.wanbaGiftNum=i,n.getWanbaGift(i),console.log("MÃ£ tÃºi quÃ ",i)}else switch(e){case t.CALL_LOGIN:n.OnJsLoginInfoBack(i);break;case t.CALL_SHAREMSG:"true"==i&&PfActivitySysBase.ins().sendWeiXinInviteGift(1),console.log("Káº¿t quáº£ chia sáº»",i);break;case t.CALL_SHORTCUT:"true"==i&&PfActivitySysBase.ins().sendCollection(1),console.log("Káº¿t quáº£ lÆ°u",i);break;case t.CALL_ATTENTION:"true"==i&&PfActivitySysBase.ins().sendGuanZhuGift(2),console.log("Káº¿t quáº£ theo dÃµi",i);break;case t.CALL_GIFTNUMBER:n.wanbaGiftNum=i,n.getWanbaGift(i),console.log("MÃ£ tÃºi quÃ ",i)}},t.prototype.OnVerifyLogin=function(t){if(console.log("OnVerifyLogin"),""!=this.channelid){this.is_login=!0;var e=new egret.HttpRequest;e.responseType=egret.HttpResponseType.TEXT;var i="https://cls.ha02.youyantech.com/$0$/login_verify.php?channelId=$1$&agentId=$2$&data=$3$&device=$4$";this.login_url=StringUtils.replaceByParam(i,this.channelid,this.channelid,this.agentid,t,this.deviceid),e.open(this.login_url,egret.HttpMethod.GET),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),e.send(),e.addEventListener(egret.Event.COMPLETE,this.OnVerifyComplete,this),e.addEventListener(egret.IOErrorEvent.IO_ERROR,this.OnQueryLoginError,this),console.log("login_url url "+this.login_url)}},t.prototype.OnVerifyComplete=function(e){this.is_login=!1;var i=e.currentTarget;console.log(i.response);var s=JSON.parse(i.response);if(s&&0==s.ret){this.login_user=s.user;var n=LoginData.GetInstance().GetUserVo();n.user_name=this.login_user.account,n.uid=this.login_user.uid,this.authority_type=this.login_user.account_type,HttpProperty.openID=t.GetInstance().channelid+"_"+n.uid,console.log("login_verify complete "+n.user_name,"authority_type "+this.authority_type),this.loagionEndCall(),"asw"==t.GetInstance().channelid&&null!=this.aswSelectServeCallBack&&this.aswSelectServeCallBack.call(this.aswSelectServeCallBackThisAny),t.is_audit_shortCut&&this.isShortCutByAWS()}},t.prototype.OnQueryLoginError=function(){this.is_login=!1,console.log("[AgentAdapter] query login error url = "+this.login_url)},t.prototype.OnJsLoginInfoBack=function(e){e=JSON.parse(e),this.login_user=e.user;var i=LoginData.GetInstance().GetUserVo();i.user_name=this.login_user.account,i.uid=this.login_user.uid,HttpProperty.openID=t.GetInstance().channelid+"_"+i.uid,console.log("login_verify complete "+i.user_name),this.loagionEndCall()},t.prototype.OnMemoryInfoBack=function(t){try{var e=JSON.parse(t);e.all>512e3&&console.log("[ResourceManager] ClearAllResource all memory = "+e.all)}catch(i){console.log("[ResourceManager] Naviga getMemory error"+t)}},t.prototype.InitAndroidFunc=function(){console.log("InitAndroidFunc"),window.NavigaCallBack=t.Instance.NavigaCallBack},t.prototype.loagionEndCall=function(){1==this.isNeedInItGameByJsSdk&&null!=this.loginFun&&this.loginFun.call(this.loginThisAny)},t.prototype.SendLogin=function(){"browser"!==this.sdkType&&1!=this.is_login&&(console.log("sendLogin"),this.isNeedInItGameByJsSdk=!0,this.CallNaviga(t.CALL_LOGIN,this.pay_params))},t.prototype.setLoginCallBack=function(t,e){this.loginFun=t,this.loginThisAny=e},t.prototype.CallNaviga=function(t,e){var i={fun:t,arg:e};if(window.wxadapter&&window.wxadapter.PostMessage)window.wxadapter.PostMessage(JSON.stringify(i));else{var s=window.adapter;this.IsJsSdk()&&s&&s.platform?s.platform.PostMessage(JSON.stringify(i)):this.GetJsInterface()&&this.GetJsInterface().postMessage(JSON.stringify(i))}},t.prototype.GetJsInterface=function(){return window.JsInterface},t.prototype.PayMoney=function(e){if(1==t.isWXSmallGame)if(window.wxadapter){var i=this.GetUserInfo();i.ProductName="NguyÃªn Báº£o",i.ProductDesc=100*e+"NguyÃªn Báº£o",i.Ratio="100",window.wxadapter.wxadapter_create_order(JSON.stringify(i),this.wxOpenId,100*e,function(t){console.log("wxadapter_create_order success=",t)},function(t){console.log("wxadapter_create_order failed=",t)})}else console.log("KhÃ´ng cÃ³ giao diá»‡n wxadapter");else this.IsBrowser()?this.PayMoneyByBrowser(e):this.PayMoneyByClient(e)},t.prototype.PayMoneyByBrowser=function(t){if(""!=this.channelid){var e=this.GetUserInfo(),i=this.MakeOrderID(e);e.ProductName="NguyÃªn Báº£o",e.ProductDesc=100*t+"NguyÃªn Báº£o",e.Ratio="100";var s=this.getMobileType(),n={userInfo:e,orderID:i,productID:"0",amount:t,payType:s},o=new egret.HttpRequest;o.responseType=egret.HttpResponseType.TEXT;var a="gm/pay_create_order.php?ch=$0$&data=$1$&params=$2$",r=StringUtils.str2ab(encodeURIComponent(JSON.stringify(n)));this.pay_url=StringUtils.replaceByParam(a,this.channelid,egret.Base64Util.encode(r),this.pay_params),this.pay_order_id=i,this.pay_zone_id=e.ZoneID,o.open(this.pay_url,egret.HttpMethod.GET),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.send(),o.addEventListener(egret.Event.COMPLETE,this.OnPaySuccess,this),o.addEventListener(egret.IOErrorEvent.IO_ERROR,this.OnPayError,this)}},t.prototype.receiveWanBagiftRequest=function(e,i){if(void 0===i&&(i=!1),""!=t.GetInstance().channelid){var s=this.GetUserInfo(),n="33cc62b07ae98fffddd923b178aa0a14",o=new Date,a=Math.floor(o.getTime()/1e3),r=t.GetInstance().channelid,h=t.wanba_gift_vip_level,l=(new MD5).hex_md5(r+s.ZoneID+s.UserID+s.RoleID+s.RoleLevel+e+a+n),c=i?"https://cls.ha02.youyantech.com/api/c2s/use_gift_info.php?spid=$1$&server=$2$&user=$3$&role=$4$&level=$5$&card=$6$&time=$7$&sign=$8$&vip_grade=$9$":"https://cls.ha02.youyantech.com/api/c2s/use_gift.php?spid=$1$&server=$2$&user=$3$&role=$4$&level=$5$&card=$6$&time=$7$&sign=$8$&vip_grade=$9$";c=StringUtils.replaceByParam(c,r,s.ZoneID,s.UserID,s.RoleID,s.RoleLevel,e,a,l,h),console.log("callUrl:",c);var u=new egret.HttpRequest;u.responseType=egret.HttpResponseType.TEXT,u.open(c,egret.HttpMethod.GET),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),u.send(),i?u.addEventListener(egret.Event.COMPLETE,this.receiveWanbaGiftSuccess2,this):u.addEventListener(egret.Event.COMPLETE,this.receiveWanbaGiftSuccess,this),u.addEventListener(egret.IOErrorEvent.IO_ERROR,this.receiveWanbaGiftError,this)}},t.prototype.receiveWanbaGiftSuccess=function(t){var e=t.currentTarget,i=JSON.parse(e.response),s=!1;console.log("receiveWanbaGiftSuccess data.ret:",i.ret),i.ret==this.getWanbaGiftState&&(s=!0),ViewMgr.ins().open(WanBaGiftTipsView,s,i.ret,i.data)},t.prototype.receiveWanbaGiftSuccess2=function(t){var e=t.currentTarget,i=JSON.parse(e.response),s=JSON.parse(i.data).fetch_count;s==this.getWanbaGiftState?(this.giftExchange(this.wanbaGiftNum),console.log("[sdk] Receive WanbaGiftInfo success url fetch_count = 0 ")):(ViewMgr.ins().open(WanBaGiftTipsView,!1,s.toString()),console.log("[sdk] Receive WanbaGiftInfo success url fetch_count =",s))},t.prototype.receiveWanbaGiftError=function(t){t?console.log("[sdk] Receive WanbaGiftInfo fail --"):console.log("[sdk] Receive WanbaGift fail --")},t.prototype.PayMoneyByClient=function(t){var e=this.GetUserInfo(),i=this.MakeOrderID(e);e.ProductName="NguyÃªn Báº£o",e.ProductDesc=100*t+"NguyÃªn Báº£o",e.Ratio="100",this.SendPayMessage(JSON.stringify(e),i,"0",t)},t.prototype.SendPayMessage=function(e,i,s,n){var o=this.getMobileType(),a={userInfo:e,orderID:i,productID:s,amount:n,params:this.pay_params,payType:o};console.log("Dá»¯ liá»‡u náº¡p tháº»",a,JSON.stringify(a)),this.CallNaviga(t.CALL_PAY,JSON.stringify(a))},t.prototype.OnPaySuccess=function(t){var e=t.currentTarget,i=e.response;console.log("[sdk] Pay money success resp = "+i);var s=null;try{s=JSON.parse(i)}catch(n){return void UserTips.ins().showTips("Lá»—i káº¿t ná»‘i thanh toÃ¡n, vui lÃ²ng thá»­ láº¡i")}if(!s||"error"==s.mode)return void UserTips.ins().showTips(s&&s.message?s.message:"Giao dá»‹ch tháº¥t báº¡i");if("paypal"==s.mode)return void(top.location.href=s.approveUrl);if("free"==s.mode){var o=this;WarnView.show(s.message,function(){o.ConfirmFreePayment(s.orderId)},this)}},t.prototype.ConfirmFreePayment=function(t){var e=new egret.HttpRequest;e.responseType=egret.HttpResponseType.TEXT;var i="gm/pay_free_finalize.php?orderId=$0$&zoneId=$1$",s=StringUtils.replaceByParam(i,t,this.pay_zone_id);e.open(s,egret.HttpMethod.GET),e.send(),e.addEventListener(egret.Event.COMPLETE,function(t){var e=null;try{e=JSON.parse(t.currentTarget.response)}catch(i){return void UserTips.ins().showTips("Lá»—i xÃ¡c nháº­n giao dá»‹ch")}UserTips.ins().showTips(e.message||(e.success?"ThÃ nh cÃ´ng":"Tháº¥t báº¡i"))},this),e.addEventListener(egret.IOErrorEvent.IO_ERROR,function(){UserTips.ins().showTips("Lá»—i káº¿t ná»‘i, vui lÃ²ng thá»­ láº¡i")},this)},t.prototype.OnPayError=function(){console.log("[sdk] Pay money fail url = "+this.pay_url)},t.prototype.MakeOrderID=function(e){var i=new Date;return"asw"==t.GetInstance().channelid?e.ZoneID+"|"+this.channelid+"|"+this.agentid+"|"+e.RoleID+"|"+e.UserID+"|"+this.getMobileType()+"|"+i.getTime():e.ZoneID+"|"+this.channelid+"|"+this.agentid+"|"+e.RoleID+"|"+e.UserID+"|"+i.getTime()},t.prototype.SendReportEnterZone=function(){this.CallNaviga(t.CALL_REPORT_ENTER_ZONE,JSON.stringify(this.GetUserInfo()))},t.prototype.SendReportCreateRole=function(){this.CallNaviga(t.CALL_REPORT_CREATE_ROLE,JSON.stringify(this.GetUserInfo()))},t.prototype.SendReportLoginRole=function(){this.CallNaviga(t.CALL_REPORT_LOGIN_ROLE,JSON.stringify(this.GetUserInfo()))},t.prototype.SendReportLogoutRole=function(e){this.CallNaviga(t.CALL_REPORT_LOGOUT_ROLE,e)},t.prototype.SendReportLevelUp=function(){this.CallNaviga(t.CALL_REPORT_LEVEL_UP,JSON.stringify(this.GetUserInfo()))},t.prototype.GetUserInfo=function(){var t={},e=LoginData.GetInstance().GetUserVo();SubRoles.ins().getSubRoleByIndex(0);t.ZoneID=e.game_server_id,t.ZoneName=e.game_server_name,t.RoleID=Actor.actorID,t.RoleName=Actor.myName,t.RoleLevel=Actor.level||0,t.Currency=Actor.yb,t.VIP=UserVip.ins().lv,t.Gold=Actor.yb,t.UserID=e.uid;var i=new Date;return t.CreateRoleTime=i.getTime(),t.pay_params=this.pay_params,t.payType=this.getMobileType(),t},t.prototype.IsBrowser=function(){return"browser"==this.sdkType||"js"==this.sdkType},t.prototype.IsJsSdk=function(){return"js"===this.sdkType},t.prototype.QueryBanRegister=function(){var t="hdISla9sjXphPqEoE8lZcg==",e=new Date,i=Math.floor(e.getTime()/1e3),s=this.channelid,n=(new MD5).hex_md5(s+i+t),o="https://cls.ha02.youyantech.com/api/ban_register.php?spid=$0$&time=$1$&sign=$2$";o=StringUtils.replaceByParam(o,s,i,n),this.SendHttp(o,this.OnBanRegisterBack,this,null)},t.prototype.OnBanRegisterBack=function(t){var e=t.currentTarget,i=JSON.parse(e.response);0==i.ret&&i.data&&(this.sever_open_day=parseInt(i.data.open_day))},t.prototype.SendHttp=function(t,e,i,s){if(""!=this.channelid){var n=new egret.HttpRequest;n.responseType=egret.HttpResponseType.TEXT,n.open(t,egret.HttpMethod.GET),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send(),e&&i&&n.addEventListener(egret.Event.COMPLETE,e,i),s&&i&&n.addEventListener(egret.IOErrorEvent.IO_ERROR,s,i)}},t.prototype.IsWhiteUser=function(){return 1==this.authority_type},t.prototype.setAuthorityType=function(t){this.authority_type=t},t.prototype.setServerListByASW=function(t,e){this.aswSelectServeCallBack=t,this.aswSelectServeCallBackThisAny=e},t.prototype.initServer=function(t){this.server_info=t},t.prototype.getServerList=function(){return this.server_info},t.prototype.GetLastLoginServerList=function(){var t,e=LoginData.GetInstance().GetUserVo();return t="asw"==this.channelid?egret.localStorage.getItem("last_server_list_"+this.channelid+"_"+e.uid):egret.localStorage.getItem("last_server_list"),t?(this.last_server_list=JSON.parse(t),this.last_server_list.sort(function(t,e){return e.time-t.time}),this.last_server_list):[]},t.prototype.GetServerListByIds=function(t){for(var e,i=t.length,s=[],n=0;i>n;++n)e=this.GetServerInfoById(t[n].id),e&&s.push(this.GetServerInfoById(t[n].id));return s},t.prototype.GetServerInfoById=function(t){if(this.server_info)for(var e=this.server_info.serverList,i=e.length,s=0;i>s;++s)if(t==e[s].id)return e[s];return null},t.prototype.AddLoginServerList=function(e){var i=LoginData.GetInstance().GetUserVo();"asw"==t.GetInstance().channelid?egret.localStorage.setItem("last_login_server_"+t.GetInstance().channelid+"_"+i.uid,e.toString()):egret.localStorage.setItem("last_login_server",e.toString()),this.GetLastLoginServerList(),this.last_server_list||(this.last_server_list=[]);var s=this.last_server_list,n=s.length,o=0,a=new Date;for(o=0;n>o;++o)if(s[o].id==e){s[o].time=a.getTime(),o=-1;break}o>=0&&s.push({id:e,time:a.getTime()}),"asw"==t.GetInstance().channelid?egret.localStorage.setItem("last_server_list_"+t.GetInstance().channelid+"_"+i.uid,JSON.stringify(s)):egret.localStorage.setItem("last_server_list",JSON.stringify(s))},t.prototype.getAgentid=function(){return this.agentid},t.prototype.getMobileType=function(){var e="";return HttpProperty.mobileType?HttpProperty.mobileType:e=1==t.isWXSmallGame?"wechat":"asw"==t.GetInstance().channelid?"qq":"ios"==this.mobileType?"ios":"android"},t.prototype.isIOSAuditVersion=function(){return console.log("SDkMsg.is_audit_version ",t.is_audit_version+t.Instance.mobileType),t.is_audit_version&&"ios"==t.Instance.mobileType},t.prototype.OnCallAuditVersionError=function(){console.log("[OnCallAuditVersionError] Lá»—i")},t.prototype.isShortCutByAWS=function(){if(t.is_audit_shortCut){var e=window.adapter;e&&e.platform&&(console.log("YÃªu cáº§u káº¿t quáº£ lÆ°u   call_isShortCut"),this.CallNaviga(t.CALL_ISSHAREMSG,""))}},t.prototype.getWanbaVipLevel=function(){var e=window.adapter,i={};t.GetInstance().channelid&&e["platform_"+t.GetInstance().channelid]&&e["platform_"+t.GetInstance().channelid].call_wanbaApi("get_vip_level",i,function(e){try{e=JSON.parse(e)}catch(i){return void console.warn(i+"\ndata="+e)}0==e.ret?(t.wanba_gift_vip_score=e.score,t.wanba_gift_vip_level=e.level,t.GetInstance().postWanbaVipLevel(),console.log("VIP LEVEL :",t.wanba_gift_vip_level)):(t.wanba_gift_vip_score=0,t.wanba_gift_vip_level=0,t.GetInstance().postWanbaVipLevel(),console.log("NOT VIP LEVEL :",t.wanba_gift_vip_level))})},t.prototype.postWanbaVipLevel=function(){1==t.is_show_privilege_reward&&(PfActivitySysBase.ins().sendWanbaPrivilegeRewardState_a94(t.wanba_gift_vip_level),console.log("postWanbaVipLevel:-------------------"))},t.prototype.getWanbaGift=function(e){e>=this.wanbaVipGiftMaxNum?(t.GetInstance().getWanbaVipLevel(),t.GetInstance().receiveWanBagiftRequest(e,!0)):this.receiveWanBagiftRequest(e)},t.prototype.giftExchange=function(e){var i={gift_id:e},s=window.adapter;s["platform_"+t.GetInstance().channelid]&&s["platform_"+t.GetInstance().channelid].call_wanbaApi("gift_exchange",i,function(i){try{i=JSON.parse(i)}catch(s){return void console.warn(s+"\ndata="+i)}console.log(i.ret,"-----------ç¤¼åŒ…æ£€æµ‹çŠ¶æ€"),0==i.ret?t.GetInstance().receiveWanBagiftRequest(e):(console.log(t.wanba_gift_vip_level,"-----------------vipLevel"),ViewMgr.ins().open(WanBaGiftTipsView,!1,i.ret))})},t.prototype.callShareMsgByAWS=function(){if(t.is_audit_share){var e=window.adapter;e&&e.platform&&(console.log("YÃªu cáº§u chia sáº»   call_shareMsg"),this.CallNaviga(t.CALL_SHAREMSG,""))}},t.prototype.callAttentionGift=function(){if(t.is_audit_attentionGift){var e=window.adapter;e&&e.platform&&(console.log("YÃªu cáº§u theo dÃµi   call_attentionGift"),this.CallNaviga(t.CALL_ATTENTION,""))}},t.prototype.callShortCutByAWS=function(){if(t.is_audit_shortCut){var e=window.adapter;e&&e.platform&&(console.log("YÃªu cáº§u lÆ°u   call_shortCut"),this.CallNaviga(t.CALL_SHORTCUT,""))}},t.prototype.callLogout=function(){if(t.is_audit_callLogout){var e=window.adapter;e&&e.platform&&(console.log("ÄÄƒng xuáº¥t   call_logout"),this.CallNaviga(t.CALL_LOGIN_OUT,""))}},t.prototype.setSdk=function(){window.NavigaCallBack=t.Instance.NavigaCallBack,t.is_audit_shortCut&&this.isShortCutByAWS()},t.prototype.isGongZhongHao=function(){return null!=window.OPEN_DATA&&null!=window.wx},t.CALL_LOGIN="call_login",t.CALL_LOGIN_OUT="call_logout",t.CALL_PAY="call_pay",t.CALL_WANBAAPI="call_wanbaApi",t.CALL_ISSHAREMSG="call_isShortCut",t.CALL_SHAREMSG="call_shareMsg",t.CALL_SHORTCUT="call_shortCut",t.CALL_ATTENTION="call_attentionGift",t.CALL_GIFTNUMBER="call_giftNum",t.CALL_REPORT_ENTER_ZONE="call_report_enter_zone",t.CALL_REPORT_CREATE_ROLE="call_report_create_role",t.CALL_REPORT_LOGIN_ROLE="call_report_login_role",t.CALL_REPORT_LOGOUT_ROLE="call_report_logout_role",t.CALL_REPORT_LEVEL_UP="call_report_level_up",t.CALL_GET_MEM_INFO="call_get_mem_info",t.is_audit_version=!1,t.is_audit_share=!1,t.is_audit_shortCut=!1,t.is_audit_attentionGift=!1,t.is_audit_callLogout=!1,t.is_show_privilege_reward=!1,t.is_show_privilege_gift=!1,t.wanba_gift_vip_level=0,t.wanba_gift_vip_score=0,t.kefu_qq="",t.isWXSmallGame=!1,t.isAuthorizationByWX=!1,t.createRoletype=1,t.isShowRecharge=1,t.isPayMoney=1,t.isShowOpenServiceRank=1,t.isShowCreateRole=!0,t.callWeiXingMySdkNum=0,t.callWeiXingOtherSdkNum=0,t.callWeiXingOpenIdNum=0,t.callWeiXingLoadNum=0,t}();__reflect(SDkMsg.prototype,"SDkMsg");var ImageText=function(){function t(){this.images=[],this.gap=0,this.fx=0,this.fy=0,this.totalWid=0,this.dirty=0}return t.prototype.makeContainer=function(){return this.container=new egret.DisplayObjectContainer,this.container},t.prototype.addChildAndPos=function(t,e,i){this.container.$setX(e),this.container.$setY(i),t.addChild(this.container)},t.prototype.setCharFunc=function(t,e){void 0===e&&(e=!1),this.charFunc!=t&&(this.charFunc=t,e&&this.redraw())},Object.defineProperty(t.prototype,"text",{set:function(t){this.setText(t)},enumerable:!0,configurable:!0}),t.prototype.setText=function(t){(this._text!=t||this.dirty)&&(this._text=t,this.redraw())},t.prototype.redraw=function(){this.dirty=0;for(var e=this._text,i=0,s=0,n=e.length;n>s;s++){this.by=0;var o=this.images[s];o||(o=this.images[s]=t.getImage(),this.container.$doAddChild(o,this.container.numChildren,!1)),this.charFunc(this,e.charAt(s),o,s),o.source=this.bs,o.touchEnabled=!1,this.layoutFunc?this.layoutFunc(this,o,s):(o.$setX(this.fx+i),o.$setY(this.fy),this.by&&o.$setY(o.$getY()+this.by),i+=s==n-1?this.bw:this.bw+this.gap)}for(;s<this.images.length;s++){var a=this.images[s];a.$setScaleX(1),a.$setScaleY(1),t.POOL.push(a),DisplayUtils.removeFromParent(a),a.source=null}n<this.images.length&&(this.images.length=n),this.totalWid=i},t.getImage=function(){return t.POOL.length?t.POOL.pop():new eui.Image},t.STRFUNC=function(t,e){"d"==e?(t.bs="num_json.dz",t.bw=151):"z"==e?(t.bs="num_json.z",t.bw=38):"/"==e?(t.bs="num_json.zslash",t.bw=15,t.by=5):":"==e?(t.bs="num_json.zcolon",t.bw=15,t.by=5):"u"==e?(t.bs="num2_json.strUp",t.bw=149,t.by=36):"c"==e?(t.bs="num2_json.strCanUp",t.bw=186,t.by=36):(t.bs="num_json.z"+e,t.bw=27,t.by=3)},t.VIPFUNC=function(t,e){"V"==e?(t.bs="num_json.vh",t.bw=52,t.by=0):"v"==e?(t.bs="num_json.v",t.bw=21,t.by=-3):(t.bs="num_json.v"+e,t.bw=14,t.by=0)},t.VIEWLITVIPFUNC=function(t,e){"V"==e?(t.bs="VIPAtlas_json.vipLit",t.bw=44,t.by=0):"T"==e?(t.bs="VIPAtlas_json.tequan",t.bw=58,t.by=0):(t.bs="VIPAtlas_json."+e+e,t.bw=20,t.by=0)},t.VIEWBIGVIPFUNC=function(t,e){"V"==e?(t.bs="VIPAtlas_json.vip",t.bw=58,t.by=0):"M"==e?(t.bs="VIPAtlas_json.manji",t.bw=118,t.by=0):(t.bs="VIPAtlas_json."+e,t.bw=26,t.by=0)},t.ROUNDFUNC=function(t,e){"/"==e?(t.bs="num_json.tslash",t.bw=11):(t.bs="num_json.t"+e,t.bw=15)},t.BATTLERED=function(t,e){t.bs="num_json.red_"+e,"A"==e||"F"==e||"W"==e?t.bw=72:"d"==e||"u"==e?t.bw=22:t.bw=24},t.DMGFUNC=function(t,e){t.bs="num_json.ylw_"+e,"J"==e?(t.bs="num_json.js",t.bw=71):"A"==e||"F"==e?t.bw=59:"d"==e||"u"==e?t.bw=22:t.bw=21},t.LIANZHAN=function(t,e){t.bs="lianzhan_json."+e,t.bw=71},t.POOL=[],t}();__reflect(ImageText.prototype,"ImageText");var ObjPool=function(){function t(){this._objs=new Array}return t.pop=function(e){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];t._content[e]||(t._content[e]=[]);var n=t._content[e];if(n.length){var o=n.pop();return o}null==window[e]&&console.log(e,"ç±»åâ€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦");var a=egret.getDefinitionByName(e),r=i.length,h=void 0;return 0==r?h=new a:1==r?h=new a(i[0]):2==r?h=new a(i[0],i[1]):3==r?h=new a(i[0],i[1],i[2]):4==r?h=new a(i[0],i[1],i[2],i[3]):5==r&&(h=new a(i[0],i[1],i[2],i[3],i[4])),h.ObjectPoolKey=e,h},t.popWithExtraKey=function(e,i){t._content[e]||(t._content[e]=[]);var s,n=t._content[e];if(n.length)for(var o=0;o<n.length;o++)if(n[o].extraKey==i){s=n[o],n.splice(o,1);break}if(!s){null==window[e]&&console.log(e,"ç±»åâ€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦");var a=egret.getDefinitionByName(e);s=new a(i),s.extraKey=i,s.ObjectPoolKey=e}return s},t.push=function(e){if(null==e)return!1;var i=e.ObjectPoolKey;return!t._content[i]||t._content[i].indexOf(e)>-1?!1:(t._content[i].push(e),!0)},t.clear=function(){t._content={}},t.clearClass=function(e,i){void 0===i&&(i=null);for(var s=t._content[e];s&&s.length;){var n=s.pop();i&&n[i](),n=null}t._content[e]=null,delete t._content[e]},t.dealFunc=function(e,i){var s=t._content[e];if(null!=s){var n=0,o=s.length;for(n;o>n;n++)s[n][i]()}},t._content={},t}();__reflect(ObjPool.prototype,"ObjPool");var TabBarItemRender=function(t){function e(){var e=t.call(this)||this;return e.isShowLock=!1,e.lockBg=new eui.Image,e.lockBg.x=5,e.lockBg.source="tablockBg",e.lockBg.visible=!1,e.addChild(e.lockBg),e.lockPic=new eui.Image,e.lockPic.source="tablockPic",e.lockPic.visible=!1,e.lockPic.x=32,e.addChild(e.lockPic),e}return __extends(e,t),e.prototype.checkOP=function(t){1==t?(this.lockBg.visible=!1,this.lockPic.visible=!1,this.isShowLock=!1):(this.lockBg.visible=!0,this.lockPic.visible=!0,this.isShowLock=!0)},e}(ItemRenderBase);__reflect(TabBarItemRender.prototype,"TabBarItemRender");var ConfigTogerherHitBase=function(){function t(){}return t}();__reflect(ConfigTogerherHitBase.prototype,"ConfigTogerherHitBase");var ConfigExRingExtendAttr=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.summonerSkillId=0,e.summonerAiId=0,e}return __extends(e,t),e}(ConfigExRingAttr);__reflect(ConfigExRingExtendAttr.prototype,"ConfigExRingExtendAttr");var GameloadMgr=function(t){function e(){var e=t.call(this)||this;return e.preload_load_count=0,e.map_load_count=0,e.configNum=-1,e._configMaxNum=7,e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.load=function(){this.complete()},Object.defineProperty(e.prototype,"configMaxNum",{get:function(){return this._configMaxNum},enumerable:!0,configurable:!0}),e.prototype.complete=function(){HttpProperty.setLoadProgress(50,"(Äang Ä‘Äƒng nháº­p vÃ o game)"),null!=HttpProperty.openID&&null==window.HttpPropertyload&&(RoleMgr.ins().connectServer(),console.log("YÃªu cáº§u Ä‘Äƒng nháº­p"))},e.prototype.loadConfig=function(){this.loadResTime=egret.getTimer(),ReportMessage.GetInstance().sendReport(ReportMessage.get_game_config),ResourceUtils.ins().loadGroup("delayPreload",this.configComplete_a94,this.progress_a94,this)},e.prototype.loadPrepareResAsync=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return this.loadResTime=egret.getTimer(),ReportMessage.GetInstance().sendReport(ReportMessage.get_game_config),[4,ResourceUtils.ins().loadGroupAsync("delayPreload",this.progress_a94,this)];case 1:return t.sent(),[2]}})})},e.prototype.configComplete_a94=function(){var t=this;HttpProperty.setLoadProgress(100,"Äang giáº£i nÃ©n cáº¥u hÃ¬nh, quÃ¡ trÃ¬nh nÃ y khÃ´ng phÃ¡t sinh lÆ°u lÆ°á»£ng"),ReportMessage.GetInstance().sendReport(ReportMessage.get_game_config_end),console.log("ÄÃ£ táº£i xong tÃ i nguyÃªn, báº¯t Ä‘áº§u táº£i cáº¥u hÃ¬nh báº£n Ä‘á»“ "+egret.getTimer());var e=ResDirMgr.MAP_DIR+"maps.json"+ResOtherData.GetInstance().getVerText("resource/scene/maps.json");RES.getResByUrl(e,function(e){if(console.log("ÄÃ£ táº£i xong cáº¥u hÃ¬nh báº£n Ä‘á»“"),t.map_load_count+=1,Assert(e,"maps.json táº£i dá»¯ liá»‡u báº£n Ä‘á»“ tháº¥t báº¡i!! Sá»‘ láº§n táº£i: "+t.map_load_count))return void(t.map_load_count<3?t.complete():alert("Táº£i báº£n Ä‘á»“ tháº¥t báº¡i, vui lÃ²ng kiá»ƒm tra máº¡ng vÃ  Ä‘Äƒng nháº­p láº¡i"));Assert(1==t.map_load_count,"maps.json táº£i láº¡i thÃ nh cÃ´ng. Sá»‘ láº§n táº£i: "+t.map_load_count);for(var i in GameSystem)GameSystem[i]();GameMap.init(e),eui.Label.default_fontFamily="Microsoft YaHei",RoleMainAI.ins().init(),t.doPerLoadComplete()},this,RES.ResourceItem.TYPE_JSON)},e.prototype.progress_a94=function(t,e){var i=50+t/e*20;HttpProperty.setLoadProgress(i,"(Äang táº£i tÃ i nguyÃªn cáº§n thiáº¿t cá»§a game)")},e.prototype.progress2_a94=function(t,e){var i=100;HttpProperty.setLoadProgress2(i,"(Äang táº£i file cáº¥u hÃ¬nh game("+(this.configNum+1)+"/"+this._configMaxNum+"))",this.configNum+1)},e.prototype.postPerLoadProgress=function(t,e){return[t,e]},e.prototype.doPerLoadComplete=function(){this.postPerLoadComplete()},e.prototype.postPerLoadComplete=function(){},e.prototype.postLoginInit=function(){},e.prototype.postZeroInit=function(){},e
}(ClassBase);__reflect(GameloadMgr.prototype,"GameloadMgr"),MessageCenter.compile(GameloadMgr);var AIHelpUtil=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.ins=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return t.ins.call(this,e)},e.prototype.aiUserSkill=function(t,e,i,s){return void 0===s&&(s=null),t!=e&&(t.dir=DirUtil.get8DirBy2Point(t,e)),i?(GameLogicManage.ins().playSkillEff(i,t,[e],s),!SoundUtil.WINDOW_OPEN&&i.sound&&t.team==Team.My&&SoundUtil.ins().playEffectMC(i.sound),!0):!1},e.prototype.playHram=function(t,e,i,s){void 0===s&&(s=0),e.hram(s),GameLogicManage.ins().postEntityHpChange(e,t,i,s),e.getHP()<=0&&this.palyRelive(e)},e.prototype.palyRelive=function(t){if(t instanceof CustomActorRole&&!t.hasBuff(52001)){var e=t.infoModel.attributeExData[ExAttrType.eatGodBlessProbability],i=Math.random();if(e/1e4>i)return t.reset(),t.removeAllBuff(),i=t.infoModel.getAtt(AttributeType.atMaxHp)*t.infoModel.attributeExData[ExAttrType.eatGodBlessRate]/1e4,t.hram(i),!0}return!1},e.playDead=function(t,e){void 0===e&&(e=null),t.AI_STATE=AI_State.Die;var i=EntityMgr.ins();i.removeByHandle(t.infoModel.handle,!1,GameMap.fbType==UserFb.FB_TYPE_EXP),TimerMgr.ins().doTimer(5e3,1,function(){DisplayUtils.removeFromParent(t),e&&e()},this)},e}(ClassBase);__reflect(AIHelpUtil.prototype,"AIHelpUtil");var CustomerSkillAiLogic=function(t){function e(){var e=t.call(this)||this;return e.ZL_SKILL_DEVIL=0,e.ZL_SKILL_EXPLOSION=1,e.ZL_SKILL_KILL=2,e.ZL_SKILL_SACRIFICE=3,e.ZL_SKILL_RELIEF=4,e.ZL_SKILL_ANGER=5,e.ZL_H_SKILL_DETER=6,e.ZL_H_SKILL_ANTICIPATI=7,e.ZL_SKILL_REMEDY=8,e.ZL_SKILL_RENJIA=9,e.MAX=10,e.triggerInterval={},e}return __extends(e,t),e.ins=function(){return t.ins.call(this)},e.prototype.checkWarSpiritBubbleTrigger=function(){if(ZhanLingModel.ins().CheckZhanLingOpen())for(var t in GlobalConfig.ZhanLingBase){var e=GlobalConfig.ZhanLingBase[t],i=ZhanLingModel.ins().getZhanLingDataById(e.id);if(i)switch(e.talent){case this.ZL_SKILL_DEVIL:if(!GlobalConfig.ZhanLingLevel[e.id][i.level])break;var s=GlobalConfig.ZhanLingLevel[e.id][i.level].talentLevel,n=GlobalConfig.ZhanLingTalent[e.talent][s];if(n&&GameLogicManage.triggerValue(n.rate)){UserSkill.ins().postShowSkillWord(n.showWords);for(var o=0;o<SubRoles.ins().subRolesLen;o++){var a=EntityMgr.ins().getMainRole(o);if(a){var r=EntityBuff.createBuff(n.effId,a);a.addBuff(r)}}}break;case this.ZL_SKILL_REMEDY:if(s=ZhanLingModel.ins().getZhanLingInfoByTalentLv(e.id),n=GlobalConfig.ZhanLingTalent[e.talent][s],GameLogicManage.triggerValue(n.rate))for(var o=0;o<SubRoles.ins().subRolesLen;o++){var a=EntityMgr.ins().getMainRole(o);if(a){var r=EntityBuff.createBuff(n.effId,a);a.addBuff(r)}}}}},e.prototype.checkSFTrigger=function(t,e){if(ZhanLingModel.ins().CheckZhanLingOpen()){if(!t||!e[0])return;var i=(t.getHP(),t.infoModel.getAtt(AttributeType.atMaxHp),t.infoModel.team==Team.My&&t instanceof CustomActorRole);for(var s in GlobalConfig.ZhanLingBase){var n=GlobalConfig.ZhanLingBase[s],o=ZhanLingModel.ins().getZhanLingDataById(n.id);if(o)switch(n.talent){case this.ZL_H_SKILL_DETER:if(i){var a=ZhanLingModel.ins().getZhanLingInfoByTalentLv(n.id),r=GlobalConfig.ZhanLingTalent[n.talent][a];if(!r)break;for(var h=0;h<SubRoles.ins().subRolesLen;h++){var l=EntityMgr.ins().getMainRole(h);if(l)for(var c=function(e){if(!e.type||e.type==l.infoModel.job){var i=new SkillData(e.id);u.intervalDoFun(t.infoModel.handle+e.id+n.talent,i.cd,function(){RoleMainAI.ins().tryFaBaoSpiritSkill(t,e.id,!0)})}},u=this,p=0,d=r.passive;p<d.length;p++){var g=d[p];c(g)}}}break;case this.ZL_H_SKILL_ANTICIPATI:var f=GlobalConfig.ZhanLingTalent[n.talent][1];GameLogicManage.triggerValue(f.rate)}}}},e.prototype.checkDieTrigger=function(t,e){if(ZhanLingModel.ins().CheckZhanLingOpen()){if(!t||!e[0])return;var i=(t.getHP(),t.infoModel.getAtt(AttributeType.atMaxHp),t.infoModel.team==Team.My&&t instanceof CustomActorRole);for(var s in GlobalConfig.ZhanLingBase){var n=GlobalConfig.ZhanLingBase[s],o=ZhanLingModel.ins().getZhanLingDataById(n.id);if(o){var a=ZhanLingModel.ins().getZhanLingInfoByTalentLv(n.id),r=GlobalConfig.ZhanLingTalent[n.talent][a];if(r)switch(n.talent){case this.ZL_SKILL_KILL:if(i)for(var h=0;h<SubRoles.ins().subRolesLen;h++){var l=EntityMgr.ins().getMainRole(h);if(l&&l.infoModel.handle!=t.infoModel.handle)for(var c=function(e){if(!e.type||e.type==l.infoModel.job){var i=new SkillData(e.id);u.intervalDoFun(t.infoModel.handle+e.id+n.id,i.cd,function(){RoleMainAI.ins().tryFaBaoSpiritSkill(t,e.id,!0)})}},u=this,p=0,d=r.passive;p<d.length;p++){var g=d[p];c(g)}}break;case this.ZL_SKILL_EXPLOSION:if(!i&&e[0]&&e[0].infoModel.team==Team.My)for(var f=0,v=r.passive;f<v.length;f++){var g=v[f];if(!g.type||e[0].infoModel.job==g.type)for(var h=(new SkillData(g.id),0);h<SubRoles.ins().subRolesLen;h++){var l=EntityMgr.ins().getMainRole(h);if(!l||l.infoModel.handle==e[0].infoModel.handle)break;var y=new SkillData(g.id);if(y.tarEff&&y.tarEff.length>0)for(var m=0,_=y.tarEff;m<_.length;m++){var T=_[m],b=EntityBuff.createBuff(T,l);l.addBuff(b)}}}break;case this.ZL_SKILL_SACRIFICE:if(!i&&e[0]&&e[0].infoModel.team==Team.My&&e[0].infoModel.job==JobConst.YuXiao)for(var C=function(e){if(!e.type||e.type==t.infoModel.job){var i=new SkillData(e.id);I.intervalDoFun(t.infoModel.handle+e.id+n.id,i.cd,function(){RoleMainAI.ins().tryFaBaoSpiritSkill(t,e.id,!0)})}},I=this,S=0,w=r.passive;S<w.length;S++){var g=w[S];C(g)}break;case this.ZL_SKILL_ANGER:if(!i&&e[0]&&e[0].infoModel.team==Team.My&&e[0].infoModel.job==JobConst.LuoYing)for(var B=function(e){if(!e.type||e.type==t.infoModel.job){var i=new SkillData(e.id);R.intervalDoFun(t.infoModel.handle+e.id+n.id,i.cd,function(){RoleMainAI.ins().tryFaBaoSpiritSkill(t,e.id,!0)})}},R=this,M=0,x=r.passive;M<x.length;M++){var g=x[M];B(g)}}}}}},e.prototype.checkHPTrigger=function(t,e){if(ZhanLingModel.ins().CheckZhanLingOpen()){if(!t||!e)return;var i=t.getHP(),s=t.infoModel.getAtt(AttributeType.atMaxHp),n=t.infoModel.team==Team.My&&t instanceof CustomActorRole,o=function(e){var o=GlobalConfig.ZhanLingBase[e],r=ZhanLingModel.ins().getZhanLingDataById(o.id);if(!r)return"continue";switch(o.talent){case a.ZL_SKILL_RELIEF:break;case a.ZL_SKILL_RENJIA:if(n){var h=0,l=ZhanLingModel.ins().getZhanLingDataBySkill(h),c=ZhanLingModel.ins().getZhanLingDataById(h),u=0;for(var p in l)c.level>=l[p].open&&(1==l[p].id?u=GlobalConfig.ZhanLingSkill[l[p].id].passive:4==l[p].id&&(u=GlobalConfig.ZhanLingSkill[l[p].id].passivePlus));if(u>0){var d=new SkillData(u);i/s<d.config.passive.p1/1e4&&a.intervalDoFun(t.infoModel.handle+u+h,d.cd,function(){RoleMainAI.ins().tryFaBaoSpiritSkill(t,u,!0)})}}}},a=this;for(var r in GlobalConfig.ZhanLingBase)o(r)}},e.prototype.intervalDoFun=function(t,e,i){void 0==this.triggerInterval[t]&&(this.triggerInterval[t]=egret.getTimer()),egret.getTimer()-this.triggerInterval[t]>=0&&i(),this.triggerInterval[t]=egret.getTimer()+e},e}(ClassBase);__reflect(CustomerSkillAiLogic.prototype,"CustomerSkillAiLogic");var RoleMainAI=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.isAIStop=!1,e.aiList={},e.zhanlingTime=0,e.zhanlingdelayTime=0,e.isFindDrop=!1,e.isJumpEndToGoGate=!1,e.isCanStartByWXGame=!1,e.isCanPlaySkillEffByWXGame=!1,e.nowTime=0,e.isLog=!1,e}return __extends(e,t),e.ins=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return t.ins.call(this,e)},e.prototype.init=function(){this.stopAi(),this.skillCD={},this.attrCD={},this.attrValue={},this.inited=!0},e.prototype.startAi=function(){(0!=HttpProperty.isWeb()||0!=this.isCanStartByWXGame)&&(this.isAIStop=!1,this.isStartAtk=!1,GameLogicManage.ins().postHookStateChange(GameLogicManage.HOOK_STATE_FIND_ENMENY),this.teamAction={},this.starting||(this.inited||this.init(),this.addAITimer()))},e.prototype.stopAi=function(){this.isAIStop=!0,this.inited&&this.stopAITimer(),this.skillCD={};for(var t in this.curSkill)this.curSkill[t]&&ObjPool.push(this.curSkill[t]);this.curSkill={},this.curTarget={},this.lastTarget={},this.skillCastType={},this.skillTargetType={},this.hashHpObj={},this.attrCD={},this.attrValue={}},e.prototype.clearTarget=function(t){if(t&&t.infoModel){var e=t.infoModel.handle;delete this.skillCD[e];var i=this.curSkill[e];i&&ObjPool.push(i),delete this.curSkill[e],delete this.curTarget[e],delete this.lastTarget[e],delete this.skillCastType[e],delete this.skillTargetType[e];for(var s in this.curTarget)this.curTarget[s]==t&&delete this.curTarget[s];for(var s in this.lastTarget)s+""==e+""&&delete this.lastTarget[s]}},e.prototype.clearAIList=function(){this.aiList={}},e.prototype.clear=function(){this.stopAi(),this.clearAIList(),this.isFindDrop=!1,TimerMgr.ins().removeAll(this)},e.prototype.destruct=function(){this.skillCD={},this.stopAi()},Object.defineProperty(e.prototype,"starting",{get:function(){return TimerMgr.ins().isExists(this.startAI,this)},enumerable:!0,configurable:!0}),e.prototype.canAddToAi=function(){return GameMap.sceneInMain()?!0:!1},e.prototype.add=function(t){this.aiList[t.infoModel.handle]=t},e.prototype.remove=function(t){delete this.aiList[t.infoModel.handle]},e.prototype.getAIList=function(){return this.aiList},e.prototype.startAI=function(){var t=this.aiList,i=["0","Ngá»± TiÃªu","Láº¡c Anh","TrÆ°á»ng Ca"],s=EntityMgr.ins().getNoDieRole(),n=0;for(var o in t){var a=t[o],r=void 0,h=a instanceof CustomActorRole,l=a.infoModel.handle,c=(h?i[a.infoModel.job]:"",a.buffList),u=!1;for(var p in c){if(a.AI_STATE==AI_State.Die)break;var d=c[p];if((d.effConfig.type==SkillEffectType.AddBlood||d.effConfig.type==SkillEffectType.AdditionalDamage)&&d.isExecute()){d.step++;var g=this.hramedDie(a,d.value);g&&(a.AI_STATE=AI_State.Die),this.showHram(g,HarmTypes.HIT,a,d.source,d.value,"SÃ¡t thÆ°Æ¡ng buff"+d.effConfig.id),d.step>=d.count&&a.removeBuff(d)}d.canRemove()?a.removeBuff(d):d.isCanotHit()&&(u=!0,a.AI_STATE=AI_State.Stand,a.playAction(ModuleAction.STAND))}if(!u)if(a.AI_STATE!=AI_State.Die)if(a.isHardStraight)a.isHardStraightNum+=1,a.isHardStraightNum>=20&&a.removeHardStraight();else{if(a.infoModel.team==Team.My&&UserSkill.ins().hejiLevel>0&&UserSkill.ins().hejiEnable&&a.infoModel instanceof Role){if(s&&a.infoModel.handle==s.infoModel.handle){r=this.curTarget[l];var f=UserSkill.ins().getHejiSkillId();if(UserSkill.ins().fieldUse&&0!=f.id&&r&&r.team!=Team.My&&r.AI_STATE!=AI_State.Die){var v=EntityMgr.ins().screeningTargetByPos(a,!1,f.affectCount,f.castRange,this.aiList);if(v.length){this.aiUseSkill(a,r,f),CustomerSkillAiLogic.ins().checkSFTrigger(a,[r]),UserSkill.ins().fieldUse=!1;var y=GlobalConfig.ConfigEffects[f.selfEff[0]]?GlobalConfig.ConfigEffects[f.selfEff[0]]:null;if(y)for(var m=SubRoles.ins().subRolesLen,_=0;m>_;_++){var T=EntityMgr.ins().getMainRole(_);if(T){var d=ObjPool.pop("EntityBuff");d.effConfig=y,d.addTime=egret.getTimer(),d.endTime=d.addTime+y.duration,d.count=y.duration/y.interval>>0,d.step=0,d.source=T,T.addBuff(d),T.stopMove(),T.AI_STATE=AI_State.Stand,T.playAction(ModuleAction.STAND)}}continue}}}}else if(a.infoModel.team==Team.WillEntity&&HejitoUseMgr.ins().canUse()){r=this.curTarget[l];var b=HejitoUseMgr.ins().getMaster();if(r&&r.team==Team.My&&b==a){var f=HejitoUseMgr.ins().getSkillData();if(f&&r.AI_STATE!=AI_State.Die){var v=EntityMgr.ins().screeningTargetByPos(a,!1,f.affectCount,f.castRange,this.aiList);if(v.length){this.aiUseSkill(a,r,f),HejitoUseMgr.ins().useSuccess();var y=GlobalConfig.ConfigEffects[f.selfEff[0]]?GlobalConfig.ConfigEffects[f.selfEff[0]]:null;if(y)for(var C=HejitoUseMgr.ins().getRoles(),m=C.length,I=0;m>I;I++){var T=EntityMgr.ins().getEntityByHandle(C[I].handle);if(T){var d=ObjPool.pop("EntityBuff");d.effConfig=y,d.addTime=egret.getTimer(),d.endTime=d.addTime+y.duration,d.count=y.duration/y.interval>>0,d.step=0,d.source=T,T.addBuff(d),T.stopMove(),T.AI_STATE=AI_State.Stand,T.playAction(ModuleAction.STAND)}}continue}}}}if(t[l]){var S=Math.floor(a.getSkillBodyPlayTime());if(h){if(1==GlobalFun.isOpenBacklash()){if(a.publicCD&&egret.getTimer()-a.publicCD<=400)continue}else if(a.publicCD&&egret.getTimer()-a.publicCD<=S)continue}else if(1==GlobalFun.isOpenBacklash()){if(a.publicCD&&egret.getTimer()-a.publicCD<=400)continue}else if(a.publicCD&&egret.getTimer()-a.publicCD<=S)continue;if(!e.ins().isFindDrop||a.team!=Team.My||!s||a.infoModel.handle!=s.infoModel.handle)switch(a.AI_STATE){case AI_State.Stand:this.screeningSkill(l);var w=!1,B=!1;if(this.curSkill[l]||(w=!0),!w&&this.checkCanScreeningTarget(a,this.curSkill[l],this.curTarget[l])&&(a.team==Team.WillEntity?this.selectTarget(a,9):this.selectTarget(a)),a.team==Team.My&&a!=s&&s&&MathUtils.getDistance(a.x,a.y,s.x,s.y)>570){var R=this.curTarget[s.infoModel.handle];R&&R.AI_STATE!=AI_State.Die&&this.curSkill[l]&&this.curSkill[l].targetType==TargetType.Enemy&&R.team!=Team.My?this.curTarget[l]=R:B=!0}if(w||B){if(a.team==Team.My&&this.screeningSkill(l),a.team==Team.My&&s&&a.infoModel.handle!=s.infoModel.handle){var M=s;if(a.infoModel.masterHandle){var x=EntityMgr.ins().getEntityByHandle(a.infoModel.masterHandle);x&&(M=x)}var E=EntityMgr.ins().getTeamCount(Team.My),D=[1,-1];2==E&&(D=[0]);var A=DirUtil.getGridByDir(M.dir+D[n]!=null?D[n]:0);n+=1;var k=GameMap.getPatch(a.x,a.y,M.x+A.x,M.y+A.y);k?GameMap.moveEntity(a,M.x+A.x,M.y+A.y):GameMap.moveEntity(a,M.x,M.y)}continue}if(!this.curTarget[l])continue;this.tryUseSkill(a)?a.AI_STATE=AI_State.Atk:(a.team==Team.My||a.team==Team.WillEntity||a.team==Team.Faker||this.teamAction[a.team])&&(GameMap.moveEntity(a,this.curTarget[l].x,this.curTarget[l].y),a.AI_STATE=AI_State.Run);break;case AI_State.Run:if(r=this.curTarget[l],a.team==Team.My&&(UserFb.ins().canChallengGuanQia=!0),!r||r.AI_STATE==AI_State.Die){a.stopMove(),a.playAction(ModuleAction.STAND),a.AI_STATE=AI_State.Stand,delete this.curTarget[l];continue}if(a.team==Team.Faker){var P=EncounterData.ins().wildPersonList[a.infoModel.masterHandle];if(!P)continue;var L=NearbyModel.countKillByMarster(a.infoModel.masterHandle),G=MathUtils.getDistance(a.x,a.y,P.backX,P.backY);if(P&&1==P.actionType&&L>=P.killNum){10>G?(EntityMgr.ins().removeByHandle(a.infoModel.masterHandle),EncounterData.ins().RunAway(a.infoModel.masterHandle),EncounterData.ins().sendCleanFoePeople(P.index)):GameMap.moveEntity(a,P.backX,P.backY);continue}}this.isCanUseCF(a)&&this.playCFEff(a),this.tryUseSkill(a)&&(a.stopMove(),a.AI_STATE=AI_State.Atk),a.action==ModuleAction.STAND&&(a.AI_STATE=AI_State.Stand);break;case AI_State.Atk:if(this.isStartAtk||GameLogicManage.ins().postHookStateChange(GameLogicManage.HOOK_STATE_HOOK),this.isStartAtk=!0,r=this.curTarget[l],!r||r.AI_STATE==AI_State.Die){a.AI_STATE=AI_State.Stand,delete this.curTarget[l];continue}if(this.teamAction[r.team]=!0,a.atking)continue;var f=this.curSkill[l];if(!f)continue;this.skillCD[l][f.id]=egret.getTimer(),this.skillCastType[l]=f.castType,this.skillTargetType[l]=f.targetType,a.atking=!0,a.team==Team.My&&(UserFb.ins().canChallengGuanQia=!1),a.publicCD=egret.getTimer(),GameLogicManage.skyBallCheck(a),this.aiUseSkill(a,r,f),delete this.curSkill[l];break;case AI_State.Patrol:var U=a.infoModel.configID,y=UserFb.ins().guanqiaMonster[U];a.infoModel.isWander&&y.attrange?(this.selectTarget(a,y.attrange),this.curTarget[a.infoModel.handle]?a.AI_STATE=AI_State.Stand:a.startPatrol()):a.startPatrol()}}}else a.dieTime>2e3?a.team==Team.Monster&&this.showHram(!0,HarmTypes.BLANK,a,null,0):a.dieTime+=e.AI_UPDATE_TIME}},e.prototype.getCanKillMonster=function(){var t,e=this.aiList;for(var i in e)if(0==e[i].isMy&&e[i].AI_STATE!=AI_State.Die){t=e[i];break}return t},e.prototype.chrackHaveShenshou=function(t,e){var i=this.getAIList(),s=(EntityMgr.ins().getNoDieRole(),!1);for(var n in i){var o=i[n];if(t==o.infoModel.masterHandle&&o.infoModel.configID==e){s=!0;break}}return s},e.prototype.checkShowFabao=function(){if(this.zhanlingTime=egret.getTimer(),GameMap.sceneInMain()){var t=ZhanLingModel.ins().ZhanLingSkinId;if(ZhanLingModel.ins().getZhanLingDataById(0)){var e=EntityMgr.ins().getNoDieRole();if(e){var i=ZhanLingModel.ins().getZhanLingDataById(0).level;e.showZhanling(t,i),CustomerSkillAiLogic.ins().checkWarSpiritBubbleTrigger()}}}},e.prototype.checkCanScreeningTarget=function(t,e,i){if(!i||!i.parent||i.AI_STATE==AI_State.Die)return!0;var s=t.infoModel.handle;return void 0==this.skillCastType[s]&&void 0==this.skillTargetType[s]?!0:this.skillCastType[s]!=e.castType||this.skillTargetType[s]!=e.targetType?!0:!1},e.prototype.getTargetMonsterPoint=function(t,e){if(t.x==e.x)return e;var i=(e.y-t.y)/(e.x-t.x),s=e.x,n=e.y,o=60,a=20;return Math.abs(i)<=1?(0>i?n+=Math.floor(o*Math.random()):n-=Math.floor(o*Math.random()),s+=Math.floor(a*Math.random())):(0>i?s+=Math.floor(o*Math.random()):s-=Math.floor(o*Math.random()),n+=Math.floor(a*Math.random())),{x:s,y:n}},e.prototype.aiUseSkill=function(t,e,i){var s,n,o,a,r=this,h=(i.tarEff?GlobalConfig.ConfigEffects[i.tarEff[0]]:null,i.selfEff?GlobalConfig.ConfigEffects[i.selfEff[0]]:null),l=i.castType==castType.Self?t:e,c=0,u=!1,p=t.infoModel;t.team==Team.My&&(n=ArtifactSystem.ins().getReviseByImbaSkill_a94(i.id),n&&(c=n.crit),a=GweaponCC.ins().getReviseBySkill(i.id),a&&(o=a[0]),o&&(c=o.crit));var d=i.affectCount;if(n&&n.affectCount&&(d+=n.affectCount),o&&o.affectCount&&(d+=o.affectCount),i.castType==castType.SelfHpLess){s=EntityMgr.ins().screeningTargetByPos(t,!0,0,Number.MAX_VALUE,this.aiList);for(var g=0;g<s.length;g++)if(s[g].isCanAddBlood){s[0]=s[g];break}}else s=i.castType!=castType.Other&&i.targetType==TargetType.Enemy?EntityMgr.ins().screeningTargetByPos(l,!1,d,i.affectRange,this.aiList):d>1?EntityMgr.ins().screeningTargetByPos(l,l.team==e.team,d,i.affectRange,this.aiList):[e],0==s.length&&(s=[e]);i.preId&&GlobalConfig.FlameStamp.skillId.indexOf(i.preId)>=0&&(u=!0);for(var f=!1,v=s.length=Math.min(s.length,d),y=[],m=0;v>m;m++){var _=s[m],T=_.infoModel,b=!1,C=0==m;if(_.team!=t.team){var I=void 0;(GameLogicManage.triggerAttr(t,AttributeType.atStunPower)||90005==i.id)&&(I=ObjPool.pop("EntityBuff"),I.effConfig=GlobalConfig.ConfigEffects[51001],I.value=p.getAtt(AttributeType.atStunTime),I.addTime=egret.getTimer(),I.endTime=I.addTime+I.value,_.addBuff(I),_.stopMove(),_.AI_STATE=AI_State.Stand),GameLogicManage.triggerExAttr(t,ExAttrType.eatDeathCurseProbability)&&(I=ObjPool.pop("EntityBuff"),I.effConfig=GlobalConfig.ConfigEffects[52001],I.addTime=egret.getTimer(),I.endTime=I.effConfig.args.d?p.attributeExData[ExAttrType.eatDeathCurseTime]:I.effConfig.duration,_.addBuff(I),t.addPaoPao(3),b=!0),GameLogicManage.triggerExAttr(t,ExAttrType.eatAttackAddHpProbability)}var S=UserSkill.ins().isHejiSkill(i.configID),w=!1,B=!1,R=!1,M=!1,x=!1,E=!1,D=!1,A=void 0,k=void 0,P=0;if(3!=i.calcType&&(M=GameLogicManage.triggerMiss(t,_)),M)P=0;else{if(P=this.damageBaseCalculation(t,_,i),3!=i.calcType){R=GameLogicManage.triggerExAttr(t,ExAttrType.eatMultipleCrit),R&&(P*=p.getExAtt(ExAttrType.eatMultipleCritCoeff)/1e4,P+=p.getExAtt(ExAttrType.atMultipleCritHurt),t.addPaoPao(21)),w=GameLogicManage.triggerCrit(t,_,c);var L=t.hasBuff(SkillConst.EFF_SKY_BALL);L&&(t.addPaoPao(6),w=!0);var G=0,U=1;if(w){f=!0;var F=p.getAtt(AttributeType.atCritEnhance);o&&o.critDamage&&(F+=o.critDamage);var N=p.getExAtt(ExAttrType.eatCritHpLt);T.getAtt(AttributeType.atHp)/T.getAtt(AttributeType.atMaxHp)<=N/1e4&&(F+=p.getExAtt(ExAttrType.eatCritHpLtAddDamage)),U+=F/1e4,G+=p.getAtt(AttributeType.atCritHurt)}var O={};O[AttributeType.atDeadLyPro]=GameLogicManage.calculateRealAttribute(t,AttributeType.atDeadLyPro,t),D=GameLogicManage.triggerAttr(t,AttributeType.atDeadLyPro,O),D&&(U+=.5+(p.getAtt(AttributeType.atDeadLyMaster)-T.getAtt(AttributeType.atDeadLyResist))/1e4),O={},O[AttributeType.atHunGuPro]=GameLogicManage.calculateRealAttribute(t,AttributeType.atHunGuPro,t),A=this.tryTriggerHungu(t),A&&(U+=p.getAtt(AttributeType.atHunGuHurt)/1e4),k=this.tryTriggerHeart(t),k&&(U+=p.getAtt(AttributeType.atHearthHurt)/1e4,G+=p.getAtt(AttributeType.atHearthDamege)),P=P*U+G,b&&(P*=1+p.attributeExData[ExAttrType.eatDeathCurseDamageIncrease]/1e4),C||i.targetType!=TargetType.Enemy||(P*=T.type==EntityType.Role?i.herdPlayerRate/100:i.herdMonRate/100),t.isMy&&p.type==EntityType.Role&&e.infoModel.type==EntityType.Role&&(EncounterData.ins().isEncounter()?NearbyFight.ins().getIsWeiWang(t.isMy)&&(x=!0):MineToFight.ins().isFighting&&MineToFight.ins().getIsWeiShe(t.isMy)&&(x=!0)),P=this.subtractBuff(t,_,P),P+=p.getAtt(AttributeType.atHolyDamege)*(1+p.getAtt(AttributeType.atHolyMaster)/1e4-T.getAtt(AttributeType.atHolyResist)/1e4),E=GameLogicManage.triggerAttr(t,AttributeType.atZhuiMingPro),E&&(P+=p.getAtt(AttributeType.atZhuiMingVal)),P*=1-p.getAtt(AttributeType.neigongAbsorbHurt)/1e4}P>>=0,t.team==_.team&&P>0&&(P=0)}_ instanceof CustomActorRole||_.AI_STATE==AI_State.Patrol&&(_.stopMove(),_.playAction(ModuleAction.STAND),_.AI_STATE=AI_State.Stand);var W=this.hramedDie(_,P);W&&(_.AI_STATE=AI_State.Die,CustomerSkillAiLogic.ins().checkDieTrigger(t,[_]));var H=0;if(t.team==Team.My&&(S?H=HarmTypes.Heji:M?H=HarmTypes.Dodge:(B&&(H|=HarmTypes.Lucky),w&&(H|=HarmTypes.CRIT)),x&&(H|=HarmTypes.Deter),E&&(H|=HarmTypes.ZhuiMing),D&&(H|=HarmTypes.ZhiMing)),t.team!=_.team&&5==i.calcType){for(var V=P/5>>0,q=V*MathUtils.limit(0,.05)>>0,j=V*MathUtils.limit(0,.05)>>0,Y=[V-q,V+q,V-j,V+j,P-4*V],Z=[],K=0;K<Y.length;K++)Z.push({isDie:W,damageType:HarmTypes.Fujia,ttarget:_,hramValue:Y[K]});y.push(Z)}else if(y.push([{isDie:W,damageType:H,ttarget:_,hramValue:P}]),t.team!=_.team&&GameLogicManage.triggerAttr(t,AttributeType.atAttPerDamPan)){W=this.hramedDie(_,P>>1),t.addPaoPao(20);var z=y[y.length-1];z.push({isDie:W,damageType:HarmTypes.Fujia,ttarget:_,hramValue:P>>1})}_.myKill=_.myKill||t.isMy,(t.isMy||t.team==Team.WillEntity)&&(_.showBlood(!0),_.showName(!0)),_.isMy&&(t.showBlood(!0),t.showName(!0))}var J=GameMap.fbType,X=GameMap.fubenID,Q=0;GameLogicManage.ins().playSkillEff(i,t,s,function(c){if(GameMap.fbType==J&&X==GameMap.fubenID){var p=0;for(var d in s){var g=s[d],f=(g.infoModel,y[d][y[d].length-1].isDie);l==g&&(p=y[d][0].damageType);for(var v=0,m=0;m<y[d].length;m++){var _=y[d][m];v+=_.hramValue,r.showHram(_.isDie,_.damageType,g,t,_.hramValue,i.name)}if(t.team==Team.My&&g.team==Team.WillEntity&&NearbyFight.ins().willEntityFightTeam!=Team.My){NearbyFight.ins().willEntityFightTeam=Team.My;for(var T=EntityMgr.ins().getEntityByTeam(Team.WillEntity),b=0,C=T;b<C.length;b++){var I=C[b];r.curTarget[I.infoModel.handle]=null,r.lastTarget[I.infoModel.handle]=null}}if(g.shakeIt(),!f){var S=i.tarEff;l!=g&&g.infoModel.type==EntityType.Role&&(S=i.otarEff||S);for(var w=0;S&&w<S.length;w++){var B=r.getArgs(S[w],n,o),R=EntityBuff.createBuff(S[w],t,B);g.addBuff(R)}n&&r.addTargetReviseEffect(g,t,n),o&&r.addTargetReviseEffect(g,t,o),a&&a[1]&&r.addTargetReviseEffect(g,t,a[1]),g instanceof CustomActorRole&&r.tryWingSkill(g,i,!0),r.tryPassiveSkill(t,g,!0,y[d][0].damageType),r.tryUseWeaponSkill(g,i,!0),r.tryTriggerMijiBuqu(g)}r.showBuffHarm(t,g,i,v)}if(h)for(var w=0;i.selfEff&&w<i.selfEff.length;w++){var B=r.getArgs(i.selfEff[w],n,o),R=EntityBuff.createBuff(i.selfEff[w],t,B);t.addBuff(R)}if(n&&r.addSelfReviseEffect(t,n),o&&r.addSelfReviseEffect(t,o),a&&a[1]&&r.addSelfReviseEffect(t,a[1]),t instanceof CustomActorRole&&r.tryWingSkill(t,i,!1),r.tryPassiveSkill(t,l,!1,p),r.tryTriggerHeirloomSkill(t,s,y),u&&r.tryUseYlPassiveSkill(t,l,i),80002==i.configID&&r.petTryUsePassiveSkill(t,!1),i.otherSkills){var M=i.otherSkills.concat(),x=new SkillData(M[Q]);return x.preId=i.configID,r.aiUseSkill(t,e,x),void(Q+=1)}}}),!SoundUtil.WINDOW_OPEN&&i.sound&&t.team==Team.My&&SoundUtil.ins().playEffectMC(i.sound),t.AI_STATE=AI_State.Stand,t.atking=!1,f&&p.getExAtt(ExAttrType.eatMiJiZHDamPer)&&this.checkAttr(t,1,ExAttrType.eatMiJiZHTime,1),this.bump(t,e,i)},e.prototype.bump=function(t,e,i){if(i&&i.repelDistance){e.stopMove(),e.playAction(ModuleAction.STAND);var s=e.infoModel.handle;delete this.curTarget[s];var n=MathUtils.getAngle(MathUtils.getRadian2(t.x,t.y,e.x,e.y)),o=MathUtils.getDirMove(n,i.repelDistance);o.x=e.x+o.x,o.y=e.y+o.y;var a=void 0,r=GameMap.point2Grip(o.x),h=GameMap.point2Grip(o.y);a=GameMap.checkWalkable(r,h);var l=i.repelDistance-1;if(0==a)for(l;l>0&&(o=MathUtils.getDirMove(n,l),o.x=e.x+o.x,o.y=e.y+o.y,r=GameMap.point2Grip(o.x),h=GameMap.point2Grip(o.y),a=GameMap.checkWalkable(r,h),1!=a);l--);var c=BresenhamLine.isAbleToThrough(GameMap.point2Grip(e.x),GameMap.point2Grip(e.y),GameMap.point2Grip(o.x),GameMap.point2Grip(o.y));0==c[0]&&(c[1]>3&&debug.error("VÆ°á»£t qua quÃ¡ 3 Ã´, kiá»ƒm tra xem cÃ³ báº¥t thÆ°á»ng khÃ´ng "+c[2]+","+c[3],o),GameMap.point2Grip(e.x)==c[2]&&GameMap.point2Grip(e.y)==c[3]?(o.x=e.x,o.y=e.y):(o.x=GameMap.grip2Point(c[2]),o.y=GameMap.grip2Point(c[3]))),o.x=Math.max(Math.min(o.x,GameMap.MAX_WIDTH),0),o.y=Math.max(Math.min(o.y,GameMap.MAX_HEIGHT),0);var u=o.x-e.x,p=o.y-e.y,d=Math.sqrt(u*u+p*p)/(t.moveSpeed/1e3),g=GlobalConfig.ConfigEffects[i.tarEff[0]].duration;if(e.addHardStraight(g),d>0){var f=egret.Tween.get(e.moveTweenObj);f.to({x:o.x,y:o.y},d)}}},e.prototype.playCFEff=function(t){var e,i,s,n,o,a=this,r=t.infoModel.handle,h=this.curTarget[r],l=UserSkill.ins().cfSkillData,c=t.infoModel.job;switch(c){case 1:o=0,n=2;break;case 2:o=-1,n=0;break;case 3:o=1,n=0}var u=GameMap.point2Grip(h.x),p=GameMap.point2Grip(h.y),d=new egret.Point;u+=o,p+=n,i=GameMap.grip2Point(u),s=GameMap.grip2Point(p);var g=GameMap.checkWalkable(i,s);0==g&&(i=h.x,s=h.y),e={x:i-t.x,y:s-t.y},d.x=i,d.y=s,t.dir=DirUtil.get8DirBy2Point(t,d);var f=Math.sqrt(e.x*e.x+e.y*e.y),v=Math.floor(1e3*f/800);if(v>0){var y=ViewMgr.gamescene.map;y.stopMove(t),t.stopMove(),t.setJump(!0);var m=egret.Tween.get(t.moveTweenObj);m.to({x:i,y:s},v).call(function(){if(t.setJump(!1),t.stopMove(),t.resetStand(),t.stopBodyTailEffect(),t.AI_STATE=AI_State.Stand,1==a.isJumpEndToGoGate){var e=ViewMgr.ins().getView(MainView);e.initGate(),a.isJumpEndToGoGate=!1}}),t.addHardStraight(v),l.configID==SkillTypes.ZS_SKILL_CF&&t.playBodyTailEffect()}},e.prototype.clearSelectTarget=function(t){this.curTarget[t.infoModel.handle]=null,this.lastTarget[t.infoModel.handle]=null},e.prototype.checkAttr=function(t,e,i,s,n){if(void 0===s&&(s=1),void 0===n&&(n=0),Math.random()<s){var o=t.infoModel,a=o.handle,r=this.attrCD[a]=this.attrCD[a]||{},h=e+"_"+i,l=n?n:0==e?o.getAtt(i):o.getExAtt(i),c=r[h]||0,u=egret.getTimer();if(c&&l>u-c)return;r[h]=u;var p=this.attrValue[a]=this.attrValue[a]||{};p[h]=1}},e.prototype.getIsAttr=function(t,e,i,s){void 0===s&&(s=0);var n=t.infoModel,o=this.attrValue[n.handle];if(o){var a=e+"_"+i,r=o[a];return o[a]=s,r}return 0},e.prototype.addSelfReviseEffect=function(t,e){if(e.selfEff)for(var i in e.selfEff){var s=GlobalConfig.ConfigEffects[e.selfEff[i]]?GlobalConfig.ConfigEffects[e.selfEff[i]]:null;if(s){var n=this.getArgs(e.selfEff[i],e,null),o=EntityBuff.createBuff(e.selfEff[i],t,n);t.addBuff(o)}}},e.prototype.addTargetReviseEffect=function(t,e,i){if(i.targetEff)for(var s in i.targetEff){var n=GlobalConfig.ConfigEffects[i.targetEff[s]]?GlobalConfig.ConfigEffects[i.targetEff[s]]:null;if(n){var o=this.getArgs(i.targetEff[s],i,null),a=EntityBuff.createBuff(i.targetEff[s],e,o);t.addBuff(a)}}},e.prototype.tryPassiveSkill=function(t,e,i,s){void 0===i&&(i=!1),void 0===s&&(s=0);var n=i?e:t,o=i?t:e;if(n instanceof CustomActorRole){var a=this.getUseSkillList(n,!1);if(!a||0==a.length)return;for(var r=[],h=0,l=a;h<l.length;h++){var c=l[h],u=c.config.passive;if(!(u.p1&&n.infoModel.getAtt(AttributeType.atHp)/n.infoModel.getAtt(AttributeType.atMaxHp)>u.p1/1e4))switch(u.cond){case 0:i||GameLogicManage.triggerValue(u.rate)&&r.push(c);break;case 1:i&&GameLogicManage.triggerValue(u.rate)&&r.push(c);break;case 2:i||(s&HarmTypes.CRIT)!=HarmTypes.CRIT||GameLogicManage.triggerValue(u.rate)&&r.push(c);break;case 3:i&&(s&HarmTypes.CRIT)==HarmTypes.CRIT&&GameLogicManage.triggerValue(u.rate)&&r.push(c)}}if(!r.length)return;for(var p=0,d=r;p<d.length;p++){var g=d[p],f=void 0;if(g.targetType!=TargetType.Enemy)f=n;else if(o&&o.infoModel.getAtt(AttributeType.atHp)>0)f=o;else{var v=EntityMgr.ins().screeningTargetByPos(n,!1,0,g.affectRange,this.aiList);f=v&&v[0]}if(f){var y=n.infoModel.handle;this.skillCD[y]=this.skillCD[y]||{},this.skillCD[y][g.id]=egret.getTimer(),this.aiUseSkill(n,f,g)}}}},e.prototype.tryFaBaoSpiritSkill=function(t,e,i){var s=ObjPool.pop("SkillData");s.configID=e;var n;if(s.targetType!=TargetType.Enemy)n=t;else{var o=EntityMgr.ins().screeningTargetByPos(t,!1,0,s.affectRange,this.aiList);n=o[0]}if(n){var a=t.infoModel.handle;this.skillCD[a]=this.skillCD[a]||{},this.skillCD[a][s.id]=egret.getTimer(),this.aiUseSkill(t,n,s)}},e.prototype.tryWingSkill=function(t,e,i){var s=this.checkWingEffect(t,e,i);if(s.length)for(var n=0,o=s;n<o.length;n++){var a=o[n],r=ObjPool.pop("SkillData");r.configID=a;var h=void 0;if(r.targetType!=TargetType.Enemy)h=t;else{var l=EntityMgr.ins().screeningTargetByPos(t,!1,0,r.affectRange,this.aiList);h=l[0]}if(h){var c=t.infoModel.handle;this.skillCD[c]=this.skillCD[c]||{},this.skillCD[c][r.id]=egret.getTimer(),this.aiUseSkill(t,h,r)}}},e.prototype.checkWingEffect=function(t,e,i){void 0===i&&(i=!1);var s=t.infoModel.wingSkillData,n=[];if(e.isPassive)return n;for(var o=this.skillCD[t.infoModel.handle],a=0,r=s;a<r.length;a++){var h=r[a],l=ObjPool.pop("SkillData");l.configID=h,o&&o[l.id]&&egret.getTimer()-o[l.id]<l.cd||(0!=l.config.passive.cond||i?1==l.config.passive.cond&&i&&GameLogicManage.triggerValue(l.config.passive.rate)&&n.push(h):GameLogicManage.triggerValue(l.config.passive.rate)&&n.push(h))}return n},e.prototype.tryUseYlPassiveSkill=function(t,e,i){var s=t.infoModel;if(s.lyMarkLv&&s.lyMarkSkills)for(var n=0;n<s.lyMarkSkills.length;n++){var o=s.lyMarkSkills[n]||0;if(o){var a=GlobalConfig.FlameStampEffect[n+1][o];if(a.effId){var r=GlobalConfig.ConfigEffects[a.effId];if(r.probabilityBuff&&GameLogicManage.triggerValue(r.probabilityBuff)){var h=EntityBuff.createBuff(a.effId,t);e.addBuff(h)}}if(a.selfEffId){var r=GlobalConfig.ConfigEffects[a.selfEffId];if(r.probabilityBuff&&GameLogicManage.triggerValue(r.probabilityBuff)){var h=EntityBuff.createBuff(a.selfEffId,t);t.addBuff(h)}}}}},e.prototype.tryTriggerHeirloomSkill=function(t,e,i){var s=null,n=80004,o=6666601,a=-1,r=0,h=t.infoModel.handle;for(var l in e){var c=e[l],u=c.infoModel.handle;if(t.team!=c.team&&(-1==a&&(a=0,(!this.skillCD[h]||!this.skillCD[h][o]||egret.getTimer()-this.skillCD[h][o]>=5e3)&&GameLogicManage.triggerAttr(t,AttributeType.atVamirePro)&&(a=1,this.skillCD[h]=this.skillCD[h]||{},this.skillCD[h][o]=egret.getTimer())),c instanceof CustomActorRole&&!t.hasBuff(n)&&!s&&(!this.skillCD[u]||!this.skillCD[u][n]||egret.getTimer()-this.skillCD[u][n]>=5e3)&&GameLogicManage.triggerAttr(c,AttributeType.atCursePro))){var p=c.infoModel.Skinheirloom.getInfoBySolt(2).lv,d=[80004,80005,80006,80007][p-1];s=ObjPool.pop("EntityBuff"),s.effConfig=GlobalConfig.ConfigEffects[d],s.value=s.effConfig.args.a,s.addTime=egret.getTimer(),s.endTime=s.addTime+s.effConfig.duration,t.addBuff(s),c.addPaoPao(13),this.skillCD[u]=this.skillCD[u]||{},this.skillCD[u][n]=egret.getTimer()}}if(1==a){t.addPaoPao(14);for(var g=0,f=i;g<f.length;g++){var v=f[g];0==r&&(r=Math.floor(t.infoModel.getAtt(AttributeType.atVamirePen)/1e4*v[0].hramValue))}this.hramedDie(t,-r),this.showHram(!1,1,t,t,-r)}},e.prototype.tryUseWeaponSkill=function(t,e,i){if(t.AI_STATE!=AI_State.Die&&!(t.getRealHp()<=0)&&i){var s=GameLogicManage.triggerAttr(t,AttributeType.atBeAttAddHpPro);if(s){t.addPaoPao(16);var n=t.infoModel.getAtt(AttributeType.atBeAttAddHpVal);this.hramedDie(t,-n),this.showHram(!1,1,t,t,-n)}if(t.infoModel.getAtt(AttributeType.atHpLtAddBuff)&&t.infoModel.getAtt(AttributeType.atHp)/t.infoModel.getAtt(AttributeType.atMaxHp)<t.infoModel.getAtt(AttributeType.atHpLtAddBuff)/1e4){var o=this.skillCD[t.infoModel.handle],a=GlobalConfig.ConfigEffects[t.infoModel.getExAtt(ExAttrType.eatHpLtAddBuffId)];if(o&&o[ExAttrType.eatHpLtAddBuffId]&&egret.getTimer()-o[ExAttrType.eatHpLtAddBuffId]<t.infoModel.getExAtt(ExAttrType.eatHpLtAddBuffCd))return;t.addPaoPao(18);var r=ObjPool.pop("EntityBuff");r.effConfig=a,r.value=r.effConfig.args.a,r.addTime=egret.getTimer(),r.endTime=r.addTime+r.effConfig.duration,t.addBuff(r),this.skillCD[t.infoModel.handle]=this.skillCD[t.infoModel.handle]||{},this.skillCD[t.infoModel.handle][ExAttrType.eatHpLtAddBuffId]=egret.getTimer()
}}},e.prototype.tryTriggerMijiBuqu=function(t){var e=t.infoModel;if(e.getExAtt(ExAttrType.eatMiJiBQBuffId)&&e.getAtt(AttributeType.atHp)/e.getAtt(AttributeType.atMaxHp)*1e4<e.getExAtt(ExAttrType.eatMiJiBQHpPer)){this.checkAttr(t,1,ExAttrType.eatMiJiBQHpTime,1);var i=this.getIsAttr(t,1,ExAttrType.eatMiJiBQHpTime);if(i){var s=EntityBuff.createBuff(e.getExAtt(ExAttrType.eatMiJiBQBuffId),t);t.addBuff(s),t.addPaoPao(23)}}},e.prototype.tryTriggerHungu=function(t){var e=t.infoModel,i=e.getAtt(AttributeType.atHunGuPro);if(i){this.checkAttr(t,0,AttributeType.atHunGuCd,i/1e4);var s=this.getIsAttr(t,0,AttributeType.atHunGuCd);return s&&BubblesFactory.ins().playBubblesEffects(24),s}},e.prototype.tryTriggerHeart=function(t){var e=t.infoModel;if(e.getAtt(AttributeType.atHearthCount)){this.checkAttr(t,0,AttributeType.atHearthCount,1,8e3);var i=this.getIsAttr(t,0,AttributeType.atHearthCount);return i&&BubblesFactory.ins().playBubblesEffects(25),i}},e.prototype.petTryUsePassiveSkill=function(t,e){void 0===e&&(e=!0);var i=t.infoModel.masterHandle,s=EntityMgr.ins().getEntityByHandle(i);if(s&&s.infoModel&&s.infoModel.getExAtt(ExAttrType.eatPetSkillLevel)){for(var n=36e3+s.infoModel.getExAtt(ExAttrType.eatPetSkillLevel),o=[new SkillData(n)],a=[],r=0,h=o;r<h.length;r++){var l=h[r];0!=l.config.passive.cond||e?1==l.config.passive.cond&&e&&GameLogicManage.triggerValue(l.config.passive.rate)&&a.push(l):GameLogicManage.triggerValue(l.config.passive.rate)&&a.push(l)}if(!a.length)return;for(var c=0,u=a;c<u.length;c++){var p=u[c],d=void 0;if(p.targetType!=TargetType.Enemy)d=t;else{var g=EntityMgr.ins().screeningTargetByPos(t,!1,0,p.affectRange,this.aiList);d=g[0]}if(d){var f=t.infoModel.handle;this.skillCD[f]=this.skillCD[f]||{},this.skillCD[f][p.id]=egret.getTimer(),this.aiUseSkill(t,d,p)}}}},e.prototype.showBuffHarm=function(t,e,i,s){var n=GameLogicManage.calculateRealAttribute(e,AttributeType.atAddEnemyHp,t);n>0&&(n=-n,this.hramedDie(t,n),t instanceof CustomActorRole&&this.showHram(!1,HarmTypes.BLANK,t,t,n));var o=GameLogicManage.calculateRealAttribute(t,AttributeType.atHurtMyself,e);if(o){var a=Math.floor(s*o/1e4),r=this.hramedDie(t,a);this.showHram(r,HarmTypes.BLANK,t,e,a)}},e.prototype.hramedDie=function(t,e){var i=t.infoModel.getAtt(AttributeType.atHp)-e;if(0>e){var s=t.infoModel.getAtt(AttributeType.atMaxHp);i=i>s?s:i}return t.infoModel.setAtt(AttributeType.atHp,i),t.infoModel.getAtt(AttributeType.atHp)<=0?!0:!1},e.prototype.showHram=function(t,i,s,n,o,a){var r=this;if(void 0===a&&(a=""),1!=this.isAIStop&&s&&s.infoModel)if(this.trace(s.infoModel.handle+" -- nháº­n "+o+", mÃ¡u cÃ²n láº¡i hiá»‡n táº¡i:"+s.getHP()+"	--"+a),s.hram(o),GameLogicManage.ins().postEntityHpChange(s,n,i,o),t){if(s.removeAllFilters(),s.stopMove(),s instanceof CustomActorRole&&s.playAction(ModuleAction.DIE),s.myKill&&!(s instanceof CustomActorRole)){var h=UserTask.ins().taskTrace;if(h){var l=UserTask.ins().getAchieveConfById(h.id);l&&l.type==e.SEND_TASK_TYPE&&UserFb.ins().sendMonsterKill(s.infoModel.configID)}}if(!s.hasBuff(52001)&&GameLogicManage.triggerExAttr(s,ExAttrType.eatGodBlessProbability)){s.AI_STATE=AI_State.Stand,s.removeAllBuff();var c=s.infoModel.getAtt(AttributeType.atMaxHp)*s.infoModel.attributeExData[ExAttrType.eatGodBlessRate]/1e4;s.infoModel.setAtt(AttributeType.atHp,c),s.hram(-c),this.trace("MÃ¡u cÃ²n láº¡i sau khi há»“i sinh"+s.getHP()),s.addPaoPao(7)}else if(this.trace(s.infoModel.handle+" -- cháº¿t, chá» xÃ³a hÃ¬nh áº£nh"),n&&n.team==Team.My&&this.checkPlayDieSound(s),TimerMgr.ins().doTimer(500,1,function(){if(r.trace(s.infoModel.handle+" -- xÃ³a"),EntityMgr.ins().removeByHandle(s.infoModel.handle,!1,s.myKill&&s.infoModel.type==EntityType.Monster),s.infoModel.type==EntityType.Role){var t=EntityMgr.ins().getEntityByMasterhHandle(s.infoModel.masterHandle);if(!t){var e=EntityMgr.ins().getMasterList(s.infoModel.masterHandle);if(e&&e.length)for(var i=0,o=e;i<o.length;i++){var a=o[i];EntityMgr.ins().removeByHandle(a.infoModel.handle)}}}if(delete r.hashHpObj[s.hashCode],s.onDead(function(){s.deadDelay(),r.clearTarget(s);var t=egret.Tween.get(s.dieTweenObj);t.wait(1e3).to({alpha:0},1e3).call(function(){s instanceof CustomActorMonster&&!(s instanceof CustomActorRole)?s.destruct():DisplayUtils.removeFromParent(s)})}),s.team==Team.Monster){var h=EntityMgr.ins().getTeamCount(Team.Monster);h<=UserFb.ins().rCount&&GameLogicManage.ins().createGuanqiaMonster(!1)}r.checkAIend(n,s)},this),s.team==Team.Monster){var u=EntityMgr.ins().getTeamCount(Team.Monster);if(u<=UserFb.ins().rCount&&GameLogicManage.ins().createGuanqiaMonster(!1),n&&n.team==Team.My){var p=EntityMgr.ins().getNoDieRole(),d=s.infoModel.configID==UserFb.ins().eliteMonsterId;if(p&&(d||n.infoModel.handle==p.infoModel.handle)&&0==GameMap.fubenID){var g=Math.floor(s.x/GameMap.CELL_SIZE),f=Math.floor(s.y/GameMap.CELL_SIZE),v=void 0;if(d?v=UserFb.ins().eliteRewards.shift():(v=UserFb.ins().getRewardPop(),UserFb.ins().rewards=[]),v&&v.length>0){for(var y=0;y<v.length&&8>y;y++)EncounterData.ins().postCreateThing(g,f,v[y].drops[0]);var m=function(){UserFb.ins().sendGetRewards(d)};DorpAssist.addCompleteFunc(m,this),DorpAssist.start()}UserFb.ins().exp>0&&(!v||0==v.length)&&(UserFb.ins().sendGetRewards(d),UserFb.ins().exp=0)}var _=EntityMgr.ins().screeningTargetByPos(n,!1,0,Number.MAX_VALUE,this.aiList);if(!_||0==_.length)for(var T=EntityMgr.ins().getEntityByTeam(Team.My),b=0,C=T;b<C.length;b++){var I=C[b];I.playAction(ModuleAction.STAND)}}for(var S in this.curTarget)if(this.curTarget[S]==s){var I=EntityMgr.ins().getEntityByHandle(S);I&&I.infoModel&&++I.infoModel.killNum;break}if(n&&n.team==Team.Faker){var w=EncounterData.ins().wildPersonList[n.infoModel.masterHandle],B=NearbyModel.countKillByMarster(n.infoModel.masterHandle);w&&1==w.actionType&&B>=w.killNum&&GameMap.moveEntity(n,w.backX,w.backY)}}}else s.AI_STATE!=AI_State.Die&&o>0,CustomerSkillAiLogic.ins().checkHPTrigger(s,n)},e.prototype.checkAIend=function(t,e){var i=EntityMgr.ins().getTeamCount(e.team);if(!i){switch(t.team){case Team.My:switch(e.team){case Team.Monster:this.trace("å¼€å§‹æ¡ä¸œè¥¿");break;case Team.WillBoss:EncounterData.ins().sendResults(!0),this.trace("é­é‡bossæˆåŠŸ");break;case Team.WillEntity:if(this.trace("é­é‡æ•ŒäººæˆåŠŸ"),!EntityMgr.ins().getTeamCount(Team.My))return;GameMap.sceneInMine()?MineToFight.ins().fightEnd(!0):NearbyFight.ins().sendResultFight(1);break;case Team.Faker:var s=EncounterData.ins().wildPersonList[e.infoModel.masterHandle];s&&EncounterData.ins().sendFoePeopleResult(s.index,1)}EncounterData.ins().isGuiding&&(EncounterData.ins().isGuiding=!1,EncounterData.ins().postNearByDataChange()),EntityMgr.ins().resetRole();break;case Team.WillBoss:EncounterData.ins().sendResults(!1),this.trace("é­é‡bosså¤±è´¥");break;case Team.WillEntity:if(this.trace("é­é‡æ•Œäººå¤±è´¥"),!EntityMgr.ins().getTeamCount(Team.WillEntity))return;GameMap.sceneInMine()?MineToFight.ins().fightEnd(!1):NearbyFight.ins().sendResultFight(0);break;case Team.Faker:var n=EncounterData.ins().wildPersonList[t.infoModel.masterHandle];EncounterData.ins().sendFoePeopleResult(n.index,0);break;case Team.Monster:EntityMgr.ins().resetRole()}this.getPickAI()}},e.prototype.checkPlayDieSound=function(t){var e,i=t.infoModel?t.infoModel.configID:0;!SoundUtil.WINDOW_OPEN&&i&&(e=UserFb.ins().guanqiaMonster[i],e?e.sound&&SoundUtil.ins().playEffectMC(e.sound):(e=GlobalConfig.ConfigMonsters[i],e&&e.sound&&SoundUtil.ins().playEffectMC(e.sound)))},e.prototype.getPickAI=function(){this.inited&&!EncounterData.ins().isEncounter()&&this.stopAITimer()},e.prototype.getTeamCount=function(t){var e=0;for(var i in this.aiList){var s=this.aiList[i];s.team==t&&(e+=1)}return e},e.prototype.getTeamCountByRole=function(t){var e=0;for(var i in this.aiList){var s=this.aiList[i];s.team==t&&s instanceof CustomActorRole&&(e+=1)}return e},e.prototype.stopAITimer=function(){TimerMgr.ins().remove(this.startAI,this),TimerMgr.ins().remove(this.startFabao,this)},e.prototype.addAITimer=function(){TimerMgr.ins().isExists(this.startAI,this)||(TimerMgr.ins().doTimer(e.AI_UPDATE_TIME,0,this.startAI,this),this.addFbTimer())},e.prototype.addFbTimer=function(){this.zhanlingTime=egret.getTimer(),this.zhanlingdelayTime=egret.getTimer(),TimerMgr.ins().doTimer(1e3,0,this.startFabao,this)},e.prototype.getArgs=function(t,e,i){var s=GlobalConfig.ConfigEffects[t],n=0,o=0,a=0;if(e&&e.args)for(var r=0,h=e.args;r<h.length;r++){var l=h[r];8==l.type&&l.vals[0]==s.group&&(n+=l.vals[2]||0,o+=l.vals[4]||0,a+=l.vals[1]||0),6==l.type&&(n+=l.vals[0]||0)}if(i&&i.args)for(var c=0,u=i.args;c<u.length;c++){var l=u[c];8==l.type&&l.vals[0]==s.group&&(n+=l.vals[2]||0,o+=l.vals[4]||0,a+=l.vals[1]||0),6==l.type&&(n+=l.vals[0]||0)}return{a:n,b:0,c:o,time:a}},e.prototype.skillEffValue=function(t,e,i){var s=0,n=0,o=0;if(i&&(n=i.a||0,o=i.c||0),e){if(e.args)switch(e.type){case SkillEffectType.AdditionalDamage:s=t.infoModel.getAtt(e.args.b)*(e.args.a+n)+(e.args.c||0)+o;break;case SkillEffectType.AddBlood:s=t.infoModel.getAtt(e.args.b)*(e.args.a+n)+(e.args.c||0)+o,s=-s;break;case SkillEffectType.AdditionalAttributes:case SkillEffectType.HostAddAttributes:s=t.infoModel.getAtt(e.args.b)*(e.args.a+n)+(e.args.c||0)+o;break;case SkillEffectType.AdditionalState:if(2==e.args.i)s=t.infoModel.getAtt(e.args.b)*(e.args.a+n)+(e.args.c||0)+o;else{var a=e.args.c?(e.args.c||0)+o:1+o;s=t.infoModel.getAtt(e.args.b)*a}}s>>=0}return s},e.prototype.checkTeamDistan=function(t,e,i){void 0===i&&(i=5);var s=MathUtils.getDistance(t.x,t.y,e.x,e.y);return s<i*GameMap.CELL_SIZE},e.prototype.isCanUseCF=function(t){var e=t.getIsJumpFindTheWay();if(1==t.isRole&&0==e){var i=t.infoModel.handle,s=this.curTarget[i],n=MathUtils.getDistance(t.x,t.y,s.x,s.y),o=UserSkill.ins().cfSkillData,a=o.teleport;return a>n&&n>400?!0:!1}return!1},e.prototype.tryUseSkill=function(t){var e=t.infoModel.handle,i=this.curSkill[e],s=this.curTarget[e];if(!i||!s)return!1;var n=MathUtils.getDistance(t.x,t.y,s.x,s.y);return n<i.castRange*GameMap.CELL_SIZE},e.prototype.screeningSkill=function(t){var e=this.aiList[t];if(this.skillCD[t]=this.skillCD[t]||{},e.team==Team.My){var i=EntityMgr.ins().getNoDieRole();if(i&&i!=e&&!this.checkTeamDistan(e,i,10))return void(this.curSkill[t]=null)}var s=this.curSkill[t];if(s&&egret.getTimer()-this.skillCD[t][s.id]<s.cd&&(this.curSkill[t]=null),!this.curSkill[t]){var n=this.getUseSkillList(e);if(n){var o,a=0,r=n[a];if(o=r&&r.tarEff?GlobalConfig.ConfigEffects[r.tarEff[0]]:null,o&&o.type==SkillEffectType.Summon&&e.hasBuff(o.group)&&(r=n[++a]),o=r&&r.tarEff?GlobalConfig.ConfigEffects[r.tarEff[0]]:null,o&&o.type==SkillEffectType.AddBlood&&(EntityMgr.ins().checkCanAddBlood(e.team)||(r=n[++a])),r&&25e3==r.id){var h=this.curTarget[e.infoModel.handle];h&&h.AI_STATE!=AI_State.Die||(h=e),(EncounterData.ins().isEncounter()||MineToFight.ins().isFighting||!EntityMgr.ins().checkCount(h,r.affectRange,2,h.team!=e.team))&&(r=n[++a])}r&&13e3==r.id&&(EncounterData.ins().isEncounter()||MineToFight.ins().isFighting||!EntityMgr.ins().checkCount(e,r.affectRange,2))&&(r=n[++a]),this.curSkill[t]=r}}},e.prototype.getUseSkillList=function(t,e){void 0===e&&(e=!0);var i=[];if(t instanceof CustomActorRole&&t.infoModel){if(Assert(t.infoModel.skillsData,"Ká»¹ nÄƒng nhÃ¢n váº­t trá»‘ng, isMy:"+t.isMy+",fbType:"+GameMap.fbType+",fubenId:"+GameMap.fubenID))return;if(i=t.infoModel.skillsData.concat(),t.team==Team.My){var s=GweaponCC.ins().getJobGWeaponNewSkill(t.infoModel.job);s&&(i=i.concat(s));var n=t.infoModel.index,o=JadeNewSysBase.ins().getJadeDataByID(n);o&&(i=i.concat(o.getSkillLists()))}else{var o=t.infoModel.jadeData;o&&(i=i.concat(o.getSkillLists()))}i=i.concat(WuJiEquipModel.ins().getWuJiSkills(t.infoModel))}else if(t.team==Team.My)if(SpecialRingSystem.ins().isFireRing(t.infoModel.handle)){var a=SpecialRingSystem.ins().getRingSkill();if(a){var r=ObjPool.pop("SkillData");r.configID=a,i.push(r)}if(a=LyMarkSystem.ins().getCurSkillID()){var r=ObjPool.pop("SkillData");r.specialCD=LyMarkSystem.ins().getCurSkillCD(),r.configID=a,i.push(r)}}else{var r=ObjPool.pop("SkillData");r.configID=80001;var s=GweaponCC.ins().getReviseBySkill(35e3);s&&s.length&&(r.configID=80002),i.push(r)}else{var r=ObjPool.pop("SkillData");r.configID=50001,i.push(r)}if(i&&0!=i.length){var h=t.infoModel.handle;this.skillCD[h]=this.skillCD[h]||{};var l=i.length;if(0!=l){for(var c=[],u=0;l>u;u++)if(i[u].canUse&&e!=i[u].isPassive){var p=0;if(t.team==Team.My){var d=ArtifactSystem.ins().getReviseByImbaSkill_a94(i[u].id);d&&d.cd&&(p+=d.cd);var s=GweaponCC.ins().getReviseBySkill(i[u].id),g=void 0;s&&(g=s[0]),g&&g.cd&&(p+=g.cd)}egret.getTimer()-this.skillCD[h][i[u].id]<i[u].cd-p||c.push(i[u])}return c.sort(this.sortFunc),c}}},e.prototype.damageBaseCalculation=function(t,e,i){var s,n=0,o=0,a=0,r=JobConst.None,h=(JobConst.None,!1),l=!1,c=t.infoModel,u=0,p=0,d=0,g=0,f=0;if(t.team==Team.My){var v=ArtifactSystem.ins().getReviseByImbaSkill_a94(i.id);if(v&&(u=v.a||0,p=v.b||0,g=v.d||0,v.selfEff))for(var y in v.selfEff)s=t.buffList[v.selfEff[y]],s&&3==s.effConfig.type&&(f+=s.value);var m=GweaponCC.ins().getReviseBySkill(i.id),_=void 0;if(m&&(_=m[0]),_&&(u+=_.a||0,p+=_.b||0,g+=_.d||0,_.selfEff))for(var y in _.selfEff)s=t.buffList[_.selfEff[y]],s&&3==s.effConfig.type&&(f+=s.value)}if(i.preId&&GlobalConfig.FlameStamp.skillId.indexOf(i.preId)>=0){var T=c.lyMarkLv||0;if(T){var b=GlobalConfig.FlameStampLevel[T];b&&(u+=b.bulletDamage.a,p+=b.bulletDamage.b)}var C=c.lyMarkSkills||[];if(T=C[6]||0){var b=GlobalConfig.FlameStampEffect[7][T];b.bulletDamage&&(u+=b.bulletDamage.a||0,p+=b.bulletDamage.b||0)}}if(h=t instanceof CustomActorRole?!0:!1,l=e instanceof CustomActorRole?!0:!1,n=h&&r?r==JobConst.YuXiao?GameLogicManage.calculateRealAttribute(e,AttributeType.atDef,t):GameLogicManage.calculateRealAttribute(e,AttributeType.atRes,t):GameLogicManage.calculateRealAttribute(e,AttributeType.atDef,t),o=n*(1-c.getAtt(AttributeType.atPenetrate)/1e4),3==i.calcType){if(i.args){var I=0;if(t.team==Team.My)for(var S=SubRoles.ins().subRolesLen,w=0;S>w;w++){var B=SubRoles.ins().getSubRoleByIndex(w);B&&(I+=B.getAtt(AttributeType.atAttack))}else if(t.team==Team.WillEntity)for(var R=HejitoUseMgr.ins().getRoles(),S=R.length,w=0;S>w;w++){var B=R[w];B&&(I+=B.getAtt(AttributeType.atAttack))}I=Math.max(I-o,.05*I);var M=i.args.b?i.args.b+p:0+p;a=I*(i.args.a+u)+M+d,a=Math.max(a,.05*I),a=e instanceof CustomActorRole?Math.floor(a*(1+c.getExAtt(ExAttrType.eatTogetherHitRoleDamageInc)/1e4)):Math.floor(a*(1+c.getExAtt(ExAttrType.eatTogetherHitMonDamageInc+g)/1e4)),a=Math.floor(a*(1-c.getExAtt(ExAttrType.eatTogetherHitFree)/1e4));var x=GameLogicManage.calculateRealAttribute(t,AttributeType.atRoleDamageEnhance,t);x-=GameLogicManage.calculateRealAttribute(e,AttributeType.atRoleDamageReduction,t),x-=GameLogicManage.calculateRealAttribute(e,AttributeType.atDamageReduction,t),a=Math.floor(a*(1+x/1e4)),a+=c.getAtt(AttributeType.atTogetherHolyDamege)*(1+c.getAtt(AttributeType.atTogetherHolyMaster)/1e4-e.infoModel.getAtt(AttributeType.atTogetherHolyResist)/1e4)}}else if(i.targetType==TargetType.Enemy&&i.args){for(var E=0,D=Math.floor(i.id/1e3)%100,w=0;w<skillConst.baseSkillIndex.length;w++)D==skillConst.baseSkillIndex[w]&&(E=c.attributeExData[ExAttrType.eatBaseSkillExArg]);var I=c.getAtt(AttributeType.atAttack),A=GameLogicManage.calculateRealAttribute(t,AttributeType.atAttack,t);if(80002==i.configID){var k=this.getPetSkillAdd(t);A+=Math.floor(I*k/1e4)}var P=GameLogicManage.triggerAttr(t,AttributeType.atAttAddDamPro),L=0;P&&(L=c.getAtt(AttributeType.atAttAddDamVal),t.addPaoPao(15));var G=0;e.hasBuff(51001)&&c.getAtt(AttributeType.atAttMbAddDamPen)&&(G=c.getAtt(AttributeType.atAttMbAddDamPen),t.addPaoPao(17));var U=0;c.getAtt(AttributeType.atAttHpLtPenAddDam)&&e.infoModel.getAtt(AttributeType.atHp)/e.infoModel.getAtt(AttributeType.atMaxHp)<c.getAtt(AttributeType.atAttHpLtPenAddDam)/1e4&&(U=c.getAtt(AttributeType.atAttHpLtAddDamPen),this.hashHpObj[e.hashCode]||(t.addPaoPao(19),this.hashHpObj[e.hashCode]=1));var F=0;c.type==EntityType.Role&&e.infoModel.type==EntityType.Role&&(EncounterData.ins().isEncounter()?F=NearbyFight.ins().getWeiWangHurt(t.isMy):MineToFight.ins().isFighting&&(F=MineToFight.ins().getWeiSheHurt(t.isMy)));var N=0;if(c.getExAtt(ExAttrType.eatMiJiKNHpPer)){var O=c.getAtt(AttributeType.atHp)/c.getAtt(AttributeType.atMaxHp)*1e4;O<c.getExAtt(ExAttrType.eatMiJiKNHpPer)&&(N=Math.floor((c.getExAtt(ExAttrType.eatMiJiKNHpPer)-O)/c.getExAtt(ExAttrType.eatMiJiKNHpSubPer))*c.getExAtt(ExAttrType.eatMiJiKNDamPer))}c.getExAtt(ExAttrType.eatMiJiZHDamPer)&&this.getIsAttr(t,1,ExAttrType.eatMiJiZHTime)&&(N+=c.getExAtt(ExAttrType.eatMiJiZHDamPer));var M=i.args.b?i.args.b+p:0+p;l&&i.args.c&&(d+=i.args.c*e.infoModel.getAtt(AttributeType.atHp)),A=Math.max(A-o,.05*A),a=A*(i.args.a+E+u)+M+d+L,a=Math.floor(a*(1+(g+G+U+F+N)/1e4));var x=GameLogicManage.calculateRealAttribute(t,AttributeType.atRoleDamageEnhance,t);x-=GameLogicManage.calculateRealAttribute(e,AttributeType.atRoleDamageReduction,t),x-=GameLogicManage.calculateRealAttribute(e,AttributeType.atDamageReduction,t),a=Math.floor(a*(1+x/1e4)),a=Math.max(a,.05*I)}var W=(105-10*Math.random())/100;return a*=W,Math.floor(a)},e.prototype.getPetSkillAdd=function(t){var e=t.infoModel.masterHandle,i=EntityMgr.ins().getEntityByHandle(e);if(i&&i.infoModel&&i.infoModel.getExAtt(ExAttrType.eatPetAttackInc)){var s=i.infoModel.getExAtt(ExAttrType.eatPetAttackInc),n=0,o=EntityMgr.ins().getTeamCount(t.team);return t.team==Team.My?n=SubRoles.ins().subRolesLen+1-o:t.team==Team.WillEntity&&(EncounterData.ins().isEncounter()?n=NearbyFight.ins().getRole().length+1-o:MineToFight.ins().isFighting&&(n=MineToFight.ins().getRole().length+1-o)),s*n}return 0},e.prototype.subtractBuff=function(t,e,i){t instanceof CustomActorMonster&&(t.team==Team.Monster||t.team==Team.WillBoss)&&"ç¥žå…½"!=t.infoModel.name&&(i=0);var s=e.buffList[19001];if(s){var n=s.effConfig,o=Math.floor(i*n.args.a);s.value-=o,s.value<=0&&e.removeBuff(s),i=i-o+(s.value<0?-s.value:0)}if(s=e.buffList[60002]){var n=s.effConfig,o=Math.floor(i*(n.args.c/1e4));i-=o}if(s=e.buffList[60004],s&&(i=0),e instanceof CustomActorRole&&e.infoModel&&e.infoModel.exRingsData&&1==e.infoModel.exRingsData[1]){var a=e.infoModel.getAtt(AttributeType.atMp);if(a>0){var r=a-i;e.infoModel.setAtt(AttributeType.atMp,r>0?r:0),i=i-a>=0?i-a:0}}return s=e.buffList[80001],s&&i>0&&(i-=s.value,i=i>0?i:0),i},e.prototype.sortFunc=function(t,e){var i=t.job,s=GlobalConfig.ConfigSkillsSorder[i];if(!s)return 0;var n=s.skillorder,o=n.length,a=n.length;for(var r in n)n[r]==t.id&&(o=+r),n[r]==e.id&&(a=+r);return o>a?1:a>o?-1:0},e.prototype.selectTarget=function(t,e,i){void 0===e&&(e=Number.MAX_VALUE),void 0===i&&(i=!1);var s=t.infoModel.handle,n=this.curSkill[s],o=0;if(n&&(o=n.targetType),i||(i=o==TargetType.Friendly),!i&&this.lastTarget[s]){var a=EntityMgr.ins().getEntityByHandle(this.lastTarget[s]);if(a&&a.parent&&a.AI_STATE!=AI_State.Die)return void(this.curTarget[s]=a)}var r=EntityMgr.ins().screeningTargetByPos(t,i,0,e,this.aiList);switch(t.team){case Team.My:var h=this.checkMySubInList(r,!1,Team.Faker);this.curTarget[s]=h;break;case Team.Faker:var a=this.checkMySubInList(r);this.curTarget[s]=a;break;default:this.curTarget[s]=r?r[0]:null}!i&&this.curTarget[s]&&(this.lastTarget[s]=this.curTarget[s].infoModel.handle)},e.prototype.checkMySubInList=function(t,e,i){void 0===e&&(e=!1),void 0===i&&(i=Team.My);for(var s=0;s<t.length;s++)if(e){if(t[s].team==i)return t[s]}else if(t[s].team!=i)return t[s];return null},e.prototype.trace=function(t){this.isLog&&console.warn(t)},e.prototype.startFabao=function(){this.zhanlingdelayTime&&egret.getTimer()-this.zhanlingdelayTime>GlobalConfig.ConfigZhanLing.delayTime&&(this.zhanlingdelayTime=0,this.checkShowFabao()),egret.getTimer()-this.zhanlingTime>1e4&&this.checkShowFabao()},e.prototype.startPlayActionByServer=function(){0==TimerMgr.ins().isExists(this.playActionByServer,this)&&TimerMgr.ins().doTimer(e.playActionByServerTime,0,this.playActionByServer,this)},e.prototype.playActionByServer=function(){var t=EntityMgr.ins().getAllEntity(),e=egret.getTimer(),i=function(i){var s=t[i];if(s.action!=ModuleAction.DIE&&(s.action!=ModuleAction.ATTACK||s.action!=ModuleAction.CAST)&&s.serverAttackTime&&s.serverAttackTargetHandle&&-1!=s.serverAttackTargetHandle){var n=EntityMgr.ins().getEntityByHandle(s.serverAttackTargetHandle);n&&n.action!=ModuleAction.DIE?s.serverAttackTime+550<=e&&(s.serverAttackTime=e,s.playAction(ModuleAction.ATTACK,s instanceof CustomActorRole?null:function(){s.action!=ModuleAction.DIE&&s.playAction(ModuleAction.STAND)})):s.serverAttackTime+550<=e&&(s.serverAttackTime=e,s.playAction(ModuleAction.STAND),s.serverAttackTargetHandle=-1)}};for(var s in t)i(s)},e.prototype.stopPlayActionByServer=function(){TimerMgr.ins().remove(this.playActionByServer,this)},e.AI_UPDATE_TIME=100,e.playActionByServerTime=100,e.SEND_TASK_TYPE=68,e}(ClassBase);__reflect(RoleMainAI.prototype,"RoleMainAI");var Team;!function(t){t[t.My=0]="My",t[t.Monster=1]="Monster",t[t.WillEntity=2]="WillEntity",t[t.WillBoss=3]="WillBoss",t[t.NotAtk=4]="NotAtk",t[t.Faker=5]="Faker"}(Team||(Team={}));var TargetType;!function(t){t[t.Friendly=1]="Friendly",t[t.Enemy=2]="Enemy",t[t.My=3]="My"}(TargetType||(TargetType={}));var AI_State;!function(t){t[t.Stand=0]="Stand",t[t.Run=1]="Run",t[t.Atk=2]="Atk",t[t.Die=3]="Die",t[t.Patrol=4]="Patrol"}(AI_State||(AI_State={}));var ConfigFieldBoss=function(){function t(){}return t}();__reflect(ConfigFieldBoss.prototype,"ConfigFieldBoss");var AttributeData=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.type=t,this.value=e}return t.AttrAddition=function(e,i){if(!e||e.length<=0)return i?i.concat():null;if(!i||i.length<=0)return e?e.concat():null;for(var s=e.concat(i),n=[],o=s.length,a=new Object,r=0;o>r;r++)void 0==a[s[r].type]&&(a[s[r].type]=0),a[s[r].type]+=s[r].value;for(var h in a)n.push(new t(+h,+a[h]));return n},t.AttrDel=function(e,i){for(var s=[],n=0;n<e.length;n++){var o=new t;o.type=0!=e[n].type?e[n].type:i[n].type,o.value=e[n].value-i[n].value,s.push(o)}return s},t.AttrMultiply=function(e,i){for(var s=[],n=0;n<e.length;n++){var o=new t;o.type=0!=e[n].type?e[n].type:i[n].type,o.value=e[n].value*(1+i[n].value/1e4),s.push(o)}return s},t.transformAttr=function(e){var i=[];for(var s in e){var n=new t;n.type=e[s].type,n.value=e[s].value,i.push(n)}for(var o=0;o<i.length-1;o++)for(var a=0;a<i.length-o-1;a++)if(i[a]<i[a+1]){var r=i[a+1];i[a+1]=i[a],i[a]=r}return i},t.getAttStr=function(e,i,s,n,o,a,r,h,l,c,u,p){void 0===i&&(i=2),void 0===s&&(s=1),void 0===n&&(n="+"),void 0===o&&(o=!1),void 0===a&&(a=!0),void 0===l&&(l=16777215),void 0===c&&(c=14507),void 0===u&&(u=2),void 0===p&&(p=65286);var d="",g=0;if(e instanceof t)return this.getAttStrByType(e,i,n,o,a,l,c,":");if(!(e instanceof Array)){var f=[];for(var v in this.translate)if(!isNaN(e[v])){var y=new t;y.type=parseInt(this.translate[v]),y.value=e[v],f.push(y)}return this.getAttStr(f,i,s,n,o,a,r,h,l,c)}for(var m=e,_=m.length-1,T=0;T<m.length;T++)if(0!=m[T].type)if(m[T].type!=AttributeType.atHpEx&&m[T].type!=AttributeType.atAtkEx&&m[T].type!=AttributeType.atDamageReduction&&m[T].type!=AttributeType.atDefEx&&m[T].type!=AttributeType.atResEx){if(d+=this.getAttStrByType(m[T],i,n,o,a,l,c," "),r&&r.attr_add&&(d+="|C:0x"+p.toString(16)+"&T:+||C:0x"+p.toString(16)+"&T:"+Math.floor(m[T].value*(r.attr_add/100))+"|"),h&&(d+="|C:0x"+c.toString(16)+"&T:"+h+"|"),_+g>T)for(var b=0;s>b;b++)d+="\n"}else g=-1;if(0>g){var C=d.lastIndexOf("\n");d=d.substring(0,C)}return d},t.getAttStr1=function(t,e,i){void 0===i&&(i=4);for(var s="",n=0;n<t.length;n++)if(s+=this.getAttStrByType1(t[n],e,i),n<t.length-1)for(var o=0;o<e.emptyLine+1;o++)s+="\n";return s},t.getAttStrByType1=function(e,i,s){var n=StringUtils.complementByChar(t.getAttrStrByType(e.type),3*s),o=e.type,a=(i.sign,"");a=o==AttributeType.atCrit?e.value/100+"%":o==AttributeType.atTogetherHolyDamege||o==AttributeType.atHolyDamege?e.value.toString():o>=AttributeType.atHpEx?o==AttributeType.atStunTime?e.value/1e3+"giÃ¢y":o==AttributeType.atAtkEx?e.value/100+"%":o==AttributeType.atCritHurt?(e.value>>0)+"":(e.value/100>>0)+"%":e.value.toString();var r=StringUtils.addColor(n+i.sign,i.wordColor);i.isShowAttName&&(r=StringUtils.complementByChar(r,i.intervals));var h=r+StringUtils.addColor(a,i.attrColor);return h},t.getAttStrByType=function(e,i,s,n,o,a,r,h,l){void 0===i&&(i=2),void 0===s&&(s="+"),void 0===n&&(n=!0),void 0===o&&(o=!0),void 0===a&&(a=16777215),void 0===r&&(r=14507),void 0===h&&(h=""),void 0===l&&(l=65286);var c="";switch(o&&(c="|C:0x"+a.toString(16)+"&T:"+StringUtils.complementByChar(t.getAttrStrByType(e.type),3*i)+"|"),e.type){case AttributeType.atCrit:case AttributeType.atZhuiMingPro:c+=-1!=s.indexOf(":")?" "+s+" |C:0x"+r.toString(16)+"&T:"+e.value/100+"%":s+e.value/100+"%";break;case AttributeType.atStunTime:c+=s+e.value/1e3+"giÃ¢y";break;case AttributeType.atJob1HpEx:case AttributeType.atJob2HpEx:case AttributeType.atJob3HpEx:case AttributeType.atHp:case AttributeType.atMp:case AttributeType.atMaxHp:case AttributeType.atMaxMp:case AttributeType.atAttack:case AttributeType.atDef:case AttributeType.atRes:case AttributeType.atTough:case AttributeType.atMoveSpeed:case AttributeType.atAttackSpeed:case AttributeType.maxNeiGong:case AttributeType.atNeiGongRestore:case AttributeType.atJob1AtkEx:case AttributeType.atJob2AtkEx:case AttributeType.atJob3AtkEx:case AttributeType.atJob1DefEx:case AttributeType.atJob2DefEx:case AttributeType.atJob3DefEx:case AttributeType.atJob1ResEx:case AttributeType.atJob2ResEx:case AttributeType.atJob3ResEx:case AttributeType.atHolyDamege:case AttributeType.atTogetherHolyDamege:case AttributeType.atZhuiMingVal:case AttributeType.atCritHurt:case AttributeType.atHuiXinDamage:case AttributeType.atDeadLyHurt:case AttributeType.atDeadLyHurtResist:case AttributeType.atCritHurtResist:case AttributeType.atHearthDamege:c+=-1!=s.indexOf(":")?" "+s+" |C:0x"+r.toString(16)+"&T:"+e.value+"|":"|C:0x"+r.toString(16)+"&T:"+s+e.value+"|";break;default:c+="|C:0x"+l.toString(16)+"&T:"+s+(e.value/100).toFixed(1)+"%|"}return e.type==AttributeType.atYuPeiDeterDam&&(c="|C:0xFF0000&T:"+c+"|"),c},t.getExtAttStrByType=function(e,i,s,n,o,a){void 0===i&&(i=4),void 0===s&&(s="+"),void 0===n&&(n=!1),void 0===o&&(o=!0),void 0===a&&(a=16777215);var r="";return o&&(r=StringUtils.complementByChar(t.getExtAttrStrByType(e.type),8*i)),r+=e.type==ExAttrType.eatGodBlessRate||e.type==ExAttrType.eatGodBlessProbability||e.type==ExAttrType.eatAttackAddHpProbability||e.type==ExAttrType.eatDeathCurseProbability||e.type==ExAttrType.eatAddWarriorDamageInc||e.type==ExAttrType.eatAddMageDamageInc||e.type==ExAttrType.eatAddTaoistDamageInc||e.type==ExAttrType.eatAddToTaoistDamageInc||e.type==ExAttrType.eatSubWarriorDamageInc||e.type==ExAttrType.eatSubMageDamageInc||e.type==ExAttrType.eatSubTaoistDamageInc||e.type==ExAttrType.eatTogetherHitFree||e.type==ExAttrType.eatMiss||e.type==ExAttrType.eatTogetherHitMonDamageInc||e.type==ExAttrType.eatTogetherHitRoleDamageInc||e.type==ExAttrType.eatAddToWarriorDamageInc||e.type==ExAttrType.eatAddToMageDamageInc||e.type==ExAttrType.eatAddToMageDamageInc||e.type==ExAttrType.eatDeathCurseDamageIncrease?s+"|C:0x"+a.toString(16)+"&T:"+e.value/100+"%|":e.type==ExAttrType.eatDeathCurseTime?s+e.value/1e3+"giÃ¢y":e.type==ExAttrType.eatIgnoreReflect?"":s+e.value},t.inserteBlank=function(t,e,i){void 0===i&&(i=1);for(var s=t.length,n="";e--;)n+=" ";var o="";switch(i){case 0:o=n+t;break;case 1:o=t.slice(0,s/2)+n+t.slice(s/2);break;case 2:o=t+n}return o},t.getAttrInfoByItemData=function(e){var i=GlobalConfig.ConfigEquip[e.configID],s="",n=0;for(var o in this.translate)if(!(i[o]<=0))for(var a=0;a<e.att.length;a++)n=e.att[a].type,this.translate[o]==n&&(s+=t.getAttrStrByType(n)+": ",s+=i[o]+" +"+e.att[a].value+"\n");return s},t.getAttrStrByType=function(t){var e="";switch(t){case AttributeType.atHp:e="Sinh Lá»±c hiá»‡n táº¡i";break;case AttributeType.atMp:e="PhÃ¡p Lá»±c hiá»‡n táº¡i";break;case AttributeType.atMaxHp:e="Sinh Lá»±c";break;case AttributeType.atMaxMp:e="PhÃ¡p Lá»±c";break;case AttributeType.atAttack:e="CÃ´ng KÃ­ch";break;case AttributeType.atDef:e="Váº­t KhÃ¡ng";break;case AttributeType.atRes:e="PhÃ¡p KhÃ¡ng";break;case AttributeType.atCrit:e="Báº¡o KÃ­ch";break;case AttributeType.atTough:e="KhÃ¡ng Báº¡o";break;case AttributeType.atMoveSpeed:e="Tá»‘c Äá»™ Di Chuyá»ƒn";break;case AttributeType.atAttackSpeed:e="Tá»‘c Äá»™ CÃ´ng KÃ­ch";break;case AttributeType.atHpEx:e="Cá»™ng ThÃªm Sinh Lá»±c";break;case AttributeType.atAtkEx:e="Cá»™ng ThÃªm CÃ´ng KÃ­ch";break;case AttributeType.atStunPower:e="Tá»‰ Lá»‡ Äá»‹nh ThÃ¢n";break;case AttributeType.atStunRes:e="KhÃ¡ng Äá»‹nh ThÃ¢n";break;case AttributeType.atStunTime:e="Thá»i Gian Äá»‹nh ThÃ¢n";break;case AttributeType.atDamageReduction:e="Giáº£m SÃ¡t ThÆ°Æ¡ng";break;case AttributeType.atCritHurt:e="SÃ¡t ThÆ°Æ¡ng Báº¡o KÃ­ch";break;case AttributeType.atCritEnhance:e="TÄƒng CÆ°á»ng SÃ¡t ThÆ°Æ¡ng Báº¡o KÃ­ch";break;case AttributeType.atRoleDamageEnhance:e="[ToÃ n ThÆ°Æ¡ng] TÄƒng sÃ¡t thÆ°Æ¡ng lÃªn má»i nghá»";break;case AttributeType.atRoleDamageReduction:e="[ToÃ n Giáº£i] Giáº£m sÃ¡t thÆ°Æ¡ng chá»‹u tá»« má»i nghá»";break;case AttributeType.atDefEx:e="Váº­t KhÃ¡ng Pháº§n TrÄƒm";break;case AttributeType.atResEx:e="PhÃ¡p KhÃ¡ng Pháº§n TrÄƒm";break;case AttributeType.atJob1HpEx:e="Sinh Lá»±c Ngá»± TiÃªu";break;case AttributeType.atJob2HpEx:e="Sinh Lá»±c Láº¡c Anh";break;case AttributeType.atJob3HpEx:e="Sinh Lá»±c TrÆ°á»ng Ca";break;case AttributeType.atNeiGongRestore:e="Má»—i 3 giÃ¢y há»“i CÆ°Æ¡ng KhÃ­";break;case AttributeType.cruNeiGong:e="CÆ°Æ¡ng KhÃ­ hiá»‡n táº¡i";break;case AttributeType.maxNeiGong:e="CÆ°Æ¡ng KhÃ­";break;case AttributeType.neigongAbsorbHurt:e="Háº¥p Thá»¥ SÃ¡t ThÆ°Æ¡ng";break;case AttributeType.atJob1AtkEx:e="CÃ´ng KÃ­ch Ngá»± TiÃªu";break;case AttributeType.atJob2AtkEx:e="CÃ´ng KÃ­ch Láº¡c Anh";break;case AttributeType.atJob3AtkEx:e="CÃ´ng KÃ­ch TrÆ°á»ng Ca";break;case AttributeType.atJob1DefEx:e="Váº­t KhÃ¡ng Ngá»± TiÃªu";break;case AttributeType.atJob2DefEx:e="Váº­t KhÃ¡ng Láº¡c Anh";break;case AttributeType.atJob3DefEx:e="Váº­t KhÃ¡ng TrÆ°á»ng Ca";break;case AttributeType.atJob1ResEx:e="PhÃ¡p KhÃ¡ng Ngá»± TiÃªu";break;case AttributeType.atJob2ResEx:e="PhÃ¡p KhÃ¡ng Láº¡c Anh";break;case AttributeType.atJob3ResEx:e="PhÃ¡p KhÃ¡ng TrÆ°á»ng Ca";break;case AttributeType.atYuPeiDeterDam:e="Cháº¥n Nhiáº¿p";break;case AttributeType.atCritEnhanceResist:e="Giáº£m SÃ¡t ThÆ°Æ¡ng Báº¡o KÃ­ch";break;case AttributeType.atHolyDamege:e="SÃ¡t ThÆ°Æ¡ng Tháº­t";break;case AttributeType.atHolyMaster:e="TÄƒng CÆ°á»ng SÃ¡t ThÆ°Æ¡ng Tháº­t";break;case AttributeType.atTogetherHolyDamege:e="SÃ¡t ThÆ°Æ¡ng Tháº­t Tháº§n Pháº¡t";break;case AttributeType.atZhuiMingVal:e="SÃ¡t ThÆ°Æ¡ng Há»a";break;case AttributeType.atHuiXinDamage:e="CÆ°á»ng Äá»™ Báº¡o KÃ­ch";break;case AttributeType.atNeiGongEx:e="Cá»™ng ThÃªm CÆ°Æ¡ng KhÃ­";break;case AttributeType.atDeadLyPro:e="Tá»‰ Lá»‡ ChÃ­ Máº¡ng Nháº¥t KÃ­ch";break;case AttributeType.atDeadLyMaster:e="SÃ¡t ThÆ°Æ¡ng ChÃ­ Máº¡ng Nháº¥t KÃ­ch";break;case AttributeType.atDeadLyResist:e="Giáº£m sÃ¡t thÆ°Æ¡ng chÃ­ máº¡ng";break;case AttributeType.atBladeMailPer:e="Pháº£n ThÆ°Æ¡ng";break;case AttributeType.atDefPen:e="XuyÃªn Váº­t KhÃ¡ng";break;case AttributeType.atResPen:e="XuyÃªn PhÃ¡p KhÃ¡ng";break;case AttributeType.atDeadLyHurt:e="SÃ¡t ThÆ°Æ¡ng ChÃ­ Máº¡ng Nháº¥t KÃ­ch";break;case AttributeType.atDeadLyHurtResist:e="Giáº£m ChÃ­ Máº¡ng Nháº¥t KÃ­ch";break;case AttributeType.atCritHurtResist:e="Giáº£m SÃ¡t ThÆ°Æ¡ng Báº¡o KÃ­ch";break;case AttributeType.atHearthDamege:e="SÃ¡t ThÆ°Æ¡ng Tá»‹ch Diá»‡t"}return e},t.getExtAttrStrByType=function(t){var e="";switch(t){case ExAttrType.eatReflectProbability:e="Tá»‰ Lá»‡ KÃ­ch Hoáº¡t Pháº£n ThÆ°Æ¡ng";break;case ExAttrType.eatReflectRate:e="Má»©c Äá»™ Pháº£n ThÆ°Æ¡ng";break;case ExAttrType.eatIgnoreReflect:e="Táº¥n cÃ´ng bá» qua pháº£n thÆ°Æ¡ng, tÄƒng 2% cÃ´ng kÃ­ch báº£n thÃ¢n";break;case ExAttrType.eatGodBlessProbability:e="Tá»‰ Lá»‡ KÃ­ch Hoáº¡t HÃ³a Tháº§n";break;case ExAttrType.eatGodBlessRate:e="Tá»‰ Lá»‡ Há»“i Sinh HÃ³a Tháº§n";break;case ExAttrType.eatDeathCurseProbability:e="Tá»‰ Lá»‡ KÃ­ch Hoáº¡t Äoáº¡n Há»“n";break;case ExAttrType.eatDeathCurseDamageIncrease:e="Äoáº¡n Há»“n TÄƒng SÃ¡t ThÆ°Æ¡ng";break;case ExAttrType.eatDeathCurseTime:e="Thá»i Gian Hiá»ƒn Thá»‹ Hiá»‡u á»¨ng Äoáº¡n Há»“n";break;case ExAttrType.eatAllCrit:e="Tá»‰ Lá»‡ Báº¡o KÃ­ch";break;case ExAttrType.eatAllCritTime:e="Thá»i gian duy trÃ¬ sau khi Báº¡o KÃ­ch kÃ­ch hoáº¡t (giÃ¢y)";break;case ExAttrType.eatBeHitTimesDodge:e="Bá»‹ táº¥n cÃ´ng X láº§n cháº¯c cháº¯n nÃ© trÃ¡nh";break;case ExAttrType.eatAttackTimesCrit:e="Táº¥n cÃ´ng X láº§n cháº¯c cháº¯n Báº¡o KÃ­ch";break;case ExAttrType.eatAttackAddHpProbability:e="Há»“i XuÃ¢n Linh LiÃªn, tá»‰ lá»‡ kÃ­ch hoáº¡t há»“i xuÃ¢n khi táº¥n cÃ´ng";break;case ExAttrType.eatAttackAddHpValue:e="Há»“i XuÃ¢n Linh LiÃªn, lÆ°á»£ng há»“i phá»¥c";break;case ExAttrType.eatAddToWarriorDamageInc:e="[Kiáº¿m Äoáº¡n] TÄƒng sÃ¡t thÆ°Æ¡ng lÃªn Ngá»± TiÃªu";break;case ExAttrType.eatAddToMageDamageInc:e="[Táº£n Chiáº¿t] TÄƒng sÃ¡t thÆ°Æ¡ng lÃªn Láº¡c Anh";break;case ExAttrType.eatAddToTaoistDamageInc:e="[Cáº§m Pháº§n] TÄƒng sÃ¡t thÆ°Æ¡ng lÃªn TrÆ°á»ng Ca";break;case ExAttrType.eatSubWarriorDamageInc:e="[Giáº£i Kiáº¿m] Giáº£m sÃ¡t thÆ°Æ¡ng chá»‹u tá»« Ngá»± TiÃªu";break;case ExAttrType.eatSubMageDamageInc:e="[Giáº£i Táº£n] Giáº£m sÃ¡t thÆ°Æ¡ng chá»‹u tá»« Láº¡c Anh";break;case ExAttrType.eatSubTaoistDamageInc:e="[Giáº£i Cáº§m] Giáº£m sÃ¡t thÆ°Æ¡ng chá»‹u tá»« TrÆ°á»ng Ca";break;case ExAttrType.eatTogetherHitFree:e="Giáº£m sÃ¡t thÆ°Æ¡ng chá»‹u tá»« Tháº§n Pháº¡t";break;case ExAttrType.eatTogetherHitMonDamageInc:e="Tháº§n Pháº¡t tÄƒng sÃ¡t thÆ°Æ¡ng lÃªn quÃ¡i váº­t";break;case ExAttrType.eatTogetherHitRoleDamageInc:e="Tháº§n Pháº¡t tÄƒng sÃ¡t thÆ°Æ¡ng lÃªn ngÆ°á»i chÆ¡i";break;case ExAttrType.eatTogetherHitCdSub:e="Tá»‘c Äá»™ Há»“i Phá»¥c Ná»™ KhÃ­";break;case ExAttrType.eatAdditionalHarm:e="SÃ¡t ThÆ°Æ¡ng Cá»‘ Äá»‹nh Cá»™ng ThÃªm";break;case ExAttrType.eatReductionHarm:e="Miá»…n Giáº£m SÃ¡t ThÆ°Æ¡ng Cá»‘ Äá»‹nh";break;case ExAttrType.eatMiss:e="NÃ© TrÃ¡nh";break;case ExAttrType.eatBaseSkillExArg:e="Há»‡ Sá»‘ Cá»™ng ThÃªm Ká»¹ NÄƒng CÆ¡ Báº£n";break;case ExAttrType.eatMultipleCrit:e="Tá»‰ Lá»‡ Báº¡o KÃ­ch LiÃªn HoÃ n";break;case ExAttrType.eatMultipleCritCoeff:e="TÄƒng SÃ¡t ThÆ°Æ¡ng ÄÃ²n May Máº¯n";break;case ExAttrType.atMultipleCritHurt:e="TÄƒng SÃ¡t ThÆ°Æ¡ng Cá»‘ Äá»‹nh ÄÃ²n May Máº¯n";break;case ExAttrType.eatAddWarriorDamageInc:e="SÃ¡t ThÆ°Æ¡ng Ngá»± TiÃªu";break;case ExAttrType.eatAddMageDamageInc:e="SÃ¡t ThÆ°Æ¡ng Láº¡c Anh";break;case ExAttrType.eatAddTaoistDamageInc:e="SÃ¡t ThÆ°Æ¡ng TrÆ°á»ng Ca";break;case ExAttrType.eatMultipleCritTime:e="Thá»i Gian Há»“i ÄÃ²n May Máº¯n";break;case ExAttrType.eatAttackAddHpTime:e="Há»“i XuÃ¢n Linh LiÃªn, thá»i gian há»“i";break;case ExAttrType.eatHit:e="ChÃ­nh XÃ¡c"}return e},t.getExAttrNameByAttrbute=funcã]»çoÊ×¬¢h­µçPÛ\ÜÓ˜[YSÙ“›ÙLJ
K[™]È]ZKœÞ\Ë‘V[˜Ý[Û‹ÏH—ÚH‹O]˜]šX]\ËšYÛ‹›˜[YOXJÛË\Ë˜Ý\œ™[Û\ÜË˜Y[˜Ý[ÛŠŠNÝ˜\ˆ[™]È]ZKœÞ\Ë‘VÛÙP›ØÚÎÛ‹˜ÛÙP›ØÚÏ\ŽÝ˜\ˆHŽÈ“Øš™XÝOYOÜ‹˜Y˜\ŠžßHŠNœ‹˜Y˜\Š›™]ÈŠÜÊÈŠ
HŠNÝ˜\ˆHH]\Ë˜Ý\œ™[Û\ÜË™Ù]˜\šXX›PžS˜[YJJNÛ	‰œ‹˜Y\ÜÚYÛ›Y[
\ËˆŠØK
K\Ë˜Y]šX]\ÕÐÛÙP›ØÚÊ‹
K\Ëš[š]^™PÚ[›ÙJ‹
NÝ˜\ˆÏ]\Ë™[^P\ÜÚYÛ›Y[XÖØWNÚYŠÊY›ÜŠ˜\ˆOXË›[™ÝLÝOœÜ
ÊÊ^Ý˜\ˆXÖÜNÜ‹˜ÛÛ˜Ø]

_\™]\›ˆ‹˜Y™]\›Š
K\ËˆŠÛ‹›˜[YJÈŠ
HŸNÝ˜\ˆO]œ›ÝÝ\K™›Ü›X]˜[YNÝœ›ÝÝ\K™›Ü›X]˜[YOY[˜Ý[ÛŠKÊ^Ü™]\›ˆš][T™[™\™\”ÚÚ[“˜[YHO]Ý\Ë™›Ü›X]Ýš[™ÊJN™K˜Ø[
\ËKÊ_NÝ˜\ˆOLNÝœ›ÝÝ\Kœ\œÙOY[˜Ý[ÛŠ
^Ý˜\ˆO[[ÙOYYÜ™]–Sœ\œÙJ
NÝ˜\ˆÏHLKHˆŽÙK˜]šX]\ÖÈ˜Û\ÜÈ—OÊYK˜]šX]\ÖÈ˜Û\ÜÈ—K[]HK˜]šX]\ÖÈ˜Û\ÜÈ—KÏHH[ŠN›H‰^[Û\Ü×ÈŠÚJÊÎÝ˜\ˆÏ]\Ëœ\œÙPÛ\ÜÊKŠKO[ËÐÛÙJ
K[[Y]˜[ÚYŠZ
JKÉ‰œŠ^ÙYÜ™]œ™YÚ\Ý\Û\ÜÊ‹ŠNÙ›ÜŠ˜\ˆ[‹œÜ]
‹ˆŠKÏ[›[™ÝOW×ÙÛØ˜[LØËLOœÜ
ÊÊ^Ý˜\ˆ[ÜNÝO]VÙ_
VÙO^ßJ_]VÛØËLWW_
VÛØËLWWO\Š_\™]\›ˆO]›ÚY]›ÚYO]›ÚYÏ]›ÚY]›ÚY]›ÚYŸK]›ÚYKJ
N××Ü™Y›XÝ
š^][œ›ÝÝ\K‘š^][ŠNÝ˜\ˆÜXÚX[š[™Ò][LY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[”š[™ÝÙÙÛXŒˆ‹_\™]\›ˆ×Ù^[™ÊK
K_JÜXÚX[š[™Ò][JN××Ü™Y›XÝ
ÜXÚX[š[™Ò][L‹œ›ÝÝ\K”ÜXÚX[š[™Ò][LˆŠNÝ˜\ˆÝYTÚÚ[™YY][Q]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^ß\™]\›ˆœ›ÝÝ\KœÙ]]OY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝNÝ\Ëš][RXÛÛ‹œÙ]]JJK\Ë›˜[YU^YK›˜[Y_KJ
N××Ü™Y›XÝ
ÝYTÚÚ[™YY][Q]Kœ›ÝÝ\K”ÝYTÚÚ[™YY][Q]HŠNÝ˜\ˆSX\šÑY™™XÝY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ
J^Ý\Ë—Ø[™ÛOKŒK\Ë—Ø[™Û\ÏVÌK\Ë—ØÚ\˜ÛPÙ[\^ÞŒN‹MÌŸK\Ë—ØOMŒ\Ë—ØLÌ\Ë—ÛÛ˜[[OL\Ë—ØÝ\•[Y\ÏL\Ë—Ú\ÔÚÝÐ˜[HL\Ë—Üš[™Ï]\Ë—Ú[™›Ó[Ù[YKY\ÜØYÙPÙ[\‹˜Y\Ý[™\ŠSX\šÔÞ\Ý[Kš[œÊ
KœÜÝX\šÑ]R[™›Ë\Ë™]PÚ[™ÙK\ÊK\Ë\ÙYSX\šÔÚÚ[Ü\˜]J
_\™]\›ˆœ›ÝÝ\K™]PÚ[™ÙOY[˜Ý[ÛŠ
^Ý\Ë—Ú[™›Ó[Ù[	‰\Ë—Ú[™›Ó[Ù[›X\Ý\’[™OOPXÝÜ‹š[™I‰\Ë\]WØNM

_KØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\K—Ü\™[‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Üš[™Ëœ\™[K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKœ›ÝÝ\K\ÙYSX\šÔÚÚ[Ü\˜]OY[˜Ý[ÛŠ
^Ý\Ëœ™\Ù]˜[ÓÜ\˜]WØNM

K[Y\“YÜ‹š[œÊ
Kœ™[[Ý™P[
\ÊNÝ˜\ˆ]\Ë™Ù]ÚÚ[žRYØNM
JNÚYŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÌWVÝNÝ]\Ë™Ù]ÚÚ[žRYØNM
ÊNÝ˜\ˆO]ÑÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÌ×VÝKœ™[ØY[YNŒÏYKœÚÚ[YYKœÝ[\Ý\Ë™Ù]ÚÚ[žRYØNM
ŠI‰Š]\Ë™Ù]ÚÚ[žRYØNM
ŠKÏQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÌ—VÝKœÚÚ[YQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÌ—VÝKœÝ[\
NÝ˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[Ñ\ØÖÑÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[ÖÜ×K™\Ø×KOJË˜ÙZJKÛŒÕ[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠK‹\Ë™Õ[Y\—ØNM\ÊK\Ë—ØÝ\•[Y\ÏL_Kœ›ÝÝ\K™Õ[Y\—ØNMY[˜Ý[ÛŠ
^Ý\Ë—ØÝ\•[Y\ÊÊË\Ë\]P˜[Ô™\Ý[ØNM
\Ë—ØÝ\•[Y\Ê_Kœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆKOLÏLLÍ[ŽÛŠÊÊ\Ï]]\Ë™Ù]ÚÚ[žRYØNM
ŠÌJK
LJKOQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÛŠÌWVÝKŠÌHOLI‰›ŠÌHOLŸ\ß
OYKœÝ[\
NÝ\Ë\]P˜[Ô™\Ý[ØNM
J_Kœ›ÝÝ\K\]P˜[Ô™\Ý[ØNMY[˜Ý[ÛŠ
^ÚYŠ\Ë—Üš[™É‰\Ë—Ü\™[	‰	‰\Ë—ÛÛ˜[[HO]
^Ý\Ëœ™\Ù]˜[ÓÜ\˜]WØNM

K\Ë—ÛÛ˜[[O]\Ë—Ø˜[ß
\Ë—Ø˜[ÏV×K[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠLK\Ë™ÐÚ\˜ÛUÙY[—ØNM\ÊJNÙ›ÜŠ˜\ˆO]›ÚYOLŠ“X]”KÝÏLÝœÎÜÊÊÊYOSØš”ÛÛœÜ
“XÐ[š[X][ÛˆŠK\Ë—Ú\ÔÚÝÐ˜[	‰\Ë—Ü\™[˜YÚ[
JK\Ë—Ø[™Û\ÖÜ×OZJœËKž]\Ë—ØJ“X]˜ÛÜÊJœÊJÝ\Ë—ØÚ\˜ÛPÙ[\‹žKžO]\Ë—ØŠ“X]œÚ[ŠJœÊJÝ\Ë—ØÚ\˜ÛPÙ[\‹žK\Ë—Ø˜[Ëœ\Ú
JKKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÔÒÒSQ‘ŠÈŒŒH‹LJ__Kœ›ÝÝ\K™ÐÚ\˜ÛUÙY[—ØNMY[˜Ý[ÛŠ
^ÚYŠ]\Ë—Ø˜[Ê\™]\›ˆ›ÚY[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë™ÐÚ\˜ÛUÙY[—ØNM\ÊNÚYŠ\Ë—Ú\ÔÚÝÐ˜[	‰\Ë—Üš[™É‰\Ë—Ü\™[
Y›ÜŠ˜\ˆKO]\Ë—Ø˜[Ë›[™ÝÏLLÏLÚO›ÎÛÊÊÊ]]\Ë—Ø˜[ÖÛ×Kž]\Ë—ØJ“X]˜ÛÜÊ\Ë—Ø[™Û\ÖÛ×JJÝ\Ë—ØÚ\˜ÛPÙ[\‹žžO]\Ë—ØŠ“X]œÚ[Š\Ë—Ø[™Û\ÖÛ×JJÝ\Ë—ØÚ\˜ÛPÙ[\‹žK\Ë—Ø[™Û\ÖÛ×JÏ]\Ë—Ø[™ÛK\Ë—Ø[™Û\ÖÛ×O]\Ë—Ø[™Û\ÖÛ×IJŠ“X]”JKO]œ\™[ÏYK™Ù]Ú[[™^
\Ë—Üš[™ÊKYK™Ù]Ú[[™^

K\Ë—Ø[™Û\ÖÛ×OL‹I‰\Ë—Ø[™Û\ÖÛ×OMÛœÉ‰™K˜YÚ[]
ÊNœÏ›‰‰™K˜YÚ[]
K›[PÚ[™[Š_Kœ›ÝÝ\Kœ™\Ù]˜[ÓÜ\˜]WØNMY[˜Ý[ÛŠ
^ÚYŠ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë™ÐÚ\˜ÛUÙY[—ØNM\ÊK\Ë—ÛÛ˜[[OL\Ë—Ø˜[Ê^Ù›ÜŠ˜\ˆ]\Ë—Ø˜[Ë›[™ÝOLÝ™NÙJÊÊ]\Ë—Ø˜[ÖÙWK™\Ý›ÞJ
NÝ\Ë—Ø˜[Ï[[_Kœ›ÝÝ\K™Ù]ÚÚ[žRYØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë—Ú[™›Ó[Ù[›X\Ý\’[™OOPXÝÜ‹š[™OÓSX\šÔÞ\Ý[Kš[œÊ
KœÚÚ[Î\Ë—Ú[™›Ó[Ù[›SX\šÔÚÚ[ÎÜ™]\›ˆY_K›[™ÝÌ™VÝLW_Kœ›ÝÝ\K™Ù]SX\šÓ—ØNMY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Ú[™›Ó[Ù[›X\Ý\’[™OOPXÝÜ‹š[™OÓSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓŽ\Ë—Ú[™›Ó[Ù[›SX\šÓŸKœ›ÝÝ\KœÚÝÐ˜[Y[˜Ý[ÛŠ
^ÚYŠ]\Ë—Ú\ÔÚÝÐ˜[	‰Š\Ë—Ú\ÔÚÝÐ˜[HL\Ë\]P˜[Ô™\Ý[ØNM
\Ë—ØÝ\•[Y\ÊK\Ë—Ø˜[ÊJY›ÜŠ˜\ˆ]\Ë—Ø˜[Ë›[™ÝOLÝ™NÙJÊÊ]\Ë—Ü\™[˜YÚ[
\Ë—Ø˜[ÖÙWJ_Kœ›ÝÝ\KšYP˜[Y[˜Ý[ÛŠ
^Ý\Ë—Ú\ÔÚÝÐ˜[	‰Š\Ë—Ú\ÔÚÝÐ˜[HLK\Ëœ™\Ù]˜[ÓÜ\˜]WØNM

J_Kœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^Ý\Ëœ™\Ù]˜[ÓÜ\˜]WØNM

K[Y\“YÜ‹š[œÊ
Kœ™[[Ý™P[
\ÊK\Ë—Üš[™Ï[[\Ë—Ú[™›Ó[Ù[[[Y\ÜØYÙPÙ[\‹š[œÊ
Kœ™[[Ý™P[
\Ê_KJ
N××Ü™Y›XÝ
SX\šÑY™™XÝœ›ÝÝ\K“SX\šÑY™™XÝŠNÝ˜\ˆSX\šÓZ^][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[›X\šÓZ^][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\ÊK\Ë“Z^‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\Ê_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë™]K˜Ù™Ë˜ÛÜÝ][NÝ\Ë›[Z]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ\Ë™]K˜Ù™Ë›Z^\ØÊK\Ë˜ÛÜÝ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJÈ•pêH[È8nèÜ0èš;ï&ˆŠÊŸÎˆŠÊ\Ë™]K˜ÛÝ[ŒN
JÈ‰•ˆŠÝ\Ë™]Kš][S˜[YJÈˆŠÝ\Ë™]K˜Ù™Ë˜ÛÜÝÛÝ[
NˆˆŠK\ËœÝØÚË^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ’xnáÛˆ1$X[™Èðìûï&ŸÎˆŠÊ\Ë™]Kš][PÛÝ[ÌÌÎÍŽŒMMŒŒ
JÈ‰•ˆŠÝ\Ë™]Kš][PÛÝ[
K\Ë“Z^‹›X™[]È’8nèÜ0èšš[šŽˆ“š8n«[ˆ‹\Ë“Z^‹™[˜X›YH]SX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓ]\Ë™]K˜Ù™Ë›[Z]‹\Ëœ™YÚ[š\ÚX›O]	‰“SX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓ]\Ë™]K˜Ù™Ë›[Z]‰‰\Ë™]K˜ÛÝ[]\Ë™]K˜Ù™Ë˜ÛÜÝÛÝ[\Ëš][RXÛÛ‹™]O]\Ë™]K˜Ù™Ëš][RYKKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^Ý\Ë™]K˜Ù™Ë˜ÛÜÝ][OÝ\Ë™]K˜ÛÝ[]\Ë™]K˜Ù™Ë˜ÛÜÝÛÝ[ÓSX\šÔÞ\Ý[Kš[œÊ
KœÙ[™ÛÛ\Ý[™
\Ë™]K˜Ù™Ëš][RY
N•\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈ™Ý^pê›ˆxnáÝHŠN•\Ù\•Ø\›‹š[œÊ
KœÙ]^QÛÛÙÕØ\›Š\Ë™]K˜Ù™Ëš][RY
_KKœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^Ý\Ë“Z^‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\Ê_K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
SX\šÓZ^][T™[™\‹œ›ÝÝ\K“SX\šÓZ^][T™[™\ˆŠNÝ˜\ˆSX\šÓZ^Ú[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[›X\šÓZ^‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\ÊK\Ë›\Ýš][T™[™\™\SSX\šÓZ^][T™[™\ŸKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë\Ë›Û•ÝXÚØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ë\]WØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ë\]WØNM
K\Ë\]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›Û•ÝXÚØNM
K\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^Ý\Ë—ØÛÛXÝ
\Ë—ØÛÛXÝ[™]È\œ˜^PÛÛXÝ[Û‹\Ë›\Ý™]T›ÝšY\]\Ë—ØÛÛXÝ
NÝ˜\ˆKKË‹ÏV×NÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYË‘›[YTÝ[\X]
YOQÛØ˜[ÛÛ™šYË‘›[YTÝ[\X]ØWKK˜ÛÜÝ][OÊU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
K˜ÛÜÝ][JKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙK˜ÛÜÝ][WK›˜[YKO]Ý˜ÛÝ[Œ
NŠOLÏHˆŠKU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
Kš][RY
K]Ý˜ÛÝ[ŒËœ\Ú
ØÙ™Î™KÛÝ[šK][S˜[YNœË][PÛÝ[›ŸJNÝ\Ë—ØÛÛXÝœÛÝ\˜ÙO[ßKKœ›ÝÝ\K›Û•ÝXÚØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŒŽ˜Ø\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
SX\šÓZ^Ú[‹œ›ÝÝ\K“SX\šÓZ^Ú[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊSX\šÓZ^Ú[‹^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆSX\šÔ[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK—Ø[™ÛOKŒKK—Ø[™Û\ÏVÌKK—ØÚ\˜ÛPÙ[\^ÞŒÎKNŒŒŽ_KK—ØOLMMKK—ØNK—ÛÛ˜[[OLK™^˜\[™]È›ÙÜ™\ÜÐ˜\‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\ÊK\Ë›Z^][U^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸN‰•ˆŠÝ\Ë›Z^][U^
K\Ë™^˜\‹œÙ]ÚY
MN
K\Ë™^˜\‹žKNK\Ë™^˜\‹žOKLK\ËœØÚY[K˜YÚ[
\Ë™^˜\Š_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›ØœÙ\™JSX\šÔÞ\Ý[Kš[œÊ
KœÜÝX\šÑ]R[™›Ë\Ë\]WØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ë\]SX]\šX[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ë\]SX]\šX[ØNM
K\Ë›ØœÙ\™JSX\šÔÞ\Ý[Kš[œÊ
KœÜÝ\Ü˜YT™\Ý[\Ë\]QY™—ØNM
K\Ë˜YÝXÚ]™[
\Ë\Ë›Û•ÝXÚØNM
K\Ë›[™ØÚÛ™Ó[Ù[
\Ë›[™ØÚÛ™Ó[Ù[[™]ÈXÐ[š[X][ÛŠK\Ë™Y™‘Ü›Ý\˜YÚ[
\Ë›[™ØÚÛ™Ó[Ù[
K\Ë›[™ØÚÛ™Ó[Ù[œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈœÚÝÛ[™ØÚÛ™ÌH‹LJK\Ë›[™ØÚÛ™Ó[Ù[ž]\Ë™Y™‘Ü›Ý\ÚYÌŠÍŒ\Ë›[™ØÚÛ™Ó[Ù[žO]\Ë™Y™‘Ü›Ý\šZYÚÌŠÍ\Ë—ÛÛ˜[[OL\Ë\]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›Û•ÝXÚØNM
K\Ëœ™[[Ý™SØœÙ\™J
K\Ë—ÛX]\˜Z[[™›Ï[[\Ëœ™\Ù]˜[×ØNM

K\Ë˜ÛX\”™YY™—ØNM

K\Ë™^˜\‹œ™\Ù]

_KKœ›ÝÝ\Kœ™\Ù]˜[×ØNMY[˜Ý[ÛŠ
^ÚYŠ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™P[
\ÊK\Ë—Ø˜[Ê^Ù›ÜŠ˜\ˆ]\Ë—Ø˜[Ë›[™ÝOLÝ™NÙJÊÊ]\Ë—Ø˜[ÖÙWK™\Ý›ÞJ
K\Ë—Ø˜[ÖÙWO[[Ý\Ë—Ø˜[Ë›[™ÝL\Ë—Ø˜[Ï[[_KKœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆSSX\šÔÞ\Ý[Kš[œÊ
Kš\ÓX^OSSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓŽÝ\Ë˜Ý\œ™[Ý]O]È›X^Žˆ››Ü›X[‹\Ë›^H“‹ˆŠÓSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓŽÝ˜\ˆOV×KÏQÛØ˜[ÛÛ™šYË‘›[YTÝ[\]™[ÙWNÙ›ÜŠ˜\ˆˆ[ˆË˜]œÊZKœ\Ú
™]È]šX]Q]JË˜]œÖÛ—K\KË˜]œÖÛ—K˜[YJJNÝ˜\ˆÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠJNÚYŠ\Ë››ÝÐ]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ]šX]Q]K™Ù]]ÝŠKKŽˆ‹LKL[[MÍÍÌŒMKMÍÍÌŒMJJK\Ë››ÝÐ]‹›[™TÜXÚ[™ÏMK\Ë™^˜\‹™Ù]X^˜[YJ
HO\Ë™^Ý\Ë™^˜\‹œÙ]]JSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÑ^Ë™^
N\Ë™^˜\‹œÙ]˜[YJSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÑ^
K
]\Ë˜ÛX\”™YY™—ØNM

NÙ[Ù^ÚOV×NÝ˜\ˆOQÛØ˜[ÛÛ™šYË‘›[YTÝ[\]™[ÙJÌWNÙ›ÜŠ˜\ˆˆ[ˆK˜]œÊZKœ\Ú
™]È]šX]Q]JK˜]œÖÛ—K\KK˜]œÖÛ—K˜[YJJNÝ\Ë›™^]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ]šX]Q]K™Ù]]ÝŠKKŽˆ‹LKL[[MÍÍÌŒMKLŽ
JK\Ë›™^]‹›[™TÜXÚ[™ÏMNÝ˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÜË˜ÛÜÝ][WNÝ\Ë˜ÛÜÝ[YËœÛÝ\˜ÙO\‹šXÛÛŠÈ—Ü™È‹\Ë\]SX]\šX[ØNM

_Y›ÜŠ˜\ˆÏLOLLÍ\Ü
ÊÊ]OZSSX\šÔÞ\Ý[Kš[œÊ
K™Ù]ÚÚ[žRY

ÌJK
LJKQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÜ
ÌWVÚK\ÖÈœÚÚ[ŠÜKœÙ]Ù™Ê
K
ÌHOLI‰œ
ÌHOLŸ]_
Ï[œÝ[\
KI‰ŠÊÏ[™^ÝÙ\ŠNÝ˜\ˆTÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[ŽÚYŠ\ËœÝÙ\‹œÙ]ÝÙ\ŠÊ™
KÉ‰\Ë—ÛÛ˜[[HOXÊ^Ý\Ëœ™\Ù]˜[×ØNM

K\Ë—ÛÛ˜[[OXË\Ë—Ø˜[ß
\Ë—Ø˜[ÏV×K[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠLK\Ë™ÐÚ\˜ÛWØNM\ÊJNÙ›ÜŠ˜\ˆÏ]›ÚYLŠ“X]”KØËLØÏœÜ
ÊÊYÏSØš”ÛÛœÜ
“XÐ[š[X][ÛˆŠK\Ëš[YËœ\™[˜YÚ[
ÊK\Ë—Ø[™Û\ÖÜOYŠœËž]\Ë—ØJ“X]˜ÛÜÊŠœ
JÝ\Ë—ØÚ\˜ÛPÙ[\‹žËžO]\Ë—ØŠ“X]œÚ[ŠŠœ
JÝ\Ë—ØÚ\˜ÛPÙ[\‹žK\Ë—Ø˜[Ëœ\Ú
ÊKËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ›[X\šÙY™ˆ‹LJ__KKœ›ÝÝ\K™ÐÚ\˜ÛWØNMY[˜Ý[ÛŠ
^ÚYŠ]\Ë—Ø˜[Ê\™]\›ˆ›ÚY[Y\“YÜ‹š[œÊ
Kœ™[[Ý™P[
\ÊNÙ›ÜŠ˜\ˆKO]\Ë—Ø˜[Ë›[™ÝÏLLÏLÚO›ÎÛÊÊÊ]]\Ë—Ø˜[ÖÛ×Kž]\Ë—ØJ“X]˜ÛÜÊ\Ë—Ø[™Û\ÖÛ×JJÝ\Ë—ØÚ\˜ÛPÙ[\‹žžO]\Ë—ØŠ“X]œÚ[Š\Ë—Ø[™Û\ÖÛ×JJÝ\Ë—ØÚ\˜ÛPÙ[\‹žK\Ë—Ø[™Û\ÖÛ×JÏ]\Ë—Ø[™ÛK\Ë—Ø[™Û\ÖÛ×O]\Ë—Ø[™Û\ÖÛ×IJŠ“X]”JKO]œ\™[ÏYK™Ù]Ú[[™^
\Ëš[YÊKYK™Ù]Ú[[™^

K\Ë—Ø[™Û\ÖÛ×OL‹I‰\Ë—Ø[™Û\ÖÛ×OMÛœÉ‰™K˜YÚ[]
ÊNœÏ›‰‰™K˜YÚ[]
K›[PÚ[™[Š_KKœ›ÝÝ\K\]SX]\šX[ØNMY[˜Ý[ÛŠ
^ÚYŠSSX\šÔÞ\Ý[Kš[œÊ
Kš\ÓX^
^Ý˜\ˆQÛØ˜[ÛÛ™šYË‘›[YTÝ[\]™[ÓSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓ—KOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
˜ÛÜÝ][JKOYOÙK˜ÛÝ[ŒÝ\Ë˜ÛÜÝÛÝ[^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸÎˆŠÊO˜ÛÜÝÛÝ[ÈŒ‘ŒŽˆŒ‘ŒŠJÈ‰•ˆŠÚJÈŸÈŠÝ˜ÛÜÝÛÝ[
K\Ë—ÛX]\˜Z[[™›Ï^Ù[›ÝYÚšO]˜ÛÜÝÛÝ[Y˜ÛÜÝ][_NÝ˜\ˆÏ]™^SSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÑ^ÚO]˜ÛÜÝÛÝ[	‰šJ‘ÛØ˜[ÛÛ™šYË‘›[YTÝ[\X]Ý˜ÛÜÝ][WK™^\ÏÝ\Ë—Ü™YY™™XÝ
\Ë—Ü™YY™™XÝSØš”ÛÛœÜ
“XÐ[š[X][ÛˆŠK\Ë—Ü™YY™™XÝÝXÚ[˜X›YHLK\Ë›\Ü›Ý\˜YÚ[
\Ë—Ü™YY™™XÝ
K\Ë—Ü™YY™™XÝžLLL\Ë—Ü™YY™™XÝžOLÌ‹\Ë—Ü™YY™™XÝœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜Ú\™ÙY™ŒH‹LJJN\Ë˜ÛX\”™YY™—ØNM

__KKœ›ÝÝ\K˜ÛX\”™YY™—ØNMY[˜Ý[ÛŠ
^Ý\Ë—Ü™YY™™XÝ	‰Š\Ë—Ü™YY™™XÝ™\Ý›ÞJ
K\Ë—Ü™YY™™XÝ[[
_KKœ›ÝÝ\K›Û•ÝXÚØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë›\Ž\Ë—ÛX]\˜Z[[™›Ë™[›ÝYÚÓSX\šÔÞ\Ý[Kš[œÊ
KœÙ[™\Ü˜YJ
N•\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈ™Ý^pê›ˆxnáÝHŠNØœ™XZÎØØ\ÙH\Ë›Z^][U•šY]ÓYÜ‹š[œÊ
K›Ü[ŠSX\šÓZ^Ú[ŠNØœ™XZÎØØ\ÙH\ËœÚÚ[˜Ø\ÙH\ËœÚÚ[N˜Ø\ÙH\ËœÚÚ[Ž˜Ø\ÙH\ËœÚÚ[Î˜Ø\ÙH\ËœÚÚ[˜Ø\ÙH\ËœÚÚ[N˜Ø\ÙH\ËœÚÚ[Ž•šY]ÓYÜ‹š[œÊ
K›Ü[ŠSX\šÔÚÚ[\ÕÚ[‹\™Ù]™Ù]Ù™Ê
J__KKœ›ÝÝ\K\]QY™—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]ÌNÚYŠOŒJ^Ý˜\ˆO[™]È]ZK’[XYÙJž—ÝÚ[™Ý\ŠÙJNÚKšÜš^›Û[Ù[\LK™\XØ[Ù[\LKœØØ[VZKœØØ[VOKNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
JNÜËÊÜØØ[VŒKKØØ[VNŒKK[NŒKL
K˜Ø[
[˜Ý[ÛŠ
^Ñ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
J_K\ÊK\Ë˜XÝY™‹˜YÚ[
J__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
SX\šÔ[™[œ›ÝÝ\K“SX\šÔ[™[ŠKÚ[™ÝË“SX\šÔ[™[SSX\šÔ[™[Ý˜\ˆSX\šÔÚÚ[][OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKÝXÚ[˜X›YHLKÝXÚÚ[™[HLKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑKK˜YÔÝYÙWØNMJK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\KœÙ]Ù™ÏY[˜Ý[ÛŠ
^Ý\Ë—ØÙ™Ï]\Ë\]WØNM

_KKœ›ÝÝ\K™Ù]Ù™ÏY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ØÙ™ßKKœ›ÝÝ\K˜YÔÝYÙWØNMY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑK\Ë˜YÔÝYÙWØNM\ÊKY\ÜØYÙPÙ[\‹˜Y\Ý[™\ŠSX\šÔÞ\Ý[Kš[œÊ
KœÜÝX\šÑ]R[™›Ë\Ë\]WØNM\ÊKY\ÜØYÙPÙ[\‹˜Y\Ý[™\Š\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ë\]WØNM\ÊKY\ÜØYÙPÙ[\‹˜Y\Ý[™\Š\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ë\]WØNM\ÊK\Ë˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™TÝYÙWØNM\Ê_KKœ›ÝÝ\Kœ™[[Ý™TÝYÙWØNMY[˜Ý[ÛŠ
^ÓY\ÜØYÙPÙ[\‹š[œÊ
Kœ™[[Ý™P[
\ÊK\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™TÝYÙWØNM\Ê_KKœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^ÚYŠ\Ë—ØÙ™Ê^Ý\ËœÚÚ[[YËœÛÝ\˜ÙO]\Ë—ØÙ™ËšXÛÛ‹\ËœÚÚ[˜[YK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ\Ë—ØÙ™ËœÚÚ[˜[YJNÝ˜\ˆSSX\šÔÞ\Ý[Kš[œÊ
K™Ù]ÚÚ[žRY
\Ë—ØÙ™ËšY
NÚYŠ\Ë›ØÚËš\ÚX›OH]\Ëœ™YÚ[š\ÚX›OHLKHO]\Ë—ØÙ™ËšY
^Ý˜\ˆO]SØš™XÝšÙ^\ÊÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÝ\Ë—ØÙ™ËšYJK›[™ÝÚYŠJ\™]\›ŽÝ˜\ˆOQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÝ\Ë—ØÙ™ËšYVÌ]ÌN
ÌWNÚYŠK˜ÛÜÝ][J^Ý˜\ˆÏJÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÚK˜ÛÜÝ][WK\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
K˜ÛÜÝ][JJK\ÏÜË˜ÛÝ[ŒÝ\Ëœ™YÚ[š\ÚX›O[ZK˜ÛÜÝÛÝ[	‰“SX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓZKœÝ[\]™[___K_J]ZKÛÛ\Û™[
N××Ü™Y›XÝ
SX\šÔÚÚ[][Kœ›ÝÝ\K“SX\šÔÚÚ[][HŠKÚ[™ÝË“SX\šÔÚÚ[][OSSX\šÔÚÚ[][NÝ˜\ˆSX\šÔÚÚ[\ÕÚ[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[›X\šÔÚÚ[\È‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë—ØÙ™Ï]ÌK\Ë˜YÝXÚ]™[
\Ë\Ë›Û•ÝXÚØNM
K\Ë›ØœÙ\™JSX\šÔÞ\Ý[Kš[œÊ
KœÜÝX\šÑ]R[™›Ë\Ëœ™\Ù]Ù™×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ë\]Q]WØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ë\]Q]WØNM
K\Ë\]Q]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›Û•ÝXÚØNM
K\Ëœ™[[Ý™SØœÙ\™J
K\Ë—ÝZQY™™XÝ	‰Š\Ë—ÝZQY™™XÝ™\Ý›ÞJ
K\Ë—ÝZQY™™XÝ[[
_KKœ›ÝÝ\Kœ™\Ù]Ù™×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆSSX\šÔÞ\Ý[Kš[œÊ
K™Ù]ÚÚ[žRY
\Ë—ØÙ™ËšY
NÝ
LJK\Ë—ØÙ™ÏQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÝ\Ë—ØÙ™ËšYVÝK\Ë\]Q]WØNM

_KKœ›ÝÝ\K\]Q]WØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ý\œ™[Ý]OHœÚÚ[ŠÊ\Ë—ØÙ™ËšYLJK\ËœÚÚ[[YËœÛÝ\˜ÙO]\Ë—ØÙ™ËšXÛÛ‹\Ë›˜[Y]^]\Ë—ØÙ™ËœÚÚ[˜[YNÝ˜\ˆSSX\šÔÞ\Ý[Kš[œÊ
K™Ù]ÚÚ[žRY
\Ë—ØÙ™ËšY
NÚYŠ\Ë›^H“‹ˆŠÝ\Ëœ™YÚ[š\ÚX›OHLK\Ë›™^]™[^Hˆ‹OO]\Ë—ØÙ™ËšY
^Ý˜\ˆOLOSSX\šÔÞ\Ý[Kš[œÊ
K™Ù]ÚÚ[žRY
ÊKÏZOÑÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÌ×VÚWKœ™[ØY[YNŒ]\Ë—ØÙ™ËœÚÚ[YÏ]\Ë—ØÙ™ËœÝ[\ÝÓSX\šÔÞ\Ý[Kš[œÊ
K™Ù]ÚÚ[žRY
ŠI‰ŠOSSX\šÔÞ\Ý[Kš[œÊ
K™Ù]ÚÚ[žRY
ŠKQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÌ—VÚWKœÚÚ[YÏQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÌ—VÚWKœÝ[\
NœÏLÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[Ñ\ØÖÑÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[ÖÛ—K™\Ø×NÙOJK˜Ù\ÊKÌYLÏŒ\ËšÙ^Q\ØÝ^H•8nçZHÚX[ˆ¸n¨\± Û™È1¬8nèÛ™ûï&ˆŠÙJÈˆÚpèžH‹\ËœÚÚ[\ØÝ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJK™\ØËœ™\XÙJžÌH‹ŸÎLŽ	•ˆŠÊKÛÏŒ
JÈŸŠKœ™\XÙJžÌ_H‹ŸÎLŽ	•ˆŠÛÊÈŸŠJK\Ë™[XYÙQ\ØÝ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓÑÛØ˜[ÛÛ™šYË‘›[YTÝ[\]™[ÓSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓ—K˜[]\ØÎˆˆŠ_Y[Ù^ÌO]\Ë—ØÙ™ËšYÏO]\Ë—ØÙ™ËšYÏO]\Ë—ØÙ™ËšYÝ\ËšÙ^Q\ØÝ^Høn©\8näZH1$X{ï&ˆŠÓØš™XÝšÙ^\ÊÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÝ\Ë—ØÙ™ËšYJK›[™Ý\ËšÙ^Q\ØÝ^H•8nâH8náÈðëXÚøn¨];ï&ˆŠÊÛØ˜[ÛÛ™šYËÛÛ™šYÑY™™XÝÖÍO]\Ë—ØÙ™ËšYÝ\Ë—ØÙ™ËœÙ[‘Y™’Y\Ë—ØÙ™Ë™Y™’YKœ›Ø˜Xš[]PY™‹ÌLŒ
JÈ‰H‹\ËœÚÚ[\ØÝ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ\Ë—ØÙ™ËœÚÚ[\ØÊNÝ˜\ˆ]SØš™XÝšÙ^\ÊÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÝ\Ë—ØÙ™ËšYJK›[™ÝÚYŠ\Ë˜ÛÜÝš\ÚX›OHLK\Ë\]Kš\ÚX›OHLK\Ëœ™YÚ[š\ÚX›OHLK\Š^Ý˜\ˆQÛØ˜[ÛÛ™šYË‘›[YTÝ[\Y™™XÝÝ\Ë—ØÙ™ËšYVÌ]ÌN
ÌWNÚYŠ˜ÛÜÝ][J^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÚ˜ÛÜÝ][WNÝ\Ë˜ÛÜÝ[YËœÛÝ\˜ÙO[šXÛÛŠÈ—Ü™ÈŽÝ˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
˜ÛÜÝ][JKÏXÏØË˜ÛÝ[ŒÝ\Ë˜ÛÜÝ[K^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸÎˆŠÊÏ˜ÛÜÝÛÝ[ÌMÌLMŽŒLÍÍŽÌJJÈ‰•–ŠÚ˜ÛÜÝÛÝ[
ÈŸŠK\Ëœ™YÚ[š\ÚX›O[ÏZ˜ÛÜÝÛÝ[	‰“SX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓZœÝ[\]™[\Ë—Û™^Ù™ÏZSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓZœÝ[\]™[Ê\Ë˜ÛÜÝš\ÚX›O[Ï˜ÛÜÝÛÝ[\Ë\]Kš\ÚX›OH]\Ë˜ÛÜÝš\ÚX›K\Ëœ™YÚ[š\ÚX›O]\Ë\]Kš\ÚX›JN\Ë›™^]™[^H“[šÚ0èH1$xn¨]øn©\ŠÚœÝ[\]™[
ÈˆxnçÈÚ0ìØH°è›™Èøn©\‚ŸY[ÙHSX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓœÝ[\]™[	‰Š\Ë›™^]™[^H“[šÚ0èH1$xn¨]øn©\ŠÚœÝ[\]™[
Èˆ8nìH1$xnæ[™È°è›™Èøn©\Š__]\Ë—ÝZQY™™XÝ
\Ë—ÝZQY™™XÝSØš”ÛÛœÜ
“XÐ[š[X][ÛˆŠK\ËZYY™‹˜YÚ[
\Ë—ÝZQY™™XÝ
JK\Ë—ÝZQY™™XÝœ^Qš[JˆŠÔ™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÝ\Ë—ØÙ™ËZQY™‹LJ_KKœ›ÝÝ\K›Û•ÝXÚØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë\]N\Ëœ™YÚ[š\ÚX›OÓSX\šÔÞ\Ý[Kš[œÊ
KœÙ[™\ÚÚ[
\Ë—ØÙ™ËšY
N\Ë—Û™^Ù™ËœÝ[\]™[“SX\šÔÞ\Ý[Kš[œÊ
K›SX\šÓÕ\Ù\•\Ëš[œÊ
KœÚÝÕ\Êøn©Ûˆ[šÚ0èH1$xn¨]ŠÈøn©\ŠÝ\Ë—Û™^Ù™ËœÝ[\]™[
ÈˆŠN•\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈ™Ý^pê›ˆxnáÝHŠ__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
SX\šÔÚÚ[\ÕÚ[‹œ›ÝÝ\K“SX\šÔÚÚ[\ÕÚ[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊSX\šÔÚÚ[\ÕÚ[‹^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ\™Ù]\ÝÐÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK›X\Ý\]Õ\™Ù]^ßKK\ÐÑHLKK˜]XÚÓYR[™\ÏV×KK˜Ø[]XÚÒ[™\ÏV×KK›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝ[]RÚ[™ÙKK˜]XÚÐ[™ÚÝÕ\Ü\˜]WØNM
KK›ØœÙ\™J˜]PÐÔÞ\Ý[Kš[œÊ
KœÜÝ[\”ÝXØÙ\Ü×ØNMK˜Ø[\Ú[™ÙSÜ\˜]WØNM
KK›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝ[]Õ\™Ù]K\]P]Õ\™Ù]Ü\˜]WØNM
KK›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝ[\“X\K›Û‘[\“X\Ü\˜]WØNM
K_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Û‘[\“X\Ü\˜]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ÎÝ\Ë›X\Ý\]Õ\™Ù]^ßK\Ë˜]XÚÓYR[™\Ë›[™ÝL\Ë˜Ø[]XÚÒ[™\Ë›[™ÝL[Y\“YÜ‹š[œÊ
Kœ™[[Ý™P[
\ÊKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\™Ù]\ÝšY]ÊK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠŒK[˜Ý[ÛŠ
^Ýš\ÔÚÝÉ‰Š[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLË\]WØNM
K\]WØNM

KÚ]PÐÔÞ\Ý[Kš[œÊ
Kš\ÐÚ]_šY]ÓYÜ‹š[œÊ
K›Ü[Š\™Ù]\ÝšY]ÊJ_K\Ê_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\Kš\ÔÚÝÈ‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÚ]PÐÔÞ\Ý[Kš[œÊ
Kš\ÐÚ]_˜]PÐÔÞ\Ý[Kš[œÊ
Kš\Ð˜]WØNM

_[ÑX[”Þ\Ð˜\ÙPÐËš[œÊ
Kš\Ô[ÑX[ŸÝÐ›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
Kš\ÑÝÐ›ÜÜßÝÐ›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
Kš\ÑÝÕÜ›ÜÜß\šÓZ›ÜÜÙ\Ëš[œÊ
Kš\Ñ\šÐ›ÜÜßÒ˜]YšY[Þ\Ëš[œÊ
Kš\ÕÒ˜]_Ñ›ÜÜÔÞ\Ëš[œÊ
Kš\ÒÑ›ÜÜÐ˜]_]š[ÛTÞ\Ð˜\ÙKš[œÊ
Kš\Ñ]š[ÛP˜]_Ù\™[˜TÞ\Ëš[œÊ
Kš\ÒÑ\™[˜_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^Ý\Ëš\ÔÚÝÉ‰Š\ËœÜÝÚ[™ÙPØ[]XÚÒ[™J
K\Ë\]P]XÚÓYWØNM

J_KKœ›ÝÝ\K˜Ø[\Ú[™ÙSÜ\˜]WØNMY[˜Ý[ÛŠ
^ÚYŠ˜]PÐÔÞ\Ý[Kš[œÊ
Kš\Ð˜]WØNM

J^Ý˜\ˆ]›ÚYOQ[]SYÜ‹š[œÊ
K™Ù][[]J
NÙ›ÜŠ˜\ˆH[ˆJ]YVÚWK	‰š[™›Ó[Ù[	‰š[™›Ó[Ù[\OOQ[]U\K”›ÛI‰ŠœÙ]Ú\“˜[YJš[™›Ó[Ù[™ÝZ[[™˜[YJK\]S˜[YPÛÛÜŠ
J__KKœ›ÝÝ\KœÜÝÚ[™ÙPØ[]XÚÒ[™OY[˜Ý[ÛŠ
^Ý˜\ˆOQ[]SYÜ‹š[œÊ
K™Ù][[]J
NÝ\Ë˜Ø[]XÚÒ[™\Ë›[™ÝLÝ˜\ˆKÏHLKPÚ]PÐÔÞ\Ý[Kš[œÊ
Kš\ÐÚ]_ÝÐ›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
Kš\ÑÝÐ›ÜÜßÝÐ›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
Kš\ÑÝÕÜ›ÜÜßÑ›ÜÜÔÞ\Ëš[œÊ
Kš\ÒÑ›ÜÜÐ˜]_\šÓZ›ÜÜÙ\Ëš[œÊ
Kš\Ñ\šÐ›ÜÜß]š[ÛTÞ\Ð˜\ÙKš[œÊ
Kš\Ñ]š[ÛP˜]_Ù\™[˜TÞ\Ëš[œÊ
Kš\ÒÑ\™[˜NÙ›ÜŠ˜\ˆÈ[ˆJZYŠYVÛ×KO]š[™›Ó[Ù[
ZYŠK\OOQ[]U\K”›ÛJLO]š\ÔØY™]J
I‰šK™Ù]]
]šX]U\K˜]
OŒ	‰Š˜]PÐÔÞ\Ý[Kš[œÊ
Kš\Ð˜]WØNM

OÚK˜Ø[\Œ	‰šK˜Ø[\OP˜]PÐÔÞ\Ý[Kš[œÊ
K˜Ø[\	‰\Ë\]PØ[]XÚÒ[™WØNM
K›X\Ý\’[™KL
N‘]š[ÛTÞ\Ð˜\ÙKš[œÊ
Kš\Ñ]š[ÛP˜]OÊZK™ÝZ[QK™ÝZ[Q	‰šK™ÝZ[QOQÝZ[]Kš[œÊ
K™ÝZ[Q
I‰\Ë\]PØ[]XÚÒ[™WØNM
š[™›Ó[Ù[›X\Ý\’[™KL
N\Ë\]PØ[]XÚÒ[™WØNM
K›X\Ý\’[™KL
JNÙ[ÙHYŠK\OOQ[]U\K“[ÛœÝ\‰‰šK™Ù]]
]šX]U\K˜]
OŒ	‰ˆ\Ê^ÚYŠŠXÛÛ[YNÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÓ[ÛœÝ\œÖÚK˜ÛÛ™šYÒQNÚYŠXJXÛÛ[YNÚYŠOXK\_ÏOXK\JXÛÛ[YNÚYŠ]\Ë˜ÚXÚÓ[Û’XYØNM
JJXÛÛ[YNËLOOQÛØ˜[ÛÛ™šYËÛÛ™šYÐØ[\˜]K››Ð]XÚËš[™^ÙŠK˜ÛÛ™šYÒQ
I‰ŠÏHL\Ë\]PØ[]XÚÒ[™WØNM
Kš[™KLL
J_RÑ›ÜÜÔÞ\Ëš[œÊ
Kš\ÒÑ›ÜÜÐ˜]I‰’Ñ›ÜÜÔÞ\Ëš[œÊ
K™›YÒ[™I‰’Ñ›ÜÜÔÞ\Ëš[œÊ
K™›YÕ[Y\ÏŒÝ\Ë\]PØ[]XÚÒ[™WØNM
Ñ›ÜÜÔÞ\Ëš[œÊ
K™›YÒ[™KLL
N’Ù\™[˜TÞ\Ëš[œÊ
Kš\ÒÑ\™[˜I‰’Ù\™[˜TÞ\Ëš[œÊ
K™›YÒ[™I‰\Ë\]PØ[]XÚÒ[™WØNM
Ù\™[˜TÞ\Ëš[œÊ
K™›YÒ[™KLL
_KKœ›ÝÝ\K˜ÚXÚÓ[Û’XYØNMY[˜Ý[ÛŠ
^Ü™]\›ˆP\ÜÙ\
šXY¹ *¹âjyi-9`ãù.#ykf9g*{ï#YˆŠÝšY
È‹˜[YNˆŠÝ›˜[YJ_KKœ›ÝÝ\K\]P]XÚÓYWØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLO]\Ë˜]XÚÓYR[™\ÎÝK›[™ÝÝ
ÊÊ^Ý˜\ˆOYVÝKÏQ[]SYÜ‹š[œÊ
K™Ù]X\Ý\“\Ý
JNÚYŠÉ‰ŒO\Ë›[™Ý
^Ù›ÜŠ˜\ˆHLÏLO\ÎÛÏK›[™ÝÛÊÊÊ^Ý˜\ˆXVÛ×NÚYŠ‰‰œ‹š[™›Ó[Ù[	‰œ‹š[™›Ó[Ù[™Ù]]
]šX]U\K˜]
OŒ
^ÛHLNØœ™XZß_[‰‰\ËœÜÝ\™Ù]\Ý
K
_Y[ÙH\ËœÜÝ\™Ù]\Ý
K
__KKœ›ÝÝ\K˜ÛX\Y[˜Ý[ÛŠ
^Ý\Ë˜]XÚÓYR[™\Ë›[™ÝL\Ë˜Ø[]XÚÒ[™\Ë›[™ÝLØ[YSÙÚXÓX[˜YÙKš[œÊ
K˜Ý\œ]XÚÒ[™OL\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
K›[ÛœÝ\’QLKKœ›ÝÝ\K\]PØ[]XÚÒ[™WØNMY[˜Ý[ÛŠKJ^Ý›ÚYOOZI‰ŠOHLJNÝ˜\ˆÏQ[]SYÜ‹š[œÊ
K™Ù]›ÛÝX\Ý\’[™J
NÚYŠO\É‰œÈOPXÝÜ‹š[™J^Ý˜\ˆ]\Ë˜Ø[]XÚÒ[™\Ëš[™^ÙŠÊNÙI‰‹LOO[ÚOÝ\Ë˜Ø[]XÚÒ[™\Ë[œÚY
ÊN\Ë˜Ø[]XÚÒ[™\Ëœ\Ú
ÊN™_LOO[Ÿ\Ë˜Ø[]XÚÒ[™\ËœÜXÙJ‹J__KKœ›ÝÝ\KœÜÝ\™Ù]\ÝY[˜Ý[ÛŠJ^ÚYŠO]OYJ^Ý˜\ˆOQ[]SYÜ‹š[œÊ
K™Ù]›ÛÝX\Ý\’[™J
KÏQ[]SYÜ‹š[œÊ
K™Ù]›ÛÝX\Ý\’[™JJK]\Ë˜]XÚÓYR[™\Ëš[™^ÙŠJNÚYŠOOPXÝÜ‹š[™J^Ý˜\ˆÏQ[]SYÜ‹š[œÊ
K™Ù][]PžR[™JJNÚYŠÉ‰›Ëš[™›Ó[Ù[	‰›Ëš[™›Ó[Ù[\OOQ[]U\KÛÛXÝ[Û“[ÛœÝ
\™]\›ŽÛÉ‰›Ëš[™›Ó[Ù[	‰›Ëš[™›Ó[Ù[™Ù]]
]šX]U\K˜]
OŒÑØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÚ[™ÙU\™Ù]
Ëš[™›Ó[Ù[\OOQ[]U\K“[ÛœÝ\ÛËš[™›Ó[Ù[š[™N›Ëš[™›Ó[Ù[›X\Ý\’[™JNŠØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÚ[™ÙU\™Ù]

KšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\™Ù]^Y\šYÐ›ÛÙšY]ÊJKšY]ÓYÜ‹š[œÊ
Kš\ÔÚÝÊ\™Ù]\ÝšY]ÊI‰•šY]ÓYÜ‹š[œÊ
K™Ù]šY]Ê\™Ù]\ÝšY]ÊKœÚÝÕ\™Ù]
OYJ_Y[ÙKLHO[‰‰ŒO\É‰\Ë˜]XÚÓYR[™\ËœÜXÙJ‹J__KKœ›ÝÝ\K˜]XÚÐ[™ÚÝÕ\Ü\˜]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]ÌKO]ÌWKÏJÌ—KÌ×JNÚYŠ\Ëš\ÔÚÝÉ‰™I‰šI‰ˆJ\ÊI‰ŠKš\Ó^_Kš\Ó^JJ^Ý˜\ˆQ[]SYÜ‹š[œÊ
K™Ù]›ÛÝX\Ý\’[™JKš[™›Ó[Ù[š[™JKÏQ[]SYÜ‹š[œÊ
K™Ù]›ÛÝX\Ý\’[™JKš[™›Ó[Ù[š[™JNÚYŠÈOPXÝÜ‹š[™I‰›OPXÝÜ‹š[™J\™]\›ˆ›ÚY
OQØ[YSÙÚXÓX[˜YÙKš[œÊ
K˜Ý\œ]XÚÒ[™_šY]ÓYÜ‹š[œÊ
Kš\ÔÚÝÊ\™Ù]^Y\šYÐ›ÛÙšY]Ê_
˜]PÐÔÞ\Ý[Kš[œÊ
Kš\Ð˜]WØNM

_[ÑX[”Þ\Ð˜\ÙPÐËš[œÊ
Kš\Ô[ÑX[ÕšY]ÓYÜ‹š[œÊ
K›Ü[Š\™Ù]^Y\šYÐ›ÛÙšY]ÊNÚ]PÐÔÞ\Ý[Kš[œÊ
Kš\ÐÚ]I‰ŒOPÚ]PÐÔÞ\Ý[Kš[œÊ
K˜Ú]P›ÜÜÒY	‰•šY]ÓYÜ‹š[œÊ
K›Ü[Š\™Ù]^Y\šYÐ›ÛÙšY]ÊJJNÝ˜\ˆO]\Ë˜]XÚÓYR[™\Ëš[™^ÙŠŠNËLOOXI‰›ÏOPXÝÜ‹š[™I‰›ˆOPXÝÜ‹š[™I‰\Ë›X\Ý\]Õ\™Ù]Û—OO[É‰šKš[™›Ó[Ù[\OOQ[]U\K”›ÛI‰Š\Ë˜]XÚÓYR[™\Ëœ\Ú
ŠK\Ë˜]XÚÓYR[™\Ë›[™ÝŒ	‰ŠšY]ÓYÜ‹š[œÊ
Kš\ÔÚÝÊ\™Ù]\ÝšY]Ê_
šY]ÓYÜ‹š[œÊ
K›Ü[Š\™Ù]\ÝšY]ÊKÚ]PÐÔÞ\Ý[Kš[œÊ
KœÜÝÚ[™ÙP]XÚÔÝ]YJJJJK\ËœÜÝ\™Ù]\Ý

JKKš[™›Ó[Ù[š\Ó^I‰™Kš[™›Ó[Ù[™Ù]]
]šX]U\K˜]
OL	‰ˆQ[]SYÜ‹š[œÊ
K™Ù]›ÑYT›ÛJ
I‰•šY]ÓYÜ‹š[œÊ
Kš\ÔÚÝÊ\™Ù]\ÝšY]ÊI‰•šY]ÓYÜ‹š[œÊ
K™Ù]šY]Ê\™Ù]\ÝšY]ÊKœÚÝÕ\™Ù]
LJ__KKœ›ÝÝ\K\]P]Õ\™Ù]Ü\˜]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]ÌKO]ÌWKÏQ[]SYÜ‹š[œÊ
K™Ù]›ÛÝX\Ý\’[™JJKQ[]SYÜ‹š[œÊ
K™Ù]›ÛÝX\Ý\’[™JJNÝ\Ë›X\Ý\]Õ\™Ù]Ü×O[ŸKKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_K_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
\™Ù]\ÝÐËœ›ÝÝ\K•\™Ù]\ÝÐÈŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý\™Ù]\ÝÐÏU\™Ù]\ÝÐËš[œË˜š[™
\™Ù]\ÝÐÊ_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆ\™Ù]\ÝšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[•\™Ù]\Ý‹K›\ÝKš][T™[™\™\UÛÜ››ÜÜÙ\ÒXY™[™\‹K›\Ý‹š][T™[™\™\U\™Ù]Y[X™\’XY™[™\‹K›\ÝËš][T™[™\™\U\™Ù]Y[X™\’XY™[™\‹K›\Ý‘[™]È]ZK\œ˜^PÛÛXÝ[Û‹K›\Ý‘œÛÝ\˜ÙOU\™Ù]\ÝÐËš[œÊ
K˜Ø[]XÚÒ[™\ËK›\Ý‹™]T›ÝšY\YK›\Ý‘_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÚ[™ÙU\™Ù]\Ë\]U\™Ù][™›×ØNM
K\Ë›ØœÙ\™J\™Ù]\ÝÐËš[œÊ
KœÜÝ\™Ù]\Ý\Ë\]P™P]XÚÓ\Ý[™›×ØNM
K\Ë›ØœÙ\™J\™Ù]\ÝÐËš[œÊ
KœÜÝÚ[™ÙPØ[]XÚÒ[™K\Ë\]PØ[]XÚÓ\Ý™\Ý[ØNM
K\Ë\]WØNM

K\Ë˜]XÚÑÜ›Ý\š\ÚX›OHL_KKœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^Ý\Ë\]U\™Ù][™›×ØNM

K\Ë\]P™P]XÚÓ\Ý[™›×ØNM

K\Ë\]PØ[]XÚÓ\Ý™\Ý[ØNM

_KKœ›ÝÝ\KœÚÝÕ\™Ù]Y[˜Ý[ÛŠ
^Ý\Ë˜]XÚÑÜ›Ý\š\ÚX›O]KKœ›ÝÝ\K\]U\™Ù][™›×ØNMY[˜Ý[ÛŠ
^ÚYŠ\Ë˜]XÚÑÜ›Ý\š\ÚX›JZYŠ\Ë›\ÝK™]T›ÝšY\Š^Ý˜\ˆ]\Ë›\ÝK™]T›ÝšY\ŽÝœ™\XÙP[
ÑØ[YSÙÚXÓX[˜YÙKš[œÊ
K˜Ý\œ]XÚÒ[™WJ_Y[ÙH\Ë›\ÝK™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠÑØ[YSÙÚXÓX[˜YÙKš[œÊ
K˜Ý\œ]XÚÒ[™WJ_KKœ›ÝÝ\K\]P™P]XÚÓ\Ý[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\™Ù]\ÝÐËš[œÊ
K˜]XÚÓYR[™\ÎÚYŠ\Ë˜™P]XÚÑÜ›Ý\š\ÚX›O]›[™ÝŒ\Ë˜™P]XÚÑÜ›Ý\š\ÚX›JZYŠ\Ë›\ÝË™]T›ÝšY\Š^Ý˜\ˆO]\Ë›\ÝË™]T›ÝšY\ŽÙKœ™\XÙP[

_Y[ÙH\Ë›\ÝË™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ
_KKœ›ÝÝ\K\]PØ[]XÚÓ\Ý™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\™Ù]\ÝÐËš[œÊ
K˜Ø[]XÚÒ[™\ÎÝ\Ë˜Ø[]XÚÑÜ›Ý\š\ÚX›O]›[™ÝŒ\Ë˜Ø[]XÚÑÜ›Ý\š\ÚX›I‰\Ë›\Ý‘œ™\XÙP[
\™Ù]\ÝÐËš[œÊ
K˜Ø[]XÚÒ[™\Ê_K×ÙXÛÜ˜]JØØ[]\—KKœ›ÝÝ\K\]U\™Ù][™›×ØNM‹[
K×ÙXÛÜ˜]JØØ[]\—KKœ›ÝÝ\K\]P™P]XÚÓ\Ý[™›×ØNM‹[
K×ÙXÛÜ˜]JØØ[]\—KKœ›ÝÝ\K\]PØ[]XÚÓ\Ý™\Ý[ØNM‹[
K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
\™Ù]\ÝšY]Ëœ›ÝÝ\K•\™Ù]\ÝšY]ÈŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý\™Ù]\Ý[™[Y[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
Kœ™YÊ\™Ù]\ÝšY]Ë^Y\“YÜ‹“XZ[—ÕšY]Ê__JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆ\™Ù]Y[X™\’XY™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕTK›ÛÛXÚËJK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K™]PÚ[™ÙY˜Ø[
\ÊK\Ëœ™[[Ý™P]Y™Š
_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^Ú\Ó˜SŠ\Ë™]J_
\ËœÚÝÑY™Š
KÞ\ÔÙ][™Ñ]Kš[œÊ
KœÙ]˜[YJ›X\ÛXÚÕ‹
KÞ\ÔÙ][™Ñ]Kš[œÊ
KœÙ]˜[YJ›X\ÛXÚÕH‹
KÑ›ÜÜÔÞ\Ëš[œÊ
K™›YÒ[™OO\\œÙR[
\Ë™]JOÒÑ›ÜÜÔÞ\Ëš[œÊ
K™›YÐÑYYÜ™]™Ù][Y\Š
OŒÕ\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎˆŠÐÛÛÜ•][”‘Q
È‰•“0èHønçHÚ1¬H0èHxnæÚH_ŠN’Ñ›ÜÜÔÞ\Ëš[œÊ
KœÙ[™ÛÛXÝ›YÊ
N’Ù\™[˜TÞ\Ëš[œÊ
K™›YÒ[™OO\\œÙR[
\Ë™]JOÒÙ\™[˜TÞ\Ëš[œÊ
K™›YÐÑYYÜ™]™Ù][Y\Š
OŒÕ\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎˆŠÐÛÛÜ•][”‘Q
È‰•“0èHønçHÚ1¬H0èHxnæÚH_ŠN’Ù\™[˜TÞ\Ëš[œÊ
KœÙ[™ÛÛXÝ›YÊ
N‘Ø[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÚ[™ÙP]”ÜÊ\Ë™]JJ_K_JÛÜ››ÜÜÙ\ÒXY™[™\ŠN××Ü™Y›XÝ
\™Ù]Y[X™\’XY™[™\‹œ›ÝÝ\K•\™Ù]Y[X™\’XY™[™\ˆŠNÝ˜\ˆ\™Ù]^Y\šYÐ›ÛÙšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Ý\•˜[YOLK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[•\™Ù]^Y\”ÛX[›ÛÙ‹\Ë™Ü˜^R[YËœÛÝ\˜ÙOH˜›ÜÜÚˆ‹\Ë™Ü˜^R[YÓX\ÚÏ[™]ÈYÜ™]”™XÝ[™ÛJ\Ë™Ü˜^R[YËÚY\Ë™Ü˜^R[YËšZYÚ
K\Ë™Ü˜^R[YË›X\ÚÏ]\Ë™Ü˜^R[YÓX\ÚËK‘ÔVRSQ×ÕÒQ]\Ë™Ü˜^R[YËÚY\Ëœ^Y\›ÛÙÜ›Ý\ÜP˜]PÐÔÞ\Ý[Kš[œÊ
Kš\Ð˜]WØNM

_[ÑX[”Þ\Ð˜\ÙPÐËš[œÊ
Kš\Ô[ÑX[Ý\Ëœ^Y\›ÛÙÜ›Ý\ÜŒKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝ[]RÚ[™ÙK\Ë\]R[™›×ØNM
K\Ë›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÚ[™ÙU\™Ù]\Ë\]U\™Ù]Ü\˜]WØNM
K\Ë›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÝ\]Ú[™ÙK\Ë\]P][™›×ØNM
K\Ë\]U\™Ù]Ü\˜]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë™Ü˜^R[YÓX\ÚÉ‰™YÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë™Ü˜^R[YÓX\ÚÊK\Ë˜Ý\œ]XÚÒ[™OLKKœ›ÝÝ\K˜Ú[™ÙR[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆQ[]SYÜ‹š[œÊ
K™Ù][]\ÐžSX\Ý\š[™J\Ë˜Ý\œ]XÚÒ[™K[]U\K”›ÛJNÚYŠ	‰›[™ÝŒ
^Ù›ÜŠ˜\ˆO]›[™ÝOLÏLLÏLOLÙO˜NØJÊÊ^Ý˜\ˆ]ØWNÚYŠŠ^Ý˜\ˆ\‹š[™›Ó[Ù[™Ù]]
]šX]U\K˜]
_\‹š[™›Ó[Ù[™Ù]]
]šX]U\K˜]X^
_ÚJÏZÊÏ[Ý˜\ˆÏ\‹š[™›Ó[Ù[™Ù]]
]šX]U\K˜ÜS™ZQÛÛ™Ê_O\‹š[™›Ó[Ù[™Ù]]
]šX]U\K›X^™ZQÛÛ™Ê_ÛŠÏXËÊÏ]__P˜]PÐÔÞ\Ý[Kš[œÊ
Kš\Ð˜]WØNM

I‰ŠOZKÜÊŒLÏLL
K\ËšY[˜›ÛÙ˜\Œ›X^[][O[Ë\ËšY[˜›ÛÙ˜\Œ˜[YO[‹\Ë˜Ý\•˜[YOSX]™›ÛÜŠKÜÊŒL
K\ËÙY[›ÛÙWØNM
ËJK\ËÙY[›ÛÙØNM
ËJ_Y[Ù^Ý˜\ˆQ[]SYÜ‹š[œÊ
K™Ù][]PžR[™J\Ë˜Ý\œ]XÚÒ[™JNÚYŠ	‰œš[™›Ó[Ù[	‰œš[™›Ó[Ù[\OOQ[]U\K“[ÛœÝ\Š^Ý\ËšY[˜›ÛÙ˜\Œ›X^[][O\š[™›Ó[Ù[™Ù]]
]šX]U\K›X^™ZQÛÛ™Ê_\ËšY[˜›ÛÙ˜\Œ˜[YO\š[™›Ó[Ù[™Ù]]
]šX]U\K˜ÜS™ZQÛÛ™Ê_Ý˜\ˆ\š[™›Ó[Ù[™Ù]]
]šX]U\K˜]X^
_Ï\š[™›Ó[Ù[™Ù]]
]šX]U\K˜]
_Ý\Ë˜Ý\•˜[YOSX]™›ÛÜŠËÙ
ŒL
K\ËÙY[›ÛÙWØNM
ÊK\ËÙY[›ÛÙØNM
Ê___KKœ›ÝÝ\K\]U\™Ù]Ü\˜]WØNMY[˜Ý[ÛŠ
^ÚYŠOQØ[YSÙÚXÓX[˜YÙKš[œÊ
K˜Ý\œ]XÚÒ[™I‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊKO]\Ë˜Ý\œ]XÚÒ[™I‰\Ë˜Ý\œ]XÚÒ[™HOQØ[YSÙÚXÓX[˜YÙKš[œÊ
K˜Ý\œ]XÚÒ[™I‰Š\Ë˜Ý\œ]XÚÒ[™OQØ[YSÙÚXÓX[˜YÙKš[œÊ
K˜Ý\œ]XÚÒ[™KO]\Ë˜Ý\œ]XÚÒ[™JJ^Ý˜\ˆ]›ÚYOQ[]SYÜ‹š[œÊ
K™Ù][]\ÐžSX\Ý\š[™J\Ë˜Ý\œ]XÚÒ[™K[]U\K”›ÛJNÚYŠI‰™K›[™ÝŒ
^ÝYVÌKš[™›Ó[Ù[Ý˜\ˆO]›˜[YKÏZKœÜ]
—ˆŠNÚO\ÖÌWOÜÖÌWNœÖÌK\Ë›˜[YU^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊJK\ËšXYœÛÝ\˜ÙOHž]X[šXYŠÝš›ØŠÈŒ‹\Ë˜Ú[™ÙR[™›×ØNM

_Y[Ù^Ý˜\ˆQ[]SYÜ‹š[œÊ
K™Ù][]PžR[™J\Ë˜Ý\œ]XÚÒ[™JNÚYŠ‰‰›‹š[™›Ó[Ù[	‰›‹š[™›Ó[Ù[\OOQ[]U\K“[ÛœÝ\Š^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÓ[ÛœÝ\œÖÛ‹š[™›Ó[Ù[˜ÛÛ™šYÒQNÝ\Ë›˜[YU^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\ŠË›˜[YJK\ËšXYœÛÝ\˜ÙOH›[ÛšXYŠÛËšXY
È—Ü™È‹\Ë˜Ú[™ÙR[™›×ØNM

____KKœ›ÝÝ\K\]R[™›×ØNMY[˜Ý[ÛŠ
^ÚYŠÚ]PÐÔÞ\Ý[Kš[œÊ
Kš\ÐÚ]_˜]PÐÔÞ\Ý[Kš[œÊ
Kš\Ð˜]WØNM

_[ÑX[”Þ\Ð˜\ÙPÐËš[œÊ
Kš\Ô[ÑX[ŸÝÐ›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
Kš\ÑÝÐ›ÜÜßÝÐ›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
Kš\ÑÝÕÜ›ÜÜÊ^Ý˜\ˆO]ÌNÝÌWKÌ—KÌ×NÈY_Kš[™›Ó[Ù[›X\Ý\’[™HO]\Ë˜Ý\œ]XÚÒ[™I‰™Kš[™›Ó[Ù[š[™HO]\Ë˜Ý\œ]XÚÒ[™_\Ë˜Ú[™ÙR[™›×ØNM

__KKœ›ÝÝ\K\]P][™›×ØNMY[˜Ý[ÛŠ
^Ý	‰š[™›Ó[Ù[	‰ŠÚ]PÐÔÞ\Ý[Kš[œÊ
Kš\ÐÚ]_˜]PÐÔÞ\Ý[Kš[œÊ
Kš\Ð˜]WØNM

_[ÑX[”Þ\Ð˜\ÙPÐËš[œÊ
Kš\Ô[ÑX[ŠI‰Šš[™›Ó[Ù[›X\Ý\’[™OO]\Ë˜Ý\œ]XÚÒ[™_š[™›Ó[Ù[š[™OO]\Ë˜Ý\œ]XÚÒ[™JI‰\Ë˜Ú[™ÙR[™›×ØNM

_KKœ›ÝÝ\KÙY[›ÛÙØNMY[˜Ý[ÛŠJ^Ý˜\ˆOSX]™›ÛÜŠ\Ë™Ü˜^R[YËÚYÝ
™JK]\Ë™Ü˜^R[YËÚYÏ]\ÎÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë™Ü˜^R[YÊNÝ˜\ˆYYÜ™]•ÙY[‹™Ù]
\Ë™Ü˜^R[YËÛÛÚ[™ÙN™[˜Ý[ÛŠ
^ß_KÊNÛ‹ÊÞš_KÌ
K˜Ø[
[˜Ý[ÛŠ
^ßKÊ_KKœ›ÝÝ\KÙY[›ÛÙWØNMY[˜Ý[ÛŠJ^Ý˜\ˆOSX]™›ÛÜŠ\Ë˜›ÛÙ˜\‹ÚYÝ
™JK]\Ë˜›ÛÙ˜\‹ÚYÏ]\ÎÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë˜›ÛÙ˜\ŠNÝ˜\ˆYYÜ™]•ÙY[‹™Ù]
\Ë˜›ÛÙ˜\‹ÛÛÚ[™ÙN™[˜Ý[ÛŠ
^ß_KÊNÛ‹ÊÞš_K
K˜Ø[
[˜Ý[ÛŠ
^ßKÊ_KK‘ÔVRSQ×ÕÒQL_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
\™Ù]^Y\šYÐ›ÛÙšY]Ëœ›ÝÝ\K•\™Ù]^Y\šYÐ›ÛÙšY]ÈŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý\™Ù]^Y\šYÐ›ÛÙ[™[Y[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
Kœ™YÊ\™Ù]^Y\šYÐ›ÛÙšY]Ë^Y\“YÜ‹“XZ[—ÕšY]Ê__JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆXÚY]™[Y[]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^ß\™]\›ˆJ
N××Ü™Y›XÝ
XÚY]™[Y[]Kœ›ÝÝ\KXÚY]™[Y[]HŠNÝ˜\ˆ[Z]\ÚÑ]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\ËšYL\Ë›˜[YOHˆ‹\Ë™\ØÏHˆ‹\Ë\™Ù]L\Ë˜ÛÛ›ÛL\Ë\OL\ËœÝ]OL\Ëœ›ÙÜ™\ÜÏL\™]\›ˆœ›ÝÝ\KœÙ]˜\ÙQ]OY[˜Ý[ÛŠ
^Ý\ËšY]šY\Ë›˜[YO]›˜[YK\Ë™\ØÏ]™\ØË\Ë\™Ù]]\™Ù]\Ë˜]Ø\™\Ý]˜]Ø\™\Ý\Ë˜ÛÛ›Û]˜ÛÛ›Û\Ë˜ÛÛ›Û\™Ù]]˜ÛÛ›Û\™Ù]\Ë\O]\_Kœ›ÝÝ\Kœ\œÙ\Y[˜Ý[ÛŠ
^Ý\Ëœ›ÙÜ™\ÜÏ]œ™XY[

K\ËœÝ]O]œ™XYž]J
_KJ
N××Ü™Y›XÝ
[Z]\ÚÑ]Kœ›ÝÝ\K“[Z]\ÚÑ]HŠNÝ˜\ˆ\ÚÑ]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^ß\™]\›ˆJ
N××Ü™Y›XÝ
\ÚÑ]Kœ›ÝÝ\K•\ÚÑ]HŠNÝ˜\ˆ\Ù\•\ÚÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK›[Z]\ÚÓ\ÝV×KK›[Z]\ÚÑXÏ^ßKK›[Z]\ÚÔÝ]OLK›[Z]\ÚÐÛÝ[LK›[Z]\ÚÑ[™[YOKLKK˜Ý\œ•\ÚÓ\ÝÒYKLKK›\ÝÝ]OKLKKœÞ\ÒYTXÚØYÙRQ•\ÚËKœ™YÓ™]\ÙÊKK™Õ\ÚÑ]T™\Ý[ØNM
KKœ™YÓ™]\ÙÊ‹K™Õ\ÚÐÚ[™ÙQ]T™\Ý[ØNM
KKœ™YÓ™]\ÙÊËK™Õš][]T™\Ý[ØNM
KKœ™YÓ™]\ÙÊK™Õš][]P]Ø\™Ô™\Ý[ØNM
KKœ™YÓ™]\ÙÊKK™ÐXÚY]™Q]T™\Ý[ØNM
KKœ™YÓ™]\ÙÊËK™Ò›Ú[XÚY]™Q]T™\Ý[ØNM
KKœ™YÓ™]\ÙÊK™ÐXÚY]™PÚ[™ÙQ]T™\Ý[ØNM
KKœ™YÓ™]\ÙÊKK™Ó[Z]]PÚ[™ÙT™\Ý[ØNM
KKœ™YÓ™]\ÙÊLK™Õ\]S[Z]]T™\Ý[ØNM
KK˜XÚQ]™[Y[V×K_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\KœÙ[™Ù]Z[U\ÚÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÙKÜš]R[

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™Ù]š][]P]Ø\™ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊŠNÙKÜš]R[

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™Ù]XÚY]™U\ÚÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊÊNÙKÜš]R[

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\K™Õ\ÚÑ]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë\ÚÏV×K\Ëš][]P]Ø\™ÏV×NÙ›ÜŠ˜\ˆO]œ™XY[

KOLÙOšNÚJÊÊ^Ý˜\ˆÏ[™]È\ÚÑ]NÜËšY]œ™XY[

KË˜[YO]œ™XY[

KËœÝ]O]œ™XY[

K\Ë\ÚËœ\Ú
Ê_]\Ëš][]O]œ™XY[

NÙ›ÜŠ˜\ˆ]œ™XY[

KOLÛšNÚJÊÊ^Ý˜\ˆÏ[™]Èš][]Q]NÛËšY]œ™XY[

KËœÝ]O]œ™XY[

K\Ëš][]P]Ø\™Ëœ\Ú
Ê_]\ËœÛÜ\Ú×ØNM

_KKœ›ÝÝ\K™Õ\ÚÐÚ[™ÙQ]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[

KÏYKš[œÊ
K™Ù]\ÚÑ]PžRY
JNÑ\œ›Ü“ÙË\ÜÙ\
Ë•\Ù\•\ÚÈÕ\ÚÐÚ[™ÙQ]HYHŠÚJ_
Ë˜[YO]œ™XY[

KËœÝ]O]œ™XY[

KKš[œÊ
KœÛÜ\Ú×ØNM

KKš[œÊ
KœÜÝ\ÚÐÚ[™ÙQ]J
J_KKœ›ÝÝ\KœÜÝ\ÚÐÚ[™ÙQ]OY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K™Õš][]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ëš][]O]œ™XY[

_KKœ›ÝÝ\K™Õš][]P]Ø\™Ô™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[

KÏ]\Ë™Ù]š][]P]Ø\™ÐžRY
JNÜËœÝ]O]œ™XY[

KKš[œÊ
KœÜÝ\ÚÐÚ[™ÙQ]J
_KKœ›ÝÝ\K™ÐXÚY]™Q]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë˜XÚQ]™[Y[›[™ÝLÙ›ÜŠ˜\ˆO]œ™XY[

KÏLÚOœÎÜÊÊÊ^Ý˜\ˆ[™]ÈXÚY]™[Y[]NÛ‹˜XÚY]™[Y[Y]œ™XY[

K‹šY]œ™XY[

K‹œÝ]O]œ™XY[

K‹˜[YO]œ™XY[

NÝ˜\ˆÏ]\Ë™Ù]XÚY]™PÛÛ™žRY
‹šY
NÛ[O[ÏÙXYËØ\›Š¹¥è9¬åz#­ùo¥ù¢$9l,zacyïkŽˆŠÛ‹šY
È»ï#:+íù¨à9§ézacyïkˆŠN›‹˜XÚY]™[Y[\O[Ë˜XÚY]™[Y[\KYLÏO[‹˜XÚY]™[Y[YÊ\Ë\ÚÕ˜XÙO[‹LÏO]\Ë\ÚÕ˜XÙKšY	‰ŒO]\Ë\ÚÕ˜XÙKœÝ]KKš[œÊ
KœÜÝ\U\ÚÕ˜XÙJ
JN\Ë˜XÚQ]™[Y[œ\Ú
Š_]\ËœÛÜXÚQ]™[Y[\œ˜^WØNM

K\ËœÜÝ\]PXÚY]™J
_KKœ›ÝÝ\K™Ù]\ÚÑ]OY[˜Ý[ÛŠJ^Ù›ÜŠ˜\ˆKÏ]\Ë˜XÚQ]™[Y[›[™ÝLÜÏ›ŽÛŠÊÊ^Ý˜\ˆÏ]\Ë˜XÚQ]™[Y[Û—NÚYŠË˜XÚY]™[Y[YO]	‰›ËšYOYJ^ÚO[ÎØœ™XZß_\™]\›ˆ_KKœ›ÝÝ\K™Ù]\ÚÕ\™Ù]Y[˜Ý[ÛŠ
^Ý˜\ˆOLO]\Ë™Ù]XÚY]™PÛÛ™žRY

NÜ™]\›ˆI‰ŠOZK\™Ù]
K_KKœ›ÝÝ\KœÜÝ\]PXÚY]™OY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\KœÜÝ\U\ÚÕ˜XÙOY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\KœÜÝ\S[Z]\ÚÑ]OY[˜Ý[ÛŠ
^Ü™]\›ˆKKœ›ÝÝ\KœÜÝ[Z]\ÚÑ[™Y[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K™Ò›Ú[XÚY]™Q]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ú[™ÙPXÚY]™J
_KKœ›ÝÝ\K™ÐXÚY]™PÚ[™ÙQ]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ú[™ÙPXÚY]™J
_KKœ›ÝÝ\K™Ó[Z]]PÚ[™ÙT™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
NÚYŠ\Ë›[Z]\ÚÔÝ]OZK\Ë›[Z]\ÚÐÛÝ[LOZJ]\Ë˜Ý\œ•\ÚÓ\ÝÒY]œ™XY[

K\Ëš[š][Z]\ÚÑ]WØNM
\Ë˜Ý\œ•\ÚÓ\ÝÒY
NÙ[ÙHYŠOOZJ^Ý\Ë˜Ý\œ•\ÚÓ\ÝÒY]œ™XY[

K\Ëš[š][Z]\ÚÑ]WØNM
\Ë˜Ý\œ•\ÚÓ\ÝÒY
K\Ë›[Z]\ÚÑ[™[YO]œ™XY[

NÝ˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÓ[Z][YVÝ\Ë˜Ý\œ•\ÚÓ\ÝÒYNÌOO]\Ë˜Ý\œ•\ÚÓ\ÝÒY	‰œË[YOO]\Ë›[Z]\ÚÑ[™[YI‰•šY]ÓYÜ‹š[œÊ
K›Ü[Š[Z]™Y›Ü™U\ÕšY]ÊK\Ë›[Z]\ÚÑ[™[YJÏSX]™›ÛÜŠØ[YTÙ\™\‹œÙ\™\•[YKÌYLÊNÙ›ÜŠ˜\ˆ]œ™XYÚÜ

KÏLÛ›ÎÛÊÊÊ^Ý˜\ˆO]œ™XY[

NÝ\Ë›[Z]\ÚÑXÖØWKœ\œÙ\Š
KO]\Ë›[Z]\ÚÑXÖØWKœÝ]I‰\Ë›[Z]\ÚÐÛÝ[
Êß_YKš[œÊ
KœÜÝ\S[Z]\ÚÑ]J
_KKœ›ÝÝ\Kš[š][Z]\ÚÑ]WØNMY[˜Ý[ÛŠ
^Ý\Ë›[Z]\ÚÓ\ÝV×K\Ë›[Z]\ÚÑXÏ^ßNÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÓ[Z][YVÝNÙ›ÜŠ˜\ˆH[ˆK\ÚÒYÊ^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÓ[Z][YU\ÚÖÙK\ÚÒYÖÚWWK[™]È[Z]\ÚÑ]NÛ‹œÙ]˜\ÙQ]JÊK\Ë›[Z]\ÚÓ\Ýœ\Ú
ŠK\Ë›[Z]\ÚÑXÖÛ‹šYO[Ÿ_KKœ›ÝÝ\K™Õ\]S[Z]]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[

KÏ]\Ë›[Z]\ÚÑXÖÚWNÜ™]\›ˆÏÊËœ\œÙ\Š
KO\ËœÝ]I‰\Ë›[Z]\ÚÐÛÝ[
ÊË›ÚYKš[œÊ
KœÜÝ\S[Z]\ÚÑ]JÊJN›ÚYXYË›ÙÊºfd9¥í¹.îùb¨y§*¹b'yiâùc%»ï&ˆŠÚJ_KKœ›ÝÝ\KœÙ[™Ù][Z]\ÚÏY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊJ_KKœ›ÝÝ\KœÙ[™Ù][Z]\ÚÔ™]Ø\™Y[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊŠNÙKÜš]R[

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\K˜Ú[™ÙPXÚY]™OY[˜Ý[ÛŠ
^Ý˜\ˆKÏ]œ™XY[

NÚOLYLÏO\ÏÝ\Ë\ÚÕ˜XÙN\Ë™Ù]XÚY]™Q]PžRY
ÊK\œ›Ü“ÙË\ÜÙ\
K•\Ù\•\ÚÈ]H\È[XÚY]™[Y[YHŠÜÊ_
KšY]œ™XY[

KKœÝ]O]œ™XY[

KK˜[YO]œ™XY[

KYLÏOZK˜XÚY]™[Y[YÙKš[œÊ
KœÜÝ\U\ÚÕ˜XÙJ
NŠ\ËœÛÜXÚQ]™[Y[\œ˜^WØNM

KKš[œÊ
KœÜÝ\ÚÐÚ[™ÙQ]J
JJ_KKœ›ÝÝ\K™Ù]Ú[™Úš]Q]PžU\OY[˜Ý[ÛŠ
^ÚYŠ›ÚYO]\Ë˜XÚQ]™[Y[
\™]\›ˆ›ÚY\œ“ÙË˜XÙJº`&º/áù¢$9l,yìnùg¢ú#­ùcå¹¢$9l,y¥l9£kˆXÚQ]™[Y[H[ŠNÙ›ÜŠ˜\ˆOV×KOLÚO\Ë˜XÚQ]™[Y[›[™ÝÚJÊÊ]\Ë˜XÚQ]™[Y[ÚWK˜XÚY]™[Y[\OO]	‰™Kœ\Ú
\Ë˜XÚQ]™[Y[ÚWJNÜ™]\›ˆ\ËœÛÜXÚY]™[Y[XÐžU\JJ_KKœ›ÝÝ\KœÛÜXÚY]™[Y[XÐžU\OY[˜Ý[ÛŠ
^Ü™]\›ˆ	‰œÛÜ
[˜Ý[ÛŠJ^Ü™]\›ˆO]œÝ]OÌNŒOYKœÝ]OËLN™KœÝ]K]œÝ]_JKKKœ›ÝÝ\K™Ù]XÚY]™Q]PžRYY[˜Ý[ÛŠ
^ÚYŠ›ÚYO]\Ë˜XÚQ]™[Y[
\™]\›ˆ›ÚY\œ“ÙË˜XÙJº`&º/áù¢$9l,yìnùg¢ú#­ùcå¹¢$9l,y¥l9£kˆXÚQ]™[Y[H[ŠNÙ›ÜŠ˜\ˆOLÙO\Ë˜XÚQ]™[Y[›[™ÝÙJÊÊZYŠ\Ë˜XÚQ]™[Y[ÙWK˜XÚY]™[Y[YO]
\™]\›ˆ\Ë˜XÚQ]™[Y[ÙWNÜ™]\›ˆ[KKœ›ÝÝ\K™Ù]XÚY]™PžU\ÚÒYY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOLÙO\Ë˜XÚQ]™[Y[›[™ÝÙJÊÊZYŠ\Ë˜XÚQ]™[Y[ÙWKšYO]
\™]\›ˆ\Ë˜XÚQ]™[Y[ÙWNÜ™]\›ˆ[KKœ›ÝÝ\K™Ù]š][]P]Ø\™ÐžRYY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOLÙO\Ëš][]P]Ø\™Ë›[™ÝÙJÊÊZYŠ\Ëš][]P]Ø\™ÖÙWKšYO]
\™]\›ˆ\Ëš][]P]Ø\™ÖÙWNÜ™]\›ˆ[KKœ›ÝÝ\K™Ù]\ÚÑ]PžRYY[˜Ý[ÛŠ
^ÚYŠ]\Ë\ÚÊ\™]\›ˆ[Ù›ÜŠ˜\ˆOLÙO\Ë\ÚË›[™ÝÙJÊÊZYŠ\Ë\ÚÖÙWKšYO]
\™]\›ˆ\Ë\ÚÖÙWNÜ™]\›ˆ[KKœ›ÝÝ\K™Ù]XÚY]™PÛÛ™žRYY[˜Ý[ÛŠ
^Ý˜\ˆKOQÛØ˜[ÛÛ™šYËÛÛ™šYÐXÚY]™[Y[\ÚÎÙ›ÜŠH[ˆJ^Ý˜\ˆÏZVÙWNÚYŠË\ÚÒYO]
\™]\›ˆß\™]\›ˆ[KKœ›ÝÝ\K™Ù]]Ø\™ÐÛÛ™šYÐžRYY[˜Ý[ÛŠ
^Ý˜\ˆKOQÛØ˜[ÛÛ™šYËÛÛ™šYÑZ[P]Ø\™Ù›ÜŠH[ˆJ^Ý˜\ˆÏZVÙWNÚYŠËšYO]
\™]\›ˆß\™]\›ˆ[KKœ›ÝÝ\K™Ù]\ÚÔÝ\ÝY[˜Ý[ÛŠ
^ÚYŠ\Ë\ÚÊ^Ý˜\ˆ]›ÚYÙ›ÜŠLÝ\Ë\ÚË›[™ÝÝ
ÊÊZYŠOO]\Ë\ÚÖÝKœÝ]J\™]\›ˆ›ÚYKš[œÊ
KœÜÝ\]U\ÚÔÚ[
L
NÙ›ÜŠLÝ\Ëš][]P]Ø\™Ë›[™ÝÝ
ÊÊ^Ý˜\ˆO]\Ë™Ù]]Ø\™ÐÛÛ™šYÐžRY
\Ëš][]P]Ø\™ÖÝKšY
NÚYŠ\Ëš][]OZK˜[YS[Z]	‰ŒO]\Ëš][]P]Ø\™ÖÝKœÝ]J\™]\›ˆ›ÚYKš[œÊ
KœÜÝ\]U\ÚÔÚ[
L
_Y›ÜŠLÝ\Ë˜XÚQ]™[Y[›[™ÝÝ
ÊÊZYŠOO]\Ë˜XÚQ]™[Y[ÝKœÝ]J\™]\›ˆ›ÚYKš[œÊ
KœÜÝ\]U\ÚÔÚ[
L
NÜ™]\›ˆ›ÚYKš[œÊ
KœÜÝ\]U\ÚÔÚ[
LJ__KKœ›ÝÝ\KœÜÝ\]U\ÚÔÚ[Y[˜Ý[ÛŠ
^Ü™]\›ˆKKœ›ÝÝ\KœÛÜ\Ú×ØNMY[˜Ý[ÛŠ
^ÚYŠ\Ë\ÚË›[™ÝŒŠ^Ý\Ë\ÚËœÛÜ
\ËœÛÜØNM
NÙ›ÜŠ˜\ˆV×KOLÙO\Ë\ÚË›[™ÝÙJÊÊLO]\Ë\ÚÖÙWKœÝ]I‰Šœ\Ú
\Ë\ÚÖÙWJK\Ë\ÚËœÜXÙJKJKKKJNÝ›[™ÝŒ	‰Š\Ë\ÚÏ]\Ë\ÚË˜ÛÛ˜Ø]

J__KKœ›ÝÝ\KœÛÜØNMY[˜Ý[ÛŠJ^Ý˜\ˆO]šYÏYKšYÜ™]\›ˆÏšOËLNšOœÏÌNŒKKœ›ÝÝ\KœÛÜXÚQ]™[Y[\œ˜^WØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÝ\Ë˜XÚQ]™[Y[›[™ÝÝ
ÊÊ^Ý˜\ˆO]\Ë˜XÚQ]™[Y[ÝNÌOOYKœÝ]OÊ\Ë˜XÚQ]™[Y[œÜXÙJJK\Ë˜XÚQ]™[Y[[œÚY
JJNŒOYKœÝ]I‰Š\Ë˜XÚQ]™[Y[œÜXÙJJK\Ë˜XÚQ]™[Y[œ\Ú
JJ__KKœ›ÝÝ\K™Ù]\ÓÜ[Ú[™Úš]OY[˜Ý[ÛŠ
^Ü™]\›ˆXÝÜ‹›]™[MßKKœ›ÝÝ\K˜ÚXÚÒ\Ò]™PÚ[™Úš]T™]Ø\™Y[˜Ý[ÛŠ
^ÚYŠ]\Ë™Ù]\ÓÜ[Ú[™Úš]J
J\™]\›ˆLNÙ›ÜŠ˜\ˆSSX[”Þ\Ð˜\ÙKš[œÊ
K˜Ú[™Úš]SX^]J
KOLO]ÙOK›[™ÝÙJÊÊ^Ý˜\ˆÏZVÙWK]\Ë™Ù]Ú[™Úš]Q]PžU\JÊNÚYŠ›ÚYO[Š\™]\›ˆ›ÚY\œ“ÙË˜XÙJ¹¦+ùd)¹§"y¢$9l,yie¹b¬ycëúh¡¹cåˆ]\ÈH[ŠNÙ›ÜŠ˜\ˆÏLO[ŽÛÏK›[™ÝÛÊÊÊ^Ý˜\ˆXVÛ×NÚYŠOO\‹œÝ]J\™]\›ˆL_\™]\›ˆL_KKœ›ÝÝ\K˜ÚXÚÒ\Ò]™PÚ[™Úš]T™]Ø\™ž]\OY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]\Ë™Ù]Ú[™Úš]Q]PžU\J
KOLÏYNÚOË›[™ÝÚJÊÊ^Ý˜\ˆ\ÖÚWNÚYŠOO[‹œÝ]J\™]\›ˆL\™]\›ˆL_KKœ›ÝÝ\K™Ù]\ÚÑš[˜[Ý]OY[˜Ý[ÛŠ
^Ý˜\ˆYKš[œÊ
K\ÚÕ˜XÙNÚYŠ
^Ý˜\ˆOJKš[œÊ
K™Ù]XÚY]™PÛÛ™žRY
šY
KKš[œÊ
K™Ù]XÚY]™PÛÛ™žRY
šY
ÌJJNÜ™]\›ˆ_ˆO]œÝ]OÈLˆL_\™]\›ˆL_KKœ›ÝÝ\K™Ù][Z]\ÚÔ™YY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÝKš[œÊ
K›[Z]\ÚÓ\Ý›[™ÝÝ
ÊÊZYŠOOYKš[œÊ
K›[Z]\ÚÓ\ÝÝKœÝ]J\™]\›ˆNÜ™]\›ˆKKœ›ÝÝ\KœÜÝ\˜X›ÛXÒ][OY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K™Ù][Z][YRYY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÓ[Z][YJ^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÓ[Z][YVÙWNÚYŠLHOZK\ÚÒYËš[™^ÙŠ
J\™]\›ˆKšY\™]\›ˆK_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
\Ù\•\ÚËœ›ÝÝ\K•\Ù\•\ÚÈŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý\Ù\•\ÚÏU\Ù\•\ÚËš[œË˜š[™
\Ù\•\ÚÊ_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆš][]Q]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^ß\™]\›ˆJ
N××Ü™Y›XÝ
š][]Q]Kœ›ÝÝ\K•š][]Q]HŠNÝ˜\ˆÝZYP\œ›ÝÕÛÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[™ÝZYP\œ›ÝÈ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\KœÙ]\™XÝ[Û•ÙY[Y[˜Ý[ÛŠ
^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\ÊK\Ëš\ÚX›OHLOO]Ê\ËžL\Ë˜Ý\œ™[Ý]OHœšYÚ‹YÜ™]•ÙY[‹™Ù]
\ËÛÛÜˆLJKÊÞKYLÊKÊÞŒKYLÊJNŒO]Ê\ËžOL\Ë˜Ý\œ™[Ý]OH™ÝÛˆ‹YÜ™]•ÙY[‹™Ù]
\ËÛÛÜˆLJKÊÞN‹MKYLÊKÊÞNŒKYLÊJNŠ\ËžL\Ë˜Ý\œ™[Ý]OH›Y‹YÜ™]•ÙY[‹™Ù]
\ËÛÛÜˆLJKÊÞ‹MKYLÊKÊÞŒKYLÊJ_KKœ›ÝÝ\KœÙ]\ÏY[˜Ý[ÛŠ
^Ý\Ë›X‹^]KKœ›ÝÝ\Kœ™[[Ý™UÙY[œÏY[˜Ý[ÛŠ
^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ÝZYP\œ›ÝÕÛËœ›ÝÝ\K‘ÝZYP\œ›ÝÕÛÈŠNÝ˜\ˆ[Z]™Y›Ü™U\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[“[Z]Ý\\È‹Kš\ÕÜ]™[HLK›˜[YOH“šxnáÛH¸néHÚxnæÚH8n¨[ˆ¸n«Ý1$8n©ÝH‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ý\Ë˜YÝXÚ]™[
\Ë˜‹\Ë›Û”Ý\
K\Ë™\ØÓX™[^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ’ðèˆ0èš›ÛÛÛÜHÌÎXŽÙ›ÛˆšxnáÛH¸néH›Û™È›ÛÛÛÜHÌÎXŒÍˆÚxnçOÙ›ÛˆŠ_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜ÛÜÙK˜Ø[
\Ê_KKœ›ÝÝ\K›Û”Ý\Y[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJKšY]ÓYÜ‹š[œÊ
K›Ü[Š[Z]\ÚÕšY]Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
[Z]™Y›Ü™U\ÕšY]Ëœ›ÝÝ\K“[Z]™Y›Ü™U\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ[Z]™Y›Ü™U\ÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆ[Z]\ÚÒ][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH“[Z][YR][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý\Ë™ÛÐ‹š\ÚX›OHL\Ë™Û™Kš\ÚX›OHLK\Ë\ÚÓ˜[YU^]\Ë™]K›˜[YK\Ë\ÚÒXÛÛ‹š\ÔÚÝÓ˜[YJLJK\Ë\ÚÒXÛÛ‹™]O]\Ë™]K˜]Ø\™\ÝÌK\Ëœ›ÙÕ^HŠŠÝ\Ë™]Kœ›ÙÜ™\ÜÊÈ‹ÈŠÝ\Ë™]K\™Ù]
ÈŠH‹ÏO]\Ë™]K\I‰Š\Ë™]Kœ›ÙÜ™\ÜÏ]\Ë™]K\™Ù]Ý\Ëœ›ÙÕ^HŒKÌHŽ\Ëœ›ÙÕ^HŒÌHŠK\Ëœ›ÙÕ^ÛÛÜLLŽMO]\Ë™]KœÝ]OÊ\ËœÝ]U^H±$[™Èxná[ˆ˜H‹\Ë™ÛÐ‹›X™[H±$H1$xn¯ÛˆŠNŒOO]\Ë™]KœÝ]OÊ\ËœÝ]U^HðìÈ8nàÈš8n«[ˆ1¬8nçÛ™È‹\Ë™ÛÐ‹›X™[H“š8n«[ˆ‹\Ëœ›ÙÕ^ÛÛÜMŒÎÊNŒO]\Ë™]KœÝ]I‰Š\ËœÝ]U^H±$0èÈðèˆ0èš‹\Ë™ÛÐ‹š\ÚX›OHLK\Ë™Û™Kš\ÚX›OHL\Ëœ›ÙÕ^ÛÛÜMŒÎÊK\Ëœ™YÚ[š\ÚX›OLOO]\Ë™]KœÝ]K\Ë\ÚÒXÛÛ‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Û•ÜXÛÛ‘]™[ØNM\ÊK\Ë˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\Ê_KKœ›ÝÝ\K›Û•ÜXÛÛ‘]™[ØNMY[˜Ý[ÛŠ
^ÝœÝÜ[[YYX]T›ÜYØ][ÛŠ
KœÝÜ›ÜYØ][ÛŠ
_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÚYŠO]\Ë™]KœÝ]J^Ý˜\ˆO]\Ë™]K˜ÛÛ›Û\™Ù]ÌWOÝ\Ë™]K˜ÛÛ›Û\™Ù]ÌWNŒÚYŠ‘ÝX[”ZXT™]Ø\™Ú[ˆO]\Ë™]K˜ÛÛ›Û\™Ù]ÌJ\™]\›ˆ›ÚY\Ë™ÛÝÔ]X[”ZXSÜ\˜]WØNM

NÕšY]ÓYÜ‹š[œÊ
K›Ü[Š\Ë™]K˜ÛÛ›Û\™Ù]ÌKJ_Y[ÙHOO]\Ë™]KœÝ]I‰Š\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]Ý\œ\ÐÛÝ[

OOÕ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê°å¸nä[™È0îšH1$xnäÈÚ0í™È1$xnéËZH0ì›™È8nã[ˆ8n®\±¬8næØÈŠN•\Ù\•\ÚËš[œÊ
KœÙ[™Ù][Z]\ÚÔ™]Ø\™
\Ë™]KšY
J_KKœ›ÝÝ\K™ÛÝÔ]X[”ZXSÜ\˜]WØNMY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]Ý\œ\ÐÛÝ[

O\Ù\˜YÔÞ\Ý[KQ×ÑS“ÕQÒÊšY]ÓYÜ‹š[œÊ
K˜ÛÜÙUÜ]™[

KšY]ÓYÜ‹š[œÊ
K›Ü[Š˜YÑ[\ÕšY]ÊJN•\Ù\‘˜‹š[œÊ
K˜Ý\œ™[[™\™ÞOU\Ù\‘˜‹š[œÊ
K™[™\™ÞOÊšY]ÓYÜ‹š[œÊ
K˜ÛÜÙUÜ]™[

K\Ù\‘˜‹š[œÊ
K˜]]ÕÔÊ
JN•\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ± Û™È1¬8nèÛ™ßŠKL_K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
[Z]\ÚÒ][T™[™\‹œ›ÝÝ\K“[Z]\ÚÒ][T™[™\ˆŠNÝ˜\ˆ[Z]\ÚÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH›[Z][YH‹K›˜[YOH“šxnáÛH¸néHÚxnæÚH8n¨[ˆ‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ý\Ë™^˜\‹›X™[\Ü^K^ÛÛÜLMÍÍÌŒMK\Ë™^˜\‹›X™[\Ü^K™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ë˜YÝXÚ]™[
\Ë›\Ý\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\ËšY]Ð‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™J\Ù\•\ÚËš[œÊ
KœÜÝ\S[Z]\ÚÑ]K\ËœÙ][™[™\Ý[ØNM
K\Ë›ØœÙ\™J\Ù\•\ÚËš[œÊ
KœÜÝ\S[Z]\ÚÑ]K\Ë\]Q›UÙY[—ØNM
K\ËœÙ][™[™\Ý[ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Õ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ëœ[•[YWØNM\Ê_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\ËšY]ÐŽ•šY]ÓYÜ‹š[œÊ
K›Ü[Š›ÛUÚ[”[™[JNØœ™XZÎØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__KKœ›ÝÝ\KœÙ][™[™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ËœÛÜ\ÝØNM

NÝ\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ
NÝ˜\ˆOU\Ù\•\ÚËš[œÊ
K˜Ý\œ•\ÚÓ\ÝÒYOQÛØ˜[ÛÛ™šYËÛÛ™šYÓ[Z][YVÙWNÚYŠZJ\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÐÙ[\•\Ê’QšxnáÛH¸néHÚxnæÚH8n¨[ŽˆŠÙJÈˆÚ0í™È8näÛˆ8n¨ZH›Û™È¸n¨Û™ÈšxnáÛH¸néHÚxnæÚH8n¨[ˆŠNÝ˜\ˆÏHˆŽÜÏZK›Ü[–šX[ŒÈÚ^xnàÛˆŠÚK›Ü[–šX[ŠÈˆŽˆøn©\ŠÚK›Ü[“]™[
ÈˆŽÙ›ÜŠ˜\ˆVÈ]L‹]LH‹]Lˆ—KÏLÛÏ‹›[™ÝÛÊÊÊ[ÏOYKLOÝ\ÖÛ–Û×WKš\ÚX›OHL\ÖÛ–Û×WKš\ÚX›OHLNÙ›ÜŠ˜\ˆÏLÎ›ÎÛÊÊÊ]\ÖÈš][HŠÛ×Kœ™YÚ[š\ÚX›OHLNÝ\Ë›[šÌ^\Ë\Ë™^˜\Ú[™ÙWØNM

K\Ëš][PÚ[™ÙWØNM

K\Ë\]P]—ØNM

K\Ù\•\ÚËš[œÊ
K›[Z]\ÚÑ[™[YKSX]™›ÛÜŠØ[YTÙ\™\‹œÙ\™\•[YKÌYLÊOŒÊ\Ëœ[•[YWØNM

K[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLË\Ëœ[•[YWØNM\ÊJN\Ë[YK^H’øn¨]1$xnæ[™È1$pèÈ8n¯Ý8n¨[ˆŸKKœ›ÝÝ\Kœ[•[YWØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\•\ÚËš[œÊ
K›[Z]\ÚÑ[™[YKSX]™›ÛÜŠØ[YTÙ\™\‹œÙ\™\•[YKÌYLÊNÝLÝ\Ë[YK^Q]U][Ë™Ù]›Ü›X]žTÙXÛÛ™
JNŠ\Ë[YK^H’øn¨]1$xnæ[™È1$pèÈ8n¯Ý8n¨[ˆ‹[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ëœ[•[YWØNM\ÊJ_KKœ›ÝÝ\K™^˜\Ú[™ÙWØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\•\ÚËš[œÊ
K›[Z]\ÚÓ\Ý›[™ÝOU\Ù\•\ÚËš[œÊ
K›[Z]\ÚÐÛÝ[Ý\Ë™^˜\‹›X^[][HO]	‰Š\Ë™^˜\‹›X^[][O]
K\Ë™^˜\‹˜[YOYKOYOÝ\Ëœ^P[Y™™XÝØNM

N\Ëœ™[[Ý™P[Y™™XÝØNM

_KKœ›ÝÝ\Kš][PÚ[™ÙWØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆU\Ù\•\ÚËš[œÊ
K›[Z]\ÚÓ\ÝOLÙO›[™ÝÙJÊÊ^Ý˜\ˆO]ÙWKÏ]\ÖÈš][HŠÙWNÌOZKœÝ]OÜËš\ÚX›OHLNœËš\ÚX›OHLÝ˜\ˆZK˜]Ø\™\ÝÌNÜË™]O[‹Ë™\ÝXÝ

KË˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Û•ÝXÚ][WØNM\Ê__KKœ›ÝÝ\K\]P]—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙÙ]\’]\]Z\[KOU\Ù\•\ÚËš[œÊ
K›[Z]\ÚÓ\ÝÌK˜]Ø\™\ÝÌKOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙKšYKÏZKžœÓ]™[Ù›ÜŠ˜\ˆˆ[ˆ
ZYŠŠÈˆO\ÊÈˆŠ^Ù›ÜŠ˜\ˆÈ[ˆÛ—J^Ý˜\ˆO]Û—VÛ×NÙ›ÜŠ˜\ˆˆ[ˆJ\ŠÈˆOHŒÈÝ\Ë›[šÍ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJVÜ—K™\ØÊNœŠÈˆOHHÝ\Ë›[šÍ‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJVÜ—K™\ØÊN\Ë›[šÎ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJVÜ—K™\ØÊ_Xœ™XZß_KKœ›ÝÝ\K›Û•ÝXÚ][WØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]˜Ý\œ™[\™Ù]OYK™]NÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠZšU\ÓÙ‘\]Z\Ú[‹KLJ_KKœ›ÝÝ\KœÛÜ\ÝØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\•\ÚËš[œÊ
K›[Z]\ÚÓ\ÝÜ™]\›ˆKKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\Ë›\Ýš][T™[™\™\S[Z]\ÚÒ][T™[™\‹\Ë[YK^Hˆ‹\Ë™^˜\‹œÛYQ\˜][ÛL\Ë™Y™\œ[™]ÈXÐ[š[X][Û‹\Ë™Y™\œ‹žLMMË\Ë™Y™\œ‹žOLMŒË\Ë™Y™\œ‹ÝXÚ[˜X›YHL_KKœ›ÝÝ\KœÛÜØNMY[˜Ý[ÛŠJ^Ý˜\ˆO]œÝ]KÏYKœÝ]NÜ™]\›ˆ[ÛÜš]KœÛÜ\ØÊKÊ_KKœ›ÝÝ\Kœ^P[Y™™XÝØNMY[˜Ý[ÛŠ
^Ý\Ë™Y™\œ‹œ\™[
\Ë™Y™\œ‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈšZš^˜ššZ[ÙY™ˆ‹LJK\Ë‘Y™™XÝÜ›Ý\˜YÚ[
\Ë™Y™\œŠJ_KKœ›ÝÝ\Kœ™[[Ý™P[Y™™XÝØNMY[˜Ý[ÛŠ
^Ý\Ë™Y™\œ‹œ\™[	‰‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™\œŠ_KKœ›ÝÝ\K\]Q›UÙY[—ØNMY[˜Ý[ÛŠ
^ÚYŠ	‰ŒO]œÝ]J^Ý˜\ˆOU\Ù\•\ÚËš[œÊ
K›[Z]\ÚÓ\Ýš[™^ÙŠ
NÙOL	‰\Ë˜Y›UÙY[—ØNM
J__KKœ›ÝÝ\K˜Y›UÙY[—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÖÈš][HŠÝKO[™]È[˜Ú\]Z\][P˜\ÙNÚK˜Ý\œ™[Ý]OYK˜Ý\œ™[Ý]KK˜[˜ÚÜ“Ù™œÙ]YKÚYÌ‹K˜[˜ÚÜ“Ù™œÙ]OYKšZYÚÌ‹KœØØ[VKLËKœØØ[VOKLËK˜[OKŽÝ˜\ˆÏYKœ\™[[™]ÈYÜ™]”Ú[ÜËœ\™[›ØØ[ÑÛØ˜[
Ëž
ËLÊŠKž
ÙKÚYÌŠKËžJËLÊŠKžJÙKšZYÚÌŠKŠK\Ë™ÛØ˜[ÓØØ[
‹ž‹žKŠKKž[‹žKžO[‹žK\Ë˜YÚ[
JNÝ˜\ˆÏU\Ù\•\ÚËš[œÊ
K›[Z]\ÚÓ\ÝÝK˜]Ø\™\ÝÌNÚK˜[Y]S›ÝÊ
KK™]O[ÎÝ˜\ˆOUšY]ÓYÜ‹š[œÊ
K™Ù]šY]ÊRQÝÛ•šY]ÊKXK™Ù]ÙÙÛPŠ
K[™]ÈYÜ™]”Ú[Ü‹œ\™[›ØØ[ÑÛØ˜[
‹ž
Ü‹ÚYÌ‹‹žJÜ‹šZYÚÌ‹
NÝ˜\ˆYYÜ™]•ÙY[‹™Ù]
JNÛÊÜØØ[V‹ŽØØ[VN‹ŽKÌ
KÊÞ›‹ž
ÌÌKL
KÊÞ›‹žLÌKL
KÊÞ›‹ž
ÌÌKL
KÊÞ›‹žLÌKL
KÊÞ›‹ž
ÌÌKL
KÊÞ›‹žLÌKL
KÊÞ›‹ž
ÌÌKL
KÊÞ›‹žLÌKL
KÊÞ›‹žKJKÊÞšžNšžKØØ[V‹ŒMKØØ[VN‹ŒM_K
K˜Ø[
[˜Ý[ÛŠ
^ÚKœ\™[	‰šKœ\™[œ™[[Ý™PÚ[
J_J_KK›Ü[ÚXÚÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÜ™]\›ˆ\Ù\•\ÚËš[œÊ
K˜Ý\œ•\ÚÓ\ÝÒYŒÈLŠšY]ÓYÜ‹š[œÊ
K›Ü[Š›ÜÜÙ\ÕÚ[‹ŠKLJBŸK_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
[Z]\ÚÕšY]Ëœ›ÝÝ\K“[Z]\ÚÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ[Z]\ÚÕšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ\ÚÑY™™XÝ\Ü^SØšY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš[š]

K_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\Ë—ÙY™‘Ü›Ý\[™]È]ZK‘Ü›Ý\\Ë˜YÚ[
\Ë—ÙY™‘Ü›Ý\
K\Ë—Ø\œ›ÝÑÜ›Ý\[™]È]ZK‘Ü›Ý\\Ë˜YÚ[
\Ë—Ø\œ›ÝÑÜ›Ý\
K\Ë—ÙY™Ú\[™]ÈXÐ[š[X][Û‹\Ë—ÙY™‘Ü›Ý\˜YÚ[
\Ë—ÙY™Ú\ŠK\Ë—Ø\œ›ÝÏ[™]ÈÝZYP\œ›ÝÕÛË\Ë—Ø\œ›ÝÑÜ›Ý\˜YÚ[
\Ë—Ø\œ›ÝÊK\Ë—Ø\œ›ÝÑÜ›Ý\žKNL‹\Ë—Ø\œ›ÝÑÜ›Ý\žOKNL‹\ËÝXÚÚ[™[HLK\ËÝXÚ[˜X›YHL_KKœ›ÝÝ\KœÝ\Y[˜Ý[ÛŠ
^Õ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë\]WØNM\ÊK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠL\Ë\]WØNM\Ê_KKœ›ÝÝ\KœÝÜY[˜Ý[ÛŠ
^Õ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë\]WØNM\ÊK\ËšYJ
_KKœ›ÝÝ\KœÚÝÏY[˜Ý[ÛŠ
^ÚYŠ]\Ë—Ú\ÔÚÝÊ^Ý\Ë—Ú\ÔÚÝÏHLÝ˜\ˆOUšY]ÓYÜ‹š[œÊ
K™Ù]šY]ÊXZ[•šY]ÊNÚYŠYJ\™]\›ˆ›ÚY\ËšYJ
NÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\ÊK\Ë˜[OLYÜ™]•ÙY[‹™Ù]
\ÊKÊØ[NŒ_KÌ
NÝ˜\ˆOYK\ÚÕ˜XÙPŽÝ\ËžZKÚYŒK\ËžOZKšZYÚŒKK˜YÚ[
\ÊK\Ë—Ø\œ›ÝËœÙ]\™XÝ[Û•ÙY[ŠŠK\Ë—ÙY™Ú\‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ™ÝZYY™ˆ‹LJ_]\Ë—Ø\œ›ÝËœÙ]\Ê
_KKœ›ÝÝ\KšYOY[˜Ý[ÛŠ
^Ý\Ë—Ú\ÔÚÝÉ‰Š\Ë—Ú\ÔÚÝÏHLK\Ë—Ø\œ›ÝËœ™[[Ý™UÙY[œÊ
K\Ëœ\™[	‰\Ëœ\™[œ™[[Ý™PÚ[
\ÊJ_KKœ›ÝÝ\Kš\ÔÚÝÏY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Ú\ÔÚÝßKKœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\•\ÚËš[œÊ
K\ÚÕ˜XÙNÚYŠ
^Ù›ÜŠ˜\ˆOU\Ù\•\ÚËš[œÊ
K™Ù]XÚY]™PÛÛ™žRY
šY
KOVÈ•Ù[ÛÛYUÚ[ˆ—KÏLZNÜÏ‹›[™ÝÜÊÊÊ^Ý˜\ˆÏ[–Ü×NÚYŠšY]ÓYÜ‹š[œÊ
K™Ù]šY]ÊÊJ\™]\›ˆ›ÚY\ËšYJ
_YI‰ŠO]œÝ]I‰™KœÝ\Ø\›š[™ÏÝ\ËœÚÝÊKœÝ\Ø\›š[™ÊNŒOO]œÝ]I‰™K™š[š\ÚØ\›š[™ÏÝ\ËœÚÝÊK™š[š\ÚØ\›š[™ÊN\ËšYJ
J__K_JYÜ™]‘\Ü^SØš™XÝÛÛZ[™\ŠN××Ü™Y›XÝ
\ÚÑY™™XÝ\Ü^SØš‹œ›ÝÝ\K•\ÚÑY™™XÝ\Ü^SØšˆŠNÝ˜\ˆ\Ù\•\ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\KšY]È‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ÝšY]É‰\Ë—ÝšY]Ëœ\™[
šY]ÓYÜ‹š[œÊ
K›Ü[Š\ÕšY]ÊK\Ë—ÝšY]ÏUšY]ÓYÜ‹š[œÊ
K™Ù]šY]Ê\ÕšY]ÊJK\Ë—ÝšY]ßK[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\KœÚÝÕ\ÏY[˜Ý[ÛŠJ^ÚYŠ’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛÈˆO]	‰ˆŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßˆO]
Q[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÕ\Ë
NÙ[ÙHYŠOTÑÓ\ÙËš\ÔÚÝÔ™XÚ\™ÙJ^Ý˜\ˆOUØ\›•šY]ËœÚÝÊ’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛÈ‹[[[˜Ý[ÛŠ
^ßJNÚKœÙ]“X™[
–0èXÈš8n«[ˆŠ_Y[ÙHYŠOOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
Kš\ÒSÔÐ]Y]™\œÚ[ÛŠ
J^Ý˜\ˆOUØ\›•šY]ËœÚÝÊÑÓ\ÙËšÙYWÜ\K[˜Ý[ÛŠ
^ßK[[[œÝ\™HŠNÚKœÙ]“X™[
–0èXÈš8n«[ˆŠ_Y[Ù^Ý˜\ˆOUØ\›•šY]ËœÚÝÊ’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛËðìÈ]xnä[ˆ1$xn¯Ûˆ¸n¨\xnà[ˆÚ0í™ûï'È‹[˜Ý[ÛŠ
^Ý˜\ˆT™XÚ\™ÙKš[œÊ
K™Ù]™XÚ\™ÙQ]J
NÝ	‰ŒO]›[OÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠÚ\™ÙQš\œÝÚ[”[™[
N•šY]ÓYÜ‹š[œÊ
K›Ü[Š™XÚ\™ÙQš\œÝÚ[ŠKI‰ˆ™[˜Ý[ÛˆO]\[ÙˆI‰™J
_K[
NÚKœÙ]“X™[
’8néÞH‹±$H1$xn¯ÛˆŠ__KKœ›ÝÝ\KœÚÝÐÙ[\•\ÏY[˜Ý[ÛŠ
^Ñ[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÐÙ[\•\Ë
_KKœ›ÝÝ\KœÚÝÐÙ[\•\ÌY[˜Ý[ÛŠ
^Ñ[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÐÙ[\•\Ì‹
_KKœ›ÝÝ\KœÚÝÐÙ[\•\ÌÏY[˜Ý[ÛŠ
^Ñ[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÐÙ[\•\ÌË
_KKœ›ÝÝ\KœÚÝÔØÙ[™U\ÏY[˜Ý[ÛŠ
^Ñ[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÔØÙ[™U\Ë
_KKœ›ÝÝ\KœÚÝÕ\ÚÕ\ÏY[˜Ý[ÛŠ
^Ñ[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÕ\ÚÕ\Ë
_KKœ›ÝÝ\KœÚÝÐ]•\ÏY[˜Ý[ÛŠJ^Ñ[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÐ]•\ËÝWJ_KKœ›ÝÝ\KœÚÝÑÛÛÙ\]Z\\ÏY[˜Ý[ÛŠ
^Ý\ËšY]ËœÚÝÑÛÛÙ\]Z\\

_KKœ›ÝÝ\KœÚÝÔÚÚ[\ÏY[˜Ý[ÛŠ
^Ý\ËšY]ËœÚÝÔÚÚ[\

_KKœ›ÝÝ\KœÚÝÒ][U\ÏY[˜Ý[ÛŠ
^Ý\ËšY]ËœÚÝÒ][U\

_KKœ›ÝÝ\KœÚÝÒX\][U\ÏY[˜Ý[ÛŠ
^Ý\ËšY]ËœÚÝÒX\][U\

_KKœ›ÝÝ\KœÚÝÐ›Þ\ÏY[˜Ý[ÛŠ
^Ý\ËšY]ËœÚÝÐ›Þ\

_KKœ›ÝÝ\KœÚÝÐ›ÛÜÝÝÙ\Y[˜Ý[ÛŠJ^ÕšY]ÓYÜ‹š[œÊ
K›Ü[Š›Û[ÝTÝÙ\•šY]ÊKœÚÝÔ›Û[ÝTÝÙ\ŠJ_KKœ›ÝÝ\KœÚÝÔ™]Ø\™›ÞY[˜Ý[ÛŠ
^Ý\ËšY]ËœÚÝÔ™]Ø\™›Þ

_KKœ›ÝÝ\KœÚÝÑ]™\•\ÏY[˜Ý[ÛŠ
^Ñ[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÑ]™\•\Ë
_KKœ›ÝÝ\KœÚÝÒ[\ÏY[˜Ý[ÛŠ
^Ñ[^SÜ\YÜ‹š[œÊ
K˜Y[^SÜ[˜Ý[ÛŠ\ËšY]Ë\ËšY]ËœÚÝÒ[\Ë
_KKœ›ÝÝ\KœÚÝÑÛÛÙ™]Ø\™\ÏY[˜Ý[ÛŠ
^Ý\ËšY]ËœÚÝÑÛÛÙ™]Ø\™\

_K_JÛ\ÜÐ˜\ÙJN××Ü™Y›XÝ
\Ù\•\Ëœ›ÝÝ\K•\Ù\•\ÈŠNÝ˜\ˆ]š]PÚ[™ÙT[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKÝXÚ[˜X›YYKÝXÚÚ[™[HLKKš[š]šY]×ØNM

K_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]šY]×ØNMY[˜Ý[ÛŠ
^Ý\Ë—ÜÜ[™]ÈYÜ™]”Üš]K\Ë˜YÚ[
\Ë—ÜÜ
K\Ë—Ø™Ò[YÏ[™]È]ZK’[XYÙK\Ë—ÜÜ˜YÚ[
\Ë—Ø™Ò[YÊ_KKœ›ÝÝ\KœÙ]X™[[™›ÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\ÎÝ\Ë—ÜÜžL\Ë—ÜÜ˜[OLK\Ë—Ø™Ò[YËœÛÝ\˜ÙOH˜]ˆŠÝÝ˜\ˆÏPš]X\[X™\‹š[œÊ
K˜Ü™X]S[TXÊK˜]ˆ‹JNÜËžLLËžOLM\Ë—ÜÜ˜YÚ[
ÊNÝ˜\ˆYYÜ™]•ÙY[‹™Ù]
\Ë—ÜÜ
NÛ‹ØZ]
YLÊKÊØ[NŒ‹LÌKL
K˜Ø[
[˜Ý[ÛŠ
^Ðš]X\[X™\‹š[œÊ
K™\ÜÝ›ÞS[TXÊÊKËžLËžOL\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
J_K\Ê_K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
]š]PÚ[™ÙT[™[œ›ÝÝ\K]š]PÚ[™ÙT[™[ŠKÚ[™ÝË]š]PÚ[™ÙT[™[P]š]PÚ[™ÙT[™[Ý˜\ˆÙ[\•\Ò][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ[OO]	‰˜\J\Ë\™Ý[Y[Ê_\ß\™]\›ˆ×Ù^[™ÊK
KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K›X™[^[™›È‹ÜÙ]™[˜Ý[ÛŠ
^Ý\Ë—ÛX™[^]\Ë›X‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ\Ë—ÛX™[^
K\Ë˜™ËÚY]\Ë›X‹ÚY
Í\Ë˜™ËœÛÝ\˜ÙOHÛ™Þ[Û™Ø™ÌLˆ‹\Ë˜™Ëš\ÚX›OHL\Ë›X‹˜[OLK\Ë˜™ËžOL\Ë›X‹šÜš^›Û[Ù[\L\Ë›X‹™\XØ[Ù[\L\Ë˜YÑ]™[
\Ë˜YÑ]™[HL[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLËK\Ëœ™[[Ý™Qœ›ÛT\™[\ÊJ_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K›X™[^’[™›È‹ÜÙ]™[˜Ý[ÛŠ
^Ý\Ë—ÛX™[^]\Ë›X‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ\Ë—ÛX™[^
K\Ë˜™ËÚY]\Ë›X‹ÚY
Í\Ë˜™ËœÛÝ\˜ÙOHÛ™Þ[Û™Ø™ÌLˆ‹\Ë˜™Ëš\ÚX›OHL\Ë›X‹˜[OLK\Ë˜™ËžOL\Ë›X‹šÜš^›Û[Ù[\L\Ë›X‹™\XØ[Ù[\L\Ë˜YÑ]™[
\Ë˜YÑ]™[HL[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLËK\Ëœ™[[Ý™Qœ›ÛT\™[\ÊJ_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K›X™[^Ò[™›È‹ÜÙ]™[˜Ý[ÛŠ
^Ý\Ë—ÛX™[^]\Ë›X‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ\Ë—ÛX™[^
K\Ë˜™ËÚY]\Ë›X‹ÚY
Í\Ë˜™ËœÛÝ\˜ÙOHÛ™Þ[Û™Ø™ÌLˆ‹\Ë˜™Ëš\ÚX›OHL\Ë›X‹˜[OLK\Ë˜™ËžOL\Ë›X‹šÜš^›Û[Ù[\L\Ë›X‹™\XØ[Ù[\L\Ë˜YÑ]™[
\Ë˜YÑ]™[HL[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠÙLËK\Ëœ™[[Ý™Qœ›ÛT\™[\ÊJ_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J\Ò][UšY]ÊN××Ü™Y›XÝ
Ù[\•\Ò][T™[™\‹œ›ÝÝ\KÙ[\•\Ò][T™[™\ˆŠKÚ[™ÝËÙ[\•\Ò][T™[™\PÙ[\•\Ò][T™[™\ŽÝ˜\ˆÚ]\Ô™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÝÓÝ™\HLKKœÚÚ[“˜[YOH”ÚÚ[Ú]Y\ÜØYÙH‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\KœÙ]]OY[˜Ý[ÛŠ
^Ý\Ë›X‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊœÝŠK\ËœÙ]ÚÝÕ[YR[™›×ØNM

_KKœ›ÝÝ\KœÙ]ÚÝÕ[YR[™›×ØNMY[˜Ý[ÛŠ
^Ý\ËœÚÝÓÝ™\Ÿ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\ËœÚÝÓÝ™\’[™›×ØNM\ÊK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLËK\ËœÚÝÓÝ™\’[™›×ØNM\Ê_KKœ›ÝÝ\KœÚÝÓÝ™\’[™›×ØNMY[˜Ý[ÛŠ
^Ý\ËœÚÝÓÝ™\HL\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ê_K_J]ZKÛÛ\Û™[
N××Ü™Y›XÝ
Ú]\Ô™[™\‹œ›ÝÝ\KÚ]\Ô™[™\ˆŠNÝ˜\ˆ]™\•\Ò][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš[™^LKœÚÚ[“˜[YOH”ÚÚ[•\È‹K›X‹œÝ›ÚÙOLKK›X‹œÝ›ÚÙPÛÛÜLK˜™ËœÛÝ\˜ÙOHžš›\Z\[È‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\KœÙ][™^Y[˜Ý[ÛŠ
^Ý\Ëš[™^]KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K›X™[^‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ÛX™[^KÙ]™[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÝ\Ë˜™Ë˜[OLK\Ë—ÛX™[^]\Ë›X‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ\Ë—ÛX™[^
K\Ë˜™ËÚY]\Ë›X‹ÚY
Î\Ë›X‹˜[OLK\Ë˜™ËžOL\Ë›X‹™\XØ[Ù[\KLNÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]
\Ë˜™ÊNÚKÊÞNŒKL
KØZ]
L
KÊØ[NŒKŒ
K˜Ø[
[˜Ý[ÛŠ
^Ñ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
J_K\Ê_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
]™\•\Ò][T™[™\‹œ›ÝÝ\K‘]™\•\Ò][T™[™\ˆŠKÚ[™ÝË‘]™\•\Ò][T™[™\Q]™\•\Ò][T™[™\ŽÝ˜\ˆ[\Ò][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH“™]ÑÝZ[‹K›X‹š\ÚX›OHLKKš[YÓØY\[™]ÈYÜ™]’[XYÙSØY\‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\KœÙ]\Ò[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÔ™\ÛÝ\˜ÙSYÜ‹š[œÊ
Kœ™[ØYÛÛZ[™\Š\ÊK\Ë™Ü›Ý\ËšÜš^›Û[Ù[\KN\Ë™Ü›Ý\Ë™\XØ[Ù[\KLŒ\Ë˜™ËœÛÝ\˜ÙOHˆ‹\Ë˜™ËœÛÝ\˜ÙOH›™]ÛY\˜ÛÛ[™×Ü™È‹\Ë˜™ÌKœÛÝ\˜ÙOHˆ‹\Ë˜™ÌKœÛÝ\˜ÙOH›™]ÛY\˜™×Ü™È‹\Ëš[YÓØY\‹›Û˜ÙJYÜ™]‘]™[ÓÓTUK[˜Ý[ÛŠ
^ÚYŠ˜Ý\œ™[\™Ù]™]J^Ý˜\ˆO[™]ÈYÜ™]•^\™NÙK˜š]X\]O]˜Ý\œ™[\™Ù]™]K\ËœXËœÛÝ\˜ÙOYK\Ë˜™ËÚY]\ËœXËÚY
ÍÌ‹\Ë˜™ËšZYÚ]\ËœXËšZYÚ
Í_K\ÊK\Ëš[YÓØY\‹›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈš[XYÙKÜZ[[™ËÈŠÝ
È‹œ™ÈŠNÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]
\Ë™Ü›Ý\ÊNÚKÊÚÜš^›Û[Ù[\Ž‹LLKYLÊKØZ]
™LÊKÊÚÜš^›Û[Ù[\Ž‹NKYLÊK˜Ø[
[˜Ý[ÛŠ
^Ñ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
J_K\Ê_K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
[\Ò][T™[™\‹œ›ÝÝ\K’[\Ò][T™[™\ˆŠKÚ[™ÝË’[\Ò][T™[™\R[\Ò][T™[™\ŽÝ˜\ˆ›Û[ÝTÝÙ\•šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK™Y˜][˜[YOLKÝXÚ[˜X›YYKÝXÚÚ[™[HLK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËšÜš^›Û[Ù[\LL\Ë˜›ÝÛOKLL\Ëš[YÐ™Ï[™]È]ZK’[XYÙK\Ëš[YÐ™ËœÛÝ\˜ÙOHžš[™Ý[X™ÌÈ‹\Ëš[YÐ™ËžML\Ëš[YÐ™ËžOMÎ\Ë˜YÚ[
\Ëš[YÐ™ÊK\Ëš[YÐ™Ë˜[OLK\Ëš[YÐ™ËÝXÚ[˜X›YHLK\ËœÜ[™]ÈYÜ™]”Üš]K\ËœÜžLN\ËœÜžOMÍ\Ë˜YÚ[
\ËœÜ
K\Ë›\Ý[YOL\Ë›\ÝÝÙ\L\Ë˜Ý\œ™[ÝÙ\[™]È]ZKš]X\X™[™\ÛÝ\˜ÙU][Ëš[œÊ
K›ØY›
\Ë˜Ý\œ™[ÝÙ\‹›[WÞ™Ù›ŠK\Ë˜ÛX\”ÚÝÒ[™›×ØNM

_KKœ›ÝÝ\KœÚÝÔ›Û[ÝTÝÙ\Y[˜Ý[ÛŠJ^Ý\Ë™Y˜][˜[YOYKO]\Ë›\ÝÝÙ\‰‰Š\Ë›\ÝÝÙ\YJK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠLK\Ë™[^TÝÙ\•\ØNM\Ê_KKœ›ÝÝ\K˜ÛX\”ÚÝÒ[™›×ØNMY[˜Ý[ÛŠ
^Ý\ËœÜœ™[[Ý™PÚ[™[Š
KYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ëš[YÐ™ÊK\Ëš[YÐ™Ëš\ÚX›OHLK[Y\“YÜ‹š[œÊ
Kœ™[[Ý™P[
\ÊKYÜ™]˜ÛX\•[Y[Ý]
\ËšZJK\ËšZOLKKœ›ÝÝ\K™[^TÝÙ\•\ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›\ÝÝÙ\Ý\Ë›\ÝÝÙ\Ž\Ë™Y˜][˜[YKOPXÝÜ‹œÝÙ\ŽÙO	‰\ËœÚÝÔÝÙ\•\ÙY[—ØNM
J_KKœ›ÝÝ\KœÚÝÔÝÙ\•\ÙY[—ØNMY[˜Ý[ÛŠJ^Ý˜\ˆO]\ÎÝ\Ë˜ÛX\”ÚÝÒ[™›×ØNM

K\Ë˜Ý\œ™[ÝÙ\‹˜[OLK\Ëš[YÐ™Ëš\ÚX›OHL\Ëš[YÐ™Ë˜[OLK\Ë˜Ý\œ™[ÝÙ\‹žKLL\Ë˜Ý\œ™[ÝÙ\‹žOLL‹\ËœÜ˜YÚ[
\Ë˜Ý\œ™[ÝÙ\ŠNÝ˜\ˆÏYK]ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë˜Ý\œ™[ÝÙ\ŠKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ëš[YÐ™ÊNÝ˜\ˆHŠÈŠÜËÏPš]X\[X™\‹š[œÊ
K˜Ü™X]S[TXÊ‹œŒ‹JNÐš]X\[X™\‹š[œÊ
K˜Ú[™ÙS[JË‹œŒ‹JKËœØØ[V[ËœØØ[VOLËžLŽJXÝÜ‹œÝÙ\‹ÔÝš[™Ê
K›[™Ý
ÛËÚYËžO]\Ë˜Ý\œ™[ÝÙ\‹žJÛËšZYÚ\ËœÜ˜YÚ[
ÊNÝ˜\ˆOMLL™LËYYÜ™]•ÙY[‹™Ù]
ÊNÚÊÞŒŽJXÝÜ‹œÝÙ\‹ÔÝš[™Ê
K›[™ÝKŽ
›ËÚYN\Ë˜Ý\œ™[ÝÙ\‹žKMKØØ[VŒKØØ[VNŒ_KJKÊÜØØ[VŒKØØ[VNŒ_KJKÊØ[NŒKŠK˜Ø[
[˜Ý[ÛŠ
^Ñ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
Ê_K\ÊK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠŒK[˜Ý[ÛŠ
^Ý˜\ˆO\ÎÙJÏSX]œ›Ý[™
X]œ˜[™ÛJ
J™JNÝ˜\ˆ]ÔÝš[™Ê
KÏHˆŽÛÏYKÔÝš[™Ê
K›[™ÝO[‹›[™ÝÙKÔÝš[™Ê
KœÛXÙJJN™JÈˆ‹[‹˜Ú\]

KŠÏ[ËK˜Ý\œ™[ÝÙ\‹^[ŸK\Ë[˜Ý[ÛŠ
^ÚK˜Ý\œ™[ÝÙ\‹^PXÝÜ‹œÝÙ\‹ÔÝš[™Ê
KK›\ÝÝÙ\LÝ˜\ˆMLOL™LËÏYYÜ™]•ÙY[‹™Ù]
K˜Ý\œ™[ÝÙ\ŠNÜËØZ]

KÊØ[NŒKJK˜Ø[
[˜Ý[ÛŠ
^Ñ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
K˜Ý\œ™[ÝÙ\Š_KJNÝ˜\ˆYYÜ™]•ÙY[‹™Ù]
Kš[YÐ™ÊNÛ‹ØZ]

KÊØ[NŒKJK˜Ø[
[˜Ý[ÛŠ
^ÚKš[YÐ™Ëš\ÚX›OHL_KJ_K\Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
›Û[ÝTÝÙ\•šY]Ëœ›ÝÝ\K”›Û[ÝTÝÙ\•šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ›Û[ÝTÝÙ\•šY]Ë^Y\“YÜ‹•RWÕ\ÊNÝ˜\ˆØÙ[™U\Ò][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ[OO]	‰˜\J\Ë\™Ý[Y[Ê_\ß\™]\›ˆ×Ù^[™ÊK
KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K›X™[^[™›È‹ÜÙ]™[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÝ\Ë—ÛX™[^]\Ë›X‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ\Ë—ÛX™[^
K\Ë˜™ËÚY]\Ë›X‹ÚY\Ë˜™Ëš\ÚX›OHLK\Ë›X‹˜[OLK\Ë˜™ËžOL\Ë›X‹™\XØ[Ù[\KLK[Y\“YÜ‹š[œÊ
K™Õ[Y\Š™LËK[˜Ý[ÛŠ
^Ñ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
J_K\Ê_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J\Ò][UšY]ÊN××Ü™Y›XÝ
ØÙ[™U\Ò][T™[™\‹œ›ÝÝ\K”ØÙ[™U\Ò][T™[™\ˆŠKÚ[™ÝË”ØÙ[™U\Ò][T™[™\TØÙ[™U\Ò][T™[™\ŽÝ˜\ˆ\Ñ\]Z\[\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[Œ“Ü˜[™ÙQ\]Z\›ÝXÙH‹Kš\Õ\Ú[™ÏHLKKšÜš^›Û[Ù[\L_\™]\›ˆ×Ù^[™ÊK
KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K™]H‹ÜÙ]™[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝNÝ\Ëš][KœÙ]][R[YÊKšXÛÛŠÈ—Ü™ÈŠK\Ëš][Kš\ÔÚÝÒ›ØŠLJNÝ˜\ˆOPÛÛ™šYÒ][K™Ù]]X[]JJNÝ\Ëš][KœÙ][YÐ™ÊJK\Ë™\ØËš\ÚX›OHLK\ËœÚÚ[˜[YK^YK›˜[YK\ËœÚÚ[˜[YK^ÛÛÜR][P˜\ÙK”UPSUWÐÓÓÔ–ÚWK\Ëš][Kš\ÔÚÝÓ˜[YJLJK\Ëš][KœÚÝÓ[JLJ_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
\Ñ\]Z\[\šY]Ëœ›ÝÝ\K•\Ñ\]Z\[\šY]ÈŠNÝ˜\ˆ\ÑÛÛÙ\]Z\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[“Ü˜[™ÙQ\]Z\›ÝXÙH‹Kš\Õ\Ú[™ÏHLKKšÜš^›Û[Ù[\L_\™]\›ˆ×Ù^[™ÊK
KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K™]H‹ÜÙ]™[˜Ý[ÛŠ
^ÚYŠ\Ëš][Kš\ÔÚÝÓ˜[YJLJK[œÝ[˜Ù[Ùˆ][Q]J^Ý˜\ˆOPÛÛ™šYÒ][K™Ù]]X[]Jš][PÛÛ™šYÊNÝ\Ëš][KœÚÝÓ[JL
K\Ëš][K™]O]OYOÊ\Ë™\ØË^H•¸n«]8nª[H^xnà[ˆ^xn¯ÝH‹\Ëš][S˜[YKš\ÚX›OHL
NOOYI‰Š\Ë™\ØË^H•¸n«]8nª[H^xnà[ˆ^xn¯ÝH‹\Ëš][S˜[YKš\ÚX›OHL
KÏOPÛÛ™šYÒ][K™Ù]\Jš][PÛÛ™šYÊI‰Š\Ë™\ØË^HÚ0î˜ÈxnêÛ™Èš8n«[ˆ1$q¬8nèØÎˆŠK\Ëš][S˜[YK^]š][PÛÛ™šYË›˜[YK\Ëš][S˜[YK^ÛÛÜR][P˜\ÙK”UPSUWÐÓÓÔ–ÙW_Y[Ù^Ý\Ë™\ØË^HÚ0î˜ÈxnêÛ™Èš8n«[ˆ1$q¬8nèØÎˆŽÝ˜\ˆO]Ý\Ëš][KœÙ]][R[YÊKš[YÐÛÜÙJK\Ëš][S˜[YK^ZK›˜[YK\Ëš][S˜[YK^ÛÛÜR][P˜\ÙK”UPSUWÐÓÓÔ–ÚKœ]X[]WK\Ëš][KœÚÝÓ[JLJ_]\Ë™\ØËš\ÚX›OHL_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
\ÑÛÛÙ\]Z\šY]Ëœ›ÝÝ\K•\ÑÛÛÙ\]Z\šY]ÈŠNÝ˜\ˆ\ÑÛÛÙ™]Ø\™šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[Œ“Ü˜[™ÙQ\]Z\›ÝXÙH‹Kš\Õ\Ú[™ÏHLKKšÜš^›Û[Ù[\L_\™]\›ˆ×Ù^[™ÊK
KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K™]H‹ÜÙ]™[˜Ý[ÛŠ
^ÚYŠ[œÝ[˜Ù[Ùˆ]Ø\™Ñ]J\ÝÚ]Ú
šY
^ØØ\ÙH[Û™^PÛÛœÝž]X[˜˜[Î\Ë™\ØË^H“™Ý^pê›ˆ¸n¨ÛÈ‹\ËœÚÚ[˜[YK^HˆŠÝ˜ÛÝ[\Ëš][KœÙ]][R[YÊ]Ø\™Ñ]KÕT”‘SÖWÔ‘TÖÝšYJK\Ëš][Kš\ÔÚÝÓ˜[YJLJK\Ëš][KœÚÝÓ[JLJK\Ëš][Kš\ÔÚÝÒ›ØŠLJ__K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
\ÑÛÛÙ™]Ø\™šY]Ëœ›ÝÝ\K•\ÑÛÛÙ™]Ø\™šY]ÈŠNÝ˜\ˆ\ÒX\\]Z\[\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[‘ÝX\™ÛÙÙX\Û“›ÝXÙU\‹Kš\Õ\Ú[™ÏHLKKšÜš^›Û[Ù[\L_\™]\›ˆ×Ù^[™ÊK
KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K™]H‹ÜÙ]™[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝNÝ\Ëš][KœÙ]][R[YÊKšXÛÛŠÈ—Ü™ÈŠK\Ëš][Kš\ÔÚÝÒ›ØŠLJK\Ëš][KœÙ][YÐ™ÊÛÛ™šYÒ][K™Ù]]X[]JJJNÝ˜\ˆOPÛÛ™šYÒ][K™Ù]]X[]PÛÛÜŠJNÝ\Ë™\ØË^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJÎˆŠÚJÈ‰•ˆŠÙK›˜[YJK\Ëš][S˜[YKš\ÚX›OHLK\Ëš][Kš\ÔÚÝÓ˜[YJLJK\Ëš][KœÚÝÓ[JLJ_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
\ÒX\\]Z\[\šY]Ëœ›ÝÝ\K•\ÒX\\]Z\[\šY]ÈŠNÝ˜\ˆ\ÔÚÚ[[\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[Œ“Ü˜[™ÙQ\]Z\›ÝXÙH‹Kš\Õ\Ú[™ÏHLKKšÜš^›Û[Ù[\LK™\ØËš\ÚX›OHLK_\™]\›ˆ×Ù^[™ÊK
KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K™]H‹ÜÙ]™[˜Ý[ÛŠ
^Ý˜\ˆO[™]ÈÚÚ[]J
NÝ\Ëš][KœÙ]][R[YÊKšXÛÛŠK\ËœÚÚ[˜[YK^YK›˜[YK\ËœÚÚ[˜[YK^ÛÛÜR][P˜\ÙK”UPSUWÐÓÓÔ–ÌK\Ëš][Kš\ÔÚÝÓ˜[YJLJK\Ëš][KœÚÝÓ[JLJK\Ëš][K’YR[YÐ™Ê
K\Ë™\ØËš\ÚX›OHL_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
\ÔÚÚ[[\šY]Ëœ›ÝÝ\K•\ÔÚÚ[[\šY]ÈŠNÝ˜\ˆ\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK›XÛÝ[LK›\ÝV×KK›\ÝÙ[\V×KK˜Ù[\“\ÝV×KK\ÚÕ\Ó\ÝV×KKœØÙ[™S\ÝV×KK˜]“\ÝV×KK™]™\“\ÝV×KKš[\ÝV×KKœ™]Ø\™\\ÝV×KK™ÛÛÙ\]Z\\ÝV×KKœÚÚ[\\ÝV×KK™\]Z\][S\ÝV×KK™\]Z\X\][S\ÝV×K_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËÝXÚÚ[™[HLK\ËÝXÚ[˜X›YHLK\Ëœ™]Ø\™\[™]È\ÑÛÛÙ™]Ø\™šY]Ë\Ë™\]Z\\O[™]È\ÑÛÛÙ\]Z\šY]Ë\ËœÚÚ[\O[™]È\ÔÚÚ[[\šY]Ë\Ë™\]Z\\[™]È\Ñ\]Z\[\šY]Ë\Ë™\]Z\X\\[™]È\ÒX\\]Z\[\šY]Ë\Ë›ØœÙ\™JXÝÜ‹š[œÊ
KœÜÝ^\ËœÚÝÑ^
_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙW_KKœ›ÝÝ\KœÚÝÑ^Y[˜Ý[ÛŠ
^Ý	‰\ËœÚÝÕ\ÊŸÎŒŒÐÐLŒÉ•’Ú[š™ÚxnáÛH
ÈŠÝ
ÈŸŠ_KKœ›ÝÝ\KœÚÝÒ[\ÏY[˜Ý[ÛŠ
^Ý˜\ˆOSØš”ÛÛœÜ
’[\Ò][T™[™\ˆŠNÙKœÙ]\Ò[™›Ê
KK™\XØ[Ù[\LKšÜš^›Û[Ù[\LMÌ\Ë˜YÚ[
JK\Ëš[\Ý[œÚY
JKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™R[\\Ê_KKœ›ÝÝ\Kœ™[[Ý™R[\Y[˜Ý[ÛŠ
^Ý˜\ˆO]\Ëš[\Ýš[™^ÙŠ˜Ý\œ™[\™Ù]
NÝ\Ëš[\ÝœÜXÙJKJKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ˜Ý\œ™[\™Ù]
K˜Ý\œ™[\™Ù]œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™R[\\ÊKØš”ÛÛœ\Ú
˜Ý\œ™[\™Ù]
_KKœ›ÝÝ\KœÚÝÑ]™\•\ÏY[˜Ý[ÛŠ
^Ý˜\ˆOSØš”ÛÛœÜ
‘]™\•\Ò][T™[™\ˆŠNÙKž]žKžO]žKK›X™[^]œÝ‹\Ë˜YÚ[
JK\Ë™]™\“\Ý[œÚY
JKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™Q]™\•\\ÊNÙ›ÜŠ˜\ˆO]\Ë™]™\“\Ý›[™ÝLNÚOLÚKKJ^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë™]™\“\ÝÚWJNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\Ë™]™\“\ÝÚWJNÜËÊÞN™KžKLÌ
š_KÌ
__KKœ›ÝÝ\Kœ™[[Ý™Q]™\•\Y[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™]™\“\Ýš[™^ÙŠ˜Ý\œ™[\™Ù]
NÝ\Ë™]™\“\ÝœÜXÙJKJKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ˜Ý\œ™[\™Ù]
K˜Ý\œ™[\™Ù]œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™Q]™\•\\ÊKØš”ÛÛœ\Ú
˜Ý\œ™[\™Ù]
_KKœ›ÝÝ\KœÚÝÐ]•\ÏY[˜Ý[ÛŠ
^Ý˜\ˆOSØš”ÛÛœÜ
]š]PÚ[™ÙT[™[ŠNÙK›YLÌK˜›ÝÛOLNLKœÙ]X™[[™›ÊÌKÌWJK\Ë˜YÚ[
JK\Ë˜]“\Ý[œÚY
JKK›Û˜ÙJYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™P]•\\ÊNÙ›ÜŠ˜\ˆO]\Ë˜]“\Ý›[™ÝLNÚOLÚKKJ^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë˜]“\ÝÚWJNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\Ë˜]“\ÝÚWJNÜËÊØ›ÝÛNŒNL
Í
š_KÌ
__KKœ›ÝÝ\Kœ™[[Ý™P]•\Y[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë˜]“\Ýš[™^ÙŠ˜Ý\œ™[\™Ù]
NÝ\Ë˜]“\ÝœÜXÙJKJKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ˜Ý\œ™[\™Ù]
KØš”ÛÛœ\Ú
˜Ý\œ™[\™Ù]
_KKœ›ÝÝ\KœÚÝÐÙ[\•\ÏY[˜Ý[ÛŠ
^Ý˜\ˆOSØš”ÛÛœÜ
Ù[\•\Ò][T™[™\ˆŠNÙK™\XØ[Ù[\LKšÜš^›Û[Ù[\LK›X™[^[™›Ï]\Ë˜YÚ[
JK\Ë˜Ù[\“\Ý[œÚY
JKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™PÙ[\•\\ÊNÙ›ÜŠ˜\ˆO]\Ë˜Ù[\“\Ý›[™ÝLNÚOLÚKKJ^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë˜Ù[\“\ÝÚWJNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\Ë˜Ù[\“\ÝÚWJNÜËÊÝ™\XØ[Ù[\Ž‹NLKÙLÊ__KKœ›ÝÝ\Kœ™[[Ý™PÙ[\•\Y[˜Ý[ÛŠ
^Ý˜\ˆO]˜Ý\œ™[\™Ù]O]\Ë˜Ù[\“\Ýš[™^ÙŠJNÝ\Ë˜Ù[\“\ÝœÜXÙJKJKKšÜš^›Û[Ù[\LÌK™\XØ[Ù[\LÌYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊJKKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™PÙ[\•\\ÊKØš”ÛÛœ\Ú
J_KKœ›ÝÝ\KœÚÝÐÙ[\•\ÌY[˜Ý[ÛŠ
^Ý˜\ˆOSØš”ÛÛœÜ
Ù[\•\Ò][T™[™\ˆŠNÙKšÜš^›Û[Ù[\LK™\XØ[Ù[\KMŒ\Ë˜YÚ[
JKK›X™[^’[™›Ï]\Ë˜Ù[\“\Ý[œÚY
JKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™PÙ[\•\—ØNM\ÊNÙ›ÜŠ˜\ˆO]\Ë˜Ù[\“\Ý›[™ÝLNÚOLÚKKJ^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë˜Ù[\“\ÝÚWJNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\Ë˜Ù[\“\ÝÚWJNÜËÊÝ™\XØ[Ù[\Ž‹LLŒLÌ
š_KÌ
__KKœ›ÝÝ\Kœ™[[Ý™PÙ[\•\—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]˜Ý\œ™[\™Ù]ÙKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™PÙ[\•\—ØNM\ÊKKšÜš^›Û[Ù[\LÌK™\XØ[Ù[\LÌÝ˜\ˆO]\Ë˜Ù[\“\Ýš[™^ÙŠJNÝ\Ë˜Ù[\“\ÝœÜXÙJKJ_KKœ›ÝÝ\KœÚÝÐÙ[\•\ÌÏY[˜Ý[ÛŠ
^Ý˜\ˆOSØš”ÛÛœÜ
Ù[\•\Ò][T™[™\ˆŠNÙK™\XØ[Ù[\LKšÜš^›Û[Ù[\LK›X™[^Ò[™›Ï]\Ë˜YÚ[
JK\Ë˜Ù[\“\Ý[œÚY
JKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™PÙ[\•\×ØNM\ÊNÙ›ÜŠ˜\ˆO]\Ë˜Ù[\“\Ý›[™ÝLNÚOLÚKKJ^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë˜Ù[\“\ÝÚWJNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\Ë˜Ù[\“\ÝÚWJNÜËÊÝ™\XØ[Ù[\ŽŒ
ËLÌ
š_KL
__KKœ›ÝÝ\Kœ™[[Ý™PÙ[\•\×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]˜Ý\œ™[\™Ù]O]\Ë˜Ù[\“\Ýš[™^ÙŠJNÝ\Ë˜Ù[\“\ÝœÜXÙJKJKKšÜš^›Û[Ù[\LÌK™\XØ[Ù[\LÌYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊJKKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™PÙ[\•\\ÊKØš”ÛÛœ\Ú
J_KKœ›ÝÝ\KœÚÝÔØÙ[™U\ÏY[˜Ý[ÛŠ
^Ý˜\ˆOSØš”ÛÛœÜ
”ØÙ[™U\Ò][T™[™\ˆŠNÙK™\XØ[Ù[\KLMÍKKšÜš^›Û[Ù[\LK›X™[^[™›Ï]\Ë˜YÚ[
JK\ËœØÙ[™S\Ý[œÚY
JKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™TØÙ[™U\ØNM\ÊNÙ›ÜŠ˜\ˆO]\ËœØÙ[™S\Ý›[™ÝLNÚOLÚKKJ^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\ËœØÙ[™S\ÝÚWJNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\ËœØÙ[™S\ÝÚWJNÜËÊÝ™\XØ[Ù[\Ž‹LMÍJËLÌ
š_KL
__KKœ›ÝÝ\Kœ™[[Ý™TØÙ[™U\ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ËœØÙ[™S\Ýš[™^ÙŠ˜Ý\œ™[\™Ù]
NÝ\ËœØÙ[™S\ÝœÜXÙJKJKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ˜Ý\œ™[\™Ù]
K˜Ý\œ™[\™Ù]œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™TØÙ[™U\ØNM\ÊKØš”ÛÛœ\Ú
˜Ý\œ™[\™Ù]
_KKœ›ÝÝ\KœÚÝÕ\ÚÕ\ÏY[˜Ý[ÛŠ
^Ý˜\ˆOSØš”ÛÛœÜ
Ù[\•\Ò][T™[™\ˆŠNÙK˜›ÝÛOLŒÌ‹KšÜš^›Û[Ù[\LK›X™[^[™›Ï]\Ë˜YÚ[
JK\Ë\ÚÕ\Ó\Ý[œÚY
JKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™U\ÚÕ\ØNM\ÊNÙ›ÜŠ˜\ˆO]\Ë\ÚÕ\Ó\Ý›[™ÝLNÚOLÚKKJ^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë\ÚÕ\Ó\ÝÚWJNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\Ë\ÚÕ\Ó\ÝÚWJNÜËÊØ›ÝÛNŒŒÌŠÌÌ
š_KL
__KKœ›ÝÝ\Kœ™[[Ý™U\ÚÕ\ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë\ÚÕ\Ó\Ýš[™^ÙŠ˜Ý\œ™[\™Ù]
NÝ\Ë\ÚÕ\Ó\ÝœÜXÙJKJKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ˜Ý\œ™[\™Ù]
K˜Ý\œ™[\™Ù]œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™U\ÚÕ\ØNM\ÊKØš”ÛÛœ\Ú
˜Ý\œ™[\™Ù]
_KKœ›ÝÝ\KœÚÝÕ\ÏY[˜Ý[ÛŠ
^ÚYŠ
^Ý˜\ˆOSØš”ÛÛœÜ
•\Ò][UšY]ÈŠNÙK›YLK˜›ÝÛOLNL\Ë˜YÚ[
JKK›X™[^[™›Ï]\Ë›\Ý[œÚY
JKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™U\Ò][WØNM\ÊNÙ›ÜŠ˜\ˆO]\Ë›\Ý›[™ÝLNÚOLÚKKJ^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë›\ÝÚWJNÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\Ë›\ÝÚWJNÜËÊØ›ÝÛNŒNL
ÌÌ
š_KÌ
___KKœ›ÝÝ\Kœ™[[Ý™U\Ò][WØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]˜Ý\œ™[\™Ù]ÙKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ëœ™[[Ý™U\Ò][WØNM\ÊKK›YLÌK˜›ÝÛOLÌÝ˜\ˆO]\Ë›\Ýš[™^ÙŠJNÝ\Ë›\ÝœÜXÙJKJKØš”ÛÛœ\Ú
J_KKœ›ÝÝ\KœÚÝÑÛÛÙ™]Ø\™\Y[˜Ý[ÛŠ
^Ý\Ëœ™]Ø\™\\Ýœ\Ú

K[Y\“YÜ‹š[œÊ
Kš\Ñ^\ÝÊ\Ë™ÛÛÙ™]Ø\™[Y\—ØNM\Ê_[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠM‹\Ë™ÛÛÙ™]Ø\™[Y\—ØNM\Ê_KKœ›ÝÝ\KœÚÝÑÛÛÙ\]Z\\Y[˜Ý[ÛŠ
^Ý\Ë™ÛÛÙ\]Z\\Ýœ\Ú

K[Y\“YÜ‹š[œÊ
Kš\Ñ^\ÝÊ\Ë™ÛÛÙ\]Z\[Y\—ØNM\Ê_[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠM‹\Ë™ÛÛÙ\]Z\[Y\—ØNM\Ê_KKœ›ÝÝ\KœÚÝÐ›Þ\Y[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™P›ÞÝNÝ\Ë™ÛÛÙ\]Z\\Ýœ\Ú
JK[Y\“YÜ‹š[œÊ
Kš\Ñ^\ÝÊ\Ë™ÛÛÙ\]Z\[Y\—ØNM\Ê_[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠM‹\Ë™ÛÛÙ\]Z\[Y\—ØNM\Ê_KKœ›ÝÝ\K™ÛÛÙ™]Ø\™[Y\—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ÎÚYŠO]\Ëœ™]Ø\™\\Ý›[™Ý
\™]\›ˆ›ÚY[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë™ÛÛÙ\]Z\[Y\—ØNM\ÊNÚYŠ]\Ëš\ÕØZ]
^Ý˜\ˆNÚYŠ\Ëœ™]Ø\™\š\Õ\Ú[™ß
O]\Ëœ™]Ø\™\
KJ^ÙKžMLKžOMÍLK˜[OLKKœ\™[\Ë˜YÚ[
JKKš\Õ\Ú[™ÏHL\Ëš\ÕØZ]HLK™]O]\Ëœ™]Ø\™\\ÝœÜ

NÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]
JNÚKÊÞNŒKÌ
KØZ]
YLÊKÊØ[NŒKYLÊK˜Ø[
[˜Ý[ÛŠ
^ÙKš\Õ\Ú[™ÏHLKš\ÕØZ]HLKœ™[[Ý™PÚ[
J_J___KKœ›ÝÝ\K™ÛÛÙ\]Z\[Y\—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ÎÚYŠO]\Ë™ÛÛÙ\]Z\\Ý›[™Ý
\™]\›ˆ›ÚY[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë™ÛÛÙ\]Z\[Y\—ØNM\ÊNÚYŠ]\Ëš\ÕØZ]
^Ý˜\ˆNÚYŠ\Ë™\]Z\\Kš\Õ\Ú[™ß
O]\Ë™\]Z\\JKJ^ÙKžMLKžOMÍLK˜[OLKKœ\™[\Ë˜YÚ[
JKKš\Õ\Ú[™ÏHL\Ëš\ÕØZ]HLK™]O]\Ë™ÛÛÙ\]Z\\ÝœÜ

NÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]
JNÚKÊÞNŒKÌ
KØZ]
YLÊKÊØ[NŒKYLÊK˜Ø[
[˜Ý[ÛŠ
^ÙKš\Õ\Ú[™ÏHLKš\ÕØZ]HLKœ™[[Ý™PÚ[
J_J___KKœ›ÝÝ\KœÚÝÔ™]Ø\™›ÞY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™P›ÞÝNÝ\Ë™ÛÛÙ\]Z\\Ýœ\Ú
JK[Y\“YÜ‹š[œÊ
Kš\Ñ^\ÝÊ\Ë™ÛÛÙ\]Z\[Y\—ØNM\Ê_[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠM‹\Ë™ÛÛÙ\]Z\[Y\—ØNM\Ê_KKœ›ÝÝ\KœÚÝÔÚÚ[\Y[˜Ý[ÛŠ
^Ý\ËœÚÚ[\\Ýœ\Ú

K[Y\“YÜ‹š[œÊ
Kš\Ñ^\ÝÊ\ËœÚÚ[\[Y\—ØNM\Ê_[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠM‹\ËœÚÚ[\[Y\—ØNM\Ê_KKœ›ÝÝ\KœÚÚ[\[Y\—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ÎÚYŠO]\ËœÚÚ[\\Ý›[™Ý
\™]\›ˆ›ÚY[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\ËœÚÚ[\[Y\—ØNM\ÊNÚYŠ]\Ëš\ÕØZ]
^Ý˜\ˆNÚYŠ\ËœÚÚ[\Kš\Õ\Ú[™ß
O]\ËœÚÚ[\JKJ^ÙKžMLKžOMÍLK˜[OLK\Ë˜YÚ[
JKKš\Õ\Ú[™ÏHL\Ëš\ÕØZ]HLK™]O]\ËœÚÚ[\\ÝœÜ

NÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]
JNÚKÊÞNŒKÌ
KØZ]
YLÊKÊØ[NŒKYLÊK˜Ø[
[˜Ý[ÛŠ
^ÙKš\Õ\Ú[™ÏHLKš\ÕØZ]HLKœ™[[Ý™PÚ[
J_J___KKœ›ÝÝ\KœÚÝÒ][U\Y[˜Ý[ÛŠ
^Ý\Ë™\]Z\][S\Ýœ\Ú

K[Y\“YÜ‹š[œÊ
Kš\Ñ^\ÝÊ\Ëš][U\[Y\—ØNM\Ê_[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠM‹\Ëš][U\[Y\—ØNM\Ê_KKœ›ÝÝ\Kš][U\[Y\—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ÎÚYŠO]\Ë™\]Z\][S\Ý›[™Ý
\™]\›ˆ›ÚY[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ëš][U\[Y\—ØNM\ÊNÚYŠ]\Ëš\ÕØZ]
^Ý˜\ˆNÚYŠ\Ë™\]Z\\š\Õ\Ú[™ß
O]\Ë™\]Z\\
KJ^ÙKžMLKžOMÍLK˜[OLK\Ë˜YÚ[
JKKš\Õ\Ú[™ÏHL\Ëš\ÕØZ]HLK™]O]\Ë™\]Z\][S\ÝœÜ

NÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]
JNÚKÊÞNŒKÌ
KØZ]
YLÊKÊØ[NŒKYLÊK˜Ø[
[˜Ý[ÛŠ
^ÙKš\Õ\Ú[™ÏHLKš\ÕØZ]HLKœ™[[Ý™PÚ[
J_J___KKœ›ÝÝ\KœÚÝÒX\][U\Y[˜Ý[ÛŠ
^Ý\Ë™\]Z\X\][S\Ýœ\Ú

K[Y\“YÜ‹š[œÊ
Kš\Ñ^\ÝÊ\Ëš][RX\\[Y\—ØNM\Ê_[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠM‹\Ëš][RX\\[Y\—ØNM\Ê_KKœ›ÝÝ\Kš][RX\\[Y\—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ÎÚYŠO]\Ë™\]Z\X\][S\Ý›[™Ý
\™]\›ˆ›ÚY[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ëš][RX\\[Y\—ØNM\ÊNÚYŠ]\Ëš\ÕØZ]
^Ý˜\ˆNÚYŠ\Ë™\]Z\X\\š\Õ\Ú[™ß
O]\Ë™\]Z\X\\
KJ^ÙKžMLKžOMÌLËK˜[OLK\Ë˜YÚ[
JKKš\Õ\Ú[™ÏHL\Ëš\ÕØZ]HLK™]O]\Ë™\]Z\X\][S\ÝœÜ

NÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]
JNÚKÊÞNMŒßKÌ
KØZ]
YLÊKÊØ[NŒKYLÊK˜Ø[
[˜Ý[ÛŠ
^ÙKš\Õ\Ú[™ÏHLKš\ÕØZ]HLKœ™[[Ý™PÚ[
J_J___K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
\ÕšY]Ëœ›ÝÝ\K•\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ\ÕšY]Ë^Y\“YÜ‹•RWÕ\ÊNÝ˜\ˆ]OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÝÕ]QXÏ^ßKK˜Ý\”Ù[XÝ›ÛOLKœÞ\ÒYTXÚØYÙRQ•]KKœ™YÓ™]\ÙÊKKœÜÝ\Ý\]T™\Ý[
KKœ™YÓ™]\ÙÊ‹K™ÐY™\Ý[ØNM
KKœ™YÓ™]\ÙÊËK™Ô™[[Ý™T™\Ý[ØNM
KKœ™YÓ™]\ÙÊK™Õ\]TÚÝÔ™\Ý[ØNM
K_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\K™Ù]Ý[ÝÙ\Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\Ë›\Ý›[™ÝOLOLÝšNÚJÊÊ^Ý˜\ˆÏ]\Ë›\Ý™Ù]][P]
JNÜË™[™[YOL	‰ŠJÏ\ËœÝÙ\Š_\™]\›ˆ_KKœ›ÝÝ\KœÜÝ\ÙU]OY[˜Ý[ÛŠ
^Ü™]\›ˆKKœ›ÝÝ\KœÙ[™Ù]\ÝY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊJ_KKœ›ÝÝ\KœÜÝ\Ý\]T™\Ý[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO^ßKO]œ™XY[

KÏLÚOœÎÊÊÜÊYVÝœ™XY[

WO]œ™XY[œÚYÛ™Y[

NÝ\Ëš[š]\Ý[™›ÊJK\ËœÚÝÕ]QXÏ^ßNÙ›ÜŠ˜\ˆTÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹ÏLÛœÎÜÊÊÊ^Ý˜\ˆÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊNÛ[O[É‰Š\ËœÚÝÕ]QXÖÓ[X™\ŠÊWO[Ë]J__KKœ›ÝÝ\K™ÐY™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ú[™ÙJœ™XY[

Kœ™XY[œÚYÛ™Y[

J_KKœ›ÝÝ\K™Ô™[[Ý™T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ú[™ÙJœ™XY[

KLJ_KKœ›ÝÝ\KœÙ[™Ú[™ÙTÚÝÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\Ê
NÚKÜš]TÚÜ

KKÜš]R[
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\K™Õ\]TÚÝÔ™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOQ[]SYÜ‹š[œÊ
K™Ù][]PžR[™Jœ™XYÝX›J
JNÚYŠI‰ŠKš[™›Ó[Ù[]O]œ™XY[

KK\]U]J
KKX[OOUX[K“^JJ^Ý˜\ˆOYKš[™›Ó[Ù[š[™^ÏL]\ËœÚÝÕ]QXÖÚW_ÙKš[™›Ó[Ù[ÜÏYKš[™›Ó[Ù[]K\ËœÚÝÕ]QXÖÚWO\Ë\ËœÜÝ]TÚÝÊKËŠ__KKœ›ÝÝ\KœÜÝ]TÚÝÏY[˜Ý[ÛŠKJ^Ü™]\›–ÝKW_KKœ›ÝÝ\KœÙ]]OY[˜Ý[ÛŠJ^Ù›ÜŠ˜\ˆH[ˆ\ËœÚÝÕ]QXÊZYŠ\ËœÚÝÕ]QXÖÚWOOYJ^Ý\ËœÙ[™Ú[™ÙTÚÝÊ[X™\ŠJK
NØœ™XZß]\ËœÙ[™Ú[™ÙTÚÝÊJ_KKœ›ÝÝ\KœÛÜ[˜×ØNMY[˜Ý[ÛŠJ^Ü™]\›ˆ™[™[YOOYK™[™[YOÝ˜ÛÛ™šYËœÛÜ™K˜ÛÛ™šYËœÛÜÌN‹LN™[™[YOÌN‹L_KKœ›ÝÝ\Kš[š]\Ý[™›ÏY[˜Ý[ÛŠ
^Ý\Ë[YQXÝ]\Ëš[™›ÑXÝ^ßK\Ë—ÝÝ[]œÏV×K\Ë—ÝÝ[]œÕ^[™]È]ZK\œ˜^PÛÛXÝ[ÛŽÝ˜\ˆOV×KOQÛØ˜[ÛÛ™šYË•]PÛÛ™ŽÙ›ÜŠ˜\ˆÈ[ˆJ^Ý˜\ˆ[™]È]R[™›ÊVÜ×JNÚYŠ‹˜ÛÛ™šYË’Y[ˆ
^Û‹™[™[YO]Û‹˜ÛÛ™šYË’YNÙ›ÜŠ˜\ˆÈ[ˆ‹˜ÛÛ™šYË˜]œÊ]\Ë—ÝÝ[]œÖÛ‹˜ÛÛ™šYË˜]œÖÛ×K\WOJ\Ë—ÝÝ[]œÖÛ‹˜ÛÛ™šYË˜]œÖÛ×K\W_
JÛ‹˜ÛÛ™šYË˜]œÖÛ×K˜[Y_Y[ÙH‹™[™[YOKLNÙVÙK›[™ÝO]\Ëš[™›ÑXÝÛ‹˜ÛÛ™šYË’YO[‹‹˜]œÕÝ[]\Ë—ÝÝ[]œÕ^YKœÛÜ
\ËœÛÜ[˜×ØNM
K\Ë›\Ý[™]È]ZK\œ˜^PÛÛXÝ[ÛŠJK\Ë\]UÝ[]œÔ™\Ý[ØNM

_KKœ›ÝÝ\K˜Ú[™ÙOY[˜Ý[ÛŠJ^ÚYŠ\Ëš[™›ÑXÝ	‰[ˆ\Ëš[™›ÑXÝ	‰[ˆ\Ë[YQXÝOYOL
^Ý˜\ˆO]\Ëš[™›ÑXÝÝNÚK™[™[YOYK™OÙ[]H\Ë[YQXÝÝN\Ë[YQXÝÝOYK\Ë›\ÝœÛÝ\˜ÙKœÛÜ
\ËœÛÜ[˜×ØNM
K\Ë›\Ýœ™Yœ™\Ú

NÙ›ÜŠ˜\ˆÏL™OËLNŒKLÏZK˜ÛÛ™šYË˜]œÎÛË›[™ÝÛŠÊÊ^Ý˜\ˆO[ÖÛ—NÝ\Ë—ÝÝ[]œÖØK\WOJ\Ë—ÝÝ[]œÖØK\W_
JÜÊ˜K˜[Y_]\Ë\]UÝ[]œÔ™\Ý[ØNM

KÏŒ	‰\Ë˜]]ÕÙX\•]R[™›×ØNM
J__KKœ›ÝÝ\K\]UÝ[]œÔ™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë—ÝÝ[]œÕ^œÛÝ\˜ÙNÝ›[™ÝLÙ›ÜŠ˜\ˆH[ˆ\Ë—ÝÝ[]œÊ]\Ë—ÝÝ[]œÖÙWOŒ	‰œ\Ú
]R[™›Ë™›Ü›X]]Š[X™\ŠJK\Ë—ÝÝ[]œÖÙWJJNÚYŠO]›[™Ý
Y›ÜŠ˜\ˆO]\Ëš[™›ÑXÝÌWK˜ÛÛ™šYË˜]œËÏLZNÜÏ‹›[™ÝÜÊÊÊ^Ý˜\ˆÏ[–Ü×NÝœ\Ú
]R[™›Ë™›Ü›X]]ŠË\K
J_]\Ë—ÝÝ[]œÕ^œ™Yœ™\Ú

_KKœ›ÝÝ\K˜]]ÕÙX\•]R[™›×ØNMY[˜Ý[ÛŠ
^ÚYŠMÏO]˜ÛÛ™šYË’Y	‰[œÝ[˜Ù[Ùˆ]R[™›ÊY›ÜŠ˜\ˆOTÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹ÏLÚOœÎÜÊÊÊZYŠYKš[œÊ
KœÚÝÕ]QXÖÜ×J^ÙKš[œÊ
KœÙ]]JË˜ÛÛ™šYË’Y
NØœ™XZß_KK•UWÕÒS—Ô‘Q“TÒÔS‘SH•UWÕÒS—Ô‘Q“TÒÔS‘S‹K”ÒSSWÒRQÒNMK‘VS‘ÒRQÒLÎ_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
]Kœ›ÝÝ\K•]HŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý]OU]Kš[œË˜š[™
]J_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆ]R[™›ÏY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\Ë˜ÛÛ™šYÏ]\™]\›ˆØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\K˜]œÕ^‹ÙÙ]™[˜Ý[ÛŠ
^ÚYŠ]\Ë—Ø]œÕ^
^Ù›ÜŠ˜\ˆOV×KO]\Ë˜ÛÛ™šYË˜]œË›[™ÝÚKKNÊYVÚWO]™›Ü›X]]Š\Ë˜ÛÛ™šYË˜]œÖÚWK\K\Ë˜ÛÛ™šYË˜]œÖÚWK˜[YJNÝ\Ë—Ø]œÕ^[™]È]ZK\œ˜^PÛÛXÝ[ÛŠJK\ËœÝÙ\U\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\Š\Ë˜ÛÛ™šYË˜]œÊ_\™]\›ˆ\Ë—Ø]œÕ^K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK™›Ü›X]]Y[˜Ý[ÛŠJ^Ý˜\ˆO[™]ÈYÜ™]‘]™[\Ü]Ú\ŽÜ™]\›ˆKšP]šX]Q]K™Ù]]”ÝžU\J
JÈ»ï&ˆ‹KTÝš[™ÊJKK^ÛÛÜLMÎNÌ_KJ
N××Ü™Y›XÝ
]R[™›Ëœ›ÝÝ\K•]R[™›ÈŠNÝ˜\ˆ]R][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Û•\ØNMY[˜Ý[ÛŠ
^Ý\™Ù]O]\Ë˜”Ù]Õ]Kš[œÊ
KœÜÝ\ÙU]J\Ë™]JNŠ\Ë˜Ý\œ™[Ý]OH™^[™ˆO]\Ë˜Ý\œ™[Ý]OÈ™^[™ŽˆœÚ[\H‹Y\ÜØYÙPÙ[\‹š[œÊ
K™\Ü]Ú
]K•UWÕÒS—Ô‘Q“TÒÔS‘S\Ë\Ë˜Ý\œ™[Ý]JJ_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^ÚYŠ\Ë˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ë›Û”™[[Ý™WØNM\ÊK\Ë™]H[œÝ[˜Ù[Ùˆ]R[™›Ê^Ý˜\ˆ]\Ë™]NÚYŠ\Ë˜ÛÛ™][Û•^H±$xnà]HÚxnáÛˆš8n«[»ï&ˆŠÝ˜ÛÛ™šYË˜ÛÛ™][Û‹\Ë]SXß
\Ë]SXÏSØš”ÛÛœÜ
“XÐ[š[X][ÛˆŠK\Ë]SXËžLLÌ\Ë]SXËžOMK\Ë˜YÚ[]
\Ë]SXËŒ
JK˜ÛÛ™šYË™Y™Š^Ý\Ëš[YËœÛÝ\˜ÙOHˆŽÝ˜\ˆOT™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÝ˜ÛÛ™šYË™Y™ŽÈ˜Ú[™Ú[ÞžWØšYÈO]˜ÛÛ™šYË™Y™‰‰Š\Ë]SXËœØØ[V]\Ë]SXËœØØ[VOKJK\Ë]SXËœ^Qš[JKLJ_Y[ÙH˜ÛÛ™šYËš[YÉ‰Š\Ëš[YËœÛÝ\˜ÙO]˜ÛÛ™šYËš[YË\Ë]SXËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜Ú[™Ú[×Ý]‹LJJNÚYŠ™[™[YOL
^Ý\Ë˜”Ù]›X™[]˜ÛÛ™šYË’YOU]Kš[œÊ
KœÚÝÕ]QXÖÕ]Kš[œÊ
K˜Ý\”Ù[XÝ›ÛWOÈ•0è[ÈŽ•]Kš[œÊ
KœÚÝÕ]QXÖÕ]Kš[œÊ
K˜Ý\”Ù[XÝ›ÛWOÈ•^H1$xnåZHŽˆ•˜[™È¸nâÈ‹\Ë˜”Ù]š\ÚX›OHL\Ë[YKš\ÚX›OHLÝ˜\ˆÏQ]U][Ë™›Ü›X]Z[šQ]U[YJ™[™[YJKÌYLÎÝ\Ë[YK^LO]™[™[YOÈ•8nçZH8n¨[»ï&•±*[ššxná[ˆŽˆ•8nçZH8n¨[»ï&ˆŠÑ]U][Ë™Ù]›Ü›X]žTÙXÛÛ™
ËŠK\Ë›X“XÚËš\ÚX›OHL_Y[ÙH\Ë˜”Ù]š\ÚX›OHLK\Ë[YKš\ÚX›OHLK\Ë›X“XÚËš\ÚX›OHLÂˆœÝš[™ÈO]\[ÙˆKœ˜\™U^Ý˜ÛÛ™šYËœ˜\™WI‰ŠKœ˜\™U^Ý˜ÛÛ™šYËœ˜\™WOU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ±$8næHxn¯Û{ï&ŸÎˆŠÙKœ˜\™U^Ý˜ÛÛ™šYËœ˜\™WJJK\Ë›X”˜\™K^›ÝÏYKœ˜\™U^Ý˜ÛÛ™šYËœ˜\™WK\Ë—ÜÝÙ\ˆO]œÝÙ\‰‰Š\Ë—ÜÝÙ\‰‰š]X\[X™\‹š[œÊ
K™\ÜÝ›ÞS[TXÊ\ËœÝÙ\‹™Ù]Ú[]

JK\ËœÝÙ\‹˜YÚ[]
š]X\[X™\‹š[œÊ
K˜Ü™X]S[TXÊœÝÙ\Š”ÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹™ŠK
K\Ë—ÜÝÙ\]œÝÙ\ŠK\Ë˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Û•\ØNM\Ê_Y[ÙH\Ëš[YËœÛÝ\˜ÙOHˆ‹\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë]SXÊK\Ë˜ÛÛ™][Û•^Hˆ‹\Ë—ÜÝÙ\‰‰Š\Ë—ÜÝÙ\Lš]X\[X™\‹š[œÊ
K™\ÜÝ›ÞS[TXÊ\ËœÝÙ\‹™Ù]Ú[]

JJK\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Û•\ØNM\Ê_KKœ›ÝÝ\K›Û”™[[Ý™WØNMY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘SSÕ‘QÑ”“ÓWÔÕQÑK\Ë›Û”™[[Ý™WØNM\ÊKØ]Ú\•][œ™[[Ý™Qœ›ÛP\œ˜^PÛÛXÝ[ÛŠ\Ë˜]œË™]T›ÝšY\ŠKØ]Ú\•][œ™[[Ý™Qœ›ÛP\œ˜^PÛÛXÝ[ÛŠ\Ë˜]œÕÝ[™]T›ÝšY\ŠK\Ë˜]œË™]T›ÝšY\[[\Ë˜]œÕÝ[™]T›ÝšY\[[KKœ˜\™U^VÈŒ˜™ŽYI•”8nåH0í™È‹Œ™Œ‰•’xn¯ÛH‹ŒÎX‰•”]pïHÚpèH‹ŒXÌ	•”]xnäXÈÚ0ëH‹ŒXÍŒM	••°íÛÛ™È—K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
]R][T™[™\‹œ›ÝÝ\K•]R][T™[™\ˆŠNÝ˜\ˆ]UšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ[OO]	‰˜\J\Ë\™Ý[Y[Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[•]H‹\Ë›\Ýš][T™[™\™\U]R][T™[™\‹\Ëš\ÕÜ]™[HLK_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
]UšY]Ëœ›ÝÝ\K•]UšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ]UšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆœ™XZÑÝÛ“\Ý][Q]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^ß\™]\›ˆJ
N××Ü™Y›XÝ
œ™XZÑÝÛ“\Ý][Q]Kœ›ÝÝ\Kœ™XZÑÝÛ“\Ý][Q]HŠNÝ˜\ˆ[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÞ\ÒYTXÚØYÙRQ•™X\Ý\™R[Kœ™YÓ™]\ÙÊKK™Ò[™\Ý[
KKœ™YÓ™]\ÙÊ‹KœÜÝ™\Ý\Ý[™›ÊK_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\KœÙ[™[Y[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÙKÜš]TÚÜ

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™[\ÝY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊŠ_KKœ›ÝÝ\K™Ò[™\Ý[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]œ™XYÚÜ

KO]œ™XY[

KÏV×KLÚO›ŽÛŠÊÊ\ÖÛ—OVÝœ™XY[

Kœ™XY[

WNÕšY]ÓYÜ‹š[œÊ
Kš\ÔÚÝÊ[™\Ý[Ú[ŠOÝ\ËœÜÝ[™\Ý[
KË
NŠšY]ÓYÜ‹š[œÊ
K›Ü[Š[™\Ý[Ú[‹KË
K\ËœÜÝ[™\Ý[
KË
J_KKœ›ÝÝ\KœÜÝ[™\Ý[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÜ™]\›ˆKKœ›ÝÝ\KœÜÝ™\Ý\Ý[™›ÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]œ™XYÚÜ

KOV×KÏLÙOœÎÜÊÊÊZVÜ×OVÝœ™XYÝš[™Ê
Kœ™XY[

WNÜ™]\›ˆKœ™]™\œÙJ
K_K_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
[œ›ÝÝ\K’[ŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ýš[R[š[œË˜š[™
[
_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆœ™XZÑÝÛ’][T™[™\™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜ÛÛ™šYÒQL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\ÊK\Ëš][RXÛÛ‹š[YÒ›Ø‹š\ÚX›OHL_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë™]Kš][PÛÛ™šYÎÚYŠžœÓ]™[ŒÝ\Ë›]™[^HÚ^xnàÛˆŠÝžœÓ]™[
ÈˆŽ\Ë›]™[^]›]™[È“‹ˆŠÝ›]™[ˆ“‹ŒH‹\Ëš][RXÛÛ‹œÙ]]J
K\Ë™\]Z\˜[YK^HˆŠÝ›˜[YK\Ë™\]Z\˜[YK^ÛÛÜPÛÛ™šYÒ][K™Ù]]X[]PÛÛÜŠ
KÛÛ™šYÒ][K™Ù]\J
OOR][U\K•TWÎJ^Ý˜\ˆOR[\Ý˜][ÛœÔÞ\Ý[Kš[œÊ
K™Ù]XÛÛ\ÜÙPÛÛ™šYÐžR][RYØNM
šY
KOLÚYŠJZOYK˜[YNÙ[Ù^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÑXÛÛ\ÜÙVÍ×NÜÉ‰ŠO\Ë˜[YJ_]\Ë™\ØË^H’Ú[š™ÚxnáÛH1$8näÈÚpè[HŠÚK\Ë\š\ÚX›OHL\Ë\ž]\Ë™\]Z\˜[YKž
Ý\Ë™\]Z\˜[YKÚY\Ë›]™[^HˆŸY[Ù^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÝšYNÚYŠ[Š\™]\›ŽÝ˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÛ‹œÝÛ™RYNÚYŠ[Ê\™]\›ŽÝ\Ë™\ØË^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\ŠË›˜[YJÈ›ÛÛÛÜIÈÌÎX‰ÏˆŠÛ‹œÝÛ™S[JÈÙ›ÛˆŠNÝ˜\ˆOPÛÛ™šYÒ][K™Ù]ÝX•\J
KU\Ù\‘\]Z\š[œÊ
K™Ù]\]Z\ÛÛ™šYÒQžTÜÐ[™]X[]JKÛÛ™šYÒ][K™Ù]]X[]J
JKQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÜ—K]žœÓ]™[ÝžœÓ]™[ŒÏZžœÓ]™[ÚžœÓ]™[ŒO]›]™[Ý›]™[ŒZ›]™[Ú›]™[ŒLYM
›
ÝKÏLYM
˜ÊÜÙÏ™Õ\Ù\–œÔÞ\Ý[Kš[œÊ
K›XÉ‰XÝÜ‹›]™[\Ý\Ë\š\ÚX›OHLNŠ\Ë\š\ÚX›OHL\Ë\ž]\Ë™\]Z\˜[YKž
Ý\Ë™\]Z\˜[YKÚY
N\Ë\š\ÚX›OHL_]\Ë˜ÛÛ™šYÒQ]\Ë™]Kš[™_K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
œ™XZÑÝÛ’][T™[™\™\‹œ›ÝÝ\Kœ™XZÑÝÛ’][T™[™\™\ˆŠNÝ˜\ˆœ™XZÑÝÛ“\ÝšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[œ™XZÑÝÛˆ‹\Ëš\ÕÜ]™[HL\Ë™\]Z\\Ýš][T™[™\™\Pœ™XZÑÝÛ’][T™[™\™\‹\Ë›\Ý]O[™]È]ZK\œ˜^PÛÛXÝ[Û‹\Ë™\]Z\\Ý™]T›ÝšY\]\Ë›\Ý]K\Ë™ØZ[“\Ýš][T™[™\™\QØZ[‘ÛÛÙÒ][T™[™\‹\Ë™ÛÓ\Ý[™]È]ZK\œ˜^PÛÛXÝ[Û‹\Ë™ØZ[“\Ý™]T›ÝšY\]\Ë™ÛÓ\ÝKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›Û•\ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›Û•\ØNM
K\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›Û•\ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\Ë\]Q]WØNM
K\Ë˜YÝXÚ]™[
\Ë\Ë›Û•\ØNM
K\Ë™ØZ[“\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û‘Û×ØNM\ÊK\Ëœ]X[]O]ÌK\Ë\]Q]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›Û•\ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›Û•\ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›Û•\ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›Û•\ØNM
K\Ë™ØZ[“\Ýœ™[[Ý™Q]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û‘Û×ØNM\ÊK\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K\]Q]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑ\]Z\ÐžT]X[]J\Ëœ]X[]JNÝœÛÜ
[˜Ý[ÛŠJ^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝ˜ÛÛ™šYÒQKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙK˜ÛÛ™šYÒQNÜ™]\›ˆKžœÓ]™[œËžœÓ]™[ÌNšKžœÓ]™[ËžœÓ]™[ËLNšK›]™[œË›]™[ÌNšK›]™[Ë›]™[ËLNŒJK\Ë›\Ý]KœÛÝ\˜ÙO]Ý˜\ˆO]\Ëš][S\ÝÝ\Ëœ]X[]WKOYK›[™ÝÝ\Ë™ÛÓ\Ýœ™[[Ý™P[

NÙ›ÜŠ˜\ˆÏLÜÏK›[™ÝÜÊÊÊ]\Ë™ÛÓ\Ý˜Y][JVÜ×JNÝ\Ëœ™Y\ÚÜ×ØNM
J_KKœ›ÝÝ\Kœ™Y\ÚÜ×ØNMY[˜Ý[ÛŠ
^Ý\Ë˜ÛÛ˜Z[‹šZYÚMŒ
\Ë™\]Z\ØÜ›Û\‹šZYÚLÌL
ÍŒ
ŠË]
_KKœ›ÝÝ\K›Û•\ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŒ˜Ø\ÙH\Ë˜ÛÜÙPŽ˜Ø\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎÙY˜][šYŠ\™Ù][œÝ[˜Ù[Ùˆ]ZK]ÛŠ\ÝÚ]Ú
\™Ù]›˜[YJ^ØØ\ÙH˜œ™XZÑÝÛˆŽ•\Ù\‘\]Z\š[œÊ
KœÙ[™ÛY[\]Z\
KÝ\™Ù]œ\™[™]WJ___KKœ›ÝÝ\K›Û‘Û×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]š][NÚYŠ[O]š][J^Ý˜\ˆOUšY]ÓYÜ‹š[œÊ
KšY]ÓÜ[ÚXÚÊVÌWKVÌ—JNÚI‰ŠØ[YQÝZY\‹™ÝZY[˜ÙJVÌWKVÌ—JKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊJ__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
œ™XZÑÝÛ“\ÝšY]Ëœ›ÝÝ\Kœ™XZÑÝÛ“\ÝšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊœ™XZÑÝÛ“\ÝšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆ×ÙÜ™]Ý\H“°è›™Èøn©\‹×ÛZ^H’8nèÜ0èš‹ÛÙ\ÜÑ\]Z\[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK—Ü›ÛRYLK›˜[YOH•8n©Ûˆ˜[™È‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ý\Ëš[š]

_KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\Ë˜Ý\’[™^L\Ë™Ù]™X\Ý\™P‹^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š	ÏH™YH™]™[ˆO‰ÊÝ\Ë™Ù]™X\Ý\™P‹^
ÈÝOØOˆŠK\Ë™Ù]™X\Ý\™P‹ÝXÚ[˜X›YHL\Ë˜Ú\™ÙQY™ŒO[™]ÈXÐ[š[X][Û‹\Ë˜Ú\™ÙQY™ŒKžLŽM‹\Ë˜Ú\™ÙQY™ŒKžOLÌ‹\Ë˜Ú\™ÙQY™ŒKÝXÚ[˜X›YHLK\Ë˜Ú\™ÙQY™ŒKœØØ[VOLK\Ë˜Ú\™ÙQY™ŒKœØØ[VLKŒ_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë™Ù]™X\Ý\™P‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Ü[”ÛY[šY]×ØNM\ÊNÙ›ÜŠ˜\ˆOLÎšNÚJÊÊ^Ý˜\ˆÏ]\ÖÈ™\]Z\ŠÚWNÝ\Ë˜YÝXÚ]™[
Ë\Ë›Û”Ù[XÝØNM
K\Ë˜YÝXÚ]™[
Ë›Z^‹\Ë›Û”Ù[XÝØNM
_]\Ë˜YÝXÚ]™[
\Ë™^XÝ]P‹\Ë™^XÝ]PÐ—ØNM
K\Ë›ØœÙ\™J\Ù\‘\]Z\š[œÊ
KœÜÝZ^\]Z\\Ý\Ë›Z^Ð—ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ë\]UšY]×ØNM
K\Ë˜Ý\’[™^]\Ë˜ÛÛ\]\Ý\’[™^ØNM

K\Ë\]UšY]×ØNM

K\Ë™Y™\œV×_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë™Ù]™X\Ý\™P‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Ü[”ÛY[šY]×ØNM\ÊNÙ›ÜŠ˜\ˆOLÎšNÚJÊÊ^Ý˜\ˆÏ]\ÖÈ™\]Z\ŠÚWNÝ\Ëœ™[[Ý™UÝXÚ]™[
Ë\Ë›Û”Ù[XÝØNM
K\Ëœ™[[Ý™UÝXÚ]™[
Ë›Z^‹\Ë›Û”Ù[XÝØNM
_Q\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë˜Ú\™ÙQY™ŒJK\Ëœ™[[Ý™UÝXÚ]™[
\Ë™^XÝ]P‹\Ë™^XÝ]PÐ—ØNM
K\Ëœ™[[Ý™SØœÙ\™J
K\Ë˜ÛX[‘Y™—ØNM

_KKœ›ÝÝ\K›Û”Ù[XÝØNMY[˜Ý[ÛŠ
^ÐXÝÜ‹›]™[ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë™\]Z\˜Ø\ÙH\Ë™\]Z\›Z^Ž\Ë˜Ý\’[™^LØœ™XZÎØØ\ÙH\Ë™\]Z\N˜Ø\ÙH\Ë™\]Z\K›Z^Ž\Ë˜Ý\’[™^LNØœ™XZÎØØ\ÙH\Ë™\]Z\Ž˜Ø\ÙH\Ë™\]Z\‹›Z^Ž\Ë˜Ý\’[™^LŽØœ™XZÎØØ\ÙH\Ë™\]Z\Î˜Ø\ÙH\Ë™\]Z\Ë›Z^Ž\Ë˜Ý\’[™^LÎØœ™XZÎØØ\ÙH\Ë™\]Z\˜Ø\ÙH\Ë™\]Z\›Z^Ž\Ë˜Ý\’[™^MØœ™XZÎØØ\ÙH\Ë™\]Z\N˜Ø\ÙH\Ë™\]Z\K›Z^Ž\Ë˜Ý\’[™^MNØœ™XZÎØØ\ÙH\Ë™\]Z\Ž˜Ø\ÙH\Ë™\]Z\‹›Z^Ž\Ë˜Ý\’[™^MŽØœ™XZÎØØ\ÙH\Ë™\]Z\Î˜Ø\ÙH\Ë™\]Z\Ë›Z^Ž\Ë˜Ý\’[™^Mß]\Ë\]UšY]×ØNM

_KKœ›ÝÝ\K™^XÝ]PÐ—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÚYŠ\œÙR[
\Ë˜Ý\‹^
O\œÙR[
\Ë›™YY^œÝXœÝŠJJJ\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈøn¯Ý[š8n©Ûˆ˜[™ßŠNÚYŠ\Ë™^XÝ]P‹›X™[OX×ÙÜ™]Ý\
]\Ë™Ü™]Ý\ØNM

NÙ[ÙHYŠ\Ë™^XÝ]P‹›X™[OX×ÛZ^
^Ý˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
K™Ù]\]Z\žR[™^
\Ë˜Ý\’[™^
KÏZKš][K˜ÛÛ™šYÒQQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÜ×NÚYŠ›ÚYO[‰‰OOPÛÛ™šYÒ][K™Ù]]X[]JŠJ^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÚKš][K˜ÛÛ™šYÒQKO[ËžœÓ]™[ŒÈÚ^xnàÛˆŠÛËžœÓ]™[
ÈˆŽˆøn©\ŠÛË›]™[
Èˆ‹PÛÛ™šYÒ][K™Ù]]X[]PÛÛÜŠÊKÔÝš[™ÊMŠNÕØ\›•šY]ËœÚÝÊ	Õ¸nâÈ°ëH°èHxnáÛˆ1$X[™È˜[™È¸nâÈ›ÛÛÛÜHˆÉÊÜŠÉÈ‰ÊØJÈÚ0ëH0è[š˜[™È¸nâÏÙ›Û‹ðìÈxn¯Ü8néXÈ8nèÜ0èš˜[™È¸nâÈ1$xnãÈÚ0í™ûï'×ˆ‹[˜Ý[ÛŠ
^ÙK›Z^ØNM

_K\Ê_Y[ÙH\Ë›Z^ØNM

__KKœ›ÝÝ\K™Ü™]Ý\ØNMY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝ\Ë˜Ý\‘\]Z\ÛÛ™šYÒY
ÌWNÜ™]\›ˆ›]™[XÝÜ‹›]™[žœÓ]™[•\Ù\–œÔÞ\Ý[Kš[œÊ
K›Ý›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•”Ø]HÚH°è›™Èøn©\±¬8nèÝ]pèHøn©\š0è›ˆ¸n«]Ú0í™È8nàÈ°è›™Èøn©\ŠN›ÚY\Ù\‘\]Z\š[œÊ
KœÙ[™Ü™]Ý\\]Z\
\Ë—Ü›ÛRY\Ë˜Ý\’[™^
_KKœ›ÝÝ\K™Ü™]Ý\Ð—ØNMY[˜Ý[ÛŠKJ^Ü™]\›ˆOYOÝ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•“°è›™Èøn©\8n©]¸n¨Z_ŠNŠ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê“°è›™Èøn©\0èšðí™ÈŠK›ÚY\Ë\]UšY]×ØNM

J_KKœ›ÝÝ\K›Z^ØNMY[˜Ý[ÛŠ
^Õ\Ù\‘\]Z\š[œÊ
KœÙ[™Z^\]Z\
\Ë—Ü›ÛRY\Ë˜Ý\‘\]Z\ÛÛ™šYÒY\Ë˜Ý\’[™^
_KKœ›ÝÝ\K›Z^Ð—ØNMY[˜Ý[ÛŠKJ^Ü™]\›ˆOYOÝ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’8nèÜ0èš8n©]¸n¨Z_ŠNŠ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’8nèÜ0èš0èšðí™Ë1$pèÈ8nìH1$xnæ[™È˜[™È¸nâÈ0ê›ˆš0è›ˆ¸n«]ŠK›ÚY\Ë\]UšY]×ØNM

J_KKœ›ÝÝ\K›Ü[”ÛY[šY]×ØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K›Ü[Šœ™XZÑÝÛ˜\ÙUšY]Ëœ™XZÑÝÛ˜\ÙUšY]Ë\WÛYÙ[™
_KKœ›ÝÝ\K\]UšY]×ØNMY[˜Ý[ÛŠ
^Ý\Ë\]P[\]Z\][WØNM

K\Ë\]Q]Z[[™[ØNM

K\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]YÙ[™\Ô™\ÛÛ™J
OÊ\Ë˜Ú\™ÙQY™ŒKš\ÚX›OHL\Ë˜Ú\™ÙQY™ŒKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜Ú\™ÙY™ˆ‹LJK\Ë˜Ú\™ÙQY™ŒKœ\™[\Ë˜‘Ü›Ý\˜YÚ[
\Ë˜Ú\™ÙQY™ŒJJNŠ\Ë˜Ú\™ÙQY™ŒKš\ÚX›OHLK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë˜Ú\™ÙQY™ŒJJK\ËœÙ]][T™YÚ[ØNM

_KKœ›ÝÝ\K\]Q]Z[[™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
K™Ù]\]Z\žR[™^
\Ë˜Ý\’[™^
NÚYŠ[O]
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝš][K˜ÛÛ™šYÒQ
ÌWKOLÏLÝ\Ë˜ÛÜÝ[Kš\ÚX›OHLÝ˜\ˆPÛÛ™šYÒ][K™Ù]]X[]Jš][Kš][PÛÛ™šYÊNÚYŠ›ÚYOYI‰ŒO]š][Kš[™I‰O[Š]\Ë›Z^[™[š\ÚX›OHL\Ë›X™[X^š\ÚX›OHL\Ë™Ü™]Ý\[™[š\ÚX›OHLK\Ë˜Ý\‘\]Z\ÛÛ™šYÒY]\Ë\]SZ^[™[ØNM

K\Ë™^XÝ]P‹š\ÚX›OHLK\Ë›™YY^Hˆ‹\Ë˜Ý\‹^Hˆ‹\Ë˜ÛÜÝ[Kš\ÚX›OHLNÙ[Ù^ÚYŠ›ÚYOYI‰ŒO]š][Kš[™I‰O[‰‰ŒHO]š][Kš][PÛÛ™šYË›]™[	‰‹LOOU\Ù\˜YÔÞ\Ý[K™š]Q\]Z\š[™^ÙŠš][K˜ÛÛ™šYÒQ
J^Ý\Ë›Z^[™[š\ÚX›OHLK\Ë™Ü™]Ý\[™[š\ÚX›OHL\Ë˜Ý\‘\]Z\ÛÛ™šYÒY]\Ë\]QÜ™]Ý\[™[ØNM

K\Ë™^XÝ]P‹›X™[X×ÙÜ™]Ý\Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÓYÙ[™]™[\Ý\Ë˜Ý\‘\]Z\ÛÛ™šYÒYNÚO[Ë˜ÛÝ[Ï[Ëš][RYY[Ù^Ý\Ë›Z^[™[š\ÚX›OHL\Ë™Ü™]Ý\[™[š\ÚX›OHLK\Ë˜Ý\‘\]Z\ÛÛ™šYÒY]\Ë\]SZ^[™[ØNM

K\Ë™^XÝ]P‹›X™[X×ÛZ^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÓYÙ[™ÛÛ\ÜÙVÝ\Ë˜Ý\‘\]Z\ÛÛ™šYÒYNÚOXK˜ÛÝ[ÏXKš][RY]˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐÛÝ[žRY
ÊNÝ\Ë›™YY^H‹ÈŠÚK\Ë˜Ý\‹^\ŠÈˆ‹ZOÝ\Ë˜Ý\‹^ÛÛÜPÛÛÜ•][‘Ô‘QS—ÐÓÓÔ—ÓŽ\Ë˜Ý\‹^ÛÛÜPÛÛÜ•][”‘QÐÓÓÔ—Ó‹\Ë™^XÝ]P‹š\ÚX›OHL\Ë›X™[X^š\ÚX›OHL___KKœ›ÝÝ\K\]SZ^[™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆKOPXÝÜ‹›]™[ÚYŠOLJ^Ý˜\ˆÏ]\Ë˜Ý\’[™^TÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
NÙOU\Ù\‘\]Z\š[œÊ
K™Ù]\]Z\ÛÛ™šYÒQžTÜÐ[™]X[]PžQÛÙ
‹ËÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
Kš›ØŠKQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙW_]›ÚYO]	‰ŠžœÓ]™[ŒÝ\Ë›Z^[™[›]™[^HÚ^xnàÛˆŠÝžœÓ]™[
ÈˆŽ\Ë›Z^[™[›]™[^]›]™[È“‹ˆŠÝ›]™[ˆ“‹ŒH‹\Ë›Z^[™[™\]Z\˜[YK^]›˜[YK\Ë›Z^[™[š][RXÛÛ‹š[YÒ›Ø‹š\ÚX›OHLK\Ë›Z^[™[š][RXÛÛ‹œÙ]]J
JNÝ˜\ˆÏV×KOV×KV×KQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÙWNÙ›ÜŠ˜\ˆ[ˆ]šX]Q]K˜[œÛ]JHZÛ_ÛOL
Kœ\Ú
ÛJÈˆŠKËœ\Ú
]šX]Q]K™Ù]]”ÝžU\J]šX]Q]K˜[œÛ]VÛJJK‹œ\Ú
ˆ
ÈŠÓX]™›ÛÜŠ][P˜\ÙK˜Y][Û”˜[™ÙJšÛKÌL
JJNÜ™]\›ˆ\Ë›Z^[™[˜]šX]\Ë˜˜\ÙP]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ][Q]K™Ù]Ýš[™ÐžS™^\Ý
KŠJK\Ë›Z^[™[˜]šX]\Ëœ˜[™]‹^Hˆ‹\Ë›Z^[™[˜]šX]\Ë›˜[YP]‹^R][Q]K™Ù]Ýš[™ÐžS\Ý
ÊK\Ë›Z^[™[˜]šX]\ËœØÛÜ™K^PÛÛ™šYÒ][KœÚ[Ø[[X™\Š
K_KKœ›ÝÝ\K\]QÜ™]Ý\[™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
K™Ù]\]Z\žR[™^
\Ë˜Ý\’[™^
KO]š][K˜ÛÛ™šYÒQOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙWKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙJÌWNÚYŠ›ÚYO\ÊNÙ[Ù^Ý\Ë™Ü™]Ý\[™[˜Ý\“˜[YK^ZK›˜[YJÈˆ‹\Ë™Ü™]Ý\[™[›™^˜[YK^\Ë›˜[YJÈˆ‹KžœÓ]™[ŒÝ\Ë™Ü™]Ý\[™[˜Ý\“]™[^HÚ^xnàÛˆŠÚKžœÓ]™[
ÈˆŽ\Ë™Ü™]Ý\[™[˜Ý\“]™[^ZK›]™[È“‹ˆŠÚK›]™[ˆ“‹ŒH‹ËžœÓ]™[ŒÝ\Ë™Ü™]Ý\[™[›™^]™[^HÚ^xnàÛˆŠÜËžœÓ]™[
ÈˆŽ\Ë™Ü™]Ý\[™[›™^]™[^\Ë›]™[È“‹ˆŠÜË›]™[ˆ“‹ŒH‹\Ë™Ü™]Ý\[™[˜Ý\’][RXÛÛ‹š[YÒ›Ø‹š\ÚX›OHLK\Ë™Ü™]Ý\[™[›™^][RXÛÛ‹š[YÒ›Ø‹š\ÚX›OHLK\Ë™Ü™]Ý\[™[˜Ý\’][RXÛÛ‹œÙ]]JJK\Ë™Ü™]Ý\[™[›™^][RXÛÛ‹œÙ]]JÊNÙ›ÜŠ˜\ˆLNÍ[ŽÛŠÊÊ]\Ë™Ü™]Ý\[™[˜]šX]\ÖÈ˜\œ›ÝÈŠÛ—Kš\ÚX›OHLNÝ˜\ˆÏV×KOV×KV×KV×KV×KÏQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÙWKOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÙJÌWK]š][KLNÙ›ÜŠ˜\ˆÈ[ˆ]šX]Q]K˜[œÛ]JZYŠÖÙ×I‰ˆJÖÙ×OL
J^ÚYŠ›ÚYO\
Y›ÜŠ˜\ˆ\˜]LÝ‹›[™ÝÝŠÊÊZYŠ–Ý—K\OOP]šX]Q]K˜[œÛ]VÙ×J^Ü‹œ\Ú
ˆ
ÈŠÙ–Ý—K˜[YJNØœ™XZß]\Ë™Ü™]Ý\[™[˜]šX]\ÖÈ˜\œ›ÝÈŠÙKš\ÚX›OHL
ÊËKœ\Ú
ÖÙ×JÈˆŠKœ\Ú
VÙ×JÈˆŠKœ\Ú
ˆ
ÈŠÓX]™›ÛÜŠ][P˜\ÙK˜Y][Û”˜[™ÙJVÙ×KÌL
JKËœ\Ú
]šX]Q]K™Ù]]”ÝžU\J]šX]Q]K˜[œÛ]VÙ×JJ_]\Ë™Ü™]Ý\[™[˜]šX]\Ë˜Ý\˜\ÙP]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ][Q]K™Ù]Ýš[™ÐžS™^\Ý
KŠJK\Ë™Ü™]Ý\[™[˜]šX]\Ë›™^˜\ÙP]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ][Q]K™Ù]Ýš[™ÐžS™^\Ý

JK\Ë™Ü™]Ý\[™[˜]šX]\Ë›˜[YP]‹^R][Q]K™Ù]Ýš[™ÐžS\Ý
ÊK\Ë™Ü™]Ý\[™[˜]šX]\Ë˜Ý\”ØÛÜ™K^H±$xnàÛ{ï&ˆŠÐÛÛ™šYÒ][KœÚ[Ø[[X™\ŠJK\Ë™Ü™]Ý\[™[˜]šX]\Ë›™^ØÛÜ™K^H±$xnàÛ{ï&ˆŠÐÛÛ™šYÒ][KœÚ[Ø[[X™\ŠÊ_\™]\›ˆ_KKœ›ÝÝ\K\]P[\]Z\][WØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÎÝ
ÊÊ]\Ë\]Q\]Z\][J
_KKœ›ÝÝ\K\]Q\]Z\][OY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÖÈ™\]Z\ŠÝNÚYŠ[OZJ^Ý˜\ˆÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
K™Ù]\]Z\žR[™^

KZKš][RXÛÛŽÛ‹š[YÒ›Ø‹š\ÚX›OHLKLHOU\Ù\˜YÔÞ\Ý[K™š]Q\]Z\š[™^ÙŠËš][K˜ÛÛ™šYÒQ
_O\Ëš][Kš[™_ÛÛ™šYÒ][K™Ù]]X[]JËš][Kš][PÛÛ™šYÊOOO\Ëš][Kš][PÛÛ™šYË›]™[	‰ˆ\Ëš][Kš][PÛÛ™šYËžœÓ]™[Ê‹œÙ]]J[
K‹š[YÒXÛÛ‹œÛÝ\˜ÙOYK™Y˜][\]Z\XÛÛ–ÝKK›]™[^Hˆ‹K›Z^‹š\ÚX›OHLK\Ë˜ÛX[‘Y™“Û›WØNM

JNŠK›Z^‹š\ÚX›OHLKËš][Kš][PÛÛ™šYËžœÓ]™[ŒÚK›]™[^HÚ^xnàÛˆŠÜËš][Kš][PÛÛ™šYËžœÓ]™[
ÈˆŽšK›]™[^\Ëš][Kš][PÛÛ™šYË›]™[È“‹ˆŠÜËš][Kš][PÛÛ™šYË›]™[ˆ“‹ŒH‹‹œÙ]]JËš][Kš][PÛÛ™šYÊK\Ëœ^QY™—ØNM

JK\Ë˜Ý\’[™^O]ÚKœÙ[XÝš\ÚX›OHLšKœÙ[XÝš\ÚX›OHL__KKœ›ÝÝ\Kœ^QY™—ØNMY[˜Ý[ÛŠ
^ÚYŠJÊJ^Ý˜\ˆO]Ý\ÖÈ™Y™\œˆŠÙW_
\ÖÈ™Y™\œˆŠÙWO[™]ÈXÐ[š[X][Û‹\ÖÈ™Y™\œˆŠÙWKž
Ï]\ÖÈ™\]Z\ŠÙWKÚYÌ‹L‹\ÖÈ™Y™\œˆŠÙWKžJÏ]\ÖÈ™\]Z\ŠÙWKšZYÚÌ‹LLË\ÖÈ™\]Z\ŠÙWK˜YÚ[
\ÖÈ™Y™\œˆŠÙWJK\ÖÈ™Y™\œˆŠÙWKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈœ]X[]WÌH‹LJJ__KKœ›ÝÝ\K˜ÛX[‘Y™“Û›WØNMY[˜Ý[ÛŠ
^ÚYŠJÊJ^Ý˜\ˆO]Ý\ÖÈ™Y™\œˆŠÙWI‰Š\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\ÖÈ™Y™\œˆŠÙWJK\ÖÈ™Y™\œˆŠÙWO[[
__KKœ›ÝÝ\K˜ÛX[‘Y™—ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÎÝ
ÊÊ]\ÖÈ™Y™\œˆŠÝI‰Š\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\ÖÈ™Y™\œˆŠÝJK\ÖÈ™Y™\œˆŠÝO[[
_KKœ›ÝÝ\KœÙ]][T™YÚ[ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÎÝ
ÊÊ^Ý˜\ˆO]\ÖÈ™\]Z\ŠÝKOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
NÚYŠKœ™YÚ[š\ÚX›OU\Ù\‘\]Z\š[œÊ
KœÙ]Ü˜[™ÙQ\]Z\][TÝ]JJKKœ™YÚ[š\ÚX›J^Ý˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K˜ÚXÚÑ\T™YÚ[
KL
NÙKœ™YÚ[š\ÚX›O[[O\ÏÜÎ™Kœ™YÚ[š\ÚX›___KKœ›ÝÝ\K˜ÛÛ\]\Ý\’[™^ØNMY[˜Ý[ÛŠ
^Ü™]\›ˆKKœ›ÝÝ\KœÙ]›ÛRYY[˜Ý[ÛŠ
^Ý\Ë—Ü›ÛRY]\Ë\]UšY]×ØNM

_KK™Y˜][\]Z\XÛÛVÈž—ÌL‹ž—ÌLH‹ž—ÌLˆ‹ž—ÌLÈ‹ž—ÌM‹ž—ÌMH‹ž—ÌMˆ‹ž—ÌMÈ—K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
ÛÙ\ÜÑ\]Z\[™[œ›ÝÝ\K‘ÛÙ\ÜÑ\]Z\[™[ŠKÚ[™ÝË‘ÛÙ\ÜÑ\]Z\[™[QÛÙ\ÜÑ\]Z\[™[Ý˜\ˆÛÙ\]Z\Ú[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Ý\”›ÛOLK˜Ý\”Ù[XÝ[™^LKœÚÚ[“˜[YOH”ÚÚ[Y˜[‘\]Z\Ú[ˆ‹Kœ[™[\œVÙK›Ü˜[™ÙQ\]Z\[™[K›YÙ[™\]Z\[™[K™^™[YQ\]Z\[™[KKš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËšY]ÔÝXÚËœÙ[XÝY[™^YK”Ú[–šX[™Ë\ËX‹š][T™[™\™\UX˜\’][T™[™\‹\ËX‹™]T›ÝšY\]\ËšY]ÔÝXÚË\Ë˜ÚXÚÕX“ÜØ]WØNM

_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÚO\™Ý[Y[Ë›[™ÝÚJÊÊ]ÚWOX\™Ý[Y[ÖÚWNÝ˜\ˆÏ]ÌOÝÌN™K”Ú[–šX[™Ë]ÌWOÝÌWN™K”Ú[–šX[™ÎÝ\Ëœ›ÛTÙ[XÝœÙ]Ý\”›ÛJŠK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÚ[™ÙQ]™[
\ËX‹\Ë›Û•X•ÝXÚ]™[ØNM
K\Ë˜YÚ[™Ú[™Ñ]™[
\ËX‹\Ë›Û•X•ÝXÚ[™Ñ]™[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\ËœÙ]™YÚ[[™›×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\ËœÙ]™YÚ[[™›×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\ËœÙ]™YÚ[[™›×ØNM
K\Ë›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÝX”›ÛPÚ[™ÙK\ËœÙ]™YÚ[[™›×ØNM
K\Ë˜YÚ[™ÙQ]™[
\Ëœ›ÛTÙ[XÝ\ËœÝÚ]Ú›ÛR[™›×ØNM
K\ËœÙ]Ù[XÝY[™^ØNM
ÊK\ËœÙ]™YÚ[[™›×ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ[™[\œ–Ý\Ë˜Ý\”Ù[XÝ[™^K˜ÛÜÙJ
_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__KKœ›ÝÝ\KœÝÚ]Ú›ÛR[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ëœ›ÛTÙ[XÝ™Ù]Ý\”›ÛJ
NÝ\Ëœ[™[\œ–Ý\Ë˜Ý\”Ù[XÝ[™^KœÙ]›ÛRY

_KKœ›ÝÝ\K˜ÚXÚÕX“ÜØ]WØNMY[˜Ý[ÛŠ
^Õ[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠLK\Ë™[^XÚXÚÕX“ÜØ]T™\Ý[ØNM\Ê_KKœ›ÝÝ\K™[^XÚXÚÕX“ÜØ]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆKKÏLV×KÏV×KOV×KV×NÙ›ÜŠÏLÜÏ\ËX‹›[Q[[Y[ÎÜÊÊÊ]]\ËX‹™Ù]š\X[[[Y[]
ÊK	‰Š˜ÚXÚÓÔ
\Ë˜ÚXÚÒ\ÓÜ[—ØNM
ËLJJKO\É‰ŠO]žO]\Ëœ™YÚ[ž
KOO]š\ÔÚÝÓØÚÏÊËœ\Ú

K‹œ\Ú
\ÖÈœ™YÚ[ŠÜ×JJNŠ‹œ\Ú

KKœ\Ú
\ÖÈœ™YÚ[ŠÜ×JJJNÙ›ÜŠ[‹˜ÛÛ˜Ø]
ÊKOXK˜ÛÛ˜Ø]
ŠKÏLÜÏ‹›[™ÝÜÊÊÊ[–Ü×K‰YJÌLLŠœËVÜ×K‰ZJÌLLÊœßKKœ›ÝÝ\K›Û•X•ÝXÚ[™Ñ]™[ØNMY[˜Ý[ÛŠ
^Ü™]\›ˆ˜Ý\œ™[\™Ù]œÙ[XÝY[™^OYK–[˜[ÏÊšY]ÓYÜ‹š[œÊ
K›Ü[Š™X\Ý\™R[Ú[‹
K›ÚYœ™]™[Y˜][

JN\Ë˜ÚXÚÒ\ÓÜ[—ØNM
˜Ý\œ™[\™Ù]œÙ[XÝY[™^
OÝ›ÚY›ÚYœ™]™[Y˜][

_KKœ›ÝÝ\K˜ÚXÚÒ\ÓÜ[—ØNMY[˜Ý[ÛŠJ^ÜÝÚ]Ú
›ÚYOOZI‰ŠOHL
K
^ØØ\ÙHK”Ú[–šX[™Î˜œ™XZÎØØ\ÙHKÚX[”ZN˜œ™XZÎØØ\ÙHK–šV[ŽšYŠSÜ[”Þ\Ý˜\ÙKš[œÊ
K˜ÚXÚÔÞ\ÓÜ[ŠÞ\Ý[U\K–’V•SŠJ\™]\›ˆI‰•\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊÜ[”Þ\Ý˜\ÙKš[œÊ
K™Ù]›ÓÜ[•\ÊÞ\Ý[U\K–’V•SŠJKL_\™]\›ˆLKKœ›ÝÝ\K›Û•X•ÝXÚ]™[ØNMY[˜Ý[ÛŠ
^Ý\Ëœ[™[\œ–Ý\Ë˜Ý\”Ù[XÝ[™^K˜ÛÜÙJ
NÝ˜\ˆO]˜Ý\œ™[\™Ù]œÙ[XÝY[™^Ý\ËœÙ]Ù[XÝY[™^ØNM
JK\ËœÙ]™YÚ[[™›×ØNM

KšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ[Z]\ÚÕšY]Ê_KKœ›ÝÝ\KœÙ]Ù[XÝY[™^ØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ý\”Ù[XÝ[™^]Ý˜\ˆO]\Ëœ›ÛTÙ[XÝ™Ù]Ý\”›ÛJ
NÝ\Ëœ[™[\œ–ÝK›Ü[ŠJK\ËšY]ÔÝXÚËœÙ[XÝY[™^]KK›Ü[ÚXÚÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÜ™]\›ˆXÝÜ‹›]™[LLÈLŠ\Ù\•\Ëš[œÊ
KœÚÝÕ\Êøn©\LxnçÈŠKLJ_KKœ›ÝÝ\KœÙ]™YÚ[[™›×ØNMY[˜Ý[ÛŠ
^Ý\Ëœ™YÚ[‹š\ÚX›O]\Ëœ™YÚ[š\ÚX›O]\Ëœ™YÚ[Kš\ÚX›OHLNÙ›ÜŠ˜\ˆHLKOTÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹ÏLÚOœÎÜÊÊÊ^Ù›ÜŠ˜\ˆLÎ›‰‰ˆJU\Ù\‘\]Z\š[œÊ
KœÙ]Ü˜[™ÙQ\]Z\][TÝ]J‹ÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊJJNÛŠÊÊNÝ\Ëœ›ÛTÙ[XÝœÚÝÔ™YÚ[
Ë
K	‰Š\Ëœ™YÚ[š\ÚX›O]
_]HLNÙ›ÜŠ˜\ˆÏLÚOœÎÜÊÊÊ^Ù›ÜŠ˜\ˆLÌ›ŽÛŠÊÊZYŠU\Ù\‘\]Z\š[œÊ
KœÙ]YÙ[™\]Z\][U\Ý]JŒÌŽŒÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊJKU\Ù\‘\]Z\š[œÊ
KœÙ]YÙ[™\]Z\][TÝ]JŒÌŽŒÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊJ_OO[‰‰
^Ý\Ëœ™YÚ[Kš\ÚX›O]Øœ™XZß]\ËšY]ÔÝXÚËœÙ[XÝY[™^OYKÚX[”ZI‰\Ëœ›ÛTÙ[XÝœÚÝÔ™YÚ[
Ë
_ZYŠO]\Ëœ™YÚ[Kš\ÚX›I‰Š\Ëœ™YÚ[Kš\ÚX›OU\Ù\‘\]Z\š[œÊ
K˜ÚXÚÔ™YÚ[^
K\Ëœ›ÛTÙ[XÝ™Ù]Ý\”›ÛJ
J_\Ë›YÙ[™\]Z\[™[œÙ]™YÚ[

JK\ËšY]ÔÝXÚËœÙ[XÝY[™^OYK–šV[Š^Ý\Ëœ›ÛTÙ[XÝ˜ÛX\”™YÚ[

NÙ›ÜŠ˜\ˆLÛÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[ŽÛŠÊÊ^Ý˜\ˆÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ŠKOUÝRšQ\]Z\[Ù[š[œÊ
K™Ù]Ú[žR›ØŠËš›ØŠNØI‰\Ëœ›ÛTÙ[XÝœÚÝÔ™YÚ[
‹J__]\Ëœ™YÚ[‹š\ÚX›OUÝRšQ\]Z\[Ù[š[œÊ
K™Ù]Ú[

_KK”Ú[–šX[™ÏLKÚX[”ZOLKK–šV[L‹K–[˜[ÏLË_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ÛÙ\]Z\Ú[‹œ›ÝÝ\K‘ÛÙ\]Z\Ú[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÛÙ\]Z\Ú[‹^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ[›ÞÕ\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK\OL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH•™X\Ý\™T[™QÚYŸKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëš[™^]ÌK›[™ÝL‰‰Š\Ë\O]ÌWK\Ë˜XÝ]š]RQ]Ì—JK\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›Û•\
K\Ë™ÚYš][T™[™\™\U™X\Ý\™T[™R][T™[™\‹ÏO]\Ë\OÝ\Ëš[š]XÝ]š]J
NŒO]\Ë\OÝ\Ëš[š]Z\›ÛÛSÜ\˜]WØNM

N\Ë”™Yœ™\Ú[™›×ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K”™Yœ™\Ú[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™T™]Ø\™Ý\Ëš[™^NÚYŠ
ZYŠ\Ë™ÚY™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠœ™]Ø\™
K\Ë›[L^T[™Kš[œÊ
Kœ[™PÛÝ[ÔÝš[™Ê
K[™Kš[œÊ
K˜›ÞÖÝ\Ëš[™^LWOOT[™K•S‘ÑU
^Ý˜\ˆO]›™YY[YKT[™Kš[œÊ
Kœ[™PÛÝ[Ý\Ë›[LK^YOŒÙJÈˆŽˆŒ‹\Ë˜[™XYKš\ÚX›OHL_Y[ÙH\Ë›[LKš\ÚX›O]\Ë›[L‹š\ÚX›O]\Ë›[LËš\ÚX›OHLK\Ë˜[™XYKš\ÚX›OHLKKœ›ÝÝ\Kš[š]Z\›ÛÛSÜ\˜]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™T™]Ø\™Ý\Ëš[™^NÚYŠ
ZYŠ\Ë™ÚY™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠœ™]Ø\™
K\Ë›[L^RZ\›ÛÛP˜\ÙKš[œÊ
Kš[[Y\ËÔÝš[™Ê
KZ\›ÛÛP˜\ÙKš[œÊ
Kš[›Þ[™›ÖÝ\Ëš[™^LWOORZ\›ÛÛP˜\ÙK•S‘ÑU
^Ý˜\ˆO]›™YY[YKRZ\›ÛÛP˜\ÙKš[œÊ
Kš[[Y\ÎÝ\Ë›[LK^YOŒÙJÈˆŽˆŒ‹\Ë˜[™XYKš\ÚX›OHL_Y[ÙH\Ë›[LKš\ÚX›O]\Ë›[L‹š\ÚX›O]\Ë›[LËš\ÚX›OHLK\Ë˜[™XYKš\ÚX›OHLKKœ›ÝÝ\Kš[š]XÝ]š]OY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÐXÝ]š]U\LNÝ\Ë˜XÝ]š]RQVÝ\Ëš[™^NÝ\Ë™ÚY™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠœ™]Ø\™ÊNÝ˜\ˆOPXÝ]š]Kš[œÊ
K™Ù]XÝ]š]Q]PžRY
\Ë˜XÝ]š]RQ
NÝ\Ë›[L^YK›[JÈˆŽÝ˜\ˆO]™ÛÝ[YK›[NÝ\Ë›[LK^ZOŒÚJÈˆŽˆŒ‹OOYK™Ù]ÛÛ™][ÛžR[™^
\Ëš[™^
OÝ\Ë˜[™XYKš\ÚX›OHL\Ë˜[™XYKš\ÚX›OHL_KKœ›ÝÝ\K›Û•\Y[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
[›ÞÕ\ÕšY]Ëœ›ÝÝ\K’[›ÞÕ\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ[›ÞÕ\ÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆ[\Ý][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš›ØVÈˆ‹“™ønìHpêH‹“8n¨XÈ[š‹•±¬8nç[™ÈØH—KKœÚÚ[“˜[YOH”ÚÚ[’[\Ý™[™\™\ˆ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë™]KOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝÌWWNÚYŠ[OYJ^Ý˜\ˆKÏPÛÛ™šYÒ][K™Ù]]X[]PÛÛÜŠJKPÛÛ™šYÒ][K™Ù]\JJNÚOLO[È›ÛÛÛÜˆH	ÈÙ™™™Œ	ÏˆŠÝÌJÈÙ›Ûˆš8n«[ˆ1$q¬8nèØÈ›ÛÛÛÜIÈŠÜÊÈ‰ÏˆŠÝ\Ë›XZÙS˜[YS\Ý[™›×ØNM
JJÈÙ›ÛˆŽˆ›ÛÛÛÜˆH	ÈÙ™™™Œ	ÏˆŠÝÌJÈÙ›Ûˆš8n«[ˆ1$q¬8nèØÈ›ÛÛÛÜIÈŠÜÊÈ‰ÏˆŠÙK›˜[YJÈÙ›Ûˆ‹\ËœÚÝÕ^^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊJ__KKœ›ÝÝ\K›XZÙS˜[YS\Ý[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOHˆŽÜ™]\›ˆO]›˜[YKJÏ]žœÓ]™[ŒÈŠŠÈÚ^xnàÛˆŠÝžœÓ]™[
ÈˆŽˆŠŠÈøn©\ŠÝ›]™[
Èˆ‹JÏ]\Ëš›Ø–ÐÛÛ™šYÒ][K™Ù]›ØŠ
WJÈŠHŸKK”UPSUWÐÓÓÔVÈˆÙL™™‹ˆÌÍYMŒ™‹ˆÙ™˜ˆ‹ˆÙ™ÍLˆ‹ˆÙŒÌÌLYH‹ˆÙ™™LÙˆ—K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
[\Ý][T™[™\‹œ›ÝÝ\K’[\Ý][T™[™\ˆŠNÝ˜\ˆ×Û][˜ÚLN×Û][˜ÚOML×Ùš\œÝL×Ùš\œÝOL×Ù\Ý[MÍË×Ù\Ý[ONLË×Ù\ÝLÌŒ×Ù\ÝOMŒŒØZ][YOML[™\Ý[Ú[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜\œV×KKš][\ÏV×KK\OL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH’[™\Ý[‹\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜^P‹\Ë˜^WØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë˜ÛÜÙUšY]ÊK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ‹\Ë˜ÛÜÙUšY]ÊK\Ë›ØœÙ\™J[š[œÊ
KœÜÝ[™\Ý[\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™JZ\›ÛÛP˜\ÙKš[œÊ
KœÜÝ[™\Ý[\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™JXÝ]š]Kš[œÊ
KœÜÝ[™\Ý[\Ë\]UšY]×ØNM
K\Ë\]UšY]×ØNM
ÝÌKÌWKÌ—KÌ×WJ_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜^P‹\Ë˜^WØNM
K\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K˜ÛÜÙUšY]ÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K\]UšY]×ØNMY[˜Ý[ÛŠ
^ÚYŠ\Ë˜Ø[ÛXØÚÏHL\Ëš[\O]ÌK\Ë˜\œ]ÌWK\Ë\O]Ì—K\Ë˜XÝ]š]RQ]Ì×KÏO]\Ë\OÝ\Ë˜Ý\œ™[Ý]OH››Ò][HŽ\Ë˜Ý\œ™[Ý]OH››Ü›X[‹\Ë˜[Y]S›ÝÊ
KO]\Ëš[\J^Ý˜\ˆOLÌO]\Ë\OÙOQÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[Û˜ÙNŒOO]\Ë\OÙOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[Û˜ÙNŒO]\Ë\OÙOQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[Û˜ÙNŒÏO]\Ë\I‰ŠOQÛØ˜[ÛÛ™šYËÛÛ™šYÐXÝ]š]U\LNÝ\Ë˜XÝ]š]RQVÌWKžXŠK\ËžXYK\Ë˜^P‹›X™[\Ü^K^H“]XHH8n©ÛˆŸY[Ù^Ý˜\ˆOLÌO]\Ë\OÙOQÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[[ŒOO]\Ë\OÙOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[[ŒO]\Ë\OÙOQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[[ŒÏO]\Ë\I‰ŠOQÛØ˜[ÛÛ™šYËÛÛ™šYÐXÝ]š]U\LNÝ\Ë˜XÝ]š]RQVÌ—KžXŠK\ËžXYK\Ë˜^P‹›X™[\Ü^K^H“]XHL8n©ÛˆŸ]\ËžÒ[š\ÚX›OHLÝ˜\ˆNÌO]\Ë\OÚOQÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[][NŒOO]\Ë\OÚOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[][NŒO]\Ë\OÚOQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[][NŒÏO]\Ë\I‰ŠOQÛØ˜[ÛÛ™šYËÛÛ™šYÐXÝ]š]U\LNÝ\Ë˜XÝ]š]RQVÌWKš][JK\ËžË^]\ËžXŠÈˆŽÝ˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\P[™Y
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹JK]\Ëš[\OÌLŒKÏ\ÏÜË˜ÛÝ[ŒÝ\ËžÓ[LK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ›ÛÛÛÜHŠÊÏ[ÐÛÛÜ•][‘Ô‘QS—ÐÓÓÔŽÛÛÜ•][”‘QÐÓÓÔŠJÈˆŠÛÊÈÙ›ÛˆŠK\ËšXÛÛ‹œÛÝ\˜ÙOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÚWKšXÛÛŠÈ—Ü™È‹\ËžÓ[L‹^LO]\Ëš[\OÈ‹Ì{ï"HŽˆ‹ÌL;ï"H‹\Ëœ^T™\Ý[ØNM

_KKœ›ÝÝ\Kœ^T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÝ\Ëœ™[X\ÙP[][WØNM

NÙ›ÜŠ˜\ˆO]\Ë˜\œ‹›[™ÝÏLÚOœÎÜÊÊÊ^Ý\Ëš][\ÖÜ×O]\Ë˜Ü™X]R][WØNM
\Ë˜\œ–Ü×JNÝ˜\ˆYYÜ™]•ÙY[‹™Ù]
\Ëš][\ÖÜ×JNÝ\Ëš][\ÖÜ×Kž\ÉMJ˜×Ù\Ý[
Ø×Ùš\œÝ\Ëš][\ÖÜ×KžOSX]™›ÛÜŠËÍJJ˜×Ù\Ý[JØ×Ùš\œÝK\Ëš][\ÖÜ×K˜[OL‹ØZ]
ÊØZ][YJKÊØ[NŒ_KŒ
K˜Ø[
[˜Ý[ÛŠ
^ÚKKKOZI‰Š›ÚYO]	‰

KK˜Ø[ÛXØÚÏHL
_J__KKœ›ÝÝ\Kœ^QÙ]ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]\ËO]\Ë˜\œ‹›[™ÝÏLÚOœÎÜÊÊÊZYŠ\Ëš][\ÖÜ×J^Ý˜\ˆYYÜ™]•ÙY[‹™Ù]
\Ëš][\ÖÜ×JNÛ‹ÊÞN˜×Ù\ÝK˜×Ù\ÝØØ[VŒØØ[VNŒKÌML
“X]™›ÛÜŠËÍJJK˜Ø[
[˜Ý[ÛŠ
^ÚKKKOZI‰Š›ÚYO]	‰

KKœ™[X\ÙP[][WØNM

J_J__KKœ›ÝÝ\K˜Ü™X]R][WØNMY[˜Ý[ÛŠ
^Ý˜\ˆO[™]È™X\Ý\™T[™R][T™[™\ŽÝ\Ë›\ÝÛÛ‹˜YÚ[
JNÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝÌWNÜ™]\›ˆOÊK›[O]ÌWKK™]O]ÌJN™K™]O^Ý\NŒÛÝ[ÌWKYÌ_KKžX×Û][˜ÚKžOX×Û][˜ÚK_KKœ›ÝÝ\Kœ™[X\ÙP[][WØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ[ˆ\Ëš][\Ê]\Ëš][\ÖÝK™\ÝXÝ

K\Ë›\ÝÛÛ‹œ™[[Ý™PÚ[
\Ëš][\ÖÝJNÝ\Ëš][\ÏV×_KKœ›ÝÝ\K˜ÛÜÙPÐ—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÚYŠ\Ë˜Ø[ÛXØÚÊ^Ý\Ë˜Ø[ÛXØÚÏHLNÝ˜\ˆOY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ_NÝ\Ëœ^QÙ]ØNM
J__KKœ›ÝÝ\K˜^WØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÚYŠÏO]\Ë\I‰•\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]Ý\œ\ÐÛÝ[

O\Ù\˜YÔÞ\Ý[KQ×ÑS“ÕQÒ
\™]\›ˆ›ÚYšY]ÓYÜ‹š[œÊ
K›Ü[Š˜YÑ[\ÕšY]ÊNÚYŠ\Ë˜Ø[ÛXØÚÊ^ÚYŠO]\Ë\I‰ŒO]\Ëš[\I‰’Z\›ÛÛP˜\ÙKš[œÊ
Kš[œ™YU[Y\ÏŒ
\™]\›ˆ›ÚYZ\›ÛÛP˜\ÙKš[œÊ
KœÙ[™[
\Ëš[\JNÝ˜\ˆOLÚOLÏO]\Ë\OÑÛØ˜[ÛÛ™šYËÛÛ™šYÐXÝ]š]U\LNÝ\Ë˜XÝ]š]RQVÌWKš][NŒO]\Ë\OÑÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[][NŒOO]\Ë\OÑÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[][N‘ÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[][NÝ˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\P[™Y
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹JNÚYŠÉ‰œË˜ÛÝ[
^Ý˜\ˆY[˜Ý[ÛŠ
^ÌOYK\OÒ[š[œÊ
KœÙ[™[
Kš[\JNŒOOYK\OÔ[™Kš[œÊ
KœÙ[™[[™JKš[\JNŒOYK\OÒZ\›ÛÛP˜\ÙKš[œÊ
KœÙ[™[
Kš[\JNŒÏOYK\I‰XÝ]š]Kš[œÊ
KœÙ[™™]Ø\™
K˜XÝ]š]RQOYKš[\OÌNŒŠ_NÝ\Ëœ^QÙ]ØNM
ŠK\Ë˜Ø[ÛXØÚÏHL_Y[Ù^Ý˜\ˆÏ]\Ëš[\OÌLŒNÒ[Ø\›^UšY]ËœÚÝÐ^UØ\›Š\Ë™Ù][™[˜[YPžU\WØNM
\Ë\JJÈ‹R[™\Ý[Ú[ˆŠÝ\Ëš[\K\Ëš[Ø\›‘[—ØNM˜š[™
\ÊKðìÈ]xnä[ˆpêH[ÈŠÝ\ËžXŠÈˆ™Ý^pê›ˆ¸n¨ÛÈ]XHŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÚWK›˜[YJÈŠˆŠÛÊ___KKœ›ÝÝ\K™Ù][™[˜[YPžU\WØNMY[˜Ý[ÛŠ
^Ü™]\›ˆÏO]\Ë\OÈ“ÔÐU\™Ù]N[™[HŽŒO]\Ë\OÈ•™X\Ý\™PÚX[œÚT[™[ŽŒOO]\Ë\OÈ•™X\Ý\™T[™T[™[Žˆ•™X\Ý\™R[[™[ŸKKœ›ÝÝ\Kš[Ø\›‘[—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ÎÚYŠXÝÜ‹žX]\ËžXŠ^Ý˜\ˆOY[˜Ý[ÛŠ
^ÌO]\OÒ[š[œÊ
KœÙ[™[
š[\JNŒOO]\OÔ[™Kš[œÊ
KœÙ[™[[™Jš[\JNŒO]\OÒZ\›ÛÛP˜\ÙKš[œÊ
KœÙ[™[
š[\JNŒÏO]\I‰XÝ]š]Kš[œÊ
KœÙ[™™]Ø\™
˜XÝ]š]RQO]š[\OÌNŒŠ_NÝ\Ëœ^QÙ]ØNM
JK\Ë˜Ø[ÛXØÚÏHL_Y[ÙH\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßŠ_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
[™\Ý[Ú[‹œ›ÝÝ\K’[™\Ý[Ú[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ[™\Ý[Ú[‹^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ[Ø\›^UšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[•Ø\›^H‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ[™[]ÌK\Ë˜Ø[˜XÚÏ]ÌWK\Ë™\Ï]Ì—K\Ë˜YÝXÚ[™]™[
\Ë\Ë›ÛÛXÚ×ØNM
K\Ë\]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ[™[[[\Ë˜Ø[˜XÚÏ[[\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›ÛÛXÚ×ØNM
_KKœÚÝÐ^UØ\›Y[˜Ý[ÛŠKÊ^ÌOOYK›ÙÚ[”™XÛÜ™ÖÝOÚI‰šJ
N•šY]ÓYÜ‹š[œÊ
K›Ü[ŠKKÊ_KKœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^Ý\Ë\ÐÚXÚØ›ÞœÙ[XÝYHLK\Ë™\Õ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ\Ë™\Ê_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë››ÐŽ˜Ø\ÙH\Ë‘Î•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\ËžY\ÐŽ™K›ÙÚ[”™XÛÜ™ÖÝ\Ëœ[™[O]\Ë\ÐÚXÚØ›ÞœÙ[XÝY\Ë˜Ø[˜XÚÉ‰\Ë˜Ø[˜XÚÊ
KšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__KK›ÙÚ[”™XÛÜ™Ï^ßK_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
[Ø\›^UšY]Ëœ›ÝÝ\K’[Ø\›^UšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ[Ø\›^UšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆYÙ[™\]Z\[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK—Ü›ÛRYL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ý\Ëš[š]

_KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\Ë˜Ý\’[™^L\Ë™Ù]™X\Ý\™P‹^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š	ÏH™YH™]™[ˆO‰ÊÝ\Ë™Ù]™X\Ý\™P‹^
ÈÝOØOˆŠK\Ë™Ù]™X\Ý\™P‹ÝXÚ[˜X›YHL\Ë›YÙ[™XÏ[™]ÈXÐ[š[X][Û‹\Ë›YÙ[™XÌO[™]ÈXÐ[š[X][Û‹\Ë›YÙ[™XÌ[™]ÈXÐ[š[X][Û‹\Ë˜Ú\™ÙQY™ŒO[™]ÈXÐ[š[X][Û‹\Ë˜Ú\™ÙQY™ŒKžML\Ë˜Ú\™ÙQY™ŒKžOM‹\Ë˜Ú\™ÙQY™ŒKÝXÚ[˜X›YHLK\Ë˜Ú\™ÙQY™ŒKœØØ[VOLK\Ë˜Ú\™ÙQY™ŒKœØØ[VLKŒK\Ë—ÝÙX\Û‘Y™™XÝ[™]ÈXÐ[š[X][Û‹\Ë—Ø›ÙQY™™XÝ[™]ÈXÐ[š[X][Û‚ŸKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›YÙ[™XËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜\Y˜XÝY™ˆ‹LJK\Ë˜YÚ[
\Ë›YÙ[™XÊK\Ë™Y™œÌK˜YÚ[
\Ë›YÙ[™XÌJK\Ë›YÙ[™XÌKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜ÚX[œZ^˜™Y™ˆ‹LJK\Ë›YÙ[™XÌKœØØ[V]\Ë›YÙ[™XÌKœØØ[VOLK\Ë™Y™œÌ‹˜YÚ[
\Ë›YÙ[™XÌŠK\Ë›YÙ[™XÌ‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜ÚX[œZ^˜™Y™ˆ‹LJK\Ë›YÙ[™XÌ‹œØØ[V]\Ë›YÙ[™XÌ‹œØØ[VOLK\Ë™Ù]™X\Ý\™P‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Ü[”ÛY[šY]×ØNM\ÊK\Ë˜YÝXÚ]™[
\Ë›Z^ÝÛÜ™‹\Ë›Û”Ù[XÝØNM
K\Ë˜YÝXÚ]™[
\Ë›Z^\›[Ü‹\Ë›Û”Ù[XÝØNM
K\Ë˜YÝXÚ]™[
\Ë˜\›[Ü’XÛÛ‹\Ë›Û”Ù[XÝØNM
K\Ë˜YÝXÚ]™[
\ËœÝÛÜ™XÛÛ‹\Ë›Û”Ù[XÝØNM
K\Ë˜YÝXÚ]™[
\Ë™^XÝ]P‹\Ë™^XÝ]PÐ—ØNM
K\Ë›ØœÙ\™J\Ù\‘\]Z\š[œÊ
KœÜÝZ^ÛÙ\]Z\\Ý\Ë›Z^Ð—ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÝX”›ÛPÚ[™ÙK\Ë\]TÝX”›ÛPÚ[™ÙWØNM
K[Y\“YÜ‹š[œÊ
K™Õ[Y\Š™LË\Ë›XÐÚ[™ÙWØNM\ÊK\Ë\]UšY]×ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë™Ù]™X\Ý\™P‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Ü[”ÛY[šY]×ØNM\ÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë›Z^ÝÛÜ™‹\Ë›Û”Ù[XÝØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë›Z^\›[Ü‹\Ë›Û”Ù[XÝØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜\›[Ü’XÛÛ‹\Ë›Û”Ù[XÝØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\ËœÝÛÜ™XÛÛ‹\Ë›Û”Ù[XÝØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë™^XÝ]P‹\Ë™^XÝ]PÐ—ØNM
K[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë›XÐÚ[™ÙWØNM\ÊK\Ëœ™[[Ý™SØœÙ\™J
K\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›YÙ[™XÊK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›YÙ[™XÌJK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›YÙ[™XÌŠK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë—ÝÙX\Û‘Y™™XÝ
K\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë—Ø›ÙQY™™XÝ
_KKœ›ÝÝ\K›XÐÚ[™ÙWØNMY[˜Ý[ÛŠ
^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ë˜™ÓXÊNÝ˜\ˆYYÜ™]•ÙY[‹™Ù]
\Ë˜™ÓXÊNÝÊØ[NŒKYLÊKÊØ[NŒ_KYLÊ_KKœ›ÝÝ\K™^XÝ]PÐ—ØNMY[˜Ý[ÛŠ
^Ü™]\›ˆ\œÙR[
\Ë˜Ý\‹^
O\œÙR[
\Ë›™YY^œÝXœÝŠJJOÝ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈÚ0ëH0è[š™ønãXÈ1$xnáÜŠN›ÚY
\Ë™^XÝ]P‹›X™[OX×ÙÜ™]Ý\Ý\Ë™Ü™]Ý\ØNM

N\Ë™^XÝ]P‹›X™[OX×ÛZ^	‰\Ë›Z^ØNM

J_KKœ›ÝÝ\K™Ü™]Ý\ØNMY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝ\Ë˜Ý\‘\]Z\ÛÛ™šYÒY
ÌWNÜ™]\›ˆ›]™[XÝÜ‹›]™[žœÓ]™[•\Ù\–œÔÞ\Ý[Kš[œÊ
K›Ý›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•”Ø]HÚH°è›™Èøn©\±¬8nèÝ]pèHøn©\š0è›ˆ¸n«]Ú0í™È8nàÈ°è›™Èøn©\ŠN›ÚY\Ù\‘\]Z\š[œÊ
KœÙ[™Ü™]Ý\\]Z\
\Ë—Ü›ÛRY\Ë˜Ý\’[™^
_KKœ›ÝÝ\K™Ü™]Ý\Ð—ØNMY[˜Ý[ÛŠKJ^Ü™]\›ˆOYOÝ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•“°è›™Èøn©\8n©]¸n¨Z_ŠNŠ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê“°è›™Èøn©\0èšðí™ÈŠK›ÚY\Ë\]UšY]×ØNM

J_KKœ›ÝÝ\K›Z^ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\‘\]Z\š[œÊ
K™Ù]\]Z\ÛÛ™šYÒQžTÜÐ[™]X[]PžSYÙ[™
\Ë—Ü›ÛRY\Ë˜Ý\’[™^JKOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝNÙK›]™[PXÝÜ‹›]™[	‰™KžœÓ]™[U\Ù\–œÔÞ\Ý[Kš[œÊ
K›Õ\Ù\‘\]Z\š[œÊ
KœÙ[™Z^\]Z\
\Ë—Ü›ÛRY\Ë˜Ý\‘\]Z\ÛÛ™šYÒY\Ë˜Ý\’[™^
N•\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈøn©\Ú0í™È8nàÈ8nèÜ0èšŠ_KKœ›ÝÝ\K›Z^Ð—ØNMY[˜Ý[ÛŠKJ^Ü™]\›ˆOYOÝ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’8nèÜ0èš8n©]¸n¨Z_ŠNŠ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’8nèÜ0èš0èšðí™Ë1$pèÈ8nìH1$xnæ[™È˜[™È¸nâÈ0ê›ˆš0è›ˆ¸n«]ŠK›ÚY\Ë\]UšY]×ØNM

J_KKœ›ÝÝ\K›Ü[”ÛY[šY]×ØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K›Ü[Šœ™XZÑÝÛ˜\ÙUšY]Ëœ™XZÑÝÛ˜\ÙUšY]Ë\WÛYÙ[™J_KKœ›ÝÝ\K›Û”Ù[XÝØNMY[˜Ý[ÛŠ
^ÐXÝÜ‹›]™[ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë›Z^ÝÛÜ™Ž˜Ø\ÙH\ËœÝÛÜ™XÛÛŽ\Ë˜Ý\’[™^LØœ™XZÎØØ\ÙH\Ë›Z^\›[ÜŽ˜Ø\ÙH\Ë˜\›[Ü’XÛÛŽ\Ë˜Ý\’[™^LŸ]\Ë\]UšY]×ØNM

_KKœ›ÝÝ\KœÙ]›ÛRYY[˜Ý[ÛŠ
^Ý\Ë—Ü›ÛRY]Ý˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
KOYK™Ù]\]Z\žR[™^

KÏYK™Ù]\]Z\žR[™^
ŠNÚI‰\Ë˜ÚXÚÔ]X[]WØNM
JOÝ\Ë˜Ý\’[™^LœÉ‰\Ë˜ÚXÚÔ]X[]WØNM
ÊI‰Š\Ë˜Ý\’[™^LŠK\Ë\]UšY]×ØNM

_KKœ›ÝÝ\K\]UšY]×ØNMY[˜Ý[ÛŠ
^Ý\Ë\]P]”[™[ØNM

K\Ë\]RXÛÛ[™\Ø×ØNM

NÝ˜\ˆ]\ËœÙ]™YÚ[

NÝ	‰\ËœÙ]Y™—ØNM

_KKœ›ÝÝ\KœÙ]Y™—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]YÙ[™Ý]\]Z\Ê
NÝ›[™ÝÊ\Ë˜Ú\™ÙQY™ŒKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜Ú\™ÙY™ˆ‹LJK\Ë˜Ú\™ÙQY™ŒKœ\™[\Ë™Ù]™X\Ý\™P‹œ\™[˜YÚ[
\Ë˜Ú\™ÙQY™ŒJJN‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë˜Ú\™ÙQY™ŒJ_KKœ›ÝÝ\K\]TÝX”›ÛPÚ[™ÙWØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ËœÙ]™YÚ[

NÝ	‰\ËœÙ]Y™—ØNM

_KKœ›ÝÝ\K˜ÚXÚÔ]X[]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆOHLNÜ™]\›ˆ	‰š][I‰š][Kš][PÛÛ™šYÉ‰ŠOMOOPÛÛ™šYÒ][K™Ù]]X[]Jš][Kš][PÛÛ™šYÊJK_KKœ›ÝÝ\K\]P]”[™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
K™Ù]\]Z\žR[™^
\Ë˜Ý\’[™^
KOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝš][K˜ÛÛ™šYÒQ
ÌWKOLÏLPÛÛ™šYÒ][K™Ù]]X[]Jš][Kš][PÛÛ™šYÊNÚYŠ›ÚYOYI‰ŒO]š][Kš[™I‰OO[Š]\Ë›Z^]šX]\Ëš\ÚX›OHL\Ë™Ü™]Ý\]šX]\Ëš\ÚX›OHLK\Ë˜Ý\‘\]Z\ÛÛ™šYÒY]\Ë\]SZ^[™[ØNM

K\ËÜ]™[š\ÚX›OHL\Ë˜ÛÜÝÜ›Ý\š\ÚX›OHLK\Ë™^XÝ]P‹š\ÚX›OHLK\Ë›™YY^Hˆ‹\Ë˜Ý\‹^HˆŽÙ[Ù^ÚYŠ›ÚYOYI‰ŒO]š][Kš[™I‰OO[Š^Ý\Ë›Z^]šX]\Ëš\ÚX›OHLK\Ë™Ü™]Ý\]šX]\Ëš\ÚX›OHL\Ë˜Ý\‘\]Z\ÛÛ™šYÒY]\Ë\]QÜ™]Ý\[™[ØNM

K\Ë™^XÝ]P‹›X™[X×ÙÜ™]Ý\Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÓYÙ[™]™[\Ý\Ë˜Ý\‘\]Z\ÛÛ™šYÒYNÚO[Ë˜ÛÝ[Ï[Ëš][RYY[Ù^ÚYŠ\Ë›Z^]šX]\Ëš\ÚX›OHL\Ë™Ü™]Ý\]šX]\Ëš\ÚX›OHLK\Ë˜Ý\‘\]Z\ÛÛ™šYÒY]\Ë\]SZ^[™[ØNM

K[O]\Ë˜Ý\‘\]Z\ÛÛ™šYÒY
\™]\›ŽÝ\Ë™^XÝ]P‹›X™[X×ÛZ^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÓYÙ[™ÛÛ\ÜÙVÝ\Ë˜Ý\‘\]Z\ÛÛ™šYÒYNÚOXK˜ÛÝ[ÏXKš][RY]\Ë™^XÝ]P‹š\ÚX›OHL\ËÜ]™[š\ÚX›OHLK\Ë˜ÛÜÝÜ›Ý\š\ÚX›OHLÝ˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐÛÝ[žRY
ÊNÝ\Ë›™YY^H‹ÈŠÚK\Ë˜Ý\‹^\ŠÈˆ‹ZOÝ\Ë˜Ý\‹^ÛÛÜPÛÛÜ•][‘Ô‘QS—ÐÓÓÔ—ÓŽ\Ë˜Ý\‹^ÛÛÜPÛÛÜ•][”‘QÐÓÓÔ—ÓŸ_KKœ›ÝÝ\K\]SZ^[™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆPXÝÜ‹›]™[ÚYŠL
\™]\›ˆ›ÚYXYË›ÙÊ™\œ›ÜŽˆxnçÈÚ0ìØH8nçÈøn©\LŠNÝ˜\ˆOU\Ù\‘\]Z\š[œÊ
K™Ù]\]Z\ÛÛ™šYÒQžTÜÐ[™]X[]PžSYÙ[™
\Ë—Ü›ÛRY\Ë˜Ý\’[™^JKOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÙWNÚYŠJ^Ý˜\ˆÏV×KV×KÏV×NÙ›ÜŠ˜\ˆH[ˆ]šX]Q]K˜[œÛ]JHZVØW_VØWOL
‹œ\Ú
VØWJÈˆŠKËœ\Ú
]šX]Q]K™Ù]]”ÝžU\J]šX]Q]K˜[œÛ]VØWJJKËœ\Ú
ˆ
ÈŠÓX]™›ÛÜŠ][P˜\ÙK˜Y][Û”˜[™ÙKÌL
šVØWJJJNÜ™]\›ˆ\Ë›Z^]šX]\Ë˜˜\ÙP]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ][Q]K™Ù]Ýš[™ÐžS™^\Ý
‹ÊJK\Ë›Z^]šX]\Ë›˜[YP]‹^R][Q]K™Ù]Ýš[™ÐžS\Ý
ÊK\Ë›Z^]šX]\Ëœ˜[™]‹^Hˆ‹\Ë›Z^]šX]\ËœØÛÜ™K^PÛÛ™šYÒ][KœÚ[Ø[[X™\ŠÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙWJK__KKœ›ÝÝ\K\]QÜ™]Ý\[™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
K™Ù]\]Z\žR[™^
\Ë˜Ý\’[™^
KO]š][K˜ÛÛ™šYÒQOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙWKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙJÌWNÚYŠ›ÚYO\ÊNÙ[Ù^Ù›ÜŠ˜\ˆLNÍ[ŽÛŠÊÊ]\Ë™Ü™]Ý\]šX]\ÖÈ˜\œ›ÝÈŠÛ—Kš\ÚX›OHLNÝ˜\ˆÏV×KOV×KV×KV×KV×KÏQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÙWKOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÙJÌWK]š][KLNÙ›ÜŠ˜\ˆÈ[ˆ]šX]Q]K˜[œÛ]JZYŠÖÙ×I‰ˆJÖÙ×OL
J^ÚYŠ›ÚYO\
Y›ÜŠ˜\ˆ\˜]LÝ‹›[™ÝÝŠÊÊZYŠ–Ý—K\OOP]šX]Q]K˜[œÛ]VÙ×J^Ü‹œ\Ú
ˆ
ÈŠÙ–Ý—K˜[YJNØœ™XZß]\Ë™Ü™]Ý\]šX]\ÖÈ˜\œ›ÝÈŠÙKš\ÚX›OHL
ÊËKœ\Ú
ÖÙ×JÈˆŠKœ\Ú
VÙ×JÈˆŠKœ\Ú
ˆ
ÈŠÓX]™›ÛÜŠ][P˜\ÙK˜Y][Û”˜[™ÙKÌL
VÙ×JJKËœ\Ú
]šX]Q]K™Ù]]”ÝžU\J]šX]Q]K˜[œÛ]VÙ×JJ_]\Ë™Ü™]Ý\]šX]\Ë˜Ý\˜\ÙP]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ][Q]K™Ù]Ýš[™ÐžS™^\Ý
KŠJK\Ë™Ü™]Ý\]šX]\Ë›™^˜\ÙP]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ][Q]K™Ù]Ýš[™ÐžS™^\Ý

JK\Ë™Ü™]Ý\]šX]\Ë›˜[YP]‹^R][Q]K™Ù]Ýš[™ÐžS\Ý
ÊK\Ë™Ü™]Ý\]šX]\Ë˜Ý\”ØÛÜ™K^H±$xnàÛ{ï&ˆŠÐÛÛ™šYÒ][KœÚ[Ø[[X™\ŠJK\Ë™Ü™]Ý\]šX]\Ë›™^ØÛÜ™K^H±$xnàÛ{ï&ˆŠÐÛÛ™šYÒ][KœÚ[Ø[[X™\ŠÊ_\™]\›ˆ_KKœ›ÝÝ\K\]RXÛÛ[™\Ø×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
KO]™Ù]\]Z\žR[™^

KÏ]™Ù]\]Z\žR[™^
ŠNÌO]\Ë˜Ý\’[™^Ê\ËœÝÛÜ™Ù[XÝš\ÚX›OHL\Ë˜\›[Ü”Ù[XÝš\ÚX›OHLK\Ëžš[œÚKœÛÝ\˜ÙO[[\Ë˜Ý\œ™[Ý]OHššX[ˆŠNŠ\ËœÝÛÜ™Ù[XÝš\ÚX›OHLK\Ë˜\›[Ü”Ù[XÝš\ÚX›OHL\Ëžš[œÚKœÛÝ\˜ÙOYK˜\›[Ü’[YÖÌK\Ë˜Ý\œ™[Ý]OHššXHŠK\ËœÙ]ÙX\Û‘Y™™XÝØNM
Kš][K˜ÛÛ™šYÒQÔÜÈ‹š›Ø‹\ËÙX\Û‘Y™™XÝ\Ë—ÝÙX\Û‘Y™™XÝ
K\ËœÙ]ÙX\Û‘Y™™XÝØNM
Ëš][K˜ÛÛ™šYÒQ˜”ÜÈ‹š›Ø‹\Ë˜›ÙQY™™XÝ\Ë—Ø›ÙQY™™XÝŠK\Ë\]R][WØNM
K\ËœÝÛÜ™XÛÛ‹\ËœÝÛÜ™]™[\Ë›Z^ÝÛÜ™ŠK\Ë\]R][WØNM
Ë\Ë˜\›[Ü’XÛÛ‹\Ë˜\›[Ü“]™[\Ë›Z^\›[Ü‹Š_KKœ›ÝÝ\K\]R][WØNMY[˜Ý[ÛŠKKËŠ^Ý˜\ˆÏ[ÛŽ\Ë˜Ý\’[™^OQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÕ\Ù\‘\]Z\š[œÊ
K™Ù]\]Z\ÛÛ™šYÒQžTÜÐ[™]X[]PžSYÙ[™
\Ë—Ü›ÛRYËJWKžœÓ]™[ÚYŠO]š][Kš[™I‰OOPÛÛ™šYÒ][K™Ù]]X[]Jš][Kš][PÛÛ™šYÊJ^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝš][K˜ÛÛ™šYÒQNÜËš\ÚX›OHLKK^HÚ^xnàÛˆŠÜ‹žœÓ]™[
ÈˆŽÙ›ÜŠ˜\ˆ]›ÚY]\Ë˜Ý\‘\]Z\ÛÛ™šYÒYÛ	LLONNI‰ŠQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝ\Ë˜Ý\‘\]Z\ÛÛ™šYÒY
ÌWK›ÚYOZ
NÛ
ÊÊNÛÏOPÛÛ™šYÒ][K™Ù]ÝX•\Jš][Kš][PÛÛ™šYÊI‰›ÚYOZÚKž\Ëž
ÌMKZKÚYÌŽšKž\Ëž
ÌM_Y[ÙHËš\ÚX›OHLKK^HÚ^xnàÛˆŠØJÈˆ‹Kž\Ëž
ÌM_KKœ›ÝÝ\KœÙ]™YÚ[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆHLKOHLKOLÌšNÚJÊÊZYŠOU\Ù\‘\]Z\š[œÊ
KœÙ]YÙ[™\]Z\][U\Ý]JOŒÌŽŒÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
JKOU\Ù\‘\]Z\š[œÊ
KœÙ]YÙ[™\]Z\][TÝ]JOŒÌŽŒÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—Ü›ÛRY
J_K\ÖÈœ™YÚ[ŠÚWI‰Š\ÖÈœ™YÚ[ŠÚWKš\ÚX›OYJK
YJK]
^Ý˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]YÙ[™Ý]\]Z\Ê
NÝ\Ë›[™ÝŒ\™]\›ˆKKœ›ÝÝ\KœÙ]ÙX\Û‘Y™™XÝØNMY[˜Ý[ÛŠKKË‹Ê^Ý›ÚYOO[É‰ŠÏL
NÝ˜\ˆOHˆŽØOLO[ÏÈœ™^Y]Ý\ZHŠÚJÈŒŽˆœ™^Y\Ú[ššXHŠÚJÈŒ‹‹œ\™[Ë˜YÚ[
ŠK‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠØKLJ_KKœÝÜ›Ù[YÏVÈ˜ÚX[œZWÌÜ™È‹ŒLMLH—KK˜\›[Ü’[YÏVÈ˜ÚX[œZWÌWÜ™È‹ŒLŒMLH—K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
YÙ[™\]Z\[™[œ›ÝÝ\K“YÙ[™\]Z\[™[ŠKÚ[™ÝË“YÙ[™\]Z\[™[SYÙ[™\]Z\[™[Ý˜\ˆ[™Q^Ú[™ÙTÚÜšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Ý\”Ù[XÝ[™^LKœÚÚ[“˜[YOH”[™Q^Ú[™ÙTÚÜ‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\Ëœ[™[\œVÝ\Ëœ[™TÚÜK\ËšY]ÔÝXÚËœÙ[XÝY[™^L\ËX‹™]T›ÝšY\]\ËšY]ÔÝXÚßKKœ›ÝÝ\K™\ÝÜžUšY]×ØNMY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K™\ÝÜžUšY]×ØNM˜Ø[
\Ê_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\ËX‹\Ë›Û•X•ÝXÚ]™[ØNM
K\Ëœ[™TÚÜ˜Ý\”›ÛOL\ËœÙ]Ù[XÝY[™^Ü\˜]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\ËX‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[ÒS‘ÑK\Ë›Û•X•ÝXÚ]™[ØNM\ÊK\Ëœ™[[Ý™SØœÙ\™J
K\Ëœ[™[\œ–Ý\Ë˜Ý\”Ù[XÝ[™^K˜ÛÜÙJ
_KKœ›ÝÝ\K›Û•X•ÝXÚ]™[ØNMY[˜Ý[ÛŠ
^Ý\ËœÙ]Ü[’[™^ØNM
\ËX‹œÙ[XÝY[™^
_KKœ›ÝÝ\KœÙ]Ü[’[™^ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú

^ØØ\ÙH\Ëœ[™TÚÜ›Ü[Š
__KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\KœÙ]Ù[XÝY[™^Ü\˜]WØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ý\”Ù[XÝ[™^]\Ëœ[™[\œ–ÝK›Ü[Š
K\ËšY]ÔÝXÚËœÙ[XÝY[™^]K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
[™Q^Ú[™ÙTÚÜšY]Ëœ›ÝÝ\K”[™Q^Ú[™ÙTÚÜšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ[™Q^Ú[™ÙTÚÜšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ™X\Ý\™PÚX[œÚQÚYšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK›\ÝÙ[XÝYKLKK›X^[OLKœÚÚ[“˜[YOH•™X\Ý\™PÚX[œÚQÚY‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë\O]ÌK\ËšY]ÌWK\Ë›[O]Ì—K\Ë˜YÝXÚ]™[
\Ë\Ë›Û•ÝXÚ]™[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝÚY™\Ý[\Ë›Ý\ÛÜÙWØNM
K\Ë˜YÝXÚ[™]™[
\Ë›Z[Œ\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ[™]™[
\Ë›X^Œ\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ[™]™[
\ËœÝXŒPŒ\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ[™]™[
\Ë˜YPŒ\Ë›ÛÛXÚ×ØNM
K\Ë˜YÚ[™ÙQ]™[
\Ë›[SX™[\Ë›Û•Ú[™ÙQ]™[ØNM
K\Ë›[SX™[œ™\ÝšXÝHŒNH‹\Ë›[SX™[^HŒ‹\Ë˜YÝXÚ[˜X›YHLK\Ë˜YÝXÚÚ[™[HLK\Ë\]WØNM

_KKœ›ÝÝ\K\]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÓÜ[Û˜[ÚYÝ\ËšYNÝ\Ë™ÚYš][T™[™\™\U™X\Ý\™PÚX[œÚR][T™[™\‹œÚÝÖÌKœ™]Ø\™›[™ÝMÝ\Ë˜Ý\œ™[Ý]OHœÜXÚX[Ž\Ë˜Ý\œ™[Ý]OH››Ü›X[‹\Ë˜[Y]S›ÝÊ
K\Ë™ÚY™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠœÚÝÖÌKœ™]Ø\™
K\Ë™ÚY˜[Y]S›ÝÊ
K\Ë˜ÚÛÜÙK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJœÚÝÖÌKœÝŠK\Ë›X^[O]\Ë›[K\Ë\ÙS[OLKKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›Û•ÝXÚ]™[ØNM
K\Ë›\ÝÙ[XÝYKL_KKœ›ÝÝ\K›Û•ÝXÚ]™[ØNMY[˜Ý[ÛŠ
^ÚYŠ\™Ù]O]\Ë™Ù]
^ÚYŠ\Ë™ÚYœÙ[XÝY[™^
\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê•ZH0ì›™ÈÚ8nã[ˆH8n©Ûˆ1¬8nçÛ™ÈŠNÚYŠ]\Ë\ÙS[J\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê•ZH0ì›™ÈÚ8nã[ˆønäH1¬8nèÛ™ÈxnçÈŠNÕ\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÙ[™ÚÛÜØX›QÚY
\ËšY\Ë\ÙS[K\Ë™ÚYœÙ[XÝY[™^
_Y[ÙH\™Ù]œ\™[O]\Ë™ÚYÊ\Ë›\ÝÙ[XÝYL	‰\Ë™ÚY™Ù]Ú[]
\Ë›\ÝÙ[XÝY
K˜ÚXÚÔÙ[ÝY
\Ë™ÚYœÙ[XÝY[™^
K\Ë›\ÝÙ[XÝY]\Ë™ÚYœÙ[XÝY[™^\Ë™ÚY™]T›ÝšY\‰‰\Ë›\ÝÙ[XÝY‹LI‰\Ë›\ÝÙ[XÝY\Ë™ÚY™]T›ÝšY\‹›[™Ý	‰\Ë™ÚY™Ù]Ú[]
\Ë›\ÝÙ[XÝY
K˜ÚXÚÔÙ[ÝY
\Ë™ÚYœÙ[XÝY[™^
K\Ë˜YÝXÚÚ[™[HL\Ë\ÙS[O]\Ë›[K\Ë›[SX™[^]\Ë\ÙS[JÈˆŠN\™Ù]O]\Ë˜™ÐÛÜÙI‰\Ë›Ý\ÛÜÙWØNM

_KKœ›ÝÝ\K›Ý\ÛÜÙWØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë›Z[Œ\Ë\ÙS[OLNØœ™XZÎØØ\ÙH\Ë›X^Œ\Ë\ÙS[O]\Ë›X^[NØœ™XZÎØØ\ÙH\ËœÝXŒPŒ\Ë\ÙS[KKK\Ë\ÙS[OL	‰Š\Ë\ÙS[OLJNØœ™XZÎØØ\ÙH\Ë˜YPŒ\Ë\ÙS[JÊË\Ë\ÙS[O\Ë›X^[I‰Š\Ë\ÙS[O]\Ë›X^[J_]\Ë›[SX™[^]\Ë\ÙS[JÈˆŸKKœ›ÝÝ\K›Û•Ú[™ÙQ]™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOS[X™\Š\Ë›[SX™[^
NÙO\Ë›X^[OÙO]\Ë›X^[NŒYI‰ŠOLJK\Ë\ÙS[OYK\Ë›[SX™[^]\Ë\ÙS[JÈˆŸK_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
™X\Ý\™PÚX[œÚQÚYšY]Ëœ›ÝÝ\K•™X\Ý\™PÚX[œÚQÚYšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ™X\Ý\™PÚX[œÚQÚYšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆ™X\Ý\™PÚX[œÚR][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH•™X\Ý\™PÚX[œÚR][H‹KÝXÚÚ[™[HLKKÝXÚ[˜X›YHL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý\Ë™ÚY™]O]\Ë™]K\ËœÙ[XÝš\ÚX›O]\ËœÙ[XÝ‹š\ÚX›OHL_KKœ›ÝÝ\K˜ÚXÚÔÙ[ÝYY[˜Ý[ÛŠ
^Ý\ËœÙ[XÝš\ÚX›O]\ËœÙ[XÝ‹š\ÚX›O]\Ëš][R[™^O]K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
™X\Ý\™PÚX[œÚR][T™[™\‹œ›ÝÝ\K•™X\Ý\™PÚX[œÚR][T™[™\ˆŠNÝ˜\ˆ™X\Ý\™PÚX[œÚT[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Y›Þ]™[HLKKš[\OLK›˜[YOH•^xnà[ˆ8n¯È‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ý\Ëš[š]

_KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™K˜›Þ\Ë›[™ÝOLÙKLOšNÚJÊÊMOšI‰Š\ÖÈ˜˜\ˆŠÚWK›X™[\Ü^Kš\ÚX›OHLJK]\ÖÈ™ÚYŠÚWK™Ù]˜[YU^

KœÚ^™OLŒ™Ù]˜[YU^

KžOMÍK™]OQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™K˜›Þ\ÖÚWK\Ë[˜Ø]QÚY˜[YWØNM

NÝ\Ë™ÚYLKš\ÔÚÝÓ˜[YJLJK\Ë™ÚYLK™]OQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™K˜›Þ\ÖÌLWK\Ë™Y™[™]ÈXÐ[š[X][Û‹\Ë™Y™‹žM\Ë™Y™‹žOLÍ\Ë™Y™‹ÝXÚ[˜X›YHLK\Ë›\Ýš][T™[™\™\R[\Ý][T™[™\‹\Ëž˜ŒK^QÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[Û˜ÙJÈˆ‹\Ëž˜ŒL^QÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[[
Èˆ‹\Ë‘\ØÜšK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ±$xnàÛH0î˜Èðè™ÈØ[Ëñ¨H8næZHš8n«[ˆÚHpê›ˆ°è›ˆ¸n¨ÛÈ8n¨\ðè™È8næÛ»ï q$8n©ÞH1$ZxnàÛH0î˜ÈÚ8n«ØÈÚ8n«Ûˆš8n«[ˆ1$q¬8nèØÈHÎŒ™™™Œ	•ÚHpê›ˆ°è›ˆ¸n¨ÛÈ8n¨\HŠ_KKœ›ÝÝ\K[˜Ø]QÚY˜[YWØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]™Ù]˜[YU^

NÛ‹ÛÜ™Ü˜\HLNÝ˜\ˆ[]š][PÛÛ™šYÉ‰š][PÛÛ™šYË›˜[YOÝš][PÛÛ™šYË›˜[YN›‹^œ™\XÙJ×ŠÉËˆŠNÛ‹^Y[Ý˜\ˆÏ[‹ÚYÚYŠÏŒ
^Ý˜\ˆÏY[ÝÚ[J‹^ÚYÉ‰œË›[™ÝŒJ\Ï\ËœÛXÙJLJK‹^\ÊÈ¸ )ˆŸ_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜^LK\Ë›Û^WØNM
K\Ë˜YÝXÚ]™[
\Ë˜^LL\Ë›Û^WØNM
K\Ë˜YÝXÚ]™[
\Ë›Ý]˜YË\Ë›Û^WØNM
K\Ë›ØœÙ\™JZ\›ÛÛP˜\ÙKš[œÊ
KœÜÝ[™XÛÜ™\Ë›\Ý™Y\Ú
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\ËœÙ]™YÝ]WØNM
K\Ë›ØœÙ\™JZ\›ÛÛP˜\ÙKš[œÊ
KœÜÝ[›Þ[™›Ë\Ë\]P›ÞØNM
K\Ë›ØœÙ\™JZ\›ÛÛP˜\ÙKš[œÊ
KœÜÝ[™\Ý[\Ë\]SX]\šX[ØNM
K\Ë›\Ý™Y\Ú

KZ\›ÛÛP˜\ÙKš[œÊ
KœÙ[™[™XÛÜ™

K\Ë\]P›ÞØNM

K\Ë˜Y›Þ]™[HL\Ë\]SX]\šX[ØNM

K\ËœÙ]™YÝ]WØNM

NÝ˜\ˆOQ]U][Ë˜Ø[ÕÙYZÑš\œÝ^J
NÝ\Ë™[™Y[YOZK™Ù][YJ
KÌYLË[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë[YPÛØÚ×ØNM\ÊK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLË\Ë[YPÛØÚ×ØNM\Ê_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜^LK\Ë›Û^WØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜^LL\Ë›Û^WØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë›Ý]˜YË\Ë›Û^WØNM
K\Ëœ™[[Ý™SØœÙ\™J
K\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™ŠK[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë[YPÛØÚ×ØNM\ÊK\Ë˜Y›Þ]™[HL_KKœ›ÝÝ\K[YPÛØÚ×ØNMY[˜Ý[ÛŠ
^ÚYŠ\Ë™[™Y[YKOLK\Ë™[™Y[YOL
^Ý˜\ˆQ]U][Ë˜Ø[ÕÙYZÑš\œÝ^J
NÝ\Ë™[™Y[YO]™Ù][YJ
KÌYLß]\Ë›Y[YU^Q]U][Ë™Ù]›Ü›X]žTÙXÛÛ™
\Ë™[™Y[YK]U][Ë•SQWÑ“Ô“PUÍK
_KKœ›ÝÝ\K›\Ý™Y\ÚY[˜Ý[ÛŠ
^Ý\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠZ\›ÛÛP˜\ÙKš[œÊ
Kš[™XÛÜ™Ê_KKœ›ÝÝ\K›Û^WØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜^LN\Ë˜^R[ØNM

NØœ™XZÎØØ\ÙH\Ë˜^LL\Ë˜^R[ØNM
JNØœ™XZÎØØ\ÙH\Ë›Ý]˜YÎ•šY]ÓYÜ‹š[œÊ
K›Ü[Š™X\Ý\™TÝÜ™T[™[\Ý\K’Z\›ÛÛJ__KKœ›ÝÝ\K˜^R[ØNMY[˜Ý[ÛŠ
^ÚYŠO]	‰’Z\›ÛÛP˜\ÙKš[œÊ
Kš[œ™YU[Y\ÏŒ
\™]\›ˆ›ÚYZ\›ÛÛP˜\ÙKš[œÊ
KœÙ[™[

NÝ\Ëš[\O]Ý˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\P[™Y
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹ÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[][JNÚYŠI‰™K˜ÛÝ[
RZ\›ÛÛP˜\ÙKš[œÊ
KœÙ[™[

NÙ[Ù^Ý˜\ˆOLO]ÑÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[Û˜ÙN‘ÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[[Ò[Ø\›^UšY]ËœÚÝÐ^UØ\›Š•™X\Ý\™PÚX[œÚT[™[R[™\Ý[Ú[ˆŠÝ\Ëš[Ø\›‘[—ØNM˜š[™
\ÊKðìÈ]xnä[ˆpêH[ÈŠÚJÈˆ™Ý^pê›ˆ¸n¨ÛÈ]XHŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÑÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[][WK›˜[YJÈŠˆŠÊÌLŒJJ__KKœ›ÝÝ\Kš[Ø\›‘[—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆLO]\Ëš[\OÑÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[Û˜ÙN‘ÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[[ÐXÝÜ‹žX]ÒZ\›ÛÛP˜\ÙKš[œÊ
KœÙ[™[
\Ëš[\JN•\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßŠ_KKœ›ÝÝ\KœÙ]™YÝ]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆP›ÛÛX[Š\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù][ÛÛÙÊŠK›[™Ý
NÝÊ\Ë›Ý]˜YËœ\™[˜YÚ[]
\Ë™Y™‹\Ë™Ù]Ú[[™^
\Ë›Ý]˜YÊJK\Ë™Y™‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜XÝXÛÛÚ\˜ÛH‹LJJN‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™ŠK\Ëœ™YÚ[‹š\ÚX›O]KKœ›ÝÝ\K\]P›ÞØNMY[˜Ý[ÛŠ
^Ý˜\ˆKORZ\›ÛÛP˜\ÙKš[œÊ
Kš[›Þ[™›Ë›[™ÝÏLÙ›ÜŠ˜\ˆˆ[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™T™]Ø\™
YOQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™T™]Ø\™Û—K\ÖÈ[YHŠÜ×K^YK›™YY[YJÈ›8n©Ûˆ‹\ÖÈ[YHŠÜ×Kš\ÚX›OHL\ÖÈ™Û™HŠÜ×Kš\ÚX›OHLK\ÖÈ˜›ÞÚ[ŠÜ×Kš\ÚX›OHLK\ÖÈ˜˜\ˆŠÜ×K˜[YOL\ÖÈ˜›ÞŠÜ×KœÛÝ\˜ÙOHŒŒLM—ÌÜ™È‹\ÖÈ˜›ÞŠÜ×K›˜[YOH˜›ÞŠÊÊÌJK\Ë˜Y›Þ]™[\Ë˜YÝXÚ]™[
\ÖÈ˜›ÞŠÜ×K\Ë›Û‘Ù]]Ø\™ØNM
KOœÉ‰ŠRZ\›ÛÛP˜\ÙKš[œÊ
Kš[›Þ[™›ÖÜ×KORZ\›ÛÛP˜\ÙKÐS‘ÑUÊ\ÖÈ˜›ÞŠÜ×KœÛÝ\˜ÙOHŒŒLM—Ü™È‹\ÖÈ˜˜\ˆŠÜ×K˜[YOLL\ÖÈ˜›ÞÚ[ŠÜ×Kš\ÚX›OHL
NORZ\›ÛÛP˜\ÙK’TÓ‘ÑU	‰Š\ÖÈ[YHŠÜ×Kš\ÚX›OHLK\ÖÈ™Û™HŠÜ×Kš\ÚX›OHL\ÖÈ˜˜\ˆŠÜ×K˜[YOLL
JKÊÊÎÝ\ËšÜU˜[YL^RZ\›ÛÛP˜\ÙKš[œÊ
Kš[ÜJÈˆ‹\Ë[Y\Ë^RZ\›ÛÛP˜\ÙKš[œÊ
Kš[[Y\ÊÈˆ‹\Ë›X\ÚÒ[XYÙWØNM

K\Ëœ™YÚ[Ëš\ÚX›ORZ\›ÛÛP˜\ÙKš[œÊ
Kš[œ™YU[Y\ÏŒ\Ë˜^LK›X™[RZ\›ÛÛP˜\ÙKš[œÊ
Kš[œ™YU[Y\ÏŒÈ•0ëHÚÈ°è]HZxná[ˆ0ëHŽˆ•0ëHÚÈ°è]HH8n©ÛˆŸKKœ›ÝÝ\K›X\ÚÒ[XYÙWØNMY[˜Ý[ÛŠ
^Ý˜\ˆRZ\›ÛÛP˜\ÙKš[œÊ
Kš[ÜKOQÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™K›X^›\ÜÕ˜[OSX]™›ÛÜŠŒJ“X]œÝÊÍ
J™JKÙNÜ™]\›ˆOLOšOÚNŒKOLOÊ\Ë›X^ÜU˜[YL›X\ÚÉ‰Š\Ë›X^ÜU˜[YL›X\ÚÏ[[
K›ÚY
\Ë›X\ÚÔÚ\I‰Š\Ë›X\ÚÔÚ\K™Ü˜\XÜË˜ÛX\Š
K\Ë›X\ÚÔÚ\O[[
JJNŠ\Ë›X^ÜU˜[YL›X\Úß
\Ë›X\ÚÔÚ\O[™]ÈYÜ™]”Ú\K\Ë›X\ÚÔÚ\K™Ü˜\XÜË˜™YÚ[‘š[
MÍÍŽMŒ
K\Ë›X\ÚÔÚ\K™Ü˜\XÜË™˜]Ô™XÝ
\Ë›X^ÜU˜[YLž\Ë›X^ÜU˜[YLžK\Ë›X^ÜU˜[YLÚY\Ë›X^ÜU˜[YLšZYÚ
K\Ë›X^ÜU˜[YLœ\™[˜YÚ[
\Ë›X\ÚÔÚ\JK\Ë›X^ÜU˜[YL›X\ÚÏ]\Ë›X\ÚÔÚ\JK›ÚY
\Ë›X\ÚÔÚ\KžO]\Ë›X^ÜU˜[YLšZYÚ
ŠKZJJJ_KKœ›ÝÝ\K›Û‘Ù]]Ø\™ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\™Ù]›˜[YKœÛXÙJË
KORZ\›ÛÛP˜\ÙKš[œÊ
Kš[›Þ[™›ÖÙKLWNÚOORZ\›ÛÛP˜\ÙKÐS‘ÑUÒZ\›ÛÛP˜\ÙKš[œÊ
KœÙ[™[]Ø\™
JN•šY]ÓYÜ‹š[œÊ
K›Ü[Š[›ÞÕ\ÕšY]ËKŠ_KKœ›ÝÝ\K\]SX]\šX[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\P[™Y
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹ÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™Kš[][JKO]Ý˜ÛÝ[ŒÝ\Ë›[LK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊŸÎˆŠÊOÐÛÛÜ•][‘Ô‘QS—ÐÓÓÔ—ÓŽÛÛÜ•][”‘QÐÓÓÔ—ÓŠJÈ‰•ˆŠÙJÈŸŠK\Ë›[LL^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊŸÎˆŠÊOLLÐÛÛÜ•][‘Ô‘QS—ÐÓÓÔ—ÓŽÛÛÜ•][”‘QÐÓÓÔ—ÓŠJÈ‰•ˆŠÙJÈŸŠ_K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
™X\Ý\™PÚX[œÚT[™[œ›ÝÝ\K•™X\Ý\™PÚX[œÚT[™[ŠKÚ[™ÝË•™X\Ý\™PÚX[œÚT[™[U™X\Ý\™PÚX[œÚT[™[Ý˜\ˆ™X\Ý\™R[[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš[\OLK›˜[YOH•˜[™È¸nâÈ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ý\Ëš[š]

_KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\Ë\]Q\ØÑ^ØNM

NÝ˜\ˆÝPXÝ]š]Kš[œÊ
K’\ÒYV[˜[Õ[Y\Š
OÑÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[ÛÛYN‘ÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[ÛÛ\ËšYO]ÌWKœ™]Ø\™ÌKšY\ËšY]Ì—Kœ™]Ø\™ÌKšY\Ë›\ÝKš][T™[™\™\R][P˜\ÙK\Ë›\Ý‹š][T™[™\™\R][P˜\ÙK\Ë›\ÝK™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠÌ×Kœ™]Ø\™
K\Ë›\Ý‹™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠÍKœ™]Ø\™
NÑÛØ˜[ÛÛ™šYËÛÛ™šYÒ][NÝ\Ë›XÌO[™]ÈXÐ[š[X][Û‹\Ë›XÌKžMË\Ë›XÌKžOMË\Ë˜ÚX[œZK˜YÚ[
\Ë›XÌJK\Ë›XÌ[™]ÈXÐ[š[X][Û‹\Ë›XÌ‹žLNK\Ë›XÌ‹žOMË\Ë˜ÚX[œZK˜YÚ[
\Ë›XÌŠK\Ë›\Ýš][T™[™\™\R[\Ý][T™[™\‹\Ë›\Ý™Y\ÚØNM
×JK\Ë™Y™[™]ÈXÐ[š[X][Û‹\Ë™Y™‹žM\Ë™Y™‹žOLÍ\Ë™Y™‹ÝXÚ[˜X›YHLK\Ë›Ü[Š
_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜^LK\Ë›Û^PÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜^LL\Ë›Û^PÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›Ý]˜YË\Ë›Û^PÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\ËšXÛÛŒK\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\ËšXÛÛŒ‹\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™J[š[œÊ
KœÜÝ™\Ý\Ý[™›Ë\Ë›\Ý™Y\ÚØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\ËœÙ]™YÝ]R[™›×ØNM
K\Ë›ØœÙ\™J[š[œÊ
KœÜÝ[™\Ý[\Ë˜Ø[[™\Ý[
K\Ë›XÌKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜ÚX[œZ^˜™Y™ˆ‹LJK\Ë›XÌ‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜ÚX[œZ^˜™Y™ˆ‹LJK\Ë›\Ý™Y\ÚØNM
×JK[š[œÊ
KœÙ[™[\Ý

K\ËœÙ]™YÝ]R[™›×ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜^LK\Ë›Û^PÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜^LL\Ë›Û^PÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\ËšXÛÛŒK\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\ËšXÛÛŒ‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë›Ý]˜YË\Ë›Û^PÛXÚ×ØNM
K\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™ŠK\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\KœÙ]™YÝ]R[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆP›ÛÛX[Š\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù][ÛÛÙÊ
K›[™Ý
NÝÊ\Ë›Ý]˜YËœ\™[˜YÚ[]
\Ë™Y™‹\Ë™Ù]Ú[[™^
\Ë›Ý]˜YÊJK\Ë™Y™‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜XÝXÛÛÚ\˜ÛH‹LJJN‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™ŠK\Ëœ™YÚ[‹š\ÚX›O]KKœ›ÝÝ\K›\Ý™Y\ÚØNMY[˜Ý[ÛŠ
^Ý\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ
_KKœ›ÝÝ\K›Û^PÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜^LN\Ë˜^R[ØNM

NØœ™XZÎØØ\ÙH\Ë˜^LL\Ë˜^R[ØNM
JNØœ™XZÎØØ\ÙH\Ë›Ý]˜YÎ•šY]ÓYÜ‹š[œÊ
K›Ü[Š™X\Ý\™TÝÜ™T[™[\Ý\K‘\]Z\
__KKœ›ÝÝ\K˜^R[ØNMY[˜Ý[ÛŠ
^Ý\Ëš[\O]Ý˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\P[™Y
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹ÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[][JNÚYŠI‰™K˜ÛÝ[
R[š[œÊ
KœÙ[™[

NÙ[Ù^Ý˜\ˆOLO]ÑÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[Û˜ÙN‘ÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[[Ò[Ø\›^UšY]ËœÚÝÐ^UØ\›Š•™X\Ý\™R[[™[R[™\Ý[Ú[ˆŠÝ\Ëš[Ø\›‘[—ØNM˜š[™
\ÊKðìÈ]xnä[ˆpêH[ÈŠÚJÈˆ™Ý^pê›ˆ¸n¨ÛÈ]XHŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÑÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[][WK›˜[YJÈŠˆŠÊÌLŒJJ__KKœ›ÝÝ\Kš[Ø\›‘[—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆLO]\Ëš[\OÑÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[Û˜ÙN‘ÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[[ÐXÝÜ‹žX]Ò[š[œÊ
KœÙ[™[
\Ëš[\JN•\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßŠ_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\ËšXÛÛŒN•šY]ÓYÜ‹š[œÊ
K›Ü[Š\]Z\]Z[YUÚ[‹K›ÚY\ËšYJNØœ™XZÎØØ\ÙH\ËšXÛÛŒŽ•šY]ÓYÜ‹š[œÊ
K›Ü[Š\]Z\]Z[YUÚ[‹K›ÚY\ËšYŠ__KKœ›ÝÝ\K˜Ø[[™\Ý[Y[˜Ý[ÛŠ
^Ý\Ë\]Q\ØÑ^ØNM

_KKœ›ÝÝ\K\]Q\ØÑ^ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\P[™Y
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹ÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[][JKO]Ý˜ÛÝ[ŒÝ\Ë›[LK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ›ÛÛÛÜHŠÊOÌÌÎÍŽŒMMŒŒ
JÈˆŠÙJÈÙ›ÛˆŠK\Ë›[LL^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ›ÛÛÛÜHŠÊOLLÌÌÎÍŽŒMMŒŒ
JÈˆŠÙJÈÙ›ÛˆŠK\Ëž˜ŒK^QÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[Û˜ÙJÈˆ‹\Ëž˜ŒL^QÛØ˜[ÛÛ™šYËÛÛ™šYÕ™X\Ý\™R[š[[
ÈˆŸK_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
™X\Ý\™R[[™[œ›ÝÝ\K•™X\Ý\™R[[™[ŠKÚ[™ÝË•™X\Ý\™R[[™[U™X\Ý\™R[[™[Ý˜\ˆ™X\Ý\™R[Ú[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Ý\”›ÛOLK˜Ý\”Ù[XÝ[™^LKœÚÚ[“˜[YOH”ÚÚ[•™X\Ý\™R[‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\Ëœ[™[\œVÝ\Ë™X\Ý\™R[[™[\Ë™X\Ý\™T[™K\Ë™X\Ý\™PÚX[œÚWK\ËšY]ÔÝXÚËœÙ[XÝY[™^L\Ë˜ÚXÚÒZ\›ÛÛSÜ[’[™›×ØNM

K\ËX‹™]T›ÝšY\]\ËšY]ÔÝXÚË\ËX‹š][T™[™\™\UX˜\’][T™[™\ŸKKœ›ÝÝ\K™\ÝÜžUšY]×ØNMY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K™\ÝÜžUšY]×ØNM˜Ø[
\Ê_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ˜\ˆO]ÌOÝÌNŒÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ëš[\Ë›ÛÛXÚ×ØNM
K\Ë˜YÚ[™ÙQ]™[
\ËX‹\Ë›Û•X•ÝXÚ]™[ØNM
K\Ë˜YÚ[™Ú[™Ñ]™[
\ËX‹\Ë˜ÚXÚÒ\ÓÜ[—ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\ËœÙ]™YÚ[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\ËœÙ]™YÚ[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\ËœÙ]™YÚ[ØNM
K\Ë›ØœÙ\™JØ[YSÙÚXÓX[˜YÙKš[œÊ
KœÜÝÝX”›ÛPÚ[™ÙK\ËœÙ]™YÚ[ØNM
K\Ë›ØœÙ\™J[™Kš[œÊ
KœÜÝ[™P›ÞÚY™\Ý[\ËœÙ]™YÚ[ØNM
K\Ë›ØœÙ\™JØ[YTÙ\™\‹š[œÊ
KœÜÝÙ\™\“Ü[‘^K\Ë˜ÚXÚÒZ\›ÛÛSÜ[’[™›×ØNM
K\Ë›ØœÙ\™J\Ù\–œÔÞ\Ý[Kš[œÊ
KœÜÝœÓ‹\Ë˜ÚXÚÒZ\›ÛÛSÜ[’[™›×ØNM
K\ËœÙ]Ù[XÝY[™^ØNM
JK\ËœÙ]™YÚ[ØNM

K\Ë˜ÚXÚÕX“ÜØ]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ[™[\œ–Ý\Ë˜Ý\”Ù[XÝ[™^K˜ÛÜÙJ
_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ëš[˜\ˆO]›ÚYÌO]\ËX‹œÙ[XÝY[™^ÙOLÎNŒOO]\ËX‹œÙ[XÝY[™^ÙOLLÎŒO]\ËX‹œÙ[XÝY[™^	‰ŠOM
KI‰•šY]ÓYÜ‹š[œÊ
K›Ü[ŠœÐ›ÜÜÔ[TÜXZÕšY]ËJ__KKœ›ÝÝ\KœÝÚ]Ú›ÛWØNMY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K˜ÚXÚÒ\ÓÜ[—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\™Ù]OQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™K›Ü[›]™[Ü™]\›ˆOOYKœÙ[XÝY[™^	‰XÝÜ‹›]™[OÊ\Ù\•\Ëš[œÊ
KœÚÝÕ\Êøn©\ŠÚJÈˆxnçÈŠK‰Ø[˜Ù[X›OHL›ÚYœ™]™[Y˜][

JN›ÚYKKœ›ÝÝ\K›Û•X•ÝXÚ]™[ØNMY[˜Ý[ÛŠ
^Ý\Ëœ[™[\œ–Ý\Ë˜Ý\”Ù[XÝ[™^K˜ÛÜÙJ
NÝ˜\ˆO]˜Ý\œ™[\™Ù]œÙ[XÝY[™^Ý\ËœÙ]Ù[XÝY[™^ØNM
JK\ËœÙ]™YÚ[ØNM

KšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ[Z]\ÚÕšY]Ê_KKœ›ÝÝ\KœÙ]Ù[XÝY[™^ØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ý\”Ù[XÝ[™^]\Ëœ[™[\œ–ÝK›Ü[Š
K\ËšY]ÔÝXÚËœÙ[XÝY[™^]KK›Ü[ÚXÚÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÚYŠÌJZYŠO]ÌJ^ÚYŠRZ\›ÛÛP˜\ÙKš[œÊ
Kš\ÒZ\›ÛÛR[Ü[Š
J\™]\›ˆ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê”Ø]H™ðèH8nêHŠÊÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™K›Ü[‘^JÌJJÈˆxnçÈÙ\™\ˆ1$xn¨]Ú^xnàÛˆÚ[šŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÒZ\›ÛÛU™X\Ý\™K›Ü[–”Û]™[
ÈˆxnæÚHðìÈ8nàÈ[HÚXHŠKL_Y[ÙHYŠOO]ÌI‰XÝÜ‹›]™[ÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™K›Ü[›]™[
\™]\›ˆ\Ù\•\Ëš[œÊ
KœÚÝÕ\Êøn©\ŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™K›Ü[›]™[
ÈˆxnçÈŠKLNÜ™]\›ˆÜ[”Þ\Ý˜\ÙKš[œÊ
K˜ÚXÚÔÞ\ÓÜ[ŠÞ\Ý[U\K•‘PTÕT‘JOÊšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJSX[•Ú[™ÝÊKL
NŠ\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊÜ[”Þ\Ý˜\ÙKš[œÊ
K™Ù]›ÓÜ[•\ÊÞ\Ý[U\K•‘PTÕT‘JJKLJ_KKœ›ÝÝ\KœÙ]™YÚ[ØNMY[˜Ý[ÛŠ
^Ý\Ëœ™YÚ[š\ÚX›OP›ÛÛX[Š\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù][ÛÛÙÊ
K›[™Ý
K\Ëœ™YÚ[Kš\ÚX›OP›ÛÛX[Š\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù][ÛÛÙÊJK›[™Ý
_[™Kš[œÊ
K™Ù]\ÑÙ]›Þ

_[™T™YÚ[YÜ‹š[œÊ
K˜ÚXÚÔ[™PØ[‘^Ú[™ÙJ
K\Ëœ™YÚ[‹š\ÚX›OP›ÛÛX[ŠZ\›ÛÛP˜\ÙKš[œÊ
Kš\ÒZ\›ÛÛR[Ü[Š
I‰Š\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù][ÛÛÙÊŠK›[™ÝZ\›ÛÛP˜\ÙKš[œÊ
K™Ù]\ÑÙ]›Þ

JJ_KKœ›ÝÝ\K˜ÚXÚÒZ\›ÛÛSÜ[’[™›×ØNMY[˜Ý[ÛŠ
^ÒZ\›ÛÛP˜\ÙKš[œÊ
Kš\ÒZ\›ÛÛR[Ü[Š
OÝ\ËšY]ÔÝXÚË›[™ÝÉ‰Š\ËšY]ÔÝXÚË˜YÚ[
\Ë™X\Ý\™PÚX[œÚJK\Ëœ™YÜ›Ý\˜YÚ[
\Ëœ™YÚ[ŠK\ËX‹™]T›ÝšY\]\ËšY]ÔÝXÚÊN\ËšY]ÔÝXÚË›[™ÝŒ‰‰Š\ËšY]ÔÝXÚËœ™[[Ý™PÚ[]
ŠK\Ëœ™YÜ›Ý\œ™[[Ý™PÚ[]
ŠK\ËX‹™]T›ÝšY\]\ËšY]ÔÝXÚÊ_KKœ›ÝÝ\K˜ÚXÚÕX“ÜØ]WØNMY[˜Ý[ÛŠ
^Õ[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠLK\Ë™[^XÚXÚÕX“Ü[”Ø]WØNM\Ê_KKœ›ÝÝ\K™[^XÚXÚÕX“Ü[”Ø]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆKKÏLV×KÏV×KOV×KV×NÙ›ÜŠÏLÜÏ\ËX‹›[Q[[Y[ÎÜÊÊÊ]]\ËX‹™Ù]š\X[[[Y[]
ÊK	‰Š˜ÚXÚÓÔ
\Ë˜ÚXÚÕX’\ÓÜ[žR[™^ØNM
ÊJKO\É‰ŠO]žO]\Ëœ™YÚ[ž
KOO]š\ÔÚÝÓØÚÏÊËœ\Ú

K‹œ\Ú
\ÖÈœ™YÚ[ŠÜ×JJNŠ‹œ\Ú

KKœ\Ú
\ÖÈœ™YÚ[ŠÜ×JJJNÙ›ÜŠ[‹˜ÛÛ˜Ø]
ÊKOXK˜ÛÛ˜Ø]
ŠKÏLÜÏ‹›[™ÝÜÊÊÊ[–Ü×K‰YJÌLLŠœËVÜ×K‰ZJÌLLÊœßKKœ›ÝÝ\K˜ÚXÚÕX’\ÓÜ[žR[™^ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOHLÜ™]\›ˆO]ÒZ\›ÛÛP˜\ÙKš[œÊ
Kš\ÒZ\›ÛÛR[Ü[Š
_
OHLJNŒOO]	‰XÝÜ‹›]™[ÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™K›Ü[›]™[	‰ŠOHLJK_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
™X\Ý\™R[Ú[‹œ›ÝÝ\K•™X\Ý\™R[Ú[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ™X\Ý\™R[Ú[‹^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ™X\Ý\™T[™R][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[’][Lˆ‹K›˜[YUžONK›˜[YUœÚ^™OLNK›˜[YU^ÛÛÜLMÍÍÌŒMK_\™]\›ˆ×Ù^[™ÊK
K_J][P˜\ÙJN××Ü™Y›XÝ
™X\Ý\™T[™R][T™[™\‹œ›ÝÝ\K•™X\Ý\™T[™R][T™[™\ˆŠNÝ˜\ˆ™X\Ý\™T[™T[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš[\OLK˜›Þ\œ˜^OVÈ˜›ÞØ›YH‹˜›ÞÜ™Y‹˜›ÞÙÜ™Y[ˆ‹˜›ÞÜ\œH‹˜›ÞÛÜ˜[™ÙH—KK›˜[YOH•pê›ˆ± Ûˆ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ý\Ëš[š]

_KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\Ë\]Q\ØÑ^[™›×ØNM

K\Ë‘\ØÜšK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ±$xnàÛH0î˜Èðè™ÈØ[Ë8nâH8náÈš8n«[ˆpê›ˆ± Ûˆøn©\Ø[Èðè™È8næÛ»ï q$8n©ÞH1$ZxnàÛH0î˜ÈÚ8n«ØÈÚ8n«Ûˆš8n«[ˆ1$q¬8nèØÈHÎŒ™™™Œ	••pê›ˆ± Ûˆ°è™ß1$pèÈxnçÈÚ0ìØHHŠNÝ˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™S]™[OR[ÕX[“]™[[Ù[š[œÊ
K˜ÜS]™[O[[Ù›ÜŠ˜\ˆÈ[ˆ
^Ý˜\ˆ]Ü×NÚYŠO[‹›]™[	‰™O[‹›]™[[™
^ÚO[ŽØœ™XZß_]\Ë›\ÝKš][T™[™\™\U™X\Ý\™T[™R][T™[™\‹\Ë›\ÝK™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠKœÚÝÚXÛÛŠK\Ë™Y™[™]ÈXÐ[š[X][Û‹\Ë™Y™‹žM\Ë™Y™‹žOLÍ\Ë™Y™‹ÝXÚ[˜X›YHLNÙ›ÜŠ˜\ˆÏLNÍO›ÎÛÊÊÊ]\ÖÈ˜˜\ˆŠÛ×K›X™[\Ü^Kš\ÚX›OHLNÝ\Ë›Ü[Š
_KKœ›ÝÝ\KœÛÜ[˜ÏY[˜Ý[ÛŠJ^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝšYKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÙKšYKQÛØ˜[ÛÛ™šYËÛÛ™šYÔ[™S˜[YVÐÛÛ™šYÒ][K™Ù]ÝX•\JJWKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÔ[™S˜[YVÐÛÛ™šYÒ][K™Ù]ÝX•\JÊWNÜ™]\›ˆ‹\OË\OËLNŒ_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜^LK\Ë›Û^PÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜^LL\Ë›Û^PÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›Ý]˜YË\Ë›Û^PÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›Ý]˜YÌ\Ë›Û^PÛXÚ×ØNM
K\Ë›ØœÙ\™J[™Kš[œÊ
KœÜÝ[[™R[™›Ë\Ë˜Ø[[™T™\Ý[ØNM
NÙ›ÜŠ˜\ˆOLÚO[™K›ÞÝ[NÚJÊÊ]\Ë˜YÝXÚ]™[
\ÖÈ˜›ÞŠÚWK\Ë›ÛÛXÚ×ØNM
NÝ\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ[ÝÜ™K\ËœÙ]™YÝ]R[™›×ØNM
K\Ë›ØœÙ\™J[™Kš[œÊ
KœÜÝ[™P›ÞÚY™\Ý[\Ë˜Ø[˜XÚÊK[š[œÊ
KœÙ[™[\Ý

K\ËœÙ]™YÝ]R[™›×ØNM

K\ËœÙ]›Þ]T™\Ý[ØNM

NÙ›ÜŠ˜\ˆOLÚO\Ë›\ÝK›[Q[[Y[ÎÚJÊÊ^Ý˜\ˆÏ]\Ë›\ÝK™Ù][[Y[]
JNÂœÉ‰ŠË™Ù]˜[YU^

KžONË™Ù]˜[YU^

KœÚ^™OLNKË™Ù]˜[YU^

K^ÛÛÜLMÍÍÌŒMJ_]˜\ˆQ]U][Ë˜Ø[ÕÙYZÑš\œÝ^J
NÝ\Ë™[™Y[YO[‹™Ù][YJ
KÌYLË[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë[YPÛØÚÓÜ\˜]WØNM\ÊK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLË\Ë[YPÛØÚÓÜ\˜]WØNM\Ê_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜^LK\Ë›Û^PÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜^LL\Ë›Û^PÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë›Ý]˜YË\Ë›Û^PÛXÚ×ØNM
K\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™ŠNÙ›ÜŠ˜\ˆOLÚO[™K›ÞÝ[NÚJÊÊ]\Ëœ™[[Ý™UÝXÚ]™[
\ÖÈ˜›ÞŠÚWK\Ë›ÛÛXÚ×ØNM
NÝ\Ëœ™[[Ý™SØœÙ\™J
K[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë[YPÛØÚÓÜ\˜]WØNM\Ê_KKœ›ÝÝ\K[YPÛØÚÓÜ\˜]WØNMY[˜Ý[ÛŠ
^ÚYŠ\Ë™[™Y[YKOLK\Ë™[™Y[YOL
^Ý˜\ˆQ]U][Ë˜Ø[ÕÙYZÑš\œÝ^J
NÝ\Ë™[™Y[YO]™Ù][YJ
KÌYLß]\Ë›Y[YK^H•8nçZHÚX[ˆðì›ˆ8n¨ZH1$xnàÈ™\Ù]0ëXÚ1j^NˆŠÑ]U][Ë™Ù]›Ü›X]žTÙXÛÛ™
\Ë™[™Y[YK]U][Ë•SQWÑ“Ô“PUÍK
_KKœ›ÝÝ\KœÙ]™YÝ]R[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆP›ÛÛX[Š\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù][ÛÛÙÊJK›[™Ý
NÝÊ\Ë›Ý]˜YËœ\™[˜YÚ[]
\Ë™Y™‹\Ë™Ù]Ú[[™^
\Ë›Ý]˜YÊJK\Ë™Y™‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜XÝXÛÛÚ\˜ÛH‹LJJN‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™ŠK\Ëœ™YÚ[‹š\ÚX›O]\Ëœ™YÚ[š\ÚX›OT[™T™YÚ[YÜ‹š[œÊ
K˜ÚXÚÔ[™PØ[‘^Ú[™ÙJ
_KKœ›ÝÝ\K›Û^PÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜^LN\Ë˜^R[Ü\˜]WØNM

NØœ™XZÎØØ\ÙH\Ë˜^LL\Ë˜^R[Ü\˜]WØNM
JNØœ™XZÎØØ\ÙH\Ë›Ý]˜YÎ•šY]ÓYÜ‹š[œÊ
K›Ü[Š™X\Ý\™TÝÜ™T[™[\Ý\K”[™JNØœ™XZÎØØ\ÙH\Ë›Ý]˜YÌ•šY]ÓYÜ‹š[œÊ
K›Ü[Š[™Q^Ú[™ÙTÚÜšY]Ê__KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOLÙO[™K›ÞÝ[NÙJÊÊZYŠ\™Ù]O]\ÖÈ˜›ÞŠÙWJ^ÚYŠ[™Kš[œÊ
K˜›ÞÖÙWOOT[™K•S‘ÑU
^ÕšY]ÓYÜ‹š[œÊ
K›Ü[Š[›ÞÕ\ÕšY]ËJÌJNØœ™XZßZYŠ[™Kš[œÊ
K˜›ÞÖÙWOOT[™K’TÓ‘ÑU
^ÕšY]ÓYÜ‹š[œÊ
K›Ü[Š[›ÞÕ\ÕšY]ËJÌJNØœ™XZß]\Ë˜›ÞYYJÌK[™Kš[œÊ
KœÙ[™[™P›ÞÚY
JÌJNØœ™XZß_KKœ›ÝÝ\K˜^R[Ü\˜]WØNMY[˜Ý[ÛŠ
^Ý\Ëš[\O]Ý˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\P[™Y
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹ÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[][JNÚYŠI‰™K˜ÛÝ[
T[™Kš[œÊ
KœÙ[™[[™J
NÙ[Ù^Ý˜\ˆOLO]ÑÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[Û˜ÙN‘ÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[[Ò[Ø\›^UšY]ËœÚÝÐ^UØ\›Š•™X\Ý\™T[™T[™[R[™\Ý[Ú[ˆŠÝ\Ëš[Ø\›‘[—ØNM˜š[™
\ÊKðìÈ]xnä[ˆpêH[ÈŠÚJÈˆ™Ý^pê›ˆ¸n¨ÛÈ]XHŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÑÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[][WK›˜[YJÈŠˆŠÊÌLŒJJ__KKœ›ÝÝ\Kš[Ø\›‘[—ØNMY[˜Ý[ÛŠ
^Ý˜\ˆLO]\Ëš[\OÑÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[Û˜ÙN‘ÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[[ÐXÝÜ‹žX]Ô[™Kš[œÊ
KœÙ[™[[™J\Ëš[\JN•\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßŠ_KKœ›ÝÝ\K˜Ø[˜XÚÏY[˜Ý[ÛŠ
^ÚYŠ\Ë˜›ÞY
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™T™]Ø\™Ý\Ë˜›ÞYNÚYŠ
Y›ÜŠ˜\ˆOLÙOœ™]Ø\™›[™ÝÙJÊÊU\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒ™Œ™‰•“š8n«[ˆxn¨Ûšpê›ˆ± ÛˆŠÝœ™]Ø\™ÙWK˜ÛÝ[
NÝ\Ë˜›ÞYL]\ËœÙ]›Þ]T™\Ý[ØNM

_KKœ›ÝÝ\KœÙ]›Þ]T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë[Y\Ë^T[™Kš[œÊ
Kœ[™PÛÝ[
È˜ÈŽÙ›ÜŠ˜\ˆLÝ[™K›ÞÝ[NÝ
ÊÊ^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™T™]Ø\™Ý
ÌWKOYK›™YY[YOÙK›™YY[YNŒÜÝÚ]Ú
\ÖÈ˜›ÞŠÝKœÛÝ\˜ÙO]\Ë˜›Þ\œ˜^VÝK[™Kš[œÊ
K˜›ÞÖÝJ^ØØ\ÙH[™K•S‘ÑU\ÖÈ[YHŠÝK^ZJÈ˜È‹\ÖÈ[YHŠÝKš\ÚX›OHL\ÖÈ™Û™HŠÝKš\ÚX›OH]\ÖÈ[YHŠÝKš\ÚX›K\ÖÈ˜›ÞŠÝK™š[\œÏQš[\•][T”VWÑÔVWÑ’ST‹\ÖÈ˜›ÞÚ[ŠÝKš\ÚX›OHLKO]	‰Š\ÖÈ˜˜\ˆŠÝK˜[YOL
NØœ™XZÎØØ\ÙH[™KÐS‘ÑU\ÖÈ[YHŠÝK^ZJÈ˜È‹\ÖÈ[YHŠÝKš\ÚX›OHLK\ÖÈ™Û™HŠÝKš\ÚX›OH]\ÖÈ[YHŠÝKš\ÚX›K\ÖÈ™Û™HŠÝK^HðìÈ8nàÈš8n«[ˆ‹\ÖÈ˜›ÞŠÝK™š[\œÏV×K\ÖÈ˜›ÞÚ[ŠÝKš\ÚX›OHLO]	‰Š\ÖÈ˜˜\ˆŠÝK˜[YOLL
NØœ™XZÎØØ\ÙH[™K’TÓ‘ÑU\ÖÈ[YHŠÝK^ZJÈ˜È‹\ÖÈ[YHŠÝKš\ÚX›OHLK\ÖÈ™Û™HŠÝKš\ÚX›OH]\ÖÈ[YHŠÝKš\ÚX›K\ÖÈ™Û™HŠÝK^H±$0èÈš8n«[ˆ‹\ÖÈ˜›ÞŠÝK™š[\œÏQš[\•][T”VWÑÔVWÑ’ST‹\ÖÈ˜›ÞÚ[ŠÝKš\ÚX›OHLKO]	‰Š\ÖÈ˜˜\ˆŠÝK˜[YOLL
___KKœ›ÝÝ\K˜Ø[[™T™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë\]Q\ØÑ^[™›×ØNM

_KKœ›ÝÝ\K\]Q\ØÑ^[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\P[™Y
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹ÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[][JKO]Ý˜ÛÝ[ŒÝ\Ë›[LK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ›ÛÛÛÜHŠÊOÌÌÎÍŽŒMMŒŒ
JÈˆŠÙJÈÙ›ÛˆŠK\Ë›[LL^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ›ÛÛÛÜHŠÊOLLÌÌÎÍŽŒMMŒŒ
JÈˆŠÙJÈÙ›ÛˆŠK\ËžÌK^QÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[Û˜ÙJÈˆ‹\ËžÌL^QÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™Kš[[
Èˆ‹\ËšÜU˜[YK^T[™Kš[œÊ
KšÜJÈˆ‹\Ë›X\ÚÒ[XYÙR[™›×ØNM

_KKœ›ÝÝ\K›X\ÚÒ[XYÙR[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆT[™Kš[œÊ
KšÜKOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ]Ù[•™X\Ý\™K›X^›\ÜÕ˜[OSX]™›ÛÜŠŒMŠ“X]œÝÊÌNJJ™JKÙNÚYŠOLOšOÚNŒKOLJ\™]\›ˆ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›X\ÚÜÜ
K›ÚY
\Ë›X\ÚÜÜ[[
NÚYŠ]\Ë›X\ÚÜÜ
^Ý\Ë›X\ÚÜÜ[™]ÈYÜ™]”Üš]NÝ˜\ˆÏ[™]ÈYÜ™]”Ú\NÜË™Ü˜\XÜË˜™YÚ[‘š[
MÍÍŽMŒ
KË™Ü˜\XÜË™˜]Ô™XÝ
\Ë›X^ÜU˜[YKž\Ë›X^ÜU˜[YKžK\Ë›X^ÜU˜[YKÚY
ÌŒ\Ë›X^ÜU˜[YKšZYÚ
KË™Ü˜\XÜË™[™š[

K\Ë›X\ÚÜÜ˜YÚ[
ÊK\Ë›X^ÜU˜[YKœ\™[˜YÚ[
\Ë›X\ÚÜÜ
K\Ë›X^ÜU˜[YK›X\ÚÏ]\Ë›X\ÚÜÜ]\Ë›X\ÚÜÜžO]\Ë›X^ÜU˜[YKšZYÚ
ŠKZJ_K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
™X\Ý\™T[™T[™[œ›ÝÝ\K•™X\Ý\™T[™T[™[ŠKÚ[™ÝË•™X\Ý\™T[™T[™[U™X\Ý\™T[™T[™[Ý˜\ˆ][P˜\ÙTÝÜ™OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ[OO]	‰˜\J\Ë\™Ý[Y[Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë™]Kš[™NÕ\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÙ[™Ù]ÛÛÙÐžTÝÜ™J
_K_J][P˜\ÙJN××Ü™Y›XÝ
][P˜\ÙTÝÜ™Kœ›ÝÝ\K’][P˜\ÙTÝÜ™HŠNÝ˜\ˆ™X\Ý\™TÝÜ™T[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ý\Ëš[š]

_KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\ËœÚÚ[“˜[YOH•™X\Ý\™TÝÜ™H‹\Ë›\Ýš][T™[™\™\U™X\Ý\™T[™R][T™[™\‹\Ë›\ÝØÜ›Û\‹šY]ÜÜ]\Ë›\ÝKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë\O]ÌK\Ë˜YÝXÚ]™[
\Ë™Ù]\Ë™Ù]ÛÛÙÑ]™[ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ[™]™[
\Ë›Ý\”™XÝ\Ë›Ý\ÛÜÙWØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ[ÝÜ™K\Ë\]Q]R[™›×ØNM
K\Ë\]Q]R[™›×ØNM

_KKœ›ÝÝ\K›Ý\ÛÜÙWØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŒ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë™Ù]\Ë™Ù]ÛÛÙÑ]™[ØNM
K\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K\]Q]R[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù][ÛÛÙÐžTÛÜ
\Ë\JNÝ\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ
_KKœ›ÝÝ\K™Ù]ÛÛÙÑ]™[ØNMY[˜Ý[ÛŠ
^Ý\Ë›\Ý™]T›ÝšY\‹›[™ÝŒ	‰•\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÙ[™Ù]ÛÛÙÐžTÝÜ™J\Ë\J_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
™X\Ý\™TÝÜ™T[™[œ›ÝÝ\K•™X\Ý\™TÝÜ™T[™[ŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ™X\Ý\™TÝÜ™T[™[^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ\Ù\•š\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKÙYZÔÝ]OLKš\ÚYÝ]OV×KKœÞ\ÒYTXÚØYÙRQ•š\Kœ™YÓ™]\ÙÊKKœÜÝ\]Uš\]R[™›ÊKKœ™YÓ™]\ÙÊ‹KœÜÝ\]Q^™\Ý[
KKœ™YÓ™]\ÙÊËKœÜÝ\]Uš\]Ø\™Ô™\Ý[
KKœ™YÓ™]\ÙÊKœÜÝ\]UÙYZÐ]Ø\™Ô™\Ý[
KKœ™YÓ™]\ÙÊKKœÜÝš\ÚY^R[™›ÊKKœ™YÓ™]\ÙÊ‹KœÜÝÝ\\•š\[™›ÊK_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\Kš[š]ÙÚ[Y[˜Ý[ÛŠ
^ÚYŠÚ[™ÝË™Ù]š\[™›Ê^Ý˜\ˆ]Ú[™ÝË™Ù]š\[™›Ê
NÝ	‰Š\ËœÝ\\•š\]O]\ËœÜÝÝ\\•š\]J\ËœÝ\\•š\]JJ__KKœ›ÝÝ\KœÜÝÝ\\•š\]OY[˜Ý[ÛŠ
^Ü™]\›ˆKKœ›ÝÝ\KœÙ[™Ù]]Ø\™ÓY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÙKÜš]R[

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™Ù]ÙYZÐ]Ø\™ÏY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊ
_KKœ›ÝÝ\KœÙ[™Ù]š\ÚY[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÙKÜš]Pž]J
K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™Ù]Ý\\•š\[™›ÏY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊŠ_KKœ›ÝÝ\KœÜÝ\]Uš\]R[™›ÏY[˜Ý[ÛŠ
^Ý\Ë›]œ™XYÚÜ

K\Ë™^]œ™XY[

K\ËœÝ]O]œ™XY[

K\ËÙYZÔÝ]O]œ™XYÚÜ

NÝ˜\ˆO]œ™XYÚÜ

NÝ\Ëš\ÚYÝ]OV×NÙ›ÜŠ˜\ˆOLÙOšNÚJÊÊ^Ý˜\ˆÏ]œ™XY[œÚYÛ™Y[

K]œ™XYž]J
KÏ^ÚYœËÝ]N›ŸNÝ\Ëš\ÚYÝ]Kœ\Ú
Ê__KKœ›ÝÝ\KœÜÝ\]Q^™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYÚÜ

NÝ\Ë™^]œ™XY[

K\ËÙYZÔÝ]O]œ™XYÚÜ

KO\Ë›‰‰Š\Ë›YJ_KKœ›ÝÝ\KœÜÝ\]Uš\]Ø\™Ô™\Ý[Y[˜Ý[ÛŠ
^Ý\ËœÝ]O]œ™XY[

_KKœ›ÝÝ\KœÜÝ\]UÙYZÐ]Ø\™Ô™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY›ÛÛX[Š
NÙI‰Š\ËÙYZÔÝ]OL
_KKœ›ÝÝ\KœÜÝš\ÚY^R[™›ÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]œ™XYÚÜ

KOLÙOšNÚJÊÊY›ÜŠ˜\ˆÏ]œ™XY[œÚYÛ™Y[

K]œ™XYž]J
KÏLÛÏ\Ëš\ÚYÝ]K›[™ÝÛÊÊÊ\ÏO]\Ëš\ÚYÝ]VÛ×KšY	‰Š\Ëš\ÚYÝ]VÛ×KœÝ]O[Š_KKœ›ÝÝ\KœÜÝÝ\\•š\[™›ÏY[˜Ý[ÛŠ
^Ý\ËœÝ\\•š\]\ËœÝ\\•š\×NÙ›ÜŠ˜\ˆOL‹OLÙOšNÚJÊÊ]\ËœÝ\\•š\ÚWOSX]™›ÛÜŠœ™XY[

KÌL
_KKœ›ÝÝ\K™Ù]Ý\\•š\Ý]T™\Ý[Y[˜Ý[ÛŠ
^ÚYŠ\ËœÝ\\•š\
Y›ÜŠ˜\ˆ[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÔÝ\\•š\
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÔÝ\\•š\ÝKOJÝLNÚYŠK›[Û™^OJ\ËœÝ\\•š\ÚW_
J\™]\›ˆL\™]\›ˆL_KKœ›ÝÝ\K™Ù]š\Ý]OY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆHLKOLÙO\Ë›ŽÙJÊÊZYŠ›ÚYO]\ËœÝ]I‰ŒOJ\ËœÝ]O™IŒJJ\™]\›ˆHLÜ™]\›ˆKKœ›ÝÝ\K™Ù]š\ÚYØ[^OY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÝNÚYŠK˜ÛÛ™
Y›ÜŠ˜\ˆOLÏYK˜ÛÛ™ÚOË›[™ÝÚJÊÊ^Ý˜\ˆ\ÖÚWNÚYŠOJI\Ëš\ÚYÝ]VÊÛ‹LWKœÝ]JJ\™]\›ˆL_\™]\›ˆLKKœ›ÝÝ\K™Ù]š\ÚY\Ð^OY[˜Ý[ÛŠ
^Ü™]\›ˆOOJI\Ëš\ÚYÝ]VÝLWKœÝ]J_KKœ›ÝÝ\K™Ù]š\ÚY™YÚ[Y[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÝNÜ™]\›ˆ\Ë›YKš\Ý\Ë™Ù]š\ÚYØ[^J
I‰ˆ]\Ë™Ù]š\ÚY\Ð^J
I‰™K›™YYXPXÝÜ‹žXŽˆL_KKœ›ÝÝ\K™Ù]š\[™^Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚY
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÙWKš•[Y\ÎÚYŠOZOÚNŒOO]
\™]\›ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÙW_\™]\›ˆ[KKœ›ÝÝ\K˜ÚXÚÕš\ÝXØÙ\ÜÒ[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆOHLÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚY
^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÚWKš•[Y\ÎÚYŠÏ\ÏÜÎŒÏO]
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÚWKšYÚYŠ]\Ë™Ù]š\ÚY\Ð^JŠJ^ÙOHLNØœ™XZß__\™]\›ˆ_KKœ›ÝÝ\K™Ù]š\YÙT™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆV×NÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚY
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÙWKš•[Y\ÎÚOZOÚNŒØ[YTÙ\™\‹—ÚYPÛÝ[ZI‰‹LOO]š[™^ÙŠJI‰œ\Ú
J_\™]\›ˆK_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
\Ù\•š\œ›ÝÝ\K•\Ù\•š\ŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý\Ù\•š\U\Ù\•š\š[œË˜š[™
\Ù\•š\
_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆš\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[ŒÕš\‹\Ëœ›ÛTÙ[XÝ˜™Ò[YËœÛÝ\˜ÙOH˜šX[ÝLˆ‹\Ë˜\Y˜XÝY™[™]ÈXÐ[š[X][Û‹\Ë˜\Y˜XÝY™‹žLŒÌË\Ë˜\Y˜XÝY™‹žOLÌÍNÝ˜\ˆOKŒMÎOKMMŠ\ËšZYÚÝ\Ëœ]X[]QY™ŒO[™]ÈXÐ[š[X][Û‹\Ëœ]X[]QY™ŒKž]\ËÚY
™K\Ëœ]X[]QY™ŒKžOZK\Ëœ]X[]QY™Œ[™]ÈXÐ[š[X][Û‹\Ëœ]X[]QY™Œ‹žKJ\ËÚY\Ëœ]X[]QY™Œ‹žOZK\Ëœ]X[]QY™ŒÏ[™]ÈXÐ[š[X][Û‹\Ëœ]X[]QY™ŒËž]\ËÚY
ŠKYJK\Ëœ]X[]QY™ŒËžOZK\Ë˜ÛÜÙPŒQY™[™]ÈXÐ[š[X][Û‹\Ë˜ÛÜÙPŒQY™‹ž]\Ë˜ÛÜÙPŒKž
Ý\Ë˜ÛÜÙPŒKÚYÌ‹L‹\Ë˜ÛÜÙPŒQY™‹žO]\Ë˜ÛÜÙPŒKžJÝ\Ë˜ÛÜÙPŒKšZYÚÌŠÌ‹\Ë˜ÛÜÙPŒQY™‹ÝXÚ[˜X›YHL_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒK\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\ËœÝ\™P‹\Ë›ÛÛXÚ×ØNM
K\Ëœ]X[]QY™ŒKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈœ]X[]WÌH‹LJK\Ë˜YÚ[
\Ëœ]X[]QY™ŒJK\Ëœ]X[]QY™Œ‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈœ]X[]WÌH‹LJK\Ë˜YÚ[
\Ëœ]X[]QY™ŒŠK\Ëœ]X[]QY™ŒËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈœ]X[]WÌH‹LJK\Ë˜YÚ[
\Ëœ]X[]QY™ŒÊK\Ë˜ÛÜÙPŒQY™‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜ÚÛ™ÞšH‹LJK\Ë˜YÚ[
\Ë˜ÛÜÙPŒQY™ŠK\Ù\•š\š[œÊ
K›ÏÝ\ËœÝ\™P‹š\ÚX›OHLNŠ\ËœÝ\™P‹š\ÚX›OHL\Ë˜ÛÜÙPŒKš\ÚX›OHLJ_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙPŒK\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\ËœÝ\™P‹\Ë›ÛÛXÚ×ØNM
_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ˜Ø\ÙH\Ë˜ÛÜÙPŒ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJNØœ™XZÎØØ\ÙH\Ë˜ÛÜÙPŒN•šY]ÓYÜ‹š[œÊ
K›Ü[ŠÚ\™ÙQš\œÝÚ[”[™[
NØœ™XZÎØØ\ÙH\ËœÝ\™PŽ•šY]ÓYÜ‹š[œÊ
K›Ü[Šš\šY]ÊKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
š\ÕšY]Ëœ›ÝÝ\K•š\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš\ÕšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆš\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜˜\˜˜Ï[™]È›ÙÜ™\ÜÐ˜\‹K—ØÝ\“LKš\˜[Y^OVÌÌËÍWKKœÚÚ[“˜[YOH”ÚÚ[•š\‹Kœ›ÛTÙ[XÝ˜™Ò[YËœÛÝ\˜ÙOH˜šX[ÝLˆ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\Ëš\ÕÜ]™[HL\Ë˜˜\˜˜ËœÙ]ÚY
Ì
K\Ë˜˜\˜˜ËžMK\Ë˜˜\˜˜ËžOMK\Ë˜˜\˜˜Ë›˜[YK^ÛÛÜLMLNM\ËÜÜ›Ý\˜YÚ[
\Ë˜˜\˜˜ÊK\Ë›\Ýš][T™[™\™\P˜YÒ][P˜\ÙK\Ë›\Ýš][T™[™\™\P˜YÒ][P˜\ÙK\Ëš\˜[YOPš]X\[X™\‹š[œÊ
K˜Ü™X]S[TXÊžŒ‹ÊK\Ëš\˜[YKž]\Ëš\˜[Y^VÌK\Ëš\˜[YKžO]\Ëš\˜[Y^VÌWK\Ëš\Ü›Ý\˜YÚ[
\Ëš\˜[YJ_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\ËÜ\‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë›Y‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\ËœšYÚ‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\ËœÝY\‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\ËœÝY\Œ\Ë›ÛÛXÚÊK\Ë›ØœÙ\™J\Ù\•š\š[œÊ
KœÜÝ\]Q^™\Ý[\Ë˜Ú[™ÙQ^˜\“]\ŠK\Ë›ØœÙ\™J\Ù\•š\š[œÊ
KœÜÝ\]Uš\]Ø\™Ô™\Ý[\Ë˜Ú[™ÙP]Ø\™Ô™\Ý[
K\Ë›ØœÙ\™J\Ù\•š\š[œÊ
KœÜÝ\]Uš\]R[™›Ë\Ë˜Ú[™ÙP]Ø\™Ô™\Ý[
K\Ë›ØœÙ\™J\Ù\•š\š[œÊ
KœÜÝ\]UÙYZÐ]Ø\™Ô™\Ý[\Ë˜Ú[™ÙP]Ø\™Ô™\Ý[
K\Ë˜˜\˜˜Ëœ™\Ù]

K\Ë˜Ú[™ÙQ^˜\“]\Š
K\Ë˜Ú[™ÙP]Ø\™Ô™\Ý[

K\Ë—ØÝ\“]ÌOÝÌN\Ë™Ù]š\]™[™\Ý[

NÝ˜\ˆOUšY]ÓYÜ‹š[œÊ
K™Ù]šY]ÊXZ[•šY]ÊNÚYŠI‰ŠKš\š\ÚX›I‰Š\Ë—ØÝ\“LÊKKœ™Uš\ZKš\š\ÚX›OHLKKš\	‰šKš\œ\™[	‰šKš\œ\™[œ™[[Ý™PÚ[
Kš\
JK\Ë—ØÝ\“Š^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\Ý\Ë—ØÝ\“—NÝ\ËœÚÝÕš\[™›ÐžPÛÛ™šYÊÊ__KKœ›ÝÝ\K™Ù]š\]™[™\Ý[Y[˜Ý[ÛŠ
^ÚYŠ\Ù\•š\š[œÊ
K›ŠY›ÜŠ˜\ˆLÝ\Ù\•š\š[œÊ
K›ŽÝ
ÊÊZYŠJ\Ù\•š\š[œÊ
KœÝ]O	ŒJJ\™]\›ˆ
ÌNÝ˜\ˆOSØš™XÝšÙ^\ÊÛØ˜[ÛÛ™šYËÛÛ™šYÕš\
K›[™ÝÜ™]\›ˆ\Ù\•š\š[œÊ
K›YKLOÙN•\Ù\•š\š[œÊ
K›ŠÌ_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËÜ\‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë›Y‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËœšYÚ‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËœÝY\‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^Ý˜\ˆNÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ˜Ø\ÙH\Ë˜ÛÜÙPŒ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJNØœ™XZÎØØ\ÙH\ËÜ\Ž•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJNÝ˜\ˆÏT™XÚ\™ÙKš[œÊ
K™Ù]™XÚ\™ÙQ]J
NÜÉ‰ŒO\Ë›[OÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠÚ\™ÙQš\œÝÚ[”[™[
N•šY]ÓYÜ‹š[œÊ
K›Ü[Š™XÚ\™ÙQš\œÝÚ[ŠNØœ™XZÎØØ\ÙH\Ë›YŽšOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ËK]\Ë—ØÝ\“—K\ËœÚÝÕš\[™›ÐžPÛÛ™šYÊJNØœ™XZÎØØ\ÙH\ËœšYÚŽšOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÊÊÝ\Ë—ØÝ\“—K\ËœÚÝÕš\[™›ÐžPÛÛ™šYÊJNØœ™XZÎØØ\ÙH\ËœÝY\ŽšOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\Ý\Ë—ØÝ\“—NÙ›ÜŠ˜\ˆLÏZK˜]Ø\™ËO[Ë›[™ÝLØOœŽÜŠÊÊLOO[ÖÜ—K\I‰›ÖÜ—KšY™MI‰›ŠÊÎÕ\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]Ý\œ\ÐÛÝ[

O[Õ\Ù\•š\š[œÊ
KœÙ[™Ù]]Ø\™ÓŠ\Ë—ØÝ\“ŠN•\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI••0îšH1$xnäÈ1$pèÈ1$xn©ÞKZH0ì›™È8nã[ˆ8n®\0îšH1$xnäßŠNØœ™XZÎØØ\ÙH\ËœÝY\Œ•\Ù\•š\š[œÊ
KœÙ[™Ù]ÙYZÐ]Ø\™Ê
__KKœ›ÝÝ\KœÚÝÕš\[™›ÐžPÛÛ™šYÏY[˜Ý[ÛŠ
^ÝÝ\ËœÙ]]Ø\™Ó]\Š
N\Ë—ØÝ\“U\Ù\•š\š[œÊ
K›‹\Ë˜Ú[™ÙP’[™›×ØNM

_KKœ›ÝÝ\K˜Ú[™ÙQ^˜\“]\Y[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\•š\š[œÊ
KOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\Ý›—KOLÏ]™^ÙI‰ŠO]›ŠNÝ˜\ˆ‹ÏQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚJÌWKOLHˆ‹TÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÚYŠÊ^ÚYŠ[O[Ëœ“™YYXŠY›ÜŠ˜\ˆLÛËœ“™YYX‹›[™ÝÛ
ÊÊ^ÚYŠO[Ëœ“™YYX–ÛKœŠ^Û[Ëœ“™YYX–ÛK›™YYX‹O[‹\ÎØœ™XZß[O[Ëœ“™YYX‹›[™ÝLI‰Š[Ë›™YYX‹O[Ë›™YYX‹\Ê_Y[ÙH[Ë›™YYX‹O[Ë›™YYX‹\ÎÜH“¸n¨\0ê›_ÎŒ™™™Œ	•ˆŠØJÈˆ™Ý^pê›ˆ¸n¨Ûß0èšŠÊŸÎŒ™™™Œ	••’TŠÊ›ŠÌJJÈŸŠK\Ë˜˜\˜˜ËœÙ]]JËŠ_Y[Ù^ÚYŠHøn©\’T1$pèÈ1$xn¨]8näZH1$XH‹[OYKœ“™YYXŠY›ÜŠ˜\ˆLÛKœ“™YYX‹›[™ÝÛ
ÊÊ^ÚYŠOYKœ“™YYX–ÛKœŠ^ÛYKœ“™YYX–ÛK›™YYXŽØœ™XZß[OYKœ“™YYX‹›[™ÝLI‰ŠYK›™YYXŠ_Y[ÙHYK›™YYXŽÝ\Ë˜˜\˜˜ËœÙ]]JËŠK\Ë˜˜\˜˜ËœÙ]•˜[YU^
ÊÈ‹ÈŠÛŠ_]\Ë]SX™[^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊŠKOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\Ý\Ë—ØÝ\“—K\ËœÚÝÕš\[™›ÐžPÛÛ™šYÊJ_KKœ›ÝÝ\K˜Ú[™ÙP]Ø\™Ô™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆÚYŠ\Ë—ØÝ\“U\Ù\•š\š[œÊ
K›‹\Ë—ØÝ\“L
^Ù›ÜŠ˜\ˆOLÙO\Ë—ØÝ\“ŽÙJÊÊZYŠ]\Ë™Ù]™[Z[™žR[™^ØNM
J_\Ë˜ÚXÚÕÙYZÔ™]Ø\™[™›×ØNM
JJ\™]\›ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÙJÌWK\Ë—ØÝ\“YJÌK\ËœÙ]]Ø\™Ó]\ŠÝQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ËK]\Ë—ØÝ\“—JK›ÚY\Ë˜Ú[™ÙP’[™›×ØNM

NÝQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÊÊÝ\Ë—ØÝ\“—K\ËœÙ]]Ø\™Ó]\ŠÝQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ËK]\Ë—ØÝ\“—JK\Ë˜Ú[™ÙP’[™›×ØNM

__KKœ›ÝÝ\KœÙ]]Ø\™Ó]\Y[˜Ý[ÛŠ
^Ý\Ë™\XÝX™[^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ™\ØÜš\[ÛŠK\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ˜]Ø\™ÊK\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠÙYZÔ™]Ø\™
K\Ëš\[YËœÛÝ\˜ÙO]š\[YÎÝ˜\ˆKKÏU\Ù\•š\š[œÊ
K™^Hˆ‹ÏTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÚYŠ[O]œ“™YYXŠY›ÜŠ˜\ˆOLØOœ“™YYX‹›[™ÝØJÊÊ^ÚYŠÏO]œ“™YYX–ØWKœŠ^ÙO]œ“™YYX–ØWK›™YYX‹OYK\ÎØœ™XZßXOO]œ“™YYX‹›[™ÝLI‰ŠO]›™YYX‹O]›™YYX‹\Ê_Y[ÙHO]›™YYX‹O]›™YYX‹\ÎÛZOŒÈ“¸n¨\0ê›HÎŒ™™™Œ	•ˆŠÚJÈˆ™Ý^pê›ˆ¸n¨Ûß0èšÎŒ™™™Œ	•ˆ’TŠÝšYˆˆ‹\Ë›[Ü™K^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŠNÝ˜\ˆH“¸n¨\ÎŒ™™™Œ	•ˆŠÙJÈˆ™Ý^pê›ˆ¸n¨Ûß0èšÎŒ™™™Œ	•ˆ’TŠÝšYÝ\ËœÚÝË^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŠKš]X\[X™\‹š[œÊ
K˜Ú[™ÙS[J\Ëš\˜[YK\Ù\•š\š[œÊ
K›‹žŒ‹ÊK\Ù\•š\š[œÊ
K›LÊ\Ëš\˜[YKž]\Ëš\˜[Y^VÌK\Ëš\˜[YKžO]\Ëš\˜[Y^VÌWJNŠ\Ëš\˜[YKž]\Ëš\˜[Y^VÌKNK\Ëš\˜[YKžO]\Ëš\˜[Y^VÌWJK\Ë]U^^H•’TŠÊˆŠÝ\Ë—ØÝ\“ŠÈˆŠJÈˆ1$8n­ØÈ]^xnà[ˆ‹\ËœÝY\‹š\ÚX›OHLK\Ë›XÉ‰‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›XÊK\Ë›XÌI‰‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›XÌJK\Ë™Ù]™[Z[™žR[™^ØNM
šYLJOÊ\ËœÝY\‹š\ÚX›OHLK\ËœÝY\‹›X™[H±$0èÈš8n«[ˆŠN•\Ù\•š\š[œÊ
K›]šY	‰Š\ËœÝY\‹š\ÚX›OHL\ËœÝY\‹›X™[H“š8n«[ˆ‹\Ë›XÏ]\Ë›Xß™]ÈXÐ[š[X][Û‹\Ë›XËžN\Ë›XËžOLŒ‹K\Ë›XËœØØ[VLKŒK\Ë›XËœØØ[VOLK\Ë›XËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜Ú\™ÙY™‹LJK\ËœÝY\‹˜YÚ[
\Ë›XÊJK\Ù\•š\š[œÊ
K›O]šYÊ\ËœÝY\Œš\ÚX›OHLOU\Ù\•š\š[œÊ
KÙYZÔÝ]OÊ\ËœÝY\Œš\ÚX›OHLK\ËœÝY\Œ›X™[H±$0èÈš8n«[ˆŠNŠ\ËœÝY\Œ›X™[H“š8n«[ˆ‹\Ë›XÌO]\Ë›XÌ_™]ÈXÐ[š[X][Û‹\Ë›XÌKžMK\Ë›XÌKžOLŒ‹\Ë›XÌKœØØ[VK‹\Ë›XÌKœØØ[VOKŽK\Ë›XÌKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜Ú\™ÙY™‹LJK\ËœÝY\Œ˜YÚ[
\Ë›XÌJJJNŠ\ËœÝY\Œš\ÚX›OHLK\ËœÝY\Œ›X™[H“š8n«[ˆŠ_KKœ›ÝÝ\K™Ù]™[Z[™žR[™^ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOU\Ù\•š\š[œÊ
KOYKœÝ]NÜ™]\›ˆK›LÈLNŒOOJO	ŒJ_KKœ›ÝÝ\K˜ÚXÚÕÙYZÔ™]Ø\™[™›×ØNMY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ù\•š\š[œÊ
K›LÈLN
ÌOOU\Ù\•š\š[œÊ
K›‰‰ŒOOU\Ù\•š\š[œÊ
KÙYZÔÝ]_KKœ›ÝÝ\K˜Ú[™ÙP’[™›×ØNMY[˜Ý[ÛŠ
^Ý\Ë—ØÝ\“ŒOÊ\Ë›Y‹š\ÚX›OHL\ËœšYÚ‹š\ÚX›OHL\Ë—ØÝ\“PÛÛ[[Û•][Ë™Ù]Øš™XÝ[™Ý
ÛØ˜[ÛÛ™šYËÛÛ™šYÕš\
I‰Š\ËœšYÚ‹š\ÚX›OHLJJN\Ë—ØÝ\“LI‰Š\Ë›Y‹š\ÚX›OHLK\ËœšYÚ‹š\ÚX›OHL
_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
š\šY]Ëœ›ÝÝ\K•š\šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš\šY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆÝ\\•š\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[™ÜÝš\‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ý\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ëœ^K\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜK\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™J\Ù\•š\š[œÊ
KœÜÝÝ\\•š\[™›Ë\Ëš[š]šY]×ØNM
K\Ù\•š\š[œÊ
KœÙ[™Ù]Ý\\•š\[™›Ê
K\Ëš[š]šY]×ØNM

_KKœ›ÝÝ\Kš[š]šY]×ØNMY[˜Ý[ÛŠ
^ÚYŠ\Ù\•š\š[œÊ
K™Ù]Ý\\•š\Ý]T™\Ý[

OÊ\Ëœ\]^U\Ù\•š\š[œÊ
KœÝ\\•š\]OÈˆŠÕ\Ù\•š\š[œÊ
KœÝ\\•š\]K™]Kœ\Nˆˆ‹\Ë››Ü^Lš\ÚX›OHLK\Ë››Ü^LKš\ÚX›OHLK\Ë˜ÛÜKš\ÚX›OHL\Ëœ^Lš\ÚX›OHL
NŠ\Ëœ\]^HÏÏÏÏÏÈ‹\Ë››Ü^Lš\ÚX›OHL\Ë››Ü^LKš\ÚX›OHL\Ë˜ÛÜKš\ÚX›OHLK\Ëœ^Lš\ÚX›OHLJK\Ù\•š\š[œÊ
KœÝ\\•š\
Y›ÜŠ˜\ˆ[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÔÝ\\•š\
^Ý˜\ˆOJÝLKOQÛØ˜[ÛÛ™šYËÛÛ™šYÔÝ\\•š\ÝNÝ\ÖÈ˜ÛÛ™ŠÙWK^HŠŠÊ\Ù\•š\š[œÊ
KœÝ\\•š\ÙW_
JÈ‹ÈŠÚK›[Û™^JÈŠHŸ_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]˜Ý\œ™[\™Ù]ÜÝÚ]Ú
J^ØØ\ÙH\Ë˜ÛÜÙPŽ˜Ø\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ëœ^N˜\ˆOT™XÚ\™ÙKš[œÊ
K™Ù]™XÚ\™ÙQ]J
NÚI‰ŒOZK›[OÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠÚ\™ÙQš\œÝÚ[”[™[
N•šY]ÓYÜ‹š[œÊ
K›Ü[Š™XÚ\™ÙQš\œÝÚ[ŠKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë˜ÛÜNÚ[™ÝËœ›Û\	‰Š]šXÙU][Ë’\Ó[Øš[OÝÚ[™ÝËœ›Û\
•ZH0ì›™Èš8n©[ˆÚxnëÈpê›ˆøn¯Ý1$xnàÈØ[ÈÚ0ê\T{ï&ˆ‹\Ù\•š\š[œÊ
KœÝ\\•š\]K™]Kœ\JÈˆŠNÚ[™ÝËœ›Û\
•ZH0ì›™ÈØ[ÈÚ0ê\T{ï&ˆ‹\Ù\•š\š[œÊ
KœÝ\\•š\]K™]Kœ\JÈˆŠJ__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ý\\•š\šY]Ëœ›ÝÝ\K”Ý\\•š\šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÝ\\•š\šY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆš\ÓUšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[ŒÕš\‹Kœ›ÛTÙ[XÝ˜™Ò[YËœÛÝ\˜ÙOH˜šX[ÝLˆ‹Kš\ÕÜ]™[HLKœÝÙ\ŒœÙ]™Õš\ÊLJKKœÝÙ\ŒKœÙ]™Õš\ÊLJKKœÝÙ\Œ‹œÙ]™Õš\ÊLJK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\ËœÝÙ\Œ˜š]\OH™‹\ËœÝÙ\ŒK˜š]\OH™‹\ËœÝÙ\Œ‹˜š]\OH™‹\Ë˜YÝXÚ]™[
\Ëœ^K\Ë›Û•ÝXÚ‘]™[ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›Û•ÝXÚ‘]™[ØNM
NÝ˜\ˆO]ÌNÝ\Ëš[š]ØNM
J_KKœ›ÝÝ\Kš[š]ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÝKOLÌÏšNÚJÊÊ^Ý\ÖÈ™ÚYŠÚWK™]OYK˜]Ø\™ÖÚJÌWKšYÝ˜\ˆÏ]\Ë™Ù]ÝÙ\’[™›×ØNM
K˜]Ø\™ÖÚJÌWKšYJNÝ\ÖÈœÝÙ\ˆŠÚWKœÙ]ÝÙ\ŠÊK\ÖÈœÝÙ\ˆŠÚWKœÙ]Ý[ÝÙ\–
L
_]\Ëœ^K›X™[U\Ù\•š\š[œÊ
K›ÏÈ“¸n¨\8n®ÈŽˆ“š8n«[ˆ‹\ËœÙ]XÛÛ‘Y™“P×ØNM

_KKœ›ÝÝ\KœÙ]XÛÛ‘Y™“P×ØNMY[˜Ý[ÛŠ
^Ý\Ë›Xß
\Ë›XÏ[™]ÈXÐ[š[X][ÛŠK\Ë›XËœ\™[\Ë›XÑÜ›Ý\˜YÚ[
\Ë›XÊK\Ë›XËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ›XXšH‹LJNÝ˜\ˆLOQÛØ˜[ÛÛ™šYËÛÛ™šYÑ^š[™ÌÌWNÝU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠK˜]]Ø\™
K
ÏYKœÝÙ\‹\ËœÝÙ\”[™[œÙ]ÝÙ\Š
_KKœ›ÝÝ\K™Ù]ÝÙ\’[™›×ØNMY[˜Ý[ÛŠJ^Ý˜\ˆOLÏQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÝNÚYŠ\Ê\™]\›ˆNÝ˜\ˆVÈš‹˜]È‹™Yˆ‹œ™\È—KÏV×KOLÝ™›ÜŠ˜\ˆˆ[ˆÊY›ÜŠ˜\ˆ[ˆŠZYŠ–ÚOO\‰‰œÖÜ—J^Ý˜\ˆ\ÖÜ—NÚYŠ›ÚYO[O[
XÛÛ[YNÝ˜\ˆÏT›ÛK™Ù]]•\PžS˜[YJŠKO[™]È]šX]Q]KHˆŽÚYŠ
ÏP]šX]Q]K™Ù]]”ÝžU\JÊJÈŽˆ‹
Ï\ÖÜ—KK\OXËK˜[YO\ÖÜ—KËœ\Ú
JKOÌOOXI‰Š\ÖÈ˜]ŠÙWK^\
N\ÖÈ˜]ŠÙWK^\JÊËOŒJXœ™XZÈ\™]\›ˆOSX]™›ÛÜŠ\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠÊJ_KKœ›ÝÝ\K›Û•ÝXÚ‘]™[ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ëœ^N\Ë›Û‘]™[ØNM

NØœ™XZÎØØ\ÙH\Ë˜ÛÜÙPŒ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__KKœ›ÝÝ\K›Û‘]™[ØNMY[˜Ý[ÛŠ
^ÚYŠ\Ù\•š\š[œÊ
K›Ê^Ý˜\ˆT™XÚ\™ÙKš[œÊ
K™Ù]™XÚ\™ÙQ]J
NÜ™]\›ˆ	‰ŒO]›[OÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠÚ\™ÙQš\œÝÚ[”[™[
N•šY]ÓYÜ‹š[œÊ
K›Ü[Š™XÚ\™ÙQš\œÝÚ[ŠK›ÚYšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_UšY]ÓYÜ‹š[œÊ
K›Ü[Šš\šY]ËÊKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
š\ÓUšY]Ëœ›ÝÝ\K•š\ÓUšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš\ÓUšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆš\ÚY”™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[•š\ÚYˆ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë™]NÝ\Ëš][KœÛÝ\˜ÙO]š[YË\Ëš\^H•ˆŠÝš\ŠÈˆ0îšH]pèŽÝ˜\ˆOU\Ù\•š\š[œÊ
K™Ù]š\ÚY™YÚ[
šY
NÙOÊ\Ë›Xß
\Ë›XÏ[™]ÈXÐ[š[X][Û‹\Ë›XËžMMK\Ë›XËžOMÌ\Ë›XËœØØ[VLKŒ‹\Ë›XËœØØ[VOLKŒÍJK\Ë›XËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈšœYY™ˆ‹LJK\Ë˜YÚ[
\Ë›XÊJNŠ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›XÊK\Ë›XÏ[[
K\Ëœ™YÚ[š\ÚX›OY_K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
š\ÚY”™[™\‹œ›ÝÝ\K•š\ÚY”™[™\ˆŠNÝ˜\ˆš\ÚY][UšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[•š\ÚY][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\ÊK\Ëœ™]Ø\™š][T™[™\™\P˜YÒ][P˜\Ù_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜Ý\’Y]Ì_K\Ë\]Q]R[™›Ê
K\Ë˜ÛÜÙJ
K\Ë˜YÝXÚ]™[
\Ë™Ù]‹\Ë›Û‘Ù]™\Ý[ØNM
K\Ë›ØœÙ\™J\Ù\•š\š[œÊ
KœÜÝš\ÚY^R[™›Ë\Ë\]Q]R[™›Ê_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›Û‘Ù]™\Ý[ØNM
K\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K›Û‘Ù]™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÝ\Ë˜Ý\’YNÜ™]\›ˆ\Ù\•š\š[œÊ
K›š\Ý›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈøn©\’TŠNXÝÜ‹žX›™YYXÝ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛÈŠN•\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]Ý\œ\ÐÛÝ[

OLÝ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI••0îšH1$xnäÈ1$pèÈ1$xn©ÞKZH0ì›™È8nã[ˆ8n®\0îšH1$xnäÈ±¬8næØßŠN›ÚY\Ù\•š\š[œÊ
KœÙ[™Ù]š\ÚY[™›Ê\Ë˜Ý\’Y
_KKœ›ÝÝ\K\]Q]R[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÝ\Ë˜Ý\’YKO]˜]Ø\™ÎÝ\Ëœ™]Ø\™™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠK˜ÛÛ˜Ø]

JK\Ë™ÙÝœÛÝ\˜ÙO]˜Y[YË\ËœÛÝ\˜ÙO]›˜[YR[YË\ËKœÛÝ\˜ÙO]˜™Ò[YË\Ë™Ù]‹š\ÚX›OU\Ù\•š\š[œÊ
K™Ù]š\ÚYØ[^J\Ë˜Ý\’Y
I‰ˆU\Ù\•š\š[œÊ
K™Ù]š\ÚY\Ð^J\Ë˜Ý\’Y
K\Ë™Ù]‹›X™[]›™YYXŠÈ“™Ý^pê›ˆ¸n¨ÛÈ‹\Ëœ™YÚ[š\ÚX›OU\Ù\•š\š[œÊ
K™Ù]š\ÚY™YÚ[
\Ë˜Ý\’Y
K\Ë˜[™XYKš\ÚX›OU\Ù\•š\š[œÊ
K™Ù]š\ÚY\Ð^J\Ë˜Ý\’Y
_K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
š\ÚY][UšY]Ëœ›ÝÝ\K•š\ÚY][UšY]ÈŠKÚ[™ÝË•š\ÚY][UšY]ÏUš\ÚY][UšY]ÎÝ˜\ˆš\ÚY[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš[\˜[LKš][UÚYÚLLL‹_\™]\›ˆ×Ù^[™ÊK
KK˜Ü™X]OY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÚO\™Ý[Y[Ë›[™ÝÚJÊÊ]ÚWOX\™Ý[Y[ÖÚWNÝ\Ë”ÓÓ
\Ë”ÓÓV×JNÝ˜\ˆÏ]\Ë”ÓÓ›[™ÝÝ\Ë”ÓÓœÜ

N›™]ÈNÜ™]\›ˆË˜Ý\’[™^]ÌOÝÌNŒËœÚÚ[“˜[YOH”ÚÚ[Œš\ÚY‹Ëœ›ÛTÙ[XÝ˜™Ò[YËœÛÝ\˜ÙOH˜šX[ÝLˆ‹ßKKœ›ÝÝ\Kœ™XÛÝ™\Y[˜Ý[ÛŠ
^ÙK”ÓÓ	‰™K”ÓÓœ\Ú
\Ê_KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\Ê_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜Ý\’[™^]ÌOÝÌNŒ\Ë›Y[S\Ýš][T™[™\™\Uš\ÚY”™[™\‹\Ë˜YÝXÚ]™[
\Ë›Y‹\Ë›Û•ÝXÚ‘]™[ØNM
K\Ë˜YÝXÚ]™[
\ËœšYÚ‹\Ë›Û•ÝXÚ‘]™[ØNM
K\Ë˜Y]™[
]ZK’][U\]™[’USWÕT\Ë›Y[S\Ý\Ë›Û•ÝXÚY[S\ÝØNM
K\Ë˜Y]™[
]ZK•RQ]™[ÒS‘ÑWÑS‘\Ë›Y[TØÜ›Û\‹\Ë›ÛÚ[™ÙQ]™[[™ØNM
K\Ë›ØœÙ\™J\Ù\•š\š[œÊ
KœÜÝš\ÚY^R[™›Ë\Ë›Û•\]WØNM
K\Ëœ›ÛTÙ[XÝšYT›ÛJ
K\Ë\]SY[SÜ\˜]WØNM

K\ËœÙ]Y˜][™\Ý[ØNM

_KKœ›ÝÝ\K›Û•ÝXÚY[S\ÝØNMY[˜Ý[ÛŠ
^ÔÛÝ[™][š[œÊ
Kœ^QY™™XÝPÊÛÝ[™][•ÒS‘ÕÊK\ËœÙ]ÚYYÜ[—ØNM
š][KšY
_KKœ›ÝÝ\K›ÛÚ[™ÙQ]™[[™ØNMY[˜Ý[ÛŠ
^Ý\Ë›Y[S\ÝœØÜ›ÛŒÊ\Ë›Y‹š\ÚX›OHLK\ËœšYÚ‹š\ÚX›OHL
N\Ë›Y[S\ÝœØÜ›ÛŠ\Ë›Y[S\Ý™]T›ÝšY\‹›[™ÝM
J\Ëš][UÚYÚ
ÌÊ\Ë›Y‹š\ÚX›OHL\ËœšYÚ‹š\ÚX›OHLJNŠ\Ë›Y‹š\ÚX›OHL\ËœšYÚ‹š\ÚX›OHL
K\Ë›Y[S\Ý™]T›ÝšY\‹›[™ÝM	‰Š\Ë›Y‹š\ÚX›OHLK\ËœšYÚ‹š\ÚX›OHLJ_KKœ›ÝÝ\K\]SY[SÜ\˜]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYOV×NÙ›ÜŠ˜\ˆH[ˆ
^Ý˜\ˆÏ]ÚWKš•[Y\ÏÝÚWKš•[Y\ÎŒÝ\Ë˜Ý\’[™^O\É‰™Kœ\Ú
ÚWJ_YKœÛÜ
[˜Ý[ÛŠJ^Ü™]\›ˆšYKšYËLNŒ_JK\Ë›Y[S\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠJK\Ë›Y[S\Ý˜[Y]S›ÝÊ
_KKœ›ÝÝ\KœÙ]Y˜][™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\ËOLOSØš™XÝšÙ^\ÊÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚY
K›[™ÝÙ›ÜŠ˜\ˆÈ[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚY
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÜ×Kš•[Y\ÎÛ[ÛŽŒO]\Ë˜Ý\’[™^	‰Š_
OQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÜ×KšY
KOJÜÊ_Y›ÜŠ˜\ˆÏU\Ù\•š\š[œÊ
Kš\ÚYÝ]KOZKYOÙNŒNÚO\ŽÜŠÊÊZYŠOJI›ÖÜ‹LWKœÝ]JJ^ØO\ŽØœ™XZß]\ËœÙ]ÚYYÜ[—ØNM
JKOYOÙNŒNÝ˜\ˆXKYNÝ\Ë›Y[S\ÝœÙ[XÝY[™^Z[Y\“YÜ‹š[œÊ
K™Ó™^
[˜Ý[ÛŠ
^Ý˜\ˆOZ
Šš][UÚYÚ
Ýš[\˜[
NÙO›Y[S\Ý˜ÛÛ[ÚY]›Y[TØÜ›Û\‹ÚY	‰ŠO]›Y[S\Ý˜ÛÛ[ÚY]›Y[TØÜ›Û\‹ÚY
K›Y[S\ÝœØÜ›ÛYK›ÛÚ[™ÙQ]™[[™ØNM

_K\Ê_KKœ›ÝÝ\K›Û•ÝXÚ‘]™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOM
\Ëš][UÚYÚOLÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë›YŽšO]\Ë›Y[S\ÝœØÜ›ÛYKOSX]œ›Ý[™
KÝ\Ëš][UÚYÚ
JŠ\Ëš][UÚYÚ
Ý\Ëš[\˜[
KšI‰ŠOL
K\Ë›Y[S\ÝœØÜ›ÛZNØœ™XZÎØØ\ÙH\ËœšYÚŽšO]\Ë›Y[S\ÝœØÜ›Û
ÙKOSX]œ›Ý[™
KÝ\Ëš][UÚYÚ
JŠ\Ëš][UÚYÚ
Ý\Ëš[\˜[
KO\Ë›Y[S\Ý˜ÛÛ[ÚY]\Ë›Y[TØÜ›Û\‹ÚY	‰ŠO]\Ë›Y[S\Ý˜ÛÛ[ÚY]\Ë›Y[TØÜ›Û\‹ÚY
K\Ë›Y[S\ÝœØÜ›ÛZ_]\Ë›ÛÚ[™ÙQ]™[[™ØNM

_KKœ›ÝÝ\K›Û•\]WØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\Ë›Y[S\Ý™]T›ÝšY\‹OLÙO›[™ÝÙJÊÊ]š][U\]Y
™Ù]][P]
JJNÝ\ËœÙ]Y˜][™\Ý[ØNM

_KKœ›ÝÝ\KœÙ]ÚYYÜ[—ØNMY[˜Ý[ÛŠ
^Ý\Ëš\ÚY][K›Ü[Š
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëš\ÚY][K˜ÛÜÙJ
K\Ë›Y[S\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[Û‹\Ëœ™[[Ý™SØœÙ\™J
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë›Y‹\Ë›Û•ÝXÚ‘]™[ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\ËœšYÚ‹\Ë›Û•ÝXÚ‘]™[ØNM
_K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
š\ÚY[™[œ›ÝÝ\K•š\ÚY[™[ŠNÝ˜\ˆš\ÚYšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK•š\[™[\ÝV×KKœÚÚ[“˜[YOH”ÚÚ[•š\ÚYXZ[ˆ‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\Ê_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÚ[™ÙQ]™[
\ËX‹\Ë›Û•X•ÝXÚ]™[ØNM
K\Ë˜YÚ[™Ú[™Ñ]™[
\ËX‹\Ë›Û•X•ÝXÚ[™Ñ[™ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™J\Ù\•š\š[œÊ
KœÜÝš\ÚY^R[™›Ë\Ë\]T™YÚ[ØNM
K\Ë˜Ý\’[™^]ÌOÝÌNŒ\Ë˜ÚXÚÒ[™^™\Ý[ØNM

K\Ë˜Ü™X]UšY]Ê
K\Ë\]UšY]Ò[™›×ØNM

_KKœ›ÝÝ\K˜ÚXÚÒ[™^™\Ý[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\•š\š[œÊ
K™Ù]š\YÙT™\Ý[

NÚYŠ\Ù\•š\š[œÊ
K˜ÚXÚÕš\ÝXØÙ\ÜÒ[™›ÊÝ\Ë˜Ý\’[™^JJY›ÜŠ˜\ˆOLÙO›[™ÝÙJÊÊZYŠ\Ë˜Ý\’[™^OYJ^Ý˜\ˆO]ÙWNÚYŠU\Ù\•š\š[œÊ
K˜ÚXÚÕš\ÝXØÙ\ÜÒ[™›ÊJJ^Ý\Ë˜Ý\’[™^YNØœ™XZß__KKœ›ÝÝ\K\]UšY]Ò[™›×ØNMY[˜Ý[ÛŠ
^Ý\Ë•š\[™[\ÝÝ\Ë˜Ý\’[™^K›Ü[Š\Ë˜Ý\’[™^
K\ËX‹œÙ[XÝY[™^]\ËšY]ÔÝXÚËœÙ[XÝY[™^]\Ë˜Ý\’[™^\Ë\]T™YÚ[ØNM

NÙ›ÜŠ˜\ˆU\Ù\•š\š[œÊ
K™Ù]š\YÙT™\Ý[

KOLÙO›[™ÝÙJÊÊ^Ý˜\ˆO]ÙWKÏU\Ù\•š\š[œÊ
K˜ÚXÚÕš\ÝXØÙ\ÜÒ[™›ÊJNÜÉ‰Š\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë•š\[™[\ÝÙWJK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\ÖÈœ™YÚ[ŠÙWJJ__KKœ›ÝÝ\K\]T™YÚ[ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆU\Ù\•š\š[œÊ
K™Ù]š\YÙT™\Ý[

KOLÙO›[™ÝÙJÊÊ^Ý˜\ˆO]ÙWNÝ\ÖÈœ™YÚ[ŠÙWKš\ÚX›OHLNÙ›ÜŠ˜\ˆÈ[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚY
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÜ×Kš•[Y\ÏÑÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÜ×Kš•[Y\ÎŒÚYŠOO[‰‰Š\ÖÈœ™YÚ[ŠÙWKš\ÚX›OU\Ù\•š\š[œÊ
K™Ù]š\ÚY™YÚ[
ÛØ˜[ÛÛ™šYËÛÛ™šYÕš\ÚYÜ×KšY
K\ÖÈœ™YÚ[ŠÙWKš\ÚX›JJXœ™XZß__KKœ›ÝÝ\K›Û•X•ÝXÚ[™Ñ[™ØNMY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë˜ÚXÚÒ\ÓÜ[—ØNM
˜Ý\œ™[\™Ù]œÙ[XÝY[™^
OÝ›ÚY›ÚYœ™]™[Y˜][

_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K›Û•X•ÝXÚ]™[ØNMY[˜Ý[ÛŠ
^Ý\ËœÙ]Ü[’[™^ØNM
˜Ý\œ™[\™Ù]œÙ[XÝY[™^
_KKœ›ÝÝ\KœÙ]Ü[’[™^ØNMY[˜Ý[ÛŠ
^Ý\Ë•š\[™[\ÝÝK›Ü[Š\Ëš˜ÛÝ[ÝJ_KKœ›ÝÝ\K˜ÚXÚÒ\ÓÜ[—ØNMY[˜Ý[ÛŠ
^Ü™]\›ˆ‘Ø[YTÙ\™\‹—ÚYPÛÝ[Ê\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê”Ù\™\ˆÚ1¬H1$xn¨]ŠÝ
Èˆ8n©Ûˆ8nèÜÙ\™\ˆŠKLJNˆLKKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÝ\Ë•š\[™[\Ý›[™ÝÝ
ÊÊ]\Ë•š\[™[\ÝÝK˜ÛÜÙJ
_KKœ›ÝÝ\K˜Ü™X]UšY]ÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\ËšY]ÔÝXÚË›[™ÝLNÝLÝKJ^Ý˜\ˆO]\ËšY]ÔÝXÚËœ™[[Ý™PÚ[]

NÙKœ™XÛÝ™\Š
_]\Ëœ™YÚ[Ü›Ý\œ™[[Ý™PÚ[™[Š
K\Ëš˜ÛÝ[U\Ù\•š\š[œÊ
K™Ù]š\YÙT™\Ý[

NÂ™›ÜŠ˜\ˆOLÚO\Ëš˜ÛÝ[›[™ÝÚJÊÊ^Ý˜\ˆÏUš\ÚY[™[˜Ü™X]J\Ëš˜ÛÝ[ÚWJNÚYŠÊ^ÜËÜLË›YLË˜›ÝÛOLËœšYÚLÝ˜\ˆU\Ù\•š\š[œÊ
K™Ù]š\[™^
\Ëš˜ÛÝ[ÚWJNÛ‰‰ŠË›˜[YO[‹œYÙS˜[YOÛ‹œYÙS˜[YNˆˆŠK\Ë•š\[™[\ÝÚWO\Ë\ËšY]ÔÝXÚË˜YÚ[
\Ë•š\[™[\ÝÚWJK\Ëœ™YÚ[Ü›Ý\˜YÚ[
\ÖÈœ™YÚ[ŠÚWJK\ÖÈœ™YÚ[ŠÚWKš\ÚX›OHL___KKœ›ÝÝ\K™Ù]š\[™[žR[™^ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOLÙO\Ë•š\[™[\Ý›[™ÝÙJÊÊZYŠ\Ë•š\[™[\ÝÙWK˜Ý\’[™^O]
\™]\›ˆ\Ë•š\[™[\ÝÙWNÜ™]\›ˆ[K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
š\ÚYšY]Ëœ›ÝÝ\K•š\ÚYšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš\ÚYšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆØ[˜˜Q]™\žQ^P^QÚY[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜ÛÛ™šYÑ]OV×KKœÚÚ[“˜[YOH•Ø[˜˜Q]™\žQ^P^QÚY‹K›\Ýš][T™[™\™\UØ[˜˜Tš]š[YÙQÚY][T™[™\‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›ØœÙ\™JXÝ]š]TÞ\Ð˜\ÙKš[œÊ
KœÜÝØ[˜˜Tš]š[YÙP^QÚY]WØNM\Ë\]Q]JK\Ëš[š]]J
KXÝ]š]TÞ\Ð˜\ÙKš[œÊ
KœÙ[™Ø[˜˜Tš]š[YÙP^QÚYÝ]WØNM
ÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜ÛÛ™šYÑ]OV×_KKœ›ÝÝ\K\]Q]OY[˜Ý[ÛŠ
^Ý˜\ˆLNÙ›ÜŠ˜\ˆH[ˆ\Ë˜ÛÛ™šYÑ]JTXÝ]š]TÞ\Ð˜\ÙKš[œÊ
Kœš]š[YÙP^QÚYÝ]I‰”XÝ]š]TÞ\Ð˜\ÙKš[œÊ
Kœš]š[YÙP^QÚYÝ]VÝOÝ\Ë˜ÛÛ™šYÑ]VÙWK››ÝÐÛÝ[TXÝ]š]TÞ\Ð˜\ÙKš[œÊ
Kœš]š[YÙP^QÚYÝ]VÝNŠ\Ë˜ÛÛ™šYÑ]VÙWK››ÝÐÛÝ[LÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[\Ë˜ÛÛ™šYÑ]VÙWKš\	‰Š\Ë˜ÛÛ™šYÑ]VÙWK››ÝÐÛÝ[]\Ë˜ÛÛ™šYÑ]VÙWK˜ÛÝ[
JK
ÏLNÝ\Ë™]P\œ‹œ™\XÙP[
\Ë˜ÛÛ™šYÑ]J_KKœ›ÝÝ\Kš[š]]OY[˜Ý[ÛŠ
^Ý\Ë™]P\œŸ
\Ë™]P\œ[™]È]ZK\œ˜^PÛÛXÝ[Û‹\Ë›\Ý™]T›ÝšY\]\Ë™]P\œŠNÝ˜\ˆÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÔTUš\ÚY
]QÛØ˜[ÛÛ™šYËÛÛ™šYÔTUš\ÚYÙWK\Ë˜ÛÛ™šYÑ]Kœ\Ú

_K_J˜\ÙUšY]ÊN××Ü™Y›XÝ
Ø[˜˜Q]™\žQ^P^QÚY[™[œ›ÝÝ\K•Ø[˜˜Q]™\žQ^P^QÚY[™[ŠKÚ[™ÝË•Ø[˜˜Q]™\žQ^P^QÚY[™[UØ[˜˜Q]™\žQ^P^QÚY[™[Ý˜\ˆØ[˜˜Tš]š[YÙQÚY][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH•Ø[˜˜Tš]š[YÙR][T™[™\ˆ‹K›\Ýš][T™[™\™\QÝZ[][P˜\ÙL‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\ÊK\Ë˜^P‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›Û•\\Ê_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K™]PÚ[™ÙY˜Ø[
\ÊNÝ\Ë™]NÝ\Ëš\]™[œÛÝ\˜ÙOHØ[˜˜WÝš\Û]™[ÈŠÝ\Ë™]Kš\
È—Ü™È‹\Ë›ÜšYÚ[˜[šXÙK^H‘ÚpèHønäXûï&ˆŠÝ\Ë™]K›ÜšYÚ[˜[šXÙK\Ë›™YYX‹^H‘ÚpèHxnáÛˆ8n¨Z{ï&ˆŠÝ\Ë™]K›™YYX‹\Ë›\Ý™]T›ÝšY\[™]È\œ˜^PÛÛXÝ[ÛŠ\Ë™]K˜]Ø\™ÊNÝ˜\ˆO]\Ë™]K››ÝÐÛÝ[ŒÌÌÎÍŽŒMMŒŒÝ\Ë˜^PÛÝ[^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š	ÐðìÈ8nàÈ]X{ï&›ÛÛÛÜH‰ÊÙJÉÈ‰ÊÝ\Ë™]K››ÝÐÛÝ[
ÈÙ›Û‹ÈŠÝ\Ë™]K˜ÛÝ[
_KKœ›ÝÝ\K›Û•\Y[˜Ý[ÛŠ
^ÚYŠÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[]\Ë™]Kš\	‰\Ë™]K››ÝÐÛÝ[Œ	‰XÝÜ‹žX]\Ë™]K›™YYXŠTXÝ]š]TÞ\Ð˜\ÙKš[œÊ
KœÙ[™Ø[˜˜Tš]š[YÙP^QÚYØNM
\Ë™]Kš\
NÙ[Ù^Ý˜\ˆO]›ÚYÚYŠÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[\Ë™]Kš\\Ë™]K››ÝÐÛÝ[L
^ÙO]\Ë™]K››ÝÐÛÝ[LÈ±$0èÈ1$xn¨]ønäH8n©Ûˆ]XH8näZH1$XKÚ0í™È8nàÈ]XH0ê›HŽˆøn©Ûˆ1$xn¨]’TŠÝ\Ë™]Kš\
ÈˆxnæÚHðìÈ8nàÈ]XH0îšH]pè°èHŽÝ˜\ˆOUØ\›•šY]ËœÚÝÊK[˜Ý[ÛŠ
^ßK[[[œÝ\™HŠNÚKœÙ]“X™[
–0èXÈš8n«[ˆŠ_Y[ÙH\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßŠ__K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
Ø[˜˜Tš]š[YÙQÚY][T™[™\‹œ›ÝÝ\K•Ø[˜˜Tš]š[YÙQÚY][T™[™\ˆŠNÝ˜\ˆØ[˜˜Q]™\žQ^T™]Ø\™[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH•Ø[˜˜Q]™\žQ^T™]Ø\™‹K›\Ýš][T™[™\™\QÝZ[][P˜\ÙL‹K›\Ý‹š][T™[™\™\QÝZ[][P˜\ÙL‹K›ØœÙ\™JXÝ]š]TÞ\Ð˜\ÙKš[œÊ
KœÜÝØ[˜˜Tš]š[YÙT™]Ø\™ØNMK\]Q]JK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›\Ýš\ÚX›OHLK\Ë›\Ý‹š\ÚX›OHLK\Ë›Z[“]™[š\ÚX›OHL\Ë›X^]™[š\ÚX›OHL\Ëš\]™[‹š\ÚX›OHLK\Ëœ™XÙZ]™Y‹š\ÚX›OHLK\Ë˜YÝXÚ]™[
\Ëœ™XÙZ]™Y‹\Ë›ÛÛXÚÊKXÝ]š]TÞ\Ð˜\ÙKš[œÊ
KœÙ[™Ø[˜˜Tš]š[YÙT™]Ø\™Ý]WØNM
ÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[
K\Ëš[š]]J
K\Ë\]Q]J
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ÔXÝ]š]TÞ\Ð˜\ÙKš[œÊ
KœÙ[™Ø[˜˜Tš]š[YÙT™]Ø\™ØNM
ÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[
_KKœ›ÝÝ\K\]Q]OY[˜Ý[ÛŠ
^Ý\Ëœ™XÙZ]™Y‹š\ÚX›OLOTXÝ]š]TÞ\Ð˜\ÙKš[œÊ
Kœš]š[YÙT™]Ø\™Ý]OÈLNˆL\Ëœ™XÙZ]™Y‹™[˜X›YLOTXÝ]š]TÞ\Ð˜\ÙKš[œÊ
Kœš]š[YÙT™]Ø\™Ý]OÈLNˆLKKœ›ÝÝ\Kš[š]]OY[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÔTUš\š]š[YÙQÚY
]QÛØ˜[ÛÛ™šYËÛÛ™šYÔTUš\š]š[YÙQÚYÚWKKœ\Ú

NÙVÔÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[LWI‰Š\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠVÔÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[LWK˜]Ø\™ÊK\Ë›\Ýš\ÚX›O]\Ëœ™XÙZ]™Y‹š\ÚX›OHL\Ë›Z[“]™[š\ÚX›OHLJKVÔÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[I‰Š\Ë›\Ý‹™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠVÔÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[K˜]Ø\™ÊK\Ë›\Ý‹š\ÚX›OHL\Ë›X^]™[š\ÚX›OHLK\Ëš\]™[‹š\ÚX›OHL\Ëš\]™[‹œÛÝ\˜ÙOHØ[˜˜WÝš\Û]™[ÈŠÊÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[
ÌJJÈ—Ü™ÈŠK\Ëš\]™[œÛÝ\˜ÙOHØ[˜˜WÝš\Û]™[ÈŠÔÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[
È—Ü™ÈŸK_J˜\ÙUšY]ÊN××Ü™Y›XÝ
Ø[˜˜Q]™\žQ^T™]Ø\™[™[œ›ÝÝ\K•Ø[˜˜Q]™\žQ^T™]Ø\™[™[ŠKÚ[™ÝË•Ø[˜˜Q]™\žQ^T™]Ø\™[™[UØ[˜˜Q]™\žQ^T™]Ø\™[™[Ý˜\ˆØ[˜˜Uš\š]š[YÙUÚ[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKØ[˜˜Q]™\žQ^T™]Ø\™[™[[™]ÈØ[˜˜Q]™\žQ^T™]Ø\™[™[KØ[˜˜Q]™\žQ^P^QÚY[™[[™]ÈØ[˜˜Q]™\žQ^P^QÚY[™[KœÚÚ[“˜[YOH•Ø[˜˜Uš\š]š[YÙTÚÚ[ˆ‹Kš\ÕÜ]™[HLKœ›ÛTÙ[XÝ˜™Ò[YËœÛÝ\˜ÙOH˜šX[ÝLÈ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\Ê_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›ØœÙ\™JXÝ]š]TÞ\Ð˜\ÙKš[œÊ
KœÜÝØ[˜˜Tš]š[YÙT™]Ø\™ØNM\Ë\]Q]JK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›Û˜ÛXÚÊK\Ë˜YÝXÚ]™[
\Ëœ™]Ø\™\Ë›Û˜ÛXÚÊK\Ë˜YÝXÚ]™[
\Ë™ÚY\Ë›Û˜ÛXÚÊK\Ëœ™]Ø\™š\ÚX›OTÑÓ\ÙËš\×ÜÚÝ×Üš]š[YÙWÜ™]Ø\™\Ë™ÚYš\ÚX›OLOOTÑÓ\ÙËš\×ÜÚÝ×Üš]š[YÙWÙÚY	‰ŒOOTÑÓ\ÙËš\ÔÚÝÔ™XÚ\™ÙOÈLˆLK\Ëœ™]Ø\™Ù[XÝXÛÛ‹š\ÚX›O]\Ëœ™]Ø\™š\ÚX›K\Ë™ÚYÙ[XÝXÛÛ‹š\ÚX›OH]\Ëœ™]Ø\™Ù[XÝXÛÛ‹š\ÚX›KO]\Ëœ™]Ø\™š\ÚX›I‰Š\Ë™ÚYžONLÊK\Ë˜ÜT[™[TÑÓ\ÙËš\×ÜÚÝ×Üš]š[YÙWÜ™]Ø\™Ý\ËØ[˜˜Q]™\žQ^T™]Ø\™[™[\ËØ[˜˜Q]™\žQ^P^QÚY[™[\ËœÚÝÕšY]Ê
K\Ë\]Q]J
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™SØœÙ\™J
K\Ë˜ÜT[™[˜ÛÜÙJ
_KKœ›ÝÝ\K\]Q]OY[˜Ý[ÛŠ
^Ý\Ëš\]™[œÛÝ\˜ÙOHØ[˜˜WÝš\Û]™[ÈŠÔÑÓ\ÙËØ[˜˜WÙÚYÝš\Û]™[
È—Ü™È‹\Ëœ™]Ø\™™YÚ[š\ÚX›OLOOTXÝ]š]TÞ\Ð˜\ÙKš[œÊ
Kœš]š[YÙT™]Ø\™Ý]_KKœ›ÝÝ\K˜ÛÜÙUšY]ÏY[˜Ý[ÛŠ
^Ý\Ë›ÛÜT[™[	‰Š\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›ÛÜT[™[
K\Ë›ÛÜT[™[˜ÛÜÙJ
J_KKœ›ÝÝ\KœÚÝÕšY]ÏY[˜Ý[ÛŠ
^Ý\Ë˜ÜT[™[	‰Š\Ë˜ÛÜÙUšY]Ê
K\Ëš[™›Ë˜YÚ[
\Ë˜ÜT[™[
K\Ë˜ÜT[™[›Ü[Š
J_KKœ›ÝÝ\K›Û˜ÛXÚÏY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ëœ™]Ø\™\Ëœ™]Ø\™Ù[XÝXÛÛ‹š\ÚX›OHL\Ë™ÚYÙ[XÝXÛÛ‹š\ÚX›OHLK\Ë›ÛÜT[™[]\Ë˜ÜT[™[\Ë˜ÜT[™[]\ËØ[˜˜Q]™\žQ^T™]Ø\™[™[\ËœÚÝÕšY]Ê
NØœ™XZÎØØ\ÙH\Ë™ÚY\Ë™ÚYÙ[XÝXÛÛ‹š\ÚX›OHL\Ëœ™]Ø\™Ù[XÝXÛÛ‹š\ÚX›OHLK\Ë›ÛÜT[™[]\Ë˜ÜT[™[\Ë˜ÜT[™[]\ËØ[˜˜Q]™\žQ^P^QÚY[™[\ËœÚÝÕšY]Ê
__KKœ›ÝÝ\K˜ÚXÚÕX”Ø]WØNMY[˜Ý[ÛŠ
^ßK_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ø[˜˜Uš\š]š[YÙUÚ[‹œ›ÝÝ\K•Ø[˜˜Uš\š]š[YÙUÚ[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊØ[˜˜Uš\š]š[YÙUÚ[‹^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ\Ù\•Ø\›Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\KœÙ]Ø\›“X™[Y[˜Ý[ÛŠKKËŠ^Ý›ÚYOO\É‰ŠÏH››Ü›X[ŠK›ÚYOO[‰‰ŠH›YŠNÝ˜\ˆÏUšY]ÓYÜ‹š[œÊ
K›Ü[ŠØ\›•šY]ÊNÜ™]\›ˆËœÙ]Ø\›’[™›ÊKKËŠKßKKœ›ÝÝ\KœÙ]^QÛÛÙÕØ\›Y[˜Ý[ÛŠJ^Ý›ÚYOOYI‰ŠOLJNÝ˜\ˆOUšY]ÓYÜ‹š[œÊ
K›Ü[ŠÚÜÛÛÙÕØ\›ŠNÜ™]\›ˆKœÙ]]JJK_K_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
\Ù\•Ø\›‹œ›ÝÝ\K•\Ù\•Ø\›ˆŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý\Ù\•Ø\›U\Ù\•Ø\›‹š[œË˜š[™
\Ù\•Ø\›Š_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆ˜YÐY][UšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[“Ü[Ù[‹\ËœšXÙKœÙ]\J[Û™^PÛÛœÝž]X[˜˜[Ê_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë™XÐ‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜Y‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\ËœÝ\™P‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜Ø[˜Ù[‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚÊK\ËœÙ]ÛÝ[[WØNM
J_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë™XÐ‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜Y‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËœÝ\™P‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜Ø[˜Ù[‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚÊ_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë™XÐŽ\ËœÙ]ÛÝ[[WØNM
[X™\Š\Ë˜ÛÝ[^
KMJNØœ™XZÎØØ\ÙH\Ë˜YŽ\ËœÙ]ÛÝ[[WØNM
[X™\Š\Ë˜ÛÝ[^
JÍJNØœ™XZÎØØ\ÙH\ËœÝ\™PŽšYŠJXÝÜ‹žX]\ËœšXÙK™Ù]šXÙJ
JJ^Õ\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßŠKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZßU\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÙ[™˜YÐYÜšY
[X™\Š\Ë˜ÛÝ[^
KÍJNØØ\ÙH\Ë˜Ø[˜Ù[Ž˜Ø\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJNØœ™XZÎØØ\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ__KKœ›ÝÝ\KœÙ]ÛÝ[[WØNMY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÐ˜YÐ˜\ÙKOQÛØ˜[ÛÛ™šYËÛÛ™šYÐ˜YÑ^[™ÏPÛÛ[[Û•][Ë™Ù]Øš™XÝ[™Ý
JKJ\Ù\˜YÔÞ\Ý[Kš[œÊ
K˜˜YÓ[KYK˜˜\ÙTÚ^™JKÙKœ›ÝÔÚ^™KÏJË[ŠJ™Kœ›ÝÔÚ^™NÍOÊMK\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•±$0èÈ0èønäHxnçÈ¸næ[™Èš8nãÈš8n©]ŠJN›É‰Š[Ë\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•±$0èÈ0èønäHxnçÈ¸næ[™È8næÛˆš8n©]ŠJK\Ë˜ÛÝ[^HˆŠÝÙ›ÜŠ˜\ˆOL]ÙKœ›ÝÔÚ^™KLNÜZÚ
ÊÊXJÏZVÛŠÚK˜ÛÜÝÝ\ËœšXÙKœÙ]šXÙJJ_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
˜YÐY][UšY]Ëœ›ÝÝ\K˜YÐY][UšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ˜YÐY][UšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆ˜YÑ[\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[‘[˜YÈ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\ËœÝ\™P‹\Ë›ÛÛXÚÊNÝ˜\ˆOLŒÝÌI‰ŠO]ÌJK\Ë›[U^^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ•0îšH1$xnäÈÚ0í™È1$xnéÈ›ÛÛÛÜHÌÎXˆŠÚJÈÙ›ÛˆÚ8nåÈ¸nä[™ËZH0ì›™È8nã[ˆ0îšH1$xnäÈ±¬8næØÈ1$xnàÈ°è[šÚ0í™Èš8n«[ˆ1$q¬8nèØÈ8n©Ûˆ1¬8nçÛ™ËˆŠ_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËœÝ\™P‹\Ë›ÛÛXÚÊ_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\ËœÝ\™PŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊKšY]ÓYÜ‹š[œÊ
K›Ü[ŠÛY[\]Z\ÕÝ[Ú[Š__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
˜YÑ[\ÕšY]Ëœ›ÝÝ\K˜YÑ[\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ˜YÑ[\ÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆØZ[‘ÛÛÙÒ][SÛ™OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[‘ØZ[‘ÛÛÙÒ][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë™]NÝ\Ë™\ØË^]œÝŸKØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K\Ù\‘]H‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë™]_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J][T™[™\˜\ÙJN××Ü™Y›XÝ
ØZ[‘ÛÛÙÒ][SÛ™Kœ›ÝÝ\K‘ØZ[‘ÛÛÙÒ][SÛ™HŠNÝ˜\ˆØZ[‘ÛÛÙÒ][UÛÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[‘ØZ[‘ÛÛÙÒ][Lˆ‹_\™]\›ˆ×Ù^[™ÊK
K_JØZ[‘ÛÛÙÒ][T™[™\ŠN××Ü™Y›XÝ
ØZ[‘ÛÛÙÒ][UÛËœ›ÝÝ\K‘ØZ[‘ÛÛÙÒ][UÛÈŠNÝ˜\ˆØZ[‘ÛÛÙÓ›ÔÚÚ[’][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý\Ë™\ØË^]\Ë™]VÌ_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K\Ù\‘]H‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë™]_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJK_J][T™[™\˜\ÙJN××Ü™Y›XÝ
ØZ[‘ÛÛÙÓ›ÔÚÚ[’][T™[™\‹œ›ÝÝ\K‘ØZ[‘ÛÛÙÓ›ÔÚÚ[’][T™[™\ˆŠNÝ˜\ˆÚÜÛÛÙÕØ\›Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[‘ØZ[‘ÛÛÙÈ‹\Ë™ØZ[“\Ýš][T™[™\™\QØZ[‘ÛÛÙÒ][UÛË\Ë˜ÛÝ[œ™\ÝšXÝHŒNH‹\ËœšXÙKœÙ]\J[Û™^PÛÛœÝž]X[˜˜[ÊK\ËÝ[šXÙKœÙ]\J[Û™^PÛÛœÝž]X[˜˜[ÊK\Ëš][RXÛÛ‹š[YÒ›Ø‹š\ÚX›OHL_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë™XÐ‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜Y‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë™XÌL‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜YL‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜^P‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\ËÜ\‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚÊK\Ë™ØZ[“\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û•ÝXÚ\Ý]™[ØNM\ÊK\Ë˜YÚ[™ÙQ]™[
\Ë˜ÛÝ[\Ë›ÛÚ[™ÙS[WØNM
K\Ë›ØœÙ\™JÚÜš[œÊ
KœÜÝ^T™\Ý[™\Ý[\Ë˜^PØ[˜XÚ×ØNM
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë™ØZ[“\Ýœ™[[Ý™Q]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û•ÝXÚ\Ý]™[ØNM\ÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë™XÐ‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜Y‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë™XÌL‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜YL‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜^P‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËÜ\‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚÊK\Ë˜ÛÝ[œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[ÒS‘ÑK\Ë›ÛÚ[™ÙS[WØNM\Ê_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë™XÐŽ\ËœÙ]Ý[šXÙS[WØNM
\Ë—ÝÝ[[KLJNØœ™XZÎØØ\ÙH\Ë˜YŽ\ËœÙ]Ý[šXÙS[WØNM
\Ë—ÝÝ[[JÌJNØœ™XZÎØØ\ÙH\Ë™XÌLŽ\ËœÙ]Ý[šXÙS[WØNM
\Ë—ÝÝ[[KLL
NØœ™XZÎØØ\ÙH\Ë˜YLŽ\ËœÙ]Ý[šXÙS[WØNM
\Ë—ÝÝ[[JÌL
NØœ™XZÎØØ\ÙH\Ë˜^PŽXÝÜ‹žX]\ËÝ[šXÙK™Ù]šXÙJ
OÔÚÜš[œÊ
KœÙ[™^SÜ\˜]JKÖÝ\Ë—ÙÛÛÙÒY\Ë—ÝÝ[[WWJNŠ\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßŠKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊJNØœ™XZÎØØ\ÙH\ËÜ\Ž˜\ˆOT™XÚ\™ÙKš[œÊ
K™Ù]™XÚ\™ÙQ]J
NÚI‰ŒOZK›[OÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠÚ\™ÙQš\œÝÚ[”[™[
NŠšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJKšY]ÓYÜ‹š[œÊ
K›Ü[Š™XÚ\™ÙQš\œÝÚ[ŠJNØœ™XZÎØØ\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ__KKœ›ÝÝ\K›Û•ÝXÚ\Ý]™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]š][NÚYŠ[O]š][J^Ý˜\ˆÏUšY]ÓYÜ‹š[œÊ
KšY]ÓÜ[ÚXÚÊVÌWKVÌ—JNÚYŠÊ^Ý˜\ˆHLÚYŠ”™XÚ\™ÙUÛÕÚ[ˆOZVÌWJ^Ý˜\ˆÏT™XÚ\™ÙKš[œÊ
K™Ù]™XÚ\™ÙQ]J
NÛÉ‰›Ë›[_
HLKšY]ÓYÜ‹š[œÊ
K›Ü[Š™XÚ\™ÙQš\œÝÚ[ŠJ_[‰‰ˆˆˆOZVÌWI‰‘Ø[YQÝZY\‹™ÝZY[˜ÙJVÌWKVÌ—KVÌ×JKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ[\Ý˜][ÛœÕ\Ú[ŠKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJÙX\Û”[™[
KšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJÙX\Û”ÛÝ[œ™XZÕšY]ÊK’Z\›ÛÛ]ÐÛÛHˆOZVÌWI‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJZ\›ÛÛ]ÐÛÛJK“Y\•Ú[™ÝÈOZVÌWI‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ›Ü™ÙUÚ[ŠK“XZ[•šY]ÈOZVÌWI‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJÚÜšY]Ê___KKœ›ÝÝ\K˜^PØ[˜XÚ×ØNMY[˜Ý[ÛŠ
^ÝŒÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJNŠ\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊŸÎŒŒÌÌLYI•’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛßŠKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊJ_KKœ›ÝÝ\K›ÛÚ[™ÙS[WØNMY[˜Ý[ÛŠ
^Ý˜\ˆOS[X™\Š\Ë˜ÛÝ[^
NÝ\ËœÙ]Ý[šXÙS[WØNM
J_KKœ›ÝÝ\KœÙ]]OY[˜Ý[ÛŠJ^Ý˜\ˆNÚYŠŒ™M
^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝNÝ\Ëš][RXÛÛ‹œÙ]]JÊK\Ë›˜[YU^HˆŠÜË›˜[YK\Ë›˜[YU^ÛÛÜPÛÛ™šYÒ][K™Ù]]X[]PÛÛÜŠÊKOPÛÛ™šYÒ][TÝÜ™K™Ù]ÝÜ™PžR][RQ

K\Ë]U^H’Ú0í™È1$xnéÈ™Ý^pê›ˆxnáÝKš8n«[ˆ]XHðèXÈðèXÚØ]HŸY[Ù^ÜÝÚ]Ú
\Ëš][RXÛÛ‹œÙ]]J[
K
^ØØ\ÙH[Û™^PÛÛœÝ™ÛÛ\Ëš][RXÛÛ‹š[YÒXÛÛ‹œÛÝ\˜ÙOP]Ø\™Ñ]KÕT”‘SÖWÔ‘TÖÝK\Ë›˜[YU^P]Ø\™Ñ]K“SQWÐÕT”‘SÖVÝK\Ë]U^H’Ú0í™È1$xnéÈxnà[ˆ8náËš8n«[ˆ]XHðèXÈðèXÚØ]HŽØœ™XZÎØØ\ÙH[Û™^PÛÛœÝœÛÝ[\Ëš][RXÛÛ‹š[YÒXÛÛ‹œÛÝ\˜ÙOP]Ø\™Ñ]KÕT”‘SÖWÔ‘TÖÝK\Ë›˜[YU^P]Ø\™Ñ]K“SQWÐÕT”‘SÖVÝK\Ë]U^H’Ú0í™È1$xnéÈ[šØKš8n«[ˆ]XHðèXÈðèXÚØ]HŽØœ™XZÎØØ\ÙHÎ\Ëš][RXÛÛ‹š[YÒXÛÛ‹œÛÝ\˜ÙOP]Ø\™Ñ]KÕT”‘SÖWÔ‘TÖÝK\Ë›˜[YU^P]Ø\™Ñ]K“SQWÐÕT”‘SÖVÝK\Ë]U^H’Ú0í™È1$xnéÈðí™Èpè›‹š8n«[ˆ]XHðèXÈðèXÚØ]HŽØœ™XZÎØØ\ÙH\Ëš][RXÛÛ‹š[YÒXÛÛ‹œÛÝ\˜ÙOP]Ø\™Ñ]KÕT”‘SÖWÔ‘TÖÝK\Ë›˜[YU^P]Ø\™Ñ]K“SQWÐÕT”‘SÖVÝK\Ë]U^H’Ú0í™È1$xnéÈ1$ZxnàÛH0èš8nì]Kš8n«[ˆ]XHðèXÈðèXÚØ]HŽØœ™XZÎØØ\ÙH[Û™^PÛÛœÝÙZUØ[™Î\Ëš][RXÛÛ‹š[YÒXÛÛ‹œÛÝ\˜ÙOP]Ø\™Ñ]KÕT”‘SÖWÔ‘TÖÝK\Ë›˜[YU^P]Ø\™Ñ]K“SQWÐÕT”‘SÖVÝK\Ë]U^H’Ú0í™È1$xnéÈ^H¸nã[™Ëš8n«[ˆ]XHðèXÈðèXÚØ]HŸ]\Ë›˜[YU^ÛÛÜLMÍNŸ]˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑØZ[’][VÝKÏLÛÊ\Ë™ØZ[“\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ‹™ØZ[•Ø^JKÏMŒ
›‹™ØZ[•Ø^K›[™Ý
N\Ë™ØZ[“\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ×JKOÊ\Ë™ÛÛÙÑÜ›Ý\š\ÚX›OHL\Ë›˜[YUžLŒK\Ë›˜[YUžOLMÌ\Ë›˜[YU^[YÛH˜Ù[\ˆ‹\Ëš][RXÛÛ‹žLMK\Ë™ØZ[“\ÝÜ›Ý\™\XØ[Ù[\LŒ\Ë—ÙÛÛÙÒYZKšY\ËœšXÙKœÙ]šXÙJKœšXÙJK\ËœÙ]Ý[šXÙS[WØNM
JJNŠ\Ë™ÛÛÙÑÜ›Ý\š\ÚX›OHLK\Ë›˜[YUžLN‹\Ë›˜[YUžOLŒ\Ë›˜[YU^[YÛH˜Ù[\ˆ‹\Ëš][RXÛÛ‹žLMÌ‹\Ë™ØZ[“\ÝÜ›Ý\™\XØ[Ù[\LL
K\Ë\Ü›Ý\žO]\Ë™ØZ[“\ÝÜ›Ý\šZYÚ
Ý\Ë™ØZ[“\ÝÜ›Ý\žJÌßKKœ›ÝÝ\KœÙ]Ý[šXÙS[WØNMY[˜Ý[ÛŠ
^Ì]Ý\Ë—ÝÝ[[OLNLYMÝ\Ë—ÝÝ[[ONNNNN\Ë—ÝÝ[[O]\Ë˜ÛÝ[^]\Ë—ÝÝ[[JÈˆ‹\ËÝ[šXÙKœÙ]šXÙJ\Ë—ÝÝ[[J\ËœšXÙK™Ù]šXÙJ
JNÝ˜\ˆOVÌK‹ËK‹ËNÙ›ÜŠ˜\ˆH[ˆJNÙ›ÜŠ˜\ˆÏLÜÏK›[™ÝÜÊÊÊNßK_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ÚÜÛÛÙÕØ\›‹œ›ÝÝ\K”ÚÜÛÛÙÕØ\›ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÚÜÛÛÙÕØ\›‹^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆØ[˜QÚY\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK™ÚYX^][OMKK™\œ›ÜÛÙO^È‹MHŽˆ•0îšH]pè°èH1$pèÈš8n«[ˆ¸näÚKÚ0í™È8nàÈš8n«[ˆ8n¨ZKš8næÈ™ðèHXZHxn¯Ü8néXÈ1$xn¯Ûˆ[™È0è›H0îšH]pèš8n«[ˆ0îšH]pèxnæÚHš0ê{ï H‹ˆ“š8n«[ˆ0èšðí™ËÚ0î˜ÈxnêÛ™È¸n¨[ˆš8n«[ˆ1$q¬8nèØûï&ˆ‹Nˆ“pèÈ0îšH]pèÚ0í™È8nèÜ8náÈ‹Žˆ•0í™È[ˆðê›šÚ0í™È8nèÜ8náÈ‹Îˆ”Ù\™\ˆÚ0í™È8nèÜ8náÈ‹ˆ“pèÈ8n®È1$pèÈ8n¯Ý8n¨[ˆ‹Nˆ“™ðèHš8n«[ˆÚ0í™È8nèÜ8náÈ‹Žˆ”ønäH8n©Ûˆ1$q Û™Èš8n«\›Û™Èxn©ÛˆÚ1¬H1$xnéÈpêHøn©ÝH‹Îˆøn©\’T¸nä[™È‹ˆøn©\’TÚ0í™ÈÚ8næÜ‹Nˆøn«\š8n«]8nâØÚønëHønëH8né[™È0îšH]pè8n©]¸n¨ZH‹Lˆ‘ønëZH1¬8n©]¸n¨ZH‹Œˆ’8náÈ8nä[™È1$X[™È¸n«[ˆ‹ŒNˆ•[HønäH8nåÚH‹ŒŽˆ“8nåÚHÚH8n©^H8nëÈxnáÝH0îšH]pè‹ŒÎˆ±$8nåZH0îšH]pè1$pèÈ1$xn¨]ÚxnæÚH8n¨[ˆ8näZH1$XH‹Œˆ’Ú0í™È8n¨ÚH0îšH]pè1$xnåZH1$ZxnàÛH°è0îšH]pè’TÚ0í™Èøn©ÛˆÚxnàÛH˜H‹ŒNˆ’Ú0í™È1$xnéÈ1$ZxnàÛKÚ0í™È8nàÈ1$xnåZH0îšH]pè1$ZxnàÛH‹ŒŽˆ“™ñ¬8nçZH0î[™ÈÚ0í™È8n¨ÚH’TÚ0í™È8nàÈ1$xnåZH0îšH]pè’T‹ŒÎˆøn©\’T™ñ¬8nçZH0î[™ÈÚ0í™ÈÚ8næÜøn©\0îšH]pè’TÚ0í™È8nàÈ1$xnåZH‹Œˆ•0îšH]pè1$pèÈ8n¯Ý8n¨[ˆ‹ŒNˆ‘ÚxnæÚH8n¨[ˆønäH8n©Ûˆ1$xnåZH0îšH]pè1$ZxnàÛHxnåÚH™ñ¬8nçZH0î[™È‹LŽˆ’8náÈ8nä[™È1$X[™È¸n«[‹ZH0ì›™È8nëH8n¨ZHØ]Høn­ØÈpê›ˆ8náÈÔÒÒ1$xnàÈ8nëH0ïHŸK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH•Ø[˜QÚY\ÔÚÚ[ˆ‹\Ë›\Ýš][T™[™\™\QÝZ[][P˜\Ù_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\ËœÝ\™PŒ\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙXŒ\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚÊK\ËœÙ]Ø\›’[™›Ê
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\ËœÝ\™PŒ\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙXŒ\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚÊ_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ_KKœ›ÝÝ\KœÙ]Ø\›’[™›ÏY[˜Ý[ÛŠ
^ÚYŠ\ËØ\›“X™[Kš\ÚX›O]\ËØ\›“X™[‹š\ÚX›O]\Ë›\Ýš\ÚX›O]ÌK\ËØ\›“X™[š\ÚX›OH]ÌKÌJ^Ý\ËØ\›“X™[K^]\Ë™\œ›ÜÛÙVÝÌWWKˆO]\ËØ\›“X™[K^	‰Š\ËØ\›“X™[K^H’8náÈ8nä[™È1$X[™È¸n«[‹ZH0ì›™È8nëH8n¨ZHØ]Høn­ØÈpê›ˆ8náÈÔÒÒÛÙNˆŠÝÌWJNÙ›ÜŠ˜\ˆOV×KOR”ÓÓ‹œ\œÙJÌ—JKÏLNÜÏ]\Ë™ÚYX^][NÜÊÊÊZVÈš][HŠÜÊÈ—Û[H—OŒ	‰™Kœ\Ú
Ý\NšVÈš][HŠÜÊÈ—Ý\H—KYšVÈš][HŠÜÊÈ—ÚY—KÛÝ[šVÈš][HŠÜÊÈ—Û[H—_JNÝ\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠJ_Y[ÙH\ËØ\›“X™[^]\Ë™\œ›ÜÛÙVÝÌWW_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ø[˜QÚY\ÕšY]Ëœ›ÝÝ\K•Ø[˜QÚY\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊØ[˜QÚY\ÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆØ\›•šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœÚÝÏY[˜Ý[ÛŠKKË‹ËJ^Ý›ÚYOO\É‰ŠÏ[[
K›ÚYOO[‰‰Š[[
K›ÚYOO[É‰ŠÏH››Ü›X[ŠK›ÚYOOXI‰ŠOH˜Ù[\ˆŠNÝ˜\ˆU\Ù\•Ø\›‹š[œÊ
KœÙ]Ø\›“X™[
Ù[˜Î™K\ÓØšŽš_KÙ[˜ÌŽœË\ÓØšŒŽ›ŸKËJNÜ™]\›ˆŸKKœ›ÝÝ\KœÚÝÕRR[™›ÏY[˜Ý[ÛŠKKÊ^Ý\Ë›YÜ›Ý\š\ÚX›OHLK\ËšXÛÛŒKš\ÚX›OHLK\Ë›X™[Kš\ÚX›OHLK\ËœšYÚÜ›Ý\š\ÚX›OHLK\ËšXÛÛŒ‹š\ÚX›OHLK\Ë›X™[‹š\ÚX›OHLK
JI‰Š\Ë›YÜ›Ý\š\ÚX›OHL	‰Š\ËšXÛÛŒKš\ÚX›OHL\ËšXÛÛŒKœÛÝ\˜ÙO]
KI‰Š\Ë›X™[Kš\ÚX›OHL\Ë›X™[K^YJJK
_ÊI‰Š\ËœšYÚÜ›Ý\š\ÚX›OHLI‰Š\ËšXÛÛŒ‹š\ÚX›OHL\ËšXÛÛŒ‹œÛÝ\˜ÙOZJKÉ‰Š\Ë›X™[‹š\ÚX›OHL\Ë›X™[‹^\ÊJ_KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[Ø\›‘œ˜[YHŸKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\ËœÝ\™P‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë››Ý‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙX‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜Øž\Ë›ÛÛXÚÊK\Ë˜ØžœÙ[XÝYHL_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\ËœÝ\™P‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë››Ý‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙX‹\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜Øž\Ë›ÛÛXÚÊ_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\ËœÝ\™PŽ›[O]\Ë˜Ø[˜XÚË™[˜É‰\Ë˜Ø[˜XÚË™[˜Ë˜Ø[
\Ë˜Ø[˜XÚË\ÓØšŠNØœ™XZÎØØ\ÙH\Ë››ÝŽ˜Ø\ÙH\Ë˜ÛÜÙXŽ˜Ø\ÙH\Ë˜™ÐÛÜÙN\Ë˜Ø[˜XÚÌ‹™[˜Ì‰‰\Ë˜Ø[˜XÚÌ‹™[˜Ì‹˜Ø[
\Ë˜Ø[˜XÚÌ‹\ÓØšŒŠNØœ™XZÎØØ\ÙH\Ë˜Øž”Þ\ÔÙ][™Ñ]Kš[œÊ
KœÙ]›ÛÛ
Þ\ÔÙ][™Ñ]K‘PÑK˜Ý\œ™[\™Ù]œÙ[XÝY
_]˜Ý\œ™[\™Ù]O]\Ë˜Øž	‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\Kš\ÔÚÝÕÚ[ˆ‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Ú\ÔÚÝÕÚ[ŸKÙ]™[˜Ý[ÛŠ
^Ý\Ë—Ú\ÔÚÝÕÚ[ˆO]	‰Š\Ë—Ú\ÔÚÝÕÚ[]
_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\KœÙ]Ø\›’[™›ÏY[˜Ý[ÛŠKKËŠ^Ý›ÚYOOZI‰ŠO[[
K›ÚYOO\É‰ŠÏH››Ü›X[ŠK›ÚYOO[‰‰ŠH›YŠK\ËØ\›“X™[^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ
K\Ë˜Ø[˜XÚÏYK\Ë˜Ø[˜XÚÌZK\Ë˜Ý\œ™[Ý]O\Ë\ËØ\›“X™[^[YÛ[ŸKKœ›ÝÝ\KœÙ]“X™[Y[˜Ý[ÛŠJ^Ý	‰Š\Ë››Ý‹›X™[]
KI‰Š\ËœÝ\™P‹›X™[YJ_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ø\›•šY]Ëœ›ÝÝ\K•Ø\›•šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊØ\›•šY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆÙ[ÛÛYUšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[Ù[ÛÛYT[™[‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊNÝ˜\ˆOR›Ü\K˜\YÈˆˆOYI‰‘ÛØ˜[ÛÛ™šYËÛÛ™šYÕ\œ˜XÙQ\ØÖÙWOÝ\ËœÛÙÛÛ‹^QÛØ˜[ÛÛ™šYËÛÛ™šYÕ\œ˜XÙQ\ØÖÙWK™\ØÎ\ËœÛÙÛÛ‹^HˆŸKKœ›ÝÝ\K˜Ü™X]PÚ[™[Y[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ü™X]PÚ[™[‹˜Ø[
\ÊK\Ë˜[Y]S›ÝÊ
_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë\Ë›ÛÛXÚÊK\Ëœ^SPÊ
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›ÛÛXÚÊKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\ËœXÊ_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^Ý\ËœÝ\™P‹š\ÚX›OHLNÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]
\ËœXÊKÏUšY]ÓYÜ‹š[œÊ
K™Ù]šY]ÊXZ[•šY]ÊNÚYŠÉ‰œË›ØØ][ÛŠ^Ý˜\ˆ\Ë›ØØ][ÛŽÚYŠŠ^Ý˜\ˆÏ[‹›ØØ[ÑÛØ˜[

NÝ\ËœÝ\™QÜ›Ý\™ÛØ˜[ÓØØ[
ËžËžKÊKKÊÜØØ[VŒØØ[VNŒ›ËžN›Ëž_KL
K˜Ø[
[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ_J_]\Ë™Y™‰‰Š\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™ŠK\Ë™Y™[[
K[[Ù[Kš[œÊ
KœÜÝÙ[ÛÛYJ
__KKœ›ÝÝ\Kœ^SPÏY[˜Ý[ÛŠ
^Ý\Ë™Y™Ÿ
\Ë™Y™[™]ÈXÐ[š[X][Û‹\Ë™Y™‹ž]\ËœÝ\™QÜ›Ý\ÚYÌ‹\Ë™Y™‹žO]\ËœÝ\™QÜ›Ý\šZYÚÌ‹MK\Ë™Y™‹œØØ[V]\Ë™Y™™Ü›Ý\œØØ[V\Ë™Y™‹œØØ[VO]\Ë™Y™™Ü›Ý\œØØ[VK\ËœÝ\™QÜ›Ý\˜YÚ[
\Ë™Y™ŠJK\Ë™Y™‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜XÚY]™PÛÛH‹LJ_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ù[ÛÛYUšY]Ëœ›ÝÝ\K•Ù[ÛÛYUšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÙ[ÛÛYUšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆÙX\ÛœÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÞ\ÒYTXÚØYÙRQ•ÙX\ÛœËKœ™YÓ™]\ÙÊKœÜÝÙX\ÛœÒ[™›ÊKKœ™YÓ™]\ÙÊKKœÜÝÙX\ÛœÕ\]™[™\Ý[
KKœ™YÓ™]\ÙÊ‹KœÜÝÙX\ÛœÐXÝ™\Ý[
KKœ™YÓ™]\ÙÊËKœÜÝÙX\ÛœÕ\ÙSÜ\˜]JKKœ™YÓ™]\ÙÊKœÜÝÙX\ÛœÑ›^X›PXÝ™\Ý[
KKœ™YÓ™]\ÙÊKKœÜÝÙX\ÛœÑ›^X›PÛÝ[™\Ý[
K_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\K˜ÚXÚÔ™YÚ[Y[˜Ý[ÛŠ
^ÚYŠSÜ[”Þ\Ý˜\ÙKš[œÊ
K˜ÚXÚÔÞ\ÓÜ[ŠÞ\Ý[U\K•ÑPTÓ”ÊJ\™]\›ˆLNÝ˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^

NÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[
^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÚWNÚYŠKÙX\ÛœË™Ù]™YÚ[žTÝZ]
ËšY
J\™]\›ˆL]˜\ˆQ›Ü™ÙT™YÚ[š[œÊ
K™Ù]›^X›T™YÚ[

NÚYŠŠ\™]\›ˆLÝ˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[˜\ÙKš][ZY
NÜ™]\›ˆÉ‰™KÙX\ÛœË™›^X›PÛÝ[LOÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[˜\ÙK›X^][S[OÈLˆL_KKœ›ÝÝ\K˜ÚXÚÒ\Õ\ÙQ›^X›OY[˜Ý[ÛŠJ^Ý˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^

NÜ™]\›‹LHOZKÙX\ÛœË™Ù]›^X›Q]J
Kš[™^ÙŠJOÈLˆL_KKœ›ÝÝ\KœÙ[™ÙX\ÛœÕ\]™[[™›ÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÚKÜš]Pž]J
KKÜš]TÚÜ
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™ÙX\ÛœÐXÝ[™›ÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\ÊŠNÚKÜš]Pž]J
KKÜš]TÚÜ
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™ÙX\ÛœÕ\ÙR[™›ÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\ÊÊNÚKÜš]Pž]J
KKÜš]TÚÜ
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™ÙX\ÛœÑ›^X›PXÝ[™›ÏY[˜Ý[ÛŠKJ^Ý˜\ˆÏ]\Ë™Ù]ž]\Ê
NÜËÜš]Pž]J
KËÜš]Pž]JJKËÜš]TÚÜ
JK\ËœÙ[™ÔÙ\™\ŠÊ_KKœ›ÝÝ\KœÙ[™ÙX\ÛœÑ›^X›PÛÝ[[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÙKÜš]Pž]J
K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÜÝÙX\ÛœÒ[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[œÚYÛ™Yž]J
KOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
JNÚKÙX\ÛœËœ\œÙ\Š
_KKœ›ÝÝ\KœÜÝÙX\ÛœÕ\]™[™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[œÚYÛ™Yž]J
KOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
JNÚKÙX\ÛœËœ\œÙ\’[™›ÓÛ›J
_KKœ›ÝÝ\KœÜÝÙX\ÛœÐXÝ™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[œÚYÛ™Yž]J
KOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
JNÚKÙX\ÛœËœ\œÙ\”ÛÝ[[™›ÓÛ›JJ_KKœ›ÝÝ\KœÜÝÙX\ÛœÕ\ÙSÜ\˜]OY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[œÚYÛ™Yž]J
KOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
JNÚKÙX\ÛœËÙX\ÛœÒY]œ™XYÚÜ

NÝ˜\ˆÏQ[]SYÜ‹š[œÊ
K™Ù][]PžR[™JKš[™JNÜÉ‰œË\]S[Ù[

_KKœ›ÝÝ\KœÜÝÙX\ÛœÑ›^X›PXÝ™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[œÚYÛ™Yž]J
KO]œ™XY[œÚYÛ™Yž]J
KÏ]œ™XYÚÜ

KTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
JKÏ[‹ÙX\ÛœË™Ù]›^X›Q]J
NÚYŠOOUÙX\Û‘›^˜XÝ
KLOO[Ëš[™^ÙŠÊI‰›Ëœ\Ú
ÊNÙ[ÙH›ÜŠ˜\ˆOLØOË›[™ÝØJÊÊZYŠÖØWOO\Ê^ÛËœÜXÙJKJNØœ™XZß_KKœ›ÝÝ\KœÜÝÙX\ÛœÑ›^X›PÛÝ[™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
KO]œ™XYÚÜ

KÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
JNÜÉ‰ŠËÙX\ÛœË™›^X›PÛÝ[ZOÚJÌNŒ
_K_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
ÙX\ÛœËœ›ÝÝ\K•ÙX\ÛœÈŠNÝ˜\ˆÙX\Û‘›^ÈY[˜Ý[ÛŠ
^ÝÝ˜XÝLOH˜XÝ‹Ý˜Ø[˜Ù[LWOH˜Ø[˜Ù[ŸJÙX\Û‘›^
ÙX\Û‘›^^ßJJNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^ÝÙX\ÛœÏUÙX\ÛœËš[œË˜š[™
ÙX\ÛœÊ_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆÙX\ÛœÑ]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý˜\ˆSØš™XÝšÙ^\ÊÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[
NÝ\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]O^ßNÙ›ÜŠ˜\ˆOLÙO›[™ÝÙJÊÊ^Ý˜\ˆO]ÙWKÏ[™]ÈÙX\ÛœÔÛÝ[[™›ÎÝ\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]VÚWO\ß]SØš™XÝšÙ^\ÊÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÊK\Ë•ÙX\ÛœÒ[™›Ñ]O^ßNÙ›ÜŠ˜\ˆOLÙO›[™ÝÙJÊÊ^Ý˜\ˆO]ÙWNÝ\Ë•ÙX\ÛœÒ[™›Ñ]VÚW_
\Ë•ÙX\ÛœÒ[™›Ñ]VÚWO^ßJ_]\Ë•ÙX\ÛœÑ›^X›R[™›Ñ]OV×K\ËÙX\ÛœÒYL\Ë™›^X›PÛÝ[L\™]\›ˆœ›ÝÝ\K™Ù]ÝZ]ÛÛ™šYÐžRYY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]\Ë™Ù][™›Ñ]J
KOLÏHLKQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÝKÏLÛÏ‹˜XÝÛÛ™›[™ÝÛÊÊÊ^Ý˜\ˆO[‹˜XÝÛÛ™Û×NÚYŠÏHLØš™XÝšÙ^\ÊVØWJK›[™Ý
Y›ÜŠ˜\ˆˆ[ˆVØWJ^Ý˜\ˆYVØWVÜ—NÚYŠO[É‰ŠOZ›]™[
KZ›]™[
^ÜÏHLNØœ™XZßZ›]™[ZI‰ŠOZ›]™[
_Y[ÙHÏHLNÚYŠ\ÊXœ™XZß]˜\ˆÚYŠÊ^Ý˜\ˆÏHˆŽÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]ÝJ^ÚYŠJOS[X™\ŠJJJXœ™XZÎØÏ]_XÉ‰ŠQÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]ÝVØ×J_\™]\›ˆKœ›ÝÝ\K™Ù]™^ÝZ]ÛÛ™šYÐžRYY[˜Ý[ÛŠ
^Ý˜\ˆKO]\Ë™Ù]ÝZ]ÛÛ™šYÐžRY

NÚ_
OQÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]ÝVÌJNÙ›ÜŠ˜\ˆÈ[ˆÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]ÝJZYŠÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]ÝVÜ×K›]™[šK›]™[
^ÙOQÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]ÝVÜ×NØœ™XZß\™]\›ˆ_Kœ›ÝÝ\Kœ\œÙ\Y[˜Ý[ÛŠ
^Ý\Ëœ\œÙ\’[™›×ØNM

K\Ëœ\œÙ\”ÛÝ[[™›×ØNM

K\Ëœ\œÙ\•ÙX\Û‘›^X›R[™›×ØNM

_Kœ›ÝÝ\Kœ\œÙ\’[™›×ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]œ™XYÚÜ

KOLÙOšNÚJÊÊ^Ý˜\ˆÏ]œ™XYÚÜ

K]œ™XY[

NÝ\Ë•ÙX\ÛœÒ[™›Ñ]VÜ×O^ßNÝ˜\ˆÏ[™]ÈÙX\ÛœÒ[™›ÎÛËœÙ][™›ÊËŠK\Ë•ÙX\ÛœÒ[™›Ñ]VÜ×VÛ—O[ß_Kœ›ÝÝ\Kœ\œÙ\”ÛÝ[[™›×ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]œ™XYÚÜ

KOLÙOšNÚJÊÊ^Ý˜\ˆÏ]œ™XYÚÜ

NÝ\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]VÜ×KœÙ]ÛÝ[[™›ÊÊ__Kœ›ÝÝ\Kœ\œÙ\•ÙX\Û‘›^X›R[™›×ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]œ™XYÚÜ

KOLÙOšNÚJÊÊ^Ý˜\ˆÏ]œ™XYÚÜ

NÝ\Ë•ÙX\ÛœÑ›^X›R[™›Ñ]Kœ\Ú
Ê_]\Ë™›^X›PÛÝ[]œ™XYÚÜ

K\Ë™›^X›PÛÝ[	‰\Ë™›^X›PÛÝ[
ÊßKœ›ÝÝ\Kœ\œÙ\’[™›ÓÛ›OY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYÚÜ

KO]œ™XY[

NÝ\Ë•ÙX\ÛœÒ[™›Ñ]VÙWO^ßNÝ˜\ˆÏ[™]ÈÙX\ÛœÒ[™›ÎÜËœÙ][™›ÊKJK\Ë•ÙX\ÛœÒ[™›Ñ]VÙWVÚWO\ßKœ›ÝÝ\Kœ\œÙ\”ÛÝ[[™›ÓÛ›OY[˜Ý[ÛŠJ^Ý˜\ˆO]œ™XYÚÜ

NÚYŠOŒ
^Ý\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]VÚWKœÙ]ÛÝ[[™›ÊJNÝ˜\ˆÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
JNÚYŠÊ^Ý˜\ˆ]\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]VÚWKš[œÚYVÜËš›Ø‹LWNÛ‰‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJÙX\Û”[™[
___Kœ›ÝÝ\K™Ù]™YÚ[žTÝZ]Y[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÝNÚYŠYJ\™]\›ˆLNÚYŠ]\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]VÝKšY	‰\Ë’\ÐXÝ]š]UÙX\ÛžRY

J\™]\›ˆLÙ›ÜŠ˜\ˆH[ˆK˜XÝÛÛ™
^Ý˜\ˆÏYK˜XÝÛÛ™ÚWK]\Ë™Ù][™›Ó]™[žRY
ÊKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖÜ×VÛ—KO[Ë˜ÛÜÝ[KQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖÜ×VÛŠÌWNÚYŠI‰œŠ^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
Ë˜ÛÜÝ][JKZÚ˜ÛÝ[ŒÚYŠXJ\™]\›ˆL_\™]\›ˆ\Ë’\Ò]™P[™›ÝÙX\žRY

_Kœ›ÝÝ\K’\Ò]™P[™›ÝÙX\žRYY[˜Ý[ÛŠ
^ÚYŠ]\ËÙX\ÛœÒY
Y›ÜŠ˜\ˆH[ˆ\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]J^Ý˜\ˆO]\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]VÙWNÚYŠ
^ÚYŠOZKšY
\™]\›ˆLY[ÙHYŠKšY
\™]\›ˆL\™]\›ˆL_Kœ›ÝÝ\K™Ù][™›Ó]™[žRYY[˜Ý[ÛŠ
^Ý˜\ˆOLÚYŠ]\Ë•ÙX\ÛœÒ[™›Ñ]VÝJ\™]\›ˆÙ›ÜŠ˜\ˆH[ˆ\Ë•ÙX\ÛœÒ[™›Ñ]VÝJ^ÙO]\Ë•ÙX\ÛœÒ[™›Ñ]VÝVÚWK›]™[Øœ™XZß\™]\›ˆ_Kœ›ÝÝ\K™Ù]ÛÝžR[™›ÐžRYY[˜Ý[ÛŠ
^Ý˜\ˆNÚYŠ]\Ë•ÙX\ÛœÒ[™›Ñ]VÝJ\™]\›ˆNÙ›ÜŠ˜\ˆH[ˆ\Ë•ÙX\ÛœÒ[™›Ñ]VÝJ^ÙO]\Ë•ÙX\ÛœÒ[™›Ñ]VÝVÚWNØœ™XZß\™]\›ˆ_Kœ›ÝÝ\K™Ù]ÙX\Ò[™›ÐžTÛÝ[YY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]VÝNÜ™]\›ˆ_Kœ›ÝÝ\K’\ÐXÝ]š]UÙX\ÛžRYY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÝNÚYŠJ^Ù›ÜŠ˜\ˆOLÚOK˜XÝÛÛ™›[™ÝÚJÊÊ^Ý˜\ˆÏYK˜XÝÛÛ™ÚWNÚYŠPÛÛ[[Û•][Ë™Ù]Øš™XÝ[™Ý
\Ë•ÙX\ÛœÒ[™›Ñ]VÜ×JJ\™]\›ˆL_\™]\›ˆL\™]\›ˆL_Kœ›ÝÝ\K™Ù][™›Ñ]OY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë•ÙX\ÛœÒ[™›Ñ]_Kœ›ÝÝ\K™Ù]ÛÝ[[™›Ñ]OY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë•ÙX\ÛœÔÛÝ[[™›Ñ]_Kœ›ÝÝ\K™Ù]›^X›Q]OY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë•ÙX\ÛœÑ›^X›R[™›Ñ]_KJ
N××Ü™Y›XÝ
ÙX\ÛœÑ]Kœ›ÝÝ\K•ÙX\ÛœÑ]HŠNÝ˜\ˆÙX\ÛœÒ[™›ÏY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\ËšYL\Ë›]™[L\Ë˜ÛÜÝ][OL\Ë˜ÛÜÝ[OL\ËœÚÝÛL\Ë˜\ÜØ][L\ËšXÛÛHˆ‹\Ë›˜[YOHˆ‹\Ë˜]V×K\Ë™^Ø]V×_\™]\›ˆœ›ÝÝ\KœÙ][™›ÏY[˜Ý[ÛŠJ^ÚYŠŒ	‰™OŒ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖÝVÙWNÚYŠZJ\™]\›ŽÝ\ËšYZKšY\Ë›]™[ZK›]™[\Ë˜ÛÜÝ][OZK˜ÛÜÝ][K\Ë˜ÛÜÝ[OZK˜ÛÜÝ[K\ËœÚÝÛZKœÚÝÛ‹\Ë˜\ÜØ][ZK˜\ÜØ][\ËšXÛÛZKšXÛÛ‹\Ë›˜[YOZK›˜[YK\Ë˜]ZK˜]‹\Ë™^Ø]ZK™^Ø]Ÿ_KJ
N××Ü™Y›XÝ
ÙX\ÛœÒ[™›Ëœ›ÝÝ\K•ÙX\ÛœÒ[™›ÈŠNÝ˜\ˆÙX\ÛœÔÛÝ[[™›ÏY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\ËšXÛÛHˆ‹\ËšYL\Ë›˜[YOHˆ‹\Ë˜XÝÛÛ™V×K\Ëš[œÚYOV×K\Ë›Ý]ÚYOV×K\ËœXÏV×K\ËšXÛÛHˆŸ\™]\›ˆœ›ÝÝ\KœÙ]ÛÝ[[™›ÏY[˜Ý[ÛŠ
^ÚYŠŒ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÝNÚYŠYJ\™]\›ŽÝ\ËšYYKšY\Ë›˜[YOYK›˜[YK\Ë˜XÝÛÛ™YK˜XÝÛÛ™\Ëš[œÚYOYKš[œÚYK\Ë›Ý]ÚYOYK›Ý]ÚYK\ËœXÏYKœXË\ËšXÛÛYKšXÛÛŸ_KJ
N××Ü™Y›XÝ
ÙX\ÛœÔÛÝ[[™›Ëœ›ÝÝ\K•ÙX\ÛœÔÛÝ[[™›ÈŠNÝ˜\ˆÙX\ÛœÔÝZ][™›ÏY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\ËšYL\Ë›]™[L\Ë˜]^ßK\Ë™^Ø]^ß_\™]\›ˆœ›ÝÝ\KœÙ][™›ÏY[˜Ý[ÛŠ
^ßKJ
N××Ü™Y›XÝ
ÙX\ÛœÔÝZ][™›Ëœ›ÝÝ\K•ÙX\ÛœÔÝZ][™›ÈŠNÝ˜\ˆ[ÝšYPÛ\]™[YYÜ™]“[ÝšYPÛ\]™[ÙX\Û“\Ý][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[œÛÝ[][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\Ê_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^ÚYŠ\Ë™]I‰\Ë™]KœÚÝÒY
^Ý˜\ˆ]\Ë™]KšYO]\Ë™]Kš\Ý\ÙKO]\Ë™]Kš\Ô™YÚ[Ï]\Ë™]K›]™[J\Ë™]Kš\ÔÙ[XÝÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÝJKÏ]\Ë™]KœÚÝÒYOLK]\Ë™]KœÚÝÓ˜[YOÈL\Ë™]KœÚÝÓ˜[YNÂšYŠ[Š^ÛQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[Û×K\ËœÙ]Y™ÛÛ™šY×ØNM
‹JNÝ˜\ˆQÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]Û‹šYK]›ÚYÙ›ÜŠ˜\ˆÈ[ˆ
^ÛZØ×NØœ™XZß\™]\›ˆ\Ë[Y[X™[^[‹›˜[YK\ËšX[šXR[XYÙKš\ÚX›OHLK\Ëœ™YÚ[š\ÚX›OZK\Ë›]™[X™[^[›]™[
È˜¸n«XÈ‹›ÚY\ËœÙ]Ü˜^TXÊ\Ë›XÊ_]\ËœÙ]Y™ÛÛ™šY×ØNM
‹JK\Ë[Y[X™[^[‹›˜[YK\ËšX[šXR[XYÙKš\ÚX›OYK\Ëœ™YÚ[š\ÚX›OZK\Ë›]™[X™[^\ÊÈ˜¸n«XÈ‹\Ë[Y[X™[š\ÚX›O\‹\Ë›]™[X™[š\ÚX›O\Ÿ_KKœ›ÝÝ\KœÙ]Y™ÛÛ™šY×ØNMY[˜Ý[ÛŠJ^ÚYŠ
^Ý\Ë›Xß
\Ë›XÏ[™]ÈXÐ[š[X][ÛŠK\Ë›XËÝXÚ[˜X›YHL\Ë›XËœ\™[
\Ë™Y™œÜËœ\™[˜YÚ[
\Ë›XÊK\Ë›XËž]\Ë™Y™œÜËž\Ë›XËžO]\Ë™Y™œÜËžK\Ë›XËœ›Ý][Û]\Ë™Y™œÜËœ›Ý][Û‹MJNÝ˜\ˆO]š[œÚYVÙKLWNÝ\Ë›XËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÚKLJK\Ë˜ÛX[‘š[\œÊ\Ë›XÊ__KKœ›ÝÝ\KœÙ]Ü˜^TXÏY[˜Ý[ÛŠ
^Ý\Ë›XÉ‰\Ë˜ÛX[‘š[\œÊ\Ë›XÊK	‰Š\ËÙZZšZ[Ëš\ÚX›OHL
_KKœ›ÝÝ\K˜ÛX[‘š[\œÏY[˜Ý[ÛŠ
^Ý	‰Š\ËÙZZšZ[Ëš\ÚX›OHLJ_KKœ›ÝÝ\Kš\Ô™YÚ[Y[˜Ý[ÛŠ
^Ü™]\›ˆ\Ëœ™YÚ[š\ÚX›_KKœ›ÝÝ\K˜ÛX\Y[˜Ý[ÛŠ
^Ý\Ë˜ÛX[‘š[\œÊ\Ë›XÊ_KKœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^Ý\Ë˜ÛX\Š
_K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
ÙX\Û“\Ý][T™[™\‹œ›ÝÝ\K•ÙX\Û“\Ý][T™[™\ˆŠNÝ˜\ˆšYTÝ[ÏH“xnçÈÚ0ìØH‹ÙX\Û”[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[ŒÙX\Û”ÛÝ[‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\ËœÚÚ[XÛÛ‹\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë\Ü˜YPŒ\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë\›•\Ë›ÛÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚÊK\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÐXÝ™\Ý[\Ë˜Ø[˜XÚ×ØNM
K\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÕ\ÙSÜ\˜]K\Ë˜Ø[˜XÚ×ØNM
K\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÕ\]™[™\Ý[\Ë˜Ø[˜XÚ×ØNM
K\ËÙX\Û”ÚÝÔ[™[›Ü[Š
K\Ëœ›ÛRY]ÌK\ËÙX\Û’Y]ÌWK\Ëš[š]
\ËÙX\Û’Y
_KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\Ë\]UšY]×ØNM

_KKœ›ÝÝ\K\]UšY]×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÝNÚYŠYJY›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[
^ÙOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÚWNØœ™XZß]˜\ˆÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÝ\Ëœš[™Û˜[YK^YK›˜[YNÝ˜\ˆ\ËÙX\ÛœË™Ù]ÛÝ[[™›Ñ]J
VÝKÏ\ËÙX\ÛœË™Ù]ÝZ]ÛÛ™šYÐžRY

KOHŸÎŒ™Œ‰•Š1$0èÈðëXÚøn¨]
H‹HŸÎŒNŽ	•ˆŽÚYŠ[Ÿ[‹šY
^ÜHˆŽÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]ÝJ^ÛÏQÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]ÝVÚWNØœ™XZß_KLOO\ËÙX\ÛœË™Ù]›^X›Q]J
Kš[™^ÙŠ
I‰ŠOHˆŠK\Ë›]™[X™[^[Ë›]™[
È˜¸n«XÈ‹\ËœÚÚ[XÛÛ‹™]O^ÚXÛÛŽ›ËœÚÚ[XÛÛŸK\ËœÚÚ[˜[YK›][[[™OHLK\ËœÚÚ[˜[YKÛÜ™Ü˜\HLK\ËœÚÚ[˜[YK^[ËœÚÚ[˜[YNÝ˜\ˆÛÏ]\ËœÚÚ[˜[YKÚYÚYŠÛÏŒ	‰\ËœÚÚ[˜[YK^ÚYœÛÊ^Ý˜\ˆÛœÏ[ËœÚÚ[˜[YNÝÚ[JÛœË›[™ÝŒJ^ÜÛœÏ\ÛœËœÛXÙJLJK\ËœÚÚ[˜[YK^\ÛœÊÈ‹‹ˆŽÚYŠ\ËœÚÚ[˜[YK^ÚY\ÛÊXœ™XZß_]\ËœÝÙ\”[™[œÙ]ÝÙ\ŠË™Ù]ÙX\Û•Ý[ÝÙ\Š
JNÙ›ÜŠ˜\ˆVÍ‹‹WKVÌKÏLØÏK˜XÝÛÛ™›[™ÝØÊÊÊ^Ý˜\ˆOYK˜XÝÛÛ™Ø×K\ËÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
JNÚYŠ
Y›ÜŠ˜\ˆLÙ˜]‹›[™ÝÙ
ÊÊ^Ý˜\ˆÏ\˜]–ÙNÚYŠLHOZš[™^ÙŠË\JJY›ÜŠ˜\ˆLÙ›[™ÝÙŠÊÊZÙ—OOYË\I‰ŠÙ—JÏYË˜[YJ__Y›ÜŠ˜\ˆÏLÍ˜ÎØÊÊÊZYŠ\ÖÈ˜]ˆŠØ×J^Ý˜\ˆP]šX]Q]K™Ù]]”ÝžU\JØ×JNÝ\ÖÈ˜]ˆŠØ×K^]ŠÈŠÈŠÛØ×_]\ËœÚÚ[^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJˆŠÜŠÛËœÚÚ[\ØÊØJNÝ˜\ˆO\ËÙX\ÛœË™Ù]ÙX\Ò[™›ÐžTÛÝ[Y

NÝ\Ë\›•œ\™[	‰Š\Ë\›•^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸN‰••pê›ˆÝ[™ÈÚH[šŠJK\Ë™\ØÑÜ›Ý\š\ÚX›OHLËÙX\ÛœË™›^X›PÛÝ[Ê\Ë™\ØË^H”ønëH8né[™ÈÚ8nâH^H1$xnåZH™Ûøn¨ZH0ëš]xnä[ˆ1$xnåZHxnáÝH8nê[™ÈønîH± Û™È0èÞH1$xn¯Ûˆ‹\Ë\›•œ\™[\Ë™\ØËœ\™[˜YÚ[
\Ë\›•
JNŠ\Ë™\ØË^H”ønëH8né[™Èøn¯HðëXÚøn¨]xnáÝH8nê[™ÈønîH± Û™Èpê›ˆÝ[™È‹\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë\›•
JKI‰žKšYÜËÙX\ÛœËÙX\ÛœÒYO^KšYÊ\Ë\Ü˜YPŒ›X™[H’8néÞH‹\ËšX[šXR[XYÙKš\ÚX›OHL\Ëœ™YÚ[š\ÚX›OHLJNœËÙX\ÛœËÙX\ÛœÒYÊ\Ë\Ü˜YPŒ›X™[H•^H8n¯È‹\ËšX[šXR[XYÙKš\ÚX›OHLK\Ëœ™YÚ[š\ÚX›OHLJNŠ\Ë\Ü˜YPŒ›X™[H”ønëH8né[™È‹\ËšX[šXR[XYÙKš\ÚX›OHLK\Ëœ™YÚ[š\ÚX›OHL
NŠ\Ë\Ü˜YPŒ›X™[RšYTÝ[Ë\ËšX[šXR[XYÙKš\ÚX›OHLK\Ëœ™YÚ[š\ÚX›O\ËÙX\ÛœË’\ÐXÝ]š]UÙX\ÛžRY

K\Ë™\ØÑÜ›Ý\š\ÚX›OHLJK\ËÙX\Û”ÚÝÔ[™[š[š]šY]Ê\Ëœ›ÛRY
_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\ËœÚÚ[XÛÛŽ•šY]ÓYÜ‹š[œÊ
K›Ü[ŠÙX\Û”ÛÝ[ÚÚ[\ÕšY]Ë\Ëœ›ÛRY\ËÙX\Û’Y
NØœ™XZÎØØ\ÙH\Ë\Ü˜YPŒ˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÚYŠ\Ë\Ü˜YPŒ›X™[ORšYTÝ[Ê^Ý˜\ˆOYKÙX\ÛœË™Ù]ÝZ]ÛÛ™šYÐžRY
\ËÙX\Û’Y
NÚYŠZJ\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Êðì›ˆ¸næH8n«[ˆÚ1¬HðëXÚøn¨]ŠNÕÙX\ÛœËš[œÊ
KœÙ[™ÙX\ÛœÐXÝ[™›Ê\Ëœ›ÛRY\ËÙX\Û’Y
_Y[ÙH”ønëH8né[™ÈO]\Ë\Ü˜YPŒ›X™[ÕÙX\ÛœËš[œÊ
KœÙ[™ÙX\ÛœÕ\ÙR[™›Ê\Ëœ›ÛRY\ËÙX\Û’Y
Nˆ’8néÞHO]\Ë\Ü˜YPŒ›X™[ÕÙX\ÛœËš[œÊ
KœÙ[™ÙX\ÛœÕ\ÙR[™›Ê\Ëœ›ÛRY
Nˆ•^H8n¯ÈO]\Ë\Ü˜YPŒ›X™[	‰•ÙX\ÛœËš[œÊ
KœÙ[™ÙX\ÛœÕ\ÙR[™›Ê\Ëœ›ÛRY\ËÙX\Û’Y
NØœ™XZÎØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë\›•˜\ˆÏUšY]ÓYÜ‹š[œÊ
K™Ù]šY]Ê›Ü™ÙUÚ[ŠNÜÉ‰œËÙX\ÛœÛÝ[›Ü[Š\Ëœ›ÛRYLJKšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__KKœ›ÝÝ\K˜Ø[˜XÚ×ØNMY[˜Ý[ÛŠ
^Ý\Ë\]UšY]×ØNM
\ËÙX\Û’Y
_KKœ›ÝÝ\K™\ÝÜžUšY]×ØNMY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K™\ÝÜžUšY]×ØNM˜Ø[
\Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ÙX\Û”[™[œ›ÝÝ\K•ÙX\Û”[™[ŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÙX\Û”[™[^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆÙX\Û”ÚÝÔ[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[”Ý]]ÙX\Û”ÛÝ[‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÕ\]™[™\Ý[\Ë˜Ø[˜XÚÓÜ\˜]JK\Ëœ›ÛRYL\ËÙX\Û’YLKKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[X\ÙQ]™[

K\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\Kœ™[X\ÙQ]™[Y[˜Ý[ÛŠ
^ÚYŠ\Ë˜Ý\œ™[Ý]J^Ñ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›XÊK\Ë›XÏ[[\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›X\ÚÜÜ
K\Ë›X\ÚÜÜ[[Ù›ÜŠ˜\ˆLÝ[X™\Š\Ë˜Ý\œ™[Ý]JNÝ
ÊÊ]\Ëœ™[[Ý™UÝXÚ]™[
\ÖÈš][HŠÝK\Ë›ÛÛXÚ×ØNM
__KKœ›ÝÝ\Kš[š]šY]ÏY[˜Ý[ÛŠJ^Ý˜\ˆO]Ý\ËÙX\Û’YÏZ\Ó˜SŠJOÝ\Ëœ›ÛRY™NÝ\ËÙX\Û’YZK\Ëœ›ÛRY\ÎÝ˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÚWNÚYŠŠ^Ý˜\ˆÏ[‹˜XÝÛÛ™›[™ÝÝ\Ëœ™[X\ÙQ]™[

NÝ˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊNÝ\Ë˜Ý\œ™[Ý]O[ÊÈˆŽÙ›ÜŠ˜\ˆXKÙX\ÛœË™Ù]ÙX\Ò[™›ÐžTÛÝ[Y
‹šY
KLLÛ‹˜XÝÛÛ™›[™ÝÛ
ÊÊZYŠ\Ë˜YÝXÚ]™[
\ÖÈš][HŠÛK\Ë›ÛÛXÚ×ØNM
K‹šY
Z
ÊË\ÖÈ›X[ššY^X[ˆŠÛI‰\ËœÙ]YÚ
\ÖÈ›X[ššY^X[ˆŠÛJK\ÖÈš][HŠÛI‰Š\ÖÈš][HŠÛK™]OXKÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
‹˜XÝÛÛ™ÛJJNÙ[Ù^Ý˜\ˆÏXKÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
‹˜XÝÛÛ™ÛJNØÏÊ
ÊË\ÖÈ›X[ššY^X[ˆŠÛI‰\ËœÙ]YÚ
\ÖÈ›X[ššY^X[ˆŠÛJK\ÖÈš][HŠÛI‰Š\ÖÈš][HŠÛK™]OXKÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
‹˜XÝÛÛ™ÛJJJNŠ\ÖÈ›X[ššY^X[ˆŠÛI‰\ËœÙ]Ü˜^TXÊ\ÖÈ›X[ššY^X[ˆŠÛJK\ÖÈš][HŠÛI‰Š\ÖÈš][HŠÛK™]OQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖÛ‹˜XÝÛÛ™ÛWVÌJJ_]\ËœÙ]Y™—ØNM
‹˜XÝÛÛ™›[™Ý‹J__KKœ›ÝÝ\KœÙ]Y™—ØNMY[˜Ý[ÛŠKKÊ^ÚYŠJ^Ý˜\ˆLKÏZKš[œÚYVÛ‹LWNÝ\Ë›Xß
\Ë›XÏ[™]ÈXÐ[š[X][ÛŠK\Ë›XËœ\™[\Ë™Y™™Ü›Ý\˜YÚ[
\Ë›XÊK\Ë›XËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÛËLJK\Ë›XËž]\Ë™Y™œÜËž\Ë›XËžO]\Ë™Y™œÜËžK\Ë›XËœ›Ý][Û]\Ë™Y™œÜËœ›Ý][Û‹M__KKœ›ÝÝ\KœÙ]ÙX\ÛœÓ[Ù[ØNMY[˜Ý[ÛŠ
^Ý\ËÙX\Û’[YËœÛÝ\˜ÙOHˆŽÝ˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KO]™Ù]\]Z\žR[™^

KOYKš][K˜ÛÛ™šYÒQÚYŠOŒ
^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\ÚWK˜\X\˜[˜ÙNÜÉ‰œËš[™^ÙŠ–Ú›Ø—HŠO‹LI‰ŠÏ\Ëœ™\XÙJ–Ú›Ø—H‹š›ØŠÈˆŠJK\ËÙX\Û’[YËœÛÝ\˜ÙO\ÊÈ—ÈŠÝœÙ^
È—Ø×Ü™ÈŸ_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOLÙO[X™\Š\Ë˜Ý\œ™[Ý]JNÙJÊÊZYŠ˜Ý\œ™[\™Ù]O]\ÖÈš][HŠÙWJ^Ý˜\ˆO]\ÖÈš][HŠÙWKœÛÝÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
K\ËÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
JNÛ‰‰›‹›]™[Û‹˜\ÜØ][ÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠÙX\Û”ÛÝ[œ™XZÕšY]ËÙX\Û”ÛÝ[œ™XZÕšY]Ë•TËËš[™^JN•šY]ÓYÜ‹š[œÊ
K›Ü[ŠÙX\Û”ÛÝ[œ™XZÕšY]ËÙX\Û”ÛÝ[œ™XZÕšY]Ë”ÒS‘Ò’KËš[™^JN•šY]ÓYÜ‹š[œÊ
K›Ü[ŠÙX\Û”ÛÝ[œ™XZÕšY]ËÙX\Û”ÛÝ[œ™XZÕšY]Ë’’RSËËš[™^JNØœ™XZß_KKœ›ÝÝ\K™Ù]›Ø”ÚÚ[“˜[YWØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú

^ØØ\ÙHNœ™]\›ˆžš[ˆŽØØ\ÙHŽœ™]\›ˆ™˜HŽØØ\ÙHÎœ™]\›ˆ™[ÈŸ\™]\›ˆˆŸKKœ›ÝÝ\K˜Ø[˜XÚÓÜ\˜]OY[˜Ý[ÛŠ
^Ý\Ëš[š]šY]Ê
_KKœ›ÝÝ\KœÙ]Ü˜^TXÏY[˜Ý[ÛŠ
^Ý˜\ˆOVËŒË‹ŒË‹ŒË‹KNÝ™š[\œÏVÛ™]ÈYÜ™]ÛÛÜ“X]š^š[\ŠJW_KKœ›ÝÝ\KœÙ]YÚY[˜Ý[ÛŠ
^Ý™š[\œÏV×_KKœ›ÝÝ\K˜ÛX[‘š[\œÏY[˜Ý[ÛŠJ^Ý\ÖÈžš[ˆŠÝ
ÙWK™š[\œÏV×K\ÖÈ™˜HŠÝ
ÙWK™š[\œÏV×K\ÖÈ™[ÈŠÝ
ÙWK™š[\œÏV×_KKœ›ÝÝ\K™\ÝXÝÜY[˜Ý[ÛŠ
^ßK_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
ÙX\Û”ÚÝÔ[™[œ›ÝÝ\K•ÙX\Û”ÚÝÔ[™[ŠKÚ[™ÝË•ÙX\Û”ÚÝÔ[™[UÙX\Û”ÚÝÔ[™[Ý˜\ˆÙX\Û”ÚÚ[][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[ÙX\Û”ÚÚ[][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\Ê_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý\Ë™]I‰Š\ËœÚÚ[XÛÛ‹œÛÝ\˜ÙO]\Ë™]KšXÛÛŠÈ—Ü™ÈŠ_KKœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K˜ÛX\Y[˜Ý[ÛŠ
^ßK_J][T™[™\˜\ÙJN××Ü™Y›XÝ
ÙX\Û”ÚÚ[][T™[™\‹œ›ÝÝ\K•ÙX\Û”ÚÚ[][T™[™\ˆŠKÚ[™ÝË•ÙX\Û”ÚÚ[][T™[™\UÙX\Û”ÚÚ[][T™[™\ŽÝ˜\ˆÙX\Û”ÛÝ[œ™XZÒ][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOHÙX\Û”ÛÝ[œ™XZÚ][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\Ê_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^ÚYŠ\Ë™]J^Ý˜\ˆO]\Ë™]KœÝ[KO]\Ë™]K˜ÛÜÝ[KÏ]\Ë™]K˜ÛÜÝ][NÝYOZOÐÛÛÜ•][•ÒUNÛÛÜ•][”‘Q\Ë›‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸÎˆŠÝ
È‰•ˆŠÙJÈŸßÎˆÙ™™™™™‰•ˆŠÚJÈŸŠK\Ëš][RXÛÛ‹š[YÒ›Ø‹š\ÚX›OHLNÝ˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÜ×NÝ\Ë›˜[YU^[‹›˜[YK\Ëš][RXÛÛ‹š[YÒXÛÛ‹œÛÝ\˜ÙO[‹šXÛÛŠÈ—Ü™ÈŸ_KKœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K˜ÛX\Y[˜Ý[ÛŠ
^ßK_J][T™[™\˜\ÙJN××Ü™Y›XÝ
ÙX\Û”ÛÝ[œ™XZÒ][T™[™\‹œ›ÝÝ\K•ÙX\Û”ÛÝ[œ™XZÒ][T™[™\ˆŠKÚ[™ÝË•ÙX\Û”ÛÝ[œ™XZÒ][T™[™\UÙX\Û”ÛÝ[œ™XZÒ][T™[™\ŽÝ˜\ˆÙX\Û”ÛÝ[œ™XZÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Ø[\ØÏHˆ‹KœÚÚ[“˜[YOHÙX\Û”ÛÝ[œ™XZÈ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ššZ[Ë\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜\Ë\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜›X[šXK\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë™Y™™XÝ[™Ø[˜XÚ×ØNM\ÊK\Ëœ™[[Ý™SØœÙ\™J
K\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë\‘Y™ŠK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™š[š\ÚY™ŠNÙ›ÜŠ˜\ˆOLÚO\Ë™Y™œË›[™ÝÚJÊÊQ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™œÖÚWJ_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ššZ[Ë\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜\Ë\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜›X[šXK\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÕ\]™[™\Ý[\Ë˜Ø[˜XÚÊK\Ë\Õ\O]ÌK\Ëœ›ÛRY]ÌWK\ËœÛÝ]Ì—K\Ë™Y™œÏV×K\Ë™›\ÏV×K\Ëœ™Yœ™\ÚšY]Ê
_KKœ›ÝÝ\K˜Ø[˜XÚÏY[˜Ý[ÛŠ
^Õ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê\Ë˜Ø[\ØÊÈ•0èšðí™ÈŠK’ðëXÚøn¨]O]\Ë˜Ø[\ØÏÊ\ËœÝ\‹š\ÚX›OHL\Ë›ØÚËš\ÚX›OHLK\Ë\Õ\OYK”ÒS‘Ò’K\Ë˜Ø[˜XÚÕÕ\]WØNM

JNˆ“°è›™Èøn©\O]\Ë˜Ø[\ØÏÝ\Ëœ^U\‘Y™™XÝØNM

Nˆ±$8næ]0èHO]\Ë˜Ø[\ØÉ‰\Ëœ^Y›QY™™XÝØNM

_KKœ›ÝÝ\K˜Ø[˜XÚÕÕ\]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KO]ÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
\ËœÛÝ
NÐ\ÜÙ\
K•ÙX\Û”ÛÝ[œ™XZÕÚ[ˆÛÝˆŠÝ\ËœÛÝ
È‹›ÛRYˆŠÝ\Ëœ›ÛRY
KK˜\ÜØ][Ý\Ë\Õ\OYK•TÎˆ±$8næ]0èHO]\Ë˜Ø[\ØÉ‰Š\Ë˜\ËÝXÚ[˜X›YHL\Ë\Õ\OYK”ÒS‘Ò’JK\Ëœ™Yœ™\ÚšY]Ê
_KKœ›ÝÝ\Kœ™Yœ™\ÚšY]ÏY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖÝ\ËœÛÝNÚYŠ\Ë\Õ\OOYK’’RSÊ^Ý\Ë]K^H’ðëXÚøn¨]‹\ËœÝ\‹š\ÚX›OHLK\Ë›ØÚËš\ÚX›OHL\ËššZ[Ëš\ÚX›OHL\Ë\Ëš\ÚX›OHLK\Ë›X[šXKš\ÚX›OHLK\Ëš][LKš[YÒXÛÛ‹œÛÝ\˜ÙOH˜—ÈŠÝÌKšXÛÛŠÈ—Ü™È‹\Ëš][LKš[YÐ™Ëš\ÚX›OHLK\Ëš][LKš[YÒ›Ø‹š\ÚX›OHLK\Ë›˜[YLK^]ÌK›˜[YNÝ˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÌK˜ÛÜÝ][JKÏZOÚK˜ÛÝ[ŒÚYŠ\Ë›X]\šX[K™]O^ØÛÜÝ][NÌK˜ÛÜÝ][KÛÜÝ[NÌK˜ÛÜÝ[KÝ[NœßKÌWK˜]Š^Ý˜\ˆP]šX]Q]K™Ù]]”ÝžU\JÌWK˜]–ÌK\JNÝ\Ëšš]Œ^[ŠÈŠÈŠÝÌWK˜]–ÌK˜[YK\Ëšš]ŒKš\ÚX›OHLÌWK˜]–ÌWOÊP]šX]Q]K™Ù]]”ÝžU\JÌWK˜]–ÌWK\JK\Ëšš]ŒK^[ŠÈŠÈŠÝÌWK˜]–ÌWK˜[YJN\Ëšš]ŒKš\ÚX›OHL_]\Ë›™YY][RY]ÌK˜ÛÜÝ][K\Ë˜Ý\”Ý[O\Ë\Ë›X^Ý[O]ÌK˜ÛÜÝ[_Y[ÙHYŠ\Ë\Õ\OOYK•TÊ^Ý\Ë]K^H±$8næ]0èH‹\ËœÝ\‹š\ÚX›OHL\Ë›ØÚËš\ÚX›OHLNÝ˜\ˆÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KO[ËÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
\ËœÛÝ
NÚYŠ\ËššZ[Ëš\ÚX›OHLK\Ë\Ëš\ÚX›OHL\Ë›X[šXKš\ÚX›OHLK\Ëš][LKš[YÒXÛÛ‹œÛÝ\˜ÙOH˜—ÈŠÝÌKšXÛÛŠÈ—Ü™È‹\Ëš][LKš[YÐ™Ëš\ÚX›OHLK\Ëš][LKš[YÒ›Ø‹š\ÚX›OHLK\Ë›˜[YLË^]ÌK›˜[YK\Ë]ŒK^XKœÚÝÛŠÈˆ‹\Ë]Œ‹^XK˜\ÜØ][
Èˆ‹\ËšYÚž]\Ë]ŒKž
Ý\Ë]ŒKÚY\Ë]Œ‹ž]\ËšYÚž
Ý\ËšYÚÚYK˜]Š^Ý\Ë]Œ^P]šX]Q]K™Ù]]”ÝžU\JK˜]–ÌK\JK\Ë]ŒË^XK˜]–ÌK˜[YJÈˆŽÝ˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖØKšYVØK›]™[
ÌWNÝ\Ë]^\‹˜]–ÌK˜[YJÈˆ‹\ËšYÚKž]\Ë]ŒËž
Ý\Ë]ŒËÚY\Ë]ž]\ËšYÚKž
Ý\ËšYÚKÚYK˜]–ÌWI‰œ‹˜]–ÌWOÊ\Ë™Ì‹š\ÚX›OHL\Ë]K^P]šX]Q]K™Ù]]”ÝžU\JK˜]–ÌWK\JK\Ë]‹^XK˜]–ÌWK˜[YJÈˆ‹\Ë]Ë^\‹˜]–ÌWK˜[YJÈˆ‹\ËšYÚ‹ž]\Ë]‹ž
Ý\Ë]‹ÚY\Ë]Ëž]\ËšYÚ‹ž
Ý\ËšYÚ‹ÚY
N\Ë™Ì‹š\ÚX›OHL_]˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
K˜ÛÜÝ][JKÏZOÚK˜ÛÝ[ŒÝ\Ë›X]\šX[™]O^ØÛÜÝ][N˜K˜ÛÜÝ][KÛÜÝ[N˜K˜ÛÜÝ[KÝ[NœßK\Ë›™YY][RYXK˜ÛÜÝ][K\Ë˜Ý\”Ý[O\Ë\Ë›X^Ý[OXK˜ÛÜÝ[_Y[ÙHYŠ\Ë\Õ\OOYK”ÒS‘Ò’J^Ý\Ë]K^H“^xnáÛˆ0ìØH‹\ËœÝ\‹š\ÚX›OHL\Ë›ØÚËš\ÚX›OHLK\Ë›X[šXKš\ÚX›OHL\ËššZ[Ëš\ÚX›OHLK\Ë\Ëš\ÚX›OHLNÝ˜\ˆÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KO[ËÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
\ËœÛÝ
KQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖØKšYVÌKQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖØKšYVØK›]™[
ÌWNÚYŠ\Š\™]\›ˆ\Ë˜ÛÜÝÜ›Ý\š\ÚX›OHLK\Ë˜›X[šXKš\ÚX›O]\Ë˜ÛÜÝÜ›Ý\š\ÚX›K\Ë›šYÚKš\ÚX›O]\Ë˜ÛÜÝÜ›Ý\š\ÚX›K\Ë›šYÚš\ÚX›O]\Ë˜ÛÜÝÜ›Ý\š\ÚX›K\Ë›]š\ÚX›O]\Ë˜ÛÜÝÜ›Ý\š\ÚX›K\Ë›]‹š\ÚX›O]\Ë˜ÛÜÝÜ›Ý\š\ÚX›K\Ë›X^\ØÌš\ÚX›OH]\Ë˜ÛÜÝÜ›Ý\š\ÚX›K\Ë›šYÚ‹š\ÚX›O]\Ë˜ÛÜÝÜ›Ý\š\ÚX›K\Ë›]Žš\ÚX›O]\Ë˜ÛÜÝÜ›Ý\š\ÚX›KK˜]‰‰Š\Ë›]ŒË^XKœÚÝÛŠÈˆ‹\Ë›]ŒK^P]šX]Q]K™Ù]]”ÝžU\JK˜]–ÌK\JK\Ë›]K^XK˜]–ÌK˜[YJÈˆ‹K˜]–ÌWOÊ\Ë˜]Œ‹š\ÚX›OHL\Ë›]Œ‹^P]šX]Q]K™Ù]]”ÝžU\JK˜]–ÌWK\JK\Ë›]Ë^XK˜]–ÌWK˜[YJÈˆŠN\Ë˜]Œ‹š\ÚX›OHLJK\Ë›˜[YL‹^Z›˜[YK\Ëš][LKš[YÒXÛÛ‹œÛÝ\˜ÙOH˜—ÈŠÚšXÛÛŠÈ—Ü™È‹\Ëš][LKš[YÐ™Ëš\ÚX›OHLK\Ëš][LKš[YÒ›Ø‹š\ÚX›OHLK\Ëœ™Yœ™\ÚY™—ØNM

K›ÚY\Ë˜YÚXÚÑY™“Ü\˜]WØNM

NÚYŠ\Ëš][LKš[YÒXÛÛ‹œÛÝ\˜ÙOH˜—ÈŠÚšXÛÛŠÈ—Ü™È‹\Ëš][LKš[YÐ™Ëš\ÚX›OHLK\Ëš][LKš[YÒ›Ø‹š\ÚX›OHLK\Ë›˜[YL‹^Z›˜[YKK˜]Š^Ý\Ë›]ŒË^XKœÚÝÛŠÈˆ‹\Ë›]^\‹œÚÝÛŠÈˆ‹\Ë›šYÚKž]\Ë›]ŒËž
Ý\Ë›]ŒËÚY
Ý\Ë›šYÚKÚY\Ë›]ž]\Ë›šYÚKž\Ë›]ŒK^P]šX]Q]K™Ù]]”ÝžU\JK˜]–ÌK\JK\Ë›]K^XK˜]–ÌK˜[YJÈˆ‹\Ë›]‹^\‹˜]–ÌK˜[YJÈˆ‹\Ë›šYÚž]\Ë›]Kž
Ý\Ë›]KÚY
Ý\Ë›šYÚÚY\Ë›]‹ž]\Ë›šYÚžK˜]–ÌWI‰œ‹˜]–ÌWOÊ\Ë˜]Œ‹š\ÚX›OHL\Ë›]Œ‹^P]šX]Q]K™Ù]]”ÝžU\JK˜]–ÌWK\JK\Ë›]Ë^XK˜]–ÌWK˜[YJÈˆ‹\Ë›]Ž^\‹˜]–ÌWK˜[YJÈˆ‹\Ë›šYÚ‹ž]\Ë›]Ëž
Ý\Ë›]ËÚY
Ý\Ë›šYÚ‹ÚY\Ë›]Žž]\Ë›šYÚ‹ž
N\Ë˜]Œ‹š\ÚX›OHLNÝ˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
K˜ÛÜÝ][JKÏZOÚK˜ÛÝ[ŒQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VØK˜ÛÜÝ][WNÝ\Ë›ZXÛÛŒœÛÝ\˜ÙO[šXÛÛŠÈ—Ü™ÈŽÝ˜\ˆÏ]›ÚYØÏ\ÏXK˜ÛÜÝ[OÐÛÛÜ•][•ÒUNÛÛÜ•][”‘Q\Ë˜ÛÝ[X™[K^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸÎˆŠØÊÈ‰•ˆŠÜÊÈŸßÎŒ™™™™™‰•ˆŠØK˜ÛÜÝ[JK\Ë›™YY][RYXK˜ÛÜÝ][K\Ë˜Ý\”Ý[O\Ë\Ë›X^Ý[OXK˜ÛÜÝ[__]\Ëœ™Yœ™\ÚY™—ØNM

K\Ë˜YÚXÚÑY™“Ü\˜]WØNM

_KKœ›ÝÝ\Kœ™Yœ™\ÚY™—ØNMY[˜Ý[ÛŠ
^ÚYŠ\ËœÝ\‹š\ÚX›J^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KO]ÙX\ÛœË™Ù]ÛÝžR[™›ÐžRY
\ËœÛÝ
NÚYŠZJ\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’xnàÛˆ8nâÈ¸n©]1¬8nç[™ÈŠNÚYŠ\Ë˜Ú\š[YËš\ÚX›OHLZK›]™[
^Ù›ÜŠ˜\ˆÏLÜÏK›X^Ú\ŽÜÊÊÊ]\ÖÈœÈŠÜ×Kš\ÚX›OHLNÜ™]\›ˆ›ÚY
\Ë˜Ú\š[YËš\ÚX›OHLJ_ZYŠ\Ë›X^\ØÌš\ÚX›_\Ë\Õ\OOYK•TÊ^Ù›ÜŠ˜\ˆÏLÜÏK›X^Ú\ŽÜÊÊÊ]\ÖÈœÈŠÜ×Kš\ÚX›OHLÜ™]\›ˆ›ÚY\Ü^U][Ë™˜]ÐÚ\Š\Ë—ÜÚ\\ËœÝ\‹ÚYŒKÍŒ
_Y›ÜŠ˜\ˆZK›]™[	LLÏLÜÏK›X^Ú\ŽÜÊÊÊ[Ý\ÖÈœÈŠÜ×Kš\ÚX›O[œÎ\ÖÈœÈŠÜ×Kš\ÚX›OHLK\Ë—ÜÚ\
\Ë—ÜÚ\[™]ÈYÜ™]”Ú\JK\Ë—ÜÚ\œ\™[
\ËœÝ\‹˜YÚ[
\Ë—ÜÚ\
K\Ë˜Ú\š[YË›X\ÚÏ]\Ë—ÜÚ\\Ë—ÜÚ\ž]\Ë—ÜÚ\žO]\ËœÝ\‹ÚYŒK\Ë—ÜÚ\œ›Ý][ÛKNL
KÏŒ	‰›ŒÑ\Ü^U][Ë™˜]ÐÚ\Š\Ë—ÜÚ\\ËœÝ\‹ÚYŒKÍŒ
Š‹LJKÙK›X^Ú\ŠN\Ë—ÜÚ\™Ü˜\XÜË˜ÛX\Š
__KKœ›ÝÝ\K˜YÚXÚÑY™“Ü\˜]WØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÝK›X^Ú\ŽÝ
ÊÊZYŠ\ÖÈœÈŠÝKš\ÚX›J^ÚYŠ]\Ë™Y™œÖÝJ^Ý˜\ˆO[™]ÈXÐ[š[X][ÛŽÝ\Ë™Y™œÖÝOZ_]\Ë™Y™œÖÝKœ\™[\ÖÈœÝ\ˆŠÝK˜YÚ[
\Ë™Y™œÖÝJK\Ë™Y™œÖÝKžLM‹\Ë™Y™œÖÝKžOLM‹\Ë™Y™œÖÝKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜˜[Lˆ‹LJ_Y[ÙH\Ë™Y™œÖÝI‰\Ë™Y™œÖÝKœ\™[	‰‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë™Y™œÖÝJ_KKœ›ÝÝ\Kœ^U\‘Y™™XÝØNMY[˜Ý[ÛŠ
^Ý\Ë\‘Y™Ÿ
\Ë\‘Y™[™]ÈXÐ[š[X][ÛŠK\Ë\‘Y™‹œ\™[\ËœÝ\‹˜YÚ[
\Ë\‘Y™ŠK\Ë\‘Y™‹žLMÌ\Ë\‘Y™‹žOLMÌÎÝ˜\ˆ]\ÎÝ\Ë\‘Y™‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ™›Ü™ÙTÝXØÙ\ÜÈ‹K[˜Ý[ÛŠ
^Ñ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\‘Y™Š_JK˜Ø[˜XÚÕÕ\]WØNM

_KKœ›ÝÝ\Kœ^Y›QY™™XÝØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\ËOY[˜Ý[ÛŠJ^ÚYŠK™Y™œÖÙWI‰šK™Y™œÖÙWKœ\™[
^ÚK™›\ÖÙWOHLÝ˜\ˆÏZKš][LK›ØØ[ÑÛØ˜[

NÚVÈœÝ\ˆŠÙWK™ÛØ˜[ÓØØ[
Ëž
ÌÎËžJÌÎÊKYÜ™]•ÙY[‹™Ù]
K™Y™œÖÙWJKÊÞœËžNœËž_KL
K˜Ø[
[˜Ý[ÛŠ
^Ý™›\ÖÙWOHLKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ™Y™œÖÙWJK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
™Y™œÖÙWJ_J__KO]\ËÏLÜÏ\Ë™Y™œË›[™ÝÜÊÊÊYJÊNÕ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë™Y™™XÝ[™Ø[˜XÚ×ØNM\ÊK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠL\Ë™Y™™XÝ[™Ø[˜XÚ×ØNM\Ê_KKœ›ÝÝ\K™Y™™XÝ[™Ø[˜XÚ×ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÝ\Ë™›\Ë›[™ÝÝ
ÊÊZYŠ\Ë™›\ÖÝJ\™]\›ŽÕ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë™Y™™XÝ[™Ø[˜XÚ×ØNM\ÊK\Ë™š[š\ÚY™Ÿ
\Ë™š[š\ÚY™[™]ÈXÐ[š[X][ÛŠK\Ë™š[š\ÚY™‹œ\™[\ËœÝ\‹˜YÚ[
\Ë™š[š\ÚY™ŠK\Ë™š[š\ÚY™‹žLMMK\Ë™š[š\ÚY™‹žOLMÝ˜\ˆO]\ÎÝ\Ë™š[š\ÚY™‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈœÜ\š]\È‹K[˜Ý[ÛŠ
^ÙK˜Ø[˜XÚÕÕ\]WØNM

K\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
K™š[š\ÚY™Š_J_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜ššZ[Î˜Ø\ÙH\Ë˜\ÎšYŠ\™Ù]O]\Ë˜ššZ[ÏÝ\Ë˜Ø[\ØÏH’ðëXÚøn¨]Ž\Ë˜Ø[\ØÏH±$8næ]0èH‹\Ë˜Ý\”Ý[O\Ë›X^Ý[J\™]\›ˆ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈ™Ý^pê›ˆxnáÝHŠK›ÚY\Ù\•Ø\›‹š[œÊ
KœÙ]^QÛÛÙÕØ\›Š\Ë›™YY][RY
NÕÙX\ÛœËš[œÊ
KœÙ[™ÙX\ÛœÕ\]™[[™›Ê\Ëœ›ÛRY\ËœÛÝ
KÛÝ[™][š[œÊ
Kœ^QY™™XÝPÊÛÝ[™][‘“Ô‘ÑJNØœ™XZÎØØ\ÙH\Ë˜›X[šXNšYŠ\Ë˜Ý\”Ý[O\Ë›X^Ý[J\™]\›ˆ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈ™Ý^pê›ˆxnáÝHŠK›ÚY\Ù\•Ø\›‹š[œÊ
KœÙ]^QÛÛÙÕØ\›Š\Ë›™YY][RY
NÝ\Ë˜Ø[\ØÏH“°è›™Èøn©\‹ÙX\ÛœËš[œÊ
KœÙ[™ÙX\ÛœÕ\]™[[™›Ê\Ëœ›ÛRY\ËœÛÝ
KÛÝ[™][š[œÊ
Kœ^QY™™XÝPÊÛÝ[™][‘“Ô‘ÑJNØœ™XZÎØØ\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__KK•TÏLKK’’RSÏL‹K”ÒS‘Ò’OLËK›X^Ú\NK_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ÙX\Û”ÛÝ[œ™XZÕšY]Ëœ›ÝÝ\K•ÙX\Û”ÛÝ[œ™XZÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÙX\Û”ÛÝ[œ™XZÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆÙX\Û”ÛÝ[][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOHÙX\Û”ÛÝ[][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\ÊK\ËœÛÝLKKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^ÚYŠ\Ë™]J^Ý˜\ˆÝ\Ë˜›XÚËš\ÚX›OHLK\Ë™]H[œÝ[˜Ù[ÙˆÙX\ÛœÒ[™›ÏÊ]\Ë™]K\Ëš][RXÛÛ‹œÙ]XÝ]™Y
L
JNŠ]\Ë™]K\Ë˜›XÚËš\ÚX›OHL
K\ËœÛÝ]šYÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖÝšYVÌNÝ\Ëš][RXÛÛ‹š[YÒXÛÛ‹œÛÝ\˜ÙOYKšXÛÛŠÈ—Ü™È‹\Ë›‹^J\Ó˜SŠ›]™[
OÙK›]™[›]™[
JÈˆ‹\Ë›˜[YU^YK›˜[YNÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖÝšYVÓ[X™\Š\Ë›‹^
JÌWNÚYŠ˜ÛÜÝ[I‰šJ^Ý˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
˜ÛÜÝ][JK\ÏÜË˜ÛÝ[ŒÝ\Ëœ™YÚ[š\ÚX›O[]˜ÛÜÝ[OÈLˆL_Y[ÙH\Ëœ™YÚ[š\ÚX›OHL__KKœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K˜ÛX\Y[˜Ý[ÛŠ
^ßK_J][T™[™\˜\ÙJN××Ü™Y›XÝ
ÙX\Û”ÛÝ[][T™[™\‹œ›ÝÝ\K•ÙX\Û”ÛÝ[][T™[™\ˆŠKÚ[™ÝË•ÙX\Û”ÛÝ[][T™[™\UÙX\Û”ÛÝ[][T™[™\ŽÝ˜\ˆÙX\Û”ÛÝ[ÚÚ[\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOHÙX\Û”ÛÝ[ÚÚ[\È‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚ×ØNM
K\Ëœ›ÛRY]ÌK\ËÙX\Û’Y]ÌWNÝ˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÝ\ËœÚÚ[\×ØNM
JK\Ë˜Ý\”ÚÚ[[™›×ØNM
JK\Ë›™^ÚÚ[[™›×ØNM
J_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚ×ØNM
_KKœ›ÝÝ\KœÚÚ[\×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]ÙX\ÛœË™Ù]ÝZ]ÛÛ™šYÐžRY
\ËÙX\Û’Y
NÙ_
OQÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]Ý\ËÙX\Û’YVÌJK\ËœÚÚ[XÛÛ‹™]O^ÚXÛÛŽ™KœÚÚ[XÛÛŸK\ËœÚÚ[˜[YK^YKœÚÚ[˜[Y_KKœ›ÝÝ\K˜Ý\”ÚÚ[[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]ÙX\ÛœË™Ù]ÝZ]ÛÛ™šYÐžRY
\ËÙX\Û’Y
NÙ_
OQÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[ÝZ]Ý\ËÙX\Û’YVÌJNÙ›ÜŠ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[Ý\ËÙX\Û’YKÏHˆ‹LÏLÛÏK˜XÝÛÛ™›[™ÝÛÊÊÊ^Ý˜\ˆOZK˜XÝÛÛ™Û×K]ÙX\ÛœË™Ù][™›Ó]™[žRY
JKQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖØWVÌK›˜[YNÜ‰‰œYK›]™[ÊÊÏHŸÎŒŽPPI•ˆŠÚ
ÈŸ‹ŠÊÊNœÊÏHŸÎˆŠÐÛÛÜ•][‘ÔVWÐÓÓÔŒŠÈ‰•ˆŠÚ
ÈŸŸ]\Ë›[L^H»ï"ŠÛŠÈ‹ÈŠÚK˜XÝÛÛ™›[™Ý
È»ï"H‹\Ëš[™›Ü›X][Û›˜[YL^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊÊK\Ë™\ØÌ^]\Ë™Ù]ÚÚ[\ØÐÛÛ™šY×ØNM
J_KKœ›ÝÝ\K›™^ÚÚ[[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]ÙX\ÛœË™Ù]™^ÝZ]ÛÛ™šYÐžRY
\ËÙX\Û’Y
NÚYŠYJ\™]\›ˆ\Ë›˜[YLK^H•8näZH1$H‹\Ë›[LKš\ÚX›OHLK\Ë›™^\ØÌKš\ÚX›OHLK\Ëš[™›Ü›X][Û›˜[YLKš\ÚX›OHLK›ÚY
\Ë›™\ØÌš\ÚX›OHLJNÙ›ÜŠ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[Ý\ËÙX\Û’YKÏHˆ‹LÏLÛÏK˜XÝÛÛ™›[™ÝÛÊÊÊ^Ý˜\ˆOZK˜XÝÛÛ™Û×K]ÙX\ÛœË™Ù][™›Ó]™[žRY
JKQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÜÖØWVÌK›˜[YNÜYK›]™[ÊÊÏHŸÎŒŽPPI•ˆŠÚ
ÈŸ‹ŠÊÊNœÊÏHŸÎˆŠÐÛÛÜ•][‘ÔVWÐÓÓÔŒŠÈ‰•ˆŠÚ
ÈŸŸ]\Ë›[LK^H»ï"ŠÛŠÈ‹ÈŠÚK˜XÝÛÛ™›[™Ý
È»ï"H‹\Ëš[™›Ü›X][Û›˜[YLK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJÊK\Ë›™\ØÌ^]\Ë™Ù]ÚÚ[\ØÐÛÛ™šY×ØNM
JNÝ˜\ˆ]\Ë›™^\ØÌK^Ï[œÜ]
–ŠKOXÖÌKXÖÌWK]JÊˆŠÙK›]™[
JÜÝ\Ë›™^\ØÌK^YKKœ›ÝÝ\K™Ù]ÚÚ[\ØÐÛÛ™šY×ØNMY[˜Ý[ÛŠ
^Ü™]\›ˆœÚÚ[\ØßKKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ÙX\Û”ÛÝ[ÚÚ[\ÕšY]Ëœ›ÝÝ\K•ÙX\Û”ÛÝ[ÚÚ[\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÙX\Û”ÛÝ[ÚÚ[\ÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆÙX\Û•šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK—ØÝ\”›ÛOLK›\ÝLKš\ÕÝXÚ™YÚ[HLKKžš[“[™Ò][UÚYMÌKš\Ó[Ýš[™ÏHLKK˜Ý\’[™^OLK˜Ý\’[™^LKš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜ÛÜÙTÛÝ[ÛÛ™][Û—ØNMY[˜Ý[ÛŠ
^Ý\Ë››Ü›X[š\ÚX›O]\ËœÛÝ[š\ÚX›OH]KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë›Y‹\Ë›Û‘]™[ÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËœšYÚ‹\Ë›Û‘]™[ÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜XÝ]™K\Ë›Û‘]™[ÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë\›‹\Ë›Û‘]™[ÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜˜XÚÐ‹\Ë›Û‘]™[ÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë›YŒ\Ë›Û‘]™[ÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËœšYÚŒ\Ë›Û‘]™[ÛXÚÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë›\ÝK\Ë›ÛÛXÚÊK\Ëœ™[[Ý™SØœÙ\™J
KšY]ÓYÜ‹š[œÊ
K™Ù]šY]Ê›Ü™ÙUÚ[ŠKš\Ó›Ý[Ý™OHLK\Ë˜Ý\’[™^OL\Ë˜Ý\’[™^LKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÕšY]ÓYÜ‹š[œÊ
K™Ù]šY]Ê›Ü™ÙUÚ[ŠKš\Ó›Ý[Ý™OHL\Ëœ›ÛRY]ÌK\Ë˜Ý\’[™^OL\Ë˜Ý\’[™^L\Ë˜YÝXÚ]™[
\Ë›Y‹\Ë›Û‘]™[ÛXÚÊK\Ë˜YÝXÚ]™[
\ËœšYÚ‹\Ë›Û‘]™[ÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜XÝ]™K\Ë›Û‘]™[ÛXÚÊK\Ë˜YÝXÚ]™[
\Ë\›‹\Ë›Û‘]™[ÛXÚÊK\Ë˜YÝXÚ]™[
\Ë˜˜XÚÐ‹\Ë›Û‘]™[ÛXÚÊK\Ë˜YÝXÚ]™[
\Ë›YŒ\Ë›Û‘]™[ÛXÚÊK\Ë˜YÝXÚ]™[
\ËœšYÚŒ\Ë›Û‘]™[ÛXÚÊK\Ë˜YÝXÚ]™[
\Ë›\ÝK\Ë›ÛÛXÚÊK\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÐXÝ™\Ý[\Ë˜Ø[˜XÚ×ØNM
K\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÕ\ÙSÜ\˜]K\Ë˜Ø[˜XÚ×ØNM
K\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÕ\]™[™\Ý[\Ë˜Ø[˜XÚ×ØNM
K\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÑ›^X›PXÝ™\Ý[\Ë˜Ø[˜XÚ×ØNM
K\Ë›ØœÙ\™JÙX\ÛœËš[œÊ
KœÜÝÙX\ÛœÑ›^X›PÛÝ[™\Ý[\Ë˜Ø[˜XÚ×ØNM
K\Ë›\ÝKš][T™[™\™\UÙX\Û“\Ý][T™[™\‹\Ë›\Ýš][T™[™\™\UÙX\Û“\Ý][T™[™\‹\Ë›Y‹œ\™[ÝXÚ[˜X›YHLK\ËÙX\Û’YLK\ËÙX\Û‘›^X›OL\Ë˜ÛÜÙTÛÝ[ÛÛ™][Û—ØNM
ÌWJK\Ë\]P—ØNM

K\Ëš[š]
\ËÙX\Û’Y
K\Ë˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÐ‘QÒS‹\Ë›Û“[Ý™WØNM\ÊK\Ë˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÑS‘\Ë›Û“[Ý™WØNM\Ê_KKœ›ÝÝ\K›Û“[Ý™WØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\J^ØØ\ÙHYÜ™]•ÝXÚ]™[•ÕPÒÐ‘QÒSŽ\Ë›\Ý]œÝYÙV\Ëš\ÕÝXÚ™YÚ[HLØœ™XZÎØØ\ÙHYÜ™]•ÝXÚ]™[•ÕPÒÑS‘šYŠ]\Ëš\ÕÝXÚ™YÚ[ŠXœ™XZÎÝ\Ëš\ÕÝXÚ™YÚ[HLNÝ˜\ˆO]›ÚYÝ\Ë›\Ý]œÝYÙVLLÊOLK\Ë˜Ú[™ÙT›ÛWØNM
JJN\Ë›\Ý]œÝYÙVKLL	‰ŠOKLK\Ë˜Ú[™ÙT›ÛWØNM
JJ__KKœ›ÝÝ\K˜Ú[™ÙT›ÛWØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÚYŠ]\Ëš\Ó[Ýš[™Ê^ÚYŠ\Ëš\ÔÚÝÔÛÝ[

J^ÚYŠ\Ë›\ÝœØÜ›ÛL	‰Œ
\™]\›ŽÚYŠ\Ë›\ÝœØÜ›ÛJ\Ë›\Ý™]T›ÝšY\‹›[™ÝLJJ\Ëžš[“[™Ò][UÚY	‰Œ
\™]\›ŽÝ˜\ˆO]\Ë›\ÝœØÜ›Û
Ý
\Ëžš[“[™Ò][UÚYÝ\Ë˜Ý\’[™^ŠÏ]Ý˜\ˆÏYYÜ™]”ØÜ›ÛÙY[‹™Ù]
\Ë›\Ý
NÝ\Ëš\Ó[Ýš[™ÏHLËÊÜØÜ›Ûš_KŒ
K˜Ø[
[˜Ý[ÛŠ
^ÙKš\Ó[Ýš[™ÏHL_JK\Ë›Û”ÛÝ[ÛXÚ×ØNM

_Y[Ù^ÚYŠ\Ë›\ÝKœØÜ›ÛL	‰Œ
\™]\›ŽÚYŠ\Ë›\ÝKœØÜ›ÛJ\Ë›\ÝK™]T›ÝšY\‹›[™ÝLJJ\Ëžš[“[™Ò][UÚY	‰Œ
\™]\›ŽÝ˜\ˆO]\Ë›\ÝKœØÜ›Û
Ý
\Ëžš[“[™Ò][UÚYÝ\Ë˜Ý\’[™^JÏ]Ý˜\ˆÏYYÜ™]”ØÜ›ÛÙY[‹™Ù]
\Ë›\ÝJNÝ\Ëš\Ó[Ýš[™ÏHLËÊÜØÜ›Ûš_KŒ
K˜Ø[
[˜Ý[ÛŠ
^ÙKš\Ó[Ýš[™ÏHL_J_]\Ë›ÛÛ\\Ý

__KKœ›ÝÝ\K\]P—ØNMY[˜Ý[ÛŠ
^Ý\Ë\›‹š\ÚX›OHLKKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\ËœÛÝ[\œV×K\Ë›\Ý]OV×K\Ë™]P\œ[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ\Ë›\Ý]JNÝ˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[
^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[ÚWKYKÙX\ÛœË™Ù]ÛÝ[[™›Ñ]J
VÜËšYKÏYKÙX\ÛœË™Ù]ÝZ]ÛÛ™šYÐžRY
ËšY
KO^Ú\Ý\ÙN™KÙX\ÛœËÙX\ÛœÒYO\ËšYÈLˆLKY›‰‰›‹šY	‰›ÏÛËšYŒ\Ô™YÚ[™KÙX\ÛœË™Ù]™YÚ[žTÝZ]
ËšY
K]™[›‰‰›‹šY	‰›ÏÛË›]™[Œ\ÔÙ[XÝšOO]ÔÝš[™Ê
OÈLˆLKÚÝÒYœËšY›ØŽ™Kš›Ø‹ÚÝÓ˜[YNˆLNÝ\Ë›\Ý]Kœ\Ú
JK‰‰›‹šY	‰›É‰\ËœÛÝ[\œ‹œ\Ú
J_]\Ë\]URR[™›×ØNM

K\Ë›\ÝK™]T›ÝšY\]\Ë™]P\œ‹\Ë›\ÝKœØÜ›ÛL\Ë›ÛÚ[™ÙP—ØNM

K\Ë\]TÛÝ[šY]×ØNM
\ËœÛÝ[\œ‹L
K\Ë\]T™YÚ[

K\Ë™Ù]”Ý]WØNM

_KKœ›ÝÝ\KœÙ]Ù[XÝYY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOLÙO\Ë›\Ý]K›[™ÝÙJÊÊ^Ý˜\ˆO]\Ë›\Ý]VÙWNÚKš\ÔÙ[XÝYOO]ÈLˆL_]\Ë™]P\œ‹œ™\XÙP[
\Ë›\Ý]JK\Ë›\ÝK™]T›ÝšY\]\Ë™]P\œŸKKœ›ÝÝ\K›Û”ÛÝ[ÛXÚ×ØNMY[˜Ý[ÛŠ
^ÚYŠ\ËœÛÝ[\œ‹›[™Ý
^Ý˜\ˆ]\ËœÛÝ[\œ–Ý\Ë˜Ý\’[™^—NÚYŠšY
^Ý˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KOYKÙX\ÛœË™Ù]›^X›Q]J
KÏYKÙX\ÛœË™Ù]ÝZ]ÛÛ™šYÐžRY
šY
NÜÏÊš\Ý\ÙOÝ\Ë˜XÝ]™Kš\ÚX›OHL\Ë˜XÝ]™Kš\ÚX›OYKÙX\ÛœË™›^X›PÛÝ[ZK›[™ÝÈLNˆL\ËÙX\Û‘›^X›O\ËšY\ËœÚÚ[XÛÛŒ™]O^ÚXÛÛŽœËœÚÚ[XÛÛŸK\ËœÚÚ[^\ËœÚÚ[\ØË\ËœÚÚ[˜[YL^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJËœÚÚ[˜[YJJN\ËÙX\Û‘›^X›OLš\Ý\ÙOÊ\Ë˜XÝ]™K›X™[H’8néÞH‹\ËœÚÚ[^ÛÛÜLMÍÍŽMŒ\Ëœ™YÚ[š\ÚX›OHLJNŠ\Ë˜XÝ]™K›X™[H’ðëXÚøn¨]‹\ËœÚÚ[^ÛÛÜMŒN\Ëœ™YÚ[š\ÚX›OYKÙX\ÛœË™›^X›PÛÝ[ZK›[™ÝÈLNˆL
___KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^Ý˜\ˆO]˜Ý\œ™[\™Ù]œÙ[XÝY[™^ÙOYOŒÙNŒ\Ë›\Ý]VÙWI‰Š\ËÙX\Û’Y]\Ë›\Ý]VÙWKœÚÝÒY\ËœÙ]Ù[XÝY
JKšY]ÓYÜ‹š[œÊ
K›Ü[ŠÙX\Û”[™[\Ëœ›ÛRY\ËÙX\Û’Y
JK\Ë›ÛÚ[™ÙP—ØNM

_KKœ›ÝÝ\K›ÛÚ[™ÙP—ØNMY[˜Ý[ÛŠ
^Ý\Ë›Y‹š\ÚX›OLO]\Ë˜Ý\’[™^K\ËœšYÚ‹š\ÚX›O]\Ë˜Ý\’[™^HO]\Ë›\ÝK™]T›ÝšY\‹›[™ÝLK\Ëœ™YSYš\ÚX›O]\Ë˜ÚXÚÓY™YÚ[ØNM

K\Ëœ™YTšYÚš\ÚX›O]\Ë˜ÚXÚÔšYÚ™YÚ[ØNM

_KKœ›ÝÝ\K˜ÚXÚÔšYÚ™YÚ[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆHLNÚYŠ\Ë˜Ý\’[™^O\Ë™]P\œ‹›[™Ý
Y›ÜŠ˜\ˆO]\Ë˜Ý\’[™^JÌNÙO\Ë™]P\œ‹›[™ÝÙJÊÊZYŠOO]\Ë™]P\œ‹œÛÝ\˜ÙVÙWKš\Ô™YÚ[
^ÝHLØœ™XZß\™]\›ˆKKœ›ÝÝ\K˜ÚXÚÓY™YÚ[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆHLNÚYŠ\Ë˜Ý\’[™^OŒ
Y›ÜŠ˜\ˆO]\Ë˜Ý\’[™^KLNÙOLÙKKJZYŠOO]\Ë™]P\œ‹œÛÝ\˜ÙVÙWKš\Ô™YÚ[
^ÝHLØœ™XZß\™]\›ˆKKœ›ÝÝ\K™Ù]”Ý]WØNMY[˜Ý[ÛŠ
^ÚYŠ\Ë››Ý[™Õ\Ëš\ÚX›J\™]\›ˆ\Ë›YŒš\ÚX›OHLK›ÚY
\ËœšYÚŒš\ÚX›OHLJNÝ˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÜ™]\›ˆ	‰\ËœÛÝ[\œ‹›[™ÝLOÊ\Ë›YŒš\ÚX›OHLK›ÚY
\ËœšYÚŒš\ÚX›OHLJJNŠ\Ë›YŒš\ÚX›OLO]\Ë˜Ý\’[™^‹›ÚY
\ËœšYÚŒš\ÚX›O]\Ë˜Ý\’[™^ˆO]\Ë›\Ý™]T›ÝšY\‹›[™ÝLJJ_KKœ›ÝÝ\K›ÛÛ\\ÝY[˜Ý[ÛŠ
^Ý\Ëš\ÔÚÝÔÛÝ[

OÊ\Ë™Ù]”Ý]WØNM

K\Ë›\ÝœØÜ›ÛLÝ\Ë›\ÝœØÜ›ÛL\Ë›\ÝœØÜ›ÛJ\Ë›\Ý™]T›ÝšY\‹›[™ÝLŠJ\Ëžš[“[™Ò][UÚY	‰Š\Ë›\ÝœØÜ›Û]\Ë›\Ý™]T›ÝšY\‹›[™Ý
\Ëžš[“[™Ò][UÚY
JNŠ\Ë›ÛÚ[™ÙP—ØNM

K\Ë›\ÝKœØÜ›ÛLÝ\Ë›\ÝKœØÜ›ÛL\Ë›\ÝKœØÜ›ÛJ\Ë›\ÝK™]T›ÝšY\‹›[™ÝLŠJ\Ëžš[“[™Ò][UÚY	‰Š\Ë›\ÝKœØÜ›Û]\Ë›\ÝK™]T›ÝšY\‹›[™Ý
\Ëžš[“[™Ò][UÚY
J_KKœ›ÝÝ\K›Û‘]™[ÛXÚÏY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë›YŽ\Ë˜Ú[™ÙT›ÛWØNM
LJNØœ™XZÎØØ\ÙH\ËœšYÚŽ\Ë˜Ú[™ÙT›ÛWØNM
JNØœ™XZÎØØ\ÙH\Ë›YŒ\Ë˜Ú[™ÙT›ÛWØNM
LJNØœ™XZÎØØ\ÙH\ËœšYÚŒ\Ë˜Ú[™ÙT›ÛWØNM
JNØœ™XZÎØØ\ÙH\Ë˜XÝ]™NšYŠ’ðëXÚøn¨]O]\Ë˜XÝ]™K›X™[
^Ý˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KOYKÙX\ÛœË™Ù]›^X›Q]J
NÚYŠKÙX\ÛœË™›^X›PÛÝ[ZK›[™Ý
\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÐÙ[\•\Ê’xnáÛˆ1$pèÈðëXÚøn¨]ŠÙKÙX\ÛœË™›^X›PÛÝ[
ÈˆønîH± Û™Èpê›ˆÝ[™Ë0èÞH8néÞH¸næÝHðèZHŠNÚYŠ]\ËÙX\Û‘›^X›J\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÐÙ[\•\Ê‘8nëÈxnáÝHðëXÚøn¨]pê›ˆÝ[™ÈÚH[š¸nâÈ8nåÚHŠNÝ\Ëš\ÔÙ[™XÝ›^HLÙX\ÛœËš[œÊ
KœÙ[™ÙX\ÛœÑ›^X›PXÝ[™›Ê\Ëœ›ÛRYÙX\Û‘›^˜XÝ\ËÙX\Û‘›^X›J_Y[ÙHYŠ’8néÞHO]\Ë˜XÝ]™K›X™[
^ÚYŠ]\ËÙX\Û‘›^X›J\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÐÙ[\•\Ê‘8nëÈxnáÝH8néÞHpê›ˆÝ[™ÈÚH[š¸nâÈ8nåÚHŠNÝ\Ëš\ÔÙ[™XÝ›^HLÙX\ÛœËš[œÊ
KœÙ[™ÙX\ÛœÑ›^X›PXÝ[™›Ê\Ëœ›ÛRYÙX\Û‘›^˜Ø[˜Ù[\ËÙX\Û‘›^X›J_Xœ™XZÎØØ\ÙH\Ë\›Ž\Ë˜ÛÜÙJ
K\Ë›Ü[Š\Ëœ›ÛRYLJNÝ˜\ˆÏUšY]ÓYÜ‹š[œÊ
K™Ù]šY]Ê›Ü™ÙUÚ[ŠNÜÉ‰œËœ™YÚ[^

NÝ˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[˜\ÙKš][ZY
KÏTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÛ‰‰›ËÙX\ÛœË™›^X›PÛÝ[LOÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[˜\ÙK›X^][S[I‰•šY]ÓYÜ‹š[œÊ
K›Ü[Š›ÛPÚÛÜÙR][UšY]Ë\Ëœ›ÛRY
NØœ™XZÎØØ\ÙH\Ë˜˜XÚÐŽšYŠU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[˜\ÙKš][ZY
J\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê•›Û™È0îšH1$xnäÈÚ0í™ÈðìÈpê›ˆÝ[™ÈÚH[šŠNÕšY]ÓYÜ‹š[œÊ
K›Ü[Š›ÛPÚÛÜÙR][UšY]Ë\Ëœ›ÛRY
NØœ™XZÎØØ\ÙH\Ë›\ÝNŸ]\Ë›ÛÚ[™ÙP—ØNM

K\Ë™Ù]”Ý]WØNM

_KKœ›ÝÝ\K\]URR[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÝ\ËœÝÙ\”[™[œÙ]ÝÙ\Š™Ù]ÙX\Û•Ý[ÝÙ\Š
JNÂ˜\ˆOVÍ‹‹WKOVÌKÏHLK]ÙX\ÛœË™Ù][™›Ñ]J
NÙ›ÜŠ˜\ˆÈ[ˆŠ^Ý˜\ˆO[–Û×NÙ›ÜŠ˜\ˆˆ[ˆJY›ÜŠ˜\ˆXVÜ—KLÛ˜]‹›[™ÝÛ
ÊÊ^Ý˜\ˆÏZ˜]–ÛNÚYŠLHOYKš[™^ÙŠË\JJY›ÜŠ˜\ˆOLÝOK›[™ÝÝJÊÊYVÝWOOXË\I‰ŠVÝWJÏXË˜[YKÏHL
__]˜\ˆ]ÙX\ÛœË™›^X›PÛÝ[ÝÙX\ÛœË™›^X›PÛÝ[LNŒQÛØ˜[ÛÛ™šYË•ÙX\Û”ÛÝ[][P]–ÜNÚYŠÉ‰™
Y›ÜŠ˜\ˆÏLÙÏ˜]‹›[™ÝÙÊÊÊZYŠLHOYKš[™^ÙŠ˜]–Ù×K\JJY›ÜŠ˜\ˆOLÝOK›[™ÝÝJÊÊYVÝWOOY˜]–Ù×K\I‰ŠVÝWJÏY˜]–Ù×K˜[YJNÙ›ÜŠ˜\ˆÏLÍ™ÎÙÊÊÊZYŠ\ÖÈ˜]ˆŠÙ×J^Ý˜\ˆP]šX]Q]K™Ù]]”ÝžU\JVÙ×JNÝ\ÖÈ˜]ˆŠÙ×K^YŠÈŠÈŠÚVÙ×__KKœ›ÝÝ\K˜Ø[˜XÚ×ØNMY[˜Ý[ÛŠ
^Ý\ËœÛÝ[\œV×NÝ˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KO]ÙX\ÛœË™Ù]ÝZ]ÛÛ™šYÐžRY
\ËÙX\Û’Y
NÙ›ÜŠ˜\ˆH[ˆ\Ë›\Ý]J^Ý˜\ˆÏ]ÙX\ÛœË™Ù]ÛÝ[[™›Ñ]J
VÝ\Ë›\Ý]VÚWKœÚÝÒYK]\Ë›\Ý]VÚWNÛ‹œÚÝÒYO]\ËÙX\Û’YÊ‹š\Ý\ÙO]ÙX\ÛœËÙX\ÛœÒYO]\ËÙX\Û’YÈLˆLK‹šY\É‰œËšY	‰™OÙKšYŒ‹š\Ô™YÚ[]ÙX\ÛœË™Ù]™YÚ[žTÝZ]
‹œÚÝÒY
K‹›]™[\É‰œËšY	‰™OÙK›]™[Œ‹š\ÔÙ[XÝHL‹œÚÝÒY[‹œÚÝÒY
NŠ‹š\Ô™YÚ[]ÙX\ÛœË™Ù]™YÚ[žTÝZ]
‹œÚÝÒY
K‹š\ÔÙ[XÝHLK‹š\Ý\ÙO[‹œÚÝÒYO]ÙX\ÛœËÙX\ÛœÒY
KÉ‰œËšY	‰™I‰\ËœÛÝ[\œ‹œ\Ú
Š_]\Ë\]URR[™›×ØNM

K\Ë™]P\œ‹œ™\XÙP[
\Ë›\Ý]JK\Ë›\ÝK™]T›ÝšY\]\Ë™]P\œ‹\Ë\]TÛÝ[šY]×ØNM
\ËœÛÝ[\œ‹L\ËÙX\Û‘›^X›JK\Ë\]PXÝX™[ØNM

K\Ë\]T™YÚ[

K\Ë›Û”ÛÝ[ÛXÚ×ØNM

K\Ë™Ù]”Ý]WØNM

_KKœ›ÝÝ\K\]TÛÝ[šY]×ØNMY[˜Ý[ÛŠKJ^Ý˜\ˆÏ]\ËTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÚYŠ\ËœÛÝ[\œV×K‹ÙX\ÛœË™›^X›PÛÝ[
Y›ÜŠ˜\ˆÏLÛÏ›[™ÝÛÊÊÊ^Ý˜\ˆO^Ú\Ý\ÙN•ÙX\ÛœËš[œÊ
K˜ÚXÚÒ\Õ\ÙQ›^X›J‹š[™^Û×KšY
KYÛ×KšY\Ô™YÚ[‘›Ü™ÙT™YÚ[š[œÊ
K™Ù]›^X›T™YÚ[Û›J‹š[™^Û×KœÚÝÒY
K]™[Û×K›]™[\ÔÙ[XÝÛ×Kš\ÔÙ[XÝÚÝÒYÛ×KœÚÝÒY›ØŽÛ×Kš›Ø‹ÚÝÓ˜[YNˆL_NÝ\ËœÛÝ[\œ‹œ\Ú
J_]\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ\ËœÛÝ[\œŠNÝ˜\ˆ]\Ë˜Ý\’[™^Š\Ëžš[“[™Ò][UÚYYYÜ™]”ØÜ›ÛÙY[‹™Ù]
\Ë›\Ý
NÚÊÜØÜ›ÛœŸKŒ
K˜Ø[
[˜Ý[ÛŠ
^ÜËš\Ó[Ýš[™ÏHL_JNÝ˜\ˆ[‹ÙX\ÛœË™›^X›PÛÝ[Û‹ÙX\ÛœË™›^X›PÛÝ[LNŒÚYŠ\Ë™\ØË^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸÎŒ™™™™™‰•’xnáÛˆ1$pèÈ0î[™ÈÎŒ™Œ‰•ˆŠÛ
ÈŸÎŒ™™™™™‰•ˆpê›ˆÝ[™ÈÚH[š8näZH1$XHðìÈ8nàÈðëXÚøn¨]1$xnäÛ™È8nçZHÎŒ™Œ‰•ˆŠÊ
ÌJJÈŸÎŒ™™™™™‰•ˆxnáÝH8nê[™ÈønîH± Û™Èpê›ˆÝ[™ÈŠKJ^ÚYŠ\ËœÛÝ[\œ‹›[™ÝŒ	‰›‹ÙX\ÛœË™›^X›PÛÝ[
^Ý\Ë˜XÝ]™Kš\ÚX›O]\ËœÚÚ[XÛÛŒš\ÚX›O]\ËœÚÚ[š\ÚX›O]\ËœÚÚ[˜[YLš\ÚX›OHLÝ˜\ˆÏZOÚN\ËœÛÝ[\œ–ÌKšYÚYŠXÊ\™]\›ŽÝ˜\ˆO[‹ÙX\ÛœË™Ù]ÝZ]ÛÛ™šYÐžRY
ÊNÚYŠJ^Ý˜\ˆHˆŽÝ\ËœÛÝ[\œ–ÌKš\Ý\ÙI‰ŠHŸÎŒNŽ	•ˆŠK\ËœÚÚ[XÛÛŒ™]O^ÚXÛÛŽKœÚÚ[XÛÛŸK\ËœÚÚ[^]KœÚÚ[\ØË\ËœÚÚ[˜[YL^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJKœÚÚ[˜[YJ_ZYŠ\Ë›YŒš\ÚX›O]\ËœšYÚŒš\ÚX›OHLK\ËœÛÝ[\œ‹›[™ÝŒÉ‰Š\ËœšYÚŒš\ÚX›OHL
K\ËœÛÝ[\œ–ÌKš\Ý\ÙJ]\Ë˜XÝ]™K›X™[H’8néÞH‹\Ëœ™YÚ[š\ÚX›OHLNÙ[Ù^Ý\Ë˜XÝ]™K›X™[H’ðëXÚøn¨]ŽÝ˜\ˆ[‹ÙX\ÛœË™Ù]›^X›Q]J
NÝ\Ë˜XÝ]™Kš\ÚX›O]\Ëœ™YÚ[š\ÚX›O[‹ÙX\ÛœË™›^X›PÛÝ[Y›[™ÝÈLNˆL]\ËÙX\Û‘›^X›O]\ËœÛÝ[\œ–ÌKœÚÝÒYY[ÙH\Ëœ™YÚ[š\ÚX›OHLK\Ë›YŒš\ÚX›O]\ËœšYÚŒš\ÚX›OHLK\Ë˜XÝ]™Kš\ÚX›O]\ËœÚÚ[XÛÛŒš\ÚX›O]\ËœÚÚ[š\ÚX›O]\ËœÚÚ[˜[YLš\ÚX›OHLNÝ\Ë››Ý[™Õ\Ëš\ÚX›OH]\ËœÚÚ[XÛÛŒš\ÚX›K\Ë››Ý[™ÝYKš\ÚX›OH]\ËœÚÚ[XÛÛŒš\ÚX›K\Ë›[™ÜÚÚ[š\ÚX›O]\ËœÚÚ[XÛÛŒš\ÚX›K\Ë››Ý[™Õ\Ëš\ÚX›I‰Š‹ÙX\ÛœË™›^X›PÛÝ[Ý\Ë››Ý[™Õ\Ë^H’xnáÛˆÚ1¬HðëXÚøn¨]pê›ˆÝ[™È°èÈŽ\Ë››Ý[™Õ\Ë^H“š0è›ˆ¸n«]°èHÚ1¬HønëH8né[™Èpê›ˆÝ[™ÈÚH[šŠ__KKœ›ÝÝ\K\]PXÝX™[ØNMY[˜Ý[ÛŠ
^ÚYŠ]\Ëš\ÔÙ[™XÝ›^
\™]\›ˆ›ÚY
\Ëš\ÔÙ[™XÝ›^HLJNÝ˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
KO]ÙX\ÛœË™Ù]›^X›Q]J
NÝ\Ëš\ÔÙ[™XÝ›^HLNÝ\ËœÚÚ[^È’ðëXÚøn¨]O]\Ë˜XÝ]™K›X™[Ê\Ë˜XÝ]™K›X™[H’8néÞH‹\Ëœ™YÚ[š\ÚX›OHLJNˆ’8néÞHO]\Ë˜XÝ]™K›X™[	‰Š\Ë˜XÝ]™K›X™[H’ðëXÚøn¨]‹\Ëœ™YÚ[š\ÚX›O]ÙX\ÛœË™›^X›PÛÝ[YK›[™ÝÈLNˆL
_KKœ›ÝÝ\K™\ÝÜžUšY]×ØNMY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K™\ÝÜžUšY]×ØNM˜Ø[
\Ê_KKœ›ÝÝ\Kš\ÔÚÝÔÛÝ[Y[˜Ý[ÛŠ
^Ü™]\›ˆ\ËœÛÝ[Ý\ËœÛÝ[š\ÚX›NˆL_KKœ›ÝÝ\K\]T™YÚ[Y[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[˜\ÙKš][ZY
KOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ëœ›ÛRY
NÝ\Ëœ™YÚ[š\ÚX›OQ›Ü™ÙT™YÚ[š[œÊ
K™Ù]›^X›T™YÚ[
\Ëœ›ÛRY
_	‰™KÙX\ÛœË™›^X›PÛÝ[LOÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[˜\ÙK›X^][S[OÈLˆLK\Ë˜˜XÚÐ‹š\ÚX›O]\Ëœ™YÚ[Kš\ÚX›O]	‰™KÙX\ÛœË™›^X›PÛÝ[LOÛØ˜[ÛÛ™šYËÛÛ™šYÕÙX\Û”ÛÝ[˜\ÙK›X^][S[OÈLˆL_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ÙX\Û•šY]Ëœ›ÝÝ\K•ÙX\Û•šY]ÈŠKÚ[™ÝË•ÙX\Û•šY]ÏUÙX\Û•šY]ÎÝ˜\ˆÚ[™Ñ™Z\Ú[™Õ\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK—ØÝ\”›ÛOLKœÚÚ[“˜[YOHÚ[™Ñ™Z\Ú[™Õ\È‹Kš\ÕÜ]™[HLKœÝÙ\”[™[˜š]\OHž›[L‹KœÝÙ\”[™[œÙ]XÕš\ÚX›JLJK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë—ØÝ\”›ÛO]ÌK\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ëš][PÚ[™ÙQ]™[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ëš][PÚ[™ÙQ]™[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\Ëš][PÚ[™ÙQ]™[ØNM
K\Ë›ØœÙ\™JÚ[™Ëš[œÊ
KœÜÝ\ÙQ[”ÝXØÙ\ÜË\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™JÚ[™Ëš[œÊ
KœÜÝÚ[™Õ\Ü˜YK\Ë\]UšY]×ØNM
K\Ë˜YÝXÚ]™[
\Ë\Ë›ÛÛXÚ×ØNM
K\Ë\]UšY]×ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™SØœÙ\™J
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›ÛÛXÚ×ØNM
_KKœ›ÝÝ\K\]UšY]×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—ØÝ\”›ÛJKOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™Ó]™[ÝÚ[™ÜÑ]K›—NÝ\ËÚ[™Ó˜[YK^YK›˜[YK\Ë™™Z\Ú[™Ó‹^Høn©\ŠÝÚ[™ÜÑ]K™›U\[ŠÈˆ‹\Ë˜Ø\™Y\‹^T›ÛK™Ù]›Ø“˜[YPžR›ØŠš›ØŠNÝ˜\ˆOYK™›T[ÚYŠÚ[™ÜÑ]K™›U\[ZJ]\Ë˜Ý\œ™[Ý]OH›X^ˆŽÙ[Ù^Ý˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹™›T[Y
K\ÏÜË˜ÛÝ[ŒÛÝ\Ë˜Ý\œ™[Ý]OH››Ü›X[Ž\Ë˜Ý\œ™[Ý]OH››Ú][HŸ]\Ë\]P]œÒ[™›×ØNM

_KKœ›ÝÝ\K\]P]œÒ[™›×ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—ØÝ\”›ÛJKOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™Ó]™[ÙKÚ[™ÜÑ]K›—KÏZK˜]‹›[™ÝQÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹™›T[]‹Ï[‹›[™ÝOV×KLNÍ\ŽÜŠÊÊ^ÚYŠ\ÖÈ˜]ˆŠÜ—K^Hˆ‹\ÖÈ˜]ˆŠÜŠÈ“™^ˆ—K^Hˆ‹Ï\Š^ÝZK˜]–Ü‹LWNÝ˜\ˆHˆ
ÈŠÓX]™›ÛÜŠÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹™›T[ÌL
J™KÚ[™ÜÑ]K™›U\[ŠÈ‰HŽÚYŠ\ÖÈ˜]ˆŠÜ—K^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ]šX]Q]K™Ù]]”ÝžU\J\JJÈŽˆŠÊŸÎŒ‘Œ	•ˆŠÚ
ÈŸŠJK››Ü›X[O]\Ë˜Ý\œ™[Ý]J^Ý˜\ˆHˆ
ÈŠÓX]™›ÛÜŠÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹™›T[ÌL
JŠKÚ[™ÜÑ]K™›U\[ŠÌJJÈ‰HŽÝ\ÖÈ˜]ˆŠÜŠÈ“™^ˆ—K^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊŸÎŒ‘Œ	•ˆŠÛ
ÈŸŠ_XKœ\Ú
™]È]šX]Q]J\KX]™›ÛÜŠ˜[YJ‘ÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹™›T[ÌYM
™KÚ[™ÜÑ]K™›U\[ŠJJ_ZYŠ\ÖÈ˜]ˆŠÊŠÍ
WK^Hˆ‹\ÖÈ˜]ˆŠÊŠÍ
JÈ“™^ˆ—K^Hˆ‹Ï\Š^Ý[–Ü‹LWNÝ˜\ˆHˆ
ÈŠÝ˜[YJ™KÚ[™ÜÑ]K™›U\[ŽÚYŠ\ÖÈ˜]ˆŠÊŠÍ
WK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ]šX]Q]K™Ù]]”ÝžU\J\JJÈŽˆŠÊŸÎŒ‘Œ	•ˆŠÚ
ÈŸŠJK››Ü›X[O]\Ë˜Ý\œ™[Ý]J^Ý˜\ˆÏHˆ
ÈŠÝ˜[YJŠKÚ[™ÜÑ]K™›U\[ŠÌJNÝ\ÖÈ˜]ˆŠÊŠÍ
JÈ“™^ˆ—K^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊŸÎŒ‘Œ	•ˆŠØÊÈŸŠ_XKœ\Ú
™]È]šX]Q]J\K˜[YJ™KÚ[™ÜÑ]K™›U\[ŠJ__]\ËœÝÙ\”[™[œÙ]ÝÙ\Š\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠJJ_KKœ›ÝÝ\Kš][PÚ[™ÙQ]™[ØNMY[˜Ý[ÛŠ
^ÚYŠ›X^ˆˆO]\Ë˜Ý\œ™[Ý]J^Ý˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹™›T[Y
KOYOÙK˜ÛÝ[ŒÚOÊH››Ü›X[ˆO]\Ë˜Ý\œ™[Ý]K\Ë˜Ý\œ™[Ý]OH››Ü›X[ŠNŠH››Ú][HˆO]\Ë˜Ý\œ™[Ý]K\Ë˜Ý\œ™[Ý]OH››Ú][HŠK	‰\Ë\]P]œÒ[™›×ØNM

__KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë\]PŽ•Ú[™Ëš[œÊ
KœÙ[™\ÙQ[Š\Ë—ØÝ\”›ÛKJ__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ú[™Ñ™Z\Ú[™Õ\ÕšY]Ëœ›ÝÝ\K•Ú[™Ñ™Z\Ú[™Õ\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÚ[™Ñ™Z\Ú[™Õ\ÕšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆÚ[™Öš^šU\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK—ØÝ\”›ÛOLKœÚÚ[“˜[YOHÚ[™Öš^šU\È‹Kš\ÕÜ]™[HLKœÝÙ\”[™[˜š]\OHž›[L‹KœÝÙ\”[™[œÙ]XÕš\ÚX›JLJK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë—ØÝ\”›ÛO]ÌK\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ëš][PÚ[™ÙQ]™[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ëš][PÚ[™ÙQ]™[ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\Ëš][PÚ[™ÙQ]™[ØNM
K\Ë›ØœÙ\™JÚ[™Ëš[œÊ
KœÜÝ\ÙQ[”ÝXØÙ\ÜË\Ë\]UšY]×ØNM
K\Ë›ØœÙ\™JÚ[™Ëš[œÊ
KœÜÝÚ[™Õ\Ü˜YK\Ë\]UšY]×ØNM
K\Ë˜YÝXÚ]™[
\Ë\Ë›ÛÛXÚ×ØNM
K\Ë\]UšY]×ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™SØœÙ\™J
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›ÛÛXÚ×ØNM
_KKœ›ÝÝ\K\]UšY]×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—ØÝ\”›ÛJKOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™Ó]™[ÝÚ[™ÜÑ]K›—NÝ\ËÚ[™Ó˜[YK^YK›˜[YK\Ëžš^šS‹^Høn©\ŠÝÚ[™ÜÑ]K˜\]YQ[ŠÈˆ‹\Ë˜Ø\™Y\‹^T›ÛK™Ù]›Ø“˜[YPžR›ØŠš›ØŠNÝ˜\ˆOYK˜]”[ÚYŠÚ[™ÜÑ]K˜\]YQ[ZJ]\Ë˜Ý\œ™[Ý]OH›X^ˆŽÙ[Ù^Ý˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹˜]”[Y
K\ÏÜË˜ÛÝ[ŒÛÝ\Ë˜Ý\œ™[Ý]OH››Ü›X[Ž\Ë˜Ý\œ™[Ý]OH››Ú][HŸ]\Ë\]P]œ×ØNM

_KKœ›ÝÝ\K\]P]œ×ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
\Ë—ØÝ\”›ÛJKOQÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹˜]”[ÏZK›[™ÝV×KÏLNÍ[ÎÛÊÊÊ]\ÖÈ˜]ˆŠÛ×K^Hˆ‹\ÖÈ˜]ˆŠÛÊÈ“™^ˆ—K^Hˆ‹Ï[É‰ŠZVÛËLWK\ÖÈ˜]ˆŠÛ×K^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊ]šX]Q]K™Ù]]”ÝžU\J\JJÈŽˆÎŒ‘Œ	•ŠÈŠÝ˜[YJ™KÚ[™ÜÑ]K˜\]YQ[ŠÈŸŠK‹œ\Ú
™]È]šX]Q]J\K˜[YJ™KÚ[™ÜÑ]K˜\]YQ[ŠJK››Ü›X[O]\Ë˜Ý\œ™[Ý]I‰Š\ÖÈ˜]ˆŠÛÊÈ“™^ˆ—K^HŠÈŠÚVÛËLWK˜[YJŠKÚ[™ÜÑ]K˜\]YQ[ŠÌJJJNÝ\ËœÝÙ\”[™[œÙ]ÝÙ\Š\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠŠJ_KKœ›ÝÝ\Kš][PÚ[™ÙQ]™[ØNMY[˜Ý[ÛŠ
^ÚYŠ›X^ˆˆO]\Ë˜Ý\œ™[Ý]J^Ý˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÕÚ[™ÐÛÛ[[Û‹˜]”[Y
KOYOÙK˜ÛÝ[ŒÚOÊH››Ü›X[ˆO]\Ë˜Ý\œ™[Ý]K\Ë˜Ý\œ™[Ý]OH››Ü›X[ŠNŠH››Ú][HˆO]\Ë˜Ý\œ™[Ý]K\Ë˜Ý\œ™[Ý]OH››Ú][HŠK	‰\Ë\]P]œ×ØNM

__KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë\]PŽ•Ú[™Ëš[œÊ
KœÙ[™\ÙQ[Š\Ë—ØÝ\”›ÛK
__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ú[™Öš^šU\ÕšY]Ëœ›ÝÝ\K•Ú[™Öš^šU\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÚ[™Öš^šU\ÕšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆš[“[™ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÞ\ÒYTXÚØYÙRQ•Ø\”Ü\š]Kœ™YÓ™]\ÙÊKKœÜÝš[“[™Ò[™›ÊKKœ™YÓ™]\ÙÊ‹KœÜÝš[“[™Õ\^[™›ÊKKœ™YÓ™]\ÙÊËKœÜÝš[“[™ÑYÒ[™›ÊKKœ™YÓ™]\ÙÊKœÜÝš[“[™ÕÙX\’[™›ÊKKœ™YÓ™]\ÙÊ‹KœÜÝš[“[™ÐÛÛ\ÜÙR][R[™›ÊKKœ™YÓ™]\ÙÊËKœÜÝš[“[™ÐX˜›R[™›ÊKKœ™YÓ™]\ÙÊK™Öš[“[™ÔÚÚ[[™›×ØNM
KKœ™YÓ™]\ÙÊLKKœÜÝš[“[™ÔÚÚ[•\Ü˜YR[™›ÊKKœ™YÓ™]\ÙÊL‹KœÜÝš[™Ó[™ÔÚÚ[Ú[™ÙR[™›ÊKK›ØœÙ\™J\Ù\–œÔÞ\Ý[Kš[œÊ
KœÜÝœÓ‹Kš[š]š[“[™×ØNM
KK›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PYš[“[™Ó[Ù[š[œÊ
K\]TÚÝÖ“\Ý[™›ÊKK›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[š[“[™Ó[Ù[š[œÊ
K\]TÚÝÖ“\Ý[™›ÊKK›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÛÝ[Ú[™ÙKš[“[™Ó[Ù[š[œÊ
K\]TÚÝÖ“\Ý[™›ÊK_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\Kš[š]ÙÚ[Y[˜Ý[ÛŠ
^Öš[“[™Ó[Ù[š[œÊ
K\]TÚÝÖ“\Ý[™›Ê
_KKœ›ÝÝ\Kš[š]™\›ÏY[˜Ý[ÛŠ
^ÈVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY

I‰–š[“[™Ó[Ù[š[œÊ
KÚXÚÖš[“[™ÓÜ[Š
I‰–š[“[™Ó[Ù[š[œÊ
KœÙ]š[“[™Ñ]J™]Èš[“[™Ñ]J_KKœ›ÝÝ\Kš[š]š[“[™×ØNMY[˜Ý[ÛŠ
^ÈVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY

I‰–š[“[™Ó[Ù[š[œÊ
KÚXÚÖš[“[™ÓÜ[Š
I‰–š[“[™Ó[Ù[š[œÊ
KœÙ]š[“[™Ñ]J™]Èš[“[™Ñ]J_KKœ›ÝÝ\K˜ÚXÚÔ™YÚ[Y[˜Ý[ÛŠ
^ÚYŠVš[“[™Ó[Ù[š[œÊ
KÚXÚÖš[“[™ÓÜ[Š
J\™]\›ˆLNÝ˜\ˆLOVš[“[™Ó[Ù[š[œÊ
Kš\Õ\Ü˜YPžTÝ\Š
_š[“[™Ó[Ù[š[œÊ
Kš\Ò[[J
NÚYŠJ\™]\›ˆLÚYŠOVš[“[™Ó[Ù[š[œÊ
Kš\ÐØ[•\Ü˜YPžU[[

J\™]\›ˆLÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™ÎÙ›ÜŠ˜\ˆÈ[ˆK\Ü˜YR[™›ÊZYŠOVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò[™›ÐžQYÕ\ÙJ[X™\ŠÊJJ\™]\›ˆLÙ›ÜŠ˜\ˆLÛš[“[™Ó[Ù[š[œÊ
KœÚÝÖ“\Ý›[™ÝÛŠÊÊ^Ý˜\ˆÏVš[“[™Ó[Ù[š[œÊ
KœÚÝÖ“\ÝÛ—NÚYŠ[ËšY
^ÚYŠOVš[“[™Ó[Ù[š[œÊ
Kš\Õ\Ü˜YPžTÝ\Š
_š[“[™Ó[Ù[š[œÊ
Kš\Ò[[J
J\™]\›ˆLÚYŠOVš[“[™Ó[Ù[š[œÊ
Kš\ÐØ[•\Ü˜YPžU[[

J\™]\›ˆL_\™]\›ˆLOVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò][T™YÚ[

KOÈLˆL_KKœ›ÝÝ\K–š[“[™Ò][U\Ò[™›ÏY[˜Ý[ÛŠKJ^Ý›ÚYOOYI‰ŠOL
K›ÚYOOZI‰ŠOHLJNÝ˜\ˆÏ]QÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÜ×KÏZOÌNŒOVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò][TÝÙ\ŠËÊKXK[‹›]™[Èøn©\ŠÛ‹›]™[
ÈˆŽˆ•°íøn©\¸n«XÈ‹QÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\Ü×KÏ^ÛYˆ•¸nâÈ°ë{ï&—ˆøn©\¸n«Xûï&ˆ‹šYÚ‘ÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ëž›\]Z\˜[YVÛœÜËLWJÈ—ˆŠÚKOV×NÝKœ\Ú
Ý]Nˆ•xnæXÈ0ë[šñ¨H¸n¨Û»ï&ˆ‹]Ž›˜]œßJNÝ˜\ˆHˆ‹Hˆ‹ÏQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\Ü×K›]™[ÙÏYÏÙÎŒNÙ›ÜŠ˜\ˆQÛØ˜[ÛÛ™šYË–š[“[™ÔÝZ]Ù×KMLŽOVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY
JKOHˆ‹ÏMÌLŒŒ‹MLŽLÏHˆ‹OLÒOÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë™\]Z\ÜÐÛÝ[ÒJÊÊ^Ý˜\ˆÏMLŽÏ^OÑÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\ÞKš][\ÖÒWWN›[È^_^Kš][\ÖÒW_]ßË›]™[ÏÊÏ]LMÌLMŽÏULMÍÍÌŒMJN˜ŠÊË_JÌOOQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\Ü×KœÜÉ‰ŠÏMLŽ
NÝ˜\ˆHŸÎˆŠÔÊÈ‰•ˆŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ëž›\]Z\˜[YVÒWNÒJÌOÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë™\]Z\ÜÐÛÝ[	‰ŠŠÏHŸÎˆŠÔÊÈ‰•‹ŠKÊÏPŸZ_
LJKH•xnæXÈ0ë[šñ¨H¸n¨Ûˆ0è\¸n¨ÛÈ1 Û™È
ÈŠÙ‹œ™XÙ[ÌL
È‰H‹OHŸÎˆŠÝŠÈ‰•ŠŠØŠÈ‹ÈŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë™\]Z\ÜÐÛÝ[
ÈŠH‹PËKœ\Ú
Ý]NˆŸÎŒ™Œ™‰•ˆŠÙ‹œÝZ]Ú]˜[YJÈŸŠÛK]Ž™‹˜]œËÛÛÜ“˜[YN—ËÛÛÜ•˜[YN•Ý\œÎžÜÝZ]\ØÎœ^\ØÎ™_JKšY]ÓYÜ‹š[œÊ
K›Ü[Š\]Z\\Ð˜\ÙK\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹Ë‹KËJ_KKœ›ÝÝ\KœÙ[™š[“[™Õ\^Y[˜Ý[ÛŠJ^Ý›ÚYOOYI‰ŠOL
NÝ˜\ˆO]\Ë™Ù]ž]\ÊŠNÚKÜš]Pž]J
KKÜš]Pž]JJK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™š[“[™ÑYÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\ÊÊNÚKÜš]Pž]J
KKÜš]R[
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™š[“[™ÕÙX\Y[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\Ê
NÚKÜš]Pž]J
KKÜš]R[
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™š[“[™ÐÛÛ\ÜÙR][OY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÙKÜš]R[

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™š[“[™ÔÚÚ[•\Ü˜YOY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊLJNÙKÜš]Pž]J
K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™š[™Ó[™ÔÚÚ[Ú[™ÙOY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊLŠNÙKÜš]Pž]J
K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÜÝš[“[™Ò[™›ÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]œ™XYž]J
KOLÙOšNÚJÊÊ^Ý˜\ˆÏ[™]Èš[“[™Ñ]NÜËšY]œ™XY[

KË[[]œ™XYž]J
KË›]™[]œ™XYÚÜ

KË™^]œ™XY[

KË™YÜÏV×NÙ›ÜŠ˜\ˆ]œ™XYž]J
KÏLÛ›ÎÛÊÊÊ^Ý˜\ˆO]œ™XY[

K]œ™XYÚÜ

NÜË™YÜËœ\Ú
Ú][RY˜KÛÝ[œŸJ_]˜\ˆ]œ™XYž]J
NÚYŠ
^ÜËš][\ÏV×NÙ›ÜŠ˜\ˆLÚ›Û
ÊÊ\Ëš][\Ëœ\Ú
œ™XY[

J_Vš[“[™Ó[Ù[š[œÊ
KœÙ]š[“[™Ñ]JÊ_]˜\ˆÏ]œ™XYž]J
NÖš[“[™Ó[Ù[š[œÊ
K–š[“[™ÔÚÚ[’YXßKKœ›ÝÝ\KœÜÝš[“[™Õ\^[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
KO]œ™XYÚÜ

KÏ]œ™XY[

KVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY
JNÚYŠŠ^Ý˜\ˆÏ[‹›]™[Û‹›]™[ZK‹™^\ËO›É‰\ËœÜÝš[“[™Õ\Ü˜YJ
__KKœ›ÝÝ\KœÜÝš[“[™Õ\Ü˜YOY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\KœÜÝš[“[™ÑYÒ[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
KO]œ™XY[

KÏ]œ™XYÚÜ

KVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY
JNÚYŠŠ^Ù›ÜŠ˜\ˆÏHLKOLØO‹™YÜË›[™ÝØJÊÊZYŠ‹™YÜÖØWKš][RYOZJ^Û‹™YÜÖØWK˜ÛÝ[\ËÏHLØœ™XZß[ß‹™YÜËœ\Ú
Ú][RYšKÛÝ[œßJ__KKœ›ÝÝ\KœÜÝš[“[™ÕÙX\’[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
KO]œ™XY[

KÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY
JNÚYŠÊ^Ý˜\ˆQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\ÚWNÛ‰‰ŠËš][\ÖÛ‹œÜËLWOZJ__KKœ›ÝÝ\KœÜÝš[“[™ÐÛÛ\ÜÙR][R[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
KO]œ™XYž]J
KÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY
JNÚYŠÊY›ÜŠ˜\ˆLÚO›ŽÛŠÊÊ\Ëš][\ÖÛ—O]œ™XY[

_KKœ›ÝÝ\KœÜÝš[“[™ÐX˜›R[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYÝX›J
KO]œ™XY[

KÏ]œ™XYž]J
KQ[]SYÜ‹š[œÊ
K™Ù][]PžR[™JJNÛ‰‰›‹œÚÝÖš[›[™ÊËJ_KKœ›ÝÝ\K™Öš[“[™ÔÚÚ[[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOLOVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY
JKÏQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[ÙWVÚK›]™[K[[]™[QÛØ˜[ÛÛ™šYË–š[“[™Õ[[ÙWVÜ×NÕ\Ù\”ÚÚ[š[œÊ
KœÜÝÚÝÔÚÚ[ÛÜ™
‹œÚÝÕÛÜ™Ê_KKœ›ÝÝ\KœÜÝš[“[™ÔÚÚ[•\Ü˜YR[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
KO]œ™XYÚÜ

KÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY
JKLÜÏÛ\Ë[[ŽŠÏ[™]Èš[“[™Ñ]KËšYYKš[“[™Ó[Ù[š[œÊ
KœÙ]š[“[™Ñ]JÊJKHO[‰‰\ËœÜÝš[“[™Õ[[•\Ü˜YJ
KË[[Z_KKœ›ÝÝ\KœÜÝš[“[™Õ[[•\Ü˜YOY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\KœÜÝš[™Ó[™ÔÚÚ[Ú[™ÙR[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
NÖš[“[™Ó[Ù[š[œÊ
K–š[“[™ÔÚÚ[’YY_K_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
š[“[™Ëœ›ÝÝ\K–š[“[™ÈŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ýžš[›[™ÏVš[“[™Ëš[œË˜š[™
š[“[™Ê_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆš[“[™Ñ]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\Ë—ÚY]ÝŒ\Ë—Û]™[L\Ë—Ù^L\Ë—Ú][\ÏV×NÙ›ÜŠ˜\ˆOLÙOÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë™\]Z\ÜÐÛÝ[ÙJÊÊ]\Ë—Ú][\Ëœ\Ú

NÝ\Ë—Ý[[L\Ë—ÙYÜÏV×NÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë\Ü˜YR[™›Ê]\Ë—ÙYÜËœ\Ú
Ú][RY“[X™\ŠJKÛÝ[ŒJ_\™]\›ˆØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\KšY‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ÚYKÙ]™[˜Ý[ÛŠ
^Ý\Ë—ÚY]K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\K›]™[‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Û]™[KÙ]™[˜Ý[ÛŠ
^Ý\Ë—Û]™[]K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\K™^‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Ù^KÙ]™[˜Ý[ÛŠ
^Ý\Ë—Ù^]K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\Kš][\È‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Ú][\ßKÙ]™[˜Ý[ÛŠ
^Ý\Ë—Ú][\Ï]K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\K[[ˆ‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Ý[[ŸKÙ]™[˜Ý[ÛŠ
^Ý\Ë—Ý[[]K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\K™YÜÈ‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ÙYÜßKÙ]™[˜Ý[ÛŠ
^Ý\Ë—ÙYÜÏ]K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKJ
N××Ü™Y›XÝ
š[“[™Ñ]Kœ›ÝÝ\K–š[“[™Ñ]HŠNÝ˜\ˆ“ÔÎÈY[˜Ý[ÛŠ
^ÝÝ’USLOLWOH’USLH‹Ý’USLL—OH’USLˆ‹Ý’USLÏL×OH’USLÈ‹Ý’USMMOH’USMŸJ“Ôß
“ÔÏ^ßJJNÝ˜\ˆš[“[™Ó[Ù[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK—Öš[“[™Ñ]O^ßKK—Öš[“[™ÔÚÚ[’YLK—ÜÚÝÖ“\ÝV×K_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K–š[“[™Ñ]H‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Öš[“[™Ñ]_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\K™Ù]š[“[™Ñ]PžRYY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Öš[“[™Ñ]VÝ_KKœ›ÝÝ\KœÙ]š[“[™Ñ]OY[˜Ý[ÛŠ
^Ý	‰Š\Ë—Öš[“[™Ñ]VÝšYO]
_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K–š[“[™ÔÚÚ[’Y‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Öš[“[™ÔÚÚ[’YKÙ]™[˜Ý[ÛŠ
^Ý\Ë—Öš[“[™ÔÚÚ[’Y]K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\KœÚÝÖ“\Ý‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ÜÚÝÖ“\ÝKÙ]™[˜Ý[ÛŠ
^Ý\Ë—ÜÚÝÖ“\Ý]K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\KÚXÚÖš[“[™ÓÜ[Y[˜Ý[ÛŠ
^Ü™]\›ˆ\Ù\–œÔÞ\Ý[Kš[œÊ
K›QÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë›Ü[žšX[œÚ[™Û‰‰‘Ø[YTÙ\™\‹œÙ\™\“Ü[‘^JÌOQÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë›Ü[œÙ\™\™^_KKœ›ÝÝ\K™Ù]š[“[™Ñ]PžS]™[Y[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Öš[“[™Ñ]VÝOÝ\Ë—Öš[“[™Ñ]VÝK›]™[ŒKKœ›ÝÝ\K™Ù]š[“[™Ò[™›ÐžTÝYÙOY[˜Ý[ÛŠ
^ÚYŠ]\Ë—Öš[“[™Ñ]VÝK›]™[
\™]\›ˆNÝ˜\ˆOSX]™›ÛÜŠ\Ë—Öš[“[™Ñ]VÝK›]™[ÌL
KOSX]™›ÛÜŠ\Ë—Öš[“[™Ñ]VÝK›]™[	LL
NÜ™]\›ˆJÏLK_
KOLJK_
OLJK_KKœ›ÝÝ\K™Ù]š[“[™Ò[™›ÐžS™^ÝYÙOY[˜Ý[ÛŠ
^Ý˜\ˆOLÝ\Ë—Öš[“[™Ñ]VÝI‰ŠO]\Ë—Öš[“[™Ñ]VÝK[[ŠNÝ˜\ˆKÏQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[ÝNÙ›ÜŠ˜\ˆˆ[ˆÊ^Ý˜\ˆÏ\ÖÛ—NÚYŠË[[]™[™J^ÚO[ÎØœ™XZß_\™]\›ˆOÝ\Ë™Ù]ÝYÙSŠK›]™[
N›[KKœ›ÝÝ\K™Ù]š[“[™Ñ]PžTÝ\Y[˜Ý[ÛŠ
^ÚYŠ]\Ë—Öš[“[™Ñ]VÝ_]\Ë—Öš[“[™Ñ]VÝK›]™[
\™]\›ˆÝ˜\ˆOSX]™›ÛÜŠ\Ë—Öš[“[™Ñ]VÝK›]™[	LL
NÜ™]\›ˆ_
OLL
K_KKœ›ÝÝ\K™Ù]š[“[™Ò[™›ÐžU[[Y[˜Ý[ÛŠ
^ÚYŠ]\Ë—Öš[“[™Ñ]VÝJ\™]\›ˆÝ˜\ˆO]\Ë™Ù]š[“[™Ñ]PžS]™[

KOQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[ÝVÙWK[[]™[Ü™]\›ˆI‰Š\Ë—Öš[“[™Ñ]VÝK[[ZJK\Ë—Öš[“[™Ñ]VÝK[[ŸKKœ›ÝÝ\K™Ù]š[“[™Ñ]PžQ^Y[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Öš[“[™Ñ]VÝOÝ\Ë—Öš[“[™Ñ]VÝK™^ŒKKœ›ÝÝ\K™Ù]š[“[™Ò[™›ÐžR][OY[˜Ý[ÛŠJ^Ü™]\›ˆ\Ë—Öš[“[™Ñ]VÝOÝ\Ë—Öš[“[™Ñ]VÝKš][\ÖÙKLWNŒKKœ›ÝÝ\K™Ù]š[“[™Ò[™›ÐžQYÕ\ÙOY[˜Ý[ÛŠJ^ÚYŠ]\Ë—Öš[“[™Ñ]VÝJ\™]\›ˆLNÝ˜\ˆOLÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
JNÚYŠO\ÏÜË˜ÛÝ[ŒZJ\™]\›ˆLNÝ˜\ˆ]\Ë—Öš[“[™Ñ]VÝK›]™[ÏQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[ÝVÛ—NÝ	‰ˆ[Ë›X^ÛÝ[Ý˜\ˆOHLNÚYŠË›X^ÛÝ[	‰›Ë›X^ÛÝ[ÙWJY›ÜŠ˜\ˆLÜ\Ë—Öš[“[™Ñ]VÝK™YÜË›[™ÝÜŠÊÊZYŠ\Ë—Öš[“[™Ñ]VÝK™YÜÖÜ—Kš][RYOYI‰\Ë—Öš[“[™Ñ]VÝK™YÜÖÜ—K˜ÛÝ[[Ë›X^ÛÝ[ÙWJ^ØOHLØœ™XZß\™]\›ˆOÈLNˆLKKœ›ÝÝ\K™Ù]š[“[™Ñ]PžU[[YY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝNÜ™]\›ˆOÙK[[ŒKKœ›ÝÝ\K™Ù]š[“[™Ñ]PžTÚÚ[Y[˜Ý[ÛŠ
^Ý˜\ˆOV×NÜ™]\›ˆ\Ë—Öš[“[™Ñ]VÝOÑÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝKœÚÚ[™_KKœ›ÝÝ\K™Ù]š[“[™Ñ]PžQYÏY[˜Ý[ÛŠJ^ÚYŠ]\Ë—Öš[“[™Ñ]VÝJ\™]\›ˆÙ›ÜŠ˜\ˆOLÚO\Ë—Öš[“[™Ñ]VÝK™YÜË›[™ÝÚJÊÊZYŠ\Ë—Öš[“[™Ñ]VÝK™YÜÖÚWKš][RYOYJ\™]\›ˆ\Ë—Öš[“[™Ñ]VÝK™YÜÖÚWK˜ÛÝ[Ü™]\›ˆKKœ›ÝÝ\K™Ù]š[“[™Ñ]PžTÝZ]Y[˜Ý[ÛŠ
^ÚYŠ]\Ë—Öš[“[™Ñ]VÝJ\™]\›ˆÙ›ÜŠ˜\ˆOLOLÚO\Ë—Öš[“[™Ñ]VÝKš][\Ë›[™ÝÚJÊÊ^Ý˜\ˆÏ]\Ë—Öš[“[™Ñ]VÝKš][\ÖÚWKQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\Ü×NÚYŠ[Š\™]\›ˆÙ_
O[‹›]™[
KO›‹›]™[	‰ŠO[‹›]™[
_\™]\›ˆ_KKœ›ÝÝ\K™Ù]š[“[™Ò[™›ÐžTÝZ]ÛÝ[Y[˜Ý[ÛŠJ^ÚYŠ]\Ë—Öš[“[™Ñ]VÝJ\™]\›ˆÙ›ÜŠ˜\ˆOLÏLÜÏ\Ë—Öš[“[™Ñ]VÝKš][\Ë›[™ÝÜÊÊÊ^Ý˜\ˆ]\Ë—Öš[“[™Ñ]VÝKš][\ÖÜ×KÏQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\Û—NÛË›]™[YI‰šJÊß\™]\›ˆ_KKœ›ÝÝ\K™Ù]š[“[™Ò[™›ÐžSX]Y[˜Ý[ÛŠJ^ÚYŠYI‰ˆ]\Ë—Öš[“[™Ñ]VÝJ\™]\›ˆÝ˜\ˆOQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝKÏZK[[LÚYŠJ[LNÙ[Ù^ÚYŠ]\Ë—Öš[“[™Ñ]VÝK[[Š\™]\›ˆÛ]\Ë—Öš[“[™Ñ]VÝK[[ŠÌ_]˜\ˆÏQÛØ˜[ÛÛ™šYË–š[“[™Õ[[Ü×VÛ—NÜ™]\›ˆÏÛË˜ÛÜÝÛÝ[ŒKKœ›ÝÝ\K™Ù][\Úš[“[™ÔÝÙ\Y[˜Ý[ÛŠ
^Ý˜\ˆOLÏYKš[œÊ
K™Ù]š[“[™Ñ]PžS]™[

KQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[ÝVÜ×NÚYŠ[Š\™]\›–ÚK×K×WNÝ˜\ˆÏYKš[œÊ
K™Ù]š[“[™Ñ]PžRY

NÚYŠ[Ê\™]\›–ÚK×K×WNÝ˜\ˆOQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[ÝVÜÊÌWKLV×KV×KÏLOLV×KV×KÏLV×KV×KOLOLÜŠÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\Š‹˜]œÊJ”ÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[ŽÙ›ÜŠ˜\ˆÏL×ÏÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[Ž×ÊÊÊ^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊNÙ›ÜŠ˜\ˆˆ[ˆ‹˜]œÊ\ŠÏPÛÛ™šYÒ][Kœ™[]TÝÙ\Š‹˜]œÖØ—K
_\ŠÏJ‹™^ÝÙ\Û‹™^ÝÙ\ŽŒ
J”ÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹]\Ë˜Y]œÊ‹˜]œÊKI‰Š]\Ë˜Y]œÊK˜]œÊJNÝ˜\ˆÏYKš[œÊ
K™Ù]š[“[™Ñ]PžTÝZ]

NÚYŠÊ^Ý˜\ˆOQÛØ˜[ÛÛ™šYË–š[“[™ÔÝZ]Ð×NÚYŠI‰’K˜]œÊ^ÝJÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠK˜]œÊJ”ÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[ŽÙ›ÜŠ˜\ˆLØK˜]œË›[™ÝØŠÊÊY›ÜŠ˜\ˆÏL×ÏÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[Ž×ÊÊÊ^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊNÝJÏPÛÛ™šYÒ][Kœ™[]TÝÙ\ŠK˜]œÖØ—K
_\P]šX]Q]K™Ù]\˜Ù[]ŠKœ™XÙ[ÌYM
KI‰ŠP]šX]Q]K™Ù]\˜Ù[]ŠKœ™XÙ[ÌYM
J__Y›ÜŠ˜\ˆLØË™YÜË›[™ÝØŠÊÊ^Ù›ÜŠ˜\ˆÏV×KÏV×KQÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë\Ü˜YR[™›ÖÛË™YÜÖØ—Kš][RYKV×KOLÓO‹˜]‹›[™ÝÓJÊÊ^Ý˜\ˆ[™]È]šX]Q]NÞ\OP‹˜]–ÓWK\K˜[YOP‹˜]–ÓWK˜[YJ›Ë™YÜÖØ—K˜ÛÝ[‹œ\Ú

_]˜\ˆO^Ø]Ž”‹™XÙ[‹œ™XÙ[Ð‹œ™XÙ[
›Ë™YÜÖØ—K˜ÛÝ[ŒÛÜ‹œÛÜNÙÊÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠK˜]ŠJ”ÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹]\Ë˜Y]œÊ‹K˜]ŠK]\Ë˜Y]œÊ‹K˜]ŠKKœ™XÙ[	‰ŠÊÏSX]™›ÛÜŠŠ‘Kœ™XÙ[ÌYM
KÉ‰ŠÊÏSX]™›ÛÜŠŠ‘Kœ™XÙ[ÌYM
JKÏP]šX]Q]K™Ù]\˜Ù[]ŠKœ™XÙ[ÌYM
K]\Ë˜Y]œÊ‹ÊKI‰ŠÏP]šX]Q]K™Ù]\˜Ù[]ŠKœ™XÙ[ÌYM
K]\Ë˜Y]œÊ‹ÊJJNÙ›ÜŠ˜\ˆÏL×ÏÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[Ž×ÊÊÊ^Ý˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊNÙÊÏPÛÛ™šYÒ][Kœ™[]TÝÙ\ŠK˜]–Ø—K
__Y›ÜŠ˜\ˆLNØQÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë™\]Z\ÜÐÛÝ[ØŠÊÊ^Ý˜\ˆYKš[œÊ
K™Ù]š[“[™Ò[™›ÐžR][JŠNØÊÏ]\Ë™Ù]š[“[™Ò][TÝÙ\ŠJ_]˜\ˆO]\Ë™Ù]š[“[™Ñ]PžU[[Y

KÏ]\Ë™Ù]š[“[™Ò[™›ÐžU[[Š
KQÛØ˜[ÛÛ™šYË–š[“[™Õ[[ÐWVÚ×NÚYŠ
^Ý˜\ˆT™^ÝÙ\ŽÞJÏJÓŒ
J”ÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹˜]œÉ‰ŠJÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\Š˜]œÊJ”ÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[Š_Y›ÜŠ˜\ˆÏQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝKLØËœÚÚ[›[™ÝØŠÊÊ^Ý˜\ˆOQÛØ˜[ÛÛ™šYË–š[“[™ÔÚÚ[ÑËœÚÚ[Ø—KšYNÚYŠK˜]œÊ^ÛJÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠK˜]œÊJ”ÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[ŽÙ›ÜŠ˜\ˆÏL×ÏÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[Ž×ÊÊÊY›ÜŠ˜\ˆTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊKLÑK˜]œË›[™ÝÑŠÊÊ[JÏPÛÛ™šYÒ][Kœ™[]TÝÙ\ŠK˜]œÖÑ—K
NÕK™^ÝÙ\‰‰ŠJÏUK™^ÝÙ\Š__\™]\›ˆO\ŠØÊÝJÙÊÞJÛK]\Ë˜Y]œÊ
K]\Ë˜Y]œÊŠKI‰Š]\Ë˜Y]œÊ
K]\Ë˜Y]œÊŠJKÚK_KKœ›ÝÝ\K˜Y]œÏY[˜Ý[ÛŠKÊ^Ý›ÚYOO\É‰ŠÏHL
NÝ˜\ˆ\ÏÖ×NÚYŠÊY›ÜŠ˜\ˆÏLÛÏ›[™ÝÛÊÊÊKLHOYKœÚÝÕ\S\Ýš[™^ÙŠÛ×K\JI‰›‹œ\Ú
™]È]šX]Q]JÛ×K\KÛ×K˜[YJJNÙ›ÜŠ˜\ˆOLØOK›[™ÝØJÊÊ^Ý˜\ˆHLNÚYŠLHOYKœÚÝÕ\S\Ýš[™^ÙŠVØWK\JJ^Ù›ÜŠ˜\ˆLÚ›[™ÝÚ
ÊÊZYŠÚK\OOZVØWK\J^Û–ÚK˜[YJÏZVØWK˜[YKHLØœ™XZß\Ÿ‹œ\Ú
™]È]šX]Q]JVØWK\KVØWK˜[YJJ__\™]\›ˆŸKKœ›ÝÝ\K™Ù]š[“[™Ò][TÝÙ\Y[˜Ý[ÛŠJ^Ý›ÚYOOYI‰ŠOL
NÝ˜\ˆOLÏQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\ÝNÚYŠ\Ê\™]\›ˆNÝ˜\ˆYOÔÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[ŽŒÎÚYŠJÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\ŠË˜]œÊJ›‹JY›ÜŠ˜\ˆÏLÛ›ÎÛÊÊÊY›ÜŠ˜\ˆOTÝX”›Û\Ëš[œÊ
K™Ù]ÝX”›ÛPžR[™^
ÊKLÜË˜]œË›[™ÝÜŠÊÊZJÏPÛÛ™šYÒ][Kœ™[]TÝÙ\ŠË˜]œÖÜ—KJNÜ™]\›ˆ_KKœ›ÝÝ\Kš\Õ\Ü˜YPžTÝ\Y[˜Ý[ÛŠ
^ÚYŠ]\Ë™Ù]š[“[™Ñ]PžRY

J\™]\›ˆ\Ëš\ÐØ[•\Ü˜YPžU[[
L
NÝ˜\ˆOYKš[œÊ
K™Ù]š[“[™Ñ]PžS]™[

KÏQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[ÝVÚWNÚYŠ\ß\Ë™^
\™]\›ˆLNÝ˜\ˆYKš[œÊ
K™Ù]š[“[™Ñ]PžQ^

KÏ\Ë™^[ŽÛÏ[ÏŒÛÎŒÝ˜\ˆOSX]˜ÙZ[
ËÑÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™ËœÝYÙZ][Y^
KU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™ËœÝYÙZ][ZY
K\Ü‹˜ÛÝ[ŒÜ™]\›ˆX_KKœ›ÝÝ\Kš\Ò[[OY[˜Ý[ÛŠ
^Ý˜\ˆOYKš[œÊ
K™Ù]š[“[™Ñ]PžRY

NÚYŠZJ\™]\›ˆLNÝ˜\ˆÏQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[ÝVÚK›]™[NÚYŠ\ß\Ë™^
\™]\›ˆLNÝ˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
ÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™ËœÝYÙZ][ZY
KÏ[Û‹˜ÛÝ[ŒÜ™]\›ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ëš[[_KKœ›ÝÝ\Kš\ÐØ[•\Ü˜YPžU[[Y[˜Ý[ÛŠJ^Ý›ÚYOOZI‰ŠOHLJNÝ˜\ˆÏYKš[œÊ
K™Ù]š[“[™Ñ]PžRY

NÚYŠZI‰ˆ\Ê\™]\›ˆLNÝ˜\ˆQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝNÚYŠ[‹›X]
\™]\›ˆLNÝ˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
‹›X]
KO[ÏÛË˜ÛÝ[Œ]\Ë™Ù]š[“[™Ò[™›ÐžSX]
JNÜ™]\›ˆØO\ŽˆL_KKœ›ÝÝ\K\]TÚÝÖ“\Ý[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆV×NÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙJQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÚWKœÛÜ	‰œ\Ú
ÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÚWJNÝœÛÜ
[˜Ý[ÛŠJ^Ü™]\›ˆœÛÜKœÛÜËLNŒ_JK\ËœÚÝÖ“\ÝV×NÙ›ÜŠ˜\ˆÏLÜÏ›[™ÝÜÊÊÊZYŠÜ×KœÚÝÊ^Ý˜\ˆYKš[œÊ
K™Ù]š[“[™Ñ]PžRY
Ü×KšY
NÚYŠŠ]\ËœÚÝÖ“\Ýœ\Ú
Ü×JNÙ[Ù^Ý˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
Ü×K›X]
NÛÉ‰›Ë˜ÛÝ[	‰\ËœÚÝÖ“\Ýœ\Ú
Ü×J__Y[ÙH\ËœÚÝÖ“\Ýœ\Ú
Ü×J_KKœ›ÝÝ\K™Ù]š[“[™Ò][T™YÚ[Y[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]š[“[™Ñ]PžRY

NÚYŠYJ\™]\›ˆLNÝ˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\J][U\K•TWÌŒJNÚI‰šKœÛÜ
[˜Ý[ÛŠJ^Ý˜\ˆOQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\Ý˜ÛÛ™šYÒQKÏQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\ÙK˜ÛÛ™šYÒQNÜ™]\›ˆK›]™[œË›]™[ËLNŒ_JNÙ›ÜŠ˜\ˆÏLÜÏKš][\Ë›[™ÝÜÊÊÊ^Ý˜\ˆ\ÊÌKÏYKš][\ÖÜ×KO]›ÚYÛÉ‰ŠOQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\Û×JNÙ›ÜŠ˜\ˆLÜK›[™ÝÜŠÊÊ^Ý˜\ˆZVÜ—K˜ÛÛ™šYÒQQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÚNÚYŠ
^Ý˜\ˆÏQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\ÚNÚYŠÉ‰›OXËœÜÊ^Ý˜\ˆO[›]™[Û›]™[Œ[žœÓ]™[ÛžœÓ]™[ŒÚYŠ\Ù\–œÔÞ\Ý[Kš[œÊ
K›\	‰XÝÜ‹›]™[]J^ÚYŠJ^ÚYŠË›]™[˜K›]™[
\™]\›ˆLØœ™XZß\™]\›ˆL____\™]\›ˆL_KKœ›ÝÝ\K™Ù]ÝYÙSY[˜Ý[ÛŠ
^Ý˜\ˆOSX]™›ÛÜŠÌL
KOSX]™›ÛÜŠ	LL
NÜ™]\›ˆOÙJÏLN	‰	LLOLÚOLL™JÏLKÙKW_KKœÚÝÕ\S\ÝVÐ]šX]U\K˜]]XÚË]šX]U\K˜]X^]šX]U\K˜]Y‹]šX]U\K˜]™\×K_JÛ\ÜÐ˜\ÙJN××Ü™Y›XÝ
š[“[™Ó[Ù[œ›ÝÝ\K–š[“[™Ó[Ù[ŠNÝ˜\ˆš[“[™Ò][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[–š[›[™Ñ\]Z\‹Kš[š]

K_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^Ý\Ë˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÑS‘\Ë›ÛÛXÚË\Ê_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^ÚYŠ\Ë™]J^Ý˜\ˆ]\Ë™]KšYÚYŠ\Ë™\]Z\Ï]\Ë™]K™\]Z\Ë\Ë˜™ËœÛÝ\˜ÙO]\Ë™Ù]ÜÒ[Y×ØNM
[X™\Š\Ë›˜[YJJK\Ë˜™Ëš\ÚX›OHL\Ë™\]Z\š\ÚX›OH]\Ë˜™Ëš\ÚX›K\Ëœ™YÚ[š\ÚX›O]\Ë˜ÚXÚÔ™YÚ[ØNM

K\Ë™]KšY
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝNÙI‰Š\Ëœ]X[]KœÛÝ\˜ÙOHœ]X[]HŠÐÛÛ™šYÒ][K™Ù]]X[]JJK\Ë™\]Z\œÛÝ\˜ÙOYKšXÛÛŠÈ—Ü™È‹\Ë˜™Ëš\ÚX›OHLK\Ë™\]Z\š\ÚX›OH]\Ë˜™Ëš\ÚX›J___KKœ›ÝÝ\K˜ÚXÚÔ™YÚ[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆÝ\Ë™]KšY	‰ŠQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\Ý\Ë™]KšYJNÙ›ÜŠ˜\ˆOLÙO\Ë™\]Z\Ë›[™ÝÙJÊÊ^Ý˜\ˆO]\Ë™\]Z\ÖÙWK˜ÛÛ™šYÒQÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÚWNÚYŠÊ^Ý˜\ˆQÛØ˜[ÛÛ™šYË–š[“[™Ñ\]Z\ÚWNÚYŠ‰‰“[X™\Š\Ë›˜[YJOO[‹œÜÊ^Ý˜\ˆÏ\Ë›]™[ÜË›]™[ŒO\ËžœÓ]™[ÜËžœÓ]™[ŒÚYŠ\Ù\–œÔÞ\Ý[Kš[œÊ
K›XI‰XÝÜ‹›]™[[Ê\™]\›ˆÛ‹›]™[›]™[Ê\Ë˜™\ÝY[‹šYL
NˆLNŠ\Ë˜™\ÝY[‹šYL
___\™]\›ˆL_KKœ›ÝÝ\K™Ù]ÜÒ[Y×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOHž›Ù\]Z\Ø™×ÈŠÝÜ™]\›ˆ_KKœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÑS‘\Ë›ÛÛXÚË\Ê_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë™]OÝ\Ë™]KšY\Ëœ™YÚ[š\ÚX›OÝ\Ë™]KšY	‰ˆ]\Ëœ™YÚ[š\ÚX›OÝ›ÚYš[“[™Ëš[œÊ
K–š[“[™Ò][U\Ò[™›Ê\Ë™]KšYL
Nš\Ó˜SŠ\Ë™]Kž›Y
OÝ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Q0è\¸n¨ÛÈ¸n©]1¬8nç[™ÈŠN\Ë˜™\ÝYÈ]\Ë™]KšY	‰\Ëœ™YÚ[š\ÚX›OÝ›ÚYš[“[™Ëš[œÊ
KœÙ[™š[“[™ÕÙX\Š\Ë™]Kž›Y\Ë˜™\ÝY
N›ÚYš[“[™Ëš[œÊ
KœÙ[™š[“[™ÕÙX\Š\Ë™]Kž›Y\Ë˜™\ÝY
N›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê•˜[™È¸nâÈ¸n©]1¬8nç[™ÈŠN›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™ÈðìÈ˜[™È¸nâÈ0è\¸n¨ÛÈ1$xnàÈxn­ØÈŠN›ÚYK_J][T™[™\˜\ÙJN××Ü™Y›XÝ
š[“[™Ò][T™[™\‹œ›ÝÝ\K–š[“[™Ò][T™[™\ˆŠKÚ[™ÝË–š[“[™Ò][T™[™\Vš[“[™Ò][T™[™\ŽÝ˜\ˆš[“[™Ò][U\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[–š[™Û[™Õ\\È‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙW_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ[™]™[
\Ë\Ë›Ý\ÛÜÙWØNM
K\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›Ý\ÛÜÙWØNM
K\ËšY]ÌK\Ëš][ZY]ÌWNÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝ\Ëš][ZYNÝ\Ëš][RXÛÛ‹œÙ]]JJK\Ë›˜[YSX™[^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJK›˜[YJNÝ˜\ˆÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžQYÊ\ËšY\Ëš][ZY
KVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžS]™[
\ËšY
KÏQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[Ý\ËšYVÛ—KO[Ë›X^ÛÝ[Ý\Ëš][ZYK\ÏXOÍLŽŒMÌLMŽÝ\Ë\ÙK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸÎˆŠÜŠÈ‰•ˆŠÜÊÈŸÈŠØJNÝ˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
\Ëš][ZY
NÝ\Ë›[K^ZÈˆŠÚ˜ÛÝ[ˆŒŽÝ˜\ˆVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò[™›ÐžTÝYÙJ\ËšY
JÌNÌL
›ÛÛ[[Û•][Ë™Ù]Øš™XÝ[™Ý
ÛØ˜[ÛÛ™šYË–š[“[™Ó]™[Ý\ËšYJOÑ\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ëš[™›ÊN\Ë›[L^[
ÈˆÚXZHHØ[ÈŽÝ˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë\Ü˜YR[™›ÖÝ\Ëš][ZYKOP]šX]Q]K™Ù]]ÝŠË˜]‹KŠÈ‹›ÚY›ÚY›ÚY›ÚYÌLŒŒ‹LŽ
NØËœ™XÙ[	‰ŠJÏH—•xnæXÈ0ë[šñ¨H¸n¨Ûˆ0è\¸n¨ÛÈ
ÈŠØËœ™XÙ[ÌL
È‰HŠK\Ë˜]‹^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJJ_KKœ›ÝÝ\K›Ý\ÛÜÙWØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
š[“[™Ò][U\ÕšY]Ëœ›ÝÝ\K–š[“[™Ò][U\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš[“[™Ò][U\ÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆš[“[™Ô[™[^šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH–š[›[™ÔÚÚ[ˆ‹Kš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë›Ü[•šY]Ê
_K_Jš[“[™Ô[™[
N××Ü™Y›XÝ
š[“[™Ô[™[^šY]Ëœ›ÝÝ\K–š[“[™Ô[™[^šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš[“[™Ô[™[^šY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆš[“[™ÔÚÚ[’][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÂœ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[–š[›[™Ö’][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^Ýœ›ÝÝ\K˜Ú[™[Ü™X]Y˜Ø[
\Ê_KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^ÚYŠ\Ë™]J^Ý˜\ˆ]\Ë™]KšYOQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝNÚYŠJ^Ý˜\ˆOVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžS]™[

NÝ\ËšXÛÛ‹œÛÝ\˜ÙOYKšXÛÛŽÝ˜\ˆÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY

OÈLNˆLÝ\ËœÝ]Kš\ÚX›O\Ë\ËšXÛÛ‹™š[\œÏ\ÏÑš[\•][T”VWÑÔVWÑ’STŽ–×K\ËœÙ[XÝš\ÚX›OHLK\Ë›X™[^ZJÈˆ‹\Ë›X™[š\ÚX›OH]\ËœÝ]Kš\ÚX›NÝ˜\ˆVš[“[™Ó[Ù[š[œÊ
Kš\Õ\Ü˜YPžTÝ\Š
_š[“[™Ó[Ù[š[œÊ
Kš\Ò[[J
NÛŸ
Vš[“[™Ó[Ù[š[œÊ
Kš\ÐØ[•\Ü˜YPžU[[

JK\Ëœ™YÚ[š\ÚX›O[Ÿ__KKœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\KœÙ]Ù[XÝY[˜Ý[ÛŠ
^Ý\ËœÙ[XÝš\ÚX›O]K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
š[“[™ÔÚÚ[’][T™[™\‹œ›ÝÝ\K–š[“[™ÔÚÚ[’][T™[™\ˆŠNÝ˜\ˆš[“[™ÔÝZ]\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[–š[›[™ÔÝZ]\È‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙW_KKœ›ÝÝ\K›Ý\ÛÜÙOY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ[™]™[
\Ë\Ë›Ý\ÛÜÙJK\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›Ý\ÛÜÙJK\ËšY]ÌNÝ˜\ˆOVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžTÝZ]
\ËšY
KÏPÛÛ[[Û•][Ë™Ù]Øš™XÝ[™Ý
ÛØ˜[ÛÛ™šYË–š[“[™ÔÝZ]
KQÛØ˜[ÛÛ™šYËÛÛ™šYÖš[“[™Ë™\]Z\ÜÐÛÝ[ÏLÚOÊÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò[™›ÐžTÝZ]ÛÝ[
\ËšYJKO\É‰›Ï[Ý\Ë˜Ý\œ™[Ý]OH›X^Ž\Ë˜Ý\œ™[Ý]OH˜XÝ]™HŠNŠ\Ë˜Ý\œ™[Ý]OH[˜XÝ]™H‹OLJK\Ë˜[Y]S›ÝÊ
NÝ˜\ˆOQÛØ˜[ÛÛ™šYË–š[“[™ÔÝZ]ÚWKTÝš[™Õ][Ëœ™\XÙJKœÝZ]ÛÛ™][Û‹ˆŠÛËˆŠÛŠNÈ[˜XÝ]™HO]\Ë˜Ý\œ™[Ý]I‰Š\Ë˜ÛÛ[^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŠJNÝ˜\ˆP]šX]Q]K™Ù]]ÝŠK˜]œËKŠÈŠNÚYŠ
ÏH—•xnæXÈ0ë[šñ¨H¸n¨Ûˆ0è\¸n¨ÛÈ
ÈŠØKœ™XÙ[ÌL
È‰H‹\Ë˜]Œ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ
K\Ë›˜[YL^XKœÝZ]˜[YK˜XÝ]™HO]\Ë˜Ý\œ™[Ý]J^Ý˜\ˆQÛØ˜[ÛÛ™šYË–š[“[™ÔÝZ]ÚJÌWNÛÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò[™›ÐžTÝZ]ÛÝ[
\ËšYJÌJKTÝš[™Õ][Ëœ™\XÙJœÝZ]ÛÛ™][Û‹ˆŠÛËˆŠÛŠK\Ë˜ÛÛ[K^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŠNÝ˜\ˆÏP]šX]Q]K™Ù]]ÝŠ˜]œËKŠÈŠNØÊÏH—•xnæXÈ0ë[šñ¨H¸n¨Ûˆ0è\¸n¨ÛÈ
ÈŠÛœ™XÙ[ÌL
È‰H‹\Ë˜]ŒK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJÊK\Ë›˜[YLK^[œÝZ]˜[Y__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
š[“[™ÔÝZ]\šY]Ëœ›ÝÝ\K–š[“[™ÔÝZ]\šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš[“[™ÔÝZ]\šY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆš[“[™Õ\ÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH–š[›[™ÔÚÚ[\ÔÚÚ[ˆ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\Ê_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ[™]™[
\Ë\Ë›Ý\ÛÜÙWØNM
K\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›Ý\ÛÜÙWØNM
K\ËšY]Ì_\ËœÚÚ[Y]ÌWNÝ˜\ˆO^Û˜[YNˆˆ‹\ØÎˆˆ‹ØÚÎˆˆŸKÏ^Û˜[YNˆˆ‹\ØÎˆˆ‹ØÚÎˆˆŸKHˆŽÚYŠ\ËœÚÚ[Y
^ÛH[˜XÝ]™HŽÙ›ÜŠ˜\ˆÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžRY
\ËšY
KOJš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžTÚÚ[
\ËšY
KÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝ\ËšYJKVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžS]™[
\ËšY
KLÚKœÚÚ[›[™ÝÚ
ÊÊZYŠKœÚÚ[ÚKšYO]\ËœÚÚ[Y
^Ý˜\ˆQÛØ˜[ÛÛ™šYË–š[“[™ÔÚÚ[ØKœÚÚ[ÚKšYKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[ÖÛœ\ÜÚ]™WKOXÏØË™\ØÎŒQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[Ñ\ØÖÝWNÚYŠ[ßKœÚÚ[ÚK›Ü[Š^Ý˜\ˆSX]™›ÛÜŠKœÚÚ[ÚK›Ü[‹ÌL
KÏSX]™›ÛÜŠKœÚÚ[ÚK›Ü[‰LL
NÙÏÙ
ÏLN˜KœÚÚ[ÚK›Ü[‰‰˜KœÚÚ[ÚK›Ü[‰LLOLÙÏLL™
ÏLK	‰ŠK›˜[YO\›˜[YKK™\ØÏ\™\ØÊKK›ØÚÏY
È˜¸n«XÈŠÙÊÈˆØ[ÈŸY[ÙHH›X^‹	‰ŠK›˜[YO\›˜[YKK™\ØÏ\™\ØÊNØÉ‰œ	‰šK™\ØÉ‰ŠK™\ØÏTÝš[™Õ][Ëœ™\XÙJK™\ØËˆŠØË™\Ø×Ù^ÌJJK™\ØÉ‰›™\ØË›˜[YI‰ŠK›˜[YO[™\ØË›˜[YJK™\ØÉ‰›™\ØË™\ØÉ‰ŠK™\ØÏ[™\ØË™\ØÊK˜]œÉ‰ŠK™\ØÉ‰ŠK™\ØÊÏH—ˆŠKK™\ØÊÏHŸÎŒ™Œ™‰•ˆŠÐ]šX]Q]K™Ù]]ÝŠ˜]œËK»ï&ˆ‹›ÚY›ÚY›ÚY›ÚYÌLŒŒ‹LŽ
JÈŸŠNØœ™XZß_Y[Ù^Ý˜\ˆVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ñ]PžU[[Y
\ËšY
KVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò[™›ÐžU[[Š\ËšY
KOPÛÛ[[Û•][Ë™Ù]Øš™XÝ[™Ý
ÛØ˜[ÛÛ™šYË–š[“[™Õ[[Ý\ËšYJKOQÛØ˜[ÛÛ™šYË–š[“[™Õ[[Ù—VÝ—NÚYŠJZYŠ^J[H›X^ŽÙ[Ù^ÛH˜XÝ]™HŽÝ˜\ˆÏQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝ\ËšYKQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][V×Ë›X]KQÛØ˜[ÛÛ™šYË–š[“[™Õ[[Ù—VÝŠÌWNÚYŠ‹[[\ØÊZYŠË›˜[YOX‹[[\ØË›˜[YKË™\ØÏTÝš[™Õ][Ëœ™\XÙJ‹[[\ØË™\ØËˆŠØ‹œ˜]KÌL
K‹˜ÛÜÝÛÝ[
\Ë›ØÚÏHŸÎŒ‘‘‘ÐÉ•±$xnà]HÚxnáÛˆ°è›™Èøn©\ŸÎŒ™Œ	•ˆŠÕ›˜[YJÈŠˆŠØ‹˜ÛÜÝÛÝ[\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›ØÚÌJNÙ[Ù^Ý˜\ˆÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò[™›ÐžS™^ÝYÙJ\ËšY
NÐÉ‰ŠË›ØÚÏPÖÌJÈ˜¸n«XÈŠÐÖÌWJÈˆØ[ÈŠ_Y[Ù^Ý˜\ˆOX‹œ\ÜÚ]™VÌKšYÏQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[ÖÒWKOTË™\ØËQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[Ñ\ØÖÝWNÚYŠË›˜[YO\›˜[YKË™\ØÏTÝš[™Õ][Ëœ™\XÙJ™\ØËˆŠÔË™\Ø×Ù^ÌJK‹˜ÛÜÝÛÝ[
\Ë›ØÚÏHŸÎŒ‘‘‘ÐÉ•±$xnà]HÚxnáÛˆ°è›™Èøn©\ŸÎŒ™Œ	•ˆŠÕ›˜[YJÈŠˆŠØ‹˜ÛÜÝÛÝ[\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›ØÚÌJNÙ[Ù^Ý˜\ˆÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò[™›ÐžS™^ÝYÙJ\ËšY
NÐÉ‰ŠË›ØÚÏPÖÌJÈ˜¸n«XÈŠÐÖÌWJÈˆØ[ÈŠ___Y[ÙHYŠH[˜XÝ]™H‹OQÛØ˜[ÛÛ™šYË–š[“[™Õ[[Ù—VÌWKK˜ÛÜÝÛÝ[
ZK›ØÚÏH”Ø]HÚHðëXÚøn¨]ÚÚ[ˆŽÙ[Ù^Ý˜\ˆÏVš[“[™Ó[Ù[š[œÊ
K™Ù]š[“[™Ò[™›ÐžS™^ÝYÙJ\ËšY
NÐÉ‰ŠK›ØÚÏPÖÌJÈ˜¸n«XÈŠÐÖÌWJÈˆØ[ÈŠ_ZYŠK[[\ØÊZK›˜[YO[K[[\ØË›˜[YKK™\ØÏTÝš[™Õ][Ëœ™\XÙJK[[\ØË™\ØËˆŠÛKœ˜]KÌL
NÙ[Ù^Ý˜\ˆO[Kœ\ÜÚ]™VÌKšYOQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[ÖÒWK™\ØËQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[Ñ\ØÖÝWNÚK›˜[YO\›˜[YKK™\ØÏ\™\ØËK™\ØÏTÝš[™Õ][Ëœ™\XÙJK™\ØËˆŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[ÖÒWK™\Ø×Ù^ÌJ__]\Ë˜Ý\œ™[Ý]O[‹\Ë˜[Y]S›ÝÊ
K\ËœÚÚ[˜[YL^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJK›˜[YJK\ËœÚÚ[\ØÌ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJK™\ØÊKK›ØÚÏÝ\Ë˜ÛÛ™][ÛŒ^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJK›ØÚÊN‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë˜ÛÛ™][ÛŒœ\™[
KË›˜[YI‰Š˜XÝ]™HO[Ê\ËœÚÚ[˜[YLK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJË›˜[YJK\ËœÚÚ[\ØÌK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJË™\ØÊKË›ØÚÏÝ\Ë˜ÛÛ™][ÛŒK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJË›ØÚÊN‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë˜ÛÛ™][ÛŒKœ\™[
JN‘\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›™^Ü›Ý\
J_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÑS‘\Ë›Ý\ÛÜÙWØNM\Ê_KKœ›ÝÝ\K›Ý\ÛÜÙWØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
š[“[™Õ\ÕšY]Ëœ›ÝÝ\K–š[“[™Õ\ÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš[“[™Õ\ÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆš[›[™Ö•\][\Ô™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[–š[›[™Ö•\][\È‹Kš[š]

K_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]Y[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^ÚYŠ\Ë™]J^Ý˜\ˆ]\Ë™]Kž›YO]\Ë™]KšYOQÛØ˜[ÛÛ™šYË–š[“[™ÔÚÚ[ÙWNÚK™\ØÉ‰šK™\ØËšXÛÛÝ\ËœÚÚ[XÛÛŒKœÛÝ\˜ÙOZK™\ØËšXÛÛŽ\ËœÚÚ[XÛÛŒKœÛÝ\˜ÙOLYLÊ“X]™›ÛÜŠKœ\ÜÚ]™KÌYLÊJÈ—Ü™ÈŽÙ›ÜŠ˜\ˆÏQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝKLÏLÛÏËœÚÚ[›[™ÝÛÊÊÊZYŠËœÚÚ[Û×KšYOYJ^Û\ËœÚÚ[Û×K›Ü[ŽØœ™XZß]˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[ÖÚKœ\ÜÚ]™WKXOØK™\ØÎŒQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[Ñ\ØÖÜ—K^Û˜[YNˆˆ‹\ØÎˆˆŸNÚ	‰Š›˜[YOZ›˜[YK™\ØÏZ™\ØÊKI‰š	‰›™\ØÉ‰Š™\ØÏTÝš[™Õ][Ëœ™\XÙJ™\ØËˆŠØK™\Ø×Ù^ÌJJKK™\ØÉ‰šK™\ØË›˜[YI‰Š›˜[YOZK™\ØË›˜[YJKK™\ØÉ‰šK™\ØË™\ØÉ‰Š™\ØÏZK™\ØË™\ØÊKK˜]œÉ‰Š™\ØÉ‰Š™\ØÊÏH—ˆŠK™\ØÊÏP]šX]Q]K™Ù]]ÝŠK˜]œËK»ï&ˆ‹›ÚY›ÚY›ÚY›ÚYÌLŒŒ‹LŽ
JNÝ˜\ˆÏVš[“[™Ó[Ù[š[œÊ
K™Ù]ÝYÙSŠŠNÝ\Ë™\ØË^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ’ønîH± Û™È8nãXÈ1$q¬8nèØÈ8nçÈøn©\ŠØÖÌJÈŸÎŒ™Œ‰•¸à$ŠÛ›˜[YJÈ¸à$WˆŠÛ™\ØÊ__KKœ›ÝÝ\K™\ÝXÝY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÑS‘\Ë›ÛÛXÚË\Ê_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ßK_J][T™[™\˜\ÙJN××Ü™Y›XÝ
š[›[™Ö•\][\Ô™[™\‹œ›ÝÝ\K–š[›[™Ö•\][\Ô™[™\ˆŠNÝ˜\ˆš[›[™Ö•\\Ý][T™[™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[”[™QØZ[•\Ò][H‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý\Ë™\ØË^]\Ë™]VÌ_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K\Ù\‘]H‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë™]_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\KœÙ]™ÕÚYY[˜Ý[ÛŠ
^Ý\ËÚY]\Ë˜™ËÚY]K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
š[›[™Ö•\\Ý][T™[™\‹œ›ÝÝ\K–š[›[™Ö•\\Ý][T™[™\ˆŠNÝ˜\ˆš[›[™Ö•\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[–š[›[™Ö•\È‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙW_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ[™]™[
\Ë\Ë›Ý\ÛÜÙWØNM
K\Ë™ØZ[“\Ýš][T™[™\™\Vš[›[™Ö•\\Ý][T™[™\‹\Ë™ØZ[“\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û•ÝXÚ\Ý]™[ØNM\ÊK\ËœÚÚ[\Ýš][T™[™\™\Vš[›[™Ö•\][\Ô™[™\‹\Ëš][ZY]ÌNÙ›ÜŠ˜\ˆH[ˆÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙJ^Ý˜\ˆÏQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÚWNÚYŠË›X]O]\Ëš][ZY
^Ý\Ëž›Y\ËšYØœ™XZß_]˜\ˆQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[Ý\Ëž›YVÌNÝ\Ëžš[›[™Ó˜[YKœÛÝ\˜ÙO[‹ž›˜[YK\Ë›[Ù[
\Ë›[Ù[[™]ÈXÐ[š[X][ÛŠK\Ë›[Ù[œ\™[\Ëžš[›[™Ë˜YÚ[
\Ë›[Ù[
K\Ë›[Ù[›˜[YHOT™\Ñ\“YÜ‹”‘T×ÑT—ÔÒÕÑPSÊÛ‹š[›™\\X\˜[˜ÙI‰\Ë›[Ù[œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÔÒÕÑPSÊÛ‹š[›™\\X\˜[˜ÙKLJK\Ë˜›ÝÛSXß
\Ë˜›ÝÛSXÏ[™]ÈXÐ[š[X][ÛŠK\Ë˜›ÝÛSXËœ\™[\Ë˜›ÝÛQ˜YÚ[
\Ë˜›ÝÛSXÊK\Ë˜›ÝÛSXËš\Ô^Z[™ß\Ë˜›ÝÛSXËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈžš[›[™Ø›ÝÛH‹LJNÝ˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝ\Ëš][ZYNÝ\Ëš][[˜[YK^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJŸÎˆŠÐÛÛ™šYÒ][K™Ù]]X[]PÛÛÜŠÊJÈ‰•ˆŠÛË›˜[YJNÝ˜\ˆOPÛÛ™šYÒ][K™Ù]]X[]JÊNÝ\Ëœ]X[KœÛÝ\˜ÙOXOŒÈœ]X[HŠØNˆˆŽÝ˜\ˆQÛØ˜[ÛÛ™šYË–š[“[™Ð˜\ÙVÝ\Ëž›YKQÛØ˜[ÛÛ™šYË–š[“[™Õ[[Ü‹[[VÌWNÚ
QÛØ˜[ÛÛ™šYË–š[“[™Õ[[Ü‹[[VÌWJNÝ˜\ˆH”Ø]HÚHðëXÚøn¨]š8n«[ˆpê›ˆ0îˆxn¨[šxn¯NˆŽÚYŠ[[\ØÉ‰š[[\ØËšXÛÛŠ]\ËœÚÚ[XÛÛŒœÛÝ\˜ÙOZ[[\ØËšXÛÛ‹[[\ØË™\ØÉ‰Š
ÏZ[[\ØË™\ØÊNÙ[Ù^Úœ\ÜÚ]™I‰Š\ËœÚÚ[XÛÛŒœÛÝ\˜ÙOLYLÊ“X]™›ÛÜŠœ\ÜÚ]™VÌKšYÌYLÊJÈ—Ü™ÈŠNÝ˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[ÖÚœ\ÜÚ]™VÌKšYKOQÛØ˜[ÛÛ™šYËÛÛ™šYÔÚÚ[Ñ\ØÖØË™\Ø×NÛ
ÏTÝš[™Õ][Ëœ™\XÙJK™\ØËË™\Ø×Ù^
_]\Ë™\ØË^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ
NÙ›ÜŠ˜\ˆLËQÛØ˜[ÛÛ™šYË–š[“[™Ó]™[Ý\Ëž›YVÌKÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\Š˜]œÊJœJ™^ÝÙ\ŠÕ\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\Š˜]œÏÚ˜]œÎ–×JJJœLOV×KOLÛO‹œÚÚ[›[™ÝÛJÊÊ^Ý˜\ˆÏ\‹œÚÚ[ÛWKšYQÛØ˜[ÛÛ™šYË–š[“[™ÔÚÚ[××NÕ˜]œÉ‰ŠŠÏU\Ù\˜YÔÞ\Ý[K™Ù]]”ÝÙ\Š˜]œÊJœKœ\Ú
ÚY—Ë›Yœ‹šYJJ_]\ËœÚÚ[\Ý™]T›ÝšY\[™]È\œ˜^PÛÛXÝ[ÛŠJKÏYÊÙŠÝ‹\ËœÝÙ\”[™[œÙ]ÝÙ\ŠÊNÝ˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑØZ[’][VÝ\Ëš][ZYNØ‰‰Š\Ë™ØZ[“\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ‹™ØZ[•Ø^JJK[Y\“YÜ‹š[œÊ
K™Õ[Y\‘[^JŒK\Ë™[^TÙ]][WØNM\Ê_KKœ›ÝÝ\K™[^TÙ]][WØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÝ\Ë™ØZ[“\Ý›[Q[[Y[ÎÝ
ÊÊ^Ý˜\ˆO]\Ë™ØZ[“\Ý™Ù]š\X[[[Y[]

NÙI‰™KœÙ]™ÕÚY
L
__KKœ›ÝÝ\K›Ý\ÛÜÙWØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K›Û•ÝXÚ\Ý]™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]š][NÛ[O]š][I‰™VÌWI‰•šY]ÓYÜ‹š[œÊ
K›Ü[ŠVÌWKVÌ—J_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
š[›[™Ö•\šY]Ëœ›ÝÝ\K–š[›[™Ö•\šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊš[›[™Ö•\šY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆšV˜ZQ\]Z\]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^ß\™]\›ˆœ›ÝÝ\Kœ\œÙ\Y[˜Ý[ÛŠ
^Ý\ËšY]œ™XY[

K\Ëœ˜[šÏ]œ™XYÚÜ

K\Ë™Ü›ÝÝ\Q]œ™XY[

_KØš™XÝ™Yš[™T›Ü\Jœ›ÝÝ\K›ˆ‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ëœ˜[šÊ‘ÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\Ú[ÛÛœÝœ˜[šÑÜ›ÝÕ\
Ý\Ë™Ü›ÝÝ\QK[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKœ›ÝÝ\Kš\ÓX^]™[Y[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\Ú[Ü›ÝÕ\Ý\ËšYVÝ\Ë›ŠÌWNÜ™]\›ˆÈLNˆLKœ›ÝÝ\K˜ÚXÚÐØ[“]™[\Y[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\Ú[Ü›ÝÕ\Ý\ËšYVÝ\Ë›—KO]™Ü›ÝÕ\][KšYO]›™YY]™[ÌYLÏŒÏ]›™YY]™[	LYLÎÜ™]\›ˆ\Ëš\ÓX^]™[

_I‰•\Ù\–œÔÞ\Ý[Kš[œÊ
K›_XÝÜ‹›]™[ÏÈLN•\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐÛÝ[žRY
JO™Ü›ÝÕ\][K˜ÛÝ[ÈLNˆLKœ›ÝÝ\K˜ÚXÚÐØ[Y˜[˜ÙOY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÑ\]Z\Ú[˜[šÖÝ\ËšYVÝ\Ëœ˜[š×NÚYŠ]\Ë›Ÿ]
\™]\›ˆLNÝ˜\ˆO]œ˜[šÕ\][KšYÜ™]\›ˆ\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐÛÝ[žRY
JOœ˜[šÕ\][K˜ÛÝ[ÈLNˆLKJ
N××Ü™Y›XÝ
šV˜ZQ\]Z\]Kœ›ÝÝ\K–šV˜ZQ\]Z\]HŠNÝ˜\ˆ\Ù\“ZZšOY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÞ\ÒYTXÚØYÙRQ“ZZšKKœ™YÓ™]\ÙÊKKœÜÝZZšQ]T™\Ý[
KKœ™YÓ™]\ÙÊ‹KœÜÝZZšU\]T™\Ý[
KKœ™YÓ™]\ÙÊËKœÜÝZZšPÚ[™ÙR[™›ÊKKœ™YÓ™]\ÙÊ‹KœÜÝZZšSØÚÒ[™›ÊK_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\KœÜÝZZšQ]T™\Ý[Y[˜Ý[ÛŠ
^Ý\Ë™ÜšY]œ™XYÚÜ

NÝ˜\ˆOTÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[ŽÝ\Ë›ZZšOV×NÙ›ÜŠ˜\ˆOLÙOšNÚJÊÊ^Ý\Ë›ZZšVÚWOV×NÙ›ÜŠ˜\ˆÏLÜÏ\Ë™ÜšYÜÊÊÊ^Ý˜\ˆ[™]ÈZZšQ]NÛ‹šY]œ™XY[

K‹š\ÓØÚÙY]œ™XY[

K\Ë›ZZšVÚWVÜ×O[Ÿ__KKœ›ÝÝ\KœÙ[™ZZšSX\›Y[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\ÊŠNÚKÜš]TÚÜ

KKÜš]R[
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÜÝZZšU\]T™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYÚÜ

KO]œ™XYÚÜ

KLKÏ]œ™XY[

K]œ™XYž]J
KÏ]\Ë›ZZšVÙWVÚWKšYÜ™]\›ˆ\Ë›ZZšVÙWVÚWKšY\ËÚKËË—_KKœ›ÝÝ\KœÙ[™ZZšPÚ[™ÙOY[˜Ý[ÛŠKJ^Ý˜\ˆÏ]\Ë™Ù]ž]\ÊÊNÜËÜš]R[

KËÜš]R[
JKËÜš]R[
JK\ËœÙ[™ÔÙ\™\ŠÊ_KKœ›ÝÝ\KœÙ[™ZZš]Ø[˜Ú[™ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\Ê
NÙKÜš]TÚÜ

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™ZZšPYØÚÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÚKÜš]R[

KKÜš]R[
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™ZZšQ[ØÚÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ž]\ÊŠNÚKÜš]R[

KKÜš]R[
JK\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\K™Ù]ÚÚ[\ÝÙ”›ÛOY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë›ZZšI‰\Ë›ZZšVÝOÝ\Ë›ZZšVÝN›[KKœ›ÝÝ\K™Ù]ZZšQ]OY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ë™Ù]ÚÚ[\ÝÙ”›ÛJ
NÜ™]\›ˆI‰šVÙWOÚVÙWKšY›[KKœ›ÝÝ\Kš\ÔÜXÚYšXÔÚÚ[Ù”›ÛOY[˜Ý[ÛŠJ^Ý˜\ˆOHLKÏ]\Ë™Ù]ÚÚ[\ÝÙ”›ÛJ
NÚYŠ[O\Ê^Ù›ÜŠ˜\ˆHLKÏLÛÏË›[™ÝÛÊÊÊ\ÖÛ×KšYOYI‰ŠHL
NÛ‰‰ŠOHL
_\™]\›ˆ_KKœ›ÝÝ\K›ZZšR\ÓØÚÏY[˜Ý[ÛŠJ^Ý˜\ˆOHLKÏ]\Ë™Ù]ÚÚ[\ÝÙ”›ÛJ
NÚYŠ[O\Ê^Ù›ÜŠ˜\ˆHLKÏLÛÏË›[™ÝÛÊÊÊSX]™›ÛÜŠÖÛ×KšYÌL
OOSX]™›ÛÜŠKÌL
I‰œÖÛ×Kš\ÓØÚÙY	‰ŠHL
NÛ‰‰ŠOHL
_\™]\›ˆ_KKœ›ÝÝ\Kš\Ó™]ÔÚÚ[Ù”›ÛOY[˜Ý[ÛŠ
^Ý˜\ˆOHLKO]\Ë™Ù]ÚÚ[\ÝÙ”›ÛJ
NÜ™]\›ˆ[OZI‰šK™]™\žJ[˜Ý[ÛŠ
^Ü™]\›ˆšYŒÊOHLLJNˆLJK_KKœ›ÝÝ\KœÜÝZZšPÚ[™ÙR[™›ÏY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[

NÜ™]\›ˆ_KKœ›ÝÝ\KœÜÝZZšSØÚÒ[™›ÏY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆO]\Ë›ZZšVÝœ™XY[

WKO]œ™XY[

KÏLÜÏK›[™ÝÜÊÊÊZYŠVÜ×KšYOZJ^Ý˜\ˆ]œ™XY[

NÙVÜ×Kš\ÓØÚÙY[ŽØœ™XZß_KKœ›ÝÝ\K™Ù]ÝÙ\žT›ÛOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOLO]\Ë›ZZšVÝKÏLÜÏK›[™ÝÜÊÊÊZVÜ×KšY	‰ŠJÏQÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[ÚVÜ×KšYKœÝÙ\ŠNÜ™]\›ˆ_KKœ›ÝÝ\KœÜÝÙ[XÝYZZšOY[˜Ý[ÛŠJ^Ü™]\›–ÝW_KKœ›ÝÝ\KœÜÝ˜YÕ\ÙSZZšOY[˜Ý[ÛŠ
^Ü™]\›ˆKKœ›ÝÝ\Kš\Ñ\]Z\ZZšOY[˜Ý[ÛŠJ^Ý›ÚYOOYI‰ŠOL
NÝ˜\ˆO]\Ë›ZZšVÙWNÚYŠZJ\™]\›ˆLNÙ›ÜŠ˜\ˆÏLÜÏK›[™ÝÜÊÊÊZYŠVÜ×I‰ŒOZVÜ×KšY
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[ÚVÜ×KšYNÚYŠ‹š][OO]
\™]\›ˆL\™]\›ˆL_KKœ›ÝÝ\Kš\ÓZšTÝ[OY[˜Ý[ÛŠ
^ÚYŠ\Ù\–œÔÞ\Ý[Kš[œÊ
K›K–œÓŠ\™]\›ˆLNÚYŠ]\Ë›ZZšJ\™]\›ˆLNÝ˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\JŠKO]›[™ÝŒÈLˆLNÚYŠZJ\™]\›ˆLNÝ˜\ˆÏTÙ][™Ëš[œÊ
K™Ù]˜[YJÛY[Ù]›ZZšT™YÚ[
NÚYŠÊ\™]\›ˆLNÙ›ÜŠ˜\ˆTÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹ÏLÛ›ÎÛÊÊÊY›ÜŠ˜\ˆO]\Ë›ZZšVÛ×KLÜK›[™ÝÜŠÊÊZYŠVÜ—KšY
Y›ÜŠ˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[ØVÜ—KšYKLÛ›[™ÝÛ
ÊÊZYŠš][OO]ÛK—ØÛÛ™šYÒQ
\™]\›ˆÙ][™Ëš[œÊ
KœÙ]˜[YJÛY[Ù]›ZZšT™YÚ[JKLNÜ™]\›ˆLKK–œÓLKKQÓÔSMK_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
\Ù\“ZZšKœ›ÝÝ\K•\Ù\“ZZšHŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý\Ù\“ZZšOU\Ù\“ZZšKš[œË˜š[™
\Ù\“ZZšJ_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆ\Ù\–œÔÞ\Ý[OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš\ÔÙ[™ÏV×KKœÞ\ÒYTXÚØYÙRQ–œËKœ™YÓ™]\ÙÊKKœÜÝœÑ]JKK™^Ú[™ÙOHLK_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\KœÜÝœÑ]OY[˜Ý[ÛŠ
^Ý\Ë›]œ™XY[

NÝ˜\ˆO]\Ë™^Ý\Ë™^]œ™XY[

K\Ë\Ü˜YPÛÝ[VÝœ™XYÚÜ

Kœ™XYÚÜ

Kœ™XYÚÜ

WKI‰XÝÜ‹š[œÊ
KœÜÝœÑ^Ú[™ÙJ\Ë™^YJK\ËœÜÝœÓŠ
_KKœ›ÝÝ\KœÜÝœÓY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\KœÙ[™Ù]]UÙZOY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÙKÜš]Pž]J
K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™œÕ\Ü˜YOY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊŠ_KKœ›ÝÝ\K˜ÚXÚÐØ[•\Ü˜YOY[˜Ý[ÛŠ
^Ý˜\ˆQÛØ˜[ÛÛ™šYËÛÛ™šYÖšX[”Ú[™Ó]™[Ý\Ë›ŠÌWNÜ™]\›ˆÝ\Ë™^]™^ˆL_KKœ›ÝÝ\Kš\ÓX^Y[˜Ý[ÛŠ
^Ü™]\›ˆÛØ˜[ÛÛ™šYËÛÛ™šYÖšX[”Ú[™Ó]™[Ý\Ë›ŠÌWOÈLNˆLKKœ›ÝÝ\K˜ÚXÚÐØ[‘Ù]Y[˜Ý[ÛŠ
^Ý˜\ˆLÚYŠ]\Ë\Ü˜YPÛÝ[
\™]\›ˆÙ›ÜŠ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÖšX[”Ú[™ËÏVÚK˜ÛÛ™\œÚ[ÛÛÝ[K››Ü›X[ÛÝ[K˜Y˜[˜ÙPÛÝ[KVÌK››Ü›X[][KK˜Y˜[˜ÙR][WKÏLÛÏË›[™ÝÛÊÊÊ\ÖÛ×K]\Ë\Ü˜YPÛÝ[Û×I‰Š[–Û×I‰XÝÜ‹›]™[Ž\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐÛÝ[žRY
–Û×JJI‰ŠO[ÏÙKš[œÊ
K™^Ú[™Ù_
LOÊNLOÊNÜ™]\›ˆKKœ›ÝÝ\K˜ÚXÚÐØ[“Ü[–”ÕÚ[Y[˜Ý[ÛŠ
^Ý˜\ˆPXÝÜ‹›]™[O[[O]\Ë›Ý\Ë›ŽŒÜ™]\›ˆYI‰ŽÈLNˆLK_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
\Ù\–œÔÞ\Ý[Kœ›ÝÝ\K•\Ù\–œÔÞ\Ý[HŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ý\Ù\–œÏU\Ù\–œÔÞ\Ý[Kš[œË˜š[™
\Ù\–œÔÞ\Ý[J_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆZZšQ]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^ß\™]\›ˆJ
N××Ü™Y›XÝ
ZZšQ]Kœ›ÝÝ\K“ZZšQ]HŠNÝ˜\ˆØZ[–œÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[‘ØZ[–œÈ‹\Ëš[™›ÕÏVÝ\Ëš[™›Õ\Ëš[™›ÕK\Ëš[™›Õ—K\ËÑ^\ÏVÝ\ËÑ^L\ËÑ^LK\ËÑ^L—K\Ëš][\ÏVÝ\Ëš][L\Ëš][LK\Ëš][L—K\Ë˜œÏVÝ\Ë˜Œ\Ë˜ŒK\Ë˜Œ—NÙ›ÜŠ˜\ˆOLÙO\Ëš][\Ë›[™ÝÙJÊÊ]\Ëš][\ÖÙWKš\ÔÚÝÓ˜[YJLJNÝ\ËœšXÙRXÛÛŒKœÙ]\J[Û™^PÛÛœÝž]X[˜˜[ÊK\ËœšXÙRXÛÛŒ‹œÙ]\J[Û™^PÛÛœÝž]X[˜˜[ÊNÝ˜\ˆO[™]È]Ø\™Ñ]NÚK\OLKšYLK˜ÛÝ[L\Ëš][\ÖÌK™]OZK\Ëš\ÕÜ]™[HL\Ë\Ñ^LKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™J\Ù\–œÔÞ\Ý[Kš[œÊ
KœÜÝœÑ]K\ËœÙ]]R[™›×ØNM
K\Ë›ØœÙ\™JXÝÜ‹š[œÊ
KœÜÝ]™[Ú[™ÙK\ËœÙ]]R[™›×ØNM
K\Ë›ØœÙ\™JÚÜš[œÊ
KœÜÝ^T™\Ý[™\Ý[\ËœÙ]]R[™›×ØNM
K\Ë›ØœÙ\™JÚÜš[œÊ
KœÜÝ^PÛÝ[™\Ý[\ËœÙ]]R[™›×ØNM
K\ËœÙ]]R[™›×ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\KœÙ]]R[™›×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÖšX[”Ú[™ËOYK›]™[
ÌKÏSX]›X^
XÝÜ‹›]™[JKJÛØ˜[ÛÛ™šYËÛÛ™šYÖšX[”Ú[™Ó]™[Ü×KÛØ˜[ÛÛ™šYËÛÛ™šYÖšX[”Ú[™Ñ^Ü×JKÏU\Ù\–œÔÞ\Ý[Kš[œÊ
NÝ\ËÑ^\ÖÌK^ÛÛÜPXÝÜ‹›]™[OÌMNLÍÎŒŽŒN\Ëš[™›ÕÖÌK^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š	Õ1 Û™È0ê›H›ÛÛÛÜHˆÌŒH‰ÊÛ‹™^
ÉÏÙ›ÛˆHšW±$8nåZHøn©\;ï&›ÛÛÛÜHˆÌŒH™Úxn¨ÛHHøn©\Ù›Û‰ÊKYK˜ÛÛ™\œÚ[ÛÛÝ[[Ë\Ü˜YPÛÝ[ÌK\ËÑ^\ÖÌK^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\ŠXÝÜ‹›]™[NÈ“8næÛˆ1¨[ˆøn©\ŠÊKLJJÈˆxnæÚH1$q¬8nèØÈ1$xnåZHŽ‰Ððì›ˆðìÈ8nàÈ1$xnåZH›ÛÛÛÜHˆÌŒH‰ÊÝ
ÈÙ›Ûˆ8n©ÛˆŠK\Ë˜œÖÌK™[˜X›Y]ŒÝ˜\ˆOYK››Ü›X[][KQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VØWKU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐÛÝ[žRY
JKPÛÛ™šYÒ][TÝÜ™K™Ù]ÝÜ™PžR][RQ
JNÝ\Ëš][\ÖÌWK™]OXK\Ë˜œÖÌWK›X™[ZÈ”ønëH8né[™ÈŽˆ“]XH‹\Ë˜œÖÌWK›˜[YOYK››Ü›X[^
Èˆ‹\ËœšXÙRXÛÛŒKš\ÚX›OLOZ\ËœšXÙRXÛÛŒKœÙ]šXÙJœšXÙJK\ËœšXÙRXÛÛŒK›˜[YO\‹›˜[YK\Ë›˜[YUK^\‹›˜[YK\Ëš[™›ÕÖÌWK^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š	Õ1 Û™È0ê›H›ÛÛÛÜHˆÌŒH‰ÊÙK››Ü›X[^
ÈÙ›ÛˆHšWˆŠÊÉÏ›ÛÛÛÜHˆÌLÈðì›ˆ8n¨ZH	ÊÚ
ÈˆðèZOÙ›ÛˆŽˆˆŠJKYK››Ü›X[ÛÝ[[Ë\Ü˜YPÛÝ[ÌWK\ËÑ^\ÖÌWK^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š	Ððì›ˆðìÈ8nàÈ1$xnåZH›ÛÛÛÜHˆÌŒH‰ÊÝ
ÈÙ›Ûˆ8n©ÛˆŠK\Ë˜œÖÌWK™[˜X›Y]Œš\‰‰•\Ù\•š\š[œÊ
K›š\Ê\Ëš\ŒKš\ÚX›OHL\Ëš\ŒK^H•’TŠÛš\ŠÈˆðìÈ8nàÈ]XHŠN\Ëš\ŒKš\ÚX›OHLKOYK˜Y˜[˜ÙR][KQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VØWKU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐÛÝ[žRY
JKPÛÛ™šYÒ][TÝÜ™K™Ù]ÝÜ™PžR][RQ
JK\Ëš][\ÖÌ—K™]OXK\Ë˜œÖÌ—K›X™[ZÈ”ønëH8né[™ÈŽˆ“]XH‹\Ë˜œÖÌ—K›˜[YOYK˜Y˜[˜ÙQ^
Èˆ‹\ËœšXÙRXÛÛŒ‹š\ÚX›OLOZ\ËœšXÙRXÛÛŒ‹œÙ]šXÙJÛÛ™šYÒ][TÝÜ™K™Ù]ÝÜ™PžR][RQ
JKœšXÙJK\ËœšXÙRXÛÛŒ‹›˜[YO\‹›˜[YK\Ë›˜[YU‹^\‹›˜[YK\Ëš[™›ÕÖÌ—K^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š	Õ1 Û™È0ê›H›ÛÛÛÜHˆÙ˜ÌŒÈ‰ÊÙK˜Y˜[˜ÙQ^
ÈÙ›ÛˆHšWˆŠÊÉÏ›ÛÛÛÜHˆÌLÈðì›ˆ8n¨ZH	ÊÚ
ÈˆðèZOÙ›ÛˆŽˆˆŠJKYK˜Y˜[˜ÙPÛÝ[[Ë\Ü˜YPÛÝ[Ì—K\ËÑ^\ÖÌ—K^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š	Ððì›ˆðìÈ8nàÈ1$xnåZH›ÛÛÛÜHˆÌŒH‰ÊÝ
ÈÙ›Ûˆ8n©ÛˆŠK\Ë˜œÖÌ—K™[˜X›Y]Œš\‰‰•\Ù\•š\š[œÊ
K›š\Ê\Ëš\Œ‹š\ÚX›OHL\Ëš\Œ‹^H•’TŠÛš\ŠÈˆðìÈ8nàÈ]XHŠN\Ëš\Œ‹š\ÚX›OHLNÙ›ÜŠ˜\ˆÏ[Ë˜ÚXÚÐØ[‘Ù]

KOLÌÏNÝJÊÊ]\ÖÈœ™YÚ[ŠÝWKš\ÚX›OXÏIŒK\ÖÈœ™YÚ[[HŠÝWI‰\ÖÈœ™YÚ[[HŠÝWJ
NÜÏSX]›X^
XÝÜ‹›]™[
ÌKJKQÛØ˜[ÛÛ™šYËÛÛ™šYÖšX[”Ú[™Ñ^Ü×K\Ù\–œÔÞ\Ý[Kš[œÊ
Kš\ÔÙ[™ÖÌOÕ\Ù\–œÔÞ\Ý[Kš[œÊ
Kš\ÔÙ[™ÖÌOHLN•\Ù\–œÔÞ\Ý[Kš[œÊ
Kš\ÔÙ[™ÖÌWOÕ\Ù\–œÔÞ\Ý[Kš[œÊ
Kš\ÔÙ[™ÖÌWOHLN•\Ù\–œÔÞ\Ý[Kš[œÊ
Kš\ÔÙ[™ÖÌ—I‰Š\Ù\–œÔÞ\Ý[Kš[œÊ
Kš\ÔÙ[™ÖÌ—OHLJ_KKœ›ÝÝ\Kœ™YÚ[[LØNMY[˜Ý[ÛŠ
^Õ\Ù\–œÔÞ\Ý[Kš[œÊ
K™^Ú[™Ù_
\Ù\–œÔÞ\Ý[Kš[œÊ
K™^Ú[™ÙOHL
_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\Ë˜ÛÛÜØ[˜\Î˜Ø\ÙH\Ë˜ÛÜÙPŒ˜Ø\ÙH\Ë˜ÛÜÙPŽ˜Ø\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎÙY˜][˜\ˆO]\Ë˜œËš[™^ÙŠ\™Ù]
NÚYŠO‹LJZYŠOYJU\Ù\–œÔÞ\Ý[Kš[œÊ
Kš\ÔÙ[™ÖÙWOHL\Ù\–œÔÞ\Ý[Kš[œÊ
KœÙ[™Ù]]UÙZJJÌJNÙ[ÙHYŠ”ønëH8né[™ÈO]\Ë˜œÖÙWK›X™[
U\Ù\–œÔÞ\Ý[Kš[œÊ
Kš\ÔÙ[™ÖÙWOHL\Ù\–œÔÞ\Ý[Kš[œÊ
KœÙ[™Ù]]UÙZJJÌJNÙ[Ù^Ý˜\ˆO]\ÖÈœšXÙRXÛÛˆŠÙWK™Ù]šXÙJ
NÚYŠXÝÜ‹žXJ\™]\›ˆ\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛÈŠK›ÚYšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNÚYŠOOYJ^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][TÝÜ™NÙ›ÜŠ˜\ˆˆ[ˆÊZYŠŒOO\ÖÛ—Kš][RY
\™]\›ˆ›ÚY\Ë˜^QÛÛÙÒYØNM
ÖÛ—KšY
_Y[ÙHYŠOYJ^Ý˜\ˆÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][TÝÜ™NÙ›ÜŠ˜\ˆˆ[ˆÊZYŠŒLO\ÖÛ—Kš][RY
\™]\›ˆ›ÚY\Ë˜^QÛÛÙÒYØNM
ÖÛ—KšY
____KKœ›ÝÝ\K˜^QÛÛÙÒYØNMY[˜Ý[ÛŠ
^ÔÚÜš[œÊ
KœÚÜ]K˜ÚXÚÐ^QÛÛÙÒY

I‰•šY]ÓYÜ‹š[œÊ
K›Ü[Š^UšY]Ë
_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ØZ[–œÕšY]Ëœ›ÝÝ\K‘ØZ[–œÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊØZ[–œÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆZZšSX\›’][T™[™\™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš\ÔÙ[XÝYHLKKœÚÚ[“˜[YOH”ÚÚ[“ZZšSX\›’][H‹Kš][Kš\ÔÚÝÏHLK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë™]NÝ\Ëš][K™]O]š][K\ËžZ^YKš\ÚX›OHL\ËœÙ[XÝš\ÚX›O]\Ëš\ÔÙ[XÝYš\ÓØÚÏÝ\ËžZ^YKœÛÝ\˜ÙOHX[œÚ^Z\Ý[ÈŽš\ÛX\›Ý\ËžZ^YKœÛÝ\˜ÙOHX[œÚ^Z^YHŽ\ËžZ^YKš\ÚX›OHL_KKœ›ÝÝ\KœÙ]Ù[XÝ[™^Y[˜Ý[ÛŠ
^Ý\ËœÙ[XÝš\ÚX›O]K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
ZZšSX\›’][T™[™\™\‹œ›ÝÝ\K“ZZšSX\›’][T™[™\™\ˆŠNÝ˜\ˆZZšSX\›•šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”ÚÚ[“ZZšSX\›ˆ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\Ëš][S\Ýš][T™[™\™\SZZšSX\›’][T™[™\™\‹\Ëš][TØÜ›Û\‹šY]ÜÜ]\Ëš][S\Ý\Ëš\ÕÜ]™[HL\Ë›[šË^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\ŠOðèXÚš8n«[ÝOˆŠ_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ›ÛR[™^]ÌK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
K\Ëš][S\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û’][U\]™[ØNM\ÊK\Ë˜YÝXÚ]™[
\ËœÛY[‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›[šË\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ë\]R][R[™›×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\Ë\]R][R[™›×ØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ë\]R][R[™›×ØNM
K\Ë˜ÛX\‘]J
K\Ë\]R][R[™›×ØNM
L
_KKœ›ÝÝ\KœÛÜ[—ØNMY[˜Ý[ÛŠJ^Ý˜\ˆOU\Ù\“ZZšKš[œÊ
KÏPÛÛ™šYÓZRšTÚÚ[™Ù]ÚÚ[QžR][J˜ÛÛ™šYÒQ
KPÛÛ™šYÓZRšTÚÚ[™Ù]ÚÚ[QžR][JK˜ÛÛ™šYÒQ
NÜ™]\›ˆOOZKš\ÔÜXÚYšXÔÚÚ[Ù”›ÛJ\Ëœ›ÛR[™^ÊOÌNŒOOZKš\ÔÜXÚYšXÔÚÚ[Ù”›ÛJ\Ëœ›ÛR[™^ŠOËLN˜ÛÛ™šYÒQK˜ÛÛ™šYÒQËLN˜ÛÛ™šYÒQ™K˜ÛÛ™šYÒQÌNŒKKœ›ÝÝ\K\]R][R[™›×ØNMY[˜Ý[ÛŠ
^Ý›ÚYOO]	‰ŠHLJNÝ˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\JŠNÙKœÛÜ
\ËœÛÜ[—ØNM˜š[™
\ÊJNÙ›ÜŠ˜\ˆOV×KÏLÜÏK›[™ÝÜÊÊÊ^Ý˜\ˆPÛÛ™šYÓZRšTÚÚ[™Ù]ÚÚ[QžR][JVÜ×K˜ÛÛ™šYÒQ
KÏ[™]ÈØš™XÝÛËš\ÛX\›U\Ù\“ZZšKš[œÊ
Kš\ÔÜXÚYšXÔÚÚ[Ù”›ÛJ\Ëœ›ÛR[™^ŠKËš\ÓØÚÏU\Ù\“ZZšKš[œÊ
K›ZZšR\ÓØÚÊ\Ëœ›ÛR[™^ŠKËš][OYVÜ×KKœ\Ú
Ê_]\Ëš][S\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠJK	‰™K›[™Ý	‰Š\ËœÙ]]JVÌJK\Ëš][S\ÝœÙ[XÝY[™^L
_KKœ›ÝÝ\KœÙ]]OY[˜Ý[ÛŠ
^Ý\Ë›ZZšSX\›’XÛÛ‹™]OPÛÛ™šYÓZRšTÚÚ[™Ù]ÚÚ[QžR][J˜ÛÛ™šYÒQ
NÝ˜\ˆOPÛÛ™šYÒ][K™Ù]]X[]PÛÛÜŠš][PÛÛ™šYÊKÔÝš[™ÊMŠNÝ\Ë›ZZšS˜[YK^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š›ÛÛÛÜIÈÈŠÙJÈ‰ÏˆŠÝš][PÛÛ™šYË›˜[YJÈÙ›ÛˆŠK\Ëš[™›Ë^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJš][PÛÛ™šYË™\ØÊK\Ë›ZZšSX\›’XÛÛ‹š\ÚX›OHLÝ˜\ˆOPÛÛ™šYÓZRšTÚÚ[™Ù]ÚÚ[QžR][J˜ÛÛ™šYÒQ
KÏU\Ù\“ZZšKš[œÊ
Kš\ÔÜXÚYšXÔÚÚ[Ù”›ÛJ\Ëœ›ÛR[™^JNÝ\ËœÛY[‹™[˜X›YH\Ë\Ù\“ZZšKš[œÊ
K›ZZšR\ÓØÚÊ\Ëœ›ÛR[™^JOÊ\ËœÛY[‹›X™[H±$0èÈÚ0ìØH‹\ËœÛY[‹™[˜X›YHLJN\ËœÛY[‹›X™[\ÏÈ±$0èÈ8nãXÈŽˆ±$8n­Ý°èÈ‹\Ë˜Ý\“˜[YO]š][PÛÛ™šYË›˜[Y_KKœ›ÝÝ\K˜ÛX\‘]OY[˜Ý[ÛŠ
^Ý\Ëš][S\ÝœÙ[XÝY[™^KLK\Ë›ZZšSX\›’XÛÛ‹š\ÚX›OHLK\Ë›ZZšSX\›’XÛÛ‹™]O[[\Ëš[™›Ë^Hˆ‹\Ë˜Ý\“˜[YOHˆ‹\Ë›ZZšS˜[YK^HˆŸKKœ›ÝÝ\K›Û’][U\]™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ëš][S\Ý™]T›ÝšY\‹™Ù]][P]
š][R[™^
NÝ\ËœÙ]]JKš][JNÙ›ÜŠ˜\ˆO]\Ëš][S\Ý›[PÚ[™[‹ÏLÚOœÎÜÊÊÊ^Ý˜\ˆ]\Ëš][S\Ý™Ù]Ú[]
ÊNÛ‰‰›‹œÙ]Ù[XÝ[™^
ÏO]š][R[™^
__KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ˜Ø\ÙH\Ë˜ÛÜÙPŒ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\ËœÛY[ŽšYŠ\Ë›ZZšSX\›’XÛÛ‹™]OL
\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê•ZH0ì›™ÈÚ8nã[ˆønîH± Û™ÈHŠNÝ˜\ˆO]\Ë›ZZšSX\›’XÛÛ‹™]JÌNÙO]\Ë›ZZšSX\›’XÛÛ‹™]KLNÑÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÑÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[Ý\Ë›ZZšSX\›’XÛÛ‹™]WKš][WK›˜[YNÕ\Ù\“ZZšKš[œÊ
KœÜÝÙ[XÝYZZšJ\Ë›ZZšSX\›’XÛÛ‹™]K\Ë˜Ý\“˜[YJK\Ë˜ÛX\‘]J
KšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë›[šÎ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊK\Ù\•Ø\›‹š[œÊ
KœÙ]^QÛÛÙÕØ\›ŠŒNKJ__KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
K\Ëš][S\Ýœ™[[Ý™Q]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û’][U\]™[ØNM\ÊK\Ëœ™[[Ý™UÝXÚ]™[
\ËœÛY[‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë›[šË\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™SØœÙ\™J
_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ZZšSX\›•šY]Ëœ›ÝÝ\K“ZZšSX\›•šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊZZšSX\›•šY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆZZšSØÚÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Ý\”›ÛOLKœÙ[][OLKš\Ñš\œÝHLKœÚÚ[“˜[YOH”ÚÚ[“ZZšSØÚÈ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\Ë›ZZšPœÏVÝ\Ë›ZZšPŒ\Ë›ZZšPŒK\Ë›ZZšPŒ‹\Ë›ZZšPŒË\Ë›ZZšP\Ë›ZZšPK\Ë›ZZšP‹\Ë›ZZšP×K\Ë›[šË^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\ŠO“š8n«[ˆ¸n«]8nª[OÝOˆŠK\Ëœ›ÛTÙ[XÝšYUÜ

_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëš\Ñš\œÝHL\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\ËœÛY[‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›[šË\Ë›ÛÛXÚ×ØNM
K\Ë˜YÚ[™ÙQ]™[
\Ëœ›ÛTÙ[XÝ\Ë›ÛÚ[™ÙQ]™[ØNM
K\Ë˜YÝXÚ[™]™[
\Ë›Ý\”™XÝ\Ë›Ý\ÛÜÙWØNM
NÙ›ÜŠ˜\ˆH[ˆ\Ë›ZZšPœÊ]\Ë˜YÝXÚ]™[
\Ë›ZZšPœÖÚWK\Ë›ÛÛXÚ×ØNM
NÝ\Ë›ØœÙ\™J\Ù\“ZZšKš[œÊ
KœÜÝZZšSØÚÒ[™›Ë\ËœÙ]]JKÌOOU\Ù\“ZZšKQÓÔSÝ\Ë˜˜YÔÙ[XÝ[™^ØNM

NŠ\Ëœ›ÛTÙ[XÝœÙ]Ý\”›ÛJ\Ó˜SŠÌJOÌÌJK\ËœÙ[][O]\Ë™Ù]›ÛZ[™^ØNM
\Ó˜SŠÌJOÌÌJJK\ËœÙ]Ý\”›ÛJ\Ëœ›ÛTÙ[XÝ™Ù]Ý\”›ÛJ
JK\Ëœ›ÛTÙ[XÝ˜Ú[™ÙUX“˜[YJ’Ú0ìØH0åðèXÚŠ_KKœ›ÝÝ\K›Ý\ÛÜÙWØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙW_KKœ›ÝÝ\K›ÛÚ[™ÙQ]™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ëœ›ÛTÙ[XÝ™Ù]Ý\”›ÛJ
NÝ\Ëš\Ñš\œÝ
\ËœÙ[][O]\Ë™Ù]›ÛZ[™^ØNM
JJK\Ëš\Ñš\œÝHLK\ËœÙ]Ý\”›ÛJJ_KKœ›ÝÝ\KœÙ]Ý\”›ÛOY[˜Ý[ÛŠ
^Ý\Ë˜Ý\”›ÛO]\ËœÙ]]J
_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\ËœÛY[ŽšYŠ]\Ë›ZZšPœÖÝ\ËœÙ[][W_]\Ë›ZZšPœÖÝ\ËœÙ[][WK™]J\™]\›ŽÝ˜\ˆO]\Ë›ZZšPœÖÝ\ËœÙ[][WK™]NÚYŠKš\ÓØÚÙY
\™]\›ˆ›ÚY\Ù\“ZZšKš[œÊ
KœÙ[™ZZšQ[ØÚÊ\Ë˜Ý\”›ÛKKšY
NÕ\Ù\“ZZšKš[œÊ
KœÙ[™ZZšPYØÚÊ\Ë˜Ý\”›ÛKKšY
NØœ™XZÎØØ\ÙH\Ë›[šÎ•\Ù\•Ø\›‹š[œÊ
KœÙ]^QÛÛÙÕØ\›ŠÛØ˜[ÛÛ™šYËÛÛ™šYÓZZšP˜\ÙK›ØÚÒYJNØœ™XZÎÙY˜][˜\ˆO]\Ë›ZZšPœËš[™^ÙŠ\™Ù]œ\™[
KÏ]\Ë›ZZšPœÖÚWK™]NÚYŠ]\Ë›ZZšPœÖÚW_\Ê\™]\›ŽÚYŠO\ËšY
\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÐÙ[\•\Ê°åðèXÚÚ1¬H8nãXÈpê›ˆ1¬Ú0í™È8nàÈÚ0ìØHŠNÝ\ËœÙ[][OZNÝ˜\ˆU\Ù\“ZZšKš[œÊ
NÚYŠ[‹™ÜšY\ËœÙ[][O[‹™ÜšY
\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊÚ1¬HxnçÈŠNÝ\Ë\]P”Ý]WØNM

__KKœ›ÝÝ\K\]P”Ý]WØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLÝ\Ë›ZZšPœË›[™ÝÝ
ÊÊ]\Ë›ZZšPœÖÝKœÙ]Ù[XÝY
LJNÝ\Ë›XÛÝ[^Hˆ‹\Ë›[šËš\ÚX›OHLNÝ˜\ˆOU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐÛÝ[žRY
\Ù\˜YÔÞ\Ý[KQ×ÕTWÓÕT‹ÛØ˜[ÛÛ™šYËÛÛ™šYÓZZšP˜\ÙK›ØÚÒY
KOYOŒÚYŠI‰Š\Ë›XÛÝ[^H•¸n«]8nª[Hðì›ˆ8n¨Z{ï&ˆŠÙJK\Ë›[šËš\ÚX›OHZK\ËœÙ[][O
\™]\›ˆ\ËœÛY[‹›X™[H’Ú0ìØH0íðèXÚ‹›ÚY
\ËœÛY[‹™š[\œÏQš[\•][T”VWÑÔVWÑ’STŠNÝ\Ë›ZZšPœÖÝ\ËœÙ[][WKœÙ]Ù[XÝY
L
NÝ˜\ˆÏ]\Ë›ZZšPœÖÝ\ËœÙ[][WK™]NÜËš\ÓØÚÙYÊ\ËœÛY[‹›X™[H“xnçÈÚ0ìØH0íðèXÚ‹\ËœÛY[‹™š[\œÏV×JNŠ\ËœÛY[‹›X™[H’Ú0ìØH0íðèXÚ‹\ËœÛY[‹™š[\œÏZOÖ×N‘š[\•][T”VWÑÔVWÑ’STŠ_KKœ›ÝÝ\KœÙ]]OY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆU\Ù\“ZZšKš[œÊ
KOHLOLÎšNÚJÊÊZYŠ\œ›Ü“ÙË\ÜÙ\
›ZZšK“ZZšT[™[]K›ZZšH\È[ŠJ]\Ë›ZZšPœÖÚWK™]O[[Ù[Ù^Ý˜\ˆÏ]›ZZšVÝ\Ë˜Ý\”›ÛWNÑ\œ›Ü“ÙË\ÜÙ\
Ë“ZZšT[™[[S\Ý\È[›ÛRYHŠÝ\Ë˜Ý\”›ÛJOÝ\Ë›ZZšPœÖÚWK™]O[[Š\Ë›ZZšPœÖÚWK™]O\ÖÚWOÜÖÚWN›[ÖÚWI‰ŒO\ÖÚWKšYÝ\Ë›ZZšPœÖÚWKœÙ][›X\›ŠL
N\Ë›ZZšPœÖÚWKœÙ][›X\›ŠLJKÖÚW_I‰Š\Ë›ZZšPœÖÚWKœÙ]ÛÝ[X™[
JKOHLJJ_]\Ë\]P”Ý]WØNM

_KKœ›ÝÝ\K™Ù]›ÛZ[™^ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOU\Ù\“ZZšKš[œÊ
K›ZZšVÝKOLÚOK›[™ÝÚJÊÊZYŠOYVÚWKšY
\™]\›ˆNÜ™]\›‹L_KKœ›ÝÝ\K˜˜YÔÙ[XÝ[™^ØNMY[˜Ý[ÛŠ
^Ý˜\ˆLOHLNÝ\ËœÙ[][OLÙ›ÜŠ˜\ˆOTÝX”›Û\Ëš[œÊ
KœÝX”›Û\Ó[‹ÏLÚOœÎÜÊÊÊ^Ù›ÜŠ˜\ˆU\Ù\“ZZšKš[œÊ
K›ZZšVÜ×KÏLÛÏ‹›[™ÝÛÊÊÊZYŠO[–Û×KšY	‰ŒO[–Û×Kš\ÓØÚÙY
^Ý\Ë\ËœÙ[][O[ËOHLØœ™XZßZYŠJXœ™XZß]\Ëœ›ÛTÙ[XÝœÙ]Ý\”›ÛJ
_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ZZšSØÚÕšY]Ëœ›ÝÝ\K“ZZšSØÚÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊZZšSØÚÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆZZšU\šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[“ZZšU\‹\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëš][K™]O]ÌKšYÝ˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÑÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[ÝÌKšYKš][WNÝ\Ëš[™›Ë^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJK›˜[YJÈ——ˆŠÚK™\ØÊK\ËœÝÙ\‹^H±$xnàÛ{ï&ˆŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[ÝÌKšYKœÝÙ\‹\Ë˜YÝXÚ]™[
\Ë\Ë›ÛÛÜÙWØNM
_KKœ›ÝÝ\K›ÛÛÜÙWØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë\Ë›ÛÛÜÙWØNM
_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ZZšU\šY]Ëœ›ÝÝ\K“ZZšU\šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊZZšU\šY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆZRšUZšX[•šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH“ZZšTÝÔÚÚ[ˆ‹\Ë›ZZšS\Ýš][T™[™\™\R][P˜\ÙS›Õ\\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÂ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë›ZZšS\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û’][U\]™[ØNM\ÊK\Ë˜YÝXÚ]™[
\Ë›ZZšSÜ[‹\Ë›ÛÛXÚ×ØNM
K\Ë\]Q]WØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë›ZZšS\Ýœ™[[Ý™Q]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û’][U\]™[ØNM\ÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë›ZZšSÜ[‹\Ë›ÛÛXÚ×ØNM
_KKœ›ÝÝ\K\]Q]WØNMY[˜Ý[ÛŠ
^Ý\Ë›ZZšSÜ[‹^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š›ÛO“š8n«[ˆ]XH±¬1¨[™ÈÚxn¨È˜[š°èOÝOÙ›ÛˆŠNÙ›ÜŠ˜\ˆV×KOLOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][NÙOK›[™ÝÙJÊÊ^Ý˜\ˆÏZVÙWNÌOPÛÛ™šYÒ][K™Ù]\JÊI‰œ\Ú
ËšY
_]\Ë›ZZšS\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ
K›[™Ý	‰Š\ËœÙ]]JÌJK\Ë›ZZšS\ÝœÙ[XÝY[™^L
_KKœ›ÝÝ\K›Û’][U\]™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë›ZZšS\Ý™]T›ÝšY\‹™Ù]][P]
š][R[™^
NÝ\ËœÙ]]JJ_KKœ›ÝÝ\KœÙ]]OY[˜Ý[ÛŠ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÒ][VÝNÝ\Ë›ZZšRXÛÛ‹œÙ]]JJNÝ˜\ˆOPÛÛ™šYÒ][K™Ù]]X[]PÛÛÜŠJKÔÝš[™ÊMŠNÝ\Ëš[™›Ë^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š›ÛÛÛÜIÈÈŠÚJÈ‰ÏˆŠÙK›˜[YJÈÙ›Û—ˆŠÙK™\ØÊK\Ë›ZZšRXÛÛ‹š\ÚX›OHLÙ›ÜŠ˜\ˆÏLLLÏQÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[ÛË›[™ÝÛŠÊÊ^Ý˜\ˆO[ÖÛ—NØKš][OO]	‰ŠÏXKšY
_]\ËœÝÙ\‹^H±$xnàÛ{ï&ˆŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[Ü×KœÝÙ\ŸKKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë›ZZšSÜ[Ž•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊK\Ù\•Ø\›‹š[œÊ
KœÙ]^QÛÛÙÕØ\›ŠŒNKJ__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ZRšUZšX[•šY]Ëœ›ÝÝ\K“ZRšUZšX[•šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊZRšUZšX[•šY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆZZšVššY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[“ZZšVš‹\Ëš][S\Ýš][T™[™\™\R][P˜\ÙS›Õ\\Ëš][TØÜ›Û\‹šY]ÜÜ]\Ëš][S\Ý\ËÝXÚÚ[™[HL\Ë›ZZšR][LÝXÚ[˜X›YHL\Ë›ZZšR][LÝXÚÚ[™[HL\Ë›ZZšR][LKÝXÚ[˜X›YHL\Ë›ZZšR][LKÝXÚÚ[™[HL\Ë›ZZšR][L‹ÝXÚ[˜X›YHL\Ë›ZZšR][L‹ÝXÚÚ[™[HL\Ë›XÑY™ŒO[™]ÈXÐ[š[X][Û‹\Ë›XÑY™ŒKžNË\Ë›XÑY™ŒKžOLLŽK\Ë›XÑY™Œ[™]ÈXÐ[š[X][Û‹\Ë›XÑY™Œ‹žLMÌË\Ë›XÑY™Œ‹žOLLŽK\Ë›XÑY™ŒÏ[™]ÈXÐ[š[X][Û‹\Ë›XÑY™ŒËžLŒË\Ë›XÑY™ŒËžOLLŽK\Ë›˜[YP\œV×K\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Û’][U\ØNMY[˜Ý[ÛŠ
^ÚYŠJ\Ë›ZZšR][L™]I‰\Ë›ZZšR][LK™]I‰\Ë›ZZšR][L‹™]JJ^Ý˜\ˆO]š][K˜ÛÝ[OPÛÛ™šYÓZRšTÚÚ[™Ù]ÚÚ[QžR][Jš][K˜ÛÛ™šYÒQ
NÝ\Ë›ZZšR][L™]OOZI‰™KKK\Ë›ZZšR][LK™]OOZI‰™KKK\Ë›ZZšR][L‹™]OOZI‰™KKNÝ˜\ˆÏH’Ú0í™È1$xnéÈpê›ˆ1¬ŽÚYŠYJ\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊÊNÝ\Ë›ZZšR][L™]OÝ\Ë›ZZšR][LK™]OÝ\Ë›ZZšR][L‹™]_
\Ë›ZZšR][L‹™]OZK\Ë›˜[YP\œ–Ì—O]š][Kš][PÛÛ™šYË›˜[YJNŠ\Ë›ZZšR][LK™]OZK\Ë›˜[YP\œ–ÌWO]š][Kš][PÛÛ™šYË›˜[YJNŠ\Ë›ZZšR][L™]OZK\Ë›˜[YP\œ–ÌO]š][Kš][PÛÛ™šYË›˜[YJK\Ë›ZZšR][LË™]OHˆŸ_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\ËœÛY[‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›ZZšR][L\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›ZZšR][LK\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›ZZšR][L‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë›ZZšR][LË\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜™ÐÛÜÙK\Ë›ÛÛXÚ×ØNM
K\Ëš][S\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û’][U\ØNM\ÊK\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PY\Ë\]R][WØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][Q[\Ë\]R][WØNM
K\Ë›ØœÙ\™J\Ù\˜YÔÞ\Ý[Kš[œÊ
KœÜÝ][PÚ[™ÙK\Ë\]R][WØNM
K\Ë›ØœÙ\™J\Ù\“ZZšKš[œÊ
KœÜÝZZšPÚ[™ÙR[™›Ë\ËœÚÝÔ™\Ý[ØNM
K\Ë˜ÛX\‘]WØNM

K\Ë\]R][WØNM

_KKœ›ÝÝ\KœÛÜ[×ØNMY[˜Ý[ÛŠJ^Ü™]\›ˆ˜ÛÛ™šYÒQK˜ÛÛ™šYÒQËLN˜ÛÛ™šYÒQ™K˜ÛÛ™šYÒQÌNŒKKœ›ÝÝ\K\]R][WØNMY[˜Ý[ÛŠ
^Ý˜\ˆU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÑÛÛÙÐžU\JŠNÝœÛÜ
\ËœÛÜ[×ØNM
K\Ëš][S\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ
_KKœ›ÝÝ\K˜ÛX\‘]WØNMY[˜Ý[ÛŠ
^Ý\Ëš][S\ÝœÙ[XÝY[™^KLK\Ë›ZZšR][L™]OHˆ‹\Ë›ZZšR][LK™]OHˆ‹\Ë›ZZšR][L‹™]OHˆ‹\Ë›ZZšR][LË™]OHˆŸKKœ›ÝÝ\Kœ^QY™™XÝØNMY[˜Ý[ÛŠ
^Ý\Ë›XÑY™ŒKœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ™›Ü™ÙTÝXØÙ\ÜÈ‹JK\Ë˜[šYÜ›Ý\˜YÚ[
\Ë›XÑY™ŒJK\Ë›XÑY™Œ‹œ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ™›Ü™ÙTÝXØÙ\ÜÈ‹JK\Ë˜[šYÜ›Ý\˜YÚ[
\Ë›XÑY™ŒŠK\Ë›XÑY™ŒËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ™›Ü™ÙTÝXØÙ\ÜÈ‹JK\Ë˜[šYÜ›Ý\˜YÚ[
\Ë›XÑY™ŒÊ_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\ËœÛY[ŽšYŠ]\Ë›ZZšR][L™]_]\Ë›ZZšR][LK™]_]\Ë›ZZšR][L‹™]J\™]\›ˆ›ÚY\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê•ZH0ì›™È1$xn­ÝÈ]^xnàÛˆpê›ˆ1¬±¬8næØÈŠNÕØ\›•šY]ËœÚÝÊðìÈ]xnä[ˆpêH[È8à"ˆŠÝ\Ë›˜[YP\œ–ÌJÈ¸à"øà xà"ˆŠÝ\Ë›˜[YP\œ–ÌWJÈ¸à"øà xà"ˆŠÝ\Ë›˜[YP\œ–Ì—JÈ¸à"ñ$xnàÈ1$xnåZH™ønªÝHšpê›ˆ0èšH]^xnàÛˆpê›ˆ1¬xnæÚHÚ0í™ûï'È‹[˜Ý[ÛŠ
^Ý˜\ˆYK›ZZšR][L™]KOYK›ZZšR][LK™]KÏYK›ZZšR][L‹™]NÕ\Ù\“ZZšKš[œÊ
KœÙ[™ZZšPÚ[™ÙJKÊKK˜ÛX\‘]WØNM

KKœ^QY™™XÝØNM

_K\ÊNØœ™XZÎØØ\ÙH\Ë˜ÛÜÙPŽ˜Ø\ÙH\Ë˜ÛÜÙPŒ˜Ø\ÙH\Ë˜™ÐÛÜÙN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\Ë›ZZšR][L˜Ø\ÙH\Ë›ZZšR][LN˜Ø\ÙH\Ë›ZZšR][LŽ˜Ý\œ™[\™Ù]™]OHˆŽØœ™XZÎØØ\ÙH\Ë›ZZšR][LÎšYŠ\Ë›ZZšR][LÉ‰\Ë›ZZšR][LË™]J^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÓZRšTÚÚ[Ý\Ë›ZZšR][LË™]WNÚYŠJ^Ý˜\ˆÏU\Ù\˜YÔÞ\Ý[Kš[œÊ
K™Ù]˜YÒ][PžRY
Kš][JNÜÉ‰•šY]ÓYÜ‹š[œÊ
K›Ü[Š][Q]Z[YUÚ[‹Ëš][PÛÛ™šYËšYË˜ÛÝ[
____KKœ›ÝÝ\KœÚÝÔ™\Ý[ØNMY[˜Ý[ÛŠ
^Ý\Ë›ZZšR][LË™]OPÛÛ™šYÓZRšTÚÚ[™Ù]ÚÚ[QžR][J
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\ËœÛY[‹\Ë›ÛÛXÚ×ØNM
K\Ëš][S\Ýœ™[[Ý™Q]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û’][U\ØNM\ÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë›ZZšR][L\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë›ZZšR][LK\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë›ZZšR][L‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™SØœÙ\™J
K\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›XÑY™ŒJK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›XÑY™ŒŠK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\Ë›XÑY™ŒÊ_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
ZZšVššY]Ëœ›ÝÝ\K“ZZšVššY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊZZšVššY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆœÐ›ÜÜÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœ›Û\\ÝVÈˆ‹’0íH˜^H¸n¨[ˆ1$pèÈ[HÚXHøn¨]1$xnæ[™ÈH8n©Ûˆ¸näÚK0èÞH]X^H8n¨ZH°èÈ™ðèHXZH‹±$[™È›Û™ÈÑ8nëH0èXÚ‹“ÔÔÈÚ^xnàÛˆÚ[š1$pèÈ¸nâÈpêHxnáÝ‹’Ú0í™ÈðìÈ›ÜÜÈ°èÈ1$xnéÈ1$Zxnà]HÚxnáÛˆ‹’øn¨]1$xnæ[™ÈÚ1¬HxnçÈ‹±$[™È›Û™È0ìÈ¸n¨Ûˆ—KK™š\œÝÚÝÕÚ[HLKK—ØÛX\“Ý\HLKK˜Ø[Ú[™ÙOHLKœÞ\ÒYTXÚØYÙRQ–œÐ›ÜÜËKœ™YÓ™]\ÙÊKKœÜÝ›ÜÜÓ\Ý™\Ý[
KKœ™YÓ™]\ÙÊ‹KœÜÝ›ÜÜÓÜ[”™\Ý[
KKœ™YÓ™]\ÙÊËKœÜÝœ›XZ[•[YT™\Ý[
KKœ™YÓ™]\ÙÊKœÜÝ˜[šÒ[™›Ô™\Ý[
KKœ™YÓ™]\ÙÊKKœÜÝÝ\žR[™›Ô™\Ý[
KKœ™YÓ™]\ÙÊËKœÜÝÚ[[™ÙT™\Ý[
KKœ™YÓ™]\ÙÊKœÜÝY[”Ú[™\Ý[
KKœ™YÓ™]\ÙÊKKœÜÝÚ[”™\Ý[
KKœ™YÓ™]\ÙÊLKK™ÑÙ]^TÚ[™\Ý[
KKœ™YÓ™]\ÙÊL‹K™Õ[ÓX^Ú[™\Ý[
K_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\KœÙ[™Ù]›ÜÜÓ\ÝY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊJ_KKœ›ÝÝ\KœÙ[™™\]\ÝÚ[[™ÙOY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊÊ_KKœ›ÝÝ\KœÙ[™™\]\Ý›ÜÜÔ˜[šÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\Ê
NÙKÜš]R[

K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\KœÙ[™›Ú[ÚÝZšX[™ÏY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊJ_KKœ›ÝÝ\KœÙ[™^PÙY[˜Ý[ÛŠ
^Ý\ËœÙ[™˜\ÙT›ÝÊŠ_KKœ›ÝÝ\KœÜÝ›ÜÜÓ\Ý™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYÚÜ

NÝ\Ë˜›ÜÜÒ[™›Ó\ÝV×NÙ›ÜŠ˜\ˆOLÙOšNÚJÊÊ]\Ë˜›ÜÜÒ[™›Ó\Ýœ\Ú
™]È›ÜÜÒ[™›Ñ]J
JNÝ\Ë˜[]™P›ÜÜÓ[O]œ™XYÚÜ

_KKœ›ÝÝ\K™Ù]›ÜÜÓ\Ý[™ÝY[˜Ý[ÛŠ
^Ý˜\ˆLÜ™]\›ˆ[O]\Ë˜›ÜÜÒ[™›Ó\Ý	‰Š]\Ë˜›ÜÜÒ[™›Ó\Ý›[™Ý
KKKœ›ÝÝ\K™Ù]›ÜÜÒ[™›ÐžR[™^Y[˜Ý[ÛŠ
^Ý˜\ˆO[[Ü™]\›ˆ[O]\Ë˜›ÜÜÒ[™›Ó\Ý	‰L	‰\Ë˜›ÜÜÒ[™›Ó\Ý›[™Ý	‰ŠO]\Ë˜›ÜÜÒ[™›Ó\ÝÝJK_KKœ›ÝÝ\KœÜÝ›ÜÜÓÜ[”™\Ý[Y[˜Ý[ÛŠ
^Ý\Ë˜XÒ\ÓÜ[]œ™XY›ÛÛX[Š
K\Ë˜XÒ\ÓÜ[Õ\Ù\–œÔÞ\Ý[Kš[œÊ
K›Œ	‰•\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
KÛÜ››ÜÜÓY[YVÕ\Ù\›ÜÜÙ\ÔÞ\Ý[K“ÔÔ×ÔÕP•TWÕÓÔ““ÔÔ×I‰•\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
KœÜÝ›ÜÜÙ\Ñ]JL\Ë˜ÚXÚÐØ[”^P›ÜÜÓ˜[YJ
JN\Ëœ™[]™U[YOLKKœ›ÝÝ\KœÜÝœ›XZ[•[YT™\Ý[Y[˜Ý[ÛŠ
^Ý\Ëœ™[XZ[•[YO]œ™XYÚÜ

K\Ëœ™[]™U[YO]œ™XYÚÜ

_KKœ›ÝÝ\KœÜÝ˜[šÒ[™›Ô™\Ý[Y[˜Ý[ÛŠ
^Ý\Ëœ\œÙP›ÜÜÔ˜[šÓ\Ý

_KKœ›ÝÝ\KœÜÝÝ\žR[™›Ô™\Ý[Y[˜Ý[ÛŠ
^Ý\Ë›Ý\žR][RY]œ™XY[

KšY]ÓYÜ‹š[œÊ
K›Ü[Š”Ð›ÜÜÓÝ\žUšY]Ê_KKœ›ÝÝ\KœÜÝÚ[[™ÙT™\Ý[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
NÚOŒÕ\Ù\•\Ëš[œÊ
KœÚÝÕ\ÊKš[œÊ
Kœ›Û\\ÝÚWJNŒOZI‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ›ÜÜÙ\ÕÚ[Š_KKœ›ÝÝ\KœÜÝY[”Ú[™\Ý[Y[˜Ý[ÛŠ
^Ý\ËšY[]œ™XY[

_KKœ›ÝÝ\KœÜÝÚ[”™\Ý[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆKOVÝœ™XYÝš[™Ê
Kœ™XYÝš[™Ê
Kœ™XYÚÜ

WKÏ]œ™XYÚÜ

KV×KÏLÜÏ›ÎÛÊÊÊYO[™]È]Ø\™Ñ]KKœ\œÙ\Š
K‹œ\Ú
JNÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠœÐ›ÜÜÔ™\Ý[šY]ËKŠ_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\Kœ™[]™U[YH‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Ü™[]™U[Y_KÙ]™[˜Ý[ÛŠ
^Ý\Ë—Ü™[]™U[YHO]	‰Š\Ë—Ü™[]™U[YO][Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë[YPÛØÚ×ØNM\ÊK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLË\Ë—Ü™[]™U[YK\Ë[YPÛØÚ×ØNM\ÊJ_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\K[YPÛØÚ×ØNMY[˜Ý[ÛŠ
^Ý\Ë—Ü™[]™U[YKKK\Ë—Ü™[]™U[YOL	‰•[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë[YPÛØÚ×ØNM\Ê_KKœ›ÝÝ\Kœ\œÙP›ÜÜÔ˜[šÓ\ÝY[˜Ý[ÛŠ
^Ý\Ë˜›ÜÜÔ˜[šÓ\ÝV×NÙ›ÜŠ˜\ˆOJœ™XY[

Kœ™XYÚÜ

JKOLÙOšNÚJÊÊ]\Ë˜›ÜÜÔ˜[šÓ\Ýœ\Ú
™]È›ÜÜÔ˜[šÒ[™›ÊJÌJJ_KKœ›ÝÝ\K™Ù]˜\“\ÝY[˜Ý[ÛŠ
^ÚYŠ\Ë˜˜\“\Ý	‰\Ë˜˜\“\Ý›[™ÝŒ
\™]\›ˆ\Ë˜˜\“\ÝÝ\Ë˜˜\“\Ý
\Ë˜˜\“\ÝV×JNÙ›ÜŠ˜\ˆOLNÍO™NÙJÊÊ]QÛØ˜[ÛÛ™šYËÛÛ™šYÓÝ\›ÜÜÌVÙWK\Ë˜˜\“\Ýœ\Ú
›[Z]
È‹HŠÈÚ^xnàÛˆŠÝš[Z]
ÈˆŠNÜ™]\›ˆ\Ë˜˜\“\ÝKKœ›ÝÝ\Kš\ÖœÐ›ÜÜÑ˜Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆKOLNÍOšNÚJÊÊZYŠOQÛØ˜[ÛÛ™šYËÛÛ™šYÓÝ\›ÜÜÌVÚWKOYK™˜šY
\™]\›ˆLÜ™]\›ˆL_KKœ›ÝÝ\K˜ÚXÚÒ\Ó[Ü™S[Û™^OY[˜Ý[ÛŠ
^Ü™]\›ˆXÝÜ‹žXQÛØ˜[ÛÛ™šYËÛÛ™šYÕÛÜ››ÜÜÐ˜\ÙK˜ÛX\ÙÛÜÝÕ\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
K˜Ý\œ›ÜÜÔÝX•\KLW_KKœ›ÝÝ\K˜ÚXÚÒ\ÔÚÝÓ›ÝXÙUÚ[Y[˜Ý[ÛŠ
^Ü™]\›ˆL_KKœ›ÝÝ\K˜ÚXÚÐØ[”^P›ÜÜÒ[™^Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOU\Ù\–œÔÞ\Ý[Kš[œÊ
K›‹OMÚOLNÚKKJZYŠQÛØ˜[ÛÛ™šYËÛÛ™šYÓÝ\›ÜÜÌVÚWKO]›[Z]	‰™O]š[Z]	‰\Ë˜[]™P›ÜÜÓ[OZJ\™]\›ˆNÜ™]\›ˆKKœ›ÝÝ\K˜ÚXÚÐØ[”^P›ÜÜÓ˜[YOY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë˜ÚXÚÐØ[”^P›ÜÜÒ[™^

NÚYŠŒ
^Ý˜\ˆOQÛØ˜[ÛÛ™šYËÛÛ™šYÓÝ\›ÜÜÌVÝNÜ™]\›ˆÛØ˜[ÛÛ™šYËÛÛ™šYÓ[ÛœÝ\œÖÙK˜›ÜÜÒYK›˜[Y_\™]\›ˆ›ÜÜÈÚ^xnàÛˆÚ[šŸKØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K˜ÛX\“Ý\ˆ‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ØÛX\“Ý\ŸKÙ]™[˜Ý[ÛŠ
^Ý\Ë—ØÛX\“Ý\ˆO]	‰Š\Ë—ØÛX\“Ý\]\Ë˜Ø[Ú[™ÙOHLK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLËL\Ë›Ý™\‘X[K\Ë\Ë™X[SÝ™\‹\ÊJ_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\K™X[SÝ™\Y[˜Ý[ÛŠ
^Õ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë›Ý™\‘X[K\ÊK\Ë˜Ø[Ú[™ÙOHLKKœ›ÝÝ\K›Ý™\‘X[OY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\K™ÑÙ]^TÚ[™\Ý[Y[˜Ý[ÛŠ
^Ý\ËœÜÝÝ\žTÚ[
œ™XYÚÜ

J_KKœ›ÝÝ\KœÜÝÝ\žTÚ[Y[˜Ý[ÛŠ
^Ü™]\›ˆKKœ›ÝÝ\K™Õ[ÓX^Ú[™\Ý[Y[˜Ý[ÛŠ
^Ý\ËœÜÝÝ\žSX^ÜÝ
œ™XYÝš[™Ê
Kœ™XYÚÜ

J_KKœ›ÝÝ\KœÜÝÝ\žSX^ÜÝY[˜Ý[ÛŠJ^Ü™]\›–ÝW_K_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
œÐ›ÜÜËœ›ÝÝ\K–œÐ›ÜÜÈŠNÝ˜\ˆ›ÜÜÒ[™›Ñ]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\Ë˜›ÜÜÒY]œ™XY[

K\ËšÚ[]œ™XY›ÛÛX[Š
K\Ë˜Ú[[™ÙR[]œ™XY›ÛÛX[Š
_\™]\›ˆJ
N××Ü™Y›XÝ
›ÜÜÒ[™›Ñ]Kœ›ÝÝ\K›ÜÜÒ[™›Ñ]HŠNÝ˜\ˆ›ÜÜÔ˜[šÒ[™›ÏY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ
J^Ý\ËšY]œ™XY[

K\Ë›˜[Y\Ï]œ™XYÝš[™Ê
K\ËœÚ[™ÚZO]œ™XYÝX›J
K\Ëœ˜[šÏY_\™]\›ˆJ
N××Ü™Y›XÝ
›ÜÜÔ˜[šÒ[™›Ëœ›ÝÝ\K›ÜÜÔ˜[šÒ[™›ÈŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^ÝžœÐ›ÜÜÏVœÐ›ÜÜËš[œË˜š[™
œÐ›ÜÜÊ_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆ”Ð›ÜÜÐÑÚ[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH–”Ð›ÜÜÐÑÚÚ[ˆ‹\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜ÚXÚËœÙ[XÝY]ÌK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\ËœÝ\™K\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë™Ú]™U\\Ë›ÛÛXÚ×ØNM
K\Ë˜YÚ[™ÙQ]™[
\Ë˜ÚXÚË\ËœÙ[XÝÚ[™ÙQ]™[ØNM
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\ËœÝ\™K\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë™Ú]™U\\Ë›ÛÛXÚ×ØNM
K\Ë˜ÚXÚËœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[ÒS‘ÑK\ËœÙ[XÝÚ[™ÙQ]™[ØNM\Ê_KKœ›ÝÝ\KœÙ[XÝÚ[™ÙQ]™[ØNMY[˜Ý[ÛŠ
^Ý\Ë˜ÚXÚËœÙ[XÝY	‰•\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê±$0èÈxnçÈ8nìH1$xnæ[™È8näÚHÚ[š›Û™È8nëH0èXÚŠ_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊNØœ™XZÎØØ\ÙH\ËœÝ\™N–œÐ›ÜÜËš[œÊ
K˜ÚXÚÒ\Ó[Ü™S[Û™^J
I‰Š\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
KœÙ[™ÛX\Ñ

KšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊJNØœ™XZÎØØ\ÙH\Ë™Ú]™U\•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
”Ð›ÜÜÐÑÚ[‹œ›ÝÝ\K–”Ð›ÜÜÐÑÚ[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ”Ð›ÜÜÐÑÚ[‹^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆ”Ð›ÜÜÓÝ\žUšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜ÛÛ™šYÕ[Y\ÏL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH–”Ð›ÜÜÓÝ\žTÚÚ[ˆ‹\Ë˜˜\‹›X™[[˜Ý[ÛY[˜Ý[ÛŠ
^Ü™]\›ˆˆŸK\Ëš\ÕÜ]™[HL\ËœÚ[[YÏPš]X\[X™\‹š[œÊ
K˜Ü™X]S[TXÊŒH‹L
K\ËœÚ[[YËž]\ËœÚ[ž\ËœÚ[[YËžO]\ËœÚ[žK\Ü^U][Ëœ™[[Ý™Qœ›ÛT\™[
\ËœÚ[
_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ëœ^K\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë™Ú]™U\\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™J\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
KœÜÝÝ\žT˜[‹\Ë™Ù]^TÚ[[™›×ØNM
K\Ë›ØœÙ\™J\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
KœÜÝÝ\žT™\Ý[ØNM\Ë™Ù]X^Ú[[™›×ØNM
K\Ë›ØœÙ\™JÝZ[˜]Kš[œÊ
KœÜÝÝ\žTÚ[\Ë™Ù]^TÚ[[™›×ØNM
K\Ë›ØœÙ\™JÝZ[˜]Kš[œÊ
KœÜÝÝ\žSX^ÜÝ\Ë™Ù]X^Ú[[™›×ØNM
K\ËœÝ]OLÌOÝ\ËœÝ]O]ÌN\ËœÝ]OLœÐ›ÜÜËš[œÊ
Kš\ÖœÐ›ÜÜÑ˜ŠØ[YSX\™X™[’Q
OÝ\Ë˜ÛÛ™šYÕ[Y\ÏQÛØ˜[ÛÛ™šYËÛÛ™šYÕÛÜ››ÜÜÐ˜\ÙK›Ý\žU[YN\Ë˜ÛÛ™šYÕ[Y\ÏLL\Ë˜˜\‹›X^[][OLL
\Ë˜ÛÛ™šYÕ[Y\Ë\Ëœ™Y\Ú[™›×ØNM

K\Ëœ^K™[˜X›YHLKKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ëœ^K\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë™Ú]™U\\Ë›ÛÛXÚ×ØNM
K[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ëœ™Y\Ú˜\—ØNM\ÊK\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\Kœ™Y\Ú[™›×ØNMY[˜Ý[ÛŠ
^Ý\Ë[Y\ÏL\Ëš][L™]OU\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
KÛÜ›š^™K[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠLL
\Ë˜ÛÛ™šYÕ[Y\Ë\Ëœ™Y\Ú˜\—ØNM\Ë\Ë•[YSÝ™\‹\ÊK\Ë[YSX™[^]\Ë˜ÛÛ™šYÕ[Y\ÊÈ™ÚpèžHŸKKœ›ÝÝ\Kœ™Y\Ú˜\—ØNMY[˜Ý[ÛŠ
^Ý\Ë[Y\ÊÊÎÝ˜\ˆLL
\Ë˜ÛÛ™šYÕ[Y\Ë]\Ë[Y\ÎÝ\Ë˜˜\‹˜[YO]\Ë[YSX™[^SX]™›ÛÜŠ\Ë˜ÛÛ™šYÕ[Y\Ë]\Ë[Y\ËÌL
JÈ™ÚpèžHŸKKœ›ÝÝ\K•[YSÝ™\Y[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ_KKœ›ÝÝ\K™Ù]^TÚ[[™›×ØNMY[˜Ý[ÛŠ
^Ý\Ëœ^K™[˜X›YHLKš]X\[X™\‹š[œÊ
K˜Ú[™ÙS[J\ËœÚ[[YËÈ‹ŠK\Ë˜YÚ[
\ËœÚ[[YÊ_KKœ›ÝÝ\K™Ù]X^Ú[[™›×ØNMY[˜Ý[ÛŠ
^Ý\Ë›X^Ú[^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š›ÛÛÛÜˆH	ÈÑ‘ŽIÏˆŠÝÌJÈÙ›Ûˆ1$pèÈ[™È1$q¬8nèØÈ›ÛÛÛÜˆH	ÈÑ‘ŽIÏˆŠÝÌWJÈÙ›Ûˆ1$ZxnàÛHŠ_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJNØœ™XZÎØØ\ÙH\Ëœ^NŒO]\ËœÝ]OÕ\Ù\›ÜÜÙ\ÔÞ\Ý[Kš[œÊ
KœÙ[™›Ú[“Ý\žJ
NŒOO]\ËœÝ]I‰‘ÝZ[˜]Kš[œÊ
KœÙ[™^SÝ\žR[™›Ê
NØœ™XZÎØØ\ÙH\Ë™Ú]™U\•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
”Ð›ÜÜÓÝ\žUšY]Ëœ›ÝÝ\K–”Ð›ÜÜÓÝ\žUšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊ”Ð›ÜÜÓÝ\žUšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆœÐ›ÜÜÔ[™[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K˜Ú[™[Ü™X]YY[˜Ý[ÛŠ
^ßKKœ›ÝÝ\Kš[š]]OY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆOLNÍO™NÙJÊÊ]QÛØ˜[ÛÛ™šYËÛÛ™šYÓÝ\›ÜÜÌVÙWK\ÖÈšXYŠÙWKœÛÝ\˜ÙOH›[ÛšXYŠÑÛØ˜[ÛÛ™šYËÛÛ™šYÓ[ÛœÝ\œÖÝ˜›ÜÜÒYKšXY
È—Ü™È‹\ÖÈ˜›ÜÜÓ˜[YHŠÙWK^QÛØ˜[ÛÛ™šYËÛÛ™šYÓ[ÛœÝ\œÖÝ˜›ÜÜÒYK›˜[YJÈŠŠÝ›[Z]
È‹HŠÈÚ^xnàÛˆŠÝš[Z]
ÈŠH‹\ÖÈœ™]Ø\™\ÝŠÙWKš][T™[™\™\R][P˜\ÙK\ÖÈœ™]Ø\™\ÝŠÙWK™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠœÚÝÔ™]Ø\™
NÝ\ËœÙYT™]Ø\™^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\ŠÝš[™Õ][Ë˜YÛÛÜŠO–[H8n©Ûˆ1¬8nçÛ™ÏÝOˆ‹ˆÌŒÐÍHŠJ_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^ÖœÐ›ÜÜËš[œÊ
KœÙ[™Ù]›ÜÜÓ\Ý

NÙ›ÜŠ˜\ˆVœÐ›ÜÜËš[œÊ
K˜XÒ\ÓÜ[È–[H¸n¨Û™È8n¯Ü8n¨[™ÈŽˆ¸n¨Û™È8n¯Ü8n¨[™È8n©Ûˆ±¬8næØÈ‹OLNÍO™NÙJÊÊ]\ÖÈœ˜[šÈŠÙWK^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\ŠÝš[™Õ][Ë˜YÛÛÜŠOˆŠÝ
ÈÝOˆ‹ˆÌŒÐÍHŠJK\Ë˜YÝXÚ]™[
\ÖÈšXYŠÙWK\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\ÖÈœ˜[šÈŠÙWK\Ë›ÛÛXÚ×ØNM
NÝ\Ë˜YÝXÚ]™[
\ËœÙYT™]Ø\™\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë™[\‘Ø[YK\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛX\‹\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™JœÐ›ÜÜËš[œÊ
KœÜÝœ›XZ[•[YT™\Ý[\Ëœ™[]™R[™›ÐÚ[™ÙWØNM
K\Ë›ØœÙ\™JœÐ›ÜÜËš[œÊ
KœÜÝ›ÜÜÓ\Ý™\Ý[\Ëœ™Y\Ú”Ý]WØNM
K\Ëœ™[]™R[™›ÐÚ[™ÙWØNM

K\Ëœ™Y\Ú”Ý]WØNM

K\Ëš[š]]J
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆLNÍOÝ
ÊÊ]\Ëœ™[[Ý™UÝXÚ]™[
\ÖÈšXYŠÝK\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\ÖÈœ˜[šÈŠÝK\Ë›ÛÛXÚ×ØNM
NÝ\Ëœ™[[Ý™UÝXÚ]™[
\ËœÙYT™]Ø\™\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë™[\‘Ø[YK\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛX\‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\K˜ÛX[•Ø\›•Ú[Y[˜Ý[ÛŠ
^Ý\ËØ\›•Ú[‰‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJØ\›•šY]Ê_KKœ›ÝÝ\Kœ™Y\Ú”Ý]WØNMY[˜Ý[ÛŠ
^Ý˜\ˆHLKOVœÐ›ÜÜËš[œÊ
NÚYŠK˜XÒ\ÓÜ[Š^Ù›ÜŠ˜\ˆOYK™Ù]›ÜÜÓ\Ý[™Ý

KÏ]›ÚYLÚO›ŽÛŠÊÊ^ÚYŠÏYK™Ù]›ÜÜÒ[™›ÐžR[™^
ŠKË˜Ú[[™ÙR[Š^Ý\ÖÈ˜›ÜÜÐ™ÈŠÊŠÌJWKœÛÝ\˜ÙOHžœØ›ÜÜ×Ì‹ËšÚ[Ê\ËœÚYÛ‹œÛÝ\˜ÙOHžœØ›ÜÜ×ÌÈ‹Kœ™[]™U[YOL\Ëœ™[]™R[™›ÐÚ[™ÙWØNM

JN\ËœÚYÛ‹œÛÝ\˜ÙOHžœØ›ÜÜ×ÌÈ‹\ËœÙ]ÚYÛ”Ú[ØNM
ŠKHLØœ™XZß]\ÖÈ˜›ÜÜÐ™ÈŠÊŠÌJWKœÛÝ\˜ÙOHžœØ›ÜÜ×ÌHŸZYŠ]
^Ý˜\ˆÏYK˜ÚXÚÐØ[”^P›ÜÜÒ[™^

NÛÏŒ	‰Š\ÖÈ˜›ÜÜÐ™ÈŠÛ×KœÛÝ\˜ÙOHžœØ›ÜÜ×Ì‹ÏYK™Ù]›ÜÜÒ[™›ÐžR[™^
ËLJKÉ‰ŠËšÚ[Ê\ËœÚYÛ‹œÛÝ\˜ÙOHžœØ›ÜÜ×ÌÈ‹Kœ™[]™U[YOL\Ëœ™[]™R[™›ÐÚ[™ÙWØNM

JN\ËœÚYÛ‹œÛÝ\˜ÙOHˆ‹\ËœÙ]ÚYÛ”Ú[ØNM
ËLJJJ__Y[Ù^Ý\ËœÚYÛ‹œÛÝ\˜ÙOHˆŽÝ˜\ˆÏYK˜ÚXÚÐØ[”^P›ÜÜÒ[™^

NÛÏŒ	‰Š\ÖÈ˜›ÜÜÐ™ÈŠÛ×KœÛÝ\˜ÙOHžœØ›ÜÜ×ÌŠ_Y›ÜŠ˜\ˆOLŽÍO˜NØJÊÊXO™K˜[]™P›ÜÜÓ[OÝ\ÖÈœÚYÛˆŠØWKœÛÝ\˜ÙOHžœØ›ÜÜ×ÌMÈŽ\ÖÈœÚYÛˆŠØWKœÛÝ\˜ÙOHˆŸKKœ›ÝÝ\KœÙ]ÚYÛ”Ú[ØNMY[˜Ý[ÛŠ
^Ý\ËœÚYÛ‹ž]	LŠŒŒL
ÌLÌË\ËœÚYÛ‹žOLŒÌ
“X]™›ÛÜŠÌŠJÌ_KKœ›ÝÝ\Kœ™[]™R[™›ÐÚ[™ÙWØNMY[˜Ý[ÛŠ
^Ý˜\ˆVœÐ›ÜÜËš[œÊ
NÝ\Ë[YSX›K^HÑ;ï&ˆŠÝœ™[]™U[YJÈˆÚpèžH‹[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ëœ™Y\ÚX™[ØNM\ÊK\Ë˜Ùš\ÚX›I‰Š\Ëœ™[XZ[“O]œ™[]™U[YK[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLË\Ëœ™[XZ[“K\Ëœ™Y\ÚX™[ØNM\Ë\Ë›Ý™\•[YWØNM\ÊJ_KKœ›ÝÝ\K›Ý™\•[YWØNMY[˜Ý[ÛŠ
^Ý\Ë˜Ùš\ÚX›OHLK\Ë˜ÛX[•Ø\›•Ú[Š
_KKœ›ÝÝ\Kœ™Y\ÚX™[ØNMY[˜Ý[ÛŠ
^Ý\Ëœ™[XZ[“KKK\Ë[YSX›K^HÑ;ï&ˆŠÝ\Ëœ™[XZ[“JÈˆÚpèžHŸKKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
\™Ù]
^ØØ\ÙH\ËšXYN˜Ø\ÙH\Ëœ˜[šÌN\Ë›Ü[”˜[šÕÚ[—ØNM
JNØœ™XZÎØØ\ÙH\ËšXYŽ˜Ø\ÙH\Ëœ˜[šÌŽ\Ë›Ü[”˜[šÕÚ[—ØNM
ŠNØœ™XZÎØØ\ÙH\ËšXYÎ˜Ø\ÙH\Ëœ˜[šÌÎ\Ë›Ü[”˜[šÕÚ[—ØNM
ÊNØœ™XZÎØØ\ÙH\ËšXY˜Ø\ÙH\Ëœ˜[šÍ\Ë›Ü[”˜[šÕÚ[—ØNM

NØœ™XZÎØØ\ÙH\ËœÙYT™]Ø\™•šY]ÓYÜ‹š[œÊ
K›Ü[ŠœÐ›ÜÜÔ™]Ø\™ÚÝÕšY]ÊNØœ™XZÎØØ\ÙH\Ë™[\‘Ø[YN–œÐ›ÜÜËš[œÊ
K˜ÚXÚÒ\ÔÚÝÓ›ÝXÙUÚ[Š
OÝ\ËØ\›•Ú[UØ\›•šY]ËœÚÝÊ“xnåÚH™ðèHÚ8nâHðìÈ8nàÈ[HÚXH›ÛÛÛÜIÈÑ‘ŽIÏŒH8n©ÛÙ›Ûˆ“ÔÔÈÚ^xnàÛˆÚ[šðìÈÚ8n«ØÈÚ8n«Ûˆ]xnä[ˆ°èÈ8nëH0èXÚÚ0í™ûï'È‹[˜Ý[ÛŠ
^ÖœÐ›ÜÜËš[œÊ
KœÙ[™™\]\ÝÚ[[™ÙJ
KœÐ›ÜÜËš[œÊ
K™š\œÝÚÝÕÚ[HLK\ÊN–œÐ›ÜÜËš[œÊ
KœÙ[™™\]\ÝÚ[[™ÙJ
NØœ™XZÎØØ\ÙH\Ë˜ÛX\Ž–œÐ›ÜÜËš[œÊ
K˜ÚXÚÒ\Ó[Ü™S[Û™^J
OÝ\ËØ\›•Ú[UØ\›•šY]ËœÚÝÊðìÈÚ8n«ØÈÚ8n«Ûˆ]xnä[ˆpêH[È›ÛÛÛÜIÈÑ‘ŽIÏŒÌ™Ý^pê›ˆ¸n¨ÛÏÙ›Ûˆ1$xnàÈ0ìØH8nçZHÚX[ˆ8näÚHÚpêHÚ0í™ûï'È‹[˜Ý[ÛŠ
^ÖœÐ›ÜÜËš[œÊ
KœÙ[™^PÙ

_K\ÊN•\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê’Ú0í™È1$xnéÈ™Ý^pê›ˆ¸n¨ÛÈŠ__KKœ›ÝÝ\K›Ü[”˜[šÕÚ[—ØNMY[˜Ý[ÛŠ
^ÖœÐ›ÜÜËš[œÊ
KœÙ[™™\]\Ý›ÜÜÔ˜[šÊ
KšY]ÓYÜ‹š[œÊ
K›Ü[ŠœÐ›ÜÜÔ˜[šÕšY]Ê_K_J˜\ÙPÛÛ\Û™[
N××Ü™Y›XÝ
œÐ›ÜÜÔ[™[œ›ÝÝ\K–œÐ›ÜÜÔ[™[ŠNÝ˜\ˆœÐ›ÜÜÔ˜[šÒ][T™[™\™\Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý\Ë˜™Ëš\ÚX›O]\Ëš][R[™^	LOL\Ë^]\Ë™]Kœ˜[šÊÈˆ‹\ËK^]\Ë™]K›˜[Y\Ë\Ë‹^]\Ë™]KœÚ[™ÚZ_K_J][T™[™\˜\ÙJN××Ü™Y›XÝ
œÐ›ÜÜÔ˜[šÒ][T™[™\™\‹œ›ÝÝ\K–œÐ›ÜÜÔ˜[šÒ][T™[™\™\ˆŠNÝ˜\ˆœÐ›ÜÜÔ˜[šÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH–”Ð›ÜÜÒ›Ú[”ÚÚ[ˆ‹\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë›ØœÙ\™JœÐ›ÜÜËš[œÊ
KœÜÝ˜[šÒ[™›Ô™\Ý[\Ëœ™Yœ™\Ú\Ý[™›×ØNM
K\Ëœ™Yœ™\Ú\Ý[™›×ØNM

_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™SØœÙ\™J
_KKœ›ÝÝ\Kœ™Yœ™\Ú\Ý[™›×ØNMY[˜Ý[ÛŠ
^Ý\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠœÐ›ÜÜËš[œÊ
K˜›ÜÜÔ˜[šÓ\Ý
_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
œÐ›ÜÜÔ˜[šÕšY]Ëœ›ÝÝ\K–œÐ›ÜÜÔ˜[šÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊœÐ›ÜÜÔ˜[šÕšY]Ë^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆœÐ›ÜÜÔ™\Ý[šY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH–œÐ›ÜÜÔ™\Ý[ÚÚ[ˆ‹\Ë˜ÛÜÙP‹›˜[YOH“š8n«[ˆ1¬8nçÛ™È‹\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ˜\ˆO]Ý\Ë™š\œÝ^ZVÌVÌK\ËšÚ[^ZVÌVÌWK\Ë›^\˜[šË^H–8n¯Ü8n¨[™ÈønéØH0í{ï&ˆŠÚVÌVÌ—K\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠVÌWJK\ËœÏLL\Ë\]PÛÜÙP”Ý]WØNM

K[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLËL\Ë\]PÛÜÙP”Ý]WØNM\ÊK\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÕ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë\]PÛÜÙP”Ý]WØNM\ÊK\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
KØ[YSX\™X™[’QŒ	‰•\Ù\‘˜‹š[œÊ
KœÙ[™˜‘^]

_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_KKœ›ÝÝ\K\]PÛÜÙP”Ý]WØNMY[˜Ý[ÛŠ
^Ý\ËœËKK\ËœÏL	‰•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\ÊK\Ë˜ÛÜÙP‹›X™[]\Ë˜ÛÜÙP‹›˜[YJÈŠŠÝ\ËœÊÈœÊHŸK_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
œÐ›ÜÜÔ™\Ý[šY]Ëœ›ÝÝ\K–œÐ›ÜÜÔ™\Ý[šY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊœÐ›ÜÜÔ™\Ý[šY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆœÐ›ÜÜÔ™]Ø\™ÚÝÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH–”Ð›ÜÜÔ™]Ø\™ÚÚ[ˆ‹\ËX‹™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠœÐ›ÜÜËš[œÊ
K™Ù]˜\“\Ý

JK\Ëš][S\ÝKš][T™[™\™\R][P˜\ÙK\Ëš][S\Ý‹š][T™[™\™\R][P˜\ÙK\Ëš][S\ÝËš][T™[™\™\R][P˜\ÙK\Ëš][S\Ýš][T™[™\™\R][P˜\ÙK\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ë˜YÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
K\Ë˜YÚ[™ÙQ]™[
\ËX‹\ËœÙ[XÝ[™^Ú[™ÙQ]™[ØNM
K\ËœÙ[XÝ[™^Ú[™ÙQ]™[ØNM
[
_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙP‹\Ë›ÛÛXÚ×ØNM
K\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜ÛÜÙPŒ\Ë›ÛÛXÚ×ØNM
_KKœ›ÝÝ\KœÙ[XÝ[™^Ú[™ÙQ]™[ØNMY[˜Ý[ÛŠ
^Ý˜\ˆO]\ËX‹œÙ[XÝY[™^OQÛØ˜[ÛÛ™šYËÛÛ™šYÓÝ\›ÜÜÌVÙJÌWNÝ\Ë˜›ÜÜÓ˜[YK^QÛØ˜[ÛÛ™šYËÛÛ™šYÓ[ÛœÝ\œÖÚK˜›ÜÜÒYK›˜[YJÈŠŠÚK›[Z]
È‹HŠÈÚ^xnàÛˆŠÚKš[Z]
ÈŠH‹\Ëœ˜[šÛX™[K^ZKœ˜[šÛ˜[YVÌK\Ëœ˜[šÛX™[‹^ZKœ˜[šÛ˜[YVÌWK\Ëœ˜[šÛX™[Ë^ZKœ˜[šÛ˜[YVÌ—K\Ëœ˜[šÛX™[^ZKœ˜[šÛ˜[YVÌ×K\Ëœ˜[šÛX™[K^ZKœ˜[šÛ˜[YVÍK\Ëœ˜[šÛX™[‹^ZKœ˜[šÛ˜[YVÍWK\Ëš][S\ÝK™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠKœ˜[šÌJK\Ëš][S\Ý‹™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠKœ˜[šÌŠK\Ëš][S\ÝË™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠKœ˜[šÌÊK\Ëš][S\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠKœ˜[šÍ
K\Ëš][S\ÝK™]OZKšÚ[™]Ø\™\Ëš][S\Ý‹™]OZKœÚY[ÌKœ™]Ø\™KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜ÛÜÙPŽ˜Ø\ÙH\Ë˜ÛÜÙPŒ•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê__K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
œÐ›ÜÜÔ™]Ø\™ÚÝÕšY]Ëœ›ÝÝ\K–œÐ›ÜÜÔ™]Ø\™ÚÝÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊœÐ›ÜÜÔ™]Ø\™ÚÝÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆœÐ›ÜÜÔ[TÜXZÕšY]ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”ÚÚ[’[\È‹\Ëš\ÕÜ]™[HLKKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ[™]™[
\Ë\Ë›Ý\ÛÜÙWØNM
NÝ˜\ˆO]ÌKÏQÛØ˜[ÛÛ™šYËÛÛ™šYÒ[[™›ÖÚWNÐ\ÜÙ\
Ë’[[™›ÐÛÛ™šYÈÈ›Ý]™H[™^ˆŠÚJ_
\Ë^[™›Ë^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÊÛØ˜[ÛÛ™šYËÛÛ™šYÒ[[™›ÖÚWK^
K\Ë^[™›ËšZYÚ]\Ë^[™›Ë^ZYÚ\Ë˜˜XÚÙÜ›Ý[™šZYÚ]\Ë^[™›Ë^ZYÚ
ÍŒ\Ë˜[šYÜ›Ý\žOJÝYÙU][Ëš[œÊ
K™Ù]ZYÚ

K]\Ë˜˜XÚÙÜ›Ý[™šZYÚ
KÌŠ_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÑS‘\Ë›Ý\ÛÜÙWØNM\Ê_KKœ›ÝÝ\K›Ý\ÛÜÙWØNMY[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJ\Ê_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
œÐ›ÜÜÔ[TÜXZÕšY]Ëœ›ÝÝ\K–œÐ›ÜÜÔ[TÜXZÕšY]ÈŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊœÐ›ÜÜÔ[TÜXZÕšY]Ë^Y\“YÜ‹•RWÔÜ\
NÝ˜\ˆÜ™X]T›ÛTØÙ[™OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Û‘[\Y[˜Ý[ÛŠ
^Ýœ›ÝÝ\K›Û‘[\‹˜Ø[
\ÊK\Ë˜Y^Y\Š^Y\“YÜ‹•RWÓXZ[ŠK\Ë˜Y^Y\Š^Y\“YÜ‹•RWÕ\ÊKOOTÑÓ\ÙË˜Ü™X]T›Û]\OÕšY]ÓYÜ‹š[œÊ
K›Ü[ŠÜ™X]T›ÛUÚ[ŠN•šY]ÓYÜ‹š[œÊ
K›Ü[ŠÜ™X]T›ÛUÚ[Š_KKœ›ÝÝ\K›Û‘^]Y[˜Ý[ÛŠ
^Ýœ›ÝÝ\K›Û‘^]˜Ø[
\Ê_K_JØÙ[™P˜\ÙJN××Ü™Y›XÝ
Ü™X]T›ÛTØÙ[™Kœ›ÝÝ\KÜ™X]T›ÛTØÙ[™HŠNÝ˜\ˆÜ™X]T›ÛS˜[YUšY]Ò][OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^ÚYŠˆO]\Ë™]J\™]\›ˆ›ÚY
\Ë›X™[[™›Ë^HˆŠNÝ˜\ˆH“™ñ¬8nçZHÚ1¨ZHÎŒ‘‘‘Œ	•ˆŠÝ\Ë™]JÈŸ1$X[™È°èÈØ[YHŽÝ\Ë›X™[[™›Ë^›ÝÏU^›ÝÓXZÙ\‹™Ù[™\˜]U^›ÝÌJ
_K_J]ZK’][T™[™\™\ŠN××Ü™Y›XÝ
Ü™X]T›ÛS˜[YUšY]Ò][Kœ›ÝÝ\KÜ™X]T›ÛS˜[YUšY]Ò][HŠNÝ˜\ˆÜ™X]T›ÛUÚ[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÙK—ÜÙ[XÝ›ØLK—ÜÙ[XÝÙ^LKš\Ð]]Ñ[\HLKKœÚÚ[“˜[YOH”ÚÚ[Ü™X]T›ÛLH‹K™[\‘Ü›Ý\š\ÚX›OHLKK™Ü›Ý\Ü\šÏ[™]È]ZK‘Ü›Ý\K™Ü›Ý\Ü\šËÝXÚÚ[™[HLKK™Ü›Ý\Ü\šËÝXÚ[˜X›YHLKK›\Ýš][T™[™\™\PÜ™X]T›ÛS˜[YUšY]Ò][NÙ›ÜŠ˜\ˆOVÈˆ‹ˆ‹ˆ‹ˆ—KÏVÈ•8nëHpêHØH‹°è[ˆ°ëš^xnà[ˆ8néÞH‹“›ðèÛˆÛ™È‹”8näÛˆØH]pèH8n«]H‹“šxnáÛHš1*H0èš8n«\‹“™Ú8nâØÚ0­ÓxnîH8náÈ‹°àXÈ°îˆ1$0ëXÚxnîH‹ðèXÚ™øn¨[ˆ]X[ˆ8nãØH‹•0èˆxn¯ÝH‹’0è8nçZH0í8nâ[š‹–pê›°­Óšpê›ˆ8n«[ˆxná]H‹“špê›ˆxn¯ÝH°íšx¢b‹•0èH¸n©]1$xnáÝH1$0ëXÚÚpè\‹¸ ,ðåˆ1$8näÛ™ÈxnáÛHšxná[¸¢b‹¸n©]]XZH‹•8nª]H8nêH1¬1¨[™È‹•°í8nìXÈ^xn¯Ý0àZH‹”8näÛˆØH1¬1¨[™È[™È‹•8n¨\0ëXÚ‹•°èÛ™ÈønìH0î^HÛ™È‹’Úxn¯ÛH1$8n¨ÛHøn©ÛH0è›H‹•0è›Hš1¬Ú8nâH8néÞH‹”Û™È1¬1¨[™ÈHønì]H‹“š8n©]¸nìXÈ1$0êˆ1$xnáÝH‹‘[È›Û™ÈšH8n«\‹±«ÝHxn©]1$0ëXÚ0è]Ú8n«ØÈ1¬‹ØH¸nâHøn¨Ûˆðèˆ^xná[ˆ‹•^HÛ™È‹¸n¨Ûˆš0è›‹0íˆ‹•ðèˆ1$1 Û™È1¬1¨[™È¸n¨[ˆ‹•0èˆ™Ý^xnáÝðíÚ[š—KLÌÏ›ŽÛŠÊÊZOZK˜ÛÛ˜Ø]
ÊNÜ™]\›ˆK›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠJKKœØÜ›Û\‹ÝXÚÚ[™[HLKKœØÜ›Û\‹ÝXÚ[˜X›YHLKK›˜[YR[œ]›X^Ú\œÏLK\]T™\×ØNM
Kš›ØŒWÜÙ[XÝš›Øˆ‹ŒWÌˆ‹‹œ™ÈŠKK\]T™\×ØNM
Kš›ØŒ—ÜÙ[XÝš›Øˆ‹Œ—Ìˆ‹‹œ™ÈŠKK\]T™\×ØNM
Kš›ØŒ×ÜÙ[XÝš›Øˆ‹Œ×Ìˆ‹‹œ™ÈŠKK\]T™\×ØNM
Kš›ØŒKšXÛÛ‹š›Øˆ‹ŒH‹‹œ™ÈŠKK\]T™\×ØNM
Kš›ØŒ‹šXÛÛ‹š›Øˆ‹Œˆ‹‹œ™ÈŠKK\]T™\×ØNM
Kš›ØŒËšXÛÛ‹š›Øˆ‹ŒÈ‹‹œ™ÈŠKK\]T™\×ØNM
K˜Ü™X]T›ÛP™Ë˜Ü™X]X™È‹ŒH‹KšœÈŠK_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\ËœÙ[XÝ›ØLK\ËœÙ[XÝÙ^SX]™›ÛÜŠŠ“X]œ˜[™ÛJ
JK\Ëš›ØŒK˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ëš›ØŒ‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ëš›ØŒË˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ë˜Ü™X]P‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ë™XÙP‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ë˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊNÝ˜\ˆOR›Ü\K›šXÚÓ˜[YNÈ›[OZ_ˆOZOÔ›ÛSYÜ‹š[œÊ
KœÙ[™˜[™ÛS˜[YJ\Ë—ÜÙ[XÝÙ^
N\ËœÙ]˜[YJJK\ËœÜ\šÓ˜[YUÙY[—ØNM

K\Ë›\Ý]\Ë›\ÝšZYÚLŒ\ËœØÜ›Û\‹šY]ÜÜœØÜ›ÛLÝ˜\ˆÏYYÜ™]•ÙY[‹™Ù]
\ËœØÜ›Û\‹šY]ÜÜ
NÜËÊÜØÜ›ÛŽ\Ë›\ÝK
\Ë›\Ý
K˜Ø[
\Ë›ÛÛXÚÓ\ÝØNM\ÊK\Ë›ØœÙ\™J›ÛSYÜ‹š[œÊ
KœÜÝÜ™X]T›ÛK\Ë˜Ü™X]T\Ù[˜[™ÛS˜[YWØNM
K\Ë›Ü[•[YOYYÜ™]™Ù][Y\Š
JÌMYLË[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLË\Ë\]TÜ\™UY[WØNM\ÊK\Ë›˜[YR[œ]˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙKœÝ\ÐÜ™X]WÜ›ÛJNÝ˜\ˆ[™]È]ZK’[XYÙNÛ‹œÛÝ\˜ÙOHˆŠÔ™\Ñ\“YÜ‹“PTÑTŠÈ›X\KÜÛX[šœÈ‹‹š\ÚX›OHLK\Ë˜YÚ[
ŠK\Ë›\Ýš\ÚX›OTÑÓ\ÙËš\ÔÚÝÐÜ™X]T›ÛK\Ë™ÛÜ™X]T›ÛKš\ÚX›OHTÑÓ\ÙËš\ÔÚÝÐÜ™X]T›Û_KKœ›ÝÝ\KœÙ]‘Y™—ØNMY[˜Ý[ÛŠ
^Ý\Ë˜“Xß
\Ë˜“XÏ[™]ÈXÐ[š[X][Û‹\Ë˜“XËž]\Ë˜Ü™X]P‹ž
Ý\Ë˜Ü™X]P‹ÚYÌŠÌMK\Ë˜“XËžO]\Ë˜Ü™X]P‹žJÝ\Ë˜Ü™X]P‹šZYÚÌ‹L‹\Ë˜Ü™X]P‹œ\™[˜YÚ[
\Ë˜“XÊJK\Ë˜“XËœ^Qš[J™\Ñ\“YÜ‹”‘T×ÑT—ÑQ‘ŠÈ˜ÚX[™ÚYXˆ‹LJ_KKœ›ÝÝ\K\]TÜ\™UY[WØNMY[˜Ý[ÛŠ
^Ý˜\ˆSX]˜ÙZ[

\Ë›Ü[•[YKYYÜ™]™Ù][Y\Š
JKÌYLÊNÝ\Ë[YSX‹^Hðì›ˆ8n¨ZHŠÓX]›X^

JÈˆÚpèžH‹]	‰Š\Ëš\Ð]]Ñ[\HL\ËœÙ[™Ü™X]T›ÛWØNM

J_KKœ›ÝÝ\K˜Ü™X]T\Ù[˜[™ÛS˜[YWØNMY[˜Ý[ÛŠ
^Ý\Ë™[\‘Ü›Ý\š\ÚX›OHLKOSX]˜XœÊ
I‰”›ÛSYÜ‹š[œÊ
KœÙ[™˜[™ÛS˜[YJ\Ë—ÜÙ[XÝÙ^
_KKœ›ÝÝ\K›ÛÛXÚÓ\ÝØNMY[˜Ý[ÛŠ
^Ý\ËœØÜ›Û\‹šY]ÜÜœØÜ›ÛLŒÝ˜\ˆYYÜ™]•ÙY[‹™Ù]
\ËœØÜ›Û\‹šY]ÜÜ
NÝÊÜØÜ›ÛŽ\Ë›\ÝK
\Ë›\Ý
K˜Ø[
\Ë›ÛÛXÚÓ\ÝØNM\Ê_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëš›ØŒKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ëš›ØŒ‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ëš›ØŒËœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ë˜Ü™X]P‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ë™XÙP‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ë›˜[YR[œ]œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚ×ØNM\ÊK\Ë˜ÛÜÙP[ÙY[—ØNM

K[Y\“YÜ‹š[œÊ
Kœ™[[Ý™P[
\Ê_KKœ›ÝÝ\KœÙ[™Ü™X]T›ÛWØNMY[˜Ý[ÛŠ
^ÌOOTÑÓ\ÙËš\ÔÚÝÐÜ™X]T›ÛI‰Š›ÛSYÜ‹š[œÊ
KœÙ[™Ü™X]T›ÛJ\Ë›˜[YR[œ]^\Ë˜Ý\”Ù^

K\Ë˜Ý\’›ØŠ
KˆŠK[Y\“YÜ‹š[œÊ
Kœ™[[Ý™P[
\ÊJ_KKœ›ÝÝ\KœÝÜÜ™X]T›ÛWØNMY[˜Ý[ÛŠ
^Ý˜\ˆUØ\›•šY]ËœÚÝÊÚ8nêXÈ± Û™È8n¨[Èš0è›ˆ¸n«]Ú1¬HxnçÈ‹[˜Ý[ÛŠ
^ÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJJ_K[[[œÝ\™HŠNÝœÙ]“X™[
–0èXÈš8n«[ˆŠ_KKœ›ÝÝ\K›ÛÛXÚ×ØNMY[˜Ý[ÛŠ
^ÜÝÚ]Ú
˜Ý\œ™[\™Ù]
^ØØ\ÙH\Ë˜Ü™X]PŽ\ËœÙ[™Ü™X]T›ÛWØNM

K\Ë™[\‘Ü›Ý\š\ÚX›OTÑÓ\ÙËš\ÔÚÝÐÜ™X]T›ÛNØœ™XZÎØØ\ÙH\Ë™XÙPŽ”›ÛSYÜ‹š[œÊ
KœÙ[™˜[™ÛS˜[YJ\Ë—ÜÙ[XÝÙ^
NØØ\ÙH\Ë›˜[YR[œ]•[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë\]TÜ\™UY[WØNM\ÊK\Ë[YSX‹^HˆŽØœ™XZÎØØ\ÙH\Ëš›ØŒN\ËœÙ[XÝ›ØLNØœ™XZÎØØ\ÙH\Ëš›ØŒŽ\ËœÙ[XÝ›ØLŽØœ™XZÎØØ\ÙH\Ëš›ØŒÎ\ËœÙ[XÝ›ØLßTÛÝ[™YÜ‹š[œÊ
KÝXÚ™Ê
_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\KœÙ[XÝ›Øˆ‹ÜÙ]™[˜Ý[ÛŠ
^Ý\Ë—ÜÙ[XÝ›Ø]Ù›ÜŠ˜\ˆOLNÌÏYNÙJÊÊ]\ÖÈš›ØˆŠÙJÈ—ÜÙ[XÝ—Kš\ÚX›OHLK\ÖÈš›ØˆŠÙWKš\ÚX›OHLÝ\ÖÈš›ØˆŠÝ
È—ÜÙ[XÝ—Kš\ÚX›OHL\ÖÈš›ØˆŠÝKš\ÚX›OHLK	LOLÝ\Ë—ÜÙ[XÝÙ^LN\Ë—ÜÙ[XÝÙ^L\Ë\]T›ÛWØNM

_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\KœÙ[XÝÙ^‹ÜÙ]™[˜Ý[ÛŠ
^Ý\Ë\]T›ÛWØNM

_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\K\]T›ÛWØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë˜Ý\’›ØŠ
NÝ\Ë˜Ý\”Ù^

NÝ\Ë\]T™\×ØNM
\Ëœ›Û[XË˜ÚX[™ÚYWÈ‹Kœ™ÈŠNÙ›ÜŠ˜\ˆOLNÌÏYNÙJÊÊ]\ÖÈš›ØˆŠÙWK˜Ý\œ™[Ý]OH\ŽÝ\ÖÈš›ØˆŠÝK˜Ý\œ™[Ý]OHœÙ[XÝYŸKKœ›ÝÝ\KœÙ]˜[YOY[˜Ý[ÛŠ
^Ý\Ë›˜[YR[œ]^]\Ëš\Ð]]Ñ[\‰‰\ËœÙ[™Ü™X]T›ÛWØNM

_KKœ›ÝÝ\K˜Ý\’›ØY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ÜÙ[XÝ›ØŸKKœ›ÝÝ\K˜Ý\”Ù^Y[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ÜÙ[XÝÙ^KKœ›ÝÝ\KœÜ\šÓ˜[YUÙY[—ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\ËOLÌMO™NÙJÊÊU[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLÊ“X]œ˜[™ÛJ
JÌMLK[˜Ý[ÛŠ
^Ýœ˜[™ÛTÜ\š×ØNM

_K\ÊNÕ[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠMLK[˜Ý[ÛŠ
^ÝœÜ\šÓ˜[YUÙY[—ØNM

BŸK\Ê_KKœ›ÝÝ\Kœ˜[™ÛTÜ\š×ØNMY[˜Ý[ÛŠ
^Ý˜\ˆSØš”ÛÛœÜ
™]ZK’[XYÙHŠNÝœÛÝ\˜ÙOH˜Ü—ÌÈ‹žLÌ
“X]œ˜[™ÛJ
JÍLœ›Ý][ÛLN
“X]œ˜[™ÛJ
KÝXÚ[˜X›YHLK\Ë™Ü›Ý\Ü\šË˜YÚ[

NÝ˜\ˆOSX]][Ë›[Z]
ËJNÝœØØ[V]œØØ[VOYKžOSX]][Ë›[Z]
MLL
JÍÌÝ˜\ˆOYYÜ™]•ÙY[‹™Ù]

NÚKÊÞ
“X]œ˜[™ÛJ
KNL
“X]œ˜[™ÛJ
_KÍL
K˜Ø[
[˜Ý[ÛŠ
^Ýœ\™[œ™[[Ý™PÚ[

KYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ
KØš”ÛÛœ\Ú

_J_KKœ›ÝÝ\K˜ÛÜÙP[ÙY[—ØNMY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\Ë™Ü›Ý\Ü\šË›[PÚ[™[‹OLÝ™NÙJÊÊ^Ý˜\ˆO]\Ë™Ü›Ý\Ü\šË™Ù]Ú[]
JNÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊJ_YYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ëš[YÐJKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\ËœØÜ›Û\‹šY]ÜÜ
_KKœ›ÝÝ\K\]T™\×ØNMY[˜Ý[ÛŠKKËŠ^Ý˜\ˆÏTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YO[™]ÈYÜ™]’[XYÙSØY\ŽØK˜Ü›ÜÜÓÜšYÚ[H˜[›Ûž[[Ý\È‹K›Û˜ÙJYÜ™]‘]™[ÓÓTUK[˜Ý[ÛŠJ^ÚYŠK˜Ý\œ™[\™Ù]™]J^Ý˜\ˆO[™]ÈYÜ™]•^\™NÚK˜š]X\]OYK˜Ý\œ™[\™Ù]™]KœÛÝ\˜ÙOZ__K\ÊNÝ˜\ˆŽÜLOO\ÏÈ™]ZKØÜ™X]\›ÛKÈŽˆ™]ZKØÜ™X]\›ÛKØÜ™X]\›ÛTXËÈŽÝ˜\ˆ[™]È]NØK›Û˜ÙJYÜ™]’SÑ\œ›Ü‘]™[’S×ÑT”“Ô‹[˜Ý[ÛŠ
^ØK›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÜŠÙJÚJÈ‹ˆŠÛŠÈÈŠÚ™Ù][YJ
J_K\ÊK˜NMO[ÏØK›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ˜YÙ[\ÜÙ]ËÈŠÛÊÈ‹ÈŠÙJÚJÈ‹ˆŠÛŠÈÈŠÚ™Ù][YJ
JN˜K›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÜŠÙJÚJÈ‹ˆŠÛŠÈÈŠÚ™Ù][YJ
J_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ü™X]T›ÛUÚ[‹œ›ÝÝ\KÜ™X]T›ÛUÚ[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÜ™X]T›ÛUÚ[‹^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆœ˜[YT˜]PØ[Y[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\Ë—ÙœÜÏV×_\™]\›ˆš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—Ú[œß
\Ë—Ú[œÏ[™]È
K\Ë—Ú[œßKœ›ÝÝ\Kœ[Y[˜Ý[ÛŠ
^Ý\Ë—Ü[›š[™ß
\Ë—ÙœÜË›[™ÝL\Ë—Ø™YÚ[‘œ˜[YOU[Y\“YÜ‹š[œÊ
K™Ù]œ˜[YRY

K[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLËL\Ë›Û•[Y\‹\Ë\Ë›Û•[YQ[™\ÊJ_Kœ›ÝÝ\K›Û•[Y\Y[˜Ý[ÛŠ
^Ý˜\ˆU[Y\“YÜ‹š[œÊ
K™Ù]œ˜[YRY

KO]]\Ë—Ø™YÚ[‘œ˜[YNÝ\Ë—ÙœÜËœ\Ú
JK\Ë—Ø™YÚ[‘œ˜[YO]Kœ›ÝÝ\K›Û•[YQ[™Y[˜Ý[ÛŠ
^Ý˜\ˆLÝ\Ë—ÙœÜËœÛÜ
[˜Ý[ÛŠJ^Ü™]\›ˆY_JK\Ë—ÙœÜËœÚY

K\Ë—ÙœÜËœÚY

NÙ›ÜŠ˜\ˆOLO]\Ë—ÙœÜË›[™ÝÚO™NÙJÊÊ]
Ï]\Ë—ÙœÜÖÙWNÝ˜\ˆÏ]\Ë˜Ø[ØÛÜ™JL
NÝ\Ë\]TÙ][™ÊÊ_Kœ›ÝÝ\K˜Ø[ØÛÜ™OY[˜Ý[ÛŠJ^Ý˜\ˆO]ÙKÏLÎÜ™]\›ˆLšOÜÏLNŒNšI‰ŠÏLŠKßKœ›ÝÝ\K\]TÙ][™ÏY[˜Ý[ÛŠ
^Ý˜\ˆOTÞ\ÔÙ][™Ñ]Kš[œÊ
NÌÏO]
O]ÙKœÙ]›ÛÛ
Þ\ÔÙ][™Ñ]K”ÚY[ÓÝ\”›ÛKL
NŒOO]	‰ŠKœÙ]›ÛÛ
Þ\ÔÙ][™Ñ]K”ÚY[ÓÝ\”›ÛKL
KKœÙ]›ÛÛ
Þ\ÔÙ][™Ñ]K”ÚY[ÔÚÚ[ÑY™‹L
JJ_KJ
N××Ü™Y›XÝ
œ˜[YT˜]PØ[œ›ÝÝ\K‘œ˜[YT˜]PØ[ŠNÝ˜\ˆ›ÛSYÜY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK™\œ›ÜÛÙOVÈˆ‹“8nåÚHÔS‹“™ñ¬8nçZH0î[™ÈÚ1¬H1$q Û™Èš8n«\‹‘8nâØÚ¸néHØ[YHÚ1¬Høn­[ˆðè™È‹‘8nëÈxnáÝH1¬H8n©Ûˆ±¬8næØÈønéØHš0è›ˆ¸n«]ðìÈ8nàÈ¸nâÈ8nåÚH‹“8nåÚH0í™È1¬8nç[™ÈÚHÛY[Ú8nã[ˆš0è›ˆ¸n«]‹•0ê›ˆš0è›ˆ¸n«]1$pèÈ°î[™È‹“š0è›ˆ¸n«]Ú0í™È8näÛˆ8n¨ZH‹‘ÚxnæÚH0ë[šÚ0í™È8nèÜ8náÈ‹•0ê›ˆ™ønªÝHšpê›ˆ1$pèÈ1$q¬8nèØÈøn©\8n¯Ý‹•[HønäHH0èZHš0è›ˆ¸n«]ÛY[ønëZH0ê›ˆ¸nâÈ8nåÚH‹•[HønäH™Ú8nàH™ÚxnáÜš0è›ˆ¸n«]ÛY[ønëZH0ê›ˆ¸nâÈ8nåÚH‹•0ê›ˆÚ0í™È8nèÜ8náËÚ8nêXHðïH8nìHøn©[Høn­ØÈ1$xnæH0èHÚ0í™È1$pî›™È‹“¸n¯ÝH0è˜[™ÈÚ8néÈ0ëÚ0í™È8nàÈ0ìØHš0è›ˆ¸n«]°èKøn©Ûˆðè]˜[™È±¬8næØÈ‹±$0èÈ1$q Û™Èš8n«\8nçÈÙ\™\ˆÚ0èXÈ‹±$0èÈ±¬8nèÝ]pèHønäH1¬8nèÛ™Èš0è›ˆ¸n«]8näZH1$XHðìÈ8nàÈ8n¨[È—KK˜Ø[‘[\HLKK™[\’QKLKKš\Ñš\œÝ[\HLK›\Ý›ÛRQKLKKœÞ\ÒYTXÚØYÙRQ“ÙÚ[‹Kœ™YÓ™]\ÙÊKK™ÐÚXÚÐXØÛÝ[
KKœ™YÓ™]\ÙÊ‹KœÜÝÜ™X]T›ÛJKKœ™YÓ™]\ÙÊK™Ô›ÛS\Ý
KKœ™YÓ™]\ÙÊKK™Ñ[\‘Ø[YJKKœ™YÓ™]\ÙÊ‹K™Ô˜[™ÛJKK›ØœÙ\™JØ[Y[ØYYÜ‹š[œÊ
KœÜÝ\“ØYÛÛ\]KKœ\ÛÛJK_\™]\›ˆ×Ù^[™ÊK
KKš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆš[œË˜Ø[
\Ê_KKœ›ÝÝ\Kœ\ÛÛOY[˜Ý[ÛŠ
^Ý\Ë˜Ø[‘[\HLLHO]\Ë™[\’Q	‰\ËœÙ[™[\‘Ø[YJ\Ë™[\’Q
_KKœ›ÝÝ\K˜ÛÛ›™XÝÙ\™\Y[˜Ý[ÛŠ
^Ô™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙKœÝ\ÛÙÚ[—ØÛÛ\]JKØ[YTÛØÚÙ]š[œÊ
K›ÙÚ[Š›Ü\K›Ü[’Q›Ü\Kœ\ÜÝÛÜ™›Ü\KœÜšY›Ü\KœÙ\™\’T›Ü\KœÙ\™\”Ü
_KKœ›ÝÝ\K™ÐÚXÚÐXØÛÝ[Y[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
NÚYŠ™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙKœÝ\ÙØ[YWÞX[žšKJKOZJ^Ý˜\ˆÏ]\Ë™Ù]ž]\Ê
NÝ\ËœÙ[™ÔÙ\™\ŠÊ_Y[ÙHOOTÑÓ\ÙËš\ÕÖÛX[Ø[YOØÛÛœÛÛK›ÙÊÛÛ›™XÝ˜Z[YˆŠÙK“Ó‘ÒS—ÑT”“Ô—ÐÓÑVÚWJN˜[\
ÛÛ›™XÝ˜Z[YˆŠÙK“Ó‘ÒS—ÑT”“Ô—ÐÓÑVÚWJKÏOZI‰Ú[™ÝË˜ÛÛ›™XÝ\œ›Ü‰‰Ú[™ÝË˜ÛÛ›™XÝ\œ›ÜŠ
_KKœ›ÝÝ\K™Ô›ÛS\ÝY[˜Ý[ÛŠ
^Ý˜\ˆOJœ™XY[

Kœ™XYž]J
JNÜÝÚ]Ú
™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙKœÝ\ÙØ[YWÜ›ÛS\ÝJKJ^ØØ\ÙH”ØÙ[™SYÜ‹š[œÊ
Kœ[”ØÙ[™JÜ™X]T›ÛTØÙ[™JNØœ™XZÎØØ\ÙHN™›ÜŠ˜\ˆO]œ™XY[

KÏV×KLÚO›ŽÛŠÊÊ^Ý˜\ˆÏ[™]ÈÙ[XÝ›ÛQ]J
NÜËœ\Ú
Ê_LOOZOÊ\Ë™[\’Q\ÖÌKšY\Ë˜Ú˜XÚÒ[Ø[’[‘Ø[YJ
KOO]\Ëš\Ñš\œÝ[\‰‰“Y\ÜØYÙPÙ[\‹š[œÊ
K™\Ü]Ú
Ø[YSÙÚ[‹”“ÓT‘U’PÑQ
JN\Ëš\Ñš\œÝ[\ŸLOO]\Ë›\Ý›ÛRQÊØÙ[™SYÜ‹š[œÊ
Kœ[”ØÙ[™JÙ[XÝ›ÛTØÙ[™JKšY]ÓYÜ‹š[œÊ
K›Ü[ŠÙ[XÝ›ÛUÚ[‹ÊJNŠ\Ë˜Ú˜XÚÒ[Ø[’[‘Ø[YJ
KOO]\Ëš\Ñš\œÝ[\‰‰“Y\ÜØYÙPÙ[\‹š[œÊ
K™\Ü]Ú
Ø[YSÙÚ[‹”“ÓT‘U’PÑQ
J__KKœ›ÝÝ\K˜Ú˜XÚÒ[Ø[’[‘Ø[YOY[˜Ý[ÛŠ
^ÌOO]\Ë˜Ø[‘[\‰‰Š\Ë™[\’QŒÝ\ËœÙ[™[\‘Ø[YJ\Ë™[\’Q
N\Ë›\Ý›ÛRQŒ	‰\ËœÙ[™[\‘Ø[YJ\Ë›\Ý›ÛRQ
J_KKœ›ÝÝ\KœÙ[™[\‘Ø[YOY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊJNÙKÜš]R[

KKÜš]TÝš[™Ê›Ü\KœŠKKÜš]TÝš[™Ê›Ü\KœšY
KKÜš]TÝš[™Ê›Ü\K˜\Y
K\ËœÙ[™ÔÙ\™\ŠJK\Ë›\Ý›ÛRQ]KKœ›ÝÝ\K™Ñ[\‘Ø[YOY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
NÜÝÚ]Ú
J^ØØ\ÙH˜œ™XZÎØØ\ÙHN‘Ø[YSØY[™ÕRK‘Ù][œÝ[˜ÙJ
K˜ÛÜÙJ
K™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙKœÝ\ÔÝ\ÑØ[YJKÛÛœÛÛK›ÙÊº/æùaiy®.9¢#ù¢$9b§ÈŠKÑ”Ù\™\”Þ\Ëš[œÊ
K›[šÚ[™ÒÑ”Ý]JLJKØÙ[™SYÜ‹š[œÊ
Kœ[”ØÙ[™JXZ[”ØÙ[™UšY]ÊK[]SYÜ‹š[œÊ
Kœ™[[Ý™P[

K[˜ÛÝ[\‘]Kš[œÊ
K˜ÛX\“™X\˜žS[Ù[

KÚ]ÔÞ\Ý[Kš[œÊ
Kš[š]]J
KÝZ[]Kš[œÊ
Kš[š]]J
K\Ëš\Ñš\œÝ[\‰‰Š\Ëš\Ñš\œÝ[\HLJKY\ÜØYÙPÙ[\‹š[œÊ
K™\Ü]Ú
Ø[YSÙÚ[‹”“ÓT‘U’PÑQ
NØœ™XZÎÙY˜][ŒOOTÑÓ\ÙËš\ÕÖÛX[Ø[YOØÛÛœÛÛK›ÙÊºe&z+ëùè NˆŠÙJN˜[\
ºe&z+ëùè NˆŠÙJ__KKœ›ÝÝ\KœÙ[™Ü™X]T›ÛOY[˜Ý[ÛŠKKË‹Ê^Ý˜\ˆO]\Ë™Ù]ž]\ÊŠNØKÜš]TÝš[™Ê
KKÜš]Pž]JJKKÜš]Pž]JJKKÜš]Pž]JÊKKÜš]TÝš[™Ê›Ü\KœŠKKÜš]TÝš[™Ê›Ü\KœšY
KKÜš]TÝš[™Ê›Ü\K˜\Y
K\ËœÙ[™ÔÙ\™\ŠJKÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K”Ù[™™\ÜÜ™X]T›ÛJ
K™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙKœÝ\ÐÜ™X]WÜ›ÛWÙ[™
_KKœ›ÝÝ\KœÜÝÜ™X]T›ÛOY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XY[

KO]œ™XYž]J
NÜ™]\›ˆOZOÊ\ËœÚÝÑ\œ›Ü•\ÊJKJNŠÛÝ[™][š[œÊ
Kœ^QY™™XÝPÊÛÝ[™][Ô‘PUWÔ“ÓJKÛÝ[™][š[œÊ
K™[^U[YJÙLÊK\Ë™[\’QYKOOTÑÓ\ÙË˜Ü™X]T›Û]\OÕšY]ÓYÜ‹š[œÊ
K˜ÛÜÙJÜ™X]T›ÛUÚ[ŠN•šY]ÓYÜ‹š[œÊ
K˜ÛÜÙJÜ™X]T›ÛUÚ[ŠK›ÚY
OO]\Ëš\Ñš\œÝ[\‰‰“Y\ÜØYÙPÙ[\‹š[œÊ
K™\Ü]Ú
Ø[YSÙÚ[‹”“ÓT‘U’PÑQ
JJ_KKœ›ÝÝ\KœÙ[™˜[™ÛS˜[YOY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë™Ù]ž]\ÊŠNÙKÜš]Pž]J
K\ËœÙ[™ÔÙ\™\ŠJ_KKœ›ÝÝ\K™Ô˜[™ÛOY[˜Ý[ÛŠ
^Ý˜\ˆO]œ™XYž]J
NÚYŠOYJ^Ý˜\ˆOJœ™XYž]J
Kœ™XYUŠ
JNÝ\ËœÙ]˜[YJJ__KKœ›ÝÝ\KœÙ]˜[YOY[˜Ý[ÛŠ
^ÌOOTÑÓ\ÙË˜Ü™X]T›Û]\OÝ\Ë˜Ü™X]T›ÛUšY]ÌKœÙ]˜[YJ
N\Ë˜Ü™X]T›ÛUšY]ÌKœÙ]˜[YJ
_KØš™XÝ™Yš[™T›Ü\JKœ›ÝÝ\K˜Ü™X]T›ÛUšY]ÌH‹ÙÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆšY]ÓYÜ‹š[œÊ
K™Ù]šY]ÊÜ™X]T›ÛUÚ[Š_K[[Y\˜X›NˆLÛÛ™šYÝ\˜X›NˆLJKKœ›ÝÝ\KœÚÝÑ\œ›Ü•\ÏY[˜Ý[ÛŠ
^ÌO]	‰•\Ù\•\Ëš[œÊ
KœÚÝÕ\Ê\Ë™\œ›ÜÛÙVÓX]˜XœÊ
WJ_KK“Ó‘ÒS—ÑT”“Ô—ÐÓÑOVÈˆ‹”ØZHxn«]Ú8nª]H‹’Ú0í™ÈðìÈ0èHÚøn¨Ûˆ°èH‹•0èHÚøn¨Ûˆ1$pèÈ1$q Û™Èš8n«\ZH0ì›™È0èHxnæÚH˜[™ËÚ8nçH8näZH1$XHÈ0î¸näÚH1$q Û™Èš8n«\8n¨ZH‹”Ù\™\ˆ1$X[™È¸n«[ˆ‹”Ù\™\ˆ1$X[™È¸n¨ÛÈ°ë‹“8nåÚHÙ\ÜÚ[ÛˆÙ\™\‹ðìÈ8nàÈ]X˜\ÙHÚ1¬Høn¯Ý¸näZH‹’Ú0í™È8näÛˆ8n¨ZHÙ\™\ˆ°èH‹•0èHÚøn¨Ûˆ1$pèÈ°èÈ8náÈ8nä[™ÈÚ8nä[™È™ÚxnáÛ‹ðìÈøn©Ûˆ1$Zxnà[ˆ0í™È[ˆÓS‘Ú0í™ÏÈ—K_JÞ\Ý[P˜\ÙJN××Ü™Y›XÝ
›ÛSYÜ‹œ›ÝÝ\K”›ÛSYÜˆŠNÝ˜\ˆØ[YTÞ\Ý[NÈY[˜Ý[ÛŠ
^Ýœ›ÛSYÜT›ÛSYÜ‹š[œË˜š[™
›ÛSYÜŠ_JØ[YTÞ\Ý[_
Ø[YTÞ\Ý[O^ßJJNÝ˜\ˆÙ[XÝ›ÛTØÙ[™OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ü™]\›ˆ˜Ø[
\Ê_\ß\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K›Û‘[\Y[˜Ý[ÛŠ
^Ýœ›ÝÝ\K›Û‘[\‹˜Ø[
\ÊK\Ë˜Y^Y\Š^Y\“YÜ‹•RWÓXZ[ŠK\Ë˜Y^Y\Š^Y\“YÜ‹•RWÕ\Ê_KKœ›ÝÝ\K›Û‘^]Y[˜Ý[ÛŠ
^Ýœ›ÝÝ\K›Û‘^]˜Ø[
\Ê_K_JØÙ[™P˜\ÙJN××Ü™Y›XÝ
Ù[XÝ›ÛTØÙ[™Kœ›ÝÝ\K”Ù[XÝ›ÛTØÙ[™HŠNÝ˜\ˆÙ[XÝ›ÛQ]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\ËšY]œ™XY[

K\Ë›˜[YO]œ™XYÝš[™Ê
K\Ëœ›ÛPÛ\ÜÏ]œ™XY[

K\ËžœÓ]™[]œ™XY[

K\Ë›]™[]œ™XY[

K\ËœÝÙ\]œ™XYÝX›J
K\Ëš\]™[]œ™XY[

K\ËœÙ^]œ™XY[

_\™]\›ˆJ
N××Ü™Y›XÝ
Ù[XÝ›ÛQ]Kœ›ÝÝ\K”Ù[XÝ›ÛQ]HŠNÝ˜\ˆÙ[XÝ›ÛR][OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœÚÚ[“˜[YOH”Ù[XÝ›ÛR][TÚÚ[ˆ‹_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë™]NÝ\Ë›X™[˜[YK^]›˜[YKO]žœÓ]™[Ý\Ë›X™[]™[^Høn©\1$xnæ{ï&ˆŠÝ›]™[\Ë›X™[]™[^Høn©\1$xnæ{ï&ˆŠÈÚ^xnàÛˆŠÝžœÓ]™[
Èˆøn©\ŠÝ›]™[™\ÛÝ\˜ÙU][Ëš[œÊ
K›ØY›
\Ë›X™[ÝÙ\‹›[WÞš\ÍÙ›ŠK\Ë›X™[ÝÙ\‹^HˆŠÝœÝÙ\‹O]š\]™[Ý\Ë™Ü›Ý\š\š\ÚX›OHLNŠ\Ëš\X™[^]š\]™[
Èˆ‹\Ë™Ü›Ý\š\š\ÚX›OHL
K\Ëš[YÔ›ÛKœÛÝ\˜ÙOHž]X[šXYŠÝœ›ÛPÛ\ÜÊÈŒ‹\ËœÙ[XÝš\ÚX›O]\ËœÙ[XÝYK_J][T™[™\˜\ÙJN××Ü™Y›XÝ
Ù[XÝ›ÛR][Kœ›ÝÝ\K”Ù[XÝ›ÛR][HŠNÝ˜\ˆÙ[XÝ›ÛUÚ[Y[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKš\ÕÜ]™[HL_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\Kš[š]ROY[˜Ý[ÛŠ
^Ýœ›ÝÝ\Kš[š]RK˜Ø[
\ÊK\ËœÚÚ[“˜[YOH”Ù[XÝ›ÛTÚÚ[ˆ‹\Ë›\Ýš][T™[™\™\TÙ[XÝ›ÛR][_KKœ›ÝÝ\K›Ü[Y[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ë˜YÝXÚ]™[
\Ë˜”Ý\\Ë›Û”Ý\Ø[YWØNM
K\Ë›\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û•\ØNM\ÊNÝ˜\ˆO]ÌNÚKœÛÜ
[˜Ý[ÛŠJ^Ü™]\›ˆœÝÙ\KœÝÙ\ÌN‹L_JK\Ë›\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠJK\Ë›\ÝœÙ[XÝY[™^LKKœ›ÝÝ\K›Û•\ØNMY[˜Ý[ÛŠ
^Ý\Ë›\ÝœÙ[XÝY[™^]š][R[™^Ý˜\ˆO]\Ë›\Ý™]T›ÝšY\ŽÙKœÛÝ\˜ÙK™›Ü‘XXÚ
[˜Ý[ÛŠJ^ÙKš][U\]Y

_J_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÙO\™Ý[Y[Ë›[™ÝÙJÊÊ]ÙWOX\™Ý[Y[ÖÙWNÝ\Ëœ™[[Ý™UÝXÚ]™[
\Ë˜”Ý\\Ë›Û”Ý\Ø[YWØNM
K\Ë›\Ýœ™[[Ý™Q]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›Û•\ØNM\Ê_KKœ›ÝÝ\K›Û”Ý\Ø[YWØNMY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›\Ý™Ù]š\X[[[Y[]
\Ë›\ÝœÙ[XÝY[™^
NÔ›ÛSYÜ‹š[œÊ
KœÙ[™[\‘Ø[YJ™]KšY
_K_J]ZUšY]Ð˜\ÙJN××Ü™Y›XÝ
Ù[XÝ›ÛUÚ[‹œ›ÝÝ\K”Ù[XÝ›ÛUÚ[ˆŠKšY]ÓYÜ‹š[œÊ
Kœ™YÊÙ[XÝ›ÛUÚ[‹^Y\“YÜ‹•RWÓXZ[ŠNÝ˜\ˆ[Ù\™R][T[™OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜™Ï[™]È]ZK’[XYÙKK˜™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÜ]YWØ™ZZš[šÝX[™Ëœ™È‹K˜™Ëš\ÚX›OHLK˜YÚ[
K˜™ÊKKœÙ[XÝ™Ï[™]È]ZK’[XYÙKKœÙ[XÝ™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÜ]YWØ™ZZš[šÝX[™ÌKœ™È‹KœÙ[XÝ™Ëš\ÚX›OHLKK˜YÚ[
KœÙ[XÝ™ÊKKœÙ\™\•^[™]È]ZK“X™[KœÙ\™\•^ÚYLMËKœÙ\™\•^šZYÚLKKœÙ\™\•^œÚ^™OLŒKœÙ\™\•^^[YÛYYÜ™]’Üš^›Û[[YÛ‹ÑS•T‹KœÙ\™\•^^ÛÛÜLMÎNÌKœÙ\™\•^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹KœÙ\™\•^žOSX]™›ÛÜŠŽKKYKœÙ\™\•^šZYÚÌŠKK˜YÚ[
KœÙ\™\•^
K_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý\ËœÙ\™\‘]O]\Ë™]NÙ›ÜŠ˜\ˆOLÙO\Ë›[PÚ[™[ŽÙJÊÊ]]\Ë™Ù]Ú[]
JK	‰Š^HˆŠNÝ\ËœÙ\™\•^^]\ËœÙ\™\‘]K›˜[YK\ËœÙ]ÛXÝ
\ËœÙ[XÝY
_KKœ›ÝÝ\KœÙ]ÛXÝY[˜Ý[ÛŠ
^ÌOO]Ê\ËœÙ[XÝ™Ëš\ÚX›OHL\Ë˜™Ëš\ÚX›OHLJNŠ\Ë˜™Ëš\ÚX›OHL\ËœÙ[XÝ™Ëš\ÚX›OHLJ_K_J]ZK’][T™[™\™\ŠN××Ü™Y›XÝ
[Ù\™R][T[™Kœ›ÝÝ\K[Ù\™R][T[™HŠNÝ˜\ˆØ[YSØY[™ÔÚÝÐ™ÏY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜™ÔXÕÏMŒK˜™ÔXÒNMK˜Ù•\›H‹Ü™\ÛÝ\˜ÙKÈ‹K˜Y]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑKK“ÛYÝYÙKJK_\™]\›ˆ×Ù^[™ÊK
KK‘Ù][œÝ[˜ÙOY[˜Ý[ÛŠ
^Ü™]\›ˆ[OYK’[œÝ[˜ÙI‰ŠK’[œÝ[˜ÙO[™]ÈJKK’[œÝ[˜Ù_KKœ›ÝÝ\K“ÛYÝYÙOY[˜Ý[ÛŠ
^Ý˜\ˆÝLOOTÑÓ\ÙËš\ÕÖÛX[Ø[YOÝÚ[™ÝËœÙÐÚ[›™[Y”ÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y\Ë˜™Ï[™]È]ZK’[XYÙK\Ë˜YÚ[
\Ë˜™ÊK\Ëš[YÓØY\[™]ÈYÜ™]’[XYÙSØY\‹\Ëš[YÓØY\‹˜Ü›ÜÜÓÜšYÚ[H˜[›Ûž[[Ý\È‹\Ëš[YÓØY\‹›Û˜ÙJYÜ™]‘]™[ÓÓTUK[˜Ý[ÛŠ
^ÚYŠ˜Ý\œ™[\™Ù]™]J^Ý˜\ˆO[™]ÈYÜ™]•^\™NÙK˜š]X\]O]˜Ý\œ™[\™Ù]™]K\Ë˜™ËœÛÝ\˜ÙOY__K\ÊNÝ˜\ˆO[™]È]NÝ\Ëš[YÓØY\‹›Û˜ÙJYÜ™]’SÑ\œ›Ü‘]™[’S×ÑT”“Ô‹[˜Ý[ÛŠ
^Ý\Ëš[YÓØY\‹›ØY
\Ë˜Ù•\›
È™]ZKÛØY[™ËÛØY[™ËšœÏÈŠÙK™Ù][YJ
J_K\ÊKˆˆO]Ý\Ëš[YÓØY\‹›ØY
\Ë˜Ù•\›
È˜YÙ[\ÜÙ]ËÈŠÝ
È‹ÛØY[™ËšœÏÈŠÙK™Ù][YJ
JN\Ëš[YÓØY\‹›ØY
\Ë˜Ù•\›
È™]ZKÛØY[™ËÛØY[™ËšœÏÈŠÙK™Ù][YJ
JK\ËœÝYÙK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ë“Û”Ù]Ú[Š[
_KKœ›ÝÝ\K“Û”Ù]Ú[Y[˜Ý[ÛŠ
^Ý\Ëž]\ËœÝYÙKœÝYÙUÚYÌ‹]\Ë˜™ÔXÕËÌ‹\ËžO]\ËœÝYÙKœÝYÙRZYÚÌ‹]\Ë˜™ÔXÒÌŸKKœ›ÝÝ\KœÚÝÏY[˜Ý[ÛŠ
^Ý˜YÚ[
\Ê_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑK\Ë“ÛYÝYÙK\ÊK\Ëœ\™[	‰Š\ËœÝYÙKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ëœ\™[œ™[[Ý™PÚ[
\ÊJ_K_JYÜ™]‘\Ü^SØš™XÝÛÛZ[™\ŠN××Ü™Y›XÝ
Ø[YSØY[™ÔÚÝÐ™Ëœ›ÝÝ\K‘Ø[YSØY[™ÔÚÝÐ™ÈŠNÝ˜\ˆØ[YSØY[™ÕROY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKœ›ÙÜ™\ÜÓX^ÚYMLŽK˜™ÔXÕÏMŒK˜™ÔXÒNMK˜Y]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑKK“ÛYÝYÙKJK_\™]\›ˆ×Ù^[™ÊK
KK‘Ù][œÝ[˜ÙOY[˜Ý[ÛŠ
^Ü™]\›ˆ[OYK’[œÝ[˜ÙI‰ŠK’[œÝ[˜ÙO[™]ÈJKK’[œÝ[˜Ù_KKœ›ÝÝ\K“ÛYÝYÙOY[˜Ý[ÛŠ
^Ý˜\ˆTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÝ\Ë˜™Ï[™]È]ZK’[XYÙK\Ë˜YÚ[
\Ë˜™ÊK\Ëš[YÓØY\[™]ÈYÜ™]’[XYÙSØY\‹\Ëš[YÓØY\‹˜Ü›ÜÜÓÜšYÚ[H˜[›Ûž[[Ý\È‹\Ëš[YÓØY\‹›Û˜ÙJYÜ™]‘]™[ÓÓTUK[˜Ý[ÛŠ
^ÚYŠ˜Ý\œ™[\™Ù]™]J^Ý˜\ˆO[™]ÈYÜ™]•^\™NÙK˜š]X\]O]˜Ý\œ™[\™Ù]™]K\Ë˜™ËœÛÝ\˜ÙOYKØ[YSØY[™ÔÚÝÐ™Ë‘Ù][œÝ[˜ÙJ
K˜ÛÜÙJ
__K\ÊNÝ˜\ˆO[™]È]NÝ\Ëš[YÓØY\‹›Û˜ÙJYÜ™]’SÑ\œ›Ü‘]™[’S×ÑT”“Ô‹[˜Ý[ÛŠ
^Ý\Ëš[YÓØY\‹›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÛØY[™ËšœÏÈŠÙK™Ù][YJ
J_K\ÊKˆˆO]Ý\Ëš[YÓØY\‹›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ˜YÙ[\ÜÙ]ËÈŠÝ
È‹ÛØY[™ËšœÏÈŠÙK™Ù][YJ
JN\Ëš[YÓØY\‹›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÛØY[™ËšœÏÈŠÙK™Ù][YJ
JK\Ë™ÝX[™Ø[Ò[™^SX]™›ÛÜŠÊ“X]œ˜[™ÛJ
JK\Ëœ›ÙÜ™\ÜÔ[™O[™]ÈYÜ™]‘\Ü^SØš™XÝÛÛZ[™\‹\Ë˜YÚ[
\Ëœ›ÙÜ™\ÜÔ[™JK\Ëœ›ÙÜ™\ÜÔ[™L[™]ÈYÜ™]‘\Ü^SØš™XÝÛÛZ[™\‹\Ë˜YÚ[
\Ëœ›ÙÜ™\ÜÔ[™LŠK\Ëœ›ÙÜ™\ÜÐ™Ï[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜÐ™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÛØY[™Ø™Ëœ™È‹\Ëœ›ÙÜ™\ÜÐ™ËœØØ[NQÜšY[™]ÈYÜ™]”™XÝ[™ÛJŽLL
K\Ëœ›ÙÜ™\ÜÐ™ËšZYÚLMÌ\Ëœ›ÙÜ™\ÜÐ™ËžL\Ëœ›ÙÜ™\ÜÐ™ËžOL\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ëœ›ÙÜ™\ÜÐ™ÊK\Ëœ›ÙÜ™\ÜÐ™ÌO[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜÐ™ÌKœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\ŒËœ™È‹\Ëœ›ÙÜ™\ÜÐ™ÌKžL\Ëœ›ÙÜ™\ÜÐ™ÌKžOLLŒ\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ëœ›ÙÜ™\ÜÐ™ÌJK\Ëœ›ÙÜ™\ÜÐ™Ì[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜÐ™Ì‹œÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\Œ‹œ™È‹\Ëœ›ÙÜ™\ÜÐ™Ì‹œØØ[NQÜšY[™]ÈYÜ™]”™XÝ[™ÛJKKËÊK\Ëœ›ÙÜ™\ÜÐ™Ì‹ÚYMK\Ëœ›ÙÜ™\ÜÐ™Ì‹ž]\Ëœ›ÙÜ™\ÜÐ™ÌKž
ÌÌK\Ëœ›ÙÜ™\ÜÐ™Ì‹žO]\Ëœ›ÙÜ™\ÜÐ™ÌKžK\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ëœ›ÙÜ™\ÜÐ™ÌŠK\Ëœ›ÙÜ™\ÜÐ™ÌÏ[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜÐ™ÌËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\œ™È‹\Ëœ›ÙÜ™\ÜÐ™ÌËž]\Ëœ›ÙÜ™\ÜÐ™Ì‹ž
Ý\Ëœ›ÙÜ™\ÜÐ™Ì‹ÚY\Ëœ›ÙÜ™\ÜÐ™ÌËžO]\Ëœ›ÙÜ™\ÜÐ™ÌKžK\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ëœ›ÙÜ™\ÜÐ™ÌÊK\Ëœ›ÙÜ™\ÜÐ™Í[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜÐ™ÍœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\ŒËœ™È‹\Ëœ›ÙÜ™\ÜÐ™ÍžL\Ëœ›ÙÜ™\ÜÐ™ÍžONL\Ëœ›ÙÜ™\ÜÔ[™L‹˜YÚ[
\Ëœ›ÙÜ™\ÜÐ™Í
K\Ëœ›ÙÜ™\ÜÐ™ÍO[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜÐ™ÍKœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\Œ‹œ™È‹\Ëœ›ÙÜ™\ÜÐ™ÍKœØØ[NQÜšY[™]ÈYÜ™]”™XÝ[™ÛJKKËÊK\Ëœ›ÙÜ™\ÜÐ™ÍKÚYMK\Ëœ›ÙÜ™\ÜÐ™ÍKž]\Ëœ›ÙÜ™\ÜÐ™Íž
ÌÌK\Ëœ›ÙÜ™\ÜÐ™ÍKžO]\Ëœ›ÙÜ™\ÜÐ™ÍžK\Ëœ›ÙÜ™\ÜÔ[™L‹˜YÚ[
\Ëœ›ÙÜ™\ÜÐ™ÍJK\Ëœ›ÙÜ™\ÜÐ™Í[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜÐ™Í‹œÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\œ™È‹\Ëœ›ÙÜ™\ÜÐ™Í‹ž]\Ëœ›ÙÜ™\ÜÐ™ÍKž
Ý\Ëœ›ÙÜ™\ÜÐ™ÍKÚY\Ëœ›ÙÜ™\ÜÐ™Í‹žO]\Ëœ›ÙÜ™\ÜÐ™ÍžK\Ëœ›ÙÜ™\ÜÔ[™L‹˜YÚ[
\Ëœ›ÙÜ™\ÜÐ™ÍŠK\Ëœ›ÙÜ™\ÜÏ[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\Kœ™È‹\Ëœ›ÙÜ™\ÜËœØØ[NQÜšY[™]ÈYÜ™]”™XÝ[™ÛJLK‹JK\Ëœ›ÙÜ™\ÜËÚYL\Ëœ›ÙÜ™\ÜËšZYÚN\Ëœ›ÙÜ™\ÜËž]\Ëœ›ÙÜ™\ÜÐ™ÌKž
ÌL‹\Ëœ›ÙÜ™\ÜËžO]\Ëœ›ÙÜ™\ÜÐ™ÌKžJÌË\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ëœ›ÙÜ™\ÜÊK\Ëœ›ÙÜ™\ÜÌ[™]È]ZK’[XYÙK\Ëœ›ÙÜ™\ÜÌ‹œÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\Kœ™È‹\Ëœ›ÙÜ™\ÜÌ‹œØØ[NQÜšY[™]ÈYÜ™]”™XÝ[™ÛJLK‹JK\Ëœ›ÙÜ™\ÜÌ‹ÚYL\Ëœ›ÙÜ™\ÜÌ‹šZYÚN\Ëœ›ÙÜ™\ÜÌ‹ž]\Ëœ›ÙÜ™\ÜÐ™Íž
ÌL‹\Ëœ›ÙÜ™\ÜÌ‹žO]\Ëœ›ÙÜ™\ÜÐ™ÍžJÌË\Ëœ›ÙÜ™\ÜÔ[™L‹˜YÚ[
\Ëœ›ÙÜ™\ÜÌŠK\ËœÜÒ[XYÙO[™]È]ZK’[XYÙK\ËœÜÒ[XYÙKœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\ŒKœ™È‹\ËœÜÒ[XYÙKžO]\Ëœ›ÙÜ™\ÜÐ™ÌKžKLÌ\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\ËœÜÒ[XYÙJK\ËœÜÒ[XYÙL[™]È]ZK’[XYÙK\ËœÜÒ[XYÙL‹œÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØ˜\ŒKœ™È‹\ËœÜÒ[XYÙL‹žO]\Ëœ›ÙÜ™\ÜÐ™ÍžKLÌ\Ëœ›ÙÜ™\ÜÔ[™L‹˜YÚ[
\ËœÜÒ[XYÙLŠK\Ë›Y\ÜØYÙU^[™]È]ZK“X™[\Ë›Y\ÜØYÙU^ÚYMŒ\Ë›Y\ÜØYÙU^šZYÚLŒ\Ë›Y\ÜØYÙU^^[YÛYYÜ™]’Üš^›Û[[YÛ‹ÑS•T‹\Ë›Y\ÜØYÙU^žL\Ë›Y\ÜØYÙU^žOML\Ë›Y\ÜØYÙU^œÚ^™OLŒ‹\Ë›Y\ÜØYÙU^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ë›Y\ÜØYÙU^
K\Ëœ›ÙÜ™\ÜÕ^[™]È]ZK“X™[\Ëœ›ÙÜ™\ÜÕ^ÚY]\Ë›Y\ÜØYÙU^ÚY\Ëœ›ÙÜ™\ÜÕ^šZYÚLŒ\Ëœ›ÙÜ™\ÜÕ^^[YÛYYÜ™]’Üš^›Û[[YÛ‹ÑS•T‹\Ëœ›ÙÜ™\ÜÕ^žL\Ëœ›ÙÜ™\ÜÕ^žO]\Ëœ›ÙÜ™\ÜÐ™ÌKžK\Ëœ›ÙÜ™\ÜÕ^œÚ^™OLL‹\Ëœ›ÙÜ™\ÜÕ^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ëœ›ÙÜ™\ÜÕ^
K\Ë›ØYØ[YU^O[™]È]ZK“X™[\Ë›ØYØ[YU^KšZYÚLŒ\Ë›ØYØ[YU^KžLMÍK\Ë›ØYØ[YU^KžO]\Ë›Y\ÜØYÙU^žJÌ‹\Ë›ØYØ[YU^KœÚ^™OLN\Ë›ØYØ[YU^K^H’Ú0í™È8nàÈ°èÈØ[YKZH0ì›™Èš8n©[ˆ‹\Ë›ØYØ[YU^K^ÛÛÜLMÍÍŽMŒ\Ë›ØYØ[YU^K™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ë›ØYØ[YU^[™]È]ZK“X™[\Ë›ØYØ[YU^šZYÚLŒ\Ë›ØYØ[YU^ž]\Ë›ØYØ[YU^Kž
Ý\Ë›ØYØ[YU^KÚY\Ë›ØYØ[YU^žO]\Ë›Y\ÜØYÙU^žJÌ‹\Ë›ØYØ[YU^œÚ^™OLN\Ë›ØYØ[YU^^›ÝÏJ™]ÈYÜ™]’[^\œÙ\ŠKœ\œÙ\Š›ÛÛÛÜIÈÌ‘Œ	ÏO•8n¨ÚH8n¨ZOÝOÙ›ÛˆŠK\Ë›ØYØ[YU^ÝXÚ[˜X›YHL\Ë›ØYØ[YU^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹OTÑÓ\ÙËš\ÕÖÛX[Ø[YI‰Š\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ë›ØYØ[YU^JK\Ëœ›ÙÜ™\ÜÔ[™K˜YÚ[
\Ë›ØYØ[YU^
JK\Ëœ›ÙÜ™\ÜÔ[™KžL\Ëœ›ÙÜ™\ÜÔ[™KžOMÍK\Ëœ›ÙÜ™\ÜÔ[™L‹žL\Ëœ›ÙÜ™\ÜÔ[™L‹žOMÍK\Ëœ›ÙÜ™\ÜÔ[™L‹š\ÚX›OHLK\ËœÝYÙK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ë›ØYØ[YU^˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚË\ÊK\Ë“Û”Ù]Ú[Š[
_KKœ›ÝÝ\K“Û”Ù]Ú[Y[˜Ý[ÛŠ
^Ý˜\ˆO]\ËœÝYÙKœÝYÙUÚYÝ\Ë˜™ÔXÕËO]\ËœÝYÙKœÝYÙRZYÚÝ\Ë˜™ÔXÒÏSX]›X^
KJNÝ\Ë˜™ËœØØ[V]\Ë˜™ËœØØ[VO\Ë\Ë˜™ËžJ\ËœÝYÙKœÝYÙUÚY]\Ë˜™ÔXÕÊœÊKÌ‹\Ë˜™ËžOJ\ËœÝYÙKœÝYÙRZYÚ]\Ë˜™ÔXÒ
œÊKÌ‹\Ëœ›ÙÜ™\ÜÔ[™KžJ\ËœÝYÙKœÝYÙUÚYMŒ
KÌ‹\Ëœ›ÙÜ™\ÜÔ[™KžO]\ËœÝYÙKœÝYÙRZYÚLLËLMLKKœ›ÝÝ\KœÚÝÏY[˜Ý[ÛŠ
^Ý˜YÚ[
\Ê_KKœ›ÝÝ\K˜ÛÜÙOY[˜Ý[ÛŠ
^ÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ëœ›ÙÜ™\ÜÊKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\ËœÜÒ[XYÙJK\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑK\Ë“ÛYÝYÙK\ÊK\Ë›ØYØ[YU^œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚË\ÊK\Ëœ\™[	‰Š\ËœÝYÙKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ëœ\™[œ™[[Ý™PÚ[
\ÊK™\ÛÝ\˜ÙSYÜ‹š[œÊ
K™\Ý›ÞUÚ[Š
J_KKœ›ÝÝ\KœÙ]›ÙÜ™\ÜÏY[˜Ý[ÛŠJ^Ý˜\ˆO]\Ëœ›ÙÜ™\ÜÓX^ÚY
ÌLÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ëœ›ÙÜ™\ÜÊKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\ËœÜÒ[XYÙJKYÜ™]•ÙY[‹™Ù]
\Ëœ›ÙÜ™\ÜÊKÊÝÚYš_KL
K˜Ø[
\Ë[YQ[™\ËÝJKYÜ™]•ÙY[‹™Ù]
\ËœÜÒ[XYÙJKÊÞšJÍ_KL
K\Ëœ›ÙÜ™\ÜÕ^^SX]™›ÛÜŠ
JÈ‰H‹\Ë›Y\ÜØYÙU^^YK\Ë›Y\ÜØYÙU^^ÛÛÜLMÍÍÌŒMK\Ëœ›ÙÜ™\ÜÔ[™Kš\ÚX›OHLKKœ›ÝÝ\KœÙ]›ÙÜ™\ÜÌY[˜Ý[ÛŠKJ^Ý˜\ˆÏ]\Ëœ›ÙÜ™\ÜÓX^ÚY
ÌLÙYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\Ëœ›ÙÜ™\ÜÌŠKYÜ™]•ÙY[‹œ™[[Ý™UÙY[œÊ\ËœÜÒ[XYÙLŠK\Ë›Y\ÜØYÙU^^Y_\Ë›Y\ÜØYÙU^^\Ë›Y\ÜØYÙU^^ÛÛÜLMÍÍÌŒMK\Ëœ›ÙÜ™\ÜÔ[™L‹š\ÚX›OHLYÜ™]•ÙY[‹™Ù]
\Ëœ›ÙÜ™\ÜÌŠKÊÝÚYœßKL
K˜Ø[
O]	‰šOØ[Y[ØYYÜ‹š[œÊ
K˜ÛÛ™šYÓX^[OÝ\ËœÙ]›ÙÜ™\ÜÌŽ\Ë[YQ[™\ËO]	‰šOØ[Y[ØYYÜ‹š[œÊ
K˜ÛÛ™šYÓX^[OÖÌN–ÝJKYÜ™]•ÙY[‹™Ù]
\ËœÜÒ[XYÙLŠKÊÞœÊÍ_KL
_KKœ›ÝÝ\KœÙ]›ÙÜ™\ÜÔ[™OY[˜Ý[ÛŠ
^ÚYŠ\Ëœ›ÙÜ™\ÜÔ[™Kš\ÚX›O]OO]	‰ŒOTÑÓ\ÙËš\×Ø]Y]Ý™\œÚ[ÛŠ^Ý˜\ˆO[™]È]NÝ\Ëš[YÓØY\‹›Û˜ÙJYÜ™]‘]™[ÓÓTUK[˜Ý[ÛŠ
^ÚYŠ˜Ý\œ™[\™Ù]™]J^Ý˜\ˆO[™]ÈYÜ™]•^\™NÙK˜š]X\]O]˜Ý\œ™[\™Ù]™]K\Ë˜™ËœÛÝ\˜ÙOYK\Ë˜™ËœØØ[V]\Ë˜™ËœØØ[VOLK\Ë˜™Ëž]\ËœÝYÙKœÝYÙUÚYÌ‹]\Ë˜™ÔXÕËÌ‹\Ë˜™ËžO]\ËœÝYÙKœÝYÙRZYÚÌ‹]\Ë˜™ÔXÒÌŸ_K\ÊK\Ëš[YÓØY\‹›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÛØY[™ÈŠÝ\Ë™ÝX[™Ø[Ò[™^
È‹šœÏÈŠÙK™Ù][YJ
J__KKœ›ÝÝ\K[YQ[™Y[˜Ý[ÛŠ
^ÍLO]	‰Š™]ˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÝÚ[™ÝË’›Ü\[ØYÚ[™ÝËT‘ÔÏÝÚ[™ÝË’›Ü\[ØYÚ[™ÝË’›Ü\[ØY
_KKœ›ÝÝ\K›ÛÛXÚÏY[˜Ý[ÛŠ
^ÛØØ][Û‹œ™[ØY

_K_JYÜ™]‘\Ü^SØš™XÝÛÛZ[™\ŠN××Ü™Y›XÝ
Ø[YSØY[™ÕRKœ›ÝÝ\K‘Ø[YSØY[™ÕRHŠNÝ˜\ˆØ[YSÙÚ[Y[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^ß\™]\›ˆš[œÏY[˜Ý[ÛŠ
^Ü™]\›ˆ—Ú[œß
—Ú[œÏ[™]È
K—Ú[œßKœ›ÝÝ\K››ÝYžTÙ[]YÙ\Y[˜Ý[ÛŠ
^ÓY\ÜØYÙPÙ[\‹š[œÊ
K™\Ü]Ú
”ÑSPÕQÑT•‘T‘Q
_K”ÑSPÕQÑT•‘T‘QH”ÑSPÕQÑT•‘T‘Q‹”“ÓPÔ‘PUQH”“ÓPÔ‘PUQ‹ÓÓ“‘PÕTÑÔÕPÐÏHÓÓ“‘PÕTÑÔÕPÐÈ‹”“ÓT‘U’PÑQH”“ÓT‘U’PÑQ‹J
N××Ü™Y›XÝ
Ø[YSÙÚ[‹œ›ÝÝ\K‘Ø[YSÙÚ[ˆŠNÝ˜\ˆØ[YSÙÚ[”[™UZOY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜Y]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑKK“ÛYÝYÙKJK_\™]\›ˆ×Ù^[™ÊK
KK‘Ù][œÝ[˜ÙOY[˜Ý[ÛŠ
^Ü™]\›ˆ[OYK’[œÝ[˜ÙI‰ŠK’[œÝ[˜ÙO[™]ÈJKK’[œÝ[˜Ù_KKœ›ÝÝ\K“ÛYÝYÙOY[˜Ý[ÛŠ
^Ý\Ë˜XÚÑÜ›Ý[™

K\Ë“ÙÚ[•\Ù\Š
K\Ë”\ÜÝÛÜ™ÙÚ[Š
K\Ë“Û™Ú[Š
K\ËœÝYÙK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\Ê_KKœ›ÝÝ\K“Û”Ù]Ú[Y[˜Ý[ÛŠ
^Ý\Ë˜˜XÚÙÜ›Ý[™™Ü˜\XÜË˜ÛX\Š
K\Ë˜˜XÚÙÜ›Ý[™™Ü˜\XÜË™˜]Ô™XÝ
\ËœÝYÙKœÝYÙUÚY\ËœÝYÙKœÝYÙRZYÚ
K\Ë˜˜XÚÙÜ›Ý[™™Ü˜\XÜË™[™š[

K\Ë\Ù\‹ž]\ËœÝYÙKœÝYÙUÚYÌŠÍ\Ë\Ù\‹žO]\ËœÝYÙKœÝYÙRZYÚÌ‹LL\Ë\Ù\•^ž]\ËœÝYÙKœÝYÙUÚYÌ‹LMŒ\Ë\Ù\•^žO]\ËœÝYÙKœÝYÙRZYÚÌ‹LL\Ëœ\ÜÝÛÜ™ž]\ËœÝYÙKœÝYÙUÚYÌŠÍ\Ëœ\ÜÝÛÜ™žO]\ËœÝYÙKœÝYÙRZYÚÌ‹\Ëœ\ÜÝÛÜ™^ž]\ËœÝYÙKœÝYÙUÚYÌ‹LMŒ\Ëœ\ÜÝÛÜ™^žO]\ËœÝYÙKœÝYÙRZYÚÌ‹\Ë›ÙÚ[‹ž]\ËœÝYÙKœÝYÙUÚYÌŠÝ\Ë›ÙÚ[‹ÚYÌ‹M\Ë›ÙÚ[‹žO]\ËœÝYÙKœÝYÙRZYÚÌŠÎ\ËœÚ\Kž]\Ë›ÙÚ[‹ž\ËœÚ\KžO]\Ë›ÙÚ[‹žK\ËžL\ËžOLKKœ›ÝÝ\K˜XÚÑÜ›Ý[™Y[˜Ý[ÛŠ
^Ý\Ë˜˜XÚÙÜ›Ý[™[™]ÈYÜ™]”Ú\K\Ë˜˜XÚÙÜ›Ý[™™Ü˜\XÜË˜™YÚ[‘š[

K\Ë˜˜XÚÙÜ›Ý[™™Ü˜\XÜË™˜]Ô™XÝ
\ËœÝYÙKœÝYÙUÚY\ËœÝYÙKœÝYÙRZYÚ
K\Ë˜˜XÚÙÜ›Ý[™™Ü˜\XÜË™[™š[

K\Ë˜YÚ[
\Ë˜˜XÚÙÜ›Ý[™
_KKœ›ÝÝ\K“ÙÚ[•\Ù\Y[˜Ý[ÛŠ
^Ý\Ë\Ù\[™]ÈYÜ™]•^šY[\Ë\Ù\‹˜›Ü™\HL\Ë\Ù\‹˜›Ü™\ÛÛÜLMÍÍÌŒMK\Ë\Ù\‹ÚYLÍK\Ë\Ù\‹šZYÚM\Ë\Ù\‹^[YÛYYÜ™]’Üš^›Û[[YÛ‹“Q•\Ë\Ù\‹\OYYÜ™]•^šY[\K’S”U\Ë\Ù\‹š[œ]\OYYÜ™]•^šY[[œ]\K•V\Ë\Ù\‹™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ë\Ù\‹œÚ^™OM\Ë\Ù\‹˜[˜ÚÜ“Ù™œÙ]]\Ë\Ù\‹ÚYÌ‹\Ë\Ù\‹˜[˜ÚÜ“Ù™œÙ]O]\Ë\Ù\‹šZYÚÌ‹\Ë\Ù\‹ž]\ËœÝYÙKœÝYÙUÚYÌŠÍ\Ë\Ù\‹žO]\ËœÝYÙKœÝYÙRZYÚÌ‹LL\Ë\Ù\‹^ÛÛÜLMÍÍÌŒMNÝ˜\ˆYYÜ™]›ØØ[ÝÜ˜YÙK™Ù]][J“ÙÚ[—ÚWÕ\Ù\—Ó˜[YHŠNÝÝ\Ë\Ù\‹^]\Ë\Ù\‹^H˜ÛY[Œ‹\Ë˜YÚ[
\Ë\Ù\ŠK\Ë\Ù\•^[™]ÈYÜ™]•^šY[\Ë\Ù\•^^H•0èHÚøn¨ÛŽˆ‹\Ë\Ù\•^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ë\Ù\•^œÚ^™OLÍK\Ë\Ù\•^^ÛÛÜLMÍÍÌŒMK\Ë\Ù\•^˜[˜ÚÜ“Ù™œÙ]]\Ë\Ù\•^ÚYÌ‹\Ë\Ù\•^˜[˜ÚÜ“Ù™œÙ]O]\Ë\Ù\•^šZYÚÌ‹\Ë\Ù\•^ž]\ËœÝYÙKœÝYÙUÚYÌ‹LMŒ\Ë\Ù\•^žO]\ËœÝYÙKœÝYÙRZYÚÌ‹LL\Ë˜YÚ[
\Ë\Ù\•^
_KKœ›ÝÝ\K”\ÜÝÛÜ™ÙÚ[Y[˜Ý[ÛŠ
^Ý\Ëœ\ÜÝÛÜ™[™]ÈYÜ™]•^šY[\Ëœ\ÜÝÛÜ™˜›Ü™\HL\Ëœ\ÜÝÛÜ™˜›Ü™\ÛÛÜLMÍÍÌŒMK\Ëœ\ÜÝÛÜ™ÚYLÍK\Ëœ\ÜÝÛÜ™šZYÚM\Ëœ\ÜÝÛÜ™^[YÛYYÜ™]’Üš^›Û[[YÛ‹“Q•\Ëœ\ÜÝÛÜ™\OYYÜ™]•^šY[\K’S”U\Ëœ\ÜÝÛÜ™š[œ]\OYYÜ™]•^šY[[œ]\K”TÔÕÓÔ‘\Ëœ\ÜÝÛÜ™™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ëœ\ÜÝÛÜ™œÚ^™OLÌ\Ëœ\ÜÝÛÜ™˜[˜ÚÜ“Ù™œÙ]]\Ëœ\ÜÝÛÜ™ÚYÌ‹\Ëœ\ÜÝÛÜ™˜[˜ÚÜ“Ù™œÙ]O]\Ëœ\ÜÝÛÜ™šZYÚÌ‹\Ëœ\ÜÝÛÜ™ž]\ËœÝYÙKœÝYÙUÚYÌŠÍ\Ëœ\ÜÝÛÜ™žO]\ËœÝYÙKœÝYÙRZYÚÌ‹\Ëœ\ÜÝÛÜ™^ÛÛÜLMÍÍÌŒMK\Ë˜YÚ[
\Ëœ\ÜÝÛÜ™
K\Ëœ\ÜÝÛÜ™^[™]ÈYÜ™]•^šY[\Ëœ\ÜÝÛÜ™^^H“xn«]Ú8nª]Nˆ‹\Ëœ\ÜÝÛÜ™^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ëœ\ÜÝÛÜ™^œÚ^™OLÍK\Ëœ\ÜÝÛÜ™^^ÛÛÜLMÍÍÌŒMK\Ëœ\ÜÝÛÜ™^˜[˜ÚÜ“Ù™œÙ]]\Ëœ\ÜÝÛÜ™^ÚYÌ‹\Ëœ\ÜÝÛÜ™^˜[˜ÚÜ“Ù™œÙ]O]\Ëœ\ÜÝÛÜ™^šZYÚÌ‹\Ëœ\ÜÝÛÜ™^ž]\ËœÝYÙKœÝYÙUÚYÌ‹LMŒ\Ëœ\ÜÝÛÜ™^žO]\ËœÝYÙKœÝYÙRZYÚÌ‹\Ë˜YÚ[
\Ëœ\ÜÝÛÜ™^
_KKœ›ÝÝ\K“Û™Ú[Y[˜Ý[ÛŠ
^Ý\Ë›ÙÚ[[™]ÈYÜ™]•^šY[\Ë›ÙÚ[‹ÚYN\Ë›ÙÚ[‹šZYÚM\Ë›ÙÚ[‹^H±$1 Û™Èš8n«\‹\Ë›ÙÚ[‹^[YÛYYÜ™]’Üš^›Û[[YÛ‹ÑS•T‹\Ë›ÙÚ[‹™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ë›ÙÚ[‹œÚ^™OLÌ\Ë›ÙÚ[‹ž]\ËœÝYÙKœÝYÙUÚYÌŠÝ\Ë›ÙÚ[‹ÚYÌ‹M\Ë›ÙÚ[‹žO]\ËœÝYÙKœÝYÙRZYÚÌŠÎ\Ë›ÙÚ[‹^ÛÛÜLMÍÍÌŒMK\Ë›ÙÚ[‹ÝXÚ[˜X›YHL\Ë›ÙÚ[‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÐ‘QÒS‹\Ë•\Ù\“ÙÚ[‹\ÊK\ËœÚ\O[™]ÈYÜ™]”Ú\K\ËœÚ\K™Ü˜\XÜË˜™YÚ[‘š[
ŒÍÊK\ËœÚ\K™Ü˜\XÜË™˜]Ô™XÝ
\Ë›ÙÚ[‹ÚY\Ë›ÙÚ[‹šZYÚ
K\ËœÚ\K™Ü˜\XÜË™[™š[

K\ËœÚ\Kž]\Ë›ÙÚ[‹ž\ËœÚ\KžO]\Ë›ÙÚ[‹žK\Ë˜YÚ[
\ËœÚ\JK\Ë˜YÚ[
\Ë›ÙÚ[Š_KKœ›ÝÝ\KœÚÝÏY[˜Ý[ÛŠ
^ÝÚ[™ÝË’›Ü\[ØYÝ\Ë•\Ù\“ÙÚ[Š
N˜YÚ[
\ÊKÛÝ[™YÜ‹š[œÊ
Kœ^QY™™XÝ
ÛÝ[™][•ÒS‘ÕÊ_KKœ›ÝÝ\K•\Ù\“ÙÚ[Y[˜Ý[ÛŠ
^ÚYŠˆO]\Ë\Ù\‹^
NÙ[Ù^È™]ˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y
›Ü\K›Ü[’Q]\Ë\Ù\‹^
KÙÚ[‘]K‘Ù][œÝ[˜ÙJ
K‘Ù]\Ù\•›Ê
K\Ù\—Û˜[YO]\Ë\Ù\‹^Ý˜\ˆSÙÚ[‘]K‘Ù][œÝ[˜ÙJ
K‘Ù]\Ù\•›Ê
NÌOTÑÓ\ÙËš\ÕÖÛX[Ø[YI‰ŠZY]\Ë\Ù\‹^›Ü\Kœ\ÜÝÛÜ™HŒLŒÍMˆŠKYÜ™]›ØØ[ÝÜ˜YÙKœÙ]][J“ÙÚ[—ÚWÕ\Ù\—Ó˜[YH‹\Ë\Ù\‹^
KÚ[™ÝËT‘ÔÏÝÚ[™ÝË’›Ü\[ØYÊ›Ü\KœÙ]ØY›ÙÜ™\ÜÊŒŠ1$[™È1$q Û™Èš8n«\°èÈØ[YJHŠKØ[YSØY[™ÕRK‘Ù][œÝ[˜ÙJ
KœÙ]›ÙÜ™\ÜÔ[™JL
JNŠØ[YTÙ[XÝÙ\™URK‘Ù][œÝ[˜ÙJ
KœÚÝÊ\Ëœ\™[
KØ[YSØY[™ÕRK‘Ù][œÝ[˜ÙJ
KœÙ]›ÙÜ™\ÜÔ[™JLJJNŠØ[YSÙÚ[‹š[œÊ
K››ÝYžTÙ[]YÙ\Š
K›Ü\KœÙ]ØY›ÙÜ™\ÜÊŒŠ1$[™È1$q Û™Èš8n«\°èÈØ[YJHŠKØ[YSØY[™ÕRK‘Ù][œÝ[˜ÙJ
KœÙ]›ÙÜ™\ÜÔ[™JL
JK\Ë›ÙÚ[‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÐ‘QÒS‹\Ë•\Ù\“ÙÚ[‹\ÊK\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑK\Ë“ÛYÝYÙK\ÊK\ËœÝYÙKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ëœ\™[	‰\Ëœ\™[œ™[[Ý™PÚ[
\ÊKÛÝ[™YÜ‹š[œÊ
Kœ^QY™™XÝ
ÛÝ[™][•ÒS‘ÕÊ__K_JYÜ™]‘\Ü^SØš™XÝÛÛZ[™\ŠN××Ü™Y›XÝ
Ø[YSÙÚ[”[™UZKœ›ÝÝ\K‘Ø[YSÙÚ[”[™UZHŠNÝ˜\ˆØ[YTÙ[XÝÙ\™UROY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆKX[R][P\œV×KKš][P\œV×KK˜™ÔXÕÏMŒK˜™ÔXÒNMKœÙ\™UX[T[™S[Ý™VOLNMKKœÙ\™UX[T[™TÚÝÒYÚMMÍKK™›Y×Ý\›VÈžX[™WÚ[È‹žX[™WÚ[È‹žX[™WÞ[ˆ‹žX[™WÞ[ˆ‹žX[™WÚH‹žX[™WÚH—KKÞžY›Y×Ý\›VÈÞž^X[™WÚ[È‹Þž^X[™WÚ[È‹Þž^X[™WÞ[ˆ‹Þž^X[™WÞ[ˆ‹žX[™WÚH‹Þž^X[™WÚH—KKš\Ò[’]Ø[Ü[’YHLKK˜Y]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑKK“ÛYÝYÙKJK_\™]\›ˆ×Ù^[™ÊK
KK‘Ù][œÝ[˜ÙOY[˜Ý[ÛŠ
^Ü™]\›ˆ[OYK’[œÝ[˜ÙI‰ŠK’[œÝ[˜ÙO[™]ÈJKK’[œÝ[˜Ù_KKœ›ÝÝ\K“ÛYÝYÙOY[˜Ý[ÛŠ
^Ý\ËœÙ[XÝÙ\™T[™O[™]ÈYÜ™]‘\Ü^SØš™XÝÛÛZ[™\‹\Ë˜YÚ[
\ËœÙ[XÝÙ\™T[™JK\Ë››ÝÔÙ\™T[™O[™]ÈYÜ™]‘\Ü^SØš™XÝÛÛZ[™\‹\Ë˜YÚ[
\Ë››ÝÔÙ\™T[™JK\Ë˜™Ï[™]È]ZK’[XYÙK\Ë˜™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÜÝ™\™Ëœ™È‹\Ë˜™ËžLLK\Ë˜™ËžOLLK\ËœÙ[XÝÙ\™T[™K˜YÚ[
\Ë˜™ÊK\Ë˜[™]È]ZK]Û‹\Ë˜‹œÚÚ[“˜[YOH”ÚÚ[ˆ‹\Ë˜‹šXÛÛT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËØÛÜÙP‹œ™È‹\Ë˜‹žMLÌ\Ë˜‹žOLMK\ËœÙ[XÝÙ\™T[™K˜YÚ[
\Ë˜ŠK\ËœÙ\™TÝ]P™Ï[™]È]ZK’[XYÙKÞžHOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÝ\ËœÙ\™TÝ]P™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÝÞžKÝÞž\Ý][Y\ÜØYÙKœ™ÈŽ\ËœÙ\™TÝ]P™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÜÝ][Y\ÜØYÙKœ™È‹\ËœÙ\™TÝ]P™ËžLK\ËœÙ\™TÝ]P™ËžOMÍÌ\ËœÙ[XÝÙ\™T[™K˜YÚ[
\ËœÙ\™TÝ]P™ÊK\Ëš][TÙ\™UX[T[™O[™]ÈYÜ™]‘\Ü^SØš™XÝÛÛZ[™\‹\Ëš][TÙ\™UX[T[™KžMK\Ëš][TÙ\™UX[T[™KžO]\ËœÙ\™UX[T[™S[Ý™VK\ËœÙ[XÝÙ\™T[™K˜YÚ[
\Ëš][TÙ\™UX[T[™JK\Ë˜[Ù]™\“\Ý[™]È]ZK“\Ý\Ë˜[Ù]™\“\ÝœØÜ›Û[˜X›YHL\Ë˜[Ù]™\“\Ýš][T™[™\™\P[Ù\™R][T[™K\Ë˜[Ù]™\“\ÝØÜ›Û\[™]È]ZK”ØÜ›Û\‹\Ë˜[Ù]™\“\ÝØÜ›Û\‹šY]ÜÜ]\Ë˜[Ù]™\“\Ý\Ë˜[Ù]™\“\ÝØÜ›Û\‹šZYÚMMŒ\Ë˜[Ù]™\“\ÝØÜ›Û\‹ÚYLML\Ë˜[Ù]™\“\ÝØÜ›Û\‹œØÜ›ÛÛXÞUY]ZK”ØÜ›ÛÛXÞKUUË\Ëš][TÙ\™UX[T[™K˜YÚ[
\Ë˜[Ù]™\“\ÝØÜ›Û\ŠK\Ëš][TÙ\™T[™O[™]ÈYÜ™]‘\Ü^SØš™XÝÛÛZ[™\‹\Ëš][TÙ\™T[™KžLŒÌ\Ëš][TÙ\™T[™KžO]\Ëš][TÙ\™UX[T[™KžK\ËœÙ[XÝÙ\™T[™K˜YÚ[
\Ëš][TÙ\™T[™JK\ËœÙ]™\“\Ý[™]È]ZK“\Ý\ËœÙ]™\“\ÝœØÜ›Û[˜X›YHL\ËœÙ]™\“\Ýš][T™[™\™\TÙ\™R][T[™K\ËœÙ]™\“\ÝÚYLÌK\ËœÙ]™\“\ÝØÜ›Û\[™]È]ZK”ØÜ›Û\‹\ËœÙ]™\“\ÝØÜ›Û\‹šY]ÜÜ]\ËœÙ]™\“\Ý\ËœÙ]™\“\ÝØÜ›Û\‹šZYÚMMŒ\ËœÙ]™\“\ÝØÜ›Û\‹ÚYLÌMK\Ëš][TÙ\™T[™K˜YÚ[
\ËœÙ]™\“\ÝØÜ›Û\ŠK\Ë›ÙÛÏ[™]È]ZK’[XYÙKÞžHOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÝ\Ë›ÙÛËžOML\Ë›ÙÛËžOLL\Ë››ÝÔÙ\™T[™K˜YÚ[
\Ë›ÙÛÊK\Ë››ÝÔÙ\™T[™P™Ï[™]È]ZK’[XYÙKÞžHOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÝ\Ë››ÝÔÙ\™T[™P™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÝÞžKÝÞž\Ù[XÔÙ\™\™Ëœ™ÈŽ\Ë››ÝÔÙ\™T[™P™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÜÙ[XÔÙ\™\™Ëœ™È‹\Ë››ÝÔÙ\™T[™P™ËžMŒ‹\Ë››ÝÔÙ\™T[™P™ËžOMÌË\Ë››ÝÔÙ\™T[™K˜YÚ[
\Ë››ÝÔÙ\™T[™P™ÊK\Ë››ÝÔÙ[XÝÙ\™\”Ý]TXÏ[™]È]ZK’[XYÙK\Ë››ÝÔÙ[XÝÙ\™\”Ý]TXËžLL\Ë››ÝÔÙ[XÝÙ\™\”Ý]TXËžOM‹\Ë››ÝÔÙ\™T[™K˜YÚ[
\Ë››ÝÔÙ[XÝÙ\™\”Ý]TXÊK\Ë››ÝÔÙ[XÝÙ\™\•^[™]È]ZK“X™[\Ë››ÝÔÙ[XÝÙ\™\•^ÚYL‹\Ë››ÝÔÙ[XÝÙ\™\•^šZYÚLK\Ë››ÝÔÙ[XÝÙ\™\•^œÚ^™OLŒ\Ë››ÝÔÙ[XÝÙ\™\•^^[YÛYYÜ™]’Üš^›Û[[YÛ‹ÑS•T‹\Ë››ÝÔÙ[XÝÙ\™\•^^ÛÛÜLMÍÍÌŒMK\Ë››ÝÔÙ[XÝÙ\™\•^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹\Ë››ÝÔÙ[XÝÙ\™\•^žLMŒ\Ë››ÝÔÙ[XÝÙ\™\•^žOM\Ë››ÝÔÙ\™T[™K˜YÚ[
\Ë››ÝÔÙ[XÝÙ\™\•^
K\ËœÙ[XÝ[™]È]ZK]Û‹\ËœÙ[XÝ‹œÚÚ[“˜[YOH”ÚÚ[ˆ‹ÞžHOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÝ\ËœÙ[XÝ‹šXÛÛT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÝÞžKÝÞž\Ù[XÝÙ\™\™Ëœ™ÈŽ\ËœÙ[XÝ‹šXÛÛT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÜÙ[XÝÙ\™\™Ëœ™È‹\ËœÙ[XÝ‹žMM\ËœÙ[XÝ‹žOMË\Ë››ÝÔÙ\™T[™K˜YÚ[
\ËœÙ[XÝŠK\Ëš[‘Ø[YP[™]È]ZK]Û‹\Ëš[‘Ø[YP‹œÚÚ[“˜[YOH”ÚÚ[ˆ‹ÞžHOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÝ\Ëš[‘Ø[YP‹šXÛÛT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÝÞžKÝÞž\Ý\‹œ™ÈŽ\Ëš[‘Ø[YP‹šXÛÛT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÜÝ\‹œ™È‹\Ëš[‘Ø[YP‹žLÍK\Ëš[‘Ø[YP‹žOMÍL\Ë››ÝÔÙ\™T[™K˜YÚ[
\Ëš[‘Ø[YPŠK\Ë˜[Ù]™\“\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›ÛÛXÚÔÙ]™\•X[K\ÊK\ËœÙ]™\“\Ý˜Y]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›ÛÛXÚÔÙ]™\‹\ÊK\Ë˜‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚÐÛÜÙK\ÊK\ËœÙ[XÝ‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚÔÙ[XÝ‹\ÊK\Ëš[‘Ø[YP‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚÒ[‘Ø[YK\ÊK\Ë››ÝÔÙ\™T[™Kš\ÚX›OHL\ËœÙ[XÝÙ\™T[™Kš\ÚX›OHLK\ËœÝYÙK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ë“Û”Ù]Ú[Š[
_KKœ›ÝÝ\K“Û”Ù]Ú[Y[˜Ý[ÛŠ
^Ý\Ëž]\ËœÝYÙKœÝYÙUÚYÌ‹]\Ë˜™ÔXÕËÌ‹\ËžO]\ËœÝYÙKœÝYÙRZYÚÌ‹]\Ë˜™ÔXÒÌŸKKœ›ÝÝ\KœÚÝÏY[˜Ý[ÛŠ
^Ý˜\ˆO]\ÎÝ˜YÚ[
\ÊKÛÝ[™YÜ‹š[œÊ
Kœ^QY™™XÝ
ÛÝ[™][•ÒS‘ÕÊNÝ˜\ˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÏ[™]ÈYÜ™]’[XYÙSØY\ŽÚYŠË˜Ü›ÜÜÓÜšYÚ[H˜[›Ûž[[Ý\È‹˜NMˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y
^ÜË›Û˜ÙJYÜ™]‘]™[ÓÓTUK[˜Ý[ÛŠ
^ÚYŠ˜Ý\œ™[\™Ù]™]J^Ý˜\ˆO[™]ÈYÜ™]•^\™NÙK˜š]X\]O]˜Ý\œ™[\™Ù]™]K\Ë›ÙÛËœÛÝ\˜ÙOYK\Ë›ÙÛËž]\Ë˜™ÔXÕËÌ‹]\Ë›ÙÛËÚYÌŸ_K\ÊNÝ˜\ˆ[™]È]NÜË›Û˜ÙJYÜ™]’SÑ\œ›Ü‘]™[’S×ÑT”“Ô‹[˜Ý[ÛŠ
^ÜË›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÛÙÛËœ™ÏÈŠÛ‹™Ù][YJ
JBŸK\ÊKˆˆOZOÜË›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ˜YÙ[\ÜÙ]ËÈŠÚJÈ‹ÛÙÛËœ™ÏÈŠÛ‹™Ù][YJ
JNœË›ØY
™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÛÙÛËœ™ÏÈŠÛ‹™Ù][YJ
J_ZYŠOTÑÓ\ÙËš\Ð]]Üš^˜][ÛžUÖÊ\Ëš[‘Ø[YP‹š\ÚX›OHLK[O]\ËÞ‰‰Š\ËÞ]Ú[™ÝËÞ˜Ü™X]U\Ù\’[™›Ð]ÛŠÝ\Nˆš[XYÙH‹[XYÙN”™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÜÝ\‹œ™È‹Ý[NžÛYÚ[™ÝËÞ™Ù]Þ\Ý[R[™›ÔÞ[˜Ê
KÚ[™ÝÕÚYÌ‹LM‹K›ÝÛNŽLÚYŒŽKZYÚŽLK[™RZYÚ˜XÚÙÜ›Ý[™ÛÛÜŽˆˆÙ™Œ‹ÛÛÜŽˆˆÙ™™™™™ˆ‹^[YÛŽˆ˜Ù[\ˆ‹›ÛÚ^™NŒM‹›Ü™\”˜Y]\Î_JJK\ËÞ‹›Û•\
[˜Ý[ÛŠ
^Ý\Ù\’[™›ÏÊKš[‘Ø[YP‹š\ÚX›OHLÛÛœÛÛK›ÙÊ¹£¢9§`ù¢$9b§ÈŠKÑÓ\ÙËš\Ð]]Üš^˜][ÛžUÖHLKÞ‹šYJ
KKÞ‹™\Ý›ÞJ
JN˜ÛÛœÛÛK›ÙÊ¹£¢9§`ùi,z-)HŠ_JJN\Ëš[‘Ø[YP‹š\ÚX›OHLÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KœÙ]ÙÚ[Ø[˜XÚÊ\Ë˜Ø[˜XÚË\ÊKÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KœÙ]Ù]ÖÜ[’YØ[
\Ë\Ù\’[”Ù\™\‹\ÊKÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KœÙ]Ù\™\“\ÝžPTÕÊ\ËœÙ]Ù\™\“\Ý\ÊK˜\ÝÈˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y
]\ËœÙ]Ù\™\“\Ý

NÙ[Ù^Ý˜\ˆÏSÙÚ[‘]K‘Ù][œÝ[˜ÙJ
K‘Ù]\Ù\•›Ê
NÈˆˆO[ËZY	‰\ËœÙ]Ù\™\“\Ý

__KKœ›ÝÝ\KœÙ]Ù\™\“\ÝY[˜Ý[ÛŠ
^ØÛÛœÛÛK›ÙÊœÙ]Ù\™\“\Ý‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹ŒŒŒŒŒŒˆŠNÝ˜\ˆHLNÚYŠ\ËœÙ\™\—Û\ÝÙ]OTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K™Ù]Ù\™\“\Ý

KœÙ\™\“\ÝOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K’\ÕÚ]U\Ù\Š
I‰Š\ËœÙ\™\—Û\ÝÙ]O]\ËœÙ\™\—Û\ÝÙ]K™š[\Š\Ë”Ù\™\‘š[\‹\ÊJKJ\ËœÙ\™\—Û\ÝÙ]K›[™ÝL
J^Ù›ÜŠ˜\ˆO]\ËœÙ\™\—Û\ÝÙ]K›[™ÝOV×KÏLLLÙOŒÊ^Ý˜\ˆÏV×NÛÏYO[ÖÜÊ›ŠÌK
ÊÌJJ›—N–ÜÊ›ŠÌKÊ›ŠÙWKK[œÚY
Ù]N›Ë˜[YN›ÖÌJÈ‹HŠÛÖÌWJÈ’ÚHŸJKÊÏLKKO[ŸTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K‘Ù]\ÝÙÚ[”Ù\™\“\Ý

K›[™ÝŒÚK[œÚY
Ù]N–×K˜[YNˆ±$1 Û™Èš8n«\øn©Ûˆ1$pèžHŸJNHL\Ë˜[Ù]™\“\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠJK\ËœÙ]Ù[XÝžR[™^

NÙ›ÜŠ˜\ˆK‹LÚK›[™Ý	‰ŠOZVÚK™]K]\Ë™Ù]Ù\™\—Û\Ý
JKJ‹›[™ÝŒ
JNÚ
ÊÊNÝ\ËœÙ]\Ù\”Ù\™\‘]J–ÌJK™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙK™Ø[YWÝ˜[Y]WÛÙÛÛŠKÛÛœÛÛK›ÙÊº, ùå*š\9ëbyî©ù£©ycèË‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹ŒÈŠKÛÛœÛÛK›ÙÊÑÓ\ÙËš\×ÜÚÝ×Üš]š[YÙWÜ™]Ø\™
KÛÛœÛÛK›ÙÊÑÓ\ÙËš\×ÜÚÝ×Üš]š[YÙWÙÚY
KÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K”Ù[™™\Ü[\–›Û™J
KOO]	‰ˆ˜\ÝÈOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y	‰\Ë›ÛÛXÚÒ[‘Ø[YJ[
__KKœ›ÝÝ\K›ÛÛXÚÔÙ]™\•X[OY[˜Ý[ÛŠ
^Ýš][R[™^L	‰\ËœÙ]Ù[XÝžR[™^
š][R[™^
_KKœ›ÝÝ\KœÙ]Ù[XÝžR[™^Y[˜Ý[ÛŠ
^Ý\ËœÙ]Ù]™\’][J
_KKœ›ÝÝ\KœÙ]Ù]™\’][OY[˜Ý[ÛŠ
^Ý\Ë››ÝÐ[Ù\™R][T[™I‰\Ë››ÝÐ[Ù\™R][T[™KœÙ]ÛXÝ
LJK\Ë››ÝÐ[Ù\™R][T[™O]\Ë˜[Ù]™\“\Ý™Ù]š\X[[[Y[]

K\Ë››ÝÐ[Ù\™R][T[™KœÙ]ÛXÝ
L
NÝ˜\ˆO]\Ë˜[Ù]™\“\Ý™]T›ÝšY\‹™Ù]][P]

NÚYŠ\ËœÙ\™\—Û\ÝÙ]I‰™J^Ý˜\ˆOYK™]KÏ]\Ë™Ù]Ù\™\—Û\Ý
JNÝ\Ë\]TÙ\™\ŠÊ__KKœ›ÝÝ\K™Ù]Ù\™\—Û\ÝY[˜Ý[ÛŠ
^Ý˜\ˆNÚYŠO]›[™Ý
^Ý˜\ˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K‘Ù]\ÝÙÚ[”Ù\™\“\Ý

KÏSX]›Z[ŠLK›[™Ý
NÙOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K‘Ù]Ù\™\“\ÝžRYÊKœÛXÙJÊJ_Y[Ù^Ý˜\ˆ]\ËœÙ\™\—Û\ÝÙ]K›[™Ý]ÌWKÏ]\ËœÙ\™\—Û\ÝÙ]K›[™Ý]ÌJÌNÙO]\ËœÙ\™\—Û\ÝÙ]KœÛXÙJ‹Ê_\™]\›ˆ_KKœ›ÝÝ\K\]TÙ\™\Y[˜Ý[ÛŠ
^Ý\ËœÙ]™\“\Ý™]T›ÝšY\[™]È]ZK\œ˜^PÛÛXÝ[ÛŠ
_KKœ›ÝÝ\K›ÛÛXÚÔÙ]™\Y[˜Ý[ÛŠ
^Ý˜\ˆO]\ËœÙ]™\“\Ý™]T›ÝšY\‹™Ù]][P]
š][R[™^
NÚYŠJ^Ý˜\ˆO]\Ë˜ÚXXÚÔÙ\™\”Ø]JJNÌOOZI‰Š\ËœÙ]\Ù\”Ù\™\‘]JJK\Ë›ÛÛXÚÐÛÜÙJ[
J__KKœ›ÝÝ\KœÙ]\Ù\”Ù\™\‘]OY[˜Ý[ÛŠ
^ÚYŠ[O]
Y›ÜŠ˜\ˆO]\ËœÙ\™\—Û\ÝÙ]K›[™ÝLKOYNÚOL	‰Š]\ËœÙ\™\—Û\ÝÙ]VÚWKHO]\Ë˜ÚXXÚÔÙ\™\”Ø]JLJJNÚKKJNÝ\Ë››ÝÔÙ[XÝÙ\™\‘]O]Ý˜\ˆÏSÙÚ[‘]K‘Ù][œÝ[˜ÙJ
K‘Ù]\Ù\•›Ê
NÝ\ËœÙ]Ù\™\‘]J\Ë››ÝÔÙ[XÝÙ\™\‘]JK™]ˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÌOTÑÓ\ÙËš\ÕÖÛX[Ø[YI‰Š›Ü\K›Ü[’QTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y
È—ÈŠÜËZY
N’›Ü\K›Ü[’QTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y
È—ÈŠÜËZY›Ü\Kœ\ÜÝÛÜ™HŒLŒÍMˆ‹ÙÚ[‘]K‘Ù][œÝ[˜ÙJ
K‘Ù]\Ù\•›Ê
K™Ø[YWÜÙ\™\—Û˜[YO]\Ë‘XÛÙU[šXÛÙJ›˜[YJK\Ë\]S›ÝÔÙ[XÝÙ\™\Š
_KKœ›ÝÝ\KœÙ]Ù\™\‘]OY[˜Ý[ÛŠ
^ÚYŠ[O]Ú[™ÝË’›Ü\[ØY
^Ý˜\ˆOSÙÚ[‘]K‘Ù][œÝ[˜ÙJ
K‘Ù]\Ù\•›Ê
KO]š\Ï]œÜ]šYÚYŠ›Y\™ÙRY
^Ý˜\ˆÏTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K‘Ù]Ù\™\’[™›ÐžRY
›Y\™ÙRY
NÒ›Ü\KœÜšY[ËšY›Ü\KœÙ\™\’T[Ëš\›Ü\KœÙ\™\”Ü[ËœÜK™Ø[YWÜÙ\™\—ÚY[ËšYY[ÙH›Ü\KœÜšY[‹›Ü\KœÙ\™\’TZK›Ü\KœÙ\™\”Ü\ËK™Ø[YWÜÙ\™\—ÚY]šY_KKœ›ÝÝ\K›Û™ÑØ[YOY[˜Ý[ÛŠ
^ÛØØ][Û‹œ™[ØY

_KKœ›ÝÝ\K˜Ø[˜XÚÏY[˜Ý[ÛŠ
^Ô™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙK™Ø[YWÝ˜[Y]WÛÙÛÛ—Ù[™
K\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑK\Ë“ÛYÝYÙK\ÊK\ËœÝYÙI‰\ËœÝYÙKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ë˜[Ù]™\“\Ýœ™[[Ý™Q]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›ÛÛXÚÔÙ]™\•X[K\ÊK\ËœÙ]™\“\Ýœ™[[Ý™Q]™[\Ý[™\Š]ZK’][U\]™[’USWÕT\Ë›ÛÛXÚÔÙ]™\‹\ÊK\Ë˜‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚÐÛÜÙK\ÊK\ËœÙ[XÝ‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚÔÙ[XÝ‹\ÊK\Ëš[‘Ø[YP‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚÒ[‘Ø[YK\ÊK\Ëœ\™[	‰Š\Ëœ\™[œ™[[Ý™PÚ[
\ÊK™\ÛÝ\˜ÙSYÜ‹š[œÊ
K™\Ý›ÞUÚ[Š
JKØ[YSÙÚ[‹š[œÊ
K››ÝYžTÙ[]YÙ\Š
_KKœ›ÝÝ\K›ÛÛXÚÐÛÜÙOY[˜Ý[ÛŠ
^Ý\Ë››ÝÔÙ\™T[™Kš\ÚX›OHL\ËœÙ[XÝÙ\™T[™Kš\ÚX›OHL_KKœ›ÝÝ\K›ÛÛXÚÔÙ[XÝY[˜Ý[ÛŠ
^Ý\Ë››ÝÔÙ\™T[™Kš\ÚX›OHLK\ËœÙ[XÝÙ\™T[™Kš\ÚX›OHLKKœ›ÝÝ\K›ÛÛXÚÒ[‘Ø[YOY[˜Ý[ÛŠ
^ÚYŠOOTÑÓ\ÙËš\ÕÖÛX[Ø[YJ^ÚYŠHOTÑÓ\ÙËš\Ð]]Üš^˜][ÛžUÖ
\™]\›ˆ›ÚYÛÛœÛÛK›ÙÊ¹à®yaîùænùoey£"zd«ŠNÚYŠˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KÞÜ[’Y
\™]\›ˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
Kš\×ÜÙÚ[š]ÔÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K™Ù]ÖÜ[’Y

N”ÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KÞÙÚ[Š
K›ÚY
O]\Ëš\Ò[’]Ø[Ü[’YÝ\Ëš\Ò[’]Ø[Ü[’YHL\ËœÙ]\Ê±$[™È1$q Û™Èš8n«\ZH0ì›™ÈÚ8nçHŠJNÝ˜\ˆOSÙÚ[‘]K‘Ù][œÝ[˜ÙJ
K‘Ù]\Ù\•›Ê
NÙK\Ù\—Û˜[YOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KÞÜ[’YKZYTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KÞÜ[’Y›Ü\K›Ü[’QTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y
È—ÈŠÙKZYÛÛœÛÛK›ÙÊÞÜ[’Y‹ÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KÞÜ[’Y
_]\Ë\Ù\’[”Ù\™\Š
_KKœ›ÝÝ\K\Ù\’[”Ù\™\Y[˜Ý[ÛŠ
^ÚYŠ\Ë››ÝÔÙ[XÝÙ\™\‘]I‰ŒOO]\Ë˜ÚXXÚÔÙ\™\”Ø]J\Ë››ÝÔÙ[XÝÙ\™\‘]JJ^Ý˜\ˆ]\Ë››ÝÔÙ[XÝÙ\™\‘]NÚYŠ\ËœÙ]Ù\™\‘]J\Ë››ÝÔÙ[XÝÙ\™\‘]JKOOTÑÓ\ÙËš\ÕÖÛX[Ø[YJ^ÚYŠˆOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KÞÜ[’Y
\™]\›ŽÚYŠˆOR›Ü\K›Ü[’Q
\™]\›ŽÚYŠ›Ü\K›Ü[’QOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y
È—ÈŠ\™]\›ŽÝ\Ë›ÙÚ[žUÖ

_Y[ÙH›Ü\K›Ü[’Q	‰’›Ü\K›Ü[’QOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[Y
È—ÈÊÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KYÙÚ[”Ù\™\“\Ý
šY
K\Ë˜Ø[˜XÚÊ
KÛÝ[™YÜ‹š[œÊ
Kœ^QY™™XÝ
ÛÝ[™][•ÒS‘ÕÊJNˆ˜ÛY[OTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KœÙÕ\I‰”ÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K”Ù[™ÙÚ[Š
__KKœ›ÝÝ\K›ÙÚ[žUÖY[˜Ý[ÛŠ
^Ý˜\ˆ]\ËO]\Ë››ÝÔÙ[XÝÙ\™\‘]NÝÚ[™ÝËÞY\\‰‰Š\ËœÙ]\Ê±$[™ÈpêHøn©ÝH1$q Û™Èš8n«\ZH0ì›™ÈÚ8nçHŠKÛÛœÛÛK›ÙÊº+íù¬`ÞY\\—ÛÙÚ[¹£©ycèø )¸ )ˆŠKÚ[™ÝËÞY\\‹ÞY\\—ÛÙÚ[Š[˜Ý[ÛŠ
^Ô™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙKœÝ\ÙØ[YWÓØYJKÛÛœÛÛK›ÙÊÞY\\—ÛÙÚ[º/å9fç¹îäù§§ÝXØÙ\ÜÏH‹
KÑÓ\ÙË‘Ù][œÝ[˜ÙJ
KYÙÚ[”Ù\™\“\Ý
KšY
KK‘Ù][œÝ[˜ÙJ
K˜Ø[˜XÚÊ
KÛÝ[™YÜ‹š[œÊ
Kœ^QY™™XÝ
ÛÝ[™][•ÒS‘ÕÊ_K[˜Ý[ÛŠJ^Ô™\ÜY\ÜØYÙK‘Ù][œÝ[˜ÙJ
KœÙ[™™\Ü
™\ÜY\ÜØYÙKœÝ\ÙØ[YWÓØY
KÛÛœÛÛK›ÙÊÞY\\—ÛÙÚ[º/å9fç¹îäù§§˜Z[YH‹JKÑÓ\ÙË˜Ø[ÙZV[™ÓØY[OLÊÑÓ\ÙË˜Ø[ÙZV[™ÓØY[JÏLK›ÙÚ[žUÖ

JNœÙ]\Ê±$1 Û™Èš8n«\8n©]¸n¨ZKZH0ì›™ÈÚ8nçH°è8nëH8n¨ZHŠ_JJ_KKœ›ÝÝ\KœÙ]\ÏY[˜Ý[ÛŠ
^Ý˜\ˆO[™]È]ZK“X™[ÙKœÚ^™OLNK^]\ËœÝYÙOÙKž]\ËœÝYÙKœÝYÙUÚYÌ‹YKÚYÌŽ™Kž]\Ëš[‘Ø[YP‹žKžO]\Ëš[‘Ø[YP‹žK\Ë››ÝÔÙ\™T[™K˜YÚ[
JKÙY[‹™Ù]
JKÊÞN™KžKLLKL
K˜Ø[
[˜Ý[ÛŠ
^ÙKœ\™[	‰ŠKœ\™[œ™[[Ý™PÚ[
JKO[[
_J_KKœ›ÝÝ\K˜ÚXXÚÔÙ\™\”Ø]OY[˜Ý[ÛŠJ^Ý›ÚYOOYI‰ŠOHL
NÝ˜\ˆOHLÚYŠOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K’\ÕÚ]U\Ù\Š
J^ÚYŠœÝ]JÌOOMJ\™]\›ˆOOYI‰“\ÙÐ›Þ‘Ù][œÝ[˜ÙJ
KœÚÝÊ”Ù\™\ˆ1$X[™È¸n¨ÛÈ°ë‹\Ëœ\™[
KOHLNÚYŠœÝ]JÌOOM
\™]\›ˆOOYI‰“\ÙÐ›Þ‘Ù][œÝ[˜ÙJ
KœÚÝÊ±$0èžH0èÙ\™\ˆ8nëH™ÚxnáÛH‹\Ëœ\™[
KOHLNÝ˜\ˆÏ[™]È]NÚYŠ›Ü[•[YOSX]™›ÛÜŠË™Ù][YJ
KÌYLÊJ\™]\›ˆOOYI‰“\ÙÐ›Þ‘Ù][œÝ[˜ÙJ
KœÚÝÊÚ1¬H1$xn¯ÛˆÚxnçHxnçÈÙ\™\ˆ‹\Ëœ\™[
KOHL_\™]\›ˆLKKœ›ÝÝ\K\]S›ÝÔÙ[XÝÙ\™\Y[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë››ÝÔÙ[XÝÙ\™\‘]NÝ\Ë››ÝÔÙ[XÝÙ\™\•^^]›˜[YK\Ë››ÝÔÙ[XÝÙ\™\”Ý]TXËœÛÝ\˜ÙOHˆ‹ÞžHOTÑÓ\ÙË‘Ù][œÝ[˜ÙJ
K˜Ú[›™[YÝ\Ë››ÝÔÙ[XÝÙ\™\”Ý]TXËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÝÞžKÈŠÝ\ËÞžY›Y×Ý\›ÝœÝ]WJÈ‹œ™ÈŽ\Ë››ÝÔÙ[XÝÙ\™\”Ý]TXËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÈŠÝ\Ë™›Y×Ý\›ÝœÝ]WJÈ‹œ™ÈŸKKœ›ÝÝ\K‘XÛÙU[šXÛÙOY[˜Ý[ÛŠ
^Ü™]\›ˆ]œ™\XÙJ×ÙË‰HŠ_KKœ›ÝÝ\K”Ù\™\‘š[\Y[˜Ý[ÛŠ
^Ü™]\›ˆœÝ]JÌHOMK_JYÜ™]‘\Ü^SØš™XÝÛÛZ[™\ŠN××Ü™Y›XÝ
Ø[YTÙ[XÝÙ\™URKœ›ÝÝ\K‘Ø[YTÙ[XÝÙ\™URHŠNÝ˜\ˆÙÚ[‘]OY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\Ë\Ù\—Ý›Ï[™]ÈÙÚ[•\Ù\•›ß\™]\›ˆ‘Ù][œÝ[˜ÙOY[˜Ý[ÛŠ
^Ü™]\›ˆ[O]’[œÝ[˜ÙI‰Š’[œÝ[˜ÙO[™]È
K’[œÝ[˜Ù_Kœ›ÝÝ\K‘Ù]\Ù\•›ÏY[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë\Ù\—Ý›ßK’[œÝ[˜ÙO[[J
N××Ü™Y›XÝ
ÙÚ[‘]Kœ›ÝÝ\K“ÙÚ[‘]HŠNÝ˜\ˆÙÚ[•\Ù\•›ÏY[˜Ý[ÛŠ
^Ù[˜Ý[Ûˆ

^Ý\ËZYHˆ‹\Ë\Ù\—Û˜[YOHˆ‹\Ëœ\ÜÝÛÜ™H˜Í™ŒMØŽNM™MMMÍY™˜ŒY˜NLÙ‹\Ë™Ø[YWÜÙ\™\—Û˜[YOHˆ‹\Ë™Ø[YWÜÙ\™\—ÚYLK\Ë™Ø[YWÜÙ\™\—ÜÜ[—ÚYLK\Ë™\š]WÜÚYÛH˜X™LÍLÍØÌŒ˜ÌXÙÍŒÌMÎMN™È‹\Ë™\š]WÝ[YOHŒMMŒLÈ‹\ËšY[]OHŒNNLL‹\Ë˜XØÛÝ[L\™]\›ˆJ
N××Ü™Y›XÝ
ÙÚ[•\Ù\•›Ëœ›ÝÝ\K“ÙÚ[•\Ù\•›ÈŠNÝ˜\ˆ\ÙÐ›ÞY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK˜™ÔXÕÏMK˜™ÔXÒLÍ‹Kœ[™O[™]ÈYÜ™]‘\Ü^SØš™XÝÛÛZ[™\‹K˜YÚ[
Kœ[™JKK˜™Ï[™]È]ZK’[XYÙKK˜™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÛ\ÙÕ\Ð™Ëœ™È‹Kœ[™K˜YÚ[
K˜™ÊKK˜[™]È]ZK]Û‹K˜‹œÚÚ[“˜[YOH”ÚÚ[ˆ‹K˜‹šXÛÛT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÛ\ÙÕ\Ð‹œ™È‹K˜‹žLŒNK˜‹žOLŽKœ[™K˜YÚ[
K˜ŠKK›Y\ÜØYÙU^[™]È]ZK“X™[K›Y\ÜØYÙU^ÚYMK›Y\ÜØYÙU^šZYÚLLK›Y\ÜØYÙU^œÚ^™OLŒK›Y\ÜØYÙU^žOLLŒK›Y\ÜØYÙU^^[YÛYYÜ™]’Üš^›Û[[YÛ‹ÑS•T‹K›Y\ÜØYÙU^^ÛÛÜLŒMÍÌMKK›Y\ÜØYÙU^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹Kœ[™K˜YÚ[
K›Y\ÜØYÙU^
KK˜Y]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑKK“ÛYÝYÙKJK_\™]\›ˆ×Ù^[™ÊK
KK‘Ù][œÝ[˜ÙOY[˜Ý[ÛŠ
^Ü™]\›ˆ[OYK’[œÝ[˜ÙI‰ŠK’[œÝ[˜ÙO[™]ÈJKK’[œÝ[˜Ù_KKœ›ÝÝ\K“ÛYÝYÙOY[˜Ý[ÛŠ
^Ý\Ëœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[QQÕ×ÔÕQÑK\Ë“ÛYÝYÙK\ÊK\ËœÝYÙK˜Y]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ë“Û”Ù]Ú[Š[
_KKœ›ÝÝ\KœÚÝÏY[˜Ý[ÛŠKKËŠ^Ý›ÚYOOZI‰ŠO[[
K›ÚYOO\É‰ŠÏ[[
K›ÚYOO[‰‰ŠL
KÝYÙU][Ëš[œÊ
K™Ù]ÝYÙJ
K˜YÚ[
\ÊK\Ë›Y\ÜØYÙU^^]\Ë˜Ø[˜XÚÑ[ZK\Ë\Ð[žO\ËŒ	‰•[Y\“YÜ‹š[œÊ
K™Õ[Y\ŠYLÊ›‹K\Ë˜ÛÜÙUÚ[‹\ÊK\Ë˜‹˜Y]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚÐÛÜÙK\ÊK\Ë“Û”Ù]Ú[Š[
_KKœ›ÝÝ\K“Û”Ù]Ú[Y[˜Ý[ÛŠ
^Ý˜\ˆKNÙOTÝYÙU][Ëš[œÊ
K™Ù]ÝYÙJ
KœÝYÙUÚYOTÝYÙU][Ëš[œÊ
K™Ù]ÝYÙJ
KœÝYÙRZYÚ\ËžL\ËžOL\Ëœ[™KžYKÌ‹]\Ë˜™ÔXÕËÌ‹\Ëœ[™KžOZKÌ‹]\Ë˜™ÔXÒÌŸKKœ›ÝÝ\K˜ÛÜÙUÚ[Y[˜Ý[ÛŠ
^Õ[Y\“YÜ‹š[œÊ
Kœ™[[Ý™J\Ë˜ÛÜÙUÚ[‹\ÊK\ËœÝYÙKœ™[[Ý™Q]™[\Ý[™\ŠYÜ™]‘]™[”‘TÒV‘K\Ë“Û”Ù]Ú[‹\ÊK\Ë˜‹œ™[[Ý™Q]™[\Ý[™\ŠYÜ™]•ÝXÚ]™[•ÕPÒÕT\Ë›ÛÛXÚÐÛÜÙK\ÊK[O]\Ë˜Ø[˜XÚÑ[‰‰\Ë˜Ø[˜XÚÑ[‹˜Ø[
\Ë\Ð[žJK\Ëœ\™[	‰\Ëœ\™[œ™[[Ý™PÚ[
\ÊK\Ë˜Ø[˜XÚÑ[[[\Ë\Ð[žO[[KKœ›ÝÝ\K›ÛÛXÚÐÛÜÙOY[˜Ý[ÛŠ
^Ý\Ë˜ÛÜÙUÚ[Š
_K_JYÜ™]‘\Ü^SØš™XÝÛÛZ[™\ŠN××Ü™Y›XÝ
\ÙÐ›Þœ›ÝÝ\K“\ÙÐ›ÞŠNÝ˜\ˆÙ\™R][T[™OY[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ
^Ý˜\ˆO]˜Ø[
\Ê_\ÎÜ™]\›ˆK™›Y×Ý\›VÈžX[™WÚ[È‹žX[™WÚ[È‹žX[™WÞ[ˆ‹žX[™WÞ[ˆ‹žX[™WÚH—KK˜™Ï[™]È]ZK’[XYÙKK˜™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÞX[žšÛ™×ØŒœ™È‹K˜YÚ[
K˜™ÊKKœÝ]P™Ï[™]È]ZK’[XYÙKKœÝ]P™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÞX[™WÚKœ™È‹KœÝ]P™ËžLŒKœÝ]P™ËžOLNK˜YÚ[
KœÝ]P™ÊKKœÙ\™\•^[™]È]ZK“X™[KœÙ\™\•^ÚYLÌKKœÙ\™\•^šZYÚLKKœÙ\™\•^œÚ^™OLŒKœÙ\™\•^^[YÛYYÜ™]’Üš^›Û[[YÛ‹ÑS•T‹KœÙ\™\•^^ÛÛÜLMÎNÌKœÙ\™\•^™›Û˜[Z[OH“ZXÜ›ÜÛÙXRZH‹KœÙ\™\•^žOSX]™›ÛÜŠÌKKYKœÙ\™\•^šZYÚÌŠKK˜YÚ[
KœÙ\™\•^
K_\™]\›ˆ×Ù^[™ÊK
KKœ›ÝÝ\K™]PÚ[™ÙYY[˜Ý[ÛŠ
^Ý\ËœÙ\™\‘]O]\Ë™]NÙ›ÜŠ˜\ˆOLÙO\Ë›[PÚ[™[ŽÙJÊÊ]]\Ë™Ù]Ú[]
JK	‰Š^HˆŠNÝ\ËœÙ\™\•^^]\ËœÙ\™\‘]K›˜[YK\Ë™›Y×Ý\›Ý\ËœÙ\™\‘]KœÝ]W_
\ËœÙ\™\‘]KœÝ]OL
K\ËœÝ]P™ËœÛÝ\˜ÙOT™\Ñ\“YÜ‹”‘T×Ô‘TÓÕTÑJÈ™]ZKÛØY[™ËÈŠÝ\Ë™›Y×Ý\›Ý\ËœÙ\™\‘]KœÝ]WJÈ‹œ™ÈŸK_J]ZK’][T™[™\™\ŠN××Ü™Y›XÝ
Ù\™R][T[™Kœ›ÝÝ\K”Ù\™R][T[™HŠN