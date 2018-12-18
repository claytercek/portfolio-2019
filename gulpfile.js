var gulp = require("gulp");
/*
 *  Gulp Plugins
 */
var autoprefixer = require("gulp-autoprefixer");
var browserify = require("browserify");
var babelify = require("babelify");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var scss = require("gulp-sass");
var plumber = require("gulp-plumber");
var source = require('vinyl-source-stream');

/*
 *    Variables
 */
var paths = {
	scss: {
		src: "assets/scss/*.scss",
		dest: "dist/css/"
	},
	js: {
		src: ["assets/js/script.js", "assets/js/**/*.js"],
		dest: "dist/js/"
	}
};

var space = " ";

/*
 *  Styles Task
 */
gulp.task("styles", function(done) {
	gulp.src(paths.scss.src)
		.pipe(plumber())
		.pipe(
			scss({
				style: "compressed",
				precision: 5,
				includePaths: ["node_modules/include-media/dist", "node_modules/normalize.css"]
			})
		)
		.pipe(
			autoprefixer({
				browsers: ["last 2 version", "ie 11"],
				cascade: true
			})
		)
		.pipe(rename("main.css"))
		.pipe(gulp.dest(paths.scss.dest));
		done();
});

/*
 *  Scripts Task
 */
gulp.task("scripts", function(done) {
	browserify({
		entries: paths.js.src[0],
		debug: true
	}).transform( "babelify", { presets: ["@babel/env"]})
		.bundle()
		.pipe(source('script.js'))
		.pipe(gulp.dest(paths.js.dest));
		done();
});

/*
 *  Watch Task
 */
gulp.task("watch", function() {
	gulp.watch(paths.scss.src, gulp.series("styles"));
	gulp.watch(paths.js.src, gulp.series("scripts"));
});

/*
 *  Build Task
 */
gulp.task("default", gulp.parallel("styles", "scripts", "watch"));
