# Los 10 Mandamientos del Responsive

> Spec de auditoría — leer completo antes de ejecutar M6 o cualquier revisión responsive.
> Aplica para el stack: Next.js 15 + Tailwind v4 + shadcn/ui.

---

## Cómo usar este archivo

La IA ejecuta este archivo como checklist de auditoría en dos momentos:

1. **M6** — Auditoría post-construcción antes del deploy
2. **Modo HOTFIX responsive** — Cuando el humano reporta problema visual en mobile

Por cada mandamiento: verificar en el código → corregir si falla → confirmar.

---

## I. Mobile-First por defecto, no como excusa

**La ley:** El CSS base (sin prefijo) es para 375px. Las clases `sm:`, `md:`, `lg:` **expanden** hacia arriba.
Nunca al revés.

**✅ Correcto:**

```tsx
<div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
```

**❌ Incorrecto:**

```tsx
<div className="flex flex-row gap-8 sm:flex-col">
// Estás deshaciendo desktop → esto es desktop-first
```

**Checklist:**

- [ ] Revisar todos los componentes de secciones: ¿la clase base (sin prefijo) es el estado mobile?
- [ ] Verificar que no hay `sm:` que deshaga una clase base

---

## II. Ningún elemento causará scroll horizontal

**La ley:** `overflow-x: hidden` en el body es una mentira que esconde el problema. Prohibido.
Todo elemento debe caber dentro del viewport sin overflow horizontal.

**Causas comunes:**

- Imágenes sin `max-w-full`
- Texto con `whitespace-nowrap` sin `overflow-hidden`
- Grids con columnas de ancho fijo en mobile
- Elementos con `width: 100vw` que ignoran el scrollbar

**Verificación:**

```css
/* NUNCA agregar esto como fix — es una mentira */
body { overflow-x: hidden; }
```

**Checklist:**

- [ ] Reducir viewport a 375px en DevTools → no debe aparecer scrollbar horizontal
- [ ] Verificar que ningún componente usa `overflow-x: hidden` para "arreglar" el problema
- [ ] Buscar en el código: `w-screen` → probablemente causa overflow en mobile

---

## III. Los botones y links se tocan con el pulgar

**La ley:** Cualquier elemento interactivo (botón, link, ícono clickable) tiene mínimo **44×44px de área táctil**.
Si el elemento visualmente es más pequeño, usar padding para agrandar el área.

**✅ Correcto:**

```tsx
<button className="p-3 min-h-[44px] min-w-[44px]">
  <Icon size={20} />
</button>
```

**❌ Incorrecto:**

```tsx
<button>
  <Icon size={16} /> // Área táctil de 16px — imposible en mobile
</button>
```

**Checklist:**

- [ ] Botón de WhatsApp flotante: ¿tiene al menos 44×44px?
- [ ] Links del navbar mobile: ¿son fáciles de tocar?
- [ ] Íconos de redes sociales en footer: ¿tienen padding suficiente?
- [ ] Flecha de carousel: ¿su área táctil es mínimo 44px?

---

## IV. Los formularios no hacen zoom automático en iOS

**La ley:** Si un `<input>` tiene `font-size` menor a **16px**, iOS hace zoom automático al tocarlo.
Es una de las experiencias más frustrantes en mobile. Es imperdonable.

**Fix universal:**

```tsx
// En todos los inputs, textareas y selects:
<Input className="text-base" />          // text-base = 16px en Tailwind
<Textarea className="text-base" />
<Select>...</Select>                     // shadcn Select ya tiene text-sm en algunos temas → verificar
```

**globals.css fix de seguridad:**

```css
input, textarea, select {
  font-size: max(16px, 1rem);
}
```

**Checklist:**

- [ ] Abrir el formulario en iPhone (o emulador iOS en Chrome)
- [ ] Tocar cada campo → ¿la página hace zoom? Si sí → agregar `text-base` al input

---

## V. Las imágenes son siempre responsivas y nunca se estiran

**La ley:**

- Usar siempre `next/image`, nunca `<img>`
- Siempre definir `sizes` prop según el layout real
- La imagen del hero tiene `priority` (es el LCP)
- Ninguna imagen se deforma: `object-fit: cover` siempre

**Patrones por layout:**

```tsx
// Hero (full width)
<Image
  src={data.media.src}
  alt={data.media.alt}
  fill
  priority
  className="object-cover"
  sizes="100vw"
/>

// Grid de 3 columnas en desktop, 1 en mobile
<Image
  src={item.src}
  alt={item.alt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Logo
<Image
  src={data.logo.src}
  alt={data.logo.alt}
  width={data.logo.width}
  height={data.logo.height}
  className="h-auto"          // ← crítico para que no se deforme
/>
```

