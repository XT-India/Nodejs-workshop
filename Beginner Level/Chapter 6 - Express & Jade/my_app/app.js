
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer(); //this server inherits from the connect HTTPServer module
//which in turn inherits from the Node HTTP Server. 

// Configuration of the app settings

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //middleware components are basically added to the app
  //Body Parser : It is used to parse the request body 
  app.use(express.bodyParser()); 
  //Method Override : It enables browsers to simulate using HTTP Methods other than GET and POST
  app.use(express.methodOverride());
  //This middleware component dispatches each request to the proper listener as defined in a routing table, depending on HTTP method and URL
  app.use(app.router);
  //static file server middleware, which will serve static files inside your public directory.
  app.use(express.static(__dirname + '/public'));
});

//configuring the error handler based on the environment
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
//If a get request is sent to the url /, then routes.index should be called.
app.get('/', routes.index);

//listening to a port
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
