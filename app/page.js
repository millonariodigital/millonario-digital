import { supabase } from '../lib/supabaseClient';
import { portadaUrl } from '../lib/portada';
import { imagenSitio } from '../lib/assets';
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

  const { data: programasRaw } = await supabase
    .from('programas')
    .select('*')
    .eq('activo', true);

  const programas = (programasRaw || []).map((p) => ({
    ...p,
    portada: portadaUrl(p.slug),
  }));

  const { data: articulos } = await supabase
    .from('articulos')
    .select('*')
    .eq('publicado', true)
    .order('fecha_publicacion', { ascending: false })
    .limit(3);

  const articulosConPortada = (articulos || []).map((a) => ({
    ...a,
    portada: portadaUrl(a.slug),
  }));

  const bannerInferior = imagenSitio('banner-inferior');

  return (
    <CatalogoInteractivo
      categorias={categorias || []}
      programas={programas || []}
      articulos={articulosConPortada}
      bannerInferior={bannerInferior}
    />
  );
}
