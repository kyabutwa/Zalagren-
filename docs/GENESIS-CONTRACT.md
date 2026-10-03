# GENESIS Contract

## Purpose

GENESIS is Zalagren's intelligence engine for observing the ecosystem, understanding context,
detecting needs/opportunities/risks, reasoning over evidence, proposing actions, participating
in authorized execution, measuring outcomes and learning from verified events.

GENESIS is an orchestrator of intelligence, not a source of authority.

## Canonical loop

**Observe → Understand → Contextualize → Detect → Reason → Propose → Authorize → Execute → Measure → Learn**

Each stage has a distinct responsibility.

### 1. Observe

Collect or receive permitted signals, events and evidence.

Observations must preserve:
- source;
- subject;
- context where known;
- observation time;
- provenance;
- verification status.

GENESIS must not represent an unverified observation as verified.

### 2. Understand

Normalize and interpret observations into useful knowledge candidates.

Understanding does not make a claim true. Knowledge may remain provisional or supported until
sufficient evidence exists.

### 3. Contextualize

Resolve the relevant participant, community, organization, place, relationship, context,
capability and temporal scope.

Multiple active contexts must not be silently collapsed.

### 4. Detect

Identify possible:
- needs;
- opportunities;
- risks;
- anomalies;
- unmet requests;
- resource/utilization patterns.

Detection is a signal, not a final decision.

### 5. Reason

Compare available evidence, constraints, policies, costs, timing, capabilities and possible
outcomes.

Reasoning must distinguish evidence from inference and uncertainty.

### 6. Propose

Generate a structured proposal containing an intended outcome, proposed action, rationale,
requirements and supporting evidence references.

A proposal does not execute itself.

### 7. Authorize

GENESIS may evaluate or request authorization through the Core authorization boundary.

GENESIS must never:
- invent authority;
- grant itself authority;
- convert subscription into authority;
- bypass contextual authorization;
- treat a user request as sufficient authorization for another participant's protected data.

### 8. Execute

GENESIS may participate in execution only when the required authorization exists and the
operation is allowed.

Execution must create/associate a Core Action and preserve the authorization reference.

If authorization is absent, ambiguous, revoked, expired or stale, execution must stop or
remain pending.

### 9. Measure

After an action, GENESIS records and evaluates the resulting events and verified state.

A requested action is not a successful outcome.

### 10. Learn

Learning updates future reasoning from verified events/evidence and explicit feedback.

Learning must not silently rewrite historical evidence or invent facts.

## Canonical data

GENESIS uses these intelligence records:

- Observation
- KnowledgeItem
- IntelligenceRun
- Proposal/Recommendation
- Strategy where applicable

These records reference the Core graph rather than replacing it.

## Safety boundaries

1. Intelligence never becomes identity.
2. Intelligence never becomes authorization.
3. Intelligence never bypasses relationship/context resolution.
4. Intelligence never fabricates evidence.
5. Intelligence never treats stale data as current authorization.
6. Consequential actions remain auditable.
7. Ambiguous multi-context operations require explicit context.
8. Failed execution is not represented as success.
9. Sensitive information follows minimum-necessary access.
10. Human/community authority remains explicit.

## CONSTANTYNA boundary

CONSTANTYNA is the governed human-facing intelligence interface.

GENESIS is the underlying intelligence/orchestration engine.

CONSTANTYNA may communicate GENESIS findings, research, proposals and execution state to
participants, while the Core remains the authority boundary.

## Example

A community has an unresolved maintenance need:

Observation → maintenance event/evidence  
Understand → classify the issue  
Contextualize → identify Community A + Building B + relevant participant/context  
Detect → detect an unmet maintenance need  
Reason → evaluate qualified providers, cost, timing and constraints  
Propose → produce repair options  
Authorize → obtain required authority  
Execute → create and perform the authorized action  
Measure → verify completion  
Learn → retain verified outcome/evidence

## Truth state

🟡 SUPPORTED / IMPLEMENTED — GENESIS domain and contract are added. Full repository tests,
build, deployment, production verification and real workflow verification remain required before
this can be marked 🟢 VERIFIED.
