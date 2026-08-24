# Case Template Documentation

## Overview

The case template system allows you to create case study pages for your portfolio. Each case is a separate file that uses a shared layout, ensuring consistency across all cases while allowing unique content.

## Architecture

```
_cases/
  creatienda.md        ← individual case files
  dover.md
  ...

_layouts/
  case.html            ← shared layout template

assets/
  css/
    base.css           ← shared styles (tokens, reset, ribbon, footer)
    case.css           ← case-specific styles (lede, band, state, prose, fig, code, metric)
  js/
    case.js            ← case behavior (scroll animations, progress bar, language toggle)
  svg/
    architecture.svg   ← placeholder diagrams
    flow.svg
    database.svg
    network.svg
    performance.svg
```

## Creating a New Case

### 1. Create the Case File

Create a new `.md` file in the `_cases/` directory:

```markdown
---
layout: case
title: Your Case Title
subtitle: "brief description"
description: "Longer description for meta tags and SEO"
og_description: "Open Graph description for social sharing"
permalink: /cases/your-case/
lang: en
---

<!-- Your HTML content here -->
```

### 2. Front Matter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `layout` | Yes | Must be `case` |
| `title` | Yes | Case title (displayed in h1) |
| `subtitle` | Yes | Brief description (used in page title) |
| `description` | Yes | Meta description for SEO |
| `og_description` | No | Open Graph description (defaults to `description`) |
| `permalink` | Yes | URL path (e.g., `/cases/your-case/`) |
| `lang` | Yes | Default language (`en` or `es`) |

### 3. HTML Content Structure

The body content should follow this structure:

```html
<div class="wrap">
  <div class="lede">
    <span class="lede__idx" data-i18n="idx">[CATEGORY · STACK · PERIOD]</span>
    <h1 style="--title-ch:12">[Case Title]</h1>
    <p class="lede__thesis" data-i18n-html="thesis">
      Your thesis statement with <em>emphasis</em>.
    </p>

    <dl class="facts">
      <div><dt data-i18n="f1t">what it is</dt><dd data-i18n="f1">Description</dd></div>
      <div><dt data-i18n="f2t">my role</dt><dd data-i18n="f2">Role description</dd></div>
      <div><dt data-i18n="f3t">stack</dt><dd>Tech · Stack · Here</dd></div>
      <div><dt data-i18n="f4t">period</dt><dd data-i18n="f4">2024 — now</dd></div>
      <div><dt data-i18n="f5t">outcome</dt><dd data-i18n="f5">Result description</dd></div>
    </dl>
  </div>
</div>

<!-- Section 1 -->
<div class="band"><span data-i18n="b1">Section Title</span><small data-i18n="b1s">01 — subtitle</small></div>
<div class="wrap"><section class="state">
  <div class="state__grid">
    <div class="prose rise">
      <!-- Content here -->
    </div>
    <figure class="fig rise">
      <div class="fig__box f-your-class"><i></i></div>
      <figcaption data-i18n="fig1">Figure caption</figcaption>
    </figure>
  </div>
</section></div>

<!-- Repeat for more sections -->

<div class="wrap">
  <nav class="next">
    <div>
      <small data-i18n="n1">Next case</small>
      <a href="/cases/next-case/">Next Case Title</a>
    </div>
    <div>
      <small data-i18n="n2">Or</small>
      <a href="/#contacto" data-i18n="n3">Send the stack trace →</a>
    </div>
  </nav>
</div>
```

## Available CSS Classes

### Cover (Lede)

| Class | Description |
|-------|-------------|
| `.lede` | Container for the cover section |
| `.lede__idx` | Category/stack/period label |
| `.lede__thesis` | Thesis statement |
| `.facts` | Grid of fact items |
| `.facts dt` | Fact label |
| `.facts dd` | Fact value |

### Sections (Bands)

| Class | Description |
|-------|-------------|
| `.band` | Section header (default: pink background) |
| `.band--acid` | Section header (purple background) |
| `.state` | Section content container |
| `.state__grid` | Two-column grid (prose + figure) |

### Prose

| Class | Description |
|-------|-------------|
| `.prose` | Text content container |
| `.pull` | Pull quote with left border |
| `h3` | Subsection heading |
| `strong` | Bold text (paper color) |
| `em` | Emphasized text (acid color) |

### Figures/Diagrams

| Class | Description |
|-------|-------------|
| `.fig` | Figure container (sticky on desktop) |
| `.fig__box` | Diagram container (4:3 aspect ratio) |
| `.f-tenant` | Multi-tenant pattern |
| `.f-coupled` | Coupling pattern |
| `.f-factory` | Factory pattern |
| `.f-perf` | Performance pattern |

