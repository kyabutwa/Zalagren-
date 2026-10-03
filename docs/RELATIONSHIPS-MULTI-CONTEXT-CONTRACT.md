# Zalagren Relationships + Multi-Context Contract

**Status:** IMPLEMENTED DOMAIN CONTRACT

## Canonical model
Participant -> Relationship -> Context -> Capability -> Authorization -> Intent -> Proposal -> Action -> Event -> Evidence

## Rules
1. Relationships are first-class records.
2. Roles are relationship types, never separate accounts.
3. Relationships preserve temporal state and can end without deleting the participant.
4. Context is first-class and can bind participant, relationship, community, organization, place, purpose, and time.
5. One participant can hold multiple active relationships and contexts.
6. Multiple active contexts must never be silently collapsed.
7. Consequential operations require explicit context selection when ambiguous.
8. Authorization remains separate and is never inferred solely from relationship or context.
9. Subscription/entitlement is not contextual authority.
10. Relationship termination and context closure affect future resolution while preserving history.
11. Community scope must be evaluated explicitly.
12. Stale/offline/failed resolution must not be represented as verified authorization.

## Example
Participant P can simultaneously be RESIDENT in Community A, OWNER of Property B, WORKER for Organization C, and VISITOR in Community D. This remains one participant with multiple relationships and contexts.

Repository-wide tests, build, deployment, and real workflow verification remain separate acceptance gates.