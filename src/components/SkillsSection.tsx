import { copy, skillGroups } from '../data/site';
import { t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/**
 * Yetkinlikler. Rozet bulutu yerine dört adlandırılmış sütun: okuyan kişi
 * neyin nereye ait olduğunu tararken görür.
 */
export function SkillsSection({ lang }: { lang: Lang }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="rule-top section-space">
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow={t(copy.skillsEyebrow, lang)}
          titleId="skills-title"
          title={t(copy.skillsTitle, lang)}
          description={t(copy.skillsDescription, lang)}
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title.en} delay={Math.min(i, 3) * 0.06} className="bg-canvas">
              <div className="h-full px-6 py-7">
                <h3 className="mono-label flex items-center gap-3 text-accent">
                  <span className="text-accent-dim">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-muted">{t(group.title, lang)}</span>
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-2.5 text-[0.9375rem] text-ink"
                    >
                      <span aria-hidden className="size-1 shrink-0 rounded-full bg-accent-dim" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
