var express = require('express');
var router = express.Router();

module.exports = function(options){
  return router;
};

router.get('/', function(req, res, next){
  res.render(__dirname + '/views/index.jade');
});
