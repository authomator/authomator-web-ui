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

  new Authomator().resetPassword(req.body.password, req.query.reset, function(err, tokens) {

    if (err) {

      if (!_.contains(['InvalidTokenError', 'NoSuchUserError', 'BadParamsError'], err.name)) return next(err);

      return res.render(__dirname + '/views/index.jade', {
        invalidToken: (err.name == 'InvalidTokenError' || err.name == 'NoSuchUserError'),
        BadParamsError: (err.name == 'BadParamsError')
      });
    }

    res.render(__dirname + '/views/success.jade');
  });
});
