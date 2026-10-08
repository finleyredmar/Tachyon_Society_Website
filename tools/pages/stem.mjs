export default function stem({ img, icon }) {
  const steps = [
    {
      ic: "cube",
      title: "Design",
      text: "Students model their car in 3D CAD software such as Autodesk Fusion 360.",
    },
    {
      ic: "wind",
      title: "Simulate",
      text: "Aerodynamic areas are tested using CFD (computational fluid dynamics).",
      media: img("simscale", { alt: "A computational fluid dynamics simulation of a car wing, with airflow and pressure shown in colour", sizes: "(min-width: 860px) 50vw, 100vw" }),
      ratio: "ratio-16x9",
    },
    {
      ic: "wrench",
      title: "Manufacture",
      text: "Prototypes are milled on a CNC machine, refined with 3D printing, and prepared for race day.",
    },
    {
      ic: "flag-checkered",
      title: "Race",
      text: "The finished car races on a 20-metre track, powered by a single CO<sub>2</sub> cartridge.",
      media: img("startgate", { alt: "The electronic start gate at the end of a STEM Racing track, with spectators behind it", sizes: "(min-width: 860px) 50vw, 100vw" }),
      ratio: "ratio-16x9",
    },
  ];

  const countries = [
    ["United Kingdom", "https://www.stemracing.co.uk/"],
    ["Australia", "https://stemracing.com.au/"],
    ["Saudi Arabia", "https://www.stemracing.com/"],
    ["Italy", "https://www.stemracing.it/"],
    ["France", "https://www.stemracing.fr/"],
    ["Canada", "https://www.stemracing.com/findus"],
    ["Germany", "https://www.stemracing.com/findus"],
    ["Hong Kong", "https://www.stemracing.com/findus"],
    ["India", "https://www.stemracing.com/findus"],
    ["Ireland", "https://www.stemracing.com/findus"],
    ["Malaysia", "https://www.stemracing.com/findus"],
    ["Mexico", "https://www.stemracing.com/findus"],
    ["Netherlands", "https://www.stemracing.com/findus"],
    ["New Zealand", "https://www.stemracing.com/findus"],
    ["Portugal", "https://www.stemracing.com/findus"],
    ["Singapore", "https://www.stemracing.com/findus"],
    ["South Africa", "https://www.stemracing.com/findus"],
    ["Spain", "https://www.stemracing.com/findus"],
    ["United Arab Emirates", "https://www.stemracing.com/findus"],
    ["United States", "https://www.stemracing.com/findus"],
  ];

  const body = `
<section class="hero hero--page" data-hero>
  <div class="hero__media">${img("windtunnel", { alt: "A 3D-printed STEM Racing car with transparent bodywork inside a glass wind tunnel", eager: true, pos: "50% 45%" })}</div>
  <div class="wrap hero__inner">
    <h1>STEM Racing: where engineering, aerodynamics and pure speed meet.</h1>
    <p>Teams of 3 to 6 students design, build and race a miniature car on a 20-metre track.</p>
  </div>
</section>

<section class="section wrap" aria-labelledby="phases-title">
  <div class="process">
    <div class="sticky-lead">
      <h2 id="phases-title">Four phases. <span class="accent">One car. One shot.</span></h2>
      <p class="lede mt-s">From sketches to trophies.</p>
    </div>
    <ol role="list">
      ${steps
        .map(
          (s, i) => `<li class="step reveal">
        <span class="step__icon">${icon(s.ic)}</span>
        <div>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
          ${s.media ? `<div class="frame ${s.ratio}">${s.media}</div>` : ""}
        </div>
      </li>`
        )
        .join("\n      ")}
    </ol>
  </div>
</section>

<section class="wrap" aria-labelledby="reach-title">
  <div class="panel reveal">
    <h2 id="reach-title">A competition running in <span class="accent">60+ countries.</span></h2>
    <p class="lede mt-s">STEM Racing brings together students across continents, culminating each year at the World Finals.</p>
    <div class="pills">
      ${countries
        .map(
          ([name, href]) =>
            `<a class="pill" href="${href}" target="_blank" rel="noopener noreferrer">${name}${icon("arrow-up-right")}<span class="sr-only"> (opens in a new tab)</span></a>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="section wrap" aria-labelledby="mentors-title">
  <div class="split split--wide-media">
    <div class="frame ratio-3x2 reveal">${img("nationals", { alt: "Two STEM Racing teams in red and light blue celebrating together with banners and trophies", sizes: "(min-width: 860px) 52vw, 100vw" })}</div>
    <div class="stack reveal" style="--i:1">
      <h2 id="mentors-title">Mentors. <span class="accent">Not just organisers.</span></h2>
      <p>TRS actively mentors teams competing at regional, national and international level, building a lasting STEM Racing ecosystem across Île-de-France.</p>
      <p>Our founding team, Tachyon Racing, represented France at the 2024 World Finals in Saudi Arabia and won the Autodesk Pressure Challenge Award.</p>
      <p>That experience directly inspired the founding of TRS in 2025.</p>
    </div>
  </div>
</section>

<section class="wrap" aria-labelledby="join-title">
  <div class="panel reveal" style="background:var(--surface-2)">
    <h2 id="join-title">Students: <span class="accent">join the grid.</span></h2>
    <p class="lede mt-s">Whether you're already in a team or curious about STEM Racing, get in touch. We'll help you take the next step.</p>
    <div class="hero__actions" style="animation:none">
      <a class="btn" href="mailto:teamtachyonracing@gmail.com">teamtachyonracing@gmail.com ${icon("arrow-right")}</a>
      <a class="btn btn--ghost" href="goals-achievements.html">SEE WHAT WE'RE DOING</a>
    </div>
  </div>
</section>

<section class="section wrap" id="speed" aria-labelledby="speed-title">
  <div class="split">
    <div class="stack reveal">
      <h2 id="speed-title">How fast is that, <span class="accent">really?</span></h2>
      <p>The track is 20 metres and every car is timed from launch to the finish line. Enter a race time and see the average speed it means.</p>
      <div class="presets" role="group" aria-label="Example times">
        <button class="pill pill--button" type="button" data-speed-preset="1.182">Wild Racing, 1.182 s</button>
        <button class="pill pill--button" type="button" data-speed-preset="1.3">Zephyr Racing, about 1.3 s</button>
        <button class="pill pill--button" type="button" data-speed-preset="2">2.000 s</button>
      </div>
    </div>
    <div class="panel racecalc reveal" style="--i:1" data-speed>
      <div class="field">
        <label for="speed-time">Race time (seconds)</label>
        <input id="speed-time" type="number" inputmode="decimal" min="0.8" max="6" step="0.001" value="1.182" autocomplete="off">
      </div>
      <p class="racecalc__error" data-speed-error role="alert"></p>
      <div class="racecalc__out" aria-live="polite">
        <div><strong data-out="kmh">60.9</strong><span>km/h average</span></div>
        <div><strong data-out="ms">16.9</strong><span>metres per second</span></div>
        <div><strong data-out="mph">37.9</strong><span>mph average</span></div>
      </div>
      <div class="track" data-track>
        <div class="track__lane"><span class="track__car"><svg class="icon" viewBox="0 0 56 26" aria-hidden="true" focusable="false"><path d="M1 8h8v4H1zM6 12h6l3-4h10l6-3h6l4 4 8 2 6 1v6H6z"/><circle cx="14" cy="19" r="5.5"/><circle cx="42" cy="19" r="5.5"/><circle cx="14" cy="19" r="2" fill="var(--bg)"/><circle cx="42" cy="19" r="2" fill="var(--bg)"/><path d="M48 17h7v3h-7z"/></svg></span></div>
        <div class="track__ticks" aria-hidden="true"><span>0 m</span><span>5</span><span>10</span><span>15</span><span>20 m</span></div>
      </div>
      <div class="racecalc__run">
        <button class="btn" type="button" data-launch>LAUNCH ${icon("play")}</button>
        <label class="racecalc__slow"><input type="checkbox" data-slow checked> Slow motion (8x)</label>
        <span class="racecalc__clock" data-clock aria-hidden="true">0.000 s</span>
      </div>
      <p class="form-note" data-speed-note>On average that is faster than the 50 km/h limit in a French town. If the car accelerated steadily from rest, it averaged about 2.9 g.</p>
    </div>
  </div>
</section>

<section class="section wrap" aria-labelledby="launch-title">
  <div class="split">
    <div class="stack reveal">
      <h2 id="launch-title">Watch a launch, <span class="accent">live.</span></h2>
      <p>At the 2026 national finals, the fastest car crossed the track in 1.182 seconds.</p>
    </div>
    <div class="video-frame reveal" style="--i:1">
      <video controls preload="none" playsinline poster="assets/video/launch-poster.jpg" style="aspect-ratio:1/1" aria-label="A miniature STEM Racing car launching down the track">
        <source src="assets/video/launch.mp4" type="video/mp4">
        Your browser does not support video.
      </video>
    </div>
  </div>
</section>
`;

  return {
    file: "stem-competitions.html",
    title: "STEM Competitions | Tachyon Racing Society",
    description:
      "How STEM Racing works: students design, simulate, manufacture and race CO2-powered miniature cars on a 20-metre track, in more than 60 countries.",
    active: "stem-competitions.html",
    heroKey: "windtunnel",
    heroSizes: "100vw",
    body,
  };
}
