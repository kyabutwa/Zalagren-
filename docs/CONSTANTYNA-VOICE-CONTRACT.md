# CONSTANTYNA Voice & Speech Contract

Status: 🟡 SUPPORTED — participant-controlled voice preferences and speech domain interfaces are implemented. Provider integration, audio storage, production transcription/synthesis and device verification remain to be completed.

## 1. Scope

CONSTANTYNA supports both:

**Speech-to-text (STT)**  
Participant audio → speech processing → transcript → CONSTANTYNA request.

**Text-to-speech (TTS)**  
CONSTANTYNA response → speech synthesis → audio → participant playback.

These are interface capabilities, not separate identities or permission systems.

## 2. Participant control

Every participant has independent voice preferences.

Defaults are intentionally conservative:

- input: TEXT;
- output: TEXT;
- voice: disabled;
- automatic playback: disabled.

A participant may enable voice and select the input/output behavior independently.

Disabling voice returns the interface to text without affecting the participant's underlying Zalagren state.

## 3. Authorization

Voice does not change authority. A spoken request is treated exactly like a typed request.

Speech recognition does not grant authorization. Speech synthesis does not reveal protected information that the participant could not receive as text.

Protected actions continue through:

Request → Intent → Proposal → Authorization → Action → Event → Evidence.

## 4. Privacy

Audio and transcripts are potentially sensitive interaction data. The implementation must support explicit participant control, minimum necessary processing, provider disclosure where applicable, retention limits, deletion where supported, secure transport, secure storage, failure without fake success, and no unnecessary permanent audio retention.

The domain model uses references to audio rather than embedding raw audio.

## 5. Language and voice

Language, locale and voice selection are participant preferences.

The system must not assume that a selected language or voice is available from every speech provider. Unsupported combinations must produce an explicit unavailable state rather than silently substituting an unrequested voice.

## 6. Operational states

Speech input:

RECEIVED → TRANSCRIBING → READY  
or → FAILED

Speech output:

PENDING → GENERATED → PLAYED  
or → FAILED

A READY transcript is still ordinary request input and remains subject to context, authorization and privacy rules.

## 7. Provider boundary

The domain layer deliberately does not hard-code an AI/speech provider.

Production adapters belong under integrations and must expose provider, model/voice reference, request/reference ID, processing status, timestamps, failure code, and usage/cost metadata where appropriate.

## 8. Truth state

🟡 SUPPORTED means participant-controlled domain behavior is implemented.

It does not mean live microphone capture, transcription, voice synthesis, provider credentials, device permissions, audio storage or production speech APIs are already deployed.

Those become VERIFIED only after the complete integration and real-device workflow has passed.
