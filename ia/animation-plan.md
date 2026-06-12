# Plan de Animaciones — Misión M2

Este plan detalla las decisiones de animación automatizadas según el nivel de animación `2` (scroll reveals y transiciones fluidas con Framer Motion) configurado en `site.config.json` para Racing Cars.

## Configuración
- **Nivel de animación**: 2 (Framer Motion Scroll Reveals & Micro-animations)
- **Estrategia**: Usaremos `framer-motion` para los efectos de aparición en scroll (`whileInView`) y micro-interacciones (hovers en tarjetas).

## Animaciones por Sección

| Sección | Elemento | Efecto de Entrada | Stagger | Hover / Interacción |
|---------|----------|-------------------|---------|---------------------|
| **Navbar** | Menú completo | Slide down desde arriba | No | Hover de enlaces: subrayado animado |
| **Hero** | Texto y Logos | Fade In + Scale Up (duración 0.8s) | No | Hover de botones: Scale + Shadow enhancement |
| **Stats** | Cifras y etiquetas | Fade In + Counter increment | No | Hover en stats: glow effect |
| **Services Grid** | Tarjetas de categoría | Fade In + Slide Up (desde y: 40) | Sí (80ms) | Hover: Elevación (translate-y-[-4px]) + shadow-xl |
| **Featured Products** | Tarjetas de producto | Fade In + Slide Up (desde y: 30) | Sí (100ms) | Hover: Scale + Border glow |
| **Steps** | Línea y tarjetas numéricas | Timed reveal vertical + Fade In | Sí (150ms) | Hover: sutil glow de números |
| **Brands Grid** | Logos de marcas | Fade In + Scale Up (desde scale: 0.9) | Sí (50ms) | Hover: Brillo original + Scale (1.05) |
| **FAQ** | Acordeón de preguntas | Fade In + Slide Up | No | Despliegue con suavidad (layout prop de Framer) |
| **CTA Banner** | Contenido del banner | Fade In + Scale Up | No | Botón: Scale + pulse glow |
| **Contact Form** | Formulario y campos | Fade In + Slide Up | No | Inputs: border color transitions |
| **Map Embed** | Mapa interactivo | Fade In (duración 1s) | No | Hover: sutil shadow border |
| **Footer** | Enlaces y firma | Fade In desde abajo | No | Hover enlaces: color change y subrayado |

## Pautas de Código
1. Todas las animaciones se realizarán utilizando `framer-motion`.
2. Para componentes de servidor, envolveremos partes interactivas en componentes cliente pequeños o usaremos `"use client"` solo donde se requiera la interactividad.
3. Se respetará la preferencia del usuario sobre reducción de movimiento (`useReducedMotion` de Framer Motion) para garantizar accesibilidad.
