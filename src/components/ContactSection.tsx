import { ArrowUpRight } from 'lucide-react';
import { contact, copy, profile } from '../data/site';
import { t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/**
 * İletişim. Form yok: tek bir e-posta adresi ve doğrulanmış profiller, formdan
 * daha hızlı ve arkasında sunucu gerektirmiyor.
 */
export function ContactSection({ lang }: { lang: Lang }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="rule-top section-space">
      <div className="container-page">
        <SectionHeading
          eyebrow={t(copy.contactEyebrow, lang)}
          titleId="contact-title"
          title={t(copy.contactTitle, lang)}
          description={t(profile.about, lang)}
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          {/* Birincil adres: sayfadaki en büyük bağlantı. */}
          <Reveal>
            <a href={`mailto:${contact.email}`} className="group block">
              <span className="eyebrow">{t(copy.contactEmailLabel, lang)}</span>
              <span className="display-lg mt-3 flex items-start gap-3 break-words text-ink transition-colors group-hover:text-accent">
                {contact.email}
                <ArrowUpRight
                  aria-hidden
                  className="mt-2 size-6 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>
            </a>

            <dl className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-14">
              <div>
                <dt className="eyebrow">{t(copy.contactLocationLabel, lang)}</dt>
                <dd className="mt-2 text-ink">{t(contact.location, lang)}</dd>
              </div>

              {/* Telefon yalnızca site.ts içinde bir numara tanımlıysa görünür. */}
              {contact.phone && (
                <div>
                  <dt className="eyebrow">{t(copy.contactPhoneLabel, lang)}</dt>
                  <dd className="mt-2">
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="link-quiet">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <p className="mt-10 max-w-[44ch] border-l-2 border-accent-soft pl-5 text-muted">
              {t(contact.availability, lang)}
            </p>
          </Reveal>

          {/* İkincil profiller. */}
          <Reveal delay={0.08}>
            <h3 className="eyebrow">{t(copy.contactElsewhere, lang)}</h3>
            <ul className="mt-4">
              {contact.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener me"
                    className="row group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="display-sm text-ink transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                    <span className="meta flex items-center gap-2 truncate">
                      {link.handle}
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
