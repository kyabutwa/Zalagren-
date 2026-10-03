export type ZalagrenServiceCategory =
  | "HOME"
  | "PROPERTY"
  | "MOBILITY"
  | "FOOD"
  | "LAUNDRY"
  | "HEALTH"
  | "WORK"
  | "EDUCATION"
  | "UTILITIES"
  | "SECURITY"
  | "PROFESSIONAL"
  | "COMMUNITY"
  | "OPPORTUNITY";

export interface ZalagrenServiceDefinition {
  id: string;
  name: string;
  category: ZalagrenServiceCategory;
  description: string;
  value: string;
  fulfilmentModes: Array<"ON_SITE" | "REMOTE" | "DELIVERY" | "HYBRID">;
  requiresProvider: boolean;
  requiresAuthorization: boolean;
  paymentMode: "NONE" | "QUOTE" | "FIXED_PRICE" | "METERED" | "SUBSCRIPTION" | "EXTERNAL_RAIL";
  status: "PROPOSED" | "READY_FOR_PROVIDER" | "ACTIVE";
}

export const ZALAGREN_SERVICE_CATALOG: readonly ZalagrenServiceDefinition[] = [
  {
    id: "service-home-cleaning",
    name: "Home Cleaning",
    category: "HOME",
    description: "Coordinate verified service requests for residential cleaning.",
    value: "Reduce the friction of finding, requesting and coordinating cleaning.",
    fulfilmentModes: ["ON_SITE"],
    requiresProvider: true,
    requiresAuthorization: true,
    paymentMode: "QUOTE",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-home-repair",
    name: "Home Repair",
    category: "PROPERTY",
    description: "Coordinate plumbing, electrical, appliance and general maintenance requests.",
    value: "Turn a maintenance need into a traceable service workflow.",
    fulfilmentModes: ["ON_SITE"],
    requiresProvider: true,
    requiresAuthorization: true,
    paymentMode: "QUOTE",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-laundry",
    name: "Laundry",
    category: "LAUNDRY",
    description: "Coordinate laundry pickup, processing and return where providers support it.",
    value: "Make recurring or one-off laundry coordination simple and traceable.",
    fulfilmentModes: ["ON_SITE", "DELIVERY"],
    requiresProvider: true,
    requiresAuthorization: true,
    paymentMode: "QUOTE",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-food",
    name: "Food",
    category: "FOOD",
    description: "Coordinate food requests with participating providers and delivery workflows.",
    value: "Connect legitimate food demand with available providers.",
    fulfilmentModes: ["DELIVERY", "ON_SITE"],
    requiresProvider: true,
    requiresAuthorization: true,
    paymentMode: "EXTERNAL_RAIL",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-mobility",
    name: "Mobility",
    category: "MOBILITY",
    description: "Coordinate authorized transport and mobility requests.",
    value: "Match mobility needs with available authorized providers.",
    fulfilmentModes: ["ON_SITE"],
    requiresProvider: true,
    requiresAuthorization: true,
    paymentMode: "QUOTE",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-property-maintenance",
    name: "Property Maintenance",
    category: "PROPERTY",
    description: "Coordinate building, common-area and Unit maintenance workflows.",
    value: "Create accountable maintenance coordination for participating communities.",
    fulfilmentModes: ["ON_SITE"],
    requiresProvider: true,
    requiresAuthorization: true,
    paymentMode: "QUOTE",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-utilities",
    name: "Utilities Coordination",
    category: "UTILITIES",
    description: "Coordinate water, electricity, gas and related utility requests without pretending to be the regulated utility.",
    value: "Give participants and communities a contextual coordination layer.",
    fulfilmentModes: ["REMOTE", "ON_SITE"],
    requiresProvider: true,
    requiresAuthorization: true,
    paymentMode: "METERED",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-community-operations",
    name: "Community Operations",
    category: "COMMUNITY",
    description: "Coordinate authorized requests, providers, places, incidents and operational work for participating communities.",
    value: "Turn community needs into accountable workflows.",
    fulfilmentModes: ["REMOTE", "ON_SITE", "HYBRID"],
    requiresProvider: true,
    requiresAuthorization: true,
    paymentMode: "SUBSCRIPTION",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-opportunity-finder",
    name: "Opportunity Finder",
    category: "OPPORTUNITY",
    description: "Identify relevant jobs, services, partnerships, training and other legitimate opportunities from available evidence and context.",
    value: "Convert context and verified signals into actionable opportunities.",
    fulfilmentModes: ["REMOTE"],
    requiresProvider: false,
    requiresAuthorization: false,
    paymentMode: "NONE",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-constantyna-intelligence",
    name: "CONSTANTYNA",
    category: "PROFESSIONAL",
    description: "Governed human-facing intelligence for explanation, research, comparison, strategy and service discovery.",
    value: "Help participants understand Zalagren and act through authorized workflows.",
    fulfilmentModes: ["REMOTE"],
    requiresProvider: false,
    requiresAuthorization: false,
    paymentMode: "SUBSCRIPTION",
    status: "READY_FOR_PROVIDER",
  },
  {
    id: "service-genesis-intelligence",
    name: "GENESIS",
    category: "PROFESSIONAL",
    description: "Contextual intelligence engine for observation, reasoning, proposals, measurement and learning.",
    value: "Transform evidence and context into governed proposals and measurable outcomes.",
    fulfilmentModes: ["REMOTE"],
    requiresProvider: false,
    requiresAuthorization: true,
    paymentMode: "SUBSCRIPTION",
    status: "READY_FOR_PROVIDER",
  },
] as const;

export function getZalagrenService(id: string): ZalagrenServiceDefinition | undefined {
  return ZALAGREN_SERVICE_CATALOG.find((service) => service.id === id);
}
