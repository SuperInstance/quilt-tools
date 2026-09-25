# quilt-tools

Ten working tool prototypes built on the [Quilt](https://github.com/SuperInstance/quilt)
reactive spreadsheet engine — plus a **springboard lab** for JEV/MothQuantum
experiments.

## Zero-shot (30 seconds)

```bash
git clone https://github.com/SuperInstance/quilt-tools && cd quilt-tools
npm install
node tools/fleet-pager.mjs   # expect: 7/7 checks green
npm run check                # expect: syntax OK
```

No engine build needed — the @quilt/core dist is vendored.

Run all ten self-checks:

```bash
for f in tools/*.mjs; do node $f >/dev/null 2>&1 && echo "${f##*/}: green" || echo "${f##*/}: FAIL"; done
```

## Status: Phase 1 — scaffold ✅

All 10 tools run offline (SysOne heuristics, no network) and self-check:

| tool | checks | realm |
|---|---|---|
| `fleet-pager` | 7/7 | SRE paging with hysteresis band discipline |
| `ledger-seal` | 6/6 | tamper-evident append-only witness ledger |
| `ocean-recall` | 7/7 | vector-note recall with honest forget |
| `triagedesk` | 8/8 | support triage routing |
| `budget-tide` | 8/8 | cash-flow envelopes with dry-envelope fences |
| `home-ecos` | 6/6 | home ecosystem automation |
| `driftwatch` | 7/7 | config drift detection |
| `approvals` | 9/9 | spend approvals with tier-based routing |
| `habit-atlas` | 8/8 | habit streaks with momentum physics |
| `pipeline-guard` | 9/9 | pipeline row validation + dead-letter replay |

```
npm install
node tools/fleet-pager.mjs    # or any of the ten
npm run check                 # syntax-check all
```

## Layout

- `tools/` — the ten prototypes (self-contained, each ends in a check harness)
- `src/toolkit.mjs` — shared harness: `sheet()`, `check()`, `done()`, `SysOne`,
  deterministic embedder, witness-chain helpers. No laptop paths — the engine
  dist resolves via `vendor/quilt-core` (override with `QUILT_DIST=/path/to/dist`).
- `vendor/quilt-core/` — vendored `@quilt/core` build (see its README for exact
  provenance). Vendored so the tools run hermetically; the springboard lab can
  mutate a copy without touching the upstream repo.
- `cards/` — per-tool claim/role/origin cards (the "ten working tools" proof deck)
- `site/index.html` — tool-picker UI

## Springboard lab (Phase 2+)

The lab mandate: these prototypes plus the vendored engine are the substrate for
JEV/MothQuantum experiments — instance-graph mutations as sheet diffs, midden
harvesting as cell provenance, ZPP certification runs as witness chains. Work
happens on branches; `main` stays green.
## GAN-hardened logic (from the quilt-loom Divergence Foundry)

`gan-elites/` holds crowned implementations bred by the loom — a GAN that
breeds logic as different as possible from every prior bloodline while staying
behaviorally exact. Each directory: `contract.mjs` (vendored oracle + canon +
200-probe frozen corpus), `elite-NN.mjs` (provenance banner: family, hash,
novelty, voice), and `verify.mjs` (self-contained in-place equivalence run).

```bash
node gan-elites/pager-band/verify.mjs      # 860/860 — divergent in form, exact in behavior
node gan-elites/witness-fnv/verify.mjs     # 832/832
node gan-elites/cosine-sparse/verify.mjs   # 828/828
```
