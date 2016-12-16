var quizServer = require('../models/quizServer.js');
var QuestionListView = require('../views/questionListView.js');

window.onload = function() {
  console.log("Ready to add quizzes");

  var quizTitleInput = document.getElementById( 'quiz-title-input' );
  var newQuestionButton = document.getElementById( 'new-question-button' );
  var countriesSelect = document.getElementById('countries-select');
  var saveQuizButton = document.getElementById( 'save-quiz-button' );
  var questionListView = new QuestionListView();

  newQuestionButton.onclick = function() {
    var question = {
      text: ""
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
