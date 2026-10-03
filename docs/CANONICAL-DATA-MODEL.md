# Zalagren — Canonical Data Model

**Status:** FROZEN ARCHITECTURAL DESIGN  
**Version:** 1.0  
**Repository:** kyabutwa/Zalagren-

## 1. Purpose

This document defines the canonical data model for Zalagren.

It establishes the authoritative entities, identifiers, ownership boundaries, relationships, lifecycle semantics, and integrity rules that implementation must follow.

The model serves independent people, communities, organizations, providers, places and services through one participant/account architecture.

This document defines the model. It does not claim database implementation is complete.

## 2. Canonical Graph

The foundational graph is:

> Identity → Account → Subscription/Entitlement → Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence

The broader infrastructure graph is:

> Participant ↔ Relationship ↔ Entity ↔ Context ↔ Capability ↔ Authorization ↔ Intent ↔ Proposal ↔ Action ↔ Event ↔ Evidence

Intelligence consumes governed events and evidence and produces proposals or authorized actions.

## 3. Canonical Entities

### Identity and access
- Identity
- Account
- Credential
- Device
- RecoveryMethod

### Participation
- Participant
- Relationship
- Context
- Subscription
- Entitlement
- Capability
- Authorization

### Coordination
- Invitation
- Intent
- Proposal
- Action
- Event
- Evidence

### Living infrastructure
- Community
- Organization
- Place
- Property
- Building
- Unit
- Resource
- Service
- Provider
- ServiceRequest
- WorkOrder

### Intelligence
- Observation
- KnowledgeItem
- IntelligenceRun
- Recommendation
- Strategy

Higher domains must reference these canonical concepts rather than create competing identity or authorization systems.

## 4. Universal Identifier Rules

Every persistent entity must have:

- immutable internal identifier;
- entity type;
- creation timestamp;
- update timestamp;
- lifecycle/status;
- provenance where applicable.

Identifiers must be opaque and must not encode authorization, role, location, pricing or other mutable business meaning.

Public identifiers should be separated from internal identifiers where disclosure creates unnecessary risk.

IDs must never be reused.

## 5. Common Record Metadata

Records should support, where appropriate:

- id
- created_at
- updated_at
- status
- version
- created_by
- updated_by
- source
- correlation_id
- causation_id
- effective_from
- effective_until

Not every table requires every field.

## 6. Identity and Account

### Identity

Represents the underlying person or organization identity.

Core fields:

- id
- type: PERSON | ORGANIZATION
- verification_status
- display_name
- legal_name where required
- verification_reference where appropriate
- status
- created_at
- updated_at

Sensitive legal identity data must be separated from ordinary profile data and protected according to sensitivity.

### Account

Represents persistent Zalagren digital access.

Core fields:

- id
- identity_id
- status
- security_state
- primary_contact_reference
- created_at
- updated_at
- closed_at where applicable

Invariant:

> One Zalagren identity must not receive multiple accounts merely because its participant has multiple roles.

### Credential

Fields:

- id
- account_id
- type
- provider_or_platform
- credential_reference
- status
- created_at
- last_used_at
- revoked_at

Raw secrets must not be stored when a secure verification mechanism can be used.

### Device

Fields:

- id
- account_id
- platform
- device_reference
- trust_status
- created_at
- last_seen_at
- revoked_at

### RecoveryMethod

Represents an approved recovery mechanism and must be separately auditable.

## 7. Participant

Participant is the canonical representation of an entity participating in Zalagren.

A participant may represent:

- person
- community
- organization
- another explicitly supported participating entity

Fields:

- id
- identity_id
- account_id where account-backed
- participant_type
- status
- created_at
- updated_at
- deactivated_at where applicable

A participant may have many relationships, contexts, capabilities and authorizations.

Ending a relationship must not destroy the participant.

## 8. Subscription and Entitlement

### Subscription

Fields:

- id
- account_id
- plan_code
- status
- started_at
- renews_at where applicable
- expires_at where applicable
- cancelled_at where applicable
- billing_reference where applicable

### Entitlement

Fields:

- id
- account_id
- subscription_id where applicable
- capability_key
- scope
- status
- effective_from
- effective_until
- source

Entitlement grants product-level access. It does not grant contextual authority over arbitrary entities.

## 9. Relationship

Relationship expresses a participant's connection to another entity.

Fields:

- id
- subject_participant_id
- target_entity_type
- target_entity_id
- relationship_type
- status
- effective_from
- effective_until
- source
- created_by
- ended_by
- ended_at

Examples:

> Participant → RESIDENT → Community

> Participant → OWNER → Property

> Participant → WORKER → Organization

> Participant → VISITOR → Place/Community

