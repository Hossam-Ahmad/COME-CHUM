var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('minify', function() {
  return gulp.src(['./dist/travel-app/*.js'])
      .pipe(minify())
      .pipe(gulp.dest('./dist/travel-app'));
});