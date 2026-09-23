# Millonario Digital

Sitio de reseñas y enlaces de afiliados sobre programas, plataformas y herramientas de IA para generar ingresos digitales.

## Stack
- Next.js 14 (App Router)
- Supabase (base de datos)
- Vercel (hosting)

## Configuración local

1. Instala dependencias:
   ```
   npm install
   ```
2. Copia `.env.local.example` a `.env.local` y completa con los datos de tu proyecto de Supabase
   (Project Settings → API → Project URL y anon public key).
3. Corre el proyecto:
   ```
   npm run dev
   ```

## Subir a GitHub

```
git init
git add .
git commit -m "Primera versión del sitio"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/millonario-digital.git
git push -u origin main
```

## Desplegar en Vercel

1. En Vercel, "Add New Project" → importa el repositorio de GitHub.
2. En "Environment Variables" agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (los mismos valores de tu `.env.local`).
3. Deploy. Cada push a `main` desplegará automáticamente.

## Cómo agregar un programa nuevo

Por ahora se agrega directo desde Supabase: Table Editor → `programas` → Insert row.
Necesita: `categoria_id` (de la tabla `categorias`), `nombre`, `slug` (único, sin espacios),
`descripcion_corta`, `enlace_afiliado`, `tipo`, `activo = true`.

El sitio los toma automáticamente — no hace falta tocar código para agregar contenido nuevo.
