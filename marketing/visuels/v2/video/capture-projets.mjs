/**
 * Captures des réalisations en ligne (version mobile) pour la scène « Réalisations ».
 * Lecture seule : on charge la page d'accueil, on attend le rendu, on photographie.
 * Sortie : projets/<nom>-mobile.png (390 × 844, ×3).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, "projets");
fs.mkdirSync(OUT, { recursive: true });
const SITES = [
  ["drivinchill", "https://drivinnchill.fr/"],
  ["objectif-tcf", "https://objectif-tcf-blue.vercel.app/"],
  ["bai", "https://bai-consultingetformation.com/"],
];

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
for (const [name, url] of SITES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1");
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: path.join(OUT, `${name}-mobile.png`) });
    console.log("->", name);
  } catch (e) {
    console.log("!!", name, e.message);
  }
  await page.close();
}
await browser.close();
