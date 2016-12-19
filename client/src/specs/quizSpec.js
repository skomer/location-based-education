var assert = require('assert');
var Quiz = require('../models/quiz');

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
    var quizDataStub = { title: "title of quiz" };
    var testQuiz = new Quiz( quizDataStub );
    assert.equal( "title of quiz", testQuiz.title );
  });

  // it("should have same number of questions passed into constructor", function(){
  //   quizQuestions.add(quiz1);
  //   assert.equal( 1, quizQuestions.length);
  // });


  // it("should have a published boolean passed into the constructor");
  // assert.equal( false, quiz1.published);

  it("should have same first question passed into constructor");


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
