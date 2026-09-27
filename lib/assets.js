import fs from 'fs';
import path from 'path';

const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp'];

// Busca una imagen suelta en /public por su nombre base (sin extensión),
// probando varios formatos. Sirve para banners únicos del sitio (no por
// slug), como el banner de arriba o el de abajo en la página de inicio.
export function imagenSitio(nombreBase) {
  for (const ext of EXTENSIONES) {
    const ruta = path.join(process.cwd(), 'public', `${nombreBase}.${ext}`);
    if (fs.existsSync(ruta)) {
      return `/${nombreBase}.${ext}`;
    }
  }
  return null;
}
