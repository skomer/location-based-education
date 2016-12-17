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
      quiz.questions.forEach( function( question, index ) {
        var questionText = question.text;
        var userAnswer = countriesServer.nameForCode( userAnswers[index] );
        var correctAnswer = countriesServer.nameForCode( question.answer );

        var resultRow = document.createElement( 'tr' );
        var questionTextTd = document.createElement( 'td' );
        questionTextTd.innerText = questionText;
        var resultTd = document.createElement( 'td' );
        resultTd.innerText = "user answer: " + userAnswer + ", correct answer: " + correctAnswer;
        resultRow.appendChild( questionTextTd );
        resultRow.appendChild( resultTd );
        resultsTableBody.appendChild( resultRow );
      });
    });
  });
};
