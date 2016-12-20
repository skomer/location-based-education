var Question = function( params ){
  this.text = params.text;
  this.countryCode = params.countryCode;
  this.countryName = params.countryName;
  this.userAnswer = {
    countryCode: null,
    countryName: null
  };
  this.archived = params.archived;
};

Question.prototype = {
  isSaveable: function(){
    if(!this.countryCode){
      return false;
    }
    if(!this.countryName){
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
    return this.countryCode === this.userAnswer.countryCode;
  }
};

module.exports = Question;
