# M1 — Scaffolding

Deps: ninguna

> **Prerrequisito:** `site.config.json` ya existe en la raíz del proyecto y fue aprobado
> por el humano durante el inicio de sesión (ver ROUTER.md). M1 no lo genera — lo consume.

## Checkpoint: M1 — Scaffolding
- **Crea:** proyecto Next.js, dependencias, layout, config.ts, types, stores, rutas base
- **No toca:** site.config.json (solo lo lee)

## Checklist

### Init

- [ ] `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [ ] `npx shadcn@latest init`
- [ ] Instalar componentes shadcn necesarios según el config:
  - Base mínima: `button input label form card accordion sheet drawer badge dialog`
- [ ] `npm install framer-motion lenis lucide-react zustand`
- [ ] Si `siteConfig.animations.level === 3` → `npm install gsap`

### Carpetas

- [ ] `/public/images/`
- [ ] `/src/components/layout/`
- [ ] `/src/components/sections/`
- [ ] `/src/components/store/`
- [ ] `/src/hooks/`
- [ ] `/src/lib/`
- [ ] `/src/types/`

### Config → Código

- [ ] Crear `src/lib/config.ts` → importar y re-exportar `site.config.json` con tipo
- [ ] Crear `src/types/config.ts` → tipos TypeScript del config (SiteConfig, Page, Section, StoreConfig)
- [ ] Crear `src/types/product.ts` → tipos de Product, Category, CartItem

### Google Sheets Integration

- [ ] Crear `src/lib/sheets.ts` → función para fetch y parse del CSV de Google Sheets
- [ ] Crear `src/lib/products.ts` → helpers de productos (filtrar, buscar, slug, featured)
- [ ] Crear `src/lib/format.ts` → formateo CLP, generador de link WhatsApp pedido

### Cart Store

- [ ] Crear `src/lib/store.ts` → Zustand store con:
  - `items[]`, `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`
  - `totalItems()`, `totalPrice()`
  - Persistencia en localStorage con middleware de Zustand
- [ ] Crear `src/hooks/useCart.ts` → hook wrapper del store

### Tailwind y Diseño

- [ ] Leer `siteConfig.colors` → mapear a tokens en `globals.css` (@theme)
- [ ] Incluir tokens de e-commerce: `success`, `danger`
- [ ] Leer `siteConfig.fonts` → configurar `next/font` en `layout.tsx`
- [ ] Crear `src/components/layout/SmoothScroll.tsx` (Lenis, "use client", wraps children)

### Rutas Base

- [ ] `app/page.tsx` — Landing page (placeholder)
- [ ] `app/catalogo/page.tsx` — Catálogo (placeholder)
- [ ] `app/catalogo/[slug]/page.tsx` — Detalle de producto (placeholder)
- [ ] `app/carrito/page.tsx` — Carrito (placeholder)

### Root Layout

- [ ] `layout.tsx`: lang="es", fonts, `<SmoothScroll>`, body classes
- [ ] Metadata desde `siteConfig.seo`
- [ ] Navbar y Footer compartidos en el layout (visibles en todas las páginas)

### Verificar

- [ ] `npm run dev` sin errores TypeScript
- [ ] `npm run build` ok
- [ ] Tokens de color funcionan (incluidos success/danger)
- [ ] Fuentes cargando correctamente
- [ ] Rutas `/catalogo` y `/carrito` accesibles
- [ ] Google Sheets fetch funcional (si hay URL configurada)
- [ ] Zustand store funcional en consola

## Done

- Build ok, shadcn ok, tokens ok, fonts ok, Lenis ok, Zustand ok, rutas ok, Sheets fetch ok
- → state.md: M1 🟢, M2 🟡
