# Zalagren Platform Architecture — 2026

## Purpose

Zalagren is not a collection of disconnected apps. It is one governed platform that coordinates people, communities, places, capabilities, services, intelligence and real-world outcomes.

## Reference architecture

```
Experience
  ├─ Web
  ├─ iOS
  └─ Future platform clients
        ↓
Zalagren Platform Core
  ├─ Identity + Account
  ├─ Participant
  ├─ People + Communities
  ├─ Place + Relationship + Context
  ├─ Capability + Entitlement
  ├─ Authorization + Governance
  ├─ Intent + Proposal
  ├─ Action + Event + Evidence
  └─ Security + Privacy + Audit
        ↓
Operational Platform
  ├─ Service orchestration
  ├─ Provider/adaptor boundary
  ├─ Payments
  ├─ Mobility
  ├─ Food
  ├─ Health
  ├─ Utilities
  ├─ Marketplace
  └─ Community operations
        ↓
Intelligence
  ├─ GENESIS
  └─ CONSTANTYNA
        ↓
External systems
  ├─ Regulated payment rails
  ├─ Verified service providers
  ├─ Community systems
  └─ Other authoritative sources
```

## Architecture principles adopted from leading platforms

The design borrows principles, not proprietary implementations:

1. **Palantir:** a shared operational model should connect data, logic, actions and security. Zalagren's canonical chain and authorization boundary become the equivalent operational spine. citeturn1search1turn1search2
2. **Salesforce:** multi-tenancy, metadata-driven extensibility and strong platform APIs allow many organizations to share one platform without becoming separate codebases. Zalagren therefore treats community participation as tenancy/context, not a fork of the platform. citeturn1search0turn1search10
3. **AWS SaaS Lens:** tenant context must flow through the authorization model and every layer must preserve isolation. Zalagren therefore makes community/context scope explicit in consequential operations. citeturn0search4turn0search18
4. **Azure Well-Architected:** reliability, security, operational excellence, performance efficiency and cost optimization are platform concerns, not post-launch cleanup. citeturn0search12turn0search13
5. **Modern platform ecosystems:** products should be built on shared primitives rather than creating separate identity, authorization, payment and data models for every service.

## Zalagren-specific differentiation

Zalagren adds a human/community operating model:

- One participant can hold many relationships without duplicate accounts.
- Communities coordinate their own participation and management context.
- Communities do not own or silently block Zalagren platform services.
- A capability is not permission.
- A subscription is not permission.
- Intelligence is not authority.
- Provider connectivity is never inferred from a service definition.
- External success requires authoritative evidence.
- History is append-oriented and evidence-backed.
- Offline, pending, retry, conflict, rejection and recovery are first-class states.

## Multi-community scale

The platform must support many Nairobi communities from the same core:

- shared runtime and core contracts
- isolated community context and data access
- community-specific configuration through metadata
- common service catalogue with contextual eligibility
- provider adapters behind explicit integration boundaries
- per-community operational policies
- common audit and security controls
- observable workflows and failure queues
- no community-specific forks of core logic

A new community should be primarily a **configuration + verified data + relationships + service eligibility** operation, not a new software product.

## Operating model

Every consequential workflow follows:

**Need → Intent → Eligibility → Proposal → Authorization → Action → Event → Evidence → Learning**

GENESIS can observe and propose. CONSTANTYNA can explain and help. The Core remains the authority boundary.

## Scaling direction

### Phase 1 — Nairobi foundation
TSAVO, Mi Vida Garden City and Qwetu Ruaraka remain evidence-backed reference contexts.

### Phase 2 — Community network
Onboard additional communities through a repeatable community-adoption workflow, without changing the shared core.

### Phase 3 — Service network
Add verified providers and external adapters for payments, mobility, food, utilities, health and other services.

### Phase 4 — Regional platform
Extend the same core into additional Kenyan counties and later DRC/Africa, with jurisdiction-specific policy and compliance layers.

## Non-negotiable platform rule

> **One Zalagren platform. Many communities. Many contexts. One governed core.**
