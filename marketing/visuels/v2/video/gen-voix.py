"""Voix off de la vidéo de présentation (synthèse, Rémy).

Chaque réplique est lue d'une seule traite (intonation naturelle, phrases fluides), avec
la voix grave et chaude retenue par Adams. Seule la fin de la réplique 07 (« Et bonne
nouvelle ! Le premier mois… ») est lue à part, un peu plus enjouée, sans excès.
Les écarts de hauteur forts et le découpage en petits morceaux sont à éviter :
ils donnent une voix artificielle (« jeu vidéo »). Le minutage des mots est conservé.

Sortie : audio/voix/<nom>.mp3 + durees.json. La voix d'Adams peut remplacer ces fichiers
(mêmes noms) ; timing-voix.py recalcule alors le minutage.
"""
import asyncio
import json
import subprocess
from pathlib import Path

import edge_tts
import numpy as np

OUT = Path(__file__).resolve().parent / "audio" / "voix"
VOICE = "fr-FR-RemyMultilingualNeural"
BASE_RATE, BASE_PITCH = 7, -2        # % et Hz : Rémy plus vif et plus ouvert (ton vendeur)
SR = 48000
# Traitement léger, sans changement de hauteur : une voix trop modifiée sonne artificielle.
STUDIO = ("highpass=f=70,equalizer=f=150:t=q:w=1.0:g=1.5,equalizer=f=3000:t=q:w=1.4:g=1.5,"
          "acompressor=threshold=-20dB:ratio=2:attack=15:release=180:makeup=2,loudnorm=I=-16:TP=-2")

# Réplique = segments (texte, débit relatif %, hauteur relative Hz).
LINES = [
    ("01-accroche", [("Vous avez une activité qui vous tient à cœur ?", 0, 2)]),
    ("02-quotidien", [("Les appels, les papiers, les relances…", 3, 0), ("et vos journées filent !", 2, 2)]),
    ("03-flow", [("Chez Flow, on vous accompagne, pas à pas !", 0, 1)]),
    ("04-site", [("On crée votre site internet : vos clients vous trouvent, réservent, et paient en ligne.", 2, 0),
                 ("Vous avez déjà un site ? On le booste !", 3, 3)]),
    ("05-app", [("Besoin d'une application ?", 0, 3),
                ("On la construit autour de votre façon de travailler : dossiers, planning, équipe… tout au même endroit !", 3, 0)]),
    ("05b-preuves", [("Et ce n'est pas qu'une promesse : nos projets sont déjà en ligne !", 2, 1)]),
    ("06-tuto", [("Pour démarrer, c'est simple :", 0, 2), ("allez sur flow sur mesure point com, descendez en bas de la page, et répondez à quelques questions.", 3, 0)]),
    ("06c-tuto-court", [("Pour démarrer, rendez-vous sur flow sur mesure point com !", 2, 1)]),
    ("07-cotes", [("Et après la mise en ligne ? On reste à vos côtés.", 0, 0),
                  ("Et bonne nouvelle : le premier mois de maintenance est offert !", 5, 4)]),
    ("08-fin", [("Un projet ? Écrivez-nous en message privé !", 2, 2)]),
]


def pause_after(text):
    """Respiration après un segment, selon sa ponctuation."""
    t = text.rstrip()
    if t.endswith("!"):
        return 0.22
    if t.endswith((".", "?", "…")):
        return 0.38
    if t.endswith(":"):
        return 0.16
    return 0.1


def decode(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768


def speech_bounds(x):
    env = np.convolve(np.abs(x), np.ones(480) / 480, mode="same")
    nz = np.nonzero(env > env.max() * 0.02)[0]
    return max(0, nz[0] - int(0.02 * SR)), min(len(x), nz[-1] + int(0.04 * SR))


async def segment(text, rate, pitch, tmp, tries=4):
    """Un segment de voix (avec nouvelles tentatives si le réseau coupe)."""
    for k in range(tries):
        try:
            return await _segment(text, rate, pitch, tmp)
        except Exception as e:  # coupure réseau passagère
            if k == tries - 1:
                raise
            print(f"   nouvelle tentative ({e.__class__.__name__})")
            await asyncio.sleep(3 * (k + 1))


async def _segment(text, rate, pitch, tmp):
    words = []
    comm = edge_tts.Communicate(text, VOICE, rate=f"{BASE_RATE + rate:+d}%", pitch=f"{BASE_PITCH + pitch:+d}Hz",
                                boundary="WordBoundary")
    with tmp.open("wb") as fh:
        async for c in comm.stream():
            if c["type"] == "audio":
                fh.write(c["data"])
            elif c["type"] == "WordBoundary":
                words.append({"w": c["text"], "s": c["offset"] / 1e7, "e": (c["offset"] + c["duration"]) / 1e7})
    x = decode(tmp)
    a, b = speech_bounds(x)
    shift = a / SR
    return x[a:b], [{"w": w["w"], "s": w["s"] - shift, "e": w["e"] - shift} for w in words]


async def synth(name, parts):
    tmp = OUT / "_segment.mp3"
    pcm, words, t = [np.zeros(int(0.08 * SR), np.float32)], [], 0.08
    for k, (text, rate, pitch) in enumerate(parts):
        x, ws = await segment(text, rate, pitch, tmp)
        seg = [{"w": w["w"], "s": round(max(0.0, t + w["s"]), 3), "e": round(t + w["e"], 3)} for w in ws]
        if seg:
            seg[-1]["brk"] = True   # fin de segment : les sous-titres coupent ici
        words += seg
        pcm.append(x)
        t += len(x) / SR
        if k < len(parts) - 1:
            gap = pause_after(text)
            pcm.append(np.zeros(int(gap * SR), np.float32))
            t += gap
    tmp.unlink()
    pcm.append(np.zeros(int(0.12 * SR), np.float32))
    raw = (np.concatenate(pcm) * 32767).clip(-32768, 32767).astype(np.int16).tobytes()
    path = OUT / f"{name}.mp3"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", "-af", STUDIO,
                    "-ar", str(SR), "-b:a", "192k", str(path)], input=raw, check=True)
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                               capture_output=True, text=True, check=True).stdout)
    text = " ".join(p[0] for p in parts)
    return {"name": name, "text": text, "duration": round(dur, 3), "words": words}


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    meta = []
    for name, parts in LINES:
        meta.append(await synth(name, parts))
        print(f"{name}: {meta[-1]['duration']} s, {len(meta[-1]['words'])} mots")
    (OUT / "durees.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    asyncio.run(main())
