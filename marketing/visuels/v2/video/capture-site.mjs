/**
 * Captures du vrai site (serveur local `npm run dev`, port 3000) au format tablette,
 * pour le tutoriel de la vidéo :
 *   site/scroll/NNNN.jpg  défilement image par image du haut de page jusqu'au questionnaire
 *   site/q*.png           étapes du questionnaire
 * La zone capturée exclut la barre du navigateur (dessinée par screen.html).
 * Ne soumet JAMAIS le formulaire (le bouton d'envoi déclenche un vrai e-mail).
 * Usage : node capture-site.mjs [url]   (défaut http://localhost:3000/fr)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, "site");
const URL = process.argv[2] || "http://localhost:3000/fr";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const VW = 820, VH = 1090, DPR = 2;   // écran tablette moins la barre du navigateur
const SCROLL_FRAMES = 90;             // 3 s à 30 i/s
fs.mkdirSync(path.join(OUT, "scroll"), { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME });
const page = await browser.newPage();
await page.setViewport({ width: VW, height: VH, deviceScaleFactor: DPR });
await page.goto(URL, { waitUntil: "networkidle0", timeout: 120000 });
// Masque l'indicateur de développement de Next.js.
await page.addStyleTag({ content: "nextjs-portal{display:none!important} html{scroll-behavior:auto!important}" });
await page.evaluate(() => document.fonts.ready);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Déclenche les animations d'apparition, puis revient en haut.
const H = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 300) { await page.evaluate((v) => window.scrollTo(0, v), y); await wait(100); }
await page.evaluate(() => window.scrollTo(0, 0));
await wait(1000);

const formTop = await page.evaluate(() => document.getElementById("projet").getBoundingClientRect().top + window.scrollY);
const target = Math.round(formTop - 24);
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
for (let i = 0; i < SCROLL_FRAMES; i++) {
  const y = Math.round(target * ease(i / (SCROLL_FRAMES - 1)));
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await wait(30);
  await page.screenshot({ path: path.join(OUT, "scroll", String(i).padStart(4, "0") + ".jpg"), type: "jpeg", quality: 92 });
}
console.log("→ scroll", SCROLL_FRAMES, "images");
fs.writeFileSync(path.join(OUT, "positions.json"), JSON.stringify({ pageHeight: H, formTop, target, viewport: [VW, VH], scrollFrames: SCROLL_FRAMES }, null, 2));

const shot = async (name) => { await wait(800); await page.screenshot({ path: path.join(OUT, name) }); console.log("→", name); };
const clickText = async (text) => {
  // Les étapes s'animent : on réessaie pendant 2 s le temps que le bouton apparaisse.
  for (let k = 0; k < 20; k++) {
    const ok = await page.evaluate((t) => {
      const b = [...document.querySelectorAll("#projet button")].find((x) => x.textContent.replace(/\s+/g, " ").trim() === t.replace(/\s+/g, " "));
      if (b) b.click();
      return Boolean(b);
    }, text);
    if (ok) return;
    await wait(100);
  }
  throw new Error("bouton introuvable : " + text);
};
const next = () => page.evaluate(() => {
  const b = [...document.querySelectorAll('#projet button[type="button"]')].find((x) => /Continuer|Suivant|Next/i.test(x.textContent));
  if (!b) throw new Error("bouton Continuer introuvable");
  b.click();
});
// Où sont les boutons (pour l'indicateur de tap dans la vidéo).
const rectOf = (sel, text) => page.evaluate((s, t) => {
  const el = [...document.querySelectorAll(s)].find((x) => !t || x.textContent.trim() === t || x.value === t);
  const r = el.getBoundingClientRect();
  return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)];
}, sel, text);

const taps = {};
await shot("q1.png");
taps.q1 = await rectOf("#projet button", "Site web");
await clickText("Site web");
await shot("q1-choix.png");
taps.q1next = await rectOf('#projet button[type="button"]', null).catch(() => null);
await next();
await shot("q2.png");
taps.q2 = await rectOf("#projet textarea");
// Frappe visible : une capture toutes les 3 lettres (screen.html les enchaîne).
const typeSteps = async (sel, text, step, dir) => {
  fs.mkdirSync(path.join(OUT, dir), { recursive: true });
  await page.focus(sel);
  let n = 0;
  for (let i = 0; i < text.length; i += step) {
    await page.type(sel, text.slice(i, i + step));
    await wait(120);
    await page.screenshot({ path: path.join(OUT, dir, String(n++).padStart(2, "0") + ".png") });
  }
  console.log("->", dir, n, "images");
  return n;
};
const counts = {};
counts.q2 = await typeSteps("#projet textarea", "Réserver et payer en ligne.", 2, "q2-frappe");
await shot("q2-texte.png");
await next();
await shot("q3.png");
taps.q3 = await rectOf("#projet button", "Simple idée");
await clickText("Simple idée");
await shot("q3-choix.png");
await next();
await clickText("2 000 – 5 000 €");
await next();
await clickText("Dès que possible");
await next();
await shot("q6.png");
counts.nom = await typeSteps('#projet input[type="text"]', "Camille Martin", 2, "q6-nom");
counts.mail = await typeSteps('#projet input[type="email"]', "camille@exemple.fr", 2, "q6-mail");
await shot("q6-rempli.png");
fs.writeFileSync(path.join(OUT, "frappes.json"), JSON.stringify(counts));
taps.envoyer = await rectOf('#projet button[type="submit"]');
fs.writeFileSync(path.join(OUT, "taps.json"), JSON.stringify(taps, null, 2));
// Pas de clic sur « Envoyer mon projet ».

await browser.close();
