// referral_graph.pins.mjs — FAIL-first pins for the Referral Mesh PoC.
//
// Two graphs are exercised:
//   SEED     — the real v1 graph (experiments/referral_graph.seed.mjs).
//              Honest: all edges PENDING. Its pins assert loadability, chain
//              integrity, view ranking, and — live, when gh is reachable —
//              that every provenance PR actually merged.
//   FIXTURE  — a labeled synthetic graph that exercises the VERIFIED currency
//              rules, wrong-repo refusal, audit downgrade, and falsification
//              kills. The fixture's claims are test data, never real findings.
//
// Run: node experiments/referral_graph.pins.mjs [--live]

import { ReferralGraph, Refusal, PENDING_WEIGHT, VERIFIED_WEIGHT } from '../src/referral_graph.mjs';
import { check, done, setTool, panel, kv } from '../src/toolkit.mjs';
import { execFileSync } from 'node:child_process';

setTool('referral-graph-pins');
const LIVE = process.argv.includes('--live');

// ── SEED graph ──────────────────────────────────────────────────────────────
const QUANT_REPOS = ['quilt-tools', 'quilt-show', 'quilt-arcade', 'quilt-quant', 'pong-quilt'];
const seed = new ReferralGraph({ name: 'referral-graph-v1', repos: QUANT_REPOS });
for (const n of (await import('./referral_graph.seed.mjs')).SEED.nodes) seed.addNode(n);
let seedBooked = 0;
for (const e of (await import('./referral_graph.seed.mjs')).SEED.edges) { seed.book(e); seedBooked++; }

check('seed: all edges booked', seedBooked === 9 && seed.rows.length === 9, `${seedBooked} edges`);

// Pin 1 — missing required field is a loud REFUSAL, never a silent drop.
{
  let msg = '';
  try { seed.book({ from: 'qt-api-lab', to: 'qs-ep2', claim: 'no kill switch' }); }
  catch (e) { msg = e instanceof Refusal ? e.message : 'WRONG TYPE: ' + e.constructor.name; }
  check('seed: missing falsification_condition -> REFUSAL names the key', /missing required key 'falsification_condition'/.test(msg), msg);
}

// Pin 2 — chain re-derives; tampering with a claim is loud and indexed.
{
  const ok = seed.verify();
  check('seed: witness chain verifies', ok.ok === true, ok.bad ? `row ${ok.bad.seq}: ${ok.bad.reason}` : `${seed.rows.length} rows`);
  const tampered = seed.exportRows();
  tampered[2] = { ...tampered[2], claim: tampered[2].claim + ' (quietly strengthened)' };
  const { verifyChain } = await import('../src/toolkit.mjs');
  const bad = verifyChain(tampered);
  check('seed: tampered claim -> verify fails at that row', bad.ok === false && bad.brokenAt === 2, bad.ok ? 'TAMPER ACCEPTED' : `caught row ${bad.brokenAt}: prev_hash ${bad.got} != ${bad.expected}`);
}

