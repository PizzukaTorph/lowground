# MR-0001 — Project Foundation

- Date: 2026-10-03
- Type: architecture / product
- Status: active

## Decision

Lowground is a separate FOSS, web-first project for geographically scoped musical rooms of up to six participants.

The first validation room uses real musicians in Pavia, Parma and Lucca. The first implementation prioritizes browser-based WebRTC, diagnostics, shared click and short recording.

The server orchestrates rooms but does not host the normal musical audio path. Audio is distributed peer-to-peer whenever possible, with TURN as a connectivity fallback. If WebRTC/browser limitations become material, the preferred next transport experiment keeps the distributed model and evaluates lower-level UDP/RTP rather than defaulting to a central mixer.

Lowground will integrate with Underground Platform and ChordStorm through explicit APIs and events.

## Rationale

The project must validate musical usefulness before investing in a native audio stack or a larger social product. A measured regional playground is a smaller and more honest target than unrestricted global jamming.

Keeping the audio data plane distributed avoids a mandatory server hop. The next post-POC problem is therefore synchronization and transport quality: room clock, per-peer jitter, clock drift and connection degradation.

## Open questions

- Whether browser peer-to-peer audio is stable enough for the first three-person test.
- How much control WebRTC/browser APIs provide over realtime buffering and timing.
- What latency/jitter thresholds define playable, degraded and unplayable peers.
- Whether measured limitations justify a custom UDP/RTP transport.
- Which session artifacts should be owned by Lowground versus UP or ChordStorm.
