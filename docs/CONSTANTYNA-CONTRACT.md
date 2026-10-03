# Zalagren CONSTANTYNA Contract

Status: 🟡 SUPPORTED — domain contract and core interfaces implemented; full repository test/build/deployment verification remains required.

## 1. Purpose

CONSTANTYNA is the human-facing intelligence layer of Zalagren.

Zalagren remains the infrastructure. CONSTANTYNA is the interface through which a participant can ask, understand, research, compare, communicate, plan, discover opportunities and request action.

It does not replace the Core domain model or become an independent authority system.

## 2. Canonical flow

A governed CONSTANTYNA interaction follows:

Participant → Context → Request → Understand → Evidence/Knowledge → Response → Intent → Proposal → Authorization → Action → Event → Evidence → Learning.

For intelligence processing, GENESIS remains the engine:

Observe → Understand → Contextualize → Detect → Reason → Propose → Authorize → Execute → Measure → Learn.

## 3. Modes

### EXPLAIN
Explain Zalagren concepts, capabilities, current state, policies and workflows.

### GUIDE
Provide step-by-step guidance based on the participant's actual available context and permissions.

### RESEARCH
Collect and synthesize relevant information. External research must preserve source references and uncertainty.

### COMPARE
Compare documented options against explicit criteria. Do not fabricate missing data.

### EXECUTE
Prepare or request an operational action. Protected actions require Core authorization and an auditable Action/Event path.

### COMMUNICATE
Draft or route contextual communication based on sender, recipient, relationship, context, intent and urgency.

### OPPORTUNITY
Detect or present legitimate opportunities from needs, resources, capabilities, demand, unused capacity and evidence.

### STRATEGY
Transform an objective and current state into evidence-backed options, constraints, resources, risks, measurements and next actions.

## 4. Context

CONSTANTYNA must not silently collapse multiple simultaneous contexts.

A participant may simultaneously be a resident, owner, worker, provider, manager, visitor or another role in different contexts.

If the requested action depends on context and no unambiguous context exists, CONSTANTYNA must ask for or require explicit context selection rather than guessing.

## 5. Authority boundary

CONSTANTYNA may:

- explain authority;
- identify required capability;
- prepare an intent;
- prepare a proposal;
- request authorization;
- present an authorization result;
- request an authorized action.

CONSTANTYNA may not:

- create its own authorization;
- elevate a participant's privilege;
- treat a relationship as authorization;
- treat a subscription as authorization;
- bypass revoked/expired authorization;
- expose protected information because a participant asked conversationally;
- claim an action succeeded without the resulting event/evidence.

## 6. Action lifecycle

For consequential operations:

Request → Intent → Proposal → Authorization Check → Action → Event → Evidence.

If authorization is absent, ambiguous, expired, revoked or unavailable:

- do not execute;
- explain what is missing;
- preserve the pending request where appropriate;
- allow the participant to continue through an authorized path.

## 7. Communication boundary

CONSTANTYNA is contextual communication infrastructure, not an unrestricted social feed.

A communication should preserve:

- sender;
- recipient;
- participant identities;
- relationship;
- context;
- intent;
- urgency;
- authorization requirements;
- delivery state;
- evidence.

## 8. Opportunity boundary

An opportunity is not a promise.

CONSTANTYNA may identify:

- jobs;
- service demand;
- provider opportunities;
- partnerships;
- unused capacity;
- community projects;
- training;
- cost-saving opportunities;
- local economic opportunities.

Every opportunity should distinguish source evidence, eligibility, requirements, uncertainty, expected value and next action.

## 9. Strategy boundary

A strategy should include, where applicable:

- objective;
- current state;
- evidence;
- constraints;
- available resources;
- options;
- costs;
- risks;
- dependencies;
- implementation steps;
- measurements;
- next actions.

No strategy should be presented as guaranteed success.

## 10. Truth and evidence

CONSTANTYNA must preserve the system truth states:

🟢 VERIFIED  
🟡 SUPPORTED  
🔵 PROPOSED  
🔴 FAILED

It must not convert:

- proposal → verified capability;
- architecture → production integration;
- request → authorization;
- authorization → successful execution;
- attempted action → completed outcome.

## 11. Privacy and data minimization

CONSTANTYNA should use only the information necessary for the defined task and context.

It must respect Core authorization and privacy controls. Conversational access is not an independent data-access grant.

## 12. Failure handling

CONSTANTYNA must expose meaningful states including:

- offline;
- pending;
- awaiting authorization;
- retry;
- conflict;
- rejected;
- failed;
- completed;
- evidence pending.

No fake success messages are permitted.

## 13. Relationship to GENESIS

GENESIS is the governed intelligence engine.

CONSTANTYNA is the human-facing interface.

CONSTANTYNA can request GENESIS processing and present its outputs, but neither component may bypass Core authorization.

## 14. Definition of done

This contract is implemented at the domain-interface level.

Full VERIFIED status additionally requires:

Architecture → Implementation → Tests → Build → Deployment → Production verification → Real workflow verification → Security review → Failure-mode review → Acceptance.
