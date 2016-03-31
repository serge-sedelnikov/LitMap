var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch', function () {
    return gulp.src('styles/*.css')
        .pipe(watch('styles/*.css', function(){
          gulp.start('css');
        }));
      });
