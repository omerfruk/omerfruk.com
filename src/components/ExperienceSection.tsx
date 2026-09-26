import { copy, education, experience } from '../data/site';
import type { TimelineEntry } from '../data/site';
import { t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/**
 * Deneyim ve eğitim. Dikey çizgi ve nokta işaretleri yerine iki sütunlu bir
 * künye listesi: solda tarih, sağda kurum ve rol.
 */
export function ExperienceSection({ lang }: { lang: Lang }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="rule-top section-space">
      <div className="container-page">
        <SectionHeading
          eyebrow={t(copy.experienceEyebrow, lang)}
          titleId="experience-title"
          title={t(copy.experienceTitle, lang)}
        />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <EntryList entries={experience} lang={lang} />

          <div>
            <h3 className="eyebrow">{t(copy.educationTitle, lang)}</h3>
            <div className="mt-4">
              <EntryList entries={education} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EntryList({ entries, lang }: { entries: readonly TimelineEntry[]; lang: Lang }) {
  return (
    <ul>
      {entries.map((entry, i) => (
        <li key={entry.org}>
          <Reveal delay={Math.min(i, 3) * 0.04}>
            <div className="row flex flex-col gap-1.5 py-6 sm:flex-row sm:gap-8">
              <p className="meta sm:w-44 sm:shrink-0 sm:pt-1">
                {t(entry.period, lang)}
                {entry.current && (
                  <span className="ml-2 text-accent">· {t(copy.currentBadge, lang)}</span>
                )}
              </p>
              <div>
                <h4 className="display-sm text-ink">{entry.org}</h4>
                <p className="mt-1 text-[0.9375rem] text-muted">{t(entry.title, lang)}</p>
                <p className="meta mt-0.5">{t(entry.meta, lang)}</p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
