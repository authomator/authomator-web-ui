
/**
 * Special error to trigger the redirect for authenticated requests
 *
 * @param {Object} tokens - Object containing it, at, rt keys with the tokens
 * @constructor
 */
function RedirectAuthenticatedRequest(tokens) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = "RedirectAuthenticatedRequest";
  this.message = 'This is an error object to make redirections easier, it is not an actual error';
  this.tokens = tokens;
}
RedirectAuthenticatedRequest.prototype = Error.prototype;
exports.RedirectAuthenticatedRequest = RedirectAuthenticatedRequest;



/**
 * Forbidden error (http 403)
 *
 * @param {Object} tokens - Object containing it, at, rt keys with the tokens
 * @constructor
 */
function ForbiddenError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'ForbiddenError';
  this.status = 403;
  this.message = 'Forbidden' || message;
}
ForbiddenError.prototype = Error.prototype;
exports.ForbiddenError = ForbiddenError;




