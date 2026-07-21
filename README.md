# Cerrajero del Pueblo

Landing page profesional para **Cerrajero del Pueblo**, servicio de cerrajería 24/7 en el sur oriente de Santiago (Chile).

[![Live site](https://img.shields.io/badge/demo-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://cerrajero-del-pueblo.netlify.app/)
[![Stack](https://img.shields.io/badge/stack-HTML%20%2B%20CSS%20%2B%20JS-0E3B2E?style=flat-square)](#stack)
[![License](https://img.shields.io/badge/uso-privado%20%2F%20cliente-C8A15A?style=flat-square)](#)

Sitio estático, limpio y listo para desplegar en Netlify (o cualquier hosting estático).

---

## Vista rápida

| | |
|---|---|
| **Empresa** | Cerrajero del Pueblo |
| **Tipo** | Landing page de conversión |
| **Contacto** | WhatsApp + llamada |
| **Cobertura** | Sur oriente de Santiago |
| **Idioma** | Español (Chile) |

### Secciones principales

- Hero con identidad de marca y CTAs
- Beneficios y soluciones de cerrajería
- Lista de precios (hogar / automotriz) con detalle expandible
- Tarifas horarias y cobertura con mapa
- Proceso, garantía, nosotros y FAQ
- CTA final y pie de página

---

## Stack

- **HTML5** semántico y accesible
- **CSS** propio (variables de marca, responsive, motion)
- **JavaScript** vanilla (acordeones, mapa, WhatsApp, revelado al scroll)
- **Leaflet** — mapa de cobertura
- **Lucide** — iconografía
- **Netlify** — headers UTF-8 y hosting estático

Sin frameworks ni bundler: abre `index.html` o publica la raíz del repositorio.

---

## Estructura del repositorio

```text
Landing-Cerrajero-del-pueblo/
├── index.html              # Página principal (punto de entrada)
├── favicon.ico             # Favicon del sitio
├── _headers                # Headers Netlify (UTF-8, cache)
├── netlify.toml            # Configuración de publish
├── README.md
├── docs/
│   └── STRUCTURE.md        # Guía de arquitectura y convenciones
├── assets/                 # Recursos de producción (rutas públicas)
│   ├── css/styles.css
│   ├── js/main.js
│   ├── data/cobertura-comunas.geojson
│   └── images/             # Imágenes y logos usados por el sitio
├── brand/                  # Identidad (no críticos para el runtime)
│   ├── logos/svg|png       # Fuentes y variantes de marca
│   └── archive/            # Assets históricos / no usados en producción
└── scripts/                # Utilidades de mantenimiento
    ├── fetch-cobertura.js
    └── fix-whatsapp-encoding.py
```

> **Importante:** las rutas del sitio (`assets/...`) no dependen de `brand/` ni de `scripts/`. Puedes mover o archivar material de marca sin romper el despliegue.

---

## Desarrollo local

1. Clona el repositorio:

```bash
git clone https://github.com/ninna-rouge/Landing-Cerrajero-del-pueblo.git
cd Landing-Cerrajero-del-pueblo
```

2. Sirve la raíz con cualquier servidor estático, por ejemplo:

```bash
npx --yes serve .
```

O abre `index.html` directamente en el navegador (el mapa y algunos recursos externos requieren red).

---

## Despliegue (Netlify)

1. Conecta este repositorio en Netlify, **o**
2. Arrastra un ZIP de la raíz del sitio (sin `brand/archive` ni `.git` si deseas un paquete liviano).

Configuración recomendada:

| Setting | Valor |
|--------|--------|
| Publish directory | `.` (raíz) |
| Build command | *(ninguno)* |

`netlify.toml` y `_headers` ya definen la publicación y el charset UTF-8 para HTML/CSS/JS.

Sitio de referencia: [cerrajero-del-pueblo.netlify.app](https://cerrajero-del-pueblo.netlify.app/)

---

## Marca y assets

- Logos de producción: `assets/images/logo.svg`, `logo-nav.svg`, `logo-badge.svg`
- Fuentes / variantes: `brand/logos/`
- Archivo histórico: `brand/archive/`

Paleta principal:

| Token | Uso | Hex |
|-------|-----|-----|
| Forest | Identidad, CTAs | `#0E3B2E` |
| Brass | Acentos / botones | `#C8A15A` |
| Navy | Bloques de soporte | `#0E2133` |

---

## Scripts de utilidad

| Script | Descripción |
|--------|-------------|
| `scripts/fetch-cobertura.js` | Actualiza datos GeoJSON de cobertura |
| `scripts/fix-whatsapp-encoding.py` | Ayuda a validar mensajes WhatsApp con Unicode |

---

## Contacto del servicio

- WhatsApp / teléfono: `+56 9 7853 0417`
- Instagram: [@cerrajero_del_pueblo](https://www.instagram.com/cerrajero_del_pueblo/)

---

## Contribución

Este repositorio corresponde al sitio del cliente. Para cambios de contenido (precios, cobertura, textos), edita `index.html` y, si aplica, `assets/js/main.js` (mensajes de WhatsApp). Revisa `docs/STRUCTURE.md` antes de reorganizar carpetas.

---

© Cerrajero del Pueblo — Landing page
