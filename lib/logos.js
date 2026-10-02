import fs from 'fs';
import path from 'path';
import { iconoUrl } from './acentos';

// Resuelve el logo de un programa SOLO si existe de verdad, revisando
// el disco en el servidor (igual que portadaUrl para las fotos). Así
// nunca se intenta cargar un logo que no existe y aparezca el ícono
// de "imagen rota" — si no hay nada, devuelve null y la tarjeta no
// muestra ningún logo (en vez de un error visual).
//
// IMPORTANTE: este archivo usa "fs" (lectura de disco), por eso debe
// llamarse solo desde páginas del servidor (app/page.js, app/categoria,
// app/resenas), NUNCA desde un componente que empiece con 'use client'
// como CatalogoInteractivo.js — igual que ya pasa con lib/portada.js.
export function logoUrl(slug) {
  if (!slug) return null;
  for (const ext of ['png', 'svg']) {
    const ruta = path.join(process.cwd(), 'public', 'logos', `${slug}.${ext}`);
    if (fs.existsSync(ruta)) return `/logos/${slug}.${ext}`;
  }
  return iconoUrl(slug);
}
