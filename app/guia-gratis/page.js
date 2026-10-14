import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
import FormularioGuia from '../../components/FormularioGuia';
import { GUIA_TITULO } from '../../lib/guia';
import './guia.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millonario-digital.com';

export const metadata = {
  title: `Guía gratis: ${GUIA_TITULO}`,
  description:
    'Descarga gratis una guía en PDF con 7 formas de generar ingresos con inteligencia artificial sin invertir capital: herramientas, errores comunes, ejemplos prácticos y una ruta de 30 días para dar los primeros pasos.',
  alternates: { canonical: '/guia-gratis' },
  openGraph: {
    title: `Guía gratis: ${GUIA_TITULO}`,
    description:
      'Guía en PDF con herramientas, ejemplos prácticos y una ruta de 30 días. Sin promesas de dinero fácil.',
    url: `${SITE_URL}/guia-gratis`,
    type: 'website',
    images: [{ url: '/guia-gratis-portada.jpg', width: 1020, height: 1320, alt: GUIA_TITULO }],
  },
};

const FORMAS = [
  ['01', 'Freelancing potenciado por IA', 'Más trabajo entregado en el mismo tiempo, sin perder tu voz.'],
  ['02', 'Asistente virtual con IA', 'Atender a varios negocios con procesos claros y automatizados.'],
  ['03', 'Chatbots para negocios', 'Responder y calificar clientes sin necesidad de programar.'],
  ['04', 'Canales de contenido sin mostrar el rostro', 'Videos y podcasts con voces, guiones y edición asistidos por IA.'],
  ['05', 'Diseños y arte generado con IA', 'Productos digitales e impresión por demanda sin inventario.'],
  ['06', 'Cursos, tutorías y consultoría', 'Convertir lo que ya sabes en un servicio o producto que puede crecer.'],
  ['07', 'Marketing de afiliados', 'Contenido que recomienda con criterio y puede generar comisiones.'],
];

export default function GuiaGratisPage() {
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
            <span className="eyebrow mono">GUÍA GRATUITA · PDF</span>
            <h1>
              7 formas de generar ingresos con IA <span className="grad">sin invertir capital</span>
            </h1>
            <p className="gg-lead">
              Una guía práctica y honesta: qué funciona, qué herramientas usar y qué esperar realmente de
              cada opción. Sin promesas de dinero fácil.
            </p>

            <ul className="gg-puntos">
              <li>Las 7 opciones explicadas paso a paso, con herramientas y errores comunes.</li>
              <li>Un ejemplo práctico por cada una y pros y contras reales.</li>
              <li>Comparativa para elegir y una ruta de 30 días para empezar.</li>
            </ul>

            <div className="gg-card">
              <FormularioGuia fuente="landing" redirigir />
              <span className="gg-micro">12 páginas · Descarga inmediata · Sin costo</span>
            </div>
          </div>

          <div className="gg-portada">
            <img
              src="/guia-gratis-portada.jpg"
              alt={`Portada de la guía: ${GUIA_TITULO}`}
              width="1020"
              height="1320"
            />
          </div>
        </section>

        <section className="gg-seccion">
          <span className="eyebrow mono">DENTRO DE LA GUÍA</span>
          <h2>Las 7 formas que vas a conocer</h2>
          <div className="gg-lista">
            {FORMAS.map(([num, titulo, desc]) => (
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
          <strong>Por qué confiar en esta guía.</strong> En Millonario Digital no recomendamos lo que mejor
          comisión paga: investigamos, mostramos pros y contras reales y te decimos cuándo algo no es para
          ti. La IA acelera el camino, pero no lo reemplaza, y los resultados dependen de tu tiempo, tus
          habilidades y el nicho que elijas. Este sitio contiene enlaces de afiliados.
        </section>

        <section className="gg-final">
          <h2>Descárgala gratis y conoce tus opciones</h2>
          <div className="gg-card" style={{ margin: '0 auto' }}>
            <FormularioGuia fuente="landing-final" redirigir />
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
