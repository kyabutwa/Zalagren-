import {createObservation,createKnowledgeItem,createIntelligenceRun,createRecommendation,createStrategy} from "../core/intelligence";
describe("canonical intelligence foundation",()=>{
 test("keeps intelligence evidence and proposals explicit",()=>{
  const o=createObservation({id:"o1",sourceType:"SYSTEM",sourceReference:"signal1",subjectEntityType:"PARTICIPANT",subjectEntityId:"p1",confidence:.9});
  const k=createKnowledgeItem({id:"k1",sourceObservationIds:[o.id],subjectEntityType:"PARTICIPANT",subjectEntityId:"p1",statement:"Need detected"});
  const r=createIntelligenceRun({id:"run1",engine:"GENESIS",objective:"understand need"});
  const rec=createRecommendation({id:"rec1",sourceRunId:r.id,objective:"solve need",recommendation:"propose service",evidenceIds:[k.id],authorizationRequired:true});
  const s=createStrategy({id:"s1",objective:"solve need",currentState:"need detected",evidenceIds:[k.id],constraints:[],opportunities:[],resources:[],risks:[],options:["service"],implementationSteps:["authorize"],measurement:"resolution rate"});
  expect(o.verificationStatus).toBe("UNVERIFIED"); expect(k.status).toBe("PROVISIONAL"); expect(r.status).toBe("RECEIVED"); expect(rec.status).toBe("PROPOSED"); expect(s.status).toBe("PROPOSED");
 });
});
