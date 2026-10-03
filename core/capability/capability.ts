export interface Capability {
  id: string;
  key: string;
  name: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export interface CreateCapabilityInput {
  id: string;
  key: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export function createCapability(input: CreateCapabilityInput): Capability {
  if (!input.id.trim()) throw new Error("Capability id is required");
  if (!input.key.trim()) throw new Error("Capability key is required");
  if (!input.name.trim()) throw new Error("Capability name is required");
  return {
    ...input,
    status: "ACTIVE",
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
}

export function deactivateCapability(
  capability: Capability,
  at = new Date().toISOString(),
): Capability {
  return { ...capability, status: "INACTIVE", createdAt: capability.createdAt };
}
