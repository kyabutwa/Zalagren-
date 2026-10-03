import {createCredential,revokeCredential,createDevice,trustDevice,revokeDevice,createRecoveryMethod} from "../core/account/security";
describe("account security domain",()=>{
 test("credentials are references, not raw secrets",()=>{const c=createCredential({id:"c1",accountId:"a1",type:"PASSKEY",providerOrPlatform:"PLATFORM",credentialReference:"credential-ref"});expect(c.status).toBe("ACTIVE");expect(revokeCredential(c).status).toBe("REVOKED");});
 test("devices have explicit trust and revocation",()=>{const d=createDevice({id:"d1",accountId:"a1",platform:"iOS",deviceReference:"device-ref"});expect(d.trustStatus).toBe("PENDING");expect(trustDevice(d).trustStatus).toBe("TRUSTED");expect(revokeDevice(d).trustStatus).toBe("REVOKED");});
 test("recovery methods remain auditable",()=>{const r=createRecoveryMethod({id:"r1",accountId:"a1",type:"EMAIL",reference:"recovery-ref"});expect(r.status).toBe("ACTIVE");});
});
