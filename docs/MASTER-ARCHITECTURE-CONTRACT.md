# Zalagren — Master Architecture Contract

**Status: FROZEN FOUNDATION**  
**Version: 1.0**  
**Repository: kyabutwa/Zalagren-**

## 1. Product Definition

Zalagren is **Intelligent Living Infrastructure for Participating People and Communities**.

Zalagren coordinates people, communities, places, organizations, providers, services, resources, needs, capabilities, authority and actions into useful, governed outcomes.

**Core formula:**

> People + Places + Needs + Capabilities + Authority + Resources → Outcomes

Zalagren is not defined as a property-management app, resident app, visitor app, wallet, marketplace, biometric database, chatbot, social network, or access-control product.

These may be capabilities or domains within Zalagren, but none defines the whole system.

## 2. One Identity / One Account / One Participant

This is a non-negotiable architectural rule.

### Person
> Legal/Verified Identity → Zalagren Account → Participant → Relationships → Contexts → Capabilities → Authorizations → Actions → Events → Evidence

### Organization / Community
> Legal/Organizational Identity → Zalagren Account → Participant → Relationships → Contexts → Capabilities → Authorizations → Actions → Events → Evidence

Identity, Account and Participant are distinct concepts.

- **Identity** establishes who or what exists legally/verified where required.
- **Account** provides persistent digital access to Zalagren.
- **Participant** represents participation in the Zalagren ecosystem.

A participant does not create separate Zalagren accounts for different roles.

## 3. Multiple Simultaneous Roles

A single participant may simultaneously have relationships such as resident, tenant, owner, worker, provider, manager, visitor, guest, student, driver, member, customer, contractor and operator.

Roles are contextual relationships, not separate accounts and not the primary identity model.

Ending one relationship must not destroy the participant, account, unrelated relationships, or legitimate historical evidence.

## 4. Subscription and Authorization Are Different

**Subscription / Entitlement** answers: What Zalagren capabilities or services may this account access?

**Authorization** answers: What may this participant actually do in this specific context?

Therefore: **Authentication ≠ Subscription ≠ Entitlement ≠ Relationship ≠ Authorization**.

A paid subscription never automatically grants authority over another person, place, resource or organization.

## 5. Canonical Domain Chain

All consequential Zalagren workflows must be traceable through:

> Identity → Account → Subscription/Entitlement → Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence → Knowledge → Intelligence → Proposal

Not every workflow requires every object, but consequential operations must not bypass applicable authorization, event recording or evidence requirements.

## 6. Relationships and Context

**Relationship** describes how a participant is connected to an entity.

Examples: resident of community, owner of property, worker for provider, visitor to place, manager of organization, member of institution.

**Context** defines where, when and under which circumstances a relationship applies.

Context can include place, community, organization, time, purpose, service, task, authorization state and operational conditions.

A relationship without context must not be interpreted as unlimited authority.

## 7. Capability

Capabilities describe possible actions such as view, communicate, request, invite, approve, manage, provide service, inspect, create work, schedule, pay, receive payment where supported, and access a place.

Capability does not itself grant permission.

## 8. Authorization

Authorization is contextual, explicit where required, least-privilege, revocable, time-bounded where appropriate, and auditable.

Authorization must be evaluated against the participant, relationship, context, capability, purpose and relevant policy.

A participant must never be able to grant themselves authority they do not possess.

## 9. People-First Entry

A person can independently establish identity/account credentials as required, create a Zalagren Account, become a Participant, use eligible Zalagren services and opportunities, communicate through authorized channels, use CONSTANTYNA, manage contexts and relationships, and later join communities.

Community membership is not required for basic Zalagren participation.

## 10. Community-First Entry

A community or organization can adopt Zalagren and manage its authorized domain, including people, residents, owners, workers, visitors, properties, buildings, units, places, organizations, providers, services, resources, utilities, requests, work, governance, events and evidence.

A community does not own a person's global Zalagren identity.

## 11. Communities and Places

