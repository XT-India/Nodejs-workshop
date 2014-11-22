
var https = require('https'),
    http  = require('http'),
    httpProxy = require('http-proxy');

//
// Create a HTTP Proxy server with a HTTPS target
//
httpProxy.createProxyServer({
  target: 'https://google.com',
  agent  : https.globalAgent,
  headers: {
    host: 'google.com'
  }
}).listen(9090);

