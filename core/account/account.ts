export type AccountStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "CLOSED";

export interface Account {
  id: string;
  identityId: string;
  status: AccountStatus;
  securityState: "NORMAL" | "REQUIRES_REAUTHENTICATION" | "COMPROMISED";
  primaryContactReference?: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface CreateAccountInput {
  id: string;
  identityId: string;
  primaryContactReference?: string;
  createdAt?: string;
}

export function createAccount(input: CreateAccountInput): Account {
  if (!input.id.trim()) throw new Error("Account id is required");
  if (!input.identityId.trim()) throw new Error("Account identityId is required");
  const now = input.createdAt ?? new Date().toISOString();
  return {
    id: input.id,
    identityId: input.identityId,
    status: "ACTIVE",
    securityState: "NORMAL",
    primaryContactReference: input.primaryContactReference,
    createdAt: now,
    updatedAt: now,
  };
}

export function suspendAccount(account: Account, at = new Date().toISOString()): Account {
  return { ...account, status: "SUSPENDED", updatedAt: at };
}

export function markAccountCompromised(account: Account, at = new Date().toISOString()): Account {
  return { ...account, securityState: "COMPROMISED", updatedAt: at };
}

export function closeAccount(account: Account, at = new Date().toISOString()): Account {
  return { ...account, status: "CLOSED", closedAt: at, updatedAt: at };
}
