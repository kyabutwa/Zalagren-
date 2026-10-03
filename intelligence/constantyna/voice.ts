export type ConstantynaVoiceInputMode = "TEXT" | "SPEECH";
export type ConstantynaVoiceOutputMode = "TEXT" | "SPEECH";

export interface ConstantynaVoicePreferences {
  participantId: string;
  inputMode: ConstantynaVoiceInputMode;
  outputMode: ConstantynaVoiceOutputMode;
  voiceEnabled: boolean;
  autoPlayResponses: boolean;
  language?: string;
  locale?: string;
  voiceId?: string;
  speechRate?: number;
  volume?: number;
  updatedAt: string;
}

export interface CreateConstantynaVoicePreferencesInput {
  participantId: string;
  inputMode?: ConstantynaVoiceInputMode;
  outputMode?: ConstantynaVoiceOutputMode;
  voiceEnabled?: boolean;
  autoPlayResponses?: boolean;
  language?: string;
  locale?: string;
  voiceId?: string;
  speechRate?: number;
  volume?: number;
  updatedAt?: string;
}

export interface ConstantynaSpeechInput {
  id: string;
  participantId: string;
  requestId: string;
  language?: string;
  locale?: string;
  audioReference: string;
  transcript?: string;
  transcriptStatus: "PENDING" | "AVAILABLE" | "FAILED";
  status: "RECEIVED" | "TRANSCRIBING" | "READY" | "FAILED";
  createdAt: string;
}

export interface ConstantynaSpeechOutput {
  id: string;
  participantId?: string;
  responseId: string;
  language?: string;
  locale?: string;
  voiceId?: string;
  audioReference?: string;
  status: "PENDING" | "GENERATED" | "PLAYED" | "FAILED";
  createdAt: string;
}

function validateRange(name: string, value: number | undefined, min: number, max: number) {
  if (value !== undefined && (value < min || value > max)) {
    throw new Error(`${name} must be between ${min} and ${max}`);
  }
}

export function createConstantynaVoicePreferences(
  input: CreateConstantynaVoicePreferencesInput,
): ConstantynaVoicePreferences {
  if (!input.participantId.trim()) throw new Error("Participant id is required");
  validateRange("speechRate", input.speechRate, 0.5, 2);
  validateRange("volume", input.volume, 0, 1);

  return {
    participantId: input.participantId,
    inputMode: input.inputMode ?? "TEXT",
    outputMode: input.outputMode ?? "TEXT",
    voiceEnabled: input.voiceEnabled ?? false,
    autoPlayResponses: input.autoPlayResponses ?? false,
    language: input.language,
    locale: input.locale,
    voiceId: input.voiceId,
    speechRate: input.speechRate,
    volume: input.volume,
    updatedAt: input.updatedAt ?? new Date().toISOString(),
  };
}

export function updateConstantynaVoicePreferences(
  current: ConstantynaVoicePreferences,
  patch: Partial<Omit<ConstantynaVoicePreferences, "participantId" | "updatedAt">>,
  updatedAt = new Date().toISOString(),
): ConstantynaVoicePreferences {
  const next = { ...current, ...patch, participantId: current.participantId, updatedAt };
  validateRange("speechRate", next.speechRate, 0.5, 2);
  validateRange("volume", next.volume, 0, 1);
  return next;
}

export function disableConstantynaVoice(
  preferences: ConstantynaVoicePreferences,
  updatedAt = new Date().toISOString(),
): ConstantynaVoicePreferences {
  return updateConstantynaVoicePreferences(
    preferences,
    {
      voiceEnabled: false,
      inputMode: "TEXT",
      outputMode: "TEXT",
      autoPlayResponses: false,
    },
    updatedAt,
  );
}

export function createConstantynaSpeechInput(
  input: Omit<ConstantynaSpeechInput, "createdAt"> & { createdAt?: string },
): ConstantynaSpeechInput {
  for (const key of ["id", "participantId", "requestId", "audioReference"] as const) {
    if (!input[key].trim()) throw new Error(`Speech input ${key} is required`);
  }
  return { ...input, createdAt: input.createdAt ?? new Date().toISOString() };
}

export function createConstantynaSpeechOutput(
  input: Omit<ConstantynaSpeechOutput, "createdAt"> & { createdAt?: string },
): ConstantynaSpeechOutput {
  for (const key of ["id", "responseId"] as const) {
    if (!input[key].trim()) throw new Error(`Speech output ${key} is required`);
  }
  return { ...input, createdAt: input.createdAt ?? new Date().toISOString() };
}
