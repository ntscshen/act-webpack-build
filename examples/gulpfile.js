var gulp = require('gulp');
var up = require('./up');

gulp.task('default', function() {
    gulp.src('dist/index.html')
    .pipe(up({output: true}))
    .pipe(gulp.dest('./assets'));
});
