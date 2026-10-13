"""Construit le minutage de la vidéo à partir de la voix réelle.

Lit audio/voix/durees.json (durée + minutage des mots de chaque réplique) et écrit
_work/timeline-<version>.json :
  scenes   : début, durée et réplique de chaque scène
  vo       : instant de départ de chaque réplique
  words    : chaque mot avec son instant absolu (sous-titres, synchronisation)
  captions : groupes de 1 à 3 mots pour les sous-titres dynamiques
  sfx      : bruitages (fichier, instant, volume)
Si la voix change (voix d'Adams), relancer ce script suffit : tout se recale.
Usage : python timeline.py [long|court]
"""
import json
import re
import sys
from pathlib import Path

D = Path(__file__).resolve().parent
VERSION = sys.argv[1] if len(sys.argv) > 1 else "long"
LINES = {m["name"]: m for m in json.loads((D / "audio" / "voix" / "durees.json").read_text(encoding="utf-8"))}

# Scènes : réplique, durée minimale (visuels), décalage de la voix dans la scène.
PLANS = {
    "long": [
        ("hook", "01-accroche", 2.8, 0.15),
        ("daily", "02-quotidien", 4.4, 0.05),
        ("flow", "03-flow", 3.9, 0.2),
        ("site", "04-site", 7.4, 0.15),
        ("app", "05-app", 7.1, 0.15),
        ("proof", "05b-preuves", 5.4, 0.3),
        ("tuto", "06-tuto", 12.4, 0.4),
        ("side", "07-cotes", 6.3, 0.15),
        ("end", "08-fin", 3.6, 0.3),
    ],
    "court": [
        ("hook", "01-accroche", 2.8, 0.15),
        ("flow", "03-flow", 3.8, 0.15),
        ("site", "04-site", 7.4, 0.15),
        ("app", "05-app", 7.1, 0.15),
        ("proof", "05b-preuves", 4.8, 0.25),
        ("tuto", "06c-tuto-court", 4.3, 0.4),
        ("side", "07-cotes", 6.3, 0.15),
        ("end", "08-fin", 3.4, 0.3),
    ],
}[VERSION]
# Durée du plan réel (tablette) avant la plongée dans l'écran 3D.
CLIP = 2.0 if VERSION == "long" else 1.5

KEYWORDS = {"activité", "appels", "papiers", "relances", "accompagne", "site", "internet", "trouvent", "réservent",
            "paient", "améliore", "application", "dossiers", "planning", "équipe", "projets", "vraies", "simple",
            "flow", "sur", "mesure", "point", "com", "questions", "côtés", "maintenance", "offert", "projet", "bonne", "nouvelle"}

scenes, vo, words, captions, sfx = [], [], [], [], []
t = 0.0
for sid, line, mind, off in PLANS:
    L = LINES[line]
    # La scène suit la fin réelle de la parole (dernier mot), pas la fin du fichier (silence de queue).
    dur = max(mind, off + L["words"][-1]["e"] + 0.3)
    scenes.append({"id": sid, "start": round(t, 3), "dur": round(dur, 3), "line": line})
    vo.append({"line": line, "at": round(t + off, 3)})
    for w in L["words"]:
        clean = re.sub(r"[^\wàâçéèêëîïôûùüÿœ'’-]", "", w["w"].lower())
        words.append({"line": line, "w": w["w"], "s": round(t + off + w["s"], 3), "e": round(t + off + w["e"], 3),
                      "key": clean in KEYWORDS, "brk": bool(w.get("brk"))})
    t += dur
TOTAL = round(t, 3)


def first(line, *needles, after=0.0):
    """Instant du premier mot de la réplique qui commence par un des motifs."""
    for w in words:
        if w["line"] == line and w["s"] >= after and any(w["w"].lower().startswith(n) for n in needles):
            return w["s"]
    return None


