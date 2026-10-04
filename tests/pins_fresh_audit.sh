#!/usr/bin/env bash
# tests/pins_fresh_audit.sh — FAIL-first pins for tools/fresh-audit.
# The detector pin (P2) builds a fixture repo whose phantom pin is GREEN in
# the author's dirty tree (untracked dist/) but MUST go RED in a pristine
# clone — that transition is the entire reason this tool exists.
set -u
cd "$(dirname "$0")/.."
TOOL="$(pwd)/tools/fresh-audit/fresh-audit.mjs"
[ -f "$TOOL" ] || { echo "fresh-audit absent (main): all pins RED"; exit 1; }
T=$(mktemp -d)
trap 'rm -rf "$T"' EXIT
PASS=0; FAIL=0
ok()  { PASS=$((PASS+1)); echo "PASS $1"; }
bad() { FAIL=$((FAIL+1)); echo "FAIL $1 — $2"; }

# P1 syntax
node --check "$TOOL" >/dev/null 2>&1 && ok P1 || bad P1 "syntax check failed"

# P2 the detector: phantom pin GREEN in dirty tree, RED in fresh clone
FIX="$T/fixture"
mkdir -p "$FIX/tests"
cd "$FIX"
echo 'exit 0' > tests/pins_ok.sh
printf '%s\n' '#!/usr/bin/env bash' '# claims a build artifact the author has on disk' \
  'test -f dist/app.js' > tests/pins_phantom.sh
chmod +x tests/*.sh
echo 'dist/' > .gitignore
mkdir -p dist && echo 'built' > dist/app.js   # author-tree state: phantom GREEN here
git init -q .
git add .
git -c user.name=t -c user.email=t@t commit -qm init
bash tests/pins_phantom.sh && echo "fixture premise: phantom GREEN in dirty tree" > /dev/null \
  || { bad P2 "fixture premise broken (phantom not green in dirty tree)"; }
OUT=$(node /tmp/qt/$TOOL --local "$T/clone" 2>&1); RC=99
git clone -q "$FIX" "$T/clone"                  # pristine: dist/ does NOT come along
cd /tmp                                          # neutral CWD — auditor must anchor runners itself
OUT=$(node "$TOOL" --local "$T/clone" 2>&1); RC=$?
cd /tmp/qt
echo "$OUT" | grep -q 'PASS pins:pins_ok.sh' \
  && echo "$OUT" | grep -q 'FAIL pins:pins_phantom.sh' \
  && [ $RC -eq 1 ] \
  && ok P2 || bad P2 "detector missed the phantom: rc=$RC $OUT"
cd - > /dev/null

# P3 dep-honesty: package.json test script without committed node_modules
# must NOT produce an npm runner (fresh clones skip install, reported honest)
mkdir -p "$T/pkg/tests"
echo 'exit 0' > "$T/pkg/tests/pins_x.sh"
printf '{"scripts":{"test":"node missing.js"}}' > "$T/pkg/package.json"
OUT=$(node "$TOOL" --local "$T/pkg" 2>&1); RC=$?
echo "$OUT" | grep -q 'PASS pins:pins_x.sh' \
  && ! echo "$OUT" | grep -q 'npm:test' \
  && [ $RC -eq 0 ] \
  && ok P3 || bad P3 "dep-honesty moved: rc=$RC $OUT"

# P4 usage error -> REFUSED exit 2
node "$TOOL" >/dev/null 2>&1; RC=$?
[ $RC -eq 2 ] && ok P4 || bad P4 "usage error not refused: rc=$RC"

# P5 zero-convention repo -> SKIP verdict, exit 0
mkdir -p "$T/empty"
OUT=$(node "$TOOL" --local "$T/empty" 2>&1); RC=$?
echo "$OUT" | grep -q 'SKIP' && [ $RC -eq 0 ] \
  && ok P5 || bad P5 "empty repo handling: rc=$RC $OUT"

echo "----"
echo "fresh-audit pins: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
