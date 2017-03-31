require('./webpack.config.js');
var gulp = require('gulp')
var up = require('./up');
// 以 CSS 为入口
gulp.task('css', function(){
  return gulp.src('dist/' + global.act_name + '/index.min.css')
    .pipe(up({
      seq: true
    }))
    .pipe(gulp.dest('./assets/' + global.act_name))
})

// 以 HTML 为入口
// gulp.task('default', function (callback) {
gulp.task('default', ['css'], function (callback) {
  return gulp.src('dist/' + global.act_name + '/index.html')
    .pipe(up({
      output: true,
      imageLimit: 1000
    }))
    .pipe(gulp.dest('./assets/' + global.act_name))
});
