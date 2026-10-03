export type ActivityType="INTENT"|"PROPOSAL"|"ACTION"|"EVENT"|"EVIDENCE"|"SECURITY"|"SERVICE";
export type NotificationStatus="UNREAD"|"READ"|"ARCHIVED";
export type ComplianceState="NOT_STARTED"|"SUPPORTED"|"REQUIRES_ACTION"|"VERIFIED"|"EXPIRED";
export type SupportRequestStatus="OPEN"|"IN_PROGRESS"|"RESOLVED"|"CLOSED";

export interface ParticipantActivity { id:string; participantId:string; type:ActivityType; title:string; summary:string; status:string; occurredAt:string; eventId?:string; contextId?:string; }
export interface ParticipantNotification { id:string; participantId:string; title:string; body:string; status:NotificationStatus; createdAt:string; readAt?:string; actionReference?:string; }
export interface ComplianceReview { id:string; participantId:string; scope:string; state:ComplianceState; requirements:readonly string[]; reviewedAt?:string; evidenceReferences:readonly string[]; }
export interface SupportRequest { id:string; participantId:string; category:string; description:string; status:SupportRequestStatus; createdAt:string; resolvedAt?:string; }

export function markNotificationRead(notification:ParticipantNotification,at=new Date().toISOString()):ParticipantNotification { return {...notification,status:"READ",readAt:at}; }
export function createSupportRequest(input:{id:string;participantId:string;category:string;description:string;createdAt?:string}):SupportRequest {
  if(!input.id.trim()||!input.participantId.trim()||!input.category.trim()||!input.description.trim()) throw new Error("INVALID_SUPPORT_REQUEST");
  return {...input,status:"OPEN",createdAt:input.createdAt??new Date().toISOString()};
}
