# Lowground Roadmap

This roadmap keeps the project focused on validating the musical use case before adding platform-scale complexity.

## Feature 1 — Browser POC

Validate the technical core with a small real-world room.

- room creation and invitation by link;
- browser-native WebRTC audio;
- minimal WebSocket signaling;
- microphone and USB audio-interface access;
- bidirectional peer-to-peer audio;
- local mute and per-participant volume mixing;
- audio-only rooms, with no video stream;
- two- and three-browser testing;
- first real Pavia–Parma–Lucca test.

**Outcome:** determine whether a small group can meaningfully play together online.

## Feature 2 — Infrastructure

Make the POC reproducible, observable and usable outside localhost.

- deploy the signaling service;
- configure STUN/TURN with coturn;
- Docker Compose for local and test environments;
- environment configuration and secret handling;
- structured logging;
- health checks;
- automated unit, integration and browser tests;
- reconnection and participant departure handling;
- room-size limits and basic abuse protection.

**Outcome:** run the playground reliably across different networks and devices.

## Feature 3 — Users, Identity and Room Admission

Introduce real users without creating a premature social platform.

- authentication and account integration;
- authenticated room creation;
- automatic host assignment;
- displayName propagation;
- musician or listener selection during join;
- musical role metadata;
- identifiable participants in the room;
- foundation for chat and room permissions.

**Outcome:** know who is in a room and what they are allowed to do.

## Feature 4 — UI/UX

Turn the technical playground into a clear, usable room experience.

- onboarding;
- room-entry flow;
- rehearsal-room layout;
- readable participant mixer;
- participant and connection status;
- permission and device guidance;
- responsive layouts, including smaller screens;
- accessibility basics;
- clear loading, error and recovery states.

**Outcome:** a new musician can enter, configure audio and understand the room without assistance.

## Feature 5 — Musical Session

Add the collaboration tools required for an actual rehearsal or test session.

- ephemeral text chat;
- system messages for join and leave events;
- RTT, jitter and packet-loss diagnostics;
- shared metronome;
- simple rhythm tests;
- session state and host-controlled start/stop;
- optional admission lock;
- local stereo recording;
- session export.

**Outcome:** run a structured musical session and collect evidence about its quality.

## Feature 6 — Underground Platform and ChordStorm Integration

Connect Lowground to the wider ecosystem while keeping the project independently useful.

- identity handoff from Underground Platform;
- opening a Lowground room from UP;
- links to bands, projects and collaborations;
- linking a room or recording to a ChordStorm song;
- importing tempo, structure or metronome data;
- saving recordings and session metadata;
- documented APIs, events and portable contracts.

**Outcome:** make Lowground the live-room layer for UP and ChordStorm without tight repository coupling.

## Feature 7 — Advanced Audio

Only after the browser POC and real-world tests prove the need.

- richer Web Audio processing and AudioWorklets;
- simple local effects;
- dry/wet recording;
- effect-chain management;
- amp and cabinet simulation evaluation;
- improved routing and monitoring controls;
- LiveKit or mediasoup evaluation if P2P no longer meets reliability needs;
- dedicated desktop audio client if browser limits become material.

**Outcome:** increase audio control without losing the web-first path.

## Delivery rule

Each feature should produce a testable result. We should not advance because the architecture looks interesting; we advance when the current slice works in a real room and tells us what to build next.
