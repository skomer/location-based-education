var CountriesServer = require('../models/countriesServer');
var quizServer = require('../models/quizServer');

// functions
var updateScoreTd;
var scoreQuestion;

// DOM elements
var scoreP;
var scoreOutOf;

// variables
var score = 0;

window.onload = function() {
  var quizTitleH2 = document.getElementById( 'quiz-title' );
  var resultsTableBody = document.getElementById( 'results-table-body' );

  var userAnswers = [ 'AF', 'BB', 'AF', 'FR', 'MA' ];

  var countriesServer = new CountriesServer( function() {
    quizServer.getQuizById( '-KZCcaO1hToqpMhfHnls', function( quiz ) {
      console.log( "quiz questions:", quiz.questions );
      console.log( "user answers:", userAnswers );

      quizTitleH2.innerText = quiz.title;
      var marks = [];

      quiz.questions.forEach( function( question, index ) {
        var questionText = question.text;
        var userAnswer = countriesServer.nameForCode( userAnswers[index] );
        var correctAnswer = countriesServer.nameForCode( question.answer );

        var resultRow = document.createElement( 'tr' );
        var questionNumber = (index + 1).toString();
        resultRow.id = 'question-' + questionNumber;
        var questionTextTd = document.createElement( 'td' );
        questionTextTd.innerText = "Q" + questionNumber + ". " + questionText;
        var resultTd = document.createElement( 'td' );
        resultTd.innerText = userAnswer;
        resultTd.classList.add( 'answer' );

        resultRow.appendChild( questionTextTd );
        resultRow.appendChild( resultTd );
        resultsTableBody.appendChild( resultRow );

        marks[index] = {
          questionNumber: questionNumber,
          td: resultTd,
          correct: userAnswer === correctAnswer,
          correctAnswer: correctAnswer
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
    });
  });
};

var updateScore = function( scoreIncrease ) {
  score += scoreIncrease;
  scoreP.innerText = score.toString() + " / " + scoreOutOf;
  if ( scoreIncrease > 0 ) {
    scoreP.classList.remove( 'pulse-green' );
    setTimeout( function() {
      scoreP.classList.add( 'pulse-green' );
    }, 10 );
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
