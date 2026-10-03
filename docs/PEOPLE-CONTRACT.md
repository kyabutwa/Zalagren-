# Zalagren People Contract

**Status:** IMPLEMENTED DOMAIN CONTRACT

## Invariants

1. A Person references one canonical Identity.
2. A Person references one canonical Participant.
3. An Account may be absent at this domain boundary; this does not create a second identity model.
4. Roles are relationships, not separate accounts.
5. Authorization is not stored on Person.
6. Subscription is not authorization.
7. A person may participate without belonging to a community.
8. Deactivation must not delete Identity, Account, Participant, relationships, or historical evidence.
9. Person must not contain community-specific membership state.
10. Multiple roles remain attached to the same canonical participant.

Repository-wide build, deployment, and production verification remain separate acceptance gates.
