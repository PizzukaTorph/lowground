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
- Open core: the networking and room technology should remain useful outside Underground Platform.
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

## Ecosystem

Lowground is a separate product and repository.

- **Underground Platform** provides identity, bands, discovery, collaboration and publishing.
- **ChordStorm** provides musical editing, tablature and structured song data.
- **Lowground** provides live rooms, audio transport, room diagnostics and session capture.

Integration will happen through documented HTTP/WebSocket APIs and portable contracts.

## Status

Early project foundation. No production audio implementation exists yet.

See:

- [Product specification](PRODUCT.md)
- [Architecture](ARCHITECTURE.md)
- [Architecture decision records](docs/adr/)
- [Memory index](memory/INDEX.md)

## License

Lowground is licensed under the Apache License 2.0. See [LICENSE](LICENSE).
