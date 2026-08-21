{% raw %}
# Guia Paso a Paso: Crear una Nueva Plantilla

## Objetivo

Crear una plantilla (layout) personalizada para el proyecto Jhosno Portfolio.

---

## Requisitos Previos

- Jekyll instalado (`bundle install`)
- Node.js y npm instalados
- Conocimientos basicos de HTML, Liquid y Tailwind CSS

---

## Paso 1: Crear el Archivo del Layout

Crea un archivo HTML en `_layouts/` con el nombre de tu plantilla:

```bash
touch _layouts/portfolio-v2.html
```

---

## Paso 2: Estructura Base del Layout

Copia esta estructura base:

```html
<!DOCTYPE html>
<html lang="es">
{% include head.html %}

<body class="bg-black text-white">
    {% include navbar.html %}
    
    <main class="min-h-screen">
        {{content}}
    </main>
    
    {% include footer.html %}
    {% include upbutton.html %}
    {% include scripts.html %}
</body>
</html>
```

---

## Paso 3: Agregar Secciones Personalizadas

Ejemplo: Layout con hero y CTA

```html
<!DOCTYPE html>
<html lang="es">
{% include head.html %}

<body class="bg-black text-white">
    {% include navbar.html %}
    
    <header class="bg-gradient-to-b from-gray-900 to-black py-20">
        <div class="container mx-auto px-4">
            <h1 class="text-5xl font-black text-golden">
                {{ page.title }}
            </h1>
            {% if page.description %}
            <p class="text-xl text-gray-300 mt-4">
                {{ page.description }}
            </p>
            {% endif %}
        </div>
    </header>
    
    <main class="container mx-auto px-4 py-12">
        {{content}}
    </main>
    
    {% include cta-section.html %}
    
    {% include footer.html %}
    {% include upbutton.html %}
    {% include scripts.html %}
</body>
</html>
```

---

## Paso 4: Crear Includes Personalizados

Si necesitas componentes especificos, crea archivos en `_includes/`:

```html
<!-- _includes/cta-section.html -->
<section class="bg-gray-900 border-t-4 border-golden py-16">
    <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
            ?Listo para trabajar juntos?
        </h2>
        <a href="/contacto/" 
           class="inline-block bg-golden text-black px-8 py-4 font-bold 
                  hover:bg-salmon hover:text-white transition-colors rounded-lg">
            Contactame
        </a>
    </div>
</section>
```

---

## Paso 5: Usar el Layout

En tu archivo `.markdown` o `.html`:

```yaml
---
layout: portfolio-v2
title: "Mi Portfolio"
description: "Mis proyectos destacados"
permalink: /portfolio-v2/
---

## Mis Proyectos

Contenido aqui...
```

---

## Paso 6: Probar Localmente

```bash
bundle exec jekyll serve
```

Abrir en navegador: http://localhost:4000/portfolio-v2/

---

## Estructura de un Front Matter Completo

```yaml
---
layout: mi-layout
title: "Titulo de la Pagina"
title-stylized: '<span class="text-golden">Titulo</span> <span class="text-salmon">Estilizado</span>'
description: "Descripcion SEO"
permalink: /mi-ruta/
image: /assets/images/hero.jpg
date: 2025-01-01 10:00:00 -0400
categories: [tag1, tag2, tag3]
extract: "Extracto del contenido"
content-table:
  intro: "Introduccion"
  section1: "Seccion 1"
  section2: "Seccion 2"
  conclusion: "Conclusion"
tags: [javascript, react, css]
featured: true
order: 1
---
```

---

## Checklist de la Plantilla

- [ ] Incluye `{% include head.html %}`
- [ ] Incluye `{% include scripts.html %}`
- [ ] Incluye `{% include navbar.html %}`
- [ ] Incluye `{% include footer.html %}`
- [ ] Usa `{{content}}` para inyectar el contenido
- [ ] Usa clases de Tailwind CSS
- [ ] Colores del proyecto: `text-golden` (#FFFF00), `text-salmon` (#FF00FF)
- [ ] Probar con `bundle exec jekyll serve`

---

## Layouts Existentes para Referencia

| Layout | Archivo | Uso |
|--------|---------|-----|
| default | `_layouts/default.html` | Paginas generales |
| front | `_layouts/front.html` | Landing page principal |
| post | `_layouts/post.html` | Articulos del blog |
| project | `_layouts/project.html` | Paginas de proyectos |
| portfolio | `_layouts/portfolio.html` | Pagina de portfolio |
| blog | `_layouts/blog.html` | Pagina de listado del blog |

---

## Includes Disponibles

### Generales
- `head.html` - Meta tags y head
- `navbar.html` - Navegacion
- `footer.html` - Pie de pagina
- `scripts.html` - Scripts JS
- `upbutton.html` - Boton volver arriba

### Landing
- `landing/header.html` - Hero principal
- `landing/expertice.html` - Seccion de expertise
- `landing/portfolio.html` - Portfolio destacado
- `landing/contact.html` - Formulario de contacto

### Blog
- `blog/header.html` - Header del blog
- `blog/post-list.html` - Lista de posts
- `blog/featured-post.html` - Post destacado

### Project
- `project/hero.html` - Hero del proyecto
- `project/stack.html` - Stack tecnologico
- `project/gallery.html` - Galeria de imagenes
- `project/content.html` - Contenido principal
- `project/challenge.html` - Desafios
- `project/architecture.html` - Arquitectura
- `project/results.html` - Resultados

### Post
- `post/hero.html` - Hero del post
- `post/content.html` - Contenido del post
- `post/aside.html` - Barra lateral
- `post/author-box.html` - Info del autor
- `post/related-posts.html` - Posts relacionados

### Portfolio
- `portfolio/header.html` - Header del portfolio
- `portfolio/project-list.html` - Lista de proyectos
- `portfolio/featured-project.html` - Proyecto destacado
{% endraw %}
