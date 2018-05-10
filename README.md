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

[Documentación oficial de Electron](https://electronjs.org/docs)
