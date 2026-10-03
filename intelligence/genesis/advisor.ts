export type GenesisAdvisorMode = "ECOSYSTEM_EXPLAIN" | "SOLUTION" | "SERVICE" | "OPPORTUNITY" | "STRATEGY";

export type GenesisAdvisorResponseType =
  | "ECOSYSTEM_EXPLANATION"
  | "SOLUTION_PROPOSAL"
  | "SERVICE_PROPOSAL"
  | "OPPORTUNITY"
  | "STRATEGY";

export interface GenesisAdvisorRequest {
  id: string;
  participantId?: string;
  contextId?: string;
  mode: GenesisAdvisorMode;
  message: string;
  requestedAction?: string;
  targetEntityType?: string;
  targetEntityId?: string;
  receivedAt?: string;
}

export interface GenesisAdvisorEvidence {
  id: string;
  sourceType: string;
  sourceReference: string;
  statement: string;
  truthStatus: "VERIFIED" | "SUPPORTED" | "PROPOSED" | "FAILED";
  observedAt?: string;
}

export interface GenesisAdvisorResponse {
  id: string;
  requestId: string;
  participantId?: string;
  contextId?: string;
  type: GenesisAdvisorResponseType;
  content: string;
  evidence: GenesisAdvisorEvidence[];
  proposedActions: string[];
  serviceReferences: string[];
  authorizationRequired: boolean;
  codeDisclosure: "FORBIDDEN";
  rebuildAuthority: "NONE";
  status: "VERIFIED" | "SUPPORTED" | "PROPOSED" | "FAILED";
  createdAt: string;
}

export interface GenesisServiceProposal {
  id: string;
  requestId: string;
  participantId?: string;
  contextId?: string;
  serviceName: string;
  purpose: string;
  providerReference?: string;
  eligibility?: string;
  requirements: string[];
  estimatedCost?: string;
  serviceArea?: string;
  proposedActions: string[];
  authorizationRequired: boolean;
  status: "PROPOSED" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  createdAt: string;
}

export function createGenesisAdvisorRequest(
  input: Omit<GenesisAdvisorRequest, "receivedAt"> & { receivedAt?: string },
): GenesisAdvisorRequest {
  if (!input.id.trim()) throw new Error("GENESIS advisor request id is required");
  if (!input.message.trim()) throw new Error("GENESIS advisor message is required");
  return { ...input, receivedAt: input.receivedAt ?? new Date().toISOString() };
}

export function createGenesisAdvisorResponse(
  input: Omit<GenesisAdvisorResponse, "createdAt"> & { createdAt?: string },
): GenesisAdvisorResponse {
  if (!input.id.trim()) throw new Error("GENESIS advisor response id is required");
  if (!input.requestId.trim()) throw new Error("GENESIS advisor request id is required");
  if (!input.content.trim()) throw new Error("GENESIS advisor content is required");
  return {
    ...input,
    codeDisclosure: "FORBIDDEN",
    rebuildAuthority: "NONE",
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
}

export function createGenesisServiceProposal(
  input: Omit<GenesisServiceProposal, "createdAt"> & { createdAt?: string },
): GenesisServiceProposal {
  if (!input.id.trim()) throw new Error("GENESIS service proposal id is required");
  if (!input.requestId.trim()) throw new Error("GENESIS request id is required");
  if (!input.serviceName.trim()) throw new Error("Service name is required");
  if (!input.purpose.trim()) throw new Error("Service purpose is required");
  return { ...input, createdAt: input.createdAt ?? new Date().toISOString() };
}

export function canGenesisAdvisorExecute(
  authorizationAllowed: boolean,
  requestedAction?: string,
): boolean {
  return Boolean(requestedAction?.trim()) && authorizationAllowed;
}

export function isGenesisCodeDisclosureRequested(message: string): boolean {
  const value = message.toLowerCase();
  return [
    "show the code",
    "explain the source code",
    "rebuild the system",
    "rewrite the system",
    "modify the architecture",
    "change the foundation",
    "give me the repository",
    "give me the code",
  ].some((phrase) => value.includes(phrase));
}
