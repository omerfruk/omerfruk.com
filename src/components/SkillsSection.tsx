import { copy, skillGroups } from '../data/site';
import { t, tAny } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/**
 * Yetkinlikler. Kutulu sütunlar ve madde imleri yerine dört adlandırılmış
 * liste: başlık serif, maddeler virgülsüz alt alta. Rozet bulutu yok.
 */
export function SkillsSection({ lang }: { lang: Lang }) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="rule-top section-space bg-canvas-deep"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow={t(copy.skillsEyebrow, lang)}
          titleId="skills-title"
          title={t(copy.skillsTitle, lang)}
          description={t(copy.skillsDescription, lang)}
        />

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title.en} delay={Math.min(i, 3) * 0.05}>
              <h3 className="display-sm border-b border-line pb-3 text-ink">
                {t(group.title, lang)}
              </h3>
              <ul className="mt-4 space-y-1.5">
                {group.items.map((item) => {
                  const key = typeof item === 'string' ? item : item.en;
                  return (
                    <li key={key} className="text-[0.9375rem] text-muted">
                      {tAny(item, lang)}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
