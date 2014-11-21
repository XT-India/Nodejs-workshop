
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

//Get Request
app.get('/',function(request,response){
	response.send('Hello Express - first route!');
});

app.get('/users',function(request,response){
	response.send('Hello to all the users');
});

app.get('/users/:userId',function(request,response){
	var userId = request.params.userId;
	response.send('Details for user# : '+userId);
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

