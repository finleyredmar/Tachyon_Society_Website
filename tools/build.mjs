// Builds the static site into the repo root.
//
//   node tools/build.mjs
//
// Pages live in tools/pages/*.mjs. Shared header, footer and head tags live here, so a
// change to the navigation or footer happens once. Output file names are unchanged
// (index.html, stem-competitions.html, ...), so GitHub Pages and existing links keep working.

import { readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { ENTRIES, START } from "./kb.mjs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(root, "assets/img/manifest.json"), "utf8"));
const ORIGIN = "https://tachyonracing.fr";

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---- Icons (Phosphor, regular weight, inlined at build time) ------------- */
const iconCache = new Map();
export function icon(name, cls = "") {
  if (!iconCache.has(name)) {
    const file = join(root, "node_modules/@phosphor-icons/core/assets/regular", `${name}.svg`);
    if (!existsSync(file)) throw new Error(`Unknown icon: ${name}`);
    iconCache.set(name, readFileSync(file, "utf8").trim());
  }
  return iconCache.get(name).replace("<svg ", `<svg class="icon ${cls}" aria-hidden="true" focusable="false" `);
}

/* ---- Responsive images ---------------------------------------------------- */
export function img(key, { alt = "", sizes = "100vw", cls = "", eager = false, pos = "" } = {}) {
  const m = manifest[key];
  if (!m) throw new Error(`Unknown image: ${key}`);
  const ext = m.ext || "webp";
  const srcset = m.widths.map((w) => `assets/img/${key}-${w}.${ext} ${w}w`).join(", ");
  const mid = m.widths[Math.min(1, m.widths.length - 1)];
  return `<img src="assets/img/${key}-${mid}.${ext}" srcset="${srcset}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""}${pos ? ` style="object-position:${pos}"` : ""} ${eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}>`;
}
function preloadImage(key, sizes = "100vw") {
  const m = manifest[key];
  const ext = m.ext || "webp";
  const srcset = m.widths.map((w) => `assets/img/${key}-${w}.${ext} ${w}w`).join(", ");
  return `<link rel="preload" as="image" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high">`;
}


/* ---- Supporters loop: floating logos ---------------------------------------
   Logos live in assets/supporters/<slug>.webp as transparent cut-outs (see tools/optimize_supporters.py),
   with pixel sizes in assets/supporters/manifest.json. A logo that is not there yet falls back to a wordmark. */
const supporterSizes = existsSync(join(root, "assets/supporters/manifest.json"))
  ? JSON.parse(readFileSync(join(root, "assets/supporters/manifest.json"), "utf8"))
  : {};
export function supporterMarquee(list, { repeats = 4 } = {}) {
  const tile = ({ slug, name }, real) => {
    const m = supporterSizes[slug];
    const inner = m
      ? `<img src="assets/supporters/${slug}.webp" width="${m.w}" height="${m.h}" alt="${real ? esc(name) : ""}" loading="lazy" decoding="async" draggable="false">`
      : `<strong class="marquee__name">${esc(name)}</strong>`;
    return `<li class="marquee__item${real ? "" : " marquee__item--rep"}"${real ? "" : ' aria-hidden="true"'}>${inner}</li>`;
  };
  // one set: the real group first (read by assistive tech), then repeats so the set is wider than any screen
  const set = (hidden) =>
    `<ul class="marquee__set" role="list"${hidden ? ' aria-hidden="true"' : ""}>${Array.from({ length: repeats }, (_, r) =>
      list.map((s) => tile(s, !hidden && r === 0)).join("")
    ).join("")}</ul>`;
  return `<div class="marquee" data-marquee role="group" aria-label="Our supporters">
    <div class="marquee__track">${set(false)}${set(true)}</div>
  </div>`;
}

/* ---- Ask TRS assistant (markup; behaviour in assets/js/ask.js) --------------- */
function assistant() {
  return `<div class="ask" data-ask>
  <button class="ask__fab" type="button" aria-expanded="false" aria-controls="ask-panel">${icon("chat-circle-dots")}<span>Ask TRS</span></button>
  <section class="ask__panel" id="ask-panel" role="dialog" aria-label="Ask Tachyon Racing Society" hidden>
    <header class="ask__head">
      <div><strong>Ask TRS</strong><span>Answers from this website</span></div>
      <button class="ask__close" type="button" aria-label="Close assistant">${icon("x")}</button>
    </header>
    <div class="ask__log" role="log" aria-live="polite" aria-relevant="additions"></div>
    <div class="ask__chips" aria-label="Suggested questions"></div>
    <form class="ask__form" autocomplete="off">
      <label class="sr-only" for="ask-input">Your question</label>
      <input class="ask__input" id="ask-input" type="text" name="q" placeholder="Ask about sponsoring, teams, joining…" enterkeyhint="send" spellcheck="false">
      <button class="ask__send-btn" type="submit" aria-label="Send question">${icon("paper-plane-right")}</button>
    </form>
  </section>
</div>`;
}

/* ---- Shared chrome -------------------------------------------------------- */
const NAV = [
  ["index.html", "HOME"],
  ["stem-competitions.html", "STEM COMPETITIONS"],
  ["resources.html", "RESOURCES"],
  ["goals-achievements.html", "GOALS & ACHIEVEMENTS"],
];

const SOCIAL = [
  ["https://www.instagram.com/tachyonracing6/", "Instagram", "instagram-logo"],
  ["https://www.facebook.com/tachyonracing6/", "Facebook", "facebook-logo"],
  ["https://www.linkedin.com/company/tachyon-racing/people/", "LinkedIn", "linkedin-logo"],
  ["https://linktr.ee/tachyonracing6", "linktr.ee/tachyonracing6", "link-simple"],
];

function header(active) {
  const links = NAV.map(
    ([href, label]) => `<a href="${href}"${active === href ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("\n        ");
  return `<header class="site-header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Tachyon Racing Society, home">${img("logo", { alt: "Tachyon Racing", sizes: "120px", eager: true })}</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon("list", "icon--open")}${icon("x", "icon--close")}</button>
    <nav class="nav" id="site-nav" aria-label="Main">
        ${links}
        <a class="nav__mobile-only" href="support-us.html"${active === "support-us.html" ? ' aria-current="page"' : ""}>SUPPORT US</a>
        <a class="btn btn--sm nav__cta" href="support-us.html">BECOME A SPONSOR</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  const nav = [
    ["index.html", "Home"],
    ["stem-competitions.html", "STEM Competitions"],
    ["resources.html", "Resources"],
    ["goals-achievements.html", "Goals & Achievements"],
    ["support-us.html", "Support Us"],
  ]
    .map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`)
    .join("");
  const social = SOCIAL.map(
    ([href, label, ic]) => `<li><a href="${href}" target="_blank" rel="noopener noreferrer">${icon(ic)}${label}</a></li>`
  ).join("");
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        ${img("logo", { alt: "Tachyon Racing Society", sizes: "160px" })}
        <p>A French loi 1901 association mentoring high school student teams competing in STEM Racing, the international competition where students design, build and race CO<sub>2</sub>-powered miniature cars.</p>
      </div>
      <div>
        <h4>Navigate</h4>
        <ul>${nav}</ul>
      </div>
      <div>
        <h4>Follow</h4>
        <ul>${social}</ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:teamtachyonracing@gmail.com">${icon("envelope-simple")}teamtachyonracing@gmail.com</a></li>
          <li><span class="footer-address" style="display:inline-flex;align-items:flex-start;gap:10px;min-height:40px;color:var(--ink-2)">${icon("map-pin")}Le Pecq, Île-de-France, France</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Tachyon Racing Society. Association loi 1901.</span>
      <span>Le Pecq, Île-de-France, France</span>
    </div>
  </div>
</footer>`;
}

export function layout({ file, title, description, active, body, heroKey, heroSizes, ogImage = "assets/img/og.jpg", jsonld = "", bodyAttrs = "" }) {
  const url = `${ORIGIN}/${file === "index.html" ? "" : file}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#021a3b" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#f6f8fb" media="(prefers-color-scheme: light)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Tachyon Racing Society">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="preload" href="assets/fonts/archivo-latin-wdth-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/geist-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${heroKey ? preloadImage(heroKey, heroSizes) : ""}
<link rel="stylesheet" href="assets/css/main.css">
<script>document.documentElement.classList.add("js")</script>
${jsonld}
</head>
<body${bodyAttrs ? " " + bodyAttrs : ""}>
<a class="skip-link" href="#main">Skip to content</a>
<div class="scroll-progress" aria-hidden="true"></div>
${header(active)}
<main id="main">
${body}
</main>
${footer()}
${assistant()}
<script src="assets/js/main.js" defer></script>
<script src="assets/js/kb.js" defer></script>
<script src="assets/js/ask.js" defer></script>
</body>
</html>
`;
}

/* ---- Build ---------------------------------------------------------------- */
const helpers = { img, icon, esc, supporterMarquee };
const pages = ["home", "stem", "resources", "goals", "support"];
const built = [];

for (const name of pages) {
  const mod = await import(pathToFileURL(join(root, "tools/pages", `${name}.mjs`)).href);
  const page = mod.default(helpers);
  writeFileSync(join(root, page.file), layout(page));
  built.push(page.file);
}

// 404 (GitHub Pages serves 404.html for unknown paths)
writeFileSync(
  join(root, "404.html"),
  layout({
    file: "404.html",
    title: "Page not found | Tachyon Racing Society",
    description: "This page does not exist.",
    active: "",
    body: `<section class="notfound"><div><h1>404</h1><p>That page left the grid. Head back and pick another lane.</p><a class="btn" href="index.html">Back to home ${icon("arrow-right")}</a></div></section>`,
  })
);

writeFileSync(
  join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${built
    .map((f) => `  <url><loc>${ORIGIN}/${f === "index.html" ? "" : f}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);
writeFileSync(join(root, "assets/js/kb.js"), `/* generated by tools/build.mjs from tools/kb.mjs; do not edit */\nwindow.TRS_KB=${JSON.stringify({ start: START, entries: ENTRIES })};\n`);
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
writeFileSync(join(root, "CNAME"), "tachyonracing.fr\n");
writeFileSync(join(root, ".nojekyll"), "");
if (existsSync(join(root, "tools/members.enc.json"))) copyFileSync(join(root, "tools/members.enc.json"), join(root, "assets/members.enc.json"));

console.log("Built:", [...built, "404.html", "sitemap.xml", "robots.txt"].join(", "));
