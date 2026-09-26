// Referral Graph — seed v1 (Casey 12:03 mandate, PoC).
//
// One sheet, three repos seeded: quilt-tools <-> quilt-show <-> quilt-arcade.
// Honesty note (the PoC's first finding): at seed time ZERO edges carry the
// mandate's currency — a merged PR IN THE TARGET repo citing the technique.
// quilt-show has no merged PRs at all (episodes direct-pushed); quilt-arcade's
// merged PRs cite the quilt-main playtest report, not a seeded-repo technique.
// So every real edge is PENDING with provenance (where the finding lives).
// The mesh starts by measuring what speculation cannot buy.
//
// UPDATE 2026-09-26: the first edge earned currency. quilt-show PR #1
// ("E3 verification record: script<->sim claim map + referral edge to
// quilt-tools PR #3") MERGED 2026-09-25T19:14:08Z (merge a2f82a35) — a
// merged PR in the to-node's repo citing the S2 driftwatch technique.
// Edge qt-s2-driftwatch -> qs-ep2 is therefore VERIFIED=1.0 with
// receipt SuperInstance/quilt-show#1. The other four edges stay PENDING.
// The empty-currency state (Finding #1) is broken; the view now moves.
//
// UPDATE 2026-09-26 (later): a third repo pair enters the sheet — the
// candidate surfaced by the 11:11 pulse's org review (queue file). git-agent
// PR #1 ("quilt_emit: vessel lifecycle events -> quilt 5-opcode WAL",
// MERGED 2026-09-26T00:27:18Z, merge 6bc099a) implements the five-opcode WAL
// spine whose canonical source is AI-Writings/algebra.md ("The Five
// Opcodes"). HONESTY: the merged code cites the DOCTRINE ("the fleet's
// quilt kernel speaks five opcodes") but never names the source repo, so
// the weight law is NOT met — booked PENDING with provenance, upgrade path
// = a follow-up citation naming algebra.md in-repo. Never self-upgrade.
// UPDATE 2026-09-26 (pm): the SECOND edge earned currency, breaking the
// single-edge monopoly. pong-quilt PR #28 ("R21: receipted quantum-coin
// champion tiebreak (cites quilt-quant coin-toss-v1)") MERGED
// 2026-09-26T05:27:42Z (merge b14791f) — a merged PR in the to-node's repo
// citing quilt-quant's live coin-toss-v1 engine (core.js VERIFIED_CLAIMS
// 'quantum-tiebreak' entry + tools/prerun.js seeded-mock citation, both live
// on main). Edge quant-coin-toss -> qq-quantum-tiebreak is VERIFIED=1.0 with
// receipt SuperInstance/pong-quilt#28. Two new nodes/repos enter the sheet:
// quilt-quant (from-side technique) and pong-quilt (to-side consumer).
//
// Weight law: PENDING = 0.05 (speculation is cheap) / VERIFIED = 1.0 (a
// merged PR in the to-node's repo cites the from-technique).
//
// Each edge carries its kill switch: falsification_condition — the observed
// evidence string that would refute the claim (probe() books the death as a
// REFUSED row; the scar stays in the graph).

