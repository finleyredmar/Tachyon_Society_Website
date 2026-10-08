// Knowledge base behind the "Ask TRS" assistant. Edit here, then run `node tools/build.mjs`.
//
// Every answer is taken from this website's own copy (or from the public STEM Racing rules
// for the 20-metre track), so the assistant never invents anything. When a question does
// not match, the widget offers to send it to the team or search the web instead.
//
// Fields
//   id       unique key (used by `follow` and by the starter chips)
//   chip     short label if this entry should be offered as a button
//   keys     [phrase, weight] pairs. Matching ignores case and accents. Weight 3 = strong signal.
//   answer   plain text, one or two short paragraphs separated by \n\n
//   links    [[label, href]] shown under the answer
//   follow   ids of entries offered as next-question buttons

export const START = ["sponsor", "join-student", "mentor", "wild", "speed"];

export const ENTRIES = [
  {
    id: "what-is-trs",
    chip: "What is TRS?",
    keys: [["what is trs", 4], ["tachyon", 2], ["trs", 2], ["society", 1], ["association", 2], ["loi 1901", 3], ["about", 1], ["who are you", 3], ["mission", 2], ["qui etes", 2]],
    answer:
      "Tachyon Racing Society (TRS) is a French loi 1901 association based in Île-de-France. We mentor high school students who take part in the STEM Racing competition, with around 60 student beneficiaries aged 15-18.\n\nOur mission is to give every student, regardless of background, the tools to compete at the highest level.",
    links: [["Who we are", "index.html"]],
    follow: ["stem-racing", "sponsor", "join-student"],
  },
  {
    id: "stem-racing",
    chip: "What is STEM Racing?",
    keys: [["stem racing", 4], ["f1 in schools", 4], ["competition", 2], ["what is stem", 3], ["how does it work", 2], ["co2", 2], ["miniature car", 3], ["track", 1], ["race", 1], ["course", 1]],
    answer:
      "STEM Racing is an international competition in which teams of 3 to 6 students design, build and race a miniature car on a 20-metre track, powered by a single CO₂ cartridge. It runs in more than 60 countries and ends each year at the World Finals.\n\nThere are four phases: design in 3D CAD (such as Autodesk Fusion 360), simulate airflow with CFD, manufacture (CNC milling and 3D printing), then race.",
    links: [["How STEM Racing works", "stem-competitions.html"]],
    follow: ["speed", "what-is-trs"],
  },
  {
    id: "sponsor",
    chip: "How can I sponsor?",
    keys: [["sponsor", 4], ["sponsorship", 4], ["partner", 3], ["partnership", 3], ["company", 2], ["business", 2], ["brand", 2], ["parrainage", 3], ["mecenat", 2], ["support", 1], ["fund", 2], ["levels", 2], ["packages", 2], ["tiers", 2], ["price", 2], ["cost", 1]],
    answer:
      "Sponsorship starts at €500. There are four levels:\n\nPlatinum €5,000+, Gold €3,000-5,000, Silver €1,000-3,000 and Bronze €500-1,000.\n\nPick a level on the Support Us page and send a short inquiry; we reply within a few days.",
    links: [["See the levels", "support-us.html#levels"]],
    follow: ["benefits", "budget", "tax"],
  },
  {
    id: "benefits",
    chip: "What do sponsors get?",
    keys: [["benefit", 3], ["get in return", 4], ["what do sponsors get", 5], ["what do i get", 3], ["logo", 3], ["polo", 3], ["visibility", 3], ["exposure", 3], ["advertis", 2], ["post", 1], ["include", 1]],
    answer:
      "Every level gets photos and videos from the competition season and your logo on our displays. Higher levels add your logo on our polo shirts, and on the teams' polos and cars (Platinum and Gold), a post announcing the sponsorship, monthly project updates, and a video highlighting the results your support made possible.\n\nPlatinum also puts your name at the top of all our documents, alongside ours, and includes a thank-you letter and a signed photo.",
    links: [["Compare the levels", "support-us.html#levels"]],
    follow: ["sponsor", "budget"],
  },
  {
    id: "budget",
    chip: "Where does the money go?",
    keys: [["budget", 4], ["where does the money go", 5], ["money", 2], ["spend", 3], ["funds", 2], ["materials", 2], ["entry fee", 3], ["travel", 2], ["annual", 2], ["how much", 2], ["euro", 1], ["finance", 1]],
    answer:
      "Our annual budget is €10,000: €6,000 for materials and equipment, €3,000 for competition entry fees and €1,000 for travel. Longer term, we are working toward a permanent test centre with a certified STEM Racing track and 3D printing facilities.",
    links: [["The budget in detail", "support-us.html"]],
    follow: ["sponsor", "donate"],
  },
  {
    id: "donate",
    chip: "I'm not a company: can I give?",
    keys: [["donate", 4], ["donation", 4], ["gofundme", 4], ["crowdfunding", 3], ["give", 2], ["contribute", 3], ["individual", 2], ["not a company", 4], ["small", 1]],
    answer:
      "Yes. You can support TRS informally through our crowdfunding campaign on GoFundMe. Every contribution funds materials, entry fees and travel for student teams competing this season.",
    links: [["Donate on GoFundMe", "https://www.gofundme.com/f/help-preserve-grow-frances-future-engineering-talent-ynyc6"]],
    follow: ["tax", "budget"],
  },
  {
    id: "tax",
    chip: "Is it tax-deductible?",
    keys: [["tax", 4], ["receipt", 4], ["deduct", 4], ["deductible", 4], ["recu fiscal", 4], ["fiscal", 3], ["invoice", 2], ["facture", 2], ["accounting", 2]],
    answer:
      "TRS cannot issue tax receipts, so please do not count a sponsorship or donation as tax-deductible. If you have a question about invoices or accounting, email us and we will answer it directly.",
    links: [["Email the team", "mailto:teamtachyonracing@gmail.com"]],
    follow: ["sponsor", "donate"],
  },
  {
    id: "join-student",
    chip: "I'm a student: how do I join?",
    keys: [["join", 4], ["student", 3], ["sign up", 3], ["apply", 2], ["participate", 3], ["take part", 3], ["my school", 2], ["my team", 2], ["rejoindre", 3], ["eleve", 3], ["lycee", 2], ["how do i start", 3], ["get started", 2]],
    answer:
      "Whether you are already in a team or just curious about STEM Racing, get in touch at teamtachyonracing@gmail.com. We will help you take the next step.",
    links: [["Email the team", "mailto:teamtachyonracing@gmail.com"], ["How STEM Racing works", "stem-competitions.html"]],
    follow: ["stem-racing", "teams"],
  },
  {
    id: "mentor",
    chip: "I'm an engineer: can I mentor?",
    keys: [["mentor", 4], ["volunteer", 4], ["engineer", 3], ["coach", 3], ["teach", 2], ["help students", 3], ["industry", 2], ["academic", 2], ["benevole", 3], ["bénévole", 3], ["expert", 2]],
    answer:
      "We are looking to expand our mentor network: engineers, academics and industry mentors who can support students across design, manufacturing and competition strategy. If that is you, email us and tell us a little about your background.",
    links: [["Email the team", "mailto:teamtachyonracing@gmail.com"], ["Our goals", "goals-achievements.html"]],
    follow: ["team-people", "stem-racing"],
  },
  {
    id: "teams",
    chip: "Which teams do you mentor?",
    keys: [["teams", 3], ["which teams", 4], ["zephyr", 1], ["nova", 1], ["wild", 1], ["results", 2], ["achievement", 3], ["award", 2], ["won", 2], ["success", 2], ["podium", 2]],
    answer:
      "In our first season we mentored three teams: Zephyr Racing (Project Management Award at the 2026 National Finals), Wild Racing (fastest car and 3rd place at the National Finals, qualifying for the World Finals) and Nova Track (Women in Motorsport award for teamwork and inclusion).",
    links: [["Meet the teams", "goals-achievements.html"]],
    follow: ["wild", "zephyr", "nova"],
  },
  {
    id: "wild",
    chip: "Who had the fastest car?",
    keys: [["wild", 4], ["fastest", 5], ["quickest", 3], ["world finals", 2], ["singapore", 3], ["1.182", 4]],
    answer:
      "Wild Racing. Their car crossed the track in 1.182 seconds at the 2026 National Finals, the fastest of the event, and the team placed 3rd in France, which qualified them for the 2026 World Finals at Resorts World Sentosa in Singapore.",
    links: [["Wild Racing's story", "goals-achievements.html#wild"], ["Try the speed calculator", "stem-competitions.html#speed"]],
    follow: ["speed", "teams"],
  },
  {
    id: "zephyr",
    chip: "Tell me about Zephyr Racing",
    keys: [["zephyr", 5], ["project management", 3], ["pmi", 3], ["saint germain", 2]],
    answer:
      "Zephyr Racing is six Grade 10 students from the Lycée International de Saint-Germain-en-Laye. They took 3rd in the Île-de-France regional competition, reached the 2026 National Finals (8th in the race, about 0.2 seconds from the winning team) and won the Project Management Award presented by the Project Management Institute (PMI).",
    links: [["Zephyr Racing's story", "goals-achievements.html#zephyr"]],
    follow: ["teams", "wild"],
  },
  {
    id: "nova",
    chip: "Tell me about Nova Track",
    keys: [["nova", 5], ["women", 4], ["girls", 3], ["female", 3], ["inclusion", 3], ["diversity", 2]],
    answer:
      "Nova Track won the Women in Motorsport award. Their story is about team culture: TRS helped them strengthen communication, leadership and cross-functional cooperation so design, manufacturing and presentation work all lined up behind one goal.",
    links: [["Nova Track's story", "goals-achievements.html#nova"]],
    follow: ["teams", "join-student"],
  },
  {
    id: "world-finals",
    chip: "What about the World Finals?",
    keys: [["world finals", 4], ["saudi", 3], ["2024", 3], ["autodesk", 3], ["pressure challenge", 4], ["represented france", 4], ["founding team", 3], ["history", 2], ["founded", 3], ["when", 1], ["origin", 2], ["started", 2]],
    answer:
      "Our founding team, Tachyon Racing, represented France at the 2024 World Finals in Saudi Arabia and won the Autodesk Pressure Challenge Award. That experience inspired the founding of TRS in 2025. In 2026, Wild Racing, a team we mentored, qualified for the World Finals in Singapore.",
    links: [["Our results", "goals-achievements.html"]],
    follow: ["wild", "what-is-trs"],
  },
  {
    id: "speed",
    chip: "How fast is a STEM Racing car?",
    keys: [["speed", 4], ["how fast", 5], ["km/h", 4], ["mph", 4], ["quick", 1], ["seconds", 2], ["time", 1], ["velocity", 3], ["vitesse", 3]],
    answer:
      "Very. The track is 20 metres and a car is timed from launch to the finish line, so Wild Racing's 1.182 seconds works out to an average of about 16.9 m/s, roughly 61 km/h (38 mph). The calculator on the STEM Competitions page lets you try any time.",
    links: [["Open the speed calculator", "stem-competitions.html#speed"]],
    follow: ["stem-racing", "wild"],
  },
  {
    id: "team-people",
    chip: "Who runs TRS?",
    keys: [["who runs", 4], ["who is behind", 4], ["founder", 3], ["president", 3], ["hugo", 3], ["ines", 3], ["julien", 3], ["liane", 3], ["taymour", 3], ["volunteers", 2], ["people", 2], ["staff", 2], ["board", 2], ["management", 1]],
    answer:
      "TRS is run by volunteers. Hugo Boubel is President and legal representative, Ines Leung is Vice President (local operations), Julien Billy is Engineering Coach, Liane Fleur leads communication, media and sponsorship, and Taymour Arayssi is EJM Coordinator.",
    links: [["The volunteers behind TRS", "index.html#team-title"]],
    follow: ["contact", "mentor"],
  },
  {
    id: "contact",
    chip: "How do I contact you?",
    keys: [["contact", 4], ["email", 4], ["mail", 3], ["reach", 3], ["address", 3], ["where", 2], ["located", 3], ["based", 3], ["le pecq", 4], ["paris", 2], ["phone", 2], ["social", 3], ["instagram", 3], ["linkedin", 3], ["facebook", 3], ["adresse", 3]],
    answer:
      "Email teamtachyonracing@gmail.com. We are based in Le Pecq, Île-de-France, France. You can also follow us on Instagram, Facebook and LinkedIn; the links are in the footer.",
    links: [["Email the team", "mailto:teamtachyonracing@gmail.com"]],
    follow: ["sponsor", "join-student"],
  },
  {
    id: "members",
    chip: "How does the members area work?",
    keys: [["resources", 3], ["members", 4], ["password", 4], ["login", 3], ["log in", 3], ["members area", 5], ["gallery", 2], ["faq", 2], ["directory", 2], ["locked", 2]],
    answer:
      "The Resources page is a members area for TRS students, partners and mentors, with resources, a gallery, an FAQ and the TRS contact directory. It opens with a shared password. If you are part of the TRS community and do not have it, ask the team.",
    links: [["Open the members area", "resources.html"], ["Email the team", "mailto:teamtachyonracing@gmail.com"]],
    follow: ["contact"],
  },
  {
    id: "supporters",
    chip: "Who supports TRS?",
    keys: [["supporter", 4], ["supported by", 5], ["who supports", 5], ["ansys", 4], ["jeannine", 4], ["manuel", 3], ["club inter", 4], ["fse", 3], ["partners", 2], ["backed", 3], ["lycee international", 3]],
    answer:
      "We are supported by the Lycée International de Saint-Germain-en-Laye (through its FSE and Club Inter), École Jeannine Manuel and Ansys.",
    links: [["See our supporters", "index.html#supporters-title"], ["Become a sponsor", "support-us.html"]],
    follow: ["sponsor", "what-is-trs"],
  },
  {
    id: "independent",
    chip: "Is TRS independent?",
    keys: [["official", 3], ["affiliat", 4], ["formula 1", 3], ["f1", 2], ["ferrari", 2], ["linked to", 3], ["part of", 2]],
    answer:
      "TRS is an independent, student-focused association. We mentor teams that enter STEM Racing, the international competition; we coach them rather than building or racing a car ourselves.",
    links: [["What we do", "index.html"]],
    follow: ["what-is-trs", "stem-racing"],
  },
];
