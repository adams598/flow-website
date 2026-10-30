/**
 * Rendu des visuels de la série LinkedIn (et des visuels sites / applications) en deux
 * versions d'appel à l'action : réseaux (« Écrivez-nous en message privé ») et WhatsApp /
 * print (« Appelez-nous au … », suffixe -tel).
 * Usage : node render-posts.mjs [--scale=4]   (4 → 4320 × 5400)
 * Sortie : posts/<nom>.png et posts/<nom>-tel.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, "posts");
fs.mkdirSync(OUT, { recursive: true });
const scale = Number((process.argv.find((a) => a.startsWith("--scale=")) || "--scale=4").split("=")[1]);
const FILES = ["post1-flow", "post2-methode", "proposition-sites", "proposition-applications", "detail-sites", "detail-applications"];

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: scale });
for (const f of FILES) {
  for (const [q, suffix] of [["", ""], ["?cta=tel", "-tel"]]) {
    await page.goto(pathToFileURL(path.join(DIR, `${f}.html`)).href + q, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, `${f}${suffix}.png`) });
    console.log("->", `${f}${suffix}.png`);
  }
}
await browser.close();
