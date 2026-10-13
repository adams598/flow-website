/**
 * Rendu v2 (serveur local, la scène 3D charge Three.js en module) :
 *   ui/*.html            → screens/ui-*.png        (écrans tablette)
 *   ui/phone-*.html      → screens/phone-*.png     (écrans téléphone)
 *   ui/phone3d.html      → screens/phone3d-*.png   (téléphone 3D, fond transparent)
 *   proposition-*.html, detail-*.html → PNG
 * Usage : node render.mjs [sites|applications|plateformes|solutions] [--scale=8]
 * Échelle 8 → 8640 × 10800 px (8K+). Échelle 4 → 4320 × 5400 (aperçu rapide).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, "../../..");
const BASE = "/" + path.relative(ROOT, DIR).split(path.sep).join("/");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ttf": "font/ttf",
};
const UI = { sites: "site", applications: "app", plateformes: "plateforme", solutions: "solutions" };

const args = process.argv.slice(2);
const scale = Number((args.find((a) => a.startsWith("--scale=")) || "--scale=8").split("=")[1]);
const only = args.find((a) => !a.startsWith("--"));
const names = only ? [only] : Object.keys(UI);

const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const ORIGIN = `http://127.0.0.1:${server.address().port}${BASE}/`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--use-angle=default", "--enable-gpu", "--ignore-gpu-blocklist", "--force-device-scale-factor=1"],
  protocolTimeout: 600000,
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("  page error:", e.message));

const shot = async (url, out, w, h, dpr, opts = {}) => {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  await page.goto(ORIGIN + url, { waitUntil: "networkidle0", timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  if (opts.waitDone) await page.waitForFunction("window.__done === true", { timeout: 300000 });
  await page.screenshot({ path: path.join(DIR, out), omitBackground: !!opts.transparent });
  console.log("→", out, `${w * dpr}×${h * dpr}`);
};
const exists = (f) => fs.existsSync(path.join(DIR, f));

for (const n of names) {
  const ui = UI[n];
  await shot(`ui/${ui}.html`, `screens/ui-${ui}.png`, 1280, 800, Math.max(2, scale / 2));
  if (exists(`ui/phone-${ui}.html`)) {
    await shot(`ui/phone-${ui}.html`, `screens/phone-${ui}.png`, 440, 956, 6);
    // Téléphone 3D : 1200 × 2000 CSS à dpr 3 → 3600 × 6000 px, fond transparent.
    // ry < 0 : l'écran regarde vers la gauche, on voit la tranche droite.
    const pw = 1200, ph = 2000, pdpr = 3;
    await shot(`ui/phone3d.html?screen=../screens/phone-${ui}.png&w=${pw}&h=${ph}&dpr=${pdpr}&ry=-0.62&rz=-0.1`,
      `screens/phone3d-${ui}.png`, pw, ph, pdpr, { waitDone: true, transparent: true });
  }
  for (const kind of ["proposition", "detail"]) {
    if (exists(`${kind}-${n}.html`)) await shot(`${kind}-${n}.html`, `${kind}-${n}.png`, 1080, 1350, scale);
  }
}
await browser.close();
server.close();
