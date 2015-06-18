var express = require('express');
var router = express.Router();
var Authomator = require('authomator-node-client');

module.exports = function(options){
  return router;
};

router.get('/', function(req, res, next){
  res.render(__dirname + '/views/index.jade');
});


router.post('/', function(req, res, next){

  new Authomator().signup(req.body.email, req.body.password, function(err, tokens) {

    if (err) return res.render(__dirname + '/views/index.jade', {
      UserExistsError: (err.name == 'UserExistsError'),
      BadParamsError: (err.name == 'BadParamsError')
    });

  });
});
