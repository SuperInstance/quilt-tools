// tools/fleet-witness/rfc6962.mjs — RFC 6962 Merkle tree over WAL rows.
// Pure stdlib. This is layer L1 of the witnessing study
// (memory/study/witnessing-study-2026-10-04.md): a plain hash chain proves
// row ORDER but not COMPLETENESS — clean suffix truncation verifies clean
// against a chain. The Merkle root binds (size, content); a checkpoint over
// the root, anchored outside the WAL, is what makes truncation loud.
//
// Algorithm (RFC 6962 §2.1, cited not recited):
//   LEAF(d)      = SHA-256(0x00 || d)
//   NODE(l, r)   = SHA-256(0x01 || l || r)
//   MTH({})      = SHA-256()                        (empty input)
//   MTH(D[0..n]) = NODE(MTH(D[0..k]), MTH(D[k..n]))  k = largest power of 2 < n
// Audit path per §2.1.1; consistency proof per §2.1.2.
//
// Scope honesty: the partial-data verifier requires the claimed NEW size n
// (carried by every checkpoint) — see verifyConsistencySized. Full-data
// callers can recompute roots directly and don't need proofs at all.

import { createHash } from 'node:crypto';

export function sha256(buf) { return createHash('sha256').update(buf).digest(); }
export const EMPTY_ROOT = sha256(Buffer.alloc(0)); // MTH({}) — pinned in tests

export function leafHash(data) {
  return sha256(Buffer.concat([Buffer.from([0x00]), Buffer.from(data)]));
}
export function nodeHash(l, r) {
  return sha256(Buffer.concat([Buffer.from([0x01]), l, r]));
}

// largest power of 2 strictly less than n (n >= 2)
export function splitK(n) { return 2 ** Math.floor(Math.log2(n - 1)); }

export function merkleRoot(leaves) {
  if (leaves.length === 0) return EMPTY_ROOT;
  if (leaves.length === 1) return leafHash(leaves[0]);
  const k = splitK(leaves.length);
  return nodeHash(merkleRoot(leaves.slice(0, k)), merkleRoot(leaves.slice(k)));
}

// Audit path for leaf index i (RFC §2.1.1).
export function auditPath(leaves, index) {
  const n = leaves.length;
  if (n <= 1) return [];
  const k = splitK(n);
  if (index < k) return [...auditPath(leaves.slice(0, k), index), merkleRoot(leaves.slice(k))];
  return [...auditPath(leaves.slice(k), index - k), merkleRoot(leaves.slice(0, k))];
}

// Fold leaf + audit path into a root. The path is ordered deepest-first
// (see auditPath's recursion) and consumed front-first via the same
// window logic — the fold is an exact mirror of the path generator.
export function foldAuditPath(leafIndex, n, leaf, path) {
  let pi = 0;
  const walk = (idx, nn) => {
    if (nn === 1) return leafHash(leaf);
    const k = splitK(nn);
    if (idx < k) {
      const left = walk(idx, k);
      if (pi >= path.length) throw new Error('foldAuditPath: path underflow');
      return nodeHash(left, path[pi++]);
    }
    if (pi >= path.length) throw new Error('foldAuditPath: path underflow');
    const right = walk(idx - k, nn - k);
    const leftRoot = path[pi++];
    return nodeHash(leftRoot, right);
  };
  return walk(leafIndex, n);
}

export function verifyInclusion(leafIndex, leaves, leaf, claimedRoot) {
  if (leafIndex < 0 || leafIndex >= leaves.length) return false;
  return foldAuditPath(leafIndex, leaves.length, leaf, auditPath(leaves, leafIndex)).equals(claimedRoot);
}

// Consistency proof PROOF(m, D[0..n]) (RFC §2.1.2) from full data.
export function consistencyProof(leaves, m) {
  const n = leaves.length;
  if (m > n) throw new Error('consistencyProof: m > n');
  if (m === n) return [];
  const k = splitK(n);
  if (m <= k) {
    return [...consistencyProof(leaves.slice(0, k), m), merkleRoot(leaves.slice(k))];
  }
  return [...consistencyProof(leaves.slice(k), m - k), merkleRoot(leaves.slice(0, k))];
}

// Partial-data verifier: knows ONLY the first m leaf datas + the proof +
// both claimed roots + the claimed new size n (from a checkpoint).
// Consumes proof hashes FRONT-first — exact mirror of consistencyProof's
// recursion (deepest-first generation order).
export function verifyConsistencySized(n, m, firstLeaves, proof, claimedOldRoot, claimedNewRoot) {
  if (m > n) return false;
  if (m === n) {
    return claimedOldRoot.equals(claimedNewRoot) && merkleRoot(firstLeaves).equals(claimedOldRoot);
  }
  if (firstLeaves.length !== m) return false;
  let pi = 0;
  const next = () => {
    if (pi >= proof.length) throw new Error('verifyConsistencySized: proof underflow');
    return proof[pi++];
  };
  // Exact replay of consistencyProof's recursion — every hash generation
  // appends is consumed in the same order. Do NOT 'optimize' by recomputing
  // known windows: that desyncs the proof stream (a real bug this suite
  // caught at birth).
  const walk = (start, nn, mm) => {
    if (mm === nn) return merkleRoot(firstLeaves.slice(start, start + nn));
    if (mm === 0) return next();
    const k = splitK(nn);
    if (mm <= k) {
      const left = walk(start, k, mm);
      const right = next();
      return nodeHash(left, right);
    }
    const right = walk(start + k, nn - k, mm - k);
    const left = next();
    return nodeHash(left, right);
  };
  const oldRoot = merkleRoot(firstLeaves);
  if (!oldRoot.equals(claimedOldRoot)) return false;
  let newRoot;
  try { newRoot = walk(0, n, m); } catch { return false; }
  return newRoot.equals(claimedNewRoot);
}
