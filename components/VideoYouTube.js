'use client';

import { useState } from 'react';
import { CANAL_SUSCRIBIR } from '../lib/tutoriales';

// Video "ligero": muestra la miniatura y solo carga YouTube al tocar Play.
// Así la página carga rápido y YouTube no pone cookies hasta que la persona decide ver el video.
export default function VideoYouTube({ id, titulo, miniatura }) {
  const [activo, setActivo] = useState(false);

  if (!id) {
    return (
      <div className="tut-video tut-video-pronto">
        <img src={miniatura} alt={titulo} />
        <div className="tut-pronto">
          <span className="mono">MUY PRONTO EN YOUTUBE</span>
          <a className="btn btn-glow" href={CANAL_SUSCRIBIR} target="_blank" rel="noopener">
            Suscribirme para verlo primero
          </a>
        </div>
      </div>
    );
  }

  if (activo) {
    return (
      <div className="tut-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="tut-video" onClick={() => setActivo(true)} aria-label={`Ver el video: ${titulo}`}>
      <img src={miniatura} alt="" />
      <span className="tut-play" aria-hidden="true">
        <svg viewBox="0 0 68 48" width="68" height="48">
          <path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#FF2E9F" />
          <path d="M45 24 27 14v20z" fill="#fff" />
        </svg>
      </span>
    </button>
  );
}
