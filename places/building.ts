export type BuildingStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "CLOSED";

export interface Building {
  id: string;
  placeId: string;
  name: string;
  status: BuildingStatus;
  phaseId?: string;
  communityId?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBuildingInput {
  id: string;
  placeId: string;
  name: string;
  phaseId?: string;
  communityId?: string;
  address?: string;
  createdAt?: string;
}

export function createBuilding(input: CreateBuildingInput): Building {
  if (!input.id.trim()) throw new Error("Building id is required");
  if (!input.placeId.trim()) throw new Error("Building place id is required");
  if (!input.name.trim()) throw new Error("Building name is required");

  const now = input.createdAt ?? new Date().toISOString();
  return { ...input, status: "ACTIVE", createdAt: now, updatedAt: now };
}

export function closeBuilding(building: Building, at = new Date().toISOString()): Building {
  return { ...building, status: "CLOSED", updatedAt: at };
}
