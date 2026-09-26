'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import ProgramCard from './ProgramCard';
import ThemeToggle from './ThemeToggle';

export default function CatalogoInteractivo({ categorias, programas, articulos = [] }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSub, setActiveSub] = useState({});

  const [email, setEmail] = useState('');
  const [subState, setSubState] = useState('idle'); // idle | sending | done | error

  // Animación de aparición al hacer scroll — IntersectionObserver, sin costo
  // en carga ni en scroll (se anima una sola vez por elemento).
  useEffect(() => {
    const targets = document.querySelectorAll(
      '.card, .stat-item, .blog-card, .brand, .podcast, .capture'
    );
    targets.forEach((el) => el.classList.add('reveal'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categorias, programas]);

  function setSub(catId, tipo) {
    setActiveSub((prev) => ({ ...prev, [catId]: tipo }));
  }

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setSubState('sending');
    const { error } = await supabase.from('suscriptores').insert({ email });
    setSubState(error ? 'error' : 'done');
    if (!error) setEmail('');
  }

  const q = searchTerm.trim().toLowerCase();

  return (
    <>
      {/* Fondo animado de líneas de circuito — una sola capa fija, animada
          solo con transform (GPU), no afecta el rendimiento de la página. */}
      <div className="bg-circuit" aria-hidden="true" />

      <header>
        <div className="logo">
          <img className="logo-mark" src="/logo.png" alt="Millonario Digital" />
          <span className="logo-word">
            <em>Millonario Digital</em>
          </span>
        </div>

        <nav className="top-links">
          {categorias.map((c) => (
            <a key={c.id} href={`#${c.slug}`}>
              {c.nombre}
            </a>
          ))}

          <ThemeToggle />
          <div className="search-wrap">
            <button
              className="search-btn"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Buscar"
              type="button"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {searchOpen && (
              <div className="search-flyout">
                <div className="searchbar">
                  <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Buscar herramientas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      <div className="top-banner">
        <img src="/banner.jpg" alt="Millonario Digital" />
      </div>

      <div className="hero">
        <div className="circuit-bg" />
        <span className="eyebrow mono">INGRESOS DIGITALES · ANALIZADOS</span>
        <h1>
          Las herramientas que sí están <span className="grad">generando dinero</span> ahora mismo.
        </h1>
        <p>
          Reseñas y comparativas de plataformas, programas y herramientas de IA — probadas con
          criterio propio, no con promesas.
        </p>
      </div>

      {/* Chips de acceso rápido a cada categoría */}
      <div className="rail">
        <a className="chip active" href={categorias[0] ? `#${categorias[0].slug}` : '#'}>
          Todas
        </a>
        {categorias.map((c) => (
          <a key={c.id} className="chip" href={`#${c.slug}`}>
            {c.nombre}
          </a>
        ))}
      </div>

      {/* Estadísticas de marca con anillos circulares (valores fijos, no vienen de la base de datos) */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="statGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--cyan)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--violet)' }} />
          </linearGradient>
        </defs>
      </svg>
      <div className="stats">
        {[
          { num: '50+', label: 'herramientas analizadas', dash: '232.2 263.9' },
          { num: '5', label: 'categorías de ingreso digital', dash: '263.9 263.9' },
          { num: '7', label: 'años operando en mercados con IBKR', dash: '184.7 263.9' },
          { num: '100%', label: 'reseñas probadas de primera mano', dash: '263.9 263.9' },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-ring">
              <svg viewBox="0 0 100 100">
                <circle className="ring-track" cx="50" cy="50" r="42" />
                <circle className="ring-progress" cx="50" cy="50" r="42" style={{ strokeDasharray: s.dash }} />
              </svg>
              <span className="stat-num">{s.num}</span>
            </div>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {categorias.map((cat) => {
        const catPrograms = programas.filter((p) => p.categoria_id === cat.id);
        const tipos = [...new Set(catPrograms.map((p) => p.tipo).filter(Boolean))];
        const sub = activeSub[cat.id] || 'all';

        const visible = catPrograms.filter((p) => {
          const matchSub = sub === 'all' || p.tipo === sub;
          const haystack = `${p.nombre} ${p.descripcion_corta || ''}`.toLowerCase();
          const matchSearch = !q || haystack.includes(q);
          return matchSub && matchSearch;
        });

        if (q && visible.length === 0) return null;

        return (
          <section className="cat" id={cat.slug} key={cat.id}>
            <div className="cat-head">
              <h2>{cat.nombre}</h2>
              <a className="mono" href={`/categoria/${cat.slug}`} style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
                Ver todo →
              </a>
            </div>

            {tipos.length > 1 && (
              <div className="sub-tabs">
                <button
                  className={`sub-tab ${sub === 'all' ? 'active' : ''}`}
                  onClick={() => setSub(cat.id, 'all')}
                  type="button"
                >
                  Todos
                </button>
                {tipos.map((t) => (
                  <button
                    key={t}
                    className={`sub-tab ${sub === t ? 'active' : ''}`}
                    onClick={() => setSub(cat.id, t)}
                    type="button"
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            )}

            <div className="grid">
              {visible.map((p) => (
                <ProgramCard programa={p} key={p.id} />
              ))}
            </div>
          </section>
        );
      })}

      {articulos.length > 0 && (
        <section className="blog">
          <div className="cat-head">
            <h2>Últimos análisis</h2>
            <Link href="/blog" className="mono" style={{ textDecoration: 'none' }}>
              Ver todo el blog →
            </Link>
          </div>
          <div className="blog-grid">
            {articulos.map((a) => {
              const cat = categorias.find((c) => c.id === a.categoria_id);
              return (
                <Link className="blog-card" href={`/blog/${a.slug}`} key={a.id}>
                  <div className="thumb">{(cat?.nombre || 'ARTÍCULO').toUpperCase()}</div>
                  <div className="body">
                    <span className="cat-label">{(cat?.nombre || '').toUpperCase()}</span>
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
              );
            })}
          </div>
        </section>
      )}

      <div className="podcast">
        <div>
          <span className="eyebrow mono">PODCAST Y YOUTUBE</span>
          <h2>Escucha o mira nuestros análisis semanales.</h2>
          <p>Conversaciones sobre mercados, IA y negocios digitales — próximamente disponible.</p>
        </div>
      </div>

      <div className="brand">
        <img className="brand-mark" src="/logo.png" alt="Millonario Digital" />
        <div>
          <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--cyan)' }}>
            QUIÉNES SOMOS
          </span>
          <h2>Millonario Digital no vende humo — vende criterio.</h2>
          <p>
            Nacimos de una idea simple: la mayoría de sitios sobre &quot;hacer dinero online&quot;
            recomiendan lo que sea que pague mejor comisión. Nosotros hacemos lo contrario —
            filtramos, probamos y solo mostramos lo que realmente sirve, empezando por lo que
            conocemos de primera mano: mercados, IA y negocios digitales.
          </p>
          <span className="signature mono">— EL EQUIPO DE MILLONARIO DIGITAL</span>
        </div>
      </div>

      <div className="capture">
        <h2>Recibe las herramientas nuevas antes que nadie</h2>
        <p>Cada semana analizamos una plataforma o programa nuevo. Súmate para recibirlo directo, sin spam.</p>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-glow" type="submit" disabled={subState === 'sending'}>
            {subState === 'sending' ? 'Enviando…' : subState === 'done' ? '¡Listo! ✓' : 'Quiero recibirlo'}
          </button>
        </form>
      </div>

      <footer className="foot-cols">
        <div>
          <div className="logo">
            <img className="logo-mark" src="/logo.png" alt="Millonario Digital" style={{ width: 28, height: 28 }} />
            <span className="logo-word">
              <em>Millonario Digital</em>
            </span>
          </div>
          <p>Reseñas y comparativas de programas, plataformas y herramientas de IA para generar ingresos digitales. Este sitio contiene enlaces de afiliados.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.95 8.44-9.94Z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
            </a>
            <a href="#" aria-label="YouTube" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.5-.45-5.17a2.9 2.9 0 0 0-2.03-2.05C18.87 4.3 12 4.3 12 4.3s-6.87 0-8.52.48a2.9 2.9 0 0 0-2.03 2.05C1 8.5 1 12 1 12s0 3.5.45 5.17c.25.95 1 1.7 2.03 2.05 1.65.48 8.52.48 8.52.48s6.87 0 8.52-.48a2.9 2.9 0 0 0 2.03-2.05C23 15.5 23 12 23 12Zm-13.5 3.25V8.75L15.5 12Z"/></svg>
            </a>
            <a href="#" aria-label="TikTok" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2h-3.2v13.6a2.9 2.9 0 1 1-2.1-2.79V9.5a6.1 6.1 0 1 0 5.3 6.06V8.4a7.6 7.6 0 0 0 4.4 1.4V6.6a4.4 4.4 0 0 1-4.4-4.4Z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h5 className="mono">APRENDE DE</h5>
          <ul>
            {categorias.map((c) => (
              <li key={c.id}>
                <a href={`#${c.slug}`}>{c.nombre}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mono">RECURSOS</h5>
          <ul>
            <li><a href="#">Últimos análisis</a></li>
            <li><a href="#">Newsletter</a></li>
            <li><a href="#">Sobre nosotros</a></li>
          </ul>
        </div>
      </footer>
      <div className="foot-bottom">
        <span>© {new Date().getFullYear()} Millonario Digital — Todos los derechos reservados.</span>
      </div>
    </>
  );
}
