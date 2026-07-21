# Identidad de marca

Fuentes y variantes de logo **fuera del runtime** del sitio.

## Carpetas

| Carpeta | Contenido |
|---------|-----------|
| `logos/svg/` | Exportaciones vectoriales (primario y variantes) |
| `logos/png/` | Previews raster para diseño / revisión |
| `archive/` | Versiones antiguas o assets no enlazados en producción |

## Logos en producción

Los archivos que consume la landing están en:

- `assets/images/logo.svg` — hero / footer
- `assets/images/logo-nav.svg` — navbar
- `assets/images/logo-badge.svg` — variante badge

Para actualizar la marca en el sitio, exporta desde aquí y **reemplaza** los archivos en `assets/images/` manteniendo el mismo nombre (así no cambian las rutas del HTML).
