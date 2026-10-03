export type PhaseStatus = "PLANNED" | "ACTIVE" | "SUSPENDED" | "COMPLETED" | "CLOSED";

export interface Phase {
  id: string;
  placeId: string;
  name: string;
  status: PhaseStatus;
  sequence: number;
  communityId?: string;
  startsAt?: string;
  endsAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePhaseInput {
  id: string;
  placeId: string;
  name: string;
  sequence: number;
  communityId?: string;
  startsAt?: string;
  endsAt?: string;
  createdAt?: string;
}

export function createPhase(input: CreatePhaseInput): Phase {
  if (!input.id.trim()) throw new Error("Phase id is required");
  if (!input.placeId.trim()) throw new Error("Phase place id is required");
  if (!input.name.trim()) throw new Error("Phase name is required");
  if (!Number.isInteger(input.sequence) || input.sequence < 1)
    throw new Error("Phase sequence must be a positive integer");
  if (input.startsAt && input.endsAt && input.endsAt < input.startsAt)
    throw new Error("Phase end cannot precede phase start");

  const now = input.createdAt ?? new Date().toISOString();
  return { ...input, status: "PLANNED", createdAt: now, updatedAt: now };
}

export function activatePhase(phase: Phase, at = new Date().toISOString()): Phase {
  return { ...phase, status: "ACTIVE", updatedAt: at };
}

export function completePhase(phase: Phase, at = new Date().toISOString()): Phase {
  return { ...phase, status: "COMPLETED", updatedAt: at };
}
