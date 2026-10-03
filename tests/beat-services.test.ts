import {
  getZalagrenProductService,
  ZALAGREN_PRODUCT_SERVICES,
} from "../services/zalagren-services";

if (ZALAGREN_PRODUCT_SERVICES.length !== 7) throw new Error("Beat service family must contain exactly seven services");

for (const service of ZALAGREN_PRODUCT_SERVICES) {
  if (!service.id || !service.name || !service.purpose) throw new Error("Beat service definition incomplete");
  if (service.requiresProvider && service.requiresAuthorization !== true) {
    throw new Error("Provider-facing Beat service must retain authorization");
  }
}

const pay = getZalagrenProductService("beatpay");
if (!pay || pay.externalRails?.includes("M-PESA") !== true) throw new Error("BeatPay rail definition missing");

const health = getZalagrenProductService("beathealth");
if (!health || health.category !== "HEALTH") throw new Error("BeatHealth definition missing");

const genzi = getZalagrenProductService("beatgenzi");
if (!genzi || !genzi.capabilities.includes("opportunity-discovery")) throw new Error("BeatGenzi definition missing");

const ride = getZalagrenProductService("beatride");
if (!ride || !ride.requiresProvider) throw new Error("BeatRide provider boundary missing");

const bnb = getZalagrenProductService("beatbnb");
if (!bnb || !bnb.capabilities.includes("host-guest-coordination")) throw new Error("BeatBnB definition missing");
