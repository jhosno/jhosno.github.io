# Implementación de Plantilla - Jhosno Portfolio

## 📋 Visión General

Este documento explica cómo crear una nueva plantilla (layout) para el proyecto Jhosno Portfolio, un sitio web estático construido con **Jekyll** y **Tailwind CSS**.

---

## 🏗️ Estructura del Proyecto

```
jhosno.github.io/
├── _config.yml          # Configuración principal de Jekyll
├── _layouts/            # Plantillas HTML
│   ├── default.html     # Layout base para páginas
│   ├── front.html       # Layout para landing page
│   ├── post.html        # Layout para posts del blog
│   ├── project.html     # Layout para proyectos
│   ├── portfolio.html   # Layout para página de portfolio
│   └── blog.html        # Layout para página de blog
├── _includes/           # Componentes reutilizables
│   ├── navbar.html
│   ├── footer.html
│   ├── head.html
│   ├── scripts.html
│   └── ...
├── _posts/              # Contenido del blog
├── _projects/           # Contenido de proyectos
├── _sass/               # Estilos SCSS
├── assets/              # Assets estáticos (CSS, JS, imágenes)
└── *.markdown           # Páginas principales
```

---

## 📄 Crear una Nueva Plantilla

### Paso 1: Crear el archivo de layout

Crea un archivo HTML en `_layouts/` con el nombre deseado:

```html
<!-- _layouts/mi-plantilla.html -->
<!DOCTYPE html>
<html lang="es">
{% include head.html %}

<body class="bg-black text-white">
    {% include navbar.html %}
    
    {{content}}
    
    {% include footer.html %}
    {% include upbutton.html %}
    {% include scripts.html %}
</body>
</html>
```

### Paso 2: Usar la plantilla en una página

En el front matter de tu archivo `.markdown` o `.html`:

```yaml
---
layout: mi-plantilla
title: "Mi Página"
permalink: /mi-pagina/
---
```

---

## 🎨 Elementos Disponibles en los Layouts

### Layout Base (`default.html`)

```html
<!DOCTYPE html>
<html lang="es">
<head>...</head>
<body class="bg-black text-white">
    {% include navbar.html %}      <!-- Barra de navegación -->
    {{content}}                     <!-- Contenido principal -->
    {% include footer.html %}       <!-- Pie de página -->
    {% include upbutton.html %}     <!-- Botón "volver arriba" -->
    {% include scripts.html %}      <!-- Scripts JavaScript -->
</body>
</html>
```

### Layout Landing (`front.html`)

```html
<body class="bg-black text-white">
    {% include navbar.html %}
    
    {% include /landing/header.html %}      <!-- Hero de landing -->
    {% include /landing/expertice.html %}    <!-- Sección de expertise -->
    {% include /landing/portfolio.html %}    <!-- Portafolio destacado -->
    {% include /landing/contact.html %}      <!-- Formulario de contacto -->
    
    {% include upbutton.html %}
    {% include footer.html %}
    {% include scripts.html %}
</body>
```

---

## 🔧 Configuración de Tailwind CSS

El proyecto usa **Tailwind CSS v3** con configuración personalizada:

### `tailwind.config.js`

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

### Scripts disponibles

```bash
# Compilar CSS (producción)
npm run build:css

# Observar cambios en desarrollo
npm run watch:css
```

---

## 📝 Front Matter de Plantillas

### Variables disponibles

```yaml
---
layout: mi-plantilla          # Nombre del layout a usar
title: "Título de la página"  # Título SEO
description: "Descripción"    # Meta descripción
permalink: /ruta/              # URL de la página
image: /assets/images/...      # Imagen para Open Graph
categories: [tag1, tag2]       # Categorías (para posts)
date: 2025-01-01 10:00:00      # Fecha del post
extract: "Extracto breve"      # Extracto del contenido
---
```

### Variables personalizadas (ejemplo de post)

```yaml
---
layout: post
tag: posts
title: Guía de Tailwind CSS
title-stylized: '<span class="text-golden">Guía de</span> <br /> <span class="text-salmon">Tailwind</span>'
content-table:
  intro: "Introducción"
  instalacion: "Instalación"
  conceptos: "Conceptos Básicos"
categories: [tailwindcss, css, frontend]
---
```

---

## 🧩 Crear Componentes Reutilizables

### Paso 1: Crear el include

```html
<!-- _includes/mi-componente.html -->
<section class="py-12 bg-gray-900">
    <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-golden mb-6">
            {{ include.title }}
        </h2>
        <div class="text-gray-300">
            {{ include.content }}
        </div>
    </div>
</section>
```

