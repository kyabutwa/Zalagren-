import { getZalagrenService, ZALAGREN_SERVICE_CATALOG } from "../services/catalog";

if (ZALAGREN_SERVICE_CATALOG.length < 10) throw new Error("Initial Zalagren service catalog is incomplete");

for (const service of ZALAGREN_SERVICE_CATALOG) {
  if (!service.id || !service.name || !service.description) throw new Error("Service definition is incomplete");
  if (service.requiresProvider && service.status === "ACTIVE") {
    throw new Error("A provider-dependent service cannot be active without provider verification");
  }
}

const cleaning = getZalagrenService("service-home-cleaning");
if (!cleaning || cleaning.category !== "HOME") throw new Error("Home Cleaning catalog entry missing");

const intelligence = getZalagrenService("service-constantyna-intelligence");
if (!intelligence || intelligence.requiresProvider) throw new Error("CONSTANTYNA service definition is invalid");

const genesis = getZalagrenService("service-genesis-intelligence");
if (!genesis || !genesis.requiresAuthorization) throw new Error("GENESIS must retain authorization boundaries");
