import SwiftUI

@main
struct ZalagrenApp: App {
    @StateObject private var model = ZalagrenAppModel()
    var body: some Scene { WindowGroup { RootView().environmentObject(model) } }
}
