# App iOS cho Túy Võ Hiệp H5 (wrapper WKWebView)

App này chỉ đơn giản là 1 màn hình `WKWebView` nhúng thẳng trang web game
hiện có (`http://71.31.97.241/`). Toàn bộ luồng đăng nhập/đăng ký, gameplay,
socket... vẫn chạy y hệt như trên trình duyệt Safari - không có logic
native nào can thiệp vào, chỉ khác 2 điểm:

1. Màn hình không bao giờ tự tắt khi đang mở app (`isIdleTimerDisabled`) -
   thay thế đáng tin cậy hơn cho mẹo "video câm" đang dùng trên web
   (xem mục 196 trong `claude.md`).
2. Trải nghiệm toàn màn hình, không có thanh địa chỉ/thanh công cụ Safari.

## Yêu cầu

- macOS + Xcode (bản mới nhất trên App Store, miễn phí).
- 1 Apple ID bất kỳ (dùng để cài app lên máy qua sideload, miễn phí -
  app sẽ cần mở lại chữ ký mỗi 7 ngày trừ khi bạn có tài khoản Apple
  Developer trả phí 99$/năm).
- iPhone thật, cắm cáp vào Mac (hoặc cài qua mạng LAN nếu đã từng ghép đôi).

## Các bước tạo project

1. Mở Xcode → **File → New → Project**.
2. Chọn **iOS → App** → Next.
3. Điền:
   - Product Name: `TuyVoHiep` (hoặc tên bạn muốn)
   - Team: chọn Apple ID của bạn (nếu chưa có, vào Xcode → Settings →
     Accounts để thêm)
   - Interface: **SwiftUI**
   - Language: **Swift**
   - Bỏ chọn Core Data / Tests nếu không cần.
4. Lưu project vào máy, Xcode sẽ tự tạo sẵn `TuyVoHiepApp.swift` và
   `ContentView.swift`.
5. **Xoá nội dung** 2 file đó đi, rồi copy đè nội dung từ 3 file trong thư
   mục này vào đúng vị trí (kéo thả 3 file `.swift` trong thư mục
   `TuyVoHiep/` này vào Xcode, chọn "Copy items if needed", hoặc copy/paste
   nội dung thủ công):
   - `TuyVoHiepApp.swift`
   - `ContentView.swift`
   - `GameWebView.swift`
6. Mở **Info** tab của target (bấm vào tên project ở panel bên trái → chọn
   target → tab "Info"), thêm các key trong file `Info-additions.plist`
   (bấm chuột phải vào danh sách key có sẵn → "Add Row", hoặc mở
   Info.plist ở dạng Source Code và dán trực tiếp nội dung file đó vào
   trong cặp thẻ `<dict>...</dict>` gốc).
7. (Tuỳ chọn) Đổi App Icon: vào `Assets.xcassets → AppIcon`, kéo ảnh logo
   game vào các ô kích thước tương ứng.

## Build & cài lên iPhone

1. Cắm iPhone vào Mac bằng cáp, mở khoá máy, chọn "Trust this computer"
   nếu được hỏi.
2. Trong Xcode, ở thanh trên cùng chọn thiết bị đích = tên iPhone của bạn
   (thay vì Simulator).
3. Bấm nút ▶ (Run) hoặc `Cmd+R`.
4. Lần đầu chạy, trên iPhone vào **Cài đặt → Cài đặt chung → VPN & Quản lý
   thiết bị → [Apple ID của bạn]** → bấm "Tin cậy" app vừa cài (bắt buộc vì
   app chưa qua App Store).
5. Mở app, xác nhận vào đúng màn đăng nhập/đăng ký, đăng nhập thử 1 tài
   khoản để kiểm tra toàn bộ luồng game chạy bình thường.

Với Apple ID miễn phí, app chỉ chạy được 7 ngày rồi cần mở Xcode chạy lại
bước 3 để "làm mới" chữ ký (không cần làm lại từ đầu, chỉ cần Run lại).

## Đổi địa chỉ server sau này

Nếu server đổi IP/domain, chỉ cần sửa 1 dòng trong `GameWebView.swift`:

```swift
private let entryURL = URL(string: "http://71.31.97.241/")!
```

## Giới hạn đã biết

- Vì server chạy `http://` (không có SSL/https), Apple yêu cầu khai báo
  ngoại lệ `NSAllowsArbitraryLoads` trong Info.plist (đã có sẵn trong
  `Info-additions.plist`) - nếu thiếu, app sẽ không tải được trang web.
- Nếu muốn phát hành lên App Store chính thức, Apple thường sẽ từ chối app
  chỉ là 1 WebView đơn thuần không có giá trị gia tăng - hướng này chỉ phù
  hợp để cài nội bộ/sideload, không phải để public lên store.
