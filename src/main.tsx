import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import { langFromPath } from './lib/i18n';

const container = document.getElementById('root')!;

// Dil yol adından türer; prerender edilen HTML ile birebir aynı sonucu verir.
const app = (
  <StrictMode>
    <App lang={langFromPath(window.location.pathname)} />
  </StrictMode>
);

// Production'da HTML önceden render edilir; geliştirme sunucusunda boş kökten başlanır.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
