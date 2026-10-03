export type IdentityType = "PERSON" | "ORGANIZATION";
export type IdentityVerificationStatus = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
export type IdentityStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DEACTIVATED";

export interface Identity {
  id: string;
  type: IdentityType;
  verificationStatus: IdentityVerificationStatus;
  displayName: string;
  legalName?: string;
  verificationReference?: string;
  status: IdentityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIdentityInput {
  id: string;
  type: IdentityType;
  displayName: string;
  legalName?: string;
  verificationStatus?: IdentityVerificationStatus;
  verificationReference?: string;
  createdAt?: string;
}

export function createIdentity(input: CreateIdentityInput): Identity {
  if (!input.id.trim()) throw new Error("Identity id is required");
  if (!input.displayName.trim()) throw new Error("Identity displayName is required");
  if (input.verificationStatus === "VERIFIED" && !input.verificationReference?.trim()) {
    throw new Error("Verified identity requires verificationReference");
  }
  const now = input.createdAt ?? new Date().toISOString();
  return {
    id: input.id,
    type: input.type,
    verificationStatus: input.verificationStatus ?? "UNVERIFIED",
    displayName: input.displayName,
    legalName: input.legalName,
    verificationReference: input.verificationReference,
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
  };
}

export function deactivateIdentity(identity: Identity, at = new Date().toISOString()): Identity {
  return { ...identity, status: "DEACTIVATED", updatedAt: at };
}
