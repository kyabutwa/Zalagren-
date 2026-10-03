import { createCommunity, type Community } from "../community";
import { createPlace, type Place } from "../../places/place";

export type QwetuEvidenceStatus = "VERIFIED" | "SUPPORTED" | "UNKNOWN";

export interface QwetuEvidence {
  id: string;
  status: QwetuEvidenceStatus;
  claim: string;
  sourceName: string;
  sourceReference: string;
  observedAt: string;
  notes?: string;
}

export interface QwetuKnownFeature {
  key: string;
  name: string;
  evidenceIds: string[];
}

export interface QwetuInstance {
  community: Community;
  primaryPlace: Place;
  evidence: QwetuEvidence[];
  knownFeatures: QwetuKnownFeature[];
  uninstantiatedAreas: string[];
}

export function instantiateQwetuRuaraka(): QwetuInstance {
  const observedAt = "2026-10-03T00:00:00.000Z";

  const community = createCommunity({
    id: "community-qwetu-ruaraka",
    name: "Qwetu Ruaraka",
    communityType: "INSTITUTION",
    primaryPlaceId: "place-qwetu-ruaraka",
    governanceReference: "QWETU_PROPERTY_GOVERNANCE_PENDING_VERIFICATION",
    createdAt: observedAt,
  });

  const primaryPlace = createPlace({
    id: "place-qwetu-ruaraka",
    name: "Qwetu Ruaraka",
    placeType: "PROPERTY",
    communityId: community.id,
    address: "Outer Ring Road, Nairobi, Kenya",
    createdAt: observedAt,
  });

  const evidence: QwetuEvidence[] = [
    {
      id: "evidence-qwetu-ruaraka-official-residence",
      status: "VERIFIED",
      claim: "Qwetu identifies Ruaraka as one of its student residences in Nairobi.",
      sourceName: "Qwetu",
      sourceReference: "https://qwetu.co.ke/",
      observedAt,
    },
    {
      id: "evidence-qwetu-ruaraka-portfolio",
      status: "SUPPORTED",
      claim: "The ASA I-REIT 2024 annual report identifies Qwetu Ruaraka as an ASA I-REIT property with 580 beds.",
      sourceName: "Acorn Holdings Africa / ASA I-REIT",
      sourceReference: "https://acornholdingsafrica.com/wp-content/uploads/2025/06/ASA-I-REIT-2024-Annual-Report.pdf",
      observedAt,
    },
    {
      id: "evidence-qwetu-ruaraka-security",
      status: "VERIFIED",
      claim: "Qwetu states that its residences use 24/7 security, CCTV, trained security personnel, key-card access and VIZMO visitor management.",
      sourceName: "Qwetu FAQ",
      sourceReference: "https://www.qwetu.co.ke/faqs",
      observedAt,
    },
    {
      id: "evidence-qwetu-ruaraka-services",
      status: "VERIFIED",
      claim: "Qwetu states that residence rent includes furnished rooms, Wi-Fi, study and recreation spaces, water, garbage collection, backup generators and security, with additional resident services.",
      sourceName: "Qwetu FAQ",
      sourceReference: "https://www.qwetu.co.ke/faqs",
      observedAt,
    },
    {
      id: "evidence-qwetu-ruaraka-shuttle",
      status: "VERIFIED",
      claim: "Qwetu states that its Jogoo Road and Ruaraka residences offer free shuttle services to nearby campuses.",
      sourceName: "Qwetu FAQ",
      sourceReference: "https://www.qwetu.co.ke/faqs",
      observedAt,
    },
  ];

  const knownFeatures: QwetuKnownFeature[] = [
    { key: "student-residence", name: "Student accommodation", evidenceIds: [evidence[0].id] },
    { key: "security", name: "24/7 security, CCTV and controlled access", evidenceIds: [evidence[2].id] },
    { key: "resident-services", name: "Resident amenities and included services", evidenceIds: [evidence[3].id] },
    { key: "campus-shuttle", name: "Campus shuttle service", evidenceIds: [evidence[4].id] },
  ];

  return {
    community,
    primaryPlace,
    evidence,
    knownFeatures,
    uninstantiatedAreas: [
      "Individual phases",
      "Building identities",
      "Individual rooms or Units",
      "People and Participants",
      "Resident, staff and visitor relationships",
      "Contexts",
      "Providers and service operators",
      "Capabilities and authorizations",
      "Visitor invitations and credentials",
      "Utility accounts and readings",
      "Operational events and evidence",
    ],
  };
}
