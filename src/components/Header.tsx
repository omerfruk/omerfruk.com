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
 * Üstte sabit duran gezinme. Watermelon UI hero-35'in yukarıdan inen nav
 * hareketinden uyarlandı; mobil panel, dil anahtarı ve erişilebilirlik
 * davranışları burada tamamlandı (bkz. THIRD_PARTY_NOTICES.md).
 */
export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useScrollLock(open);
  useFocusTrap(panelRef, open, close);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled && 'border-b border-line bg-canvas/85 backdrop-blur-md',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-18">
        <a
          href={pathForLang(lang)}
          className="group flex items-baseline gap-2.5 whitespace-nowrap"
          aria-label={profile.name}
        >
          <span className="font-display text-lg font-medium tracking-tight text-ink">
            {profile.monogram}
          </span>
          <span className="mono-meta hidden text-faint transition-colors group-hover:text-muted sm:inline">
            {t(profile.role, lang).toLowerCase()}
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label={t(profile.role, lang)} className="hidden items-center lg:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="mono-meta rounded px-3 py-2 text-muted transition-colors hover:text-ink"
              >
                {t(item.label, lang)}
              </a>
            ))}
          </nav>

          <span aria-hidden className="mx-1 hidden h-4 w-px bg-line lg:block" />

          <a
            href={pathForLang(other)}
            hrefLang={other}
            title={t(copy.langSwitchTitle, lang)}
            className="mono-label rounded border border-line px-3 py-1.5 text-muted transition-colors hover:border-accent-dim hover:text-ink"
          >
            {t(copy.langSwitchLabel, lang)}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? copy.closeMenu : copy.openMenu, lang)}
            className="flex size-10 items-center justify-center rounded text-ink transition-colors hover:bg-surface lg:hidden"
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
        <nav className="container-page flex flex-col py-3">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={close}
              className="border-b border-line-soft py-3.5 font-display text-lg text-ink last:border-b-0"
            >
              {t(item.label, lang)}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
