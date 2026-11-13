# Lowground — Architecture

## 1. Direction

Lowground is web-first. The initial implementation should run in the browser wherever the Web Audio and WebRTC stack provides sufficient control and reliability.

A native client is a possible later optimization, not a prerequisite for validating the product.

## 2. Distributed session topology

Lowground is a distributed audio system. The server orchestrates a room; it does not host or mix the musical session.

The control plane and audio data plane are deliberately separate:

```text
                    CONTROL PLANE

        Browser A ─┐
        Browser B ─┼── signaling/API ── Lowground server
        Browser C ─┘                    room state / ICE /
                                         admission / diagnostics

                     AUDIO DATA PLANE

        Browser A ───────── Browser B
             │  ╲             ╱  │
             │    ╲         ╱    │
             │      Browser C     │
             └────────────────────┘
                  direct P2P media

             direct path preferred
             TURN relay only when required
```

For the initial room size of up to six participants, the preferred media topology is a peer-to-peer mesh. A direct peer path keeps the server out of the normal audio path and avoids adding a mandatory server hop.

TURN is a connectivity fallback, not the default audio topology.

### Architectural principle

The Lowground server is responsible for orchestration, not audio transport. Centralizing the audio path is not the default scaling strategy.

If browser-native WebRTC cannot provide sufficient latency, jitter-buffer control, clock-drift handling or audio-pipeline control, Lowground should preserve the distributed P2P model and evaluate a lower-level custom transport, such as UDP/RTP with an appropriate realtime audio codec.

WebRTC already prefers UDP when available. Therefore the future decision is not simply “WebRTC versus UDP”; it is “browser-managed WebRTC versus a lower-level transport that gives Lowground more control.”

A server-side media topology may only be reconsidered for a separately justified capability that cannot reasonably preserve the distributed model.

## 3. Logical components

### Web client

Responsible for:

- room UI;
- device permissions and selection;
- local monitoring controls;
- WebRTC session;
- participant mix controls;
- diagnostics;
- metronome;
- local capture.

### Signaling service

Responsible for:

- room creation and membership;
- session negotiation;
- ICE candidate exchange;
- room limits;
- short-lived room tokens.

It must not be treated as the audio transport.

### Diagnostics

Responsible for:

- round-trip estimate;
- jitter;
- packet loss;
- connection state;
- audio device status;
- event timeline for dropouts and reconnects.

### Relay infrastructure

STUN supports peer discovery and NAT traversal. TURN is the fallback when peers cannot establish a usable direct path. Regional relay deployment can be added after measuring real test locations.

### Persistence

The POC may persist only room/session metadata and optional recording references. Audio should not be stored centrally until the capture model is proven.

## 4. Device assumptions

The supported test setup is:

- wired headphones;
- a microphone or audio interface;
- an already-processed instrument signal when effects are required;
- a modern desktop browser;
- stable wired or strong Wi-Fi connectivity.

Bluetooth monitoring is not part of the latency target.

## 5. Integration boundaries

Lowground should expose portable contracts for:

- room;
- participant;
- session;
- diagnostic sample;
- recording artifact;
- song context.

Underground Platform and ChordStorm must not import Lowground internals. They should consume versioned APIs or WebSocket events.

## 6. Evolution path

1. Browser-only regional POC using a P2P WebRTC mesh.
2. Realtime transport hardening: TURN, repeatable diagnostics, per-peer jitter handling, room-clock synchronization and clock-drift compensation.
3. Infrastructure and deployment hardening.
4. Persisted room/session metadata and identity.
5. ChordStorm song/click context.
6. Underground Platform identity, bands and publishing.
7. Evaluate custom UDP/RTP audio transport or a native client only if measured WebRTC/browser limitations justify it.
