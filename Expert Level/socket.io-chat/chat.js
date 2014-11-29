/*****************************************************/
/* Server Logic                                      */
/*****************************************************/
var express = require('express'),
    app = express(),
    port = 3800,
    io = require('socket.io').listen(app.listen(port , function() {
    	console.log('listening on port: ' + port);
    }), { log: false });

console.log(io);
//App Config
app.set('views', __dirname + '/views')
    .engine('html', require('ejs').renderFile)
    .get('/', function (req, res) {
    	res.render('index.html');
   });


//Socket.IO
io.on('connection', function (socket){

	//Global Welcome Message
	socket.emit('console', "Welcome to Sample Chat APP");

	//When the client 'sends" data to the server
	socket.on('receive', function (data) {
		var d = new Date();
		io.emit('message', '<small>['+d.toLocaleTimeString()+']</small>'+data.replace(/<(?:.|\n)*?>/gm, ''));
        //io.emit('message', '<b>'+data.name.replace(/<(?:.|\n)*?>/g, '')+'</b> <small>['+d.toLocaleTimeString()+']</small>'+data.msg.replace(/<(?:.|\n)*?>/gm, ''));
	});


});
