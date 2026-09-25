import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millonario-digital-web.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Millonario Digital — Herramientas que sí generan dinero',
    template: '%s | Millonario Digital',
  },
  description:
    'Reseñas y comparativas de brokers, IA, crypto, freelancing y e-commerce, probadas con criterio propio — no con promesas.',
  keywords: [
    'ingresos digitales',
    'ganar dinero online',
    'trading',
    'inteligencia artificial',
    'criptomonedas',
    'freelancing',
    'e-commerce',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_HN',
    url: SITE_URL,
    siteName: 'Millonario Digital',
    title: 'Millonario Digital — Herramientas que sí generan dinero',
    description:
      'Reseñas y comparativas de brokers, IA, crypto, freelancing y e-commerce, probadas con criterio propio.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Millonario Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Millonario Digital — Herramientas que sí generan dinero',
    description: 'Reseñas y comparativas de brokers, IA, crypto, freelancing y e-commerce.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Millonario Digital',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Reseñas y comparativas de herramientas y programas para generar ingresos digitales.',
};

const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('md-theme');
    if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
