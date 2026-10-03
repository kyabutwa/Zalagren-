export type InvitationStatus = "DRAFT" | "PENDING" | "DELIVERED" | "ACCEPTED" | "DECLINED" | "EXPIRED" | "CANCELLED" | "REVOKED" | "COMPLETED";
export interface Invitation {
  id:string; inviterParticipantId:string; inviteeParticipantId?:string; inviteeIdentityReference?:string; inviteeContactReference?:string;
  communityId?:string; organizationId?:string; placeId?:string; purpose:string; requestedStartAt?:string; requestedEndAt?:string;
  authorizationRequirement?:string; credentialReference?:string; status:InvitationStatus; createdAt:string; acceptedAt?:string; declinedAt?:string;
  cancelledAt?:string; expiredAt?:string; revokedAt?:string; completedAt?:string;
}
export function createInvitation(input:Omit<Invitation,"status"|"createdAt">&{createdAt?:string}):Invitation {
  if(!input.id.trim()) throw new Error("Invitation id is required");
  if(!input.inviterParticipantId.trim()) throw new Error("Invitation inviterParticipantId is required");
  if(!input.purpose.trim()) throw new Error("Invitation purpose is required");
  if(!input.inviteeParticipantId&&!input.inviteeIdentityReference&&!input.inviteeContactReference) throw new Error("Invitation requires an invitee reference");
  if(input.requestedStartAt&&input.requestedEndAt&&input.requestedStartAt>input.requestedEndAt) throw new Error("Invitation requestedEndAt cannot precede requestedStartAt");
  return {...input,status:"DRAFT",createdAt:input.createdAt??new Date().toISOString()};
}
export function transitionInvitation(i:Invitation,status:InvitationStatus,at=new Date().toISOString()):Invitation {
  const t:any={}; if(status==="ACCEPTED")t.acceptedAt=at; if(status==="DECLINED")t.declinedAt=at; if(status==="CANCELLED")t.cancelledAt=at;
  if(status==="EXPIRED")t.expiredAt=at; if(status==="REVOKED")t.revokedAt=at; if(status==="COMPLETED")t.completedAt=at; return {...i,status,...t};
}

export type IntentStatus="OPEN"|"PROPOSED"|"AUTHORIZED"|"EXECUTING"|"RESOLVED"|"CANCELLED"|"FAILED";
export interface Intent {id:string;initiatorParticipantId:string;contextId?:string;intentType:string;targetEntityType?:string;targetEntityId?:string;purpose:string;requestedOutcome:string;constraintsReference?:string;status:IntentStatus;createdAt:string;resolvedAt?:string;}
export function createIntent(input:Omit<Intent,"status"|"createdAt">&{createdAt?:string}):Intent {
  for(const k of ["id","initiatorParticipantId","intentType","purpose","requestedOutcome"] as const) if(!input[k].trim()) throw new Error(`Intent ${k} is required`);
  return {...input,status:"OPEN",createdAt:input.createdAt??new Date().toISOString()};
}

export type ProposalStatus="PROPOSED"|"ACCEPTED"|"REJECTED"|"EXPIRED"|"CANCELLED";
export interface Proposal {id:string;proposerParticipantId?:string;sourceType:string;sourceReference:string;intentId:string;contextId?:string;targetEntityType?:string;targetEntityId?:string;proposalType:string;description:string;alternativesReference?:string;estimatedCostReference?:string;estimatedTimingReference?:string;requirementsReference?:string;riskReference?:string;evidenceReference?:string;authorizationRequired:boolean;status:ProposalStatus;createdAt:string;expiresAt?:string;acceptedAt?:string;rejectedAt?:string;}
export function createProposal(input:Omit<Proposal,"status"|"createdAt">&{createdAt?:string}):Proposal {
  for(const k of ["id","sourceType","sourceReference","intentId","proposalType","description"] as const) if(!input[k].trim()) throw new Error(`Proposal ${k} is required`);
  return {...input,status:"PROPOSED",createdAt:input.createdAt??new Date().toISOString()};
}

