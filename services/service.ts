export type ServiceStatus = "DRAFT" | "ACTIVE" | "SUSPENDED" | "INACTIVE" | "CLOSED";

export type ServiceFulfilmentMode = "ON_SITE" | "REMOTE" | "DELIVERY" | "HYBRID";

export interface Service {
  id: string;
  name: string;
  description?: string;
  status: ServiceStatus;
  providerId: string;
  organizationId?: string;
  serviceAreaPlaceIds: string[];
  capabilityIds: string[];
  eligibilityReference?: string;
  qualificationReference?: string;
  pricingReference?: string;
  availabilityReference?: string;
  safetyReference?: string;
  legalRequirementsReference?: string;
  cancellationReference?: string;
  refundReference?: string;
  disputeReference?: string;
  dataRequirementsReference?: string;
  fulfilmentMode: ServiceFulfilmentMode;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceInput {
  id: string;
  name: string;
  providerId: string;
  description?: string;
  organizationId?: string;
  serviceAreaPlaceIds?: string[];
  capabilityIds?: string[];
  eligibilityReference?: string;
  qualificationReference?: string;
  pricingReference?: string;
  availabilityReference?: string;
  safetyReference?: string;
  legalRequirementsReference?: string;
  cancellationReference?: string;
  refundReference?: string;
  disputeReference?: string;
  dataRequirementsReference?: string;
  fulfilmentMode?: ServiceFulfilmentMode;
  createdAt?: string;
}

function requireText(value: string, field: string): void {
  if (!value.trim()) throw new Error(`${field} is required`);
}

export function createService(input: CreateServiceInput): Service {
  requireText(input.id, "Service id");
  requireText(input.name, "Service name");
  requireText(input.providerId, "Provider id");

  const now = input.createdAt ?? new Date().toISOString();
  return {
    id: input.id,
    name: input.name,
    description: input.description,
    status: "DRAFT",
    providerId: input.providerId,
    organizationId: input.organizationId,
    serviceAreaPlaceIds: [...(input.serviceAreaPlaceIds ?? [])],
    capabilityIds: [...(input.capabilityIds ?? [])],
    eligibilityReference: input.eligibilityReference,
    qualificationReference: input.qualificationReference,
    pricingReference: input.pricingReference,
    availabilityReference: input.availabilityReference,
    safetyReference: input.safetyReference,
    legalRequirementsReference: input.legalRequirementsReference,
    cancellationReference: input.cancellationReference,
    refundReference: input.refundReference,
    disputeReference: input.disputeReference,
    dataRequirementsReference: input.dataRequirementsReference,
    fulfilmentMode: input.fulfilmentMode ?? "ON_SITE",
    createdAt: now,
    updatedAt: now,
  };
}

export function activateService(service: Service, at = new Date().toISOString()): Service {
  if (service.status !== "DRAFT" && service.status !== "SUSPENDED") {
    throw new Error("Only draft or suspended services can be activated");
  }
  return { ...service, status: "ACTIVE", updatedAt: at };
}

export function suspendService(service: Service, at = new Date().toISOString()): Service {
  if (service.status !== "ACTIVE") throw new Error("Only active services can be suspended");
  return { ...service, status: "SUSPENDED", updatedAt: at };
}

export function closeService(service: Service, at = new Date().toISOString()): Service {
  if (service.status === "CLOSED") return service;
  return { ...service, status: "CLOSED", updatedAt: at };
}
