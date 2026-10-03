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

## Feature 2 — Realtime Transport and Synchronization

Turn the raw P2P experiment into a controlled realtime musical transport without moving the audio session onto the server.

- keep the signaling server in the control plane only;
- preserve direct peer-to-peer audio as the preferred data path;
- configure STUN/TURN, with TURN used only when direct connectivity fails;
- measure end-to-end and per-peer latency, jitter and packet loss;
- implement or tune small adaptive per-peer jitter buffers where the platform permits;
- establish a shared room-clock model for timestamp comparison;
- compensate gradual audio-clock drift without discontinuities;
- define degraded and unplayable connection states instead of delaying the whole room to the slowest peer;
- measure browser/WebRTC control limits under real network conditions;
- define the decision gate for a custom UDP/RTP audio transport if WebRTC cannot meet the required latency or control.

**Outcome:** establish whether Lowground can provide a stable distributed musical session while keeping the server out of the normal audio path.

## Feature 3 — Infrastructure

Make the realtime POC reproducible, observable and usable outside localhost.

- deploy the signaling service;
- deploy coturn;
- Docker Compose for local and test environments;
- environment configuration and secret handling;
- structured logging;
- health checks;
- automated unit, integration and browser tests;
- reconnection and participant departure handling;
- room-size limits and basic abuse protection.

**Outcome:** run the playground reliably across different networks and devices.

## Feature 4 — Users, Identity and Room Admission

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

## Feature 5 — UI/UX

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

## Feature 6 — Musical Session

Add the collaboration tools required for an actual rehearsal or test session.

- ephemeral text chat;
- system messages for join and leave events;
- realtime connection diagnostics in the room UI;
- shared metronome;
- simple rhythm tests;
- session state and host-controlled start/stop;
- optional admission lock;
- local stereo recording;
- session export.

**Outcome:** run a structured musical session and collect evidence about its quality.

## Feature 7 — Underground Platform and ChordStorm Integration

Connect Lowground to the wider ecosystem while keeping the project independently useful.

- identity handoff from Underground Platform;
- opening a Lowground room from UP;
- links to bands, projects and collaborations;
- linking a room or recording to a ChordStorm song;
- importing tempo, structure or metronome data;
- saving recordings and session metadata;
- documented APIs, events and portable contracts.

**Outcome:** make Lowground the live-room layer for UP and ChordStorm without tight repository coupling.

## Feature 8 — Advanced Audio

Only after measured P2P/WebRTC tests prove the need.

- richer Web Audio processing and AudioWorklets;
- simple local effects;
- dry/wet recording;
- effect-chain management;
- amp and cabinet simulation evaluation;
- improved routing and monitoring controls;
- custom UDP/RTP transport evaluation if browser-managed WebRTC does not expose enough realtime control;
- dedicated desktop audio client if browser limits become material.

**Outcome:** increase audio control without abandoning the distributed architecture unless evidence requires a different decision.

## Delivery rule

Each feature should produce a testable result. We should not advance because the architecture looks interesting; we advance when the current slice works in a real room and tells us what to build next.