export const SEED = {
  name: 'referral-graph-v1',
  repos: ['quilt-tools', 'quilt-show', 'quilt-arcade', 'git-agent', 'AI-Writings'],
  repos: ['quilt-tools', 'quilt-show', 'quilt-arcade', 'quilt-quant', 'pong-quilt'],

  nodes: [
    { id: 'qt-api-lab', repo: 'quilt-tools', kind: 'lab',
      summary: 'api-lab R1: what the typed oracle can and cannot see (E1 ordinal rungs, E2 receipts flip credit)' },
    { id: 'qt-s2-driftwatch', repo: 'quilt-tools', kind: 'experiment',
      summary: 'S2 drift map: oracle has no variance-collapse concept; shape-beats-threshold not prompt-visible' },
    { id: 'qt-s3-tide', repo: 'quilt-tools', kind: 'experiment',
      summary: 'S3 quantum-tided budget: PENDING/ENTANGLED/COLLAPSED witnessed pre-outcome; insolvency refuses absolutely' },
    { id: 'qs-ep2', repo: 'quilt-show', kind: 'episode',
      summary: 'Episode 2 The Receipt: a claim must be DEMONSTRATED with receipts, never asserted in prose' },
    { id: 'qs-ep3', repo: 'quilt-show', kind: 'episode',
      summary: 'Episode 3 player work: waveform + watchers + drag-to-reshape' },
    { id: 'qa-negspace', repo: 'quilt-arcade', kind: 'constitution',
      summary: 'NEGATIVE_SPACE.md: declined patches and divergences documented as first-class constitution' },
    { id: 'qa-plugins', repo: 'quilt-arcade', kind: 'plugin-system',
      summary: 'Modular plugins: every game a two-file plugin (module + manifest), receipt-rendered run_all' },
    { id: 'aw-quint-opcode', repo: 'AI-Writings', kind: 'canon',
      summary: 'algebra.md "The Five Opcodes": BIND/LINK/EFFECT/VIEW/TICK (+FORGET) — the fleet WAL spine, 5 laws, canonical semantics' },
    { id: 'ga-quilt-emit', repo: 'git-agent', kind: 'agent-integration',
      summary: 'quilt_emit.py: vessel lifecycle events -> fnv1a hash-chained 5-opcode JSONL WAL; first quilt-native fleet agent' },
    { id: 'quant-coin-toss', repo: 'quilt-quant', kind: 'lab',
      summary: 'coin-toss-v1: the moth-quantum engine — receipted quantum coin, every flip journaled' },
    { id: 'qq-quantum-tiebreak', repo: 'pong-quilt', kind: 'experiment',
      summary: 'R21 champion selection: equal-fitness ties broken by a receipted quantum coin via the makeEvaluator onTie seam' },
  ],

  edges: [
    {
      from: 'quant-coin-toss', to: 'qq-quantum-tiebreak',
      claim: 'A champion-selection tie is a verdict: silent index order is an unwitnessed collapse. pong-quilt\'s R21 wires the makeEvaluator onTie seam to quilt-quant\'s coin-toss-v1 (seeded mock of the live engine, citation verified against quilt-quant lab/play.mjs, every flip journaled — R22 symmetrized the journal). CURRENCY EARNED 2026-09-26: pong-quilt PR #28 (merged 2026-09-26T05:27:42Z, merge b14791f) carries the coin-toss-v1 citation in-repo (core.js VERIFIED_CLAIMS \'quantum-tiebreak\' entry + tools/prerun.js).',
      weight: 'VERIFIED',
      provenance: null, // quilt-quant ships direct-pushed (zero PRs) — the finding lives in lab/play.mjs itself
      receipt: 'SuperInstance/pong-quilt#28',
      falsification_condition: 'a replayed prerun where equal-fitness champions are ordered by array index with no coin flip journaled',
    },
    {
      from: 'qt-s2-driftwatch', to: 'qs-ep2',
      claim: 'S2 measured the exact wall behind E2\'s thesis: shape-beats-threshold cannot be asserted in a prompt — the episode\'s "demonstrate, don\'t assert" now has an api-lab receipt map under it. CURRENCY EARNED 2026-09-26: quilt-show PR #1 (merged 2026-09-25T19:14:08Z, merge a2f82a35) carries this citation in-repo (docs/E3-VERIFICATION.md referral-edge record + episode-3/sim.mjs header); quilt-show PR #3 (ep4-instruments, merged 21:30Z) re-cites it.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/quilt-tools#3',
      receipt: 'SuperInstance/quilt-show#1',
      falsification_condition: 'a replayed stream where the 0.80 threshold fires before shape on st02 slow drift',
    },
    {
      from: 'qt-api-lab', to: 'qs-ep2',
      claim: 'E2 quantified persuasion risk: receipts flip credit 1/4 -> 4/4 whether or not the underlying claim is true — Episode 2\'s verifyChain discipline is the counter-move',
      weight: 'PENDING',
      provenance: 'SuperInstance/quilt-tools#5',
      falsification_condition: 'a receipts-inline run where ground-truth agreement does not move vs bare',
    },
    {
      from: 'qt-s3-tide', to: 'qa-plugins',
      claim: 'S3\'s witnessed pre-outcome states (PENDING/ENTANGLED/COLLAPSED) are the receipt shape a quantum coin plugin needs before its verdict drives game state',
      weight: 'PENDING',
      provenance: 'SuperInstance/quilt-tools#4',
      falsification_condition: 'a plugin event driven by a coin outcome with no pre-outcome witness row',
    },
    {
      from: 'qa-negspace', to: 'qt-api-lab',
      claim: 'NEGATIVE_SPACE\'s declined-patch-12 doctrine is the same shape as E2\'s receipts-over-scores: document the divergence, never silently port it — the lab should score claims the same way',
      weight: 'PENDING',
      provenance: 'SuperInstance/quilt-arcade#2',
      falsification_condition: 'a quilt-main PR merging the verbatim patch 12 with no cost-regression receipt',
    },
    {
      from: 'qs-ep3', to: 'qa-plugins',
      claim: 'Episode 3\'s drag-to-reshape watcher loop is a playable reactive surface — the same seam the arcade plugins expose through run_all',
      weight: 'PENDING',
      provenance: null,
      falsification_condition: 'a watcher demo that cannot be re-expressed as a two-file plugin without losing behavior',
    },
    {
      from: 'aw-quint-opcode', to: 'ga-quilt-emit',
      claim: 'AI-Writings/algebra.md defines the five-opcode spine and its laws (BIND idempotent; algebra.md says do not add opcodes); git-agent#1 (MERGED 2026-09-26T00:27:18Z, merge 6bc099a) built quilt_emit.py — vessel events mapped one-to-one to BIND/LINK/EFFECT/VIEW/TICK lines in a hash-chained WAL — on exactly that spine. The citation is DOCTRINAL only ("the fleet quilt kernel speaks five opcodes"), the source repo is never named in the merged code, so the weight law keeps this PENDING; upgrade path = an in-repo citation naming algebra.md.',
      weight: 'PENDING',
      provenance: 'SuperInstance/git-agent#1',
      falsification_condition: 'git-agent quilt_emit.py shipping an opcode mapping that contradicts algebra.md semantics (e.g. VIEW given mutation semantics, or a 6th opcode added) with no algebra reference anywhere in the repo',
    },
  ],
};
