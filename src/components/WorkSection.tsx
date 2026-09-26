import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { copy, projects, workFilters } from '../data/site';
import type { Project, WorkGroup } from '../data/site';
import { t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { cn } from '../lib/cn';

/**
 * Seçili projeler. Kart grid'i yerine editoryal liste: her proje saç teli
 * çizgiyle ayrılmış bir satır. Başlıklar aynı sol kenardan okunuyor ve sayfa
 * dergi içindekiler sayfası gibi taranabiliyor.
 */
export function WorkSection({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<WorkGroup | 'all'>('all');
  const visible = active === 'all' ? projects : projects.filter((p) => p.group === active);

  return (
    <section id="work" aria-labelledby="work-title" className="rule-top section-space">
      <div className="container-page">
        <SectionHeading
          eyebrow={t(copy.workEyebrow, lang)}
          titleId="work-title"
          title={t(copy.workTitle, lang)}
          description={t(copy.workDescription, lang)}
        />

        <Reveal>
          <div
            role="group"
            aria-label={t(copy.workFilterLabel, lang)}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2"
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
                    'py-1 text-[0.9375rem] underline-offset-[6px] transition-colors',
                    selected
                      ? 'text-accent underline decoration-accent'
                      : 'text-muted hover:text-ink',
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
          <ul data-testid="project-list" className="mt-8">
            {visible.map((project, i) => (
              <li key={project.id}>
                <Reveal delay={Math.min(i, 4) * 0.04}>
                  <ProjectRow project={project} lang={lang} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function ProjectRow({ project, lang }: { project: Project; lang: Lang }) {
  const isPublic = project.href !== null;

  // Herkese açık projede bütün satır tıklanabilir; kapalı projede bağlantı yok.
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
        'row group block py-8 sm:py-9',
        isPublic && 'hover:bg-canvas-deep sm:hover:px-6',
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:gap-12">
        <div className="lg:w-[38%] lg:shrink-0">
          <h3 className="display-md flex items-start gap-2 text-ink transition-colors group-hover:text-accent">
            {project.title}
            {isPublic && (
              <ArrowUpRight
                aria-hidden
                className="mt-1.5 size-[1.1rem] shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            )}
          </h3>
          <p className="tag-list mt-3">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
            {!isPublic && <span className="text-accent">{t(copy.workPrivate, lang)}</span>}
          </p>
        </div>

        <p className="max-w-[58ch] text-muted lg:flex-1">{t(project.summary, lang)}</p>
      </div>
    </Wrapper>
  );
}
