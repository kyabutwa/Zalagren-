export type ConstantynaPlan="NORMAL"|"PLUS"|"PREMIUM";
export type ConstantynaCapabilityRisk="NONE"|"LOW"|"MEDIUM"|"HIGH";

export interface ConstantynaCapability {
  code:string;
  description:string;
  minimumPlan:ConstantynaPlan;
  risk:ConstantynaCapabilityRisk;
  requiresConfirmation:boolean;
}

const rank:Record<ConstantynaPlan,number>={NORMAL:0,PLUS:1,PREMIUM:2};

export const CONSTANTYNA_CAPABILITIES:readonly ConstantynaCapability[]=[
 {code:"explain_zalagren",description:"Explain Zalagren, its ecosystem, capabilities and limits.",minimumPlan:"NORMAL",risk:"NONE",requiresConfirmation:false},
 {code:"navigate",description:"Open an authorized Zalagren surface.",minimumPlan:"NORMAL",risk:"NONE",requiresConfirmation:false},
 {code:"discover",description:"Find available communities, places, services and opportunities from available evidence.",minimumPlan:"NORMAL",risk:"NONE",requiresConfirmation:false},
 {code:"compare",description:"Compare available options using available evidence.",minimumPlan:"NORMAL",risk:"NONE",requiresConfirmation:false},
 {code:"community_guidance",description:"Explain community participation and onboarding paths.",minimumPlan:"NORMAL",risk:"NONE",requiresConfirmation:false},
 {code:"opportunity_scan",description:"Scan available context for actionable opportunities and missing-data explanations.",minimumPlan:"PLUS",risk:"NONE",requiresConfirmation:false},
 {code:"research",description:"Use enabled external research and clearly separate external evidence from Zalagren facts.",minimumPlan:"PLUS",risk:"NONE",requiresConfirmation:false},
 {code:"proposal",description:"Prepare a governed proposal for participant review.",minimumPlan:"PLUS",risk:"LOW",requiresConfirmation:true},
 {code:"orchestration",description:"Coordinate eligible multi-step workflows.",minimumPlan:"PREMIUM",risk:"MEDIUM",requiresConfirmation:true},
 {code:"consequential_action",description:"Execute a consequential action only after Core authorization and required confirmation.",minimumPlan:"PREMIUM",risk:"HIGH",requiresConfirmation:true}
];

export function hasConstantynaCapability(plan:ConstantynaPlan,code:string):boolean{
 const capability=CONSTANTYNA_CAPABILITIES.find(x=>x.code===code);
 return Boolean(capability&&rank[plan]>=rank[capability.minimumPlan]);
}
