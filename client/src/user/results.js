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

      var score = 0;

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

        if ( userAnswer === correctAnswer ) {
          resultTd.innerText += " ✔";
          resultTd.classList.add( "correct-answer" );
          score += 1;
        }
        else {
          resultTd.innerText += " ✘";
          resultTd.classList.add( "wrong-answer" );
          resultTd.classList.add( "tooltip" );
          var correctAnswerSpan = document.createElement( 'span' );
          correctAnswerSpan.innerText = correctAnswer;
          correctAnswerSpan.classList.add( 'tooltip-text' );
          resultTd.appendChild( correctAnswerSpan );
        }

        resultRow.appendChild( questionTextTd );
        resultRow.appendChild( resultTd );
        resultsTableBody.appendChild( resultRow );
      });

      var totalTextTd = document.createElement( 'td' );
      totalTextTd.innerText = "";
      var scoreTd = document.createElement( 'td' );
      var scoreOutOf = quiz.questions.length.toString();
      scoreTd.innerText = score.toString() + " / " + scoreOutOf;

      var totalScoreTr = document.createElement( 'tr' );
      totalScoreTr.id = "total-score-row";
      totalScoreTr.appendChild( totalTextTd );
      totalScoreTr.appendChild( scoreTd );
      resultsTableBody.appendChild( totalScoreTr );
    });
  });
};
