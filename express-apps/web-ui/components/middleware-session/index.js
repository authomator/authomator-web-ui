var sessions = require('client-sessions');
var config = require('config');

var opts = {
// cookie name dictates the key name added to the request object
  cookieName: 'session',

  // should be a large unguessable string
  secret: null,

  // how long the session will stay valid in ms
  duration: 1 * 60 * 60 * 1000,

  // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  activeDuration: 1000 * 60 * 5,

  cookie: {
    ephemeral: true, // when true, cookie expires when the browser closes

    httpOnly: true, // when true, cookie is not accessible from javascript

    secure: false   // when true, cookie will only be sent over SSL.
                    // use key 'secureProxy' instead if you handle SSL not in your node process
  }
};

module.exports = function middleware(options) {

  config.util.extendDeep(opts, options);
  config.util.extendDeep(opts, config.get('webUi.sessions'));

  if (!opts.secret) {
    throw new Error('Critical issue, no cookie secret is configured..stopping')
  }

  return sessions(opts);

}
