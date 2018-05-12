/**
 * Activar nueva caracteristica de Electron Compile.
 */
import { enableLiveReload } from 'electron-compile'

module.exports = function devtools(){
	enableLiveReload()
}