var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var firebaseHelper = require('./firebaseHelper');
var fs = require( 'fs' );
var app = express();


app.use(express.static('client/build'));
// tell express to use bodyparser -- take the request body and put it as json on the req object
app.use(bodyParser.json());

// INITIALISE FIREBASE
console.log( "Initialising firebase" );
firebaseHelper.init();

// GET HOME
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/home.html'));
});


///////////
// ADMIN //
///////////

// GET ADMIN QUIZZES
app.get('/admin/quizzes', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/admin/index.html'));
});

// GET QUIZ ADD EDIT
app.get('/admin/quizzes/new', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/admin/addQuiz.html'));
});


//////////
// USER //
//////////

//GET USER QUIZZES
app.get('/user/quizzes', function(req, res){
  res.sendFile(path.join(__dirname + '/client/build/user/index.html'));
});

//GET QUESTIOn
app.get('/user/quizzes/:quiz_id', function( req, res) {
  var quizId = req.params.quiz_id;
  console.log("quiz requested:", quizId);
  res.sendFile(path.join(__dirname + '/client/build/user/question.html'));
});

/////////
// API //
/////////

// GET ALL COUNTRIES
app.get('/countries', function(req, res){
  var buffer = fs.readFileSync('data/countries.json');
  var bufferString = buffer.toString();
  var countries = JSON.parse( bufferString );
  res.json( countries );
})

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

// GET QUIZ
app.get('/quizzes/:quiz_id', function( req, res ) {
  var quizId = req.params.quiz_id;
  firebaseHelper.getQuizById( quizId, function( quiz ) {
    if ( quiz ) {
      console.log( "receieved quiz with id", quizId, ":\n", quiz );
      res.json( JSON.stringify( quiz ) );
    }
    else {
      console.log( "no quiz with id", quizId, "found" );
      res.status( 404 ).end();
    }
  });
});

//GET QUESTIOn
app.get('/quizzes/:quiz_id/:question_index', function( req, res ) {
  var quizId = req.params.quiz_id;
  var questionIndex = req.params.question_index;
  firebaseHelper.getQuizById( quizId, function( quiz ) {
    if ( quiz ) {
      console.log( "recieved quiz with id", quizId, ":\n", quiz );
      if ( quiz.questions && quiz.questions[questionIndex] ) {
        res.json( JSON.stringify( quiz.questions[questionIndex] ) );
      }
      else {
        console.log( "quiz", quizId, "doesn't have a question at index", questionIndex );
        res.status( 404 ).end();
      }
    }
    else {
      console.log( "no quiz with id", quizId, "found" );
      res.status( 404 ).end();
    }
  });
});

// POST QUIZ
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
