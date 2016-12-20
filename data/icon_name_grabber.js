var fs = require('fs');

var imagesDirectory = '../client/build/images/';
fs.readdir( imagesDirectory, function(err, files) {
  files.forEach( function( file ) {
    console.log("'" + file + "',");
  });
});
