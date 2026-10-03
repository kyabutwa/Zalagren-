# BeatPay Phone Scanner Contract

## Purpose

BeatPay is designed so the **service provider's ordinary phone can be the scanner**. No dedicated palm reader is required for the current product.

The interaction is:

Participant presents hand → provider opens BeatPay scanner in Zalagren → provider phone camera captures the palm → phone-side biometric verification/liveness layer recognizes the enrolled participant → Zalagren returns an opaque participant/credential reference → Core authorization is checked → BeatPay executes the authorized payment flow.

## Important boundary

Recognition is not payment success.

A successful palm recognition may establish that an enrolled participant presented a live hand to the provider-side phone scanner. It does not independently authorize an amount, merchant, service, or payment rail.

The Core authorization must still match the participant, payment intent, amount, currency, merchant/service context and validity window before BeatPay may submit to an external payment rail.

## Phone-only design

The scanner surface is an in-app camera experience. The provider does not need a special scanner device.

The participant does not need to transfer a photo or biometric file to the provider. The capture/verification boundary should return only the minimum opaque references and assurance result required by Zalagren.

The current contract deliberately does not claim that a normal phone camera has the same biometric assurance as specialized palm/vein hardware. The verification implementation must establish adequate liveness and matching assurance before production use.

## Security and privacy

- Do not persist raw palm images, biometric templates or embeddings in BeatPay payment-domain records.
- Use voluntary enrollment and revocation.
- Keep a non-biometric payment fallback.
- Bind recognition to the enrolled participant and credential.
- Treat provider phones as untrusted client devices until authenticated and authorized by Zalagren.
- Never allow a scanner result to create its own payment authorization.
- Do not log raw biometric material.

## Provider experience

1. Provider opens the Zalagren service/payment scanner.
2. Provider selects or receives the service/order/payment context.
3. Participant presents their hand to the provider phone.
4. The phone camera captures the hand inside Zalagren.
5. Liveness + biometric verification runs through the approved verification boundary.
6. Zalagren recognizes the participant using an opaque credential reference.
7. Core authorization is checked.
8. BeatPay submits only the authorized payment intent to the configured payment rail.
9. Authoritative provider result creates Event/Evidence.
10. The provider sees the final truth state: pending, paid, failed, reversed, refunded, etc.

## Truth state

This feature is **SUPPORTED**, not VERIFIED.

Production verification still requires approved biometric technology, security/privacy assessment, Kenyan legal/compliance review, real payment-provider integration, callback/reconciliation testing, controlled transactions and evidence review.
