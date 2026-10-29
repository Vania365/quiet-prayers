/* Pray with Me: "People I pray for" + calm generated music.
   Loaded after personal.js. Everything stays on the device. */
(function () {
  "use strict";

  /* ======================= PEOPLE I PRAY FOR ======================= */
  const KINDS = [
    ["child", "My child"], ["grandchild", "My grandchild"], ["spouse", "My husband or wife"],
    ["parent", "My mother or father"], ["friend", "A friend or relative"], ["sick", "Someone who is unwell"],
    ["pet", "My dog or cat"], ["memory", "Someone I remember"]
  ];
  const KIND_LABEL = {}; KINDS.forEach(function (k) { KIND_LABEL[k[0]] = k[1]; });

  const T = {
    child: [
      { v: "bless", x: "Lord, I place {n} in Your hands today. Keep {n} safe, guard {n}'s heart, and give {n} courage for whatever the day brings. Help me love {n} with patience, and let {n} always know they are loved." },
      { v: "train", x: "Father, thank You for {n}. Where {n} is afraid, give peace. Where {n} is tempted, give strength. Bring good friends and wise guides into {n}'s life, and bring {n} safely home." },
      { v: "heritage", x: "God, You know {n} better than I do. Finish what You have begun in {n}. Give me the right words when I speak, and the wisdom to be quiet when I should be listening." }
    ],
    grandchild: [
      { v: "heritage", x: "Lord, bless {n}. Let {n} grow up knowing that someone prayed for them every day. Give {n} a kind heart, a curious mind, and the courage to do what is right." },
      { v: "bless", x: "Father, thank You for the gift of {n}. Keep {n} healthy and happy. Let me be a steady, loving presence in {n}'s life, with time to listen and a lap and a laugh to share." }
    ],
    spouse: [
      { v: "bless", x: "Father, bless {n}, the one beside me. Give {n} health, joy and rest. Where we have grown tired, renew us. Let me love {n} better today than I did yesterday." },
      { v: "peace", x: "Lord, thank You for {n}. Forgive me for the times I have been short or distracted. Make our home a place of peace, and keep us kind to each other in the small things." }
    ],
    parent: [
      { v: "hills", x: "Lord, look after {n}, who gave me so much. Give {n} comfort, health and good company. Give me the patience and the time to care for {n} well, and the grace to say what needs to be said." },
      { v: "shepherd", x: "Father, {n} is getting older, and I feel it. Walk beside {n} through every day. Help me not to wait for a better moment to show how much {n} matters to me." }
    ],
    friend: [
      { v: "shepherd", x: "God, thank You for {n}. Be near to {n} today. Give {n} what is needed, and show me how to be a good friend: to listen, to call, and to show up." },
      { v: "bless", x: "Lord, I bring {n} before You. You know what {n} is carrying that I do not see. Lift it. Give {n} a reason to smile today, and let me be part of it." }
    ],
    sick: [
      { v: "heal", x: "Lord, I bring {n} to You, because I cannot fix what is wrong. Ease the pain. Give wisdom to those who care for {n}, strength for the days ahead, and peace in the waiting." },
      { v: "fear", x: "Father, {n} is unwell, and I am afraid. Be close to {n} in every long hour. Let {n} feel loved and not alone, and give me a calm and loving presence for {n}." }
    ],
    pet: [
      { v: "beast", x: "Father, thank You for {n}, who brings so much joy into my days. Keep {n} healthy and free from pain, and let {n} feel safe and loved today. Help me never to take a single day for granted." },
      { v: "preserve", x: "Lord, thank You for {n}, a faithful friend who is glad every time I come home. Watch over {n}. Give me patience and tenderness, and make me a person {n} deserves." }
    ],
    memory: [
      { v: "tears", x: "Lord, I remember {n} today with love. Thank You for the years I was given. I entrust {n} to Your care, and I ask You to hold me in my missing." },
      { v: "joy", x: "Father, some days I miss {n} so much it hurts, and some days I smile because of them. Thank You for both. Let the memory of {n} be a blessing and not only a sorrow." }
    ]
  };
  const GENERIC = [{ v: "peace", x: "Lord, I bring {n} before You today. You know what {n} needs better than I do. Give {n} peace, protection and strength, and let {n} feel that someone is praying." }];

  const dstr = function (d) { d = d || new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); };
  const loadP = function () { return store.get("people", []); };
  const saveP = function (a) { store.set("people", a); };

  function prayerFor(p) {
    const arr = T[p.kind] || GENERIC;
    const idx = (Math.floor(Date.now() / 864e5) + p.seed) % arr.length;
    return arr[idx];
  }
  const nameFill = function (s, n) { return s.replace(/\{n\}/g, n); };

  /* ---- css ---- */
  const css = document.createElement("style");
  css.textContent =
    ".ppl{max-width:34rem;margin:0 auto;padding:28px 20px 120px}" +
    ".ppl h2{margin:0 0 6px;font-size:1.5rem;color:var(--accent)}" +
    ".ppl .sub{color:var(--muted);line-height:1.5;margin:0 0 18px}" +
    ".ppl form{display:flex;flex-direction:column;gap:10px;margin-bottom:22px}" +
    ".ppl input,.ppl select{font:inherit;font-size:1.1rem;padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--bg2);color:var(--ink);width:100%}" +
    ".ppl .btn{font:inherit;font-size:1.05rem;padding:13px 20px;border-radius:999px;border:1px solid var(--line);background:var(--bg2);color:var(--ink);min-height:48px;cursor:pointer}" +
    ".ppl .btn.go{background:var(--accent);color:#1b1405;border-color:var(--accent);font-weight:bold}" +
    ".pc{border:1px solid var(--line);background:var(--bg2);border-radius:14px;padding:14px 14px 14px 16px;margin-bottom:12px;display:flex;align-items:center;gap:10px}" +
    ".pc .info{flex:1;min-width:0}.pc b{font-size:1.2rem;display:block;overflow-wrap:anywhere}" +
    ".pc .k{color:var(--muted);font-size:.85rem;display:block;margin-top:2px}" +
    ".pc .c{color:var(--accent);font-size:.85rem;display:block;margin-top:2px}" +
    ".pc .pbtn{font:inherit;padding:10px 14px;border-radius:999px;border:1px solid var(--accent);background:transparent;color:var(--accent);min-height:44px;cursor:pointer}" +
    ".pc .pbtn.done{background:var(--accent);color:#1b1405}" +
    ".pc .x{background:none;border:0;color:var(--muted);font-size:1.1rem;min-width:44px;min-height:44px;cursor:pointer}" +
    ".ppl .note{color:var(--muted);font-size:.8rem;margin-top:16px;line-height:1.5}" +
    "#pr{position:fixed;inset:0;z-index:30;background:var(--bg);display:none;flex-direction:column;align-items:center;justify-content:center;padding:24px;overflow-y:auto;text-align:center}" +
    "#pr.open{display:flex}#pr .box{width:100%;max-width:32rem}" +
    "#pr .mark{width:50px;height:50px;color:var(--accent);margin:0 auto 12px;display:block}" +
    "#pr h2{color:var(--accent);margin:0 0 14px;font-size:1.2rem}" +
    "#pr .t{font-size:var(--fs);line-height:1.6;margin:0}" +
    "#pr .v{margin-top:22px;font-style:italic;color:var(--muted);font-size:calc(var(--fs)*.72);line-height:1.5}" +
    "#pr .row2{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:26px}" +
    "#musicBtn{font-size:1.4rem}#musicBtn[aria-pressed=true]{color:var(--accent)}" +
    ".mrow input[type=range]{width:120px;accent-color:var(--accent)}";
  document.head.appendChild(css);

  /* ---- tab ---- */
  TABS.splice(TABS.length - 1, 0, { id: "people", label: "My people" });
  renderTabs();

  /* ---- views ---- */
  function peopleHtml() {
    const arr = loadP(), today = dstr();
    const opts = KINDS.map(function (k) { return '<option value="' + k[0] + '">' + k[1] + '</option>'; }).join("");
    const rows = arr.map(function (p) {
      const done = p.last === today;
      return '<div class="pc" data-id="' + p.id + '"><div class="info"><b>' + esc(p.name) + '</b><span class="k">' + esc(KIND_LABEL[p.kind] || "") + '</span>' +
        '<span class="c">' + (p.count ? "Prayed for " + p.count + (p.count === 1 ? " time" : " times") : "Not prayed for yet") + (done ? " · today ✓" : "") + '</span></div>' +
        '<button class="pbtn' + (done ? " done" : "") + '" data-a="pray">' + (done ? "Prayed ✓" : "Pray") + '</button>' +
        '<button class="x" data-a="del" aria-label="Remove ' + esc(p.name) + '">✕</button></div>';
    }).join("");
    return '<div class="ppl"><h2>People I pray for</h2>' +
      '<p class="sub">Add the people, and the pets, you want to remember. Each day, tap Pray to read a prayer written for them by name.</p>' +
      '<form id="addp"><input type="text" id="pn" maxlength="30" placeholder="Name (for example, Emma)" aria-label="Name" autocomplete="off">' +
      '<select id="pk" aria-label="Who is this?">' + opts + '</select><button class="btn go" type="submit">Add to my list</button></form>' +
      (rows || '<p class="sub">Your list is empty. Add the first person above.</p>') +
      '<p class="note">Names stay on this device. Nothing is sent anywhere.</p></div>';
  }

  const baseRender = window.render;
  window.render = function () {
    if (tab === "people") { feed.innerHTML = peopleHtml(); feed.scrollTop = 0; return; }
    baseRender();
  };
  render();

  /* ---- prayer overlay ---- */
  const pr = document.createElement("div");
  pr.id = "pr"; pr.setAttribute("role", "dialog"); pr.setAttribute("aria-modal", "true"); pr.setAttribute("aria-label", "Prayer");
  document.body.appendChild(pr);
  let openId = null;

  function openPrayer(id) {
    const arr = loadP(), p = arr.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    openId = id;
    const t = prayerFor(p), vs = V[t.v], done = p.last === dstr();
    const hands = window.QuietHands || "";
    pr.innerHTML = '<div class="box">' + (hands ? hands.replace('class="mark"', 'class="mark"') : "") +
      '<h2>A prayer for ' + esc(p.name) + '</h2><p class="t">' + esc(nameFill(t.x, p.name)) + '</p>' +
      '<p class="v">“' + esc(vs.t) + '”<br>' + esc(vs.ref) + ' (KJV)</p>' +
      '<div class="row2"><button class="btn go" id="prDone" ' + (done ? "disabled" : "") + ' style="padding:13px 22px;border-radius:999px;border:1px solid var(--accent);background:var(--accent);color:#1b1405;font:inherit;font-weight:bold;min-height:48px;cursor:pointer">' + (done ? "Prayed today ✓" : "I prayed today") + '</button>' +
      '<button class="btn" id="prClose" style="padding:13px 22px;border-radius:999px;border:1px solid var(--line);background:var(--bg2);color:var(--ink);font:inherit;min-height:48px;cursor:pointer">Close</button></div></div>';
    pr.classList.add("open");
    const b = document.getElementById("prDone"); if (b && !b.disabled) b.focus();
  }
  function closePrayer() { pr.classList.remove("open"); openId = null; render(); }

  pr.addEventListener("click", function (e) {
    if (e.target.id === "prClose") closePrayer();
    else if (e.target.id === "prDone" && openId) {
      const arr = loadP(), p = arr.filter(function (x) { return x.id === openId; })[0];
      if (p && p.last !== dstr()) { p.last = dstr(); p.count = (p.count || 0) + 1; saveP(arr); toast("Amen. Prayed for " + p.name); }
      closePrayer();
    }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && pr.classList.contains("open")) closePrayer(); });

  /* ---- list interactions ---- */
  feed.addEventListener("submit", function (e) {
    if (e.target.id !== "addp") return;
    e.preventDefault();
    const n = document.getElementById("pn").value.trim().replace(/\s+/g, " "), k = document.getElementById("pk").value;
    if (!n) { toast("Please type a name"); return; }
    const arr = loadP();
    if (arr.length >= 30) { toast("The list is full (30 people)"); return; }
    arr.push({ id: "p" + Date.now().toString(36), name: n, kind: k, seed: Math.floor(Math.random() * 1000), count: 0, last: "" });
    saveP(arr); render(); toast(n + " added");
  });
  feed.addEventListener("click", function (e) {
    const b = e.target.closest("button[data-a]"); if (!b) return;
    const id = b.closest(".pc").dataset.id;
    if (b.dataset.a === "pray") openPrayer(id);
    else if (b.dataset.a === "del") {
      const arr = loadP(), p = arr.filter(function (x) { return x.id === id; })[0];
      if (p && confirm("Remove " + p.name + " from your list?")) { saveP(arr.filter(function (x) { return x.id !== id; })); render(); }
    }
  });

  /* ======================= CALM MUSIC (generated, no files) ======================= */
  const Music = (function () {
    let ctx = null, master = null, verb = null, chordTimer = null, bellTimer = null, on = false, step = 0, vol = store.get("vol", 0.5);
    const CH = [[146.83, 220.00, 293.66, 369.99], [123.47, 185.00, 246.94, 293.66], [196.00, 246.94, 293.66, 392.00], [110.00, 164.81, 220.00, 277.18]];
    const BELL = [587.33, 659.25, 739.99, 880.00, 987.77];

    function reverb(c) {
      const len = Math.floor(c.sampleRate * 3.5), buf = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
      const conv = c.createConvolver(); conv.buffer = buf; return conv;
    }
    function init() {
      if (ctx) return true;
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
      ctx = new AC(); master = ctx.createGain(); master.gain.value = 0;
      verb = reverb(ctx); const wet = ctx.createGain(); wet.gain.value = 0.6; verb.connect(wet); wet.connect(master); master.connect(ctx.destination);
      return true;
    }
    function chord() {
      const t = ctx.currentTime, f = CH[step++ % CH.length];
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900;
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.16, t + 3.5); g.gain.setValueAtTime(0.16, t + 7); g.gain.linearRampToValueAtTime(0, t + 11);
      lp.connect(g); g.connect(master); g.connect(verb);
      f.forEach(function (hz) {
        [0, 1].forEach(function (k) {
          const o = ctx.createOscillator(); o.type = k ? "triangle" : "sine"; o.frequency.value = hz * (k ? 1.002 : 1); o.detune.value = (Math.random() - 0.5) * 8;
          const og = ctx.createGain(); og.gain.value = k ? 0.04 : 0.12; o.connect(og); og.connect(lp); o.start(t); o.stop(t + 11.2);
        });
      });
    }
    function bell() {
      if (!on) return;
      const t = ctx.currentTime, o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = BELL[Math.floor(Math.random() * BELL.length)];
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.05, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0008, t + 5);
      o.connect(g); g.connect(master); g.connect(verb); o.start(t); o.stop(t + 5.2);
      bellTimer = setTimeout(bell, 6000 + Math.random() * 8000);
    }
    function start() {
      if (!init()) return false;
      ctx.resume(); const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t); master.gain.linearRampToValueAtTime(vol * 0.9, t + 3);
      on = true; chord(); chordTimer = setInterval(chord, 8000); bellTimer = setTimeout(bell, 4000);
      store.set("music", true); return true;
    }
    function stop() {
      if (!ctx) { store.set("music", false); on = false; return; }
      const t = ctx.currentTime; master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t); master.gain.linearRampToValueAtTime(0, t + 1.5);
      on = false; clearInterval(chordTimer); clearTimeout(bellTimer); store.set("music", false);
      setTimeout(function () { if (!on && ctx) ctx.suspend(); }, 1800);
    }
    function setVol(v) { vol = v; store.set("vol", v); if (ctx && on) master.gain.linearRampToValueAtTime(v * 0.9, ctx.currentTime + 0.3); }
    document.addEventListener("visibilitychange", function () { if (!ctx || !on) return; if (document.hidden) ctx.suspend(); else ctx.resume(); });
    return { start: start, stop: stop, setVol: setVol, isOn: function () { return on; }, vol: function () { return vol; }, state: function () { return ctx ? ctx.state : "none"; } };
  })();
  window.QuietMusic = Music;

  // header button
  const top = document.querySelector("header .top > span:last-child");
  const mb = document.createElement("button");
  mb.className = "iconbtn"; mb.id = "musicBtn"; mb.setAttribute("aria-label", "Calm music"); mb.setAttribute("aria-pressed", "false"); mb.textContent = "♪";
  if (top) top.insertBefore(mb, document.getElementById("openSettings"));
  function syncMusicUi() {
    mb.setAttribute("aria-pressed", String(Music.isOn()));
    mb.title = Music.isOn() ? "Music on" : "Music off";
    const seg = document.querySelectorAll("#musicSeg button");
    seg.forEach(function (b) { b.setAttribute("aria-pressed", String((b.dataset.m === "on") === Music.isOn())); });
  }
  mb.addEventListener("click", function () { if (Music.isOn()) Music.stop(); else if (!Music.start()) toast("Music is not supported here"); syncMusicUi(); toast(Music.isOn() ? "Calm music on" : "Music off"); });

  // settings row
  const panel = document.querySelector("#sheet .panel"), prof = panel && panel.querySelector(":scope > .prof");
  if (panel && prof) {
    const row = document.createElement("div");
    row.className = "row mrow";
    row.innerHTML = '<span>Calm music</span><span style="display:flex;align-items:center;gap:10px"><span class="seg" id="musicSeg"><button data-m="off" aria-pressed="true">Off</button><button data-m="on" aria-pressed="false">On</button></span>' +
      '<input type="range" id="vol" min="0.1" max="1" step="0.05" value="' + Music.vol() + '" aria-label="Music volume"></span>';
    panel.insertBefore(row, prof);
    document.getElementById("musicSeg").addEventListener("click", function (e) {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.m === "on") Music.start(); else Music.stop(); syncMusicUi();
    });
    document.getElementById("vol").addEventListener("input", function (e) { Music.setVol(parseFloat(e.target.value)); });
  }
  syncMusicUi();

  // remembered preference: browsers need one tap before sound can start
  if (store.get("music", false)) {
    const once = function () { document.removeEventListener("pointerdown", once); if (!Music.isOn()) { Music.start(); syncMusicUi(); } };
    document.addEventListener("pointerdown", once);
  }

  // erase-all should also forget people and music
  const erase = document.getElementById("eraseAll");
  if (erase) erase.addEventListener("click", function () { setTimeout(function () { try { localStorage.removeItem("people"); localStorage.removeItem("music"); localStorage.removeItem("vol"); } catch (e) {} }, 0); });
})();
