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

  it("should have title parameter when initialised with data", function() {
    var quizDataStub = { title: "Test title" };
    var testQuiz = new Quiz( quizDataStub );
    assert.equal( "Test title", testQuiz.title );
  });

  it("should have same number of questions passed into constructor", function() {
    var quizDataStub = {
      questions: [ 1, 2, 3, 4 ]
    };
    var testQuiz = new Quiz( quizDataStub );
    assert.equal( 4, testQuiz.questions.length );
  });

  it("should have a published boolean passed into the constructor");

  it("should have same first question passed into constructor");


  it("should have same last question passed into the constructor");


  // ******** TEST FOR BLANK QUIZ
  it("should have title of quiz passed into constructor when initialised with only a title", function(){
    var testQuiz = new Quiz( "title of quiz" );
    assert.equal( "title of quiz", testQuiz.title );
  });

  it("should have no questions when created with no data");

  it("should have empty string title when created with no data");

  it("should have publish === false when created with no data");

  it("should increase question count when question added");

  it("should not be saveable if title is empty");

  it("should not be saveable if the question list is empty");

  it("should not be saveable if any questions don't have text");

  it("should be saveable if title and questions are entered");

});
