var Question = function( params ){
  this.text = params.text;
  this.answer = {
    countryCode: params.answer.countryCode,
    countryName: params.answer.countryName
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
  }
};

module.exports = Question;
