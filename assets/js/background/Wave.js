import Point from "./Point.js";

export default class Wave {
	constructor(config, ctx, cw, ch, level, color) {
		this.OPT = config;
		this.points = [];
		this.ctx = ctx;
		this.cw = cw;
		this.ch = ch;
		this.tick = 0;
		this.level = level;
		this.color = color;

		var i = this.OPT.pointCount + 2;
		var spacing = (this.cw + this.OPT.range.x * 2) / (this.OPT.pointCount - 1);
		while (i--) {
			this.points.push(
				new Point(this.OPT, {
					x: spacing * (i - 1) - this.OPT.range.x,
					y: this.ch - this.ch * this.level,
					ctx: this.ctx
				})
			);
		}
	}

	renderShape() {
		this.ctx.beginPath();
		var pointCount = this.points.length;
		this.ctx.moveTo(this.points[0].x, this.points[0].y);
		var i;
		for (i = 0; i < pointCount - 1; i++) {
			var c = (this.points[i].x + this.points[i + 1].x) / 2;
			var d = (this.points[i].y + this.points[i + 1].y) / 2;
			this.ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
		}
		this.ctx.lineTo(-this.OPT.range.x - this.OPT.thickness, this.ch + this.OPT.thickness);
		this.ctx.lineTo(this.cw + this.OPT.range.x + this.OPT.thickness, this.ch + this.OPT.thickness);
		this.ctx.closePath();
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
		this.ctx.stroke();
	}

	updatePoints() {
		var i = this.points.length;
		while (i--) {
			this.points[i].update();
		}
	}

	renderPoints() {
		var i = this.points.length;
		while (i--) {
			this.points[i].render();
		}
	}

	update() {
		this.tick++;
		this.renderShape();
		this.updatePoints();
		// this.renderPoints();
	}

	resize(ratio) {
		this.cw = this.cw / ratio.w;
		this.ch = this.ch / ratio.h;

		let i = this.points.length;

		while (i--) {
			this.points[i].resize(ratio);
		}
	}

	toggleMenu(ch) {
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].toggleMenu(ch);
		}
	}
}
