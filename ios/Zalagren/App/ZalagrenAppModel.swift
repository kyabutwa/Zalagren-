import SwiftUI

@MainActor final class ZalagrenAppModel: ObservableObject {
    enum Destination: Hashable { case home, intelligence, people, community, activity, settings }
    @Published var destination: Destination = .home
    @Published var activeContext = "Personal"
    @Published var searchPresented = false
    @Published var assistantPresented = false
    @Published var voiceEnabled = false
    let contexts = ["Personal", "Community", "Work", "Service", "Visitor"]
    func select(_ destination: Destination) { self.destination = destination }
}
