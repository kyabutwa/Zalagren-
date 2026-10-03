import type { Capability } from "../capability/capability";
import type { Context } from "../context/context";

export type AuthorizationStatus =
  | "ACTIVE"
  | "REVOKED"
  | "EXPIRED"
  | "SUSPENDED";

export interface Authorization {
  id: string;
  participantId: string;
  capabilityId: string;
  targetEntityType: string;
  targetEntityId: string;
  contextId?: string;
  purpose?: string;
  status: AuthorizationStatus;
  grantedBy: string;
  grantedAt: string;
  effectiveFrom: string;
  effectiveUntil?: string;
  revokedAt?: string;
  revocationReason?: string;
  policyReference?: string;
  conditionsReference?: string;
}

export interface CreateAuthorizationInput {
  id: string;
  participantId: string;
  capabilityId: string;
  targetEntityType: string;
  targetEntityId: string;
  contextId?: string;
  purpose?: string;
  grantedBy: string;
  grantedAt?: string;
  effectiveFrom?: string;
  effectiveUntil?: string;
  policyReference?: string;
  conditionsReference?: string;
}

export function createAuthorization(
  input: CreateAuthorizationInput,
): Authorization {
  for (const key of [
    "id",
    "participantId",
    "capabilityId",
    "targetEntityType",
    "targetEntityId",
    "grantedBy",
  ] as const) {
    if (!input[key].trim()) throw new Error(`Authorization ${key} is required`);
  }

  const now = input.grantedAt ?? new Date().toISOString();
  const effectiveFrom = input.effectiveFrom ?? now;
  if (input.effectiveUntil && effectiveFrom > input.effectiveUntil) {
    throw new Error("Authorization effectiveUntil cannot precede effectiveFrom");
  }

  return {
    ...input,
    status: "ACTIVE",
    grantedAt: now,
    effectiveFrom,
  };
}

export function revokeAuthorization(
  authorization: Authorization,
  at = new Date().toISOString(),
  reason?: string,
): Authorization {
  return {
    ...authorization,
    status: "REVOKED",
    revokedAt: at,
    revocationReason: reason,
  };
}

export interface AuthorizationCheck {
  allowed: boolean;
  reason:
    | "AUTHORIZED"
    | "CAPABILITY_INACTIVE"
    | "AUTHORIZATION_NOT_ACTIVE"
    | "AUTHORIZATION_NOT_YET_EFFECTIVE"
    | "AUTHORIZATION_EXPIRED"
    | "CONTEXT_REQUIRED"
    | "CONTEXT_MISMATCH"
    | "TARGET_MISMATCH"
    | "PARTICIPANT_MISMATCH";
}

export interface AuthorizationRequest {
  participantId: string;
  capabilityId: string;
  targetEntityType: string;
  targetEntityId: string;
  contextId?: string;
  at?: string;
}

export function evaluateAuthorization(
  request: AuthorizationRequest,
  authorization: Authorization,
  capability: Capability,
  context?: Context,
): AuthorizationCheck {
  const at = request.at ?? new Date().toISOString();

  if (authorization.participantId !== request.participantId) {
    return { allowed: false, reason: "PARTICIPANT_MISMATCH" };
  }
  if (authorization.capabilityId !== request.capabilityId || capability.id !== request.capabilityId) {
    return { allowed: false, reason: "CAPABILITY_INACTIVE" };
  }
  if (capability.status !== "ACTIVE") {
    return { allowed: false, reason: "CAPABILITY_INACTIVE" };
  }
  if (authorization.status !== "ACTIVE") {
    return {
      allowed: false,
      reason:
        authorization.status === "EXPIRED"
          ? "AUTHORIZATION_EXPIRED"
          : "AUTHORIZATION_NOT_ACTIVE",
    };
  }
  if (at < authorization.effectiveFrom) {
    return { allowed: false, reason: "AUTHORIZATION_NOT_YET_EFFECTIVE" };
  }
  if (authorization.effectiveUntil && at > authorization.effectiveUntil) {
    return { allowed: false, reason: "AUTHORIZATION_EXPIRED" };
  }
  if (
    authorization.targetEntityType !== request.targetEntityType ||
    authorization.targetEntityId !== request.targetEntityId
  ) {
    return { allowed: false, reason: "TARGET_MISMATCH" };
  }

  if (authorization.contextId) {
    if (!request.contextId) return { allowed: false, reason: "CONTEXT_REQUIRED" };
    if (request.contextId !== authorization.contextId) {
      return { allowed: false, reason: "CONTEXT_MISMATCH" };
    }
    if (context) {
      if (context.id !== request.contextId || context.status !== "ACTIVE") {
        return { allowed: false, reason: "CONTEXT_MISMATCH" };
      }
      if (context.participantId && context.participantId !== request.participantId) {
        return { allowed: false, reason: "PARTICIPANT_MISMATCH" };
      }
    }
  }

  return { allowed: true, reason: "AUTHORIZED" };
}
