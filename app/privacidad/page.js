import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata = {
  title: 'Política de Privacidad',
  description:
    'Qué datos recolecta Millonario Digital, para qué los usa, y qué derechos tienes sobre tu información.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
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
          PRIVACIDAD
        </span>
        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', margin: '10px 0 8px', lineHeight: 1.25 }}>
          Política de Privacidad
        </h1>
        <span className="date" style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          Última actualización: 2 de octubre de 2026
        </span>

        <div className="article-body" style={{ marginTop: '20px', lineHeight: 1.75, color: 'var(--text)' }}>
          <h2>1. Qué información recolectamos</h2>
          <p>
            <strong>Datos que nos das tú directamente:</strong> si usas nuestro formulario de
            contacto, el test &quot;Descubre tu camino&quot; o te suscribes al boletín, recibimos
            el nombre, correo electrónico y/o mensaje que escribas.
          </p>
          <p>
            <strong>Datos automáticos de navegación:</strong> como la mayoría de sitios web,
            cuando visitas Millonario Digital nuestro proveedor de analítica puede recolectar
            datos como tu dirección IP aproximada, el navegador y dispositivo que usas, las
            páginas que visitas y cuánto tiempo pasas en ellas. Esto nos sirve para entender qué
            contenido es útil y mejorar el Sitio — no para identificarte personalmente.
          </p>

          <h2>2. Cómo usamos tu información</h2>
          <ul>
            <li>Responder tus mensajes de contacto.</li>
            <li>Enviarte el boletín, si te suscribiste (puedes darte de baja cuando quieras).</li>
            <li>Entender qué páginas y reseñas son más útiles, para mejorar el Sitio.</li>
            <li>Medir, de forma agregada, qué enlaces de afiliados generan más interés.</li>
          </ul>
          <p>No vendemos tu información personal a terceros.</p>

          <h2>3. Con quién compartimos datos</h2>
          <p>
            Usamos proveedores externos para operar el Sitio: hosting (Vercel), base de datos
            (Supabase) y, si está activa, analítica (Google Analytics). Estos proveedores procesan
            datos en nuestro nombre bajo sus propias políticas de seguridad. No compartimos tu
            información con terceros para fines de publicidad ajenos a este Sitio.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Usamos cookies y almacenamiento local del navegador para recordar tu preferencia de
            tema (claro/oscuro) y, si la analítica está activa, para medir visitas de forma
            agregada. Más detalle en nuestra{' '}
            <Link href="/cookies" style={{ color: 'var(--cyan)' }}>
              Política de Cookies
            </Link>
            .
          </p>

          <h2>5. Tus derechos</h2>
          <p>
            Puedes pedirnos en cualquier momento que te digamos qué datos tuyos tenemos, que los
            corrijamos, o que los eliminemos (por ejemplo, darte de baja del boletín o borrar un
            mensaje de contacto). Escríbenos a{' '}
            <a href="mailto:contacto@millonario-digital.com" style={{ color: 'var(--cyan)' }}>
              contacto@millonario-digital.com
            </a>{' '}
            y lo resolvemos directamente.
          </p>

          <h2>6. Menores de edad</h2>
          <p>
            Este Sitio no está dirigido a menores de edad y no recolectamos a sabiendas
            información de menores.
          </p>

          <h2>7. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente. La fecha de
            &quot;Última actualización&quot; arriba indica la versión vigente.
          </p>

          <h2>8. Contacto</h2>
          <p>
            Para cualquier duda sobre tu privacidad o tus datos:{' '}
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
