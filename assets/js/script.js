var $ = require("jquery");
var scrollNav = require("./scrollNav");
var background = require("./background");

$("#wave-toggleMenu").click(function() {
	background.toggleMenu();
});

$(document).ready(function() {
	background.init();
	scrollNav.init();
});
