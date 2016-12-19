var Quiz = function(params){
  if ( typeof( params ) === 'string' ) {
    this.title = params;
    this.questions = [];
    this.published = false;
  }
  else {
    this.title = params.title;
    this.questions = params.questions;
    this.published = params.published;
  }
}

Quiz.prototype = {
  addQuestion: function( question ) {
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
  }
};

module.exports = Quiz;
