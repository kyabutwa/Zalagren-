export type BeatPayPalmMatchMethod = "ON_DEVICE_TEMPLATE" | "TRUSTED_BIOMETRIC_PROVIDER";
export type BeatPayPalmEnrollmentStatus = "PENDING" | "ACTIVE" | "REVOKED" | "EXPIRED";
export type BeatPayPalmPaymentState = "READY" | "MATCHED" | "AUTHORIZED" | "SUBMITTED" | "COMPLETED" | "FAILED";

export interface BeatPayPalmCredential {
  id: string;
  participantId: string;
  status: BeatPayPalmEnrollmentStatus;
  method: BeatPayPalmMatchMethod;
  templateReference: string;
  consentReference: string;
  enrolledAt: string;
  revokedAt?: string;
}

export interface BeatPayPalmMatch {
  credentialId: string;
  participantId: string;
  confidence: number;
  livenessPassed: boolean;
  matchedAt: string;
}

export interface BeatPayPalmPaymentContext {
  intentId: string;
  participantId: string;
  palmCredentialId: string;
  authorizationReference: string;
  amountMinor: number;
  currency: string;
  merchantReference: string;
  state: BeatPayPalmPaymentState;
}

export interface BeatPayPalmMatcher {
  match(input: { participantId: string; presentedPalm: unknown }): Promise<BeatPayPalmMatch>;
}

/**
 * Raw palm images/templates are deliberately outside this domain model.
 * A matcher returns a verified credential reference, not biometric material.
 */
export function createPalmPaymentContext(input: {
  intentId: string;
  participantId: string;
  palmCredential: BeatPayPalmCredential;
  authorizationReference: string;
  amountMinor: number;
  currency: string;
  merchantReference: string;
}): BeatPayPalmPaymentContext {
  if (input.palmCredential.status !== "ACTIVE") throw new Error("BeatPay palm credential is not active");
  if (input.palmCredential.participantId !== input.participantId) throw new Error("BeatPay palm credential participant mismatch");
  if (!input.palmCredential.consentReference.trim()) throw new Error("BeatPay palm consent reference is required");
  if (!input.authorizationReference.trim()) throw new Error("BeatPay authorization reference is required");
  if (!Number.isSafeInteger(input.amountMinor) || input.amountMinor <= 0) throw new Error("BeatPay amountMinor must be a positive safe integer");
  if (!/^[A-Z]{3}$/.test(input.currency)) throw new Error("BeatPay currency must be an ISO-style 3-letter code");
  return {
    intentId: input.intentId,
    participantId: input.participantId,
    palmCredentialId: input.palmCredential.id,
    authorizationReference: input.authorizationReference,
    amountMinor: input.amountMinor,
    currency: input.currency,
    merchantReference: input.merchantReference,
    state: "READY"
  };
}

export function authorizePalmMatch(
  context: BeatPayPalmPaymentContext,
  match: BeatPayPalmMatch
): BeatPayPalmPaymentContext {
  if (context.state !== "READY" && context.state !== "MATCHED") throw new Error("BeatPay palm payment is not awaiting biometric authorization");
  if (match.participantId !== context.participantId) throw new Error("BeatPay palm participant mismatch");
  if (match.credentialId !== context.palmCredentialId) throw new Error("BeatPay palm credential mismatch");
  if (!match.livenessPassed) throw new Error("BeatPay palm liveness check failed");
  if (!Number.isFinite(match.confidence) || match.confidence <= 0 || match.confidence > 1) throw new Error("BeatPay palm match confidence is invalid");
  return { ...context, state: "AUTHORIZED" };
}

export function assertNoRawBiometricMaterial(value: unknown): void {
  if (!value || typeof value !== "object") return;
  const forbidden = /palm.?image|raw.?biometric|biometric.?template|fingerprint|face.?embedding|iris.?template/i;
  for (const key of Object.keys(value as Record<string, unknown>)) {
    if (forbidden.test(key)) throw new Error("BeatPay must not persist raw biometric material in payment-domain objects");
  }
}
