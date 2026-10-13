"""Mesure précise de l'écran d'une tablette dans un clip réel, image par image,
puis incrustation d'un autre écran.

Mesure : pour chaque côté de l'écran, 60 profils perpendiculaires au bord ; sur chacun,
on cherche la transition écran clair -> bordure noire (plus forte pente). Les points
masqués par la main sont écartés, une droite est ajustée (RANSAC + moindres carrés),
et les 4 coins sont les intersections des 4 droites. Aucune estimation à l'œil après
l'initialisation, aucune dérive : chaque image est mesurée indépendamment.

Usage : python track2.py clip.mp4 debut_s duree_s ecran(.png|dossier) sortie_dir coins_init_json [rayon]
"""
import json
import sys
from pathlib import Path

import cv2
import numpy as np

CLIP, START, DUR, SCREEN, OUT = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4], Path(sys.argv[5])
Q0 = np.float32(json.loads(sys.argv[6]))
RADIUS = float(sys.argv[7]) if len(sys.argv) > 7 else 0.03
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


def skin(img):
    ycc = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
    m = cv2.inRange(ycc, (40, 138, 85), (255, 175, 128))
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    return cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))


def intersect(l1, l2):
    (vx1, vy1, x1, y1), (vx2, vy2, x2, y2) = l1, l2
    A = np.array([[vx1, -vx2], [vy1, -vy2]], np.float64)
    t = np.linalg.solve(A, np.array([x2 - x1, y2 - y1], np.float64))
    return np.array([x1 + t[0] * vx1, y1 + t[0] * vy1], np.float32)


def refine_top(img, quad, n=60):
    """Bord du haut : au-dessus de la barre d'état sombre (gris ~75) se trouve la bordure
    noire (~38). On cherche cette transition au-delà de la ligne mesurée, puis on ajuste."""
    g = cv2.GaussianBlur(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), (3, 3), 0).astype(np.float32)
    a, b = quad[0], quad[1]
    d = (b - a) / np.linalg.norm(b - a)
    nrm = np.array([d[1], -d[0]], np.float32)
    if np.dot((a + b) / 2 - quad.mean(axis=0), nrm) < 0:
        nrm = -nrm
    offs = np.arange(2, 44, 0.5, dtype=np.float32)
    pts = []
    for s_ in np.linspace(0.1, 0.9, n):
        p = a + (b - a) * s_
        xs, ys = (p[0] + offs * nrm[0]).reshape(1, -1).astype(np.float32), (p[1] + offs * nrm[1]).reshape(1, -1).astype(np.float32)
        prof = cv2.remap(g, xs, ys, cv2.INTER_LINEAR)[0]
        grad = np.diff(prof)
        i = int(np.argmin(grad))
        inside, outside = prof[max(0, i - 5):i + 1].mean(), prof[i + 1:i + 7].mean()
        if grad[i] < -5 and 55 < inside < 130 and outside < 52:
            pts.append(p + (offs[i] + 0.25) * nrm)
    if len(pts) < 10:
        return quad
    pts = np.float32(pts)
    vx, vy, x0, y0 = cv2.fitLine(pts, cv2.DIST_HUBER, 0, 0.01, 0.01).ravel()
    top = (vx, vy, x0, y0)
    left = (*(quad[0] - quad[3]) / np.linalg.norm(quad[0] - quad[3]), *quad[3])
    right = (*(quad[1] - quad[2]) / np.linalg.norm(quad[1] - quad[2]), *quad[2])
    q = quad.copy()
    q[0] = intersect(left, top)
    q[1] = intersect(right, top)
    return q


def refine(img, quad, search=22, n=60):
    g = cv2.GaussianBlur(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), (3, 3), 0).astype(np.float32)
    sk = skin(img)
    sk = cv2.dilate(sk, np.ones((21, 21), np.uint8))
    c = quad.mean(axis=0)
    lines = []
    for k in range(4):
        a, b = quad[k], quad[(k + 1) % 4]
        d = (b - a) / np.linalg.norm(b - a)
        nrm = np.array([d[1], -d[0]], np.float32)
        if np.dot((a + b) / 2 - c, nrm) < 0:
            nrm = -nrm  # normale vers l'extérieur
        pts = []
        offs = np.arange(-search, search + 0.5, 0.5, dtype=np.float32)
        for s in np.linspace(0.08, 0.92, n):
            p = a + (b - a) * s
            xs, ys = p[0] + offs * nrm[0], p[1] + offs * nrm[1]
            if xs.min() < 1 or ys.min() < 1 or xs.max() > img.shape[1] - 2 or ys.max() > img.shape[0] - 2:
                continue
            if sk[int(p[1]), int(p[0])]:
                continue  # doigt sur le bord
            prof = cv2.remap(g, xs.reshape(1, -1).astype(np.float32), ys.reshape(1, -1).astype(np.float32), cv2.INTER_LINEAR)[0]
            grad = np.diff(prof)
            i = int(np.argmin(grad))            # chute clair -> sombre vers l'extérieur
            inside, outside = prof[max(0, i - 6):i].mean() if i > 0 else 0, prof[i + 1:i + 7].mean() if i < len(prof) - 2 else 255
            if grad[i] < -6 and inside > 120 and outside < 90:
                o = (offs[i] + offs[i + 1]) / 2
                pts.append(p + o * nrm)
        pts = np.float32(pts)
        if len(pts) < 10:
            vx, vy = d
            lines.append((vx, vy, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2))
            continue
        # RANSAC simple puis ajustement robuste sur les inliers.
        best = None
        rng = np.random.default_rng(k)
        for _ in range(200):
            i1, i2 = rng.choice(len(pts), 2, replace=False)
            v = pts[i2] - pts[i1]
            if np.linalg.norm(v) < 20:
                continue
            v /= np.linalg.norm(v)
            dist = np.abs((pts - pts[i1]) @ np.array([-v[1], v[0]]))
            inl = dist < 1.5
            if best is None or inl.sum() > best.sum():
                best = inl
        vx, vy, x0, y0 = cv2.fitLine(pts[best], cv2.DIST_HUBER, 0, 0.01, 0.01).ravel()
        lines.append((vx, vy, x0, y0))
    q = np.array([intersect(lines[3], lines[0]), intersect(lines[0], lines[1]), intersect(lines[1], lines[2]), intersect(lines[2], lines[3])], np.float32)
    return q


