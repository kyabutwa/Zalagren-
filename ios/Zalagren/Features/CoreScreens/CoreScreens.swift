import SwiftUI

struct IntelligenceView: View {
    @State private var prompt = ""
    @State private var listening = false
    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                ScrollView {
                    VStack(alignment: .leading, spacing: 16) {
                        Text("CONSTANTYNA").font(.caption.bold()).foregroundStyle(ZalagrenTheme.tsavoOrange)
                        Text("Governed Zalagren intelligence").font(.title2.bold())
                        MessageCard(title: "CONSTANTYNA", text: "Explain Zalagren, research possibilities, compare options, propose useful solutions and services, and guide authorized actions. I do not grant authority or expose internal system code.")
                        MessageCard(title: "GENESIS", text: "Turn observations and context into evidence-backed proposals. Protected execution still passes through Core authorization.")
                    }.padding()
                }
                HStack(alignment: .bottom, spacing: 8) {
                    TextField("Ask anything about Zalagren…", text: $prompt, axis: .vertical)
                        .padding(12).background(.quaternary, in: RoundedRectangle(cornerRadius: 18))
                    Button { listening.toggle() } label: {
                        Image(systemName: listening ? "waveform.circle.fill" : "mic.circle.fill")
                            .font(.title).foregroundStyle(listening ? ZalagrenTheme.tsavoOrange : ZalagrenTheme.navy)
                    }.accessibilityLabel(listening ? "Stop speaking" : "Speak to CONSTANTYNA")
                    Button {} label: { Image(systemName: "arrow.up.circle.fill").font(.title).foregroundStyle(ZalagrenTheme.navy) }
                        .disabled(prompt.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                        .accessibilityLabel("Send")
                }.padding().background(.bar)
            }.navigationTitle("Intelligence")
        }
    }
}
struct MessageCard: View {
    let title: String
    let text: String
    var body: some View {
        VStack(alignment: .leading, spacing: 7) {
            Text(title).font(.caption.bold()).foregroundStyle(ZalagrenTheme.navy)
            Text(text)
        }.frame(maxWidth: .infinity, alignment: .leading).zalagrenCard()
    }
}
struct PeopleView: View {
    var body: some View {
        List {
            Section("People") {
                Label("Participants", systemImage: "person.2")
                Label("Relationships", systemImage: "link")
                Label("Contexts", systemImage: "scope")
                Label("Invitations", systemImage: "person.badge.plus")
            }
            Section("Capabilities") {
                Label("Services", systemImage: "square.grid.2x2")
                Label("Opportunities", systemImage: "sparkles")
            }
        }.navigationTitle("People")
    }
}
struct CommunityView: View {
    var body: some View {
        List {
            Section("Community") {
                Label("Overview", systemImage: "building.2")
                Label("People", systemImage: "person.2")
                Label("Places", systemImage: "map")
                Label("Units", systemImage: "square.split.2x2")
            }
            Section("Operations") {
                Label("Providers", systemImage: "briefcase")
                Label("Services", systemImage: "wrench.and.screwdriver")
                Label("Requests", systemImage: "arrow.triangle.2.circlepath")
                Label("Governance", systemImage: "checkmark.seal")
            }
        }.navigationTitle("Community")
    }
}
struct ActivityView: View {
    var body: some View {
        List {
            Section("Recent") {
                Text("No verified activity yet").font(.headline)
                Text("Real events appear after backend verification.").foregroundStyle(.secondary)
            }
            Section("Truth states") {
                Label("Verified", systemImage: "checkmark.seal")
                Label("Supported", systemImage: "checkmark.circle")
                Label("Proposed", systemImage: "lightbulb")
                Label("Failed", systemImage: "xmark.circle")
            }
        }.navigationTitle("Activity")
    }
}
struct SettingsView: View {
    @AppStorage("voiceEnabled") private var voiceEnabled = false
    @AppStorage("autoPlayResponses") private var autoPlay = false
    var body: some View {
        Form {
            Section("Intelligence voice") {
                Toggle("Voice enabled", isOn: $voiceEnabled)
                Toggle("Speak responses automatically", isOn: $autoPlay).disabled(!voiceEnabled)
            }
            Section("Security & privacy") {
                Text("Account security")
                Text("Privacy")
                Text("Devices")
            }
            Section("Governance") {
                Text("Conversation is not authorization.")
                Text("The iOS client cannot grant protected authority.")
            }
        }.navigationTitle("Settings")
    }
}
struct SearchView: View {
    @State private var query = ""
    var body: some View {
        NavigationStack {
            List {
                Text(query.isEmpty ? "Search people, communities, places, services, opportunities and activity." : "Backend search connection pending.")
                    .foregroundStyle(.secondary)
            }.searchable(text: $query, prompt: "Search Zalagren").navigationTitle("Search")
        }
    }
}
