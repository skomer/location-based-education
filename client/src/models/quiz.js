var Quiz = function(params){
  if ( typeof( params ) === 'string' ) {
    this.title = params;
  }
  else {
    this.title = params.title;
  }
}

Quiz.prototype = {
};

module.exports = Quiz;
