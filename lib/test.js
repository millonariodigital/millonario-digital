// Test "¿Qué negocio digital es para ti?". Todo se calcula en el navegador.
// Cada resultado lleva a sus tutoriales (lib/tutoriales.js), sus herramientas
// (slugs de la tabla `programas`) y el kit gratis. Para cambiar textos o
// agregar un tutorial a un resultado, se edita solo este archivo.

export const TEST_URL = '/test-negocio-digital';

export const RESULTADOS = {
  contenido: {
    nombre: 'Creador de contenido con IA',
    corto: 'Contenido con IA',
    frase: 'Tu camino: crear videos y contenido con inteligencia artificial, sin necesidad de mostrar tu cara.',
    descripcion:
      'Te mueve crear y te gusta probar herramientas nuevas. Hoy puedes armar un canal o una marca de contenido con guion, voz, imágenes y edición hechos con ayuda de la IA. Es un camino de constancia: los primeros videos sirven para aprender, y cada publicación te enseña algo para la siguiente.',
    paraTi: [
      'Te gusta explicar, contar historias o enseñar lo que sabes.',
      'Prefieres no mostrar tu cara o no tienes cámara ni estudio.',
      'Puedes dedicar algunas horas cada semana con constancia.',
    ],
    pasos: [
      'Elige un tema que te guste lo suficiente para hablar de él durante meses.',
      'Mira el tutorial del proceso completo y haz tu primer video corto, aunque no quede perfecto.',
      'Publica con regularidad y revisa qué videos retienen mejor a la gente.',
    ],
    tutoriales: ['videos-con-ia-sin-mostrar-tu-cara', 'voz-con-ia-elevenlabs', 'imagen-a-video-higgsfield', 'texto-a-video-pictory'],
    herramientas: ['elevenlabs', 'higgsfield', 'pictory', 'synthesia'],
    tema: null,
    aviso: null,
    imagen: '/test/contenido.jpg',
  },
  tienda: {
    nombre: 'Tienda online con productos propios',
    corto: 'Tienda online',
    frase: 'Tu camino: una tienda online con productos de tu marca, sin manejar inventario al principio.',
    descripcion:
      'Tienes mentalidad de marca y te gusta presentar productos. Con una tienda en Shopify y productos bajo demanda como los de Printful puedes empezar sin comprar mercancía: cada producto se fabrica cuando alguien lo pide. El trabajo está en elegir bien, diseñar con cuidado y cuidar la experiencia del cliente.',
    paraTi: [
      'Te imaginas una marca propia: camisetas, tazas, pósters o tus propios productos.',
      'Te gusta el diseño, la presentación y vender lo que te gusta.',
      'Puedes invertir un poco en tu tienda y en una muestra antes de lanzar.',
    ],
    pasos: [
      'Define el estilo de tu marca y elige pocos productos para empezar.',
      'Crea tu tienda con el tutorial de Shopify y conecta Printful.',
      'Pide una muestra antes de lanzar y úsala para tus fotos y videos.',
    ],
    tutoriales: ['tienda-online-shopify', 'productos-con-tu-diseno-printful'],
    herramientas: ['shopify', 'printful', 'hostinger', 'klaviyo'],
    tema: 'printful',
    aviso: null,
    imagen: '/test/tienda.jpg',
  },
  servicios: {
    nombre: 'Servicios freelance potenciados con IA',
    corto: 'Servicios freelance',
    frase: 'Tu camino: ofrecer un servicio a clientes, trabajando más rápido con herramientas de IA.',
    descripcion:
      'Te gusta resolver tareas concretas y hacerlas bien. Puedes ofrecer servicios como voces para videos, edición, diseño o textos en plataformas como Fiverr o Upwork, y usar la IA para entregar con más calidad y en menos tiempo. Es el camino que menos capital necesita: lo que cuenta es tu habilidad y tu reputación.',
    paraTi: [
      'Prefieres no arriesgar dinero para empezar.',
      'Te sientes cómodo atendiendo clientes y cumpliendo plazos.',
      'Ya tienes una habilidad (o quieres aprender una) que otros necesitan.',
    ],
    pasos: [
      'Elige un servicio concreto y prepara 3 ejemplos para tu portafolio.',
      'Crea tu perfil en una plataforma freelance con una descripción clara.',
      'Usa la IA para agilizar el trabajo, pero revisa siempre cada entrega con tus propios ojos.',
    ],
    tutoriales: ['voz-con-ia-elevenlabs', 'texto-a-video-pictory', 'videos-con-ia-sin-mostrar-tu-cara'],
    herramientas: ['fiverr', 'upwork', 'canva-pro', 'elevenlabs'],
    tema: null,
    aviso: null,
    imagen: '/test/servicios.jpg',
  },
  inversion: {
    nombre: 'Aprender a invertir con criterio',
    corto: 'Inversión',
    frase: 'Tu camino: aprender cómo funcionan los mercados, primero con práctica y sin prisa.',
    descripcion:
      'Te atraen los números, el análisis y entender cómo se mueven los mercados. Es un camino que exige estudio y paciencia: lo más valioso al principio es aprender, practicar con cuentas de demostración y entender el riesgo antes de usar dinero real. La IA puede ayudarte a estudiar y analizar, pero no elimina el riesgo.',
    paraTi: [
      'Disfrutas analizar datos, gráficos y noticias.',
      'Tienes paciencia para aprender antes de ver resultados.',
      'Entiendes que en los mercados se puede perder dinero.',
    ],
    pasos: [
      'Aprende lo básico: qué es una acción, un ETF y cómo se mide el riesgo.',
      'Practica con una cuenta de demostración o con gráficos antes de usar dinero real.',
      'Si un día inviertes, usa solo dinero que puedas permitirte perder y no sigas promesas de ganancias.',
    ],
    tutoriales: [],
    herramientas: ['tradingview', 'interactive-brokers', 'etoro', 'coursera'],
    tema: null,
    aviso:
      'Invertir implica riesgo de perder dinero. Este resultado es orientativo y educativo, no es una recomendación financiera. Ninguna herramienta ni inteligencia artificial garantiza ganancias.',
    imagen: '/test/inversion.jpg',
  },
};