# Sous-titres : chaque phrase (segment) est répartie en groupes équilibrés de 2 à 3 mots
# (jamais un mot isolé en fin de phrase, sauf une phrase d'un seul mot).
for line in [s["line"] for s in scenes]:
    ws = [w for w in words if w["line"] == line]
    phrases, cur = [], []
    for w in ws:
        cur.append(w)
        if re.search(r"[,.:?!…]$", w["w"]) or w.get("brk"):
            phrases.append(cur); cur = []
    if cur:
        phrases.append(cur)
    for ph in phrases:
        n = len(ph)
        g = max(1, -(-n // 3))                       # nombre de groupes
        sizes = [n // g + (1 if k < n % g else 0) for k in range(g)]
        k0 = 0
        for sz in sizes:
            grp = ph[k0:k0 + sz]; k0 += sz
            captions.append({"s": grp[0]["s"], "e": grp[-1]["e"], "words": [{"w": x["w"], "s": x["s"], "key": x["key"]} for x in grp]})
for i in range(len(captions) - 1):
    captions[i]["e"] = round(min(captions[i + 1]["s"], captions[i]["e"] + 0.6), 3)
# Un sous-titre ne déborde jamais sur la scène suivante.
ends = {s["line"]: s["start"] + s["dur"] - 0.05 for s in scenes}
for c in captions:
    line = next(w["line"] for w in words if w["s"] == c["words"][0]["s"])
    c["e"] = round(min(c["e"], ends[line]), 3)

S = {s["id"]: s for s in scenes}


def cue(name, at, vol=1.0):
    if at is not None and 0 <= at < TOTAL:
        sfx.append({"f": name, "at": round(at, 3), "vol": vol})


# Sons réels (audio/sfx-real, Mixkit) ; « pic » = instant fort du son, calé sur l'événement visuel.
META = json.loads((D / "audio" / "sfx-real" / "meta.json").read_text(encoding="utf-8"))


def at_peak(name, event, vol):
    """Place le son pour que son pic tombe exactement sur l'événement."""
    cue(name, event - META.get(name, {}).get("pic", 0.0), vol)


rng = __import__("random").Random(7)

# --- Transitions : seulement aux 4 moments forts (pas à chaque coupe) ---
at_peak("whoosh", S["flow"]["start"], 0.55)                 # apparition de la marque
if "proof" in S:
    at_peak("sweep", S["proof"]["start"], 0.45)             # réalisations
at_peak("whoosh2", S["end"]["start"], 0.5)                  # écran de fin

# --- 1. Accroche : les notifications arrivent (les deux premières bien audibles) ---
h = S["hook"]["start"]
for k, nt in enumerate([0.15, 0.45, 0.75, 1.0, 1.22, 1.42, 1.6]):
    if nt < min(1.75, S["hook"]["dur"] - 0.9):
        cue("notif" if k < 2 else "notif2", h + nt, 0.45 if k < 2 else 0.22)

# --- 2. Le quotidien : papier, clavier, alertes ---
if "daily" in S:
    at_peak("papier", first("02-quotidien", "papiers") + 0.15, 0.6)
    tr = first("02-quotidien", "relances")
    cue("clavier-pc", tr + 0.2, 0.45)
    cue("notif2", tr + 0.15, 0.4)
    cue("notif2", tr + 0.55, 0.35)

# --- 3. Flow : un seul petit son sur « accompagne » ---
cue("notif2", first("03-flow", "accompagne"), 0.3)

# --- 4. Site : les trois ronds, la notification de paiement, le balayage avant/après ---
for n in ("trouvent", "réservent", "paient"):
    cue("notif2", first("04-site", n), 0.25)
cue("notif", first("04-site", "paient") + 0.05, 0.4)
at_peak("sweep", first("04-site", "déjà") - 0.35 + 0.7 + 0.4, 0.4)

# --- 5. Application : les trois pastilles ---
for n in ("dossiers", "planning", "équipe"):
    cue("notif2", first("05-app", n), 0.25)

# --- 6. Réalisations : un clic à chaque changement d'écran ---
if "proof" in S:
    per = (S["proof"]["dur"] - 0.3) / 3
    for k in range(1, 3):
        cue("clic", S["proof"]["start"] + 0.15 + k * per, 0.35)

# --- 7. Tutoriel : plongée, entrée dans l'écran, chaque touche, chaque tapotement ---
tu = S["tuto"]
CLIP_T = CLIP
at_peak("plongee", tu["start"] + CLIP_T - 0.08, 0.6)
cue("entree", tu["start"] + CLIP_T - 0.05, 0.45)
SEQOFF = 0.5   # instant de l'écran du tutoriel au premier plan 3D (video2.html, rendu dev-tuto)


def st_abs(stt):  # instant de l'écran du tutoriel -> instant absolu
    return tu["start"] + CLIP_T + (stt - SEQOFF)


end_tuto = tu["start"] + tu["dur"]
# Mêmes textes et fenêtres que screen.html : une vraie frappe par caractère, rythme légèrement irrégulier.
TYPING = [("flowsurmesure.com", 1.05, 2.0), ("Réserver et payer en ligne.", 5.7, 6.8),
          ("Camille Martin", 8.4, 9.0), ("camille@exemple.fr", 9.18, 9.95)]
for txt, a, b in TYPING:
    for k, ch in enumerate(txt):
        at = st_abs(a + (b - a) * (k + 0.5) / len(txt) + rng.uniform(-0.012, 0.012))
        if at < end_tuto:
            cue(f"key{1 + rng.randrange(10)}", at, (0.55 if ch != " " else 0.4) * rng.uniform(0.85, 1.0))
for stt in (0.8, 2.15, 4.65, 5.1, 5.45, 7.25, 7.6, 8.15, 9.1, 10.45):
    a = st_abs(stt)
    if a < end_tuto:
        cue("tap", a, 0.5)

# --- 8. À vos côtés : « Bonne nouvelle ! » (carillon joyeux), puis le tampon du badge ---
cue("bonne-nouvelle", first("07-cotes", "bonne") - 0.05, 0.55)
at_peak("tampon", (first("07-cotes", "maintenance") or S["side"]["start"] + 2.5) - 0.1 + 0.18, 0.7)

out = {"version": VERSION, "total": TOTAL, "clip": CLIP, "scenes": scenes, "vo": vo, "words": words,
       "captions": captions, "sfx": sorted(sfx, key=lambda x: x["at"])}
(D / "_work").mkdir(exist_ok=True)
(D / "_work" / f"timeline-{VERSION}.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{VERSION}: {TOTAL} s, {len(scenes)} scènes, {len(captions)} sous-titres, {len(sfx)} bruitages")
for s in scenes:
    print(f"  {s['start']:6.2f}  {s['id']:6s} {s['dur']:5.2f} s")
