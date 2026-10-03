import { isChallengeUsable, recordVerificationAttempt, createSupportRequest, markNotificationRead } from "../core/index";
import { getProtectedService, ZALAGREN_PROTECTED_SERVICES } from "../services/index";

test("verification challenge is time bounded and records attempts",()=>{
 const c={id:"c",accountId:"a",identityId:"i",channel:"EMAIL" as const,targetReference:"hash",status:"PENDING" as const,requestedAt:"2026-10-03T00:00:00Z",expiresAt:"2026-10-03T01:00:00Z",attemptCount:0};
 expect(isChallengeUsable(c,new Date("2026-10-03T00:30:00Z"))).toBe(true);
 expect(recordVerificationAttempt(c,"FAILED","2026-10-03T00:30:00Z").attemptCount).toBe(1);
});
test("participant operations remain explicit",()=>{
 const n=markNotificationRead({id:"n",participantId:"p",title:"t",body:"b",status:"UNREAD",createdAt:"2026-10-03T00:00:00Z"},"2026-10-03T00:01:00Z");
 expect(n.status).toBe("READ");
 const s=createSupportRequest({id:"s",participantId:"p",category:"account",description:"Need help"});
 expect(s.status).toBe("OPEN");
});
test("protected services are platform capabilities, not duplicate apps",()=>{
 expect(ZALAGREN_PROTECTED_SERVICES).toHaveLength(2);
 expect(getProtectedService("beatguardian")?.requiresAuthorization).toBe(true);
 expect(getProtectedService("beatutilities")?.requiresProvider).toBe(true);
});
