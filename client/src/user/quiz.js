var quizServer = require('../models/quizServer');

window.onload = function() {
  var lastSlashIndex = window.location.href.lastIndexOf( '/' );
  var quizId = window.location.href.substr( lastSlashIndex + 1 );
  console.log("quiz id:", quizId);

  quizServer.getQuizById( quizId, function(quiz){
    console.log("Quiz:", quiz);
  });
};