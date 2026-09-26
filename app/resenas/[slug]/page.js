import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';
import ThemeToggle from '../../../components/ThemeToggle';

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
  if (!resena) return { title: 'Reseña no encontrada — Millonario Digital' };

  const title = `${resena.titulo} | Millonario Digital`;
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

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '4vh 6vw 8vh' }}>
        {categoria?.nombre && (
          <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--cyan)' }}>
            {categoria.nombre.toUpperCase()} · RESEÑA
          </span>
        )}

        <div className="review-head" style={{ marginTop: '10px' }}>
          {programa?.logo_url && <img src={programa.logo_url} alt={programa.nombre} />}
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', lineHeight: 1.25 }}>
            {resena.titulo}
          </h1>
        </div>

        <div
          className="article-body"
          style={{ marginTop: '20px', lineHeight: 1.75, color: 'var(--text)' }}
          dangerouslySetInnerHTML={{ __html: resena.contenido }}
        />

        {programa && (
          <div className="review-cta">
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
