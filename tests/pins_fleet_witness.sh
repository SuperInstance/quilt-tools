#!/usr/bin/env bash
# tests/pins_fleet_witness.sh — FAIL-first pins for tools/fleet-witness (L1).
# On main (tool absent) every pin is RED. On the fleet-witness-v0 branch:
# all pins GREEN. Canaries are marked; they are the hole-demonstrations,
# not defects.
set -u
cd "$(dirname "$0")/.."
PASS=0; FAIL=0
ok()  { PASS=$((PASS+1)); echo "PASS $1"; }
bad() { FAIL=$((FAIL+1)); echo "FAIL $1 — $2"; }

FW=tools/fleet-witness
[ -d "$FW" ] || { echo "fleet-witness absent (main): all pins RED"; exit 1; }

# ---------- P1: syntax ----------
if node --check "$FW/rfc6962.mjs" >/dev/null 2>&1 && \
   node --check "$FW/wal-chain.mjs" >/dev/null 2>&1 && \
   node --check "$FW/checkpoint.mjs" >/dev/null 2>&1 && \
   node --check "$FW/anchor.mjs" >/dev/null 2>&1 && \
   node --check "$FW/truncate-demo.mjs" >/dev/null 2>&1; then
  ok P1; else bad P1 "syntax check failed"; fi

# ---------- P2: RFC 6962 vectors + cross-language agreement ----------
# Python reference implementation (independent; same RFC text, different
# hands). Pins: empty-tree root, per-size roots for two data patterns,
# 0 <= n <= 8.
read -r -d '' PYREF <<'PY' || true
import hashlib, json, sys
def H(b): return hashlib.sha256(b).digest()
def leaf(d): return H(b"\x00" + d)
def node(l, r): return H(b"\x01" + l + r)
def k(n):
    p = 1
    while p * 2 < n: p *= 2
    return p
def root(ls):
    if not ls: return H(b"")
    if len(ls) == 1: return leaf(ls[0])
    kk = k(len(ls))
    return node(root(ls[:kk]), root(ls[kk:]))
pat = sys.argv[1]
leaves = [("%s-%d" % (pat, i)).encode() for i in range(9)]
out = {"empty": H(b"").hex(), "roots": [root(leaves[:n]).hex() for n in range(0, 9)]}
print(json.dumps(out))
PY

