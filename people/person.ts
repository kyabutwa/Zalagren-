export type PersonStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DEACTIVATED";

export interface Person {
  id: string;
  identityId: string;
  accountId?: string;
  participantId: string;
  displayName: string;
  status: PersonStatus;
  createdAt: string;
  updatedAt: string;
  deactivatedAt?: string;
}

export interface CreatePersonInput {
  id: string;
  identityId: string;
  participantId: string;
  displayName: string;
  accountId?: string;
  createdAt?: string;
}

export function createPerson(input: CreatePersonInput): Person {
  if (!input.id.trim()) throw new Error("Person id is required");
  if (!input.identityId.trim()) throw new Error("Person identityId is required");
  if (!input.participantId.trim()) throw new Error("Person participantId is required");
  if (!input.displayName.trim()) throw new Error("Person displayName is required");

  const now = input.createdAt ?? new Date().toISOString();
  return {
    id: input.id,
    identityId: input.identityId,
    accountId: input.accountId,
    participantId: input.participantId,
    displayName: input.displayName,
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
  };
}

export function deactivatePerson(person: Person, at = new Date().toISOString()): Person {
  return { ...person, status: "DEACTIVATED", deactivatedAt: at, updatedAt: at };
}
