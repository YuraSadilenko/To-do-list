var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	pipeline = require('readable-stream').pipeline,
	cleanCSS = require('gulp-clean-css');
 
	gulp.task('uglify', function () {
  return pipeline(
    gulp.src('src/script/*.js'),
    uglify(),
    gulp.dest('dist/script')
  	);
	});

	gulp.task('minify-css', () => {
		return gulp.src('src/css/*.css')
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest('dist/css'));
	});

	gulp.task('browser', function() {
		browserSync({
			server: { baseDir: 'src' },
			notify: false
		});
	});


gulp.task('watch', ['sass'], function() {

	browserSync.init({
			server: "./src"
	});

	gulp.watch("src/scss/*.scss", ['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  gulp
    .src('src/sass/main.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(rename('style.css'))
    .pipe(
      autoprefixer({
        browsers: ['last 20 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('default', ['watch']);

gulp.task('build', function() {
	gulp.src(['src/*']).pipe(gulp.dest('dist'));
	gulp.src(['src/*/*.*']).pipe(gulp.dest('dist/'));

});

gulp.task('compress', function() {
  gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});