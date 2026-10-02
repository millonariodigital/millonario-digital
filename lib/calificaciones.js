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
};
