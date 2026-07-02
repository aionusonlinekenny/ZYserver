# CLAUDE.md — ZYserver

Tài liệu này ghi lại (1) việc sẽ làm cho repo, (2) phân tích kiến trúc toàn bộ hệ thống, và (3) hướng dẫn chi tiết để đưa server này lên internet với **IP máy chủ: `71.31.97.241`**, website chạy ở **port 80**.

> Đây là file tài liệu/ghi chú (không phải code chạy được). Không có gì trong repo bị chỉnh sửa khi tạo file này — mọi thay đổi IP/port đề xuất bên dưới đều **chưa được áp dụng**, chỉ là hướng dẫn để bạn (hoặc Claude ở bước sau) thực hiện.

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

**`index.php`** (dòng 2)
```php
$cdn = "http://192.168.200.129:81";  →  $cdn = "http://71.31.97.241:81";
```

**`reg/api/config.php`** (dòng ~14)
```php
$clientip = 'http://192.168.200.129:81';  →  $clientip = 'http://71.31.97.241:81';
```

**`reg/server.php`** dùng biến `$clientip` từ file trên (đã tự động đổi theo, không cần sửa thêm).

**`reg/platform/*.php`, `gm/*.php`, `gmht/*.php`**: chỉ dùng `127.0.0.1` để kết nối MySQL nội bộ → **giữ nguyên**.

### 3.4. Web server config (phpStudy)

**`phpStudy/PHPTutorial/Apache/conf/httpd.conf`**
```
Listen 81            → giữ nguyên (đã đúng ý định "port 81 cho CDN/client entry")
ServerName localhost  → có thể đổi thành 71.31.97.241 (không bắt buộc, chỉ ảnh hưởng header trả về khi lỗi)
```

**`phpStudy/PHPTutorial/nginx/conf/nginx.conf`**
```
listen 80;            → giữ nguyên (đúng yêu cầu "port 80 cho web")
server_name localhost; → có thể đổi thành 71.31.97.241 (không bắt buộc)
```

> ⚠️ **Điểm quan trọng cần lưu ý:** Hệ thống này dùng **2 port web song song**: `80` (Nginx – trang chủ, đăng ký) và `81` (Apache – tải tài nguyên game + trang loader client, được `index.php`/`reg/api/config.php` trỏ cứng tới). Nếu bạn chỉ mở port 80 mà **không mở port 81**, người chơi sẽ vào được trang chủ nhưng **không tải được resource game / không vào được game** (link `$cdn` và `$clientip` sẽ chết). Có 2 lựa chọn:
> 1. **Giữ nguyên kiến trúc gốc**: mở cả port 80 và 81, trỏ cả 2 về `71.31.97.241`. (khuyến nghị — ít thay đổi nhất, đúng với thiết kế gốc của server)
> 2. **Gộp về 1 port 80 duy nhất**: sửa `$cdn`/`$clientip` thành `http://71.31.97.241` (bỏ `:81`), đồng thời cấu hình lại Apache/Nginx sao cho toàn bộ traffic (kể cả phần hiện đang ở port 81) đi qua port 80 (ví dụ dùng Nginx làm reverse-proxy `location` riêng cho phần CDN, tắt hẳn Apache). Cách này cần sửa thêm nginx.conf và test kỹ, rủi ro cao hơn.

### 3.5. MySQL
`phpStudy/PHPTutorial/MySQL/my.ini` — không có `bind-address` (mặc định nghe mọi interface tuỳ version). **Không cần/không nên** đổi gì ở đây — MySQL chỉ được các service nội bộ (game server, web) gọi qua `127.0.0.1`, **không cần và không nên mở port 3306 ra internet** (rủi ro bảo mật cao — dễ bị brute-force/tấn công database).

---

## 4. Danh sách port cần mở trên firewall của máy chủ (`71.31.97.241`)

### Bắt buộc mở ra internet (public-facing)

| Port | Giao thức | Dịch vụ | Ghi chú |
|---|---|---|---|
| **80** | TCP | Nginx — website chính (trang chủ, đăng ký/đăng nhập) | Theo yêu cầu của bạn |
| **81** | TCP | Apache — CDN tài nguyên game + trang loader client | Bắt buộc nếu giữ kiến trúc gốc (xem mục 3.4) |
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

1. **Trên máy chủ (Windows)**: mở Windows Firewall (hoặc firewall của nhà cung cấp VPS) cho các port bắt buộc ở mục 4 — chiều **Inbound TCP**: 80, 81, 9001, 9009 (và 10101/7001 nếu xác nhận có service lắng nghe).
2. Nếu máy chủ nằm sau NAT/router (không có IP `71.31.97.241` gắn trực tiếp vào máy), cần **port forward** các port trên từ router tới IP LAN thật của máy Windows.
3. Sửa 8 điểm cấu hình liệt kê ở mục 3.1–3.3 (đổi `106.55.254.14` / `192.168.200.129` → `71.31.97.241`, giữ nguyên mọi chỗ `127.0.0.1`).
4. Restart toàn bộ service: chạy `99.停止所有.bat` rồi `2.启动基础服务.bat` → `3.启动 1 区服务.bat` → `4.启动跨服区服务.bat`.
5. Test từ **một máy khác** (ngoài mạng LAN, ví dụ điện thoại 4G):
   - Mở `http://71.31.97.241` → trang chủ web load được (test port 80).
   - Mở `http://71.31.97.241:81` → trang loader game load được, không lỗi tải resource (test port 81).
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
- ⬜ Giai đoạn 3 (panel gameplay chính), Giai đoạn 4 (panel sự kiện), Giai đoạn 5 (server-side language), Giai đoạn 6 (config game) — chưa bắt đầu.

### 8.5. Lưu ý triển khai

- Vì `s1` và `s99` mỗi khu có **bản sao riêng** của `data/language` và `data/config` (không dùng chung), nên dịch xong 1 bên cần **đồng bộ/copy sang bên kia** (hoặc dịch song song cả 2) để 2 khu nhất quán.
- File repo này (Claude Code session) là **bản làm việc**, không tự động đồng bộ với máy chủ Windows thật đang chạy — sau khi dịch xong từng giai đoạn ở đây, cần copy file đã dịch sang đúng đường dẫn tương ứng trên máy chủ thật rồi restart service liên quan để áp dụng.
- Nên giữ 1 file glossary (bảng thuật ngữ) dùng chung xuyên suốt các giai đoạn để thuật ngữ game (tên hệ thống, đơn vị, chức danh...) nhất quán, tránh mỗi giai đoạn dịch một kiểu khác nhau.
