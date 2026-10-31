/* Pray with Me Plus: entitlement state, RevenueCat bridge (native), the Plus screen (paywall),
   the free tier (a few prayers a day + a few per tab), the trial reminder, and the Settings row.
   Loaded after every module that changes list()/render(). Config lives in plus_config.js. */
(function () {
  "use strict";
  const CFG = window.PLUS_CONFIG || {};
  const C = window.Capacitor;
  const native = !!(C && C.isNativePlatform && C.isNativePlatform());
  const RC = native && C.Plugins ? C.Plugins.Purchases : null;
  const platform = native && C.getPlatform ? C.getPlatform() : "web";
  const apiKey = platform === "ios" ? CFG.REVENUECAT_IOS_KEY : CFG.REVENUECAT_ANDROID_KEY;
  const configured = !!(RC && apiKey && apiKey.indexOf("REPLACE_ME") < 0);

  /* ---------- state ---------- */
  // "plus" in localStorage is a cache of the entitlement, so the app works offline and the web demo can be tested (?plus=1 / ?plus=0)
  try {
    const q = new URLSearchParams(location.search).get("plus");
    if (q === "1") store.set("plus", { on: true, dev: true });
    if (q === "0") store.set("plus", { on: false });
  } catch (e) {}
  function state() { return store.get("plus", { on: false }); }
  function active() { return !!state().on; }
  function setActive(on, extra) { const s = Object.assign({}, state(), extra || {}, { on: !!on }); store.set("plus", s); refresh(); }
  window.Plus = { active: active, configured: configured, native: native };

  /* ---------- RevenueCat ---------- */
  let offering = null; // {yearly, monthly, lifetime} -> package
  function pick(pkgs) {
    const out = {};
    (pkgs || []).forEach(function (p) {
      const t = (p.packageType || "").toUpperCase(), id = ((p.product && p.product.identifier) || p.identifier || "").toLowerCase();
      if (t === "ANNUAL" || id.indexOf("year") >= 0) out.yearly = out.yearly || p;
      else if (t === "MONTHLY" || id.indexOf("month") >= 0) out.monthly = out.monthly || p;
      else if (t === "LIFETIME" || id.indexOf("life") >= 0) out.lifetime = out.lifetime || p;
    });
    return out;
  }
  function applyInfo(info) {
    if (!info || !info.entitlements) return;
    const ent = info.entitlements.active && info.entitlements.active[CFG.ENTITLEMENT || "plus"];
    if (ent) {
      setActive(true, { exp: ent.expirationDate || null, trial: ent.periodType === "TRIAL", product: ent.productIdentifier || "" });
      if (ent.periodType === "TRIAL" && ent.expirationDate) scheduleTrialReminder(ent.expirationDate);
    } else if (!state().dev) setActive(false, { exp: null, trial: false });
  }
  async function initRC() {
    if (!configured) return;
    try {
      await RC.configure({ apiKey: apiKey });
      try { RC.addCustomerInfoUpdateListener(function (info) { applyInfo(info); }); } catch (e) {}
      const r = await RC.getCustomerInfo(); applyInfo(r && r.customerInfo);
      const o = await RC.getOfferings();
      const cur = o && (o.current || (o.offerings && o.offerings.current));
      if (cur) offering = pick(cur.availablePackages);
      if (pw.classList.contains("open")) draw();
    } catch (e) {}
  }
  async function purchase(key) {
    if (!configured) { toast(native ? "Plus is not available yet. Please try again after the next update." : "Plus can be purchased in the app from Google Play or the App Store."); return false; }
    const pkg = offering && offering[key];
    if (!pkg) { toast("Could not load the plans. Please check your connection and try again."); return false; }
    try {
      busy(true);
      const r = await RC.purchasePackage({ aPackage: pkg });
      applyInfo(r && r.customerInfo);
      busy(false);
      if (active()) { toast("Welcome to Plus. Thank you."); return true; }
      return false;
    } catch (e) {
      busy(false);
      if (!(e && (e.userCancelled || /cancel/i.test(String(e.message || e.code || ""))))) toast("The purchase did not go through. You were not charged.");
      return false;
    }
  }
  async function restore() {
    if (!configured) { toast("Nothing to restore here."); return; }
    try { busy(true); const r = await RC.restorePurchases(); applyInfo(r && r.customerInfo); busy(false); toast(active() ? "Plus restored" : "No previous purchase found"); }
    catch (e) { busy(false); toast("Could not restore right now"); }
  }

  /* ---------- the trial reminder we promise on the Plus screen ---------- */
  function scheduleTrialReminder(expISO) {
    try {
      const exp = new Date(expISO); if (isNaN(exp)) return;
      if (store.get("trialRemFor", "") === expISO) return;
      const at = new Date(exp.getTime() - (CFG.TRIAL_REMINDER_DAYS_BEFORE || 2) * 864e5); at.setHours(10, 0, 0, 0);
      if (at.getTime() < Date.now() + 36e5) return;
      const when = exp.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
      if (window.NativeNotify) window.NativeNotify.at(2, at, "Pray with Me", "Your free week of Plus ends on " + when + ". To keep it, do nothing. To cancel, open Google Play › Subscriptions.");
      store.set("trialRemFor", expISO);
    } catch (e) {}
  }

  /* ---------- free tier ---------- */
  const FREE_DAILY = CFG.FREE_DAILY || 3, FREE_PER_TAB = CFG.FREE_PER_TAB || 2, FREE_TABS = CFG.FREE_TABS || ["saved", "people"];
  let hidden = 0;
  const baseList = window.list;
  window.list = function () {
    const items = baseList();
    hidden = 0;
    if (active() || FREE_TABS.indexOf(tab) >= 0) return items;
    const n = tab === "today" ? FREE_DAILY : FREE_PER_TAB;
    if (items.length > n) { hidden = items.length - n; return items.slice(0, n); }
    return items;
  };
  const baseRender = window.render;
  window.render = function () {
    baseRender();
    if (active() || !hidden || FREE_TABS.indexOf(tab) >= 0) return;
    const name = tab === "today" ? "" : (TAGNAME[tab] || "");
    const s = document.createElement("section");
    s.className = "card lock";
    s.innerHTML = (window.QuietHands || "") +
      '<div class="tag">' + (tab === "today" ? "That’s today’s free prayers" : hidden + " more in " + esc(name)) + '</div>' +
      '<h2 class="title">' + (tab === "today" ? "Plus brings you " + hidden + " more today" : "Every " + esc(name) + " prayer, any time") + '</h2>' +
      '<p class="text">' + (tab === "today"
        ? "Written around what you shared with us, a full day of prayers instead of " + FREE_DAILY + ". Try it free for 7 days."
        : "Plus opens all 450 prayers in every tab, for every season of life. Try it free for 7 days.") + '</p>' +
      '<div class="lockbtns"><button type="button" class="go" data-plus="open">See Pray with Me Plus</button>' +
      (tab === "today" ? '<span>Or come back tomorrow for new prayers.</span>' : '') + '</div>' +
      '<div class="foot"><b>Pray with Me</b><span>One prayer at a time</span></div>';
    const gn = feed.querySelector(".gnote");
    if (gn) feed.insertBefore(s, gn); else feed.appendChild(s);
  };
  feed.addEventListener("click", function (e) { if (e.target.closest("[data-plus=open]")) openPaywall({ source: tab }); });

  /* ---------- the Plus screen ---------- */
  const css = document.createElement("style");
  css.textContent =
    "#pw{position:fixed;inset:0;z-index:45;background:var(--page,var(--bg));color:var(--ink);display:none;flex-direction:column;align-items:center;padding:calc(14px + env(safe-area-inset-top)) 22px calc(22px + env(safe-area-inset-bottom));overflow-y:auto}" +
    "#pw.open{display:flex}#pw .box{width:100%;max-width:30rem;margin:auto 0;position:relative}" +
    "#pw .x{position:absolute;top:0;right:0;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--bg2);color:var(--muted);font:inherit;font-size:1.2rem;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .4s}" +
    "#pw.canclose .x{opacity:1;pointer-events:auto}" +
    "#pw .mark{width:46px;height:46px;margin:6px 0 10px}" +
    "#pw h1{font-size:.95rem;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin:0 0 6px;font-weight:normal}" +
    "#pw h2{font-size:1.5rem;line-height:1.3;margin:0 0 14px}" +
    "#pw ul{list-style:none;padding:0;margin:0 0 18px}#pw li{display:flex;gap:10px;align-items:flex-start;padding:6px 0;font-size:1.05rem;line-height:1.45}#pw li i{color:var(--accent);font-style:normal;flex:0 0 auto}" +
    "#pw .plans{display:flex;flex-direction:column;gap:10px;margin:0 0 14px}" +
    "#pw .plan{position:relative;display:block;width:100%;border:1.5px solid var(--line);background:var(--bg2);color:var(--ink);font:inherit;padding:14px 16px;border-radius:14px;text-align:left;min-height:62px;cursor:pointer}" +
    "#pw .plan[aria-pressed=true]{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent) inset}" +
    "#pw .plan .l1{display:flex;justify-content:space-between;align-items:baseline;gap:10px}#pw .plan b{font-size:1.1rem}#pw .plan .pr{white-space:nowrap;color:var(--accent)}" +
    "#pw .plan small{display:block;color:var(--muted);font-size:.88rem;margin-top:4px;line-height:1.4}" +
    "#pw .badge{position:absolute;top:-10px;left:14px;background:var(--accent);color:#1b1405;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:999px;font-weight:bold}" +
    "#pw .go{width:100%;font:inherit;font-size:1.1rem;font-weight:bold;padding:15px 20px;border-radius:999px;border:0;background:var(--accent);color:#1b1405;min-height:54px;cursor:pointer}" +
    "#pw .go[disabled]{opacity:.6}" +
    "#pw .promise{text-align:center;color:var(--ink);font-size:.98rem;line-height:1.5;margin:12px 0 0}" +
    "#pw .fine{color:var(--muted);font-size:.8rem;line-height:1.5;margin:14px 0 0;text-align:center}" +
    "#pw .links{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-top:8px}#pw .links button,#pw .links a{background:none;border:0;color:var(--muted);font:inherit;font-size:.85rem;text-decoration:underline;cursor:pointer;padding:10px 6px;min-height:40px}" +
    "#pw .note{border-left:2px solid var(--accent);padding:4px 0 4px 12px;margin:0 0 18px;color:var(--muted);font-size:.95rem;line-height:1.5;font-style:italic}" +
    "#pw .free{display:block;margin:6px auto 0;background:none;border:0;color:var(--muted);font:inherit;font-size:.95rem;text-decoration:underline;cursor:pointer;padding:12px;min-height:44px;opacity:0;pointer-events:none;transition:opacity .4s}#pw.canclose .free{opacity:1;pointer-events:auto}" +
    ".card.lock .lockbtns{display:flex;flex-direction:column;align-items:center;gap:12px;margin-top:22px;order:5}" +
    ".card.lock .lockbtns .go{font:inherit;font-size:1.05rem;font-weight:bold;padding:14px 24px;border-radius:999px;border:0;background:var(--accent);color:#1b1405;min-height:50px;cursor:pointer}" +
    ".card.lock .lockbtns span{color:var(--muted);font-size:.9rem}" +
    ".card.lock .title{color:var(--ink)}" +
    "#plusRow .on{color:var(--accent)}";
  document.head.appendChild(css);

  const pw = document.createElement("div");
  pw.id = "pw"; pw.setAttribute("role", "dialog"); pw.setAttribute("aria-modal", "true"); pw.setAttribute("aria-label", "Pray with Me Plus");
  document.body.appendChild(pw);
  let sel = "yearly", onClose = null, closeTimer = null, working = false;

  function price(key) {
    const p = offering && offering[key] && offering[key].product, f = (CFG.PLANS || {})[key] || {};
    return (p && p.priceString) || f.price || "";
  }
  function hasTrial() {
    const p = offering && offering.yearly && offering.yearly.product;
    if (p) return !!(p.introPrice || (p.subscriptionOptions && p.subscriptionOptions.some(function (o) { return o.freePhase; })));
    return !!((CFG.PLANS || {}).yearly || {}).trialDays;
  }
  function perMonth() {
    const p = offering && offering.yearly && offering.yearly.product, f = (CFG.PLANS || {}).yearly || {};
    if (p && p.price && p.currencyCode) { try { return new Intl.NumberFormat(undefined, { style: "currency", currency: p.currencyCode }).format(p.price / 12); } catch (e) {} }
    return f.perMonth || "";
  }
  function draw() {
    const pr = store.get("profile", null), trial = hasTrial(), pm = perMonth();
    const cta = sel === "yearly" ? (trial ? "Start my 7-day free trial" : "Continue with yearly") : sel === "monthly" ? "Continue with monthly" : "Buy once, keep forever";
    pw.innerHTML = '<div class="box"><button class="x" id="pwX" aria-label="Close">✕</button>' + (window.QuietHands || "") +
      '<h1>Pray with Me Plus</h1>' +
      '<h2>Every prayer, every day' + (pr && pr.name ? ", " + esc(pr.name) : "") + '</h2>' +
      '<ul><li><i>✓</i>All 450 prayers, in every tab, whenever you need them</li>' +
      '<li><i>✓</i>A full day of prayers written around what you are carrying</li>' +
      '<li><i>✓</i>Arthur prays your name, or the name of someone you love, in his evening prayer</li>' +
      '<li><i>✓</i>No ads, ever. Plus keeps the free prayers free for everyone</li></ul>' +
      '<p class="note">“No ads and no investors. This little app is kept alive by people like you.” — Arthur</p>' +
      '<div class="plans" role="radiogroup">' +
      plan("yearly", "Yearly", price("yearly") + " / year", (trial ? "7 days free, then billed yearly" : "billed yearly") + (pm ? " · about " + pm + " a month" : ""), "Best value") +
      plan("monthly", "Monthly", price("monthly") + " / month", "cancel any time", "") +
      plan("lifetime", "Lifetime", price("lifetime") + " once", "yours forever, no renewal", "") +
      '</div>' +
      '<button class="go" id="pwGo"' + (working ? " disabled" : "") + '>' + (working ? "One moment…" : cta) + '</button>' +
      (sel === "yearly" && trial ? '<p class="promise">No payment today. We will send you a reminder 2 days before your trial ends.</p>' : "") +
      '<button class="free" id="pwFree">Continue with the free version</button>' +
      '<p class="fine">' + fine(trial) + '</p>' +
      '<div class="links"><button type="button" id="pwRestore">Restore purchases</button><a href="' + esc(CFG.TERMS_URL || "#") + '" target="_blank" rel="noopener">Terms</a><a href="' + esc(CFG.PRIVACY_URL || "#") + '" target="_blank" rel="noopener">Privacy</a></div>' +
      '</div>';
  }
  function plan(key, title, line, sub, badge) {
    return '<button type="button" class="plan" role="radio" data-plan="' + key + '" aria-pressed="' + (sel === key) + '" aria-checked="' + (sel === key) + '">' +
      (badge ? '<span class="badge">' + badge + '</span>' : "") +
      '<span class="l1"><b>' + title + '</b><b class="pr">' + esc(line) + '</b></span><small>' + esc(sub) + '</small></button>';
  }
  function fine(trial) {
    if (sel === "lifetime") return "One payment of " + price("lifetime") + ". No subscription, no renewal.";
    if (sel === "monthly") return "Monthly plan: " + price("monthly") + " per month, renews automatically until cancelled in " + storeName() + ". Cancel anytime.";
    return "Yearly plan: " + (trial ? "free for 7 days, then " : "") + price("yearly") + " per year, renews automatically until cancelled in " + storeName() + ". Cancel anytime" + (trial ? ", including during the trial, and you will not be charged" : "") + ".";
  }
  function storeName() { return platform === "ios" ? "the App Store" : "Google Play"; }
  function busy(b) { working = b; draw(); }

  function openPaywall(opts) {
    opts = opts || {};
    if (active()) { toast("You already have Plus. Thank you."); return; }
    onClose = opts.onClose || null; sel = "yearly"; working = false;
    draw(); pw.classList.remove("canclose"); pw.classList.add("open");
    pw.scrollTop = 0;
    clearTimeout(closeTimer); closeTimer = setTimeout(function () { pw.classList.add("canclose"); }, 3000);
    try { const seen = store.get("pwSeen", 0); store.set("pwSeen", seen + 1); } catch (e) {}
  }
  function closePaywall() {
    pw.classList.remove("open"); clearTimeout(closeTimer);
    const cb = onClose; onClose = null; refresh();
    if (cb) cb();
  }
  pw.addEventListener("click", async function (e) {
    const p = e.target.closest(".plan"); if (p) { sel = p.dataset.plan; draw(); return; }
    const id = e.target.id;
    if (id === "pwX" || id === "pwFree") closePaywall();
    else if (id === "pwRestore") { await restore(); if (active()) closePaywall(); }
    else if (id === "pwGo") { if (working) return; const ok = await purchase(sel); if (ok) closePaywall(); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && pw.classList.contains("open") && pw.classList.contains("canclose")) closePaywall(); });
  window.PlusPaywall = { open: openPaywall, close: closePaywall };

  /* ---------- Settings row ---------- */
  const panel = document.querySelector("#sheet .panel"), prof = panel && panel.querySelector(":scope > .prof");
  let row = null;
  if (panel && prof) {
    row = document.createElement("div"); row.className = "row"; row.id = "plusRow";
    panel.insertBefore(row, panel.firstElementChild.nextSibling);
    row.addEventListener("click", function (e) {
      if (e.target.id === "plusOpen") { sheet.classList.remove("open"); openPaywall({ source: "settings" }); }
      if (e.target.id === "plusRestore") restore();
    });
  }
  function refresh() {
    if (!row) return;
    const s = state();
    row.innerHTML = '<span>Pray with Me Plus</span><span class="prof">' + (s.on
      ? '<span class="on">' + (s.trial ? "Free trial" : "Active") + ' ✓</span>'
      : '<button id="plusOpen" type="button">Learn more</button>' + (native ? '<button id="plusRestore" type="button">Restore</button>' : "")) + '</span>';
    if (document.getElementById("feed") && typeof render === "function" && !pw.classList.contains("open")) render();
  }
  refresh();
  initRC();
})();
