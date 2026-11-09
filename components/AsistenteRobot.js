'use client';

// Asistente guiado con el robot de la marca. No usa inteligencia artificial:
// solo muestra respuestas escritas y revisadas por nosotros, y busca entre
// las herramientas y los tutoriales del sitio. Cada opción que se toca se
// envía a Analytics como evento "asistente" para saber qué busca la gente.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { TUTORIALES, videoPublicado } from '../lib/tutoriales';
import { TEST_URL } from '../lib/test';
import FormularioGuia from './FormularioGuia';
import './asistente-robot.css';

const CAMINOS = [
  { clave: 'ia-automatizacion', texto: 'Crear videos y contenido con IA', extra: ['ia-automatizacion'] },
  { clave: 'ecommerce', texto: 'Vender en línea (tienda o productos)', extra: ['ecommerce'] },
  { clave: 'freelancing', texto: 'Ofrecer servicios a clientes', extra: ['freelancing'] },
  { clave: 'trading-inversion', texto: 'Aprender a invertir', extra: ['trading-inversion', 'crypto'] },
];

function evento(accion, detalle) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', 'asistente', { accion, detalle: detalle || '' });
  } catch (e) {}
}

function normalizar(t) {
  return (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export default function AsistenteRobot() {
  const ruta = usePathname() || '';
  const [abierto, setAbierto] = useState(false);
  const [vista, setVista] = useState('inicio');
  const [camino, setCamino] = useState(null);
  const [programas, setProgramas] = useState(null);
  const [categorias, setCategorias] = useState({});
  const [consulta, setConsulta] = useState('');
  const panel = useRef(null);

  // Las herramientas se cargan solo cuando alguien abre el asistente.
  useEffect(() => {
    if (!abierto || programas) return;
    (async () => {
      try {
        const [{ data: progs }, { data: cats }] = await Promise.all([
          supabase.from('programas').select('nombre, slug, descripcion_corta, categoria_id, destacado').eq('activo', true),
          supabase.from('categorias').select('id, slug'),
        ]);
        const mapa = {};
        (cats || []).forEach((c) => { mapa[c.id] = c.slug; });
        setCategorias(mapa);
        setProgramas(progs || []);
      } catch (e) {
        setProgramas([]);
      }
    })();
  }, [abierto, programas]);

  useEffect(() => {
    if (!abierto) return undefined;
    const alTeclear = (e) => { if (e.key === 'Escape') setAbierto(false); };
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  }, [abierto]);

  // En la página del test no hace falta: la persona ya está en el lugar correcto.
  if (ruta.startsWith('/test-negocio-digital') && !ruta.split('/')[2]) return null;

  function ir(v, detalle) {
    setVista(v);
    evento(v, detalle);
    if (panel.current) panel.current.scrollTop = 0;
  }

  function abrir() {
    setAbierto(true);
    setVista('inicio');
    evento('abrir', ruta);
  }

  const delCamino = (c) =>
    (programas || [])
      .filter((p) => c.extra.includes(categorias[p.categoria_id]))
      .sort((a, b) => Number(b.destacado) - Number(a.destacado))
      .slice(0, 4);

  const resultados = (() => {
    const q = normalizar(consulta).trim();
    if (q.length < 2) return { herr: [], tuts: [] };
    const palabras = q.split(/\s+/).filter((w) => w.length > 1);
    const coincide = (texto) => {
      const t = normalizar(texto);
      return palabras.every((w) => t.includes(w));
    };
    return {
      herr: (programas || []).filter((p) => coincide(`${p.nombre} ${p.descripcion_corta}`)).slice(0, 5),
      tuts: TUTORIALES.filter((t) => coincide(`${t.titulo} ${t.resumen} ${t.herramienta.nombre}`)).slice(0, 3),
    };
  })();

  return (
    <>
      {!abierto && (
        <button type="button" className="ar-boton" onClick={abrir} aria-label="Abrir el asistente de Millonario Digital">
          <img src="/robot-asistente.png" alt="" width="64" height="64" />
          <span className="ar-burbuja">¿Te ayudo?</span>
        </button>
      )}

      {abierto && (
        <div className="ar-panel" role="dialog" aria-label="Asistente de Millonario Digital" ref={panel}>
          <header className="ar-cabecera">
            <img src="/robot-asistente.png" alt="" width="40" height="40" />
            <div>
              <strong>Asistente de Millonario Digital</strong>
              <span>Respuestas rápidas para orientarte</span>
            </div>
            <button type="button" className="ar-cerrar" onClick={() => setAbierto(false)} aria-label="Cerrar el asistente">×</button>
          </header>

          <div className="ar-cuerpo">
            {vista !== 'inicio' && (
              <button type="button" className="ar-volver" onClick={() => ir('inicio')}>← Volver al menú</button>
            )}

            {vista === 'inicio' && (
              <>
                <p className="ar-msg">¡Hola! Soy el robot de Millonario Digital. ¿En qué te ayudo hoy?</p>
                <div className="ar-opciones">
                  <button type="button" onClick={() => ir('empezar')}>🧭 ¿Por dónde empiezo?</button>
                  <button type="button" onClick={() => ir('caminos')}>🔎 Busco una herramienta</button>
                  <button type="button" onClick={() => ir('tutoriales')}>🎬 Quiero ver un tutorial</button>
                  <button type="button" onClick={() => ir('kit')}>📘 Quiero el kit sin costo</button>
                  <button type="button" onClick={() => ir('afiliados')}>🤝 ¿Cómo gana dinero este sitio?</button>
                  <button type="button" onClick={() => ir('contacto')}>✉️ Quiero escribirles</button>
                </div>
              </>
            )}

            {vista === 'empezar' && (
              <>
                <p className="ar-msg">
                  El mejor primer paso es el test <b>¿Qué negocio digital es para ti?</b>: son 7 preguntas y en unos 2 minutos
                  te muestra el camino que encaja contigo, con tus primeros pasos y los tutoriales para empezar.
                </p>
                <Link className="ar-cta" href={TEST_URL} onClick={() => { evento('ir-test'); setAbierto(false); }}>Hacer el test →</Link>
              </>
            )}

            {vista === 'caminos' && (
              <>
                <p className="ar-msg">¿Para qué la necesitas?</p>
                <div className="ar-opciones">
                  {CAMINOS.map((c) => (
                    <button type="button" key={c.clave} onClick={() => { setCamino(c); ir('herramientas', c.clave); }}>{c.texto}</button>
                  ))}
                </div>
              </>
            )}

            {vista === 'herramientas' && camino && (
              <>
                <p className="ar-msg">Estas son algunas de las herramientas que analizamos para <b>{camino.texto.toLowerCase()}</b>:</p>
                {camino.clave === 'trading-inversion' && (
                  <p className="ar-aviso">Invertir implica riesgo de perder dinero. Empieza aprendiendo y practicando sin dinero real.</p>
                )}
                {!programas && <p className="ar-cargando">Cargando…</p>}
                <ul className="ar-lista">
                  {delCamino(camino).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/resenas/${p.slug}`} onClick={() => evento('ver-resena', p.slug)}>
                        <strong>{p.nombre}</strong>
                        <span>{p.descripcion_corta}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="ar-enlace" href={`/categoria/${camino.clave}`} onClick={() => evento('ver-categoria', camino.clave)}>Ver todas las de esta categoría →</Link>
              </>
            )}

            {vista === 'tutoriales' && (
              <>
                <p className="ar-msg">Estos son los últimos tutoriales en video, paso a paso y en español:</p>
                <ul className="ar-lista">
                  {[...TUTORIALES].sort((a, b) => b.numero - a.numero).slice(0, 4).map((t) => (
                    <li key={t.slug}>
                      <Link href={`/tutoriales/${t.slug}`} onClick={() => evento('ver-tutorial', t.slug)}>
                        <strong>{t.herramienta.nombre}{!videoPublicado(t) ? ' · muy pronto' : ''}</strong>
                        <span>{t.titulo}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="ar-enlace" href="/tutoriales" onClick={() => evento('ver-tutoriales')}>Ver todos los tutoriales →</Link>
              </>
            )}

            {vista === 'kit' && (
              <>
                <p className="ar-msg">
                  El kit te enseña a crear videos con IA sin mostrar tu cara: guion, voz, imágenes y edición, con plantillas y prompts.
                  Escribe tu correo y te lo enviamos.
                </p>
                <FormularioGuia fuente="asistente" redirigir />
              </>
            )}

            {vista === 'afiliados' && (
              <>
                <p className="ar-msg">
                  Algunas herramientas tienen programa de afiliados: si te registras con nuestro enlace, podemos recibir una
                  comisión <b>sin que pagues nada extra</b>. Así se mantiene el sitio.
                </p>
                <p className="ar-msg">
                  Eso no cambia lo que opinamos: en cada análisis contamos lo que la herramienta hace bien y lo que conviene
                  revisar antes de pagar. Y no prometemos ingresos: la tecnología abre la puerta; tú decides hasta dónde llegar.
                </p>
                <Link className="ar-enlace" href="/politicas-de-uso" onClick={() => evento('ver-politicas')}>Leer nuestras políticas →</Link>
              </>
            )}

            {vista === 'contacto' && (
              <>
                <p className="ar-msg">Escríbenos y te respondemos personalmente. También leemos todos los comentarios de los videos.</p>
                <a className="ar-cta" href="mailto:contacto@millonario-digital.com" onClick={() => evento('correo')}>contacto@millonario-digital.com</a>
                <Link className="ar-enlace" href="/contacto" onClick={() => evento('ver-contacto')}>Ir a la página de contacto →</Link>
              </>
            )}

            {vista === 'busqueda' && (
              <>
                {resultados.herr.length + resultados.tuts.length === 0 ? (
                  <p className="ar-msg">
                    No encontré nada con «{consulta}». Prueba con otra palabra (por ejemplo: voz, tienda, video, diseño) o haz el test para orientarte.
                  </p>
                ) : (
                  <p className="ar-msg">Esto es lo que encontré para «{consulta}»:</p>
                )}
                <ul className="ar-lista">
                  {resultados.tuts.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/tutoriales/${t.slug}`} onClick={() => evento('buscar-tutorial', t.slug)}>
                        <strong>🎬 Tutorial · {t.herramienta.nombre}</strong>
                        <span>{t.titulo}</span>
                      </Link>
                    </li>
                  ))}
                  {resultados.herr.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/resenas/${p.slug}`} onClick={() => evento('buscar-resena', p.slug)}>
                        <strong>{p.nombre}</strong>
                        <span>{p.descripcion_corta}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {resultados.herr.length + resultados.tuts.length === 0 && (
                  <Link className="ar-cta" href={TEST_URL} onClick={() => setAbierto(false)}>Hacer el test →</Link>
                )}
              </>
            )}
          </div>

          <form
            className="ar-buscar"
            onSubmit={(e) => {
              e.preventDefault();
              if (consulta.trim().length < 2) return;
              ir('busqueda', consulta.trim().slice(0, 60));
            }}
          >
            <input
              type="search"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Busca: voz, tienda, video…"
              aria-label="Buscar herramientas y tutoriales"
              maxLength={60}
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      )}
    </>
  );
}
