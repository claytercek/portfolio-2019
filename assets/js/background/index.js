import Wave from "./Wave.js";

var OPT = {
	lineColors: ["#FF517F", "#DE467E", "#BD3B7D", "#9C2F7B", "#7C247A", "#66206E", "#501C62", "#3A1756"],
	pointCount: 8,
	thickness: 5,
	strokeColor: "#444",
	curved: true,
	range: {
		x: 20,
		y: 50
	},
	duration: {
		min: 100,
		max: 200
	},
	thickness: 4,
	strokeColor: "rgba(1, 1, 1, 0)",
	curved: true
};

var tick = 0;
var waves = [];
var isMenu = false;
var c, ctx, cw, ch;

function init() {
	c = document.getElementsByClassName("c-background")[0];
	ctx = c.getContext("2d");
	cw = c.width = window.innerWidth;
	ch = c.height = window.innerHeight;

	OPT.range = {
		x: cw * 0.05,
		y: ch * 0.07
	};

	for (let i = OPT.lineColors.length; i > 0; i--) {
		let height = i / (OPT.lineColors.length + 1);
		waves.push(new Wave(OPT, ctx, cw, ch, height, OPT.lineColors[i - 1]));
	}
	ctx.lineJoin = "round";
	ctx.lineWidth = OPT.thickness;
	ctx.strokeStyle = OPT.strokeColor;

	window.addEventListener("resize", resize, false);

	loop();
}

var clear = function() {
	ctx.clearRect(0, 0, cw, ch);
};

var loop = function() {
	window.requestAnimFrame(loop, c);
	tick++;
	clear();
	for (var wave of waves) {
		wave.update();
	}
};

window.requestAnimFrame = (function() {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(a) {
			window.setTimeout(a, 1e3 / 60);
		}
	);
})();

var resize = function() {
	let oldCw = cw;
	let oldCh = ch;

	cw = c.width = window.innerWidth;
	ch = c.height = window.innerHeight;

	var ratio = {
		w: oldCw / cw,
		h: oldCh / ch
	};

	for (var wave of waves) {
		wave.resize(ratio);
	}

	ctx.lineJoin = "round";
	ctx.lineWidth = OPT.thickness;
	ctx.strokeStyle = OPT.strokeColor;
};

function toggleMenu() {
	isMenu = !isMenu;
	for (var i = 0; i < waves.length; i++) {
		toggleWaveMenu(i, ch);
	}
}

function toggleWaveMenu(i, ch) {
	let delay = i;
	if (isMenu) {
		delay = waves.length - i;
	}

	setTimeout(function() {
		waves[i].toggleMenu(ch);
	}, delay * 80);
}

export { init, toggleMenu };
