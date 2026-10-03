# GENESIS Voice Contract

Status: 🟡 SUPPORTED

GENESIS supports participant-controlled speech input and speech output as an interface layer.

The participant can independently manage:
- text or speech input;
- text or speech output;
- voice enabled/disabled;
- automatic playback;
- language and locale;
- voice selection;
- speech rate;
- volume.

Defaults are text input, text output, voice disabled, and autoplay disabled.

Speech recognition creates input for GENESIS; it does not create authority. Spoken instructions have exactly the same authorization requirements as typed instructions. Generated audio cannot expose information that the participant was not authorized to receive.

Audio and transcripts are potentially sensitive data and require appropriate privacy, retention, consent/legal-basis, provider, and security controls.

Provider/device integration remains an infrastructure concern. This contract does not claim that a production speech provider or native-device audio workflow is already deployed.
