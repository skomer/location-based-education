var quizServer = require('../models/quizServer.js');
var QuestionListView = require('../views/questionListView.js');

window.onload = function() {
  console.log("Ready to add quizzes");

  var quizTitleInput = document.getElementById( 'quiz-title-input' );
  var newQuestionButton = document.getElementById( 'new-question-button' );
  var countriesSelect = document.getElementById('countries-select');
  var saveQuizButton = document.getElementById( 'save-quiz-button' );
  var questionListView = new QuestionListView();
  var ulWarning = document.getElementById('ul-warning');


  newQuestionButton.onclick = function() {
    ulWarning.style.display = "none";
    questionListView.addQuestion();
  };

  saveQuizButton.onclick = function() {
    var ulTag = document.getElementById('questions-list');
    // --- //
    var quizTitle = quizTitleInput.value;

    arrayOfQuestions = ulTag.children;
    var questions = [];

    for (var i = 0; i < arrayOfQuestions.length; i++) {
      var text = arrayOfQuestions[i].firstChild.value;
      var answerIndex = arrayOfQuestions[i].lastChild.selectedIndex;
      var answer = arrayOfQuestions[i].lastChild[answerIndex].value;
      var question = {
        text: text,
        answer: answer
      };
      questions.push(question);
    }

    var quiz = {
      title: quizTitle,
      questions: questions
    };
    quizServer.createQuiz( quiz );
    window.location.href = "http://localhost:3000/admin/quizzes";
  };
};












