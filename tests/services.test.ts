import {
  activateService,
  authorizeServiceRequest,
  createService,
  createServiceRequest,
  evaluateServiceEligibility,
} from "../services";

const service = createService({
  id: "service-test-cleaning",
  name: "Residential Cleaning",
  providerId: "provider-test-cleaning",
  serviceAreaPlaceIds: ["place-test"],
  capabilityIds: ["capability-cleaning"],
  fulfilmentMode: "ON_SITE",
});

if (service.status !== "DRAFT") throw new Error("New service must start as DRAFT");
if (service.providerId !== "provider-test-cleaning") throw new Error("Service provider linkage failed");

const active = activateService(service);
if (active.status !== "ACTIVE") throw new Error("Service activation failed");

const requirement = {
  id: "req-test-id",
  serviceId: active.id,
  type: "ELIGIBILITY" as const,
  key: "resident-or-authorized-requester",
  description: "Requester must satisfy the service eligibility rule",
  required: true,
  active: true,
};

const eligibility = evaluateServiceEligibility(active.id, [requirement], []);
if (eligibility.eligible) throw new Error("Unsatisfied required eligibility must fail closed");

const request = createServiceRequest({
  id: "request-test",
  serviceId: active.id,
  requesterParticipantId: "participant-test",
  contextId: "context-test",
});
if (request.status !== "SUBMITTED") throw new Error("Service request creation failed");

if (active.status === "ACTIVE" && "authorization" in active)
  throw new Error("Service must never embed authorization");

if (request.status === "SUBMITTED") {
  const proposed = { ...request, status: "PROPOSED" as const, proposalReference: "proposal-test" };
  const authorized = authorizeServiceRequest(proposed, "authorization-test");
  if (authorized.status !== "AUTHORIZED") throw new Error("Service authorization reference was not attached");
}
