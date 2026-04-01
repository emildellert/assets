import { execFileSync } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputGif = path.resolve(__dirname, "../../icons/logo_music_animated.gif");
const htmlPath = path.resolve(__dirname, "./render.html");
const tmpDir = path.resolve(__dirname, "./.tmp");
const framesDir = path.join(tmpDir, "frames");
const palettePath = path.join(tmpDir, "palette.png");

const fps = 24;
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  defaultViewport: {
    width: 420,
    height: 420,
    deviceScaleFactor: 1
  },
  args: ["--hide-scrollbars", "--no-first-run", "--no-default-browser-check"]
});

await rm(tmpDir, { recursive: true, force: true });
await mkdir(framesDir, { recursive: true });

try {
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: "load", timeout: 15000 });
  await page.waitForFunction(() => typeof window.renderFrame === "function", {
    timeout: 15000
  });

  const totalDuration = await page.evaluate(() => window.ANIMATION_CONFIG.totalDuration);
  const frameCount = Math.ceil(totalDuration * 24) + 1;

  for (let index = 0; index < frameCount; index += 1) {
    const frameTime = Math.min(index / fps, totalDuration);
    const outputPath = path.join(framesDir, `frame-${String(index).padStart(3, "0")}.png`);

    await page.evaluate((time) => {
      document.body.dataset.ready = "false";
      window.renderFrame(time);
    }, frameTime);

    await page.waitForFunction(() => document.body.dataset.ready === "true", {
      timeout: 15000
    });

    await page.screenshot({ path: outputPath });
  }

  await page.close();
} finally {
  await browser.close();
}

execFileSync(
  "ffmpeg",
  [
    "-y",
    "-framerate",
    String(fps),
    "-i",
    path.join(framesDir, "frame-%03d.png"),
    "-vf",
    "palettegen=stats_mode=diff",
    "-frames:v",
    "1",
    palettePath
  ],
  { stdio: "inherit" }
);

execFileSync(
  "ffmpeg",
  [
    "-y",
    "-framerate",
    String(fps),
    "-i",
    path.join(framesDir, "frame-%03d.png"),
    "-i",
    palettePath,
    "-lavfi",
    "paletteuse=dither=sierra2_4a",
    "-loop",
    "0",
    outputGif
  ],
  { stdio: "inherit" }
);

console.log(`GIF written to ${outputGif}`);
