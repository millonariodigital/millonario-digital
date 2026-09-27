// Contenido del cuestionario "Descubre tu Camino". Todo el cálculo de
// puntos ocurre en el navegador (sin API de pago ni backend propio).

export const CATEGORIA_INFO = {
  trading: {
    nombre: 'Trading e Inversión',
    descripcion:
      'Tienes perfil analítico y te sientes cómodo tomando decisiones basadas en datos y en el comportamiento de los mercados. El trading y la inversión con ayuda de IA pueden ser tu punto de partida.',
  },
  cripto: {
    nombre: 'Cripto',
    descripcion:
      'Te atrae un mundo más nuevo y con mayor potencial de crecimiento, y no te asusta un poco más de riesgo a cambio de mayor recompensa. El ecosistema cripto puede ser tu camino.',
  },
  freelancing: {
    nombre: 'Freelancing',
    descripcion:
      'Prefieres empezar sin arriesgar capital, ofreciendo un servicio o habilidad directamente a clientes. El freelancing potenciado por herramientas de IA te permite empezar a generar ingresos rápido.',
  },
  ecommerce: {
    nombre: 'E-commerce',
    descripcion:
      'Tienes mentalidad de vendedor y te gustaría construir una marca o tienda propia. El e-commerce, apoyado en automatización e IA, encaja con tu forma de pensar.',
  },
  ia: {
    nombre: 'Creación de Contenido con IA',
    descripcion:
      'Eres creativo/a y te entusiasma explorar herramientas nuevas. Crear contenido, productos digitales o automatizaciones con inteligencia artificial es tu camino natural.',
  },
};

// slug de cada programa tal como aparece en la tabla `programas` de Supabase
// (ver lib/acentos.js para la lista completa de slugs existentes).
export const CATEGORIA_PROGRAMAS = {
  trading: ['tradingview', 'etoro', 'interactive-brokers', 'curso-opciones-nivel-1'],
  cripto: ['binance', 'bybit', 'ledger', 'curso-crypto-basico'],
  freelancing: ['upwork', 'fiverr'],
  ecommerce: ['shopify', 'printful', 'hostinger', 'klaviyo'],
  ia: ['jasper-ai', 'canva-pro', 'higgsfield', 'make', 'zapier', 'coursera'],
};

export const PREGUNTAS = [
  {
    texto: '¿Cuánto tiempo puedes dedicarle a esto por semana?',
    opciones: [
      { texto: 'Menos de 3 horas', puntos: { cripto: 2, trading: 1 } },
      { texto: 'Entre 3 y 10 horas', puntos: { freelancing: 2, ia: 1 } },
      { texto: 'Más de 10 horas', puntos: { ecommerce: 2, freelancing: 1 } },
    ],
  },
  {
    texto: '¿Cómo te llevas con el riesgo de perder dinero a corto plazo con tal de ganar más a largo plazo?',
    opciones: [
      { texto: 'Prefiero no arriesgar casi nada', puntos: { freelancing: 2, ia: 1 } },
      { texto: 'Un riesgo moderado no me quita el sueño', puntos: { ecommerce: 2, trading: 1 } },
      { texto: 'Estoy dispuesto a arriesgar bastante si el potencial es alto', puntos: { cripto: 2, trading: 2 } },
    ],
  },
  {
    texto: '¿Cuál de estas frases te describe mejor?',
    opciones: [
      { texto: 'Se me dan bien los números y el análisis', puntos: { trading: 2, ecommerce: 1 } },
      { texto: 'Soy creativo/a, se me ocurren ideas y contenido fácilmente', puntos: { ia: 2 } },
      { texto: 'Se me da bien vender y convencer a otros', puntos: { ecommerce: 2, freelancing: 1 } },
      { texto: 'Prefiero ejecutar tareas concretas y bien definidas', puntos: { freelancing: 2, cripto: 1 } },
    ],
  },
  {
    texto: '¿Con cuánto dinero cuentas para empezar?',
    opciones: [
      { texto: 'Casi nada, quiero empezar sin invertir capital', puntos: { freelancing: 2, ia: 1 } },
      { texto: 'Un monto pequeño para probar', puntos: { cripto: 2, trading: 1 } },
      { texto: 'Un monto que puedo usar para comprar inventario o herramientas', puntos: { ecommerce: 2 } },
    ],
  },
  {
    texto: '¿Prefieres trabajar solo/a o tratar directamente con clientes?',
    opciones: [
      { texto: 'Solo/a, sin depender de atender a nadie', puntos: { trading: 2, cripto: 1 } },
      { texto: 'Me gusta tratar con clientes y entregar un servicio', puntos: { freelancing: 2 } },
      { texto: 'Prefiero construir una marca o tienda que otros descubren solos', puntos: { ecommerce: 2, ia: 1 } },
    ],
  },
  {
    texto: '¿Qué tan cómodo/a te sientes aprendiendo herramientas nuevas de tecnología e IA?',
    opciones: [
      { texto: 'Me encanta probar herramientas nuevas', puntos: { ia: 2 } },
      { texto: 'Le entro sin problema si veo el beneficio', puntos: { ecommerce: 1, freelancing: 1 } },
      { texto: 'Prefiero algo con curva de aprendizaje simple', puntos: { trading: 1, cripto: 1 } },
    ],
  },
  {
    texto: 'Si tuvieras que elegir un primer resultado en 3 meses, ¿cuál elegirías?',
    opciones: [
      { texto: 'Ver crecer una inversión', puntos: { trading: 2, cripto: 1 } },
      { texto: 'Cobrar mi primer proyecto como freelancer', puntos: { freelancing: 2 } },
      { texto: 'Vender mi primer producto', puntos: { ecommerce: 2 } },
      { texto: 'Publicar contenido o un producto digital hecho con ayuda de IA', puntos: { ia: 2 } },
    ],
  },
];
