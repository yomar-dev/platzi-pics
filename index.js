'use strict'

/**
 * Objeto 'app'.
 * El objeto 'BrowserWindow' es quien nos permite cargar todo el contenido
 * visual de la aplicación de escritorio.
 */
const { app, BrowserWindow } = require('electron')

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
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		title: "Hola Mundo!!",
		center: true,
		maximizable: false,
		show: false // Ocultar al iniciar la aplicación.
	})

	/**
	 * En 'once' los eventos se ejecutan una única vez.
	 * En 'on' los eventos se ejecutan multiples veces.
	 */
	win.once('ready-to-show', () => {
		/**
		 * Mostrar la ventana cuando se haya descargado todo el contenido de internet.
		 */
		win.show()
	})

	/**
	 * Evento que se ejecuta al mover la ventana.
	 */
	win.on('move', () => {
		const position = win.getPosition()
		console.log(`La posición de la ventana es: ${position}`)
	})

	/**
	 * Evento que se dispara cuando la ventana sea cerrada.
	 */
	win.on('closed', () => {
		/**
		 * Eliminar el objeto 'win' de la memoria.
		 */
		win = null
		
		/**
		 * Salir de la aplicación.
		 */
		app.quit();
	})

	/**
	 * Cargar URL externa.
	 */
	win.loadURL('http://devdocs.io/')
})