export type ActionState="REQUESTED"|"PENDING"|"STARTED"|"COMPLETED"|"FAILED"|"CANCELLED"|"REJECTED";
export type VerificationStatus="UNVERIFIED"|"PENDING"|"VERIFIED"|"FAILED";
export interface Action {id:string;actorParticipantId:string;capabilityId:string;authorizationId?:string;intentId?:string;proposalId?:string;contextId?:string;targetEntityType:string;targetEntityId:string;requestedAt:string;startedAt?:string;completedAt?:string;state:ActionState;resultReference?:string;failureCode?:string;failureReference?:string;verificationStatus:VerificationStatus;}
export function createAction(input:Omit<Action,"requestedAt"|"state"|"verificationStatus">&{requestedAt?:string}):Action {
  for(const k of ["id","actorParticipantId","capabilityId","targetEntityType","targetEntityId"] as const) if(!input[k].trim()) throw new Error(`Action ${k} is required`);
  return {...input,requestedAt:input.requestedAt??new Date().toISOString(),state:"REQUESTED",verificationStatus:"UNVERIFIED"};
}
export function markActionCompleted(a:Action,at=new Date().toISOString()):Action{return {...a,state:"COMPLETED",completedAt:at};}
export function verifyAction(a:Action):Action{if(a.state!=="COMPLETED")throw new Error("Only completed actions may be verified");return {...a,verificationStatus:"VERIFIED"};}

export type EventVerificationStatus="UNVERIFIED"|"PENDING"|"VERIFIED"|"FAILED";
export interface Event {id:string;eventType:string;actorParticipantId?:string;subjectEntityType:string;subjectEntityId:string;contextId?:string;actionId?:string;intentId?:string;timestamp:string;correlationId?:string;causationId?:string;payloadReference?:string;verificationStatus:EventVerificationStatus;source:string;}
export function createEvent(input:Omit<Event,"timestamp"|"verificationStatus">&{timestamp?:string;verificationStatus?:EventVerificationStatus}):Event {
  for(const k of ["id","eventType","subjectEntityType","subjectEntityId","source"] as const) if(!input[k].trim()) throw new Error(`Event ${k} is required`);
  return {...input,timestamp:input.timestamp??new Date().toISOString(),verificationStatus:input.verificationStatus??"UNVERIFIED"};
}

export type EvidenceVerificationStatus="UNVERIFIED"|"PENDING"|"VERIFIED"|"REJECTED";
export interface Evidence {id:string;evidenceType:string;subjectEntityType:string;subjectEntityId:string;sourceType:string;sourceReference:string;capturedAt:string;capturedBy?:string;integrityReference?:string;verificationStatus:EvidenceVerificationStatus;retentionPolicyReference?:string;accessPolicyReference?:string;}
export function createEvidence(input:Omit<Evidence,"capturedAt"|"verificationStatus">&{capturedAt?:string;verificationStatus?:EvidenceVerificationStatus}):Evidence {
  for(const k of ["id","evidenceType","subjectEntityType","subjectEntityId","sourceType","sourceReference"] as const) if(!input[k].trim()) throw new Error(`Evidence ${k} is required`);
  return {...input,capturedAt:input.capturedAt??new Date().toISOString(),verificationStatus:input.verificationStatus??"UNVERIFIED"};
}

export interface Resource {id:string;resourceType:string;ownerEntityType:string;ownerEntityId:string;placeId?:string;organizationId?:string;status:"ACTIVE"|"INACTIVE"|"SUSPENDED"|"RETIRED";capacityReference?:string;availabilityReference?:string;}
export function createResource(input:Omit<Resource,"status">&{status?:Resource["status"]}):Resource {
  for(const k of ["id","resourceType","ownerEntityType","ownerEntityId"] as const) if(!input[k].trim()) throw new Error(`Resource ${k} is required`);
  return {...input,status:input.status??"ACTIVE"};
}

export type WorkOrderStatus="DRAFT"|"PENDING"|"AUTHORIZED"|"ASSIGNED"|"IN_PROGRESS"|"COMPLETED"|"FAILED"|"CANCELLED"|"DISPUTED";
export interface WorkOrder {id:string;serviceRequestId:string;providerParticipantId?:string;providerOrganizationId?:string;workerParticipantId?:string;targetEntityType:string;targetEntityId:string;status:WorkOrderStatus;authorizationId?:string;actionId?:string;createdAt:string;startedAt?:string;completedAt?:string;failureReference?:string;}
export function createWorkOrder(input:Omit<WorkOrder,"status"|"createdAt">&{createdAt?:string}):WorkOrder {
  for(const k of ["id","serviceRequestId","targetEntityType","targetEntityId"] as const) if(!input[k].trim()) throw new Error(`WorkOrder ${k} is required`);
  if(!input.providerParticipantId&&!input.providerOrganizationId) throw new Error("WorkOrder requires a provider");
  return {...input,status:"DRAFT",createdAt:input.createdAt??new Date().toISOString()};
}
