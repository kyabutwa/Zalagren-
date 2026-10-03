# TSAVO Instantiation Contract

The first concrete Zalagren demonstrator is **TSAVO Royal Suburbs, Roysambu, Nairobi**.

## Canonical instance

- Community: `community-tsavo-royal-suburbs`
- Community type: `APARTMENT`
- Primary place: `place-tsavo-royal-suburbs`
- Place type: `PROPERTY`

## Evidence rule

External property information is stored as evidence with a source and observation date. It does not create Zalagren authority.

The implementation deliberately does not fabricate residents, owners, managers, providers, buildings, units, credentials, permissions, financial records or governance decisions.

## Research basis

TSAVO's public Royal Suburbs page identifies the development in Roysambu, lists studio/one-bedroom/two-bedroom apartments, states 400 units, and lists amenities including access control, borehole, parking, common-area generator and security cameras.

The public catalogue also identifies Royal Suburbs 2 and other later TSAVO developments. Exact phase/building/unit identity is therefore kept uninstantiated until authoritative records are supplied.

## Next operational layer

The demonstrator should progress through:

Community → Place → Phase → Building → Unit → Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence.

Authentication is not authorization, and a property relationship does not itself grant authority.

## Definition of done

Architecture → Implementation → Tests → Build → Deployment → Production verification → Real workflow verification → Security review → Failure review → Acceptance.
