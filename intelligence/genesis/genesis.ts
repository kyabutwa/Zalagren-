export type GenesisRunStatus =
  | "RECEIVED"
  | "ANALYZING"
  | "PROPOSED"
  | "AWAITING_AUTHORIZATION"
  | "EXECUTING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export type GenesisStage =
  | "OBSERVE"
  | "UNDERSTAND"
  | "CONTEXTUALIZE"
  | "DETECT"
  | "REASON"
  | "PROPOSE"
  | "AUTHORIZE"
  | "EXECUTE"
  | "MEASURE"
  | "LEARN";

export interface GenesisObservation {
  id: string;
  sourceType: string;
  sourceReference: string;
  subjectEntityType: string;
  subjectEntityId: string;
  contextId?: string;
  observedAt: string;
  dataReference?: string;
  confidence?: number;
  verificationStatus: "UNVERIFIED" | "SUPPORTED" | "VERIFIED";
}

export interface GenesisKnowledgeItem {
  id: string;
  sourceObservationIds: string[];
  subjectEntityType: string;
  subjectEntityId: string;
  contextId?: string;
  statement: string;
  confidence?: number;
  status: "PROVISIONAL" | "SUPPORTED" | "VERIFIED" | "REJECTED";
  createdAt: string;
}

export interface GenesisRun {
  id: string;
  initiatorParticipantId?: string;
  contextId?: string;
  objective: string;
  status: GenesisRunStatus;
  stage: GenesisStage;
  observationIds: string[];
  knowledgeItemIds: string[];
  proposalIds: string[];
  actionIds: string[];
  startedAt: string;
  completedAt?: string;
  failureCode?: string;
}

export interface GenesisProposal {
  id: string;
  genesisRunId: string;
  intentId?: string;
  contextId?: string;
  targetEntityType?: string;
  targetEntityId?: string;
  proposedAction: string;
  rationale: string;
  evidenceReferenceIds: string[];
  authorizationRequired: boolean;
  status: "DRAFT" | "PROPOSED" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  createdAt: string;
}

export interface CreateGenesisRunInput {
  id: string;
  objective: string;
  initiatorParticipantId?: string;
  contextId?: string;
  startedAt?: string;
}

export function createGenesisRun(input: CreateGenesisRunInput): GenesisRun {
  if (!input.id.trim()) throw new Error("GENESIS run id is required");
  if (!input.objective.trim()) throw new Error("GENESIS objective is required");

  return {
    id: input.id,
    initiatorParticipantId: input.initiatorParticipantId,
    contextId: input.contextId,
    objective: input.objective,
    status: "RECEIVED",
    stage: "OBSERVE",
    observationIds: [],
    knowledgeItemIds: [],
    proposalIds: [],
    actionIds: [],
    startedAt: input.startedAt ?? new Date().toISOString(),
  };
}

export function advanceGenesisRun(
  run: GenesisRun,
  stage: GenesisStage,
  status: GenesisRunStatus,
): GenesisRun {
  const allowed: Record<GenesisStage, GenesisStage | undefined> = {
    OBSERVE: "UNDERSTAND",
    UNDERSTAND: "CONTEXTUALIZE",
    CONTEXTUALIZE: "DETECT",
    DETECT: "REASON",
    REASON: "PROPOSE",
    PROPOSE: "AUTHORIZE",
    AUTHORIZE: "EXECUTE",
    EXECUTE: "MEASURE",
    MEASURE: "LEARN",
    LEARN: undefined,
  };

  if (stage !== run.stage && allowed[run.stage] !== stage) {
    throw new Error(`Invalid GENESIS stage transition: ${run.stage} -> ${stage}`);
  }

  return {
    ...run,
    stage,
    status,
    ...(status === "COMPLETED" || status === "FAILED" || status === "CANCELLED"
      ? { completedAt: new Date().toISOString() }
      : {}),
  };
}

export function attachGenesisObservation(
  run: GenesisRun,
  observationId: string,
): GenesisRun {
  if (!observationId.trim()) throw new Error("Observation id is required");
  return {
    ...run,
    observationIds: run.observationIds.includes(observationId)
      ? run.observationIds
      : [...run.observationIds, observationId],
  };
}

export function attachGenesisKnowledge(
  run: GenesisRun,
  knowledgeItemId: string,
): GenesisRun {
  if (!knowledgeItemId.trim()) throw new Error("Knowledge item id is required");
  return {
    ...run,
    knowledgeItemIds: run.knowledgeItemIds.includes(knowledgeItemId)
      ? run.knowledgeItemIds
      : [...run.knowledgeItemIds, knowledgeItemId],
  };
}

export function attachGenesisProposal(
  run: GenesisRun,
  proposalId: string,
): GenesisRun {
  if (!proposalId.trim()) throw new Error("Proposal id is required");
  return {
    ...run,
    proposalIds: run.proposalIds.includes(proposalId)
      ? run.proposalIds
      : [...run.proposalIds, proposalId],
  };
}

export function attachGenesisAction(
  run: GenesisRun,
  actionId: string,
): GenesisRun {
  if (!actionId.trim()) throw new Error("Action id is required");
  return {
    ...run,
    actionIds: run.actionIds.includes(actionId)
      ? run.actionIds
      : [...run.actionIds, actionId],
  };
}

export function createGenesisProposal(input: Omit<GenesisProposal, "createdAt"> & { createdAt?: string }): GenesisProposal {
  if (!input.id.trim()) throw new Error("GENESIS proposal id is required");
  if (!input.genesisRunId.trim()) throw new Error("GENESIS run id is required");
  if (!input.proposedAction.trim()) throw new Error("Proposed action is required");
  if (!input.rationale.trim()) throw new Error("Proposal rationale is required");

  return {
    ...input,
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
}

export function canGenesisExecute(
  authorizationAllowed: boolean,
  proposal: GenesisProposal,
): boolean {
  if (!proposal.authorizationRequired) return authorizationAllowed;
  return authorizationAllowed;
}
