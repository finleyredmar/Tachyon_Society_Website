export default function home({ img, icon, supporterMarquee }) {
  const people = [
    { key: "p-hugo", name: "Hugo Boubel", role: "President", text: "President and legal representative. Founder member." },
    { key: "p-ines", name: "Ines Leung", role: "Vice President", text: "Local operations management." },
    { key: "p-julien", name: "Julien Billy", role: "Engineering Coach", text: "Technical guidance and design support." },
    { key: "p-liane", name: "Liane Fleur", role: "Communication", text: "Media, sponsorship and outreach." },
    { key: "p-taymour", name: "Taymour Arayssi", role: "EJM Coordinator", text: "Qualified for the 2026 World Finals. Coordinator with EJM." },
  ];

  const index = [
    ["stem-competitions.html", "STEM Competitions", "Discover STEM Racing and how students design, simulate and race CO<sub>2</sub>-powered cars."],
    ["goals-achievements.html", "Goals &amp; Achievements", "3 awards, a World Finals qualification, and a mission to make STEM accessible."],
    ["support-us.html", "Support Us", "Sponsor students, provide equipment, and directly impact young engineers."],
    ["resources.html", "Resources", "A password-protected hub for members, partners and mentors."],
  ];

  const jsonld = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Tachyon Racing Society",
    alternateName: "Tachyon Racing",
    url: "https://tachyonracing.fr/",
    logo: "https://tachyonracing.fr/assets/img/logo-480.png",
    description:
      "A French loi 1901 association that mentors high school student teams competing in STEM Racing.",
    email: "teamtachyonracing@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Le Pecq", addressRegion: "Île-de-France", addressCountry: "FR" },
    sameAs: [
      "https://www.instagram.com/tachyonracing6/",
      "https://www.facebook.com/tachyonracing6/",
      "https://www.linkedin.com/company/tachyon-racing/",
    ],
  })}</script>`;

  const body = `
<section class="hero" data-hero>
  <div class="hero__media">${img("awards", { alt: "Third place trophy from the 2026 STEM Racing France national finals, topped with a miniature race car", eager: true, pos: "60% 55%" })}</div>
  <div class="wrap hero__inner">
    <h1>Giving every student the tools to compete at the highest level.</h1>
    <p>We mentor high school teams in STEM Racing, from CAD and CFD to the podium.</p>
    <div class="hero__actions">
      <a class="btn" href="support-us.html">BECOME A SPONSOR ${icon("arrow-right")}</a>
      <a class="btn btn--ghost btn--on-photo" href="stem-competitions.html">DISCOVER STEM RACING</a>
    </div>
  </div>
</section>

<section class="wrap" aria-label="TRS in numbers">
  <div class="stats">
    <div class="stat reveal" style="--i:0"><strong>60<span>+</span></strong><span>Student beneficiaries</span></div>
    <div class="stat reveal" style="--i:1"><strong>3</strong><span>National awards in year one</span></div>
    <div class="stat reveal" style="--i:2"><strong>5,000<span>+</span></strong><span>Combined social followers</span></div>
    <div class="stat reveal" style="--i:3"><strong>60<span>+</span></strong><span>Countries in the competition</span></div>
  </div>
</section>

<section class="bleed" aria-labelledby="who-title">
  <div class="bleed__media">${img("team", { alt: "A large group of STEM Racing students and mentors gathered outside a brick school building", sizes: "100vw" })}</div>
  <div class="wrap">
    <div class="bleed__panel reveal">
      <h2 id="who-title">A student mentorship engine, powered by volunteers.</h2>
      <p class="mt-s">Tachyon Racing Society is a loi 1901 association based in Île-de-France that mentors high school students participating in the STEM Racing competition.</p>
      <p>With dedicated volunteers and around 60 student beneficiaries aged 15-18, our mission is to give every student, regardless of background, the tools to compete at the highest level.</p>
    </div>
  </div>
</section>

<section class="section wrap" aria-labelledby="global-title">
  <div class="bento">
    <div class="frame bento__img reveal">${img("worlds-stage", { alt: "French students holding the French flag on stage at the 2024 World Finals", sizes: "(min-width: 860px) 58vw, 100vw" })}</div>
    <div class="bento__text reveal" style="--i:1">
      <div class="stack">
        <h2 id="global-title">A global stage, with a French team on it.</h2>
        <p>STEM Racing is a globally recognised competition with more than 60 countries participating. Sponsoring TRS puts your brand alongside students competing on the national and international stage, from Île-de-France to the World Finals.</p>
      </div>
      <div><a class="btn btn--ghost" href="goals-achievements.html">SEE OUR RESULTS ${icon("arrow-right")}</a></div>
    </div>
    <div class="bento__fact reveal" style="--i:2">
      <span class="eyebrow">2024 World Finals</span>
      <h3>Autodesk Pressure Challenge Award</h3>
      <p>Our founding team represented France in Saudi Arabia and won it. That experience inspired the founding of TRS in 2025.</p>
    </div>
  </div>
