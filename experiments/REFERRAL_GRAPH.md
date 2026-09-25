# REFERRAL_GRAPH PoC — the mesh answers as a distribution

Mandate: Casey 2026-09-25 12:03 — "not one thing but a distribution of
intelligent referrals." Ideas are nodes, referrals are weighted LINKs, and the
answer to any question is a ranked VIEW over modules — every edge carrying the
receipt that proves it or the falsification condition that would kill it.

## What was built

- `src/referral_graph.mjs` — the substrate: nodes + hash-chained LINK rows
  (fnv1a-64, the fleet receipt idiom), weight law enforced at booking time,
  falsification probes, receipt audits, and the ranked-distribution VIEW.
- `experiments/referral_graph.seed.mjs` — the real v1 graph: 7 nodes across
  quilt-tools ↔ quilt-show ↔ quilt-arcade, 5 edges, every edge with its kill
  switch declared.
- `experiments/referral_graph.pins.mjs` — 21 pins. Run:
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

1. **The mesh starts empty of currency.** All 5 seed edges are PENDING with
   real provenance (quilt-tools#3/#4/#5, quilt-arcade#2 — all audited MERGED
   live), but zero merged PRs in a *target* repo cite a seeded technique.
   quilt-show has no merged PRs at all (episodes direct-pushed). Speculation
   is abundant; cross-use is unmeasured. That is the baseline the mesh exists
   to move.
2. **The view already discriminates.** Answer distribution at seed:
   quilt-arcade 40% · quilt-show 40% · quilt-tools 20% — the tools repo is
   currently where referrals leave, not arrive. As VERIFIED edges land this
   ranking becomes the fleet's "where does an answer come from" oracle.
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

- First VERIFIED edge: port one real cross-use (e.g. an arcade plugin citing
  the S3 witness shape) and watch the view move.
- JEPA predicts which repo a new finding refers to — prediction error logged
  as a receipt = the breeding-reward hook.
- `auditReceipts` against the live org PR stream (cron) so VERIFIED weights
  decay honestly when cited PRs are reverted.
