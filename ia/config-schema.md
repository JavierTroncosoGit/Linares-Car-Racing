# Config Schema — Spec Generativa v3.1 (Landing + E-commerce)

> **Este es el archivo canónico** para la estructura de `site.config.json`.
> Define la configuración de la landing page, catálogo e-commerce y carrito de compras.
> Para ver un ejemplo completo con datos ficticios, ver `usuario/SITE_CONFIG_TEMPLATE.json`.

## Concepto central

`site.config.json` usa `pages{}` para definir las páginas del sitio, cada una con su propio array de `sections[]`. Además incluye un bloque `store{}` para la configuración del catálogo y carrito.

---

## Estructura base del JSON

```json
{
  "_meta": {
    "version": "3.1.0",
    "project": "...",
    "type": "landing+ecommerce"
  },
  "brand": {
    "name": "...",
    "logo": { "src": "...", "alt": "...", "width": 130, "height": 44 },
    "favicon": "/favicon.ico"
  },
  "colors": {
    "_guide": {
      "primary": "Color de marca — botones CTA, links activos",
      "primaryDark": "Hover de botones (se calcula automático si no se define)",
      "accent": "Badges, detalles decorativos, precio destacado",
      "bgPrimary": "Fondo principal de la página",
      "bgSecondary": "Fondo alternado para ritmo visual",
      "textPrimary": "Títulos, párrafos principales",
      "textSecondary": "Subtítulos, labels, descripciones",
      "success": "Confirmaciones, en stock, badge agregado al carrito",
      "danger": "Errores, sin stock, alertas"
    },
    "primary": "#...",
    "primaryDark": "#...",
    "accent": "#...",
    "bgPrimary": "#...",
    "bgSecondary": "#...",
    "textPrimary": "#...",
    "textSecondary": "#...",
    "success": "#...",
    "danger": "#..."
  },
  "fonts": {
    "heading": "...",
    "body": "..."
  },
  "seo": {
    "title": "...",
    "title_max": "60 caracteres",
    "description": "...",
    "description_max": "155 caracteres",
    "ogTitle": "...",
    "ogDescription": "...",
    "ogImage": "/images/og-image.jpg",
    "canonicalUrl": "...",
    "locale": "es"
  },
  "contact": {
    "whatsapp": [
      {
        "number": "...",
        "label": "...",
        "message": "..."
      }
    ],
    "email": "...",
    "social": {
      "instagram": "..."
    }
  },
  "analytics": {
    "_guide": "Incluir solo si tienes los IDs. Omitir este bloque si no hay analytics.",
    "googleAnalyticsId": "G-XXXXXXXXXX",
    "facebookPixelId": "1234567890"
  },
  "animations": { "level": 1|2|3 },
  "store": {
    "_guide": "Configuración del catálogo y carrito de compras.",
    "enabled": true,
    "currency": "CLP",
    "currencySymbol": "$",
    "sheetsConfig": {
      "_guide": "URL del Google Sheet publicado como CSV. La IA lo consume para renderizar productos.",
      "productsSheetUrl": "https://docs.google.com/spreadsheets/d/.../pub?gid=0&single=true&output=csv",
      "revalidateSeconds": 3600
    },
    "categories": [
      { "id": "...", "name": "...", "slug": "...", "icon": "..." }
    ],
    "featuredSection": {
      "_guide": "Sección de productos destacados en la landing. Se filtra por columna 'featured' = TRUE en el Sheet.",
      "enabled": true,
      "title": "Productos Destacados",
      "subtitle": "...",
      "maxProducts": 8
    },
    "productDetail": {
      "_guide": "Configuración de la página de detalle de producto.",
      "showComplementary": true,
      "maxComplementary": 4,
      "showBrand": true,
      "showSku": true
    },
    "cart": {
      "enabled": true,
      "orderMethod": "both",
      "_orderMethodOptions": "whatsapp | form | both",
      "whatsappOrderNumber": "...",
      "whatsappOrderMessage": "Hola, quiero hacer un pedido:\n\n{orderDetails}\n\nTotal: {total}",
      "formDestinationEmail": "..."
    },
    "shipping": {
      "type": "pickup",
      "_typeOptions": "pickup | delivery | both",
      "pickupNote": "...",
      "deliveryNote": "..."
    }
  },
  "pages": {
    "landing": {
      "slug": "/",
      "sections": [
        { "id": "navbar", "type": "navbar" },
        { "id": "hero", "type": "hero" },
        "...",
        { "id": "footer", "type": "footer" }
      ]
    },
    "catalogo": {
      "slug": "/catalogo",
      "seo": {
        "title": "...",
        "description": "..."
      }
    }
  }
}
```