Relationships are first-class records and must not be represented only by a role field.

## 10. Context

Context constrains a relationship or action by circumstances.

Fields may include:

- id
- context_type
- community_id where applicable
- organization_id where applicable
- place_id where applicable
- participant_id where applicable
- purpose
- start_at
- end_at
- state

The same participant may hold different relationships and authorities in different contexts.

## 11. Capability

Capability defines an operation that may potentially be performed.

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

Example stable keys:

- place.view
- place.access
- visitor.invite
- service.request
- work.manage
- provider.provide
- communication.send

Capability is not authorization.

## 12. Authorization

Authorization determines whether a participant may exercise a capability against a target within a context.

Fields:

- id
- participant_id
- capability_id
- target_entity_type
- target_entity_id
- context_id
- purpose
- status
- granted_by
- granted_at
- effective_from
- effective_until
- revoked_at
- revocation_reason
- policy_reference
- conditions_reference

Authorization must be contextual, least-privilege, revocable, auditable and time-bounded where appropriate.

Authorization must fail closed when required authority cannot be established.

## 13. Invitation

Invitation is a first-class participation object.

Fields may include:

- id
- inviter_participant_id
- invitee_participant_id nullable
- invitee_identity_reference nullable
- invitee_contact_reference nullable
- community_id nullable
- organization_id nullable
- place_id nullable
- purpose
- requested_start_at
- requested_end_at
- status
- authorization_requirement
- credential_reference nullable
- created_at
- accepted_at
- declined_at
- cancelled_at
- expired_at
- revoked_at
- completed_at

Lifecycle:

> DRAFT → PENDING → DELIVERED → ACCEPTED / DECLINED / EXPIRED / CANCELLED / REVOKED → COMPLETED

An invitation is not unlimited access.

When an external visitor later creates an account, the invitation must link to the canonical participant instead of creating a duplicate identity.

## 14. Intent

Intent represents what a participant or authorized actor is trying to accomplish.

Fields:

- id
- initiator_participant_id
- context_id
- intent_type
- target_entity_type
- target_entity_id
- purpose
- requested_outcome
- constraints_reference
- status
- created_at
- resolved_at

Intent is not authorization.

## 15. Proposal

Proposal represents a possible course of action.

Fields:

- id
- proposer_participant_id nullable
- source_type
- source_reference
- intent_id
- context_id
- target_entity_type
- target_entity_id
- proposal_type
- description
- alternatives_reference
- estimated_cost_reference
- estimated_timing_reference
- requirements_reference
- risk_reference
- evidence_reference
- authorization_required
- status
- created_at
- expires_at
- accepted_at
- rejected_at

A proposal does not execute itself.

## 16. Action

Action represents an attempted or executed operation.

Fields:

- id
- actor_participant_id
- capability_id
- authorization_id nullable where legitimately not required
- intent_id nullable
- proposal_id nullable
- context_id
- target_entity_type
- target_entity_id
- requested_at
- started_at
- completed_at
- state
- result_reference
- failure_code
- failure_reference
- verification_status

The system must distinguish request from verified completion.

## 17. Event

Event records that something occurred or that a relevant state transition was recorded.

Fields:

- id
- event_type
- actor_participant_id nullable
- subject_entity_type
- subject_entity_id
- context_id nullable
- action_id nullable
- intent_id nullable
- timestamp
- correlation_id
- causation_id
- payload_reference
- verification_status
- source

Events form operational history and must not be silently rewritten to hide outcomes.

## 18. Evidence

Evidence supports claims about identity, authority, actions, results, services, transactions, decisions or outcomes.

Fields:

- id
- evidence_type
- subject_entity_type
- subject_entity_id
- source_type
- source_reference
- captured_at
- captured_by
- integrity_reference
- verification_status
- retention_policy_reference
- access_policy_reference

Evidence must preserve provenance and integrity.

## 19. Community

Community is a first-class entity.

Fields:

- id
- organization_id nullable
- community_type
- name
- status
- primary_place_id nullable
- governance_reference
- created_at
- updated_at

A community participates through the same Account/Participant architecture.

## 20. Organization

Fields:

- id
- identity_id nullable
- organization_type
- legal_name where applicable
- display_name
- status
- verification_status
- created_at
- updated_at

Zalagren itself may be represented as an organization within the ecosystem.

## 21. Place

Place is a first-class entity.

Fields:

- id
- place_type
- name
- parent_place_id nullable
- community_id nullable
- organization_id nullable
- address_reference
- geo_reference where necessary
- status
- access_policy_reference
- created_at
- updated_at

Examples:

> Community → Property → Building → Unit → Room

> Organization → Campus → Building → Office

