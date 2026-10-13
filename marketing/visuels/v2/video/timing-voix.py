"""Remplace la voix de synthèse par la voix d'Adams.

audio/voix-adams/<nom>.(m4a|mp3|wav)  ->  audio/voix/<nom>.mp3 (silences coupés, niveau homogène)
puis retrouve le minutage de chaque mot (faster-whisper) et réécrit audio/voix/durees.json.
Le texte des sous-titres reste celui du script (gen-voix.py) : seul le minutage vient de la voix.

Premier lancement : faster-whisper télécharge son modèle « small » (~460 Mo, une seule fois).
Usage : python timing-voix.py
"""
import importlib.util
import json
import subprocess
from pathlib import Path

D = Path(__file__).resolve().parent
SRC = D / "audio" / "voix-adams"
DST = D / "audio" / "voix"
# Le texte des répliques vient de gen-voix.py (nom avec tiret : import par chemin).
spec = importlib.util.spec_from_file_location("genvoix", D / "gen-voix.py")
genvoix = importlib.util.module_from_spec(spec)
spec.loader.exec_module(genvoix)
LINES = genvoix.LINES


def find(name):
    for ext in (".wav", ".m4a", ".mp3", ".aac", ".ogg"):
        p = SRC / f"{name}{ext}"
        if p.exists():
            return p
    return None


def duration(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)], capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


from faster_whisper import WhisperModel  # noqa: E402

model = WhisperModel("small", device="cpu", compute_type="int8")
meta = []
for name, text in LINES:
    src = find(name)
    if not src:
        print(f"!! {name} : fichier absent dans audio/voix-adams, je garde la voix de synthèse")
        meta.append(None)
        continue
    out = DST / f"{name}.mp3"
    # Coupe les silences de début/fin, filtre les graves parasites, homogénéise le niveau.
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-af",
                    "highpass=f=70,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
                    "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.12,areverse,"
                    "loudnorm=I=-16:TP=-2", "-ar", "48000", "-ac", "1", "-b:a", "192k", str(out)], check=True)
    segs, _ = model.transcribe(str(out), language="fr", word_timestamps=True)
    heard = [w for s in segs for w in s.words]
    script_words = text.split()
    # Aligne les mots du script sur les mots entendus (même ordre ; à défaut, répartition proportionnelle).
    words = []
    if len(heard) >= len(script_words) * 0.6:
        for i, w in enumerate(script_words):
            h = heard[min(len(heard) - 1, round(i * (len(heard) - 1) / max(1, len(script_words) - 1)))]
            words.append({"w": w, "s": round(h.start, 3), "e": round(h.end, 3)})
    else:
        d = duration(out)
        for i, w in enumerate(script_words):
            words.append({"w": w, "s": round(d * i / len(script_words), 3), "e": round(d * (i + 1) / len(script_words), 3)})
    meta.append({"name": name, "text": text, "duration": round(duration(out), 3), "words": words})
    print(f"{name}: {meta[-1]['duration']} s")

old = {m["name"]: m for m in json.loads((DST / "durees.json").read_text(encoding="utf-8"))}
final = [m if m else old[n] for m, (n, _) in zip(meta, LINES)]
(DST / "durees.json").write_text(json.dumps(final, ensure_ascii=False, indent=1), encoding="utf-8")
print("-> audio/voix/durees.json mis à jour. Ensuite : python timeline.py long && python timeline.py court")
