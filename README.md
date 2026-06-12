# 🗂️ Mission Control v3.1 — Landing + E-commerce Edition

> Sistema para crear sitios web con landing page + catálogo e-commerce con Next.js 15 y Tailwind v4.
> Optimizado para conversión, velocidad, SEO y ventas online.

---

## Cómo Funciona

```text
TÚ (10 min)                         IA (automático)

1. Marca un preset de industria       1. Valida que hay info suficiente
2. Describe el proyecto               2. Genera brief, design, copy
3. Marca qué secciones quieres        3. Propone plan en site.config.json
4. Conecta tu Google Sheet            4. Tú apruebas el plan
5. Copia el prompt                    5. Ejecuta misiones → código
6. Pega en tu IA                      6. Landing + Catálogo + Carrito
```

## Estructura

```text
/.mission_control
├── 🧠 ROUTER.md              ← La IA lee esto primero
│
├── 👤 /usuario                ← TU CARPETA (solo tú tocas aquí)
│   ├── MANUAL.md              ← 📖 Manual completo del sistema
│   ├── CONTEXTO.md            ← Describe el proyecto
│   ├── REVISIONES.md          ← Anota correcciones
│   ├── PROMPT.md              ← Prompts listos para copiar
│   └── /assets                ← Logos, fotos, videos del proyecto
│
├── 🤖 /ia                     ← Generado por la IA (no toques)
│   ├── stack.md               ← Next.js + Tailwind v4 + shadcn
│   ├── config-schema.md       ← Spec para site.config.json (pages{} + store{})
│   ├── design.md              ← Colores, fuentes, tokens
│   └── responsive-mandamientos.md ← Reglas responsive
│
└── 📋 /missions               ← Tareas paso a paso
    ├── m0_assets              → Preparación de imágenes y placeholders
    ├── m1_scaffolding         → Setup Next.js + Layout base
    ├── m2_landing             → Construcción de la landing page
    ├── m3_responsive          → Auditoría mobile-first
    ├── m4_optimization        → SEO, performance, deploy
    ├── m5_forms               → Formularios + contacto + checkout
    ├── m6_experiencia_usuario → UX avanzada (opcional)
    ├── m7_catalogo            → Catálogo e-commerce (Google Sheets)
    └── m8_carrito             → Carrito de compras + pedidos
```

## Stack

| Pilar | Tecnología |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui |
| Animations | Framer Motion + Lenis |
| State (Cart) | Zustand |
| Data Source | Google Sheets (CSV/JSON) |
| Deploy | Vercel |

## Diferencias vs v3.0 (Landing Page Edition)

| Feature | v3.0 | v3.1 |
|---------|------|------|
| Páginas | Single-page (`sections[]`) | Multi-page (`pages{}`) |
| Catálogo | ❌ | ✅ Google Sheets → Product Grid |
| Carrito | ❌ | ✅ Zustand + localStorage |
| Pedidos | Solo formulario | WhatsApp + Formulario |
| Productos destacados | ❌ | ✅ Flag TRUE/FALSE en Sheets |
| Detalle de producto | ❌ | ✅ Página dinámica `/catalogo/[slug]` |
| Animaciones M2 | Taller interactivo | IA decide autónomamente |

---

Mission Control Template v3.1 — DARW Agency 2026
