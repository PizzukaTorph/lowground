# ADR-0003: Audio-Only First

- Status: accepted
- Date: 2026-10-03

## Context

The first Lowground experiment is about whether musicians can collaborate musically over distance. Video does not improve that validation and would add bandwidth, device permissions, privacy concerns, moderation requirements and additional legal surface.

## Decision

The POC and initial product scope are audio-first:

- no camera capture;
- no video tracks;
- no video recording;
- no video UI beyond ordinary interface elements;
- audio rooms, text chat and diagnostics remain the core experience.

Video may be reconsidered in a future product decision, but it is not part of the current architecture or acceptance criteria.

## Consequences

- simpler browser permissions and onboarding;
- lower bandwidth and infrastructure requirements;
- fewer privacy and moderation concerns;
- easier focus on musical latency and reliability;
- no assumption that a visual feed is required for a useful rehearsal.
