/* Quiet Prayers: native app bridge (Capacitor). Does nothing on the plain website.
   1) keeps a safe copy of the user's data in native storage (browser storage inside apps can be purged)
   2) daily reminder (local notification, no server)
   3) status bar colour */
(function () {
  "use strict";
  const C = window.Capacitor;
  const native = !!(C && C.isNativePlatform && C.isNativePlatform());
  if (!native) return;
  const P = C.Plugins || {};

  /* ---------- 1) safe copy of data ---------- */
  const KEY = "qp_backup";
  function dump() {
    const o = {};
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); o[k] = localStorage.getItem(k); } } catch (e) {}
    return JSON.stringify(o);
  }
  let t = null;
  function saveSoon() {
    clearTimeout(t);
    t = setTimeout(function () { try { P.Preferences && P.Preferences.set({ key: KEY, value: dump() }); } catch (e) {} }, 500);
  }
  const origSet = store.set;
  store.set = function (k, v) { origSet.call(store, k, v); saveSoon(); };

  (async function restore() {
    try {
      if (!P.Preferences) return;
      const empty = !localStorage.getItem("profile") && !localStorage.getItem("people") && !localStorage.getItem("saved");
      if (!empty || sessionStorage.getItem("qp_restored")) { saveSoon(); return; }
      const r = await P.Preferences.get({ key: KEY });
      if (r && r.value) {
        const o = JSON.parse(r.value); let n = 0;
        Object.keys(o).forEach(function (k) { try { localStorage.setItem(k, o[k]); n++; } catch (e) {} });
        if (n) { sessionStorage.setItem("qp_restored", "1"); location.reload(); }
      }
    } catch (e) {}
  })();

  /* ---------- 2) daily reminder ---------- */
  const LN = P.LocalNotifications;
  const REM_ID = 1;
  const getRem = function () { return store.get("reminder", { on: false, time: "08:00" }); };

  async function schedule() {
    if (!LN) return false;
    const rem = getRem();
    try { await LN.cancel({ notifications: [{ id: REM_ID }] }); } catch (e) {}
    if (!rem.on) return true;
    try {
      const perm = await LN.requestPermissions();
      if (!perm || perm.display !== "granted") { toast("Please allow notifications in your phone settings"); return false; }
      const parts = String(rem.time || "08:00").split(":"), hour = parseInt(parts[0], 10) || 8, minute = parseInt(parts[1], 10) || 0;
      const pr = store.get("profile", null), name = pr && pr.name ? pr.name + ", your" : "Your";
      await LN.schedule({ notifications: [{
        id: REM_ID, title: "Quiet Prayers",
        body: name + " quiet moment is ready. One prayer, just for today.",
        schedule: { on: { hour: hour, minute: minute }, allowWhileIdle: true }
      }] });
      return true;
    } catch (e) { return false; }
  }

  const panel = document.querySelector("#sheet .panel"), prof = panel && panel.querySelector(":scope > .prof");
  if (panel && prof && LN) {
    const row = document.createElement("div"); row.className = "row";
    row.innerHTML = '<span>Daily reminder</span><span style="display:flex;align-items:center;gap:10px">' +
      '<span class="seg" id="remSeg"><button data-r="off" aria-pressed="true">Off</button><button data-r="on" aria-pressed="false">On</button></span>' +
      '<input type="time" id="remTime" aria-label="Reminder time" style="font:inherit;font-size:1.05rem;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--bg2);color:var(--ink)"></span>';
    panel.insertBefore(row, prof);
    const sync = function () {
      const rem = getRem();
      document.querySelectorAll("#remSeg button").forEach(function (b) { b.setAttribute("aria-pressed", String((b.dataset.r === "on") === !!rem.on)); });
      document.getElementById("remTime").value = rem.time || "08:00";
    };
    sync();
    document.getElementById("remSeg").addEventListener("click", async function (e) {
      const b = e.target.closest("button"); if (!b) return;
      const rem = getRem(); rem.on = b.dataset.r === "on"; store.set("reminder", rem);
      const ok = await schedule(); if (!ok && rem.on) { rem.on = false; store.set("reminder", rem); }
      sync(); toast(getRem().on ? "Reminder set" : "Reminder off");
    });
    document.getElementById("remTime").addEventListener("change", async function (e) {
      const rem = getRem(); rem.time = e.target.value || "08:00"; store.set("reminder", rem);
      if (rem.on) { await schedule(); toast("Reminder time saved"); }
    });
  }
  schedule(); // refresh the text (name) and keep it scheduled after updates

  /* ---------- 3) status bar ---------- */
  try {
    if (P.StatusBar) { P.StatusBar.setStyle({ style: "DARK" }); P.StatusBar.setBackgroundColor && P.StatusBar.setBackgroundColor({ color: "#0b1424" }); }
  } catch (e) {}
})();
