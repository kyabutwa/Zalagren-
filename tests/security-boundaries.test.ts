import { evaluateAuthorization } from "../core/authorization/authorization";
import { createCapability } from "../core/capability/capability";
import { createAuthorization } from "../core/authorization/authorization";

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

const allowed = evaluateAuthorization(
  authorization,
  capability,
  {
    participantId: "participant-a",
    targetEntityType: "SERVICE",
    targetEntityId: "service-a",
    at: "2026-10-03T01:00:00.000Z",
  },
);
if (!allowed.authorized) throw new Error("Valid authorization must pass");

const mismatch = evaluateAuthorization(
  authorization,
  capability,
  {
    participantId: "participant-b",
    targetEntityType: "SERVICE",
    targetEntityId: "service-a",
    at: "2026-10-03T01:00:00.000Z",
  },
);
if (mismatch.authorized || mismatch.reason !== "PARTICIPANT_MISMATCH") {
  throw new Error("Authorization must fail closed for participant mismatch");
}

const targetMismatch = evaluateAuthorization(
  authorization,
  capability,
  {
    participantId: "participant-a",
    targetEntityType: "SERVICE",
    targetEntityId: "service-b",
    at: "2026-10-03T01:00:00.000Z",
  },
);
if (targetMismatch.authorized || targetMismatch.reason !== "TARGET_MISMATCH") {
  throw new Error("Authorization must fail closed for target mismatch");
}
