var quizServer = {
  getAllQuizzes: function( callback ) {
    var request = XMLHttpRequest();
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
  }
};
