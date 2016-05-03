var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var concat = require( 'gulp-concat' );
var jasmine = require( 'gulp-jasmine' );
var ks = require('karma').Server;
var documental = require( 'documental' );
var through = require('through2');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
var path = require('path');

var config = require( './healthcheck.config.js' );

gulp.task('sass', function(){
	return gulp.src( config.src.sass )
		.pipe(sass())
		.pipe(concat('screen.css'))
		.pipe(gulp.dest(config.dist.sass))
});

gulp.task('scripts', [ 'template' ], function() {
	return gulp.src(config.src.js)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(config.dist.js))
		.on( 'end', function() {
			console.log( path.join( __dirname,  "src/template/templates.js" ) );
			gulp.src("src/template/templates.js", {read: false})
				.pipe(clean());
		} );
});

gulp.task('test', function (done) {
	new ks({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});

gulp.task('docs', function () {
	return gulp.src(config.src.js)
		.pipe(documental())
});

var processTemplate = function() {

	return through.obj(function(file, enc, cb) {

		if (file.isBuffer()) {

			var nm = file.path.split( "/" );
			nm = nm[ nm.length - 1 ];
			nm = nm.split( ".mst" )[ 0 ];

			var wrap = [ new Buffer( "window.templates." + nm + " ='" ), file.contents, new Buffer( "';" ) ];


			file.contents = Buffer.concat(wrap);
		}
		this.push(file);
		cb();
	});
};

gulp.task('template', function () {
	return gulp.src(config.src.template)
		.pipe(processTemplate())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(config.src.templateBase))
});

gulp.task( 'default', ['scripts', 'sass' ] );