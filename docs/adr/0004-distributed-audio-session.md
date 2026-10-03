# ADR-0004: Keep the Audio Session Distributed

- Status: accepted
- Date: 2026-10-03

## Context

Lowground targets low-latency musical collaboration in small rooms of up to six participants. Routing every musical stream through the application server would make the server part of the mandatory audio path and add an avoidable network hop.

The initial browser POC already uses WebRTC peer connections and a separate WebSocket signaling service.

## Decision

Lowground separates the control plane from the audio data plane.

The server orchestrates the session. It owns signaling, room state, admission, ICE exchange and related control metadata, but it does not host, mix or forward the normal musical audio path.

Musical audio should travel directly between peers in a P2P mesh whenever network conditions allow it. STUN supports direct connectivity and TURN acts as a relay fallback when a direct peer path cannot be established.

WebRTC is the first transport because it provides browser-native realtime media and connectivity handling. WebRTC already uses UDP when possible.

If measured browser/WebRTC limitations prevent Lowground from achieving sufficient latency or control over jitter buffering, timing and clock drift, the preferred evolution is to retain the distributed P2P architecture and evaluate a lower-level custom UDP/RTP audio transport rather than automatically centralizing the session.

## Consequences

- the application server is not a mandatory audio hop;
- each participant owns a personal local mix of remote peers;
- up to six participants imply a small full-mesh topology and multiple simultaneous peer streams;
- TURN traffic may still traverse relay infrastructure when NAT/firewall conditions require it;
- Feature 2 must address room-clock synchronization, per-peer jitter, clock drift and measurable connection quality;
- poor peers should be surfaced as degraded rather than forcing the whole room to inherit the slowest peer's latency;
- a custom UDP/RTP transport remains an evidence-driven fallback if WebRTC/browser control is insufficient;
- any future centralized media topology requires a new explicit architectural decision.
