var assert = require('assert');
var Quiz = require('../models/quiz');

describe('Quiz', function(){

  it("should have title of quiz passed into constructor", function(){
    var quizDataStub = {
      title: "test title"
    };
    var result = new Quiz(quizDataStub);
    assert.equal("test title", result.title);
  });

});