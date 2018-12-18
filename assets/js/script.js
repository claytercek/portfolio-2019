import * as background from "./background";
const $ = require("jquery");

$("#wave-toggleMenu").click(function() {
	background.toggleMenu();
});

background.init();
