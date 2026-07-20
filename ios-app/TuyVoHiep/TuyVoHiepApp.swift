import SwiftUI
import UIKit

/// Giữ màn hình luôn sáng trong lúc app đang chạy (thay thế hoàn toàn cho
/// mẹo "video câm" dùng trên web - trong app native có thể tắt idle timer
/// trực tiếp, đáng tin cậy hơn nhiều so với Screen Wake Lock API trên web.
class AppDelegate: NSObject, UIApplicationDelegate {
    func applicationDidBecomeActive(_ application: UIApplication) {
        application.isIdleTimerDisabled = true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        application.isIdleTimerDisabled = false
    }
}

@main
struct TuyVoHiepApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
