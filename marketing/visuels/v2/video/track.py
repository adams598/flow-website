"""Suivi de l'écran de tablette dans un clip réel + incrustation d'un autre écran.

1. Suivi : points d'intérêt dans l'écran (flux optique Lucas-Kanade), homographie
   RANSAC image par image (le doigt qui bouge est rejeté comme aberrant), puis
   propagation des 4 coins repérés à la main sur la première image.
2. Occlusion : la main (peau, reliée à l'extérieur de l'écran) est détectée et
   remise devant l'écran incrusté.
3. Incrustation : l'image d'écran est déformée dans le quadrilatère, coins arrondis,
   léger reflet, grain du clip conservé.

Usage : python track.py clip.mp4 debut_s duree_s ecran(.png|dossier) sortie_dir [coins_json] [rayon]
  ecran   : image fixe, ou dossier d'images NNNNN.jpg (une par image du clip)
  coins   : "[[x,y],[x,y],[x,y],[x,y]]" (TL, TR, BR, BL) sur la première image
  rayon   : arrondi des coins de l'écran, en fraction de la largeur (défaut 0.045)
"""
import json
import sys
from pathlib import Path

import cv2
import numpy as np

CLIP, START, DUR, SCREEN, OUT = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4], Path(sys.argv[5])
# Coins de l'écran sur la première image (TL, TR, BR, BL), repérés à la main.
CORNERS0 = np.float32(json.loads(sys.argv[6]) if len(sys.argv) > 6 else [[474, 594], [898, 687], [728, 1278], [290, 1160]])
RADIUS = float(sys.argv[7]) if len(sys.argv) > 7 else 0.045
OUT.mkdir(parents=True, exist_ok=True)

cap = cv2.VideoCapture(CLIP)
fps = cap.get(cv2.CAP_PROP_FPS)
cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(START * fps)))
frames = []
for _ in range(int(round(DUR * fps))):
    ok, f = cap.read()
    if not ok:
        break
    frames.append(f)
print(f"{len(frames)} images à {fps} i/s")


def poly_mask(shape, quad, shrink=0):
    m = np.zeros(shape[:2], np.uint8)
    q = quad.copy()
    if shrink:
        c = q.mean(axis=0)
        q = c + (q - c) * (1 - shrink)
    cv2.fillConvexPoly(m, q.astype(np.int32), 255)
    return m


