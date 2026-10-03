import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata = {
  title: 'Política de Cookies',
  description: 'Qué cookies usa Millonario Digital y para qué sirve cada una.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
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

      <article
        className="content-panel"
        style={{ maxWidth: '760px', margin: '4vh auto 8vh', padding: '5vh 6vw' }}
      >
        <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--cyan)' }}>
          COOKIES
        </span>
        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', margin: '10px 0 8px', lineHeight: 1.25 }}>
          Política de Cookies
        </h1>
        <span className="date" style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          Última actualización: 2 de octubre de 2026
        </span>

        <div className="article-body" style={{ marginTop: '20px', lineHeight: 1.75, color: 'var(--text)' }}>
          <p>
            Una cookie es un pequeño archivo que un sitio web guarda en tu navegador. Aquí
            explicamos qué guardamos y para qué.
          </p>

          <h2>1. Lo esencial para que el Sitio funcione</h2>
          <p>
            Guardamos tu preferencia de tema (modo claro u oscuro) en el almacenamiento local de
            tu navegador, para recordarla la próxima vez que visites el Sitio. No se comparte con
            nadie — vive solo en tu dispositivo.
          </p>

          <h2>2. Analítica (si está activa)</h2>
          <p>
            Cuando está activada, usamos Google Analytics para entender de forma agregada cuántas
            personas visitan el Sitio, qué páginas leen y desde qué país o dispositivo. Estas
            cookies no nos dicen quién eres — solo patrones generales de uso que nos ayudan a
            mejorar el contenido. Puedes bloquear estas cookies desde la configuración de tu
            navegador sin que el Sitio deje de funcionar.
          </p>

          <h2>3. Enlaces de afiliados</h2>
          <p>
            Cuando haces clic en un botón de &quot;Visitar&quot; hacia un programa o plataforma,
            ese enlace puede incluir un identificador de afiliado para que la plataforma sepa que
            la visita vino de Millonario Digital. Esto es lo que nos permite ganar una comisión
            sin costo extra para ti — más detalle en nuestras{' '}
            <Link href="/politicas-de-uso" style={{ color: 'var(--cyan)' }}>
              Políticas de Uso
            </Link>
            .
          </p>

          <h2>4. Cómo controlar las cookies</h2>
          <p>
            La mayoría de navegadores te permiten ver, bloquear o borrar cookies desde su
            configuración de privacidad. Bloquear las cookies de analítica no afecta tu capacidad
            de leer el Sitio con normalidad.
          </p>

          <h2>5. Contacto</h2>
          <p>
            Preguntas sobre esta política:{' '}
            <a href="mailto:contacto@millonario-digital.com" style={{ color: 'var(--cyan)' }}>
              contacto@millonario-digital.com
            </a>
          </p>
        </div>
      </article>

      <div className="foot-bottom" style={{ borderTop: '1px solid var(--line)' }}>
        <span>© {new Date().getFullYear()} Millonario Digital</span>
        <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          ← Volver al inicio
        </Link>
      </div>
    </>
  );
}
