//Require Necessary modules
var dataGram = require('dgram');
var server = dataGram.createSocket('udp4');

// Listening for messages - Register a callback function to receive the new message emitted by UDP server
server.on('message', function(message) {
console.log('server got message: ' + message);
});

//Bind the server to a specific UDP port 
var port = 4000;
server.on('listening', function() {
var address = server.address();
console.log('server listening on ' + address.address + ':' + address.port);
});
server.bind(port);