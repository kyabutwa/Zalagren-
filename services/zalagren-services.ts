export type ZalagrenProductServiceId =
  | "beatpay"
  | "beatfood"
  | "beathealth"
  | "beatgenzi"
  | "beatmarket"
  | "beatride"
  | "beatbnb"
  | "beatguardian"
  | "beatutilities";

export interface ZalagrenProductService {
  id: ZalagrenProductServiceId;
  name: string;
  purpose: string;
  category: string;
  capabilities: readonly string[];
  externalRails?: readonly string[];
  requiresProvider: boolean;
  requiresAuthorization: boolean;
  regulatoryBoundary: string;
  status: "SUPPORTED" | "PROPOSED";
}

export const ZALAGREN_PRODUCT_SERVICES: readonly ZalagrenProductService[] = [
  {
    id: "beatpay",
    name: "BeatPay",
    purpose: "Coordinate authorized payments, collections, disbursements and payment records through supported regulated payment rails.",
    category: "PAYMENTS",
    capabilities: ["payment-intent", "payment-request", "payment-status", "refund-coordination", "payment-evidence"],
    externalRails: ["M-PESA", "BANK"],
    requiresProvider: true,
    requiresAuthorization: true,
    regulatoryBoundary: "Zalagren coordinates payment workflows; it does not become a bank, mobile-money issuer or regulated payment institution merely by integrating a rail.",
    status: "SUPPORTED",
  },
  {
    id: "beatfood",
    name: "BeatFood",
    purpose: "Coordinate food discovery, ordering, provider fulfilment and delivery.",
    category: "FOOD",
    capabilities: ["food-discovery", "order", "provider-matching", "delivery-coordination", "order-evidence"],
    requiresProvider: true,
    requiresAuthorization: true,
    regulatoryBoundary: "Food providers remain responsible for applicable food-safety, licensing and fulfilment obligations.",
    status: "SUPPORTED",
  },
  {
    id: "beathealth",
    name: "BeatHealth",
    purpose: "Coordinate health-service discovery, appointments, providers, pharmacies, care workflows and health-related opportunities without replacing licensed clinical care.",
    category: "HEALTH",
    capabilities: ["provider-discovery", "appointment-coordination", "care-navigation", "pharmacy-coordination", "health-service-evidence"],
    requiresProvider: true,
    requiresAuthorization: true,
    regulatoryBoundary: "Health data and digital-health workflows require heightened privacy, security and applicable Kenyan health-law compliance. Zalagren must not present itself as a clinical provider without the required structure.",
    status: "SUPPORTED",
  },
  {
    id: "beatgenzi",
    name: "BeatGenzi",
    purpose: "Coordinate people, opportunities, jobs, providers, services and practical economic connections.",
    category: "OPPORTUNITY",
    capabilities: ["opportunity-discovery", "job-matching", "service-matching", "provider-discovery", "partnership-discovery", "strategy"],
    requiresProvider: false,
    requiresAuthorization: true,
    regulatoryBoundary: "Opportunity information is not a guarantee of employment, income, contract award or suitability.",
    status: "SUPPORTED",
  },
  {
    id: "beatmarket",
    name: "BeatMarket",
    purpose: "Coordinate legitimate buying, selling, service offers and demand/supply discovery.",
    category: "MARKETPLACE",
    capabilities: ["listing", "discovery", "request", "offer", "order-coordination", "transaction-evidence"],
    requiresProvider: true,
    requiresAuthorization: true,
    regulatoryBoundary: "Zalagren must apply category, seller, consumer-protection, tax and prohibited-goods rules appropriate to the jurisdiction.",
    status: "SUPPORTED",
  },
  {
    id: "beatride",
    name: "BeatRide",
    purpose: "Coordinate authorized mobility requests between participants and participating transport providers.",
    category: "MOBILITY",
    capabilities: ["ride-request", "provider-matching", "trip-coordination", "status", "trip-evidence"],
    requiresProvider: true,
    requiresAuthorization: true,
    regulatoryBoundary: "Transport operators remain responsible for applicable licensing, vehicle, driver, insurance and safety requirements.",
    status: "SUPPORTED",
  },
  {
    id: "beatbnb",
    name: "BeatBnB",
    purpose: "Coordinate short-stay and accommodation discovery, booking, host/guest relationships and stay workflows.",
    category: "ACCOMMODATION",
    capabilities: ["property-discovery", "availability", "booking-request", "host-guest-coordination", "stay-evidence"],
    requiresProvider: true,
    requiresAuthorization: true,
    regulatoryBoundary: "Hosts and operators remain responsible for applicable accommodation, tax, safety, lease and local regulatory requirements.",
    status: "SUPPORTED",
  },
  {
    id: "beatguardian",
    name: "BeatGuardian",
    purpose: "Coordinate trusted check-ins, safety incidents and contextual assistance without replacing emergency authorities.",
    category: "SAFETY",
    capabilities: ["trusted-check-in", "incident-coordination", "contextual-safety", "safety-evidence"],
    requiresProvider: false,
    requiresAuthorization: true,
    regulatoryBoundary: "A Zalagren coordination record is not proof that an emergency authority, responder or physical intervention occurred.",
    status: "SUPPORTED",
  },
  {
    id: "beatutilities",
    name: "BeatUtilities",
    purpose: "Coordinate water, electricity, gas, waste, energy and connectivity workflows against authoritative providers.",
    category: "UTILITIES",
    capabilities: ["utility-account-reference", "service-request", "provider-status", "utility-evidence"],
    requiresProvider: true,
    requiresAuthorization: true,
    regulatoryBoundary: "Utility providers remain authoritative for service state, meter data, billing and regulated obligations.",
    status: "SUPPORTED",
  },
];

export function getZalagrenProductService(id: ZalagrenProductServiceId) {
  return ZALAGREN_PRODUCT_SERVICES.find((service) => service.id === id);
}
