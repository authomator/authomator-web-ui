var express = require('express');
var expressLayout = require('express-layout');
var app = express();
var logger = require('../../lib/logger');
var config = require('config');
var i18n = require('i18n');
var lusca = require('lusca');
var session = require('express-session');
var bodyParser = require('body-parser');

var defaultAppConfig = {
  locals: {
    app: {
      title: 'Authomator Web UI',
      baseUrl: ''
    }
  }
};

module.exports = function (options) {

  config.util.extendDeep(defaultAppConfig, options)
  config.util.setModuleDefaults('app', defaultAppConfig);

  var appConfig = config.get('app');

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
   * Configure body parser
   *************************************************************************/

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  /**************************************************************************
   * Configure i18n
   *************************************************************************/

  i18n.configure({
    locales: ['en', 'nl'],
    directory: __dirname + '/locales',
    defaultLocale: 'en'
  });

  app.use(i18n.init);
  app.use(function (req, res, next) {
    console.log('Locale: ' + req.getLocale());
    next();
  });

  /**************************************************************************
   * Configure lusca
   *************************************************************************/

  app.use(session({
    secret: 'Taths8yO5Heej3fiAj4pab8fIm5wetph',
    resave: true,
    saveUninitialized: true
  }));

  app.use(lusca({
    csrf: true,
    xframe: 'SAMEORIGIN',
    xssProtection: true
  }));

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
   *
   * Component specific options can be passed:
   * require('./components/signup')(options)
   *************************************************************************/

  app.use('/create-account', require('./components/create-account')());
  app.use('/forgot-password', require('./components/forgot-password')());
  app.use('/reset-password', require('./components/reset-password')());
  app.use('/sign-in', require('./components/sign-in')());

  /**************************************************************************
   * Serve static assets
   *************************************************************************/

  app.use(express.static(__dirname + '/public'));

  /**************************************************************************
   * Handle errors
   *************************************************************************/

  app.use(require('./components/error-handlers')());

  return app;

};
