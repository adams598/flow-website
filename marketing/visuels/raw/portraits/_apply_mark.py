"""Inpaint fake V logos and overlay the official Flow chevron."""
from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(r"a:/PROJETS/flow-website")
SRC = ROOT / "marketing/visuels/raw/portraits"
MARK = ROOT / "public/brand/flow-mark.png"
OUT = ROOT / "public"

# Wearer's left chest = right side of the photo. Centers in 864x1152.
JOBS = [
    {
        "src": "cyan-v2.png",
        "out": "photo-cyan.jpg",
        "center": (561, 783),
        "color": (13, 74, 82),
        "mark_w": 42,
        "cover_r": (36, 26),
        "clean_bg": False,
    },
    {
        "src": "cyan-sombre-v2.png",
        "out": "photo-cyan-sombre.jpg",
        "center": (652, 998),
        "color": (125, 244, 255),
        "mark_w": 38,
        "cover_r": (48, 34),
        "clean_bg": False,
    },
    {
        "src": "terre-v2.png",
        "out": "photo-terre.jpg",
        "center": (632, 972),
        "color": (63, 44, 36),
        "mark_w": 38,
        "cover_r": (48, 32),
        "clean_bg": False,
    },
    {
        "src": "pinterest-v2.png",
        "out": "photo-2.jpg",
        "center": (502, 450),
        "color": (27, 42, 68),
        "mark_w": 36,
        "cover_r": (52, 28),
        "clean_bg": True,
    },
]


def load_mark_alpha(width: int) -> Image.Image:
    mark = Image.open(MARK).convert("RGBA")
    arr = np.array(mark)
    lum = arr[:, :, :3].max(axis=2)
    alpha = np.clip((lum.astype(np.float32) - 18) * 1.15, 0, 255).astype(np.uint8)
    h, w = alpha.shape
    rgba = np.dstack([np.full((h, w, 3), 255, np.uint8), alpha])
    img = Image.fromarray(rgba, "RGBA")
    ratio = width / w
    return img.resize((width, max(1, int(h * ratio))), Image.Resampling.LANCZOS)


def tint(mark: Image.Image, rgb: tuple[int, int, int]) -> Image.Image:
    arr = np.array(mark)
    arr[:, :, 0] = rgb[0]
    arr[:, :, 1] = rgb[1]
    arr[:, :, 2] = rgb[2]
    arr[:, :, 3] = (arr[:, :, 3].astype(np.float32) * 0.98).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")


def cover_logo(bgr: np.ndarray, cx: int, cy: int, rx: int, ry: int) -> np.ndarray:
    h, w = bgr.shape[:2]
    sx = max(rx + 4, cx - 70)
    x0, x1 = max(0, sx - rx), min(w, sx + rx)
    y0, y1 = max(0, cy - ry), min(h, cy + ry)
    patch = bgr[y0:y1, x0:x1]
    if patch.size == 0:
        color = [int(v) for v in np.median(bgr.reshape(-1, 3), axis=0)]
    else:
        color = [int(v) for v in np.median(patch.reshape(-1, 3), axis=0)]
    painted = bgr.copy()
    cv2.ellipse(painted, (cx, cy), (rx, ry), 0, 0, 360, color, -1)
    mask = np.zeros((h, w), np.float32)
    cv2.ellipse(mask, (cx, cy), (rx, ry), 0, 0, 360, 1, -1)
    mask = cv2.GaussianBlur(mask, (11, 11), 0)[:, :, None]
    return (painted * mask + bgr * (1 - mask)).astype(np.uint8)


def clean_studio_edge(bgr: np.ndarray) -> np.ndarray:
    h, w = bgr.shape[:2]
    out = bgr.copy()
    x0 = int(w * 0.88)
    for x in range(x0, w):
        fade = float(np.clip((x - x0) / max(1, w - 1 - x0) * 1.2, 0, 1))
        col = out[:, x]
        lum = col.astype(np.float32).mean(axis=1)
        hit = lum > 28
        out[hit, x] = (col[hit] * (1.0 - fade)).astype(np.uint8)
    return out


def apply(job: dict) -> Path:
    im = Image.open(SRC / job["src"]).convert("RGB")
    bgr = cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)
    if job["clean_bg"]:
        bgr = clean_studio_edge(bgr)
    rx, ry = job["cover_r"]
    bgr = cover_logo(bgr, job["center"][0], job["center"][1], rx, ry)
    rgb = Image.fromarray(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)).convert("RGBA")
    chevron = tint(load_mark_alpha(job["mark_w"]), job["color"])
    x = job["center"][0] - chevron.width // 2
    y = job["center"][1] - chevron.height // 2
    rgb.alpha_composite(chevron, (x, y))
    final = rgb.convert("RGB")
    dest = OUT / job["out"]
    final.save(dest, "JPEG", quality=95, subsampling=0, optimize=True)
    final.save(SRC / job["out"].replace(".jpg", ".png"))
    return dest


if __name__ == "__main__":
    for job in JOBS:
        path = apply(job)
        print(path, Image.open(path).size)
