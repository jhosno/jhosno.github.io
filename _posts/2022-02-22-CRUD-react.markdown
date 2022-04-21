---
layout: post
title:  "CRUD ReactJS"
date:   2022-02-22 12:00:00 -0400
categories: [Reactjs, tutorial]
image: reactjs3.png
alt: "ReactJS, como hacer un CRUD | Crédito: CSS Generative Pattern Circles crankysparrow at CodePen"
extract: "¿Quiéres hacer un CRUD en reactJS y no sabes como empezar? Aquí puedes hacerte una idea de como funciona la librería, a parte de usar tailwindsCSS . ¿Quieres saber más? Sigue leyendo"
---

El objetivo es hacer un CRUD básico con React.js, usando Vite.js, LocalStorage, Tailwinds CSS. El resultado será un pequeño módulo que nos ayudará a registrar los monsties que tenemos en nuestro equipo, inspirado en el juego Monster Hunter Stories. Aquí puedes ver el resultado final -> [[link]](https://jhosno.github.io/MHST-monster/), por el otro lado, aquí puedes encontrar el repo [[link]](https://jhosno.github.io/equipo-monstie/)

## Requerimientos:

- Node.js
- Editor de código (VS Code)
- Navegador web (Mozilla Firefox)
- GIT
- Consola (cmder)
- Extensión React Developer Tools

### Setup

Instalaremos VITE.js, para esto puedes ir a revisar el post de vite.js [[link]](https://jhosno.github.io//vitejs/automatizador/vitejs)

Y además instalaremos *tailwinds*, esto nos ayudará a desarrollar la interfaz, para ello en la consola sobre el directorio del proyecto tipeamos lo siguiente:

```bash
//instalando tailwinds css
> npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
//iniciando tailwinds en el proyecto, creando dos documentos tailwinds.config.js
//y postcss.config.js
> npx tailwindcss init -p
```

Esto nos creará dos nuevos documentos: ***/postcss.config.js*** y ***/tailwinds.config.js***
Dentro del documento ***/tailwind.config.js*** agregaremos en el arreglo de *purge* los archivos: ***index.html*** y todos los documentos dentro de ***/src*** y cualquier sub carpeta (/**/) dentro de esta que tengan las extensiones de ***.jsx*** (*.jsx). Esto hará que cualquier estilo que no se esté utilizando se quite del proyecto para hacerlo más rápido y eficiente.

```jsx
purge: ["./index.html", "./src/**/*.jsx"],
```



## Primeros pasos

Al iniciar el proyecto notaremos que está la pantalla por *default* de un proyecto de react, lo primero que necesitamos hacer es dejar esto en limpio la función de *return* del componente ***/app.jsx***:

```jsx
import { useState } from 'react'
//Toca agregar tailwindcss al app.jsx
import "tailwindcss/tailwind.css"
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h2>hola</h2>
      
    </div>
  )
}

export default App
```

Aparte de eso vamos a eliminar el contenido del archivo ***/index.css***, y aprovechamos de importar las librerías de *tailwinds* en  de la siguiente manera:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```
Aparte eliminaremos el archivo ***/app.css***, ya que no será necesario.
### Componentes

Creamos una carpeta ***/components***, que como puedes esperar contendrá todos los componentes del sistema. Esto nos ayudará a tener un sistema organizado.

Lo primero que vamos a hacer es agregar unos estilos en el archivo ***/index.html***

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
     <link rel="icon" href="https://jhosno.github.io/assets/images/favicon.png" type="image/gif" sizes="16x16">
     
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HMST | Mis monsties 🐱‍🐉 </title>
  </head>
  <body class="h-screen bg-green-100">
    <div id="root" class=""></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Seguimos con crear el *Header.jsx*, dentro de la carpeta ***/components*** con el título del módulo, y una corta descripción de lo que se espera que haga el programa.

Sí estás usando VS Code, puedes descargar la extensión llamada Reactjs code snippets by charalampos karypides

<aside>
💡 ***rsc***→ es el atajo de la extensión *reactjs code snippets by charalampos karypides* que te permite crear rápidamente el esqueleto de un componente

</aside>

El resultado va a verse como esto: 

```jsx
import React from 'react'

const Header = () => {
    return ( 
        <header className="mx-auto 
        p-3">
            <h1 className="text-green-800 font-black text-center text-4xl uppercase p-10">
            🐱‍🐉🐲 Monsties 🦎🐉</h1>
            <p className="text-md font-bold text-center text-green-600">
                ¡Agenda a los monsties de tú equipo!</p>
        </header>
     );
}
 
export default Header;
```

Como pueden observar en la primera línea está el *import* React que en nuevas generaciones no es necesario, pero como todavía está vigente en algunos sistemas lo dejamos con fines de ejemplificar.

Seguido del componente como una *function expression*, y su respectivo *export*

Para verlo funcionar en nuestra app principal debemos importarlo en nuestro archivo ***/App.jsx***. Así que nos debería ir quedando algo así 

```jsx
import { useState } from 'react';
import './App.css';
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App container">
      <Header/>

    </div>
  )
}

