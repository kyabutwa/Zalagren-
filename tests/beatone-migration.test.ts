import { test } from "node:test";
import { normalizeLegalIdentity, createAccess, isAccessActive, executeIntegration, createMigratedAction, createMigratedEvent, createMigratedEvidence } from "../core/beatone-migration";

test("BeatOne migration boundaries", async () => {
  const now = new Date().toISOString();
  const authorization = { id:"auth-1", participantId:"participant-1", capabilityId:"cap-1", targetEntityType:"SERVICE", targetEntityId:"service-1", status:"ACTIVE" as const, effectiveFrom:now };

  const legal = normalizeLegalIdentity({ legalName:"Example Person", documentType:"passport", issuingCountryCode:"cd", documentNumber:"P123", residenceCountryCode:"ke" });
  if (legal.issuingCountryCode !== "CD" || legal.residenceCountryCode !== "KE") throw new Error("Legal identity normalization failed");

  const access = createAccess({id:"access-1",participantId:"participant-1",targetType:"SERVICE",targetId:"service-1",mode:"SERVICE",authorizationId:"auth-1",effectiveFrom:now});
  if (!isAccessActive(access)) throw new Error("Access should be active");

  const integration = await executeIntegration(
    {execute:async()=>({outcome:"UNKNOWN" as const,failure:"TIMEOUT" as const,receivedAt:now})},
    {requestId:"req-1",actionId:"action-1",operation:"service.execute",payload:{}}
  );
  if (!integration.reconciliationRequired) throw new Error("UNKNOWN integration must require reconciliation");

  const action = createMigratedAction({id:"action-1",actorParticipantId:"participant-1",capabilityId:"cap-1",authorization,targetEntityType:"SERVICE",targetEntityId:"service-1",operation:"service.execute"});
  const event = createMigratedEvent({id:"event-1",eventType:"ACTION_REQUESTED",subjectEntityType:"SERVICE",subjectEntityId:"service-1",action,source:"zalagren",actorParticipantId:"participant-1"});
  const evidence = createMigratedEvidence({id:"evidence-1",evidenceType:"ACTION_EVENT",subjectEntityType:"SERVICE",subjectEntityId:"service-1",sourceType:"event",sourceReference:event.id});
  if (event.actionId !== action.id || evidence.sourceReference !== event.id) throw new Error("Action/Event/Evidence causal chain failed");

  let unauthorized = false;
  try { createMigratedAction({id:"action-2",actorParticipantId:"participant-1",capabilityId:"cap-1",authorization:{...authorization,participantId:"other"},targetEntityType:"SERVICE",targetEntityId:"service-1",operation:"service.execute"}); } catch { unauthorized = true; }
  if (!unauthorized) throw new Error("Authorization boundary failed");
});
