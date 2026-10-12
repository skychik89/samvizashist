"""Оптимизация картинок: ужимает JPG/PNG до 1600px по ширине и создаёт .webp рядом.

Запуск:  pip install pillow   затем   python optimize_images.py
Исходники перезаписываются только если шире 1600px (или это JPG — пережимается с quality=82).
"""
from pathlib import Path
from PIL import Image, ImageOps

MAX_W = 1600
ROOT = Path(__file__).parent / "assets"

for p in sorted(ROOT.rglob("*")):
    if p.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    im = ImageOps.exif_transpose(Image.open(p))
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    before = p.stat().st_size
    if p.suffix.lower() in {".jpg", ".jpeg"}:
        im.convert("RGB").save(p, "JPEG", quality=82, optimize=True, progressive=True)
    else:
        im.save(p, optimize=True)
    webp = p.with_suffix(".webp")
    im.save(webp, "WEBP", quality=80, method=6)
    print(f"{p.relative_to(ROOT)}: {before // 1024} KB -> {p.stat().st_size // 1024} KB, webp {webp.stat().st_size // 1024} KB")
