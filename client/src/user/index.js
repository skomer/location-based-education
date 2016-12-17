var quizServer = require('../models/quizServer');
var QuizListView = require('../views/quizListView');

window.onload = function() {

  var allQuizzes;

  quizServer.getAllQuizzes( function( allQuizzes ) {
    var listItems = allQuizzes.map(function(quiz){
      return {
        title: quiz.title,
        href: "http://localhost:3000/user/quizzes/" + quiz.id
      };
    });
    var quizzesContainer = document.getElementById('quizzes-container');
    var quizListView = new QuizListView(quizzesContainer);
    quizListView.populate(listItems);
  });
};
