var Quiz = function(title, fullResponse){
  this.title = title;
  this.fullResponse =[{
    question: fullResponse.question,
    answer: fullResponse.answer,
    countryCode: fullResponse.countryCode,
    countryName: fullResponse.countryName,
    archived: fullResponse.true
  }];

  this.quizQuestions = [];
 // this.published = false;
}

Quiz.prototype = {
  getSize: function(){
    this.quizQuestions.length;
  },

add: function(item){
  this.quizQuestions.push(item);
}
};



  
module.exports = Quiz;