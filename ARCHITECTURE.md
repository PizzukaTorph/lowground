# Lowground — Architecture

## 1. Direction

Lowground is web-first. The initial implementation should run in the browser wherever the Web Audio and WebRTC stack provides sufficient control and reliability.

A native client is a possible later optimization, not a prerequisite for validating the product.

## 2. Initial topology

```text
Browser A ─┐
Browser B ─┼── WebRTC media ── direct path when possible
Browser C ─┘
                 │
                 └── TURN relay when direct connectivity fails

Web application ── signaling/API ── room state and diagnostics
```

The first implementation should not commit prematurely to a central audio mixer. It should measure whether a small regional room works with browser-to-browser media and TURN fallback.

A server-side forwarding unit or SFU may be introduced when it improves reliability, participant count, recording or observability.

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

TURN is the initial fallback for NAT and firewall traversal. Regional deployment can be added after measuring real test locations.

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

1. Browser-only regional POC.
2. Browser POC with TURN and repeatable diagnostics.
3. Regional room service with persisted sessions.
4. Optional SFU/relay topology.
5. ChordStorm song/click context.
6. Underground Platform identity, bands and publishing.
7. Native audio client only if browser measurements justify it.
