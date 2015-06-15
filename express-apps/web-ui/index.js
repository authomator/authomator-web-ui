var express = require('express');
var expressLayout = require('express-layout');
var app = express();
var logger = require('../../lib/logger');
var config = require('config');

var defaultAppConfig = {
  locals: {
    app: {
      title: 'Authomator Web UI',
      baseUrl: ''
    }
  }
};

module.exports = function(options) {

  config.util.extendDeep(defaultAppConfig, options)
  config.util.setModuleDefaults('app', defaultAppConfig);

  var appConfig = config.get('app');

  /**************************************************************************
   * Gather components
   *
   * Component specific options can be passed:
   * require('./components/signup')(options)
   *************************************************************************/

  var components = {
    signup: require('./components/signup')(),
    errorHandlers: require('./components/error-handlers')()
  };

  /**************************************************************************
   * Apply application settings
   *************************************************************************/

    // Set view rendering options
  app.set('views', __dirname);
  app.set('view engine', 'jade');

  app.disable('x-powered-by');
  app.disable('etag');

  // Set default global layout
  app.set('layout', 'layouts/default');

  /**************************************************************************
   * Configure locals
   *************************************************************************/

  app.locals.environment = app.get('env');
  config.util.extendDeep(app.locals, appConfig.get('locals'));

  /**************************************************************************
   * Configure logger
   *************************************************************************/

  app.use(logger());

  /**************************************************************************
   * Configure layout
   *************************************************************************/

  // Call layout middleware so all render calls from components
  // are injected into the global layout
  app.use(expressLayout());

  /**************************************************************************
   * Load components
   *************************************************************************/

  app.use('/signup', components.signup);

  /**************************************************************************
   * Serve static assets
   *************************************************************************/

  app.use(express.static(__dirname + '/public'));

  /**************************************************************************
   * Handle errors
   *************************************************************************/

  app.use(components.errorHandlers);

  return app;

};
