var express = require('express');
var router = express.Router();
var Authomator = require('authomator-node-client');
var errors = require('../../errors');
var _ = require('lodash');


var resetUrl = 'http://127.0.0.1:3000/reset-password';

module.exports = function(options){

  if (options && options.url) {
    resetUrl = options.url;
  }
  return router;
};

router.get('/', function(req, res, next){
  res.render(__dirname + '/views/index.jade');
});

router.post('/', function(req, res, next){

  new Authomator().sendResetMail(req.body.email, resetUrl, function(err) {

    if (err) {

      if (!_.contains(['NoSuchUserError', 'BadParamsError'], err.name)) return next(err);

      return res.render(__dirname + '/views/index.jade', {
        invalidEmail: (err.name == 'NoSuchUserError'),
        BadParamsError: (err.name == 'BadParamsError')
      });
    }

    res.render(__dirname + '/views/success.jade');
  });
});
