var firebase = require('firebase');
var values = require('./values');

var firebaseHelper = {
  database: null,
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
    this.database = firebase.database();
  },
  getQuizzesRef: function( callback ) {
    var quizzesRef = this.database.ref( 'quizzes' );
    callback( quizzesRef );
  },
  createQuiz: function( quiz ) {
    this.getQuizzesRef( function( quizzesRef ) {
      var newQuizRef = quizzesRef.push();
      newQuizRef.set({
        title: quiz.title,
        questions: quiz.questions,
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
          var quiz = quizEntries[key];
          quiz.id = key;
          return quiz;
        });
        callback( null, quizzes );
      });
    });
  },
  getQuizById: function( quizId, callback ) {
    this.getQuizzesRef( function( quizzesRef ) {
      quizzesRef.orderByKey().equalTo( quizId ).once( 'value' ).then( function( snapshot ) {
        var responseData = snapshot.val();
        if ( responseData && responseData[quizId] ) {
          var quiz = responseData[quizId];
          quiz.id = quizId
          callback( quiz );
        }
        else {
          callback( null );
        }
      });
    });
  }
};

module.exports = firebaseHelper;
