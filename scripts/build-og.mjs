// public/og.png üretir: paylaşımlarda görünen 1200×630 kart.
// Sitenin kendi fontlarını ve renklerini kullanır, böylece kart sayfayla aynı dili konuşur.
// Çalıştırma: node scripts/build-og.mjs
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/** Fontları data: URI olarak gömüyoruz; tarayıcı dosya yolu izni beklemeden yükler. */
const fontUri = async (file) =>
  `data:font/woff2;base64,${(await readFile(resolve('public/fonts', file))).toString('base64')}`;

const [grotesk, groteskExt, mono] = await Promise.all([
  fontUri('space-grotesk-latin.woff2'),
  fontUri('space-grotesk-latin-ext.woff2'),
  fontUri('jetbrains-mono-latin.woff2'),
]);

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  @font-face { font-family:'SG'; src:url('${grotesk}') format('woff2'); font-weight:400 700;
    unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+2000-206F; }
  @font-face { font-family:'SG'; src:url('${groteskExt}') format('woff2'); font-weight:400 700;
    unicode-range:U+0100-02BA,U+1E00-1E9F; }
  @font-face { font-family:'JB'; src:url('${mono}') format('woff2'); font-weight:400 600; }

  * { margin:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#08090b; color:#f2f4f7;
         font-family:'SG',sans-serif; display:flex; flex-direction:column;
         justify-content:space-between; padding:72px 76px; position:relative; overflow:hidden; }

  /* Sayfadaki ölçü ızgarasının aynısı. */
  .grid { position:absolute; inset:0;
    background-image:linear-gradient(to right,#22262d 1px,transparent 1px),
                     linear-gradient(to bottom,#22262d 1px,transparent 1px);
    background-size:76px 76px;
    -webkit-mask-image:radial-gradient(120% 95% at 50% 0%,#000 8%,transparent 76%); }

  .row { position:relative; display:flex; align-items:center; justify-content:space-between; }
  .role { font-family:'JB',monospace; font-size:19px; font-weight:500; letter-spacing:.16em;
          text-transform:uppercase; color:#5fd3e3; display:flex; align-items:center; gap:12px; }
  .dot { width:9px; height:9px; border-radius:50%; background:#5fd3e3; }
  .mark { font-size:30px; font-weight:600; letter-spacing:-.03em; color:#6d757f; }

  h1 { position:relative; font-size:112px; font-weight:500; letter-spacing:-.045em;
       line-height:.98; max-width:15ch; }
  .stack { position:relative; font-family:'JB',monospace; font-size:24px; color:#9aa2ad;
           margin-top:28px; letter-spacing:.01em; }

  .foot { position:relative; display:flex; align-items:center; justify-content:space-between;
          border-top:1px solid #1d2127; padding-top:26px;
          font-family:'JB',monospace; font-size:20px; color:#6d757f; }
  .url { color:#f2f4f7; }
</style></head>
<body>
  <div class="grid"></div>
  <div class="row">
    <span class="role"><span class="dot"></span>Backend Engineer</span>
    <span class="mark">ÖFT</span>
  </div>
  <div>
    <h1>Ömer Faruk Taşdemir</h1>
    <p class="stack">Go · PostgreSQL · REST APIs · Docker</p>
  </div>
  <div class="foot">
    <span class="url">omerfruk.com</span>
    <span>Isparta, Türkiye · 5+ years</span>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await writeFile('public/og.png', await page.screenshot({ type: 'png' }));
await browser.close();
console.log('og: public/og.png (1200×630)');
