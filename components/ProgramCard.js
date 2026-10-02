import { COLOR_ACENTO, COLOR_ACENTO_DEFAULT, textoParaFondo, iconoUrl } from '../lib/acentos';
import { CALIFICACION, DIFICULTAD, CURSO_PROPIO } from '../lib/calificaciones';
import LogoImg from './LogoImg';

function IconoEstrella() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.8l7.1-.7L12 2.5z" />
    </svg>
  );
}

function IconoCategoria() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconoNivel() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="14" width="4" height="7" rx="1" />
      <rect x="10" y="9" width="4" height="12" rx="1" />
      <rect x="17" y="4" width="4" height="17" rx="1" />
    </svg>
  );
}

function IconoCursoPropio() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3L1 8l11 5 9-4.1V17h2V8L12 3z" />
      <path d="M5 10.5V15c0 1.66 3.13 3 7 3s7-1.34 7-3v-4.5l-7 3.18-7-3.18z" />
    </svg>
  );
}

export default function ProgramCard({ programa, categoriaNombre }) {
  const color = COLOR_ACENTO[programa.slug] || COLOR_ACENTO_DEFAULT;
  const textColor = textoParaFondo(color);
  const calificacion = CALIFICACION[programa.slug];
  const dificultad = DIFICULTAD[programa.slug];
  const categoria = categoriaNombre || null;
  const esCursoPropio = CURSO_PROPIO.includes(programa.slug);

  return (
    <div className="card card-rich">
      {programa.portada ? (
        <div className="card-hero">
          <img src={programa.portada} alt={programa.nombre} loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="card-banner" style={{ background: color }}>
          <LogoImg
            slug={programa.slug}
            simpleSrc={iconoUrl(programa.slug)}
            className="card-banner-icon"
          />
          <span className="card-banner-name" style={{ color: textColor }}>
            {programa.nombre}
          </span>
        </div>
      )}

      <div className="card-id-row">
        <div className="card-id-badge" style={{ '--acento': color }}>
          <LogoImg
            slug={programa.slug}
            simpleSrc={iconoUrl(programa.slug)}
            alt={programa.nombre}
          />
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{programa.nombre}</h3>
          {(categoria || programa.tipo) && (
            <span className="card-subtitle">
              {categoria}
              {categoria && programa.tipo ? ' · ' : ''}
              {programa.tipo
                ? programa.tipo.charAt(0).toUpperCase() + programa.tipo.slice(1)
                : ''}
            </span>
          )}
        </div>
      </div>

      <p>{programa.descripcion_corta}</p>

      {(calificacion || categoria || dificultad || esCursoPropio) && (
        <div className="card-stats-row">
          {esCursoPropio ? (
            <div className="card-stat">
              <IconoCursoPropio />
              <strong>Curso propio</strong>
              <span>Origen</span>
            </div>
          ) : (
            calificacion && (
              <div className="card-stat">
                <IconoEstrella />
                <strong>{calificacion}</strong>
                <span>Calificación</span>
              </div>
            )
          )}
          {categoria && (
            <div className="card-stat">
              <IconoCategoria />
              <strong>{categoria}</strong>
              <span>Categoría</span>
            </div>
          )}
          {dificultad && (
            <div className="card-stat">
              <IconoNivel />
              <strong>{dificultad}</strong>
              <span>Nivel</span>
            </div>
          )}
        </div>
      )}

      <div className="card-links card-links-stacked">
        <a
          className="affiliate-btn affiliate-btn-block"
          href={`/ir/${programa.slug}`}
          target="_blank"
          rel="nofollow sponsored noopener"
        >
          Visitar {programa.nombre} →
        </a>
        <a className="review-link review-link-block" href={`/resenas/${programa.slug}`}>
          Ver análisis →
        </a>
      </div>
    </div>
  );
}
