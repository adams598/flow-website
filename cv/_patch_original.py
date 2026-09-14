# -*- coding: utf-8 -*-
"""Remplace 2 textes dans le CV original, mêmes polices / tailles."""
from __future__ import annotations

import shutil
from pathlib import Path

import pymupdf
from fontTools.ttLib import TTFont

ROOT = Path(r"a:\PROJETS\flow-website")
SRC = ROOT / "CV ADAMS ING.pdf"
BACKUP = ROOT / "cv" / "assets" / "CV_ADAMS_ING_source.pdf"
FONT_DIR = ROOT / "cv" / "assets" / "fonts"
OUT = ROOT / "CV ADAMS ING.pdf"

REPLACEMENTS = [
    {
        "old": "Particulier, Limoges, France",
        "new": "BAI Formation Consulting, Limoges, France",
    },
    {
        "old": "(1 an)",
        "new": "(2ans)",
        "near": "septembre 2024",
    },
    {
        "old": "1 an d'expérience",
        "new": "2 ans d'expériences",
    },
]


def color_to_rgb(value: int) -> tuple[float, float, float]:
    return (
        ((value >> 16) & 255) / 255,
        ((value >> 8) & 255) / 255,
        (value & 255) / 255,
    )


def extract_fonts(doc: pymupdf.Document) -> dict[str, Path]:
    FONT_DIR.mkdir(parents=True, exist_ok=True)
    found: dict[str, Path] = {}
    page = doc[0]
    for item in page.get_fonts(full=True):
        xref = item[0]
        name, ext, _subtype, data = doc.extract_font(xref)
        if not data or not name:
            continue
        path = FONT_DIR / f"{name.replace('+', '_')}.{ext or 'ttf'}"
        path.write_bytes(data)
        found[name] = path
        found[name.split("+")[-1]] = path
        print("font", name, path.name, len(data))
    return found


def copy_missing_glyphs(dest_font: Path, source_font: Path, chars: str) -> Path:
    out = dest_font.with_name(dest_font.stem + "-patched.ttf")
    bold = TTFont(dest_font)
    regular = TTFont(source_font)
    cmap_b = bold.getBestCmap() or {}
    cmap_r = regular.getBestCmap() or {}
    glyf_b = bold["glyf"]
    glyf_r = regular["glyf"]
    hmtx_b = bold["hmtx"]
    hmtx_r = regular["hmtx"]
    order = list(bold.getGlyphOrder())

    for ch in chars:
        cp = ord(ch)
        if cp in cmap_b:
            continue
        if cp not in cmap_r:
            raise SystemExit(f"Glyphe manquant: {ch!r}")
        name = cmap_r[cp]
        if name not in order:
            order.append(name)
        glyf_b[name] = glyf_r[name]
        try:
            hmtx_b.metrics[name] = hmtx_r.metrics[name]
        except Exception:
            hmtx_b[name] = hmtx_r[name]
        for table in bold["cmap"].tables:
            table.cmap[cp] = name

    bold.setGlyphOrder(order)
    if "maxp" in bold:
        bold["maxp"].numGlyphs = len(order)
    bold.save(out)
    return out


def find_span(page: pymupdf.Page, text: str, near: str | None = None):
    hits = []
    data = page.get_text("dict")
    for block in data["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            line_text = "".join(s["text"] for s in line.get("spans", []))
            for span in line.get("spans", []):
                if span["text"] != text:
                    continue
                if near and near not in line_text:
                    continue
                hits.append(span)
    if not hits:
        raise SystemExit(f"Texte introuvable: {text!r}")
    return hits[0]


def main() -> None:
    if not BACKUP.exists():
        shutil.copyfile(SRC, BACKUP)

    doc = pymupdf.open(BACKUP)
    fonts = extract_fonts(doc)
    bold = fonts["Inter-Bold"]
    regular = fonts["Inter-Regular"]
    needed = "".join(spec["new"] for spec in REPLACEMENTS)
    patched_bold = copy_missing_glyphs(bold, regular, needed)
    patched_regular = copy_missing_glyphs(regular, bold, needed)
    font_files = {
        "Inter-Bold": patched_bold,
        "Inter-Regular": patched_regular,
    }

    page = doc[0]
    jobs = []
    for spec in REPLACEMENTS:
        span = find_span(page, spec["old"], spec.get("near"))
        font_path = font_files.get(span["font"])
        if not font_path:
            raise SystemExit(f"Police manquante: {span['font']}")
        jobs.append((span, spec["new"], font_path))
        pad = pymupdf.Rect(span["bbox"])
        pad.x0 -= 0.4
        pad.y0 -= 0.4
        pad.x1 += 1.2
        pad.y1 += 0.4
        page.add_redact_annot(pad, fill=(1, 1, 1))

    page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE)

    for span, new_text, font_path in jobs:
        page.insert_text(
            pymupdf.Point(span["origin"][0], span["origin"][1]),
            new_text,
            fontfile=str(font_path),
            fontsize=span["size"],
            color=color_to_rgb(span["color"]),
        )
        print(
            "replaced",
            span["text"],
            "->",
            new_text,
            "size",
            round(span["size"], 3),
            span["font"],
        )

    tmp = ROOT / "cv" / "out" / "CV_ADAMS_ING.pdf"
    tmp.parent.mkdir(parents=True, exist_ok=True)
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    shutil.copyfile(tmp, OUT)
    shutil.copyfile(tmp, ROOT / "cv" / "CV ADAMS ING.pdf")

    pix_doc = pymupdf.open(OUT)
    pix = pix_doc[0].get_pixmap(matrix=pymupdf.Matrix(2.2, 2.2), alpha=False)
    pix.save(str(ROOT / "cv" / "assets" / "patched-cv.png"))
    text = pix_doc[0].get_text()
    print("pages", pix_doc.page_count)
    print("BAI", "BAI Formation Consulting" in text)
    print("2ans", "(2ans)" in text)
    print("2 ans", "2 ans d'expériences" in text)
    print("1 an d", "1 an d" in text)
    print("Particulier", "Particulier" in text)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
