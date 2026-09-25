export default function ProgramCard({ programa }) {
  return (
    <div className="card">
      {programa.logo_url && <img src={programa.logo_url} alt={programa.nombre} />}
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
