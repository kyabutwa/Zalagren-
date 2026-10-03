import type {BeatPayProvider,BeatPayProviderAccepted,BeatPayProviderRequest,BeatPayProviderStatus} from "./beatpay";
export interface BeatPayHttpTransport {request(url:string,init:{method:"GET"|"POST";headers:Record<string,string>;body?:string}):Promise<{status:number;json():Promise<unknown>}>}
export interface BeatPayProviderConfig {rail:"M_PESA"|"BANK";submitUrl:string;statusUrl?:string;credentialReference:string}
export function createHttpBeatPayProvider(config:BeatPayProviderConfig,transport:BeatPayHttpTransport,credentialResolver:(reference:string)=>Promise<string>):BeatPayProvider {
  if(!config.submitUrl.startsWith("https://")) throw new Error("BeatPay provider URL must use HTTPS");
  if(config.statusUrl&&!config.statusUrl.startsWith("https://")) throw new Error("BeatPay provider status URL must use HTTPS");
  if(!config.credentialReference.trim()) throw new Error("BeatPay credential reference is required");
  const read=(p:unknown,k:string)=>{if(!p||typeof p!=="object")throw new Error("Invalid BeatPay provider response");const v=(p as Record<string,unknown>)[k];if(typeof v!=="string"||!v.trim())throw new Error("Missing BeatPay provider response field: "+k);return v};
  return {
    async submit(r:BeatPayProviderRequest):Promise<BeatPayProviderAccepted>{
      const credential=await credentialResolver(config.credentialReference); if(!credential.trim()) throw new Error("BeatPay provider credential resolution failed");
      const response=await transport.request(config.submitUrl,{method:"POST",headers:{"Authorization":"Bearer "+credential,"Content-Type":"application/json","Idempotency-Key":r.idempotencyKey},body:JSON.stringify({intentId:r.intentId,amountMinor:r.amountMinor,currency:r.currency,merchantReference:r.merchantReference})});
      if(response.status<200||response.status>=300) throw new Error("BeatPay provider submission failed with HTTP "+response.status);
      const p=await response.json() as Record<string,unknown>; const providerReference=read(p,"providerReference");
      if(p.status!=="SUBMITTED"&&p.status!=="PENDING") throw new Error("Invalid BeatPay provider submission status");
      return {providerReference,status:p.status};
    },
    async query(providerReference:string):Promise<BeatPayProviderStatus>{
      if(!config.statusUrl) throw new Error("BeatPay provider status URL is not configured");
      const credential=await credentialResolver(config.credentialReference); if(!credential.trim()) throw new Error("BeatPay provider credential resolution failed");
      const response=await transport.request(config.statusUrl.replace(/\/$/,"")+"/"+encodeURIComponent(providerReference),{method:"GET",headers:{"Authorization":"Bearer "+credential}});
      if(response.status<200||response.status>=300) throw new Error("BeatPay provider status query failed with HTTP "+response.status);
      const p=await response.json() as Record<string,unknown>;
      if(p.status!=="PENDING"&&p.status!=="SUCCEEDED"&&p.status!=="FAILED"&&p.status!=="REVERSED") throw new Error("Invalid BeatPay provider status");
      return {providerReference:read(p,"providerReference"),status:p.status,externalReceipt:typeof p.externalReceipt==="string"?p.externalReceipt:undefined,failureCode:typeof p.failureCode==="string"?p.failureCode:undefined};
    }
  };
}