// Pin 3 — the VIEW: ranked distribution; five VERIFIED edges (20x an
// epsilon) dominate quilt-show, fleet-murmur, git-agent, pong-quilt and
// quilt-cowboy; the rest keep PENDING whispers.
// (main-repair note: the #11 conflict resolution had duplicated this block
// and left a dangling check() call — the file did not parse on main tip.
// Removed here; the currency flip below is what this PR is for.)
{
  const v = seed.view();
  check('seed: view ranks all seven mass-carrying repos', v.length === 7, v.map(x => `${x.repo}=${x.share.toFixed(3)}`).join(' '));
  const shares = v.map(x => x.share);
  check('seed: view shares sum to 1', Math.abs(shares.reduce((a, b) => a + b, 0) - 1) < 1e-9, `Σ=${shares.reduce((a, b) => a + b, 0)}`);
  const byRepo = Object.fromEntries(v.map(x => [x.repo, x.weight]));
  check('seed: view mass — qs = VERIFIED + PENDING, fm = VERIFIED, ga = VERIFIED, pq = VERIFIED, qb = VERIFIED, qa = 2×PENDING, qt = 1×PENDING',
    Math.abs(byRepo['quilt-show'] - (VERIFIED_WEIGHT + PENDING_WEIGHT)) < 1e-9 &&
    Math.abs(byRepo['fleet-murmur'] - VERIFIED_WEIGHT) < 1e-9 &&
    Math.abs(byRepo['git-agent'] - VERIFIED_WEIGHT) < 1e-9 &&
    Math.abs(byRepo['pong-quilt'] - VERIFIED_WEIGHT) < 1e-9 &&
    Math.abs(byRepo['quilt-cowboy'] - VERIFIED_WEIGHT) < 1e-9 &&
    Math.abs(byRepo['quilt-arcade'] - 2 * PENDING_WEIGHT) < 1e-9 &&
    Math.abs(byRepo['quilt-tools'] - PENDING_WEIGHT) < 1e-9,
    JSON.stringify(byRepo));
  const sorted = [...v].sort((a, b) => b.share - a.share || a.repo.localeCompare(b.repo));
  check('seed: view is sorted by share desc', JSON.stringify(v) === JSON.stringify(sorted), 'sorted');
  check('seed: quilt-show still leads; the four VERIFIED-only repos tie, broken by name (fleet-murmur first)',
    v[0].repo === 'quilt-show' && v[0].weight === VERIFIED_WEIGHT + PENDING_WEIGHT &&
    v[1].repo === 'fleet-murmur' && v[1].weight === VERIFIED_WEIGHT &&
    v[2].repo === 'git-agent' && v[2].weight === VERIFIED_WEIGHT &&
    v[3].repo === 'pong-quilt' && v[3].weight === VERIFIED_WEIGHT &&
    v[4].repo === 'quilt-cowboy' && v[4].weight === VERIFIED_WEIGHT,
    `${v[0].repo} ${(v[0].share * 100).toFixed(1)}% · ${v[1].repo} ${(v[1].share * 100).toFixed(1)}% · ${v[2].repo} ${(v[2].share * 100).toFixed(1)}% · ${v[3].repo} ${(v[3].share * 100).toFixed(1)}% · ${v[4].repo} ${(v[4].share * 100).toFixed(1)}%`);
}

// Pin 3c — the SECOND currency event (FAIL-first: on main tip the quantum-coin
// edge does not exist — this pin trips; the seed update on this branch earns
// it). Single-edge monopoly broken.
{
  const row = seed.rows.find(r => r.op === 'LINK' && r.from === 'quant-coin-toss' && r.to === 'qq-quantum-tiebreak');
  check('seed: quantum-coin edge is VERIFIED with receipt in the to-node\'s repo',
    row.weight === 'VERIFIED' && row.receipt === 'SuperInstance/pong-quilt#28',
    row ? `weight=${row.weight} receipt=${row.receipt}` : 'edge not found');
  const verified = seed.rows.filter(r => r.op === 'LINK' && r.weight === 'VERIFIED');
  check('seed: exactly five VERIFIED edges — monopoly broken, doctrine arc complete, jev-quilt and pong-quilt currency both flow outward',
    verified.length === 5 && new Set(verified.map(r => r.to)).size === 5,
    verified.map(r => `${r.from}->${r.to}`).join(' '));
}

// Pin 3b — the currency event (FAIL-first: on main tip the S2 edge is PENDING
// with no receipt — this pin trips; the seed update on this branch earns it).
{
  const row = seed.rows.find(r => r.op === 'LINK' && r.from === 'qt-s2-driftwatch' && r.to === 'qs-ep2');
  check('seed: S2→E2 edge is VERIFIED with receipt in the to-node\'s repo',
    row.weight === 'VERIFIED' && row.receipt === 'SuperInstance/quilt-show#1' && row.provenance === 'SuperInstance/quilt-tools#3',
    row ? `weight=${row.weight} receipt=${row.receipt}` : 'edge not found');
  const wrongRepo = seed.rows.some(r => r.op === 'LINK' && r.weight === 'VERIFIED' && !r.receipt.split('#')[0].endsWith('/' + seed.nodes.get(r.to).repo));
  check('seed: every VERIFIED receipt targets its to-node\'s repo', !wrongRepo, 'weight law held');
}

