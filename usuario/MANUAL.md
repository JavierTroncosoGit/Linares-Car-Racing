<!-- IA: NO LEER — Este documento es exclusivamente para el usuario humano. -->

# 📖 MANUAL DEL USUARIO — Mission Control v3.1 (Landing + E-commerce Edition)

> **Todo lo que necesitas saber para crear un sitio web con landing page + catálogo.**
> No necesitas saber programar. Solo seguir estos pasos.

---

## ¿Qué es Mission Control?

Es un sistema que te permite crear sitios web profesionales con landing page y tienda virtual trabajando con una IA (Gemini, Claude, ChatGPT, etc). Tú pones la información del cliente y el material gráfico. La IA se encarga de todo lo técnico: código, diseño, SEO, deploy.

```
TÚ                                    LA IA
───                                    ─────
Describes al cliente                → Genera la estructura técnica
Marcas qué secciones quieres        → Propone diseño y textos
Conectas tu Google Sheet            → Integra el catálogo de productos
Metes fotos, logos, videos           → Los integra al código
Apruebas o pides cambios             → Los aplica
                                     → Despliega la web
```

---

## Tu carpeta: `/usuario`

**Solo tocas lo que está dentro de esta carpeta.** Todo lo demás es de la IA.

```
/usuario
├── CONTEXTO.md      ← Aquí describes todo sobre el cliente
├── REVISIONES.md    ← Aquí anotas cambios después de ver el resultado
├── PROMPT.md        ← Prompts listos para copiar y pegar en la IA
├── EJEMPLO.md       ← Un ejemplo inventado para que veas cómo se llena
├── MANUAL.md        ← Este archivo que estás leyendo
└── /assets          ← Aquí metes fotos, logos, videos, PDFs
```

---

## Paso a Paso: Tu Primer Proyecto

### Paso 1 — Revisar el ejemplo (opcional)

Abre `EJEMPLO.md` para ver un caso completo (un taller automotriz). Te servirá para entender qué tipo de cosas escribir.

### Paso 2 — Llenar CONTEXTO.md

Este es el archivo más importante. Tiene secciones:

| Sección | Qué poner | ¿Obligatorio? |
|---------|-----------|---------------|
| **0. Preset** | Marca la industria → la IA preconfigura colores y estilo | ⚡ Recomendado |
| **1. Sobre el Cliente** | Quién es, a qué se dedica, su público, su tono | ✅ Sí |
| **2. Objetivo y Conversión** | La acción #1, el diferenciador, la oferta | ✅ Sí |
| **3. Estructura de la Landing** | Qué secciones necesita (Hero, Servicios, FAQ, etc.) | ✅ Sí |
| **3b. Catálogo** | URL del Google Sheet, categorías, precios | ⚡ Si tiene tienda |
| **3c. Carrito** | Cómo se cierra la venta, envío | ⚡ Si tiene tienda |
| **4. Diseño** | Colores, fuentes, estilo | ⚡ Opcional (preset cubre) |
| **5. Contenido y Notas** | Textos, servicios, contacto, instrucciones | ⚡ Opcional |

### Paso 3 — Preparar el Google Sheet (si hay catálogo)

1. Crea un Google Sheet con estas columnas:

| sku | name | description | brand | price | category | image_main | featured |
|-----|------|-------------|-------|-------|----------|------------|----------|
| 001 | Producto X | Descripción corta | Marca | 50000 | Categoría | URL imagen | TRUE |

2. **Publicar el Sheet como CSV:**
   - Archivo → Compartir → Publicar en la web
   - Selecciona "Valores separados por comas (.csv)"
   - Copia la URL generada
   - Pégala en CONTEXTO.md §3b

3. Para marcar productos destacados: columna `featured` = `TRUE`

### Paso 4 — Meter material gráfico en /assets

| Nombre | La IA entiende |
|--------|---------------|
| `hero--foto-taller.jpg` | Imagen para el hero |
| `logo.svg` | Logo del cliente |
| `favicon.png` | Favicon del sitio |

### Paso 5 — Copiar un prompt y arrancar

Abre `PROMPT.md` y copia el prompt que necesites:

| Prompt | Cuándo usarlo |
|--------|--------------|
| 🟢 **Iniciar Proyecto Nuevo** | Ya llenaste CONTEXTO.md |
| 🔵 **Continuar Sesión** | Regresas otro día |
| 🟡 **Pedir Cambios** | Anotaste correcciones |
| ⚡ **Prototipo Rápido** | Solo quieres ver el Hero rápido |
| 🔧 **Hotfix** | Un cambio puntual |
| ➕ **Agregar Sección** | El cliente pidió algo nuevo |
| 🛒 **Construir Catálogo** | Para iniciar M7 |
| 🛍️ **Construir Carrito** | Para iniciar M8 |
| 📦 **Agregar Producto** | Para agregar un producto |

---

## Después del primer resultado: Revisiones

1. **Revísalo** en el navegador
2. **Anota** lo que quieras cambiar en `REVISIONES.md`
3. **Copia** el prompt "Pedir Cambios" de `PROMPT.md`
4. **Pégalo** en la IA

---

## Iteración rápida: site.config.json

Cuando la IA termina de construir el sitio, genera `site.config.json` en la raíz del proyecto. **Este archivo es tu panel de control para cambios rápidos.**

**¿Qué puedes editar?** Textos, FAQs, testimonios, links, colores.

**¿Qué NO editar?** La estructura (`{` por `[`), campos `"type"`, campos que no entiendas.

**Cómo aplicar:** Edita → guarda → usa el prompt "Actualizar desde Config".

> **Nota:** El config usa formato `pages{}` con `sections[]` por página, más un bloque `store{}` para el catálogo.

---

## Las Misiones

| # | Misión | Qué hace |
|---|--------|----------|
| M0 | **Assets** | Prepara placeholders de imágenes |
| M1 | **Scaffolding** | Crea el proyecto, instala dependencias |
| M2 | **Landing Page** | Construye todas las secciones de la landing |
| M3 | **Responsive** | Audita que todo se vea perfecto en celular |
| M4 | **Deploy** | SEO, performance, y subida a producción |
| M5 | **Formularios** | Integra envío de emails (contacto + pedidos) |
| M6 | **UX** *(opcional)* | Buscadores, dark mode, microinteracciones |
| M7 | **Catálogo** | Construye la tienda virtual (Google Sheets) |
| M8 | **Carrito** | Construye el carrito de compras + checkout |

---

## Stack tecnológico

- **Next.js 15** (App Router) — Framework
- **Tailwind CSS v4** — Estilos
- **shadcn/ui** — Componentes
- **Framer Motion** — Animaciones
- **Zustand** — Estado del carrito
- **Google Sheets** — Fuente de datos del catálogo
- **Vercel** — Hosting
- **TypeScript** — Lenguaje

---

## Preguntas Frecuentes

**¿Funciona con cualquier IA?** Sí. Gemini, Claude, ChatGPT.

**¿Necesito saber programar?** No. Solo llenar CONTEXTO.md.

**¿Cómo agrego productos?** Editando el Google Sheet. La web se actualiza automáticamente.

**¿Cómo marco productos destacados?** Columna `featured` = `TRUE` en el Sheet.

**¿Puedo agregar secciones después?** Sí. Usa el prompt "Agregar Sección".

**¿Puedo reusar esto?** Sí. Copia la carpeta a un proyecto nuevo.

---

DARW Agency — 2026
