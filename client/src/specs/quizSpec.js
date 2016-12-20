var assert = require('assert');
var Quiz = require('../models/quiz');
var Question = require('../models/question');

describe('Quiz', function(){

  var blankQuiz;
  var populatedQuiz;

  beforeEach(function(){
    blankQuiz = new Quiz( "Blank Quiz" );

    quizWithQuestions = new Quiz({
      id: '-testId',
      title: "Test Quiz with Questions",
      questions: [
        {
          text: "first question",
          countryCode: "AF",
          countryName: "Afghanistan",
          archived: false
        },
        {
          text: "second question",
          countryCode: "FR",
          countryName: "France",
          archived: true
        },
        {
          text: "third question",
          countryCode: "GR",
          countryName: "Germany",
          archived: true
        }
      ],
      published: true
    });
  });

  // ************* TESTS FOR INITIALISING WITH DATA
  it("should have id parameter when initialised with data", function() {
    assert.equal( "-testId", quizWithQuestions.id );
  });

  it("should have title parameter when initialised with data", function() {
    assert.equal( "Test Quiz with Questions", quizWithQuestions.title );
  });

  it("should have same number of questions passed into constructor", function() {
    assert.equal( 3, quizWithQuestions.length() );
  });

  it("should have a published boolean passed into the constructor", function() {
    assert.equal( true, quizWithQuestions.published );
  });

  it("should have same first question passed into constructor", function() {
    var expected = new Question({
      text: "first question",
      countryCode: "AF",
      countryName: "Afghanistan",
      archived: false
    });
    assert.deepEqual( expected, quizWithQuestions.questions[0] );
  });

  it("should have same last question passed into constructor", function() {
    var expected = new Question({
      text: "third question",
      countryCode: "GR",
      countryName: "Germany",
      archived: true
    });
    assert.deepEqual( expected, quizWithQuestions.questions[2] );
  });

  it("should start on question 1", function() {
    var expected = new Question({
      text: "first question",
      countryCode: "AF",
      countryName: "Afghanistan",
      archived: false
    });
    assert.deepEqual( expected, quizWithQuestions.currentQuestion() );
  });

  it("should return next question", function() {
    var expected = new Question({
      text: "second question",
      countryCode: "FR",
      countryName: "France",
      archived: true
    });
    assert.deepEqual( expected, quizWithQuestions.nextQuestion() );
  });

  it("should increment currentQuestion when nextQuestion() called", function() {
    var expected = new Question({
      text: "second question",
      countryCode: "FR",
      countryName: "France",
      archived: true
    });
    quizWithQuestions.nextQuestion();
    assert.deepEqual( expected, quizWithQuestions.currentQuestion() );
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

  it("should return number of questions from length()", function() {
    assert.equal( 3, quizWithQuestions.length() );
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
    assert.equal( "AF", blankQuiz.questions[0].countryCode );
    assert.equal( "Afghanistan", blankQuiz.questions[0].countryName );
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
