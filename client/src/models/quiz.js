var Quiz = function(params){
  if ( typeof( params ) === 'string' ) {
    this.title = params;
  }
}

Quiz.prototype = {
};

module.exports = Quiz;
