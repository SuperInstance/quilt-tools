// tools/fresh-audit/fresh-audit.mjs — phantom-RED auditor.
//
// Motivation (org-documented wound class): pong-quilt R85 shipped a pin that
// went RED on ANY fresh checkout because it claimed gitignored dist/ files
// the author's own tree had on disk — the AUTHOR-TREE-BLIND pin. The class
// recurs wherever pins are authored, run, and "verified" in the same dirty
// directory. This tool is the cheap detector: clone the branch PRISTINE into
// a temp dir, run every pin/test convention it can find, report per-runner
// verdicts. Any RED here that the author's tree saw GREEN = phantom.
//
// Usage:
//   node tools/fresh-audit/fresh-audit.mjs <owner/repo> <pr-number>
//   node tools/fresh-audit/fresh-audit.mjs --branch <owner/repo> <branch>
//   node tools/fresh-audit/fresh-audit.mjs --local <dir>   # audit an existing checkout
//
// Requires: git + gh on PATH (gh only for PR resolution).
// Zero-dep Node stdlib.
//
// Honest limits (v0):
//   - Shallow clone (--depth 1): pins needing git history are out of scope.
//   - No dependency install: if a runner needs node_modules absent in a fresh
//     clone, it is reported SKIPPED-DEPS, not emulated. (Installing to catch
//     phantom-RED is v1; v0 optimizes for zero side effects.)
//   - Runner discovery is convention-based (below), not config-file-complete.

import { execFileSync, execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

function sh(cmd, args, opts = {}) {
  try {
    const out = execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

function resolveHead(repo, pr) {
  const r = sh('gh', ['pr', 'view', String(pr), '--repo', repo, '--json', 'headRefName,headRepositoryOwner,headRepository', '--jq', '.headRefName']);
  if (r.code !== 0) throw new Error(`gh pr view failed: ${r.out.trim()}`);
  return r.out.trim();
}

function discover(dir) {
  const runners = [];
  const ls = (rel) => existsSync(join(dir, rel));
  // pins scripts (house convention)
  for (const f of sh('bash', ['-c', `ls ${JSON.stringify(dir)}/tests/pins*.sh ${JSON.stringify(dir)}/test/pins*.sh 2>/dev/null`]).out.trim().split('\n').filter(Boolean)) {
    runners.push({ name: `pins:${f.split('/').pop()}`, cmd: 'bash', args: [f] });
  }
  // test runners
  for (const rel of ['test/run.js', 'tests/run.js', 'test/run.mjs', 'run.js']) {
    if (ls(rel)) { runners.push({ name: `runner:${rel}`, cmd: 'node', args: [join(dir, rel)] }); break; }
  }
  // demos (must exit 0; output is the artifact)
  const demoGlob = sh('bash', ['-c', `ls ${JSON.stringify(dir)}/demo/*demo*.js ${JSON.stringify(dir)}/demo/*.mjs ${JSON.stringify(dir)}/demos/*demo*.js 2>/dev/null`]).out.trim().split('\n').filter(Boolean);
  for (const f of demoGlob.slice(0, 3)) runners.push({ name: `demo:${f.split('/').pop()}`, cmd: 'node', args: [f] });
  // npm test (only if node_modules already committed — fresh clones skip install, honest)
  if (ls('package.json')) {
    try {
      const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
      if (pkg.scripts?.test && ls('node_modules')) runners.push({ name: 'npm:test', cmd: 'npm', args: ['test'], cwd: dir });
    } catch {}
  }
  return runners;
}

function audit(dir, label) {
  const runners = discover(dir);
  const results = [];
  if (runners.length === 0) {
    results.push({ name: '(none discovered)', status: 'SKIP', detail: 'no pin/test conventions found' });
    return results;
  }
  for (const r of runners) {
    // Runner CWD is ALWAYS the audited checkout — never the caller's dir.
    // (A phantom pin resolved relative paths against the author's tree when
    // this was unset; caught by this suite's P2 at birth.)
    const res = sh(r.cmd, r.args, { cwd: r.cwd ?? dir });
    const status = res.code === 0 ? 'PASS' : 'FAIL';
    results.push({ name: r.name, status, code: res.code, tail: res.out.trim().split('\n').slice(-2).join(' | ') });
  }
  return results;
}

export { sh, discover, audit };

// CLI
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const argv = process.argv.slice(2);
  const mode = argv[0];
  try {
    if (mode === '--local') {
      const dir = argv[1];
      if (!dir || !existsSync(dir)) throw new Error('usage: --local <dir>');
      report(audit(dir, dir), dir);
    } else if (mode === '--branch') {
      const [repo, branch] = argv.slice(1);
      const dir = clone(repo, branch);
      try { report(audit(dir, `${repo}@${branch}`), `${repo}@${branch}`); } finally { rmSync(dir, { recursive: true, force: true }); }
    } else {
      const [repo, pr] = argv;
      if (!repo || !pr) throw new Error('usage: fresh-audit.mjs <owner/repo> <pr#> | --branch <repo> <branch> | --local <dir>');
      const branch = resolveHead(repo, pr);
      const dir = clone(repo, branch);
      try {
        console.log(`PR #${pr} head: ${branch}`);
        report(audit(dir, `${repo}#${pr}`), `${repo}#${pr}`);
      } finally { rmSync(dir, { recursive: true, force: true }); }
    }
  } catch (e) {
    console.error(`fresh-audit REFUSED: ${e.message}`);
    process.exit(2);
  }
}

function clone(repo, branch) {
  const dir = mkdtempSync(join(tmpdir(), 'fresh-audit-'));
  const r = sh('git', ['clone', '-q', '--depth', '1', '-b', branch, `https://github.com/${repo}`, dir]);
  if (r.code !== 0) { rmSync(dir, { recursive: true, force: true }); throw new Error(`clone failed: ${r.out.trim()}`); }
  return dir;
}

function report(results, label) {
  let fails = 0;
  console.log(`\nfresh-audit: ${label}`);
  for (const r of results) {
    if (r.status === 'FAIL') fails++;
    console.log(`${r.status.padEnd(4)} ${r.name}${r.code !== undefined ? ` (exit ${r.code})` : ''}${r.tail ? ` — ${r.tail.slice(0, 120)}` : ''}${r.detail ? ` — ${r.detail}` : ''}`);
  }
  const verdict = fails ? `${fails} RED in fresh clone — phantom-RED suspected if author tree was GREEN` : 'all discovered runners GREEN in fresh clone';
  console.log(`verdict: ${verdict}`);
  process.exitCode = fails ? 1 : 0;
}
