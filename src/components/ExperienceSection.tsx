import { copy, education, experience } from '../data/site';
import type { TimelineEntry } from '../data/site';
import { t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/** Deneyim ve eğitim: tek dikey çizgi üzerinde okunan iki liste. */
export function ExperienceSection({ lang }: { lang: Lang }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="rule-top section-space">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow={t(copy.experienceEyebrow, lang)}
          titleId="experience-title"
          title={t(copy.experienceTitle, lang)}
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Timeline entries={experience} lang={lang} />

          <div>
            <h3 className="mono-label border-b border-line pb-4 text-muted">
              {t(copy.educationTitle, lang)}
            </h3>
            <div className="mt-2">
              <Timeline entries={education} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline({ entries, lang }: { entries: readonly TimelineEntry[]; lang: Lang }) {
  return (
    <ol className="relative border-l border-line">
      {entries.map((entry, i) => (
        <Reveal key={entry.org} delay={Math.min(i, 3) * 0.05}>
          <li className="relative py-5 pl-6 sm:pl-8">
            {/* Çizgi üzerindeki işaret; devam eden kayıt vurgulu. */}
            <span
              aria-hidden
              className={
                entry.current
                  ? 'absolute -left-[4.5px] top-[1.9rem] size-2 rounded-full bg-accent'
                  : 'absolute -left-[3.5px] top-[2.05rem] size-1.5 rounded-full bg-line ring-2 ring-canvas'
              }
            />
            <p className="mono-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-faint">
              <span>{t(entry.period, lang)}</span>
              {entry.current && (
                <span className="mono-label rounded border border-accent-dim px-1.5 py-0.5 text-accent">
                  {t(copy.currentBadge, lang)}
                </span>
              )}
            </p>
            <h4 className="display-md mt-2.5 text-ink">{entry.org}</h4>
            <p className="mt-1.5 text-[0.9375rem] text-muted">{t(entry.title, lang)}</p>
            <p className="mono-meta mt-1 text-faint">{t(entry.meta, lang)}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
