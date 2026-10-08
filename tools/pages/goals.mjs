export default function goals({ img, icon }) {
  const S = "(min-width: 980px) 28vw, 90vw";

  const teams = [
    {
      id: "zephyr",
      name: "Zephyr Racing",
      blurb: "Mentored through design reviews, project planning and race-prep coaching as they pushed for a national-finals qualification.",
      tags: ["Project Management", "National Finals"],
      badge: "Project management award, 2026 National Finals",
      title: "Structured planning, disciplined execution, and a strong finals run.",
      story:
        "Composed of six Grade 10 students of the Lycée International de Saint-Germain-en-Laye, Zephyr Racing competed in the 2026 French National Finals after having secured 3rd place in the Île-de-France regional competition. After months of preparation, teamwork, and commitment, the team won the Project Management Award presented by the internationally recognized Project Management Institute (PMI).",
      facts: [
        ["National Finals qualification", "Zephyr Racing competed against teams from the Lycée International and École Jeannine Manuel in the regional finals, their strong enterprise portfolio and verbal presentation earning them 3rd place."],
        ["Effective car design", "The car raced across the track in approximately 1.3 seconds, and the team placed 8th in the National Finals race, only 0.2 seconds away from the winning team."],
        ["Strong management", "Zephyr Racing performed especially well in planning, organization, and teamwork, leading them to build a strong portfolio and earning them the Project Management Award at National Finals."],
      ],
      motto: "Engineering the Wind",
      mosaic: [
        ["m-a", img("car", { alt: "The Zephyr Racing car, a blue 3D-printed model with a white front wing, on the track", sizes: S, pos: "50% 55%" })],
        ["m-b", img("z-award", { alt: "Zephyr Racing students holding their award at the STEM Racing France finals", sizes: "20vw" })],
        ["m-c", img("z-logo", { alt: "Zephyr Racing logo: a winged race car inside a Greek-key circle, with the words Engineering the Wind", sizes: "20vw" }), "frame--logo"],
        ["m-d", img("z-display", { alt: "Zephyr Racing's pit display lit in blue, with the car on its table", sizes: S })],
        ["m-e", img("z-pit", { alt: "Zephyr Racing's exhibition stand with a banner reading Engineering the Wind", sizes: S, pos: "50% 55%" })],
      ],
    },
    {
      id: "wild",
      name: "Wild Racing",
      blurb: "Supported with technical mentoring, testing strategy and presentation coaching to maximise performance and reliability.",
      tags: ["Fastest Car", "World Finals"],
      badge: "Fastest car, 2026 World Finals qualification",
      title: "A performance-first and all-around outstanding team competing on the global stage.",
      story:
        "A competitive and high-achieving team, Wild Racing is composed of students aged 15-19 recruited from both the Lycée International and École Jeannine Manuel. Their dedicated work and flawless consistency helped them design and build the fastest car in the French National Finals. Regional winners, the team went on to win 3rd place in the National Finals, earning them a qualification for the World Finals.",
      facts: [
        ["Fastest Car Award", "Wild Racing delivered the strongest performance results of the 2026 National Finals, with their car speeding across the track in 1.182 seconds, securing them a podium finish."],
        ["Strongest enterprise portfolio", "The team synthesized months of preparation, trial and error, and disciplined optimization into the highest-scoring enterprise portfolio of the National Finals."],
        ["World Finals qualification", "Thanks to an outstanding performance across all areas of the competition, Wild Racing placed 3rd in France, qualifying them for the 2026 World Finals in Singapore's Resorts World Sentosa."],
      ],
      mosaic: [
        ["m-a", img("w-team", { alt: "The Wild Racing team in red sweatshirts and caps posing in front of a STEM Racing France backdrop", sizes: S, pos: "50% 38%" })],
        ["m-b", img("w-award", { alt: "Wild Racing students with medals and trophies", sizes: "20vw" })],
        ["m-c", img("w-fastcar", { alt: "A leaderboard screen showing Wild Racing with the fastest time of 1.182 seconds", sizes: "20vw", pos: "50% 28%" })],
        ["m-d", img("w-handshake", { alt: "A Wild Racing student shaking hands with an official at the finals", sizes: S, pos: "50% 38%" })],
        ["m-e", img("w-watching", { alt: "Wild Racing students filming and watching the races", sizes: S, pos: "50% 30%" })],
      ],
    },
    {
      id: "nova",
      name: "Nova Track",
      blurb: "Guided in teamwork, communication and technical development to build a standout multidisciplinary performance.",
      tags: ["Women in Motorsport", "National Finals"],
      badge: "Women in Motorsport, teamwork",
      title: "Excellence built through collaboration, inclusion, and technical ambition.",
      story:
        "Nova Track demonstrates how the right team culture can multiply technical potential. TRS helped the group strengthen communication, leadership, and cross-functional cooperation so that design, manufacturing, and presentation objectives aligned behind one shared goal.",
      facts: [
        ["Women in Motorsport Award", "The team reflected TRS's commitment to opening doors for new generations of women in engineering and motorsport."],
        ["Teamwork-led performance", "Clear roles and stronger collaboration improved consistency across design, testing, and presentation work."],
        ["Multidisciplinary growth", "The team created a model where technical skills and communication developed together rather than separately."],
      ],
      mosaic: [
        ["m-a", img("n-team", { alt: "Three Nova Track students in white team shirts standing beside a red Formula 1 car", sizes: S, pos: "50% 45%" })],
        ["m-b", img("n-watching", { alt: "Nova Track students watching races at a STEM Racing event", sizes: "20vw", pos: "50% 25%" })],
        ["m-c", img("n-giving", { alt: "A Nova Track student receiving a trophy at the STEM Racing France finals", sizes: "20vw", pos: "50% 40%" })],
        ["m-d", img("n-pit", { alt: "Nova Track's exhibition stand with the team car and posters", sizes: S, pos: "50% 50%" })],
        ["m-e", img("n-award", { alt: "Nova Track students holding their mentoring award", sizes: S, pos: "50% 40%" })],
      ],
    },
  ];

  const future = [
    ["tree-structure", "Expand the mentor network", "Recruit more engineers, academics, and industry mentors to support students across design, manufacturing, and competition strategy."],
    ["users-three", "Grow our team portfolio", "Increase the number of student teams we guide so more young people can access STEM racing, technical leadership, and hands-on engineering experience."],
    ["target", "Reach higher on the global stage", "Build toward stronger performances in national finals, deeper technical maturity, and a sustainable path toward international competition."],
  ];

  const body = `
<section class="hero hero--page" data-hero>
  <div class="hero__media">${img("team", { alt: "A large group of STEM Racing students and mentors gathered outside a brick school building", eager: true, pos: "50% 72%" })}</div>
  <div class="wrap hero__inner">
    <h1>Empowering student teams to design, build and race with excellence.</h1>
    <p>TRS exists to make Île-de-France a hub for STEM Racing excellence, driven by innovation, creativity and teamwork.</p>
  </div>
</section>

<section class="section wrap" aria-labelledby="teams-title">
  <div class="section-head">
    <h2 id="teams-title">Three teams shaped by TRS mentoring.</h2>
  </div>

  <div data-tabs>
    <div class="tablist" role="tablist" aria-label="TRS-supported teams">
      ${teams
        .map(
          (t, i) => `<button class="tab" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" type="button">
        <strong>${t.name}</strong>
        <span>${t.blurb}</span>
        <span class="tags">${t.tags.map((x) => `<span class="tag">${x}</span>`).join("")}</span>
      </button>`
        )
        .join("\n      ")}
    </div>

    ${teams
      .map(
        (t, i) => `<div class="tabpanel" role="tabpanel" id="panel-${t.id}" aria-labelledby="tab-${t.id}" tabindex="0"${i === 0 ? "" : " hidden"}>
      <div class="story">
        <div>
          <span class="story__badge">${t.badge}</span>
          <h3>${t.title}</h3>
          <p>${t.story}</p>
          <ul class="facts" role="list">
            ${t.facts.map(([k, v]) => `<li><strong>${k}</strong>${v}</li>`).join("\n            ")}
          </ul>
          ${t.motto ? `<p class="motto">&ldquo;${t.motto}&rdquo;</p>` : ""}
        </div>
        <div class="mosaic">
          ${t.mosaic.map(([cls, html, extra]) => `<div class="frame ${cls}${extra ? " " + extra : ""}">${html}</div>`).join("\n          ")}
        </div>
      </div>
    </div>`
      )
      .join("\n    ")}
  </div>
</section>

<section class="wrap section" aria-labelledby="goals-title" style="padding-top:0">
  <div class="process">
    <div class="sticky-lead">
      <h2 id="goals-title">Building the next generation of <span class="accent">STEM Racing excellence.</span></h2>
      <p class="mt-s">Our first season proved that student teams can compete at a high level when they are supported by strong mentorship, disciplined project management, and a clear ambition to grow. The next chapter is about scaling that model across Île-de-France and preparing more young engineers to compete internationally.</p>
      <div class="frame ratio-3x2 mt-m">${img("awards", { alt: "Trophies from the 2026 STEM Racing France national finals, each topped with a miniature race car", sizes: "(min-width: 860px) 40vw, 100vw", pos: "55% 55%" })}</div>
    </div>
    <ul role="list">
      ${future
        .map(
          ([ic, title, text]) => `<li class="goal reveal">
        <span class="step__icon">${icon(ic)}</span>
        <div><h3>${title}</h3><p>${text}</p></div>
      </li>`
        )
        .join("\n      ")}
    </ul>
  </div>
</section>
`;

  return {
    file: "goals-achievements.html",
    title: "Goals & Achievements | Tachyon Racing Society",
    description:
      "Three student teams, three national-finals results, and one World Finals qualification in TRS's first season. See what we achieved and where we are heading.",
    active: "goals-achievements.html",
    heroKey: "team",
    heroSizes: "100vw",
    body,
  };
}
