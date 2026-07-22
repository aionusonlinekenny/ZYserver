import SwiftUI
import WebKit

/// Nhúng WKWebView trỏ vào trang gốc của site. Trang gốc (`index.php`) tự
/// động chuyển hướng tới `reg/` (màn đăng nhập/đăng ký) khi chưa có tài
/// khoản trong URL - giữ nguyên luồng đăng nhập/đăng ký web hiện có, không
/// cần viết lại bằng Swift. Sau khi đăng nhập/đăng ký thành công,
/// `reg/server.php` sẽ tự chuyển tiếp vào game (`index.php?uid=...&sign=...`).
struct GameWebView: UIViewRepresentable {
    @Binding var isLoading: Bool
    @Binding var loadFailed: Bool
    @Binding var isRegPage: Bool

    // Đổi địa chỉ này nếu server đổi IP/domain sau này.
    private let entryURL = URL(string: "http://71.31.97.241/")!
    // File nhỏ chứa 1 dòng version do người quản trị cập nhật mỗi khi
    // deploy code/tài nguyên mới - KHÔNG phải file resource/version.txt
    // (file đó là bảng hash toàn bộ tài nguyên game, rất nặng).
    private let versionURL = URL(string: "http://71.31.97.241/version.txt")!
    private static let savedVersionKey = "TuyVoHiep.clientVersion"

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        // Cho phép video (vd. nosleep.mp4 nếu web vẫn còn dùng) tự phát câm
        // mà không cần thao tác chạm trước.
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.scrollView.bounces = false
        webView.scrollView.isScrollEnabled = false
        webView.allowsBackForwardNavigationGestures = false
        webView.isOpaque = false
        webView.backgroundColor = .white
        webView.scrollView.backgroundColor = .white

        checkVersionAndLoad(webView)
        return webView
    }

    // So sánh version.txt trên server với bản đã lưu trong UserDefaults lần
    // mở app trước - CHỈ xoá cache và tải lại toàn bộ khi 2 bản khác nhau
    // (hoặc lần đầu mở app, chưa có bản lưu). Nếu trùng version thì tải bình
    // thường, tận dụng cache có sẵn, mở app nhanh hơn nhiều so với việc lúc
    // nào cũng xoá cache. Nếu không lấy được version.txt (mất mạng, server
    // lỗi...) thì cũng tải bình thường, không ép xoá cache.
    private func checkVersionAndLoad(_ webView: WKWebView) {
        var request = URLRequest(url: versionURL)
        request.cachePolicy = .reloadIgnoringLocalCacheData
        request.timeoutInterval = 5
        URLSession.shared.dataTask(with: request) { data, _, _ in
            let serverVersion = data
                .flatMap { String(data: $0, encoding: .utf8) }?
                .trimmingCharacters(in: .whitespacesAndNewlines)
            let savedVersion = UserDefaults.standard.string(forKey: Self.savedVersionKey)

            DispatchQueue.main.async {
                guard let serverVersion, !serverVersion.isEmpty else {
                    // Không lấy được version.txt - tải bình thường, không xoá cache.
                    webView.load(URLRequest(url: self.entryURL))
                    return
                }
                if serverVersion == savedVersion {
                    webView.load(URLRequest(url: self.entryURL))
                } else {
                    self.clearCacheAndLoad(webView, newVersion: serverVersion)
                }
            }
        }.resume()
    }

    private func clearCacheAndLoad(_ webView: WKWebView, newVersion: String) {
        // Xoá cache tài nguyên (JS/CSS/hình ảnh...) để tải bản mới từ server -
        // KHÔNG xoá cookie/localStorage nên tài khoản đã đăng nhập/nhớ mật
        // khẩu vẫn giữ nguyên.
        let cacheTypes: Set<String> = [
            WKWebsiteDataTypeDiskCache,
            WKWebsiteDataTypeMemoryCache,
            WKWebsiteDataTypeOfflineWebApplicationCache,
        ]
        WKWebsiteDataStore.default().removeData(ofTypes: cacheTypes, modifiedSince: .distantPast) {
            var request = URLRequest(url: self.entryURL)
            request.cachePolicy = .reloadIgnoringLocalCacheData
            webView.load(request)
            UserDefaults.standard.set(newVersion, forKey: Self.savedVersionKey)
        }
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, WKNavigationDelegate {
        let parent: GameWebView
        init(_ parent: GameWebView) {
            self.parent = parent
        }

        // Màn đăng nhập/đăng ký (reg/) nền trắng, vào trong game (index.php)
        // nền đen - chỉ đổi màu nền, không đụng gì tới contentInsetAdjustmentBehavior.
        private func updateBackgroundColor(for webView: WKWebView) {
            let isReg = webView.url?.path.contains("/reg") ?? true
            parent.isRegPage = isReg
            let color: UIColor = isReg ? .white : .black
            webView.backgroundColor = color
            webView.scrollView.backgroundColor = color
        }

        func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
            updateBackgroundColor(for: webView)
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            updateBackgroundColor(for: webView)
            parent.isLoading = false
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            parent.isLoading = false
            parent.loadFailed = true
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            parent.isLoading = false
            parent.loadFailed = true
        }
    }
}
