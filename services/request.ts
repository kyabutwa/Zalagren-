export type ServiceRequestStatus =
  | "DRAFT" | "SUBMITTED" | "PROPOSED" | "AUTHORIZED"
  | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  | "REJECTED" | "DISPUTED" | "FAILED";

export interface ServiceRequest {
  id: string;
  serviceId: string;
  requesterParticipantId: string;
  contextId?: string;
  intentReference?: string;
  proposalReference?: string;
  authorizationReference?: string;
  status: ServiceRequestStatus;
  requestedAt: string;
  scheduledFor?: string;
  completedAt?: string;
  failureCode?: string;
}

export interface CreateServiceRequestInput {
  id: string;
  serviceId: string;
  requesterParticipantId: string;
  contextId?: string;
  intentReference?: string;
  requestedAt?: string;
}

export function createServiceRequest(input: CreateServiceRequestInput): ServiceRequest {
  if (!input.id.trim()) throw new Error("Service request id is required");
  if (!input.serviceId.trim()) throw new Error("Service id is required");
  if (!input.requesterParticipantId.trim()) throw new Error("Requester participant id is required");

  return {
    id: input.id,
    serviceId: input.serviceId,
    requesterParticipantId: input.requesterParticipantId,
    contextId: input.contextId,
    intentReference: input.intentReference,
    status: "SUBMITTED",
    requestedAt: input.requestedAt ?? new Date().toISOString(),
  };
}

export function authorizeServiceRequest(
  request: ServiceRequest,
  authorizationReference: string,
): ServiceRequest {
  if (request.status !== "PROPOSED") throw new Error("Only proposed service requests can be authorized");
  if (!authorizationReference.trim()) throw new Error("Authorization reference is required");
  return { ...request, status: "AUTHORIZED", authorizationReference };
}

export function completeServiceRequest(
  request: ServiceRequest,
  completedAt = new Date().toISOString(),
): ServiceRequest {
  if (request.status !== "IN_PROGRESS" && request.status !== "SCHEDULED") {
    throw new Error("Only scheduled or in-progress service requests can be completed");
  }
  return { ...request, status: "COMPLETED", completedAt };
}
