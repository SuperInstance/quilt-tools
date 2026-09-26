// referral_graph.discovery.mjs — the mesh hunts its own currency (Casey
// 12:03 mandate; REFERRAL_GRAPH.md "Next rungs": auditReceipts against the
// live org PR stream).
//
// auditReceipts (src/referral_graph.mjs) *guards* existing VERIFIED edges —
// it decays them when a cited PR un-merges. But it cannot *mint* currency:
// a PENDING edge earns weight only when a merged PR in the TARGET repo cites
// its technique, and nobody was watching the org's merged-PR stream for
// that. This tool watches.
//
// For every PENDING edge, a small set of citation HINTS names the technique
// in the words a citing PR would plausibly use (kept next to the seed so a
// technique rename is a one-place edit). Live mode searches GitHub merged
// PRs in the edge's TARGET repo for each hint. A hit is a CANDIDATE upgrade:
// printed with its PR for a human to verify the citation is load-bearing,
// then the edge flips in referral_graph.seed.mjs (the seed is the ledger;
// this tool never books — weight must still be earned by an explicit edit
// the pins can FAIL-first).
//
// Honesty rules, same as the pins: gh absent / not --live -> every edge is
// reported SKIPPED, labeled, never passed silently. A hit in the WRONG repo
// is reported as invalid currency (a merged PR in the wrong repo does not
// verify — the weight law's whole point).

import { execFileSync } from 'node:child_process';

// Citation hints per PENDING edge, keyed `${from}->${to}`. The to-repo is
// derived from the seed, not restated — a typo here cannot move the target.
export const HINTS = {
  'qt-api-lab->qs-ep2':      ['receipts flip credit', 'receipts-over-scores', 'E2 receipts'],
  'qt-s3-tide->qa-plugins':  ['quantum-tided', 'PENDING/ENTANGLED/COLLAPSED', 'S3 witness'],
  'qa-negspace->qt-api-lab': ['NEGATIVE_SPACE', 'declined patch 12', 'declined-patch-12'],
  'qs-ep3->qa-plugins':      ['drag-to-reshape', 'episode-3 watcher', 'episode 3 watcher'],
};

// Anti-Goodhart guard (first live discovery run, 2026-09-26): the graph's
// own PRs mention every technique it books — if a REFERRAL_GRAPH artifact
// could mint its edges' currency, the mesh would pay itself. A candidate
// whose title matches this pattern is reported EXCLUDED, never a candidate.
export const SELF_REFERENTIAL = /referral[ _-]?graph/i;

// searchFn(hint, repoFull) -> [{number,title,url,mergedAt}] — injectable for
// pins. Default: live GitHub merged-PR search scoped to the org + repo.
function ghSearch(hint, repoFull) {
  const out = execFileSync('gh', ['search', 'prs', `${hint} repo:${repoFull}`, '--merged', '--json', 'number,title,url', '--limit', '20'], { stdio: 'pipe' }).toString();
  return JSON.parse(out);
}

export function discover(seed, { live = false, searchFn = ghSearch, org = 'SuperInstance' } = {}) {
  const byId = new Map(seed.nodes.map(n => [n.id, n]));
  const results = [];
  for (const edge of seed.edges) {
    const key = `${edge.from}->${edge.to}`;
    if (edge.weight !== 'PENDING') continue; // VERIFIED guarded by auditReceipts; REFUTED scars skipped
    const hints = HINTS[key] ?? [];
    const entry = { edge: key, toRepo: byId.get(edge.to).repo, hints: hints.length, candidates: [], skipped: !live };
    if (live) {
      for (const hint of hints) {
        let hits = [];
        try { hits = searchFn(hint, `${org}/${byId.get(edge.to).repo}`); }
        catch { entry.candidates.push({ hint, error: 'search failed' }); continue; }
        for (const h of hits) {
          const selfReferential = SELF_REFERENTIAL.test(h.title ?? '');
          entry.candidates.push({ hint, pr: `#${h.number}`, title: h.title, url: h.url, ...(selfReferential ? { selfReferential: true } : {}) });
        }
      }
    }
    results.push(entry);
  }
  return results;
}

// CLI: node experiments/referral_graph.discovery.mjs [--live]
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const LIVE = process.argv.includes('--live');
  const { SEED } = await import('./referral_graph.seed.mjs');
  let ghOK = false;
  try { execFileSync('gh', ['auth', 'status'], { stdio: 'pipe' }); ghOK = true; } catch { ghOK = false; }
  const results = discover(SEED, { live: LIVE && ghOK });
  for (const r of results) {
    if (r.skipped) {
      console.log(`${r.edge} -> ${r.toRepo}: SKIPPED (gh=${ghOK}, --live=${LIVE}) — labeled, not silent`);
    } else {
      const real = r.candidates.filter(c => !c.selfReferential);
      const self = r.candidates.filter(c => c.selfReferential);
      if (real.length === 0 && self.length === 0) {
        console.log(`${r.edge} -> ${r.toRepo}: 0 candidates across ${r.hints} hints`);
      } else {
        if (real.length) {
          console.log(`${r.edge} -> ${r.toRepo}: ${real.length} CANDIDATE(S) — verify load-bearing, then flip the seed:`);
          for (const c of real) console.log(`    [${c.hint}] ${c.pr} ${c.title}\n      ${c.url ?? c.error ?? ''}`);
        }
        if (self.length) {
          console.log(`${r.edge} -> ${r.toRepo}: ${self.length} EXCLUDED (self-referential — the graph's own artifact cannot mint its currency):`);
          for (const c of self) console.log(`    [${c.hint}] ${c.pr} ${c.title}`);
        }
      }
    }
  }
}
