/* Pray with Me: "Arthur prays your name" (Plus). A card at the end of the For you feed:
   the user adds a name, it is sent to Arthur (NAMES_ENDPOINT, or an email to SUPPORT_EMAIL),
   and Arthur reads the names in his evening prayer video. */
(function () {
  "use strict";
  const CFG = window.PLUS_CONFIG || {};
  const css = document.createElement("style");
  css.textContent =
    ".card.names .text{font-size:calc(var(--fs) * .8)}" +
    ".card.names form{width:100%;max-width:26rem;margin:18px auto 0;display:flex;flex-direction:column;gap:10px;order:5}" +
    ".card.names input,.card.names select{width:100%;font:inherit;font-size:1.1rem;padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--bg2);color:var(--ink)}" +
    ".card.names button{font:inherit;font-size:1.05rem;font-weight:bold;padding:14px 22px;border-radius:999px;border:0;background:var(--accent);color:#1b1405;min-height:50px;cursor:pointer}" +
    ".card.names .sent{color:var(--muted);font-size:.9rem;margin:6px 0 0}";
  document.head.appendChild(css);

  function sentList() { return store.get("namesSent", []); }
  function plus() { return !!(window.Plus && window.Plus.active()); }

  function card() {
    const pr = store.get("profile", null), sent = sentList();
    const s = document.createElement("section");
    s.className = "card names";
    s.innerHTML = (window.QuietHands || "") +
      '<div class="tag">Arthur prays your name</div>' +
      '<h2 class="title">Let Arthur pray for you by name</h2>' +
      '<p class="text">Every evening Arthur reads, by name, the people who ask him to pray for them. Add your name, or the name of someone you love, and he will carry it into his evening prayer this week.</p>' +
      '<form id="namesForm" autocomplete="off">' +
      '<input type="text" name="name" maxlength="40" placeholder="Name" aria-label="Name to pray for" required value="' + (pr && pr.name && !sent.length ? esc(pr.name) : "") + '">' +
      '<select name="forWhom" aria-label="Who is this for?"><option value="me">This is me</option><option value="loved">Someone I love</option><option value="memory">Someone I am remembering</option><option value="pet">My pet</option></select>' +
      '<input type="text" name="note" maxlength="80" placeholder="One line, if you like (optional)" aria-label="A short note">' +
      '<button type="submit">' + (plus() ? "Send to Arthur" : "Send to Arthur (Plus)") + '</button>' +
      (sent.length ? '<p class="sent">Sent: ' + esc(sent.slice(-3).map(function (x) { return x.name; }).join(", ")) + '</p>' : "") +
      '</form>' +
      '<div class="foot"><b>Pray with Me</b><span>One prayer at a time</span></div>';
    return s;
  }

  async function send(data) {
    const from = (store.get("profile", null) || {}).name || "";
    const body = { name: data.name, forWhom: data.forWhom, note: data.note, from: from, ts: new Date().toISOString(), app: "pray-with-me" };
    if (CFG.NAMES_ENDPOINT) {
      try {
        const r = await fetch(CFG.NAMES_ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(body) });
        return true;
      } catch (e) { /* fall through to email */ }
    }
    const subject = "Please pray for " + data.name;
    const text = "Name: " + data.name + "\nFor: " + data.forWhom + (data.note ? "\nNote: " + data.note : "") + (from ? "\nFrom: " + from : "") + "\n\n(sent from the Pray with Me app)";
    try { location.href = "mailto:" + (CFG.SUPPORT_EMAIL || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text); return true; } catch (e) { return false; }
  }

  feed.addEventListener("submit", async function (e) {
    const f = e.target.closest("#namesForm"); if (!f) return;
    e.preventDefault();
    if (!plus()) { if (window.PlusPaywall) window.PlusPaywall.open({ source: "names" }); return; }
    const data = { name: f.name.value.trim(), forWhom: f.forWhom.value, note: f.note.value.trim() };
    if (!data.name) return;
    const btn = f.querySelector("button"); btn.disabled = true; btn.textContent = "Sending…";
    const ok = await send(data);
    if (ok) {
      const list = sentList(); list.push({ name: data.name, ts: Date.now() }); store.set("namesSent", list.slice(-10));
      toast("Sent. Arthur will pray for " + data.name + " this week.");
      render();
    } else { btn.disabled = false; btn.textContent = "Send to Arthur"; toast("Could not send right now"); }
  });

  const base = window.render;
  window.render = function () {
    base();
    if (tab !== "today" || !document.querySelector("#feed .card[data-id]")) return;
    const gn = feed.querySelector(".gnote"), lock = feed.querySelector(".card.lock");
    const c = card();
    if (gn) feed.insertBefore(c, gn); else if (lock) feed.insertBefore(c, lock); else feed.appendChild(c);
  };
  render();
})();
