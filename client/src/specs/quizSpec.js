var assert = require('assert');
var Quiz = require('../models/quiz');

describe('Quiz', function(){
beforeEach(function(){ 
  quiz1 = new Quiz( "title of quiz", "Portuguese tarts come from?", "Portugal",  "PT", "Portugal" , true, false);
});

  it("should have title of quiz passed into constructor", function(){
    assert.equal("title of quiz", quiz1.title);
  });

  








  it("should have same number of questions passed into constructor");

  it("should have a published boolean passed into the constructor");

  it("should have same first question passed into constructor");

  it("should have same last question passed into the constructor");

  // ******** tests for empty quiz

  it("should have no questions when created with no data", function(){
    assert.equal(0, quiz1.quizQuestions.length)

  });

  it("should have empty string title when created with no data");

  it("should have publish === false when created with no data");

  it("should increase question count when question added");

  it("should not be saveable if title is empty");

  it("should not be saveable if the question list is empty");

  it("should not be saveable if any questions don't have text");

  it("should be saveable if title and questions are entered");

});
