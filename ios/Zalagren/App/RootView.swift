import SwiftUI

struct RootView: View {
    @EnvironmentObject private var model: ZalagrenAppModel
    var body: some View {
        NavigationStack {
            currentView
                .toolbar {
                    ToolbarItem(placement: .topBarLeading) { ZalagrenMark() }
                    ToolbarItemGroup(placement: .topBarTrailing) {
                        Button { model.searchPresented = true } label: { Image(systemName: "magnifyingglass") }.accessibilityLabel("Search Zalagren")
                        Button { model.assistantPresented = true } label: { Image(systemName: "sparkles") }.accessibilityLabel("Open intelligence")
                        Menu { Button("Account") { model.select(.settings) }; Button("Settings") { model.select(.settings) } } label: { Image(systemName: "ellipsis") }.accessibilityLabel("More")
                    }
                }
        }
        .safeAreaInset(edge: .bottom) { AdaptiveTabBar() }
        .sheet(isPresented: $model.searchPresented) { SearchView() }
        .sheet(isPresented: $model.assistantPresented) { IntelligenceView() }
    }
    @ViewBuilder private var currentView: some View {
        switch model.destination {
        case .home: HomeView()
        case .intelligence: IntelligenceView()
        case .people: PeopleView()
        case .community: CommunityView()
        case .activity: ActivityView()
        case .settings: SettingsView()
        }
    }
}
struct AdaptiveTabBar: View {
    @EnvironmentObject private var model: ZalagrenAppModel
    var body: some View {
        HStack(spacing: 4) {
            tab(.home,"Home","house"); tab(.intelligence,"Intelligence","sparkles"); tab(.people,"People","person.2"); tab(.community,"Community","building.2"); tab(.activity,"Activity","clock.arrow.circlepath")
        }.padding(.horizontal,10).padding(.vertical,8).background(.ultraThinMaterial)
    }
    private func tab(_ d: ZalagrenAppModel.Destination,_ title:String,_ symbol:String)->some View {
        Button { model.select(d) } label: { VStack(spacing:3){ Image(systemName:symbol); Text(title).font(.caption2) }.frame(maxWidth:.infinity).foregroundStyle(model.destination == d ? ZalagrenTheme.navy : .secondary) }.accessibilityLabel(title)
    }
}
