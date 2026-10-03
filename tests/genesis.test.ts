import {
  advanceGenesisRun,
  attachGenesisAction,
  attachGenesisObservation,
  attachGenesisProposal,
  canGenesisExecute,
  createGenesisProposal,
  createGenesisRun,
} from "../intelligence/genesis";

describe("GENESIS", () => {
  it("creates a governed intelligence run", () => {
    const run = createGenesisRun({
      id: "genesis-1",
      objective: "Find the cause of an unresolved maintenance issue",
    });

    expect(run.stage).toBe("OBSERVE");
    expect(run.status).toBe("RECEIVED");
  });

  it("advances only through the canonical loop", () => {
    const run = createGenesisRun({ id: "genesis-1", objective: "Test loop" });
    const understood = advanceGenesisRun(run, "UNDERSTAND", "ANALYZING");
    expect(understood.stage).toBe("UNDERSTAND");

    expect(() =>
      advanceGenesisRun(understood, "PROPOSE", "PROPOSED"),
    ).toThrow();
  });

  it("attaches observations, proposals and actions without duplication", () => {
    let run = createGenesisRun({ id: "genesis-1", objective: "Test records" });
    run = attachGenesisObservation(run, "obs-1");
    run = attachGenesisObservation(run, "obs-1");
    run = attachGenesisProposal(run, "proposal-1");
    run = attachGenesisAction(run, "action-1");

    expect(run.observationIds).toEqual(["obs-1"]);
    expect(run.proposalIds).toEqual(["proposal-1"]);
    expect(run.actionIds).toEqual(["action-1"]);
  });

  it("requires authorization before consequential execution", () => {
    const proposal = createGenesisProposal({
      id: "proposal-1",
      genesisRunId: "genesis-1",
      proposedAction: "Access Unit 42",
      rationale: "Approved maintenance task",
      evidenceReferenceIds: ["evidence-1"],
      authorizationRequired: true,
      status: "PROPOSED",
    });

    expect(canGenesisExecute(false, proposal)).toBe(false);
    expect(canGenesisExecute(true, proposal)).toBe(true);
  });
});