> **Patrón `_note` / `_guide`:** Cada sección y bloque puede incluir campos `_note` o `_guide`
> con explicaciones para el humano. La IA los ignora al construir componentes.

---

## Bloque `store{}` — Spec del Catálogo

### Google Sheets como fuente de datos

El catálogo se alimenta de un Google Sheet publicado como CSV. La estructura esperada del Sheet es:

| Columna | Tipo | Requerido | Descripción |
|---------|------|-----------|-------------|
| `sku` | string | ✅ | Código único del producto |
| `name` | string | ✅ | Nombre del producto |
| `description` | string | ✅ | Descripción breve (para card) |
| `description_long` | string | ⚡ | Descripción detallada (para página de detalle) |
| `brand` | string | ✅ | Marca del producto |
| `price` | number | ✅ | Precio final (sin símbolo de moneda) |
| `category` | string | ✅ | Categoría (debe coincidir con `store.categories[].name`) |
| `image_main` | string | ✅ | URL de la imagen principal |
| `image_2` | string | ⚡ | URL segunda imagen (para detalle) |
| `image_3` | string | ⚡ | URL tercera imagen (para detalle) |
| `featured` | boolean | ⚡ | `TRUE` = aparece en "Productos Destacados" de la landing |
| `complementary` | string | ⚡ | SKUs separados por coma de productos complementarios |
| `slug` | string | ⚡ | Slug para la URL (si vacío, se genera del nombre) |

> **ISR (Incremental Static Regeneration):** Los datos del Sheet se cachean y revalidan según `sheetsConfig.revalidateSeconds`. Default: 3600 (1 hora).

### Categorías

Las categorías se definen en `store.categories[]`. La IA las genera automáticamente a partir de los productos del Sheet. Cada categoría tiene:

```json
{
  "id": "equipos-pintura",
  "name": "Equipos de Pintura",
  "slug": "equipos-pintura",
  "icon": "paint-bucket"
}
```

### Carrito

El carrito se maneja 100% client-side con Zustand + localStorage. No hay backend de carrito.

| Feature | Detalle |
|---------|---------|
| State | Zustand store con persistencia en localStorage |
| Agregar | Botón "Agregar al carrito" en product card y detalle |
| Cantidad | +/- en el carrito |
| Badge | Contador en ícono de carrito del navbar |
| Sidebar | Drawer lateral al agregar producto |
| Checkout | Formulario + envío por WhatsApp con resumen |

---

## Tipos de Sección Soportados

### `navbar`
```json
{
  "id": "navbar",
  "type": "navbar",
  "links": [ { "text": "...", "href": "#id | /ruta" } ],
  "cta": { "text": "...", "href": "..." },
  "showCart": true
}
```
> `showCart: true` muestra el ícono de carrito con badge de cantidad.
> `links[].href` puede ser un ancla `#id` o una ruta `/catalogo`.

### `hero`
```json
{
  "id": "hero",
  "type": "hero",
  "badge": "...",
  "headline": "...",
  "subheadline": "...",
  "ctas": [ { "text": "...", "href": "...", "variant": "primary|secondary" } ],
  "media": { "type": "image|video|none", "src": "...", "alt": "..." }
}
```

### `stats`
```json
{
  "id": "stats",
  "type": "stats",
  "items": [ { "value": "...", "label": "...", "icon": "..." } ]
}
```

### `benefits-grid`
```json
{
  "id": "benefits",
  "type": "benefits-grid",
  "sectionLabel": "...",
  "headline": "...",
  "columns": 3,
  "items": [ { "icon": "...", "title": "...", "body": "..." } ]
}
```

### `services-grid`
```json
{
  "id": "servicios",
  "type": "services-grid",
  "sectionLabel": "...",
  "headline": "...",
  "subheadline": "...",
  "columns": 3,
  "categories": [
    {
      "name": "...",
      "icon": "...",
      "services": [
        { "name": "...", "description": "..." }
      ]
    }
  ]
}
```

### `featured-products`
```json
{
  "id": "productos-destacados",
  "type": "featured-products",
  "_note": "Se alimenta automáticamente del Google Sheet filtrando featured=TRUE.",
  "sectionLabel": "...",
  "headline": "...",
  "subheadline": "...",
  "ctaCatalog": { "text": "Ver catálogo completo", "href": "/catalogo" }
}
```
> Este tipo NO tiene `items[]` — los productos vienen del Sheet.

