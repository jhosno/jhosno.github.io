# Jekyll + Tailwind CSS v3 - GitHub Pages

Un proyecto moderno de Jekyll integrado con Tailwind CSS v3, listo para desplegarse en GitHub Pages.

## 📋 Características

- **Jekyll 4.x**: Generador de sitios estáticos
- **Tailwind CSS v3**: Framework de utilidades CSS
- **GitHub Pages**: Hosting gratuito y automático
- **PostCSS**: Procesamiento de CSS con autoprefixer
- **Minificación**: CSS optimizado para producción
- **Hot Reload**: Desarrollo con recarga automática

## 🚀 Inicio Rápido

### Requisitos Previos

- Ruby 2.7 o superior
- Node.js 14 o superior
- Bundler: `gem install bundler`

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

2. **Instala las dependencias de Ruby**
```bash
bundle install
```

3. **Instala las dependencias de Node**
```bash
npm install
```

4. **Ejecuta el servidor de desarrollo**
```bash
 bundle exec jekyll serve
```

El sitio estará disponible en `http://localhost:4000`

## 📁 Estructura del Proyecto

```
.
├── _drafts/            # Borradores de artículos del blog
├── _includes/          # Componentes reutilizables
├── _layouts/           # Plantillas de página
├── _posts/             # Artículos del blog
├── _proyects/          # Proyectos del portafolio
├── _site/              # Sitio generado (no versionar)
├── assets/
│   ├── css/
│   │   └── output.css    # CSS de sálida para Tailwind
│   └── images/
├── _config.yml         # Configuración de Jekyll
├── tailwind.config.js  # Configuración de Tailwind CSS
├── package.json        # Dependencias de Node
├── Gemfile             # Dependencias de Ruby
├── blog.html           # Página de lista de posts
├── index.html          # Página principal
├── portfolio.html      # Página del lista de proyectos
├── post.html           # Página de post del sitio
└── project.html        # Página de destalle del proyecto
```

## ⚙️ Configuración

### Tailwind CSS

El archivo `tailwind.config.js` contiene la configuración de Tailwind:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.{html,md}',
    './_layouts/**/*.{html,md}',
    './_posts/**/*.{html,md}',
    './_posts/*.{html,md}',
    './_projects/**/*.{html,md}',
    './_projects/*.{html,md}',
    './*.{html,md}',
  ],
  theme: {
    extend: {
      colors: {
        golden: "#f6b931",
        purple: "#8B5CF6",
        salmon: "#A6357D ",
      },
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}
```

### Jekyll

Configuración básica en `_config.yml`:

```yaml
title: Jhosno
email: jhosnoirlit@gmail.com
description: >- # this means to ignore newlines until "baseurl:"
  Jhosno | ReactJS | Web dev | MERN | Laravel | Grimorio de programación: cosas de react, web dev, frontend, y cualquier cosa que este aprendiendo. Aprender a programar es difícil, pero aprender cosas nuevas es divertido.
path: "/"

url: "https://jhosno.github.io/" # the base hostname & protocol for your site, e.g. http://example.com
#url: "http://localhost:4000/" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: jhosno
github_username:  jhosno

permalink: :tag/:title
defaults:
  - scope:
      path: "assets/images"
    values:
      image: true
# Build settings
theme: minima
plugins:
  - jekyll-feed
  - jemoji
  - jekyll-seo-tag

collections:
  projects:
    output: true

    
jekyll_admin:
  hidden_links:
 
  homepage: "post"
# Exclude from processing.
# The following items will not be processed, by default.
# Any item listed under the `exclude:` key here will be automatically added to
# the internal "default list".
#
# Excluded items can be processed by explicitly listing the directories or
# their entries' file path in the `include:` list.
#
# exclude:
#   - .sass-cache/
#   - .jekyll-cache/
#   - gemfiles/
#   - Gemfile
#   - Gemfile.lock
#   - node_modules/
#   - vendor/bundle/
#   - vendor/cache/
#   - vendor/gems/
#   - vendor/ruby/

```


## 🛠️ Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Compilar CSS para desarrollo
 npm run build:css  

# Compilar CSS con watch
npm run css:watch

# Build de producción
npm run build

# Servir build de producción
npm run serve
```

## 🌐 Despliegue en GitHub Pages

### Opción 1: GitHub Actions (Recomendado)

1. Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
          
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: |
          bundle install
          npm install
          
      - name: Build site
        run: npm run build
        env:
          JEKYLL_ENV: production
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

2. En GitHub: Settings → Pages → Source → selecciona la rama `gh-pages`

### Opción 2: Build Local

```bash
# Build de producción
JEKYLL_ENV=production npm run build

# Sube el contenido de _site/ a tu hosting
```

## 📝 Uso de Tailwind en Jekyll

### En archivos HTML

```html
<div class="container mx-auto px-4">
  <h1 class="text-4xl font-bold text-blue-600">
    Hola Tailwind!
  </h1>
  <p class="mt-4 text-gray-700">
    Este es un párrafo con clases de Tailwind.
  </p>
</div>
```

### En archivos Markdown

```markdown
---
layout: default
title: Mi Página
---

<div class="prose lg:prose-xl" markdown="1">

# Título en Markdown

Este contenido se renderiza con Markdown pero puede incluir clases de Tailwind.

</div>
```

## 🎨 Personalización

### Colores Personalizados

En `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'brand': {
        50: '#f0f9ff',
        500: '#0ea5e9',
        900: '#0c4a6e',
      }
    }
  }
}
```

### Tipografía

```javascript
theme: {
  extend: {
    fontFamily: {
      'sans': ['Inter', 'system-ui', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
    }
  }
}
```

## 🐛 Solución de Problemas

### El CSS no se actualiza
```bash
# Limpia la cache y reconstruye
rm -rf _site .jekyll-cache
npm run dev
```

### Errores de dependencias
```bash
# Reinstala todo
rm -rf node_modules _site .jekyll-cache
bundle install
npm install
```

### GitHub Pages no actualiza
- Verifica que el workflow se ejecutó correctamente en Actions
- Asegúrate de que `baseurl` esté configurado correctamente en `_config.yml`

## 📚 Recursos

- [Documentación de Jekyll](https://jekyllrb.com/docs/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [GitHub Pages](https://pages.github.com/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.


---

⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub!