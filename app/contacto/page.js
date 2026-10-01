'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import ThemeToggle from '../../components/ThemeToggle';

export default function ContactoPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState('idle'); // idle | enviando | listo | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nombre || !email || !mensaje) return;
    setEstado('enviando');
    const { error } = await supabase
      .from('mensajes_contacto')
      .insert({ nombre, email, mensaje });
    if (error) {
      setEstado('error');
    } else {
      setEstado('listo');
      setNombre('');
      setEmail('');
      setMensaje('');
    }
  }

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

      <article
        className="content-panel"
        style={{ maxWidth: '640px', margin: '4vh auto 8vh', padding: '5vh 6vw' }}
      >
        <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--cyan)' }}>
          CONTACTO
        </span>
        <h1
          style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', margin: '10px 0 20px', lineHeight: 1.25 }}
        >
          Hablemos
        </h1>

        <div className="article-body" style={{ lineHeight: 1.75, color: 'var(--text)' }}>
          <p>
            ¿Tienes una pregunta, una sugerencia o quieres reportar algo del sitio? Escríbenos
            directamente a{' '}
            <a href="mailto:contacto@millonario-digital.com" style={{ color: 'var(--cyan)' }}>
              contacto@millonario-digital.com
            </a>{' '}
            o usa el formulario de abajo.
          </p>
        </div>

        {estado === 'listo' ? (
          <div
            style={{
              marginTop: '28px',
              padding: '18px 20px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              background: 'color-mix(in srgb, var(--cyan) 8%, transparent)',
            }}
          >
            <strong>¡Gracias por escribirnos!</strong>
            <p style={{ margin: '6px 0 0', color: 'var(--text-dim)' }}>
              Recibimos tu mensaje y te responderemos pronto a tu correo.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="nombre" style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  background: 'var(--bg-panel, transparent)',
                  color: 'var(--text)',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="email" style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  background: 'var(--bg-panel, transparent)',
                  color: 'var(--text)',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="mensaje" style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Mensaje
              </label>
              <textarea
                id="mensaje"
                required
                rows={5}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Cuéntanos en qué podemos ayudarte"
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  background: 'var(--bg-panel, transparent)',
                  color: 'var(--text)',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <button
              className="btn btn-glow"
              type="submit"
              disabled={estado === 'enviando'}
              style={{ alignSelf: 'flex-start', marginTop: '4px' }}
            >
              {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
            </button>

            {estado === 'error' && (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directamente a{' '}
                <a href="mailto:contacto@millonario-digital.com" style={{ color: 'var(--cyan)' }}>
                  contacto@millonario-digital.com
                </a>
                .
              </p>
            )}
          </form>
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
