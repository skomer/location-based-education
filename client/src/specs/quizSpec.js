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
  it("should start as published === false", function() {
    assert.equal( false, blankQuiz.published );
  });

  it("should have title of quiz passed into constructor when initialised with only a title", function(){
    assert.equal( "Blank Quiz", blankQuiz.title );
  });

  it("should have empty questions array when created with no data", function() {
    assert.equal( 0, blankQuiz.questions.length );
  });

  it("should increase question count when question added", function() {
    blankQuiz.addQuestion( 'stub question' );
    assert.equal( 1, blankQuiz.questions.length );
  });

  it("should not be saveable if title is empty", function() {
    var testQuiz = new Quiz( "" );
    assert.equal( false, testQuiz.isSaveable() );
  });

  it("should not be saveable if the question list is empty", function() {
    assert.equal( false, blankQuiz.isSaveable() );
  });

  it("should not be saveable if any questions are not saveable", function() {
    var saveableQuestionStub = {
      isSaveable: function() {
        return true;
      }
    }
    var notSaveableQuestionStub = {
      isSaveable: function() {
        return false;
      }
    }
    blankQuiz.addQuestion( saveableQuestionStub );
    blankQuiz.addQuestion( notSaveableQuestionStub );
    assert.equal( false, blankQuiz.isSaveable() );
  });

  it("should not be saveable if all questions are not saveable", function() {
    var notSaveableQuestionStub = {
      isSaveable: function() {
        return false;
      }
    }
    blankQuiz.addQuestion( notSaveableQuestionStub );
    blankQuiz.addQuestion( notSaveableQuestionStub );
    blankQuiz.addQuestion( notSaveableQuestionStub );
    assert.equal( false, blankQuiz.isSaveable() );
  });

  it("should be saveable if title and questions are entered", function() {
    var saveableQuestionStub = {
      isSaveable: function() {
        return true;
      }
    }
    blankQuiz.addQuestion( saveableQuestionStub );
    blankQuiz.addQuestion( saveableQuestionStub );
    assert.equal( true, blankQuiz.isSaveable() );
  });

});
