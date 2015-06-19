var config = require('config');

module.exports = exports = function(opts) {

  var defaultOpts = {
    query: 'return'
  };

  config.util.extendDeep(defaultOpts, opts);

  return function (req, res, next) {

    if ( req.query[defaultOpts.query] ) {
      if ( req.session ) {
        if ( ! req.session.return ) {
          req.session.return = req.query[defaultOpts.query];
        }
      }
      else {
        return next(new Error('Unable to add return to session, please activate a session middleware !!'));
      }
    }
    return next();
  }
};
