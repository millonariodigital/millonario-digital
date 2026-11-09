import Link from 'next/link';
import FormularioGuia from './FormularioGuia';
import { GUIA_PORTADA, extraDe, EXTRAS } from '../lib/guia';
import { TEST_URL } from '../lib/test';
import './caja-kit.css';

// Recuadro del kit al final de reseñas y artículos del blog.
// El título cambia según la categoría para conectar con lo que la persona acaba de leer.
// - fuente: de dónde viene el registro (resena-<slug> o blog-<slug>) para medirlo.
// - herramienta: nombre de la herramienta de la reseña (opcional).
// - tema: si la herramienta tiene un extra (lib/guia.js), se entrega junto al kit.
const TITULOS = {
  'ia-automatizacion': (h) => (h ? `¿Vas a crear contenido con ${h}?` : '¿Vas a crear contenido con IA?'),
  ecommerce: () => 'Muestra tus productos con videos hechos con IA',
  freelancing: () => 'Ofrece videos con IA como un servicio más',
  'trading-inversion': () => 'Comparte lo que aprendes en video, sin mostrar tu cara',
  crypto: () => 'Comparte lo que aprendes en video, sin mostrar tu cara',
};

export default function CajaKit({ fuente, categoriaSlug = '', categoriaNombre = '', herramienta = null, tema = null }) {
  const titulo = TITULOS[categoriaSlug] ? TITULOS[categoriaSlug](herramienta) : '¿Quieres crear videos con IA sin mostrar tu cara?';
  const temaValido = tema && EXTRAS[tema] ? tema : null;
  const extra = extraDe(temaValido);
  return (
    <aside className="caja-kit" aria-label="Kit gratis">
      <img src={GUIA_PORTADA} alt="" className="caja-kit-portada" loading="lazy" />
      <div className="caja-kit-cuerpo">
        <span className="mono caja-kit-eti">KIT SIN COSTO</span>
        <h2>{titulo}</h2>
        <p>
          Descarga el kit para crear videos con IA sin mostrar tu cara: guion, voz, imágenes y edición, con
          plantillas y prompts listos para usar.
          {extra ? ` Incluye el extra de ${extra.nombre}: ${extra.titulo.toLowerCase()}.` : ''}
        </p>
        <FormularioGuia fuente={fuente} interes={categoriaNombre ? categoriaNombre.slice(0, 60) : null} tema={temaValido} redirigir />
        <p className="caja-kit-nota">
          ¿No sabes por dónde empezar? <Link href={TEST_URL}>Haz el test de 2 minutos →</Link>
        </p>
      </div>
    </aside>
  );
}
