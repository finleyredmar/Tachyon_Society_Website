export default function support({ img, icon }) {
  const tiers = [
    { name: "Platinum", price: "€5,000+", feature: true },
    { name: "Gold", price: "€3,000-5,000" },
    { name: "Silver", price: "€1,000-3,000" },
    { name: "Bronze", price: "€500-1,000" },
  ];

  const Y = true;
  const N = false;
  // [benefit, [platinum, gold, silver, bronze]]  (true / false, or a short text)
  const rows = [
    ["Your name at the top of all our documents, alongside ours (Tachyon Racing Society - [Company Name])", [Y, N, N, N]],
    ["Photos and videos from the competition season", [Y, Y, Y, Y]],
    ["Your logo on our displays", [Y, Y, Y, Y]],
    ["Your logo on our polo shirt", [Y, Y, Y, N]],
    ["Your logo on our teams' polo shirts and cars", [Y, Y, N, N]],
    ["A post announcing the sponsorship", ["All networks", "All networks", "Instagram", "All networks"]],
    ["Monthly updates on the progress of our project", [Y, Y, Y, N]],
    ["A video highlighting the results achieved thanks to your support", [Y, Y, N, N]],
    ["A thank-you letter and a signed photo", [Y, N, N, N]],
  ];

  const cell = (v, i) => {
    const cls = i === 0 ? ' class="is-feature"' : "";
    if (typeof v === "string") return `<td${cls}><span class="note">${v}</span></td>`;
    return v
      ? `<td${cls}>${icon("check", "yes")}<span class="sr-only">Included</span></td>`
      : `<td${cls}>${icon("minus", "no")}<span class="sr-only">Not included</span></td>`;
  };

  const body = `
<section class="hero hero--page" data-hero>
  <div class="hero__media">${img("car", { alt: "A blue 3D-printed STEM Racing car on the track, with other teams' cars in the background", eager: true, pos: "50% 60%" })}</div>
  <div class="wrap hero__inner">
    <h1>Invest in tomorrow's engineers.</h1>
    <p>Your sponsorship funds competition entries, equipment and expert mentoring for young talent from Île-de-France.</p>
    <div class="hero__actions">
      <a class="btn" href="#levels">SEE SPONSORSHIP LEVELS ${icon("arrow-right")}</a>
    </div>
  </div>
</section>

<section class="wrap" aria-label="TRS reach">
  <div class="stats stats--3">
    <div class="stat reveal" style="--i:0"><strong>5,000<span>+</span></strong><span>Followers</span></div>
    <div class="stat reveal" style="--i:1"><strong>100,000<span>+</span></strong><span>Views</span></div>
    <div class="stat reveal" style="--i:2"><strong>60<span>+</span></strong><span>Countries</span></div>
  </div>
</section>

<section class="section wrap" aria-labelledby="budget-title">
  <div class="split">
    <div class="stack reveal">
      <h2 id="budget-title">€10,000 annual budget, every euro accounted for.</h2>
      <p>By sponsoring TRS, partners directly fund student competition entries, technical equipment, and expert mentoring, helping young talent from Île-de-France compete nationally and internationally.</p>
      <p>Longer term, we're working toward a permanent test centre with a certified STEM Racing track and 3D printing facilities.</p>
    </div>
    <div class="panel budget reveal" style="--i:1">
      <div class="budget__total">€10,000</div>
      <div class="budget__bar" role="img" aria-label="Budget split: materials and equipment 60 percent, competition entry fees 30 percent, travel costs 10 percent">
        <span style="flex:6"></span><span style="flex:3"></span><span style="flex:1"></span>
      </div>
      <dl class="budget__legend">
        <div><dt>Materials &amp; equipment</dt><dd>€6,000</dd></div>
        <div><dt>Competition entry fees</dt><dd>€3,000</dd></div>
        <div><dt>Travel costs</dt><dd>€1,000</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="wrap" id="levels" aria-labelledby="levels-title" style="padding-bottom:var(--section)">
  <div class="section-head">
    <h2 id="levels-title">Choose your level of partnership.</h2>
  </div>

  <div class="tiers">
    ${tiers
      .map(
        (t) => `<article class="tier${t.feature ? " tier--feature" : ""} reveal">
      <div>
        ${t.feature ? '<span class="tier__flag">Best impact</span>' : ""}
        <h3>${t.name}</h3>
        <div class="tier__price">${t.price}</div>
      </div>
      <button class="btn${t.feature ? "" : " btn--ghost"}" type="button" data-sponsorship-tier="${t.name}">Choose ${t.name}</button>
    </article>`
      )
      .join("\n    ")}
  </div>

  <div class="matrix-wrap reveal">
    <table class="matrix">
      <caption>What each level includes</caption>
      <thead>
        <tr>
          <th scope="col"><span class="sr-only">Benefit</span></th>
          ${tiers.map((t, i) => `<th scope="col"${i === 0 ? ' class="is-feature"' : ""}>${t.name}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${rows.map(([label, vals]) => `<tr><th scope="row">${label}</th>${vals.map(cell).join("")}</tr>`).join("\n        ")}
      </tbody>
    </table>
  </div>

  <div class="form-wrap" id="sponsor-inquiry" hidden>
    <h3>Let's talk about your support.</h3>
    <p class="mt-s">Level selected: <strong id="inquiryLevel" style="color:var(--ink)"></strong></p>
    <form class="form" id="sponsorForm" action="https://formsubmit.co/teamtachyonracing@gmail.com" method="POST">
      <input type="hidden" name="_subject" value="New sponsorship inquiry from the TRS website">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="sponsorship_level" id="sponsorshipLevel">
      <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="form-honey">
      <div class="form-row">
        <div class="field">
          <label for="sponsorName">Name</label>
          <input id="sponsorName" name="name" type="text" autocomplete="name" placeholder="Your name…" required>
        </div>
        <div class="field">
          <label for="sponsorEmail">Email</label>
          <input id="sponsorEmail" name="email" type="email" autocomplete="email" placeholder="you@company.com…" spellcheck="false" required>
        </div>
      </div>
      <div class="field">
        <label for="sponsorMessage">Message</label>
        <textarea id="sponsorMessage" name="message" placeholder="Tell us how you would like to support TRS…" required></textarea>
      </div>
      <div><button class="btn" type="submit">SEND INQUIRY ${icon("arrow-right")}</button></div>
      <p class="form-note" id="formMessage">Your message will be sent directly to the TRS team.</p>
    </form>
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

<section class="section wrap" aria-labelledby="contact-title">
  <div class="split">
    <div class="stack reveal">
      <h2 id="contact-title">Ready to become a sponsor?</h2>
      <p>Tell us about your organisation and how you'd like to support TRS. We'll get back to you within a few days.</p>
    </div>
    <ul role="list" class="stack reveal" style="--i:1;--stack:.5rem">
      <li><a class="link-arrow" href="mailto:teamtachyonracing@gmail.com">${icon("envelope-simple")}teamtachyonracing@gmail.com</a></li>
      <li><button class="link-arrow link-arrow--button" type="button" data-ask-open data-ask-q="How can I sponsor?">${icon("chat-circle-dots")}Ask the TRS assistant first</button></li>
      <li style="display:flex;align-items:center;gap:8px;min-height:44px;color:var(--ink-2)">${icon("map-pin")}Le Pecq, Île-de-France, France</li>
    </ul>
  </div>
</section>
`;

  return {
    file: "support-us.html",
    title: "Become a Sponsor | Tachyon Racing Society",
    description:
      "Sponsor Tachyon Racing Society from €500. See what each level includes, how the €10,000 annual budget is spent, and how to get in touch.",
    active: "support-us.html",
    heroKey: "car",
    heroSizes: "100vw",
    body,
  };
}
