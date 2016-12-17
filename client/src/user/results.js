var quizServer = require( '../models/quizServer' );

window.onload = function() {
  var answers = [ 'AF', 'BB', 'AF', 'FR' ];
  quizServer.getQuizById( '-KZCcaO1hToqpMhfHnls', function( quiz ) {
    console.log( "quiz questions:", quiz.questions );
    console.log( "answers:", answers );
  });
};
