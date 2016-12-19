var Question = function(question, answer, countryCode, countryName){
  this.question = question;
  this.answer = answer;
  this.countryCode = countryCode;
  this.countryName = countryName;
  this.archived = true;
};

module.exports = Question;