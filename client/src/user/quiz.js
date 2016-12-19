var miscHelper = require('../helpers/miscHelpers');
var quizServer = require('../models/quizServer');
var QuizManager = require('./quizManager');
var ResultsManager = require('./resultsManager');

var takeQuizDiv;
var resultsDiv;

window.onload = function() {
  takeQuizDiv = document.getElementById( 'take-quiz-container' );
  resultsDiv = document.getElementById( 'results-container' );
  resultsDiv.style.display = 'none';

  var quizId = miscHelper.getLastUrlElement();
  console.log("loading quiz with id '" + quizId + "'");

  quizServer.getQuizById( quizId, startQuiz );
};

var startQuiz = function( fetchedQuiz ) {
  console.log( "fetched quiz:", fetchedQuiz );
  var titleP = document.getElementById('quiz-title');
  titleP.innerText = fetchedQuiz.title;
  var quizManager = new QuizManager( fetchedQuiz.questions );
  quizManager.startQuiz( showResults );
}

var showResults = function( questions, userAnswers ) {
  takeQuizDiv.style.display = 'none';
  resultsDiv.style.display = 'block';
  console.log( "user answers:", userAnswers );
  var resultsManager = new ResultsManager( questions, userAnswers );
  resultsManager.scoreQuiz();
};
