import type { Authorization, AuthorizationCheck, AuthorizationRequest } from "../core/authorization/authorization";
import { evaluateAuthorization } from "../core/authorization/authorization";
import type { Capability } from "../core/capability/capability";
import type { Context } from "../core/context/context";
import { createBeatPayIntent, type BeatPayPaymentIntent, type BeatPayRail, type BeatPayDirection } from "./beatpay";

export type BeatPayAuthorizationGateReason =
  | AuthorizationCheck["reason"]
  | "SERVICE_MISMATCH"
  | "MERCHANT_MISMATCH"
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
 * BeatPay's hard authorization boundary.
 *
 * A biometric match is intentionally absent from this function: recognition can
 * identify a participant, but only Core authorization can permit a payment.
 * The authorization must bind the participant, capability, merchant target and
 * active context. The capability key must explicitly bind the payment to the
 * requested Zalagren service.
 */
export function authorizeBeatPayPayment(
  request: BeatPayAuthorizationGateRequest,
  authorization: Authorization | undefined,
  capability: Capability,
  context?: Context,
): BeatPayAuthorizationGateResult {
  if (
    !request.participantId.trim() ||
    !request.paymentIntentId.trim() ||
    !request.serviceId.trim() ||
    !request.merchantId.trim() ||
    !request.capabilityId.trim() ||
    !request.contextId.trim() ||
    !Number.isSafeInteger(request.amountMinor) ||
    request.amountMinor <= 0 ||
    !/^[A-Z]{3}$/.test(request.currency)
  ) {
    return { allowed: false, reason: "INVALID_PAYMENT_REQUEST" };
  }

  if (!authorization) {
    return { allowed: false, reason: "AUTHORIZATION_NOT_ACTIVE" };
  }

  const expectedCapabilityKey = `beatpay.payment.${request.serviceId}`;
  if (capability.key !== expectedCapabilityKey) {
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
  if (!check.allowed) {
    return { allowed: false, reason: check.reason };
  }

  if (authorization.targetEntityType !== "PROVIDER" || authorization.targetEntityId !== request.merchantId) {
    return { allowed: false, reason: "MERCHANT_MISMATCH" };
  }

  if (authorization.contextId !== request.contextId) {
    return { allowed: false, reason: "CONTEXT_MISMATCH" };
  }

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

  return {
    allowed: true,
    reason: "AUTHORIZED",
    authorizationReference: authorization.id,
    paymentIntent,
  };
}
