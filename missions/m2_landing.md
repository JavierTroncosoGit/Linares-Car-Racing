# M2 — Landing Page (Secciones)

Deps: M1

## Checkpoint: M2 — Landing
- **Lee:** `site.config.json` (pages.landing.sections[])
- **Crea:** Navbar, Hero, Secciones, Footer, WhatsApp button, Productos Destacados
- **No toca:** lib/config.ts, layout.tsx (excepto para importar componentes), componentes store/

**Fuente de verdad: `site.config.json` para todo el contenido y estructura.**

## Checklist

### Paso 0 — Plan de Animaciones (IA decide autónomamente)

> **La IA decide las animaciones de forma autónoma según el nivel configurado en `site.config.json`.**
> NO hay taller interactivo. La IA elige las mejores animaciones para cada sección.

- [ ] Leer `siteConfig.animations.level` (1, 2 o 3)
- [ ] Generar `ia/animation-plan.md` automáticamente con las decisiones:

**Criterios de decisión:**

| Tipo de sección | Animación recomendada | Stagger | Hover |
|-----------------|----------------------|---------|-------|
| Hero | Fade in + Scale | No | — |
| Stats | Counter animation | No | — |
| Services Grid | Fade in + Slide Up | Sí (80ms) | Elevación |
| Featured Products | Fade in + Slide Up | Sí (100ms) | Elevación + Scale |
| Steps | Timeline reveal | Sí (150ms) | — |
| Testimonials | Fade in | No (carousel) | — |
| FAQ | Fade in | No | — |
| CTA Banner | Fade in + Scale | No | — |
| Contact Form | Fade in + Slide Up | No | — |

- [ ] Guardar las decisiones en `ia/animation-plan.md` y continuar sin esperar aprobación

---

### Navbar
- [ ] Logo (placeholder si no hay) + links de navegación
- [ ] Links internos (#seccion) + links a otras páginas (/catalogo)
- [ ] CTA button (si existe en config)
- [ ] **Ícono de carrito con badge de cantidad** (si `store.cart.enabled`)
- [ ] Sticky/transparent sobre Hero
- [ ] Animación de navbar: transparente → sólido al hacer scroll

#### Menú Sandwich Mobile (OBLIGATORIO)
- [ ] Usar Sheet de shadcn como panel lateral o overlay
- [ ] Cada link de navegación debe ser una **card independiente** con:
  - Padding generoso (mínimo 16px vertical)
  - Texto **centrado** horizontal y verticalmente
  - Fondo con contraste sutil (`bgSecondary` o glassmorphism)
  - Border-radius consistente con el design system
  - Área táctil ≥ 44×44px
- [ ] Texto de cada link **resaltado**: font-weight 600, font-size ≥ 1rem
- [ ] Separación entre cards: gap de 12px
- [ ] Botón CTA diferenciado (color `accent`, full-width)
- [ ] Ícono de carrito visible en mobile con badge
- [ ] Botón de cerrar (X) visible y con área táctil ≥ 44px
- [ ] Animación de entrada: slide desde la derecha + fade del overlay
- [ ] Animación de salida: slide hacia la derecha
- [ ] Al hacer clic en un link → cerrar el menú automáticamente + scroll suave a la sección

### Secciones (Iterar sobre `site.config.json.pages.landing.sections`)
- [ ] Por cada sección en el array → crear componente en `src/components/sections/`
- [ ] Usar el `id` como HTML `id` para permitir navegación por anclas
- [ ] Implementar diseño según `ia/stack.md` (Layout Base de 1200px)
- [ ] **Aplicar animaciones según `ia/animation-plan.md`** (Framer Motion)

### Tipos de sección a implementar
- [ ] **hero**: Headline (H1), Subheadline, CTAs, Imagen/Video de fondo
- [ ] **stats**: Barra de números/logros con counter animation
- [ ] **services-grid**: Servicios agrupados por categoría con íconos
- [ ] **featured-products**: Productos destacados del mes (datos del Google Sheet, filtro featured=TRUE)
- [ ] **steps**: Proceso paso a paso (cómo funciona)
- [ ] **testimonials**: Lo que dicen los clientes (carousel o grid)
- [ ] **faq**: Accordion de shadcn con preguntas frecuentes
- [ ] **cta-banner**: Banner de llamada a la acción
- [ ] **contact-form**: Formulario de contacto básico
- [ ] **map-embed**: Google Maps embebido (si hay dirección)
- [ ] **footer**: Tagline, contacto, redes sociales, links a páginas, copyright
  - **OBLIGATORIO**: Incluir firma de agencia → "Hecho por [Darw](https://www.darw.cl/)" al final del footer
  - La palabra "Darw" debe ser un link clickeable a `https://www.darw.cl/`
  - Estilo sutil: texto `textMuted`, font-size small, hover con color `primary`

### WhatsApp Floating Button
- [ ] Si `siteConfig.contact.whatsapp` existe → botón flotante en la esquina inferior derecha
- [ ] Usar `env(safe-area-inset-bottom)` para compatibilidad con iPhone
- [ ] Animación de entrada: bounce suave al cargar la página

### Verificar
- [ ] La navegación por anclas desde el Navbar funciona
- [ ] Los links a /catalogo y /carrito funcionan
- [ ] Los textos coinciden exactamente con el config
- [ ] Las animaciones del `animation-plan.md` están implementadas correctamente
- [ ] Las imágenes usan placeholders de `placeholders.ts` (M0)
- [ ] Las imágenes cargan correctamente (usar `next/image`)
- [ ] Los productos destacados se cargan desde el Google Sheet
- [ ] El ícono de carrito muestra el badge de cantidad correctamente

## Done

- Todas las secciones construidas, animaciones auto-decididas e implementadas, navegación funcional, WhatsApp integrado, productos destacados funcionando
- → state.md: M2 🟢, M3 🟡
