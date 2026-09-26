/**
 * İki dilli içerik için en küçük araç seti.
 *
 * Sayfa iki adreste önceden render edilir: `/` İngilizce, `/tr/` Türkçe.
 * Dil, istemcide de sunucuda da yol adından türer; bu yüzden hydrate sırasında
 * sunucu/istemci farkı oluşmaz ve dil için state veya effect gerekmez.
 */

export const LANGS = ['en', 'tr'] as const;
export type Lang = (typeof LANGS)[number];

/** Aynı metnin iki dildeki karşılığı. İçerikte tek tek string yerine bunu kullan. */
export type L10n = { readonly en: string; readonly tr: string };

/** Dil için doğru metni seçer. */
export const t = (value: L10n, lang: Lang): string => value[lang];

/** Türkçe sayfa `/tr/` altında yayınlanır; İngilizce kök adrestedir. */
export const langFromPath = (pathname: string): Lang =>
  /^\/tr(\/|$)/.test(pathname) ? 'tr' : 'en';

/** Verilen dilin sayfa köküne giden yol (`/` veya `/tr/`). */
export const pathForLang = (lang: Lang): string => (lang === 'tr' ? '/tr/' : '/');

/** Aynı sayfanın diğer dildeki adresi — dil anahtarı bunu kullanır. */
export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr');
