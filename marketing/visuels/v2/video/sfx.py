"""Bruitages de la vidéo, synthétisés (aucune banque de sons) -> audio/sfx/*.wav.

whoosh  : souffle filtré qui balaie (transitions)
pop     : petite bulle descendante (apparition d'un élément)
tap     : tapotement d'écran
key1..8 : touche de clavier tactile (8 variantes)
vibrate, rustle, swipe, dive, shimmer : vibration, papier, balayage, plongée, scintillement
stamp   : coup de tampon sourd (badge)
notif   : carillon doux à deux notes (notification)
rise    : montée courte (révélation du logo)
"""
from pathlib import Path
import wave

import numpy as np

SR = 48000
OUT = Path(__file__).resolve().parent / "audio" / "sfx"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)


def save(name, x, gain=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    data = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    with wave.open(str(OUT / f"{name}.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())


def env(n, a, r):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / r)
    return e


def band(noise, lo, hi):
    f = np.fft.rfft(noise)
    fr = np.fft.rfftfreq(len(noise), 1 / SR)
    f[(fr < lo) | (fr > hi)] = 0
    return np.fft.irfft(f, len(noise))


def whoosh(dur=0.55, reverse=False):
    n = int(SR * dur)
    noise = rng.normal(0, 1, n)
    out = np.zeros(n)
    hop = 1024
    for i in range(0, n, hop):
        k = i / n
        c = 300 + 3500 * np.sin(np.pi * k) ** 1.5
        seg = band(noise[i:i + hop * 2], c * 0.5, c * 1.6)[:hop]
        out[i:i + len(seg)] += seg
    shape = np.sin(np.pi * np.linspace(0, 1, n)) ** 2
    x = out * shape
    return x[::-1] if reverse else x


def pop():
    n = int(SR * 0.12)
    t = np.arange(n) / SR
    f = 950 * np.exp(-t * 18) + 280
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(n, 0.003, 0.035)


def tap():
    n = int(SR * 0.06)
    t = np.arange(n) / SR
    click = rng.normal(0, 1, n) * env(n, 0.0005, 0.004)
    body = np.sin(2 * np.pi * 1700 * t) * env(n, 0.001, 0.012) * 0.5
    return band(click, 800, 9000) + body


def stamp():
    n = int(SR * 0.35)
    t = np.arange(n) / SR
    thud = np.sin(2 * np.pi * (70 + 60 * np.exp(-t * 30)) * t) * env(n, 0.002, 0.09)
    hit = band(rng.normal(0, 1, n), 200, 3000) * env(n, 0.0008, 0.02) * 0.6
    return thud + hit


def notif():
    n = int(SR * 0.6)
    t = np.arange(n) / SR
    a = np.sin(2 * np.pi * 880 * t) * env(n, 0.004, 0.18)
    b = np.zeros(n)
    d = int(SR * 0.11)
    b[d:] = np.sin(2 * np.pi * 1318.5 * t[: n - d]) * env(n - d, 0.004, 0.25)
    soft = lambda x: x + 0.25 * np.sin(2 * np.pi * 2 * 880 * t) * env(n, 0.004, 0.08)
    return soft(a * 0.7) + b * 0.6


def rise():
    n = int(SR * 0.7)
    t = np.arange(n) / SR
    f = 220 * (2 ** (t / 0.7 * 1.5))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / 0.7) ** 2 * np.exp(-np.maximum(0, t - 0.6) * 40)
    air = whoosh(0.7) * 0.6
    return tone * 0.4 + air


def key_ios(seed):
    """Clic de clavier tactile : transitoire très bref + petite résonance, varié à chaque touche."""
    r = np.random.default_rng(100 + seed)
    n = int(SR * 0.035)
    t = np.arange(n) / SR
    f0 = 3100 + r.uniform(-350, 350)
    click = band(r.normal(0, 1, n), 2500, 9000) * env(n, 0.0002, 0.0018)
    body = np.sin(2 * np.pi * f0 * t + r.uniform(0, 6.28)) * env(n, 0.0003, 0.0045) * 0.55
    low = np.sin(2 * np.pi * (520 + r.uniform(-60, 60)) * t) * env(n, 0.0004, 0.006) * 0.25
    return (click + body + low) * r.uniform(0.8, 1.0)


def vibrate():
    """Vibration de téléphone posée sur la main : bourdonnement grave pulsé."""
    n = int(SR * 0.42)
    t = np.arange(n) / SR
    buzz = np.sign(np.sin(2 * np.pi * 165 * t)) * 0.5 + np.sin(2 * np.pi * 165 * t) * 0.5
    buzz = band(buzz, 80, 900)
    gate = (np.sin(2 * np.pi * 5.0 * t) > -0.2).astype(float)
    gate = np.convolve(gate, np.ones(400) / 400, mode="same")
    return buzz * gate * env(n, 0.01, 0.5)


def rustle():
    """Froissement de feuilles : bruit filtré en rafales irrégulières."""
    n = int(SR * 0.7)
    x = band(rng.normal(0, 1, n), 1200, 9000)
    gates = np.zeros(n)
    for _ in range(9):
        c = rng.integers(0, n - 4000)
        L = rng.integers(1500, 5000)
        gates[c:c + L] += np.hanning(L) * rng.uniform(0.4, 1.0)
    return x * gates * np.sin(np.pi * np.linspace(0, 1, n))


def swipe():
    """Glissement net (balayage avant/après)."""
    return whoosh(0.32) * 0.9 + band(rng.normal(0, 1, int(SR * 0.32)), 3000, 12000) * np.sin(np.pi * np.linspace(0, 1, int(SR * 0.32))) ** 3 * 0.25


def dive(dur=1.1):
    """Plongée dans l'écran : souffle qui monte et s'accélère."""
    n = int(SR * dur)
    noise = rng.normal(0, 1, n)
    out = np.zeros(n)
    hop = 1024
    for i in range(0, n, hop):
        k = i / n
        c = 250 + 5500 * k ** 2
        seg = band(noise[i:i + hop * 2], c * 0.6, c * 1.5)[:hop]
        out[i:i + len(seg)] += seg
    shape = np.linspace(0, 1, n) ** 2 * np.exp(-np.maximum(0, np.linspace(0, 1, n) - 0.92) * 60)
    t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * np.cumsum(180 * 2 ** (t / dur * 2.2)) / SR) * shape * 0.25
    return out * shape + tone


def shimmer():
    """Scintillement doux à l'arrivée dans l'univers de la tablette."""
    n = int(SR * 0.9)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for f in (1318.5, 1760, 2637, 3520):
        x += np.sin(2 * np.pi * f * t + rng.uniform(0, 6)) * env(n, 0.01, 0.25 + rng.uniform(0, 0.2))
    return x * 0.5 + band(rng.normal(0, 1, n), 6000, 14000) * env(n, 0.005, 0.15) * 0.3


save("whoosh", whoosh(), 0.6)
save("whoosh2", whoosh(0.4), 0.55)
save("whoosh-in", whoosh(0.45, reverse=True), 0.55)
save("pop", pop(), 0.5)
save("tap", tap(), 0.5)
for i in range(1, 9):
    save(f"key{i}", key_ios(i), 0.5)
save("stamp", stamp(), 0.85)
save("notif", notif(), 0.45)
save("rise", rise(), 0.55)
save("vibrate", vibrate(), 0.6)
save("rustle", rustle(), 0.55)
save("swipe", swipe(), 0.6)
save("dive", dive(), 0.65)
save("shimmer", shimmer(), 0.45)
print("sfx ->", OUT)
