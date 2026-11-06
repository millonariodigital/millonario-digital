import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';
import { GUIA_URL, GUIA_TITULO, GUIA_PORTADA, GUIA_ANTERIOR_URL, GUIA_ANTERIOR_TITULO, extraDe } from '../../../lib/guia';
import '../guia.css';

// Esta página no debe aparecer en Google: es solo para quien ya se registró.
export const metadata = {
  title: 'Tu kit está listo',
  robots: { index: false, follow: false },
};

export default function GraciasPage({ searchParams }) {
  const extra = extraDe(searchParams?.tema);
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
          <h1>Tu kit está listo para descargar</h1>
          <p className="gg-lead">
            Gracias por registrarte. Descarga el PDF aquí abajo y guárdalo donde lo tengas a mano. Empieza por el flujo de 7 pasos y el plan de 30 días.
          </p>

          <div className="gg-portada">
            <img
              src={GUIA_PORTADA}
              alt={`Portada del kit: ${GUIA_TITULO}`}
              width="1020"
              height="1320"
            />
          </div>

          <a className="btn btn-glow" href={GUIA_URL} download>
            Descargar el kit (PDF)
          </a>

          {extra && (
            <a className="btn btn-ghost" href={extra.url} download style={{ marginTop: 12 }}>
              Descargar el extra de {extra.nombre} (PDF)
            </a>
          )}

          <p className="gg-micro" style={{ marginTop: 18 }}>
            Bonus:{' '}
            <a href={GUIA_ANTERIOR_URL} download style={{ color: 'var(--cyan)' }}>
              {GUIA_ANTERIOR_TITULO} (PDF)
            </a>
          </p>
        </div>

        <section className="gg-gracias" style={{ marginTop: '8vh' }}>
          <span className="eyebrow mono">SIGUIENTE PASO</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', margin: '8px 0 0' }}>
            Mira cómo lo aplico en cada video
          </h2>

          <div className="gg-pasos">
            <div className="gg-paso">
              <h3>Mira los tutoriales en YouTube</h3>
              <p>Cada semana publico un video nuevo con una herramienta de IA, paso a paso y sin mostrar la cara.</p>
              <a href="https://www.youtube.com/@millonariodigital_oficial?sub_confirmation=1" target="_blank" rel="noopener" className="btn btn-glow">
                Suscribirme al canal
              </a>
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
