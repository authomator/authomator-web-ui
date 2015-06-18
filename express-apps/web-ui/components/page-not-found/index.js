var express = require('express');
var router = express.Router();

module.exports = function(options){
  return router;
};

router.all('*', function(req, res, next){
  res.status(404);
  res.render(__dirname + '/views/404');
});
