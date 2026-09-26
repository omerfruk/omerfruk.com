import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { WorkSection } from './components/WorkSection';
import { copy } from './data/site';
import { t } from './lib/i18n';
import type { Lang } from './lib/i18n';

/** Sayfanın tamamı. Dil, prerender ve istemcide yol adından türer (lib/i18n.ts). */
export default function App({ lang }: { lang: Lang }) {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        {t(copy.skipToContent, lang)}
      </a>

      <Header lang={lang} />

      <main id="top">
        <Hero lang={lang} />
        <WorkSection lang={lang} />
        <SkillsSection lang={lang} />
        <ExperienceSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </>
  );
}
