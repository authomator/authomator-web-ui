var config = require('config'),
  _ = require('lodash'),
  url = require('url'),
  errors = require('../../errors');

module.exports = function(app, options){

  var opts = {
    httpsOnly:          false,
    acceptDomains:      ['127.0.0.1'],
    defaultRedirect:    'http://127.0.0.1/'
  };

  config.util.extendDeep(opts, config.get('app.redirects'));
  config.util.extendDeep(opts, options);

  /**
   * Handle the RedirectAuthenticatedRequest 'errors'
   */

  app.use(function(err, req, res, next) {

    if (err.name !== 'RedirectAuthenticatedRequest') return next(err);

    var redirectUrlString = opts.defaultRedirect;

    if  ( req.session && req.session.return ) {
      redirectUrlString = req.session.return;
    }

    var redirectUrl = url.parse(redirectUrlString, true);

    if ( ! opts.httpsOnly ) console.warn('Allowing redirect to non https locations !!!');

    if (redirectUrl.protocol != 'https:' && opts.httpsOnly) {
      return next(new errors.ForbiddenError('Unable to forward token to non-https location'));
    }

    if ( ! _.includes(opts.acceptDomains, redirectUrl.hostname ) ){
      return next(new errors.ForbiddenError('Unable to forward token to unauthorized location'));
    }

    delete req.session.return;

    delete redirectUrl.search; // otherwise url.format() will use this as search
    redirectUrl.query['it'] = err.tokens.it;
    redirectUrl.query['at'] = err.tokens.at;
    redirectUrl.query['rt'] = err.tokens.rt;

    return res.redirect(url.format(redirectUrl));
  });


  /**
   * Error handler for Errors that have a .status and .message property
   *
   */
  app.use(function(err, req, res, next) {

    if (_.has(err, 'status') && _.has(err, 'message')) {
      if (req.xhr) {
        return res.status(err.status)
          .send({ status: err.status, message: err.message });
      }
      return res.status(err.status).send(err.message);
    }
    next(err);
  });



  /**
   * Generic error handling from here on
   */

  app.use(function(err, req, res, next) {
    console.log('ERRORHANDLER');
    console.error(err.stack);
    next(err);
  });

  app.use(function(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something blew up!' });
    } else {
      next(err);
    }
  });

  app.use(function(err, req, res, next){
    res.status(500);
    res.render(__dirname + '/views/500');
  });

};
