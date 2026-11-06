// Datos del regalo principal (el kit) y de los extras de cada video.
// Si cambias un PDF o su nombre, solo hay que actualizarlo aquí y en public/descargas.
export const GUIA_URL = '/descargas/kit-videos-ia-sin-mostrar-tu-cara.pdf';
export const GUIA_TITULO = 'Kit para crear videos con IA sin mostrar tu cara';
export const GUIA_PORTADA = '/kit-portada.jpg';
export const GUIA_GRACIAS = '/guia-gratis/gracias';

// La guía anterior sigue disponible como regalo extra en la página de gracias.
export const GUIA_ANTERIOR_URL = '/descargas/guia-ingresos-ia-millonario-digital.pdf';
export const GUIA_ANTERIOR_TITULO = '7 formas de generar ingresos con IA sin invertir capital';

// Extras por video. La clave es el valor de ?tema= en el enlace
// (por ejemplo millonario-digital.com/guia-fb?tema=printful).
// Para agregar un video nuevo: sube su PDF a public/descargas/extras/ y añade una entrada aquí.
export const EXTRAS = {
  printful: {
    nombre: 'Printful',
    titulo: 'Checklist antes de lanzar tu primer producto + 10 prompts de diseños',
    url: '/descargas/extras/extra-printful.pdf',
  },
};

export function extraDe(tema) {
  if (typeof tema !== 'string') return null;
  const clave = tema.trim().toLowerCase();
  return EXTRAS[clave] ? { clave, ...EXTRAS[clave] } : null;
}
