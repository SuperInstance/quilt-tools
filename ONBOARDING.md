# ONBOARDING — quilt-tools

> Seed doc (fleet handoff 2026-10-06). Read with `README.md` (the eleven tools +
> claim cards) and `experiments/REFERRAL_GRAPH.md` (the graph seed + receipts).
> Mesh context: `SuperInstance/fleet-seeds` → `docs/handoff-2026-10-06/ORG-MESH.md`.

## 1. What this repo is now

Three things in one repo:

1. **Eleven working tools** grown on the Quilt reactive-spreadsheet engine
   (fleet-pager, ledger-seal, ocean-recall, triagedesk, budget-tide, home-ecos,
   driftwatch, approvals, habit-atlas, pipeline-guard, convergence-gauge) —
   94 self-checks, all offline, each with a claim card.
2. **The referral graph** (`experiments/`) — the org's connective tissue: a
   seeded, pinned record of which fleet repo cites which technique, at what
   weight. **32 edges / 24 VERIFIED / 8 PENDING** at handoff; pins
   198/198 offline + 201/201 `--live`.
3. **The lab** — experiments where the receipts get to mutate the tools that
   print them (GAN-bred bloodlines of logic, quantum-tide budgets, s3 witness
   shapes, discovery hints).

**Open at handoff:** PRs #50 (edge #29 flip PENDING→VERIFIED, exoj→pincher —
lands graph at 25/7), #51 (discovery blind-spot guard + Pin 13), #52 (PoE
Memory frontier design receipt, arXiv 2608.16032, KS1–4 verified live).
Main is Casey-gated.

## 2. How it got here (the momentum)

- **Tool garden first.** The eleven tools were bred as scenario-logic
  bloodlines on the Quilt engine, each graded by its own harness. "Green is
  the only accepted color" is the founding tone.
- **Then the graph.** The fleet's problem became bookkeeping: hundreds of
  receipted repos citing each other, with no map. The referral graph answers
  *what came from where, verified how*. The **weight law** is the load-bearing
  doctrine: an edge is VERIFIED only when a **merged PR in the target repo**
  cites the technique — never self-upgraded. Weight classes: grown-on >
  consumes > related.
- **Fresh-audit (the org's audit tool).** Built here as PR #45 (merged): a
  pristine depth-1 clone runner that re-executes a PR's pins in a tree the
  author never touched — the antidote to the R85 phantom-RED class. The
  wrapper `scripts/fresh-audit-pr.sh` (workspace) selftests 3/3. Every open
  fleet PR now carries a committed fresh-audit receipt; the org rule is
  *audit the pushed head, never the author's tree*.
- **Discovery discipline.** PENDING edges carry citation-word hints so a scan
  can find their upgrade landings (#51 hardened this — the watcher itself was
  blind to 5 edges until hinted). The honest-limit convention: tools report
  what they found, and say what they could not check.

## 3. The vision

The org as a *citable organism*. Code grows, gets adopted, gets cited — and
the citations are receipts, not vibes. quilt-tools is where the org watches
itself: tools that grade their own homework, a graph that only moves on
evidence, and an audit culture where "the fresh clone passed" is the only
green that counts.

## 4. Roadmaps (several directions)

**Going now:** the 3 open PRs; then re-run `npm run check` + graph pins after
each merge (counts move: 24→25 VERIFIED on #50).

**Sketched futures:**
- **Remaining PENDING edges** (hinted, scanning): qs-ep3→qa-plugins,
  qt-api-lab→qs-ep2, qa-negspace→qt-api-lab, the wiring pair, qmr→wave69.
  Each has a recorded upgrade path in the seed; the finder lane is mechanical
  once the target repo's PR lands.
- **External-prior nodes.** The graph already pins PoEM (2608.16032), DEI
  (2605.27130); next-pass adds ECT (2608.23623) and the V-model layer paper
  (2609.31937), plus TMA-NM (write-time origin binding — validates the fleet
  WAL doctrine; cite-not-build).
- **fresh-audit v1.** Runner-discovery is honest but narrow (finds
  `tests/pins*.sh` only); a manifest-driven discovery + GitHub-Actions
  integration would make receipts automatic per PR.
- **Discovery as a service.** The hint+scan loop could run as a scheduled
  lane on a follow-up agent (crons stood down 2026-10-06).

## 5. How it meshes

- This repo is the **bookkeeper of the org**: every other lane's edges land
  here (jev-quilt probes → cot-quilt doctrine = edge #33, the first inbound
  from the merged cot-quilt#1; arcade s3 witness = edge #32; gpu-lab
  provenance = edge #31).
- Sibling labs: `quilt` (engine), `quilt-studio`, `fleet-witness` (the WAL
  this graph witnesses), `fleet-seeds` (docs home; the 2026-10-06 handoff +
  ORG-MESH live there).
- Method donors to: MicroMoth (fresh-audit receipts on every PR), pong-quilt
  (receipt-audit), jev-quilt (receipt schema v1 auto-pins).
