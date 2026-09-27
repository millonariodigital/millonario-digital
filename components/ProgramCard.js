import { COLOR_ACENTO, COLOR_ACENTO_DEFAULT, textoParaFondo, iconoUrl } from '../lib/acentos';
import LogoImg from './LogoImg';

export default function ProgramCard({ programa }) {
  const color = COLOR_ACENTO[programa.slug] || COLOR_ACENTO_DEFAULT;
  const textColor = textoParaFondo(color);

  return (
    <div className="card">
      {programa.portada ? (
        <div className="card-hero">
          <img src={programa.portada} alt={programa.nombre} />
          <div className="card-hero-overlay">
            <LogoImg
              slug={programa.slug}
              simpleSrc={iconoUrl(programa.slug)}
              className="card-hero-icon"
            />
            <span className="card-hero-name">{programa.nombre}</span>
          </div>
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
          Leer más
        </a>
      </div>
    </div>
  );
}
