var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var app             = express();
var passport = require("./lib/passport");
var https = require('https');
var http = require('http');
var fs = require('fs');
 
var options = { key: fs.readFileSync('server.key'), cert: fs.readFileSync('server.crt') }; 
var config = require('./config.json');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
    secret: "secretkey",
    name: "secretcookiename",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

/** application routes applied here **/
require("./routes")(app);

// Create an HTTP service.
http.createServer(app).listen(3000);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(9090);
