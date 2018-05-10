'use strict'

/**
 * Objeto 'app'.
 */
const { app } = require('electron')

/**
 * Ver todas las propiedades del objeto 'app'.
 */
console.dir(app)

/**
 * 'before-quit': Es un evento que se ejecuta antes de cerrar la aplicación.
 */
app.on('before-quit', () =>{
	console.log('Saliendo de la aplicacion')
})

/**
 * Salir de la aplicación.
 */
app.quit();