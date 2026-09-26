import { supabase } from '../lib/supabaseClient';
import CatalogoInteractivo from '../components/CatalogoInteractivo';

// Vuelve a traer los datos de Supabase como máximo cada 60 segundos,
// así los cambios en la base de datos se reflejan sin tener que
// re-desplegar el sitio.
export const revalidate = 60;

export default async function Home() {
  const { data: categorias } = await supabase
    .from('categorias')
    .select('*')
    .order('orden', { ascending: true });

  const { data: programas } = await supabase
    .from('programas')
    .select('*')
    .eq('activo', true);

  const { data: articulos } = await supabase
    .from('articulos')
    .select('*')
    .eq('publicado', true)
    .order('fecha_publicacion', { ascending: false })
    .limit(3);

  return (
    <CatalogoInteractivo
      categorias={categorias || []}
      programas={programas || []}
      articulos={articulos || []}
    />
  );
}
