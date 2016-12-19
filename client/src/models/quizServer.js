var xmlHttpHelper = require('../helpers/xmlHttpHelper');
var Quiz = require('./quiz');

var quizServer = {
  getAllQuizzes: function( callback ) {
    var url = "http://localhost:3000/quizzes";
    xmlHttpHelper.makeGetRequest( url, function( allQuizzes ) {
      callback( allQuizzes );
    });
  },
  getPublishedQuizzes: function( callback ) {
    this.getAllQuizzes( function( allQuizzes ) {
      var publishedQuizzes = allQuizzes.filter( function( quiz ) {
        return quiz.published;
      });
      callback( publishedQuizzes );
    });
  },
  getQuizById: function( id, callback ) {
    var url = "http://localhost:3000/quizzes/" + id;
    xmlHttpHelper.makeGetRequest( url, function( quizData ) {
      callback( new Quiz( quizData ) );
    });
  },
  createQuiz: function( quiz ) {
    console.log( "creating quiz:", quiz );
    var url = "http://localhost:3000/quizzes";
    xmlHttpHelper.makePostRequest( url, quiz );
  }
};

module.exports = quizServer;
