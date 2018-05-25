import { ipcRenderer } from 'electron'
import { addImagesEvents, changeImage, selectFirstImage, clearImages, loadImages } from './images-ui'

/**
 * Permite configurar todos los eventos que se van
 * a escuchar en el lado del proceso de renderizado.
 */
function setIpc(){
	ipcRenderer.on('load-images', (event, images) => {
		clearImages();
		loadImages(images);
		addImagesEvents();
		selectFirstImage();
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
	openDirectory
}