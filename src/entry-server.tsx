import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { contact, experience, meta, profile, skillGroups } from './data/site';
import type { Lang } from './lib/i18n';

/** Build sırasında her dil için statik HTML üretir (scripts/prerender.mjs). */
export function render(lang: Lang) {
  return renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>,
  );
}

/**
 * Prerender'ın `<head>` etiketlerini ve JSON-LD'yi kurarken okuduğu bilgiler.
 * İçerik yine `data/site.ts` içinde tek kaynakta durur; burası sadece onu
 * build betiğinin okuyabileceği düz bir nesneye çevirir.
 */
export const pageMeta = {
  siteUrl: meta.siteUrl,
  title: meta.title,
  description: meta.description,
  name: profile.name,
  jobTitle: profile.role,
  email: contact.email,
  employer: experience[0].org,
  sameAs: contact.links.map((link) => link.href),
  // JSON-LD tek dilli; çevrilebilir maddelerde İngilizce karşılık kullanılır.
  knowsAbout: skillGroups.flatMap((group) =>
    group.items.map((item) => (typeof item === 'string' ? item : item.en)),
  ),
};
