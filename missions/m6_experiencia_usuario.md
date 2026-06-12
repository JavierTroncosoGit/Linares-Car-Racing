# M6 — Experiencia del Usuario (OPCIONAL)

Deps: M2, M7

## Checkpoint: M6 — Experiencia
- **Lee:** componentes existentes en `src/components/sections/` y `src/components/store/`
- **Modifica:** agrega microinteracciones y funcionalidades de UX avanzadas
- **No crea:** secciones nuevas — solo mejora las existentes

## Checklist

### Buscador Rápido de Servicios

- [ ] Input de búsqueda "¿Qué servicio necesitas?" en la sección de servicios
- [ ] Filtrado en tiempo real mientras el usuario escribe
- [ ] Búsqueda por: nombre de servicio, categoría, palabras clave
- [ ] Highlight del texto que coincide con la búsqueda
- [ ] Si no hay resultados: mensaje amigable con teléfono de contacto principal
- [ ] Animación: las cards que no coinciden se desvanecen

### Buscador de Productos (Catálogo)

- [ ] Input de búsqueda en la página de catálogo
- [ ] Filtrado en tiempo real por: nombre, marca, SKU, descripción
- [ ] Combinable con filtro de categoría
- [ ] Highlight del texto que coincide
- [ ] Si no hay resultados: "No encontramos productos. ¿Buscas algo específico? Contáctanos."

### Botón "Copiar Teléfono/Dato"

- [ ] En cada número de teléfono/dato copiable: botón de copiar al portapapeles
- [ ] Feedback visual: ícono cambia de "copiar" a "check" por 2 segundos
- [ ] Usar `navigator.clipboard.writeText()`
- [ ] Fallback para navegadores sin soporte

### Links WhatsApp Inteligentes

- [ ] Todos los botones de WhatsApp generan link `wa.me/` con mensaje pre-armado
- [ ] El mensaje se personaliza según el contexto:
  - Desde card de servicio: "Hola, quisiera consultar sobre [Servicio]"
  - Desde card de producto: "Hola, quisiera consultar sobre [Producto] (SKU: [SKU])"
  - Desde el botón flotante: "Hola, quisiera información sobre Linares Racing Cars"

### Indicador de Horario

- [ ] Basado en la hora local del dispositivo
- [ ] Badge visible:
  - 🟢 "Atendiendo ahora" (dentro del horario configurado)
  - 🔴 "Cerrado — Abrimos [próximo horario]"
- [ ] Horario configurable desde `site.config.json`

### Scroll-Reveal Avanzado en Cards

- [ ] Stagger animation en grids: las cards aparecen una por una con delay
- [ ] Intersección configurable: las cards se animan al entrar al viewport
- [ ] Variantes de entrada según `animation-plan.md`
- [ ] Performance: usar `will-change` y `transform`

### Modo Oscuro (Toggle)

- [ ] Toggle en el navbar (ícono sol/luna)
- [ ] Guardar preferencia en `localStorage`
- [ ] Respetar `prefers-color-scheme` del sistema como default
- [ ] Mapear tokens de color a versiones dark
- [ ] Transición suave al cambiar (300ms)

### Verificar

- [ ] El buscador de servicios filtra correctamente
- [ ] El buscador de productos filtra por nombre, marca, SKU
- [ ] Copiar funciona en Chrome, Firefox, Safari (desktop y mobile)
- [ ] Los links wa.me/ abren WhatsApp con el mensaje correcto
- [ ] El indicador de horario muestra el estado correcto
- [ ] Las animaciones stagger no causan jank (60fps)
- [ ] El modo oscuro se ve profesional y todos los textos son legibles
- [ ] La preferencia de dark mode persiste entre recargas

## Done

- UX mejorada: buscadores, copiar, WA inteligente, indicador horario, dark mode
- → state.md: M6 🟢
