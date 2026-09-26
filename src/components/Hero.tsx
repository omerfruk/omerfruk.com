import { Fragment } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { contact, copy, heroStats, profile } from '../data/site';
import { t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';

/**
 * Giriş bölümü. Watermelon UI hero-35'in iki sütunlu alt yerleşiminden ve
 * kelime kelime giren başlık fikrinden uyarlandı (bkz. THIRD_PARTY_NOTICES.md).
 * Arka plan fotoğrafı yerine ölçü ızgarası kullanıldı; hareket motion yerine
 * CSS animasyonu — böylece önceden render edilen HTML, JS beklemeden görünür
 * ve tarayıcı ilk boyamayı LCP olarak sayabilir.
 */
export function Hero({ lang }: { lang: Lang }) {
  const words = profile.name.split(' ');

  return (
    <section className="relative flex flex-col overflow-hidden pt-28 pb-16 sm:pt-32 lg:min-h-[92svh] lg:pt-40 lg:pb-14">
      <div aria-hidden className="grid-veil pointer-events-none absolute inset-0" />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-between gap-16 lg:gap-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          {/* Sol sütun: rol etiketi, isim ve teknoloji şeridi. */}
          <div className="lg:flex-1">
            <p className="mono-label animate-enter flex items-center gap-2.5 text-accent">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {t(profile.role, lang)}
            </p>

            {/* Kelimeler ayrı ayrı girsin diye span'lere bölünür, ama aralarına
                gerçek boşluk konur: aksi halde metin "ÖmerFarukTaşdemir" olarak
                okunur, kopyalanır ve dizine girer. */}
            <h1 className="display-xl mt-6 text-balance text-ink">
              {words.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && ' '}
                  <span
                    className="animate-enter inline-block"
                    style={{ animationDelay: `${0.08 + i * 0.08}s` }}
                  >
                    {word}
                  </span>
                </Fragment>
              ))}
            </h1>

            <p
              className="mono-meta animate-enter mt-7 text-muted"
              style={{ animationDelay: '0.34s' }}
            >
              {profile.stackLine}
            </p>
          </div>

          {/* Sağ sütun: kısa tanıtım ve iki eylem. */}
          <div
            className="animate-enter flex w-full flex-col items-start gap-7 lg:w-[26rem] lg:shrink-0"
            style={{ animationDelay: '0.42s' }}
          >
            <p className="lead text-pretty text-muted">{t(profile.intro, lang)}</p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-white"
              >
                {t(copy.heroPrimaryCta, lang)}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-dim hover:bg-surface"
              >
                {t(copy.heroSecondaryCta, lang)}
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Ölçü şeridi: üç kısa bilgi, saç teli çizgilerle ayrılmış. */}
        <dl
          className="animate-enter grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3"
          style={{ animationDelay: '0.5s' }}
        >
          {heroStats.map((stat) => (
            <div key={stat.label.en} className="bg-canvas px-5 py-5 sm:px-6">
              <dt className="mono-label text-faint">{t(stat.label, lang)}</dt>
              <dd className="font-display mt-2 text-lg font-medium tracking-tight text-ink">
                {t(stat.value, lang)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
