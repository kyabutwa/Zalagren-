import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var model: ZalagrenAppModel
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Menu {
                    ForEach(model.contexts, id: \.self) { context in
                        Button(context) { model.activeContext = context }
                    }
                } label: {
                    Label(model.activeContext, systemImage: "scope")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(ZalagrenTheme.navy)
                }

                VStack(alignment: .leading, spacing: 6) {
                    Text("Good to see you.").font(.largeTitle.bold())
                    Text("People, places, needs, capabilities and authorized possibilities in one Zalagren experience.")
                        .foregroundStyle(.secondary)
                }

                Button { model.assistantPresented = true } label: {
                    HStack(spacing: 14) {
                        Image(systemName: "sparkles").font(.title2).foregroundStyle(ZalagrenTheme.tsavoOrange)
                        VStack(alignment: .leading) {
                            Text("Ask Zalagren").font(.headline)
                            Text("Explain • research • compare • propose • guide")
                                .font(.subheadline).foregroundStyle(.secondary)
                        }
                        Spacer()
                        Image(systemName: "chevron.right").foregroundStyle(.secondary)
                    }
                    .zalagrenCard()
                }
                .buttonStyle(.plain)

                Text("Your world").font(.title3.bold())
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    tile("People", "person.2", .people)
                    tile("Communities", "building.2", .community)
                    tile("Activity", "clock.arrow.circlepath", .activity)
                    tile("Settings", "gearshape", .settings)
                }

                Text("Useful possibilities").font(.title3.bold())
                HStack(alignment: .top, spacing: 14) {
                    Image(systemName: "sparkles").foregroundStyle(ZalagrenTheme.tsavoOrange)
                    VStack(alignment: .leading) {
                        Text("Find an opportunity").font(.headline)
                        Text("Jobs, services, partnerships, community needs and useful next steps.")
                            .font(.subheadline).foregroundStyle(.secondary)
                    }
                }
                .zalagrenCard()
            }
            .padding()
        }
    }

    private func tile(_ title: String, _ symbol: String, _ destination: ZalagrenAppModel.Destination) -> some View {
        Button { model.select(destination) } label: {
            VStack(alignment: .leading, spacing: 12) {
                Image(systemName: symbol).font(.title2).foregroundStyle(ZalagrenTheme.navy)
                Text(title).font(.headline).foregroundStyle(.primary)
            }
            .frame(maxWidth: .infinity, minHeight: 100, alignment: .leading)
            .zalagrenCard()
        }
        .buttonStyle(.plain)
    }
}
