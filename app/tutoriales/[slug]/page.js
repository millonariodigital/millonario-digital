import Link from 'next/link';
import { notFound } from 'next/navigation';
import Cabecera from '../Cabecera';
import VideoYouTube from '../../../components/VideoYouTube';
import FormularioGuia from '../../../components/FormularioGuia';
import { TUTORIALES, tutorialPorSlug, videoPublicado, CANAL_SUSCRIBIR } from '../../../lib/tutoriales';
import { extraDe } from '../../../lib/guia';
import '../tutoriales.css';

// Se vuelve a generar cada 5 minutos: así un video programado aparece a su hora de estreno.
export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millonario-digital.com';

export function generateStaticParams() {
  return TUTORIALES.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const t = tutorialPorSlug(params.slug);
  if (!t) return { title: 'Tutorial no encontrado' };
  return {
    title: t.titulo,
    description: t.resumen,
    alternates: { canonical: `/tutoriales/${t.slug}` },
    // Hasta que el video esté en YouTube, Google no indexa la página.
    ...(videoPublicado(t) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: t.titulo,
      description: t.resumen,
      url: `${SITE_URL}/tutoriales/${t.slug}`,
      type: 'article',
      images: [{ url: `/tutoriales/${t.slug}.jpg`, width: 1280, height: 720, alt: t.titulo }],
    },
  };
}

export default function TutorialPage({ params }) {
  const t = tutorialPorSlug(params.slug);
  if (!t) notFound();
  const extra = extraDe(t.extra);
  const publicado = videoPublicado(t);
  const origen = `utm_source=web&utm_medium=tutorial&utm_campaign=${t.slug}`;

  const jsonLd = publicado
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: t.titulo,
        description: t.resumen,
        thumbnailUrl: `${SITE_URL}/tutoriales/${t.slug}.jpg`,
        embedUrl: `https://www.youtube.com/embed/${t.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${t.youtubeId}`,
        inLanguage: 'es',
      }
    : null;

  return (
    <>
      <Cabecera />
      <main className="tut-wrap">
        <Link href="/tutoriales" className="tut-volver mono">← Todos los tutoriales</Link>
        <span className="eyebrow mono">TUTORIAL · {t.herramienta.nombre.toUpperCase()}</span>
        <h1 className="tut-h1">{t.titulo}</h1>
        <p className="tut-lead">{t.resumen}</p>

        <VideoYouTube id={publicado ? t.youtubeId : ''} titulo={t.titulo} miniatura={`/tutoriales/${t.slug}.jpg`} />

        <div className="tut-cols">
          <article>
            <h2>Los pasos, en resumen</h2>
            <ol className="tut-pasos">
              {t.pasos.map(([titulo, texto]) => (
                <li key={titulo}>
                  <strong>{titulo}.</strong> {texto}
                </li>
              ))}
            </ol>

            <h2>¿Para quién es?</h2>
            <p>{t.paraQuien}</p>

            {publicado && (
              <>
                <h2>Capítulos del video</h2>
                <ul className="tut-capitulos">
                  {t.capitulos.map(([tiempo, nombre]) => {
                    const [m, s] = tiempo.split(':').map(Number);
                    return (
                      <li key={tiempo}>
                        <a
                          href={`https://www.youtube.com/watch?v=${t.youtubeId}&t=${m * 60 + s}s`}
                          target="_blank"
                          rel="noopener"
                        >
                          <span className="mono">{tiempo}</span> {nombre}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </article>

          <aside className="tut-lateral">
            <div className="tut-caja">
              <h3>La herramienta del video</h3>
              <a className="btn btn-glow" href={`/ir/${t.herramienta.slug}?${origen}`} rel="sponsored noopener">
                {t.herramienta.cta}
              </a>
              <Link href={`/resenas/${t.herramienta.slug}`} className="tut-enlace">
                Leer la reseña completa →
              </Link>
              <p className="tut-aviso">
                Enlace de afiliado: si te registras, Millonario Digital puede recibir una comisión sin costo extra
                para ti. Solo recomendamos lo que usamos.
              </p>
            </div>

            <div className="tut-caja">
              <h3>Kit gratis para crear videos con IA sin mostrar tu cara</h3>
              {extra && <p className="tut-aviso">Incluye el extra: {extra.titulo}.</p>}
              <FormularioGuia fuente={`tutorial-${t.slug}`} tema={extra ? extra.clave : null} redirigir />
            </div>

            <a className="tut-enlace" href={CANAL_SUSCRIBIR} target="_blank" rel="noopener">
              Suscribirme al canal de YouTube →
            </a>
          </aside>
        </div>
      </main>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </>
  );
}
