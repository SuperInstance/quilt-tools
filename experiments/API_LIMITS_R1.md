# API_LIMITS_R1 — high-level API experiments on the live oracles

Mandate: Casey 10:55 CST 2026-09-25 ("lanes for new experimentation with the
apis ... documenting successes and failures to shape limits and potentials").
Branch `api-lab-r1` on SuperInstance/quilt-tools. Each experiment:
hypothesis → protocol → receipts → finding. **Failures are findings.**

Wire baseline (verified live earlier today, S1/S2/S3):
`POST https://api.typesafe.ai/v1/systemone`, `Bearer $TYPESAFEAI_KEY`,
`{model:'jev-latest', state:<json-string>, questions:{name:{type,question,criteria,scale}}}`.
Score questions: `criteria` + `scale` label arrays, **10 levels max** (11+ → 400),
answer = normalized score with per-index `probabilities` (modal index → label).

---

## Experiment 1 — "ordinal, not interval", quantified (DONE)

Script: `experiments/e1-ordinal-not-interval.mjs` (7 pins).
Receipt: `experiments/out/e1-ordinal-not-interval.receipt.json` (witness chain,
18 rows).

**Hypotheses (pre-registered):**
- H1: mean modal score is strictly monotone across 6 claims on a known
  evidential-support continuum.
- H2: same-prompt rescoring (3×) mostly agrees at adjacent levels (ordinal
  noise, not signal).
- H3: adjacent continuum steps land unevenly on the scale (non-interval).

**Protocol:** 6 claims, decreasing support (crystals-cure → coffee-prevents-
Alzheimer's → fasting-extends-life → exercise-helps-cardiovascular → water-
boils-100°C → sky-is-blue), each scored on the 10..100 scale, 3 independent
rescoring rounds = 18 live calls, all witness-booked.

**Results (2 live runs):**
| claim | run 1 (3 rounds) | run 2 (3 rounds) |
|---|---|---|
| crystals cure chronic disease | 10,10,10 | 10,10,10 |
| coffee prevents Alzheimer's | 10,10,10 | 10,10,10 |
| fasting extends lifespan | **30,50,30** | 50,50,50 |
| exercise → cardiovascular | 100,100,100 | 100,100,100 |
| water boils at 100°C @sea level | 100,100,100 | 100,100,100 |
| daytime sky is blue | 100,100,100 | 100,100,100 |

**Findings:**
1. **H1 STRICT version FALSIFIED — floor/ceiling collapse.** A 6-point
   continuum compresses to 3 distinct values {10, 50, 100}: p1≡p2 at the floor,
   p4≡p5≡p6 at the ceiling. The scale has effectively ~3 usable rungs for
   real-world claims. Revised H1' (weak ordering, zero inversions) holds in
   both runs — the scale never inverts order, it saturates instead.
2. **H2 SUPPORTED, refined:** run 1 = 16/18 pairs within 1 level; run 2 = 18/18.
   But the refinement is the finding: **rescore noise exists ONLY at contested
   positions** (fasting: 30/50/30 in run 1). At floor/ceiling the oracle is
   perfectly repeatable. Noise is a boundary phenomenon, not general jitter.
3. **H3 SUPPORTED strongly:** adjacent continuum gaps = 0,4,5,0,0 levels
   (run 2). The middle gap (pseudoscience→contested = 4 levels,
   contested→established = 5 levels) vs zero gaps elsewhere = the scale
   measures "settled vs contested", not distance. **Ordinal, not interval —
   now with numbers.**
4. Practical consequence: with a 10-level fence that collapses to 3 usable
   rungs, downstream consumers should treat score deltas ≤1 level as ties and
   should expect no resolution at all between any two settled claims (both
   pin to 100) or any two refuted claims (both pin to 10). Comparative
   paired questions (S2/E4 style) are the only way to extract fine ordering —
   consistent with the E4 paired-gate result.

---

## Experiment 2 — receipts change credit (PENDING)

Replay the S2 drift scenario bare-prompt vs with witness receipts inline; ask
the oracle which detection it credits. Tests the Quilt Show thesis ("shape
beats threshold must be demonstrated with receipts") at the API layer.

## Experiment 3 — two-envelope entanglement (PENDING)

Two dry budget envelopes ENTANGLED to one coin-toss appeal; hypothesis: the
sheet enforces joint collapse; hard debt refuses. (S3 machinery reusable.)
