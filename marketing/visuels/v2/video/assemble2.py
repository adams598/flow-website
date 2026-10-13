"""Mixage (voix + musique + bruitages) et encodage, d'après _work/timeline-<version>.json.

Usage :
  python assemble2.py long  [916|45|169]   -> flow-presentation-long-916.mp4, ...
  python assemble2.py court [916]
  --music=audio/music-xxx.mp3 pour changer de musique.
Le 16:9 (LinkedIn / YouTube) est composé à partir du rendu vertical : vidéo à droite,
bandeau de marque à gauche (fond rendu par frame169.html).
"""
import json
import subprocess
import sys
from pathlib import Path

D = Path(__file__).resolve().parent
args = [a for a in sys.argv[1:] if not a.startswith("--")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--") and "=" in a)
VERSION = args[0] if args else "long"
FMT = args[1] if len(args) > 1 else "916"
MUSIC = D / opts.get("music", "audio/music-digital-clouds.mp3")
TL = json.loads((D / "_work" / f"timeline-{VERSION}.json").read_text(encoding="utf-8"))
TOTAL = TL["total"]


def run(cmd):
    subprocess.run(cmd, check=True)


def room_bed(path: Path):
    """Ambiance de pièce très discrète sous les plans réels (souffle d'un vrai lieu)."""
    import wave
    import numpy as np
    sr = 48000
    n = int(TOTAL * sr)
    rng = np.random.default_rng(3)
    x = np.cumsum(rng.normal(0, 1, n))                      # bruit brun : grave et doux
    x = x - np.convolve(x, np.ones(4800) / 4800, mode="same")
    x /= np.abs(x).max() + 1e-9
    g = np.zeros(n)
    real = {"hook", "daily", "side"}
    for sc in TL["scenes"]:
        a = sc["start"]
        b = a + (TL["clip"] if sc["id"] == "tuto" else sc["dur"]) if sc["id"] in real | {"tuto"} else None
        if b is None:
            continue
        i0, i1 = int(a * sr), int(min(b, TOTAL) * sr)
        ramp = int(0.25 * sr)
        seg = np.ones(i1 - i0)
        seg[:ramp] = np.linspace(0, 1, min(ramp, len(seg)))[:len(seg[:ramp])]
        seg[-ramp:] = np.minimum(seg[-ramp:], np.linspace(1, 0, ramp)[-len(seg[-ramp:]):])
        g[i0:i1] = np.maximum(g[i0:i1], seg)
    y = (x * g * 10 ** (-36 / 20) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.tobytes())


def mix(out_wav: Path):
    room = D / "_work" / f"room-{VERSION}.wav"
    room_bed(room)
    inputs = ["-i", str(MUSIC), "-i", str(room)]
    parts, vlabels, slabels = [], [], []
    idx = 2
    for v in TL["vo"]:
        inputs += ["-i", str(D / "audio" / "voix" / f"{v['line']}.mp3")]
        ms = int(v["at"] * 1000)
        parts.append(f"[{idx}:a]aresample=48000,aformat=channel_layouts=mono,adelay={ms}|{ms},apad[v{idx}]")
        vlabels.append(f"[v{idx}]")
        idx += 1
    for s in TL["sfx"]:
        inputs += ["-i", str(D / "audio" / "sfx-real" / f"{s['f']}.wav")]
        ms = int(s["at"] * 1000)
        parts.append(f"[{idx}:a]aresample=48000,aformat=channel_layouts=mono,volume={s['vol']:.3f},adelay={ms}|{ms},apad[s{idx}]")
        slabels.append(f"[s{idx}]")
        idx += 1
    parts.append(f"{''.join(vlabels)}amix=inputs={len(vlabels)}:normalize=0,atrim=0:{TOTAL},volume=1.2,asplit=2[vo][sc]")
    parts.append(f"{''.join(slabels)}amix=inputs={len(slabels)}:normalize=0,atrim=0:{TOTAL}[fx]")
    parts.append(f"[0:a]aresample=48000,aformat=channel_layouts=mono,atrim=0:{TOTAL},afade=t=in:d=0.4,afade=t=out:st={TOTAL - 1.8}:d=1.8,volume=0.22[mus]")
    parts.append("[mus][sc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=320[duck]")
    parts.append("[1:a]aresample=48000,aformat=channel_layouts=mono[room]")
    parts.append("[duck][vo][fx][room]amix=inputs=4:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9,volume=1.8dB,alimiter=limit=0.84:level=disabled[out]")
    # ffmpeg limite la longueur de la ligne de commande : le graphe passe par un fichier.
    graph = D / "_work" / f"graph-{VERSION}.txt"
    graph.write_text(";\n".join(parts), encoding="utf-8")
    run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex_script", str(graph), "-map", "[out]", "-ar", "48000", "-ac", "2", str(out_wav)])


wav = D / "_work" / f"mix-{VERSION}.wav"
mix(wav)
print("->", wav.name)

frames = {"916": f"f-{VERSION}", "45": f"f-{VERSION}45", "169": f"f-{VERSION}"}[FMT]
out = D / f"flow-presentation-{VERSION}-{FMT}.mp4"
enc = ["-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-profile:v", "high",
       "-movflags", "+faststart", "-c:a", "aac", "-b:a", "192k", "-shortest"]
if FMT in ("916", "45"):
    run(["ffmpeg", "-v", "error", "-y", "-framerate", "30", "-i", str(D / "_work" / frames / "%05d.jpg"), "-i", str(wav), *enc, str(out)])
else:
    plate = D / "_work" / "plate169.png"
    run(["ffmpeg", "-v", "error", "-y", "-loop", "1", "-framerate", "30", "-i", str(plate),
         "-framerate", "30", "-i", str(D / "_work" / frames / "%05d.jpg"), "-i", str(wav),
         "-filter_complex", "[1:v]scale=-2:960[v];[0:v][v]overlay=x=1220:y=60:shortest=1[o]",
         "-map", "[o]", "-map", "2:a", *enc, str(out)])
print("->", out.name)
