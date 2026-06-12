# Stack (LEY — no cambiar)

## Core

| Pilar | Tecnología | Versión |
|-------|-----------|---------| 
| Framework | Next.js (App Router) | 15.x |
| Styling | Tailwind CSS (CSS-first) | v4.x |
| Deploy | Vercel | — |
| UI | shadcn/ui | latest |
| Lenguaje | TypeScript (strict) | — |
| Runtime | Node.js 20.x LTS | — |
| Package Manager | npm | — |
| State (Cart) | Zustand | latest |
| Data Source | Google Sheets (CSV) | — |

## Estructura de Rutas (Landing + E-commerce)

> Este proyecto es un sitio multi-página: landing page + catálogo e-commerce + carrito.

```
src/
├── app/
│   ├── layout.tsx                    ← Root layout (navbar + footer compartidos)
│   ├── page.tsx                      ← Landing Page (secciones de la landing)
│   ├── catalogo/
│   │   ├── page.tsx                  ← Catálogo de productos (grid + filtros)
│   │   └── [slug]/
│   │       └── page.tsx              ← Detalle de producto
│   └── carrito/
│       └── page.tsx                  ← Carrito de compras + checkout
├── components/
│   ├── layout/                       ← Navbar, Footer, SmoothScroll, CartSidebar
│   ├── sections/                     ← Secciones de la landing (Hero, Services, etc.)
│   ├── store/                        ← Componentes del e-commerce
│   │   ├── ProductCard.tsx           ← Card de producto (imagen, nombre, precio, agregar)
│   │   ├── ProductGrid.tsx           ← Grid de productos con layout responsive
│   │   ├── ProductDetail.tsx         ← Vista detalle (galería, descripción, complementarios)
│   │   ├── ProductGallery.tsx        ← Galería de imágenes del producto
│   │   ├── CategoryFilter.tsx        ← Filtro por categorías
│   │   ├── CartSidebar.tsx           ← Drawer lateral del carrito
│   │   ├── CartItem.tsx              ← Item individual en el carrito
│   │   ├── CartSummary.tsx           ← Resumen de totales
│   │   ├── CheckoutForm.tsx          ← Formulario de pedido
│   │   └── FeaturedProducts.tsx      ← Sección de productos destacados (landing)
│   └── ui/                           ← shadcn components
├── hooks/
│   └── useCart.ts                    ← Hook para interactuar con el cart store
├── lib/
│   ├── config.ts                     ← Import site.config.json con tipos
│   ├── utils.ts                      ← cn() y helpers
│   ├── store.ts                      ← Zustand cart store
│   ├── sheets.ts                     ← Fetch + parse Google Sheets CSV
│   ├── products.ts                   ← Helpers de productos (filtrar, buscar, categorizar)
│   └── format.ts                     ← Formateo de precios CLP, slugs
└── types/
    ├── config.ts                     ← Tipos del site.config.json
    └── product.ts                    ← Tipos de Product, Category, CartItem
```

## Patrones de UI (OBLIGATORIO)

### Server Components por defecto
Casi todas las secciones de la landing y la página de catálogo deben ser Server Components.

### Client Components solo para interactividad
`"use client"` solo para:
- Smooth scroll (Lenis)
- Mobile navbar (Sheet)
- Carousels / Testimonials
- Animaciones complejas (Framer Motion)
- Formularios de contacto y checkout
- Carrito (CartSidebar, CartItem, botones Agregar)
- Filtros de categoría (CategoryFilter)
- Galería de producto (ProductGallery)

## Layout Base (LEY)

Todo el contenido vive dentro de un contenedor de **1200px máximo**.
Los fondos de secciones son siempre **full-width**.

```tsx
<section id={id} className="w-full bg-bg-secondary py-16 lg:py-24">
  <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
    {/* contenido */}
  </div>
</section>
```

## Patrones

- App Router, nunca Pages Router
- `next/image`, nunca `<img>`
- `next/font`, nunca Google Fonts CDN
- Metadata API, nunca `<head>` manual
- Tailwind utilities, nunca CSS Modules/styled-components
- Server Components default, `"use client"` solo si necesario
- `cn()` de `lib/utils.ts` para clases condicionales
- Lenis para smooth scroll
- Datos de secciones SIEMPRE desde `site.config.json`
- Datos de productos SIEMPRE desde Google Sheets (vía `lib/sheets.ts`)
- Estado del carrito SIEMPRE desde Zustand (`lib/store.ts`)
- Precios SIEMPRE formateados con `lib/format.ts` (CLP con separador de miles)

## Patrones E-commerce

### Google Sheets → Productos
```tsx
// lib/sheets.ts — Fetch y parse del CSV
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(sheetsUrl, { next: { revalidate: 3600 } });
  const csv = await res.text();
  return parseCSV(csv);
}

// lib/products.ts — Helpers
export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter(p => p.featured === true);
}

export function getProductsByCategory(products: Product[], categorySlug: string): Product[] {
  return products.filter(p => slugify(p.category) === categorySlug);
}

export function getComplementaryProducts(product: Product, allProducts: Product[]): Product[] {
  const skus = product.complementary?.split(',').map(s => s.trim()) || [];
  return allProducts.filter(p => skus.includes(p.sku));
}
```

### Zustand Cart Store
```tsx
// lib/store.ts
interface CartItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}
```

### Formato de precios CLP
```tsx
// lib/format.ts
export function formatCLP(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
}
```

### Pedido por WhatsApp
```tsx
// lib/format.ts
export function generateWhatsAppOrder(items: CartItem[], total: number, config: StoreConfig): string {
  const orderDetails = items.map(item => 
    `• ${item.name} (x${item.quantity}) — ${formatCLP(item.price * item.quantity)}`
  ).join('\n');
  
  const message = config.cart.whatsappOrderMessage
    .replace('{orderDetails}', orderDetails)
    .replace('{total}', formatCLP(total));
  
  return `https://wa.me/${config.cart.whatsappOrderNumber}?text=${encodeURIComponent(message)}`;
}
```

## Libs Aprobadas

| Lib | Uso |
|-----|-----|
| shadcn/ui | Button, Accordion, Sheet, Card, Badge, Input, Textarea, Drawer, Dialog |
| lenis | Smooth scroll |
| framer-motion | Animaciones Nivel 2 |
| lucide-react | Íconos |
| embla-carousel-react | Carousels (via shadcn) |
| zustand | Estado del carrito |
| papaparse | Parse CSV de Google Sheets (opcional, se puede parsear manualmente) |

## Animaciones

| Nivel | Tool | Cuándo |
|-------|------|--------|
| 1 | Tailwind transition/animate | Hovers, fades |
| 2 | Framer Motion | Scroll reveals, stagger |
| 3 | GSAP + ScrollTrigger | Parallax, pin. Requiere aprobación |

## Prohibido

jQuery, Bootstrap, Moment.js, styled-components, CSS Modules, Axios, React Router, Supabase, exponer llaves privadas en frontend, hardcodear productos en el código.

## Naming

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Componentes | PascalCase | Hero.tsx, ProductCard.tsx |
| Pages | page.tsx | app/page.tsx, app/catalogo/page.tsx |
| Tipos | PascalCase | SiteConfig, Product, CartItem |
| Hooks | camelCase+use | useCart, useProducts |
| Lib/Utils | camelCase | sheets.ts, format.ts |

## Performance

LCP <2.5s, CLS <0.1, INP <200ms, Lighthouse >90, SEO >95
