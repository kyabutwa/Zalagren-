# Services

The Service domain turns a provider capability into an operationally describable service without granting authority.

## Canonical lifecycle

Need → Intent → Service Request → Eligibility → Proposal → Authorization → Scheduling → Work/Action → Event → Evidence → Resolution → Learning.

## Service is not authority

A Service does not itself grant access to a participant, Unit, Building, Community, funds, private data or protected operations.

Provider status, capability, subscription, relationship and service availability are distinct from authorization.

## Production requirements

A service must be able to reference:
- provider
- capability
- eligibility
- qualifications
- pricing/taxes
- availability
- service area
- safety/legal requirements
- cancellation/refund
- evidence/disputes
- data requirements
- fulfilment mode

The current implementation stores references to those policies rather than pretending they have already been verified.

## Kenya compliance boundary

Services that process personal data must be designed with purpose limitation, security, data-subject rights and applicable ODPC requirements in mind. Kenya's ODPC identifies property management, education, health, transport, financial services and other sectors with specific data-handling considerations. This domain does not by itself establish regulatory licensing or provider qualifications.
