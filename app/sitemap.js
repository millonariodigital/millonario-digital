import { supabase } from '../lib/supabaseClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millonario-digital.com';

export default async function sitemap() {
  const { data: categorias } = await supabase.from('categorias').select('slug');
  const { data: resenas } = await supabase
    .from('resenas')
    .select('slug')
    .eq('publicado', true);
  const { data: articulos } = await supabase
    .from('articulos')
    .select('slug')
    .eq('publicado', true);

  const paginasCategorias = (categorias || []).map((c) => ({
    url: `${SITE_URL}/categoria/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const paginasResenas = (resenas || []).map((r) => ({
    url: `${SITE_URL}/resenas/${r.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const paginasArticulos = (articulos || []).map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const paginasEstaticas = ['/quienes-somos', '/politicas-de-uso', '/descubre-tu-camino'].map(
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
