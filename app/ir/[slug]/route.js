import { supabase } from '../../../lib/supabaseClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// De qué parte del sitio viene el clic, según la página anterior (Referer).
// Solo se guarda la sección (portada, reseña, blog, categoría...), nunca
// datos del visitante.
function origenDesde(request) {
  try {
    const ref = request.headers.get('referer');
    if (!ref) return 'directo';
    const url = new URL(ref);
    const propio = url.hostname.endsWith('millonario-digital.com') || url.hostname.endsWith('vercel.app');
    if (!propio) return 'externo';
    const partes = url.pathname.split('/').filter(Boolean);
    if (partes.length === 0) return 'portada';
    if (partes[0] === 'resenas') return 'resena';
    if (partes[0] === 'blog') return partes.length > 1 ? 'blog-articulo' : 'blog';
    return partes[0].slice(0, 40);
  } catch {
    return 'sitio';
  }
}

export async function GET(request, { params }) {
  const { slug } = params;

  const { data: programa } = await supabase
    .from('programas')
    .select('id, enlace_afiliado')
    .eq('slug', slug)
    .single();

  if (!programa || !programa.enlace_afiliado) {
    redirect('/');
  }

  // Registra el clic esperando como máximo 800 ms: si la base de datos
  // tarda o falla, el visitante igual sigue a su destino sin notarlo.
  try {
    await Promise.race([
      supabase.from('clics').insert({ programa_id: programa.id, origen: origenDesde(request) }),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]);
  } catch {
    // nunca bloquear la redirección
  }

  redirect(programa.enlace_afiliado);
}
