# Zalagren ↔ BeatOne Reconciliation — 2026-10-03

## Purpose
BeatOne is treated as implementation history and runtime reference for current Zalagren. It is not merged as a second platform architecture.

## Canonical ownership
Zalagren remains the sole participant-facing ecosystem identity.

Canonical core:
Identity → Account → Subscription/Entitlement → Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence.

No imported BeatOne module may create a competing identity, account, participant, authorization, event or evidence model.

## Accepted contributions
- Account security: authentication methods, devices, assurance, verification challenges, step-up/re-authentication and compromise/revocation state.
- Participant operations: activity projections, notifications/read state, compliance review state and support requests.
- Protected services: BeatGuardian and BeatUtilities.
- Existing Beat services: BeatPay, BeatRide, BeatFood, BeatHealth, BeatMarket, BeatGenzi and BeatBnB.
- Operational principles: provider IDs are secondary references; providers remain authoritative for regulated outcomes; accepted responses are not automatically completed outcomes; consequential work stays behind Core Authorization; real outcomes require Event/Evidence; communities coordinate local context but do not globally own or disable Zalagren services.

## Explicitly not imported
- BeatOne duplicate BeatCore entity model.
- BeatOne user-facing branding.
- Provider credentials, secrets or production data.
- Fabricated communities, providers, payments, availability or verification.
- Vendor-specific proprietary behavior.
- Runtime code copied merely because it exists in BeatOne.

## Runtime target
Participant-facing Zalagren UI → authenticated Cloudflare Worker → canonical Zalagren application/domain layer → Neon PostgreSQL → external provider boundaries → authoritative Event/Evidence reconciliation.

## UI reconciliation
One Zalagren shell with focused top-level areas: Home, Intelligence, People, Community, Services and Activity. Sub-pages use explicit Back/Close controls. Apple guidance distinguishes top-level tab navigation from toolbar actions and recommends uncluttered navigation controls. citeturn0search8turn0search11

The web and iOS interfaces should share information architecture while adapting to display size. citeturn0search15

## Cloudflare target rules
Use current compatibility dates, generated binding types, direct bindings where applicable, durable background work for retryable tasks, observability, and no request-scoped mutable state in global Worker scope. These are current Cloudflare recommendations and should guide the future Zalagren runtime rather than copying historical implementation blindly. citeturn0search0turn0search2

## Merge invariant
One Zalagren core. Many governed domains. One participant identity. One authorization boundary. One event/evidence truth layer.

## Definition of done
Architecture → Zalagren mapping → implementation → tests → build → deployment → production verification → real workflow verification → security/failure review.

Until complete, a capability remains SUPPORTED or PROPOSED, never VERIFIED.
