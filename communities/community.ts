export type CommunityType =
  | "RESIDENTIAL"
  | "APARTMENT"
  | "ESTATE"
  | "BUILDING"
  | "SMALL_CITY"
  | "CAMPUS"
  | "INSTITUTION"
  | "ORGANIZATION"
  | "OTHER";

export type CommunityStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "CLOSED";

export interface Community {
  id: string;
  organizationId?: string;
  communityType: CommunityType;
  name: string;
  status: CommunityStatus;
  primaryPlaceId?: string;
  governanceReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommunityInput {
  id: string;
  name: string;
  communityType: CommunityType;
  organizationId?: string;
  primaryPlaceId?: string;
  governanceReference?: string;
  createdAt?: string;
}

export function createCommunity(input: CreateCommunityInput): Community {
  if (!input.id.trim()) throw new Error("Community id is required");
  if (!input.name.trim()) throw new Error("Community name is required");

  const now = input.createdAt ?? new Date().toISOString();
  return {
    id: input.id,
    organizationId: input.organizationId,
    communityType: input.communityType,
    name: input.name,
    status: "ACTIVE",
    primaryPlaceId: input.primaryPlaceId,
    governanceReference: input.governanceReference,
    createdAt: now,
    updatedAt: now,
  };
}

export function closeCommunity(community: Community, at = new Date().toISOString()): Community {
  return { ...community, status: "CLOSED", updatedAt: at };
}
