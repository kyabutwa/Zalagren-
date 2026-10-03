export type BeatPayPhoneScannerRole = "PARTICIPANT" | "SERVICE_PROVIDER";
export type BeatPayPhoneScanState = "READY" | "CAPTURING" | "MATCHED" | "REJECTED";

export interface BeatPayPhoneScanner {
  scannerId: string;
  deviceReference: string;
  role: BeatPayPhoneScannerRole;
  state: BeatPayPhoneScanState;
  appVersion: string;
}

export interface BeatPayPhonePalmPresentation {
  presentationId: string;
  participantId?: string;
  scannerId: string;
  captureMode: "PHONE_CAMERA";
  capturedAt: string;
  livenessPassed: boolean;
  credentialReference?: string;
}

export interface BeatPayPhoneRecognition {
  presentationId: string;
  participantId: string;
  credentialReference: string;
  livenessPassed: boolean;
  confidence: number;
  recognizedAt: string;
}

/**
 * A provider's phone can act as the BeatPay scanner.
 * The participant presents a hand to that phone's camera; the app returns
 * an opaque participant/credential reference, never raw biometric material.
 */
export function createPhoneScanner(input: {
  scannerId: string;
  deviceReference: string;
  role: BeatPayPhoneScannerRole;
  appVersion: string;
}): BeatPayPhoneScanner {
  if (!input.scannerId.trim()) throw new Error("BeatPay phone scanner ID is required");
  if (!input.deviceReference.trim()) throw new Error("BeatPay phone device reference is required");
  if (!input.appVersion.trim()) throw new Error("BeatPay app version is required");
  return { ...input, state: "READY" };
}

export function beginPhonePalmCapture(
  scanner: BeatPayPhoneScanner,
  input: { presentationId: string; capturedAt: string }
): BeatPayPhonePalmPresentation {
  if (scanner.state !== "READY") throw new Error("BeatPay phone scanner is not ready");
  if (scanner.role !== "SERVICE_PROVIDER") throw new Error("Only a service-provider scanner may start a provider-side palm presentation");
  if (!input.presentationId.trim()) throw new Error("BeatPay presentation ID is required");
  return {
    presentationId: input.presentationId,
    scannerId: scanner.scannerId,
    captureMode: "PHONE_CAMERA",
    capturedAt: input.capturedAt,
    livenessPassed: false
  };
}

export function recognizePhonePalm(
  presentation: BeatPayPhonePalmPresentation,
  recognition: Omit<BeatPayPhoneRecognition, "presentationId">
): BeatPayPhoneRecognition {
  if (presentation.captureMode !== "PHONE_CAMERA") throw new Error("BeatPay phone scanner must use the phone camera");
  if (!presentation.livenessPassed && !recognition.livenessPassed) {
    throw new Error("BeatPay phone palm liveness check is required");
  }
  if (!recognition.participantId.trim()) throw new Error("BeatPay recognized participant ID is required");
  if (!recognition.credentialReference.trim()) throw new Error("BeatPay recognized credential reference is required");
  if (!Number.isFinite(recognition.confidence) || recognition.confidence <= 0 || recognition.confidence > 1) {
    throw new Error("BeatPay phone palm confidence is invalid");
  }
  return { ...recognition, presentationId: presentation.presentationId };
}

export function assertPhoneScannerDoesNotPersistBiometricMaterial(value: unknown): void {
  if (!value || typeof value !== "object") return;
  const forbidden = /palm.?image|raw.?biometric|biometric.?template|embedding|fingerprint|iris/i;
  for (const key of Object.keys(value as Record<string, unknown>)) {
    if (forbidden.test(key)) throw new Error("BeatPay phone scanner must not persist raw biometric material");
  }
}
