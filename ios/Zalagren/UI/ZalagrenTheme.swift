import SwiftUI

enum ZalagrenTheme {
    static let navy = Color(red: 0.03, green: 0.13, blue: 0.27)
    static let green = Color(red: 0.16, green: 0.50, blue: 0.25)
    static let tsavoOrange = Color(red: 0.90, green: 0.38, blue: 0.08)
}
struct ZalagrenMark: View {
    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "circle.hexagongrid.fill").foregroundStyle(ZalagrenTheme.green)
            Text("Zalagren").font(.headline.weight(.semibold)).foregroundStyle(ZalagrenTheme.green)
        }.accessibilityElement(children: .combine).accessibilityLabel("Zalagren")
    }
}
struct ZalagrenCardModifier: ViewModifier {
    func body(content: Content) -> some View {
        if #available(iOS 26.0, *) { content.padding(16).glassEffect(.regular, in: .rect(cornerRadius: 22)) }
        else { content.padding(16).background(.thinMaterial, in: RoundedRectangle(cornerRadius: 18)) }
    }
}
extension View { func zalagrenCard() -> some View { modifier(ZalagrenCardModifier()) } }
