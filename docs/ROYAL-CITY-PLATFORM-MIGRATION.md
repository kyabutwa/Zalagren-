# Royal City platform migration

## Product identity

Royal City is the public product name across the web experience, installable app, account/settings surfaces, navigation, and native iOS display name. Its logo is the official crown and stacked wordmark sourced from the Royal City project at `public/brand/royal-city-logo-green.png`; compact crown assets are crops of this artwork. The GitHub repository path, existing Swift target, bundle identifier, and internal source/API identifiers are intentionally retained as compatibility identifiers; changing those would affect repository links, installed app identity, or integrations without improving the resident experience.

## Preserved account and local state

The web preview reads the predecessor browser key `zalagren-demo` when no Royal City state exists. It copies the existing participant, community, request, intent, proposal, action, event, evidence, and preference data into `royal-city-platform-v1`, verifies the copy, then removes the old browser key. Existing Royal City state takes precedence if present. Browser history accepts the previous route-state field while writing the Royal City field going forward.

This storage is local preview data, not a signed-in account, identity provider, or server database. Passwords, credentials, and authentication sessions are not in this migration. The current settings surface carries over the account, identity, security/access, privacy/data, intelligence, community/service, and experience categories while continuing to distinguish preference from authorization. The native app keeps its existing bundle identifier and preference keys so installed app preferences remain with that installation.

## Preserved operating protocols

Royal City keeps the established platform contracts and presents them under its own product identity:

- **Identity and account:** Identity → Account → Participant; account and subscription state do not confer authority. See [Identity, account, subscription and participant contract](IDENTITY-ACCOUNT-SUBSCRIPTION-PARTICIPANT-CONTRACT.md).
- **Context and access:** Relationships, place, capability, authorization and privacy remain explicit and scoped. See [Authorization governance](AUTHORIZATION-GOVERNANCE-CONTRACT.md), [Account security](ACCOUNT-SECURITY-CONTRACT.md), and [Relationships and multi-context](RELATIONSHIPS-MULTI-CONTEXT-CONTRACT.md).
- **Consequential work:** Intent → Proposal → Authorization → Action → Event → Evidence. No suggestion self-authorizes; external execution or outcomes require authoritative evidence.
- **Services:** Payment, health, transport, utilities, accommodation, food and other services remain bounded by their actual provider and regulatory authority. Catalog entries do not imply a live provider integration.
- **Communities:** Community contexts such as TSAVO, Mi Vida and Qwetu remain distinct places and relationships. Rebranding the product does not rename or claim ownership of those communities.

## Boundary

The migration changes product identity and browser storage naming while preserving the useful workflows and safety contracts. It does not create authentication, provider connections, payment processing, real resident records, notifications, or verified operational status that the existing platform does not have.
