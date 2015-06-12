var express = require('express');
var app = express();
var authomatorWebUI = require('./express-app');
var morgan = require('morgan');

app.use(morgan('combined'));
app.use(authomatorWebUI);

app.listen(3000);
