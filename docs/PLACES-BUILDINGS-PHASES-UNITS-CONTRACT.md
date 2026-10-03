# Places / Buildings / Phases / Units Contract

## Purpose

This contract establishes the canonical physical-place model for Zalagren without turning Zalagren into a property-management product.

## Canonical entities

- **Place** — a physical or service location and the base spatial entity.
- **Phase** — a sequenced development/operational phase within a place.
- **Building** — a physical building associated with a place and optionally a phase.
- **Unit** — an individually addressable/assignable space within a building.

The canonical hierarchy is:

**Place/Site → Phase → Building → Unit**

The model may also represent a standalone place that has no building or phase.

## Terminology

“Apartment” remains available as a **CommunityType** when describing an apartment-style community.

“Unit” is the canonical entity name for an individual dwelling/space. It must not be replaced by a role-specific account or participant type.

## Invariants

1. Place identity is separate from participant identity.
2. A building is not a participant.
3. A phase is not a participant or role.
4. A unit is not a participant or account.
5. People relate to places through Relationship and Context.
6. Ownership, residence, work, management, visitation and service access are relationships, not fields that create authority.
7. Authorization is never inferred from a place relationship alone.
8. Community scope is explicit.
9. Closing a physical entity preserves its identity and historical evidence.
10. A phase is organizational/temporal structure, not an authorization boundary by itself.
11. Multiple contexts remain possible for the same participant and place.
12. Offline or stale place data must not be presented as verified authorization.

## Example

A participant may simultaneously be:

- RESIDENT → Community A → Phase 2 → Building B → Unit 42
- OWNER → Property C
- WORKER → Provider D
- VISITOR → Building E

These are separate relationships and contexts. They do not create separate accounts.

## Boundary

This domain does not yet implement:

- property title/legal ownership verification
- tenancy contracts
- rent accounting
- utility metering
- access credentials
- geofencing
- property-management workflows
- real-estate marketplace behavior

Those capabilities must be implemented as separate domains and connected through the canonical chain.

## Truth state

🟡 SUPPORTED / IMPLEMENTED — domain code and contract are added; repository-wide tests, build, deployment and production verification remain outstanding.
