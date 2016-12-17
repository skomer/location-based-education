var xmlHttpHelper = require('../helpers/xmlHttpHelper');

var quizServer = {
  getAllQuizzes: function( callback ) {
    var url = "http://localhost:3000/quizzes";
    xmlHttpHelper.makeGetRequest( url, function( allQuizzes ) {
      callback( allQuizzes );
    });
  },
  getQuizById: function( id, callback ) {
    var url = "http://localhost:3000/quizzes/" + id;
    xmlHttpHelper.makeGetRequest( url, function( quiz ) {
      callback( quiz );
    });
  },
  createQuiz: function( quiz ) {
    console.log( "creating quiz:", quiz );
    var url = "http://localhost:3000/quizzes";
    xmlHttpHelper.makePostRequest( url, quiz );
  }
};

module.exports = quizServer;
