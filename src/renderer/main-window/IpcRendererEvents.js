import { ipcRenderer, remote } from 'electron'
import settings from 'electron-settings'
import { addImagesEvents, changeImage, selectFirstImage, clearImages, loadImages } from './images-ui'
import { saveImage } from './filters'
import path from 'path'
import os from 'os'

/**
 * Permite configurar todos los eventos que se van
 * a escuchar en el lado del proceso de renderizado.
 */
function setIpc(){
	if(settings.has('directory')){
		ipcRenderer.send('load-directory', settings.get('directory'));
	}

	ipcRenderer.on('load-images', (event, dir, images) => {
		clearImages();
		loadImages(images);
		addImagesEvents();
		selectFirstImage();
		settings.set('directory', dir);
	});

	ipcRenderer.on('save-image', (event, file) => {
		saveImage(file, (err) => {
			if(err)	return showDialog('error', 'Platzipics', err.message)

			showDialog('info', 'Platzipics', 'Imagen guardada')
		})
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

/**
 * Mostrar ventana de dialogo
 */
function showDialog(type, title, message){
	ipcRenderer.send('show-dialog', { type: type, title: title, message: message });
}

function openPreferences(){
	const BrowserWindow = remote.BrowserWindow;
	/**
	 * Acceder a un objeto que ya está creado en el proceso principal.
	 */
	const mainWindow = remote.getGlobal('win');

	const preferencesWindow = new BrowserWindow({
		width: 400,
		height: 300,
		title: 'Preferencias',
		center: true,
		modal: true,
		frame: false,
		show: false
	});

	/**
	 * Verificamos que no la App no esté corriendo en SO Windows.
	 */
	if(os.platform() !== 'win32'){
		preferencesWindow.setParentWindow(mainWindow);
	}
	preferencesWindow.once('ready-to-show', () => {
		preferencesWindow.show();
		preferencesWindow.focus();
	})
	preferencesWindow.loadURL(`file://${path.join(__dirname, '..')}/preferences.html`);
}

module.exports = {
	setIpc,
	saveFile,
	openDirectory,
	openPreferences
}