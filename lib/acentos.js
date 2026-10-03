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

  // 30 programas nuevos (octubre 2026)
  'xtb': '#E4002B',
  'plus500': '#0F45A6',
  'avatrade': '#EE3124',
  'capital-com': '#0052CC',
  'iq-option': '#E2001A',
  'pepperstone': '#5EBE3D',

  'copy-ai': '#7B61FF',
  'synthesia': '#4F46E5',
  'elevenlabs': '#0D0D0D',
  'surfer-seo': '#5542F6',
  'grammarly': '#15C39A',
  'n8n': '#EA4560',

  'coinbase': '#0052FF',
  'kraken': '#5741D9',
  'okx': '#000000',
  'trezor': '#00854D',
  'kucoin': '#23AF91',
  'crypto-com': '#002D74',

  'udemy': '#A435F0',
  'skillshare': '#1AB395',
  'toptal': '#3863A0',
  'freelancer-com': '#29B2FE',
  'peopleperhour': '#FF6B00',
  'linkedin-learning': '#0A66C2',

  'wix': '#0C6EFC',
  'squarespace': '#000000',
  'printify': '#1BC47D',
  'spocket': '#6F42C1',
  'mailchimp': '#FFE01B',
  'bigcommerce': '#0C6CD9',

  // 39 programas nuevos — fase 2 (octubre 2026)
  'trading212': '#0A2540',
  'oanda': '#F58220',
  'admirals': '#E4032C',
  'robinhood': '#00C805',

  'gemini': '#00DCFA',
  'bitstamp': '#0F9ED5',
  'exodus': '#6C3CE1',
  'uphold': '#4D2D96',

  'midjourney': '#000000',
  'runway': '#000000',
  'perplexity': '#20808D',
  'notion-ai': '#000000',
  'deepl': '#0F2B46',
  'descript': '#00B86B',
  'heygen': '#6C5CE7',
  'writesonic': '#2D68FE',
  'pictory': '#4F46E5',
  'otter-ai': '#1E90FF',

  '99designs': '#F26522',
  'guru': '#00A99D',
  'we-work-remotely': '#000000',
  'flexjobs': '#4CAF50',
  'contra': '#000000',
  'workana': '#00B4AA',
  'thumbtack': '#001E31',
  'codementor': '#0F2940',
  'solidgigs': '#FF6B6B',
  'dribbble': '#EA4C89',

  'woocommerce': '#96588A',
  'etsy': '#F56400',
  'amazon-fba': '#FF9900',
  'gumroad': '#FF90E8',
  'clickfunnels': '#FA6400',
  'dsers': '#FF6A00',
  'teachable': '#0038FF',
  'payoneer': '#FF4800',
  'stripe': '#635BFF',
  'paypal-business': '#003087',
  'hotmart': '#FF4C00',
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

  // De los 30 nuevos, solo se incluyen aquí los que sí existen como
  // ícono confirmado en Simple Icons. El resto no tiene entrada a
  // propósito: así la tarjeta muestra el nombre sobre el color de
  // marca en vez de arriesgarse a un ícono roto o incorrecto.
  'n8n': 'n8n',
  'coinbase': 'coinbase',
  'trezor': 'trezor',
  'udemy': 'udemy',
  'wix': 'wix',
  'squarespace': 'squarespace',
  'mailchimp': 'mailchimp',
  'bigcommerce': 'bigcommerce',

  // De los 39 nuevos — fase 2 — solo los que sí existen confirmados
  // en Simple Icons.
  'robinhood': 'robinhood',
  'notion-ai': 'notion',
  'dribbble': 'dribbble',
  'woocommerce': 'woocommerce',
  'etsy': 'etsy',
  'amazon-fba': 'amazon',
  'gumroad': 'gumroad',
  'payoneer': 'payoneer',
  'stripe': 'stripe',
  'paypal-business': 'paypal',
};

export function iconoUrl(slug) {
  const nombre = ICONO_SIMPLE[slug];
  // Sin color forzado: usa el color oficial de cada marca, para que
  // la gente la reconozca igual que en la página real del programa.
  return nombre ? `https://cdn.simpleicons.org/${nombre}` : null;
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
