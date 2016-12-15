var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dbHelper = require('./dbHelper');
var app = express();


app.use(express.static('client/build'));
// tell express to use bodyparser -- take the request body and put it as json on the req object
app.use(bodyParser.json());

// GET
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



// POST
app.post('/quizzes', function(req, res){
  dbHelper.createQuiz(req.body.title, function( err ) {
    if ( err ) {
      res.status( 500 ).end();
    }
    else {
      // ending the response, status 200 is succesful 
      res.status( 200 ).end();
    }
  });
});



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Location-based Education listening at http://%s:%s', host, port);
});
