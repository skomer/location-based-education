var firebase = require('firebase');
var values = require('./values');

var firebaseHelper = {
  signInToFirebase: function( callback ) {
    var currentUser = firebase.auth.currentUser;
    if ( currentUser ) {
      console.log( "user currently signed in:", currentUser );
      callback( null );
    }
    else {
      var config = {
        apiKey: values.firebaseAPIKey,
        authDomain: values.firebaseAuthDomain,
        databaseURL: values.firebaseDatabaseUrl
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
          console.log( "user signed in to firebase:", user );
          callback( null );
        } else {
          console.log( "user signed out of firebase" );
        }
      });

      console.log( "Signing in to firebase..." );
      firebase.auth().signInWithEmailAndPassword( values.userEmail, values.userPassword ).catch( function( err ) {
        var errorCode = err.code;
        var errorMessage = err.message;
        console.error( "sign in to firebase failed, errorCode:%s, errorMessage:%s", errorCode, errorMessage );
        callback( err );
      });
    }
  },
  getQuizzesRef: function( callback ) {
    this.signInToFirebase( function( err ) {
      if ( err ) {
        callback( err, null );
      }
      else {
        var quizzesRef = firebase.database().ref( 'quizzes' );
        callback( null, quizzesRef );
      }
    });
  },
  createQuiz: function( title, callback ) {
    this.getQuizzesRef( function( err, quizzesRef ) {
      if ( err ) {
        callback( err );
      }
      else {
        var newQuizRef = quizzesRef.push();
        newQuizRef.set({
          title: title
        });
        callback( null );
      }
    });
  }
};

module.exports = firebaseHelper;
