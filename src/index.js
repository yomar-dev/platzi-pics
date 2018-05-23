'use strict'

/**
 * Objeto 'app'.
 * El objeto 'BrowserWindow' es quien nos permite cargar todo el contenido
 * visual de la aplicación de escritorio.
 */
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import devtools from './devtools'

let win;

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
	win = new BrowserWindow({
		width: 800,
		height: 600,
		title: "Hola Mundo!!",
		center: true,
		maximizable: true,
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
	 * Cargar archivo local.
	 */
	win.loadURL(`file://${__dirname}/renderer/index.html`)
})

/**
 * Recibir evento
 */
ipcMain.on('open-directory', (event) => {
	/**
	 * Configuración de la ventana de dialogo.
	 */
	dialog.showOpenDialog(win, {
		title: 'Seleccione la nueva ubicación',
		buttonLabel: 'Abrir ubicación',
		properties: ['openDirectory']
	},
	(dir) =>{
		/**
		 * Imprimir el directorio seleccionado.
		 */
		console.log(dir);
	});
});
