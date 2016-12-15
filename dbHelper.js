var MongoClient = require('mongodb').MongoClient;

var dbHelper = {

  getDatabase: function(callback){
    var url = 'mongodb://localhost:27017/location_based_education';
    MongoClient.connect(url, function(err, db){
      callback( err, db );
    });
  },

  createQuiz: function(title, callback){
    this.getDatabase(function( err, db ){
      if ( err ) {
        console.error( err );
      }
      else {
        var quizzesCollection = db.collection('quizzes');
        quizzesCollection.insert({
          title: title
        });
      }
      callback( err );
    });
  },

  getAllQuizzes: function(callback){
    this.getDatabase(function( err, db ){
      if ( err ) {
        console.error( err );
        callback( err, null );
      }
      else {
        var quizzesCollection = db.collection('quizzes');
        quizzesCollection.find({}).toArray(function(err, allQuizzesArray){
          console.error(err);
          callback( err, allQuizzesArray );
        });
      }
    });
  }
};

module.exports = dbHelper;