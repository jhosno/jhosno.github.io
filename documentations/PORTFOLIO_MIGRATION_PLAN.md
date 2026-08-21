# PLAN: Migracion del Nuevo Portafolio a Jekyll

## Resumen Ejecutivo

El nuevo diseno reemplaza la estetica actual por un diseno **brutalist/technical** con:
- Hero interactivo con Venus flytrap ASCII
- Sistema de idiomas EN/ES (patron rama `localizacion`)
- Animaciones GSAP
- Tokens CSS personalizados
- Fonts: Syne, Martian Mono, Instrument Sans
- Estructura: Hero, About, Work, Labs, Contact

## Decisiones Confirmadas

- Mantener posts/proyectos existentes: SI
- Coleccion para estudios de caso: `_cases/`
- 404 interactivo: empezar estatico
- Sistema i18n: patron de rama `localizacion`

## Arquitectura i18n

```
_data/translations.yml    Archivo central de traducciones
en/                       Paginas duplicadas en ingles
```

Patron en cada include:

```liquid
{% assign t = site.data.translations[page.lang] %}
{% if page.lang == 'en' %}{% assign prefix = '/en' %}{% else %}{% assign prefix = '' %}{% endif %}
```

Uso: `{{ t.section.key }}` en vez de texto hardcodeado.

## Fases de Ejecucion

### Fase 1: Configuracion Base
1. Actualizar `_config.yml` (title, description EN)
2. Actualizar `tailwind.config.js` (fonts, colores nuevos)
3. Verificar `Gemfile` (jekyll-sitemap)
4. Agregar coleccion `_cases/` en `_config.yml`

### Fase 2: Assets
1. Crear `assets/fonts/` con Syne, Martian Mono, Instrument Sans
2. Crear `assets/css/tokens.css` (CSS custom properties)
3. Crear `assets/css/ribbon.css`
4. Crear `assets/css/hero.css`
5. Crear `assets/css/sections.css`
6. Crear `assets/css/case.css`
7. Crear `assets/css/404.css` (estatico)
8. Crear `assets/js/ribbon.js`
9. Crear `assets/js/hero.js`
10. Crear `assets/js/marquee.js`
11. Crear `assets/js/seed.js`
12. Crear `assets/js/lang.js`

### Fase 3: Layouts
1. Crear `_layouts/home.html`
2. Crear `_layouts/case.html`

### Fase 4: Includes - Ribbon y Hero
1. `_includes/ribbon.html`
2. `_includes/hero/hero.html`
3. `_includes/hero/noise.html`
4. `_includes/hero/plant.html`
5. `_includes/hero/ascii.html`
6. `_includes/hero/seal.html`

### Fase 5: Includes - Home Sections
1. `_includes/home/about.html`
2. `_includes/home/work.html`
3. `_includes/home/work-card.html`
4. `_includes/home/work-card-double.html`
5. `_includes/home/labs.html`
6. `_includes/home/contact.html`
7. `_includes/home/band.html`

### Fase 6: Includes - Case
1. `_includes/case/ribbon.html`
2. `_includes/case/lede.html`
3. `_includes/case/state.html`
4. `_includes/case/code.html`
5. `_includes/case/metric.html`
6. `_includes/case/next.html`

### Fase 7: i18n
1. Migrar `_data/translations.yml` de rama `localizacion`
2. Agregar nuevas claves para home, case, labs
3. Crear `/en/` con paginas duplicadas
4. Actualizar `head.html` con hreflang
5. Actualizar `scripts.html` con auto-deteccion
6. Actualizar `navbar.html` con toggle

### Fase 8: Paginas
1. Modificar `index.markdown` (layout: home)
2. Crear `cases/creatienda.markdown`
3. Crear `/en/index.markdown`
4. Crear `/en/cases/creatienda.markdown`
5. Reemplazar `404.html`

### Fase 9: SEO y Soporte
1. Crear `robots.txt`
2. Crear `sitemap.xml`
3. Crear `llms.txt`
4. Crear `favicon.svg`
5. Crear `.nojekyll`

### Fase 10: Limpieza
1. Eliminar `assets/css/tailwind.css` (duplicado)
2. Mover includes viejos a `_includes/_old/` (opcional)

## Tiempo Estimado Total: ~5 horas

## Archivos a No Tocar
- `_posts/*` (existente)
- `_projects/*` (existente)
- `_includes/landing/*` (landing vieja)
- `_includes/blog/*` (blog existente)
- `_includes/post/*` (posts existentes)
- `_includes/project/*` (proyectos existentes)
- `_includes/portfolio/*` (portfolio existente)
- `assets/css/output.css` (Tailwind compilado)
- `assets/css/main.scss` (SCSS existente)
- `assets/js/lucide.min.js` (iconos)
