/* Pray with Me: ask for a store rating once, after a good moment (the third day of prayer), never on first open. */
(function () {
  "use strict";
  const CFG = window.PLUS_CONFIG || {};
  const C = window.Capacitor, native = !!(C && C.isNativePlatform && C.isNativePlatform());
  if (store.get("rated", false)) return;
  const s = store.get("streak", { n: 0 });
  if (!s || s.n < 3) return;

  const css = document.createElement("style");
  css.textContent =
    "#rate{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom));transform:translateX(-50%);width:calc(100% - 28px);max-width:26rem;z-index:22;background:var(--bg2);border:1px solid var(--accent);border-radius:16px;padding:16px 18px;box-shadow:0 10px 30px rgba(0,0,0,.35);display:none}" +
    "#rate.open{display:block}#rate p{margin:0 0 12px;font-size:1.05rem;line-height:1.5}" +
    "#rate .b{display:flex;gap:10px;justify-content:flex-end}#rate button{font:inherit;font-size:1rem;padding:11px 16px;border-radius:999px;border:1px solid var(--line);background:var(--bg);color:var(--ink);min-height:44px;cursor:pointer}" +
    "#rate button.go{background:var(--accent);color:#1b1405;border-color:var(--accent);font-weight:bold}";
  document.head.appendChild(css);
  const box = document.createElement("div"); box.id = "rate"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Rate Pray with Me");
  const pr = store.get("profile", null);
  box.innerHTML = '<p>' + (pr && pr.name ? esc(pr.name) + ", t" : "T") + 'his is your third day of prayer with us. If Pray with Me is helping, a short rating helps other people find it.</p>' +
    '<div class="b"><button type="button" id="rateLater">Not now</button><button type="button" class="go" id="rateGo">Rate it</button></div>';
  document.body.appendChild(box);

  function anyDialogOpen() {
    return ["ob", "pw", "intro"].some(function (id) { const el = document.getElementById(id); return el && el.classList.contains("open"); }) || document.body.classList.contains("quiet");
  }
  function show() { if (anyDialogOpen()) { setTimeout(show, 4000); return; } box.classList.add("open"); }
  box.addEventListener("click", function (e) {
    if (e.target.id === "rateLater") { box.classList.remove("open"); store.set("rated", true); }
    if (e.target.id === "rateGo") {
      box.classList.remove("open"); store.set("rated", true);
      const url = native && C.getPlatform && C.getPlatform() === "android" ? "market://details?id=com.quietprayers.daily" : (CFG.PLAY_URL || "");
      try { window.open(url, "_blank"); } catch (err) { location.href = url; }
    }
  });
  setTimeout(show, 2500);
})();
