var jsonData = JSON.parse(data);

// tableau des images
var images = [];

// Variables
var imagesPerPage = 1;


createBalises();

function createBalises() {
	var counter = 0;

for (var key in jsonData.images) {
	// on vérifie que l'objet possède bien unekey
	if (jsonData.images.hasOwnProperty(key)) {
		console.log("key " + key);
		images.push(new Image(key,counter));
		for (var keyword in jsonData.images[key]) {
			if (jsonData.images[key].hasOwnProperty(keyword)) {
				// accéder au(x) mot(s) clé(s)
				console.log(jsonData.images[key][keyword].description);
				// accéder au pourcentage
				console.log(jsonData.images[key][keyword].score);

			}
		}

	}
	counter++;
	
} // for loop

// on crée les balises
for (var i=0; i<images.length; i++) {
	images[i].create();
}	

}



function createPage(imagePerPage) {
	for (var i=0; i<images.length; i+=imagePerPage) {
		for (var j=0; j<i+imagePerPage; j++) {
			images[j].create();
		}
	}
}


var firstPage = true;
var isPageFull;
var pageNumber = 0;
var page;

function Image(_name, _id) {

	this.name = _name;
	this.id = _id;

	Image.prototype.create = function() {



		// crée une nouvelle page quand une page est pleine
		if (firstPage || isPageFull) {
			page = document.createElement('div');
			page.setAttribute('class', 'page');
			page.setAttribute('id', 'page-' + pageNumber);
			document.body.appendChild(page);
			pageNumber++;
			isPageFull = false;
		}



		var image = document.createElement('img');
		image.setAttribute('src', 'img/' + this.name);
		page.appendChild(image);

		pageNumber++;

		// si on a suffisement d'images dans la page on passe à la page suivante
		if (pageNumber!= 0 && pageNumber%imagesPerPage==0) {
			isPageFull = true;
		}
		

	}


}

