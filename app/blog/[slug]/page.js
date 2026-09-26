import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';
import ThemeToggle from '../../../components/ThemeToggle';

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await supabase.from('articulos').select('slug').eq('publicado', true);
  return (data || []).map((a) => ({ slug: a.slug }));
}

async function getArticulo(slug) {
  const { data } = await supabase
    .from('articulos')
    .select('*, categorias(nombre, slug)')
    .eq('slug', slug)
    .eq('publicado', true)
    .single();
  return data;
}

export async function generateMetadata({ params }) {
  const articulo = await getArticulo(params.slug);
  if (!articulo) return { title: 'Artículo no encontrado — Millonario Digital' };

  const title = `${articulo.titulo} | Millonario Digital`;
  const description = articulo.meta_descripcion || articulo.resumen || articulo.titulo;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${articulo.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${articulo.slug}`,
      type: 'article',
      publishedTime: articulo.fecha_publicacion,
    },
  };
}

export default async function ArticuloPage({ params }) {
  const articulo = await getArticulo(params.slug);

  if (!articulo) {
    return (
      <div style={{ padding: '10vh 6vw', textAlign: 'center' }}>
        <h1>Artículo no encontrado</h1>
        <Link href="/blog" style={{ color: 'var(--cyan)' }}>
          ← Volver al blog
        </Link>
      </div>
    );
  }

  let resenasRelacionadas = [];
  if (articulo.categoria_id) {
    const { data } = await supabase
      .from('programas')
      .select('nombre, slug')
      .eq('categoria_id', articulo.categoria_id)
      .eq('activo', true)
      .limit(3);
    resenasRelacionadas = data || [];
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articulo.titulo,
    description: articulo.meta_descripcion || articulo.resumen,
    datePublished: articulo.fecha_publicacion,
    author: { '@type': 'Organization', name: 'Millonario Digital' },
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
          <Link href="/blog">← Volver al blog</Link>
          <ThemeToggle />
        </nav>
      </header>

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '4vh 6vw 8vh' }}>
        {articulo.categorias?.nombre && (
          <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--cyan)' }}>
            {articulo.categorias.nombre.toUpperCase()}
          </span>
        )}
        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', margin: '10px 0 8px', lineHeight: 1.25 }}>
          {articulo.titulo}
        </h1>
        <span className="date" style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          {new Date(articulo.fecha_publicacion).toLocaleDateString('es', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>

        <div
          className="article-body"
          style={{ marginTop: '28px', lineHeight: 1.75, color: 'var(--text)' }}
          dangerouslySetInnerHTML={{ __html: articulo.contenido }}
        />

        {resenasRelacionadas.length > 0 && (
          <div style={{ marginTop: '36px' }}>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              RESEÑAS RELACIONADAS
            </span>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', lineHeight: 1.9 }}>
              {resenasRelacionadas.map((p) => (
                <li key={p.slug}>
                  <Link href={`/resenas/${p.slug}`} style={{ color: 'var(--cyan)' }}>
                    Reseña de {p.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {articulo.categorias?.slug && (
          <div style={{ marginTop: '32px', borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
            <Link href={`/categoria/${articulo.categorias.slug}`} className="btn btn-glow">
              Ver herramientas de {articulo.categorias.nombre} →
            </Link>
          </div>
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
