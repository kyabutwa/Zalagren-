import type { Authorization, AuthorizationCheck, AuthorizationRequest } from "../core/authorization/authorization";
import { evaluateAuthorization } from "../core/authorization/authorization";
import type { Capability } from "../core/capability/capability";
import type { Context } from "../core/context/context";
import { createBeatPayIntent, type BeatPayPaymentIntent, type BeatPayRail, type BeatPayDirection } from "./beatpay";

export interface BeatPayAuthorizationTerms {
  authorizationId: string;
  paymentIntentId: string;
  participantId: string;
  serviceId: string;
  merchantId: string;
  contextId: string;
  amountMinor: number;
  currency: string;
}

export interface BeatPayAuthorizationTermsResolver {
  resolve(conditionsReference: string): Promise<BeatPayAuthorizationTerms | undefined>;
}

export type BeatPayAuthorizationGateReason =
  | AuthorizationCheck["reason"]
  | "SERVICE_MISMATCH"
  | "MERCHANT_MISMATCH"
  | "PAYMENT_INTENT_MISMATCH"
  | "AMOUNT_MISMATCH"
  | "CURRENCY_MISMATCH"
  | "CONDITIONS_REQUIRED"
  | "CONDITIONS_UNAVAILABLE"
  | "INVALID_PAYMENT_REQUEST";

export interface BeatPayAuthorizationGateRequest {
  participantId: string;
  paymentIntentId: string;
  serviceId: string;
  merchantId: string;
  capabilityId: string;
  contextId: string;
  amountMinor: number;
  currency: string;
  rail: BeatPayRail;
  direction: BeatPayDirection;
  at?: string;
}

export interface BeatPayAuthorizationGateResult {
  allowed: boolean;
  reason: BeatPayAuthorizationGateReason;
  authorizationReference?: string;
  paymentIntent?: BeatPayPaymentIntent;
}

/**
 * Hard BeatPay boundary: biometric recognition is not an authorization input.
 * Core authorization and its resolved payment conditions must match the request
 * before a BeatPay payment intent can be created.
 */
export async function authorizeBeatPayPayment(
  request: BeatPayAuthorizationGateRequest,
  authorization: Authorization | undefined,
  capability: Capability,
  context: Context | undefined,
  termsResolver: BeatPayAuthorizationTermsResolver,
): Promise<BeatPayAuthorizationGateResult> {
  if (
    !request.participantId.trim() || !request.paymentIntentId.trim() ||
    !request.serviceId.trim() || !request.merchantId.trim() ||
    !request.capabilityId.trim() || !request.contextId.trim() ||
    !Number.isSafeInteger(request.amountMinor) || request.amountMinor <= 0 ||
    !/^[A-Z]{3}$/.test(request.currency)
  ) {
    return { allowed: false, reason: "INVALID_PAYMENT_REQUEST" };
  }
  if (!authorization) return { allowed: false, reason: "AUTHORIZATION_NOT_ACTIVE" };
  if (!authorization.conditionsReference?.trim()) return { allowed: false, reason: "CONDITIONS_REQUIRED" };
  if (!context || context.id !== request.contextId || context.status !== "ACTIVE") {
    return { allowed: false, reason: "CONTEXT_MISMATCH" };
  }

  if (capability.key !== `beatpay.payment.${request.serviceId}`) {
    return { allowed: false, reason: "SERVICE_MISMATCH" };
  }

  const authorizationRequest: AuthorizationRequest = {
    participantId: request.participantId,
    capabilityId: request.capabilityId,
    targetEntityType: "PROVIDER",
    targetEntityId: request.merchantId,
    contextId: request.contextId,
    at: request.at,
  };
  const check = evaluateAuthorization(authorizationRequest, authorization, capability, context);
  if (!check.allowed) return { allowed: false, reason: check.reason };

  const terms = await termsResolver.resolve(authorization.conditionsReference);
  if (!terms) return { allowed: false, reason: "CONDITIONS_UNAVAILABLE" };

  if (terms.authorizationId !== authorization.id || terms.paymentIntentId !== request.paymentIntentId) {
    return { allowed: false, reason: "PAYMENT_INTENT_MISMATCH" };
  }
  if (terms.participantId !== request.participantId) return { allowed: false, reason: "PARTICIPANT_MISMATCH" };
  if (terms.serviceId !== request.serviceId) return { allowed: false, reason: "SERVICE_MISMATCH" };
  if (terms.merchantId !== request.merchantId) return { allowed: false, reason: "MERCHANT_MISMATCH" };
  if (terms.contextId !== request.contextId) return { allowed: false, reason: "CONTEXT_MISMATCH" };
  if (terms.amountMinor !== request.amountMinor) return { allowed: false, reason: "AMOUNT_MISMATCH" };
  if (terms.currency !== request.currency) return { allowed: false, reason: "CURRENCY_MISMATCH" };

  const paymentIntent = createBeatPayIntent({
    id: request.paymentIntentId,
    participantId: request.participantId,
    direction: request.direction,
    rail: request.rail,
    amountMinor: request.amountMinor,
    currency: request.currency,
    merchantReference: request.merchantId,
    authorizationReference: authorization.id,
    createdAt: request.at,
  });

  return { allowed: true, reason: "AUTHORIZED", authorizationReference: authorization.id, paymentIntent };
}
