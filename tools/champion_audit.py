#!/usr/bin/env python3
"""champion_audit -- audit a repo's claim ledgers against their cited proofs.

Generalizes the champion-integrity auditor from SuperInstance/coev
(src/audit.js), which itself was extracted from the pong-quilt R53/R54
incident: a "continued training" run shipped a champion claiming fitness
**1259.1** that actually benched **239.6**. Every ledger row chained cleanly.
The lie was not in the chain; it was in the claim each row carried.

Doctrine this tool enforces: **a ledger of receipts is not evidence the
receipts are true.** Claims must survive contact with their proofs. Where a
proof is cheap to re-execute, re-execute it. Where a proof artifact is newer
than the receipt citing it, say the claim may be stale. Where nothing can be
checked, say so out loud and count it -- never silently.

Claim grammar (one claim per line, keywords case-insensitive):

    claim(name): NUMBER proof: PATH [key: dot.path] [tol: RELTOL] [cmd: COMMAND]

    claim:            the asserted number (float literal)
    name              optional label, claim(champion-fitness)
    proof: PATH       proof artifact, relative to repo root (required for any
                      verdict beyond UNVERIFIABLE)
    key: dot.path     optional dot-path into a JSON artifact (mean.fitness,
                      runs[0]); without it, all numbers in the artifact are
                      considered
    tol: RELTOL       optional per-claim relative tolerance override
    cmd: COMMAND      optional re-exec command; argv-parsed with shlex and run
                      WITHOUT a shell (house law), cwd = repo root. The LAST
                      number on stdout is the measured value.

Verdicts (the coev vocabulary, mapped to receipts-at-rest):
    PROOF-OK        artifact exists and the number matches within tolerance
                    (re-executed when a cmd is recorded and --reexec is set)
    HOLLOW          claimed number diverges beyond tolerance from the proof
                    artifact or re-executed measurement -- both numbers named
    STALE           numbers agree, but the artifact is NEWER than the receipt:
                    the claim may be outdated (filesystem-truth, not git-truth)
    NO-ARTIFACT     the cited proof does not exist
    UNVERIFIABLE    no proof cited, or no number extractable -- honest skip,
                    counted, never silent

Comparison is coev's relative error: |claim - measured| / max(|claim|, 1).
Default tolerance 1e-6: tight, because artifact-at-rest comparison is
deterministic. For stochastic re-execution (noisy benchmarks), raise it --
coev uses 0.05 for K-game suites.

Exit codes: 0 all claims verified (or none found, loudly) · 1 findings
(HOLLOW/STALE/NO-ARTIFACT) · 2 usage or malformed input (fail loud, rc=2).

Usage:
    python3 tools/champion_audit.py <repo-root> [--tolerance 1e-6]
        [--pattern P ...] [--reexec] [--reexec-timeout S] [--out-json R]
        [--verbose]

Worked example (the planted hollow champion):
    $ mkdir -p artifacts
    $ echo 'measured champion fitness: 239.6' > artifacts/champ_bench.txt
    $ echo '- claim(champion): 1259.1 proof: artifacts/champ_bench.txt' >> RESULTS.md
    $ python3 tools/champion_audit.py .
    -> HOLLOW claim(champion) claimed 1259.1 vs measured 239.6 (rel err 8.1e-01)
    -> exit 1

Limitations, stated plainly: staleness is filesystem mtime, not git history
(fresh clones reset mtimes and can hide or fake staleness); number extraction
from free text is deliberately dumb (last/all numeric tokens, no semantics);
re-exec runs commands recorded in the repo's ledgers -- read them before
trusting --reexec; a claim in a file not matched by the scan patterns is
invisible to this tool.
"""
from __future__ import annotations

import argparse
import datetime
import fnmatch
import hashlib
import json
import os
import re
import shlex
import subprocess
import sys
import tempfile

