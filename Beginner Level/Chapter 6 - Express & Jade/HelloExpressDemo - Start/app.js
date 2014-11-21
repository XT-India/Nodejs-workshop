
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
