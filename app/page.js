import { supabase } from '../lib/supabaseClient';
import { portadaUrl } from '../lib/portada';
import { logoUrl } from '../lib/logos';
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

  // Estrategia principal: las tarjetas con enlace de afiliado REAL van primero
  // en cada categoría (y por tanto entre las que se ven al cargar la portada).
  // Ojo: la columna enlace_afiliado también guarda la web normal de la marca
  // en las tarjetas sin afiliado, por eso no sirve para decidir el orden.
  // Se usa la columna afiliado_confirmado (true solo si el enlace lleva tu código).
  // Dentro de cada grupo se respeta 'destacado' y luego el orden original.
  const tieneEnlace = (p) => p.afiliado_confirmado === true;

  const programas = (programasRaw || [])
    .map((p, i) => ({
      ...p,
      portada: portadaUrl(p.slug),
      logo: logoUrl(p.slug),
      _orden: i,
    }))
    .sort((a, b) => {
      const porEnlace = Number(tieneEnlace(b)) - Number(tieneEnlace(a));
      if (porEnlace !== 0) return porEnlace;
      const porDestacado = Number(!!b.destacado) - Number(!!a.destacado);
      if (porDestacado !== 0) return porDestacado;
      return a._orden - b._orden;
    });

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
