# M4 — Optimización + Deploy

Deps: todas las anteriores

## Checkpoint: M4 — Optimización
- **Lee:** `site.config.json` (seo, analytics)
- **Verifica:** SEO, imágenes, Lighthouse, Deploy en Vercel

## Checklist

### SEO
- [ ] Metadata API con `siteConfig.seo` (landing)
- [ ] Metadata específica para `/catalogo` (desde `siteConfig.pages.catalogo.seo`)
- [ ] Metadata dinámica para `/catalogo/[slug]` (nombre y descripción del producto)
- [ ] Open Graph (og:title, og:description, og:image) — por página
- [ ] Canonical URL
- [ ] Un solo `<h1>` por página (Hero en landing, título en catálogo, nombre en detalle)

### Sitemap y Robots (OBLIGATORIO)

#### robots.txt
- [ ] Crear `/public/robots.txt` con:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://[dominio]/sitemap.xml
  ```
- [ ] Bloquear rutas internas si existen (ej: `/api/`, `/_next/`)
- [ ] Verificar que el archivo es accesible en `[dominio]/robots.txt`

#### sitemap.xml
- [ ] Generar `sitemap.xml` usando la Metadata API de Next.js (`app/sitemap.ts`):
  ```typescript
  import { MetadataRoute } from 'next'

  export default function sitemap(): MetadataRoute.Sitemap {
    return [
      {
        url: 'https://[dominio]',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
      {
        url: 'https://[dominio]/catalogo',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ]
  }
  ```
- [ ] Considerar generar URLs dinámicas para cada producto del catálogo
- [ ] Verificar que el sitemap es accesible en `[dominio]/sitemap.xml`
- [ ] Actualizar la URL del dominio real tras el deploy

### Imágenes
- [ ] `next/image` en todas partes (landing + catálogo + detalle)
- [ ] Alt descriptivo en todas las imágenes
- [ ] `priority` en la imagen del Hero (LCP)
- [ ] `sizes` correcto en imágenes de productos según el grid layout
- [ ] Imágenes de productos del Sheet: validar que las URLs son accesibles

### Performance
- [ ] `npm run build` sin errores
- [ ] Lighthouse > 90 en Perf, A11y, SEO (landing)
- [ ] Lighthouse > 85 en Perf para catálogo (tiene fetch externo)
- [ ] Eliminar "use client" innecesarios
- [ ] Sin console.log
- [ ] ISR configurado correctamente para datos del Google Sheet
- [ ] Verificar que el cache del Sheet se revalida según `revalidateSeconds`

### Deploy
- [ ] Conectar GitHub con Vercel
- [ ] Verificar que carga correctamente en la URL de producción
- [ ] Verificar `/catalogo` carga productos desde el Sheet
- [ ] Verificar `/catalogo/[slug]` genera páginas de detalle
- [ ] Verificar `/carrito` funciona correctamente
- [ ] Verificar `robots.txt` y `sitemap.xml` accesibles en producción
- [ ] Actualizar URL del dominio en sitemap y canonical

## Done

- Lighthouse en verde, SEO configurado (multi-página), sitemap con catálogo, sitio en producción
- → state.md: M4 🟢, M5 ⚪ (Opcional)
