/* Tachyon Racing Society: site behaviour.
   Everything here is progressive enhancement; the pages read fine without it. */
(function () {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header: transparent over the hero, solid after it ------------------ */
  var header = doc.querySelector(".site-header");
  var hero = doc.querySelector("[data-hero]");
  if (header && hero && "IntersectionObserver" in window) {
    header.setAttribute("data-top", "");
    new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) header.setAttribute("data-top", "");
        else header.removeAttribute("data-top");
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    ).observe(hero);
  }

  /* ---- Mobile navigation -------------------------------------------------- */
  var toggle = doc.querySelector(".nav-toggle");
  var nav = doc.getElementById("site-nav");
  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) nav.setAttribute("data-open", "");
    else nav.removeAttribute("data-open");
    if (header) {
      if (open) header.setAttribute("data-menu-open", "");
      else header.removeAttribute("data-menu-open");
    }
    if (open) doc.body.setAttribute("data-nav-open", "");
    else doc.body.removeAttribute("data-nav-open");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 981px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---- Scroll reveal ------------------------------------------------------ */
  var revealEls = doc.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (!("IntersectionObserver" in window) || reduceMotion) {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- Tabs (teams) ------------------------------------------------------- */
  doc.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return doc.getElementById(t.getAttribute("aria-controls")); });

    function select(index, focus, updateHash) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        if (panels[i]) panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
      if (updateHash && history.replaceState) history.replaceState(null, "", "#" + tabs[index].id.replace("tab-", ""));
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i, false, true); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true, true); }
      });
    });

    var fromHash = tabs.findIndex(function (t) { return "#" + t.id.replace("tab-", "") === location.hash; });
    select(fromHash > -1 ? fromHash : 0, false, false);
  });

  /* ---- Sponsor inquiry ---------------------------------------------------- */
  var inquiry = doc.getElementById("sponsor-inquiry");
  var levelField = doc.getElementById("sponsorshipLevel");
  var levelLabel = doc.getElementById("inquiryLevel");
  doc.querySelectorAll("[data-sponsorship-tier]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tier = btn.getAttribute("data-sponsorship-tier");
      if (!inquiry || !levelField || !tier) return;
      levelField.value = tier;
      if (levelLabel) levelLabel.textContent = tier;
      inquiry.hidden = false;
      inquiry.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      var name = doc.getElementById("sponsorName");
      if (name) name.focus({ preventScroll: true });
    });
  });

  /* ---- Members area ------------------------------------------------------- */
  var gate = doc.querySelector("[data-gate]");
  if (gate) {
    var form = gate.querySelector("form");
    var input = gate.querySelector("input[type=password]");
    var button = gate.querySelector("button[type=submit]");
    var error = gate.querySelector("[data-gate-error]");
    var blobPromise = null;

    var b64 = function (s) {
      var bin = atob(s), out = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    };

    function loadBlob() {
      if (!blobPromise) blobPromise = fetch(gate.getAttribute("data-blob")).then(function (r) { return r.json(); });
      return blobPromise;
    }

    async function unlock(password) {
      var blob = await loadBlob();
      var enc = new TextEncoder();
      var base = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
      var key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: b64(blob.salt), iterations: blob.iter, hash: "SHA-256" },
        base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
      );
      var plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(blob.iv) }, key, b64(blob.ct));
      return new TextDecoder().decode(plain);
    }

    // Warm the download so the first attempt is fast.
    input.addEventListener("focus", loadBlob, { once: true });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!input.value) { error.textContent = "Enter the password to continue."; input.focus(); return; }
      if (!(window.crypto && crypto.subtle)) { error.textContent = "This browser cannot unlock the area. Try a current browser over https."; return; }
      button.disabled = true;
      error.textContent = "";
      var label = button.textContent;
      button.textContent = "Checking";
      try {
        var url = await unlock(input.value);
        window.location.href = url;
      } catch (err) {
        error.textContent = "Incorrect password. Please try again.";
        input.select();
      } finally {
        button.disabled = false;
        button.textContent = label;
      }
    });
  }


  /* ---- Speed calculator (STEM Competitions) -------------------------------- */
  var calc = doc.querySelector("[data-speed]");
  if (calc) {
    var DIST = 20; // metres, the STEM Racing track
    var tIn = calc.querySelector("#speed-time");
    var err = calc.querySelector("[data-speed-error]");
    var trackEl = calc.querySelector("[data-track]");
    var clock = calc.querySelector("[data-clock]");
    var slow = calc.querySelector("[data-slow]");
    var note = calc.querySelector("[data-speed-note]");
    var presets = doc.querySelectorAll("[data-speed-preset]");
    var raf = 0;

    function readTime() {
      var t = parseFloat(tIn.value);
      return t >= 0.8 && t <= 6 ? t : null;
    }
    function setOut(name, v) { calc.querySelector('[data-out="' + name + '"]').textContent = v; }
    function resetCar() {
      cancelAnimationFrame(raf);
      trackEl.style.setProperty("--x", "0");
      clock.textContent = "0.000 s";
    }
    function update() {
      resetCar();
      var t = readTime();
      if (t === null) { err.textContent = "Enter a time between 0.8 and 6 seconds."; return null; }
      err.textContent = "";
      var ms = DIST / t, kmh = ms * 3.6;
      setOut("ms", ms.toFixed(1));
      setOut("kmh", kmh.toFixed(1));
      setOut("mph", (kmh * 0.621371).toFixed(1));
      var g = (2 * DIST / (t * t)) / 9.81;
      var rel = kmh > 50 ? "faster than" : kmh < 50 ? "slower than" : "the same as";
      note.textContent = "On average that is " + rel + " the 50 km/h limit in a French town. If the car accelerated steadily from rest, it would be about " + g.toFixed(1) + " g.";
      return t;
    }
    function launch() {
      var t = update();
      if (t === null) return;
      if (reduceMotion) { trackEl.style.setProperty("--x", "1"); clock.textContent = t.toFixed(3) + " s"; return; }
      var factor = slow.checked ? 8 : 1, start = performance.now();
      (function frame(now) {
        var e = (now - start) / 1000 / factor;      // race seconds elapsed
        var p = Math.min(1, e / t);
        trackEl.style.setProperty("--x", String(p * p)); // steady acceleration from rest: distance grows with time squared
        clock.textContent = Math.min(e, t).toFixed(3) + " s";
        if (p < 1) raf = requestAnimationFrame(frame);
      })(start);
    }
    tIn.addEventListener("input", function () {
      presets.forEach(function (b) { b.setAttribute("aria-pressed", String(parseFloat(b.getAttribute("data-speed-preset")) === parseFloat(tIn.value))); });
      update();
    });
    presets.forEach(function (b) {
      b.setAttribute("aria-pressed", String(parseFloat(b.getAttribute("data-speed-preset")) === parseFloat(tIn.value)));
      b.addEventListener("click", function () { tIn.value = b.getAttribute("data-speed-preset"); tIn.dispatchEvent(new Event("input")); });
    });
    calc.querySelector("[data-launch]").addEventListener("click", launch);
    update();
  }
})();
