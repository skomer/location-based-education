var quizServer = {
  getAllQuizzes: function( callback ) {
    var request = new XMLHttpRequest();
    var url = "http://localhost:3000/quizzes";
    request.open( 'GET', url );
    request.onload = function() {
      if ( this.status === 200 ) {
        var allQuizzes = JSON.parse( this.responseText );
        callback( allQuizzes );
      }
      else {
        console.error( "GET request to", url, "failed with status", this.status );
      }
    }
    request.send();
  },
  createQuiz: function( quiz ) {
    var request = new XMLHttpRequest();
    var url = "http://localhost:3000/quizzes";
    request.open( 'POST', url );
    request.setRequestHeader( 'Content-Type', 'application/json' );
    request.onload = function() {
      if ( this.status !== 200 ) {
        console.error( "POST request to", url, "failed with status", this.status );
      }
    }
    console.log( "quiz:", quiz );
    request.send( JSON.stringify( quiz ) );
  }
};

module.exports = quizServer;