</section>

<section class="section--tight wrap" aria-labelledby="video-title">
  <div class="section-head">
    <h2 id="video-title">2026 Nationals in 30 seconds.</h2>
  </div>
  <div class="video-frame reveal">
    <video controls preload="none" playsinline poster="assets/img/startgate-1274.webp" aria-label="Highlights from the 2026 French national finals">
      <source src="assets/video/nationals.mp4" type="video/mp4">
      Your browser does not support video.
    </video>
  </div>
</section>

<section class="section" aria-labelledby="supporters-title">
  <div class="wrap section-head">
    <h2 id="supporters-title">Supported by schools and industry.</h2>
  </div>
  ${supporterMarquee([
    { slug: "ansys", name: "Ansys" },
    { slug: "ecole-jeannine-manuel", name: "École Jeannine Manuel" },
    { slug: "lycee-international", name: "Lycée International de Saint-Germain-en-Laye" },
  ])}
  <div class="wrap marquee__foot">
    <p class="marquee__note">The Lycée International de Saint-Germain-en-Laye supports TRS through its FSE and Club Inter.</p>
  </div>
  <div class="wrap mt-s"><a class="link-arrow" href="support-us.html">Join them as a sponsor ${icon("arrow-right")}</a></div>
</section>

<section class="section wrap" aria-labelledby="next-title">
  <div class="section-head">
    <h2 id="next-title">Where to go next.</h2>
  </div>
  <div class="index">
    ${index
      .map(
        ([href, title, text], i) => `<a class="index__row reveal" style="--i:${i}" href="${href}">
      <h3>${title}</h3>
      <p>${text}</p>
      <span class="index__go" aria-hidden="true">${icon("arrow-right")}</span>
    </a>`
      )
      .join("\n    ")}
  </div>
</section>

<section class="wrap" aria-labelledby="giving-title">
  <div class="band reveal">
    <div>
      <h3 id="giving-title">Not a company? You can still fuel the grid.</h3>
      <p>Support TRS informally through our upcoming crowdfunding campaign. Every contribution funds materials, entry fees and travel for student teams competing this season.</p>
    </div>
    <a class="btn btn--dark" href="https://www.gofundme.com/f/help-preserve-grow-frances-future-engineering-talent-ynyc6" target="_blank" rel="noopener noreferrer" aria-label="Donate to Tachyon Racing on GoFundMe (opens in a new tab)">Donate on GoFundMe ${icon("arrow-up-right")}</a>
  </div>
</section>

<section class="section wrap" aria-labelledby="team-title">
  <div class="section-head">
    <h2 id="team-title">The volunteers behind TRS.</h2>
  </div>
  <div class="people">
    ${people
      .map(
        (p, i) => `<article class="person reveal" style="--i:${i}">
      <div class="frame">${img(p.key, { alt: p.name, sizes: "(min-width: 1000px) 228px, (min-width: 640px) 33vw, 50vw" })}</div>
      <h3>${p.name}</h3>
      <div class="role">${p.role}</div>
      <p>${p.text}</p>
    </article>`
      )
      .join("\n    ")}
  </div>
  <div class="founders reveal">
    <h3>Founding members</h3>
    <div class="founders__list">
      <div><h3>Jerry Dong</h3><div class="role eyebrow" style="margin-top:4px;font-size:.74rem">Co-founder</div><p>STEM Racing 2024 World Finalist. Tachyon Racing team member.</p></div>
      <div><h3>Maxime Muller</h3><div class="role eyebrow" style="margin-top:4px;font-size:.74rem">Co-founder</div><p>STEM Racing 2024 World Finalist. Tachyon Racing team member.</p></div>
    </div>
  </div>
</section>
`;

  return {
    file: "index.html",
    title: "Tachyon Racing Society | STEM Racing mentoring in Île-de-France",
    description:
      "Tachyon Racing Society is a French non-profit that mentors high school teams in the international STEM Racing competition, from CAD and CFD to the podium.",
    active: "index.html",
    heroKey: "awards",
    heroSizes: "100vw",
    body,
    jsonld,
  };
}
