export default function resources({ img, icon }) {
  const body = `
<section class="hero gate-hero" data-hero>
  <div class="hero__media">${img("startgate", { alt: "", eager: true, pos: "50% 40%" })}</div>
  <div class="gate" data-gate data-blob="assets/members.enc.json">
    <div class="gate__icon">${icon("lock-key")}</div>
    <h1>Members area</h1>
    <p>Enter the shared password to access resources, gallery, FAQ and the TRS contact directory.</p>
    <form class="form" id="password-form" novalidate>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Enter the shared password…" required>
      </div>
      <button class="btn" type="submit">UNLOCK</button>
      <p class="gate__error" data-gate-error role="alert" aria-live="polite"></p>
    </form>
    <noscript><p>The members area needs JavaScript to check the password.</p></noscript>
  </div>
</section>
`;

  return {
    file: "resources.html",
    title: "Resources | Tachyon Racing Society",
    description: "A password-protected hub for Tachyon Racing Society members, partners and mentors.",
    active: "resources.html",
    heroKey: "startgate",
    heroSizes: "100vw",
    body,
  };
}
