/**
 * Rendu image par image d'une page qui expose window.seek(t) (et window.__ready).
 * Usage :
 *   node render-frames.mjs <page.html> <dossier-sortie> --w=820 --h=1180 --dpr=2
 *        --fps=30 --from=0 --to=8.5 [--transparent] [--jpeg] [--only=0,2.5,5]
 * --only rend seulement les instants listés (aperçu), nommés t<instant>.png.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, "../../../..");
const BASE = "/" + path.relative(ROOT, DIR).split(path.sep).join("/");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ttf": "font/ttf", ".json": "application/json",
};

const [pageArg, outArg, ...rest] = process.argv.slice(2);
const opt = Object.fromEntries(rest.map((a) => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? true]; }));
const W = +opt.w || 1080, H = +opt.h || 1920, DPR = +opt.dpr || 1, FPS = +opt.fps || 30;
const FROM = +opt.from || 0, TO = +opt.to || 1;
const OUT = path.resolve(DIR, outArg);
fs.mkdirSync(OUT, { recursive: true });

const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}${BASE}/${pageArg}`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--use-angle=default", "--enable-gpu", "--ignore-gpu-blocklist"],
  protocolTimeout: 900000,
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("  page error:", e.message));
await page.setViewport({ width: W, height: H, deviceScaleFactor: DPR });
await page.goto(url, { waitUntil: "networkidle0", timeout: 300000 });
await page.evaluate(() => window.__ready);

const times = opt.only
  ? String(opt.only).split(",").map(Number)
  : Array.from({ length: Math.round((TO - FROM) * FPS) }, (_, i) => FROM + i / FPS);
const ext = opt.jpeg ? "jpg" : "png";
const t0 = Date.now();
for (let i = 0; i < times.length; i++) {
  await page.evaluate((t) => window.seek(t), times[i]);
  await page.evaluate(() => (window.__frameReady ? window.__frameReady() : null));
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const name = opt.only ? `t${times[i]}.${ext}` : `${String(i).padStart(5, "0")}.${ext}`;
  await page.screenshot({ path: path.join(OUT, name), omitBackground: !!opt.transparent, type: opt.jpeg ? "jpeg" : "png", ...(opt.jpeg ? { quality: 93 } : {}) });
  if (i % 30 === 0) process.stdout.write(`\r${i + 1}/${times.length} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
console.log(`\n→ ${times.length} images dans ${path.relative(DIR, OUT)}`);
await browser.close();
server.close();
