# CLAUDE.md — ZYserver

Tài liệu này ghi lại (1) việc sẽ làm cho repo, (2) phân tích kiến trúc toàn bộ hệ thống, và (3) hướng dẫn chi tiết để đưa server này lên internet với **IP máy chủ: `71.31.97.241`**, website chạy ở **port 80**.

> Đây là file tài liệu/ghi chú (không phải code chạy được). Không có gì trong repo bị chỉnh sửa khi tạo file này — mọi thay đổi IP/port đề xuất bên dưới đều **chưa được áp dụng**, chỉ là hướng dẫn để bạn (hoặc Claude ở bước sau) thực hiện.

## Quy ước làm việc (đọc trước khi làm bất kỳ thay đổi nào)

- **LUÔN đọc toàn bộ `claude.md` này TRƯỚC KHI bắt đầu bất kỳ việc gì trong repo** (kể cả khi việc mới nghe có vẻ không liên quan đến các mục đã ghi) — để biết chính xác đang ở tiến trình nào (vd: đang dịch dở field nào của `config.json`, đã sửa layout UI nào rồi, quy ước đặt tên file glossary đang dùng đến số mấy...), tránh làm trùng việc đã xong, đặt tên file glossary trùng/lệch số, hoặc phá vỡ các quyết định kỹ thuật đã chốt (vd: chuỗi `跨服战场` phải giữ nguyên tiếng Hán — xem 8.4.7zz). Mục 8.4.10 là nơi tổng hợp trạng thái + việc cần làm tiếp theo, nên đọc mục đó trước tiên rồi tra cứu chi tiết theo số mục liên quan.
- **Mỗi đợt việc = 1 commit duy nhất.** Không được tách "commit code thay đổi" rồi commit riêng "Update claude.md" ngay sau đó — gộp chung thay đổi code + cập nhật tiến độ trong `claude.md` (nếu có) vào **cùng một commit**. Lý do: người dùng dựa vào lịch sử commit trên GitHub để biết chính xác đợt nào cần copy file gì về máy chủ thật; tách commit làm khó theo dõi cái nào đi với cái nào.
- Trước khi commit, luôn kiểm tra `git status --short` để không bỏ sót file cần add hoặc để sót file rác (vd: file `.bak` tạm) chưa được dọn.
- Khi dịch nội dung trong file Lua/`.txt` dùng chuỗi `"..."` làm delimiter: **không được dùng dấu ngoặc kép thẳng `"`** bên trong nội dung dịch vì sẽ kết thúc sớm chuỗi và làm hỏng cú pháp file — dùng dấu ngoặc kép cong `" "` thay thế (xem thêm mục 8.4, phần "Bug đã gặp và đã vá"). Script `translation/apply_lang_glossary.py` đã có cơ chế tự chặn lỗi này.
- **BẮT BUỘC: mỗi khi sửa nội dung `js/main.min_*.js` hoặc `js/default.thm_*.js`, phải ĐỔI TÊN file sang hash mới + cập nhật `manifest.json` (mảng `game`) + bump query `?v=` khi fetch `manifest.json` trong `index.php` — tất cả trong CÙNG 1 commit.** Lý do: 2 file này có tên chứa hash tĩnh, được nạp qua `<script src="./js/xxx_hash.js">` KHÔNG có query cache-busting, và Apache của server (`httpd.conf`) đang tắt `mod_expires` nhưng vẫn có thể bị cache dài hạn bởi trình duyệt di động / CDN / proxy trung gian vì URL không đổi dù nội dung đổi — sửa file mà giữ nguyên tên sẽ khiến một số máy/mạng tiếp tục thấy bug cũ dù code đã vá đúng (xem 8.9 để biết vụ việc thực tế đã xảy ra).

## Việc sẽ làm cho repo này

- [x] Đọc toàn bộ mã nguồn/cấu hình trong repo, xác định kiến trúc hệ thống.
- [x] Xác định chính xác từng file cấu hình chứa IP/port cần đổi khi go-live.
- [x] Liệt kê các port cần mở trên firewall/router của máy chủ.
- [ ] (Bước tiếp theo, khi bạn xác nhận) Thực hiện đổi IP/port trong các file cấu hình liệt kê bên dưới, và test lại luồng đăng ký → đăng nhập → vào game.

---

## 1. Tổng quan hệ thống

Đây **không phải là một web app hiện đại** (Node/Django/...) mà là **server game online kiểu MMORPG (dòng "Truyền Kỳ/Legend")** chạy trên **Windows**, gồm 2 phần:

### A. Game Server (binary C++, thư mục `server/bin`)
Chạy nhiều tiến trình `.exe` độc lập, giao tiếp qua TCP với nhau:

| Process | Vai trò | File cấu hình |
|---|---|---|
| `centerserver64_debug.exe` | Trung tâm điều phối, quản lý danh sách server | `server/bin/centerserver/CenterServer.txt` |
| `DBServer64_debug.exe` (mỗi server 1 bản, ví dụ s1, s99) | Lớp trung gian giữa GameWorld và MySQL | `server/bin/s{n}/dbserver/DBServer.txt` |
| `GameWorld64_debug.exe` | Logic game chính (map, nhân vật, chiến đấu…), dùng script Lua trong `data/` | `server/bin/s{n}/gameworld/GameWorld.txt` |
| `Gateway64_debug.exe` | **Cổng client kết nối vào** — client game (SWF/H5) connect trực tiếp vào đây | `server/bin/s{n}/gateway/GateWay.txt` |
| `LoggerServer64_debug.exe` | Ghi log (DAU, kinh tế, cài đặt...) vào MySQL | `server/bin/loggerserver/data/main.lua` |

Repo có 2 "server/khu vực": **s1** (server chính) và **s99** (server dùng làm "khu liên server / cross-server", `ServerIndex=9`, `isMainSrv=true` trong cấu hình crossserver).

Khởi động bằng các file `.bat` ở gốc repo:
- `2.启动基础服务.bat` → chạy `centerserver64_debug.exe`
- `3.启动 1 区服务.bat` → chạy DBServer → GameWorld → Gateway của **s1**
- `4.启动跨服区服务.bat` → chạy DBServer → GameWorld → Gateway của **s99** (khu liên server)
- `99.停止所有.bat` → `TASKKILL` tất cả tiến trình trên
- `0.一键打开所有修改的文件.bat` → mở sẵn (bằng Notepad++) đúng 6 file cần sửa IP khi đổi server — chính là kim chỉ nam cho phần phân tích bên dưới.

### B. Website (PHP, thư mục `phpStudy/PHPTutorial/WWW`)

> ⚠️ **Đã cập nhật 2026-07-03**: phân tích ban đầu bên dưới (dựa trên cấu hình mẫu trong repo) suy đoán có "2 port song song" 80+81. Test thực tế cho thấy **chỉ port 80 được dùng** — Nginx tự phục vụ hết, không cần Apache:81. Đã sửa `$cdn`/`$clientip` bỏ `:81`, xem chi tiết & lý do ở mục 3.3–3.4.

Chạy trên **phpStudy** (gói XAMPP-like cho Windows), gồm:
- **Nginx** (`phpStudy/PHPTutorial/nginx`) — nghe **port 80**, proxy PHP qua FastCGI `127.0.0.1:9000`. Đây là web chính (trang chủ / vào game / đăng ký).
- **Apache** (`phpStudy/PHPTutorial/Apache`) — nghe **port 81** (`Listen 81` trong `httpd.conf`), cùng trỏ `DocumentRoot` vào **cùng thư mục WWW**. Port 81 được dùng làm **"CDN"** — nơi client game (JS/H5) tải tài nguyên (`js/*.js`, `resource/*`) và cũng là URL client được redirect tới sau khi đăng nhập.
- **MySQL** (`phpStudy/PHPTutorial/MySQL`) — port 3306, chỉ dùng nội bộ (game server + web đều gọi tới `127.0.0.1:3306`).

Các trang PHP chính:
- `WWW/index.php` — trang loader client game H5 (Egret engine), có biến `$cdn = "http://192.168.200.129:81"` để nạp tài nguyên game.
- `WWW/reg/index.php`, `WWW/reg/server.php`, `WWW/reg/api/*.php` — API đăng ký/đăng nhập tài khoản, redirect vào `$clientip = 'http://192.168.200.129:81'`.
- `WWW/reg/platform/*.php` — API lấy danh sách server, cấu hình thanh toán (dùng placeholder `{ip}:{port}`, không hardcode).
- `WWW/gm/*`, `WWW/gmht/*` — **bảng điều khiển GM** (admin: gửi mail, nạp thẻ, tra cứu người chơi). Các file này chỉ kết nối MySQL qua `127.0.0.1` (không cần đổi vì chạy cùng máy).

### Sơ đồ luồng kết nối
```
Người chơi (browser)
   │  HTTP :80  (trang chủ / đăng ký)          → Nginx → WWW/index.php, WWW/reg/*
   │  HTTP :81  (tải resource game + redirect)  → Apache → WWW/index.php, WWW/js/*, WWW/resource/*
   │  TCP  :9001 (s1) / :9009 (s99)             → Gateway.exe (client game kết nối trực tiếp)
   ▼
Gateway ──(nội bộ 127.0.0.1:6001/6009)──► GameWorld ──► DBServer (127.0.0.1:5001/5009) ──► MySQL (127.0.0.1:3306)
GameWorld ──(nội bộ 127.0.0.1:8001)──► CenterServer
GameWorld (s1) ──(nội bộ 127.0.0.1:3101)──► CrossService của s99 (liên server, cùng máy)
```

---

## 2. Danh sách IP hiện tại trong repo (trước khi đổi)

| IP | Ý nghĩa | Nơi dùng |
|---|---|---|
| `127.0.0.1` | Loopback — kết nối nội bộ cùng máy (MySQL, DBServer, CenterServer, GateService…) | Đa số file config |
| `192.168.200.129` | IP LAN cũ của máy chủ gốc, dùng làm **địa chỉ public giả định** cho s99 và cho website | `GameWorld.txt` (s99), `GateWay.txt` (s99), `client.lua` (s99), `crossserverconf.lua` (s99), `index.php`, `reg/api/config.php` |
| `106.55.254.14` | IP public cũ của máy chủ gốc, dùng làm **địa chỉ public** cho s1 | `GameWorld.txt` (s1), `GateWay.txt` (s1), `client.lua` (s1) |

→ Khi đưa lên internet với IP mới `71.31.97.241`, **tất cả các chỗ đang có `192.168.200.129` và `106.55.254.14` phải được thay bằng `71.31.97.241`**. Các chỗ đang là `127.0.0.1` (kết nối nội bộ cùng máy) thì **giữ nguyên**, không đổi.

---

## 3. Chi tiết từng file cần sửa khi go-live với IP `71.31.97.241`

### 3.1. Game server — s1 (`server/bin/s1/`)

**`gameworld/GameWorld.txt`**
```
LoginServer.Address = "106.55.254.14"  →  "71.31.97.241"   (port 10101 giữ nguyên)
LogServer.Address   = "106.55.254.14"  →  "71.31.97.241"   (port 7001 giữ nguyên)
```
Các mục còn lại (`SQL`, `GlobalSQL`, `GateService`, `DbServer`, `CenterServer`) đều là `127.0.0.1` → **giữ nguyên** (đều là service chạy cùng máy).

**`gateway/GateWay.txt`**
```
LocalService.Ip = "106.55.254.14"  →  "71.31.97.241"
```
Đây là địa chỉ Gateway "tự công bố" cho client biết để reconnect. `LocalService.Address = "0.0.0.0"` (địa chỉ bind) **giữ nguyên** — không đổi, vì đây là "nghe trên mọi interface", không phải IP public.
`Port = 9001` giữ nguyên (đây là port client kết nối vào — cần **mở port 9001 trên firewall**).

**`gameworld/data/client.lua`**
```
socket.connect('106.55.254.14', ssh_port)  →  socket.connect('71.31.97.241', ssh_port)
```
File này là script test/debug (biến `ssh_port`, `data` không được định nghĩa trong file — script lỗi, không phải luồng chạy chính thức). Có thể sửa cho đồng bộ nhưng **không ảnh hưởng vận hành thực tế**.

**`gameworld/data/config/crossserver/crossserverconf.lua`**
```
battleInfo ip = "127.0.0.1"   (trỏ tới s99 – cùng máy)
```
→ **Giữ nguyên** nếu s99 chạy cùng máy với s1 (đúng theo cấu trúc repo hiện tại).

### 3.2. Game server — s99 (`server/bin/s99/`)

**`gameworld/GameWorld.txt`**
```
LoginServer.Address = "192.168.200.129"  →  "71.31.97.241"   (port 10109 giữ nguyên)
LogServer.Address   = "192.168.200.129"  →  "71.31.97.241"   (port 7001 giữ nguyên)
```

**`gateway/GateWay.txt`**
```
LocalService.Ip = "192.168.200.129"  →  "71.31.97.241"
```
`Port = 9009` giữ nguyên — **cần mở port 9009**.

**`gameworld/data/client.lua`**
```
socket.connect('192.168.200.129', ssh_port)  →  socket.connect('71.31.97.241', ssh_port)
```
(Cũng là script test/debug, không bắt buộc.)

**`gameworld/data/config/crossserver/crossserverconf.lua`**
```
battleInfo ip = "192.168.200.129"  →  "127.0.0.1"  (khuyến nghị, vì s99 tự trỏ vào chính nó, cùng máy)
```
> Ghi chú: nếu sau này bạn tách s99 (cross-server) ra chạy trên **máy vật lý khác**, thì đổi thành `71.31.97.241`/IP máy đó thay vì `127.0.0.1`. Vì hiện tại mọi service chạy chung 1 máy, dùng `127.0.0.1` an toàn hơn (tránh phải phụ thuộc NAT hairpin / loopback ra ngoài rồi vòng lại).

### 3.3. Website (`phpStudy/PHPTutorial/WWW/`)

> ✅ **CẬP NHẬT 2026-07-03 (đã xác nhận từ test thực tế của bạn)**: web thực tế chỉ chạy **port 80 duy nhất** (Nginx phục vụ trực tiếp toàn bộ `DocumentRoot` gồm cả `WWW/js`, `WWW/resource`, `WWW/reg` — không cần Apache:81 ở giữa, xem mục 3.4). Port `:81` trong `$cdn`/`$clientip` là **sai/thừa** so với cách server đang chạy thật — đã bỏ hẳn, không dùng phương án "giữ 2 port song song" nữa.

**`index.php`** (dòng 2)
```php
$cdn = "http://192.168.200.129:81";  →  $cdn = "http://71.31.97.241";   // đã bỏ :81
```

**`reg/api/config.php`** (dòng ~14)
```php
$clientip = 'http://192.168.200.129:81';  →  $clientip = 'http://71.31.97.241';   // đã bỏ :81
```

**`reg/server.php`** dùng biến `$clientip` từ file trên (đã tự động đổi theo, không cần sửa thêm).

**`reg/platform/*.php`, `gm/*.php`, `gmht/*.php`**: chỉ dùng `127.0.0.1` để kết nối MySQL nội bộ → **giữ nguyên**.

### 3.4. Web server config (phpStudy)

**`phpStudy/PHPTutorial/nginx/conf/nginx.conf`** — đây là service thực tế phục vụ toàn bộ web (port 80), `root` trỏ thẳng vào `WWW/` nên tự phục vụ luôn cả `WWW/js/`, `WWW/resource/` (phần trước đây tưởng lầm là cần Apache:81 riêng để "tải resource game"). PHP được xử lý qua FastCGI nội bộ (port 9000), không qua Apache.
```
listen 80;            → giữ nguyên (đúng yêu cầu "port 80 cho web")
server_name localhost; → có thể đổi thành 71.31.97.241 (không bắt buộc)
```

**`phpStudy/PHPTutorial/Apache/conf/httpd.conf`** (`Listen 81`) — **không cần mở ra internet nữa** vì thực tế không dùng đến (Nginx đã tự phục vụ hết trên port 80). Có thể giữ nguyên cấu hình này chạy nội bộ (không ảnh hưởng gì nếu không mở firewall port 81) hoặc tắt hẳn service Apache nếu muốn gọn — không bắt buộc phải làm ngay.

> ⚠️ **Bài học rút ra**: phần phân tích ban đầu (mục cũ) suy đoán từ code có "2 port song song" (80 cho web, 81 cho CDN resource) dựa theo cấu hình mẫu trong repo, nhưng **thực tế vận hành của bạn chỉ dùng 1 port 80** — Nginx đã đủ phục vụ mọi thứ. Đây là ví dụ cho thấy cần **luôn ưu tiên xác nhận qua test thực tế** thay vì chỉ suy luận từ file cấu hình, vì có thể có sai khác giữa cấu hình mẫu và cách server thực sự chạy.

### 3.5. MySQL
`phpStudy/PHPTutorial/MySQL/my.ini` — không có `bind-address` (mặc định nghe mọi interface tuỳ version). **Không cần/không nên** đổi gì ở đây — MySQL chỉ được các service nội bộ (game server, web) gọi qua `127.0.0.1`, **không cần và không nên mở port 3306 ra internet** (rủi ro bảo mật cao — dễ bị brute-force/tấn công database).

---

## 4. Danh sách port cần mở trên firewall của máy chủ (`71.31.97.241`)

### Bắt buộc mở ra internet (public-facing)

| Port | Giao thức | Dịch vụ | Ghi chú |
|---|---|---|---|
| **80** | TCP | Nginx — website chính + CDN tài nguyên game + trang loader client (phục vụ hết trên 1 port) | Đã xác nhận qua test thực tế — **không cần mở port 81** |
| **9001** | TCP | Gateway server **s1** — client game kết nối trực tiếp | |
| **9009** | TCP | Gateway server **s99** (khu liên server) — client game kết nối trực tiếp | Chỉ cần nếu người chơi có thể vào thẳng khu s99 |
| **10101** | TCP | "LoginServer" mà GameWorld s1 kết nối tới | Chỉ mở nếu có service thật sự lắng nghe port này (xem lưu ý bên dưới) |
| **7001** | TCP | "LogServer" mà GameWorld (s1 & s99) kết nối tới | Tương tự — chỉ mở nếu có service lắng nghe |

> ⚠️ Repo **không có binary/service nào tường minh bind vào port `10101` hoặc `7001`** trong các file cấu hình đã đọc được (không phải centerserver, dbserver, gateway, loggerserver). Rất có thể đây là địa chỉ của một service điều phối/log tập trung dùng chung cho nhiều server (có thể nằm ngoài repo này, hoặc do `centerserver`/`loggerserver` xử lý ngầm không qua file cấu hình dạng text). **Khuyến nghị: khởi động toàn bộ hệ thống trước, dùng `netstat -ano | findstr LISTENING` trên Windows để xác nhận thực tế port nào đang lắng nghe, trước khi quyết định mở port này ra ngoài.** Nếu không có gì thực sự lắng nghe ở đó, việc GameWorld không kết nối được tới LoginServer/LogServer thường không chặn server khởi động (chỉ mất tính năng log/đăng nhập qua service phụ đó) — nhưng cần kiểm chứng thực tế bằng log khi khởi động (`GameWorld.txt` cùng thư mục có `scripterror.txt`, hoặc console output khi chạy `.bat`).

### Chỉ dùng nội bộ — KHÔNG mở ra internet

| Port | Dịch vụ |
|---|---|
| 3306 | MySQL |
| 8001 | CenterServer |
| 6001 / 6009 | Gateway ↔ GameWorld (backend nội bộ) |
| 5001 / 5009 | DBServer |
| 3101 | CrossService (liên server, nội bộ giữa s1 và s99) |
| 9000 | php-cgi (FastCGI, Nginx gọi nội bộ) |

Các port này chỉ nên bind `127.0.0.1` hoặc `0.0.0.0` **nhưng bị chặn ở firewall/NAT** không cho truy cập từ internet — vì chúng là kênh giao tiếp nội bộ giữa các service, mở ra ngoài chỉ tăng bề mặt tấn công mà không phục vụ người chơi.

---

## 5. Checklist thực hiện khi go-live

1. **Trên máy chủ (Windows)**: mở Windows Firewall (hoặc firewall của nhà cung cấp VPS) cho các port bắt buộc ở mục 4 — chiều **Inbound TCP**: 80, 9001, 9009 (và 10101/7001 nếu xác nhận có service lắng nghe). **Không cần mở port 81** (xem mục 3.4).
2. Nếu máy chủ nằm sau NAT/router (không có IP `71.31.97.241` gắn trực tiếp vào máy), cần **port forward** các port trên từ router tới IP LAN thật của máy Windows.
3. Sửa các điểm cấu hình liệt kê ở mục 3.1–3.3 (đổi `106.55.254.14` / `192.168.200.129` → `71.31.97.241`, bỏ `:81` khỏi `$cdn`/`$clientip`, giữ nguyên mọi chỗ `127.0.0.1`).
4. Restart toàn bộ service: chạy `99.停止所有.bat` rồi `2.启动基础服务.bat` → `3.启动 1 区服务.bat` → `4.启动跨服区服务.bat`.
5. Test từ **một máy khác** (ngoài mạng LAN, ví dụ điện thoại 4G):
   - Mở `http://71.31.97.241` → trang chủ web load được, resource game (`js/`, `resource/`) cũng load được qua cùng port 80 (test port 80 duy nhất).
   - Đăng ký/đăng nhập tài khoản qua `reg/` → được redirect đúng, vào được client game (test toàn luồng + port 9001/9009).
6. Kiểm tra log server (`server/bin/s{n}/gameworld/scripterror.txt`, `db_dbg.txt`) xem GameWorld có báo lỗi kết nối LoginServer/LogServer (`106.55.254.14`/`192.168.200.129` cũ) hay không — nếu còn sót IP cũ ở đâu, log sẽ báo "connect failed" tới IP đó.
7. **Bảo mật**: đổi các mật khẩu MySQL đang hardcode dạng plain-text trong repo (`0987abc123`, `123456`, `root`...) trước khi public server — đây là rủi ro bảo mật thực sự khi source này lộ ra internet.

---

## 6. Lưu ý bảo mật khi public server

- Repo chứa **mật khẩu MySQL dạng plain-text** ở nhiều file (`GameWorld.txt`, `DBServer.txt`, `reg/api/config.php`, `reg/platform/config.php`, `gm/config.php`, `gmht/user/config.php`...). Khi đưa server lên internet, nên đổi các mật khẩu này và **không** commit mật khẩu thật vào git.
- Thư mục `gm/` và `gmht/` là **bảng điều khiển GM (admin)** — có chức năng tặng quà/nạp thẻ không giới hạn (`$paymax=999999`). Các thư mục này **đang nằm trong cùng DocumentRoot public** (`WWW/gm`, `WWW/gmht`) → nếu mở port 80/81 ra internet, ai cũng truy cập được URL `/gm/` hoặc `/gmht/` trừ khi có xác thực đăng nhập chặn ở tầng ứng dụng. Cần kiểm tra kỹ cơ chế đăng nhập của các trang này (`gmht/user/index.php`, session `$_SESSION['gmbt']`) trước khi public, hoặc chặn truy cập các thư mục này ở tầng firewall/reverse-proxy theo IP admin.
- Không mở port 3306 (MySQL) ra internet.

---

## 7. Nhật ký xử lý sự cố thực tế khi go-live (2026-07-02)

Ghi lại các lỗi thực tế gặp phải khi triển khai với IP `71.31.97.241`, để tra cứu lại nếu gặp lần sau.

### 7.1. "Kẹt ở chọn server" lần 1 — do thiếu s99 (khu liên server)

**Triệu chứng**: web load được, đăng nhập được, nhưng đứng ở màn chọn server.

**Nguyên nhân**: chỉ chạy `2.启动基础服务.bat` (centerserver) + `3.启动 1 区服务.bat` (s1), **chưa chạy** `4.启动跨服区服务.bat` (s99). Log GameWorld s1 báo lặp lại mỗi 5 giây:
```
[ERR]connect fail! gameworld  10061 No connection could be made because the target machine actively refused it
```
Do s1 cố kết nối tới CrossService của s99 tại `127.0.0.1:3101` (cấu hình trong `crossserverconf.lua`) nhưng s99 chưa khởi động nên không có gì lắng nghe ở đó.

**Fix**: chạy đủ cả 3 file `.bat` — centerserver, s1, và **s99** — mỗi lần khởi động server. s1 phụ thuộc cứng vào s99 (guild battle, xếp hạng liên server...). Sau khi chạy đủ, log xuất hiện:
```
csbase.OnConnected to 9, serverType:1   ← s1 kết nối s99 thành công
csbase.OnConnected to 1, serverType:0   ← s99 kết nối lại s1
```

### 7.2. "Kẹt ở chọn server" lần 2 — do Windows Firewall chặn port 9001/9009

**Triệu chứng**: đã chạy đủ cả 3 service, web load được (port 80 OK), nhưng connect từ **IP ngoài** vẫn đứng ở màn chọn server. Connect từ mạng nội bộ/localhost thì được.

**Nguyên nhân**: Windows Firewall trên máy chủ **chặn port 9001 và 9009** (port Gateway mà client dùng để mở WebSocket `ws://71.31.97.241:9001/` chơi game — khác hẳn port 80 web). Port 80 đã mở nên web vào được, nhưng 9001/9009 chưa mở nên WebSocket của client treo mãi không kết nối được → đứng ở màn chọn server.

**Fix đã áp dụng thực tế**: tắt hẳn Windows Firewall trên máy chủ → vào được ngay. (Tắt hẳn firewall chỉ nên dùng để xác nhận nguyên nhân; nên bật lại và mở đúng các port cần thiết thay vì tắt vĩnh viễn — xem lệnh bên dưới.)

**Lệnh mở port bằng CMD (Command Prompt, chạy với quyền Administrator)** — dùng `netsh advfirewall` để mở đúng các port cần thiết thay vì tắt cả firewall:

```cmd
:: Mở port web
netsh advfirewall firewall add rule name="Game-Web-80" dir=in action=allow protocol=TCP localport=80
netsh advfirewall firewall add rule name="Game-Web-81" dir=in action=allow protocol=TCP localport=81

:: Mở port Gateway - BẮT BUỘC để client vào được game (đây là port bị chặn gây lỗi ở mục 7.2)
netsh advfirewall firewall add rule name="Game-Gate-9001" dir=in action=allow protocol=TCP localport=9001
netsh advfirewall firewall add rule name="Game-Gate-9009" dir=in action=allow protocol=TCP localport=9009
```

Kiểm tra rule đã thêm:
```cmd
netsh advfirewall firewall show rule name="Game-Gate-9001"
netsh advfirewall firewall show rule name="Game-Gate-9009"
```

Xoá rule nếu cần sửa lại:
```cmd
netsh advfirewall firewall delete rule name="Game-Gate-9001"
netsh advfirewall firewall delete rule name="Game-Gate-9009"
```

**Lưu ý nếu máy chủ là VPS/cloud** (không phải PC ở nhà sau router): ngoài Windows Firewall, nhà cung cấp cloud thường có thêm **Security Group / Cloud Firewall** riêng ở trang quản trị web — phải mở thêm inbound TCP 9001, 9009 (và 80) ở đó nữa, vì mở ở Windows Firewall thôi chưa đủ nếu lớp cloud firewall phía trước vẫn chặn.

**Cách test nhanh port có mở từ ngoài chưa** (chạy từ máy khác, không cùng mạng LAN với server):
```powershell
Test-NetConnection -ComputerName 71.31.97.241 -Port 9001
```
`TcpTestSucceeded : True` → port đã thông. `False` → vẫn còn bị chặn ở đâu đó (Windows Firewall, hoặc Security Group cloud, hoặc router).

### 7.3. Ghi chú phụ: `LoginServer`/`LogServer` gây "connect server time out!"

Khi đổi `LoginServer.Address` và `LogServer.Address` trong `GameWorld.txt` (s1 và s99) sang `71.31.97.241` (port 10101/10109 và 7001), s99 xuất hiện log lặp mỗi 10 giây:
```
[ERR]connect server time out!
```
Do repo này **không có service nào thực sự lắng nghe** ở các port đó (không tìm thấy trong centerserver/dbserver/gateway/loggerserver). Đây là **lỗi phụ, không chặn gameplay** (đã xác nhận: s1 chơi bình thường dù có lỗi tương tự về mặt lý thuyết). Nếu muốn dọn log sạch hơn, có thể đổi 2 địa chỉ này về lại `127.0.0.1` ở cả `s1/gameworld/GameWorld.txt` và `s99/gameworld/GameWorld.txt` — khi đó lỗi sẽ đổi thành "refused" tức thì (nhẹ hơn "timeout") thay vì phải chờ hết timeout mỗi lần retry. Không bắt buộc phải sửa.

---

## 8. Kế hoạch dịch UI game sang tiếng Việt

### 8.1. Khảo sát hệ thống chữ/văn bản trong game (đã khảo sát 2026-07-02)

Game có **3 lớp văn bản tách biệt**, mỗi lớp cần cách xử lý khác nhau:

| Lớp | Vị trí | Định dạng | Có thể sửa trực tiếp? |
|---|---|---|---|
| **UI client (khung giao diện: nút, panel, tiêu đề, tooltip)** | `phpStudy/PHPTutorial/WWW/resource/exml/*.exml` (840 file) | XML, thuộc tính `text="..."` | ✅ Có — client Egret load thẳng file `.exml` này lúc chạy qua `default.thm.json` (đã xác minh, không cần build/compile lại) |
| **Văn bản game server-side (tên item/skill/quái, hội thoại NPC, thông báo hệ thống)** | `server/bin/s{1,99}/gameworld/data/language/zh-cn/*.txt` (109 file) | Lua-style text, hệ thống i18n chính thức của engine (biến `Lang`) | ✅ Có — file text thường, GameWorld đọc lúc khởi động (`[TIP]Start Load Luaguage Config!`) |
| **Config game (tên item/quái/nhiệm vụ nhúng thẳng trong config, không qua `Lang`)** | `server/bin/s{1,99}/gameworld/data/config/**/*.config` (401/438 file có chữ Hán) | Lua table | ✅ Có, nhưng rủi ro cao hơn — phải chỉ sửa field tên/mô tả, không được đụng vào key/id/số liệu |

**Lưu ý quan trọng**: các file JS đã build sẵn (`js/main.min_*.js`, `js/game.min_*.js`) **không chứa chữ Hán nào** — xác nhận toàn bộ text hiển thị đều nạp từ 3 nguồn trên, **không cần** sửa/build lại JS. Đây là tin tốt — không cần bộ công cụ Egret/TypeScript gốc.

### 8.2. Quy mô thực tế (đếm được 2026-07-02)

- **UI (exml)**: 840 file, **1.771 cụm chữ Hán duy nhất** cần dịch (dùng lại nhiều lần → 2.864 lượt xuất hiện). Đây là phần đúng nghĩa "UI code" mà bạn yêu cầu.
- **Server-side language**: 109 file, ~23.500 dòng, ~19.300 dòng có chữ Hán (tên vật phẩm, kỹ năng, hội thoại, thông báo).
- **Config game**: 401 file có chữ Hán (tên/mô tả nhúng trong config item, quái, nhiệm vụ...).
- **Website PHP**: nhỏ, vài chục chuỗi (`index.php`, `reg/`, `gm/`, `gmht/`).

→ Tổng quy mô rất lớn (hàng chục nghìn chuỗi nếu tính hết cả 3 lớp) — **không thể dịch xong "toàn bộ" trong 1 lượt**. Cần chia giai đoạn, ưu tiên phần người chơi nhìn thấy nhiều nhất trước.

### 8.3. Kế hoạch giai đoạn (đề xuất)

1. **Giai đoạn 1 — UI khung chung + chuỗi lặp lại nhiều nhất**: các skin dùng chung (`ButtonSkin.exml`, `PanelSkin.exml`, `CheckBoxSkin.exml`...) + top chuỗi xuất hiện nhiều lần (vd "点击空白区域关闭窗口" lặp 134 lần, "已领取", "剩余时间："...). Dịch nhóm này ảnh hưởng hiển thị toàn bộ UI ngay lập tức vì dùng chung khắp nơi.
2. **Giai đoạn 2 — Web đăng ký/đăng nhập + màn hình loading**: `index.php`, `reg/*.php` — ít chuỗi, tác động cao vì là điểm chạm đầu tiên của người chơi.
3. **Giai đoạn 3 — Panel gameplay chính**: nhân vật, túi đồ, kỹ năng, cửa hàng, bang hội — các exml theo từng tính năng lớn.
4. **Giai đoạn 4 — Panel sự kiện/hoạt động**: số lượng file nhiều nhưng mỗi file ít chuỗi, độ ưu tiên thấp hơn (không phải màn hình chính).
5. **Giai đoạn 5 — Văn bản server-side**: tên vật phẩm/kỹ năng/quái, hội thoại NPC (từ `language/zh-cn/*.txt`) — khối lượng lớn nhất, cần làm theo từng file/nhóm chức năng, giữ nguyên bảng thuật ngữ (glossary) xuyên suốt để nhất quán.
6. **Giai đoạn 6 — Config game**: tên/mô tả nhúng trong `config/**/*.config` — làm sau cùng vì rủi ro cao nhất (dễ sửa nhầm field không phải text).

### 8.4. Tiến độ

- ✅ **Giai đoạn 1 (một phần)** — 2026-07-02: đã dịch **166 chuỗi UI xuất hiện ≥3 lần** (bao phủ 1.004/2.864 lượt xuất hiện chữ Hán trong exml), áp dụng vào **388/840 file exml**. Đã xác minh cả 840 file vẫn là XML hợp lệ sau khi sửa (không hỏng cấu trúc). Bảng thuật ngữ lưu tại `translation/glossary_ui_phase1.json`, script áp dụng tại `translation/apply_glossary.py` (dùng lại được cho các giai đoạn sau: `python3 translation/apply_glossary.py translation/glossary_xxx.json`).
- ⬜ Còn lại trong Giai đoạn 1: ~255 chuỗi xuất hiện đúng 2 lần (chưa dịch).
- ✅ **Giai đoạn 2** — 2026-07-02: đã dịch xong web đăng ký/đăng nhập: `index.php` (title, tên server hiển thị trong danh sách chọn server), `reg/index.php` (nhãn, nút, placeholder), `reg/api/api.php` + `reg/api/config.php` (thông báo lỗi trả về khi đăng ký/đăng nhập), `reg/user/js/app.js` (thông báo validate form). Đã kiểm tra `php -l` và `node --check` không lỗi cú pháp. Comment code (không hiển thị cho người chơi) cố tình không dịch để giữ phạm vi gọn.
- ✅ **Giai đoạn 3** — 2026-07-02: đã dịch panel gameplay chính (nhân vật, túi đồ, kỹ năng, cửa hàng, bang hội — 101 file mục tiêu, 184 chuỗi mới trong `text=`, 222 lượt áp dụng). Đồng thời phát hiện và xử lý một lớp thuộc tính riêng: nút bấm Egret dùng `label="..."` (không phải `text="..."`) — đã dịch toàn bộ **276 nhãn nút** (chuẩn hoá về 237 khái niệm gốc để tránh dịch trùng các biến thể có khoảng trắng đệm như "购 买"/"购  买"/"购买"), áp dụng 728 lượt trên 392 file. Script `apply_glossary.py` đã được nâng cấp để nhận diện cả `text=` và `label=`. Xác minh 840 file vẫn là XML hợp lệ.
- ✅ **Giai đoạn 4** — 2026-07-02: đã dịch **toàn bộ phần còn lại** của panel sự kiện/hoạt động (4 đợt: 4a/4b/4c/4d, tổng 1.393 chuỗi mới). Xác nhận bằng scan lại toàn bộ 840 file: **0 chuỗi chữ Hán còn sót lại** trong bất kỳ thuộc tính `text=` hay `label=` nào. Tổng cộng từ Giai đoạn 1→4: **675/840 file exml đã được sửa**, 3.464 dòng thay đổi, 0 lỗi XML ở lần kiểm tra cuối cùng.
  → **Toàn bộ "UI code" theo đúng nghĩa (file `.exml` — khung giao diện, nút bấm, nhãn, tooltip) đã dịch xong 100%.**

