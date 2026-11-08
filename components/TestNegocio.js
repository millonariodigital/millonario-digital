'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PREGUNTAS, calcularResultado, evento, TEST_URL } from '../lib/test';

export default function TestNegocio() {
  const router = useRouter();
  const [paso, setPaso] = useState(-1); // -1 = portada del test
  const [puntos, setPuntos] = useState({});
  const [historial, setHistorial] = useState([]);
  const total = PREGUNTAS.length;

  function empezar() {
    evento('test_start', { test: 'negocio-digital' });
    setPaso(0);
  }

  function elegir(opcion) {
    const nuevos = { ...puntos };
    for (const k in opcion.puntos) nuevos[k] = (nuevos[k] || 0) + opcion.puntos[k];
    setHistorial([...historial, puntos]);
    setPuntos(nuevos);
    if (paso + 1 < total) {
      setPaso(paso + 1);
      return;
    }
    const [principal, segundo] = calcularResultado(nuevos);
    evento('test_complete', { test: 'negocio-digital', resultado: principal });
    router.push(`${TEST_URL}/${principal}?mio=1${segundo ? `&tambien=${segundo}` : ''}`);
  }

  function atras() {
    if (paso <= 0) return;
    setPuntos(historial[historial.length - 1]);
    setHistorial(historial.slice(0, -1));
    setPaso(paso - 1);
  }

  if (paso < 0) {
    return (
      <div className="tn-portada">
        <span className="eyebrow mono">TEST GRATIS · 2 MINUTOS · 7 PREGUNTAS</span>
        <h1>¿Qué negocio digital es para ti?</h1>
        <p className="tn-lead">
          Responde con sinceridad y te mostramos el camino que mejor encaja contigo: crear contenido con IA,
          una tienda online, servicios freelance o aprender a invertir. Con tu resultado recibes los tutoriales,
          las herramientas y los primeros pasos para empezar.
        </p>
        <button className="btn btn-glow tn-empezar" type="button" onClick={empezar}>
          Empezar el test
        </button>
        <p className="tn-nota">Sin registro para ver tu resultado. Es orientativo: no promete ingresos ni es una recomendación financiera.</p>
      </div>
    );
  }

  const pregunta = PREGUNTAS[paso];
  return (
    <div className="tn-test">
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${((paso + 1) / total) * 100}%` }} />
      </div>
      <div className="tn-meta">
        <span className="quiz-step-label mono">Pregunta {paso + 1} de {total}</span>
        {paso > 0 && (
          <button type="button" className="tn-atras mono" onClick={atras}>← Anterior</button>
        )}
      </div>
      <h2 className="quiz-question">{pregunta.texto}</h2>
      <div className="quiz-options">
        {pregunta.opciones.map((op) => (
          <button key={op.texto} className="quiz-option" onClick={() => elegir(op)} type="button">
            {op.texto}
          </button>
        ))}
      </div>
    </div>
  );
}
