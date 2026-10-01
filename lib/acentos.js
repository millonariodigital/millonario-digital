// Color de marca (fondo sólido) para la tarjeta de cada programa,
// inspirado en cómo Binance usa su amarillo de marca como fondo con
// su logo encima.
export const COLOR_ACENTO = {
  'tradingview': '#00E5FF',
  'etoro': '#65D96A',
  'curso-opciones-nivel-1': '#00E5FF',
  'interactive-brokers': '#E53946',

  'jasper-ai': '#FF5C35',
  'make': '#6D28D9',
  'zapier': '#FF9F43',
  'higgsfield': '#7C3AED',

  'bybit': '#F7A600',
  'ledger': '#3D4451',
  'curso-crypto-basico': '#F7A600',
  'binance': '#F0B90B',

  'upwork': '#3ECF7E',
  'coursera': '#4C9AFF',
  'canva-pro': '#00C4CC',
  'fiverr': '#3ECF7E',

  'printful': '#FF6B9D',
  'hostinger': '#A855F7',
  'klaviyo': '#0B0B0B',
  'shopify': '#3ECF7E',
};

export const COLOR_ACENTO_DEFAULT = '#00E5FF';

// Programas para los que existe un ícono vectorial limpio (sin fondo,
// sin caja negra) en la librería pública Simple Icons. Se muestra en
// blanco encima del color de marca. Los programas que no aparecen
// aquí se muestran solo con su nombre, sin ícono, para no forzar una
// imagen de mala calidad.
export const ICONO_SIMPLE = {
  'tradingview': 'tradingview',
  'make': 'make',
  'zapier': 'zapier',
  'binance': 'binance',
  'upwork': 'upwork',
  'coursera': 'coursera',
  'fiverr': 'fiverr',
  'hostinger': 'hostinger',
  'shopify': 'shopify',
};

export function iconoUrl(slug) {
  const nombre = ICONO_SIMPLE[slug];
  return nombre ? `https://cdn.simpleicons.org/${nombre}/ffffff` : null;
}

// Decide si el texto debe ir oscuro o blanco según qué tan claro es
// el color de fondo.
export function textoParaFondo(hex) {
  const c = (hex || '#00E5FF').replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brillo = (r * 299 + g * 587 + b * 114) / 1000;
  return brillo > 165 ? '#0a0c18' : '#ffffff';
}
