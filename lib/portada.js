import fs from 'fs';
import path from 'path';

// Formatos que aceptamos, en orden de preferencia.
const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp'];

// Busca si Douglas subió una imagen de portada para este slug
// (reseña o artículo) en public/portadas/{slug}.{ext}.
// Devuelve la ruta pública ("/portadas/algo.jpg") o null si no existe.
export function portadaUrl(slug) {
  if (!slug) return null;
  for (const ext of EXTENSIONES) {
    const ruta = path.join(process.cwd(), 'public', 'portadas', `${slug}.${ext}`);
    if (fs.existsSync(ruta)) {
      return `/portadas/${slug}.${ext}`;
    }
  }
  return null;
}
