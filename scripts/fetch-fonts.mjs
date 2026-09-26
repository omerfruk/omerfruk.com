// Google Fonts'tan değişken WOFF2 dosyalarını indirir (latin + latin-ext altkümeleri).
// Fontlar depoya eklenir; site çalışırken Google'a hiç istek gitmez.
// Çalıştırma: node scripts/fetch-fonts.mjs
import { mkdir, writeFile } from 'node:fs/promises';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const OUT = 'public/fonts';

/** Türkçe için gereken iki altküme: latin (ç ö ü) ve latin-ext (ş ğ İ ı). */
const WANTED = ['latin', 'latin-ext'];

const FAMILIES = [
  { file: 'space-grotesk', spec: 'Space+Grotesk:wght@400..700' },
  { file: 'inter', spec: 'Inter:wght@300..700' },
  { file: 'jetbrains-mono', spec: 'JetBrains+Mono:wght@400..600' },
];

await mkdir(OUT, { recursive: true });
const lines = [];

for (const { file, spec } of FAMILIES) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${spec}&display=swap`, {
      headers: { 'User-Agent': UA },
    })
  ).text();

  // Her @font-face bloğunun önünde altküme adını veren bir yorum var: /* latin-ext */
  const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];
  for (const [, subset, block] of blocks) {
    if (!WANTED.includes(subset)) continue;
    const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1]?.trim();
    if (!url || !range) throw new Error(`${file}/${subset}: url veya unicode-range bulunamadı`);

    const name = `${file}-${subset}.woff2`;
    const bytes = new Uint8Array(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
    await writeFile(`${OUT}/${name}`, bytes);
    lines.push(`${name.padEnd(28)} ${String(bytes.length).padStart(7)} B  ${range}`);
  }
}

console.log(lines.join('\n'));
