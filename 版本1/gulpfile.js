var gulp = require('gulp');
var up = require('./up');
// CSS入口
gulp.task('css', function() {
    gulp.src('dist/*.css')
        .pipe(up({output: true, imageLimit: 1000}))
        .pipe(gulp.dest('./assets/index.min.css'));
});

// HTML入口
gulp.task('default', function() {
    gulp.src('dist/index.html')
        .pipe(up({output: true, imageLimit: 1000}))
        .pipe(gulp.dest('./assets'));
});
