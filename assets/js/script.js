var $ = require("jquery");
var scrollNav = require("./scrollNav");
var background = require("./background");

$(".js-wave-toggleMenu").click(function() {
	background.toggleMenu();
	this.classList.toggle("open");
	$(".content")[0].classList.toggle("nav-open");
	$(".c-header--behind")[0].classList.toggle("nav-open");
});


$(document).ready(function() {
	background.init();
	scrollNav.init();
});