### 8.4.1. ⚠️ SỬA SAI NGHIÊM TRỌNG (2026-07-03): file `.exml` KHÔNG được client đọc trực tiếp

Trong lúc bạn test bản dịch Giai đoạn 1-4, phát hiện **không thấy thay đổi gì trên client** dù đã copy đúng file `.exml`. Điều tra lại kỹ thì phát hiện phân tích trước đó ở mục 8.1 (dòng "client Egret load thẳng file `.exml` này lúc chạy... không cần build/compile lại") **là SAI**.

**Sự thật**: `resource/exml/*.exml` chỉ là **mã nguồn gốc**. Egret có bước build/publish (dùng công cụ AIR ở `packEui.bat`, không có sẵn trong repo) biên dịch toàn bộ `.exml` thành **class JavaScript nhúng thẳng vào `phpStudy/PHPTutorial/WWW/js/default.thm_70915153.js`** (file 4.5MB). `manifest.json` (file mà `index.php` thực sự load) chỉ tham chiếu tới file JS đã biên dịch này, **không hề tham chiếu tới `.exml` hay `default.thm.json`**. Client chạy live chỉ đọc file JS đã biên dịch — sửa `.exml` không có tác dụng gì cho tới khi được build lại (mà repo này không có công cụ build).

Bằng chứng: `default.thm_70915153.js` chứa các dòng như `generateEUI.paths['resource/exml/ItemIconSkin.exml'] = window.SkinItemIcon = (function(_super){...` — tức là mỗi file `.exml` được biên dịch thành 1 class JS, gán vào `generateEUI.paths[...]`. 2 file `default.thm_f0b18827.js` và `default.thm_f547f824.js` cùng thư mục là **bản build cũ, không được dùng** (chỉ có `manifest_0.05*.json` cũ tham chiếu, không phải `manifest.json` đang active).

**Cách khắc phục đã áp dụng**: vì không có công cụ build Egret gốc, mình viết `translation/apply_js_glossary.py` để áp trực tiếp **7 bảng thuật ngữ đã dịch ở Giai đoạn 1-4** (đang có sẵn) vào thẳng file JS đã biên dịch, khớp theo 2 dạng cú pháp: `t.text = "..."` / `t.label = "..."` và `SetProperty(id,"text"/"label","...")`. Kết quả: số ký tự Trung trong `default.thm_70915153.js` giảm từ **19.282 → 888** (~95,4%), phần còn lại chủ yếu là `t.fontFamily = "黑体"`/`"微软雅黑"` (**tên font kỹ thuật, cố tình không đụng vào** — không phải text hiển thị, sửa vào sẽ hỏng font chữ) và vài chuỗi nhỏ lẻ dùng thuộc tính khác chưa có trong glossary cũ (vd `.prompt = "..."`) — sẽ dịch bổ sung ở đợt sau. Đã xác minh `node --check` không lỗi cú pháp.

**⚠️ QUAN TRỌNG CHO CÁC LẦN SAU**: từ giờ, **file cần copy về server không phải `resource/exml/*.exml` nữa** (dù vẫn giữ dịch song song 2 nơi để nhất quán/dễ đối chiếu) — mà là **`phpStudy/PHPTutorial/WWW/js/default.thm_70915153.js`**. Nếu dịch thêm chuỗi UI mới, phải chạy `apply_glossary.py` (cho exml) **VÀ** `apply_js_glossary.py` (cho file JS đã biên dịch) với cùng glossary, rồi copy cả 2 nơi.

### 8.4.2. Phát hiện thêm: `main.min_d7aad928.js` cũng có rất nhiều chữ Hán chưa dịch — và RỦI RO CAO hơn hẳn

Khi kiểm tra khả năng viết tool build lại `.exml` → `.js`, phát hiện phân tích ở Giai đoạn 1 rằng "`main.min_*.js`/`game.min_*.js` không có chữ Hán" **cũng SAI** — do lệnh `grep -P` với Unicode bị lỗi âm thầm trả về `0` giả (đã gặp lỗi tương tự với bash grep trước đây, xem mục 7). Kiểm tra lại đúng bằng Python thì:

| File (đang được `manifest.json` load thật) | Số ký tự Hán còn lại |
|---|---|
| `js/game.min_45aa06f6.js` | 0 (thật sự sạch) |
| `js/egret.min_df45737.js` | 653 (code framework Egret, không phải nội dung game — **không nên đụng vào**) |
| `js/eui.min_506ce9f.js` | 564 (code framework EUI — tương tự, không đụng) |
| `js/default.thm_70915153.js` | 888 (đã xử lý ở mục 8.4.1) |
| **`js/main.min_d7aad928.js`** | **16.556** (file logic game chính — đây là vấn đề lớn) |

**Khác biệt quan trọng so với `default.thm`**: `default.thm_*.js` chỉ chứa định nghĩa UI (skin) nên MỌI chuỗi `"..."` trong đó chắc chắn là text hiển thị, dịch thoải mái. Nhưng `main.min_d7aad928.js` là **code logic thật** (~3.8MB, biên dịch từ TypeScript) — trong đó chuỗi tiếng Trung có thể là:
- Text hiển thị thật (an toàn dịch): `UserTips.ins().showTips("...")`, `WarnView.show("...")`, `.setBtnLabel("...","...")`, `.text=`/`.label=` (kể cả dạng không có khoảng trắng `.text="..."`, khác với `default.thm`), và các nhánh ternary ngay sau `.label=`/`.text=`.
- **Định danh dùng để SO SÁNH LOGIC trong code** (ví dụ gặp thực tế: `"神兽"==this.infoModel...`) — **dịch nhầm các chuỗi này sẽ làm hỏng logic game** (so sánh sai → tính năng chạy sai), không chỉ là vấn đề hiển thị.

**Đã làm (an toàn)**: viết `translation/apply_js_glossary.py` (mở rộng thêm `.text="..."` không khoảng trắng) và `translation/apply_js_safe_calls.py` (chỉ khớp chuỗi nằm trong `showTips()`, `setBtnLabel()`, `WarnView.show()`, và ternary ngay sau `.label=`/`.text=`) — áp **8 bảng thuật ngữ đã kiểm chứng sẵn có** (không tự dịch chuỗi mới). Kết quả: 17.512 → 16.556 (mới giảm được ~956 ký tự, vì phần lớn 16.556 còn lại là chuỗi **hoàn toàn mới**, chưa từng xuất hiện trong `.exml`/UI đã dịch trước đó — không có trong glossary cũ nên chưa được đụng tới, đúng theo thiết kế an toàn).

**Việc còn lại (chưa làm, cần cẩn trọng)**: phần lớn 16.556 ký tự còn lại là nội dung MỚI (chat mẫu, thông báo hệ thống, mô tả tính năng, có thể cả định danh nội bộ) cần **đọc từng ngữ cảnh để phân loại an toàn/rủi ro trước khi dịch**, không thể áp ẩu như đã làm với `.exml`/`default.thm`. Đây là công việc rủi ro cao hơn hẳn, cần thời gian đáng kể và cẩn thận hơn nữa so với mọi phần đã làm trước đó.

- 🔶 **Giai đoạn 5 (đang làm)** — 2026-07-02: khảo sát lại cho thấy quy mô thật là **15.148 chuỗi tiếng Trung riêng biệt** trong 109 file (không phải ~1.400 như Giai đoạn 1-4) — nội dung là **văn xuôi/lời thoại nhiều câu** (tiểu sử nhân vật kiếm hiệp, hội thoại NPC, mô tả sự kiện có mã màu `<font>`), không phải nhãn ngắn, nên cần dịch cẩn thận hơn nhiều so với UI.
  - Tin tốt: `data/language` của s1 và s99 **giống hệt nhau** (chỉ khác 5 file config nhỏ ở Giai đoạn 6) → chỉ cần dịch 1 lần rồi copy, đã tự động đồng bộ sang s99 sau mỗi đợt.
  - Tooling: `translation/extract_lang_strings.py` (trích chuỗi) + `translation/apply_lang_glossary.py` (áp glossary, thay đúng nội dung trong `"..."`).
  - ⚠️ **Bug đã gặp và đã vá**: bản dịch đầu tiên (`bossname.txt`) dùng dấu ngoặc kép thẳng `"..."` lồng bên trong giá trị, làm kết thúc sớm chuỗi Lua → hỏng cú pháp file. Đã revert, sửa dùng dấu ngoặc kép cong `" "` (đúng phong cách bản gốc tiếng Trung), và **thêm cơ chế tự chặn** trong `apply_lang_glossary.py`: script giờ từ chối áp dụng nếu glossary có giá trị chứa dấu `"` thẳng chưa escape, để không lặp lại lỗi này ở các đợt sau.
  - Đã dịch xong **9/109 file** (466 chuỗi): `bossname.txt`, `worldbossname.txt`, `collectname.txt`, `npcstoretags.txt`, `functitle.txt`, `title.txt`, `entityname.txt`, `npctitle.txt`, `scenename.txt`. Đã xác minh bằng `luac5.3 -p` (cú pháp Lua) + scan lại 0 chữ Hán còn sót cho từng file. Đã đồng bộ sang s99.
  - **Còn lại: 14.682 chuỗi / 100 file**, trong đó riêng 5 file lớn nhất (`item.txt` 3.855 dòng, `scripttips.txt` 2.499, `skill.txt` 2.401, `talk.txt` 1.449, `quest.txt` 1.290) chiếm phần lớn khối lượng còn lại — đây là mô tả vật phẩm/kỹ năng và hội thoại nhiệm vụ, khối lượng công việc tương đương nhiều lần toàn bộ Giai đoạn 1-4 cộng lại.

#### ⚠️ Bug nghiêm trọng thứ 2 đã gặp và đã vá (2026-07-03): quét cả file bằng regex `"..."` bị LỆCH CẶP NGOẶC nếu comment đầu file có số lẻ dấu `"` thẳng

- Khi dịch `system.txt` (450 dòng dạng mảng vị trí `"text ",  --varname, //comment`), `apply_lang_glossary.py` báo **373 lượt thay thế thành công** nhưng khi kiểm tra lại file thực tế thì **74 dòng đầu tiên hoàn toàn KHÔNG đổi** — vẫn còn nguyên tiếng Trung.
- **Nguyên nhân gốc**: comment giải thích ở đầu file (dòng 1-5) có đoạn ví dụ minh họa cú pháp, chứa **5 dấu `"` thẳng** (số lẻ) — ví dụ dòng `--其中******是表示提示语,提示语不要出现半角的"这样的字符，可以用全角的"，...`. Vì `STR_PAT` quét **toàn bộ nội dung file** để tìm cặp `"..."`, một số lẻ dấu `"` ở đầu làm **lệch pha ghép cặp cho toàn bộ phần còn lại của file**: từ dòng 9 trở đi, mỗi cặp ngoặc kép mà regex "tìm thấy" thực ra là khoảng giữa *dấu đóng của dòng N* và *dấu mở của dòng N+1* (tức gồm cả phần comment `--varname,...//chú thích` + kỹ tự đầu dòng sau) — không phải nội dung tin nhắn thật. Các thay thế "thành công" (373 lượt) thực chất đã ghi đè **sai vị trí/sai nội dung** (may mắn là các lượt này chỉ khớp được ở những đoạn tình cờ trùng do có nhiều dòng liên tiếp cùng cấu trúc, cụ thể bắt đầu khớp đúng lại từ dòng 84 trở đi).
- **Đã xử lý**: `git checkout --` để hoàn tác file bị hỏng ngay khi phát hiện (chưa kịp commit). Viết script mới **`translation/apply_lang_glossary_lineanchored.py`** — khớp **theo từng dòng** (neo `^\s*"..."\s*,`, xử lý độc lập từng dòng bằng `readlines()`) thay vì quét nguyên file bằng 1 regex — miễn nhiễm hoàn toàn với lỗi lệch cặp ngoặc do comment ở nơi khác trong file. Áp lại: **450/450 lượt thay thế đúng**, xác minh `luac5.3 -p` pass và scan lại 0 tiếng Trung còn trong các dòng `"..."`.
- **Đã kiểm tra lại 9 file Giai đoạn 5 đã dịch trước đó** (bossname, worldbossname, collectname, npcstoretags, functitle, title, entityname, npctitle, scenename) bằng cách tìm match nào của `STR_PAT` chứa xuống dòng (`\n`) — **không có file nào bị lỗi này** (không file nào có comment đầu file chứa số lẻ dấu `"` thẳng) → 9 file đó vẫn đúng, không cần sửa lại.
- **Quy tắc bắt buộc cho các file tiếp theo**: trước khi dùng `apply_lang_glossary.py` (quét nguyên file) cho 1 file `.txt`/`.config` MỚI, phải kiểm tra nhanh: `python3 -c "print(open(path,encoding='utf-8').read().count(chr(34)))"` xem tổng số dấu `"` thẳng trong file có phải **số chẵn** không, và/hoặc kiểm tra không có match nào của `STR_PAT` chứa `\n` bên trong. Nếu file có phần comment giải thích/ví dụ ở đầu (dễ chứa số lẻ dấu `"`), **dùng `apply_lang_glossary_lineanchored.py` thay thế** để an toàn tuyệt đối.
- Đã dịch xong file thứ 10: **`system.txt`** (443 chuỗi duy nhất, 450 dòng — thông báo hệ thống hiển thị liên tục khi chơi: lỗi kỹ năng, giao dịch, bang phái, hộp thư...), đồng bộ sang s99.
- Đã dịch xong file thứ 11: **`guild.txt`** (389 chuỗi duy nhất, 431 lượt trong file — toàn bộ hệ thống bang phái: tạo/giải tán/mời/đàn hặc/kho bang/福地之战/幽冥魔域/thần thú hộ bang/王城争夺/皇城争霸/帮派盛宴, cả lời thoại NPC liên quan). Đã kiểm tra trước khi áp (đếm số dấu `"` chẵn + không có match nào chứa `\n`, theo quy tắc mới ở mục 8.4.5), dùng generator cho 4 mẫu lặp có số (`N阶Boss`, `N级` giới hạn kỹ năng, `N绑定金币`, tổ hợp `人数上限/帮派等级/仓库`), còn lại dịch tay. `luac5.3 -p` pass, 0 tiếng Trung còn sót trong `"..."`, đồng bộ sang s99. - Đã dịch xong file thứ 12: **`fubenname.txt`** (198 chuỗi duy nhất, 354 lượt trong file — tên/mô tả phó bản: cảnh giới tu luyện x N阶 (炼气/筑基/开光/融合/心动/金丹/元婴/出窍/分神/合体/洞虚/大乘/渡劫/散仙/真仙/天仙/玄仙), 血战长空 theo cấp, 诛魔殿/神装BOSS theo tầng, 8 quẻ Bát Quái, và các phó bản sự kiện đặc biệt). **146/198 (74%) tái sử dụng được từ glossary các file trước** (tên cảnh giới, tên phó bản đã xuất hiện ở `achievename`/`config.json`/`guild.txt`...) — chỉ cần dịch tay 52 mục còn lại. `luac5.3 -p` pass, 0 tiếng Trung còn sót, đồng bộ s1->s99.

- Đã dịch xong file thứ 13: **`activityname.txt`** (259 chuỗi: 87 name + 172 desc, hoàn thành 100%) — tên/mô tả toàn bộ hoạt động sự kiện game (hoạt động thường nhật + các đợt lễ tết lặp lại nhiều năm: Tết, Trung Thu, Quốc Khánh, Giáng Sinh, Thất Tịch, Vạn Thánh Tiết...).
- Đã dịch xong file thứ 14: **`achievename.txt`** (514 chuỗi: 8 groupName + 252 name + 254 desc, hoàn thành 100%) — tên/mô tả toàn bộ hệ thống thành tựu.
- Đã dịch xong file thứ 15: **`fbtalk.txt`** (60 chuỗi, hoàn thành 100%) — lời thoại phó bản: Đồ Long Sơn Cốc, Ngũ Linh Huyền Thiên Trận, Phi Đao Môn, và 13 lore+chiến thuật boss thế giới huyễn cảnh (Băng Hỏa Ma, Bạch Phát Ma Sư, Tam Vĩ Diễm Hồ, U Minh Ma Quân, Diễm Vũ Phượng Hoàng, Kim Khải Huyền Vũ, Hắc Minh Ma Dực, Hỗn Độn Kiếm Ma, Thái Cổ Cùng Kỳ, Diệt Hồn Thiên Ma, Hồng Hoang Yêu Vu, Song Thân Ma Thần, Hình Thiên).
- Đã dịch xong file thứ 16: **`kuafuzudui.txt`** (80 chuỗi, hoàn thành 100%) — bao gồm cả 2 rulebook rất dài (4508 + 847 ký tự) giải thích chi tiết luật "Tranh Đoạt Tiên Thành" và "Thánh Nguyên Thành Chi Chiến".

- Đã dịch xong file thứ 19: **`pet.txt`** (264 chuỗi duy nhất, 270 lượt trong file, hoàn thành 100%) — toàn bộ hệ thống bạn đồng hành (伙伴)/thú cưng (宠物): thông báo lỗi UI, ~24 tên bạn đồng hành/thú cưng (小钻风, 嘟嘟鱼, 雪狐...), câu thoại hài hước/meme cho từng con, 6 gia tộc màu sắc + 3 hệ kỹ năng, 8 linh thú huyền thoại (神龙/火凤/冰凤/麒麟/猛虎/夜鹰/灵猴/仙雀) mỗi con kèm mô tả văn phong cổ điển gắn với 1 chỉ số, 8 tính cách (勇敢/坚强/坚韧/固执/专注/冷静/机敏/诚实) dùng chung 1 template `{0}-{7}`, 5 cấp bậc thú (元兽→圣兽), ~30 câu "cố vấn" thú cưng nói với chủ nhân (giữ nguyên mã `%N` hậu tố), và toàn bộ hệ thống "Thú Cưng Vượt Ải" (闯关/扫荡/珍宝囊) + hướng dẫn hợp thành/升星/trọng chú/nâng cấp trang bị thú cưng. Xác nhận quy ước xuống dòng: single-backslash-n (24 lượt, giống `activityname.txt`). `luac5.3 -p` pass, 0 tiếng Trung còn sót trong `"..."` (91 cụm tiếng Trung còn lại đều nằm trong comment `--` dành cho dev, đã xác minh bằng script kiểm tra vị trí `--` trước mọi ký tự Hán). Đồng bộ s1->s99.

- Đã dịch xong file thứ 20: **`mount.txt`** (268 chuỗi duy nhất, 292 lượt trong file, hoàn thành 100%) — toàn bộ hệ thống tọa kỵ: thông báo UI (喂养/进阶/强化/骑乘...), 12 tên tọa kỵ (啸天狼, 夜影豹, 雪月虎, 破甲黑犀, 熔甲苍熊, 幽炎影狮, 獠刃暴龙兽, 诛天血麟兽, 冰天琉璃凤, 帝御乾坤龙, 天馋玄龟, 双子貔貅) kèm 10 đoạn lore, 8 tên kỹ năng proc (碎盾/折戟/断刃/撕裂/迟钝/残忍/追击/天罚), và 2 khối text giới thiệu thần đan/thánh đan. Dùng generator cho: 120 tổ hợp `Bậc N sao M` (N=1-10, M=0-10, tái sử dụng quy ước "Bậc"/"sao" đã có sẵn từ Phase 4 UI glossary `一阶`→`Bậc 1`), 50 chuỗi thuộc tính dạng `{tên chỉ số} tăng N` (5 nhóm × 10), 10 chuỗi `被攻击时...伤害减免 N%`, và 9 chuỗi `坐骑进阶至N阶0星自动激活`. `luac5.3 -p` pass, 0 tiếng Trung thật còn sót (chỉ còn trong comment `--`). Đồng bộ s1->s99.

- Đã dịch xong file thứ 21: **`npctalk.txt`** (138 chuỗi duy nhất, 138 lượt trong file, hoàn thành 100%) — lời thoại phiếm (ambient chatter) của NPC thường dân/tiểu yêu rải rác khắp bản đồ: gồm 2 nhóm chính — (a) ~65 câu ngạn ngữ/danh ngôn triết lý nhân sinh không liên quan cốt truyện (kiểu random flavor text), và (b) ~70 câu lời thoại theo bối cảnh khu vực cụ thể (Giao Nhân tộc, Long tộc, Cửu Âm Tông, Cửu U, Dược Vương Cung, cổ tiên bí tàng...) cùng 4 chuỗi dài thông báo lịch bang chiến 王城争夺/皇城争霸. Dịch tay toàn bộ (0% tái sử dụng glossary cũ do nội dung độc lập). `luac5.3 -p` pass, 0 tiếng Trung còn sót. Đồng bộ s1->s99.

- Đã dịch xong file thứ 22: **`normaltalk.txt`** (132 chuỗi duy nhất, 146 lượt trong file, hoàn thành 100%) — lời thoại NPC quan trọng có tên riêng gắn liền cốt truyện: Chỉ Vân/Cửu Thiên Huyền Nữ tại Tiêu Diêu Thành, cây già Đạp Vân Hồ tộc kể về Huyền Thiên Tông/Xích La Môn/Vạn Kiếm Sầu, các NPC phát nhiệm vụ tại từng khu vực/phó bản theo mốc cấp độ (kèm gợi ý `<(c0xFF00FF00)...>`), và các đoạn hoài niệm/độc thoại nội tâm mang màu sắc thơ cổ điển của nhiều nhân vật (Y Nhi, Liên Tinh, Thanh Nhi, Tố Trinh...). Cũng có thông báo lễ hội theo mùa (Quốc Khánh, Giáng Sinh, Thất Tịch, Thanh Minh) và mô tả 10 thần khí thượng cổ. Dịch tay toàn bộ. `luac5.3 -p` pass, 0 tiếng Trung còn sót. Đồng bộ s1->s99.

- Đã dịch xong file thứ 23: **`monstername.txt`** (740 chuỗi duy nhất, 749 lượt trong file, hoàn thành 100%) — toàn bộ tên quái vật/boss/NPC chiến đấu trong game. Cấu trúc đặc biệt: 386 tên cơ sở + 354 biến thể đánh số hậu tố (`红石巨人`/`红石巨人2`/`红石巨人3`...) dùng chung 65 tên gốc → dịch 386 tên cơ sở (23/386 tái sử dụng trực tiếp từ `pet.txt` do trùng tên thú cưng bắt được ở "Đảo Thú Cưng") + 17 tên chỉ tồn tại dạng có hậu tố (không có bản không hậu tố trong file, ví dụ `一阶心魔`.."十阶心魔"), rồi dùng script tự động ghép hậu tố số y hệt bản gốc cho toàn bộ 354 biến thể còn lại. Bao gồm: quái thường theo khu vực (机关/幽冥宫/九阴宗/沙漠/远古龙/护宝-盗宝hệ thống Vạn Bảo/8 quẻ Bát Quái + Trấn Thủ Giả, 4 Linh Thú Tứ Tượng Huyền Vũ/Bạch Hổ/Chu Tước/Thanh Long, dàn NPC "文房四宝" 琴棋书画, quái lễ hội Trung Thu/Quốc Khánh/hôn lễ), và boss thế giới (`远古巨人.一~.八`, `轮回之主`, `万木之祖`...). `luac5.3 -p` pass, 0 tiếng Trung còn sót. Đồng bộ s1->s99.

- Đã dịch xong file thứ 24: **`questionclass.txt`** (976 chuỗi duy nhất, 1050 lượt trong file, hoàn thành 100%) — ngân hàng câu hỏi trắc nghiệm kiến thức chung dùng cho minigame đố vui trong game: ~440 câu hỏi + đáp án bao trùm địa lý, lịch sử, khoa học thường thức, sức khỏe/dinh dưỡng, quân sự, văn học/thơ ca cổ điển Trung Quốc, thiên văn... hoàn toàn độc lập với cốt truyện game, và ~90 chuỗi cuối là câu hỏi/đáp án riêng về kiến thức trong game (hệ thống bạn đồng hành/tọa kỵ/phó bản/nhiệm vụ). Dịch tay toàn bộ theo lô lớn để đảm bảo tiến độ do khối lượng khổng lồ. Phát hiện và sửa 73 chuỗi dùng dấu ngoặc kép thẳng `"` (từ các câu hỏi có cụm từ trích dẫn kiểu `"XXX"`) bằng script tự động chuyển thành cặp ngoặc cong "" luân phiên — tránh vi phạm quy tắc dấu ngoặc kép bắt buộc. Cũng phát hiện và sửa 1 lỗi gõ sót ký tự Hán "俑" lẫn trong bản dịch (phải sửa trực tiếp trên file đích vì đã áp glossary trước khi phát hiện). `luac5.3 -p` pass, 0 tiếng Trung còn sót. Đồng bộ s1->s99.

- Đã dịch xong file thứ 25: **`tasktalk.txt`** (347 chuỗi duy nhất, 385 lượt trong file, hoàn thành 100%) — toàn bộ thông báo hệ thống server-wide cho các sự kiện lớn: phúc lợi ngày (gấp đôi kinh nghiệm/cộng tu vi/quay số/Hang Thiên Tàm tĩnh tu), Bàn Đào Thịnh Yến, Hoa Sơn Luận Kiếm (giải đấu PK theo tuần), Thiên Nguyên Chi Chiến (tranh đoạt Tiêu Diêu Thành giữa bang phái), hệ thống BOSS thế giới/BOSS tinh anh/BOSS liên server (bao gồm cơ chế "tiện thi" — đánh xác BOSS sau khi chết), chiến phe phái (liên chém/tháp thủ hộ), phó bản Cửa Vào Ma Giới, phó bản bảo vệ Cửu Thiên Huyền Nữ, phó bản chuyển sinh, và minigame "tìm bạn nhỏ". ⚠️ Phát hiện quy ước xuống dòng **hỗn hợp trong cùng 1 file**: 25/27 chuỗi dùng double-backslash (giống `target.txt`), nhưng đúng 1 chuỗi (quy tắc xếp hạng luận kiếm, dòng cuối file) dùng single-backslash-n — xác nhận lại nguyên tắc phải kiểm tra từng chuỗi riêng lẻ khi trích xuất `STR_PAT`, không chỉ đếm tổng toàn file. `luac5.3 -p` pass, 0 tiếng Trung còn sót. Đồng bộ s1->s99.

- Đã dịch xong file thứ 26: **`miji.txt`** (52 chuỗi duy nhất, 184 lượt trong file, hoàn thành 100%) — hệ thống "Bí Tịch" (秘籍, sách bí kíp tăng cường kỹ năng rơi từ Trấn Yêu Tháp): 27 mô tả hiệu ứng bí tịch theo template (tăng % sát thương kỹ năng + hiệu ứng đặc biệt riêng cho từng trong 24 tên kỹ năng như Đột Lôi/Hóa Nguyên Trảm/Vạn Kiếm Quy Tông/Tru Tâm Tiên Thương...), 3 khối hướng dẫn dài (gắn bí tịch/nâng cấp bí tịch/Tiên Pháp Dung Luyện), và các thông báo lỗi UI. `luac5.3 -p` pass, 0 tiếng Trung còn sót. Đồng bộ s1->s99.

- Đã dịch xong 13 file nhỏ liên tiếp (mỗi file 2-15 chuỗi, tổng 80 chuỗi): **`medal.txt`** (4 huy chương hài hước), **`recenttarget.txt`** (2), **`answertip.txt`** (2, gợi ý dùng tính năng hét tên bản đồ để truyền tống), **`liudao.txt`** (5, hệ thống Lục Đạo/thương điếm), **`userbag.txt`** (3, mở rộng hành trang), **`userdepot.txt`** (3, mở rộng kho — phát hiện 1 lỗi khớp do khoảng trắng cuối chuỗi, đã sửa), **`retrieve.txt`** (3, tìm lại tài nguyên), **`lianfu.txt`** (5, liên server Hoàng Thành), **`liveness.txt`** (4, thưởng hoạt độ), **`cangbaoge.txt`** (4, Tàng Bảo Các mua sắm giới hạn thời gian), **`mail.txt`** (15, hệ thống thư gồm 6 loại tài nguyên đính kèm), **`flower.txt`** (8, tặng hoa vợ chồng), **`plotname.txt`** (30 tên nhân vật/vật phẩm cốt truyện — tái sử dụng đúng các tên đã chuẩn hoá từ `plot.txt`/`normaltalk.txt` trong phiên trước: Mộ Dung Ngọc Tiên, Vạn Kiếm Sầu, Xích Hà, Tiểu Thiến, Vân Tiêu, Bái Nguyệt, Nam Chiếu Vương, Thanh Nhi, Tố Trinh, Chỉ Vân, Nữ Oa Thạch, Thiên Nhưỡng Kiếp Ma...). Tất cả `luac5.3 -p` pass, 0 tiếng Trung còn sót, đồng bộ s1->s99.

- Đã dịch xong 5 file nhỏ tiếp theo (tổng 78 chuỗi): **`wyyj.txt`** (13, phó bản Vạn Yêu Di Tích — 4/13 tái sử dụng tên boss từ `monstername.txt`), **`exchange.txt`** (17, hệ thống đổi thưởng chiến công/vinh dự/điểm sự kiện), **`event.txt`** (32, nhãn nút UI nhiệm vụ + hệ thống kết hôn/ly hôn/tiệc cưới), **`routinequest.txt`** (8, nhiệm vụ hàng ngày + quay số), **`awards.txt`** (13, thưởng đăng nhập trực tuyến/tích lũy + Tụ Bảo Bồn). Tất cả `luac5.3 -p` pass, 0 tiếng Trung còn sót, đồng bộ s1->s99.

- Đã dịch xong **`weixin.txt`** (8 chuỗi, hướng dẫn theo dõi WeChat lấy mã kích hoạt — phát hiện lỗi khớp do nhầm dấu ngoặc kép cong "" trong chuỗi gốc thành ngoặc thẳng khi gõ key glossary, đã sửa lại đúng ký tự cong) và **`rank.txt`** (42 chuỗi, hệ thống bảng xếp hạng: tọa kỵ/bạn đồng hành/cánh/tinh linh/thú cưng/chiến lực/cấp độ/thành tựu/sức hút theo tuần, cùng 15 danh hiệu thứ hạng như Độc Cô Cầu Bại, Võ Lâm Chí Tôn, Bế Nguyệt Tu Hoa...). `luac5.3 -p` pass, 0 tiếng Trung còn sót, đồng bộ s1->s99.

- Đã dịch xong **`monsersay.txt`** (4 chuỗi, lời thoại boss rừng), **`root.txt`** (60 chuỗi: 19 tên linh thú thần thoại cho hình tượng linh căn — Nguyệt Hồ, Thiên Lang, Bạch Trạch, Trùng Minh, Giải Trãi..., 8 loại linh căn ngũ hành+băng/lôi/phong, 9 danh hiệu tình duyên vợ chồng, 9 chỉ số nhân vật, 8 huyệt đạo theo "đoạn" tiến triển linh căn kiểu Trung y: Thần Đình, Toàn Cơ, Thần Phong, Khúc Trì, Thiếu Thương, Thiên Khu, Túc Tam Lý, Dũng Tuyền), và **`platform.txt`** (10 chuỗi, hướng dẫn nền tảng Ái Ngoạn — 7/10 tái sử dụng từ `weixin.txt`; phát hiện lỗi kỹ thuật: dùng `python3 -c "..."` với dấu ngoặc kép bash thay vì heredoc khiến `\\n` bị bash làm mất 1 lớp escape thành newline thật trong JSON key, phải viết script riêng để khôi phục lại chuỗi `\n` đúng 2 ký tự — **quy tắc mới**: luôn dùng heredoc `<<'PYEOF'` (single-quote, không interpolate) cho mọi script Python xây glossary có chứa `\n`/`\\`, không bao giờ dùng `python3 -c "..."` (double-quote) cho các chuỗi này). Tất cả `luac5.3 -p` pass, 0 tiếng Trung còn sót, đồng bộ s1->s99.

- Đã dịch xong **`scintroduction.txt`** (29 chuỗi, bảng chú giải phím tắt thao tác) và **`market.txt`** (24 chuỗi, nhãn phân loại vật phẩm cửa hàng). `luac5.3 -p` pass, 0 tiếng Trung còn sót, đồng bộ s1->s99.

- Đã dịch xong **`qqmgr.txt`** (7 chuỗi, đặc quyền QQ Vệ Sĩ/Lam Cương/Hoàng Cương/hội viên) và **`achievemedal.txt`** (52 chuỗi, tên huy hiệu thành tựu dạng thành ngữ 4 chữ). ⚠️ Phát hiện lại lỗi tương tự `platform.txt`: dùng heredoc `<<'PYEOF'` (đúng quy tắc) nhưng bên trong script Python gõ `\n` (1 gạch chéo) thay vì `\\n` (2 gạch chéo) cho các chuỗi cần giữ nguyên ký hiệu xuống dòng `\n` của game — Python hiểu `\n` là ký tự xuống dòng thật, làm sai lệch key/value. Đã viết script sửa riêng để khôi phục `\n` thành đúng 2 ký tự. **Quy tắc nhấn mạnh lại**: bất kỳ chuỗi glossary nào cần giữ `\n` hoặc `\\` làm ký tự xuống dòng của game (không phải Python), PHẢI gõ `\\n` hoặc `\\\\` trong mã nguồn Python (kể cả trong heredoc single-quote) — không được gõ `\n`/`\\` trực tiếp. Sau khi áp dụng, luôn chạy lại kiểm tra "remaining chinese NOT after --" để bắt lỗi này sớm. `luac5.3 -p` pass, 0 tiếng Trung còn sót, đồng bộ s1->s99.

- Đã dịch xong **`chat.txt`** (23 chuỗi, hệ thống kênh chat: 9 tên kênh + thông báo cấm chat/giới hạn cấp độ) và **`expwarmtips.txt`** (8 chuỗi, gợi ý mốc cấp độ đầu game 4-30). `luac5.3 -p` pass, 0 tiếng Trung còn sót, đồng bộ s1->s99.

- Đã dịch xong **`actorsys.txt`** (28 chuỗi, floating-text hệ thống: nhận/mất tiền tệ, kinh nghiệm, lịch luyện, vinh dự, danh vọng, cống hiến phe phái + cảnh báo chống nghiện game). ⚠️ Lại phát hiện lỗi quy ước xuống dòng: file này dùng **double-backslash** (`\\`) cho `\<...>` (xác nhận `double_bs=5` khi kiểm tra byte thô ban đầu), nhưng khi gõ tay chuỗi cảnh báo chống nghiện dài trong heredoc, chỉ gõ 1 gạch chéo (`\<`) thay vì 2 (`\\<`) — không khớp key. Đã dùng `open(...,'rb')` đọc byte thô để xác nhận chính xác số lượng backslash thật trong chuỗi gốc rồi sửa lại key/value cho khớp. `luac5.3 -p` pass, 0 tiếng Trung còn sót (3 cụm còn lại chỉ nằm trong comment dòng 39). Đồng bộ s1->s99.

**Tổng Giai đoạn 5: 56/109 file, 6.000 chuỗi đã dịch** (55 file trước + `actorsys.txt` 28).

### Tóm tắt phiên làm việc này (2026-07-03, tiếp tục không dừng theo yêu cầu người dùng)

