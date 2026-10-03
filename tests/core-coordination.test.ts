import {createInvitation,transitionInvitation,createIntent,createProposal,createAction,markActionCompleted,verifyAction,createEvent,createEvidence,createResource,createWorkOrder} from "../core/coordination";
describe("canonical coordination foundation",()=>{
 test("invitation, intent and proposal stay distinct",()=>{
  const i=createInvitation({id:"i1",inviterParticipantId:"p1",inviteeIdentityReference:"id2",purpose:"visit"});
  expect(transitionInvitation(i,"ACCEPTED").status).toBe("ACCEPTED");
  const intent=createIntent({id:"in1",initiatorParticipantId:"p1",intentType:"SERVICE",purpose:"repair",requestedOutcome:"completed"});
  const proposal=createProposal({id:"pr1",sourceType:"GENESIS",sourceReference:"run1",intentId:intent.id,proposalType:"SERVICE",description:"repair",authorizationRequired:true});
  expect(proposal.authorizationRequired).toBe(true);
 });
 test("action requires completion before verification",()=>{
  const a=createAction({id:"a1",actorParticipantId:"p1",capabilityId:"service.request",targetEntityType:"SERVICE_REQUEST",targetEntityId:"r1"});
  expect(()=>verifyAction(a)).toThrow();
  expect(verifyAction(markActionCompleted(a)).verificationStatus).toBe("VERIFIED");
 });
 test("events evidence resources and work orders preserve explicit boundaries",()=>{
  expect(createEvent({id:"e1",eventType:"DONE",subjectEntityType:"ACTION",subjectEntityId:"a1",source:"provider"}).verificationStatus).toBe("UNVERIFIED");
  expect(createEvidence({id:"ev1",evidenceType:"CONFIRMATION",subjectEntityType:"ACTION",subjectEntityId:"a1",sourceType:"PROVIDER",sourceReference:"event1"}).verificationStatus).toBe("UNVERIFIED");
  expect(createResource({id:"r1",resourceType:"UTILITY",ownerEntityType:"COMMUNITY",ownerEntityId:"c1"}).status).toBe("ACTIVE");
  expect(createWorkOrder({id:"w1",serviceRequestId:"sr1",providerOrganizationId:"org1",targetEntityType:"UNIT",targetEntityId:"u1"}).status).toBe("DRAFT");
 });
});
