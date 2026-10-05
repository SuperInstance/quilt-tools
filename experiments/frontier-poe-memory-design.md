# FRONTIER DESIGN RECEIPT — Proof-of-Execution Memory as external prior for the witness lanes

Date: 2026-10-05 (snowball pulse, kimi1 lane)
Status: DESIGN DOC — every claim PENDING until it earns a receipt; kill switches in §5.
Provenance: edge-watch pulse 2026-10-04 18:23 (/tmp/edge-watch-latest.md chain,
queue file memory/snowball-queue.md). External identifiers cited as recorded there,
not re-fetched this pulse — each carries a kill switch if the citation drifted.

## 1. What was recorded (external priors, CITE NOT BUILD)

1. **arXiv 2608.16032 — "Proof-of-Execution Memory" (Aug 2026).** Recorded claim:
   anti-forged-reasoning via verifying *what actually executed*, not what an agent
   says it executed.
2. **arXiv 2606.04990 — evidence-tracing taxonomy** (memory-as-provenance survey).
   Recorded as: useful scaffold for fleet-witness writeups.
3. **arXiv 2605.11032 — Portable Agent Memory.** Recorded as: verify-first
   rehydration, consistent with the fleet's refusal-not-fake doctrine.

## 2. Why it matters to the fleet (honest delta, not flattery)

The fleet already builds the *internal* version of (1): MicroMoth-quilt cell
receipts (#33–#42 merged/queued stack — LINK/BIND/TICK/PROOF/EFFECT/WORLD/VIEW
cells, seeded replay, FORGET-as-erasable-cell), fleet-witness L2 anchors (#1)
and the L3 quorum client mechanism (#7, Casey-gated), and the fresh-audit loop
(quilt-tools#45 canonical tool, adopted 10/4 — a green run in the author's dirty
tree proves nothing; pins must run PRISTINE in a depth-1 clone).

Recorded delta the external prior would add, if the citation verifies:
- (1) names the *attack* our lanes defend against (forged reasoning about what
  ran) in academic vocabulary — a citation asset for ai-writings essay (c)
  "The Ledgered Shell" (already shipped, PR micrograd-quilt#6) and any future
  receipts-publication lane.
- (2) offers a taxonomy to name fleet-witness's layers without inventing words.
- (3) independently converges on verify-first rehydration — tidepool-moat
  confirmation, same class as the 09/25 edge-watch note.

Kill condition: if (1)'s abstract does not actually claim execution-verification
against forged reasoning, this doc's §2 collapses to a citation cleanup and the
doc should be deleted, not patched into something else.

## 3. What we do NOT do (pre-registered refusals)

- No code import. No dependency. No behavior change in any lane.
- No referral-graph node minted from an unverified external identifier.
  The graph's weight law applies to fleet repos; an external prior becomes a
  graph node only after a live re-fetch confirms the citation AND a fleet PR
  cites it in a merged target repo.
- No lane-priority change. This is a receipt, not a re-org.

## 4. Adoption surface if citation verifies (ranked, small-first)

1. One-line cite in fleet-witness docs/L3-QUORUM.md or the witnessing study
   intro ("external prior: execution-verified memory, arXiv 2608.16032") —
   docs-only, FAIL-first pin optional.
2. Vocabulary crosswalk (their taxonomy labels → our L0/L2/L3 layers) in the
   witnessing study — only if (2)'s taxonomy is real and public.
3. ai-writings essay (c) follow-up footnote — only if (1) verifies.

## 5. Kill switches

- KS1: arXiv ID 2608.16032 does not resolve or does not match the recorded
  claim → delete §2 bullet 1 and §4 items 1/3; keep nothing.
- KS2: 2606.04990 taxonomy not public → drop §4 item 2.
- KS3: 2605.11032 claims something other than verify-first rehydration →
  drop §2 bullet 3.
- KS4: any of the three starts shipping code that overlaps a fleet lane →
  escalate to edge-watch as a COLLISION note; moat review before any build.

## 6. Live verification receipt (2026-10-05 ~15:50 CST snowball pulse)

All three external identifiers re-fetched live from arxiv.org/abs/ this pulse.
Kill switches resolved:

- **KS1 PASS.** 2608.16032 resolves; abstract claims an HMAC-chained,
  tamper-evident ledger "of the safety steps that actually executed, writable
  only by the trusted action layer," allowing a skip only on confirmed real
  execution — exactly the recorded "verify what actually executed, not what an
  agent says it executed" claim (FARMA/SENTINEL/PoEM, v1 2026-08-17,
  v2 2026-08-29). §2 bullet 1 and §4 items 1/3 stand.
- **KS2 PASS.** 2606.04990 is public; it is an evidence-tracing / execution
  provenance survey with an explicit taxonomy (trace sources, evidence and
  execution units, provenance relations, granularity, representation forms,
  trust functions). §4 item 2 stands.
- **KS3 PASS.** 2605.11032 claims injection-resistant, capability-gated
  rehydration of agent memory across heterogeneous runtimes — verify-first
  rehydration as recorded. §2 bullet 3 stands.
- **KS4 note (watch, not trip).** 2605.11032 ships an Apache-2.0 Python SDK
  with Merkle-DAG provenance and 54 tests. Lane overlap check: it is a memory
  *portability* protocol (episodic/semantic/procedural transfer), NOT receipt
  witnessing or execution verification; tamper-evidence there is provenance
  linkage, not "did the step actually run." No collision with fleet-witness
  moat (witness semantics) or MicroMoth cell receipts. Classified:
  consume-don't-rival watch, same treatment as prior ledger-layer
  convergence notes (TierMem etc.).

Result: the design receipt stands unmodified; §4 adoption surface items 1-3
are now citation-verified and may be picked up by any lane as docs-only work.
