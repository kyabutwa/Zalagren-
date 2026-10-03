import { instantiateQwetuRuaraka } from "../communities/qwetu";

const instance = instantiateQwetuRuaraka();

if (instance.community.id !== "community-qwetu-ruaraka")
  throw new Error("Qwetu Ruaraka community identity is incorrect");

if (instance.community.primaryPlaceId !== "place-qwetu-ruaraka")
  throw new Error("Qwetu Ruaraka primary place linkage is incorrect");

if (instance.primaryPlace.communityId !== instance.community.id)
  throw new Error("Qwetu Ruaraka place must belong to the instantiated community");

if (instance.primaryPlace.placeType !== "PROPERTY")
  throw new Error("Qwetu Ruaraka primary place must be a property");

if (instance.evidence.length < 4)
  throw new Error("Qwetu Ruaraka instantiation must preserve research evidence");

if (!instance.knownFeatures.some((feature) => feature.key === "security"))
  throw new Error("Qwetu security feature must be represented as evidence");

if (!instance.uninstantiatedAreas.includes("Individual rooms or Units"))
  throw new Error("Unverified room inventory must remain explicitly uninstantiated");

if ("authorization" in instance.community)
  throw new Error("Community must never contain embedded authorization");

if ("memberIds" in instance.community)
  throw new Error("Community membership must remain relationship-based");
