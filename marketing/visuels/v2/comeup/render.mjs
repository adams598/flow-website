/**
 * Couvertures ComeUp / Fiverr : cover.html?s=… → <s>.png en 1280 × 720 (×2 → 2560 × 1440).
 * Usage : node render.mjs [reservation|assistant|relances|suivi|prospection|galerie] [--scale=2]
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
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".ttf": "font/ttf",
  ".png": "image/png", ".jpg": "image/jpeg" };
const ALL = ["reservation", "assistant", "relances", "suivi", "prospection",
  "autoecole", "hebergement", "beaute", "clickcollect", "devis"];
// Diapos de galerie : galerie.html?s=… -> galerie/<s>.png
const GALERIE = ["moi", "tcf", "bai", "maia", "drivin", "pilotage", "flow", "etapes-reservation", "etapes-assistant",
  "etapes-prospection", "livrable-prospection", "relances-sequence", "suivi-rapport"];

const args = process.argv.slice(2);
const scale = Number((args.find((a) => a.startsWith("--scale=")) || "--scale=2").split("=")[1]);
const only = args.find((a) => !a.startsWith("--"));
const galerie = only === "galerie";
const names = galerie ? GALERIE : only ? [only] : ALL;

const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const ORIGIN = `http://127.0.0.1:${server.address().port}${BASE}/`;

const browser = await puppeteer.launch({ executablePath: CHROME });
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("  page error:", e.message));
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: scale });

if (galerie) fs.mkdirSync(path.join(DIR, "galerie"), { recursive: true });
for (const n of names) {
  const out = galerie ? `galerie/${n}.png` : `${n}.png`;
  await page.goto(`${ORIGIN}${galerie ? "galerie" : "cover"}.html?s=${n}`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(DIR, out) });
  console.log("→", out, `${1280 * scale}×${720 * scale}`);
}
await browser.close();
server.close();
