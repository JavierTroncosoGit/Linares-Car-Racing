# M5 — Formularios + Contacto + Checkout

Deps: M2, M8

## Checkpoint: M5 — Formularios
- **Crea:** Server Actions para envío de email (contacto + pedidos), lógica de checkout
- **Modifica:** componente de contacto y CheckoutForm para manejar envío real

## Checklist

### Formulario de Contacto (Landing — Client Component)

- [ ] `react-hook-form` + `zod` para validación
- [ ] Campos del formulario:
  - Nombre completo (requerido)
  - Teléfono (requerido)
  - Email (opcional)
  - Selector de servicio/motivo de consulta (dropdown dinámico desde config)
  - Mensaje (textarea)
- [ ] Manejo de estados: Cargando, Éxito, Error
- [ ] Feedback visual al usuario (Toast o mensaje en pantalla)

### Formulario de Checkout (Carrito — Client Component)

- [ ] `react-hook-form` + `zod` para validación
- [ ] Campos del formulario:
  - Nombre completo (requerido)
  - Teléfono (requerido)
  - Email (opcional)
  - Notas adicionales (textarea, opcional)
- [ ] Resumen del pedido visible junto al formulario:
  - Lista de productos con cantidad y precio
  - Total del pedido
- [ ] Al enviar:
  - Si `orderMethod === "whatsapp"` o `"both"` → generar link wa.me/ con resumen
  - Si `orderMethod === "form"` o `"both"` → enviar por Server Action
- [ ] Manejo de estados: Cargando, Éxito, Error
- [ ] Al completar el pedido → vaciar el carrito

### Links WhatsApp Pre-armados

- [ ] Generar links `wa.me/` con mensaje pre-armado:
  - **Contacto general:** `Hola, quisiera información sobre [servicio] en Linares Racing Cars.`
  - **Pedido:** Incluye lista de productos, cantidades, precios y total
- [ ] Botón visual con ícono de WhatsApp + texto descriptivo
- [ ] Usar el primer número de WhatsApp del config para contacto
- [ ] Usar `store.cart.whatsappOrderNumber` para pedidos

### Envío de Datos (Server Actions)

- [ ] Configurar API key de Resend (o similar) en `.env.local`
- [ ] Crear Server Action en `src/lib/actions/contact.ts` para formulario de contacto
- [ ] Crear Server Action en `src/lib/actions/order.ts` para formulario de pedido
- [ ] Formatear el email de contacto con:
  - Nombre del contacto
  - Teléfono
  - Servicio solicitado
  - Mensaje
  - Fecha y hora del envío
- [ ] Formatear el email de pedido con:
  - Datos del comprador (nombre, teléfono, email)
  - Lista de productos (SKU, nombre, cantidad, precio unitario, subtotal)
  - Total del pedido
  - Notas adicionales
  - Fecha y hora del pedido
- [ ] Email con formato profesional (HTML template)

### Verificar

- [ ] El formulario de contacto valida campos requeridos
- [ ] El formulario de checkout valida campos requeridos
- [ ] El resumen del pedido muestra los productos correctos
- [ ] Los links wa.me/ abren WhatsApp con el mensaje correcto
- [ ] El email de contacto llega correctamente
- [ ] El email de pedido llega con todos los datos del pedido
- [ ] Al completar pedido → carrito se vacía
- [ ] No hay fugas de API keys en el frontend

## Done

- Formularios de contacto y checkout funcionales, WhatsApp con resumen de pedido, emails formateados
- → state.md: M5 🟢
