// tools/fleet-witness/wal-chain.mjs — the fleet's layer-0 ledger idiom
// (five-opcode, fnv1a-64, prev-link) as used by quilt-cortex/quilt-murmur
// receipts and micrograd-quilt receipts/spec-prereg.jsonl. Layer L0:
// tamper-LOUD for edit/insert, silent for clean suffix truncation — which
// is exactly the property the Merkle layer above exists to close.

// canonical JSON: sorted object keys, compact separators (the house
// canonicalization; mirrors spec_prereg.py).
export function canon(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(canon).join(',') + ']';
  const keys = Object.keys(value).sort();
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + canon(value[k])).join(',') + '}';
}

// fnv1a-64 over utf8, 16-hex lowercase, BigInt-exact.
export function fnv1a64(str) {
  let h = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  for (const byte of Buffer.from(str, 'utf8')) {
    h ^= BigInt(byte);
    h = (h * prime) & 0xffffffffffffffffn;
  }
  return h.toString(16).padStart(16, '0');
}

export const GENESIS = '0'.repeat(16);

// chain a batch of bodies into genesis-anchored ledger rows
export function chainRows(bodies) {
  const rows = [];
  let prev = GENESIS;
  for (const body of bodies) {
    const chain = fnv1a64(prev + ':' + canon(body));
    rows.push({ ...body, chain });
    prev = chain;
  }
  return rows;
}

// verify the chain (L0). Returns {ok, brokenAt} — and NOTE: a truncated
// suffix still verifies; that is the hole, demonstrated in truncate-demo.
export function verifyChain(rows) {
  let prev = GENESIS;
  for (let i = 0; i < rows.length; i++) {
    const { chain, ...body } = rows[i];
    if (fnv1a64(prev + ':' + canon(body)) !== chain) {
      return { ok: false, brokenAt: i };
    }
    prev = chain;
  }
  return { ok: true, brokenAt: -1 };
}
