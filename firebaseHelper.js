var firebase = require('firebase');
var values = require('./values');

var firebaseHelper = {
  init: function() {
    var config = {
      apiKey: values.firebaseAPIKey,
      authDomain: values.firebaseAuthDomain,
      databaseURL: values.firebaseDatabaseUrl
    };
    this.app = firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( function( user ) {
      if ( user ) {
        console.log( "server signed in to firebase with account:", user.email );
      } else {
        console.log( "server signed out of firebase" );
      }
    });

    firebase.auth().signInWithEmailAndPassword( values.userEmail, values.userPassword ).catch( function( err ) {
      var errorCode = err.code;
      var errorMessage = err.message;
      console.error( "sign in to firebase failed, errorCode:%s, errorMessage:%s", errorCode, errorMessage );
    });
  },
  getQuizzesRef: function( callback ) {
    var quizzesRef = firebase.database().ref( 'quizzes' );
    callback( quizzesRef );
  },
  createQuiz: function( title ) {
    this.getQuizzesRef( function( quizzesRef ) {
      var newQuizRef = quizzesRef.push();
      newQuizRef.set({
        title: title,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        createdBy: values.userEmail
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
