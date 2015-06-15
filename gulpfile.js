var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');
var path = require('path');
var sourceLessFiles = [
  './express-app/less/**/*.less',
  '!./express-app/less/**/_*.less'
];

gulp.task('less', function () {
  return gulp.src([
      './express-app/less/**/*.less',
      '!./express-app/less/**/_*.less'
    ])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./express-app/public/css'))
    .pipe(minifyCss())
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./express-app/public/css'));
});

gulp.task('watch-less', function(){
  watch([
    './express-app/less/**/*.less'
  ], function(){
    runSequence('less');
  });
});
