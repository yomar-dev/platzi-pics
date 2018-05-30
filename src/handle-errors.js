import { app, dialog } from 'electron'

function relaunchApp(win){
	dialog.showMessageBox(win, {
		type: 'error',
		title: 'Platzipics',
		message: 'Ha ocurrido un error, la aplicación se reiniciará.'
	}, () => {
		app.relaunch()
		app.exit(0)
	})
}

function setupErrors(win){
	win.webContents.on('crashed', () => {
		relaunchApp(win)
	})

	win.on('unresponsive', () => {
		dialog.showMessageBox(win, {
			type: 'warning',
			title: 'Platzipics',
			message: 'La aplicación no responde, por favor espere un momento.'
		})
	})
}

module.exports = setupErrors