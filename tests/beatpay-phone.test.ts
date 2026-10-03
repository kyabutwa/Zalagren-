import {
  assertPhoneScannerDoesNotPersistBiometricMaterial,
  beginPhonePalmCapture,
  createPhoneScanner,
  recognizePhonePalm
} from "../services/beatpay-phone";

describe("BeatPay phone scanner", () => {
  it("allows a service provider phone to scan a participant hand", () => {
    const scanner = createPhoneScanner({
      scannerId: "scanner-provider-phone",
      deviceReference: "device-ref-1",
      role: "SERVICE_PROVIDER",
      appVersion: "0.1.0"
    });

    const presentation = beginPhonePalmCapture(scanner, {
      presentationId: "presentation-1",
      capturedAt: "2026-10-03T17:00:00Z"
    });

    const recognition = recognizePhonePalm(presentation, {
      participantId: "participant-1",
      credentialReference: "palm-credential-1",
      livenessPassed: true,
      confidence: 0.97,
      recognizedAt: "2026-10-03T17:00:01Z"
    });

    expect(recognition.participantId).toBe("participant-1");
    expect(recognition.presentationId).toBe("presentation-1");
  });

  it("does not let a participant-side scanner impersonate a provider scanner", () => {
    const scanner = createPhoneScanner({
      scannerId: "scanner-participant-phone",
      deviceReference: "device-ref-2",
      role: "PARTICIPANT",
      appVersion: "0.1.0"
    });

    expect(() => beginPhonePalmCapture(scanner, {
      presentationId: "presentation-2",
      capturedAt: "2026-10-03T17:00:00Z"
    })).toThrow("service-provider scanner");
  });

  it("requires liveness", () => {
    const scanner = createPhoneScanner({
      scannerId: "scanner-provider-phone",
      deviceReference: "device-ref-3",
      role: "SERVICE_PROVIDER",
      appVersion: "0.1.0"
    });

    const presentation = beginPhonePalmCapture(scanner, {
      presentationId: "presentation-3",
      capturedAt: "2026-10-03T17:00:00Z"
    });

    expect(() => recognizePhonePalm(presentation, {
      participantId: "participant-1",
      credentialReference: "palm-credential-1",
      livenessPassed: false,
      confidence: 0.97,
      recognizedAt: "2026-10-03T17:00:01Z"
    })).toThrow("liveness");
  });

  it("rejects raw biometric material", () => {
    expect(() => assertPhoneScannerDoesNotPersistBiometricMaterial({
      palmImage: "never-store-this"
    })).toThrow("raw biometric material");
  });
});
