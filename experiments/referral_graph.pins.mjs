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
const seed = new ReferralGraph({ name: 'referral-graph-v1', repos: ['quilt-tools', 'quilt-show', 'quilt-arcade'] });
for (const n of (await import('./referral_graph.seed.mjs')).SEED.nodes) seed.addNode(n);
let seedBooked = 0;
for (const e of (await import('./referral_graph.seed.mjs')).SEED.edges) { seed.book(e); seedBooked++; }

check('seed: all edges booked', seedBooked === 5 && seed.rows.length === 5, `${seedBooked} edges`);

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

// Pin 3 — the VIEW: ranked distribution; PENDING edges all weigh epsilon.
{
  const v = seed.view();
  check('seed: view ranks all three repos', v.length === 3, v.map(x => `${x.repo}=${x.share.toFixed(3)}`).join(' '));
  const shares = v.map(x => x.share);
  check('seed: view shares sum to 1', Math.abs(shares.reduce((a, b) => a + b, 0) - 1) < 1e-9, `Σ=${shares.reduce((a, b) => a + b, 0)}`);
  check('seed: all weight is PENDING weight (0.05/edge)', v.every(x => Math.abs(x.weight - 5 * PENDING_WEIGHT) < 1e-9 || Math.abs(x.weight - 2 * PENDING_WEIGHT) < 1e-9 || Math.abs(x.weight - PENDING_WEIGHT) < 1e-9), v.map(x => x.weight).join(','));
  const sorted = [...v].sort((a, b) => b.share - a.share);
  check('seed: view is sorted by share desc', JSON.stringify(v) === JSON.stringify(sorted), 'sorted');
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
      if (!row.provenance) continue;
      checked++;
      const [repo, num] = row.provenance.split('#');
      try {
        const state = execFileSync('gh', ['pr', 'view', num, '-R', repo, '--json', 'state', '-q', '.state'], { stdio: 'pipe' }).toString().trim();
        if (state !== 'MERGED') unmerged.push(`${row.provenance}=${state}`);
      } catch { unmerged.push(`${row.provenance}=404`); }
    }
    check('seed: live audit — all provenance PRs merged', unmerged.length === 0, unmerged.join(' ') || `${checked} receipts audited live`);
  } else {
    console.log(`  ${'·'} provenance live audit SKIPPED (gh=${ghOK}, --live=${LIVE}) — labeled, not silent`);
  }
}

// Pin 5 — falsification probe on the real graph: the declared kill condition
// kills, and the kill is booked as a REFUSED row; surviving evidence books EFFECT.
{
  const g2 = new ReferralGraph({ name: 'probe-copy' });
  for (const n of (await import('./referral_graph.seed.mjs')).SEED.nodes) g2.addNode(n);
  for (const e of (await import('./referral_graph.seed.mjs')).SEED.edges) g2.book(e);
  const edge = g2.rows[0];
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

panel('referral-graph v1 — the mesh answers as a distribution', [
  kv('nodes', '7 (3 repos)'), kv('edges', '5, all PENDING at seed'),
  kv('currency', '0 VERIFIED — cross-use unmeasured yet'),
  kv('view', seed.view().map(x => `${x.repo} ${(x.share * 100).toFixed(1)}%`).join(' · ')),
]);
done();
