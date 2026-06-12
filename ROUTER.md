# ROUTER — Entrada IA

Lee este archivo primero en cada sesión. Template v3.1.0 (Landing + E-commerce Edition).

## Modos

| Modo | Qué hacer |
|------|-----------|
| FULL | Flujo M0→M8 completo |
| HOTFIX | state.md → cambio puntual |
| AGREGAR_SECCIÓN | Agregar sección a una página + actualizar site.config.json |
| REVISIONES | usuario/REVISIONES.md → aplicar cambios |
| ACTUALIZAR_CONFIG | Leer cambios en site.config.json → actualizar solo los componentes afectados |
| ECOMMERCE | Cambios específicos del catálogo/carrito/productos |

Default: FULL.

---

## Manifest de Archivos por Modo

> **Lee SOLO lo que necesitas.** Esto ahorra tokens y evita confusión.

| Modo | Leer | NO leer |
|------|------|---------| 
| FULL (nuevo) | CONTEXTO → stack → config-schema | responsive-mandamientos |
| FULL (M3) | responsive-mandamientos → componentes existentes | CONTEXTO, config-schema |
| FULL (M4) | site.config.json → componentes → stack (performance) | CONTEXTO, misiones previas |
| FULL (M7-M8) | site.config.json (store{}) → stack → componentes | CONTEXTO, misiones previas |
| HOTFIX | state → archivo(s) afectado(s) | todo lo demás |
| REVISIONES | REVISIONES → state → componentes afectados | CONTEXTO, misiones |
| ACTUALIZAR_CONFIG | site.config.json → componentes afectados | CONTEXTO, misiones |
| ECOMMERCE | site.config.json (store{}) → componentes store/ | misiones landing |

---

## Principio Central

> La IA diseña y decide primero. El código viene después.

El flujo es **"IA lee el contexto → IA propone (config) → humano aprueba → IA construye"**.

`site.config.json` es el **panel de control** del proyecto: brand, colores, fuentes, SEO, store (catálogo/carrito), y las secciones de cada página.

> **Formato del config:** Este es un sistema multi-página con landing + e-commerce. El config usa `pages{}` con `sections[]` por página, y un bloque `store{}` para la configuración del catálogo y carrito. Ver `ia/config-schema.md` para la spec.

---

## Flujo de Lectura (FULL)

1. `usuario/CONTEXTO.md` — §0 (preset) tiene prioridad sobre §4 si ambos existen
2. `ia/contexto-procesado.md` → si no existe o hash cambió → REGENERAR
3. `usuario/REVISIONES.md` si hay pendientes → aplicar primero
4. `ia/stack.md` — stack, patrones UI, componentes
5. `ia/state.md` → misión activa

### Si es proyecto nuevo (M0 no iniciada)

1. Generar `ia/brief.md` desde contexto-procesado
2. Generar `ia/design.md` desde contexto-procesado (colores, fuentes)
3. Generar `ia/copy.md` desde contexto-procesado (textos de UI)
4. **Generar `site.config.json`** en la raíz del proyecto:
   - Leer `ia/config-schema.md` para la spec de construcción
   - Construir `pages{}` con las secciones de cada página (landing + catálogo)
   - Construir `store{}` con la config del catálogo, carrito y Google Sheets
   - Incluir configuración estática: colores, fuentes, SEO, brand, contact
5. **PAUSA** → Mostrar al humano:
    - Las páginas y secciones propuestas
    - Los colores y fuentes elegidos
    - La configuración del catálogo y carrito
    - "¿Apruebas este plan antes de empezar el código?"
6. Tras aprobación → `missions/m0_assets.md`

### Si hay misión activa (proyecto en curso)

1. Leer `site.config.json` (ya existe y fue aprobado)
2. `missions/m[N]` → ejecutar la misión activa
   - Si `m[N]` es M3 → leer `ia/responsive-mandamientos.md` ANTES de ejecutar
   - Si `m[N]` es M7 o M8 → leer `store{}` del config ANTES de ejecutar

---

## Validación Mínima (antes de generar /ia/)

| Requisito | Sección | Acción si falta |
|-----------|---------|-----------------|
| Descripción del proyecto ≥30 palabras | §1 | ❌ Preguntar |
| Acción #1 del visitante | §2 | ❌ Preguntar |
| Diferenciador | §2 | ⚠️ Preguntar, continuar |
| ≥1 sección marcada en §3 | §3 | ⚠️ Si vacío, IA propone |
| URL de Google Sheet (si hay catálogo) | §3b | ⚠️ Si vacío, crear estructura sin datos |
| ≥1 producto o categoría | §3b | ⚠️ Si vacío, IA propone estructura |

❌ = Bloquear. ⚠️ = Proponer y confirmar.

---

## Protocolo de Checkpoint (aplica a TODAS las misiones)

Antes de ejecutar cualquier misión, la IA debe:

1. **Anunciar** qué va a hacer:
   ```
   🟡 CHECKPOINT MISIÓN [N]
   - Misión: M[N] — [nombre]
   - Estado anterior: [lo que dice state.md]
   - Archivos que voy a crear/modificar: [...]
   - Archivos que NO debo tocar: [...]
   - Al terminar: actualizo state.md y anuncio que la misión está completa
   ```
2. **Actualizar** `ia/state.md`: misión → 🔵 WIP
3. **Al completar**: misión → 🟢, desbloquear siguiente

---

## Protocolo de Persistencia

### Regla de Sesiones Cortas

**1 sesión = 1 misión.** Al completar una misión, la sesión termina.
La siguiente misión abre una nueva conversación con el prompt "Continuar Sesión".

### Señales de Deriva

Si la IA hace alguna de estas cosas → usar el prompt "🆘 Reencuadrar IA":

- Empieza a generar código sin haber anunciado el Checkpoint
- No actualiza state.md al terminar una misión
- Omite la pausa de aprobación del config
- Inventa secciones no aprobadas
- Edita archivos que no mencionó en el Checkpoint
- Inventa productos o precios que no están en el Google Sheet

---

## Fin de Sesión

1. Actualizar `state.md` (estado, resumen 1-3 líneas, próximos pasos)
2. Misión completada → desbloquear siguiente
3. Revisiones aplicadas → marcar ✅ en `REVISIONES.md`
4. **Anunciar al humano:** "Sesión completa. Para continuar: abre nueva conversación y usa el prompt 'Continuar Sesión'."

---

## Reglas

- NUNCA inventar info → preguntar
- NUNCA cambiar stack → stack.md es LEY
- NUNCA generar copy sin contexto-procesado.md
- NUNCA releer CONTEXTO.md después de generar contexto-procesado.md
- NUNCA inventar productos o precios → vienen del Google Sheet
- SIEMPRE usar contexto-procesado.md como fuente para brief/design/copy
- SIEMPRE generar site.config.json con decisiones reales, no placeholders
- SIEMPRE pausar y mostrar el plan al humano antes de arrancar código
- SIEMPRE registrar en state.md
- SIEMPRE revisar REVISIONES.md al inicio
- SIEMPRE una misión a la vez (modo FULL)
- SIEMPRE usar `pages{}` con `sections[]` por página (v3.1)
- SIEMPRE usar `store{}` para configuración de catálogo y carrito
