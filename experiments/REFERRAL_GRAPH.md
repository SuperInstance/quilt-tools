# REFERRAL_GRAPH PoC — the mesh answers as a distribution

Mandate: Casey 2026-09-25 12:03 — "not one thing but a distribution of
intelligent referrals." Ideas are nodes, referrals are weighted LINKs, and the
answer to any question is a ranked VIEW over modules — every edge carrying the
receipt that proves it or the falsification condition that would kill it.

## What was built

- `src/referral_graph.mjs` — the substrate: nodes + hash-chained LINK rows
  (fnv1a-64, the fleet receipt idiom), weight law enforced at booking time,
  falsification probes, receipt audits, and the ranked-distribution VIEW.
- `experiments/referral_graph.seed.mjs` — the real v1 graph: 9 nodes across
  quilt-tools ↔ quilt-show ↔ quilt-arcade + quilt-quant → pong-quilt, 6
  edges, every edge with its kill switch declared.
- `experiments/referral_graph.pins.mjs` — 27 pins. Run:
  `node experiments/referral_graph.pins.mjs --live` (the `--live` pass audits
  every provenance PR against GitHub; offline pins are labeled SKIPPED, never
  passed silently).

## Weight law (constitution)

| weight   | meaning                                   | mass |
|----------|-------------------------------------------|------|
| PENDING  | speculation — claim + kill switch only    | 0.05 |
| VERIFIED | merged PR **in the target repo** cites the technique | 1.00 |
| REFUTED  | falsification_condition met — killed, scar kept in chain | 0    |

Provenance (where the finding lives) is shape-checked but earns nothing —
do not conflate it with the currency.

## First findings

1. **The mesh started empty of currency — no longer.** All 5 seed edges began
   PENDING with real provenance (quilt-tools#3/#4/#5, quilt-arcade#2 — all
   audited MERGED live), but zero merged PRs in a *target* repo cited a
   seeded technique. On 2026-09-26 the first edge earned currency:
   **quilt-show PR #1** ("E3 verification record — script↔sim claim map +
   referral edge to quilt-tools PR #3", MERGED 2026-09-25T19:14:08Z, merge
   `a2f82a35`) carries the S2 driftwatch citation in-repo
   (`docs/E3-VERIFICATION.md` referral-edge record + `episode-3/sim.mjs`
   header), with quilt-show PR #3 (ep4-instruments, merged 21:30Z)
   re-citing it. Edge `qt-s2-driftwatch → qs-ep2` is now **VERIFIED=1.0**,
   receipt `SuperInstance/quilt-show#1`. The empty-currency baseline is
   broken; the view moved (see finding 2).
2. **The view discriminates — now with real mass, twice.** Answer distribution at
   seed was quilt-arcade 40% · quilt-show 40% · quilt-tools 20%. After the
   first VERIFIED edge: **quilt-show 87.5%** · quilt-arcade 8.3% ·
   quilt-tools 4.2%. After the second — **pong-quilt PR #28** ("R21:
   receipted quantum-coin champion tiebreak", MERGED 2026-09-26T05:27:42Z,
   merge `b14791f`) carrying quilt-quant's `coin-toss-v1` citation in-repo
   (`core.js` VERIFIED_CLAIMS `quantum-tiebreak` entry + `tools/prerun.js`,
   PR #29 symmetrized the flip journal) — edge `quant-coin-toss →
   qq-quantum-tiebreak` flips **VERIFIED=1.0**, receipt
   `SuperInstance/pong-quilt#28`, and the single-edge monopoly is broken:
   **quilt-show 47.7% · pong-quilt 45.5%** · quilt-arcade 4.5% ·
   quilt-tools 2.3%. Currency now flows tools→show AND quant→pong — two
   independent directions of cross-use.
3. **Falsification is mechanical.** Each edge declares the exact observed
   evidence that would kill it; `probe()` books the death as a REFUSED row
   (scar stays in the chain, mass drops from the view). NEGATIVE_SPACE idiom,
   graph-native.

## Referral edges (lane rule — this doc's own links)

- REFERRAL_GRAPH → **quilt-show**: Episode 2's "demonstrate, don't assert" is
  now load-bearing for this graph's weight law (PENDING until demonstrated).
  Kill switch: a quilt-show episode whose central claim ships with no receipt
  and no declared kill condition.
- REFERRAL_GRAPH → **quilt-arcade**: plugin manifests are the natural
  on-disk shape for a node's identity; a game plugin citing a lab technique
  would mint the graph's first VERIFIED edge. Kill switch: the plugin gate
  accepting a manifest with no provenance field.
- REFERRAL_GRAPH → **tidepool** (staged, repo not yet seeded): semantic
  recall auto-placing referral edges — prediction error = breeding novelty
  (JEPA's mesh role made literal). Kill switch: an auto-placed edge entering
  the view with weight above PENDING.

## Next rungs

- ~~First VERIFIED edge~~ **DONE 2026-09-26** — quilt-show#1 cites S2; edge
  VERIFIED=1.0, view moved.
- ~~Second VERIFIED edge / break the single-edge monopoly~~ **DONE
  2026-09-26** — pong-quilt#28 cites quilt-quant coin-toss-v1; edge
  VERIFIED=1.0. The view now carries two independent currency directions.
  Third candidate visible: ep4's twist-field instruments could carry an
  S3-shaped witness row into a plugin-adjacent artifact, or git-agent's
  quilt_emit (#1, merged) citing the 5-opcode WAL could earn agent→quilt.
- JEPA predicts which repo a new finding refers to — prediction error logged
  as a receipt = the breeding-reward hook.
- ~~`auditReceipts` against the live org PR stream (cron) so VERIFIED weights
  decay honestly when cited PRs are reverted~~ **guard DONE** (the pins'
  live audit covers receipts); **discovery DONE 2026-09-26** —
  `experiments/referral_graph.discovery.mjs` watches the org's merged-PR
  stream for *mintable* currency (first live run: 0 real candidates across
  the 4 PENDING edges; 1 hit — quilt-tools#6 — EXCLUDED as self-referential:
  the graph's own artifact cannot mint its currency, anti-Goodhart guard
  pinned as Pin 10). Candidates surface with their PR; a human verifies the
  citation is load-bearing, then the seed flips — this tool never books.
