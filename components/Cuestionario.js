'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProgramCard from './ProgramCard';
import { PREGUNTAS, CATEGORIA_INFO, CATEGORIA_PROGRAMAS } from '../lib/quiz';

function sumarPuntos(acumulado, puntos) {
  const nuevo = { ...acumulado };
  for (const cat in puntos) {
    nuevo[cat] = (nuevo[cat] || 0) + puntos[cat];
  }
  return nuevo;
}

function calcularGanadores(puntos) {
  const valores = Object.values(puntos);
  const max = valores.length ? Math.max(...valores) : 0;
  const ganadores = Object.keys(puntos).filter((cat) => puntos[cat] === max);
  return ganadores.length ? ganadores : Object.keys(CATEGORIA_INFO);
}

function normalizar(txt) {
  return (txt || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

const CATEGORIA_KEYWORDS = {
  trading: ['trading', 'inversion', 'bolsa'],
  cripto: ['cripto', 'crypto'],
  freelancing: ['freelanc'],
  ecommerce: ['commerce', 'tienda'],
  ia: ['inteligencia artificial', 'contenido', ' ia'],
};

function buscarCategoriaDB(categorias, claveQuiz) {
  const keywords = CATEGORIA_KEYWORDS[claveQuiz] || [];
  return categorias.find((c) => {
    const nombre = normalizar(c.nombre);
    return keywords.some((k) => nombre.includes(normalizar(k)));
  });
}

export default function Cuestionario({ programas = [], categorias = [] }) {
  const [paso, setPaso] = useState(0);
  const [puntos, setPuntos] = useState({});
  const [terminado, setTerminado] = useState(false);

  const totalPreguntas = PREGUNTAS.length;
  const pregunta = PREGUNTAS[paso];

  function elegir(opcion) {
    const nuevosPuntos = sumarPuntos(puntos, opcion.puntos);
    setPuntos(nuevosPuntos);
    if (paso + 1 < totalPreguntas) {
      setPaso(paso + 1);
    } else {
      setTerminado(true);
    }
  }

  function reiniciar() {
    setPaso(0);
    setPuntos({});
    setTerminado(false);
  }

  if (terminado) {
    const ganadores = calcularGanadores(puntos);

    return (
      <div className="quiz-container">
        <span className="eyebrow mono">TU RESULTADO</span>
        {ganadores.map((clave) => {
          const info = CATEGORIA_INFO[clave];
          const slugs = CATEGORIA_PROGRAMAS[clave] || [];
          const recomendados = slugs
            .map((slug) => programas.find((p) => p.slug === slug))
            .filter(Boolean);
          const catDB = buscarCategoriaDB(categorias, clave);

          return (
            <div className="quiz-result" key={clave}>
              <h2>{info.nombre}</h2>
              <p>{info.descripcion}</p>
              {catDB && (
                <Link
                  href={`/#${catDB.slug}`}
                  className="mono"
                  style={{ color: 'var(--cyan)', textDecoration: 'none' }}
                >
                  Ver toda la categoría →
                </Link>
              )}
              {recomendados.length > 0 && (
                <div className="grid quiz-result-grid" style={{ marginTop: '24px' }}>
                  {recomendados.map((p) => (
                    <ProgramCard programa={p} categoriaNombre={info.nombre} key={p.id} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <button className="btn btn-glow quiz-retry" onClick={reiniciar} type="button">
          Volver a hacer el cuestionario
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <span className="eyebrow mono">DESCUBRE TU CAMINO</span>
      <h1>¿Cuál forma de generar ingresos digitales encaja contigo?</h1>
      <p className="quiz-intro">
        Responde estas {totalPreguntas} preguntas rápidas y te mostramos por dónde empezar.
      </p>

      <div className="quiz-progress">
        <div
          className="quiz-progress-bar"
          style={{ width: `${(paso / totalPreguntas) * 100}%` }}
        />
      </div>
      <span className="quiz-step-label mono">
        Pregunta {paso + 1} de {totalPreguntas}
      </span>

      <h3 className="quiz-question">{pregunta.texto}</h3>
      <div className="quiz-options">
        {pregunta.opciones.map((op, i) => (
          <button key={i} className="quiz-option" onClick={() => elegir(op)} type="button">
            {op.texto}
          </button>
        ))}
      </div>
    </div>
  );
}