Đã dịch xong **30 file mới** trong phiên này (từ `pet.txt` đến `actorsys.txt`), nâng tổng tiến độ Giai đoạn 5 từ 18/109 lên **56/109 file (51%)**, từ 2.630 lên **~6.000 chuỗi đã dịch**. Các file lớn còn lại chưa đụng tới: `talk.txt` (60K+ ký tự Hán), `item.txt` (42K), `skill.txt` (35K), `scripttips.txt` (25K), `quest.txt` (14K) — đây là 5 file khổng lồ cần một phiên riêng biệt với chiến lược trích xuất/dịch theo lô lớn. Còn khoảng 30+ file cỡ trung bình khác (guide.txt 455, friend.txt 424, betaactivity.txt 422, guild.txt đã xong, question.txt 369, team.txt 347, slave.txt 345, xianshi.txt 338, superexptime.txt 338, chatmsg.txt 299, storyline.txt 291, anheishendian.txt 291, fightvalue.txt 283, cross.txt 278...) chưa dịch. Ngoài Giai đoạn 5 còn tồn: `config.json` field desc (~176K ký tự), `main.min_d7aad928.js` (~16K), `data/config/language/lang/*.config` (11K dòng, chưa khám phá), và 438 file `data/config/**/*.config` (Giai đoạn 6 gốc, chưa bắt đầu).

### 8.4.11. Đang dịch `target.txt` (165 dòng — hướng dẫn mục tiêu theo cấp độ), 2026-07-03

- ⚠️ **Phát hiện quan trọng**: file này dùng **2 dấu `\` liên tiếp (double-backslash)** làm ký hiệu xuống dòng hiển thị trong game, KHÁC với `activityname.txt`/`kuafuzudui.txt` (dùng `\n` — 1 dấu `\` + chữ "n"). Đã xác nhận qua đọc byte thô (`open(...,'rb')`) — `target.txt` có 164 lượt double-backslash, 0 lượt `\n`; ngược lại `activityname.txt`/`kuafuzudui.txt` có `\n` nhưng 0 double-backslash. **Quy tắc bắt buộc**: trước khi dịch bất kỳ file `.txt` MỚI nào có xuống dòng trong chuỗi, phải kiểm tra bằng lệnh đếm byte thô này để biết dùng quy ước nào, không được giả định giống file trước đó.
- 125 chuỗi duy nhất: 36 chuỗi dạng `N级`/`N级可以做什么` (dùng generator, đã xong) + 89 chuỗi hướng dẫn dài theo mốc cấp độ (1-58) và theo hệ thống (nhiệm vụ, treo máy, PK, phó bản...).
- ✅ **HOÀN THÀNH 100% `target.txt`** (125/125 chuỗi: 36 dạng `N级` + 89 chuỗi hướng dẫn dài). Batch cuối: khu vực khuyên dùng theo cấp, phó bản Diêm Vương Trại/Hoàng Tuyền Trại/Tùng Môn Khẩu, và toàn bộ 10 mục giới thiệu hệ thống (Nhiệm Vụ, Treo Máy, Mục Tiêu Của Tôi, Cường Hóa Trang Bị, PK, Phó Bản, Khinh Công, Ký Gửi, Đấu Đài, Bang Phái). Đã xác minh bằng script loại trừ `/M[^>]*>` (định danh cảnh NPC nội bộ, cùng quy ước với `href`) — 0 chuỗi thật sự còn tiếng Trung.
- `luac5.3 -p` pass, đồng bộ s1->s99.

### 8.4.10. Đang dịch `kuafuzudui.txt` (136 dòng — thông báo Vạn Tiên Tranh Hoàng liên server), 2026-07-03

- 80 chuỗi duy nhất: thông báo tiến trình đấu (海选赛/小组赛/地榜-天榜争霸赛各vòng), thư thưởng theo hạng, và đặc biệt là **2 rulebook rất dài** giải thích luật chơi "Tiên Thành Chi Chiến" (仙城争夺, 4508 ký tự) và "Thánh Nguyên Thành Chi Chiến" (圣元城之战, 847 ký tự).
- ✅ **HOÀN THÀNH 100% `kuafuzudui.txt`** (80/80 chuỗi) — bao gồm cả 2 rulebook rất dài (4508 + 847 ký tự) giải thích chi tiết luật "Tranh Đoạt Tiên Thành" (5 tòa thành luân phiên mở theo tuần, 3 trận Vô Chủ: Đấu Đua Tốc Độ BOSS→Đấu Tranh Bá Lục Cường→Đấu Tranh Đoạt Thành Chủ, rồi chu trình Có Chủ: Tranh Tư Cách→Chiêu Mộ Đồng Minh→Đấu Công Kiên) và "Thánh Nguyên Thành Chi Chiến" (trận chung kết giữa 4 Thành Chủ). Thuật ngữ nhất quán: 仙城=Tiên Thành, 青龙/白虎/朱雀/玄武/圣元城=Thanh Long/Bạch Hổ/Chu Tước/Huyền Vũ/Thánh Nguyên Thành, 城主=Thành Chủ, 资源塔=Tháp Tài Nguyên, 六强争霸赛=Đấu Tranh Bá Lục Cường, 仙城攻坚赛=Đấu Công Kiên Tiên Thành, 士气值=điểm Sĩ Khí, 如意锦囊=Túi Gấm Như Ý, 仙城俸禄=Bổng Lộc Tiên Thành, 金仙之力=Kim Tiên Chi Lực.
- `luac5.3 -p` pass, 0 tiếng Trung còn sót trong bất kỳ chuỗi nào. Đồng bộ s1->s99.

### 8.4.9. Đang dịch `achievename.txt` (574 dòng — tên/mô tả thành tựu), 2026-07-03

- Cấu trúc: 8 `groupNameNNN` (tên nhóm phân loại), 255 `nameNNN` (tên thành tựu, ngắn 2-6 chữ mang tính thành ngữ/mỹ từ), 255 `descNNN` (mô tả điều kiện đạt thành tựu).
- **Đã xong field `groupName` (8/8) + `name` (252/252 tên riêng biệt, 255 lượt)**: dùng 2 generator — (a) cảnh giới tu luyện × `小成`/`巅峰` (17 cảnh giới × 2 hậu tố = 34 tổ hợp, dùng lại đúng tên cảnh giới đã chuẩn hoá từ `fubenname.txt`), (b) mẫu `"{tên cơ sở}（N）"` lặp lại nhiều lần với hậu tố số thứ tự (35 tên cơ sở × nhiều mức, ví dụ `坚持签到（1-4）`→"Kiên Trì Điểm Danh (1-4)"). Còn lại ~180 tên đứng độc lập dịch tay (thành ngữ/mỹ từ 4 chữ kiểu 百发百中, 倾国倾城...).
- ✅ **HOÀN THÀNH 100% field `desc`** (254 chuỗi duy nhất, 255 lượt) — đúng như dự đoán, ngắn hơn nhiều so với `activityname.txt`, hầu hết là 1 câu điều kiện đơn giản. Dùng **~55 generator regex→template** cho các mẫu số lặp lại nhiều lần (`累计签到N次`, `武器强化至+N`, `坐骑进阶至N阶M星`, `帮派贡献达到N`, `一骑绝尘活动中累计被美女诱惑N次`...) + generator cảnh giới×`章节所有关卡2/3星通关` (34 tổ hợp, dùng lại REALM dict) + 2 generator nhỏ (phẩm chất trang bị, màu bạn đồng hành) + ~55 mục dịch tay cho câu không theo mẫu số.
- ✅ **HOÀN THÀNH 100% `achievename.txt`** (514 chuỗi: 8 groupName + 252 name + 254 desc). `luac5.3 -p` pass, 0 tiếng Trung còn trong bất kỳ chuỗi `"..."` nào. Đồng bộ s1->s99.

### 8.4.8. Đang dịch `activityname.txt` (786 dòng — tên + mô tả hoạt động sự kiện), 2026-07-03

- File có 2 field xen kẽ: `nameNNNNN` (tên hoạt động, 87 chuỗi riêng biệt) và `descNNNNN` (mô tả dài, 172 chuỗi riêng biệt, nhiều chuỗi có rich-text `<font color=...>`, link `<a href=...><IOBJ .../></a>`, biến `%s`/`$item$`, ký tự xuống dòng LITERAL `\n` (2 ký tự backslash+n, không phải newline thật — xem lưu ý bên dưới).
- **Đã xong field `name`**: dịch hết 87/87 tên (94 lượt trong file) — đây là các tên hoạt động ngắn (蟠桃盛宴→Đại Tiệc Bàn Đào, 天元之战→Thiên Nguyên Chi Chiến...). 0 tái sử dụng được từ glossary cũ (file này độc lập, không trùng lặp với các file đã dịch trước).
- **Đang dịch dở field `desc`**: 172 chuỗi mô tả dài (đợt sự kiện năm/lễ tết tích lũy nhiều năm — Tết, Trung Thu, Quốc Khánh, Giáng Sinh, Thất Tịch, Vạn Thánh Tiết, sinh nhật server...), phần lớn là văn bản dài kèm rich-text + link + biến — cần dịch cẩn thận từng câu, không thể dùng generator. Tại thời điểm ghi chú này: batch 1/9 (21 chuỗi đầu) đã dịch xong ở máy làm việc, chưa áp vào file, các batch còn lại đang tiếp tục.
- ⚠️ **Lưu ý xử lý chuỗi có `\n` literal**: khác với ký tự xuống dòng thật, các chuỗi trong file này dùng `\n` (backslash + chữ "n", 2 ký tự) làm code xuống dòng hiển thị trong game — khi gõ glossary trong Python phải viết `\\n` (escape kép) để giữ đúng 2 ký tự này, KHÔNG được dùng `\n` thường (Python sẽ hiểu thành 1 ký tự newline thật, làm sai lệch so với chuỗi gốc trong file → glossary sẽ không khớp được). Đã gặp lỗi này 1 lần ở `guild.txt` (9 chuỗi "MISSING" do sai escape), đã sửa — ghi lại đây để không lặp lại.
- File `activityname.txt` gốc (chưa sửa bởi phiên làm việc này) đã có **lỗi cú pháp Lua chuẩn tại dòng 14** (`desc00004` chứa `\阵` — dấu `\` đứng trước ký tự Hán, không phải escape hợp lệ trong Lua) — xác nhận qua `luac5.3 -p` trên bản gốc từ git HEAD, **không phải lỗi do phiên dịch thuật gây ra**. Vì engine game dùng parser riêng (không phải Lua chuẩn nghiêm ngặt — đã ghi nhận từ trước), file này vẫn chạy được trong game dù không qua được `luac5.3 -p`. Khi làm tiếp phần `desc` của file này, **bỏ qua lỗi `luac5.3 -p` ở dòng 14 cụ thể này** (đã xác minh là lỗi gốc, không phải do mình gây ra) nhưng vẫn phải chạy `luac5.3 -p` để phát hiện các lỗi MỚI có thể tự gây ra ở chỗ khác.
- **Tiến độ field `desc` (cập nhật liên tục)**: đã dịch thêm 2 batch (32 mục, 36 lượt) — Valentine (魅力排行榜/送花), lễ hợp server (合服庆典), Nguyên Tiêu, Cảm ơn/Tri ân đợt 1, Thanh Minh, 1/5, Đoan Ngọ đợt đầu. **Còn 102 chuỗi desc duy nhất chưa dịch** (giảm từ 135), chủ yếu là các đợt lễ tết lặp lại nhiều năm sau (Trung Thu, Quốc Khánh, Vạn Thánh Tiết, Thất Tịch, Giáng Sinh các năm, Lạp Bát...) — nội dung rất dài, tiếp tục dịch dần theo từng đợt nhỏ (không dùng generator được vì mỗi đoạn văn khác nhau, chỉ có khung câu tương tự).
  - ⚠️ Lưu ý khi rà soát "còn bao nhiêu tiếng Trung": 1 số chuỗi ĐÃ dịch xong vẫn bị đếm nhầm là "còn tiếng Trung" vì chứa `href='m天元城:...'`/`href='f天元城:...'` — đây là **định danh cảnh/toạ độ nội bộ engine dùng để dẫn đường**, không phải text hiển thị, nên **cố tình giữ nguyên tiếng Trung**, không phải sai sót. Khi đếm tiến độ thật, cần loại trừ các trường hợp này (kiểm tra phần văn xuôi hiển thị đã là tiếng Việt hay chưa, không chỉ đếm ký tự Hán còn lại trong toàn chuỗi).
  - Batch 4 (2026-07-03): thêm 15 mục (16 lượt) — hồi quy 6/2,魅力排行榜 6/16, cảm ơn QQ Đại Sảnh, cụm sự kiện "công测" (thử nghiệm công khai): song倍经验, hoàn trả tiêu dùng, đăng nhập theo khung giờ, cây ước nguyện huyễn mộng, phó bản 诗诗/雾花园, boss 龙猫, ghép Thi Quyển, đăng nhập công测, sự kiện Tencent Quản Gia 7/10-7/12, đăng nhập tháng 7, 魅力排行榜 8/11.
  - Batch 5 (2026-07-03): thêm 8 mục — Phúc Tinh, hồi quy 12/18, 魅力排行榜 8/18, phó bản Thất Tịch (七夕使者/Sybil), cụm sự kiện Kỷ Niệm Thịnh Thế (盛世一载): đăng nhập, song倍经验, cây tàng bảo may mắn, boss theo giờ.
  - Batch 6 (2026-07-03): thêm 10 mục — nốt cụm Kỷ Niệm Thịnh Thế (phó bản 盛世老人/御剑墟, hạn mua, trang bị thú cưng, đổi huy chương kỷ niệm, cảm ơn theo cấp), Lễ Khai Giảng, Phúc Tinh (biến thể giờ), Ngày Nhà Giáo (đăng nhập/hạn mua/boss theo giờ).
  - Batch 7 (2026-07-03): thêm 25 mục — trọn cụm sự kiện Trung Thu (đăng nhập/hoàn trả/trực tuyến/tiêu dùng/cây đoàn viên/boss thỏ tiên/魅力排行榜), Quốc Khánh (đăng nhập/song倍经验/trực tuyến/cây săn đồ/boss theo giờ/phó bản 逍遥境/hạn mua/đổi huy chương), Trùng Dương (đăng nhập/bánh trùng dương/魅力排行榜), Vạn Thánh Tiết (đăng nhập/cây bí ngô/phó bản 虚幻境/tiêu dùng/hạn mua/福星), Độc Thân (hoàn trả).
  - Batch 8 (2026-07-03, ĐỢT CUỐI): thêm 34 mục — trọn cụm Độc Thân (Trái Tim Cô Đơn), Tri Ân (福神/cây trái tim tri ân/trực tuyến/song倍经验), quy tắc hoàn trả QQ Không Gian, Băng Tuyết (cây huyễn mộng băng tuyết/boss băng long/phó bản Kỷ Băng Hà), Song Đán (Giáng Sinh+Năm Mới gộp: cây giáng sinh/boss tuần lộc/phó bản/đổi huy chương), Lạp Bát (đăng nhập/tiêu dùng/hạn mua), đăng nhập hàng ngày mặc định, quy tắc hoàn trả QQ Đại Sảnh.
  - ✅ **HOÀN THÀNH 100% `activityname.txt`** (259 chuỗi duy nhất: 87 name + 172 desc, ~450 lượt trong file). Đã xác minh bằng script loại trừ `href='...'` (định danh cảnh nội bộ cố tình giữ tiếng Trung) — 0 chuỗi thật sự còn sót tiếng Trung. `luac5.3 -p` chỉ còn lỗi gốc đã biết ở dòng 14 (không phải do dịch thuật). Đồng bộ s1->s99.
- ⬜ Giai đoạn 6 (config game — `data/config/**/*.config`, 401 file có chữ Hán nhúng trực tiếp trong tên/mô tả) — chưa bắt đầu, rủi ro cao nhất do cần tránh sửa nhầm field không phải text.

### 8.4.3. Phát hiện thêm nữa (2026-07-03): dữ liệu tên item/skill/quái nằm ở file JSON riêng phía CLIENT — không phải exml, không phải server Lua

Từ ảnh chụp màn hình test thực tế, thấy menu dưới cùng, tên kỹ năng ("霓帔伞舞"...), tên vật phẩm ("辟邪圣伞"), nhãn thuộc tính ("武器", "生命", "攻击") vẫn tiếng Trung dù `default.thm`/`main.min` đã vá. Điều tra thì phát hiện:

- **Menu icon dưới cùng** (法术/炼器/仙侣/历练/背包...): tìm khắp exml/JS/config không thấy — nhiều khả năng chữ được **vẽ sẵn trong hình bitmap** của icon, không phải text động → **theo yêu cầu, bỏ qua, không cố dịch phần này**.
- **Tên item/skill/quái**: nằm trong **`phpStudy/PHPTutorial/WWW/resource/config/config.json`** — file **12,8MB**, được `default.res3.json`/`default.res4.json` (manifest hợp lệ) tham chiếu nên **client có load và dùng thật**. Đây là bản dữ liệu cục bộ phía client (khác với dữ liệu server gửi runtime), cấu trúc `{"id":102401,"name":"辟邪圣伞","icon":102002,"descIndex":98}`.
  - Quy mô: **249.477 ký tự Hán**, riêng field `"name"` có **22.987 lượt / 3.511 tên duy nhất**. File này còn có `resource/config1/config0-6.json` đi kèm (chưa khảo sát kỹ).
  - Còn có **`server/bin/s1/gameworld/data/config/language/lang/*.config`** (16 file, 11.068 dòng) — một hệ thống "language" THỨ HAI ở server, tách biệt hoàn toàn khỏi `data/language/zh-cn/` (Giai đoạn 5 đang làm) — **chưa khảo sát/dịch**.
- Phát hiện mẫu hình: rất nhiều tên item ghép từ **[Tên phái/vùng 2 chữ] + [Bậc 1 chữ: 玄/灵/圣] + [Loại trang bị 1 chữ: 剑/腕/镯/甲/腿/盔/戒/鞋/伞/琴]** (vd 辟邪+玄+剑, 太虚+灵+腕) — dùng chung 18 tên phái xuyên suốt cả `item.config` (server) lẫn `config.json` (client). Đã viết generator ghép từ (`translation/glossary_config_names1.json`) để dịch tự động theo tổ hợp thay vì gõ tay từng cái — tiết kiệm rất nhiều công.
- **Đã làm**: viết `translation/apply_json_glossary.py` (escape đúng chuẩn JSON qua `json.dumps`, không dùng lại cách escape của Lua/exml). Dịch field `"name"` bằng 614 mục (456 sinh tự động qua morpheme + 158 dịch tay các tên đứng độc lập/quái/sách kỹ năng). Áp vào `config.json`: **18.825/22.987 lượt name đã dịch (81,9%)**, còn lại **4.162 lượt / 2.897 tên riêng biệt** chưa dịch. Đã xác minh JSON vẫn hợp lệ (`json.load` không lỗi) sau khi sửa.
- **Chưa làm**: field `"desc"` (mô tả dài, ước tính chiếm phần lớn trong 188.173 ký tự Hán còn lại của `config.json`), `resource/config1/config0-6.json`, và `data/config/language/lang/*.config` (11.068 dòng, hệ thống riêng).

### 8.4.4. Round 2 dịch field "name" trong config.json (2026-07-03)

- Mở rộng generator ghép từ (`morpheme_gen2.py`): thêm 3 tên phái mới (天外/太初/太上) + bậc mới 仙 (Tiên) → khớp thêm **57 tên mới** (không trùng round 1).
- Thêm 2 generator theo mẫu chuỗi cố định (script `round2_all.py`):
  - Mẫu tiến độ nhiệm vụ `"[Tên hoạt động]|C:0x00ff00&T:[số]|[đơn vị]"` (giữ nguyên rich-text tag `|C:...|`) — 17 tên hoạt động cơ bản × đơn vị (次→lần, 天→ngày, 圈→vòng, 个→cái).
  - Mẫu `"[màu]色N级装备"` (trang bị theo màu+cấp) — 5 màu (红/紫/蓝/橙/绿 → Đỏ/Tím/Xanh/Cam/Lục).
  - ~90 tên dịch tay cho quái/boss/vật phẩm đứng độc lập không khớp mẫu nào (北阴骨精, 天元神机, các dòng quái "元" theo cụm 5 hành...).
- Gộp tất cả (257 mục, không trùng round 1) vào `translation/glossary_config_names2.json`, kiểm tra `bad quotes: 0` trước khi áp dụng (theo quy ước an toàn).
- Áp bằng `apply_json_glossary.py` → **1.002 lượt thay thế** trong `config.json` (1 tên có thể xuất hiện ở nhiều item khác nhau). Xác minh lại `json.load()` không lỗi.
- Kết quả field `"name"`: còn **3.160 lượt / 2.640 tên riêng biệt** chưa dịch (giảm từ 4.162/2.897 sau round 1). Tổng ký tự Hán còn lại trong toàn file `config.json` (gồm cả `desc`): **183.535** (giảm từ ~188.173).
- **Bài học lưu để không lặp sai lầm**: khi gộp nhiều nguồn glossary (generator ghép từ + generator mẫu chuỗi + dịch tay) cho cùng 1 round, phải **merge tất cả vào 1 file rồi mới kiểm tra bad-quotes 1 lần cuối** trước khi `apply_json_glossary.py` — tránh áp nhiều lần rời rạc dễ quên bước kiểm tra ở 1 trong các nguồn.

### 8.4.5. Round 3 dịch field "name" trong config.json (2026-07-03)

- Phát hiện thêm 1 mẫu ghép từ rất lớn: **"{Tên nhân vật}的{loại phụ kiện}"** — 8 loại phụ kiện cố định (香囊/项链/玉佩/玉簪/手镯/耳坠/戒指/镜子, đã có bản dịch chuẩn từ round 2: Túi Hương/Dây Chuyền/Ngọc Bội/Ngọc Trâm/Vòng Tay/Bông Tai/Nhẫn/Gương) nhân với 11 tên nhân vật khác nhau (璃渝, 伞中仙, 玄霄, 白淑, 诗缘, 紫霓衫, 璃絮, 奚佳瑶, 舞伞, 蓝不归, 栾九霄) → sinh tự động **88 mục** chỉ bằng cách dịch tên nhân vật, giữ nguyên format "{phụ kiện} {tên}" đã dùng nhất quán từ round 2.
- Thêm 2 generator mẫu chuỗi mới: `[màu]色N转装备` (giống "N级装备" ở round 2 nhưng dùng chữ "转" — chuyển) và `累计充值|C:...|元` / `金币消耗|C:...|万` (dùng lại cấu trúc rich-text tag `|C:...|` như các mẫu trước).
- Dịch tay thêm ~250 tên: chủ yếu địa danh (山/塔/宫/殿/阁/台/岛/域/关/谷...), thành ngữ/cụm 4 chữ mang tính mỹ từ (乘风破浪, 国色天香, 沉鱼落雁...) dùng cho các item "thời trang/vẻ đẹp", và tên quái/boss thêm.
- Gộp 361 mục (không trùng round 1+2) vào `translation/glossary_config_names3.json`, `bad quotes: 0`.
- Áp bằng `apply_json_glossary.py` → **764 lượt thay thế**. Xác minh `json.load()` hợp lệ.
- Kết quả field `"name"`: còn **2.396 lượt / 2.279 tên riêng biệt** chưa dịch (giảm từ 3.160/2.640). Tổng ký tự Hán còn lại toàn file: **180.160** (giảm từ 183.535).
- **Bài học**: khi thấy 1 tên xuất hiện nhiều lần với hậu tố lặp lại y hệt nhau (vd `的香囊`, `的项链`...) → luôn kiểm tra xem có phải "N tên nhân vật × M loại phụ kiện cố định" không trước khi dịch tay từng dòng, vì tiết kiệm công rất lớn (11×8=88 chỉ cần dịch 11 tên).

### 8.4.6. Round 4 dịch field "name" trong config.json (2026-07-03)

- Generator vật liệu nâng cấp: **"{phái}{hậu tố vật liệu}"** — 6 phái (金雀/破月/葬神/坠日 mới + 霞羽/寒潭 đã có ở round 3) × 9 hậu tố cố định (晶铁/之魂/封灵/之火/水晶/之羽/纹石/之光/仙弓) → sinh 54 tổ hợp.
- Mở rộng generator "{tên nhân vật}的{phụ kiện}" (round 3) thêm 15 tên nhân vật mới, và phát hiện biến thể tiền tố **"收集{tên}的{phụ kiện}"** (dạng tên nhiệm vụ "thu thập") → dùng lại bản dịch phụ kiện, thêm tiền tố "Thu thập ".
- Generator kỹ năng có tầng: **"{tên kỹ năng}（N层）"** (嚎叫/利爪/兽王之怒/神兽庇佑/震耳咆哮) → "{tên} (tầng N)".
- Generator kỹ năng có cấp: **"{tên kỹ năng}lv/LvN"** (致命屠戮/万物回春/法宝加身) → "{tên} cấp N".
- Generator tiền tố cường luyện: **"{陷/绝/戮}·诛仙{bộ vị}"** (dùng lại 8 bộ vị 诛仙 đã dịch ở round 3) → "{Hãm/Tuyệt/Lục}·Tru Tiên {bộ vị}".
- Dịch tay thêm ~35 tên boss/NPC/bí cảnh.
- Gộp 396 mục vào `translation/glossary_config_names4.json`, `bad quotes: 0`. Áp dụng → **340 lượt thay thế**. `json.load()` hợp lệ.
- Kết quả field `"name"`: còn **2.056 tên riêng biệt** chưa dịch (giảm từ 2.396/2.279). Tổng ký tự Hán còn lại toàn file: **178.596**.

### 8.4.7. Round 5 dịch field "name" trong config.json (2026-07-03)

- Generator lớn cho **chuỗi tiến độ nhiệm vụ/thành tựu có số** (dùng bảng `RULES` gồm ~22 regex→template, ví dụ `"登陆达到(\d+)天"` → `"Đăng nhập đủ {0} ngày"`, `"境界达到筑基(\d+)层"` → `"Cảnh giới đạt Trúc Cơ tầng {0}"`, `"击杀(\d+)级个人BOSS(\d+)次"` → `"Tiêu diệt BOSS cá nhân cấp {0} {1} lần"`...) — thử từng rule theo thứ tự, dùng rule khớp đầu tiên.
- Bổ sung bản dịch "诛仙套装" (bộ, không phải bộ vị lẻ) + 3 biến thể cường luyện (陷/绝/戮·诛仙套装).
- Dịch tay thêm ~95 tên kỹ năng (遮天灵烬, 万剑归宗...) và quái/boss (九尾冥仙, 蓝湖灵妖...).
- Gộp 131 mục vào `translation/glossary_config_names5.json`, `bad quotes: 0`. Áp dụng → **131 lượt thay thế** (mỗi tên chỉ xuất hiện 1 lần — khác các round trước có tên lặp lại nhiều item). `json.load()` hợp lệ.
- Kết quả field `"name"`: còn **1.925 tên riêng biệt** chưa dịch. Tổng ký tự Hán còn lại toàn file: **178.028**.
- **Ghi chú tiến độ trung thực**: từ round 1→5, field "name" đã giảm từ 3.511 → 1.925 tên riêng biệt (~45% đã dịch), nhưng phần lớn ký tự Hán còn lại của `config.json` (178K/249K ban đầu) nằm ở field `"desc"` (mô tả dài) — **chưa đụng tới**. Đây là công việc rất lớn, cần tiếp tục nhiều round nữa hoặc ưu tiên lại theo mức độ người dùng nhìn thấy trong game.

**Tổng kết thực tế tại thời điểm này**: việc dịch game này có **6+ lớp nội dung tách biệt**, quy mô lớn hơn nhiều so với ước tính ban đầu ("Giai đoạn 5 và 6"):
1. exml UI (Giai đoạn 1-4) — ĐÃ XONG 100% (nhưng phải vá thủ công vào `default.thm_70915153.js` vì exml không được build lại)
2. `main.min_d7aad928.js` code logic — còn ~16.500 ký tự, RỦI RO CAO (có thể phá logic nếu dịch nhầm)
3. `data/language/zh-cn/*.txt` server (Giai đoạn 5) — còn ~14.682 chuỗi / 100 file
4. `data/config/language/lang/*.config` server (11.068 dòng) — CHƯA khảo sát
5. `resource/config/config.json` + `config1/*.json` client (Giai đoạn 6 mở rộng) — field "name" còn 1.925 tên riêng biệt / tổng file còn ~178K ký tự Hán (`desc` là phần lớn, chưa đụng tới)
6. `data/config/**/*.config` server (401 file, Giai đoạn 6 gốc) — CHƯA bắt đầu, có thể trùng lặp một phần với mục 4/5

### 8.4.7b. Dịch có hệ thống `main.min_d7aad928.js` + `default.thm_70915153.js` bằng phương pháp phân loại an toàn (2026-07-03)

Người dùng gửi 3 ảnh chụp màn hình cho thấy nhãn tab dưới cùng (角色/神罚/转生/仙羽/飞升), nhãn icon (法术/炼器/仙侣/历练/背包), và nhãn thuộc tính trong panel (战斗力/生命/攻击/物抗/法抗/强化属性) vẫn tiếng Trung, và nghi ngờ đúng: phần dịch `.txt` server không đụng tới phần này. Điều tra xác nhận `resource/exml/*.exml` **không được client load trực tiếp** (như đã ghi ở 8.4.1) — nhãn tab `name="角色"` chỉ tồn tại dưới dạng đã biên dịch trong `main.min_d7aad928.js`.

**Rủi ro cốt lõi**: chuỗi tiếng Trung trong `main.min_d7aad928.js` (code logic, không phải file skin thuần UI như `default.thm`) có thể đóng 3 vai trò khác nhau cho cùng 1 chuỗi y hệt:
1. Text hiển thị thuần túy (an toàn dịch)
2. Key trong enum TypeScript đã biên dịch, dạng `t[t["X"]=N]="X"` (an toàn dịch NẾU chỉ tra cứu 1 chiều số→chuỗi để hiển thị, như đã xác minh với `DressTypeName[t.pos]`)
3. Giá trị so sánh trạng thái, dạng `"X"==this.btn.label` (an toàn dịch NẾU thay thế **nhất quán toàn bộ file** — vì gán và so sánh dùng chung 1 literal)

**Phương pháp đã dùng** (script mới `translation/classify_js_strings.py`): trích mọi chuỗi có chữ Hán trong file bằng regex JS string literal, với MỖI chuỗi duy nhất quét toàn bộ các lần xuất hiện trong file để gắn cờ theo ngữ cảnh xung quanh (trước/sau 25 ký tự):
- Cờ RỦI RO nếu xuất hiện trong mẫu enum `[t[`, so sánh `==`/`===`, `case "X":`, hoặc bracket-key access
- Cờ AN TOÀN nếu xuất hiện sau `name=`/`text=`/`label=`/`showTips(`/nối chuỗi `+`
- Phân loại: SAFE (chỉ có cờ an toàn) / RISKY (chỉ có cờ rủi ro) / MIXED (có cả 2) / UNKNOWN (không cờ nào)

Đã xác minh thêm bằng tay: không có chuỗi tiếng Trung nào được dùng làm key tra cứu vào `GlobalConfig.*[...]` hay trong lệnh gọi `regNetMsg`/`send` (giao thức mạng) — loại trừ rủi ro nghiêm trọng nhất (đồng bộ với dữ liệu server/config.json chưa dịch).

**Kết quả `main.min_d7aad928.js`** (1980 chuỗi Hán duy nhất, 3356 lượt): SAFE 1354 / RISKY 23 / MIXED 12 / UNKNOWN 591. Dịch tay toàn bộ 1354 chuỗi SAFE (gộp tại `translation/glossary_js_main_safe.json`), áp bằng script mới `translation/apply_js_literal_glossary.py` (thay thế MỌI literal JS string khớp glossary, khác với `apply_js_safe_calls.py` cũ chỉ khớp trong 1 số hàm gọi cố định — **giữ cả 2 script vì dùng cho 2 phương pháp khác nhau, không ghi đè lẫn nhau**). Kết quả: **2419 lượt thay thế, 16.556 → 6.029 ký tự Hán còn lại** (giảm ~64%). `node -c` xác nhận cú pháp JS vẫn hợp lệ sau khi sửa.

**Kết quả `default.thm_70915153.js`**: phát hiện thêm 147 chuỗi SAFE chưa được các đợt exml/UI trước dịch tới (bao gồm chính xác `神罚`/`转生`/`仙羽`/`飞升`/`角色` — nhãn tab trong ảnh chụp màn hình!). Dịch và áp (`translation/glossary_js_thm_safe.json`) → **181 lượt thay thế, 888 → 184 ký tự Hán còn lại**. `node -c` hợp lệ.

**⚠️ Lỗi lặp lại nhiều lần trong phiên này**: khi gõ chuỗi glossary chứa `\n` (ký hiệu xuống dòng JS) trong Python heredoc, gõ nhầm 1 gạch chéo (`\n` → Python hiểu là ký tự xuống dòng thật) thay vì 2 gạch chéo (`\\n` → literal 2 ký tự đúng như JS cần). Đã viết script dò `apply_lang_glossary.py` báo lỗi tương tự trước đó cho file `.txt`, nay lặp lại y hệt với file `.js`. **Bài học tổng quát, áp dụng cho MỌI ngôn ngữ đích (Lua/JSON/JS)**: sau khi build glossary, luôn `json.load()` lại và kiểm tra `'\n' in k` (ký tự xuống dòng thật) — nếu có, đó luôn là dấu hiệu lỗi double-escape, không phải nội dung hợp lệ.

**CÒN LẠI, CHƯA ĐỤNG TỚI (rủi ro cao hơn, cần thời gian riêng)**:
- `main.min_d7aad928.js`: 626 chuỗi duy nhất (23 RISKY + 12 MIXED + 591 UNKNOWN) — trong đó MIXED bao gồm chính xác nhãn tab `角色`/`神罚`/`转生`/`仙羽`/`飞升` mà ảnh chụp màn hình cho thấy (dùng trong enum `DressTypeName` xác nhận an toàn, nhưng cũng dùng trong `e.name="角色"` và nối chuỗi động — cần dịch **nhất quán đồng thời cả 3 vị trí trong cùng 1 lần sửa** để không lệch pha).
- `resource/config/config.json` + `config1/*.json`: field `desc` hoàn toàn chưa đụng, field `name` còn 1.925 tên riêng biệt (xem 8.4.3-8.4.7) — nguồn còn lại lớn nhất (~178K ký tự Hán).
- `data/config/language/lang/*.config` (11.068 dòng) — chưa khảo sát.
- `data/config/**/*.config` (401 file) — chưa bắt đầu.

**⚠️ NHẮC LẠI QUAN TRỌNG (đã ghi ở 8.5 nhưng dễ quên)**: repo này là bản làm việc cục bộ, KHÔNG tự đồng bộ với server Windows thật đang chạy (71.31.97.241 trong ảnh chụp màn hình người dùng gửi). Sau khi dịch xong ở đây, phải **copy thủ công** `main.min_d7aad928.js` và `default.thm_70915153.js` (cùng mọi file `.txt`/`.json` khác đã sửa) sang đúng đường dẫn trên server thật rồi **restart service** mới thấy thay đổi — nếu không, ảnh chụp màn hình lần sau vẫn sẽ giống hệt ảnh cũ dù code trong repo đã đúng.

### 8.4.7c. Dịch tiếp 30 chuỗi MIXED/RISKY đã xác minh kỹ + xác nhận nhãn tab trong ảnh chụp đã sửa xong (2026-07-03)

Tiếp tục xử lý phần còn lại của `main.min_d7aad928.js` sau 8.4.7b. Với 35 chuỗi RISKY/MIXED còn lại, kiểm tra thủ công từng chuỗi bằng cách trích toàn bộ ngữ cảnh (50-70 ký tự trước/sau) của MỌI lần xuất hiện trong file:

- **30 chuỗi xác nhận AN TOÀN** (gộp `translation/glossary_js_mixed_verified.json`): mẫu `this.xxxBtn.label="X"` (gán) đi kèm `"X"==this.xxxBtn.label` (so sánh) trong cùng file — thay thế nhất quán cả 2 vị trí cùng lúc nên không lệch pha. Gồm nhãn nút trạng thái (挑战中/停止/升阶/装扮...), enum `DressTypeName` (角色→Nhân Vật, 武器→Vũ Khí — đã xác minh 8.4.7b chỉ tra cứu 1 chiều), và 1 chuỗi thêm phát hiện qua liên kết ternary (`扫 荡`→Càn Quét, dùng chung ternary với `挑 战`).
- **6 chuỗi CHỦ ĐỘNG BỎ QUA** vì rủi ro xác nhận thật: `神兽` (so sánh với `infoModel.name` — có thể là tên quái vật từ dữ liệu SERVER, không tìm thấy nơi gán trong file này), `跨服战场` (so sánh với `n.sceneName` — tên cảnh SERVER-gửi, đã xác nhận `scenename.txt` có bản dịch riêng "Chiến Trường Liên Server" nhưng không chắc server thật đã deploy bản đó, dịch nhầm 1 bên sẽ lệch), `使用`/`购买`/`充点小钱`/`骑乘` (chỉ tìm thấy dạng so sánh `"X"==label`, KHÔNG tìm thấy nơi gán label="X" ở bất kỳ đâu trong cả `main.min` lẫn `default.thm` — nghĩa là giá trị gán đến từ nguồn không xác định được, không đủ tin cậy để dịch).
- Áp bằng `apply_js_literal_glossary.py` → **74 lượt thay thế, 30/30 khớp**. `node -c` hợp lệ.
- **Xác nhận trực tiếp bằng cách dò lại đúng class `SkinRoleWin` trong `default.thm_70915153.js`** (nơi biên dịch `RoleWinSkin.exml`): cả 5 nhãn tab dưới cùng trong ảnh chụp màn hình người dùng gửi đều đã đúng: `t.name = "Nhân Vật"`, `"Thần Phạt"`, `"Chuyển Sinh"`, `"Tiên Vũ"`, `"Phi Thăng"` — **đây chính là bug gốc gây ra ảnh chụp màn hình, nay đã sửa xong**.
- **Xác nhận riêng phần nhãn icon dưới cùng và lưới icon** (法术/炼器/仙侣/历练/背包, 封神/灵宠/神御/仙纹/诛仙/幻化 trong ảnh thứ 3): tìm bằng chuỗi chính xác trong cả `main.min` và `default.thm` → **0 kết quả cả 2 file** — xác nhận đây là chữ vẽ sẵn trong bitmap icon (đúng như quy tắc dự án đã có: bỏ qua text nhúng trong ảnh bitmap, không thể sửa bằng chỉnh sửa text).
- Kết quả `main.min_d7aad928.js`: **6.029 → 5.831 ký tự Hán còn lại**. `default.thm_70915153.js` giữ nguyên **184** (không có chuỗi nào trong đợt này thuộc file đó).
- **Còn lại thật sự trong `main.min_d7aad928.js`**: ~591 chuỗi UNKNOWN (chưa phân tích ngữ cảnh) + 6 chuỗi RISKY chủ động bỏ qua ở trên — phần UNKNOWN cần thời gian đọc từng chuỗi để phân loại (không có cờ an toàn/rủi ro rõ ràng qua script tự động), độ ưu tiên thấp hơn `resource/config/config.json` vì tổng ký tự ít hơn nhiều (5.8K so với 178K).

### 8.4.7d. Round 1 dịch field "desc" trong `config.json` (2026-07-03)

Sau khi xác nhận bug ảnh chụp màn hình đã sửa xong (8.4.7c), tiếp tục theo yêu cầu người dùng "tiếp tục làm tiếp phần còn lại". Chọn field `desc` của `resource/config/config.json` vì đây là khối chữ Hán CHƯA đụng tới lớn nhất còn lại (4.273 lượt xuất hiện, 2.283 giá trị duy nhất, 102.550 ký tự Hán — lớn hơn hẳn các field khác như `context`/`bulletDesc`/`skillDesc`).

- **Phương pháp**: kết hợp generator theo mẫu (regex + backreference cho các nhóm ≥3 giá trị cùng khuôn dạng, chỉ khác số — vd bảng 495 dòng cho "khảm nhận thuộc tính kỹ năng" của 3 vũ khí × 3 nhân vật × 45 tên kỹ năng) với dịch tay cho mô tả rương/vật phẩm và 100 mô tả đứng độc lập tần suất cao nhất (nhãn cấp độ trang bị, văn án bùa lửa thần phạt, kích hoạt cung, chất lượng bộ phận rồng...). Tổng **1.023 giá trị duy nhất** được dịch trong đợt này.
- **Bug lặp lại lần nữa (giống các lần trước)**: sau khi gộp 2 batch generator + manual, phát hiện **564/1.023 key** chứa ký tự xuống dòng THẬT (0x0A) thay vì chuỗi `\n` 2 ký tự — vì nhiều giá trị `desc` là mô tả rương nhiều dòng. Khác với các file `.txt`/Lua, script áp dụng cho JSON (`apply_json_glossary_field.py`, viết mới, tổng quát hoá từ `apply_json_glossary.py` để nhận field bất kỳ thay vì chỉ `"name"`) khớp bằng regex trên **text thô** của file JSON, nên **key vẫn phải dùng `\n` 2 ký tự thô** như trong file (đã xác nhận bằng cách `grep` trực tiếp file thật, thấy `"desc":"...\\n..."` với `\n` 2 ký tự) — chỉ có **value** (đầu vào cho `json.dumps()` khi ghi ra) mới cần ký tự xuống dòng thật để `json.dumps` tự escape lại đúng chuẩn. Sửa bằng cách thay `\n`/`\t`/`\r\n` thật trong TỪNG KEY thành chuỗi thoát 2 ký tự tương ứng, giữ nguyên value — không có xung đột (collision) key sau khi sửa.
- Kiểm tra dấu ngoặc kép thẳng (`"`) trong toàn bộ 1.023 value: **0 vi phạm** (đúng quy tắc dùng ngoặc cong " ").
- Áp bằng `translation/apply_json_glossary_field.py desc <config.json> <glossary>` → **2.960/4.273 lượt thay thế khớp** (69%). `json.load()` xác nhận file vẫn hợp lệ sau khi ghi.
- Kết quả: tổng ký tự Hán còn lại trong `config.json` giảm **178.028 → 117.579** (giảm 60.449 ký tự, gần đúng bằng số ký tự Hán ước tính của phần `desc` đã dịch).
- File `config.json` chỉ có **1 bản duy nhất** trong repo (không có bản sao ở `resource/config1/` hay s99/s1) nên không cần bước đồng bộ.
- **Còn lại**: ~1.260 giá trị `desc` duy nhất chưa dịch (khoảng 1.313 lượt xuất hiện chưa khớp, phần đuôi dài tail ít lặp lại hơn) + các field lớn khác của `config.json` chưa đụng tới: `context` (11.115 ký tự), `bulletDesc` (11.000), `skillDesc` (9.818), `text` (6.393), `stageDesc` (3.232), `head` (3.146), `skillName` (1.952), `trainName` (1.802)...

