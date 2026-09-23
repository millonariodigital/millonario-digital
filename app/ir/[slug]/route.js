import { supabase } from '../../../lib/supabaseClient';
import { redirect } from 'next/navigation';

export async function GET(request, { params }) {
  const { slug } = params;

  const { data: programa } = await supabase
    .from('programas')
    .select('id, enlace_afiliado')
    .eq('slug', slug)
    .single();

  if (!programa) {
    redirect('/');
  }

  // Registra el clic sin bloquear la redirección
  supabase.from('clics').insert({ programa_id: programa.id, origen: 'sitio' }).then(() => {});

  redirect(programa.enlace_afiliado);
}
