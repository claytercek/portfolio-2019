import Point from "./Point.js";
import Wave from "./Wave.js";

export default class TransitionWave extends Wave {
	constructor(config, ctx, cw, ch, color) {
		config.pointCount = 8;
		super(config, ctx, cw, ch, 1.2, color)
		this.transitionOut = false;
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
		this.ctx.lineTo(-this.OPT.range.x - this.OPT.thickness, 0);
		this.ctx.lineTo(this.cw + this.OPT.range.x + this.OPT.thickness, 0);
		this.ctx.closePath();
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}

	/**
	 * @param {boolean} bool
	 */
	set flip(bool) {
		this.transitionOut = bool;
		
		if (bool) {
			this.ctx.setTransform(1, 0, 0, -1, 0, this.ch);
		} else {
			this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}


	toggleMenu(ch) {
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].toggleMenu(ch, {
				min: 40,
				max:90
			});
		}
	}
}