DEFAULT_PATTERNS = ["RESULTS.md", "RECEIPT*.md", "PIN*.md", "*.pins"]
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv", "venv", ".pytest_cache"}
STALE_EPSILON_S = 1.0  # grace so a same-write artifact+receipt pair isn't flagged

NUM_RE = re.compile(r"[-+]?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?")
CLAIM_RE = re.compile(
    r"(?i)\bclaim(?:\((?P<name>[^)]*)\))?\s*(?::|=)\s*"
    r"(?P<num>[-+]?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?)")
PROOF_RE = re.compile(r"(?i)\bproof\s*:\s*(\S+)")
KEY_RE = re.compile(r"(?i)\bkey\s*:\s*([\w.\[\]-]+)")
TOL_RE = re.compile(r"(?i)\btol\s*:\s*([-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?\d+)?)")
CMD_RE = re.compile(r"(?i)\bcmd\s*:\s*(.+)$")

PROOF_OK, HOLLOW, STALE, NO_ARTIFACT, UNVERIFIABLE = (
    "PROOF-OK", "HOLLOW", "STALE", "NO-ARTIFACT", "UNVERIFIABLE")
FINDING_VERDICTS = {HOLLOW, STALE, NO_ARTIFACT}


def fail_input(msg: str) -> None:
    sys.stderr.write(f"FAIL-INPUT: {msg}\n")
    sys.exit(2)


def fmt(v: float) -> str:
    return f"{v:.8g}"


def iso(ts: float) -> str:
    return datetime.datetime.fromtimestamp(ts, datetime.timezone.utc).isoformat(
        timespec="seconds")


def rel_err(claim: float, measured: float) -> float:
    return abs(claim - measured) / max(abs(claim), 1.0)


def atomic_write_json(path: str, data: dict) -> None:
    """House style: temp + fsync + rename. Fail loud on any error."""
    d = os.path.dirname(os.path.abspath(path)) or "."
    try:
        os.makedirs(d, exist_ok=True)
        fd, tmp = tempfile.mkstemp(dir=d, prefix=".champion_audit_", suffix=".tmp")
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=1, sort_keys=True)
            f.write("\n")
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    except OSError as e:
        fail_input(f"cannot write --out-json {path}: {e}")


def iter_ledger_files(root: str, patterns: list):
    """Yield repo-relative posix paths whose basename or relpath matches a pattern."""
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = sorted(d for d in dirnames if d not in SKIP_DIRS)
        for fn in sorted(filenames):
            rel = os.path.relpath(os.path.join(dirpath, fn), root).replace(os.sep, "/")
            if any(fnmatch.fnmatch(rel, p) or fnmatch.fnmatch(fn, p) for p in patterns):
                yield rel


def parse_claims(text: str, rel_ledger: str) -> list:
    """Extract claim rows from one ledger. One claim per line."""
    claims = []
    for lineno, line in enumerate(text.splitlines(), 1):
        m = CLAIM_RE.search(line)
        if not m:
            continue
        rest = line[m.end():]
        proof = PROOF_RE.search(rest)
        key = KEY_RE.search(rest)
        tol = TOL_RE.search(rest)
        cmd = CMD_RE.search(rest)
        claims.append({
            "ledger": rel_ledger,
            "line": lineno,
            "name": (m.group("name") or "").strip() or None,
            "claim": float(m.group("num")),
            "proof": proof.group(1) if proof else None,
            "key": key.group(1) if key else None,
            "tol": float(tol.group(1)) if tol else None,
            "cmd": cmd.group(1).strip() if cmd else None,
        })
    return claims


def json_walk_numbers(node, out: list) -> None:
    if isinstance(node, bool):  # bool is an int subclass; never a measurement
        return
    if isinstance(node, (int, float)):
        out.append(float(node))
    elif isinstance(node, dict):
        for v in node.values():
            json_walk_numbers(v, out)
    elif isinstance(node, list):
        for v in node:
            json_walk_numbers(v, out)