// Pin 3d — the THIRD currency event: the git-agent opcode edge. FAIL-first:
// on main tip this edge is PENDING with no receipt (the currency pins trip).
// git-agent#4 (merged 2026-09-26T09:11:41Z, merge 8d6c31a) lands the in-repo
// algebra.md citation — the exact upgrade path booked when the edge was
// PENDING. Never self-upgraded: the merge in the TARGET repo did the earning.
{
  const row = seed.rows.find(r => r.op === 'LINK' && r.from === 'aw-quint-opcode' && r.to === 'ga-quilt-emit');
  check('seed: aw→ga edge is VERIFIED with git-agent#4 receipt in the to-node\'s repo',
    row?.weight === 'VERIFIED' && row?.receipt === 'SuperInstance/git-agent#4' && row?.provenance === 'SuperInstance/git-agent#1',
    row ? `weight=${row.weight} receipt=${row.receipt}` : 'edge not found');
  check('seed: aw→ga claim records the currency event and the booked upgrade path',
    row?.claim.includes('CURRENCY EARNED 2026-09-26') && row?.claim.includes('8d6c31a'),
    row ? 'claim carries the merge receipt' : 'edge not found');
  const aw = seed.nodes.get('aw-quint-opcode'), ga = seed.nodes.get('ga-quilt-emit');
  check('seed: both endpoints exist in their own repos',
    aw?.repo === 'AI-Writings' && ga?.repo === 'git-agent', `${aw?.repo} -> ${ga?.repo}`);
}

// Pin 3e — the FOURTH currency event: jev-quilt's first OUTGOING edge. FAIL-
// first: on the pre-merge tip this edge does not exist (the currency pins
// trip). quilt-cowboy#1 (merged 2026-09-26T09:12:37Z, merge a3feccca) lands
// the in-repo citation naming SuperInstance/jev-quilt as the doctrine source
// of the v3 substance gate — the weight law is met in the TARGET repo. This
// was the 16:11 pulse's synergy candidate (jev-quilt had zero outgoing
// currency; quilt-doctor named the length-proxy stand-in the gate replaces).
{
  const row = seed.rows.find(r => r.op === 'LINK' && r.from === 'jq-substance-noul' && r.to === 'qb-jev-gate');
  check('seed: jq→qb edge is VERIFIED with quilt-cowboy#1 receipt in the to-node\'s repo',
    row?.weight === 'VERIFIED' && row?.receipt === 'SuperInstance/quilt-cowboy#1',
    row ? `weight=${row.weight} receipt=${row.receipt}` : 'edge not found');
  check('seed: jq→qb claim records the currency event and the merge sha',
    row?.claim.includes('CURRENCY EARNED 2026-09-26') && row?.claim.includes('a3feccca'),
    row ? 'claim carries the merge receipt' : 'edge not found');
  check('seed: jq→qb declares a falsification condition (kill switch)',
    typeof row?.falsification_condition === 'string' && row.falsification_condition.length > 20,
    row?.falsification_condition ?? 'none');
  const jq = seed.nodes.get('jq-substance-noul'), qb = seed.nodes.get('qb-jev-gate');
  check('seed: both endpoints exist in their own repos',
    jq?.repo === 'jev-quilt' && qb?.repo === 'quilt-cowboy', `${jq?.repo} -> ${qb?.repo}`);
  const fromJq = seed.rows.filter(r => r.op === 'LINK' && seed.nodes.get(r.from)?.repo === 'jev-quilt');
  check('seed: this is jev-quilt\'s only outgoing edge — first outward currency',
    fromJq.length === 1 && fromJq[0].to === 'qb-jev-gate', `${fromJq.length} jev-quilt outgoing`);
}

