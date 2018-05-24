import { ipcRenderer } from 'electron'

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

/**
 * Limpiar el listado de imagenes.
 */
function clearImages(){
	const oldImages = document.querySelectorAll('li.list-group-item');
	const totalRecords = oldImages.length;
	for (let i = 0; i < totalRecords; i++) {
		oldImages[i].parentNode.removeChild(oldImages[i]);
	}
}

function loadImages(images){
	let imagesList = document.querySelector('ul.list-group')
	const totalRecords = images.length;
	for (let i = 0; i < totalRecords; i++) {
		
		const node = `<li class="list-group-item">
				    	<img class="media-object pull-left" src="${images[i].src}" height="32">
				    	<div class="media-body">
				      		<strong>${images[i].filename}</strong>
				      		<p>${images[i].size}</p>
				    	</div>
				  	</li>`;
		imagesList.insertAdjacentHTML('beforeend', node);
	}
}

function addImagesEvents(){
	const thumbs = document.querySelectorAll('li.list-group-item');
	const lengthThumbs = thumbs.length;
	for (var i = 0; i < lengthThumbs; i++) {
		thumbs[i].addEventListener('click', function (){
			changeImage(this);
		});
	}
}

function changeImage(node){
	if(node){
		const selected = document.querySelector('li.selected');
		if(selected){
			selected.classList.remove('selected');
		}
		node.classList.add('selected');
		document.getElementById('image-displayed').src = node.querySelector('img').src;
	}else{
		document.getElementById('image-displayed').src = '';
	}
}

function selectFirstImage(){
	const image = document.querySelector('li.list-group-item:not(.hidden)');
	changeImage(image);
}

module.exports = {
	setIpc,
	openDirectory
}