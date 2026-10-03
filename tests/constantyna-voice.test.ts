import {
  createConstantynaSpeechInput,
  createConstantynaSpeechOutput,
  createConstantynaVoicePreferences,
  disableConstantynaVoice,
  updateConstantynaVoicePreferences,
} from "../intelligence/constantyna/voice";

describe("CONSTANTYNA voice and speech", () => {
  test("voice is disabled by default", () => {
    const preferences = createConstantynaVoicePreferences({ participantId: "participant-1" });
    expect(preferences.voiceEnabled).toBe(false);
    expect(preferences.inputMode).toBe("TEXT");
    expect(preferences.outputMode).toBe("TEXT");
    expect(preferences.autoPlayResponses).toBe(false);
  });

  test("participant can independently enable speech input and output", () => {
    const preferences = createConstantynaVoicePreferences({
      participantId: "participant-1",
      voiceEnabled: true,
      inputMode: "SPEECH",
      outputMode: "SPEECH",
      autoPlayResponses: true,
      language: "en",
      locale: "en",
    });
    expect(preferences.voiceEnabled).toBe(true);
    expect(preferences.inputMode).toBe("SPEECH");
    expect(preferences.outputMode).toBe("SPEECH");
  });

  test("participant can change voice preferences without changing identity", () => {
    const preferences = createConstantynaVoicePreferences({
      participantId: "participant-1",
      voiceEnabled: true,
    });
    const updated = updateConstantynaVoicePreferences(preferences, {
      outputMode: "SPEECH",
      voiceId: "voice-1",
      speechRate: 1.1,
    });
    expect(updated.participantId).toBe("participant-1");
    expect(updated.outputMode).toBe("SPEECH");
    expect(updated.voiceId).toBe("voice-1");
  });

  test("disabling voice returns the interface to text", () => {
    const preferences = createConstantynaVoicePreferences({
      participantId: "participant-1",
      voiceEnabled: true,
      inputMode: "SPEECH",
      outputMode: "SPEECH",
      autoPlayResponses: true,
    });
    const disabled = disableConstantynaVoice(preferences);
    expect(disabled.voiceEnabled).toBe(false);
    expect(disabled.inputMode).toBe("TEXT");
    expect(disabled.outputMode).toBe("TEXT");
    expect(disabled.autoPlayResponses).toBe(false);
  });

  test("speech input and output preserve explicit processing states", () => {
    const input = createConstantynaSpeechInput({
      id: "speech-in-1",
      participantId: "participant-1",
      requestId: "req-1",
      audioReference: "audio://input-1",
      transcriptStatus: "AVAILABLE",
      status: "READY",
      transcript: "Explain my current context",
    });
    const output = createConstantynaSpeechOutput({
      id: "speech-out-1",
      participantId: "participant-1",
      responseId: "resp-1",
      audioReference: "audio://output-1",
      status: "GENERATED",
    });
    expect(input.status).toBe("READY");
    expect(output.status).toBe("GENERATED");
  });
