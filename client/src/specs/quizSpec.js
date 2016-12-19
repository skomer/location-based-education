var assert = require('assert');
var Quiz = require('../models/quiz');
var quiz1;
var quizQuestions;

describe('Quiz', function(){
beforeEach(function(){ 
  var fullAnswers = {
    question: "Portuguese tarts come from?", 
    answer: "Portugal",
    countryCode: "PT", 
    countryName: "Portugal", 
    archived: true
    
  };

   quiz1 = new Quiz( "title of quiz", fullAnswers);
   quizQuestions = [];
});

  it("should have title of quiz passed into constructor", function(){
    assert.equal( "title of quiz", quiz1.title );
  });

  it("should have same number of questions passed into constructor", function(){
    quizQuestions.add(quiz1);
    assert.equal( 1, quizQuestions.length);
  });


  // it("should have a published boolean passed into the constructor");
  // assert.equal( false, quiz1.published);

  it("should have same first question passed into constructor", function(){
    assert.equal("Portuguese tarts come from?",quiz1.fullResponse[0].question )
  });


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
