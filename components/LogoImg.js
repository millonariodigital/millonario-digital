'use client';

import { useState } from 'react';

// Muestra el logo de un programa con este orden de prioridad:
// 1) Un archivo que Douglas subió a mano en public/logos/{slug}.png
//    o public/logos/{slug}.svg (aceptamos ambos formatos)
// 2) El ícono limpio automático (si existe para ese programa)
// 3) Nada (si ninguno de los dos existe)
const EXTENSIONES_CUSTOM = ['png', 'svg'];

export default function LogoImg({ slug, simpleSrc, className, alt = '' }) {
  const [paso, setPaso] = useState(0);
  // paso: 0..EXTENSIONES_CUSTOM.length-1 => intenta cada extensión custom
  //       EXTENSIONES_CUSTOM.length      => intenta el ícono simple
  //       más allá                        => no mostrar nada

  if (paso > EXTENSIONES_CUSTOM.length) return null;

  let src;
  if (paso < EXTENSIONES_CUSTOM.length) {
    src = `/logos/${slug}.${EXTENSIONES_CUSTOM[paso]}`;
  } else {
    if (!simpleSrc) return null;
    src = simpleSrc;
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setPaso((p) => p + 1)}
    />
  );
}
