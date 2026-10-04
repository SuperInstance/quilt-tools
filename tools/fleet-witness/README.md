# tools/fleet-witness — L1+L2 witnessing core for fleet ledgers

Implements the witnessing study (`memory/study/witnessing-study-2026-10-04.md` in the
home workspace): the fleet's hash-chain ledgers are tamper-LOUD but truncation-SILENT —
deleting the last N rows verifies clean at layer 0. This tool adds the completeness
layer: RFC 6962 Merkle roots over ledger rows + C2SP-shaped signed checkpoint notes.

Zero-dependency Node stdlib, mirroring coev's standalone extraction style. Built for
the deferred receipt/WAL generic-extraction lane #4.

## Files

- `rfc6962.mjs` — RFC 6962 §2.1 tree: `merkleRoot`, `auditPath`/`verifyInclusion`
  (§2.1.1), `consistencyProof`/`verifyConsistencySized` (§2.1.2). Pure functions.
- `wal-chain.mjs` — the fleet layer-0 idiom (fnv1a-64, genesis-anchored, prev-link):
  `chainRows`, `verifyChain`. Layer 0 alone is blind to clean suffix truncation; the
  demo proves it.
- `checkpoint.mjs` — C2SP-shaped signed note: `signCheckpoint`, `verifyCheckpoint`
  (Ed25519, node:crypto). Per the study we adopt the C2SP note *shape* and do not
  claim byte-level C2SP interop until tested.
- `truncate-demo.mjs` — the honesty demo: anchor a 10-row ledger, delete 3 rows,
  watch layer 0 stay silent while the checkpoint audit catches it. Exits 0 iff the
  catch works. Run it: `node tools/fleet-witness/truncate-demo.mjs`

## Pins

`tests/pins_fleet_witness.sh` — 8 pins, FAIL-first (all RED on main where the tool is
absent): syntax; RFC 6962 roots cross-checked against an independent Python reference
(two data patterns, sizes 0–8); inclusion proofs all indices + forgery rejection;
consistency proofs roundtrip 1≤m<n≤12 + tamper/underflow rejection; checkpoint
sign/verify + wrong-key rejection; the truncate demo end-to-end; and a documented
canary (layer 0 alone MUST verify a truncated ledger — that silence is the premise).

The pins caught two real bugs at birth during this build: (1) audit-path consumption
order (fold must mirror generation exactly, deepest-first/front-first), and (2) a
verifier "optimization" that recomputed a known window instead of consuming the proof
stream — desyncing everything downstream. Both are documented in the code.

## Not yet (second window per the study)

- **L2 anchor channels**: committing checkpoint notes into a witness repo + embedding
  digests in sibling seals. `checkpoint.mjs` emits the note; anchoring is wiring.
- **L3 witness quorum** (k=2-of-3, strict-majority bound) — designed, deliberately
  not built until extraction #4 lands.

## Honest limits

- Detection covers rows truncated AFTER the latest anchored checkpoint; rows written
  and removed between anchors are invisible (anchor every seal — one note).
- A checkpoint proves (size, content) at seal time, not authorship (witness signing
  key lives with the operator until L3).
- Ed25519 keys in demos are ephemeral; a fleet key ceremony is part of the anchor
  window work.
