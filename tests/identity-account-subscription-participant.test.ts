import { createIdentity } from "../core/identity";
import { createAccount, markAccountCompromised } from "../core/account";
import { createSubscription, cancelSubscription } from "../core/subscription";
import { createEntitlement, isEntitlementActive } from "../core/subscription";
import { createParticipant, deactivateParticipant } from "../core/participant";

describe("canonical identity and participation foundation", () => {
  test("keeps identity, account, subscription, entitlement and participant distinct", () => {
    const identity = createIdentity({
      id: "identity-1",
      type: "PERSON",
      displayName: "Participant One",
    });
    const account = createAccount({
      id: "account-1",
      identityId: identity.id,
    });
    const subscription = createSubscription({
      id: "subscription-1",
      accountId: account.id,
      planCode: "FREE",
    });
    const entitlement = createEntitlement({
      id: "entitlement-1",
      accountId: account.id,
      subscriptionId: subscription.id,
      capabilityKey: "service.request",
      source: "subscription",
    });
    const participant = createParticipant({
      id: "participant-1",
      identityId: identity.id,
      accountId: account.id,
      participantType: "PERSON",
    });

    expect(identity.id).not.toBe(account.id);
    expect(account.identityId).toBe(identity.id);
    expect(subscription.accountId).toBe(account.id);
    expect(entitlement.subscriptionId).toBe(subscription.id);
    expect(participant.identityId).toBe(identity.id);
    expect(participant.accountId).toBe(account.id);
    expect(isEntitlementActive(entitlement)).toBe(true);
  });

  test("account security state can be hardened without changing identity", () => {
    const identity = createIdentity({
      id: "identity-2",
      type: "PERSON",
      displayName: "Participant Two",
    });
    const account = createAccount({ id: "account-2", identityId: identity.id });
    const compromised = markAccountCompromised(account);
    expect(compromised.securityState).toBe("COMPROMISED");
    expect(compromised.identityId).toBe(identity.id);
  });

  test("relationship-independent lifecycle changes preserve participant identity", () => {
    const participant = createParticipant({
      id: "participant-3",
      identityId: "identity-3",
      participantType: "PERSON",
    });
    const deactivated = deactivateParticipant(participant);
    const cancelled = cancelSubscription(
      createSubscription({
        id: "subscription-3",
        accountId: "account-3",
        planCode: "PLUS",
      }),
    );
    expect(deactivated.id).toBe(participant.id);
    expect(cancelled.status).toBe("CANCELLED");
  });
});