for PAT in alpha beta; do
  PY_OUT=$(python3 -c "$PYREF" "$PAT" 2>/dev/null | python3 -c "import json,sys; print(json.dumps(json.loads(sys.stdin.read()), sort_keys=True, separators=(',',':')))" 2>/dev/null) || { bad P2 "python reference failed"; break; }
  JS_OUT=$(node --input-type=module -e "
    import { merkleRoot, EMPTY_ROOT } from './$FW/rfc6962.mjs';
    const leaves = Array.from({length: 9}, (_, i) => Buffer.from('$PAT-' + i));
    const roots = Array.from({length: 9}, (_, n) => merkleRoot(leaves.slice(0, n)).toString('hex'));
    console.log(JSON.stringify({ empty: EMPTY_ROOT.toString('hex'), roots }));
  " 2>/dev/null | python3 -c "import json,sys; print(json.dumps(json.loads(sys.stdin.read()), sort_keys=True, separators=(',',':')))" 2>/dev/null) || { bad P2 "node reference failed"; break; }
  if [ "$PY_OUT" = "$JS_OUT" ]; then ok "P2-$PAT"; else bad "P2-$PAT" "py/js disagree"; fi
done

# ---------- P3: inclusion proofs, every index, n=7; tamper rejected ----------
node --input-type=module -e "
import { merkleRoot, verifyInclusion } from './$FW/rfc6962.mjs';
const leaves = Array.from({length: 7}, (_, i) => Buffer.from('inc-' + i));
const root = merkleRoot(leaves);
let allOk = true;
for (let i = 0; i < 7; i++) {
  if (!verifyInclusion(i, leaves, leaves[i], root)) allOk = false;
}
if (verifyInclusion(3, leaves, Buffer.from('FORGED'), root)) allOk = false;
if (!allOk) { console.error('inclusion failed'); process.exit(1); }
" >/dev/null 2>&1 && ok P3 || bad P3 "inclusion proofs broken"

# ---------- P4: consistency proofs roundtrip, 1<=m<n<=12; tamper rejected ----------
node --input-type=module -e "
import { merkleRoot, consistencyProof, verifyConsistencySized } from './$FW/rfc6962.mjs';
const leaves = Array.from({length: 12}, (_, i) => Buffer.from('con-' + i));
let okAll = true;
for (let n = 2; n <= 12; n++) {
  const fullRoot = merkleRoot(leaves.slice(0, n));
  for (let m = 1; m < n; m++) {
    const proof = consistencyProof(leaves.slice(0, n), m);
    const oldRoot = merkleRoot(leaves.slice(0, m));
    if (!verifyConsistencySized(n, m, leaves.slice(0, m), proof, oldRoot, fullRoot)) okAll = false;
  }
}
// tamper: m=4 vs n=8 proof presented against wrong old root must fail
const p = consistencyProof(leaves.slice(0, 8), 4);
if (verifyConsistencySized(8, 4, leaves.slice(0, 4), p, merkleRoot([Buffer.from('zzz')]), merkleRoot(leaves.slice(0, 8)))) okAll = false;
// underflow: empty proof against real roots must fail
if (verifyConsistencySized(8, 4, leaves.slice(0, 4), [], merkleRoot(leaves.slice(0, 4)), merkleRoot(leaves.slice(0, 8)))) okAll = false;
if (!okAll) { console.error('consistency failed'); process.exit(1); }
" >/dev/null 2>&1 && ok P4 || bad P4 "consistency proofs broken"

# ---------- P5: checkpoint sign/verify roundtrip; wrong key + tamper rejected ----------
node --input-type=module -e "
import { generateKeyPairSync } from 'node:crypto';
import { signCheckpoint, verifyCheckpoint } from './$FW/checkpoint.mjs';
const a = generateKeyPairSync('ed25519'), b = generateKeyPairSync('ed25519');
const note = signCheckpoint(42, 'ab'.repeat(32), a.privateKey.export({type:'pkcs8',format:'pem'}), 'k1');
const v = verifyCheckpoint(note, a.publicKey.export({type:'spki',format:'pem'}));
if (v.size !== 42 || v.rootHex !== 'ab'.repeat(32) || v.keyName !== 'k1') throw new Error('roundtrip fields');
let threw = 0;
try { verifyCheckpoint(note, b.publicKey.export({type:'spki',format:'pem'})); } catch { threw++; }
try { verifyCheckpoint(note.replace('ab'.repeat(32), 'cd'.repeat(32)), a.publicKey.export({type:'spki',format:'pem'})); } catch { threw++; }
if (threw !== 2) throw new Error('forgery accepted');
" >/dev/null 2>&1 && ok P5 || bad P5 "checkpoint sign/verify broken"

# ---------- P6: the sales artifact — truncation caught ----------
node "$FW/truncate-demo.mjs" >/dev/null 2>&1 && ok P6 || bad P6 "truncate-demo did not catch"

# ---------- P7 (canary): L0 alone is blind to truncation — DOCUMENTED hole ----------
# A truncated ledger MUST still pass verifyChain (otherwise L0 would be
# doing L1's job and the demo's premise would be wrong).
node --input-type=module -e "
import { chainRows, verifyChain } from './$FW/wal-chain.mjs';
const rows = chainRows([1,2,3,4,5].map(i => ({op:'seal', seq:i})));
const cut = rows.slice(0, 3);
if (!verifyChain(cut).ok) { console.error('L0 unexpectedly caught truncation'); process.exit(1); }
// ...but an EDITED row must still be caught by L0 (its actual job):
const tampered = rows.map((r, i) => i === 1 ? { ...r, seq: 999 } : r);
if (verifyChain(tampered).ok) { console.error('L0 missed an edit — that WOULD be a defect'); process.exit(1); }
" >/dev/null 2>&1 && ok P7 || bad P7 "canary premise broken"

# ---------- P8: anchor channel end-to-end — truncation AND rollback caught ----------
node --input-type=module -e "
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { generateKeyPairSync } from 'node:crypto';
import { merkleRoot } from './$FW/rfc6962.mjs';
import { chainRows, verifyChain, canon } from './$FW/wal-chain.mjs';
import { signCheckpoint } from './$FW/checkpoint.mjs';
import { anchorCheckpoint, auditAgainstAnchor } from './$FW/anchor.mjs';
const keys = generateKeyPairSync('ed25519');
const priv = keys.privateKey.export({type:'pkcs8',format:'pem'});
const pub = keys.publicKey.export({type:'spki',format:'pem'});
const repo = mkdtempSync('/tmp/fw-anchor-');
execFileSync('git', ['init','-q',repo]);
const g = (args) => execFileSync('git', ['-C', repo, ...args], {stdio:'pipe'});
g(['add','.']); g(['-c','user.name=t','-c','user.email=t@t','commit','-q','--allow-empty','-m','init']);
const mk = (n) => chainRows(Array.from({length:n},(_,i)=>({op:'seal',seq:i+1})));
const rootOf = (rows) => merkleRoot(rows.map(r=>Buffer.from(canon(r),'utf8'))).toString('hex');
const note = (n) => signCheckpoint(n, rootOf(mk(n)), priv, 'pin-key');
anchorCheckpoint(repo, 'demo', note(5));
anchorCheckpoint(repo, 'demo', note(7));
const audit7 = auditAgainstAnchor(repo, 'demo', 7, rootOf(mk(7)), pub);
if (!audit7.ok) throw new Error('fresh anchor should verify: ' + audit7.reason);
// attack 1: truncation to 3
if (auditAgainstAnchor(repo, 'demo', 3, rootOf(mk(3)), pub).ok) throw new Error('truncation NOT caught');
// attack 2: ROLLBACK — old valid 5-row state (chains fine at L0, anchor must reject)
if (!verifyChain(mk(5)).ok) throw new Error('rollback premise broken');
if (auditAgainstAnchor(repo, 'demo', 5, rootOf(mk(5)), pub).ok) throw new Error('rollback NOT caught');
// attack 3: forged LATEST (signature broken)
writeFileSync(join(repo,'checkpoints','demo','LATEST'), note(7).replace(/—.*/s, '—AAAA'));
if (auditAgainstAnchor(repo, 'demo', 7, rootOf(mk(7)), pub).ok) throw new Error('forged anchor accepted');
" >/dev/null 2>&1 && ok P8 || bad P8 "anchor channel missed an attack class"

echo "fleet-witness pins: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
