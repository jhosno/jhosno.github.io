---
layout: post
title:  "React Router Dom"
date:   2022-07-26 10:00:00 -0400
categories: [ReactRouteDom, tutorial]
image: 5.png
alt: "React Route Dom"
extract: "React-router-dom es una de las más populares liberías de enrutamiento más populares para ReactJS, nos permite utilizar múltiples páginas. Esta es una herramienta conveniente para cuando hay que gestionar proyectos de gran envergadura. "
---
React-router-dom es una de las más populares liberías de enrutamiento más populares para ReactJS, nos permite utilizar múltiples páginas. Esta es una herramienta conveniente para cuando hay que gestionar proyectos de gran envergadura. 
La realidad es que react-router-dom es un monorepo que alberga las siguiente librerías :
 - [`react-router`](<https://github.com/remix-run/react-router/blob/main/packages/react-router>)
- [`react-router-dom`](<https://github.com/remix-run/react-router/blob/main/packages/react-router-dom>)
- [`react-router-native`](<https://github.com/remix-run/react-router/blob/main/packages/react-router-native>)

## Paso previos
Lo primero que se necesita es tener un proyecto de react, puedes hacerlo directamente con `create-react-app` o con vite
    
```bash
    # create react app
    npx create-react-app router-tutorial
    
    # vite
    npm init vite@latest router-tutorial --template react
```

Con este paso hecho, vamos Para instalar la librería vamos a la terminal encima de nuestro proyecto react, y tipeamos lo siguiente:

```
npm i react-router-dom
```

Una vez instalado, en el documento de `[project-folder]\src\app.jsx` importamos las siguientes dependencias:

```
import { BrowserRouter, Route, Routes } from "react-router-dom";
```

Para lo siguiente vamos a generar algunos componentes que nos sirvan de páginas para la aplicación, siguiendo la siguiente estructura de carpetas

- \src\
    - App.jsx
    - \layout\
        - Main.jsx
    - \pages\
        - CreateClient.jsx
        - ListClient.jsx

En los documentos alojados en la carpeta \pages\ vamos a agregar lo siguiente:

```jsx
import React from 'react';

const CreateClient= () => {
    return (
        <div>
            Create CLient
        </div>
    );
};

export default CreateClient;
```

```jsx
import React from 'react';

const ListClient= () => {
    return (
        <div>
            Index CLient
        </div>
    );
};

export default ListClient;
```

Volvemos al documento src\App.jsx y lo primero que vamos a instanciar es `BrowserRouter`, para generar un nuevo routing, cargando diferentes endpoints y cargando los componentes que vamos a definir.

Una vez colocada la etiqueta de apertura y cierre de `BrowserRouter`, dentro vamos a colocar las etiquetas de `Routes`, que a su vez dentro va a contener las etiquetas Route. Así que nuestro código debería verse así:

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import CreateClient from "./pages/CreateClient";
import EditClient from "./pages/EditClient";
import ListClientfrom "./pages/ListClient";

function App() {
  return (
    <BrowserRouter>
        <Route>
          <Route/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

<aside>
💡 Anatomía de un `<Route/>`
Dentro de la etiqueta se definen los siguientes atributos:
`path=”/ruta”element={<ComponenteQueSeVaARenderizar/>}`
</aside>

A partir de aquí vamos a aprovechar una de las virtudes de la nueva versión de react-route-dom, que se denomina nested route, que no sería más que rutas embebidas, o anidadas, con esto podemos hacer una ruta principal, y que de esta vayan generando nuevas sub-rutas.

<aside>
💡 rutas con variables, por ejemplo, al momento de editar o mostrar un registro determinado, utilizamos identificadores, que transferimos por el método get (que generalmente se agrega al final de la cabecera), para manejar esto con react-route-dom, tenemos placeholder, en donde podemos definir que tipo de valor se espera en una URL
Ejemplo:
`<Route path="edit/**:id**" element={<EditClient/>} />`
para definir un placeholder, solo debemos colocar ***dos puntos (:)*** seguido de la variable esperada
</aside>

<aside>
💡 Anatomía de un `<Route/>`anidado
Para generar rutas anidadas solo tienes que colocar la etiqueta route con apertura y cierre, para que dentro de ella se contengan las rutas anidadas dentro de etiquetas sin cierre
`<Route path=”/client” element={<Layout/>}><Route element={<ListCliente>/}/></Route>`
</aside>

Ya con esto deberíamos tener un src\App.jsx de la siguiente manera:

Para definir la ruta principal dentro de las rutas anidadas, es importante destacar dos cosas, la primera (por convención) ruta no debe tener el atributo `path`, lo segundo es que puede especificar que es la principal con el atributo `index`, como se puede apreciar en el ejemplo

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import CreateClient from "./pages/CreateClient";
import EditClient from "./pages/EditClient";
import ListClientfrom "./pages/ListClient";

function App() {

  return (
    <BrowserRouter>
        <Route path="/" element={<Main />}>
          <Route index element={<ListClient/>} />
          <Route path="add" element={<CreateClient/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

Aprovechando las nuevas características de react-router dom, vamos a manejar las vistas a través de un layout, para ello necesitamos utilizar otra nueva función de la librería que es `<Outlet/>`, que agregaremos a nuestro `layout\\Main.jsx`

<aside>
💡 `<Outlet/>` nos permite manejar una estructura de layout en donde cada que sea necesario se ira inyectando el componente solicitado
</aside>

Esto nos permite desarrollar de forma modular, incluso mantener la estructura de la página seccionada, usando por ejemplo un componente para el `<sidebar>`, `<header>`, `<footer>`, contenido y demás

También estaremos integrando al proyecto otras funcionalidades propias de react-route-dom, como `Link` o `NavLink`.

`<Link>` es un conveniente sustituto de `<a>`, ya que al usar anchor→<a> que cada que se clickea recarga la página y  re-renderiza cada componente , en cambio, con link, se ahorra el recargar página y carga y actualiza solo los componentes correspondientes a la URL

<aside>
💡 Anatomía [básica] de un `<Link>`
Se asemeja mucho a anchor, solo que se plantea con algunas diferencias
`to` → `href` : el string u objeto con una ruta definida,
replace : remplaza
classname: para agregar clases
</aside>

También podemos usar un hook, para mostrar en que parte de la app estamos ubicados o pasar parámetros a través de la URL, este es el hook `useLocation()`, en donde nos muestra si le damos `console.log()` nos devuelve un objeto con los siguientes valores:

```jsx
//token de seguridad
hash:""
key: "default"
//la dirección donde se encuentra ubicado
pahtname: "client/add"
//rescata los valores GET, como por ejemplo client?id:20
search: ""
state: null

```

Podemos instanciarlo de la siguiente manera:

```jsx
const location = useLocation();
```

Ya con estos nuevos elementos definidos podemos estructurar nuestro proyecto de la siguiente manera:

```jsx
import { Outlet, Link, useLocation} from "react-router-dom";

const Main = () => {

  const location = useLocation();
  const activeUrl = location.pathname;
  return (
    <div>
				<h1>layout principal<h1>
				<h2>
          <Link to="/">Agenda de clientes</Link>
        </h2>
				<h2>
          <Link to="/add">Crear de clientes</Link>
        </h2>
		</div>
	  <div>
			<Outlet/>
		</div>
  );
};

export default Main;
```
ya con esto tenemos disponible las rutas de nuestro proyecto

Creditos de la img: Mouse interactive vector field by frank [[link]](https://codepen.io/franksLaboratory/pen/VwWGbPo)