import { ipcRenderer } from 'electron'

/**
 * Permite configurar todos los eventos que se van
 * a escuchar en el lado del proceso de renderizado.
 */
function setIpc(){
	ipcRenderer.on('load-images', (event, images) => {
		clearImages();
		console.log(images);
	});
}

/**
 * Enviar un evento
 */
function openDirectory(){
	ipcRenderer.send('open-directory');
}

/**
 * Limpiar el listado de imagenes.
 */
function clearImages(){
	const oldImages = document.querySelectorAll('li.list-group-item');
	let totalRecords = oldImages.length;
	for (var i = 0; i < totalRecords; i++) {
		oldImages[i].parentNode.removeChild(oldImages[i]);
	}
}

module.exports = {
	setIpc,
	openDirectory
}