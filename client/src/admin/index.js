var quizServer = require('../models/quizServer');

window.onload = function() {
  var allQuizzes;

  quizServer.getAllQuizzes( function( allQuizzes ) {
    var numberPerRow = 3;
    var quizzesContainer = document.getElementById( 'quizzes-container' );
    var i = 0;
    var rowCount = 0;
    while( i < allQuizzes.length ) {
      var rowDiv = document.createElement( 'div' );
      rowDiv.classList.add( 'quiz-row' );
      while( rowCount < numberPerRow && i < allQuizzes.length ) {
        var quiz = allQuizzes[i];
        var div = document.createElement( 'div' );
        div.innerText = quiz.title;
        div.classList.add( 'quiz-item' );
        rowDiv.appendChild( div );
        rowCount++;
        i++;
      }
      quizzesContainer.appendChild( rowDiv );
      rowCount = 0;
    }
  });
}
