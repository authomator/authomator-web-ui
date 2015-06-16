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

    var sourceFiles = [
      __dirname + '/**/*.less',
      '!' + __dirname + '/**/_*.less'
    ];

    // Ignore less files starting with _
    return gulp.src(sourceFiles)
      .pipe(plugins.plumber())
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
      .pipe(gulp.dest(__dirname + '/public/css'))
      .pipe(plugins.livereload());

  });

  /**
   * Watch LESS files for changes
   */
  gulp.task(prefix + 'watch:less', function(){
    plugins.livereload.listen();
    plugins.watch([
      __dirname + '/**/*.less'
    ], function(){
      runSequence(prefix + 'less');
    });
  });

  /**
   * Watch JADE files for changes
   */
  gulp.task(prefix + 'watch:jade', function(){
    plugins.livereload.listen();
    plugins.watch([
      __dirname + '/**/*.jade'
    ], function(){
      plugins.livereload.reload();
    });
  });

  /**
   * Watch everything
   */
  gulp.task(prefix + 'watch:all', function(){
    runSequence([
      prefix + 'watch:jade',
      prefix + 'watch:less'
    ])
  });

  gulp.task(prefix + 'default', function(){
    runSequence(prefix + 'less', prefix + 'watch:all');
  });

}

// @todo: is there a better way to check if gruntfile.js has been required by another module or or run directly using gulp?
if (module.parent && module.parent.filename && module.parent.filename.match(/gulp\.js$/)) {
  // Run directly using gulp
  init();
}else{
  // Required via another module
  console.log('REQUIRED');
}
