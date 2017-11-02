var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(watch('sass/**/*.scss',['styles']))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
        // gulp.watch('sass/**/*.scss',['styles']);
});

//Watch task
// gulp.task('default',function() {
//     gulp.watch('sass/**/*.scss',['styles']);
// });

//command line: gulp styles

var jasmineBrowser = require('gulp-jasmine-browser');
var watch = require('gulp-watch');

gulp.task('jasmine', function() {
  var filesForTest = ['./*.js', 'spec/*_spec.js'];
  return gulp.src(filesForTest)
    .pipe(watch(filesForTest))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});
