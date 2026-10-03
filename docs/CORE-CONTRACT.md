# Zalagren Core Contract

**Status:** FROZEN FOUNDATION  
**Version:** 1.0  
**Scope:** Core domain and invariant rules  
**Repository:** kyabutwa/Zalagren-

## 1. Purpose

The Zalagren Core is the smallest authoritative domain foundation from which all Zalagren capabilities are built.

The Core does not implement every product feature. It defines the entities, relationships, lifecycle rules, authority boundaries, and invariants that every higher-level domain must respect.

No application screen, service module, AI feature, integration, or community implementation may redefine these core semantics locally.

## 2. Core Principle

Zalagren coordinates:

> People + Places + Needs + Capabilities + Authority + Resources → Outcomes

The Core exists to preserve identity, participation, context, authority, action, and evidence across the entire ecosystem.

## 3. Canonical Core Objects

The Core recognizes these canonical concepts:

1. Identity
2. Account
3. Subscription
4. Entitlement
5. Participant
6. Relationship
7. Context
8. Capability
9. Authorization
10. Invitation
11. Intent
12. Proposal
13. Action
14. Event
15. Evidence

Higher-order intelligence concepts such as Knowledge and Intelligence consume Core events and evidence; they must not bypass Core authority rules.

## 4. Identity

Identity represents a person or organization/community that can be established through appropriate legal, verified, or operational evidence.

Identity is not the same as an account.

Identity rules:

- An identity must have a stable canonical identifier.
- Identity records must not be duplicated merely because the entity has multiple roles.
- Identity information must be minimized to what is necessary.
- Verification status must be explicit.
- Unverified information must not be represented as verified.
- Identity lifecycle must be auditable.
- Identity must survive changes to relationships and subscriptions.

## 5. Account

Account is the persistent Zalagren digital access boundary associated with an identity.

Account responsibilities include:

- authentication
- credentials
- sessions
- devices
- recovery
- security settings
- privacy settings
- notification preferences
- subscription state
- entitlement state
- account lifecycle
- security events

Core invariants:

- One identity must not receive multiple Zalagren accounts solely because of different roles.
- Authentication establishes account access; it does not establish contextual authority.
- Account deletion must not silently erase legally or operationally required historical evidence.
- Compromised credentials must be revocable without destroying the participant's identity.

## 6. Subscription

Subscription defines the commercial or service relationship between an account and Zalagren.

Examples may include:

- Free
- Plus
- Premium
- Community
- Organization
- Provider
- Enterprise

Subscription does not itself authorize actions against people, places, organizations, resources, or communities.

Subscription lifecycle must support:

- activation
- renewal
- upgrade
- downgrade
- pause where supported
- cancellation
- expiration
- restoration where supported

A subscription change must not destroy identity, account, participant, relationships, or historical evidence.

## 7. Entitlement

Entitlement translates subscription or another legitimate product rule into access to defined Zalagren capabilities.

Entitlements answer:

> Which product capabilities may this account access?

Entitlements do not answer:

> What may this participant do to a particular entity in a particular context?

That is the responsibility of Authorization.

## 8. Participant

Participant is the canonical representation of an entity participating in Zalagren.

A participant may be:

- a person
- a community
- an organization
- another supported participating entity

A participant is not a role.

A participant has one persistent lifecycle within Zalagren while its relationships may change continuously.

Participant invariants:

- One account maps to one primary participant representation for its Zalagren identity model.
- A participant may have many relationships.
- A participant may have many contexts.
- A participant may have many capabilities.
- A participant may have many authorizations.
- Relationships can start and end without destroying the participant.
- Historical events and evidence must remain attributable to the participant where legally and operationally appropriate.

## 9. Relationship

Relationship expresses a participant's connection to another entity.

Examples:

- resident
- tenant
- owner
- worker
- provider
- manager
- visitor
- member
- customer
- contractor
- operator
- guest

A relationship must identify:

- subject participant
- target entity
- relationship type
- lifecycle/status
- effective period where applicable
- source or basis where required
- relevant context

