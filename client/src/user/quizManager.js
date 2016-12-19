var MapHelper = require('../helpers/mapHelper');
var ProgressBarView = require('../views/progressBarView');
var InfoBoxView = require('../views/infoBoxView');

var QuizManager = function( questions ) {
  this.questionTextP = document.getElementById('question-text');
  this.answerTextP = document.getElementById('answer-text');

  this.nextQuestionButton = document.getElementById('next-question-button');
  this.nextQuestionButton.onclick = this.handleNextQuestionButtonClicked.bind( this );

  this.questions = questions;
  this.numberOfQuestions = questions.length;
  this.userAnswers = [];
  this.infoBoxView = new InfoBoxView();
  this.progressBarView = new ProgressBarView( this.numberOfQuestions );

  // set up map
  var mapContainer = document.getElementById('map-container');
  var edinburghLat = 55.9;
  var edinburghLng = -3.1;
  this.mapHelper = new MapHelper( mapContainer, edinburghLat, edinburghLng, 4, this.handleMapClicked.bind(this) );
};

QuizManager.prototype = {
  startQuiz: function( quizFinishedCallback ) {
    this.quizFinishedCallback = quizFinishedCallback;
    this.currentQuestionIndex = 0;
    this.askQuestion( 0 );
    this.progressBarView.draw( 1 );
  },
  askQuestion: function(questionIndex){
    console.log( "asking question", this.currentQuestionIndex + 1 );
    this.currentAnswer = null;
    var currentQuestionText = this.questions[this.currentQuestionIndex].text;
    this.questionTextP.innerText = currentQuestionText;
    this.nextQuestionButton.disabled = true;
    this.answerTextP.innerText = "Click map to select answer";
  },
  handleMapClicked: function( countryCode, countryName ){
    if ( countryCode && countryName ) {
      this.answerTextP.innerText = "Your answer is: " + countryName;
      if( this.onLastQuestion() ) {
        this.nextQuestionButton.innerText = "Complete Quiz";
      }
      this.nextQuestionButton.disabled = false;
      this.currentAnswer = {
        countryCode: countryCode,
        countryName: countryName
      };
    } else {
      this.infoBoxView.showWithText( "That is not a country, please click a country" );
    }
  },
  handleNextQuestionButtonClicked: function() {
    this.userAnswers.push( this.currentAnswer );
    this.currentQuestionIndex++;
    if( this.currentQuestionIndex < this.numberOfQuestions){
      this.askQuestion(currentQuestionIndex);
      this.progressBarView.nextQuestion();

    } else {
      this.quizFinishedCallback( this.userAnswers );
    }
  },
  onLastQuestion: function() {
    return this.currentQuestionIndex === this.numberOfQuestions - 1;
  }
};

module.exports = QuizManager;
