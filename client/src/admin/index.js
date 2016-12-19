var quizServer = require('../models/quizServer');
var QuizListView = require('../views/quizListView');

window.onload = function() {
  var allQuizzes;

  quizServer.getAllQuizzes( function( allQuizzes ) {
    var listItems = allQuizzes.map(function(quiz){
      return {
        title: quiz.title,
          href: "http://localhost:3000/admin/quizzes/" + quiz.id
      };
    });
    var plusButtonItem = {
      title: "+",
      id: "add-quiz-button",
      href: "quizzes/new"
    };
    listItems.unshift( plusButtonItem );
    var quizzesContainer = document.getElementById('quizzes-container');
    var quizListView = new QuizListView(quizzesContainer);
    quizListView.populate(listItems);
  });
};
