import { instantiateTsavoRoyalSuburbs } from "../communities/tsavo";

const instance = instantiateTsavoRoyalSuburbs();

if (instance.community.id !== "community-tsavo-royal-suburbs")
  throw new Error("TSAVO community identity is incorrect");

if (instance.community.primaryPlaceId !== "place-tsavo-royal-suburbs")
  throw new Error("TSAVO primary place linkage is incorrect");

if (instance.primaryPlace.communityId !== instance.community.id)
  throw new Error("TSAVO place must belong to the instantiated community");

if (instance.primaryPlace.placeType !== "PROPERTY")
  throw new Error("TSAVO primary place must be a property");

if (instance.evidence.length < 3)
  throw new Error("TSAVO instantiation must preserve research evidence");

if (!instance.knownFeatures.some((feature) => feature.key === "access-control"))
  throw new Error("Known TSAVO access-control feature must be represented as evidence");

if (!instance.uninstantiatedAreas.includes("Individual phases"))
  throw new Error("Unverified phase inventory must remain explicitly uninstantiated");

if ("authorization" in instance.community)
  throw new Error("Community must never contain embedded authorization");

if ("memberIds" in instance.community)
  throw new Error("Community membership must remain relationship-based");
