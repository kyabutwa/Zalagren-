# BeatOne → Zalagren Migration Integration — 2026-10-03

BeatOne was reviewed as a source of implemented/runtime lessons. Zalagren remains the single canonical architecture.

## Migrated into Zalagren

- Legal identity normalization and document validation.
- Access lifecycle and time-bounded access checks.
- Provider-neutral integration with explicit UNKNOWN/reconciliation state.
- Authorized operation validation.
- Action → Event → Evidence execution vocabulary.
- Request/correlation identifiers.
- Experience states for pending, confirmed, unauthorized and failure paths.

## Rejected as duplicate architecture

The competing BeatCore entity model, duplicate identity/account/participant/relationship/context/capability/authorization models, BeatOne sessions/credentials, production data, secrets, provider records and historical branding were not copied.

## Canonical ownership

Zalagren core owns identity, account, subscription, participant, relationship, context, capability, authorization, governance, action/event/evidence and services. BeatOne contributes proven implementation patterns and runtime lessons only.

## Merge invariant

Identity → Account → Participant → Relationship/Context → Capability → Authorization → Intent/Proposal → Action → Event → Evidence.

External integrations may return ACCEPTED, REJECTED or UNKNOWN. UNKNOWN requires reconciliation and never becomes silent success.

## Definition of done

Typecheck → tests → build → deployment → production verification → real workflow verification.


Verification note: CI, Web and iOS workflows must all pass on the same migration commit before release.
