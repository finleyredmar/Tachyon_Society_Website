"""Prepares supporter logos for the floating logo loop.

   python3 tools/optimize_supporters.py <ansys> <ecole-jeannine-manuel> <lycee-international>
   python3 tools/optimize_supporters.py --cutout      # convert the existing assets/supporters/*.webp in place

Each source is flattened onto white, cropped to its artwork, resized to 2x the display height and then
turned into a transparent cut-out (white becomes alpha), so the CSS drop-shadow follows the logo's own
shape and the logo can float on the light stage. Written as assets/supporters/<slug>.webp (RGBA) plus
assets/supporters/manifest.json with the pixel sizes."""
import sys, json
from PIL import Image
import numpy as np

SLUGS = ["ansys", "ecole-jeannine-manuel", "lycee-international"]
HEIGHT = 168  # 2x the 84px display height

def flatten(path):
    im = Image.open(path).convert("RGBA")
    white = Image.new("RGBA", im.size, (255, 255, 255, 255))
    white.alpha_composite(im)
    return white.convert("RGB")

def normalise_background(rgb):
    """Pull a flat off-white backdrop (such as #f7f7f7) up to pure white."""
    a = np.asarray(rgb).astype(float)
    corner = np.median(np.concatenate([a[:6, :6].reshape(-1, 3), a[-6:, -6:].reshape(-1, 3)]), axis=0)
    if corner.min() < 254:
        a = np.clip(a / corner * 255.0, 0, 255)
    return Image.fromarray(a.astype("uint8"))

def crop_to_art(rgb, pad=6):
    a = np.asarray(rgb)
    mask = a.min(axis=2) < 235
    ys, xs = np.where(mask)
    box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad + 1, rgb.width), min(ys.max() + pad + 1, rgb.height))
    return rgb.crop(box)

def cutout(rgb):
    """Colour-to-alpha against white: the least-white channel sets the opacity and the original ink
    colour is recovered underneath it, so anti-aliased edges stay clean on any light ground."""
    a = np.asarray(rgb.convert("RGB")).astype(float)
    alpha = 1.0 - a.min(axis=2) / 255.0
    alpha[alpha < 0.04] = 0.0                      # kill off-white compression noise
    safe = np.where(alpha > 0, alpha, 1.0)[..., None]
    ink = np.clip((a - 255.0 * (1.0 - alpha[..., None])) / safe, 0, 255)
    out = np.dstack([ink, alpha * 255.0]).round().astype("uint8")
    return Image.fromarray(out, "RGBA")

def save(im, slug):
    im.save(f"assets/supporters/{slug}.webp", quality=95, alpha_quality=100, method=6)

manifest = {}
if sys.argv[1:2] == ["--cutout"]:
    for slug in SLUGS:
        im = Image.open(f"assets/supporters/{slug}.webp")
        if im.mode != "RGBA":                       # already a cut-out: leave it alone
            im = cutout(im)
            save(im, slug)
        manifest[slug] = {"w": im.width, "h": im.height}
        print(slug, im.size, "cutout")
else:
    for slug, src in zip(SLUGS, sys.argv[1:4]):
        im = crop_to_art(normalise_background(flatten(src)))
        w = round(im.width * HEIGHT / im.height)
        im = cutout(im.resize((w, HEIGHT), Image.LANCZOS))
        save(im, slug)
        manifest[slug] = {"w": im.width, "h": im.height}
        print(slug, im.size)
json.dump(manifest, open("assets/supporters/manifest.json", "w"))
