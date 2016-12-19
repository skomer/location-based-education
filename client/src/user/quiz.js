var quizServer = require('../models/quizServer');
var MapHelper = require('../helpers/mapHelper');

window.onload = function() {
  var quizTitleP = document.getElementById('quiz-title');
  var mapContainer = document.getElementById('map-container');
  var questionTextP = document.getElementById('question-text');
  var answerTextP = document.getElementById('answer-text');
  var progressTextP = document.getElementById('progress-text');
  var nextResultsButton = document.getElementById('next-results-button');

  var lastSlashIndex = window.location.href.lastIndexOf( '/' );
  var quizId = window.location.href.substr( lastSlashIndex + 1 );
  console.log("quiz id:", quizId);

  quizServer.getQuizById( quizId, function(quiz){
    console.log("fetched quiz:", quiz);
    globalQuiz = quiz;
    quizTitleP.innerText = quiz.title;
    var mapHelper = new MapHelper(mapContainer, 55.9, -3.1, 4, function() {

    });  
  });
};
