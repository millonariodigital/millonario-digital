/** @type {import('next').NextConfig} */
// Direcciones cortas para redes sociales. Cada una redirige a la guía gratis
// con su etiqueta UTM, así se sabe de qué red llega cada visita.
// Las de /web llevan a la portada del sitio con la misma etiqueta de origen.
// Son redirecciones temporales (307) para poder cambiarlas sin que queden en caché.
const guia = (fuente) =>
  `/guia-gratis?utm_source=${fuente}&utm_medium=bio&utm_campaign=guia-gratis`;

const web = (fuente) =>
  `/?utm_source=${fuente}&utm_medium=bio&utm_campaign=sitio-web`;

const nextConfig = {
  async redirects() {
    return [
      { source: '/guia', destination: guia('tiktok'), permanent: false },
      { source: '/guia-ig', destination: guia('instagram'), permanent: false },
      { source: '/guia-fb', destination: guia('facebook'), permanent: false },
      { source: '/guia-yt', destination: guia('youtube'), permanent: false },
      { source: '/web', destination: web('tiktok'), permanent: false },
      { source: '/web-ig', destination: web('instagram'), permanent: false },
      { source: '/web-fb', destination: web('facebook'), permanent: false },
      { source: '/web-yt', destination: web('youtube'), permanent: false },
    ];
  },
};

module.exports = nextConfig;
