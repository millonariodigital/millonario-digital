import { COLOR_ACENTO, COLOR_ACENTO_DEFAULT, textoParaFondo } from '../lib/acentos';

export default function ProgramCard({ programa }) {
  const color = COLOR_ACENTO[programa.slug] || COLOR_ACENTO_DEFAULT;
  const textColor = textoParaFondo(color);

  return (
    <div className="card">
      <div className="card-banner" style={{ background: color }}>
        {programa.logo_url && (
          <img
            className="card-banner-icon"
            src={programa.logo_url}
            alt=""
            aria-hidden="true"
          />
        )}
        <span className="card-banner-name" style={{ color: textColor }}>
          {programa.nombre}
        </span>
      </div>
      <span className="tag">{(programa.tipo || '').toUpperCase()}</span>
      <h3>{programa.nombre}</h3>
      <p>{programa.descripcion_corta}</p>
      <div className="card-links">
        <a
          className="affiliate-btn"
          href={`/ir/${programa.slug}`}
          target="_blank"
          rel="nofollow sponsored noopener"
        >
          Visitar sitio →
        </a>
        <a className="review-link" href={`/resenas/${programa.slug}`}>
          Ver reseña
        </a>
      </div>
    </div>
  );
}
