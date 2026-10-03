export type BeatPayRail = "M_PESA" | "BANK";
export type BeatPayIntentStatus = "CREATED"|"SUBMITTED"|"PENDING"|"SUCCEEDED"|"FAILED"|"CANCELLED"|"REVERSED"|"REFUNDED";
export type BeatPayDirection = "COLLECTION"|"DISBURSEMENT"|"REFUND";

export interface BeatPayPaymentIntent {
  id:string; participantId:string; direction:BeatPayDirection; rail:BeatPayRail;
  amountMinor:number; currency:string; merchantReference:string;
  status:BeatPayIntentStatus; authorizationReference:string;
  providerReference?:string; externalReceipt?:string; failureCode?:string;
  createdAt:string; updatedAt:string;
}
export interface CreateBeatPayIntentInput {
  id:string; participantId:string; direction:BeatPayDirection; rail:BeatPayRail;
  amountMinor:number; currency:string; merchantReference:string; authorizationReference:string; createdAt?:string;
}
export function createBeatPayIntent(input:CreateBeatPayIntentInput):BeatPayPaymentIntent {
  if(!input.id.trim()) throw new Error("BeatPay intent id is required");
  if(!input.participantId.trim()) throw new Error("BeatPay participant id is required");
  if(!input.merchantReference.trim()) throw new Error("BeatPay merchant reference is required");
  if(!input.authorizationReference.trim()) throw new Error("BeatPay authorization reference is required");
  if(!Number.isSafeInteger(input.amountMinor)||input.amountMinor<=0) throw new Error("BeatPay amountMinor must be a positive safe integer");
  if(!/^[A-Z]{3}$/.test(input.currency)) throw new Error("BeatPay currency must be an ISO-style 3-letter code");
  const now=input.createdAt||new Date().toISOString();
  return {id:input.id,participantId:input.participantId,direction:input.direction,rail:input.rail,amountMinor:input.amountMinor,currency:input.currency,merchantReference:input.merchantReference,status:"CREATED",authorizationReference:input.authorizationReference,createdAt:now,updatedAt:now};
}
const transitions:Record<BeatPayIntentStatus,readonly BeatPayIntentStatus[]>={
  CREATED:["SUBMITTED","CANCELLED","FAILED"],SUBMITTED:["PENDING","SUCCEEDED","FAILED","CANCELLED"],
  PENDING:["SUCCEEDED","FAILED","CANCELLED","REVERSED"],SUCCEEDED:["REVERSED","REFUNDED"],
  FAILED:[],CANCELLED:[],REVERSED:[],REFUNDED:[]
};
export function transitionBeatPayIntent(intent:BeatPayPaymentIntent,next:BeatPayIntentStatus,at=new Date().toISOString(),details:Pick<BeatPayPaymentIntent,"providerReference"|"externalReceipt"|"failureCode">={}):BeatPayPaymentIntent {
  if(!transitions[intent.status].includes(next)) throw new Error("Invalid BeatPay transition: "+intent.status+" -> "+next);
  return {...intent,...details,status:next,updatedAt:at};
}
export interface BeatPayProviderRequest {intentId:string;rail:BeatPayRail;amountMinor:number;currency:string;merchantReference:string;idempotencyKey:string}
export interface BeatPayProviderAccepted {providerReference:string;status:"SUBMITTED"|"PENDING"}
export interface BeatPayProviderStatus {providerReference:string;status:"PENDING"|"SUCCEEDED"|"FAILED"|"REVERSED";externalReceipt?:string;failureCode?:string}
export interface BeatPayProvider {submit(request:BeatPayProviderRequest):Promise<BeatPayProviderAccepted>;query?(providerReference:string):Promise<BeatPayProviderStatus>}
export interface BeatPayCallback {
  eventId:string;providerReference:string;merchantReference:string;status:"SUCCEEDED"|"FAILED"|"REVERSED";
  amountMinor:number;currency:string;externalReceipt?:string;failureCode?:string;occurredAt:string;
}
export type BeatPayCallbackReason="ACCEPTED"|"DUPLICATE"|"UNKNOWN_INTENT"|"REFERENCE_MISMATCH"|"AMOUNT_MISMATCH"|"CURRENCY_MISMATCH"|"INVALID_EVENT";
export interface BeatPayEventStore {hasEvent(eventId:string):Promise<boolean>;recordEvent(eventId:string):Promise<void>}
export async function applyBeatPayCallback(intent:BeatPayPaymentIntent|undefined,callback:BeatPayCallback,store:BeatPayEventStore):Promise<{result:{accepted:boolean;reason:BeatPayCallbackReason};intent?:BeatPayPaymentIntent}> {
  if(!callback.eventId.trim()||!callback.providerReference.trim()||!callback.merchantReference.trim()||!Number.isSafeInteger(callback.amountMinor)||callback.amountMinor<=0) return {result:{accepted:false,reason:"INVALID_EVENT"}};
  if(await store.hasEvent(callback.eventId)) return {result:{accepted:false,reason:"DUPLICATE"}};
  if(!intent) return {result:{accepted:false,reason:"UNKNOWN_INTENT"}};
  if(intent.merchantReference!==callback.merchantReference) return {result:{accepted:false,reason:"REFERENCE_MISMATCH"}};
  if(intent.amountMinor!==callback.amountMinor) return {result:{accepted:false,reason:"AMOUNT_MISMATCH"}};
  if(intent.currency!==callback.currency) return {result:{accepted:false,reason:"CURRENCY_MISMATCH"}};
  const next=transitionBeatPayIntent(intent,callback.status,callback.occurredAt,{providerReference:callback.providerReference,externalReceipt:callback.externalReceipt,failureCode:callback.failureCode});
  await store.recordEvent(callback.eventId);
  return {result:{accepted:true,reason:"ACCEPTED"},intent:next};
}
export function assertNoPaymentSecret(value:unknown):void {
  if(value===null||typeof value!=="object") return;
  if(Object.keys(value as Record<string,unknown>).some(k=>/password|pin|secret|token|private.?key|security.?credential/i.test(k))) throw new Error("BeatPay domain objects must not contain payment credentials or secrets");
}
