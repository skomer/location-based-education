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
  var ulTag = document.getElementById('questions-list');
  // -----------------------------------------------------------
  var checkQuizType  = document.getElementById('check-publish');
  // -----------------------------------------------------------


  newQuestionButton.onclick = function() {
    ulWarning.style.display = "none";
    questionListView.addQuestion();
  };

// checks that all the inputs are valid before saving quiz
saveQuizButton.onclick = function() {
  var warningFlag = false;
  var checkQuiz = new Boolean;

    // var liInputTag = document.getElementById('');

        /* if (title input is empty) {
          display title warning
        }
        else if (the questions list (ul) has no questions) {
          display ul warning
        }
        else {
          for all list items in ul list {
            if (the list item input is empty) {
              display list item warning for that input
            }
          }
        }
        */

        // WORK IN PROGRESS - error messages for creating quiz
        if (quizTitleInput.innerText === undefined) {
          var titleWarning = document.getElementById('title-warning');
          titleWarning.style.display = "inline-block";
          warningFlag === true;
        }
        if (ulTag.children.length === 0) {
          ulWarning.style.display = "inline-block";
          warningFlag === true;
        }
        if ( ulTag.firstChild === null || ulTag.firstChild.firstChild.value === "" ) {
          var questionWarning = document.getElementById('question-warning');
          questionWarning.style.display = "inline-block";
          warningFlag === true;
        }
        if (warningFlag === false){
          console.log("saving the quiz");
          saveQuiz()
        }
}

checkQuizType.onclick = function(){

  var checkQuizType = new Boolean;

  if(checkQuizType === true ){
  console.log("quiz is selected");
  }

  saveQuiz()
}

// contacts quiz server to post the quiz to the db
var saveQuiz = function(){
  var quizTitle = quizTitleInput.value;

  arrayOfQuestions = ulTag.children;
  var questions = [];
  // -----------------------------------------------------------
  var isPublished = new Boolean(true);
  // -----------------------------------------------------------


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
    questions: questions,
  // -----------------------------------------------------------
    publish: isPublished
  // -----------------------------------------------------------

  };
  quizServer.createQuiz( quiz );
  window.location.href = "http://localhost:3000/admin/quizzes";
};
};












