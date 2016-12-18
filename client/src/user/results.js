var CountriesServer = require('../models/countriesServer');
var quizServer = require('../models/quizServer');

window.onload = function() {
  var quizTitleH2 = document.getElementById( 'quiz-title' );
  var resultsTableBody = document.getElementById( 'results-table-body' );

  var userAnswers = [ 'AF', 'BB', 'AF', 'FR' ];

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
        var questionTextTd = document.createElement( 'td' );
        var questionNumber = (index + 1).toString();
        questionTextTd.innerText = "Q" + questionNumber + ". " + questionText;
        var resultTd = document.createElement( 'td' );
        resultTd.innerText = userAnswer;
        resultTd.classList.add( 'answer' );

        resultRow.appendChild( questionTextTd );
        resultRow.appendChild( resultTd );
        resultsTableBody.appendChild( resultRow );

        marks[index] = {
          td: resultTd,
          correct: userAnswer === correctAnswer,
          correctAnswer: correctAnswer
        };
      });

      var totalTextTd = document.createElement( 'td' );
      totalTextTd.innerText = "";
      var scoreTd = document.createElement( 'td' );
      var scoreOutOf = quiz.questions.length.toString();
      scoreTd.innerText = 0 + " / " + scoreOutOf;

      var totalScoreTr = document.createElement( 'tr' );
      totalScoreTr.id = "total-score-row";
      totalScoreTr.style.visibility = 'hidden';
      totalScoreTr.appendChild( totalTextTd );
      totalScoreTr.appendChild( scoreTd );
      resultsTableBody.appendChild( totalScoreTr );

      var i = 1;
      for ( aMark of marks ) {
        (function( mark ) {
          setTimeout( function() {
            console.log("mark:", mark);
            var td = mark.td;
            var correct = mark.correct;
            var correctAnswer = mark.correctAnswer;

            if ( correct ) {
              td.innerText += " ✔";
              td.classList.add( "correct-answer" );
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
          }, i * 1000 );
        })( aMark );
        i++;
      }
    });
  });
};

var scoreQuestion = function( mark ) {

};
