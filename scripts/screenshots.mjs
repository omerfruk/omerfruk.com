// Yerel önizlemeden (npm run preview) ekran görüntüleri alır ve taşma,
// konsol hatası, başarısız istek varsa raporlar.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE_URL ?? 'http://localhost:4399';
const OUT = 'docs/screenshots';
const viewports = [
  { name: '320', width: 320, height: 568, mobile: true },
  { name: '390', width: 390, height: 844, mobile: true },
  { name: '768', width: 768, height: 1024, mobile: true },
  { name: '1440', width: 1440, height: 900, mobile: false },
];
const pages = [
  { name: 'en', path: '/' },
  { name: 'tr', path: '/tr/' },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
let problems = 0;

for (const vp of viewports) {
  for (const target of pages) {
    // Türkçe sayfanın tam boy görüntüsü yalnızca iki ölçüde gerekli.
    if (target.name === 'tr' && !['390', '1440'].includes(vp.name)) continue;

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    });
    const page = await context.newPage();
    const issues = [];
    page.on('console', (m) => ['error', 'warning'].includes(m.type()) && issues.push(`console ${m.type()}: ${m.text()}`));
    page.on('pageerror', (e) => issues.push(`pageerror: ${e.message}`));
    page.on('response', (r) => r.status() >= 400 && issues.push(`HTTP ${r.status()} ${r.url()}`));
    page.on('requestfailed', (r) => issues.push(`failed ${r.url()}`));

    await page.goto(BASE + target.path, { waitUntil: 'networkidle' });
    const tag = `${vp.name}-${target.name}`;
    await page.screenshot({ path: `${OUT}/${tag}-viewport.png` });

    // Bir kez çalışan bölüm girişlerini tetiklemek için sayfayı gez.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += Math.round(vp.height * 0.6)) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(110);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const wide = [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1 && !el.closest('[aria-hidden="true"]'))
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
      return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, wide };
    });
    if (overflow.scrollWidth > overflow.clientWidth) issues.push(`horizontal overflow ${JSON.stringify(overflow)}`);
    else if (overflow.wide.length) issues.push(`elements past right edge (clipped): ${overflow.wide.join(', ')}`);

    await page.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });

    if (vp.mobile && vp.width < 1024 && target.name === 'en') {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.waitForTimeout(350);
      await page.screenshot({ path: `${OUT}/${tag}-menu.png` });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
    }

    console.log(`${tag}: ${issues.length ? issues.join('\n  ') : 'ok'}`);
    problems += issues.length;
    await context.close();
  }
}

await browser.close();
process.exitCode = problems ? 1 : 0;
