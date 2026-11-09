// Renders assets/icon.svg into the PNG sizes the PWA and app stores need.
// Uses the Playwright Chromium already available in CI/dev containers.
// Run: npm run icons
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'assets/icon.svg'), 'utf8');

const TARGETS = [
  { file: 'public/icons/icon-192.png', size: 192, radius: 0.22 },
  { file: 'public/icons/icon-512.png', size: 512, radius: 0.22 },
  { file: 'public/icons/apple-touch-icon.png', size: 180, radius: 0 },
  // Maskable: full bleed, artwork inside the 80% safe zone.
  { file: 'public/icons/icon-maskable-512.png', size: 512, radius: 0, inset: 0.1 },
  // Store listing icons (Play needs 512, App Store 1024 with no transparency).
  { file: 'assets/store/play-icon-512.png', size: 512, radius: 0 },
  { file: 'assets/store/appstore-icon-1024.png', size: 1024, radius: 0 },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const t of TARGETS) {
  const inset = (t.inset ?? 0) * t.size;
  const html = `<html><body style="margin:0;background:transparent">
    <div style="width:${t.size}px;height:${t.size}px;background:#244536;border-radius:${t.radius * 100}%;overflow:hidden;display:grid;place-items:center">
      <div style="width:${t.size - 2 * inset}px;height:${t.size - 2 * inset}px">${svg.replace('<svg ', '<svg width="100%" height="100%" ')}</div>
    </div></body></html>`;
  await page.setViewportSize({ width: t.size, height: t.size });
  await page.setContent(html);
  await page.locator('div').first().screenshot({ path: join(root, t.file), omitBackground: t.radius > 0 });
  console.log('✓', t.file);
}
await browser.close();