### `steps`
```json
{
  "id": "proceso",
  "type": "steps",
  "sectionLabel": "...",
  "headline": "...",
  "style": "numbered|timeline|horizontal",
  "steps": [ { "number": "01", "title": "...", "body": "..." } ]
}
```

### `testimonials`
```json
{
  "id": "testimonios",
  "type": "testimonials",
  "sectionLabel": "...",
  "headline": "...",
  "style": "carousel|grid|masonry",
  "items": [ { "quote": "...", "author": "...", "role": "...", "avatar": "...", "rating": 5 } ]
}
```

### `faq`
```json
{
  "id": "faq",
  "type": "faq",
  "sectionLabel": "...",
  "headline": "...",
  "schema": true,
  "items": [ { "question": "...", "answer": "..." } ]
}
```
> `schema: true` genera JSON-LD FAQPage para SEO.

### `contact-form`
```json
{
  "id": "contacto",
  "type": "contact-form",
  "sectionLabel": "...",
  "headline": "...",
  "subheadline": "...",
  "destinationEmail": "...",
  "fields": [
    { "id": "nombre", "type": "text", "label": "Tu nombre", "required": true },
    { "id": "email", "type": "email", "label": "Email", "required": true },
    { "id": "telefono", "type": "tel", "label": "Teléfono", "required": true },
    { "id": "servicio", "type": "select", "label": "¿Qué te interesa?", "required": false,
      "options": ["Opción A", "Opción B", "No sé"] },
    { "id": "mensaje", "type": "textarea", "label": "Mensaje", "required": false }
  ],
  "submitLabel": "Enviar",
  "successMessage": "¡Listo! Te contactaremos pronto.",
  "errorMessage": "Hubo un problema. Intenta por WhatsApp.",
  "successAction": "message"
}
```
> `fields[].type`: `text`, `email`, `tel`, `select`, `textarea`, `checkbox`, `date`.
> `successAction`: `message` (mostrar texto) o `redirect` (ir a otra URL).

### `cta-banner`
```json
{
  "id": "cta",
  "type": "cta-banner",
  "headline": "...",
  "subheadline": "...",
  "cta": { "text": "...", "href": "..." }
}
```

### `map-embed`
```json
{
  "id": "ubicacion",
  "type": "map-embed",
  "sectionLabel": "...",
  "headline": "...",
  "address": "...",
  "googleMapsEmbedUrl": "https://www.google.com/maps/embed?pb=...",
  "mapHeight": 400
}
```

### `footer`
```json
{
  "id": "footer",
  "type": "footer",
  "tagline": "...",
  "links": [ { "text": "Política de Privacidad", "href": "/privacidad" } ],
  "social": { "instagram": "...", "facebook": "...", "twitter": "..." },
  "navigation": [
    { "text": "Catálogo", "href": "/catalogo" },
    { "text": "Carrito", "href": "/carrito" }
  ]
}
```
> `links[]` es opcional — para links legales o de navegación extra.
> `navigation[]` — links a otras páginas del sitio.

---

## Tipos Custom

La IA puede crear tipos de sección nuevos si el proyecto lo requiere. La convención es:
- `id` único en kebab-case
- `type` descriptivo
- Documentar con `_note` la intención

---

## Referencia de Íconos Lucide

| Concepto | Icon |
|----------|------|
| Usuarios / Clientes | `users` |
| Tiempo | `clock` |
| Satisfacción | `star` |
| Herramientas | `wrench` |
| Motor | `cog` |
| Velocidad | `zap` |
| Logro | `trophy` |
| Verificado | `check-circle` |
| Ubicación | `map-pin` |
| Teléfono | `phone` |
| Email | `mail` |
| Carrito | `shopping-cart` |
| Pintura | `paint-bucket` |
| Diagnóstico | `scan-line` |
| Frenos | `disc` |
| Auto | `car` |
| Filtros | `filter` |
| Batería | `battery` |
| Luces | `lightbulb` |
| Suspensión | `move-vertical` |

---

## Reglas

- Cada `id` debe coincidir con el `href` de los links del navbar (ej: `#id`) o ser una ruta válida.
- Cada `id` es único, en kebab-case.
- Nunca dejar campos con valor vacío `""` o `null` — si no hay dato, omitir el campo.
- Los iconos deben ser nombres válidos de Lucide React.
- Los `_note` y `_guide` son para documentación — la IA los ignora al construir.
- Los productos NUNCA se hardcodean en el config — vienen del Google Sheet.
- Las categorías se definen en `store.categories[]` y deben coincidir con la columna `category` del Sheet.
- El `contact.whatsapp` es un ARRAY (puede haber múltiples números).
