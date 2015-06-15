var express = require('express');
var app = express();
var authomatorWebUI = require('./express-apps/web-ui')();

app.use(authomatorWebUI);

app.listen(3000);
