var $ = require("jquery");
var scrollNav = require("./scrollNav");
var background = require("./background");
var Flickity = require("flickity");

$(".js-wave-toggleMenu").click(function() {
	background.toggleMenu();
	this.classList.toggle("open");
	$(".content")[0].classList.toggle("nav-open");
	$(".c-header--behind")[0].classList.toggle("nav-open");
});


$(document).ready(function() {
	background.init();
	scrollNav.init();

	$(".wp-block-gallery").each(function() {

		var flkty = new Flickity( this, {
			cellAlign: 'left',
			contain: false,
			prevNextButtons: false,
			pageDots: true,
			imagesLoaded: true,
			cellSelector: 'figure',
			setGallerySize: false,
			freeScroll: true
		});
		
		$(".blocks-gallery-item").remove();
	})
});
