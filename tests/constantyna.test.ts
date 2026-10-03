import {
  canConstantynaExecute,
  cancelConstantynaAction,
  createConstantynaActionRequest,
  createConstantynaRequest,
  createConstantynaResponse,
} from "../intelligence/constantyna";

describe("CONSTANTYNA", () => {
  test("creates a governed request", () => {
    const request = createConstantynaRequest({
      id: "req-1",
      participantId: "participant-1",
      mode: "EXPLAIN",
      message: "Explain Zalagren",
    });

    expect(request.mode).toBe("EXPLAIN");
  });

  test("creates a response with explicit truth status", () => {
    const response = createConstantynaResponse({
      id: "resp-1",
      requestId: "req-1",
      type: "ANSWER",
      content: "Zalagren is intelligent living infrastructure.",
      evidence: [],
      authorizationRequired: false,
      status: "SUPPORTED",
    });

    expect(response.status).toBe("SUPPORTED");
  });

  test("protected execution fails without authorization", () => {
    const action = createConstantynaActionRequest({
      id: "action-1",
      requestId: "req-1",
      participantId: "participant-1",
      targetEntityType: "UNIT",
      targetEntityId: "unit-1",
      intent: "enter unit",
      proposedAction: "authorize entry",
      authorizationRequired: true,
      status: "PENDING_AUTHORIZATION",
    });

    expect(canConstantynaExecute(action, false)).toBe(false);
    expect(canConstantynaExecute(action, true)).toBe(false);
  });

  test("authorized protected execution still requires an authorization-approved state", () => {
    const action = createConstantynaActionRequest({
      id: "action-2",
      requestId: "req-2",
      participantId: "participant-1",
      targetEntityType: "SERVICE",
      targetEntityId: "service-1",
      intent: "request service",
      proposedAction: "submit service request",
      authorizationRequired: true,
      status: "AUTHORIZED",
    });

    expect(canConstantynaExecute(action, true)).toBe(true);
  });

  test("non-authorized actions still fail closed when execution is not allowed", () => {
    const action = createConstantynaActionRequest({
      id: "action-3",
      requestId: "req-3",
      participantId: "participant-1",
      targetEntityType: "PROPOSAL",
      targetEntityId: "proposal-1",
      intent: "review proposal",
      proposedAction: "open proposal",
      authorizationRequired: false,
      status: "PENDING_AUTHORIZATION",
    });

    expect(canConstantynaExecute(action, false)).toBe(false);
  });

  test("cancellation preserves a non-executed request", () => {
    const action = createConstantynaActionRequest({
      id: "action-4",
      requestId: "req-4",
      participantId: "participant-1",
      targetEntityType: "PROPOSAL",
      targetEntityId: "proposal-1",
      intent: "review proposal",
      proposedAction: "open proposal",
      authorizationRequired: false,
      status: "PENDING_AUTHORIZATION",
    });

    expect(cancelConstantynaAction(action).status).toBe("CANCELLED");
  });
});
