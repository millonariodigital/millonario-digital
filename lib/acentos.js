// Color de marca (fondo sólido) para la tarjeta de cada programa,
// inspirado en cómo Binance usa su amarillo de marca como fondo con
// su logo encima.
export const COLOR_ACENTO = {
  'tradingview': '#00E5FF',
  'etoro': '#65D96A',
  'curso-opciones-nivel-1': '#00E5FF',
  'interactive-brokers': '#FF6B6B',

  'jasper-ai': '#A855F7',
  'make': '#C084FC',
  'zapier': '#FF9F43',
  'higgsfield': '#A855F7',

  'bybit': '#F7A600',
  'ledger': '#8BD3E6',
  'curso-crypto-basico': '#F7A600',
  'binance': '#F0B90B',

  'upwork': '#3ECF7E',
  'coursera': '#4C9AFF',
  'canva-pro': '#00E5FF',
  'fiverr': '#3ECF7E',

  'printful': '#FF6B9D',
  'hostinger': '#A855F7',
  'klaviyo': '#00E5FF',
  'shopify': '#3ECF7E',
};

export const COLOR_ACENTO_DEFAULT = '#00E5FF';

// Decide si el texto/ícono debe ir oscuro o blanco según qué tan claro
// es el color de fondo (igual a como Binance usa texto negro sobre su
// amarillo, pero la mayoría de nuestros colores son oscuros/saturados
// y necesitan texto blanco).
export function textoParaFondo(hex) {
  const c = (hex || '#00E5FF').replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brillo = (r * 299 + g * 587 + b * 114) / 1000;
  return brillo > 165 ? '#0a0c18' : '#ffffff';
}
