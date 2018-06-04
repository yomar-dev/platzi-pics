import { ipcMain, dialog } from 'electron'
import isImage from 'is-image'
import filesize from 'filesize'
import fs from 'fs'
import path from 'path'

function setMainIpc(win){

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
			if(dir){
				loadImages(event, dir[0]);
			}
		});
	});

	ipcMain.on('load-directory', (event, dir) => {
		loadImages(event, dir);
	});

	ipcMain.on('open-save-dialog', (event, ext) => {
		dialog.showSaveDialog(win, {
			title: 'Guardar imagen modificada',
			buttonLabel: 'Guardar imagen',
			filters: [{name: 'Images', extensions: [ext.substr(1)]}]
		}, (file) => {
			if(file){
				event.sender.send('save-image', file)
			}
		})
	})

	ipcMain.on('show-dialog', (event, info) => {
		dialog.showMessageBox(win, {
			type: info.type,
			title: info.title,
			message: info.message
		})
	})
}

function loadImages(event, dir){
	let images = [];
	/**
	 * Leer el directorio seleccionado
	 */
	fs.readdir(dir, (err, files) => {
		if(err) throw err

		let lengthFiles = files.length;
		for (let i = 0; i < lengthFiles; i++) {
			if(isImage(files[i])){
				/**
				 * Obtener la ruta completa de la imagen.
				 */
				let imageFile = path.join(dir, files[i]);
				/**
				 * Obtener información del archivo
				 */
				let stats = fs.statSync(imageFile);
				let size = filesize(stats.size, {round: 0});
				images.push(
					{
						filename: files[i],
						src: `file://${imageFile}`,
						size: size
					}
				);
			}
		}
		/**
		 * Evento al cual lo voy a enviar 'load-images'
		 */
		event.sender.send('load-images', dir, images);
	})
}

module.exports = setMainIpc