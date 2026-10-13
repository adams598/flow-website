"""Mixage audio + encodage final de la vidéo de présentation.

Voix : répliques de audio/voix/ placées aux instants VO (mêmes valeurs que video.html).
Musique : baissée automatiquement sous la voix (compression en sidechain), fondus.
Sortie : flow-presentation.mp4 (1080 × 1920, H.264, AAC), niveau -14 LUFS (réseaux sociaux).
Usage : python assemble.py [musique.mp3]
"""
import subprocess
import sys
from pathlib import Path

D = Path(__file__).resolve().parent
MUSIC = Path(sys.argv[1]) if len(sys.argv) > 1 else D / "audio" / "music-digital-clouds.mp3"
DURATION = 46.0
VO = {"01-accroche": 0.3, "02-quotidien": 3.3, "03-flow": 8.1, "04-site": 12.1, "05-app": 19.8,
      "06-tuto": 27.4, "07-cotes": 37.6, "08-fin": 42.8}

inputs = ["-i", str(MUSIC)]
for name in VO:
    inputs += ["-i", str(D / "audio" / "voix" / f"{name}.mp3")]

parts = []
labels = []
for i, (name, at) in enumerate(VO.items(), start=1):
    ms = int(at * 1000)
    parts.append(f"[{i}:a]aresample=48000,adelay={ms}|{ms},apad[v{i}]")
    labels.append(f"[v{i}]")
parts.append(f"{''.join(labels)}amix=inputs={len(VO)}:normalize=0,atrim=0:{DURATION},volume=1.15,asplit=2[vo][sc]")
parts.append(f"[0:a]aresample=48000,atrim=0:{DURATION},afade=t=in:d=0.6,afade=t=out:st={DURATION - 1.8}:d=1.8,volume=0.32[mus]")
parts.append("[mus][sc]sidechaincompress=threshold=0.025:ratio=7:attack=25:release=350[duck]")
parts.append("[duck][vo]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[out]")

subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(parts),
                "-map", "[out]", "-ar", "48000", str(D / "_work" / "mix.wav")], check=True)
print("-> _work/mix.wav")

subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", "30", "-i", str(D / "_work" / "final" / "%05d.jpg"),
                "-i", str(D / "_work" / "mix.wav"), "-c:v", "libx264", "-preset", "slow", "-crf", "16",
                "-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart",
                "-c:a", "aac", "-b:a", "192k", "-shortest", str(D / "flow-presentation.mp4")], check=True)
print("-> flow-presentation.mp4")
