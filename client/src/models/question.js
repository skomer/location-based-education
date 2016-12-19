var Question = function(question, answer, countryCode, countryName){
  this.question = question;
  this.answer = answer;
  this.countryCode = countryCode;
  this.countryName = countryName;
  this.archived = true;
};

Question.prototype = {
  save: function(){
    if(!this.countryCode){
      return "Not saved"
    } else {
      return "Saved"
    }
  },
  save2: function(){
    if(!this.countryName){
      return "Not saved"
    } else {
      return "Saved"
    }
  },
  save3: function(){
    if(!this.question){
      return "Not saved"
    } else {
      return "Saved"
    }
  }
};
    

module.exports = Question;