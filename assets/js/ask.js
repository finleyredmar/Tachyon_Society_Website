/* Ask TRS: a small assistant that answers from the site's own content.
   No server and no API key. Anything it cannot answer can be sent to the team or searched online.
   Knowledge lives in tools/kb.mjs and is compiled into assets/js/kb.js by the build. */
(function () {
  "use strict";

  var KB = window.TRS_KB;
  var root = document.querySelector("[data-ask]");
  if (!KB || !root) return;

  var TEAM_EMAIL = "teamtachyonracing@gmail.com";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var fab = root.querySelector(".ask__fab");
  var panel = root.querySelector(".ask__panel");
  var closeBtn = root.querySelector(".ask__close");
  var log = root.querySelector(".ask__log");
  var chips = root.querySelector(".ask__chips");
  var form = root.querySelector(".ask__form");
  var input = root.querySelector(".ask__input");

  var byId = {};
  KB.entries.forEach(function (e) { byId[e.id] = e; });
  var started = false;
  var lastTrigger = null;

  /* ---- Matching ----------------------------------------------------------- */
  function norm(s) {
    return " " + String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9./ ]+/g, " ").replace(/\s+/g, " ").trim();
  }
  function score(entry, text) {
    var total = 0;
    entry.keys.forEach(function (k) {
      // keys match from the start of a word, so "sponsor" also catches "sponsoring"
      if (text.indexOf(" " + norm(k[0]).trim()) > -1) total += k[1];
    });
    return total;
  }
  function rank(question) {
    var text = norm(question);
    return KB.entries
      .map(function (e) { return { e: e, s: score(e, text) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; });
  }
  var GREETING = /^ (hi|hello|hey|hola|bonjour|salut|good (morning|afternoon|evening))( |$)/;
  var THANKS = /^ (thanks|thank you|merci|cheers|great|perfect)( |$)/;

  /* ---- Rendering ---------------------------------------------------------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function scrollToEnd() {
    log.scrollTo({ top: log.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }
  function user(text) {
    log.appendChild(el("div", "ask__msg ask__msg--user", text));
    scrollToEnd();
  }
  function linkEl(label, href) {
    var a = el("a", "ask__link", label);
    a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    return a;
  }
  function bot(paragraphs, links, follow) {
    var m = el("div", "ask__msg ask__msg--bot");
    paragraphs.forEach(function (p) { m.appendChild(el("p", "", p)); });
    if (links && links.length) {
      var row = el("div", "ask__links");
      links.forEach(function (l) { row.appendChild(linkEl(l[0], l[1])); });
      m.appendChild(row);
    }
    log.appendChild(m);
    setChips(follow || []);
    scrollToEnd();
    return m;
  }
  function setChips(ids) {
    chips.textContent = "";
    ids.forEach(function (id) {
      var e = byId[id];
      if (!e || !e.chip) return;
      var b = el("button", "ask__chip", e.chip);
      b.type = "button";
      b.addEventListener("click", function () { ask(e.chip, e.id); });
      chips.appendChild(b);
    });
  }

  /* ---- Fallback: team inbox or the open web ------------------------------- */
  function searchUrl(q) {
    return "https://www.google.com/search?q=" + encodeURIComponent("STEM Racing " + q);
  }
  function mailtoUrl(q, from) {
    var body = q + (from ? "\n\nReply to: " + from : "") + "\n\n(Sent from the TRS website assistant)";
    return "mailto:" + TEAM_EMAIL + "?subject=" + encodeURIComponent("Question from the website") + "&body=" + encodeURIComponent(body);
  }
  function fallback(q) {
    var m = el("div", "ask__msg ask__msg--bot");
    m.appendChild(el("p", "", "I don't have a reliable answer to that yet, and I'd rather not guess. You can ask the team directly, or look it up online."));
    var row = el("div", "ask__actions");

    var send = el("button", "ask__action ask__action--primary", "Send my question to the team");
    send.type = "button";
    var web = linkEl("Search the web", searchUrl(q));
    web.className = "ask__action";
    row.appendChild(send);
    row.appendChild(web);
    m.appendChild(row);

    var slot = el("div", "ask__send");
    slot.hidden = true;
    m.appendChild(slot);

    send.addEventListener("click", function () {
      send.disabled = true;
      slot.hidden = false;
      slot.textContent = "";
      var label = el("label", "", "Your email, if you'd like a reply (optional)");
      label.setAttribute("for", "ask-reply");
      var mail = el("input");
      mail.type = "email"; mail.id = "ask-reply"; mail.autocomplete = "email"; mail.spellcheck = false;
      mail.placeholder = "you@example.com…";
      var go = el("button", "ask__action ask__action--primary", "Send");
      go.type = "button";
      var note = el("p", "ask__fine", "Your question and email go only to the TRS team.");
      var status = el("p", "ask__fine");
      status.setAttribute("role", "status");
      slot.appendChild(label); slot.appendChild(mail); slot.appendChild(go); slot.appendChild(note); slot.appendChild(status);
      mail.focus();
      go.addEventListener("click", function () {
        go.disabled = true;
        status.textContent = "Sending…";
        fetch("https://formsubmit.co/ajax/" + TEAM_EMAIL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: "Question from the TRS website assistant",
            _template: "table",
            _captcha: "false",
            question: q,
            reply_to: mail.value || "(none given)",
          }),
        })
          .then(function (r) { if (!r.ok) throw new Error("bad status"); return r.json(); })
          .then(function () {
            status.textContent = "Sent. Thank you, the team will look at it" + (mail.value ? " and reply by email." : ".");
            slot.querySelectorAll("input,button,label").forEach(function (n) { n.hidden = true; });
            status.tabIndex = -1; status.focus();
          })
          .catch(function () {
            status.textContent = "";
            var a = linkEl("That didn't go through. Open an email instead", mailtoUrl(q, mail.value));
            status.appendChild(a);
            go.disabled = false;
          });
      });
    });

    log.appendChild(m);
    setChips(["sponsor", "join-student", "contact"]);
    scrollToEnd();
  }

  /* ---- Conversation ------------------------------------------------------- */
  function ask(question, forcedId) {
    var q = question.trim();
    if (!q) return;
    user(q);
    var text = norm(q);

    if (!forcedId && GREETING.test(text)) {
      bot(["Hi! I can answer questions about TRS, STEM Racing, sponsoring and how to get involved. What would you like to know?"], [], KB.start);
      return;
    }
    if (!forcedId && THANKS.test(text)) {
      bot(["You're welcome. Anything else?"], [], KB.start);
      return;
    }

    var hit = forcedId ? { e: byId[forcedId], s: 99 } : rank(q)[0];
    if (!hit || hit.s < 3) { fallback(q); return; }
    var e = hit.e;
    bot(e.answer.split("\n\n"), e.links, e.follow);
  }

  /* ---- Open / close ------------------------------------------------------- */
  function open(prefill, trigger) {
    lastTrigger = trigger || fab;
    panel.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    root.setAttribute("data-open", "");
    if (!started) {
      started = true;
      bot(
        ["Hi, I'm the TRS assistant. I answer from this website, and if I can't, I'll pass your question to the team. What do you want to know?"],
        [],
        KB.start
      );
    }
    if (prefill) { ask(prefill); } else { input.focus(); }
  }
  function close() {
    panel.hidden = true;
    fab.setAttribute("aria-expanded", "false");
    root.removeAttribute("data-open");
    (lastTrigger || fab).focus();
  }

  fab.addEventListener("click", function () { if (panel.hidden) open(); else close(); });
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) close(); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = "";
    ask(v);
    input.focus();
  });
  // Any element with data-ask-open (and optionally data-ask-q) opens the assistant.
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-ask-open]");
    if (!t) return;
    e.preventDefault();
    if (panel.hidden) open(t.getAttribute("data-ask-q") || "", t);
    else input.focus();
  });
})();
