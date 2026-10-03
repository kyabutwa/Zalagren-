# Zalagren Identity, Account, Subscription and Participant Contract

This contract makes the canonical access and participation chain executable at the domain layer:

> Identity → Account → Subscription/Entitlement → Participant

These are distinct objects.

- Identity establishes the person or organization identity.
- Account provides persistent Zalagren digital access.
- Subscription describes the commercial/service relationship.
- Entitlement exposes product-level capability access.
- Participant represents participation in Zalagren.

None of these objects is contextual authorization.

## Invariants

1. One identity is not duplicated for different roles.
2. One account is not duplicated for different roles.
3. Participant roles are represented through relationships and contexts.
4. Subscription never grants contextual authority.
5. Entitlement never grants authority over an arbitrary target.
6. Deactivating a participant does not rewrite identity history.
7. Compromising an account does not destroy identity.
8. Verified identity claims require explicit verification evidence.
9. Time-bounded subscriptions and entitlements fail closed outside their effective periods.

This domain implementation is an in-memory canonical model. Persistence, credential providers, session storage, recovery mechanisms and production identity verification remain separate infrastructure work.
