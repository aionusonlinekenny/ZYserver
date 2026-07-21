import SwiftUI
import UIKit

struct ContentView: View {
    @State private var isLoading = true
    @State private var loadFailed = false
    @State private var reloadToken = UUID()
    @State private var keepAwakeTimer: Timer?

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()

            GameWebView(isLoading: $isLoading, loadFailed: $loadFailed)
                .id(reloadToken)
                .ignoresSafeArea()

            if isLoading && !loadFailed {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .scaleEffect(1.5)
            }

            if loadFailed {
                VStack(spacing: 16) {
                    Text("Không thể kết nối tới máy chủ")
                        .foregroundColor(.white)
                    Button("Thử lại") {
                        loadFailed = false
                        isLoading = true
                        reloadToken = UUID()
                    }
                    .padding(.horizontal, 24)
                    .padding(.vertical, 10)
                    .background(Color.white.opacity(0.15))
                    .foregroundColor(.white)
                    .cornerRadius(8)
                }
            }
        }
        .statusBar(hidden: true)
        .onAppear {
            // Đặt lại isIdleTimerDisabled liên tục thay vì chỉ 1 lần - WKWebView
            // trên iOS đôi khi âm thầm reset lại giá trị này, đặt lại định kỳ
            // để đảm bảo không bị ghi đè.
            UIApplication.shared.isIdleTimerDisabled = true
            keepAwakeTimer = Timer.scheduledTimer(withTimeInterval: 15, repeats: true) { _ in
                UIApplication.shared.isIdleTimerDisabled = true
            }
        }
        .onDisappear {
            keepAwakeTimer?.invalidate()
            keepAwakeTimer = nil
        }
    }
}

#Preview {
    ContentView()
}