**Checklist:**

- [ ] ¿Algún `<img>` sin `next/image`? → reemplazar
- [ ] ¿El hero tiene `priority` flag? → es el LCP, afecta Core Web Vitals
- [ ] ¿Todas las imágenes tienen `alt` descriptivo?
- [ ] ¿Las imágenes de avatares (testimonios) no se deforman en mobile?

---

## VI. La tipografía fluye, no se corta

**La ley:** Los títulos principales (`h1`, `h2`) usan `clamp()` para escalar fluidamente entre viewports.
Nunca un titular que se vea enorme en desktop y diminuto en mobile o viceversa.

**Implementación en Tailwind v4 (globals.css):**

```css
@theme {
  --font-size-hero:    clamp(2.25rem, 5vw, 4.5rem);   /* h1 → 36px mobile, 72px desktop */
  --font-size-display: clamp(1.875rem, 3.5vw, 3rem);  /* h2 → 30px mobile, 48px desktop */
  --font-size-xl:      clamp(1.125rem, 1.5vw, 1.5rem); /* texto grande */
}
```

**Verificar también:**

- Títulos no se parten en palabras sueltas en mobile (ej: "Pro-" / "fesional")
- Párrafos largos tienen `max-w-prose` o un ancho máximo para no ser ilegibles en ultrawide
- Nunca usar `text-6xl` sin prefijo responsive

**Checklist:**

- [ ] H1 del hero: ¿se ve bien en 375px Y en 1440px?
- [ ] H2 de secciones: ¿escalan bien?
- [ ] Ningún texto se sale del contenedor en mobile

---

## VII. Los grids colapsan bien y en el orden correcto

**La ley:** Todo grid multicolumna tiene una versión de 1 columna para mobile.
El orden visual en mobile debe tener sentido narrativo.

**Patrones:**

```tsx
// Beneficios: 1col → 2col → 3col
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Split hero (texto + imagen): stack en mobile, lado a lado en desktop
<div className="flex flex-col-reverse lg:flex-row gap-8">
// flex-col-reverse → imagen arriba en mobile (más impacto visual)

// Stats: 2col en mobile, 4col en desktop
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
```

**Checklist:**

- [ ] Grid de beneficios/servicios: ¿1 columna en 375px?
- [ ] Hero split: ¿la imagen aparece arriba en mobile? (más atractivo visualmente)
- [ ] Stats bar: ¿2 columnas en mobile? (nunca 4 en una pantalla pequeña)
- [ ] Cards de testimonios en grid: ¿1 columna en mobile?
- [ ] Pricing cards: ¿1 columna en mobile?

---

## VIII. El navbar mobile es usable, no decorativo

**La ley:** En mobile, el navbar tiene hamburguesa → abre Sheet → links grandes y táctiles.
El Sheet se cierra al tocar un link o fuera del panel.

**Implementación con shadcn:**

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="lg:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Abrir menú</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="right">
    <nav className="flex flex-col gap-6 mt-8">
      {data.links.map(link => (
        <SheetClose asChild key={link.href}>
          <a
            href={link.href}
            className="text-xl font-medium py-2"
            onClick={() => lenisScrollTo(link.href)}
          >
            {link.text}
          </a>
        </SheetClose>
      ))}
    </nav>
  </SheetContent>
</Sheet>
```

**Checklist:**

- [ ] ¿El botón hamburguesa aparece SOLO en mobile (`lg:hidden`)?
- [ ] ¿El menú desktop aparece SOLO en desktop (`hidden lg:flex`)?
- [ ] ¿Los links del Sheet tienen `SheetClose` para cerrar al tocar?
- [ ] ¿El área del botón es mínimo 44×44px?
- [ ] ¿El CTA del navbar es visible en mobile? (puede ser solo ícono de WhatsApp)

---

## IX. Los espacios y paddings se adaptan al viewport

**La ley:** El espaciado entre secciones y dentro de componentes NO es el mismo en mobile y desktop.
Usar siempre valores responsive para `padding` y `margin` de secciones.

**Escala estándar de secciones:**

```tsx
// Patrón base — fondo full width, contenido a 1200px
<section className="w-full bg-bg-secondary py-12 lg:py-20">
  <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
    {/* contenido */}
  </div>
</section>

// Gap en grids
<div className="grid gap-4 lg:gap-8">

