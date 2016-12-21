var MapHelper = require('../helpers/mapHelper');
var ProgressBarView = require('../views/progressBarView');
var InfoBoxView = require('../views/infoBoxView');

var QuizManager = function( quiz ) {
  this.questionTextP = document.getElementById('question-text');
  this.answerTextP = document.getElementById('answer-text');

  this.nextQuestionButton = document.getElementById('next-question-button');
  this.nextQuestionButton.onclick = this.handleNextQuestionButtonClicked.bind( this );

  this.quiz = quiz;
  this.infoBoxView = new InfoBoxView();
  this.progressBarView = new ProgressBarView( this.quiz.length() );

  // set up map
  var mapContainer = document.getElementById('map-container');
  var edinburghLat = 55.9;
  var edinburghLng = -3.1;
  this.mapHelper = new MapHelper( mapContainer, edinburghLat, edinburghLng, 4, this.handleMapClicked.bind(this) );
};

QuizManager.prototype = {
  startQuiz: function( quizFinishedCallback ) {
    this.quizFinishedCallback = quizFinishedCallback;
    this.askQuestion();
    this.progressBarView.draw( 1 );
  },
  askQuestion: function(){
    console.log("this.quiz.currentQuestion():",
    this.quiz.currentQuestion() );
    this.mapHelper.clearMarker();
    this.questionTextP.innerText = this.quiz.currentQuestion().text;
    this.nextQuestionButton.disabled = true;
    this.answerTextP.innerText = "Click map to select answer";
  },
  handleMapClicked: function( countryCode, countryName ){
    if ( countryCode && countryName ) {
      this.answerTextP.innerText = "Your answer is: " + countryName;
      if( this.quiz.onLastQuestion() ) {
        this.nextQuestionButton.innerText = "Complete Quiz";
      }
      this.nextQuestionButton.disabled = false;
      console.log( "this.quiz.currentQuestion()", this.quiz.currentQuestion() )
      this.quiz.currentQuestion().setUserAnswer( countryCode, countryName );
      this.infoBoxView.hide();
    } else {
      this.infoBoxView.showWithText( "That is not a country, please click a country" );
    }
  },
  handleNextQuestionButtonClicked: function() {
    if( this.quiz.onLastQuestion() ){
      this.quizFinishedCallback( this.quiz );
    }
    else {
      this.quiz.nextQuestion();
      this.askQuestion();
      this.progressBarView.nextQuestion();
    }
  }
};

module.exports = QuizManager;
