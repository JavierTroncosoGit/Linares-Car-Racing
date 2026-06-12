# M7 — Catálogo E-commerce (Google Sheets)

Deps: M1

## Checkpoint: M7 — Catálogo
- **Lee:** `site.config.json` (store{}, pages.catalogo)
- **Crea:** Página de catálogo, product grid, filtros, product cards, página de detalle
- **No toca:** componentes de la landing (sections/), layout.tsx, site.config.json

## Checklist

### Google Sheets → Datos

- [ ] Verificar que `store.sheetsConfig.productsSheetUrl` existe y es accesible
- [ ] Implementar `src/lib/sheets.ts`:
  - Fetch del CSV publicado
  - Parse CSV a array de objetos `Product[]`
  - Manejo de errores (Sheet no disponible, formato incorrecto)
  - Cache con ISR: `next: { revalidate: store.sheetsConfig.revalidateSeconds }`
- [ ] Implementar `src/lib/products.ts`:
  - `getAllProducts()` — todos los productos
  - `getFeaturedProducts()` — filtro `featured === TRUE`
  - `getProductsByCategory(categorySlug)` — filtro por categoría
  - `getProductBySlug(slug)` — producto individual para detalle
  - `getComplementaryProducts(product)` — productos complementarios por SKU
  - `getCategories()` — categorías únicas extraídas de los productos
  - `generateSlug(name)` — generar slug a partir del nombre si no existe
- [ ] Verificar que los datos se parsean correctamente (precios como número, featured como boolean)

### Página de Catálogo (`/catalogo`)

- [ ] Server Component principal que fetch los productos
- [ ] **Header de página**: Título, subtítulo, breadcrumb
- [ ] **SEO**: Metadata específica desde `siteConfig.pages.catalogo.seo`
- [ ] Layout: sidebar de filtros (desktop) / filtros horizontales (mobile) + grid de productos

### Filtro por Categorías (`CategoryFilter.tsx`)

- [ ] Client Component (`"use client"`)
- [ ] Leer categorías desde `store.categories[]` del config
- [ ] Opción "Todas" siempre visible como primera opción
- [ ] Estilo: Pills/chips con estado activo/inactivo
- [ ] Al filtrar → actualizar el grid de productos sin recargar página
- [ ] URL query params para compartir filtro (ej: `/catalogo?cat=equipos-pintura`)
- [ ] En mobile: scroll horizontal de pills
- [ ] En desktop: sidebar vertical o pills horizontales

### Grid de Productos (`ProductGrid.tsx`)

- [ ] Recibe `products[]` filtrados y los renderiza
- [ ] Layout responsive:
  - Mobile (< 640px): 1 columna
  - Tablet (640-1024px): 2 columnas
  - Desktop (> 1024px): 3-4 columnas
- [ ] Animación de entrada: stagger con Framer Motion
- [ ] Estado vacío: "No hay productos en esta categoría"

### Card de Producto (`ProductCard.tsx`)

- [ ] Client Component (por el botón Agregar)
- [ ] Elementos:
  - **Imagen** del producto (desde Sheet URL o placeholder)
  - **Marca** (badge o label sutil)
  - **Nombre** del producto (truncado si es muy largo)
  - **Precio** formateado en CLP (ej: `$752.599`)
  - **SKU** (texto pequeño, sutil)
  - **Botón "Agregar al carrito"** (interactúa con Zustand store)
  - **Link "Ver detalle"** → `/catalogo/[slug]`
- [ ] Hover: elevación sutil + escala 1.02
- [ ] Click en la card (excepto botón agregar) → navega al detalle
- [ ] Al agregar: feedback visual (ícono check, toast, o sidebar del carrito se abre)

### Página de Detalle (`/catalogo/[slug]`)

- [ ] Server Component principal con `generateStaticParams` para SSG
- [ ] **SEO dinámico**: título = nombre del producto, description = descripción corta
- [ ] Layout:
  - **Galería de imágenes** (imagen principal + imágenes adicionales del Sheet)
  - **Info del producto**: nombre, marca, SKU, precio, descripción detallada
  - **Botón "Agregar al carrito"** (grande, prominente)
  - **Selector de cantidad** (+/- antes de agregar)
  - **Breadcrumb**: Inicio > Catálogo > [Categoría] > [Producto]
- [ ] **Productos complementarios**: Grid de 2-4 productos (si el Sheet tiene la columna `complementary`)
- [ ] **CTA de WhatsApp**: "¿Tienes dudas sobre este producto? Escríbenos"
- [ ] Botón "Volver al catálogo"

### Galería de Producto (`ProductGallery.tsx`)

- [ ] Client Component
- [ ] Imagen principal grande (click para ampliar en dialog/modal)
- [ ] Miniaturas debajo (image_main, image_2, image_3)
- [ ] Al tocar miniatura → cambia la imagen principal
- [ ] En mobile: carousel de imágenes con swipe
- [ ] Usar `next/image` con `sizes` correcto

### Verificar

- [ ] Los productos se cargan correctamente del Google Sheet
- [ ] El filtro por categoría funciona (incluido query params en URL)
- [ ] Las product cards muestran: imagen, nombre, marca, precio, SKU
- [ ] El botón "Agregar al carrito" funciona y da feedback
- [ ] La página de detalle muestra toda la info del producto
- [ ] La galería de imágenes funciona (principal + miniaturas)
- [ ] Los productos complementarios se muestran correctamente
- [ ] El link de WhatsApp se genera con el contexto del producto
- [ ] Los precios se formatean correctamente en CLP
- [ ] Los slugs de URL funcionan para cada producto
- [ ] ISR funciona: los datos se actualizan al revalidar
- [ ] El estado vacío se muestra cuando no hay productos

## Done

- Catálogo completo: Google Sheets → Product Grid + Filtros + Detalle + Galería
- → state.md: M7 🟢, M8 🟡