export default App
```

Ahora vamos con la primera parte del *Create, Read, Update, Delete* ***(CRUD):*** Crear el registro.

Así que dentro de nuestra carpeta ***/components*** vamos a crear un archivo llamado ***/Form.jsx***, aquí es donde las cosas se empiezan a tornar interesantes, empezaremos a manejar información y a validarla

```jsx
import React from "react";

const Form = () => {
  return (
    <div className="md:w-1/2 lg:w-2/5 mb-5">
      <h2 className="text-green-700 font-bold text-center text-xl  p-5">
        Agrega tu nuevo monstie
      </h2>
      <form className="bg-gray-50 p-8 m-5 ml-10 rounded-2xl">
        <div className="my-6">
          <label
            htmlFor="nick"
            className="block text-gray-700 font-semibold uppercase"
          >
            Nickname
          </label>
          <input
            type="text"
            name="nick"
            id="nick"
            className="w-full  p-2 border-2 rounded-lg"
          />
        </div>

        <div className="my-6">
          <label
            htmlFor="breed"
            className="block text-gray-700 font-semibold uppercase"
          >
            Raza
          </label>
          <input
            type="text"
            name="breed"
            id="breed"
            className="w-full  p-2 border-2 rounded-lg"
          />
        </div>
        <div className="my-6">
          <label
            htmlFor="rarity"
            className="block text-gray-700 font-semibold uppercase"
          >
            Rareza
          </label>
          <input
            type="text"
            name="rarity"
            id="rarity"
            className="w-full  p-2 border-2 rounded-lg"
          />
        </div>
        <div className="my-6">
          <label
            htmlFor="trend"
            className="block text-gray-700 font-semibold uppercase"
          >
            Tendencia de ataque
          </label>
          <select
            name="trend"
            id="trend"
            className="w-full  p-2 border-2 rounded-lg"
          >
            <option value="">Selecciona una opción</option>
            <option value="power">Potente</option>
            <option value="speed">Ágil</option>
            <option value="technique">Técnico</option>
          </select>
        </div>
        <div className="flex justify-items-end">
          <input
            className="bg-green-900 rounded-md shadow-3xl border-3 border-white text-green-300 py-2 px-4 font-semibold uppercase 
          hover:text-green-900 hover:bg-green-300 cursor-pointer"
            type="submit"
            value="Agregar"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
```

Este sería la estructura base del form, por ahora solo tiene los campos y estilos, pero vamos a validarlo, para ello haremos uso de una de las grandes virtudes de REACT, sus *hooks*, para ser específicos *useState()*

### Agregando useState

Para empezar debemos asegurarnos que disponemos de ello en el componente, así que lo importaremos, lo único que tenemos que hacer es importar el paquete *useState* entre corchetes, y ya estaremos listos para empezar a usar *hooks*

```jsx
import React, {useState} from "react";
```

- Anatomía de useState:
    
    ```jsx
    const [state, setState] = useState("Valor inicial")
    ```
    
    En general se va a ver como el ejemplo anterior, es un arreglo (por eso las variables dentro de el están delimitadas con corchetes → [ ]) definido como constante *const*, que por defecto tiene una función *(useState)* que inicia con un valor predeterminado (lo que está dentro del paréntesis), puede ser un *int, string, array, object o vacio.*
    
    En el primer objeto del arreglo tendremos los valores almacenados en el hook
    
    En el segundo tenemos una  *function* que por combinación empezará con *set<<Name>>*, esta la usaremos para alterar los valores contenidos en el hook
    

Ahora agregamos un *useState* por cada *input* del *form*, esto nos permitirá manejar las validaciones 

```jsx
const Form = () => {
    const [nick, setnick] = useState("")
    const [breed, setbreed] = useState("")
    const [rarity, setrarity] = useState("")
    const [trends, settrends] = useState("")
  return (
```

Como se puede apreciar, los *useState* en este caso los iniciaremos vacíos, eso es por qué al empezar el form los campos también están vacíos, si quieres comprobar que los *hooks* están bien definidos puedes abrir tu herramienta de desarrollador (F12) e ir al apartado de components de la extensión de *react* y verás algo como esto:

Ahí están todos tus *hooks* vacíos. Ahora lo que toca es hacer que reaccionen a los cambios de los *inputs*, además de que el valor sea siempre el del *useState*, para ello vamos a hacer lo siguiente, vamos a escuchar los cambios en el *input* con un *onChange*. Aquí el ejemplo:

```jsx
<input
    type="text"
    name="nick"
    id="nick"
    value="nick"
    onChange={(e) => setnick(e.target.value)}
    className="w-full  p-2 border-2 rounded-lg"
 />
```

- Anatomía de este onChange
    
    ```jsx
    onChange={(e) => setnick(e.target.value)}
    ```
    
    El contenido de *onChange* está entre paréntesis porque lo que vamos a colocar ahí es código, recuerda que lo estás manejando no es un archivo HTML o un JS, sino, algo que bebe de lo mejor de ambos → *JSX*.
    
    Luego tenemos un arrow function que recibe el parámetro *e/event* y dentro de este arrow function le decimos que cambie el valor del *useState nick* con la *function setnick()*, que recibe el valor del input con →  *e.target.value.*
    
    Los cambios puedes verlo en la pestaña de components de herramientas de desarrollador
    

Este proceso lo repetimos con todos los *inputs*. Al finalizar ya estaremos tomando los valores de cada input y almacenándolos en su correspondiente *useState*, entonces, procedemos a validar datos.

### Validación de datos

Para la validación utilizaremos una función predeterminada de react, *onSubmit()*, además haremos una función que utilizaremos como manejador de eventos, para validar cada *input* usaremos los *useState*.

Así que empezaremos con agregar el *onSubmit* llamando a una función, deberíamos tener una etiqueta form de esta manera:

```jsx
<form className="bg-gray-50 p-8 m-5 ml-10 rounded-2xl"
      //sin parentesis porque entonces llamas directamente la función y  se va a ejecutar automáticamente a cada rato 
      onSubmit={handleSubmit}
>
```

Ahora vamos a desarrollar la función manejadora, al principio colocamos *e.preventDefault()*, para evitar que la página se recargue cada que hagamos clic en el botón de *submit.*

Lo segundo es colocar los valores de *useState* en el arreglo, así que usaremos *.include()*, buscando espacios vacíos, si existe un input vacío entonces mandar una alerta, de lo contrario pasar a enviar el form:

```jsx
const handleSubmit=(e) =>{
	//para evitar que la página se recargué al anviar el form
        e.preventDefault()

        //ahora preguntamos sí los campos están vacíos
        //Para eso usamos las variables de useState que representan cada uno de los inputs
        if([nick, breed, rarity, trends].includes('')){
            //los metemos en un array y con la function includes, preguntamos si hay alhuna variable vacía
            console.log('debes rellenar todos los campos')
            //Ahora que ya validamos debemos mostrarle al usuario que faltana campos
        }else{
            console.log('perfect!')
        }
}
```

Ya con eso tenemos las validaciones, pero solo pueden verse en consola, así que vamos a hacer un nuevo componente para hacer una alerta de error, que podemos reutilizar en diferentes escenarios:

```jsx
import React from 'react'

function Errors({message}) {
    return (    
      <div className="bg-red-700 bg-opacity-80 text-gray-100 p-4 my-2 rounded-xl">
        <span className="py-2 px-3 bg-red-700 rounded-3xl mr-3">❕</span>
        {message}
      </div>
        
    )
}

export default Errors
```

Aquí tenemos un componente que va a estar recibiendo un mensaje que estaremos enviando desde en componente *form*.

Lo siguiente que vamos a realizar es un *useState*, para manejar los estados de error

```jsx
const [error, seterror] = useState(false)
```

La lógica es la siguiente: cada vez que error sea *true*, se mostrará el error, caso contrario, no se muestra el error. 

```jsx
//handleSubmit recibe la variable e/event que es el resultado del form
    const handleSubmit= (e) =>{
        //para evitar que la página se recargué al anviar el form
        e.preventDefault()

        //ahora preguntamos sí los campos están vacíos
        //Para eso usamos las variables de useState que representan cada uno de los inputs
        if([nick, breed, rarity, trends].includes('')){
            //los metemos en un array y con la function includes, preguntamos si hay alguna variable vacía
            console.log('Debes rellenar todos los campos')
            //Ahora que ya validamos debemos mostrarle al usuario que faltana campos
            seterror(true)
        }else{
            console.log('perfect!')
            seterror(false)
        }
    }
```

Con esta función terminada ahora pondremos en marcha este *useState*. Pero antes, necesitamos agregar un operador ternario

```jsx
{error ? <Errors mensaje="Debes llenar todos los campos" /> : null}
```

## Guardar datos en useState

Ahora vamos a almacenarlos para poder listarlos, así que vamos a hacer un *useStates* en el componente padre App, que llamaremos monsters, que iniciara con 

```jsx
const [monsters, setmonsters] = useState([])
```

Ahora pasaremos estós elementos al *form* de la siguiente manera:

```jsx
<Form
   monsties = {monsties}
   setmonsties = {setmonsties}
      />
```

Desde *form* vamos a extraer las variables del arreglo y empezar a actualizar el state 

```jsx
const Form = ({monsties, setmonsties}) => {
```

Para la siguiente parte crearemos un objeto con datos que necesitamos, tomando los valores almacenados en los *hooks*, y debe verse de la siguiente forma:

```jsx
const addMonstie = {
        nick,
        breed,
        rarity,
        trends,
	    id: idGenerator(),
      }
```

El *idGenerator* es un pequeño script que nos ayudara a crear un ID único sin necesidad de librerías externas, esto será muy útil en las siguientes operaciones. Y la función es la siguiente: 

```jsx
const idGenerator = () =>{
      return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }
```

Lo siguiente que haremos será almacenarlos en el *array* de *monsties* a través de *setmonsties* que acabamos de traer de App.js

**Lógica de la solución:** el *setMonstie* actualiza los valores de *monsties*, sustituyendo los viejos valores por los valores que le estamos ingresando, así que para evitar sobreescribir los datos, pasaremos primero lo que está contenido en monstie y luego agregaremos el nuevo objeto. Teniendo como resultado lo siguiente: 

```jsx
//handleSubmit recibe la variable e/event que es el resultado del form
    const handleSubmit= (e) =>{
      //para evitar que la página se recargué al anviar el form
      e.preventDefault()
      
      const addMonstie = {
        nick,
        breed,
        rarity,
        trends
      }
        //ahora preguntamos sí los campos están vacíos
        //Para eso usamos las variables de useState que representan cada uno de los inputs
        if([nick, breed, rarity, trends].includes('')){
            //los metemos en un array y con la function includes, preguntamos si hay alhuna variable vacía
            
            //Ahora que ya validamos debemos mostrarle al usuario que faltana campos
            seterror(true)
            return
        }else{
            console.log('perfect!')
            seterror(false)
            //Agregamos el nuevo objeto con los valores del monstie
            setmonsties([...monsties, addMonstie])

        }
```

Ya con esto podemos empezar a listar los *monsties* que tenemos almacenados

## Listar monsties

Como habrás podido imaginar ahora corresponde hacer un componente para listar los *monsties* que ahora vamos almacenando en nuestro *hook*.

Así que vamos a crear un documento que contenga lo siguiente: 

```jsx
import React from "react";

function List({monsties}) {
  return (
    <div className="md:w-1/2 lg:w-3/5 mb-5">
      <h2 className="text-green-700 font-bold text-center text-xl  p-5">
        Estos son los monsties de tu equipo
      </h2>
			
    </div>
  );
  }
export default List;
```

Con el componente base listo ahora toca agregarlo a nuestro componente base ***/App.jsx***, aprovechamos de pasar de una vez los 

Debería verse más o menos así: 

```jsx
import { useState } from 'react';
import "tailwindcss/tailwind.css";
import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import List from './components/List';

function App() {
  const [count, setCount] = useState(0)
  const [monsties, setmonsties] = useState([])

  return (
    <div className="App container h-screen">
      <Header/>
      <div className="flex mt-12  xs:flex-col  md:flex-row">
        <Form
          monsties = {monsties}
          setmonsties = {setmonsties}
        />
        <List
          monsties = {monsties}
        />
      </div>

    </div>
  )
}

export default App
```

Una vez teniendo este nuevo componente, la intención es listar cada uno de los objetos del arreglo monsties, cada uno de ellos se verá en una tarjeta, en donde podremos acceder a las opciones de editar y eliminar (las cuales habilitaremos próximamente). Así que vamos a hacer un nuevo componente que será hijo del componente ***/List.jsx***

```jsx
import React from "react";

function Card({monstie}) {
  return (
    <div className="bg-gray-50 p-8 m-5 ml-10 rounded-2xl">
      <p className="text-green-700 font-black  text-lg tracking-wide uppercase">
        nick:{" "}
        <span className="text-gray-800 font-semibold capitalize ">nick</span>
      </p>
      <p className="text-green-700 font-black  text-lg tracking-wide uppercase">
        Raza:{" "}
        <span className="text-gray-800 font-semibold capitalize ">nick</span>
      </p>
      <p className="text-green-700 font-black  text-lg tracking-wide uppercase">
        Rareza:{" "}
        <span className="text-gray-800 font-semibold capitalize ">nick</span>
      </p>
      <p className="text-green-700 font-black  text-lg tracking-wide uppercase">
        Ataque:{" "}
        <span className="text-gray-800 font-semibold capitalize ">nick</span>
      </p>
      <div className="flex justify-between mt-4">
        <button className="cursor-pointer py-3 px-5 bg-green-800 text-green-100 uppercase font-bold tracking-wide rounded-md hover:bg-green-100 hover:text-green-800">
          ✏ Edit
        </button>
        <button className="cursor-pointer py-3 px-5  text-red-600 uppercase font-bold tracking-wide rounded-md hover:bg-red-600 hover:text-red-100">
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
```

Este lo vamos a importar al componente List.jsx, además, desde aquí vamos a manejar los datos que van a alimentar cada una de las tarjetas, para eso usaremos la función de alto nivel *.map()*, con ella recorreremos cada uno de los objetos del arreglo y personalizar cada una de las tarjetas

```jsx
{monsties.map((monstie) =>(
          <Card 
			monstie= {monstie}
          />  
        ))}
```

Ahora en nuestro componente Card, extraemos las propiedades y colocamos cada dato donde corresponde 

```jsx
import React from "react";

function Card({monstie}) {
	const {nick, rarity, breed, attack, id} = monstie
  return (
    <div className="bg-gray-50 p-8 m-5 ml-10 rounded-2xl">
      <p className="text-green-700 font-black  text-lg tracking-wide uppercase">
        nick:{" "}
        <span className="text-gray-800 font-semibold capitalize ">{nick}</span>
      </p>
      <p className="text-green-700 font-black  text-lg tracking-wide uppercase">
        Raza:{" "}
        <span className="text-gray-800 font-semibold capitalize ">{breed}</span>
      </p>
      <p className="text-green-700 font-black  text-lg tracking-wide uppercase">
        Rareza:{" "}
        <span className="text-gray-800 font-semibold capitalize ">{rarity}</span>
      </p>
      <p className="text-green-700 font-black  text-lg tracking-wide uppercase">
        Ataque:{" "}
        <span className="text-gray-800 font-semibold capitalize ">{attack}</span>
      </p>
      <div className="flex justify-between mt-4">
        <button className="cursor-pointer py-3 px-5 bg-green-800 text-green-100 uppercase font-bold tracking-wide rounded-md hover:bg-green-100 hover:text-green-800">
          ✏ Edit
        </button>
        <button className="cursor-pointer py-3 px-5  text-red-600 uppercase font-bold tracking-wide rounded-md hover:bg-red-600 hover:text-red-100">
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
```

## Editar registros

Ahora viene una de las cosas más interesantes, Editar, para esto necesitamos tener un ID para cada objeto, y poder editarlo, además desde la App.jsx vamos a crear un nuevo *hook*, para contener el registro a editar, tendrá un objeto vacío, puesto que nuestro arreglo de *monsties* contiene objetos

```jsx
const [monstie, setmonstie] = useState({})
```

Ahora vamos a pasar *setmonstie* para actualizar cuál *monstie* quieres editar

```jsx
onClick={() => setmonstie(monstie)}
```

Ya con esto una vez operativo, vamos a mostrar el contenido en el form y hacer que sea un formulario útil tanto para crear como para editar

El primer paso es pasar monstie y setmonstie al componente Form.jsx, con esto podremos actualizar es estatus del Form cada vez que sea necesario editar.

Pero antes, vamos a utilizar un nuevo hook, usaremos un useEffect, esto nos permitirá actualizar los componentes una vez estén cargados, vamos la lógica de este nuevo hook

- Anatomía de useEffect
    
    ```jsx
    useEffect(()=>{
    	//Runs on the first render
      //And any time any dependency value changes
    },[prop, state])
    
    ```
    
    Este *hook* necesita dos valores una función y propiedades, useEffect(<function>, <dependency>), cuando no tiene dependencias se ejecuta en cualquier render, cuando tiene un arreglo vacío solo se ejecuta en el primer render, cuando tiene una propiedad, solo se ejecuta cuando esta propiedad presenta algún cambio
    

Para útilizarlo debe ser importado, junto con *useState*

```jsx
import React, { useState, useEffect } from "react";
```

```jsx
const Form = ({ monsties, setmonsties, monstie, setmonstie }) => {
  const [nick, setnick] = useState("");
  const [breed, setbreed] = useState("");
  const [rarity, setrarity] = useState("");
  const [trends, settrends] = useState("");

  const [error, seterror] = useState(false);
  //generar ID único
  const idGenerator = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  //handleSubmit recibe la variable e/event que es el resultado del form
  const handleSubmit = (e) => {
    //para evitar que la página se recargué al anviar el form
    e.preventDefault();
//Este es un objeto temporal para almacenar los datos del monstie que estaremos trabajando
    const addMonstie = {
      nick,
      breed,
      rarity,
      trends
    };
    //ahora preguntamos sí los campos están vacíos
    //Para eso usamos las variables de useState que representan cada uno de los inputs
    if ([nick, breed, rarity, trends].includes("")) {
      //los metemos en un array y con la function includes, preguntamos si hay alhuna variable vacía

      //Ahora que ya validamos debemos mostrarle al usuario que faltana campos
      seterror(true);
      return;
    }
//de lo contrario, se resetea el valor de error a false
    seterror(false);

//Ahora vamos a verificar si el state monstie tiene un ID asociado, de ser así
//Estaremos editando. De lo contrario estariamos creando un nuevo registro
    if (monstie.id) {
      //Edit
      console.log("Update");
			//Le asignamos el ID del state monstie al objeto temporal addMonstie
      addMonstie.id = monstie.id;
//Ahora viene la parte "compleja", sustituir los nuevos valores por los nuevos 
//Así que usaremos la función .map(), la lógica es lo siguiente

//Con la función .map(), recorrera cada uno de los elementos del arreglo (monstieState) y valida si el ID de monstieState.id es igual a addMonstie.id(nuestro objeto temporal con los nuevos datos) entonces sustituye ese monstieState por addMonstie (si son iguales vamos a sustituir), de lo contrario devuelve el mismo valor
//Este nuevo arreglo lo vamos a almacenar en la variable updateMonstie
      const updateMonstie = monsties.map((monstieState) =>
        monstieState.id === addMonstie.id ? addMonstie : monstieState
      );
//YA con este nuevo arreglo actualizamos el state monsties
      setmonsties(updateMonstie);
//Y para finalizar vamos a resetear el obejto monstie
      setmonstie({});
    } else {
      //Create
      console.log("Add");
//aquí vamos agregar el id a este nuevo registro
      addMonstie.id = idGenerator();
      //Agregamos el nuevo objeto con los valores del monstie
      setmonsties([...monsties, addMonstie]);
    }

    //resetea el form agregando valores vacios al state
    setnick("");
    setbreed("");
    setrarity("");
    settrends("");
 
  };
```

### Eliminar registros

Para esto necesitaremos crear una nueva función, y lo colocaremos en el ***/App.jsx***, la lógica detrás de esto es que cada vez que se pulse el botón *delete*, se ejecutará una función, que al recibir una respuesta positiva hará que se actualice este state, con estos valores, se filtra el arreglo de *monstie* y se actualizan valores.

- Anatomía de deleteMonstie
    
    ```jsx
    const deleteMonstie = (id) =>{
        const monstieAfterDelete = monsties.filter(
          monstie=> monstie.id !== id
        )
        setmonsties(monstieAfterDelete)
      }
    ```
    
    Esta nueva función recibe el ID del objeto que vamos a utilizar, ahora lo que vamos a hacer es filtrar que los registros que se almacenen en el nuevo arreglo sean diferentes al ID dado, y todo esto almacenamos un una nueva variable que luego transformaremos en los valores definitivos de *monsties*
    

Una vez teniendo el script para eliminar monsties, lo que necesitamos es pasarlo al componente card a través de su componente padre List.

Una vez ahí vamos a asociar el evento *onClick* a una función manejadora, que llamaremos *handleDelete*. Dentro de esta vamos a hacer un *confirm*, si es positivo, se ejecuta la función heredada *deleteMonstie()* con el ID de la tarjeta seleccionado, y debe verse algo como esto 

```jsx
const handleDelete = ()=>{
      const answer = confirm("¿Quieres remover este monstie de tu equipo?");

      if(answer){
        deleteMonstie(id)
      }
    }
```

Ya con esto finalizamos lo que es el CRUD, pero antes de terminar vamos a hacer que estos datos sean persistentes en navegador en donde lo ejecutamos, para eso utilizaremos *localstore*

## Percistencia de datos - LocalStore

Desde nuestro directorio ***/App.jsx***, vamos a agregar un *localstorage*, pero para hacer que este se ejecute una vez iniciada la App, o cuando se actualice, utilizaremos *useEffect*

```jsx
//Carga los registros almacenados en localStore
useEffect(()=>{
  const getLocalStore = ()=>{
//Como los datos almacenados son tipo JSON, para vizualizarlos toca tratar
//los datos con .parse()
    const monstieLocalStore = JSON.parse(localStorage.getItem('monsties'))

    setmonsties(monstieLocalStore)
  }
  getLocalStore()
}, [])

//Escribe y actualiza el localStore
	//Para guardar los datos hay que hacer que el arreglo se convierta en JSON 
useEffect(()=>{
  localStorage.setItem('monsties', JSON.stringify(monsties))

}, [monsties])
```

Y ya con esto finalizamos.

Créditos de la imágen: (CSS Generative Pattern Circles by crankysparrow at CodePen)[https://codepen.io/crankysparrow/pen/poeeVbZ]
