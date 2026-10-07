import { supabase } from '../lib/supabaseClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millonario-digital.com';

export default async function sitemap() {
  const { data: categorias } = await supabase.from('categorias').select('slug');

  // Solo reseñas publicadas Y cuyo programa esté activo. Así los programas
  // ocultos (por ejemplo los cursos propios) no aparecen en el sitemap
  // y Google no recibe páginas que dan error 404.
  const { data: programasActivos } = await supabase
    .from('programas')
    .select('id')
    .eq('activo', true);
  const idsActivos = (programasActivos || []).map((p) => p.id);

  let resenas = [];
  if (idsActivos.length > 0) {
    const { data } = await supabase
      .from('resenas')
      .select('slug')
      .eq('publicado', true)
      .in('programa_id', idsActivos);
    resenas = data || [];
  }

  const { data: articulos } = await supabase
    .from('articulos')
    .select('slug')
    .eq('publicado', true);

  const paginasCategorias = (categorias || []).map((c) => ({
    url: `${SITE_URL}/categoria/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const paginasResenas = resenas.map((r) => ({
    url: `${SITE_URL}/resenas/${r.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const paginasArticulos = (articulos || []).map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const paginasEstaticas = ['/contacto', '/quienes-somos', '/politicas-de-uso', '/descubre-tu-camino'].map(
    (ruta) => ({
      url: `${SITE_URL}${ruta}`,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  );

  return [
    {
      url: SITE_URL,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...paginasCategorias,
    ...paginasResenas,
    ...paginasArticulos,
    ...paginasEstaticas,
  ];
}
