#!/usr/bin/env python3
"""test_champion_audit -- pins for champion_audit (stdlib-only, no deps).

Planted fixture reproduces the coev hollow-champion case (claimed 1259.1,
benched 239.6) plus the rest of the verdict vocabulary. Fail-first discipline:
every pin asserts an audible failure mode -- the auditor must be free to say
HOLLOW loudly, and the suite refuses a gate that cannot fail.

Run:  python3 tools/test_champion_audit.py
Exit: 0 all pins green, 1 any pin red.
"""
import json
import os
import subprocess
import sys
import tempfile
import time
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
TOOL = os.path.join(HERE, "champion_audit.py")
HOLLOW_CLAIM = 1259.1
HOLLOW_BENCH = 239.6


def run_tool(args):
    return subprocess.run([sys.executable, TOOL] + args,
                          capture_output=True, text=True, timeout=120)


class Fixture:
    """Builds a tiny repo-shaped dir with planted claim ledgers."""

    def __init__(self):
        self.root = tempfile.mkdtemp(prefix="champ_audit_fixture_")

    def ledger(self, rel, text, binary=False):
        path = os.path.join(self.root, rel)
        os.makedirs(os.path.dirname(path) or self.root, exist_ok=True)
        mode = "wb" if binary else "w"
        with open(path, mode) as f:
            f.write(text)
        return path

    def artifact(self, rel, text):
        return self.ledger(rel, text)

    def age(self, rel, seconds):
        """Make a file look old (for STALE ordering tests)."""
        path = os.path.join(self.root, rel)
        st = os.stat(path)
        os.utime(path, (st.st_atime - seconds, st.st_mtime - seconds))

    def path(self, rel):
        return os.path.join(self.root, rel)


class TestHollowChampion(unittest.TestCase):
    """Pin 1 -- the coev case: ledger says 1259.1, the artifact says 239.6."""

    def test_hollow_caught_with_both_numbers_named(self):
        fx = Fixture()
        fx.artifact("artifacts/champ_bench.txt", "measured champion fitness: 239.6\n")
        fx.ledger("RESULTS.md",
                  "# RESULTS\n\n## R53 continuation\n"
                  f"- claim(champion-fitness): {HOLLOW_CLAIM} "
                  "proof: artifacts/champ_bench.txt\n")
        r = run_tool([fx.root])
        self.assertEqual(r.returncode, 1,
                         f"hollow must exit 1, got {r.returncode}\n{r.stdout}\n{r.stderr}")
        self.assertIn("HOLLOW", r.stdout)
        self.assertIn("1259.1", r.stdout, "must name the claimed number")
        self.assertIn("239.6", r.stdout, "must name the measured number")


class TestNoArtifact(unittest.TestCase):
    """Pin 2 -- claim cites a proof path that does not exist."""

    def test_missing_artifact_caught(self):
        fx = Fixture()
        fx.ledger("RECEIPT-run1.md",
                  "- claim: 42.0 proof: artifacts/never_written.txt\n")
        r = run_tool([fx.root])
        self.assertEqual(r.returncode, 1)
        self.assertIn("NO-ARTIFACT", r.stdout)
        self.assertIn("artifacts/never_written.txt", r.stdout)


class TestStale(unittest.TestCase):
    """Pin 3 -- artifact regenerated AFTER the receipt (claim may be outdated)."""

    def test_newer_artifact_flagged_stale(self):
        fx = Fixture()
        fx.artifact("artifacts/bench.txt", "value 100.0\n")
        fx.ledger("RESULTS.md", "- claim: 100.0 proof: artifacts/bench.txt\n")
        fx.age("RESULTS.md", 3600)  # receipt written an hour before the artifact
        r = run_tool([fx.root])
        self.assertEqual(r.returncode, 1)
        self.assertIn("STALE", r.stdout)
        self.assertNotIn("PROOF-OK", r.stdout.split("SUMMARY")[-1] if "SUMMARY" in r.stdout else "PROOF-OK")


class TestCleanLedger(unittest.TestCase):
    """Pin 4 -- a truthful ledger passes silently (exit 0)."""

    def test_clean_ledger_exits_zero(self):
        fx = Fixture()
        fx.artifact("artifacts/bench.txt", "fitness: 100.0\n")
        fx.ledger("RESULTS.md", "- claim: 100.0 proof: artifacts/bench.txt\n")
        r = run_tool([fx.root])
        self.assertEqual(r.returncode, 0, f"clean must exit 0\n{r.stdout}\n{r.stderr}")
        self.assertIn("PROOF-OK", r.stdout)
        self.assertIn("claims audited: 1", r.stdout)


class TestMalformedLedger(unittest.TestCase):
    """Pin 5 -- unreadable ledger fails loud (rc=2), never silently skipped."""

    def test_undecodable_ledger_exits_two(self):
        fx = Fixture()
        fx.ledger("RESULTS.md", b"\xff\xfe claimed \x80\x81 broken bytes", binary=True)
        r = run_tool([fx.root])
        self.assertEqual(r.returncode, 2,
                         f"malformed ledger must exit 2, got {r.returncode}\n{r.stdout}")
        self.assertIn("FAIL-INPUT", r.stderr)


