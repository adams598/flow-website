"""Affiche le minutage des scènes (même calcul que src/timing.ts) et des numéros d'images de contrôle."""
import json
from pathlib import Path

D = Path(__file__).resolve().parent.parent
v = {l["name"]: l for l in json.loads((D / "src/data/voix.json").read_text(encoding="utf-8"))}
plan = [("hook", "01-accroche", 3.4, 0.9), ("daily", "02-quotidien", 4.2, 0.1), ("flow", "03-flow", 3.6, 0.35),
        ("site", "04-site", 7.8, 0.2), ("app", "05-app", 7.4, 0.2), ("proof", "05b-preuves", 5.4, 0.2),
        ("tuto", "06-tuto", 9.6, 0.5), ("side", "07-cotes", 6.2, 0.2), ("end", "08-fin", 3.8, 0.35)]
t, S = 0.0, {}
for i, n, m, o in plan:
    d = max(m, o + v[n]["words"][-1]["e"] + 0.35)
    S[i] = (t, d)
    t += d
print("total", round(t, 2))
for k, (a, d) in S.items():
    print(f"{k:6s} {a:6.2f} {d:5.2f}")
picks = {"hook": [0.6, 2.2], "daily": [1.4, 3.3], "flow": [2.8], "site": [3.6, 6.8], "app": [5.6], "proof": [1.5, 3.6],
         "tuto": [1.6, 3.6, 7.0], "side": [4.2, 5.6], "end": [2.8]}
print("FRAMES", ",".join(str(int((S[k][0] + x) * 30)) for k, xs in picks.items() for x in xs))
