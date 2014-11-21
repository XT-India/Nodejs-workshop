var fs = require('fs');
var path = require('path');


//Write a file
/*fs.writeFile('results.txt', 'Hello World', function(err) {
  if(err) throw err;
  console.log('File write completed');
});*/


// Read a file
/*fs.readFile('results.txt', 'utf8', function(err, data) {
  // the data is passed to the callback in the second argument
  console.log(data);
});*/

// Delete a file
/*fs.unlink('sample/test.jpg', function (err) {
  if (err) throw err;
  console.log('successfully deleted the file');
});*/


// Rename a file
/*fs.rename('sample/IMG_20141022_184619.jpg', 'sample/photo.jpg', function (err) {
  if (err) throw err;
  console.log('renamed complete');
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

//Create a directory

/*fs.mkdir('newdir', 0777, function(err) {
  if(err) throw err;
  console.log('Created newdir');
});*/

// Remove a directory
/*
fs.rmdir('./newdir', function(err) {
    if(err) throw err;
    console.log('Removed newdir');
});
*/

// Write a Json file
/*fs.writeFile('newdir/test.json', '{"key": "value"}', function(error){
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


var file = fs.createReadStream('html/a.html', {flags: 'r'} );
var out = fs.createWriteStream('html/sample.txt', {flags: 'w'});
file.pipe(out);


// A simple exercise
/*fs.readdir('html', function(err, files) {
    files.filter(function(file) { return path.extname(file) })
         .forEach(function(file) { fs.readFile('html/'+file, 'utf-8', function(err, contents) { scanFile(contents); }); });
});

function scanFile(contents) {
    if (contents.indexOf('img') !== -1) {
         console.log('image found');
    }
}*/