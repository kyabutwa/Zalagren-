export type ParticipantType = "PERSON" | "COMMUNITY" | "ORGANIZATION" | "OTHER";
export type ParticipantStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED";

export interface Participant {
  id: string;
  identityId: string;
  accountId?: string;
  participantType: ParticipantType;
  status: ParticipantStatus;
  createdAt: string;
  updatedAt: string;
  deactivatedAt?: string;
}

export interface CreateParticipantInput {
  id: string;
  identityId: string;
  accountId?: string;
  participantType: ParticipantType;
  createdAt?: string;
}

export function createParticipant(input: CreateParticipantInput): Participant {
  if (!input.id.trim()) throw new Error("Participant id is required");
  if (!input.identityId.trim()) throw new Error("Participant identityId is required");
  const now = input.createdAt ?? new Date().toISOString();
  return {
    ...input,
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
  };
}

export function deactivateParticipant(participant: Participant, at = new Date().toISOString()): Participant {
  return { ...participant, status: "DEACTIVATED", deactivatedAt: at, updatedAt: at };
}

export function suspendParticipant(participant: Participant, at = new Date().toISOString()): Participant {
  return { ...participant, status: "SUSPENDED", updatedAt: at };
}
