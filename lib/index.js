var express = require('express');
var expressLayout = require('express-layout');
var expressLess = require('express-less');
var app = express();

module.exports = app;

/**************************************************************************
 * Gather components
 *
 * Component specific options can be passed:
 * require('./components/signup')(options)
 *************************************************************************/

var components = {
  signup: require('./components/signup')()
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

app.use('/css', expressLess(__dirname + '/css'));

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
 * Handle errors
 *************************************************************************/

app.all('*', function(req, res, next){
  res.render('components/errors/views/404');
});


