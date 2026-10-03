export type CredentialStatus="ACTIVE"|"REVOKED"|"EXPIRED"|"SUSPENDED";
export interface Credential {id:string;accountId:string;type:string;providerOrPlatform:string;credentialReference:string;status:CredentialStatus;createdAt:string;lastUsedAt?:string;revokedAt?:string;}
export function createCredential(input:Omit<Credential,"status"|"createdAt">&{createdAt?:string}):Credential {
 for(const k of ["id","accountId","type","providerOrPlatform","credentialReference"] as const) if(!input[k].trim()) throw new Error(`Credential ${k} is required`);
 return {...input,status:"ACTIVE",createdAt:input.createdAt??new Date().toISOString()};
}
export function revokeCredential(c:Credential,at=new Date().toISOString()):Credential{return {...c,status:"REVOKED",revokedAt:at};}

export type DeviceTrustStatus="TRUSTED"|"PENDING"|"REVOKED";
export interface Device {id:string;accountId:string;platform:string;deviceReference:string;trustStatus:DeviceTrustStatus;createdAt:string;lastSeenAt?:string;revokedAt?:string;}
export function createDevice(input:Omit<Device,"trustStatus"|"createdAt">&{createdAt?:string}):Device {
 for(const k of ["id","accountId","platform","deviceReference"] as const) if(!input[k].trim()) throw new Error(`Device ${k} is required`);
 return {...input,trustStatus:"PENDING",createdAt:input.createdAt??new Date().toISOString()};
}
export function trustDevice(d:Device):Device{return {...d,trustStatus:"TRUSTED"};}
export function revokeDevice(d:Device,at=new Date().toISOString()):Device{return {...d,trustStatus:"REVOKED",revokedAt:at};}

export type RecoveryMethodStatus="ACTIVE"|"REVOKED"|"EXPIRED";
export interface RecoveryMethod {id:string;accountId:string;type:string;reference:string;status:RecoveryMethodStatus;createdAt:string;verifiedAt?:string;revokedAt?:string;}
export function createRecoveryMethod(input:Omit<RecoveryMethod,"status"|"createdAt">&{createdAt?:string}):RecoveryMethod {
 for(const k of ["id","accountId","type","reference"] as const) if(!input[k].trim()) throw new Error(`RecoveryMethod ${k} is required`);
 return {...input,status:"ACTIVE",createdAt:input.createdAt??new Date().toISOString()};
}
