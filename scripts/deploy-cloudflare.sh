#!/usr/bin/env bash
# Siteyi build edip Cloudflare Pages'e yükler.
# Kullanım: npm run deploy   (önce bir kez: npx wrangler login)
#
# Yükleme, dist/ klasörünün geçici bir kopyasından yapılır: wrangler proje
# klasöründe çalıştırılınca Vite projesini "otomatik yapılandırmaya" kalkıp
# vite.config.ts ve package.json dosyalarını değiştirebiliyor.
set -euo pipefail

PROJECT="${CF_PAGES_PROJECT:-omerfruk-com}"
# Proje kişisel Cloudflare hesabında; omerfruk.com bölgesi de orada olmalı,
# aksi halde hesaplar arası proxy'li CNAME Error 1014 verir.
export CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-73d785f9f383f3ee67ecd78eba36c0c3}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cd "$ROOT"
npm run build
cp -R dist "$TMP/site"

cd "$TMP"
npx -y wrangler@4 pages deploy site \
  --project-name="$PROJECT" \
  --branch=main \
  --commit-dirty=true

echo
echo "Yayında: https://omerfruk.com"
