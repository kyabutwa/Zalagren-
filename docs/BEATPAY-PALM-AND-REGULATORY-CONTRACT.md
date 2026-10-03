# BeatPay Palm Payment & Regulatory Contract

Status: SUPPORTED / architecture implemented; not yet legally or operationally VERIFIED.

## Product behavior

BeatPay is designed to let a participant initiate a payment inside the Zalagren app by intentionally presenting an enrolled palm to a compatible camera/scanner. The palm is an authentication/authorization factor; it is not the payment rail.

Canonical flow:

Identity → Account → Participant → voluntary palm enrollment → palm credential reference
→ merchant/order context → payment intent → Core authorization
→ intentional palm presentation → liveness + biometric match
→ BeatPay authorization → Daraja/bank rail
→ authoritative provider result → Event → Evidence → reconciliation.

The Zalagren UI remains the participant experience. External payment rails remain external trust domains.

## Critical security boundary

A palm match NEVER means "payment succeeded."

A palm match can establish only that the enrolled participant intentionally passed the configured biometric step. The existing Core Authorization must independently permit the specific payment intent, amount, currency, merchant/context and time window.

No payment provider response may be converted to SUCCEEDED without authoritative external evidence.

## Biometric data architecture

Zalagren should not persist raw palm photographs, raw biometric templates, or biometric embeddings in the BeatPay payment domain.

Store only:
- opaque palm credential ID
- participant ID
- enrollment status
- consent/legal-basis reference
- biometric-provider/device method
- enrollment/revocation timestamps
- security/audit references.

Prefer on-device processing where technically possible. If a biometric processor is required, it must be a separately governed processor/trust domain with documented security, retention, deletion, transfer and incident obligations.

Enrollment and use must be voluntary and revocable. A non-biometric fallback must remain available.

## MainMoney/US reference analysis

MainMoney publicly describes a DRC biometric payment product using palm-print payment, mobile-money/bank aggregation and payment without entering a mobile-money PIN. This is a product reference, not proof that its architecture or regulatory treatment can be copied into Kenya.

Amazon One demonstrates a comparable palm-based identification/payment pattern and an in-app enrollment model. Amazon states that its system used palm/vein signatures rather than raw palm images for identity matching and emphasized intentional user gestures. Amazon One was later reported as being discontinued in 2026, so Zalagren must not depend on Amazon One availability.

Zalagren therefore adopts the useful interaction principle—intentional palm presentation inside a seamless payment journey—without copying a vendor-specific architecture.

## Kenya regulatory boundary

Biometric data is sensitive personal data under Kenya's Data Protection framework. BeatPay must therefore be designed around lawful purpose, transparency, minimization, security, retention/deletion, data-subject rights, appropriate controller/processor arrangements, and applicable cross-border transfer safeguards.

Before production biometric enrollment, Zalagren must complete an appropriate Data Protection Impact Assessment and confirm ODPC registration/controller-processor obligations applicable to the actual operating entities and processing activities.

Payment activity must remain within the licensing/authorization boundary applicable under Kenya's National Payment System framework. Zalagren should initially operate as a technology/orchestration layer using appropriately authorized payment providers, unless and until Zalagren itself obtains any authorization required for the activities it performs.

The 2026 National Payment System Bill currently published by CBK is a draft proposal and must not be treated as enacted law. Production compliance must be checked against the law and regulations actually in force at launch.

## Non-negotiable rules

1. Palm enrollment never creates Core authorization.
2. Palm recognition never proves funds moved.
3. No raw biometric material in payment objects, logs, analytics or events.
4. No silent biometric enrollment.
5. No mandatory palm-only payment path.
6. No payment without a valid Core authorization.
7. No provider success without authoritative evidence.
8. No invented provider, transaction, balance, receipt or availability.
9. Every enrollment, authorization, submission, callback, reversal and revocation is auditable.
10. Biometric failure must fail closed and provide a safe alternative.

## Production gate

BeatPay Palm can become VERIFIED only after:
- legal/regulatory review for the actual operating model
- ODPC/DPIA work completed
- biometric processor/device security review
- enrollment + revocation verified
- liveness/anti-spoofing verified
- Core authorization gate verified
- Daraja sandbox integration verified
- callback and reconciliation verified
- failure/reversal/refund verified
- controlled production transaction verified
- evidence/audit trail verified
- participant-facing fallback verified.
