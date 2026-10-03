export type ServiceRequirementType =
  | "ELIGIBILITY"
  | "QUALIFICATION"
  | "DOCUMENT"
  | "SAFETY"
  | "LEGAL"
  | "DATA";

export interface ServiceRequirement {
  id: string;
  serviceId: string;
  type: ServiceRequirementType;
  key: string;
  description: string;
  required: boolean;
  evidenceReference?: string;
  active: boolean;
}

export interface ServiceEligibility {
  serviceId: string;
  eligible: boolean;
  reasons: string[];
  evaluatedAt: string;
  requirementIds: string[];
}

export function evaluateServiceEligibility(
  serviceId: string,
  requirements: ServiceRequirement[],
  satisfiedRequirementIds: string[],
  at = new Date().toISOString(),
): ServiceEligibility {
  if (!serviceId.trim()) throw new Error("Service id is required");

  const active = requirements.filter((r) => r.serviceId === serviceId && r.active);
  const satisfied = new Set(satisfiedRequirementIds);
  const missing = active.filter((r) => r.required && !satisfied.has(r.id));

  return {
    serviceId,
    eligible: missing.length === 0,
    reasons: missing.map((r) => `Missing required service requirement: ${r.key}`),
    evaluatedAt: at,
    requirementIds: active.map((r) => r.id),
  };
}
