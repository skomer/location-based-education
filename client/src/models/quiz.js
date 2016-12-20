var Question = require('./question');

var Quiz = function(params){
  if ( typeof( params ) === 'string' ) {
    this.title = params;
    this.questions = [];
    this.published = false;
  }
  else {
    this.id = params.id;
    this.title = params.title;
    this.questions = params.questions.map( function( question ) {
      return questionObject = new Question({
        text: question.text,
        countryCode: question.countryCode,
        countryName: question.countryName,
        archived: question.archived
      });
    });
    this.published = params.published;
    this.currentQuestionIndex = 0;
  }
}

Quiz.prototype = {
  addQuestion: function( text, countryCode, countryName, archived ) {
    var question = new Question({
      text: text,
      countryCode: countryCode,
      countryName: countryName,
      archived: archived
    });
    this.questions.push( question );
  },
  isSaveable: function() {
    if ( !this.title ) {
      return false;
    }
    if ( this.questions.length === 0 ) {
      return false;
    }
    if( !this.areQuestionsAllSaveable() ) {
      return false;
    }
    return true;
  },
  areQuestionsAllSaveable: function() {
    return this.questions.every( function(question) {
      return question.isSaveable();
    });
  },
  currentQuestion: function() {
    return this.questions[this.currentQuestionIndex];
  },
  nextQuestion: function() {
    this.currentQuestionIndex++;
    return this.currentQuestion();
  },
  onLastQuestion: function() {
    return this.currentQuestionIndex === this.length() - 1;
  },
  length: function() {
    return this.questions.length;
  }
};

module.exports = Quiz;
