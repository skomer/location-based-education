var Quiz = function(title, question){
  this.title = title;
  this.question ={
    question: this.question,
    answer: this.answer,
    countryCode: this.countryCode,
    countryName: this.countryName,
    archived: true,
    published: false
  };
  this.quizQuestions = [];
}

  
module.exports = Quiz;