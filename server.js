var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dbHelper = require('./dbHelper');
var firebase = require('firebase');
var firebaseHelper = require('./firebaseHelper');
var values = require('./values');
var app = express();


app.use(express.static('client/build'));
// tell express to use bodyparser -- take the request body and put it as json on the req object
app.use(bodyParser.json());

// INITIALISE FIREBASE
console.log( "Initialising firebase" );
var config = {
  apiKey: values.firebaseAPIKey,
  authDomain: values.firebaseAuthDomain,
  databaseURL: values.firebaseDatabaseUrl
};
this.app = firebase.initializeApp(config);

firebase.auth().onAuthStateChanged( function( user ) {
  if ( user ) {
    console.log( "server signed in to firebase with account:", user.email );
  } else {
    console.log( "server signed out of firebase" );
  }
});

firebase.auth().signInWithEmailAndPassword( values.userEmail, values.userPassword ).catch( function( err ) {
  var errorCode = err.code;
  var errorMessage = err.message;
  console.error( "sign in to firebase failed, errorCode:%s, errorMessage:%s", errorCode, errorMessage );
  callback( err );
});

// GET
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// GET
app.get('/admin/quizzes', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/admin/index.html'));
});

// GET
app.get('/admin/quizzes/new', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/admin/addQuiz.html'));
});

// GET QUIZZES
app.get('/quizzes', function(req, res){
  firebaseHelper.getAllQuizzes(function(err, allQuizzes){
    if ( err ) {
      res.status( 500 ).end();
    }
    else {
      res.json(allQuizzes);
    }
  });
});

// POST
app.post('/quizzes', function(req, res){
  firebaseHelper.createQuiz(req.body.title, function( err ) {
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