### Code Blocks

| Class | Description |
|-------|-------------|
| `.code` | Code block container |
| `.code__head` | Code block header |
| `b` | Keywords (acid color) |
| `u` | Names (paper color) |
| `i` | Comments (dim color) |

### Metrics

| Class | Description |
|-------|-------------|
| `.metric` | Metric container |
| `.metric__big` | Large number |
| `.metric__lbl` | Metric label |
| `.bars` | Bar chart container |

### Navigation

| Class | Description |
|-------|-------------|
| `.next` | Next case navigation |
| `.next a` | Next case link |

### Animations

| Class | Description |
|-------|-------------|
| `.rise` | Fade-in animation on scroll |
| `.rise.on` | Animation triggered |

## Language System

### How It Works

1. HTML is served in English by default
2. Spanish translations are provided via `window.__CASE_ES`
3. Toggle button switches between languages
4. Preference is saved in localStorage

### Adding Translations

Add a `<script>` tag at the end of your case file:

```html
<script>
window.__CASE_ES = {
  // Cover
  skip:"Saltar al contenido",
  allwork:"← todo el trabajo",
  idx:"[CATEGORÍA · STACK · PERIODO]",
  thesis:"Tu tesis en español",
  f1t:"qué es", f1:"Descripción",
  f2t:"mi rol", f2:"Rol",
  f3t:"stack",
  f4t:"periodo", f4:"Periodo",
  f5t:"resultado", f5:"Resultado",

  // Sections
  b1:"Título de Sección", b1s:"01 — subtítulo",
  b2:"Título de Sección", b2s:"02 — subtítulo",
  b3:"Título de Sección", b3s:"03 — subtítulo",
  b4:"Título de Sección", b4s:"04 — subtítulo",

  // Content (use data-i18n keys from your HTML)
  w1:"Contenido en español...",
  w2:"Contenido en español...",

  // Navigation
  n1:"Siguiente caso",
  n2:"O bien",
  n3:"Traé el stack trace →",
  foot:"hecho a mano con html, css y gsap · sin plantillas",

  // Language button
  _btn:"EN",
  _aria:"Switch to English"
};
</script>
```

### Translation Keys

Use `data-i18n` for text content:
```html
<p data-i18n="w1">English text</p>
```

Use `data-i18n-html` for content with HTML:
```html
<p data-i18n-html="w1">English with <strong>HTML</strong></p>
```

## Diagram Patterns

### CSS Patterns (Default)

The template includes CSS-only diagram patterns:

- **`.f-tenant`** — Multi-tenant architecture (columns sharing base)
- **`.f-coupled`** — Coupling (crossed lines)
- **`.f-factory`** — Factory pattern (one node, many outputs)
- **`.f-perf`** — Performance (waterfall bars)

### SVG Diagrams

For more complex diagrams, use SVG files from `assets/svg/`:

```html
<figure class="fig rise">
  <div class="fig__box">
    <img src="/assets/svg/architecture.svg" alt="Architecture diagram">
  </div>
  <figcaption data-i18n="fig1">Diagram caption</figcaption>
</figure>
```

### Creating Custom SVGs

Create SVG files in `assets/svg/` following the color scheme:

- Background: `#1a1a1a`
- Primary: `#C53A9D`
- Accent: `#5a2bc7`
- Highlight: `#B9BE2A`
- Dim: `#7d2764`
- Text: `#f2f0d8`

## Responsive Behavior

- **Desktop (>900px):** Two-column grid with sticky figure
- **Tablet (620-900px):** Single column, figure above text
- **Mobile (<620px):** Stacked layout, simplified ribbon

## Code Block Syntax

Use HTML tags for syntax highlighting:

```html
<div class="code">
  <div class="code__head"><span>file/path</span><span data-i18n="illus">illustrative</span></div>
<pre><b>keyword</b> <u>ClassName</u>
{
    <i>// comment</i>
    <b>public function</b> method(): <u>ReturnType</u>;
}</pre>
</div>
```

- `<b>` — Keywords (acid color)
- `<u>` — Names (paper color)
- `<i>` — Comments (dim color)

## Performance Notes

- No GSAP or Lenis (unlike the index page)
- Uses IntersectionObserver for scroll animations
- Minimal JS (~40 lines)
- CSS-only diagrams where possible
- SVG diagrams are lightweight

## Example: Complete Case

See `_cases/creatienda.md` for a complete example.
