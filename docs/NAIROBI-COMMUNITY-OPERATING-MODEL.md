# Nairobi Community Operating Model

## Objective

Make Zalagren useful across many communities in Nairobi without turning each community into a separate application.

## Community lifecycle

1. **Adopt** — community or organization establishes its participation relationship.
2. **Verify** — authoritative community, place and operational information is recorded.
3. **Configure** — services, places, capabilities, operating hours and community policies are configured.
4. **Connect** — verified providers and external systems are connected through adapters.
5. **Operate** — requests, proposals, authorizations, actions, events and evidence are tracked.
6. **Measure** — service quality, failures, unresolved work and community outcomes are measured.
7. **Improve** — verified evidence feeds learning and future proposals.

## Community boundary

A community can manage:

- its participation context
- community administration
- local configuration
- community-specific policies
- its authorized management actions
- local operational workflows

A community cannot:

- create duplicate Zalagren identities
- silently grant itself participant authority
- alter global security rules
- claim an external provider succeeded without evidence
- disable a Zalagren service merely because it is not community-owned
- bypass the authorization gate

## Service model

Services are platform capabilities. A community may configure whether a service is relevant or available in its context where the platform contract permits that configuration, but provider execution remains an explicit integration boundary.

## Operational truth

Zalagren must distinguish:

- declared capability
- available capability
- connected provider
- requested service
- authorized action
- attempted external execution
- provider acknowledgement
- verified external outcome

These states must never be collapsed into a single “success” label.

## Nairobi readiness

The first scalable implementation should make onboarding a new Nairobi community predictable:

**Community identity → place model → relationships → service catalogue → provider verification → authorization policies → operational workflows → evidence → reporting**

This is the path from a product demo to a real community platform.
