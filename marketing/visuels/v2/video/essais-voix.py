"""Essais de voix off masculines : même texte, plusieurs voix et réglages, même traitement « studio ».
Sortie : audio/essais-voix/<voix>.mp3 (brut) et <voix>-studio.mp3 (traité, à écouter).
"""
import asyncio
import subprocess
from pathlib import Path

import edge_tts

OUT = Path(__file__).resolve().parent / "audio" / "essais-voix"
OUT.mkdir(parents=True, exist_ok=True)
TEXT = ("Chez Flow, on vous accompagne dans votre activité, pas à pas. "
        "On crée votre site internet : vos clients vous trouvent, réservent et paient en ligne.")

# (nom, voix, débit, hauteur)
CANDIDATS = [
    ("henri", "fr-FR-HenriNeural", "-6%", "-6Hz"),
    ("remy", "fr-FR-RemyMultilingualNeural", "-6%", "-7Hz"),
    ("andrew", "en-US-AndrewMultilingualNeural", "-4%", "-5Hz"),
    ("brian", "en-US-BrianMultilingualNeural", "-4%", "-6Hz"),
]

# Traitement « voix de studio » : grave chaleureux, présence, compression douce, légère pièce.
STUDIO = ("highpass=f=70,"
          "equalizer=f=140:t=q:w=1.0:g=3,"
          "equalizer=f=320:t=q:w=1.2:g=-2,"
          "equalizer=f=3500:t=q:w=1.4:g=1.5,"
          "equalizer=f=8000:t=q:w=1.0:g=-1.5,"
          "acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=3,"
          "aecho=0.85:0.5:24|41:0.07|0.04,"
          "loudnorm=I=-16:TP=-2")


async def main():
    for name, voice, rate, pitch in CANDIDATS:
        raw = OUT / f"{name}.mp3"
        await edge_tts.Communicate(TEXT, voice, rate=rate, pitch=pitch).save(str(raw))
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-af", STUDIO, "-ar", "48000", "-b:a", "192k",
                        str(OUT / f"{name}-studio.mp3")], check=True)
        print("->", name)


asyncio.run(main())
