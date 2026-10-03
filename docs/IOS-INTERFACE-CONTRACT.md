# Zalagren iOS Interface Contract

Status: SUPPORTED

## Interface decision

Zalagren must not be a single long vertical dashboard. Each primary domain gets its own focused interface. Home is an orientation surface, not a feed.

Primary navigation:
Home / Intelligence / People / Community / Activity

Each destination uses a dedicated screen with a clear information hierarchy. Detail flows use NavigationStack. Where the available width supports it, navigation may adapt to sidebar/split presentation.

## Current Apple design basis

The implementation follows current Apple guidance for adaptive layouts, safe areas, Dynamic Type, standard navigation containers and Liquid Glass. Navigation remains a distinct functional layer from content. SwiftUI's adaptive tab/sidebar APIs are preferred over a custom navigation system.

## Zalagren information architecture

Home:
- current context
- immediate priorities
- intelligence entry
- concise authorized capabilities
- no endless feed

Intelligence:
- CONSTANTYNA conversation
- GENESIS reasoning/proposals
- voice controls
- evidence/truth state
- pending authorization
- proposed actions

People:
- participant identity
- relationships
- contexts
- invitations
- services/opportunities relevant to the participant

Community:
- communities
- places
- buildings
- Units
- organizations
- providers
- services
- operations
- governance

Activity:
- verified events
- pending actions
- proposals
- failures
- evidence

Settings:
- account
- security
- privacy
- devices
- subscriptions/entitlements
- intelligence voice
- appearance

## No vertical-dashboard rule

Do not implement primary screens as one large VStack/ScrollView containing every feature. Long content is allowed only inside a focused task or detail flow where scrolling is naturally required.

The home screen should fit the essential first view without requiring a vertical feed. Secondary information should be reached through explicit navigation.

## Device adaptability

Do not use hard-coded device pixel dimensions. Use SwiftUI safe areas, size classes, adaptive grids, system spacing and Dynamic Type.

Support the compact and large iPhone families, Dynamic Island/notch variations, Display Zoom and resizable environments.

## Intelligence boundaries

CONSTANTYNA and GENESIS can explain the Zalagren ecosystem, research, compare, detect opportunities, propose solutions/services and guide people. Neither can grant itself authority, bypass Core authorization, or expose/reconstruct internal system code.

A typed or spoken request is never itself authorization.

## Verification

Current interface state is SUPPORTED. Final verification requires an Xcode build, simulator/device matrix, accessibility review, API integration, TestFlight workflow and production verification.
