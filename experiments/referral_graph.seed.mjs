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
// UPDATE 2026-09-26 (evening): the FOURTH edge earned currency — and it is
// jev-quilt's FIRST outgoing edge, minted by a repo that did not exist when
// the graph was seeded. quilt-cowboy PR #1 ("jev substance gate: jev-quilt
// doctrine on the paper-generation output gate", MERGED 2026-09-26T09:12:37Z,
// merge a3feccca) wires jev-quilt's substance noul + 0.6 admit threshold onto
// the cowboy v3 paper gate, citing SuperInstance/jev-quilt BY NAME in-repo
// (README.md "The JEV Substance Gate" + jev_substance_gate.py CITATION const
// + module docstring). The weight law is met: a merged PR in the to-node's
// repo names the source repo. Edge jq-substance-noul -> qb-jev-gate is
// VERIFIED=1.0 with receipt SuperInstance/quilt-cowboy#1. This was flagged as
// the synergy candidate in the 16:11 pulse (jev-quilt had zero outgoing
// currency; quilt-doctor named the length-proxy stand-in the gate replaces).
//
// UPDATE 2026-09-26 (evening): the THIRD edge earned currency, completing
// the day's arc doctrine -> code -> citation -> currency. git-agent PR #4
// ("docs: cite canonical opcode source (AI-Writings/algebra.md) in
// GRAND-QUILT — upgrades referral edge to VERIFIABLE") MERGED
// 2026-09-26T09:11:41Z (merge 8d6c31a) — a merged PR in the to-node's repo
// (git-agent) that names the from-source by name and URL
// (docs/GRAND-QUILT.md provenance block: 'Its canonical source is
// [AI-Writings/algebra.md](...)' + the edge name, citing the weight law
// itself). Edge aw-quint-opcode -> ga-quilt-emit is therefore VERIFIED=1.0
// with receipt SuperInstance/git-agent#4. The upgrade path booked at
// PENDING-time was followed exactly; never self-upgraded — the merge did it.
//
// UPDATE 2026-09-26 (late): the FIFTH edge earned currency — and it is the
// first edge whose TO-node is a repo born after the graph was seeded, plus
// the first edge where the honest direction is from pong-quilt OUTWARD.
// fleet-murmur PR #2 ("Honesty-receipts pass: transport modes, receipt
// ledger, quality-gate seam, claims registry", MERGED 2026-09-26T19:08:16Z,
// merge 5391ba56) names SuperInstance/pong-quilt BY NAME in-repo three
// times in CROSS-POLLINATE.md: the QA-REFUSAL honesty pins as the
// transport-honesty contract (a black-hole transport must not score 100%
// coverage), the session WAL (tools/wal-session.js) as the receipt-ledger
// substrate, and the VERIFIED_CLAIMS + readme-count registry as the claims
// registry shape. HONESTY NOTE on direction: the weight law requires the
// receipt to be a merged PR IN THE TO-NODE'S REPO, so the edge books
// pq-session-wal -> fm-honesty-receipts (receipt SuperInstance/fleet-murmur#2
// targets fleet-murmur, the to-node's repo). The 03:23 edge-watch note wrote
// the direction fm->pq from the citation's perspective; the substrate's
// receipt-repo rule is the constitution — the merge in the citing repo
// earns currency FOR the cited technique flowing INTO that repo.
//
// UPDATE 2026-09-27 (morning): the SEVENTH edge earned currency — booked
// from the exact lane the 05:24 pulse opened ("on merge books edge qgs→fm,
// target repo=fm — not fm→qgs as the pulse note guessed"). fleet-murmur
// PR #3 ("qgs adapter: live-verify seam against real quality-gate-stream
// (stale-API fix)", MERGED 2026-09-26T23:08:45Z, merge 8df75c6) rewrites
// tools/quality_gate_adapter.py against the live quality-gate-stream API
// (CustomCheck(name, fn), evaluate() -> GateResult.outcome, strict=True
// default — the pre-merge adapter called a stale API and raised TypeError /
// AttributeError against the real package) and names
// SuperInstance/quality-gate-stream BY NAME in-repo at three anchored sites:
// the adapter module docstring ("Cross-repo seam (cross-pollination
// receipt): SuperInstance/quality-gate-stream"), VERIFIED_CLAIMS.md VC10,
// and tests/test_qgs_adapter_glue.py (live pins import the real package,
// abstain as labeled skips when uninstalled, never fake green; an always-on
// pin asserts the citation string is present in the adapter source). Two
// sibling repos built the two halves of the review-honesty doctrine the
// same day (fleet-murmur#2 quality-gate seam / quality-gate-stream#2 strict
// mode); this merge pins them against dialect drift — the same
// exporter-in-consumer / live-verify-in-producer shape as the R26
// wal-export -> quilt-doctor seam. HONESTY on direction: the citing merge
// is in fleet-murmur, so the edge books qgs-strict-gate -> fm-qgs-adapter
// (currency flows INTO the citing repo), exactly as pre-booked.
// fleet-murmur becomes the first repo carrying TWO VERIFIED inbound edges.
//
// Weight law: PENDING = 0.05 (speculation is cheap) / VERIFIED = 1.0 (a
// merged PR in the to-node's repo cites the from-technique).
//
// UPDATE 2026-09-27 (late morning): the EIGHTH edge earned currency — and it
// is the first edge the graph's own repo earns as a TO-node from the
// commons/G11 lane, closing the loop the 08:11 pulse flagged (jev-quilt#37
// hardened the exact blind-sum Goodhart surface this graph still had). The
// lane was opened as that pulse's synergy candidate and shipped in
// quilt-tools PR #17 ("referral-graph: the G11 trust lever", MERGED
// 2026-09-27T01:27:12Z, merge d14fb44): viewTrusted() re-scales every edge
// by its TARGET repo's EARNED trust (effective = trust·weight; unseen source
// defaults to 0), ported FROM SuperInstance/jev-quilt BY NAME in-repo (src
// comment naming SuperInstance/jev-quilt commons.py trust_weighted() /
// provenance_merge(), plus the REFERRAL_GRAPH.md entry). The weight law is
// met in the TO-node's repo: the merge landing IN quilt-tools names the
// from-source. Edge jq-commons-g11 -> qt-trust-lever is VERIFIED=1.0 with
// receipt SuperInstance/quilt-tools#17, provenance SuperInstance/jev-quilt#37
// (the G11 merge that hardened the commons against weight inflation — the
// exact anti-Goodhart term this graph's blind view needed; Pin 11 pins the
// port's fixture semantics and the citation string).
//
// UPDATE 2026-09-27 (dawn): the SIXTH edge earned currency — and the second
// repo born after seeding enters as a to-node. moth-waveform PR #1
// ("Phase 2: duck-sensitivity receipts — which duck carries the regime?",
// MERGED 2026-09-26T21:06:24Z, merge dc1a142) cites fleet-murmur's vacuity
// scar BY NAME in-repo, at code level: sensitivity.py's health gate
// ("a gate that passes without a live floor measurement passes vacuously
// (fleet-murmur scar)") exists because fleet-murmur#2's transport-honesty
// contract proved a black-hole transport can score 100% coverage — the same
// honesty doctrine as the fm-honesty-receipts node this edge books from.
// The README "Receipts doctrine" section also names pong-quilt (honesty
// pins), hermit (quilt-WAL), quilt-doctor (moth-ledger trial balance),
// quality-gate-stream (REFUSAL receipts) and fleet-murmur (transport modes)
// as doctrine lineage. HONESTY: the load-bearing citation is the code-level
// scar; the README list is lineage, not technique. Edge
// fm-honesty-receipts -> mw-floor-gate is VERIFIED=1.0 with receipt
// SuperInstance/moth-waveform#1. Found by the 06:56 pulse's discovery-class
// org scan (the discovery tool reports; a human verified the citation shape).
//
// UPDATE 2026-09-27 (midday): the NINTH edge earned currency — and the
// stone lane lands exactly as pre-booked by the 11:04 pulse ("on merge,
// referral graph books NINTH VERIFIED edge pq-stone-v1-export ->
// stone-forward-adopt"). quilt-stone PR #1 ("smoke 12b: pong-quilt R36 is
// the first stone-v1 forward-format adopter — exporter's real stone-v1
// output pinned (verify/tamper/splice) + README adoption record", MERGED
// 2026-09-27T04:20:06Z, merge 093c1b1) cites SuperInstance/pong-quilt BY
// NAME in-repo at two anchored sites: README.md "Forward-format adopters"
// ("SuperInstance/pong-quilt PR #46 (merged 2026-09-27)") and smoke.mjs
// section 12b — five pins over the EXACT exporter bytes generated live from
// pong-quilt's tools/wal-export.js toStoneV1() at PR #46's merge tip (not
// retyped): header row is the mandatory stone.header with tool=pong-quilt
// (producer named, not laundered), post-seal edit -> hash_mismatch, row
// splice -> continuity break. The weight law is met in the TO-node's repo.
// quilt-stone is the third to-node born after the graph was seeded (after
// fleet-murmur and moth-waveform), and pong-quilt earns its SECOND outgoing
// edge — its R36 wal-export lane now both RECEIVES currency (pq->fm, edge
// five) and PAYS it forward into the fleet's canonical receipt-chain
// verifier. HONESTY: the 09:57 edge-watch flagged quilt-stone as
// LANE-AFFECTING (all receipt/WAL export lanes should target/verify-through
// stone-v1); this edge records the adoption, not the mandate itself.
//
// UPDATE 2026-09-27 (afternoon): the TENTH edge earned currency — the
// stone-v2 sign lane, pre-booked twice (14:56 "on quilt-stone#4 merge the
// pilot opens + candidate VERIFIED edge"; 16:04 R39 pilot shipped closed
// against the sign-lane tip). Both merges landed in Casey's burst:
// quilt-stone PR #4 ("STONE-V2-PILOTS sign lane: signTip/verifyTipSignature
// ed25519 tip staples", MERGED 2026-09-27T09:02:01Z, merge 023edbed) ships
// the sign lane, and pong-quilt PR #51 ("R39: STONE-V2-PILOTS first sign
// pilot — producer staples the birth-seal chain's tip", MERGED
// 2026-09-27T09:03:15Z, merge 07384ac2) cites SuperInstance/quilt-stone BY
// NAME in-repo at three anchored sites: PLAYLOG Round 39 ("the stone-v2 sign
// lane, SuperInstance/quilt-stone PR #4, STONE-SPEC.md §4.6.2"), the
// citation pin in tests/stone-sign-glue.test.js, and core.js
// VERIFIED_CLAIMS 'stone-sign-pilot' ("whenever the named quilt-stone
// checkout ships the stone-v2 sign lane"). HONESTY ON DIRECTION: the 16:04
// pulse note guessed the edge books pong-quilt→quilt-stone; the substrate's
// receipt-repo rule is the constitution (edge #5 booked the same way) —
// the citing merge is IN pong-quilt, so the edge books
// stone-sign-lane -> pq-sign-pilot: the verifier's signature primitive
// flowing INTO the producer that staples with it. quilt-stone earns its
// FIRST OUTGOING edge (it received currency at edge #9 five hours earlier);
// pong-quilt joins fleet-murmur as the second double-mass repo — receiving
// the coin (edge #2) AND the sign lane (edge #10).
//
// Weight law: PENDING = 0.05 (speculation is cheap) / VERIFIED = 1.0 (a
// merged PR in the to-node's repo cites the from-technique).
//
// UPDATE 2026-10-01 (04:12 pulse): the FOURTEENTH edge lands directly at
// VERIFIED — the merge outran the booking. The 23:56 9/30 pulse booked
// qe-eproc-witness -> ds-esign-drift PENDING on branch edge14-pending-
// delta-shape (commit 7ddd151), lost the same night in a /tmp wipe; the
// 02:41 pulse rebuilt the PENDING booking as quilt-tools#31 (merge 812a644,
// 2026-09-30T19:31:04Z) — and main was then reset to 58e2a18, dropping
// the booking commit while KEEPING #29/#30. Neither wipe nor reset touches
// the weight law's real question: did a merged PR in the to-node's repo
// cite the from-technique load-bearing? **SuperInstance/delta-shape#1
// ("Drift significance layer (E1-E5): e-witness bridge consuming
// SuperInstance/quilt-ewitness", MERGED 2026-09-30T19:31:08Z, merge commit
// 57c07426)** did exactly that: vendor/quilt-ewitness/eproc.mjs pinned BY
// BYTES (@ 61b9e04, sha256 aad90ac5..., provenance in
// vendor/quilt-ewitness/SOURCE.txt), src/esign.mjs witnessDrift() sha256-
// checks the vendored instrument before trusting it (mismatched bytes refuse
// to witness), and the owning repo SuperInstance/quilt-ewitness is named at
// anchored sites on merged main (README "Shape != significance" section +
// SOURCE.txt + esign.mjs VENDOR_REPO constant). One lifecycle arc, fully
// inside the law: PENDING booking (twice — once lost, once reset away) ->
// merge -> VERIFIED. delta-shape is the SIXTH to-node born after seeding,
// entering at full VERIFIED mass; quilt-ewitness enters as a from-node
// (from-node-only repos earn no view mass).
//
// UPDATE 2026-09-30 (14:56 pulse): the TWELFTH edge earned currency — the
// first lab↔ledger bidirectional pair, and the booking corrects a false
// negative. The 14:38 pulse's citation scan reported micrograd-quilt main
// citing SuperInstance/MicroMoth-quilt ZERO times despite consuming the
// exp018-036 receipt lineage, and queued a citation PR. Re-audit 2026-09-30
// (this pulse) found that scan WRONG: micrograd-quilt PR #7 ("qcells
// exp020-036: tie-band replication → two-regime desert hazard →
// triplet-stream rate-lane closure", MERGED 2026-09-30T04:49:20Z, merge
// 44de605) is a merged PR IN THE TO-NODE'S REPO whose diff ADDS
// labs/qcells/FINDINGS.md citing SuperInstance/MicroMoth-quilt BY NAME at
// four anchored sites (the lab charter header, the import-baseline manifest
// pin on MicroMoth-quilt main, the honest-limit gap posted on
// MicroMoth-quilt#3, the receipts/ dir lane note) plus
// docs/synergy-scan-2026-09-30-0711.md consuming MicroMoth-quilt#23/#24's
// MERGED sealed findings to redirect the lab's own queue ("do not re-run").
// No citation PR was opened — Casey's merge already earned the edge, and
// opening one would have been citation spam on a false premise. Edge
// mm-sealed-receipts -> mgq-qcells-lab is VERIFIED=1.0 with receipt
// SuperInstance/micrograd-quilt#7, provenance SuperInstance/MicroMoth-quilt#24
// (the exp018 seal the synergy scan consumes). The MIRROR edge is booked
// PENDING the same hour: MicroMoth-quilt#24 (MERGED 2026-09-29T21:25:32Z,
// merge 664506a5) seals the lab's exp018 autopsy and names the producer
// only as "the qcells lab (workspace/labs/qcells)" — a workspace path,
// never the repo SuperInstance/micrograd-quilt. That is the git-agent#1
// doctrinal-citation shape, which this graph booked PENDING until
// git-agent#4 named algebra.md — same law, upgrade path = a MicroMoth-quilt
// PR naming SuperInstance/micrograd-quilt in-repo (discovery now watches
// that stream). MicroMoth-quilt and micrograd-quilt become the fourth and
// fifth repos born after seeding; the lab is the producer, the ledger the
// seal, and the graph records both directions honestly.
//
// Each edge carries its kill switch: falsification_condition — the observed
// evidence string that would refute the claim (probe() books the death as a
// REFUSED row; the scar stays in the graph).

