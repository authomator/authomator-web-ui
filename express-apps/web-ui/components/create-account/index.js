var express = require('express');
var router = express.Router();

module.exports = function(options){
  return router;
};

router.get('/', function(req, res, next){
  res.render(__dirname + '/views/index.jade');
});


router.post('/', function(req, res, next){

  // Check if credentials are valid

  res.render(__dirname + '/views/index.jade', {
    emailAlreadyInUse: true
  });

});
