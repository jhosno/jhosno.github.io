---
layout: post
title:  "Creando un repositorio"
date:   2022-02-28 15:00:00 -0400
categories: [GIT, Github]
image: 1.png
alt: "GIT - agregar un repo a un proyecto local"
extract: "Te has topado con que quieres agregar a un repositorio un proyecto local, pero no ñsabes cómo, o sencillamente, lo has olvidado. Si me pasa, por eso he dejado está pequeña guía, para tenerlo presente. ¿Quieres saber más? Sigue leyendo"
---
En el desarrollo una de las herramientas más importantes son los sistemas de control de versiones, como GIT, junto con otras herramientas como Github, Gitlab o Bitbucker. En esta oportunidad, plasmaré una pequeña guía de como agregar un repositorio a un proyecto local, que puede que sea una actividad sencilla y rutinaria, pero a veces conviene echar un vistazo a una guía, para refrescar conocimientos.

## Requerimientos 
- GIT
- Cuenta en Github

Para empezar, como se puede intuir, el primer paso es la creación, pero aunque es una de las actividades más recurrentes, a veces, a veces es necesarios, 

crear una nueva carpeta:

```bash
> mkdir bazinga 
```

Lo siguiente será crear un repositorio, en este caso, haremos un repo en Github:


![Crear un repo en github](/assets/images/content/git-new-repo.png){:class="img-responsive"}

Lo que veremos ahora será un vista en donde te indica cuál será la dirección HTTP del tu repositorio, y los pasos a seguir, según las diferente opciónes que tienes:

![Vista inicial de un repo vacío](/assets/images/content/git-new-repo2.png){:class="img-responsive"}



Con esta pantalla podemos ver el enlace HTTP con el que podemos trabajar en el repositorio:

```bash
https://github.com/jhosno/bazinga.git
```

Ahora solo tienes que posicionarte en tu consola del proyecto, y tipear lo siguiente:


```bash
//Una vez ubicada la consola en la dirección de proyecto que queremos subir colocamos lo siguiente 
//Iniciamos git en el repositorio
>git init
//Agregamos todos los archivos existentes en la carpeta
git add . 
//Creamos el commit con un comentario idetificativo
>git commit -m "first commit"
//Creamos una brecha master
>git branch -M main
//Agregamos una dirección remota de brecha 
>git remote add origin https://github.com/jhosno/bazinga.git
//Ahora subimos todo el contenido de la carpeta a nuestro github
>git push -u origin main
```

Créditos de la Img: Spiral fractal experiment v2 - frank [[link]](https://codepen.io/franksLaboratory/pen/jOaVMwX)
