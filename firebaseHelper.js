var firebase = require('firebase');
var values = require('./values');

var firebaseHelper = {
  app: null,
  iniitialiseApp: function() {
    console.log("initialising firebase app");
    var config = {
      apiKey: values.firebaseAPIKey,
      authDomain: values.firebaseAuthDomain,
      databaseURL: values.firebaseDatabaseUrl
    };
    this.app = firebase.initializeApp(config);
  },
  signInToFirebase: function( callback ) {
    if ( firebase.apps.length === 0 ) this.iniitialiseApp();
    var currentUser = firebase.auth().currentUser;
    if ( currentUser ) {
      // console.log( "user already signed in:", currentUser.email );
      callback( null );
    }
    else {
      firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
          console.log( "user signed in to firebase:", user.email );
          callback( null );
        } else {
          console.log( "user signed out of firebase" );
        }
      });

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
  },
  getAllQuizzes: function( callback ) {
    this.getQuizzesRef( function( err, quizzesRef ) {
      if ( err ) {
        callback( err, null );
      }
      else {
        quizzesRef.once( 'value' ).then( function( snapshot ) {
          var quizEntries = snapshot.val();
          var quizzes = Object.keys( quizEntries ).map( function( key ) {
            return quizEntries[key];
          });
          callback( null, quizzes );
        });
      }
    });
  }
};

module.exports = firebaseHelper;
