// Muestra el logo de un programa. La URL ya viene resuelta desde el
// servidor (lib/acentos.js -> logoUrl), que revisó si existe un
// archivo subido a mano en public/logos/{slug} o si hay un ícono de
// marca disponible. Si no hay nada, no se muestra ningún <img> — así
// nunca aparece el ícono de "imagen rota".
export default function LogoImg({ src, className, alt = '' }) {
  if (!src) return null;
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}
