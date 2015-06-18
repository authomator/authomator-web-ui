var express = require('express');
var app = express();
var config = require('config');
var authomatorWebUI = require('./express-apps/web-ui')();
var port = config.port || 3000;

app.use(authomatorWebUI);

app.listen(port, function(){
  console.log('Authomator Web UI is running on port %s', port);
});
