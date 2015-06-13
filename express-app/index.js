var express = require('express');
var expressLayout = require('express-layout');
var lessMiddleware = require('less-middleware');
var app = express();

module.exports = app;

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

// Set base url to prepend in view url's
app.set('baseUrl', '');

// Set default global layout
app.set('layout', 'layouts/default');

/**************************************************************************
 * Configure LESS preprocessing
 *************************************************************************/

// @todo: only debug mode if env is development
// Map requests to /public/css to /less
// and compile to CSS on the fly
app.use(lessMiddleware(__dirname + '/less', {
  debug: true,
  dest: __dirname + '/public/css'
}));

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

app.use(express.static(__dirname + '/public'));

app.use(components.errorHandlers);

