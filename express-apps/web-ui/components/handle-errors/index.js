module.exports = function(app, options){

  app.use(function(err, req, res, next) {
    console.log('ERRORHANDLER');
    console.error(err.stack);
    next(err);
  });

  app.use(function(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something blew up!' });
    } else {
      next(err);
    }
  });

  app.use(function(err, req, res, next){
    res.status(500);
    res.render(__dirname + '/views/500');
  });

};
