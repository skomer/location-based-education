var assert = require('assert');
var Question = require('../models/question');


describe("Question", function(){
  beforeEach(function(){
    completeQuestion = new Question({
      text: "Country contains Paris",
      answer: {
        countryCode: "FR",
        countryName: "France"
      },
      archived: false
    });
    qNoCountryCode = new Question({
      text: "Country contains Paris",
      answer: {
        countryCode: "",
        countryName: "France"
      },
      archived: true
    });
    qNoCountryName = new Question({
      text: "Country contains Paris",
      answer: {
        countryCode: "FR",
        countryName: ""
      },
      archived: true
    });
    qNoText = new Question({
      text: "",
      answer: {
        countryCode: "IT",
        countryName: "Italy"
      },
      archived: false
    });
  });

  // CONSTRUCTOR TESTS
  it("should have text passed in constructor", function(){
    assert.equal("Country contains Paris", completeQuestion.text);
  });

  it("should have country code passed in constructor", function(){
    assert.equal("FR", completeQuestion.answer.countryCode);
  });

  it("should have answer country name passed in constructor", function(){
    assert.equal("France", completeQuestion.answer.countryName);
  });

  it("should have archived boolean passed in constructor", function(){
    assert.equal( false, completeQuestion.archived );
    assert.equal( true, qNoCountryCode.archived );
  });

  // SAVEABLE TEST
  it("should not be saveable if country code is blank", function() {
    assert.equal( false, qNoCountryCode.isSaveable() );
  });

  it("should not be saveable if country name is blank", function(){
    assert.equal( false, qNoCountryName.isSaveable()  );
  });

  it("should not be saveable if text is blank", function(){
    assert.equal( false, qNoText.isSaveable() );
  });

  it("should be saveable if everything is filled in", function() {
    assert.equal( true, completeQuestion.isSaveable() );
  });

  it("should set user properties passed to setUserAnswer()", function() {
    completeQuestion.setUserAnswer( "FR", "France" );
    assert.equal( "FR", completeQuestion.userAnswer.countryCode );
    assert.equal( "France", completeQuestion.userAnswer.countryName );
  });

  it("should return false from isCorrect() when user country code does not match question country code", function() {
    completeQuestion.userAnswer.countryCode = "UK";
    assert.equal( false, completeQuestion.isCorrect() );
  });

  it("should return true from isCorrect() when user country code does not match question country code", function() {
    completeQuestion.userAnswer.countryCode = "FR";
    assert.equal( true, completeQuestion.isCorrect() );
  });

});
