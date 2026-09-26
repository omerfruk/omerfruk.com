import { useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { copy, projects, workFilters } from '../data/site';
import type { Project, WorkGroup } from '../data/site';
import { t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { cn } from '../lib/cn';

/**
 * Seçili projeler. Watermelon UI career-3'ün alan filtresi + kart grid'i
 * düzeninden uyarlandı; kartlar parlayan yüzey yerine teknik föy çerçevesine
 * dönüştürüldü (bkz. THIRD_PARTY_NOTICES.md).
 */
export function WorkSection({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<WorkGroup | 'all'>('all');
  const visible = active === 'all' ? projects : projects.filter((p) => p.group === active);

  return (
    <section id="work" aria-labelledby="work-title" className="rule-top section-space">
      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow={t(copy.workEyebrow, lang)}
          titleId="work-title"
          title={t(copy.workTitle, lang)}
          description={t(copy.workDescription, lang)}
        />

        <Reveal>
          <div
            role="group"
            aria-label={t(copy.workFilterLabel, lang)}
            className="mt-10 flex flex-wrap gap-2"
          >
            {workFilters.map((filter) => {
              const selected = active === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(filter.id)}
                  className={cn(
                    'mono-label rounded-md border px-3.5 py-2 transition-colors',
                    selected
                      ? 'border-accent-dim bg-surface text-accent'
                      : 'border-line text-muted hover:border-faint hover:text-ink',
                  )}
                >
                  {t(filter.label, lang)}
                </button>
              );
            })}
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <p className="mt-12 py-16 text-center text-muted">{t(copy.workEmpty, lang)}</p>
        ) : (
          <ul data-testid="project-list" className="mt-8 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
            {visible.map((project, i) => (
              <li key={project.id} className="h-full">
                <Reveal delay={Math.min(i, 3) * 0.05} className="h-full">
                  <ProjectCard project={project} lang={lang} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const isPublic = project.href !== null;

  // Herkese açık projede bütün kart tıklanabilir; kapalı projede bağlantı yok.
  const Wrapper = isPublic ? 'a' : 'div';
  const wrapperProps = isPublic
    ? {
        href: project.href as string,
        target: '_blank',
        rel: 'noreferrer noopener',
        'aria-label': `${project.title} — ${t(copy.workViewRepo, lang)}`,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'card card-ticks group flex h-full flex-col p-6 transition-colors duration-300 sm:p-7',
        isPublic && 'hover:border-accent-dim hover:bg-surface-hi',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="display-md text-ink">{project.title}</h3>
        {isPublic ? (
          <ArrowUpRight
            aria-hidden
            className="mt-1 size-5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        ) : (
          <span className="mono-label mt-1.5 flex shrink-0 items-center gap-1.5 text-faint">
            <Lock aria-hidden className="size-3" />
            <span className="sr-only sm:not-sr-only">{t(copy.workPrivate, lang)}</span>
          </span>
        )}
      </div>

      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
        {t(project.summary, lang)}
      </p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="mono-meta rounded border border-line-soft bg-canvas px-2 py-1 text-faint"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
