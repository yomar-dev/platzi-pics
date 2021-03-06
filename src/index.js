'use strict'

/**
 * Objeto 'app'.
 * El objeto 'BrowserWindow' es quien nos permite cargar todo el contenido
 * visual de la aplicación de escritorio.
 */
import { app, BrowserWindow } from 'electron'
import devtools from './devtools'
import setupErrors from './handle-errors'
import setMainIpc from './ipcMainEvents'

global.win;

/**
 * devtools() sólo se va a ejecutar si nos encontramos
 * en el ambiente de desarrollo.
 */
if(process.env.NODE_ENV === 'development'){
	devtools()
}

/**
 * 'before-quit': Es un evento que se ejecuta antes de cerrar la aplicación.
 */
app.on('before-quit', () => {
	console.log('Saliendo de la aplicacion')
})

/**
 * Para poder mostrar una ventana tenemos que esperar la aplicación
 * este lista y para eso utilizamos el evento 'ready'.
 */
app.on('ready', () => {
	/**
	 * Crear una ventana básica.
	 */
	global.win = new BrowserWindow({
		width: 800,
		height: 600,
		title: "Hola Mundo!!",
		center: true,
		maximizable: true,
		show: false // Ocultar al iniciar la aplicación.
	})

	setMainIpc(global.win)
	setupErrors(global.win)

	/**
	 * En 'once' los eventos se ejecutan una única vez.
	 * En 'on' los eventos se ejecutan multiples veces.
	 */
	global.win.once('ready-to-show', () => {
		/**
		 * Mostrar la ventana cuando se haya descargado todo el contenido de internet.
		 */
		global.win.show()
	})

	/**
	 * Evento que se dispara cuando la ventana sea cerrada.
	 */
	global.win.on('closed', () => {
		/**
		 * Eliminar el objeto 'win' de la memoria.
		 */
		global.win = null
		
		/**
		 * Salir de la aplicación.
		 */
		app.quit();
	})

	/**
	 * Cargar archivo local.
	 */
	global.win.loadURL(`file://${__dirname}/renderer/index.html`)
})