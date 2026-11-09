'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Aviso de cookies. Solo aparece a quien navega con zona horaria de Europa
// (donde la ley pide permiso antes de usar cookies de analítica) y todavía no eligió.
// También se puede abrir desde la página /cookies con el botón "Cambiar mi elección".
const CLAVE = 'md-cookies';

function esEuropa() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return tz.startsWith('Europe/') || ['Atlantic/Canary', 'Atlantic/Madeira', 'Atlantic/Azores', 'Atlantic/Reykjavik'].includes(tz);
  } catch (e) {
    return false;
  }
}

export function guardarEleccion(acepta) {
  try { localStorage.setItem(CLAVE, acepta ? 'si' : 'no'); } catch (e) {}
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: acepta ? 'granted' : 'denied' });
    }
  } catch (e) {}
}

export default function AvisoCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let elegido = null;
    try { elegido = localStorage.getItem(CLAVE); } catch (e) {}
    if (!elegido && esEuropa()) setVisible(true);
    const abrir = () => setVisible(true);
    window.addEventListener('md-cookies-abrir', abrir);
    return () => window.removeEventListener('md-cookies-abrir', abrir);
  }, []);

  if (!visible) return null;

  function elegir(acepta) {
    guardarEleccion(acepta);
    setVisible(false);
  }

  return (
    <div className="aviso-cookies" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <p>
        Usamos cookies de analítica para saber qué contenidos te sirven más. No usamos cookies de publicidad.{' '}
        <Link href="/cookies">Más información</Link>
      </p>
      <div className="aviso-cookies-botones">
        <button type="button" className="aviso-cookies-btn" onClick={() => elegir(false)}>Rechazar</button>
        <button type="button" className="aviso-cookies-btn" onClick={() => elegir(true)}>Aceptar</button>
      </div>
    </div>
  );
}
