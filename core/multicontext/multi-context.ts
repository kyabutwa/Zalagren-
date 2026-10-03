import type {Relationship} from "../relationship/relationship";
import type {Context} from "../context/context";
export interface ContextSelection { participantId:string; contextId?:string; relationshipId?:string; relationship?:Relationship; context?:Context; requiresExplicitSelection:boolean; reason?:string; }
export function resolveActiveRelationships(participantId:string,rs:Relationship[],at=new Date().toISOString()):Relationship[] { return rs.filter(r=>r.subjectParticipantId===participantId&&r.status==="ACTIVE"&&r.effectiveFrom<=at&&(!r.effectiveUntil||r.effectiveUntil>at)); }
export function resolveActiveContexts(participantId:string,cs:Context[],at=new Date().toISOString()):Context[] { return cs.filter(c=>(!c.participantId||c.participantId===participantId)&&c.status==="ACTIVE"&&c.startAt<=at&&(!c.endAt||c.endAt>at)); }
export function selectContext(participantId:string,rs:Relationship[],cs:Context[],requestedContextId?:string):ContextSelection {
  const activeR=resolveActiveRelationships(participantId,rs),activeC=resolveActiveContexts(participantId,cs);
  if(requestedContextId){const c=activeC.find(x=>x.id===requestedContextId);if(!c)throw new Error("Requested context is not active or does not belong to participant");const r=c.relationshipId?activeR.find(x=>x.id===c.relationshipId):undefined;return {participantId,contextId:c.id,relationshipId:r?.id,relationship:r,context:c,requiresExplicitSelection:false};}
  if(activeC.length===1)return {participantId,contextId:activeC[0].id,relationshipId:activeC[0].relationshipId,context:activeC[0],requiresExplicitSelection:false};
  if(activeC.length>1)return {participantId,requiresExplicitSelection:true,reason:"Multiple active contexts require explicit context selection"};
  if(activeR.length>1)return {participantId,requiresExplicitSelection:true,reason:"Multiple active relationships require explicit context selection"};
  return {participantId,requiresExplicitSelection:false};
}