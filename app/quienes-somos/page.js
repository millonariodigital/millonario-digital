import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata = {
  title: 'Quiénes Somos',
  description:
    'Conoce la misión de Millonario Digital: ayudar a cualquier persona, sin importar su país, a generar ingresos digitales aprovechando la inteligencia artificial, con reseñas honestas basadas en investigación real.',
  alternates: { canonical: '/quienes-somos' },
};

export default function QuienesSomosPage() {
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
          QUIÉNES SOMOS
        </span>
        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', margin: '10px 0 20px', lineHeight: 1.25 }}>
          Quiénes Somos
        </h1>

        <div className="article-body" style={{ lineHeight: 1.75, color: 'var(--text)' }}>
          <p>
            Millonario Digital nació con un objetivo simple: ayudar a cualquier persona, sin
            importar en qué país viva, a conocer, comparar y aprovechar herramientas, plataformas
            y programas para generar ingresos en línea — desde trading e inversión hasta
            inteligencia artificial, freelancing y comercio digital.
          </p>
          <p>
            Vivimos un momento distinto a cualquier otro: la inteligencia artificial le da a una
            persona bien orientada la capacidad de hacer en días lo que antes tomaba meses,
            sin importar si su camino es el trading, el freelancing, la creación de contenido o el
            comercio digital. Por eso no solo reseñamos plataformas — explicamos cómo la IA puede
            ayudarte a sacarles más provecho.
          </p>
          <p>
            No somos una casa de bolsa, un banco ni una entidad financiera regulada. Somos un
            sitio de información y reseñas: investigamos y explicamos en español claro qué
            ofrece cada plataforma, con base en fuentes públicas y documentación oficial de cada
            programa, para que tú decidas con más criterio antes de registrarte o invertir tu
            dinero.
          </p>

          <h2>Nuestra misión</h2>
          <p>
            Hacer accesible la información que normalmente solo se encuentra en inglés o dispersa
            en decenas de sitios — para que cualquier persona, sin importar de dónde sea, pueda
            tomar decisiones informadas sobre cómo generar ingresos adicionales por internet,
            aprovechando la inteligencia artificial como acelerador y no como reemplazo del
            criterio propio.
          </p>

          <h2>Cómo trabajamos</h2>
          <ul>
            <li>Revisamos cada plataforma o programa antes de publicarlo en el sitio.</li>
            <li>Explicamos tanto las ventajas como los riesgos o limitaciones de cada opción.</li>
            <li>Actualizamos el contenido cuando una plataforma cambia sus condiciones.</li>
          </ul>

          <h2>Aviso de afiliados</h2>
          <p>
            Algunos de los enlaces en este sitio son enlaces de afiliado: si te registras o
            compras a través de ellos, podemos recibir una comisión, sin ningún costo adicional
            para ti. Esto nos ayuda a mantener el sitio funcionando y seguir produciendo
            contenido gratuito. Nuestras reseñas reflejan nuestra opinión honesta, sin importar
            si el enlace es de afiliado o no.
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
