import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { contact, copy, nav, profile, repoUrl } from '../data/site';
import { otherLang, pathForLang, t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';

/**
 * Kapanış. Watermelon UI footer-25'in büyük kelime markası + sosyal şerit
 * düzeninden uyarlandı; bülten formu, arka plan görseli ve sahte hukuki metin
 * çıkarıldı (bkz. THIRD_PARTY_NOTICES.md).
 */
export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const other = otherLang(lang);

  return (
    <footer className="rule-top bg-canvas-deep">
      <div className="container-page pt-16 pb-10 sm:pt-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between sm:gap-16">
          <nav aria-label={t(copy.contactEyebrow, lang)} className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-display w-fit text-2xl font-medium tracking-tight text-ink transition-colors hover:text-accent sm:text-3xl"
              >
                {t(item.label, lang)}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <a
              href={pathForLang(other)}
              hrefLang={other}
              className="mono-label rounded border border-line px-3 py-1.5 text-muted transition-colors hover:border-accent-dim hover:text-ink"
            >
              {t(copy.langSwitchLabel, lang)}
            </a>
            <a
              href="#top"
              className="mono-meta group flex items-center gap-2 text-faint transition-colors hover:text-ink"
            >
              {t(copy.backToTop, lang)}
              <ArrowUp
                aria-hidden
                className="size-3.5 transition-transform group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Sosyal şerit: soldan uzanan saç teli çizgi, sağda profiller. */}
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-20">
          <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener me"
              className="mono-label group flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
            >
              {link.label}
              <ArrowUpRight
                aria-hidden
                className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>

        {/* Büyük kelime markası: masaüstünde tek satır, dar ekranda iki satır. */}
        <Reveal className="mt-10">
          <p
            aria-hidden
            className="font-display font-medium leading-[0.88] tracking-[-0.05em] text-ink/90"
            style={{ fontSize: 'clamp(2.75rem, 11.2vw, 9.5rem)' }}
          >
            <span className="block lg:inline">Ömer Faruk</span>{' '}
            <span className="block lg:inline">Taşdemir</span>
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-meta text-faint">
            © {year} {profile.name}. {t(copy.footerRights, lang)}
          </p>
          <p className="mono-meta text-faint">
            <a href={repoUrl} target="_blank" rel="noreferrer noopener" className="link-quiet">
              {t(copy.footerNote, lang)}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
