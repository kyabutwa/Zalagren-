# Zalagren Foundation Freeze

**Freeze:** 2026-10-03  
**Frozen commit:** `cea1134d8c7d9ee35e7ba53b626a841f4c4e5c72`  
**CI status at freeze:** GREEN

## Frozen scope

The following foundation is frozen as the canonical Zalagren domain boundary:

- Core Contract and canonical data model
- Identity → Account → Subscription/Entitlement → Participant
- People and Communities
- Relationships and Context
- Capability and Authorization
- Governance and Multi-context resolution
- Places, Phases, Buildings and Units
- Organizations and Providers
- Services and Service Requests
- Invitation → Intent → Proposal → Authorization → Action → Event → Evidence
- Resources and Work Orders
- GENESIS and CONSTANTYNA intelligence boundaries
- Core intelligence evidence/proposal model
- Account credential/device/recovery references
- Security contract and CI verification pipeline
- Canonical root domain entrypoint

## Freeze rules

1. No service implementation may redefine a frozen core object.
2. No service may grant itself authorization.
3. Subscription/entitlement is not contextual authorization.
4. Authentication is not authorization.
5. Intelligence may observe, reason and propose; it cannot create authority.
6. External providers remain separate trust domains.
7. Production integrations must remain explicitly VERIFIED/SUPPORTED/PROPOSED/FAILED.
8. A change to the frozen foundation requires an explicit architecture change review and a new green freeze.
9. Service work proceeds above this boundary rather than silently changing it.

## Baseline

The frozen baseline is the exact Git commit recorded above. This document is the human-readable freeze marker; the commit SHA is authoritative.