A relationship is not automatically unlimited authority.

## 10. Context

Context constrains a relationship or action by relevant circumstances.

Context may contain:

- community
- organization
- place
- service
- purpose
- time
- task
- operational state
- authorization state
- applicable policy

The same participant may hold different relationships and authorities in different contexts.

Example:

> Participant A may be a resident in Community X, manager of Organization Y, and visitor in Community Z.

These contexts must not be conflated.

## 11. Capability

Capability defines an action or operation that a participant may potentially perform.

Examples:

- view
- communicate
- request
- invite
- approve
- manage
- inspect
- schedule
- provide service
- create work
- pay
- receive payment where supported
- access a place

Capability is not authorization.

Possessing a capability means the operation exists as a possible operation. Authorization determines whether it is permitted in the current context.

## 12. Authorization

Authorization is the Core's authority boundary.

Authorization determines whether a participant may exercise a capability against a target within a context for a defined purpose.

Authorization should evaluate, as applicable:

- participant
- relationship
- context
- capability
- target
- purpose
- time
- policy
- entitlement
- required conditions
- approval state

Authorization properties:

- least privilege
- contextual
- explicit where required
- revocable
- auditable
- time-bounded where appropriate

No participant may grant themselves authority they do not already possess.

Authorization must fail closed when required authority cannot be established.

## 13. Invitation

Invitation is a first-class participation object.

An invitation may connect:

- inviter
- intended invitee
- participant where already known
- community
- organization
- place
- purpose
- requested time
- validity
- authorization requirements
- credentials
- status

Lifecycle:

> DRAFT → PENDING → DELIVERED → ACCEPTED / DECLINED / EXPIRED / CANCELLED / REVOKED → COMPLETED

An invitation is not itself unlimited access.

Acceptance of an invitation does not bypass authorization requirements.

## 14. Intent

Intent represents what a participant or authorized system actor is trying to accomplish.

Examples:

- request maintenance
- invite a visitor
- find a service
- communicate an urgent issue
- apply for an opportunity
- schedule work

Intent should preserve:

- initiator
- purpose
- context
- target where known
- requested outcome
- relevant constraints
- lifecycle state

Intent is not authorization.

## 15. Proposal

Proposal represents a possible course of action generated by a participant, service, provider, GENESIS, CONSTANTYNA, or another authorized component.

A proposal may contain:

- intended outcome
- proposed action
- alternatives
- cost
- timing
- requirements
- risks
- evidence
- expected effects
- authorization requirements

A proposal does not execute itself.

## 16. Action

Action is an attempted or executed operation.

Actions must preserve:

- actor
- acting participant
- capability
- authorization reference
- context
- target
- intent
- timing
- result state
- error/failure state where applicable

Consequential actions must not be represented as successful merely because an application requested them.

## 17. Event

Event is the durable record that something occurred or that a relevant state transition was recorded.

Events should preserve:

- event type
- actor/source
- participant
- context
- target
- timestamp
- causation/correlation where applicable
- resulting state
- verification status

Events form the operational history of Zalagren.

## 18. Evidence

Evidence supports claims about identity, authority, actions, results, services, transactions, decisions, or outcomes.

Evidence may include appropriate:

- documents
- confirmations
- provider records
- device-generated proof
- system records
- signed approvals
- photographs or other permitted records

Evidence must have appropriate provenance and integrity controls.

Evidence must not be fabricated.

## 19. Core Lifecycle

The canonical consequential workflow is:

> Identity → Account → Subscription/Entitlement → Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence

Not every workflow needs every object.

However, no implementation may skip an applicable authority or evidence boundary merely to simplify the UI.

## 20. Multi-Role Invariant

A participant may simultaneously occupy multiple roles.

Example:

> Resident + Owner + Worker + Provider + Visitor

The Core must represent these as separate relationships and contexts attached to the same participant.

The system must never require multiple Zalagren accounts to represent these roles.

## 21. Relationship Termination

When a relationship ends:

