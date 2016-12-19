var assert = require('assert');
var Quiz = require('../models/quiz');

describe('Quiz', function(){
beforeEach(function(){
  quiz = new Quiz("quiz1" ,[]);
})
  it("should have title of quiz passed into constructor", function(){
    assert.equal("quiz1", quiz.title);
  });











  it("should have same number of questions passed into constructor");


  it("should have a published boolean pssed into the constructor");

  it("should have same first question is passed into constructor");

  it("should have same last question passed into the constructor");

  // ******** tests for empty quiz

  it("should have no questions when created with no data");

  it("should have empty string title when created with no data");

  it("should have publish === false when created with no data");

  it("should increase question count when question added");

  it("should not be saveable if title is empty");

  it("should not be saveable if the question list is empty");

  it("should not be saveable if any questions don't have text");

  it("should be saveable if title and questions are entered");

});
