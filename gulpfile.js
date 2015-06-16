var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

require('./express-apps/web-ui/gulpfile')(gulp, plugins, { prefix: 'web-ui:' });

gulp.task('default', function () {

  runSequence('web-ui:default');

});
