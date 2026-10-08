#!/usr/bin/env python3
"""
Turn the original photography and videos into web-sized assets.

Usage (from the repo root):
    python3 tools/optimize_media.py /path/to/original/site

Reads  <original>/images/**  and  <original>/videos/*
Writes assets/img/*.webp, assets/img/manifest.json, assets/video/*

The manifest is read by tools/build.mjs to emit responsive <img srcset>.
"""
import json
import os
import subprocess
import sys

from PIL import Image, ImageOps

SRC = sys.argv[1] if len(sys.argv) > 1 else "../trs-original"
OUT_IMG = "assets/img"
OUT_VID = "assets/video"
os.makedirs(OUT_IMG, exist_ok=True)
os.makedirs(OUT_VID, exist_ok=True)

# key: (source path, widths to emit, webp quality, optional crop box (l, t, r, b) in source px)
PHOTOS = {
    "awards":        ("images/awards.jpg",                       [800, 1600, 2400], 76, None),
    "team":          ("images/team-photo.jpg",                   [800, 1600, 2400], 74, None),
    "nationals":     ("images/t.jpg",                            [800, 1600, 2400], 76, None),
    "windtunnel":    ("images/competition.jpg",                  [800, 1600, 2400], 76, None),
    "startgate":     ("images/national-team.jpg",                [1274],            80, None),
    "worlds-stage":  ("images/Home/French_on_stage.jpg",         [800, 1600],       78, None),
    "car":           ("images/Stem_competitions/car.jpg",        [640, 1000, 1600], 76, None),
    "simscale":      ("images/Stem_competitions/Simscale.png",   [800, 1600],       86, None),
    # people (portraits are small in the originals, so they are only capped, never upscaled)
    "p-hugo":        ("images/Home/Hugo.png",                    [314],             84, (0, 0, 306, 310)),
    "p-ines":        ("images/Home/Ines.png",                    [480, 739],        80, None),
    "p-julien":      ("images/Home/Julien.png",                  [399],             82, None),
    "p-liane":       ("images/Home/Liane.png",                   [480, 960],        80, None),
    "p-taymour":     ("images/Home/Taymour.png",                 [210],             84, None),
    # Zephyr
    "z-logo":        ("images/Zephyr/Logo.png",                  [200],             90, None),
    "z-award":       ("images/Zephyr/Award.png",                 [304],             84, None),
    "z-display":     ("images/Zephyr/Display.jpg",               [800, 1600],       76, None),
    "z-giving":      ("images/Zephyr/giving.jpg",                [640, 1000],       76, None),
    "z-pit":         ("images/Zephyr/pit_display_.jpg",          [640, 1000],       76, None),
    # Wild
    "w-award":       ("images/Wild/Award.png",                   [410],             84, None),
    "w-fastcar":     ("images/Wild/Fast_car.jpg",                [540, 1080],       80, None),
    "w-handshake":   ("images/Wild/handshake.jpg",               [640, 1000],       76, None),
    "w-team":        ("images/Wild/official_team_photo.jpg",     [640, 1000],       76, None),
    "w-walk":        ("images/Wild/teamm.jpg",                   [640, 1000],       76, None),
    "w-watching":    ("images/Wild/watching.jpg",                [640, 1059],       78, None),
    # Nova Track
    "n-award":       ("images/Nova/Award.png",                   [276],             84, None),
    "n-giving":      ("images/Nova/giving2.jpg",                 [640, 1000],       76, None),
    "n-pit":         ("images/Nova/pit_display.jpg",             [640, 1000],       76, None),
    "n-team":        ("images/Nova/team_photo.jpg",              [640, 1000],       76, None),
    "n-watching":    ("images/Nova/watching_races.jpg",          [640, 1000],       76, None),
}

manifest = {}
total_in = total_out = 0

for key, (rel, widths, quality, crop) in PHOTOS.items():
    path = os.path.join(SRC, rel)
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if crop:
        im = im.crop(crop)
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if has_alpha else "RGB")
    sw, sh = im.size
    emitted = []
    for w in widths:
        w = min(w, sw)
        h = round(sh * w / sw)
        resized = im if w == sw else im.resize((w, h), Image.LANCZOS)
        out = os.path.join(OUT_IMG, f"{key}-{w}.webp")
        resized.save(out, "WEBP", quality=quality, method=6)
        emitted.append(w)
        total_out += os.path.getsize(out)
    emitted = sorted(set(emitted))
    manifest[key] = {"widths": emitted, "w": emitted[-1], "h": round(sh * emitted[-1] / sw)}
    total_in += os.path.getsize(path)

