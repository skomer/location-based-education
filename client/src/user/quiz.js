var quizServer = require('../models/quizServer');
var MapHelper = require('../helpers/mapHelper');
var ProgressBarView = require('../views/progressBarView');
var InfoBoxView = require('../views/infoBoxView');

// Main divs
var takeQuizDiv;
var resultsDiv;
var infoBoxView;

// TAKE QUIZ DIV
var answerTextP;
var questionTextP;
var nextResultsButton;
var quiz;
var currentQuestionIndex = 0;
var userAnswers = [];
var currentAnswer;
var progressBarView;

// RESULTS DIV
// functions
var updateScoreTd;
var scoreQuestion;

// DOM elements
var scoreP;
var scoreOutOf;

// variables
var score = 0;

window.onload = function() {
  var takeQuizDiv = document.getElementById( 'take-quiz-container' );
  var resultsDiv = document.getElementById( 'results-container' );
  resultsDiv.style.display = 'none';
  infoBoxView = new InfoBoxView();

  var quizTitleP = document.getElementById('quiz-title');
  var mapContainer = document.getElementById('map-container');
  questionTextP = document.getElementById('question-text');
  answerTextP = document.getElementById('answer-text');
  nextResultsButton = document.getElementById('next-results-button');

  var lastSlashIndex = window.location.href.lastIndexOf( '/' );
  var quizId = window.location.href.substr( lastSlashIndex + 1 );
  console.log("quiz id:", quizId);

  quizServer.getQuizById( quizId, function(fetchedQuiz){
    quiz = fetchedQuiz;
    var numberOfQuestions = quiz.questions.length;
    console.log("numberOfQuestions:", numberOfQuestions);
    var progressBarView = new ProgressBarView( numberOfQuestions );
    console.log("fetched quiz:", quiz);
    quizTitleP.innerText = quiz.title;
    var mapHelper = new MapHelper(mapContainer, 55.9, -3.1, 4, mapClicked);
    loadQuestion(currentQuestionIndex);
    progressBarView.draw( 1 );
    nextResultsButton.onclick = function(){
      userAnswers.push( currentAnswer );
      currentQuestionIndex++;
      if(currentQuestionIndex < numberOfQuestions){
        loadQuestion(currentQuestionIndex);
        progressBarView.nextQuestion();
      } else {
        takeQuizDiv.style.display = 'none';
        resultsDiv.style.display = 'block';
        showResults();
      }
    }
  });
};

var mapClicked = function(countryCode, countryName){
  if ( countryCode && countryName ) {
    answerTextP.innerText = "Your answer is: " + countryName;
    nextResultsButton.disabled = false;
    currentAnswer = {
      countryCode: countryCode,
      countryName: countryName
    };
  } else {
    infoBoxView.showWithText( "That is not a country, please click a country" );
  }
};

var loadQuestion = function(questionIndex){
  console.log("loading question:", questionIndex);
  var currentQuestionText = quiz.questions[questionIndex].text;
  questionTextP.innerText = currentQuestionText;
  nextResultsButton.disabled = true;
  answerTextP.innerText = "Click map to select answer";
};

var showResults = function() {
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
