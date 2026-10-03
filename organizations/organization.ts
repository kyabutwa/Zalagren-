export type OrganizationType =
  | "COMPANY"
  | "NONPROFIT"
  | "GOVERNMENT"
  | "INSTITUTION"
  | "COMMUNITY_ORGANIZATION"
  | "COOPERATIVE"
  | "PARTNERSHIP"
  | "OTHER";

export type OrganizationStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "CLOSED";

export interface Organization {
  id: string;
  name: string;
  organizationType: OrganizationType;
  status: OrganizationStatus;
  legalName?: string;
  registrationReference?: string;
  primaryPlaceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationInput {
  id: string;
  name: string;
  organizationType: OrganizationType;
  legalName?: string;
  registrationReference?: string;
  primaryPlaceId?: string;
  createdAt?: string;
}

export function createOrganization(input: CreateOrganizationInput): Organization {
  if (!input.id.trim()) throw new Error("Organization id is required");
  if (!input.name.trim()) throw new Error("Organization name is required");

  const now = input.createdAt ?? new Date().toISOString();
  return { ...input, status: "ACTIVE", createdAt: now, updatedAt: now };
}

export function closeOrganization(
  organization: Organization,
  at = new Date().toISOString(),
): Organization {
  return { ...organization, status: "CLOSED", updatedAt: at };
}
