# CONSTANTYNA

CONSTANTYNA is Zalagren's governed human-facing intelligence interface.

## Voice and speech

CONSTANTYNA supports a participant-controlled voice layer with two independent directions:

- Speech-to-text: a participant may speak instead of typing.
- Text-to-speech: CONSTANTYNA may speak its response instead of requiring reading.

The participant controls:

- whether voice is enabled;
- text or speech input;
- text or speech output;
- automatic response playback;
- language and locale where supported;
- selected voice where supported;
- speech rate and volume where supported.

Voice is an interface preference, not an authority grant.

Disabling voice must not disable the participant's Zalagren identity, account, participant status, relationships, contexts, capabilities or authorizations.

Audio processing must remain subject to Zalagren privacy, consent, data-minimization, retention and provider policies. A speech transcript is treated as input data, not as authorization.

## Governance

Voice cannot bypass Core authorization. A spoken request has the same authorization requirements as a typed request.

CONSTANTYNA must not claim speech transcription or speech synthesis succeeded until the relevant processing result is available.

Provider-specific speech APIs are integration concerns and must be connected through the infrastructure/integration layer rather than hard-coded into the domain contract.
