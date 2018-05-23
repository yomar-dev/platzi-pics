import url from 'url'
import path from 'path'
import applyFilter from './filters'
import { setIpc, openDirectory } from './IpcRendererEvents'

window.addEventListener('load', () => {
	setIpc();
	addImagesEvents();
	searchImagesEvent();
	selectEvent();
	buttonEvent('open-directory', openDirectory)
});

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
		document.querySelector('li.selected').classList.remove('selected');
		node.classList.add('selected');
		document.getElementById('image-displayed').src = node.querySelector('img').src;
	}else{
		document.getElementById('image-displayed').src = '';
	}
}

function searchImagesEvent(){
	const searchBox = document.getElementById('search-box');

	searchBox.addEventListener('keyup', function(){
		const regex = new RegExp(this.value.toLowerCase(), 'gi');
		if(this.value.length > 0){
			const thumbs = document.querySelectorAll('li.list-group-item img');
			const lengthThumbs = thumbs.length;
			for (var i = 0; i < lengthThumbs; i++) {
				const fileUrl = url.parse(thumbs[i].src);
				const fileName = path.basename(fileUrl.pathname);
				if(fileName.match(regex)){
					thumbs[i].parentNode.classList.remove('hidden');
				}else{
					thumbs[i].parentNode.classList.add('hidden');					
				}
			}
			selectFirstImage();
		}else{
			const hidden = document.querySelectorAll('li.hidden');
			for (var i = 0; i < hidden.length; i++) {
				hidden[i].classList.remove('hidden');
			}
		}
	})
}

function selectFirstImage(){
	const image = document.querySelector('li.list-group-item:not(.hidden)');
	changeImage(image);
}

function selectEvent(){
	const select = document.getElementById('filters');

	select.addEventListener('change', function(){
		let image = document.getElementById('image-displayed');
		applyFilter(this.value, image);
	});
}

function buttonEvent(id, func){
	const openDirectory = document.getElementById(id);
	openDirectory.addEventListener('click', func);
}