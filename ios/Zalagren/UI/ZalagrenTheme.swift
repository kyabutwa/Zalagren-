import SwiftUI

enum ZalagrenTheme {
    static let navy = Color(red: 0.03, green: 0.10, blue: 0.18)
    static let green = Color(red: 0.34, green: 0.69, blue: 0.65)
    static let tsavoOrange = Color(red: 0.84, green: 0.75, blue: 0.55)
}
struct RoyalCityMark: View {
    var body: some View {
        HStack(spacing: 8) {
            ZStack {
                RoundedRectangle(cornerRadius: 10).fill(ZalagrenTheme.navy)
                RoundedRectangle(cornerRadius: 10).stroke(Color(red: 0.81, green: 0.73, blue: 0.51).opacity(0.7), lineWidth: 0.8)
                Circle().trim(from: 0.08, to: 0.78).stroke(Color(red: 0.55, green: 0.81, blue: 0.77), style: StrokeStyle(lineWidth: 0.8, lineCap: .round)).rotationEffect(.degrees(-48)).padding(3)
                Text("R").font(.system(size: 17, weight: .medium, design: .serif)).foregroundStyle(.white)
            }.frame(width: 29, height: 29)
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
