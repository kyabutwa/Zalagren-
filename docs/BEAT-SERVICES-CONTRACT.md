# Beat Services Contract

## Canonical rule

Beat services are service domains within Zalagren, not separate applications with separate identities.

## Shared lifecycle

Need → Intent → Service → Provider/Capability → Eligibility → Proposal → Authorization → Request → Action → Event → Evidence → Resolution → Learning.

## Service-specific boundaries

### BeatPay
Never treat a payment request as successful until an authoritative payment event is received. Never store or expose payment credentials or PINs in ordinary application data.

### BeatFood
Never represent an order as delivered until fulfilment evidence exists.

### BeatHealth
Never expose health information outside the authorized purpose/context. Clinical decisions remain with appropriately authorized health professionals and systems.

### BeatGenzi
Never guarantee jobs, contracts, income or opportunity outcomes.

### BeatMarket
Never assume a listing means ownership, authenticity, legality, availability or successful sale.

### BeatRide
Never represent a ride as completed from a request alone. Driver, vehicle, route, safety and applicable regulatory evidence must be handled separately.

### BeatBnB
Never represent a stay as booked, occupied or completed from a listing alone. Host, property, availability, booking and stay evidence remain distinct.

## Cross-service requirements

Every operational service must support:
- provider identity
- capability
- eligibility
- context
- authorization
- pricing/fees where applicable
- availability
- cancellation/refund where applicable
- safety/legal requirements
- evidence
- failure/recovery
- dispute handling
- data minimization

## External rails

External providers such as payment networks remain external systems. Integration does not transfer their regulatory status or data authority to Zalagren.
