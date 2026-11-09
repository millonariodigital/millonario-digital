'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Google Analytics 4. No hace nada hasta que exista la variable de
// entorno NEXT_PUBLIC_GA_ID en Vercel (Settings → Environment
// Variables) con tu "ID de medición" (algo como G-XXXXXXXXXX).
// Mientras esa variable no exista, este componente no carga ningún
// script y no afecta nada del sitio.
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Cada clic en un enlace de afiliado (/ir/<herramienta>) se envía como evento
  // "affiliate_click", con la herramienta y la página donde se hizo el clic.
  useEffect(() => {
    if (!gaId) return undefined;
    function alHacerClic(e) {
      const a = e.target && e.target.closest ? e.target.closest('a[href*="/ir/"]') : null;
      if (!a || typeof window.gtag !== 'function') return;
      try {
        const url = new URL(a.href, window.location.origin);
        const herramienta = url.pathname.split('/ir/')[1]?.split('/')[0] || 'desconocida';
        window.gtag('event', 'affiliate_click', {
          herramienta,
          pagina: window.location.pathname,
          transport_type: 'beacon',
        });
      } catch (err) {}
    }
    document.addEventListener('click', alHacerClic, true);
    return () => document.removeEventListener('click', alHacerClic, true);
  }, [gaId]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
