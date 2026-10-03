import {createRelationship,endRelationship} from "../core/relationship/relationship";
import {createContext,closeContext} from "../core/context/context";
import {resolveActiveRelationships,selectContext} from "../core/multicontext/multi-context";

const resident=createRelationship({id:"rel-1",subjectParticipantId:"p-1",targetEntityType:"COMMUNITY",targetEntityId:"community-a",relationshipType:"RESIDENT"});
const worker=createRelationship({id:"rel-2",subjectParticipantId:"p-1",targetEntityType:"ORGANIZATION",targetEntityId:"org-c",relationshipType:"WORKER"});
const home=createContext({id:"ctx-home",contextType:"RESIDENTIAL",participantId:"p-1",communityId:"community-a",relationshipId:"rel-1",placeId:"unit-42"});
const work=createContext({id:"ctx-work",contextType:"WORK",participantId:"p-1",organizationId:"org-c",relationshipId:"rel-2"});

if(resolveActiveRelationships("p-1",[resident,worker]).length!==2) throw new Error("Multiple active relationships must coexist");
if(!selectContext("p-1",[resident,worker],[home,work]).requiresExplicitSelection) throw new Error("Ambiguous contexts must require explicit selection");
const selected=selectContext("p-1",[resident,worker],[home,work],"ctx-home");
if(selected.contextId!=="ctx-home"||selected.relationshipId!=="rel-1") throw new Error("Explicit selection failed");
const ended=endRelationship(resident,"2026-10-03T00:00:00.000Z");
if(ended.status!=="ENDED"||ended.id!=="rel-1") throw new Error("Relationship termination must preserve identity");
const closed=closeContext(home,"2026-10-03T00:00:00.000Z");
if(closed.status!=="CLOSED"||closed.id!=="ctx-home") throw new Error("Context closure must preserve identity");