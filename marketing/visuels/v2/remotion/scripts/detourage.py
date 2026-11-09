"""Détourage d'un clip (personne au premier plan) -> vidéo WebM à fond transparent.

Sert à placer des animations ENTRE le décor et la personne (effet de profondeur) :
en dessous le clip complet, au milieu l'animation, au-dessus ce détourage.
Modèle : rembg « u2net_human_seg » (téléchargé une fois, ~170 Mo).
Usage : python scripts/detourage.py public/clips/commercante.mp4 public/clips/commercante-detour.webm
"""
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

src, dst = Path(sys.argv[1]), Path(sys.argv[2])
session = new_session("u2net_human_seg")
with tempfile.TemporaryDirectory() as tmp:
    tmp = Path(tmp)
    subprocess.run(["ffmpeg", "-v", "error", "-i", str(src), str(tmp / "f%05d.png")], check=True)
    frames = sorted(tmp.glob("f*.png"))
    prev = None
    for k, f in enumerate(frames):
        im = Image.open(f).convert("RGB")
        mask = remove(im, session=session, only_mask=True, post_process_mask=True)
        m = np.asarray(mask.filter(ImageFilter.GaussianBlur(1.2)), np.float32)
        if prev is not None:                      # lissage temporel : évite le scintillement du contour
            m = 0.65 * m + 0.35 * prev
        prev = m
        rgba = np.dstack([np.asarray(im), m.clip(0, 255).astype(np.uint8)])
        Image.fromarray(rgba, "RGBA").save(tmp / f"o{k:05d}.png")
        if k % 20 == 0:
            print(f"{k}/{len(frames)}")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", "30", "-i", str(tmp / "o%05d.png"),
                    "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "5M", "-auto-alt-ref", "0", str(dst)], check=True)
print("->", dst)
