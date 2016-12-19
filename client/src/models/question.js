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
    } 
    if(!this.countryName){
      return "Not saved"
    } 
    if(!this.question){
      return "Not saved"
    } else {
      return "Saved"
    }
  }
};
    
module.exports = Question;