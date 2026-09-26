import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { contact, copy, nav, profile, repoUrl } from '../data/site';
import { otherLang, pathForLang, t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';

/** Kapanış: künye tekrarı, gezinme, profiller ve telif satırı. */
export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const other = otherLang(lang);

  return (
    <footer className="rule-top bg-canvas-deep">
      <div className="container-page pt-16 pb-12 sm:pt-20">
        <Reveal>
          <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-16">
            <div>
              <p className="display-lg max-w-[14ch] text-balance text-ink">{profile.name}</p>
              <p className="meta mt-3">
                {t(profile.role, lang)} · {t(contact.location, lang)}
              </p>
            </div>

            <div className="flex gap-14 sm:gap-20">
              <nav aria-label={t(copy.contactEyebrow, lang)} className="flex flex-col gap-2">
                {nav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="w-fit text-[0.9375rem] text-muted transition-colors hover:text-accent"
                  >
                    {t(item.label, lang)}
                  </a>
                ))}
              </nav>

              <ul className="flex flex-col gap-2">
                {contact.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener me"
                      className="group flex w-fit items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={pathForLang(other)}
                    hrefLang={other}
                    className="w-fit text-[0.9375rem] text-muted transition-colors hover:text-accent"
                  >
                    {t(copy.langSwitchLabel, lang)}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">
            © {year} {profile.name}. {t(copy.footerRights, lang)}
          </p>
          <div className="meta flex items-center gap-6">
            <a href={repoUrl} target="_blank" rel="noreferrer noopener" className="link-quiet">
              {t(copy.footerNote, lang)}
            </a>
            <a
              href="#top"
              className="group flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              {t(copy.backToTop, lang)}
              <ArrowUp
                aria-hidden
                className="size-3.5 transition-transform group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