Communities are first-class entities. Possible forms include residential communities, estates, apartments, buildings, small cities, organizations, institutions, campuses and managed environments.

Canonical community graph:
> Community → Real Estate → Property → Building → Unit → Place

and:
> Community → People / Organizations / Providers / Services / Resources / Utilities / Requests / Work / Governance / Events / Evidence

Places are first-class entities and may have their own identity, relationships, capabilities, services, resources, rules, events and evidence.

## 12. Organizations and Providers

Organizations are first-class Zalagren entities.

Providers may have organization, workers, teams, services, capabilities, availability, schedules, service areas, pricing, requirements, requests, work, evidence and payments where legally and operationally supported.

Provider services must not be represented as fake buttons.

A production service requires appropriate provider, capability, eligibility, requirements, qualifications, pricing, availability, service area, safety, cancellation/refund rules, evidence, dispute handling and legal/regulatory controls.

## 13. Invitation and Visitor Model

Visitor is a relationship/context, not a disposable identity.

### Existing participant
> Identity + Account + Participant → Invitation → Visitor Relationship/Context → Authorized Visit

### External person
> External Person → Invitation → Account/Identity when required → Participant → Existing Invitation Linked

Nothing legitimate should be lost when an invited external person later creates an account.

Invitation is a first-class domain object containing, as applicable: inviter, intended invitee, community, place, purpose, context, requested time, validity, authorization requirements, credentials, status, events and evidence.

Lifecycle:
> DRAFT → PENDING → DELIVERED → ACCEPTED / DECLINED / EXPIRED / CANCELLED / REVOKED → COMPLETED

A visitor cannot grant themselves access.

## 14. Operational Service Lifecycle

Zalagren services follow:
> Need → Intent → Request → Proposal → Authorization → Work/Action → Event → Evidence → Resolution → Learning

Example:
> Participant → Unit → Utility → Incident → Provider → Work Order → Worker → Authorization → Action → Evidence → Resolution

Services must expose truthful operational state. No fake completion.

## 15. GENESIS

GENESIS is Zalagren's intelligence engine.

Core loop:
> Observe → Understand → Contextualize → Detect → Reason → Propose → Authorize → Execute → Measure → Learn

GENESIS may analyze Zalagren's governed data and produce proposals, insights and actions according to authorization.

Intelligence does not create authority.

## 16. CONSTANTYNA

CONSTANTYNA is Zalagren's governed human-facing intelligence interface.

It may explain Zalagren, research, compare, discover opportunities, identify needs, communicate, prepare proposals, guide participants to interfaces, prepare actions, execute authorized actions, verify results, record evidence and learn from outcomes.

CONSTANTYNA must distinguish:
> Explain → Research → Compare/Recommend → Prepare → Request Authorization → Execute → Verify

No silent consequential execution.

## 17. Opportunity Engine

Opportunity processing follows:
> Observe → Understand Context → Detect Need/Opportunity/Risk → Research → Compare → Estimate Value/Cost → Proposal → Communication → Authorization → Execution → Measurement → Learning

Opportunity domains may include jobs, service work, provider demand, partnerships, unused capacity, community projects, training, cost-saving opportunities and legitimate local economic opportunities.

No opportunity is represented as guaranteed income, guaranteed profit or guaranteed outcome.

## 18. Communication

Zalagren communication is contextual coordination, not social media.

Communication should understand, where applicable: sender, recipient, relationship, context, urgency, intent, authorization and evidence.

Priority categories may include urgent, important, action required, information, opportunity and optional.

## 19. Strategy Engine

Strategy combines:
> Objective + Current State + Evidence + Constraints + Opportunities + Resources + Risks

into:
> Options + Costs + Implementation + Measurement + Next Actions

Strategic proposals remain subject to human/community authority.

## 20. Economic Architecture

Zalagren creates potential economic value by reducing friction, improving utilization, coordinating legitimate demand and supply, enabling services, and helping communities and participants act on opportunities.

Potential revenue mechanisms include participant subscriptions, community subscriptions, organization subscriptions, provider subscriptions, appropriate service/coordination fees, legally supported transaction revenue, implementation/onboarding, enterprise services and advanced intelligence capabilities.

