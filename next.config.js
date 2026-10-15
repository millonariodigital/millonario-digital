/** @type {import('next').NextConfig} */
// Direcciones cortas para redes sociales. Cada una redirige a la guía gratis
// con su etiqueta UTM, así se sabe de qué red llega cada visita.
// Son redirecciones temporales (307) para poder cambiarlas sin que queden en caché.
const guia = (fuente) =>
  `/guia-gratis?utm_source=${fuente}&utm_medium=bio&utm_campaign=guia-gratis`;

const nextConfig = {
  async redirects() {
    return [
      { source: '/guia', destination: guia('tiktok'), permanent: false },
      { source: '/guia-ig', destination: guia('instagram'), permanent: false },
      { source: '/guia-fb', destination: guia('facebook'), permanent: false },
      { source: '/guia-yt', destination: guia('youtube'), permanent: false },
    ];
  },
};

module.exports = nextConfig;