// Stack interno de componente
<div className="space-y-4 lg:space-y-6">
```

**Checklist:**

- [ ] Todas las secciones tienen `py-12 lg:py-20` o equivalente
- [ ] **Todo el contenido está envuelto en `max-w-[1200px] mx-auto`** — nunca llega al borde en pantallas grandes
- [ ] Los fondos de sección (colores, imágenes) son `w-full` — no se cortan
- [ ] Hay padding lateral en mobile (mínimo `px-4`) → ningún texto llega al borde de la pantalla
- [ ] Los gaps entre cards no son excesivos en mobile
- [ ] El hero: visual full-width, texto dentro del contenedor 1200px

---

## X. Verificar en dispositivos reales, no solo en DevTools

**La ley:** DevTools es necesario pero no suficiente. Antes del deploy:

**Viewports críticos a verificar:**

| Dispositivo | Viewport | Prioridad |
|-------------|----------|-----------|
| iPhone SE / Android pequeño | 375px | 🔴 Crítico |
| iPhone 14 / Pixel 7 | 390-393px | 🔴 Crítico |
| iPhone Plus / Android grande | 428-430px | 🟡 Importante |
| iPad mini | 768px | 🟡 Importante |
| iPad Air/Pro | 820-1024px | 🟡 Importante |
| Laptop 13" | 1280px | 🟢 Verificar |
| Desktop 16" | 1440px | 🟢 Verificar |

**Checklist final antes del deploy:**

- [ ] 375px: ¿todo cabe? ¿no hay scroll horizontal? ¿los botones son táctiles?
- [ ] 390px: ¿el hero se ve bien? ¿el navbar funciona?
- [ ] 768px: ¿el layout intermedio se ve bien o hay elementos "a mitad de camino"?
- [ ] 1280px: ¿el layout desktop se ve completo y bien proporcionado?
- [ ] Abrir en celular físico si es posible — Chrome DevTools no escala el font rendering igual

---

## Apéndice — Safe Area Insets (iPhone con Home Indicator)

iPhones desde el iPhone X (2017) en adelante no tienen botón de inicio físico.
En su lugar tienen una barra táctil en la parte inferior de la pantalla.
Cualquier elemento con `position: fixed` en la parte inferior de la pantalla
queda tapado por esa barra si no se compensa.

**El más afectado: el botón flotante de WhatsApp.**

**Sin fix** — el botón queda detrás de la barra de inicio del iPhone:

```tsx
<div className="fixed bottom-6 right-6 z-50">
  <WhatsAppButton />
</div>
```

**Con fix** — usando `env(safe-area-inset-bottom)`:

```tsx
// En el componente WhatsAppButton o su wrapper:
<div
  className="fixed right-6 z-50"
  style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
>
  <WhatsAppButton />
</div>
```

**Activar el soporte en el HTML** — sin esto, `env()` devuelve 0 en todos los iPhones:

```tsx
// En src/app/layout.tsx, dentro del <head>:
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
//                                                                    ↑ CRÍTICO
```

`viewport-fit=cover` le dice al browser que el contenido puede extenderse
detrás del notch y la barra de inicio. Sin él, `env(safe-area-inset-bottom)`
siempre vale 0 y el fix no funciona.

**Qué más puede verse afectado:**

- Navbar sticky con posición en la parte inferior (bottom nav)
- Banners de cookies fijos
- Cualquier `fixed bottom-*` que sea interactivo

**Checklist:**

- [ ] `layout.tsx` tiene `viewport-fit=cover` en el meta viewport
- [ ] WhatsApp button usa `env(safe-area-inset-bottom)` en su `bottom`
- [ ] Verificar en simulador iOS (Chrome DevTools → iPhone 14 Pro) que el botón no queda tapado

---

## Comandos de auditoría rápida

Cuando la IA ejecuta M6 o un HOTFIX responsive, corre mentalmente este protocolo:

```
1. Abrir cada componente en src/components/sections/
2. Por cada Mandamiento (I a IX): verificar en el código
3. Listar todos los fallos encontrados
4. Corregir uno por uno
5. Reportar al humano: qué se encontró + qué se corrigió
```

Si el humano reporta un problema específico:

```
- "en mobile se ve mal el hero" → Mandamentos I, VI, VII
- "el botón del navbar no funciona" → Mandamiento VIII
- "los textos se salen de la pantalla" → Mandamento II, VI
- "el formulario hace zoom en iPhone" → Mandamento IV
- "las fotos se ven pixeladas" → Mandamento V
- "el menú está muy junto" → Mandamento III, IX
```

---

<!--
PARA LA IA:
- Este archivo es la fuente de verdad para auditorías responsive
- M6 lo lee COMPLETO antes de ejecutar
- En modo HOTFIX: identificar el mandamiento infringido y corregirlo
- Nunca usar overflow-x: hidden como fix
- Nunca dejar inputs con font-size < 16px
-->

