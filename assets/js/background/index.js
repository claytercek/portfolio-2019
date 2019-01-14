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
	ch = c2.height = c.height = (window.mobilecheck()) ? window.screen.availHeight : window.innerHeight;

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

	cw = c.width = c2.width = window.innerWidth;
	ch = c.height = c2.height = (window.mobilecheck()) ? window.screen.availHeight : window.innerHeight;

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


window.mobilecheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

export { init, toggleMenu };
