import { isContext } from "vm";
import { throws } from "assert";

var rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

var ease = function(t, b, c, d) {
	if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
	return (-c / 2) * (--t * (t - 2) - 1) + b;
};

export default class Point {
	constructor(options, config) {
		this.OPT = options;
		this.ctx = config.ctx;
		this.anchorX = config.x;
		this.anchorY = config.y;
		this.x = config.x;
		this.y = config.y;
		this.setTarget();
		this.isMenu = false;
	}

	setTarget() {
		this.initialX = this.x;
		this.initialY = this.y;
		this.targetX = this.anchorX + rand(0, this.OPT.range.x * 2) - this.OPT.range.x;
		this.targetY = this.anchorY + rand(0, this.OPT.range.y * 2) - this.OPT.range.y;
		this.tick = 0;
		this.duration = rand(this.OPT.duration.min, this.OPT.duration.max);
	}

	update() {
		var dx = this.targetX - this.x;
		var dy = this.targetY - this.y;
		var dist = Math.sqrt(dx * dx + dy * dy);

		if (Math.abs(dist) <= 5) {
			if (this.isMenu) {
				return;
			} else {
				this.setTarget();
			}
		} else {
			var t = this.tick;
			var b = this.initialY;
			var c = this.targetY - this.initialY;
			var d = this.duration;
			this.y = ease(t, b, c, d);

			b = this.initialX;
			c = this.targetX - this.initialX;
			d = this.duration;
			this.x = ease(t, b, c, d);

			this.tick++;
		}
	}

	render() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
		this.ctx.fillStyle = "#000";
		this.ctx.fill();

		// RENDER ANCHOR
		this.ctx.beginPath();
		this.ctx.arc(this.anchorX, this.anchorY, 3, 0, Math.PI * 2, false);
		this.ctx.fillStyle = "#F00";
		this.ctx.fill();

		// RENDER INTIAL
		this.ctx.beginPath();
		this.ctx.arc(this.initialX, this.initialY, 3, 0, Math.PI * 2, false);
		this.ctx.fillStyle = "#0F0";
		this.ctx.fill();

		// RENDER TARGET
		this.ctx.beginPath();
		this.ctx.arc(this.targetX, this.targetY, 3, 0, Math.PI * 2, false);
		this.ctx.fillStyle = "#00F";
		this.ctx.fill();

		//RENDER LINE
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(this.targetX, this.targetY);
		this.ctx.strokeStyle = "#FF0000";
		this.ctx.stroke();
		this.ctx.strokeStyle = "rgba(1,1,1,0)";
	}

	resize(ratio, range) {
		this.OPT.range = range;

		this.anchorX = this.anchorX / ratio.w;
		this.anchorY = this.anchorY / ratio.h;

		this.x = this.x / ratio.w;
		this.y = this.y / ratio.h;

		this.targetX = this.targetX / ratio.w;
		this.targetY = this.targetY / ratio.h;

		this.initialX = this.initialX / ratio.w;
		this.initialY = this.initialY / ratio.h;
	}

	toggleMenu(ch, dur) {
		if (this.isMenu == false) {
			this.isMenu = true;
			this.initialX = this.x;
			this.initialY = this.y;
			this.targetX = this.x;
			this.targetY = ch + 200;
			this.tick = 0;
			this.duration = rand(dur.min, dur.max);
		} else {
			this.isMenu = false;
			this.initialX = this.x;
			this.initialY = this.y;
			this.targetX = this.anchorX + rand(0, this.OPT.range.x * 2) - this.OPT.range.x;
			this.targetY = this.anchorY + rand(0, this.OPT.range.y * 2) - this.OPT.range.y;
			this.tick = 0;
			this.duration = rand(40, 20);
		}
	}
}
