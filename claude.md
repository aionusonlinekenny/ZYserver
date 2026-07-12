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

## 8.18. Nới rộng nút "Tự động" (SkinBtn12) để không bị tràn chữ "Đang tự động..." (ảnh IMG_0468/IMG_0469, 2026-07-05)

Người dùng gửi ảnh nút "Đang tự động…" cạnh thanh "Vượt Ải" bị tràn chữ (nút hẹp hơn chữ cần hiển thị).

**Vị trí**: `default.thm.js`, `SkinBtn12` (`Btn12Skin.exml`) — skin dùng chung cho nút `autoPkBoss` (toggle "Tự động thách đấu"/"Tự động chiến đấu"/"Đang tự động..." tuỳ trạng thái up/down). Nút chỉ có 1 nơi dùng skin này: `pkBossBtnGroup_i` (`horizontalCenter=0` trong group cha) → nới rộng sẽ giãn đều 2 bên, không lệch layout.

Nguyên bản: `width=88` (đặt ở state "up", không đổi lại ở "down" nên áp dụng chung cho cả nút), trong khi cả 2 câu chữ tiếng Việt ("Tự động chiến đấu" 18 ký tự, "Đang tự động..." 15 ký tự) đều dài hơn nhiều so với chữ Hán gốc 2-4 ký tự.

**Đã sửa**:
- Tăng `width` của nút (thuộc tính `""` = chính component) từ 88 → 180 (ảnh nền `_Image1` có `scale9Grid` nên co giãn an toàn, không vỡ hình).
- Cả 2 state up/down: đổi `labelDisplay` từ định vị bằng `x` cố định sang `horizontalCenter=0` + thêm `width=170` + `textAlign="center"` — đúng theo quy tắc `eui.Label` cần `width` tường minh thì `textAlign="center"` mới thực sự canh giữa (state "down" trước đó đã có sẵn `textAlign="center"` nhưng vô tác dụng vì thiếu `width`, đúng quirk đã ghi nhận nhiều lần trong dự án).

`node -c` qua được. Đổi tên `default.thm_0d1590b8.js` → `default.thm_5b46d2b9.js`, cập nhật `manifest.json`/`index.php` theo quy ước cache ở 8.9.

Cập nhật thêm (ảnh IMG_0471, 2026-07-05): sau khi nới `width` của nút, chữ đã canh giữa/đủ rộng nhưng **hình nền nút (`_Image1`, ảnh "zjmzidong") không giãn theo** — chữ tràn ra ngoài 1 hình nền vẫn nhỏ như cũ. Nguyên nhân: `_Image1_i()` không hề set `width`/`height` cho ảnh nền, nên dù thuộc tính `width` của cả nút (component) đã tăng lên 180, ảnh nền vẫn vẽ theo kích thước gốc của bitmap (không tự giãn theo logical width của component cha) — `scale9Grid` đã khai báo sẵn nhưng vô tác dụng vì chưa có `width`/`height` tường minh để nó co giãn theo. Đã sửa: thêm `t.width=180; t.height=35;` thẳng vào `_Image1_i()` để ảnh nền luôn vẽ đúng kích thước mới, tận dụng đúng `scale9Grid` sẵn có để không vỡ hình. `node -c` qua được. Đổi tên `default.thm_5b46d2b9.js` → `default.thm_08883ec6.js`, cập nhật `manifest.json`/`index.php`.

Cập nhật thêm (ảnh IMG_0472, 2026-07-05): người dùng muốn khôi phục đúng hành vi gốc — nút gọn (chỉ hiện "Tự động") khi CHƯA bấm, và **tự giãn rộng** ra khi bấm để hiện "Đang tự động...". Bản sửa trước làm nút LUÔN rộng 180 ở cả 2 trạng thái (mất tính "giãn theo text" của thiết kế gốc). Đã sửa lại đúng theo yêu cầu — tách riêng kích thước theo từng state thay vì fix cứng 1 kích thước dùng chung:
- State `"up"` (chưa bấm): text đổi lại thành `"Tự động"` (ngắn gọn, không phải "Tự động chiến đấu" nữa), `_Image1` + component đều `width=100,height=35`, `labelDisplay width=90`.
- State `"down"` (đã bấm): giữ text `"Đang tự động..."`, `_Image1` + component đều `width=180,height=35`, `labelDisplay width=170` — khi chuyển sang state này, ảnh nền + độ rộng nút tự giãn ra đúng như hành vi gốc.
- `_Image1_i()` (giá trị khởi tạo mặc định trước khi state áp dụng): đổi về `width=100,height=35` khớp với state "up" (trạng thái mặc định `currentState="up"`).

`node -c` qua được. Đổi tên `default.thm_08883ec6.js` → `default.thm_ff4f9153.js`, cập nhật `manifest.json`/`index.php`.

Cập nhật thêm (ảnh IMG_0473, 2026-07-05): người dùng thấy nút "Đang tự động..." rộng dư khá nhiều (180) so với chữ, muốn thu hẹp lại chỉ chừa khoảng đệm ~2 ký tự mỗi bên. Đã giảm state `"down"`: `_Image1`/component `width` 180→145, `labelDisplay width` 170→135 (giữ nguyên `height=35`, `horizontalCenter=0`). State `"up"` (nút gọn khi chưa bấm) không đổi. `node -c` qua được. Đổi tên `default.thm_ff4f9153.js` → `default.thm_3dccea26.js`, cập nhật `manifest.json`/`index.php`.

## 8.19. Bug treo màn "Đang chuyển server.." khi vào Liên Server / 跨服BOSS — thiếu tài nguyên bản đồ client (2026-07-05)

Người dùng báo (ảnh IMG_0474→IMG_0478): vào "Liên Server" → "跨服BOSS" → chọn 1 trong các khu vực (ví dụ "5chuyển-12chuyển") → bấm "Thách đấu" → màn hình treo cứng vĩnh viễn ở overlay "Đang chuyển server..".

**Điều tra client (`main.min.js`)**: lần theo toàn bộ luồng `KFBossShowWin` (bấm "Thách đấu" → `KFBossSys.ins().sendEnter(fbId)`) → s1 phản hồi gói lệnh 9 (Login protocol) `doSwitchServer_a94` → mở popup "Đang chuyển server.." (`linkingKFState(true)`) → client kết nối sang `kfIp:kfPort` (s99) → `sendKFLogin()`. Popup chỉ đóng khi client nhận được gói "EnterGame thành công" (lệnh 5, `RoleMgr.doEnterGame`, dùng chung cho cả login thường lẫn login liên server).

**Bằng chứng quyết định**: người dùng gửi ảnh Console trình duyệt (F12) lúc bị treo, cho thấy lỗi JS thật:
```
Uncaught TypeError: Cannot read properties of undefined (reading 'jumpData')
Hàm lỗi: t.parser
```
Đối chiếu `main.min.js`: đây là `GameMap.parser` (xử lý gói vào bản đồ từ server) — dòng `var i=this.getFileName(), s=this.mapZip[i]; s.jumpData...` bị crash vì `s` (`this.mapZip[i]`) là `undefined`, tức **dữ liệu bản đồ không tồn tại trong `mapZip`** (được nạp 1 lần lúc khởi động game từ `resource/scene/maps.json`, xem log console "Đã tải xong cấu hình bản đồ").

Đối chiếu với log server thật (dòng `EnterScene name:????,id:4097,fubenId:51003,sceneId:7012,...`) xác nhận server xử lý vào bản đồ **hoàn toàn thành công** ở `sceneId:7012` — bug nằm 100% ở phía client, không phải do s99/kết nối mạng (giả thuyết s99 chưa chạy ở lượt kiểm tra trước đó đã bị loại bỏ, s99 hoàn toàn khoẻ).

**Nguyên nhân gốc**: `ConfigScenes[7012].mapfilename="map419"` và `ConfigScenes[7013].mapfilename="map420"` (2 bản đồ dùng cho toàn bộ 8 khu vực boss liên server, theo `instance.config`) — **cả 2 hoàn toàn không tồn tại phía client**: không có trong `resource/scene/maps.json`, không có thư mục `resource/scene/map419|map420/` (trong khi mọi map khác đều có đủ `mapXXX.json` + `image/` + `small.jpg`), và không được khai báo trong `default.res.json`/`default.res2.json`. Đã rà soát toàn bộ repo (kể cả giải nén `mdata.txt` phía server bằng zlib) — server chỉ có dữ liệu lưới va chạm nhị phân độc quyền (định dạng riêng của engine, không phải định dạng client), hoàn toàn không có ảnh nền/tileset — nghĩa là **không thể tự phục hồi map419/map420 từ bất kỳ dữ liệu nào có trong repo**. Đây là lỗ hổng tài nguyên có từ khi đóng gói client, không phải lỗi do các lần sửa trước đó gây ra.

**Đã áp dụng giải pháp tạm** (theo yêu cầu người dùng "dùng tạm thử", chờ tìm được gói tài nguyên client gốc đầy đủ hơn): trỏ tạm 2 scene bị thiếu sang 2 scene khác đã có đủ tài nguyên, không đụng tới field `sceneName` (chuỗi `"跨服战场"`/`"破界岛"` — vẫn được bảo toàn nguyên vẹn vì có thể bị so sánh `==` ở nơi khác trong `main.min.js`):
- `instance/instance.config` (cả s1, s99): fbid 51003–51009 (7 khu vực "跨服BOSS", scene cũ 7012/map419) → đổi `scenes={7012}` thành `scenes={7011}` (map435, 32×24, đã dùng ổn định cho tính năng "Đỉnh Phong Mùa Giải"). fbid 51002 (khu "破界岛BOSS", scene cũ 7013/map420) → đổi `scenes={7013}` thành `scenes={7004}` (map411, 37×31, đã dùng ổn định cho "激情泡点").
- `crossboss/crossbossconfig.config` (cả s1, s99): toạ độ `enterPos`/`flagPos` gốc được tính riêng cho địa hình map419/map420 (vượt quá biên map435/map411 mới, có thể gây lỗi vị trí ngoài bản đồ) → đã thay bằng toạ độ mới nằm an toàn trong biên của map435 (entry 1-7) và map411 (entry 8), giữ cùng kiểu bố trí theo cụm như bản gốc.

Xác minh: `lua -e loadfile(...)` qua được cho `crossbossconfig.config` ở cả 2 vùng (file `instance.config` có lỗi cú pháp tiền tồn tại ở dòng 145526, không liên quan tới vùng vừa sửa — đã xác nhận lỗi này tồn tại y hệt ở git HEAD gốc, không phải do sửa lần này gây ra). File s1/s99 sau khi sửa vẫn giống hệt nhau (`diff` rỗng).

**Hạn chế đã biết của giải pháp tạm**: bối cảnh trận đấu (nền/tileset) sẽ hiển thị theo hình ảnh của map435/map411 thay vì hình ảnh "跨服战场"/"破界岛" như thiết kế gốc — thuần tuý là khác biệt hình ảnh, không ảnh hưởng logic thách đấu/thưởng/deo boss. Nếu sau này tìm được gói tài nguyên client gốc có đủ `map419`/`map420` (ảnh nền + `mapXXX.json` + `small.jpg`), nên phục hồi lại đúng `scenes={7012}`/`scenes={7013}` và toạ độ `enterPos`/`flagPos` gốc (đã lưu nguyên trong lịch sử git trước commit này).

Cập nhật thêm (ảnh IMG_0487/IMG_0488/IMG_0491/IMG_0492, 2026-07-05): người dùng test lại sau khi restart server — **hết treo**, vào được cả 2 nhóm map. Phát sinh 2 việc:

1. **Boss xem trước (icon lobby) khác boss thực tế gặp trong map, nhưng vẫn đánh được bình thường ở nhóm 7 zone "跨服BOSS"** (ví dụ preview "铁血魔王" nhưng vào map gặp "Bỉ Ngạn Tiên Linh"). Kiểm tra `crossbossconfig.config` thấy đây là cơ chế **boss luân phiên theo mốc đã có sẵn từ trước** — `openBossList = {[1]=85028,[30]=85004}`: `85028`="铁血魔王" là boss mốc 1 (hiện ở icon preview tĩnh), nhưng đang ở mốc 30 nên boss thực tế là `85004`="Bỉ Ngạn Tiên Linh". Tương tự khu 8: `openBossList={[1]=85027,[30]=85003}`, `85003`="Cửu Vĩ Minh Tiên". Đây là thiết kế có từ trước, **không liên quan gì tới việc đổi scene** — icon preview trong lobby chỉ luôn hiển thị boss mốc 1 tĩnh, không tự cập nhật theo mốc đang mở. Không phải bug, không cần sửa.

   Nhân tiện cũng giải thích luôn nhãn tên khu vực hiển thị trong map bị lệch (ảnh IMG_0488 hiện đúng "S.1跨服战场", ảnh IMG_0492 hiện "苍月岛" thay vì "破界岛"): tra `main.min.js` thấy đây là đoạn code gốc (không phải do sửa lần này) hard-code sẵn `this.nameTxt.text = "跨服战场"==n.sceneName ? "S."+o.serverId+"跨服战场" : "苍月岛"` — tức bất kỳ khu nào có `sceneName` khác đúng chuỗi `"跨服战场"` (như khu 8 dùng `"破界岛"`) đều bị rơi vào nhánh else và LUÔN hiện chữ "苍月岛" cố định, bất kể giá trị thật là gì. Quirc có sẵn từ trước, chỉ ảnh hưởng nhãn hiển thị, không phải lỗi do lần sửa map419/420 gây ra.

2. **Khu 8 ("破界岛BOSS", scene mới 7004/map411): boss hiện ra nhưng không tấn công được** (khu 1-7 dùng map435 vẫn tấn công bình thường). Nguyên nhân: `crossbossfb.lua`, hàm `refreshBossTimer` — boss được tạo bằng `Fuben.createMonster(ins.scene_list[1], bossId)` **không truyền toạ độ x,y** (khác với cờ/flag luôn được tạo kèm toạ độ rõ ràng qua `getFlagRefreshPoint`). Không truyền toạ độ khiến engine tự chọn vị trí spawn mặc định — trên map419/420 gốc vị trí mặc định đó đi được, nhưng trên map411 (map thay thế) lại rơi vào ô không hợp lệ/không thể tiếp cận. Đã sửa cả 2 vùng (`server/bin/{s1,s99}/gameworld/data/functions/systems/crossboss/crossbossfb.lua`): thêm `local bossX, bossY = crossbosssystem.getRandomPoint(conf)` rồi truyền `bossX, bossY` vào `Fuben.createMonster(ins.scene_list[1], bossId, bossX, bossY)` — tái dùng đúng hàm `getRandomPoint` (đã có sẵn trong `crossbosssystem.lua`, vốn dùng để hồi sinh người chơi) để lấy toạ độ từ chính `enterPos` đã được tính an toàn cho từng map thay thế. Cách này làm boss LUÔN spawn ở toạ độ đã biết chắc là hợp lệ, không phụ thuộc vào mặc định ẩn của engine trên map lạ. `lua -e loadfile(...)` qua được, file s1/s99 giống hệt nhau.

Cập nhật thêm (ảnh IMG_0493/IMG_0494, 2026-07-05): người dùng báo tiếp — lần này tới lượt **nhóm 7 zone map435 (跨服BOSS) cũng có 1 con không đánh được** (boss xuất hiện lệch gần khu vực cờ "Chiến Kỳ Liên" thay vì ở vị trí chính, dù trước đó nhóm này báo đã đánh được).

**Nguyên nhân thật**: `enterPos`/`flagPos` mà tôi tự đặt ở lần sửa trước (8.19, cả bản đầu lẫn bản sửa "cannot attack") **chỉ được kiểm tra nằm trong biên số (0..maxX,0..maxY) chứ chưa từng đối chiếu với lưới va chạm thật (`grids`) của map435/map411** trong `resource/scene/maps.json` — một số toạ độ tôi chọn thủ công (ví dụ anchor `(8,6)` và `(20,14)` trên map435) thực ra rơi vào ô TƯỜNG/vật cản (`grids[y*maxX+x]=1`), không phải ô đi được (`=0`). Vì bản sửa trước cho boss dùng `crossbosssystem.getRandomPoint(conf)` (chọn NGẪU NHIÊN 1 trong 24-36 điểm `enterPos`), có xác suất trúng đúng những điểm bị chặn này → boss spawn kẹt trong tường, hiện tên nhưng không thể tiếp cận/tấn công.

**Đã sửa triệt để** (khác cách tiếp cận trước — lần này đối chiếu trực tiếp với dữ liệu va chạm thật thay vì đoán bằng mắt):
- Viết script Python đọc thẳng mảng `grids` của `map435`/`map411` trong `resource/scene/maps.json` (xác nhận index = `y*maxX+x`, giá trị `0`=đi được, `1`/`3`=vật cản, kiểm chứng bằng đúng điểm `enterX/enterY` chính thức của từng map).
- Tìm lại 4 cụm neo (anchor) mới cho mỗi map, mỗi neo được xác minh **toàn bộ các ô trong cụm đều đi được** trước khi chấp nhận — quét trực tiếp trên lưới thật thay vì chọn toạ độ ước lượng.
- Sinh lại toàn bộ `enterPos` (map435: 24 điểm, map411: 36 điểm) và `flagPos` (map435: 4 điểm) từ các cụm neo mới, verify lại 100% từng điểm bằng script trước khi ghi file.
- Đổi cách chọn vị trí spawn boss: từ `crossbosssystem.getRandomPoint(conf)` (ngẫu nhiên) sang cố định `conf.enterPos[1].posX, conf.enterPos[1].posY` (luôn là chính điểm neo đầu tiên, đã xác minh đi được) — loại bỏ hoàn toàn khả năng "may rủi" trúng ô xấu, và giữ vị trí boss ổn định/dễ đoán giữa các lần spawn thay vì nhảy lung tung.

Nhân tiện trả lời câu hỏi "sao không dùng instance như boss ở hình khác (Thiên Linh)": 跨服BOSS **đã dùng đúng cơ chế instance giống hệt** (`instancesystem`/`Fuben.createMonster`, cùng kiến trúc với mọi dungeon khác kể cả World Boss "Thiên Linh"). Khác biệt duy nhất là World Boss dùng map có sẵn đầy đủ tài nguyên client, còn 跨服BOSS gốc dùng map419/420 bị thiếu tài nguyên (mục 8.19) nên phải mượn tạm map khác — lỗi vừa gặp là do toạ độ tạm tôi tự đặt trên map mượn chưa được kiểm chứng đúng cách, không phải do khác cơ chế instance.

Đã verify 100% điểm walkable bằng script, `lua -e loadfile(...)` qua được cho cả `crossbossconfig.config` và `crossbossfb.lua` ở cả 2 vùng, file s1/s99 giống hệt nhau.

Cập nhật thêm (ảnh IMG_0495/IMG_0496, 2026-07-05): người dùng báo **cả 2 nhóm map (435 lẫn 411) đều bị lại** dù đã verify walkable bằng script. Người dùng gợi ý đúng trọng tâm: "sao không lấy toạ độ của boss nào đã từng được load ở map này, mà dùng chứ tự tính/đoán như vậy không work".

**Nhận ra vấn đề cốt lõi**: kiểm tra lại thấy ảnh IMG_0495 có chữ xanh "安全" (Vùng An Toàn) hiện ở góc bản đồ — `ConfigScenes[7004]` có field `area` chia bản đồ thành nhiều vùng đa giác với `attr.type` khác nhau (một vùng có `type=0` — nhiều khả năng là "vùng an toàn/cấm giao chiến"). Việc chỉ kiểm tra `grids` (đi được hay không) **hoàn toàn không phản ánh được các vùng cấm giao chiến này** — tức toạ độ có thể đi được nhưng vẫn không đánh nhau được nếu rơi vào vùng an toàn, hoặc do một ràng buộc ẩn khác của engine mà việc đọc dữ liệu tĩnh không suy ra được.

**Đã đổi hoàn toàn cách tiếp cận theo đúng góp ý của người dùng** — thay vì tự tính/đoán toạ độ, dò lại toàn bộ `instance.config` tìm những map đã có quái/boss **thật sự được load và test trong game** (field `monsterGroup`/`bossjrd` của các fbid dungeon chương hồi/cốt truyện, ví dụ fbid=1..10 dùng `scenes={1}` hay `scenes={3}` với toạ độ cụ thể như `monsterGroup={{...posX=31,posY=26}}` và `bossjrd={34,18}` — đây là toạ độ CHẮC CHẮN đã hoạt động vì hàng trăm fbid khác (132,133,259,260,...) vẫn đang dùng lại đúng các toạ độ này cho nhiều bậc chương khác nhau):
- Nhóm 7 zone "跨服BOSS" (trước dùng map435/scene 7011): đổi hẳn sang **scene 1 (map001, 79×63)** — dùng 8 toạ độ đã proven từ 4 fbid chương đầu (`monsterGroup`: (31,26),(50,17),(67,34),(46,41); `bossjrd`: (34,18),(60,21),(35,32),(41,42)). Boss lấy cố định điểm đầu (31,26); `flagPos` lấy 4 điểm `bossjrd` (đều là vị trí boss cuối màn đã proven).
- Zone 8 "破界岛BOSS" (trước dùng map411/scene 7004): đổi hẳn sang **scene 3 (map003, 79×71)** — dùng 12 toạ độ proven từ 6 fbid chương khác. Boss lấy cố định điểm đầu (18,48).
- `instance.config`: `scenes={7011}`→`scenes={1}` (7 fbid), `scenes={7013}`→ (đã là `{7004}` từ lần trước) →`scenes={3}` (1 fbid). **Lưu ý sự cố nhỏ khi thực hiện**: dùng `sed` thay theo giá trị số (`scenes = {7004},`→`scenes = {3},`) đã vô tình khớp luôn cả 2 dòng KHÔNG liên quan tới crossboss (fbid=50004 "激情泡点" gốc vốn dùng sẵn `scenes={7004}`, và fbid=51001 "巅峰赛季" gốc vốn dùng sẵn `scenes={7011}`) — phát hiện ngay qua `git diff` (thấy 2 chỗ đổi thay vì 1/7 như dự kiến) và đã khôi phục lại đúng 2 dòng đó về giá trị gốc trước khi commit, chỉ giữ lại đúng 8 thay đổi thuộc về crossboss.

Không cần sửa gì thêm ở `crossbossfb.lua` (đã đúng từ lần trước: `conf.enterPos[1]` cố định, giờ trỏ vào toạ độ đã proven thay vì toạ độ tự đoán). `lua -e loadfile(...)` qua được, `diff` xác nhận s1/s99 giống hệt nhau và không có thay đổi ngoài ý muốn nào khác trong `instance.config`.

Cập nhật thêm (ảnh IMG_0490/IMG_0491/IMG_0498/IMG_0499, 2026-07-05): đánh trúng OK, người dùng chuyển sang hỏi vấn đề còn lại — muốn boss preview (icon lobby) và boss thực tế gặp trong map phải TRÙNG nhau, không chấp nhận hiện 1 con rồi vào gặp con khác (dù đã biết đây là cơ chế `openBossList` có sẵn từ trước).

**Điều tra để tìm cách làm preview = thực tế**: preview trong `KFBossShowWin` lấy `this.bossName.source = "kf_name_" + this.dp.bossId` — đây là **ảnh bitmap tĩnh** (không phải chữ vẽ động), key theo đúng `bossId` tường minh trong `crossbossconfig.config` (mốc ngày 1), không phải bossId đang thực sự active. Muốn preview hiện đúng boss mốc 30 (85004/85003) thì cần ảnh `kf_name_85004.png`/`kf_name_85003.png` — nhưng rà `resource/eui/kf/kfBoss/kfboss/` chỉ thấy đúng 2 file `kf_name_85027.png` và `kf_name_85028.png`, **hoàn toàn không có ảnh cho 2 boss mốc 30** (giống hệt kiểu thiếu tài nguyên như map419/420 ở mục 8.19 — nội dung mốc ngày 30 được cấu hình sẵn phía server nhưng chưa từng được cấp tài nguyên ảnh phía client, có thể vì đây là nội dung dự kiến mở sau này).

**Kết luận**: không thể sửa để preview hiển thị ĐÚNG boss mốc 30 (thiếu ảnh, không tự vẽ ra được). Nên chọn hướng ngược lại — làm boss THỰC TẾ luôn khớp với boss ĐÃ CÓ ảnh preview (mốc 1), thay vì cố hiện ảnh cho boss không có tài nguyên. Sửa `crossbossconfig.config` (cả s1, s99): đổi giá trị mốc 30 trong `openBossList` trùng với mốc 1 — `{[1]=85028,[30]=85004}`→`{[1]=85028,[30]=85028}` (7 zone nhóm 1), `{[1]=85027,[30]=85003}`→`{[1]=85027,[30]=85027}` (zone 8). Hàm `getBossId(conf)` trong `crossbossfb.lua` (đọc theo "số ngày mở server", không đổi code) giờ luôn trả về đúng ID có ảnh bất kể server đã mở bao lâu — preview và boss thực tế vĩnh viễn trùng nhau, không cần đụng tới `main.min.js`/client. `lua -e loadfile(...)` qua được, s1/s99 giống hệt nhau.

## 8.20. Bug treo tương tự ở tab "魔界入侵" (Ma Giới Xâm Nhập) — cùng nguyên nhân thiếu map, đã sửa ngay bằng bài học từ 8.19 (ảnh IMG_0500/IMG_0501, 2026-07-05)

Người dùng báo tab "魔界入侵" (cũng thuộc nhóm Liên Server, khác với 跨服BOSS) bị treo khi bấm "Thách đấu" vào map (ảnh IMG_0501: vào được scene nhưng không thấy boss/nút tấn công, số liệu HP/mana hiển thị sai "138281 / 2").

**Chẩn đoán nhanh nhờ kinh nghiệm từ 8.19**: tra `devilboss.config`/`devilbossfb.lua` (module riêng cho tính năng này, boss "烛龙魔君" khớp đúng ảnh người dùng gửi, `fbid=51029`). `instance.config` cho 4 fbid 51027-51030 đều dùng `scenes = {7023}` → `ConfigScenes[7023].mapfilename = "map425"` → xác nhận **map425 hoàn toàn không tồn tại phía client** (không có trong `maps.json`, không có thư mục, không khai báo resource manifest) — **giống hệt** tình trạng map419/420 ở mục 8.19. Đồng thời `devilbossfb.lua` dòng ~593 cũng có đúng bug y hệt `crossbossfb.lua` trước khi sửa: `Fuben.createMonster(ins.scene_list[1], bossId)` tạo boss **không truyền toạ độ x,y**.

**Đã sửa ngay bằng cách tiếp cận đã học được (không lặp lại chu trình dò-lỗi nhiều vòng như 8.19)**:
- `instance.config` (cả s1, s99): cả 4 fbid 51027/51028/51029/51030 đổi `scenes = {7023}` → `scenes = {1}` (dùng lại scene 1/map001 đã dùng cho nhóm 跨服BOSS 1-7, sed giới hạn phạm vi từng block `[fbid]...},` để tránh lặp lại sự cố sed thay nhầm ở 8.19).
- `devilboss.config` (cả s1, s99, cả 4 entry id 1-4 dùng chung 1 danh sách `enterPos`): thay `enterPos` gốc (11 điểm tính riêng cho map425) bằng đúng 8 toạ độ đã proven từng dùng cho crossboss scene 1 (`monsterGroup`/`bossjrd` của các dungeon chương 1-4: (31,26),(50,17),(67,34),(46,41),(34,18),(60,21),(35,32),(41,42)) — không tự đoán/tính từ lưới va chạm nữa, học đúng bài học từ 8.19.
- `devilbossfb.lua` (cả s1, s99), hàm `createFb`: thêm `local bossX, bossY = conf.enterPos[1].posX, conf.enterPos[1].posY` rồi truyền vào `Fuben.createMonster(ins.scene_list[1], bossId, bossX, bossY)` — boss luôn spawn ở điểm đã proven, giống pattern cuối cùng đã ổn định ở `crossbossfb.lua`.

`devilboss.config`'s `openBossList` mỗi id chỉ có đúng 1 mốc (`{[1]=87091}` v.v., không có mốc 30) nên KHÔNG bị vấn đề preview-lệch-thực-tế như crossboss (mục trên) — không cần sửa gì thêm cho phần đó.

Verify: `lua -e loadfile(...)` qua được cho `devilboss.config`/`devilbossfb.lua` (file `instance.config` vẫn còn lỗi cú pháp tiền tồn tại ở dòng 145526, đã xác nhận từ 8.19 là không liên quan/có sẵn từ git HEAD). `git diff` xác nhận `instance.config` chỉ đổi đúng 4 dòng liên quan tới fbid 51027-51030, không đụng entry nào khác. s1/s99 giống hệt nhau ở cả 3 file.

## 8.21. Sửa lỗi thiếu khoảng trắng ở thông báo "Bạn bị Boss ... đánh bại" (ảnh IMG_0502, 2026-07-05)

Người dùng báo popup "Nhắc nhở hồi sinh" hiện "Bạn bịBossBá Vũ Bạch Hùngđánh bại" dính liền không có khoảng trắng, bị tràn xuống 2 dòng và ngắt giữa từ ("Bạch H" / "ùng"). Yêu cầu: thêm khoảng trắng đúng chỗ ("bị Boss", "Boss Bá", trước "đánh bại") và gói gọn trên 1 dòng, cẩn thận không phá vỡ logic.

**Vị trí**: `main.min.js`, hàm `setWin_a94` — dùng chung cho 3 cửa sổ hồi sinh gần giống nhau (world boss, khu vực chờ hồi sinh, và `KFBossReliveWin` dùng cho cả 跨服BOSS lẫn 魔界入侵). Code gốc:
```js
s = i instanceof CustomActorRole ? i.infoModel.name : (i.infoModel.masterHandle && n ? ""+n.infoModel.name : "Boss"+i.infoModel.name);
this.killTips.textFlow = TextFlowMaker.generateTextFlow1("Bạn bị|C:2343978&T:"+s+"|đánh bại");
```
`"Boss"+i.infoModel.name` nối liền không khoảng trắng, và chuỗi bọc ngoài `"Bạn bị|C:...&T:"+s+"|đánh bại"` cũng không có khoảng trắng quanh phần tên được tô màu — ghép lại thành "Bạn bịBossTên...đánh bại" dính liền hoàn toàn.

**Đã sửa** (3 chỗ giống hệt nhau, dùng đúng 1 lần thay thế cho cả 3 vì cùng 1 khuôn mẫu): `"Boss"+i.infoModel.name` → `"Boss "+i.infoModel.name`; `"Bạn bị|C:2343978&T:"` → `"Bạn bị |C:2343978&T:"`; `"|đánh bại"` → `"| đánh bại"`. Chỉ thêm khoảng trắng vào literal string nối chuỗi, không đổi biến/điều kiện logic nào — không ảnh hưởng hành vi xác định tên boss. `node -c` qua được.

Đồng thời để câu (dài hơn ra do thêm 3 khoảng trắng, cộng với tên boss Hán-Việt thường dài hơn bản Hán gốc) có cơ hội gói gọn 1 dòng: `default.thm.js`, skin `SkinWorldBossGold`, phần `killTips_i()` — tăng `width` 246→400 (vẫn nằm trong biên ảnh nền `_Image2` rộng 419, không bị lồi ra ngoài khung) và giảm `size` 23→19 để chữ dài vừa khít hơn trên 1 dòng.

Đổi tên `main.min_0427b4b1.js`→`main.min_4290f466.js`, `default.thm_3dccea26.js`→`default.thm_1c7c2f9f.js`, cập nhật `manifest.json`/`index.php` theo quy ước cache ở mục 8.9.

Cập nhật thêm (2026-07-05): người dùng tự chỉnh thêm vài chữ trực tiếp trong `default.thm.js` rồi gửi lại file để đồng bộ lên git — đã áp dụng nguyên văn theo đúng nội dung người dùng gửi, không tự ý sửa thêm gì khác:
- Nút "Người sở hữu tấn công" → "Sở hữu Boss" (2 nơi: 1 trong state `eui.SetProperty`, 1 trong hàm khởi tạo `_i()` mặc định).
- "Tôi là người sở hữu" → "Tôi sở hữu" (2 nơi, cùng state list).
- "Đang tấn công BOSS" → "Tấn công BOSS".
- `killTips_i()`: `size` 19→23 (người dùng tự đổi lại, giữ nguyên `width=400` đã sửa ở trên).

Đổi tên `default.thm_1c7c2f9f.js`→`default.thm_4c3508c6.js`, cập nhật `manifest.json`/`index.php` theo quy ước cache. `node -c` qua được.

**Quay lại logic gốc boss-theo-mốc-ngày cho 跨服BOSS** (đảo ngược phần đã sửa ở trên): người dùng cho biết sẽ tự tạo ảnh tiêu đề còn thiếu (`kf_name_85004.png`/`kf_name_85003.png`) sau, nên muốn khôi phục cơ chế `openBossList` gốc thay vì ép boss thực tế luôn trùng boss mốc 1. Đã revert `crossbossconfig.config` (cả s1, s99) về đúng giá trị ban đầu: `{[1]=85028,[30]=85028}`→`{[1]=85028,[30]=85004}` (7 zone nhóm 1), `{[1]=85027,[30]=85027}`→`{[1]=85027,[30]=85003}` (zone 8). Boss thực tế sẽ lại hiện đúng theo số ngày mở server (85004/85003 từ ngày 30 trở đi) như thiết kế gốc; preview lobby sẽ tiếp tục hiện ảnh mốc 1 (85028/85027) cho tới khi có ảnh `kf_name_85004`/`kf_name_85003` — người dùng đã biết và chấp nhận việc này tạm thời, sẽ bổ sung ảnh sau. `lua -e loadfile(...)` qua được, s1/s99 giống hệt nhau.

Cập nhật thêm (2026-07-05): người dùng hỏi có bao nhiêu ảnh tiêu đề (`kf_name_*.png`) cho tính năng này ngoài 4 ID đã biết (85028/85027/85004/85003) — đã rà toàn bộ thư mục `resource/eui/kf/kfBoss/kfboss/` xác nhận **chỉ đúng 4 ID này tồn tại trong toàn bộ cấu hình crossboss** (không còn ID nào khác), và trong đó chỉ 2 ảnh (85028, 85027) thực sự có file, 2 ảnh còn lại (85004, 85003) chưa từng tồn tại. Đã mở 2 ảnh có sẵn xem trực tiếp để xác nhận nội dung: `kf_name_85028.png`="铁血魔王" (Thiết Huyết Ma Vương), `kf_name_85027.png`="阿修罗王" (A Tu La Vương) — đây là "danh xưng oai hùng" riêng cho màn hình boss này, KHÁC với tên nội bộ của quái trong `monsters.config` (85028 nội bộ là "Cửu Chuyển Thần Tướng", 85027 là "Cửu Tiêu Linh Vương") — đã giải thích rõ sự khác biệt này cho người dùng.

Người dùng tự tạo 2 ảnh tiêu đề còn thiếu và xác nhận nội dung: `kf_name_85004.png` = **"Bỉ Ngạn Hoa Linh"** (danh xưng riêng, khác với tên chiến đấu "Bỉ Ngạn Tiên Linh" — người dùng xác nhận cố ý muốn vậy, giống cách 85028/85027 cũng có danh xưng riêng khác tên nội bộ), `kf_name_85003.png` = "Cửu Vĩ Minh Tiên" (trùng tên chiến đấu). File ảnh gửi qua khung chat dạng dán trực tiếp không kèm đường dẫn nên chưa lấy được — người dùng đồng ý cứ cập nhật code/cấu hình resource trước, sẽ bổ sung file ảnh thật sau.

Đã đăng ký trước 2 resource mới trong `resource/default.res.json` VÀ `resource/default.res2.json` (cả 2 file resource manifest của client, không chỉ 1) theo đúng format và vị trí đang dùng cho 85028/85027 — thêm vào mảng `resources` (`{"url":"eui/kf/kfBoss/kfboss/kf_name_8500X.png","type":"image","name":"kf_name_8500X_png"}`) VÀ vào chuỗi `keys` của nhóm `"preload"`, ngay sau entry của 85028. **Lưu ý kỹ thuật quan trọng**: 2 file resource manifest này định dạng mỗi object trên nhiều dòng riêng (không thụt lề nhưng xuống dòng), còn trường `"keys"` của mỗi group lại là 1 chuỗi khổng lồ nằm trên đúng 1 dòng (hàng nghìn tên resource nối bằng dấu phẩy) — **không được dùng `json.dump()` ghi đè lại toàn bộ file** (đã thử và revert ngay vì `json.dump` mặc định viết lại toàn bộ theo format nén 1 dòng, gây diff ~20.000 dòng dù chỉ thêm 2 dòng thật sự); phải chèn bằng cách thay thế chuỗi con (string replace) để giữ nguyên định dạng gốc, gói gọn diff thật sự chỉ ~12 dòng mỗi file.

**Việc còn lại**: chờ người dùng gửi đúng 2 file ảnh (đính kèm qua nút 📎, không dán trực tiếp) rồi lưu vào `resource/eui/kf/kfBoss/kfboss/kf_name_85004.png` và `kf_name_85003.png` — lúc đó tính năng preview mới thực sự hiện đúng ảnh, hiện tại code đã sẵn sàng nhưng chưa có file nên vẫn hiện thiếu ảnh cho 2 boss này.

Cập nhật thêm (ảnh IMG_0508/IMG_0509, 2026-07-05): người dùng tự thay nội dung 2 ảnh `kf_name_85028.png`/`kf_name_85027.png` (đã có sẵn) thành chữ "THIÊN LINH"/"ĐẾ QUÂN", rồi báo preview vẫn không khớp boss thực tế (ví dụ preview "ĐẾ QUÂN" nhưng vào map lại gặp "Bỉ Ngạn ..."). Nguyên nhân **gốc rễ thật sự chưa từng được sửa cho tới lúc này**: đoạn 8.19 mới chỉ *đăng ký resource* cho 85004/85003, nhưng code client (`KFBossShowWin.open()`/`showBoss_a94()`) **vẫn luôn đọc `this.dp.bossId`** — tức bossId TĨNH lấy từ `GlobalConfig.ConfigCrossBoss[fbId].bossId` (mốc ngày 1, luôn là 85028/85027) — không hề đọc bossId đang thực sự active (mốc 30). Vì vậy dù người dùng đổi nội dung ảnh nào, preview vẫn chỉ trung thành load đúng 2 file 85028/85027 — không bao giờ tự chuyển sang 85004/85003 được, bất kể server đã qua ngày 30 hay chưa.

**Đã sửa đúng gốc rễ lần này** — cho server gửi kèm bossId đang active xuống client, thay vì client tự suy đoán:
- `crossbosssystem.lua` (cả s1, s99), hàm `sendBossData` (nơi build gói tin `sCrossBossCmd_SendBossInfo` gửi cho client — xác nhận đây đúng là hàm nuôi `KFBossInfoData` ở client, khớp chính xác thứ tự 4 field cũ `id/srvId/bossRefreshTime/flagRefreshTime`): thêm 1 field mới ở cuối — lấy instance qua `instancesystem.getInsByHdl(info.fbHandle)` rồi `LDataPack.writeInt(npack, ins and ins.data.bossId or 0)` (đúng field `ins.data.bossId` mà `refreshBossTimer` đã gán sẵn khi spawn boss, chỉ là trước giờ không ai gửi nó cho client).
- `main.min.js`: `KFBossInfoData` đọc thêm `this.bossId=t.readInt()` (đúng thứ tự, sau `flagRefTimer`). `KFBossShowWin.open()`: tính `this.curBossId` = bossId thật từ `KFBossSys.ins().fbInfo[this.fbId].bossId` nếu có, fallback về `this.dp.bossId` (tĩnh) nếu chưa có dữ liệu — dùng `this.curBossId` cho cả `bossName.source="kf_name_"+...` lẫn `showBoss_a94()` (trước đó cả 2 chỗ đều dùng `this.dp.bossId`).

Từ giờ preview sẽ **tự động hiện đúng ảnh của bossId đang active** (85004/85003 khi qua ngày 30, tự quay lại 85028/85027 nếu không có `openBossList` hoặc chưa tới mốc) — không còn phụ thuộc việc người dùng tự sửa tay 2 ảnh 85028/85027 nữa. Ảnh "THIÊN LINH"/"ĐẾ QUÂN" người dùng vừa đổi vào 85028/85027 sẽ KHÔNG hiện ra trong tình huống hiện tại (server đã qua ngày 30) — cần đúng 2 file `kf_name_85004.png`/`kf_name_85003.png` (nội dung đã thống nhất trước đó: "Bỉ Ngạn Hoa Linh"/"Cửu Vĩ Minh Tiên") mới là thứ thực sự hiển thị lúc này.

Đổi tên `main.min_4290f466.js`→`main.min_ac0f2ca2.js`, cập nhật `manifest.json`/`index.php`. `node -c` và `lua -e loadfile(...)` đều qua được, s1/s99 giống hệt nhau.

Cập nhật thêm (ảnh IMG_0510/IMG_0511, 2026-07-05): người dùng copy code mới + restart server sạch nhưng vẫn thấy "Bỉ Ngạn Tiên Linh" khi preview ghi "ĐẾ QUÂN" — bản sửa ở trên vẫn CHƯA đủ, do bỏ sót một tầng trung gian trong kiến trúc nhiều server:

Màn hình preview (`KFBossShowWin`) được hiển thị **trong lúc người chơi vẫn còn đang kết nối ở s1** (luồng đã xác định từ mục 8.19: chỉ khi bấm "Thách đấu" mới thực sự chuyển sang s99). Nhưng `ins.data.bossId` (nơi bản sửa trước đọc dữ liệu) chỉ tồn tại trong bộ nhớ của **chính s99** — s99 là nơi Fuben instance thật sự được tạo (`instancesystem`), s1 hoàn toàn không tra được `instancesystem.getInsByHdl(...)` cho một handle được tạo trên máy chủ khác. Vì vậy bản sửa trước, khi chạy trên s1 (chỗ user đang đứng lúc xem preview), luôn nhận `ins=nil` → gửi `bossId=0` → client rơi về nhánh fallback (bossId tĩnh) → coi như KHÔNG có gì thay đổi.

**Đã sửa đúng theo đúng luồng đồng bộ 2 chiều s99↔s1 sẵn có của hệ thống** (thay vì tra instance runtime):
- `crossbossfb.lua` (cả s1, s99), `refreshBossTimer`: thêm `fbInfo.bossId = bossId` — lưu thẳng vào record `bossList[id]` (đúng như comment thiết kế gốc ở đầu file đã ghi chú sẵn field `bossId` trong `bossList[id]` nhưng chưa từng có dòng code nào thực sự gán nó — lỗ hổng có sẵn từ gốc, không phải do sửa lần trước gây ra).
- `crossbossfb.lua`, `sendBossInfo` (hàm đồng bộ dữ liệu boss từ s99 sang s1 qua `CrossSrvCmd.SCCrossBossCmd`/`SCBossCmd_RefreshBoss`, chỉ chạy khi ở s99 — `if not System.isCommSrv()`): thêm `LDataPack.writeInt(npack, fbInfo.bossId or 0)` vào cuối gói tin.
- `crossbosssystem.lua` (cả s1, s99), `onRefreshBoss` (hàm NHẬN gói đồng bộ trên ở phía s1): đọc thêm `local bossId = LDataPack.readInt(dp)` và lưu `data.bossList[id].bossId = bossId` vào bản sao cục bộ của s1.
- `crossbosssystem.lua`, `sendBossData` (hàm gửi dữ liệu boss cho CLIENT thật, chạy trên bất kỳ server nào client đang kết nối): bỏ hẳn `instancesystem.getInsByHdl(...)`, đọc thẳng `info.bossId or 0` — giờ đúng cả 2 nguồn dữ liệu (`getGlobalData()` bản sao trên s1, và `crossbossfb.getGlobalData()` bản gốc trên s99) đều đã có sẵn field này.

`lua -e loadfile(...)` qua được cho cả 4 file, s1/s99 giống hệt nhau ở từng file. Đây là bản sửa hoàn chỉnh của luồng đồng bộ bossId — không cần sửa thêm gì ở client nữa (mục trên đã đúng), chỉ là thiếu mắt xích truyền dữ liệu qua lại giữa 2 server.

Cập nhật thêm (ảnh IMG_0512/IMG_0513/photo, 2026-07-05) — **phát hiện quan trọng về hệ thống resource của client**: boss đã hiện đúng (bossId động hoạt động tốt) nhưng ảnh tiêu đề (`kf_name_85004.png`/`85003.png`) không hiện ra, dù ảnh chụp máy chủ thật của người dùng xác nhận **file đã tồn tại đúng chỗ** (`resource/eui/kf/kfBoss/kfboss/`). Vậy lỗi không phải do thiếu file hay do đăng ký sai `default.res.json`/`default.res2.json` (đã làm ở mục trước) — dùng Playwright mở thẳng trang thật (`71.31.97.241`) và bắt lại toàn bộ request `.json`/`.me` để xem CHÍNH XÁC client tải file cấu hình nào, phát hiện: client chỉ tải đúng 3 thứ — `manifest.json`, `resource/version1.me`, `resource/default.res3.json`. **`default.res.json`/`default.res2.json` (2 file tôi đã sửa từ trước) không hề được client tải trực tiếp bao giờ** — hoàn toàn vô tác dụng, dù sửa đúng cũng không ảnh hưởng gì tới game thật.

Giải nén `version1.me` (thực chất là 1 file **ZIP** đội lốt đuôi `.me`) thì phát hiện bên trong có `version1/default.res2.json` — **một bản sao ĐỘC LẬP, đóng gói sẵn**, và đối chiếu bằng JSON thì đây chính là bản dữ liệu resource THẬT SỰ được client dùng (khớp gần như 100% với file rời `default.res2.json`, chỉ thiếu đúng 2 dòng `kf_name_85004_png`/`kf_name_85003_png` tôi mới thêm vào bản rời — xác nhận bản zip là bản CŨ, chưa từng được cập nhật theo các lần sửa `default.res2.json` trước đó). Ngoài ra trong zip còn có `version1/version.txt` — một danh sách phẳng `đường_dẫn:hash:đường_dẫn:hash:...` cho MỌI resource trong game (dùng để tạo query string cache-bust `?v=hash` per-file) — 2 ảnh mới thêm chưa từng có mặt trong danh sách này.

**Kết luận**: đây là cơ chế "gói vá tài nguyên" (delta/hotfix resource pack) riêng của engine này — `default.res3.json` là manifest GỐC cố định từ lúc build game lần đầu, còn `version1.me` là nơi CHÍNH THỨC để bổ sung resource mới sau này (đúng tình huống của chúng ta: 2 ảnh tiêu đề mới, chưa từng có trong bản build gốc). Sửa file rời `default.res.json`/`default.res2.json` là sửa nhầm chỗ — không sai về mặt nội dung/format, chỉ là các file đó không nằm trong đường tải thật.

**Đã sửa đúng chỗ**: giải nén `version1.me`, áp dụng đúng cách chèn (string-replace giữ nguyên định dạng, không dùng `json.dump` — bài học từ lần trước) vào bản `default.res2.json` BÊN TRONG zip (thêm 2 entry `kf_name_85004_png`/`kf_name_85003_png` giống hệt bản rời), đồng thời bổ sung 2 dòng tương ứng vào `version.txt` (`eui/kf/kfBoss/kfboss/kf_name_8500X.png:<hash 8 hex ngẫu nhiên>:`) cho nhất quán với toàn bộ resource khác. Đóng gói lại đúng cấu trúc ZIP gốc (giữ nguyên thứ tự file, timestamp, kiểu nén, kể cả file rác `__MACOSX/._version.txt` — dùng `zipfile` Python ghi từng file y hệt, chỉ thay nội dung 2 file đã sửa) rồi ghi đè `resource/version1.me`. Verify: giải nén lại bản mới, parse JSON hợp lệ, xác nhận cả 2 tên resource và cả 2 dòng version.txt đều có mặt.

**Lưu ý cho người dùng**: file `resource/version1.me` này cũng cần copy sang máy chủ thật giống mọi file khác — đây là file NHỊ PHÂN (zip), không phải text nên không xem được trực tiếp qua diff nhưng vẫn copy y như các file khác. `default.res.json`/`default.res2.json` (file rời) vẫn giữ nguyên các chỉnh sửa cũ trong repo cho nhất quán/dễ đối chiếu nội dung, nhưng không cần lo nếu chúng không khớp 100% với `version1.me` — file rời không phải nguồn dữ liệu thật client dùng.

**Người dùng xác nhận đã hoạt động đúng** (boss preview khớp boss thực tế, ảnh tiêu đề hiện đúng) — coi như hoàn tất mục 跨服BOSS/魔界入侵 boss-preview-mismatch.

## 8.22. Sửa 2 lỗi hiển thị skin "魔界入侵" (Ma Giới Xâm Nhập): số đè chữ + tên boss tràn ô (ảnh IMG_0514/IMG_0516, 2026-07-05)

Người dùng báo 2 lỗi UI trên cùng màn "魔界入侵":

1. **Dòng "Thời gian hồi sinh hàng ngày：" bị số đếm ngược đè lên chữ** (hiện dính "20 130" chồng lên chữ "ngày"). Vị trí: `default.thm.js`, skin `KFInvasionSkin` (`DevildomWindow` dùng skin này), `_Group5_i()` chứa 3 phần: nền `_Image12` (width=210), nhãn chữ `_Label1` ("Thời gian hồi sinh hàng ngày：", x=12), và số đếm `refreshTime` (x=152, cố định). `refreshTime.x=152` được tính cho bản gốc tiếng Trung ngắn hơn nhiều — chữ Việt dài hơn hẳn nên tràn qua đúng vị trí cố định của số, gây đè chồng. Đã sửa: `_Image12.width` 210→400 (nền đủ rộng chứa cả câu), `refreshTime.x` 152→350 (đặt hẳn sau khi câu chữ kết thúc).

2. **Tên boss trong danh sách chọn (4 icon tròn) tràn ngang đè lên tên boss kế bên** (ảnh IMG_0516: "Uyên Ma Quân", "Nhãn Ma Quân", "Quốc Long Ma Quân", "Huyết Ma Quân" chữ dính chồng lên nhau). Vị trí: `default.thm.js`, skin `KFInvasionItemSkin` (dùng cho item renderer `DevildomBossToTab`, mỗi ô chỉ rộng `width=82`) — `nameLabel_i()` **không hề đặt `width`** cho nhãn tên, nên tên dài (nhiều từ Hán-Việt) chỉ hiện 1 dòng và tự do tràn ngang ra khỏi ô 82px, đè lên ô icon kế tiếp. Đã sửa: thêm `t.width=82` (khớp đúng bề rộng ô, ép chữ tự động xuống dòng khi vượt quá), thêm `t.textAlign="center"` (căn giữa từng dòng sau khi xuống dòng), giảm `size` 16→13 (chữ nhỏ lại một chút để 2 dòng vừa vặn hơn trong ô hẹp).

Đổi tên `default.thm_4c3508c6.js`→`default.thm_8763dc5f.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được. Chưa có ảnh xác nhận kết quả cuối — nếu tên boss 2 dòng vẫn hơi sát viền ô icon phía trên (do ô cao cố định 82 mà 2 dòng chữ chiếm nhiều chỗ hơn 1 dòng), có thể cần chỉnh thêm `size`/`bottom` ở vòng sau theo phản hồi thực tế.

Cập nhật thêm (ảnh IMG_0517, 2026-07-05): người dùng xác nhận tiêu đề boss liên server đã hiện đúng ("BỈ NGẠN HOA LINH" — mục 8.19/8.20 coi như hoàn tất). Yêu cầu tiếp: với danh sách item tên boss vừa sửa 2 dòng ở trên, khi 1 item đang ĐƯỢC CHỌN (state "down") thì vẫn phải hiện tên ĐẦY ĐỦ, không bị ép gọn/2 dòng như các item chưa chọn.

Kiểm tra `KFInvasionItemSkin.states` thấy state `"down"` (đúng là state chọn — dựa vào `selectIcon` chỉ ẩn ở state "up"/"disabled", mặc định hiện ở "down") đang để trống, chưa hề override gì. Đã thêm 2 `SetProperty` riêng cho state "down": `nameLabel.width` 82→300 (đủ rộng để tên dài hiện trên 1 dòng, không còn bị ép xuống dòng/cắt như state mặc định), `nameLabel.size` 13→16 (khôi phục cỡ chữ gốc dễ đọc hơn cho item đang được chọn). Item chưa chọn (state "up") vẫn giữ nguyên `width=82,size=13` 2 dòng như bản sửa trước — chỉ riêng item đang chọn mới "phình" ra hiện đầy đủ tên, đúng yêu cầu.

Đổi tên `default.thm_8763dc5f.js`→`default.thm_8f4ad5a3.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

## 8.23. Tên vật phẩm trong hàng "BOSS rơi đồ" tràn đè lên nhau — lỗi ở skin item DÙNG CHUNG toàn game (ảnh IMG_0524/0525/0527, 2026-07-05)

Người dùng báo tiếp: hàng "BOSS rơi đồ" (4 icon vật phẩm rớt ra, hiện ở mọi màn xem trước boss — đã thấy y hệt từ rất nhiều ảnh trước đó trong phiên làm việc này) có tên vật phẩm tràn ngang đè lên nhau ("Kết Tinh Thà" đè "Đồng Tiềnn", "Đông Lai Mi" đè "Du Long Ngọc Phiến"). Người dùng nhấn mạnh: đã copy đúng file `default.thm` mới nhất (bản sửa `KFInvasionItemSkin` ở mục 8.22) nhưng lỗi này vẫn còn — đúng vậy, vì đây **không phải cùng 1 skin**.

**Vị trí thật**: `default.thm.js`, `SkinItem` (`resource/exml/ItemSkin.exml`) — đây là skin GỐC dùng cho `ItemBase`, hiển thị **MỌI icon vật phẩm trong toàn bộ game** (túi đồ, shop, phần thưởng, rương, v.v — không riêng gì màn boss). `nameTxt_i()` bị đúng lỗi kinh điển đã gặp nhiều lần trong phiên này: `left=5` nhưng **không đặt `width`**, nên tên dài tự do tràn ngang qua khỏi ô 76×76 của icon, đè lên icon kế bên.

**Đã sửa**: đổi `t.left=5` thành `t.horizontalCenter=0` + thêm `t.width=76` (khớp đúng kích thước ô icon 76×76) — tên ngắn (đa số trường hợp: số cấp, "999", v.v.) hiển thị y hệt như cũ vì vẫn vừa 1 dòng trong 76px; chỉ tên dài (như tên vật phẩm rơi ra ở đây) mới tự động xuống dòng, không còn tràn qua ô bên cạnh nữa. Vì đây là skin dùng chung toàn game nên bản sửa này có phạm vi ảnh hưởng RỘNG hơn các lần trước (sửa tận gốc, áp dụng nhất quán ở mọi nơi hiển thị icon vật phẩm), nhưng an toàn vì chỉ ảnh hưởng trường hợp tên đã tràn từ trước (vốn đã là lỗi hiển thị), không thay đổi cách hiển thị tên ngắn vẫn đang đúng.

Đổi tên `default.thm_8f4ad5a3.js`→`default.thm_05e00531.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

Cập nhật thêm (ảnh IMG_0530, 2026-07-05): 2 dòng chữ xuống dòng đúng như sửa (không còn tràn/đè nữa) nhưng người dùng thấy XẤU (chữ 2-3 dòng đè lên icon, rối mắt). Yêu cầu đổi hướng: bỏ hẳn hiển thị tên mặc định, chỉ hiện icon; xem tên/thông tin đầy đủ khi bấm vào item (đã có sẵn cơ chế `showDetail()`/mở popup chi tiết khi click, không cần làm thêm).

Kiểm tra `ItemBase` thấy có sẵn 3 hàm public đều dùng để ẩn tên theo từng trường hợp cụ thể (`isShowName(t)`, `hideName()`, `setNameVisible(t)` — đều set `nameTxt.visible`), nghĩa là mặc định gốc của skin là HIỆN tên, và các nơi khác trong code chỉ chủ động ẩn khi cần — không có nơi nào chủ động BẬT hiện tên, nên đổi mặc định của skin sang ẩn sẽ không đụng tới logic hiện có ở bất kỳ đâu khác (an toàn).

Đã sửa `SkinItem.nameTxt_i()`: thêm `t.visible=false` (giữ nguyên `width=76`/`horizontalCenter=0` đã sửa ở trên — không cần revert, phòng trường hợp có nơi nào chủ động bật `visible=true` sau này thì vẫn tự động xuống dòng đúng thay vì tràn). Tên vật phẩm giờ ẩn mặc định trên toàn bộ game (đúng yêu cầu, áp dụng nhất quán mọi nơi dùng `ItemBase`/`SkinItem`), người chơi bấm vào icon vẫn xem được đầy đủ tên qua popup chi tiết như trước giờ.

Đổi tên `default.thm_05e00531.js`→`default.thm_1d41e70d.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

## 8.24. Sửa chồng chéo nhãn "Kích hoạt hoặc nâng cấp..." + tên item, và dịch nốt vài chữ Hán còn sót (ảnh IMG_0531, 2026-07-05)

Người dùng gửi popup chi tiết vật phẩm "Ảo Hình Chiến Linh" ("仙引古灯"/Tiên Dẫn Cổ Đăng), báo dòng nhãn "Kích hoạt hoặc nâng cấp Ảo Hình Chiến Linh:" và tên item cụ thể (ví dụ "Đông Hoàng Chiến Hồn" — placeholder mặc định trong skin) chồng đè lên nhau không đọc được, hỏi có cách nào chia lại skin cho đủ chỗ. Đồng thời chỉ ra vài chữ Hán còn sót không phải ảnh, cần dịch.

**1. Lỗi chồng chéo**: `default.thm.js`, skin `SkinZhanlingZBTips` (`ZhanlingZBTipView`) — `_Label1` ("Kích hoạt hoặc nâng cấp...:", `left=30,top=285`) và `itemname` (tên cụ thể, `horizontalCenter=0,top=285`) **đặt CÙNG toạ độ top**, chỉ khác X — do `_Label1` là câu rất dài (đã tự dịch dài hơn nhiều bản Hán gốc) nên tràn ngang tới tận giữa dòng, đè thẳng lên `itemname` đang canh giữa. Khung chứa chỉ chừa đúng 26px chiều cao giữa dòng nhãn này (top=285) và hàng icon kỹ năng đầu tiên bên dưới (`_Group1.top=311`) — không đủ chỗ để tách 2 dòng riêng nếu giữ nguyên cỡ chữ 18. Đã sửa: giảm cỡ chữ cả 2 nhãn 18→14, xếp `itemname` xuống MỘT DÒNG RIÊNG bên dưới `_Label1` thay vì canh giữa cùng hàng (`_Label1.top=282`, `itemname.left=30,top=300` — thẳng hàng trái với nhau, đúng vừa trong khoảng trống 26px sẵn có, không cần đụng tới `_Group1` hay bất kỳ phần nào bên dưới nên không ảnh hưởng phần còn lại của popup).

**2. Dịch nốt chữ Hán còn sót** (đã phân biệt ảnh vs chữ thật bằng cách grep trực tiếp trong `main.min.js`/`default.thm.js`/resource json):
- "仙引古灯" (chữ dọc cạnh hình ngọn đèn) — **là ảnh bitmap** (không tìm thấy trong bất kỳ file JS/resource text nào) — không sửa được bằng code, cần vẽ lại ảnh như các trường hợp tương tự trước đây (kf_name_*, biaoti_*).
- "激活后获得强力天赋：" — chữ thật trong `main.min.js` (nối trực tiếp với phần mô tả tiếng Việt đã dịch từ config, chỉ riêng phần tiền tố này bị bỏ sót) → dịch thành "Sau khi kích hoạt nhận thiên phú mạnh mẽ:".
- "跨服BOSS" (dòng "Cách nhận" ở cuối popup) — chữ thật, nằm trong data client `resource/config/config.json` và `resource/config1/config4.json` (field `gainWay` của item, dùng chung cho mọi item có nguồn gốc từ 跨服BOSS) → dịch thành "Liên Server BOSS" (khớp cách gọi tính năng này xuyên suốt phiên làm việc). Đã verify JSON hợp lệ sau khi sửa cả 2 file.

Đổi tên `main.min_ac0f2ca2.js`→`main.min_c4a54e04.js`, `default.thm_1d41e70d.js`→`default.thm_c92d98a7.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file JS.

Cập nhật thêm (ảnh IMG_0532, 2026-07-05): người dùng xác nhận layout đã hết chồng chéo, "Liên Server BOSS" đã đúng, nhưng chỉ ra thêm "2阶习得技能"/"5阶习得技能" (bị đọc/gõ nhầm thành "5防得技" trong tin nhắn) v.v. còn sót tiếng Trung. Đây là chữ ghép động trong `main.min.js`: số cấp (`c[0]`, giá trị 2/5/8/10 tuỳ kỹ năng) nối trực tiếp với chuỗi cố định `"阶习得技能"` rồi mới tới tên kỹ năng màu xanh trong 【】. Đã sửa bằng cách viết lại thứ tự ghép chuỗi cho tự nhiên theo tiếng Việt: `c[0]+"阶习得技能|C:...&T:【"+l.name+...`→`"Kỹ năng học được ở cấp "+c[0]+"|C:...&T:【"+l.name+...` (đưa cụm từ lên trước, số cấp ra sau, khớp văn phong tiếng Việt "Kỹ năng học được ở cấp 2 【Bất Phá Kim Thuẫn】" thay vì giữ nguyên thứ tự Hán "2 [cấp] học được kỹ năng"). Xác nhận không còn chuỗi "阶习得技能" nào sót lại trong `main.min.js`.

Đổi tên `main.min_c4a54e04.js`→`main.min_cab37fd0.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

Cập nhật thêm (ảnh IMG_0534/IMG_0535, 2026-07-05): người dùng chỉ thêm nốt "活动" (chữ vàng trong khung "Cách nhận") còn sót tiếng Trung. Cùng field `gainWay` như "跨服BOSS" đã dịch ở mục trên — rà toàn bộ `resource/config/config.json` và `resource/config1/config4.json` thấy `"活动"` xuất hiện đúng 10 lần mỗi file (10 item khác nhau đều ghi nguồn gốc "hoạt động"). Dịch đồng loạt cả 10 chỗ mỗi file thành "Hoạt động" (khớp văn phong đã dùng cho "Hoạt động chưa mở" ở `boss.config` mục 8.19). Verify JSON hợp lệ sau khi sửa cả 2 file.

Đây là data JSON thuần (không phải file JS), không cần đổi tên/cache-bust theo quy ước `default.thm`/`main.min` — nhưng vẫn cần người dùng copy 2 file này lên server thật để có hiệu lực (và làm mới cache trình duyệt nếu file JSON có bị cache riêng).

## 8.25. Sửa chồng chéo tên item/"Điểm:" trong popup Ảo Hình Chiến Linh + dịch nốt vài chữ Hán còn sót (ảnh IMG_0536, 2026-07-05)

Người dùng gửi popup chi tiết item mới ("Đông Lai Minh Đồ"), báo tên item và dòng "Điểm： 38880" đè chồng lên nhau không đọc được.

**Vị trí thật**: `default.thm.js`, skin `SkinUsualEquipTips` (`EquipTipsBase`) — đây LÀ skin đúng cho popup này (đã xác minh bằng cách lần theo `window.SkinUsualEquipTips = (function` trong file, KHÔNG phải các chỗ `nameLabel`/`score` với placeholder "Đồ Long "/"Điểm：" giống hệt nằm ở 3 skin khác hoàn toàn không liên quan — `MixAttributesPanel.exml`, `guardGodWeaponUISkind.exml`, `MijiTipSkin.exml` — do cả 4 skin dùng chung 1 khuôn đặt tên biến/placeholder mặc định khi build từ Egret Wing, cần đối chiếu đúng theo exml-path để không sửa nhầm skin). `nameLabel` (tên item, `textAlign=left`, không có `width`) và `score` (dòng Điểm, `right=20,textAlign=right`, cùng `y` với `nameLabel`) được thiết kế để nằm CHUNG 1 HÀNG, chia trái/phải — đúng cho tên ngắn tiếng Trung gốc, nhưng tên tiếng Việt dài hơn nhiều nên tràn thẳng qua nửa bên phải, đè lên dòng Điểm.

Đã sửa: tách `nameLabel` và `score` thành 2 dòng riêng thay vì chung 1 hàng chia trái/phải — `nameLabel` giữ `x=20,y=20` nhưng giảm `size` 20→16 và thêm `width=330` (ép tự động xuống dòng nếu quá dài, thay vì tràn vô hạn); `score` bỏ `right=20/textAlign=right/width=200`, chuyển thành `x=20,y=40,textAlign=left,size=18→16` (xuống hẳn dòng dưới, canh trái khớp `nameLabel`). Đồng thời đẩy `_Group2` (chứa icon + khối loại/cấp) từ `y=52` xuống `y=64` để chừa đủ chỗ cho 2 dòng tên+điểm phía trên thay vì 1 dòng như trước.

**Dịch nốt chữ Hán còn sót** trong hàm `ZhanLingItemTipsInfo` (`main.min.js`, build dữ liệu cho popup này) và config liên quan:
- `"无级别"` (hiện khi item chưa có cấp) → `"Vô cấp bậc"`.
- `"部位：\n等级："` (nhãn 2 dòng bên trái) → `"Vị trí：\n Cấp bậc："`.
- `"基础属性："` (tiêu đề nhóm thuộc tính cơ bản) → `"Thuộc tính cơ bản："`.
- Dấu phân cách `、` giữa các tên vị trí trang bị trong danh sách liệt kê màu → đổi thành `", "` cho đúng văn phong liệt kê tiếng Việt.
- `"法宝基础属性增加+"` → `"Thuộc tính cơ bản Pháp Bảo tăng thêm +"`.
- `GlobalConfig.ConfigZhanLing.zlEquipName` (mảng tên 4 loại trang bị Ảo Hình Chiến Linh, dùng chung nhiều nơi) — dịch âm Hán-Việt: `铭图→Minh Đồ, 灵晶→Linh Tinh, 符箓→Phù Lục, 器魂→Khí Hồn`. Sửa ở CẢ 2 nơi lưu cùng data này: `resource/config/config.json` (định dạng pretty-print nhiều dòng) và `resource/config1/config6.json` (định dạng compact 1 dòng) — verify JSON hợp lệ cả 2 file sau khi sửa.

Đổi tên `default.thm_c92d98a7.js`→`default.thm_422bc511.js`, `main.min_cab37fd0.js`→`main.min_a570d6e7.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file JS.

Cập nhật thêm (ảnh IMG_0537, 2026-07-05): sau khi hết chồng chéo, người dùng báo dòng "Giảm Sát Thương Chí Mạng Nhất Kích: 2%" quá dài, vẫn tràn khỏi khung (dù không còn đè lên dòng khác). Yêu cầu rút gọn còn "Giảm sát thương chí mạng" và rút gọn luôn dòng "Thuộc tính cơ bản Pháp Bảo tăng thêm" còn "Thuộc tính cơ bản Pháp Bảo tăng".

- `"Giảm Sát Thương Chí Mạng Nhất Kích"` (tên thuộc tính `atDeadLyResist`, trả về từ hàm dùng chung `AttributeData.getAttrStrByType` trong `main.min.js` — dùng làm nhãn ở MỌI nơi hiển thị thuộc tính này trong game, không riêng popup này) → rút gọn thành `"Giảm sát thương chí mạng"`.
- `"Thuộc tính cơ bản Pháp Bảo tăng thêm +"` (chuỗi cục bộ trong `ZhanLingItemTipsInfo`, chỉ dùng riêng cho popup Ảo Hình Chiến Linh) → rút gọn thành `"Thuộc tính cơ bản Pháp Bảo tăng +"`.

Đổi tên `main.min_a570d6e7.js`→`main.min_cd7a75d1.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

Cập nhật thêm (ảnh IMG_0538, 2026-07-05): người dùng báo toàn bộ khối info của item (tên, điểm, icon+vị trí/cấp bậc, Lục Chiến, khối thuộc tính) bị lệch phải trong khung — lề trái dư trong khi lề phải thiếu (chữ dòng "Thuộc tính cơ bản Pháp Bảo tăng: 16%" sát mép phải). Yêu cầu dời toàn bộ sang trái 10px.

Các phần tử con của `anigroup` chịu trách nhiệm hiển thị info đều neo theo `x`/`left` tuyệt đối tính từ mép trái khung 350px (`nameLabel.x=20`, `score.x=20`, `_Group2.x=20` [icon+vị trí/cấp bậc], `powerPanel.x=24` [thanh Lục Chiến], `content.left=24` [khối "Thuộc tính cơ bản"/"Thuộc Tính Bộ Trang Bị"]) — trong khi nền/viền khung (`background`, `quali`) trải đều `left=0,right=0`. Đã giảm đồng loạt 10px ở cả 5 chỗ neo trên (`x=20→10`, `x=24→14`, `left=24→14`) để dịch toàn bộ nội dung info sang trái, không đụng tới nền/viền khung hay các phần tử canh giữa khác (`_Image1` tiêu đề banner, `_Group3` dòng "Chạm vùng trống để đóng cửa sổ", `changeBtn` nút đổi trang bị).

Đổi tên `default.thm_422bc511.js`→`default.thm_d87127bf.js`, cập nhật `manifest.json`. `node -c` qua được.

## 8.26. Rà soát và dịch tiếp một đợt lớn chữ Hán còn sót trong `main.min.js`/`default.thm.js` (2026-07-05)

Theo yêu cầu người dùng ("quay lại vấn đề dịch thuật, xem còn chỗ nào chưa dịch thì làm nốt"), quét toàn bộ 2 file JS bằng regex Unicode CJK (`[一-鿿]+`), thu được **689 cụm chữ Hán riêng biệt còn sót trong `main.min.js`** và một số trong `default.thm.js`. Đây là khối lượng rất lớn (game gốc chưa từng được dịch toàn bộ, chỉ các phần người dùng chụp ảnh báo lỗi mới được xử lý từng đợt) — không thể dịch hết trong 1 lượt, nên ưu tiên xử lý theo nhóm ảnh hưởng nhiều nhất trước, bỏ qua các chuỗi debug/console.log/ErrLog.trace chỉ dành cho dev (không hiển thị cho người chơi).

**Đã dịch xong trong đợt này**:
- `getExtAttrStrByType` (`main.min.js`) — TOÀN BỘ hàm tên các thuộc tính đặc biệt (phản thương, hóa thần, đoạn hồn, bạo kích liên hoàn, đòn may mắn, sát thương Ngự Tiêu/Lạc Anh/Trường Ca, né tránh, chính xác, v.v.) trước đó hoàn toàn chưa dịch — hiện trong tooltip trang bị/pháp bảo có thuộc tính đặc biệt.
- `getEEquipAttrStrByType` — tên "thuộc tính cơ bản" theo từng vị trí trang bị (vũ khí/mũ/áo/vòng tay/hộ uyển/hộ thối/nhẫn/giày).
- `exattrDesObj` — mô tả hiệu ứng đặc biệt Bạch Hổ/Thích Sát Kiếm Pháp (thần binh).
- Thiếu sót nhỏ còn lại trong `getAttrStrByType`: `case atMp` ("当前法力"→"Pháp Lực hiện tại").
- Các mảng tên phẩm chất/cấp bậc dùng nhiều nơi: `qualityName` (thú cưỡi), `equipName` (Thú Đan/Huyết/Khải/Giác/Trảo), `COLOR_STR`, `qualityName` (Phàm/Tinh/Cực/Thần Phẩm), `QUALITY_LABEL_LIST`, `SPECIAL_LABEL_LIST`, `EQUIPE_QUALITY_CN`, `duanName` (bậc đua top: Đồng/Bạc/Vàng/Bạch Kim/Kim Cương/Vương Giả), `duanwei`, `rareText`.
- Tên bộ trang bị/vật phẩm: bộ "Vô Cực" (Thần Kiếm/Đầu Khôi/Thần Giáp/Thủ Trạc/Hộ Uyển/Hộ Thối/Giới Chỉ/Hài Tử), tên cánh (`typeEquipWingToName`: Dực Khu/Dực Trảo/Linh Vũ/Thái Phượng), Bát Môn (`hejiPosName`: Đỗ/Khai/Hưu/Sinh/Tử/Thương/Cảnh/Kinh), vật phẩm Long (`itemTextArr`: Long Giác/Kỳ/Cốt/Vĩ/Châu/Hồn/Tỷ/Lân).
- Tên vòng đấu giải: `STATE_TYPE_CN`, `STATE_TYPE_AWARD_CN`, `STATE_ICON_CN` (2 biến thể), `SERV_CN` (đấu trong server/liên server).
- Toàn bộ mã lỗi tạo nhân vật (`errorCode`, 16 mã) và mã lỗi đăng nhập (`LONGIN_ERROR_CODE`, 9 mã) — hiếm gặp nhưng vẫn dịch cho đầy đủ.
- Một loạt toast/thông báo lẻ: "竞拍成功"→"Đấu giá thành công", "获得奖励如下"→"Nhận được phần thưởng như sau", "铜币不足"→"Không đủ tiền đồng", "道具不足够"→"Không đủ vật phẩm", "使用成功，经脉等阶+1"→"Sử dụng thành công, kinh mạch tăng +1 cấp", "背包已满，无法全部/购买"→"Túi đồ đã đầy, không thể mua hết/mua", "天书不足"→"Không đủ Thiên Thư", "已使用过同类型"→"Đã sử dụng loại này rồi", "兑换失败"→"Đổi thất bại", "仙弓之灵激活/取消数据异常"→lỗi dữ liệu Tiên Cung Chi Linh, "未学习天书的书格无法加锁"→"Ô sách chưa học Thiên Thư không thể khóa".
- **Phát hiện và sửa 2 lỗi hiển thị số** (không chỉ là thiếu dịch mà là bug hiển thị): `GlobalFun.makeTextByNum()` và `StringUtils.NumberToChinese()` là 2 hàm chuyển số thành CHỮ SỐ HÁN VIẾT ĐẦY ĐỦ (một/mười/hai mươi...), được nối trực tiếp với chữ Việt đã dịch sẵn ở nơi gọi (ví dụ `GlobalFun.makeTextByNum(...)+"bậc"`) — kết quả thực tế hiển thị kiểu "十bậc" (số Hán trộn chữ Việt) thay vì "10 bậc". Sửa bằng cách đơn giản hoá cả 2 hàm để trả về SỐ ẢRẬP thường (`t.toString()`) thay vì chữ số Hán viết đầy đủ — khớp quy ước hiển thị số phổ biến trong game Việt, và sửa luôn khoảng trắng thiếu tại nơi gọi (`+"bậc"`→`+" bậc"`).
- `default.thm.js`: các placeholder nhập liệu còn sót — "请输入激活码"→"Nhập mã kích hoạt", "单击此处输入名字"→"Nhấn vào đây để nhập tên", "请输入内容"→"Nhập nội dung", câu chúc Tết placeholder "春风送暖入屠苏..."→"Gió xuân ấm áp, chúc mọi người phen nào cũng có duyên, đánh là ra, nổ là trang bị thần!". Toàn bộ skin `SFHongBaoItem` (tính năng lì xì Tết, 3 mốc chi phí 100/500/1000 điểm) — dịch cả câu mô tả và 3 nhãn "红包/豪华红包/至尊红包"→"Bao Lì Xì/Bao Lì Xì Sang/Bao Lì Xì Tối Thượng" (lưu ý: vị trí 2 số overlay số điểm/số người trong câu mô tả dùng toạ độ x tuyệt đối độc lập với text, nên khoảng trắng giữ chỗ trong câu dịch chỉ là ước lượng tương đối — cần ảnh chụp thực tế để tinh chỉnh nếu bị lệch). Dọn thêm 32 chỗ `fontFamily="黑体"`/`"微软雅黑"` (tên font tiếng Trung dùng làm fallback font) → đổi thành `"Microsoft YaHei"` cho nhất quán, tránh lỗi hiển thị nếu thiết bị không có font Hán.

**Kết quả**: `default.thm.js` giờ đã sạch hoàn toàn chữ Hán (0 cụm còn sót). `main.min.js` giảm từ 689 xuống còn **511 cụm riêng biệt** (784 lượt xuất hiện) — chủ yếu là các thông báo/tooltip lẻ tẻ rải rác khắp game (không tập trung ở 1 hàm dễ xử lý hàng loạt như đợt này), danh sách ~40 tên nhân vật ngẫu nhiên kiểu thơ/ngôn tình Trung Quốc (ví dụ "紫廖歌","半瓶泉水" — cần người dùng quyết định giữ nguyên hay dịch/thay mới vì mang tính thẩm mỹ chủ quan, không phải lỗi), và các chuỗi debug/console.log chỉ dev nhìn thấy (cố tình bỏ qua). Ngoài ra `resource/config/config.json` còn ~134 cụm, `resource/config1/config2,4,5.json` còn tổng cộng thêm ~140 cụm chưa rà — sẽ cần thêm nhiều đợt nữa để dịch hết toàn bộ game.

Đổi tên `main.min_cd7a75d1.js`→`main.min_61427097.js`, `default.thm_d87127bf.js`→`default.thm_fa50fc06.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file.

## 8.27. Dịch tiếp đợt 2 (`main.min.js`): thêm ~150 cụm + phát hiện/sửa 5 bug logic do dịch dở dang trước đây (2026-07-05)

Theo yêu cầu "cứ theo lộ trình mà dịch tiếp, dịch xong thì note vào claude", tiếp tục rà từ 511 cụm còn lại của mục 8.26.

**Đã dịch thêm**: các toast/nhãn lẻ tẻ (đấu giá thành công, nhận thưởng, xem bảng xếp hạng/phần thưởng, đã/chưa đạt được, mở khóa Tiên Vũ/Ngự Khí, đấu giá thất bại, túi đồ đầy, gainWay Yêu Trủng BOSS/Nhiệm Vụ Giới Hạn, Thuộc Tính Chú Linh/Cực Phẩm, Nhận Thần Trang, Thuộc Tính Đặc Biệt, câu flavor text item 269999, Đồ Giám, Hiệu Ứng Khi Đủ Bộ, xóa CD thử thách,元宝月卡/至尊/贵族, mã lỗi kích hoạt 1-8, mã lỗi đăng nhập, Thần Phạt descArr, Tư Chất, Thần Vũ/Vũ Hồn/Vũ Card/Vũ Linh, Chú Hồn, Thú Đan/Huyết/Khải/Giác/Trảo (mảng `posType` — khác mảng `equipName` đã dịch ở 8.26), v.v.

**Quan trọng — phát hiện 5 lỗi LOGIC (không chỉ thiếu dịch) do các đợt dịch trước đây đổi label hiển thị nhưng bỏ sót chỗ SO SÁNH literal Chinese với label đó, khiến điều kiện luôn `false` và tính năng bị vô hiệu âm thầm**:
1. `"骑乘"==this.zhanqilab.text` — nhãn thực tế đã là `"Cưỡi"` từ trước, so sánh với "骑乘" luôn sai → sửa lại literal so sánh thành `"Cưỡi"`.
2. `getInviteDes_a94()` (mời vào nhóm phó bản) — code thay thế ký tự "我" (placeholder "tôi" kiểu Hán) bằng tên người chơi tô màu, NHƯNG `GlobalConfig.ConfigTeamFuBenBase.inviteText` trong config đã được dịch sang tiếng Việt từ trước và không còn chứa ký tự "我" nữa → tên người chơi ÂM THẦM KHÔNG BAO GIỜ được chèn vào tin mời mặc định. Sửa triệt để: bỏ hẳn logic thay thế ký tự, luôn ghép tên phía trước (`return t=e+t`) — khớp hành vi nhánh còn lại (khi người chơi tự gõ nội dung).
3-5. Hệ thống "Ảo Hình Chiến Linh"/Vũ Khí Linh Hoạt (`upGradeBtn0`/`active` button): 4 chỗ so sánh literal Chinese (`"使 用"`, `"取 消"`, `"替 换"`, `"激  活"` — có khoảng trắng đệm giữa 2 chữ theo kiểu canh chữ Hán) trong khi nhãn nút thực tế đã được gán tiếng Việt (`"Sử dụng"`, `"Hủy"`, `"Thay thế"`, `"Kích hoạt"`) từ đợt dịch trước — khiến bấm nút không có phản hồi (Use/Cancel/Replace/Activate không hoạt động). Sửa lại 4 literal so sánh khớp đúng nhãn tiếng Việt thực tế đang dùng. Đồng thời dịch nốt `calldesc="突 破"`→`"Đột Phá"` (biến `calldesc` này parallel với `"Nâng Cấp"`/`"Kích Hoạt"` đã dịch, và cả 2 chỗ so sánh `"突 破"==this.calldesc` được cập nhật đồng bộ nên không bị lỗi tương tự).

Bài học rút ra: khi dịch label hiển thị (`.text=`/`.label=`), LUÔN LUÔN grep toàn file tìm xem có chỗ nào so sánh `"<chuỗi Hán cũ>"==<cùng property>` ở nơi khác không, để tránh vô tình để lại điều kiện chết sau khi đổi 1 phía mà quên phía kia — đã set thói quen này cho các đợt dịch tiếp theo. Cũng tăng độ bền cho hàm `labelTextInfo` (dùng `indexOf` kiểm tra từ khóa để tô màu cảnh báo) bằng cách bổ sung thêm các từ khóa tiếng Việt tương ứng ("Có thể nhận", "Không thể", "Chưa") CHUNG VỚI các từ khóa Hán cũ (không xoá, chỉ thêm) để không phá vỡ trường hợp đang hoạt động.

**Kết quả**: `main.min.js` giảm từ 511 xuống còn **354 cụm riêng biệt** (555 lượt). Vẫn còn scope lớn (danh sách tên ngẫu nhiên ~40 cái, nhiều toast rải rác, chuỗi debug bỏ qua có chủ đích, và toàn bộ `resource/config/*.json` gần như chưa đụng tới) — sẽ tiếp tục ở các đợt sau theo đúng tinh thần rà từng hàm/mảng lớn trước, toast lẻ tẻ sau.

Đổi tên `main.min_61427097.js`→`main.min_d8f18f55.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

## 8.28. Dịch tiếp đợt 3 (`main.min.js`): thêm ~150 cụm nữa + phát hiện thêm 1 bug nút "Hủy" (2026-07-05)

Theo yêu cầu "cứ tiếp tục nha", tiếp tục rà từ 354 cụm còn lại của mục 8.27.

**Đã dịch thêm**: xác nhận dùng vật phẩm Boss Dã Ngoại/Thiên Địa Yêu Trủng vào thử thách, Yêu Trủng Cực Cảnh, thông báo không đủ lượt thử thách mở Yêu Đế Thiên Cung, Thuộc Tính Đặc Biệt/Cộng Thêm Phòng Thủ, tư vấn CSKH, điểm danh thành công/thất bại, đề xuất nhận gấp đôi, đã nhận hết thưởng tích lũy, "Đang trống" (tên chủ công guild trống), Vĩnh viễn, nâng cấp VIP, đổi mã kích hoạt (thành công/đã dùng/không tồn tại), trực tuyến, không thể nâng cấp kỹ năng (Tu Pháp Tĩnh Thất), hướng dẫn chơi, guild battle (tự động chuyển khu vực/hồi sinh cổng Tiên Cung/tự động thoát), xếp hạng kỳ này/trước, màu sắc Trắng/Xanh Lục/Tím/Cam/Đỏ (bộ Chu Tiên), phân giải vật phẩm, đã đạt cấp tối đa, Giảm Sát Thương Thần Phạt, Phàm/Trung/Thượng/Cực/Thần Phẩm (bộ Hồn Cốt), Đặc Biệt/Hồn Cốt, giải đấu liên server (`STATE_KF_TYPE_CN`/`STATE_KF_TYPE_AWARD_CN`/`STATE_KF_ICON_CN`), hệ thống Tiên Cung Chi Linh (kích hoạt/hủy/thông báo giới hạn), giai 1 sao, thuộc tính cơ bản Pháp Bảo, điều kiện nâng cấp, sau khi kích hoạt skin, đổi Tu Vi/cấp, promptList hoạt động (BOSS Chuyển Sinh đã bị tiêu diệt/không có boss đủ điều kiện/đang trong phó bản), xúc xắc "đã tung được X điểm", bảng xếp hạng Vương Giả Tranh Bá, người chơi đang vào game, và màn hình đăng nhập dự phòng (Tài khoản/Mật khẩu/Đăng nhập — màn hình debug hiếm khi hiện vì game thật đăng nhập qua `index.php` với uid/sign).

**Phát hiện thêm 1 bug logic tương tự mục 8.27**: `"取  消"==this.active.label` (2 khoảng trắng đệm, khác với `"取 消"` 1 khoảng trắng đã sửa ở 8.27 — đây là hệ thống Tiên Cung Chi Linh, nút Hủy khác với hệ thống Ảo Hình Chiến Linh đã sửa trước) — nhãn nút thực tế đã là `"Hủy"` từ trước, so sánh với "取  消" luôn sai khiến nút Hủy trong màn hình kích hoạt Tiên Cung Chi Linh không phản hồi. Đã sửa literal so sánh khớp `"Hủy"`.

Dọn thêm 5 chỗ `fontFamily="黑体"` còn sót ở màn hình đăng nhập dự phòng → `"Microsoft YaHei"`.

**Kết quả**: `main.min.js` giảm từ 354 xuống còn **217 cụm riêng biệt** (375 lượt). Còn lại chủ yếu: danh sách ~40 tên ngẫu nhiên kiểu thơ Trung Quốc (`紫廖歌`,...— cần người dùng quyết định), một số toast/nhãn lẻ tẻ, và các chuỗi debug/console.log/ErrLog.trace chỉ dev nhìn thấy (cố tình bỏ qua vì không hiển thị cho người chơi). `resource/config/*.json` vẫn chưa được rà ở các đợt này.

Đổi tên `main.min_d8f18f55.js`→`main.min_bbcd1e2a.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

## 8.29. Dịch tiếp đợt 4 (`main.min.js`): xuống còn 127 cụm — chủ yếu là debug/dead-code/tên ngẫu nhiên (2026-07-05)

Theo yêu cầu "cứ tiếp tục nha", tiếp tục rà từ 217 cụm còn lại của mục 8.28.

**Đã dịch thêm ~90 cụm**: bao gồm nhiều bản sao lặp lại của các khái niệm đã dịch trước đó nhưng nằm ở function/class KHÁC (nút Mua thứ 2 trong hệ thống Chuyển Sinh `advanceUpgrade_a94`/`btn2` — xác nhận cùng quy ước nhãn "Mua" với `btn1` đã sửa ở đợt trước), Huân Chương/Thần Khí/Danh Hiệu/Kỹ Năng Tiên Minh/Tổng Trang Bị/Điểm Trang Bị/Hai Chiếc Nhẫn (bản sao khác của mục đã dịch ở 8.26/8.27), Nhiệm Vụ Giới Hạn, Chí Thánh Trang Bị, Chu Tiên Trân Bảo Hạp, hệ thống nạp VIP/nguyên bảo, các thông báo "Không đủ X, nhận qua các cách sau" (nguyên liệu/tiền tệ/tinh hoa/công huân/điểm thành tựu/uy vọng), hệ thống chuyển sinh (Tu Vi/đổi cấp), `getUnLockStage` (tên mốc ring: đổi từ chữ Hán "一/五/十/二十/四十/六十/八十" thành số Ả Rập thường "1/5/10/20/40/60/80" — nhất quán với cách đơn giản hoá `makeTextByNum`/`NumberToChinese` ở mục 8.26), v.v.

**Kết quả**: `main.min.js` giảm từ 217 xuống còn **127 cụm riêng biệt** (245 lượt) — kiểm tra kỹ cho thấy phần còn lại HẦU HẾT không phải lỗi thiếu dịch mà là:
- Chuỗi debug/console.log/ErrLog.trace/DebugUtils.warn chỉ dev nhìn thấy (không hiển thị cho người chơi) — cố tình giữ nguyên.
- Dữ liệu số Hán (`chnNumCharCN`/`chnUnitChar`/`chnUnitSection`) — đã thành dead code từ khi đơn giản hoá `NumberToChinese` ở mục 8.26, không còn ảnh hưởng hiển thị.
- 1 chỗ so sánh tên `"神兽"==this.infoModel.name` — không tìm thấy monster/pet nào trong config thực sự tên "神兽", nhiều khả năng là điều kiện chết/không bao giờ đúng, không phải text hiển thị.
- Danh sách ~40 tên nhân vật ngẫu nhiên kiểu thơ/ngôn tình Trung Quốc (`紫廖歌`,`半瓶泉水`,`何时苏醒`,...) dùng làm gợi ý đặt tên khi tạo nhân vật — **CẦN NGƯỜI DÙNG QUYẾT ĐỊNH**: giữ nguyên (nhiều game Việt vẫn giữ tên kiểu này như một nét "ngôn tình" quen thuộc), dịch nghĩa, phiên âm Hán-Việt, hay thay hẳn bằng danh sách tên Việt mới.

Với kết quả này, `main.min.js` có thể coi là **về cơ bản đã dịch xong phần văn bản hiển thị cho người chơi** — phần còn sót chủ yếu là các quyết định thẩm mỹ (danh sách tên) hoặc không ảnh hưởng người chơi (debug/dead code). Bước tiếp theo hợp lý là chuyển sang rà `resource/config/*.json` (còn ~134 cụm ở `config.json` + ~140 cụm ở `config1/config2,4,5.json`, theo khảo sát mục 8.26).

Đổi tên `main.min_bbcd1e2a.js`→`main.min_6b83ec7f.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

## 8.30. Phiên âm Hán-Việt danh sách ~31 tên ngẫu nhiên trong hiệu ứng "người chơi vừa vào game" (2026-07-05)

Người dùng chọn hướng xử lý cho danh sách tên còn sót ở mục 8.29 (`紫廖歌`,`半瓶泉水`,...): **phiên âm Hán-Việt** (thay vì giữ nguyên/dịch nghĩa/bỏ qua).

Trước khi sửa, kiểm tra kỹ ngữ cảnh sử dụng để đảm bảo an toàn: mảng `s` này KHÔNG PHẢI gợi ý điền tên khi tạo nhân vật (dù nằm cùng hàm `CreateRoleWin` với `nameInput.maxChars=6` — ô nhập tên thật của người chơi, giới hạn 6 ký tự) — mà được nhân bản 3 lần rồi đổ vào `list.dataProvider` với itemRenderer `CreateRoleNameViewItem`, hàm `dataChanged` của renderer này bọc mỗi tên thành câu "Người chơi  [tên]  đang vào game" hiển thị dạng danh sách cuộn (ticker "mạng xã hội ảo" chạy nền màn hình tạo nhân vật, tạo cảm giác đông người chơi). Vì đây chỉ là text hiển thị thuần tuý (không set vào ô nhập liệu nào), độ dài tên dịch dài hơn bản gốc Hán không gây vấn đề với giới hạn `maxChars=6` của `nameInput` (2 thứ hoàn toàn độc lập).

Phiên âm Hán-Việt từng chữ cho cả 31 tên, giữ nguyên các ký tự trang trí không phải Hán tự (`≈`, `″`, dấu chấm giữa `丶`→`·`, dấu phẩy `、`→`,`) đúng vị trí gốc: Tử Liêu Ca, Bán Bình Tuyền Thủy, Noãn Phong, Phồn Hoa Quá Hậu, Niệm Nhĩ Thành Tập, Nghịch·Mỹ Lệ, Ác Trú Đích Mỹ, Cách Ngạn Quan Hỏa, Tàn Tiếu, Hà Thời Tô Tỉnh, Yên·Nhiên Tận Liễu, Niên Thiếu Vô Tri≈, Tá Bất Điệu Đích Giáp, ″Ôn Đồng Tiệm Viễn≈, Bất Quai (từ `吥乖` — chữ lóng mạng thay cho `不乖`), Tẩu Tứ Phương, Vô Lực Thuyết Ái, Phồn Hoa Thương Tang, Tạp Xích, Vãng Sự Tùy Phong, Kiếm Đảm Cầm Tâm, Tâm Như Chỉ Thủy, Phong Thương Y Cựu, Nhất Trực Đê Điệu, Dao Vong Nhi Lập, Ưu Uất Đích Tát Khắc Tư (từ `萨克斯`=saxophone phiên âm), Ca Bỉ Toản Hoàn Huyễn, Truy Phong, Bản Nhân, Hôn, Toàn Đăng Tương Bạn, Tàn Nguyệt Cô Sinh.

Đến đây, `main.min.js` gần như không còn chữ Hán hiển thị cho người chơi — phần sót lại chỉ còn debug/console.log (dev-only) và dead code số Hán. Có thể coi mục tiêu dịch `main.min.js` đã hoàn thành. Bước tiếp theo: rà `resource/config/*.json` khi người dùng yêu cầu tiếp tục.

Đổi tên `main.min_6b83ec7f.js`→`main.min_1d276185.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được.

## 8.31. Dịch xong toàn bộ `resource/config/*.json` — sạch hoàn toàn chữ Hán (2026-07-05)

Sau khi `main.min.js` cơ bản hoàn thành (mục 8.30), chuyển sang rà 8 file config còn lại: `config/config.json` (định dạng pretty-print, 134 cụm/530 lượt) và `config1/config0-6.json` (định dạng compact, tổng cộng thêm hàng trăm lượt trùng lặp cùng data).

**Nhóm dịch chính trong `config/config.json`** (tất cả đều là field `gainWay`/`desc`/tên hệ thống — dữ liệu hiển thị thuần túy, không có rủi ro bug so sánh literal như trong JS vì `GainWay` chỉ hiển thị `t[0]` làm text, không so sánh):
- Tên tính năng/hoạt động dùng làm tag "Cách nhận" (`gainWay`): Tìm Kho Báu, Hạo Thiên Tháp, Tranh Đoạt Tiên Ngọc, Vương Giả Tranh Bá, Mua tại Cửa Hàng Bí Ẩn, Nạp Hàng Ngày, Vạn Ma Tổ Địa, Điểm Danh Hàng Ngày, Tiên Minh Trấn Yêu, Di La Trân Bảo Điện, Chu Tiên Tầm Bảo, Phó Bản Nguyên Liệu, Vạn Tiên Sát Kiếp, Cửa Hàng Bí Ẩn, Hợp Thành, Cường Hóa, Tinh Luyện, Pháp Thuật, Chiến Trường Liên Server, Cảnh Giới, Vượt Ải, Đấu Trường, Túi Quà Hoạt Động, Tụ Linh Đoạt Trận, Tiên Cung Tranh Bá, Đăng Nhập 7 Ngày, Nung Luyện Trang Bị, Thiên Địa Yêu Trủng, Thưởng Xếp Hạng Bảng Sát Lục, Nhận Từ Rương Báu, Phó Bản Thủ Hộ Thần Kiếm, Thưởng Mùa Giải Đỉnh Phong, Đổi Tại Cửa Hàng Đỉnh Phong, Mua Tại Nhà Đấu Giá, Phân Giải Hỏa Phù, Đổi Mảnh Ghép, Pháp Bảo Mật Tàng, v.v — và các pattern động `"VIPx奖励"`→`"Thưởng VIPx"`, `"VIPx礼包"`→`"Túi Quà VIPx"` (dùng regex thay vì liệt kê từng số).
- Mô tả rương/hòm quà dạng câu (desc array): "几率获得"→"Có tỉ lệ nhận được ", "必定获得"/"必得"/"几得"→"Chắc chắn nhận được/nhận/có tỉ lệ nhận ", "个特戒精华"→" Tinh Hoa Nhẫn Đặc Biệt", "张X色(品质)卡片"→" tấm thẻ bài (phẩm chất) màu X" (4 màu: Xanh Dương/Xanh Lục/Tím/Cam) — đây là các cụm nối chuỗi động (số lượng + item), không phải câu cố định, nên dịch riêng từng mảnh rồi ghép lại giữ đúng vị trí số ở giữa.
- Tên vật phẩm Ngự Tiêu/Lạc Anh/Trường Ca (linh khí, thạch, chi tâm/diệp/âm, kiếm/vũ/cầm ý) — theo đúng quy ước class name đã dùng xuyên suốt phiên làm việc.
- Tên bộ trang bị Long (龙角等) — Long Giác/Kỳ/Cốt/Vĩ/Châu/Hồn/Tỷ/Lân, khớp `itemTextArr` đã dịch trong `main.min.js` mục 8.26.
- Cụm mô tả công trình Tiên Minh (`buildingTips`/`buildingNames`/`practiceSkillNames`), tên "Thức Tỉnh Đặc Biệt"/"Thức Tỉnh Long Nguyên" theo 5 màu (Xanh Ngọc/Xanh Thẳm/Tím U/Cam Phong/Đỏ Huyết), kỹ năng công hội (Luyện Thể/Lợi Binh/Kết Thuẫn), skillTips "Khi tấn công người chơi có uy vọng thấp hơn bản thân, tăng X% sát thương" (4 biến thể X=7/10/12/15).

**Đồng bộ sang `config1/*.json`**: dùng chung bộ 130 cặp old→new (dạng flat quoted-string, không gộp theo mảng như bản pretty-print để tránh vấn đề khoảng trắng format khác nhau giữa pretty/compact JSON) áp trực tiếp cho `config1/config2.json` (60 lượt), `config1/config4.json` (356+16 lượt gồm cả regex VIP), `config1/config5.json` (82 lượt) — xác nhận đây là data TRÙNG LẶP với `config.json` (cùng nội dung, chỉ khác format). Rà thêm 2 file trước đó chưa kiểm: `config1/config3.json` (9 cụm — mảng `state` các giai đoạn tu luyện: Mông Trần/Vấn Tâm/Cầu Chân/Phá Vọng/Tu Pháp/Lịch Kiếp/Đại Thừa, và `headName`:["Thần","Đạo"]) và `config1/config6.json` (5 cụm — `sSkillUseText` giống hệt mẫu đã dịch trong `config.json`).

**Kết quả**: cả 8 file config (`config/config.json`, `config1/config0-6.json`) đều **sạch hoàn toàn chữ Hán**, verify JSON hợp lệ từng file bằng `python3 -c "import json; json.load(...)"`. Đây là data JSON thuần, không cần đổi tên/cache-bust theo quy ước `default.thm`/`main.min` — chỉ cần người dùng copy các file này lên server thật để có hiệu lực.

**Xác minh file nào THỰC SỰ được client load** (bài học từ vụ `version1.me` ở mục 8.20 — không phải file nào giống tên cũng được dùng): grep `default.res3.json` (manifest gốc, xác nhận đang dùng thật) thấy đúng entry `"config/config.json?1546506039"` (resource id `config_json`) — xác nhận `config/config.json` (file rời, vừa dịch) CHÍNH LÀ file thật được client tải. Ngược lại, `config.me`/`config1.me` (2 file zip nén cùng thư mục) chỉ được tham chiếu trong `default.res1.json`/`version.json` — 2 manifest KHÔNG xuất hiện trong danh sách file mà `main.min.js` thực sự gọi tới khi runtime (chỉ gọi `default.res2/3/4.json` + `version1.me`/`version.txt`, không có "res1"/"version.json" số ít) → đây là tàn dư từ một cơ chế versioning CŨ trước khi đổi sang hệt thống res2/res3/res4+version1.me hiện tại, không ảnh hưởng bản dịch. Tương tự, `config1/config0-6.json` (7 file đã dịch đồng bộ ở trên) không được `default.res3.json` hay bất kỳ đâu trong `main.min.js`/`default.thm.js` tham chiếu tới — cũng là file chết, việc dịch chúng chỉ mang tính nhất quán dữ liệu chứ không có tác dụng thực tế với client (không cần copy lên server thật, nhưng cũng vô hại nếu có copy).

## 8.32. Icon "封神/灵宠/神御/仙纹/诛仙/幻化" là chữ vẽ trong ảnh — không sửa bằng code được (ảnh IMG_0554, 2026-07-06)

Người dùng hỏi dãy 6 icon chức năng (hiện trong màn Nhân Vật) lấy từ đâu, có sửa được không.

**Xác định nguồn**: các icon này là 6 nút bấm trong `_Group2_i()` của skin `SkinRoleInfo` (`resource/exml/RoleInfoSkin.exml`, biên dịch vào `default.thm.js`) — biến `orange`/`bless`/`shenlu`/`rune`/`Skinheirloom`/`shuzhuang`, dùng icon lần lượt `juese_chengzhuang`/`juese_tejie`/`juese_baowu`/`juese_zhanwen`/`juese_chuanshi`/`juese_zhuangban`. Các icon này là frame cắt ra từ 1 texture atlas dùng chung: `resource/eui/ui/tj6.json` (bản đồ toạ độ) + `resource/eui/ui/tj6.png` (ảnh gộp). Mở `tj6.png` xác nhận chữ Hán (封神/灵宠/神御/仙纹/诛仙/幻化, cùng nhiều icon khác dùng chung sheet như "能力一览"/"套装效果"/"神罚技能"/"分解"/"属性详情"/"注灵"/"兑换") được **VẼ TRỰC TIẾP VÀO BITMAP**, không phải text trong code/JSON — giống hệt trường hợp `kf_name_*`/`biaoti_*` đã gặp trước đây. Vì vậy KHÔNG dịch được bằng cách sửa code — cần vẽ lại icon mới (chữ Việt) đè đúng toạ độ trong `tj6.json`, hoặc bỏ chữ khỏi icon và thêm `eui.Label` riêng đè lên (cần sửa `default.thm.js`). Đã báo người dùng, chưa xử lý (chờ quyết định hướng làm hoặc ảnh mới).

## 8.33. Sửa dòng "Hôm nay còn có thể đổi...次" còn sót chữ Hán + dòng trống thừa trong popup Nhận Tu Vi (ảnh IMG_0557, 2026-07-06)

Người dùng báo popup "Nhận Tu Vi" (đổi Tu Vi bằng EXP/Chuyển Sinh Đan) còn sót chữ Hán "次" (lần) ở dòng "Hôm nay còn có thể đổi...次", và dòng "Đổi cấp： giảm 1 cấp" bị cách 1 dòng trống phía trên (mất cân đối) — yêu cầu đưa lên liền dòng, đồng thời các dòng tương tự khác (Chuyển Sinh Đan/Chuyển Sinh Tiên Đan) cũng bị trống dòng tương tự cần sửa đồng bộ.

**Vị trí**: `main.min.js`, class `GainZsView` (skin `SkinGainZs`) — hàm build data cho 3 dòng đổi thưởng:
- `"次"` còn sót nguyên văn ở CẢ 3 dòng `toDay0/1/2` (`"Hôm nay còn có thể đổi"+t+"</font>次"`) — dịch thành `"</font> lần"`.
- Dòng trống thừa: `infoTxt0/1/2` dùng `"...Tu Vi\n\nĐổi cấp：..."` / `"...Tu Vi\n\n"+r.name+"：..."` — **2 dấu xuống dòng liên tiếp (`\n\n`)** giữa tên phần thưởng và dòng mô tả cách đổi, y nguyên từ bản gốc tiếng Trung (lúc đó text ngắn 1 dòng nên khoảng trống này không rõ, nhưng chữ Việt dài hơn tràn thành 2 dòng khiến khoảng trống bị lộ rõ thành "1 dòng trống" y như người dùng mô tả). Sửa `\n\n`→`\n` ở cả 3 chỗ (dòng EXP + 2 dòng item Chuyển Sinh Đan/Tiên Đan) — bỏ hẳn dòng trống, "Đổi cấp"/tên item lên ngay sau dòng "Tu Vi".
- Tiện thể sửa luôn `"Còn lại"+h+"cái"` thiếu khoảng trắng quanh số (hiện "Còn lại5cái") → `"Còn lại "+h+" cái"`.

**`default.thm.js`, skin `SkinGainZs`**: nhãn `toDay0/1/2` (dòng "Hôm nay còn có thể đổi/dùng...") có `width=165` quá hẹp so với câu chữ Việt dài hơn nhiều bản Hán gốc, khiến chữ bị ngắt XUỐNG DÒNG GIỮA TỪ (kiểu bẻ theo từng ký tự thay vì theo từ — "đổi" bị tách thành "đ" + "ổi3 lần") — lỗi hiển thị xấu hơn cả việc thiếu dịch. Đã tăng `width` 165→220 và giảm `size` 18→16 cho cả 3 nhãn để câu vừa gọn hơn, không còn bị bẻ giữa từ. Vị trí này (`verticalCenter=-40`, nằm ở dải trên cùng của mỗi hàng, tách biệt với `infoTxt`/`btn` nằm dải giữa) nên việc nới rộng không chạm tới phần tử nào khác.

Lưu ý: dòng "Chuyển Sinh Đan： C" (chữ bị cắt cụt chỉ còn "C") trong ảnh gốc nhiều khả năng tự khắc phục sau khi bỏ dòng trống thừa (trước đây thiếu đúng 1 dòng không gian hiển thị do `\n\n` chiếm chỗ, nay dư ra đúng 1 dòng cho phần "Còn lại X cái" hiện đầy đủ) — cần ảnh xác nhận thực tế ở vòng sau.

Đổi tên `default.thm_fa50fc06.js`→`default.thm_6b79ccee.js`, `main.min_1d276185.js`→`main.min_379445bf.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file.

Cập nhật thêm (2026-07-06): người dùng phản hồi 2 việc — (1) bỏ hẳn ý tưởng vẽ lại icon `封神/灵宠/神御/仙纹/诛仙/幻化` ở mục 8.32 (không làm); (2) dòng "Còn có thể đổi" KHÔNG cần thu nhỏ cỡ chữ, chỉ cần rút gọn câu chữ là đủ. Đã revert `size` 16→18 (giữ nguyên `width=220` đã nới), và rút ngắn text nguồn: `"Hôm nay còn có thể đổi"`→`"Còn có thể đổi"` (cả 3 chỗ trong `main.min.js` nơi build textFlow thực tế, và đồng bộ luôn placeholder mặc định trong `default.thm.js` — `toDay0` "Hôm nay còn có thể đổi"→"Còn có thể đổi", `toDay1`/`toDay2` "Hôm nay còn có thể dùng"→"Còn có thể dùng" — dù placeholder này thực tế bị ghi đè lúc runtime, vẫn sửa cho nhất quán).

Đổi tên `default.thm_6b79ccee.js`→`default.thm_1fa434bf.js`, `main.min_379445bf.js`→`main.min_acec48fa.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file.

## 8.34. Tách tên item ra khỏi dòng mô tả, đặt trên icon; đổi màu dòng "Còn lại X cái" thành xanh lá (ảnh IMG_0559, 2026-07-06)

Người dùng yêu cầu tái cấu trúc layout 2 dòng "Chuyển Sinh Đan"/"Chuyển Sinh Tiên Đan" trong popup Nhận Tu Vi (`GainZsView`, skin `SkinGainZs`): tách tên item ra khỏi câu mô tả, đặt PHÍA TRÊN icon viên đan; phần "Còn lại X cái" giữ nguyên vị trí cũ trong câu nhưng đổi màu xanh lá.

**Điều tra trước khi sửa**: kiểm tra `ItemBase.dataChanged()` xem icon có sẵn ô số lượng ("count" badge góc dưới-phải, vị trí x=45,y=56 trong `SkinItem`) tự động hiển thị không — phát hiện nhánh xử lý khi `.data` là số ID thuần (đúng trường hợp dùng ở đây: `this.items[1].data=a`) KHÔNG gọi `setCount(...)`, nghĩa là badge số lượng này không hoạt động ở đây (đang trống). Do đó "vị trí cũ của số 12" được hiểu là vị trí hiện tại của cụm "Còn lại 12 cái" NGAY TRONG câu text (không phải một badge riêng trên icon) — chỉ cần bỏ phần tên item phía trước nó và đổi màu, không cần đụng tới cơ chế `count` dùng chung của `ItemBase`.

**`default.thm.js`, skin `SkinGainZs`**: thêm 2 Label mới `nameTxt1`/`nameTxt2` (thêm vào `skinParts`, tạo hàm `nameTxt1_i()`/`nameTxt2_i()`, thêm vào `elementsContent` của `gr2_i()`/`gr3_i()`) — đặt `left=17` (khớp lề trái icon), `width=76` (khớp bề rộng icon 76×76 của `SkinItem`), `top=2`, `textAlign=center`, `size=13` — nằm ở dải trên cùng của hàng (icon dùng `verticalCenter=0` nên có khoảng trống phía trên đủ chỗ đặt caption nhỏ).

**`main.min.js`, class `GainZsView`**: sau khi set `this.items[1].data=a`/`this.items[2].data=a`, gán thêm `this.nameTxt1.text=r.name` / `this.nameTxt2.text=r.name` (tên item lấy từ `GlobalConfig.ConfigItem`, hiện phía trên icon). Đồng thời bỏ phần `r.name+"："` ra khỏi `infoTxts[1]/[2].textFlow`, chỉ còn `"Tăng thêm X Tu Vi\n"` + (nếu có hàng tồn kho) `"Còn lại X cái"` bọc trong `<font color="#00a007">` (xanh lá) — giữ nguyên vị trí trong câu (dòng thứ 2, sau "Tu Vi"), chỉ đổi màu và bỏ tiền tố tên.

Lưu ý: chưa có ảnh xác nhận kết quả thực tế — tên item dài ("Chuyển Sinh Tiên Đan", 20 ký tự) ở size 13/width 76 có thể phải xuống 2 dòng, hơi sát mép trên của icon; nếu bị chật/đè lên icon khi xem ảnh thật, vòng sau sẽ giảm thêm size hoặc đẩy icon xuống thấp hơn.

Đổi tên `default.thm_1fa434bf.js`→`default.thm_edd8b686.js`, `main.min_acec48fa.js`→`main.min_57c06de4.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file.

**Sự cố xen giữa (2026-07-06)**: người dùng báo không vào được màn chọn server, gửi kèm log network cho thấy `eui.min_506ce9f.js` trả về **404** trên server thật. Xác minh: file này chưa từng bị đụng tới bởi bất kỳ commit dịch thuật/sửa UI nào trong suốt phiên làm việc (`git log --follow` chỉ có đúng "Initial commit"), và tồn tại đầy đủ (210KB) trong repo — kết luận đây là sự cố phía triển khai trên server thật (file bị thiếu/xoá nhầm khi copy), không liên quan tới các thay đổi code. Đã gửi lại file `eui.min_506ce9f.js` cho người dùng qua `SendUserFile` để họ tự upload thay thế. Người dùng xác nhận sau đó đã vào lại được.

## 8.35. Canh giữa dòng "Còn có thể đổi X lần" theo tâm nút bấm + thêm khoảng trắng + rút gọn nhãn nút (ảnh IMG_0560, 2026-07-06)

Sau khi xác nhận layout tách tên item ở mục 8.34 hoạt động đúng (tên hiện trên icon, "Còn lại X cái" xanh lá), người dùng chỉ ra 3 điều cần chỉnh tiếp trong cùng popup Nhận Tu Vi:

1. **Dòng "Còn có thể đổi3 lần" bị lệch, không canh giữa nút bấm phía dưới** — nhìn "kỳ". Nguyên nhân: `toDay0/1/2` dùng neo `right=8` (đo từ mép phải nhóm) trong khi nút `btn0/1/2` dùng `horizontalCenter=142.5`/`146`/`146` (đo từ tâm nhóm) — 2 hệ quy chiếu khác nhau nên tâm 2 phần tử lệch nhau dù cùng `textAlign=center`. Sửa bằng cách đổi `toDay0/1/2` từ `right=8` sang `horizontalCenter` cùng giá trị với nút tương ứng (`142.5`/`146`/`146`) — đảm bảo tâm dòng chữ luôn khớp tâm nút bất kể `width`.
2. **Thiếu khoảng trắng giữa "đổi" và số lần** (hiện "đổi3 lần") — sửa `"Còn có thể đổi<font...>"` → `"Còn có thể đổi <font...>"` (thêm dấu cách trước số) trong `main.min.js`, cả 3 chỗ.
3. **Nút "Sử dụng ngay" bị tràn 2 dòng ("Sử dụng nga/y")** — rút gọn thành `"Sử dụng"`. Phát hiện chuỗi này còn được DÙNG LÀM ĐIỀU KIỆN SO SÁNH ở `onClick_a94` (`"Sử dụng ngay"==this.btns[e].label`) để quyết định hành vi khi bấm nút — nếu chỉ đổi chỗ gán nhãn mà quên đổi chỗ so sánh sẽ lặp lại đúng loại bug đã gặp nhiều lần trước đây (nút bấm không phản hồi). Đã dùng `replace_all` cho toàn bộ 4 chỗ chứa `"Sử dụng ngay"` (2 chỗ gán nhãn trong `GainZsView` + 1 chỗ gán nhãn ở hàm khác dùng chung 3 nút này + 1 chỗ so sánh) để đảm bảo đồng bộ.

Đổi tên `default.thm_edd8b686.js`→`default.thm_d927d154.js`, `main.min_57c06de4.js`→`main.min_77e45384.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file.

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

## 10. Hệ thống thanh toán PayPal + công tắc GM bật/tắt yêu cầu trả tiền thật (2026-07-06)

Người dùng yêu cầu: bỏ cổng thanh toán hiện tại, thay bằng PayPal (tài khoản nhận tiền cập nhật trực tiếp trong GM tool), và GM tool cho phép bật/tắt riêng cho "mua VIP" và "nạp nguyên bảo" — bật thì bắt buộc trả tiền thật qua PayPal, tắt thì người chơi bấm mua là được (miễn phí), nhưng vẫn phải hiện popup xác nhận trước khi cộng.

### 10.1. Khảo sát hiện trạng (dùng 2 agent song song trước khi code)

**Hệ thống nạp tiền/VIP hiện tại KHÔNG tự động** — client (`main.min.js`, class `SDkMsg`) chỉ gọi GET trực tiếp ra cổng trung gian Trung Quốc `https://cls.ha02.youyantech.com/$channelid$/pay.php` (hàm `PayMoneyByBrowser`) rồi redirect trình duyệt tới URL cổng đó trả về; **không có file nào trong repo nhận kết quả thanh toán về (webhook)**. Trên thực tế, việc cộng tiền thật hiện đang làm THỦ CÔNG: admin vào tool GM web (`gm/gmquery.php` case `'charge'`) bấm nút, PHP **insert giả 1 dòng vào bảng MySQL `feecallback`** y hệt cổng thanh toán thật báo về. `DBServer` (file .exe biên dịch sẵn, không có mã nguồn trong repo) định kỳ gọi stored procedure `loadfee` đọc bảng này, đẩy sang Lua (`server/bin/s1/gameworld/data/functions/systems/actorsystem/sdkapi/sdkapi.lua` hàm `onFeeCallback`), gọi hàm gốc `LActor.addRechargeOffline(actorid, count, itemid)` để cộng nguyên bảo + tính lại cấp VIP (`actorvip.lua` hàm `onCharge`, dựa trên tổng nguyên bảo tích luỹ so với ngưỡng `VipConfig[level].needYb`).

→ **Kết luận quan trọng**: bảng `feecallback` chính là API "báo thanh toán thành công" đã có sẵn và đang chạy thật trong production — đây là điểm nối lý tưởng cho PayPal, không cần đụng vào Lua/server chút nào.

Tiền lệ có sẵn cho việc "coi như đã trả tiền mà không cần cổng thật":
- Lệnh GM trong game `@addrecharge <số>` → `vip.gmTestRecharge` → `LActor.addRecharge(actor, yb, -1, ...)` (order_num = -1 đánh dấu không phải giao dịch thật).
- Tool GM web hiện tại chính là ví dụ thứ 2 (insert thẳng `feecallback`).

Xác định "mua VIP" thực chất KHÔNG phải giao dịch tiền thật riêng — VIP tự tính từ tổng nguyên bảo nạp tích luỹ. Tuy nhiên có 2 gói nạp đặc biệt được `onFeeCallback` xử lý khác (kích hoạt thẻ tháng thay vì cộng thường): nguyên bảo = 300000 (`monthCardMoney`, `server/bin/s1/gameworld/data/config/monthcard/monthcardconfig.config`) và 880000 (`priviMoney`, `.../privilege/privilegeconfig.config`) — dùng 2 giá trị này để phân biệt "gói VIP/thẻ tháng" với "nạp nguyên bảo thường" cho đúng 2 công tắc người dùng yêu cầu.

### 10.2. Kiến trúc lựa chọn: toàn bộ logic bật/tắt nằm ở PHP, không đụng Lua/server

Vì "thanh toán thành công" ở hệ thống này chỉ là 1 dòng insert vào `feecallback`, và cả 2 trường hợp (trả tiền thật qua PayPal / miễn phí do GM tắt công tắc) đều chốt lại bằng đúng thao tác đó — toàn bộ tính năng mới được xây dựng HOÀN TOÀN Ở TẦNG PHP, không sửa 1 dòng Lua nào (giảm rủi ro tối đa vì Lua chạy trên server thật, không test được từ môi trường này).

**File mới trong `phpStudy/PHPTutorial/WWW/gm/`**:
- `sql/payment_config.sql` — script tạo 2 bảng mới, chạy 1 lần trên DB `actors` của từng server (theo `$quarr` trong `config.php`):
  - `payment_config` (1 dòng/server): `paypal_mode` (sandbox/live), `paypal_client_id`, `paypal_secret`, `paypal_receiver_email`, `paypal_webhook_id`, `vip_require_payment`, `yuanbao_require_payment`, `usd_conversion_rate`.
  - `payment_orders`: chống cộng trùng theo `order_id` (đơn PayPal thật lẫn đơn "miễn phí" đều đi qua bảng này, trạng thái `created`/`pending_confirm`/`credited`/`failed`).
- `paypal_lib.php` — thư viện dùng chung: `pp_get_access_token` (OAuth2 client_credentials), `pp_create_order`/`pp_capture_order` (PayPal Orders v2 REST API), `pp_verify_webhook_signature` (xác minh chữ ký webhook thật, chống giả mạo request), `pp_credit_order` (insert `feecallback` — đúng cơ chế tool GM `'charge'` đang dùng — có kiểm tra chống cộng trùng qua `payment_orders.status`).
- `recharge_tiers.php` — danh sách các mốc "cash" hợp lệ trích từ `resource/config/config.json` → `ConfigRechargeItems` (`[6,10,12,20,25,30,50,68,100,108,128,198,200,258,328,500,518,648,1000,1500,2000,3000]`) để CHẶN việc client tự sửa tham số `amount` thành số tuỳ ý gửi lên (bản gốc `PayMoneyByBrowser` không hề ký/băm payload) — đây là 1 lỗ hổng có sẵn từ trước, tiện thể vá luôn khi làm endpoint mới. Cũng định nghĩa hằng số `VIP_MONTHCARD_YUANBAO=300000`/`VIP_PRIVILEGE_YUANBAO=880000` để phân biệt gói VIP.
- `pay_create_order.php` — endpoint THAY THẾ URL youyantech.com mà client gọi. Giải mã payload y hệt format cũ (`data`=base64(encodeURIComponent(JSON)), lấy `ZoneID`/`UserID`/`RoleID`/`amount` từ đó — không cần tra DB tìm actorid vì client đã tự gửi `RoleID` sẵn), validate `amount` nằm trong danh sách hợp lệ, tính `yuanbao = cash*100`, xác định có phải gói VIP không, đọc `payment_config` để biết công tắc đang bật/tắt:
  - **Tắt** (không cần trả tiền): KHÔNG cộng tiền ngay — trả JSON `{"mode":"free","orderId":...,"message":"Xác nhận để nhận X nguyên bảo?"}` để client tự hiện popup xác nhận trước (đúng yêu cầu), chỉ ghi `payment_orders` trạng thái `pending_confirm`.
  - **Bật** (bắt buộc trả tiền thật): gọi PayPal tạo đơn thật (quy đổi USD qua `usd_conversion_rate` — **CẦN admin tự chỉnh đúng giá trước khi mở live**, hiện để mặc định 1.0 làm placeholder), trả JSON `{"mode":"paypal","approveUrl":...}` để client redirect sang trang PayPal thật.
- `pay_free_finalize.php` — bước 2 của chế độ miễn phí: client gọi SAU KHI người chơi bấm "Đồng ý" trên popup, kiểm tra lại công tắc còn tắt tại thời điểm xác nhận (tránh trường hợp GM vừa bật lại giữa lúc popup đang hiện), rồi mới thật sự `pp_credit_order`.
- `pay_capture.php` — trang PayPal chuyển trình duyệt người chơi về sau khi họ approve/huỷ thanh toán (return_url/cancel_url) — capture đơn PayPal, credit `feecallback`, hiện trang HTML đơn giản kèm nút quay lại game.
- `pay_webhook.php` — webhook PayPal (server-to-server, đăng ký URL trong PayPal Developer Dashboard) nhận sự kiện `PAYMENT.CAPTURE.COMPLETED`, xác minh chữ ký qua `pp_verify_webhook_signature`, credit `feecallback` — lớp bảo hiểm thứ 2 phòng trường hợp người chơi đóng trình duyệt trước khi được PayPal chuyển về `pay_capture.php` (không lo cộng trùng vì `pp_credit_order` idempotent theo `order_id`).

**Sửa file có sẵn**:
- `gm/gm.php` — thêm khối "Cài đặt thanh toán PayPal": chọn chế độ sandbox/live, nhập Client ID/Secret/email nhận tiền/Webhook ID/tỉ giá USD, 2 checkbox bật/tắt (VIP, Nguyên Bảo), nút "Tải cấu hình hiện tại"/"Lưu cấu hình" (theo đúng phong cách jQuery ajax có sẵn của trang, dùng chung mã GM và chọn khu vực).
- `gm/gmquery.php` — thêm `include 'paypal_lib.php'`, 2 case mới: `getpaymentconfig` (đọc cấu hình hiện tại, KHÔNG trả secret thật về client để tránh lộ khi xem mã nguồn trang), `setpaymentconfig` (ghi `payment_config`, secret chỉ bị ghi đè khi GM thực sự nhập giá trị mới — để trống nghĩa là giữ nguyên).
- `js/main.min.js`, class `SDkMsg`:
  - `PayMoneyByBrowser`: đổi URL đích từ `https://cls.ha02.youyantech.com/...` sang `gm/pay_create_order.php` (cùng domain, đường dẫn tương đối vì `gm/` nằm cùng cấp `index.php`), giữ nguyên cơ chế `StringUtils.replaceByParam` (giữ đủ 3 tham số vị trí `$0$/$1$/$2$` dù tham số đầu `ch` không còn dùng, tránh lệch vị trí args). Lưu thêm `this.pay_order_id`/`this.pay_zone_id` để dùng ở bước xác nhận miễn phí.
  - `OnPaySuccess`: trước đây coi response là URL để redirect thẳng (`top.location.href=i`) — nay parse JSON, rẽ nhánh theo `mode`: `paypal`→redirect `approveUrl`; `free`→`WarnView.show(message, ConfirmFreePayment)` (đúng yêu cầu vẫn hiện popup xác nhận); `error`→hiện tip lỗi.
  - Thêm hàm mới `ConfirmFreePayment(orderId)`: gọi `pay_free_finalize.php`, hiện kết quả qua `UserTips`.

### 10.3. Việc CẦN làm thêm trước khi dùng thật (không thể hoàn tất từ môi trường sandbox này)

1. **Chạy `gm/sql/payment_config.sql`** trên DB `actors` của từng server (server 1 đã có sẵn dòng mặc định `vip_require_payment=1, yuanbao_require_payment=1` — tức mặc định vẫn yêu cầu trả tiền thật, an toàn).
2. **Điền PayPal Client ID/Secret** (đã có sẵn theo người dùng xác nhận) vào mục "Cài đặt thanh toán PayPal" trong `gm/gm.php`.
3. **Đăng ký Webhook** trong PayPal Developer Dashboard trỏ về `https://<domain>/gm/pay_webhook.php`, chọn sự kiện `PAYMENT.CAPTURE.COMPLETED`, lấy Webhook ID điền vào GM tool.
4. **Chỉnh `usd_conversion_rate`** cho đúng giá thật (hiện để mặc định 1.0 chỉ là placeholder — 1 đơn vị "cash" client gửi lên nhân với tỉ giá này ra số USD thu qua PayPal).
5. Khuyến nghị bảo mật (không phải yêu cầu ban đầu nhưng nên lưu ý): cơ chế xác thực GM tool hiện tại (`gm/gmquery.php`) chỉ là 1 chuỗi bí mật cố định gõ trong code (`$gmcode=='syymw.com'`), không có đăng nhập thật/giới hạn IP — nay mục này có thêm dữ liệu nhạy cảm (PayPal Secret), nên cân nhắc đổi mã GM mặc định và/hoặc giới hạn IP truy cập `gm/` ở tầng web server.

`node -c` qua được cho `main.min.js`, `php -l` qua được cho cả 7 file PHP mới/sửa. Đổi tên `main.min_77e45384.js`→`main.min_13338353.js`, cập nhật `manifest.json`/`index.php` (không đụng `default.thm.js` lần này).

### 10.4. Sửa lỗi import SQL: `1067 - Invalid default value for 'updated_at'`

Khi chạy `gm/sql/payment_config.sql`, một số bản MySQL/MariaDB cũ (thường gặp trên MySQL đi kèm phpStudy) báo lỗi 1067 vì cột kiểu `DATETIME` không hỗ trợ `DEFAULT CURRENT_TIMESTAMP`/`ON UPDATE CURRENT_TIMESTAMP` — khả năng này chỉ có sẵn ở kiểu `TIMESTAMP`, MySQL mới thêm cho `DATETIME` từ bản 5.6.5. Do `CREATE TABLE` thất bại toàn bộ nên bảng `payment_config` (và có thể cả `payment_orders`) chưa được tạo.

Đã đổi `updated_at` (trong `payment_config`) và `created_at` (trong `payment_orders`) từ `DATETIME` sang `TIMESTAMP`, giữ nguyên hành vi tự động điền giờ hiện tại. File vẫn idempotent (`CREATE TABLE IF NOT EXISTS` + `INSERT ... ON DUPLICATE KEY UPDATE`) nên chạy lại toàn bộ file từ đầu là an toàn.

## 11. Dịch giao diện GM tool sang tiếng Việt + đăng nhập thật + quản lý người chơi (2026-07-06)

### 11.1. Dịch toàn bộ tiếng Trung còn sót trong `/gm/`

Panel `gm/gm.php` trước đó vẫn hiển thị 100% nhãn/tiêu đề/thông báo bằng tiếng Trung (title, các label, placeholder, nút bấm, toàn bộ `alert()` trong JS) dù các trang khác trong game đã được dịch — lý do là công cụ này chưa từng nằm trong phạm vi dịch trước đây. Đã dịch toàn bộ sang tiếng Việt trong `gm/gm.php`, `gm/gmquery.php` (message trả về JSON: lỗi kết nối DB, tài khoản không tồn tại, nạp/gửi/khoá/mở khoá/cấm chat thành công...), và `gm/itemquery.php`. Cũng đổi tên mail sender/title hardcode `御剑伏魔录GM邮件` (tên một game khác, có vẻ sót lại từ template gốc) thành `Túy Võ Hiệp GM Mail`.

Chưa dịch: `gm/item.txt` (1227 tên vật phẩm tiếng Trung dùng để tra cứu gửi thư) — đây là dữ liệu game (tên vật phẩm), không phải giao diện, khối lượng lớn nên để riêng nếu người dùng muốn dịch tiếp.

### 11.2. Thiết kế lại giao diện `gm.php` chuyên nghiệp hơn

Giao diện cũ là các `<div>` xếp thẳng hàng, không CSS thật (chỉ vài dòng inline). Đã viết lại thành layout dạng card (header gradient, các khối card bo góc/đổ bóng, form field căn chỉnh đều, nút bấm phân loại màu theo mức độ nguy hiểm — xanh dương cho thao tác thường, đỏ cho thao tác nguy hiểm như cấm chat/xoá nhân vật, xám cho thao tác phụ), có `viewport` meta để hiển thị tốt trên điện thoại (ảnh chụp màn hình người dùng gửi là từ Safari iPhone). Toàn bộ id phần tử HTML gốc được giữ nguyên nên JS xử lý nghiệp vụ cũ không đổi hành vi.

Tiện thể sửa 1 lỗi nhỏ có sẵn trong code gốc: 3 phần tử khác nhau (dòng chú thích "PS", dòng "nạp X kích hoạt thẻ tháng", và mô tả vật phẩm khi chọn) đều dùng chung `id='maildesc'` — khi chọn vật phẩm, mô tả sẽ ghi đè lên dòng chú thích PS thay vì hiển thị đúng chỗ. Nay mỗi phần tử có id riêng, mô tả vật phẩm hiển thị đúng ở trường "Mô tả vật phẩm".

### 11.3. Thay cơ chế "mã GM" cố định bằng đăng nhập thật

Trước đây mọi thao tác chỉ cần gõ đúng 1 chuỗi bí mật hardcode trong code (`$gmcode=='syymw.com'`) — không có tài khoản/mật khẩu, không phân quyền, ai biết chuỗi đó (kể cả nhìn thấy trong response lỗi hoặc source cũ) đều thao tác được.

Đã thêm:
- `gm/auth.php`: hằng số `GM_ADMIN_USER`/`GM_ADMIN_PASS` (mặc định `admingame`/`eban150892` theo yêu cầu), quản lý PHP session (`gm_is_logged_in()`, `gm_require_login_or_redirect()` dùng cho trang HTML, `gm_require_login_or_json()` dùng cho `gmquery.php`).
- `gm/login.php`: trang đăng nhập riêng (thiết kế đồng bộ với `gm.php`), redirect về `gm.php` nếu đã đăng nhập, hiện lỗi nếu sai tài khoản/mật khẩu.
- `gm/logout.php`: huỷ session, quay về `login.php`.
- `gm.php` yêu cầu đăng nhập ngay đầu file (`gm_require_login_or_redirect()`), có nút "Đăng xuất" trên header. Đã bỏ hẳn ô nhập "Mã xác thực GM" và biến `checknum` khỏi JS (11 chỗ) vì đăng nhập qua session rồi, không cần gõ lại mỗi request.
- `gmquery.php` thay khối so sánh `$gmcode!='syymw.com'` bằng `gm_require_login_or_json()`.

**Lưu ý bảo mật quan trọng**: mật khẩu hiện đang là hằng số dạng plain-text ngay trong `gm/auth.php` (không hash) — dễ đọc nếu ai đó truy cập được file trên server. Nên đổi mật khẩu mặc định và cân nhắc chuyển sang lưu hash (`password_hash`/`password_verify`) trước khi đưa ra ngoài production thật.

### 11.4. Tính năng quản lý người chơi (danh sách, xoá, đổi tên, tặng quà)

Thêm case mới trong `gmquery.php` (đều yêu cầu đăng nhập qua `gm_require_login_or_json()` như các case khác):

- `playerlist`: liệt kê người chơi theo khu (`serverindex`), có tìm kiếm theo tài khoản/tên nhân vật (`LIKE`) và phân trang (20 dòng/trang). Cột hiển thị: tài khoản, tên nhân vật, cấp độ, VIP, lực chiến — lấy từ bảng `actors` (cột `accountname`, `actorname`, `level`, `vip_level`, `totalpower`, xác nhận có tồn tại qua tham chiếu trong `server/bin/s1/gameworld/data/actormgr/actormgr.txt`, vì repo không có file dump schema SQL cho bảng `actors`).
- `renameplayer`: đổi tên nhân vật — tự kiểm tra trùng tên trong cùng server trước khi `UPDATE actors SET actorname=...`. Đây là ghi thẳng vào DB, **không** đi qua luồng kiểm tra tên (ký tự cấm, độ dài chuẩn theo game) mà server Lua (`changename.lua`) áp dụng cho nhân vật đang online — nếu nhân vật đang online, có thể cần đăng nhập lại để tên mới hiển thị đúng.
- `deleteplayer`: xoá nhân vật bằng cách gọi `CALL clientdeletecharactor(actorid, accountname)` — đây là stored procedure mà chính engine game gốc dùng để xoá nhân vật (dọn cả bang hội/vật phẩm/thư/bạn bè liên quan), tham chiếu thấy trong `actormgr.txt` nhưng không có script tạo procedure này trong repo (chắc được tạo sẵn trong DB lúc cài game gốc). **Nếu server thực tế của bạn không có sẵn stored procedure này, thao tác xoá sẽ báo lỗi rõ ràng thay vì tự ý `DELETE FROM actors` (tránh để sót dữ liệu mồ côi ở các bảng khác)** — nếu gặp lỗi này khi test, cho tôi biết để đổi cách tiếp cận khác.
- Tặng quà: không thêm case mới — nút "Tặng quà" ở mỗi dòng trong danh sách chỉ tự động điền tài khoản vào ô "Tài khoản game" ở khối "Khu & tài khoản", dùng lại nguyên luồng "Gửi vật phẩm qua thư" (case `mail`) đã có sẵn.

Giao diện: thêm card "Danh sách người chơi" trong `gm.php` (bảng + ô tìm kiếm + nút trang trước/sau), mỗi dòng có 3 link thao tác Tặng quà/Đổi tên/Xoá (Xoá có `confirm()` cảnh báo trước, Đổi tên dùng `prompt()` nhập tên mới).

`php -l` sạch cho toàn bộ 6 file PHP mới/sửa (`gm.php`, `gmquery.php`, `itemquery.php`, `auth.php`, `login.php`, `logout.php`).

## 12. GM tool bản "pro": tên/icon vật phẩm đồng bộ game thật + chia tab (2026-07-06)

### 12.1. Vấn đề: dropdown "Chọn vật phẩm" vẫn hiện tiếng Trung

`gm/item.txt` (nguồn dữ liệu cho ô tìm/chọn vật phẩm khi gửi thư) là 1 file rời, tự thân, chưa từng được dịch — 1227/1228 dòng vẫn là tên tiếng Trung gốc (ví dụ `200004;洗髓丹`), nên GM không biết mình đang gửi vật phẩm gì.

Phát hiện quan trọng: file cấu hình client thật của game — `resource/config/config.json` (13MB, bảng `ConfigItem`, ~18272 vật phẩm) — **đã có sẵn tên tiếng Việt chính thức** (client game hiển thị tên này cho người chơi) kèm field `icon` (id ảnh icon, khác với id vật phẩm ở một số trường hợp). Đối chiếu 1228 id trong `item.txt` với `ConfigItem`: khớp tên Việt sẵn có cho 1150/1228 (93.6%). 78 id còn lại (tiền tệ như "元宝"/Nguyên Bảo, và một số trang bị/vật phẩm sự kiện không nằm trong `ConfigItem`) được dịch thủ công dựa theo văn phong đã dùng trong game (Chí Thánh, Tiên Cung, Chủ Tể, Thần Khí...).

Đã sinh file mới `gm/items_vi.json` (id, name tiếng Việt, icon) từ `config.json` + bảng dịch thủ công cho 78 id còn lại, dùng script Python một lần (không đưa script vào repo). Icon: đối chiếu với thư mục ảnh `resource/icons/item/<icon_id>.png` có sẵn trong game (64x64 PNG) — 1135/1228 vật phẩm có icon thật, 93 vật phẩm không tìm thấy file ảnh tương ứng thì để icon rỗng (client hiện khối "?" thay thế).

`gm/itemquery.php` và phần render dropdown ban đầu trong `gm.php` đổi từ đọc `item.txt` sang đọc `gm/items_vi.json`, trả thêm field `icon` (đường dẫn tương đối `../resource/icons/item/<id>.png` tính từ `gm/`, vì `resource/` là thư mục cùng cấp `gm/` trong `WWW/`). `itemquery.php` giờ cũng yêu cầu đăng nhập qua `gm_require_login_or_json()` như các endpoint khác (trước đây không có gate nào).

Ghi chú: `gm/item.txt` không xoá (còn được `gm/index.php` — 1 file khác, cũ, gọi `playerquery.php` vốn **không tồn tại** trong thư mục `gm/`, nên trang này vốn đã hỏng/chết từ trước, không liên quan luồng đang dùng) tham chiếu tới, nhưng để an toàn không đụng vào.

### 12.2. Chia `gm.php` thành 3 tab

Theo yêu cầu, gộp các card cũ vào 3 tab để gọn hơn:

- **Quản lý tài khoản**: Mã quyền người chơi + Thêm VIP, Cấm chat/Gỡ cấm chat, Danh sách người chơi (tìm kiếm/phân trang, mỗi dòng có 4 thao tác: Chọn — đổ tài khoản vào ô "Tài khoản game" dùng chung cho cấm chat/thêm VIP; Tặng quà — chuyển sang tab Gửi quà kèm tài khoản; Đổi tên; Xoá).
- **Gửi quà / Nạp VIP**: gộp "Nạp tiền (nguyên bảo)" (trước ở tab Quản lý tài khoản) + "Gửi vật phẩm qua thư". Cả 2 dùng chung 1 ô tài khoản (`#chargeuid`) — có thể gõ tay hoặc **chọn trực tiếp từ danh sách** qua ô tìm kiếm tài khoản mới (gọi lại API `playerlist`, hiện danh sách tài khoản/tên nhân vật/cấp/VIP để bấm chọn, không cần gõ tên nhân vật thủ công như trước). Ô chọn vật phẩm cũng đổi từ `<select>` thường sang picker tự chế (input tìm kiếm debounce 250ms + danh sách kết quả có icon 32x32 + tên + id, bấm để chọn) vì thẻ `<select><option>` không hiển thị được ảnh — chọn xong hiện khối tóm tắt (icon 40x40 + tên + id) phía trên ô nhập số lượng.
- **Quản lý Payment**: y nguyên card cấu hình PayPal đã làm ở mục 10/11 (chỉ chuyển vào tab riêng, không đổi logic).

Khối "Khu & tài khoản" (chọn khu + ô tài khoản game) nằm ngoài tab, dùng chung cho các thao tác nhập tay ở tab Quản lý tài khoản. Đổi khu (`#qu`) giờ tự tải lại danh sách người chơi.

Đã bỏ 4 handler JS chết từ trước (`#zhfhbtn`/`#fhbtn`/`#zhjfbtn`/`#jfbtn` — phong/giải phong tài khoản kiểu cũ) vì không có nút HTML nào gắn với chúng kể cả trước khi tôi động vào, dọn code thay vì mang theo qua lần viết lại này.

`php -l` sạch cho `gm.php`/`gmquery.php`/`itemquery.php` sau khi sửa, đã test render `gm.php` qua CLI (đủ 3 tab, không còn tham chiếu `item.txt`) và test `itemquery.php` qua CLI (tìm "Nguyên" trả về đúng tên Việt + icon path hợp lệ, file ảnh xác nhận tồn tại trên đĩa).

## 13. Sửa lỗi gốc: bấm "Mua/Nạp" trong game không phản ứng gì dù bật/tắt công tắc PayPal (2026-07-06)

### 13.1. Nguyên nhân thật sự

Người dùng báo: dù để trống (tắt) cả 2 công tắc "Bắt buộc trả tiền" trong GM tool, bấm mua/nạp trong game vẫn không thấy gì xảy ra. Không phải lỗi ở PHP hay ở công tắc — lỗi nằm ở chỗ **client game chưa từng thật sự gọi tới luồng `PayMoneyByBrowser` mà tôi đã nối vào `gm/pay_create_order.php` ở mục 10.2.**

Hàm điều phối thanh toán trong `SDkMsg.prototype.PayMoney` có nhánh:
```js
"browser"===this.sdkType ? this.PayMoneyByBrowser(e) : this.PayMoneyByClient(e)
```
`this.sdkType` được gán bằng giá trị `entryType` lấy từ config server trả về (`index.php`: `'config'=>array('entryType'=>"js", ...)`), tức **`sdkType` thực tế luôn là `"js"`, không phải `"browser"`**. So sánh `===` ở đây là so khớp tuyệt đối nên luôn sai → mọi lần bấm mua đều rơi vào `PayMoneyByClient`, hàm này gọi tiếp `CallNaviga` để bắn message qua cầu nối SDK gốc (`window.wxadapter`/`window.adapter.platform`/`window.JsInterface`) — không cái nào tồn tại khi chạy thẳng trên trình duyệt thường (không phải app WebView/SDK đối tác) → toàn bộ chuỗi gọi lặng lẽ không làm gì cả, không có request mạng nào được gửi, không có lỗi nào hiện ra. Đây là lý do bấm mua "im lặng" bất kể trạng thái 2 công tắc, vì code còn chưa chạm tới được `pay_create_order.php`.

Class này đã có sẵn 1 hàm `IsBrowser()` coi cả `"browser"` lẫn `"js"` là môi trường trình duyệt/web (dùng ở chỗ khác để quyết định luồng đăng nhập), nên sửa bằng cách dùng lại đúng hàm đó cho luồng thanh toán thay vì so sánh cứng:
```js
this.IsBrowser() ? this.PayMoneyByBrowser(e) : this.PayMoneyByClient(e)
```
Đây là sửa tối thiểu, đúng ngay tại chỗ gãy, không đụng tới `entryType` trong `index.php` (đổi cái đó có thể ảnh hưởng dây chuyền tới các luồng khác đang dựa vào `"js"===this.sdkType`, ví dụ `InitJsSdk`/`SendLogin`/`NavigaCallBack`).

### 13.2. Việc đã làm

Sửa `js/main.min_13338353.js` → đổi tên thành `js/main.min_726885d6.js` (cache-bust), cập nhật `manifest.json` + `index.php`'s `?v=`. `node -c` qua được. Không đụng gì khác trong file.

**Người dùng cần làm gì tiếp theo**: thử lại nút mua/nạp trong game (nhớ tải lại trang / xoá cache trình duyệt vì tên file JS đã đổi). Nếu để trống công tắc sẽ hiện popup xác nhận "Đồng ý/Huỷ" rồi cộng nguyên bảo; nếu bật công tắc sẽ chuyển sang trang PayPal (cần đã điền Client ID/Secret hợp lệ trong tab Quản lý Payment trước).

## 14. Vào thẳng `/gm/` hiện trang cũ tiếng Trung thay vì đăng nhập (2026-07-06)

Khi truy cập `http://<domain>/gm/` (không kèm tên file), PHP/Apache tự phục vụ `gm/index.php` làm trang mặc định của thư mục — nhưng file này là 1 trang GM đời cũ, còn nguyên tiếng Trung, gọi tới `playerquery.php` (file **không tồn tại** trong `gm/`) nên vốn đã hỏng/không hoạt động, chỉ là rác còn sót lại chứ không phải trang panel đang dùng thật (`gm/gm.php`, đã có đăng nhập qua `login.php`).

Đã thay toàn bộ nội dung `gm/index.php` bằng 1 dòng redirect `header('Location: login.php'); exit;`. Giờ vào `/gm/` sẽ tự chuyển sang trang đăng nhập ngay lập tức.

## 15. Bấm "Nạp" trong game vẫn không có phản ứng gì sau khi sửa mục 13 (2026-07-06)

Người dùng test lại (màn hình "Nạp lần đầu" 10/20/30/100 NDT) vẫn không thấy gì xảy ra khi bấm. Đã lần theo toàn bộ đường đi của nút này trong `main.min.js` để loại trừ các khả năng:

- Nút gọi `Recharge.ins().showReChargeInfo(cash)` → hàm này có 1 chỗ có thể **âm thầm không làm gì cả, không cả hiện tip lỗi**: nếu `SDkMsg.isShowRecharge==0` thì toàn bộ thân hàm bị bỏ qua. Đã kiểm tra: cờ này mặc định `=1` và chỉ bị set về `0` trong nhánh dành riêng cho WeChat tiểu trình (`window.wxadapter`) — không áp dụng cho triển khai chạy thẳng trên trình duyệt này, nên loại trừ được khả năng này.
- `showReChargeInfo` còn có 1 điều kiện mở hệ thống `OpenSystBase.ins().checkSysOpen(SystemType.FIRSTCHARGE)` — nếu false sẽ hiện tip "Nạp thẻ đã bị chặn" (không phải im lặng hoàn toàn). Đối chiếu với `resource/config/config.json`'s `ConfigOpenSystem[1]` (`FIRSTCHARGE`): yêu cầu nhân vật cấp ≥5, không phải chặn cứng theo kênh (`pfid`) như nhánh dự phòng của hàm này — nên với nhân vật đã lên cấp cao trong ảnh chụp màn hình trước đó, điều kiện này gần như chắc chắn đã mở.
- Nếu qua được các điều kiện trên, hàm gọi `SDkMsg.GetInstance().PayMoney(t)` → sau bản vá mục 13, sẽ luôn đi vào `PayMoneyByBrowser` → gọi `gm/pay_create_order.php` bằng `egret.HttpRequest`.

Vì không thể truy cập trực tiếp trình duyệt/server thật của người dùng để xem console log hoặc network request, đã thêm 2 công cụ chẩn đoán từ xa:

1. **Bật log debug trên màn hình game**: `index.php` đổi `data-show-log="false"` → `data-show-log="true"` (thuộc tính có sẵn của Egret runtime, hiện đè 1 khung log nhỏ ngay trên màn hình game, không cần mở devtools). Sau khi xác định xong vấn đề nên đổi lại `false` để không lộ log cho người chơi thường.
2. **Ghi log phía server**: `gm/pay_create_order.php` thêm hàm `pco_log()` ghi từng bước (request nhận được, lý do fail nếu có, kết quả free/paypal nếu thành công) vào file `gm/pay_debug.log` (dùng `file_put_contents(...,FILE_APPEND)`, không phá vỡ luồng response JSON hiện có). Đây là log tạm phục vụ chẩn đoán, nên xoá bỏ (cả hàm `pco_log`/`pco_fail` log call lẫn các dòng gọi nó) sau khi vấn đề được xác nhận đã hết.

**Việc cần làm tiếp**: người dùng bấm "Nạp" lại 1 lần trên trình duyệt điện thoại, sau đó:
- Xem khung log nhỏ hiện trên màn hình game ngay lúc đó (sẽ thấy dòng `[sdk] Pay money success resp = ...` nếu đã gọi đúng `pay_create_order.php`, hoặc dòng `Dữ liệu nạp thẻ` nếu vẫn rơi vào nhánh SDK gốc cũ — nếu thấy dòng này nghĩa là trình duyệt đang chạy bản JS cũ do cache, cần xoá cache/tải lại hẳn).
- Mở thêm `http://71.31.97.241/gm/pay_debug.log` để xem log phía server (sẽ cho biết request có tới nơi không, và nếu tới thì dừng ở bước nào/lỗi gì).
Gửi lại nội dung 2 chỗ này để xác định chính xác nút đang kẹt ở đâu.

## 16. Tìm ra nguyên nhân thật: bản vá mục 13 tự làm hỏng cú pháp do dính chữ liền với "else" (2026-07-06)

Người dùng gửi ảnh chụp 1 hộp thoại lỗi JS hiện ngay trên trình duyệt (`71.31.97.241 says` — do có sẵn 1 window.onerror handler tuỳ biến trong game hiện alert khi có exception), nội dung: `Hàm lỗi: t.PayMoney`, kèm stack trace trỏ đúng vào `main.min_726885d6.js`. Tra theo đúng dòng/cột trong file thì lộ ra: bản vá ở mục 13 (đổi `"browser"===this.sdkType?...` thành `this.IsBrowser()?...`) đã **vô tình dính liền chữ với từ khoá `else` đứng ngay trước nó**, biến thành 1 chuỗi ký tự duy nhất `elsethis.IsBrowser()...` — vì file này minify không có khoảng trắng, và may mắn (xui) là bản gốc `else"browser"===...` không bị lỗi vì dấu `"` chặn được việc dính chữ, còn `else` + `this` (đều là chữ cái) thì JS đọc gộp thành 1 định danh duy nhất `elsethis` — cú pháp vẫn hợp lệ (nên `node -c` vẫn qua, vì đó chỉ là kiểm tra cú pháp) nhưng biến `elsethis` không tồn tại → mỗi lần chạy tới đây là ném lỗi `ReferenceError`, và vì nằm ngay trong `PayMoney`, nghiễm nhiên MỌI lần bấm mua/nạp trong game đều gãy ở đúng chỗ tôi vừa sửa — đây là lỗi tôi tự gây ra khi thay thế chuỗi ký tự không để ý viết liền vào code đã minify.

**Đã sửa**: thêm lại đúng 1 khoảng trắng — `elsethis.IsBrowser()` → `else this.IsBrowser()`. `node -c` qua được. Đổi tên `main.min_726885d6.js` → `main.min_8ed777e0.js` (cache-bust), cập nhật `manifest.json` + `index.php`'s `?v=`.

**Bài học áp dụng cho các lần sửa JS minify sau này**: khi thay thế 1 đoạn text nằm sát 1 từ khoá JS (`else`, `return`, `in`, `of`, `typeof`, `instanceof`, `new`, `delete`, `void`...) trong file đã minify (không khoảng trắng), phải tự kiểm tra ký tự ngay trước/sau chỗ thay có phải chữ/số/`_`/`$` không — nếu có, phải chủ động thêm 1 khoảng trắng ở ranh giới đó, vì `node -c`/`php -l` chỉ bắt lỗi cú pháp chứ không bắt được kiểu "2 token dính thành 1 định danh hợp lệ nhưng sai nghĩa" như thế này.

Vẫn giữ nguyên khung log debug trên màn hình (`data-show-log="true"`) và file log `gm/pay_debug.log` thêm 1 vòng test nữa để xác nhận dứt điểm việc nạp tiền chạy đúng, trước khi tắt lại 2 công cụ chẩn đoán này.

## 17. Đổi tên nhân vật trong GM tool: DB đổi rồi nhưng vào game vẫn tên cũ (2026-07-06)

Người dùng xác nhận: bấm "Đổi tên" trong GM tool báo thành công, tự tải lại danh sách người chơi cũng thấy tên mới — nhưng đăng xuất/đăng nhập lại nhân vật trong game vẫn hiện tên cũ.

**Nguyên nhân** (điều tra qua agent đọc log runtime + chuỗi ký tự trong binary `dbserver64_debug.exe`, vì phần đọc/ghi actor thật nằm trong engine đã compile, không có mã nguồn Lua): tiến trình `DBServer` giữ 1 bản cache riêng trong bộ nhớ (`CDBDataCache`) cho mỗi nhân vật đã từng load, và cứ khoảng 10 giây tự động `autosave` — chính engine tự chạy `update actors set actorname="...",... where actorid=...` từ dữ liệu trong cache đó, ghi đè lại lên đúng dòng mà GM tool vừa sửa. Cột `actorname` không phải là 1 chỉ mục tra cứu thụ động — chính engine "sở hữu" và tự ghi lại cột này, nên sửa thẳng bằng `UPDATE` từ bên ngoài chỉ có tác dụng tạm thời cho tới lần autosave kế tiếp (hoặc bị bỏ qua hoàn toàn nếu nhân vật đang được cache).

Codebase đã có sẵn đúng cơ chế xử lý ca này: `server/bin/s1/gameworld/data/functions/systems/gm/gmdccmdhandler.lua:102-106` có handler `gmDcCmdHandlers.setActorDataValid`, chú thích ngay trong code là "sửa lỗi người chơi không đăng nhập được do cache" — gọi native `System.setActorDataValid(serverId, actorid, true)` để buộc GameWorld làm mới cache của đúng actor đó. Đây là lệnh được gửi qua hàng đợi `gmcmd` (giống hệt cơ chế mail/cấm chat/mở cấm chat đang dùng), không phải gọi trực tiếp.

**Đã sửa** `gmquery.php`'s case `'renameplayer'`: sau khi `UPDATE actors SET actorname=...` thành công, chèn thêm 1 dòng `INSERT INTO gmcmd(serverid,cmd,param1) VALUES ('{$srvid}','setActorDataValid','{$actorid}')` để báo cho server đang chạy làm mới cache của nhân vật đó — từ giờ tên mới sẽ được đọc lại đúng ở lần đăng nhập kế tiếp.

`php -l` sạch. Không thay đổi `deleteplayer` (đã dùng đúng `clientdeletecharactor` — 1 stored procedure của chính engine, nên không có vấn đề cache tương tự) hay các thao tác khác.

## 18. `setActorDataValid` không đủ - phải thêm hẳn 1 lệnh GM mới đổi tên qua đúng API game (2026-07-06)

Người dùng test lại: đổi tên báo thành công, nhưng đăng nhập lại vẫn thấy tên cũ y hệt lần trước — nghĩa là gửi `setActorDataValid` (mục 17) không giải quyết được vấn đề. Nguyên nhân nhiều khả năng: hàm native `System.setActorDataValid(...)` không thực sự ép đọc lại từ DB như suy đoán ban đầu (không có mã nguồn để xác nhận chính xác, tên hàm chỉ là suy luận từ chú thích "sửa lỗi cache" trong code), hoặc tên hiển thị trong game lấy từ 1 bản dữ liệu khác không bị ảnh hưởng bởi lệnh này.

Đã hỏi người dùng test thử "Cấm chat" để xác minh cơ chế hàng đợi `gmcmd` (nơi mọi lệnh GM đi qua) có hoạt động không — người dùng xác nhận **gửi quà vẫn nhận bình thường** (cũng đi qua đúng `gmcmd` với `cmd='sendMail'`), nghĩa là cơ chế `gmcmd` chạy tốt, vấn đề chỉ nằm ở việc chưa có lệnh GM đúng để đổi tên.

**Giải pháp đúng gốc**: thêm hẳn 1 lệnh GM mới `renameActor` vào `server/bin/s1/gameworld/data/functions/systems/gm/gmdccmdhandler.lua`, gọi đúng API mà bản thân game dùng khi người chơi tự đổi tên bằng thẻ đổi tên (`LActor.setEntityName`, xem `changename.lua:100`) trên đối tượng actor đang online (lấy qua `LActor.getActorById(actorid, true, true)` — cùng cách `kick` handler đã dùng). Cách này giống hệt luồng đổi tên chính chủ của game nên tự động đúng luôn cả việc autosave sau đó ghi đúng tên mới xuống DB, không còn bị cache ghi đè ngược lại tên cũ.

`gmquery.php`'s `renameplayer` giờ gửi cả `renameActor` (đổi ngay nếu đang online) lẫn `setActorDataValid` (giữ lại phòng hờ, không hại gì) sau khi `UPDATE`.

**QUAN TRỌNG - việc người dùng cần làm**: đây là thay đổi trong mã nguồn Lua của GameWorld (`gmdccmdhandler.lua`), không phải PHP. Tiến trình GameWorld hiện đang chạy **không tự nhận code Lua mới** trừ khi được khởi động lại (trừ khi hệ thống của bạn có cơ chế hot-reload riêng cho các file trong `systems/gm/`, thứ tôi không có cách nào xác nhận từ đây) — **cần khởi động lại (restart) tiến trình GameWorld của server 1 thì lệnh `renameActor` mới có tác dụng**. Trước khi restart, đổi tên cho nhân vật đang online sẽ vẫn không thấy hiệu quả như 2 lần test trước.

Sau khi restart: đổi tên 1 nhân vật ĐANG ONLINE sẽ thấy tên đổi ngay lập tức trong game, không cần đăng xuất/đăng nhập lại. Nếu đổi tên cho nhân vật đang OFFLINE, vẫn có khả năng gặp lại đúng vấn đề cache khi họ đăng nhập lại (vì lúc đó không có actor online để gọi `renameActor` được, chỉ còn UPDATE thẳng DB + `setActorDataValid` như cũ) — nếu vẫn gặp lại tình huống này, báo lại để tìm hướng khác (ví dụ: chỉ cho phép đổi tên khi nhân vật đang online, ẩn nút Đổi tên với nhân vật offline).

`luac -p` qua được cho file Lua đã sửa.

## 19. Kết quả test sau restart: online cần refresh mới thấy tên mới, offline vẫn không đổi được (2026-07-06)

Người dùng test sau khi đã restart GameWorld: **nhân vật online** → đổi tên báo OK, nhưng client phải tự refresh (thao tác gì đó làm màn hình vẽ lại) mới thấy tên mới, không tự cập nhật ngay như kỳ vọng. **Nhân vật offline** → GM vẫn báo đổi OK nhưng đăng nhập lại vẫn thấy tên cũ y hệt trước.

**Nguyên nhân phần "cần refresh"**: `renameActor` bản trước chỉ gọi thẳng `LActor.setEntityName(actor, name)` — bỏ qua toàn bộ phần còn lại mà luồng đổi tên chính chủ của game làm trong `changename.lua`'s `OnSetUserName`, trong đó có đoạn gửi gói tin báo cho **client** biết việc đổi tên đã xong (`LDataPack.allocPacket(...Protocol.sBaseCmd_ChangeName...)` rồi `flush`) để client tự vẽ lại tên - thiếu gói tin này thì client không biết mà tự refresh UI, đúng như triệu chứng "phải refresh mới thấy".

**Đã sửa**: đổi `renameActor` gọi thẳng `changename.OnSetUserName(actor, 0, name, rawName, 1)` thay vì gọi tay `LActor.setEntityName` - đây chính xác là hàm nội bộ mà `changename.lua` dùng khi người chơi tự đổi tên hợp lệ, tham số `way=1` là quy ước có sẵn trong chính file đó dành cho "trường hợp sửa lỗi" (bỏ qua trừ vật phẩm + bỏ qua thời gian chờ đổi tên, xem comment gốc `-- 修复bug的情况下不改变CD` = "trường hợp sửa lỗi thì không đổi CD" ngay tại `changename.lua:103`). Hàm này tự làm đủ mọi việc luồng chính chủ làm: đổi tên thật + gửi gói tin báo client + đồng bộ tên ở boss thế giới/phó bản bang hội/phó bản thần khí/bảng xếp hạng - nên English tên sẽ cập nhật ngay trên client không cần thao tác refresh thủ công nữa (cần restart GameWorld 1 lần nữa để áp dụng bản Lua mới này).

**Phần offline vẫn CHƯA giải quyết được** - đây là giới hạn thật sự chưa có cách khắc phục chắc chắn: khi nhân vật offline, không có actor object nào đang chạy trong GameWorld để gọi `renameActor`/`changename.OnSetUserName`, nên chỉ còn lại `UPDATE actors` (chạy thẳng, không qua engine) + `setActorDataValid` (đã xác nhận không có tác dụng ép đọc lại như suy đoán) — tức là với nhân vật offline, tool GM báo "thành công" nhưng dữ liệu thật sự vẫn có khả năng bị ghi đè bởi cache đọc phía DBServer khi họ đăng nhập lại. Không có mã nguồn cho phần cache đọc này (nằm trong file .exe đã compile), nên không thể sửa tận gốc chỉ bằng cách đọc mã Lua.

**Khuyến nghị thực tế cho đến khi có giải pháp khác**: chỉ nên dùng nút "Đổi tên" khi nhân vật đang ONLINE (nhờ người chơi đăng nhập trước). Nếu người dùng cần đổi tên cho nhân vật đang offline thường xuyên, các hướng có thể cân nhắc sau này: (a) thử phương án đảo ngược cờ `setActorDataValid(..., false)` thay vì `true` (chưa thử, không chắc đúng ý nghĩa thật của tham số này vì là hàm native không có mã nguồn), (b) tìm cách buộc DBServer restart hoặc xoá cache của riêng actor đó (nếu có công cụ vận hành phía server hỗ trợ), (c) chỉnh GM tool để phát hiện nhân vật offline và báo rõ "không thể đổi tên khi offline, cần đăng nhập trước" thay vì báo "thành công" gây hiểu lầm.

`luac -p` qua được cho lần sửa này.

## 20. Mua "Thẻ Tháng"/"Thẻ Đặc Quyền" không kích hoạt được - bug có sẵn từ trước, không liên quan PayPal (2026-07-06)

Người dùng báo: bấm "Mua ngay 30 NDT" ở tab "元宝月卡" (Thẻ Tháng Nguyên Bảo, trong màn "福利"/Welfare) chỉ nhận được 3000 nguyên bảo qua thư (mail "恭giri...充值3000元宝" - nội dung mail nạp tiền bình thường), KHÔNG kích hoạt thẻ tháng thật.

**Nguyên nhân - lỗi có sẵn từ trước trong code gốc, không phải do hệ thống PayPal mới thêm**: server yêu cầu đúng **300000 nguyên bảo** trong 1 lần nạp mới kích hoạt thẻ tháng (`monthCardMoney=300000` trong `monthcardconfig.config`) và đúng **880000** để kích hoạt thẻ đặc quyền (`priviMoney=880000` trong `privilegeconfig.config`). Với tỉ lệ quy đổi cố định `cash*100=nguyên bảo` (xác nhận đúng cho toàn bộ 36 dòng trong `ConfigRechargeItems`), lẽ ra nút này phải gửi `cash=3000` (→300000 nb) và `cash=8800` (→880000 nb). Nhưng code client (`MonthCardWindow`/`FranchiseWindow` trong `main.min.js`) lại hardcode gọi `showReChargeInfo(30)` và `showReChargeInfo(88)` - **nhỏ hơn đúng 100 lần** so với giá trị cần thiết. Đây là lỗi có sẵn từ trước (2 dòng code này tôi chưa từng đụng tới trong toàn bộ các lần sửa PayPal trước đó) - nghĩa là kể cả với hệ thống thanh toán youyantech.com gốc, 2 nút này cũng không bao giờ kích hoạt đúng thẻ tháng/đặc quyền, trừ khi bên vận hành gốc có xử lý đặc biệt khác ở phía server thật của họ mà mình không có trong repo này.

**Đã sửa**: đổi `showReChargeInfo(30)` → `showReChargeInfo(3000)` (nút Thẻ Tháng Nguyên Bảo) và `showReChargeInfo(88)` → `showReChargeInfo(8800)` (nút Thẻ Tháng Đặc Quyền) trong `main.min.js`. Thêm `8800` vào `$RECHARGE_VALID_CASH` trong `gm/recharge_tiers.php` (trước đó chỉ có 3000, không có 8800, nên nếu chỉ sửa client mà quên chỗ này thì request sẽ bị PHP tự chặn với lỗi "Gói nạp không hợp lệ"). Đổi tên `main.min_8ed777e0.js`→`main.min_b6dc805e.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c`/`php -l` qua được.

Lưu ý: đây là sửa ở phía CLIENT (game), không phải server Lua - không cần restart GameWorld, chỉ cần người chơi tải lại trang (xoá cache) để nhận bản JS mới.

**Việc CÒN TỒN ĐỌNG từ mục này**: người dùng đã lỡ bấm mua thử Thẻ Tháng Nguyên Bảo TRƯỚC KHI có bản vá trên (tức là vẫn dùng `showReChargeInfo(30)` cũ, chỉ nhận 3000 nguyên bảo, chưa kích hoạt được thẻ tháng thật) và bản thông báo/mail xác nhận đã bị đóng nên không còn xem lại được. Người dùng dự định mai mốt tạo nhân vật mới để test lại từ đầu với bản vá đã sửa. Không cần hành động gì thêm từ phía tôi cho việc này - chỉ ghi chú lại theo yêu cầu để không bị quên ngữ cảnh.

## 21. Chỉnh vị trí 1 số nhãn trong màn "Thần Trang" (nâng cấp trang bị cam) bị che/tràn chữ (2026-07-06)

Người dùng gửi ảnh chụp màn "封神" (Thần Trang - tab đầu trong màn Welfare/福利, dùng skin `SkinOrangeEquip` + `GrewupOrangePanel`), báo 2 vấn đề:

1. Link "Nhận Tinh Thể Thần Trang" (nút `getTreasureBtn`) đang nằm CÙNG HÀNG bên phải nút "Nâng Cấp" (`horizontalCenter=192, bottom=6` so với nút `executeBtn` đặt `horizontalCenter=0, bottom=0` trong cùng 1 group cao 102px) - muốn chuyển xuống dưới nút, vào khoảng trống giữa nút "Nâng Cấp" và hàng tab "Thần Trang/Chí Thánh/Vô Cực" phía dưới.
2. Nhãn tên trang bị phía trên 2 icon so sánh trước/sau (`curName`="Sương Nguyệt Thánh Tán", `nextName`="Trường Không Thánh Trang"...) là `<Label>` không giới hạn `width`, chữ dài tràn ra ngoài 2 bên màn hình, mất chữ. Cần cho xuống 2 dòng và canh giữa đúng theo icon bên dưới nó.

**Đã sửa** (cả trong file nguồn `resource/exml/OrangeEquipSkin.exml` + `resource/exml/GrewupOrangePanel.exml` để đối chiếu sau này, VÀ trong file thật được nạp lúc chạy game `js/default.thm.js` - vì exml chỉ là source tham khảo, game load skin đã biên dịch sẵn trong `default.thm.js`):
- `getTreasureBtn`: đổi `horizontalCenter` từ `192`→`0` (canh giữa theo nút Nâng Cấp thay vì lệch phải), `bottom` từ `6`→`-70` (đẩy xuống dưới, ra khỏi vùng 102px chứa nút, vào khoảng trống phía dưới nút trước khi tới hàng tab).
- `curName`/`nextName`: thêm `width="180" wordWrap="true" multiline="true"` (theo đúng pattern đã dùng ở nhiều skin khác trong repo, ví dụ `LiLianTipsSkin.exml`), giữ nguyên `textAlign="center"` có sẵn để chữ tự xuống dòng và canh giữa trong khung 180px thay vì tràn ra ngoài; chỉnh `y` từ `54`→`40` (nhích lên 1 chút để có đủ chỗ cho 2 dòng trước khi chạm icon bên dưới ở y=110).
- Không đụng tới `SkinLegendEquip` (tab "Chí Thánh") dù có `getTreasureBtn` tương tự - người dùng chỉ báo màn "Thần Trang", nếu tab Chí Thánh/Vô Cực cũng bị lỗi tương tự thì báo lại để sửa tiếp.

**Lưu ý quan trọng - đây là ước lượng, chưa có cách render/xem trực tiếp Egret canvas từ môi trường này**: các con số `bottom=-70`, `width=180`, `y=40` là suy luận dựa trên kích thước các phần tử lân cận đọc được từ code (group cao 102px, icon bắt đầu ở y=110, v.v...), KHÔNG phải test trực quan. Nhờ người dùng chụp lại màn hình sau khi cập nhật để tôi tinh chỉnh thêm nếu vị trí chưa đẹp.

Đổi tên `default.thm_d927d154.js`→`default.thm_6a726144.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được.

### 21.1. Phản hồi sau test: bỏ dời vị trí, chỉ rút ngắn chữ + thu hẹp width (2026-07-06)

Người dùng test và báo: đưa "Nhận Tinh Thể Thần Trang" xuống dưới nút Nâng Cấp làm nó **biến mất hẳn** khỏi màn hình (nhìn kỹ ảnh chụp thấy có chữ mờ gần như trong suốt ngay phía trên hàng tab - khả năng cao là bị 1 layer/mask nào đó của khối tab che mất hoặc nằm ngoài vùng hiển thị được của group cha). Quyết định: **trả lại vị trí cũ** (`horizontalCenter=192, bottom=6`, đúng như trước khi tôi sửa ở mục 21), chỉ đổi nội dung chữ từ "Nhận Tinh Thể Thần Trang" → **"Nhận Tinh Thể"** cho ngắn lại (không có chỗ nào trong code so sánh cứng với chuỗi text cũ nên đổi chữ an toàn, không gây lỗi logic).

Về nhãn tên trang bị (`curName`/`nextName`): giữ nguyên `wordWrap`/`multiline` (2 dòng) nhưng **thu hẹp `width` từ 180 xuống 150** để buộc xuống dòng ngay sau "Thương Nguyệt"/"Trường Không" thay vì để lọt thêm 1-2 ký tự của từ "Thánh" rồi mới ngắt giữa từ (ước lượng theo tỉ lệ ký tự quan sát được từ ảnh chụp trước, vẫn là suy đoán chưa render trực tiếp được).

Sửa đồng bộ ở cả `default.thm.js` (file thật load lúc chạy) lẫn 2 file `.exml` nguồn. Đổi tên `default.thm_6a726144.js`→`default.thm_ea09838b.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được.

## 22. Áp dụng tương tự cho tab "Chí Thánh" (2026-07-06)

Người dùng xác nhận mục 21 (tab Thần Trang) đã ổn, chuyển sang tab "Chí Thánh" (skin `SkinLegendEquip`, file nguồn `resource/exml/LegendEquipSkin.exml`) - cùng 2 vấn đề tương tự:

1. Nhãn "Chí Thánh Tiên Binh"/"Chí Thánh Tiên Bào" (2 `<Label>` tĩnh, không phải component tái sử dụng như tab Thần Trang) tràn chữ, cần xuống 2 dòng và canh giữa icon. Khác với tab Thần Trang (dùng `horizontalCenter`), 2 label này định vị bằng `x` tuyệt đối (x=47/471, y=308) ngay dưới icon "3 chuyển" (`legend1`/`legend2`, x=49/473, width=76 → tâm icon ở x≈87/511). Đã thêm `width="150" wordWrap="true" multiline="true" textAlign="center"`, và dời `x` sang `12`/`436` (=tâm icon trừ đi nửa width mới) để label mới vẫn canh giữa đúng theo tâm icon thay vì lệch trái như ban đầu.
2. Nút `getTreasureBtn` text "Nhận Chí Thánh Ngọc Điệp" → rút ngắn thành **"Nhận Chí Thánh"** (giữ nguyên vị trí `horizontalCenter=192, bottom=6`, không lặp lại sai lầm dời-xuống-dưới của mục 21 vì đã biết nó làm mất chữ).

Sửa ở cả `default.thm.js` (2 hàm `_Label2_i`/`_Label3_i` trong class `SkinLegendEquip`, khác tên hàm so với tab Thần Trang vì đây không phải component tái dùng mà là label tĩnh) lẫn `resource/exml/LegendEquipSkin.exml`. Đổi tên `default.thm_ea09838b.js`→`default.thm_ee4144ca.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được. Vẫn là suy đoán theo tỉ lệ, chưa render trực tiếp được - nhờ người dùng chụp ảnh xác nhận sau khi cập nhật.

## 23. Tab "Vô Cực" (skin `SkinExtremeEquip`): tràn chữ "Tiêu hao", dính chữ "Sát ÝLv.1", chồng chéo tên vật phẩm hàng dưới (2026-07-06)

Người dùng xác nhận mục 22 (tab Chí Thánh) ổn, báo tiếp 3 vấn đề ở tab "Vô Cực" (skin `SkinExtremeEquip`, file nguồn `resource/exml/ExtremeEquipSkin.exml` + item con `ExtremeEquipItemSkin.exml`):

1. **"Tiêu hao [tên vật liệu]"** tràn ra ngoài mép phải màn hình khi tên vật liệu dài (ví dụ "Thần Kiếm Vô Cực..."). Nhóm này (`_Group2_i`) gồm 4 Label rời ghép ngang (`"Tiêu hao"` + `cost` + `": "` + `numLabel`) định vị tuyệt đối `x=395,y=366` (lệch hẳn sang phải, cạnh nút Kích hoạt) dùng `HorizontalLayout horizontalAlign="left"`. Đã đổi: nhóm chuyển sang `horizontalCenter="0", y="415"` (canh giữa, nằm dưới nút Kích hoạt), layout đổi `horizontalAlign="center" verticalAlign="middle"`, riêng Label `cost` thêm `width="260" wordWrap="true" multiline="true" textAlign="center"` để tên vật liệu dài tự xuống dòng thay vì tràn mép.

2. **"Vô Cực Sát ÝLv.1"** dính liền chữ, không giống "Vô Cực Cộng Hưởng Lv.1" (có khoảng trắng). Tìm ra nguyên nhân trong `main.min.js`: đoạn "Cộng Hưởng" ghép chuỗi cứng `"Vô Cực Cộng Hưởng Lv."+level` (đã có sẵn khoảng trắng trước "Lv." trong chuỗi), còn đoạn "Sát Ý" lấy tên kỹ năng động từ config rồi ghép trực tiếp `a+"Lv."+s` (không có khoảng trắng) - tên kỹ năng lấy từ `ConfigSkillsDesc`/`WuJiEquipModel.getSkillName()` vốn không có sẵn dấu cách ở cuối. Sửa `a+"Lv."` → `a+" Lv."` ở toàn bộ 4 chỗ dùng pattern này (`skillName0`/`skillName1`/`skillName2` x2 nhánh), và tiện thể sửa thêm 2 chỗ tương tự trong popup chi tiết kỹ năng (`e.name+("Lv."` → `e.name+(" Lv."`) dù người dùng chưa báo, để đồng bộ tránh lặp lại lỗi khi mở popup đó.

3. **Hàng 6 icon vật phẩm bên dưới bị chồng chữ tên lên nhau** ("Cực Thần Kiếm", "Vô Cực Giáp"...): item renderer `SkinExtremeEquipItem` (mỗi item rộng 88px) có `nameLabel` không giới hạn `width`, cỡ chữ 20, `horizontalCenter=0` - tên dài tự nhiên tràn sang item bên cạnh. Đã thêm `width="88" wordWrap="true" multiline="true" textAlign="center"` và giảm cỡ chữ `20→14` (để 2 dòng có cơ hội vừa trong khung 88px hẹp) - **lưu ý: khung item chỉ cao 106px, icon đã chiếm ~82px, phần chữ 2 dòng cỡ 14 có thể vẫn hơi tràn xuống dưới khung item 1 chút, nhưng ưu tiên đọc được rõ ràng thay vì chồng chéo như hiện tại.**

Sửa đồng bộ ở `default.thm.js` + 2 file `.exml` nguồn (`ExtremeEquipSkin.exml`, `ExtremeEquipItemSkin.exml`) + `main.min.js` (phần ghép chuỗi). Đổi tên `main.min_b6dc805e.js`→`main.min_e6cddaaa.js` và `default.thm_ee4144ca.js`→`default.thm_0cc68ee7.js` (cache-bust cả 2 vì cả 2 file đều có nội dung đổi lần này), cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file. Vẫn là suy đoán vị trí/kích thước, chưa render trực tiếp được.

### 23.1. Sửa lỗi tự gây ra: dời nhóm "Tiêu hao" đè lên khối "Lực chiến" (2026-07-06)

Người dùng test và báo: "Tiêu hao Thần Kiếm Vô Cực" giờ tuột xuống đè lên chữ "Lực chiến: 394400" (2 dòng chữ chồng lên nhau đọc không được), và "Vô Cực Hài Tử" (1 trong 6 tên vật phẩm hàng dưới) không xuống 2 dòng như các tên khác dù đã sửa mục 23.

**Nguyên nhân lỗi 1**: khi sửa mục 23, tôi đổi vị trí nhóm "Tiêu hao" từ `x=395,y=366` (nằm ngang hàng, bên phải nút Kích hoạt) sang `horizontalCenter=0,y=415` (định centered, dưới nút) - nhưng không kiểm tra kỹ: đúng ngay y=408 là điểm bắt đầu của khối thuộc tính (`attrGroup0`/`attrGroup1`, chứa "Lực chiến"/Công Kích/...) - tức là **hoàn toàn không có khoảng trống nào giữa đáy nút Kích hoạt (y=409) và khối thuộc tính (y=408)** - đây chính là lý do bản gốc đặt nhóm "Tiêu hao" NẰM NGANG HÀNG bên phải nút thay vì bên dưới, vì không hề có chỗ trống bên dưới. Việc "canh giữa cho đẹp" của tôi ở mục 23 đã hiểu sai ý, đẩy nó vào đúng vùng đã có chữ khác.

**Đã sửa**: trả lại đúng vị trí gốc `x=395,y=366` (bên phải nút, không phải bên dưới), **không** canh giữa nữa (vì canh giữa ngang hàng nút sẽ đè lên chính nút). Để chữ vừa trong khoảng hẹp còn lại (~205px ngang, ~42px cao trước khi chạm khối thuộc tính), giảm cỡ chữ cả 4 label trong nhóm (`Tiêu hao`/`cost`/`: `/`numLabel`) từ 20 xuống 16, và thu hẹp `cost` xuống `width=140` (từ 260) để tên vật liệu dài chắc chắn xuống 2 dòng nhưng vẫn nằm gọn trong khoảng trống hẹp đó.

**Lỗi 2 ("Vô Cực Hài Tử" không xuống dòng)**: không rõ nguyên nhân chính xác (có thể do chữ này ngắn/hẹp hơn ước lượng nên vẫn vừa 1 dòng ở `width=88`), thu hẹp thêm `width` từ `88`→`74` và giảm cỡ chữ `14`→`13` cho toàn bộ 6 tên vật phẩm hàng dưới để tăng khả năng buộc xuống dòng đồng đều hơn.

Đổi tên `default.thm_0cc68ee7.js`→`default.thm_fe52b2fe.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được. Đây vẫn là môi trường không render trực tiếp được nên vẫn cần người dùng xác nhận lại bằng ảnh chụp - xin lỗi vì đã mất 1 vòng sửa sai do không kiểm tra kỹ layout xung quanh trước khi đổi vị trí.

### 23.2. Tinh chỉnh sau test: item đã xuống 2 dòng ổn nhưng chữ nhỏ quá; "Tiêu hao" vẫn chưa xuống dòng (2026-07-06)

Người dùng xác nhận: 6 tên vật phẩm hàng dưới đã xuống 2 dòng đều nhau (đúng ý), nhưng cỡ chữ `13` quá nhỏ - muốn trả lại cỡ chữ như lúc ban đầu (trước khi tôi thu nhỏ), chỉ cần giữ khung hẹp (`width`) để nó tiếp tục xuống dòng là đủ. Riêng nhóm "Tiêu hao Thần Kiếm Vô Cực" vẫn hiện 1 dòng dài tràn mép, không xuống dòng như mong đợi.

**Đã sửa**:
- `nameLabel` (6 tên vật phẩm): trả cỡ chữ `13→20` (về đúng cỡ gốc ban đầu), **giữ nguyên** `width=74` (khung hẹp là thứ thực sự cần để ép xuống dòng, không phải cỡ chữ).
- `cost` (nhãn "Tiêu hao"): nguyên nhân có khả năng là `width=140` vẫn đủ chỗ cho chuỗi "Thần Kiếm Vô Cực" nằm gọn 1 dòng ở cỡ chữ 16 (ước lượng trước đó quá rộng tay) - thu hẹp tiếp `width` từ `140` xuống `90` để chắc chắn ép xuống dòng.

Sửa đồng bộ `default.thm.js` + 2 file `.exml`. Đổi tên `default.thm_fe52b2fe.js`→`default.thm_7ddbda66.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được.

### 23.3. Cỡ chữ 20 làm tên vật phẩm xuống 3 dòng; rút gọn dòng "Tiêu hao" bằng cách bỏ chữ "Vô Cực" (2026-07-06)

Người dùng báo: sau khi trả cỡ chữ về 20, `width=74` giờ lại quá hẹp khiến 1 số tên vật phẩm xuống **3 dòng** (chữ to hơn cần nhiều chỗ ngang hơn) thay vì 2 - yêu cầu tăng `width` thêm khoảng "3 ký tự". Đồng thời dòng "Tiêu hao [tên vật liệu]: [số lượng]" khi xuống dòng bị vỡ bố cục rất khó nhìn (chữ "Cực" của "Vô Cực" bị tách xuống dòng 2 trong khi ": 0/1" lại nằm ở cuối dòng 1, thứ tự đọc bị đảo lộn) - đề nghị bỏ hẳn chữ "Vô Cực" khỏi dòng "Tiêu hao" để câu ngắn lại, không cần xuống dòng nữa.

**Đã sửa**:
- `nameLabel` (6 tên vật phẩm): tăng `width` từ `74` lên `112` (~+38px, đúng khoảng 3 ký tự ở cỡ chữ 20) để chữ đủ chỗ xuống đúng 2 dòng thay vì 3. Lưu ý: 112px rộng hơn khung item (88px) nên có thể lấn nhẹ sang khoảng trống 2 bên item liền kề (gap giữa các item chỉ 2px) - chấp nhận đánh đổi này theo yêu cầu người dùng, ưu tiên không vỡ dòng.
- Dòng "Tiêu hao": thay vì tiếp tục vật lộn với việc xuống dòng, sửa thẳng ở `main.min.js` chỗ gán `this.cost.text=h.name` (2 chỗ, ứng với 2 nhánh code khi vật phẩm đang có thể nâng cấp) thành `h.name.replace("Vô Cực","").replace(/^\s+|\s+$/g,"")` - loại bỏ cụm "Vô Cực" (thừa vì cả tab này vật phẩm nào cũng là "Vô Cực") khỏi tên hiển thị ở dòng Tiêu hao, kèm trim khoảng trắng thừa sau khi cắt. Nhờ vậy câu ngắn hẳn lại (ví dụ "Hộ Uyển" thay vì "Hộ Uyển Vô Cực"), nhiều khả năng đủ ngắn để không cần xuống dòng nữa mà không cần đoán thêm về `width`.

Đổi tên `main.min_e6cddaaa.js`→`main.min_75c0bc4a.js` và `default.thm_7ddbda66.js`→`default.thm_f1c61ab2.js` (cache-bust cả 2), cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file.

### 23.4. Quay lại bản chữ nhỏ cho tên item - người dùng so sánh 2 ảnh và thấy bản cũ đẹp hơn (2026-07-06)

Sau khi tăng `width` lên `112` (mục 23.3) để hết cảnh 3 dòng, người dùng gửi 2 ảnh so sánh: ảnh hiện tại (width=112, cỡ chữ 20) bị tràn chữ đè sang tên item bên cạnh ("Vô Cực Thần Kiếm" đè lên "Vô Cực Thần Giáp"); ảnh cũ hơn (từ lúc `width=74, size=13`, mục 23.1) nhìn gọn gàng, không chồng chéo dù chữ nhỏ hơn. Người dùng chọn phương án cũ.

**Đã sửa**: trả `nameLabel` về đúng thông số của mục 23.1: `size=13, width=74`. Dòng "Tiêu hao" giữ nguyên như mục 23.3 (đã bỏ chữ "Vô Cực", không đổi gì thêm).

Đổi tên `default.thm_f1c61ab2.js`→`default.thm_85e0e333.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được.

## 24. Màn "Luyện Trận" (skin `SkinYuPeiNew`): mũi tên đè lên chữ so sánh chỉ số; đổi tên nút "Nâng Cấp Nhanh" → "Tự Nâng Cấp" (2026-07-06)

Người dùng gửi ảnh (IMG_0596) màn "Luyện Trận" (skin `SkinYuPeiNew`, file nguồn `resource/exml/YuPeiNewSkin.exml`), báo cột so sánh chỉ số trước/sau nâng cấp ("Công Kích/Sát Thương Bạo Kích/Cường Độ Bạo Kích") bị lộn xộn, đọc không theo thứ tự, mũi tên ở giữa đè lên chữ. Đồng thời yêu cầu đổi nhãn nút `upgradeBtn0` từ "Nâng Cấp Nhanh" thành "Tự Nâng Cấp".

**Nguyên nhân**: 2 Label `curAtt` (cột "trước") và `nextAtt` (cột "sau") định vị KHÔNG đối xứng nhau — `curAtt` dùng `horizontalCenter="-174.5"` (vị trí cố định), còn `nextAtt` dùng `right="0"` (neo theo mép phải, mép trái thực tế = `chiều rộng nhóm cha (500) - offset right (0) - chiều rộng tự đo của chữ`). Vì cột "sau" thường có số lớn hơn (chuỗi dài hơn) nên `nextAtt` tự đo rộng ra, đẩy mép trái của nó lấn sang trái — đúng vào vị trí mũi tên `cursor` (`horizontalCenter=0`, tức chính giữa nhóm rộng 500px) — gây ra hiện tượng mũi tên đè/cắt ngang chữ "Sát Thương Bạo Kích" ở cột phải. Đây cùng loại lỗi với mục 23 (Label tự đo `width` theo nội dung kết hợp neo theo mép thay vì hộp cố định).

**Đã sửa**: đổi cả 2 Label sang hộp cố định, đối xứng nhau qua tâm: `curAtt` → `x=10, width=195`; `nextAtt` → `x=295, width=195` (chừa khoảng trống ~80px ở giữa, từ 205 đến 295, đủ chỗ cho mũi tên rộng ~70px không bao giờ bị 2 cột lấn vào nữa dù chữ dài ngắn thế nào). Thêm `wordWrap="true" multiline="true"` cho cả 2 (phòng khi 1 dòng số quá dài thì tự xuống dòng 4 thay vì tràn ra ngoài khung), giảm cỡ chữ `20→18` để vừa khung 195px hẹp hơn thoải mái hơn.

Đổi nhãn nút `upgradeBtn0`: `"Nâng cấp nhanh"` → `"Tự Nâng Cấp"` ở `default.thm.js` (giá trị khởi tạo mặc định của nút) và ở `main.min.js` trong hàm `stopOneKyUp_a94` (dòng reset nhãn nút về trạng thái nghỉ sau khi dừng vòng lặp tự nâng cấp — nếu không sửa chỗ này, nút sẽ tự đổi lại nhãn cũ mỗi khi người chơi bấm dừng, lặp lại đúng kiểu lỗi "label không đồng bộ" đã gặp trước đây trong session này).

Sửa đồng bộ ở `default.thm.js` + `resource/exml/YuPeiNewSkin.exml` (nguồn) + `main.min.js`. Đổi tên `default.thm_85e0e333.js`→`default.thm_276d87cb.js` và `main.min_75c0bc4a.js`→`main.min_98adb1e8.js` (cache-bust cả 2 vì cả 2 đều đổi nội dung lần này), cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file, `php -l` qua được cho `index.php`, `manifest.json` hợp lệ.

Vẫn là suy đoán vị trí dựa trên đọc code xung quanh, chưa render trực tiếp kiểm chứng được — cần người dùng chụp ảnh xác nhận lại, các lần sửa skin trước trong session này (Thần Trang, Chí Thánh, Vô Cực) đều cần 2-4 vòng chỉnh mới đạt kết quả ổn.

### 24.1. Test sau mục 24: hết đè mũi tên nhưng khung 195px quá hẹp, "Sát Thương Bạo Kích :" tự xuống 2-3 dòng (2026-07-06)

Người dùng gửi ảnh (IMG_0597) xác nhận mũi tên không còn đè chữ nữa, nhưng nút "Tự Nâng Cấp" đã đổi tên đúng như yêu cầu. Vấn đề còn lại: khung `width=195` quá hẹp nên dòng "Sát Thương Bạo Kích :" tự tách khỏi số của nó (750/1500) xuống dòng riêng, đọc bị ngắt quãng. Yêu cầu: mở rộng + dời khung trái sang trái 10-20px để dòng "Sát Thương Bạo Kích : 750" nằm 1 dòng (giữ nguyên lề trái vì đã ổn); mở rộng khung phải để "Sát Thương Bạo Kích : 1500" và "Cường Độ Bạo Kích : 10" đều nằm 1 dòng.

**Tính toán**: tra được kích thước gốc icon mũi tên `jiantouyou` trong atlas (`resource/image/common/img_tj5.json`) là `75x70` — với `horizontalCenter=0` trong nhóm rộng 500, mũi tên chiếm từ local x=212.5 đến 287.5. Khung `curAtt` gốc (x=10,width=195 → mép phải 205) và `nextAtt` gốc (x=295 → mép trái 295) đã cách mũi tên đúng 7.5px mỗi bên — đây là giới hạn AN TOÀN không được vượt qua khi mở rộng. Ngoài ra, nền pano trong `maxGroup` (`tongyong_dikuang4`, rộng 548, `horizontalCenter=0`) giới hạn vùng hiển thị chữ trong khoảng local x = -24 đến 524 (vượt ra ngoài dễ bị tràn khỏi khung nền).

Vì vậy: chỉ có thể mở rộng `curAtt` bằng cách kéo dài **thêm về bên trái** (giữ nguyên mép phải=205 để không đụng mũi tên), và mở rộng `nextAtt` bằng cách kéo dài **thêm về bên phải** (giữ nguyên mép trái=295). Ước lượng độ rộng cần thiết cho dòng dài nhất ("Sát Thương Bạo Kích : 1500", ~26 ký tự) ở cỡ chữ 18 sẽ vượt quá ngân sách còn lại trong khung nền 548px nếu cộng cả 2 cột + khoảng mũi tên — nên giảm thêm cỡ chữ `18→16` để vừa an toàn trong giới hạn nền.

**Đã sửa**:
- `curAtt`: `x=10,width=195` → `x=-15,width=220` (mép phải giữ nguyên 205, kéo dài thêm 25px về bên trái, dịch cả khung sang trái 25px so với trước).
- `nextAtt`: `x=295,width=195` → `x=295,width=225` (giữ nguyên mép trái 295, chỉ kéo dài thêm 30px về bên phải, mép phải mới = 520, vẫn trong giới hạn nền 524).
- Cỡ chữ cả 2: `18→16` (cần thiết để dòng dài nhất vừa khung mới mà không đụng viền nền hoặc mũi tên).

Sửa đồng bộ `default.thm.js` + `resource/exml/YuPeiNewSkin.exml`. Đổi tên `default.thm_276d87cb.js`→`default.thm_b85d904d.js` (cache-bust, chỉ file này đổi nội dung lần này), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Lần này có tra cứu thêm kích thước thật của icon mũi tên trong atlas thay vì chỉ suy đoán từ code xung quanh, nên độ tin cậy cao hơn các lần trước, nhưng vẫn chưa render trực tiếp được — cần người dùng xác nhận lại bằng ảnh.

## 25. Tab "Đạo Tạng" (skin `Skinheartmethod`): rút gọn "Sát Thương Phần Hỏa", sửa chữ bị cắt "Nhận vật ph", rút gọn tên 5 tab dưới cùng (2026-07-06)

Người dùng xác nhận mục 24/24.1 tạm ổn, chuyển sang màn "Đạo Tạng" (ảnh IMG_0598), báo 3 vấn đề:

1. **"Sát Thương Phần Hỏa"** quá dài khiến dòng so sánh chỉ số (`curAtt0`/`nextAtt0` trong `Skinheartmethod`) tự xuống dòng giữa tên thuộc tính và giá trị (`Sát Thương Phần Hỏa` / `: 20000` tách 2 dòng, đọc rối) — yêu cầu đổi thành "Sát Thương Hỏa".

2. **"Nhận vật ph"** bị cắt cụt (thiếu "ẩm"). Tìm ra nguyên nhân: `getItemTxt0` (Label "Nhận vật phẩm" trong `upInfo` group) có `width="100"` — khác với các Label dùng `textFlow` (curAtt0/nextAtt0, tự động xuống dòng khi tràn), Label này gán trực tiếp qua `.text` nên khi nội dung vượt quá `width` mà không có `wordWrap`, phần chữ thừa bị CẮT hẳn (không hiện, không tràn ra ngoài) thay vì tự xuống dòng — cùng cơ chế "text bị cắt vì width hẹp + không wordWrap" đã gặp nhiều lần trong session này.

3. **Dãy 5 tab dưới cùng** ("Ngự Khí", "Luyện Trận", "Đạo Tạng", "Vạn Thú Ngự Sứ", "Long Nguyên") hiển thị dính chữ vào nhau ("Đạo TạngVạn Thú NgựLong Nguyên"). Tìm ra nguyên nhân: đây là `eui.TabBar` với `dataProvider={viewStack}` (định nghĩa trong `TreasureWinSkin.exml`) — nhãn mỗi tab lấy trực tiếp từ thuộc tính `name` của panel con tương ứng trong `ViewStack`. 4/5 tên đã gọn (2 từ), riêng "Vạn Thú Ngự Sứ" (gán cho `shenshouPanel`) dài 4 từ, vượt quá độ rộng nút tab khiến chữ tràn/đè sang nút bên cạnh.

**Nguyên nhân gốc chung của cả 3 vấn đề**: đều là các trường hợp "hộp chữ cố định (width nút hoặc box) không theo kịp độ dài chữ tiếng Việt dịch ra dài hơn bản gốc" — đúng loại lỗi lặp lại xuyên suốt session này, khác nhau ở chỗ xử lý khi tràn (tự xuống dòng / cắt chữ / đè sang ô bên cạnh) tùy loại control.

**Đã sửa**:
- Đổi chuỗi `"Sát Thương Phần Hỏa"` → `"Sát Thương Hỏa"` ở nơi định nghĩa tên gốc cho thuộc tính này trong `main.min.js` (hàm tra tên theo `AttributeType.atZhuiMingVal`, dùng chung cho MỌI nơi hiển thị thuộc tính này trong toàn bộ game, không riêng màn Đạo Tạng) — nhờ đổi ở đúng 1 chỗ nguồn nên tự động áp dụng đồng bộ mọi nơi. Đồng thời đổi luôn 111+110+1 chỗ chuỗi này bị "đóng cứng" sẵn trong mô tả trang bị ở `resource/config/config.json`, `resource/config1/config0.json`, `resource/config1/config6.json` (những chuỗi desc này không đi qua hàm tra tên ở trên, phải sửa trực tiếp) để đồng bộ toàn game, tránh tái diễn khi người dùng gặp lại chữ cũ ở màn khác.
- Tăng `width` của `getItemTxt0` từ `100` lên `140` (đủ chỗ cho "Nhận vật phẩm" ở cỡ chữ 20 không bị cắt, đã kiểm tra không đụng nút "Tu luyện" bên cạnh hay tràn khỏi khung `upInfo` rộng 600).
- Đổi `name="Vạn Thú Ngự Sứ"` (gán cho `shenshouPanel` trong `Skinheartmethod`-liên-quan `ViewStack`, cũng là file `TreasureWinSkin.exml`) → `name="Vạn Thú"` (rút còn 2 từ, đồng bộ với 4 tab còn lại).

Sửa đồng bộ `default.thm.js` + `main.min.js` + `resource/exml/heartmethod.exml` (riêng `getItemTxt0`) + `resource/exml/TreasureWinSkin.exml` (dịch nốt cả 5 tên tab từ tiếng Trung gốc "御器/炼阵/道藏/万兽驭使/龙元" sang tiếng Việt đã dùng trong bản compiled — file exml này trước giờ chưa được đồng bộ dịch, chỉ có bản compiled là đã dịch). Đổi tên `default.thm_b85d904d.js`→`default.thm_9be68048.js` và `main.min_98adb1e8.js`→`main.min_a7238c3c.js` (cache-bust cả 2), cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file JS, `php -l` qua được, cả 3 file JSON hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt là độ rộng mới của "Nhận vật phẩm" và tên tab "Vạn Thú" có vừa khít không.

### 25.1. Test sau mục 25: tab/label đã ổn nhưng "Sát Thương Hỏa" vẫn tự tách số ra dòng riêng (2026-07-06)

Người dùng gửi ảnh (IMG_0599) xác nhận: tên tab, "Nhận vật phẩm" đều đã hiển thị đúng. Còn lại: dòng "Sát Thương Hỏa：20000" (cột trái) vẫn xuống dòng nhưng lần này đứt ngay GIỮA con số ("Sát Thương Hỏa：200" rồi "00" rơi xuống dòng dưới) — chỉ thiếu đúng vài px là đủ 1 dòng. Tương tự cột phải "Sát Thương Hỏa：2040" rồi "0" rớt dòng. Yêu cầu: dời khung trái sang trái thêm 30px, mở rộng khung phải thêm 30px về bên phải (cùng nguyên tắc như mục 24.1, chỉ khác skin).

**Khác với mục 24.1**: skin `Skinheartmethod` dùng nền `nextAttBG0` kiểu `left=0,right=0,top=0,bottom=0` (co giãn khít theo đúng khung chứa `shuxingbianhua` rộng 581), không phải ảnh nền cố định 548px có margin hẹp như skin `SkinYuPeiNew` — nên có nhiều khoảng trống hơn để mở rộng, không lo tràn khỏi nền.

**Đã sửa** (áp dụng cho trạng thái `narmal`, đúng trạng thái đang hiển thị trong ảnh):
- `curAtt0`: `horizontalCenter=-140.5, width=192` → `horizontalCenter=-155.5, width=222` (giữ nguyên mép phải tại vị trí cũ để không đụng mũi tên `cursor0`, kéo dài thêm đúng 30px về bên trái).
- `nextAtt0`: `horizontalCenter=155, width=199` → `horizontalCenter=170, width=229` (giữ nguyên mép trái tại vị trí cũ, mở rộng thêm đúng 30px về bên phải).

Sửa đồng bộ `default.thm.js` + `resource/exml/heartmethod.exml`. Đổi tên `default.thm_9be68048.js`→`default.thm_13a5740f.js` (cache-bust, chỉ file này đổi nội dung lần này), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh.

## 26. Tab "Vạn Thú" (skin `Skinshenshou`): dòng nhắc "Mặc đủ trang bị..." tràn khỏi màn hình, yêu cầu canh giữa + rút ngắn (2026-07-06)

Người dùng gửi ảnh (IMG_0600) màn "Vạn Thú" (skin `Skinshenshou`, nguồn `resource/exml/shenshouSkin.exml`), báo dòng chữ vàng "Mặc đủ trang bị mới có thể xuất trận, thuộc tính và kỹ năng Thú Th[bị cắt]" bị mất chữ, yêu cầu đưa vào giữa màn hình và viết ngắn lại.

**Nguyên nhân**: icon cảnh báo (`gantanhao4`) và Label neo cứng bằng `left="86"`/`left="110"` (không có `width`/`wordWrap`), trong khi bản dịch tiếng Việt gốc dài 102 ký tự — vượt xa hết chiều rộng màn hình 600, phần vượt quá bị cắt khỏi vùng nhìn thấy (không phải lỗi code, mà do neo trái không giới hạn kết hợp câu quá dài).

**Đã sửa**: gộp icon + label vào chung 1 `Group` mới (`horizontalCenter="0"`, `HorizontalLayout gap="10" verticalAlign="middle"`) thay vì 2 phần tử rời neo trái cố định — nhờ vậy cả cụm (icon+chữ) tự canh giữa màn hình như 1 khối, không cần đoán tọa độ tay. Đồng thời rút ngắn nội dung: "Mặc đủ trang bị mới có thể xuất trận, thuộc tính và kỹ năng Thú Thần Hộ Vệ xuất trận sẽ có hiệu lực" (102 ký tự) → "Mặc đủ trang bị để xuất trận, kích hoạt thuộc tính/kỹ năng" (58 ký tự, giữ nguyên ý chính: phải mặc đủ đồ mới xuất trận được và thuộc tính/kỹ năng mới có tác dụng). Thêm `width="480" wordWrap="true" multiline="true"` cho Label làm lớp phòng hờ — nếu vẫn hơi dài so với ước lượng thì tự xuống dòng gọn trong khung thay vì tràn ra ngoài như cũ.

Sửa đồng bộ `default.thm.js` (tái cấu trúc `_Image2_i`/`_Label5_i` cũ thành 1 `_Group8_i` mới chứa cả 2, cập nhật lại danh sách `elementsContent` của skin) + `resource/exml/shenshouSkin.exml`. Đổi tên `default.thm_13a5740f.js`→`default.thm_70211a8a.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Lưu ý: tiêu đề góc trên bên trái màn này ("万兽驭使") vẫn còn tiếng Trung chưa dịch — người dùng chưa yêu cầu nên chưa đụng tới, có thể xử lý riêng nếu cần.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt là độ dài dòng chữ mới có vừa 1 dòng hay xuống 2 dòng, và cụm icon+chữ đã thật sự nằm giữa màn hình chưa.

### 26.1. Xác nhận tiêu đề "万兽驭使" là ảnh (không sửa được bằng text) + tách "Trắng 1 sao" + tên vật phẩm ra 2 dòng (2026-07-06)

Người dùng đặt câu hỏi/xác nhận: chữ Trung "万兽驭使" ở góc trên có phải là ảnh không, và yêu cầu tách cụm "Trắng 1 sao" + tên vật phẩm (hiện dính liền nhau kiểu "Trắng 1 saoThú Đan") thành 2 dòng riêng.

**Xác nhận tiêu đề là ảnh**: tra trong `main.min.js` thấy đoạn code chọn banner theo tab: `case e.Shenshou: this.title.source="biaoti_shoushen"` — đây là gán `.source` cho 1 `e:Image`, tức đúng là ảnh bitmap có sẵn chữ Hán vẽ trong file `resource/image/biaoti/biaoti_shoushen.png` (không phải text) — giống hệt trường hợp icon "封神/灵宠/神御..." đã gặp và xác nhận ở mục 8.32 trước đây trong session này. Không sửa được bằng cách đổi text; muốn dịch phải vẽ lại/thay hẳn file ảnh (ngoài khả năng hiện tại) — tạm để nguyên, chưa đụng tới.

**Tách "Trắng 1 sao" + tên vật phẩm thành 2 dòng**: tìm thấy trong `main.min.js`, class `ShenshouEquipItem` (item renderer cho các ô khoá "Trắng 1 sao..." khi CHƯA có vật phẩm, dùng bởi `shenshouEquipItem.exml`/`ItemshenshouEquip`), hàm `setPosData` gán `this.nameTxt.text=this.qualityName[i]+this.equipName[e]` — nối trực tiếp 2 chuỗi ("Trắng 1 sao" + "Thú Đan") không hề có khoảng trắng hay xuống dòng ở giữa, nên hiển thị dính liền đọc như 1 từ. Label `nameTxt` trong exml không có `width` cố định (tự co giãn theo nội dung) nên không cần thêm `wordWrap` — chỉ cần chèn `"\n"` là đủ tách 2 dòng.

**Đã sửa**: đổi thành `this.nameTxt.text=this.qualityName[i]+"\n"+this.equipName[e]` (chèn newline thủ công giữa 2 phần) trong `main.min.js`. Không cần sửa `shenshouEquipItem.exml` vì text được gán động hoàn toàn từ code, exml chỉ định nghĩa style/vị trí của Label.

Đổi tên `main.min_a7238c3c.js`→`main.min_95a9adbd.js` (cache-bust, chỉ file JS logic này đổi nội dung; `default.thm.js` không đổi lần này nhưng vẫn phải bump `?v=` trong `index.php` vì nội dung `manifest.json` đổi tên file `main.min`). `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh.

### 26.2. Test sau mục 26: dòng nhắc đè lên "Thú Khải" bên trái, vẫn không hiện đủ câu (2026-07-06)

Người dùng gửi ảnh (IMG_0602) báo: sau khi canh giữa (mục 26), dòng "Mặc đủ trang bị mới có thể xuất trận, thuộc tính và…" đè trực tiếp lên chữ "Thú Khải" (nhãn item cột trái dưới cùng) và vẫn không hiện trọn câu. Yêu cầu: buộc câu hiện đủ trên 2 dòng, canh giữa theo tâm hình con chim phía trên.

**Nguyên nhân đè chữ**: bản sửa mục 26 canh giữa cả cụm theo toàn màn hình rộng 600 (`horizontalCenter="0"`, không giới hạn `width` chặt), nên vùng chữ trải dài chạm luôn vào cột item bên trái/phải (khác với bản gốc neo trái `left=110` trước đó, tuy tràn mép phải nhưng không lấn được sang cột trái). Ở đúng độ cao `top=425` này, 2 cột item (icon + nhãn 2 dòng "Trắng 1 sao"/"Thú Khải") đã chiếm sẵn 2 bên; chỉ có khoảng trống ở giữa (giữa cột trái và cột phải, ước lượng ~khoảng x=104 đến x=495 trong hệ toạ độ 600 của skin) — cần thu hẹp `width` để lọt đúng khoảng trống này, không chạm 2 cột.

**Đã sửa**:
- Thu hẹp `width` của Label từ `480` xuống `340` (vừa trong khoảng trống giữa 2 cột item, không đè "Thú Khải"/"Thú Giác").
- Chèn thẳng ký tự xuống dòng thủ công (`\n`) vào giữa câu thay vì chỉ dựa vào `wordWrap` tự đoán điểm ngắt: `"Mặc đủ trang bị để xuất trận,\nkích hoạt thuộc tính/kỹ năng"` — đảm bảo LUÔN hiện đúng 2 dòng, không phụ thuộc ước lượng độ rộng ký tự.
- Giảm cỡ chữ `18→12` và thêm `textAlign="center"` — bắt buộc phải giảm cỡ chữ vì khoảng trống theo chiều dọc giữa nhãn item phía trên (kết thúc ~y=425) và khung thuộc tính "Công kích:+0..." phía dưới (bắt đầu tại `top=452`) chỉ vỏn vẹn ~27px — không đủ chỗ cho 2 dòng chữ cỡ 18 (cần ~44-46px) mà không chạm khung thuộc tính, nên phải thu nhỏ chữ để 2 dòng gọn trong ~27-30px. Giữ `horizontalCenter="0"` (không đổi) để tâm cụm chữ trùng tâm màn hình — nơi hình con chim cũng được canh giữa, nên tự động "canh đều so với hình con chim" như yêu cầu.

Sửa đồng bộ `default.thm.js` + `resource/exml/shenshouSkin.exml` (dùng `&#10;` thay cho ký tự xuống dòng trong thuộc tính XML). Đổi tên `default.thm_70211a8a.js`→`default.thm_de331a1f.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Đây là khoảng không gian rất chật (chỉ ước lượng dựa trên các mốc `top` đã biết trong code, chưa render trực tiếp kiểm chứng), cỡ chữ 12 có thể hơi nhỏ so với mong đợi — cần người dùng xác nhận lại bằng ảnh, nếu vẫn chạm khung thuộc tính bên dưới có thể cần giảm thêm hoặc cân nhắc dời cả khung thuộc tính xuống.

### 26.3. Test sau mục 26.2: hết đè chữ nhưng chữ quá nhỏ khó đọc — quay lại neo trái từ icon, cỡ 16, 1 dòng (2026-07-06)

Người dùng gửi ảnh (IMG_0605 + crop cận cảnh IMG_0606) xác nhận: không còn đè chữ "Thú Khải" nữa, nhưng cỡ chữ 12 quá nhỏ khó nhìn. Yêu cầu: cỡ chữ 16, gói gọn 1 dòng, và dòng chữ phải bắt đầu ngay từ icon dấu "!" (như ảnh cận cảnh minh hoạ) thay vì canh giữa màn hình.

**Đã sửa**: bỏ `horizontalCenter="0"` (canh giữa), quay lại neo trái `left="86"` (đúng vị trí icon gốc trước khi sửa ở mục 26) — icon + Label vẫn nằm chung 1 `Group` với `HorizontalLayout`, nên chữ tự động bắt đầu ngay sau icon "!" như yêu cầu. Bỏ ký tự xuống dòng thủ công đã chèn ở mục 26.2, gộp lại thành 1 dòng. Tăng cỡ chữ `12→16`. Tính lại `width`: tra được kích thước thật icon `gantanhao4` trong atlas (`resource/image/common/img_tj5.json`) là `14x20` — nhỏ hơn nhiều so với ước lượng trước đó; với `gap=10`, khoảng trống còn lại từ `left=86` đến mép phải màn hình 600 là `600-86-14-10=490px`, đặt `width="470"` cho Label (chừa dư ~20px) để câu 58 ký tự ở cỡ chữ 16 (~8.3px/ký tự, cần ~480px) vừa đúng 1 dòng mà không chạm mép phải. Giữ `wordWrap`/`multiline` làm lớp phòng hờ — nếu vẫn hơi dư thì tự xuống dòng 2 thay vì tràn mất chữ như bản gốc.

Vì cột item bên trái ("Trắng 1 sao/Thú Khải") kết thúc sớm hơn vị trí `left=86` này (đã xác nhận không đè ở bản gốc trước khi sửa mục 26), và bản gốc trước đây CHỈ lỗi vì câu quá dài (102 ký tự) tràn mép phải chứ không phải lỗi vị trí — nay câu đã rút còn 58 ký tự nên với cùng vị trí neo trái này, tính toán cho thấy đủ chỗ 1 dòng.

Sửa đồng bộ `default.thm.js` + `resource/exml/shenshouSkin.exml`. Đổi tên `default.thm_de331a1f.js`→`default.thm_58d8fc6e.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt là mép phải câu có chạm/tràn khỏi màn hình 600 không.

### 26.4. Test sau mục 26.3: 1 dòng, cỡ chữ 16 ổn, chỉ cần dời sang phải 10px cho thoáng khỏi "Thú Khải" (2026-07-06)

Người dùng gửi ảnh (IMG_0607) xác nhận: câu đã gọn 1 dòng, cỡ chữ 16 đọc rõ, không tràn mép phải — chỉ cần dời cả cụm (icon+chữ) sang phải thêm 10px để không còn sát/gần chạm chữ "Thú Khải" bên trái.

**Đã sửa**: đổi `left="86"` → `left="96"` cho `Group` chứa icon+Label (đơn giản dời cả cụm sang phải 10px, giữ nguyên mọi thông số khác — cỡ chữ 16, 1 dòng, `width=470`). Khoảng trống còn lại đến mép phải màn hình giảm nhẹ từ 490px xuống 480px, vẫn đủ dư ~10px cho câu 58 ký tự.

Sửa đồng bộ `default.thm.js` + `resource/exml/shenshouSkin.exml`. Đổi tên `default.thm_58d8fc6e.js`→`default.thm_22f60dd9.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

### 26.5. Chỉnh thêm: `left=120` là đẹp nhất (2026-07-06)

Người dùng chốt: `left="96"` (mục 26.4) vẫn chưa đủ, đổi hẳn thành `t.left = 120;` là đẹp. Đã sửa `left="96"`→`left="120"`, đồng thời thu hẹp `width` của Label từ `470`→`450` (vì `left` tăng thêm 24px thì ngân sách chiều rộng còn lại đến mép phải màn hình giảm tương ứng, từ 480px xuống 456px — giữ `width=450` để chắc chắn không tràn mép phải).

Sửa đồng bộ `default.thm.js` + `resource/exml/shenshouSkin.exml`. Đổi tên `default.thm_22f60dd9.js`→`default.thm_d76b93e8.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

## 27. Màn "Chọn máy chủ" đầu game (trước khi vào game, class `GameSelectServeUI`): dời lên cao hơn 200px (2026-07-06)

Người dùng hỏi về màn hình đăng nhập/chọn server đầu tiên ("Say Mộng Giang Hồ", ô "Túy Võ Hiệp - Server 1" + nút "Chọn máy chủ" + nút "Bắt Đầu") — ban đầu tìm không ra vì đây KHÔNG phải trang HTML tĩnh, không nằm trong `resource/exml/*.exml` (không dùng cơ chế skin EUI thông thường như mọi màn khác trong session này), mà là 1 class Egret dựng UI hoàn toàn bằng code (`new eui.Image`, `new eui.Button`, gán `.x`/`.y` trực tiếp), tên class `GameSelectServeUI` trong `main.min.js`. Người dùng xác nhận thêm bằng ảnh chụp tab Network của DevTools cho thấy các ảnh `bar1.png`, `selectServerBtnBg.png`, `selecServerBg.png`, `statemessage.png`... đều tải từ `resource/eui/loading/` — khớp đúng với các đường dẫn `ResDirMgr.RES_RESOURCE+"eui/loading/..."` tìm thấy trong `GameSelectServeUI`.

Yêu cầu: dời "chỗ chọn server" (thanh nền + icon trạng thái + chữ "Túy Võ Hiệp - Server 1" + nút "Chọn máy chủ") lên cao hơn khoảng 200px.

**Đã sửa**: trừ `200` vào toạ độ `y` của 4 phần tử tạo nên thanh chọn server (không đụng nút "Bắt Đầu" `inGameBtn` vì người dùng chỉ nói "chỗ chọn server"):
- `nowServePaneBg` (nền thanh pill): `y=633` → `y=433`
- `nowSelectServerStatePic` (icon tròn trạng thái, chấm vàng/xanh): `y=646` → `y=446`
- `nowSelectServerText` (chữ "Túy Võ Hiệp - Server 1"): `y=648` → `y=448`
- `selectBtn` (nút "Chọn máy chủ"): `y=643` → `y=443`

Vì class này dựng UI bằng code thuần (không qua `.exml`), không có file nguồn nào để đồng bộ — chỉ sửa `main.min.js`. Đổi tên `main.min_95a9adbd.js`→`main.min_f4cc8742.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt xem thanh chọn server ở vị trí mới có bị che bởi logo tiêu đề "Say Mộng Giang Hồ" phía trên hay không (logo được set `y=250` trong code, thấp hơn nhiều so với vị trí mới `y≈433-448` nên về lý thuyết không chạm nhau, nhưng vẫn cần xác nhận thực tế).

## 28. Bug: có "Định Thân Ngọc Phù" (thưởng VIP3) trong túi nhưng bấm "Kích hoạt" báo thiếu nguyên liệu (2026-07-07)

Người dùng báo (kèm 5 ảnh minh hoạ luồng): nạp VIP3 nhận được vật phẩm "Định Thân Ngọc Phù" (item id `200013`, số lượng 1 trong túi đồ, xác nhận qua tooltip trong tab "Đạo cụ"). Bấm "Sử dụng" trên item → được đưa sang tab "Nhân Vật", hiện đúng màn chi tiết "Định Thân Ngọc Phù" kèm nút "Kích hoạt". Nhưng bấm "Kích hoạt" thì lại hiện popup "Không đủ nguyên liệu, nhận qua các cách sau" (gợi ý đi nạp VIP3 hoặc mua ở Cửa Hàng Bí Ẩn) — dù đang có sẵn đúng 1 cái, đúng bằng số lượng cần (`cost=1` theo `ConfigExRing0[0].cost`).

**Dò code**: đây là hệ thống "ExRing" (`ConfigExRing`/`ConfigExRing0`/`ConfigExRing1`, 2 "ngọc phù" đặc biệt gắn thêm cho nhân vật, hiện dưới dạng 2 icon cánh bạc 2 bên nhân vật trong tab "Nhân Vật"), xử lý trong class `SpecialRingWin` (`main.min.js`). Khi mở panel, `roleChange()` kiểm tra đã kích hoạt chưa (`getExRingsData(index)==0`), nếu chưa thì tính số lượng nguyên liệu đang có bằng `UserBagSystem.ins().getBagGoodsCountById(0, i.costItem)` rồi so với `cost` để quyết định trạng thái `"lock"` (thiếu, bấm Kích hoạt → mở popup mua) hay `"active"` (đủ, bấm Kích hoạt → gửi lệnh lên server). Bấm nút không hề gửi request lên server trước khi xác nhận đủ đồ — toàn bộ quyết định "đủ/thiếu" nằm ở CLIENT.

`getBagGoodsCountById(0, id)` với tham số bag-type `0` không quét trực tiếp danh sách vật phẩm (`bagModel[0]`, nguồn dữ liệu chính xác dùng để hiển thị túi đồ — đã xác nhận đúng số lượng 1 trong tooltip) mà đọc qua 1 bộ đếm cache riêng (`itemCount[0][id]`), được cập nhật mỗi khi có sự kiện thêm/xoá/đổi số lượng vật phẩm (`doBagData`, `doItemAdd_a94`, `doItemUpData_a94` đều gọi `addItemCounts_a94` để đồng bộ cache này). Không dò ra được chính xác gói tin nào đã cấp vật phẩm thưởng VIP3 cho tài khoản này (không thể debug trực tiếp bằng log mạng), nhưng bằng chứng cho thấy `itemCount[0][200013]` bị lệch khỏi `bagModel[0]` thực tế (cache trả về 0 trong khi túi đồ có 1) — tức là có ít nhất 1 đường cấp vật phẩm nào đó (nhiều khả năng đường trao thưởng VIP hàng loạt) không đi qua đúng các hàm cập nhật cache kể trên.

**Đã sửa**: thay vì vá lại toàn bộ cơ chế cache (rủi ro cao, ảnh hưởng 65 chỗ gọi `getBagGoodsCountById` khác trong game), chỉ sửa đúng điểm kiểm tra trong `SpecialRingWin.roleChange()` — thay lệnh gọi cache bằng 1 hàm quét trực tiếp `UserBagSystem.ins().bagModel[0]` (cộng dồn `count` của mọi ô trùng `itemConfig.id`), giống hệt cách hiển thị số lượng trong tooltip túi đồ (luôn đúng theo ảnh người dùng gửi) — đảm bảo kết quả kiểm tra "đủ/thiếu nguyên liệu" khớp chính xác với thực tế túi đồ bất kể cache có đồng bộ hay không.

Vì đây là sửa 100% code logic trong `main.min.js` (không phải file skin/layout), chỉ đổi tên `main.min_f4cc8742.js`→`main.min_90c6d4ca.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Đây là sửa dựa trên đọc code tĩnh (không debug trực tiếp bằng log server/network được), về lý thuyết giải quyết đúng triệu chứng đã báo (kiểm tra sai do cache lệch) — nhưng cần người dùng bấm "Kích hoạt" lại để xác nhận đã kích hoạt thành công. Nếu vẫn lỗi, khả năng cao nguyên nhân nằm ở phía SERVER (Lua) từ chối lệnh `sendUpGradeOperate` vì lý do khác — sẽ cần dò tiếp phía server lúc đó.

## 29. Bug thật sự của mục 28: sai lệch HOA/thường giữa nhãn nút và điều kiện so sánh trong code (2026-07-07)

Người dùng test lại: vẫn còn báo "Không đủ nguyên liệu" y hệt dù túi đồ giờ có tới 3 cái "Định Thân Ngọc Phù" (ảnh xác nhận số lượng qua tab Đạo cụ) — chứng tỏ bản vá mục 28 (đọc thẳng `bagModel` thay vì cache) không giải quyết đúng gốc rễ. Người dùng yêu cầu dò lại toàn bộ code trong repo, và dò luôn phần "Tiên Thủ Trụy Sức" (nguyên liệu ExRing thứ 2, cần thưởng VIP5).

**Tìm ra nguyên nhân thật**: đoạn xử lý bấm nút trong `SpecialRingWin` (class quản lý cả 2 "ngọc phù" ExRing) là:
```js
case this.btnUse: "Kích Hoạt"==this.btnUse.label ? this.sendUpgrade() : this.openBuyGoods()
```
Nhưng nhãn THẬT SỰ của nút (định nghĩa trong skin `SkinRingTips`, file `default.thm.js`) lại là:
```js
t.label = "Kích hoạt";  // chữ "h" thường, không phải "Kích Hoạt" chữ "H" hoa
```
JavaScript so sánh chuỗi phân biệt hoa/thường (`"Kích Hoạt" !== "Kích hoạt"`), nên điều kiện **LUÔN LUÔN sai** — bấm nút không bao giờ gọi được `sendUpgrade()` (gửi lệnh lên server) mà luôn rơi vào `openBuyGoods()` (mở popup "thiếu nguyên liệu"), **bất kể trong túi có bao nhiêu nguyên liệu**. Đây là lỗi dịch thuật có sẵn từ trước (một chỗ dịch "Kích hoạt", một chỗ dịch/gõ "Kích Hoạt" — không đồng bộ hoa/thường), không phải lỗi do các lần sửa trước trong session này gây ra. Bản vá mục 28 tuy đúng hướng (cache có thể lệch thật) nhưng không phải nguyên nhân chính khiến nút luôn báo lỗi.

Vì `SpecialRingWin` xử lý CẢ 2 slot ExRing bằng chung 1 hàm (chỉ khác tham số `index`/`currData` truyền vào), lỗi này áp dụng cho **cả "Định Thân Ngọc Phù" lẫn "Tiên Thủ Trụy Sức"** — sửa 1 chỗ là khắc phục cho cả hai như người dùng yêu cầu.

**Dò toàn bộ code để tìm lỗi tương tự**: viết script quét toàn bộ `main.min.js`, tìm mọi chỗ so sánh `"chuỗi"==this.xxx.label`, đối chiếu với mọi nơi từng gán `this.xxx.label="chuỗi"` cho cùng field đó, lọc ra các trường hợp chuỗi so sánh không khớp với bất kỳ giá trị nào từng được gán (cùng class). Tìm thêm được **5 lỗi cùng loại** (không phải do người dùng báo, chủ động sửa luôn cho đồng bộ, tránh lặp lại đúng kiểu lỗi này ở tính năng khác):

- `DressesWin` (màn "Ảo Hóa"/hình tượng biến hình), nút `dressBtn`:
  - `"Kích Hoạt"` → `"Kích hoạt"` (cùng lỗi hoa/thường)
  - `"Huyễn Hóa"` → `"Ảo Hóa"` (2 từ dịch khác nhau cho cùng 1 khái niệm — nhãn nút thật luôn là "Ảo Hóa", điều kiện kiểm tra "Huyễn Hóa" không bao giờ khớp)
  - `"Nâng Cấp"` → `"Nâng cấp"` (lỗi hoa/thường)
  - `"Cởi Bỏ"` → `"Cởi ra"` (2 từ dịch khác nhau cho cùng khái niệm "gỡ trang phục")
- `DressesWin`, nút `dressBtn2`: `"Huyễn Hóa"` → `"Ảo Hóa"` (cùng lỗi, khiến bấm nút này luôn chạy nhầm sang lệnh "cởi ra" thay vì "mặc vào")
- `OSATarget6Panel`, nút `goBtn`: `"Đi Tiêu Diệt"` → `"Đi tiêu diệt"` (lỗi hoa/thường, khiến nút "đi tiêu diệt boss" trong 1 sự kiện không hoạt động)
- (panel xem chung kết đấu trường), nút `vewChampScore`: `"Xem Tỷ Số"` → `"Xem tỷ số"` (lỗi hoa/thường, khiến nút "Xem tỷ số" không mở được màn xem kết quả)

**Không sửa** 2 trường hợp còn lại nghi ngờ tương tự vì rủi ro cao/không đủ chắc chắn: `upgradeBtn` so với `"Tiến Giai"` (field name dùng chung bởi nhiều class khác nhau trong game, không xác định chắc được đây có phải lỗi thật hay là logic hợp lệ dùng chung từ 1 base class) và `btn1` so với `"Mua"` (tên field quá chung chung, khả năng cao đang so sánh nhầm giữa nhiều class không liên quan — không đủ bằng chứng để sửa an toàn).

Đổi tên `main.min_90c6d4ca.js`→`main.min_d847a680.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ. Đã chạy lại script quét sau khi sửa để xác nhận không còn sai lệch nào (ngoại trừ 2 trường hợp cố tình bỏ qua ở trên và 1 số trùng tên field giữa các class khác nhau — false positive do field name trùng lặp, không phải lỗi thật).

Đây là NGUYÊN NHÂN GỐC thật sự (không phải suy đoán từ đọc code xung quanh như các lần sửa layout trước — lần này xác minh được bằng cách đối chiếu trực tiếp giá trị gán thực tế trong `default.thm.js`/`main.min.js` với điều kiện so sánh), độ tin cậy cao. Vẫn cần người dùng bấm "Kích hoạt" lại để xác nhận.

Người dùng xác nhận: "Đã mặc được" — bug đã hết cho cả 2 vật phẩm.

## 30. Màn "Thiên Thư" (skin `SkinMijiPanel`): nhãn "Đổi Thiên Thư" bay hẳn ra ngoài mép phải màn hình (2026-07-07)

Người dùng gửi ảnh (IMG_0619) màn "Thiên Thư" (bánh xe 8 ô kỹ năng + nút "Khảm"), báo chữ "Đổi" (thực ra là "Đổi Thiên Thư") bị văng hẳn sang mép phải màn hình, chỉ thấy đúng chữ "Đổi" bị cắt, không thấy phần còn lại.

**Nguyên nhân**: Label `change` ("Đổi Thiên Thư") dùng anchor `right="50"` (neo cách mép phải 50px), nằm trong 1 `Group` cha (chứa `change`, `btnAct` [nút Khảm], `learnLabel`, `learnImg`) **không có `width` khai báo tường minh** — group này chỉ có `height="80"` + `horizontalCenter="0"`, để Egret tự tính `width` dựa theo các con bên trong. Vì `right` định vị theo chính `width` đang-được-tự-tính-toán đó, xảy ra vòng lặp tự tham chiếu (kích thước group phụ thuộc vị trí label, vị trí label lại phụ thuộc kích thước group) khiến Egret tính ra 1 `width` bất định, đẩy hẳn nhãn "Đổi Thiên Thư" ra xa khỏi vùng nhìn thấy — cùng loại lỗi với nhãn `nextAtt` ở mục 24 (Label dùng anchor `right` trong container không có `width` cố định).

**Đã sửa**: thêm `width="600"` tường minh cho Group cha này (khớp đúng chiều rộng toàn skin `SkinMijiPanel`, cũng là chiều rộng màn hình chuẩn) — nhờ vậy `right="50"` giờ tính theo mốc cố định 600, đưa nhãn "Đổi Thiên Thư" về đúng vị trí cách mép phải 50px như thiết kế ban đầu, không ảnh hưởng nút "Khảm" (`horizontalCenter="0"`, đã đúng vị trí từ trước, thêm `width` không làm nó xê dịch vì width mới khớp đúng chiều rộng màn hình).

Sửa đồng bộ `default.thm.js` (`_Group3_i`) + `resource/exml/MijiPanelSkin.exml`. Đổi tên `default.thm_d76b93e8.js`→`default.thm_7459ab38.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh.

## 31. Áp dụng hàng loạt các lỗi tương tự cho 5 skin: "Long Nguyên", "Chu Tiên", "Luyện Khí" (2 tab), "Tiên Cương" (2026-07-07)

Người dùng gửi 5 ảnh, yêu cầu sửa các lỗi "tương tự" các lỗi đã gặp trước đó (chữ bị cắt/xuống dòng do khung hẹp, tràn lệch vị trí...), riêng ảnh cuối ("Tiên Cương") có mô tả cụ thể: chữ "Tiêu hao" xuống dòng dù bên trái còn trống nhiều.

### 31.1. "Long Nguyên" (skin `Skinhungu`) — "Nhận vật phẩm" xuống dòng

Cùng lỗi mẫu đã sửa ở mục 25/26: `getItemTxt0` width=100 quá hẹp. Tăng lên `width=140` + thêm `wordWrap`/`multiline` phòng hờ, giữ nguyên `horizontalCenter=215` (đã kiểm tra còn đủ margin trong khung cha rộng 600).

### 31.2. "Chu Tiên" (skin `Skinheirloom`, class `HeirloomWindow`) — 3 lỗi khác nhau

1. **Chữ số liệu đè lên chữ mô tả** ("Công kích:5400" dính liền): tìm ra 6 cặp nhãn thuộc tính (`desc0`/`attr0` … `desc5`/`attr5`) đều dùng toạ độ CỐ ĐỊNH `attrN.x=70` bất kể `descN` dài ngắn thế nào — với các nhãn tiếng Việt như "Kháng phép:"/"Vật Kháng:" (dài hơn 70px), số liệu đè lên đúng phần cuối chữ mô tả. Phát hiện cặp thứ 7 (`desc6`/`attr6`, "Tất cả thuộc tính linh kiện...") KHÔNG bị lỗi vì code đã tính động: `attr6.x = desc6.x + desc6.width + 20`. Áp dụng đúng công thức đó cho cả 6 cặp còn lại — thêm đoạn `this.attrN.x = this.descN.width + 20` (N=0..5) ngay sau khi gán `text` cho từng cặp trong `main.min.js`, để vị trí số liệu luôn tự bám theo độ dài chữ mô tả thực tế thay vì số cố định.
2. **"Vũ KhíTất cả thuộc tính bộ phận" dính liền chữ**: tìm ra `this.desc6.text = l + "Tất cả thuộc tính bộ phận"` (l = tên bộ phận trang bị như "Vũ Khí"/"Hộ Uyển"/"Giới Chỉ"...) nối chuỗi không có khoảng cách — cùng loại lỗi "Trắng 1 saoThú Đan" đã gặp ở mục 26.1. Thêm `" - "` làm dấu phân cách: `l+" - Tất cả thuộc tính bộ phận"`.
3. **"Hợp Thành Đ..." bị cắt mép phải**: nhãn `getItemTxt` định vị `x=437` trong khung cha `upInfo` rộng 500 — với chữ "Hợp Thành Đạo Cụ" (~150px) thì vượt hẳn ra ngoài khung cha lẫn mép phải màn hình 600. Dời về `x=320` + thêm `width=160, wordWrap, multiline` phòng hờ.

### 31.3. "Luyện Khí" tab "Tinh Luyện" (skin `SkinCasting`) và tab "Tụ Linh" (skin `SkinRefine`) — "Nhận vật phẩm" xuống dòng/bị cắt

Cùng lỗi mẫu `getItemTxt`/`getItemTxt0` width=100 quá hẹp ở CẢ HAI skin riêng biệt (2 tab dùng 2 file skin khác nhau, không dùng chung). Cả hai đều nằm trong khung `upInfo` rộng 560, `horizontalCenter=170` còn dư nhiều margin nên chỉ cần tăng `width` lên `140` + thêm `wordWrap`/`multiline`, không cần đổi vị trí.

### 31.4. "Tiên Cương" (skin `SkinNeiGong`) — "Tiêu hao:" xuống dòng dù còn trống bên trái

Nhãn `cosInfodesc` ("Tiêu hao:") có `width="46"` — quá hẹp so với chữ cần ~85px, gây xuống dòng "Tiêu"/"hao:". Nhãn này nằm trong 1 `Group` dùng `HorizontalLayout` (tự động xếp icon + số liệu bên cạnh theo chiều ngang), nên chỉ cần tăng `width` lên `90` là đủ — `HorizontalLayout` sẽ tự đẩy icon đồng tiền + số liệu bên cạnh dịch sang phải theo, không cần chỉnh toạ độ tay.

Cả 5 mục trên sửa đồng bộ `default.thm.js` + các file `.exml` tương ứng (`hunguSkin.exml`, `castingskin.exml`, `refineskin.exml`, `NeiGongSkin.exml`; riêng phần `main.min.js` của mục 31.2 không có `.exml` tương ứng vì là logic tính toán lúc chạy, không phải giá trị mặc định của skin). Đổi tên `default.thm_7459ab38.js`→`default.thm_7fabbd3e.js` và `main.min_d847a680.js`→`main.min_c1727d76.js` (cache-bust cả 2), cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file, `php -l` qua được, `manifest.json` hợp lệ.

Không đụng tới các chữ Hán còn sót (tiêu đề "龙元"/"诛仙"/"炼器"/"仙罡", icon "龙元觉醒"/"特殊觉醒") vì người dùng không yêu cầu trong lần này — có thể là text hoặc ảnh, chưa xác minh.

Vẫn chưa render trực tiếp kiểm chứng được cho cả 5 mục — cần người dùng xác nhận lại bằng ảnh cho từng màn.

## 32. Tab "Pháp Bảo" (skin `ZhanlingSkin`): checkbox "Tự động mua bằng Nguyên Bảo" đè lên nút "Nâng sao nhanh" (2026-07-07)

Người dùng gửi ảnh (IMG_0601) màn "Pháp Bảo" (Ma Luyện Dung Lô), báo checkbox "Tự động mua bằng Nguyên Bảo" đè trực tiếp lên nút "Nâng sao nhanh", yêu cầu dời checkbox xuống dưới nút và canh giữa.

**Nguyên nhân**: checkbox `checkBoxs` định vị `verticalCenter="0" right="6"` trong khung `dinghong` (cao 75px) — cùng `verticalCenter=0` với `upBtnGroup` (chứa nút "Nâng sao nhanh", `bottom="6"`) nên cả 2 nằm chồng đúng cùng 1 hàng ngang, checkbox lại đủ rộng để lấn vào giữa nơi nút đã canh giữa.

**Đã sửa**: đổi `checkBoxs` từ `verticalCenter=0, right=6` → `horizontalCenter=0, top=76` (nằm dưới đáy nút một chút, canh giữa theo chiều ngang thay vì dán mép phải). Vì skin này có 2 trạng thái riêng (`zl_up` và `skin_up`) cùng include checkbox, và trạng thái `skin_up` có 1 dòng ghi đè `verticalCenter=0` riêng (đã canh giữa lại theo chiều dọc, làm hỏng fix nếu chỉ sửa giá trị mặc định) — phải sửa luôn dòng ghi đè này thành `top=76` để cả 2 trạng thái đều nhất quán.

Sửa đồng bộ `default.thm.js` + `resource/exml/ZhanlingSkin.exml`. Đổi tên `default.thm_7fabbd3e.js`→`default.thm_8cc54429.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua được, `php -l` qua được, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt kiểm tra checkbox có bị đè lên phần tử nào khác nằm phía dưới `dinghong` hay không (vì `top=76` đẩy checkbox ra ngoài rìa dưới của khung `dinghong` cao 75px).

## 33. Dò toàn bộ code sửa văn phong "thứ N ngày mở" → "Ngày N mở" (2026-07-07)

Người dùng gửi ảnh (IMG_0626, màn "Linh Sủng") báo icon khoá hiện "thứ 7ngày hoặc VIP4Mở"/"thứ 8ngày mở" — dịch sát theo cấu trúc tiếng Trung ("第N天开启") nên bị lộn thứ tự, đọc không tự nhiên trong tiếng Việt. Yêu cầu đổi thành "Ngày 7 mở"/"Ngày 8 mở" kiểu văn phong, và dò toàn bộ code (kể cả server) tìm chỗ tương tự để sửa luôn.

**Phạm vi xác định**: chỉ sửa các chỗ dùng đúng thứ tự SAI "thứ N ngày..." (ordinal trước, "ngày" sau) — đây là cấu trúc ngược, không tự nhiên. Các chỗ dùng "ngày thứ N..." (đúng thứ tự, ví dụ "ngày thứ 2 sau khi mở server" trong `ConfigHelpInfo`) đã là văn phong tiếng Việt tự nhiên (như "ngày thứ 2 sau khi sinh"), **không đụng tới**.

**Dò được trong `main.min.js`** (9 chỗ dùng cấu trúc sai "thứ N ngày..."):
1. `openLv.text` (icon "Linh Vật" khoá, đúng chỗ trong ảnh IMG_0626) — 3 nhánh: `"thứ "+day+"ngày hoặc VIP"+vip+"Mở"` / `"thứ "+day+"ngày mở"` / `"VIP"+vip+"Mở"` (thiếu dấu cách) → đổi thành `"Ngày "+day+" hoặc VIP"+vip+" mở"` / `"Ngày "+day+" mở"` / `"VIP"+vip+" mở"` (thêm dấu cách + chữ thường "mở").
2. `openDesc.text` (chỗ tương tự trong popup "Ngọc Phù ExRing" — hệ thống đã sửa ở mục 28/29) — cùng cấu trúc, sửa tương tự.
3. **Phát hiện thêm 1 lỗi nặng hơn**: mảng `timeLanguage=["一","二","三","四","五","六","七"]` trong class hiển thị tab "7 ngày vui vẻ" — **chưa dịch, còn nguyên số Hán tự** (một/二/三...), nghĩa là số ngày hiển thị ra là CHỮ HÁN chứ không phải số! Đổi thành `["1","2","3","4","5","6","7"]`, đồng thời sửa `dayLabel.text="thứ "+...+"ngày"` → `"Ngày "+...`.
4. `day.text="thứ "+data.day+"ngày"` (1 ô lịch nhận thưởng khác) → `"Ngày "+data.day`.
5. Nhãn ngày trong bảng nạp thẻ nhiều ngày (`target+s`): `"thứ "+i+"ngày"+...` → `"Ngày "+i+...`.
6. `dayaward.text` (2 biến thể khác nhau trong 2 class lịch nhận thưởng khác nhau, 1 biến thể còn dính chữ do thiếu cả xuống dòng: `"thứ "+...+"Chi tiết thưởng ngày"` không hề có `\n` phân dòng) → chuẩn hoá cả 2 về cùng 1 dạng `"Ngày "+...+"\nChi tiết thưởng"`.
7. `UserTips.showCenterTips("Hoạt động mở ngày thứ "+day+"ngày mở")` — câu bị lặp "ngày" 2 lần → `"Hoạt động mở vào Ngày "+day`.

**Dò được trong `default.thm.js`** (skin tĩnh, sự kiện "14 ngày liên tiếp"): 13 nhãn cố định `"Ngày thứ 2"` .. `"Ngày thứ 14"` (khác nhóm trên — đã đúng thứ tự "Ngày" trước, nhưng vẫn thừa chữ "thứ" so với phong cách người dùng muốn) → đổi thành `"Ngày 2"` .. `"Ngày 14"`, khớp với nhãn "Ngày đầu tiên" (ngày 1) đã có sẵn không dùng "thứ". Đồng bộ `resource/exml/act14logSkin.exml`.

**Dò phía server (Lua)**: nhờ agent quét toàn bộ `server/bin/s1/gameworld/` (và `s99`) tìm cả 2 dạng — chuỗi nối kiểu `"thứ "..day.."ngày"` và mảng số Hán tự chưa dịch kiểu `timeLanguage` — **không tìm thấy trường hợp nào**. Các chỗ "ngày thứ N" tìm được trong file ngôn ngữ server (`activityname.txt`) đều đúng thứ tự tự nhiên, không cần sửa.

Đổi tên `default.thm_8cc54429.js`→`default.thm_4fb42402.js` và `main.min_c1727d76.js`→`main.min_11a0cbdb.js` (cache-bust cả 2), cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file, `php -l` qua được, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt màn "Linh Sủng" (IMG_0626) và màn sự kiện "7 ngày"/"14 ngày liên tiếp".

## 34. Bảng thông báo (broadcast) server vẫn hiện tên vật phẩm bằng tiếng Trung — "五岳圣腿" (2026-07-07)

Người dùng gửi ảnh (IMG_0628) chỉ ra dòng thông báo cuộn (kiểu "X đã hợp thành công [tên vật phẩm] - cấp 50, lực chiến tăng thêm...") vẫn hiện tên vật phẩm bằng tiếng Trung ("五岳圣腿") dù item đó đã có tên tiếng Việt khi xem trong túi đồ/màn trang bị.

**Nhờ 1 agent dò code server tìm ra nguyên nhân**: khung câu thông báo (`server/bin/s1/gameworld/data/config/notice/notice.config`, mẫu id=5) đã là tiếng Việt hoàn chỉnh, có `%s` để chèn tên vật phẩm vào. Nhưng tên vật phẩm đó KHÔNG lấy từ file `resource/config/config.json` phía client (đã dịch sạch từ trước, mục 8.31) — server có 1 bảng tên vật phẩm HOÀN TOÀN RIÊNG BIỆT: `server/bin/s1/gameworld/data/config/language/lang/item.config` (bảng `LAN.ITEM`, các item trong `data/config/item/item.config` đều tham chiếu `name = LAN.ITEM.n<id>` tới bảng này). Bảng riêng này **chưa từng được dịch** — kiểm tra thấy **3128/3252 dòng vẫn còn chữ Hán** (gần như toàn bộ file, không phải chỉ 1-2 chỗ).

**Đã sửa bằng script tự động**: vì client `ConfigItem` đã dịch xong từ trước và ID vật phẩm khớp 1-1 với khoá `n<id>` trong bảng Lua này, viết script Python đọc từng dòng `n<id> = "chữ Hán"`, tra tên tiếng Việt tương ứng đã có sẵn trong `resource/config/config.json`, thay thế trực tiếp nếu tìm thấy bản dịch sạch (không còn chữ Hán). Kết quả: **dịch thành công 2001/2083 tên vật phẩm** (bao gồm đúng "五岳圣腿"→"Ngũ Nhạc Thánh Cước" như ảnh báo), áp dụng cho cả 2 server `s1` và `s99` (2 file giống hệt nhau).

**Còn lại 82 ID không có bản dịch sẵn ở client để tra** (không tự dịch liều vì không có nguồn đối chiếu đáng tin cậy) — gồm: các ID đặc biệt (0-4: kinh nghiệm/đồng tiền/nguyên bảo/uy vọng/tinh luyện thạch — có thể được xử lý ở nơi khác không qua bảng này), trang bị "Chí Thánh Tiên Binh/Tiên Bào" bậc 7-10, "Nhiệt Huyết Thần Giới" bậc 1-5, series "Thần Khí" (Tài Quyết/Huyết Thí/Thâm Uyên/Đồ Long...), "Chủ Tể" (mặt nạ/vai/gối/dây chuyền...), rương "Linh Dực" bậc 10-19, danh hiệu "Tiên Cung..." (6 loại), vật phẩm sự kiện theo mùa (bánh trung thu, kẹo Halloween...), và 1 nhóm ID `501021-501027` (luân hồi/khai thiên/tạo hóa...). Đã liệt kê đầy đủ nhưng CHƯA dịch — cần người dùng xác nhận nghĩa muốn dùng trước khi mình điền vào bảng Lua này.

**Lưu ý phạm vi**: file `item.config` này còn có 1 bảng riêng cho MÔ TẢ vật phẩm (khoá `d<id>`, ví dụ `d200332`/`d200333`...) — hoàn toàn chưa đụng tới trong lần sửa này (không nằm trong yêu cầu, khối lượng dịch lớn hơn nhiều, cần làm riêng nếu người dùng cần).

Đây là thay đổi DATA server-side thuần (không phải code logic), không cần build/cache-bust như các lần sửa client JS trước — chỉ cần server nạp lại file cấu hình này (thường là restart hoặc GM reload config) để có hiệu lực. Đã kiểm tra bằng `lua -e "loadfile(...)"`: file gốc TRƯỚC khi sửa đã có sẵn 1 lỗi cú pháp ở dòng cuối (`unexpected symbol near <eof>`, không do lần sửa này gây ra — xác nhận bằng cách so sánh với bản gốc qua git, lỗi giống hệt cả về vị trí lẫn nội dung); đối chiếu số lượng dấu ngoặc kép/dấu phẩy/số dòng giữa bản gốc và bản đã sửa hoàn toàn khớp nhau, xác nhận chỉ có nội dung chuỗi thay đổi, không đụng cấu trúc file.

## 35. Sửa hàng loạt lỗi bố cục 4 màn: Linh Sủng, Điểm Danh, Đăng Nhập Thưởng, Đặc Quyền Tháng (2026-07-07)

Người dùng gửi 4 ảnh (IMG_0630-0633) báo một loạt lỗi bố cục/dịch thuật khác nhau trên 4 màn hình:

**IMG_0630 (Linh Sủng)**: mô tả hiện literal `\n` thay vì xuống dòng thật; câu "Ngày thứ 8 thu thập đủ 5 Linh Vật rồi triệu hoán" bị lệch trái mất chữ.

- **Lỗi `\n` literal — phát hiện đây là lỗi HỆ THỐNG, không chỉ riêng 1 chỗ**: file JSON cấu hình dùng double-escape `\\n` (2 dấu gạch chéo ngược + n) trong source thay vì `\n` (1 dấu) — khi `JSON.parse` chạy, `\\n` cho ra chuỗi 2 ký tự `\` + `n` hiển thị y nguyên trên màn hình thay vì ký tự xuống dòng thật. Quét toàn bộ thư mục `resource/` tìm lỗi này, phát hiện và sửa **2534 chỗ** trên 6 file: `config/config.json` (1267), `config1/config0.json` (947), `config1/config2.json` (6), `config1/config4.json` (74), `config1/config5.json` (7), `config1/config6.json` (233). Xác minh lại bằng `json.loads()` sau khi sửa — tất cả hợp lệ. Đây là lỗi ảnh hưởng rất rộng (mô tả vật phẩm, sự kiện...) trên toàn bộ game, không riêng gì màn Linh Sủng.
- **Lỗi lệch trái/mất chữ**: nhãn `openDesc` (skin `ring.exml`, class `SkinRingFlowDisplayer`/`window.ring`) không có `width`/`wordWrap` nên tự giãn theo nội dung — câu dài bị tràn ra ngoài khung `aciveGroup` (rộng 456px). Thêm `width=420, wordWrap=true, multiline=true`, giảm cỡ chữ 26→22 để vừa khung.

**IMG_0631 (Điểm Danh)**: tên vật phẩm trong ô thưởng chồng chéo lên nhau; dòng "Đã tích lũy điểm danh (X/Y) ngày, điểm danh thêm N ngày nhận thưởng" đè lên nút "Nhận thưởng".

- Nhãn `dayReardText` (skin `DailyCheckInPanelSkin.exml`) không có `width`/`wordWrap` → thêm `width=235` (vừa đúng khoảng trống giữa icon thưởng bên trái và nút bên phải), `wordWrap=true`, `multiline=true`.
- Phát hiện thêm lỗi nối chuỗi thiếu dấu cách trong `main.min.js`: `"điểm danh thêm"+n+"ngày|nhận thưởng."` → `"điểm danh thêm "+n+" ngày nhận thưởng."` (thiếu khoảng trắng quanh biến số ngày).

**IMG_0631 + IMG_0632 (tên vật phẩm chồng chéo)**: nguyên nhân gốc chung cho cả 2 màn là component `SkinItem3` (`ItemSkin3.exml`) — dùng chung cho rất nhiều lưới vật phẩm trong game (điểm danh, đăng nhập thưởng...). Nhãn `nameTxt` không có `width` → tự giãn theo độ dài tên, đè lên ô bên cạnh khi tên dài. Sửa: thêm `width=74` (đúng bề rộng ô), giảm cỡ chữ 16→13, thêm `wordWrap=true, multiline=true`, tăng `height` 16→28 và chỉnh `y` 82→78 để chừa chỗ cho 2 dòng — theo đúng kiểu người dùng yêu cầu ("name…" khi quá dài, wrap thay vì tràn). Egret không hỗ trợ truncate-ellipsis dựng sẵn nên dùng wrap 2 dòng thay thế (đã áp dụng thành công kiểu này ở mục 23.1 trước đó).

**IMG_0632 (Đăng Nhập Thưởng)**: dòng "thứ 七Chi tiết thưởng ngày" hiện số Hán tự (七 = 7) thay vì số Ả Rập, câu văn cũng sai thứ tự.

- Gốc rễ: hàm `TextFlowMaker.getCStr(e)` tra cứu `numberList=["零","一","二",...,"二十"]` (mảng số đếm Hán tự CHƯA DỊCH) — dùng chung cho 4 nơi gọi trong code. **3/4 nơi gọi đã dùng đúng văn phong Việt** (`"Ngày "+getCStr(t)+"\nChi tiết thưởng"`, vẫn bị lộ số Hán vì lỗi nằm trong chính hàm `getCStr`), riêng 1 nơi (class `SevenDayLogView`, màn đăng nhập thưởng 14 ngày, skin `SkinAct14log`) còn sai cả cấu trúc câu: `"  thứ "+getCStr(t+1)+"Chi tiết thưởng ngày"` (thiếu `\n`, đảo ngược thứ tự).
- **Sửa `getCStr` tận gốc** (`t.getCStr=function(e){return t.numberList[e]?e+"":""}`) — trả về số Ả Rập thay vì tra bảng số Hán tự, tự động sửa luôn cả 4 nơi gọi cùng lúc (không cần sửa riêng từng chỗ).
- Chuẩn hoá câu văn của `SevenDayLogView` về đúng dạng `"Ngày "+getCStr(t+1)+"\nChi tiết thưởng"` khớp 3 chỗ còn lại.
- Mở rộng khung nhãn `dayaward` (skin `act14logSkin.exml`) từ `width=78, size=18` (1 dòng) → `width=150, size=16, wordWrap=true, multiline=true` (2 dòng) để câu "Ngày N / Chi tiết thưởng" không bị mất nghĩa.

**IMG_0633 (Đặc Quyền Tháng)**: "Thời gian còn lại: 29 ngày" đè lên nút "Đã nhận".

- Class `FranchiseWindow` (skin `SkinSpecialCard`/`SpecialCardSkin.exml`) — nhãn `leftTime` (`verticalCenter=230`) nằm quá gần nút `btn1` (`verticalCenter=283`, không khai báo `width`/`height` cụ thể nên kích thước thực tế theo ảnh nền có thể lớn hơn ước tính, gây đè). Dời `leftTime` xuống dưới nút: `verticalCenter` 230→345, giữ nguyên `horizontalCenter=0` (đã canh giữa sẵn).

Sửa đồng bộ cả `default.thm.js` lẫn `.exml` tương ứng cho mọi thay đổi skin, `main.min.js` cho các thay đổi logic/nối chuỗi. Đổi tên `default.thm_4fb42402.js`→`default.thm_3935788a.js`, `main.min_11a0cbdb.js`→`main.min_875af148.js` (cache-bust cả 2), cập nhật `manifest.json`/`index.php`. `node -c` qua được cho cả 2 file JS, `php -l` qua được, `manifest.json` hợp lệ, cả 6 file JSON hợp lệ qua `json.loads()`.

Vẫn chưa render trực tiếp kiểm chứng được cho cả 5 lỗi trên 4 màn — cần người dùng xác nhận lại bằng ảnh cho từng màn, đặc biệt: (1) độ rộng thực tế khung `openDesc` sau khi thu nhỏ chữ; (2) ô tên vật phẩm `SkinItem3` có đủ chỗ cho tên 2 dòng không bị tràn ra khỏi ô 74px hay không; (3) khoảng cách `leftTime`↔`btn1` ở Đặc Quyền Tháng đã đủ xa chưa vì không xác định được chính xác chiều cao thực tế của nút (skin `SkinBtn1` không khai báo `height` cố định).

## 36. Nguyên tắc bố cục skin — rút ra để tự áp dụng cho các lần sửa sau (2026-07-07)

Theo yêu cầu của người dùng, đúc kết lại các nguyên tắc bố cục (layout) thường gặp qua rất nhiều lần sửa lỗi UI trong phiên làm việc này, để tự đọc lại và áp dụng phán đoán hợp lý cho các skin khác trong tương lai mà không cần chờ người dùng chỉ ra từng lỗi cụ thể.

**1. Không bao giờ để `Label` hiển thị nội dung động (tên vật phẩm, mô tả, số liệu...) mà thiếu `width`.** Đây là nguyên nhân phổ biến nhất gây chồng chéo/tràn chữ trong toàn bộ phiên làm việc này. Nếu nội dung có thể dài (tên vật phẩm dài, mô tả nhiều biến số, số liệu lớn...), luôn khai báo `width` cố định dựa theo khoảng trống thực tế xung quanh (khoảng cách tới phần tử lân cận, không phải đoán chừng).

**2. Chữ dài → wrap xuống dòng (`wordWrap="true" multiline="true"`), không để tràn ra ngoài hay bị cắt.** Egret không có truncate-ellipsis dựng sẵn, nên khi người dùng muốn kiểu "tên…" (ellipsis), giải pháp thay thế tốt nhất là cho phép 2 dòng (tăng `height` tương ứng, giảm `size` một chút nếu ô quá nhỏ) thay vì để chữ tràn ra ngoài ranh giới ô — tràn luôn xấu hơn wrap.

**3. Tận dụng khoảng trống thay vì để lệch/tràn một phía.** Nếu 1 phần tử có khoảng trống lớn ở 1 bên (trái/phải) nhưng lại canh sát mép/tràn sang bên kia, ưu tiên: (a) canh giữa (`horizontalCenter`) nếu là chú thích/nhãn độc lập không cần bám theo phần tử khác, hoặc (b) đặt `width` đúng bằng khoảng trống khả dụng để nội dung tự wrap gọn trong đó.

**4. Không bao giờ để 2 phần tử chồng lên nhau — ưu tiên dời XUỐNG DƯỚI hoặc SANG BÊN, không đè.** Khi 1 nhãn/checkbox/nút đè lên phần tử khác, cách sửa an toàn nhất là dời phần tử đó ra khỏi vùng chiếm dụng của phần tử kia (thường là xuống dưới nếu cùng cột dọc, hoặc sang ngang nếu cùng hàng), rồi canh giữa lại (`horizontalCenter=0` hoặc `verticalCenter` phù hợp) để bố cục gọn gàng — không cố nhồi 2 phần tử vào cùng 1 vị trí bằng cách thu nhỏ.

**5. `Label` dùng `right=N`/`left=N` bên trong 1 `Group` cha KHÔNG khai báo `width` rõ ràng → luôn gây lỗi self-referential layout.** Group cha phải có `width` cố định (không để tự tính theo con) nếu bên trong có phần tử neo theo `right`/`left`.

**6. 2 nhãn anh em (mô tả + giá trị) canh theo `x` cố định (hardcode) sẽ vỡ khi 1 trong 2 dịch dài hơn bản gốc.** Luôn dùng công thức động `attrN.x = descN.width + khoảng_cách` thay vì số cố định, để tự thích ứng khi độ dài chữ tiếng Việt khác tiếng Trung.

**7. Kiểm tra kỹ nối chuỗi (string concatenation) khi dịch — thiếu dấu cách giữa biến số và chữ là lỗi rất hay gặp.** Ví dụ `"thêm"+n+"ngày"` → phải là `"thêm "+n+" ngày"`. Đây là lỗi dễ bỏ sót vì code vẫn chạy đúng, chỉ sai ở khoảng trắng hiển thị.

**8. Nghi ngờ mọi hàm/mảng tra cứu số thứ tự (ordinal lookup) có khả năng còn sót số Hán tự chưa dịch** (đã gặp 3 lần trong phiên: `timeLanguage`, `xqArr`, `TextFlowMaker.numberList`) — nếu thấy 1 nhãn hiện ký tự lạ xen giữa chữ Việt, luôn nghi ngờ đây là bảng tra cứu dùng chung, sửa tại nguồn (hàm/mảng) thay vì sửa riêng từng nơi gọi, để tự động khắc phục mọi nơi khác đang dùng chung hàm đó.

**9. Không đoán mù kích thước thật của các phần tử không khai báo `width`/`height` rõ ràng (ví dụ nút dùng skin nền ảnh không set size cố định)** — khi phải ước lượng khoảng cách an toàn quanh các phần tử này, luôn chừa dư khoảng cách (margin lớn hơn mức tối thiểu tính toán được) và luôn ghi chú rõ trong tài liệu rằng đây là ước lượng chưa xác minh trực quan, cần người dùng xác nhận lại bằng ảnh.

**10. ƯU TIÊN dời vị trí (đổi `x`/`horizontalCenter`/khoảng cách) hơn là giảm cỡ chữ (`size`) khi 2 phần tử chồng lấn.** Theo yêu cầu rõ ràng của người dùng (mục 45-47) — giảm `size` làm chữ nhỏ đi trông không đẹp/không nhất quán với các nhãn khác, trong khi hầu hết các trường hợp chồng lấn đều có thể giải quyết bằng cách dời phần tử (thường là còn dư khoảng trống ở đâu đó chưa tận dụng, như lề trái của khung chứa). Chỉ giảm `size` khi đã xác nhận không còn khoảng trống nào để dời nữa. Khi đo "dời sát mép/chừa lề Npx", phải xác định rõ đang đo theo mép của khung nền HIỂN THỊ (cái người dùng nhìn thấy trên ảnh) chứ không phải mép của Group lập trình chứa phần tử đó — 2 mốc này có thể lệch nhau hàng chục pixel nếu Group có offset riêng (`x`/`y` riêng so với khung nền cha).

## 37. Đổi tên vật phẩm quá dài từ wrap 2 dòng sang truncate 1 dòng kiểu "Tên…" (2026-07-07)

Người dùng gửi ảnh (IMG_0637, màn Điểm Danh) phản hồi lại cách sửa ở mục 35: wrap tên vật phẩm dài xuống 2 dòng (ví dụ "Thám Ngọc Kim Linh" xuống 2 dòng) không phải điều muốn — muốn kiểu cắt ngắn 1 dòng kèm dấu "…" (ví dụ "Thám Ngọc..") giống ảnh mẫu gửi kèm.

**Vấn đề với cách cũ**: Egret không có thuộc tính dựng sẵn kiểu CSS `text-overflow: ellipsis`, nên lần trước dùng `wordWrap+multiline` (2 dòng) làm giải pháp thay thế. Lần này cần tự cài đặt truncate 1 dòng bằng tay.

**Cách làm**: tên vật phẩm được set qua `this.nameTxt.text=...` ở nhiều chỗ trong class `ItemBase` (`main.min.js`) — đây là class DÙNG CHUNG cho mọi ô vật phẩm trong game (không riêng gì màn điểm danh/đăng nhập thưởng), tương ứng đúng với `SkinItem3` đã sửa ở mục 35. Thay vì gán trực tiếp, thêm 1 hàm dùng chung mới `setNameText_a94(t)`:

```js
e.prototype.setNameText_a94 = function (t) {
    var e = this.nameTxt;
    e.text = t;
    var i = e.width;
    if (i > 0 && e.textWidth > i) {
        var s = t;
        while (s.length > 1) {
            s = s.slice(0, -1);
            e.text = s + "..";
            if (e.textWidth <= i) break;
        }
    }
};
```

Cơ chế: gán full text trước, đo `textWidth` thực tế đã render (Egret hỗ trợ đọc `.textWidth` ngay sau khi set `.text`, không cần đợi thêm frame — đã xác nhận cách dùng này có sẵn nhiều chỗ khác trong code). Nếu tràn quá `width` khai báo, cắt dần từng ký tự cuối + luôn gắn ".." vào cuối, đo lại, lặp tới khi vừa khung hoặc chỉ còn 1 ký tự. Chỉ áp dụng khi `nameTxt.width` được khai báo (>0) — những nơi dùng `ItemBase` mà không set `width` cho `nameTxt` (danh sách rộng, không cần cắt) không bị ảnh hưởng, tránh sửa lan sang những màn không liên quan.

Thay 3 chỗ gán trực tiếp `this.nameTxt.text=...` trong `setDataByConfig` (tên vật phẩm thường + tên cấp/chuyển + trường hợp fitleEquip) và 1 chỗ trong `dataChanged` (tên tiền tệ/currency) thành gọi `this.setNameText_a94(...)`. Có 1 chỗ gán `nameTxt.text=AwardsData.getNameOfCurrency(...)` khác nằm trong 1 class riêng biệt (không phải `ItemBase`) — không đụng tới vì không cùng ngữ cảnh/không rõ `nameTxt` của class đó có set `width` hay không.

**Hoàn lại phần sửa mục 35 trên `SkinItem3`** (không cần nữa vì giờ xử lý bằng JS thay vì CSS-wrap): bỏ `wordWrap`/`multiline`, trả `height` 28→16, `y` 78→82 (về nguyên bản 1 dòng); vẫn giữ `width=74` (bắt buộc phải có để `setNameText_a94` biết giới hạn mà cắt) và `size=13` (giữ nguyên cỡ chữ nhỏ hơn bản gốc 16, giúp vừa nhiều ký tự hơn trước khi phải cắt).

Sửa đồng bộ `main.min.js` (logic) + `default.thm.js`/`ItemSkin3.exml` (bỏ wrap). Đổi tên `default.thm_3935788a.js`→`default.thm_9b4ecfbc.js`, `main.min_875af148.js`→`main.min_806bc0b1.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua cho cả 2 file, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt: (1) tên vật phẩm dài có cắt đúng và hiện ".." gọn gàng trong khung 74px hay không; (2) vì hàm `setNameText_a94` áp dụng cho TOÀN BỘ `ItemBase` trong game chứ không riêng 2 màn đã báo lỗi, cần để ý xem có màn nào khác (đã từng có `nameTxt.width` khai báo nhỏ từ trước) giờ bị cắt tên ngoài ý muốn hay không.

## 38. Người dùng gửi lại 2 file JS đã tự tay chỉnh sửa — đọc và đồng bộ vào git (2026-07-07)

Người dùng tải lên 2 file `default.thm_9b4ecfbc.js` và `main.min_806bc0b1.js` (đúng tên 2 file vừa build ở mục 37) đã được tự sửa tay, yêu cầu đọc và cập nhật vào git. Diff bằng `difflib` (so khớp theo token an toàn UTF-8, tránh lỗi `fold` cắt ngang byte đa byte làm vỡ ký tự tiếng Việt) tìm ra toàn bộ thay đổi:

**1. Chuẩn hoá "Thời gian còn lại"**: gộp mọi biến thể `Thời gian còn lại：` (dấu hai chấm full-width), `Thời gian còn lại:` (không có khoảng trắng sau) về cùng 1 dạng `Thời gian còn lại: ` (dấu hai chấm nửa-width + khoảng trắng) — sửa ở ~52 chỗ trong `default.thm.js` và ~9 chỗ trong `main.min.js` (bao gồm cả nhãn `leftTime` ở mục 35's Đặc Quyền Tháng và mọi màn có đếm ngược thời gian khác trong game, không chỉ riêng 1 màn).

**2. Sửa lại đúng lỗi thiếu dấu cách ở dòng "Đã tích lũy điểm danh..."**: phát hiện ra bản sửa ở mục 35 (thêm khoảng trắng quanh biến số ngày trong chuỗi nối) đã **bị mất** — nguyên nhân: trong lúc sửa lỗi `getCStr` (mục 35, phần "thứ 七"), một lần `git checkout --` để hoàn tác lỗi gõ `\n` literal đã vô tình xoá luôn cả bản sửa "thiếu dấu cách" trước đó chưa kịp commit (2 thay đổi khác nhau cùng nằm trong 1 file chưa commit, checkout xoá sạch cả 2). Bản sửa tay của người dùng khôi phục lại đúng: `"...ngày,\nđiểm danh thêm|C:"+a+"&T:"+i+"ngày|nhận thưởng."` → `"...ngày, điểm danh thêm |C:"+a+"&T:"+i+"| ngày nhận thưởng."` (đồng thời bỏ luôn `\n` cứng, để `wordWrap` tự xuống dòng theo `width=235` đã set từ mục 35 — gọn hơn ép xuống dòng cứng).

**Bài học rút ra**: khi dùng `git checkout -- <file>` để hoàn tác 1 lỗi cụ thể trong 1 file có NHIỀU thay đổi chưa commit gộp chung, phải xác minh lại TẤT CẢ các thay đổi trước đó của file đó vẫn còn nguyên sau khi checkout — không chỉ riêng phần vừa sửa lại. An toàn hơn nên `git stash` phần đang làm dở trước khi thử nghiệm 1 đoạn sửa mới có rủi ro, thay vì sửa trực tiếp trên file có sẵn nhiều thay đổi chưa lưu.

Đồng bộ thêm vào 43 file `.exml` khác trong `resource/exml/` có cùng mẫu "Thời gian còn lại" chưa chuẩn hoá (không nằm trong 2 file JS người dùng gửi, nhưng cùng lỗi nên sửa luôn cho nhất quán toàn bộ codebase — theo đúng tinh thần "dò lại toàn bộ code" người dùng hay yêu cầu), và cập nhật `DailyCheckInPanelSkin.exml`'s `dayReardText` bỏ `\n` khớp bản JS mới.

Đổi tên `default.thm_9b4ecfbc.js`→`default.thm_7c50e073.js`, `main.min_806bc0b1.js`→`main.min_1cc6be7e.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua cho cả 2 file, `php -l` qua, `manifest.json` hợp lệ.

## 39. Phát hiện nguyên nhân thật của lỗi "\n" hiển thị literal trên màn Linh Sủng — cache trình duyệt, không phải lỗi code (2026-07-07)

Người dùng gửi ảnh (IMG_0638) cho thấy khung mô tả kỹ năng ("Thu thập đủ 5 Linh Vật có thể dung hợp triệu hoán Linh Thú \nNâng cấp Linh Thú...") **vẫn** hiện `\n` thành chữ thay vì xuống dòng — dù mục 35 đã quét và sửa lỗi double-escape `\\n`→`\n` trong TOÀN BỘ `resource/config/config.json` (bao gồm đúng field `explain` của item này).

**Điều tra lại từ đầu**: kiểm tra byte thô của field `explain` trong `resource/config/config.json` — xác nhận ĐÃ đúng, chỉ có 1 dấu `\` trước `n` (single-escape hợp lệ), không phải lỗi double-escape. Dò tiếp toàn bộ chuỗi xử lý hiển thị (`RingInfoView.countStrDesc_a94` → `TextFlowMaker.generateTextFlow` → `egret.HtmlTextParser`) — không có bug nào có thể biến 1 ký tự xuống dòng thật thành 2 ký tự `\`+`n` hiển thị được. Kết luận: **dữ liệu và code đều đúng — vấn đề nằm ở tầng cache HTTP của trình duyệt**.

**Nguyên nhân thật**: `resource/config/config.json` được nạp qua hệ thống resource của Egret (`RES.getResAsync("config_json")`), tra theo URL khai báo cố định trong `resource/default.res3.json`: `"config/config.json?1546506039"`. Con số `1546506039` là 1 timestamp Unix **từ tháng 1/2019, chưa từng được cập nhật** — khác hẳn với cơ chế cache-bust đang dùng cho `default.thm.js`/`main.min.js` (đổi tên file + đổi `?v=` trong `index.php` mỗi lần build). Vì URL này không đổi qua tất cả các lần sửa `config.json` trong phiên làm việc này (mục 35), trình duyệt của người dùng (đã từng tải trang trước đó) tiếp tục phục vụ bản `config.json` CŨ đã cache sẵn — không bao giờ tải lại bản mới dù server đã có data đúng.

**Đã sửa**: bump query-string version `1546506039`→`1783454123` (timestamp hiện tại) cho URL `config/config.json` trong CẢ 3 file `default.res3.json` (file đang thực sự được nạp bởi `Main.loadResJson()` cho build trình duyệt thường, xác nhận qua đọc code `1==SDkMsg.isWXSmallGame?...res4.json:...res3.json`), `default.res.json` (không có query-string trước đó, thêm luôn), và `default.resPublishReplace.json` (đề phòng dùng ở kênh publish khác). Đồng thời bump luôn `default.res4.json` (7 file `config1/config0-6.json` dùng cho build WeChat mini-game — hiện KHÔNG active cho deployment web này nhưng bump theo để nhất quán, phòng khi kênh đó được bật lại sau này).

**Bài học quan trọng cho các lần sửa `resource/config*.json` sau này**: sửa nội dung file JSON trong `resource/` là CHƯA ĐỦ để deploy — các resource này được nạp qua URL có query-string cache-bust RIÊNG khai báo trong `resource/default.res*.json`, hoàn toàn độc lập với cơ chế cache-bust của `default.thm.js`/`main.min.js` (đổi tên file + `manifest.json` + `index.php`). Từ nay, bất kỳ lần sửa file nào trong `resource/config/`, `resource/config1/` đều PHẢI đi kèm bump query-string tương ứng trong `default.res.json`/`default.res3.json`/`default.res4.json`/`default.resPublishReplace.json`, nếu không thay đổi sẽ không bao giờ tới được người dùng đã từng ghé thăm trang trước đó.

**Sửa thêm theo yêu cầu thứ 2 trong ảnh**: "toàn bộ cụm" (hình phượng hoàng lửa, khung mô tả, cột 6 icon Linh Vật bên phải) bị lệch quá sang phải, còn dư nhiều khoảng trắng bên trái. Cả cụm này đều là con của 1 `Group` cha duy nhất (`width=600 height=800`, đang `horizontalCenter=0`) trong `ring.exml`/class `window.ring` — dời cả cụm cùng lúc bằng cách đổi `horizontalCenter` của group cha này từ `0`→`-100` (ước lượng giữa khoảng 50-150px người dùng đề xuất), thay vì sửa từng phần tử con riêng lẻ (an toàn hơn vì giữ nguyên bố cục tương đối giữa các phần tử con với nhau, chỉ dịch chuyển cả khối). Sửa đồng bộ `ring.exml` (dòng 6) và `default.thm.js` (hàm `_Group7_i` bên trong class `window.ring`, xác định đúng qua biên class vì `_Group7_i` là tên hàm dùng chung, có nhiều bản trùng tên ở các class khác).

Đổi tên `default.thm_7c50e073.js`→`default.thm_26a2ce60.js` (cache-bust, `main.min.js` không đổi lần này nên giữ nguyên `main.min_1cc6be7e.js`), cập nhật `manifest.json`/`index.php`. `node -c` qua, `php -l` qua, tất cả file JSON liên quan (`manifest.json`, `default.res.json`, `default.res3.json`, `default.res4.json`, `default.resPublishReplace.json`) hợp lệ qua `json.load()`.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xoá cache trình duyệt hoặc tải lại bằng tab ẩn danh để xác nhận: (1) khung mô tả đã xuống dòng đúng, không còn hiện `\n`; (2) độ dịch trái `-100px` cho cả cụm đã vừa mắt chưa hay cần chỉnh thêm.

## 40. Revert phần dịch trái ở mục 39 — gây lệch nặng do hiểu sai cơ chế `scrollEnabled` (2026-07-07)

Người dùng gửi ảnh (IMG_0642) cho thấy sau khi dịch cả cụm sang trái `-100px` (mục 39), giao diện bị lệch nặng hơn hẳn: khung mô tả bị CẮT MẤT chữ đầu dòng bên trái ("nh Thú" thay vì "Linh Thú", "ử 8 thu thập" thay vì "Ngày thứ 8 thu thập"...), còn cột 6 icon Linh Vật (vốn dán sát mép phải) lại trôi vào giữa màn hình, đè lên vùng mô tả — tệ hơn hẳn bản gốc.

**Nguyên nhân sai lầm**: Group cha bị dịch (`<e:Group width="600" height="800" ... scrollEnabled="true">`) có `scrollEnabled="true"` — nghĩa là Egret áp 1 khung nhìn (viewport) CỐ ĐỊNH đúng bằng kích thước khai báo (600×800) lên nội dung bên trong, giống 1 cửa sổ cắt cảnh (mask), KHÔNG PHẢI 1 canvas tự do có thể "trượt" cả khối đi mà vẫn hiện đủ nội dung. Đổi `horizontalCenter` của Group này chỉ **xê dịch vị trí neo của nội dung bên trong so với khung nhìn cố định** — phần nào bị đẩy ra ngoài biên khung nhìn (bên trái, do khung mô tả vốn đã neo gần mép trái qua `left=10`) sẽ bị CẮT MẤT hẳn, không phải "trượt ra rồi vẫn thấy được". Đây là góc nhìn sai — không giống các Group thường (không `scrollEnabled`) đã dùng an toàn ở những skin khác trong phiên làm việc này.

**Đã revert hoàn toàn**: trả `horizontalCenter` của Group này về lại `0` (nguyên bản) trong cả `ring.exml` và `default.thm.js` (hàm `_Group7_i` bên trong class `window.ring`).

**Về yêu cầu gốc "dời cả cụm sang trái"**: KHÔNG thử đoán lại lần 2 trong lượt sửa này — vì phép thử vừa rồi đã cho thấy dịch chuyển mù (không nhìn thấy kết quả trực tiếp) trên 1 container có `scrollEnabled` rủi ro cao hơn hẳn so với style/layout thông thường (label, button, image tĩnh). Nếu người dùng vẫn muốn thu hẹp khoảng trống giữa khung mô tả và cột icon, cách an toàn hơn nhiều là dời RIÊNG cột icon (`menuScroller`/`menuList`, đang neo `right="8"`) lại gần khung mô tả hơn (tăng giá trị `right`), thay vì dịch chuyển cả Group cha có viewport cố định — nhưng cần người dùng xác nhận rõ hướng và mức độ trước khi thử tiếp, tránh lặp lại lỗi vừa rồi.

**Về lỗi "\n" vẫn còn hiện trong ảnh IMG_0642**: kiểm tra lại `default.res3.json` — query-string cache-bust `config/config.json?1783454123` từ mục 39 vẫn còn nguyên, chưa bị mất. Khả năng cao người dùng chưa thực sự xoá cache/dùng tab ẩn danh để tải lại như đã dặn ở mục 39 (ảnh IMG_0642 có thể chụp trước khi làm bước đó, hoặc chỉ tải lại thường mà trình duyệt vẫn dùng cache). Chưa có thay đổi thêm nào cho phần này trong lượt sửa này — cần người dùng thử lại đúng cách (xoá cache hẳn / tab ẩn danh) trước khi kết luận cache-bust chưa hiệu quả.

Đổi tên `default.thm_26a2ce60.js`→`default.thm_4be02d83.js` (cache-bust), cập nhật `manifest.json`/`index.php`. `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Cần người dùng xác nhận lại bằng ảnh: (1) bố cục cụm Linh Sủng đã về lại như trước mục 39 (không còn lệch/cắt chữ); (2) sau khi xoá cache/dùng tab ẩn danh, khung mô tả đã hết hiện `\n` chưa.

## 41. PHÁT HIỆN QUAN TRỌNG: lỗi "\n" không phải cache trình duyệt — server live (71.31.97.241) KHÔNG đồng bộ đều các thư mục (2026-07-07)

Người dùng gửi ảnh (IMG_0643) sau khi đã revert mục 40, báo bố cục đã đúng lại nhưng "\n" trong khung mô tả VẪN còn y nguyên dù đã được dặn xoá cache/dùng tab ẩn danh ở mục 39. Nghi ngờ giả thuyết "cache trình duyệt" ở mục 39 có thể sai, đã trực tiếp `curl` vào server live `http://71.31.97.241` (không qua trình duyệt, loại trừ hoàn toàn khả năng cache phía client) để kiểm chứng lại từ đầu.

**Bằng chứng cụ thể** (thời điểm kiểm tra ~20:32 GMT ngày 07/07, đối chiếu với lịch sử commit git):
- `resource/config/config.json` trên server: header `last-modified: Tue, 07 Jul 2026 04:45:23 GMT` — **chưa hề được cập nhật lần nào suốt cả phiên làm việc hôm nay** (mọi commit sửa file này từ mục 35 trở đi, kể cả sau khi đã đổi query-string cache-bust ở mục 39, đều không hề tới được server). Tải trực tiếp file này qua `curl` (bỏ qua trình duyệt hoàn toàn) vẫn cho ra đúng lỗi double-escape `\\n` gốc y hệt trước khi sửa.
- `js/default.thm_4be02d83.js` (bản mới nhất, vừa push ở mục 40 lúc 20:11 GMT): `last-modified: 20:27:13 GMT` — **đã đồng bộ đúng**, chỉ trễ khoảng 16 phút sau khi push.
- `js/main.min_1cc6be7e.js` (đáng lẽ phải có từ mục 38, push lúc 19:50 GMT): **trả về 404 — chưa bao giờ được đồng bộ lên server**, dù đã hơn 40 phút trôi qua và đã có thêm 2 commit sau đó.
- `js/main.min_806bc0b1.js` (bản CŨ hơn, từ mục 37): vẫn còn tồn tại trên server (`last-modified: 19:39:39 GMT`) — nghĩa là `manifest.json` trên server ĐANG trỏ tới bản main.min.js CŨ này thay vì bản mới nhất, trong khi `default.thm.js` cùng lúc lại trỏ đúng bản mới nhất — 2 file trong CÙNG 1 file `manifest.json` bị lệch trạng thái đồng bộ với nhau.

**Kết luận**: hệ thống deploy/đồng bộ từ git repo này lên server live **KHÔNG chạy đồng nhất qua toàn bộ dự án** — có vẻ như `js/` được đồng bộ khá nhanh (trong vòng ~15-40 phút sau khi push) nhưng đôi khi bỏ sót từng file riêng lẻ (`main.min_1cc6be7e.js` bị bỏ sót hoàn toàn dù `default.thm.js` cùng thư mục vẫn đồng bộ đều đặn qua nhiều lượt sau đó), còn `resource/config/` dường như đồng bộ theo lịch RIÊNG, chậm hơn nhiều hoặc đang gặp lỗi — không có lần cập nhật nào suốt hơn 15 tiếng dù nội dung file đã đổi nhiều lần.

**Đây KHÔNG phải lỗi có thể sửa bằng cách thay đổi code trong repo này** — mọi nội dung/logic mình sửa từ mục 35 tới giờ (double-escape `\\n`, các fix bố cục IMG_0630-0633, item name truncate, "Thời gian còn lại"...) đều ĐÚNG và đã nằm sẵn trong git, nhưng phần lớn resource/config CHƯA từng tới được server thật để người dùng thấy. Cơ chế đồng bộ (CI/CD, cron rsync, hay quy trình thủ công nào đó copy từ repo này lên `71.31.97.241`) nằm ngoài phạm vi truy cập của mình trong phiên làm việc này.

**Hành động đề xuất cho người dùng**: cần kiểm tra/liên hệ phía quản lý hạ tầng deploy xem quy trình đồng bộ từ git repo `aionusonlinekenny/zyserver` lên server `71.31.97.241` hoạt động thế nào (chạy tự động theo lịch? theo webhook mỗi lần push? thủ công?), đặc biệt lưu ý: (1) thư mục `resource/config/` có vẻ không được đồng bộ theo cùng lịch với `js/`; (2) từng có ít nhất 1 file JS bị bỏ sót hoàn toàn dù các file khác cùng lượt push vẫn đồng bộ được — có thể do lỗi/timeout khi đồng bộ file lớn, hoặc giới hạn số file mỗi lượt đồng bộ.

## 42. Sau khi hết "\n", lộ ra lỗi bố cục thật của khung mô tả `Explain1` (2026-07-07)

Người dùng gửi ảnh (IMG_0644) xác nhận sau khi server đồng bộ xong (mục 41), lỗi `\n` đã hết — nhưng giờ thấy rõ khung mô tả ("Thu thập đủ 5 Linh Vật có thể dung hợp triệu hoán Linh Thú...") có 1 khoảng trắng thừa bên trái, đoạn chữ không tận dụng hết bề rộng khung.

**Nguyên nhân**: nhãn `Explain1` (skin `ring.exml`) có `width="456"` — TRÙNG với bề rộng khung cha `aciveGroup` (`width="456"`) — nhưng lại đặt thêm `horizontalCenter="90"`, đẩy tâm nhãn lệch phải 90px so với tâm khung cha. Vì nhãn rộng bằng đúng khung cha, việc lệch tâm 90px khiến mép trái nhãn tụt vào trong 90px (bỏ trống 90px bên trái, đúng như ảnh chụp) đồng thời mép phải tràn ra ngoài khung cha 90px (không thấy rõ trong ảnh vì bị các phần tử khác che/cắt). `textAlign="left"` khiến chữ bắt đầu từ mép trái CỦA NHÃN (đã bị đẩy vào trong), không phải mép trái của khung cha — tạo đúng hiệu ứng "còn dư lề trái, chữ không dời qua đó" người dùng mô tả.

**Đã sửa**: đổi `horizontalCenter` của `Explain1` từ `90`→`0` — khi đó nhãn khớp khít đúng khung cha (0 tới 456), chữ bắt đầu ngay từ mép trái thật, không còn dư khoảng trắng, cũng không còn tràn phải.

Sửa đồng bộ `ring.exml` và `default.thm.js` (hàm `Explain1_i` bên trong class `window.ring`). Đổi tên `default.thm_4be02d83.js`→`default.thm_309e37ab.js`, cập nhật `manifest.json`/`index.php`. `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

**Lưu ý về deploy**: dựa trên phát hiện mục 41, lần này CHỈ sửa `default.thm.js`/`ring.exml` (không đụng `resource/config/`) nên nhiều khả năng sẽ đồng bộ nhanh (trong khoảng 15-40 phút) giống các lần sửa `js/` trước đó — nhưng vẫn cần người dùng xác nhận lại bằng ảnh sau khi đợi 1 lúc, vì đã có tiền lệ 1 file JS từng bị bỏ sót hoàn toàn không rõ lý do.

## 43. Người dùng gửi lại 3 file tự sửa tay (main.min.js, default.thm.js, config.json) — đồng bộ vào git (2026-07-07)

Người dùng tải lên 3 file đã tự sửa tay: `main.min_1cc6be7e.js`, `default.thm_4be02d83.js`, `config.json`. Lưu ý: `default.thm_4be02d83.js` là tên file CŨ (trước bản sửa `Explain1` ở mục 42) — nghĩa là người dùng tự sửa dựa trên bản TRƯỚC lượt sửa mới nhất, nên phải diff cẩn thận rồi áp lên bản git hiện tại (mới hơn) thay vì ghi đè trực tiếp, tránh làm mất phần mình đã sửa sau đó.

**So khớp bằng `difflib`/`diff` (an toàn UTF-8):**
- `default.thm_4be02d83.js`: thay đổi DUY NHẤT của người dùng là `Explain1`'s `horizontalCenter` 90→0 — **trùng khớp hoàn toàn** với bản sửa mình đã làm ở mục 42 (bản git hiện tại `default.thm_309e37ab.js` đã có sẵn đúng thay đổi này) → không cần áp gì thêm cho file này.
- `main.min_1cc6be7e.js`: đổi `openDesc.text` từ `"Ngày thứ 8 thu thập đủ 5 Linh Vật rồi triệu hoán"` → `"Ngày 8, thu thập đủ 5 Linh Vật rồi triệu hoán"` (bỏ chữ "thứ" thừa, thêm dấu phẩy) — đã áp trực tiếp vào bản git hiện tại.
- `config.json`: sửa field `explain` của Linh Phượng — đổi các dấu `\n` xuống dòng cứng giữa 4 câu mô tả thành dấu `.` + khoảng trắng, viết liền thành 1 đoạn văn tự nhiên thay vì ép xuống dòng riêng biệt (`"...Linh Thú  \nNâng cấp..."` → `"...Linh Thú. Nâng cấp..."`) — đã áp trực tiếp, xác nhận khớp 100% (md5 giống hệt file người dùng gửi) sau khi sửa.

Đổi tên `main.min_1cc6be7e.js`→`main.min_6f90963a.js` (cache-bust), cập nhật `manifest.json`/`index.php`. Đồng thời bump lại query-string cache-bust cho `config/config.json` (theo đúng bài học mục 41) từ `?1783454123`→`?1783465921` trong cả 3 file `default.res3.json`/`default.res.json`/`default.resPublishReplace.json`. `node -c` qua cho cả 2 file JS, `php -l` qua, tất cả JSON liên quan hợp lệ qua `json.load()`.

## 44. Batch fix 3 màn: Tru Tiên (heirloom), Tu Pháp Tĩnh Thất (Guild Skill), Thành viên Tiên Minh (2026-07-07)

Người dùng gửi 3 ảnh (IMG_0646-0648), báo hàng loạt lỗi bố cục trên 3 màn khác nhau, yêu cầu làm trước những phần rõ ràng có thể sửa, để lại phần phức tạp bàn thêm.

**IMG_0646 (Tru Tiên — skin `heirloom.exml`/`Skinheirloom`):**
- "Hợp Thành Đạo Cụ" (`getItemTxt`) đè lên nút "Kích hoạt" (`jihuo`, `horizontalCenter=0` trong khung rộng 500) — nhãn trước đó neo tại `x=320` quá gần biên phải ước lượng của nút. Dời `x` 320→350, giảm `width` 160→150 để không tràn ra ngoài khung.
- "một phần lớn thông tin bị dạt qua bên phải" — khối 7 cặp desc/attr (Công kích, Vật Kháng, Bạo Kích, Sinh Lực, Kháng phép, Cương Khí...) dùng `TileLayout requestedColumnCount=2` trong khung chỉ rộng `413.33`, `horizontalGap=43` quá lớn khiến cột phải (Sinh Lực/Kháng phép/Cương Khí) bị đẩy ra ngoài rìa màn 600px, mất chữ. Mở rộng khung `413.33`→`560`, `horizontalCenter` `-0.5`→`0` (canh giữa đúng màn 600px), giảm `horizontalGap` 43→0 để cột phải có thêm chỗ.

**IMG_0647 (Tu Pháp Tĩnh Thất — skin `GuildSkillWinSkin.exml`/`SkinGuildSkillWin` + `GuildSkillSkin.exml`/`SkinGuildSkill`):**
- "Tiêu hao nâng cấp:"/"Cống hiến còn lại:" (2 nhãn tĩnh dài ~17-18 ký tự, không giới hạn `width`) đè lên icon + giá trị đứng ngay sau (icon tại `horizontalCenter=-109.5`, giá trị tại `x=163`/`x=162.5`) — với size=20, nhãn dài cỡ này thực tế render rộng hơn 163px nên đè lên cả icon lẫn giá trị. Dời icon (`horizontalCenter` -109.5→-30) và giá trị (`x` 163/162.5→220) sang phải, chừa đủ chỗ cho nhãn.
- "Các nút bấm bên dưới cần thu gọn" — 2 tab "Tu Pháp Tĩnh Thất"/"Xây Dựng Tiên Sơn" (tên tab lấy từ thuộc tính `name` của từng trang trong `viewStack`, hiển thị qua `TabBar` dùng skin `SkinBtnTab0` — nút cỡ cố định ~110-120px, nhãn không giới hạn `width`) — bản dịch tiếng Việt dài hơn nhiều so với bản gốc tiếng Trung ("修法静室"/"仙山建设", chỉ 4 chữ) khiến 2 tab tràn chồng lên nhau (layout dùng `gap=-8`, vốn đã thiết kế sát nhau). Không sửa skin `SkinBtnTab0` dùng chung (hơn 30 màn khác đang dùng, rủi ro cao) — thay vào đó RÚT NGẮN tên hiển thị: "Tu Pháp Tĩnh Thất"→"Tĩnh Thất", "Xây Dựng Tiên Sơn"→"Tiên Sơn", đủ ngắn để vừa nút mà vẫn giữ được ý nghĩa.

**IMG_0648 (Thành viên Tiên Minh — skin `GuildInfoSkin.exml`/`SkinGuildInfo` + `MemberItemSkin.exml`/`SkinMemberItem`):** người dùng báo "cần làm nhiều lắm", đã khảo sát và CHỈ sửa phần chắc chắn xác định được nguyên nhân:
- Cột "Chức vụ" trong bảng thành viên bị vỡ dòng giữa từ ("Minh Ch" / "ủ") — nhãn `office` chỉ rộng `80px` dù còn dư tới ~140px trong cột trước khi chạm cột kế tiếp. Mở rộng `width` 80→130, dịch `x` 53→30 (canh giữa lại trong khoảng rộng hơn).
- **Chưa sửa** (cần xem lại kỹ hơn, không đủ chắc chắn để đoán mù): icon chồng lên "Ngân quỹ:"/"Số người:" trong khung "Thông tin Tiên Minh", và icon chồng lên "Cống hiến của tôi:" — trong `GuildInfoSkin.exml` không tìm thấy phần tử Image nào được đặt đè lên các nhãn này một cách rõ ràng (2 `Image source="tongyongdian2"` gần đó đều đã `visible="false"`), nên nghi ngờ đây có thể là hiệu ứng đồ hoạ trang trí của khung nền chứ không phải lỗi chồng lấp phần tử — cần ảnh chụp cận cảnh hơn hoặc xác nhận lại từ người dùng trước khi đoán tiếp.

Sửa đồng bộ `.exml` + `default.thm.js` cho cả 3 skin. Đổi tên `default.thm_309e37ab.js`→`default.thm_61090b9d.js` (cache-bust, `main.min.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh cho cả 3 màn, đặc biệt: (1) khung "Tiêu hao nâng cấp"/"Cống hiến còn lại" ở IMG_0647 dời sang phải bao nhiêu là đủ (ước lượng theo độ dài chữ, chưa đo chính xác); (2) 2 tên tab rút gọn có còn đủ rõ nghĩa không; (3) độ rộng cột "Chức vụ" mới đã đủ cho các chức vụ dài hơn "Minh Chủ" (như "Phó Minh Chủ") hay chưa.

## 45. Sửa sai hướng ở mục 44 — hiểu nhầm bản chất "ô đen", revert và sửa lại đúng cách (2026-07-08)

Người dùng gửi ảnh xác nhận cách sửa mục 44 cho "Tiêu hao nâng cấp:"/"Cống hiến còn lại:" là SAI hướng — bảo revert lại như ảnh gốc rồi hướng dẫn lại: "Tiêu hao nâng cấp: dời qua trái trước cái ô đen là được".

**Hiểu sai ban đầu**: mục 44 đoán rằng icon `szbanggong` chỉ là icon nhỏ, nên dời icon+giá trị SANG PHẢI để tránh đè lên nhãn. Nhưng thực tế `szbanggong` (đã `scaleX/scaleY=1.4`) là 1 khối NỀN DẠNG VIÊN THUỐC (pill) khá RỘNG, không phải icon nhỏ — dời nó sang phải chỉ khiến khối nền này che mất luôn phần SỐ (`praCost`/`praCon`) đứng sau, vì thứ tự render trong exml đặt `Image` (nền) sau `Label` (số) nên nền vẽ ĐÈ LÊN số — càng sửa càng sai.

**Đã revert** toàn bộ vị trí `praCon`/`praCost`/`praCost0` và 2 `Image szbanggong` về đúng y hệt bản gốc (trước mục 44): `praCon.x` 220→162.5, `praCost.x` 220→163, icon `horizontalCenter` -30→-109.5 (2 chỗ).

**Sửa lại đúng theo hướng dẫn mới**: thay vì dời khối nền, THU NHỎ 2 nhãn tĩnh "Tiêu hao nâng cấp:"/"Cống hiến còn lại:" (dài ~18 ký tự, trước đó `size=20` không đặt `width` nên tràn quá xa sang phải, lấn cả vào vùng khối nền lẫn số) — giảm `size` 20→13 cho cả 2 nhãn, để nhãn kết thúc TRƯỚC khi chạm khối nền (thay vì dời khối nền ra xa nhãn như mục 44 làm sai).

Sửa đồng bộ `GuildSkillWinSkin.exml` + `default.thm.js`. Đổi tên `default.thm_61090b9d.js`→`default.thm_c2871533.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

**Bài học**: trước khi dời 1 phần tử để giải quyết chồng lấp, cần xác định rõ ràng phần tử nào là "thủ phạm" thực sự lấn sang phần tử kia — không nên mặc định phần tử có tên "icon" là nhỏ; cần kiểm tra `scaleX`/`scaleY` và thứ tự render (z-order) trong danh sách `elementsContent`, vì phần tử render sau sẽ vẽ đè lên phần tử render trước dù toạ độ không đổi.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh xem cỡ chữ `size=13` đã đủ nhỏ để nhãn nằm gọn trước khối nền chưa, hay cần thu nhỏ thêm/không cần thiết vì hình phần còn lại của yêu cầu ("sau đó làm như mình nói") vẫn đang chờ hướng dẫn tiếp theo từ người dùng.

## 46. Đổi cách sửa mục 45 theo yêu cầu người dùng — giữ nguyên cỡ chữ, chỉ dời sát lề (2026-07-08)

Bản sửa mục 45 (giảm `size` 20→13) đã hoạt động đúng (không còn chồng lấp, xác nhận qua ảnh IMG_0651), nhưng người dùng phản hồi thích cách khác hơn: giữ nguyên cỡ chữ gốc, chỉ cần dời nhãn "Tiêu hao nâng cấp:"/"Cống hiến còn lại:" sát về mép trái (chừa lề ~4px) vẫn đủ chỗ.

**Đã đổi lại** theo đúng yêu cầu: trả `size` 13→20 (nguyên bản), đổi `x` của cả 2 nhãn về `4` (từ `13.31`/`12.67`) — giữ chữ to như cũ, chỉ tận dụng thêm ~9-13px lề trái còn dư.

Sửa đồng bộ `GuildSkillWinSkin.exml` + `default.thm.js`. Đổi tên `default.thm_c2871533.js`→`default.thm_ae5ff6d4.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Đây là thay đổi theo yêu cầu trực tiếp của người dùng (không phải suy luận của mình) — vẫn cần xác nhận lại bằng ảnh xem chữ cỡ 20 tại `x=4` có thực sự đủ chỗ trước khối nền hay không, vì theo ước lượng độ rộng chữ ở size 20 (mục 44/45) có thể vẫn hơi sát/tràn nhẹ.

## 47. Mục 46 vẫn còn dư lề trái — do đo nhầm mốc "mép trái" (2026-07-08)

Người dùng gửi ảnh (IMG_0652) chỉ ra sau khi sửa mục 46 (`x=4`), 2 nhãn vẫn còn khoảng trắng khá rộng phía bên trái, hỏi sao không dời tiếp qua được.

**Nguyên nhân**: `x=4` ở mục 46 là toạ độ CỤC BỘ tính từ gốc của `praGroup` (`x="60"` so với khung 600px bên ngoài) — không phải từ mép trái THẬT SỰ của khung nền (panel `dinghong`, ảnh nền rộng `580px` canh giữa trong khung `600px` → mép trong thực tế nằm ở toạ độ `10` trong hệ ngoài). Vì `praGroup` đã tự lùi vào `60px` so với mép khung nền, `x=4` cục bộ thực chất tương ứng toạ độ `64` trong hệ ngoài — cách mép khung nền thật những **54px**, đúng là khoảng trắng người dùng thấy.

**Đã tính lại và sửa đúng mốc**: mép trong khung nền ở toạ độ ngoài `10` → quy đổi về hệ cục bộ của `praGroup` là `10 - 60 = -50`. Đặt `x=-46` cho cả 2 nhãn (chừa đúng ~4px từ mép khung nền thật, đúng tinh thần yêu cầu ban đầu ở mục 46). Nhờ dời thêm ra xa khỏi khối nền `szbanggong` (vẫn cố định ở toạ độ cục bộ `131`), khoảng cách từ nhãn tới khối nền cũng tăng từ `127px`→`177px`, tiện thể giải quôn luôn phần "Cống hiến còn lại:" từng hơi sát khối nền ở ảnh trước.

Sửa đồng bộ `GuildSkillWinSkin.exml` + `default.thm.js`. Đổi tên `default.thm_ae5ff6d4.js`→`default.thm_9d93189e.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

**Bài học**: khi người dùng yêu cầu "dời sát mép/chừa lề Npx", cần xác định rõ đang đo theo mép của KHUNG NỀN HIỂN THỊ (thứ người dùng nhìn thấy) hay mép của GROUP CHỨA phần tử đó (toạ độ lập trình) — 2 mốc này có thể lệch nhau hàng chục pixel nếu group có offset riêng, như trường hợp `praGroup.x=60` ở đây.

## 48. Icon "!" lệch xuống dòng 2 ở skin Xây Dựng Tiên Sơn (`GuildCampFireSkin.exml`) (2026-07-08)

Người dùng xác nhận mục 47 đẹp rồi (**chốt nguyên tắc: ưu tiên dời vị trí hơn giảm cỡ chữ khi sửa chồng lấn** — đã ghi thành mục 10 trong phần "Nguyên tắc bố cục" mục 36), rồi chuyển qua màn "Xây Dựng Tiên Sơn" (skin `GuildCampFireSkin.exml`/`SkinGuildCampFire`). Icon "!" (`point1`/`point2`, ảnh `gantanhao3`) đang hiện lạc chỗ — thay vì nằm ngay đầu dòng 1 của đoạn mô tả, nó lại nằm ngay đầu dòng 2 (dòng bị xuống dòng do dịch tiếng Việt dài hơn nguyên bản).

**Nguyên nhân**: `desc1`/`desc2` (nhãn mô tả, `width=495 size=20`) neo bằng `bottom` — khi chữ tràn quá 1 dòng (do bản dịch tiếng Việt dài hơn nhiều so với text gốc), nhãn tự phát triển chiều cao MỞ RỘNG LÊN TRÊN (vì đáy neo cố định, đỉnh trồi lên khi có thêm dòng). Icon `point1`/`point2` cũng neo bằng `bottom` NHƯNG với giá trị cố định được tính cho trường hợp text 1 DÒNG — nên khi text co giãn thành 2 dòng, icon (không đổi vị trí) chỉ còn thẳng hàng với dòng CUỐI (dòng 2) thay vì dòng đầu.

**Đã sửa**: tăng `bottom` của `point1`/`point2` thêm ~1 chiều cao dòng (size 20, ước lượng line-height ≈24px): `point1` 206→230, `point2` 171→195 — đẩy icon lên cao hơn, thẳng hàng với dòng đầu tiên của đoạn text thay vì dòng 2.

**Lưu ý về độ chắc chắn của fix này**: đây là fix TĨNH (hardcode dựa trên giả định text luôn tràn đúng 2 dòng) — không phải fix động theo `textHeight` thực tế đo được sau khi word-wrap (khác với kiểu fix ở mục 37 dùng `.textWidth` đo runtime). Nếu nội dung `desc1`/`desc2` thay đổi độ dài (dữ liệu server khác) khiến số dòng thực tế không phải luôn là 2, icon có thể lại lệch. Không có thời gian implement fix động trong lượt này; ghi chú lại để cân nhắc nếu lỗi tái diễn ở ngữ cảnh dữ liệu khác.

Sửa đồng bộ `GuildCampFireSkin.exml` + `default.thm.js`. Đổi tên `default.thm_9d93189e.js`→`default.thm_cf63bd7c.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh xem icon đã thẳng hàng đúng dòng đầu chưa, và cả 2 icon (dòng "Mỗi lần dùng..."/dòng "Dùng thêm...") đều đúng.

## 49. Mở rộng khung mô tả thay vì để tràn 2 dòng — dùng đúng lề trái còn dư (2026-07-08)

Người dùng xác nhận ảnh mục 48 icon đã thẳng hàng đúng dòng 1, nhưng muốn giải quyết tận gốc: thay vì để chữ tràn xuống dòng 2 (dù đã canh icon đúng), muốn MỞ RỘNG khung `desc1`/`desc2` sang bên trái (khoảng trống chưa dùng tới, trước icon "!") để câu đủ chỗ nằm gọn 1 dòng luôn — đúng tinh thần nguyên tắc mục 10 (ưu tiên dời/mở rộng hơn đổi cỡ chữ).

**Đã sửa**: nhận thấy `point1`/`point2` (icon) đang neo `x≈82`, còn màn hình rộng 600px — dư khoảng 82px lề trái chưa dùng. Dời icon `x` 82→10 (chừa lề nhỏ 10px), dời `desc1`/`desc2` `x` tương ứng theo (giữ nguyên khoảng cách icon↔chữ ~17-18px): 99.36→27, 100→28. Mở rộng `width` 495→567 (+72px, bù đúng phần đã dời trái, giữ nguyên mép phải không đổi so với trước). Đồng thời trả `bottom` của 2 icon về lại đúng bằng `bottom` của `desc1`/`desc2` (208/172 — bỏ phần offset +24 thêm ở mục 48, vì giờ text dự kiến gọn 1 dòng, không cần bù trồi lên nữa).

Sửa đồng bộ `GuildCampFireSkin.exml` + `default.thm.js`. Đổi tên `default.thm_cf63bd7c.js`→`default.thm_9a114d1c.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận: (1) câu mô tả đã gọn 1 dòng chưa (nếu vẫn tràn nhẹ, có thể cần mở thêm vài chục px nữa hoặc chấp nhận tràn nhẹ có icon canh đúng như mục 48); (2) icon có canh đúng lại theo `bottom` mới sau khi bỏ offset hay không.

## 50. Bỏ chữ "thêm" thừa trong 2 câu mô tả Xây Dựng Tiên Sơn (2026-07-08)

Người dùng yêu cầu bỏ chữ "thêm" ở cụm "tăng thêm N" trong cả 2 dòng mô tả (không đụng tới "Dùng thêm N Linh Ngọc Hồ Lô" ở đầu dòng 2, chỉ bỏ "thêm" đứng sau "tăng"): "Mỗi lần dùng 1 Linh Ngọc Hồ Lô tăng thêm 30 điểm..." → "...tăng 30 điểm...", "...có thể tăng thêm 6000 quỹ..." → "...có thể tăng 6000 quỹ...".

**Đã sửa trong `main.min.js`** (text set động qua `TextFlowMaker.generateTextFlow1`, không nằm trong exml): tìm thấy 4 chỗ "tăng thêm" thuộc đúng class `GuildFirePanelView` (2 bản `desc1` giống hệt nhau dùng cho 2 nhánh if/else, 2 bản `desc2` — 1 cho trạng thái bình thường, 1 cho trạng thái "đã đạt tối đa" ngày mai — cả 2 đều có cùng mẫu "có thể tăng thêm N quỹ" nên sửa luôn cả 2 cho nhất quán dù người dùng chỉ thấy 1 trong 2 trên ảnh). File có tổng cộng 10 chỗ chứa "tăng thêm" nhưng CHỈ sửa đúng 4 chỗ thuộc màn này, không đụng 6 chỗ còn lại ở màn khác.

Đổi tên `main.min_6f90963a.js`→`main.min_c45745a3.js` (cache-bust, `default.thm.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

## 51. Sửa 4 lỗi bố cục màn "Thành viên Tiên Minh" (`GuildInfoSkin.exml`) (2026-07-08)

Người dùng gửi ảnh (IMG_0662) chỉ ra chi tiết 4 lỗi trên màn Tiên Minh (guild info), mô tả rất rõ từng phần cần sửa:

1. **"Thông tin Tiên Minh"** (tiêu đề khung xanh) không canh giữa nền lá cờ — trước đó dùng `x="58"` cố định (không tính theo độ dài chữ thực tế). Đổi sang `horizontalCenter="0"` để Egret tự canh giữa đúng theo khung cha `infoGroup` (width=207), không cần đoán độ rộng chữ.
2. **"Thông báo Tiên Minh"** (tiêu đề khung thông báo) đè lên icon sửa thông báo (`cityBtn`, tại `x=447`) — chữ "Tiên" đang che icon. Dời nhãn từ `x=351`→`x=200` (dịch trái ~151px) để toàn bộ cụm "Thông báo Tiên Minh" nằm gọn trước icon, không đè lên.
3. **"Cống hiến tích lũy"** (tiêu đề cột trong bảng thành viên) lệch trái, đè lên biên giữa cột "Chức vụ" và cột điểm — trước đó neo `right="60"` (chỉ tính từ mép phải toàn hàng, không tính đúng theo cột dữ liệu thực tế bên dưới, vốn nằm ở `x=401` width=`200` theo `MemberItemSkin.exml`). Đổi sang `horizontalCenter="201"` — tính đúng tâm của cột dữ liệu (401 đến 601) quy về hệ toạ độ canh giữa của hàng tiêu đề (width 600).
4. **"Cống hiến của tôi："** (label cuối màn) đè lên icon `szbanggong` + giá trị `myCon` (số 3771) — cùng mẫu lỗi với mục 45 (icon/giá trị đặt quá gần nhãn dài). Theo đúng nguyên tắc mục 10 (ưu tiên dời phần tử, không đổi cỡ chữ), dời icon `x` 149→220 và `myCon.x` 188→260 (dời sang phải, giữ khoảng cách icon↔giá trị ~40px như cũ).

Sửa đồng bộ `GuildInfoSkin.exml` + `default.thm.js` (4 hàm `_Label2_i`, `_Label5_i`, `_Label7_i`, `myCon_i`/`_Label11_i`/`_Image11_i`). Đổi tên `default.thm_9a114d1c.js`→`default.thm_e6e4f8e1.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh cho cả 4 điểm, đặc biệt điểm 2 (khoảng cách ước lượng 151px dời trái cho "Thông báo Tiên Minh" dựa trên ước lượng độ rộng chữ ở size 22, chưa đo chính xác) và điểm 4 (khoảng dời 71px cho icon/giá trị cống hiến, cũng là ước lượng).

## 52. Tinh chỉnh tiếp màn "Thành viên Tiên Minh" theo ảnh xác nhận mục 51 (2026-07-08)

Người dùng xác nhận mục 51 đã đúng hướng (chồng chéo hết, "Cống hiến tích lũy"/"Cống hiến của tôi" đã đẹp), gửi thêm ảnh cận cảnh (IMG_0663) chỉ ra các điểm cần tinh chỉnh thêm:

1. **"Thông báo Tiên Minh"** dời thêm qua phải 10px (từ mục 51's `x=200` → `x=210`) — chỉnh nhẹ theo yêu cầu trực tiếp.
2. **"Xem đơn xin gia nhập"** (link trong khung "Thông tin Tiên Minh") cũng canh giữa lá cờ giống tiêu đề — đổi từ `x="64"` cố định sang `horizontalCenter="0"`.
3. **"Ngân quỹ:"/"Số người:"** đè lên giá trị số theo sau (`guildMoney`/`guildMember`) — 2 nhãn này dài 9 ký tự (dài hơn "Cấp độ:" 7 ký tự, vốn không bị lỗi vì đủ chỗ trong khoảng cách gốc `x=76`) nên tràn quá khoảng cách 60px gốc. Theo đúng nguyên tắc mục 10, dời giá trị `guildMoney`/`guildMember` từ `x=76`/`x=76.29` → `x=100` (thêm 24px, chừa đủ chỗ cho 2 ký tự dư so với "Cấp độ:").
4. **"Tên nhân vật"** (tiêu đề cột trong bảng thành viên) chưa canh giữa cột — trước đó neo `left="72"` (không tính theo cột dữ liệu thực tế). Cột dữ liệu tương ứng (`nameLab` trong `MemberItemSkin.exml`) nằm ở `x=1` width=`207`. Đổi sang `horizontalCenter="-195.5"` (tính tâm cột 1-208 quy về hệ toạ độ canh giữa hàng tiêu đề width 600) — theo đúng cách đã làm cho "Cống hiến tích lũy" ở mục 51.

Sửa đồng bộ `GuildInfoSkin.exml` + `default.thm.js`. Đổi tên `default.thm_e6e4f8e1.js`→`default.thm_3112c4b8.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt mục 3 (khoảng dời 24px cho "Ngân quỹ"/"Số người" là ước lượng theo chênh lệch độ dài chữ so với "Cấp độ:", chưa đo chính xác — nếu vẫn còn chồng nhẹ có thể cần dời thêm).

## 53. Bố cục lại khu vực "Nâng cấp" trên các thẻ công trình Tiên Minh (`GuildManageItemSkin.exml`) (2026-07-08)

Người dùng xác nhận màn Tiên Minh (mục 51-52) đã ổn, chuyển qua màn "Công trình Tiên Minh" (danh sách 3 thẻ công trình: Tiên Minh Đại Điện, Tu Pháp Tĩnh Thất, Tiên Minh Trú Địa — skin `GuildManageItemSkin.exml`/`SkinGuildManageItem`, dùng chung cho cả 3 thẻ). Yêu cầu: (1) thu nhỏ nút "Nâng cấp"; (2) nhích nút lên trên một chút; (3) dời chữ "Cần ngân quỹ:xxx" xuống dưới nút thay vì bên trái; (4) đổi "Yêu cầu nâng cấp:" thành "Yêu cầu:".

**Đã sửa**:
- Nút `upBtn`: giảm `scaleX`/`scaleY` 0.8→0.65 (thu nhỏ ~19%), dời `y` 62.01→50 (nhích lên ~12px). Giữ nguyên `right=87` (mép phải không đổi, thu nhỏ tự nhiên "ăn" về phía trái, không cần tính lại vị trí ngang).
- Group chứa "Cần ngân quỹ:"/`needMoney` (dùng `HorizontalLayout`): đổi từ neo `right="210"` (bên trái nút, `horizontalAlign="right"`) sang `horizontalCenter="174.5"` (tính theo tâm nút sau khi thu nhỏ+dời) + `y="61"→"84"` (xuống dưới đáy nút mới) + `horizontalAlign="center"` (căn giữa cặp nhãn+giá trị dưới nút thay vì canh phải).
- `upLevelLab`: đổi text "Yêu cầu nâng cấp：..." → "Yêu cầu：...". Chuỗi này còn được set ĐỘNG trong `main.min.js` (`GuildBuildBaseItemRender.dataChanged`) với nội dung thực tế "Yêu cầu nâng cấp: Tiên Minh Đại Điện đạt Ncấp" — sửa luôn ở đây (chỗ DUY NHẤT chứa chuỗi này trong toàn file) để khớp với bản exml.

Sửa đồng bộ `GuildManageItemSkin.exml` + `default.thm.js` + `main.min.js`. Đổi tên `default.thm_3112c4b8.js`→`default.thm_8d8d3ec2.js`, `main.min_c45745a3.js`→`main.min_0cdf96eb.js` (cache-bust cả 2). `node -c` qua cho cả 2 file, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh cho cả 3 thẻ công trình (vị trí nút mới, vị trí "Cần ngân quỹ" dưới nút có canh giữa đẹp không, chữ "Yêu cầu:" đã đúng ý).

## 54. Sửa vỡ dòng giữa từ + chồng chéo trên popup "Quyên góp Tiên Minh" (`GuildConSkin.exml`) (2026-07-08)

Người dùng xác nhận mục 53 ổn, chuyển qua popup "Quyên góp Tiên Minh" (donate). Báo: tiêu đề "Quyên góp1000Nguyên Bảo" xuống dòng ngay giữa từ ("Nguyê" / "n Bảo"), và dòng "Cống hiến +1000 / Quỹ +1000" bên dưới bị dòng tiêu đề (khi tràn 2 dòng) đè lên.

**Tìm ra gốc rễ thật của lỗi vỡ dòng giữa từ**: không phải do khung quá hẹp đơn thuần, mà do lỗi nối chuỗi THIẾU DẤU CÁCH trong `main.min.js` (class `GuildConWindow.initUI`) — đúng mẫu lỗi đã gặp nhiều lần trong phiên này (nguyên tắc 7 trong style guide): `"Quyên góp"+count+"Nguyên Bảo"` (không có khoảng trắng quanh biến số) khiến toàn bộ cụm "góp1000Nguyên" dính liền thành 1 "từ" không có chỗ ngắt dòng tự nhiên, trình engine buộc phải ngắt CỨNG giữa từ. Sửa thành `"Quyên góp "+count+" Nguyên Bảo"` (thêm khoảng trắng 2 bên) — tương tự cho dòng "Đồng Tiền". Sau khi có khoảng trắng, dù vẫn tràn 2 dòng (do câu vẫn dài hơn khung 201px ở size 22) nhưng sẽ ngắt đúng theo ranh giới từ, không còn vỡ giữa từ nữa.

**Sửa chồng chéo với "Cống hiến +.../Quỹ +..."**: nhãn `info0`/`info1` (dòng "Cống hiến +N / Quỹ +N") đặt `y=222`, trong khi tiêu đề `desc0`/`desc1` phía trên bắt đầu ở `y=191` và cao tới ~2 dòng (~53px ở size 22) → tràn xuống tới `y≈244`, đè lên `info0`/`info1`. Dời `info0`/`info1` xuống `y=255` (thêm ~11px đệm sau khi tiêu đề tràn 2 dòng).

Sửa đồng bộ `GuildConSkin.exml` + `default.thm.js` (`info0_i`/`info1_i`) + `main.min.js` (`GuildConWindow.initUI`). Đổi tên `default.thm_8d8d3ec2.js`→`default.thm_c601a67a.js`, `main.min_0cdf96eb.js`→`main.min_2b15442a.js` (cache-bust cả 2). `node -c` qua cho cả 2 file, `php -l` qua, `manifest.json` hợp lệ.

Áp dụng tương tự cho cả 2 bên (Nguyên Bảo và Đồng Tiền) theo đúng yêu cầu "tương tự cho bên cạnh". Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh xem tiêu đề đã ngắt dòng đẹp (không vỡ giữa từ) và "Cống hiến/Quỹ" đã tránh chồng lấn hoàn toàn chưa.

## 55. Sửa ô nhập "Chiến lực" đè lên nhãn + rút gọn "Tự động chấp nhận gia nhập" (`MemberApplySkin.exml`) (2026-07-08)

Người dùng xác nhận mục 54 ổn, chuyển qua popup "Danh sách đơn xin" (member apply list). Yêu cầu: (1) ô nhập số "chiến lực" đang đè lên nhãn "Chiến lực lớn hơn" phía trước, cần dời qua phải; (2) rút ngắn nhãn "Tự động chấp nhận gia nhập" — bỏ "gia nhập" ở cuối.

**Đã sửa**:
- Ô nhập (`Image` nền `shuzibg` + `TextInput` + `EditableText attrNum`, cả 3 đi cùng bộ) dời `horizontalCenter` từ `-56.5`→`-20` (dịch phải ~36.5px) để không đè lên nhãn "Chiến lực lớn hơn" phía trước.
- Nhãn `_Label2_i`: bỏ "gia nhập" — "Tự động chấp nhận gia nhập" → "Tự động chấp nhận". Không có bản set động trong `main.min.js` (xác nhận qua `grep`), text hoàn toàn tĩnh trong skin.

Sửa đồng bộ `MemberApplySkin.exml` + `default.thm.js`. Đổi tên `default.thm_c601a67a.js`→`default.thm_4ed81ceb.js` (cache-bust, `main.min.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh, đặc biệt khoảng dời 36.5px cho ô nhập là ước lượng (chưa đo chính xác độ dài chữ "Chiến lực lớn hơn" ở size 20) — có thể cần dời thêm nếu vẫn còn sát/chồng nhẹ, và cũng cần kiểm tra ô nhập sau khi dời có đè lên nhãn "Tự động chấp nhận" (đã rút ngắn) hay không.

## 56. Tăng giới hạn ký tự đặt tên Tiên Minh từ 6 lên 20 (`GuildBuildSkin.exml`, `guildNameChange.exml`) (2026-07-08)

Người dùng phản ánh việc đặt tên Tiên Minh (bang hội) bị giới hạn ký tự quá ngắn, muốn tăng lên 20 ký tự.

**Tìm ra 2 nơi có giới hạn `maxChars="6"` liên quan đến tên Tiên Minh** (không phải tên nhân vật — `NameChangeSkin.exml`/`nameInput.maxChars=6` trong `main.min.js` là màn đổi tên NHÂN VẬT khác, không đụng tới):
- `GuildBuildSkin.exml` (`SkinGuildBuild`, dùng bởi view `GuildCreateWindow`) — màn **Tạo Tiên Minh** lúc lập bang lần đầu, ô `TextInput id="textInput"`.
- `guildNameChange.exml` (`SkinGuildNameChange`, dùng bởi view `GuildChangeNamePanelView`) — màn **Đổi tên Tiên Minh** miễn phí sau gộp server, ô `EditableText id="input"`.

Cả 2 đều đổi `maxChars` từ `6` → `20`, sửa đồng bộ trong exml lẫn hàm khởi tạo tương ứng trong `default.thm.js` (`textInput_i` của `SkinGuildBuild`, `input_i` của `SkinGuildNameChange`).

**Kiểm tra không bỏ sót giới hạn khác**: đã `grep` toàn bộ `main.min.js` — cả 2 luồng (`GuildCreateWindow`/`sendGuildCreate`, `GuildChangeNamePanelView`) đều gửi thẳng `textInput.text`/`input.text` lên server, không có validate độ dài phía client nào khác ngoài `maxChars`. Không có mã nguồn server (`server/bin/` chỉ chứa file `.exe` đã biên dịch sẵn) nên không kiểm tra được server có giới hạn cứng riêng hay không — nếu server chặn tên dài quá N ký tự thì đây vẫn là giới hạn ẩn ngoài tầm sửa của repo này.

Đổi tên `default.thm_4ed81ceb.js`→`default.thm_f3250b4b.js` (cache-bust, `main.min.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng thử tạo/đổi tên Tiên Minh với tên dài hơn 6 ký tự để xác nhận: (1) client cho nhập tới 20 ký tự, (2) server có chấp nhận tên dài hơn 6 ký tự hay không (đây là phần không kiểm chứng được từ code client).

## 57. Tăng giới hạn ký tự đặt tên nhân vật từ 6 lên 12 (`main.min.js`) (2026-07-08)

Người dùng phản ánh màn **Tạo nhân vật** cũng bị giới hạn ký tự tên quá ngắn, muốn điều chỉnh tương tự mục 56.

**Khác với tên Tiên Minh**: giới hạn này KHÔNG nằm trong exml (`CreateRole1Skin.exml`/`SkinCreateRole1` không khai báo `maxChars` cho `nameInput`), mà bị set ĐỘNG hoàn toàn trong `main.min.js`, ngay trong constructor của view `CreateRoleWin`: `e.nameInput.maxChars=6`. Đây là chỗ DUY NHẤT trong toàn file chứa dòng này (xác nhận qua `grep -c`).

**Chọn mức 12 ký tự** (không phải 20 như tên Tiên Minh): tên nhân vật hiển thị ở nhiều nơi hơn tên Tiên Minh (bảng tên trên đầu nhân vật, khung chat, bảng xếp hạng...) — mức 12 vừa đủ thoải mái cho tiếng Việt có dấu, vừa hạn chế rủi ro tràn chữ ở các UI khác chưa được rà soát trong đợt sửa này.

**Kiểm tra không bỏ sót**: hàm `sendCreateRole_a94` gửi thẳng `this.nameInput.text` lên server qua `RoleMgr.ins().sendCreateRole(...)`, không có validate độ dài phía client nào khác. Tương tự mục 56, không có mã nguồn server nên không kiểm tra được giới hạn cứng phía server (nếu có).

Chỉ sửa `main.min.js` (không có exml nào cần sửa vì giá trị gốc không nằm trong skin). Đổi tên `main.min_2b15442a.js`→`main.min_857e08fa.js` (cache-bust, `default.thm.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng thử tạo nhân vật với tên dài hơn 6 ký tự để xác nhận: (1) client cho nhập tới 12 ký tự, (2) tên dài không bị tràn/vỡ ở bảng tên trên đầu nhân vật/chat/xếp hạng, (3) server có chấp nhận tên dài hơn 6 ký tự hay không.

## 58. Rút gọn nút bấm + sửa vỡ dòng "Thời gian làm mới lô hàng" + dời "Xem trước Cực Phẩm" trên popup Cửa Hàng Bí Ẩn (`BlackMarketSkin.exml`) (2026-07-08)

Người dùng gửi ảnh popup "Cửa Hàng Bí Ẩn" (Chợ đen/Black Market — tiêu đề "商店" vẫn chưa dịch). 3 yêu cầu: (1) rút gọn tên các nút bấm; (2) dời "Xem trước Cực Phẩm" lên bên dưới dòng "Thời gian làm mới lô hàng tiếp theo: 00:00:00"; (3) dòng đó đang vỡ dòng ngay chữ "theo:" (xuống dòng thành "...tiếp the" / "o: 00:00:00") — mở rộng khung để "theo:" nằm trọn dòng 1, chỉ "00:00:00" xuống dòng 2.

**Xác định đúng skin**: `SkinBlackMarket`/`BlackMarketPanel` — dễ nhầm với `FDStoreSkin`/`activityStore` vì cả 2 đều có field tên `refreshShopBtn`. Phân biệt bằng field riêng của mỗi class (`keylabel`, `costGroup`, `price` thuộc `BlackMarketPanel`; `redPoint1`, `ConfigActivityType22_1` thuộc class kia) — CHỈ sửa đúng 1 trong 2 chỗ set `refreshShopBtn.label` trong `main.min.js`, không đụng chỗ còn lại.

**Đã sửa**:
- Nút `buyAllItemBtn`: "Mua tất cả" → "Mua hết".
- Nút `refreshShopBtn` (nhãn set ĐỘNG theo trạng thái miễn phí, trong `BlackMarketPanel.updateOthersUIInfo_a94`): "Làm mới miễn phí" → "Miễn phí" (khi đang miễn phí); giữ nguyên "Làm mới" khi không miễn phí (đã đủ ngắn).
- Nhãn `tip` (text set động trong `refushEndTime_a94`: `"Thời gian làm mới lô hàng tiếp theo: "+giờ`): mở rộng `width` 280→320, dịch `horizontalCenter` 118→108 (lệch trái 10px để không đụng mép phải khung, vì khung skin chỉ rộng 560 và center gốc đã gần sát mép phải) — đủ chỗ cho "theo:" nằm trọn dòng 1.
- Nhãn `goodsOverView` ("Xem trước Cực Phẩm"): dời từ `bottom=20` (đang chồng lên hàng nút bấm) lên `bottom=100`, đổi `horizontalCenter` từ 189 → 118 (canh giữa ngay dưới nhãn `tip`, do `tip` neo `bottom` cố định nên phần trên mọc lên khi 2 dòng, còn đáy `tip` giữ nguyên — `goodsOverView` đặt ngay dưới đáy đó), đổi `textAlign` từ "left" → "center" cho khớp cách canh giữa mới.

Sửa đồng bộ `BlackMarketSkin.exml` + `default.thm.js` (`tip_i`, `buyAllItemBtn_i`, `goodsOverView_i`) + `main.min.js` (đúng 1 trong 2 chỗ `refreshShopBtn.label`). Đổi tên `default.thm_f3250b4b.js`→`default.thm_16e88674.js`, `main.min_857e08fa.js`→`main.min_6a7ab3f8.js` (cache-bust cả 2). `node -c` qua cho cả 2 file, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh: (1) cả 2 nút bấm hiển thị đủ chữ, không tràn; (2) dòng đếm ngược chỉ vỡ đúng ở "00:00:00", "theo:" đã lên dòng 1; (3) "Xem trước Cực Phẩm" nằm gọn dưới dòng đếm ngược, không chồng lên nút bấm hay dòng "200 hoặc..." bên dưới.

## 59. Ép xuống dòng cứng cho "00:00:00" + rút gọn tên 2 tab Cửa Hàng (`main.min.js`) (2026-07-08)

Người dùng xác nhận mục 58 gần ổn (2 nút không còn tràn chữ, "Xem trước Cực Phẩm" đã dời đúng chỗ), nhưng còn 2 điểm: (1) dòng đếm ngược vẫn đợi tràn dòng mới ngắt (ngắt ngay giữa "00:00:00" thành "...tiếp theo: 00" / ":00:00") — muốn ép "00:00:00" LUÔN nằm hẳn dòng 2, không phụ thuộc độ rộng khung; (2) 2 tab "Cửa Hàng Bí Ẩn" / "Cửa Hàng Đạo Cụ" đang bị cắt chữ ("Cửa Hàng B..." ) — muốn bỏ hẳn tiền tố "Cửa Hàng", chỉ giữ "Bí Ẩn" / "Đạo Cụ".

**Sửa (1) — xuống dòng cứng**: thay vì chỉnh `width` để chờ engine tự ngắt theo từ (vẫn phụ thuộc kích thước font/khung, dễ lệch), sửa thẳng chuỗi nối trong `refushEndTime_a94`: đổi khoảng trắng phân cách thành ký tự xuống dòng — `"Thời gian làm mới lô hàng tiếp theo:\n"+giờ` (trước đó là `"...theo: "+giờ`). `\n` được engine hỗ trợ xuống dòng cứng bình thường (đã xác nhận qua bài học `\n` ở mục 41 trước đây trong phiên này). `width=320` từ mục 58 vẫn đủ cho dòng 1 một mình, giữ nguyên không cần chỉnh lại exml/`default.thm.js` lần này.

**Sửa (2) — rút gọn tên tab**: 2 tab này lấy tên hiển thị từ property `name` gán ngay trong constructor của mỗi panel (dùng làm `dataProvider` cho `TabBar` trong `ShopView`), không nằm trong exml nào:
- `BlackMarketPanel`: `e.name="Cửa Hàng Bí Ẩn"` → `e.name="Bí Ẩn"`.
- `PropertyPanel`: `e.name="Cửa Hàng Đạo Cụ"` → `e.name="Đạo Cụ"`.

Chỉ sửa đúng 2 dòng khởi tạo `name` này — KHÔNG đụng các câu văn khác có nhắc "Cửa Hàng Bí Ẩn" trong nội dung thông báo (ví dụ "Mua hàng ở Cửa Hàng Bí Ẩn hoặc làm mới để nhận", "Cửa Hàng Bí Ẩn không tìm thấy vật phẩm") vì đó là câu hoàn chỉnh, đổi sẽ đọc cụt nghĩa. Cũng không đụng tên các panel khác cùng mẫu ("Cửa Hàng Điểm", "Cửa Hàng Quý Tộc") vì không thuộc 2 tab hiển thị trong màn hình này.

Chỉ sửa `main.min.js` (không có exml/`default.thm.js` nào cần đổi). Đổi tên `main.min_6a7ab3f8.js`→`main.min_fcf6858d.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh: dòng đếm ngược tách đúng 2 dòng cố định ("...tiếp theo:" / "00:00:00"), và 2 tab hiển thị đủ chữ "Bí Ẩn"/"Đạo Cụ" không bị cắt.

## 60. Sửa bổ sung: `name` tab bị GHI ĐÈ trong `default.thm.js` (mục 59 chưa đủ) (`ShopSkin.exml`) (2026-07-08)

Người dùng test lại, tab vẫn hiện "Cửa Hàng Bí Ẩn"/"Cửa Hàng Đạo Cụ" dù đã sửa `main.min.js` ở mục 59. Gửi kèm file `default.thm_16e88674.js` yêu cầu kiểm tra.

**Nguyên nhân thật**: `name` của 2 tab KHÔNG chỉ được set 1 lần trong constructor của `BlackMarketPanel`/`PropertyPanel` (đã sửa ở mục 59) — nó còn bị GHI ĐÈ ngay sau đó bởi chính skin cha `SkinShop` (compiled từ `ShopSkin.exml`), trong hàm `blackMarketPanel_i()`/`itemShopPanel_i()`:
```
_proto.blackMarketPanel_i = function () {
	var t = new BlackMarketPanel();   // constructor set name = "Bí Ẩn" (mục 59)
	...
	t.name = "Cửa Hàng Bí Ẩn";        // NHƯNG dòng này chạy NGAY SAU, ghi đè lại
	...
};
```
Đây là do exml gốc khai báo trực tiếp thuộc tính `name` trên thẻ con trong `<e:ViewStack>`:
```
<ns1:BlackMarketPanel id="blackMarketPanel" ... name="神秘商店" .../>
<ns1:PropertyPanel id="itemShopPanel" ... name="道具商店" .../>
```
(exml gốc thậm chí CHƯA từng được dịch — vẫn còn tiếng Trung nguyên bản "神秘商店"/"道具商店", còn bản dịch tiếng Việt "Cửa Hàng Bí Ẩn"/"Cửa Hàng Đạo Cụ" chỉ tồn tại trong `default.thm.js` đã biên dịch từ một lần dịch trước đó không đồng bộ ngược lại exml).

**Bài học**: khi 1 giá trị hiển thị (text/name/label...) có thể được set từ NHIỀU nơi (constructor class trong `main.min.js` VÀ thuộc tính khai báo trực tiếp trên component con trong skin cha chứa nó), phải rà cả hai — sửa 1 chỗ có thể bị chỗ kia ghi đè do thứ tự thực thi (skin cha luôn set thuộc tính SAU khi gọi `new` constructor).

**Đã sửa**: `default.thm_16e88674.js` (2 dòng `t.name` trong `SkinShop.blackMarketPanel_i`/`itemShopPanel_i`) và `ShopSkin.exml` (thuộc tính `name` trên 2 thẻ con trong `ViewStack`, dịch luôn từ tiếng Trung gốc sang "Bí Ẩn"/"Đạo Cụ" cho đồng bộ).

Đổi tên `default.thm_16e88674.js`→`default.thm_4639fce7.js` (cache-bust, `main.min.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh 2 tab đã hiện đúng "Bí Ẩn"/"Đạo Cụ".

## 61. Sửa chồng chéo số liệu "Thông tin cá nhân" + rút gọn 2 nút bấm màn Cạnh Kỹ (`zaoyuskin.exml`) (2026-07-08)

Người dùng gửi ảnh màn "竟技" (Cạnh Kỹ/Arena PK). Yêu cầu: (1) khu vực dưới tiêu đề "Thông tin cá nhân" (3 dòng: Điểm Sát Lục / Xếp hạng Sát Lục / Đạo Tâm Ba Động) bị nhãn đè lên giá trị, cần tính toán sắp xếp lại hợp lý, có thể dời sang phải để có thêm chỗ; (2) đổi "Xem xếp hạng"/"Lịch sử chiến đấu" → "Xếp Hạng"/"Lịch Sử".

**Phân tích nguyên nhân**: cả 3 dòng đều có nhãn tĩnh (`x≈217.7`) và giá trị động đặt cách nhãn một khoảng cố định quá hẹp (79-101px), trong khi nhãn tiếng Việt dài hơn nhiều so với bản gốc tiếng Trung (ví dụ "Xếp hạng Sát Lục:" ước tính ~178px ở size 20, cần khoảng cách lớn hơn nhiều so với 100px hiện có).

**Đã sửa (ưu tiên di chuyển, không giảm size chữ — nguyên tắc 10)**:
- `dayPrestige` (giá trị "Điểm Sát Lục"), `rank` (giá trị "Xếp hạng Sát Lục", có thể là "Chưa lên bảng"), `labelRedPoint` (giá trị số "Đạo Tâm Ba Động"): gom về chung 1 cột `x=405` (đủ xa để tránh nhãn dài nhất "Xếp hạng Sát Lục:" ở dòng 2, tạo cảm giác bảng canh cột thay vì mỗi dòng một khoảng lệch khác nhau).
- Nhãn `time` (phần chú thích phụ dạng "(Mỗi phút giảm 1 điểm)"/"(Xphút nữa có thể thử thách)" đi kèm `labelRedPoint`) — TRƯỚC đây nằm chung 1 `Group`+`HorizontalLayout` ngay sau `labelRedPoint` trên CÙNG 1 dòng, đi theo lẽ sẽ kéo dài rất xa (~230px cho câu dài nhất) và có nguy cơ tràn ra ngoài khung skin rộng 600px nếu đẩy `labelRedPoint` sang phải theo cột chung. Xử lý bằng cách TÁCH `time` ra khỏi Group, đưa xuống DÒNG RIÊNG bên dưới (`x=217.69, y=164`, thẳng hàng với nhãn "Đạo Tâm Ba Động:" phía trên) thay vì cùng dòng — xoá hẳn Group+HorizontalLayout bọc ngoài (không còn cần thiết vì 2 label giờ độc lập).
- 2 nút `rankBtn`/`recordBtn`: "Xem xếp hạng"→"Xếp Hạng", "Lịch sử chiến đấu"→"Lịch Sử".

Sửa đồng bộ `zaoyuskin.exml` + `default.thm.js` (`dayPrestige_i`, `rank_i`, `labelRedPoint_i`, `time_i`, xoá `_Group3_i`/`_HorizontalLayout1_i`, sửa `elementsContent` của hàm gốc để gọi thẳng `labelRedPoint_i()`/`time_i()` thay vì qua Group trung gian, `rankBtn_i`, `recordBtn_i`). Không có dynamic override nào cho 2 nhãn nút trong `main.min.js` (đã grep xác nhận). Đổi tên `default.thm_4639fce7.js`→`default.thm_5212b828.js` (cache-bust, `main.min.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

**Lưu ý riêng, chưa xử lý trong đợt này**: dòng chú thích "Tiêu diệt người chơi Đạo Tâm Ba Động+25 điểm, đạt 100 sẽ không thể thách đấu" (nằm ngay dưới, `bottom=42`, `horizontalCenter=-6`) trong ảnh gốc bị TRÀN/CẮT bên trái màn hình (thấy "u diệt người chơi..." thay vì "Tiêu diệt..."), do câu quá dài so với việc canh giữa bằng `horizontalCenter`. Đây là lỗi khác, không nằm trong 3 dòng "chồng chéo số liệu" người dùng nêu lần này — nếu người dùng xác nhận vẫn còn thấy, sẽ xử lý ở đợt sau.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh: (1) 3 dòng thông tin không còn đè lên nhau, giá trị hiển thị đủ (đặc biệt trường hợp "Chưa lên bảng" dài nhất — vị trí x=405 là ước tính, khung skin chỉ rộng 600 và có nút phần thưởng ở x=476.83 y=47.84 nhưng KHÔNG cùng độ cao với 2 dòng dưới nên không lo va chạm dòng 2/3, chỉ dòng 1 nằm gần độ cao nút này nhưng giá trị dòng 1 chỉ là số ngắn nên an toàn); (2) dòng "(Mỗi phút giảm 1 điểm)" đã xuống dòng riêng gọn gàng dưới "Đạo Tâm Ba Động:"; (3) 2 nút đã đổi tên đúng.

## 62. Ép 2 dòng cho câu chú thích tràn lề trái + dời khối "Người chơi gần đây" xuống (`zaoyuskin.exml`) (2026-07-08)

Người dùng xác nhận mục 61 ổn (gửi ảnh xác nhận 3 dòng thông tin cá nhân hiển thị đúng, không đè). Quay lại đúng lỗi đã lưu ý ở mục 61 (câu "Tiêu diệt người chơi Đạo Tâm Ba Động+25 điểm, đạt 100 sẽ không thể thách đấu" bị tràn/cắt bên trái) — yêu cầu: (1) dời toàn bộ khối "Người chơi gần đây" (khung nền + tiêu đề + danh sách) xuống dưới một chút; (2) ép câu chú thích đó xuống 2 dòng.

**Nguyên nhân tràn lề trái**: câu dài 78 ký tự canh giữa bằng `horizontalCenter=-6` trên 1 dòng duy nhất — độ rộng tự nhiên của cả câu vượt xa 600px của khung skin, phần dư tràn ra cả 2 bên, bên trái bị cắt bởi mép canvas (chữ "Tiêu" biến mất, chỉ còn thấy "u diệt...").

**Đã sửa**:
- Chèn xuống dòng cứng (`\n` trong `default.thm.js`, `&#10;` trong exml — theo đúng quy tắc XML để giữ ký tự xuống dòng thật trong thuộc tính, khác với `\n` literal sẽ bị chuẩn hoá thành khoảng trắng) tại chỗ ngắt câu tự nhiên sau dấu phẩy: "Tiêu diệt người chơi Đạo Tâm Ba Động+25 điểm," / "đạt 100 sẽ không thể thách đấu". Thêm `textAlign="center"` để 2 dòng canh giữa đều nhau.
- Đổi neo của nhãn này (và icon "!" đi kèm) từ `bottom` sang `y` cố định (label `y=195`, icon `y=193`) — theo đúng bài học "nhãn neo bottom sẽ mọc NGƯỢC LÊN TRÊN khi wrap nhiều dòng hơn" (đã ghi nhận trong style guide): nếu giữ `bottom`, khối 2 dòng sẽ mọc lên đè vào dòng "(Mỗi phút giảm 1 điểm)" (`time`, vừa dời tới `y=164` ở mục 61). Đổi sang `y` cố định khiến khối chữ mọc XUỐNG DƯỚI thay vì lên trên — đúng hướng cần, vì đang tạo thêm chỗ trống PHÍA DƯỚI (khối "Người chơi gần đây" cũng dời xuống cùng lúc).
- Dời khối "Người chơi gần đây" (khung nền `_Image6`, tiêu đề `_Label6`, `scroller`) xuống bằng cách tăng `top` của cả 3 thêm 46px (259→305, 269→315, 295→341), giữ nguyên `bottom` của từng phần tử (khiến vùng hiển thị list co lại ~46px chứ không dịch chuyển các nút/tab bên dưới — không cần đụng tới `rankBtn`/`recordBtn` hay các phần tử dưới nữa vì chúng neo theo `bottom` từ đáy màn hình, không phụ thuộc `top` của khối này).

Sửa đồng bộ `zaoyuskin.exml` + `default.thm.js` (`_Image1_i`, `_Label1_i`, `_Image6_i`, `_Label6_i`, `scroller_i`). Không có dynamic override cho câu chú thích này trong `main.min.js` (đã grep xác nhận, hoàn toàn tĩnh). Đổi tên `default.thm_5212b828.js`→`default.thm_10d6176f.js` (cache-bust, `main.min.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ, exml qua `xml.etree.ElementTree.parse`.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh: (1) câu chú thích hiện đủ 2 dòng, không còn bị cắt chữ "Tiêu" bên trái; (2) không đè lên dòng "(Mỗi phút giảm 1 điểm)" phía trên; (3) khối "Người chơi gần đây" đã dời xuống đủ, không bị chồng lên câu chú thích 2 dòng. Khoảng dời 46px là ước tính dựa trên chiều cao 1 dòng chữ size 20 (~24px) × 2 dòng cộng đệm — có thể cần chỉnh thêm nếu vẫn còn sát nhau.

## 63. Sửa toàn bộ "số+đơn vị" sai kiểu tiếng Trung (cấp/chuyển/hạng) trên toàn `main.min.js` (2026-07-08)

Người dùng xác nhận mục 62 ổn (ảnh cho thấy 3 dòng thông tin không đè, câu chú thích 2 dòng gọn gàng). Phát hiện lỗi mới: "Xếp hạng Sát Lục: 1hạng" sai văn phong tiếng Việt — yêu cầu đổi thành "Hạng 1" (từ đứng TRƯỚC số, có khoảng cách), tương tự "Cấp 1", "Chuyển 1", và yêu cầu RÀ TOÀN BỘ CODE tìm các chỗ lỗi tương tự để sửa luôn, nhấn mạnh phải cẩn thận vì dễ vỡ code.

**Nguyên nhân gốc**: đây là kiểu Trung Quốc "số+đơn vị" (ví dụ "76级" = cấp 76) được dịch nguyên xi từng chữ sang tiếng Việt mà KHÔNG đảo trật tự — hàng trăm chỗ trong `main.min.js` nối chuỗi kiểu `VAR+"cấp"`/`VAR+"chuyển"`/`VAR+"hạng"` (số đứng trước, từ đứng sau, không khoảng cách), đúng văn phong tiếng Việt phải là "Cấp 76"/"Chuyển 12"/"Hạng 1" (từ trước, số sau, có khoảng cách).

**Phương pháp rà soát** (để đảm bảo không vỡ code với quy mô lớn — gần 300 chỗ):
1. Viết script Python quét toàn bộ `main.min.js` tìm mọi chỗ nối chuỗi `<biểu thức>+"cấp"`/`+"chuyển"`/`+"hạng"` (kể cả biến thể có hậu tố như `+"cấp mở"`, `+"cấp)"`, `+"cấp|"`, `+"hạng|"`...).
2. Viết bộ dò biên biểu thức lùi từ vị trí `+` (đếm độ sâu ngoặc `()`/`[]`, dừng đúng ở ranh giới biểu thức — xử lý được cả biến đơn giản `t.level`, chuỗi thuộc tính `this.data.itemConfig.level`, gọi hàm `ShenshouModel.ins().getEquipLvResult(...)`, biểu thức số học trong ngoặc `(this._curLevel+1)`, phép chia/chia dư không ngoặc `e/1e3`, `e%1e3`...).
3. In toàn bộ danh sách biểu thức trích được ra để **soát bằng mắt trước khi áp dụng** — phát hiện các trường hợp KHÔNG được đảo trật tự vì "cấp"/"hạng" ở đây mang nghĩa khác (không phải nhãn cấp độ):
   - `"nâng cấp lên"+o+"cấp"` — "cấp" ở đây là ĐẾM SỐ LƯỢNG cấp tăng thêm (giống "5 giây", không phải "Cấp 5"), giữ nguyên trật tự, chỉ thêm khoảng cách.
   - `"Nâng thêm"+s+"cấp là có thể nhận thưởng"` và 2 câu tương tự dùng "chiến lực"/"điểm trang bị" — cùng kiểu ĐẾM SỐ LƯỢNG, chỉ thêm khoảng cách, không đảo.
   - `"thứ "+X+"hạng"` (7 chỗ, có tiền tố "thứ") — nếu đảo thành "thứ Hạng X" sẽ lặp nghĩa/sai ngữ pháp; giữ nguyên trật tự "thứ X", chỉ thêm khoảng cách trước "hạng".
   - 2 chỗ "hạng" KHÔNG có tiền tố "thứ" (đúng là ca lỗi trong ảnh người dùng gửi) → đảo bình thường thành "Hạng X".
4. Xử lý riêng biến thể GHÉP `X+"chuyển"+Y+"cấp"` (9 chỗ, ví dụ tạo ra "12chuyển200cấp" giống hệt ảnh gốc mục đầu tiên) → `"Chuyển "+X+" Cấp "+Y` (thêm khoảng trắng phân tách 2 cụm).
5. Sau khi xử lý các ngoại lệ thủ công, chạy transform tự động cho toàn bộ phần còn lại (đã xác nhận an toàn qua bước soát bằng mắt).

**Kết quả**: 14 sửa thủ công (thêm khoảng cách, không đảo) + 9 ghép chuyển+cấp + 135 chỗ "cấp" đơn lẻ + 105 chỗ "chuyển" đơn lẻ được đảo trật tự = **263 chỗ** trong `main.min.js`. Ngoài ra phát hiện thêm 2 chỗ liên quan đến từ "bộ" (số lượng mảnh trang bị) bị dính liền số ngay sau khi đảo "cấp"/"chuyển" phía trước (`...+"Cấp "+b+""+y+"bộ:"`) — vá thêm dấu phẩy/khoảng cách để không bị 2 số dính nhau (`+"Cấp "+b+", "+y+" bộ:"`), KHÔNG đảo "bộ" (chưa xác nhận được style chuẩn cho từ này).

**Đã kiểm tra không có text tĩnh tương tự trong `default.thm.js` và các file `.exml`** — toàn bộ lỗi này nằm ở text ĐỘNG (set trong `main.min.js`), không có placeholder tĩnh nào bị lỗi cùng kiểu.

**Phạm vi CHỦ ĐỘNG THU HẸP**: chỉ xử lý 3 từ người dùng nêu rõ (cấp/chuyển/hạng) + vá tối thiểu cho "bộ" (chỉ thêm khoảng cách, không đảo). KHÔNG mở rộng dò các từ phân loại/thứ hạng khác (sao, tầng, vòng...) vì mỗi từ có thể có quy tắc tiếng Việt khác nhau (ví dụ "5 sao" đã ĐÚNG kiểu đếm số lượng, đảo thành "Sao 5" sẽ SAI) — cần xác nhận riêng từng từ với người dùng ở đợt sau nếu muốn mở rộng, để tránh đúng rủi ro "vỡ code" mà người dùng cảnh báo.

Chỉ sửa `main.min.js` (không có exml/`default.thm.js` nào cần đổi). Đổi tên `main.min_fcf6858d.js`→`main.min_a8420dc8.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ. Đã kiểm tra kỹ: không phát sinh double-space, không có artefact `+""` gây lỗi hiển thị (dù còn 112 chỗ `+""` thừa vô hại về mặt chức năng).

Vẫn chưa render trực tiếp kiểm chứng được — quy mô thay đổi RẤT LỚN (263 chỗ) nên rủi ro cao hơn bình thường dù đã soát kỹ từng nhóm mẫu bằng mắt trước khi áp dụng tự động. Cần người dùng kiểm tra rộng nhiều màn hình khác nhau (không chỉ riêng màn Cạnh Kỹ) để xác nhận: "Cấp X", "Chuyển X", "Hạng X" hiển thị đúng khắp nơi (thông tin nhân vật, thú cưỡi, trang bị, xếp hạng bang hội, Thiên Cơ Các, Vạn Long Mộ, danh sách người chơi gần đây...) mà không có chỗ nào bị lệch/thiếu số do sai sót trong quá trình dò biên tự động.

## 64. Sửa lỗi bấm "Thách đấu" không có phản ứng gì trên màn Cạnh Kỹ (`main.min.js`) (2026-07-08)

Người dùng báo: dù "Đạo Tâm Ba Động" không phải 100, bấm "Thách đấu" vẫn không thực hiện được — đây là LỖI CHỨC NĂNG (không phải UI), yêu cầu dò tìm nguyên nhân.

**Nguyên nhân gốc — lỗi so sánh chuỗi do dịch thuật trước đây bỏ sót**: nút bấm trong danh sách "Người chơi gần đây" (`ZaoYuInfoItem.exml`/`EncounterInfoItem`) có nhãn mặc định `"Thách đấu"` (xác nhận trong cả exml lẫn `default.thm.js`, và trong `EncounterInfoItem.dataChanged`: `...?this.challengeBtn.label="Thách đấu":this.challengeBtn.label="Đang Thử Thách"`). Nhưng hàm xử lý bấm nút (`NearbyInfoWin.onTap_a94`) lại kiểm tra:
```js
if("Thử Thách"==t.target.label||"Đang Thử Thách"==t.target.label){
  // ...toàn bộ logic kiểm tra túi đồ, kiểm tra Đạo Tâm Ba Động, gọi sendGoFight_a94...
}
```
`"Thử Thách"` (tên cũ, có lẽ trước khi dịch) KHÁC với `"Thách đấu"` (tên nhãn thực tế hiện tại) — nên điều kiện `if` không bao giờ đúng khi nút đang ở trạng thái sẵn sàng thách đấu, khiến TOÀN BỘ logic bên trong (kể cả việc gọi chiến đấu) bị bỏ qua hoàn toàn. Bấm nút do đó không có phản ứng gì, không phụ thuộc điểm Đạo Tâm Ba Động là bao nhiêu — đúng khớp triệu chứng người dùng mô tả. Nhánh `else if("Tìm Địch"==t.target.label...)` cũng được xác nhận là code chết tương tự (không nơi nào còn gán nhãn "Tìm Địch" cho nút này nữa, có thể sót lại từ bản cũ trước khi bỏ tính năng) nhưng không gây ảnh hưởng nên không đụng tới.

**Đã sửa**: đổi điều kiện kiểm tra từ `"Thử Thách"==t.target.label` thành `"Thách đấu"==t.target.label` (giữ nguyên `"Đang Thử Thách"==t.target.label` vì nhánh đó đã khớp đúng sẵn). Chỉ 1 chỗ duy nhất trong toàn file (xác nhận qua `grep -c`).

Chỉ sửa `main.min.js` (không liên quan exml/`default.thm.js`, đây là lỗi thuần logic JS). Đổi tên `main.min_a8420dc8.js`→`main.min_61785772.js` (cache-bust). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ.

Đây là sửa LOGIC (không phải vị trí hiển thị) nên không cần chờ ảnh chụp để so sánh trực quan — người dùng có thể xác nhận trực tiếp bằng cách thử bấm "Thách đấu" sau khi server đồng bộ, kỳ vọng: vào trận đấu bình thường khi Đạo Tâm Ba Động < 100, hoặc hiện popup mua thêm lượt (`BuyRedThingWin`) khi ≥ 100 — thay vì im lặng không phản ứng như trước.

## 65. Rút gọn tên 5 tab trong "Cạnh Kỹ" + vá nốt 3 chỗ "ChuyểnXCấp" thiếu khoảng cách sót lại từ mục 63 (2026-07-08)

Người dùng xác nhận mục 61/62 ổn (gửi ảnh: 3 dòng thông tin, câu chú thích 2 dòng, "Hạng 1"/"Cấp 76" đều đúng). Phát hiện thêm: hàng "Vương Giả Tranh Bá"→hiện "Chuyển 12Cấp 111" (thiếu khoảng cách giữa 2 cụm) trong danh sách người chơi gần đây; và 5 tab điều hướng bên dưới ("Người xung quanh", "Vương Giả Tranh Bá", "Tiên Ngọc Thái Đoạt", "Tiên Đồ", "Vạn Long Mộ") quá dài, chữ đè lên nhau. Yêu cầu rút gọn: Xung Quanh, Vương Giả, Đào Mỏ, Tiên Đồ, Vạn Long.

**Tìm ra container thật của 5 tab** (khó — không phải `EncountBgWin`/`ZaoYuBGSkin` như đoán ban đầu, class đó đã CHẾT/không còn được gọi ở đâu cả): true container là **`Skinladderwin`** (`ladderwinskin.exml`), lớp `LadderWindow` (mở qua nút "Cạnh Kỹ" ở thanh chức năng chính, `LadderBtnIconRule.tapExecute→ViewMgr.ins().open(LadderWindow,0)`). `Skinladderwin` có `ViewStack` chứa 5 panel con (`zaoyu`=`NearbyInfoWin`/dùng chính `Skinzaoyu` ta đã sửa nhiều lần, `ladder`=`LadderInfoComPanel`, `wakuang`=`MinePanelView`, `teamfb`=`TeamNewFbPanel`, `challengeHunshou`=`HunGuFBWin`), mỗi panel có thuộc tính `name` dùng làm nhãn tab — và giống hệt bài học mục 60: `default.thm.js`'s `_i()` factory của `Skinladderwin` GHI ĐÈ `name` ngay sau khi tạo từng panel, nên chỉ cần sửa đúng chỗ này (không cần đụng constructor riêng của từng class trong `main.min.js`).

**Đã sửa** (`default.thm.js` — `zaoyu_i`, `ladder_i`, `wakuang_i`, `challengeHunshou_i`; giữ nguyên `teamfb_i` vì "Tiên Đồ" đã đủ ngắn):
- "Người xung quanh" → "Xung Quanh"
- "Vương Giả Tranh Bá" → "Vương Giả"
- "Tiên Ngọc Thái Đoạt" → "Đào Mỏ"
- "Vạn Long Mộ" → "Vạn Long"

Đồng bộ `ladderwinskin.exml` — dịch thẳng từ tiếng Trung gốc chưa từng dịch ("附近的人"/"王者争霸"/"仙玉采夺"/"万龙墓") sang thẳng bản rút gọn tiếng Việt luôn (giống cách xử lý ShopSkin.exml ở mục 60).

**Vá thêm phần "ChuyểnXCấp" dính liền**: rà toàn bộ `main.min.js` tìm các chỗ có cùng cấu trúc lỗi như dòng đã phát hiện (`EncounterInfoItem.dataChanged`: `""+(t.zsLv?"Chuyển "+t.zsLv+"":"")+"Cấp "+t.lv+""`) — đây là lỗi SÓT LẠI từ mục 63: khi "chuyển" nằm trong nhánh ternary (điều kiện có/không tái sinh) và "cấp" nằm ngoài ternary, script tự động ở mục 63 đảo đúng trật tự TỪNG CỤM riêng lẻ nhưng không thêm khoảng cách N GĂN CÁCH giữa 2 cụm đã đảo (vì bản gốc cũng chưa từng có khoảng cách ở đó). Tìm được đúng 3 chỗ có cấu trúc này, thêm khoảng trắng vào bên trong nhánh true của ternary (`"Chuyển "+X+"":""` → `"Chuyển "+X+" ":""`):
- `EncounterInfoItem.dataChanged` (danh sách "Người chơi gần đây")
- 1 chỗ dùng `e.zs` (label_name, danh sách bạn bè/liên hệ — 4 lần lặp cùng 1 dòng trong các hàm khác nhau)
- 1 chỗ dùng `t[RankDataType.DATA_ZHUAN]` (bảng xếp hạng)

Sửa đồng bộ `ladderwinskin.exml` + `default.thm.js` (tab names) + `main.min.js` (3 chỗ ChuyểnXCấp). Đổi tên `default.thm_10d6176f.js`→`default.thm_4d15a64e.js`, `main.min_61785772.js`→`main.min_cefa891c.js` (cache-bust cả 2). `node -c` qua cho cả 2 file JS, `php -l` qua, `manifest.json` hợp lệ, exml qua `xml.etree.ElementTree.parse`.

**Bài học bổ sung cho style guide**: khi rà lỗi "số+đơn vị" dạng ghép (2 cụm nối liền nhau, ví dụ Chuyển+Cấp), phải đặc biệt cẩn thận với biến thể NẰM TRONG TERNARY (1 cụm có điều kiện, cụm kia luôn hiện) — script tự động dựa trên regex tìm cặp liền kề `A+"X"+B+"Y"` sẽ bỏ sót biến thể này vì có dấu `?:` xen giữa, cần quét thêm bằng mẫu `"TừViệt "+expr+"":""`ngay-trước`+"TừViệt2 "` để bắt hết.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh: (1) 5 tab hiển thị đủ chữ "Xung Quanh"/"Vương Giả"/"Đào Mỏ"/"Tiên Đồ"/"Vạn Long", không còn đè lên nhau; (2) "Chuyển 12 Cấp 111" đã có khoảng cách đúng ở danh sách người chơi gần đây và các màn liên quan (bảng xếp hạng, danh sách bạn bè).

## 66. Mở rộng 2 cột so sánh chỉ số (trước/sau) đang rớt dòng trên `ZhanlingSkin.exml` (2026-07-08)

Người dùng gửi ảnh màn "法宝" (chưa dịch, dùng chung layout với Chiến Lệnh) — khu vực so sánh chỉ số trước→sau nâng sao ("Công Kích：10 / 630, Vật Kháng：26/57" bên trái, mũi tên, rồi "Công Kích：11/980..." bên phải) bị rớt dòng giữa nhãn và giá trị vì cột quá hẹp. Yêu cầu: cột trái dời sang trái để không rớt dòng, cột phải mở rộng thêm bên phải.

**Xác định đúng skin — khó vì tiêu đề màn hình vẫn còn tiếng Trung "法宝" và menu bên trái cũng chưa dịch (铭图/灵晶/符篆/器魂), không tìm được qua tên màn hình**. Tìm bằng cách khác: 2 nhãn hiển thị dạng "before→after" với mũi tên ở giữa là mẫu UI đặc trưng, tìm ra `id="curAtt"` (cột trái)/`id="nextAtt"` (cột phải)/`id="cursor"` (ảnh mũi tên `jiantouyou`) trong `ZhanlingSkin.exml` — skin DÙNG CHUNG cho nhiều tính năng khác nhau (Chiến Lệnh gốc `ZhanLingPanel` và biến thể `ZhanLingPanelExView` cho tính năng "法宝" hiện tại, phân biệt qua state `zl_up`/`zl_max` vs `skin_up`/`skin_max`).

**Đã sửa** (giữ mép trong sát mũi tên `cursor` cố định, chỉ mở rộng mép ngoài — đúng yêu cầu "dời trái"/"mở rộng phải"):
- `curAtt` (cột trái): `width` 140→200, `horizontalCenter` -128→-158 (cả 2 state `zl_up` và `skin_up` đều dùng chung giá trị này) — mép phải (sát mũi tên) giữ nguyên tại -58, mép trái dời thêm 60px.
- `nextAtt` (cột phải): `width` 140→190, `horizontalCenter` 140→165 — mép trái (sát mũi tên) giữ nguyên tại 70, mép phải mở rộng thêm 50px.

Sửa đồng bộ `ZhanlingSkin.exml` + `default.thm.js` (`curAtt_i`, `nextAtt_i`, và 2 dòng `eui.SetProperty("curAtt","horizontalCenter",-128)` trong định nghĩa state `zl_up`/`skin_up` — đặc thù riêng của skin dùng `states=` kiểu Egret, khác cấu trúc `_i()` factory đơn giản đã gặp ở các skin khác, cần sửa cả phần khai báo `eui.State`/`eui.SetProperty` mới có hiệu lực). Đổi tên `default.thm_10d6176f.js`→`default.thm_2cacec0b.js` (cache-bust, `main.min.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ, exml qua `xml.etree.ElementTree.parse`.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh: cả 2 cột "Công Kích :"/"Vật Kháng :" đã nằm gọn 1 dòng mỗi thông số, không còn rớt xuống dòng dưới. Do skin này dùng chung cho nhiều tính năng (Chiến Lệnh, "法宝" và có thể còn nơi khác), nên cũng cần xác nhận các màn khác dùng chung layout so sánh này (nếu có) không bị ảnh hưởng xấu bởi việc mở rộng 2 cột.

## 67. Sửa tên vật phẩm chồng chéo trên lưới + wrap xấu ở màn "幻化" (Hóa Hình/Ảo Vũ/Tiên Vũ/Ngự Khí) (2026-07-08)

Người dùng gửi 3 ảnh (3 tab khác nhau: Ngự Khí, Tiên Vũ x2) của màn "幻化" (chưa dịch tiêu đề). Báo: tên vật phẩm trong lưới danh sách bên dưới quá dài, chồng chéo lên ô kế bên không đọc được (ví dụ "ng Sinh LiênĐộngTiêu Diễm LongTiên Sóc Vân Xa..." — nhiều tên dính lẫn vào nhau); và tên nguyên liệu cần để kích hoạt (góc phải, dạng "Tên vật phẩm×1" tô đỏ/xanh gạch chân) bị wrap xuống 2 dòng xấu (ví dụ "Phong Sinh Liên" / "Động×1"). Yêu cầu dò hết và chỉnh lại cho đẹp.

**Xác định skin**: `DressSkin.exml`/`SkinDress` (class `DressesWin` — cả 4 tab Hóa Hình/Ảo Vũ/Tiên Vũ/Ngự Khí đều dùng CHUNG 1 popup này, chỉ đổi dữ liệu qua `tab`/`list`, nên sửa 1 lần áp dụng cho cả 4 tab). 2 vị trí lỗi:
1. **Lưới danh sách** (`list`, `itemRendererSkinName="SkinDressItem"` → `DressItemSkin.exml`): mỗi ô rộng 110px, nhãn `imageName` (tên vật phẩm) KHÔNG có `width` giới hạn — với tên dài (4-5 từ), Label tự giãn rộng theo nội dung, tràn ra ngoài ô 110px, đè lên nhãn tên của ô bên cạnh (do `horizontalCenter="0"` canh giữa trong ô của chính nó nhưng không bị chặn biên).
2. **Nhãn nguyên liệu kích hoạt** (`itemName` trong `itemGroup`, `DressSkin.exml`): `width="140"` quá hẹp so với tên vật phẩm dài (vd "Phong Sinh Liên Động×1" ~22 ký tự), buộc wrap xuống dòng 2 ở vị trí xấu.

**Đã sửa**:
- `DressItemSkin.exml`/`imageName`: thêm `width="106"` (khớp trong ô 110px, không tràn sang ô bên cạnh nữa), bật `multiline="true" wordWrap="true"` (cho phép xuống dòng TRONG ô của chính nó thay vì tràn ngang), giảm `size` 18→14 (cần thiết vì không gian dọc trong ô rất hẹp — icon chiếm phần trên, `timelabel` chiếm phần dưới cùng — 2 dòng ở size 18 sẽ đụng icon phía trên; đây là ngoại lệ giảm size vì việc dời vị trí đơn thuần không đủ giải quyết không gian vật lý quá chật), dời `bottom` 29→18 (lấy thêm ~11px từ khoảng trống thường bỏ không của `timelabel` — nhãn này chỉ hiện chữ khi vật phẩm có hạn dùng, đa số vật phẩm vĩnh viễn nên trống).
- `DressSkin.exml`/`itemName` (nhãn nguyên liệu kích hoạt): mở rộng `width` 140→170, dời `x` 24→0 (mở rộng cân đối cả 2 bên, giữ mép phải cách mép màn hình ~5px an toàn).

Sửa đồng bộ 2 file exml + `default.thm.js` (`imageName_i` của `SkinDressItem`, `itemName_i` của `SkinDress`). Không có override động nào cho `width`/`multiline` của 2 nhãn này trong `main.min.js` (chỉ có set `.text`/`.textFlow`, không đụng layout). Đổi tên `default.thm_2cacec0b.js`→`default.thm_beef5be5.js` (cache-bust, `main.min.js` không đổi lần này). `node -c` qua, `php -l` qua, `manifest.json` hợp lệ, cả 2 exml qua `xml.etree.ElementTree.parse`.

**Lưu ý riêng — ngoại lệ nguyên tắc 10**: đây là 1 trong số ít trường hợp phải giảm size chữ (18→14 cho tên vật phẩm trong lưới) vì không gian vật lý trong ô 110×132px quá chật, dời vị trí đơn thuần không đủ chỗ cho 2 dòng mà không đụng icon phía trên — đã ưu tiên tối đa việc dời trước (bottom, width) rồi mới giảm size ở mức tối thiểu cần thiết.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh cho cả 4 tab: (1) tên vật phẩm trong lưới không còn tràn/đè lên ô bên cạnh, xuống dòng gọn trong ô riêng nếu tên dài; (2) tên nguyên liệu kích hoạt ở góc phải đỡ bị wrap xấu hơn (có thể vẫn xuống 2 dòng với tên rất dài, nhưng nên đỡ hơn nhiều so với trước); (3) với vật phẩm CÓ hạn dùng (hiện `timelabel`), kiểm tra tên vật phẩm 2 dòng có đè lên dòng đếm ngược hạn dùng hay không — đây là rủi ro đã lường trước nhưng chưa kiểm chứng được vì ảnh gửi đều là vật phẩm vĩnh viễn.

## 68. Vỡ dòng theo TỪ (không cắt giữa từ) + đồng nhất vị trí tên khi 1/2 dòng + tránh đè nút "Kích hoạt" (2026-07-08)

Người dùng gửi 4 ảnh (Hóa Hình/Ảo Vũ/Tiên Vũ/Ngự Khí) sau khi mục 67 thêm `width`+`wordWrap` cho tên vật phẩm: chữ vẫn bị xuống dòng SAI VỊ TRÍ, cắt ngay giữa từ (vd "Huyền Hạo Thượ" / "ng Khí", "Lưỡng Nghi Chân Đ" / "ế×1", "Cuồng Hoan Đồng T" / "hú×1") — nhìn rất xấu; đồng thời có item 1 dòng, có item 2 dòng, không đều nhau; và tên nguyên liệu kích hoạt khi xuống 2 dòng thì ĐÈ LÊN nút "Kích hoạt" bên dưới thay vì có khoảng cách.

**Nguyên nhân gốc**: engine Egret Label khi bật `wordWrap`/`multiline` chỉ ngắt dòng theo VỊ TRÍ KÝ TỰ (character-based), không quan tâm ranh giới từ (word boundary) — dù chuỗi có dấu cách, nó vẫn có thể cắt ngay giữa một từ nếu độ rộng tràn đúng lúc đó. Thuộc tính `wordWrap`/`multiline` chỉ quyết định CÓ xuống dòng hay không, không quyết định NGẮT Ở ĐÂU.

**Đã sửa (2 phần)**:

1. **Ngắt dòng theo từ** — thêm hàm helper mới vào `main.min.js`:
   ```js
   window.wrapVN_a94=function(s,n){for(var w=s.split(" "),l=[],c="",i=0;i<w.length;i++){var x=c?c+" "+w[i]:w[i];x.length>n&&c?(l.push(c),c=w[i]):c=x}return c&&l.push(c),l.join("\n")};
   ```
   Hàm này ghép từng từ (split theo dấu cách) vào dòng hiện tại cho đến khi vượt ngưỡng ký tự `n`, lúc đó mới xuống dòng mới — CHỈ ngắt tại chỗ có dấu cách, không bao giờ cắt giữa từ. Kết quả nối bằng `\n` thật, gán trực tiếp vào `.text`/`.textFlow` (theo đúng tiền lệ đã dùng ở mục 59/62/63: Egret render `\n` bên trong chuỗi thành xuống dòng thật).
   - Áp dụng cho tên vật phẩm trong lưới (`DressesItemRenderer.dataChanged`): `this.imageName.text = wrapVN_a94(t.zhuanban.name, 12)` (ngưỡng 12 ký tự, ước lượng từ bằng chứng "Đế Bình Tiên" 12 ký tự vừa đúng 1 dòng trong ảnh gốc).
   - Áp dụng cho tên nguyên liệu kích hoạt (`DressesWin.onUpdateInfo_a94`, cả 4 nhánh rẽ nhánh true/false của 2 điểm gọi "Nâng cấp"/"Kích hoạt"): `wrapVN_a94(GlobalConfig.ConfigItem[this.id].name+"×"+this.num, 16)` (ngưỡng 16, ước lượng từ bằng chứng "Huyền Hạo Thượng" 16 ký tự vừa đúng 1 dòng).
   - Đã dò tay ~8 ví dụ tên thật trong các ảnh gửi để kiểm tra thuật toán không còn cắt giữa từ ở cả 2 ngưỡng trên.

2. **Đồng nhất vị trí + tránh đè nút "Kích hoạt"** (`DressSkin.exml`, nhãn `itemName` trong `itemGroup`): tính lại hình học chính xác bằng số đo thật lấy từ `default.thm.js`/texture atlas (không còn ước lượng): `dressBtn` cao đúng 69px (đo từ frame `btn2_2` trong `resource/image/common/img_tj4.json`: `w:176,h:69`, không set `height` riêng trong exml nên lấy nguyên khung ảnh), `bottom="15"` trong `selectGroup` cao 300px → mép trên nút = 300-15-69 = **216**. `itemName` gốc đặt tại `y="-3"` trong `itemGroup` (y=194.34) → mép trên chữ ở 191.34, với 1 dòng cao ~25px thì mép dưới chữ đã chạm gần sát mép trên nút (216) — xuống 2 dòng chắc chắn đè. Sửa: thêm `height="50"` (đủ chỗ cho đúng 2 dòng), `verticalAlign="bottom"` (chữ luôn neo theo mép DƯỚI của khung 50px — 1 dòng cũng như 2 dòng đều có cùng mép dưới, tự động "đồng nhất" theo đúng yêu cầu, và mọc lên trên khi dài ra thay vì mọc xuống đè nút), dời `y` từ `-3`→`-38` (đưa khung 50px lên cao hơn để mép dưới dừng ở y tuyệt đối ≈206.34, cách mép trên nút "Kích hoạt" ~9.7px — có khoảng hở rõ ràng thay vì chồng lên). Đồng bộ sửa `itemName_i()` trong `default.thm.js`.
   - Riêng lưới `DressItemSkin.exml` (`imageName`, mục 67) đã dùng `bottom="18"` (neo theo mép dưới, không set `height`) — theo đúng cơ chế Egret đã ghi nhận từ trước (nhãn neo `bottom` mọc lên trên khi thêm dòng, mép dưới luôn cố định), nên đã tự "đồng nhất" mép dưới giữa các ô 1 dòng/2 dòng sẵn — không cần sửa thêm exml này, chỉ cần fix (1) ở trên là đủ để hết cắt giữa từ.

Cache-bust cả 2 file: `default.thm_beef5be5.js`→`default.thm_5e2b47b4.js`, `main.min_cefa891c.js`→`main.min_dcfb6fb4.js`. `node -c` qua cả 2, `php -l` qua `index.php`, `manifest.json` hợp lệ, `DressSkin.exml` qua `xml.etree.ElementTree.parse`.

**Lưu ý/rủi ro chưa kiểm chứng được**:
- Ngưỡng ký tự 12/16 trong `wrapVN_a94` là ƯỚC LƯỢNG dựa trên vài ví dụ thực tế trong ảnh, không phải đo pixel chính xác (do không tự render được canvas Egret) — tên rất dài hoặc rất nhiều ký tự rộng (chữ hoa, dấu) vẫn có thể cần chỉnh lại ngưỡng.
- Chưa xác nhận 100% `\n` chèn thủ công có sống sót qua `egret.HtmlTextParser` khi nằm trong `<font><u>...</u></font>` (dùng cho nhãn kích hoạt tô màu/gạch chân) — suy luận an toàn từ tiền lệ các mục trước nhưng chưa test độc lập cho đúng đoạn code này.
- Số đo hình học (216, 191.34, gap 9.7px) tính từ giá trị khai báo trong exml/thm.js + kích thước texture thật, độ tin cậy cao hơn các lần ước lượng trước, nhưng vẫn cần ảnh xác nhận thực tế vì có thể còn yếu tố line-height/leading của font "Microsoft YaHei" trong Egret chưa tính hết.

Cần người dùng gửi lại ảnh cả 4 tab (Hóa Hình/Ảo Vũ/Tiên Vũ/Ngự Khí) để xác nhận: tên trong lưới không còn cắt giữa từ; tên nguyên liệu kích hoạt xuống dòng gọn theo từ và có khoảng hở rõ với nút "Kích hoạt", không còn đè lên nhau.

### 68b. Sự cố deploy: tái sử dụng tên hash cũ khiến server không tải lại nội dung đã sửa (2026-07-09)

Người dùng gửi lại 4 ảnh xác nhận mục 68 — vẫn thấy y hệt lỗi cũ (cắt giữa từ, đè nút "Kích hoạt"). Nghi ngờ deploy chưa sync nên tải trực tiếp file đang chạy trên server (`curl http://71.31.97.241/js/main.min_dcfb6fb4.js`, `.../js/default.thm_5e2b47b4.js`) để so sánh với nội dung trong git — phát hiện **server đang chạy đúng file KHÔNG CÓ fix** (0 lần `wrapVN_a94`, 23 lần `verticalAlign="bottom"` thay vì 24) dù `manifest.json` trên server đã trỏ đúng tên file mới nhất.

**Nguyên nhân**: ở mục 68 ban đầu, commit `051ed472` (đổi tên file cache-bust) do lỗi staging chỉ chứa nội dung CŨ (chưa có fix — xem lại phần trên). Server/CDN đã đồng bộ VÀ CACHE nội dung sai đó dưới tên `default.thm_5e2b47b4.js`/`main.min_dcfb6fb4.js`. Commit vá lỗi ngay sau đó (`456d5a46`) sửa đúng nội dung nhưng **giữ nguyên tên file cũ** — vi phạm nguyên tắc nền tảng của cache-busting (tên file phải là duy nhất ứng với 1 nội dung, đổi nội dung bắt buộc phải đổi tên/hash). Vì vậy dù git đã đúng, server/CDN không có lý do để tải lại — tiếp tục phục vụ bản cache cũ vô thời hạn.

**Đã sửa**: tạo hash HOÀN TOÀN MỚI cho cả 2 file (`default.thm_9164efba.js`, `main.min_69b82e9a.js`), cập nhật `manifest.json` + `index.php`, xác minh lại bằng `grep`/`node -c` trên đúng file có hash mới trong git trước khi commit. Cũng phát hiện thêm 1 lỗi thao tác: lệnh `git add file1 file2 file3` bị fail toàn bộ (không add được gì) vì 1 trong các đường dẫn không tồn tại (đã đổi tên trước đó) — khiến 2 file cấu hình (`manifest.json`, `index.php`) bị sót khỏi commit đầu, phải commit bổ sung riêng ngay sau khi phát hiện qua `git status`.

**Bài học quy trình (áp dụng từ đây về sau, BẮT BUỘC)**:
1. Sau khi đổi tên file theo hash mới, **luôn dùng `git show HEAD:<path>` để kiểm tra NỘI DUNG THỰC SỰ nằm trong commit** (không chỉ tin tưởng `node -c`/`grep` chạy trên working tree trước khi add — 2 lần trong mục 68 nội dung working tree đúng nhưng nội dung commit lại sai do staging lỗi).
2. **Không bao giờ sửa nội dung 1 file mà giữ nguyên tên hash đã từng được commit/deploy trước đó** — dù là sửa lỗi cho chính lần deploy vừa rồi. Luôn sinh hash mới mỗi khi nội dung thực sự thay đổi so với bất kỳ lần đã push nào trước, kể cả khi đó là bản vá cho chính lỗi vừa gây ra.
3. Khi `git add` nhiều đường dẫn trong 1 lệnh, nếu có thể 1 đường dẫn đã bị đổi tên/không còn tồn tại, **tách riêng từng nhóm lệnh `git add`** hoặc kiểm tra `git status --short` ngay sau add để chắc chắn mọi thay đổi định sửa đều đã thực sự nằm trong staging area — lệnh `git add` fail 1 phần sẽ fail toàn bộ (không add gì) mà không luôn báo lỗi dễ thấy giữa nhiều dòng output khác.
4. Khi nghi ngờ ảnh xác nhận của người dùng cho thấy lỗi y hệt "vẫn còn nguyên" sau khi đã fix, **ưu tiên kiểm tra trực tiếp file đang chạy trên server thật (qua `curl` tới CDN nếu mạng cho phép) thay vì đoán do "chưa kịp sync"** — sự cố lần này lẽ ra không bao giờ tự hết dù chờ bao lâu vì bản chất là cache vĩnh viễn theo tên file, không phải độ trễ đồng bộ thông thường.
5. **`git mv oldname_HASH1.js newname_HASH2.js` trong môi trường này có thể tự stage nhầm nội dung CŨ** (bằng chứng: xảy ra lặp lại ở cả mục 69 và mục 70 — file trên đĩa đúng, `git show :path` của bản staged lại sai) dù file trên đĩa đã đúng — nguyên nhân chưa rõ (khả năng do cách `git mv` snapshot nội dung khác với `git add` thông thường trong sandbox này). Khắc phục: **sau MỌI lần `git mv` liên quan tới file vừa sửa nội dung, luôn chạy thêm `git add <newname>` một lần nữa** để buộc git đọc lại đúng nội dung hiện tại trên đĩa, rồi mới kiểm tra `git show :path` (bản staged) hoặc `git show HEAD:path` (sau khi commit) để xác nhận trước khi push — không được bỏ qua bước re-add này dù `git status` chỉ hiện "R" (rename) mà không hiện thêm "M" (modified).

## 69. Nhãn "Hợp Thành Đạo Cụ" bị xuống dòng ở màn Tru Tiên (誅仙/Heirloom) (2026-07-09)

Người dùng xác nhận mục 68 đã ổn (ảnh chụp màn "誅仙" - Tru Tiên - không liên quan trực tiếp mục 68 nhưng cùng kiểu link chữ), báo thêm: nhãn liên kết "Hợp Thành Đạo Cụ" cạnh nút "Kích hoạt" bị xuống dòng thành "Hợp Thành Đạo C" / "ụ", cần gộp lại 1 dòng.

**Xác định skin**: `heirloom.exml`/`Skinheirloom` (class dùng `id="getItemTxt"` — nhãn link gạch chân, đổi text động qua `TextFlowMaker.generateTextFlow("|U&T:"+r)` với `r` là 1 trong "Hợp Thành Đạo Cụ"/"Nhận Tru Tiên Kiếm"/"Nhận Tru Tiên Giáp"/"Phân Giải Vật Phẩm" tùy trạng thái — dài nhất ~18-19 ký tự). Gốc lỗi: `width="150"` quá hẹp (được canh sát lề phải nhóm `upInfo` rộng 500, `x="350"`→150 vừa khít mép 500), lại có `wordWrap="true" multiline="true"` nên tự động xuống dòng khi chữ dài hơn ô.

**Đã sửa**: mở rộng `width` 150→240 (đủ chỗ cho chuỗi dài nhất ~19 ký tự ở size 20, giữ `x="350"` cố định vì đó là mép trái sát nút `jihuo`/"Kích hoạt" — chỉ nới mép phải), và tắt hẳn `wordWrap="false" multiline="false"` để đảm bảo LUÔN 1 dòng bất kể chữ dài bao nhiêu (đúng yêu cầu tường minh của người dùng), thay vì chỉ nới rộng rồi hy vọng đủ. Mép phải mới ở x=590 trong khung skin rộng 600 — còn dư 10px, không chạm biên, không đụng các nút khác ở hàng này (đã kiểm tra `attrSet`/`neatSet`/`closeBtn` đều ở vị trí y khác xa).

Sửa đồng bộ `heirloom.exml` + `default.thm.js` (`getItemTxt_i` của `Skinheirloom`). Cache-bust: `default.thm_9164efba.js`→`default.thm_a6eb6afc.js` (`main.min.js` không đổi lần này). Áp dụng đúng bài học ở mục 68b: kiểm tra nội dung file có hash mới ngay trong git trước khi push, không tái dùng tên hash cũ.

Vẫn chưa render trực tiếp kiểm chứng được — cần người dùng xác nhận lại bằng ảnh: nhãn "Hợp Thành Đạo Cụ" (và các biến thể "Nhận Tru Tiên Kiếm"/"Nhận Tru Tiên Giáp"/"Phân Giải Vật Phẩm" nếu gặp trạng thái khác) nằm gọn 1 dòng, không tràn ra ngoài khung/đè lên nút khác.

## 70. Màn "境界" (Cảnh Giới/LiLian): số liệu chồng lên nhau, "5tầng/6tầng" cần đổi "Tầng 5/Tầng 6", cột "Số lần" đè lên tên nhiệm vụ (2026-07-09)

Người dùng gửi ảnh màn "境界" (Cảnh Giới, hệ thống luyện khí/thăng cấp cảnh giới), báo 3 lỗi cùng lúc:
1. Bảng nhiệm vụ bên dưới ("Tên nhiệm vụ/Số lần/Thưởng mỗi lần/Thao tác"): cột "Số lần" (vd "0/2") đè lên chữ "Tên nhiệm vụ" (vd "Pho Bản Kinh Nghiệ0/2") — yêu cầu dời cột "Số lần" và số liệu bên dưới nó sang phải.
2. Nhãn tiêu đề so sánh tầng "5tầng"/"6tầng" cần đổi thứ tự thành "Tầng 5"/"Tầng 6".
3. Khối so sánh "Sinh Lực/Công Kích" giữa tầng hiện tại và tầng kế tiếp: số liệu bên trái bị xuống dòng cắt ngay giữa số (vd "4949" thành "494"/"9") do khung quá hẹp — yêu cầu mở rộng khung bên trái để hiện 1 dòng, đồng thời dời mũi tên + thông tin tầng kế tiếp (bên phải) sang phải một chút.

**Xác định skin**: `LiLianSkin.exml`/`SkinLiLian` (khối so sánh tầng + bảng nhiệm vụ) và `LiLianItemSkin.exml`/`SkinLiLianItem` (từng dòng trong danh sách nhiệm vụ, list `id="list"`).

**Lỗi 1 — cột "Số lần" đè "Tên nhiệm vụ"**: trong `LiLianItemSkin.exml`, `nameTxt` (tên nhiệm vụ) hoàn toàn KHÔNG có `width` giới hạn — với tên dài (vd "Pho Bản Kinh Nghiệm"), Label tự giãn theo nội dung, tràn thẳng vào vị trí cố định `x="200"` của `descTxt` (số lần). Sửa: thêm `width="175"` cho `nameTxt` (đổi `textAlign` "center"→"left" cho nhất quán vì giờ đã có khung riêng), dời `descTxt` (Số lần) `x` 200→225, dời `liLianNumTxt` (Thưởng mỗi lần) `x` 335→355 — đồng thời dời luôn 2 nhãn tiêu đề cột tương ứng trong `LiLianSkin.exml` (`x="200"`→`225`, `x="331"`→`350`) để khớp cột với nội dung bên dưới.

**Lỗi 2 — "5tầng"/"6tầng"**: 2 chỗ gán text trong `main.min.js`: `this.levelLabel.text=e.trainlevel+"tầng"` → đổi thành `"Tầng "+e.trainlevel`; `this.levelLabel0.text=s.trainlevel+"tầng"+a` → đổi thành `"Tầng "+s.trainlevel+a` (giữ nguyên hậu tố `a` — tên cảnh giới đặc biệt chỉ xuất hiện khi lên đúng tầng 1 của 1 mốc mới).

**Lỗi 3 — số liệu cắt giữa số + mũi tên/tầng kế tiếp cần dời phải**: đây là biến thể của đúng lỗi đã gặp ở mục 66 (`AttributeData.getAttStr` sinh chuỗi nhiều dòng, Label tự wrap theo ký tự khi width hẹp) — cùng cách sửa: mở khung `width`, KHÔNG đổi logic sinh chuỗi. Nhóm chứa `attrTxt`(trái)/`cursor`(mũi tên)/`nextTxt`(phải) vốn đặt trong `Group` rộng 280 (bám `right=16` vào panel 600px) với 3 phần tử gần như chạm nhau (khe hở ~0-2px, một số điểm còn âm/đè lên nhau) — widen `attrTxt` không có chỗ trống để "nở ra" mà không đụng `cursor` ngay. Sửa: nới rộng luôn cả khối `Group` chứa cả 3 (280→340, `right` 16→4, chiếm thêm ~12px lề phải dư sẵn của panel), rồi bên trong: `attrTxt` width 120→170 (đủ chỗ "Sinh Lực： 4949" 1 dòng ở size 18), `cursor` dời phải (`right` 83→85, do khung mẹ rộng hơn nên vị trí tuyệt đối dời phải dù số cục bộ gần như không đổi), `nextTxt`+`levelLabel0` dời phải theo (`horizontalCenter` 92/92.5→131), `levelLabel`+`attrTxt` căn lại tâm (`horizontalCenter` -80→-85). Nới luôn nền mờ phía sau (`_Rect4`/Rect nội bộ) từ width 291→350 để phủ đủ khối đã rộng ra, tránh lòi rìa `attrTxt`/`nextTxt` ra ngoài nền. Đã kiểm tra khoảng trống bên trái (ảnh trang trí cờ/lá cờ ở x=23-117, mũi tên/số liệu ở x≥256 sau khi nới) không bị đụng.

Sửa đồng bộ 3 chỗ: `LiLianSkin.exml`, `LiLianItemSkin.exml`, `default.thm.js` (`levelLabel_i`, `attrTxt_i`, `cursor_i`, `levelLabel0_i`, `nextTxt_i`, `_Group4_i`, `_Rect4_i`, `_Label6_i`/`_Label7_i` của `SkinLiLian`; `nameTxt_i`, `descTxt_i`, `liLianNumTxt_i` của `SkinLiLianItem`) + `main.min.js` (2 chỗ gán `levelLabel`/`levelLabel0`). Cache-bust: `default.thm_a6eb6afc.js`→`default.thm_125b690d.js`, `main.min_69b82e9a.js`→`main.min_a154f51e.js`. Đã kiểm tra nội dung thực trong git commit khớp working tree trước khi push (theo đúng bài học mục 68b/69), `node -c` qua cả 2 JS, `php -l` qua, `manifest.json` hợp lệ, cả 2 exml qua `xml.etree.ElementTree.parse`.

**Lưu ý/rủi ro chưa kiểm chứng được**:
- Độ rộng 170px cho `attrTxt` và các khoảng dời (~10-20px) là ước lượng dựa trên số ký tự hiển thị trong ảnh, không đo pixel chính xác — số liệu rất dài (6+ chữ số) vẫn có thể cần điều chỉnh thêm.
- Chưa xác nhận cột "Thao tác" (`goOnTxt`/`sureImg`, `right="13"` trong `LiLianItemSkin.exml`) có đủ khoảng cách với `liLianNumTxt` mới (x=355) hay không — theo tính toán còn khoảng ~13px, hơi hẹp nhưng không âm.
- Nhãn ribbon "练气" (tiêu đề cảnh giới hiện tại, ảnh `juewei_0_8_png`) vẫn còn tiếng Trung chưa dịch — đây là ảnh asset có chữ Hán vẽ sẵn, không sửa được qua text, nằm ngoài phạm vi yêu cầu lần này.

Cần người dùng gửi lại ảnh xác nhận: (1) bảng nhiệm vụ không còn số đè lên tên; (2) tiêu đề hiển thị đúng "Tầng 5"/"Tầng 6"; (3) khối so sánh Sinh Lực/Công Kích bên trái hiện gọn 1 dòng mỗi thông số, mũi tên và cột bên phải không còn sát/đè vào cột trái.

## 71. Sửa lại bảng nhiệm vụ màn Cảnh Giới (LiLian) — mục 70 làm rối thêm thay vì đơn giản chỉ dời cột (2026-07-09)

Người dùng xác nhận khối "Sinh Lực/Công Kích" (phần chính của mục 70) đã đẹp, nhưng báo bảng nhiệm vụ bên dưới bị "chồng chéo tùm lum" — TỆ HƠN trước khi sửa. Chỉ ra 2 việc cụ thể: (1) đáng lẽ chỉ cần dời cột "Số lần" sang phải một chút là đủ, không cần đổi gì thêm; (2) đổi cụm "Tiêu hao Lịch Luyện：" thành "Lịch Luyện:".

**Tự nhận sai lầm của mục 70**: đã mắc 2 lỗi cùng lúc khi sửa bảng nhiệm vụ:
1. Thêm `width="175"` cho `nameTxt` (tên nhiệm vụ) — nhưng Label mặc định tự XUỐNG DÒNG khi có `width`, biến 1 dòng thành 2 dòng (vd "Pho Bản Kinh Nghiệm" → "Pho Bản Kinh Nghi"/"ệm"), phá vỡ layout hàng cố định cao 43px, DÀY THÊM vấn đề thay vì đơn giản ngăn tràn chữ.
2. Dời luôn cả cột "Thưởng mỗi lần" (335→355 ở item, 331→350 ở tiêu đề) dù cột này KHÔNG hề bị lỗi ban đầu (đã có sẵn khoảng hở ~135px với cột "Số lần" cũ) — việc dời không cần thiết này đẩy nó chạm/đè vào cột "Thao tác" ở hàng tiêu đề ("Thưởng mỗi lần" + "Thao tác" dính vào nhau thành "...lài Thao tác").

**Đã sửa lại (theo đúng yêu cầu tối thiểu của người dùng)**:
- `nameTxt`: giữ `width="200"` (đủ chỗ cho tên ~19-20 ký tự ở size 21 không tràn) nhưng thêm `wordWrap="false" multiline="false"` để CHẶN xuống dòng — nếu có tên hiếm gặp dài hơn nữa thì tràn nhẹ ra ngoài (đọc được, 1 dòng) thay vì vỡ thành 2 dòng phá layout.
- `descTxt`/"Số lần": dời x 200 gốc → 245 (đủ chỗ sau `nameTxt` rộng 200 + khoảng hở nhỏ).
- `liLianNumTxt`/"Thưởng mỗi lần": TRẢ VỀ x=335 (giá trị gốc, không đổi) — vì cột này chưa từng có vấn đề.
- Tiêu đề bảng: `Số lần` x→245 (khớp cột dưới), `Thưởng mỗi lần` TRẢ VỀ x=331 (giá trị gốc).
- `Lịch Luyện:` : đổi text từ "Tiêu hao Lịch Luyện：" (dấu hai chấm kiểu Trung `：`) thành "Lịch Luyện:" theo đúng yêu cầu.

**Bài học**: khi chỉ 1 phần tử bị lỗi tràn (ở đây là `nameTxt`), chỉ nên đụng tới đúng phần tử đó và phần tử NGAY SAU nó — không lan sang các cột xa hơn vốn dĩ đang ổn, kể cả khi "dời cho cân bằng/đẹp" nghe hợp lý; mỗi cột dời thêm là một điểm rủi ro overlap mới với hàng xóm bên phải nó. Ưu tiên thay đổi tối thiểu (minimal diff) đúng theo yêu cầu gốc, không tự ý mở rộng phạm vi sửa.

Sửa đồng bộ `LiLianSkin.exml`, `LiLianItemSkin.exml`, `default.thm.js` (`nameTxt_i`, `descTxt_i`, `liLianNumTxt_i` của `SkinLiLianItem`; `_Label6_i`, `_Label7_i`, và Label "Lịch Luyện:" của `SkinLiLian`). `main.min.js` không đổi lần này. Cache-bust: `default.thm_125b690d.js`→`default.thm_8793532b.js`. Đã kiểm tra nội dung staged bằng `git show :path` ngay sau `git mv`+`git add` (đúng quy trình rút ra ở mục 70), `node -c` qua, `php -l` qua, `manifest.json` hợp lệ, cả 2 exml qua `xml.etree.ElementTree.parse`.

Cần người dùng xác nhận lại: tên nhiệm vụ dài hiện đủ chỗ 1 dòng, cột "Số lần" không đè tên, cột "Thưởng mỗi lần" không đè "Thao tác" ở cả tiêu đề lẫn từng dòng, nhãn "Lịch Luyện:" hiển thị đúng.

## 72. Quét toàn bộ main.min.js: chữ dính liền số do thiếu khoảng trắng ở ranh giới nối chuỗi (2026-07-09)

Người dùng chỉ ra ảnh hộp thoại "Có xác nhận tiêu8650Nguyên Bảo để lấy lại86500điểm Uy Vọng?" — chữ dính liền số ở NHIỀU chỗ do thiếu dấu cách, không chỉ riêng hộp thoại này, yêu cầu dò toàn bộ.

**Nguyên nhân gốc**: các chuỗi thông báo tiếng Việt được ghép bằng `+` với biến số (vd `"Có xác nhận tiêu"+X+"Nguyên Bảo..."`) nhưng người dịch (bản dịch gốc trước khi vào tay Claude, từ tiếng Trung sang tiếng Việt) không thêm dấu cách ở 2 đầu biến — tiếng Trung không cần khoảng trắng giữa chữ và số nên bản gốc không có, nhưng tiếng Việt thì cần. Đây là lỗi mang tính HỆ THỐNG lặp lại ở hàng trăm chỗ trong `main.min.js`, không phải lỗi UI layout như các mục trước.

**Cách dò**: viết script Python quét toàn bộ `main.min.js`, tìm mọi ranh giới `"CHUỖI1"+BIỂU_THỨC+"CHUỖI2"` (dùng regex với **lookahead** cho CHUỖI2 thay vì "ăn" luôn nó vào match — kỹ thuật bắt buộc để xử lý đúng CHUỖI dài từ 3 mảnh trở lên nối tiếp nhau, vd `"A"+X+"B"+Y+"C"`: nếu dùng match tuần tự thông thường không lookahead, sau khi khớp cặp (A,B) thì B đã bị "tiêu thụ", vòng quét tiếp theo không bao giờ khớp lại cặp (B,C) — đây là lỗi đã tự phát hiện và sửa giữa chừng khi kiểm tra lại đúng câu người dùng báo vẫn còn thiếu dấu cách ở vế thứ 2 sau lần sửa đầu tiên). Chỉ xét ranh giới có CHUỖI1 hoặc CHUỖI2 chứa ký tự có dấu tiếng Việt (lọc theo bộ ký tự có dấu, tránh đụng vào các chuỗi kỹ thuật/tên biến/tên sự kiện không phải văn bản hiển thị). Bỏ qua các ranh giới mà phần biểu thức ở giữa chứa dấu `=` "trần" (không phải `==`/`!=`/`<=`/`>=`) — dấu hiệu regex bắt nhầm qua ranh giới 2 câu lệnh riêng biệt (vd `o].text=n.info[o].multiple` — không phải 1 biểu thức thật, loại khỏi danh sách sửa để an toàn, 6 trường hợp bị loại).

**Đã sửa**: thêm dấu cách vào đúng 2 đầu của biến số trong 345 ranh giới nối chuỗi khắp `main.min.js` (499 lần chèn dấu cách, có ranh giới cần thêm cả 2 bên, có ranh giới chỉ cần 1 bên tùy chuỗi kế cận đã có sẵn khoảng trắng hay chưa). Bao gồm rất nhiều mẫu lặp lại: "VIP"+cấp+"Có thể mua", "bậc"+n+"sao", "giờ"+n+"phút", "Nạp tích lũy"+n+"Nguyên Bảo", "thứ"+n+"tầng", "Xác nhận sử dụng"+tên+"...", "Tăng thêm"+n+"điểm...", v.v. Đã quét riêng `default.thm.js` (skin biên dịch) bằng cùng kỹ thuật — không phát hiện trường hợp nào cần sửa (khớp với lý do: skin chỉ chứa text tĩnh khai báo sẵn, việc ghép chuỗi động chỉ xảy ra trong `main.min.js`).

Xác minh: sau khi sửa, quét lại chính file đã sửa bằng cùng script → 0 ranh giới còn thiếu dấu cách (đảm bảo không sót do lỗi kỹ thuật đã gặp ở lần quét đầu). `node -c` qua. Cache-bust `main.min_a154f51e.js`→`main.min_59825bff.js` (`default.thm.js` không đổi lần này, nhưng `manifest.json` đổi nội dung nên `index.php` vẫn cần đổi `?v=` để buộc tải lại `manifest.json`, dùng hash mới `a31bc3be` riêng cho việc này thay vì tái dùng hash của `default.thm.js`).

**Rủi ro/lưu ý chưa kiểm chứng được**:
- Không thể quét 100% các trường hợp — script chỉ bắt được ranh giới dạng `"chuỗi"+biến+"chuỗi"` (biến đứng giữa 2 chuỗi trực tiếp qua toán tử `+`). Các dạng phức tạp hơn (biến nằm trong hàm `String.format`, template khác, hoặc text được build qua vòng lặp nối chuỗi kiểu khác) không nằm trong phạm vi quét này — nếu người dùng vẫn thấy dính chữ ở chỗ khác dạng khác, cần báo cụ thể để dò riêng.
- Đây là thay đổi PHẠM VI RẤT RỘNG (345 vị trí khắp toàn bộ file logic), rủi ro cao hơn các lần sửa UI cục bộ trước — dù chỉ thêm ký tự khoảng trắng vào NỘI DUNG chuỗi (không đụng logic/biến/cấu trúc code) nên về lý thuyết an toàn, nhưng cần người dùng dạo qua nhiều tính năng khác nhau (không chỉ màn Uy Vọng) để phát hiện nếu có chỗ nào bị thêm khoảng trắng không mong muốn (vd trường hợp hiếm 1 chuỗi vốn dùng làm khóa/định danh kỹ thuật nhưng tình cờ chứa ký tự có dấu tiếng Việt trùng hợp).
- Đã loại trừ an toàn 6 trường hợp nghi ngờ (regex bắt nhầm qua ranh giới câu lệnh `.text=`) — nếu có báo lỗi dính chữ ở các màn liên quan đến các biến `multiple`, `time`, `num`, `lilian`, `name`, thì đây có thể là các trường hợp bị bỏ sót có chủ đích, cần dò tay riêng.

Cần người dùng dạo qua nhiều màn hình khác nhau (không chỉ Uy Vọng) để xác nhận: (1) hộp thoại "Có xác nhận tiêu... Nguyên Bảo để lấy lại... điểm Uy Vọng?" đã có khoảng cách đúng; (2) các thông báo/nhãn khác có số xen giữa chữ (VIP, bậc/sao, giờ/phút, nạp tích lũy, v.v.) đã tách rời rõ ràng; (3) báo lại nếu còn sót chỗ nào để dò tiếp.

## 73. Nhãn "Xem trước Uy Vọng" đè lên huy hiệu tước hiệu (WeiWangSkin) (2026-07-09)

Người dùng xác nhận mục 72 tạm ổn, báo thêm ở màn Uy Vọng (chính màn vừa sửa): dòng "Hiện tại：[huy hiệu tước hiệu]Xem trước Uy Vọng" — chữ "Xem trước Uy Vọng" (link xanh gạch chân) đè lên huy hiệu tước hiệu (ảnh `myTitle`, có chữ Hán "名不見传" vẽ sẵn trong texture, không dịch được vì là ảnh), yêu cầu dời "Xem trước Uy Vọng" sang phải.

**Xác định**: `WeiWangSkin.exml`, nhãn `overViewTxt` (`horizontalCenter="95"`) và ảnh `myTitle` (`left="75" width="111"`, mép phải ở local x=186) cùng nằm trong 1 `Group` rộng 254px. Với `horizontalCenter=95` (tâm nhãn ở local x=222, không có `width` nên tự giãn theo nội dung ~198px ở size 20), mép trái nhãn rơi vào khoảng x=123 — chồng thẳng lên mép phải huy hiệu (186), khớp với hiện tượng "传Xem trước..." dính vào nhau trong ảnh.

**Đã sửa**: chỉ đổi `horizontalCenter` của `overViewTxt` từ `95`→`170` (dời sang phải ~75px, đủ để mép trái nhãn vượt qua mép phải huy hiệu (186) kèm khoảng hở), không đổi gì khác (đúng bài học tối thiểu-thay-đổi ở mục 71) — kiểm tra mép phải nhãn sau khi dời vẫn nằm trong khung skin 600px, không chạm biên hay đụng các nút/ảnh khác ở vùng lân cận.

Sửa đồng bộ `WeiWangSkin.exml` + `default.thm.js` (`overViewTxt_i` của `SkinWeiWang`). `main.min.js` không đổi. Cache-bust: `default.thm_8793532b.js`→`default.thm_4e8b9dcb.js`. Đã xác minh nội dung staged bằng `git show :path` ngay sau `git mv`+`git add` trước khi commit (đúng quy trình mục 70), `node -c` qua, `php -l` qua, `manifest.json` hợp lệ, exml qua `xml.etree.ElementTree.parse`.

Cần người dùng xác nhận lại: "Xem trước Uy Vọng" không còn đè lên huy hiệu tước hiệu, đọc rõ cả 2 phần.

## 74. Dịch tiêu đề/nội dung mail hệ thống — LẦN ĐẦU sửa file config phía SERVER, không phải client (2026-07-09)

Người dùng gửi ảnh hộp thư trong game (tab "Gần đây"/mail), báo nhiều tiêu đề mail hệ thống gửi vẫn còn tiếng Trung (vd "杀戮榜排名奖(Chưa đọc)", "月卡奖励元宝(Đã đọc)", "每日历练奖励补发(Đã đọc)", "弥罗珍宝殿(Đã đọc)"), yêu cầu dò và dịch hết cho đồng bộ.

**Khác biệt quan trọng so với tất cả các mục trước**: đây là LẦN ĐẦU TIÊN trong phiên làm việc này phải sửa file thuộc **phía SERVER** (`server/bin/s1/gameworld/data/config/**/*.config`) thay vì file client (`phpStudy/PHPTutorial/WWW/...`). File `.config` là bảng dữ liệu dạng cú pháp giống Lua table (`KeyName={ field = "giá trị", ... }`), do server game (file `.exe` C++ Windows, không chạy trong sandbox này) đọc để sinh nội dung mail động.

**Đã cố gắng hỏi người dùng qua `AskUserQuestion`** về (1) server có tự hot-reload config hay cần restart tiến trình `gameworld` mới áp dụng, và (2) có nên sửa toàn bộ hay chỉ giới hạn `mail.config` chính — nhưng **cả 2 lần gọi đều lỗi "Tool permission request failed: stream closed"** (không rõ do container bị restart giữa chừng hay do môi trường không hỗ trợ tool này lúc đó). Sau khi container restart và không nhận được phản hồi, **đã tự quyết định tiến hành dịch toàn bộ** dựa trên yêu cầu rõ ràng ban đầu của người dùng ("xem còn cái gì thì dịch cho đồng bộ luôn"), vì đây thuộc đúng tinh thần công việc đã làm xuyên suốt phiên (dịch nốt phần còn sót tiếng Trung), nhưng **CHƯA XÁC NHẬN ĐƯỢC** liệu sửa file config có cần restart server để áp dụng hay không — đây là rủi ro/điểm mù lớn nhất của mục này, khác hẳn các mục trước (client JS/exml luôn tự động đồng bộ, đã kiểm chứng nhiều lần qua `curl` trực tiếp tới CDN).

**Phạm vi đã dò và dịch** (dò bằng script Python quét toàn bộ cây thư mục `data/config/`, tìm mọi field có tên chứa `mail/title/head/context/content` mà giá trị còn chứa ký tự tiếng Trung — quét lặp lại nhiều vòng vì mỗi vòng lại lộ ra thêm file/field mới chưa từng nghĩ tới):
- `language/lang/mail.config` (75 dòng, ~50 field) — bảng tiêu đề/nội dung mail cho boss dã ngoại, bảng xếp hạng mở server, v.v. — viết lại toàn bộ file bằng tool Write (đã đối chiếu số lượng key và thứ tự key trước/sau bằng script Python, khớp 100% — chỉ giá trị đổi, cấu trúc/khóa giữ nguyên).
- `mail/mail.config` (101 mục, file mail cố định theo ID — chúc mừng lên cấp/chuyển sinh, quà mở server theo ngày, mùa giải Đỉnh Phong, cá cược, bảng xếp hạng nhân khí, v.v.) — dịch bằng kết hợp regex cho các mẫu lặp lại theo số (cấp N, chuyển sinh N, ngày N, hạng N) + dịch tay cho các mục duy nhất.
- 39 file `.config` khác rải rác khắp các tính năng (thành phố/BOSS hợp server, quà gộp nhóm, đổi quà, tiên minh/trấn yêu, thẻ tháng/đặc quyền, BOSS thế giới, BOSS chuyển sinh, đấu giá, cạnh tranh liên server, đại chiến phe phái, phó bản tiên đồ tổ đội, vương giả tranh bá, lịch luyện, nạp tiền, di la trân bảo điện, chia sẻ WeChat, nhiệm vụ giới hạn thời gian, vô cực chiến trường, ảo hóa hết hạn, hoạt động nạp tích lũy các loại, v.v.) — dịch bằng thay thế chuỗi chính xác (exact string match trên toàn bộ giá trị `"..."`, giữ nguyên `%s`/`%d`/markup `|C:màu&T:chữ|`).

**Quy trình an toàn áp dụng cho tất cả 41 file**:
1. Trước mỗi lần thay thế: đếm số dấu `{`/`}`/`"` trong file.
2. Sau khi thay thế: đối chiếu lại — bắt buộc khớp tuyệt đối (đảm bảo không vô tình phá cấu trúc bảng hay làm lệch số dấu ngoặc kép khi chuỗi tiếng Việt mới chứa ký tự đặc biệt).
3. Kiểm tra mỗi khóa dịch đều khớp được ít nhất 1 lần trong file (`zero_hits` rỗng) — tránh trường hợp dịch nhầm chuỗi không tồn tại (lỗi gõ) mà không hay biết.
4. **Xác thực cú pháp Lua THẬT** bằng `lua5.3 -e "load(content)"` (không chỉ đếm ngoặc) cho toàn bộ 41 file — 40/41 qua thẳng; file `language/lang/mail.config` báo lỗi cú pháp ở dấu phẩy thừa sau dấu `}` đóng bảng cấp cao nhất — đã **xác minh lại bằng `git show HEAD:...`** rằng bản GỐC (trước khi Claude sửa) cũng lỗi y hệt qua cùng phép thử → kết luận đây là đặc điểm sẵn có của file (server dùng parser tùy biến khoan dung hơn `lua5.3` chuẩn, không phải lỗi do sửa) — không phải regression, an toàn.

**Chưa làm/rủi ro còn lại**:
- Chưa xác nhận cơ chế deploy/reload cho server config (câu hỏi gửi người dùng bị lỗi tool, chưa có câu trả lời) — người dùng cần tự kiểm tra xem có cần restart tiến trình `gameworld` (thư mục `server/bin/s1/gameworld/`) để áp dụng hay không.
- Không chắc file trong repo git này có thật sự là bản đang chạy trên server thật (71.31.97.241:9001) hay chỉ là bản lưu/backup — khác với file client đã xác minh qua `curl` trực tiếp CDN nhiều lần, CHƯA có cách xác minh tương tự cho phía server trong phiên này.
- Có thể còn sót các field mail dùng quy ước đặt tên khác hẳn (không chứa "mail/title/head/context/content") mà script chưa bắt được — nếu người dùng vẫn thấy mail tiếng Trung sau khi deploy, cần chụp ảnh cụ thể để dò tiếp theo đúng tên field đó.
- Dịch Hán-Việt cho tên boss/tính năng (vd "Xúc Long Thần", "Yêu Ma Thượng Cổ", "Vương Giả Tranh Bá") dựa trên quy ước đã thấy trong ảnh chụp màn hình trước đó và cách dịch monster.config hiện có — không đối chiếu được 100% với văn bản gốc client cho MỌI tên (do khối lượng quá lớn), có thể có vài chỗ tên khác với cách gọi trong UI client, cần người dùng đối chiếu khi thấy mail thật.

Không cache-bust/không đổi `manifest.json`/`index.php` lần này vì đây là file server, không thuộc pipeline cache-bust của client (`phpStudy/PHPTutorial/WWW`).

Cần người dùng: (1) xác nhận cách áp dụng thay đổi config phía server (restart cần thiết hay không); (2) sau khi áp dụng, vào lại hộp thư kiểm tra các mail cũ (mail mới gửi từ giờ trở đi mới dùng bản dịch mới, mail ĐÃ CÓ SẴN trong hộp thư trước đó có thể đã lưu title/content dạng tiếng Trung snapshot trong database, không tự đổi theo config mới — cần kiểm tra thực tế); (3) báo lại nếu còn sót mail tiếng Trung ở field/tính năng khác.

## 75. Màn "每日累充" (Nạp Hàng Ngày Tích Lũy): sửa 2 chỗ chồng chữ + item name wrap không đều (2026-07-09)

Người dùng gửi ảnh màn sự kiện nạp tích lũy hàng ngày, báo: (1) nhiều chỗ chữ chồng lên nhau; (2) tên vật phẩm trong danh sách thưởng khi xuống dòng bị cắt giữa từ, không đều 2 dòng, cần điều chỉnh độ dài.

**Xác định skin**: `DailyRechargeSkin.exml` (khung sự kiện) + `ItemSkin2.exml`/`SkinItem2` (icon thưởng, dùng chung rất nhiều nơi khác trong game) + class `DailyRechargeItemRender` (main.min.js).

**Lỗi 1 — "Thời gian còn lại:" đè lên giá trị đếm ngược**: nhãn tĩnh `"Thời gian còn lại: "` (~19 ký tự, tự giãn theo nội dung ~200px ở size 20) nhưng `actTime0` (giá trị đếm ngược) đặt cố định `left="97"` — 97px không đủ chỗ cho nhãn dài 200px nên đè lên nhau. **Cùng lỗi y hệt** cho `"Mô tả sự kiện："` (nhãn) đè lên `actInfo0` (nội dung mô tả), cũng dùng chung `left="97"`.

**Đã sửa**: dời cả `actTime0` và `actInfo0` từ `left="97"` → `left="205"` (đủ chỗ cho nhãn dài nhất "Thời gian còn lại: " ~200px), đồng thời giảm `actInfo0` từ `width="418.67"` xuống `width="311"` để giữ nguyên mép phải cũ (không tràn thêm ra ngoài khung).

**Lỗi 2 — tên vật phẩm trong danh sách thưởng chồng lên ô kế bên + cắt giữa từ**: `nameTxt` trong `ItemSkin2.exml` (skin DÙNG CHUNG cho rất nhiều danh sách vật phẩm khắp game, KHÔNG được sửa trực tiếp để tránh ảnh hưởng nơi khác) có `width="93"` nhưng không tắt wrap, Egret tự xuống dòng theo KÝ TỰ (không theo từ) khi tên dài — đúng lỗi gốc đã gặp nhiều lần trong phiên (mục 67/68/70/71). Vì `ItemSkin2` dùng chung, không thể sửa qua exml/skin — dùng đúng pattern đã có sẵn trong chính codebase gốc (`MineChoseWorkerItemRender.delayUpdataColor_a94`: gọi `TimerMgr.doTimer` sau khi list có dữ liệu, lặp qua từng item đã render bằng `getVirtualElementAt`, chỉnh trực tiếp thuộc tính của từng instance) để **chỉ áp dụng riêng cho danh sách thưởng của màn này**, không đụng đến `ItemSkin2` dùng ở nơi khác:
- Thêm hàm mới `DailyRechargeItemRender.prototype.fixRewardName_a94`: sau khi `reward.dataProvider` được gán, đợi 50ms (`TimerMgr.doTimer`) rồi lặp qua từng item đã render, set `nameTxt.width=90` (khớp khoảng cách giữa các ô), `nameTxt.size=14` (giảm nhẹ từ 16, cần thiết vì tên dài nhất ~21 ký tự không đủ chỗ trong 2 dòng ở size 16 tại độ rộng 90px — ngoại lệ nguyên tắc 10 đã áp dụng ở mục 67), bật `multiline`/`wordWrap`, và gán `nameTxt.text = wrapVN_a94(tên gốc, 10)` — tái sử dụng đúng hàm ngắt từ đã viết ở mục 68, không định nghĩa lại.

Sửa đồng bộ `DailyRechargeSkin.exml` + `default.thm.js` (`actTime0_i`, `actInfo0_i` của `DailyRechargeSkin` — xác định đúng bằng số dòng cụ thể vì `actTime0_i`/`actInfo0_i` là tên hàm DÙNG CHUNG bởi ~7 skin khác nhau trong file, không dùng grep tổng quát) + `main.min.js` (`DailyRechargeItemRender.dataChanged` + hàm mới `fixRewardName_a94`). Cache-bust cả 2 file: `default.thm_4e8b9dcb.js`→`default.thm_7a7ef2f6.js`, `main.min_59825bff.js`→`main.min_17058af2.js`. Đã xác minh nội dung staged đúng vị trí dòng cụ thể (không chỉ khớp tên hàm, vì tên hàm trùng ở nhiều nơi) trước khi commit, `node -c` qua, `php -l` qua, `manifest.json` hợp lệ, exml qua `xml.etree.ElementTree.parse`.

**Chưa sửa — nghi ngờ không thuộc phạm vi skin này**: ảnh còn cho thấy 1 dòng thông báo dạng "...Emmaban đã nhận Gói Nạp Hàng Ngày trị giá 32888 Nguyên Bảo" đè lên vùng mô tả sự kiện — không tìm thấy chuỗi này trong `DailyRechargeSkin`/`main.min.js` qua tra cứu trực tiếp, nghi là banner thông báo TOÀN CỤC (kiểu marquee hiển thị giao dịch của người chơi khác) render đè lên MỌI cửa sổ đang mở tại vị trí cố định gần đầu màn hình, không phải lỗi riêng của skin này — cần thêm ảnh/thông tin xác nhận trước khi có thể dò tiếp (không chắc đây có sửa được từ phía UI của popup này hay không, vì nếu banner nằm ở layer cao hơn thì phải sửa NƠI banner được tạo, không phải nơi nó đè lên).

Cần người dùng xác nhận lại: "Thời gian còn lại"/"Mô tả sự kiện" không còn đè lên giá trị đi kèm, tên vật phẩm trong danh sách thưởng xuống dòng gọn theo từ và không tràn sang ô bên cạnh.

## 76. Mục 75 sửa chưa đủ — bỏ ước lượng pixel, chuyển sang HorizontalLayout để hết đoán mò (2026-07-09)

Người dùng xác nhận banner "Emmaban đã nhận..." đúng là thông báo hệ thống, bỏ qua — nhưng gửi ảnh mới cho thấy **"Thời gian còn lại"/"Mô tả sự kiện" VẪN đè lên giá trị đi kèm y hệt trước khi sửa**, dù đã đổi `left` từ 97→205 ở mục 75.

**Kiểm tra trước khi sửa tiếp** (đúng bài học mục 68b): tải trực tiếp `default.thm_7a7ef2f6.js` đang chạy trên server thật (`curl http://71.31.97.241/js/...`) để loại trừ khả năng chưa deploy — xác nhận file đã đúng nội dung mục 75 (left=205) **NHƯNG người dùng vẫn thấy đè lên** → kết luận: bản sửa mục 75 ĐÃ chạy đúng, nhưng con số 205px tôi ước lượng cho độ rộng chữ "Thời gian còn lại: " là **sai, chưa đủ dài** — ước lượng ~10.5px/ký tự không khớp thực tế (không tự render được canvas Egret để đo chính xác nên đây luôn là rủi ro đã cảnh báo trước).

**Quyết định**: thay vì tiếp tục đoán 1 con số lớn hơn (có thể lại sai lần nữa), **chuyển hẳn sang `HorizontalLayout`** cho 2 hàng "Thời gian còn lại: [giá trị]" và "Mô tả sự kiện：[nội dung]" — bọc mỗi cặp nhãn+giá trị vào 1 Group con dùng `HorizontalLayout gap="0" verticalAlign="middle"`, để engine TỰ đo độ rộng thật của nhãn và đặt giá trị ngay sau, loại bỏ hoàn toàn việc đoán pixel. Đây là cách làm ĐÚNG NGUYÊN TẮC hơn — không dựa vào ước lượng font-metric nữa mà để Egret tự tính, đảm bảo không lặp lại lỗi tương tự nếu sau này đổi cỡ chữ/nội dung nhãn.

Sửa: `DailyRechargeSkin.exml` — tách `_Group` chứa 4 label thành 2 sub-`Group` (`_TimeRow`, `_DescRow`), mỗi sub-Group có `HorizontalLayout`, bỏ hết `left`/`x`/`top`/`bottom` cố định trên từng Label con (để layout tự sắp). `default.thm.js` — thêm 2 hàm Group mới (`_TimeRow_i`, `_DescRow_i`) + 2 hàm layout (`_TimeRowLayout_i`, `_DescRowLayout_i`), dọn bỏ thuộc tính vị trí cứng khỏi `_Label1_i`/`actTime0_i`/`actInfo0_i`/`_Label2_i` — xác định đúng vị trí cần sửa bằng cách đọc trực tiếp theo SỐ DÒNG cụ thể trong class `DailyRechargeSkin` (không dùng tên hàm chung chung vì `_Label2_i`/`actTime0_i` trùng tên ở hàng trăm chỗ khác trong file).

Cache-bust: `default.thm_7a7ef2f6.js`→`default.thm_7c15b5b4.js` (`main.min.js` không đổi lần này). Đã xác minh nội dung staged đúng đoạn code mới (`_TimeRow_i`/`_DescRow_i`) trước khi commit, `node -c` qua, `php -l` qua, `manifest.json` hợp lệ, exml qua `xml.etree.ElementTree.parse`.

**Lưu ý**: cách làm HorizontalLayout này đáng tin cậy hơn hẳn so với đoán `left=`, nên ưu tiên dùng cho các trường hợp "nhãn tĩnh + giá trị động đặt ngay sau" tương tự gặp phải sau này trong phiên, thay vì đoán pixel ngay từ đầu.

Cần người dùng xác nhận lại bằng ảnh: "Thời gian còn lại"/"Mô tả sự kiện" đã tách rời rõ ràng khỏi giá trị đi kèm.

## 77. Mục 76 vẫn không hết — hóa ra đã sửa NHẦM SKIN suốt từ mục 75 (2026-07-09)

Người dùng gửi lại ảnh xác nhận: ảnh 1 ("每日累充") vẫn đè y hệt trước ("Thời gian cônglại41phút26giây", "Mô tả sự kiMỗi ngày nạp đủ..."); ảnh 2 là 1 skin KHÁC "三日连充" (3 ngày nạp liên tục) cũng bị lỗi y hệt. Người dùng cho biết đã tự tải file mới về chép đè thủ công nhưng không thấy đổi gì.

**Kiểm tra deploy trước khi nghi ngờ code sai** (đúng quy trình mục 68b/76): tải trực tiếp `default.thm_7c15b5b4.js` từ server thật — xác nhận bản sửa `HorizontalLayout` ở mục 76 **ĐÃ CÓ TRÊN SERVER ĐÚNG NHƯ COMMIT**, không phải lỗi deploy. Vậy tại sao người dùng vẫn thấy lỗi y hệt?

**Phát hiện nguyên nhân thật**: từ mục 75, tôi đã xác định NHẦM skin ngay từ đầu! Tìm bằng cách grep chuỗi `"Thời gian còn lại"`/`"Mô tả sự kiện"` ra rất nhiều file, tôi chọn đại `DailyRechargeSkin.exml` (dùng bởi class `DailyRechargeItemRender`, id `actTime0`/`actInfo0`) vì nó khớp text — nhưng **màn hình thật người dùng đang xem lại dùng skin khác: `OSADailyRechargeSkin.exml`** (dùng bởi class `OSATarget0Panel3`, id `actTime`/`actDesc` — KHÔNG có số "0" ở cuối, và values hoàn toàn khác biến/khác cấu trúc). Cả 2 skin đều có tiêu đề gần giống, đều dùng chung 2 câu text tĩnh "Thời gian còn lại: " / "Mô tả sự kiện：", dễ nhầm lẫn nếu chỉ dò bằng text search mà không xác nhận chéo qua tên skin/class thực sự đang mở. Tương tự, "三日连充" hóa ra là `LoopRechargeSkin.exml` (`SkinLoopRecharge`, dùng bởi `OSATarget0Panel4`) — một skin THỨ BA hoàn toàn khác, cũng lặp lại đúng lỗi.

**Bài học quan trọng**: khi 1 khung UI xuất hiện ở NHIỀU màn hình có tên/tiêu đề gần giống nhau (ở đây: "每日累充" xuất hiện dùng CẢ 2 skin `DailyRechargeSkin` VÀ `OSADailyRechargeSkin` tùy ngữ cảnh nào mở nó — có thể do server mới mở dùng skin "OSA" riêng cho các sự kiện chỉ chạy trong N ngày đầu mở server), **không được chỉ dựa vào text search để xác định đúng skin** — cần xác nhận thêm qua tên hình ảnh tiêu đề (`source="biaoti_..."`), hoặc tốt hơn là xác nhận qua ID/thuộc tính đặc trưng KHÔNG trùng giữa các skin nghi ngờ (ở đây lẽ ra phải để ý `actTime0` khác `actTime`, `actInfo0` khác `actDesc` ngay từ mục 75).

**Đã sửa cả 2 skin còn lại đúng theo pattern HorizontalLayout đã dùng thành công ở mục 76**:
- `OSADailyRechargeSkin.exml` (`actTime`/`actDesc`, class `OSATarget0Panel3`): tách nhóm `_Group1` thành 2 sub-Group `_TimeRow`/`_DescRow` dùng `HorizontalLayout`, dọn thuộc tính vị trí cứng khỏi các Label con — cùng cách làm hệt mục 76.
- `LoopRechargeSkin.exml` (`actInfo0` + label "Mô tả sự kiện：", class `OSATarget0Panel4`): chỉ có 1 hàng cần sửa (không có hàng "Thời gian còn lại" riêng trong skin này), áp dụng `HorizontalLayout` tương tự.
- Tên vật phẩm trong danh sách thưởng: cả `OSADailyRechargeRender` (dùng `KaifuItemBase extends ItemBase`, skin `SkinItem2`) và `OSATarget0Panel4` (dùng `BagItemBase` cho cả 3 list `reward0`/`reward1`/`reward2`) đều gặp đúng lỗi wrap-ký-tự-không-theo-từ như mục 75 — thêm `fixRewardName_a94` cho cả 2 class, tái dùng `wrapVN_a94` (không định nghĩa lại).

Sửa đồng bộ 2 exml (`OSADailyRechargeSkin.exml`, `LoopRechargeSkin.exml`) + `default.thm.js` (`_Group1_i`/`_TimeRow_i`/`_DescRow_i`/layout factories của cả 2 class, xác định đúng vị trí bằng số dòng cụ thể trong từng class) + `main.min.js` (`OSADailyRechargeRender.dataChanged`, `OSATarget0Panel4.setData` — cả 2 thêm hàm `fixRewardName_a94` mới). Cache-bust cả 2 file: `default.thm_7c15b5b4.js`→`default.thm_2b719960.js`, `main.min_17058af2.js`→`main.min_f9311d40.js`. Đã xác minh nội dung staged đúng cả 2 vị trí class trước khi commit, `node -c` qua cả 2, `php -l` qua, `manifest.json` hợp lệ, cả 2 exml qua `xml.etree.ElementTree.parse`.

**Lưu ý/rủi ro chưa kiểm chứng**: chưa loại trừ khả năng còn MỘT skin thứ 4 nào đó (vd biến thể khác của "每日累充"/"三日连充" cho các server đã mở lâu, không phải server mới) cũng lặp lại lỗi tương tự — nếu người dùng thấy còn màn nào khác bị y hệt, cần báo lại CHÍNH XÁC tiêu đề/context màn đó (đang ở đâu, bấm nút gì để vào) để tránh lặp lại nhầm lẫn đã xảy ra ở mục 75-76.

Cần người dùng xác nhận lại cả 2 skin bằng ảnh mới sau khi server đồng bộ.

## 78. Mục 77 hết đè rồi, nhưng `fixRewardName_a94` wrap sai: "Nguyên Bảo" tách dòng, tên dài bị MẤT chữ (2026-07-09)

Người dùng xác nhận ảnh mới: 2 skin mục 77 (`OSADailyRechargeSkin`, `LoopRechargeSkin`) đã hết đè chữ. Nhưng phát sinh lỗi MỚI ở đúng phần `fixRewardName_a94` mới thêm mục 77: tên vật phẩm 2 từ ngắn như "Nguyên Bảo" bị tách thành "Nguyên"/"Bảo" trên 2 dòng dù thừa chỗ để nằm 1 dòng; tên dài hơn thì hiện ra thành mảnh cụt ("Gói Đồ", "Cuộn Tầm"...) — không phải xuống dòng, mà mất hẳn phần còn lại của tên.

**Tra trực tiếp trong `main.min.js` thật (không đoán bằng Python mô phỏng) để tìm nguyên nhân**, phát hiện 2 lỗi riêng biệt trong logic `fixRewardName_a94` viết ở mục 75/77:

**Lỗi A — ngân sách ký tự (budget) của `wrapVN_a94` quá chặt**: hàm gọi `wrapVN_a94(n.text, 9)` — tức chỉ cho tối đa 9 ký tự/dòng. Nhưng `"Nguyên Bảo".length === 10` (kiểm tra trực tiếp bằng `node`, xác nhận file dùng Unicode NFC bình thường, KHÔNG phải NFD tổ hợp dấu như nghi ngờ ban đầu — giả thuyết NFC/NFD đã bị loại). 10 > 9 nên `wrapVN_a94` luôn tách "Nguyên Bảo" thành 2 dòng dù thực tế thừa chỗ hiển thị — ngân sách 9 ký tự đơn giản là đặt sai/quá chặt so với độ rộng ô thật (~70-78px ở size 14).

**Lỗi B — cuộc đua truncate 2 lần (double-truncation race), gây MẤT chữ ở tên dài**: hàm gốc có sẵn trong codebase `ItemBase.prototype.setNameText_a94` (không phải code của tôi) chạy ĐỒNG BỘ ngay khi từng item trong danh sách render (trong `dataChanged` gốc), dùng `nameTxt.width` là giá trị MẶC ĐỊNH của skin dùng chung `ItemSkin2.exml` (93px, size 16 lúc đó) — nếu chữ render ra rộng hơn 93px, hàm này CẮT DẦN ký tự và gắn ".." vào cuối (`while(s.length>1){s=s.slice(0,-1),e.text=s+"..";...}`), thực hiện TRƯỚC KHI `fixRewardName_a94` của tôi kịp chạy (vì tôi cố tình delay 50ms bằng `TimerMgr.doTimer` để chờ list render xong mới lấy được instance qua `getVirtualElementAt`). Vậy nên với tên dài, lúc `fixRewardName_a94` của tôi đọc `n.text` để wrap lại, chuỗi ĐÃ BỊ cắt cụt còn "Gói Đồ.." từ trước — tôi chỉ đang wrap lại 1 chuỗi đã hỏng, không phải tên gốc.

**Đã sửa cả 2 lỗi, tại `main.min.js`** (3 vị trí: `DailyRechargeItemRender`, `OSADailyRechargeRender`, `OSATarget0Panel4` — cả 3 hàm `fixRewardName_a94`):
- Lấy lại tên GỐC chưa bị cắt thay vì tin `n.text`: đọc `r.itemConfig.name` (vật phẩm thường, set bởi `ItemBase.dataChanged` nhánh `type==1`) hoặc gọi lại `AwardsData.getNameOfCurrency(r.data.id)` khi `r.isCurrency` (tiền tệ như Nguyên Bảo/Đồng Tiền, set bởi nhánh `type==0`) — đúng 2 nguồn dữ liệu mà chính `ItemBase.dataChanged` gốc dùng để set tên ban đầu, chỉ fallback về `n.text` nếu không khớp nhánh nào (trường hợp hiếm).
- Bỏ hẳn cách ngắt dòng theo NGÂN SÁCH KÝ TỰ đoán mò (`wrapVN_a94(text, 9)`), thay bằng hàm mới `window.wrapVN_px_a94(label, text, maxWidthPx)` — ngắt dòng theo ĐỘ RỘNG PIXEL THẬT do chính Egret đo (`label.textWidth`) giống đúng tinh thần "để engine tự đo, đừng đoán font-metric" đã rút ra ở mục 76 cho HorizontalLayout, áp dụng luôn cho bài toán word-wrap: gán thử từng từ vào `label.text`, nếu `label.textWidth` vượt `maxWidthPx` mới xuống dòng mới, không dựa vào đếm ký tự nữa nên không còn sai lệch vì Unicode/độ rộng font khác nhau giữa các ký tự.
- `maxWidthPx` dùng 78 (cho `OSADailyRechargeRender`/`OSATarget0Panel4`, ô 74px + gap 6-7px) và 88 (cho `DailyRechargeItemRender`, ô rộng hơn) — ước lượng dựa trên khoảng cách hình học thật giữa các ô (từ exml: `width`/`gap` của `List`), không phải đoán số ký tự.

`wrapVN_a94` (bản cũ, theo ký tự) vẫn giữ nguyên trong file vì được dùng ở nhiều nơi khác không liên quan (vd `DressesItemRenderer`, item nâng cấp trang phục) — không đụng vào, chỉ thêm hàm mới `wrapVN_px_a94` song song.

Cache-bust: `main.min_f9311d40.js` → `main.min_c257d04c.js` (`default.thm.js` không đổi lần này). Đã xác minh bằng `node -e` đếm đúng 4 lần xuất hiện `wrapVN_px_a94` (1 định nghĩa + 3 nơi gọi) và 0 chỗ còn sót `wrapVN_a94(n.text` (cách gọi cũ) trong file đã stage, `node -c` qua cú pháp, `manifest.json`/`index.php` (bump version query `?v=`) đã trỏ đúng hash mới.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được canvas Egret nên không chắc 78px/88px đã đủ rộng để "Nguyên Bảo"/"Đồng Tiền" nằm gọn 1 dòng và tên dài (~20 ký tự như "Gói Đồ Giám Giai Nhân") xuống 2 dòng đầy đủ không mất chữ — cần ảnh xác nhận. `r.itemConfig` đã bao phủ cả nhánh `type==1` lẫn `type==6` trong `ItemBase.dataChanged` gốc (cả 2 đều set `this.itemConfig=GlobalConfig.ConfigItem[...]`), và `r.isCurrency` bao phủ nhánh `type==0`; nếu vẫn còn tên bị cắt/mất chữ ở loại item khác, cần biết CHÍNH XÁC tên vật phẩm bị lỗi để tra thêm nhánh `dataChanged` chưa gặp (vd `ItemData` instance, nhánh đầu tiên của hàm).

## 79. Nút "Chưa hoàn thành" tràn ra ngoài nền nút — giảm font size riêng cho nhãn này (2026-07-09)

Người dùng yêu cầu (không kèm ảnh mới, tiếp nối trực tiếp mạch màn hình nạp tích lũy mục 75-78): nút hiện chữ "Chưa hoàn thành" đang to hơn nền nút, cần giảm cỡ chữ xuống 2px để chữ lọt gọn trong nền.

**Xác định phạm vi**: tra `main.min.js` tìm tất cả nơi set `.label="Chưa hoàn thành"` — có tới 13 vị trí rải khắp game (nhiều màn nạp/tích lũy khác nhau, không chỉ 3 skin đang làm việc). Vì người dùng không gửi ảnh mới và đang tiếp nối đúng mạch 3 skin vừa sửa ở mục 75/77/78, chỉ sửa đúng 3 nút thuộc 3 class đó, KHÔNG động vào 10 vị trí còn lại (thuộc tính năng khác, ngoài phạm vi đang trao đổi):
- `DailyRechargeItemRender.get` — skin `SkinBtn25` (`DailyRechargeItemSkin.exml`), nút 50×30px, cỡ chữ mặc định 20 → giảm còn 18 khi label là "Chưa hoàn thành".
- `OSADailyRechargeRender.getBtn` — skin `SkinBtn5` (`OSADailyRechargeItem.exml`), nút 140×55px (khá rộng), cỡ chữ mặc định 24 → giảm còn 22.
- `OSATarget0Panel4.get0/get1/get2` — skin `SkinBtn5` (`LoopRechargeSkin.exml`), nút 50×30px (rất chật), cỡ chữ mặc định 24 → giảm còn 22.

**Cách chỉnh font size của Button**: `id="labelDisplay"` trong skin `Btn5Skin.exml`/`Btn25Skin.exml` là tên SkinPart dành riêng được Egret EUI tự bind thẳng vào instance Button (`button.labelDisplay` truy cập được trực tiếp, không cần lách qua state) — xác nhận đúng bằng cách tìm thấy pattern y hệt đã tồn tại sẵn trong chính codebase gốc (`this.expBar.labelDisplay.size=12`), nên dùng lại đúng API này thay vì tự chế cách khác.

**Lưu ý tránh rò rỉ trạng thái do renderer/button bị tái sử dụng**: các nút này đổi nhãn qua lại giữa nhiều trạng thái ("Đã nhận"/"Nhận"/"Nhận ngay"/"Chưa hoàn thành") trên CÙNG 1 instance Button khi dữ liệu đổi (không phải tạo mới) — nếu chỉ set `labelDisplay.size` riêng cho nhánh "Chưa hoàn thành" mà không set lại kích thước mặc định ở các nhánh còn lại, cỡ chữ nhỏ có thể bị "dính" lại khi nhãn đổi sang trạng thái khác. Đã set `labelDisplay.size` tường minh ở TẤT CẢ các nhánh gán `.label` cho cả 3 nút (không chỉ nhánh "Chưa hoàn thành"), không chỉ riêng nhánh cần giảm.

Cache-bust: `main.min_c257d04c.js` → `main.min_bde097b6.js` (`default.thm.js` không đổi). Đã xác minh nội dung staged: đếm `labelDisplay.size=` xuất hiện đúng 7 lần (1 sẵn có từ trước + 6 chỗ mới thêm ở 3 nút), `node -c` qua cú pháp, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=` theo hash mới.

**Chưa kiểm chứng bằng ảnh thật**: không chắc 18px/22px đã đủ nhỏ để "Chưa hoàn thành" lọt vừa nền nút 50×30 — người dùng nói cụ thể "xuống 2px" nên làm đúng theo số đó, nhưng nếu ảnh sau vẫn tràn thì cần giảm thêm hoặc đổi cách khác (auto-scale theo `textWidth` tương tự `wrapVN_px_a94` mục 78, thay vì trừ cứng 2px). Nếu người dùng thấy còn nút "Chưa hoàn thành" khác cũng tràn chữ (trong 10 vị trí chưa đụng tới), cần chỉ rõ đang ở màn nào để tra đúng vị trí, tránh lặp lại kiểu nhầm skin đã gặp ở mục 75-77.

## 80. Màn "三日连充": chữ "Nạp thẻ 500 Nguyê" bị mất chữ giữa từ — label `target0/1/2` chưa được wrap an toàn (2026-07-09)

Người dùng gửi ảnh màn `LoopRechargeSkin` ("三日连充"): dòng mô tả điều kiện "Ngày 1（1/1）Nạp thẻ 500 Nguyê" bị mất hẳn phần "n Bảo" — không phải xuống dòng, mà biến mất. Đồng thời ảnh xác nhận 2 lỗi đã sửa trước đó (mục 77 hết đè chữ, mục 78 "Nguyên Bảo" trong ô thưởng đã nằm gọn 1 dòng) đều ĐÃ ỔN — đây là lỗi MỚI, khác vị trí.

**Xác định đúng chỗ lỗi**: nhãn bị lỗi là `target0`/`target1`/`target2` (dòng mô tả điều kiện bên trái mỗi hàng thưởng, KHÁC với `reward0/1/2` — tên vật phẩm dưới icon — đã sửa ở mục 78). Tra `main.min.js`, thấy trong `OSATarget0Panel4` nội dung được set bằng `textFlow` (rich text, có phần "(n/n)" tô màu riêng) với chuỗi dựng tay có sẵn `"\n"` sau "Ngày i(n/n)": `"Ngày "+i+a+"\n     Nạp thẻ "+o.num+" Nguyên Bảo"` — dòng 2 "     Nạp thẻ 500 Nguyên Bảo" (có 5 khoảng trắng thụt đầu dòng thừa) rộng hơn `width="189"` của label ở size 20, nên Egret tự động wrap tiếp theo KÝ TỰ (không theo từ, đúng lỗi gốc lặp lại nhiều lần trong phiên) xuống 1 dòng ẩn thứ 3 — nhưng `height="42"` chỉ đủ chỗ cho đúng 2 dòng (20+2+20), nên dòng 3 chứa "n Bảo" bị CẮT MẤT hoàn toàn khỏi vùng hiển thị (không phải lỗi truncate-ellipsis như mục 78, mà là lỗi CLIP theo chiều cao).

**Đã sửa tại `main.min.js`** (`OSATarget0Panel4`, đúng đoạn set `target0/1/2` trong vòng lặp `setData`): bỏ 5 khoảng trắng thừa đầu dòng 2, và thay vì nối `\n` cứng ở vị trí cố định, dùng lại `wrapVN_px_a94` (hàm đo pixel thật đã viết ở mục 78) để tự xác định đúng điểm ngắt dòng theo TỪ cho riêng phần "Nạp thẻ {num} Nguyên Bảo", đo trực tiếp trên CHÍNH label `target0/1/2` (đúng font/size sẽ hiển thị, chính xác hơn cả dùng label khác để đo) trước khi ráp lại thành `textFlow` hoàn chỉnh cùng phần "(n/n)" tô màu ở dòng 1.

**Đã sửa tại `LoopRechargeSkin.exml` + `default.thm.js`** (factory `target0_i`/`target1_i`/`target2_i` trong class `SkinLoopRecharge`): tăng `height` từ 42 → 64 (đủ chỗ cho 3 dòng ở size 20, lineSpacing 2) để phòng trường hợp số tiền nạp lớn (`num` nhiều chữ số) khiến dòng 2 cần wrap thành 2 dòng riêng (tổng 3 dòng) — tránh lặp lại đúng kiểu lỗi CLIP-theo-chiều-cao vừa gặp. Nhóm cha (`Group` cao 118px, `target0/1/2` dùng `verticalCenter="0"`) còn dư nhiều khoảng trống nên tăng chiều cao không ảnh hưởng layout xung quanh.

Xác định đúng 3 vị trí factory cần sửa trong `default.thm.js` bằng cách khớp theo biến gán `this.target0/1/2 = t` (không dùng tên hàm `target0_i` chung chung vì trùng tên ở nhiều skin khác trong file, đúng bài học mục 76/77).

Cache-bust cả 2 file: `main.min_bde097b6.js`→`main.min_10f4f5ec.js`, `default.thm_2b719960.js`→`default.thm_d71a7faa.js`. Đã xác minh nội dung staged: `node -c` qua cả 2 file, chuỗi `"\n     Nạp thẻ"` (bản cũ có khoảng trắng thừa) không còn trong file đã stage, đếm đúng 3 chỗ `t.height = 64;` mới trong đúng 3 factory `target0_i`/`target1_i`/`target2_i` (loại trừ các `height = 64` sẵn có ở nơi khác trong file, không liên quan), exml qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được Egret canvas nên không chắc `wrapVN_px_a94` chọn đúng điểm ngắt dòng đẹp mắt cho mọi giá trị `num` (500/2000/3000 trong ảnh mẫu, nhưng số tiền thực tế có thể khác nhiều theo cấu hình sự kiện) — cần ảnh xác nhận cả 3 hàng "Ngày 1/2/3" hiển thị đủ chữ, không mất/không tràn.

## 81. Xác nhận mục 80 OK, sửa 2 việc mới: đổi tên nút "Nung luyện một chạm" + tách 2 dòng đè nhau trong màn "Đồ Giám" (2026-07-09)

Người dùng xác nhận mục 80 đã ổn, kèm 2 yêu cầu mới trong cùng 1 tin nhắn:

**Việc 1 — đổi text nút**: tìm trong `main.min.js` chuỗi "Nung luyện một chạm" (nhãn nút `smeltBtn` khi `Recharge.ins().franchise` bật, thuộc 1 màn nung luyện trang bị không nêu rõ trong ảnh, chỉ dựa vào chuỗi text người dùng cung cấp) — chỉ có ĐÚNG 1 vị trí duy nhất trong toàn file, đổi trực tiếp thành "Nung luyện nhanh".

**Việc 2 — màn "Đồ Giám" (图鉴/Illustrations), ảnh IMG_0725**: dòng "Kinh nghiệm Đồ Giám：" (kèm số exp) và dòng "Phân Giải Đồ Giám Dư Thừa" (link màu xanh lá, có thể bấm) đang nằm chung 1 hàng ngang và đè lên nhau. Người dùng yêu cầu cụ thể: đưa "Phân giải Đồ Giám..." xuống dòng RIÊNG bên dưới "Kinh nghiệm Đồ Giám", và cân đối lại vị trí 2 dòng cho đẹp.

**Xác định đúng skin**: `id="resolve"` (nhãn "Phân giải Đồ Giám dư") chỉ xuất hiện trong đúng 1 file exml — `tujian.exml` (`class="SkinTujian"`), dùng bởi `IllustrationsWin` (tên hiển thị "Đồ Giám" trong code, khớp tiêu đề màn 图鉴 trong ảnh) — tránh lặp lại lỗi "đoán nhầm skin" đã gặp ở mục 75-77 bằng cách xác nhận qua `id` riêng biệt thay vì chỉ tra text.

**Cấu trúc gốc gây đè chữ**: cả 2 nhãn `"Kinh nghiệm Đồ Giám："` + `expValue` (số exp) VÀ khối `eff`+`resolve` ("Phân giải Đồ Giám dư") đều nằm chung 1 `Group` cao 50px, định vị bằng toạ độ `x` tuyệt đối cố định (label x=27, expValue x=112, khối resolve đặt qua `horizontalCenter=86.5` trong 1 Group con rộng 127px lồng bên trong) — TOÀN BỘ nằm trên cùng 1 hàng ngang (cùng y), không có dòng thứ 2, nên khi nhãn "Kinh nghiệm Đồ Giám：" (auto-rộng theo nội dung ở size 18) đủ dài, nó tràn qua đè lên cả `expValue` lẫn khối `resolve` phía sau — đúng lỗi "nhãn tĩnh tự giãn + phần tử sau đặt x cố định" đã gặp nhiều lần trong phiên (mục 75/76/77).

**Đã sửa** (`tujian.exml` + `default.thm.js`, class `SkinTujian`): tách hẳn thành 2 hàng xếp dọc thay vì 1 hàng ngang chật:
- Hàng 1 (`x=27, y=2`): gom nhãn "Kinh nghiệm Đồ Giám：" + `expValue` vào 1 Group con dùng `HorizontalLayout gap="4" verticalAlign="middle"` — để engine tự đo độ rộng nhãn và đặt số exp ngay sau, không còn đoán x cố định (đúng cách làm ưu tiên đã rút ra từ mục 76).
- Hàng 2 (`x=27, y=28`, nằm NGAY DƯỚI hàng 1): gom `eff` (hiệu ứng) + `resolve` (nhãn "Phân giải Đồ Giám dư") vào 1 Group con khác cũng dùng `HorizontalLayout gap="4" verticalAlign="middle"`, thay cho cách lồng 2 lớp Group + `horizontalCenter` cũ.
- Icon `tujianexp` (viên đá kinh nghiệm) đổi `verticalCenter` từ `-0.5` (canh giữa theo hàng đơn cũ) thành `0` để canh giữa theo TOÀN BỘ khối 2 hàng mới — cân đối trực quan hơn, đúng yêu cầu "cân đối lại vị trí của 2 dòng này".
- Tăng chiều cao Group cha từ 50 → 54 để đủ chỗ cho 2 hàng (18px chữ × 2 + khoảng cách), không đụng đến `powerGroup` (Group ông bà chứa nó) vì EUI Group không tự clip theo chiều cao con.

Đồng bộ y hệt cấu trúc mới sang `default.thm.js` (xoá 2 factory cũ `_Group3_i`/`_Group2_i` lồng nhau kiểu horizontalCenter, thay bằng 2 factory mới `_ExpRow_i`/`_ResolveRow_i` + 2 factory `HorizontalLayout` tương ứng, xác nhận đây là 3 cái tên MỚI chưa tồn tại — không trùng với factory tên số thứ tự (`_Group2_i`/`_Group3_i`) đã dùng ở các skin khác trong file, tránh xung đột khi Edit tool bắt buộc match duy nhất).

Cache-bust cả 2 file: `main.min_10f4f5ec.js`→`main.min_db242e9a.js`, `default.thm_d71a7faa.js`→`default.thm_b5e3dd0c.js`. Đã xác minh nội dung staged: `node -c` qua cả 2, đếm đúng 1 chỗ "Nung luyện nhanh" và 0 chỗ "Nung luyện một chạm" còn sót, đếm đúng 3 chỗ `_ExpRow_i`/`_ResolveRow_i` xuất hiện trong file đã stage (1 khai báo + gọi trong `elementsContent` + 1 factory layout riêng mỗi cái — khớp cấu trúc dự kiến), exml qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được Egret canvas nên chưa chắc khoảng cách `y=2`/`y=28` giữa 2 hàng và việc tăng height cha lên 54 đã đủ "cân đối đẹp" theo đúng ý người dùng, hay cần tinh chỉnh thêm — cần ảnh xác nhận cả nút "Nung luyện nhanh" đã đổi tên đúng chỗ (không rõ nút này thuộc màn nào cụ thể vì người dùng không gửi ảnh cho phần này) lẫn 2 dòng "Kinh nghiệm Đồ Giám"/"Phân giải Đồ Giám dư" trong màn Đồ Giám đã tách rõ ràng, không còn đè nhau.

## 82. Mục 81 OK cho màn Đồ Giám chính — nhưng popup "Chi tiết Đồ Giám" (bấm vào 1 vật phẩm) có link "Nhận Kinh Nghiệm Đồ Giám" bị nút "Nâng sao" đè lên (2026-07-09)

Người dùng gửi ảnh popup "Chi tiết Đồ Giám" (mở khi bấm vào 1 thẻ trong danh sách Đồ Giám — khác với màn danh sách chính đã sửa ở mục 81): nút "Nâng sao" (to, màu vàng, căn giữa cuối popup) đè lên 1 dòng chữ xanh lá có gạch chân, chỉ còn thấyló ra phần đuôi "...h Nghiệm Đồ Giám" bên phải nút. Yêu cầu: đổi text dòng đó thành "Kinh nghiệm" (ngắn gọn) để hết đè, canh cho cân bằng.

**Xác định đúng skin**: `id="btnUp"` (nút "Nâng sao") chỉ có trong đúng 1 file — `tujianshengxing.exml` (`class="SkinTujianshengxing"`, popup "Chi tiết Đồ Giám"), dùng chung `id="info"` cho dòng link bị đè — đây là 2 id hoàn toàn khác với `resolve`/`expValue` đã sửa ở mục 81 (khác skin, khác popup), dù cùng chủ đề "kinh nghiệm Đồ Giám" nên dễ nhầm — xác nhận bằng `id` riêng, đúng bài học mục 77.

**Nguyên nhân đè chữ**: `info` (text gốc trong exml "Nhận kinh nghiệm Đồ Giám", nhưng thực tế lúc chạy bị ghi đè bằng `textFlow` động thành "Nhận Kinh Nghiệm Đồ Giám" qua `TextFlowMaker.generateTextFlow1` trong `main.min.js`) định vị bằng `right="-18" bottom="-23"` (neo theo mép phải/mép dưới của panel, TỰ GIÃN sang trái theo độ dài chữ) — trong khi `btnUp` (nút "Nâng sao") định vị RIÊNG bằng `horizontalCenter="0" bottom="-36"`, cả 2 không hề biết vị trí của nhau. Chữ "Nhận Kinh Nghiệm Đồ Giám" (24 ký tự) đủ dài để rìa trái của nó lấn vào vùng ngang của nút (nút rộng 178px, căn giữa panel), đồng thời 2 phần tử cũng chồng lấn theo chiều dọc (nút cao 69px, đủ để phủ qua vị trí dòng chữ) — `btnUp` được thêm vào `elementsContent` SAU `info` nên nằm ở lớp trên, che khuất phần chữ chồng lấn. Đúng kiểu lỗi "2 phần tử định vị độc lập bằng toạ độ tuyệt đối, không biết kích thước/vị trí của nhau" đã gặp nhiều lần trong phiên.

**Đã sửa** (`tujianshengxing.exml` + `default.thm.js`, class `SkinTujianshengxing`, + `main.min.js`):
- Đổi text: exml `text="Nhận kinh nghiệm Đồ Giám"` → `"Kinh nghiệm"`; runtime `main.min.js` có 2 chỗ set `this.info.textFlow` bằng `"|U:&T:Nhận Kinh Nghiệm Đồ Giám|"` (1 cho state "nomax" đang hiển thị, 1 cho state "max" — dù state "max" ẩn `info` qua `visible.max="false"` nên không thấy được, vẫn đổi đồng bộ cho nhất quán) — cả 2 đổi thành `"|U:&T:Kinh nghiệm|"`.
- Thay vì tiếp tục định vị `info`/`btnUp` bằng toạ độ tuyệt đối riêng lẻ (dễ lệch lại nếu text đổi lần nữa), gộp cả 2 vào 1 Group mới dùng `HorizontalLayout gap="12" verticalAlign="middle"` — đúng kỹ thuật ưu tiên đã dùng nhiều lần trong phiên (mục 76/80/81): để engine tự đo độ rộng nút + chữ và xếp cạnh nhau, không còn khả năng chồng lấn dù text dài ngắn thế nào. Group mới nhận lại đúng vị trí tổng (`horizontalCenter="0" bottom="-36"`) mà `btnUp` từng có, để cả cụm nút+chữ vẫn nằm giữa panel như cũ.

Đồng bộ `default.thm.js`: xoá 2 factory `info_i`/`btnUp_i` cũ (đặt toạ độ riêng), viết lại không còn thuộc tính vị trí cố định, thêm factory Group mới `_BtnRow_i` + `_BtnRowLayout_i`, sửa `elementsContent` của `Noanigroup_i` để gọi `_BtnRow_i()` thay vì gọi riêng `info_i()`/`btnUp_i()`. Xác nhận các state override sẵn có (`SetProperty("info","visible",false)`, `SetProperty("btnUp","visible",false)`, `SetProperty("btnUp","label","Kích hoạt")`) vẫn hoạt động bình thường vì chỉ tham chiếu qua `id`/`this.info`/`this.btnUp`, không phụ thuộc việc chúng nằm trực tiếp trong Group nào.

Cache-bust cả 2 file: `main.min_db242e9a.js`→`main.min_cde8368f.js`, `default.thm_b5e3dd0c.js`→`default.thm_02850b26.js`. Đã xác minh nội dung staged: `node -c` qua cả 2, 0 chỗ còn sót text cũ "Nhận Kinh Nghiệm Đồ Giám"/"Nhận kinh nghiệm Đồ Giám" (cả exml lẫn 2 vị trí trong js), đúng 4 chỗ `_BtnRow_i`/`_BtnRowLayout_i` xuất hiện (khai báo + gọi + 2 factory), exml qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được Egret canvas nên chưa chắc gap=12px giữa nút và chữ đã "cân bằng" đúng ý người dùng — cần ảnh xác nhận popup "Chi tiết Đồ Giám" không còn chữ bị nút che, và cụm nút+chữ vẫn nằm cân đối giữa popup như trước.

## 83. Popup "Cài đặt" (Settings): 2 hàng checkbox chồng chữ tùm lum — Việt hoá dài hơn Trung khiến layout 2 cột gốc không còn đủ chỗ (2026-07-09)

Người dùng gửi ảnh popup "Cài đặt": 2 hàng checkbox bị chồng chữ nặng — hàng "Chặn hiệu ứng kỹ năng"/"Chặn quái vật" và hàng "Chặn người chơi khác"/"Chặn tất cả người chơi" đều đọc không nổi vì chữ hàng trái đè lên checkbox+chữ hàng phải.

**Xác định skin**: `settingskin.exml` (`class="Skinsetting"`), popup cài đặt chung của game — không phải màn Đồ Giám đã sửa ở mục 81/82 dù cũng dùng chữ "chặn"/"đồ giám" na ná dễ nhầm, xác nhận qua nội dung ảnh khớp đúng tiêu đề "Cài đặt" và các dòng checkbox.

**Nguyên nhân**: mỗi hàng gồm 2 `CheckBox` xếp cạnh nhau kiểu 2 cột, định vị bằng `left="45"` (checkbox trái) + `right="65"`/`right="25"`/`right="105"` (checkbox phải) trong 1 Group rộng 430px — cả 2 không biết độ rộng thật của nhau. Bản gốc tiếng Trung chắc chỉ 3-4 ký tự/nhãn nên đủ chỗ, nhưng bản dịch tiếng Việt dài hơn nhiều lần (đúng vấn đề Việt-hoá-dài-hơn-gốc lặp lại xuyên suốt phiên): hàng "Âm thanh"/"Rung màn hình" (21 ký tự gộp) còn tạm ổn, nhưng "Chặn hiệu ứng kỹ năng"/"Chặn quái vật" (34 ký tự gộp) và "Chặn người chơi khác"/"Chặn tất cả người chơi" (42 ký tự gộp) — ước tính riêng phần chữ đã cần ~350-450px, CỘNG thêm 2 icon checkbox (~40px/icon) — vượt xa 430px của hàng, khiến 2 cột không còn khả năng nằm cạnh nhau dù có canh lại bằng `HorizontalLayout` (kỹ thuật hay dùng trong phiên) đi nữa, vì bản chất không đủ không gian ngang, không phải do đặt sai toạ độ.

**Đã sửa** (`settingskin.exml` + `default.thm.js`, class `Skinsetting`):
- Hàng "Âm thanh"/"Rung màn hình": đủ ngắn, GIỮ 2 cột nhưng đổi từ toạ độ `left=`/`right=` cố định sang `HorizontalLayout gap="30" verticalAlign="middle"` — để engine tự đo, tránh lặp lại lỗi nếu sau này đổi chữ.
- 2 hàng còn lại (4 checkbox: `cbSkillEff`, `cbMonster`, `cbOtherRole`, `cbAllRole`): bản chất không đủ chỗ nằm 2 cột nên **chuyển hẳn sang 1 cột/hàng riêng** (mỗi checkbox 1 hàng dọc, giống cách `cbHeji` "Tự động thi triển Thần Phạt" đã làm sẵn từ trước) — từ 3 hàng (1×2-cột + 2×2-cột) + 1 hàng đơn thành 6 hàng đơn xếp dọc, đảm bảo không còn khả năng chồng chữ dù nhãn dài bao nhiêu.
- Vì số hàng tăng từ 4 lên 6 (dùng chung `VerticalLayout gap="33"` của `contentGroup`), tổng chiều cao nội dung tăng từ ~323px lên ~451px, vượt quá `contentGroup` khai báo cũ (height="362") và khung nền popup cũ (height="482") — **tăng cả 2**: `contentGroup` 362→462, khung ngoài (`_Group6`/panel chính) 482→582. Xác nhận việc tăng AN TOÀN vì ảnh nền khung (`tongyong_dikuang2`, `tongyong_dikuang1`) đều dùng `scale9Grid` + neo `top`/`bottom` (không phải `height` cố định tuyệt đối) nên tự giãn theo khung cha mà không vỡ hình — kiểm tra chéo: `tongyong_dikuang1` = outer_height − 120 = 582−120=462, khớp CHÍNH XÁC với `contentGroup` mới, xác nhận công thức thiết kế gốc nhất quán (bản cũ: 482−120=362, đúng bằng `contentGroup` cũ).

Đồng bộ `default.thm.js`: sửa `_Group6_i` (khung ngoài) height 482→582, `contentGroup_i` height 362→462 + `elementsContent` thêm 2 hàng mới, `_Group2_i` (hàng Âm thanh/Rung màn hình) đổi từ định vị `left`/`right`/`verticalCenter` riêng từng checkbox sang `HorizontalLayout` mới `_HorizontalLayout3_i`, tách `_Group3_i` (cũ chứa `cbSkillEff`+`cbMonster`) thành `_Group3_i` (chỉ `cbSkillEff`) + factory mới `_Group8_i` (chỉ `cbMonster`), tách `_Group4_i` (cũ chứa `cbOtherRole`+`cbAllRole`) thành `_Group4_i` (chỉ `cbOtherRole`) + factory mới `_Group9_i` (chỉ `cbAllRole`) — đặt tên `_Group8_i`/`_Group9_i` để không trùng số thứ tự đã dùng trong CHÍNH class này (`_Group1` đến `_Group6` đã có sẵn).

Cache-bust `default.thm_b5e3dd0c.js`→`default.thm_f288a82b.js` (`main.min.js` không đổi lần này, không có logic JS nào cần sửa). Đã xác minh nội dung staged: `node -c` qua, đúng 1 chỗ `height = 582` và 1 chỗ `height = 462` NẰM TRONG đúng phạm vi class `Skinsetting` (loại trừ các giá trị trùng số ở skin khác trong file), `_Group8_i`/`_Group9_i`/`_HorizontalLayout3_i` xuất hiện đúng vị trí (khai báo + gọi trong `elementsContent`), exml qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được Egret canvas nên chưa chắc chắn 100% — (1) ước tính độ rộng chữ chỉ dựa trên số ký tự, chưa đo pixel thật nên không chắc hàng "Âm thanh"/"Rung màn hình" giữ 2 cột có thực sự đủ chỗ hay vẫn hơi chật; (2) chiều cao khung mới (582/462) có thể dư/thiếu chút ít so với 6 hàng thực tế render; (3) việc phóng to khung ngoài popup có thể làm popup trông to hơn hẳn so với các popup khác cùng game — cần ảnh xác nhận cả bố cục đã "ngay ngắn" lẫn kích thước tổng thể popup còn hài hoà.

## 84. Mục 83 hết chồng chữ, nhưng hàng "Âm thanh"/"Rung màn hình" bị lệch trái thay vì canh giữa (2026-07-09)

Người dùng xác nhận ảnh mới: hết chồng chữ hoàn toàn, nhưng hàng đầu tiên "Âm thanh"/"Rung màn hình" (hàng duy nhất còn giữ 2 cột từ mục 83) nằm lệch hẳn sang trái, trong khi các hàng 1-cột bên dưới đều canh giữa gọn gàng — yêu cầu canh giữa lại 2 checkbox này.

**Nguyên nhân**: `HorizontalLayout` thêm ở mục 83 cho hàng này (`gap="30" verticalAlign="middle"`) không có `horizontalAlign="center"` — mặc định `HorizontalLayout` xếp các phần tử con bắt đầu từ mép TRÁI của Group chứa nó, không tự canh giữa. Group chứa hàng này rộng `width="430"` (cố ý để rộng, đề phòng chữ dài) nhưng nội dung thật (2 checkbox + gap 30) hẹp hơn nhiều, nên phần thừa bên phải bị bỏ trống, khiến cả cụm nhìn lệch trái dù bản thân Group đã `horizontalCenter="0"` (canh giữa đúng CÁI HỘP 430px, không phải canh giữa NỘI DUNG bên trong hộp).

**Đã sửa** (`settingskin.exml` + `default.thm.js`, class `Skinsetting`): thêm `horizontalAlign="center"` vào `HorizontalLayout` của hàng "Âm thanh"/"Rung màn hình" — để layout tự canh giữa nội dung thật bên trong Group 430px, thay vì dồn về mép trái.

Đồng bộ `default.thm.js`: thêm `t.horizontalAlign = "center";` vào factory `_HorizontalLayout3_i` (xác nhận đúng bằng cách khớp theo `elementsContent = [this.cbSound_i(),this.cbShake_i()]` liền kề — tên factory `_HorizontalLayout3_i` bị trùng ở ~30 class khác trong file do đánh số tự động, không thể chỉ dựa tên để sửa, đúng bài học mục 76/77/82).

Cache-bust `default.thm_f288a82b.js`→`default.thm_da3b808c.js` (`main.min.js`/exml khác không đổi). Đã xác minh nội dung staged đúng vị trí factory (kèm dòng `elementsContent` cbSound/cbShake liền kề để xác nhận không nhầm class), `node -c` qua cú pháp, exml qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được Egret canvas — cần ảnh xác nhận hàng "Âm thanh"/"Rung màn hình" đã canh giữa đúng, thẳng hàng trực quan với các hàng 1-cột bên dưới.

## 85. 2 skin "副本" (menu Phó Bản): sửa 4 lỗi chồng chéo — thanh tab dưới cùng, tháp "Hạo Thiên Tháp", quà thưởng, dòng caption vòng quay (2026-07-09)

Người dùng gửi 2 ảnh của cùng 1 menu "副本" (Phó Bản/Instance), yêu cầu tổng quát "xem qua chỗ nào cần sửa thì sửa luôn": ảnh 1 là tab "Hạo Thiên Tháp" (tháp vượt ải nhiều tầng), ảnh 2 là tab "Phó Bản Nguyên Liệu" (danh sách phó bản). Cả 2 đều thuộc chung 1 class cha `FbDailyWin`/`SkinDailyFb` (`DailyFbSkin.exml`), khớp với `ViewStack` chứa 5 tab con.

**Xác định phạm vi qua 1 agent nghiên cứu riêng** (do khối lượng lớn, nhiều lớp UI lồng nhau) để tránh tốn ngữ cảnh chính vào việc dò tìm — xác nhận đúng: thanh tab dưới cùng dùng skin DÙNG CHUNG `SkinBtnTab0` (`BtnTab0Skin.exml`) cho **hơn 30 danh sách tab khác trong toàn bộ game**, và renderer class `TabBarItemRender` cũng dùng chung ở **11 nơi khác** — không được sửa trực tiếp 2 thứ này (đúng nguyên tắc "không đụng skin/class dùng chung" đã áp dụng nhiều lần trong phiên, ví dụ `ItemSkin2`).

**Lỗi 1 — thanh tab dưới cùng chồng chữ tùm lum**: nhãn tab (`labelDisplay` trong `SkinBtnTab0`) không có `width`/`wordWrap`/`multiline`, cỡ chữ 21 — tên tab tiếng Trung gốc chỉ 3-4 ký tự nên vừa khít viên "thuốc" (pill) rộng 110-120px, nhưng tên tiếng Việt dài hơn nhiều ("Phó Bản Nguyên Liệu", "Phó Bản Kinh Nghiệm" ~20 ký tự) nên tràn ra ngoài viên pill, đè lên tab bên cạnh. **Đã sửa bằng cách tạo skin MỚI riêng** `BtnTab0WideSkin.exml` (`class="SkinBtnTab0Wide"`, clone từ `BtnTab0Skin.exml`, chỉ đổi `labelDisplay`: cỡ chữ 21→14, thêm `width="100"` `wordWrap="true"` `multiline="true"` `lineSpacing="1"`) — CHỈ áp dụng cho `DailyFbSkin.exml`'s TabBar (`itemRendererSkinName` đổi từ `SkinBtnTab0`→`SkinBtnTab0Wide`), không đụng file gốc nên không ảnh hưởng 30+ tab khác. Lưu ý: đây là wrap NGUYÊN SINH của Egret (theo ký tự, không theo từ, đúng hạn chế đã gặp nhiều lần) — không dùng được kỹ thuật `wrapVN_px_a94` vì nhãn tab gán qua data-binding khai báo (`text="{data}"`), không có code JS nào set `.text` để can thiệp; chấp nhận có thể ngắt giữa từ ở vài tên tab dài, nhưng ít nhất không còn đè chữ lên nhau — nếu người dùng thấy vẫn chưa đẹp, có thể cân nhắc thêm renderer con riêng (subclass `TabBarItemRender`) để dùng `wrapVN_px_a94`, nhưng chưa làm ở bước này để tránh rủi ro đụng vào class dùng chung.

**Lỗi 2 — dòng mô tả tầng bị dính liền không cách chữ**: trong tab "Hạo Thiên Tháp" (class `FBThreatPanel`, skin `SkinChuangtianguan`/`chuangtianguan.exml`), dòng "Vượt ải5 Trùng Thiên10tầng" — tra `main.min.js` thấy chuỗi dựng bằng nối chuỗi trực tiếp không có khoảng trắng: `"Vượt ải"+o.name+n.layer+"tầng"` (và 2 biến thể tương tự dùng cho `itemicon.desc`/`itemicon.desc2`). **Đã sửa** thêm khoảng trắng vào cả 3 chỗ nối chuỗi: `"Vượt ải "+o.name+" "+n.layer+" tầng"`.

**Lỗi 3 — ô thưởng "Kinh nghiệm" đè lên tên vật phẩm ô bên cạnh**: cụm hiển thị "Kinh nghiệm" + số exp (Group riêng, không qua List) nằm sát `iconList`/`iconList0` (2 List dùng chung skin `SkinItem2` — đúng lỗi `nameTxt` mặc định rộng 93px tràn ra ngoài ô 66px đã gặp nhiều lần trong phiên, ví dụ mục 75/77/78). **Đã sửa** bằng đúng pattern `fixRewardName_a94` đã thiết lập từ mục 75: thêm hàm mới vào `FBThreatPanel.prototype`, gọi qua `TimerMgr.doTimer(50,...)` ngay sau khi gán `dataProvider` cho `iconList`/`iconList0`, thu hẹp `nameTxt.width=64` và dùng lại `wrapVN_px_a94` (đo pixel thật, đã có sẵn từ mục 78) để ngắt dòng an toàn theo từ.

**Lỗi 4 — dòng "Vượt mỗi 10 tầng có thể quay thưởng" đè sang caption bên cạnh**: label này KHÔNG bao giờ bị set lại bằng JS (chỉ `.visible` được toggle, xác nhận qua tra `main.min.js`) nên chỉ cần sửa text mặc định trong exml/`default.thm.js`. Chuỗi khá dài (32 ký tự) đặt gần caption "Có thể nhận" của icon rương quà bên trái. **Đã sửa** bằng cách ngắt thủ công thành 2 dòng tại đúng ranh giới từ tự nhiên: `"Vượt mỗi 10 tầng\ncó thể quay thưởng"` (dùng ký tự `\n` y hệt định dạng đã thấy trong các label tĩnh khác của codebase gốc, KHÔNG dùng entity XML `&#10;`), thêm `width="140"` để giữ layout gọn, không mở rộng ngang thêm nữa.

Đồng bộ đầy đủ cả `default.thm.js` cho cả 4 lỗi: thêm class mới `SkinBtnTab0Wide` (clone nguyên `SkinBtnTab0`, chỉ sửa `labelDisplay_i`), sửa `SkinDailyFb.tab_i` trỏ sang skin mới, sửa `dailyGift0_i` (text 2 dòng + width), không cần sửa gì cho lỗi 2/3 vì chỉ ở `main.min.js`.

Cache-bust cả 2 file: `main.min_cde8368f.js`→`main.min_6c3e340e.js`, `default.thm_da3b808c.js`→`default.thm_cde2bea1.js`. Đã xác minh nội dung staged: `node -c` qua cả 2, đếm đúng 2 chỗ `fixRewardName_a94` (gọi + định nghĩa), đúng 1 chỗ mỗi kiểu nối chuỗi `"Vượt ải "+o.name...` mới (0 chỗ còn kiểu cũ không cách), đúng 6 chỗ `SkinBtnTab0Wide` trong file thm đã stage, cả 3 exml (`BtnTab0WideSkin.exml` mới, `DailyFbSkin.exml`, `chuangtianguan.exml`) qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: đây là lượt sửa nhiều lỗi nhất cùng lúc trong phiên (4 lỗi, 2 skin) nên rủi ro sai sót cao hơn bình thường — đặc biệt: (1) thanh tab dùng wrap ký tự-không-theo-từ của Egret nên có thể vẫn ngắt giữa từ ở vài tên tab dài (không hoàn hảo nhưng không còn đè); (2) chưa chắc `width=64` cho `iconList`/`iconList0` đủ hẹp để không đè khối "Kinh nghiệm" bên trái (chỉ ước tính hình học, chưa đo pixel thật); (3) chưa kiểm tra 2 tab còn lại trong menu này (`FbExpsPanel`/kinh nghiệm phó bản, `GuardWeaponView`/thủ hộ thần kiếm, `PlayMethodPanel`/cách chơi) có lỗi tương tự hay không — người dùng chỉ gửi ảnh 2 trong 5 tab. Cần ảnh xác nhận cả 4 lỗi đã hết, và báo thêm nếu 3 tab còn lại cũng có vấn đề.

## 86. Mục 85 xác nhận OK — tiếp tục tinh chỉnh: đổi tên nút, rút gọn+dời label càn quét, đổi thứ tự số-danh từ trong Hạo Thiên Tháp (2026-07-09)

Người dùng gửi lại 2 ảnh xác nhận mục 85 đã hết chồng chéo (tab bar, "Vượt ải X Trùng Thiên Y tầng", "Vượt mỗi 10 tầng..." đều ổn), kèm 3 yêu cầu tinh chỉnh mới cho 2 tab con của menu "副本":

**1. Tab "Phó Bản Nguyên Liệu" (class `FbItem`, skin `SkinDailyFbItem`/`DailyFbItemSkin.exml`)**:
- Nút "Thử thách nhanh" (hiện khi còn lượt thử thách miễn phí, `n>0` trong `dataChanged`) → đổi thành "Thử Thách" (ngắn hơn). Có tổng cộng 2 chỗ gán y hệt trong cùng hàm (2 nhánh điều kiện `franchise`/`sweepLevel`), sửa cả 2. Xác nhận qua tra `main.min.js` còn 1 chỗ "Thử thách nhanh"/"Thử Thách" khác thuộc class `MijiPanel`/`GuardWeapon` hoàn toàn không liên quan — KHÔNG đụng vào (đúng phạm vi người dùng chỉ định "bên hình Phó Bản Nguyên Liệu").
- Label "Số lần càn quét hôm nay:" (và biến thể "Số lần thử thách hôm nay:" khi `n>0`) đặt ở `x=373.68` trong thẻ rộng 575px, không đủ chỗ cho phần số lượt theo sau nên tràn ra ngoài màn hình. Đã rút ngắn cả 2 câu (bỏ "hôm nay") thành "Số lần càn quét:"/"Số lần thử thách:", đồng thời dời `x` từ 373.68 → 220 trong `DailyFbItemSkin.exml` + `default.thm.js` để có thêm ~150px chỗ trống.

**2. Tab "Hạo Thiên Tháp" (`FBThreatPanel`/`chuangtianguan.exml` + `chuangtianguanItem.exml`)** — đổi thứ tự "số trước danh từ" (kiểu Trung: 5重天/8层) sang "danh từ trước số" (kiểu Việt tự nhiên: Trùng Thiên 5/Tầng 8), đúng yêu cầu người dùng nêu 3 ví dụ cụ thể:
- `nameLabel` (tiêu đề tháp góc trên phải): `i.name` (chuỗi có sẵn "5 Trùng Thiên" lấy từ `GlobalConfig.ConfigFbChName`) → đổi sang dùng field số `i.group` và tự dựng chuỗi `"Trùng Thiên "+i.group`, KHÔNG sửa `config.json` (tránh đụng ~60 dòng dữ liệu và các nơi khác có thể đang dùng đúng field `.name` với format cũ — xác nhận qua grep còn 3 chỗ khác dùng `ConfigFbChName[...].name` thuộc tooltip mở khóa Tiên Văn, ngoài phạm vi 2 ảnh, không đụng).
- `passAllTip0` (nhãn từng tầng trong danh sách cuộn bên phải, class `HaoTianItemRenderer`): `t.layer+"tầng"` → `"Tầng "+t.layer`. Phát hiện exml gốc `chuangtianguanItem.exml` default đã sẵn `text="Tầng 99"` đúng format mới từ trước — chỉ code JS chưa khớp, không cần sửa exml.
- `nowrawed` ("Vượt ải thứ 8 tầng thưởng"): bỏ chữ "thứ", đổi thành `"Vượt ải tầng "+u.layer+" thưởng"`.
- Khung "Xếp hạng vượt ải" — `num0`/`num1`/`num2` (hạng 1/2/3): chuỗi dựng bằng `n.group+"Trùng Thiên "+n.layer+" tầng"` (dính liền không cách, đúng lỗi đã sửa 1 lần ở mục 85 cho `openDesc` nhưng bỏ sót chỗ này) → đổi hẳn sang `"Trùng Thiên "+n.group+" Tầng "+n.layer`, đồng thời theo đúng yêu cầu người dùng: (a) dời `x` từ 187 → 140 trong exml + `default.thm.js` (thêm ~47px chỗ trống, không dời quá tay vì cột tên người chơi bên trái dùng độ rộng tự động, dời quá nhiều có thể đụng tên dài); (b) thêm hàm mới `truncateEllipsis_a94(s,n)` (cắt chuỗi theo SỐ KÝ TỰ, nối "…" nếu vượt quá `n`, tái sử dụng được cho các trường hợp tương tự sau này) áp dụng với ngưỡng 22 ký tự — đủ để câu mẫu "Trùng Thiên 5 Tầng 7" (20 ký tự) không bị cắt, chỉ cắt khi có số tầng/trùng thiên lớn bất thường về sau.

Đồng bộ đầy đủ `default.thm.js` cho tất cả các đổi vị trí/text tĩnh (`num0_i`/`num1_i`/`num2_i`, `count_i` của `SkinDailyFbItem`).

Cache-bust cả 2 file: `main.min_cde8368f.js`... (tiếp nối mục 85) → `main.min_b7cba202.js`, `default.thm_da3b808c.js`... → `default.thm_d5e599a7.js`. Đã xác minh nội dung staged: `node -c` qua cả 2, đúng 2 chỗ `truncateEllipsis_a94` (định nghĩa + gọi), đúng 1 chỗ mỗi kiểu chuỗi mới (`"Trùng Thiên "+i.group`, `"Tầng "+t.layer`, `Số lần càn quét: `/`Số lần thử thách: `), cả 2 exml (`chuangtianguan.exml`, `DailyFbItemSkin.exml`) qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được Egret canvas nên chưa chắc `x=220`/`x=140` đã đủ để 2 dòng label hết tràn hoàn toàn, và chưa chắc ngưỡng cắt 22 ký tự của `truncateEllipsis_a94` là hợp lý cho mọi trường hợp thực tế (tầng/trùng thiên có thể lên tới 2-3 chữ số ở cấp cao) — cần ảnh xác nhận cả nút "Thử Thách", label "Số lần càn quét:", và toàn bộ cụm số-trước-danh-từ trong Hạo Thiên Tháp đã đổi đúng thứ tự lẫn không còn tràn/chồng.

## 87. Bổ sung mục 86 bỏ sót: dòng "Vượt ải X Trùng Thiên Y tầng" + canh giữa khung mở khóa (2026-07-09)

Người dùng nhắc bổ sung: dòng `openDesc` ("Vượt ải 5 Trùng Thiên 10 tầng" — khung "Mở ô Tiên Văn mới"/thông báo mở khóa phía trên danh sách thưởng) chưa được đổi thứ tự số-danh từ ở mục 86 (chỉ sửa `nameLabel`/`passAllTip0`/`nowrawed`/`num0-2`, bỏ sót đúng dòng này dù cùng 1 khối code), và khung chứa dòng này đang bị lệch chứ không canh giữa.

**Đã sửa** (`main.min.js`, cùng khối code `refreshPanelInfo` đã sửa ở mục 85/86): 3 chuỗi dùng `o.name` (dạng "5 Trùng Thiên" lấy nguyên từ config) đổi hẳn sang dùng `n.group` (field số, `n.group` == khoá tra `GlobalConfig.ConfigFbChName[n.group]` nên luôn bằng đúng giá trị `o.group`, dùng thẳng `n.group` cho gọn) để tự dựng đúng thứ tự mới:
- `openDesc.text`: `"Vượt ải "+o.name+" "+n.layer+" tầng"` → `"Vượt ải Trùng Thiên "+n.group+" Tầng "+n.layer`.
- `itemicon.desc2`: tương tự, bỏ hẳn `o.name`, dùng `"Trùng Thiên "+n.group+" Tầng "+n.layer`.
- `itemicon.desc` (dòng tooltip mở khóa khi chưa đủ điều kiện): `"Vượt ải "+o.name+" "+n.layer+" tầng mở khóa"` → `"Vượt ải Trùng Thiên "+n.group+" Tầng "+n.layer+" mở khóa"`.

**Canh giữa khung**: `openDesc` (`chuangtianguan.exml`) đang định vị bằng `x="85"` tuyệt đối kèm `textAlign="center"` — nhưng `textAlign` chỉ có tác dụng khi có `width`, ở đây không có `width` nên `textAlign="center"` vô nghĩa, nhãn chỉ đơn giản dán vào x=85 không hề canh giữa khung. Các phần tử anh em cùng khung (`itemicon`, `unlock`, `runeLock`) đều dùng `horizontalCenter="19-21"` nhất quán — đổi `openDesc` từ `x="85"` sang `horizontalCenter="20"` (bỏ hẳn `x`) để khớp đúng cách canh giữa mà các phần tử khác trong cùng khung đang dùng.

Đồng bộ `default.thm.js`: sửa `openDesc_i` (bỏ `t.x=85`, thêm `t.horizontalCenter=20`) — xác nhận đúng vị trí factory duy nhất thuộc `SkinChuangtianguan` (tên `openDesc_i` trùng ở 3 class khác trong file, xác nhận qua `elementsContent` chứa `itemicon_i()`/`unlock_i()`/`runeLock_i()` liền kề).

Cache-bust cả 2 file: `main.min_b7cba202.js`→`main.min_ffc375d9.js`, `default.thm_d5e599a7.js`→`default.thm_5c6d079d.js`. Đã xác minh nội dung staged: `node -c` qua cả 2, đúng 3 chuỗi mới (`openDesc`/`desc2`/`desc` dùng `n.group`) không còn `o.name`, đúng vị trí `horizontalCenter=20` trong factory `openDesc_i` của `SkinChuangtianguan` (không nhầm 3 class trùng tên khác), exml qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được Egret canvas — cần ảnh xác nhận dòng "Vượt ải Trùng Thiên 5 Tầng 10" hiển thị đúng thứ tự và khung đã canh giữa đẹp mắt như mong muốn.

## 88. Xác nhận mục 85-87 OK — còn khối "Kinh nghiệm" (thưởng vượt tầng) đè lên tên vật phẩm icon bên cạnh, chưa canh giữa (2026-07-09)

Người dùng xác nhận ảnh mới: tab bar, "Trùng Thiên 5", các nhãn "Tầng X", "Vượt ải Trùng Thiên 5 Tầng 10", "Vượt ải tầng 8 thưởng", khung xếp hạng đều đã đúng và đẹp. Còn sót: khối "Kinh nghiệm" + số exp (dưới icon EXP, KHÔNG thuộc `iconList`/`iconList0` mà là 1 `Group` riêng dựng tay) hiện ra dính liền không cách ("Kinh nghiệm900") và đè lên tên vật phẩm icon kế bên ("(Văn Ngẫu Nhiên)" của `iconList`), đồng thời không canh giữa gọn dưới icon.

**Xác định nguyên nhân sâu hơn mục 85**: mục 85 đã thu hẹp `nameTxt` của `iconList`/`iconList0` (dùng `wrapVN_px_a94`) nhưng đó KHÔNG phải nguồn đè chính — khối "Kinh nghiệm"+"exp" nằm trong 1 `Group` con có `width="80"` CỐ ĐỊNH, `HorizontalLayout gap="0"`; ở size 15, "Kinh nghiệm" (~11 ký tự) + số exp (vd "900") thực tế cần hơn 100px, vượt xa khung 80px khai báo. Vì `HorizontalLayout horizontalAlign="center"` canh giữa dựa trên CHIỀU RỘNG KHAI BÁO (80) chứ không phải nội dung thật, phần tràn bị đẩy lệch cả 2 bên ra ngoài khung 80px, chồng sang `iconList` kế bên (khoảng cách tâm giữa 2 khối chỉ ~82.5px) — đúng kiểu lỗi "khai báo width cố định nhỏ hơn nội dung thật" đã gặp nhiều lần trong phiên.

**Đã sửa** (`chuangtianguan.exml` + `default.thm.js`, class `SkinChuangtianguan`):
- Bỏ hẳn `width="80"` cố định trên `Group` chứa `nameTxt`+`expText`, để nó TỰ CO GIÃN theo nội dung thật — khi đó `horizontalCenter="0"` của chính Group này sẽ canh giữa đúng nội dung thật trong khung cha rộng 90px (khớp đúng khoảng cách tới `iconList` đã tính toán từ đầu), không còn đoán mò kích thước.
- Giảm cỡ chữ `nameTxt`/`expText` từ 15 → 12 để tổng độ rộng nội dung thực tế gọn lại gần khớp khung 90px cha, giảm rủi ro tràn với số exp nhiều chữ số.
- Thêm `gap="2"` (từ `gap="0"`) giữa "Kinh nghiệm" và số exp để tách rõ 2 phần thay vì dính liền ("Kinh nghiệm900" → "Kinh nghiệm 900"), thêm `verticalAlign="middle"` cho gọn theo chiều dọc.
- Bỏ `x="30"` thừa trên `expText` (giá trị cũ từ trước khi có `HorizontalLayout`, không còn tác dụng vì layout tự tính vị trí, dọn cho đỡ gây hiểu lầm khi đọc lại sau này).

Đồng bộ `default.thm.js`: sửa `_Group2_i` (bỏ `t.width=80`), `_HorizontalLayout3_i` (`gap` 0→2, thêm `verticalAlign="middle"`), `nameTxt_i`/`expText_i` (size 15→12, bỏ `t.x=30` ở `expText_i`) — xác nhận đúng vị trí bằng cách khớp `t.text="Kinh nghiệm"` VÀ vị trí dòng cụ thể (tên `_Group2_i`/`nameTxt_i` trùng ở hàng chục class khác trong file do đánh số tự động, đã cross-check qua offset thuộc đúng phạm vi class `SkinChuangtianguan`, đúng bài học mục 76/77/82/86).

Cache-bust `default.thm_d5e599a7.js`... (tiếp mục 87) → `default.thm_c0862323.js` (`main.min.js` không đổi lần này, không có logic JS nào cần sửa). Đã xác minh nội dung staged: `node -c` qua, `text="Kinh nghiệm"` xuất hiện đúng 1 lần trong phạm vi class `SkinChuangtianguan` (2 chỗ khác ở class không liên quan, không đụng), exml qua `xml.etree.ElementTree.parse`, `php -l`/`manifest.json` hợp lệ, `index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: không tự render được Egret canvas nên chưa chắc size 12 + gap 2 đã đủ gọn để không còn tràn với MỌI giá trị exp có thể xuất hiện (số càng nhiều chữ số càng dễ tràn lại) — cần ảnh xác nhận khối "Kinh nghiệm [số]" đã canh giữa gọn dưới icon và không còn đè tên vật phẩm icon bên cạnh.

## 89. Popup thông báo vượt tầng (Hạo Thiên Tháp): câu "được phần thưởng như sau" bị cắt lề trái, nút "Thử thách thứ X tầng" sai thứ tự + tràn chữ, và rút gọn câu quay thưởng (2026-07-10)

Người dùng gửi 2 ảnh: (1) popup "胜利"/Chiến thắng hiện ra sau khi vượt 1 tầng Hạo Thiên Tháp, (2) popup quay thưởng may mắn (vòng quay Hạo Thiên Tháp). 4 lỗi cần sửa:

**A. Câu "Nhận được phần thưởng như sau：" bị lệch trái, mất chữ "N" đầu câu ngoài mép màn hình.**

Nguyên nhân: đúng kiểu lỗi "textAlign vô tác dụng khi thiếu width" đã gặp ở mục 87 (`openDesc`) — nhãn `txt` trong `ChuangtianguanResultSkin.exml` (skin `SkinChuangtianguanResult`, dùng bởi popup kết quả) có `textAlign="center"` nhưng KHÔNG khai báo `width`, nên `textAlign` không có hộp nào để canh giữa bên trong — vị trí thực tế chỉ do `horizontalCenter="-176.5"` quyết định (đẩy hẳn sang trái so với tâm màn hình), khiến câu dài bị tràn ra ngoài mép trái. Sửa: đổi `horizontalCenter="-176.5"` → `horizontalCenter="0"` (canh giữa đúng tâm, không có phần tử nào khác cùng hàng nên an toàn khi đổi).

**B + C. Nút "Thử thách thứ 10 tầng" sai thứ tự từ + 2 dòng tràn chữ; nút "Nhận thưởng(Ns)" kế bên cũng cần chữ nhỏ hơn để lọt tâm nút.**

Bài học quan trọng rút ra khi tìm đúng chỗ sửa: code có 1 class TÊN GẦN GIỐNG và PATTERN CHỮ Y HỆT nằm ở 2 nơi khác nhau trong `main.min.js` — cả `ResultedWin` (skin `SkinResult`) LẪN `TongResultedWin` (skin `SkinChuangtianguanResult`) đều có nhánh `GameMap.fbType==UserFb.FB_TYPE_TIAOZHAN` với chuỗi `"Thử thách thứ "+X+" tầng"`. Nếu chỉ grep theo text rồi sửa bừa chỗ tìm thấy đầu tiên sẽ sửa NHẦM class chết (`ResultedWin` không hề được gọi cho loại dungeon này). Đã lần theo đúng logic điều phối `ResultMgr.prototype.create` (hàm `switch` theo `GameMap.fbType`) và xác nhận `case UserFb.FB_TYPE_TIAOZHAN` gọi `TongResultedWin`, KHÔNG phải `ResultedWin` — nên chỉ sửa đúng bản trong `TongResultedWin`. Đây là biến thể mới của bài học "nhầm skin" ở mục 77: lần này là "nhầm CLASS xử lý kết quả" dù pattern code giống hệt, phải lần theo đường điều phối thật sự chứ không chỉ tin vào so khớp chữ.

Trong `TongResultedWin.prototype.open` (`main.min.js`):
- Đổi `this.rewardBtn.label="Thử thách thứ "+r.layer+" tầng"` → `this.rewardBtn.label="Thử thách tầng "+r.layer` (đúng thứ tự từ theo yêu cầu, "Thử thách tầng 10" thay vì "Thử thách thứ 10 tầng").
- Thêm `this.closeBtn.labelDisplay.size=15` và `this.rewardBtn.labelDisplay.size=15` (dùng đúng pattern `labelDisplay.size=` đã xác lập ở mục 79 — set cỡ chữ JS ngay trên instance Button thay vì sửa skin `SkinBtn7` dùng chung ở rất nhiều màn hình khác), đặt ngay sau `this.closeBtn.name=s?"Nhận thưởng":"Thoát"` ở đầu `open()` để cỡ chữ được set 1 LẦN DUY NHẤT và không bị mất — vì bộ đếm ngược `updateCloseBtnText_a94` (chạy mỗi giây qua `TimerMgr`) chỉ gán lại `.label` (text), không đụng đến `.labelDisplay.size`, nên set sớm trong `open()` là đủ, không cần set lại mỗi tick.

**D. Câu ở popup quay thưởng: "Vượt mỗi 10 tầng là lấy được 1 phần thưởng trong hòm giải thưởng!" → rút ngắn "Vượt mỗi 10 tầng là lấy được 1 phần thưởng!"**

Tìm thấy trong skin `SkinTttZhuanpan` (`tttZhuanpan.exml`, dùng bởi `HaoTianTaLotteryWin`). Sửa trực tiếp câu chữ (bỏ cụm "trong hòm giải thưởng") ở cả exml lẫn factory `_Label2_i` trong `default.thm.js`.

**Trục trặc công cụ khi sửa `default.thm.js` cho mục D**: `Edit` tool báo lỗi "String to replace not found" dù `Read`/`Grep` hiển thị chuỗi y hệt — do sai khác chuẩn hoá Unicode (NFC/NFD) giữa cách `Edit` tool so khớp chuỗi và encoding thật trong file đối với các ký tự có dấu tiếng Việt. Khắc phục bằng cách đọc/ghi file trực tiếp qua Python (`open(..., encoding='utf-8')`, `str.replace()`, ghi đè), tránh phụ thuộc vào so khớp chuỗi literal của `Edit` tool cho các đoạn có dấu tiếng Việt dài. Áp dụng luôn cách này cho 2 chỗ sửa còn lại trong `main.min.js` (mục B/C) để nhất quán và chắc chắn đúng nội dung UTF-8 gốc.

Cache-bust: `main.min_ffc375d9.js` → `main.min_09dd49d6.js`, `default.thm_c0862323.js` → `default.thm_d35a4f1b.js`, cập nhật `manifest.json` (`game` list) và `index.php` (`?v=`). Đã xác minh toàn bộ nội dung staged qua `git show :path` (không chỉ working tree, tránh bẫy git-mv-staleness từng gặp): xác nhận đúng cả 4 chỗ sửa (A/B/C/D) đều có mặt và ĐÚNG NGỮ CẢNH (nằm trong class/skin đúng, không lẫn sang bản dead-code), `node -c` qua cả 2 file JS, `xml.etree.ElementTree.parse` qua cả 2 file exml.

**Chưa kiểm chứng bằng ảnh thật**: cỡ chữ 15 cho `closeBtn`/`rewardBtn` là ước lượng (giảm từ mặc định 24/26 của `SkinBtn7`) — cần ảnh xác nhận câu "Thử thách tầng 10" và "Nhận thưởng(Ns)" đã nằm gọn 1 dòng, canh giữa trong nền nút, không còn tràn hoặc xuống 2 dòng; cũng cần xác nhận câu "được phần thưởng như sau" đã hiện đầy đủ, canh giữa đúng.

## 90. Khối "Kinh nghiệm [số]" ở "Vượt ải tầng X thưởng" vẫn tràn/lệch trái với số nhiều chữ số — đổi từ layout ngang sang xếp dọc 2 dòng (2026-07-10)

Ảnh xác nhận mục 88 (`chuangtianguan.exml`, khối "Kinh nghiệm"+exp dưới icon EXP trong panel "Vượt ải tầng X thưởng") cho thấy đúng như cảnh báo "Chưa kiểm chứng" đã ghi ở mục 88: với giá trị exp nhiều chữ số thực tế trên server (vd "120000", 6 chữ số), cụm "Kinh nghiệm 120000" ở size 12 vẫn RỘNG HƠN khung 90px khai báo trên `Group` cha — do layout ngang (`HorizontalLayout`) đặt 2 Label CẠNH NHAU trên cùng 1 dòng, tổng bề rộng luôn tăng theo số chữ số của exp, không có mức size nào vừa vặn cho MỌI giá trị (số càng lớn càng dễ tràn trở lại). `Group` không tự clip nội dung tràn nên phần dư bị đẩy lệch hẳn sang trái, đè lên/tràn qua icon "Tiên Văn Ngẫu Nhiên" kế bên.

**Sửa tận gốc bằng cách đổi kiểu bố cục** (không chỉ chỉnh số/size như mục 88): thay vì xếp "Kinh nghiệm" và số exp NGANG hàng trên 1 dòng (buộc phải cộng dồn bề rộng 2 chuỗi biến thiên), đổi sang xếp DỌC 2 dòng — dòng 1 "Kinh nghiệm", dòng 2 số exp — mỗi Label có `width="90"` + `textAlign="center"` RIÊNG, tự canh giữa độc lập trong khung 90px cố định bất kể độ dài chuỗi. Vì mỗi dòng chỉ cần chứa MỘT chuỗi (chuỗi dài nhất "Kinh nghiệm" ~11 ký tự luôn vừa trong 90px ở size 12), tràn ngang không còn xảy ra dù số exp có bao nhiêu chữ số. Bỏ hẳn `HorizontalLayout` (không cần layout tự động nữa, dùng toạ độ `y` cố định: dòng 1 `y="0"`, dòng 2 `y="15"`), tăng chiều cao `Group` chứa 2 Label từ `height="15"` → `height="30"` cho đủ chỗ 2 dòng.

Đồng bộ `default.thm.js`, class `SkinChuangtianguan`: sửa `_Group2_i` (height 15→30, thêm `width=90`, bỏ gán `layout`), xoá hẳn `_HorizontalLayout3_i` (không còn tham chiếu nào khác trong class, xác nhận qua đếm số lần xuất hiện = 0 trước khi xoá), `nameTxt_i`/`expText_i` (thêm `width=90`, `textAlign="center"` cho cả 2 — trước đó `expText` là `textAlign="left"` vì dựa vào `HorizontalLayout` để định vị, giờ cần tự canh giữa nên đổi lại), toạ độ `y` (0 và 15 thay vì `-1.5` chung cho cả 2 khi còn nằm ngang).

Cache-bust `default.thm_d35a4f1b.js` (mục 89) → `default.thm_216edc12.js` (`main.min.js` không đổi lần này). Xác minh nội dung staged qua `git show :path` đúng phạm vi class `SkinChuangtianguan` (không lẫn `nameTxt_i` của các class khác — file có nhiều class trùng tên hàm do đánh số tự động, ví dụ có 1 `nameTxt_i` khác thuộc `SkinItem3`/text="name" hoàn toàn không liên quan, đã cross-check kỹ theo đúng bài học mục 76/77/82/86/88), `node -c` qua, exml qua `xml.etree.ElementTree.parse`, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cách xếp dọc 2 dòng về lý thuyết chịu được MỌI độ dài số exp (khác với sửa mục 88 chỉ giảm size/gap nhưng vẫn xếp ngang nên vẫn có giới hạn), nhưng cần ảnh xác nhận 2 dòng "Kinh nghiệm" / "[số]" đã canh giữa gọn dưới icon EXP, không còn đè hay tràn qua icon "Tiên Văn Ngẫu Nhiên" kế bên, và khoảng cách 15px giữa 2 dòng đủ thoáng (không dính nhau) mà cũng không đẩy quá xuống dưới gây lệch với hàng icon.

## 91. Tên vật phẩm thưởng ("Tiên Văn Ngẫu Nhiên", "Tiên Văn Tinh Túy") trong panel "Vượt ải tầng X thưởng" bị lệch trái so với icon và bị cắt mất chữ cuối dòng 2 (2026-07-10)

Ảnh xác nhận mục 90 (khối "Kinh nghiệm"/exp) đã đúng, nhưng còn 2 icon vật phẩm kế bên (từ `iconList`/`iconList0`, dùng skin `SkinItem2`) có tên bị lệch hẳn sang trái so với tâm icon, và dòng chữ thứ 2 ("...Nhiê" thay vì "...Nhiên", "Tinh T..." thay vì "Tinh Túy") bị cắt cụt — xác nhận qua crop ảnh phóng to: có 1 đường viền cắt NGANG rõ rệt ngay giữa dòng 2, không phải lỗi màu/độ tương phản mà là cắt hình thật.

**Nguyên nhân — 2 lỗi độc lập cùng nằm trong 1 đoạn code `fixRewardName_a94`** (`main.min.js`, class controller của `SkinChuangtianguan`, gọi qua `TimerMgr.ins().doTimer(50,1,this.fixRewardName_a94,this)` để chỉnh lại tên sau khi List đã tạo xong item ảo — đúng kiểu "chỉnh 2 lần" từng gặp trong game):

1. **Lệch trái**: `nameTxt` gốc trong `ItemSkin2.exml` khai báo `x="-9" width="93"` — với `itemIcon` có tâm nằm ở x=37.5 trong hệ toạ độ cục bộ của skin (tính từ `ItemIconSkin.exml`: `imgBg` rộng 74 canh giữa trong khung 75 → tâm 37.5), thì hộp `nameTxt` (x=-9 đến x=84) có tâm đúng = 37.5, khớp tâm icon — đúng thiết kế gốc. Nhưng `fixRewardName_a94` chỉ đổi `n.width=64` (thu hẹp để chữ tự xuống dòng gọn hơn) mà KHÔNG chỉnh lại `n.x` theo — hộp mới (x=-9 đến x=55) có tâm = 23, lệch trái ~14.5px so với tâm icon thật. Đây là biến thể mới của lỗi "đổi 1 thuộc tính hình học mà quên đồng bộ thuộc tính liên quan" (so sánh với lỗi "quên bù trigger offset" ở các mục trước) — sửa: thêm `n.x=5.5` (giữ tâm hộp = 37.5 với width mới = 64: `37.5 - 64/2 = 5.5`).
2. **Cắt mất chữ dòng 2**: cùng đoạn code set `n.size=14`, bật `n.wordWrap=!0`/`n.multiline=!0` để chữ tự xuống 2 dòng khi dài, nhưng KHÔNG đụng tới `n.height` — trong khi `ItemSkin2.exml` khai báo `nameTxt` với `height="32"` cố định (đủ cho 1 dòng ở size mặc định 16, không đủ cho 2 dòng ở size 14 — 2 dòng cần ~34-36px). Khung chiều cao cố định nhỏ hơn nội dung thật 2 dòng khiến phần dưới dòng 2 bị cắt — đúng kiểu lỗi "khai báo kích thước cố định nhỏ hơn nội dung thật" đã lặp lại nhiều lần trong phiên (mục 88, 90...), lần này ở trục dọc (height) thay vì ngang (width). Sửa: thêm `n.height=36`.

**Bài học tìm đúng chỗ sửa**: hàm `fixRewardName_a94` bị trùng tên ở tận **4 class khác nhau** trong `main.min.js` (dùng cho các panel thưởng khác nhau: 3 bản dùng `this.reward`/`this["reward"+t]` với width/m=88, chỉ 1 bản — đúng bản cần sửa — dùng `this.iconList`/`this.iconList0` với width/m=64). Đã xác nhận đúng bản bằng cách grep toàn bộ 4 vị trí định nghĩa hàm và kiểm tra nội dung từng bản (`iconList0` chỉ xuất hiện trong đúng 1 bản) trước khi sửa — đúng bài học "trùng tên hàm/pattern nhưng khác class" đã đúc kết ở mục 77/89.

Cache-bust `main.min_09dd49d6.js` (mục 89) → `main.min_2e1161f8.js` (`default.thm.js` không đổi lần này, chỉ là JS logic thuần không liên quan tới skin/exml). Xác minh nội dung staged qua `git show :path`: đúng offset trong bản có `iconList0`, `node -c` qua, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: `x=5.5`/`height=36` là tính toán hình học dựa trên số liệu khai báo trong skin (không phải đoán mò), nhưng cần ảnh xác nhận tên "Tiên Văn Ngẫu Nhiên"/"Tiên Văn Tinh Túy" đã canh giữa đúng dưới icon và hiển thị đầy đủ cả 2 dòng, không còn bị cắt.

## 92. Ảnh xác nhận mục 91: tên item canh giữa đúng nhưng nhảy 3 dòng; thêm 2 lỗi mới — "Hướng dẫn chơi" wrap 2 dòng, tên Boss "7Tầng" sai thứ tự + wrap 2 dòng (2026-07-10)

Người dùng gửi 3 ảnh xác nhận đợt sửa mục 91 đã canh giữa đúng tâm icon (không còn lệch trái), nhưng tên dài như "Tiên Văn Ngẫu Nhiên" giờ nhảy thành 3 DÒNG ("Tiên Văn" / "Ngẫu Nhiê" / "n" — chữ "n" cuối bị tách rời xuống dòng 3 riêng lẻ). Kèm theo 2 lỗi mới hoàn toàn không liên quan tới các item trước: (1) màn "Cách chơi" — dòng link "Hướng dẫn chơi" ở đầu mỗi banner hoạt động bị wrap 2 dòng ("Hướng dẫn ch" / "ơi"); (2) màn hình chiến đấu boss Hạo Thiên Tháp — tên boss vẫn còn "7Tầng Thủ Tướng·Thanh Ngọc" (số đứng trước "Tầng", sai văn phạm tiếng Việt) và bị wrap xuống dòng 2 ("Xà Long(Cấp 82)") đè lên thanh máu.

**A. Tên item nhảy 3 dòng — nguyên nhân: xung đột giữa wrap thủ công và wrap tự động của Egret.**

Đoạn code `fixRewardName_a94` (mục 91) set `n.wordWrap=!0` (bật wrap tự động của Label) TRƯỚC KHI gọi `wrapVN_px_a94(n,o,64)` (hàm wrap thủ công theo từ, tự chèn `\n`). Khi `wordWrap=true` đã bật, mỗi lần hàm thủ công gán tạm `t.text=x` để đo `t.textWidth` (nhằm quyết định có nên xuống dòng hay không), Egret TỰ ĐỘNG xuống dòng đoạn `x` đó trước khi đo — khiến `t.textWidth` phản ánh bề rộng dòng đã wrap (luôn ≤ 64) thay vì bề rộng thật của cả đoạn `x` trên 1 dòng, làm thuật toán thủ công đánh giá sai "vẫn vừa" và không tách dòng đúng chỗ. Kết quả: dòng "Ngẫu Nhiên" (đã hợp thành 1 khối bởi hàm thủ công) khi render vẫn còn dư quá 64px nên bị `wordWrap` tự động xẻ thêm 1 lần nữa — sinh dòng 3 orphan ("n").

Sửa: đổi `n.wordWrap=!0` → `n.wordWrap=!1` (tắt wrap tự động của Egret, chỉ dựa hoàn toàn vào `\n` thủ công từ `wrapVN_px_a94`, đo `textWidth` chính xác không bị nhiễu). Sau khi có kết quả wrap thủ công, nếu vẫn còn quá 2 dòng (tên quá dài, không thể vừa 2 dòng dù đã wrap theo từ), CHỦ ĐỘNG cắt bớt dòng 2 bằng vòng lặp rút ký tự + thêm ".." (tái dùng đúng kỹ thuật đã có sẵn trong `ItemBase.setNameText_a94` của chính codebase) cho tới khi `textWidth<=64` — đúng yêu cầu người dùng "cho thêm giới hạn để hiển thị tên trên 2 dòng là ok" (chấp nhận cắt bớt, không cần hiện đủ tên nếu quá dài).

**Trục trặc kỹ thuật khi áp dụng fix A**: soạn chuỗi JS chứa `"\n"` (2 ký tự: backslash + n) bằng `python3 -c "..."` gọi qua Bash — chuỗi Python lồng trong dấu nháy kép của Bash bị "double-escape" qua 2 lớp (Bash rồi Python) biến `\\n` thành 1 ký tự xuống dòng THẬT (0x0A) thay vì 2 ký tự `\`+`n`, làm hỏng cú pháp chuỗi JS (`node -c` báo lỗi cú pháp ngay). Phát hiện qua so sánh mã hex từng ký tự (`hex(ord(c))`) thay vì chỉ nhìn `repr()` (repr() hiển thị newline thật và chuỗi `\n` y hệt nhau, dễ đánh lừa). Khắc phục bằng cách ghi script ra file `.py` riêng rồi chạy `python3 script.py` (tránh hoàn toàn lớp escape của Bash `-c`) — bài học mới: **khi cần chèn ký tự escape đặc biệt (`\n`, `\t`, dấu ngoặc kép lồng nhau...) vào code qua Python, luôn ghi ra file script thay vì truyền qua `bash -c "..."`/`python3 -c "..."` để tránh double-escape giữa 2 lớp quoting.**

**B. "Hướng dẫn chơi" wrap 2 dòng ở màn "Cách chơi"**: tìm thấy 4 Label trùng lặp `info1`/`info2`/`info3`/`info4` trong `playWaySkin.exml` (`SkinplayWay`, dùng cho 4 banner hoạt động: 世界Boss, 万仙杀劫, 聚灵夺阵, 弥罗珍宝殿), tất cả cùng khai báo `text="Hướng dẫn chơi" size="20" width="120"` — đúng kiểu lỗi "khai báo width cố định nhỏ hơn nội dung thật" lặp lại (mục 88/90/91), lần này width=120 quá hẹp cho chuỗi 14 ký tự ở size 20. Sửa: tăng cả 4 lên `width="180"`, đồng bộ cả 4 hàm `infoN_i` tương ứng trong `default.thm.js` (đã xác nhận đúng phạm vi class `SkinplayWay` qua cross-check, tránh đụng các `infoN_i` cùng tên ở class khác). Nhân tiện phát hiện và sửa luôn 1 chỗ TƯƠNG TỰ ở `KFBattleListSkin.exml` (`helpLink0`, cùng `text="Hướng dẫn chơi" width="120"` y hệt bug pattern) dù người dùng chưa báo màn đó — rủi ro thấp (chỉ tăng width, không đổi logic) nên sửa kèm luôn cho nhất quán.

**C. Tên Boss "7Tầng" sai thứ tự + wrap 2 dòng đè thanh máu**: trong `main.min.js`, hàm `updateInfoOfBase_a94` (class dùng skin `SkinBossBlood`) build tiền tố tên boss bằng `t+"Tầng Thủ Tướng·"` (biến số tầng `t` đứng TRƯỚC chữ "Tầng", y hệt lỗi thứ tự từ đã sửa ở mục 89 cho nút "Thử thách thứ X tầng"). Sửa thành `"Tầng "+t+" Thủ Tướng·"`. Đồng thời tăng `nameTxt.width` (230→320) và giảm `nameTxt.size` (18→15) NHƯNG CHỈ khi có tiền tố tầng (`i` khác rỗng, tức chỉ áp dụng cho boss Hạo Thiên Tháp/Trùng Thiên) — xác nhận an toàn vì đã tra hàm `checkSeeAwardBtnShow_a94` và thấy nút "Phần thưởng" (`tipBtn0`, cùng hàng ngang gần đó) LUÔN ẨN với `GameMap.fbType==UserFb.FB_TYPE_TIAOZHAN` nên mở rộng box không va chạm; các label khác cùng khung ("X5", "100%") nằm ở HÀNG DƯỚI (y khác) nên không lo đụng theo chiều ngang. Với các loại boss khác (không có tiền tố tầng) vẫn giữ nguyên `width=230,size=18` mặc định như cũ, không ảnh hưởng.

Cache-bust cả 2 file: `main.min_2e1161f8.js` (mục 91) → `main.min_56e951f1.js`, `default.thm_216edc12.js` (mục 90) → `default.thm_983c38aa.js`. Xác minh nội dung staged qua `git show :path`: cả 3 chỗ sửa (A/B/C) đúng phạm vi/đúng class, `node -c` qua cả 2 (sau khi phát hiện+sửa lỗi double-escape ở trên), `xml.etree.ElementTree.parse` qua cả 2 exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cả 3 fix đều dựa trên đọc code + suy luận hình học/logic (không tự render được Egret canvas) — cần ảnh xác nhận: (A) tên item dài giờ tối đa 2 dòng, dòng 2 có thể bị cắt bớt kèm ".." nếu quá dài nhưng không còn nhảy dòng 3; (B) "Hướng dẫn chơi" đã hiện gọn 1 dòng ở cả 4 banner; (C) tên boss hiện đúng "Tầng 7 Thủ Tướng·..." và nằm gọn 1 dòng, không đè lên thanh máu.

## 93. Ảnh xác nhận mục 92: tên item ("Phần Thiên Quyết") ở màn Thủ Hộ Thần Kiếm vẫn cắt dòng 2; màn BOSS Cá Nhân tên+cấp dính liền và list bên phải quá dài tràn nút; popup chiến thắng vẫn còn mất chữ "N" đầu câu (2026-07-10)

Người dùng gửi 3 ảnh: (1) màn "Thủ Hộ Thần Kiếm" (Guard Weapon) — icon thưởng "Phần Thiên Quyết"/"Đạo Tạng Tàn Quyển" bị wrap kiểu cắt NGANG TỪ ("Phần Thiên Q" / "uyết") và dòng 2 bị mất nửa trên; (2) màn "BOSS" tab "BOSS Cá Nhân" — khung preview bên trái hiện "Đế QuânCấp 120" dính liền không xuống dòng, còn danh sách boss bên phải mỗi nút hiện "Tên Boss·Cấp/Chuyển X" quá dài bị cắt cụt hết; (3) popup chiến thắng (dạng lưới 12 ô thưởng) vẫn còn mất chữ "N" đầu câu "Nhận được phần thưởng như sau:" — y hệt lỗi mục 89 nhưng ở MỘT class Result khác.

**A. "Phần Thiên Quyết" cắt dòng 2 ở Thủ Hộ Thần Kiếm — lỗi gốc dùng chung, không phải lỗi riêng màn này.**

Màn này (`GuardWeaponView`, skin `SkinGuardGodWeapon`) dùng `itemList.itemRenderer=BagItemBase` — tức đi qua hàm CHUNG `ItemBase.prototype.setNameText_a94` (KHÔNG qua `fixRewardName_a94` như tháp/mục 91-92), hàm này vốn được viết để CẮT NGẮN 1 DÒNG kèm "..." khi tên quá dài (`while(s.length>1){s=s.slice(0,-1);e.text=s+"..";if(e.textWidth<=i)break}`). Nhưng logic đo `e.textWidth` để quyết định có cắt hay không bị VÔ HIỆU vì `nameTxt` (skin `SkinItem2`) mặc định có `wordWrap` bật sẵn ở tầng framework — khi gán `e.text=t` (tên đầy đủ), engine tự xuống dòng theo KÝ TỰ (không phải theo từ) trước khi đo, nên `e.textWidth` luôn ≤ width khai báo → điều kiện `e.textWidth>i` không bao giờ đúng → vòng lặp cắt KHÔNG BAO GIỜ chạy → tên dài cứ thế tự wrap loạn (cắt giữa từ) mà không được cắt gọn như hàm dự định. Đây là bản chất GIỐNG HỆT lỗi wordWrap-xung-đột đã tìm ra ở mục 92 (mục A), nhưng lần này nằm ở hàm `setNameText_a94` DÙNG CHUNG cho rất nhiều màn hình khác trong game (không riêng gì Thủ Hộ Thần Kiếm) — sửa 1 chỗ duy nhất `e.wordWrap=!1` ngay đầu hàm (trước khi đo/gán) để khôi phục đúng hành vi cắt-1-dòng-kèm-"..." đã được thiết kế sẵn, đồng thời fix luôn mọi màn khác trong game gặp cùng lỗi tiềm ẩn này (không chỉ riêng "Phần Thiên Quyết").

**B. Màn "BOSS" — 2 phần riêng biệt (`PersonalBossPanel`, skin `SkinPersonalBossPanel`):**
- *Preview bên trái*: `setWin()` build `this.nameTxt.text=""+e.name+t` (tên + cấp dính liền, không dấu cách/không xuống dòng). Sửa: chèn ký tự xuống dòng thật giữa 2 phần (`String.fromCharCode(10)` — tránh dùng chuỗi `"\n"` trực tiếp qua `python3 -c` vì đã dính lỗi double-escape ở mục 92), bật `nameTxt.multiline=!0`, tăng `nameTxt.height` (25→50, đủ chỗ 2 dòng ở size 22) để "Cấp 120" xuống dòng dưới "Đế Quân", vẫn canh giữa (`textAlign="center"` có sẵn, giữ nguyên vì người dùng chỉ muốn tách dòng, không đổi canh lề).
- *Danh sách bên phải* (`PersonalBossesItem`, skin `SkinPersonalBossItem`): theo đúng gợi ý người dùng đưa ra ("chỉ cho xem tên boss thôi"), bỏ hẳn phần nối `"·"+i` (cấp/chuyển sinh/thẻ đặc quyền) — đổi `this.nameTxt.text=e.name+"·"+i` → `this.nameTxt.text=e.name`. Tên riêng boss ngắn hơn nhiều so với cụm đầy đủ nên gần như chắc chắn vừa khung nút 140px có sẵn mà không cần đụng tới skin/kích thước nút — đúng tinh thần "đổi cách hiển thị thay vì cơi nới khung" mà người dùng gợi ý, rủi ro thấp hơn nhiều so với redesign layout.

**C. Popup chiến thắng vẫn mất chữ "N" — lại là bài học "trùng pattern khác class" (biến thể mới).**

Bài học mục 89 tưởng đã xử lý dứt điểm ("Nhận được phần thưởng như sau:" bị lệch trái do `horizontalCenter="-176.5"` thiếu `width` cho `textAlign`) hoá ra CÙNG MỘT lỗi y hệt tồn tại độc lập ở NHIỀU class Result khác nhau — mỗi class có skin RIÊNG (không dùng chung file exml), nên sửa 1 class không tự động sửa các class khác dù lỗi giống hệt nhau. Ảnh này thuộc popup của `PersonResultWin` (skin `SkinPersonalBossResult`, dùng cho fbType Personal Boss VÀ Guard Weapon — xác nhận qua `ResultMgr.create`'s switch: `case UserFb.FB_TYPE_PERSONAL: case UserFb.FB_TYPE_GUARD_WEAPON: ... PersonResultWin`), KHÁC với `TongResultedWin` (skin `SkinChuangtianguanResult`, dùng cho tháp) đã sửa ở mục 89. Áp dụng chính xác cùng 1 fix đã dùng ở mục 89: `PersonalBossResultSkin.exml` + `default.thm.js`'s `txt_i` trong đúng phạm vi class `SkinPersonalBossResult`, đổi `horizontalCenter="-176.5"` → `horizontalCenter="0"`. (Ghi chú: qua rà soát trước đó ở mục 89 đã biết còn ít nhất 1-2 occurrence tương tự nữa ở các class Result khác trong `default.thm.js` — CHƯA sửa vì chưa có ảnh xác nhận màn nào dùng tới, sẽ xử lý khi người dùng gặp và báo cụ thể.)

Cache-bust: `main.min_56e951f1.js`→`main.min_65cb5278.js`, `default.thm_983c38aa.js`→`default.thm_24be90fb.js`. Xác minh nội dung staged qua `git show :path`: cả 4 chỗ sửa (A/B-preview/B-list/C) đúng phạm vi/đúng class, `node -c` qua cả 2, `xml.etree.ElementTree.parse` qua 2 exml đã sửa, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: fix A (tắt wordWrap trong hàm dùng chung) có phạm vi ảnh hưởng RỘNG (mọi màn dùng `ItemBase.setNameText_a94`) — về lý thuyết chỉ khôi phục đúng hành vi cắt-1-dòng-kèm-"..." đã được code sẵn từ trước (không phải hành vi mới), rủi ro thấp, nhưng chưa có cách kiểm tra tất cả màn hình liên quan; cần ảnh xác nhận "Phần Thiên Quyết" hiện gọn (1 dòng, có thể kèm "..." nếu vẫn dài) không còn cắt dòng 2, "Đế Quân"/"Cấp 120" đã tách 2 dòng rõ ràng, danh sách boss bên phải chỉ còn tên (không còn tràn), và câu "Nhận được phần thưởng như sau" đã hiện đầy đủ ở popup chiến thắng dạng lưới 12 ô.

## 94. Ảnh xác nhận mục 93: preview boss "Đại Hoang Vũ Dân" tự xuống dòng giữa từ ("...Dâ" / "n") thay vì chỉ xuống dòng ở phần Cấp (2026-07-10)

Fix mục 93 (chèn `\n` giữa tên boss và "Cấp X"/"Chuyển X", bật `multiline=!0`) chỉ giải quyết ĐÚNG 1 nửa vấn đề — quên tắt `wordWrap`, nên với tên boss dài hơn `width=170` (vd "Đại Hoang Vũ Dân"), engine vẫn TỰ ĐỘNG xuống dòng thêm 1 lần nữa ở chỗ tràn khung (theo ký tự, không theo từ), cắt ngay giữa tên thành "Đại Hoang Vũ Dâ" / "n" — đúng lại bài học "xung đột wordWrap tự động với `\n` thủ công" đã đúc kết ở mục 92 nhưng lần này tự mình lặp lại thiếu sót tương tự ở 1 chỗ sửa mới. Người dùng yêu cầu rõ: tên boss dù dài cũng phải nằm nguyên 1 dòng (chấp nhận tràn ra ngoài khung nếu cần), chỉ có phần "Cấp X"/"Chuyển X" mới được xuống dòng riêng, và nếu sau này có cả "Chuyển" lẫn "Cấp" thì 2 phần đó phải nằm chung 1 dòng (không tách nhau) — điều này vốn đã tự động đúng vì code hiện chỉ chọn 1 trong 3 nhánh (`"Chuyển "+zsLevel` HOẶC `"Cấp "+levelLimit` HOẶC `"Cấp "+level`), không bao giờ tách rời 2 cụm đó.

Sửa: thêm `this.nameTxt.wordWrap=!1` (đặt cùng chỗ với `multiline=!0`) trong `PersonalBossPanel.prototype.setWin` — giờ CHỈ có `\n` thủ công tạo dòng mới, tên boss dù dài bao nhiêu cũng ở nguyên 1 dòng (tràn ra ngoài `width=170` nếu cần, do `textAlign="center"` nên phần tràn sẽ lan đều 2 bên tâm, không lệch hẳn 1 phía). Đồng bộ `wordWrap="false"` vào `PersonalBossPanelSkin.exml` và factory `nameTxt_i` trong `default.thm.js` (đúng phạm vi class `SkinPersonalBossPanel`) để khớp trạng thái khởi tạo với trạng thái JS set động.

Cache-bust: `main.min_65cb5278.js`→`main.min_58543414.js`, `default.thm_24be90fb.js`→`default.thm_ea2e7eae.js`. Xác minh nội dung staged qua `git show :path`: `node -c` qua cả 2, `xml.etree.ElementTree.parse` qua exml, đúng cả `wordWrap=false` xuất hiện ở cả 3 nơi (JS override, exml, default.thm.js factory).

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận "Đại Hoang Vũ Dân" (và các tên boss dài khác) nay hiện trọn vẹn 1 dòng không bị cắt giữa từ, dòng "Cấp X"/"Chuyển X" vẫn xuống dòng riêng bên dưới như mục 93 đã làm đúng.

## 95. Ảnh xác nhận mục 94: tên Boss vẫn xuống dòng giữa từ ("Phá Linh Giảo Yê" / "u", "Tử Minh Cuồng P" / "hủ"); thêm yêu cầu cho các nút tab "BOSS Cá Nhân"/"BOSS Hoang Dã"... xuống 2 dòng vì đang bị tràn (2026-07-10)

Sau 2 lần sửa liên tiếp (mục 93 chèn `\n` thủ công, mục 94 thêm `wordWrap=!1`) mà tên boss VẪN còn bị wrap cắt giữa từ y hệt — cho thấy `wordWrap=false` kết hợp `multiline=true` không đáng tin cậy để chặn auto-wrap trên `nameTxt` này trong engine game (không tự render/kiểm chứng được nguyên nhân chính xác ở tầng framework). Thay vì tiếp tục "vá" cùng 1 Label bằng cách chỉnh cờ thuộc tính, đổi hẳn SANG KIẾN TRÚC AN TOÀN HƠN: tách "tên boss" và "Cấp/Chuyển X" thành **2 Label ĐỘC LẬP** (giống hệt pattern đã có sẵn ở nơi khác trong chính codebase này — class `BossesItem`/`WorldBossesItem` vốn đã dùng `nameTxt`+`nameTxt0` làm 2 Label riêng cho tên+cấp, không hề dùng `\n`/multiline). Một Label KHÔNG multiline, không chứa `\n`, mặc định KHÔNG wrap — nên không còn phụ thuộc vào việc `wordWrap=false` có thật sự "ăn" hay không.

Sửa `PersonalBossPanelSkin.exml` (+ `default.thm.js` class `SkinPersonalBossPanel`, thêm hẳn 1 skin part mới `levelTxt`, chèn vào đúng `skinParts` và `elementsContent`, viết factory `levelTxt_i` mới): `nameTxt` trở lại đơn giản (bỏ hết `multiline`/`wordWrap`/`height` đã thêm ở mục 93-94, giữ nguyên `width="170" textAlign="center"` — nếu tên vẫn dài hơn 170px sẽ tự tràn đều 2 bên tâm chứ không cắt/không wrap, đúng ý người dùng "dù dài cũng trên 1 dòng"), thêm `levelTxt` mới (size 18, nhỏ hơn tên 1 chút cho phân cấp thị giác, đặt y=72 ngay dưới `nameTxt` y=46). `main.min.js`'s `setWin()`: đổi `this.nameTxt.text=...+"\n"+t` (1 label gộp) → `this.nameTxt.text=""+e.name,this.levelTxt.text=t` (2 lệnh gán độc lập, đơn giản, không còn liên quan gì đến ký tự xuống dòng hay cờ wrap nữa).

**Nút tab "BOSS Cá Nhân"/"BOSS Hoang Dã"/"Thiên Địa Yêu..."/"Vạn Ma Tổ Địa"/"Đế Thiên Cung" bị tràn, yêu cầu chuyển 2 dòng**: đây là `TabBar` trong `BossSkin.exml` dùng `itemRendererSkinName="SkinBtnTab0"` — đúng skin CHIA SẺ rộng rãi (dùng ở TreasureWin, ladder, AdvanEquip, RoleWin, và nhiều màn khác), không được sửa trực tiếp (bài học "scoped-skin-clone" mục 85). Thay vì tự tạo bản clone mới từ đầu, phát hiện codebase đã CÓ SẴN đúng bản clone cần dùng: `SkinBtnTab0Wide` (`BtnTab0WideSkin.exml`, đang được `DailyFbSkin.exml` dùng) — label đã có sẵn `size="14" width="100" multiline="true" wordWrap="true" lineSpacing="1"`, đúng y hệt nhu cầu (tab rộng, chữ nhỏ hơn, tự xuống 2 dòng theo TỪ vì đây dùng `wordWrap=true` NGAY TỪ ĐẦU chứ không chèn `\n` thủ công — không dính lỗi xung đột như nameTxt boss ở trên, vì đây chưa từng bị sửa/can thiệp gì, là cấu hình gốc đã hoạt động ổn định cho `DailyFbSkin`). Chỉ cần đổi `itemRendererSkinName="SkinBtnTab0"` → `"SkinBtnTab0Wide"` trong `BossSkin.exml`, và đồng bộ đúng 1 dòng `t.itemRendererSkinName=` trong `default.thm.js` (đã xác nhận đúng phạm vi class `SkinBoss`, không đụng các `tab_i` cùng tên ở ~30 class TabBar khác trong file — cross-check qua boundary `window.SkinBoss = (function`...`return SkinBoss;`).

Cache-bust: `main.min_58543414.js`→`main.min_4876f1b8.js`, `default.thm_ea2e7eae.js`→`default.thm_652f1a47.js`. Xác minh nội dung staged qua `git show :path`: `node -c` qua cả 2, `xml.etree.ElementTree.parse` qua 2 exml, `levelTxt` có mặt đúng trong `skinParts`/`elementsContent`/factory riêng của `SkinPersonalBossPanel`, `tab_i` trong đúng phạm vi `SkinBoss` đã đổi sang `SkinBtnTab0Wide`, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: kiến trúc 2-Label-độc-lập cho tên/cấp boss về lý thuyết loại bỏ hoàn toàn nguồn gốc lỗi wrap (không còn phụ thuộc cờ wordWrap nữa), và việc tái dùng `SkinBtnTab0Wide` đã CÓ SẴN (không phải cấu hình mới chưa kiểm chứng) giúp giảm rủi ro — nhưng vẫn cần ảnh xác nhận: tên boss dài (vd "Đại Hoang Vũ Dân", "Phá Linh Giảo Yêu") hiện trọn 1 dòng, dòng "Cấp X" tách riêng bên dưới; và 5 nút tab dưới cùng màn BOSS đã xuống 2 dòng gọn gàng, không còn bị cắt chữ ở nút nào.

## 96. Ảnh xác nhận mục 95: nút tab đã xuống 2 dòng OK, nhưng tên Boss VẪN xuống dòng dù đã tách thành Label riêng ("Đại Hoang Vũ Dâ"/"n" đè lên "Chuyển 12") (2026-07-10)

Tin tốt: fix nút tab (`SkinBtnTab0Wide`) đã đúng — cả 5 nút "BOSS Cá Nhân", "BOSS Hoang Dã", "Thiên Địa Yêu Trủng", "Vạn Ma Tổ Địa", "Yêu Đế Thiên Cung" đều hiện gọn 2 dòng, không còn tràn/cắt chữ. Nhưng phần tách `nameTxt`/`levelTxt` thành 2 Label riêng (mục 95) KHÔNG giải quyết được vấn đề — tên boss vẫn tự xuống dòng y hệt cũ ("Đại Hoang Vũ Dâ"/"n", "Phá Linh Giảo Yê"/"u", "Xích Vong Thiên"/"Cô"), chữ dòng thừa còn ĐÈ CHỒNG lên dòng "Chuyển X" bên dưới.

**Phát hiện quan trọng**: giả định trước đó ("Label không set `multiline` thì mặc định không wrap") SAI trong engine/theme của game này. Dù `nameTxt` giờ là Label ĐỘC LẬP, hoàn toàn không chèn `\n`, không set `multiline`/`wordWrap` (bỏ trống = dùng mặc định) — nó VẪN tự động wrap khi nội dung vượt quá `width` khai báo. Điều này cho thấy `wordWrap`/`multiline` MẶC ĐỊNH LÀ TRUE ở tầng theme/skin chung cho `eui.Label` trong bản build này (khác với mặc định `false` tiêu chuẩn của Egret) — bất kỳ Label nào có khai báo `width` cố định và nội dung vượt quá đều tự xuống dòng trừ khi ép rõ ràng `wordWrap="false"` (không phải "không set thì đã là false" như đã lầm tưởng ở mục 95).

Sửa: khai báo tường minh `multiline="false" wordWrap="false"` ngay trên `nameTxt` trong `PersonalBossPanelSkin.exml`, đồng bộ `default.thm.js`'s `nameTxt_i` (`t.multiline=false; t.wordWrap=false;`), VÀ phòng hờ thêm set lại 2 cờ này ngay trong `main.min.js`'s `setWin()` trước khi gán `.text` (`this.nameTxt.multiline=!1,this.nameTxt.wordWrap=!1` — đặt tường minh ở CẢ 3 nơi: skin exml, factory compiled, và JS runtime, để chắc chắn không còn nơi nào có thể vô tình để lại giá trị mặc định true).

Cache-bust: `main.min_4876f1b8.js`→`main.min_ea858e19.js`, `default.thm_652f1a47.js`→`default.thm_0a8aaa85.js`. Xác minh nội dung staged qua `git show :path`: cả 3 nơi (exml/factory/JS runtime) đều có `multiline=false`/`wordWrap=false` tường minh, `node -c` qua cả 2, `xml.etree.ElementTree.parse` qua exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: đây là lần thứ 3 thử sửa cùng 1 vấn đề (mục 93→94→95→96) — lần này ép tường minh cả 3 tầng thay vì dựa vào mặc định, tự tin hơn nhưng vẫn cần ảnh xác nhận cuối cùng vì đã sai giả định 2 lần liên tiếp trước đó; nếu vẫn còn lỗi cần cân nhắc hướng khác hẳn (vd giảm size chữ tên boss động theo độ dài, hoặc cho phép tràn có kiểm soát bằng scale nhỏ lại thay vì cố định size 22).

## 97. Ảnh xác nhận mục 96: người dùng đã deploy đè nhưng tên Boss VẪN xuống dòng y hệt — bỏ hẳn cách chặn wordWrap, quay về kỹ thuật "bỏ width, để horizontalCenter tự canh theo nội dung thật" (2026-07-10)

Người dùng xác nhận đã deploy đè (copy file mới + có thể đã restart) nhưng kết quả GIỐNG HỆT ảnh trước — chứng tỏ giả thuyết "ép `wordWrap=false`/`multiline=false` tường minh ở 3 tầng" (mục 96) cũng SAI, hoặc engine hoàn toàn không đọc 2 cờ này theo cách mong đợi cho riêng Label này. Sau 3 lần thất bại liên tiếp với hướng tiếp cận "chặn cờ wrap", quyết định BỎ HẲN hướng đó, quay lại kỹ thuật đã CHẮC CHẮN hiệu quả trong chính phiên này ở mục 88 ("Kinh nghiệm" block): **bỏ hẳn thuộc tính `width` trên Label** — không có `width` khai báo thì KHÔNG CÓ khung nào để bất kỳ cơ chế wrap nào (dù nguyên nhân thật sự là gì) có thể dựa vào để quyết định xuống dòng; `horizontalCenter` khi đó sẽ tự canh giữa dựa trên kích thước THẬT của nội dung (không phải khung khai báo) — cách này không phụ thuộc vào việc hiểu đúng bản chất cờ `wordWrap`/`multiline` của engine, chỉ cần đúng 1 nguyên lý đã kiểm chứng nhiều lần trong phiên: "không có width thì không có gì để wrap theo".

Sửa `PersonalBossPanelSkin.exml`: bỏ hẳn `width="170"` và `textAlign="center"` (đã vô nghĩa khi không có `width`) trên `nameTxt`, chỉ còn `horizontalCenter="-65"` để tự canh giữa theo nội dung thật (không giới hạn độ dài). Đồng bộ `default.thm.js`'s `nameTxt_i` (bỏ `t.width` và `t.textAlign`). `levelTxt` GIỮ NGUYÊN có `width="170"`/`textAlign="center"` (không đổi) vì nó luôn ngắn ("Cấp X"/"Chuyển X"), không có rủi ro tràn, và cần khung cố định để canh giữa nhất quán dưới `nameTxt`. `main.min.js` không cần sửa lại (giữ nguyên `this.nameTxt.multiline=!1,this.nameTxt.wordWrap=!1` từ mục 96 — vô hại dù có hiệu lực hay không, không gỡ bỏ để tránh thay đổi không cần thiết).

Cache-bust: chỉ `default.thm_0a8aaa85.js` (mục 96) → `default.thm_af7a9ba9.js` (`main.min.js` không đổi lần này). Xác minh nội dung staged qua `git show :path`: `nameTxt_i` đã bỏ đúng `width`/`textAlign`, `node -c` qua, `xml.etree.ElementTree.parse` qua exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: đây là lần thứ 4 sửa cùng 1 vấn đề — lần này đổi hẳn CHIẾN LƯỢC (không còn cố hiểu/chặn cờ wrap của engine nữa) thay vì tiếp tục tinh chỉnh cùng 1 hướng đã thất bại 3 lần, dựa trên nguyên lý đã có bằng chứng thành công thật (mục 88) chứ không phải suy đoán mới — nhưng vẫn bắt buộc cần ảnh xác nhận vì mọi giả thuyết trước đó về hành vi wrap của engine này đều đã sai ít nhất 1 lần.

## 98. Ảnh xác nhận mục 97: "Đại Hoang Vũ Dân" nay hiện trọn 1 dòng, "Chuyển 12" xuống dòng riêng — THÀNH CÔNG sau 4 lần sửa. Yêu cầu thêm: đổi màu chữ "Cấp X"/"Chuyển X" sang vàng (2026-07-10)

Xác nhận: fix mục 97 (bỏ hẳn `width` trên `nameTxt`, để `horizontalCenter` tự canh theo nội dung thật) đã giải quyết DỨT ĐIỂM lỗi wrap tên boss sau 4 lần thử (mục 93→94→95→96→97) — bài học: khi 1 giả thuyết về hành vi engine (ở đây là cờ `wordWrap`/`multiline`) sai liên tiếp nhiều lần, nên chuyển hẳn sang kỹ thuật khác đã có BẰNG CHỨNG THÀNH CÔNG THẬT trong cùng dự án thay vì tiếp tục tinh chỉnh cùng giả thuyết.

Yêu cầu thêm: đổi màu chữ `levelTxt` ("Cấp 70"/"Chuyển 12"...) từ trắng (`0xffffff`) sang vàng (`0xffff00` — màu vàng chuẩn dùng xuyên suốt codebase cho các nhãn phụ/nổi bật, vd câu "Vượt mỗi 10 tầng..." ở mục 89). Sửa `PersonalBossPanelSkin.exml` + `default.thm.js`'s `levelTxt_i` (đúng phạm vi class `SkinPersonalBossPanel`). Không có nơi nào trong `main.min.js` set `textColor` động cho `levelTxt` nên chỉ cần sửa 2 chỗ khai báo tĩnh này là đủ.

Cache-bust: chỉ `default.thm_af7a9ba9.js` (mục 97) → `default.thm_69c7846d.js` (`main.min.js` không đổi). Xác minh nội dung staged qua `git show :path`: `node -c` qua, `xml.etree.ElementTree.parse` qua exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: đổi màu tĩnh đơn giản, rủi ro thấp — cần ảnh xác nhận "Cấp X"/"Chuyển X" đã hiện màu vàng dưới tên boss.

## 99. Màn "BOSS Hoang Dã" (`SkinPublicBossPanel`/`SkinBossItem`): "Số lần thách đấu" đè lên số đếm, tên boss trong danh sách đè lên caption "Chuyển X" của vật phẩm thưởng đầu tiên (2026-07-10)

Người dùng gửi ảnh tab "BOSS Hoang Dã" (khác màn "BOSS Cá Nhân" đã sửa các mục 93-98) và yêu cầu tự rà soát, áp dụng đúng các kỹ thuật đã đúc kết trong `claude.md` để sửa toàn bộ chỗ chồng chữ nhìn thấy được, không chờ chỉ từng chỗ cụ thể. Xác định 2 lỗi qua ảnh phóng to:

**A. "Số lần thách đấu：" đè lên số đếm "12/20"** (`PublicBossPanelSkin.exml`, đầu màn): 2 Label được đặt bằng toạ độ `x` CỐ ĐỊNH tách rời (`x="15.36"` và `x="110.36"`) mà không tính đến độ dài thật của label đầu ("Số lần thách đấu：" ở size 20 rộng hơn nhiều so với khoảng cách 95px giữa 2 toạ độ) — đúng kiểu lỗi "đoán mò offset cố định thay vì đo nội dung thật" đã lặp lại nhiều lần trong phiên. Sửa theo đúng phong cách đã dùng ở các mục trước (thay vì đoán 1 con số x mới): gộp 2 Label vào 1 `Group` dùng `HorizontalLayout`, để vị trí luôn tự tính đúng theo độ dài thật của label đầu bất kể sau này đổi câu chữ/cỡ chữ.

**B. Tên boss trong danh sách (`nameTxt` của `SkinBossItem`, vd "Đại Hoang Vũ Dân") đè lên caption "Chuyển 12" của vật phẩm thưởng đầu tiên bên cạnh**: `nameTxt` vốn KHÔNG có `width` (dù có `textAlign="center"` — lại đúng bug quen thuộc "textAlign vô nghĩa khi thiếu width"), và `BossesItem` (class điều khiển) không đi qua `ItemBase.setNameText_a94` dùng chung (đã sửa ở mục 93) mà tự gán `text` trực tiếp, không có cơ chế cắt ngắn nào — tên dài tự do tràn sang khu vực 3 icon thưởng kế bên. Sửa: thêm `width="110"` cho `nameTxt` (đủ hẹp để không chạm khu vực reward icon, ước lượng dựa trên vị trí tương đối của icon chân dung boss và điểm bắt đầu danh sách reward, không phải số đo chính xác từ render thật), và bổ sung logic cắt-kèm-".." trực tiếp trong `BossesItem.prototype.dataChanged` — TÁI SỬ DỤNG nguyên văn kỹ thuật vòng lặp `while(s.length>1){s=s.slice(0,-1);...if(textWidth<=width)break}` đã có sẵn ở `ItemBase.setNameText_a94` (mục 93), áp dụng cục bộ cho class này vì nó không thừa hưởng từ `ItemBase`.

Đồng bộ `default.thm.js`: `SkinBossItem`'s `nameTxt_i` (thêm `t.width=110`), `SkinPublicBossPanel`'s `_Group1_i` (đổi elementsContent trỏ sang `_Group2_i()` mới bọc `_Label1_i`+`challengeCountTxt_i`, thêm `_HorizontalLayout2_i`) — đã cross-check đúng phạm vi 2 class này qua boundary `window.SkinBossItem/SkinPublicBossPanel = (function`...`return ...;`.

Cache-bust: `main.min_ea858e19.js`→`main.min_280239d4.js`, `default.thm_69c7846d.js`→`default.thm_a60bfe52.js`. Xác minh nội dung staged qua `git show :path`: `node -c` qua cả 2, `xml.etree.ElementTree.parse` qua 2 exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: fix A (Group+HorizontalLayout) theo đúng kỹ thuật đã có bằng chứng hiệu quả nhiều lần trong phiên — tự tin cao. Fix B (`width=110` cho nameTxt danh sách boss) là số đo ước lượng như mọi lần khác trong phiên, cộng thêm bài học "đừng tin tưởng cờ wordWrap/multiline mặc định" từ mục 93-97 nên đã chủ động thêm cơ chế cắt-kèm-".." thay vì chỉ dựa vào width — nhưng vẫn cần ảnh xác nhận: "Số lần thách đấu：12/20" tách rõ ràng không đè, và tên boss dài trong danh sách không còn đè lên caption "Chuyển X" của item kế bên (có thể hiện dạng rút gọn "Đại Hoang V.." nếu quá dài, chấp nhận được theo đúng tinh thần mục 92-93).

## 100. Màn "Rèn"/"炼器" (weapon-soul, class `WeaponPanel`/skin `Skin2weaponSoul`): tên kỹ năng ("Băng Tâm Thác Thiêu") đè lên mô tả kỹ năng ("Khi bị tấn công có 10%...") (2026-07-10)

Người dùng gửi ảnh 1 màn HOÀN TOÀN KHÁC (màn "Rèn"/nâng cấp Tiên Cung vũ khí, không liên quan gì tới BOSS) với lời nhắn ngắn "Bên này cũng bị" kèm yêu cầu tự rà soát và sửa theo đúng phong cách đã đúc kết trong `claude.md`, không chờ mô tả cụ thể. Truy ra: `WeaponPanel` (skin `Skin2weaponSoul`, file `weaponSoulSkin2.exml`) có 2 Label ĐỘC LẬP đặt CẠNH NHAU theo thiết kế gốc (không phải xếp chồng dòng) — `skillname` (tên hiệu ứng/kỹ năng, vd "Băng Tâm Thác Thiêu") nằm bên TRÁI trong 1 cột hẹp cạnh icon kỹ năng (`horizontalCenter="0"` nhưng KHÔNG có `width`), và `skill` (mô tả kỹ năng dài, vd "Khi bị tấn công có 10% tỉ lệ...") nằm bên PHẢI bắt đầu từ `x="123"` — cả 2 gần như cùng 1 hàng ngang (`skillname` y hiệu dụng ≈120, `skill` y=118, gần trùng khớp, xác nhận ý đồ thiết kế là NẰM CẠNH NHAU chứ không phải chồng dòng). Vì `skillname` không có `width` giới hạn, tên kỹ năng dài tự do mở rộng sang phải và tràn vào đúng chỗ `skill` bắt đầu (x=123) — đúng kiểu lỗi quen thuộc "không giới hạn width nên nội dung dài tràn sang ô kế bên" đã gặp rất nhiều lần trong phiên (mục 88, 90, 91, 99...).

Sửa theo đúng kỹ thuật đã CHUẨN HOÁ qua các mục 93-99 (đo lường: icon kỹ năng cao 74px theo `SkinweaponSkillItem`, `skillname` ở y cục bộ 83 trong khung `upInfo`, còn dư ~38px trước khi chạm x=123 của `skill` tính từ tâm cột icon — chọn `width=100` cho an toàn):
- `weaponSoulSkin2.exml` + `default.thm.js`'s `skillname_i` (đúng phạm vi class `Skin2weaponSoul`): thêm `width="100"`, `textAlign="center"`, và **tường minh** `multiline="false" wordWrap="false"` ngay từ đầu (rút kinh nghiệm trực tiếp từ việc phải sửa đi sửa lại 4 lần ở mục 93-97 vì quên khai báo tường minh — lần này áp dụng ngay từ lần sửa đầu tiên, không đợi ảnh xác nhận lỗi rồi mới thêm).
- `main.min.js`'s `WeaponPanel.prototype.updateView_a94`: thêm logic cắt-kèm-".." khi `textWidth>width`, TÁI SỬ DỤNG đúng vòng lặp `while(s.length>1){s=s.slice(0,-1);...if(textWidth<=width)break}` đã dùng ở `ItemBase.setNameText_a94` (mục 93) và `BossesItem.dataChanged` (mục 99) — đến đây kỹ thuật này đã thành "khuôn mẫu chuẩn" của dự án cho mọi trường hợp "tên/nhãn động dài không giới hạn, cần cắt gọn kèm dấu ba chấm khi vượt khung".

Cache-bust: `main.min_ea858e19.js`(mục 99)→`main.min_542d3755.js`, `default.thm_a60bfe52.js`(mục 99)→`default.thm_f68336a5.js`. Xác minh nội dung staged qua `git show :path`: cả 3 nơi (exml/factory/JS) đúng, `node -c` qua cả 2, `xml.etree.ElementTree.parse` qua exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: lần đầu áp dụng "khuôn mẫu chuẩn" (width + multiline/wordWrap tường minh + cắt-kèm-"..") NGAY TỪ ĐẦU cho 1 màn mới thay vì phải lặp lại nhiều vòng sửa — tự tin cao hơn các lần đầu sửa boss trước đây, nhưng vẫn cần ảnh xác nhận "Băng Tâm Thác Thiêu" (hoặc rút gọn "Băng Tâm..") không còn đè lên câu mô tả kỹ năng bên cạnh.

## 101. Ảnh xác nhận mục 100: không còn đè chữ, nhưng `wordWrap="false"` lại KHÔNG có hiệu lực (như mục 96) — tên kỹ năng tự xuống 3 dòng cắt giữa từ ("Phá Nguyệ"/"t Xuyên K"/"hông") thay vì cắt-kèm-".."; người dùng chỉ yêu cầu giảm cỡ chữ (2026-07-10)

Ảnh xác nhận: hết đè chữ (đúng mục tiêu chính), nhưng cách nó hết đè lại KHÔNG phải nhờ cơ chế cắt-kèm-".." như dự tính — mà vì `wordWrap` một lần nữa KHÔNG bị tắt dù đã khai báo `wordWrap="false"` tường minh ở cả exml/factory/JS (lặp lại đúng hiện tượng bí ẩn của mục 96), khiến `textWidth` đo được vẫn phản ánh bề rộng ĐÃ WRAP (luôn ≤ 100), nên điều kiện `textWidth>width` không bao giờ đúng và logic cắt-kèm-".." không chạy — tên kỹ năng cứ thế tự xuống dòng tự nhiên (lần này wrap theo dạng hợp lý hơn, không đến mức orphan 1 ký tự riêng dòng như trường hợp boss, nhưng vẫn cắt giữa từ: "Phá Nguyệ"/"t Xuyên K"/"hông"). Ghi nhận thêm bằng chứng: bug `wordWrap` không đáng tin cậy trong engine này có vẻ mang tính HỆ THỐNG (đã xảy ra ở ít nhất 2 màn hình độc lập — boss preview mục 96 và weapon-soul mục 101), không phải ca lẻ.

Người dùng KHÔNG yêu cầu sửa lại phần wrap/cắt chữ này — chỉ yêu cầu đơn giản "cho font chữ nhỏ lại xíu". Tôn trọng đúng yêu cầu, không tự ý mở rộng phạm vi sửa sang vấn đề wordWrap (đã biết là khó/tốn nhiều vòng lặp để xử lý dứt điểm theo kinh nghiệm mục 93-97). Sửa `weaponSoulSkin2.exml` + `default.thm.js`'s `skillname_i` (đúng phạm vi class `Skin2weaponSoul`): giảm `size` từ 22 → 16. Không có nơi nào trong `main.min.js` set `size` động cho `skillname` nên chỉ cần sửa 2 khai báo tĩnh này.

Cache-bust: chỉ `default.thm_f68336a5.js` (mục 100) → `default.thm_7c7823da.js` (`main.min.js` không đổi). Xác minh nội dung staged qua `git show :path`: `node -c` qua, `xml.etree.ElementTree.parse` qua exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: đổi size tĩnh đơn giản, rủi ro thấp — cần ảnh xác nhận "Phá Nguyệt Xuyên Không" đã hiện nhỏ gọn hơn (có thể vẫn xuống 2-3 dòng do wordWrap chưa tắt được, nhưng chữ nhỏ hơn sẽ đỡ chiếm chỗ và ít có nguy cơ đè lại). Nếu người dùng sau này muốn xử lý dứt điểm hiện tượng wrap-cắt-giữa-từ ở đây, cần áp dụng lại đúng hướng đã thành công ở mục 97 cho boss (bỏ hẳn `width`, không cố chặn cờ wordWrap) — nhưng ở đây `width` đang cần thiết để tránh đè chữ nên không thể áp dụng y hệt, sẽ cần suy nghĩ thêm nếu được yêu cầu.

## 102. Người dùng yêu cầu tự rà soát 5 ảnh tooltip vật phẩm/trang bị và sửa theo đúng phong cách đã đúc kết — phát hiện 3 skin tooltip riêng biệt cùng lỗi "nhãn đè giá trị", 1 skin có lỗi nghiêm trọng hơn (khối thuộc tính co-wrap gãy tầng) (2026-07-10)

Không có mô tả cụ thể từng lỗi — người dùng chỉ nói "cho mình xem 5 ảnh này, tự rà soát rồi sửa theo đúng phong cách trong claude.md". Đã tự phân tích 5 ảnh, xác định 3 skin tooltip độc lập:

**A. `EquipTipsSkin.exml`/`SkinEquipTips`** (IMG_0780, IMG_0783 — tooltip trang bị thường trong 背包): nhãn "Chuyển sinh："/"Nghề nghiệp：" đè lên giá trị bên cạnh ("Chuyển 12"/"Ngư Tiêu"...) — do nhãn và giá trị đặt bằng toạ độ `x` CỐ ĐỊNH cách nhau chỉ 60px trong khi nhãn thực tế (khi item đã Chuyển sinh, đổi thành "Chuyển sinh：" dài hơn "Cấp độ：" mặc định) rộng hơn nhiều — đúng lỗi quen thuộc "đoán offset cố định không tính nội dung thật". Sửa: gộp mỗi cặp nhãn+giá trị (Vị trí/Chuyển/Nghề nghiệp) vào `Group`+`HorizontalLayout` (kỹ thuật chuẩn đã dùng nhiều lần), kể cả hàng "Vị trí" tuy chưa lỗi nhưng sửa phòng hờ cho nhất quán/an toàn khi vị trí trang bị có tên dài. Riêng `jobGroup` phải ĐẢO THỨ TỰ phần tử (nhãn "Nghề nghiệp：" trước, `career` sau) vì bản gốc code đặt `career` TRƯỚC nhãn trong markup (chỉ đúng vị trí nhờ toạ độ `x` thủ công, nay chuyển sang layout tự động nên thứ tự markup phải đúng thứ tự hiển thị).

**B. `ItemUseTipsSkin.exml`/`SkinItemUseTips`** (IMG_0781, IMG_0782 — tooltip vật phẩm dùng được, có nút "Sử dụng"+bộ đếm số lượng): y hệt lỗi A nhưng ở cặp "Cấp độ："/`lv` và "Số lượng："/`num` (cách nhau 60-61px, không đủ cho nhãn 7-9 ký tự ở size 20). Sửa cùng kỹ thuật Group+HorizontalLayout. File này có thêm độ khó: nhiều thuộc tính theo trạng thái (`.guildgifts`) gắn trực tiếp trên từng Label — giữ nguyên toàn bộ khi bọc Group, chỉ bỏ `x`/`y` (chuyển sang layout tự động), không đụng tới bất kỳ thuộc tính `.guildgifts` nào.

**C. `ReincarnateEquipTipsSkin.exml`/`SkinReincarnateEquipTips`** (IMG_0784 — tooltip trang bị "Thoát Phàm Cảnh", nghiêm trọng nhất): vừa có lỗi A (header Vị trí/Chuyển sinh/Nghề nghiệp), vừa có lỗi RIÊNG nặng hơn nhiều — toàn bộ khối "Thuộc tính cơ bản" hiện garbled hoàn toàn ("Công k2250"/"ích: S 2250"/"inh lực 125"...). Truy ra nguyên nhân: thay vì 4 Label riêng cho "Công kích："/"Sinh lực："/"Kháng vật lý："/"Kháng phép：", code dùng ĐÚNG 1 LABEL GỘP chứa cả 4 cụm nối liền thành 1 chuỗi (`"Công kích：Sinh lực：Kháng vật lý：Kháng phép："`), ép `width="54"` (cực hẹp) + `lineSpacing="7"`, DỰA HOÀN TOÀN vào tính năng tự-xuống-dòng của engine để tách thành đúng 4 dòng khớp với 4 Label giá trị (`attr0`-`attr3`) đặt sẵn ở y=25/50/75/100. Đây chính là kiểu thiết kế "phụ thuộc auto-wrap để chia dòng" đã được xác nhận KHÔNG ĐÁNG TIN CẬY qua hàng loạt lần thất bại ở mục 93-97 (tên boss) — với text tiếng Việt có dấu tại width=54 cực hẹp, kết quả xuống dòng hoàn toàn không kiểm soát được, sinh ra các mảnh chữ vụn chồng chéo lên nhau. Mẫu lỗi NÀY LẶP LẠI Y HỆT ở 3 nơi khác trong cùng file (`spiritGroup`, `suitGroup`, và 1 khối phụ "Sát thương Thần Thánh：Tinh Thông Thần Thánh：").

Sửa DỨT ĐIỂM (không vá cờ wordWrap lần nữa — rút kinh nghiệm trực tiếp từ 4 lần thất bại trước): thay MỖI label gộp bằng NHIỀU Label tĩnh riêng biệt, mỗi label 1 cụm từ hoàn chỉnh ("Công kích：", "Sinh lực："...), đặt thẳng ở đúng toạ độ y cố định khớp với label giá trị tương ứng — không còn phụ thuộc bất kỳ cơ chế tự xuống dòng nào. Áp dụng cho cả 4 vị trí: `baseGroup` (2 khối gộp), `spiritGroup` (1 khối), `suitGroup` (1 khối, gắn liền `id="attrDesc"`).

**Khó khăn kỹ thuật riêng của mục C khi đồng bộ `default.thm.js`**: file này dùng cơ chế `eui.State`/`eui.AddItems`/`eui.SetProperty` (điều kiện hiện/ẩn/đổi thuộc tính theo trạng thái `noSpirit0/doSpirit0/noSpirit1/doSpirit1`) tham chiếu phần tử BẰNG TÊN CHUỖI (không phải tham chiếu object trực tiếp) — vd `new eui.AddItems("attr5","baseGroup",2,"soulAddAttr0")` nghĩa là "thêm object `this.attr5` vào `this.baseGroup`, chèn ngay trước `this.soulAddAttr0`" (đã đọc source `eui.min.js` để xác nhận đúng ý nghĩa 4 tham số `(target, propertyName, position, relativeTo)` trước khi sửa, tránh đoán mò trên cơ chế chưa hiểu rõ). Nhãn "Tinh Thông Thần Thánh：" (dòng 2 của 1 trong các khối gộp) chỉ xuất hiện có điều kiện (đi cùng `attr5`, chỉ hiện ở trạng thái `noSpirit0`/`doSpirit0`) — đã thêm ĐÚNG 1 `eui.AddItems` mới cho label này, mô phỏng chính xác cách `attr5` đã làm (cùng vị trí chèn, cùng 2 trạng thái), và thêm lệnh khởi tạo sớm `this._Label14_i();` trong constructor (giống `this.attr5_i();` đã có sẵn) để đảm bảo object tồn tại trước khi `AddItems` cố tham chiếu tới nó. 9 label tĩnh còn lại (luôn hiển thị, không điều kiện) chỉ cần thêm thẳng vào `elementsContent` của group cha tương ứng.

Xác minh triệt để trước khi coi là xong: đối chiếu TỪNG factory method được gọi có ĐỊNH NGHĨA tương ứng (viết script quét `this.X_i()` vs `_proto.X_i = function` cho cả 3 class, xác nhận không có tham chiếu treo), kiểm tra tên biến ẩn danh mới (`_Group8-10`, `_HorizontalLayout7-9`, `_Label11-20`) không trùng với tên đã dùng trong CÙNG class (khác class dùng lại số thứ tự từ đầu là bình thường, không phải trùng thật).

Cache-bust: chỉ `default.thm_7c7823da.js` (mục 101) → `default.thm_3585b390.js` (`main.min.js` không đổi lần này — cả 3 lỗi đều thuần layout tĩnh, không cần sửa JS logic). Xác minh nội dung staged qua `git show :path`: `node -c` qua, `xml.etree.ElementTree.parse` qua cả 3 exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: fix A/B (Group+HorizontalLayout đơn giản) tự tin cao — kỹ thuật đã dùng thành công nhiều lần. Fix C phức tạp hơn hẳn (10 label mới + can thiệp vào cơ chế `AddItems` state) — dù đã cẩn thận đọc source framework để hiểu đúng cơ chế trước khi sửa, đây là lần đầu thao tác trực tiếp với `eui.AddItems`/`eui.State` trong phiên này nên rủi ro cao hơn mức thông thường; cần ảnh xác nhận cả 3 tooltip đã hết đè chữ, đặc biệt màn "Thoát Phàm Cảnh" (IMG_0784) cần kiểm tra kỹ khối "Thuộc tính cơ bản" đã hiện đúng 4-6 dòng rõ ràng KHÔNG còn garbled, và nếu vật phẩm ở trạng thái "Phụ Linh" (doSpirit0/doSpirit1) thì phần "Tinh Thông Thần Thánh" cũng cần hiện đúng (đây là nhánh khó kiểm chứng nhất vì phụ thuộc trạng thái cụ thể của trang bị).

## 103. Thêm 1 skin tooltip vật phẩm nữa cùng lỗi đè chữ (`ItemTipsSkin` — tooltip xem nhanh, không có nút "Sử dụng"); yêu cầu mới: bỏ chữ thừa "Cấp"/"Chuyển" lặp lại trong giá trị vì nhãn đã có sẵn (2026-07-10)

4 ảnh mới đều cùng 1 skin CHƯA từng sửa (`ItemTipsSkin.exml`/`SkinItemTips`, dùng bởi class `ItemDetailedlyWin` — tooltip xem nhanh vật phẩm không dùng được/không có nút "Sử dụng", khác với `ItemUseTipsSkin` đã sửa ở mục 102): "Cấp độ："/"Số lượng：" đè lên giá trị bên cạnh, ĐÚNG y hệt bug pattern đã sửa 3 lần liên tiếp ở mục 102 (khoảng cách `x` cố định 60px không đủ cho nhãn dài). Sửa bằng đúng kỹ thuật Group+HorizontalLayout đã chuẩn hoá. Lưu ý khi sửa: label `id="lv"` từng bị khai báo 2 LẦN trong file gốc (1 lần trong đoạn code cũ đã dời vào Group mới, 1 lần y hệt tên nhưng vị trí khác — dấu vết của việc sửa/copy nhầm từ trước) — phải xoá bản khai báo TRÙNG LẶP thứ 2 để tránh lỗi `id` trùng.

**Yêu cầu mới của người dùng — bỏ tiền tố lặp nghĩa trong giá trị**: nhãn đã ghi rõ "Cấp độ："/"Chuyển：" (hoặc "Chuyển sinh："), nên phần giá trị bên cạnh không cần lặp lại chữ "Cấp "/"Chuyển " nữa — chỉ cần con số. Rà soát toàn bộ các chỗ `this.lv.text=` có liên quan tới 4 skin tooltip đã và đang sửa (mục 102 + mục 103), xác nhận đúng phạm vi qua các định danh riêng của từng class (`this.qualityImg`/`this.quali`/`this.levelKey`/`this.career`/`this.jobGroup`/`this.suitName` — mỗi class tooltip có tổ hợp định danh RIÊNG, dùng để phân biệt chính xác không sửa nhầm sang các tooltip khác chưa xác nhận liên quan như `HejiEquipTipsSkin`/so sánh trang bị dù chúng dùng chung 1 đoạn code):
- `ItemDetailedlyWin` (`SkinItemTips`) và `ItemUsesTipsWin` (`SkinItemUseTips`): `"Cấp "+(o.level||1)+""` → `""+(o.level||1)` (2 chỗ, cùng 1 đoạn code y hệt).
- Controller dùng chung cho `SkinEquipTips`/`SkinHejiEquipTips` (cùng 1 hàm, chọn skin theo loại trang bị — cả 2 branch đều hiện tượng "Cấp độ:"/"Chuyển sinh:" nên sửa cả 2 cho nhất quán): `isNaN(n.zsLevel)?"Cấp "+(n.level||1)+"":"Chuyển "+n.zsLevel+""` → `isNaN(n.zsLevel)?""+(n.level||1):""+n.zsLevel` (2 chỗ).
- `SamsaraEquipTipsView` (`SkinReincarnateEquipTips`): `"Chuyển "+t.zsLevel+""` → `""+t.zsLevel` (luôn hiển thị Chuyển sinh, không có nhánh Cấp độ).
- CHỦ ĐỘNG BỎ QUA 1 occurrence tương tự (`setCurAttribute_a94`, dùng `nextForgeGroup`/`powerPanel0`) vì xác định đây là màn SO SÁNH TRANG BỊ hoàn toàn khác, chưa có ảnh xác nhận, không thuộc phạm vi 2 đợt sửa tooltip này — tránh sửa lan sang màn chưa kiểm chứng.

Đồng bộ `default.thm.js`'s `SkinItemTips` (thêm `_Group4_i`/`_Group5_i`/`_HorizontalLayout1_i`/`_HorizontalLayout2_i`, bỏ `x`/`y` khỏi 4 label liên quan, đổi text mặc định `lv_i` từ "Cấp 1" → "1" khớp exml). Chạy lại script quét đối chiếu factory method gọi vs định nghĩa cho cả 4 class tooltip (`SkinEquipTips`/`SkinItemUseTips`/`SkinReincarnateEquipTips`/`SkinItemTips`) — xác nhận không còn tham chiếu treo.

Cache-bust: `main.min_542d3755.js`(mục 101)→`main.min_060f4062.js`, `default.thm_3585b390.js`(mục 102)→`default.thm_0f78c70c.js`. Xác minh nội dung staged qua `git show :path`: cả 5 chỗ sửa `.lv.text=` đúng số lần xuất hiện mong đợi, cấu trúc Group mới trong `SkinItemTips` đúng, `node -c` qua cả 2, `xml.etree.ElementTree.parse` qua exml, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: fix overlap `ItemTipsSkin` tự tin cao (kỹ thuật lặp lại nhiều lần). Fix bỏ tiền tố "Cấp"/"Chuyển" là thay đổi text đơn giản, rủi ro thấp, nhưng có SUY RỘNG phạm vi sang `HejiEquipTipsSkin` (dùng chung code với `EquipTipsSkin`, chưa có ảnh xác nhận riêng cho Heji) — cần ảnh xác nhận cả 4 tooltip đã hết đè chữ VÀ giá trị Cấp độ/Chuyển chỉ còn con số thuần (không còn "Cấp "/"Chuyển " lặp lại), đặc biệt lưu ý nếu có ảnh trang bị Heji thì cũng cần đúng định dạng mới.

## 104. Ảnh xác nhận mục 103: 2 ảnh đầu (`ItemUseTipsSkin`) chữ "Cấp" vẫn còn lặp lại; thêm 1 skin mới bị đè chữ (`tujiantips.exml` — tooltip "Đồ Giám"/thẻ bài, "Phẩm chất："/"Cấp sao：") (2026-07-10)

**A. `ItemUseTipsSkin` vẫn còn "Cấp 1" thay vì chỉ "1"**: mục 103 đã sửa NHẦM method — class `ItemUsesTipsWin` có 2 method riêng biệt cùng set `this.lv.text` na ná nhau (`setData_a94` — đã sửa ở mục 103 nhưng KHÔNG PHẢI method thực sự chạy, và `updateOfBaseInfo_a94` — method THẬT SỰ được `setData()` gọi mỗi khi mở tooltip, dùng biến `s.level` thay vì `o.level`/`n.level` nên không khớp với chuỗi tìm-thay ở mục 103). Đã lần theo đúng chuỗi gọi (`setData` → gọi `this.updateOfBaseInfo_a94(t)`) để xác nhận ĐÚNG method đang hoạt động trước khi sửa lần này — bài học: khi 1 class có nhiều method cùng set 1 thuộc tính, phải xác nhận qua chuỗi gọi thực tế (constructor/`setData`/`open`) chứ không chỉ tin vào việc "tìm thấy đoạn code giống mô tả lỗi" (biến thể mới của bài học "trùng pattern khác nơi" đã gặp nhiều lần trong phiên). Sửa `this.lv.text="Cấp "+(s.level||1)+""` → `this.lv.text=""+(s.level||1)` trong `updateOfBaseInfo_a94`.

**B. Tooltip "Đồ Giám" (`tujiantips.exml`/`SkinTujiantips`, class `IllustrationsTipsWin`)**: "Phẩm chất："/"Cấp sao：" đè lên giá trị bên cạnh — đúng bug pattern quen thuộc (khoảng cách `x` cố định 54px không đủ cho nhãn 8-9 ký tự). Sửa bằng Group+HorizontalLayout (2 nhóm con: hàng "Phẩm chất", hàng "Cấp sao", đảo đúng thứ tự nhãn-trước-giá-trị-sau). Riêng dòng "Cấp sao：0sao" KHÔNG đụng tới phần text JS (`i.level+"sao"`) vì đây là số sao (rating), không phải cấp độ nhân vật — không thuộc phạm vi yêu cầu "bỏ chữ Cấp/Chuyển lặp lại" của người dùng.

Đồng bộ `default.thm.js`'s `SkinTujiantips` — lưu ý tên biến ẩn danh mới (`_Group6`/`_Group7`) phải tránh trùng với `_HorizontalLayout1` đã dùng sẵn cho 1 nhóm khác trong CÙNG class (`belong0`/`belong` group), chọn `_HorizontalLayout6`/`_HorizontalLayout7` thay vì đánh số lại từ 1.

Cache-bust: `main.min_060f4062.js`(mục 103)→`main.min_e3da475a.js`, `default.thm_0f78c70c.js`(mục 103)→`default.thm_045f1842.js`. Xác minh nội dung staged qua `git show :path`: `node -c` qua cả 2, `xml.etree.ElementTree.parse` qua exml, script quét factory-method đối chiếu cho cả 5 class tooltip (thêm `SkinTujiantips` vào danh sách kiểm), `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận "Cấp độ： 1" (không còn "Cấp 1") ở cả 2 tooltip `ItemUseTipsSkin` đã báo lỗi, và "Phẩm chất："/"Cấp sao：" ở tooltip "Đồ Giám" đã hết đè chữ.

## 105. Ảnh xác nhận mục 104: vẫn còn chồng chéo ở 2 tooltip khác (`HejiEquipTipsSkin` — "Chuyển：Chuyển X" đè lên nhau; `tujiantips.exml` — "Cấp sao：Xsao" lặp chữ "sao", và "(khi có 3 nhân vật)" bị "Lực chiến：XXXX" đè lên) (2026-07-11)

**A. Tooltip trang bị Phù (`HejiEquipTipsSkin.exml`/`SkinHejiEquipTips`, ảnh "Thanh Diễm·Thương·Chuyển 1")**: nhãn `levelKey` dùng chung 1 vị trí `x=120` cho 2 nội dung khác độ dài tùy loại vật phẩm — `"Cấp độ："` (ngắn) hoặc `"Chuyển sinh："` (dài hơn nhiều) — trong khi giá trị `lv` cố định ở `x=180`, nên khi nhãn là `"Chuyển sinh："` nó tràn qua đè lên giá trị. Đồng thời giá trị `lv` vẫn còn lặp chữ tiền tố y hệt bài học mục 99-104: `this.lv.text=e.zsLevel>0?"Chuyển "+e.zsLevel+"":"Cấp "+e.level+""` → sửa thành `this.lv.text=e.zsLevel>0?""+e.zsLevel:""+e.level` (bỏ tiền tố, giữ logic rẽ nhánh Chuyển/Cấp nguyên vẹn). Dòng "Vị trí："/"Loại：" ở 2 hàng còn lại (y=57, y=105) không đổi vì nhãn ngắn, không tràn — chỉ bọc riêng hàng `levelKey`+`lv` (y=81) vào `<e:Group><e:layout><e:HorizontalLayout gap="2"/></e:layout></e:Group>`, bỏ `x` cố định của cả 2 label. Đồng bộ `default.thm.js`: gộp `this.lv_i()` và `this.levelKey_i()` khỏi `elementsContent` phẳng của `_Group4_i`, thay bằng 1 lệnh gọi `this._Group7_i()` mới (quét trước và xác nhận `_Group1`-`_Group6`, `_HorizontalLayout1`-`_HorizontalLayout2` đã dùng hết trong class này nên đặt tên `_Group7_i`/`_HorizontalLayout3_i` để tránh đè).

**B. Tooltip "Đồ Giám" (`tujiantips.exml`/`SkinTujiantips`, ảnh "Vân Quyển Nguyệt")** — sửa tiếp 2 chỗ còn sót lại sau mục 104:
- "Cấp sao：0sao" lặp chữ "sao" (nhãn đã có "sao", giá trị lại thêm "sao" nữa) — cùng loại lỗi với "Cấp X"/"Chuyển X" đã sửa nhiều lần, chỉ là dùng từ "sao" thay vì "Cấp"/"Chuyển". Sửa `this.lvTxt.text=i.level+"sao"` → `this.lvTxt.text=""+i.level` trong `IllustrationsTipsWin`.
- Dòng "Lực chiến：XXXX" (từ component `PowerPanel`/`Skin2PowerPanel`, căn giữa ngang) bị đè lên nhãn `threeLabel` ("(khi có 3 nhân vật)", căn phải `right="1"`, cùng nằm trong khoảng y của powerPanel) khi số Lực chiến đủ dài. Theo đúng yêu cầu người dùng — thu nhỏ font `threeLabel` thay vì đổi vị trí — giảm `size` từ `20` xuống `13` (không đổi `x`/`y`/`right`). Đồng bộ `default.thm.js`'s `threeLabel_i` (`t.size = 20` → `t.size = 13`).

Cache-bust: `main.min_e3da475a.js`(mục 104)→`main.min_07ff60ee.js`, `default.thm_045f1842.js`(mục 104)→`default.thm_3073e743.js`. Xác minh: `node -c` qua cả 2 file JS, `xml.etree.ElementTree.parse` qua cả 2 exml, script quét factory-method đối chiếu `this.X_i()` vs `_proto.X_i=function` cho `SkinHejiEquipTips` và `SkinTujiantips` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận tooltip Phù ("Chuyển：" không còn đè lên giá trị và giá trị chỉ còn số), và tooltip "Đồ Giám" (giá trị "Cấp sao" chỉ còn số, "(khi có 3 nhân vật)" không còn bị "Lực chiến" đè lên).

## 106. Skin "Linh Thú" (Linh Sủng): 2 tooltip khác bị chồng chéo — danh sách "Tổng quan năng lực" (`LYRAbilityItemSkin.exml`) và mô tả "Tiên Linh Chúc Phúc" (`LYRUltraSkin.exml`) (2026-07-11)

**A. Danh sách "Tổng quan năng lực" (`LYRAbilityItemSkin.exml`/`SkinLYRAbilityItem`)**: mỗi dòng trong list có tiêu đề màu xanh (`nameTxt`, không set `width` nên rộng theo nội dung, `left="0"`) và chú thích màu đỏ bên cạnh (`stateLabel`, ví dụ "(Lv 1 mở khóa)") bị neo cứng ở `left="90"`/`x="89"` — khi tiêu đề dài hơn 90px (ví dụ "Linh Sủng Hoạt Hình", "Linh Lực Chấn Đãng") thì tràn đè lên `stateLabel`. Bọc `nameTxt`+`stateLabel` vào 1 `<e:Group><e:layout><e:HorizontalLayout gap="6" verticalAlign="middle"/></e:layout></e:Group>`, bỏ `left`/`x` cố định của cả 2 (đúng pattern đã dùng nhiều lần trong phiên). Đồng bộ `default.thm.js`: gộp `this.nameTxt_i()`/`this.stateLabel_i()` khỏi `_Group2_i` phẳng, thay bằng `this._Group3_i()` mới (class này mới chỉ dùng `_Group1`/`_Group2`, không đụng hàng có sẵn) chứa layout `_HorizontalLayout1_i`.

**B. Mô tả "Tiên Linh Chúc Phúc" (`LYRUltraSkin.exml`/`SkinLYRUltra`, controller `RingUpgradeView`)**: đây là kiểu lỗi nặng hơn — 1 câu mẫu tiếng Việt được ghép từ 1 Label nền có khoảng trắng chừa sẵn ("   Sử dụng              sau đó có thể thăng cấp             thành") cộng thêm 3 Label màu đỏ (`itemName`, và 2 label tĩnh không có `id`) đặt đè lên đúng vị trí pixel của khoảng trắng đó — kỹ thuật này copy nguyên bản từ bản gốc tiếng Trung, nơi câu tương ứng ngắn hơn nhiều lần nên vừa đúng 1-2 dòng; sang tiếng Việt câu dài hơn hẳn nên vị trí pixel cố định không còn đúng nữa, chữ chồng lên nhau tán loạn. Xác nhận qua JS (`RingUpgradeView.open`) rằng cụm 4 label này hoàn toàn tĩnh (chỉ `itemName` có `id`, nhưng controller không set `.itemName.text` — chỉ set `abilityDesc.textFlow`, không đụng tới cụm này), nên an toàn để tái cấu trúc thuần exml/default.thm.js không cần sửa JS. Bỏ hẳn cách "câu mẫu + đè pixel", thay bằng 4 dòng rõ ràng dùng `VerticalLayout` (căn giữa) lồng `HorizontalLayout` cho 2 dòng có 2 mảnh:
- Dòng 1: Group("Sử dụng" + `itemName` đỏ)
- Dòng 2: Label "sau đó có thể thăng cấp"
- Dòng 3: Label "Viêm Hoàng Linh Phụng" đỏ
- Dòng 4: Group("thành" + "Tiên Hoàng Linh Phụng" đỏ)

Đồng bộ `default.thm.js`: `_Group1_i` (khung ngoài, bỏ `width`/`height` cố định) chuyển sang dùng `_VerticalLayout1_i`; tái cấu trúc `_Label3_i` (nội dung đổi thành "sau đó có thể thăng cấp"), `_Label4_i`/`_Label5_i` (bỏ `x`/`y`, giữ nguyên chữ), thêm `_Group3_i`/`_Group4_i`/`_HorizontalLayout1_i`/`_HorizontalLayout2_i`/`_Label7_i`("Sử dụng")/`_Label8_i`("thành") — đã quét trước tên hiện có trong class (`_Group1`,`_Group2`,`_Label1`-`_Label6`) để chọn tên mới không trùng.

Cache-bust: chỉ đổi `default.thm.js` (không sửa `main.min.js` lần này vì cả 2 lỗi đều thuần layout, không có logic JS cần đổi): `default.thm_3073e743.js`(mục 105)→`default.thm_fa396da9.js`. Xác minh: `node -c`, `xml.etree.ElementTree.parse` qua cả 2 exml, script quét factory-method đối chiếu cho `SkinLYRAbilityItem`/`SkinLYRUltra` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận danh sách "Tổng quan năng lực" hết đè chữ ở các dòng tiêu đề dài, và mô tả "Tiên Linh Chúc Phúc" hiển thị đúng 4 dòng rõ ràng không còn chồng chéo.

## 107. Ảnh xác nhận mục 105/106: sửa lỗi thứ tự "Xbậc" kiểu tiếng Trung, sửa lỗi tự gây ra ở `HejiEquipTipsSkin` (Group thiếu `x`), và giãn lại layout `LYRUltraSkin` vẫn còn chồng chéo (2026-07-11)

**A. "(10bậc mở khóa)" phải là "(Bậc 10 mở khóa)"**: thứ tự số-trước-chữ ("Xbậc") là ngữ pháp tiếng Trung dịch nguyên xi, tiếng Việt phải để chữ phân loại trước số ("Bậc X"). Đây không phải lỗi chồng chéo mà lỗi dịch còn sót — sửa cả 3 chỗ dùng chung pattern này trong `main.min.js`:
- `FireRingAbilityItemRenderer`: `this.stateLabel.text="("+...+"bậc mở khóa)"` → `"(Bậc "+...+" mở khóa)"` (dòng đỏ trong danh sách "Tổng quan năng lực", mục 106 đã sửa chồng chéo nhưng chưa sửa thứ tự chữ).
- `RingUpgradeView`(?) `t.skillName.text=...+"bậc mở khóa"` → `"Bậc "+...+" mở khóa"`.
- `FireRingInfoPanel.getNextStageAbility_a94`: `return e+"bậc mở khóa"+...Name(e)` → `"Bậc "+e+" mở khóa "+...Name(e)` (nhân tiện thêm dấu cách trước tên kỹ năng vì bản gốc ghép dính liền "mở khóaLinh Sủng..." không có khoảng trắng — thấy rõ ở góc phải ảnh "Tiên Linh Chúc Phúc").

**B. Tự gây lỗi ở `HejiEquipTipsSkin` (mục 105 phần A)**: khi bọc `levelKey`+`lv` vào `<e:Group>` (để sửa đè chữ "Chuyển sinh："), đã quên set `x="120"` cho Group đó — Group mặc định `x=0` nên toàn bộ cụm "Chuyển：Chuyển 1" bị dịch hẳn sang lề trái, đè lên icon vật phẩm (ảnh "Thanh Diễm·Thương·Chuyển 1"). Đây là lỗi tự gây ra khi thêm code mới, không phải lỗi cũ. Đã thêm lại `x="120"` cho Group trong cả `HejiEquipTipsSkin.exml` và `default.thm.js`'s `_Group7_i`. **Bài học**: khi bọc nhiều Label rời rạc (mỗi cái có `x` riêng) vào 1 Group mới, phải luôn set `x`/`y` cho Group bằng đúng giá trị `x` nhỏ nhất trong số các Label gốc — không được để trống rồi quên, vì Group mặc định x=0 khác hẳn ý định ban đầu (khác với việc bỏ `x` trên Label con, việc đó đúng vì Group giờ đóng vai trò làm gốc tọa độ mới).

**C. `LYRUltraSkin` ("Tiên Linh Chúc Phúc") vẫn chồng chéo sau mục 106**: nguyên nhân là khối 4 dòng mới (thay cho khối 2 dòng cũ) cao hơn hẳn so với khối cũ (khối cũ chỉ cần ~54px cho 2 dòng, khối mới cần ước tính ~114-126px cho 4 dòng), nhưng 2 label tĩnh bên dưới nó (`"Hiệu ứng Chúc Phúc"` tại `top=157`, và `abilityDesc` tại `top=173`) vẫn giữ nguyên vị trí cũ — bị khối 4 dòng mới đè lên. Tính lại theo chiều cao ước tính của khối mới (dựa trên tỷ lệ dòng cũ 27px/dòng + gap 2px đã được xác nhận qua giá trị `height="54"` gốc cho 2 dòng), rồi dời cả 2 label xuống dưới với khoảng đệm an toàn: `top=157`→`225`, `top=173`→`241`. Đã kiểm tra khung nền popup (`tongyongbg5`, cao 310px, tâm dọc tại y≈52-362 trong hệ tọa độ `anigroup`) vẫn đủ chỗ chứa nội dung mới (kết thúc ở khoảng `top≈299`, còn dư ~63px trước khi chạm đáy khung) nên không cần phóng to khung nền/popup.

**Vẫn thuộc lớp rủi ro "chỉnh sửa dựa trên đọc code, không phải render thật"**: riêng phần C là ước tính chiều cao dòng chứ không đo được pixel thật (Egret canvas không tự render được), nên có thể cần chỉnh thêm nếu ảnh xác nhận vẫn còn hở/chật.

Cache-bust: `main.min_07ff60ee.js`(mục 105)→`main.min_a5a97b1f.js`, `default.thm_fa396da9.js`(mục 106)→`default.thm_fe6c3876.js`. Xác minh: `node -c` cả 2, `xml.etree.ElementTree.parse` qua `HejiEquipTipsSkin.exml`/`LYRUltraSkin.exml`, script đối chiếu factory-method cho `SkinHejiEquipTips`/`SkinLYRUltra`/`SkinLYRAbilityItem` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận "(Bậc X mở khóa)" đúng thứ tự tiếng Việt, "Chuyển：Chuyển 1" trở lại đúng vị trí bên phải icon (không còn bay sang trái), và mô tả "Tiên Linh Chúc Phúc" đã đủ khoảng cách với "Hiệu ứng Chúc Phúc"/mô tả hiệu ứng bên dưới.

## 108. Ảnh xác nhận mục 107: mục A/B đã hết lỗi, riêng `LYRUltraSkin` cần làm lại theo hướng khác — ghép thành 1 câu tự xuống dòng theo lề phải thay vì tách dòng thủ công, dời "Hiệu ứng Chúc Phúc" vào trong khung, giãn cách với mô tả bên dưới (2026-07-11)

Ảnh xác nhận cho thấy mục A ("Bậc X mở khóa") và mục B ("Chuyển：" đúng vị trí) đã hết lỗi. Riêng `LYRUltraSkin` — dù đã hết chồng chéo — người dùng yêu cầu làm lại theo hướng khác hẳn với cách mục 106 làm (tách câu thành 4 dòng cố định thủ công): muốn đoạn "Sử dụng...thành..." được ghép thành 1 câu duy nhất, tự động xuống dòng khi chạm lề phải (như 1 đoạn văn bình thường), không tách cứng theo từng cụm từ.

**Giải pháp: dùng `textFlow`/`TextFlowMaker` thay vì nhiều Label rời**: cách tách 4 dòng thủ công ở mục 106 (nhiều Label/Group con định vị bằng `HorizontalLayout`/`VerticalLayout`) chỉ mô phỏng được xuống dòng ở các điểm cố định, không phải word-wrap thật. Phát hiện codebase đã có sẵn cơ chế đúng cho việc này — `TextFlowMaker.generateTextFlow(htmlString)` (dùng `egret.HtmlTextParser`, nhận chuỗi `<font color=...>text</font>` ghép nối) — đã được dùng sẵn cho `abilityDesc` ngay trong cùng skin này (`this.abilityDesc.textFlow=TextFlowMaker.generateTextFlow(n.abilityDesc)`), và ảnh xác nhận cho thấy nó word-wrap tự nhiên rất đẹp (3 dòng, ngắt đúng theo từ, không lỗi) — bằng chứng cơ chế này ĐÁNG TIN CẬY trong bản build này, khác với bài học "wordWrap không đáng tin cậy" ở mục 93-97 (trường hợp đó là `eui.Label` thường bị ép `wordWrap=false`/dùng `BitmapLabel`, không phải `textFlow`).

Thực hiện:
- exml: thay khối 4 dòng thủ công (2 Group lồng `HorizontalLayout`) bằng 1 `<e:Label id="fuseDesc">` DUY NHẤT có `width="340"`, để engine tự word-wrap. Gộp luôn 2 nhãn tiêu đề ("Tiên Linh Chúc Phúc", "Hiệu ứng Chúc Phúc") và `abilityDesc` vào chung 1 `<e:Group left="46" top="69"><e:layout><e:VerticalLayout gap="18"/></e:layout></e:Group>` — dùng `VerticalLayout` để 4 khối tự xếp chồng theo chiều dọc với khoảng cách đều nhau `gap="18"`, KHÔNG còn định vị `top`/`horizontalCenter` cố định pixel cho từng khối như 2 lần trước — đây là điểm mấu chốt giải quyết dứt điểm kiểu lỗi "ước tính chiều cao sai" đã lặp lại 2 lần liên tiếp (mục 106→107): với `VerticalLayout`, dù `fuseDesc` word-wrap ra 3 hay 4 hay 5 dòng thực tế, 2 khối phía dưới vẫn tự động dời xuống đúng khoảng cách `gap` mà không cần đoán trước chiều cao.
- Đồng thời đặt `left="46"` cho khối thay vì `horizontalCenter` âm khó đoán — khớp quy ước margin nội dung `46px` đã thấy dùng nhiều nơi khác trong codebase (vd. `attr1`-`attr4` trong `HejiEquipTipsSkin`), giải quyết luôn yêu cầu "Hiệu ứng Chúc Phúc nằm trong khung" (trước đó dùng `horizontalCenter="-119"` khiến nó lấn sát mép khung).
- Phóng to khung nền popup để chắc chắn đủ chỗ bất kể `fuseDesc` word-wrap ra bao nhiêu dòng: `anigroup` cao `379`→`460`, ảnh khung ngoài `tongyong_dikuang2` cao `351`→`432`, ảnh nền trong `tongyongbg5` cao `310`→`391` (khung nền dùng `scale9Grid` nên phóng to không vỡ hình). Đây là lần đầu chủ động phóng to khung thay vì cố nhét vừa khung cũ — tránh lặp lại vòng lặp sửa-rồi-vẫn-sai đã xảy ra 2 lần.
- JS (`main.min.js`, `RingUpgradeView.open`): thêm dòng set `this.fuseDesc.textFlow=TextFlowMaker.generateTextFlow("<font color=0x001828>Sử dụng </font><font color=0xe40000>Tiên Linh Hồn Thạch</font><font color=0x001828> sau đó có thể thăng cấp </font><font color=0xe40000>Viêm Hoàng Linh Phụng</font><font color=0x001828> thành </font><font color=0xe40000>Tiên Hoàng Linh Phụng</font>")` ngay cạnh dòng `abilityDesc.textFlow=...` đã có sẵn — giữ nguyên màu đỏ cho 3 cụm từ quan trọng (tên vật phẩm, tên linh thú gốc, tên linh thú sau nâng cấp) y hệt thiết kế cũ, chỉ đổi CÁCH xuống dòng từ thủ công sang tự động. Xóa bỏ `itemName` (khỏi `skinParts`/factory) vì không còn dùng — toàn bộ câu giờ nằm trong 1 `textFlow` của `fuseDesc`.
- Đồng bộ `default.thm.js`: `skinParts` đổi `"itemName"`→`"fuseDesc"`; `anigroup_i`/`_Image1_i`/`_Image2_i` cập nhật chiều cao; toàn bộ `_Label1_i`(Hiệu ứng)/`_Label2_i`(Tiên Linh)/`abilityDesc_i`/`_Group1_i` cũ (cùng `_VerticalLayout1_i`/`_Group3_i`/`_Group4_i`/`_HorizontalLayout1_i`/`_HorizontalLayout2_i`/`_Label7_i`/`_Label8_i`/`_Label4_i`/`_Label5_i`/`itemName_i` của mục 106) thay bằng 1 bộ factory gọn hơn: `_Group5_i` (khối cha), `_VerticalLayout1_i` (tái dùng tên, đổi `gap`), `_Label2_i`+`fuseDesc_i`+`_Label1_i`+`abilityDesc_i` (giữ nguyên tên `_Label1`/`_Label2`/`abilityDesc` cho khớp id gốc, chỉ bỏ `x`/`y`/`horizontalCenter`/`top`/`height`/`verticalAlign` cố định).

Cache-bust: `main.min_a5a97b1f.js`(mục 107)→`main.min_9251d959.js`, `default.thm_fe6c3876.js`(mục 107)→`default.thm_21d28d8d.js`. Xác minh: `node -c` cả 2, `xml.etree.ElementTree.parse` qua `LYRUltraSkin.exml`, script đối chiếu factory-method cho `SkinLYRUltra` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged (bao gồm xác nhận đúng chuỗi `textFlow` HTML trong `main.min.js`), `manifest.json`/`index.php` đã bump `?v=`.

**Rủi ro còn lại (ghi nhận rõ để theo dõi)**: không thể đo pixel thật số dòng `fuseDesc` sẽ word-wrap ra (ước tính 3-4 dòng dựa trên tỷ lệ ký tự/dòng suy từ `abilityDesc` đã render thật), nhưng khác 2 lần trước, lần này dùng `VerticalLayout` nên dù ước tính sai số dòng cũng KHÔNG gây chồng chéo (chỉ ảnh hưởng độ dài popup, và đã chừa dư khung ~460px cao, thừa nhiều so với ước tính cần thiết ~370-400px) — nên rủi ro còn lại chỉ là thẩm mỹ (khung hơi dư khoảng trống ở đáy), không phải lỗi chức năng.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận đoạn "Sử dụng...thành..." hiển thị thành 1 đoạn văn tự nhiên xuống dòng theo lề phải (không tách cứng 4 dòng nữa), "Hiệu ứng Chúc Phúc" nằm gọn trong khung, và khoảng cách với mô tả hiệu ứng bên dưới cân đối.

## 109. Ảnh xác nhận mục 108: câu văn word-wrap đẹp, nhưng ruy băng tiêu đề "Tiên Linh Chúc Phúc" bị lệch/lún vào khung sau khi phóng to popup (2026-07-11)

Ảnh xác nhận cho thấy đoạn văn "Sử dụng...thành..." đã word-wrap tự nhiên rất đẹp (đúng như mong muốn), NHƯNG việc phóng to `anigroup` ở mục 108 (để chừa chỗ cho đoạn văn) gây tác dụng phụ ngoài ý muốn: ruy băng tiêu đề "Tiên Linh Chúc Phúc" (hình nền `tongyong_titlebg`) bị lún xuống đè vào mép trên của khung nội dung, không còn nằm gọn phía trên khung như trước.

**Nguyên nhân**: 3 phần tử tạo nên ruy băng tiêu đề dùng CÁCH ĐỊNH VỊ KHÔNG ĐỒNG NHẤT — thanh cuộn trang trí (`tongyong_juanzhou`) và chữ tiêu đề (`abilityName`) dùng `top` (tọa độ TUYỆT ĐỐI, không đổi dù `anigroup` cao bao nhiêu), riêng hình nền ruy băng (`tongyong_titlebg`) lại dùng `verticalCenter="-171"` (tọa độ TƯƠNG ĐỐI theo tâm `anigroup` — khi tăng chiều cao `anigroup` từ 379 lên 460 ở mục 108, tâm dịch xuống 40.5px, kéo theo hình nền ruy băng dịch xuống 40.5px trong khi 2 phần tử kia đứng yên) → 3 mảnh ghép vốn được canh khớp nhau ở chiều cao cũ (379) bị xô lệch khi đổi chiều cao, đồng thời hình nền ruy băng dịch xuống đủ để chạm/lún vào mép trên khung nội dung (mép khung không đổi vị trí vì cả khung ngoài và khung trong đều được tính lại để giữ mép trên cố định, chỉ ruy băng là bị bỏ sót). Đây là lỗi tự gây ra ở mục 108 — cùng dạng bài học với mục 107 phần B (thay đổi 1 thông số tưởng chừng cục bộ nhưng có tác dụng phụ dây chuyền lên phần tử khác dùng chung hệ tọa độ tương đối) — bài học mở rộng: **khi đổi chiều cao 1 Group chứa nhiều phần tử pha trộn `top` (tuyệt đối) và `verticalCenter`/`bottom` (tương đối theo Group đó), phải rà soát TẤT CẢ phần tử tương đối trong Group, không chỉ phần tử đang chủ đích chỉnh sửa.**

**Sửa**: tính lại `verticalCenter` của `tongyong_titlebg` để bù trừ đúng phần chênh lệch chiều cao, giữ nguyên vị trí tuyệt đối cũ: `center_cũ = 379/2 + (-171) = 18.5`; `verticalCenter_mới = 18.5 - 460/2 = -211.5`. Đổi `verticalCenter="-171"` → `"-211.5"` trong cả `LYRUltraSkin.exml` và `default.thm.js`'s `_Image4_i`. Không đổi gì khác (thanh cuộn, chữ tiêu đề, chiều cao khung, layout đoạn văn — tất cả giữ nguyên từ mục 108 vì không có báo lỗi).

Cache-bust: chỉ đổi `default.thm.js` (giá trị `verticalCenter` không thuộc logic JS): `default.thm_21d28d8d.js`(mục 108)→`default.thm_49271daf.js`. Xác minh: `node -c`, `xml.etree.ElementTree.parse`, script đối chiếu factory-method cho `SkinLYRUltra` (0 thiếu định nghĩa), `git show :path` xác nhận đúng giá trị `-211.5` trong cả 2 file, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận ruy băng tiêu đề "Tiên Linh Chúc Phúc" trở lại nằm gọn phía trên khung (không còn lún vào khung) trong khi đoạn văn word-wrap bên dưới vẫn đẹp như ảnh vừa xác nhận.

## 110. Xác nhận mục 109 OK (ruy băng "Tiên Linh Chúc Phúc" đã đúng). Sửa 4 skin khác: 2 tooltip trang bị dạng lưới 2x2 (`RingTips.exml`), "+9%" lòi khỏi khung (`HejiTipsOfEquipWin.titleCreate_a94`), và danh sách buff Nhẫn bị chồng chéo toàn bộ (`LYRAttrSkin.exml`) (2026-07-11)

**A. Tooltip trang bị "Định Thân Ngọc Phù"/"Tiên Thủ Trụy Sức" (`RingTips.exml`/`SkinRingTips`)**: lưới thuộc tính 2x2 ("Công Kích：320" / "Vật Kháng：80" / "Pháp Kháng：80" / "Sinh Lực：17800") — mỗi cặp nhãn-giá trị đặt ở `x` cố định cách nhau 66-67px (`attr` tại x=24 hoặc x=190, `value` tại x=90 hoặc x=257), không đủ cho nhãn dài như "Pháp Kháng："/"Tỷ lệ Bạo kích：" nên đè lên giá trị — đúng bug pattern quen thuộc trong suốt phiên. Sửa bằng Group+HorizontalLayout cho cả 4 cặp (giữ nguyên vị trí 4 góc x=24/190, y=25/50). Lưu ý: state "active" có `SetProperty("value1","x",265)`/`SetProperty("value3","x",265)` (dịch cột phải thêm 8px so với mặc định 257) — sau khi gộp value1/value3 vào Group con (`_Group8`/`_Group10`), phải dời logic dịch-8px này sang chính Group đó (`x.active="198"` = 190+8) thay vì trên Label con đã không còn `x` riêng nữa.

**B. Tooltip trang bị Phù đã kích hoạt, dòng "[Tản Chiết] Tăng sát thương lên Lạc Anh + 9%" lòi ra khỏi khung**: đây KHÔNG phải lỗi exml — dòng mô tả "Thuộc Tính Cực Phẩm"/"Thuộc Tính Chú Linh" được tạo hoàn toàn bằng JS lúc runtime (`HejiTipsOfEquipWin.titleCreate_a94`, thêm trực tiếp vào `forgeGroup` — 1 Group rỗng khai báo sẵn trong exml làm chỗ chứa nội dung động), không hề có mặt trong exml nên không tìm thấy khi grep "Cực Phẩm"/"Tản Chiết" trong file exml — bài học mới: **1 số nội dung không nằm trong exml mà được `addChild` thẳng từ JS vào 1 Group rỗng đặt sẵn, phải lần theo controller class (tìm qua chuỗi gọi `skinName` → tên class) thay vì chỉ tìm trong exml khi không thấy text ở đó.** Label mô tả (`e`, tham số thứ 2 của `titleCreate_a94`) được set `x=46` nhưng KHÔNG hề set `width` — nên không có gì để wordWrap dựa vào, chữ tràn thành 1 dòng dài lòi khỏi khung khi nội dung đủ dài. Thêm `e.width=290` (khung rộng ~350, trừ margin trái 46 và phải ~14) ngay trong `titleCreate_a94` — sửa 1 chỗ áp dụng cho cả 2 nơi gọi hàm này (mục "Cực Phẩm" và "Chú Linh").

**C. Danh sách buff "Nhẫn" (`LYRAttrSkin.exml`/`SkinLYRAttr`, controller `RingDetailView`) — chồng chéo toàn bộ, đây là 2 lỗi riêng biệt cộng dồn**:
- **C1 (khối thuộc tính trên cùng)**: thiết kế cực kỳ mong manh — `attrName` là 1 Label TĨNH (JS không bao giờ đụng tới) chứa cả 4 tên thuộc tính nối liền bằng NHIỀU KÝ TỰ KHOẢNG TRẮNG THỦ CÔNG ("Sinh        lực：Công        kích：...") rồi ép `width=125` để nó TỰ NGẮT DÒNG đúng ngay điểm mong muốn — 1 kiểu "giả lập lưới bằng ép word-wrap" cực kỳ dễ vỡ. Khi dịch sang tiếng Việt, cụm "Kháng        vật lý：" dài hơn 3 cụm còn lại nên ngắt dòng SỚM HƠN 1 dòng so với dự kiến, làm lệch toàn bộ các dòng phía sau so với cột giá trị (`attrValue`, được JS set động qua `AttributeData.getAttStr` — đã tự chứa ĐẦY ĐỦ "Tên： Giá trị" cho cả 4 dòng, `attrName` chỉ là phần TRÙNG LẶP/thừa gây đè chữ). Xác nhận `attrName` không được controller `RingDetailView.open` đụng tới (chỉ set `this.attrValue.textFlow=...`) → xóa hẳn `attrName` khỏi layout, chỉ giữ `attrValue`.
- **C2 (danh sách 5 buff bên dưới)**: y hệt bài học mục 106→108 — 5 cặp "【Tên kỹ năng】"+mô tả đặt ở `y` cố định cách đều ~30px (giả định mỗi mô tả chỉ 1 dòng), nhưng mô tả tiếng Việt dài nên hầu hết wrap thành 2-4 dòng, làm dòng sau đè lên dòng trước. Đồng thời 1 trong 5 label mô tả (dòng 2, "3 nhân vật Công kích...") thiếu hẳn `width`/`left+right` nên còn không wrap được luôn (giống lỗi B). Áp dụng ĐÚNG kỹ thuật đã rút ra ở mục 108: gộp cả 5 cặp vào 1 Group cha dùng `VerticalLayout gap="10"`, mỗi cặp là 1 Group con dùng `HorizontalLayout gap="4" verticalAlign="top"` (tên kỹ năng + mô tả rộng `width="270"` để wrap tự nhiên) — không còn `y` cố định nào, tự xếp chồng đúng theo chiều cao thật.
- Do nội dung mới cao hơn nhiều so với chỗ trống cũ (~215px) — ước tính cần ~430-460px cho 14 dòng word-wrap tổng cộng — đã phóng to khung nền popup y hệt kỹ thuật mục 108: `anigroup` cao `404`→`684`, `bg`(tongyongtip1) cao `396`→`676` (cùng delta +280 để giữ mép trên không đổi, đã rà soát toàn bộ file xác nhận CHỈ có `bg` dùng `verticalCenter` — không lặp lại lỗi "quên phần tử khác dùng tọa độ tương đối" của mục 108→109).

Cache-bust: `main.min_9251d959.js`(mục 109)→`main.min_2487f96b.js`, `default.thm_49271daf.js`(mục 109)→`default.thm_31eb99ba.js`. Xác minh: `node -c` cả 2, `xml.etree.ElementTree.parse` qua `RingTips.exml`/`LYRAttrSkin.exml`, script đối chiếu factory-method cho `SkinRingTips`/`SkinLYRAttr`/`SkinHejiEquipTips`/`SkinLYRUltra`/`SkinLYRAbilityItem` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận cả 4 tooltip — lưới 2x2 hết đè chữ, "+9%" nằm gọn trong khung, và danh sách buff Nhẫn hiển thị rõ ràng từng dòng không còn chồng chéo (đặc biệt lưu ý phần C vì có nhiều ước tính chiều cao — nếu vẫn còn khoảng trống thừa/thiếu ở cuối khung thì cần tinh chỉnh thêm).

## 111. Ảnh xác nhận mục 110: danh sách buff đã hết chồng chéo (OK), nhưng phần C1 bị lỗi tự gây ra — mất hết nhãn "Sinh Lực："/"Công Kích："..., và khung dư quá nhiều khoảng trống lộ nền phía sau (2026-07-11)

Ảnh xác nhận cho thấy phần C2 (danh sách 5 buff) đã sửa đúng, hết chồng chéo, word-wrap đẹp. Nhưng phần C1 (khối 4 dòng thống kê trên cùng) bị lỗi MỚI do chính mục 110 gây ra — chỉ còn "118030 / 6080 / 1580 / 1580" (toàn số), mất sạch nhãn "Sinh lực："/"Công kích："/...

**Nguyên nhân (đọc sai code)**: ở mục 110 tôi kết luận nhầm rằng `attrName` (nhãn tĩnh) là dư thừa vì nghĩ `attrValue` (giá trị động qua `RingDetailView.open` → `AttributeData.getAttStr(...)`) đã tự chứa cả tên lẫn giá trị — nhưng lần theo đúng tham số truyền vào hàm `getAttStr(i,0,1,"",!1,!1,...)` thì tham số thứ 6 (`a=false`) chính là cờ "có gắn tên thuộc tính hay không" của `getAttStrByType` bên trong — với `false`, hàm CHỈ trả về giá trị số, KHÔNG có tên. Tức là `attrName` không hề dư thừa, nó là cột NHÃN THẬT SỰ đứng cạnh cột giá trị — tôi đã xóa nhầm 1 phần tử đang hoạt động đúng chức năng. Bài học: khi 1 hàm dùng-chung có nhiều tham số boolean/cờ điều khiển từng đoạn output (như đây có tới 12 tham số), phải lần theo ĐÚNG VỊ TRÍ THAM SỐ qua từng lớp gọi hàm (không chỉ đọc tên hàm/đoán ý nghĩa chung chung) trước khi kết luận 1 phần tử là "dư thừa/vestigial".

**Sửa**: khôi phục `attrName` nhưng bỏ hẳn kỹ thuật "ép word-wrap bằng nhiều khoảng trắng thủ công" (nguyên nhân gốc của bug từ đầu, mục 110 xác định đúng) — thay bằng 1 Label DUY NHẤT với 4 dòng nối bằng ký tự xuống dòng tường minh (`&#10;`/`\n`), giữ nguyên `lineSpacing="10"`/`size="20"` khớp với `attrValue` để 2 cột thẳng hàng theo đúng cơ chế đã chứng minh hoạt động ở bản gốc (chỉ khác là bỏ cách "ép wrap qua width hẹp" dễ vỡ, chuyển sang xuống dòng tường minh không phụ thuộc đo lường bề rộng chữ). `attrValue` cũng đổi lại thành chỉ chứa số (khớp đúng hành vi thật của `getAttStr` với cờ `false`).

**Lỗi thứ 2 — khung dư quá nhiều khoảng trống, lộ màn hình nền phía sau**: đo trực tiếp trên ảnh xác nhận (dùng tỷ lệ điểm ảnh so giữa mép khung và điểm kết thúc nội dung thật) thì mức tăng chiều cao +280 ở mục 110 (404→684) THỪA GẦN GẤP ĐÔI so với mức cần thiết — nội dung thật chỉ cần tới ~482 (không phải 684), phần dư ~200 đơn vị hiện ra như 1 khoảng trống tối lớn, và vì `bg` (nền `tongyongtip1`) dùng `scale9Grid="10,9,9,10"` (gần như toàn bộ ảnh là vùng giữa được kéo dãn) nên kéo dãn quá mức khiến vùng giữa loãng màu, lộ hình nền game phía sau (dàn nhân vật, nút "Nâng sao", chỉ số "Công Kích/Vật Kháng..." của màn hình Linh Thú — KHÔNG PHẢI lỗi chồng chéo hay popup khác, chỉ là hình nền bị mờ lộ qua do kéo dãn quá tay). Tính lại theo tỷ lệ đo được từ ảnh thật: `anigroup` `684`→`482`, `bg` `676`→`474` (giữ nguyên công thức mục 108/110: cả 2 cùng giảm 1 lượng như nhau để mép trên khung không đổi vị trí).

Cache-bust: chỉ đổi `default.thm.js` (không đụng logic JS lần này): `default.thm_31eb99ba.js`(mục 110)→`default.thm_c3be5f84.js`. Xác minh: `node -c`, `xml.etree.ElementTree.parse`, script đối chiếu factory-method cho `SkinLYRAttr` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận cả nhãn "Sinh Lực："/"Công Kích："/"Kháng Vật Lý："/"Kháng Phép：" đã hiển thị lại đầy đủ đúng hàng với số, và khung không còn dư khoảng trống lớn ở cuối (không còn lộ màn hình nền phía sau).

## 112. Ảnh xác nhận mục 111: nhãn "Sinh Lực："... đã về đúng chỗ (OK), nhưng danh sách 5 buff vẫn tràn NGANG ra khỏi khung (không phải lỗi chiều cao) — nguyên nhân do mục 110 đặt sai mô hình cột (2026-07-11)

**Phát hiện lỗi thật sự**: user paste nguyên văn nội dung 5 dòng buff kèm mô tả "tràn ra khỏi khung" — quan sát kỹ ảnh thấy chữ bị ngắt GIỮA TỪ ("Song Kháng" → "So"/"ng", "Công kích" → "Côn"/"g", "hoạt" → "h"/"oạt") ngay sát mép phải khung, xác nhận đây là TRÀN NGANG (lòi phải), không phải vấn đề chiều cao (chiều cao mục 111 đã đo đúng và ổn).

**Nguyên nhân gốc**: cách dựng lại ở mục 110 dùng `Group+HorizontalLayout` đặt "【Tên buff】" và mô tả NẰM CẠNH NHAU trên cùng 1 hàng, với mô tả cố định `width="270"` — nhưng vị trí bắt đầu của mô tả phụ thuộc vào ĐỘ RỘNG THẬT của tên buff đứng trước (do `HorizontalLayout` xếp ngay sau, không phải cột cố định). Tên buff dài nhất "【Đại Thiên Hành Phạt】" (~21 ký tự, ước tính ~231px ở size 20) cộng thêm mô tả rộng 270px vượt xa ngân sách 1 hàng thực tế (~412px từ điểm bắt đầu hàng đến mép phải khung) → hàng có tên dài nhất tràn ra ngoài ~90px. Đây là lỗi tôi tự gây ra khi không tính đến việc độ rộng tên buff KHÁC NHAU giữa các hàng (5 tên dài từ 15-21 ký tự) trong khi ngân sách hàng là CỐ ĐỊNH.

**Sửa bằng mô hình khác hẳn — xếp DỌC (tên phía trên, mô tả phía dưới) thay vì NGANG**: thay vì cố nhét tên+mô tả vào cùng 1 hàng (buộc phải cạnh tranh không gian ngang), mỗi buff giờ là 1 khối `VerticalLayout gap="2"` gồm dòng tên riêng rồi đến mô tả riêng, mô tả dùng full chiều rộng hàng (`width="380"`, đã kiểm tra dư so với ngân sách ~412px). Cách này triệt tiêu hẳn phụ thuộc vào độ dài tên buff — dù tên ngắn hay dài, mô tả luôn có đúng 380px để tự word-wrap, không còn tranh chấp không gian ngang giữa các hàng.

**Tính lại chiều cao bằng mô phỏng word-wrap thay vì ước lượng thô**: viết 1 hàm mô phỏng ngắt dòng greedy (không cắt giữa từ) bằng Python, hiệu chỉnh (calibrate) hằng số px/ký tự bằng cách so khớp với 1 ví dụ ĐÃ XÁC NHẬN đúng trên ảnh thật (`abilityDesc` ở mục 108/109, biết chắc render ra 3 dòng ở `width=322`) — tìm ra ngưỡng ~10.5-11px/ký tự tại size 20. Áp dụng hằng số này (dùng 11.0, chọn hơi dư để an toàn) mô phỏng cả 5 mô tả ở `width=380` → tổng 17 dòng (gồm cả 5 dòng tên) → chiều cao nội dung ước tính ~526px, cộng phần đầu khung (172.5px) và đệm đáy (~30px) → tổng cần ~728px. Đặt `anigroup`/`bg` ở mức `760`/`752` (dư ~30px so với ước tính để an toàn, không lặp lại kiểu ước lượng quá tay như mục 110 hay quá hụt như mục 111).

**Bài học tổng kết cho lớp bug "Group+HorizontalLayout tên+giá trị"**: kỹ thuật này AN TOÀN khi 1 trong 2 phần tử (thường là nhãn/tên) có độ dài GẦN NHƯ CỐ ĐỊNH giữa các hàng (ví dụ "Cấp độ："/"Chuyển sinh："chỉ chênh nhau vài ký tự) — nhưng KHÔNG AN TOÀN khi độ dài nhãn dao động MẠNH giữa các hàng (ở đây 15-21 ký tự, chênh ~40%) vì ngân sách còn lại cho phần tử thứ 2 (thường cần word-wrap) sẽ co giãn theo, dễ vượt ngân sách ở hàng có nhãn dài nhất dù test-case khác vẫn an toàn. Khi gặp danh sách nhãn có độ dài dao động mạnh + mô tả cần word-wrap, nên ưu tiên xếp DỌC (tên trên/mô tả dưới, mô tả dùng full-width) thay vì xếp NGANG.

Cache-bust: chỉ đổi `default.thm.js`: `default.thm_c3be5f84.js`(mục 111)→`default.thm_eee2e54f.js`. Đổi tên factory `_HorizontalLayoutN_i`(N=2..6)→`_VerticalLayoutN_i` cho khớp đúng loại layout thật sự trả về (tránh để lại tên gây hiểu nhầm cho lần sửa sau). Xác minh: `node -c`, `xml.etree.ElementTree.parse`, script đối chiếu factory-method cho `SkinLYRAttr` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged (`width="380"` x5, `height="760"`/`"752"`), `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận cả 5 dòng buff không còn ngắt giữa từ ở mép phải, và chiều cao khung vừa đủ (không thừa/thiếu nhiều).

## 113. Cụm màn hình "Thần Binh" (神兵) — thanh tab đè chữ toàn bộ 4 màn, số La Mã Trung chưa dịch ở "Thánh Vực", chữ bị hụt lề trái ở "Hợp Thành", và phát hiện 1 phần KHÔNG SỬA ĐƯỢC bằng code (banner hình ảnh) (2026-07-11)

Người dùng yêu cầu rà soát tổng thể 3 màn hình con của tính năng "神兵"(Thần Binh): `SkinGwMijing`("Huyễn Cảnh"), `SkinGwMixSkin`("Hợp Thành"), `SkinGwBoss`("Thánh Vực") — cả 3 dùng chung khung `GwSkin.exml`/`SkinGw` (logo + thanh tab).

**A. Thanh tab đè chữ (xuất hiện ở CẢ 4 tab, mọi màn hình)**: phát hiện `GwSkin.exml` (file nguồn) vẫn còn tên tab bằng **tiếng Trung nguyên bản** ("神 兵", "神兵幻境", "圣物合成", "神兵圣域") — NHƯNG `default.thm.js` (file biên dịch, file THẬT SỰ chạy) đã được dịch từ trước (không phải do phiên này) thành các chuỗi tiếng Việt ĐẦY ĐỦ và DÀI: "Thần  Binh"(2 khoảng trắng), "Thần Binh Huyễn Cảnh", "Hợp Thành Thánh Vật", "Thần Binh Thánh Vực" — đây là **lỗi lệch nguồn/biên dịch (source/compiled divergence)** y hệt loại rủi ro đã cảnh báo nhiều lần trong phiên, chỉ khác là do người khác (không phải Claude) gây ra ở lần chỉnh sửa nào đó trước phiên này. Nguyên nhân đè chữ: `SkinBtnTab0` (skin dùng CHUNG cho ~28 màn hình khác trong game) có `width="110"`(up)/`"120"`(down) CỐ ĐỊNH cho mỗi nút tab, nhưng `<e:Label id="labelDisplay" text="{data}".../>` bên trong lại KHÔNG có `width` ràng buộc — nên nhãn luôn render đúng bề rộng thật của chuỗi, bất kể nút chứa nó rộng bao nhiêu; với chuỗi 18-20 ký tự ở size 21 (~200-230px) trong khi mỗi tab chỉ có ngân sách ~150px (600px màn hình / 4 tab), cộng thêm `HorizontalLayout gap="-8"` (âm, vốn hợp lý cho 2 ký tự Hán ngắn nhưng phá hoại với chữ Việt dài) → nhãn tab tràn chồng lên nhau.

**Không sửa `SkinBtnTab0`** (dùng chung quá nhiều nơi, rủi ro lan tỏa cao nếu đổi `width`/font). Thay vào đó rút ngắn tên tab (đã có tiêu đề đầy đủ hiển thị riêng trên mỗi màn hình rồi, tab chỉ cần đủ ngắn gọn để điều hướng): "Thần  Binh"→"Thần Binh" (sửa khoảng trắng kép), "Thần Binh Huyễn Cảnh"→"Huyễn Cảnh", "Hợp Thành Thánh Vật"→"Hợp Thành", "Thần Binh Thánh Vực"→"Thánh Vực" (bỏ tiền tố "Thần Binh" lặp lại ở 3/4 tab). Đổi `gap="-8"`→`"0"`. Đồng bộ luôn `GwSkin.exml` (nguồn) sang cùng nội dung tiếng Việt đã rút gọn — khép lại luôn khoảng lệch nguồn/biên dịch cũ.

**B. "Thánh Vực" — số tầng tháp vẫn ghi số Hán chưa dịch ("五tầng", "四tầng"...)**: đúng bài học "thứ 七Chi tiết" ở mục 9 tái diễn — biến `this.numToStr=["一","二","三","四","五"]` (constructor `GweaponBossView`) ghép trực tiếp `numToStr[s]+"tầng("` → sinh ra "五tầng(...)" thay vì "Tầng 5(...)". Sửa cả 2 chỗ: xóa hẳn mảng `numToStr` (không dùng nơi nào khác, xác nhận qua đếm số lần xuất hiện toàn file = đúng 2 = 1 định nghĩa + 1 dùng), thay biểu thức thành `"Tầng "+(s+1)+"("` (đúng thứ tự tiếng Việt, số sau từ phân loại, khớp bài học mục 107).

**C. "Thánh Vực" — dòng "Số lần sở hữu..." đè lên "Cài đặt nhắc nhở"**: `leftTime` (text động, dài ~40 ký tự) đặt `x="133"` cố định không có `width`, `remindTpis` ("Cài đặt nhắc nhở") đặt `horizontalCenter="178"` — cả 2 cùng neo `bottom="13"` (cùng 1 hàng), `leftTime` với text dài tự nhiên tràn qua đúng chỗ `remindTpis` đứng. Rút ngắn text nguồn (`"Số lần sở hữu Thánh Vực còn lại hôm nay: "`→`"Còn lại hôm nay: "`, JS) NHƯNG không chỉ dựa vào việc rút ngắn vừa đủ (bài học từ nhiều lần trước: đo pixel không đáng tin) — dời hẳn `remindTpis` lên `bottom="40"` (hàng riêng, phía trên `leftTime`), cả 2 đều `horizontalCenter="0"` (canh giữa, không còn `x`/`horizontalCenter` hỗn hợp).

**D. "Hợp Thành" — 2 dòng mô tả bị hụt/mất chữ đầu bên trái ("iêu hao..." thay vì "Tiêu hao...")**: lại là bài học "đặt cả `x` và `horizontalCenter` cùng lúc" (mục 105) — `<e:Group id="bottomDesc" horizontalCenter="0" ... x.mix="94" x.ultramix="96">` vừa có `horizontalCenter="0"` (cố định, áp dụng mọi state) vừa có `x.mix`/`x.ultramix` (theo state) cho CÙNG 1 trục ngang. Xác nhận qua `default.thm.js`: `bottomDesc_i()` set `horizontalCenter=0` trong factory gốc, còn state "mix" chỉ gọi `SetProperty("bottomDesc","x",94)` — theo cơ chế constraint của Egret, `horizontalCenter` "thắng" và ghi đè `x` mỗi lần layout tính lại, đẩy cả cụm text lệch hẳn sang trái ra ngoài màn hình. Xóa `horizontalCenter="0"` khỏi cả exml và factory gốc trong `default.thm.js`, chỉ giữ lại `x.mix`/`x.ultramix` — để state tự quyết định vị trí không bị tranh chấp.

**Phát hiện KHÔNG THỂ SỬA bằng thay đổi code — cần asset đồ họa mới**: các nhãn tòa nhà trong màn "Thánh Vực" ("神兵塔", "神兵圣域一层"/"二层"/"三层") KHÔNG PHẢI text — kiểm tra `GwBossSkin.exml` xác nhận đây là các `<e:Image source="gw_title_0_png|gw_title_1_png|gw_title_2_png|gw_title_3_png".../>`, tức chữ Hán được VẼ SẴN vào file ảnh (texture), không phải Label. Không có cách sửa qua code/exml — muốn dịch cần có người thiết kế tạo lại các file ảnh này bằng tiếng Việt rồi thay thế asset, nằm ngoài khả năng của việc sửa code. Đã báo lại rõ cho người dùng.

Cache-bust: `main.min_2487f96b.js`(mục 112)→`main.min_038bb6e0.js`, `default.thm_eee2e54f.js`(mục 112)→`default.thm_e9131625.js`. Xác minh: `node -c` cả 2, `xml.etree.ElementTree.parse` qua `GwSkin.exml`/`GwBossSkin.exml`/`GwMixSkin.exml`, script đối chiếu factory-method cho `SkinGw`/`SkinGwBoss`/`SkinGwMixSkin` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận cả 4 tab hết đè chữ, "Tầng 1-5" đúng thứ tự tiếng Việt, "Còn lại hôm nay"/"Cài đặt nhắc nhở" tách 2 hàng rõ ràng, và đoạn mô tả "Hợp Thành" không còn hụt chữ đầu bên trái.

## 114. Xác nhận mục 113 OK (tab hết đè, "Hợp Thành" hết hụt lề trái). Sửa tiếp: tiêu đề "Quy Nguyên Đế Kiếm" xuống 2 dòng, câu mô tả nhiệm vụ bị dính chữ do ghép chuỗi kiểu tiếng Trung, cụm "!" ở "Huyễn Cảnh" lệch phải bỏ trống bên trái, và "Hợp Thành" giờ tràn lề phải (2026-07-11)

**A. Tiêu đề "Quy Nguyên Đ|ế Kiếm" xuống dòng giữa chữ** (`GwTask.exml`/`SkinGwTask`, Label `skillname`): có `width="143"` cố định — quá hẹp cho tên vũ khí dài (vd "Quy Nguyên Đế Kiếm" 18 ký tự ở size 22). Theo đúng bài học đã đúc kết ở mục 93-97 trong phiên (wordWrap không đáng tin cậy khi ép qua `width` hẹp): bỏ hẳn `width`, để `horizontalCenter` tự canh giữa theo kích thước chữ thật — tiêu đề giờ luôn 1 dòng bất kể tên vũ khí dài ngắn.

**B. Câu mô tả nhiệm vụ bị dính chữ ("hoạtQuy", "thậpCửu", "3.Tham")**: đây KHÔNG phải lỗi layout mà là lỗi NỐI CHUỖI trong JS (`GweaponTaskView`) — tiếng Trung không dùng khoảng trắng giữa cụm từ, nên khi dịch từng mảnh sang tiếng Việt rồi ghép lại theo đúng công thức nối chuỗi gốc, các mảnh dính liền nhau: `"Kích hoạt"+"|C:...T:"+tên vũ khí` (thiếu khoảng trắng sau "hoạt"), và `taskIdx+"."+desc+itemName+"(...)"' (thiếu khoảng trắng sau dấu chấm số thứ tự, sau `desc`, và trước `"(...)"`). Thêm khoảng trắng vào đúng 3 điểm nối này (cả 2 nhánh trạng thái DOING/DONE dùng chung công thức). Sau khi sửa, câu đọc đầy đủ và có nghĩa (không phải thiếu thông tin như nghi ngờ ban đầu — chỉ là dính chữ làm khó đọc): "Kích hoạt Quy Nguyên Đế Kiếm, cần hoàn thành nhiệm vụ Thần Binh trước (3/5)" / "3. Tham gia tiêu diệt BOSS Hoang Dã, thu thập Cửu Tiêu Vân Thạch (0/3)".

Đồng thời phát hiện thêm 1 lỗi tràn ngang tiềm ẩn: `taskLabel` và `renwuneirong` (2 label chứa câu vừa sửa) đều KHÔNG có `width` — với câu dài ~44-70 ký tự sẽ tràn hẳn ra ngoài màn hình 600px (không wrap, không xuống dòng, chữ ở cuối câu bị cắt mất vì nằm ngoài canvas). Thêm `width="420"` (taskLabel, lệch trái do có icon "!" bên cạnh) và `width="560"` (renwuneirong, canh giữa) để chữ tự wrap khi cần.

**C. Cụm "!" + 2 dòng mô tả ở "Huyễn Cảnh" lệch hẳn sang phải, bỏ trống nhiều bên trái**: `<e:Group id="info" y="250" x="168">` — offset `x=168` quá lớn so với cần thiết, đồng thời riêng 2 Label mô tả bên trong không có `width` nên tràn phải luôn (che khuất 1 phần chữ ngoài canvas, dù không thấy rõ vì đơn giản là bị cắt). Dời cụm về `x="20"` (sát lề trái, còn khoảng đệm hợp lý). Nhưng câu dài nhất (~58 ký tự) không thể vừa 1 dòng dù đặt `x` nào (đo được cần ~667px trong khi khung chỉ có ~530-560px khả dụng) → PHẢI tách khỏi 2 label cố định `y` rời rạc (kiểu cũ, y=2/y=27, giả định 1 dòng) sang **Group lồng nhau: `HorizontalLayout`(icon+chữ mỗi dòng) bên trong `VerticalLayout`**(xếp 2 dòng theo chiều cao thật) — đúng kỹ thuật đã dùng nhiều lần trong phiên. Giảm cỡ chữ 20→18 và nới `width` tới mức tối đa hợp lý (540) để giảm số dòng phải wrap (mô phỏng: dòng 1 vẫn cần 2 dòng, dòng 2 gói gọn 1 dòng → tổng ~4 dòng, cao hơn thiết kế gốc ~50px). Vì cụm "info" nằm sát phía trên danh sách cuộn (`Scroller`, vốn bắt đầu ngay y=308, chỉ cách "info" 58px — không đủ cho nội dung mới cần ~82px) nên dời `Scroller` xuống `y=308→348` và giảm `height` tương ứng `320→280` (giữ nguyên mép dưới, tránh đụng nút "Thách đấu" bên dưới).

**D. "Hợp Thành" (`GwMixSkin.exml`) từ hụt lề trái (mục 113) chuyển thành tràn lề phải**: sau khi mục 113 bỏ `horizontalCenter="0"` (để `x.mix`/`x.ultramix` không còn bị đè), phần text hiện đúng vị trí nhưng lộ ra vấn đề TIẾP THEO vốn bị che giấu trước đó — 2 Label mô tả (+1 label riêng chỉ hiện ở state "ultramix") cũng không có `width`, nên giờ tràn phải thay vì trước đây bị cắt trái. Đây là hệ quả tự nhiên của việc sửa đúng vị trí (không phải lỗi mới tự gây ra) — bug tràn phải vốn đã tồn tại nhưng "may mắn" bị che bởi bug tràn trái nặng hơn.

Áp dụng NGAY trong lần commit này (không để lại nợ kỹ thuật): tính toán cho thấy câu dài nhất (~78 ký tự, state "mix") không thể vừa trong khoảng trống trước khi chạm ảnh nền `BG` phía dưới (chỉ có ~71-79px trước khi `BG` bắt đầu ở `y=90`, trong khi cần ~84-90px cho 2 dòng x 2 label sau khi wrap dù đã giảm cỡ chữ 20→16 và mở `width` tới mức tối đa an toàn 480px) — chấp nhận có thể còn hơi khít, sẽ xác nhận qua ảnh thật. Đồng thời gộp `<e:Group>`+`HorizontalLayout`(icon+label)+`VerticalLayout`(xếp 2-3 dòng) y hệt kỹ thuật mục C, và NHÂN TIỆN dọn dẹp: phát hiện các thuộc tính `fontFamily`/`bold`/`textColor`/`size` set riêng theo `.mix`/`.ultramix` thật ra LUÔN GIỐNG NHAU giữa 2 state (chỉ `text` khác nhau thật sự) — gộp thành giá trị cố định duy nhất thay vì lặp lại thừa ở cả 2 state, giảm ~28 dòng code trùng lặp trong `default.thm.js`.

Khi đồng bộ `default.thm.js`, phát hiện và tự sửa ngay 1 lỗi trong chính bước đồng bộ: Group ẩn danh mới bọc `materialTxtImg`+`materialTxt` (chỉ hiện ở state "ultramix", được thêm bằng `AddItems` lúc runtime — khác với 2 Group luôn hiện được gọi trực tiếp trong `elementsContent`) BẮT BUỘC phải tự gán `this._Group4 = t` bên trong factory của nó, vì cơ chế `eui.AddItems` tra cứu phần tử cần thêm qua `t[this.target]` (dùng đúng tên biến instance, không phải chỉ gọi hàm dựng) — thiếu dòng này thì `AddItems` sẽ âm thầm không làm gì cả (không lỗi, không crash, chỉ đơn giản là dòng mô tả thứ 3 không bao giờ xuất hiện ở state "ultramix"). Đối chiếu với cách `_Image2`/`_Image3` (2 phần tử ẩn danh khác cũng dùng `AddItems` trong cùng file) đã tự gán tương tự để xác nhận đúng quy luật trước khi áp dụng.

Cache-bust: `main.min_038bb6e0.js`(mục 113)→`main.min_1cdadcba.js`, `default.thm_e9131625.js`(mục 113)→`default.thm_1e43d5ac.js`. Xác minh: `node -c` cả 2, `xml.etree.ElementTree.parse` qua `GwTask.exml`/`GwMijingSkin.exml`/`GwMixSkin.exml`, script đối chiếu factory-method cho `SkinGwTask`/`SkinGwMijing`/`SkinGwMixSkin` (0 thiếu định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận tiêu đề 1 dòng, câu mô tả nhiệm vụ đọc rõ ràng đầy đủ không dính chữ, cụm "!" ở "Huyễn Cảnh" đã dời sang trái và không đè lên danh sách cuộn bên dưới, và 2 dòng mô tả ở "Hợp Thành" hiển thị đầy đủ không tràn lề nào (đặc biệt lưu ý mục D vì khoảng trống trước ảnh nền khá khít theo tính toán).

## 115. Ảnh xác nhận mục 114: "Hợp Thành" đã OK (mục D), nhưng "GwTask" (mục B) sinh lỗi MỚI — 2 label chồng nhau vì cùng wrap 2 dòng nhưng đứng ở 2 hàng cố định gần nhau (2026-07-11)

Người dùng gửi 4 ảnh: 3 ảnh (vũ khí khác nhau: "Quy Nguyên Đế Kiếm", "Thiên Huyền Thánh Tản", "Phục Ma Kim Cầm") đều lặp lại đúng 1 lỗi — `taskLabel` và label bên dưới nó (`renwuchushi`/`quanbuwancheng`/`renwuneirong`, tùy trạng thái nhiệm vụ) đè chồng lên nhau; ảnh thứ 4 xác nhận "Hợp Thành" (mục 114D) đã hiển thị đúng, không cần sửa thêm.

**Nguyên nhân**: mục 114B thêm `width="420"`/`width="560"` vào `taskLabel`/`renwuneirong` để chữ tự wrap thay vì tràn ngang — đúng hướng, nhưng cả 2 label vẫn giữ nguyên vị trí neo bằng `bottom` CỐ ĐỊNH (`bottom="141"` và `bottom="93"`, cách nhau 48px) vốn tính cho chữ 1 dòng. Khi câu dài buộc phải wrap thành 2 dòng, `taskLabel` cao thêm ra nhưng khoảng cách tới label bên dưới không đổi → dòng 2 của `taskLabel` chồng lên label bên dưới. Đây là hệ quả trực tiếp của chính cách sửa mục 114B (thêm `width` mà không tính lại vị trí theo số dòng thật).

**Sửa dứt điểm bằng kỹ thuật auto-stack đã dùng nhiều lần trong phiên (LYRUltraSkin mục 108, LYRAttrSkin mục 112, GwMijingSkin/GwMixSkin mục 114)**: bỏ hẳn việc định vị bằng `bottom` cố định, thay bằng cấu trúc `Group(VerticalLayout)` bọc 2 khối:
- Khối 1 (`Group(HorizontalLayout gap="8")`): icon "!" + `taskLabel` — xếp ngang như cũ nhưng không tự định vị tuyệt đối.
- Khối 2 (`Group` không layout, các con đều `horizontalCenter="0"`): `renwuchushi`/`quanbuwancheng`/`renwuneirong` — 3 label loại trừ lẫn nhau (bật/tắt bằng `visible`), gộp vào 1 Group để cả 3 chiếm cùng 1 "khe" trong `VerticalLayout` cha, bất kể label nào đang hiện.

`VerticalLayout gap="6"` ở Group cha tự xếp khối 2 ngay dưới khối 1 theo đúng chiều cao THẬT của khối 1 (1 hay 2 dòng đều tự động đúng) — triệt tiêu hẳn phụ thuộc vào việc đoán số dòng để chọn `bottom` cố định, giống hệt bài học đã đúc kết nhiều lần trong phiên. Đồng thời giảm cỡ chữ cả 4 label (`taskLabel`, `renwuchushi`, `quanbuwancheng`, `renwuneirong`) từ 20→18 để có thêm biên an toàn.

**Lưu ý ngân sách chiều cao còn khá khít**: khoảng trống giữa cụm `showSkill2` (kết thúc ~y=465) và nút "Nhận nhiệm vụ" (bắt đầu ~y=554) chỉ có ~89px. Mô phỏng word-wrap (hiệu chỉnh theo cách đã dùng ở mục 112, ~10.35px/ký tự tại size 18) cho trường hợp XẤU NHẤT (cả `taskLabel` lẫn `renwuneirong` đều wrap 2 dòng cùng lúc) ước tính cần ~106.8px — VƯỢT ngân sách lý tưởng ~18px. Chấp nhận đánh đổi này vì: (1) cấu trúc auto-stack đảm bảo KHÔNG BAO GIỜ xảy ra chồng chữ (lỗi gốc đang sửa) dù chiều cao có vượt nhẹ; (2) trường hợp cả 2 label cùng wrap 2 dòng là hiếm (phụ thuộc độ dài tên vũ khí + độ dài mô tả nhiệm vụ cùng lúc dài); (3) nếu vượt, hậu quả chỉ là nút "Nhận nhiệm vụ" bị đẩy sát/chồng nhẹ vào cụm `showSkill2`, mức độ nhẹ hơn nhiều so với lỗi chồng CHỮ đang sửa. Sẽ xác nhận qua ảnh thật, có thể cần giảm thêm cỡ chữ hoặc thu hẹp `width` nếu vẫn khít.

Khi đồng bộ `default.thm.js`: dựng lại `_proto._Group1_i` (cụm icon+taskLabel, trước đây tự định vị `horizontalCenter`/`verticalCenter`/`width`/`height` — nay bỏ hết, chỉ còn `layout` xếp ngang) thành phần tử con của `_Group3_i` mới (Group ngoài cùng, giữ lại `horizontalCenter="0"` + `verticalCenter="184.5"` + `layout=VerticalLayout gap="6"`); tạo thêm `_Group4_i` (cụm 3 label loại trừ lẫn nhau). Đổi `elementsContent` của `GwTask_i` từ `[..., this._Group1_i(), this.renwuchushi_i(), this.quanbuwancheng_i(), this.renwuneirong_i(), ...]` thành `[..., this._Group3_i(), ...]`. Quét toàn bộ class `SkinGwTask` xác nhận trước đó chỉ có `_Group1`/`_Group2`/`_HorizontalLayout1` tồn tại — đặt tên mới `_Group3`/`_Group4`/`_VerticalLayout1` không trùng.

Cache-bust: `default.thm_9cb9125f.js`(mục 114)→`default.thm_9122d4d8.js` (chỉ đổi layout, không đụng `main.min.js` lần này). Xác minh: `node -c`, `xml.etree.ElementTree.parse` qua `GwTask.exml`, script đối chiếu factory-method cho riêng class `SkinGwTask` (0 thiếu/0 thừa định nghĩa), `git show :path` xác nhận đúng nội dung staged (cấu trúc Group lồng nhau khớp exml, `_Group3_i`/`_Group4_i`/`_VerticalLayout1_i` đúng như thiết kế), `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận cả 3 vũ khí (đang làm/toàn bộ hoàn thành/có nhiệm vụ cụ thể) không còn chồng chữ giữa `taskLabel` và label bên dưới, và nút "Nhận nhiệm vụ" không bị chồng lên cụm kỹ năng thứ 3 (`showSkill2`) do ngân sách chiều cao khít như đã tính ở trên.

## 116. Ảnh xác nhận mục 115: GwTask hết chồng chữ (OK cả 3 vũ khí!), nhưng người dùng chỉ ra cụm "!" vẫn còn để phí khoảng trống bên trái thay vì dời qua để mô tả có thêm chỗ (2026-07-11)

Người dùng gửi 3 ảnh xác nhận mục 115 đã hết lỗi chồng chữ (không còn `taskLabel` đè lên label bên dưới ở cả "Quy Nguyên Đế Kiếm"/"Phục Ma Kim Cầm"), nhưng chỉ ra 1 vấn đề khác: cụm icon "!" (ở cả `GwTask` lẫn `GwMixSkin`/"Hợp Thành") có khoảng trống thừa bên trái không dùng tới, trong khi đúng ra nên dời cụm này qua trái để nhường thêm chỗ cho mô tả — giảm khả năng phải wrap dòng hoặc wrap ngắt giữa từ.

**Nguyên nhân (GwTask)**: `VerticalLayout horizontalAlign="center"` (đặt ở mục 115) canh giữa TỪNG HÀNG theo bề rộng hàng RỘNG NHẤT trong Group cha. Hàng 1 (icon+`taskLabel`, bề rộng tự nhiên ~448px = icon+gap8+width420) hẹp hơn hàng 2 (`renwuneirong` khai báo `width="560"`, vẫn tính vào bề rộng đo dù đang ẩn) — nên hàng 1 bị đệm ~56px mỗi bên để canh giữa trong khung 560px, lãng phí không gian có thể dùng cho `taskLabel`.

**Nguyên nhân (GwMixSkin/"Hợp Thành")**: `bottomDesc` đặt `x.mix="94"`/`x.ultramix="96"` — độ lệch trái cố định kế thừa từ thiết kế tiếng Trung gốc (chữ Hán ngắn hơn nhiều nên không cần sát lề), để lại khoảng trống ~94px vô ích bên trái trong khi mô tả tiếng Việt (`width="480"`) đã tràn sát mép phải (kết thúc đúng x=600, 0px lề phải — rủi ro tràn nếu chữ dài hơn ước tính, từng thấy vỡ giữa từ "Thánh V/ật mới" ở ảnh IMG_0828).

**Sửa cả 2 file bằng cách dời cụm "!" qua trái + tăng `width` mô tả tương ứng để tận dụng khoảng trống vừa giải phóng**:
- `GwTask.exml`: đổi `horizontalAlign="center"`→`"left"` (hàng 1 giờ canh sát lề trái của Group cha thay vì bị đệm giữa), đồng thời tăng `taskLabel` từ `width="420"`→`"520"` (tận dụng phần rộng thêm, vẫn chừa ~12px trong khung 560px, không tràn ra ngoài `_Group3`).
- `GwMixSkin.exml`: giảm `x.mix`/`x.ultramix` từ `94`/`96`→`20` (thống nhất 1 giá trị luôn, vì 94/96 chỉ lệch 2px không có ý nghĩa thực), tăng `width` cả 3 label mô tả (2 label luôn hiện + `materialTxt` chỉ hiện ở "ultramix") từ `480`→`530` — tính toán: lề trái mới 20 + icon(~20) + gap(6) + width(530) = 576, chừa ~24px lề phải an toàn (trước đây là 0px, sát mép tràn).

Đồng bộ `default.thm.js`: `SkinGwTask._VerticalLayout1_i` đổi `horizontalAlign`, `taskLabel_i` đổi `width`; `SkinGwMixSkin` đổi `width=480→530` ở cả 3 factory label (`_Label1_i`/`_Label2_i`/`materialTxt_i`), và đổi cả 2 dòng `new eui.SetProperty("bottomDesc","x",94/96)` (trong `createChildren`/state khởi tạo state "mix"/"ultramix") thành `20`.

Cache-bust: `default.thm_9122d4d8.js`(mục 115)→`default.thm_aef8f65c.js` (chỉ layout, không đụng `main.min.js`). Xác minh: `node -c`, `xml.etree.ElementTree.parse` qua `GwTask.exml`/`GwMixSkin.exml`, script đối chiếu factory-method riêng cho `SkinGwTask`/`SkinGwMixSkin` (0 thiếu/0 thừa định nghĩa), `git show :path` xác nhận đúng nội dung staged (`width="520"`, `horizontalAlign="left"`, `x.mix="20"`/`x.ultramix="20"`, `width="530"` x3), `manifest.json`/`index.php` đã bump `?v=`.

**Bài học bổ sung cho lớp bug "Group+VerticalLayout căn giữa nhiều hàng bề rộng khác nhau"**: khi các hàng trong 1 `VerticalLayout` có bề rộng CHÊNH LỆCH NHIỀU (do 1 hàng có `width` khai báo cố định lớn hơn hẳn, kể cả khi phần tử đó đang ẩn — Egret vẫn tính bề rộng ẩn vào phép đo Group), `horizontalAlign="center"` sẽ lãng phí không gian ở hàng hẹp hơn thay vì tận dụng cho nội dung cần wrap. Cân nhắc `horizontalAlign="left"` khi hàng hẹp hơn chứa nội dung CẦN không gian (như mô tả dài) hơn là ưu tiên tính thẩm mỹ canh giữa.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận cụm "!" ở cả `GwTask` và "Hợp Thành" đã dời sát lề trái hơn, mô tả có thêm không gian (giảm/hết hiện tượng ngắt giữa từ như "V/ật"), và không có tràn lề phải mới phát sinh do tăng `width`.

## 117. Màn hình danh sách phó bản đội nhóm (`teamFbItem.exml`/`SkinTeamFbItem`, hiện ở tab "Tiên Đồ" và tương tự): "Xem hướng dẫn" đè lên tiêu đề nền, tên boss "Thương Sơn Quỷ Xà" bị cắt mất dòng 2 (2026-07-11)

Người dùng gửi 1 ảnh màn "Tiên Đồ" (danh sách phó bản như "Bích Hải Thâm Đàm", "Long Phụng Vân Cảnh", "U Minh Chi Lộ", "Hoang Giao Cốt") chỉ ra 2 lỗi lặp lại ở CẢ 4 dòng phó bản:

**A. Link "Xem hướng dẫn" đè lên chữ tiêu đề nền (baked vào ảnh nền `fbImg`)**: `gonglveTxt` đặt cố định `x="200"` — nhưng tiêu đề (vẽ sẵn trong ảnh nền, khác nhau mỗi dòng: "Bích Hải Thâm Đàm", "Long Phụng Vân Cảnh"...) có độ dài khác nhau, tiêu đề dài nhất ("Long Phụng Vân Cảnh") kết thúc gần đúng vị trí `x=200`, gây đè chữ ở mọi dòng (đã kiểm tra bằng cách crop-so-sánh cả 3 dòng trong ảnh, xác nhận lỗi lặp lại y hệt bài người dùng mô tả). Dời `gonglveTxt` từ `x="200"`→`x="300"` — đủ xa để không đè lên tiêu đề dài nhất (kết thúc ~x=196 theo ước lượng từ ảnh) lẫn không chạm dải ruy băng "已激活"/"未激活" ở góc phải (bắt đầu ~x=497).

**B. Tên boss dài ("Thương Sơn Quỷ Xà") bị cắt cụt dòng 2 khi mở rộng thẻ chi tiết**: `nameTxt` (tên boss dưới icon tròn, trong Group con `id="zhankai"` chỉ hiện khi thẻ mở rộng) đặt `width="128"` (giới hạn bởi danh sách phần thưởng bắt đầu ngay `x="128"` bên cạnh, không thể nới rộng thêm) — tên dài (17 ký tự kể cả dấu cách) BẮT BUỘC phải wrap 2 dòng dù cỡ chữ nào, nhưng Group con `id="zhankai"` chỉ có `height="130"` và `nameTxt` bắt đầu ở `y="103"` → chỉ còn 27px cho 2 dòng chữ (cần ~48-58px ở cỡ 20), khiến dòng 2 bị dòng phó bản KẾ TIẾP trong danh sách vẽ đè lên (không phải clip cứng, mà do item sau trong List vẽ ngay sát y-boundary, đè lên phần tràn ra ngoài).

Người dùng yêu cầu giảm cỡ chữ 3pt — đã áp dụng (`size="20"`→`"17"`) nhưng đồng thời TÍNH TOÁN xác nhận: chỉ giảm cỡ chữ KHÔNG đủ giải quyết triệt để (2 dòng ở cỡ 17 vẫn cần ~41px, vẫn vượt xa 27px sẵn có) — nên **kèm theo tăng chiều cao vùng chứa** để khớp đúng với yêu cầu thực tế: Group con `id="zhankai"` từ `height="130"`→`"160"` (+30px, đủ cho 2 dòng ở cỡ 17 với dư ~16px margin), kéo theo tăng tổng chiều cao skin ở state "zhankai" từ `height.zhankai="262"`→`"291"` (131 base + 160 nội dung mới) để List tự động chừa đủ chỗ khi item này mở rộng, không đụng tới các phần tử khác (nút "Thách đấu" dùng `verticalCenter`, danh sách thưởng dùng `y` cố định từ đầu Group nên không bị ảnh hưởng bởi việc tăng chiều cao).

Áp dụng cho MỌI tab (Xung Quanh/Vương Giả/Đào Mỏ/Tiên Đồ/Vạn Long) vì cả 5 tab đều dùng chung `SkinTeamFbItem` làm itemRenderer cho danh sách phó bản — sửa 1 lần tự động áp dụng khắp nơi, đúng như người dùng yêu cầu.

**Ghi nhận nhưng CHƯA sửa (ngoài phạm vi yêu cầu lần này)**: tên vật phẩm trong danh sách "Xem trước thưởng" ("Tinh Phách Ngưng Khí", "Kết Tinh Thần Trang"...) cũng bị wrap/cắt tương tự trong cùng ảnh (dùng skin `SkinItem`/`SkinItem2` riêng, không phải `SkinTeamFbItem`) — người dùng không đề cập lần này nên chưa động tới, cần báo riêng nếu muốn sửa tiếp.

Đồng bộ `default.thm.js` (`SkinTeamFbItem`): `zhankai_i()` đổi `t.height=130→160`, root state "zhankai" đổi `SetProperty("","height",262→291)`, `nameTxt_i()` đổi `t.size=20→17`, `gonglveTxt_i()` đổi `t.x=200→300`.

Cache-bust: `default.thm_aef8f65c.js`(mục 116)→`default.thm_492b7c36.js`. Xác minh: `node -c`, `xml.etree.ElementTree.parse` qua `teamFbItem.exml`, script đối chiếu factory-method riêng cho `SkinTeamFbItem` (0 thiếu/0 thừa định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận "Xem hướng dẫn" không còn đè lên tiêu đề ở cả 4 dòng phó bản, và tên boss "Thương Sơn Quỷ Xà" (cùng các tên dài khác) hiển thị đủ 2 dòng không bị cắt khi mở rộng thẻ chi tiết.

## 118. Màn hình "Vương Giả" (`ladderinfoskin.exml`/`Skinladderinfo`, xếp hạng thiên thê): 4 chỗ chồng chéo/dính chữ + phát hiện thêm 2 chuỗi tiếng Trung chưa dịch, cùng banner ảnh không sửa được bằng code (2026-07-11)

Người dùng gửi 1 ảnh màn "Vương Giả" (đấu trường xếp hạng), yêu cầu rà soát và sửa các chỗ chồng chéo.

**A. "Xếp hạng của tôi:"/"Số trận thắng ròng:" bị số liệu động đè lên giữa chữ**: `winNum0`(x=325)/`winNum`(x=324) đặt gần sát nhãn — nhưng nhãn tiếng Việt dài hơn nhiều so với nhãn tiếng Trung gốc (~17-19 ký tự, ước tính cần ~180-200px ở size 20), nên giá trị số (VD "4", "6") hiện đè ngay giữa chữ nhãn thay vì đứng sau nó. Dời cả `winNum`/`winNum0` từ x≈324-325 → x=435 (đủ xa qua khỏi điểm kết thúc của nhãn dài nhất, tính dư biên).

**B. "Xếp hạng tuần trước"/"Xem bảng xếp hạng" (2 link riêng biệt) đè chồng lên nhau trên cùng 1 hàng**: `showNomber0`("Xếp hạng tuần trước", x=216) và `showNomber`(text mặc định "Xếp hạng hiện tại" nhưng bị JS ghi đè runtime thành "Xem bảng xếp hạng", x=331) cùng `y=160` — nhãn đầu dài ~19 ký tự (~200px) đã vượt qua điểm bắt đầu của nhãn thứ 2 (x=331), gây dính/đè chữ ("Xếp hạng tuầnXem bảng xếp hạng"). Không đủ chỗ ngang để đặt cạnh nhau trong khung rộng 554px (2 nhãn cộng lại cần >370px, sát mép), nên chuyển sang xếp DỌC: `showNomber` dời xuống `y=190` (dưới `showNomber0`), cùng `x=216` — đúng bài học đã đúc kết nhiều lần trong phiên (khi không đủ ngân sách ngang, ưu tiên xếp dọc thay vì cố nhét ngang).

**C. Tên phần thưởng "Lương/Chương Thanh Đồng" (trong khối "段位奖励") bị cắt cả 2 phía (mất chữ đầu bên trái, mất dòng 2 bên dưới)**: `rewardList` (List dùng `SkinItem2` làm itemRenderer, đặt trong `Scroller` không có `width`/`height` khai báo) — phân tích: (1) `nameTxt` trong `SkinItem2` (skin dùng CHUNG rất nhiều nơi trong game, không sửa trực tiếp để tránh ảnh hưởng diện rộng) có `x="-9"` (lệch trái so với gốc item để tự canh giữa dưới icon) — với item ĐẦU TIÊN (và duy nhất) trong danh sách, phần lệch trái này chạm/vượt biên clip của `Scroller`, cắt mất vài ký tự đầu; (2) `Scroller`/`List` không khai báo `height` tường minh nên tự đo theo `height` khai báo của `SkinItem2` (106), không tính đến việc tên phần thưởng dài phải wrap 2 dòng (vượt quá 106), khiến khung cuộn cắt cụt dòng 2. Sửa CỤC BỘ tại `ladderinfoskin.exml` (không đụng `ItemSkin2.exml` dùng chung): thêm `paddingLeft="15"` vào `HorizontalLayout` của `rewardList` (đẩy item đầu tiên vào trong, tránh lố ra ngoài biên clip trái), và thêm `height="160"` cho cả `Scroller` lẫn `List` (đủ chỗ cho icon + tên 2 dòng, dư biên so với ước tính ~118px cần thiết).

**D. Phát hiện thêm khi rà JS: "我的段位：Thanh Đồng二đoạn" — số Hán "二" dính giữa chữ, chưa dịch**: đúng lớp lỗi "thứ 七"(mục 9)/"五tầng"(mục 113) tái diễn lần 3 — hàm `getDuanWeiDesc()` (LadderData) ghép `e.showLevel+this.getZhongwenNumber(e.showDan)+"đoạn"`, trong đó `getZhongwenNumber()` là bảng tra số Hán (`一二三四五...`) chưa từng được dịch. Xóa hẳn hàm `getZhongwenNumber` (xác nhận chỉ 1 nơi gọi duy nhất, không dùng chỗ nào khác), thay biểu thức thành `e.showLevel+" - Đoạn "+e.showDan` (dùng số Ả Rập, đúng thứ tự tiếng Việt "danh xưng - Đoạn N", khớp bài học mục 107/113). Kết quả: "Thanh Đồng - Đoạn 2" thay vì "Thanh Đồng二đoạn".

**E. Phát hiện thêm: chuỗi "未上榜" (nghĩa "chưa lọt bảng xếp hạng") còn nguyên tiếng Trung ở 3 nơi** (hiển thị khi người chơi chưa có thứ hạng: màn "Vương Giả" hiện tại, cùng 2 màn liên quan khác dùng chung logic rank — `FbRankItem`-kiểu và 1 hàm cập nhật danh sách rank khác, cùng 1 pattern `selfPos>0?selfPos:"未上榜"` lặp lại 3 lần trong `main.min.js`). Dịch cả 3 thành "Chưa có hạng".

**Phát hiện KHÔNG SỬA được bằng code — cần asset đồ họa mới**: dòng tiêu đề "我的段位："("Hạng của tôi:") và "段位奖励"("Phần thưởng theo hạng") đều là ẢNH (`wzwddw_png`, `wzdw_png`), không phải Label — kiểm tra cả `ladderinfoskin.exml` lẫn `default.thm.js` xác nhận không có Label/text nào chứa 2 chuỗi này. Tương tự ruy băng đỏ "连胜"("Thắng liên tiếp") ở góc trên bên phải khối thông tin cũng là ảnh (`jjliansheng`). Cả 3 đều KHÔNG có Label tương ứng để sửa qua code — đã báo lại người dùng, cần thiết kế tạo ảnh mới bằng tiếng Việt để thay thế.

Đồng bộ `default.thm.js` (`Skinladderinfo`): `winNum_i`/`winNum0_i` đổi `x`, `showNomber_i` đổi `x`/`y`, `_Scroller1_i`/`rewardList_i` thêm `height=160`, `_HorizontalLayout1_i` thêm `paddingLeft=15`.

Cache-bust: `default.thm_492b7c36.js`(mục 117)→`default.thm_741fd781.js`, `main.min_1cdadcba.js`(mục 114)→`main.min_5fe8c36c.js`. Xác minh: `node -c` cả 2, `xml.etree.ElementTree.parse` qua `ladderinfoskin.exml`, script đối chiếu factory-method riêng cho `Skinladderinfo` (0 thiếu/0 thừa định nghĩa), `git show :path` xác nhận đúng nội dung staged (x/y mới, `height=160` x2, `paddingLeft=15`, `getZhongwenNumber` đã xóa hoàn toàn — 0 lần xuất hiện, "Chưa có hạng" xuất hiện đúng 3 lần), `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận số liệu "Xếp hạng của tôi"/"Số trận thắng ròng" không còn đè lên nhãn, 2 link "Xếp hạng tuần trước"/"Xem bảng xếp hạng" tách rõ 2 hàng, tên phần thưởng "...Thanh Đồng" hiển thị đủ chữ đầu và đủ 2 dòng không bị cắt, dòng "Thanh Đồng - Đoạn 2" đọc đúng tiếng Việt, và "Chưa có hạng" hiện đúng khi chưa có thứ hạng (cần tài khoản chưa xếp hạng để test được trường hợp này).

## 119. Ảnh xác nhận mục 118: hết chồng chữ nhưng chưa đẹp — số liệu nhảy quá xa nhãn, 2 link nên chung 1 hàng thay vì xếp dọc, và câu "Thời gian thi đấu" tràn lề phải cần tách 2 dòng (2026-07-11)

Người dùng gửi ảnh xác nhận mục 118 đã hết chồng/dính chữ (bao gồm cả "Thanh Đồng - Đoạn 2" hiển thị đúng), nhưng chỉ ra 3 điểm CHƯA ĐẸP cần tinh chỉnh lại (không phải lỗi chồng chữ mới, mà là hệ quả matching quá tay của lần sửa trước):

**A. Số liệu "Xếp hạng của tôi"/"Số trận thắng ròng" nhảy ra quá xa nhãn**: mục 118 ước lượng độ rộng nhãn bằng hằng số ~10.5px/ký tự (hiệu chỉnh từ 1 bối cảnh khác trong phiên) rồi đặt `x=435` để chắc chắn không đè — nhưng đo lại trực tiếp trên ảnh thật lần này cho thấy nhãn thực tế render hẹp hơn nhiều (~6.4-7.2px/ký tự ở size 20 trong bối cảnh cụ thể này), khiến khoảng cách thực tế giữa nhãn và số liệu bị dư ra rất nhiều (~100px), nhìn tách rời không tự nhiên. Đo lại chính xác từ ảnh (đối chiếu tỷ lệ pixel ảnh chụp với tọa độ khung 600px), tìm ra điểm kết thúc thật của nhãn dài nhất ("Số trận thắng ròng:") ở khoảng x≈356, chỉnh `winNum`/`winNum0` về `x="370"` (đủ sát, chừa khoảng cách vừa phải ~15px thay vì ~80px như trước).

**B. "Xếp hạng tuần trước"/"Xem bảng xếp hạng" nên chung 1 hàng, cách nhau 1 khoảng, canh giữa khung — thay vì xếp dọc**: mục 118 chuyển 2 link này sang xếp DỌC (lo ngại không đủ chỗ ngang) dựa trên cùng hằng số ước lượng px/ký tự quá tay ở mục A — nhưng với số đo thực tế mới (~7px/ký tự), tổng độ rộng 2 nhãn cộng khoảng cách chỉ ước ~280px, dư sức nằm gọn trong khung rộng 554px. Theo đúng yêu cầu, chuyển lại thành 1 `Group` bọc cả 2 Label bằng `HorizontalLayout gap="30"`, đặt `horizontalCenter="0"` trên chính Group đó (canh giữa cặp nhãn trong khung, thay vì đặt `x` cố định lệch trái như bản gốc).

**C. "Thời gian thi đấu:Thứ 2 10:00-Chủ nhật 22:00 （Tính điểm lúc 22:30 Chủ nhật）" tràn hẳn ra ngoài lề phải màn hình** (chỉ 1 Label không giới hạn `width`, chuỗi quá dài ~78 ký tự tính cả 2 vế): tách thành 2 Label riêng theo đúng điểm ngắt người dùng chỉ định — dòng 1 "Thời gian thi đấu:Thứ 2 10:00-Chủ nhật 22:00", dòng 2 "（Tính điểm lúc 22:30 Chủ nhật）" — bọc trong `Group horizontalCenter="25"` (giữ nguyên độ lệch canh giữa gốc, chừa chỗ cho icon "!" bên trái) với `VerticalLayout gap="4" horizontalAlign="center"`, mỗi Label con `horizontalCenter="0"` để tự canh giữa trong khối.

Đồng bộ `default.thm.js` (`Skinladderinfo`): `winNum_i`/`winNum0_i` đổi `x=435→370`; xóa `showNomber_i`/`showNomber0_i`'s `x`/`y` cố định, tạo `_Group2_i`(bọc cặp nhãn, `horizontalCenter=0 y=160`) + `_HorizontalLayout2_i`(`gap=30 verticalAlign=middle`), cập nhật `_Group1_i`'s `elementsContent` trỏ vào `_Group2_i()` thay vì 2 Label rời; xóa hẳn `truceIng_i`/`this.truceIng` (không còn `id="truceIng"` sau khi tách 2 dòng) và gỡ khỏi mảng `skinParts`, thay bằng `_Group3_i`(`horizontalCenter=25 top=599`) + `_VerticalLayout1_i`(`gap=4 horizontalAlign=center`) + `_Label3_i`/`_Label4_i` (2 dòng text), cập nhật `elementsContent` gốc của `Skinladderinfo` trỏ `_Group3_i()` thay vì `truceIng_i()`. Quét toàn class xác nhận trước đó chỉ có `_Group1`/`_HorizontalLayout1` tồn tại — đặt tên mới `_Group2`/`_Group3`/`_HorizontalLayout2`/`_VerticalLayout1`/`_Label3`/`_Label4` không trùng.

Cache-bust: `default.thm_741fd781.js`(mục 118)→`default.thm_1bb01637.js` (chỉ layout, không đụng `main.min.js` lần này). Xác minh: `node -c`, `xml.etree.ElementTree.parse` qua `ladderinfoskin.exml`, script đối chiếu factory-method riêng cho `Skinladderinfo` (0 thiếu/0 thừa định nghĩa, xác nhận `truceIng` không còn xuất hiện trong toàn class), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Bài học bổ sung**: hằng số px/ký tự calibrate ở 1 bối cảnh (font/size/màn hình cụ thể) trong phiên trước KHÔNG nên áp dụng máy móc sang bối cảnh khác mà không đo lại — lần này áp dụng hằng số ~10.5px/ký tự (vốn hiệu chỉnh cho 1 trường hợp riêng ở mục 112) đã ước lượng dư quá nhiều (thực tế chỉ ~7px/ký tự trong bối cảnh này), dẫn đến sửa "quá tay" (over-correct): né được lỗi chồng chữ nhưng tạo ra khoảng trống xấu không cần thiết. Nên ưu tiên đo trực tiếp trên ảnh xác nhận thật (crop + so tỷ lệ pixel) mỗi khi có ảnh cụ thể, thay vì tái dùng hằng số cũ.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận số liệu đứng sát nhãn hợp lý (không quá gần gây đè, không quá xa gây rời rạc), 2 link "Xếp hạng tuần trước"/"Xem bảng xếp hạng" nằm chung 1 hàng canh giữa khung, và câu "Thời gian thi đấu..." hiển thị đủ 2 dòng gọn trong màn hình không tràn lề phải.

## 120. Rút gọn "Mua thêm lượt ghép trận" thành "Mua thêm lượt" theo yêu cầu người dùng, tránh nguy cơ tràn lề như đã thấy ở ảnh IMG_0838 (2026-07-11)

Người dùng yêu cầu đơn giản: đổi nhãn link "Mua thêm lượt ghép trận" (`buyTime`, màn "Vương Giả") thành "Mua thêm lượt" là đủ. Đây cũng chính là dòng từng bị cắt cụt ở rìa phải màn hình trong ảnh IMG_0838 (mục 118) do đặt `x="413"` khá sát mép khung `openInfo` (rộng 578px) — rút ngắn chữ giúp giảm nguy cơ tràn lề đó luôn dù không được yêu cầu trực tiếp.

Text được set ĐỘNG qua `main.min.js` (`this.buyTime.textFlow=...parser("<u>Mua thêm lượt ghép trận</u>")`, ghi đè giá trị mặc định trong exml ngay khi mở màn) — sửa cả 2 nơi để đồng bộ nguồn/biên dịch: `main.min.js` (giá trị THẬT SỰ hiển thị) và `ladderinfoskin.exml`+`default.thm.js`'s `buyTime_i` (giá trị mặc định, dù bị ghi đè ngay lập tức, vẫn nên khớp để tránh lệch nguồn/biên dịch như đã từng gặp ở mục 113).

Cache-bust: `default.thm_1bb01637.js`(mục 119)→`default.thm_780160be.js`, `main.min_5fe8c36c.js`(mục 118)→`main.min_79119c91.js`. Xác minh: `node -c` cả 2, `git show :path` xác nhận cả 3 nơi (exml, default.thm.js, main.min.js) đều đã đổi thành "Mua thêm lượt", `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận nhãn hiển thị đúng "Mua thêm lượt" và không còn tràn lề phải.

## 121. Ảnh xác nhận mục 119: số liệu lại đè lên nhãn dài hơn, và 2 link đè lên icon bên trái — chuyển hẳn sang kỹ thuật Group+HorizontalLayout để hết đoán lệch lần nữa (2026-07-11)

Người dùng gửi ảnh cho thấy 2 vấn đề mới phát sinh từ mục 119:

**A. "Số trận thắng ròng6" — giá trị lại đè lên đúng dấu ":" cuối nhãn**: mục 119 dùng CHUNG 1 giá trị `x=370` cho cả `winNum` và `winNum0`, đo từ nhãn "Xếp hạng của tôi:" (17 ký tự) — nhưng nhãn còn lại "Số trận thắng ròng:" DÀI HƠN (19 ký tự), nên cùng 1 `x=370` vừa đủ cho nhãn ngắn lại đè lên nhãn dài. Đây là hệ quả tất yếu của việc dùng 1 giá trị `x` cố định chung cho 2 nhãn có độ dài khác nhau — bài học "đo 1 lần dùng cho nhiều nơi khác nhau" tiếp tục sai (lần thứ 3 liên tiếp ở khu vực này).

**Sửa DỨT ĐIỂM bằng kỹ thuật Group+HorizontalLayout** (kỹ thuật ĐÁNG LẼ nên dùng từ mục 118 thay vì đoán tọa độ `x` cố định nhiều lần): mỗi cặp nhãn+giá trị bọc riêng trong `Group x="223" y="..."` với `HorizontalLayout gap="8"` — giá trị giờ LUÔN bám sát đúng ngay sau bề rộng THẬT của nhãn tương ứng (do layout tự đo, không cần đoán px/ký tự nữa), triệt tiêu hẳn khả năng đè hoặc quá xa dù nhãn dài ngắn khác nhau.

**B. "Xếp hạng tuần trước"/"Xem bảng xếp hạng" đè lên icon huy hiệu bên trái**: mục 119 dùng `horizontalCenter="0"` để canh giữa cặp link trong khung rộng 554px — nhưng khung đó BAO GỒM CẢ vùng icon huy hiệu bên trái (huy hiệu chiếm khoảng 0-200px), nên canh giữa theo TOÀN BỘ bề rộng khung khiến cặp link lấn vào vùng icon. Đo lại: cặp link ở cỡ chữ 20 cần khoảng ~400px, trong khi khoảng trống AN TOÀN sau icon (200) đến hết khung (554) chỉ có ~354px — không đủ chỗ để vừa né icon vừa giữ nguyên cỡ chữ/khoảng cách gốc. Giảm cỡ chữ `20→18` và khoảng cách giữa 2 link `gap="30"→"18"`, đồng thời đổi từ `horizontalCenter="0"` sang `x="210"` cố định (bắt đầu ngay sau icon, không còn canh giữa toàn khung) để đảm bảo đủ chỗ mà không đè icon lẫn không tràn khung.

Đồng bộ `default.thm.js` (`Skinladderinfo`): tạo `_Group4_i`(bọc `_Label1_i`+`winNum0_i`, `x=223 y=88`, layout `_HorizontalLayout3_i` gap=8) và `_Group5_i`(bọc `_Label2_i`+`winNum_i`, `x=223 y=118`, layout `_HorizontalLayout4_i` gap=8); `_Label1_i`/`_Label2_i`/`winNum_i`/`winNum0_i` bỏ hết `x`/`y` cố định (giờ theo layout); `_Group1_i`'s `elementsContent` trỏ vào `_Group4_i()`/`_Group5_i()` thay vì 4 phần tử rời; `_Group2_i` đổi `horizontalCenter=0`→`x=210`, `_HorizontalLayout2_i` đổi `gap=30`→`18`, `showNomber_i`/`showNomber0_i` đổi `size=20`→`18`. Quét class xác nhận tên mới `_Group4`/`_Group5`/`_HorizontalLayout3`/`_HorizontalLayout4` không trùng với các tên đã dùng (`_Group1-3`, `_HorizontalLayout1-2`, `_VerticalLayout1`, `_Label1-4`).

Cache-bust: `default.thm_780160be.js`(mục 120)→`default.thm_f4b9689b.js`. Xác minh: `node -c`, `xml.etree.ElementTree.parse` qua `ladderinfoskin.exml`, script đối chiếu factory-method riêng cho `Skinladderinfo` (0 thiếu/0 thừa định nghĩa), `git show :path` xác nhận đúng nội dung staged, `manifest.json`/`index.php` đã bump `?v=`.

**Bài học đúc kết cho khu vực này (sau 3 lần chỉnh liên tiếp)**: với cặp "nhãn tiếng Việt (độ dài không cố định do dịch) + giá trị động", KHÔNG nên đoán tọa độ `x` cố định dù đã "đo trên ảnh thật" — vì các nhãn khác nhau trong CÙNG màn hình vẫn có thể chênh lệch độ dài đủ để 1 giá trị `x` chung làm hỏng nhãn còn lại. Bọc riêng từng cặp bằng `Group+HorizontalLayout` (giá trị luôn bám đúng sau nhãn thật) là giải pháp ĐÚNG NGAY TỪ ĐẦU, nên áp dụng ngay khi phát hiện lớp lỗi "giá trị đè/xa nhãn" thay vì thử đoán `x` trước.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận số liệu "Xếp hạng của tôi"/"Số trận thắng ròng" bám sát đúng sau từng nhãn (không đè, không quá xa) dù nhãn dài ngắn khác nhau, và cặp link "Xếp hạng tuần trước"/"Xem bảng xếp hạng" không còn đè lên icon huy hiệu bên trái.

## 122. HUD chính (`PlayFunSkin.exml`/`SkinPlayFun`, luôn hiển thị góc trên màn hình): dòng "Chuyển X Cấp Y" dính chữ với "Thứ Z quan" bên cạnh, gây nhìn như xuống dòng/tràn (2026-07-11)

Người dùng gửi 2 ảnh (HUD chính lúc chưa vào trận và lúc đang chiến đấu), yêu cầu: "chỗ hiển thị Level của nhân vật bị xuống dòng, cho hiển thị 1 dòng và thu nhỏ lại".

**Nguyên nhân kép**:
1. **Dính chữ (JS)**: hàm `expChange()` (điều khiển `lvTxt`, hiển thị "Chuyển sinh + cấp độ" màu xanh lá) ghép `"|C:0x00FF00&T:Chuyển "+i+"|"` (đoạn tô màu, vd "Chuyển 12") trực tiếp với `"Cấp "+e` (đoạn không màu, vd "Cấp 227") mà KHÔNG có khoảng trắng ở điểm nối — sinh ra "Chuyển 12Cấp 227" dính liền, đúng lớp lỗi "dính chữ do ghép chuỗi kiểu tiếng Trung" đã gặp nhiều lần (mục 114).
2. **2 cụm nhãn độc lập gần như chạm nhau (layout)**: `lvTxt` (thuộc Group "player info", `horizontalCenter="-170"`, box `x=220 width=110`) và `mapName0`+`expGroup` (thuộc Group KHÁC, `x=295`) là 2 CỤM HOÀN TOÀN TÁCH BIỆT về cấu trúc cha, được set tọa độ độc lập từ trước — tính theo tọa độ tuyệt đối, mép phải hộp `lvTxt` (≈318px) và điểm bắt đầu `mapName0` (≈317.5px) gần như trùng khít nhau (khoảng cách ~0.5px). Ở cỡ chữ gốc 18 với `lvTxt` dùng `textAlign="center"`, nếu chuỗi "Chuyển 12 Cấp 227" (sau khi thêm dấu cách) rộng hơn hộp 110px, phần chữ tràn ra 2 bên (do canh giữa) sẽ lấn ngay vào vùng `mapName0`, tạo cảm giác dính liền/tràn dòng như ảnh chụp — đây là nguyên nhân gốc của cả hiện tượng "xuống dòng" người dùng mô tả (thật ra là 2 cụm đè/lấn nhau chứ không phải 1 Label tự nó word-wrap).

**Sửa theo đúng yêu cầu (thu nhỏ + về 1 dòng, không đè nhau)**:
- Thêm khoảng trắng vào điểm nối JS: `s=s+"Cấp "+e` → `s=s+" Cấp "+e` (Chuyển 12Cấp 227 → Chuyển 12 Cấp 227).
- Giảm cỡ chữ cả 3 nhãn liên quan (`lvTxt`, `mapName0`, `expTxt`) từ `size="18"` → `"14"` (thu nhỏ như yêu cầu, giảm nguy cơ tràn hộp).
- Dời cụm `mapName0`+`expGroup` (Group cha) từ `x="295"` → `"315"` (+20px đệm an toàn) để tăng khoảng cách với `lvTxt`, không còn phụ thuộc hoàn toàn vào việc chữ vừa đủ nhỏ.
- Tinh chỉnh `y` của cả 3 nhãn (+2px mỗi nhãn) để bù lại việc chữ nhỏ hơn khiến baseline lệch nhẹ so với hàng gốc, giữ cảm giác canh giữa dòng như cũ.

Đồng bộ `default.thm.js` (`SkinPlayFun`): `_Group1_i`(cha của `mapName0`/`expGroup`) đổi `x=295→315`; `mapName0_i`/`expTxt_i`/`lvTxt_i` đổi `size=18→14` và `y` tương ứng.

Cache-bust: `default.thm_f4b9689b.js`(mục 121)→`default.thm_c27cd2da.js`, `main.min_79119c91.js`(mục 120)→`main.min_ba68d9e8.js`. Xác minh: `node -c` cả 2, `xml.etree.ElementTree.parse` qua `PlayFunSkin.exml`, script đối chiếu factory-method riêng cho `SkinPlayFun` (0 thiếu/0 thừa định nghĩa), `git show :path` xác nhận đúng nội dung staged (`" Cấp "` đã có dấu cách, `size="14"` x3, `x="315"`), `manifest.json`/`index.php` đã bump `?v=`.

**Phát hiện thêm nhưng CHƯA sửa (ngoài phạm vi yêu cầu lần này)**: ảnh đầu (IMG_0844) cho thấy `ybTxt` (số lượng tiền tệ thứ 2, góc trên phải HUD) cũng bị wrap — "3071.4vạn" xuống dòng thành "3071.4vạ"/"n". Đây là nhãn KHÁC (`ybTxt`, không liên quan `lvTxt`/`mapName0`), người dùng chưa yêu cầu sửa nên chưa động tới — cần xác nhận nếu muốn sửa tiếp ở lượt sau.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận dòng "Chuyển X Cấp Y Thứ Z quan [EXP] .../giờ" hiển thị gọn 1 dòng, đọc rõ có khoảng cách hợp lý giữa các cụm, không còn dính/đè chữ.

## 123. Ảnh xác nhận mục 122: hết dính chữ với "Thứ Z quan" (OK), nhưng "lvTxt" tự nó vẫn xuống dòng ("Chuyển 12 Cấp 11"/"3") vì cấp độ thực tế 3 chữ số không vừa hộp 110px — nới rộng theo đề xuất người dùng (dời cụm EXP/quan qua phải lấy thêm room) (2026-07-11)

Người dùng gửi ảnh xác nhận mục 122 đã hết dính chữ giữa `lvTxt` và `mapName0` (khoảng cách rõ ràng, không còn chạm nhau), nhưng chỉ ra `lvTxt` ("Chuyển 12 Cấp 113") vẫn TỰ NÓ xuống dòng — dòng 1 "Chuyển 12 Cấp 11", dòng 2 "3". Nguyên nhân: cấp độ nhân vật thực tế là số CÓ 3 CHỮ SỐ (113, không phải giả định trước đó), khiến chuỗi "Chuyển 12 Cấp 113" (17 ký tự) vẫn vượt quá hộp `width="110"` dù đã giảm cỡ chữ 18→14 ở mục 122 — hộp quá hẹp là nguyên nhân trực tiếp gây word-wrap, không phải do cỡ chữ chưa đủ nhỏ.

**Người dùng đề xuất**: dời cụm "EXP" (thật ra là cả cụm `mapName0`+`expGroup`, "Thứ Z quan...EXP.../giờ") qua bên phải để lấy thêm khoảng trống cho "phần level" (`lvTxt`). Áp dụng đúng theo đề xuất, kết hợp thêm biên an toàn:
- Dời cụm `mapName0`+`expGroup` (Group cha) từ `x="315"`(mục 122) → `x="335"` (+20px nữa).
- Nới rộng `lvTxt` từ `width="110"` → `"140"` (tận dụng khoảng trống vừa giải phóng).
- Giảm thêm cỡ chữ cả 3 nhãn (`lvTxt`/`mapName0`/`expTxt`) từ `14`→`13` (thêm biên an toàn, tránh lặp lại vòng thử-sai thứ 3).
- Tinh chỉnh `y` tương ứng (+0.5px mỗi nhãn) để bù baseline theo cỡ chữ mới.

Tính lại khoảng cách: mép phải hộp `lvTxt` mới ở tọa độ tuyệt đối ≈338, điểm bắt đầu `mapName0` mới ≈357.5 (cụm dời sang x=335 + offset nội bộ 22.52) → còn dư ~14.5px, vẫn đảm bảo không đè lại như mục 121.

Đồng bộ `default.thm.js` (`SkinPlayFun`): `_Group1_i` đổi `x=315→335`; `mapName0_i`/`expTxt_i`/`lvTxt_i` đổi `size=14→13`; `lvTxt_i` đổi thêm `width=110→140`.

Cache-bust: `default.thm_c27cd2da.js`(mục 122)→`default.thm_413a432b.js` (chỉ layout, không đụng `main.min.js` lần này). Xác minh: `node -c`, `xml.etree.ElementTree.parse` qua `PlayFunSkin.exml`, script đối chiếu factory-method riêng cho `SkinPlayFun` (0 thiếu/0 thừa định nghĩa), `git show :path` xác nhận đúng nội dung staged (`width="140"`, `size="13"` x3, `x="335"`), `manifest.json`/`index.php` đã bump `?v=`.

**Chưa kiểm chứng bằng ảnh thật**: cần ảnh xác nhận "Chuyển X Cấp YYY" (kể cả khi cấp độ đủ 3 chữ số) hiển thị trọn 1 dòng không xuống dòng, và vẫn giữ khoảng cách rõ ràng với cụm "Thứ Z quan...EXP.../giờ" bên cạnh.
