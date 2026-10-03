export type RelationshipStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "ENDED";

export interface Relationship { id:string; subjectParticipantId:string; targetEntityType:string; targetEntityId:string; relationshipType:string; status:RelationshipStatus; effectiveFrom:string; effectiveUntil?:string; source?:string; createdBy?:string; endedAt?:string; endedBy?:string; }

export interface CreateRelationshipInput { id:string; subjectParticipantId:string; targetEntityType:string; targetEntityId:string; relationshipType:string; effectiveFrom?:string; effectiveUntil?:string; source?:string; createdBy?:string; }

export function createRelationship(input:CreateRelationshipInput):Relationship {
  for (const key of ["id","subjectParticipantId","targetEntityType","targetEntityId","relationshipType"] as const)
    if (!input[key].trim()) throw new Error(`Relationship ${key} is required`);
  return { ...input, status:"ACTIVE", effectiveFrom:input.effectiveFrom ?? new Date().toISOString() };
}
export function endRelationship(r:Relationship, at=new Date().toISOString(), endedBy?:string):Relationship {
  return {...r,status:"ENDED",effectiveUntil:r.effectiveUntil ?? at,endedAt:at,endedBy};
}