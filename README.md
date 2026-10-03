# Lowground

Lowground is an open-source, web-first playground for low-latency musical collaboration.

It provides geographically scoped rooms where a small group of musicians can test whether they can actually play together over the internet.

> **Lowground — low-latency rooms for musicians.**

## Why it exists

Video-conferencing tools are designed for speech. Lowground is designed to answer a more specific question:

> Can a small, geographically compatible group of musicians enter a room and work on music together?

The first target is a regional room with up to six participants, starting from a real-world test between Pavia, Parma and Lucca.

## Product principles

- Web-first: joining a room should not require a desktop installation.
- Measured latency: room compatibility is based on observed network conditions, not geography alone.
- Small rooms: the initial limit is six participants.
- Local monitoring: musicians should hear their own instrument with the lowest practical latency.
- Honest modes: the product must distinguish live jamming, guided sessions and recording.
- Open source: the networking and room technology should remain useful outside Underground Platform.
- Explicit integrations: Underground Platform and ChordStorm integrate through stable APIs and events, not tight coupling.

## Initial playground

The first proof of concept will support:

- room creation and invitation by link;
- up to six participants;
- microphone and audio-interface access from the browser;
- latency, jitter and packet-loss measurements;
- bidirectional low-latency audio;
- shared metronome;
- simple rhythm tests;
- local or stereo session recording.

The POC is not a DAW, a complete amp simulator, a social network or a replacement for a professional audio interface.

## Quick start

Requirements:

- Node.js;
- pnpm;
- a desktop browser with microphone access;
- wired headphones for meaningful latency tests.

Install dependencies and start the web app plus signaling server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`, enter a display name and share the room URL with another browser.

The first scaffold uses browser-native WebRTC and an in-memory signaling service. TURN, persistent rooms, authentication and production deployment are intentionally not included yet.

## Roadmap

The project is delivered as a sequence of testable slices:

1. **Feature 1 — Browser POC:** validate WebRTC audio and the core room experience.
2. **Feature 2 — Infrastructure:** add deployment, TURN, observability, testing and reconnection.
3. **Feature 3 — Users, Identity and Room Admission:** add accounts, identity and room-level admission.
4. **Feature 4 — UI/UX:** make the room clear, accessible and usable across devices.
5. **Feature 5 — Musical Session:** add chat, diagnostics, shared metronome and recording.
6. **Feature 6 — UP and ChordStorm Integration:** connect rooms, sessions and musical data to the ecosystem.
7. **Feature 7 — Advanced Audio:** evaluate richer processing and a desktop client only when real tests justify it.

See the complete [project roadmap](ROADMAP.md).

## Ecosystem

Lowground is a separate product and repository.

- **Underground Platform** provides identity, bands, discovery, collaboration and publishing.
- **ChordStorm** provides musical editing, tablature and structured song data.
- **Lowground** provides live rooms, audio transport, room diagnostics and session capture.

Integration will happen through documented HTTP/WebSocket APIs and portable contracts.

## Status

Early project foundation. The first browser playground scaffold is now in place.

See:

- [Product specification](PRODUCT.md)
- [Architecture](ARCHITECTURE.md)
- [Project roadmap](ROADMAP.md)
- [Architecture decision records](docs/adr/)
- [Memory index](memory/INDEX.md)
- [Contributing guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md)

## Community

Lowground is built in the open. Issues, experiments, documentation improvements and technical discussion are welcome.

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## License

Lowground is licensed under the Apache License 2.0. See [LICENSE](LICENSE).
