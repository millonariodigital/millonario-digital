import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Formatos que aceptamos, en orden de preferencia.
const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp'];

// Huella corta del contenido del archivo. Se agrega a la dirección (?v=...)
// para que, cuando una portada se reemplaza por otra con el mismo nombre,
// los navegadores descarguen la nueva en vez de mostrar la guardada en caché.
const huellas = new Map();
function huella(ruta) {
  if (huellas.has(ruta)) return huellas.get(ruta);
  let v = '';
  try {
    v = crypto.createHash('md5').update(fs.readFileSync(ruta)).digest('hex').slice(0, 8);
  } catch {
    v = '';
  }
  huellas.set(ruta, v);
  return v;
}

// Busca si Douglas subió una imagen de portada para este slug
// (reseña o artículo) en public/fotos-portada/{slug}.{ext}.
// Devuelve la ruta pública ("/fotos-portada/algo.jpg?v=xxxx") o null si no existe.
export function portadaUrl(slug) {
  if (!slug) return null;
  for (const ext of EXTENSIONES) {
    const ruta = path.join(process.cwd(), 'public', 'fotos-portada', `${slug}.${ext}`);
    if (fs.existsSync(ruta)) {
      const v = huella(ruta);
      return `/fotos-portada/${slug}.${ext}${v ? `?v=${v}` : ''}`;
    }
  }
  return null;
}
