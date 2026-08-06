(function () {
    "use strict";

    var API = "/reg/api/avatar.php";
    var CACHE_MS = 60000;
    var cache = {};
    var pending = {};

    function numberValue(value) {
        var n = parseInt(value, 10);
        return isFinite(n) && n > 0 ? n : 0;
    }

    function currentServerId() {
        if (window.HttpProperty && numberValue(HttpProperty.srvid)) {
            return numberValue(HttpProperty.srvid);
        }
        if (window.LoginData) {
            var vo = LoginData.GetInstance().GetUserVo();
            if (vo && numberValue(vo.game_server_id)) {
                return numberValue(vo.game_server_id);
            }
        }
        return 0;
    }

    function actorIdOf(data) {
        if (!data) return 0;
        return numberValue(data.actorID || data.actorId || data.roleID || data.roleId || data.id);
    }

    function serverIdOf(data) {
        if (!data) return currentServerId();
        return numberValue(data.serverId || data.serverID || data.servId || data.servID) || currentServerId();
    }

    function showTip(text) {
        try {
            UserTips.ins().showTips(text);
        } catch (e) {
            window.alert(text);
        }
    }

    function completeLoad(key, texture) {
        cache[key] = { texture: texture || null, time: Date.now() };
        var list = pending[key] || [];
        delete pending[key];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (texture && item.image && item.image._playerAvatarKey === key) {
                item.image.source = texture;
            }
        }
    }

    function loadAvatar(image, actorId, serverId, fallback, version) {
        if (!image) return;
        image._playerAvatarKey = "";
        if (fallback !== undefined && fallback !== null) image.source = fallback;
        actorId = numberValue(actorId);
        serverId = numberValue(serverId) || currentServerId();
        if (!actorId || !serverId) return;

        var key = serverId + ":" + actorId;
        image._playerAvatarKey = key;
        var entry = cache[key];
        if (entry && Date.now() - entry.time < CACHE_MS) {
            if (entry.texture) image.source = entry.texture;
            return;
        }
        if (pending[key]) {
            pending[key].push({ image: image });
            return;
        }

        pending[key] = [{ image: image }];
        var loader = new egret.ImageLoader();
        loader.once(egret.Event.COMPLETE, function (event) {
            var bitmapData = event.currentTarget.data;
            if (!bitmapData) return completeLoad(key, null);
            var texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            completeLoad(key, texture);
        }, this);
        loader.once(egret.IOErrorEvent.IO_ERROR, function () {
            completeLoad(key, null);
        }, this);
        var token = numberValue(version) || Math.floor(Date.now() / CACHE_MS);
        loader.load(API + "?action=image&server_id=" + serverId + "&actor_id=" + actorId + "&v=" + token);
    }

    function invalidate(actorId, serverId) {
        actorId = numberValue(actorId);
        serverId = numberValue(serverId) || currentServerId();
        if (actorId && serverId) delete cache[serverId + ":" + actorId];
    }

    function ensureMainFaceCircle(image) {
        if (!image || !image.parent || image._playerAvatarCircleMask) return;
        var size = Math.min(Number(image.width) || 0, Number(image.height) || 0);
        if (size <= 4) return;
        var inset = 2;
        var mask = new egret.Shape();
        mask.touchEnabled = false;
        mask.x = Number(image.x) + (Number(image.width) - size) / 2;
        mask.y = Number(image.y) + (Number(image.height) - size) / 2;
        mask.graphics.beginFill(0xffffff, 1);
        mask.graphics.drawCircle(size / 2, size / 2, size / 2 - inset);
        mask.graphics.endFill();
        image.parent.addChild(mask);
        image.mask = mask;
        image._playerAvatarCircleMask = mask;
    }

    function dataUrlToBlob(dataUrl) {
        var parts = dataUrl.split(",");
        var binary = atob(parts[1]);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new Blob([bytes], { type: "image/jpeg" });
    }

    function prepareImage(file, callback) {
        var reader = new FileReader();
        reader.onerror = function () { callback(null); };
        reader.onload = function () {
            var img = document.createElement("img");
            img.onerror = function () { callback(null); };
            img.onload = function () {
                var side = Math.min(img.naturalWidth || img.width, img.naturalHeight || img.height);
                if (!side) return callback(null);
                var canvas = document.createElement("canvas");
                canvas.width = canvas.height = 256;
                var ctx = canvas.getContext("2d");
                var sx = ((img.naturalWidth || img.width) - side) / 2;
                var sy = ((img.naturalHeight || img.height) - side) / 2;
                ctx.drawImage(img, sx, sy, side, side, 0, 0, 256, 256);
                if (canvas.toBlob) {
                    canvas.toBlob(function (blob) { callback(blob); }, "image/jpeg", 0.9);
                } else {
                    callback(dataUrlToBlob(canvas.toDataURL("image/jpeg", 0.9)));
                }
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }

    function upload(preview) {
        if (!window.FileReader || !window.FormData || !document.createElement) {
            showTip("Thiết bị này chưa hỗ trợ đổi avatar");
            return;
        }
        var actorId = numberValue(Actor.actorID);
        var serverId = currentServerId();
        if (!actorId || !serverId) {
            showTip("Chưa xác định được nhân vật hiện tại");
            return;
        }
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/jpeg,image/png,image/*";
        input.style.display = "none";
        document.body.appendChild(input);
        input.onchange = function () {
            var file = input.files && input.files[0];
            if (!file) {
                document.body.removeChild(input);
                return;
            }
            prepareImage(file, function (blob) {
                document.body.removeChild(input);
                if (!blob) {
                    showTip("Không thể đọc ảnh đã chọn");
                    return;
                }
                var form = new FormData();
                form.append("server_id", String(serverId));
                form.append("actor_id", String(actorId));
                form.append("avatar", blob, "avatar.jpg");
                var xhr = new XMLHttpRequest();
                xhr.open("POST", API + "?action=upload", true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState !== 4) return;
                    var data = null;
                    try { data = JSON.parse(xhr.responseText); } catch (e) {}
                    if (xhr.status < 200 || xhr.status >= 300 || !data || Number(data.code) !== 1) {
                        showTip(data && data.msg ? data.msg : "Đổi avatar thất bại");
                        return;
                    }
                    invalidate(actorId, serverId);
                    var fallback = "yuanhead" + SubRoles.ins().getSubRoleByIndex(0).job + "0";
                    loadAvatar(preview, actorId, serverId, fallback, data.version);
                    try {
                        var main = ViewMgr.ins().getView(MainView);
                        if (main && main.face) loadAvatar(main.face, actorId, serverId, fallback, data.version);
                    } catch (e) {}
                    showTip("Đổi avatar thành công");
                };
                xhr.send(form);
            });
        };
        input.click();
    }

    window.PlayerAvatar = {
        apply: loadAvatar,
        upload: upload,
        invalidate: invalidate,
        actorIdOf: actorIdOf,
        serverIdOf: serverIdOf,
        currentServerId: currentServerId
    };

    function patchMethod(className, methodName, after) {
        var ctor = window[className];
        if (!ctor || !ctor.prototype || typeof ctor.prototype[methodName] !== "function") return;
        var original = ctor.prototype[methodName];
        ctor.prototype[methodName] = function () {
            var result = original.apply(this, arguments);
            after.apply(this, arguments);
            return result;
        };
    }

    function patchRenderer(className, methodName, imageName, dataGetter) {
        patchMethod(className, methodName, function () {
            var data = dataGetter ? dataGetter.call(this) : this.data;
            var image = this[imageName];
            if (!data || !image) return;
            var actorId = actorIdOf(data);
            if (!actorId) return;
            loadAvatar(image, actorId, serverIdOf(data), image.source);
        });
    }

    function ensureSettingsAvatar(view) {
        if (!view || !view.contentGroup || (view.btnAvatar && view.avatarPreview)) return;
        var row = new eui.Group();
        row.width = 360;
        row.height = 72;
        var layout = new eui.HorizontalLayout();
        layout.gap = 28;
        layout.horizontalAlign = "center";
        layout.verticalAlign = "middle";
        row.layout = layout;

        var preview = new eui.Image();
        preview.width = 64;
        preview.height = 64;
        preview.source = "yuanhead10";
        var button = new eui.Button();
        button.label = "Đổi Avatar";
        button.skinName = "SkinBtn2";
        row.addChild(preview);
        row.addChild(button);

        view.avatarPreview = preview;
        view.btnAvatar = button;
        if (view.contentGroup.layout) view.contentGroup.layout.gap = 18;
        view.contentGroup.addChildAt(row, 0);
    }

    if (window.SettingView) {
        var settingOpen = SettingView.prototype.open;
        SettingView.prototype.open = function () {
            settingOpen.apply(this, arguments);
            ensureSettingsAvatar(this);
            if (this.btnAvatar) this.addTouchEvent(this.btnAvatar, this.onClick_a94);
            if (this.avatarPreview) {
                var role = SubRoles.ins().getSubRoleByIndex(0);
                loadAvatar(this.avatarPreview, Actor.actorID, currentServerId(), "yuanhead" + role.job + "0");
            }
        };
        var settingClick = SettingView.prototype.onClick_a94;
        SettingView.prototype.onClick_a94 = function (event) {
            if (event.currentTarget === this.btnAvatar) {
                upload(this.avatarPreview);
                return;
            }
            return settingClick.call(this, event);
        };
    }

    patchMethod("MainView", "initUI", function () {
        if (!this.face) return;
        var role = SubRoles.ins().getSubRoleByIndex(0);
        ensureMainFaceCircle(this.face);
        loadAvatar(this.face, Actor.actorID, currentServerId(), "yuanhead" + role.job + "0");
    });

    patchRenderer("FriendApplyItemRender", "dataChanged", "img_userIcon");
    patchRenderer("FriendHeadItem", "dataChanged", "img_userIcon");
    patchRenderer("FriendMenuItemRender", "dataChanged", "img_userIcon");
    patchRenderer("FriendRecentlyItemRender", "dataChanged", "img_userIcon");
    patchRenderer("ShieldListItemRender", "dataChanged", "img_userIcon");
    patchRenderer("FriendInviteItemRender", "dataChanged", "imgHead");
    patchRenderer("SelectRoleItem", "dataChanged", "imgRole");
    patchRenderer("GuildAppltListBaseItemRender", "dataChanged", "myFace");
    patchRenderer("ChallengerItemRender", "dataChanged", "imgHead");
    patchRenderer("AssistantItemRender", "dataChanged", "imgHead", function () {
        return this.data && this.data.vo;
    });
    patchRenderer("GuildMemberBaseItem2Render", "dataChanged", "face");
    patchRenderer("GuildWarMemListItemRenderer", "dataChanged", "face");
    patchRenderer("MemberBaseItem3Renderer", "dataChanged", "face", function () {
        return this.data && this.data.data;
    });
    patchRenderer("ChatsGuildItemRender", "delayChangedData", "head");
    patchRenderer("ChatsListItemRenderer", "delayChangedData", "head");
    patchRenderer("kfArenaMemberItemRenderBase", "dataChanged", "face", function () {
        return this.itemData || this.data;
    });
    patchRenderer("LastWeekRankItemRendererBase", "dataChanged", "head");

    patchMethod("PlayerTipsBaseWin", "initToView", function () {
        if (!this.imgHead || !this.currId) return;
        loadAvatar(this.imgHead, this.currId, serverIdOf(this.data), this.imgHead.source);
    });
    patchMethod("MembersInfoWin", "update_a94", function () {
        if (!this.imgHead || !this._data) return;
        loadAvatar(this.imgHead, actorIdOf(this._data), serverIdOf(this._data), this.imgHead.source);
    });
    patchMethod("kfArenaCheckWindow", "open", function () {
        if (!this.face || !this.data) return;
        loadAvatar(this.face, actorIdOf(this.data), serverIdOf(this.data), this.face.source);
    });
    patchMethod("CheckRoleWin", "setRoleInfo_a94", function () {
        if (!this.headIcon || !this.otherPlayerData) return;
        loadAvatar(this.headIcon, actorIdOf(this.otherPlayerData), serverIdOf(this.otherPlayerData), this.headIcon.source);
    });
    patchMethod("TeamFBLookRoleWin", "setRoleData_a94", function () {
        if (!this.headIcon || !this.otherPlayerData) return;
        loadAvatar(this.headIcon, actorIdOf(this.otherPlayerData), serverIdOf(this.otherPlayerData), this.headIcon.source);
    });
    patchMethod("MineRobWindow", "update_a94", function () {
        if (!this.myFace0 || !this._data || !this._data.fighterActorID) return;
        loadAvatar(this.myFace0, this._data.fighterActorID, serverIdOf(this._data), this.myFace0.source);
    });
    patchMethod("PeakBetWin", "open", function () {
        var stage = arguments[0], round = arguments[1];
        var isSixteen = PeakedSys.ins().isKFSixteen();
        var info = PeakedSys.ins().isKf()
            ? PeakedHelp.getKFPlayerData(stage, round, arguments[2], isSixteen)
            : PeakedHelp.getPlayerData(stage, round);
        if (!info || !info.playerList) return;
        var first = info.playerList[0], second = info.playerList[1];
        if (first && this.face0) loadAvatar(this.face0, actorIdOf(first), serverIdOf(first), this.face0.source);
        if (second && this.face1) loadAvatar(this.face1, actorIdOf(second), serverIdOf(second), this.face1.source);
    });
})();
