# Zalagren Product Benchmark & Web UX Audit

## 15 companies reviewed
Apple; Airbnb; Uber; Google; Notion; Linear; Stripe; Plaid; Shopify; DoorDash; Microsoft; Slack; Salesforce; ServiceNow; Palantir.

## 15 products / product surfaces reviewed
iOS; iCloud; Apple Wallet; Apple Maps; Airbnb; Uber; Google Maps; Notion; Linear; Stripe Dashboard; Plaid Link; Shopify Admin; Microsoft Teams; Slack; ChatGPT.

## What Zalagren adopts
- Apple-style hierarchy: top-level sections use persistent navigation; nested content uses an explicit navigation stack.
- Back/Forward are first-class controls, with browser history preserved.
- Detail screens expose a location/breadcrumb line and a visible return path.
- Bottom navigation is reserved for top-level areas; actions stay in toolbars/content.
- Cards represent real objects, contexts, decisions or lifecycle stages rather than decorating every block.
- Airbnb/Uber-style discovery uses compact actionable cards/rows without implying unavailable fulfillment.
- Notion/Linear-style information architecture keeps orientation visible while reducing visual noise.
- Stripe/Plaid-style trust boundaries keep identity, consent, authorization and transaction state explicit.
- Shopify/Microsoft/Slack-style ecosystem thinking keeps many capabilities inside one coherent participant context.
- Palantir-style ontology thinking reinforces Zalagren's existing model: objects + relationships + logic + actions + governance, while Zalagren remains human-authorized.

## Zalagren navigation contract
1. Home is a command center, not a giant dashboard.
2. People, Community, Services, Intelligence and Activity are focused surfaces.
3. Opening a detail view pushes browser history.
4. Back returns to the exact parent surface.
5. Forward restores the next route when available.
6. Browser swipe-back on iPhone works because routes use History API state.
7. Nested views expose an explicit Back button.
8. Multi-step lifecycle views expose Back and Next/Continue.
9. Bottom navigation stays available for top-level movement and respects iPhone safe areas.
10. Content never sits underneath the bottom navigation.
11. No service click can create fake provider, booking, payment or delivery success.
12. Truth states remain visible.

## Asset handling
The repository contains six uploaded JPEG source assets: IMG_1505.jpeg through IMG_1510.jpeg. The original source files remain untouched. The web deployment prepares derived copies by removing connected light background pixels with a controlled ImageMagick flood-fill/fuzz operation. This keeps the originals intact while making the deployed copies suitable for transparent presentation. Zalagren does not invent a service-to-file mapping that is not encoded in the repository.

## Acceptance
The web platform is accepted only after web validation, deployment and public smoke verification are green. The public page must load, JavaScript must load, the manifest must load, and the navigation/route code must be present.