// Pin 3f — the FIFTH currency event: fleet-murmur's honesty-receipts pass.
// FAIL-first: on main tip this edge does not exist (the currency pins trip).
// fleet-murmur#2 (merged 2026-09-26T19:08:16Z, merge 5391ba56) names
// SuperInstance/pong-quilt BY NAME in-repo three times (CROSS-POLLINATE.md:
// QA-REFUSAL honesty contract, session WAL substrate, VERIFIED_CLAIMS
// registry). HONESTY on direction: the weight law requires the receipt to
// target the TO-node's repo — the citing merge is in fleet-murmur, so the
// currency books pq-session-wal -> fm-honesty-receipts (doctrine flows INTO
// the citing repo), not the prose order the pulse note suggested.
{
  const row = seed.rows.find(r => r.op === 'LINK' && r.from === 'pq-session-wal' && r.to === 'fm-honesty-receipts');
  check('seed: pq→fm edge is VERIFIED with fleet-murmur#2 receipt in the to-node\'s repo',
    row?.weight === 'VERIFIED' && row?.receipt === 'SuperInstance/fleet-murmur#2',
    row ? `weight=${row.weight} receipt=${row.receipt}` : 'edge not found');
  check('seed: pq→fm claim records the currency event and the merge sha',
    row?.claim.includes('CURRENCY EARNED 2026-09-26') && row?.claim.includes('5391ba56'),
    row ? 'claim carries the merge receipt' : 'edge not found');
  check('seed: pq→fm declares a falsification condition (kill switch)',
    typeof row?.falsification_condition === 'string' && row.falsification_condition.length > 20,
    row?.falsification_condition ?? 'none');
  const pq = seed.nodes.get('pq-session-wal'), fm = seed.nodes.get('fm-honesty-receipts');
  check('seed: both endpoints exist in their own repos',
    pq?.repo === 'pong-quilt' && fm?.repo === 'fleet-murmur', `${pq?.repo} -> ${fm?.repo}`);
  check('seed: receipt target is the to-node\'s repo (weight law, substrate-enforced)',
    row?.receipt.split('#')[0] === `SuperInstance/${fm?.repo}`, row?.receipt);
  const fromPq = seed.rows.filter(r => r.op === 'LINK' && seed.nodes.get(r.from)?.repo === 'pong-quilt');
  check('seed: this is pong-quilt\'s only outgoing edge — first outward currency',
    fromPq.length === 1 && fromPq[0].to === 'fm-honesty-receipts', `${fromPq.length} pong-quilt outgoing`);
}

// Pin 4 — provenance live audit: every cited PR must actually be merged.
// gh absence -> skip labeled SKIPPED (honest), never pass silently.
{
  let ghOK = false, checked = 0, unmerged = [];
  try {
    execFileSync('gh', ['auth', 'status'], { stdio: 'pipe' });
    ghOK = true;
  } catch { ghOK = false; }
  if (LIVE && ghOK) {
    for (const row of seed.rows) {
      const prs = [];
      if (row.provenance) prs.push(['provenance', row.provenance]);
      if (row.receipt) prs.push(['receipt', row.receipt]);
      for (const [kind, pr] of prs) {
        checked++;
        const [repo, num] = pr.split('#');
        try {
          const state = execFileSync('gh', ['pr', 'view', num, '-R', repo, '--json', 'state', '-q', '.state'], { stdio: 'pipe' }).toString().trim();
          if (state !== 'MERGED') unmerged.push(`${row.from}->${row.to} ${kind} ${pr}=${state}`);
        } catch { unmerged.push(`${row.from}->${row.to} ${kind} ${pr}=404`); }
      }
    }
    check('seed: live audit — all provenance + receipt PRs merged', unmerged.length === 0, unmerged.join(' ') || `${checked} receipts audited live`);
  } else {
    console.log(`  ${'·'} provenance live audit SKIPPED (gh=${ghOK}, --live=${LIVE}) — labeled, not silent`);
  }
}

// Pin 5 — falsification probe on the real graph: the declared kill condition
// kills, and the kill is booked as a REFUSED row; surviving evidence books EFFECT.
{
  const g2 = new ReferralGraph({ name: 'probe-copy', repos: QUANT_REPOS });
  for (const n of (await import('./referral_graph.seed.mjs')).SEED.nodes) g2.addNode(n);
  for (const e of (await import('./referral_graph.seed.mjs')).SEED.edges) g2.book(e);
  const edge = g2.rows.find(r => r.op === 'LINK' && r.from === 'qt-s2-driftwatch' && r.to === 'qs-ep2');
  const survive = g2.probe(edge.from, edge.to, 'unrelated observation: readme typo');
  check('seed: off-condition probe books EFFECT, no kill', survive.hit === false && survive.row.op === 'EFFECT', survive.row.claim);
  const kill = g2.probe(edge.from, edge.to, edge.falsification_condition);
  check('seed: falsification condition kills the edge', kill.hit === true && kill.row.op === 'REFUSED', kill.row.claim);
  const v = g2.view();
  const qsShare = v.find(x => x.repo === 'quilt-show')?.share ?? 0;
  check('seed: killed edge drops its mass from the view', qsShare < seed.view().find(x => x.repo === 'quilt-show').share, `qs ${seed.view().find(x => x.repo === 'quilt-show').share.toFixed(3)} -> ${qsShare.toFixed(3)}`);
}