export const SEED = {
  name: 'referral-graph-v1',
  repos: ['quilt-tools', 'quilt-show', 'quilt-arcade', 'git-agent', 'AI-Writings'],
  repos: ['quilt-tools', 'quilt-show', 'quilt-arcade', 'quilt-quant', 'pong-quilt', 'jev-quilt', 'quilt-cowboy', 'fleet-murmur', 'moth-waveform', 'quality-gate-stream', 'quilt-stone', 'MicroMoth-quilt', 'micrograd-quilt', 'quilt-ewitness', 'delta-shape', 'backward-holdem', 'quilt-overhead', 'quilt-in-git', 'quilt-adjudication'],

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
    { id: 'jq-substance-noul', repo: 'jev-quilt', kind: 'lab',
      summary: 'the substance noul + 0.6 admit threshold (JevLens mean >= 0.6 reads VERIFIABLE) — the fleet\'s live judgment on generated text' },
    { id: 'qb-jev-gate', repo: 'quilt-cowboy', kind: 'gate-integration',
      summary: 'v3 output gate: the length-only admission proxy (synthesis_len >= 300) replaced by jev-quilt\'s substance noul, meter mode default + COWBOY_JEV_ENFORCE hard-hold' },
    { id: 'pq-session-wal', repo: 'pong-quilt', kind: 'experiment',
      summary: 'R26 session-WAL lane: receipt-panel rows re-anchored into the fleet five-opcode quilt WAL (tools/wal-session.js / wal-export.js), R24 canonical-md5 lineage doctrine, doctor-verdict lens on the QA-REFUSAL seam' },
    { id: 'fm-honesty-receipts', repo: 'fleet-murmur', kind: 'integration',
      summary: 'honesty-receipts pass: transport-honesty contract (black-hole transport must not score 100%), fnv1a hash-chained MurmurLedger receipt substrate, VERIFIED_CLAIMS-style claims registry' },
    { id: 'mw-floor-gate', repo: 'moth-waveform', kind: 'lab',
      summary: 'duck-sensitivity receipts: the no-op health gate measures the floor in-run because a gate without a live floor measurement passes vacuously (the fleet-murmur scar); every threshold names its calibration' },
    { id: 'qgs-strict-gate', repo: 'quality-gate-stream', kind: 'gate-integration',
      summary: 'review-honesty scoring gate: strict mode, routing + rolling windows, installable package — rumors/payloads below threshold are REFUSED with a named reason, never silently scored' },
    { id: 'fm-qgs-adapter', repo: 'fleet-murmur', kind: 'integration',
      summary: 'quality_gate_adapter: fleet-murmur\'s mill gate routed through the REAL quality-gate-stream package (CustomCheck/evaluate API, closed-by-default, absence returns None never faked), pinned by 4 live package-run pins + weight-law citation naming SuperInstance/quality-gate-stream' },
    { id: 'fm-refusal-ledger', repo: 'fleet-murmur', kind: 'integration',
      summary: 'the IETF refusal-events ledger lane: docs/ietf-kamimura-refusal-events-ledger.md audits pong-quilt main\'s named refusal-events corpus against draft-kamimura-scitt-refusal-events-03 (abstract sha-pinned; source re-verified still -03 on datatracker 2026-10-01), FAIL-first corpus pin via tests/test_refusal_events_ledger.py (fleet-murmur#8, merged 2026-09-30T19:31:12Z)' },
    { id: 'ft-resolver', repo: 'fleet-triage', kind: 'instrument',
      summary: 'the 3-stage doc citation resolver (index → scan → audit) and its scoped quilt-family census run 2026-10-02: 244 repos (226 quilt- prefixed), 243 shallow-indexed (15,880 files), 5,852 docs / 7,790 citation sites scanned in 162s; audit subcommand independently re-verified 513 findings by filesystem scan (hard outcomes FILE_MISSING/REPO_UNKNOWN/REPO_MISMATCH/LINE_OOR/numeric at 0.0% false-positive; PATH_PRECISE_ONLY 49.2% FP → advisory-only) — digest docs/QUILT-FAMILY-TRIAGE-2026-10-02.md (fleet-triage#2, merged 2026-10-01T20:07:41Z)' },
    { id: 'qc-fm-surface', repo: 'quilt-research-canons', kind: 'integration',
      summary: 'the canon cluster\'s 222 FILE_MISSING doc citations — the quilt family\'s largest single doc→file drift surface; the merged referral doc adopts the resolver as a consume-don\'t-rival scan gate over projects/research/sprints with honest boundary notes (shallow-HEAD index; PATH_PRECISE_ONLY advisory-only) (quilt-research-canons#5, merged 2026-10-01T20:07:58Z)' },
    { id: 'qt-lineoor-surface', repo: 'quilt-tournament', kind: 'integration',
      summary: 'ALL 25 LINE_OOR citations in the entire 244-repo quilt family live here (referee/ docs, line-past-EOF vs quilt-canvas-tui core.c, quilt-verilog quf.rs, quilt-fleet-tools seal.py) — one sweep fixes the family\'s entire line-past-EOF class (quilt-tournament#1, merged 2026-10-01T20:07:46Z)' },
    { id: 'qig-wave4-query', repo: 'quilt-in-git', kind: 'instrument',
      summary: 'the wave4-query verifiable-coverage query layer: .quilt/bin/quilt-query CLI (divergence / trusted-but-unaudited / attest) + the LEDGER.md doubt grammar (stopped / covered_by / revisit / status) — "Discharge requires a reason" (quilt-in-git#9, merged 2026-10-02T02:38:47Z, merge 43f10b2b77c67809e7afe865179b6e9c7dbf4081)' },
    { id: 'qad-dispute-query', repo: 'quilt-adjudication', kind: 'integration',
      summary: 'the adjudication query layer: a fork of quilt-in-git @ 6a1ae48 that records what merges usually erase (disputes) and consumes the wave-4 query verbs as its pre-merge instrument — consume-don\'t-rival (quilt-adjudication#1, merged 2026-10-02T04:57:51Z, merge 281330985e55bcf60a9b9a7f5f2eae2ebd465b56)' },
    { id: 'jq-commons-g11', repo: 'jev-quilt', kind: 'commons',
      summary: 'the G11 trust-weighted commons: jev_quilt/commons.py trust_weighted() / provenance_merge() — cross-fleet gluing re-scaled by earned per-source trust, default 0 for unseen sources (jev-quilt#37, merged 2026-09-27T00:06:03Z)' },
    { id: 'qt-trust-lever', repo: 'quilt-tools', kind: 'experiment',
      summary: 'the G11 trust lever on the referral view: viewTrusted({trust, default:0}) re-scales each edge by its target repo\'s earned trust — the blind summed-weight view is buyable, trust is the lever (quilt-tools#17, merged 2026-09-27T01:27:12Z)' },
    { id: 'pq-stone-v1-export', repo: 'pong-quilt', kind: 'experiment',
      summary: 'R36 wal-export stone-v1 lane: tools/wal-export.js toStoneV1() re-anchors the live receipt-panel WAL into quilt-stone\'s forward format (stone.header + hash-chained rows, tool=pong-quilt named) — first forward-format adopter (pong-quilt#46, merged 2026-09-27)' },
    { id: 'stone-forward-adopt', repo: 'quilt-stone', kind: 'integration',
      summary: 'the canonical receipt-chain verifier adopts pong-quilt R36 as first stone-v1 forward-format adopter: smoke section 12b pins the exporter\'s REAL output (verify/tamper/splice) + README Forward-format adopters record (quilt-stone#1, merged 2026-09-27T04:20:06Z)' },
    { id: 'stone-sign-lane', repo: 'quilt-stone', kind: 'lab',
      summary: 'the stone-v2 sign lane: signTip/verifyTipSignature ed25519 tip staples — signed msg = "stone-v2"||tip_row_hash, stored tip binds the signature to the exact chain, post-sign body edit re-seals hashes green but the signature still refuses (the laundering pin) (quilt-stone#4, merged 2026-09-27T09:02:01Z)' },
    { id: 'pq-sign-pilot', repo: 'pong-quilt', kind: 'experiment',
      summary: 'R39 STONE-V2-PILOTS first sign pilot: the prerun producer staples the R37 birth-seal chain\'s tip via the named quilt-stone checkout\'s signTip — signs a COPY (unsigned stone-v1.json stays canonical), verifyTipSignature BEFORE write, refused staple bricks the run, ships closed with a labeled skip (pong-quilt#51, merged 2026-09-27T09:03:15Z)' },
    { id: 'pq-named-refusals', repo: 'pong-quilt', kind: 'experiment',
      summary: 'the named refusal-events corpus on pong-quilt main: QA-REFUSAL (R12), byo-qpam-fallback (R16), WAL-EXPORT/REFUSED + WAL-EXPORT/EMPTY (R30), SEAL/REFUSED, and at R67 SAVE/COEV-EMPTY + LOAD/COEV-MALFORMED (SAVE/COEV-UNSTABLE R64 supersession lineage kept in claim prose) — every refusal names its kind and reason, zero prompt content' },
    { id: 'aw-jev-kat', repo: 'AI-Writings', kind: 'instrument',
      summary: 'AI-Writings#70 labs/jev-kat/jev_kat.mjs — the JEV known-answer control instrument: canonical KAT cases characterising the fleet oracle before its judgment gates anything (merged 2026-09-29T21:26:53Z)' },
    { id: 'jq-kat-bridge', repo: 'jev-quilt', kind: 'integration',
      summary: 'jev-quilt#47 tools/jev_kat_bridge.mjs — bridge fetching the canonical AI-Writings KAT instrument at pinned commit 3f8405888 (sha256 5f280b8b…e1cc5 verified pre-exec), receipting the live characterisation under jev_sessions/, offline gate exit 0/2/3 (MERGED as SuperInstance/jev-quilt#47 2026-09-30T00:18:30Z, merge 4591258994)' },
    { id: 'mm-sealed-receipts', repo: 'MicroMoth-quilt', kind: 'lab',
      summary: 'the sealed receipt lineage on the MicroMoth import substrate: fnv1a-64 import-baseline manifest + per-receipt sha256 byte-match tables (manifest mismatch voids the seal), runner sealed as the exact bytes executed, FAIL-first pins per receipt (exp016 fba4ec7 #22 / exp017 #23 / exp018 664506a5 #24, all merged 2026-09-29)' },
    { id: 'mgq-qcells-lab', repo: 'micrograd-quilt', kind: 'lab',
      summary: 'the qcells local lab (labs/qcells): novel experimentation on the MicroMoth substrate, exp018-036 lineage with per-exp sealed results + telemetry + FINDINGS.md, receipts pushed for sealing into MicroMoth-quilt (micrograd-quilt#7 merged 2026-09-30T04:49:20Z)' },
    { id: 'qe-eproc-witness', repo: 'quilt-ewitness', kind: 'lab',
      summary: 'the e-process witness substrate (src/eproc.mjs): anytime-valid e-processes for "it learned" training claims — Ville bound 1/delta, sigma REQUIRED pre-registered (the tool refuses to run without it), evidence that fires and then decays RETRACTS (repo born 2026-09-30; lineage SuperInstance/witness-validation design + cellgraph E=2.996 forecast witnessing; receipted deviation: built from the standard Waudby-Smith-Ramdas-style construction without reading that code)' },
    { id: 'ds-esign-drift', repo: 'delta-shape', kind: 'integration',
      summary: 'the esign drift-significance layer (delta-shape#1 MERGED 2026-09-30T19:31:08Z, merge 57c07426): witnessDrift() sha256-checks the vendored quilt-ewitness instrument before trusting it, then joins the e-verdict with the change_points/shape_hash of the shape layer; E1-E5 pins seeded-LCG deterministic (V-shape WITNESSED then RETRACTED — the capability zeroTail/flatTail/extinct structurally lack); the pinned "Shape != significance" limit is DRAWN -> SHIPPED' },
    // 2026-10-02 (pm): the dance-of-growth wiring pair — two repos born TODAY
    // enter the sheet as a producer->consumer dialect edge, both pinned at
    // both ends before booking (wal2feed W1-W9 RED->GREEN producer pins;
    // pin_snapshot RED->GREEN consumer pin; wal_ref 0809402a13c37d70 verified
    // identical across the seam).
    { id: 'bh-wal-ticks', repo: 'backward-holdem', kind: 'lab',
      summary: 'the backward-holdem tick-WAL substrate (repo born 2026-10-02): strict type-safe tick schema — the parser rejects unknown kinds, wrong field types, and extra fields — fnv1a-64 hash-chained receipts (the fleet WAL convention, chaining discipline per git-agent quilt_emit), script identity = sha256(file + parameters) so a retuned threshold is a NEW artifact with lineage; the ExoJ game runs fully algorithmic (zero API in the decision path) with adaptation metered per seat through a Budget; sample run seed 20261002 / 120 hands / 1235 ticks / wal_ref 0809402a13c37d70 sealed in-repo (receipts/wal.jsonl); 21 FAIL-first engine pins GREEN' },
    { id: 'qo-feed-v1', repo: 'quilt-overhead', kind: 'integration',
      summary: 'the overhead-board feed.v1 dialect (repo born 2026-10-02): {cells:[{id,name,agent,x,y in [0,1],doc,deltas:[{t,kind,size}]}]} with kind in the five fleet verbs; the simulated scene stays a seed-pinned renderer fixture (honestly tagged SIMULATED), and the first REAL feed — feeds/real-wal-feed.json generated from backward-holdem receipts/wal.jsonl by tools/wal2feed.py — is pinned by tools/pin_snapshot.py (RED on empty feeds/, GREEN on the real snapshot: contract + wal_ref + REAL tag + named source)' },
    // 2026-10-02 (18:56 pulse): the git-native witness stream enters the
    // sheet. quilt-in-git#11 (MERGED 2026-10-02T08:50:52Z, merge 0d2c0f9)
    // ships tools/notes2feed.py — refs/notes/quilt/receipts -> feed.v1,
    // wal_ref := "notes:<chain-head>" — citing the quilt-overhead feed.v1
    // dialect BY NAME in tool + doc, with 11 FAIL-first pins (N0 refuses a
    // fresh clone, never fakes an empty feed) and the missing push wire
    // documented, not faked.
    { id: 'qig-notes2feed', repo: 'quilt-in-git', kind: 'witness-stream',
      summary: 'the git-native witness stream (quilt-in-git#11 MERGED 2026-10-02T08:50:52Z, merge 0d2c0f9): the w3a post-commit hook attaches every tick receipt to its commit as a git note (refs/notes/quilt/receipts), so receipts ride fetch/push/clone with the branch while .quilt/receipts/ files never leave the working tree; tools/notes2feed.py reads the notes ref and emits the quilt-overhead feed.v1 dialect ({cells,meta}; lattice coords; kind in the five fleet verbs) with wal_ref = notes:<chain-head> as stream identity; 11 FAIL-first pins (N0 fresh-clone refusal named, never a fake-empty feed); the missing push wire (notes never auto-fetch/push) documented in docs/NOTES2FEED.md, not faked' },
    // 2026-10-03 (01:37 pulse): the Casey 15:42–15:52Z merge sweep earns two
    // edges. doubt-ledger + tidepool enter the sheet; pong-quilt earns its
    // FOURTH outgoing edge (the Janus hedge names the franken-save guard).
    { id: 'pq-franken-guard', repo: 'pong-quilt', kind: 'experiment',
      summary: "the franken-save guard lineage (pong-quilt#99 MERGED 2026-10-02T15:43:23Z): the v1 draw-ledger append-discipline round names the save guard as a pure function of state+receipts — pong-quilt's gloss for 'gate = pure function of the receipt log'; cited BY NAME at row 2 of doubt-ledger's JANUS-EVIDENCE-BEFORE-EFFECT.md (docs/, doubt-ledger#9 MERGED 2026-10-02T15:51:57Z into poc) with the PR #99 lineage named in-repo" },
    { id: 'dl-janus-evidence', repo: 'doubt-ledger', kind: 'integration',
      summary: "the Janus evidence-before-effect hedge (doubt-ledger#9 MERGED 2026-10-02T15:51:57Z into base branch poc): docs/JANUS-EVIDENCE-BEFORE-EFFECT.md books arXiv 2609.38266's vocabulary cite/differentiate-style — six CLAIM-THEIRS/OURS rows, ADOPT 'gate = pure function of the receipt log' naming pong-quilt#99's franken-save guard BY NAME, honest limits adopted (understated declarations, five open substitution routes), kill switch: corrections append, never silent edit" },
    { id: 'dl-selective-disclosure', repo: 'doubt-ledger', kind: 'experiment',
      summary: 'the wave-2 selective-disclosure export + Ed25519 root signing (doubt-ledger#3 MERGED 2026-10-02T02:39:02Z into poc; #2 01:50:54Z; the 01:49–02:39Z Casey sweep #1–#3): filtered slice to standalone JSONL, header binds the live tip, checksums recomputed, verify_export names the exact tampered line; honest limit 5 pinned in-repo: export proves integrity OF THE INCLUDED, never completeness — no capability tokens, the moat-shaped gap named not faked' },
    { id: 'td-pam-hedge', repo: 'tidepool', kind: 'integration',
      summary: "the PAM vocabulary hedge (tidepool#12 MERGED 2026-10-02T15:42:43Z): docs/PAM-HEDGE.md books arXiv 2605.11032's provenance vocabulary before it gets owned — CLAIM-THEIRS/OURS rows for Merkle-DAG provenance, Ed25519 root signing, capability tokens/selective disclosure, each with doubt-ledger's shipped-and-receipted answers named BY NAME (wave-2 export, #1–#3 sweep receipts dated in-doc), ADOPT-WITH-GAP-NAMED where the honest limit is real" },
    // 2026-10-04 (05:56 pulse): the TWENTY-EIGHTH edge — a cross-language
    // twin transfer. slackwater-lattice (the Python twin, PyPI 0.1.0)
    // ships the hex-distance property suite; slackwater-rust#1 translates
    // it into lattice-core's iff-consistency audit, citing the source repo
    // AND its commit by name at 4 anchored sites on the merged tree. Both
    // repos PR-culture; never self-upgraded — the merge did the earning.
    { id: 'sw-lattice-hexlaw', repo: 'slackwater-lattice', kind: 'lab',
      summary: 'the hex-distance property suite on the Python twin (slackwater-lattice#1 MERGED 2026-10-02T18:05:53Z): P6 triangle inequality + P7 ring law + iff-probe receipt — the sign-split hex_distance formula characterized against the workspace\'s NEIGHBOR_DIRECTIONS units of Z[omega], with the published-wheel convention trap named (the PyPI 0.1.0 wheel ships the textbook axial formula, correct only for the OTHER axial neighbor set)' },
    { id: 'swr-iff-consistency', repo: 'slackwater-rust', kind: 'integration',
      summary: 'the iff-consistency audit on the Rust twin (slackwater-rust#1 MERGED 2026-10-02T21:38:19Z, merge 3b077cfe): crates/lattice-core/tests/iff_consistency.rs translates the Python twin\'s hex_distance <-> neighbors property suite, pinning the published-formula witness against slackwater-lattice commit 5bff9a3 — the crates.io/PyPI twin convention-trap audit (fleet task 69-c), verdict trap ABSENT on this workspace\'s sign-split formula' },
    // 2026-10-04 (06:56 pulse): the TWENTY-NINTH edge — the ExoJ →
    // quilt-pincher field transfer, booked PENDING. quilt-pincher#15 (FB1
    // binding layer, MERGED 2026-10-03, merge aee6f938) consumes the ExoJ
    // field model (γ/η/Δ amplitudes, Σ=γ+η≤1 conservation, observe() as
    // sole local collapse) as an HDC hypervector seam: field-conditioned
    // pinch amplitudes bound Σ so pinching never exceeds conservation. But
    // the weight law reads the TO repo\'s citation: pincher names only
    // "fleet-seeds lode 2026-10-03 (§4)" and "ExoJ canon exoj/" — no
    // repo-name citation, no 40-char SHA, no exoj#N. Worse, the lode\'s
    // derivative adds a FOURTH amplitude ι (iota) absent from the exoj
    // charter (γ, η, Δ + identity-fragment sets; Σ=γ+η≤1): the to-repo
    // consumes a fleet-seeds derivative, not the exoj repo canon. PENDING
    // per the git-agent#1 / edge-ga precedent; upgrade path recorded in
    // the claim — a quilt-pincher follow-up naming SuperInstance/exoj AND
    // a commit earns VERIFIED, like slackwater-rust#1 did for the twins.
    { id: 'exoj-field-model', repo: 'exoj', kind: 'lab',
      summary: 'the ExoJ parallel field (charter in repo first commit, category-theoretic investigation of the inverted field: **Field** = CSPersist re-indexed, observers as functors Field→Set, deformations as natural transformations Id⇒Id with soft convex updates, the first-person causal sequence as a right Kan extension): cells carry γ/η/Δ amplitudes with the global conservation inequality γ̄+η̄≤1; observe() is the sole local collapse; the fleet survey 2026-10-04 (memory/study/exoj-survey-2026-10-04.md) sealed the γ/η/Δ/ι-derivative risk — ι is NOT in the exoj charter canon' },
    { id: 'qp-exoj-hdc-seam', repo: 'quilt-pincher', kind: 'integration',
      summary: 'the FB1 ExoJ binding layer — HDC hypervector algebra + field-conditioned pinch seam (SuperInstance/quilt-pincher#15 MERGED 2026-10-03, merge aee6f93856dac10238ee7da2d34764e9d1487504): src/hdc/exoj-field.ts adapts the field amplitudes into hypervector binding, amplitude Σ bound preserved across pinch; the seam cites "fleet-seeds lode 2026-10-03 (§4)" + "ExoJ canon exoj/" at receipt sites (engine.ts, hdc-embedder.ts, hypervector.ts, index.ts, test/hdc.test.ts) but NEVER the SuperInstance/exoj repo by name, no 40-char SHA, no exoj#N — and the lode\'s ι (iota) fourth amplitude is a derivative the exoj charter does not carry' },
    { id: 'qmr-chain-dialect', repo: 'quilt-mcp-receipts', kind: 'witness-stream',
      summary: 'the fleet\'s qmr1 receipt-chain dialect (repo born 2026-10-02T02:27Z; DESIGN.md + README.md land in commit 889960a932b8c98ff17f14f8877d332c851ab11c — the qmr1 spec: id = sha256("qmr1:" + seq + ":" + prev + ":" + canonicalJSON(payload)), genesis prev = 64×"0", one dialect across the fleet so any ledger can be read by any reader; threat model + the v2 path in the same commit)' },
    { id: 'w69-sticky-receipts', repo: 'wave69', kind: 'integration',
      summary: 'wave69\'s sticky-receipts cell (cells/sticky_receipts.mjs on main @ 5258586088, repo born 2026-10-04T00:19Z during the key-rotation regime): scars survive rewind, chain ids in the fleet qmr1 dialect — the module header names the dialect\'s canonical home BY NAME at a pinned 40-char commit: "CHAIN DIALECT: deliberately the fleet\'s qmr1 (quilt-mcp-receipts @ 889960a9)" — verified live 2026-10-04 against SuperInstance/quilt-mcp-receipts (commit 889960a932b8 exists, message "DESIGN.md + README.md: qmr1 spec, threat model, and the v2 path")' },
    // 2026-10-05 (01:56 pulse): gpu-lab's receipt-doctrine provenance enters
    // the sheet — the README Doctrine-provenance block at quilt-gpu-lab#2's
    // merge names SuperInstance/AI-Writings (algebra.md) AND
    // SuperInstance/git-agent (quilt_emit) BY NAME, and declares the
    // aw-quint-opcode→gl-ledgers referral edge minted VERIFIED by that
    // citation, per the fleet weight law.
    { id: 'gl-ledgers', repo: 'quilt-gpu-lab', kind: 'lab',
      summary: 'the gpu-lab receipt doctrine over the elephant-vision ledger pair (quilt-gpu-lab#2 MERGED 2026-09-28T03:58:14Z, merge 8b1b44144f5363f6afcec8db37451d2b3c23ba67, branch receipt-doctrine-provenance): README.md\'s Doctrine-provenance block names the canonical source of the five-opcode quilt WAL — SuperInstance/AI-Writings (algebra.md) — and its canonical producer SuperInstance/git-agent (quilt_emit, landed in git-agent#1), with the lab\'s manifest the same doctrine over RESULTS/QUEUE plus experiment code (BIND every artifact to its digest, re-derive to verify; verdicts KEEP/KILL/INCONCLUSIVE/ABORTED all kept); tests/test_receipts.py + tools/receipt_manifest.py carry the receipt-side pins; the README itself declares the referral edge `aw-quint-opcode` → `gl-ledgers` "minted VERIFIED by this citation, per the fleet weight law" — gpu-lab\'s first currency, booked here at VERIFIED=1.0' },
  ],

  edges: [
    {
      from: 'qe-eproc-witness', to: 'ds-esign-drift',
      claim: 'A fleet witness instrument consumed by pin-and-digest is doctrine landing in the consumer repo: quilt-ewitness (created 2026-09-30T09:25Z) ships src/eproc.mjs — anytime-valid e-process witnesses for training claims, Ville bound 1/delta, sigma pre-registered under refusal, retraction built in — and SuperInstance/delta-shape#1 ("Drift significance layer (E1-E5): e-witness bridge consuming SuperInstance/quilt-ewitness", MERGED 2026-09-30T19:31:08Z, merge commit 57c07426) names SuperInstance/quilt-ewitness in-repo at anchored sites on merged main: vendor/quilt-ewitness/eproc.mjs pinned BY BYTES (@ 61b9e04, sha256 aad90ac5aedb4d8e19b189808b47b22fc7258044af2c25c8f7fc90efec19e63a, provenance in vendor/quilt-ewitness/SOURCE.txt — the fleet vendored-dist pattern), src/esign.mjs witnessDrift() sha256-checks the vendored instrument BEFORE trusting it (the hash IS the identity; mismatched bytes refuse to witness), and the owning repo is named in README ("Shape != significance — now answered by the e-witness bridge", consuming from SuperInstance/quilt-ewitness as a sha256-pinned vendored instrument). HONEST HISTORY: this edge was booked PENDING twice before the merge outran the booking — 23:56 9/30 on branch edge14-pending-delta-shape (commit 7ddd151, lost in a /tmp wipe before push), rebuilt 02:41 as quilt-tools#31 (merge 812a644), whose commit was later reset off main — so this commit books the edge at its earned weight in one step, with the merge itself as the receipt (the aw-jev-kat precedent: booked PENDING on an open PR, flipped by the merge, never self-upgraded). delta-shape is the SIXTH to-node born after seeding (fleet-murmur, moth-waveform, quilt-stone, micrograd-quilt, MicroMoth-quilt, delta-shape); quilt-ewitness enters as a from-node (from-node-only repos earn no view mass).',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/delta-shape#1', // the merged PR in the to-node's repo whose vendored-bytes citation IS the claim's subject
      receipt: 'SuperInstance/delta-shape#1',
      falsification_condition: 'delta-shape main dropping the SuperInstance/quilt-ewitness citation from src/esign.mjs / vendor/quilt-ewitness/SOURCE.txt / README, or witnessDrift() executing vendored bytes whose sha256 does not match the pinned digest aad90ac5...',
    },
    {
      from: 'stone-sign-lane', to: 'pq-sign-pilot',
      claim: 'quilt-stone\'s stone-v2 sign lane gives a receipt chain a producer-identity staple — but a signature primitive nobody staples with is a library, not a doctrine. CURRENCY EARNED 2026-09-27: pong-quilt PR #51 ("R39: STONE-V2-PILOTS first sign pilot — producer staples the birth-seal chain\'s tip", MERGED 2026-09-27T09:03:15Z, merge 07384ac2) lands the first real adoption IN THE PRODUCER\'s repo: tools/prerun.js staples the R37 birth-seal chain\'s tip through the named quilt-stone checkout\'s signTip/verifyTipSignature (signs a COPY — the unsigned stone-v1.json stays canonical; verifyTipSignature with the producer public key runs BEFORE write; a refused staple bricks the run exit 1; the seam ships closed with a labeled skip when the checkout has no signTip — never silent), citing SuperInstance/quilt-stone BY NAME in-repo at three anchored sites: PLAYLOG Round 39 ("the stone-v2 sign lane, SuperInstance/quilt-stone PR #4, STONE-SPEC.md §4.6.2"), the citation pin in tests/stone-sign-glue.test.js, and core.js VERIFIED_CLAIMS \'stone-sign-pilot\'. The 4 glue pins ran LIVE against the sign-lane tip 047be72 before merge: seal links 5 + staple ok + the post-sign FORGED-edit laundering refusal ("signed tip does not match the chain tip") + wrong-key refusal. HONESTY ON DIRECTION: the 14:56/16:04 pulse notes guessed pong-quilt→quilt-stone; the substrate\'s receipt-repo rule (edge #5 precedent) books stone-sign-lane -> pq-sign-pilot — the merge in the citing repo earns currency FOR the cited technique flowing INTO that repo. quilt-stone\'s FIRST outgoing edge (it received edge #9 five hours earlier); pong-quilt joins fleet-murmur as the second double-inbound-mass repo — the sign lane lands in the same repo that already breaks ties by quantum coin. Pre-booked twice, earned by Casey\'s merge burst, never self-upgraded.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/quilt-stone#4', // the sign-lane merge (023edbed) whose signTip/verifyTipSignature the pilot staples with
      receipt: 'SuperInstance/pong-quilt#51',
      falsification_condition: 'a pong-quilt prerun run against a quilt-stone checkout shipping signTip where the staple file is written without verifyTipSignature passing first, or the post-sign FORGED-edit laundering case verifies green, or the SuperInstance/quilt-stone citation removed from PLAYLOG Round 39 / tests/stone-sign-glue.test.js / core.js VERIFIED_CLAIMS',
    },
    {
      from: 'pq-stone-v1-export', to: 'stone-forward-adopt',
      claim: 'pong-quilt\'s R36 wal-export lane produces real stone-v1 forward-format chains from the live receipt panel — but an export format nobody verifies through is a dialect, not a standard. CURRENCY EARNED 2026-09-27: quilt-stone PR #1 ("smoke 12b: pong-quilt R36 is the first stone-v1 forward-format adopter", MERGED 2026-09-27T04:20:06Z, merge 093c1b1) lands the adoption IN THE VERIFIER\'s repo: smoke section 12b pins five checks over the exporter\'s EXACT bytes (generated live from tools/wal-export.js toStoneV1() at PR #46\'s merge tip, not retyped) — alg=stone-v1/genesis canonical/links=5, the mandatory stone.header row carries tool=pong-quilt (producer named, not laundered), a post-seal edit is caught as hash_mismatch, a row splice breaks continuity — and README.md\'s Forward-format adopters section names SuperInstance/pong-quilt PR #46 BY NAME. Weight law met in the to-node\'s repo. Third to-node born after seeding (fleet-murmur, moth-waveform, quilt-stone); pong-quilt\'s SECOND outgoing edge — it both receives currency (pq->fm) and pays it forward into the canonical verifier. Pre-booked at 11:04 ("on merge, referral graph books NINTH VERIFIED edge"), earned by Casey\'s merge, never self-upgraded.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/pong-quilt#46', // the R36 merge whose toStoneV1() output the smoke pins
      receipt: 'SuperInstance/quilt-stone#1',
      falsification_condition: 'a quilt-stone smoke 12b run where the pinned pong-quilt fixture verifies under anything but stone-v1 semantics, or the SuperInstance/pong-quilt citation removed from README.md Forward-format adopters / smoke.mjs section 12b',
    },
    {
      from: 'jq-commons-g11', to: 'qt-trust-lever',
      claim: 'The referral graph\'s blind view sums edge weight per target repo, and weight is cheap to inflate: a source the fleet has not earned to trust can merge N junk-citation PRs into its own repo and buy itself mass — the exact Goodhart surface jev-quilt\'s G11 hardened in the commons the same week. CURRENCY EARNED 2026-09-27: quilt-tools PR #17 (merged 2026-09-27T01:27:12Z, merge d14fb44) ports the G11 trust lever into the graph\'s weight law — viewTrusted({trust, default:0}) re-scales every edge by its TARGET repo\'s EARNED trust (effective = trust·weight; an unseen source defaults to 0 and contributes NOTHING until the fleet earns reason to trust it; trust 1 everywhere reduces exactly to the blind view) — citing SuperInstance/jev-quilt commons.py trust_weighted() / provenance_merge() BY NAME in-repo (src/referral_graph.mjs comment + experiments/REFERRAL_GRAPH.md), the same honesty pattern as the moth-waveform code-level scar. This was the 08:11 pulse\'s synergy candidate, shipped exactly as flagged; Pin 11 pins the fixture semantics (blind view BUYABLE at >90% junk mass; unseen junk → 0; trust is the lever) and the citation string. First edge where the graph\'s own repo is the TO-node of a commons-lane technique; pre-hardens the currency against the weight-inflation attack the R8 Goodhart lane red-teams.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/jev-quilt#37', // the G11 merge that landed trust_weighted()/provenance_merge() on jev-quilt main
      receipt: 'SuperInstance/quilt-tools#17',
      falsification_condition: 'the referral view mass computed from summed edge weights with no earned-trust term while junk-citation PRs remain mergeable into a self-controlled repo, or the SuperInstance/jev-quilt commons.py citation removed from src/referral_graph.mjs / REFERRAL_GRAPH.md',
    },
    {
      from: 'qgs-strict-gate', to: 'fm-qgs-adapter',
      claim: 'Two sibling repos built the two halves of the review-honesty doctrine on the same day — fleet-murmur#2 shipped a quality-gate seam, quality-gate-stream#2 shipped strict-mode scoring — and an unadaptered dialect drift between them would silently corrupt every rumor score crossing the seam. CURRENCY EARNED 2026-09-26: fleet-murmur PR #3 (merged 2026-09-26T23:08:45Z, merge 8df75c6) lands tools/quality_gate_adapter.py rewritten against the LIVE quality-gate-stream API (the pre-merge adapter raised TypeError/AttributeError against the real package — stale-API broken at birth, the fix shipped in the same PR that named the source), citing SuperInstance/quality-gate-stream BY NAME in-repo at three anchored sites: the adapter module docstring, VERIFIED_CLAIMS.md VC10, and tests/test_qgs_adapter_glue.py (4 live pins run the real package, labeled skips when uninstalled, never fake green; an always-on pin asserts the citation string survives in source). Direction honesty: the merge is in fleet-murmur, so per the substrate receipt-repo rule the edge books qgs-strict-gate -> fm-qgs-adapter — currency flows INTO the citing repo, exactly the direction pre-booked when the lane opened. fleet-murmur is the first repo carrying two VERIFIED inbound edges; the exporter-in-consumer / live-verify-in-producer shape mirrors the R26 wal-export -> quilt-doctor seam.',
      weight: 'VERIFIED',
      provenance: null, // the technique lives on quality-gate-stream main (strict-mode gate, installable package); the receipt is the fleet-murmur merge
      receipt: 'SuperInstance/fleet-murmur#3',
      falsification_condition: 'the fleet-murmur adapter scoring a rumor through a hand-rolled reimplementation while quality-gate-stream is installed, or the SuperInstance/quality-gate-stream citation removed from the adapter source / VC10 / the glue pins',
    },
    {
      from: 'fm-honesty-receipts', to: 'mw-floor-gate',
      claim: 'fleet-murmur\'s transport-honesty contract is a scar other instruments must carry: a black-hole transport scored 100% coverage until the honesty REFUSAL receipt named it. moth-waveform\'s no-op health gate exists for exactly that reason. CURRENCY EARNED 2026-09-26: moth-waveform PR #1 (merged 2026-09-26T21:06:24Z, merge dc1a142) cites the scar BY NAME in-repo at code level — sensitivity.py: "a gate that passes without a live floor measurement passes vacuously (fleet-murmur scar)" — plus the README Receipts-doctrine section naming fleet-murmur (transport modes) among the doctrine lineage (pong-quilt honesty pins, hermit quilt-WAL, quilt-doctor moth-ledger trial balance, quality-gate-stream REFUSAL receipts). Load-bearing citation is the code-level scar; the README list is lineage, not technique. Second to-node born after the graph was seeded.',
      weight: 'VERIFIED',
      provenance: null, // the scar lives on fleet-murmur main (CROSS-POLLINATE.md transport-honesty contract); the receipt is the moth-waveform merge
      receipt: 'SuperInstance/moth-waveform#1',
      falsification_condition: 'a moth-waveform sensitivity receipt whose no-op health gate passed without a live floor measurement (noop row absent from the receipt) or the fleet-murmur scar citation removed from sensitivity.py',
    },
    {
      from: 'pq-session-wal', to: 'fm-honesty-receipts',
      claim: 'pong-quilt\'s receipt lineage — QA-REFUSAL honesty pins (a claim must name how it knows), the session-WAL exporter re-anchoring the live receipt panel into the fleet five-opcode quilt WAL, and the VERIFIED_CLAIMS + readme-count registry pinned two-way against the live suite — is exactly the contract a gossip mesh needs before it scores delivery coverage. CURRENCY EARNED 2026-09-26: fleet-murmur PR #2 (merged 2026-09-26T19:08:16Z, merge 5391ba56) cites SuperInstance/pong-quilt BY NAME in-repo, three times in CROSS-POLLINATE.md: the QA-REFUSAL seam (R23-R28 honesty pins) as the transport-honesty contract, tools/wal-session.js\'s session WAL as the receipt-ledger substrate (\"one verifier reads every fleet ledger\"), and the VERIFIED_CLAIMS + readme-count pin as the claims-registry shape. First edge whose to-node is a repo born after the graph was seeded; first outward currency from pong-quilt.',
      weight: 'VERIFIED',
      provenance: null, // the techniques live on pong-quilt main (tools/wal-session.js, core.js VERIFIED_CLAIMS); the receipt is the fleet-murmur merge
      receipt: 'SuperInstance/fleet-murmur#2',
      falsification_condition: 'a murmur gossip round scored 100% delivery coverage with a black-hole transport and no honesty REFUSAL receipt, or the pong-quilt citations removed from CROSS-POLLINATE.md',
    },
    {
      from: 'jq-substance-noul', to: 'qb-jev-gate',
      claim: 'quilt-cowboy\'s admission proxy was length alone — 1,745 generated papers entered the canon on synthesis_len >= 300 and nothing else (RD_QUILT_3_0 admits the length-as-concreteness proxy is a stand-in). CURRENCY EARNED 2026-09-26: quilt-cowboy PR #1 (merged 2026-09-26T09:12:37Z, merge a3feccca) wires jev-quilt\'s substance noul + 0.6 admit threshold onto the v3 output gate, citing SuperInstance/jev-quilt BY NAME in-repo (README.md "The JEV Substance Gate" section + jev_substance_gate.py CITATION const + module docstring), judged through any duck-typed backend exposing available() + decide_batch() — jev_quilt\'s TypeSafeBackend satisfies the protocol directly. First jev-quilt OUTGOING edge: all prior currency flowed show/pong/quant/tools.',
      weight: 'VERIFIED',
      provenance: null, // the doctrine lives on jev-quilt main (substance noul + threshold); the receipt is the to-repo merge
      receipt: 'SuperInstance/quilt-cowboy#1',
      falsification_condition: 'a v3 worklog entry admitted to the canon with jev_substance present below 0.6 and no jev_admitted=False flag, or the CITATION naming SuperInstance/jev-quilt removed from the gate module',
    },
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
      claim: 'S3\'s witnessed pre-outcome states (PENDING/ENTANGLED/COLLAPSED) are the receipt shape a quantum coin plugin needs before its verdict drives game state. THIRTY-SECOND edge VERIFIED 2026-10-05 (05:20 snowball pulse): SuperInstance/quilt-arcade PR #5 ("referral edge: manifests cite quilt-tools S3 witness shape", MERGED 2026-10-02T01:49:49Z, merge 876def1de4865a7497b7fc1dd6cd28fcd7c9a3d7, branch referral-edge-s3-witness) lands the citation IN THE TO-NODE\'S REPO: all six games/*/manifest.json gain referrals[] citing SuperInstance/quilt-tools experiments/s3-quantum-tided-budget.mjs by repo + path + URL (WitnessLog fnv1a-chained rows re-derived from GENESIS, custody booked before the outcome exists — PENDING → ENTANGLED → COLLAPSED on appeal), plus receipts.witness_shape declaring the S3 row shape the chained receipt surface follows, with tools/referral-pins.mjs holding 12 FAIL-first pins (RED on the pre-citation tree, exit 1, GREEN after booking) and module exports mirroring the manifest receipts surface byte-for-byte. The merge outran the booking by 2d04h+ — re-surfaced 2026-10-05 by the discovery audit on the #47 branch (a merged PR in the to-node\'s repo matching the S3 citation hints, still PENDING at scan time). Live-verified on quilt-arcade main tonight: all six manifests carry the citation. The PR self-names the edge qt-s3-witness -> qa-receipts-surface — the seed\'s qt-s3-tide -> qa-plugins under the PR\'s in-repo dialect, same edge. Never self-upgraded: the PR body books itself PENDING and names this quilt-tools REFERRAL_GRAPH mint as the follow-up — the fleet weight law kept (a merged PR in the to-node\'s repo is the only mint path). qt-s3-tide\'s FIRST outgoing edge; quilt-arcade\'s FIRST inbound currency — the arcade leaves the double-PENDING tier (qs-ep3 -> qa-plugins PENDING remains, now its only pending inbound).',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/quilt-tools#4',
      receipt: 'SuperInstance/quilt-arcade#5',
      falsification_condition: 'quilt-arcade main dropping the SuperInstance/quilt-tools (experiments/s3-quantum-tided-budget.mjs) citation or receipts.witness_shape from any games/*/manifest.json, or tools/referral-pins.mjs losing the citation pins while the edge still reports green',
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
      claim: 'AI-Writings/algebra.md defines the five-opcode spine and its laws (BIND idempotent; algebra.md says do not add opcodes); git-agent#1 (MERGED 2026-09-26T00:27:18Z, merge 6bc099a) built quilt_emit.py — vessel events mapped one-to-one to BIND/LINK/EFFECT/VIEW/TICK lines in a hash-chained WAL — on exactly that spine. git-agent#1\'s citation was DOCTRINAL only ("the fleet quilt kernel speaks five opcodes"), the source repo never named — so the edge was booked PENDING with the upgrade path recorded. CURRENCY EARNED 2026-09-26: git-agent PR #4 (merged 2026-09-26T09:11:41Z, merge 8d6c31a) lands the in-repo citation naming AI-Writings/algebra.md by name and URL (docs/GRAND-QUILT.md provenance block, live-verified on git-agent main), exactly the upgrade path booked here.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/git-agent#1',
      receipt: 'SuperInstance/git-agent#4',
      falsification_condition: 'git-agent quilt_emit.py shipping an opcode mapping that contradicts algebra.md semantics (e.g. VIEW given mutation semantics, or a 6th opcode added) with no algebra reference anywhere in the repo',
    },
    {
      from: 'aw-jev-kat', to: 'jq-kat-bridge',
      claim: 'A fleet oracle instrument consumed by pin-and-digest is doctrine landing in the consumer\'s repo: AI-Writings#70 (MERGED 2026-09-29T21:26:53Z) shipped labs/jev-kat/jev_kat.mjs as the canonical KAT instrument, and SuperInstance/jev-quilt#47 (OPEN at booking 2026-09-30 — this pulse\'s commissioned bridge) names SuperInstance/AI-Writings in-repo at anchored sites: the bridge pins the instrument by repo + commit 3f8405888366e3697b3775017fa5fe13d6244226 + sha256 5f280b8b435852872fadeb449f4382275e80be56e80035da02274db8006e1cc5 as an executable constant, tests/test_jev_kat_bridge.py asserts the citation string survives in source (a drifted upstream cannot be bridged silently), and the module docstring records AI-Writings#70 as the instrument\'s canonical home. CURRENCY EARNED 2026-09-30: SuperInstance/jev-quilt PR #47 MERGED 2026-09-30T00:18:30Z (merge 45912589941ce29f02c8a6659bfe2b4e7abfccb9) — the weight law is met: a merged PR in the to-node\'s repo whose MAIN-tree source carries the load-bearing citation (verified by the 09:11 pulse: tools/jev_kat_bridge.mjs on jev-quilt main still pins repo + commit 3f8405888366e3697b3775017fa5fe13d6244226 + sha256 5f280b8b435852872fadeb449f4382275e80be56e80035da02274db8006e1cc5, and tests/test_jev_kat_bridge.py still asserts the citation string survives). The discovery watcher surfaced #47 among the candidates; the load-bearing check was done by hand, not self-upgraded. Precedent arc complete: aw-quint-opcode was booked PENDING on a merged-but-doctrinal citation and earned currency when a merge named the source — here the booking named the source from day one and the merge closed the loop one lifecycle step later.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/jev-quilt#47', // merged 2026-09-30T00:18:30Z — the citing PR IS the finding's home
      receipt: 'SuperInstance/jev-quilt#47',
      falsification_condition: 'jev-quilt#47 merging with the SuperInstance/AI-Writings citation removed from tools/jev_kat_bridge.mjs source or the tests/test_jev_kat_bridge.py citation pin, or the bridge executing an instrument whose sha256 does not match the pinned digest 5f280b8b…e1cc5',
    },
    {
      from: 'mm-sealed-receipts', to: 'mgq-qcells-lab',
      claim: 'A sealed receipt lineage nobody\'s experiment names is a ledger talking to itself: the qcells lab runs ON the MicroMoth substrate and consumes the ledger\'s sealed findings, and its merged work says so. CURRENCY EARNED 2026-09-30: micrograd-quilt PR #7 ("qcells exp020-036: tie-band replication → two-regime desert hazard → triplet-stream rate-lane closure", MERGED 2026-09-30T04:49:20Z, merge 44de605) is a merged PR IN THE TO-NODE\'S REPO whose diff ADDS labs/qcells/FINDINGS.md citing SuperInstance/MicroMoth-quilt BY NAME at four anchored sites — the lab charter header ("Lab for novel experimentation on SuperInstance/MicroMoth-quilt"), the import-baseline manifest pin on MicroMoth-quilt main, the honest-limit gap posted on MicroMoth-quilt#3, and the receipts/ dir lane note — plus docs/synergy-scan-2026-09-30-0711.md consuming MicroMoth-quilt#23/#24\'s MERGED sealed findings to redirect the lab\'s own queue ("the lab\'s follow-on items are now already answered cross-repo; do not re-run"). The from-technique is the ledger those receipts seal into: fnv1a-64 import-baseline manifest + sha256 byte-match receipt tables with per-receipt FAIL-first pins (exp016 sealed receipt commit fba4ec7 via MicroMoth-quilt#22 is the exp019 data_provenance anchor). HONESTY: the 14:38 pulse\'s citation scan reported this repo cited ZERO times by micrograd-quilt main — that scan was a FALSE NEGATIVE; the re-audit that booked this edge found 5+ by-name citations in the merged tree, so no citation PR was opened (one would have been citation spam on a false premise) and the edge is booked directly on Casey\'s merge. Fourth and fifth repos born after seeding enter together; the lab is the producer, the ledger the seal — this edge books the ledger→lab direction, and the mirror (lab→ledger) is booked PENDING in the same hour.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/MicroMoth-quilt#24', // the exp018 seal (664506a5) whose merged finding the in-repo synergy scan consumes to redirect the lab queue
      receipt: 'SuperInstance/micrograd-quilt#7',
      falsification_condition: 'the SuperInstance/MicroMoth-quilt citations removed from labs/qcells/FINDINGS.md or docs/synergy-scan-2026-09-30-0711.md, or a lab experiment consuming a sealed MicroMoth-quilt receipt with no receipt reference anywhere in the consuming artifact',
    },
    {
      from: 'mgq-qcells-lab', to: 'mm-sealed-receipts',
      claim: 'The ledger\'s receipts seal the lab\'s work — and a seal that names its producer only by workspace path is a doctrinal citation, not a currency: it identifies the work, not the repo. MicroMoth-quilt PR #24 ("exp018 receipt: hard-root autopsy — FITNESS DESERT AT THE BIRTH CLOUD", MERGED 2026-09-29T21:25:32Z, merge 664506a5) seals the qcells lab\'s exp018 autopsy and names the producer as "the qcells lab (workspace/labs/qcells)" — a filesystem path, never the repo SuperInstance/micrograd-quilt. That was the git-agent#1 doctrinal-citation shape, booked PENDING for six hours. CURRENCY EARNED 2026-09-30 (17:56 pulse): **MicroMoth-quilt PR #29** ("docs(audit): qcells lab canonical home = SuperInstance/micrograd-quilt — provenance note + citation pin", MERGED 2026-09-30T09:27:01Z) is a merged PR IN THE TO-NODE\'S REPO that adds an AUDIT.md "Qcells lab — canonical home" note naming SuperInstance/micrograd-quilt BY NAME as the lab\'s durable addressable home (labs/qcells tree; sealed lineage exp018–exp022 mirrored as receipt PRs #5–#7; MM↔mgq first lab↔ledger bidirectional pair), with tests/test_lab_home_citation.py pinning the citation in-repo (repo named; local path framed by citation — a drifted citation cannot pass silently). The graph\'s first bidirectional pair now carries VERIFIED mass in BOTH directions — mm→mgq earned by the lab\'s merged FINDINGS (micrograd-quilt#7), the mirror earned by the ledger\'s merged AUDIT note (MicroMoth-quilt#29). Sealed receipts untouched (immutable); the note amends provenance without rewriting history. Never self-upgraded — the merge in the target repo did the earning.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/MicroMoth-quilt#24', // the seal whose producer-citation shape is the claim's whole subject
      receipt: 'SuperInstance/MicroMoth-quilt#29',
falsification_condition: 'a MicroMoth-quilt receipt sealing qcells-lab work that drops the workspace/labs/qcells producer reference entirely (the sealed bytes\' provenance unmoored from any lab identity), or the upgrade PR merging with the SuperInstance/micrograd-quilt citation removed',
    },
    {
      from: 'pq-named-refusals', to: 'fm-refusal-ledger',
      claim: 'pong-quilt\'s refusals are named, receipted, and prompt-content-free (QA-REFUSAL, byo-qpam-fallback, WAL-EXPORT/REFUSED, WAL-EXPORT/EMPTY, SEAL/REFUSED — and at R67 SAVE/COEV-EMPTY + LOAD/COEV-MALFORMED, with the SAVE/COEV-UNSTABLE R64 name surviving in claim prose as supersession lineage) — exactly the worked named-corpus substrate draft-kamimura-scitt-refusal-events-03\'s refusal-claim audit needs a real deployment to be read against. CURRENCY EARNED 2026-09-30: fleet-murmur PR #8 ("Refusal-events ledger: draft-kamimura-scitt-refusal-events-03 × pong-quilt named refusals", MERGED 2026-09-30T19:31:12Z, merge b21a4a46) is a merged PR IN THE TO-NODE\'S REPO citing SuperInstance/pong-quilt BY NAME at an anchored, pinned site: the ledger doc\'s PQ_PIN repo constant plus a corpus table pinned to pong-quilt main merge 52b42b4 — six named refusal kinds present-tense grepped at that pin with line-level sites recorded — and tests/test_refusal_events_ledger.py running a FAIL-first corpus pin (a main tree without the corpus trips RED naming the missing kind, so a drifted citation cannot pass silently). Direction honesty per the substrate\'s receipt-repo rule (edge #2 precedent): the merge is in fleet-murmur, so the edge books pq-named-refusals -> fm-refusal-ledger — currency flows INTO the citing repo. The 17:49 pulse\'s org note recorded "mints pq->fm refusal-ledger edge" at merge time; this booking lands the mint the merge earned — never self-upgraded. fleet-murmur becomes the fleet\'s first TRIPLE-inbound repo (honesty-receipts#2, qgs-adapter#3, refusal-ledger#8); pong-quilt\'s THIRD outgoing edge (session-wal honesty, stone-v1 forward-adoption, named refusals).',
      weight: 'VERIFIED',
      provenance: null, // the refusal corpus lives on pong-quilt main (the pinned 52b42b4 tree); the receipt is the fleet-murmur merge
      receipt: 'SuperInstance/fleet-murmur#8',
      falsification_condition: 'the SuperInstance/pong-quilt citation removed from the ledger doc or the PQ_PIN corpus-pin test, or a re-audit of the pinned pong-quilt main merge where a named corpus kind is absent from the tree while the pin still reports green (a drifted citation passing silently)',
    },
    {
      from: 'ft-resolver', to: 'qc-fm-surface',
      claim: 'the fleet-triage resolver\'s scoped quilt-family census (244 repos, 15,880 files indexed, 5,852 docs / 7,790 citation sites in 162s; audit subcommand independently re-verified 513 findings by filesystem scan at 0.0% FP on hard outcomes) names the canon cluster\'s 222 FILE_MISSING citations as the family\'s largest single doc→file drift surface — every one a doc→file claim that no longer resolves, the cheapest honesty fixes in the org. CURRENCY EARNED 2026-10-01: quilt-research-canons PR #5 ("REFERRAL — fleet-triage resolver", MERGED 2026-10-01T20:07:58Z, merge 62f18ff7) lands docs/REFERRAL-fleet-triage-resolver.md IN THE TO-NODE\'S REPO citing SuperInstance/fleet-triage and its resolver.py BY NAME with the run\'s counts and honest boundary notes (shallow-HEAD index — citations to non-default-branch files read FILE_MISSING, verify before deleting prose; PATH_PRECISE_ONLY advisory-only at 49.2% FP), adopting the resolver as a consume-don\'t-rival scan gate over projects/research/sprints. Direction honesty per the substrate\'s receipt-repo rule: the merge is in quilt-research-canons, so the edge books ft-resolver -> qc-fm-surface — currency flows INTO the citing repo. Never self-upgraded: the 02:26 snowball pulse filed the edge CANDIDATE with this exact upgrade path; Casey\'s merge burst earned it. quilt-research-canons\' FIRST inbound edge; fleet-triage\'s first outgoing edge; the graph\'s first instrument→surface pair from a census run.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/fleet-triage#2',
      receipt: 'SuperInstance/quilt-research-canons#5',
      falsification_condition: 'the SuperInstance/fleet-triage citation removed from docs/REFERRAL-fleet-triage-resolver.md, or a re-run of the resolver against the canon cluster materially disagreeing with the 222 FILE_MISSING count while the edge still reports green (a drifted census passing silently)',
    },
    {
      from: 'ft-resolver', to: 'qt-lineoor-surface',
      claim: 'the same census found ALL 25 LINE_OOR citations in the entire 244-repo quilt family inside quilt-tournament\'s referee/ docs — every one a line-past-EOF citation against three repos whose files shrank or were rewritten after the referee round (quilt-canvas-tui core.c 150 lines, cited 234–486; quilt-verilog quf.rs 464 lines, cited 665; quilt-fleet-tools seal.py 116 lines, cited 127) — the single holder of the family\'s entire line-past-EOF class: one sweep here fixes the whole class. CURRENCY EARNED 2026-10-01: quilt-tournament PR #1 ("REFERRAL EDGE — fleet-triage resolver → quilt-tournament", MERGED 2026-10-01T20:07:46Z, merge 2f6daf21) lands docs/REFERRAL-fleet-triage-resolver.md IN THE TO-NODE\'S REPO citing SuperInstance/fleet-triage BY NAME with a per-doc table of all 25 sites and resolved target paths re-verified by direct wc/grep against the indexed clones (the resolver audit could NOT independently re-check LINE_OOR — shallow-HEAD index — so the doc carries that honest limit, spot-verified not audit-sealed). Direction honesty per the receipt-repo rule: ft-resolver -> qt-lineoor-surface. Never self-upgraded; the 02:26 pulse\'s edge #2 mint, landed by the same merge burst. quilt-tournament\'s FIRST inbound edge; fleet-triage\'s second outgoing edge from the same instrument.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/fleet-triage#2',
      receipt: 'SuperInstance/quilt-tournament#1',
      falsification_condition: 'the SuperInstance/fleet-triage citation removed from docs/REFERRAL-fleet-triage-resolver.md, or a re-check of the 25 cited referee/ sites where the line-past-EOF reads no longer hold (files re-grown / docs re-pointed) while the edge still reports green',
    },
    // 2026-10-02 (pm) — the dance-of-growth wiring. Two PENDING edges booked
    // at birth for repos that did not exist this morning; never self-upgraded
    // (both cite by name on main, but the weight law wants a merged PR in the
    // to-node's repo — quilt-overhead and backward-holdem are main-direct
    // cultures, so per the git-agent#1 precedent these stay PENDING with the
    // upgrade path recorded until a PR culture or a Casey-earned merge earns
    // them).
    {
      from: 'ga-quilt-emit', to: 'bh-wal-ticks',
      claim: 'backward-holdem\'s receipt chain adopts the fleet WAL discipline (fnv1a-64, hash-chained canonical JSONL, wal_ref as run identity) from git-agent\'s quilt_emit — engine/receipts.py names the convention source and LEDGER.md records the lineage; booked PENDING per the aw->ga precedent: a repo-born direct main commit (tree ee18090) is not a merged PR, so the weight law is NOT met even with the citation present. Upgrade path: a PR into backward-holdem citing SuperInstance/git-agent by name and pinned ref.',
      weight: 'PENDING',
      provenance: 'SuperInstance/backward-holdem@ee18090', // the repo-born tree whose engine/receipts.py + LEDGER.md carry the convention citation
      falsification_condition: 'backward-holdem emitting a WAL whose chaining discipline drifts from fnv1a-64 canonical-JSONL (e.g. salted hash(), unseeded entropy in the decision path, or a wal_ref that does not bind seed+hands+script ids), or the git-agent convention citation removed from engine/receipts.py / LEDGER.md',
    },
    {
      from: 'bh-wal-ticks', to: 'qo-feed-v1',
      claim: 'the first WIRED edge between repos born the same day: backward-holdem\'s tournament receipts (wal_ref 0809402a13c37d70) feed quilt-overhead\'s board through tools/wal2feed.py, with a conformance pin at EACH end (producer W1-W9 RED->GREEN — RED captured on W4 lattice coords; consumer pin_snapshot RED->GREEN) so dialect drift is loud at whichever end it happens — the dance-of-growth compatibility rule. quilt-overhead main commit dd87e7c cites SuperInstance/backward-holdem BY NAME at pinned ref 65df4fd (docs/WIRING.md + commit message). HONESTY: dd87e7c is a direct main commit, not a merged PR — per the weight law and the git-agent#1 precedent the edge books PENDING; the citations and both pin suites are provenance, not currency. Upgrade path: a PR into quilt-overhead (or a Casey-earned merge culture there) citing the edge.',
      weight: 'PENDING',
      provenance: 'SuperInstance/quilt-overhead@dd87e7c', // the main commit whose docs/WIRING.md names backward-holdem at 65df4fd
      falsification_condition: 'either conformance pin failing (producer W1-W9 or consumer pin_snapshot), or feeds/real-wal-feed.json\'s wal_ref diverging from the source WAL\'s wal_ref, or the SuperInstance/backward-holdem citation removed from docs/WIRING.md',
    },
    {
      op: 'LINK', from: 'qig-wave4-query', to: 'qad-dispute-query',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/quilt-in-git#9',
      receipt: 'SuperInstance/quilt-adjudication#1',
      claim: 'EIGHTEENTH edge VERIFIED 2026-10-02 (13:26 snowball pulse): the adjudication query lane. The 12:25 pulse declared quilt-adjudication#1 the top open queue item; the merge outran the booking — same pattern as edge #14 (delta-shape#1, a98a5c5). quilt-adjudication#1 ("docs: referral edge — quilt-in-git wave4-query → adjudication query layer", MERGED 2026-10-02T04:57:51Z, merge 281330985e55bcf60a9b9a7f5f2eae2ebd465b56) lands docs/REFERRAL-quilt-in-git-wave4-query.md IN THE TO-NODE\'S REPO citing SuperInstance/quilt-in-git BY NAME at the pinned wave4-query merge 43f10b2 (quilt-in-git#9, MERGED 2026-10-02T02:38:47Z) — the quilt-query divergence / trusted-but-unaudited / attest verbs + LEDGER doubt grammar an adjudicating merge consumes before recording its disputes ("an adjudication merge is a divergence query whose answer was written down instead of discarded"). CURRENCY EARNED 2026-10-02; never self-upgraded — the merge in the TARGET repo did the earning, 2h19m after the from-technique landed. quilt-adjudication\'s FIRST inbound edge; the to-node born with its citing PR.',
      falsification_condition: 'the SuperInstance/quilt-in-git citation or the pinned 43f10b2 merge reference removed from docs/REFERRAL-quilt-in-git-wave4-query.md on quilt-adjudication main, or the quilt-query divergence / trusted-but-unaudited / attest verbs or the LEDGER doubt convention dropped from quilt-in-git main while the edge still reports green',
    },
    // 2026-10-02 (18:56 pulse) — the git-notes witness edge. Booked PENDING
    // per the weight law: the citation is a merged PR in the FROM repo
    // (quilt-in-git#11), and the to-node's repo (quilt-overhead) is a
    // main-direct culture — the same shape as the dance-of-growth wiring
    // pair booked hours earlier. Upgrade path recorded; never self-upgraded.
    {
      from: 'qig-notes2feed', to: 'qo-feed-v1',
      claim: 'the git-native witness stream is the feed.v1 dialect\'s second producer: quilt-in-git#11 ("w3a seam: notes2feed — git-native witness stream -> feed.v1", MERGED 2026-10-02T08:50:52Z, merge 0d2c0f9) ships tools/notes2feed.py reading refs/notes/quilt/receipts and emitting the quilt-overhead feed.v1 dialect ({cells, meta}; lattice coords; kind in the five fleet verbs), with wal_ref := "notes:<chain-head>" as stream identity — the SAME role wal_ref plays for WAL files. CITATION BY NAME rides the merged tree at anchored sites: tools/notes2feed.py\'s module docstring ("notes2feed — refs/notes/quilt/receipts -> quilt-overhead feed.v1"), and docs/NOTES2FEED.md naming the quilt-overhead feed.v1 dialect plus the missing push wire documented honestly (notes never auto-fetch/push; the consumption contract is pinned so the production wire can land without dialect drift). HONESTY ON CURRENCY: per the weight law and the git-agent#1 precedent, a merged PR in the FROM repo with the to-repo main-direct does NOT meet the law — the edge books PENDING with provenance quilt-in-git#11; upgrade path = a PR into quilt-overhead citing SuperInstance/quilt-in-git#11 (the wal2feed wiring pair booking, #36, set the same precedent hours earlier for this very to-node). quilt-in-git\'s SECOND outgoing edge (wave4-query → adjudication was the first, VERIFIED); quilt-overhead\'s SECOND PENDING inbound edge — the feed.v1 dialect now has two named producers (backward-holdem WAL ticks, quilt-in-git notes) before it has any merged-PR currency, which is exactly what the graph was built to measure. The 16:40 holdem-pulse directive ("book w3a→qo-feed-v1 edge after #11 merges") is executed here; the merge preceded the booking by ~10h.',
      weight: 'PENDING',
      provenance: 'SuperInstance/quilt-in-git#11', // the merged PR whose tool+doc carry the by-name feed.v1 citation
      falsification_condition: 'notes2feed emitting a feed whose dialect drifts from quilt-overhead feed.v1 ({cells, meta} shape, lattice coords, kind in the five fleet verbs, meta.wal_ref as stream identity), or the SuperInstance/quilt-overhead / feed.v1 citation removed from tools/notes2feed.py / docs/NOTES2FEED.md on quilt-in-git main, or the 11-pin notes2feed suite dropping below green',
    },
    // 2026-10-03 (01:37 pulse) — the Casey 15:42–15:52Z merge sweep earns
    // TWO edges from one hedge wave. Both to-nodes are PR-culture repos whose
    // merges landed the by-name citations; never self-upgraded — the merges
    // did the earning. NOTE on doubt-ledger's base branch: the Casey sweep
    // merged into `poc`, not `main` (main sits at e0dfdd1, 01:50Z — the
    // repos' own PR culture puts poc ahead; the citation trees are live and
    // merge-receipted either way, so the weight law is met).
    {
      from: 'pq-franken-guard', to: 'dl-janus-evidence',
      claim: 'TWENTY-SIXTH edge VERIFIED 2026-10-03 (01:37 snowball pulse): the Janus vocabulary lands inside the fleet with its receipt named. doubt-ledger PR #9 ("docs: Janus hedge (arXiv 2609.38266 evidence-before-effect sagas) — cite/differentiate ledger", MERGED 2026-10-02T15:51:57Z into base branch poc, tip 6f202da5) lands docs/JANUS-EVIDENCE-BEFORE-EFFECT.md IN THE TO-NODE\'S REPO citing SuperInstance/pong-quilt BY NAME at an anchored row: CLAIM row 2 ("Gates = pure functions of the log") names pong-quilt\'s franken-save guard as "exactly a pure function of state+receipts (PR #99 lineage)" and ADOPTS the Janus gloss "gate = pure function of the receipt log" as the fleet\'s name for guards/pins. The from-technique landed FIRST and is itself merge-receipted: pong-quilt#99 ("Round 77: v1 draw ledger append discipline + draw #13", MERGED 2026-10-02T15:43:23Z) precedes the citation by 8m34s — the provenance-order the weight law demands. The same doc cross-cites quilt-overhead\'s snapshot wal_ref and backward-holdem\'s LEDGER prereg (both main-direct cultures — those stay PENDING per the dance-of-growth precedent; only the pong-quilt row, whose source repo is PR-culture and merge-receipted, earns currency here). HONESTY: the doc is a hedge against arXiv 2609.38266 — the external work is cited/differentiated, never claimed; the edge\'s from-node is the fleet\'s own guard, not Janus. Never self-upgraded — Casey\'s merge in the TARGET repo did the earning. pong-quilt\'s FOURTH outgoing edge; doubt-ledger\'s FIRST inbound edge, 10h00m after the repo\'s poc commit.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/pong-quilt#99', // the merged from-technique PR (15:43:23Z) the citation names by lineage
      receipt: 'SuperInstance/doubt-ledger#9',
      falsification_condition: 'the "PR #99 lineage" / franken-save-guard citation removed from docs/JANUS-EVIDENCE-BEFORE-EFFECT.md on doubt-ledger\'s merged tree, or pong-quilt#99\'s append-discipline guard ceasing to be a pure function of state+receipts while the edge still reports green',
    },
    {
      from: 'dl-selective-disclosure', to: 'td-pam-hedge',
      claim: 'TWENTY-SEVENTH edge VERIFIED 2026-10-03 (01:37 snowball pulse, same booking): the PAM hedge names doubt-ledger\'s shipped answers as its CLAIM-OURS receipts. tidepool PR #12 ("docs: PAM vocabulary hedge — cite/differentiate arXiv 2605.11032", MERGED 2026-10-02T15:42:43Z) lands docs/PAM-HEDGE.md IN THE TO-NODE\'S REPO citing SuperInstance/doubt-ledger BY NAME at three anchored CLAIM-OURS rows: row 3 (Ed25519 root signing) — "doubt-ledger wave-2 shipped selective-disclosure export + Ed25519 root-signing over the tip root ... merged in the 01:49–02:39Z Casey sweep (doubt-ledger #1–#3)" with VERDICT ADOPT-already-adopted-receipted-above; row 4 (capability tokens / selective disclosure) — "doubt-ledger has export-side selective disclosure: filtered slice → standalone JSONL, header binds the live tip, checksums recomputed, verify_export names the exact tampered line", honest limit 5 pinned (integrity OF THE INCLUDED, never completeness), VERDICT ADOPT-WITH-GAP-NAMED. The from-technique is merge-receipted on doubt-ledger\'s merged tree: wave-2 selective-disclosure export + Ed25519 root signing shipped in the #1–#3 sweep (tip-of-line #3 MERGED 2026-10-02T02:39:02Z), ~13h before the citation merged. Direction per the receipt-repo rule: the merge is in tidepool, so currency flows INTO tidepool — dl-selective-disclosure -> td-pam-hedge. HONESTY: this is a hedge against external arXiv 2605.11032; the edge\'s from-node is doubt-ledger\'s own export lane, and the doc explicitly claims tamper-evidence never tamper-proof against PAM\'s stronger phrasing. Never self-upgraded. doubt-ledger\'s FIRST outgoing edge; tidepool\'s FIRST inbound edge — the to-node the 12:25 pulse staged as "repo not yet seeded" now carries VERIFIED mass.',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/doubt-ledger#3', // the wave-2 export merge the hedge doc receipts by name and sweep timestamp
      receipt: 'SuperInstance/tidepool#12',
      falsification_condition: 'the doubt-ledger #1–#3 sweep citations removed from docs/PAM-HEDGE.md on tidepool main, or a tidepool claim of selective-disclosure/Ed25519 capability that the doubt-ledger export lane cannot re-derive while the edge still reports green',
    },
    // 2026-10-04 (05:56 pulse) — the TWENTY-EIGHTH edge VERIFIED: the
    // cross-language twin transfer, found by org review (the queue's
    // Casey-gated items are all blocked; per the cron's fallback the pulse
    // reviewed org activity and surfaced this pair). slackwater-rust#1
    // merged 3h32m AFTER the from-technique it cites (slackwater-lattice#1
    // 18:05:53Z -> slackwater-rust#1 21:38:19Z) — provenance order the
    // weight law demands.
    {
      from: 'sw-lattice-hexlaw', to: 'swr-iff-consistency',
      claim: 'TWENTY-EIGHTH edge VERIFIED 2026-10-04 (05:56 snowball pulse): the hex-distance property suite crosses the language-twin seam with its source named. slackwater-rust PR #1 ("test(lattice-core): iff-consistency audit — hex_distance <-> neighbors property suite translated from slackwater-lattice PR #1 (fleet 69-c)", MERGED 2026-10-02T21:38:19Z, merge 3b077cfe562318fd0d177bb43d7955029ce551d9) lands crates/lattice-core/tests/iff_consistency.rs IN THE TO-NODE\'S REPO citing SuperInstance/slackwater-lattice BY NAME at 4 anchored sites on the merged tree: the suite\'s module docstring ("neighbors property suite of `slackwater-lattice` (Python, PR #1, merged as ..."), the lattice-core source doc ("slackwater-lattice commit 5bff9a3 (Published to PyPI + cleanup)"), and two pinned witness strings ("published-formula witness changed — re-pin against slackwater-lattice 5bff9a3"). The citation names the source repo AND its exact commit — the strongest citation shape the mesh has booked. The from-technique is merge-receipted FIRST: slackwater-lattice#1 ("test: complete the hex-distance property suite (P6 triangle + P7 ring law) + iff-probe receipt", MERGED 2026-10-02T18:05:53Z) precedes the translation by 3h32m. HONESTY: the audit\'s subject is a convention trap in the PUBLISHED wheel (the PyPI 0.1.0 axial formula is correct only for the other neighbor set); the edge\'s from-node is the workspace\'s sign-split suite, and the trap verdict rides the merged receipt. Never self-upgraded — the merge in the TARGET repo did the earning 2d03h after it landed. slackwater-lattice\'s FIRST outgoing edge; slackwater-rust\'s FIRST inbound edge — the thirteenth to-node born after seeding, entering the view at full VERIFIED mass (slackwater-lattice is from-node-only, no view mass).',
      weight: 'VERIFIED',
      provenance: 'SuperInstance/slackwater-lattice#1', // the merged from-technique PR (18:05:53Z) the translation cites by repo AND commit
      receipt: 'SuperInstance/slackwater-rust#1',
      falsification_condition: 'the slackwater-lattice citations (suite module docstring / lattice-core source doc / the two pinned witness strings) removed from crates/lattice-core/tests/iff_consistency.rs on slackwater-rust main, or the pinned witness re-pointed at a different slackwater-lattice commit while the edge still reports green',
    },
    // weight law demands.
    {
      from: 'exoj-field-model', to: 'qp-exoj-hdc-seam',
      claim: 'TWENTY-NINTH edge, booked PENDING 2026-10-04 (06:56 snowball pulse): the ExoJ parallel field crosses into quilt-pincher as an HDC hypervector seam — but the citation stays derivative. SuperInstance/quilt-pincher#15 ("FB1: ExoJ binding layer — HDC hypervector algebra + field-conditioned pinch seam", MERGED 2026-10-03, merge aee6f93856dac10238ee7da2d34764e9d1487504) lands src/hdc/exoj-field.ts IN THE TO-NODE\'S REPO binding field amplitudes (γ, η, Δ) into hypervector pinch so the pinch seam respects the conservation inequality Σ=γ+η≤1. Receipt sites on the merged tree: src/core/engine.ts, src/hdc/exoj-field.ts, src/hdc/hdc-embedder.ts, src/hdc/hypervector.ts, src/index.ts, test/hdc.test.ts. WEIGHT LAW READ: the seam cites "fleet-seeds lode 2026-10-03 (§4)" and the words "ExoJ canon exoj/" — NO repo-name citation (never "SuperInstance/exoj"), NO 40-char commit SHA, NO exoj#N issue reference. Worse, the lode\'s derivative carries a FOURTH amplitude ι (iota); the exoj charter (repo first commit, category-theoretic investigation of the inverted field: **Field** = CSPersist re-indexed, observers as functors, deformations as natural transformations, the causal sequence a right Kan extension) carries exactly THREE amplitudes γ/η/Δ plus identity-fragment sets — ι is a fleet-seeds invention the exoj repo canon does not hold. So the to-repo consumes a DERIVATIVE of the ExoJ model through a fleet lode, not the exoj repo\'s own merge-receipted technique — the exact citation-shape gap that pins this at PENDING (mass 0.05) per the git-agent#1 / edge-ga precedent: merged PR in the to-node\'s repo must NAME the source repo to earn VERIFIED. UPGRADE PATH (recorded, never self-upgraded): a quilt-pincher follow-up (FB2+ or a docs patch) naming SuperInstance/exoj BY NAME plus a pinned commit — e.g. exoj main bfbe4614 (2026-10-03T21:24:56Z) — at receipt sites in the merged tree flips this edge VERIFIED, exactly as slackwater-rust#1\'s 4 named-site citations earned the twin-transfer edge. exoj\'s FIRST outgoing edge (from-node-only, no view mass); quilt-pincher\'s FIRST inbound edge — the fourteenth to-node born after seeding, entering the view at PENDING mass only.',
      weight: 'PENDING',
      provenance: 'SuperInstance/quilt-pincher#15', // the merged to-node PR — the only merged artifact; provenance, not currency
      // no receipt: the to-repo merge does not name SuperInstance/exoj
      falsification_condition: 'a quilt-pincher merged PR naming SuperInstance/exoj (repo + commit) at any receipt site on main — in which case this edge must be upgraded to VERIFIED by that merge, not left at PENDING; or quilt-pincher main removing the ExoJ-derived seam (src/hdc/exoj-field.ts and its citation sites) while the edge still reports PENDING-green',
    },
    // weight law demands (main-direct culture): wave69's initial commit
    // 5258586088 IS the merged tree, but the weight law wants a merged PR
    // in the to-node's repo — PENDING with pinned-tree provenance + a
    // recorded upgrade path, exactly the ga->bh / bh->qo booking shape.
    {
      from: 'qmr-chain-dialect', to: 'w69-sticky-receipts',
      claim: 'THIRTIETH edge, booked PENDING 2026-10-04 (13:09 snowball pulse): the qmr1 receipt-chain dialect crosses into wave69\'s sticky-evolution cell with the STRONGEST citation shape a main-direct culture can produce — a named source repo at a pinned 40-char commit, live-verified. wave69 (born 2026-10-04T00:19Z during the key-rotation regime) ships cells/sticky_receipts.mjs on main @ 5258586088 whose module header declares: "CHAIN DIALECT: deliberately the fleet\'s qmr1 (quilt-mcp-receipts @ 889960a9)" — the from-technique\'s canonical home named BY NAME, the commit verified live against SuperInstance/quilt-mcp-receipts (889960a932b8c98ff17f14f8877d332c851ab11c exists; message "DESIGN.md + README.md: qmr1 spec, threat model, and the v2 path" — the commit that LANDED the dialect spec), with the dialect formula re-derived in-repo (id = sha256("qmr1:" + seq + ":" + prev + ":" + canonicalJSON(payload)); genesis prev = 64×"0") and the chain walked link-by-link in tests. WEIGHT LAW READ: 5258586088 is a direct main commit on a repo born that way (no PR exists — the repo\'s whole history is its initial commit), so per the git-agent#1 precedent and the dance-of-growth booking (ga->bh, bh->qo) the citation is provenance, not currency — PENDING at mass 0.05. The citation quality is nonetheless the slackwater-rust shape (repo name + commit), so the gap is procedural (no merged PR), not substantive (no naming gap like edge #29\'s). UPGRADE PATH (recorded, never self-upgraded): any wave69 merged PR carrying the citation at receipt sites — even a docs/receipts patch naming SuperInstance/quilt-mcp-receipts — flips this edge VERIFIED. Provenance order the weight law demands holds: the dialect spec (quilt-mcp-receipts @ 889960a9, 2026-10-02/03) precedes the citation (wave69 @ 5258586088, 2026-10-04) by ~1-2 days. quilt-mcp-receipts\' FIRST outgoing edge (from-node-only, no view mass); wave69\'s FIRST inbound edge — the fifteenth to-node born after seeding, entering the view at PENDING mass only.',
      weight: 'PENDING',
      provenance: 'SuperInstance/wave69@5258586088', // the born-with-it main tree whose sticky_receipts.mjs names quilt-mcp-receipts @ 889960a9
      // no receipt: wave69 has no merged PR (main-direct culture) — the git-agent#1 precedent
      falsification_condition: 'a wave69 merged PR naming SuperInstance/quilt-mcp-receipts at any receipt site — in which case this edge must be upgraded to VERIFIED by that merge; or wave69 main dropping the quilt-mcp-receipts citation / the qmr1 formula from cells/sticky_receipts.mjs while the edge still reports PENDING-green; or the pinned commit 889960a932b8 disappearing from SuperInstance/quilt-mcp-receipts',
    },
    // 2026-10-05 (01:56 pulse) — the THIRTY-FIRST edge VERIFIED: gpu-lab's
    // first currency, found by org review (the queue's top items are all
    // Casey-gated; per the cron's fallback the pulse reviewed org activity
    // and found quilt-gpu-lab#2's merge predating every open booking).
    {
      from: 'aw-quint-opcode', to: 'gl-ledgers',
      claim: 'THIRTY-FIRST edge VERIFIED 2026-10-05 (01:56 snowball pulse): the five-opcode spine lands in the gpu lab with its canon named. SuperInstance/quilt-gpu-lab PR #2 ("Receipt doctrine: provenance over the elephant-vision ledger pair", MERGED 2026-09-28T03:58:14Z, merge 8b1b44144f5363f6afcec8db37451d2b3c23ba67, branch receipt-doctrine-provenance) lands README.md\'s Doctrine-provenance block IN THE TO-NODE\'S REPO citing SuperInstance/AI-Writings BY NAME at anchored sites on the merged tree: README.md lines 30-39 ("The receipt doctrine dogfooded here is the fleet\'s five-opcode quilt WAL, whose canonical source is `SuperInstance/AI-Writings` (`algebra.md`)"), and the canonical producer named alongside ("the canonical producer of that WAL shape is `SuperInstance/git-agent` (`quilt_emit`, landed in git-agent#1)") — the lab\'s manifest the same doctrine over RESULTS/QUEUE plus experiment code (BIND every artifact to its digest, re-derive to verify; verdicts honest KEEP/KILL/INCONCLUSIVE/ABORTED, the ledger keeps all of them). The README itself declares the booking this edge records: "Referral edge: `aw-quint-opcode` → `gl-ledgers` (minted VERIFIED by this citation, per the fleet weight law)" — the to-node claiming its own edge under the weight law, with the receipt-side pins in tests/test_receipts.py + tools/receipt_manifest.py. Weight law met: the merged PR in the to-node\'s repo names the source repo BY NAME; the from-canon (algebra.md, the five-opcode spine + its laws) is main-direct on AI-Writings, so provenance rides the canon repo, exactly the fm→mw / qgs→fm provenance-null shape. The merge landed 2026-09-28 and outran every pulse\'s booking by a week — the 9/28-9/29 pulses were mid-KAT-flip, and the 10/04 pulses booked #28-#30 from the same org-review fallback without re-scanning gpu-lab; found tonight by the same fallback\'s direct org review. Never self-upgraded — the to-node\'s own merged PR did the earning. aw-quint-opcode\'s SECOND outgoing edge (both VERIFIED — the spine earns its second currency into a born-after-seeding repo); AI-Writings stays from-node-only (no view mass); quilt-gpu-lab\'s FIRST inbound edge — the sixteenth to-node born after seeding, entering the view at full VERIFIED mass.',
      weight: 'VERIFIED',
      provenance: null, // the canon lives on AI-Writings main (algebra.md, the five-opcode spine); the receipt is the quilt-gpu-lab#2 merge
      receipt: 'SuperInstance/quilt-gpu-lab#2',
      falsification_condition: 'quilt-gpu-lab main dropping the SuperInstance/AI-Writings (algebra.md) or SuperInstance/git-agent (quilt_emit) citations from README.md\'s Doctrine-provenance block / tests/test_receipts.py / tools/receipt_manifest.py, or the lab minting verdict receipts it cannot re-derive from the bound manifest digests while the edge still reports green',
    },
  ],
};
