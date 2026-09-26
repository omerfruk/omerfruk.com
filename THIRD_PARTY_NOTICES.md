# Üçüncü taraf bileşenler

## Watermelon UI

Sitenin ilk sürümü [Watermelon UI](https://ui.watermelon.sh/) bloklarından
uyarlanmıştı (hero-35, career-3, footer-25). Tasarım sonradan sıcak/editoryal bir
yöne taşınınca o uyarlamaların görsel tarafı — koyu zemin, kart yüzeyleri, büyük
kelime markası, mono etiketler — tamamen değiştirildi.

Bugün kalan tek iz **projeler bölümündeki alan filtresi + liste** fikridir;
[career-3](https://github.com/WatermelonCorp/watermelon-platform/blob/51db104dead7ce6125b953c5ec0802675b7c43bf/src/data/contents/blocks/career/career-3/index.tsx)
bloğunun "seçili sekme listeyi daraltır" düzeninden geliyor. Kod birebir alınmadı:
`react-icons`, `Badge` ve `Button` bağımlılıkları kullanılmadı, kart grid'i saç teli
çizgilerle ayrılmış bir listeye dönüştürüldü, filtre düğmeleri `aria-pressed` ile
işaretlendi.

Kaynak depo:
[WatermelonCorp/watermelon-platform](https://github.com/WatermelonCorp/watermelon-platform),
referans revizyon **`51db104dead7ce6125b953c5ec0802675b7c43bf`**. Deponun tamamı
bu projeye bağımlılık olarak alınmadı.

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

İkisi de **SIL Open Font License 1.1** ile dağıtılıyor ve `public/fonts/` altında
yerel olarak sunuluyor. Dosyalar Google Fonts'un latin + latin-ext altkümeleridir
(`npm run fonts` ile yenilenir).

| Font | Kullanım | Telif | Kaynak |
| --- | --- | --- | --- |
| Fraunces | Başlıklar | Copyright The Fraunces Project Authors | https://fonts.google.com/specimen/Fraunces |
| Inter | Gövde metni | Copyright The Inter Project Authors | https://fonts.google.com/specimen/Inter |

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
| prettier | MIT |