## 22. Real Estate

### Property

Fields:

- id
- community_id nullable
- property_type
- name
- status
- place_id

Ownership is represented through relationships.

### Building

Fields:

- id
- property_id
- building_type
- name
- status
- place_id

### Unit

Fields:

- id
- building_id
- unit_type
- unit_reference
- status
- place_id

Ownership, tenancy and occupancy are represented through relationships rather than only hard-coded owner fields.

## 23. Resource

Resource represents a managed physical, digital, utility, financial or operational resource.

Fields:

- id
- resource_type
- owner_entity_type
- owner_entity_id
- place_id nullable
- organization_id nullable
- status
- capacity_reference
- availability_reference

Resource use must be governed by capability and authorization where required.

## 24. Service

Service represents a legitimate operational service offering.

Fields:

- id
- provider_organization_id
- service_type
- name
- description
- capability_reference
- eligibility_reference
- requirement_reference
- pricing_reference
- tax_reference
- availability_reference
- service_area_reference
- safety_reference
- cancellation_reference
- refund_reference
- status

A service is not merely a UI button.

## 25. Provider

Provider capability is represented through organizations and participant relationships.

Canonical pattern:

> Organization → Provider Capability → Worker Participant → Service → Request → Work → Evidence

A worker does not become the provider merely because the worker is assigned to a task.

## 26. ServiceRequest

Fields:

- id
- requester_participant_id
- service_id
- context_id
- place_id nullable
- intent_id
- proposal_id nullable
- authorization_id nullable
- status
- requested_at
- scheduled_at nullable
- resolved_at nullable

Suggested lifecycle:

> REQUESTED → PROPOSED → AUTHORIZED → SCHEDULED → IN_PROGRESS → COMPLETED → VERIFIED / DISPUTED / FAILED

Actual state must reflect operational reality.

## 27. WorkOrder

Fields:

- id
- service_request_id
- provider_organization_id
- assigned_worker_participant_id nullable
- place_id nullable
- authorization_id nullable
- status
- scheduled_start_at
- scheduled_end_at
- started_at
- completed_at
- evidence_reference
- verification_status

Worker assignment must be authorized by the relevant context.

## 28. Intelligence Model

### Observation

Fields:

- id
- source_type
- source_reference
- context_id
- observed_at
- subject_entity_type
- subject_entity_id
- data_reference
- confidence_reference
- privacy_classification

### KnowledgeItem

Fields:

- id
- source_event_reference
- evidence_reference
- context_id
- knowledge_type
- statement_reference
- confidence_reference
- created_at
- expires_at where applicable

Knowledge must retain provenance.

### IntelligenceRun

Fields:

- id
- engine_type
- initiator_reference
- context_id
- input_reference
- model_reference
- started_at
- completed_at
- status
- output_reference
- policy_reference

### Recommendation

A recommendation is an intelligence-generated proposal.

It must reference its input/evidence, context, rationale, uncertainty where appropriate, affected target, proposed action and authorization requirements.

Recommendations do not create authority.

## 29. Strategy

Fields:

- id
- owner_participant_id
- objective_reference
- current_state_reference
- evidence_reference
- constraints_reference
- opportunity_reference
- resource_reference
- risk_reference
- options_reference
- measurement_reference
- status

Strategy outputs remain governed proposals.

## 30. External Integration References

External systems such as payment rails, identity providers, mapping systems, messaging providers, regulated services and device platforms must be represented through integration references.

External identifiers must not replace canonical Zalagren identifiers.

Pattern:

> Zalagren Operation → External Provider Reference → External Result → Zalagren Event → Evidence

The integration boundary must preserve provenance and truthful state.

## 31. Referential Integrity

Core relationships must enforce:

- valid referenced entities;
- valid participants;
- valid contexts;
- valid capabilities;
- valid authorizations;
- valid lifecycle states;
- no orphaned consequential actions;
- no authorization pointing to a missing capability;
- no action claiming an invalid authorization;
- no evidence claiming an impossible source;
- no relationship referring to a deleted canonical participant.

Deletion must use explicit lifecycle rules rather than uncontrolled cascading deletion where history or legal retention matters.

## 32. Temporal Integrity

Time-sensitive records must distinguish:

- created time
- requested time
- effective time
- execution time
- verification time
- expiration time
- revocation time

Historical truth must not be overwritten merely because current state changed.

## 33. Status Integrity

Statuses must represent actual lifecycle state.

Examples:

- ACTIVE
- INACTIVE
- PENDING
- ACCEPTED
- DECLINED
- EXPIRED
- CANCELLED
- REVOKED
- IN_PROGRESS
- COMPLETED
- VERIFIED
- FAILED
- DISPUTED

