---
layout: post
title:  "TailwindCSS"
date:   2022-03-22 10:00:00 -0400
categories: [tailwinds, tutorial]
image: 4.png
alt: "Tailwind - Framework CSS"
extract: "Tailwind es una framework con una filosifía distinta a otros framework, confiable, veloz y altamente optimizado. ¿Quieres saber más? Sigue leyendo"
---
Tailwinds CSS es un framework de código abierto, con una filosofía diferente a otros framework, como bootstrap, no se enfoca en definir clases definidas para componentes como botones o alertas. En cambio, prioriza la funcionalidad, de tal manera que se puedan definir estilos de manera individual a cada elemento, dándole más versatilidad al desarrollo.

En su [página oficial](https://tailwindcss.com/) se declara como rápido, flexible, confiable, sin tiempo de ejecución.

Otra de las características, es que tailwinds funciona con PostCSS, para la generación de código CSS, esto le brinda un desarrollo avanzado, personalizable y altamente optimizado.

## Filosofía

Su filosofía radica en *utility-first* (la útilidad primero), esta es su característica principal. Eso se ve en que en un framework convencional, las clases se desarrollan al rededor de un componente concreto: botones, inputs, navbar y más, en cambio, tailwinds se crean pensando en las cualidades: color de fuente gris, fondo azul, tamaño de font grande, centrar texto, y así.

Haciendo que las clases disponibles son bastante extendidas, ya que hay una clase básicamente por cada propiedad de CSS.

## Instalación

Tailwinds CSS está desarrollado con JavaScript, se instala con NPM o Yarn y se ejecuta a través de NodeJs. Además, que deja a disposición un archivo de configuración llamado `tailwind.config.js`

En este caso, repasaremos los pasos de instalación en un proyecto hipotético de ReactJs

Para empezar debemos colocar en la consola, encima de la dirección del proyecto, necesitamos también, postCSS, para que interprete y optimice tailwids:

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Una vez instalado, debemos iniciar tailwinds, que nos generara el documento `tailwinds.config.js` y `postcss.config.js`

```bash
npx tailwindcss init -p
```

Dentro de del documento `tailwinds.config.js` necesitamos agregar el arreglo purge, en donde vamos a definir los archivos en donde vamos a incluir clases de tailwinds:

```jsx
module.exports = {
  purge: ["./index.html", "./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

Por otra parte, vamos a importar los elementos tailwinds

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

Y ya con esto puedes empezar a útilizar tailwinds.

Creditos de la img: Flow field by frank [[link]](https://codepen.io/franksLaboratory/pen/rNYGbZm)