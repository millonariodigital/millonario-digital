const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millonario-digital.com';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /ir/ son los enlaces de afiliado que redirigen: no deben indexarse.
      // /descargas/ y la página de gracias son solo para quien se registra.
      disallow: ['/ir/', '/descargas/', '/guia-gratis/gracias'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
