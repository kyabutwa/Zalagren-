export type ObservationVerificationStatus="UNVERIFIED"|"SUPPORTED"|"VERIFIED";
export interface Observation {id:string;sourceType:string;sourceReference:string;subjectEntityType:string;subjectEntityId:string;contextId?:string;observedAt:string;dataReference?:string;confidence?:number;verificationStatus:ObservationVerificationStatus;}
export function createObservation(input:Omit<Observation,"observedAt"|"verificationStatus">&{observedAt?:string;verificationStatus?:ObservationVerificationStatus}):Observation {
 for(const k of ["id","sourceType","sourceReference","subjectEntityType","subjectEntityId"] as const) if(!input[k].trim()) throw new Error(`Observation ${k} is required`);
 if(input.confidence!==undefined&&(input.confidence<0||input.confidence>1)) throw new Error("Observation confidence must be between 0 and 1");
 return {...input,observedAt:input.observedAt??new Date().toISOString(),verificationStatus:input.verificationStatus??"UNVERIFIED"};
}
export type KnowledgeStatus="PROVISIONAL"|"SUPPORTED"|"VERIFIED"|"REJECTED";
export interface KnowledgeItem {id:string;sourceObservationIds:string[];subjectEntityType:string;subjectEntityId:string;contextId?:string;statement:string;confidence?:number;status:KnowledgeStatus;createdAt:string;}
export function createKnowledgeItem(input:Omit<KnowledgeItem,"status"|"createdAt">&{status?:KnowledgeStatus;createdAt?:string}):KnowledgeItem {
 if(!input.id.trim())throw new Error("KnowledgeItem id is required"); if(!input.statement.trim())throw new Error("KnowledgeItem statement is required");
 return {...input,status:input.status??"PROVISIONAL",createdAt:input.createdAt??new Date().toISOString()};
}
export type IntelligenceRunStatus="RECEIVED"|"ANALYZING"|"PROPOSED"|"AWAITING_AUTHORIZATION"|"EXECUTING"|"COMPLETED"|"FAILED"|"CANCELLED";
export interface IntelligenceRun {id:string;engine:string;initiatorParticipantId?:string;contextId?:string;objective:string;status:IntelligenceRunStatus;observationIds:string[];knowledgeItemIds:string[];proposalIds:string[];actionIds:string[];startedAt:string;completedAt?:string;failureCode?:string;}
export function createIntelligenceRun(input:Omit<IntelligenceRun,"status"|"observationIds"|"knowledgeItemIds"|"proposalIds"|"actionIds"|"startedAt">&{startedAt?:string}):IntelligenceRun {
 if(!input.id.trim())throw new Error("IntelligenceRun id is required"); if(!input.engine.trim())throw new Error("IntelligenceRun engine is required"); if(!input.objective.trim())throw new Error("IntelligenceRun objective is required");
 return {...input,status:"RECEIVED",observationIds:[],knowledgeItemIds:[],proposalIds:[],actionIds:[],startedAt:input.startedAt??new Date().toISOString()};
}
export type RecommendationStatus="PROPOSED"|"ACCEPTED"|"REJECTED"|"EXPIRED";
export interface Recommendation {id:string;sourceRunId:string;participantId?:string;contextId?:string;objective:string;recommendation:string;evidenceIds:string[];alternatives?:string[];authorizationRequired:boolean;status:RecommendationStatus;createdAt:string;}
export function createRecommendation(input:Omit<Recommendation,"status"|"createdAt">&{createdAt?:string}):Recommendation {
 if(!input.id.trim()||!input.sourceRunId.trim()||!input.objective.trim()||!input.recommendation.trim())throw new Error("Recommendation required fields are missing");
 return {...input,status:"PROPOSED",createdAt:input.createdAt??new Date().toISOString()};
}
export interface Strategy {id:string;participantId?:string;contextId?:string;objective:string;currentState:string;evidenceIds:string[];constraints:string[];opportunities:string[];resources:string[];risks:string[];options:string[];implementationSteps:string[];measurement:string;status:"PROPOSED"|"ACTIVE"|"COMPLETED"|"CANCELLED";createdAt:string;}
export function createStrategy(input:Omit<Strategy,"status"|"createdAt">&{createdAt?:string}):Strategy {
 if(!input.id.trim()||!input.objective.trim()||!input.currentState.trim())throw new Error("Strategy required fields are missing");
 return {...input,status:"PROPOSED",createdAt:input.createdAt??new Date().toISOString()};
}
