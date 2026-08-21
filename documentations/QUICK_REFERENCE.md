# Referencia Rapida - Jhosno Portfolio

## Comandos Esenciales

### Desarrollo

```bash
# Instalar dependencias Ruby
bundle install

# Instalar dependencias Node
npm install

# Iniciar servidor de desarrollo
bundle exec jekyll serve

# Iniciar con observador de CSS
npm run watch:css
```

### Produccion

```bash
# Compilar CSS minificado
npm run build:css

# Compilar sitio completo
bundle exec jekyll build
```

---

## Estructura de Archivos

```
jhosno.github.io/
|
|-- _config.yml              # Configuracion Jekyll
|-- _layouts/                # Plantillas HTML
|   |-- default.html         # Layout base
|   |-- front.html           # Landing page
|   |-- post.html            # Articulos
|   |-- project.html         # Proyectos
|   |-- portfolio.html       # Portfolio
|   |-- blog.html            # Blog
|
|-- _includes/               # Componentes reutilizables
|   |-- navbar.html
|   |-- footer.html
|   |-- head.html
|   |-- scripts.html
|   |-- landing/
|   |-- blog/
|   |-- project/
|   |-- post/
|   |-- portfolio/
|
|-- _posts/                  # Contenido del blog
|-- _projects/               # Contenido de proyectos
|-- _sass/                   # Estilos SCSS
|-- assets/                  # Assets estaticos
|   |-- css/
|   |-- js/
|   |-- images/
|
|-- *.markdown               # Paginas principales
|-- package.json             # Dependencias Node
|-- tailwind.config.js       # Configuracion Tailwind
```

---

## Colores del Proyecto

| Variable | Clase CSS | Color | Hex |
|----------|-----------|-------|-----|
| golden | `text-golden` / `bg-golden` | Amarillo | #FFFF00 |
| salmon | `text-salmon` / `bg-salmon` | Rosa | #FF00FF |

---

## Layouts y su Uso

### Para Paginas Generales
```yaml
---
layout: default
title: "Titulo"
permalink: /ruta/
---
```

### Para Landing Page
```yaml
---
layout: front
title: "Titulo"
permalink: /
---
```

### Para Articulos del Blog
```yaml
---
layout: post
title: "Titulo del Articulo"
date: 2025-01-01 10:00:00 -0400
categories: [tag1, tag2]
extract: "Extracto breve"
---
```

### Para Proyectos
```yaml
---
layout: project
title: "Nombre del Proyecto"
description: "Descripcion"
image: /assets/images/proyecto/hero.jpg
---
```

---

## Tags de Contenido

### Colores
- `text-golden` - Texto amarillo
- `text-salmon` - Texto rosa
- `bg-golden` - Fondo amarillo
- `bg-salmon` - Fondo rosa

### Tipografia
- `text-5xl` - Texto grande
- `text-3xl` - Texto mediano
- `font-black` - Fuente ultra negrita
- `font-bold` - Fuente negrita

### Layout
- `container mx-auto` - Contenedor centrado
- `grid md:grid-cols-2` - Grid responsive
- `flex items-center` - Flexbox centrado
- `py-20` - Padding vertical
- `px-4` - Padding horizontal

### Efectos
- `hover:bg-salmon` - Hover con fondo salmon
- `transition-colors` - Transicion de colores
- `border-4 border-golden` - Borde amarillo

---

## Crear Nuevo Post

1. Crear archivo en `_posts/` con formato:
   `YYYY-MM-DD-titulo-del-post.html`

2. Agregar front matter:
```yaml
---
layout: post
title: "Titulo del Post"
date: 2025-01-01 10:00:00 -0400
categories: [javascript, react]
extract: "Descripcion breve del post"
---
```

3. Agregar contenido HTML despues del front matter

---

## Crear Nuevo Proyecto

1. Crear archivo en `_projects/` con formato:
   `YYYY-MM-DD-nombre-del-proyecto.markdown`

2. Agregar front matter:
```yaml
---
layout: project
title: "Nombre del Proyecto"
description: "Descripcion del proyecto"
image: /assets/images/projects/proyecto/hero.jpg
---
```

3. Agregar contenido del proyecto

---

## Configuracion de Tailwind

Archivo: `tailwind.config.js`

```javascript
module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/**/*.html',
    './_projects/**/*.markdown',
    './*.markdown',
    './*.html'
  ],
  theme: {
    extend: {
      colors: {
        golden: '#FFFF00',
        salmon: '#FF00FF',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
      }
    }
  },
  plugins: []
}
```

---

## Plugins de Jekyll

Definidos en `_config.yml`:

- `jekyll-feed` - Feed RSS
- `jemoji` - Emojis de GitHub
- `jekyll-seo-tag` - Tags SEO
- `jekyll-sitemap` - Sitemap automatico
- `jekyll-admin` - Panel de administracion

---

## URL del Sitio

Produccion: `https://jhosno.github.io/`
Desarrollo: `http://localhost:4000/`

---

## Permalinks

Posts: `/posts/:titulo-del-post`
Proyectos: `/projects/:nombre-del-proyecto`
Paginas: Definido en `permalink` del front matter
