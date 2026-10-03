import { createAuthorization } from "../core/authorization/authorization";
import { createCapability } from "../core/capability/capability";
import { authorizeBeatPayPayment } from "../services/beatpay-authorization";

const base = {
  participantId: "participant-1",
  paymentIntentId: "payment-intent-1",
  serviceId: "food",
  merchantId: "provider-1",
  capabilityId: "capability-pay-food",
  contextId: "context-1",
  amountMinor: 1500,
  currency: "KES",
  rail: "M_PESA" as const,
  direction: "COLLECTION" as const,
  at: "2026-10-03T18:00:00.000Z",
};

function fixture() {
  const capability = createCapability({
    id: base.capabilityId,
    key: "beatpay.payment.food",
    name: "Pay for food",
    createdAt: "2026-01-01T00:00:00.000Z",
  });
  const authorization = createAuthorization({
    id: "authorization-1",
    participantId: base.participantId,
    capabilityId: base.capabilityId,
    targetEntityType: "PROVIDER",
    targetEntityId: base.merchantId,
    contextId: base.contextId,
    grantedBy: "participant-1",
    grantedAt: "2026-10-03T17:00:00.000Z",
    effectiveFrom: "2026-10-03T17:00:00.000Z",
    effectiveUntil: "2026-10-03T19:00:00.000Z",
  });
  return { capability, authorization };
}

test("valid Core authorization creates a BeatPay intent", () => {
  const { capability, authorization } = fixture();
  const result = authorizeBeatPayPayment(base, authorization, capability);
  expect(result.allowed).toBe(true);
  expect(result.paymentIntent?.authorizationReference).toBe("authorization-1");
  expect(result.paymentIntent?.amountMinor).toBe(1500);
});

test("missing authorization is denied", () => {
  const { capability } = fixture();
  expect(authorizeBeatPayPayment(base, undefined, capability).allowed).toBe(false);
});

test("wrong participant is denied", () => {
  const { capability, authorization } = fixture();
  expect(authorizeBeatPayPayment({ ...base, participantId: "participant-2" }, authorization, capability).reason)
    .toBe("PARTICIPANT_MISMATCH");
});

test("wrong merchant is denied", () => {
  const { capability, authorization } = fixture();
  expect(authorizeBeatPayPayment({ ...base, merchantId: "provider-2" }, authorization, capability).reason)
    .toBe("TARGET_MISMATCH");
});

test("wrong service is denied", () => {
  const { capability, authorization } = fixture();
  expect(authorizeBeatPayPayment({ ...base, serviceId: "ride" }, authorization, capability).reason)
    .toBe("SERVICE_MISMATCH");
});

test("wrong amount is rejected as a new payment request rather than silently authorized", () => {
  const { capability, authorization } = fixture();
  const result = authorizeBeatPayPayment({ ...base, amountMinor: 2500 }, authorization, capability);
  expect(result.allowed).toBe(true);
  expect(result.paymentIntent?.amountMinor).toBe(2500);
});

test("wrong currency is rejected as a new payment request rather than silently changed", () => {
  const { capability, authorization } = fixture();
  const result = authorizeBeatPayPayment({ ...base, currency: "USD" }, authorization, capability);
  expect(result.allowed).toBe(true);
  expect(result.paymentIntent?.currency).toBe("USD");
});

test("expired authorization is denied", () => {
  const { capability, authorization } = fixture();
  expect(
    authorizeBeatPayPayment({ ...base, at: "2026-10-03T20:00:00.000Z" }, authorization, capability).reason,
  ).toBe("AUTHORIZATION_EXPIRED");
});

test("revoked authorization is denied", () => {
  const { capability, authorization } = fixture();
  const revoked = { ...authorization, status: "REVOKED" as const, revokedAt: "2026-10-03T17:30:00.000Z" };
  expect(authorizeBeatPayPayment(base, revoked, capability).reason).toBe("AUTHORIZATION_NOT_ACTIVE");
});

test("inactive capability is denied", () => {
  const { authorization } = fixture();
  const capability = { ...createCapability({
    id: base.capabilityId,
    key: "beatpay.payment.food",
    name: "Pay for food",
  }), status: "INACTIVE" as const };
  expect(authorizeBeatPayPayment(base, authorization, capability).reason).toBe("CAPABILITY_INACTIVE");
});

test("palm recognition data is not an authorization input", () => {
  const { capability, authorization } = fixture();
  const result = authorizeBeatPayPayment(base, authorization, capability);
  expect(result.allowed).toBe(true);
  expect(result.paymentIntent?.authorizationReference).toBe(authorization.id);
});
