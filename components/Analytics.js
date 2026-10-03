'use client';

import Script from 'next/script';

// Google Analytics 4. No hace nada hasta que exista la variable de
// entorno NEXT_PUBLIC_GA_ID en Vercel (Settings → Environment
// Variables) con tu "ID de medición" (algo como G-XXXXXXXXXX).
// Mientras esa variable no exista, este componente no carga ningún
// script y no afecta nada del sitio.
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
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
