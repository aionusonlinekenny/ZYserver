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

        // Xoá cache tài nguyên (JS/CSS/hình ảnh...) mỗi lần mở app để luôn tải
        // bản mới nhất từ server - KHÔNG xoá cookie/localStorage nên tài khoản
        // đã đăng nhập/nhớ mật khẩu vẫn giữ nguyên.
        let cacheTypes: Set<String> = [
            WKWebsiteDataTypeDiskCache,
            WKWebsiteDataTypeMemoryCache,
            WKWebsiteDataTypeOfflineWebApplicationCache,
        ]
        WKWebsiteDataStore.default().removeData(ofTypes: cacheTypes, modifiedSince: .distantPast) {
            var request = URLRequest(url: self.entryURL)
            request.cachePolicy = .reloadIgnoringLocalCacheData
            webView.load(request)
        }
        return webView
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
