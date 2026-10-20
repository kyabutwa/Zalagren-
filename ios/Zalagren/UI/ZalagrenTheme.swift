import SwiftUI

enum ZalagrenTheme {
    static let navy = Color(red: 0.03, green: 0.10, blue: 0.18)
    static let green = Color(red: 0.34, green: 0.69, blue: 0.65)
    static let tsavoOrange = Color(red: 0.84, green: 0.75, blue: 0.55)
}
struct RoyalCityMark: View {
    var body: some View {
        HStack(spacing: 8) {
            Image("RoyalCityEmblem")
                .resizable()
                .scaledToFit()
                .padding(4)
                .frame(width: 30, height: 30)
                .background(Color(red: 0.95, green: 0.97, blue: 0.95), in: RoundedRectangle(cornerRadius: 9))
            Text("Royal City").font(.headline.weight(.semibold)).foregroundStyle(ZalagrenTheme.green)
        }.accessibilityElement(children: .combine).accessibilityLabel("Royal City")
    }
}
struct ZalagrenCardModifier: ViewModifier {
    func body(content: Content) -> some View {
        if #available(iOS 26.0, *) { content.padding(16).glassEffect(.regular, in: .rect(cornerRadius: 22)) }
        else { content.padding(16).background(.thinMaterial, in: RoundedRectangle(cornerRadius: 18)) }
    }
}
extension View { func zalagrenCard() -> some View { modifier(ZalagrenCardModifier()) } }