### 8.4.7e. Round 2 dịch field "desc" trong `config.json` — phần đuôi dài (long tail), 2026-07-03

Sau round 1 (8.4.7d), phần `desc` còn lại chủ yếu là mô tả kỹ năng/nhiệm vụ **xuất hiện đúng 1 lần** (1.266 giá trị duy nhất / 1.313 lượt xuất hiện — tỉ lệ gần 1:1, khác hẳn phần trước vốn có nhiều giá trị lặp lại hàng trăm lần).

- Nhóm lại các giá trị theo mẫu chuẩn hoá (thay mọi số bằng `#`) để tìm cụm còn lặp lại ≥3 lần → 26 nhóm mẫu (ví dụ "Đạo Tâm Thông Minh" 20 biến thể theo %/giây, "Luân Hồi Kiếm Chú" 10 biến thể, thưởng BOSS theo dải chuyển sinh...), viết generator regex-with-backreference cho từng nhóm, dịch xong áp cho toàn bộ biến thể cùng lúc → **142 giá trị**.
- Dịch tay thêm 21 giá trị đứng độc lập tần suất cao còn lại (6 tên cung kích hoạt/đột phá, 15 mô tả hoạt động sự kiện) → gộp thành **163 giá trị** cho round này.
- Xác minh: 0 trùng lặp với round 1, 0 dấu ngoặc kép thẳng trong value, 0 key còn ký tự xuống dòng thật, và **đối chiếu từng key với text thô của file thật bằng `"desc":"<key>"` — 100% khớp (0 key thiếu)** trước khi áp, để tránh lặp lại bug escape đã gặp nhiều lần.
- Áp bằng `apply_json_glossary_field.py desc` → **210/210 lượt khớp** (163 giá trị × trung bình ~1.3 lượt lặp). `json.load()` xác nhận file vẫn hợp lệ.
- Kết quả: **117.579 → 113.840** ký tự Hán còn lại trong `config.json`.
- **Còn lại ~1.100 giá trị `desc` duy nhất**, gần như toàn bộ là mô tả kỹ năng nhân vật/BOSS/trang bị không lặp lại — sẽ cần dịch tay từng câu ở các round tiếp theo (không còn nhiều mẫu lặp để tận dụng generator).

### 8.4.7f. Dịch các field nhỏ nhưng có độ lặp cực cao trong `config.json`: `trainName`, `head`, `context`, `skillName`, `stageDesc` (2026-07-03)

Sau khi `desc` bước vào phần đuôi dài khó tận dụng generator (8.4.7e), rà soát các field lớn còn lại theo tỉ lệ (số giá trị duy nhất / số ký tự) để tìm đòn bẩy cao nhất tiếp theo — phát hiện 5 field có rất ít giá trị duy nhất nhưng chiếm hàng nghìn ký tự do lặp lại nhiều lần trong toàn bộ vật phẩm/thư mail:

- `trainName` (11 giá trị duy nhất / 901 lượt / 1.802 ký tự): tên cảnh giới tu luyện chuẩn tiên hiệp (练气→Luyện Khí, 筑基→Trúc Cơ, 金丹→Kim Đan, 元婴→Nguyên Anh, 化神→Hóa Thần, 大乘→Đại Thừa, 渡劫→Độ Kiếp, 飞仙→Phi Tiên, 金仙→Kim Tiên, 大罗→Đại La, 入门→Nhập Môn).
- `head` (22 giá trị duy nhất / 472 lượt / 3.146 ký tự): tiêu đề mail thông báo nhận thưởng theo sự kiện (nạp tích lũy, lễ hội...).
- `context` (22 giá trị duy nhất / 474 lượt / 11.115 ký tự — đòn bẩy cao nhất trong đợt này): nội dung mail thông báo tương ứng với `head`.
- `skillName` (56 giá trị duy nhất / 488 lượt / 1.952 ký tự): 8 tên kỹ năng linh năng chung + 48 tên kỹ năng riêng theo 3 vũ khí nhân vật (kiếm/tản/cầm — cùng bộ 3 nhân vật đã dịch ở round `desc` trước: Ngự Tiêu, Lạc Anh, Trường Ca), dịch theo phong cách Hán Việt nhất quán với tên kỹ năng đã dịch trước đó.
- `stageDesc` (101 giá trị duy nhất / 808 lượt / 3.232 ký tự): mẫu thuần túy "X阶Y星" (X, Y là số Hán từ 零-十) — viết generator ánh xạ số Hán sang số Ả Rập, sinh tự động cả 101 tổ hợp bằng 1 regex, dịch thành "Bậc N Sao M". Khớp **101/101**.
- Áp bằng `apply_json_glossary_field.py` chạy riêng cho từng field (dùng chung 1 file glossary 111 mục cho 4 field text + 1 file glossary riêng 101 mục cho `stageDesc`) → tổng **3.143 lượt thay thế khớp đúng số lượt kỳ vọng của từng field** (901+472+474+488+808). `json.load()` xác nhận file vẫn hợp lệ, 0 dấu ngoặc kép thẳng, 0 lỗi escape newline.
- Kết quả: tổng ký tự Hán còn lại trong `config.json` giảm **113.840 → 92.593** (giảm 21.247 ký tự chỉ từ 212 giá trị duy nhất — hiệu quả trên mỗi bản dịch cao hơn hẳn phần đuôi dài của `desc`).
- **Còn lại lớn nhất trong `config.json`**: `desc` phần đuôi dài (~1.100 giá trị duy nhất), `bulletDesc` (500 giá trị duy nhất/500 lượt — không có đòn bẩy lặp lại, cần dịch tay từng cái), `skillDesc` (433 giá trị duy nhất/475 lượt), `text` (39 giá trị duy nhất nhưng dài — hướng dẫn cơ chế game, ~6.393 ký tự).

### 8.4.7g. Dịch field `skillDesc` trong `config.json` bằng generator theo mẫu (2026-07-03)

`skillDesc` có 433 giá trị duy nhất / 475 lượt xuất hiện. Chuẩn hoá bằng cách thay số bằng `#` để nhóm mẫu → phát hiện 1 mẫu duy nhất "灵宠的灵力进一步加强，三角色...攻击/物抗/法抗/生命..." (buff Linh Thú 4 chỉ số) chiếm **357/433 giá trị (82%)**, cùng 10 mẫu nhỏ hơn (kỹ năng Linh Châu, Thiên Nhãn, Cấp Huyết Linh Thuật, Phản Thương Linh Thuật...). Một số mẫu ban đầu regex không khớp do 2 mã màu khác nhau cho cùng 1 câu văn bản (`0x00ff00` vs `0x18ff00`) — sửa regex theo đúng mã màu thật trong file sau khi in ra các giá trị "0 match" để so sánh trực tiếp.

- 11 generator → **432/433 giá trị duy nhất khớp** (99.8%, chỉ còn 1 giá trị lẻ không theo mẫu nào).
- Kiểm tra: 0 dấu ngoặc kép thẳng, 0 lỗi escape newline, đối chiếu 100% key với text thô của file thật trước khi áp.
- Áp bằng `apply_json_glossary_field.py skillDesc` → **474/475 lượt khớp**. `json.load()` xác nhận hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **92.593 → 82.796**.

### 8.4.7h. Dịch loạt field nhỏ có đòn bẩy cao: `gName`, `type`, `str`, `blessWord`, `lockDesc`, `skillname` (2026-07-03)

Quét lại toàn bộ file theo field để tìm field nào còn nhiều ký tự Hán nhưng ít giá trị duy nhất (đòn bẩy cao) — dịch 1 loạt field nhỏ cùng lúc:

- `gName` (20 giá trị / 393 lượt): tên nhóm hoạt động (Nhật Thường, Thiên Địa Yêu Trủng, BOSS Dã Ngoại...).
- `type` (15 giá trị / 134 lượt): danh xưng nhân vật (Thiên Binh, Minh Ty, Linh Tú... + các loại danh hiệu).
- `str` (8 giá trị / 35 lượt): câu mô tả chọn vật phẩm/kích hoạt chiến lực.
- `blessWord` (1 giá trị / 12 lượt): câu chúc mừng sự kiện.
- `lockDesc` (27 giá trị / 45 lượt): tooltip mở khoá kỹ năng nhân vật (Ngự Tiêu/Lạc Anh/Trường Ca) — dùng nhất quán các tên kỹ năng đã dịch ở field `skillName` trước đó (8.4.7f).
- `skillname` (chữ thường, field khác với `skillName` chữ hoa — 49 giá trị / 133 lượt): tên kỹ năng linh thú và các cấp độ buff (致命一击·N级, 焚天诀N层...).
- Xác minh trước khi áp: 0 dấu ngoặc kép thẳng, 0 lỗi escape newline, **0 key không khớp với bất kỳ field mục tiêu nào trong text thô của file thật**.
- Áp riêng từng field bằng `apply_json_glossary_field.py` → tổng **752 lượt thay thế**, đúng số lượt kỳ vọng từng field (393+134+35+12+45+133). `json.load()` xác nhận hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **82.796 → 78.886**.

### 8.4.7i. Dịch tiếp loạt field nhỏ: `help`, `acDesc`, `condition`, `describe`, `funName`, `chainDesc`, `abilityDesc`, `des`, `dec`, `funcDesc` (2026-07-03)

Tiếp tục quét field theo đòn bẩy (ít giá trị duy nhất, nhiều lượt lặp) — dịch 10 field cùng lúc:

- `help` (4, hướng dẫn Tiên Cung Tranh Bá — dài, dịch tay đầy đủ; **rút kinh nghiệm: lần đầu vô tình chỉ copy bản `repr(...)[:150]` bị cắt ngắn khi in ra terminal làm 3 key không khớp — phát hiện qua bước đối chiếu key với text thô, sửa lại bằng cách trích xuất lại full string qua `json.dumps` không giới hạn độ dài**).
- `acDesc` (15), `condition` (24), `describe` (15), `funName` (45): dịch tay toàn bộ, đều là văn bản mô tả/tiêu đề ngắn không lặp lại.
- `chainDesc` (32): mẫu `[tên trang bị Vô Cực]|C:...&T:mô tả thuộc tính N%|` — bảng ánh xạ 8 tên trang bị × 8 loại thuộc tính, generator ghép khớp **32/32**.
- `abilityDesc` (17): 1 mẫu lặp 10 lần ("tiêu hao Tiên Linh Hồn Thạch...tăng N%") + 7 giá trị đứng lẻ dịch tay.
- `des` (21), `dec` (19): mỗi field có 2-3 mẫu số học đơn giản ("rơi trang bị dưới chuyển sinh/cấp N", "Công Kích+N Vật Kháng+N...", "Long Nguyên各部位+N%"...) — generator phủ **100%** cả 2 field.
- `funcDesc` (28): toàn bộ là mô tả buff/kỹ năng đứng lẻ, dịch tay toàn bộ.
- Xác minh trước khi áp: 0 dấu ngoặc kép thẳng, 0 lỗi escape newline, đối chiếu 100% key với text thô — phát hiện và sửa lỗi cắt chuỗi ở `help` trước khi áp.
- Áp riêng từng field → tổng **234 lượt thay thế**, khớp đúng số lượt kỳ vọng từng field (4+25+24+15+45+32+17+24+20+28). `json.load()` xác nhận hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **78.886 → 75.786**.
- **Tổng tiến độ `config.json` trong phiên này**: từ **178.028 → 75.786** ký tự Hán còn lại (giảm 57%, qua 9 round dịch liên tiếp 8.4.7d→8.4.7i). Còn lại lớn nhất: `desc` phần đuôi dài (~1.100 giá trị duy nhất, ~38K ký tự), `bulletDesc` (500 giá trị duy nhất/500 lượt, 11K ký tự, không có đòn bẩy lặp — cần dịch tay), `name` (1.925 giá trị duy nhất còn lại từ round trước, ~9.4K ký tự), `text` (39 giá trị nhưng dài, ~6.4K ký tự — hướng dẫn cơ chế game).

### 8.4.7j. Dịch toàn bộ field `bulletDesc` bằng 1 generator duy nhất (2026-07-03)

`bulletDesc` có 500 giá trị duy nhất / 500 lượt (không lặp lại theo văn bản gốc, nhưng **toàn bộ 500 giá trị hoá ra cùng chung đúng 1 khuôn mẫu** khi chuẩn hoá số → `#`: "mỗi Linh Châu sẽ gây N% công kích lực Linh Châu + N sát thương (công kích lực Linh Châu: N)"). Viết 1 regex generator duy nhất, khớp và dịch **500/500 (100%)** trong một bước.

- Áp bằng `apply_json_glossary_field.py bulletDesc` → **500/500 lượt khớp**. `json.load()` xác nhận hợp lệ, 0 dấu ngoặc kép thẳng.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **75.786 → 64.786** (giảm 11.000 ký tự chỉ từ 1 generator).

### 8.4.7k. Round 6 dịch tiếp field "name" bằng generator (2026-07-03)

Quay lại field `name` (baseline từ round 1-5 phiên trước: 3.511 → 1.925 giá trị duy nhất chưa dịch, ~9.4K ký tự). Chuẩn hoá số → `#` tìm được **42 nhóm mẫu ≥3 thành viên, phủ 283 giá trị** — chủ yếu tên vật phẩm/rương/tinh thể rồng theo cấp/chuyển sinh/bậc (兵魂N, 通关第N关, 3 loại 龙晶N级×~8 mã màu, N转神装宝箱, 至尊金/银箱(N转), N阶官印/仙羽, N转宝箱...). Viết 27 generator riêng, khớp đúng **283/283**.

- Phát hiện phụ: một số giá trị `name` không phải tên vật phẩm mà là **nhãn NPC quái vật trong dữ liệu Tiên Cung** (id/atk/def/hp/level/avatar) mang định dạng như tên người chơi có tiền tố chức vụ, ví dụ `"|S:14&C:0x00FF00&T:仙宫[长老]|\n|C:0xffffff&T:一生风雪|"` — xác nhận qua ngữ cảnh xung quanh (record có đủ field thống kê quái vật) đây là NPC được thiết kế mang tên thơ mộng giả-người-chơi cho không khí Tiên Cung, không phải dữ liệu người chơi thật, nên **có thể dịch như tên quái vật/NPC thông thường** (chưa dịch trong đợt này, để dành đợt sau).
- Xác minh: 0 dấu ngoặc kép thẳng, 0 lỗi escape newline, đối chiếu 100% key với text thô.
- Áp bằng `apply_json_glossary_field.py name` → **283/283 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **64.786 → 63.544**.
- **Tổng tiến độ `config.json` cả phiên**: **178.028 → 63.544** ký tự Hán còn lại (giảm 64%, qua 10 round dịch 8.4.7d→8.4.7k).

### 8.4.7l. Phát hiện quan trọng: `resource/config1/config0-6.json` là bản sao CHƯA đồng bộ của `config.json` — đã đồng bộ (2026-07-03)

Trước khi dịch tiếp, kiểm tra `resource/config1/config0.json`...`config6.json` (7 file, ~11.4MB) xem có phải dữ liệu trùng với `config/config.json` hay không (việc còn treo từ đầu phiên). Kết quả:

- **Xác nhận bằng cách so sánh trực tiếp**: cả 7 file gộp lại có đúng 336 key top-level, **trùng khớp 100% với 336 key top-level của `config/config.json`** (0 key lệch) — đây là CÙNG một bộ dữ liệu, chỉ chia nhỏ ra 7 file (rất có thể để giảm kích thước từng request khi client tải).
- Vì các file `config1/*.json` **không được dịch cùng lúc** với `config/config.json` trong toàn bộ phiên làm việc này (chỉ chỉnh sửa `config/config.json`), nên đến giờ chúng vẫn giữ dữ liệu tiếng Trung gốc — đã xác nhận trực tiếp: item id `180160` trong `config/config.json` có `"name":"Thần Khí-Thiết Họa Ngân Câu"` (đã dịch) trong khi cùng id đó trong `config1/config0.json` vẫn là `"name":"神器-铁画银钩"` (chưa dịch).
- Viết `translation/sync_config1_from_config.py`: với mỗi file `config1/configN.json`, so từng key top-level với `config/config.json` (file gốc/chủ, đã dịch), nếu khác thì **ghi đè toàn bộ giá trị của key đó** từ file gốc sang — không cần áp lại từng glossary riêng lẻ cho từng chunk, an toàn hơn nhiều vì lấy nguyên khối dữ liệu đã dịch và đã qua `json.load()`.
- Kết quả: **73/336 tổng số lượt key thay đổi** trên cả 7 file (các key không đổi là do chưa dịch phần đó hoặc dữ liệu vốn không có tiếng Trung). Tổng ký tự Hán còn lại cộng dồn cả 7 file **= 63.544**, **khớp chính xác** với số ký tự Hán còn lại của `config/config.json` — xác nhận đồng bộ đúng và đầy đủ.
- `json.load()` xác nhận cả 7 file vẫn hợp lệ sau khi ghi.
- **Lưu ý cho các round dịch tiếp theo của `config.json`**: phải chạy lại `sync_config1_from_config.py` sau mỗi lần dịch thêm để giữ 2 nơi nhất quán (khác với việc đồng bộ s1/s99 vốn là 2 bộ dữ liệu server độc lập — ở đây `config1/*` chỉ là "bản chia nhỏ" của đúng 1 nguồn `config.json`, nên luôn đồng bộ 1 chiều từ `config.json` sang).

### 8.4.7m. Dịch tiếp loạt field nhỏ vòng 3 + đồng bộ config1 (2026-07-03)

Dịch tiếp `middleDesc`, `giftName`, `buttonDesc`, `record`, `finishwarning`, `tips`, `use`, `suitCondition`, `showLevel`, `showText`, `startwarning`, `monName` (12 field, tổng 159 giá trị duy nhất, hầu hết dịch tay + 2 generator nhỏ cho `showText`/`suitCondition`). `suitCondition` dùng lại đúng 9/10 tên bộ nguyên liệu Hán Việt đã thiết lập ở round `desc` (Lãng Đào/Phúc Hải/Đông Lai/Vạn Lý/Man Hoang/Huyết Hải/Đồ Lục/Công Đức/Minh Huỳnh), riêng "九霄" (khác "九天" đã dùng ở nơi khác) dịch độc lập thành "Cửu Tiêu" vì đây là chuỗi khác trong dữ liệu gốc.

- Xác minh: 0 dấu ngoặc kép thẳng, 0 lỗi escape newline, 100% key khớp text thô.
- Áp riêng từng field → **352 lượt thay thế**, đúng số lượt kỳ vọng. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **63.544 → 61.649**.
- Chạy lại `sync_config1_from_config.py` ngay sau đó để đồng bộ `config1/*.json` (15 lượt key cập nhật trên 4 file).

### 8.5. Lưu ý triển khai

- Vì `s1` và `s99` mỗi khu có **bản sao riêng** của `data/language` và `data/config` (không dùng chung), nên dịch xong 1 bên cần **đồng bộ/copy sang bên kia** (hoặc dịch song song cả 2) để 2 khu nhất quán.
- File repo này (Claude Code session) là **bản làm việc**, không tự động đồng bộ với máy chủ Windows thật đang chạy — sau khi dịch xong từng giai đoạn ở đây, cần copy file đã dịch sang đúng đường dẫn tương ứng trên máy chủ thật rồi restart service liên quan để áp dụng.
- Nên giữ 1 file glossary (bảng thuật ngữ) dùng chung xuyên suốt các giai đoạn để thuật ngữ game (tên hệ thống, đơn vị, chức danh...) nhất quán, tránh mỗi giai đoạn dịch một kiểu khác nhau.

### 8.4.7n. Dịch tiếp loạt field nhỏ vòng 4 + đồng bộ config1 (2026-07-03)

Dịch `explain`, `tabName`, `showName`, `headTxt`, `btn_name`, `suitTname`, `description`, `guideText` (8 field, 115 giá trị duy nhất):

- `showName` (20): tên cảnh giới Phi Thăng × giai đoạn (脱凡境/三山境/九霄境/飞升境/仙人境/大罗境 × 破妄/大乘) — dùng lại "Cửu Tiêu" đã thiết lập, thêm 4 cảnh giới mới (Thoát Phàm/Tam Sơn/Phi Thăng/Tiên Nhân/Đại La Cảnh) và giai đoạn Phá Vọng.
- `headTxt` (4), `btn_name` (23), `suitTname` (10): generator số học đơn giản, phủ gần hết.
- `description` (10): mô tả đặc quyền VIP nhiều dòng — viết bộ 14 quy tắc regex theo TỪNG DÒNG (tách bằng `\n`, dịch từng dòng rồi ghép lại) thay vì cố khớp cả khối, vì các dòng lặp lại xen kẽ không theo thứ tự cố định giữa 10 giá trị; **bắt lỗi khi rule đầu tiên dùng backreference tĩnh cho số La Mã Hán (一/二/三) mà quên đổi sang số Ả Rập** — phát hiện qua bước kiểm tra "còn ký tự Hán trong value đã dịch" (dò thấy `|C:...&T:一|` sót lại), sửa bằng hàm thay thế động thay vì template tĩnh.
- `guideText` (32): tooltip chiến thuật đánh BOSS Thiên Địa Yêu Trủng — dịch tay toàn bộ, dùng lại tên quái đã dịch ở round trước (Ma Tẫn Cự Linh, Bạch Vô Thường, Lan Lộ Tu Sĩ, Tam Thủ Diễm Báo).
- Áp riêng từng field → **157 lượt thay thế**, đúng số lượt kỳ vọng. `json.load()` hợp lệ, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót trong giá trị dịch.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **61.649 → 59.462**. Chạy lại `sync_config1_from_config.py` đồng bộ 4 file chunk.
- **Tổng tiến độ `config.json` cả phiên**: **178.028 → 59.462** ký tự Hán còn lại (giảm 67%).

### 8.4.7o. Dịch toàn bộ field `text` — 39 đoạn hướng dẫn cơ chế hệ thống dài (2026-07-03)

`text` chứa 39 giá trị duy nhất, mỗi giá trị là 1 đoạn hướng dẫn nhiều dòng giải thích cơ chế 1 hệ thống trong game (Chiến Trường Liên Server, Phi Thăng, Long Nguyên, Tiên Cung Tranh Bá, Vương Giả Tranh Bá, Đấu Trường loại trực tiếp 16/64 mạnh, Pháp Bảo, Uy Vọng, Đấu Giá, tìm kho báu Trang Bị/Tiên Văn/Tru Tiên, thông báo chào mừng server mới...) — không có mẫu lặp lại, phải dịch tay toàn bộ 39 đoạn (tổng 6.393 ký tự Hán), giữ nguyên định dạng `|C:mã màu&T:...|` và số thứ tự dòng.

