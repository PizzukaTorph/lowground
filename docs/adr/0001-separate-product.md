# ADR-0001: Keep Lowground as a Separate Product

- Status: accepted
- Date: 2026-10-03

## Context

Lowground provides a specialized real-time musical room. Underground Platform and ChordStorm have different product responsibilities and existing release cycles.

## Decision

Lowground lives in its own public repository and remains usable without either product.

Integrations use explicit, versioned HTTP/WebSocket APIs and portable contracts. Neither Underground Platform nor ChordStorm becomes a source-level dependency of the Lowground core.

## Consequences

- Lowground can evolve its audio and networking stack independently.
- UP and ChordStorm can adopt it incrementally.
- Authentication, identity and publishing require integration adapters.
- Shared concepts must be represented by stable IDs and documented contracts.
