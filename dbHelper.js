var MongoClient = require('mongodb').MongoClient;

var dbHelper = {

  createQuiz: function(title, callback){
    var url = 'mongodb://localhost:27017/location_based_education';
    MongoClient.connect(url, function(err, db){
      if(err){
        console.error(err);
      }else{
        var quizzesCollection = db.collection('quizzes');
        quizzesCollection.insert({
          title: title
        });
      }
      callback( err );
    });
  }

};

module.exports = dbHelper;