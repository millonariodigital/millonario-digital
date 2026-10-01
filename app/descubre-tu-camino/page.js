import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import { portadaUrl } from '../../lib/portada';
import ThemeToggle from '../../components/ThemeToggle';
import Cuestionario from '../../components/Cuestionario';

export const revalidate = 60;

export const metadata = {
  title: 'Descubre tu Camino | Millonario Digital',
  description:
    'Responde 7 preguntas rápidas y descubre qué forma de generar ingresos digitales encaja mejor contigo: trading, cripto, freelancing, e-commerce o creación de contenido con IA.',
  alternates: { canonical: '/descubre-tu-camino' },
};

export default async function DescubreTuCaminoPage() {
  const { data: categorias } = await supabase
    .from('categorias')
    .select('*')
    .order('orden', { ascending: true });

  const { data: programasRaw } = await supabase.from('programas').select('*').eq('activo', true);
  const programas = (programasRaw || []).map((p) => ({
    ...p,
    portada: portadaUrl(p.slug),
  }));

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

      <div className="content-panel" style={{ maxWidth: '920px', margin: '4vh auto 8vh' }}>
        <Cuestionario programas={programas} categorias={categorias || []} />
      </div>

      <div className="foot-bottom" style={{ borderTop: '1px solid var(--line)' }}>
        <span>© {new Date().getFullYear()} Millonario Digital</span>
        <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          ← Volver al inicio
        </Link>
      </div>
    </>
  );
}
