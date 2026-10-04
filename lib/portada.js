import fs from 'fs';
import path from 'path';

// Formatos que aceptamos, en orden de preferencia.
const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp'];

// Busca si Douglas subió una imagen de portada para este slug
// (reseña o artículo) en public/fotos-portada/{slug}.{ext}.
// Devuelve la ruta pública ("/fotos-portada/algo.jpg") o null si no existe.
export function portadaUrl(slug) {
  if (!slug) return null;
  for (const ext of EXTENSIONES) {
    const ruta = path.join(process.cwd(), 'public', 'fotos-portada', `${slug}.${ext}`);
    if (fs.existsSync(ruta)) {
      return `/fotos-portada/${slug}.${ext}`;
    }
  }
  return null;
}