A UI must not display VERIFIED when the underlying record is only COMPLETED or REQUESTED.

## 34. Deletion and Retention

Deletion is a domain operation, not a generic database convenience.

Where records must remain for legal, audit, financial or safety reasons:

- preserve required evidence;
- restrict access;
- mark lifecycle state;
- apply retention policy.

Where deletion is permitted and required, erase or anonymize only data that may safely and legally be removed.

## 35. Scope Isolation

Community and organization data must be scoped.

Access to one community does not imply access to another.

Every scoped consequential operation must evaluate:

- participant
- relationship
- context
- target
- capability
- authorization

Cross-community operations require an explicit authorized relationship or system-level rule.

## 36. Multi-Role Query Rule

Queries must resolve active relationships and contexts before presenting consequential actions.

The system must not arbitrarily select a role when multiple relationships are simultaneously valid.

If ambiguity could cause a consequential action, Zalagren must require clarification or explicit context selection.

## 37. Canonical Multi-Role Example

A person lives in Unit 42, owns another property, works for a provider, and is visiting another community.

Represent:

> Identity A → Account A → Participant A

Then:

> Participant A → RESIDENT → Unit 42 → Tsavo Context

> Participant A → OWNER → Property B → Property Context

> Participant A → WORKER → Provider C → Provider Context

> Participant A → VISITOR → Community D → Invitation/Visit Context

There are not four accounts.

## 38. Canonical Service Example

A resident reports a water issue:

> Participant → Relationship → Unit → Context → Intent → ServiceRequest → Proposal → Authorization → WorkOrder → Worker Action → Event → Evidence → Resolution

GENESIS may detect repeated incidents and propose a strategy.

CONSTANTYNA may explain the proposal, compare options, request authorization and execute only an authorized action.

## 39. Canonical Visitor Example

A participant invites a visitor:

> Inviter Participant → Invitation → Place/Context → Authorization → Visitor Relationship → Credential where appropriate → Visit Events → Completion

If the visitor later creates a Zalagren account:

> Existing Invitation → Verified Identity/Account → Participant → Existing Invitation Linked

No duplicate visitor identity should be created merely because the visitor initially lacked an account.

## 40. Frozen Data Rules

1. One canonical identity per represented person/organization.
2. One Zalagren account per identity in the normal account model.
3. One participant representation per participating identity.
4. Roles are relationships, not accounts.
5. Context is a first-class boundary.
6. Capabilities are not permissions.
7. Authorization is contextual and auditable.
8. Invitations are first-class objects.
9. Actions reference their authorization where required.
10. Events preserve operational history.
11. Evidence preserves provenance.
12. Intelligence references evidence and cannot create authority.
13. External IDs never replace Zalagren IDs.
14. Historical state must remain reconstructable.
15. Community scope must not leak across communities.
16. Relationship termination must not destroy identity.
17. Authorization revocation must affect future dependent actions.
18. Failed or unverified operations must remain visibly unverified.
19. Tsavo is an instance/context, not the global schema.
20. No domain may create a competing identity/account/participant model.

## 41. Database Implementation Direction

The eventual production database should be relational and strongly constrained.

Recommended characteristics:

- PostgreSQL-compatible schema;
- foreign keys for canonical references;
- explicit status/state constraints;
- unique constraints for identity/account/participant invariants;
- indexed contextual authorization lookups;
- append-oriented event storage;
- protected evidence references;
- migration-controlled schema evolution;
- transaction boundaries around consequential state transitions;
- audit-friendly timestamps and correlation identifiers.

The database schema must be derived from this model rather than from UI screens.

## 42. Implementation Sequence

Implement in dependency order:

1. Identity
2. Account
3. Credential/Device
4. Subscription
5. Entitlement
6. Participant
7. Relationship
8. Context
9. Capability
10. Authorization
11. Invitation
12. Intent
13. Proposal
14. Action
15. Event
16. Evidence
17. Organization
18. Community
19. Place
20. Property/Building/Unit
21. Resource
22. Provider
23. Service
24. ServiceRequest
25. WorkOrder
26. Observation
27. KnowledgeItem
28. IntelligenceRun
29. Recommendation
30. Strategy

Higher domains must not bypass earlier dependencies.

## 43. Definition of Done

This document is complete as the canonical design when reviewed against the Master Architecture Contract and Core Contract.

It becomes an implemented data model only after:

> Schema → Constraints → Migrations → Domain repositories/services → Tests → Fixture validation → Build → Deployment → Real workflow verification

Until then:

**Architecture design: 🟢 FROZEN**  
**Database implementation: 🔵 PROPOSED**

**End of Canonical Data Model.**