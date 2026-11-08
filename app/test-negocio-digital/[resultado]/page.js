import Link from 'next/link';
import { notFound } from 'next/navigation';
import Cabecera from '../../tutoriales/Cabecera';
import FormularioGuia from '../../../components/FormularioGuia';
import CompartirBotones from '../../../components/CompartirBotones';
import ProgramCard from '../../../components/ProgramCard';
import { supabase } from '../../../lib/supabaseClient';
import { portadaUrl } from '../../../lib/portada';
import { RESULTADOS, ORDEN, TEST_URL } from '../../../lib/test';
import { tutorialPorSlug, videoPublicado } from '../../../lib/tutoriales';
import { extraDe } from '../../../lib/guia';
import '../../tutoriales/tutoriales.css';
import '../test.css';

export const revalidate = 300;

export function generateStaticParams() {
  return ORDEN.map((resultado) => ({ resultado }));
}

export function generateMetadata({ params }) {
  const r = RESULTADOS[params.resultado];
  if (!r) return { title: 'Resultado no encontrado' };
  const titulo = `Mi resultado: ${r.nombre}`;
  return {
    title: `${r.nombre} · Test ¿qué negocio digital es para ti?`,
    description: r.frase,
    alternates: { canonical: `${TEST_URL}/${params.resultado}` },
    openGraph: {
      title: titulo,
      description: `${r.frase} Haz el test gratis y descubre el tuyo.`,
      images: [{ url: r.imagen, width: 1200, height: 630, alt: titulo }],
    },
  };
}

export default async function ResultadoPage({ params, searchParams }) {
  const clave = params.resultado;
  const r = RESULTADOS[clave];
  if (!r) notFound();
  const mio = searchParams?.mio === '1';
  const tambien = mio && RESULTADOS[searchParams?.tambien] && searchParams.tambien !== clave ? searchParams.tambien : null;
  const extra = extraDe(r.tema);

  const { data } = await supabase.from('programas').select('*').in('slug', r.herramientas).eq('activo', true);
  const programas = r.herramientas
    .map((s) => (data || []).find((p) => p.slug === s))
    .filter(Boolean)
    .map((p) => ({ ...p, portada: portadaUrl(p.slug) }));
  const tutoriales = r.tutoriales.map(tutorialPorSlug).filter(Boolean);

  return (
    <>
      <Cabecera />
      <main className="tut-wrap tn-resultado">
        <span className="eyebrow mono">{mio ? 'TU RESULTADO' : 'TEST · ¿QUÉ NEGOCIO DIGITAL ES PARA TI?'}</span>
        <h1 className="tut-h1">{r.nombre}</h1>
        <p className="tut-lead">{r.frase}</p>
        {!mio && (
          <p className="tn-invita">
            Este es el resultado que alguien compartió contigo.{' '}
            <Link className="btn btn-glow" href={TEST_URL}>Hacer el test y ver el mío</Link>
          </p>
        )}
        {r.aviso && <p className="tn-riesgo"><strong>Importante:</strong> {r.aviso}</p>}

        <div className="tut-cols">
          <article>
            <h2>Por qué encaja contigo</h2>
            <p>{r.descripcion}</p>
            <ul className="tn-lista">
              {r.paraTi.map((x) => <li key={x}>{x}</li>)}
            </ul>

            <h2>Tus primeros 3 pasos</h2>
            <ol className="tut-pasos">
              {r.pasos.map((x) => <li key={x}>{x}</li>)}
            </ol>

            {tutoriales.length > 0 && (
              <>
                <h2>Tutoriales para empezar</h2>
                <div className="tn-tutos">
                  {tutoriales.map((t) => (
                    <Link className="blog-card" href={`/tutoriales/${t.slug}`} key={t.slug}>
                      <div className="thumb">
                        <img src={`/tutoriales/${t.slug}.jpg`} alt={t.titulo} loading="lazy" decoding="async" />
                      </div>
                      <div className="body">
                        <span className="cat-label">{t.herramienta.nombre.toUpperCase()}{!videoPublicado(t) && ' · PRÓXIMAMENTE'}</span>
                        <h4>{t.titulo}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {programas.length > 0 && (
              <>
                <h2>Herramientas que revisamos para este camino</h2>
                <div className="grid quiz-result-grid tn-herr">
                  {programas.map((p) => <ProgramCard programa={p} categoriaNombre={r.corto} key={p.id} />)}
                </div>
                <p className="tut-aviso" style={{ marginTop: 10 }}>
                  Algunos enlaces son de afiliado: Millonario Digital puede recibir una comisión sin costo extra para ti.
                  Lee siempre la reseña completa, con lo bueno y lo que conviene tener en cuenta.
                </p>
              </>
            )}

            {tambien && (
              <p className="tn-tambien">
                También encajas bastante con:{' '}
                <Link href={`${TEST_URL}/${tambien}?mio=1`}>{RESULTADOS[tambien].nombre} →</Link>
              </p>
            )}
          </article>

          <aside className="tut-lateral">
            <div className="tut-caja">
              <h3>Kit gratis para crear videos con IA sin mostrar tu cara</h3>
              <p className="tut-aviso">
                Te sirve para cualquier camino: mostrar lo que haces en video es la forma más rápida de que te conozcan.
                {extra ? ` Incluye el extra: ${extra.titulo}.` : ''}
              </p>
              <FormularioGuia fuente={`test-${clave}`} interes={`test-${clave}`} tema={r.tema} redirigir />
            </div>
            <div className="tut-caja">
              <h3>{mio ? 'Comparte tu resultado' : 'Compártelo'}</h3>
              <CompartirBotones titulo={`Mi resultado en el test "¿Qué negocio digital es para ti?": ${r.nombre}`} />
            </div>
            <Link className="tut-enlace" href={TEST_URL}>{mio ? 'Volver a hacer el test →' : 'Hacer el test →'}</Link>
            <p className="tut-aviso">El resultado es orientativo y educativo. No promete ingresos ni es una recomendación financiera.</p>
          </aside>
        </div>
      </main>
    </>
  );
}
