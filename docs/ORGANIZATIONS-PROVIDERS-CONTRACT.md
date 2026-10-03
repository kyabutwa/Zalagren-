# Organizations / Providers Contract

## Purpose

This contract establishes Organizations and Providers as first-class Zalagren domains while
preserving the one-identity architecture.

## Organization model

An Organization represents a structured legal, institutional or community entity.

Examples:
- company
- nonprofit
- government entity
- institution
- cooperative
- partnership
- community organization

An organization may have:
- communities;
- places;
- employees/workers;
- managers;
- service relationships;
- provider profiles;
- capabilities;
- operational contexts.

None of these automatically grants global authority over connected participants.

## Provider model

A Provider represents an entity capable of delivering a legitimate service, resource or work.

A provider may be:
- an individual participant;
- an organization;
- a community/institution.

Provider is a service/operational identity, not a replacement for the underlying account or
participant/organization identity.

## Canonical relationships

### Individual provider

**Legal/verified Identity → Account → Participant → Provider → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence**

### Organization-backed provider

**Organization Identity → Account/Participant → Provider → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence**

The exact account/participant representation for organizations remains governed by the
organization-account contract and must not create duplicate human accounts.

## Provider readiness

A provider record may reference:
- capabilities;
- service areas;
- verification evidence;
- onboarding state.

A real service offering must additionally establish:
- service definition;
- eligibility;
- requirements;
- qualifications;
- price and applicable charges;
- availability;
- service area;
- safety/legal requirements;
- cancellation/refund rules;
- evidence;
- dispute handling.

Those are separate service-domain concerns.

## Authorization boundary

The following are intentionally separate:

- Provider status ≠ authorization.
- Capability ≠ authorization.
- Organization relationship ≠ authorization.
- Subscription/entitlement ≠ authorization.
- Service availability ≠ authorization.

A provider must never gain access to participant data, a Unit, a Building, a Community,
funds or protected operations merely because it is registered as a provider.

## Multi-context

One provider can serve multiple communities, organizations and places simultaneously.
The active context must be explicit whenever an operation could affect scope or authority.

## Lifecycle

Organization:
**ACTIVE → INACTIVE / SUSPENDED → CLOSED**

Provider:
**ONBOARDING → ACTIVE → SUSPENDED / INACTIVE → CLOSED**

Closing preserves identity and historical evidence.

## Security and privacy

Provider and organization data must use:
- least privilege;
- minimum necessary data;
- explicit purpose;
- contextual authorization;
- auditability;
- revocation;
- evidence preservation.

## Boundary

This implementation does not yet claim:
- legal registration verification;
- professional-license verification;
- background checks;
- service marketplace execution;
- payments;
- contracts;
- insurance verification;
- regulatory approval.

Those must be implemented and verified separately.

## Truth state

🟡 SUPPORTED / IMPLEMENTED — domain code and contract are added; repository-wide tests,
build, deployment and production workflow verification remain outstanding.
