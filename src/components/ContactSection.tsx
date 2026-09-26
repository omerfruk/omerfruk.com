import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
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
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="rule-top section-space relative overflow-hidden bg-canvas-deep"
    >
      <div aria-hidden className="grid-veil pointer-events-none absolute inset-0" />

      <div className="container-page relative z-10">
        <SectionHeading
          index="04"
          eyebrow={t(copy.contactEyebrow, lang)}
          titleId="contact-title"
          title={t(copy.contactTitle, lang)}
          description={t(profile.about, lang)}
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Birincil adres: sayfadaki en büyük bağlantı. */}
          <Reveal>
            <a
              href={`mailto:${contact.email}`}
              className="group block border-b border-line pb-6 transition-colors hover:border-accent-dim"
            >
              <span className="mono-label flex items-center gap-2 text-faint">
                <Mail aria-hidden className="size-3.5" />
                {t(copy.contactEmailLabel, lang)}
              </span>
              {/* Adres uzun; başlık ölçeğinden bir tık küçük tutulup yalnızca
                  gerekirse sarılıyor, böylece "…gmail." / "com" diye bölünmüyor. */}
              <span className="font-display mt-4 flex items-start gap-3 text-[clamp(1.375rem,1rem+1.7vw,2.25rem)] font-medium leading-tight tracking-[-0.03em] break-words text-ink transition-colors group-hover:text-accent">
                {contact.email}
                <ArrowUpRight
                  aria-hidden
                  className="mt-1.5 size-5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>
            </a>

            <dl className="mt-8 flex flex-col gap-5 sm:flex-row sm:gap-12">
              <div>
                <dt className="mono-label flex items-center gap-2 text-faint">
                  <MapPin aria-hidden className="size-3.5" />
                  {t(copy.contactLocationLabel, lang)}
                </dt>
                <dd className="mt-2 text-ink">{t(contact.location, lang)}</dd>
              </div>

              {/* Telefon yalnızca site.ts içinde bir numara tanımlıysa görünür. */}
              {contact.phone && (
                <div>
                  <dt className="mono-label flex items-center gap-2 text-faint">
                    <Phone aria-hidden className="size-3.5" />
                    {t(copy.contactPhoneLabel, lang)}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="link-quiet text-ink"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <p className="mono-meta mt-8 inline-flex items-center gap-2.5 rounded-lg border border-line bg-surface px-4 py-2.5 text-muted">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {t(contact.availability, lang)}
            </p>
          </Reveal>

          {/* İkincil profiller. */}
          <Reveal delay={0.08}>
            <h3 className="mono-label border-b border-line pb-4 text-muted">
              {t(copy.contactElsewhere, lang)}
            </h3>
            <ul>
              {contact.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener me"
                    className="group flex items-baseline justify-between gap-4 border-b border-line-soft py-4 transition-colors hover:border-accent-dim"
                  >
                    <span className="font-display text-lg font-medium text-ink transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                    <span className="mono-meta flex items-center gap-2 truncate text-faint">
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
