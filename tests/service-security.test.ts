import { activateService, createService } from "../services/service";
import { createServiceRequest } from "../services/request";

const service = activateService(createService({
  id: "security-service",
  name: "Security Test Service",
  providerId: "provider-security",
}));

if (service.status !== "ACTIVE") throw new Error("Service activation failed");

const request = createServiceRequest({
  id: "security-request",
  serviceId: service.id,
  requesterParticipantId: "participant-security",
});

if (request.status !== "SUBMITTED") throw new Error("Service request should start as submitted");
if ("authorizationReference" in request && request.authorizationReference) {
  throw new Error("Submitted request must not invent authorization");
}
