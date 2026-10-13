/**
 * Rendu des bannières LinkedIn (profil 1584 × 396, page entreprise 1128 × 191).
 * Usage : node render-banner.mjs [fichier.html] [largeur] [hauteur] [nom-sortie]
 * Sortie : <nom>.png (taille LinkedIn) et <nom>@2x.png (double résolution, plus nette après compression).
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const [file = "linkedin-banner.html", w = "1584", h = "396", name = "linkedin-banner"] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
for (const [scale, out] of [[2, `${name}@2x.png`], [1, `${name}.png`]]) {
  await page.setViewport({ width: +w, height: +h, deviceScaleFactor: scale });
  await page.goto(pathToFileURL(path.join(DIR, file)).href, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(DIR, out) });
  console.log("->", out);
}
await browser.close();