def json_dig(node, dotpath: str):
    cur = node
    for part in dotpath.split("."):
        m = re.fullmatch(r"([\w-]+)(?:\[(\d+)\])?", part)
        if not m:
            return None, f"bad key segment {part!r}"
        name, idx = m.group(1), m.group(2)
        if isinstance(cur, dict) and name in cur:
            cur = cur[name]
        else:
            return None, f"key {name!r} not found"
        if idx is not None:
            i = int(idx)
            if isinstance(cur, list) and 0 <= i < len(cur):
                cur = cur[i]
            else:
                return None, f"index [{i}] out of range"
    if isinstance(cur, bool) or not isinstance(cur, (int, float)):
        return None, f"key {dotpath!r} is not numeric"
    return float(cur), None


def measure_from_artifact(artifact_path: str, key: str | None):
    """-> (measured | None, note). Tries JSON first, then plain text."""
    try:
        with open(artifact_path, "r", encoding="utf-8") as f:
            raw = f.read()
    except (UnicodeDecodeError, OSError) as e:
        return None, f"artifact unreadable as text: {e}"
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        data = None
    if data is not None:
        if key:
            return json_dig(data, key)
        nums = []
        json_walk_numbers(data, nums)
        return (nums if nums else None), (None if nums else "JSON artifact has no numbers")
    if key:
        return None, f"key {key!r} ignored: artifact is not JSON"
    nums = [float(x) for x in NUM_RE.findall(raw)]
    return (nums if nums else None), (None if nums else "artifact has no numbers")


def best_match(claim: float, candidates: list, tolerance: float):
    """-> (measured, ok, rel) picking the candidate closest to the claim."""
    best = min(candidates, key=lambda c: abs(c - claim))
    rel = rel_err(claim, best)
    return best, rel <= tolerance, rel


def reexec_measure(root: str, cmd: str, timeout: int):
    """Run a recorded command argv-style (NO shell, house law). -> (num|None, note)."""
    try:
        argv = shlex.split(cmd)
    except ValueError as e:
        return None, f"reexec skipped: unparseable cmd ({e})"
    if not argv:
        return None, "reexec skipped: empty cmd"
    try:
        r = subprocess.run(argv, cwd=root, capture_output=True, text=True,
                           timeout=timeout)
    except subprocess.TimeoutExpired:
        return None, f"reexec timed out after {timeout}s"
    except OSError as e:
        return None, f"reexec failed to launch: {e}"
    if r.returncode != 0:
        return None, f"reexec exited rc={r.returncode}"
    nums = NUM_RE.findall(r.stdout)
    if not nums:
        return None, "reexec produced no number on stdout"
    return float(nums[-1]), None  # convention: measured value printed last


