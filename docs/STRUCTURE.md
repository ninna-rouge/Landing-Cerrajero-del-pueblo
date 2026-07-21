# Estructura del proyecto

Documento de referencia para mantener el repositorio ordenado sin romper el sitio en producción.

## Principio rector

El **runtime del sitio** vive en la raíz y en `assets/`.  
Todo lo demás (`brand/`, `scripts/`, `docs/`) es soporte y **no debe referenciarse** desde `index.html` ni desde `assets/js/main.js`.

## Capas

### 1. Publicación (Netlify / hosting estático)

| Ruta | Rol |
|------|-----|
| `index.html` | Única página de la landing |
| `favicon.ico` | Icono del navegador |
| `_headers` | Charset y políticas Netlify |
| `netlify.toml` | `publish = "."` |
| `assets/css/styles.css` | Estilos de producción |
| `assets/js/main.js` | Interacciones (precios, FAQ, mapa, WhatsApp) |
| `assets/data/*.geojson` | Datos del mapa de cobertura |
| `assets/images/*` | Imágenes y logos **usados** por el HTML |

Cualquier cambio de ruta dentro de `assets/` exige actualizar `index.html` y/o `main.js` en el mismo commit.

### 2. Marca (`brand/`)

| Ruta | Rol |
|------|-----|
| `brand/logos/svg/` | Fuentes SVG de identidad |
| `brand/logos/png/` | Previews raster de logos |
| `brand/archive/` | Material histórico o no usado en producción |

No publicar `brand/archive/` como dependencia del sitio. Puede omitirse en ZIPs de deploy livianos.

### 3. Herramientas (`scripts/`)

Utilidades locales (Node / Python). No se ejecutan en el navegador del visitante.

### 4. Documentación (`docs/`)

Guías para humanos y para el equipo. No afectan el build.

## Convenciones

- **Español (Chile)** en copy orientado al usuario.
- **Rutas relativas** desde la raíz (`assets/...`), compatibles con Netlify drag-and-drop.
- **UTF-8** en HTML/CSS/JS (reforzado por `_headers`).
- Mensajes de WhatsApp en `assets/js/main.js` con escapes Unicode (`\u{...}`) para evitar mojibake.

## Checklist antes de mover archivos

1. ¿El archivo aparece en `index.html`, `main.js` o CSS `url(...)`?
2. Si sí → actualizar todas las referencias en el mismo cambio.
3. Si no → preferir `brand/archive/` o `brand/logos/`.
4. Probar localmente la página y el mapa de cobertura.
5. Regenerar el ZIP de deploy si se usa ese flujo.

## Assets de producción esperados

Mínimo usado por la landing actual:

- `assets/images/logo-nav.svg`
- `assets/images/logo.svg`
- `assets/images/logo-badge.svg` *(reserva de marca / usos futuros)*
- `assets/images/hero-cinematic.jpg`
- `assets/images/cta-night.jpg`
- `assets/images/servicio-*.jpg`
- `assets/images/proceso-*.jpg`
- `assets/images/nosotros-trayectoria.jpg`
- `assets/images/favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`
