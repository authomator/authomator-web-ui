var express = require('express');
var router = express.Router();
var Authomator = require('authomator-node-client');
var errors = require('../../errors');
var _ = require('lodash');

module.exports = function(options){
  return router;
};

router.get('/', function(req, res, next){
  res.render(__dirname + '/views/index.jade');
});

router.post('/', function(req, res, next){

  new Authomator().login(req.body.email, req.body.password, function(err, tokens) {

    if (err) {

      if (!_.contains(['InvalidCredentialsError', 'BadParamsError'], err.name)) return next(err);

      return res.render(__dirname + '/views/index.jade', {
        invalidCredentials: (err.name == 'InvalidCredentialsError'),
        BadParamsError: (err.name == 'BadParamsError')
      });
    }

    next(new errors.RedirectAuthenticatedRequest(tokens));
  });
});
