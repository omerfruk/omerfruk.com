# omerfruk.com — proje notları

Ömer Faruk Taşdemir'in kişisel sitesi. İki dilli, statik, Cloudflare Pages'te
`omerfruk.com` kök alan adında yayında. Genel bakış: `README.md`, yayın: `DEPLOY.md`,
lisans/uyarlama kaydı: `THIRD_PARTY_NOTICES.md`.

## Komutlar

```bash
npm run dev          # http://localhost:5173
npm run build        # tsc + vite build + her dil için prerender → dist/
npm run preview      # http://localhost:4399 (production)
npm run test:e2e     # Playwright (20 test)
npm run screenshots  # preview açıkken → docs/screenshots/
npm run og           # public/og.png
npm run fonts        # public/fonts/*.woff2
npm run deploy       # build + Cloudflare Pages
```

Değişiklikten sonra en az `npm run build` ve `npm run test:e2e` çalıştır; görsel
değişiklikte 390 px ve 1440 px ekran görüntülerine bak.

**Port 4399 bilinçli seçildi**: bu makinede 4173, 4180 ve 4181 başka projelerin
preview sunucuları tarafından kullanılıyor. Port değiştirirken `package.json`,
`playwright.config.ts` ve `scripts/screenshots.mjs` birlikte güncellenmeli.

## Yapı

- Metinlerin tamamı `src/data/site.ts` içinde `{ en, tr }` çiftleri hâlinde.
  Bileşenlere sabit metin yazma; `t(değer, lang)` kullan.
- Dil yol adından türer (`src/lib/i18n.ts`): `/tr/…` Türkçe, kalanı İngilizce.
  Aynı kural prerender'da ve tarayıcıda geçerli olduğu için hydrate farkı oluşmaz.
  Dil için state, effect veya çerez ekleme — dil anahtarı sıradan bir bağlantıdır.
- Tasarım sistemi `src/styles/globals.css` içindeki token'lar ve `@utility`
  tanımlarıdır: `display-xl/lg/md`, `lead`, `mono-label`, `mono-meta`, `card`,
  `card-ticks`, `grid-veil`, `link-quiet`, `container-page`, `section-space`,
  `rule-top`. Bileşende tek tek font ölçüsü veya renk uydurma, bu ölçeği kullan.
- Vurgu rengi (`--color-accent`, `#5fd3e3`) yalnızca mono etiket, bölüm numarası
  ve etkileşimde kullanılır. Gövde metni veya büyük yüzey rengi yapma; koyu
  zeminde kontrastı yetiyor ama fazlası tasarımın ölçüsünü bozuyor.
- Bölüm başlıkları `components/ui/SectionHeading.tsx` ile kurulur (numara + mono
  etiket + başlık). Bölüm sırası: Hero → 01 Projeler → 02 Yetkinlikler →
  03 Deneyim → 04 İletişim → footer.
- Sayfa build'de önceden render edilir ve `hydrateRoot` ile devralınır.
  Sunucu/istemci farkı yaratacak kod yazma (`window`/`document` yalnızca effect
  içinde). Mobil menü portal değil, yerinde render edilir — bilinçli.

## Tuzaklar (hepsi bir kez yaşandı)

- **Hero başlığındaki kelimeler**: ayrı ayrı girsinler diye `<span>`'lere bölünüyor,
  ama aralarında **gerçek boşluk** olmalı. `margin` ile ayırmak görsel olarak
  doğru görünür fakat metin "ÖmerFarukTaşdemir" olarak okunur, kopyalanır ve
  dizine girer. Teste bağlandı.
- **`grid-veil` katmanı**: `body`'nin opak arka planı `-z-10` katmanını örtüyor.
  Veil normal `absolute inset-0` kalmalı, içerik `relative z-10` ile kaldırılmalı.
- **Hero hareketi CSS animasyonudur, motion değil**. Motion'ın `initial` değeri
  SSR çıktısına satır içi `opacity:0` yazıyor; JS yüklenene kadar hero boş
  görünüyor. Keyframe başlangıç opaklığı 0 değil **0,01** — 0 yapılırsa Lighthouse
  LCP ölçemiyor.
- **Kart grid'i**: `<ul>`'un doğrudan çocuğu `<li>` olmalı. `Reveal` sarmalayıcı
  `<li>`'nin **içine** girer, dışına değil; aksi halde `ul > div > li` çıkıyor ve
  eşit yükseklik zinciri (`h-full`) kopuyor.
- **Proje listesi seçicisi** `[data-testid="project-list"] > li` — `#work ul > li`
  kartların içindeki teknoloji rozetlerini de yakalıyor.

## İçerik kuralları

- `PROFILE.md`'deki kamuya açık konumlandırma kuralı: sayfada **PHP ve Laravel adı
  geçmez**. Geniş yetkinlik gerektiğinde genel ifade kullanılır. Bu bir teste bağlı
  (`never names the stacks kept out of public positioning`) — testi zayıflatma.
- Yalnızca `PROFILE.md`'de doğrulanmış bilgiler yayınlanır. "Henüz teyit edilmemiş
  bilgiler" başlığındaki maddeler siteye girmez.
- Ev adresi yayınlanmaz; konum yalnızca "Isparta, Türkiye" olarak geçer.
- Telefon numarası `contact.phone: null` ile kapalı. Açmak kullanıcının kararı.
- Sahte yorum, müşteri logosu, yıldız puanı, sayaç veya uydurma metrik ekleme.
