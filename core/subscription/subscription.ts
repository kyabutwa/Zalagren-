export type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELLED" | "EXPIRED";

export type SubscriptionPlan = "FREE" | "PLUS" | "PREMIUM" | "COMMUNITY" | "ORGANIZATION" | "PROVIDER" | "ENTERPRISE" | "CUSTOM";

export interface Subscription {
  id: string;
  accountId: string;
  planCode: SubscriptionPlan;
  status: SubscriptionStatus;
  startedAt: string;
  renewsAt?: string;
  expiresAt?: string;
  cancelledAt?: string;
  billingReference?: string;
}

export interface CreateSubscriptionInput {
  id: string;
  accountId: string;
  planCode: SubscriptionPlan;
  startedAt?: string;
  renewsAt?: string;
  expiresAt?: string;
  billingReference?: string;
}

export function createSubscription(input: CreateSubscriptionInput): Subscription {
  if (!input.id.trim()) throw new Error("Subscription id is required");
  if (!input.accountId.trim()) throw new Error("Subscription accountId is required");
  const startedAt = input.startedAt ?? new Date().toISOString();
  if (input.expiresAt && startedAt > input.expiresAt) {
    throw new Error("Subscription expiresAt cannot precede startedAt");
  }
  return {
    ...input,
    status: "ACTIVE",
    startedAt,
  };
}

export function cancelSubscription(subscription: Subscription, at = new Date().toISOString()): Subscription {
  return { ...subscription, status: "CANCELLED", cancelledAt: at };
}

export function expireSubscription(subscription: Subscription, at = new Date().toISOString()): Subscription {
  return { ...subscription, status: "EXPIRED", expiresAt: subscription.expiresAt ?? at };
}
