var quizServer = require('../models/quizServer');
var MapHelper = require('../helpers/mapHelper');

var answerTextP;
var questionTextP;
var quiz;
var currentQuestionIndex = 0;
var userAnswers = [];

window.onload = function() {
  var quizTitleP = document.getElementById('quiz-title');
  var mapContainer = document.getElementById('map-container');
  questionTextP = document.getElementById('question-text');
  answerTextP = document.getElementById('answer-text');
  var progressTextP = document.getElementById('progress-text');
  var nextResultsButton = document.getElementById('next-results-button');

  var lastSlashIndex = window.location.href.lastIndexOf( '/' );
  var quizId = window.location.href.substr( lastSlashIndex + 1 );
  console.log("quiz id:", quizId);

  quizServer.getQuizById( quizId, function(fetchedQuiz){
    quiz = fetchedQuiz;
    console.log("fetched quiz:", quiz);
    quizTitleP.innerText = quiz.title;
    var mapHelper = new MapHelper(mapContainer, 55.9, -3.1, 4, mapClicked); 
    updateQuestionDisplay(); 
  });
};

var mapClicked = function(countryCode, countryName){
  answerTextP.innerText = "Your answer is: " + countryName;
};

var updateQuestionDisplay = function(){
  var currentQuestionText = quiz.questions[currentQuestionIndex].text;
  questionTextP.innerText = currentQuestionText;
};