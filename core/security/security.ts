export type AuthenticationMethodKind = "PASSWORD" | "EMAIL_CODE" | "PHONE_CODE" | "TOTP" | "PLATFORM_BIOMETRIC" | "RECOVERY";
export type AuthenticationMethodStatus = "ACTIVE" | "REVOKED" | "EXPIRED";
export type DeviceStatus = "TRUSTED" | "UNTRUSTED" | "REVOKED";
export type AssuranceLevel = "BASIC" | "VERIFIED" | "STEP_UP";
export type VerificationChannel = "EMAIL" | "PHONE" | "IDENTITY_DOCUMENT";
export type VerificationChallengeStatus = "PENDING" | "VERIFIED" | "FAILED" | "EXPIRED" | "SUPERSEDED";

export interface AuthenticationMethod { id:string; accountId:string; kind:AuthenticationMethodKind; status:AuthenticationMethodStatus; enrolledAt:string; lastUsedAt?:string; revokedAt?:string; }
export interface SecurityDevice { id:string; accountId:string; label:string; status:DeviceStatus; firstSeenAt:string; lastSeenAt:string; revokedAt?:string; }
export interface VerificationChallenge { id:string; accountId:string; identityId:string; channel:VerificationChannel; targetReference:string; status:VerificationChallengeStatus; requestedAt:string; expiresAt:string; attemptCount:number; providerReference?:string; lastErrorCode?:string; }
export interface SecurityPosture { accountId:string; assurance:AssuranceLevel; requiresReauthentication:boolean; compromised:boolean; activeAuthenticationMethods:number; trustedDevices:number; }

export function isChallengeUsable(challenge:VerificationChallenge, now=new Date()):boolean {
  return challenge.status==="PENDING" && now < new Date(challenge.expiresAt);
}
export function recordVerificationAttempt(challenge:VerificationChallenge, result:"VERIFIED"|"FAILED", at=new Date().toISOString()):VerificationChallenge {
  if(!isChallengeUsable(challenge,new Date(at))) throw new Error("VERIFICATION_CHALLENGE_NOT_USABLE");
  return {...challenge,attemptCount:challenge.attemptCount+1,status:result,lastErrorCode:result==="FAILED"?(challenge.lastErrorCode??"VERIFICATION_FAILED"):undefined};
}
