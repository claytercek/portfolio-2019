import Wave from "./Wave.js";
import MenuWave from "./MenuWave.js";

var OPT = {
	lineColors: ['#ac3061','#9b2c5e','#8b285c','#7b2459','#6b2156','#5b1d54','#491a51','#38164e'],
	BGColor: "#25134b",
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
var c2, ctx2, menuWave;

function init() {
	if (!document.getElementsByClassName("c-background")[0]) {
		return;
	}
	c = document.getElementsByClassName("c-background")[0];
	ctx = c.getContext("2d");
	
	c2 = document.getElementsByClassName("c-menuCanvas")[0];
	ctx2 = c2.getContext("2d");
	cw = c2.width = c.width = window.innerWidth;
	ch = c2.height = c.height = window.innerHeight;

	OPT.range = {
		x: cw * 0.05,
		y: ch * 0.07
	};

	for (let i = OPT.lineColors.length; i > 0; i--) {
		let height = i / (OPT.lineColors.length + 1);
		waves.push(new Wave(OPT, ctx, cw, ch, height, OPT.lineColors[i - 1]));
	}

	menuWave = new MenuWave(OPT, ctx2, cw, ch, OPT.BGColor);

	ctx.lineJoin = "round";
	ctx.lineWidth = OPT.thickness;
	ctx.strokeStyle = OPT.strokeColor;

	ctx2.lineJoin = "round";
	ctx2.lineWidth = OPT.thickness;
	ctx2.strokeStyle = OPT.strokeColor;

	window.addEventListener("resize", resize, false);

	loop();
}

var clear = function() {
	ctx.clearRect(0, 0, cw, ch);
	ctx2.clearRect(0, 0, cw, ch);
};

var loop = function() {
	window.requestAnimFrame(loop, c);
	clear();
	
	if (window.pageYOffset < window.innerHeight) {
		tick++;
		for (var wave of waves) {
			wave.update();
		}
	}

	menuWave.update();
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

	OPT.range = {
		x: cw * 0.05,
		y: ch * 0.07
	};

	for (var wave of waves) {
		wave.resize(ratio, OPT.range);
	}

	menuWave.resize(ratio, OPT.range);

	ctx.lineJoin = "round";
	ctx.lineWidth = OPT.thickness;
	ctx.strokeStyle = OPT.strokeColor;
};


function toggleMenu() {
	isMenu = !isMenu;
	for (var i = 0; i < waves.length; i++) {
		toggleWaveMenu(i, ch);
	}

	let menuDelay =(waves.length ) * 80;
	if ((window.pageYOffset > window.innerHeight) || !isMenu) {
		menuDelay = 0;
	}

	setTimeout(function() {
		menuWave.toggleMenu(ch) 
	}, menuDelay)
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
