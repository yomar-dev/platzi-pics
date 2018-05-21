window.addEventListener('load', () => {
	addImagesEvents();
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
	document.querySelector('li.selected').classList.remove('selected');
	node.classList.add('selected');
	document.getElementById('image-displayed').src = node.querySelector('img').src;
}