# Platzi Pics

Proyecto del curso de Electron en Platzi.

Instalar Electron:<br>
`npm install electron --save`

Ejecutar el proyecto de Electron: <br>
`npm run dev`


**Ejemplo básico:** Para que este ejemplo funcione hay que modificar el *script* y dejarlo de la siguiente manera: `"dev": "electron index.js"`. <br>

~~~
'use strict'

/**
 * Objeto 'app'.
 */
const { app } = require('electron')

/**
 * Mostrar todo el contenido del objeto 'app'.
 */
console.dir(app)

/**
 * 'before-quit': Es un evento que se ejecuta antes de cerrar la aplicación.
 */
app.on('before-quit', () =>{
	console.log('Saliendo de la aplicación')
})

/**
 * Salir de la aplicación.
 */
app.quit();
~~~

<br><br>

### Notas ###
Para poder utilizar `electron-compile`, primero debemos desinstalar la anterior versión de `electron` y luego instalar `electron-compile` para evitar conflictos en nuestra aplicación.

**Desinstalar Electron:** `npm remove electron --save` <br>
**Instalar Electron Compile:** `npm install --save electron-compile` <br>

> Cabe destacar que `electron-compile` me permite utilizar la sintaxis **ES6** y lo transpila con **Babel** y devuelve código **Javascript** normal.

<br><br>

[Documentación oficial de Electron](https://electronjs.org/docs) <br>
[Documentación de muchas APIS](http://devdocs.io/) <br>
[Electron Compile](https://github.com/electron-userland/electron-compile)