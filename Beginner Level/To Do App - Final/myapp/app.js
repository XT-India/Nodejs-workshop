var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));

 app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', routes);



module.exports = app;