# Logo: remove the white background so it works on both themes (same mark, same colours).
logo = Image.open(os.path.join(SRC, "images/logo.png")).convert("RGB")
import numpy as np
arr = np.asarray(logo).astype(np.float32) / 255.0
# alpha = how far each pixel is from white (max channel distance), then un-premultiply against white
dist = 1.0 - arr.min(axis=2)
alpha = np.clip(dist * 1.6, 0, 1)
safe = np.maximum(alpha, 1e-3)[..., None]
rgb = np.clip((arr - (1 - alpha[..., None])) / safe, 0, 1)
rgba = np.dstack([rgb, alpha])
# The source file has a tiny stray mark below the wordmark. Drop everything under the last full text row.
rows = (alpha > 0.2).sum(axis=1)
last_main = int(np.where(rows > 40)[0].max())
rgba[last_main + 8:, :, 3] = 0
logo_rgba = Image.fromarray((rgba * 255).astype(np.uint8), "RGBA")
bbox = logo_rgba.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
logo_rgba = logo_rgba.crop(bbox)
pad = 12
canvas = Image.new("RGBA", (logo_rgba.width + pad * 2, logo_rgba.height + pad * 2), (0, 0, 0, 0))
canvas.paste(logo_rgba, (pad, pad))
for w in (240, 480):
    r = canvas.resize((w, round(canvas.height * w / canvas.width)), Image.LANCZOS)
    r.save(os.path.join(OUT_IMG, f"logo-{w}.png"), optimize=True)
manifest["logo"] = {"widths": [240, 480], "w": 480, "h": round(canvas.height * 480 / canvas.width), "ext": "png"}

# Icons and social card
icon_src = canvas
side = max(icon_src.size)
sq = Image.new("RGBA", (side, side), (255, 255, 255, 255))
sq.alpha_composite(icon_src, ((side - icon_src.width) // 2, (side - icon_src.height) // 2))
sq.convert("RGB").resize((180, 180), Image.LANCZOS).save("apple-touch-icon.png", optimize=True)
sq.convert("RGB").resize((48, 48), Image.LANCZOS).save("favicon.png", optimize=True)

og = ImageOps.exif_transpose(Image.open(os.path.join(SRC, "images/awards.jpg"))).convert("RGB")
ow, oh = og.size
target = 1200 / 630
ch = int(ow / target)
top = max(0, int((oh - ch) * 0.55))
og.crop((0, top, ow, top + ch)).resize((1200, 630), Image.LANCZOS).save("assets/img/og.jpg", quality=82, optimize=True)

with open(os.path.join(OUT_IMG, "manifest.json"), "w") as f:
    json.dump(manifest, f, indent=1, sort_keys=True)

print(f"photos in: {total_in/1e6:.1f} MB  ->  webp out: {total_out/1e6:.1f} MB")

# Video: 720p H.264, fast-start, plus posters.
def run(args):
    subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", *args], check=True)

run(["-i", os.path.join(SRC, "videos/nationals.mp4"),
     "-vf", "scale=-2:720", "-c:v", "libx264", "-preset", "slow", "-crf", "27",
     "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart",
     os.path.join(OUT_VID, "nationals.mp4")])
run(["-i", os.path.join(SRC, "videos/launch.mp4"),
     "-vf", "scale=720:720", "-c:v", "libx264", "-preset", "slow", "-crf", "27",
     "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart",
     os.path.join(OUT_VID, "launch.mp4")])
run(["-ss", "2.5", "-i", os.path.join(SRC, "videos/launch.mp4"), "-frames:v", "1",
     "-vf", "scale=720:720", "-q:v", "4", os.path.join(OUT_VID, "launch-poster.jpg")])

for v in sorted(os.listdir(OUT_VID)):
    print(f"{v}: {os.path.getsize(os.path.join(OUT_VID, v))/1e6:.2f} MB")
