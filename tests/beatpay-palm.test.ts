import { createPalmPaymentContext, authorizePalmMatch, assertNoRawBiometricMaterial } from "../services/beatpay-palm";

test("palm payment binds the biometric credential to the participant", () => {
  const context = createPalmPaymentContext({
    intentId: "intent-1",
    participantId: "participant-1",
    palmCredential: {
      id: "palm-1",
      participantId: "participant-1",
      status: "ACTIVE",
      method: "ON_DEVICE_TEMPLATE",
      templateReference: "vault://palm/palm-1",
      consentReference: "consent-1",
      enrolledAt: new Date().toISOString()
    },
    authorizationReference: "auth-1",
    amountMinor: 1000,
    currency: "KES",
    merchantReference: "order-1"
  });
  expect(context.state).toBe("READY");
});

test("successful liveness and match create payment authorization, not money movement", () => {
  const context = createPalmPaymentContext({
    intentId: "intent-2",
    participantId: "participant-2",
    palmCredential: {
      id: "palm-2",
      participantId: "participant-2",
      status: "ACTIVE",
      method: "TRUSTED_BIOMETRIC_PROVIDER",
      templateReference: "provider-ref-2",
      consentReference: "consent-2",
      enrolledAt: new Date().toISOString()
    },
    authorizationReference: "auth-2",
    amountMinor: 2500,
    currency: "KES",
    merchantReference: "order-2"
  });
  const authorized = authorizePalmMatch(context, {
    credentialId: "palm-2",
    participantId: "participant-2",
    confidence: 0.99,
    livenessPassed: true,
    matchedAt: new Date().toISOString()
  });
  expect(authorized.state).toBe("AUTHORIZED");
});

test("raw biometric material is rejected", () => {
  expect(() => assertNoRawBiometricMaterial({ palmImage: "base64-data" })).toThrow();
  expect(() => assertNoRawBiometricMaterial({ templateReference: "vault://palm/1" })).not.toThrow();
});
