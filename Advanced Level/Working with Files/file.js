var fs = require('fs');
var path = require('path');


//Write a file
/*fs.writeFile('html/results.txt', 'Testing FS module', function(err) {
  if(err) throw err;
  console.log('File write completed');
});*/

/*fs.exists('/etc/hshsh', function (exists) {
  console.log(exists ? "it's there" : "no passwd!");
});*/


// Read a file
/*fs.readFile('results.txt', 'utf8', function(err, data) {
  // the data is passed to the callback in the second argument
  console.log(data);
});*/

// Delete a file
/*fs.unlink('results.txt', function (err) {
  if (err) throw err;
  console.log('successfully deleted the file');
});
*/


// Rename a file
/*fs.rename('results.txt', 'prasanna.txt', function (err) {
  if (err) throw err;
  console.log('renamed complete');
});*/


//Create a directory

/*fs.mkdir('sample/test/', 0777, function(err) {
  if(err) throw err;
  console.log('Created newdir');
});*/

// Working with directories - Read a Directory
/*var path = 'sample/';
fs.readdir(path, function (err, files) {
  if(err) throw err;
  files.forEach(function(file) {
    console.log(path+file);
    fs.stat(path+file, function(err, stats) {
      //console.log(stats);
    });
  });
});*/



// Remove a directory

/*fs.rmdir('sample', function(err) {
    if(err) throw err;
    console.log('Removed newdir');
});*/


// Write a Json file
/*fs.writeFile('html/test.json', '{"key": "value"}', function(error){
  if(err) throw err;
  console.log('File write completed');
});*/


// Read files from one and append it to another
/*
var file = fs.createReadStream('html/a.html', {flags: 'r'} );
var out = fs.createWriteStream('html/sample.txt', {flags: 'w'});
file.on('data', function(data) {
  console.log('data', data);
  out.write(data);
});
file.on('end', function() {
  console.log('end');
  out.end(function() {
    console.log('Finished writing to file');
    test.done();
  });
});*/


/*var file = fs.createReadStream('html/a.html', {flags: 'r'} );
var out = fs.createWriteStream('html/sample.txt', {flags: 'w'});
file.pipe(out);*/


// A simple exercise
/*fs.readdir('html', function(err, files) {
    files.filter(function(file) { return path.extname(file) })
         .forEach(function(file) { fs.readFile('html/'+file, 'utf-8', function(err, contents) { scanFile(contents); }); });
});

function scanFile(contents) {
    // write your logic
}*/