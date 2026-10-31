/* Pray with Me: personal questionnaire + personalised feed.
   Loaded after the main script. Everything stays on the device (localStorage). */
(function () {
  "use strict";

  /* ---------- extra prayers (themes in th) ---------- */
  const NEW = [
    // missing someone
    {c:"grief",ti:"For the one I miss most",x:"Lord, I miss {lost} more than I can say. The house, the routine, the empty chair: everything is a reminder. Thank You for the years I was given. Hold the love that has nowhere to go tonight, and let me feel that I am not carrying this alone.",v:"broken",th:["lost_spouse"]},
    {c:"grief",ti:"The empty side of the bed",x:"God, the nights are the hardest. I turn over, and no one is there. I do not ask You to take the missing away, because it is part of the love. I ask You to be near in the dark, and to let me rest.",v:"sleep",th:["lost_spouse","sleep"]},
    {c:"grief",ti:"When I want to tell someone",x:"Father, something happened today, and my first thought was to tell {lost}. I still reach for the phone, or turn to say it out loud. Carry my words to where I cannot. And thank You for the years when I had someone to tell.",v:"tears",th:["lost_spouse","lost_friend"]},
    {c:"grief",ti:"The first holiday without them",x:"Lord, the holidays are loud with everyone else's happiness. This year there is a place missing at the table. Give me gentle company, grace for the tears, and a quiet moment of thanks for the good years.",v:"joy",th:["lost_spouse","lost_parent","lost_child"]},
    {c:"grief",ti:"A parent's heart",x:"Father, there is no order to this. A parent should never have to say goodbye to a child. I will not pretend to understand. I entrust {lost} to You, and I ask You to hold me, because I cannot hold myself together right now.",v:"broken",th:["lost_child"]},
    {c:"grief",ti:"On the days I cannot speak",x:"Lord, some days I have no words, only an ache. You know it anyway. Sit with me in the silence. Keep the memory of {lost} bright, and give me strength for the next small thing.",v:"heal",th:["lost_child"]},
    {c:"grief",ti:"For a parent who is gone",x:"God, thank You for the parent who raised me, with all their strengths and flaws. I hear their voice in my own sometimes, and I am grateful for it. I entrust {lost} to Your care, and I ask You to help me carry what they taught me.",v:"good",th:["lost_parent"]},
    {c:"grief",ti:"A child at any age",x:"Lord, no matter how old I am, I feel like a child tonight. The one who always knew what to say is gone. Be my Father now. Comfort me, and help me become, for someone else, the steady presence I was given.",v:"shepherd",th:["lost_parent"]},
    {c:"grief",ti:"For a friend I lost",x:"Father, thank You for {lost}, for every laugh and every long talk. Part of my life went with them, and I am learning to live around the gap. Keep the memory a blessing, and keep me from being alone in this.",v:"broken",th:["lost_friend"]},
    {c:"grief",ti:"For the friend who waited at the door",x:"Lord, thank You for {lost}. They were faithful in every season, and loved me without conditions. The quiet is hard. Comfort me, and let me remember them with gratitude and not only with pain.",v:"preserve",th:["lost_pet"]},
    {c:"grief",ti:"Learning the walk again",x:"God, the walk is not the same, and neither is the evening. Give me gentleness with myself. I loved well, and that is nothing to regret. When the time is right, help me find room to love again.",v:"heal",th:["lost_pet"]},
    // lonely
    {c:"peace",ti:"When no one calls",x:"Lord, the phone is quiet. I try to remember that quiet is not the same as forgotten. You see me. Bring one kind person into my day, and give me the courage to reach out first.",v:"shepherd",th:["lonely"]},
    {c:"peace",ti:"Company in the evening",x:"Father, evenings are long when you live alone. Be the presence in the room. Help me fill the hours with small, good things: a meal, a song, a letter, a prayer. Let me not feel invisible.",v:"hills",th:["lonely"]},
    // anxiety
    {c:"peace",ti:"When the mind will not stop",x:"God, my thoughts are running ahead of me, building fears that have not happened. Bring me back to this breath, this room, this hour. Show me what I need to do today, and help me leave the rest with You.",v:"careful",th:["anxiety"]},
    {c:"peace",ti:"Facing the unknown",x:"Lord, there is a test, a decision, a result coming, and I am afraid. I will do what is in my hands, and I give You what is not. Whatever the answer is, walk through it with me.",v:"fear",th:["anxiety","health"]},
    // health
    {c:"peace",ti:"For my body",x:"Father, my body is not as strong as it was. Thank You for what still works. Give me patience with the pain, wisdom for the doctors' advice, and peace on the slow days.",v:"heal",th:["health"]},
    {c:"peace",ti:"For someone I love who is sick",x:"Lord, I cannot fix this, and it breaks my heart. Be with the one who is ill. Steady the hands of those who care for them. Let me be a calm and loving presence, even when I am afraid.",v:"fear",th:["health","caregiver"]},
    // family
    {c:"family",ti:"For a hard conversation",x:"God, there is something I need to say to someone I love, and I am afraid of how it will land. Give me honest words and a gentle tone. Let me listen as well as I speak.",v:"peace",th:["family"]},
    {c:"family",ti:"For the ones who are far",x:"Lord, my family is scattered, and I do not hear from them as often as I would like. Look after each of them. Soften the pride that keeps us apart, and bring us together again, even for a short while.",v:"bless",th:["family","lonely"]},
    // money
    {c:"peace",ti:"When the bills are heavy",x:"Father, the numbers do not add up this month, and I carry it into every night. Give me clarity about what to do, and humility to ask for help. Provide what I need, and keep fear from making my decisions.",v:"bread",th:["money"]},
    {c:"peace",ti:"Enough for today",x:"Lord, teach me to be thankful for what I have and not to be ruled by what I lack. Give me enough for today, and a generous heart in whatever I have.",v:"thanks",th:["money","gratitude"]},
    // caregiver
    {c:"peace",ti:"For the one who cares",x:"God, I am tired. Caring for someone I love has taken everything I have. Give me rest I can actually use, patience on the long days, and kind people who offer help. Let me not lose myself.",v:"rest",th:["caregiver"]},
    // faith
    {c:"peace",ti:"When God feels far away",x:"Lord, I will be honest: I do not feel You right now. My prayers feel like they hit the ceiling. I am not leaving, though. Meet me in the silence, and be patient with my doubts.",v:"still",th:["faith"]},
    {c:"peace",ti:"A small step of faith",x:"Father, I cannot see far ahead, but I can see the next step. Help me take it. I trust You with the path, even when I do not understand it.",v:"trust",th:["faith","anxiety"]},
    // gratitude
    {c:"peace",ti:"What I still have",x:"Lord, on a day when it is easy to count the losses, help me count the gifts: a morning, a friend, a cup of coffee, a memory that still makes me smile. Thank You for all of it.",v:"good",th:["gratitude"]},
    {c:"peace",ti:"Peace for this day",x:"God, I ask for nothing big today, only peace. Peace in my home, peace in my mind, peace with the people in my life. Let me go through the day like someone who is carried.",v:"peace",th:["gratitude","anxiety"]}
  ];
  NEW.forEach(function (p) { P.push(p); });

  // themes for the prayers written earlier
  const OLD = {
    "For anxious days":["anxiety"], "For courage":["anxiety"], "For the weary":["caregiver","anxiety"],
    "For health":["health"], "For the lonely":["lonely"], "A prayer of thanks":["gratitude"],
    "For the years I have left":["gratitude","faith"], "In an uncertain world":["anxiety"],
    "For a restful night":["sleep"], "For the sleepless":["sleep","anxiety"], "Under Your shelter":["sleep"],
    "At the end of the day":["gratitude"],
    "For my child":["family"], "For a child who is far away":["family"], "For a grandchild":["family"],
    "For my spouse":["family"], "For a family at odds":["family"],
    "For my dog":["pet"], "For an old dog":["pet"], "When a pet is sick":["pet"],
    "When you miss someone":["lost_spouse","lost_parent","lost_friend","lost_child"],
    "For a quiet house":["lost_pet"], "On a hard anniversary":["lost_spouse","lost_child","lost_parent"],
    "After losing a pet":["lost_pet"]
  };
  P.forEach(function (p) { if (!p.th) p.th = OLD[p.ti] || []; });

  /* ---------- profile ---------- */
  const AGE = ["Under 40", "40-59", "60-74", "75 or older"];
  const LOST = [["spouse","My husband or wife"],["child","My child"],["parent","My mother or father"],["friend","A friend or sibling"],["pet","A pet"]];
  const LIFE = [["family","Family I see or call"],["pet","A dog or cat"],["lonely","I mostly live on my own"]];
  const HARD = [["grief","Missing someone I lost"],["lonely","Loneliness"],["anxiety","Worry and anxiety"],["health","My health, or a loved one's"],["sleep","Trouble sleeping"],["family","Tension in my family"],["money","Money worries"],["caregiver","Caring for someone"],["pet","My dog or cat"],["faith","Feeling far from God"],["gratitude","I just want daily peace and thanks"]];

  const profile = function () { return store.get("profile", null); };
  // {lost} = the name of the person being remembered: the one whose relation fits the prayer, else the first name given
  function lostFor(p, pr) {
    if (!pr) return "them";
    const rem = (pr.remember || []).filter(function (r) { return r.name; });
    const th = (p && p.th) || [];
    for (let i = 0; i < th.length; i++) {
      if (th[i].indexOf("lost_") === 0) {
        const rel = th[i].slice(5), hit = rem.filter(function (r) { return r.rel === rel; })[0];
        if (hit) return hit.name;
      }
    }
    if (rem.length) return rem[0].name;
    return pr.lostName || "them";
  }
  function fill(s, p) { const pr = profile(); return String(s).replace(/\{lost\}/g, lostFor(p, pr)); }
  window.fillTokens = fill;
  const tod = function () { return timeOfDay(); };
  function greeting() { const t = tod(); return t === "morning" ? "Good morning" : t === "noon" ? "Good afternoon" : "Good evening"; }

  function eligible(p, pr) {
    const th = p.th || [];
    const lostThemes = th.filter(function (t) { return t.indexOf("lost_") === 0; });
    if (!pr) return !lostThemes.length;
    if (lostThemes.length && !lostThemes.some(function (t) { return pr.lost.indexOf(t.slice(5)) >= 0; })) return false;
    if (th.indexOf("pet") >= 0 && pr.lost.indexOf("pet") >= 0 && pr.life.indexOf("pet") < 0) return false;
    if (p.c === "grief" && !lostThemes.length && !pr.lost.length && pr.struggles.indexOf("grief") < 0) return false;
    return true;
  }
  function score(p, pr) {
    if (!pr) return 0;
    let s = 0;
    (p.th || []).forEach(function (t) {
      if (t.indexOf("lost_") === 0 && pr.lost.indexOf(t.slice(5)) >= 0) s += 5;
      if (pr.struggles.indexOf(t) >= 0) s += 3;
      if (pr.life.indexOf(t) >= 0) s += 2;
    });
    if (p.c === "grief" && pr.struggles.indexOf("grief") >= 0) s += 1;
    return s;
  }

  /* ---------- feed (overrides the generic list/render) ---------- */
  window.list = function () {
    const pr = profile();
    if (tab === "saved") return P.filter(function (p) { return saved.has(idOf(p)); });
    if (tab !== "today") return P.filter(function (p) { return p.c === tab && eligible(p, pr); });
    const d = new Date(), seed = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate();
    const pool = P.filter(function (p) { return eligible(p, pr); });
    const jitter = function (p) { return ((idOf(p) * 7919 + seed) % 101) / 100; };
    const val = function (p) { return score(p, pr) + (p.c === tod() ? 1 : 0) + jitter(p) * 0.9; };
    pool.sort(function (a, b) { return val(b) - val(a); });
    if (pr) {
      const top = pool.slice(0, 6), lead = top[seed % top.length];
      const rest = pool.filter(function (p) { return p !== lead; });
      // a daily feed of 15: the most fitting prayers first, then lighter ones (not all grief on a hard day)
      const light = rest.slice(6).filter(function (p) { return p.c !== "grief"; });
      return withThanks([lead].concat(rest.slice(0, 6), light.slice(0, 8)).slice(0, 15), pool, seed);
    }
    const first = pool.filter(function (p) { return p.c === tod(); }), lead = first[seed % first.length] || pool[0];
    return withThanks([lead].concat(pool.filter(function (p) { return p !== lead; })).slice(0, 15), pool, seed);
  };
  // one thank-you a day: the second card of "For you" is always a short prayer of thanks (a different one each day),
  // so even a feed built around grief or worry has one quiet moment of gratitude near the top
  function withThanks(feedList, pool, seed) {
    const th = pool.filter(function (p) { return p.c === "thanks"; });
    if (!th.length || feedList.length < 2) return feedList;
    const pick = th[seed % th.length];
    const out = feedList.filter(function (p) { return p !== pick; });
    out.splice(1, 0, pick);
    return out.slice(0, 15);
  }

  window.payload = function (id) { const p = P[id], v = V[p.v]; return fill(p.ti, p) + "\n\n" + fill(p.x, p) + "\n\n“" + v.t + "” — " + v.ref + " (KJV)"; };

  // "hands-pray" icon: Pictogrammers Material Design Icons (Apache 2.0)
  const HANDS = '<svg class="mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.43 9.67C11.47 9.78 11.5 9.88 11.5 10V15.22C11.5 15.72 11.31 16.2 10.97 16.57L8.18 19.62L4.78 16.22L6 15L8.8 2.86C8.92 2.36 9.37 2 9.89 2C10.5 2 11 2.5 11 3.11V8.07C10.84 8.03 10.67 8 10.5 8C9.4 8 8.5 8.9 8.5 10V13C8.5 13.28 8.72 13.5 9 13.5S9.5 13.28 9.5 13V10C9.5 9.45 9.95 9 10.5 9C10.69 9 10.85 9.07 11 9.16C11.12 9.23 11.21 9.32 11.3 9.42C11.33 9.46 11.36 9.5 11.38 9.55C11.4 9.59 11.42 9.63 11.43 9.67M2 19L6 22L7.17 20.73L3.72 17.28L2 19M18 15L15.2 2.86C15.08 2.36 14.63 2 14.11 2C13.5 2 13 2.5 13 3.11V8.07C13.16 8.03 13.33 8 13.5 8C14.6 8 15.5 8.9 15.5 10V13C15.5 13.28 15.28 13.5 15 13.5S14.5 13.28 14.5 13V10C14.5 9.45 14.05 9 13.5 9C13.31 9 13.15 9.07 13 9.16C12.88 9.23 12.79 9.32 12.71 9.42C12.68 9.46 12.64 9.5 12.62 9.55C12.6 9.59 12.58 9.63 12.57 9.67C12.53 9.78 12.5 9.88 12.5 10V15.22C12.5 15.72 12.69 16.2 13.03 16.57L15.82 19.62L19.22 16.22L18 15M20.28 17.28L16.83 20.73L18 22L22 19L20.28 17.28Z"/></svg>';
  window.QuietHands = HANDS;

  window.render = function () {
    const items = list(), pr = profile();
    if (!items.length) { feed.innerHTML = '<div class="empty">Nothing here yet.<br>Tap ♡ on a prayer to keep it in Saved.</div>'; return; }
    feed.innerHTML = items.map(function (p, i) {
      const v = V[p.v], id = idOf(p), on = saved.has(id);
      const tag = (tab === "today" && i === 0)
        ? (pr && pr.name ? greeting() + ", " + pr.name : greeting())
        : TAGNAME[p.c];
      const foot = ""; // the greeting above already carries the name
      return '<section class="card" data-id="' + id + '">' + HANDS +
        '<div class="tag">' + esc(tag) + '</div>' +
        '<h2 class="title">' + esc(fill(p.ti, p)) + '</h2>' +
        '<p class="text">' + esc(fill(p.x, p)) + '</p>' +
        '<p class="verse">“' + esc(v.t) + '”<br><span class="ref">' + esc(v.ref) + ' (KJV)</span></p>' + foot +
        '<div class="actions">' +
          '<button class="' + (on ? "on" : "") + '" data-act="save" aria-label="' + (on ? "Remove from saved" : "Save") + '">' + (on ? "♥" : "♡") + '</button>' +
          '<button data-act="share" aria-label="Share">↗</button>' +
          '<button data-act="copy" aria-label="Copy">⧉</button>' +
        '</div>' + (i === 0 ? '<div class="hint">Scroll for the next prayer ↓</div>' : "") +
        '<div class="foot"><b>Pray with Me</b><span>One prayer at a time</span></div></section>';
    }).join("");
    feed.scrollTop = 0;
  };

  function refreshTabs() { TABS[0].label = profile() ? "For you" : "Today"; renderTabs(); }

  /* ---------- onboarding (v1.1: 7 screens, then the Plus screen) ---------- */
  const css = document.createElement("style");
  css.textContent =
    "#ob{position:fixed;inset:0;z-index:30;background:var(--page,var(--bg));color:var(--ink);display:none;flex-direction:column;align-items:center;justify-content:center;padding:24px;overflow-y:auto}" +
    "#ob.open{display:flex}#ob .box{width:100%;max-width:30rem;margin:auto 0}" +
    "#ob h1{font-size:1.1rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin:0 0 6px;font-weight:normal}" +
    "#ob h2{font-size:1.55rem;line-height:1.3;margin:6px 0 8px}" +
    "#ob .sub{color:var(--muted);margin:0 0 18px;line-height:1.5}" +
    "#ob .dots{display:flex;gap:6px;margin:0 0 20px}#ob .dots i{flex:1;height:4px;border-radius:2px;background:var(--line)}#ob .dots i.on{background:var(--accent)}" +
    "#ob .opts{display:flex;flex-direction:column;gap:10px}#ob .opts.row{flex-direction:row;flex-wrap:wrap}#ob .opts.row .opt{flex:1 1 40%;text-align:center;min-height:46px;padding:10px 12px;font-size:.98rem}" +
    "#ob .opt{border:1px solid var(--line);background:var(--bg2);color:var(--ink);font:inherit;font-size:1.05rem;padding:14px 16px;border-radius:12px;text-align:left;min-height:52px;cursor:pointer}" +
    "#ob .opt[aria-pressed=true]{background:var(--accent);color:#1b1405;border-color:var(--accent);font-weight:bold}" +
    "#ob .opt small{display:block;font-size:.85rem;opacity:.8;margin-top:2px}" +
    "#ob label.l{display:block;color:var(--muted);font-size:.95rem;margin:18px 0 6px}" +
    "#ob input[type=text]{width:100%;font:inherit;font-size:1.2rem;padding:14px 16px;border-radius:12px;border:1px solid var(--line);background:var(--bg2);color:var(--ink);margin-top:6px}" +
    "#ob .nav{display:flex;justify-content:space-between;align-items:center;margin-top:24px;gap:10px}" +
    "#ob .btn{font:inherit;font-size:1.05rem;padding:13px 22px;border-radius:999px;border:1px solid var(--line);background:var(--bg2);color:var(--ink);min-height:48px;cursor:pointer}" +
    "#ob .btn.go{background:var(--accent);color:#1b1405;border-color:var(--accent);font-weight:bold}#ob .btn.wide{width:100%;margin-top:12px}" +
    "#ob .link{background:none;border:0;color:var(--muted);font:inherit;text-decoration:underline;cursor:pointer;padding:12px;min-height:44px}" +
    "#ob .priv{color:var(--muted);font-size:.8rem;margin-top:18px;line-height:1.5}" +
    ".mark{width:50px;height:50px;color:var(--accent);margin:auto 0 14px;flex:0 0 auto}" +
    "#ob .rmrow{display:flex;gap:8px;align-items:center;margin-top:8px}#ob .rmrow span{flex:0 0 40%;color:var(--muted);font-size:.95rem}#ob .rmrow input{margin-top:0;flex:1;min-width:0}" +
    "#ob .note{font-size:1.15rem;line-height:1.6;margin:0 0 14px}#ob .note b{color:var(--accent)}#ob audio{width:100%;margin:6px 0 12px}" +
    "#ob .chk{list-style:none;padding:0;margin:0 0 10px}#ob .chk li{display:flex;gap:12px;align-items:center;padding:10px 0;color:var(--muted);font-size:1.05rem;transition:color .3s}" +
    "#ob .chk li i{width:26px;height:26px;border-radius:50%;border:1.5px solid var(--line);display:inline-flex;align-items:center;justify-content:center;font-style:normal;font-size:.9rem;flex:0 0 auto}" +
    "#ob .chk li.on{color:var(--ink)}#ob .chk li.on i{background:var(--accent);border-color:var(--accent);color:#1b1405}" +
    "#ob .bar{height:6px;border-radius:3px;background:var(--line);overflow:hidden;margin:4px 0 22px}#ob .bar b{display:block;height:100%;width:0;background:var(--accent);transition:width .6s ease}" +
    "#ob .ready{display:none}#ob.done .ready{display:block}#ob.done .busy{display:none}" +
    ".prof button{font:inherit;border:1px solid var(--line);background:var(--bg2);color:var(--ink);padding:10px 14px;border-radius:10px;min-height:44px;cursor:pointer;margin:4px 6px 4px 0}";
  document.head.appendChild(css);

  const ob = document.createElement("div");
  ob.id = "ob"; ob.setAttribute("role", "dialog"); ob.setAttribute("aria-modal", "true"); ob.setAttribute("aria-label", "Let us get to know you");
  document.body.appendChild(ob);

  const STEPS = ["name", "need", "lost", "when", "notify", "arthur", "build"];
  const WHEN = [["morning", "In the morning", "A prayer before the day begins"], ["evening", "In the evening", "A prayer before sleep"], ["any", "Whenever I find a quiet moment", "No set time"]];
  const TIME = { morning: "08:00", evening: "20:00", any: "20:00" };
  const HARDNAME = {}; HARD.forEach(function (o) { HARDNAME[o[0]] = o[1]; });
  let step = 0, draft = null, editing = false, buildTimer = null;

  function newDraft() {
    const p = profile();
    const d = p ? JSON.parse(JSON.stringify(p)) : { name: "", age: "", lost: [], lostName: "", life: [], struggles: [], remember: [], when: "", remind: null };
    d.names = {};
    (d.remember || []).forEach(function (r) { if (r.name && !d.names[r.rel]) d.names[r.rel] = r.name; });
    if (d.life && d.life.indexOf("pet") >= 0 && d.struggles.indexOf("pet") < 0 && d.struggles.length < 3) d.struggles.push("pet");
    return d;
  }
  function toggle(arr, v, max) { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else if (!max || arr.length < max) arr.push(v); }
  function fmtTime(t) { const p = String(t || "20:00").split(":"), h = parseInt(p[0], 10), m = p[1] || "00"; return (h % 12 || 12) + ":" + m + (h < 12 ? " am" : " pm"); }
  function remindTime() { return TIME[draft.when] || "20:00"; }

  function drawStep() {
    const id = STEPS[step], d = draft;
    const dots = '<div class="dots">' + STEPS.map(function (_, i) { return '<i class="' + (i <= step ? "on" : "") + '"></i>'; }).join("") + '</div>';
    let q = "", sub = "", body = "", nav = true;
    if (id === "name") {
      q = "What should we call you?"; sub = "Your first name makes the prayers feel like they were written for you.";
      body = '<input type="text" id="obName" autocomplete="given-name" maxlength="30" placeholder="First name (optional)" value="' + esc(d.name || "") + '">' +
        '<label class="l">How old are you? We use this to set a comfortable text size.</label>' +
        '<div class="opts row">' + AGE.map(function (a) { return '<button class="opt" data-k="age" data-v="' + a + '" aria-pressed="' + (d.age === a) + '">' + a + '</button>'; }).join("") + '</div>';
    } else if (id === "need") {
      q = "What do you most need prayer for right now?"; sub = "Pick up to three. Your daily prayers will be built around them.";
      body = '<div class="opts">' + HARD.map(function (o) { return '<button class="opt" data-k="struggles" data-v="' + o[0] + '" aria-pressed="' + (d.struggles.indexOf(o[0]) >= 0) + '">' + o[1] + '</button>'; }).join("") + '</div>';
    } else if (id === "lost") {
      q = "Are you missing someone?"; sub = "Choose anyone you are grieving. You can skip this.";
      const chosen = LOST.filter(function (o) { return d.lost.indexOf(o[0]) >= 0; }).slice(0, 3);
      body = '<div class="opts">' + LOST.map(function (o) { return '<button class="opt" data-k="lost" data-v="' + o[0] + '" aria-pressed="' + (d.lost.indexOf(o[0]) >= 0) + '">' + o[1] + '</button>'; }).join("") + '</div>' +
        (chosen.length ? '<label class="l">Would you like your prayers to speak of them by name? (optional)</label>' +
          chosen.map(function (o) { return '<div class="rmrow"><span>' + o[1] + '</span><input type="text" class="rmn" data-rel="' + o[0] + '" maxlength="30" placeholder="Name" aria-label="Name" value="' + esc(d.names[o[0]] || "") + '"></div>'; }).join("") : "");
    } else if (id === "when") {
      q = "When do you usually pray?"; sub = "We will keep your prayer ready for that time of day.";
      body = '<div class="opts">' + WHEN.map(function (o) { return '<button class="opt" data-k="when" data-v="' + o[0] + '" aria-pressed="' + (d.when === o[0]) + '">' + o[1] + '<small>' + o[2] + '</small></button>'; }).join("") + '</div>';
    } else if (id === "notify") {
      nav = false;
      q = "Shall we remind you?"; sub = "One quiet line at " + fmtTime(remindTime()) + ", nothing more. You can change the time, or turn it off, in Settings.";
      body = '<button class="btn go wide" id="obRemind">Yes, remind me at ' + fmtTime(remindTime()) + '</button>' +
        '<div class="nav"><button class="btn" id="obBack">Back</button><button class="link" id="obNoRemind">Not now</button></div>';
    } else if (id === "arthur") {
      nav = false;
      q = "A word from Arthur";
      body = '<p class="note">Hello' + (d.name ? ", " + esc(d.name) : "") + '. I am Arthur. I started writing these prayers for the people who wrote to me every evening: about a dog that had passed, a child who stopped calling, a house gone quiet.</p>' +
        '<p class="note">Every prayer here was written for someone real. Tonight, it is for <b>you</b>.</p>' +
        '<audio id="obAudio" controls preload="none" src="arthur_welcome.mp3" hidden></audio>' +
        '<div class="nav"><button class="btn" id="obBack">Back</button><button class="btn go" id="obNext">Continue</button></div>';
    } else {
      nav = false;
      q = "Building your prayers" + (d.name ? ", " + esc(d.name) : "") + "…";
      const lines = [];
      const needs = d.struggles.filter(function (s) { return s !== "pet"; }).map(function (s) { return HARDNAME[s]; }).filter(Boolean);
      lines.push(needs.length ? "Choosing prayers for " + needs.slice(0, 2).join(" and ").toLowerCase() : "Choosing prayers for your day");
      const nm = Object.keys(d.names).map(function (k) { return d.names[k]; }).filter(Boolean);
      if (nm.length) lines.push("Writing " + nm[0] + "’s name into your prayers"); else if (d.lost.length) lines.push("Adding gentle prayers for the one you miss");
      if (d.struggles.indexOf("pet") >= 0) lines.push("Adding prayers for your dog or cat");
      lines.push(d.remind && d.remind.on ? "Setting your " + fmtTime(d.remind.time) + " reminder" : "Preparing today’s prayer");
      lines.push("Making the text easy to read");
      body = '<div class="busy"><div class="bar"><b id="obBar"></b></div><ul class="chk" id="obChk">' + lines.map(function (l) { return '<li><i></i>' + esc(l) + '</li>'; }).join("") + '</ul></div>' +
        '<div class="ready"><ul class="chk"><li class="on"><i>✓</i>A new prayer for you every day</li><li class="on"><i>✓</i>Written around what you are carrying</li><li class="on"><i>✓</i>Two quiet minutes, no noise, no ads</li></ul>' +
        '<button class="btn go wide" id="obBegin">Begin</button></div>';
    }
    ob.classList.remove("done");
    ob.innerHTML = '<div class="box">' + '<h1>' + (id === "build" ? "Almost there" : id === "arthur" ? "Pray with Me" : "Let us get to know you") + '</h1>' + dots + '<h2 id="obQ">' + q + '</h2>' + (sub ? '<p class="sub">' + sub + '</p>' : "") + body +
      (nav ? '<div class="nav"><span>' + (step > 0 ? '<button class="btn" id="obBack">Back</button>' : '<button class="link" id="obSkip">Skip for now</button>') + '</span>' +
        '<button class="btn go" id="obNext">Next</button></div>' : "") +
      (id === "build" || id === "arthur" ? "" : '<p class="priv">Your answers stay on this device. Nothing is sent anywhere, and you can erase them any time in Settings.</p>') + '</div>';
    const inp = ob.querySelector("input[type=text]"); if (inp && id === "name") inp.focus();
    if (id === "arthur") {
      const a = document.getElementById("obAudio");
      if (a) { a.addEventListener("loadedmetadata", function () { a.hidden = false; }); a.addEventListener("error", function () { a.hidden = true; }); try { a.preload = "metadata"; a.load(); } catch (e) {} }
    }
    if (id === "build") runBuild();
  }

  function runBuild() {
    clearTimeout(buildTimer);
    const items = ob.querySelectorAll("#obChk li"), bar = document.getElementById("obBar");
    let i = 0;
    function tick() {
      if (i < items.length) {
        items[i].classList.add("on"); items[i].querySelector("i").textContent = "✓";
        if (bar) bar.style.width = Math.round(((i + 1) / items.length) * 100) + "%";
        i++; buildTimer = setTimeout(tick, 650);
      } else {
        const h = document.getElementById("obQ"); if (h) h.textContent = "Your prayers are ready" + (draft.name ? ", " + draft.name : "");
        ob.classList.add("done");
        const b = document.getElementById("obBegin"); if (b) b.focus();
      }
    }
    buildTimer = setTimeout(tick, 350);
  }

  function readInputs() {
    const n = document.getElementById("obName"); if (n) draft.name = n.value.trim();
    const rows = ob.querySelectorAll("#ob .rmn");
    if (rows.length) Array.prototype.forEach.call(rows, function (r) { draft.names[r.dataset.rel] = r.value.trim(); });
  }

  ob.addEventListener("click", function (e) {
    const opt = e.target.closest(".opt");
    if (opt) {
      readInputs();
      const k = opt.dataset.k, v = opt.dataset.v;
      if (k === "age" || k === "when") draft[k] = v; else toggle(draft[k], v, k === "struggles" ? 3 : 0);
      drawStep(); return;
    }
    const id = e.target.id;
    if (id === "obBack") { readInputs(); step--; drawStep(); }
    else if (id === "obNext") { readInputs(); if (step < STEPS.length - 1) { step++; drawStep(); } }
    else if (id === "obSkip") { store.set("obSkip", true); close(false); }
    else if (id === "obRemind") { setReminder(true); }
    else if (id === "obNoRemind") { draft.remind = { on: false, time: remindTime() }; step++; drawStep(); }
    else if (id === "obBegin") { finish(); }
  });
  async function setReminder(on) {
    const b = document.getElementById("obRemind"); if (b) { b.disabled = true; b.textContent = "Setting…"; }
    draft.remind = { on: on, time: remindTime() };
    store.set("reminder", { on: on, time: remindTime() });
    let ok = true;
    try { if (window.NativeReminder) ok = await window.NativeReminder.schedule(); } catch (e) { ok = false; }
    if (!ok) { draft.remind.on = false; store.set("reminder", { on: false, time: remindTime() }); }
    step++; drawStep();
  }
  ob.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.tagName === "INPUT") { e.preventDefault(); const n = document.getElementById("obNext"); if (n) n.click(); } });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ob.classList.contains("open") && STEPS[step] !== "build") { store.set("obSkip", true); close(false); } });

  function open(edit) { editing = !!edit; draft = newDraft(); step = 0; drawStep(); ob.classList.add("open"); }
  function close(showPlus) {
    clearTimeout(buildTimer);
    ob.classList.remove("open"); refreshTabs(); tab = "today"; renderTabs(); render();
    // No Plus screen here: people see their first prayers before anything about Plus (user decision 31.10.2026).
    // Plus is offered only when they tap it: the card after the free prayers, "Arthur prays your name", or Settings.
    if (window.QuietIntro) window.QuietIntro(false);
  }
  function finish() {
    // names to remember: one per relation; keep any "someone else" names added earlier
    const keep = (draft.remember || []).filter(function (r) { return r.name && r.rel === "other"; });
    draft.remember = LOST.map(function (o) { return o[0]; }).filter(function (rel) { return draft.lost.indexOf(rel) >= 0 && draft.names[rel]; })
      .map(function (rel) { return { name: draft.names[rel], rel: rel }; }).concat(keep);
    delete draft.names;
    draft.lostName = draft.remember.length ? draft.remember[0].name : "";
    // "who is part of your life" is derived from the needs screen
    draft.life = [];
    if (draft.struggles.indexOf("pet") >= 0) draft.life.push("pet");
    if (draft.struggles.indexOf("family") >= 0) draft.life.push("family");
    if (draft.struggles.indexOf("lonely") >= 0) draft.life.push("lonely");
    try {
      const ppl = store.get("people", []);
      draft.remember.forEach(function (r) {
        if (!ppl.some(function (x) { return x.name.toLowerCase() === r.name.toLowerCase() && x.kind === "memory"; }))
          ppl.push({ id: "p" + Date.now().toString(36) + Math.floor(Math.random() * 99), name: r.name, kind: "memory", seed: Math.floor(Math.random() * 1000), count: 0, last: "" });
      });
      store.set("people", ppl);
    } catch (e) {}
    store.set("profile", draft);
    if (store.get("size", null) === null) store.set("size", draft.age === "75 or older" ? 1.8 : 1.45);
    applySettings();
    close(!editing);
  }

  /* ---------- settings hooks ---------- */
  const panel = document.querySelector("#sheet .panel");
  if (panel) {
    const box = document.createElement("div");
    box.className = "prof";
    box.innerHTML = '<div class="row"><span>My prayers</span><span><button id="editProfile">Edit my answers</button><button id="eraseAll">Erase my data</button></span></div>';
    const small = panel.querySelector(".small");
    panel.insertBefore(box, small);
    document.getElementById("editProfile").onclick = function () { sheet.classList.remove("open"); open(true); };
    document.getElementById("eraseAll").onclick = function () {
      if (!confirm("Erase your answers, saved prayers and streak from this device?")) return;
      ["profile", "saved", "streak", "obSkip", "size", "theme", "reminder", "introSeen"].forEach(function (k) { try { localStorage.removeItem("" + k); } catch (e) {} });
      saved = new Set(); sheet.classList.remove("open"); applySettings(); open(); toast("Erased");
    };
  }

  /* ---------- start ---------- */
  refreshTabs(); render();
  if (!profile() && !store.get("obSkip", false)) open();
})();
