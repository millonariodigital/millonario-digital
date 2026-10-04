'use client';

import { useEffect, useState } from 'react';

// Botones para compartir una reseña o artículo. Usa la URL actual de la
// página (se lee en el navegador, ya que este componente corre del lado
// del cliente) para que el enlace compartido sea siempre el correcto.
export default function CompartirBotones({ titulo }) {
  const [url, setUrl] = useState('');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const textoCodificado = encodeURIComponent(titulo || '');
  const urlCodificada = encodeURIComponent(url);

  async function copiarEnlace() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Si el navegador bloquea el portapapeles, no hacemos nada más —
      // el enlace sigue visible en la barra de direcciones.
    }
  }

  return (
    <div className="compartir">
      <span className="mono compartir-label">COMPARTIR</span>
      <div className="compartir-botones">
        <a
          className="compartir-btn"
          href={`https://wa.me/?text=${textoCodificado}%20${urlCodificada}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir por WhatsApp"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.2a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 1 1 15.2-4.38 8.24 8.24 0 0 1-8.22 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.47-.01a.9.9 0 0 0-.66.31c-.23.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.28Z"/>
          </svg>
        </a>
        <a
          className="compartir-btn"
          href={`https://www.facebook.com/sharer/sharer.php?u=${urlCodificada}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en Facebook"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.95 8.44-9.94Z"/>
          </svg>
        </a>
        <a
          className="compartir-btn"
          href={`https://twitter.com/intent/tweet?text=${textoCodificado}&url=${urlCodificada}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en X"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.9 2H22l-7.6 8.68L23.3 22h-7.1l-5.55-7.26L4.3 22H1.2l8.14-9.3L.9 2h7.28l5.02 6.64L18.9 2Zm-1.25 18h1.75L7.47 4H5.6l12.05 16Z"/>
          </svg>
        </a>
        <a
          className="compartir-btn"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${urlCodificada}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en LinkedIn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z"/>
          </svg>
        </a>
        <button
          className="compartir-btn"
          onClick={copiarEnlace}
          type="button"
          aria-label="Copiar enlace"
        >
          {copiado ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
      {copiado && <span className="compartir-copiado">¡Enlace copiado!</span>}
    </div>
  );
}
