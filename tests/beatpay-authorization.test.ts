import { createAuthorization } from "../core/authorization/authorization";
import { createCapability } from "../core/capability/capability";
import { createContext } from "../core/context/context";
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
    conditionsReference: "conditions-payment-1",
  });
  const context = createContext({ id: base.contextId, contextType: "PAYMENT", participantId: base.participantId, startAt: "2026-10-03T17:00:00.000Z" });
  const termsResolver = {
    resolve: async (reference: string) =>
      reference === "conditions-payment-1"
        ? {
            authorizationId: authorization.id,
            paymentIntentId: base.paymentIntentId,
            participantId: base.participantId,
            serviceId: base.serviceId,
            merchantId: base.merchantId,
            contextId: base.contextId,
            amountMinor: base.amountMinor,
            currency: base.currency,
          }
        : undefined,
  };
  return { capability, authorization, context, termsResolver };
}

test("valid Core authorization creates a BeatPay intent", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  const result = await authorizeBeatPayPayment(base, authorization, capability, context, termsResolver);
  expect(result.allowed).toBe(true);
  expect(result.paymentIntent?.authorizationReference).toBe("authorization-1");
  expect(result.paymentIntent?.amountMinor).toBe(1500);
});

test("missing authorization is denied", async () => {
  const { capability, context, termsResolver } = fixture();
  expect((await authorizeBeatPayPayment(base, undefined, capability, context, termsResolver)).allowed).toBe(false);
});

test("wrong participant is denied", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  expect((await authorizeBeatPayPayment({ ...base, participantId: "participant-2" }, authorization, capability, context, termsResolver)).reason)
    .toBe("PARTICIPANT_MISMATCH");
});

test("wrong merchant is denied", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  expect((await authorizeBeatPayPayment({ ...base, merchantId: "provider-2" }, authorization, capability, context, termsResolver)).reason)
    .toBe("TARGET_MISMATCH");
});

test("wrong service is denied", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  expect((await authorizeBeatPayPayment({ ...base, serviceId: "ride" }, authorization, capability, context, termsResolver)).reason)
    .toBe("SERVICE_MISMATCH");
});

test("wrong amount is denied by Core-resolved payment terms", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  expect((await authorizeBeatPayPayment({ ...base, amountMinor: 2500 }, authorization, capability, context, termsResolver)).reason)
    .toBe("AMOUNT_MISMATCH");
});

test("wrong currency is denied by Core-resolved payment terms", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  expect((await authorizeBeatPayPayment({ ...base, currency: "USD" }, authorization, capability, context, termsResolver)).reason)
    .toBe("CURRENCY_MISMATCH");
});

test("expired authorization is denied", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  expect((await authorizeBeatPayPayment({ ...base, at: "2026-10-03T20:00:00.000Z" }, authorization, capability, context, termsResolver)).reason)
    .toBe("AUTHORIZATION_EXPIRED");
});

test("revoked authorization is denied", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  const revoked = { ...authorization, status: "REVOKED" as const, revokedAt: "2026-10-03T17:30:00.000Z" };
  expect((await authorizeBeatPayPayment(base, revoked, capability, context, termsResolver)).reason).toBe("AUTHORIZATION_NOT_ACTIVE");
});

test("inactive capability is denied", async () => {
  const { authorization, context, termsResolver } = fixture();
  const capability = {
    ...createCapability({ id: base.capabilityId, key: "beatpay.payment.food", name: "Pay for food" }),
    status: "INACTIVE" as const,
  };
  expect((await authorizeBeatPayPayment(base, authorization, capability, context, termsResolver)).reason).toBe("CAPABILITY_INACTIVE");
});

test("missing payment conditions are denied", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  const withoutConditions = { ...authorization, conditionsReference: undefined };
  expect((await authorizeBeatPayPayment(base, withoutConditions, capability, context, termsResolver)).reason)
    .toBe("CONDITIONS_REQUIRED");
});

test("palm recognition is not an authorization input", async () => {
  const { capability, authorization, context, termsResolver } = fixture();
  const result = await authorizeBeatPayPayment(base, authorization, capability, context, termsResolver);
  expect(result.allowed).toBe(true);
  expect(result.paymentIntent?.authorizationReference).toBe(authorization.id);
});
