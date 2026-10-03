import { createPerson, deactivatePerson } from "../people/person";

const person = createPerson({
  id: "person-1",
  identityId: "identity-1",
  participantId: "participant-1",
  displayName: "Test Person",
});

if (person.status !== "ACTIVE") throw new Error("Person must start ACTIVE");
if (person.identityId !== "identity-1") throw new Error("Identity linkage must be preserved");
if (person.participantId !== "participant-1") throw new Error("Participant linkage must be preserved");

const independent = createPerson({
  id: "person-2",
  identityId: "identity-2",
  participantId: "participant-2",
  displayName: "Independent Participant",
});

if (independent.accountId !== undefined) throw new Error("Independent participation must not require an account at this boundary");

const deactivated = deactivatePerson(person, "2026-10-03T00:00:00.000Z");
if (deactivated.status !== "DEACTIVATED") throw new Error("Person must deactivate");
if (deactivated.identityId !== person.identityId) throw new Error("Identity linkage must survive deactivation");
if (deactivated.participantId !== person.participantId) throw new Error("Participant linkage must survive deactivation");
