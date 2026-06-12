# M8 — Carrito de Compras + Pedidos

Deps: M1, M7

## Checkpoint: M8 — Carrito
- **Lee:** `site.config.json` (store.cart, store.shipping, contact)
- **Crea:** CartSidebar, CartItem, CartSummary, página /carrito, checkout flow
- **Modifica:** Navbar (badge carrito), ProductCard (botón agregar)

## Checklist

### Zustand Cart Store (`src/lib/store.ts`)

- [ ] Verificar que el store de M1 funciona correctamente
- [ ] Acciones del store:
  - `addItem(product)` — agregar producto (si ya existe, incrementar cantidad)
  - `removeItem(sku)` — eliminar producto del carrito
  - `updateQuantity(sku, quantity)` — cambiar cantidad (si 0, eliminar)
  - `clearCart()` — vaciar carrito completo
  - Getters: `totalItems()`, `totalPrice()`
- [ ] Persistencia en localStorage:
  - Usar middleware `persist` de Zustand
  - Key: `linares-cart`
  - Al cargar la página, el carrito se restaura del localStorage
- [ ] Hidratación correcta (evitar mismatch SSR/client)

### Cart Sidebar / Drawer (`CartSidebar.tsx`)

- [ ] Client Component con Drawer de shadcn
- [ ] Se abre automáticamente al agregar un producto
- [ ] Se puede abrir manualmente desde el ícono del carrito en el navbar
- [ ] Contenido:
  - **Header**: "Tu Carrito" + botón cerrar
  - **Lista de items**: Cada item con CartItem component
  - **Footer fijo**: Total + botón "Ver carrito completo" → `/carrito`
- [ ] Si carrito vacío: mensaje "Tu carrito está vacío" + link "Explorar catálogo"
- [ ] Slide desde la derecha, overlay semitransparente

### Cart Item (`CartItem.tsx`)

- [ ] Client Component
- [ ] Elementos:
  - Imagen miniatura del producto
  - Nombre del producto (truncado si largo)
  - Precio unitario formateado en CLP
  - Controles de cantidad: botón `-` / número / botón `+`
  - Subtotal (precio × cantidad)
  - Botón eliminar (ícono trash con confirmación visual)
- [ ] Al cambiar cantidad → actualizar store → actualizar total
- [ ] Cantidad mínima: 1 (si se reduce a 0, eliminar con confirmación)

### Badge del Carrito (Navbar)

- [ ] Ícono de `shopping-cart` de Lucide
- [ ] Badge numérico con `totalItems()` del store
- [ ] Animación bounce al agregar un producto
- [ ] Si carrito vacío: no mostrar badge (o mostrar sin número)
- [ ] Click → abrir CartSidebar

### Página del Carrito (`/carrito`)

- [ ] Layout de dos columnas en desktop:
  - **Izquierda (60%)**: Lista de productos con CartItem components
  - **Derecha (40%)**: Resumen + formulario de checkout
- [ ] En mobile: una sola columna (productos arriba, checkout abajo)
- [ ] **Header**: "Tu Carrito" + link "← Seguir comprando"

### Cart Summary (`CartSummary.tsx`)

- [ ] Resumen del pedido:
  - Cantidad total de productos
  - Subtotal
  - Total (en esta versión = subtotal, no hay costos de envío)
- [ ] **Botón "Confirmar por WhatsApp"**:
  - Genera link wa.me/ con lista de productos, cantidades, precios y total
  - Usa `store.cart.whatsappOrderNumber` para el número
  - Usa `store.cart.whatsappOrderMessage` como template del mensaje
  - Abre WhatsApp en nueva pestaña
- [ ] **Botón "Enviar pedido por formulario"**:
  - Abre/expande el formulario de checkout
- [ ] Botón "Vaciar carrito" con confirmación

### Feedback al Agregar

- [ ] Al tocar "Agregar al carrito" en ProductCard o ProductDetail:
  1. Producto se agrega al store
  2. Badge del navbar se actualiza con animación bounce
  3. CartSidebar se abre mostrando el producto agregado
  4. Toast opcional: "✓ [Nombre] agregado al carrito"
- [ ] Si el producto ya está en el carrito → incrementar cantidad + mostrar toast "Cantidad actualizada"

### Carrito Vacío

- [ ] Pantalla centrada con:
  - Ícono grande de carrito vacío
  - Texto: "Tu carrito está vacío"
  - Botón CTA: "Explorar catálogo" → `/catalogo`
- [ ] Aplica tanto en `/carrito` como en CartSidebar

### Verificar

- [ ] Agregar productos funciona desde ProductCard y ProductDetail
- [ ] La cantidad se incrementa si el producto ya está en el carrito
- [ ] Los controles +/- funcionan correctamente
- [ ] Eliminar producto funciona con feedback visual
- [ ] El total se calcula correctamente
- [ ] El carrito persiste al recargar la página (localStorage)
- [ ] El badge del navbar se actualiza en tiempo real
- [ ] El CartSidebar se abre al agregar
- [ ] El link de WhatsApp genera el mensaje correcto con todos los productos
- [ ] El carrito vacío muestra el estado correcto
- [ ] Vaciar carrito funciona con confirmación
- [ ] En mobile: todo usable con el pulgar (touch targets ≥ 44px)
- [ ] Sin errores de hidratación SSR/Client

## Done

- Carrito completo: agregar/quitar/cantidad, sidebar, badge, persistencia, checkout WhatsApp + formulario
- → state.md: M8 🟢
