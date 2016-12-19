var miscHelper = require('../helpers/miscHelpers');
var quizServer = require('../models/quizServer');
var QuizManager = require('./quizManager');
var ResultsManager = require('./resultsManager');

var takeQuizDiv;
var resultsDiv;

var quiz;
var score = 0;

window.onload = function() {
  takeQuizDiv = document.getElementById( 'take-quiz-container' );
  resultsDiv = document.getElementById( 'results-container' );
  resultsDiv.style.display = 'none';

  var quizId = miscHelper.getLastUrlElement();
  console.log("loading quiz with id '" + quizId + "'");

  quizServer.getQuizById( quizId, startQuiz );
};

var startQuiz = function( fetchedQuiz ) {
  quiz = fetchedQuiz;
  console.log("fetched quiz:", quiz);
  var titleP = document.getElementById('quiz-title');
  titleP.innerText = quiz.title;
  var quizManager = new QuizManager( quiz.questions );
  quizManager.startQuiz( showResults );
}

var showResults = function( userAnswers ) {

  takeQuizDiv.style.display = 'none';
  resultsDiv.style.display = 'block';
  var resultsTableBody = document.getElementById( 'results-table-body' );

  console.log( "user answers:", userAnswers );

  var marks = [];

  quiz.questions.forEach( function( question, index ) {
    var questionText = question.text;
    var userAnswerCode = userAnswers[index].countryCode;
    var userAnswerName = userAnswers[index].countryName;
    var correctAnswerCode = question.countryCode;
    var correctAnswerName = question.countryName;

    var resultRow = document.createElement( 'tr' );
    var questionNumber = (index + 1).toString();
    resultRow.id = 'question-' + questionNumber;
    var questionTextTd = document.createElement( 'td' );
    questionTextTd.innerText = "Q" + questionNumber + ". " + questionText;
    var resultTd = document.createElement( 'td' );
    resultTd.innerText = userAnswerName;
    resultTd.classList.add( 'answer' );

    resultRow.appendChild( questionTextTd );
    resultRow.appendChild( resultTd );
    resultsTableBody.appendChild( resultRow );

    marks[index] = {
      questionNumber: questionNumber,
      td: resultTd,
      correct: userAnswerCode === correctAnswerCode,
      correctAnswer: correctAnswerName
    };
  });

  var totalTextTd = document.createElement( 'td' );
  totalTextTd.classList.add( 'empty-cell' );
  totalTextTd.innerText = "";
  scoreP = document.getElementById( 'score-p' );
  scoreOutOf = quiz.questions.length.toString();
  updateScore( 0 );

  var totalScoreTr = document.createElement( 'tr' );
  totalScoreTr.appendChild( totalTextTd );
  resultsTableBody.appendChild( totalScoreTr );

  var i = 1;
  for ( aMark of marks ) {
    (function( mark ) {
      scoreQuestion( mark , i * 1000 );
    })( aMark );
    i++;
  }

  setTimeout( function() {
    window.scrollTo( 0, 0 );
  }, i * 1000 );
};

var updateScore = function( scoreIncrease ) {
  score += scoreIncrease;
  scoreP.innerText = score.toString() + " / " + scoreOutOf;
  if ( scoreIncrease > 0 ) {
    scoreP.classList.remove( 'pulse-green' );
    setTimeout( function() {
      scoreP.classList.add( 'pulse-green' );
    }, 100 );
  }
};

var scoreQuestion = function( mark, timeoutLength ) {
  setTimeout( function () {
    var td = mark.td;
    var correct = mark.correct;
    var correctAnswer = mark.correctAnswer;

    window.location.href = "#";
    window.location.href = "#question-" + mark.questionNumber;

    if ( correct ) {
      td.innerText += " ✔";
      td.classList.add( "correct-answer" );
      updateScore( 1 );
    }
    else {
      td.innerText += " ✘";
      td.classList.add( "wrong-answer" );
      td.classList.add( "tooltip" );
      var correctAnswerSpan = document.createElement( 'span' );
      correctAnswerSpan.innerText = correctAnswer;
      correctAnswerSpan.classList.add( 'tooltip-text' );
      td.appendChild( correctAnswerSpan );
    }
  }, timeoutLength);
};
