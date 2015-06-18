var express = require('express');
var router = express.Router();

module.exports = function(options){
  return router;
};

router.get('/', function(req, res, next){

  // If token still ok
  res.render(__dirname + '/views/index.jade');

  // If token expired
  res.render(__dirname + '/views/index.jade', {
    invalidLink: true
  });

});

router.post('/', function(req, res, next){

  // If reset succeeded
  res.render(__dirname + '/views/success.jade');

  // If token expired
  //res.render(__dirname + '/views/index.jade', {
  //  invalidLink: true
  //});

});
