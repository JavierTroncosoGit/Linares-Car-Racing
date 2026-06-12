# M0 — Preparación de Assets

Deps: CONTEXTO.md completado

> **Prerrequisito:** `usuario/CONTEXTO.md` y `ia/contexto-procesado.md` listos.
> M0 NO genera imágenes. Solo prepara la estructura de placeholders para inyectar imágenes reales después.

## Checkpoint: M0 — Assets
- **Crea:** estructura de carpetas, placeholders con dimensiones, manifest de assets
- **No toca:** componentes, estilos, ni código funcional

## Checklist

### Estructura de Carpetas

- [ ] `/public/images/hero/` — imagen principal del hero
- [ ] `/public/images/services/` — íconos o imágenes por cada categoría de servicio
- [ ] `/public/images/brand/` — logo, favicon, og-image
- [ ] `/public/images/products/` — imágenes de productos (fallback si el Sheet no tiene URL)
- [ ] `/public/images/misc/` — imágenes auxiliares

### Manifest de Assets

- [ ] Crear `assets-manifest.md` en `/ia/` con la lista completa de imágenes requeridas:

```markdown
| Archivo | Carpeta | Dimensiones | Uso | Estado |
|---------|---------|-------------|-----|--------|
| hero-main.webp | hero/ | 1920×1080 | Fondo del Hero | ⬜ Pendiente |
| logo.svg | brand/ | 200×60 | Navbar + Footer | ⬜ Pendiente |
| favicon.ico | brand/ | 32×32 | Pestaña del navegador | ⬜ Pendiente |
| og-image.jpg | brand/ | 1200×630 | Redes sociales | ⬜ Pendiente |
| srv-[categoria].webp | services/ | 600×400 | Card de categoría de servicio | ⬜ Pendiente |
| product-placeholder.webp | products/ | 600×600 | Fallback para productos sin imagen | ⬜ Pendiente |
```

> Completar el manifest con TODAS las categorías de servicio del `contexto-procesado.md`.
> Las imágenes de productos vienen del Google Sheet — NO crear placeholders individuales por producto.

### Placeholders en Código

- [ ] Crear archivo `src/lib/placeholders.ts` con constantes:
  - Rutas de cada imagen con fallback a placeholder genérico
  - Dimensiones esperadas por tipo (hero, services, brand, products)
  - Alt text descriptivo pre-escrito para cada imagen
  - Función helper `getImageOrPlaceholder(key)`
  - Placeholder específico para productos sin imagen en el Sheet

### Placeholder Visual

- [ ] Usar `div` con background color + ícono Lucide + texto del nombre como placeholder visual
- [ ] Cada placeholder debe mostrar: dimensiones esperadas + nombre del archivo que se necesita
- [ ] Estilo consistente: fondo `bg-secondary` con ícono centrado y texto del nombre

### Verificar

- [ ] Todas las carpetas existen en `/public/images/`
- [ ] El manifest lista TODAS las imágenes necesarias (excepto productos del Sheet)
- [ ] `placeholders.ts` tiene una entrada por cada imagen del manifest
- [ ] Los placeholders son fáciles de reemplazar: cambiar solo la ruta en `placeholders.ts`
- [ ] Hay un placeholder de producto genérico para el catálogo

## Done

- Estructura de assets lista, manifest completo, placeholders tipados
- Para inyectar imágenes reales: colocar archivos en `/public/images/` y actualizar `placeholders.ts`
- → state.md: M0 🟢, M1 🟡
