# BeatOne Capability Map into Zalagren

| BeatOne capability | Zalagren destination | Disposition |
|---|---|---|
| Identity/account/participant | core identity/account/participant | RECONCILE, no duplicate |
| Relationship/context/capability/authorization | core relationship/context/capability/authorization | RECONCILE, Zalagren canonical |
| Action/Event/Evidence | core lifecycle | RECONCILE, Zalagren canonical |
| Account security + verification | core/security | ADOPTED |
| Activity projection | core/participant-operations | ADOPTED |
| Notifications/read state | core/participant-operations | ADOPTED |
| Compliance review state | core/participant-operations | ADOPTED |
| Support requests | core/participant-operations | ADOPTED |
| BeatPay | services/beatpay* | ALREADY PRESENT; deepen against BeatOne |
| BeatFood / BeatHealth / BeatMarket / BeatRide / BeatGenzi / BeatBnB | services/zalagren-services | ALREADY PRESENT |
| BeatGuardian / BeatUtilities | services/protected-services | ADOPTED |
| Places / organizations / providers | existing Zalagren domains | ALREADY PRESENT |
| TSAVO / Mi Vida / Qwetu | communities/* | ALREADY PRESENT |
| CONSTANTYNA / GENESIS | intelligence/* | ALREADY PRESENT; preserve authority boundaries |
| Cloudflare Worker + Neon | future runtime/integrations | TARGET, not copied blindly |
| BeatOne production migrations/data | Zalagren production schema | DO NOT COPY |
| BeatOne branding | Zalagren | REJECTED |

Duplicate-prevention rule: if two models represent the same business fact, keep one canonical Zalagren representation and use adapters/references instead of parallel records.

Truth-state rule: a green domain contract does not make an external provider integration green.
