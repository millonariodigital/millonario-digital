import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../../lib/supabaseClient';
import ThemeToggle from '../../../components/ThemeToggle';
import { COLOR_ACENTO, COLOR_ACENTO_DEFAULT } from '../../../lib/acentos';
import { logoUrl } from '../../../lib/logos';
import LogoImg from '../../../components/LogoImg';
import { portadaUrl } from '../../../lib/portada';
import CompartirBotones from '../../../components/CompartirBotones';
import VideoYouTube from '../../../components/VideoYouTube';
import CajaKit from '../../../components/CajaKit';
import { TUTORIALES, videoPublicado } from '../../../lib/tutoriales';
import '../../tutoriales/tutoriales.css';
import './resena-nueva.css';

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await supabase.from('resenas').select('slug').eq('publicado', true);
  return (data || []).map((r) => ({ slug: r.slug }));
}

async function getResena(slug) {
  const { data } = await supabase
    .from('resenas')
    .select('*, programas(*, categorias(nombre, slug))')
    .eq('slug', slug)
    .eq('publicado', true)
    .single();
  return data;
}

export async function generateMetadata({ params }) {
  const resena = await getResena(params.slug);
  if (!resena) return { title: 'Reseña no encontrada' };

  const title = resena.titulo;
  const description =
    resena.meta_descripcion ||
    resena.programas?.descripcion_corta ||
    `Reseña de ${resena.programas?.nombre || ''}`;

  // Imagen para compartir: la portada de la reseña o de la herramienta; si no hay, la de la marca.
  const imagen = portadaUrl(resena.slug) || resena.programas?.imagen_url || '/og-image.png';
  const inactivo = resena.programas && resena.programas.activo === false;
  return {
    title: title.length > 44 ? { absolute: title } : title,
    description,
    alternates: { canonical: `/resenas/${resena.slug}` },
    openGraph: { title, description, url: `/resenas/${resena.slug}`, type: 'article', images: [{ url: imagen, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [imagen] },
    ...(inactivo ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ResenaPage({ params }) {
  const resena = await getResena(params.slug);

  if (!resena) {
    return (
      <div style={{ padding: '10vh 6vw', textAlign: 'center' }}>
        <h1>Reseña no encontrada</h1>
        <Link href="/" style={{ color: 'var(--cyan)' }}>
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  const programa = resena.programas;
  const categoria = programa?.categorias;
  const portada = portadaUrl(programa?.slug);
  const logo = logoUrl(programa?.slug);
  const colorAcento = COLOR_ACENTO[programa?.slug] || COLOR_ACENTO_DEFAULT;

  // Si la tabla "resenas" tiene fecha de actualización o creación
  // (Supabase la agrega automáticamente como "created_at"), la
  // mostramos. Si no existe, simplemente no se muestra ninguna
  // fecha — nunca inventamos una.
  const fechaRaw = resena.actualizado_en || resena.updated_at || resena.created_at || null;
  const fechaResena = fechaRaw
    ? new Date(fechaRaw).toLocaleDateString('es', { day: 'numeric', month: 'long' })
    : null;

  // Tutorial en video de esta herramienta (si existe) y artículos del blog relacionados:
  // primero los que mencionan la herramienta, después los de su misma categoría.
  const tutorial = TUTORIALES.find((t) => t.herramienta.slug === programa?.slug) || null;
  let relacionados = [];
  {
    const { data } = await supabase.from('articulos').select('id, titulo, slug, categoria_id, fecha_publicacion, categorias(nombre)').eq('publicado', true);
    const todos = data || [];
    const claves = [programa?.slug, programa?.nombre]
      .filter(Boolean)
      .map((x) => x.toLowerCase().split(/[\s.]/)[0])
      .filter((x) => x.length > 2);
    const menciona = todos.filter((a) => claves.some((k) => (a.titulo + ' ' + a.slug).toLowerCase().includes(k)));
    const misma = todos.filter((a) => a.categoria_id === programa?.categoria_id && !menciona.includes(a));
    relacionados = [...menciona, ...misma].slice(0, 3).map((a) => ({ ...a, portada: portadaUrl(a.slug) }));
  }

  // Datos estructurados: nuestras reseñas son contenido editorial, por eso se
  // marcan como "Article" (no como "Review" de un "Product", que obliga a
  // incluir precio o puntuación que no tenemos y Google lo marca como error).
  const SITE = 'https://millonario-digital.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resena.titulo,
    mainEntityOfPage: `${SITE}/resenas/${resena.slug}`,
    author: { '@type': 'Organization', name: 'Millonario Digital', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'Millonario Digital',
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
    },
    ...(resena.meta_descripcion ? { description: resena.meta_descripcion } : {}),
    ...(portada ? { image: `${SITE}${portada}` } : {}),
    ...(programa?.nombre ? { about: { '@type': 'Thing', name: programa.nombre } } : {}),
    ...(fechaRaw ? { datePublished: fechaRaw, dateModified: fechaRaw } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-circuit" aria-hidden="true" />
      <header>
        <div className="logo">
          <img className="logo-mark" src="/logo.png" alt="Millonario Digital" />
          <Link href="/" className="logo-word" style={{ textDecoration: 'none' }}>
            <em>Millonario Digital</em>
          </Link>
        </div>
        <nav className="top-links">
          {categoria?.slug ? (
            <Link href={`/categoria/${categoria.slug}`}>← Volver a {categoria.nombre}</Link>
          ) : (
            <Link href="/">← Volver al inicio</Link>
          )}
          <ThemeToggle />
        </nav>
      </header>

      <article
        className="content-panel"
        style={{ maxWidth: '980px', margin: '4vh auto 8vh', padding: '5vh clamp(20px, 4vw, 60px)' }}
      >
        {portada && (
          <div className="portada-banner">
            <Image
              src={portada}
              alt={programa?.nombre || resena.titulo}
              fill
              sizes="(max-width: 1000px) 100vw, 980px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        {categoria?.nombre && (
          <span
            className="mono"
            style={{ fontSize: '0.78rem', color: 'var(--cyan)', display: 'inline-block', marginTop: portada ? '4px' : 0 }}
          >
            {categoria.nombre.toUpperCase()}
          </span>
        )}

        <div className="review-head" style={{ marginTop: '10px' }}>
          {!portada && programa && logo && (
            <div className="review-logo-badge" style={{ '--acento': colorAcento }}>
              <LogoImg src={logo} alt={programa.nombre} />
            </div>
          )}
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', lineHeight: 1.25 }}>
            {resena.titulo}
          </h1>
        </div>

        <p
          className="review-byline"
          style={{ marginTop: '6px', fontSize: '0.82rem', color: 'var(--text-dim)' }}
        >
          Analizado por el equipo de Millonario Digital
        </p>

        <div
          className="article-body"
          style={{ marginTop: '20px', lineHeight: 1.75, color: 'var(--text)' }}
          dangerouslySetInnerHTML={{ __html: resena.contenido }}
        />

        {tutorial && (
          <section className="rn-video">
            <h2>Míralo en video: {programa?.nombre} paso a paso</h2>
            <VideoYouTube
              id={tutorial.youtubeId}
              estreno={tutorial.estreno}
              publicado={videoPublicado(tutorial)}
              titulo={tutorial.titulo}
              miniatura={`/tutoriales/${tutorial.slug}.jpg`}
            />
            <Link href={`/tutoriales/${tutorial.slug}`} className="rn-enlace">
              Ver los pasos en resumen y los capítulos del video →
            </Link>
          </section>
        )}

        <CajaKit
          fuente={`resena-${resena.slug}`.slice(0, 60)}
          categoriaSlug={categoria?.slug}
          categoriaNombre={categoria?.nombre}
          herramienta={programa?.nombre}
          tema={programa?.slug}
        />

        <CompartirBotones titulo={resena.titulo} />

        {programa && programa.activo === false && (
          <div className="review-cta">
            <p style={{ color: 'var(--text-dim)', margin: 0 }}>
              <strong style={{ color: 'var(--text)' }}>Próximamente.</strong> Esta opción todavía no está disponible.
              Mientras tanto, revisa otras herramientas analizadas
              {categoria?.slug ? ' en la misma categoría.' : ' en el sitio.'}
            </p>
            {categoria?.slug && (
              <Link href={`/categoria/${categoria.slug}`} className="btn btn-ghost">
                Ver más de {categoria.nombre}
              </Link>
            )}
          </div>
        )}

        {programa && programa.activo !== false && (
          <div className="review-cta">
            <p
              className="affiliate-disclosure"
              style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '10px' }}
            >
              💡 Este enlace es de afiliado: si te registras, podemos ganar una comisión sin costo
              extra para ti. No cambia nuestra opinión —{' '}
              <Link href="/politicas-de-uso" style={{ color: 'var(--cyan)' }}>
                más información aquí
              </Link>
              .
            </p>
            <a
              className="affiliate-btn"
              href={`/ir/${programa.slug}`}
              target="_blank"
              rel="nofollow sponsored noopener"
            >
              Visitar {programa.nombre} →
            </a>
            {categoria?.slug && (
              <Link href={`/categoria/${categoria.slug}`} className="btn btn-ghost">
                Ver más de {categoria.nombre}
              </Link>
            )}
          </div>
        )}


      </article>

      {relacionados.length > 0 && (
        <section className="blog rn-blog">
          <div className="cat-head">
            <h2>Sigue leyendo en el blog</h2>
            <Link href="/blog" className="mono" style={{ textDecoration: 'none' }}>
              Ver todo el blog →
            </Link>
          </div>
          <div className="blog-grid">
            {relacionados.map((a) => (
              <Link className="blog-card" href={`/blog/${a.slug}`} key={a.id}>
                <div className="thumb">
                  {a.portada ? (
                    <img src={a.portada} alt={a.titulo} loading="lazy" decoding="async" />
                  ) : (
                    (a.categorias?.nombre || 'ARTÍCULO').toUpperCase()
                  )}
                </div>
                <div className="body">
                  <span className="cat-label">{(a.categorias?.nombre || '').toUpperCase()}</span>
                  <h4>{a.titulo}</h4>
                  {a.fecha_publicacion && (
                    <span className="date">
                      {new Date(a.fecha_publicacion).toLocaleDateString('es', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="foot-bottom" style={{ borderTop: '1px solid var(--line)' }}>
        <span>© {new Date().getFullYear()} Millonario Digital</span>
        <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          ← Volver al inicio
        </Link>
      </div>
    </>
  );
}