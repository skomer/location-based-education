var quizServer = require('../models/quizServer');

window.onload = function() {
  console.log("Ready to add quizzes");

  var quizTitleInput = document.getElementById( 'quiz-title-input' );
  var saveQuizButton = document.getElementById( 'save-quiz-button' );
  saveQuizButton.onclick = function() {
    var quizTitle = quizTitleInput.value;
    var quiz = {
      title: quizTitle
    };
    quizServer.createQuiz( quiz );
  };
};
