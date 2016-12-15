var quizServer = require('../models/quizServer');

window.onload = function() {
  var allQuizzes;

  quizServer.getAllQuizzes( function( data ) {
    allQuizzes = data;
    var allQuizzesList = document.getElementById( 'all-quizzes-list' );
    allQuizzes.forEach( function( quiz ) {
      var li = document.createElement( 'li' );
      li.innerText = quiz.title;
      allQuizzesList.appendChild( li );
    });
  });
}
