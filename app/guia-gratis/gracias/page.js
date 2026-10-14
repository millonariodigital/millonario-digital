import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';
import { GUIA_URL, GUIA_TITULO } from '../../../lib/guia';
import '../guia.css';

// Esta página no debe aparecer en Google: es solo para quien ya se registró.
export const metadata = {
  title: 'Tu guía está lista',
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
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
          <Link href="/">Ir al inicio</Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="gg-wrap">
        <div className="gg-gracias">
          <span className="eyebrow mono">¡LISTO!</span>
          <h1>Tu guía está lista para descargar</h1>
          <p className="gg-lead">
            Gracias por registrarte. Descarga el PDF aquí abajo y guárdalo donde lo tengas a mano.
          </p>

          <div className="gg-portada">
            <img
              src="/guia-gratis-portada.jpg"
              alt={`Portada de la guía: ${GUIA_TITULO}`}
              width="1020"
              height="1320"
            />
          </div>

          <a className="btn btn-glow" href={GUIA_URL} download>
            Descargar la guía (PDF)
          </a>
        </div>

        <section className="gg-gracias" style={{ marginTop: '8vh' }}>
          <span className="eyebrow mono">SIGUIENTE PASO</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', margin: '8px 0 0' }}>
            Saca más provecho de la guía
          </h2>

          <div className="gg-pasos">
            <div className="gg-paso">
              <h3>Descubre cuál de las 7 encaja contigo</h3>
              <p>Responde unas preguntas rápidas y te mostramos por dónde empezar y qué herramientas mirar.</p>
              <Link href="/descubre-tu-camino" className="btn btn-glow">
                Hacer el cuestionario
              </Link>
            </div>
            <div className="gg-paso">
              <h3>Lee los últimos análisis</h3>
              <p>Guías y reseñas con pros y contras reales de programas y herramientas para generar ingresos.</p>
              <Link href="/blog" className="btn btn-ghost">
                Ir al blog
              </Link>
            </div>
          </div>

          <p className="gg-redes">
            Síguenos:
            <a href="https://www.instagram.com/millonariodigital_oficial" target="_blank" rel="noopener">
              Instagram
            </a>
            <a href="https://www.youtube.com/@millonariodigital_oficial" target="_blank" rel="noopener">
              YouTube
            </a>
            <a href="https://www.tiktok.com/@millonariodigita_oficial" target="_blank" rel="noopener">
              TikTok
            </a>
            <a href="https://www.facebook.com/millonariodigitallatam" target="_blank" rel="noopener">
              Facebook
            </a>
          </p>
        </section>
      </main>

      <div className="foot-bottom" style={{ borderTop: '1px solid var(--line)' }}>
        <span>© {new Date().getFullYear()} Millonario Digital</span>
        <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          ← Volver al inicio
        </Link>
      </div>
    </>
  );
}
