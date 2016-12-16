var quizServer = require('../models/quizServer');

window.onload = function() {
  var allQuizzes;

  quizServer.getAllQuizzes( function( allQuizzes ) {
    var numberPerRow = 3;
    var quizzesContainer = document.getElementById( 'quizzes-container' );
    var i = 0;
    var rowCount = 0;
    var addButtonAdded = false;

    while( i < allQuizzes.length ) {
      var rowDiv = document.createElement( 'div' );
      rowDiv.classList.add( 'quiz-row' );
      while( rowCount < numberPerRow && i < allQuizzes.length ) {
        // create add button if it hasn't been added alread
        if ( !addButtonAdded ) {
          var addButton = document.createElement( 'div' );
          addButton.classList.add( 'quiz-item' );
          addButton.id = "add-quiz-button";
          addButton.onclick = function() {
            window.location.href = "http://localhost:3000/admin/quizzes/new";
          };
          addButton.innerText = "+";
          rowDiv.appendChild( addButton );
          rowCount++;
          addButtonAdded = true;
        }

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
