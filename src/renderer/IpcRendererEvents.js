import { ipcRenderer } from 'electron'

/**
 * Permite configurar todos los eventos que se van
 * a escuchar en el lado del proceso de renderizado.
 */
function setIpc(){
	ipcRenderer.on('pong', (event, arg) => {
		console.log(`Pong recibido ${arg}`);
	});
}

/**
 * Enviar un evento
 */
function openDirectory(){
	ipcRenderer.send('open-directory');
}

module.exports = {
	setIpc,
	sendIpc
}