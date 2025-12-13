---
layout: post
title:  "Deploy Vite en Github Pages"
date:   2022-07-20 10:00:00 -0400
categories: [Deploy, tutorial]
image: 24.png
tag: diseño web
alt: "Vite - Deploy en Github Pages"
extract: "Github pages es una forma gratuita y rápida de alojar un proyecto, como portafolio o showcase, en esta oportunidad vamos a ver como alojar un proyecto vite + reactJS en Github Pages"
---
Github Pages (GP) es un servicio gratuito que permite alojar páginas web: como showcase, blog, portafolio y static site. Te brinda por default la siguiente URL: https://«username».github.io

Entre las muchas opciones que te brinda GP está alojar aplicaciones vite + react. Así que aquí te muestro como podemos hacerlo en unos pocos pasos.
## Pasos previos
Necesitas una instalación de vite + react. Si necesitas saber como puedes consultar aquí [[link]](http://jhosno.github.io/vitejs/automatizador/vitejs)
Ya con un proyecto, toca disponer de un repositorio en Github. Aquí puedes ver como [[link]](http://jhosno.github.io/git/github/Git-agregar-repo)

## Building and Deploying

Con todo lo anterior listo, podemos empezar a hacerle building al proyecto.

Lo primero es que vamos a agregar una configuración en le archivo vite.config.js, agregando la clave base, y dándole como valor el nombre de repositorio:
```jsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// <https://vitejs.dev/config/>
export default defineConfig({
	base: '/«repo-name»/'
  plugins: [react()]
})
```
Vite nos brinda algunos spripts para hacer building, vistas en desarrollo y levantar un servidor “de producción”, definidos en packege.json:
```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```
Para esto agregamos a la consola encima del proyecto el siguiente comando que nos brinda Vite.js:
```bash
npm run build
```
Esto nos genera una carpeta /dist, lo siguiente que corresponde es asegurarse que el repo no tenga ningún commit pendiente. Ya con esto vamos a forzar que se suba la carpeta /dist, que por default está en .gitignore, para ello usamos el flag -f
```bash
$ git add dist -f
$ git commit -m "agregando la carpeta dist"
$ git push -f https://github.com/<USERNAME>/<REPO>.git main:gh-pages
```
Con esto creamos una rama en nuestro repositorio llamada gh-pages.
Lo siguiente, es ir a nuestro repositorio en `github.com` en la pestaña de `Settings` y luego a la sección de `Pages`. y seleccionar en `Source` -> `Branch: gh-pages` -> `/(root)` y guardar cambios.
y ya con esto puedes acceder a tu repositorio  http:// <<username>>.github.io/<<repo>>

Creditos de la img: :) by yuanchuan [[link]](https://codepen.io/yuanchuan/full/qBNgZEO)