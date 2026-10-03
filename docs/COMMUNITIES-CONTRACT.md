# Zalagren Communities Contract

**Status:** IMPLEMENTED DOMAIN CONTRACT

## Purpose

Community is a first-class governed environment in Zalagren. It is not a separate application, separate identity system, or separate account model.

## Supported community forms

- Residential community
- Apartment environment
- Estate
- Building
- Small city
- Campus
- Institution
- Organization-backed community
- Other explicitly supported governed environments

## Canonical relationship

Community exists alongside the canonical architecture:

Identity -> Account -> Participant -> Relationship -> Context -> Community

A community may be organization-backed, but organizationId does not make the organization the owner of every participant identity.

## Invariants

1. Community has its own immutable canonical ID.
2. Community identity is separate from participating people.
3. A community may reference an organization without creating a second identity/account model.
4. Community membership is represented through relationships, not a memberIds array.
5. Community roles are represented through relationships and contexts.
6. Authorization is represented by the authorization domain, not by community fields.
7. Subscription/entitlement is not authorization.
8. A community does not automatically gain access to a participant's global data.
9. Community scope must be evaluated for consequential operations.
10. Closing a community must not delete people, identities, accounts, participants, or historical evidence.
11. Places, properties, buildings, units, providers, services, resources, utilities, work, and governance remain separate canonical domains.
12. Tsavo is an instance/context and must not be hard-coded into the global Community model.

## Management boundary

Future community management may coordinate people, organizations, places, real estate, services, resources, utilities, requests, work, governance, events, and evidence using the frozen authorization and event architecture.

Repository-wide build, deployment, and production verification remain separate acceptance gates.
