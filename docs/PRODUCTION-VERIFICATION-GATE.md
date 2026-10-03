# Zalagren Production Verification Gate

A Zalagren feature is VERIFIED only after:

1. Architecture review
2. Security review
3. Unit/domain tests
4. Typecheck
5. Production build
6. Deployment
7. Health check
8. Real workflow verification
9. Failure/revocation/offline checks
10. Evidence and audit review

## Required production checks

### Core
- Identity/account/participant boundaries remain intact.
- Authorization fails closed.
- Revocation and expiry are respected.
- Multiple contexts do not silently collapse.

### Services
- Provider and capability are present.
- Eligibility is evaluated.
- Request does not equal authorization.
- Successful completion requires authoritative evidence.
- Failed/cancelled/disputed workflows remain non-success states.

### Intelligence
- CONSTANTYNA and GENESIS cannot self-authorize.
- Proposals are not actions.
- Voice input has the same authorization boundary as text.
- Protected data is not revealed merely because it was requested conversationally.

### Integrations
- External payment/health/mobility/marketplace/accommodation systems are treated as separate trust domains.
- External success events are verified before Zalagren records success.
- Secrets remain outside source control.

## Truth status

Until the complete gate has been executed against the deployed production environment, the relevant component remains 🟡 SUPPORTED rather than 🟢 VERIFIED.