def skin_mask(img, quad):
    """Main/doigts : peau dans le cadre, composantes qui touchent le bord de l'écran."""
    ycc = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
    skin = cv2.inRange(ycc, (40, 138, 85), (255, 175, 128))
    skin = cv2.morphologyEx(skin, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    skin = cv2.morphologyEx(skin, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    inside = poly_mask(img.shape, quad)
    border = cv2.subtract(cv2.dilate(inside, np.ones((25, 25), np.uint8)), cv2.erode(inside, np.ones((25, 25), np.uint8)))
    n, lab = cv2.connectedComponents(skin)
    keep = np.zeros_like(skin)
    for i in range(1, n):
        comp = (lab == i).astype(np.uint8) * 255
        outside = cv2.countNonZero(cv2.subtract(comp, inside))
        if outside > 4000 and cv2.countNonZero(cv2.bitwise_and(comp, border)) > 30 and cv2.countNonZero(cv2.bitwise_and(comp, inside)) > 200:
            keep = cv2.bitwise_or(keep, comp)
    keep = cv2.bitwise_and(keep, inside)
    keep = cv2.dilate(keep, np.ones((3, 3), np.uint8))
    return cv2.GaussianBlur(keep, (7, 7), 0)


# --- Suivi -------------------------------------------------------------------
corners = [CORNERS0.copy()]
prev = cv2.cvtColor(frames[0], cv2.COLOR_BGR2GRAY)
for k in range(1, len(frames)):
    cur = cv2.cvtColor(frames[k], cv2.COLOR_BGR2GRAY)
    quad = corners[-1]
    # Uniquement la coque et la bordure : le contenu de l'écran défile sous le doigt.
    outer = poly_mask(prev.shape, quad, shrink=-0.09)
    inner = poly_mask(prev.shape, quad, shrink=0.03)
    m = cv2.subtract(outer, inner)
    m = cv2.subtract(m, cv2.dilate(skin_mask(frames[k - 1], quad), np.ones((15, 15), np.uint8)))
    p0 = cv2.goodFeaturesToTrack(prev, 500, 0.005, 6, mask=m)
    p1, st, _ = cv2.calcOpticalFlowPyrLK(prev, cur, p0, None, winSize=(31, 31), maxLevel=4)
    good0, good1 = p0[st == 1], p1[st == 1]
    H, inl = cv2.findHomography(good0, good1, cv2.RANSAC, 2.0)
    nxt = cv2.perspectiveTransform(quad.reshape(-1, 1, 2), H).reshape(-1, 2)
    corners.append(nxt.astype(np.float32))
    prev = cur

# Lissage temporel léger des coins (tremblement du suivi).
C = np.array(corners)
k = np.array([1, 4, 6, 4, 1], np.float32) / 16
Cs = C.copy()
for i in range(4):
    for j in range(2):
        Cs[:, i, j] = np.convolve(np.pad(C[:, i, j], 2, mode="edge"), k, mode="valid")
json.dump(Cs.tolist(), open(OUT / "corners.json", "w"))

# --- Incrustation ------------------------------------------------------------
SEQ = sorted(Path(SCREEN).glob("*.jpg")) if Path(SCREEN).is_dir() else None
scr = cv2.imread(str(SEQ[0]) if SEQ else SCREEN, cv2.IMREAD_COLOR)
sh, sw = scr.shape[:2]
src = np.float32([[0, 0], [sw, 0], [sw, sh], [0, sh]])
# Coins arrondis de l'écran.
rmask = np.zeros((sh, sw), np.uint8)
r = int(sw * RADIUS)
cv2.rectangle(rmask, (r, 0), (sw - r, sh), 255, -1)
cv2.rectangle(rmask, (0, r), (sw, sh - r), 255, -1)
for cx, cy in [(r, r), (sw - r, r), (sw - r, sh - r), (r, sh - r)]:
    cv2.circle(rmask, (cx, cy), r, 255, -1)

for i, f in enumerate(frames):
    if SEQ:
        scr = cv2.imread(str(SEQ[min(i, len(SEQ) - 1)]), cv2.IMREAD_COLOR)
    quad = Cs[i]
    # Légèrement agrandi : couvre la barre d'état d'origine sous la bordure.
    qc = quad.mean(axis=0)
    quad = (qc + (quad - qc) * 1.025).astype(np.float32)
    M = cv2.getPerspectiveTransform(src, quad)
    warped = cv2.warpPerspective(scr, M, (f.shape[1], f.shape[0]), flags=cv2.INTER_CUBIC)
    alpha = cv2.warpPerspective(rmask, M, (f.shape[1], f.shape[0]), flags=cv2.INTER_LINEAR).astype(np.float32) / 255
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
    # Exposition du plan : l'écran incrusté prend la luminosité moyenne de l'écran d'origine.
    lum = f[alpha > 0.5].astype(np.float32).mean() / 225.0
    comp = warped.astype(np.float32) * np.clip(0.9 * lum + 0.1, 0.82, 1.0)
    # Reflet diagonal discret.
    yy, xx = np.mgrid[0:f.shape[0], 0:f.shape[1]].astype(np.float32)
    glare = np.clip(1 - np.abs((xx * 0.6 + yy * 0.8) - (quad[:, 0].mean() * 0.6 + quad[:, 1].mean() * 0.8 - 120)) / 260, 0, 1) * 18
    comp = comp + glare[..., None]
    a = alpha[..., None]
    out = f.astype(np.float32) * (1 - a) + comp * a
    # La main repasse devant.
    hand = skin_mask(f, quad).astype(np.float32)[..., None] / 255
    out = out * (1 - hand) + f.astype(np.float32) * hand
    # Grain synthétique sur l'écran, proche de celui du clip.
    rng = np.random.default_rng(i)
    out = out + rng.normal(0, 2.2, f.shape[:2]).astype(np.float32)[..., None] * a
    cv2.imwrite(str(OUT / f"{i:05d}.jpg"), np.clip(out, 0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 94])
print("->", len(frames), "images incrustées dans", OUT)