def audit_claim(root: str, c: dict, tolerance: float, do_reexec: bool,
                reexec_timeout: int, ledger_mtime: float) -> dict:
    """Classify one claim. Verdict precedence: NO-ARTIFACT > HOLLOW > STALE
    > PROOF-OK, with UNVERIFIABLE where nothing checkable exists."""
    row = dict(c)
    row["tolerance"] = c["tol"] if c["tol"] is not None else tolerance
    row["verdict"] = None
    row["measured"] = None
    row["measure_source"] = None
    row["rel_err"] = None
    row["notes"] = []

    label = f"claim({c['name']})" if c["name"] else "claim"

    if c["proof"] is None:
        row["verdict"] = UNVERIFIABLE
        row["notes"].append("no proof: cited and no cmd: recorded — honest skip, not a pass")
        return row

    artifact_path = os.path.normpath(
        os.path.join(root, c["proof"]) if not os.path.isabs(c["proof"]) else c["proof"])
    if not os.path.isfile(artifact_path):
        row["verdict"] = NO_ARTIFACT
        row["notes"].append(f"cited proof does not exist: {c['proof']}")
        return row
    try:
        with open(artifact_path, "rb") as f:
            row["artifact_sha256"] = hashlib.sha256(f.read()).hexdigest()[:12]
        row["artifact_mtime"] = iso(os.stat(artifact_path).st_mtime)
    except OSError as e:
        row["notes"].append(f"could not stat artifact: {e}")

    # strongest evidence first: re-executed measurement (only with --reexec)
    if do_reexec and c["cmd"]:
        num, note = reexec_measure(root, c["cmd"], reexec_timeout)
        if note:
            row["notes"].append(note)
        if num is not None:
            row["measured"], row["measure_source"] = num, "reexec"

    # otherwise (or as fallback): the artifact at rest
    if row["measured"] is None:
        nums, note = measure_from_artifact(artifact_path, c["key"])
        if note:
            row["notes"].append(note)
        if nums:
            best, ok, rel = best_match(c["claim"], nums, row["tolerance"])
            row["measured"], row["measure_source"], row["rel_err"] = best, "artifact", rel
            if not ok:
                row["verdict"] = HOLLOW
                row["notes"].append(
                    f"no artifact number within tolerance {fmt(row['tolerance'])} "
                    f"of claim (closest shown)")
                return row
        else:
            row["verdict"] = UNVERIFIABLE
            row["notes"].append("artifact exists but yields no number to check"
                                + ("" if not c["cmd"] else
                                   " and re-exec did not produce one (run with --reexec)"))
            return row

    rel = row["rel_err"] if row["rel_err"] is not None else rel_err(c["claim"], row["measured"])
    row["rel_err"] = rel
    if rel > row["tolerance"]:
        row["verdict"] = HOLLOW
        return row

    # numbers agree — but is the proof older than the claim?
    art_mtime = os.stat(artifact_path).st_mtime
    if art_mtime - ledger_mtime > STALE_EPSILON_S:
        row["verdict"] = STALE
        row["notes"].append(
            f"proof artifact written {iso(art_mtime)}, AFTER the receipt "
            f"({iso(ledger_mtime)}) — claim may be outdated (filesystem-truth, not git-truth)")
        return row

    row["verdict"] = PROOF_OK
    return row


