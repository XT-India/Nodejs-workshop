var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  require('os').cpus().forEach(function(){
    cluster.fork();
  });
  // In case the worker dies!
  /*cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });*/
  // As workers come up.
  /*cluster.on('listening', function(worker, address) {
    console.log("A worker with #"+worker.id+" is now connected to " +
     address.address +
    ":" + address.port);
  });
  // When the master gets a msg from the worker increment the request count.
  var reqCount = 0;
  Object.keys(cluster.workers).forEach(function(id) {
    cluster.workers[id].on('message',function(msg){
      if(msg.info && msg.info == 'ReqServMaster'){
        reqCount += 1;
      }
    });
  });
  // Track the number of request served.
  setInterval(function() {
    console.log("Number of request served = ",reqCount);
  }, 1000);*/

} else {
  // Workers can share the same port!
  require('http').Server(function(req, res) {
    res.writeHead(200);
    res.end("Cluster testing .....");
    // Notify the master about the request.
   // process.send({ info : 'ReqServMaster' });
  }).listen(8000);
}