Revenue claims must be based on verified economics, actual costs and applicable legal/regulatory requirements.

## 21. One Zalagren App

There is one Zalagren product experience.

Not Resident App, Manager App, Visitor App, Provider App, or Community App.

The same app dynamically exposes authorized experiences according to:
> Account Entitlements + Participant Relationships + Active Context + Capabilities + Authorization

Apps are clients of the Zalagren infrastructure.

## 22. Security

Security architecture must include, as applicable: least privilege, contextual authorization, secure credentials, encryption, session security, account recovery, device management, revocation, audit trails, data minimization, sensitive-data controls and safe failure handling.

Platform biometrics may be used through secure device mechanisms. Raw centralized biometric storage is not the default architecture.

## 23. Privacy

Zalagren follows data minimization.

For sensitive or consequential data, systems must define appropriate purpose, access, sharing, retention, deletion, export, consent/legal basis where applicable, and auditability.

Privacy requirements must be evaluated against applicable law and operational context.

## 24. Offline and Failure States

Zalagren must never convert uncertainty into fake success.

Operational states may include offline, pending, retrying, syncing, conflict, rejected, failed, recovered and verified.

A failed or unverified operation must remain visibly unverified.

## 25. Truth States

- 🟢 **VERIFIED** — implemented, tested, deployed, production verified, workflow verified and accepted.
- 🟡 **SUPPORTED** — architecture/integration/provider support exists but production verification is incomplete.
- 🔵 **PROPOSED** — designed but not implemented.
- 🔴 **FAILED** — attempted and currently not working.

No implementation may claim VERIFIED without evidence.

## 26. Feature Admission Rule

Every production feature must answer:

1. What entity?
2. Which legal/verified identity?
3. Which account?
4. Which participant?
5. Which relationship?
6. Which context?
7. Which subscription entitlement?
8. Which capability?
9. Who has authority?
10. Which authorization?
11. What intent?
12. What proposal?
13. What action?
14. What event?
15. What evidence?
16. What happens if authorization is revoked?
17. What happens offline?
18. What happens with multiple simultaneous roles?
19. What happens if the person had no account?
20. What happens when the relationship ends?
21. What data is necessary?
22. What legitimate value does the feature create or support?

If these questions cannot be answered appropriately, the feature is not production-ready.

## 27. Architecture Prohibitions

The implementation must not:
- create role-specific Zalagren accounts;
- hard-code Tsavo as the core architecture;
- bypass authorization for convenience;
- treat authentication as authorization;
- destroy identity when a relationship ends;
- create disposable visitor identities where a participant relationship is appropriate;
- claim unsupported integrations;
- claim unverified production completion;
- silently execute consequential actions;
- make intelligence itself the source of authority;
- duplicate domain models unnecessarily;
- make legacy product naming part of the new core architecture.

Tsavo is a community instance/node, not the definition of Zalagren.

## 28. Repository Direction

The fresh repository is the source of truth for the new Zalagren architecture.

Legacy repositories may provide historical reference or validated evidence only after review.

The new implementation should be organized around domain boundaries rather than legacy screens or role-specific applications.

Initial architectural areas: core, people, communities, organizations, places, real-estate, providers, services, intelligence/genesis, intelligence/constantyna, opportunities, communication, strategy, economics, governance, security, privacy, integrations, database, api, web, apps, tests and infrastructure.

## 29. Definition of Done

A feature is not complete merely because code exists.

Completion requires:
> Architecture → Implementation → Tests → Build → Deployment → Production Verification → Real Workflow Verification → Security Review → Failure-Mode Review → Acceptance

Only then may the feature be marked 🟢 VERIFIED.

## 30. Frozen Foundation Rule

This document is the master architecture contract for kyabutwa/Zalagren-.

Changes to foundational rules require deliberate architectural review and an explicit versioned change.

Implementation should conform to this contract rather than silently redefining it.

**Foundation status: FROZEN.**