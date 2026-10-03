import { Community, createCommunity } from "../community";
import { Place, createPlace } from "../../places/place";

export type MiVidaEvidenceStatus = "VERIFIED" | "SUPPORTED" | "UNKNOWN";

export interface MiVidaEvidence {
  id: string;
  status: MiVidaEvidenceStatus;
  claim: string;
  sourceName: string;
  sourceReference: string;
  observedAt: string;
  notes?: string;
}

export interface MiVidaKnownFeature {
  key: string;
  label: string;
  evidenceStatus: MiVidaEvidenceStatus;
  sourceEvidenceId: string;
}

export interface MiVidaInstance {
  community: Community;
  primaryPlace: Place;
  evidence: MiVidaEvidence[];
  knownFeatures: MiVidaKnownFeature[];
  uninstantiatedAreas: string[];
}

const RESEARCH_DATE = "2026-10-03T00:00:00.000Z";

export function instantiateMiVidaGardenCity(): MiVidaInstance {
  const community = createCommunity({
    id: "community-mi-vida-garden-city",
    name: "Mi Vida Garden City",
    communityType: "APARTMENT",
    primaryPlaceId: "place-mi-vida-garden-city",
    governanceReference: "MI_VIDA_PROPERTY_GOVERNANCE_PENDING_VERIFICATION",
    createdAt: RESEARCH_DATE,
  });

  const primaryPlace = createPlace({
    id: "place-mi-vida-garden-city",
    placeType: "PROPERTY",
    name: "Mi Vida Garden City",
    communityId: community.id,
    address: "Garden City, Thika Road, Nairobi, Kenya",
    createdAt: RESEARCH_DATE,
  });

  const evidence: MiVidaEvidence[] = [
    {
      id: "evidence-mi-vida-official",
      status: "VERIFIED",
      claim: "Mi Vida Homes identifies Mi Vida Garden City as a completed residential development at Garden City with 1, 2 and 3 bedroom apartments.",
      sourceName: "Mi Vida Homes",
      sourceReference: "https://mividahomes.com/developments/mi-vida-garden-city/",
      observedAt: RESEARCH_DATE,
    },
    {
      id: "evidence-mi-vida-completion",
      status: "VERIFIED",
      claim: "Mi Vida Homes states the Mi Vida Garden City development was completed in 2022.",
      sourceName: "Mi Vida Homes",
      sourceReference: "https://mividahomes.com/developments/mi-vida-garden-city/",
      observedAt: RESEARCH_DATE,
    },
    {
      id: "evidence-mi-vida-amenities",
      status: "VERIFIED",
      claim: "Mi Vida Homes lists a club house, jogging track, heated swimming pool, BBQ deck with fitted kitchen, kids play area, secure parking and 24/7 security.",
      sourceName: "Mi Vida Homes",
      sourceReference: "https://mividahomes.com/developments/mi-vida-garden-city/",
      observedAt: RESEARCH_DATE,
    },
    {
      id: "evidence-mi-vida-phase",
      status: "SUPPORTED",
      claim: "Mi Vida Homes' historical project material identifies Phase 1 at Garden City and describes the wider development as green-space and family-living focused; the canonical Zalagren phase/building/unit inventory is not inferred from this marketing material.",
      sourceName: "Mi Vida Homes",
      sourceReference: "https://mividahomes.com/a-look-at-how-mi-vidas-first-open-day-went-down/",
      observedAt: RESEARCH_DATE,
      notes: "Use authoritative property records for exact phase/building/unit identities.",
    },
  ];

  const knownFeatures: MiVidaKnownFeature[] = [
    ["club-house", "Club house", "evidence-mi-vida-amenities"],
    ["jogging-track", "Jogging track", "evidence-mi-vida-amenities"],
    ["heated-pool", "Heated swimming pool", "evidence-mi-vida-amenities"],
    ["bbq-deck", "BBQ deck with fitted kitchen", "evidence-mi-vida-amenities"],
    ["kids-play-area", "Kids' play area", "evidence-mi-vida-amenities"],
    ["secure-parking", "Secure parking", "evidence-mi-vida-amenities"],
    ["security", "24/7 security", "evidence-mi-vida-amenities"],
  ].map(([key, label, sourceEvidenceId]) => ({
    key,
    label,
    evidenceStatus: "VERIFIED",
    sourceEvidenceId,
  }));

  return {
    community,
    primaryPlace,
    evidence,
    knownFeatures,
    uninstantiatedAreas: [
      "Exact phase inventory",
      "Building identities",
      "Unit inventory",
      "People and participants",
      "Owners and resident relationships",
      "Providers and service operators",
      "Relationships and contexts",
      "Capabilities and authorizations",
      "Visitor invitations and credentials",
      "Utility accounts and readings",
      "Operational events and evidence",
    ],
  };
}
