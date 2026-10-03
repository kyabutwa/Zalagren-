import { closeCommunity, createCommunity } from "../communities/community";

const community = createCommunity({
  id: "community-1",
  name: "Example Community",
  communityType: "RESIDENTIAL",
  organizationId: "organization-1",
  primaryPlaceId: "place-1",
});

if (community.status !== "ACTIVE") throw new Error("Community must start ACTIVE");
if (community.organizationId !== "organization-1") throw new Error("Organization linkage must be preserved");
if ("memberIds" in community) throw new Error("Membership must be modeled through relationships");
if ("authorization" in community) throw new Error("Authorization must remain a separate domain");

const closed = closeCommunity(community, "2026-10-03T00:00:00.000Z");
if (closed.status !== "CLOSED") throw new Error("Community must close");
if (closed.id !== community.id) throw new Error("Community identity must survive closure");
if (closed.organizationId !== community.organizationId) throw new Error("Organization linkage must survive closure");
