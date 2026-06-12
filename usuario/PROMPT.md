# 🚀 PROMPTS — Copia y Pega

> **Copia el prompt que necesites y pégalo en tu IA.**

---

## 🟢 Iniciar Proyecto Nuevo

*Usa después de completar CONTEXTO.md.*

```
Lee el archivo .mission_control/ROUTER.md para entender el sistema.
Luego lee .mission_control/usuario/CONTEXTO.md con la información del cliente.
Sigue el flujo del ROUTER.md:
1. Genera /ia/brief.md, /ia/design.md y /ia/copy.md
2. Genera site.config.json con formato pages{} + store{} (v3.1)
3. Muéstrame el plan propuesto (páginas, secciones, colores, fuentes, catálogo) para que lo apruebe
NO empieces a generar código hasta que yo apruebe el plan.
```

---

## 🔵 Continuar Sesión

```
Lee .mission_control/ROUTER.md y luego .mission_control/ia/state.md
para saber dónde quedamos. Identifica la misión activa y continúa
desde donde se quedó la última sesión.
```

---

## 🟡 Pedir Cambios

```
Lee .mission_control/usuario/REVISIONES.md donde anoté los cambios que quiero.
Aplica las correcciones en el código y actualiza state.md cuando termines.
```

---

## ⚡ Prototipo Rápido

*Para ver el Hero y Navbar funcionando rápido.*

```
Lee .mission_control/ROUTER.md y opera en MODO FULL pero prioriza
solo M1 y la primera sección de M2 (Hero + Navbar).
Necesito ver algo visual rápido antes de seguir con el resto de secciones.
```

---

## 🔧 Hotfix

*Cambio puntual.*

```
Lee .mission_control/ROUTER.md y opera en MODO HOTFIX.
Necesito que hagas este cambio puntual: [DESCRIBE TU CAMBIO AQUÍ]
```

---

## ➕ Agregar Sección

```
Lee .mission_control/ROUTER.md y opera en MODO AGREGAR_SECCIÓN.
Necesito agregar una sección de [TIPO] en la landing.
Primero actualiza site.config.json. Muéstramela para que la apruebe.
Luego crea el componente React siguiendo el design system.
```

---

## 🛒 Construir Catálogo

*Para iniciar M7 — Catálogo E-commerce.*

```
Lee .mission_control/ROUTER.md y .mission_control/ia/state.md.
Ejecuta la misión M7 (Catálogo E-commerce):
1. Conecta con el Google Sheet configurado en site.config.json
2. Construye la página /catalogo con grid de productos y filtros
3. Construye la página /catalogo/[slug] con detalle de producto
4. Integra los productos destacados en la landing
Sigue el checklist de .mission_control/missions/m7_catalogo.md
```

---

## 🛍️ Construir Carrito

*Para iniciar M8 — Carrito de Compras.*

```
Lee .mission_control/ROUTER.md y .mission_control/ia/state.md.
Ejecuta la misión M8 (Carrito de Compras):
1. Implementa el cart store con Zustand
2. Construye el CartSidebar, CartItem y badge del navbar
3. Construye la página /carrito con checkout
4. Integra el botón "Agregar al carrito" en las product cards
Sigue el checklist de .mission_control/missions/m8_carrito.md
```

---

## 📦 Agregar Producto

*Para agregar un producto al catálogo.*

```
Los productos se gestionan directamente en el Google Sheet.
Para agregar un producto:
1. Abre el Google Sheet
2. Agrega una fila con: SKU, nombre, descripción, marca, precio, categoría, URL de imagen
3. Si es destacado, marca featured = TRUE
4. La web se actualizará automáticamente (según el tiempo de revalidación configurado)

Si necesitas forzar la actualización, haz un re-deploy en Vercel.
```

---

## 📄 Actualizar desde Config

```
Lee .mission_control/ROUTER.md y opera en MODO ACTUALIZAR_CONFIG.
Revisar site.config.json y detectar qué cambió.
Actualizar solo los componentes afectados por esos cambios.
```

---

## 🔍 Auto-Revisión

```
Revisa el código y el site.config.json y hazme una autocrítica honesta:
1. ¿El headline es potente?
2. ¿Hay CTAs claros?
3. ¿Cómo se ve en mobile (375px)?
4. ¿La jerarquía visual es clara?
5. ¿El catálogo carga bien los productos del Sheet?
6. ¿El carrito funciona correctamente?
```

---

## 🔄 Sincronizar Sistema

```
Confirma:
1. ¿Qué misión estás ejecutando?
2. ¿Estado en state.md?
3. ¿Archivos modificados?
Responde en 3 líneas.
```
