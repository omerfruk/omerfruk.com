// public/og.png üretir: paylaşımlarda görünen 1200×630 kart.
// Sitenin kendi fontlarını ve renklerini kullanır, böylece kart sayfayla aynı dili konuşur.
// Çalıştırma: node scripts/build-og.mjs
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/** Fontları data: URI olarak gömüyoruz; tarayıcı dosya yolu izni beklemeden yükler. */
const fontUri = async (file) =>
  `data:font/woff2;base64,${(await readFile(resolve('public/fonts', file))).toString('base64')}`;

const [serif, serifExt, sans] = await Promise.all([
  fontUri('fraunces-latin.woff2'),
  fontUri('fraunces-latin-ext.woff2'),
  fontUri('inter-latin.woff2'),
]);

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  @font-face { font-family:'FR'; src:url('${serif}') format('woff2'); font-weight:400 700;
    unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+2000-206F; }
  @font-face { font-family:'FR'; src:url('${serifExt}') format('woff2'); font-weight:400 700;
    unicode-range:U+0100-02BA,U+1E00-1E9F; }
  @font-face { font-family:'IN'; src:url('${sans}') format('woff2'); font-weight:300 700; }

  * { margin:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#faf7f1; color:#1b2430;
         font-family:'IN',sans-serif; display:flex; flex-direction:column;
         justify-content:space-between; padding:66px 72px; }

  .top { display:flex; align-items:baseline; justify-content:space-between;
         border-bottom:1px solid #e2dcd0; padding-bottom:22px; }
  .name { font-family:'FR',serif; font-size:30px; font-weight:500; letter-spacing:-0.01em; }
  .role { font-size:19px; color:#b4552e; }

  h1 { font-family:'FR',serif; font-size:74px; font-weight:500; line-height:1.06;
       letter-spacing:-0.022em; font-variation-settings:'opsz' 144; max-width:17ch; }

  .foot { display:flex; align-items:center; justify-content:space-between;
          border-top:1px solid #e2dcd0; padding-top:22px; font-size:19px; color:#8b95a1; }
  .url { color:#1b2430; }
</style></head>
<body>
  <div class="top">
    <span class="name">Ömer Faruk Taşdemir</span>
    <span class="role">Backend Engineer</span>
  </div>
  <h1>I build backend systems that stay reliable.</h1>
  <div class="foot">
    <span class="url">omerfruk.com</span>
    <span>Go · PostgreSQL · REST APIs · Docker</span>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await writeFile('public/og.png', await page.screenshot({ type: 'png' }));
await browser.close();
console.log('og: public/og.png (1200×630)');
