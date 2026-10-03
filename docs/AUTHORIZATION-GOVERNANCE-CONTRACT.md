# Zalagren — Authorization + Governance Contract

**Status: IMPLEMENTED DOMAIN CONTRACT**

## Purpose

Authorization is the enforcement boundary for what a participant may do. Governance is the decision-making boundary that establishes or changes rules, policies, approvals and community/organizational decisions.

They are related but never interchangeable.

## Canonical chain

> Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence

Governance may produce or reference a policy/decision that informs authorization, but governance itself does not silently grant operational access.

## Capability

A capability describes a possible operation.

Examples:

- `place.view`
- `place.access`
- `visitor.invite`
- `service.request`
- `work.manage`
- `provider.provide`

Capability is not permission.

A capability may be inactive even when historical authorizations reference it.

## Authorization rules

Every authorization is:

1. bound to a participant;
2. bound to a capability;
3. bound to an exact target entity;
4. optionally bound to a context;
5. granted by an identified authority;
6. time-bounded where appropriate;
7. revocable;
8. auditable;
9. evaluated fail-closed.

An authorization never becomes valid merely because a participant has a relationship, subscription or capability.

## Evaluation

An operational authorization check must verify:

- participant matches;
- capability exists and is active;
- authorization is active;
- effective time has started;
- authorization has not expired;
- target entity matches;
- required context is supplied;
- supplied context matches;
- supplied context is active;
- participant matches the context where context ownership is defined.

No check should return success for an unknown, revoked, expired or mismatched authorization.

## Revocation

Revocation is explicit and preserves the authorization record.

Future authorization checks fail after revocation.

Historical actions and events remain intact.

## Governance

Governance decisions are scoped to an entity and preserve:

- decision type;
- proposing/decision reference;
- deciding participant;
- rationale where appropriate;
- effective period;
- lifecycle status.

Governance lifecycle:

> PROPOSED → APPROVED / REJECTED → REVOKED / EXPIRED

A governance decision does not itself substitute for a contextual authorization record.

## Authority boundary

A participant may propose or decide only within authority established by the future governance/authorization policy layer.

The domain implementation must not infer authority from role names alone.

The current implementation therefore records the decision actor and scope without pretending that a role string is a complete governance policy engine.

## Safety rules

- No self-granting authorization.
- No implicit cross-community authority.
- No role-based bypass of contextual authorization.
- No subscription-based operational authority.
- No silent elevation of privileges.
- No authorization success when context is stale or closed.
- No deletion of authorization history merely because access ended.

## Truth state

Capability, Authorization and Governance domain logic are **🟡 SUPPORTED / IMPLEMENTED**, pending repository-wide tests, build, deployment and real workflow verification.
