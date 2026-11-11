// Tutoriales: una página por cada video largo del canal.
// Para agregar uno nuevo: copia un bloque, cambia los datos y pon el ID de
// YouTube (las 11 letras después de "watch?v=") en `youtubeId`.
// Mientras `youtubeId` esté vacío, la página muestra "Muy pronto en YouTube".
// `publicadoEl` (hora UTC): fecha real de publicación en YouTube, la pide Google en los datos estructurados (uploadDate).
// Si falta, se usa `estreno`.
// `estreno` (opcional, hora UTC): si el video está programado, la página se activa sola
// a esa hora. Ej.: 9:00 en Tegucigalpa = 15:00 UTC → '2026-11-07T15:00:00Z'.
// `extra` es la clave de lib/guia.js (EXTRAS) si el video tiene un descargable propio.

export const CANAL_YOUTUBE = 'https://www.youtube.com/@millonariodigital_oficial';
export const CANAL_SUSCRIBIR = `${CANAL_YOUTUBE}?sub_confirmation=1`;

export const TUTORIALES = [
  {
    numero: 6,
    slug: 'productos-con-tu-diseno-printful',
    titulo: 'Printful tutorial en español: crea productos con tu diseño sin inventario',
    resumen:
      'Vende camisetas, tazas o pósters con tu diseño sin comprar inventario: crea tu cuenta, elige productos, diséñalos (también con IA), crea mockups, conecta tu tienda y pide una muestra antes de lanzar.',
    youtubeId: 'bu69UKHZyHw',
    estreno: '2026-11-11T15:00:00Z',
    herramienta: { slug: 'printful', nombre: 'Printful', cta: 'Crear mis productos en Printful' },
    extra: 'printful',
    capitulos: [
      ['00:00', 'Llevan mi diseño y no guardo ni uno'],
      ['00:46', 'Los 6 pasos de este tutorial'],
      ['00:59', 'Qué es Printful y cómo funciona'],
      ['01:40', 'Paso 1: crea tu cuenta'],
      ['02:31', 'Paso 2: elige tus productos'],
      ['03:36', 'Paso 3: diseña tu producto (también con IA)'],
      ['05:05', 'Paso 4: crea tus imágenes de producto (mockups)'],
      ['05:53', 'Paso 5: conecta tu tienda (Shopify)'],
      ['07:07', 'Paso 6: pide una muestra antes de lanzar'],
      ['08:04', '3 errores comunes al empezar'],
      ['08:23', '¿Para quién es ideal Printful?'],
      ['08:54', 'Mi veredicto'],
      ['09:24', 'Tu plan para la primera semana'],
    ],
    pasos: [
      ['Crea tu cuenta', 'Regístrate en el sitio oficial y configura desde el inicio el nombre, el logo y los datos de contacto de tu marca.'],
      ['Elige pocos productos', 'Empieza con una colección pequeña que tu público sí usaría. Revisa materiales, tallas, zonas de impresión y tiempos de envío a tu país.'],
      ['Diseña tu producto', 'Usa el Design Maker. Si creas el diseño con IA, súbelo en alta resolución, con pocas formas y colores; el texto, escríbelo en el editor.'],
      ['Crea tus mockups', 'Genera imágenes de frente, en uso y de detalle con el mismo estilo; sirven para la tienda y para tus redes.'],
      ['Conecta tu tienda', 'Instala la app de Printful en Shopify (u otra plataforma). Los pedidos llegan solos a Printful, que produce y envía.'],
      ['Pide una muestra', 'Antes de lanzar, compruebas calidad, colores y tamaño real, y tienes fotos y videos propios para promocionar.'],
    ],
    paraQuien:
      'Para creadores de contenido, diseñadores e ilustradores, y para quien quiere empezar una tienda con productos propios sin manejar inventario.',
  },
  {
    numero: 5,
    slug: 'tienda-online-shopify',
    titulo: 'Cómo crear una tienda en Shopify con IA paso a paso',
    resumen:
      'Crea tu tienda online desde cero sin programar: cuenta, diseño, productos con descripciones hechas con IA, envíos, dominio y la revisión final antes de abrir.',
    youtubeId: 'qy3CcXbjhUg',
    estreno: '2026-11-07T15:00:00Z',
    herramienta: { slug: 'shopify', nombre: 'Shopify', cta: 'Crear mi tienda en Shopify' },
    extra: null,
    capitulos: [
      ['00:00', 'Esta tienda la armé en una tarde'],
      ['00:57', 'Qué es Shopify y cómo funciona'],
      ['01:40', 'Paso 1: crea tu cuenta'],
      ['02:21', 'Paso 2: elige el diseño de tu tienda'],
      ['03:18', 'Paso 3: agrega tus productos (con IA)'],
      ['04:20', 'Paso 4: envíos, pedidos y políticas'],
      ['05:13', 'Paso 5: conecta tu dominio'],
      ['06:03', 'Paso 6: la revisión final antes de abrir'],
      ['06:42', '¿Para quién es ideal Shopify?'],
      ['07:06', 'Mi veredicto'],
    ],
    pasos: [
      ['Crea tu cuenta', 'Empieza con la prueba, elige tu país y responde las preguntas iniciales; Shopify ajusta el panel a tu tipo de negocio.'],
      ['Elige el diseño', 'Parte de un tema gratuito y cambia solo lo esencial: logo, colores, tipografía y la portada. Menos es más al principio.'],
      ['Agrega tus productos con IA', 'Sube fotos claras y usa el asistente de IA para un primer borrador de la descripción; luego reescríbela con tus palabras.'],
      ['Envíos, pedidos y políticas', 'Define zonas y tarifas de envío, y completa las políticas de devolución y privacidad antes de vender.'],
      ['Conecta tu dominio', 'Un dominio propio da confianza. Puedes comprarlo en Shopify o conectar uno que ya tengas.'],
      ['Revisión final', 'Haz un pedido de prueba, revisa la tienda en el celular y corrige textos antes de abrirla al público.'],
    ],
    paraQuien:
      'Para quien quiere vender productos propios o bajo demanda con un resultado profesional, sin depender de un equipo técnico.',
  },
  {
    numero: 4,
    slug: 'texto-a-video-pictory',
    titulo: 'Pictory AI en español: crea videos con IA a partir de un texto',
    resumen:
      'Convierte un guion, un artículo o una presentación en video: prepara el texto, genera el video, cambia los visuales, elige la voz, agrega subtítulos y descárgalo.',
    youtubeId: 'GiLy81wk4to',
    publicadoEl: '2026-11-04T15:00:00Z',
    herramienta: { slug: 'pictory', nombre: 'Pictory AI', cta: 'Probar Pictory AI' },
    extra: null,
    capitulos: [
      ['00:00', 'Este video empezó siendo un texto'],
      ['01:04', 'Qué es Pictory AI'],
      ['01:51', 'Paso 1: crea tu cuenta'],
      ['02:34', 'Paso 2: prepara tu texto'],
      ['03:24', 'Paso 3: genera el video'],
      ['04:15', 'Paso 4: elige los visuales'],
      ['05:09', 'Paso 5: la voz y los subtítulos'],
      ['06:02', 'Paso 6: descarga y publica (un guion, dos videos)'],
      ['06:42', '¿Para quién es ideal Pictory?'],
      ['07:09', 'Mi veredicto'],
    ],
    pasos: [
      ['Crea tu cuenta', 'Regístrate y conoce las opciones de inicio: de guion, de artículo, de presentación o de video.'],
      ['Prepara tu texto', 'Escribe frases cortas y una idea por párrafo: cada párrafo se convierte en una escena.'],
      ['Genera el video', 'Pega el texto y deja que el agente de Pictory arme la primera versión con escenas y música.'],
      ['Elige los visuales', 'Cambia las escenas que no encajan por imágenes o clips que sí cuenten lo que dice el texto.'],
      ['Voz y subtítulos', 'Elige una voz con IA o sube la tuya, y ajusta el estilo de los subtítulos para que se lean bien en el celular.'],
      ['Descarga y publica', 'Exporta en horizontal para YouTube y en vertical para reels: con un solo guion obtienes dos videos.'],
    ],
    paraQuien:
      'Para canales sin mostrar la cara, blogs que quieren convertir artículos en video y quien necesita publicar seguido sin un equipo de edición.',
  },
  {
    numero: 3,
    slug: 'imagen-a-video-higgsfield',
    titulo: 'Convierte tus imágenes en video con IA: Higgsfield paso a paso',
    resumen:
      'Dale movimiento a una imagen fija: prepárala, elige el modelo y la configuración, escribe la indicación de movimiento con una fórmula de tres partes y usa tus clips en la edición.',
    youtubeId: '_Bf6P8yxq7I',
    publicadoEl: '2026-10-21T20:30:08Z',
    herramienta: { slug: 'higgsfield', nombre: 'Higgsfield', cta: 'Probar Higgsfield' },
    extra: null,
    capitulos: [
      ['00:00', 'Esta imagen cobró vida con IA'],
      ['01:13', 'Qué es Higgsfield'],
      ['02:00', 'Paso 1: crea tu cuenta y conoce el panel'],
      ['02:41', 'Paso 2: prepara tu imagen'],
      ['03:36', 'Paso 3: elige el modelo y la configuración'],
      ['04:29', 'Paso 4: la fórmula para pedir el movimiento'],
      ['05:39', 'Paso 5: genera y corrige'],
      ['06:31', 'Paso 6: usa tus clips en la edición'],
      ['07:11', '¿Para quién es ideal Higgsfield?'],
      ['07:30', 'Mi veredicto'],
    ],
    pasos: [
      ['Crea tu cuenta', 'Regístrate y ubica las secciones de imagen y de video del panel.'],
      ['Prepara tu imagen', 'Usa una imagen nítida, bien iluminada y con el sujeto claro; la IA anima mejor lo que entiende bien.'],
      ['Elige modelo y configuración', 'Escoge el modelo de video, la duración y el formato (horizontal o vertical) según dónde lo vas a publicar.'],
      ['La fórmula del movimiento', 'Describe en tres partes: qué se mueve, cómo se mueve la cámara y el ambiente (luz, partículas). Movimientos suaves dan mejores resultados.'],
      ['Genera y corrige', 'Revisa el clip; si algo se deforma, simplifica la indicación o reduce el movimiento y vuelve a generar.'],
      ['Úsalo en la edición', 'Intercala los clips animados con imágenes fijas para que el video se sienta dinámico sin cansar.'],
    ],
    paraQuien:
      'Para quien crea videos sin mostrar la cara, reels, contenido educativo o anuncios cortos y quiere más movimiento en pantalla.',
  },
  {
    numero: 2,
    slug: 'voz-con-ia-elevenlabs',
    titulo: 'Cómo crear una voz profesional con IA para tus videos (ElevenLabs)',
    resumen:
      'Convierte tu guion en una voz natural en español: prepara el texto, elige la voz, ajusta la configuración, corrige y descarga tus audios.',
    youtubeId: 'yL_yMGPeeFA',
    publicadoEl: '2026-10-20T20:45:52Z',
    herramienta: { slug: 'elevenlabs', nombre: 'ElevenLabs', cta: 'Probar ElevenLabs' },
    extra: null,
    capitulos: [
      ['00:00', 'Esta voz fue creada con IA'],
      ['01:16', 'Qué es ElevenLabs'],
      ['02:04', 'Paso 1: crea tu cuenta y conoce el panel'],
      ['02:51', 'Paso 2: prepara tu texto'],
      ['03:52', 'Paso 3: elige la voz'],
      ['04:51', 'Paso 4: ajusta la configuración'],
      ['06:04', 'Paso 5: genera y corrige'],
      ['06:58', 'Paso 6: descarga y usa tu audio'],
      ['07:26', '¿Para quién es ideal ElevenLabs?'],
      ['07:59', 'Mi veredicto'],
    ],
    pasos: [
      ['Crea tu cuenta', 'Regístrate y abre la sección de texto a voz; ahí harás casi todo el trabajo.'],
      ['Prepara tu texto', 'Frases cortas y puntuación clara: la IA lee las comas y los puntos como pausas.'],
      ['Elige la voz', 'Prueba tres voces con el mismo párrafo antes de decidir. Que encaje con el tono de tu canal.'],
      ['Ajusta la configuración', 'Un poco menos de estabilidad da una lectura más expresiva; súbela si la voz suena irregular.'],
      ['Genera y corrige', 'Escucha con audífonos y vuelve a generar solo la frase que no suena bien.'],
      ['Descarga y organiza', 'Guarda un audio por escena con un nombre numerado: la edición va mucho más rápido.'],
    ],
    paraQuien:
      'Para videos sin mostrar la cara, contenido educativo, documentales, audiolibros o podcasts.',
  },
  {
    numero: 1,
    slug: 'videos-con-ia-sin-mostrar-tu-cara',
    titulo: 'Cómo crear videos para YouTube con IA sin mostrar tu cara',
    resumen:
      'El proceso completo: guion que suene natural, voz con IA, imágenes con un estilo coherente, edición, publicación y cómo analizar los resultados.',
    youtubeId: 'DbfELi8zLXI',
    publicadoEl: '2026-10-19T16:30:13Z',
    herramienta: { slug: 'elevenlabs', nombre: 'ElevenLabs', cta: 'Probar ElevenLabs (la voz del video)' },
    extra: null,
    capitulos: [
      ['00:00', 'Un video hecho con IA, sin cámara'],
      ['01:12', 'Los 4 pasos y el orden correcto'],
      ['01:58', 'Paso 1: el guion'],
      ['03:47', 'Paso 2: la voz'],
      ['05:07', 'Paso 3: las imágenes'],
      ['06:39', 'Paso 4: la edición'],
      ['07:47', 'Revisión y exportación'],
      ['08:30', 'Cómo publicar tu video'],
      ['08:53', 'Analiza tus resultados'],
    ],
    pasos: [
      ['El guion', 'Una idea por escena, un gancho al inicio y un cierre claro. La IA da el borrador; tu voz lo hace tuyo.'],
      ['La voz', 'Convierte el guion en audio con una voz con IA natural, escena por escena.'],
      ['Las imágenes', 'Genera imágenes con una misma descripción base para que todo el video se vea de la misma marca.'],
      ['La edición', 'Une voz, imágenes, música y movimiento; revisa el ritmo y exporta en alta calidad.'],
      ['Publica', 'Título claro, miniatura legible, descripción con capítulos y enlaces.'],
      ['Analiza', 'Mira la retención y los primeros segundos de cada video para mejorar el siguiente.'],
    ],
    paraQuien:
      'Para quien quiere empezar un canal sin cámara ni micrófono y necesita ver el proceso completo de principio a fin.',
  },
];

// true cuando el video ya se puede ver (tiene ID y ya pasó la hora de estreno).
export function videoPublicado(t) {
  if (!t || !t.youtubeId) return false;
  if (!t.estreno) return true;
  return Date.now() >= Date.parse(t.estreno);
}

export function tutorialPorSlug(slug) {
  return TUTORIALES.find((t) => t.slug === slug) || null;
}

export function ultimosTutoriales(n = 3) {
  return [...TUTORIALES].sort((a, b) => b.numero - a.numero).slice(0, n);
}
