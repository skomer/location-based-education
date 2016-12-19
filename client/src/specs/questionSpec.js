var assert = require('assert');
var Question = require('../models/question');


describe("Question", function(){
  beforeEach(function(){
    question = new Question("Country contains Paris", "France", "FR", "France");
    qNoCountryCode = new Question("Country contains Paris", "France", "", "France");
    qNoCountryName = new Question("Country contains Paris", "France", "FR", "");
    qNoText = new Question("", "Italy", "IT", "Italy");
  });
  
  it("should have text passed in constructor", function(){
    assert.equal("Country contains Paris", question.question);
  });

  it("should have country code passed in constructor", function(){
    assert.equal("FR", question.countryCode);
  });

  it("should have country name passed in constructor", function(){
    assert.equal("France", question.countryName);
  });

  it("should have archived boolean passed in constructor", function(){
    question.archived = false;
    assert.equal(false, question.archived);
    question.archived = true;
    assert.equal(true, question.archived);
  });

  // SAVEABLE

  it("should not be saveable if country code is blank", function() {
    assert.equal( "Not saved", qNoCountryCode.save() );
  });

  it("should not be saveable if country name is blank", function(){
    assert.equal( "Not saved", qNoCountryName.save()  );
  });

  it("should not be saveable if text is blank", function(){
    assert.equal( "Not saved", qNoText.save() );
  });

});