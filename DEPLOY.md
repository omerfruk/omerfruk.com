# Yayına alma

## Nasıl çalışıyor?

Site tamamen **statik**. Sunucu, veritabanı veya API yok.

```
src/ (React + TypeScript)  ──npm run build──▶  dist/  ──npm run deploy──▶  Cloudflare Pages
                                               (iki dilde HTML, CSS, JS, fontlar)
```

1. `npm run build` TypeScript'i kontrol eder, Vite ile paketler ve **her iki dilin**
   HTML'ini önceden üretir: `dist/index.html` (en) ve `dist/tr/index.html` (tr).
   Aynı adımda `dist/sitemap.xml` yazılır.
2. `npm run deploy` önce build alır, sonra `dist/` klasörünü Cloudflare Pages'teki
   **`omerfruk-com`** projesine yükler.
3. Her yükleme yeni bir sürüm oluşturur.

| Adres | Not |
| --- | --- |
| **https://omerfruk.com** | Asıl adres. Bunu paylaş. |
| https://omerfruk.com/tr/ | Türkçe sayfa. |
| https://www.omerfruk.com | Aynı içerik; her sayfanın canonical'ı köke işaret eder. |
| https://omerfruk-com.pages.dev | Aynı içerik; **Türkiye'de engelli** (aşağıya bak). |

`dist/` ve `node_modules/` git'e eklenmez; her cihazda yeniden üretilir.

## Yeni bir cihazda ilk kurulum

Gerekenler: Node.js 24+, git.

Proje Cloudflare'de **kişisel hesapta**: `Omer.fruk3547@gmail.com's Account`
(`73d785f9f383f3ee67ecd78eba36c0c3`). `omerfruk.com` bölgesi de aynı hesapta —
Pages projesi ile alan adının aynı hesapta olması şart, aksi halde hesaplar arası
proxy'li CNAME **Error 1014** verir. `npx wrangler login` onay ekranında bu hesap
seçili olmalı; `npm run deploy` hesabı ayrıca `CLOUDFLARE_ACCOUNT_ID` ile sabitliyor.

```bash
git clone git@github.com:omerfruk/omerfruk.com.git
cd omerfruk.com
npm ci                              # bağımlılıklar (package-lock.json ile birebir)
npx playwright install chromium     # testler, ekran görüntüleri ve OG kartı için
npx wrangler login                  # yalnızca yayına alacaksan
```

## Günlük akış

```bash
git pull
npm run dev                # http://localhost:5173
# ... değişiklikler ...
npm run build              # hata var mı?
npm run test:e2e           # akış testleri
npm run deploy             # yayına al
git add -A && git commit -m "..." && git push
```

## Alan adı kurulumu (bir kez yapıldı)

`omerfruk.com` kök alan adı Pages projesine özel alan adı olarak bağlı:

1. Pages projesi → Custom domains → `omerfruk.com` ve `www.omerfruk.com` eklendi.
2. Kök alan adı için Cloudflare, aynı hesaptaki bölgede **CNAME flattening** ile
   kaydı kendisi oluşturur; turuncu bulut (proxy) **açık** olmalı.
3. Sertifika birkaç dakikada çıkar; o ana kadar adres 522 döndürebilir.

Proxy kapatılırsa ziyaretçi doğrudan `pages.dev` adresine çözümler ve aşağıdaki
engele takılır — **kapatma**.

## E-posta: info@omerfruk.com

Sitedeki iletişim adresi **Cloudflare Email Routing** ile yönlendiriliyor
(26 Eylül 2026'da kuruldu, ücretsiz):

```
info@omerfruk.com  ──▶  omer.fruk3547@gmail.com   (kural: Active)
```

Kurulum bölgeye üç MX kaydı (`route1/2/3.mx.cloudflare.net`) ile bir SPF ve bir
DKIM TXT kaydı ekledi; bunlar Cloudflare tarafından kilitli tutuluyor, elle
silme. Hedef adres Cloudflare hesabının kendi adresi olduğu için doğrulama
adımı gerekmeden `Verified` oldu.

Bu **yalnızca gelen postayı yönlendirir**; adresten e-posta *göndermek* için
Gmail'de Ayarlar → Hesaplar → "Başka bir e-posta adresi ekle" akışıyla
info@omerfruk.com'u gönderen adres olarak tanımlaman gerekir (Cloudflare'in
kendi SMTP'si yok; Gmail'in SMTP'si kullanılır).

Yeni adres eklemek: Cloudflare → Email Routing → Routing rules → Create.

## Önemli: `pages.dev` Türkiye'de engelli

26 Eylül 2026'da ev internetinden (Superonline) yapılan testte:

- `*.pages.dev` adresi DNS'te sağlayıcının kendi IP'sine (213.14.227.50) yönlendiriliyor.
- Doğru Cloudflare IP'siyle bağlanıldığında bile bağlantı TLS el sıkışmasında
  kesiliyor (SNI engeli). Aynı IP `cloudflare.com` adıyla sorunsuz açılıyor.

Sorun cihazda veya sitede değil; alan adına sağlayıcı düzeyinde uygulanan bir
erişim engeli var. **Bu yüzden özel alan adı zorunlu** — `omerfruk.com` sorunsuz
açılıyor, `omerfruk-com.pages.dev` Türkiye'den büyük ihtimalle açılmaz.

Yedek yol — **Netlify:** `netlify.app` aynı ağdan erişilebiliyor.
`npm run build` sonrası `npx netlify-cli deploy --dir=dist --prod`.

## Tuzaklar

- `wrangler`ı proje klasöründe `pages deploy` ile çalıştırma: Vite projesini
  otomatik yapılandırıp `vite.config.ts` ve `package.json` dosyalarını değiştiriyor,
  `wrangler.jsonc` ekliyor. Her zaman `npm run deploy` kullan — `dist/`in geçici
  bir kopyasından yükler.
- `wrangler`ın OAuth kapsamında DNS yazma izni yok. Custom domain ekleme/kaldırma
  Pages API'si ile yapılabiliyor; elle DNS kaydı gerekirse Cloudflare panelinden.
- `public/_headers` dosyası font ve asset'lere bir yıllık önbellek, sayfalara
  güvenlik başlıkları veriyor. Silme.
