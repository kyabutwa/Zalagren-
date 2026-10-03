import { instantiateMiVidaGardenCity } from "../communities/mivida";

const instance = instantiateMiVidaGardenCity();

if (instance.community.id !== "community-mi-vida-garden-city")
  throw new Error("Mi Vida community identity is incorrect");

if (instance.community.primaryPlaceId !== "place-mi-vida-garden-city")
  throw new Error("Mi Vida primary place linkage is incorrect");

if (instance.primaryPlace.communityId !== instance.community.id)
  throw new Error("Mi Vida place must belong to the instantiated community");

if (instance.primaryPlace.placeType !== "PROPERTY")
  throw new Error("Mi Vida primary place must be a property");

if (instance.evidence.length < 3)
  throw new Error("Mi Vida instantiation must preserve research evidence");

if (!instance.knownFeatures.some((feature) => feature.key === "security"))
  throw new Error("Mi Vida security feature must be represented as evidence");

if (!instance.uninstantiatedAreas.includes("Building identities"))
  throw new Error("Unverified building inventory must remain explicitly uninstantiated");

if ("authorization" in instance.community)
  throw new Error("Community must never contain embedded authorization");

if ("memberIds" in instance.community)
  throw new Error("Community membership must remain relationship-based");
