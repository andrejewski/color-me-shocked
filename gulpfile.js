// gulpfile.js

// gulpfile.js

var gulp 	= require('gulp'),
	gutil 	= require('gulp-util'),
	g 		= require('gulp-load-plugins')();	

gulp.task('build', ['client', 'clientLib', 'template'], function() {

});

gulp.task('default', ['build'], function() {
	gulp.watch([
		'**/*.coffee',
		'**/*.hbs'
	], ['client','template']);
});

gulp.task('client', function() {
	return gulp.src([
		// 'csx/*.coffee',
		'src/*.coffee'
		])
		.pipe(g.coffee())
		// .pipe(g.react())
		.pipe(g.concat("production.js"))
		.pipe(gulp.dest('dist/'));
});

gulp.task('clientLib', ['kitkat'], function() {
	// order matters
	var f = function(files) { 
		return files.map(function(file) {
			return "lib/"+file+'.js';
		});
	}
	return gulp.src(f([
			'jquery.min',
			'handlebars.runtime',
			'underscore',
			'backbone',
			'basebone',
			// 'react-with-addons'
		]))
		.pipe(g.concat("dependency.js"))
		.pipe(gulp.dest('dist/'))
});

gulp.task('kitkat', function() {
	return gulp.src('kit/*.coffee')
		.pipe(g.coffee())
		.pipe(gulp.dest('lib/'))
});

gulp.task('template', function() {
	var f = function(files) { 
		return files.map(function(file) {
			return "hbs/"+file+'.hbs';
		});
	}
	gulp.src(['hbs/*.hbs'])
		.pipe(g.handlebars({wrapped: true}))
		.pipe(g.declare({namespace: 'JST'}))
		.pipe(g.concat('template.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('produce', ['kitkat','client'], function() {
	// order matters
	var f = function(files) { 
		return files.map(function(file) {
			return "lib/"+file+'.js';
		});
	}
	var d = function(files) { 
		return files.map(function(file) {
			return "dist/"+file+'.js';
		});
	}
	return gulp.src(f([
			'jquery.min',
			'handlebars.runtime',
			'underscore',
			'backbone',
			'basebone'
		]).concat(d([
			'dependency',
			'template',
			'production'
		])))
		.pipe(g.concat("production.min.js"))
		.pipe(g.uglify())
		.pipe(gulp.dest('dist/'))
});


