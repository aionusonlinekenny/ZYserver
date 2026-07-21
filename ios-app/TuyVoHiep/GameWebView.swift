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

    // Đổi địa chỉ này nếu server đổi IP/domain sau này.
    private let entryURL = URL(string: "http://71.31.97.241/")!

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        // Cho phép video (vd. nosleep.mp4 nếu web vẫn còn dùng) tự phát câm
        // mà không cần thao tác chạm trước.
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        // Ảnh nền của màn đăng nhập/đăng ký (reg/) không giãn hết chiều cao
        // thật của màn hình (lỗi CSS có sẵn trong trang, chỉ lộ rõ trong app
        // vì app hiển thị toàn màn hình lớn hơn khung nhìn của Safari) - ép
        // ảnh nền luôn phủ kín đúng 100% khung hình bằng CSS chèn thêm, chỉ
        // áp dụng cho đường dẫn "/reg" để không ảnh hưởng màn hình chơi game.
        let fixRegBackgroundJS = """
        (function() {
            function applyFix() {
                if (location.pathname.indexOf('/reg') === -1) return;
                var style = document.createElement('style');
                style.textContent = '#frmLogin img{position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;object-fit:cover!important;z-index:0!important;}';
                (document.head || document.documentElement).appendChild(style);
            }
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', applyFix);
            } else {
                applyFix();
            }
        })();
        """
        let userScript = WKUserScript(source: fixRegBackgroundJS, injectionTime: .atDocumentStart, forMainFrameOnly: true)
        config.userContentController.addUserScript(userScript)

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.scrollView.bounces = false
        webView.scrollView.isScrollEnabled = false
        webView.allowsBackForwardNavigationGestures = false
        webView.isOpaque = false
        webView.backgroundColor = .white
        webView.scrollView.backgroundColor = .white

        // Tắt hẳn việc WKWebView tự chèn khoảng trống theo vùng an toàn
        // (safe area) - áp dụng chung cho mọi trang (kể cả màn chơi game),
        // vì trang không hề khai báo viewport-fit=cover nên không có khái
        // niệm an toàn tai thỏ ở tầng CSS - để tự động (.automatic) chỉ tạo
        // ra khoảng trống lãng phí phía trên mà không giải quyết được gì.
        webView.scrollView.contentInsetAdjustmentBehavior = .never

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

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
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
