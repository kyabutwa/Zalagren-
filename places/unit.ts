export type UnitStatus = "PLANNED" | "AVAILABLE" | "OCCUPIED" | "RESERVED" | "INACTIVE" | "CLOSED";

export interface Unit {
  id: string;
  placeId: string;
  buildingId: string;
  name: string;
  status: UnitStatus;
  phaseId?: string;
  communityId?: string;
  floor?: string;
  unitType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUnitInput {
  id: string;
  placeId: string;
  buildingId: string;
  name: string;
  phaseId?: string;
  communityId?: string;
  floor?: string;
  unitType?: string;
  createdAt?: string;
}

export function createUnit(input: CreateUnitInput): Unit {
  if (!input.id.trim()) throw new Error("Unit id is required");
  if (!input.placeId.trim()) throw new Error("Unit place id is required");
  if (!input.buildingId.trim()) throw new Error("Unit building id is required");
  if (!input.name.trim()) throw new Error("Unit name is required");

  const now = input.createdAt ?? new Date().toISOString();
  return { ...input, status: "PLANNED", createdAt: now, updatedAt: now };
}

export function closeUnit(unit: Unit, at = new Date().toISOString()): Unit {
  return { ...unit, status: "CLOSED", updatedAt: at };
}
