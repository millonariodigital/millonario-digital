import { supabase } from '../lib/supabaseClient';

export const revalidate = 60; // refresca el contenido cada 60s

export default async function Home() {
  const { data: categorias } = await supabase
    .from('categorias')
    .select('*')
    .order('orden');

  const { data: programas } = await supabase
    .from('programas')
    .select('*')
    .eq('activo', true);

  const programasPorCategoria = (categoriaId) =>
    (programas || []).filter((p) => p.categoria_id === categoriaId);

  return (
    <>
      <header>
        <div className="logo">Millonario<span>Digital</span></div>
      </header>

      <div className="hero">
        <span className="eyebrow mono">INGRESOS DIGITALES · ANALIZADOS</span>
        <h1>
          Las herramientas que sí están <span className="grad">generando dinero</span> ahora mismo.
        </h1>
        <p>
          Reseñas y comparativas de plataformas, programas y herramientas de IA —
          probadas con criterio propio, no con promesas.
        </p>
      </div>

      {(categorias || []).map((cat) => {
        const items = programasPorCategoria(cat.id);
        if (items.length === 0) return null;
        return (
          <section className="cat" key={cat.id} id={cat.slug}>
            <div className="cat-head">
              <h2>{cat.nombre}</h2>
            </div>
            <div className="grid">
              {items.map((prog) => (
                <a
                  className="card"
                  key={prog.id}
                  href={`/ir/${prog.slug}`}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  <span className="tag">{(prog.tipo || '').toUpperCase()}</span>
                  <h3>{prog.nombre}</h3>
                  <p>{prog.descripcion_corta}</p>
                  <span className="cta">Ver más →</span>
                </a>
              ))}
            </div>
          </section>
        );
      })}

      <footer>
        <div className="logo">Millonario<span>Digital</span></div>
        <div style={{ marginTop: 8 }}>
          © {new Date().getFullYear()} Millonario Digital — Este sitio contiene enlaces de afiliados.
        </div>
      </footer>
    </>
  );
}
