# BeatPay Contract

BeatPay is Zalagren's payment-coordination service. It coordinates authorized payment workflows across external rails; it does not itself become a bank, mobile-money issuer, payment network or other regulated financial institution merely by providing integration.

## Canonical lifecycle
Need → Intent → Service Request → Eligibility → Proposal → Authorization → Payment Intent → External Submission → Pending → Authoritative External Event → Event/Evidence → Reconciliation → Resolution.

## M-PESA boundary
The first external rail target is M-PESA through Safaricom Daraja. Safaricom documents Daraja APIs for C2B, B2C, B2B and M-PESA Express, with asynchronous transaction workflows and callbacks/results. Production use requires the appropriate M-PESA account/short code, portal access and go-live configuration.

## Invariants
- Every payment intent belongs to a participant and carries an authorization reference.
- Money is represented as positive integer minor units; no floating-point amounts.
- Currency and stable merchant reference are explicit.
- Provider references and receipts are evidence, not local authority.
- Callback event IDs are idempotent.
- Amount, currency and reference mismatches fail closed.
- Terminal states cannot silently transition.
- Credentials, PINs, secrets, tokens and private keys are never domain data or logs.
- Provider credentials are resolved only at the integration boundary from deployment secrets.
- Payment completion requires authoritative external evidence.

## Reconciliation
If an asynchronous callback is missing, BeatPay may query a provider transaction-status facility where supported.

## Current truth state
**🟡 SUPPORTED — domain, state machine, callback validation, idempotency and integration boundary implemented. No live M-PESA credentials, business account, callback endpoint or production transaction verification is claimed.**

## VERIFIED gate
BeatPay becomes 🟢 VERIFIED only after sandbox submission, callback verification, duplicate/mismatch tests, status reconciliation, approved production go-live configuration, a controlled real transaction, and end-to-end evidence/audit verification.

No placeholder provider, fake receipt, fake balance or invented transaction is permitted.
