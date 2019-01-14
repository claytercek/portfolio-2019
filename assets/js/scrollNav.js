var $ = require("jquery");
require("./dependencies/jquery.touchswipe.min");

var asideItems;
var mainItems;
var main;
var activeItem;
var isTransitoning = false;

function init() {
	asideItems = $(".c-project--nav li");
	mainItems = $(".c-project");
	main = $("main");

	if (asideItems.length == 0) {
		return;
	}

	$(document).on("wheel", verticalNav);
	$(document).on("keyup", verticalNav);
	$(document).swipe({
		swipe: function(event, direction) {
			verticalNav({
				type: "swipe",
				direction: direction
			});
		},
		fallbackToMouseEvents: !1
	});

	asideItems.each(function(index, item) {
		item.addEventListener("click", function() {
			asideClick(index);
		});
	});

	setActive(mainItems[0], true);
}

function asideClick(index) {
	let currentIndex = mainItems.index(activeItem);

	if (index == currentIndex) {
		return;
	} else if (index > currentIndex) {
		isTransitoning = true;
		setActive(mainItems[index], true);
	} else {
		isTransitoning = true;
		setActive(mainItems[index], false);
	}
}

function setNavActive(index) {
	asideItems.each(function(index, item) {
		item.classList.remove("active");
	});
	asideItems[index].classList.add("active");
}

function setActive(newItem, isDown) {
	setNavActive(mainItems.index(newItem));

	let directionString = isDown ? "Down" : "Up";
	let oppositeString = !isDown ? "Down" : "Up";

	let oldItem = activeItem;
	activeItem = newItem;

	if (oldItem) {
		oldItem.classList.add("to" + oppositeString);
	}

	activeItem.classList.add("active");
	activeItem.classList.add("from" + directionString);

	setTimeout(function() {
		activeItem.classList.remove("from" + directionString);
		if (oldItem) {
			oldItem.classList.remove("to" + oppositeString);
			oldItem.classList.remove("active");
		}
		isTransitoning = false;
	}, 700);
}

// Calls the nextWork function
// Takes event as input
// Determines whether to move to the next or previous item based on input
function verticalNav(e) {
	if (asideItems.length == 0) {
		return;
	}

	if (isTransitoning) {
		return;
	}
	var down = null;
	if (e.type == "wheel") {
		down = e.originalEvent.deltaY > 0;
	} else if (e.type == "keyup") {
		if (e.which == 40) down = true;
		else if (e.which == 38) down = false;
	} else if (e.type == "swipe") {
		if (e.direction == "up") down = true;
		else if (e.direction == "down") down = false;
		// } else if (e.type == "arrow") {
		// 	if (e.direction == "up") down = false;
		// 	else if (e.direction == "down") down = true;
	}

	if (down == null) return;

	if (down) {
		nextItem(true);
	} else {
		nextItem(false);
	}
}

function nextItem(isDown) {
	// main is the container for the work items
	if (isDown) {
		var nextItem = $(activeItem).next(".c-project");
	} else {
		var nextItem = $(activeItem).prev(".c-project");
	}
	// Make sure there is a next or previous item before calling function
	if (nextItem.length != 0) {
		isTransitoning = true;
		setActive(nextItem[0], isDown);
	}
}

export { init };