corners = []
q = Q0.copy()
for i, f in enumerate(frames):
    for _ in range(3 if i == 0 else 2):
        q = refine(f, q)
    corners.append(refine_top(f, q))

# Lissage temporel très léger (bruit de mesure sub-pixel), sans retard.
C = np.array(corners)
k = np.array([1, 2, 1], np.float32) / 4
Cs = C.copy()
for a in range(4):
    for b in range(2):
        Cs[:, a, b] = np.convolve(np.pad(C[:, a, b], 1, mode="edge"), k, mode="valid")
json.dump(Cs.tolist(), open(OUT / "corners.json", "w"))
print("coins image 0 :", np.round(Cs[0]).astype(int).tolist())

# --- Contrôle visuel : contour mesuré sur l'image d'origine ---
chk = frames[0].copy()
cv2.polylines(chk, [np.int32(Cs[0])], True, (0, 255, 255), 2)
cv2.imwrite(str(OUT / "_controle.jpg"), chk)

# --- Incrustation ---
SEQ = sorted(Path(SCREEN).glob("*.jpg")) if Path(SCREEN).is_dir() else None
scr = cv2.imread(str(SEQ[0]) if SEQ else SCREEN, cv2.IMREAD_COLOR)
sh, sw = scr.shape[:2]
src = np.float32([[0, 0], [sw, 0], [sw, sh], [0, sh]])
rmask = np.zeros((sh, sw), np.uint8)
r = int(sw * RADIUS)
cv2.rectangle(rmask, (r, 0), (sw - r, sh), 255, -1)
cv2.rectangle(rmask, (0, r), (sw, sh - r), 255, -1)
for cx, cy in [(r, r), (sw - r, r), (sw - r, sh - r), (r, sh - r)]:
    cv2.circle(rmask, (cx, cy), r, 255, -1, cv2.LINE_AA)

for i, f in enumerate(frames):
    if SEQ:
        scr = cv2.imread(str(SEQ[min(i, len(SEQ) - 1)]), cv2.IMREAD_COLOR)
    quad = Cs[i]
    M = cv2.getPerspectiveTransform(src, quad)
    H, W = f.shape[:2]
    warped = cv2.warpPerspective(scr, M, (W, H), flags=cv2.INTER_CUBIC)
    alpha = cv2.warpPerspective(rmask, M, (W, H), flags=cv2.INTER_LINEAR).astype(np.float32) / 255
    a = alpha[..., None]
    # Exposition : l'écran prend la luminosité de l'écran d'origine (mesurée sur ses marges claires).
    ref = f[(alpha > 0.5)].astype(np.float32)
    lum = np.percentile(ref, 85) / 235.0
    comp = warped.astype(np.float32) * np.clip(lum, 0.8, 1.02)
    # Reflet très léger, dans l'axe de la lumière du plan (haut gauche).
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    cxq, cyq = quad[:, 0].mean(), quad[:, 1].mean()
    comp += (np.clip(1 - np.abs((xx - cxq) * 0.6 + (yy - cyq) * 0.8 + 140) / 300, 0, 1) * 10)[..., None]
    out = f.astype(np.float32) * (1 - a) + comp * a
    # La main repasse devant l'écran (peau reliée à l'extérieur de l'écran).
    sk = skin(f)
    inside = (alpha > 0.5).astype(np.uint8) * 255
    n, lab = cv2.connectedComponents(sk)
    hand = np.zeros_like(sk)
    for j in range(1, n):
        comp_j = (lab == j).astype(np.uint8) * 255
        if cv2.countNonZero(cv2.subtract(comp_j, inside)) > 4000 and cv2.countNonZero(cv2.bitwise_and(comp_j, inside)) > 150:
            hand = cv2.bitwise_or(hand, comp_j)
    hand = cv2.GaussianBlur(cv2.dilate(cv2.bitwise_and(hand, inside), np.ones((3, 3), np.uint8)), (5, 5), 0).astype(np.float32)[..., None] / 255
    out = out * (1 - hand) + f.astype(np.float32) * hand
    rng = np.random.default_rng(i)
    out += rng.normal(0, 2.0, (H, W)).astype(np.float32)[..., None] * a
    cv2.imwrite(str(OUT / f"{i:05d}.jpg"), np.clip(out, 0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 95])
print("->", len(frames), "images incrustées")