### Paso 2: Usar el componente

```html
{% include mi-componente.html 
   title="Mi Sección" 
   content="Contenido aquí" 
%}
```

---

## 📂 Estructura de Includes

```
_includes/
├── head.html                 # <head> con meta tags
├── navbar.html               # Navegación principal
├── footer.html               # Pie de página
├── scripts.html              # Scripts JS
├── upbutton.html             # Botón volver arriba
├── landing/                  # Componentes de landing
│   ├── header.html
│   ├── expertice.html
│   ├── portfolio.html
│   └── contact.html
├── blog/                     # Componentes del blog
│   ├── header.html
│   ├── post-list.html
│   └── featured-post.html
├── project/                  # Componentes de proyectos
│   ├── hero.html
│   ├── stack.html
│   ├── gallery.html
│   └── ...
├── post/                     # Componentes de posts
│   ├── hero.html
│   ├── content.html
│   ├── aside.html
│   └── ...
└── portfolio/                # Componentes de portfolio
    ├── header.html
    ├── project-list.html
    └── featured-project.html
```

---

## 🎯 Ejemplo: Crear Layout para Proyectos

### 1. Crear el layout

```html
<!-- _layouts/project-v2.html -->
<!DOCTYPE html>
<html lang="es">
{% include head.html %}

<body class="bg-black text-white">
    {% include navbar.html %}
    
    <!-- Hero del proyecto -->
    {% include project/hero.html %}
    
    <!-- Contenido principal del proyecto -->
    <main class="container mx-auto px-4 py-12">
        {{content}}
    </main>
    
    <!-- Galería de imágenes -->
    {% include project/gallery.html %}
    
    <!-- Stack tecnológico -->
    {% include project/stack.html %}
    
    {% include footer.html %}
    {% include upbutton.html %}
    {% include scripts.html %}
</body>
</html>
```

### 2. Usar el layout en un proyecto

```markdown
---
layout: project-v2
title: "Mi Proyecto"
description: "Descripción del proyecto"
image: /assets/images/projects/mi-proyecto/hero.jpg
stack:
  - React
  - Node.js
  - MongoDB
---

## Descripción del Proyecto

Contenido del proyecto aquí...

## Características Principales

- Característica 1
- Característica 2
```

---

## 🎨 Clases CSS Comunes del Proyecto

### Colores personalizados

| Clase | Color | Hex |
|-------|-------|-----|
| `text-golden` | Amarillo | #FFFF00 |
| `text-salmon` | Rosa/Magenta | #FF00FF |
| `bg-black` | Negro | #000000 |
| `bg-gray-900` | Gris oscuro | #1a1a1a |

### Clases de utilidad frecuentes

```html
<!-- Contenedor -->
<div class="container mx-auto px-4">...</div>

<!-- Grid responsive -->
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">...</div>

<!-- Flexbox -->
<div class="flex items-center justify-between">...</div>

<!-- Tipografía -->
<h1 class="text-4xl font-black text-golden">Título</h1>
<p class="text-gray-300 leading-relaxed">Párrafo</p>

<!-- Bordes y sombras -->
<div class="border-4 border-golden rounded-lg shadow-lg">...</div>

<!-- Hover effects -->
<button class="bg-golden text-black hover:bg-salmon hover:text-white transition-colors">
  Botón
</button>
```

---

## 🚀 Pasos para Agregar una Nueva Página

1. **Crear el archivo de contenido** en la raíz del proyecto:
   ```bash
   # Ejemplo: nueva página "servicios"
   touch servicios.markdown
   ```

2. **Agregar front matter** con el layout deseado:
   ```yaml
   ---
   layout: default
   title: "Servicios"
   permalink: /servicios/
   ---
   ```

3. **Agregar contenido** en HTML/Markdown después del front matter

4. **(Opcional)** Crear includes específicos si es necesario

5. **Probar localmente**:
   ```bash
   bundle exec jekyll serve
   ```

---

## 📌 Notas Importantes

- Todos los layouts deben incluir `{% include head.html %}` y `{% include scripts.html %}`
- El contenido se inyecta con `{{content}}`
- Usa las clases de Tailwind CSS en lugar de CSS personalizado
- Los colores `golden` y `salmon` están definidos en `tailwind.config.js`
- Para imágenes, colócalas en `assets/images/` y referéncialas relativo a la raíz

---

## 🔗 Recursos

- [Documentación de Jekyll](https://jekyllrb.com/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Liquid Template Language](https://shopify.github.io/liquid/)
