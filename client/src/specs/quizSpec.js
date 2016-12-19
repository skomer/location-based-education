var assert = require('assert');
var Quiz = require('../models/quiz');

describe('Quiz', function(){

  var blankQuiz;
  var populatedQuiz;

  beforeEach(function(){
    blankQuiz = new Quiz( "Blank Quiz" );

    quizWithQuestions = new Quiz({
      title: "Test Quiz with Questions",
      questions: [
        "first question",
        "second question",
        "third questions"
      ],
      archived: false
    });
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

  it("should start on question 1", function() {
    assert.equal( "first question", quizWithQuestions.currentQuestion() );
  });

  it("should return next question", function() {
    assert.equal( "second question", quizWithQuestions.nextQuestion() );
  });

  it("should increment currentQuestion when nextQuestion() called", function() {
    quizWithQuestions.nextQuestion();
    assert.equal( "second question", quizWithQuestions.currentQuestion() );
  });

  it("should return false when not on last question from onLastQuestion()", function() {
    assert.equal( false, quizWithQuestions.onLastQuestion() );
    quizWithQuestions.nextQuestion();
    assert.equal( false, quizWithQuestions.onLastQuestion() );
  });

  it("should return true when on last question from onLastQuestion()", function() {
    quizWithQuestions.nextQuestion();
    quizWithQuestions.nextQuestion();
    assert.equal( true, quizWithQuestions.onLastQuestion() );
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

  it("should create question with passed text, country code, country name and archived status", function() {
    blankQuiz.addQuestion( "Test question text", "AF", "Afghanistan", true );
    assert.equal( "Test question text", blankQuiz.questions[0].text );
    assert.equal( "AF", blankQuiz.questions[0].answer.countryCode );
    assert.equal( "Afghanistan", blankQuiz.questions[0].answer.countryName );
    assert.equal( true, blankQuiz.questions[0].archived );
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
    blankQuiz.addQuestion( "Test question text", "AF", "Afghanistan", false );
    blankQuiz.addQuestion( "Test question text 2", "GB", "Great Britain", false );
    assert.equal( true, blankQuiz.isSaveable() );
  });

});
