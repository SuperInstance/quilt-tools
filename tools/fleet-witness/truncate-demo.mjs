// tools/fleet-witness/truncate-demo.mjs — THE HONESTY DEMO (witnessing study
// item 4: "This demo IS the sales artifact"). Builds a synthetic fleet WAL,
// anchors a signed checkpoint at its full size, deletes the last N rows —
// then shows BOTH:
//   (1) layer-0 chain still verifies on the truncated ledger (silent), AND
//   (2) the anchored checkpoint audit FAILS LOUD (size + root mismatch).
// Exits 0 iff the catch works; 1 otherwise. Failing here would mean the
// whole witnessing layer is theater.

import { generateKeyPairSync } from 'node:crypto';
import { merkleRoot } from './rfc6962.mjs';
import { chainRows, verifyChain, canon } from './wal-chain.mjs';
import { signCheckpoint, verifyCheckpoint } from './checkpoint.mjs';

const FULL = 10;      // rows at anchor time
const CUT = 3;        // rows an attacker deletes (clean suffix truncation)

function rowDatas(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push({ op: 'seal', lane: 'truncate-demo', seq: i, note: `row ${i} of ${n}` });
  }
  return out;
}

const keys = generateKeyPairSync('ed25519');
const pubPem = keys.publicKey.export({ type: 'spki', format: 'pem' });

// 1. build + anchor at FULL
const fullRows = chainRows(rowDatas(FULL));
const fullLeafBytes = fullRows.map((r) => Buffer.from(canon(r), 'utf8'));
const rootFull = merkleRoot(fullLeafBytes);
const note = signCheckpoint(FULL, rootFull.toString('hex'), keys.privateKey.export({ type: 'pkcs8', format: 'pem' }), 'demo-key');

// 2. truncate: attacker deletes last CUT rows, presents the file as genuine
const truncated = fullRows.slice(0, FULL - CUT);
const chainAfter = verifyChain(truncated);

// 3. audit: recompute root over the PRESENTED ledger, compare vs anchor
let auditVerdict;
try {
  const presentedLeafBytes = truncated.map((r) => Buffer.from(canon(r), 'utf8'));
  const presentedRoot = merkleRoot(presentedLeafBytes);
  const anchor = verifyCheckpoint(note, pubPem); // signature still valid: attacker can't resign
  const sizeOk = anchor.size === truncated.length;
  const rootOk = anchor.rootHex === presentedRoot.toString('hex');
  auditVerdict = { sizeOk, rootOk, anchorSize: anchor.size, presentedSize: truncated.length };
} catch (e) {
  auditVerdict = { error: e.message };
}

const l0Silent = chainAfter.ok === true;                       // the hole
const caught = auditVerdict.sizeOk === false || auditVerdict.rootOk === false; // the fix

console.log(`ledger anchored at : ${FULL} rows`);
console.log(`attacker cut       : last ${CUT} rows (clean suffix truncation)`);
console.log(`L0 chain on cut    : ${chainAfter.ok ? 'VERIFIES (silent — the hole)' : 'BROKEN'}`);
console.log(`L1+L2 audit        : size ${auditVerdict.presentedSize ?? '?'} vs anchored ${auditVerdict.anchorSize ?? '?'} — ` +
  `${caught ? 'CAUGHT (loud)' : 'MISSED'}`);

if (l0Silent && caught) {
  console.log('TRUNCATE-DEMO: chain verifies on truncated ledger AND checkpoint audit caught it — the witnessing layer earns its keep.');
  process.exit(0);
} else {
  console.log('TRUNCATE-DEMO: FAIL — either L0 caught it (unexpected) or L1+L2 missed it (theater).');
  process.exit(1);
}
