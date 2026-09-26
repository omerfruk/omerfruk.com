// Her dil için statik HTML üretir: dist/index.html (en) ve dist/tr/index.html (tr).
// JS yüklenmeden içerik görünür; arama motorları her iki dili de ayrı adreste bulur.
// Sayfa bilgileri entry-server'ın dışa aktardığı `pageMeta` üzerinden gelir;
// içerik yine tek kaynakta (src/data/site.ts) kalır.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const { render, pageMeta } = await import('../dist-ssr/entry-server.js');

const PAGES = [
  { lang: 'en', file: 'index.html', url: '/' },
  { lang: 'tr', file: 'tr/index.html', url: '/tr/' },
];

const SITE = pageMeta.siteUrl;
const template = await readFile('dist/index.html', 'utf8');

/** HTML'e gömülecek metinleri kaçırır. */
const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Arama motorlarının kişi kartı için okuduğu yapısal veri. */
const personJsonLd = (lang) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: pageMeta.name,
    url: `${SITE}${lang === 'tr' ? '/tr/' : '/'}`,
    jobTitle: pageMeta.jobTitle[lang],
    email: `mailto:${pageMeta.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Isparta', addressCountry: 'TR' },
    sameAs: pageMeta.sameAs,
    knowsAbout: pageMeta.knowsAbout,
    worksFor: { '@type': 'Organization', name: pageMeta.employer },
  });

for (const { lang, file, url } of PAGES) {
  const title = pageMeta.title[lang];
  const description = pageMeta.description[lang];
  const canonical = `${SITE}${url}`;

  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${SITE}/" />`,
    `<link rel="alternate" hreflang="tr" href="${SITE}/tr/" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${esc(pageMeta.name)}" />`,
    `<meta property="og:locale" content="${lang === 'tr' ? 'tr_TR' : 'en_US'}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SITE}/og.png" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${SITE}/og.png" />`,
    // Türkçe sayfada gövde metni latin-ext karakterler içerir; o altküme önden yüklenir.
    lang === 'tr'
      ? `<link rel="preload" href="/fonts/inter-latin-ext.woff2" as="font" type="font/woff2" crossorigin />`
      : '',
    `<script type="application/ld+json">${personJsonLd(lang)}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');

  const html = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${render(lang)}</div>`);

  if (html === template) throw new Error(`${lang}: şablonda değiştirilecek yer bulunamadı`);

  const dir = file.includes('/') ? `dist/${file.slice(0, file.lastIndexOf('/'))}` : null;
  if (dir) await mkdir(dir, { recursive: true });
  await writeFile(`dist/${file}`, html);
  console.log(`prerender: dist/${file} (${(html.length / 1024).toFixed(1)} KB)`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGES.map(
  ({ url }) => `  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/" />
    <xhtml:link rel="alternate" hreflang="tr" href="${SITE}/tr/" />
  </url>`,
).join('\n')}
</urlset>
`;
await writeFile('dist/sitemap.xml', sitemap);
console.log('prerender: dist/sitemap.xml');

await rm('dist-ssr', { recursive: true, force: true });
