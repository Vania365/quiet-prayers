/* Quiet Prayers: "Before you begin" screen, Quiet mode (no distractions, screen stays on), and a gentle note in the grief tab. */
(function () {
  "use strict";

  const css = document.createElement("style");
  css.textContent =
    "#intro{position:fixed;inset:0;z-index:40;background:var(--page,var(--bg));display:none;flex-direction:column;align-items:center;justify-content:center;padding:28px;overflow-y:auto;text-align:center}" +
    "#intro.open{display:flex}#intro .box{max-width:30rem;width:100%}" +
    "#intro .mark{width:54px;height:54px;color:var(--accent);margin:0 auto 14px;display:block}" +
    "#intro h2{margin:0 0 18px;font-size:1.7rem;color:var(--accent)}" +
    "#intro p{font-size:1.2rem;line-height:1.6;margin:0 0 14px;color:var(--ink)}" +
    "#intro p.s{color:var(--muted);font-size:1rem}" +
    "#intro .row2{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:22px}" +
    "#intro .b{font:inherit;font-size:1.05rem;padding:13px 24px;border-radius:999px;border:1px solid var(--line);background:var(--bg2);color:var(--ink);min-height:48px;cursor:pointer}" +
    "#intro .b.go{background:var(--accent);color:#1b1405;border-color:var(--accent);font-weight:bold}" +
    "#quietBtn{font-size:1.3rem}" +
    "#qx{position:fixed;top:calc(10px + env(safe-area-inset-top));right:12px;z-index:25;display:none;font:inherit;font-size:.95rem;padding:10px 16px;min-height:44px;border-radius:999px;border:1px solid var(--line);background:rgba(22,36,59,.85);color:var(--ink);cursor:pointer}" +
    "body.quiet #qx{display:block}" +
    "body.quiet header,body.quiet .card .actions,body.quiet .card .hint,body.quiet .card .foot{display:none !important}" +
    "body.quiet main{padding-top:0;scroll-padding-top:0}" +
    "body.quiet .card{min-height:100dvh;padding-top:64px;padding-bottom:64px}" +
    ".gnote .text{font-size:calc(var(--fs) * .85)}";
  document.head.appendChild(css);

  /* ---------- Before you begin ---------- */
  const intro = document.createElement("div");
  intro.id = "intro"; intro.setAttribute("role", "dialog"); intro.setAttribute("aria-modal", "true"); intro.setAttribute("aria-label", "Before you begin");
  document.body.appendChild(intro);

  function introHtml() {
    const pr = store.get("profile", null);
    const remembering = pr && ((pr.remember && pr.remember.length) || (pr.lost && pr.lost.length));
    return '<div class="box">' + (window.QuietHands || "") + '<h2>Before you begin</h2>' +
      '<p>Find a quiet place, even for two minutes.</p>' +
      '<p>Put your phone on silent and move other distractions out of reach.</p>' +
      '<p>You can say the prayer out loud, in a whisper, or simply read it in silence. There is no wrong way.</p>' +
      (remembering ? '<p>If you are remembering someone, you can say their name. You are not alone in this.</p>' : '') +
      '<p class="s">Take one slow breath. When you are ready, begin.</p>' +
      '<div class="row2"><button class="b go" id="introGo">I’m ready</button><button class="b" id="introQuiet">Open Quiet mode</button></div></div>';
  }
  window.QuietIntro = function (force) {
    if (!force && store.get("introSeen", false)) return;
    if (document.getElementById("ob") && document.getElementById("ob").classList.contains("open")) return;
    intro.innerHTML = introHtml(); intro.classList.add("open");
    const g = document.getElementById("introGo"); if (g) g.focus();
  };
  function closeIntro() { intro.classList.remove("open"); store.set("introSeen", true); }
  intro.addEventListener("click", function (e) {
    if (e.target.id === "introGo") closeIntro();
    else if (e.target.id === "introQuiet") { closeIntro(); enter(); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && intro.classList.contains("open")) closeIntro(); });

  /* ---------- Quiet mode ---------- */
  let wl = null;
  async function lock() { try { if ("wakeLock" in navigator) wl = await navigator.wakeLock.request("screen"); } catch (e) { wl = null; } }
  function unlock() { try { if (wl) wl.release(); } catch (e) {} wl = null; }
  document.addEventListener("visibilitychange", function () { if (document.body.classList.contains("quiet") && !document.hidden) lock(); });

  function currentCard() {
    const cards = Array.prototype.slice.call(feed.querySelectorAll(".card"));
    for (let i = 0; i < cards.length; i++) { if (cards[i].offsetTop + cards[i].offsetHeight > feed.scrollTop + 40) return cards[i]; }
    return cards[0] || null;
  }
  function enter() {
    if (tab === "people") { toast("Open a prayer first"); return; }
    const c = currentCard();
    document.body.classList.add("quiet"); lock();
    requestAnimationFrame(function () { if (c) c.scrollIntoView({ block: "start" }); });
    toast("Quiet mode. Tap Exit when you are done.");
  }
  function leave() {
    const c = currentCard();
    document.body.classList.remove("quiet"); unlock();
    requestAnimationFrame(function () { if (c) c.scrollIntoView({ block: "start" }); });
  }
  const qx = document.createElement("button"); qx.id = "qx"; qx.type = "button"; qx.textContent = "Exit quiet mode";
  qx.addEventListener("click", leave); document.body.appendChild(qx);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.body.classList.contains("quiet")) leave(); });

  const top = document.querySelector("header .top > span:last-child");
  const qb = document.createElement("button");
  qb.className = "iconbtn"; qb.id = "quietBtn"; qb.type = "button"; qb.setAttribute("aria-label", "Quiet mode"); qb.title = "Quiet mode"; qb.textContent = "☾";
  qb.addEventListener("click", enter);
  if (top) top.insertBefore(qb, document.getElementById("musicBtn") || document.getElementById("openSettings"));

  /* ---------- settings row ---------- */
  const panel = document.querySelector("#sheet .panel"), prof = panel && panel.querySelector(":scope > .prof");
  if (panel && prof) {
    const row = document.createElement("div"); row.className = "row";
    row.innerHTML = '<span>How to pray</span><span class="prof"><button id="openIntro" type="button">Open</button></span>';
    panel.insertBefore(row, prof);
    document.getElementById("openIntro").addEventListener("click", function () { sheet.classList.remove("open"); window.QuietIntro(true); });
  }

  /* ---------- gentle note at the end of the Grief tab ---------- */
  const base = window.render;
  window.render = function () {
    base();
    if (tab === "today" && !document.querySelector("#feed .gnote") && document.querySelector("#feed .card[data-id]")) {
      const e = document.createElement("section");
      e.className = "card gnote";
      e.innerHTML = '<div class="tag">That is all for today</div><p class="text">Thank you for taking this time. Come back tomorrow for new prayers, or open any tab above for more.</p>';
      feed.appendChild(e);
    }
    if (tab === "grief" && !document.querySelector("#feed .gnote")) {
      const s = document.createElement("section");
      s.className = "card gnote";
      s.innerHTML = '<div class="tag">A gentle note</div><p class="text">If the pain feels too heavy, you do not have to carry it alone. Talk to someone you trust, such as a friend, a pastor, a counselor or your doctor.</p>';
      feed.appendChild(s);
    }
  };
  render();
})();
