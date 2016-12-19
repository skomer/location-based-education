var assert = require('assert');
var Quiz = require('../models/quiz');

describe('Quiz', function(){

  var blankQuiz;

  beforeEach(function(){
    blankQuiz = new Quiz( "Blank Quiz" );
  });

  // ************* TESTS FOR INITIALISING WITH DATA
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

  it("should have a published boolean passed into the constructor", function() {
    var quizDataStub = {
      published: true
    };
    var testQuiz = new Quiz( quizDataStub );
    assert.equal( true, testQuiz.published );
  });

  it("should have same questions passed into constructor", function() {
    var testQuestionsStub = [ "First question", "Second question", "Third question" ];
    var quizDataStub = {
      questions: testQuestionsStub
    };
    var testQuiz = new Quiz( quizDataStub );
    assert.deepEqual( testQuestionsStub, testQuiz.questions );
  });


  // ******** TEST FOR BLANK QUIZ
  it("should have title of quiz passed into constructor when initialised with only a title", function(){
    assert.equal( "Blank Quiz", blankQuiz.title );
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
