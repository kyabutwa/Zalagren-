import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var model: ZalagrenAppModel
    var body: some View {
        VStack(spacing: 18) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Zalagren").font(.caption.weight(.semibold)).foregroundStyle(ZalagrenTheme.green)
                    Text("Good to see you.").font(.largeTitle.bold())
                }
                Spacer()
                Menu {
                    ForEach(model.contexts, id: \.self) { context in
                        Button(context) { model.activeContext = context }
                    }
                } label: { Label(model.activeContext, systemImage: "scope").font(.subheadline.weight(.semibold)) }
                .foregroundStyle(ZalagrenTheme.navy)
            }
            HStack(spacing: 12) {
                HomeAction(title: "Ask", subtitle: "CONSTANTYNA", symbol: "sparkles", color: ZalagrenTheme.tsavoOrange) { model.assistantPresented = true }
                HomeAction(title: "People", subtitle: "Participants", symbol: "person.2", color: ZalagrenTheme.navy) { model.select(.people) }
                HomeAction(title: "Community", subtitle: "Places & services", symbol: "building.2", color: ZalagrenTheme.navy) { model.select(.community) }
            }
            HStack(spacing: 12) {
                CompactAction(title: "Opportunity", symbol: "arrow.up.right") { model.assistantPresented = true }
                CompactAction(title: "Activity", symbol: "clock.arrow.circlepath") { model.select(.activity) }
                CompactAction(title: "Settings", symbol: "gearshape") { model.select(.settings) }
            }
            Spacer(minLength: 0)
        }
        .padding()
        .frame(maxWidth: 760, maxHeight: .infinity, alignment: .top)
    }
}
private struct HomeAction: View {
    let title: String; let subtitle: String; let symbol: String; let color: Color; let action: () -> Void
    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 12) {
                Image(systemName: symbol).font(.title2).foregroundStyle(color)
                Spacer()
                Text(title).font(.headline)
                Text(subtitle).font(.caption).foregroundStyle(.secondary).lineLimit(2)
            }
            .frame(maxWidth: .infinity, minHeight: 132, alignment: .leading)
            .zalagrenCard()
        }.buttonStyle(.plain)
    }
}
private struct CompactAction: View {
    let title: String; let symbol: String; let action: () -> Void
    var body: some View {
        Button(action: action) {
            Label(title, systemImage: symbol).font(.subheadline.weight(.medium)).frame(maxWidth: .infinity, minHeight: 48)
        }.buttonStyle(.bordered)
    }
}
