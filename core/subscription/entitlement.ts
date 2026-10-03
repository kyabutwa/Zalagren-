export type EntitlementStatus = "ACTIVE" | "SUSPENDED" | "EXPIRED" | "REVOKED";

export interface Entitlement {
  id: string;
  accountId: string;
  subscriptionId?: string;
  capabilityKey: string;
  scope?: string;
  status: EntitlementStatus;
  effectiveFrom: string;
  effectiveUntil?: string;
  source: string;
}

export interface CreateEntitlementInput {
  id: string;
  accountId: string;
  subscriptionId?: string;
  capabilityKey: string;
  scope?: string;
  effectiveFrom?: string;
  effectiveUntil?: string;
  source: string;
}

export function createEntitlement(input: CreateEntitlementInput): Entitlement {
  for (const key of ["id", "accountId", "capabilityKey", "source"] as const) {
    if (!input[key].trim()) throw new Error(`Entitlement ${key} is required`);
  }
  const effectiveFrom = input.effectiveFrom ?? new Date().toISOString();
  if (input.effectiveUntil && effectiveFrom > input.effectiveUntil) {
    throw new Error("Entitlement effectiveUntil cannot precede effectiveFrom");
  }
  return { ...input, status: "ACTIVE", effectiveFrom };
}

export function revokeEntitlement(entitlement: Entitlement): Entitlement {
  return { ...entitlement, status: "REVOKED" };
}

export function isEntitlementActive(entitlement: Entitlement, at = new Date().toISOString()): boolean {
  if (entitlement.status !== "ACTIVE") return false;
  if (at < entitlement.effectiveFrom) return false;
  if (entitlement.effectiveUntil && at > entitlement.effectiveUntil) return false;
  return true;
}
