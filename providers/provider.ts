export type ProviderType =
  | "INDIVIDUAL"
  | "ORGANIZATION"
  | "COMMUNITY_PROVIDER"
  | "INSTITUTION"
  | "PUBLIC_PROVIDER"
  | "OTHER";

export type ProviderStatus =
  | "ONBOARDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "INACTIVE"
  | "CLOSED";

export interface Provider {
  id: string;
  name: string;
  providerType: ProviderType;
  status: ProviderStatus;
  participantId?: string;
  organizationId?: string;
  serviceAreaPlaceIds?: string[];
  capabilityIds?: string[];
  verificationReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProviderInput {
  id: string;
  name: string;
  providerType: ProviderType;
  participantId?: string;
  organizationId?: string;
  serviceAreaPlaceIds?: string[];
  capabilityIds?: string[];
  verificationReference?: string;
  createdAt?: string;
}

export function createProvider(input: CreateProviderInput): Provider {
  if (!input.id.trim()) throw new Error("Provider id is required");
  if (!input.name.trim()) throw new Error("Provider name is required");
  if (!input.participantId && !input.organizationId)
    throw new Error("Provider must reference a participant or organization");

  const now = input.createdAt ?? new Date().toISOString();
  return { ...input, status: "ONBOARDING", createdAt: now, updatedAt: now };
}

export function activateProvider(
  provider: Provider,
  at = new Date().toISOString(),
): Provider {
  return { ...provider, status: "ACTIVE", updatedAt: at };
}

export function suspendProvider(
  provider: Provider,
  at = new Date().toISOString(),
): Provider {
  return { ...provider, status: "SUSPENDED", updatedAt: at };
}

export function closeProvider(
  provider: Provider,
  at = new Date().toISOString(),
): Provider {
  return { ...provider, status: "CLOSED", updatedAt: at };
}