def main() -> None:
    ap = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("repo", help="repo root whose claim ledgers should be audited")
    ap.add_argument("--tolerance", type=float, default=1e-6,
                    help="default relative tolerance |claim-measured|/max(|claim|,1) "
                         "(default: 1e-6 — tight, for deterministic artifact-at-rest "
                         "comparison; raise to ~0.05 for stochastic re-execution)")
    ap.add_argument("--pattern", action="append", default=None, metavar="GLOB",
                    help="ledger filename pattern (repeatable; default: "
                         + " ".join(DEFAULT_PATTERNS) + ")")
    ap.add_argument("--reexec", action="store_true",
                    help="execute recorded cmd: lines (argv-parsed, NO shell, "
                         "cwd=repo root). Read the ledgers first — this runs them.")
    ap.add_argument("--reexec-timeout", type=int, default=60, metavar="S",
                    help="per-command timeout for --reexec (default 60s)")
    ap.add_argument("--out-json", metavar="PATH",
                    help="also write the machine report here (atomic write)")
    ap.add_argument("--verbose", action="store_true",
                    help="print provenance lines even for PROOF-OK rows")
    a = ap.parse_args()

    if a.tolerance < 0:
        fail_input(f"--tolerance must be >= 0, got {a.tolerance}")
    if a.reexec_timeout <= 0:
        fail_input(f"--reexec-timeout must be > 0, got {a.reexec_timeout}")
    root = a.repo
    if not os.path.isdir(root):
        fail_input(f"repo root is not a directory: {root}")
    patterns = a.pattern if a.pattern else DEFAULT_PATTERNS

    generated = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")
    report = {
        "tool": "champion_audit", "doctrine": "a ledger of receipts is not "
        "evidence the receipts are true",
        "generated": generated, "repo": os.path.abspath(root),
        "tolerance": a.tolerance, "reexec": a.reexec, "patterns": patterns,
        "ledgers_scanned": 0, "files_scanned": 0, "claims": [],
        "summary": {"total": 0, "proof_ok": 0, "hollow": 0,
                    "stale": 0, "no_artifact": 0, "unverifiable": 0},
    }

    def skey(verdict: str) -> str:
        return verdict.lower().replace("-", "_")

    for rel in iter_ledger_files(root, patterns):
        report["files_scanned"] += 1
        path = os.path.join(root, rel)
        try:
            with open(path, "r", encoding="utf-8") as f:
                text = f.read()
            ledger_mtime = os.stat(path).st_mtime
        except (UnicodeDecodeError, OSError) as e:
            fail_input(f"cannot read matched ledger {rel}: {e}")
        claims = parse_claims(text, rel)
        if not claims:
            continue
        report["ledgers_scanned"] += 1
        for c in claims:
            row = audit_claim(root, c, a.tolerance, a.reexec,
                              a.reexec_timeout, ledger_mtime)
            report["claims"].append(row)
            report["summary"]["total"] += 1
            report["summary"][skey(row["verdict"])] += 1

    # ---- human report -------------------------------------------------
    print(f"champion_audit — {report['repo']}")
    print(f"doctrine: a ledger of receipts is not evidence the receipts are true")
    print(f"tolerance: {fmt(a.tolerance)} (relative)  reexec: "
          f"{'on' if a.reexec else 'off'}  patterns: {' '.join(patterns)}")
    print(f"scanned {report['files_scanned']} file(s), "
          f"{report['ledgers_scanned']} ledger(s) with claims")
    print()
    if report["summary"]["total"] == 0:
        print("NO CLAIMS FOUND — nothing audited. A quiet repo is not a "
              "verified repo; ledgers using the claim grammar are required "
              "for anything to be checked.")
    for row in report["claims"]:
        label = f"claim({row['name']})" if row["name"] else "claim"
        loc = f"{row['ledger']}:{row['line']}"
        head = f"[{row['verdict']}] {label} {fmt(row['claim'])}  ({loc})"
        if row["verdict"] in (HOLLOW, STALE, NO_ARTIFACT) or a.verbose:
            print(head)
            if row["measured"] is not None:
                src = row.get("measure_source")
                print(f"    claimed {fmt(row['claim'])}  vs  measured "
                      f"{fmt(row['measured'])}  (src={src}, rel err {fmt(row['rel_err'])})")
            for n in row["notes"]:
                print(f"    note: {n}")
        else:
            if row["verdict"] == PROOF_OK:
                print(f"{head} — proof {row['proof']} holds"
                      + (f" (src={row.get('measure_source')})" if row.get("measure_source") else ""))
            else:  # UNVERIFIABLE — honest skip, but say why out loud
                print(head)
                for n in row["notes"]:
                    print(f"    note: {n}")
    print()
    print(f"SUMMARY — claims audited: {report['summary']['total']}")
    for v in (PROOF_OK, HOLLOW, STALE, NO_ARTIFACT, UNVERIFIABLE):
        print(f"  {v.lower()}: {report['summary'][skey(v)]}")

    findings = sum(report["summary"][skey(v)] for v in FINDING_VERDICTS)
    exit_code = 1 if findings else 0  # zero claims -> 0 (announced loudly above)
    report["exit_code"] = exit_code
    print()
    if report["summary"]["total"] == 0:
        print("exit 0 (nothing to verify)")
    elif findings:
        print(f"exit {exit_code} — {findings} finding(s): the receipts were checked, "
              f"and some did not survive contact")
    else:
        print(f"exit {exit_code} — every claim verified against its proof")

    if a.out_json:
        atomic_write_json(a.out_json, report)
        print(f"json report: {a.out_json}")

    sys.exit(exit_code)


if __name__ == "__main__":
    main()
