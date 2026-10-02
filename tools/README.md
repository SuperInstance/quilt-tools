# tools/

Catalog of the tools in this directory. The `.mjs` fleet is described in the
[root README](../README.md) — one-liners here, full cards and check counts there.

## The `.mjs` fleet (Node, engine-wired)

| tool | what it does |
|---|---|
| [`approvals.mjs`](approvals.mjs) | spend approvals with tier-based routing |
| [`budget-tide.mjs`](budget-tide.mjs) | cash-flow envelopes with dry-envelope fences |
| [`convergence-gauge.mjs`](convergence-gauge.mjs) | training-curve convergence certification |
| [`driftwatch.mjs`](driftwatch.mjs) | config drift detection |
| [`fleet-pager.mjs`](fleet-pager.mjs) | SRE paging with hysteresis band discipline |
| [`habit-atlas.mjs`](habit-atlas.mjs) | habit streaks with momentum physics |
| [`home-ecos.mjs`](home-ecos.mjs) | home ecosystem automation |
| [`ledger-seal.mjs`](ledger-seal.mjs) | tamper-evident append-only witness ledger |
| [`ocean-recall.mjs`](ocean-recall.mjs) | vector-note recall with honest forget |
| [`pipeline-guard.mjs`](pipeline-guard.mjs) | pipeline row validation + dead-letter replay |
| [`triagedesk.mjs`](triagedesk.mjs) | support triage routing |

## Python tools (stdlib-only, no deps — run anywhere `python3` runs)

### [`champion_audit.py`](champion_audit.py) — claim-ledger integrity auditor

Generalized from [coev](https://github.com/SuperInstance/coev)'s
champion-integrity auditor (which caught a real hollow champion: claimed
1259.1, benched 239.6). Enforces the doctrine: **a ledger of receipts is not
evidence the receipts are true.** Scans claim ledgers (`RESULTS.md`,
`RECEIPT*.md`, `PIN*.md`, `*.pins`), extracts claims written in the claim
grammar, and checks each against its cited proof artifact (or re-executes a
recorded command with `--reexec`):

```bash
# audit a repo's claim ledgers (exit 0 verified / 1 findings / 2 fail-loud input)
python3 tools/champion_audit.py <repo-root>

# stochastic re-execution: loosen tolerance, run recorded cmd: lines (read them first!)
python3 tools/champion_audit.py <repo-root> --reexec --tolerance 0.05

# machine report alongside the human one
python3 tools/champion_audit.py <repo-root> --out-json report.json

# custom ledger patterns
python3 tools/champion_audit.py <repo-root> --pattern 'BENCH*.md' --pattern '*.bench'
```

Claim grammar (one per line): `claim(name): NUMBER proof: PATH [key: dot.path] [tol: RELTOL] [cmd: COMMAND]`.
Verdicts: PROOF-OK · HOLLOW (both numbers named) · STALE (proof newer than
receipt — filesystem-truth, not git-truth) · NO-ARTIFACT · UNVERIFIABLE
(counted, never silent). Pins: `python3 tools/test_champion_audit.py` (12 pins,
fail-first, planted hollow champion).

Test pins: **12/12 green**.