// ── FIXTURE graph (synthetic, labeled) ──────────────────────────────────────
function fixture() {
  const g = new ReferralGraph({ name: 'fixture' });
  g.addNode({ id: 'a', repo: 'repo-a', summary: 'fixture node a' });
  g.addNode({ id: 'b', repo: 'repo-b', summary: 'fixture node b' });
  g.addNode({ id: 'c', repo: 'repo-c', summary: 'fixture node c' });
  return g;
}

// Pin 6 — VERIFIED currency rules.
{
  const g = fixture();
  let m1 = '';
  try { g.book({ from: 'a', to: 'b', claim: 'x', falsification_condition: 'y', weight: 'VERIFIED' }); } catch (e) { m1 = e.message; }
  check('fixture: VERIFIED without receipt -> REFUSAL', /VERIFIED without receipt/.test(m1), m1);

  const g2 = fixture();
  let m2 = '';
  try { g2.book({ from: 'a', to: 'b', claim: 'x', falsification_condition: 'y', weight: 'VERIFIED', receipt: 'SuperInstance/repo-a#9' }); } catch (e) { m2 = e.message; }
  check('fixture: receipt in the WRONG repo -> REFUSAL', /not the to-node's repo/.test(m2), m2);

  const g3 = fixture();
  let okRow = null;
  try { okRow = g3.book({ from: 'a', to: 'b', claim: 'x', falsification_condition: 'y', weight: 'VERIFIED', receipt: 'SuperInstance/repo-b#9' }); } catch (e) { okRow = e.message; }
  check('fixture: receipt in the to-node\'s repo -> booked', okRow?.op === 'LINK' && okRow?.weight === 'VERIFIED', typeof okRow === 'string' ? okRow : okRow.row_hash);

  const g4 = fixture();
  let m4 = '';
  try { g4.book({ from: 'a', to: 'b', claim: 'x', falsification_condition: 'y', weight: 'PENDING', receipt: 'SuperInstance/repo-b#9' }); } catch (e) { m4 = e.message; }
  check('fixture: PENDING edge carrying a receipt -> REFUSAL', /weight must be earned/.test(m4), m4);

  const g5 = fixture();
  let m5 = '';
  try { g5.book({ from: 'a', to: 'b', claim: 'x', falsification_condition: 'y', weight: 'PENDING', provenance: 'not-a-pr-link' }); } catch (e) { m5 = e.message; }
  check('fixture: malformed provenance -> REFUSAL', /provenance/.test(m5), m5);

  const g6 = fixture();
  let m6 = '';
  try { g6.book({ from: 'a', to: 'a', claim: 'x', falsification_condition: 'y', weight: 'PENDING' }); } catch (e) { m6 = e.message; }
  check('fixture: self-referral -> REFUSAL', /self-referral/.test(m6), m6);
}

// Pin 7 — audit downgrade: unmerged receipt -> PENDING, downgrade booked.
{
  const g = fixture();
  g.book({ from: 'a', to: 'b', claim: 'x', falsification_condition: 'y', weight: 'VERIFIED', receipt: 'SuperInstance/repo-b#9' });
  g.book({ from: 'b', to: 'c', claim: 'p', falsification_condition: 'q', weight: 'VERIFIED', receipt: 'SuperInstance/repo-c#4' });
  const res = g.auditReceipts(r => r === 'SuperInstance/repo-c#4'); // repo-b#9 is NOT merged
  const downgraded = g.rows.find(r => r.op === 'REFUSED' && r.claim.includes('downgraded'));
  const edgeAB = g.rows.find(r => r.op === 'LINK' && r.from === 'a');
  check('fixture: unmerged receipt downgraded + booked', res.find(x => !x.merged)?.receipt === 'SuperInstance/repo-b#9' && downgraded && edgeAB.weight === 'PENDING' && edgeAB.receipt === null, downgraded?.claim ?? 'no downgrade row');
  const v = g.view();
  check('fixture: view reflects downgrade (repo-b mass = epsilon)', Math.abs(v.find(x => x.repo === 'repo-b').weight - PENDING_WEIGHT) < 1e-9, JSON.stringify(v));
}

// Pin 8 — VERIFIED outranks PENDING in the view.
{
  const g = fixture();
  g.book({ from: 'a', to: 'b', claim: 'verified cross-use', falsification_condition: 'k1', weight: 'VERIFIED', receipt: 'SuperInstance/repo-b#9' });
  g.book({ from: 'a', to: 'c', claim: 'mere speculation', falsification_condition: 'k2', weight: 'PENDING' });
  const v = g.view();
  const b = v.find(x => x.repo === 'repo-b'), c = v.find(x => x.repo === 'repo-c');
  check('fixture: VERIFIED dominates PENDING (20x weight ratio)',
    b.weight === VERIFIED_WEIGHT && Math.abs(c.weight - PENDING_WEIGHT) < 1e-9 && b.share > c.share,
    `repo-b=${b.share.toFixed(3)} repo-c=${c.share.toFixed(3)}`);
}

// Pin 9 — the discovery audit (REFERRAL_GRAPH.md "Next rungs"). Injected
// stream, three claims: (a) a merged PR in the TO-node's repo citing a hint
// surfaces as a candidate; (b) the search is scoped to the to-repo — the
// searchFn must be called with the to-node's repo, never the from-node's
// (a hit in the wrong repo is not currency); (c) non-live mode is SKIPPED
// labeled, and already-VERIFIED edges are never scanned (auditReceipts
// guards those).
{
  const { SEED } = await import('./referral_graph.seed.mjs');
  const { discover, HINTS } = await import('./referral_graph.discovery.mjs');
  const scoped = [];
  const fakeSearch = (hint, repoFull) => {
    scoped.push(repoFull);
    if (hint === 'receipts flip credit' && repoFull === 'SuperInstance/quilt-show') {
      return [{ number: 42, title: 'episode 5: receipts flip credit, demonstrated', url: 'u' }];
    }
    return [];
  };
  const offline = discover(SEED, { live: false });
  check('discovery: offline mode reports SKIPPED, never passes silently',
    offline.every(r => r.skipped === true), offline.map(r => `${r.edge}:${r.skipped}`).join(' '));
  const live = discover(SEED, { live: true, searchFn: fakeSearch });
  const e2 = live.find(r => r.edge === 'qt-api-lab->qs-ep2');
  check('discovery: hint hit in the TO repo surfaces as candidate',
    e2.candidates.some(c => c.pr === '#42' && c.hint === 'receipts flip credit'), JSON.stringify(e2.candidates));
  const toRepos = new Set(SEED.edges.map(e => `${'SuperInstance'}/${SEED.nodes.find(n => n.id === e.to).repo}`));
  check('discovery: every live search scoped to a to-node repo',
    scoped.length > 0 && scoped.every(r => toRepos.has(r)), scoped.join(','));
  check('discovery: VERIFIED edge (s2->ep2) is not scanned',
    !live.some(r => r.edge === 'qt-s2-driftwatch->qs-ep2'), live.map(r => r.edge).join(' '));
  check('discovery: every PENDING edge was scanned',
    live.filter(r => !r.skipped).length === SEED.edges.filter(e => e.weight === 'PENDING').length,
    `${live.length} results vs ${SEED.edges.filter(e => e.weight === 'PENDING').length} PENDING edges`);

  // Pin 10 — anti-Goodhart guard: the graph's own artifact cannot mint its
  // currency. A hit whose title matches SELF_REFERENTIAL is excluded.
  const selfSearch = (hint, repoFull) =>
    hint === 'NEGATIVE_SPACE' && repoFull === 'SuperInstance/quilt-tools'
      ? [{ number: 6, title: 'REFERRAL_GRAPH PoC: the mesh answers as a distribution', url: 'u' }]
      : [];
  const liveSelf = discover(SEED, { live: true, searchFn: selfSearch });
  const neg = liveSelf.find(r => r.edge === 'qa-negspace->qt-api-lab');
  check('discovery: graph-owned PR flagged self-referential, not a candidate',
    neg.candidates.length === 1 && neg.candidates[0].selfReferential === true && neg.candidates[0].pr === '#6',
    JSON.stringify(neg.candidates));
}

panel('referral-graph v1 — the mesh answers as a distribution', [
  kv('nodes', '13 (8 repos)'), kv('edges', '9 — 5 VERIFIED · 4 PENDING'),
  kv('currency', '5 VERIFIED (show#1 cites S2 · pong#28 cites coin-toss-v1 · git-agent#4 cites algebra.md · cowboy#1 cites jev-quilt · fleet-murmur#2 cites pong-quilt) — doctrine flows outward five ways; jev-quilt AND pong-quilt earn first outgoing edges; first to-node born after seeding'),
  kv('view', seed.view().map(x => `${x.repo} ${(x.share * 100).toFixed(1)}%`).join(' · ')),
]);
done();
