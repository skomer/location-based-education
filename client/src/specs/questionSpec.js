var assert = require('assert');
var Question = require('../models/question');


describe("Question", function(){
  beforeEach(function(){
    question = new Question("Country contains Paris", "France", "FR", "France");
  });
  
  it("should have text passed in constructor", function(){
    assert.equal("Country contains Paris", question.question);
  });

  it("should have country code passed in constructor", function(){
    assert.equal("FR", question.countryCode);
  });

  it("should have country name passed in constructor");

  it("should have archived boolean passed in constructor");

  // SAVEABLE

  it("should not be saveable if country code is blank");

  it("should not be saveable if country name is blank");

  it("should not be saveable if text is blank");

});