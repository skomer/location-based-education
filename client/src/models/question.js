var Question = function( params ){
  this.text = params.text;
  this.answer = {
    countryCode: params.answer.countryCode,
    countryName: params.answer.countryName
  };
  this.userAnswer = {
    countryCode: null,
    countryName: null
  };
  this.archived = params.archived;
};

Question.prototype = {
  isSaveable: function(){
    if(!this.answer.countryCode){
      return false;
    }
    if(!this.answer.countryName){
      return false;
    }
    if(!this.text){
      return false;
    }

    return true;
  },
  setUserAnswer: function( countryCode, countryName ) {
    this.userAnswer.countryCode = countryCode;
    this.userAnswer.countryName = countryName;
  },
  isCorrect: function() {
    return this.answer.countryCode === this.userAnswer.countryCode;
  }
};

module.exports = Question;