- Dùng lại nhất quán các thuật ngữ đã thiết lập trước đó trong phiên (tên 6 cảnh giới Phi Thăng, tên bộ phận Long Nguyên, tên 4 tứ tượng Thanh Long/Bạch Hổ/Chu Tước/Huyền Vũ...).
- Bắt lỗi dấu ngoặc kép thẳng: câu `由"问心"开始...` dùng ngoặc kép thẳng bao quanh tên giai đoạn trong bản dịch nháp đầu — kiểm tra tự động phát hiện, sửa lại bằng ngoặc cong `" "` đúng quy tắc dự án.
- Đối chiếu 100% key với text thô, 0 giá trị dịch còn sót ký tự Hán.
- Áp bằng `apply_json_glossary_field.py text` → **40/40 lượt khớp** (39 giá trị, 1 giá trị xuất hiện 2 lần trong file). `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **59.462 → 53.069** (giảm 6.393 ký tự — khớp đúng dự tính). Đồng bộ `config1/config6.json` (1 lượt).
- **Tổng tiến độ `config.json` cả phiên**: **178.028 → 53.069** ký tự Hán còn lại (giảm 70%).

### 8.4.7p. Round 3 dịch `desc` — 166 giá trị ngắn còn lại (≤20 ký tự), 2026-07-03

Sau các round trước, toàn bộ `desc` còn lại là **1.103 giá trị duy nhất, mỗi giá trị chỉ xuất hiện đúng 1 lần** (không còn gì để tận dụng generator/lặp lại). Lọc ra 166 giá trị ngắn (≤20 ký tự — chủ yếu điều kiện nhiệm vụ/thành tựu ngắn như "参与王者争霸8次", tên chức vụ Thần Chức viên mãn, mô tả vật phẩm 1 dòng) để dịch tay trước vì hiệu suất cao (nhiều giá trị, ít công sức mỗi giá trị).

- Dịch tay toàn bộ 166 giá trị, đối chiếu 100% với text thô trước khi áp.
- Áp bằng `apply_json_glossary_field.py desc` → **166/166 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **53.069 → 51.667**. Đồng bộ config1 (10 lượt trên 5 file).
- **Còn lại ~937 giá trị `desc` dài hơn 20 ký tự**, chủ yếu mô tả kỹ năng nhân vật/BOSS chi tiết — cần tiếp tục dịch tay từng round.

### 8.4.7q. Round 4 dịch `desc` — 87 giá trị độ dài trung bình (21-45 ký tự), 2026-07-03

Tiếp tục phần đuôi dài của `desc`, dịch tay 87/204 giá trị trong khoảng 21-45 ký tự — gồm mô tả kỹ năng chiêu thức nhân vật (Ngự Tiêu/Lạc Anh/Trường Ca), mô tả vật phẩm (rương, mảnh, tinh phách), buff Long Nguyên, và mô tả lore quái vật (mèo cào, bọ sừng, rồng đen, Ốc Mã Giáo...). Bỏ qua 9 dòng chứa ghi chú nội bộ của dev không phù hợp dịch nguyên văn (dạng "...--装逼专用卡组，只能花钱得（此条5毛，括号内删除）") để xử lý riêng sau nếu cần.

- Đối chiếu 100% key với text thô, 0 ký tự Hán sót trong giá trị dịch, 0 dấu ngoặc kép thẳng.
- Áp bằng `apply_json_glossary_field.py desc` → **87/87 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **51.667 → 49.891**. Đồng bộ config1 (3 lượt).
- **Tổng tiến độ `config.json` cả phiên**: **178.028 → 49.891** ký tự Hán còn lại (giảm 72%).

### 8.4.7r. Dịch bảng tên thuộc tính (AttributeType label lookup) trong `main.min_d7aad928.js` — sửa lỗi hiển thị "生命/攻击/物抗/法抗" khắp mọi màn hình (2026-07-03)

Người dùng gửi 3 ảnh chụp màn hình mới (Tiên Vũ, Thuộc Tính trang bị, Chuyển Sinh) cho thấy nhãn chỉ số **"生命" (Sinh Lực), "攻击" (Công Kích), "物抗" (Vật Kháng), "法抗" (Pháp Kháng)** vẫn hiện tiếng Trung ở HẦU HẾT các màn hình thống kê nhân vật/trang bị — dù các field liên quan trong `config.json` đã dịch xong, các nhãn này KHÔNG đến từ `config.json` mà từ 1 bảng tra cứu riêng trong JS logic.

- Tìm ra nguồn gốc: hàm `function(t){var e="";switch(t){case AttributeType.atXXX:e="nhãn tiếng Trung";break;...}return e}` trong `main.min_d7aad928.js` — bảng tra cứu enum `AttributeType`→tên hiển thị, dùng ở MỌI nơi hiện thống kê (bảng nhân vật, tooltip trang bị, so sánh trước/sau khi nâng cấp...). Tìm được **69 cặp case→nhãn** (61 nhãn duy nhất do một số enum trùng nhãn, vd `atMaxHp`/`atAttack`/`atDef`/`atRes` xuất hiện 2 lần với 2 bộ nhãn khác nhau dùng ở 2 nơi khác nhau trong code, cộng thêm 1 biến thể "生       命" có khoảng trắng canh chỉnh dùng riêng).
- **Xác minh an toàn theo đúng phương pháp đã thiết lập** (8.4.7b): quét toàn bộ file tìm `=="nhãn"` (so sánh ngược) → 0 kết quả; tìm truy cập bracket-key `obj["nhãn"]` → 0 kết quả; tìm `case "nhãn":` (dùng làm key switch khác) → 0 kết quả; đối chiếu số lần xuất hiện của mỗi nhãn trong toàn file khớp CHÍNH XÁC với số lần xuất hiện trong bảng `case AttributeType...e="..."` → xác nhận không có nơi nào khác dùng lại đúng chuỗi này cho mục đích khác. Đây là bảng tra cứu 1 chiều thuần hiển thị, an toàn tuyệt đối để dịch.
- Áp bằng `apply_js_literal_glossary.py` → **70/70 lượt khớp, 61/61 glossary key khớp**. `node -c` hợp lệ.
- Tìm thêm 10 nhãn "Chiến Lực/Cấp của tôi:..." dùng trong màn so sánh bảng xếp hạng (`我的等级:`, `我的仙羽等阶:`, `我的图鉴战力:`...) — mỗi nhãn chỉ xuất hiện đúng 1 lần trong toàn file, 0 so sánh ngược → an toàn, dịch và áp tiếp **10/10 lượt khớp**.
- **Xác nhận riêng banner "战斗力:N"** (thanh ngang màu cam/đỏ hiện trong cả 3 ảnh chụp): tìm chuỗi `"战斗力"` trong CẢ HAI file JS đã biên dịch → **0 kết quả** (chỉ có "战力" xuất hiện trong 1 ngữ cảnh khác không liên quan — "我的图鉴战力:"). Vì banner có nền đồ hoạ nghệ thuật đặc trưng và text luôn cố định "战斗力:" + số động, kết luận đây là **chữ vẽ sẵn trong bitmap banner**, không thể sửa qua chỉnh sửa text — giữ nguyên theo đúng quy tắc bỏ qua bitmap của dự án.
- **Xác nhận lại nhãn dãy icon dưới cùng** (法术/炼器/仙侣/历练/背包, 封神/灵宠/神御/仙纹/诛仙/幻化, và cả nhãn tiêu đề tab 属性/转生 xuất hiện trong 3 ảnh chụp): tìm lại từng chuỗi trong CẢ HAI file JS → **0 kết quả tất cả** — xác nhận lại (giống kết luận 8.4.7c trước đó) đây đều là chữ vẽ sẵn trong bitmap icon/banner, không có trong text để sửa.
- Kết quả: `main.min_d7aad928.js` giảm **5.831 → 5.484** ký tự Hán còn lại.
- **Đây là fix có tác động hiển thị RẤT LỚN** dù số ký tự ít — nhãn "Sinh Lực/Công Kích/Vật Kháng/Pháp Kháng" xuất hiện lặp lại hàng chục lần trên gần như MỌI màn hình thống kê nhân vật, trang bị, kỹ năng trong game.

### 8.4.7s. Dịch tiếp bảng tên vị trí trang bị + tên 3 nhân vật gốc trong `main.min_d7aad928.js` (2026-07-03)

Tiếp tục rà soát sau 8.4.7r, phát hiện thêm 2 bảng tra cứu 1 chiều an toàn khác đang hiện tiếng Trung trên ảnh chụp màn hình (mục "Vị trí：护腿", "Nghề nghiệp：落樱"):

- **Bảng tên vị trí trang bị**: mảng `e.typeNumberToName=[...]` + 3 khối `switch(EquipPos...)`/`switch(HeirloomSlot...)` dùng chung 12 nhãn (头盔/衣服/手镯/护腕/护腿/戒指/鞋子/法令/灵佩/法链/仙束/天守) — dùng lại ĐÚNG các tên Hán Việt đã thiết lập nhất quán từ round `chainDesc`/`name` field trước đó trong `config.json` (Đầu Khôi, Y Phục, Thủ Trạc, Hộ Uyển, Hộ Thối, Giới Chỉ, Hài Tử, Pháp Lệnh, Linh Bội, Pháp Liên, Tiên Thúc, Thiên Thủ). Xác minh 0 so sánh ngược, 0 bracket-key, số lần xuất hiện mỗi nhãn trong toàn file khớp đúng số ngữ cảnh tìm được → áp **33/33 lượt khớp**.
- **Tên gốc 3 nhân vật** (`御霄`/`落樱`/`长歌`/`通用`) dùng trong nhiều mảng/object literal rải rác khắp file (danh sách AI, danh sách săn boss, màn hình đồ giám, tooltip kích hoạt...) — đây là chuỗi CÓ TÁC ĐỘNG HIỂN THỊ LỚN NHẤT trong cả 2 đợt vì xuất hiện ở rất nhiều màn hình khác nhau. Xác minh 0 so sánh ngược cho cả 4 chuỗi → áp **20/20 lượt khớp**, dùng tên đã thiết lập xuyên suốt phiên (Ngự Tiêu/Lạc Anh/Trường Ca/Thông Dụng).
- `node -c` hợp lệ sau cả 2 lần áp.
- Kết quả: `main.min_d7aad928.js` giảm tiếp **5.484 → 5.378** ký tự Hán còn lại (từ đầu 8.4.7r đến giờ: 5.831 → 5.378, giảm 453 ký tự qua 4 glossary nhỏ nhưng tác động hiển thị rất lớn vì đều là nhãn lặp lại khắp game).
- `default.thm_70915153.js` không có chuỗi nào trong các bảng này (giữ nguyên 184 ký tự Hán còn lại, không đổi).

### 8.4.7t. ⚠️ PHÁT HIỆN BUG NGHIÊM TRỌNG: script `apply_js_literal_glossary.py` bị "desync" trên file `main.min` lớn, âm thầm bỏ sót hàng chục chuỗi đã coi là "đã dịch" — sửa toàn bộ (2026-07-03)

Người dùng gửi thêm 2 ảnh chụp màn hình (màn hình chính, màn Pháp Thuật) cho thấy 1 hộp thoại quan trọng "网络已断开，点击确定重新连接" (mạng đã ngắt, bấm xác nhận để kết nối lại) và 1 vài mô tả kỹ năng vẫn hiện tiếng Trung dù đã claim dịch xong nhiều đợt trước.

- Tìm nguồn `WarnView.show("网络已断开...")` — khớp đúng mẫu **đã xác nhận an toàn từ đầu phiên** (`WarnView.show(`). Quét rộng hơn toàn bộ các cuộc gọi `WarnView.show(`/`.showTips(`/`.setBtnLabel(` còn tiếng Trung → tìm được **63 chuỗi mới** (thông báo lỗi, xác nhận thoát, tooltip...).
- **Khi áp bằng `apply_js_literal_glossary.py` (script dùng suốt phiên), chỉ 23/68 khớp** — bất thường vì các lần áp trước luôn khớp 100%. Điều tra: `content.count('"元宝不足"')` tìm thấy **5 lần xuất hiện thật** trong file, nhưng `pat.finditer(toàn bộ nội dung file)` bằng đúng regex của script lại tìm thấy **0 lần** — trong khi cũng regex đó chạy trên 1 đoạn nhỏ trích ra từ đúng vị trí đó thì lại khớp bình thường.
- **Kết luận: regex quét chuỗi bị "desync" (lệch pha) ở đâu đó SỚM HƠN trong file `main.min` dài 3,8MB dạng 1 dòng duy nhất** (nhiều khả năng do 1 literal regex JS `/.../ ` chứa dấu ngoặc kép không escape mà regex quét chuỗi hiểu nhầm là mở 1 chuỗi mới), khiến việc nhận diện ranh giới chuỗi bị sai lệch từ điểm đó trở đi — dẫn tới bỏ sót các chuỗi ở SAU điểm desync dù chúng khớp hoàn hảo khi xét độc lập.
- **Hệ quả nghiêm trọng**: bug này có khả năng đã ảnh hưởng ÂM THẦM đến MỌI lần chạy `apply_js_literal_glossary.py` trên `main.min` xuyên suốt phiên làm việc (kể cả các đợt trước tuyên bố "khớp 100%" — vì báo cáo tổng khớp/tổng glossary khớp đúng KHÔNG chứng minh từng key riêng lẻ đã khớp, chỉ chứng minh SỐ LƯỢNG khớp bằng số lượng key, có thể trùng hợp).
- **Quét lại toàn bộ TẤT CẢ glossary JS đã tạo trong suốt phiên** (không chỉ đợt này) đối chiếu bằng `content.count()` (an toàn, không qua regex) → phát hiện thêm:
  - 27 key từ `glossary_js_main_safe.json` (glossary 1354 mục từ đầu phiên) chưa từng được áp thật (dù báo cáo "khớp 100%" trước đó) — gồm hậu tố đơn vị hiển thị số (级/转/秒/阶/次/星/个/剩余...) và vài câu thông báo.
  - 3 key từ `glossary_js_mixed_verified.json` (领取/激 活/升 级).
  - 3 key từ `glossary_js_charnames.json` (chính 御霄/落樱/长歌 — tên 3 nhân vật!).
  - 46/68 key từ đợt 63 chuỗi mới trong đợt này.
- **Sửa bằng str.replace ranh giới ngoặc kép chính xác** (`content.replace('"key"', '"value"')`) thay vì regex quét toàn file — an toàn tuyệt đối vì chỉ khớp đúng chuỗi có dấu ngoặc kép ngay trước/sau, không có vấn đề desync. Áp lại toàn bộ các key bị bỏ sót.
- **Phát hiện phụ khi rà lại `glossary_js_thm_safe.json` trên `main.min`** (glossary này vốn dành cho `default.thm`, nhưng 16 chuỗi trùng cũng tồn tại trong `main.min`): kiểm tra riêng từng chuỗi trước khi áp, phát hiện `跨服战场` **CHÍNH LÀ 1 trong 6 chuỗi đã chủ động bỏ qua từ mục 8.4.7c** vì có so sánh `"跨服战场"==n.sceneName` (tên cảnh do SERVER gửi) — **loại trừ đúng, không áp**; 15 chuỗi còn lại (装备/仙纹/圣物合成/神装/仙盟/全服/天地妖冢/妖帝天宫/成员/修法静室/好 友/帮 派/飞升/2 câu thông báo dài) xác minh an toàn, áp bình thường.
- Tiện thể dịch thêm 1 bảng lỗi mã số `errorCode={...}` (21 mã lỗi liên quan chức năng đổi túi quà/mã kích hoạt) và 6 chức danh Tiên Minh còn thiếu (精英→Tinh Anh, 堂主→Đường Chủ, 护法→Hộ Pháp, 长老→Trưởng Lão, 副盟主→Phó Minh Chủ, 盟主→Minh Chủ) tìm thấy trong cùng khu vực code.
- **Đã sửa `translation/apply_js_literal_glossary.py`**: thêm bước fallback tự động sau lần quét regex — với các key regex báo "không khớp", tự động thử lại bằng `str.replace` ranh giới ngoặc kép chính xác. Từ nay script tự bảo vệ khỏi bug desync mà không cần nhớ chạy fallback thủ công.
- **Xác minh cuối cùng**: quét lại TOÀN BỘ 8 file glossary JS từng tạo trong phiên đối chiếu bằng `content.count()` trên cả `main.min` và `default.thm` → chỉ còn đúng 1 kết quả sót lại là `跨服战场` (2 lần, cố ý không dịch). `node -c` hợp lệ.
- Kết quả tổng: `main.min_d7aad928.js` giảm từ **5.831 → 4.194** ký tự Hán còn lại (giảm 1.637 ký tự chỉ trong lượt kiểm tra/sửa bug này — phần lớn là do các đợt TRƯỚC ĐÓ trong phiên thực ra chưa áp hết như tưởng).
- **Bài học quan trọng cho các lần sửa JS minified lớn sau này**: KHÔNG được chỉ tin vào con số "X/Y khớp" do script tự báo cáo khi X == Y trùng khớp số lượng — phải xác minh bằng `content.count('"key"')` (str thuần, không qua regex) SAU khi áp để chắc chắn 0 chuỗi Trung còn sót, đặc biệt với file > 1MB dạng minified 1 dòng.

### 8.4.7u. Dịch 7 mô tả kỹ năng chính (active skill) còn sót của Lạc Anh/Trường Ca (2026-07-03)

Ảnh chụp màn hình "法术" (Pháp Thuật) của người dùng cho thấy 2 kỹ năng chính của Lạc Anh (Tản Trung Bí Kiếm, Tứ Phương Linh Động) vẫn hiện mô tả tiếng Trung dù các kỹ năng khác cùng dạng đã dịch. Tìm bằng cách lọc tất cả giá trị `desc` còn sót chứa mã màu `0x00842C` (mã màu riêng cho mô tả 5 kỹ năng chính trang bị của mỗi nhân vật — rất nhiều người chơi nhìn thấy vì luôn hiện ở màn hình kỹ năng chính) → tìm được đúng 7 giá trị còn sót (7/15 tổng kỹ năng chính 3 nhân vật, 8/15 đã dịch từ round trước đó trùng mã màu này).

- Dịch tay toàn bộ 7 giá trị, đối chiếu 100% key với text thô trước khi áp.
- Áp bằng `apply_json_glossary_field.py desc` → **7/7 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **49.891 → 49.736**. Đồng bộ config1 (1 lượt).

### 8.4.7v. Dịch nốt bảng `NAME_CURRENCY` (tên loại tiền tệ/tài nguyên) trong `main.min` (2026-07-03)

Tìm thấy bảng `t.NAME_CURRENCY={0:"经验",1:"Đồng Tiền",2:"Nguyên Bảo",...}` — đã dịch sẵn 1 vài mục từ trước nhưng còn sót 13 mục (经验/声望/仙盟贡献/仙盟资金/功勋/成就/仙纹精髓/仙纹碎片/烈火之珠/神火宝珠/神兵经验/筹码/兽元) khi rà soát tiếp theo hướng "经验" (kinh nghiệm) xuất hiện trong ảnh chụp màn hình dạng text nổi lúc nâng cấp kỹ năng. Dùng lại đúng thuật ngữ đã thiết lập xuyên suốt phiên cho các mục trùng tên hệ thống khác (Mảnh Tiên Văn, Thú Nguyên, Công Huân...); riêng `声望` dịch thành "Danh Vọng" để phân biệt với `威望`="Uy Vọng" đã dùng ở nơi khác (2 khái niệm khác nhau trong game dù cùng nghĩa gốc).

- Xác minh 0 so sánh ngược, 0 bracket-key cho cả 15 mục.
- Áp bằng str.replace ranh giới ngoặc kép chính xác (theo đúng bài học từ 8.4.7t) → **23/23 lượt khớp, 15/15 khớp key**. `node -c` hợp lệ.
- Kết quả: `main.min_d7aad928.js` giảm **4.194 → 4.130** ký tự Hán còn lại.
- **Tổng tiến độ `main.min_d7aad928.js` cả phiên**: **5.831 → 4.130** ký tự Hán còn lại (giảm 29%, riêng trong đợt rà soát theo ảnh chụp màn hình lần 2 này).

### 8.4.7w. Bắt đầu quy tắc "dịch ngắn gọn cho vùng UI chật" — sửa 2 nhãn nút bị tràn chữ (2026-07-03)

Theo yêu cầu người dùng: vì tiếng Việt luôn DÀI HƠN tiếng Trung (tiếng Trung 1 chữ = nhiều nghĩa, tiếng Việt cần nhiều từ hơn), một số bản dịch trước đây quá dài so với ô chữ cố định (button/tab) gây tràn/lệch UI (vd nút hiện "Đã đạt cấp tối đa" bị ngắt 2 dòng chật trong ảnh chụp trước đó).

- **Giới hạn khả năng thực tế**: đây là bundle JS đã biên dịch từ EXML, vị trí/kích thước hầu hết là số cố định gắn với từng skin — chỉnh sửa layout thật (đổi width/x/y/fontSize) rủi ro cao và **không thể kiểm chứng bằng mắt** vì code trong repo này chưa deploy lên server thật (71.31.97.241 chỉ phản ánh bản ĐÃ deploy trước đó, không phản ánh thay đổi mới). Vì vậy hướng tiếp cận thực tế nhất là: **ưu tiên dịch ngắn gọn ngay từ đầu cho các nhãn nút/tab/label không gian chật**, và sửa từng trường hợp cụ thể người dùng chụp màn hình chỉ ra.
- Quét toàn bộ glossary JS đã áp cho `main.min`/`default.thm`, lọc các cặp gốc-Hán ≤4 ký tự nhưng bản dịch ≥12 ký tự (khả năng cao dùng trong nút/tab hẹp) → xác nhận 2 trường hợp thực sự có vấn đề (không tính các tên riêng/tên quái/tên hoạt động vì các trường đó hiển thị ở vùng text linh hoạt, không phải nút cố định):
  - `已满级`/`已达到最大等级` (nút trạng thái "đã đạt cấp tối đa" của kỹ năng — chính là nút bị tràn 2 dòng trong ảnh chụp trước) : "Đã đạt cấp tối đa" (17-18 ký tự) → rút gọn còn **"Tối Đa"** (6 ký tự).
  - `申请` (nút xin gia nhập bang hội): "Xin gia nhập" (12 ký tự) → rút gọn còn **"Gia Nhập"** (8 ký tự).
- Áp bằng str.replace ranh giới ngoặc kép trên cả 2 file → **33/33 lượt khớp** (14 trong main.min, 19 trong default.thm). `node -c` hợp lệ cả 2 file. Đồng bộ luôn 2 glossary nguồn (`glossary_js_main_safe.json`, `glossary_js_thm_safe.json`) để nhất quán cho các lần đối chiếu sau.
- **Quy tắc áp dụng từ nay cho các bản dịch MỚI**: với nhãn nút/tab/label ngắn (nguyên gốc Hán ≤4 ký tự, ngữ cảnh rõ ràng là UI chật — nút hành động, trạng thái, tab), ưu tiên phương án tiếng Việt ngắn nhất còn giữ được nghĩa rõ ràng (2 từ trở xuống nếu được), thay vì dịch đầy đủ/trang trọng. Với mô tả/flavor text dài (skill desc, lore, hướng dẫn hệ thống) thì không cần rút gọn vì các vùng đó vốn đã linh hoạt độ dài.
- **Vẫn cần người dùng tiếp tục chụp màn hình các chỗ cụ thể bị tràn/lệch** vì không có cách nào tôi tự kiểm chứng bằng mắt khi chưa deploy — đây là kênh phản hồi hiệu quả nhất hiện có.

### 8.4.7x. Round 5 dịch `desc` — 79 giá trị 46-70 ký tự (generator + lore quái vật) (2026-07-03)

Tiếp tục phần đuôi dài `desc`, xử lý 79/107 giá trị trong khoảng 46-70 ký tự:

- 9 generator template (30 giá trị): thẻ đồ giám theo bộ+màu (佳人如画/盛世奇观/修仙圣地 × 5 màu), thưởng theo bậc Vương Giả Tranh Bá, hộp chọn trang bị Thoát Phàm/Tam Sơn × Tiên Thúc/Pháp Liên, đá Uy Năng theo cấp, vật phẩm tăng Tu Vi Chuyển Sinh/Kiếp Lực, mô tả BOSS phong ấn theo dải cấp.
- 49 giá trị dịch tay: kỹ năng phụ trợ nhân vật, mô tả rương/vật phẩm, và đặc biệt **lore quái vật cổ điển Thần Ma (Sa Tăng, Rắn Độc, Nhện Ảo Ảnh, Tổ Mã Giáo, Ốc Mã Giáo, Xích Nguyệt Ác Ma...)** — văn phong tường thuật dài, giữ đúng sắc thái kể chuyện gốc.
- **Rút kinh nghiệm ngay từ round này**: generator dùng dấu ngoặc kép thẳng `"` để mô phỏng dấu ngoặc kép Trung trong tên bộ đồ giám (`"佳人如画"`) — kiểm tra bắt được 12 lỗi, sửa bằng hàm tự động đổi cặp ngoặc thẳng thành ngoặc cong " " theo đúng thứ tự mở/đóng.
- Đối chiếu 100% key với text thô, 0 ký tự Hán sót trong giá trị dịch.
- Áp bằng `apply_json_glossary_field.py desc` → **79/79 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **49.736 → 47.233**. Đồng bộ config1 (3 lượt).

### 8.4.7y. Round 6 dịch `desc` — nốt phần 46-70 ký tự (2026-07-03)

Dịch hết 28 giá trị `desc` còn lại trong khoảng 46-70 ký tự: 4 generator hộp chọn trang bị Thiên Thủ/Linh Bội, 3 generator thẻ đồ giám "Tam Giới Tuyệt Sắc", 3 generator mẫu tìm kho báu (Trang Bị/Tiên Văn/Tru Tiên), 18 giá trị dịch tay (thưởng sự kiện Lạp Bát Tiết/Tết Dương Lịch, mô tả vật phẩm Thần Binh Tháp/Thánh Vực, Phá Nguyệt Tiên Cung...).

- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **28/28 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **47.233 → 46.404**. Đồng bộ config1 (2 lượt).
- **Tổng tiến độ `config.json` cả phiên**: **178.028 → 46.404** ký tự Hán còn lại (giảm 74%). Còn lại trong `desc`: 736 giá trị duy nhất, hầu hết >70 ký tự (mô tả kỹ năng/lore dài).

### 8.4.7z. Round 7 dịch `desc` — toàn bộ 61 thẻ ngoại hình/danh hiệu ("战力：..." template), 2026-07-03

Dịch hết nhóm 61 giá trị `desc` bắt đầu bằng `|S:27&T:战力：|` — thẻ vật phẩm kích hoạt ngoại hình/trang phục nhân vật và thẻ danh hiệu xếp hạng, tất cả cùng khung "Chiến Lực：N + nguồn nhận + tên hiệu ứng":

- 21 giá trị qua 3 generator con (nguồn hoạt động đơn giản, biến thể dấu `！`/`!`).
- 14 giá trị qua 2 generator riêng cho **bảng xếp hạng mở server** (vĩnh viễn) và **mùa giải đỉnh phong liên server** (14 ngày) — ánh xạ đúng tên 7 bảng xếp hạng mở server + 7 mốc xếp hạng liên server (Top 4/8/16/32/64, Á Quân, Vô Địch) sang tên danh hiệu tiếng Việt tương ứng.
- 26 giá trị dịch tay (nguồn nhận đa dạng: sự kiện Giáng Sinh, nạp tích lũy N ngày, Ma Giới Xâm Lược, Tiên Cung Tranh Bá, VIP5, đỉnh phong liên server theo hạng...).
- **Phát hiện lỗi ngay sau khi áp generator**: 21/61 giá trị vẫn còn sót tên ngoại hình bằng tiếng Trung — vì generator chỉ dịch phần khung câu, KHÔNG dịch phần tên riêng chèn vào (capture group `name` được chèn thẳng không qua tra cứu). Sửa bằng cách trích xuất 21 tên ngoại hình còn sót (梦幻金装, 龙翔九天, 时空刺客...), dịch bổ sung, rồi thay thế lại trong toàn bộ giá trị đã dịch trước khi áp — **bài học: khi build generator có capture-group chèn thẳng text gốc (không qua template cố định), luôn phải kiểm tra lại "còn ký tự Hán trong value" SAU KHI gộp, không chỉ kiểm tra khớp key với file gốc**.
- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót (sau khi sửa).
- Áp bằng `apply_json_glossary_field.py desc` → **61/61 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **46.404 → 44.488**. Đồng bộ config1 (1 lượt).
- **Tổng tiến độ `config.json` cả phiên**: **178.028 → 44.488** ký tự Hán còn lại (giảm 75%).

### 8.4.7za. Round 8 dịch `desc` — thẻ dev-placeholder + thẻ Vô Cực + 31 giá trị lẻ (2026-07-03)

Dịch 60 giá trị `desc` ngắn còn sót (≤70 ký tự):

- 21 "thẻ khoe hàng" nội bộ dev (`"...--装逼专用卡组，只能花钱得（此条5毛，括号内删除）"`) — dịch NGUYÊN VĂN kể cả ghi chú nội bộ (không xoá/sửa nội dung placeholder, chỉ dịch đúng nghĩa gốc kể cả phần "chỉ có thể mua bằng tiền thật, dòng này 5 hào, xoá phần trong ngoặc") vì đây là dữ liệu thật trong file, không phải quyết định thiết kế của mình.
- 8 thẻ kích hoạt trang bị Vô Cực (神剑/头盔/神甲/手镯/护腕/戒指/护腿/鞋子) — dùng lại tên đã thiết lập.
- 31 giá trị dịch tay: vật phẩm rương/kinh nghiệm, đá luyện trận, ngọc điệp chí thánh, thẻ chuyển sinh...
- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **60/60 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **44.488 → 43.158**. Đồng bộ config1 (1 lượt).
- **Tổng tiến độ `config.json` cả phiên**: **178.028 → 43.158** ký tự Hán còn lại (giảm 76%).

### 8.4.7zb. Round 9 dịch `desc` — 50 giá trị 70-110 ký tự (2026-07-03)

Dịch 50/69 giá trị `desc` trong khoảng 70-110 ký tự: 2 generator (hộp ma thuật theo số mảnh Chủ Tể tăng dần, thưởng theo mốc điểm Tiên Cung Tranh Bá) phủ 9 giá trị; 41 giá trị dịch tay (thánh hồn kích hoạt Thần Binh, tiên văn tuỳ chọn, thẻ đồ giám kim trang, rương Phá Nguyệt Tiên Cung, lore quái Kiềm Trùng...). Bắt lỗi nhỏ tự sửa: sót ký tự "卡" (thẻ) chưa dịch trong 2 câu tên vật phẩm ghép — sửa thành "Thẻ" trước khi áp.

- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **50/50 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **43.158 → 41.254**. Đồng bộ config1 (2 lượt).
- **Tổng tiến độ `config.json` cả phiên**: **178.028 → 41.254** ký tự Hán còn lại (giảm 77%). Còn lại `desc`: ~565 giá trị duy nhất, độ dài trung vị ~230 ký tự (mô tả kỹ năng/lore dài, phần khó nhất còn lại).

### 8.4.7zc. Sửa layout thật đầu tiên: nhãn "Lv.N" đè lên tên kỹ năng trong `SkillItem.exml` (default.thm), 2026-07-03

Người dùng chụp ảnh màn hình Pháp Thuật (法术) cho thấy tên kỹ năng (vd "Nghê Phi Tản Vũ") đè chồng lên chữ "Lv.200" ngay cạnh — do tên tiếng Việt dài hơn hẳn tên gốc 2-4 chữ Hán. Đây là lần đầu trong phiên **xác định chính xác được component gây lỗi** (khác các lần trước không lần ra được) và sửa trực tiếp layout (không chỉ dịch chữ):

- **Cách lần ra**: từ `e.skillName.text=s.name+""` và `e.lv.text="Lv."+s.lv` trong `main.min_d7aad928.js` xác nhận đây là 2 Label RIÊNG BIỆT (không phải 1 chuỗi nối). Tìm cặp `_proto.skillName_i`/`_proto.lv_i` gần nhau (trong khoảng 3000 ký tự) trong `default.thm_70915153.js` — chỉ có đúng 1 cặp khớp trong số 10 `skillName_i` × 20 `lv_i` có trong file. Xác nhận class chứa bằng cách tìm `generateEUI.paths['resource/exml/SkillItem.exml']` gần nhất (khác `window.SkinXXX = (function` — quy ước đặt tên class không nhất quán 100% qua các skin nên phải thử nhiều mẫu tìm kiếm).
- **Cấu trúc hàng danh sách `SkillItem`** (width tổng 582px): `icon` (x=25,w=69) → `skillName` (x=115, không giới hạn width, canh trái) → `lv` (x=259 CŨ, đây là nguồn gây đè) → `skillDesc` (x=108,y=47, dòng dưới) → `costAll`/`grewUpAllBtn` (x=454-483, nút "Tối Đa"/"Nâng cấp").
- **Sửa**: `lv.x` từ `259` → `400` (dời phải 141px, dùng khoảng trống thật giữa vùng tên kỹ năng và vùng nút/giá ở x=454+ mà không đụng gì khác); đồng thời thêm `skillName.width = 275` làm giới hạn an toàn phụ (khoảng cách 115→390, đủ chứa tên dài nhất hiện tại "Tứ Phương Linh Động" ước tính ~250px ở cỡ chữ 22).
- Xác nhận bằng cách trích in lại đúng 2 hàm sau khi sửa — khớp giá trị mong muốn. `node -c` hợp lệ.
- **Cập nhật sau khi người dùng deploy và test thật (2026-07-03)**: `lv.x=400` hết đè lên tên nhưng lại đè sang icon đồng tiền/giá nâng cấp (`costAll`, cùng hàng y≈15) bên phải — thử `lv.x=355` + `skillName.width=230`, nhưng người dùng phản hồi **không cần giới hạn width cho tên, chỉ cần dời `lv.x` về 360 là đã ổn**. Chốt cấu hình cuối: bỏ hẳn `skillName.width` (quay lại tự động co giãn theo nội dung như bản gốc), chỉ giữ `lv.x = 360`. Đây là quy trình lặp thực tế do không thể xem trực tiếp UI đã deploy: sửa → người dùng deploy+chụp ảnh → tinh chỉnh tiếp theo phản hồi — đã lặp 3 lần (259 gốc → 400 → 355+width230 → 360 không width) để ra vị trí người dùng xác nhận ổn.
- **Đây là khuôn mẫu để xử lý các trường hợp đè chữ khác sau này**: (1) tìm 2 property Label riêng trong `main.min` set qua `.text=`, (2) tìm skin class chứa cặp đó trong `default.thm` qua tên hàm `_proto.<tên>_i` gần nhau, (3) xác nhận đúng class qua `generateEUI.paths['resource/exml/...']`, (4) đối chiếu toàn bộ layout hàng đó để biết khoảng trống thật sự an toàn trước khi dời x.

### 8.4.7zd. Round 10 dịch `desc` — 19 giá trị 70-110 ký tự + thống kê toàn dự án (2026-07-03)

Dịch 19 giá trị `desc` còn lại trong khoảng 70-110 ký tự (5 qua generator cho bộ "大寂灭道首/上/中/下/终篇", 14 dịch tay: hộp quà Lạp Bát Tiết, kỹ năng Linh Châu, thánh hồn Thần Binh, mở khóa kỹ năng theo bậc...).

- Áp bằng `apply_json_glossary_field.py desc` → **19/19 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **41.254 → 40.643**. Đồng bộ config1 (2 lượt).

**Thống kê toàn dự án theo yêu cầu người dùng (2026-07-03)** — tổng ký tự Hán còn lại theo từng khu vực (tính trên `s1`, đồng bộ sang `s99` sau khi dịch xong):
- `config.json` (client): 40.643 (`desc` còn ~546 giá trị, `name` còn ~1.642 giá trị)
- `main.min_d7aad928.js` (client logic): 4.130
- `default.thm_70915153.js` (client skin): 184
- `data/language/zh-cn/*.txt` (server, Phase 5, 111 file): ~220.883 trong 54/111 file — 5 file khổng lồ chưa đụng: talk.txt, item.txt, skill.txt, scripttips.txt, quest.txt (~177K, chiếm 80% phần còn lại)
- `data/config/**/*.config` (server, Phase 6, 422 file, không tính language/lang): ~259.072 trong 385 file — **chưa bắt đầu**. Xác nhận đây là nguồn màn "竞技" (Đấu Trường) người dùng chụp ảnh (file `teamfuben.config` chứa đúng chuỗi mô tả cảnh "碧海仙境摇摇欲坠..." nhìn thấy trong ảnh)
- `data/config/language/lang/*.config` (server, hệ thống dịch động thứ 2, 16 file): ~135.748 — **chưa bắt đầu**
- **TỔNG toàn dự án còn lại: ~661.000 ký tự Hán**

### 8.4.7ze. Round 11 dịch `desc` — 15 giá trị 70-130 ký tự (2026-07-03)

Dịch tay 15 giá trị `desc`: hộp chọn thưởng Kim Tước Tiên Cung/trang bị Linh Thú (3 màu)/thiên thư Hạo Khí Chân Giải, thưởng BOSS Tiên Minh theo % máu, đá Vô Cực chí bảo, thưởng top 5 Tiên Cung Tranh Bá (3 hạng), vật phẩm Uy Vọng/Tiên Vũ, mở khóa kỹ năng bậc 19.

- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **15/15 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **40.643 → 39.808**. Đồng bộ config1 (2 lượt).

### 8.4.7zf. Round 12 dịch `desc` — 13 giá trị 100-150 ký tự (2026-07-03)

Dịch tay 13 giá trị: bộ ngọc Vương/Đế 3 vũ khí (Kiếm/Tản/Cầm), 3 cây Tiên Cung tự chọn nguyên liệu (Trụy Nhật/Phá Nguyệt/Táng Thần — 8 nguyên liệu mỗi cây), 3 kỹ năng huấn luyện Linh Thú, 2 thẻ đồ giám kích hoạt kim trang, hộp Linh Thú 3 sao, rương may mắn Yêu Trủng.

- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **13/13 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **39.808 → 39.009**. Đồng bộ config1 (1 lượt).

### 8.4.7zg. Round 13 dịch `desc` — 57 giá trị ngắn còn sót (≤49 ký tự), 2026-07-03

Rà lại toàn bộ `desc` theo độ dài, phát hiện 57 giá trị ngắn (≤49 ký tự) chưa từng được dịch ở các round trước (chủ yếu mô tả điều kiện sự kiện lễ hội — Tết Dương Lịch/Giáng Sinh/Lạp Bát, mốc xếp hạng top 20, mô tả vật phẩm ngắn). Dịch tay toàn bộ 57 giá trị.

- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **57/57 lượt khớp**. `json.load()` hợp lệ.
- Kết quả: ký tự Hán còn lại trong `config.json` giảm **39.009 → 37.554**. Đồng bộ config1 (3 lượt).

### 8.4.7zh. Round 14 dịch `desc` — 58 giá trị 150-200 ký tự, bộ thẻ "Nội Uẩn Thiên Địa/Phần Thiên Quyết/Hạo Nhiên Chính Khí" (2026-07-04)

Rà bucket 150-200 ký tự của `desc` (58 giá trị). 50/58 khớp một mẫu template lặp lại (thẻ trang bị hiển thị: "当前星级...基础属性...战斗力...[内蕴天地/焚天诀/浩然正气]N级(màu 5件激活)" + hiệu ứng tương ứng) — viết generator regex dịch tự động dựa trên từ vựng cố định đã có sẵn (生命→Sinh Lực, 攻击→Công Kích, 焚火伤害→Sát Thương Phần Hỏa, 仙罡罡气→Tiên Cương Cương Khí [ghép từ 仙罡→Tiên Cương + 罡气→Cương Khí đã có], 内蕴天地→Nội Uẩn Thiên Địa, 焚天诀→Phần Thiên Quyết, 浩然正气→Hạo Nhiên Chính Khí, 战斗力→Chiến Lực, các màu 绿色/紫色/橙色/红色→Xanh Lục/Tím/Cam/Đỏ), số liệu (sao/số/%) giữ nguyên. 8 giá trị còn lại dịch tay: 4 tier "道藏秘法——《焚天诀》散落的篇章" (xanh/tím/cam/đỏ, kèm mô tả "获取途径" tăng độ hiếm theo tier), 1 rương BOSS sự kiện Long Đài Đầu (dùng lại tên loại BOSS đã có: BOSS Cá Nhân/BOSS Dã Ngoại/BOSS Bí Cảnh/BOSS Thần Vực/BOSS Chi Gia/Thần Binh Thánh Vực), 1 bản mở rộng của thẻ "开启后必然获得" round 11 (500W kinh nghiệm Thần Binh, 18 viên ngọc — 9 viên 帝-tier dịch song song với 9 viên 王-tier đã có ở round 11 bằng cách đổi Vương→Đế), 1 mô tả Tiên Văn theo tầng, 1 thẻ hiệu ứng kích hoạt Tiên Cung.

- Phát hiện bug trong `apply_json_glossary_field.py`: script khớp trên **text thô chưa giải mã** của file (nhóm regex capture `\n` dạng 2 ký tự thô, không phải ký tự xuống dòng thật), trong khi glossary xây từ `json.load()` có khoá chứa ký tự xuống dòng thật (đã giải mã) → 0 lượt khớp dù nội dung đúng. Khắc phục bằng cách chuyển đổi lại khoá glossary qua `json.dumps(k, ensure_ascii=False)[1:-1]` trước khi ghi file glossary, để khoá khớp đúng dạng thô trong file gốc (giữ nguyên quy ước có từ các round trước — glossary key luôn ở dạng escape thô).
- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót trong giá trị dịch.
- Áp bằng `apply_json_glossary_field.py desc` → **58/58 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: ký tự Hán còn lại trong toàn bộ `config.json` giảm **37.554 → 32.651** (desc còn 461 → 403 giá trị duy nhất). Đồng bộ config1 (config0.json 1 lượt).

### 8.4.7zi. Round 15 dịch `desc` — 209 giá trị 200-249 ký tự, mở rộng generator thêm tier "天地寂灭" (2026-07-04)

Bucket 200-249 ký tự của `desc` (209 giá trị) hầu hết vẫn thuộc family template ở round 14. Mở rộng generator (`desc_star_template.py`, thay cho bản cũ trong `build_desc_round14.py`) để xử lý tổng quát hơn:
- Số dòng thuộc tính cơ bản không cố định 2 dòng nữa mà có thể là 2/3/4 dòng (thêm biến thể có 物抗+N và 法抗+N chen giữa) → regex đổi sang khớp danh sách dòng thuộc tính bất kỳ rồi dịch từng dòng qua bảng từ vựng.
- Phát hiện tier thứ 4 chưa gặp trước đây: **天地寂灭 → Thiên Địa Tịch Diệt** (đi kèm thuộc tính mới 寂灭伤害 → Sát Thương Tịch Diệt, hiệu ứng "mỗi N lần tấn công gây thêm X% sát thương + Y điểm sát thương cố định").
- Generator tự động khớp **207/209** giá trị. 2 giá trị còn lại dịch tay: 1 bản mở rộng (thêm 万卷→Vạn Quyển, dòng "kinh nghiệm thu nhập tăng %") của thẻ Tiên Văn đã dịch ở round 14, 1 bản tăng số liệu của thẻ buff Tiên Vũ đã có mẫu từ round 11 (tái dùng nguyên văn mẫu, chỉ đổi số).

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **209/209 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: ký tự Hán còn lại trong toàn bộ `config.json` giảm mạnh **32.651 → 23.182** (desc còn 403 → 194 giá trị duy nhất). Đồng bộ config1 (config0.json 1 lượt).

### 8.4.7zj. Round 16 dịch `desc` — 158 giá trị 250-299 ký tự, generator `desc_star_template.py` khớp gần như toàn bộ (2026-07-04)

Bucket 250-299 ký tự (158 giá trị) — generator dùng chung từ round 15 (`desc_star_template.py`, xử lý cả 4 tier 内蕴天地/焚天诀/浩然正气/天地寂灭 và số dòng thuộc tính biến động) khớp tự động **157/158** không cần sửa gì thêm, chứng tỏ gần như toàn bộ phần dài còn lại của `desc` đều thuộc cùng 1 họ mẫu thẻ trang bị. 1 giá trị còn lại là bản mở rộng thêm nữa của thẻ Tiên Văn (thêm dòng 聚宝→Tụ Bảo, "tỉ lệ cộng thêm thu nhập Đồng Tiền") — dịch tay nối tiếp chuỗi mẫu đã có từ round 14/15.

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **158/158 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: ký tự Hán còn lại trong toàn bộ `config.json` giảm mạnh **23.182 → 15.471** (desc còn 194 → **36** giá trị duy nhất — gần hết). Đồng bộ config1 (config0.json 1 lượt).

### 8.4.7zk. Round 17 dịch `desc` — 36 giá trị cuối cùng, HOÀN TẤT field `desc` (2026-07-04)

36 giá trị `desc` cuối cùng còn sót (300-725 ký tự), gồm 2 nhóm:
- 26 giá trị vẫn thuộc family template thẻ trang bị (khớp tự động 100% bằng `desc_star_template.py`, biến thể có 4 dòng thuộc tính: 物抗+法抗+生命/攻击+寂灭伤害).
- 10 giá trị là chuỗi lồng nhau tăng dần của thẻ "loại Tiên Văn hiện đã mở khóa" (mỗi giá trị dài hơn giá trị trước 1 dòng, tổng cộng leo từ 3 dòng lên tới 15 dòng loại Tiên Văn). Viết generator ghép chuỗi (`build_desc_round17_tienvan.py`) dựa trên 15 cặp tên+hiệu ứng, tái dùng toàn bộ tên Tiên Văn đã có sẵn trong glossary cũ (斩龙→Trảm Long, 无懈→Vô Giải, 天命→Thiên Mệnh, 万卷→Vạn Quyển, 聚宝→Tụ Bảo, 绝武→Tuyệt Vũ, 全知→Toàn Tri, 仙佑→Tiên Hựu, 穿云→Xuyên Vân, 猛击→Mãnh Kích, 舞火→Vũ Hỏa, 逐日→Trục Nhật, 迅捷→Tấn Tiệp, 破灭→Phá Diệt, 不朽→Bất Hủ), chỉ cần dịch mới 2 tên khe trang bị chưa từng gặp theo phong cách Hán Việt nhất quán với các khe khác: **项链→Hạng Liên, 腰带→Yêu Đái**.

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py desc` → **36/36 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: **field `desc` của `config.json` đã dịch xong 100%** (461 → 403 → 194 → 36 → **0** giá trị Hán còn sót qua 4 round liên tiếp 14-17). Ký tự Hán còn lại trong toàn bộ `config.json` giảm **15.471 → 12.644** (phần còn lại thuộc các field khác, chủ yếu `name`). Đồng bộ config1 (config0.json 1 lượt).

### 8.4.7zl. Bắt đầu dịch `name` — round 1: tái dùng 59 giá trị đã có sẵn trong glossary cũ (2026-07-04)

Chuyển sang field `name` của `config.json` (1.642 giá trị duy nhất còn tiếng Hán, đa số ngắn 2-3 ký tự — tên vật phẩm/nguyên liệu/NPC/quái). Quét toàn bộ `translation/glossary_*.json` đã có từ các phase trước, tìm giao với tập `name` còn sót → tìm được **59 giá trị trùng khớp chính xác** (đã dịch ở nơi khác trong dự án, ví dụ 帝君→Đế Quân, 昊天塔→Tháp Hạo Thiên, 焚火伤害→Sát Thương Phần Hỏa, 夺天灵术→Đoạt Thiên Linh Thuật...), áp lại trực tiếp không cần dịch mới.

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py name` → **59/59 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **1.642 → 1.583** giá trị duy nhất. Đồng bộ config1 (config2/3/5/6.json, tổng 8 lượt).

### 8.4.7zm. Round 2 dịch `name` — phát hiện & giải mã họ tên "绝剑/绝伞/绝琴" (315 giá trị), dịch máy theo Hán Việt từng chữ (2026-07-04)

Phân tích tần suất ký tự trong 1.583 giá trị `name` còn lại: phát hiện 1 họ tên chiếm khối lượng lớn nhất — mẫu `绝{剑|伞|琴}{2 chữ tuỳ ý}{1 chữ hậu tố}` (bộ ngọc quý "Tuyệt"-tier, song song với bộ "帝"/"王"-tier đã dịch ở round 11/14), khớp đúng **315/324** giá trị chứa 绝. Trích ra 243 "từ giữa" 2 chữ độc nhất + 9 ký tự hậu tố (玉/钰/炁/气/石/心/珠/镜/璟/碟) + 3 loại vũ khí (剑/伞/琴, tái dùng Kiếm/Tản/Cầm đã có).

- Dịch thủ công toàn bộ 243 từ giữa + 9 hậu tố theo phiên âm Hán Việt từng chữ (đúng phong cách đã dùng cho các tên ngọc quý trước đó, vd 轮回→Luân Hồi, 摄魂→Nhiếp Hồn), viết generator ghép `Tuyệt {Kiếm/Tản/Cầm} {từ giữa} {hậu tố}` → khớp tự động **315/315**, không trùng giá trị output.
- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py name` → **315/315 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **1.583 → 1.268** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **12.644 → 10.846**. Đồng bộ config1.

### 8.4.7zn. Round 3 dịch `name` — họ tên "{Tier} {khe trang bị}·{nhân vật}" (216 giá trị) (2026-07-04)

Phát hiện họ tên thứ 2: mẫu `{cấp bậc}{khe trang bị}·{tên nhân vật}` — 6 cấp bậc (三山→Tam Sơn, 九霄→Cửu Tiêu, 仙人→Tiên Nhân, 大罗→Đại La, 脱凡→Thoát Phàm, 飞升→Phi Thăng) × 4 khe trang bị (仙束/天守/法链/灵佩, tái dùng Tiên Thúc/Thiên Thủ/Pháp Liên/Linh Bội đã có) × 9 tên nhân vật (tái dùng 御霄→Ngự Tiêu, 落樱→Lạc Anh, 长歌→Trường Ca đã có từ trước; dịch mới 神樱→Thần Anh, 神歌→Thần Ca, 神霄→Thần Tiêu, 道樱→Đạo Anh, 道歌→Đạo Ca, 道霄→Đạo Tiêu theo đúng cách ghép chữ đã dùng cho 3 tên gốc) = 6×4×9 = 216, khớp tự động **216/216**.

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót, 0 giá trị output trùng lặp.
- Áp bằng `apply_json_glossary_field.py name` → **216/216 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **1.268 → 1.052** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **10.846 → 9.550**. Đồng bộ config1.

### 8.4.7zo. Round 4 dịch `name` — hệ thống "Kinh Mạch" 12 tầng (84 giá trị) + 12 giá trị lẻ tầng phó bản (2026-07-04)

Lưu ý đặt tên file: dự án đã có sẵn `glossary_config_names1-5.json` + `glossary_config_name_round6.json` (283 mục) từ phiên trước 2026-07-03 — các file `glossary_config_name_round1/2/3.json` tạo trong phiên này (mục 8.4.7zl-zn) là làm tiếp theo trình tự đó dù tên file không nối số trực tiếp; không có xung đột nội dung, chỉ là quy ước đặt tên khác nhau giữa 2 phiên.

Phát hiện field `name` thuộc `ConfigJingMaiStage` (hệ thống tu luyện "Kinh Mạch/Dịch Cân Kinh", 12 tầng) theo mẫu `{số Hán đại tự}层·{câu triết lý Phật/Đạo 3-7 chữ}` (vd "壹层·须菩提" = tầng 1 - "Tu Bồ Đề"). Dịch tay toàn bộ 12 tầng × 7 câu = 84 câu triết lý cổ theo phiên âm Hán Việt (giữ nguyên phong cách thuật ngữ Phật/Đạo giáo đã dùng trong dự án, vd 行住坐卧→Hành Trụ Tọa Ngọa, 出神入定→Xuất Thần Nhập Định, 须菩提→Tu Bồ Đề). Số tầng đổi từ số Hán đại tự (壹贰叁肆伍陆柒捌玖壹拾壹拾壹壹拾贰) sang số Ả Rập theo đúng quy ước "tầng N" đã dùng xuyên suốt dự án.

Ngoài ra dịch 12 giá trị lẻ còn sót cùng chứa "层": `石墓/祖玛` (phó bản, tái dùng Tổ Mã đã có) 1-5 tầng, và 4 giá trị "通关昊天塔N重天第M层" (đối chiếu lại quy ước đa số trong glossary — **Hạo Thiên Tháp** và **Trùng Thiên** phổ biến hơn "Tháp Hạo Thiên"/"Trọng Thiên" từng dùng lẻ tẻ ở round6 cũ — thống nhất theo đa số).

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py name` → **96/96 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **1.052 → 956** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **9.550 → 8.951**. Đồng bộ config1 (config2/6.json).

### 8.4.7zp. Round 5 dịch `name` — hoàn tất họ ngọc quý 4 tier "名/君/帝/王" (180 giá trị) (2026-07-04)

Tiếp tục họ tên ngọc quý dạng `{tier}{vũ khí}{2 chữ}{hậu tố}` (cùng family với round2 "绝"): phát hiện 4 tier còn lại **名→Danh, 君→Quân, 帝→Đế, 王→Vương** (45 giá trị mỗi tier × 4 = 180), dùng 27 từ giữa (18 đã có sẵn từ round 11/14: 七巧/万劫/仙鸣/八方/凤鸣/摄魂/擎天/汲灵/汲血/破劫/破道/花杀/莲开/绝斩/轮回/魔灵/龙灵 + 9 từ mới dịch theo Hán Việt: 归元→Quy Nguyên, 炼神→Luyện Thần, 真守→Chân Thủ, 破天→Phá Thiên, 破灵→Phá Linh, 神守→Thần Thủ, 诛仙→Tru Tiên, 还虚→Hoàn Hư, 陨日→Vẫn Nhật) và 4 hậu tố (玉/石/气/镜 đã có). Generator khớp tự động **180/180**, không trùng giá trị output.

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py name` → **180/180 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **956 → 776** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **8.951 → 8.051**. Đồng bộ config1.

### 8.4.7zq. Round 6 (file lưu là round7 do round6 đã bị chiếm bởi phiên cũ) dịch `name` — 78 giá trị vật phẩm/mốc cấp độ chứa "级" (2026-07-04)

Lưu ý: file `translation/glossary_config_name_round6.json` đã tồn tại từ phiên trước (283 mục, không liên quan nội dung round này) nên lưu batch này vào `glossary_config_name_round7.json` để tránh ghi đè.

Dịch tay 78 giá trị chứa "级" — nhóm hỗn hợp gồm: 13 mốc "N级mở/thêm mới X" (vd 20级开启个人BOSS→Cấp 20 mở BOSS Cá Nhân), bộ vật phẩm 4 cấp bậc Sơ/Trung/Cao/Đỉnh Cấp (盒/箱/袋/卡/瓶/石/元/令 — Hộp Chủ Tể, Hộp Kích Sát, Rương May Mắn, Túi Khôi Thủ, Thẻ/Bình Kinh Nghiệm, Luyện Trận Thạch, Thú Nguyên, Lệnh Triệu Hoán — tái dùng quy ước hậu tố "X Cấp" đã có từ trước, và đối chiếu quy ước cũ **低级 dịch giống 初级 = Sơ Cấp** đã dùng nhất quán trong round14), 8 giá trị "灵火·[休/伤/开/惊/景/杜/死/生]·60级" (tương ứng Bát Môn Kỳ Môn Độn Giáp, giữ phiên âm Hán Việt từng chữ), và vài giá trị lẻ (至尊金/银箱, 超级/高级飞升丹, 等级直升丹...).

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py name` → **78/78 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **776 → 698** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **8.051 → 7.644**. Đồng bộ config1.

### 8.4.7zr. Round 7 (file round8) dịch `name` — số Hán "N重天" (59 giá trị, parser số) + họ "{màu}龙{bộ phận}" (42 giá trị) (2026-07-04)

Hai family mới:
- 59 giá trị `N重天` dùng số Hán thường (一/二/三.../十/二十/三十...六十, khác kiểu số đại tự 壹贰叁 đã gặp ở round4) — viết hàm `cn2num()` nhỏ chuyển số Hán → số Ả Rập rồi ghép `"{N} Trùng Thiên"` (đúng quy ước đa số đã chốt ở round4), khớp máy 100%.
- 42 giá trị họ "{2 chữ màu}龙{1 chữ bộ phận rồng}" — 5 màu (幽紫→U Tử, 橙枫→Cam Phong, 湛蓝→Trạm Lam, 红血→Hồng Huyết, 绿碧→Lục Bích) × 8 bộ phận (尾→Vĩ, 玺→Tỷ, 珠→Châu, 角→Giác, 骨→Cốt, 魂→Hồn, 鳍→Kỳ, 鳞→Lân) = 40 giá trị khớp máy, cộng 2 giá trị lẻ dịch tay (碧海龙珠→Bích Hải Long Châu, 碧霄龙鸟→Bích Tiêu Long Điểu).

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py name` → **101/101 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **698 → 597** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **7.644 → 7.215**. Đồng bộ config1.

### 8.4.7zs. Round 8 (file round10) dịch `name` — họ "Bát Môn" lửa nguyên tố theo chuyển (48 giá trị) + khe trang bị theo chuyển (15 giá trị) (2026-07-04)

Family "{tên lửa 2-4 chữ}·{Bát Môn}·N转" — 6 tên lửa theo từng mốc chuyển sinh (青焰→Thanh Diễm[chuyển 1], 碧澜烈焰→Bích Lam Liệt Diễm[3], 玄莲蚀火→Huyền Liên Thực Hỏa[4], 焚骨恶火→Phần Cốt Ác Hỏa[5], 大日煌炎→Đại Nhật Hoàng Viêm[6], 金莲天焰→Kim Liên Thiên Diễm[7]) × 8 cổng Bát Môn Độn Giáp đã có (休/伤/开/惊/景/杜/死/生) = 48 giá trị, cộng 8 giá trị "N转{khe trang bị}（神）" (7/8转 × 仙束/天守/法链/灵佩, tái dùng khe đã có) + 7 giá trị lẻ (九转神将→Cửu Chuyển Thần Tướng, 同转橙/紫装, 圣/神·灵佩（9转）, 转生{仙}飞升礼盒→Hộp Quà Chuyển Sinh {Tiên} Phi Thăng).

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót, 0 giá trị output trùng lặp.
- Áp bằng `apply_json_glossary_field.py name` → **63/63 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **597 → 534** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **7.215 → 6.878**. Đồng bộ config1.

### 8.4.7zt. Round 9 (file round11) dịch `name` — 16 quái "上古" + họ "荒古{màu}{bộ phận}" (24) + linh tinh Man Hoang/Cổ Hồn (18) (2026-07-04)

58 giá trị: 16 tên quái/boss `上古XXX` (tái dùng Thượng Cổ đã có, dịch mới 16 tên: 刀仙→Đao Tiên, 天灵→Thiên Linh, 天魔→Thiên Ma, 屠僧→Đồ Tăng, 山王→Sơn Vương, 机巧→Cơ Xảo, 枯骨→Khô Cốt, 海魔→Hải Ma, 火君→Hỏa Quân, 牛魔→Ngưu Ma, 狐媚→Hồ Mị, 石灵→Thạch Linh, 神傀→Thần Khôi, 羽民→Vũ Dân, 蛮主→Man Chủ, 魔佛→Ma Phật); họ ngọc rồng biến thể mới `荒古{màu}{bộ phận}` (24 giá trị, tái dùng bộ màu+bộ phận đã có từ round7, tiền tố mới 荒古→Hoang Cổ); và 18 giá trị lẻ liên quan 蛮荒(Man Hoang, đã có)/古魂(Cổ Hồn)/古仙/古剑/古籍.

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót, 0 giá trị output trùng lặp.
- Áp bằng `apply_json_glossary_field.py name` → **58/58 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **534 → 476** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **6.878 → 6.611**. Đồng bộ config1.

### 8.4.7zu. Round 10 (file round12) dịch `name` — họ "10 phẩm cấp linh thú" (45 giá trị) (2026-07-04)

Phát hiện họ tên thứ 3 dạng ngọc/phù/đồ theo 10 bậc phẩm chất: `{2 chữ tên bậc}{灵晶/符箓/铭图/[thú]魂}(N品)` — 9 bậc còn thiếu (bậc 6/蛮荒 đã dịch ở round9): 一品浪涛→Lãng Đào, 二品覆海→Phú Hải, 三品冥荧→Minh Huỳnh, 四品东来→Đông Lai, 五品万里→Vạn Lý, 七品血海→Huyết Hải(đã có), 八品屠戮→Đồ Lục(đã có), 九品九天→Cửu Thiên, 十品功德→Công Đức(đã có) — mỗi bậc có 3 vật phẩm cố định (灵晶→Linh Tinh, 符箓→Phù Lục, 铭图→Minh Đồ, đều đã có) + 1 linh thú riêng theo bậc (狐→Hồ, 狼→Lang, 蟒→Mãng, 熊→Hùng, 鹰→Ưng, 蛟→Giao, 魔→Ma, 凤→Phượng, 龙→Long). Số phẩm giữ nguyên số Hán trong key gốc (五品 chứ không phải 5品) nhưng dịch value dùng số Ả Rập "(phẩm N)". Cộng 9 giá trị lẻ dạng "极品/珍品/精品" (圣魂 chiến binh 3 lớp, v.v).

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót, 0 giá trị output trùng lặp.
- Áp bằng `apply_json_glossary_field.py name` → **45/45 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: `name` còn lại **476 → 431** giá trị duy nhất. Ký tự Hán còn lại trong `config.json` giảm **6.611 → 6.344**. Đồng bộ config1.

### 8.4.7zv. Round 11 (file round13) dịch `name` — 431 giá trị cuối cùng, HOÀN TẤT field `name` (2026-07-04)

Rà toàn bộ 431 giá trị `name` còn sót — không còn family combinatorial lớn nào nữa, dịch tay từng giá trị (vật phẩm/quái/NPC/địa danh/danh hiệu rải rác), tái dùng tối đa từ vựng đã thiết lập xuyên suốt dự án (khe trang bị, màu sắc, cấp bậc, tên phái...). Một số nhóm nhỏ đáng chú ý phát hiện thêm trong lúc dịch:
- Cặp "X之书"/"X天书" (11 cặp: 刚正/断魂/杀道/气运/观天/诡道/非攻/天罚/化神/回春/攻伐 → Chi Thư/Thiên Thư).
- Họ màu+羽 (5 màu 晚霞/晴空/紫旭/赤霄/青天 × 4 hậu tố 神羽/羽卡/羽灵/羽魂 = 20 giá trị).
- Cặp "X劫·Y" (5 loại Kiếp × 2 = 10: 天地劫/山海劫/红尘劫/风云劫/仙凡劫).
- Địa danh kinh điển kiểu "热血传奇": 沃玛→Ốc Mã, 蜈蚣洞→Hang Ngô Công, 赤月→Xích Nguyệt, 比奇→Bỉ Kỳ, 落霞→Lạc Hà.
- Chuỗi danh hiệu danh vọng tăng dần (初露头角/小有名望/威名远播/名动一方/家喻户晓/举世盛名/享誉八方/赫赫有名/名不虚传/遐迩闻名/默默无闻...).
- "神器-X" (8 vũ khí thần thoại: 乌木剑/屠龙/无极棍/血饮/裁决/银蛇/魔杖/龙血宝石).

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót, 0 giá trị output trùng lặp.
- Áp bằng `apply_json_glossary_field.py name` → **431/431 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: **field `name` của `config.json` đã dịch xong 100%** (1.642 → 0 giá trị Hán còn sót qua 11 round liên tiếp trong phiên này). Ký tự Hán còn lại trong toàn bộ `config.json` giảm **6.344 → 4.437** (phần còn lại thuộc các field nhỏ khác: `context`, `bulletDesc`, `skillDesc`, v.v — chưa rà). Đồng bộ config1 (config2/3/4/6.json).

### 8.4.7zw. Dịch field `skilldesc`/`skillDesc` — HOÀN TẤT 100% (2026-07-04)

Chuyển sang field nhỏ hơn `skilldesc` (86 giá trị, 1.398 ký tự — field lớn nhất trong các field còn lại sau `desc`/`name`). Toàn bộ là mô tả hiệu ứng kỹ năng theo ~11 mẫu template cố định chỉ khác số liệu (% sát thương, điểm sát thương, giây...) — viết generator regex khớp tự động **78/86**, dịch tay 8 giá trị còn lại (biến thể theo tier 陷/戮/绝 của "诛仙刃"/"诛仙甲", tái dùng Tru Tiên đã có, dịch mới 陷→Hãm, 戮→Lục). Đồng thời xử lý luôn field `skillDesc` (viết hoa D, chỉ 1 giá trị).

- Đối chiếu 100% key (dạng escape thô) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót.
- Áp bằng `apply_json_glossary_field.py skilldesc` → **86/86 lượt khớp**, `skillDesc` → **1/1 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: **field `skilldesc`/`skillDesc` đã dịch xong 100%**. Ký tự Hán còn lại trong toàn bộ `config.json` giảm **4.437 → 3.018**. Đồng bộ config1.

### 8.4.7zx. Dịch field `guide` — HOÀN TẤT 100% (2026-07-04)

Field `guide` (187 giá trị, 1.122 ký tự) hóa ra chỉ có **đúng 1 mẫu duy nhất**: `"通关第N关获得"` (N từ 4 đến 940) → generator regex khớp máy **187/187** không cần dịch tay giá trị nào.

- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng.
- Áp bằng `apply_json_glossary_field.py guide` → **187/187 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: **field `guide` đã dịch xong 100%**. Ký tự Hán còn lại trong toàn bộ `config.json` giảm **3.018 → 1.896**. Đồng bộ config1.

### 8.4.7zy. Dịch field `fbName` — HOÀN TẤT 100% (2026-07-04)

Field `fbName` (90 giá trị, 570 ký tự) — mẫu `"第N关 {tier}元{quái}"`, 6 tier (天/死/神/苍/荒/魔 → Thiên/Tử/Thần/Thương/Hoang/Ma Nguyên) × 30 tên quái duy nhất (dịch mới toàn bộ theo Hán Việt: 三首金龙→Tam Thủ Kim Long, 不老僧→Bất Lão Tăng, 冥后→Minh Hậu, 剥夺者→Kẻ Tước Đoạt, 勾魂吏→Câu Hồn Lại, 古尸→Cổ Thi, 天煞→Thiên Sát, 巨神→Cự Thần, 恶戮→Ác Lục, 恶灵→Ác Linh, 挪山公→Na Sơn Công, 擎天猿→Kình Thiên Viên, 死屠→Tử Đồ, 灵尸→Linh Thi, 焚刑鬼→Phần Hình Quỷ, 牛魔→Ngưu Ma, 玄龟→Huyền Quy, 白熊将→Bạch Hùng Tướng, 真灵→Chân Linh, 祖海王→Tổ Hải Vương, 神机→Thần Cơ, 神祀→Thần Tự, 紫龙→Tử Long, 葬傀→Táng Khôi, 蛇将→Xà Tướng, 蛮王→Man Vương, 金卫→Kim Vệ, 铁爪→Thiết Trảo, 雀卫→Tước Vệ, 霸斧→Bá Phủ) — generator khớp máy **90/90**.

- Đối chiếu 100% key với text thô, 0 dấu ngoặc kép thẳng.
- Áp bằng `apply_json_glossary_field.py fbName` → **90/90 lượt khớp**. `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- Kết quả: **field `fbName` đã dịch xong 100%**. Ký tự Hán còn lại trong toàn bộ `config.json` giảm **1.896 → 1.326**. Đồng bộ config1.

### 8.4.7zz. `config.json` HOÀN TẤT ~100% — dịch nốt ~50 field nhỏ rải rác còn lại (2026-07-04)

Sau khi các field lớn (desc/name/skilldesc/guide/fbName) đã xong, phần còn lại (1.326 ký tự) rải rác trên ~50 tên field khác nhau (`paydesc`, `news`, `openTips`, `runeName`, `dangerLv`, `套装属性`...) — áp riêng từng field không còn hiệu quả. Viết script tổng quát mới **`translation/apply_json_glossary_anyfield.py`**: khớp trên `"KEY":"value"` với KEY bất kỳ (thay vì field cố định), áp dụng y hệt cơ chế escape/replace của `apply_json_glossary_field.py`.

Trích toàn bộ 191 giá trị chuỗi (bất kỳ field nào) còn chứa ký tự Hán trong `config.json`, dịch tay toàn bộ (đơn/song âm tiết Tiên Văn đã có, tên NPC/quái/套装 mới, mốc nạp thẻ "N元"→"N NDT", chuỗi combat log %s/{0} placeholder, đoạn văn bản dài VIP/đấu giá/守护神剑...). Phát hiện và sửa 1 lỗi sót từ round trước: chuỗi `condition` của `TitleConf.1` đã dịch phần lớn nhưng còn sót từ "玩法" giữa câu tiếng Việt — sửa thành "chế độ".

**Loại trừ có chủ đích 1 giá trị**: `跨服战场` (field `sceneName` trong `ConfigCrossBoss`) — xác nhận lại đây chính là giá trị được so sánh trực tiếp `"跨服战场"==n.sceneName` trong `main.min.js` (đã phát hiện từ trước, xem 8.4.7t/u); dịch giá trị này trong config.json sẽ làm hỏng logic nhận diện scene phía client vì literal JS vẫn giữ nguyên tiếng Hán. Giữ nguyên 7 occurrence.

- Phát hiện thêm 1 bug nhỏ trong bản thân pipeline: 1 key chứa `/` được PHP `json_encode` escape thành `\/` trong file gốc nhưng `json.dumps()` (Python) không tự escape `/` khi tái tạo lại key thô → thêm bước fallback thử escape `/` → `\/` khi so khớp key không tìm thấy.
- Đối chiếu 100% key (dạng escape thô, có xử lý `\/`) với text thô, 0 dấu ngoặc kép thẳng, 0 ký tự Hán sót (trừ giá trị bị loại trừ có chủ đích).
- Áp bằng `apply_json_glossary_anyfield.py` → **190/190 giá trị khớp, 229 lượt thay thế** (một số giá trị lặp lại ở nhiều field/object). `json.load()` hợp lệ, 336 top-level keys nguyên vẹn.
- **Kết quả: `config.json` đã dịch xong ~100%** — chỉ còn duy nhất 7 occurrence của `跨服战场` (28 ký tự) được giữ nguyên có chủ đích vì lý do kỹ thuật. Ký tự Hán còn lại trong toàn bộ `config.json` giảm **1.326 → 28**. Đồng bộ config1 (config2/3/4/5/6.json).

### 8.4.10. TRẠNG THÁI TỔNG QUAN dịch thuật + việc cần làm tiếp theo (cập nhật 2026-07-04)

**Đã hoàn tất 100% (không còn ký tự Hán, trừ ngoại lệ có chủ đích):**
- `resource/config/config.json` + 7 file `resource/config1/config0-6.json` (bản sao đồng bộ) — **~100%**, chỉ còn 7 occurrence `跨服战场` giữ nguyên có chủ đích (xem 8.4.7zz).
- Toàn bộ field lớn: `desc`, `name`, `skilldesc`/`skillDesc`, `guide`, `fbName`, `text`, `bulletDesc`, và ~50 field nhỏ rải rác khác.

**Còn tồn đọng — thứ tự ưu tiên gợi ý cho phiên sau:**
1. **`js/main.min_d7aad928.js`** — còn khoảng **4.130 ký tự Hán** (số liệu tại thời điểm kiểm tra gần nhất, 8.4.7zd) rải rác trong logic hiển thị, cần dùng lại quy trình `apply_js_literal_glossary.py` (đã vá lỗi desync ở 8.4.7t — **luôn dùng bản đã vá**) + kiểm tra an toàn (không đụng chuỗi bị so sánh `==` với giá trị server, vd `跨服战场`).
2. **Giai đoạn 5 — `data/language/zh-cn/*.txt`**: 5 file khổng lồ chưa đụng tới `talk.txt` (~60K ký tự Hán), `item.txt` (~42K), `skill.txt` (~35K), `scripttips.txt` (~25K), `quest.txt` (~14K), cộng ~30 file cỡ trung bình khác (guide.txt, friend.txt, betaactivity.txt, question.txt, team.txt, slave.txt, xianshi.txt, superexptime.txt, chatmsg.txt, storyline.txt, anheishendian.txt, fightvalue.txt, cross.txt...).
3. **Giai đoạn 6 — `data/config/**/*.config`**: 422 file server-side Lua-style, xác nhận là nguồn dữ liệu flavor-text cho các màn hình (vd `teamfuben.config` cho màn "竞技"/Đấu Trường) — **đã bắt đầu**: `notice/notice.config` (379 dòng thông báo hệ thống/kênh 综合) đã dịch xong 100% (xem 8.13), còn lại ~421 file khác trong Giai đoạn 6 chưa đụng tới.
4. **`data/config/language/lang/*.config`**: 16 file (lang.config, fuwen.config, achieve.config, fuben.config, item.config, shop.config, spequip.config, vip.config, chapter.config, character.config, monster.config, scripttips.config, friend.config, system.config, mail.config, boss.config) — hệ thống dịch nội dung động thứ 2, chưa khám phá kỹ, chưa bắt đầu.

**Quy ước bắt buộc giữ nguyên cho mọi round dịch tiếp theo** (đã kiểm chứng qua ~30 round trong dự án):
- Dấu ngoặc kép trong giá trị dịch: luôn dùng ngoặc cong `"…"`, không bao giờ dùng `"` thẳng chưa escape.
- Bỏ qua chữ Hán nhúng trong bitmap ảnh (không thể sửa bằng text edit) — đã xác nhận nhiều biểu ngữ/icon dùng bitmap.
- Luôn đối chiếu 100% key (dạng escape thô, có xử lý `\/`) với text thô của file gốc trước khi áp, kiểm tra 0 dấu ngoặc kép thẳng + 0 ký tự Hán sót trong giá trị dịch sau khi build glossary.
- `apply_json_glossary_field.py` dùng cho field cố định; `apply_json_glossary_anyfield.py` (mới, 8.4.7zz) dùng khi field rải rác trên nhiều tên khác nhau.
- Sau mỗi lần sửa `config.json`: luôn chạy `python3 translation/sync_config1_from_config.py` để đồng bộ 7 file `config1/configN.json`.
- Luôn cập nhật `claude.md` trước khi commit; mỗi round dịch = 1 commit riêng (code + docs cùng lúc), push lên `claude/repo-analysis-deployment-1dtmin` sau mỗi commit.
- Với sửa layout UI trong `default.thm_70915153.js`/`main.min_d7aad928.js`: vì không thể render trực tiếp để kiểm tra, luôn xin ảnh chụp màn hình của người dùng sau khi họ deploy để xác nhận trước khi coi là xong (xem 8.6 bên dưới — quy trình đã áp dụng nhiều lần).

## 8.6. Sửa lỗi layout UI phát hiện qua ảnh chụp màn hình người dùng

### 8.6.1. Căn giữa lại 2 dòng ghi chú trong popup "Luyện Hóa Trang Bị" (SmeltMainViewSkin) bị lệch phải do dịch dài hơn bản gốc (2026-07-04)

Người dùng gửi ảnh chụp cho thấy 2 dòng chú thích dưới khung 9 ô trang bị trong popup Nung Luyện — dòng xanh "Chức năng Nung Luyện chỉ thu hồi trang bị vô dụng" và dòng vàng "(Thẻ Tháng Đặc Quyền mở Nung Luyện nhanh)" — bị lệch hẳn qua phải, tràn ra ngoài mép khung.

- Truy vết: cả 2 dòng nằm trong `SkinSmeltMainView` (`generateEUI.paths['resource/exml/SmeltMainViewSkin.exml']`) trong `default.thm_70915153.js`, là `_Label2_i`/`_Label3_i`, con của `eui.Group` (`anigroup`, width=484) — cùng cấp với `title_i` ("Luyện Hóa Trang Bị") và các Image nền dùng `horizontalCenter = 0` để tự căn giữa.
- **Nguyên nhân gốc**: 2 Label này KHÔNG dùng `horizontalCenter`, mà dùng toạ độ cố định `t.x = 141` (không set `width`) — với text tiếng Hán gốc ngắn (`熔炼功能只回收无用装备` = 11 ký tự) thì trùng hợp gần giữa khung, nhưng bản dịch tiếng Việt dài hơn nhiều (50 và 42 ký tự) nên hộp text tự phình rộng về bên phải kể từ mốc x=141 cố định → tràn khỏi khung dù đã có `textAlign="center"` (thuộc tính này vô nghĩa khi hộp tự co theo nội dung, không có `width` cố định).
- **Sửa**: thay `t.x = 141` bằng `t.horizontalCenter = 0` (đúng theo mẫu các sibling component khác trong cùng group) + thêm `t.width = 417` (khớp bề rộng nền panel `ronglianbg_png`) cho cả `_Label2_i` và `_Label3_i`, để `textAlign="center"` phát huy tác dụng thật sự trong 1 hộp cố định được căn giữa theo panel.
- Xác minh: khối code sửa là duy nhất trong toàn file (`content.count(old_block)==1`), `node -c` qua được, không có bản sao trong `main.min_d7aad928.js`.
- **Chưa xác nhận trực quan** (không có cách render/kiểm tra hình ảnh trực tiếp) — cần người dùng deploy lên server thật và gửi ảnh chụp xác nhận, theo đúng quy trình lặp đã dùng ở 8.4.7zc (SkillItem fix, 3 vòng phản hồi mới ra kết quả đúng).

### 8.6.2. Bug thật trong logic app (không phải skin tĩnh): "Xem thêm bộ trang bị" (ShenFaPanel/Thần Phạt) bị lệch trái đè lên "60bộ trang bị cấp (3/8)" ở lần đầu vào tab, tự hết khi rời tab rồi quay lại (2026-07-04)

Khác với các bug layout trước (đều là toạ độ tĩnh trong skin `default.thm`), bug này nằm trong **logic tính toán vị trí runtime** trong `main.min_d7aad928.js`, class `ShenFaPanel` (panel "Thần Phạt"), hàm `setPunchView()`.

- **Truy vết**: `preViewText` ("Xem thêm bộ trang bị") có vị trí mặc định trong skin (`t.x=200`) nhưng bị GHI ĐÈ mỗi lần cập nhật dữ liệu bằng công thức `this.preViewText.x = this.currTitleText.x + this.currTitleText.textWidth + 10` — tức luôn đặt ngay sau chữ "60bộ trang bị cấp (3/8)" (`currTitleText`), cộng thêm lề 10px. Công thức này đúng về nguyên tắc, nhưng dòng code đặt `.textWidth` được đọc **ngay sau khi vừa set `.text` mới trong cùng 1 biểu thức dấu phẩy** — trong EUI/Egret, việc set `.text` chỉ đánh dấu component "invalid" (cần đo lại), phép đo (`measure()`) chỉ thực sự chạy khi có 1 chu kỳ validate (thường là frame render tiếp theo, hoặc gọi `validateNow()` thủ công). Vì đọc `textWidth` ngay lập tức, giá trị nhận được là **width đo từ lần trước đó** (dữ liệu cũ/lần hiển thị trước, hoặc 0 nếu là lần đầu tạo component) → `preViewText.x` bị tính sai (quá nhỏ) → chữ hiển thị lệch trái, đè lên `currTitleText`. Sau khi rời tab rồi quay lại, `currTitleText` đã trải qua 1 chu kỳ render đầy đủ ở lần trước nên `textWidth` lúc đó đã đúng, khiến bug "tự hết" — đúng như người dùng mô tả.
- **Sửa**: chèn `this.currTitleText.validateNow()` ngay sau khi set `.text`, trước khi đọc `.textWidth`, để buộc đo lại kích thước ngay lập tức thay vì đợi frame sau. `validateNow()` là API chuẩn của framework này (đã dùng sẵn 116 chỗ khác trong `main.min`, định nghĩa gốc trong `eui.min_506ce9f.js` ở tầng `UIComponent` dùng chung cho mọi component kể cả `eui.Label`) — không phải hack, là cách chính thống để ép đo/layout ngay lập tức.
- Vị trí sửa duy nhất trong toàn file (`content.count(old)==1`), `node -c` qua được.
- Đây là bug có khả năng đã tồn tại kể cả với bản tiếng Hán gốc (do lỗi thứ tự đọc/ghi thuộc tính, không liên quan đến việc dịch), chỉ là ít lộ ra hơn vì chữ Hán ngắn hơn nhiều so với bản dịch tiếng Việt nên độ lệch nhỏ, khó nhận ra bằng mắt.
- **Chưa xác nhận trực quan** — cần người dùng deploy và test lại đúng kịch bản gốc (vào lần đầu tab Thần Phạt từ tab khác) để xác nhận hết lệch.

### 8.6.3. Đã xác nhận 8.6.1 OK (popup Nung Luyện căn giữa đẹp). Sửa tiếp: 2 cột thuộc tính đè lên nhau ở panel "Thuộc tính Phi Thăng" (SamsaraPanel/ReincarnationWinSkin) — dòng "Sát Thương Thật Thần Phạt" quá dài tràn sang cột bên cạnh (2026-07-04)

Ảnh chụp cho thấy panel "Thuộc tính Phi Thăng" (mở từ nút Phi Thăng trong `WingPanel`, dùng chung `SkinReincarnationWin`/`ReincarnationWinSkin.exml` cho cả hệ thống luân hồi/chuyển sinh/phi thăng) — 2 cột thuộc tính (trước/sau khi nâng cấp) bị đè chữ lên nhau ở đúng dòng cuối "Sát Thương Thật Thần Phạt".

- **Truy vết**: mỗi cột (`attr1` = cột trái/hiện tại, `attr2` = cột phải/sau nâng cấp trong class `SamsaraPanel`) là **1 Label duy nhất chứa cả 5 dòng thuộc tính nối bằng `\n`** (build bởi `AttributeData.getAttStr()`), KHÔNG PHẢI 5 Label riêng từng dòng. Cả 2 Label này trong skin gốc **không có `width` cố định** → Label tự co giãn theo dòng DÀI NHẤT. `attrGroup1` neo trái (`left=30`), `attrGroup2` neo phải (`right=-30`) trong 1 Group cha rộng 500 — cột trái phình rộng ra bên phải, cột phải phình rộng ra bên trái, tính từ 2 mép đối diện.
- **Nguyên nhân gốc**: dòng thuộc tính `atTogetherHolyDamege` ("神罚真实伤害", 6 ký tự Hán) dịch thành "Sát Thương Thật Thần Phạt" (~26 ký tự, dài hơn 4 lần) — đây là dòng dài nhất trong bảng `AttributeType` (đã dịch ở 8.4.7r), khiến bề rộng tự nhiên của Label vượt xa 4 dòng còn lại (Sinh Lực/Công Kích/Vật Kháng/Pháp Kháng đều ngắn, không tràn). Vì Label tự co theo dòng dài nhất, 2 cột phình về phía nhau và đè lên nhau đúng ở dòng đó.
- **Khác về bản chất so với 2 bug UI trước**: đây KHÔNG PHẢI vấn đề căn giữa (không sửa được bằng `horizontalCenter`) mà là **thiếu ràng buộc bề rộng + không cho phép xuống dòng** — khoảng trống thực tế 2 bên (~220-280px ở size chữ 20) không đủ chứa trọn dòng dài ~330px dù có canh giữa hoàn hảo, nên bắt buộc phải cho xuống dòng (không chỉ đơn thuần di dời vị trí).
- **Sửa**: thêm `t.width = 227` (khớp bề rộng cột đã set sẵn ở `attrGroup0` cho case tối đa cấp, dùng làm chuẩn nhất quán) + `t.multiline = true` + `t.wordWrap = true` cho cả 3 Label `attr0`/`attr1`/`attr2` — để dòng dài tự động xuống dòng bên trong cột thay vì tràn ra ngoài, các dòng ngắn khác không bị ảnh hưởng (vẫn nằm gọn 1 dòng trong 227px). Không đổi nội dung dịch (giữ nguyên "Sát Thương Thật Thần Phạt" đầy đủ, không rút gọn) — chỉ sửa layout theo đúng nguyên tắc ưu tiên của người dùng.
- Đối chiếu: cả 3 khối `attr0_i`/`attr1_i`/`attr2_i` sửa là duy nhất trong file (khớp theo toàn bộ nội dung placeholder text để tránh nhầm với các class khác dùng cùng tên hàm `attr0_i`/`attr1_i`/`attr2_i`, có 86 chỗ trùng tên hàm nhưng khác nội dung/khác class). `node -c` qua được.
- Vì `SkinReincarnationWin` dùng chung cho nhiều màn (Chuyển Sinh/Phi Thăng/các mốc luân hồi khác — xem 6 tier 三山/九霄/仙人/大罗/脱凡/飞升 đã dịch ở round name 8.4.7zl/zn), sửa 1 lần ở đây khả năng cao fix luôn các màn tương tự dùng chung skin.
- **Chưa xác nhận trực quan** — cần deploy + xem lại đúng panel "Thuộc tính Phi Thăng" và (nếu tiện) các panel luân hồi/chuyển sinh khác dùng chung skin để xác nhận dòng dài đã xuống dòng gọn gàng, không còn đè chữ.

### 8.6.4. Xác nhận 8.6.3 OK (2 cột thuộc tính đã xuống dòng gọn, hết đè chữ). Sửa tiếp: link "Nhận Kiếp Lực" bị wrap 1 chữ cái lẻ + popup "Nhận Kiếp Lực" đè số + thiếu khoảng trắng "đổiNlần" (2026-07-04)

Ảnh 1 xác nhận 8.6.3 đã ổn. Phát sinh 2 vấn đề mới, cả 2 đều thuộc dạng "hộp chữ tĩnh quá hẹp cho bản dịch dài hơn bản Hán gốc":

**a) Link "Nhận Kiếp Lực" (dưới nút Phi Thăng) bị wrap, rớt 1 mình chữ "c" xuống dòng 2** — `getItemTxt` trong `SkinReincarnationWin` (class `SamsaraPanel`) có `width=120` nhưng text "Nhận Kiếp Lực" ở size 20 cần ~140px+ → thiếu ~20-30px nên bị word-wrap (label này dùng `textFlow` để bọc thẻ `<a><u>`, và Label dùng `textFlow` mặc định tự word-wrap khi vượt `width`, khác với Label dùng `.text` thường không tự wrap trừ khi bật `multiline`+`wordWrap` như đã làm ở 8.6.3). Sửa: tăng `width` từ 120 → 160, đủ chỗ cho cả dòng, không cần đổi chữ.

**b) Popup "Nhận Kiếp Lực" (mở khi bấm link trên, skin `GainYeLiSkin`/class `GetSamsaraExpView`) — cả 3 dòng phần thưởng đều bị số đè lên nhãn**: mỗi dòng có nhãn tĩnh "Nhận Kiếp Lực：" cố định tại `x=90` và số tiền (`yeli0`/`yeli1`/`yeli2`) cố định tại `x=190` — khoảng cách 100px giữa 2 mốc này đủ cho bản Hán gốc ngắn nhưng không đủ cho "Nhận Kiếp Lực：" (~180-200px ở size 22). Không gian khả dụng cho cả nhãn + số trên 1 dòng chỉ có ~213px (từ sau icon vật phẩm x=90 đến trước nút Đổi/Mua x=303) — không đủ chứa "Nhận Kiếp Lực：" + số 5-6 chữ số dù có canh chỉnh lại vị trí, nên lần này **thật sự phải rút gọn chữ** (không còn cách nào khác ngoài rút gọn hoặc build lại layout nhiều dòng phức tạp hơn nhiều, rủi ro cao hơn khi không xem trước được). Sửa: rút gọn nhãn "Nhận Kiếp Lực：" → **"Kiếp Lực："** (bỏ "Nhận" — vẫn rõ nghĩa vì cạnh đó có icon + nút Đổi/Mua) ở cả 3 dòng (`_Label3_i`/`_Label7_i`/`_Label10_i`), đồng thời dời số `yeli0`/`yeli1`/`yeli2` từ x=190 sang x=210 để có thêm biên an toàn.

**c) Phát hiện thêm khi đọc code cùng khu vực**: dòng "Hôm nay còn có thể đổi{N}lần" ở cả 3 hàng thật ra là 3 Label riêng (nhãn, số, "lần") ghép trong `eui.HorizontalLayout` với `gap=0` — hợp lý cho tiếng Hán (không cần khoảng trắng giữa chữ) nhưng tiếng Việt dính liền thành "đổi3lần" mất khoảng trắng. Sửa: đổi `gap` từ 0 → 4 cho cả 3 `_HorizontalLayout1_i`/`_HorizontalLayout2_i`/`_HorizontalLayout3_i`.

- Lưu ý về rủi ro: đây là **lần đầu trong toàn bộ quá trình fix UI phải rút gọn chữ thay vì chỉ di dời/mở rộng**, vì phép tính không gian xác nhận không đủ chỗ dù đã tối ưu vị trí. Số x=210 cho `yeli0/1/2` là ước lượng dựa trên độ dài ký tự (chưa đo pixel thật), có thể cần chỉnh thêm 1 vòng nếu ảnh chụp cho thấy vẫn còn hơi lệch — theo đúng quy trình lặp đã dùng nhiều lần trong dự án.
- Xác minh: cả 8 khối sửa (`getItemTxt_i`, `_Label3_i`, `yeli0_i`, `_Label7_i`, `yeli1_i`, `_Label10_i`, `yeli2_i`, và cặp Group+HorizontalLayout×3) đều duy nhất trong file trước khi sửa (đối chiếu bằng khối code lớn kèm ngữ cảnh xung quanh vì tên hàm `_Label3_i`/`_Group2_i`/`_HorizontalLayoutN_i` bị trùng tên ở hàng chục class khác trong cùng file). `node -c` qua được.
- **Chưa xác nhận trực quan** — cần deploy + gửi ảnh lại đúng: (1) link "Nhận Kiếp Lực" dưới nút Phi Thăng có còn 1 dòng không, (2) cả 3 dòng trong popup đổi Kiếp Lực đã hết đè số, (3) dòng "Hôm nay còn có thể đổi X lần" đã có khoảng trắng.

### 8.6.5. Người dùng phản hồi: thay vì rút gọn "Nhận Kiếp Lực：" → đổi sang xuống dòng (giữ nguyên chữ đầy đủ) (2026-07-04)

Sau khi xem lại, người dùng đề nghị không rút gọn chữ mà đưa số tiền thưởng xuống dòng riêng — khớp đúng nguyên tắc ưu tiên đã thống nhất từ đầu dự án (di dời/mở rộng trước, chỉ rút gọn khi thật sự bắt buộc). Rà lại thấy vẫn đủ khoảng trống dọc để làm theo cách này mà **không cần rút gọn**: khoảng cách gốc giữa dòng nhãn (top=26) và dòng thông tin kế tiếp (yeli4/name, top=72) là 46px — dư đủ để chèn thêm 1 dòng số ở giữa.

- Đảo ngược lại chữ: `"Kiếp Lực："` → **`"Nhận Kiếp Lực："`** (giữ nguyên bản đầy đủ) cho cả 3 dòng (`_Label3_i`/`_Label7_i`/`_Label10_i`).
- Đưa số tiền (`yeli0`/`yeli1`/`yeli2`) xuống dòng riêng ngay dưới nhãn: đổi từ `x=210,top=26` (cùng dòng, sát nhãn) sang **`x=90,top=50`** (dòng mới, thẳng hàng lề trái với nhãn phía trên) — nhãn ở top=26 không đổi.
- Dời dòng thông tin kế tiếp (`yeli4`/`name1`/`name2`, vốn là "Đổi cấp：giảm 1 cấp" hoặc tên vật phẩm) từ `top=72` xuống **`top=76`** (né dòng số mới chèn vào, cách 26px sau dòng số — đủ 1 dòng chữ size 22).
- Dời `limit_i` ("Cấp trên 110 có thể đổi", chỉ có ở hàng 1) từ `y=96` xuống **`y=100`** để giữ đúng khoảng cách tương đối 24px so với dòng phía trên (như bản gốc `96-72=24`).
- Tổng cộng mỗi hàng giờ có 3 dòng dọc (nhãn → số → thông tin kế) thay vì 2 dòng chật chội trước đó, không đổi chữ, không tăng chiều cao khung tổng thể (vẫn nằm trong `height=122` của mỗi hàng, có kiểm tra khoảng hở giữa các khung `gr1/gr2/gr3` đủ dư phòng trường hợp dòng cuối hàng 1 sát mép dưới).
- Đối chiếu: mọi khối sửa (bao gồm `yeli0_i`/`_Label3_i`/`yeli4_i`/`limit_i`/`_Label7_i`/`yeli1_i`/`name1_i`/`_Label10_i`/`yeli2_i`/`name2_i`) đều xác nhận duy nhất trong file trước khi sửa. `node -c` qua được.
- **Chưa xác nhận trực quan** — cần deploy + gửi ảnh lại cả 3 dòng phần thưởng trong popup "Nhận Kiếp Lực" để xác nhận đã xuống dòng gọn gàng, không đè chữ, và hàng 1 (có thêm dòng "Cấp trên 110 có thể đổi") không bị tràn xuống dưới khung.

### 8.6.6. Xác nhận 8.6.5 OK (phần nhãn/số đẹp rồi). Sửa tiếp: dòng tên vật phẩm + icon giá vàng đè nhau ở hàng 2/3 (Phi Thăng Đan/Kim Đan Phi Thăng) (2026-07-04)

Ảnh xác nhận phần trên (nhãn "Nhận Kiếp Lực：" + số xuống dòng riêng) đã đẹp. Còn sót: ở hàng 2 và 3 (chỉ hiện khi người chơi chưa có sẵn vật phẩm trong túi), tên vật phẩm ("Phi Thăng Đan"/"Kim Đan Phi Thăng", `name1`/`name2`, x=90 top=76) và cụm icon-vàng+giá (`priceIcon1`/`priceIcon2`, component `PriceIcon2` cao 36, vốn đặt `x=190, top=65` — cùng hàng với tên) đè lên nhau, y hệt kiểu lỗi "2 phần tử cùng hàng cố định vị trí, chữ dịch dài hơn bản gốc nên tràn vào nhau" đã gặp nhiều lần.

- **Sửa theo đúng hướng người dùng đã chọn ở 8.6.5 (xuống dòng thay vì rút gọn)**: đưa `priceIcon1`/`priceIcon2` xuống dòng riêng bên dưới tên vật phẩm — đổi `top=65,x=190` → **`top=96,x=90`** (thẳng lề trái với các dòng phía trên, cách dòng tên khoảng 20px).
- Đã tính toán khoảng trống dọc còn lại trong khung hàng (cao 122, có ~13px đệm trước khi chạm khung hàng kế tiếp — đo được từ vị trí tuyệt đối của `gr1`/`gr2`/`gr3` trong `anigroup`) để đảm bảo `priceIcon` (cao 36) kết thúc ở y≈132, nằm trong biên an toàn (122+13=135).
- Đối chiếu: cả 2 khối `priceIcon1_i`/`priceIcon2_i` xác nhận duy nhất trong đúng class `SkinGainYeLi` trước khi sửa (file có 1 cặp `priceIcon1_i`/`priceIcon2_i` trùng tên khác thuộc class khác, đã loại trừ bằng cách đối chiếu toàn bộ nội dung khối). `node -c` qua được.
- **Chưa xác nhận trực quan** — cần deploy + xem lại hàng 2 và 3 khi CHƯA có vật phẩm trong túi (để icon-vàng+giá hiển thị) xác nhận đã xuống dòng, hết đè lên tên vật phẩm.

### 8.6.7. Rút gọn chữ theo yêu cầu người dùng: "Hôm nay còn có thể đổi" → "Còn có thể đổi" trong popup Nhận Kiếp Lực (2026-07-04)

Người dùng yêu cầu trực tiếp bỏ bớt chữ "Hôm nay" ở dòng "Hôm nay còn có thể đổi N lần" cho gọn (không phải do thiếu chỗ, đơn thuần muốn ngắn hơn) — sửa cả 3 dòng (`_Label5_i`/`_Label8_i`/`_Label11_i` trong `SkinGainYeLi`, đúng 3 dòng dùng chung với `_HorizontalLayout1/2/3_i` đã sửa `gap` ở 8.6.4).

- Xác nhận có tổng cộng 4 chuỗi "Hôm nay còn có thể đổi" trong `default.thm`, nhưng chỉ sửa đúng 3 chuỗi thuộc `SkinGainYeLi` (đối chiếu duy nhất bằng khối code đầy đủ); chuỗi thứ 4 thuộc 1 class/popup hoàn toàn khác (biến `toDay0` dùng khác kiểu ở đó) — không đụng vào vì không có bằng chứng đây cũng đang lỗi, và người dùng chỉ đề cập popup "Nhận Kiếp Lực".
- `node -c` qua được.
- **Chưa xác nhận trực quan** — cần deploy + xem lại xác nhận đã đổi thành "Còn có thể đổi N lần".

### 8.6.8. Theo yêu cầu người dùng: dời icon-vàng+giá (priceIcon1/priceIcon2) sang canh giữa theo nút Mua thay vì thẳng lề trái với tên vật phẩm (2026-07-04)

Ở 8.6.6 đã đưa `priceIcon1`/`priceIcon2` xuống dòng riêng, thẳng lề trái `x=90` (cùng cột với tên vật phẩm). Người dùng yêu cầu đổi sang canh giữa theo chiều ngang của nút "Mua" (`btn1`/`btn2`) thay vì lề trái.

- Tính vị trí tâm nút Mua trong nhóm cha `gr2`/`gr3` (rộng 444): nút neo `right=11, width=130` → tâm nút = 444-11-130/2 = 368. Tâm nhóm cha (rộng 444, `horizontalCenter=0`) nằm ở 222. Lệch giữa 2 tâm = 368-222 = **146**.
- Đổi `t.x = 90` → **`t.horizontalCenter = 146`** cho cả `priceIcon1_i`/`priceIcon2_i` — dùng `horizontalCenter` (canh theo tâm phần tử, không phụ thuộc bề rộng thật của `PriceIcon2` mà ta không đo chính xác được) thay vì tính `x` cố định, đảm bảo canh giữa đúng theo tâm nút bất kể icon+số rộng bao nhiêu. Giữ nguyên `top=96` (đã xác nhận nằm dưới tên vật phẩm ở 8.6.6, cũng đã nằm dưới nút Mua theo ước tính chiều cao nút).
- `node -c` qua được.
- **Chưa xác nhận trực quan** — cần deploy + xem lại hàng 2/3 lúc chưa có vật phẩm trong túi để xác nhận icon-vàng+giá đã canh giữa đúng theo nút Mua.

### 8.6.9. Tinh chỉnh nhỏ theo yêu cầu: nhích icon-vàng+giá lên 3px để canh giữa khoảng trống giữa đáy nút Mua và cạnh dưới hàng (2026-07-04)

Ảnh xác nhận canh giữa theo chiều ngang (8.6.8) đã đúng theo tâm nút Mua. Người dùng yêu cầu tinh chỉnh thêm theo chiều dọc: nhích `priceIcon1`/`priceIcon2` lên 2-3px để nằm giữa khoảng trống (đáy nút Mua → cạnh dưới khung hàng), thay vì hơi lệch xuống dưới như hiện tại.

- Đổi `t.top = 96` → **`t.top = 93`** (nhích lên 3px) cho cả `priceIcon1_i`/`priceIcon2_i`. Không đổi `horizontalCenter`.
- `node -c` qua được.
- **Chưa xác nhận trực quan** — cần deploy + xem lại xác nhận đã canh giữa đẹp theo cả 2 chiều.

### 8.6.10. Tinh chỉnh thêm: `top=93` → `top=88` cho icon-vàng+giá (2026-07-04)

Người dùng xác nhận hướng đúng, chỉ cần nhích lên thêm chút nữa. Đổi `t.top = 93` → **`t.top = 88`** cho cả `priceIcon1_i`/`priceIcon2_i` trong `SkinGainYeLi`. `node -c` qua được.

## 8.7. Bug thật trong logic đăng nhập (không phải UI skin): màn chọn server không biến mất sau khi bấm "进入游戏", đè lên màn loading kế tiếp — lỗi ngẫu nhiên do race condition (2026-07-04)

Người dùng phát hiện: sau khi bấm nút "进入游戏" (Vào Game) ở màn chọn server (`Túy Võ Hiệp - Server 1`), đúng ra màn này phải biến mất để lộ màn loading "登录即送" (thưởng đăng nhập) phía sau, nhưng **có lúc nó biến mất, có lúc không** — khi không biến mất thì đè chồng lên màn loading.

**Truy vết**: đây không phải UI skin (`default.thm`) mà là logic thật trong `main.min_d7aad928.js`, class `GameSelectServeUI` (view chọn server, xác nhận qua các hàm `setServerList`/`onClickInGame`/`userInServer` khớp đúng dữ liệu `serverList` truyền từ `index.php`). Hàm dọn dẹp/đóng view của chính nó:

```js
e.prototype.callBack = function () {
    this.stage && ( // ⚠️ TOÀN BỘ logic dọn dẹp bị gói trong điều kiện này
        ReportMessage.GetInstance().sendReport(...),
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddStage, this),
        this.stage.removeEventListener(egret.Event.RESIZE, this.OnSetWin, this),
        ...(4 dòng removeEventListener khác)...,
        this.parent && (this.parent.removeChild(this), ResourceMgr.ins().destroyWin()), // dòng THỰC SỰ xoá view khỏi màn hình
        GameLogin.ins().notifySeletedServ()
    )
};
```

**Nguyên nhân gốc**: `callBack()` được gọi bất đồng bộ (sau khi server phản hồi đăng nhập thành công, qua `SDkMsg.GetInstance().setLoginCallBack(this.callBack,this)`). Toàn bộ thân hàm — kể cả dòng quan trọng nhất `this.parent.removeChild(this)` (dòng thực sự làm màn chọn server biến mất) — bị đặt phía sau điều kiện `this.stage&&`. Nếu phản hồi đăng nhập về **quá nhanh** (trước khi thuộc tính `.stage` của view kịp được engine gán — một thời điểm phụ thuộc tốc độ mạng/thiết bị, giải thích chính xác vì sao "có lúc bị có lúc không"), `this.stage` đọc ra `null`/`undefined` tại thời điểm đó → toàn bộ nhánh dọn dẹp bị bỏ qua hoàn toàn → `removeChild` không bao giờ được gọi → màn chọn server ở lại vĩnh viễn trên màn hình, đè lên các scene sau.

**Sửa**: bỏ điều kiện bọc ngoài `this.stage&&(...)` (không còn lý do gì để toàn bộ việc dọn dẹp phụ thuộc vào việc `.stage` đã kịp gán hay chưa), chỉ giữ lại kiểm tra null-safe đúng chỗ cần: đổi dòng `this.stage.removeEventListener(...)` (dòng DUY NHẤT thật sự cần `.stage` tồn tại, nếu không sẽ ném lỗi `Cannot read property của null`) thành `this.stage&&this.stage.removeEventListener(...)`. Toàn bộ các dòng còn lại (kể cả `this.parent&&(this.parent.removeChild(this),...)` — đã tự có guard `this.parent&&` sẵn, đúng điều kiện cần) giờ luôn chạy không điều kiện, đảm bảo view luôn được gỡ bỏ đúng lúc đăng nhập xong bất kể tốc độ phản hồi nhanh hay chậm.
- Xác minh khối `callBack` sửa là duy nhất trong file. `node -c` qua được.
- Đây là **bug có sẵn trong code gốc** (không liên quan dịch thuật), thuộc dạng race-condition kinh điển (thứ tự thực thi phụ thuộc thời gian phản hồi mạng) — giải thích chính xác hành vi "ngẫu nhiên" người dùng mô tả.
- **Trạng thái xác nhận (2026-07-04)**: người dùng test lại sau khi deploy + clear cache, báo "vẫn thấy" 1 lần nhưng ngay sau đó xác nhận "thấy đỡ bị rồi" (tần suất giảm rõ rệt). Vì đây là race condition, việc còn xảy ra không thường xuyên sau khi sửa là **kỳ vọng đúng** (đã giảm nguy cơ, không phải bảo đảm tuyệt đối 100% nếu vẫn còn đường khác dẫn tới cùng hiện tượng) — cần tiếp tục theo dõi thêm, đặc biệt chú ý thời điểm thanh loading đạt đúng 100% xem màn chọn server có tự biến mất không. Tạm coi là cải thiện đáng kể, chưa đóng hẳn mục này cho đến khi có xác nhận ổn định qua nhiều lần thử.

## 8.8. Vị trí background/nút bấm/tiếng Trung ở màn chọn server + màn loading "登录即送", và dịch các chuỗi text thật (2026-07-04)

Người dùng hỏi: background, nút bấm, tiếng Trung ở 2 màn (màn chọn server sau khi đăng nhập, và màn loading "登录即送" hiện ra sau khi bấm "进入游戏") nằm ở đâu trong code, và nhờ dịch nút đăng nhập/chọn server sang tiếng Việt.

**Lưu ý quan trọng**: cả 2 màn này KHÔNG dùng skin/exml (không nằm trong `default.thm_70915153.js`) mà được dựng **hoàn toàn bằng code** (tạo trực tiếp `new eui.Image()`, `new eui.Button()`... rồi gán thuộc tính bằng tay) trong `main.min_d7aad928.js`.

**Vị trí từng phần**:
- Class `GameSelectServeUI` (`main.min_d7aad928.js`): dựng màn chọn server (danh sách server, nút "进入游戏", nút "点击选区"...).
- Class `GameLoadingUI`: dựng UI của màn loading (thanh progress, link "重新加载" khi lỗi).
- Class `GameLoadingShowBg`: load ảnh nền cho màn loading.
- Class `GameloadMgr`: phát ra các thông báo tiến trình loading (`HttpProperty.setLoadProgress(...)`).
- Ảnh nằm ở `resource/eui/loading/`: `startBtn.png` (nút "进入游戏"), `selectServerBtnBg.png` (nút "点击选区"), `statemessage.png` (3 nhãn trạng thái "新服"/"火爆"/"维护"), `selecServerBg.png` (thanh nền xám, không chữ), `sverBg.png` (nền popup danh sách server đầy đủ, có chữ "选择服务器" — popup con khác, không phải màn chính trong ảnh chụp), `loading.jpg` (nền toàn màn cho màn "登录即送": có "登录即送"/"监兵白虎"/"高级天书盒").

**GIỚI HẠN QUAN TRỌNG — 2 nút người dùng yêu cầu dịch KHÔNG dịch được bằng code**: nút "进入游戏" (`startBtn.png`) và nút "点击选区" (`selectServerBtnBg.png`) đều là **ảnh bitmap đã bake sẵn chữ Trung Quốc vào pixel** (xác nhận bằng cách xem trực tiếp file ảnh + xác nhận trong code gán qua `.icon=` chứ không phải `.label=`/`.text=`). Muốn dịch 2 nút này bắt buộc phải **vẽ lại ảnh** (Photoshop/design tool), không thể sửa bằng sửa text/code trong phiên làm việc này (không có công cụ tạo/sửa ảnh). Tương tự, nền `loading.jpg` của màn "登录即送" cũng là bitmap bake sẵn chữ, không dịch được bằng code.

**Đã dịch được (chuỗi text thật, không phải bitmap)** trong `main.min_d7aad928.js`:
| Chuỗi gốc | Vị trí | Bản dịch |
|---|---|---|
| `无法进入游戏请点击 ` | `GameLoadingUI`, `loadGameText1.text` | `Không thể vào game, vui lòng nhấn ` |
| `<font color='#00FF00'><u>重新加载</u></font>` | `GameLoadingUI`, `loadGameText.textFlow` | `<font color='#00FF00'><u>Tải lại</u></font>` |
| `解压配置中，此过程不产生流量` | `GameloadMgr` | `Đang giải nén cấu hình, quá trình này không phát sinh lưu lượng` |
| `(正在加载游戏必要资源)` (2 chỗ) | `GameloadMgr` | `(Đang tải tài nguyên cần thiết của game)` |
| `(正在登录游戏中)` (3 chỗ) | `GameloadMgr` | `(Đang đăng nhập vào game)` |
| `开服时间未到` | `GameSelectServeUI`, `MsgBox.show` | `Chưa đến giờ mở server` |
| `最近登陆` | `GameSelectServeUI`, nhãn nhóm server | `Đăng nhập gần đây` |
| `服务器正在维护中` | `GameSelectServeUI`, `MsgBox.show` | `Server đang bảo trì` |
| `本服为测试服` | `GameSelectServeUI`, `MsgBox.show` | `Đây là server thử nghiệm` |
| `正在登录中，请稍等` | `GameSelectServeUI`, `this.setTips` | `Đang đăng nhập, vui lòng chờ` |
| `登录失败，请稍等重试` | `GameSelectServeUI`, `this.setTips` | `Đăng nhập thất bại, vui lòng chờ và thử lại` |
| `请求登录中，请稍等` | `GameSelectServeUI`, `this.setTips` (trước login WeChat) | `Đang yêu cầu đăng nhập, vui lòng chờ` |

**Cố ý bỏ qua**: `授权失败`/`授权成功` (chỉ nằm trong `console.log()`, không hiện ra UI, không có giá trị dịch); hậu tố `"区"` trong `o[0]+"-"+o[1]+"区"` (ghép chuỗi logic nhóm server, hiện không dùng tới vì `index.php` chỉ có 1 server nên tính năng nhóm >10 server đang không hoạt động — sửa sẽ cần đổi logic code chứ không phải thay chuỗi đơn thuần).

Xác minh: mỗi chuỗi đếm đúng số lần xuất hiện dự kiến trước khi thay (dùng `content.count()` qua Python), không có ký tự `'`/`"` lạ lẫn trong giá trị tiếng Việt, `node -c` qua được sau khi sửa.

**Ảnh nền màn 1 chưa xác định được file cụ thể**: nền núi hồng "Say Môn Giang Hồ" ở màn đầu tiên (trước khi bấm vào game) không khớp với `loading.jpg` và chưa xác minh được có phải 1 trong các file `loading0.jpg`/`loading1.jpg`/`loading2.jpg`/`loading3.jpg` hay không (có phát hiện pattern code `this.cdnUrl+"agentAssets/"+t+"/loading.jpg"` cho phép override theo agent nhưng chưa kiểm tra file thực tế trên đĩa) — nếu người dùng cần dịch chữ trong ảnh đó, cần hỏi lại để xác định đúng file trước.

## 8.9. Bug ở 8.7 "tái xuất hiện" sau khi đã vá — hoá ra là do CACHE FILE TĨNH, không phải code sai (2026-07-04)

Người dùng báo lại (kèm ảnh `IMG_0442`): màn chọn server ("Túy Võ Hiệp - Server 1  点击选区" + nút "进入游戏") vẫn còn hiện, đè lên màn loading "登录即送" phía sau (đang ở 64%, có thông báo lỗi resource "Không thể vào game, vui lòng nhấn Tải lại") — đúng hiện tượng đã sửa ở mục 8.7, nhưng "Giờ lại thấy bị lại".

**Kiểm tra lại code trước khi nghi ngờ gì khác**: đọc lại nguyên văn `e.prototype.callBack` hiện tại trong `main.min_d7aad928.js` — xác nhận bản vá ở 8.7 **vẫn đúng, vẫn còn nguyên trong file**, dòng `this.parent&&(this.parent.removeChild(this),ResourceMgr.ins().destroyWin())` vẫn chạy vô điều kiện (không bị `this.stage&&` bọc ngoài nữa). Vậy code hiện tại là ĐÚNG — vấn đề không phải do sửa sai hay sửa thiếu.

**Truy thêm luồng gọi `callBack`**: `SDkMsg.entryType` trong `index.php` là `"js"` → `SDkMsg.sdkType="js"`. Trong `GameSelectServeUI.userInServer()`, với điều kiện thực tế của server này (`HttpProperty.openID` đã có sẵn giá trị hợp lệ trước khi vào màn chọn server), nhánh chạy là gọi `this.callBack()` **đồng bộ, ngay trong cùng lệnh gọi hàm xử lý click nút "进入游戏"** — không phải một callback bất đồng bộ chờ phản hồi mạng như giả định ban đầu ở 8.7. Vì gọi đồng bộ ngay trong click handler, `this.parent`/`this.stage` chắc chắn khác `null` tại thời điểm đó → hàm `callBack()` chắc chắn chạy đúng, `removeChild` chắc chắn được gọi.

**Vậy vì sao người dùng vẫn thấy bug?** → **Nguyên nhân thật: cache file JS tĩnh, không phải lỗi logic.**
- `js/main.min_d7aad928.js` và `js/default.thm_70915153.js` có tên file chứa **hash cố định trong tên** (kiểu file "build 1 lần rồi không đổi tên nữa").
- `index.php` nạp các file này qua `<script src="./js/xxx_hash.js">` (dựng động từ `manifest.json`) **không có query string cache-busting nào** — xem hàm `loadSingleScript` (index.php dòng ~199-210): `s.src = "./" + src` (không có `?v=...`).
- `manifest.json` bản thân nó được fetch với `?v=2555a410` cố định (index.php dòng 213) — hằng số này **chưa từng đổi**, nên các CDN/proxy trung gian (hoặc cache HTTP của trình duyệt di động) có thể tiếp tục phục vụ bản `manifest.json` VÀ bản `main.min_d7aad928.js`/`default.thm_70915153.js` **CŨ** dù nội dung trên server đã được ghi đè, vì đối với các tầng cache này, "URL không đổi" = "không cần tải lại", bất kể nội dung phía sau URL đó thực sự đã đổi.
- Điều này giải thích chính xác pattern người dùng gặp: "Vẫn thấy nha, đã chép đè và clean cache rồi" → "Thấy đỡ bị rồi" (cache tự hết hạn/đổi ở 1 vài lớp) → "Giờ lại thấy bị lại" (một lớp cache khác — CDN, nhà mạng, hoặc chính thiết bị test — vẫn còn giữ bản cũ). Đây là hệ quả tất yếu của việc sửa file mà **giữ nguyên tên file**, không phải do bản vá race-condition ở 8.7 sai.

**Đã sửa (lần này sửa tận gốc vấn đề cache, không đụng lại logic code)**:
- Đổi tên `js/main.min_d7aad928.js` → `js/main.min_8e343ef1.js`.
- Đổi tên `js/default.thm_70915153.js` → `js/default.thm_46501425.js`.
- Cập nhật `manifest.json` (mảng `game`) trỏ đúng 2 tên file mới.
- Bump `index.php` dòng fetch `manifest.json?v=2555a410` → `manifest.json?v=8e343ef1` để đảm bảo bản thân `manifest.json` cũng bị buộc tải lại (nếu không, dù đã đổi tên 2 file JS, trình duyệt/CDN vẫn có thể phục vụ `manifest.json` cache cũ trỏ về tên file cũ đã không còn tồn tại → lỗi 404 khi vào game).
- Đã thêm **quy ước bắt buộc mới** vào đầu file (mục "Quy ước làm việc"): từ nay, MỌI lần sửa `js/main.min_*.js` hoặc `js/default.thm_*.js` đều phải đổi tên file sang hash mới + cập nhật `manifest.json` + bump `?v=` trong `index.php`, cùng 1 commit — để tránh lặp lại đúng vấn đề này ở các lần sửa UI/logic sau này (kể cả các lần sửa skin ở mục 8.6 trước đây, dù người dùng xác nhận đã thấy đúng, vẫn tiềm ẩn rủi ro cache tương tự cho các máy/mạng khác chưa test tới).
- Xác minh: `grep` toàn repo không còn tên file cũ nào bị tham chiếu sót (chỉ `manifest.json` tham chiếu 2 file này, đã cập nhật đủ); dùng `git mv` để giữ lịch sử file.

**Việc người dùng cần làm khi test lại**: mở bằng tab ẩn danh (private/incognito) hoặc 1 thiết bị/mạng khác chưa từng load trang trước đó, để loại trừ hoàn toàn khả năng cache cũ can thiệp — vì lần này tên file đã thực sự đổi nên bất kỳ tầng cache nào cũng buộc phải tải bản mới.

## 8.10. TÌM RA NGUYÊN NHÂN THẬT SỰ của bug chồng chéo màn chọn server / loading — không phải race condition ở 8.7, không phải cache ở 8.9, mà là 1 dòng code LUÔN LUÔN chạy sai (2026-07-04)

Sau khi sửa cache ở 8.9, người dùng test lại và **vẫn thấy chồng chéo** (ảnh `IMG_0446`): thanh chọn server ("Túy Võ Hiệp - Server 1" + nút "Chọn máy chủ"/"Bắt Đầu" — đã có ảnh dịch sẵn) đè lên màn loading phía sau đang hiện "Đang giải nén cấu hình..." + "Không thể vào game, vui lòng nhấn Tải lại" + thanh progress ở 100%.

**Truy tận gốc lần này tìm ra nguyên nhân thật, không phải 2 giả thuyết trước**:

Hàm `GameLoadingUI.prototype.timeEnd(t)` được gọi tự động 500ms sau MỖI LẦN `HttpProperty.setLoadProgress(t, msg)` chạy xong hiệu ứng thanh progress (xem `setProgress`: `...call(this.timeEnd,this,[t])`). Code gốc:

```js
e.prototype.timeEnd = function (t) {
    50 == t && (
        "dev" == SDkMsg.GetInstance().channelid
            ? window.HttpPropertyload
            : window.ARGS
                ? window.HttpPropertyload || (GameSelectServeUI.GetInstance().show(this.parent), this.setProgressPane(!1))
                : window.HttpPropertyload
    )
}
```

- Server này cấu hình `channelid="abc"` (không phải `"dev"`), và `window.ARGS` LUÔN có giá trị (được gán thẳng trong `index.php`: `var ARGS = "<?php echo $args?>";`) → luôn rơi vào nhánh giữa: `window.HttpPropertyload||(GameSelectServeUI.GetInstance().show(this.parent),this.setProgressPane(!1))`.
- Đã `grep` **toàn bộ** `main.min.js` (15 lần xuất hiện `HttpPropertyload`) — biến này **CHỈ ĐƯỢC ĐỌC, KHÔNG BAO GIỜ ĐƯỢC GÁN GIÁ TRỊ** ở bất kỳ đâu trong toàn repo (không trong `main.min.js`, không trong `index.php`, không trong bất kỳ file JS nào khác). Biến này chỉ có ý nghĩa khi có 1 "adapter" SDK bên thứ 3 tự gán `window.HttpPropertyload=true` (dành cho các kênh phát hành nhúng SDK riêng) — server này dùng cấu hình mặc định (`agentId:"abc"`), không có adapter nào như vậy, nên biến này **VĨNH VIỄN `undefined` (falsy)**.
- Hệ quả: `window.HttpPropertyload||(...)` → do vế trái luôn falsy → **vế phải LUÔN LUÔN chạy** → `GameSelectServeUI.GetInstance().show(this.parent)` **luôn được gọi lại, hiện lại y nguyên màn chọn server**, mỗi khi thanh loading chạy xong hiệu ứng ở mốc đúng `t=50`. Tra thêm thấy mốc `t=50` được dùng chính xác ở bước `HttpProperty.setLoadProgress(50,"(Đang đăng nhập vào game)")` — tức là **BƯỚC BÌNH THƯỜNG, LUÔN XẢY RA** trong mọi lượt đăng nhập thành công, không phải bước lỗi/hiếm gặp. Vào lúc hàm này chạy, người dùng chắc chắn ĐÃ chọn xong server rồi (đó là điều kiện cần để luồng đăng nhập tiến tới bước này) — nên việc hiện lại màn chọn server ở đây **luôn luôn sai**, 100% lần nào cũng xảy ra, không phải ngẫu nhiên.
- Đây giải thích tại sao bug "vẫn thấy" dù đã sửa race condition ở 8.7 (đúng nhưng không phải nguyên nhân chính) và dù đã sửa cache ở 8.9 (đúng và cần thiết nhưng không giải quyết được bug này, vì bug này không liên quan gì tới cache — code cũ hay mới đều có lỗi y hệt).

**Đã sửa**: bỏ hành động `GameSelectServeUI.GetInstance().show(this.parent),this.setProgressPane(!1)` ở nhánh `window.ARGS` (vì với cấu hình server này không bao giờ có lý do hợp lệ để hiện lại màn chọn server ở bước này), giữ nguyên cấu trúc rẽ nhánh (không đụng nhánh `"dev"` hay hành vi đọc `window.HttpPropertyload` cho các cấu hình adapter khác nếu sau này có dùng tới):

```js
e.prototype.timeEnd = function (t) {
    50 == t && ("dev" == SDkMsg.GetInstance().channelid ? window.HttpPropertyload : window.ARGS ? window.HttpPropertyload : window.HttpPropertyload)
}
```

- Xác minh khối cũ là duy nhất trong file trước khi sửa, `node -c` qua được.
- **Theo đúng quy ước mới ở 8.9**: đổi tên `main.min_8e343ef1.js` → `main.min_4cb265d1.js`, cập nhật `manifest.json`, bump `index.php` dòng `manifest.json?v=` → `4cb265d1`, cùng 1 commit với sửa code.
- Người dùng cần test lại bằng tab ẩn danh/thiết bị mới sau khi copy đủ 4 file (`index.php`, `manifest.json`, `js/default.thm_46501425.js`, `js/main.min_4cb265d1.js`) lên server thật.

## 8.11. Sửa chồng chéo số liệu trong popup "Thu nhập offline" (ảnh IMG_0392, 2026-07-04)

Người dùng gửi ảnh popup "Thu nhập offline": 2 cột "Thu nhập offline" và "Thu nhập thêm từ Thẻ Tháng", mỗi cột có các dòng Đồng/Kinh nghiệm/Trang bị/Tinh Luyện — nhãn tiếng Việt dài hơn hẳn tiếng Trung gốc nên đè lên số liệu phía sau (vd "Kinh nghiệm：530" bị dính chữ vào số).

**Vị trí code**: `default.thm_*.js`, class `SkinOfflineReward` (`OfflineRewardSkin.exml`). Cấu trúc gốc mỗi dòng: nhãn ở `left=10` (không set `width` nên tự co giãn theo độ dài chữ), số liệu ở `left=70` cố định — ngân sách chỉ 60px giữa 2 mốc này. Với nhãn ngắn kiểu Trung "经验：" thì vừa, nhưng "Kinh nghiệm："/"Tinh Luyện：" tiếng Việt cần ước tính ~130-150px ở cỡ chữ 20 → đè thẳng vào số liệu.

**Đã sửa** (áp dụng cho cả 6 nhãn + 6 số liệu, 2 cột, class `SkinOfflineReward`):
- Cỡ chữ nhãn (Đồng/Kinh nghiệm/Trang bị/Tinh Luyện, cả 2 cột): 20 → 16.
- Đổi dấu hai chấm full-width "：" (chiếm ~1 chữ cái bề ngang) sang dấu hai chấm thường ":" (hẹp hơn nhiều) trong text nhãn.
- Số liệu: `left` 70 → 120 (nhường thêm ~50px cho nhãn), `width` 88 → 67 (vẫn đủ hiển thị số 6 chữ số ở cỡ chữ 20 gốc, không đổi cỡ chữ số để giữ độ nổi bật).
- Cột 2 (`label3_i`/`label5_i`, vốn có `textAlign="center"` nhưng thiếu `width` nên vô tác dụng — đúng quirk `eui.Label` đã ghi ở các mục trước) nay thêm `width=67` để `textAlign="center"` thực sự có tác dụng, số hiện giữa hộp đẹp hơn.
- Đã tính toán bề rộng ước lượng cho nhãn dài nhất ("Kinh nghiệm:") ở cỡ 16 vẫn nằm gọn trong ngân sách left=10→120 (110px); nếu lệch vài px thực tế trên máy, gửi ảnh để mình tinh chỉnh tiếp (không có công cụ render UI trực tiếp trong phiên này nên phải ước lượng rồi canh chỉnh theo ảnh chụp thực tế).
- `node -c` qua được. Theo đúng quy ước ở 8.9: đổi tên `default.thm_46501425.js` → `default.thm_c31ead90.js`, cập nhật `manifest.json`, bump `index.php` dòng `manifest.json?v=` → `c31ead90`.

Cập nhật thêm (cùng ngày): người dùng xác nhận layout đã ổn, yêu cầu đổi tiêu đề cột 2 từ `"Thu nhập thêm từ Thẻ Tháng"` (dài, dễ tràn) thành `"Thêm từ Thẻ Tháng"` (ngắn gọn hơn) trong `label1_i` — đã sửa, đổi tên `default.thm_c31ead90.js` → `default.thm_6d6f7b59.js` + cập nhật `manifest.json`/`index.php` theo đúng quy ước.

## 8.12. Sửa wrap chữ ở banner "Cấp X mở <tên phó bản> (Đã hoàn thành)" trên màn hình chính (ảnh IMG_0451, 2026-07-04)

Người dùng gửi ảnh: banner nổi trên màn chơi (không phải popup) hiện "Cấp 26 mở Phó Bản Tụ Linh (Đã hoàn thành)" bị wrap xuống dòng giữa chừng ("(Đã hoàn" xuống dòng, "thành)" đè lên dòng mô tả bên dưới "Thử thách quan ải để nhanh chóng lên cấp" — dòng này cũng bị wrap tương tự.

**Vị trí code**: class `MainView` trong `main.min.js` — hàm `changeTaskTrace_a94` gán `this.taskTraceName.textFlow=TextFlowMaker.generateTextFlow(e.name+"|C:0x35e62d&T: (Đã hoàn thành)|")` (dòng 1, tên nhiệm vụ + trạng thái) và `this.taskTraceAwards.text=e.desc` (dòng 2, mô tả — nội dung "Thử thách quan ải để nhanh chóng lên cấp" lấy từ `resource/config/config.json`, không phải hardcode). Vì gán qua `.textFlow` (rich text), Egret tự động wrap chữ theo đúng `width` của Label — không cần cờ `wordWrap` riêng.

**Nguyên nhân**: nhãn `taskTraceName_i`/`taskTraceAwards_i` (skin `default.thm.js`) có `width=280`, nhưng câu tiếng Việt (~40 ký tự) ở cỡ chữ 18 cần khoảng 380-420px → vượt quá 280px nên bị wrap.

**Đã sửa**: tăng `width` của cả `taskTraceName_i` và `taskTraceAwards_i` từ 280 → 460 (cả 2 đều đã `horizontalCenter` sẵn nên tăng width vẫn giữ canh giữa đúng, ảnh nền `_Image6_i` (198px) chỉ là hình trang trí phía sau, chữ vốn đã tràn ra ngoài khung ảnh nền từ trước nên không có giới hạn cắt (clip) nào ngăn việc mở rộng thêm).
- `node -c` qua được. Đổi tên `default.thm_6d6f7b59.js` → `default.thm_0d1590b8.js`, cập nhật `manifest.json`/`index.php` theo đúng quy ước cache ở 8.9.

## 8.13. Dịch toàn bộ `notice.config` (thông báo hệ thống ở kênh 综合/chat) — mở đầu Giai đoạn 6 (2026-07-04)

Người dùng gửi ảnh 2 màn chat (IMG_0453/IMG_0454) hỏi về các dòng thông báo kiểu `[系统] 恭喜宛若黎雷超凡入圣，成功突破脱凡境·破妄，战力大增` và `[系统] BOSS霸武白熊出现在魔界入侵！` hiện trong kênh "综合" — yêu cầu tìm và dịch phần này.

**Vị trí phát hiện**: đây KHÔNG nằm trong client (`phpStudy/PHPTutorial/WWW/`) mà là dữ liệu **server-side**, file `server/bin/s1/gameworld/data/config/notice/notice.config` (và bản sao y hệt ở `server/bin/s99/gameworld/data/config/notice/notice.config` — `diff` xác nhận 2 file giống hệt byte-for-byte). File này chính là 1 trong 422 file thuộc **Giai đoạn 6** đã ghi nhận từ trước nhưng chưa từng đụng tới — lần đầu tiên mở Giai đoạn 6.

**Cấu trúc file**: Lua table `NoticeConfig = {[id] = {id=.., type=.., content="..."}, ...}` — mỗi entry chỉ có field `content` chứa text hiển thị (kèm markup riêng `|C:0xRRGGBB&T:...|` để tô màu từng đoạn, và `%s`/`%d`/`[s%d]` là placeholder được server điền số liệu/tên người chơi khi phát broadcast). Các field `id`/`type` là số liệu logic, không đụng tới.

**Đã làm**:
- Trích xuất toàn bộ 379 dòng `content = "..."` (356 chuỗi không trùng lặp, một số id dùng chung 1 câu).
- Dịch toàn bộ 356 chuỗi sang tiếng Việt, giữ nguyên 100% cấu trúc `|C:...&T:...|` (số lượng dấu `|` phải khớp) và thứ tự xuất hiện của mọi `%s`/`%d` (Lua `string.format` điền theo thứ tự, không được đảo vị trí đối số dù được đổi tự do phần chữ xung quanh).
- Dùng lại thuật ngữ Hán Việt đã có sẵn trong glossary/config trước đó để nhất quán xuyên game: `Thoát Phàm Cảnh/Tam Sơn Cảnh/Cửu Tiêu Cảnh/Phi Thăng Cảnh/Tiên Nhân Cảnh/Đại La Cảnh` (6 đại cảnh giới), `Thẻ Tháng`, `Tiên Minh`, `Chiến Thần`, `Lực chiến`...
- Phát hiện thêm **7 tên tiểu giai đoạn tu luyện chưa từng dịch** (`蒙尘/问心/求真/破妄/修法/历劫/大乘`, dùng ghép với 6 đại cảnh giới ở trên thành các mốc kiểu "脱凡境·蒙尘") nằm trong `resource/config/config.json` field `"state":[...]` — dịch bổ sung luôn: `Mông Trần/Vấn Tâm/Cầu Chân/Phá Vọng/Tu Pháp/Lịch Kiếp/Đại Thừa`.
- Danh hiệu "威望" (danh vọng) 11 bậc dịch thành thang: Vô Danh → Lộ Diện → Có Chút Danh Tiếng → Danh Động Một Phương → Danh Bất Hư Truyền → Hách Hách Hữu Danh → Uy Danh Viễn Bá → Ai Ai Cũng Biết → Danh Tiếng Khắp Nơi → Vang Danh Bốn Phương → Danh Chấn Thiên Hạ.
- Xác minh bằng script trước khi ghi file: mỗi cặp gốc/dịch phải khớp đúng số lượng `%s`, `%d`, và `|` — 0 sai lệch trên 356 chuỗi.
- Áp dụng cho **cả `s1` và `s99`** (áp cùng 1 dict, `diff` xác nhận vẫn giống hệt nhau sau khi sửa).
- Xác minh bằng chính trình thông dịch **Lua thật** (`lua -e "loadfile('notice.config')()"`) — load thành công, đếm đúng 379 entries — mạnh hơn kiểm tra cú pháp thông thường vì đây là Lua, không phải JS/JSON.
- Chuỗi `跨服战场` xuất hiện trong file này **đã được dịch** (thành "liên server chiến trường") vì đây chỉ là text hiển thị thuần tuý trong 1 dòng chat broadcast, không liên quan gì tới quy tắc giữ nguyên `跨服战场` đã ghi ở 8.4.7zz (quy tắc đó chỉ áp dụng cho chuỗi bị so sánh `==` với `sceneName` từ server trong `main.min.js` — hoàn toàn khác ngữ cảnh).

**Việc tiếp theo (chưa làm)**: còn 421 file khác trong `data/config/**/*.config` (item.config, monster.config, quest tên/mô tả nhúng thẳng, v.v.) chưa đụng tới — đây là phần lớn nhất còn lại của Giai đoạn 6.

## 8.14. Dịch tên Boss/NPC/quái vật (`lang/monster.config`, `monsters.config`, `lang/boss.config`) bằng chuyển tự Hán-Việt theo ký tự (2026-07-04)

Người dùng gửi ảnh (IMG_0457/IMG_0458) báo vẫn còn thấy nhiều tiếng Trung, và yêu cầu dịch thêm tên Boss/NPC/quái. 2 phát hiện quan trọng:

**1. Phân biệt tin nhắn CŨ vs MỚI trong ảnh IMG_0457**: các dòng `[系统] 恭喜宛若黎雷超凡入圣...`/`聚灵夺阵活动将于3分钟后开启...` trong ảnh là tin nhắn **đã phát trước khi server được nạp lại `notice.config` mới** — 1 khi tin nhắn đã hiện trong khung chat thì nó là text tĩnh, sửa config sau đó không hồi tố các dòng cũ. Bằng chứng: ảnh IMG_0458 (chụp cùng lúc) cho thấy tin nhắn MỚI hơn ("BOSS 彼岸仙灵xuất hiện tại s1 liên server chiến t...") đã dùng ĐÚNG bản dịch tiếng Việt mới — chỉ riêng TÊN BOSS (`彼岸仙灵`) là còn tiếng Trung vì tên quái nằm ở nguồn dữ liệu khác (`monsters.config`/`lang/monster.config`), tách biệt hoàn toàn khỏi `notice.config` mà lượt trước chỉ sửa phần câu thông báo. → xác nhận bản dịch `notice.config` ở 8.13 **hoạt động đúng**, không phải lỗi.

**2. Tìm & dịch tên Boss/NPC/quái**: xác nhận đây chính là hệ thống "dịch nội dung động thứ 2" đã ghi nhận từ trước (`data/config/language/lang/*.config`, 16 file, chưa khám phá) — `monsters.config` (id, hp, atk...) hầu hết không chứa tên trực tiếp mà tham chiếu `name = LAN.MON.mXXXXX`, và `LAN.MON` được định nghĩa trong `data/config/language/lang/monster.config` (`MON = {mXXXXX = "tên", ...}`).

**Chiến lược dịch — chuyển tự Hán-Việt theo từng ký tự** (khác hẳn cách dịch theo câu/cụm từ của `notice.config`): tên quái/boss trong game kiếm hiệp/tu tiên thường là ghép 2-4 chữ Hán (VD "白野猪王", "黑野猪", "妖狐战士") mà quy ước dịch chuẩn cho thể loại này là đọc Hán Việt trực tiếp theo đúng thứ tự chữ gốc (không dịch nghĩa/đảo ngữ) — đúng cách toàn bộ danh xưng/địa danh trong game này đã được dịch xuyên suốt từ đầu dự án (`至尊天龙`→Chí Tôn Thiên Long, `蒙尘`→Mông Trần...). Đã:
- Trích xuất toàn bộ ký tự Hán duy nhất xuất hiện trong `lang/monster.config` (455 ký tự) + phần tên trực tiếp trong `monsters.config` (thêm 31 ký tự) = 486 ký tự.
- Xây bảng tra âm Hán Việt cho từng ký tự (dựa vào kiến thức Hán Việt chuẩn, đối chiếu cách đọc phổ biến trong tiểu thuyết/game kiếm hiệp tiếng Việt).
- Viết script tách chuỗi thành 3 loại token (Hán / chữ-số Latin / ký tự khác), Hán → nối các âm Hán Việt cách nhau bằng khoảng trắng, tự thêm khoảng trắng giữa 2 token "từ" liền kề (vd tránh lỗi `Hạnh VậnBOSS` → sửa thành `Hạnh Vận BOSS`), chuẩn hoá ngoặc full-width `（）` → `()`.
- Áp dụng cho **`data/config/language/lang/monster.config`** (1688 entries, bảng tên quái chính) cho cả `s1`/`s99`.
- Áp dụng cho **445 tên viết trực tiếp** (không qua LAN.MON) trong `data/config/monster/monsters.config` — gồm các boss sự kiện/phó bản như `至尊天龙`→Chí Tôn Thiên Long, `九尾冥仙`→Cửu Vĩ Minh Tiên, `彼岸仙灵`→Bỉ Ngạn Tiên Linh, chuỗi boss "元" (死元/魔元/苍元/天元/荒元 + tên) — cho cả `s1`/`s99`.
- Nhân tiện dịch nốt **`data/config/language/lang/boss.config`** (10 dòng thông báo UI lúc đánh Boss, vd "Cấp độ không đủ, cần cấp %d") cho cả `s1`/`s99`.
- Không tìm thấy file NPC riêng — NPC trong engine này dùng chung cơ chế `monsters.config`/`LAN.MON` (phân biệt qua field `type`), nên đã được bao phủ trong lượt dịch này.
- Xác minh: 0 ký tự Hán sót lại (đã bổ sung đủ 486 ký tự vào bảng tra), số lượng dấu `"` chẵn ở cả 3 file, `s1`/`s99` giữ nguyên giống hệt nhau (`diff` sạch). Lưu ý: cả `monster.config`/`boss.config` (thư mục `lang/`) có 1 dấu `,` thừa sau dấu `}` đóng bảng ở cuối file khiến `lua loadfile()` báo lỗi cú pháp nếu load riêng lẻ — đã xác nhận đây là **quirk có sẵn từ trước** (kiểm tra bản gốc trước khi sửa cũng lỗi y hệt), không phải do sửa gây ra; game server chắc chắn có cơ chế nạp riêng (khác `loadfile` thẳng) vì các tên quái này đã hiển thị đúng trong game từ trước.

**Việc tiếp theo (chưa làm)**: `character.config` (2886 dòng — hỗn hợp nhiều loại dữ liệu: tên quái test, tên skill nhân vật, nhãn "N阶仙羽"...), `item.config`/`achieve.config`/`fuwen.config`/... (14 file còn lại trong `lang/`), phần lớn `data/config/**/*.config` (Giai đoạn 6 gốc, 421 file còn lại).

## 8.15. Dịch tag "［系统］" thành "[Hệ Thống]" + dịch nốt tên các tab chat (2026-07-04)

Người dùng yêu cầu dịch tag `［系统］` (hiện trước mỗi tin nhắn hệ thống trong khung chat) thành `[Hệ Thống]` để phân biệt rõ với chat thường.

**Vị trí**: `main.min.js`, class `ChatsWin` (khung chat) — chuỗi `"|C:0xff965c&T:[系统]|"`/`"|C:0xff965c&T:[系统] |"` được gán làm tiền tố màu cam khi tin nhắn là `ChatsSystemData` (tin hệ thống). Đã đổi cả 2 thành `"|C:0xff965c&T:[Hệ Thống]|"`/`"|C:0xff965c&T:[Hệ Thống] |"`.

Nhân tiện phát hiện và dịch luôn **tên các tab chat phía dưới** (đã thấy trong mọi ảnh chụp màn hình suốt cả phiên: `综合 世界 Tiên Minh 系统 客服`, chỉ có "Tiên Minh" từng được dịch, 4 tab còn lại vẫn tiếng Trung) — hàm dựng mảng tab `["综合",t,"Tiên Minh","系统"]` + `.push("客服")`:
- `综合` → `Tổng Hợp`
- `世界` → `Thế Giới` (trong hàm `getWorldStr()`; nhánh liên server đã có sẵn "Liên server" từ trước, giữ nguyên)
- `系统` → `Hệ Thống`
- `客服` → `Hỗ Trợ`

`node -c` qua được. Đổi tên `main.min_4cb265d1.js` → `main.min_5c17a033.js`, cập nhật `manifest.json`/`index.php` theo đúng quy ước cache ở 8.9.

## 8.16. Bug thật trong hệ thống chat: bấm "Gửi" không có phản hồi khi server từ chối tin nhắn (2026-07-04)

Người dùng báo: gõ chat được nhưng bấm "Gửi" không thấy gửi được (không có gì xảy ra, không lỗi, không tin nhắn).

**Truy vết toàn bộ luồng**:
- Client (`main.min.js`, `ChatsSystem`): bấm Gửi → `sendChatsInfo(7, text)` gửi gói `CMD_Chat` lên server (kênh `7` khớp đúng hằng số `ciChannelAll` bên server, không phải lỗi kênh).
- Server (`server/bin/s{1,99}/gameworld/data/functions/systems/actorsystem/chat.lua`, hàm `sendGlobalMsg`): kiểm tra tuần tự — độ dài tin nhắn (`chatLen=160`), cooldown (`chatCd`), đang bị cấm chat (`shutup`), cấp độ tối thiểu (`openLevel=1`), và số lượt chat còn lại trong ngày theo bậc lực chiến (`ChatLevelConfig`, dựa vào `total_power`). Nếu bất kỳ điều kiện nào không đạt → trả `false` qua gói `ChatMsgResult` (sub-command 3).
- Client nhận `ChatMsgResult`: `doIsSendSuccess=function(t){t.readBoolean()&&this.postSendInfoSuccess()}` — **CHỈ xử lý khi server báo `true`** (xoá ô nhập). Khi server báo `false` (bị từ chối) — **không làm gì cả, không có thông báo lỗi nào hiện ra** → đây chính là nguyên nhân "bấm Gửi không thấy gì".
- Đối chiếu phía server: trong 5 nhánh từ chối của `sendGlobalMsg`, chỉ có DUY NHẤT 1 nhánh (hết lượt chat/ngày) có gọi `sendSystemTips(actor,1,2,"没有发言次数")` để báo cho người chơi (tin này còn tiếng Trung); 4 nhánh còn lại (tin quá dài, chat quá nhanh/cooldown, đang bị cấm chat, cấp độ chưa đủ) chỉ `print()` ra log server — người chơi không thấy gì cả.

**Xác nhận cơ chế hiển thị đã có sẵn và hoạt động đúng** (không cần sửa client): server gọi `sendSystemTips(actor, level, pos, tips)` → gửi gói `Tipmsg` (sub-command 4) → client `doMessageOfSystem_a94` nhận và gọi `UserTips.ins().showCenterTips(s)` khi `pos=2` (banner giữa màn hình) — cơ chế này vốn ĐÃ hoạt động đúng cho nhánh "hết lượt chat" từ trước, chỉ cần server gọi tới cho các nhánh còn lại.

**Đã sửa** (`chat.lua`, cả `s1` và `s99`): thêm `sendSystemTips(actor,1,2,"<thông báo tiếng Việt>")` ngay trước mỗi `return false` còn thiếu:
- Tin quá dài (`utf8len(msg) > global_chat_char_len`) → "Nội dung chat quá dài"
- Cooldown (`var.global_chat_cd > os.time()`) → "Bạn thao tác quá nhanh, vui lòng thử lại sau"
- Đang bị cấm chat (`var.shutup > os.time()`) → "Bạn đang bị cấm chat, vui lòng thử lại sau"
- Cấp độ chưa đủ (`level < global_chat_send_level`) → "Cấp độ chưa đủ để chat"
- Lỗi cấu hình chat (`conf == nil`, nhánh phòng thủ hầu như không xảy ra trong thực tế vì `ChatLevelConfig[1].power=0`) → "Lỗi hệ thống chat, vui lòng thử lại"
- Dịch nốt tin có sẵn "没有发言次数" → "Đã hết lượt chat trong ngày"

Không đụng tới bất kỳ điều kiện logic nào (ngưỡng level/power/cooldown giữ nguyên 100%), chỉ thêm dòng gọi thông báo lỗi vào đúng chỗ code đã có sẵn cơ chế nhưng bị bỏ sót. Xác minh cú pháp bằng `lua loadfile()` cho cả 2 file, `diff` xác nhận `s1`/`s99` giống hệt nhau.

**Lưu ý cho người dùng**: cần restart server game (không phải chỉ copy file, vì đây là code Lua được nạp lúc khởi động) để áp dụng bản sửa này.

## 8.17. Dịch nốt tag "［仙盟］" thành "[Tiên Minh]" (2026-07-04)

Người dùng báo tag `［仙盟］` (hiện trước tin nhắn kênh chat Tiên Minh/guild) vẫn còn tiếng Trung, dù đã sửa `[系统]`→`[Hệ Thống]` trước đó — cùng loại bug, khác chỗ trong cùng class `GuildMessageItem`-kiểu render item chat.

**Vị trí**: `main.min.js`, 2 chỗ (`dataChanged`/`delayChangedData`) đều có nhánh `if(t instanceof GuildMessage)i="|C:0xff965c&T:[仙盟]|"` (và biến thể có khoảng trắng `"[仙盟] |"`) — y hệt cấu trúc đã sửa ở 8.15 cho `ChatsSystemData`/`[系统]`, chỉ khác đây là nhánh `GuildMessage`. Đổi cả 2 thành `[Tiên Minh]` (khớp tên đã dùng cho tab/tính năng 仙盟 xuyên suốt game).

`node -c` qua được, xác nhận 0 occurrence `[仙盟]` còn sót. Đổi tên `main.min_5c17a033.js` → `main.min_0427b4b1.js`, cập nhật `manifest.json`/`index.php` theo quy ước cache ở 8.9.

## 9. Dọn dẹp repo: xoá file không được load / trùng lặp / build cũ (2026-07-03)

Theo yêu cầu người dùng, rà soát repo tìm file an toàn để xoá (không được client/server nào load, hoặc là bản trùng/build cũ đã bị thay thế). Dùng 1 agent con khảo sát toàn repo, sau đó tự tay xác minh lại từng phát hiện trước khi xoá (đối chiếu `manifest.json` thật đang được `index.php` load, so hash file, kiểm tra tham chiếu chéo bằng `grep` toàn bộ `.php/.js/.json/.html`).

**Đã xoá (18 file/thư mục, ~78MB), đã xác minh không bị tham chiếu ở bất kỳ đâu**:
- 10 file JS đã biên dịch cũ trong `phpStudy/PHPTutorial/WWW/js/` (~20MB): `default.thm_f0b18827.js`, `default.thm_f547f824.js`, `main.min_65c7a74d.js`, `main.min_bbfb355d.js`, `main.min_e4f407b1.js`, `egret.min_15d92046.js`, `egret.web.min_376471c7.js`, `eui.min_493403ce.js`, `game.min_16249d0f.js`, `jszip.min_aa236aee.js`. Xác nhận: `phpStudy/PHPTutorial/WWW/manifest.json` (file DUY NHẤT được `index.php` load qua `fetch`/`xhr`) chỉ liệt kê đúng 9 file `initial` + 2 file `game` với hash KHÁC hoàn toàn các file này — đây là output của lần build trước, đã bị thay thế.
- `phpStudy/PHPTutorial/WWW/manifest_0.05.json` và `manifest_0.05_2.json` (giống hệt nhau, không file nào trong repo tham chiếu tới, và nội dung bên trong trỏ tới CDN ngoài `https://hscdn.wxmolegames.com/...` chứ không phải asset local) — cấu hình chết của một cơ chế tải từ CDN từ xa không còn dùng.
- `phpStudy/DownLoad/Update.exe.old` — bản backup cũ của updater (khác hash với `phpStudy/Update.exe` đang dùng).
- `server/bin/centerserver/CenterServer.txt.bak` — file backup thủ công, không có process nào đọc.
- Thư mục `环境/` (58MB): 3 file cài đặt môi trường dev một lần (`1.安装常用运行库合集.exe` — bộ cài runtime VC++, `2.安装N++.exe` — cài Notepad++, `5.数据库管理工具.zip` — công cụ quản lý DB, trùng chức năng với `phpStudy/PHPTutorial/SQL-Front/SQL-Front.exe` đã có sẵn trong bộ cài chính). Không có gì trong `server/` hay `phpStudy/` gọi tới các file này.

**CHƯA xoá, cần người dùng quyết định (rủi ro cao hơn)**:
- `phpStudy/PHPTutorial/WWW/resource/exml/` (840 file, ~4MB): file nguồn UI Egret (`.exml`). Repo **không có** công cụ build Egret nào đi kèm (`package.json`/`tsconfig.json`/`egretProperties.json` — đều không tồn tại), nhưng file JS đã biên dịch (`default.thm_70915153.js`, `main.min_d7aad928.js`) có thời gian sửa gần đây nhất repo → khả năng cao có một pipeline build Egret chạy ở NGOÀI repo này (máy dev khác) vẫn dùng các file `.exml` này làm nguồn. Xoá có thể làm mất khả năng sửa UI qua Egret Wing sau này — **giữ nguyên, không xoá**.
- MySQL data file `phpStudy/PHPTutorial/MySQL/data/actors/actors_copy.*` và `actors9/actors_copy.*` (~16KB, bảng rỗng): đây là file dữ liệu MyISAM thật của MySQL đang chạy — xoá trực tiếp file (thay vì `DROP TABLE` đúng cách qua SQL) có thể làm hỏng engine MySQL nếu server đang chạy hoặc sẽ chạy lại từ đúng thư mục này. **Không tự ý xoá**, để người dùng tự chạy `DROP TABLE actors_copy;` nếu thật sự không cần.