- the relationship becomes inactive/ended;
- associated authorization must be revoked or expire as appropriate;
- future actions under that relationship must fail;
- unrelated relationships remain intact;
- participant identity remains intact;
- account remains intact;
- historical events/evidence remain attributable where appropriate.

Ending a relationship must never be implemented as deleting the participant.

## 22. Authorization Revocation

When authorization is revoked:

- new consequential actions relying on it must fail;
- active credentials must be invalidated where applicable;
- dependent access must be reevaluated;
- the revocation must be auditable;
- previous legitimate events must not be rewritten as though they never occurred.

## 23. Failure and Offline Invariants

Core operations must distinguish:

- pending
- offline
- retrying
- syncing
- conflict
- rejected
- failed
- recovered
- verified

No client may infer successful execution from a request being sent.

A system that cannot establish the required state must expose uncertainty rather than fabricate success.

## 24. Auditability

Core consequential operations must provide sufficient records to answer:

- Who acted?
- On whose authority?
- Against what target?
- In which context?
- For what purpose?
- Under which capability?
- Under which authorization?
- What happened?
- What evidence exists?
- What was the final verified state?

Audit records must be protected from unauthorized alteration.

## 25. Privacy and Data Minimization

Core data models must collect only information necessary for the defined purpose.

Sensitive information must have defined handling rules for:

- access
- sharing
- retention
- deletion
- export
- legal basis/consent where applicable
- auditing

The Core must not require centralized raw biometric data as a default identity mechanism.

## 26. Intelligence Boundary

GENESIS and CONSTANTYNA are Core consumers and orchestrators, not sources of authority.

They may:

- analyze
- explain
- research
- compare
- detect
- propose
- prepare
- request authorization
- execute actions when authorized
- verify outcomes
- record evidence

They may not:

- invent authority
- silently escalate privilege
- bypass authorization
- fabricate evidence
- claim an action succeeded without verification

## 27. Domain Ownership

Higher-level domains must depend on Core concepts rather than create competing versions.

Examples:

- People depends on Identity, Account, Participant and Relationship.
- Communities depends on Participant, Relationship, Context, Place and Authorization.
- Providers depend on Participant, Organization, Capability, Service, Intent, Proposal, Action, Event and Evidence.
- Invitations depend on Participant, Relationship, Context and Authorization.
- GENESIS depends on Event and Evidence and produces Proposals.
- CONSTANTYNA uses Core state and may orchestrate authorized operations.

## 28. Core Invariants

The following are non-negotiable:

1. Identity is not Account.
2. Account is not Participant.
3. Participant is not Role.
4. Subscription is not Authorization.
5. Entitlement is not Authorization.
6. Authentication is not Authorization.
7. Relationship is not Authorization.
8. Capability is not Authorization.
9. Invitation is not unlimited access.
10. Intelligence is not Authority.
11. A relationship ending does not destroy identity.
12. Authorization revocation prevents future dependent actions.
13. Consequential actions require appropriate authorization.
14. Consequential state must be represented truthfully.
15. Evidence must be attributable and must not be fabricated.
16. One participant can hold multiple simultaneous relationships.
17. One identity/account model must serve people and organizational participants.
18. Core semantics must not be duplicated differently by individual apps or modules.
19. Tsavo must remain an instance/context, not the core definition of Zalagren.
20. No feature is Core-valid if it requires bypassing these invariants.

## 29. Versioning and Change Control

This Core Contract is frozen at version 1.0.

Changes to a Core invariant require:

1. explicit architectural review;
2. identification of affected domains;
3. migration impact analysis;
4. security/privacy impact analysis where applicable;
5. test impact analysis;
6. version increment;
7. explicit commit history.

Feature development must not silently modify Core semantics.

## 30. Definition of Core-Complete

The Core is considered implemented only when its contracts are represented in executable code and tests, integrated into the application architecture, and verified through real workflows.

Documentation alone is not implementation.

Until implementation and verification are complete, this contract is **🔵 PROPOSED as code** while the architectural rules themselves remain **🟢 FROZEN**.

**End of Core Contract.**
