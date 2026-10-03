# ADR-0002: Start Web-First

- Status: accepted
- Date: 2026-10-03

## Context

The product must be easy to try with the real musicians who will validate it. Requiring a native installation before the first test would add friction and hide whether the core idea works.

## Decision

The first playable prototype uses browser APIs, primarily WebRTC and Web Audio. It targets desktop browsers with wired monitoring and an audio interface where available.

A native client may be introduced later only in response to measured browser limitations.

## Consequences

- The first test has a short onboarding path.
- Browser device permissions and audio policies become explicit product concerns.
- Full amp simulation, advanced buffer control and professional routing are deferred.
- The architecture must keep a future native audio boundary possible.
