// tools/fleet-witness/anchor.mjs — L2 anchor channel: checkpoint notes committed
// into a WITNESS REPO's git history (different trust domain than the ledger:
// tampering with the ledger can't rewrite an already-committed note, and
// tampering with the witness repo is detectable to any retainer via reflog —
// documented honestly in the study: git-as-broadcast protects retainers, not
// newcomers; L3 witness quorum is the newcomer fix).
//
// Layout inside the witness repo:
//   checkpoints/<ledger-slug>/notes.log   — append-only note history (one note each)
//   checkpoints/<ledger-slug>/LATEST      — copy of the newest note (audit reads this)
//
// Audit rule: the LATEST note pins the newest (size, root). A presented ledger
// that chains-verifies but is SHORTER than the anchor (rollback to an old
// valid state) or has a different root (truncation + rewrite) both FAIL here —
// two attack classes layer 0 cannot see.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { verifyCheckpoint } from './checkpoint.mjs';

export function slugify(name) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'ledger';
}

export function anchorCheckpoint(witnessRepoDir, ledgerName, noteText) {
  const dir = join(witnessRepoDir, 'checkpoints', slugify(ledgerName));
  mkdirSync(dir, { recursive: true });
  const notes = join(dir, 'notes.log');
  const latest = join(dir, 'LATEST');
  writeFileSync(notes, noteText, { flag: 'a' });
  writeFileSync(latest, noteText);
  const msg = `anchor: ${slugify(ledgerName)} checkpoint (fleet-witness L2)`;
  execFileSync('git', ['-C', witnessRepoDir, 'add', '.'], { stdio: 'pipe' });
  execFileSync('git', ['-C', witnessRepoDir, 'commit', '-m', msg], { stdio: 'pipe' });
  return { notes, latest };
}

// Returns {ok, reason, anchorSize, presentedSize, anchorRoot, presentedRoot}.
export function auditAgainstAnchor(witnessRepoDir, ledgerName, presentedSize, presentedRootHex, publicKeyPem) {
  const latest = join(witnessRepoDir, 'checkpoints', slugify(ledgerName), 'LATEST');
  if (!existsSync(latest)) return { ok: false, reason: 'no anchor present' };
  let anchor;
  try {
    anchor = verifyCheckpoint(readFileSync(latest, 'utf8'), publicKeyPem);
  } catch (e) {
    return { ok: false, reason: `anchor signature invalid: ${e.message}` };
  }
  const root = presentedRootHex.toLowerCase();
  if (anchor.size !== presentedSize) {
    return {
      ok: false, reason: `size mismatch: anchor pins ${anchor.size}, presented ${presentedSize}`,
      anchorSize: anchor.size, presentedSize, anchorRoot: anchor.rootHex, presentedRoot: root,
    };
  }
  if (anchor.rootHex !== root) {
    return {
      ok: false, reason: 'root mismatch: presented ledger does not match anchored checkpoint',
      anchorSize: anchor.size, presentedSize, anchorRoot: anchor.rootHex, presentedRoot: root,
    };
  }
  return { ok: true, anchorSize: anchor.size, presentedSize, anchorRoot: anchor.rootHex, presentedRoot: root };
}
