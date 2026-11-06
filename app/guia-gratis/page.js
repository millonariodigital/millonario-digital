import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
import FormularioGuia from '../../components/FormularioGuia';
import { GUIA_TITULO, GUIA_PORTADA, extraDe } from '../../lib/guia';
import './guia.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millonario-digital.com';

export const metadata = {
  title: `Kit gratis: ${GUIA_TITULO}`,
  description:
    'Descarga gratis el kit para crear videos con inteligencia artificial sin mostrar tu cara: el flujo completo en 7 pasos, plantilla de guion, 20 prompts de imágenes, checklists para reels y videos largos y un plan de 30 días.',
  alternates: { canonical: '/guia-gratis' },
  openGraph: {
    title: `Kit gratis: ${GUIA_TITULO}`,
    description:
      'El flujo, las plantillas y los prompts que uso para crear videos y reels con IA sin mostrar la cara.',
    url: `${SITE_URL}/guia-gratis`,
    type: 'website',
    images: [{ url: GUIA_PORTADA, width: 1020, height: 1320, alt: GUIA_TITULO }],
  },
};

const CONTENIDO = [
  ['01', 'El flujo completo en 7 pasos', 'De la idea al video publicado: qué hacer en cada paso, con qué herramienta y qué error evitar.'],
  ['02', 'Plantilla de guion', 'La estructura que uso en cada video, con un ejemplo real y el prompt para pedirle el borrador a la IA.'],
  ['03', '20 prompts de imágenes', 'Escenas con mascota, persona de espaldas, fondos e interfaces, en 16:9 y 9:16.'],
  ['04', 'Checklist del reel que retiene', 'Lo que estamos aprendiendo con datos reales: primeros segundos, texto en pantalla y duración.'],
  ['05', 'Checklist del video largo', 'Contenido, imagen, sonido y lo que hay que revisar en YouTube antes de publicar.'],
  ['06', 'Plan de 30 días', 'De cero a 3 videos largos y 12 reels en un mes, con una rutina semanal realista.'],
];

export default function GuiaGratisPage({ searchParams }) {
  const extra = extraDe(searchParams?.tema);
  const tema = extra ? extra.clave : null;

  return (
    <>
      <div className="bg-circuit" aria-hidden="true" />
      <header>
        <div className="logo">
          <img className="logo-mark" src="/logo.png" alt="Millonario Digital" />
          <Link href="/" className="logo-word" style={{ textDecoration: 'none' }}>
            <em>Millonario Digital</em>
          </Link>
        </div>
        <nav className="top-links">
          <Link href="/">← Volver al inicio</Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="gg-wrap">
        <section className="gg-hero">
          <div>
            <span className="eyebrow mono">KIT GRATUITO · PDF</span>
            <h1>
              Crea videos con IA <span className="grad">sin mostrar tu cara</span>
            </h1>
            <p className="gg-lead">
              El flujo, las plantillas y los prompts que uso para crear los videos y reels de Millonario
              Digital, explicados paso a paso.
            </p>

            {extra && (
              <div className="gg-extra">
                <span className="gg-extra-tag">INCLUYE EL EXTRA DE {extra.nombre.toUpperCase()}</span>
                <span>{extra.titulo}</span>
              </div>
            )}

            <div className="gg-card">
              <FormularioGuia fuente="landing" tema={tema} redirigir />
              <span className="gg-micro">12 páginas · Descarga inmediata · Sin costo</span>
            </div>

            <ul className="gg-puntos">
              <li>El flujo completo en 7 pasos, con sus herramientas.</li>
              <li>Plantilla de guion y 20 prompts de imágenes listos para copiar.</li>
              <li>Checklists para reels y videos largos, y un plan de 30 días.</li>
            </ul>
          </div>

          <div className="gg-portada">
            <img src={GUIA_PORTADA} alt={`Portada del kit: ${GUIA_TITULO}`} width="1020" height="1320" />
          </div>
        </section>

        <section className="gg-seccion">
          <span className="eyebrow mono">DENTRO DEL KIT</span>
          <h2>Lo que vas a encontrar</h2>
          <div className="gg-lista">
            {CONTENIDO.map(([num, titulo, desc]) => (
              <div className="gg-item" key={num}>
                <span className="gg-num">{num}</span>
                <div>
                  <strong>{titulo}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="gg-honesto">
          <strong>Por qué confiar en este kit.</strong> Es el mismo método que uso cada semana para crear
          los videos de Millonario Digital, con lo que estamos aprendiendo de nuestros propios números. No
          es una promesa de resultados: el crecimiento depende del tema que elijas, de la calidad de cada
          video y de tu constancia. Este sitio contiene enlaces de afiliados.
        </section>

        <section className="gg-final">
          <h2>Descarga el kit y crea tu primer video</h2>
          <div className="gg-card" style={{ margin: '0 auto' }}>
            <FormularioGuia fuente="landing-final" tema={tema} redirigir />
          </div>
        </section>
      </main>

      <div className="foot-bottom" style={{ borderTop: '1px solid var(--line)' }}>
        <span>© {new Date().getFullYear()} Millonario Digital</span>
        <span>
          <Link href="/privacidad" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
            Privacidad
          </Link>
          {' · '}
          <Link href="/politicas-de-uso" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
            Políticas de uso
          </Link>
        </span>
      </div>
    </>
  );
}
