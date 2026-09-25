import { supabase } from '../lib/supabaseClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millonario-digital-web.vercel.app';

export default async function sitemap() {
  const { data: categorias } = await supabase.from('categorias').select('slug');

  const paginasCategorias = (categorias || []).map((c) => ({
    url: `${SITE_URL}/categoria/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...paginasCategorias,
  ];
}
