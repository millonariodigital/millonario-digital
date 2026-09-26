import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import ThemeToggle from '../../components/ThemeToggle';

export const revalidate = 60;

export const metadata = {
  title: 'Blog — Millonario Digital',
  description:
    'Guías y análisis sobre trading, inversión, IA, crypto, freelancing y e-commerce, escritos con criterio propio, no por comisión.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const { data: articulos } = await supabase
    .from('articulos')
    .select('*, categorias(nombre, slug)')
    .eq('publicado', true)
    .order('fecha_publicacion', { ascending: false });

  const lista = articulos || [];

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

      <div className="hero" style={{ paddingBottom: '3vh' }}>
        <span className="eyebrow mono">BLOG</span>
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>Guías y análisis</h1>
        <p>Contenido escrito con criterio propio, no por comisión.</p>
      </div>

      <section className="blog" style={{ paddingBottom: '6vh' }}>
        <div className="blog-grid">
          {lista.map((a) => (
            <Link className="blog-card" href={`/blog/${a.slug}`} key={a.id}>
              <div className="thumb">{(a.categorias?.nombre || 'ARTÍCULO').toUpperCase()}</div>
              <div className="body">
                <span className="cat-label">{(a.categorias?.nombre || '').toUpperCase()}</span>
                <h4>{a.titulo}</h4>
                <span className="date">
                  {new Date(a.fecha_publicacion).toLocaleDateString('es', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </Link>
          ))}
          {lista.length === 0 && (
            <p style={{ color: 'var(--text-dim)' }}>Todavía no hay artículos publicados.</p>
          )}
        </div>
      </section>

      <div className="foot-bottom" style={{ borderTop: '1px solid var(--line)' }}>
        <span>© {new Date().getFullYear()} Millonario Digital</span>
        <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          ← Volver al inicio
        </Link>
      </div>
    </>
  );
}
