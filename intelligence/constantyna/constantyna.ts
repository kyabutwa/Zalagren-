export type ConstantynaMode =
  | "EXPLAIN"
  | "GUIDE"
  | "RESEARCH"
  | "COMPARE"
  | "EXECUTE"
  | "COMMUNICATE"
  | "OPPORTUNITY"
  | "STRATEGY";

export type ConstantynaResponseType =
  | "ANSWER"
  | "INSTRUCTION"
  | "RESEARCH_RESULT"
  | "COMPARISON"
  | "PROPOSAL"
  | "ACTION_REQUEST"
  | "MESSAGE_DRAFT"
  | "OPPORTUNITY"
  | "STRATEGY";

export type ConstantynaTruthStatus =
  | "VERIFIED"
  | "SUPPORTED"
  | "PROPOSED"
  | "FAILED";

export interface ConstantynaRequest {
  id: string;
  participantId?: string;
  contextId?: string;
  mode: ConstantynaMode;
  message: string;
  requestedAction?: string;
  targetEntityType?: string;
  targetEntityId?: string;
  receivedAt?: string;
}

export interface ConstantynaEvidence {
  id: string;
  sourceType: string;
  sourceReference: string;
  statement: string;
  truthStatus: ConstantynaTruthStatus;
  observedAt?: string;
}

export interface ConstantynaResponse {
  id: string;
  requestId: string;
  participantId?: string;
  contextId?: string;
  type: ConstantynaResponseType;
  content: string;
  evidence: ConstantynaEvidence[];
  proposedAction?: string;
  authorizationRequired: boolean;
  status: ConstantynaTruthStatus;
  createdAt: string;
}

export interface ConstantynaActionRequest {
  id: string;
  requestId: string;
  participantId: string;
  contextId?: string;
  targetEntityType: string;
  targetEntityId: string;
  intent: string;
  proposedAction: string;
  authorizationRequired: boolean;
  authorizationReference?: string;
  status: "PENDING_AUTHORIZATION" | "AUTHORIZED" | "REJECTED" | "CANCELLED";
  createdAt: string;
}

export function createConstantynaRequest(
  input: Omit<ConstantynaRequest, "receivedAt"> & { receivedAt?: string },
): ConstantynaRequest {
  if (!input.id.trim()) throw new Error("CONSTANTYNA request id is required");
  if (!input.message.trim()) throw new Error("CONSTANTYNA message is required");
  return {
    ...input,
    receivedAt: input.receivedAt ?? new Date().toISOString(),
  };
}

export function createConstantynaResponse(
  input: Omit<ConstantynaResponse, "createdAt"> & { createdAt?: string },
): ConstantynaResponse {
  if (!input.id.trim()) throw new Error("CONSTANTYNA response id is required");
  if (!input.requestId.trim()) throw new Error("CONSTANTYNA request id is required");
  if (!input.content.trim()) throw new Error("CONSTANTYNA response content is required");

  return {
    ...input,
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
}

export function createConstantynaActionRequest(
  input: Omit<ConstantynaActionRequest, "createdAt"> & { createdAt?: string },
): ConstantynaActionRequest {
  for (const key of [
    "id",
    "requestId",
    "participantId",
    "targetEntityType",
    "targetEntityId",
    "intent",
    "proposedAction",
  ] as const) {
    if (!input[key].trim()) {
      throw new Error(`CONSTANTYNA action request ${key} is required`);
    }
  }

  return {
    ...input,
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
}

export function canConstantynaExecute(
  action: ConstantynaActionRequest,
  authorizationAllowed: boolean,
): boolean {
  if (!action.authorizationRequired) return authorizationAllowed;
  return action.status === "AUTHORIZED" && authorizationAllowed;
}

export function cancelConstantynaAction(
  action: ConstantynaActionRequest,
): ConstantynaActionRequest {
  if (action.status === "AUTHORIZED") {
    throw new Error("Authorized CONSTANTYNA actions require execution or explicit revocation handling");
  }
  return { ...action, status: "CANCELLED" };
}
