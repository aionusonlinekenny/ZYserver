# App Android cho Túy Võ Hiệp H5 (wrapper WebView)

Giống hệt cách tiếp cận bên `ios-app/`: app chỉ có 1 màn hình `WebView`
nhúng thẳng trang web game hiện có (`http://71.31.97.241/`). Toàn bộ luồng
đăng nhập/đăng ký, gameplay, socket... chạy y hệt như trên trình duyệt -
không viết lại bằng Kotlin, chỉ khác:

1. Màn hình không tự tắt khi app đang mở (`FLAG_KEEP_SCREEN_ON`).
2. Toàn màn hình, ẩn thanh trạng thái/thanh điều hướng.
3. Nút Back của Android lùi lại trang trong game thay vì thoát app ngay.

## Yêu cầu

- Android Studio (bạn dùng bản Quail 2 | 2026.1.2 hoặc mới hơn đều được).
- 1 điện thoại Android (bật **Cài đặt → Giới thiệu điện thoại → bấm liên
  tục "Số bản dựng"/"Build number" 7 lần** để mở Tuỳ chọn nhà phát triển →
  bật **Gỡ lỗi USB**), hoặc dùng máy ảo (Emulator) có sẵn trong Android
  Studio.

## Các bước tạo project

1. Mở Android Studio → **New Project**.
2. Chọn template **"Empty Views Activity"** (LƯU Ý: không chọn loại có chữ
   "Compose" - project này dùng XML layout cổ điển cho đơn giản, dễ dán
   code. Nếu bản Android Studio của bạn không còn tuỳ chọn "Views" mà chỉ
   có Compose mặc định, báo lại để tôi viết lại bằng Jetpack Compose).
3. Điền:
   - Name: `TuyVoHiep`
   - Package name: `com.tuyvohiep.client` (khớp với dòng `package` sẵn có
     trong file `MainActivity.kt` ở thư mục này - nếu bạn đặt tên khác thì
     nhớ sửa lại dòng `package` đầu file cho khớp)
   - Language: **Kotlin**
   - Minimum SDK: mặc định (API 24 trở lên là đủ)
4. Sau khi Android Studio tạo xong project và đồng bộ Gradle lần đầu, mở
   các file sau và **thay toàn bộ nội dung**:
   - `app/src/main/java/com/tuyvohiep/client/MainActivity.kt` ← dán nội
     dung file `MainActivity.kt` trong thư mục này.
   - `app/src/main/res/layout/activity_main.xml` ← dán nội dung file
     `activity_main.xml` trong thư mục này.
5. Mở `app/src/main/AndroidManifest.xml` (file có sẵn), làm theo hướng dẫn
   trong `manifest-additions.xml` (chỉ cần THÊM 3 dòng vào đúng vị trí,
   không thay cả file).
6. Bấm **Sync Project with Gradle Files** (biểu tượng con voi/elephant
   trên thanh công cụ) nếu Android Studio không tự đồng bộ.

## Build & cài lên điện thoại

- **Cách nhanh nhất**: cắm điện thoại qua cáp USB (đã bật Gỡ lỗi USB),
  chọn tên máy ở thanh thiết bị trên cùng Android Studio, bấm ▶ (Run) hoặc
  `Shift+F10`.
- **Xuất file APK để cài thủ công**: menu **Build → Build Bundle(s) /
  APK(s) → Build APK(s)**, xong bấm "locate" để tìm file `.apk`, chép qua
  điện thoại (email/USB/Drive...) rồi mở file đó trên máy để cài (cần bật
  "Cài đặt ứng dụng không rõ nguồn gốc" cho trình duyệt/trình quản lý file
  bạn dùng để mở file APK).

Khác với iOS, Android KHÔNG yêu cầu tài khoản trả phí hay giới hạn 7 ngày -
app cài 1 lần là dùng được lâu dài, không cần build lại định kỳ.

## Nếu Gradle báo lỗi thiếu thư viện khi build

Môi trường viết code này không có Android SDK nên KHÔNG build-test thử
được - nếu Android Studio báo đỏ dòng `onBackPressedDispatcher`/
`addCallback` hoặc `WindowCompat`/`WindowInsetsControllerCompat`, mở file
`app/build.gradle.kts` (hoặc `build.gradle` nếu project dùng Groovy), thêm
vào khối `dependencies { ... }`:

```kotlin
implementation("androidx.activity:activity-ktx:1.9.0")
implementation("androidx.core:core-ktx:1.13.1")
```

(2 dòng này thường đã có sẵn trong template mặc định của Android Studio,
chỉ cần thêm nếu bị báo lỗi thiếu).

## Đổi địa chỉ server sau này

Sửa 1 dòng trong `MainActivity.kt`:

```kotlin
private val entryUrl = "http://71.31.97.241/"
```

## Giới hạn đã biết

- `android:usesCleartextTraffic="true"` là bắt buộc vì server chạy `http://`
  (chưa có SSL) - thiếu dòng này trong Manifest thì WebView sẽ không tải
  được trang, hiện màn "Không thể kết nối tới máy chủ".
- Cũng như bên iOS, hướng WebView-wrapper này không phù hợp để phát hành
  chính thức lên Google Play nếu không có thêm giá trị gia tăng ngoài việc
  hiển thị lại trang web - chỉ phù hợp cài nội bộ/chia sẻ file APK trực
  tiếp.
