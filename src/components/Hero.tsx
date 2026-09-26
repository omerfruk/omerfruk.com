import { ArrowRight } from 'lucide-react';
import { contact, copy, heroFacts, profile } from '../data/site';
import { t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';

/**
 * Giriş: dergi manşeti gibi. İsim künyede (Header) duruyor, buradaki H1 ne
 * yaptığını söylüyor.
 *
 * Hareket motion yerine CSS animasyonu — önceden render edilen HTML, JS
 * beklemeden görünür ve tarayıcı ilk boyamayı LCP olarak sayabilir.
 */
export function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-28">
      <div className="container-page">
        <p className="eyebrow animate-enter">{t(profile.role, lang)}</p>

        <h1
          className="display-xl animate-enter mt-6 max-w-[17ch] text-balance text-ink"
          style={{ animationDelay: '0.08s' }}
        >
          {t(profile.headline, lang)}
        </h1>

        <p className="lead animate-enter mt-8 max-w-[52ch]" style={{ animationDelay: '0.16s' }}>
          {t(profile.intro, lang)}
        </p>

        <div
          className="animate-enter mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ animationDelay: '0.24s' }}
        >
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-2 text-[1.0625rem] font-medium text-accent"
          >
            <span className="underline decoration-accent-soft underline-offset-[6px] transition-colors group-hover:decoration-accent">
              {t(copy.heroPrimaryCta, lang)}
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-[1.0625rem] text-muted transition-colors hover:text-ink"
          >
            <span className="underline decoration-line underline-offset-[6px] transition-colors group-hover:decoration-faint">
              {t(copy.heroSecondaryCta, lang)}
            </span>
          </a>
        </div>

        {/* Künye satırı: kutu veya sayaç değil, ince çizginin altında düz bilgi. */}
        <p
          className="meta animate-enter mt-14 border-t border-line pt-5"
          style={{ animationDelay: '0.32s' }}
        >
          {heroFacts.map((fact, i) => (
            <span key={fact.en}>
              {i > 0 && (
                <span aria-hidden className="mx-2.5 text-line">
                  ·
                </span>
              )}
              {t(fact, lang)}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
