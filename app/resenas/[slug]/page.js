import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../../lib/supabaseClient';
import ThemeToggle from '../../../components/ThemeToggle';
import { COLOR_ACENTO, COLOR_ACENTO_DEFAULT } from '../../../lib/acentos';
import { logoUrl } from '../../../lib/logos';
import LogoImg from '../../../components/LogoImg';
import { portadaUrl } from '../../../lib/portada';
import CompartirBotones from '../../../components/CompartirBotones';

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

  return {
    title,
    description,
    alternates: { canonical: `/resenas/${resena.slug}` },
    openGraph: { title, description, url: `/resenas/${resena.slug}`, type: 'article' },
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
    ? new Date(fechaRaw).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  let articuloRelacionado = null;
  if (programa?.categoria_id) {
    const { data } = await supabase
      .from('articulos')
      .select('titulo, slug')
      .eq('categoria_id', programa.categoria_id)
      .eq('publicado', true)
      .limit(1)
      .maybeSingle();
    articuloRelacionado = data;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'Product', name: programa?.nombre },
    author: { '@type': 'Organization', name: 'Millonario Digital' },
    reviewBody: resena.titulo,
    ...(fechaRaw ? { datePublished: fechaRaw } : {}),
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
        style={{ maxWidth: '760px', margin: '4vh auto 8vh', padding: '5vh 6vw' }}
      >
        {portada && (
          <div className="portada-banner">
            <Image
              src={portada}
              alt={programa?.nombre || resena.titulo}
              fill
              sizes="(max-width: 800px) 100vw, 760px"
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

        <CompartirBotones titulo={resena.titulo} />

        {programa && (
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

        {articuloRelacionado && (
          <p style={{ marginTop: '18px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            Te puede interesar:{' '}
            <Link href={`/blog/${articuloRelacionado.slug}`} style={{ color: 'var(--cyan)' }}>
              {articuloRelacionado.titulo}
            </Link>
          </p>
        )}
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
