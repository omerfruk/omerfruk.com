# omerfruk.com

Ömer Faruk Taşdemir'in kişisel sitesi. İki dilli (İngilizce + Türkçe), tamamen
statik, Cloudflare Pages üzerinde `omerfruk.com` kök alan adında yayında.

| Adres | İçerik |
| --- | --- |
| **https://omerfruk.com** | İngilizce (varsayılan) |
| **https://omerfruk.com/tr/** | Türkçe |

## Hızlı başlangıç

Gerekenler: Node.js 24+.

```bash
npm ci
npm run dev        # http://localhost:5173
```

## Komutlar

```bash
npm run dev          # geliştirme sunucusu
npm run build        # tsc + vite build + her dil için prerender → dist/
npm run preview      # http://localhost:4399 (production çıktısı)
npm run test:e2e     # Playwright akış testleri (20 test)
npm run screenshots  # preview açıkken → docs/screenshots/
npm run og           # public/og.png paylaşım kartını yeniden üretir
npm run fonts        # public/fonts/*.woff2 dosyalarını yeniler
npm run deploy       # build + Cloudflare Pages'e yükle
```

Değişiklikten sonra en az `npm run build` ve `npm run test:e2e` çalıştır.

## Nerede ne değişir

| Değişiklik | Dosya |
| --- | --- |
| Sayfadaki bütün metinler (iki dilde), projeler, deneyim, iletişim | `src/data/site.ts` |
| Renkler, fontlar, tipografi ölçeği, boşluklar | `src/styles/globals.css` |
| Bölüm tasarımları | `src/components/*.tsx` |
| `<head>` etiketleri, JSON-LD, sitemap | `scripts/prerender.mjs` |
| Paylaşım kartı | `scripts/build-og.mjs` |

**Metinleri bileşenlere yazma.** Hepsi `site.ts` içinde `{ en, tr }` çiftleri
hâlinde durur; `t(değer, lang)` doğru olanı seçer.

## Nasıl çalışıyor?

Site tamamen statik — sunucu, veritabanı veya API yok.

```
src/ (React + TypeScript)
  └─ npm run build ─▶ dist/index.html   (İngilizce, önceden render edilmiş)
                      dist/tr/index.html (Türkçe)
                      dist/assets/, dist/fonts/, dist/sitemap.xml
  └─ npm run deploy ─▶ Cloudflare Pages
```

Dil, **yol adından** türer (`lib/i18n.ts`): `/tr/` ile başlayan her yol Türkçe,
kalanı İngilizce. Aynı kural hem prerender sırasında hem tarayıcıda geçerli
olduğu için hydrate ederken sunucu/istemci farkı oluşmaz ve dil için state,
effect veya çerez gerekmez. Dil anahtarı sıradan bir bağlantıdır.

Her iki sayfa da build sırasında tam HTML olarak üretilir: JavaScript kapalıyken
bile içerik görünür (`tests/site.spec.ts` bunu doğruluyor) ve arama motorları iki
dili `hreflang` ile eşleştirilmiş ayrı adreslerde bulur.

## Tasarım

Sıcak, editoryal, tipografik. Kırık beyaz kâğıt zemini (`#faf7f1`), mavi-siyah
mürekkep (`#1b2430`) ve tek bir yanık kiremit vurgu (`#b4552e`). Kart yok, rozet
yok, bölüm numarası yok, mono etiket yok — bölümler saç teli çizgilerle ayrılır ve
projeler dergi içindekiler sayfası gibi bir liste hâlinde okunur.

Tipografi: başlıklarda **Fraunces**, gövdede **Inter**. Fraunces değişken bir
serif; `opsz` ekseni her ölçüde ayrı ayarlanır, böylece büyük başlıklar ince ve
kontrastlı, küçük başlıklar sağlam durur. İkisi de yerel WOFF2 olarak sunulur
(`public/fonts/`), Google'a çalışma anında istek gitmez. Türkçe karakterler iki
altkümeye dağılır: `ı` latin içinde, `ş ğ İ` latin-ext içinde; ikisi de dosyalanmıştır.

Bölüm sırası: Hero → Projeler → Yetkinlikler → Deneyim → İletişim → footer.
Sayfadaki tek H1 hero'daki cümledir; isim künyede, sayfa başlığında ve JSON-LD'de
geçer.

## İçerik kuralı

`PROFILE.md`'deki kamuya açık konumlandırma kuralı gereği sayfada **PHP ve
Laravel adı geçmez**. Geniş teknoloji yetkinliği gerektiğinde genel ifade
kullanılır. Bu kural `tests/site.spec.ts` içinde bir teste bağlıdır; metin
düzenlemesi sırasında sessizce bozulmaz.

İletişim adresi `info@omerfruk.com`; Cloudflare Email Routing ile gmail hesabına
yönleniyor (bkz. `DEPLOY.md`), kişisel gmail adresi sayfada geçmez.

Telefon numarası bilinçli olarak yayınlanmıyor (`contact.phone: null`). Yayınlamak
istersen `src/data/site.ts` içine numarayı yaz; iletişim bölümü satırı kendiliğinden
ekler.

## Yayına alma

Ayrıntılar: [DEPLOY.md](DEPLOY.md).
