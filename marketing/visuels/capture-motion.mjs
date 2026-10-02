/**
 * Capture CSS motion → H.264.
 * Frame-accurate: pause WAAPI and seek, then screenshot.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const VISUELS = path.join(ROOT, "marketing", "visuels");
const OUT = path.join(VISUELS, "motion");
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const FFMPEG = "C:\\Users\\adams\\AppData\\Local\\Microsoft\\WinGet\\Links\\ffmpeg.exe";
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
};

const JOBS = [
  { file: "motion-sites.html", out: "motion-sites.mp4", w: 1080, h: 1350, duration: 12, fps: 30 },
  { file: "motion-applications.html", out: "motion-applications.mp4", w: 1080, h: 1350, duration: 12, fps: 30 },
  { file: "motion-plateformes.html", out: "motion-plateformes.mp4", w: 1080, h: 1350, duration: 12, fps: 30 },
  { file: "motion-solutions.html", out: "motion-solutions.mp4", w: 1080, h: 1350, duration: 12, fps: 30 },
  { file: "motion-flow.html", out: "motion-flow.mp4", w: 1920, h: 1080, duration: 15, fps: 30 },
];

function serve() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let rel = urlPath.replace(/^\/+/, "");
    if (!rel) rel = "index.html";
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", windowsHide: true });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${code}`))));
  });
}

async function capture(page, job, port) {
  const framesDir = path.join(OUT, "_frames", path.basename(job.out, ".mp4"));
  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });
  const total = job.duration * job.fps;

  await page.setViewport({ width: job.w, height: job.h, deviceScaleFactor: 2 });
  await page.goto(`http://127.0.0.1:${port}/marketing/visuels/${job.file}`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 250));

  for (let i = 0; i < total; i++) {
    const ms = (i / job.fps) * 1000;
    await page.evaluate((t) => {
      document.getAnimations().forEach((a) => {
        a.pause();
        a.currentTime = t;
      });
    }, ms);
    const file = path.join(framesDir, `f${String(i).padStart(4, "0")}.jpg`);
    await page.screenshot({
      path: file,
      type: "jpeg",
      quality: 94,
      omitBackground: false,
    });
    if (i % 30 === 0) console.log(`  ${job.out} ${i}/${total}`);
  }

  const mp4 = path.join(OUT, job.out);
  await run(FFMPEG, [
    "-y",
    "-framerate", String(job.fps),
    "-i", path.join(framesDir, "f%04d.jpg"),
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-crf", "16",
    "-preset", "medium",
    "-movflags", "+faststart",
    mp4,
  ]);
  fs.rmSync(framesDir, { recursive: true, force: true });
  console.log("wrote", mp4);
}

const only = process.argv[2];
const jobs = only ? JOBS.filter((j) => j.out.includes(only) || j.file.includes(only)) : JOBS;
if (!jobs.length) {
  console.error("no job", only);
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
const { server, port } = await serve();
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--hide-scrollbars", "--font-render-hinting=none", "--disable-lcd-text"],
});

try {
  for (const job of jobs) {
    const mp4 = path.join(OUT, job.out);
    if (fs.existsSync(mp4)) {
      console.log("skip", job.out);
      continue;
    }
    const page = await browser.newPage();
    console.log("capture", job.out);
    await capture(page, job, port);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
