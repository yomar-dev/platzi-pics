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
}

module.exports = setupErrors