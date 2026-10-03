# MR-0001 — Project Foundation

- Date: 2026-10-03
- Type: architecture / product
- Status: active

## Decision

Lowground is a separate FOSS, web-first project for geographically scoped musical rooms of up to six participants.

The first validation room uses real musicians in Pavia, Parma and Lucca. The first implementation prioritizes browser-based WebRTC, diagnostics, shared click and short recording.

Lowground will integrate with Underground Platform and ChordStorm through explicit APIs and events.

## Rationale

The project must validate musical usefulness before investing in a native audio stack or a larger social product. A measured regional playground is a smaller and more honest target than unrestricted global jamming.

## Open questions

- Whether browser peer-to-peer audio is stable enough for the first three-person test.
- Whether TURN is needed for the actual participant networks.
- Whether the first useful topology remains P2P or needs an SFU.
- Which session artifacts should be owned by Lowground versus UP or ChordStorm.
