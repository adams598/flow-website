/**
 * Captures nettes des réalisations en ligne, pour les galeries ComeUp.
 * Usage : node capture-sites.mjs [nom]   ->  captures/*.png (×2)
 */
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "captures");
fs.mkdirSync(DIR, { recursive: true });
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const IPHONE = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const UA_IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const seule = process.argv[2];
const CAPTURES = [
  { nom: "tcf-desktop", url: "https://objectif-tcf.org/" },
  { nom: "tcf-mobile", url: "https://objectif-tcf.org/", mobile: true },
  { nom: "bai-desktop", url: "https://bai-consultingetformation.com/", clip: { x: 0, y: 0, width: 1440, height: 516 } },
  // MAIA, l'assistant du site : on ouvre la fenêtre de discussion (bouton en bas à droite).
  { nom: "bai-maia", url: "https://bai-consultingetformation.com/", clic: { x: 1396, y: 856 } },
  { nom: "bai-mobile", url: "https://bai-consultingetformation.com/", mobile: true },
  { nom: "flow-desktop", url: "https://flowsurmesure.com/" },
  { nom: "flow-mobile", url: "https://flowsurmesure.com/", mobile: true },
];

const browser = await puppeteer.launch({ executablePath: CHROME });
for (const c of CAPTURES.filter((c) => !seule || c.nom === seule)) {
  const page = await browser.newPage();
  if (c.mobile) {
    await page.setUserAgent(UA_IPHONE);
    await page.setViewport(IPHONE);
  } else {
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  }
  try {
    await page.goto(c.url, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 2500));
    if (c.clic) {
      await page.mouse.click(c.clic.x, c.clic.y);
      await new Promise((r) => setTimeout(r, 2500));
    }
    await page.screenshot({ path: path.join(DIR, `${c.nom}.png`), clip: c.clip });
    console.log("→", c.nom, page.url());
  } catch (e) {
    console.error("✗", c.nom, e.message);
  }
  await page.close();
}
await browser.close();
