/* Quiet Prayers: "Previous / Next" buttons and a counter on each prayer (easier than swiping for many older users). */
(function () {
  "use strict";
  const css = document.createElement("style");
  css.textContent =
    ".card .nav2{position:static;order:10;width:100%;margin:12px 0 0;display:flex;align-items:center;justify-content:center;gap:10px}" +
    ".card .nav2 button{flex:1;max-width:150px;font:inherit;font-size:1rem;padding:10px 12px;min-height:46px;border-radius:12px;border:1px solid var(--line);background:rgba(22,36,59,.6);color:var(--ink);cursor:pointer}" +
    ":root[data-theme=light] .card .nav2 button{background:rgba(241,233,212,.7)}" +
    ".card .nav2 button[disabled]{opacity:.35;cursor:default}" +
    ".card .nav2 span{color:var(--muted);font-size:.85rem;white-space:nowrap}" +
    ".card .hint{display:none !important}" +
    "body.quiet .card .nav2{display:none}";
  document.head.appendChild(css);

  function addNav() {
    const cards = Array.prototype.slice.call(feed.querySelectorAll(".card[data-id]"));
    cards.forEach(function (c, i) {
      if (c.querySelector(".nav2")) return;
      const n = document.createElement("div"); n.className = "nav2";
      n.innerHTML = '<button type="button" data-nav="-1" aria-label="Previous prayer"' + (i === 0 ? " disabled" : "") + '>‹ Previous</button>' +
        '<span>' + (i + 1) + ' of ' + cards.length + '</span>' +
        '<button type="button" data-nav="1" aria-label="Next prayer"' + (i === cards.length - 1 ? " disabled" : "") + '>Next ›</button>';
      c.appendChild(n);
    });
  }
  feed.addEventListener("click", function (e) {
    const b = e.target.closest("button[data-nav]"); if (!b || b.disabled) return;
    const cards = Array.prototype.slice.call(feed.querySelectorAll(".card[data-id]"));
    const card = b.closest(".card"), i = cards.indexOf(card) + parseInt(b.dataset.nav, 10);
    if (cards[i]) cards[i].scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const base = window.render;
  window.render = function () { base(); addNav(); };
  render();
})();