export const ORDEN = ['contenido', 'tienda', 'servicios', 'inversion'];

export const PREGUNTAS = [
  {
    texto: '¿Qué te emociona más construir?',
    opciones: [
      { texto: 'Videos o publicaciones que mucha gente vea', puntos: { contenido: 3 } },
      { texto: 'Una tienda con productos de mi propia marca', puntos: { tienda: 3 } },
      { texto: 'Un servicio que ayude a otros con algo concreto', puntos: { servicios: 3 } },
      { texto: 'Entender cómo se mueven los mercados', puntos: { inversion: 3 } },
    ],
  },
  {
    texto: '¿Cuánto tiempo puedes dedicarle por semana?',
    opciones: [
      { texto: 'Menos de 3 horas', puntos: { inversion: 1, contenido: 1 } },
      { texto: 'Entre 3 y 10 horas', puntos: { contenido: 2, servicios: 2 } },
      { texto: 'Más de 10 horas', puntos: { tienda: 2, servicios: 1, contenido: 1 } },
    ],
  },
  {
    texto: '¿Con cuánto dinero empezarías?',
    opciones: [
      { texto: 'Nada o casi nada: quiero empezar con lo que tengo', puntos: { servicios: 2, contenido: 2 } },
      { texto: 'Un poco, para herramientas o una muestra de producto', puntos: { tienda: 2, contenido: 1 } },
      { texto: 'Un monto que puedo permitirme perder mientras aprendo', puntos: { inversion: 2 } },
    ],
  },
  {
    texto: '¿Cómo te llevas con el riesgo de perder dinero?',
    opciones: [
      { texto: 'Prefiero no arriesgar nada', puntos: { servicios: 2, contenido: 1 } },
      { texto: 'Un riesgo pequeño, si entiendo en qué lo gasto', puntos: { tienda: 2, contenido: 1 } },
      { texto: 'Acepto el riesgo y quiero aprender a manejarlo', puntos: { inversion: 3 } },
    ],
  },
  {
    texto: '¿Te gustaría mostrar tu cara en internet?',
    opciones: [
      { texto: 'Prefiero no mostrarla', puntos: { contenido: 2, tienda: 1 } },
      { texto: 'Me da igual', puntos: { servicios: 1, contenido: 1, tienda: 1 } },
      { texto: 'Prefiero trabajar sin publicar nada', puntos: { inversion: 2, servicios: 1 } },
    ],
  },
  {
    texto: '¿Qué se te da mejor?',
    opciones: [
      { texto: 'Tener ideas y crear', puntos: { contenido: 2, tienda: 1 } },
      { texto: 'Presentar y vender productos', puntos: { tienda: 2 } },
      { texto: 'Hacer bien las tareas que otros me piden', puntos: { servicios: 2 } },
      { texto: 'Los números y el análisis', puntos: { inversion: 2 } },
    ],
  },
  {
    texto: '¿Qué te gustaría haber logrado en 3 meses?',
    opciones: [
      { texto: 'Publicar mis primeros 10 videos', puntos: { contenido: 3 } },
      { texto: 'Abrir mi tienda y tener mi primera muestra en las manos', puntos: { tienda: 3 } },
      { texto: 'Conseguir mi primer cliente', puntos: { servicios: 3 } },
      { texto: 'Entender un mercado y practicar sin dinero real', puntos: { inversion: 3 } },
    ],
  },
];

// Devuelve [principal, segundo] según los puntos. En empate gana el orden de ORDEN.
export function calcularResultado(puntos) {
  const ord = [...ORDEN].sort((a, b) => (puntos[b] || 0) - (puntos[a] || 0) || ORDEN.indexOf(a) - ORDEN.indexOf(b));
  const segundo = (puntos[ord[1]] || 0) > 0 ? ord[1] : null;
  return [ord[0], segundo];
}

export function evento(nombre, datos = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', nombre, datos);
  } catch (e) {}
}
