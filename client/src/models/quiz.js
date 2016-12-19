var Quiz = function(params){
  if ( typeof( params ) === 'string' ) {
    this.title = params;
  }
  else {
    this.title = params.title;
    this.questions = params.questions;
  }
}

Quiz.prototype = {
};

module.exports = Quiz;
