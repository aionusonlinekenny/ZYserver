# CLAUDE.md — ZYserver

Tài liệu này ghi lại (1) việc sẽ làm cho repo, (2) phân tích kiến trúc toàn bộ hệ thống, và (3) hướng dẫn chi tiết để đưa server này lên internet với **IP máy chủ: `71.31.97.241`**, website chạy ở **port 80**.

> Đây là file tài liệu/ghi chú (không phải code chạy được). Không có gì trong repo bị chỉnh sửa khi tạo file này — mọi thay đổi IP/port đề xuất bên dưới đều **chưa được áp dụng**, chỉ là hướng dẫn để bạn (hoặc Claude ở bước sau) thực hiện.

## Quy ước làm việc (đọc trước khi làm bất kỳ thay đổi nào)

- **Mỗi đợt việc = 1 commit duy nhất.** Không được tách "commit code thay đổi" rồi commit riêng "Update claude.md" ngay sau đó — gộp chung thay đổi code + cập nhật tiến độ trong `claude.md` (nếu có) vào **cùng một commit**. Lý do: người dùng dựa vào lịch sử commit trên GitHub để biết chính xác đợt nào cần copy file gì về máy chủ thật; tách commit làm khó theo dõi cái nào đi với cái nào.
- Trước khi commit, luôn kiểm tra `git status --short` để không bỏ sót file cần add hoặc để sót file rác (vd: file `.bak` tạm) chưa được dọn.
- Khi dịch nội dung trong file Lua/`.txt` dùng chuỗi `"..."` làm delimiter: **không được dùng dấu ngoặc kép thẳng `"`** bên trong nội dung dịch vì sẽ kết thúc sớm chuỗi và làm hỏng cú pháp file — dùng dấu ngoặc kép cong `" "` thay thế (xem thêm mục 8.4, phần "Bug đã gặp và đã vá"). Script `translation/apply_lang_glossary.py` đã có cơ chế tự chặn lỗi này.

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

**Tổng Giai đoạn 5: 25/109 file, 5.495 chuỗi đã dịch** (24 file trước + `tasktalk.txt` 347 chuỗi hoàn thành 100%).

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

### 8.5. Lưu ý triển khai

- Vì `s1` và `s99` mỗi khu có **bản sao riêng** của `data/language` và `data/config` (không dùng chung), nên dịch xong 1 bên cần **đồng bộ/copy sang bên kia** (hoặc dịch song song cả 2) để 2 khu nhất quán.
- File repo này (Claude Code session) là **bản làm việc**, không tự động đồng bộ với máy chủ Windows thật đang chạy — sau khi dịch xong từng giai đoạn ở đây, cần copy file đã dịch sang đúng đường dẫn tương ứng trên máy chủ thật rồi restart service liên quan để áp dụng.
- Nên giữ 1 file glossary (bảng thuật ngữ) dùng chung xuyên suốt các giai đoạn để thuật ngữ game (tên hệ thống, đơn vị, chức danh...) nhất quán, tránh mỗi giai đoạn dịch một kiểu khác nhau.
