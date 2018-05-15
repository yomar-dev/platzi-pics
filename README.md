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

**Cross Env:** Esta herramienta permite configurar variables de entorno para funcione de igual manera tanto en *Windows* como *Linux* y *Mac*, para instalarla se hace de la siguiente manera: `npm install cross-env --save`.

**Standard:** Herramienta de verificación de código.

**Electron Debug (DevTools):** Herramientas de desarrollo (Sólo se activa en un ambiente de desarrollo) <br>
Instalación: `npm i electron-debug -S`. <br>
Ejecución: `CTRL+SHIFT+I`. <br>

**DevTron:** Esta herramienta se debe instalar luego de haber instalado *Electron Debug*, y me permite hacer debug de aplicaciones dependiendo con que tecnología esté trabajando, por ejemplo: *ReactJS*, *Angular*, etc. <br>
Instalación: `npm install --save-dev devtron`. <br>
Para poder ver la pestaña de **DevTron** hay que ejecutar el siguiente comando en la consola de la aplicación (navegador) `require('devtron').install()`.

<br><br>

[Documentación oficial de Electron](https://electronjs.org/docs) <br>
[Documentación de muchas APIS](http://devdocs.io/) <br>
[Electron Compile](https://github.com/electron-userland/electron-compile) <br>
[Standard](https://www.npmjs.com/package/standard) <br>
[Electron Debug](https://www.npmjs.com/package/electron-debug) <br>