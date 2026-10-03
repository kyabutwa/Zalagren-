export type GovernanceDecisionStatus =
  | "PROPOSED"
  | "APPROVED"
  | "REJECTED"
  | "REVOKED"
  | "EXPIRED";

export interface GovernanceDecision {
  id: string;
  scopeEntityType: string;
  scopeEntityId: string;
  decisionType: string;
  proposalReference?: string;
  decidedByParticipantId: string;
  status: GovernanceDecisionStatus;
  rationale?: string;
  effectiveFrom: string;
  effectiveUntil?: string;
  createdAt: string;
}

export interface CreateGovernanceDecisionInput {
  id: string;
  scopeEntityType: string;
  scopeEntityId: string;
  decisionType: string;
  proposalReference?: string;
  decidedByParticipantId: string;
  rationale?: string;
  effectiveFrom?: string;
  effectiveUntil?: string;
  createdAt?: string;
}

export function createGovernanceDecision(
  input: CreateGovernanceDecisionInput,
): GovernanceDecision {
  for (const key of [
    "id",
    "scopeEntityType",
    "scopeEntityId",
    "decisionType",
    "decidedByParticipantId",
  ] as const) {
    if (!input[key].trim()) throw new Error(`Governance decision ${key} is required`);
  }
  const now = input.createdAt ?? new Date().toISOString();
  const effectiveFrom = input.effectiveFrom ?? now;
  if (input.effectiveUntil && effectiveFrom > input.effectiveUntil) {
    throw new Error("Governance decision effectiveUntil cannot precede effectiveFrom");
  }
  return {
    ...input,
    status: "PROPOSED",
    effectiveFrom,
    createdAt: now,
  };
}

export function approveGovernanceDecision(
  decision: GovernanceDecision,
): GovernanceDecision {
  if (decision.status !== "PROPOSED") {
    throw new Error("Only proposed governance decisions can be approved");
  }
  return { ...decision, status: "APPROVED" };
}

export function rejectGovernanceDecision(
  decision: GovernanceDecision,
): GovernanceDecision {
  if (decision.status !== "PROPOSED") {
    throw new Error("Only proposed governance decisions can be rejected");
  }
  return { ...decision, status: "REJECTED" };
}

export function revokeGovernanceDecision(
  decision: GovernanceDecision,
): GovernanceDecision {
  if (decision.status !== "APPROVED") {
    throw new Error("Only approved governance decisions can be revoked");
  }
  return { ...decision, status: "REVOKED" };
}