class TestToleranceBoundary(unittest.TestCase):
    """Pin 6 -- relative tolerance honored: tiny divergence passes, big fails."""

    def test_tiny_divergence_passes_big_divergence_fails(self):
        # tiny: rel err 5e-7 < default 1e-6 -> PROOF-OK
        fx = Fixture()
        fx.artifact("artifacts/t.txt", "v 100.00005\n")
        fx.ledger("RESULTS.md", "- claim: 100.0 proof: artifacts/t.txt\n")
        r = run_tool([fx.root])
        self.assertEqual(r.returncode, 0, f"tiny divergence should pass\n{r.stdout}")

        # big: rel err 1e-5 > default 1e-6 -> HOLLOW
        fx2 = Fixture()
        fx2.artifact("artifacts/t.txt", "v 100.001\n")
        fx2.ledger("RESULTS.md", "- claim: 100.0 proof: artifacts/t.txt\n")
        r2 = run_tool([fx2.root])
        self.assertEqual(r2.returncode, 1, f"big divergence should fail\n{r2.stdout}")
        self.assertIn("HOLLOW", r2.stdout)


class TestJsonReport(unittest.TestCase):
    """Pin 7 -- machine report is valid JSON with per-claim verdicts + summary."""

    def test_out_json_shape(self):
        fx = Fixture()
        fx.artifact("artifacts/a.txt", "n 42\n")
        fx.ledger("RESULTS.md", "- claim(a): 42 proof: artifacts/a.txt\n")
        out = fx.path("report.json")
        r = run_tool([fx.root, "--out-json", out])
        self.assertEqual(r.returncode, 0)
        with open(out) as f:
            rep = json.load(f)
        self.assertIn("claims", rep)
        self.assertIn("summary", rep)
        self.assertEqual(len(rep["claims"]), 1)
        self.assertEqual(rep["claims"][0]["verdict"], "PROOF-OK")
        self.assertEqual(rep["summary"]["proof_ok"], 1)
        self.assertEqual(rep["summary"]["total"], 1)


class TestReexec(unittest.TestCase):
    """Pin 8 -- recorded command re-execution: reproducing claim confirms,
    diverging measurement refutes (re-exec is the strongest evidence)."""

    def test_reexec_confirms_and_refutes(self):
        # confirms: re-exec prints the claimed number even though a stale
        # artifact disagrees -- measurement beats paper
        fx = Fixture()
        fx.artifact("artifacts/old.txt", "239.6\n")
        fx.ledger("RESULTS.md",
                  "- claim: 1259.1 proof: artifacts/old.txt "
                  "cmd: python3 -c print(1259.1)\n")
        r = run_tool([fx.root, "--reexec", "--tolerance", "0.001"])
        self.assertEqual(r.returncode, 0, f"re-exec proof should confirm\n{r.stdout}\n{r.stderr}")
        self.assertIn("PROOF-OK", r.stdout)
        self.assertIn("reexec", r.stdout)

        # refutes: re-exec reproduces the hollow bench
        fx2 = Fixture()
        fx2.artifact("artifacts/bench.txt", "239.6\n")
        fx2.ledger("RESULTS.md",
                   "- claim: 1259.1 proof: artifacts/bench.txt "
                   "cmd: python3 -c print(239.6)\n")
        r2 = run_tool([fx2.root, "--reexec", "--tolerance", "0.001"])
        self.assertEqual(r2.returncode, 1)
        self.assertIn("HOLLOW", r2.stdout)
        self.assertIn("1259.1", r2.stdout)
        self.assertIn("239.6", r2.stdout)


class TestUnverifiable(unittest.TestCase):
    """Pin 9 -- no proof cited: honest skip, counted, exit 0 (never silent)."""

    def test_unverifiable_counted_exit_zero(self):
        fx = Fixture()
        fx.ledger("RESULTS.md", "- claim: 7.0\n")  # no proof:, no cmd:
        r = run_tool([fx.root])
        self.assertEqual(r.returncode, 0)
        self.assertIn("UNVERIFIABLE", r.stdout)
        self.assertIn("unverifiable", r.stdout.lower().split("summary")[-1])


class TestUsageErrors(unittest.TestCase):
    """Pin 10 -- fail-loud usage: bad repo, bad tolerance -> rc=2."""

    def test_bad_repo_root_exits_two(self):
        r = run_tool([os.path.join(tempfile.gettempdir(), "no-such-repo-xyz")])
        self.assertEqual(r.returncode, 2)
        self.assertIn("FAIL-INPUT", r.stderr)

    def test_negative_tolerance_exits_two(self):
        fx = Fixture()
        fx.ledger("RESULTS.md", "- claim: 1 proof: a.txt\n")
        r = run_tool([fx.root, "--tolerance", "-0.5"])
        self.assertEqual(r.returncode, 2)
        self.assertIn("FAIL-INPUT", r.stderr)

    def test_no_args_prints_help_exits_two(self):
        r = run_tool([])
        self.assertEqual(r.returncode, 2)


if __name__ == "__main__":
    unittest.main(verbosity=2)
