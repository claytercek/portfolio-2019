var $ = require("jquery");
var scrollNav = require("./scrollNav");
var background = require("./background");
var Flickity = require("flickity");
var form = require("./form");
var smoothState = require("./dependencies/jquery.smoothState.min");



function initTransition() {
	$(".js-wave-toggleMenu").click(function () {
		background.toggleMenu();
		this.classList.toggle("open");
		$(".content")[0].classList.toggle("nav-open");
		$(".c-header--behind")[0].classList.toggle("nav-open");
	});
	setTimeout(function() {
		$(".wp-block-gallery").each(function () {
	
			var flkty = new Flickity(this, {
				cellAlign: 'left',
				contain: false,
				prevNextButtons: false,
				pageDots: true,
				imagesLoaded: true,
				cellSelector: 'img',
				setGallerySize: false,
				freeScroll: true,
				percentPosition: false
			});
	
			$(".blocks-gallery-item").remove();
	
		})
	},100)

	background.initMenuWave();
	scrollNav.init();
	form.init();

}

function initAll() {
	initTransition();
	background.init();
}


var smoothstateOptions = {
	repeatDelay: 1400,
	prefetch: true,
	cacheLength: 2,
	onStart: {
		duration: 1400, // Duration of our animation
		render: function ($container) {
			// Add your CSS animation reversing class
			background.inTransition();
		}
	},
	onAfter: function ($container) {
		initTransition();
		background.outTransition();
	}
}

$(document).ready(function () {
	initAll();

	$("body > #wrapper").smoothState(smoothstateOptions);
});

