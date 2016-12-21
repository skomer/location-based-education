var quizServer = require('../models/quizServer.js');
var miscHelper = require('../helpers/miscHelpers');
var QuestionListView = require('../views/questionListView.js');
var Quiz = require('../models/quiz.js');

var publishedState = false;
var publishButton;

window.onload = function() {
  console.log("Ready to add quizzes");

  var quizTitleInput = document.getElementById( 'quiz-title-input' );
  var newQuestionButton = document.getElementById( 'new-question-button' );
  var countriesSelect = document.getElementById('countries-select');
  publishButton = document.getElementById( 'publish-quiz-button' );
  console.log("publishButton:", publishButton);

  publishButton.onclick = function() {
    if ( publishedState ) {
      setButtonUnpublished();
    }
    else {
      setButtonPublished();
    }
    publishedState = !publishedState;
  }

  var saveQuizButton = document.getElementById( 'save-quiz-button' );
  var questionListView = new QuestionListView();
  var ulWarning = document.getElementById('ul-warning');
  var unArchivedQuestionsTag = document.getElementById('questions-list');
  var archivedQuestionsTag = document.getElementById('archive-list');
  var archiveDiv = document.getElementById('archive-div');
  archiveDiv.style.display = "none";
  var showArchiveButton = document.getElementById('show-archive-button');
  // var published;
  var quizId;

  var newOrExistingQuiz = function() {
    var lastUrlElement = miscHelper.getLastUrlElement();
    if (lastUrlElement != 'new') {
      var requestedQuiz = quizServer.getQuizById(lastUrlElement, function(quiz) {
        populateExistingQuiz(quiz);
      });
    }
  };

  newOrExistingQuiz();

  var populateExistingQuiz = function(quiz) {
    quizId = quiz.id;
    quizTitleInput.value = quiz.title;
    publishedState = quiz.published;
    if ( publishedState ) {
      setButtonPublished();
    }
    else {
      setButtonUnpublished();
    }
    buildQuestionLists(quiz);
  };

  var buildQuestionLists = function(quiz) {
    var eQuestions = [];
    for (var i = 0; i < quiz.questions.length; i++) {
      var emptyQuestion = {
        text: quiz.questions[i].text,
        countryCode: quiz.questions[i].countryCode,
        countryName: quiz.questions[i].countryName,
        archived: quiz.questions[i].archived
      };
      eQuestions.push(emptyQuestion);
    }
    for (var i = 0; i < quiz.questions.length; i++) {
      questionListView.addQuestion(quiz.questions[i]);
    }
  };

  newQuestionButton.onclick = function() {
    ulWarning.style.display = "none";
    questionListView.addQuestion(null);
  };

  showArchiveButton.onclick = function() {
    archiveDiv.style.display === "none" ?
      (archiveDiv.style.display = "inline-block", showArchiveButton.innerText = "Hide archived questions") :
      (archiveDiv.style.display = "none", showArchiveButton.innerText = "Show archived questions" );
  };

  // checks that all the inputs are valid before saving quiz
  saveQuizButton.onclick = function() {
    var warningText = "";

    published = publishedState;

    // WORK IN PROGRESS - error messages for creating quiz
    if (quizTitleInput.innerText === "") {
      var titleWarning = document.getElementById('title-warning');
      titleWarning.style.display = "inline-block";
      warningText = "Please enter a quiz title";
    };
    if (unArchivedQuestionsTag.children.length === 0) {
      ulWarning.style.display = "inline-block";
      warningText = "Please enter a question";
    };

    for(var i = 0; i < unArchivedQuestionsTag.children.length; i++){
      if ( unArchivedQuestionsTag.children[i] === undefined || unArchivedQuestionsTag.firstChild.firstChild.value === "" ) {
        var questionWarning = document.getElementById('question-warning');
        questionWarning.style.display = "inline-block";
        warningText = "Enter something please!";
      };
    };

    if (warningText = ""){
      alert("issue with data");
    } else {
      console.log("saving the quiz");
      saveQuiz();
    }
  };

  // contacts quiz server to post the quiz to the db
   var addQuestions = function(questionArray){
    var questions = [];
    for (var i = 0; i < questionArray.length; i++) {
      var text = questionArray[i].firstChild.value;
      var answerIndex = questionArray[i].children[1].selectedIndex;
      var answerCode = questionArray[i].children[1][answerIndex].value;
      var answerFullName = questionArray[i].children[1][answerIndex].innerText;
      var archived = questionArray[i].getAttribute("archived");
      console.log("archived:", archived);

      var question = {
        text: text,
        countryCode: answerCode,
        countryName: answerFullName,
        archived: archived
      };
      questions.push(question);
    };
    return questions;
   };

  // contacts quiz server to post the quiz to the db
  var saveQuiz = function() {
    var quizTitle = quizTitleInput.value;

    arrayOfQuestions = unArchivedQuestionsTag.children;
    archivedQuestions = archivedQuestionsTag.children;

    var q1 = addQuestions(arrayOfQuestions);
    var q2 = addQuestions(archivedQuestions);

    var q3 = q1.concat(q2 ? q2 : []);

    var quiz = {
      title: quizTitle,
      questions: q3,
      published: published
    }

    if (quizId) {
      quiz.id = quizId;
      quizServer.updateQuiz( quiz );
    } else {
      quizServer.createQuiz( quiz );
    }

    window.location.href = "http://localhost:3000/admin/quizzes";
  };
};

var setButtonUnpublished = function() {
  publishButton.classList.remove( 'published' );
  publishButton.innerText = "Publish"
};

var setButtonPublished = function() {
  publishButton.classList.add( 'published' );
  publishButton.innerText = "Unpublish"
};
