'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { GUIA_URL, GUIA_GRACIAS } from '../lib/guia';
import './formulario-guia.css';

// Formulario para descargar la guía gratuita. Se puede poner en cualquier
// página; lo único que cambia es la "fuente", que sirve para saber desde
// qué parte del sitio se registró cada persona:
//   <FormularioGuia fuente="landing" redirigir />
//   <FormularioGuia fuente="blog-medio" interes="trading" />
//
// - redirigir: al terminar lleva a la página de gracias. Si es false,
//   muestra el botón de descarga en el mismo lugar.
// - interes: opcional (por ejemplo la categoría del artículo o el
//   resultado del cuestionario) para segmentar más adelante.
export default function FormularioGuia({
  fuente = 'sitio',
  interes = null,
  redirigir = false,
  textoBoton = 'Descargar la guía gratis',
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [acepto, setAcepto] = useState(false);
  const [trampa, setTrampa] = useState(''); // campo oculto anti-bots
  const [estado, setEstado] = useState('idle'); // idle | enviando | listo | error

  function avisarAnalytics() {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { lead_source: fuente, content_name: 'guia-7-formas-ia' });
      }
    } catch (e) {}
  }

  function terminar() {
    avisarAnalytics();
    setEmail('');
    if (redirigir) {
      router.push(GUIA_GRACIAS);
    } else {
      setEstado('listo');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const correo = email.trim().toLowerCase();
    if (!correo || !acepto) return;

    // Si un bot llenó el campo oculto, fingimos que todo salió bien.
    if (trampa) {
      terminar();
      return;
    }

    setEstado('enviando');

    const fila = { email: correo, fuente, interes, consentimiento: true };
    let { error } = await supabase.from('suscriptores').insert(fila);

    // Si todavía no se corrió el script SQL (faltan columnas), guardamos al
    // menos el correo para no perder a la persona.
    if (error && (error.code === '42703' || error.code === 'PGRST204')) {
      ({ error } = await supabase.from('suscriptores').insert({ email: correo }));
    }

    // 23505 = ese correo ya estaba registrado: igual le damos la guía.
    if (error && error.code !== '23505') {
      setEstado('error');
      return;
    }

    // Aviso a Brevo (herramienta de correos). Si falla, no pasa nada: el
    // correo ya quedó guardado en Supabase y la persona recibe su guía igual.
    try {
      fetch('/api/suscribir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, fuente, interes }),
        keepalive: true,
      }).catch(() => {});
    } catch (e) {}

    terminar();
  }

  if (estado === 'listo') {
    return (
      <div className="gg-form gg-exito">
        <strong>¡Listo! Tu guía está lista para descargar.</strong>
        <a className="btn btn-glow" href={GUIA_URL} download>
          Descargar el PDF
        </a>
        <span className="gg-nota">
          Guárdala en tu teléfono o computadora. Después puedes hacer el{' '}
          <Link href="/descubre-tu-camino">cuestionario &ldquo;Descubre tu camino&rdquo;</Link>.
        </span>
      </div>
    );
  }

  return (
    <form className="gg-form" onSubmit={handleSubmit}>
      <input
        className="gg-email"
        type="email"
        required
        autoComplete="email"
        placeholder="tu@correo.com"
        aria-label="Tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Campo trampa: las personas no lo ven; los bots sí lo llenan. */}
      <input
        type="text"
        name="sitio_web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="gg-trampa"
        value={trampa}
        onChange={(e) => setTrampa(e.target.value)}
      />

      <button className="btn btn-glow gg-boton" type="submit" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : textoBoton}
      </button>

      <label className="gg-consent">
        <input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} required />
        <span>
          Acepto recibir la guía y correos de Millonario Digital. Puedo darme de baja cuando quiera.{' '}
          <Link href="/privacidad">Política de privacidad</Link>.
        </span>
      </label>

      {estado === 'error' && (
        <span className="gg-error" role="alert">
          No pudimos registrar tu correo. Intenta de nuevo en un momento o escríbenos desde{' '}
          <Link href="/contacto">Contacto</Link>.
        </span>
      )}
    </form>
  );
}
