import { Community, createCommunity } from "../community";
import { Place, createPlace } from "../../places/place";

export type TsavoEvidenceStatus = "VERIFIED" | "SUPPORTED" | "UNKNOWN";

export interface TsavoEvidence {
  id: string;
  status: TsavoEvidenceStatus;
  claim: string;
  sourceName: string;
  sourceReference: string;
  observedAt: string;
  notes?: string;
}

export interface TsavoKnownFeature {
  key: string;
  label: string;
  evidenceStatus: TsavoEvidenceStatus;
  sourceEvidenceId: string;
}

export interface TsavoInstance {
  community: Community;
  primaryPlace: Place;
  evidence: TsavoEvidence[];
  knownFeatures: TsavoKnownFeature[];
  uninstantiatedAreas: string[];
}

const RESEARCH_DATE = "2026-10-03T00:00:00.000Z";

export function instantiateTsavoRoyalSuburbs(): TsavoInstance {
  const community = createCommunity({
    id: "community-tsavo-royal-suburbs",
    name: "TSAVO Royal Suburbs",
    communityType: "APARTMENT",
    primaryPlaceId: "place-tsavo-royal-suburbs",
    governanceReference: "TSAVO_PROPERTY_GOVERNANCE_PENDING_VERIFICATION",
    createdAt: RESEARCH_DATE,
  });

  const primaryPlace = createPlace({
    id: "place-tsavo-royal-suburbs",
    placeType: "PROPERTY",
    name: "Royal Suburbs by TSAVO",
    communityId: community.id,
    address: "Roysambu, Nairobi, Kenya",
    createdAt: RESEARCH_DATE,
  });

  const evidence: TsavoEvidence[] = [
    {
      id: "evidence-tsavo-royal-suburbs-official",
      status: "VERIFIED",
      claim: "TSAVO publicly identifies Royal Suburbs as a Roysambu residential development with studio, one-bedroom and two-bedroom apartments and 400 units.",
      sourceName: "TSAVO",
      sourceReference: "https://tsavo.ke/property/royal-suburbs/",
      observedAt: RESEARCH_DATE,
    },
    {
      id: "evidence-tsavo-royal-suburbs-amenities",
      status: "VERIFIED",
      claim: "TSAVO lists elevators, roofteria, chillspots, laundromat, mini mart, borehole, parking, access control, cascading gardens, common-area generator, security cameras and beauty parlour for Royal Suburbs.",
      sourceName: "TSAVO",
      sourceReference: "https://tsavo.ke/property/royal-suburbs/",
      observedAt: RESEARCH_DATE,
    },
    {
      id: "evidence-tsavo-royal-suburbs-location",
      status: "SUPPORTED",
      claim: "Royal Suburbs is described by TSAVO as being along/near Lumumba Drive in Roysambu and between TRM Drive and Lumumba Drive.",
      sourceName: "TSAVO",
      sourceReference: "https://tsavo.ke/property/royal-suburbs/",
      observedAt: RESEARCH_DATE,
    },
    {
      id: "evidence-tsavo-royal-suburbs-phase",
      status: "SUPPORTED",
      claim: "Public references identify Royal Suburbs Phase 1 and a later Phase 4; exact canonical phase/building mapping is not assumed until verified from authoritative property records.",
      sourceName: "TSAVO / public property references",
      sourceReference: "https://tsavo.ke/tsavo-lifestyle/",
      observedAt: RESEARCH_DATE,
      notes: "Do not manufacture phase/building/unit identities from listings.",
    },
  ];

  const knownFeatures: TsavoKnownFeature[] = [
    ["elevators", "Elevators", "evidence-tsavo-royal-suburbs-amenities"],
    ["roofteria", "Roofteria", "evidence-tsavo-royal-suburbs-amenities"],
    ["chillspots", "Chillspots", "evidence-tsavo-royal-suburbs-amenities"],
    ["laundromat", "Laundromat", "evidence-tsavo-royal-suburbs-amenities"],
    ["mini-mart", "Mini mart", "evidence-tsavo-royal-suburbs-amenities"],
    ["borehole", "Borehole", "evidence-tsavo-royal-suburbs-amenities"],
    ["parking", "Ample parking", "evidence-tsavo-royal-suburbs-amenities"],
    ["access-control", "Access control", "evidence-tsavo-royal-suburbs-amenities"],
    ["gardens", "Cascading gardens", "evidence-tsavo-royal-suburbs-amenities"],
    ["generator", "Common-area generator", "evidence-tsavo-royal-suburbs-amenities"],
    ["security-cameras", "Security cameras", "evidence-tsavo-royal-suburbs-amenities"],
    ["beauty-parlour", "Beauty parlour", "evidence-tsavo-royal-suburbs-amenities"],
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
      "Individual phases",
      "Buildings",
      "Units",
      "People and participants",
      "Providers and service operators",
      "Relationships and contexts",
      "Capabilities and authorizations",
      "Visitor invitations and access credentials",
      "Utility accounts and readings",
      "Operational events and evidence",
    ],
  };
}
