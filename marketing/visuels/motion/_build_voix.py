"""Voix off du film de lancement. Segments + silences = 30,00 s."""
import asyncio
import subprocess
from pathlib import Path

import edge_tts

FFMPEG = r"C:\Users\adams\AppData\Local\Microsoft\WinGet\Links\ffmpeg.exe"
FFPROBE = r"C:\Users\adams\AppData\Local\Microsoft\WinGet\Links\ffprobe.exe"
OUT = Path(__file__).resolve().parent
VOICE = "fr-FR-HenriNeural"
RATE = "-8%"
PITCH = "-2Hz"

# (texte, silence avant en secondes) — la parole reste aérée, le film tient 30 s
LINES = [
    ("Flow.", 0.65),
    ("Des produits digitaux, pour votre métier.", 0.70),
    ("Tout avance, simplement.", 0.50),
    ("Adams Dexter en est le fondateur.", 0.62),
    ("Un site, qui vous représente.", 0.48),
    ("Une application, pour le quotidien.", 0.32),
    ("Une plateforme, pour vos équipes.", 0.28),
    ("Build digital. Make it flow.", 0.70),
]


def dur(path: Path) -> float:
    out = subprocess.check_output(
        [
            FFPROBE, "-v", "error", "-show_entries", "format=duration",
            "-of", "default=nw=1:nk=1", str(path),
        ],
        text=True,
    )
    return float(out.strip())


async def main() -> None:
    parts = []
    cursor = 0.0
    cues = []
    for i, (text, gap) in enumerate(LINES):
        raw = OUT / f"_v{i}.mp3"
        com = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH, boundary="WordBoundary")
        await com.save(str(raw))
        d = dur(raw)
        start = cursor + gap
        cues.append((start, start + d, text))
        cursor = start + d
        parts.append((gap, raw, d))
        print(f"{start:6.2f}–{start + d:6.2f}  {text}")

    tail = 30.0 - cursor
    print(f"tail {tail:.2f}s  total speech end {cursor:.2f}")
    if tail < 0.3:
        raise SystemExit("trop long, réduire les silences")

    # concat: silence, voice, silence, voice, … tail
    inputs = []
    filters = []
    idx = 0
    labels = []
    for gap, raw, d in parts:
        inputs += ["-f", "lavfi", "-t", f"{gap:.3f}", "-i", "anullsrc=r=48000:cl=mono"]
        inputs += ["-i", str(raw)]
        filters.append(f"[{idx}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=mono[s{idx}]")
        filters.append(f"[{idx+1}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=mono[s{idx+1}]")
        labels += [f"[s{idx}]", f"[s{idx+1}]"]
        idx += 2
    inputs += ["-f", "lavfi", "-t", f"{tail:.3f}", "-i", "anullsrc=r=48000:cl=mono"]
    filters.append(f"[{idx}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=mono[s{idx}]")
    labels.append(f"[s{idx}]")
    n = len(labels)
    filters.append("".join(labels) + f"concat=n={n}:v=0:a=1[a]")
    voice = OUT / "voix-lancement.wav"
    subprocess.check_call(
        [FFMPEG, "-y", *inputs, "-filter_complex", ";".join(filters), "-map", "[a]", str(voice)],
        stdout=subprocess.DEVNULL,
    )
    print("voice", dur(voice))
    (OUT / "_cues.txt").write_text(
        "\n".join(f"{a:.3f}\t{b:.3f}\t{t}" for a, b, t in cues),
        encoding="utf-8",
    )


if __name__ == "__main__":
    asyncio.run(main())
