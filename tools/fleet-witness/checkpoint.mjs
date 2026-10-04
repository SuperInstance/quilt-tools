// tools/fleet-witness/checkpoint.mjs — C2SP-shaped signed checkpoint note
// over a WAL's Merkle root. Layer L2 needs the note to LEAVE the operator:
// anchoring it into a different trust domain is the second window of this
// build (git channel); this module is the note itself + verify.
//
// Format (C2SP tlog-checkpoint shaped; per the witnessing study we do NOT
// claim byte-level C2SP interop until tested — the shape is adopted, the
// origin name is ours):
//
//   superinstance/fleet-wal/v1
//   <size decimal>
//   <root hex sha256>
//
//   <keyname>—<base64 ed25519 signature over everything above, blank line included>
//
// Signature covers "origin\nsize\nroot\n\n" — i.e. the note up to and
// including the blank line, exactly as C2SP specifies.

import { sign as cSign, verify as cVerify } from 'node:crypto';

export const ORIGIN = 'superinstance/fleet-wal/v1';

export function checkpointText(size, rootHex) {
  return `${ORIGIN}\n${size}\n${rootHex}\n\n`;
}

export function signCheckpoint(size, rootHex, privateKeyPem, keyName) {
  const body = checkpointText(size, rootHex);
  const sig = cSign(null, Buffer.from(body, 'utf8'), privateKeyPem);
  return body + `${keyName}—${sig.toString('base64')}\n`;
}

// Returns {size, rootHex, keyName} or throws on bad signature/parse.
export function verifyCheckpoint(noteText, publicKeyPem) {
  const parts = noteText.split('\n');
  if (parts.length < 5) throw new Error('verifyCheckpoint: malformed note');
  const [origin, sizeStr, rootHex, blank, sigLine] = [
    parts[0], parts[1], parts[2], parts[3], parts[4],
  ];
  if (origin !== ORIGIN) throw new Error(`verifyCheckpoint: bad origin ${origin}`);
  if (blank !== '') throw new Error('verifyCheckpoint: missing blank line');
  const sep = sigLine.indexOf('—');
  if (sep < 1) throw new Error('verifyCheckpoint: malformed signature line');
  const keyName = sigLine.slice(0, sep);
  const sig = Buffer.from(sigLine.slice(sep + 1), 'base64');
  const body = `${origin}\n${sizeStr}\n${rootHex}\n\n`;
  const ok = cVerify(null, Buffer.from(body, 'utf8'), publicKeyPem, sig);
  if (!ok) throw new Error('verifyCheckpoint: signature mismatch');
  const size = parseInt(sizeStr, 10);
  if (!Number.isInteger(size) || size < 0) throw new Error('verifyCheckpoint: bad size');
  return { size, rootHex: rootHex.toLowerCase(), keyName };
}
