/* Quiet Prayers: "Share as picture" card (drawn on a canvas, nothing leaves the device until the user shares). */
(function () {
  "use strict";
  const W = 1080, H = 1350;

  function wrap(ctx, text, maxW) {
    const words = text.split(/\s+/), lines = []; let line = "";
    words.forEach(function (w) {
      const t = line ? line + " " + w : w;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
    });
    if (line) lines.push(line);
    return lines;
  }
  function iconImage(color) {
    let s = (window.QuietHands || "").replace('class="mark"', "").replace(/currentColor/g, color);
    if (s.indexOf("xmlns") < 0) s = s.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    // make sure the svg has an intrinsic size for drawImage
    s = s.replace("<svg", '<svg width="256" height="256"');
    return new Promise(function (res) {
      const img = new Image();
      img.onload = function () { res(img); }; img.onerror = function () { res(null); };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
    });
  }

  async function makeCard(id) {
    const p = P[id], v = V[p.v];
    const title = fillTokens(p.ti, p), body = fillTokens(p.x, p), verse = "“" + v.t + "”", ref = v.ref + " (KJV)";
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");

    // background
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#14223a"); g.addColorStop(1, "#0b1424");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(232,194,122,.35)"; ctx.lineWidth = 3; ctx.strokeRect(36, 36, W - 72, H - 72);

    // icon
    const img = await iconImage("#e8c27a");
    if (img) { const iw = 150, ih = 150 * (img.height / img.width || 1); ctx.drawImage(img, (W - iw) / 2, 90, iw, 150); }

    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    // title
    ctx.fillStyle = "#e8c27a"; ctx.font = "bold 46px Georgia, serif";
    wrap(ctx, title, 860).forEach(function (l, i) { ctx.fillText(l, W / 2, 300 + i * 56); });

    // body: shrink font until it fits the space above the verse
    let fs = 54, lines, lh;
    const top = 380, maxBodyH = 560;
    for (; fs >= 34; fs -= 2) {
      ctx.font = fs + "px Georgia, serif"; lines = wrap(ctx, body, 880); lh = fs * 1.5;
      if (lines.length * lh <= maxBodyH) break;
    }
    ctx.fillStyle = "#f4ecd8"; ctx.font = fs + "px Georgia, serif";
    lines.forEach(function (l, i) { ctx.fillText(l, W / 2, top + fs + i * lh); });

    // verse
    const vy = top + lines.length * lh + 70;
    ctx.fillStyle = "#a9b2c3"; ctx.font = "italic 34px Georgia, serif";
    const vl = wrap(ctx, verse, 860); vl.forEach(function (l, i) { ctx.fillText(l, W / 2, vy + i * 44); });
    ctx.font = "30px Georgia, serif"; ctx.fillText(ref, W / 2, vy + vl.length * 44 + 14);

    // footer
    ctx.fillStyle = "#e8c27a"; ctx.font = "bold 36px Georgia, serif"; ctx.fillText("Quiet Prayers", W / 2, H - 120);
    ctx.fillStyle = "#a9b2c3"; ctx.font = "28px Georgia, serif";
    const where = /^https?:/.test(location.protocol) && location.hostname !== "localhost" ? location.host : "One prayer at a time";
    ctx.fillText(where, W / 2, H - 76);
    return new Promise(function (res) { cv.toBlob(res, "image/png"); });
  }

  // add a "share as picture" button to every card via the existing click delegation
  feed.addEventListener("click", async function (e) {
    const b = e.target.closest("button[data-act=picture]"); if (!b) return;
    const id = +b.closest(".card").dataset.id;
    try {
      b.disabled = true;
      const blob = await makeCard(id); if (!blob) { toast("Could not make the picture"); return; }
      const file = new File([blob], "quiet-prayer.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: "Quiet Prayers" }); } catch (_) {}
      } else {
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "quiet-prayer.png"; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000); toast("Picture saved");
      }
    } catch (err) { toast("Could not make the picture"); }
    finally { b.disabled = false; }
  });
  window.QuietShareCard = makeCard;

  // put the new button into the action column when cards are drawn
  const prev = window.render;
  window.render = function () {
    prev();
    document.querySelectorAll(".card .actions").forEach(function (a) {
      if (a.querySelector('[data-act=picture]')) return;
      const btn = document.createElement("button"); btn.dataset.act = "picture"; btn.setAttribute("aria-label", "Share as a picture"); btn.title = "Share as a picture"; btn.textContent = "🖼";
      a.insertBefore(btn, a.children[1] || null);
    });
  };
  render();
})();
