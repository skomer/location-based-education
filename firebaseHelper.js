var firebase = require('firebase');
var values = require('./values');

var firebaseHelper = {
  getQuizzesRef: function( callback ) {
    var quizzesRef = firebase.database().ref( 'quizzes' );
    callback( quizzesRef );
  },
  createQuiz: function( title ) {
    this.getQuizzesRef( function( quizzesRef ) {
      var newQuizRef = quizzesRef.push();
      newQuizRef.set({
        title: title
      });
    });
  },
  getAllQuizzes: function( callback ) {
    this.getQuizzesRef( function( quizzesRef ) {
      quizzesRef.once( 'value' ).then( function( snapshot ) {
        var quizEntries = snapshot.val();
        var quizzes = Object.keys( quizEntries ).map( function( key ) {
          return quizEntries[key];
        });
        callback( null, quizzes );
      });
    });
  }
};

module.exports = firebaseHelper;
