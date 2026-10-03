import { evaluateAuthorization, createAuthorization } from "../core/authorization/authorization";
import { createCapability } from "../core/capability/capability";

const capability = createCapability({
  id: "cap-security-test",
  key: "test.protected.action",
  name: "Protected test action",
  createdAt: "2026-10-03T00:00:00.000Z",
});

const authorization = createAuthorization({
  id: "auth-security-test",
  participantId: "participant-a",
  capabilityId: capability.id,
  targetEntityType: "SERVICE",
  targetEntityId: "service-a",
  grantedBy: "participant-governor",
  grantedAt: "2026-10-03T00:00:00.000Z",
  effectiveFrom: "2026-10-03T00:00:00.000Z",
});

const request = {
  participantId: "participant-a",
  capabilityId: capability.id,
  targetEntityType: "SERVICE",
  targetEntityId: "service-a",
  at: "2026-10-03T01:00:00.000Z",
};

const allowed = evaluateAuthorization(request, authorization, capability);
if (!allowed.allowed || allowed.reason !== "AUTHORIZED") {
  throw new Error("Valid authorization must pass");
}

const mismatch = evaluateAuthorization(
  { ...request, participantId: "participant-b" },
  authorization,
  capability,
);
if (mismatch.allowed || mismatch.reason !== "PARTICIPANT_MISMATCH") {
  throw new Error("Authorization must fail closed for participant mismatch");
}

const targetMismatch = evaluateAuthorization(
  { ...request, targetEntityId: "service-b" },
  authorization,
  capability,
);
if (targetMismatch.allowed || targetMismatch.reason !== "TARGET_MISMATCH") {
  throw new Error("Authorization must fail closed for target mismatch");
}
