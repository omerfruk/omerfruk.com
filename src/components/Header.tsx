import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { copy, nav, profile } from '../data/site';
import { otherLang, pathForLang, t } from '../lib/i18n';
import type { Lang } from '../lib/i18n';
import { useFocusTrap } from '../lib/useFocusTrap';
import { useScrollLock } from '../lib/useScrollLock';
import { cn } from '../lib/cn';

/**
 * Sayfa künyesi: solda tam ad, sağda gezinme. Dergi başlığı gibi kurulur —
 * monogram veya rozet yok.
 */
export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useScrollLock(open);
  useFocusTrap(panelRef, open, close);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Masaüstü genişliğine dönüldüğünde açık kalmış mobil panel kapanır.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && close();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open, close]);

  const other = otherLang(lang);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled && 'border-b border-line bg-canvas/90 backdrop-blur-sm',
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        <a
          href={pathForLang(lang)}
          className="font-display truncate text-base font-medium tracking-[-0.008em] text-ink transition-colors hover:text-accent sm:text-[1.1875rem]"
        >
          {profile.name}
        </a>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <nav aria-label={t(profile.role, lang)} className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[0.9375rem] text-muted transition-colors hover:text-accent"
              >
                {t(item.label, lang)}
              </a>
            ))}
          </nav>

          <span aria-hidden className="hidden h-4 w-px bg-line lg:block" />

          {/* 360 px altında künyeyi taşırıyor; orada menü panelinde duruyor. */}
          <a
            href={pathForLang(other)}
            hrefLang={other}
            title={t(copy.langSwitchTitle, lang)}
            className="hidden text-[0.9375rem] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent-soft min-[360px]:inline"
          >
            {t(copy.langSwitchLabel, lang)}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? copy.closeMenu : copy.openMenu, lang)}
            className="-mr-2 flex size-10 items-center justify-center rounded text-ink transition-colors hover:text-accent lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobil panel. Portal yerine yerinde render edilir; sunucu/istemci farkı oluşmaz. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-canvas lg:hidden"
      >
        <nav className="container-page flex flex-col py-2">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={close}
              className="display-sm border-b border-line-soft py-4 text-ink last:border-b-0"
            >
              {t(item.label, lang)}
            </a>
          ))}
          <a
            href={pathForLang(other)}
            hrefLang={other}
            className="display-sm py-4 text-muted min-[360px]:hidden"
          >
            {t(copy.langSwitchLabel, lang)}
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
