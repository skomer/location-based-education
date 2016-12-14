var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('client/build'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Location-based Education listening at http://%s:%s', host, port);
});
