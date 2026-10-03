# BeatPay Core Authorization Gate

Status: SUPPORTED — implemented and covered by automated tests; not production VERIFIED.

## Boundary

BeatPay cannot create a payment intent from a palm match, scanner session, provider request, or client UI alone.

The payment gate requires:

1. an active Core Authorization;
2. participant identity matching;
3. the required BeatPay capability matching the requested service;
4. an active matching context;
5. the authorization target matching the provider/merchant;
6. Core-resolved payment conditions matching the payment intent ID, participant, service, merchant, context, amount, and currency;
7. authorization effective/expiry/revocation checks to pass.

Only after these checks does BeatPay create its payment intent.

## Required flow

Provider phone → BeatPay scanner → participant palm presentation → liveness/recognition → participant reference → Core authorization evaluation → Core-resolved payment terms → BeatPay payment intent → external payment rail.

Palm recognition is an identity/verification signal. It is never an authorization grant.

## Amount and currency

The frozen Core Authorization model already provides a conditionsReference. BeatPay resolves service-specific payment terms from that Core-controlled reference and refuses the request when amount or currency differs.

BeatPay does not invent authorization terms.

## Merchant and service

The Core authorization target must be PROVIDER and must match the requested merchant.

The capability key must bind the payment to the requested service using the canonical BeatPay service namespace:

beatpay.payment.<serviceId>

The resolved Core payment terms must independently match service and merchant.

## Failure behavior

The gate fails closed for missing authorization, inactive/revoked/expired authorization, participant mismatch, capability mismatch, inactive context, merchant mismatch, service mismatch, missing conditions, unavailable conditions, payment-intent mismatch, amount mismatch, and currency mismatch.

No external payment submission should occur after a gate rejection.

## Truth boundary

This gate proves only that the application-side request satisfies the implemented Core authorization contract. It does not prove Safaricom/bank acceptance, settlement, reversal, refund, or regulatory compliance. Those remain separate verification stages.
