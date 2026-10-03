export type ContextStatus = "ACTIVE" | "INACTIVE" | "EXPIRED" | "CLOSED";
export interface Context { id:string; contextType:string; participantId?:string; communityId?:string; organizationId?:string; placeId?:string; relationshipId?:string; purpose?:string; startAt:string; endAt?:string; status:ContextStatus; }
export interface CreateContextInput { id:string; contextType:string; participantId?:string; communityId?:string; organizationId?:string; placeId?:string; relationshipId?:string; purpose?:string; startAt?:string; endAt?:string; }
export function createContext(input:CreateContextInput):Context {
  if (!input.id.trim()) throw new Error("Context id is required");
  if (!input.contextType.trim()) throw new Error("Context type is required");
  const start=input.startAt ?? new Date().toISOString();
  if (input.endAt && start>input.endAt) throw new Error("Context endAt cannot precede startAt");
  return {...input,status:"ACTIVE",startAt:start};
}
export function closeContext(c:Context,at=new Date().toISOString()):Context { return {...c,status:"CLOSED",endAt:c.endAt ?? at}; }