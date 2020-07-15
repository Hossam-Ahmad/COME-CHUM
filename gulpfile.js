var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('minify', function() {
  return gulp.src(['./dist/travel-app/*.js'], {base: './'})
      .pipe(minify())
      .pipe(gulp.dest('./dist/travel-app'));
});