var quizServer = require('../models/quizServer');
var MapHelper = require('../helpers/mapHelper');

var answerTextP;
var questionTextP;
var nextResultsButton;
var quiz;
var currentQuestionIndex = 0;
var userAnswers = [];

window.onload = function() {
  var quizTitleP = document.getElementById('quiz-title');
  var mapContainer = document.getElementById('map-container');
  questionTextP = document.getElementById('question-text');
  answerTextP = document.getElementById('answer-text');
  var progressTextP = document.getElementById('progress-text');
  nextResultsButton = document.getElementById('next-results-button');

  var lastSlashIndex = window.location.href.lastIndexOf( '/' );
  var quizId = window.location.href.substr( lastSlashIndex + 1 );
  console.log("quiz id:", quizId);

  quizServer.getQuizById( quizId, function(fetchedQuiz){
    quiz = fetchedQuiz;
    var numberOfQuestions = quiz.questions.length;
    console.log("fetched quiz:", quiz);
    quizTitleP.innerText = quiz.title;
    var mapHelper = new MapHelper(mapContainer, 55.9, -3.1, 4, mapClicked); 
    loadQuestion(currentQuestionIndex); 
    nextResultsButton.onclick = function(){
      currentQuestionIndex++;
      if(currentQuestionIndex < numberOfQuestions){
        loadQuestion(currentQuestionIndex);
      }
    }
  });
};

var mapClicked = function(countryCode, countryName){
  answerTextP.innerText = "Your answer is: " + countryName;
  nextResultsButton.disabled = false;
};

var loadQuestion = function(questionIndex){
  console.log("loading question:", questionIndex);
  var currentQuestionText = quiz.questions[questionIndex].text;
  questionTextP.innerText = currentQuestionText;
  nextResultsButton.disabled = true;
};

