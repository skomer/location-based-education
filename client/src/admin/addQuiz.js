var quizServer = require('../models/quizServer.js');
var QuestionListView = require('../views/questionListView.js');

window.onload = function() {
  console.log("Ready to add quizzes");

  var quizTitleInput = document.getElementById( 'quiz-title-input' );
  var quizQuestionInput = document.getElementById( 'quiz-question-input' );
  var newQuestionButton = document.getElementById( 'new-question-button' );
  var saveQuizButton = document.getElementById( 'save-quiz-button' );
  var questionListView = new QuestionListView();


  newQuestionButton.onclick = function() {
    var question = {
      text: quizQuestionInput.value
    };
    questionListView.addQuestion(question);
  };

  saveQuizButton.onclick = function() {
    var quizTitle = quizTitleInput.value;
    var quiz = {
      title: quizTitle
    };
    quizServer.createQuiz( quiz );
    window.location.href = "http://localhost:3000/admin/quizzes";
  };
};
