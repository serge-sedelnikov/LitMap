var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

gulp.task('css', function() {
  return gulp.src([
    'jspm_packages/github/thomaspark/bootswatch@3.3.6/paper/bootstrap.min.css',
    'styles/*.css'])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('site.css'))
        .pipe(gulp.dest('styles/dist'));
});
