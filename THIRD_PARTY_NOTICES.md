# Üçüncü taraf bileşenler

## Watermelon UI

Sitenin üç bölümü [Watermelon UI](https://ui.watermelon.sh/) bloklarından
uyarlandı. Kaynak depo:
[WatermelonCorp/watermelon-platform](https://github.com/WatermelonCorp/watermelon-platform),
referans revizyon **`51db104dead7ce6125b953c5ec0802675b7c43bf`**.

| Bu sitedeki bölüm | Kaynak | Ne değişti |
| --- | --- | --- |
| `src/components/Hero.tsx` ve `src/components/Header.tsx` | [hero-35/index.tsx](https://github.com/WatermelonCorp/watermelon-platform/blob/51db104dead7ce6125b953c5ec0802675b7c43bf/src/data/contents/blocks/hero/hero-35/index.tsx) | İki sütunlu alt yerleşim, yukarıdan inen navigasyon ve kelime kelime giren başlık fikri alındı. Arka plan fotoğrafı, Watermelon logosu, sahte bağlantılar ve "Book Demo" düğmesi çıkarıldı; fotoğraf yerine CSS ölçü ızgarası kondu. Başlık hareketi `framer-motion`'dan CSS animasyonuna çevrildi (önceden render edilen HTML JS beklemeden görünsün ve LCP ölçülebilsin diye). Başlık kelimeleri arasına gerçek boşluk eklendi. Mobil menü paneli, odak tuzağı, kaydırma kilidi, `aria-expanded`/`aria-controls` ve dil anahtarı burada yazıldı. |
| `src/components/WorkSection.tsx` | [career-3/index.tsx](https://github.com/WatermelonCorp/watermelon-platform/blob/51db104dead7ce6125b953c5ec0802675b7c43bf/src/data/contents/blocks/career/career-3/index.tsx) | Alan filtresi + kart grid'i düzeni alındı. `react-icons` yerine Lucide kullanıldı; `Badge`/`Button` bağımlılıkları kaldırıldı. Çok katmanlı `shadow-[inset...]` yüzeyi, koyu zemine uygun tek çizgili föy çerçevesine ve köşe işaretlerine dönüştürüldü. Maaş/konum alanları yerine teknoloji rozetleri ve kapalı depo işareti kondu; filtre düğmeleri `aria-pressed` ile işaretlendi. |
| `src/components/Footer.tsx` | [footer-25/index.tsx](https://github.com/WatermelonCorp/watermelon-platform/blob/51db104dead7ce6125b953c5ec0802675b7c43bf/src/data/contents/blocks/footer/footer-25/index.tsx) | Büyük kelime markası, büyük gezinme bağlantıları ve soldan uzanan çizgili sosyal şerit alındı. Bülten formu, arka plan görseli, `@hugeicons` bağımlılığı ve sahte hukuki metin çıkarıldı. SVG `textLength` yerine akışkan `clamp()` ölçüsü kullanıldı: font yüklenmeden de doğru görünüyor ve Türkçe karakterler bozulmuyor. |

Watermelon UI deposunun tamamı bu projeye bağımlılık olarak alınmadı; yalnızca
yukarıdaki dosyaların kaynak kodu okunarak uyarlandı.

### MIT License (Watermelon UI)

```
MIT License

Copyright (c) 2026 Watermelon Platform Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Yazı tipleri

Üçü de **SIL Open Font License 1.1** ile dağıtılıyor ve `public/fonts/` altında
yerel olarak sunuluyor. Dosyalar Google Fonts'un latin + latin-ext altkümeleridir
(`npm run fonts` ile yenilenir).

| Font | Telif | Kaynak |
| --- | --- | --- |
| Space Grotesk | Copyright Florian Karsten | https://fonts.google.com/specimen/Space+Grotesk |
| Inter | Copyright The Inter Project Authors | https://fonts.google.com/specimen/Inter |
| JetBrains Mono | Copyright JetBrains s.r.o. | https://fonts.google.com/specimen/JetBrains+Mono |

Lisans metni: https://openfontlicense.org/open-font-license-official-text/

## Kütüphaneler

| Paket | Lisans |
| --- | --- |
| react, react-dom | MIT |
| motion | MIT |
| lucide-react | ISC |
| tailwindcss | MIT |
| vite, @vitejs/plugin-react | MIT |
| typescript | Apache-2.0 |
| @playwright/test | Apache-2.0 |
