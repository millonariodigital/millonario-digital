// Reseñas con el enfoque nuevo (desde nov 2026): en vez de "pros y contras",
// explican qué es la herramienta, cómo ayuda y cómo empezar. Lo que conviene
// revisar antes de pagar se mantiene, porque la honestidad es parte de la marca.
// Si una herramienta tiene entrada aquí, la página /resenas/<slug> usa este
// contenido; si no, sigue mostrando el texto guardado en Supabase.
// Regla: sin cifras de ingresos ni precios exactos (cambian por país y fecha).

export const RESENAS_NUEVAS = {
  elevenlabs: {
    titulo: 'ElevenLabs: voces con IA naturales para tus videos',
    meta: 'Qué es ElevenLabs, para qué sirve y cómo empezar a crear voces con IA en español para videos, reels y audiolibros, paso a paso.',
    queEs:
      'ElevenLabs es una plataforma que convierte texto en voz con inteligencia artificial. Escribes o pegas tu guion, eliges una voz y en segundos tienes una narración natural, con pausas y entonación, lista para usar en tus videos.',
    paraQueSirve: [
      'Narrar videos de YouTube, reels y tutoriales sin grabar tu propia voz.',
      'Crear audiolibros, podcasts o lecciones de un curso.',
      'Tener una voz constante para tu marca en todos tus contenidos.',
      'Traducir y doblar tus videos a otros idiomas.',
    ],
    comoAyuda:
      'Te ahorra el micrófono, el estudio y las horas de grabar y regrabar. Si una frase no suena bien, la vuelves a generar sola, sin repetir todo el audio. Para un canal sin mostrar la cara, es la pieza que da vida al guion.',
    pasos: [
      ['Crea tu cuenta', 'Regístrate y abre la sección de texto a voz; ahí harás casi todo el trabajo.'],
      ['Prueba tres voces con el mismo párrafo', 'Escucha cuál encaja con el tono de tu canal antes de decidir.'],
      ['Genera por escenas', 'Un audio por párrafo, con nombre numerado: la edición va mucho más rápido.'],
    ],
    antesDePagar: [
      'Revisa cuántos caracteres incluye cada plan y cuántos usa un video tuyo.',
      'Confirma que el plan te permite uso comercial si vas a monetizar.',
      'Usa la clonación de voz solo con tu propia voz o con permiso expreso.',
    ],
    paraQuien: 'Para canales sin mostrar la cara, contenido educativo, audiolibros, podcasts y creadores que publican seguido.',
  },
  higgsfield: {
    titulo: 'Higgsfield: convierte tus imágenes en video con IA',
    meta: 'Qué es Higgsfield, para qué sirve y cómo dar movimiento a tus imágenes con IA para reels, anuncios y videos, paso a paso.',
    queEs:
      'Higgsfield es una plataforma de inteligencia artificial para crear imágenes y videos. Su fuerte es dar movimiento a una imagen fija: describes cómo se mueve el sujeto y la cámara, y genera un clip corto con efecto cinematográfico.',
    paraQueSirve: [
      'Animar las imágenes de tus videos para que no se vean como fotos fijas.',
      'Crear clips cortos para reels, anuncios y portadas en movimiento.',
      'Generar imágenes con un estilo coherente para toda tu marca.',
    ],
    comoAyuda:
      'Te da escenas en movimiento sin cámaras, locaciones ni animadores. Intercalar clips animados con imágenes fijas hace que un video se sienta más dinámico y retenga mejor a la audiencia.',
    pasos: [
      ['Prepara una buena imagen', 'Nítida, bien iluminada y con el sujeto claro: la IA anima mejor lo que entiende bien.'],
      ['Elige modelo y formato', 'Horizontal para YouTube, vertical para reels; empieza con duraciones cortas.'],
      ['Describe el movimiento en tres partes', 'Qué se mueve, cómo se mueve la cámara y el ambiente. Los movimientos suaves dan mejores resultados.'],
    ],
    antesDePagar: [
      'Revisa cuántos créditos usa cada clip según el modelo y la duración.',
      'Prueba primero con pocas imágenes para medir cuántos créditos necesitas por video.',
      'Verifica las condiciones de uso comercial de lo que generas.',
    ],
    paraQuien: 'Para creadores de videos sin mostrar la cara, reels, contenido educativo y anuncios cortos.',
  },
  pictory: {
    titulo: 'Pictory AI: crea videos con IA a partir de un texto',
    meta: 'Qué es Pictory AI, para qué sirve y cómo convertir un guion, un artículo o una presentación en video con IA, paso a paso.',
    queEs:
      'Pictory es una herramienta que transforma texto en video. Pegas un guion, un artículo o una presentación, y arma automáticamente las escenas con imágenes, música, voz y subtítulos que después puedes ajustar.',
    paraQueSirve: [
      'Convertir artículos de blog en videos para YouTube y redes.',
      'Crear videos educativos o explicativos desde un guion.',
      'Sacar la versión horizontal y la vertical de un mismo contenido.',
    ],
    comoAyuda:
      'Reduce mucho el tiempo de edición: en lugar de buscar cada imagen y colocar cada subtítulo, partes de una primera versión completa y te dedicas a mejorarla. Ideal para publicar seguido sin un equipo de edición.',
    pasos: [
      ['Prepara tu texto', 'Frases cortas y una idea por párrafo: cada párrafo se convierte en una escena.'],
      ['Genera la primera versión', 'Pega el texto y deja que arme escenas, música y subtítulos.'],
      ['Cambia lo que no encaje', 'Reemplaza las escenas que no cuentan lo que dice el texto y ajusta la voz y los subtítulos.'],
    ],
    antesDePagar: [
      'Revisa cuántos minutos de video y descargas incluye cada plan.',
      'Comprueba la calidad de exportación que necesitas (por ejemplo, alta definición).',
      'Revisa los visuales automáticos: a veces hay que cambiar varias escenas para que encajen.',
    ],
    paraQuien: 'Para canales sin mostrar la cara, blogs que quieren llevar sus artículos a video y quien necesita publicar con frecuencia.',
  },
  shopify: {
    titulo: 'Shopify: crea tu tienda online paso a paso',
    meta: 'Qué es Shopify, para qué sirve y cómo crear tu tienda online con IA, sin programar: diseño, productos, envíos y dominio.',
    queEs:
      'Shopify es una plataforma para crear y administrar tu propia tienda online sin programar. Desde un solo panel manejas el diseño de la tienda, los productos, los pedidos, los clientes y los envíos, en la computadora o desde la aplicación del celular.',
    paraQueSirve: [
      'Vender productos propios, de tu marca o bajo demanda.',
      'Tener una tienda con dominio propio que no dependa solo de las redes sociales.',
      'Conectar herramientas como Printful, correos o reseñas desde su tienda de aplicaciones.',
    ],
    comoAyuda:
      'Te da una tienda profesional en poco tiempo: diseños listos para usar, pagos y envíos configurables, y herramientas de IA que te ayudan con las descripciones de producto. Tú te concentras en tus productos y tus clientes.',
    pasos: [
      ['Crea tu cuenta y elige un diseño', 'Empieza con un tema que se vea bien en el celular y cambia solo lo esencial: logo, colores y portada.'],
      ['Agrega pocos productos bien presentados', 'Buenas fotos y una descripción clara; la IA te da un primer borrador que tú ajustas.'],
      ['Configura envíos y haz un pedido de prueba', 'Revisa la tienda desde el celular como si fueras un cliente antes de abrirla.'],
    ],
    antesDePagar: [
      'Usa el periodo de prueba y revisa qué incluye en tu país.',
      'Confirma qué medios de pago están disponibles para tus clientes.',
      'Instala solo las aplicaciones que necesites: algunas tienen costo mensual propio.',
    ],
    paraQuien: 'Para emprendedores que quieren su propia tienda, marcas que quieren crecer online y creadores que venden productos.',
  },
  printful: {
    titulo: 'Printful: crea productos con tu diseño sin inventario',
    meta: 'Qué es Printful, para qué sirve y cómo vender camisetas, tazas y pósters con tu diseño sin inventario, paso a paso.',
    queEs:
      'Printful es una plataforma de impresión bajo demanda. Eliges un producto de su catálogo, como una camiseta, una taza o un póster, le pones tu diseño y lo publicas en tu tienda. Cuando alguien compra, Printful lo fabrica, lo empaca y lo envía con tu marca.',
    paraQueSirve: [
      'Vender productos con tu marca sin comprar inventario por adelantado.',
      'Crear mercancía para tu canal, tu comunidad o tu negocio.',
      'Probar diseños nuevos sin arriesgar dinero en unidades que quizá no se vendan.',
    ],
    comoAyuda:
      'Te quita la parte más pesada de vender productos físicos: máquinas, cajas, empaques y envíos. Se conecta con tiendas como Shopify o Etsy, y los pedidos le llegan solos. Tú te dedicas a diseñar y a dar a conocer tu marca.',
    pasos: [
      ['Elige pocos productos', 'Empieza con una colección pequeña que tu público sí usaría, y revisa la ficha de cada producto.'],
      ['Diseña y crea tus mockups', 'Usa el Design Maker; si diseñas con IA, sube la imagen en alta resolución.'],
      ['Conecta tu tienda y pide una muestra', 'Comprueba calidad, colores y tamaño real antes de lanzar.'],
    ],
    antesDePagar: [
      'Calcula tu precio sumando el costo de producción y el envío, para que tu margen tenga sentido.',
      'Revisa los tiempos de producción y de envío a los países de tus clientes.',
      'Pide una muestra: es la mejor forma de saber qué recibirá tu cliente.',
    ],
    paraQuien: 'Para creadores de contenido, diseñadores e ilustradores, y para quien quiere una tienda con productos propios sin manejar inventario.',
  },
  synthesia: {
    titulo: 'Synthesia: videos con avatares de IA que hablan por ti',
    meta: 'Qué es Synthesia, para qué sirve y cómo crear videos con un avatar de IA que presenta tu guion, sin cámara ni estudio.',
    queEs:
      'Synthesia es una plataforma para crear videos con avatares de inteligencia artificial. Escribes el guion, eliges un presentador virtual y el avatar lo dice a cámara con voz y movimientos naturales, en español o en otros idiomas.',
    paraQueSirve: [
      'Crear videos con un presentador sin aparecer tú en cámara.',
      'Hacer tutoriales, cursos y capacitaciones con un rostro que explica.',
      'Producir el mismo video en varios idiomas a partir de un solo guion.',
    ],
    comoAyuda:
      'Te da la cercanía de un presentador sin cámara, sin estudio y sin grabar tomas una y otra vez. Si cambias una frase del guion, actualizas el video en minutos en lugar de volver a grabarlo.',
    pasos: [
      ['Escribe un guion corto', 'Frases claras y una idea por escena: el avatar se entiende mejor con oraciones simples.'],
      ['Elige el avatar y la voz', 'Que encajen con tu público y con el tono de tu marca.'],
      ['Agrega apoyo visual', 'Combina el avatar con imágenes, textos o grabaciones de pantalla para que el video no sea solo una cara hablando.'],
    ],
    antesDePagar: [
      'Revisa cuántos minutos de video incluye cada plan y si puedes usarlos comercialmente.',
      'Prueba la voz en español con tu propio guion antes de decidir.',
      'Si creas un avatar con tu imagen, lee bien las condiciones de uso y de privacidad.',
    ],
    paraQuien: 'Para educadores, empresas que capacitan a su equipo, creadores de cursos y quien quiere un presentador sin mostrar su cara.',
  },
};
