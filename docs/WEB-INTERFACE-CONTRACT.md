# Zalagren Web Interface Contract

## Purpose
The web surface is the first inspectable Zalagren product surface while native iOS signing is pending.

## Required experience
- Works on iPhone Safari and desktop browsers.
- Uses responsive, safe-area-friendly layout.
- Mobile navigation remains available without requiring horizontal desktop navigation.
- Primary ecosystem areas are directly discoverable: Home, Intelligence, People, Community, Services, Activity.
- Explains the canonical Zalagren model without requiring authentication.
- Does not fabricate live providers, payments, bookings, residents, authorizations, credentials or successful transactions.

## Truth boundary
This surface is an inspection/product-explanation interface until connected to authenticated Zalagren runtime state.

Truth labels:
- VERIFIED — implemented, tested, deployed and production-verified.
- SUPPORTED — architecture/integration support exists; production verification remains.
- PROPOSED — designed but not implemented.
- FAILED — attempted and currently not working.

## Governance boundary
The interface must preserve:
- Authentication != Authorization.
- Subscription != Authorization.
- Intelligence != Authority.
- No Authorization -> No consequential Action.

CONSTANTYNA and GENESIS may explain, research, compare and propose within their governed scope. The interface must never imply that intelligence can grant itself authority.

## Acceptance
Before native iOS distribution spending:
1. GitHub Pages deployment is green.
2. Public web surface loads.
3. iPhone Safari inspection is possible.
4. Core navigation and ecosystem sections are readable.
5. Mobile layout has no intentional horizontal page overflow.
6. No fake production state is presented.


## 2026-10-04 visual contract
- Canonical header logo: IMG_1505 only.
- Navy canvas uses white text; green is reserved for orientation/titles/status accents.
- White surfaces use Zalagren navy text.
