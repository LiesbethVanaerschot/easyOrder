var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');
//var jade =  require('gulp-jade');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');

gulp.task('serve', function(){
	nodemon({script: 'app.js'});
});

gulp.task('styles', function(){ //in plaats dit als default moet je nu gulp styles ingeven in cmd
	gulp.src('public/css/*.css')
		.pipe(concatCss("build.css"))
		.pipe(minifyCss(opts))
		.pipe(gulp.dest('build/css')) //nieuw mapje build aanmaken
		.pipe(livereload());
});

gulp.task('scss', function(){
	gulp.src('public/scss/styles.scss')
		.pipe(livereload());
});

gulp.task('jade', function(){
	gulp.src('views/*.jade')
		.pipe(livereload());
});

gulp.task('scripts', function(){
	gulp.src('public/javascripts/*.js')
		.pipe(livereload());
});

gulp.task('watch', function(){
	gulp.watch('public/stylesheets/*.css', ['styles']);//hetzelfde voor images
	gulp.watch('views/*.jade', ['jade']);
	gulp.watch('public/javascripts/*.js', ['scripts']);
});

//default zou dit kunnen zijn
gulp.task('default', ['serve', 'styles', 'scss', 'jade', 'scripts', 'watch']);