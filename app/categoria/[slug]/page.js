import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';
import ProgramCard from '../../../components/ProgramCard';
import ThemeToggle from '../../../components/ThemeToggle';

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: categorias } = await supabase.from('categorias').select('slug');
  return (categorias || []).map((c) => ({ slug: c.slug }));
}

async function getCategoria(slug) {
  const { data } = await supabase.from('categorias').select('*').eq('slug', slug).single();
  return data;
}

export async function generateMetadata({ params }) {
  const categoria = await getCategoria(params.slug);
  if (!categoria) return { title: 'Categoría no encontrada — Millonario Digital' };

  const title = `${categoria.nombre} — Herramientas y programas analizados | Millonario Digital`;
  const description =
    categoria.descripcion ||
    `Las mejores herramientas y programas de ${categoria.nombre}, probadas y comparadas con criterio propio.`;

  return {
    title,
    description,
    alternates: { canonical: `/categoria/${categoria.slug}` },
    openGraph: {
      title,
      description,
      url: `/categoria/${categoria.slug}`,
      type: 'website',
    },
  };
}

export default async function CategoriaPage({ params, searchParams }) {
  const categoria = await getCategoria(params.slug);

  if (!categoria) {
    return (
      <div style={{ padding: '10vh 6vw', textAlign: 'center' }}>
        <h1>Categoría no encontrada</h1>
        <Link href="/" style={{ color: 'var(--cyan)' }}>
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  const { data: programas } = await supabase
    .from('programas')
    .select('*')
    .eq('categoria_id', categoria.id)
    .eq('activo', true);

  const lista = programas || [];
  const tipos = [...new Set(lista.map((p) => p.tipo).filter(Boolean))];
  const tipoActivo = searchParams?.tipo || 'all';
  const visibles = lista.filter((p) => tipoActivo === 'all' || p.tipo === tipoActivo);

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
        <span className="eyebrow mono">CATEGORÍA</span>
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>{categoria.nombre}</h1>
        {categoria.descripcion && <p>{categoria.descripcion}</p>}
      </div>

      <section className="cat">
        {tipos.length > 1 && (
          <div className="sub-tabs">
            <Link href={`/categoria/${categoria.slug}`} className={`sub-tab ${tipoActivo === 'all' ? 'active' : ''}`}>
              Todos
            </Link>
            {tipos.map((t) => (
              <Link
                key={t}
                href={`/categoria/${categoria.slug}?tipo=${t}`}
                className={`sub-tab ${tipoActivo === t ? 'active' : ''}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Link>
            ))}
          </div>
        )}

        <div className="grid">
          {visibles.map((p) => (
            <ProgramCard programa={p} key={p.id} />
          ))}
          {visibles.length === 0 && (
            <p style={{ color: 'var(--text-dim)' }}>Todavía no hay programas cargados aquí.</p>
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
