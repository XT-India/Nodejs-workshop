
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = express.bodyParser();

var app = module.exports = express.createServer();
app.use(bodyParser);
app.set('views', __dirname + '/views');
 app.set('view engine', 'jade');

//Get Requests
app.get('/',function(request,response){
	// response.send('Hello Express - first route!');
	response.render('layout',{welcomeMessage:'Hello to Express!!'});
});

app.get('/users',function(request,response){
	response.send('Hello to all the users');
});

app.get('/users/:userId',function(request,response){
	var userId = request.params.userId;
	response.send('Details for user# : '+userId);
});

//Post requests
app.post('/postUser',function(request,response){
	var user = request.body.username;
	response.send('Posted a user :'+user);
});


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

