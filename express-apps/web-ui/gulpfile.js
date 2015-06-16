var runSequence = require('run-sequence');

module.exports = init;

function init(gulp, plugins, options){

  var prefix = '';

  gulp = gulp || require('gulp');
  plugins = plugins || require('gulp-load-plugins')();

  if(options && options.prefix){
    prefix = options.prefix;
  }

  gulp.task(prefix + 'less', function(){

    // Ignore less files starting with _
    return gulp.src([
      __dirname + '/less/**/*.less',
      '!' + __dirname + '/less/**/_*.less'
    ])
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.less())
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(plugins.concat('app.css'))
      .pipe(gulp.dest(__dirname + '/public/css'))
      .pipe(plugins.minifyCss())
      .pipe(plugins.rename('app.min.css'))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(__dirname + '/public/css'));

  });

  gulp.task(prefix + 'watch:less', function(){

    plugins.watch([
      __dirname + '/less/**/*.less'
    ], function(){
      console.log('CHANGE DETECTED IN LESS');
      runSequence(prefix + 'less');
    });

  });

  gulp.task(prefix + 'default', function(){

    runSequence(prefix + 'less', prefix + 'watch:less');

  });

}

// @todo: is there a better way to check if gruntfile.js has been required by another module or or run directly using gulp?
if (module.parent && module.parent.filename && module.parent.filename.match(/gulp\.js$/)) {
  console.log('RUN DIRECTLY USING GULP');
  init();
}else{
  console.log('REQUIRED');
}
