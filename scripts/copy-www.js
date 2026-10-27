// Copies the web app (../quiet_prayers_app) into ./www so Capacitor can package it.
const fs = require("fs");
const path = require("path");
const src = path.join(__dirname, "..", "..", "quiet_prayers_app");
const dst = path.join(__dirname, "..", "www");
const skip = new Set(["icons_test.html", "icons_test2.html"]);
fs.rmSync(dst, { recursive: true, force: true });
fs.mkdirSync(dst, { recursive: true });
let n = 0;
for (const f of fs.readdirSync(src)) {
  if (skip.has(f)) continue;
  const p = path.join(src, f);
  if (fs.statSync(p).isFile()) { fs.copyFileSync(p, path.join(dst, f)); n++; }
}
console.log("copied", n, "files to www");
