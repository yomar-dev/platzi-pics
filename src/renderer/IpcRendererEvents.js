import { ipcRenderer } from 'electron'
import { addImagesEvents, changeImage, selectFirstImage, clearImages, loadImages } from './images-ui'
import { saveImage } from './filters'
import path from 'path'

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

	ipcRenderer.on('save-image', (event, file) => {
		saveImage(file)
	});
}

/**
 * Enviar un evento
 */
function openDirectory(){
	ipcRenderer.send('open-directory');
}

/**
 * Guardar imagen
 */
function saveFile(){
	/**
	 * Obtener la extensión de la imagen original
	 */
	const image = document.getElementById('image-displayed').dataset.original;
	const ext = path.extname(image);

	ipcRenderer.send('open-save-dialog', ext);
}

module.exports = {
	setIpc,
	saveFile,
	openDirectory
}