# Lowground — Product Specification

## 1. Vision

Lowground is a web-first, open-source playground for musicians who want to test and perform musical collaboration over distance.

It does not promise to defeat physics. It measures the actual conditions of a room and exposes the best experience that those conditions can support.

## 2. First user story

Three musicians in Pavia, Parma and Lucca open a shared link, select their audio devices, run a short network and audio test, hear one another with acceptable delay, follow a shared click and record a short musical exercise.

If this experience is not usable, the project has learned something valuable before investing in a larger platform.

## 3. Room model

A room is a temporary musical session with:

- a unique room identifier;
- an owner or host;
- up to six participants;
- participant display name and instrument;
- optional region or geographic scope;
- network compatibility status;
- selected audio mode;
- text chat;
- session start and end time;
- optional recording artifacts.

Geographic labels are hints for discovery. Admission and mode selection must use measured latency and connection quality.

## 4. Experience modes

### Live jam

For participants with stable, low enough latency for free rhythmic interaction.

### Guided session

For rooms where live interaction is possible but not ideal. A shared click, leader role or section-based workflow reduces the need for every musician to lock to every other musician.

### Recording session

Each participant records locally and the session preserves synchronized takes. This mode remains useful even when live jamming is not.

## 5. POC acceptance criteria

The first POC is successful when:

1. three invited users can enter the same room from separate networks;
2. the browser detects and selects an input and output device;
3. the system reports round-trip measurements, jitter and packet loss;
4. users can exchange live audio without feedback under the documented setup;
5. users can communicate through room text chat;
6. users can enable a shared metronome;
7. the system can capture a short local or stereo recording;
8. the room can end cleanly and expose a session summary;
9. failures are visible and explainable.

Success is not defined as professional studio quality. It is defined as a reproducible, measurable and musically useful experiment.

## 6. Out of scope for the first POC

- public matchmaking;
- accounts and billing;
- camera capture or video streams;
- mobile musical performance;
- full DAW functionality;
- professional amp simulation;
- multitrack cloud recording;
- international unrestricted rooms;
- automatic correction of timing;
- hiding bad network conditions from participants.

## 7. Audio effects

The initial POC accepts already-processed audio from a pedalboard, amplifier, or audio interface.

Software effects may be added locally later. When present, the processed signal must be clearly separated from optional dry capture so that remote participants hear the intended sound without preventing later re-amping.

## 8. Integration contract

Lowground must remain usable on its own.

Future integrations:

- Underground Platform: identity, bands, rooms, invitations, session artifacts and publishing.
- ChordStorm: song, tempo, click, arrangement and tablature context.

The integration boundary should use stable IDs, HTTP/WebSocket APIs and versioned contracts.
