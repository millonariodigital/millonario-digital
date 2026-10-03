// Calificación (sobre 5) y nivel recomendado ("Ideal para") por programa,
// definidos según el análisis de cada reseña. Si agregas un programa nuevo
// y no está aquí, la tarjeta simplemente no muestra esos dos datos.
//
// Los cursos propios (ver CURSO_PROPIO abajo) NO llevan calificación
// numérica aquí a propósito: no tendría sentido compararlos contra
// programas de terceros en el mismo ranking.

export const CALIFICACION = {
  tradingview: 4.7,
  etoro: 4.3,
  'interactive-brokers': 4.5,
  'jasper-ai': 4.4,
  make: 4.3,
  zapier: 4.5,
  higgsfield: 4.4,
  bybit: 4.2,
  ledger: 4.6,
  binance: 4.3,
  upwork: 4.2,
  coursera: 4.6,
  'canva-pro': 4.7,
  fiverr: 4.3,
  printful: 4.4,
  hostinger: 4.5,
  klaviyo: 4.3,
  shopify: 4.6,

  // 30 programas nuevos (octubre 2026)
  xtb: 4.4,
  plus500: 4.1,
  avatrade: 4.2,
  'capital-com': 4.3,
  'iq-option': 3.9,
  pepperstone: 4.5,

  'copy-ai': 4.2,
  synthesia: 4.4,
  elevenlabs: 4.6,
  'surfer-seo': 4.3,
  grammarly: 4.5,
  n8n: 4.4,

  coinbase: 4.3,
  kraken: 4.4,
  okx: 4.2,
  trezor: 4.7,
  kucoin: 4.1,
  'crypto-com': 4.0,

  udemy: 4.4,
  skillshare: 4.2,
  toptal: 4.5,
  'freelancer-com': 3.9,
  peopleperhour: 3.8,
  'linkedin-learning': 4.5,

  wix: 4.3,
  squarespace: 4.5,
  printify: 4.3,
  spocket: 4.2,
  mailchimp: 4.4,
  bigcommerce: 4.3,
};

// Cursos propios de Millonario Digital: en vez de calificación numérica,
// la tarjeta muestra una insignia "Curso propio" (no compiten en ranking
// contra herramientas/plataformas de terceros).
export const CURSO_PROPIO = ['curso-opciones-nivel-1', 'curso-crypto-basico'];

export const DIFICULTAD = {
  tradingview: 'Fácil',
  etoro: 'Fácil',
  'curso-opciones-nivel-1': 'Fácil',
  'interactive-brokers': 'Intermedio',
  'jasper-ai': 'Fácil',
  make: 'Intermedio',
  zapier: 'Fácil',
  higgsfield: 'Intermedio',
  bybit: 'Intermedio',
  ledger: 'Fácil',
  'curso-crypto-basico': 'Fácil',
  binance: 'Intermedio',
  upwork: 'Fácil',
  coursera: 'Fácil',
  'canva-pro': 'Fácil',
  fiverr: 'Fácil',
  printful: 'Intermedio',
  hostinger: 'Fácil',
  klaviyo: 'Intermedio',
  shopify: 'Fácil',

  // 30 programas nuevos (octubre 2026)
  xtb: 'Intermedio',
  plus500: 'Intermedio',
  avatrade: 'Intermedio',
  'capital-com': 'Fácil',
  'iq-option': 'Fácil',
  pepperstone: 'Intermedio',

  'copy-ai': 'Fácil',
  synthesia: 'Fácil',
  elevenlabs: 'Fácil',
  'surfer-seo': 'Intermedio',
  grammarly: 'Fácil',
  n8n: 'Intermedio',

  coinbase: 'Fácil',
  kraken: 'Intermedio',
  okx: 'Intermedio',
  trezor: 'Fácil',
  kucoin: 'Intermedio',
  'crypto-com': 'Fácil',

  udemy: 'Fácil',
  skillshare: 'Fácil',
  toptal: 'Avanzado',
  'freelancer-com': 'Fácil',
  peopleperhour: 'Fácil',
  'linkedin-learning': 'Fácil',

  wix: 'Fácil',
  squarespace: 'Fácil',
  printify: 'Fácil',
  spocket: 'Fácil',
  mailchimp: 'Fácil',
  bigcommerce: 'Intermedio',
};
